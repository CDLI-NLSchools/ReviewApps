/* Science 7, Unit 4: Earth's Crust (built Nov 15, 2026).
   85 entries across the strand's 25 indicators: Knowledge SC7.10.1
   to SC7.10.9, STSE SC7.11.1 to SC7.11.7, Skills SC7.12.1 to
   SC7.12.9. Guide-led (current guide, Version 2023.001.010) with a
   harvested source base under mine-and-rewrite: the ExamView
   Chapters 10 to 12 publisher banks, Core Lab 10-1C (A Mineralogist's
   Mystery), Core Lab 12-1B (Rocks that Fizz), Be a Soil Sleuth (the
   guide's Core Lab 12-2B), the Seeing the Big Picture STSE module and
   its portfolio assignment, the WNLSD Chapter 10 test and review
   sheet, the ESD unit plan and rock classification activity, and
   three STEAM app scenarios rewritten as contexts. No verbatim
   textbook or test items. Terminology follows the guide throughout:
   the guide's term for earthquake strength is the moment magnitude
   scale, and harvested material naming the Richter scale was mined
   for type only. Content with no home in the current 25 indicators
   (soil humus and leaching detail, desertification, soil enrichment,
   rock and mineral resources) carries no entries. */
// CRMARKS: s7-u4-cr-mineral-tests=3
// CRMARKS: s7-u4-cr-rock-journey=3
// CRMARKS: s7-u4-cr-event-compare=3
// CRMARKS: s7-u4-cr-distribution=3
// CRMARKS: s7-u4-cr-mountain-explain=2
// CRMARKS: s7-u4-cr-timeline=2
// CRMARKS: s7-u4-cr-weathering=3
// CRMARKS: s7-u4-cr-soil-case=2
// CRMARKS: s7-u4-cr-theory-evolved=3
// CRMARKS: s7-u4-cr-big-picture=3
// CRMARKS: s7-u4-cr-change-explain=3
// CRMARKS: s7-u4-cr-past-theory=2
// CRMARKS: s7-u4-cr-mineral-id=2
// CRMARKS: s7-u4-cr-design-investigation=4
// CRMARKS: s7-u4-cr-table-display=2
// CRMARKS: s7-u4-cr-pattern=3
// CRMARKS: s7-u4-cr-conclusion=3

/* ---------- SC7.10.1 Classify minerals by physical properties ---------- */

E("s7-u4-mineral-properties", 4, ["SC7.10.1"], 1, "gen", function () {
  var sets = [
    { obs: "A student rubs a mineral across an unglazed porcelain plate and studies the colour of the powder it leaves behind", prop: "Its streak", others: ["Its cleavage", "Its crystal form", "Its hardness"] },
    { obs: "A student tries to scratch a mineral with a fingernail, then a copper penny, then a steel nail, noting which tools leave a mark", prop: "Its hardness", others: ["Its lustre", "Its streak", "Its transparency"] },
    { obs: "A student holds a mineral up to the light and describes how its surface reflects light, as shiny as a coin or dull like soil", prop: "Its lustre", others: ["Its cleavage", "Its fracture", "Its streak"] },
    { obs: "A broken mineral sample shows flat, smooth surfaces where it split along straight planes in two directions", prop: "Its cleavage", others: ["Its crystal form", "Its hardness", "Its lustre"] },
    { obs: "A student picks up two mineral samples of about the same size and is surprised that one feels much heavier than the other", prop: "Its heft (density)", others: ["Its cleavage", "Its fracture", "Its streak"] },
    { obs: "A student holds a thin mineral sample up to a window and finds that light passes through it clearly enough to read print behind it", prop: "Its transparency", others: ["Its hardness", "Its lustre", "Its streak"] }
  ];
  var s = pick(sets);
  return mcq(s.obs + ". Which physical property of the mineral is being tested?",
    s.prop, s.others,
    "Each test targets one property: a porcelain plate shows streak, scratching tools test hardness, reflected light shows lustre, flat split surfaces show cleavage, unusual weight for size is heft, and light passing through is transparency.", {});
}, ["Match the tool or action in the description to the property it can reveal.", "Ask what the student is actually looking at or comparing in each case."]);

E("s7-u4-mineral-define", 4, ["SC7.10.1"], 1, "var", varset([
  function () {
    return mcq("Which statement best describes what a mineral is?",
      "A pure, naturally occurring, inorganic solid with a definite chemical composition",
      ["Any rock or crystal found in the ground, whether natural or made by people",
       "A living material that forms slowly inside rocks over millions of years",
       "A mixture of several substances that always contains some rock"],
      "A mineral must be pure, naturally occurring, inorganic (not made by living things) and solid. Rocks are mixtures of minerals, and materials made by people or by living things do not count.", {});
  },
  function () {
    return mcq("Ice forms naturally in a pond in winter and is a pure solid. Why is ice sometimes described as a mineral while the water in the pond is not?",
      "Ice is a solid with a definite composition; liquid water is not a solid",
      ["Ice is colder than the water, and minerals must be cold",
       "Ice forms in winter, and minerals only form in winter",
       "Ice is harder than water, and minerals must be the hardest form of a substance"],
      "One requirement of a mineral is that it be a solid. Ice meets the definition (pure, naturally occurring, inorganic, solid); liquid water fails the solid requirement, whatever its temperature.", {});
  }
]), ["Run the definition as a checklist: pure, naturally occurring, inorganic, solid.", "If an option fails even one part of the checklist, it is not the best description."]);

E("s7-u4-mohs-order", 4, ["SC7.10.1"], 1, "gen", function () {
  var sets = [
    { a: "gypsum (hardness 2)", b: "quartz (hardness 7)", test: "A steel file (hardness 6.5) scratches one of two samples but not the other", ans: "The file scratches the gypsum but not the quartz", others: ["The file scratches both samples equally", "The file scratches the quartz but not the gypsum", "Neither sample can be scratched by any tool"] },
    { a: "calcite (hardness 3)", b: "feldspar (hardness 6)", test: "A copper penny (hardness 3.5) is rubbed across both samples", ans: "The penny scratches the calcite but not the feldspar", others: ["The penny scratches both samples equally", "The penny scratches the feldspar but not the calcite", "The penny is scratched by both samples and leaves no mark on either"] },
    { a: "talc (hardness 1)", b: "calcite (hardness 3)", test: "A fingernail (hardness 2.5) is drawn across both samples", ans: "The fingernail scratches the talc but not the calcite", others: ["The fingernail scratches both samples equally", "The fingernail scratches the calcite but not the talc", "The fingernail cannot scratch any mineral"] }
  ];
  var s = pick(sets);
  return mcq("Two samples are " + s.a + " and " + s.b + ". " + s.test + ". What happens?",
    s.ans, s.others,
    "A tool scratches a mineral only when the tool is harder than the mineral. Compare each hardness value with the tool's: the softer mineral is scratched, the harder one is not.", {});
}, ["A scratch happens only when the tool is harder than the mineral.", "Compare the three numbers: tool against each mineral, one at a time."]);

E("s7-u4-streak-reliable", 4, ["SC7.10.1"], 2, "var", varset([
  function () {
    return mcq("Hematite samples can look silver-grey, dark grey or reddish brown, yet every sample leaves the same red-brown powder on a streak plate. Why is streak a more reliable property for identifying hematite than colour?",
      "The streak colour stays the same even when the mineral's surface colour varies",
      ["The streak plate changes the mineral into a different, easier mineral",
       "Colour can never be used to identify any mineral at all",
       "Hematite is the only mineral whose colour changes from sample to sample"],
      "Surface colour varies between samples of the same mineral, but the colour of the powdered mineral, its streak, is consistent. That is why identification keys lean on streak when colour misleads.", {});
  },
  function () {
    return mcq("A student finds a shiny yellow mineral and hopes it is gold. Gold leaves a yellow streak; pyrite (fool's gold) leaves a greenish-black streak. The sample's streak is greenish-black. What should the student conclude?",
      "The sample is pyrite, not gold, because its streak does not match gold",
      ["The sample is gold, because all shiny yellow minerals are gold",
       "The streak test cannot tell gold and pyrite apart",
       "The sample must be a third mineral, since streaks are never yellow or black"],
      "Streak separates the look-alikes: gold's streak is yellow, pyrite's is greenish-black. The greenish-black streak rules out gold even though the sample's colour suggested it.", {});
  }
]), ["Colour is the property that varies most between samples of one mineral.", "The streak is the colour of the mineral as a powder, and it stays constant."]);

E("s7-u4-cr-mineral-tests", 4, ["SC7.10.1"], 3, "var", varset([
  function () {
    return textq("Two mineral samples look almost alike: both are brassy yellow with a metallic shine. One is gold and the other is pyrite. Describe TWO tests you could do to tell them apart, and state what result each test would give for gold and for pyrite.",
      ["Any two of: streak test (gold leaves a yellow streak, pyrite a greenish-black streak); hardness test (gold is soft, about 2.5 to 3, and can be scratched by a copper penny or nail, pyrite is hard, about 6 to 6.5, and cannot); shape test (gold is malleable and flattens when hammered, pyrite is brittle and shatters)"],
      "<b>Model answer:</b> Test 1, the streak test: rub each sample on an unglazed porcelain plate. Gold leaves a yellow streak; pyrite leaves a greenish-black streak. Test 2, the hardness test: try to scratch each sample with a steel nail. Gold is soft (hardness about 2.5 to 3), so the nail scratches it; pyrite is much harder (about 6 to 6.5), so the nail leaves no mark. Either test separates them, because the two minerals differ in streak and in hardness even though their colour and lustre match.<br><br><b>Marking points:</b> 1 mark for a first valid test with both expected results stated. 1 mark for a second valid test with both expected results stated. 1 mark for the reasoning: the tests work because the minerals differ in the tested property even though they look alike.", {});
  },
  function () {
    return textq("Two clear, glassy mineral samples sit in a tray. One is quartz and the other is calcite. Describe TWO tests you could do to tell them apart, and state what result each test would give for quartz and for calcite.",
      ["Any two of: hardness test (quartz, hardness 7, scratches glass and cannot be scratched by a steel file; calcite, hardness 3, is scratched by a copper penny); acid test (calcite fizzes in weak acid, quartz does not react); cleavage test (calcite splits along flat cleavage planes, quartz breaks with a shell-like fracture and shows no cleavage)"],
      "<b>Model answer:</b> Test 1, the hardness test: try scratching each sample with a steel file (hardness about 6.5). Quartz has hardness 7, so the file cannot scratch it, and quartz can scratch glass. Calcite has hardness 3, so even a copper penny scratches it. Test 2, the acid test: drip weak acid on each sample. Calcite fizzes as bubbles of gas form; quartz does not react at all. The two tests separate the samples because quartz and calcite differ greatly in hardness and in their reaction to acid, even though both look clear and glassy.<br><br><b>Marking points:</b> 1 mark for a first valid test with both expected results stated. 1 mark for a second valid test with both expected results stated. 1 mark for the reasoning: the tests work because the minerals differ in the tested property even though they look alike.", {});
  }
]), ["Look-alike minerals are separated by properties, not by appearance: think streak, hardness and special reactions.", "For each test, give the result for BOTH minerals. A test with only one result earns half its value."]);

/* ---------- SC7.10.2 Classify rocks by characteristics and formation ---------- */

E("s7-u4-rock-families", 4, ["SC7.10.2"], 1, "gen", function () {
  var PROC = {
    "Sedimentary rock": "formed from sediments that were compacted and cemented",
    "Igneous rock": "formed when molten rock cooled and hardened",
    "Metamorphic rock": "formed when an existing rock was changed by heat and pressure"
  };
  var sets = [
    { d: "a rock made of layers of sand grains cemented tightly together, with a seashell fossil in one layer", fam: "Sedimentary rock" },
    { d: "a rock that cooled from molten rock deep underground, made of large, interlocking crystals of quartz and feldspar", fam: "Igneous rock" },
    { d: "a rock with wavy bands of light and dark minerals, formed when an older rock was squeezed and heated deep in the crust", fam: "Metamorphic rock" },
    { d: "a rock full of rounded pebbles stuck together in a natural cement", fam: "Sedimentary rock" },
    { d: "a glassy black rock with no visible crystals, formed when lava cooled almost instantly at the surface", fam: "Igneous rock" },
    { d: "a rock that splits into flat sheets and was once a muddy sediment buried and changed by heat and pressure", fam: "Metamorphic rock" }
  ];
  var s = pick(sets);
  var fams = Object.keys(PROC);
  var others = fams.filter(function (f) { return f !== s.fam; });
  var wrongProc = PROC[others[0]];
  return mcq("A student examines " + s.d + ". Which classification is correct?",
    s.fam + ": " + PROC[s.fam],
    [others[0] + ": " + PROC[others[0]], others[1] + ": " + PROC[others[1]], s.fam + ": " + wrongProc],
    "Classify by how the rock formed: sedimentary rocks build up from sediments that are compacted and cemented (and may hold fossils), igneous rocks cool from molten rock, and metamorphic rocks are older rocks changed by heat and pressure. The right option pairs the family with its own formation process.", {});
}, ["Ask how the rock formed, not just how it looks.", "Check both halves of each option: a right family with a wrong process is still a wrong answer."]);

E("s7-u4-igneous-cooling", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    return mcq("What is the difference between magma and lava?",
      "Magma is molten rock below the surface; lava is molten rock that has reached the surface",
      ["Magma is molten rock at the surface; lava is molten rock below the surface",
       "Magma is solid rock and lava is molten rock",
       "Magma comes from volcanoes and lava comes from earthquakes"],
      "The same molten rock has two names depending on where it is: magma while it is underground, lava once it erupts onto the surface.", {});
  },
  function () {
    return mcq("Granite has large crystals that are easy to see, while basalt's crystals are too small to see without a lens. What does the crystal size tell about how each rock cooled?",
      "Granite cooled slowly underground, giving crystals time to grow; basalt cooled quickly at the surface",
      ["Granite cooled quickly at the surface; basalt cooled slowly underground",
       "Both rocks cooled at the same rate, and crystal size depends only on colour",
       "Large crystals form when rock cools in water, and small crystals when it cools in air"],
      "Crystal size records cooling time: slow cooling deep underground (intrusive) lets large crystals grow, while fast cooling at the surface (extrusive) leaves only tiny crystals.", {});
  }
]), ["One word changes with location: below ground or above it.", "Crystal size is a clock: big crystals needed a long, slow cool."]);

E("s7-u4-cycle-diagram", 4, ["SC7.10.2"], 1, "var", varset([
  function () {
    var q = mcq("Use the rock cycle diagram. A rock melts deep underground and the melt later cools and hardens at the surface. Which two boxes does the material pass through, in order?",
      "Magma, then igneous rock",
      ["Igneous rock, then sediments", "Metamorphic rock, then sedimentary rock", "Sediments, then sedimentary rock"],
      "Melting produces magma, and magma that cools and hardens becomes igneous rock, whether it cools underground or erupts and cools at the surface.", {});
    q.figure = s7RockCycleSVG();
    return q;
  },
  function () {
    var q = mcq("Use the rock cycle diagram. Which process must happen to an igneous rock before its material can become part of a sedimentary rock?",
      "It must be weathered and eroded into sediments, which are then compacted and cemented",
      ["It must melt and then cool again as a new igneous rock",
       "It must be changed by heat and pressure into a metamorphic rock",
       "Nothing: igneous rock turns directly into sedimentary rock over time"],
      "Follow the arrows: igneous rock reaches sedimentary rock only through sediments. Weathering and erosion break it down, and compaction and cementation build the sedimentary rock from those sediments.", {});
    q.figure = s7RockCycleSVG();
    return q;
  }
]), ["Trace the arrows with your finger; every change of family follows an arrow.", "There are no shortcuts in the cycle: if no arrow runs directly between two boxes, an in-between step is needed."]);

E("s7-u4-sedimentary-form", 4, ["SC7.10.2"], 2, "var", varset([
  function () {
    return mcq("Sediments settle in a lake bed. Which sequence turns them into sedimentary rock?",
      "More sediments pile on top, squeezing the layers (compaction), and dissolved minerals cement the grains together (cementation)",
      ["The sediments melt from the heat of burial, then cool into solid rock",
       "Heat and pressure deep in the crust recrystallize the sediments into bands",
       "The sediments dry out in the sun until they harden into rock"],
      "Sedimentary rock forms at or near the surface: burial compacts the sediment layers, and mineral cement glues the grains. Melting and recrystallizing belong to the igneous and metamorphic paths.", {});
  },
  function () {
    return mcq("Three sedimentary rocks are made of different sediment sizes: one of pebbles and cobbles, one of sand, and one of fine mud. Which pairing is correct?",
      "Pebbles and cobbles form conglomerate, sand forms sandstone, and fine mud forms shale",
      ["Pebbles and cobbles form shale, sand forms conglomerate, and fine mud forms sandstone",
       "All three sediments form the same rock, since size does not matter",
       "Pebbles and cobbles form sandstone, sand forms shale, and fine mud forms conglomerate"],
      "Sedimentary rocks are named by their grain size: the coarsest sediments (pebbles, cobbles) make conglomerate, sand makes sandstone, and the finest mud makes shale.", {});
  }
]), ["Two near-surface steps do the work: squeezing, then gluing.", "For the naming item, match the biggest grains to the rock built from the biggest pieces."]);

E("s7-u4-metamorphic-parent", 4, ["SC7.10.2"], 2, "gen", function () {
  var sets = [
    { parent: "limestone", meta: "marble", others: ["gneiss", "quartzite", "slate"] },
    { parent: "shale", meta: "slate", others: ["gneiss", "marble", "quartzite"] },
    { parent: "sandstone", meta: "quartzite", others: ["gneiss", "marble", "slate"] },
    { parent: "granite", meta: "gneiss", others: ["marble", "quartzite", "slate"] }
  ];
  var s = pick(sets);
  return mcq("Heat and pressure deep in the crust change a rock of " + s.parent + ". Which metamorphic rock does it become?",
    s.meta, s.others,
    "Each parent rock has its metamorphic product: limestone becomes marble, shale becomes slate, sandstone becomes quartzite, and granite becomes gneiss.", {});
}, ["The parent rock decides the product: the minerals are rearranged, not replaced.", "If you know two of the four pairs for certain, use them to eliminate."]);

E("s7-u4-cr-rock-journey", 4, ["SC7.10.2"], 3, "var", varset([
  function () {
    return textq("Choose ONE starting rock: a granite, a sandstone, or a slate. Describe a journey that rock could take through the rock cycle until it becomes a rock of a DIFFERENT family. Name each process in your journey, in order.",
      ["A complete journey names the starting rock, at least two processes in order (from weathering and erosion, compaction and cementation, heat and pressure, melting, cooling), and a finishing rock from a different family. Example: granite is weathered and eroded into sediments; the sediments are compacted and cemented into sandstone (sedimentary)"],
      "<b>Model answer:</b> Start with granite, an igneous rock exposed at the surface. Weathering breaks the granite down and erosion carries the pieces away as sediments, which settle in layers. Buried under more sediments, the layers are compacted and then cemented together into sandstone, a sedimentary rock. The journey crosses one family boundary: igneous to sedimentary, by way of weathering and erosion, then compaction and cementation.<br><br><b>Marking points:</b> 1 mark for a named starting rock and a finishing rock from a different family. 1 mark for each of two processes named correctly and in a workable order (weathering and erosion before compaction and cementation; melting before cooling; heat and pressure applied to an existing rock).", {});
  },
  function () {
    return textq("A piece of shale is buried deeper and deeper as mountains build above it. Describe the journey this rock could take until it becomes an igneous rock. Name each process in your journey, in order.",
      ["Shale is changed by heat and pressure into slate (metamorphic); buried deeper still, it melts into magma; the magma cools and hardens into an igneous rock such as granite (if it cools underground) or basalt (if it erupts and cools at the surface)"],
      "<b>Model answer:</b> As burial deepens, heat and pressure change the shale into slate, a metamorphic rock. If the slate is buried deeper still, the heat becomes great enough to melt it, and it joins the magma below the crust. When that magma cools and hardens, underground or after erupting at the surface, it forms an igneous rock. The journey is sedimentary to metamorphic to igneous, and it cannot skip the melting step: no sedimentary or metamorphic rock becomes igneous without first melting.<br><br><b>Marking points:</b> 1 mark for heat and pressure changing the shale into a metamorphic rock. 1 mark for melting into magma. 1 mark for cooling and hardening into a named or described igneous rock.", {});
  }
]), ["Every change of family needs its process: nothing in the cycle changes by waiting alone.", "Check your journey against the cycle: melting must come before any igneous rock, and sediments before any sedimentary rock."]);

/* ---------- SC7.10.3 Crust characteristics and technologies ---------- */

E("s7-u4-earth-layers", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    var q = mcq("Use the diagram of Earth's interior. Which layer is liquid, and what is it mostly made of?",
      "The outer core, mostly liquid iron and nickel",
      ["The crust, mostly liquid rock", "The inner core, mostly liquid iron and nickel", "The mantle, mostly liquid water and rock"],
      "The outer core is the liquid layer, made of iron and nickel. The inner core is the same metals but solid, squeezed solid by pressure; the mantle is solid rock that flows very slowly, and the crust is a thin solid shell.", {});
    q.figure = s7EarthLayersSVG();
    return q;
  },
  function () {
    var q = mcq("Use the diagram of Earth's interior. A student says the crust is like the skin of an apple compared with the whole fruit. What makes the comparison reasonable?",
      "The crust is extremely thin compared with the rest of the Earth beneath it",
      ["The crust is the softest layer of the Earth", "The crust is the hottest layer of the Earth", "The crust is made of the same material as the core"],
      "Even under the continents the crust is only a few tens of kilometres thick, against thousands of kilometres of mantle and core below it. Thin in proportion, like an apple's skin.", {});
    q.figure = s7EarthLayersSVG();
    return q;
  }
]), ["Find the layer in the diagram first, then match its state and material.", "Only one layer is liquid; the deepest layer is solid despite being hottest, because of pressure."]);

E("s7-u4-crust-plates", 4, ["SC7.10.3"], 1, "var", varset([
  function () {
    return mcq("Which statement about Earth's crust is correct?",
      "The crust is broken into large pieces called plates that move slowly, carrying continents and ocean floor with them",
      ["The crust is one unbroken shell, and only the continents on top of it move",
       "The crust is broken into plates, but the plates are exactly the same as the continents",
       "The crust floats as separate continent pieces on a completely liquid interior"],
      "The crust (with the uppermost mantle) is broken into plates, and each plate can carry both continent and ocean floor. Plates are not the same as continents: several plates carry no continent at all, and some continents sit on more than one plate.", {});
  },
  function () {
    return mcq("A map shows a tectonic plate that includes South America and the western half of the Atlantic Ocean floor. What does this show about plates?",
      "A plate can carry both a continent and ocean floor; plates and continents are not the same thing",
      ["Ocean floor is not part of the crust",
       "Every continent sits on exactly one plate of its own",
       "The Atlantic Ocean floor belongs to no plate"],
      "Plates are pieces of crust, and a single plate often carries a continent plus the ocean floor beside it out to a mid-ocean ridge. The plate boundaries do not follow the coastlines.", {});
  }
]), ["Plates are pieces of crust; continents are passengers on some of them.", "If an option makes plates and continents identical, it is the misconception, not the answer."]);

E("s7-u4-study-tech", 4, ["SC7.10.3"], 2, "var", varset([
  function () {
    return mcq("Scientists in the 1950s towed magnetometers behind ships and recorded stripes of normal and reversed magnetism in the ocean floor rocks. What did this technology let them study?",
      "How the ocean floor had spread apart over time, recorded in its magnetic stripes",
      ["The exact age of the Earth, read directly from the stripes",
       "The depth of the mantle below the ocean floor",
       "The kinds of fish living along the mid-ocean ridge"],
      "Magnetometers detect the magnetism locked into rocks as they cool. The striped pattern, matching on both sides of a mid-ocean ridge, recorded the history of sea floor spreading.", {});
  },
  function () {
    return mcq("Which pairing of technology and what it reveals is correct?",
      "Sonar reveals the shape of the ocean floor by timing echoes from sound pulses",
      ["Core sampling reveals the temperature of the inner core directly",
       "Satellite imaging reveals the composition of the mantle",
       "A seismograph reveals the magnetism of ocean floor rocks"],
      "Sonar times sound echoes to map the sea floor, which is how the mid-ocean ridges were found. Core samples reach only the crust, satellites see the surface, and magnetism is the magnetometer's job.", {});
  }
]), ["Each technology answers one kind of question; match the tool to the evidence it produces.", "If an option claims a tool reaches the core or the mantle directly, be suspicious: no tool does."]);

/* ---------- SC7.10.4 Catastrophic events ---------- */

E("s7-u4-earthquake-why", 4, ["SC7.10.4"], 1, "var", varset([
  function () {
    return mcq("What is an earthquake?",
      "A sudden release of energy in the crust, as rock that has been slowly bent or squeezed snaps and shifts, sending out seismic waves",
      ["A crack that opens in the ground and swallows the surface above it",
       "A shaking caused by magma rising through a volcano",
       "A giant wave that starts in the ocean and strikes the coast"],
      "Forces from moving plates slowly stress the rock until it breaks or slips along a fault; the stored energy is released as seismic waves. Ground cracks and ocean waves can result from an earthquake, but neither one is the earthquake itself.", {});
  },
  function () {
    return mcq("Which pairing is correct?",
      "A seismograph records seismic waves, and the moment magnitude scale describes the strength of an earthquake",
      ["A seismograph predicts the exact day of the next earthquake",
       "The moment magnitude scale measures how long an earthquake lasts",
       "A seismograph measures the magnetism of the rocks at a fault"],
      "Seismographs record the waves an earthquake sends out, and scientists use the records to locate the earthquake and rate its strength on the moment magnitude scale. No instrument predicts the exact day of an earthquake.", {});
  }
]), ["Start from the cause: stressed rock, a sudden slip, energy released as waves.", "Separate the event itself from its effects: waves, cracks and tsunamis are results, not definitions."]);

E("s7-u4-volcano-where", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("Volcanoes form in three settings. Which setting matches the Hawaiian Islands?",
      "A hot spot: a plate moves slowly over a place where magma rises through the crust, building island after island",
      ["A converging boundary, where one plate dives under another",
       "A diverging boundary, where two plates pull apart in the ocean",
       "A transform boundary, where two plates slide sideways past each other"],
      "Hawaii sits in the middle of a plate, far from any boundary. A rising plume of magma (a hot spot) punches through the crust, and as the plate moves, the plume builds a chain of islands.", {});
  },
  function () {
    return mcq("Japan's volcanoes sit where one plate is diving beneath another. Which volcano setting is this?",
      "A converging boundary, where the diving plate melts and magma rises through the plate above",
      ["A hot spot in the middle of a plate",
       "A diverging boundary along a mid-ocean ridge",
       "A transform boundary where plates slide sideways"],
      "Where plates converge and one dives (subducts), the diving plate melts at depth and the magma rises to build volcanoes on the plate above, as in Japan. Sideways sliding (transform) builds no volcanoes.", {});
  }
]), ["Three settings only: plates colliding, plates parting, and hot spots.", "Middle of a plate rules out every boundary setting; look for the hot spot."]);

E("s7-u4-event-effects", 4, ["SC7.10.4"], 2, "var", varset([
  function () {
    return mcq("In 1929, an earthquake on the ocean floor south of Newfoundland triggered an underwater landslide. What effect reached the Burin Peninsula?",
      "A tsunami: a series of huge waves that flooded coastal communities",
      ["A volcanic eruption that covered the peninsula in ash",
       "A landslide that buried the peninsula's harbours under rock",
       "A flood caused by rivers changing course on land"],
      "The earthquake's energy displaced the sea floor and set off a tsunami. The waves, not lava or a land landslide, struck the Burin Peninsula, destroying homes and taking lives. It remains Canada's deadliest known tsunami.", {});
  },
  function () {
    return mcq("Mount St. Helens erupted in 1980 after a bulge grew on its side and an earthquake shook the mountain. What was the eruption's most destructive effect?",
      "The side of the mountain collapsed in a huge landslide and a sideways blast flattened forests over a wide area",
      ["Lava flows slowly covered the surrounding towns",
       "A tsunami from the mountain flooded the coast",
       "Ash buried the entire country under a metre of debris"],
      "The bulge gave way: the mountain's side slid off and the exposed magma blasted sideways, flattening forest for kilometres. Lava flows were minor by comparison, and there was no tsunami from the mountain.", {});
  }
]), ["Match the effect to the event's setting: sea floor earthquakes move water; bulging mountainsides fall.", "Watch for effects borrowed from the wrong event type."]);

E("s7-u4-cr-event-compare", 4, ["SC7.10.4"], 3, "var", varset([
  function () {
    return textq("A coastal town sits near a plate boundary where earthquakes occur offshore, and a volcano stands 60 km inland. Compare an earthquake and a volcanic eruption as risks to this town: for EACH event, state its cause and one effect the town could experience.",
      ["Earthquake: caused by rock under stress snapping or slipping along a fault as plates move; effects include shaking that damages buildings, and, because it is offshore, a possible tsunami. Volcano: caused by magma rising through the crust and erupting; effects include ash fall over the town, lava or mudflows nearer the volcano, and gases. Full credit compares cause and effect for both events"],
      "<b>Model answer:</b> Earthquake: the plates pressing against each other stress the rock until it snaps along a fault, releasing energy as seismic waves. The town would feel strong shaking that can crack buildings and roads, and an offshore earthquake could also send a tsunami toward the coast. Volcanic eruption: magma builds up under the volcano until it erupts. Sixty kilometres away, the town's main risk is ash falling on roofs, roads and water supplies, along with poor air from gases; lava flows would threaten places much closer to the volcano. Both events come from plate movement, but the earthquake releases stored energy in seconds with little warning, while the volcano often gives warning signs (small earthquakes, a growing bulge, gas) before it erupts.<br><br><b>Marking points:</b> 1 mark for the earthquake's cause (stressed rock snapping or slipping) and one effect (shaking damage or tsunami). 1 mark for the eruption's cause (magma rising and erupting) and one effect suited to the distance (ash fall, gases). 1 mark for a genuine comparison point (for example warning time, or how the effects differ with distance).", {});
  }
]), ["Give each event its own cause and its own effect; a comparison needs both halves for both events.", "Distance matters: judge the volcano's effects from 60 km away, not from its slopes."]);

/* ---------- SC7.10.5 Distribution of earthquakes and volcanoes ---------- */

E("s7-u4-distribution-data", 4, ["SC7.10.5"], 1, "var", varset([
  function () {
    return mcq("A class collects the locations of the world's major earthquakes and volcanoes for the past 50 years. Which way of organizing the data would best reveal a pattern?",
      "Plot every location as a point on a world map, using one symbol for earthquakes and another for volcanoes",
      ["List the locations alphabetically by the nearest city",
       "Sort the events by date, from oldest to newest",
       "Average all the locations together into a single world position"],
      "Patterns in distribution are spatial: they only appear when the data sits on a map. Alphabetical and date orderings hide where the events are, and averaging destroys the locations entirely.", {});
  },
  function () {
    return mcq("Why do scientists plot earthquake and volcano locations on a map instead of studying a table of the same data?",
      "The map shows where the events cluster, and the clusters are the pattern that needs explaining",
      ["Maps are always more accurate than tables",
       "Tables cannot hold latitude and longitude numbers",
       "The map removes the need to collect any data at all"],
      "The table holds the same numbers, but the pattern (long belts of activity, empty stretches elsewhere) is visible only when the points are plotted. The pattern is what connects the events to plate boundaries.", {});
  }
]), ["Ask what each organization lets you SEE. The pattern lives in the geography.", "If an option throws the locations away, it throws the pattern away with them."]);

E("s7-u4-distribution-map", 4, ["SC7.10.5"], 2, "var", varset([
  function () {
    var q = mcq("Use the map of earthquake and volcano locations. Which statement best describes the pattern the map shows?",
      "The locations cluster along lines and belts, many of them around the edges of oceans and along the middle of the Atlantic",
      ["The locations are spread evenly over the whole Earth",
       "The locations occur only on land, never in the oceans",
       "The locations form a single straight line around the equator"],
      "Plot the points and the pattern is belts, not scatter: a ring around the Pacific, a line down the middle of the Atlantic, and a band through the Mediterranean to the Himalayas. Most of the Earth's surface has few or none.", {});
    q.figure = s7WorldMapSVG();
    return q;
  },
  function () {
    var q = mcq("Use the map of earthquake and volcano locations. A student claims earthquakes and volcanoes happen in completely different places. What does the map show?",
      "The claim is wrong: the two symbols mostly fall along the same belts",
      ["The claim is right: no belt contains both symbols",
       "The claim is right: volcanoes appear only in the oceans",
       "The map cannot compare the two, because it uses symbols"],
      "Along the Pacific ring, the mid-Atlantic line and the Mediterranean band, circles and triangles sit side by side. Where the crust is active, both earthquakes and volcanoes tend to occur.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["Read the map as a whole first: where are the points dense, and where are they absent?", "Compare the two symbols belt by belt before judging the claim."]);

E("s7-u4-ring-of-fire", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    var q = mcq("Use the map. The dense belt of earthquakes and volcanoes around the edge of the Pacific Ocean is called the Ring of Fire. What does this belt coincide with?",
      "The boundaries of the plate that lies under the Pacific Ocean, where it meets the plates around it",
      ["The equator, where the Earth spins fastest",
       "The edges of the Pacific's continents, by coincidence only",
       "A chain of underwater mountains with no relation to plates"],
      "The Ring of Fire traces the Pacific Plate's edges: where that plate dives under, pulls from or slides past its neighbours, earthquakes and volcanoes concentrate. The belt is a plate boundary drawn in events.", {});
    q.figure = s7WorldMapSVG();
    return q;
  },
  function () {
    var q = mcq("Use the map. The middle of the Atlantic Ocean shows a line of earthquakes and volcanoes running north to south, far from any continent. What is the best inference from this line?",
      "A plate boundary runs down the middle of the Atlantic, even though it lies under the ocean",
      ["Ships crossing the Atlantic cause the earthquakes along their routes",
       "The line marks the equator, where earthquakes are most common",
       "Volcanoes can only form in the middle of oceans"],
      "Events cluster at plate boundaries wherever the boundaries are, including under oceans. A straight belt of events in mid-ocean is evidence of a boundary there: the mid-Atlantic ridge, where plates pull apart.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["A belt of events is a boundary made visible; ask what the belt outlines.", "Test each option against the map: does the belt follow the equator, the coasts, or something else?"]);

E("s7-u4-cr-distribution", 4, ["SC7.10.5"], 3, "var", varset([
  function () {
    var q = textq("Use the map of earthquake and volcano locations. (a) Describe the pattern in where these events occur. (b) Infer the relationship between the pattern and plate boundaries, and explain your reasoning.",
      ["(a) The events are not evenly spread: they cluster in belts, around the Pacific Ocean, down the middle of the Atlantic, and across the Mediterranean to the Himalayas, with large areas (central continents, much of the ocean floors away from the belts) nearly empty. (b) The belts coincide with plate boundaries: the events happen where plates meet, because that is where plates dive, pull apart or slide, stressing rock (earthquakes) and letting magma rise (volcanoes). The map's pattern is evidence for the plate model"],
      "<b>Model answer:</b> (a) Earthquakes and volcanoes are not scattered evenly. They crowd into narrow belts: a ring around the Pacific Ocean, a line down the centre of the Atlantic, and a band running from the Mediterranean through the Middle East to the Himalayas. Wide regions, such as the centres of continents and most of the Pacific floor away from its edges, have almost none. (b) The belts line up with the boundaries between tectonic plates. That is where the action is: plates diving under each other, pulling apart or grinding past each other stress the rock until it snaps (earthquakes) and open paths for magma to rise (volcanoes). The middles of plates are quiet because the rock there is not being stressed or opened. The distribution pattern is therefore evidence that the plate boundary model is correct.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately (belts named, uneven spread stated). 1 mark for the inference that the belts coincide with plate boundaries. 1 mark for the reasoning connecting boundary processes (diving, parting, sliding) to the two event types.", {});
    q.figure = s7WorldMapSVG();
    return q;
  }
]), ["Describe first, infer second: the pattern is your evidence, the boundary is your conclusion.", "Name at least two belts, and say plainly that the events are NOT evenly spread."]);

/* ---------- SC7.10.6 Processes of mountain formation ---------- */

E("s7-u4-fold-fault", 4, ["SC7.10.6"], 1, "var", varset([
  function () {
    return mcq("Layers of sedimentary rock in a cliff face are bent into wave-like curves, like a rug pushed from both ends. Which process bent them?",
      "Folding: the layers were squeezed by compression until they bent",
      ["Faulting: the layers broke and slid past each other",
       "Weathering: wind and water wore the layers into curves",
       "Cementation: minerals glued the layers into curves as they formed"],
      "Compression squeezes rock layers until they bend: that is folding. Faulting is what happens when the rock cannot bend and breaks instead; weathering and cementation work at the surface and do not bend buried layers.", {});
  },
  function () {
    return mcq("A road cut shows rock layers that were once level, but one side of a crack in the rock sits several metres higher than the other side. Which process does this show?",
      "Faulting: the rock broke along a fault and the two sides shifted",
      ["Folding: the layers bent without breaking",
       "Erosion: water carried the lower side away",
       "Compaction: the weight of sediments squeezed one side down"],
      "A break with movement along it is a fault. The layers did not bend (folding) and nothing was worn or squeezed away: the two blocks of rock shifted against each other.", {});
  }
]), ["Bent without breaking is one process; broken and shifted is the other.", "Look for the crack: a break with offset means the rock faulted."]);

E("s7-u4-mountain-process", 4, ["SC7.10.6"], 2, "var", varset([
  function () {
    return mcq("The Appalachian Mountains, which run through western Newfoundland, formed hundreds of millions of years ago when continents collided. Which process built them?",
      "Folding and faulting: the collision squeezed the rock layers between the continents until they crumpled upward",
      ["Volcanic build-up: lava piled up layer on layer until it stood high",
       "Erosion: rivers carved the mountains out of a flat plain",
       "Deposition: sediments piled up until they reached mountain height"],
      "Continents colliding compress everything between them; the rock folds and faults upward into a range, as happened when the Appalachians rose. Erosion later wears ranges down; it does not raise them.", {});
  },
  function () {
    return mcq("In 1943, a Mexican farmer watched a crack open in his cornfield; within a year a new volcano, Paricutin, stood over 300 m tall where the field had been. Which mountain-building process does Paricutin show?",
      "Volcanic build-up: erupted lava and ash piled up around the vent until they formed a mountain",
      ["Folding: rock layers bent upward under compression",
       "Faulting: a block of crust was pushed up along a fault",
       "Glacial deposition: ice left a pile of rock and soil behind"],
      "Some mountains are built by accumulation: eruption after eruption stacks lava and ash into a cone. Paricutin grew in a field within a year, far too fast for folding or faulting, which work over millions of years.", {});
  }
]), ["Three builders: squeezing (folding and faulting), stacking (volcanic), and neither erosion nor deposition raises a range.", "Time is a clue: a mountain that appears in a year was stacked, not squeezed."]);

E("s7-u4-cr-mountain-explain", 4, ["SC7.10.6"], 3, "var", varset([
  function () {
    return textq("The Himalayas are still growing taller today. Using plate tectonics, explain how this mountain range formed and why it is still rising.",
      ["Two plates carrying continents are converging; neither continent sinks easily, so the collision squeezes the rock between them, which folds and faults upward into mountains. The plates are still converging today, so the squeezing continues and the range keeps rising (while erosion wears it down)"],
      "<b>Model answer:</b> The Himalayas stand where two plates, one carrying India and one carrying the rest of Asia, are moving toward each other. When ocean floor dives under a continent it can sink, but continent crust is too buoyant to sink far, so when the two continents met, the collision had nowhere to go: the rock layers between them were squeezed, folded and faulted upward into a mountain range. The plates have not stopped converging, so the squeeze continues today and the Himalayas are still being pushed up, even as weathering and erosion wear their tops down.<br><br><b>Marking points:</b> 1 mark for converging plates carrying continents. 1 mark for the mechanism: compression folding and faulting the rock upward because the continents cannot sink. 1 mark for the range still rising because convergence continues.", {});
  }
]), ["Continents cannot dive the way ocean floor does; ask where the collision's force goes instead.", "A range still rising needs a process still running: name it."]);

/* ---------- SC7.10.7 Chronological model or geological time scale ---------- */

E("s7-u4-era-order", 4, ["SC7.10.7"], 1, "gen", function () {
  var sets = [
    { ev: "the first fish appear in the oceans", era: "Paleozoic era", others: ["Cenozoic era", "Mesozoic era", "Precambrian"] },
    { ev: "the first mammals appear on land", era: "Mesozoic era", others: ["Cenozoic era", "Paleozoic era", "Precambrian"] },
    { ev: "the first humans appear", era: "Cenozoic era", others: ["Mesozoic era", "Paleozoic era", "Precambrian"] },
    { ev: "the first life forms appear in the oceans", era: "Precambrian", others: ["Cenozoic era", "Mesozoic era", "Paleozoic era"] },
    { ev: "the first forests spread across the land", era: "Paleozoic era", others: ["Cenozoic era", "Mesozoic era", "Precambrian"] },
    { ev: "the first flowering plants appear", era: "Mesozoic era", others: ["Cenozoic era", "Paleozoic era", "Precambrian"] }
  ];
  var s = pick(sets);
  return mcq("On a geological time scale of Earth's history, in which era does this event belong: " + s.ev + "?",
    s.era, s.others,
    "The four divisions in order are Precambrian (first life), Paleozoic (first fish, first forests), Mesozoic (first mammals, first flowering plants) and Cenozoic (first humans). Match the event to its era.", {});
}, ["Learn the order first: Precambrian, Paleozoic, Mesozoic, Cenozoic.", "Humans are the most recent arrival of all; life itself is the oldest event on the list."]);

E("s7-u4-era-scale", 4, ["SC7.10.7"], 2, "var", varset([
  function () {
    var q = mcq("Use the geological time strip, which is drawn to scale. Which statement about the Precambrian is correct?",
      "It covers most of Earth's history, about 87 percent of the 4.6 billion years, even though its name is less familiar",
      ["It is the shortest of the four divisions of Earth's history",
       "It began when the first fish appeared in the oceans",
       "It covers about the same length of time as the Cenozoic era"],
      "Read the strip's proportions: the Precambrian block takes up nearly nine tenths of the whole line. The other three eras, which hold the fish, the forests, the mammals and us, share the remaining sliver.", {});
    q.figure = s7TimeStripSVG();
    return q;
  },
  function () {
    return mcq("A class models Earth's 4.6 billion year history on a 4.6 m strip of paper, one metre per billion years. Roughly how much of the strip do humans occupy?",
      "A tiny fraction of the last centimetre: humans have existed for only a very small part of Earth's history",
      ["About half the strip, since humans are the most advanced life",
       "About one full metre at the end of the strip",
       "The whole strip, because the scale is a model of human history"],
      "Humans appear only in the last part of the Cenozoic era, which is itself the last 66 million years: about 6.6 cm of the strip, and humans occupy only a sliver of that. On the scale of Earth's history, we are very recent arrivals.", {});
  }
]), ["The strip is drawn to scale: judge lengths, not the fame of the events.", "Recent does not mean long: the era we live in is the shortest on the strip."]);

E("s7-u4-cr-timeline", 4, ["SC7.10.7"], 3, "var", varset([
  function () {
    return textq("A student is building a chronological model of Earth's history as a timeline. Place these four events in order from oldest to most recent, and justify where you placed ONE of the boundaries between the eras: first life forms appear; first fish appear; first mammals appear; first humans appear.",
      ["Order: first life forms (Precambrian); first fish (Paleozoic); first mammals (Mesozoic); first humans (Cenozoic). A justified boundary names an era change and the event that marks it, for example the Paleozoic to Mesozoic boundary is placed where new dominant life (mammals, flowering plants) appears after the era of fish and forests, or the Cenozoic is justified as the era in which humans appear, the most recent era"],
      "<b>Model answer:</b> Oldest to most recent: (1) first life forms appear, in the Precambrian; (2) first fish appear, in the Paleozoic era; (3) first mammals appear, in the Mesozoic era; (4) first humans appear, in the Cenozoic era. Boundary justification: the boundary between the Paleozoic and Mesozoic eras is placed where the fossil record changes character, from the era marked by the first fish and the first forests to the era marked by the first mammals and the first flowering plants. Each era on the model is defined by the major events and life forms that appear in it, so an event's era is decided by which set of first appearances it belongs with.<br><br><b>Marking points:</b> 1 mark for all four events in the correct order with their eras named. 1 mark for a boundary justified by the events or life forms that define the eras on either side of it.", {});
  }
]), ["Each era owns its first appearances: life, fish, mammals, humans, in that order.", "A boundary is justified by what changes across it, not by the line itself."]);

/* ---------- SC7.10.8 Weathering and erosion to form soils ---------- */

E("s7-u4-weathering-types", 4, ["SC7.10.8"], 1, "gen", function () {
  var DEF = {
    "Mechanical weathering": "the rock is broken into smaller pieces without changing what it is made of",
    "Chemical weathering": "the rock's material is changed by chemical reactions"
  };
  var sets = [
    { d: "Water seeps into cracks in a cliff, freezes on cold nights, and wedges pieces of rock off the cliff face", kind: "Mechanical weathering" },
    { d: "Acidic rainwater slowly dissolves the surface of a limestone statue, blurring its carved details", kind: "Chemical weathering" },
    { d: "Tree roots grow into the cracks of a boulder and pry the boulder apart as they thicken", kind: "Mechanical weathering" },
    { d: "Iron in a rock reacts with oxygen and water, forming rust that weakens and crumbles the rock", kind: "Chemical weathering" },
    { d: "Sand carried by the wind blasts and polishes the surface of rocks in a desert", kind: "Mechanical weathering" },
    { d: "Slightly acidic groundwater seeps through limestone and slowly eats out an underground cave", kind: "Chemical weathering" }
  ];
  var s = pick(sets);
  var other = s.kind === "Mechanical weathering" ? "Chemical weathering" : "Mechanical weathering";
  return mcq("Which classification is correct for this case: " + s.d + "?",
    s.kind + ": " + DEF[s.kind],
    [other + ": " + DEF[other], s.kind + ": " + DEF[other], other + ": " + DEF[s.kind]],
    "Mechanical weathering breaks rock into smaller pieces without changing what it is made of (freezing water, roots, wind-blown sand). Chemical weathering changes the rock's material itself through reactions (dissolving, rusting). The right option pairs the case with the correct type and that type's true definition.", {});
}, ["Ask one question: is the rock only being broken, or is its material being changed?", "Check both halves of each option: two of them pair a type with the other type's definition."]);

E("s7-u4-frost-wedging", 4, ["SC7.10.8"], 1, "var", varset([
  function () {
    return mcq("Why does frost wedging break rock apart in a Newfoundland and Labrador spring?",
      "Water in the cracks freezes and expands at night, then melts by day; repeated freezing pries the cracks wider until pieces break off",
      ["Ice is heavier than water and crushes the rock under its weight",
       "Cold makes rock contract until it shatters into pieces",
       "Frost dissolves the minerals that hold the rock together"],
      "Water is unusual: it expands as it freezes. In a crack, that expansion pushes outward with great force, and freeze-thaw cycles through a spring wedge the crack wider each time until the rock splits. This is mechanical weathering.", {});
  },
  function () {
    return mcq("A gardener finds that the soil in spring is full of small stones that were not at the surface in the fall, pushed up by the freezing ground. Which weathering process is connected to this lifting and breaking of buried rock?",
      "Frost action: freezing water expands and heaves the ground, cracking rock as it does so",
      ["Chemical weathering by plant roots dissolving the stones",
       "Erosion by the wind blowing stones to the surface",
       "Compaction of the soil under the snow's weight"],
      "Freezing water expands, heaving soil and stones upward (frost heave) and wedging cracks in rock wider. The stones rose because the ground itself moved and broke rock apart, a mechanical process.", {});
  }
]), ["Water expands when it freezes: that one fact drives the whole process.", "Any answer about dissolving or chemical change belongs to the other kind of weathering."]);

E("s7-u4-weathering-erosion", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("Which statement correctly distinguishes weathering from erosion?",
      "Weathering breaks rock down where it sits; erosion moves the broken material away",
      ["Weathering moves rock pieces away; erosion breaks rock down where it sits",
       "Weathering happens only in water and erosion only in air",
       "Weathering and erosion are two names for exactly the same process"],
      "The two processes work in sequence: weathering does the breaking, erosion does the carrying. Rivers, wind, gravity and glaciers erode; they move what weathering has loosened.", {});
  },
  function () {
    return mcq("A river runs brown with sediment after heavy rain on a steep, logged hillside. Which pairing of process and agent is correct?",
      "Erosion, carried out by running water moving weathered material downhill",
      ["Weathering, carried out by the rain dissolving the hillside",
       "Deposition, carried out by gravity pulling the sediment upward",
       "Compaction, carried out by the river squeezing the sediment"],
      "The material was weathered earlier, in place; the river is now transporting it, which is erosion, and running water is the agent. Deposition comes later, where the river slows and drops its load.", {});
  }
]), ["Breaking in place, or carrying away? That single question separates the two.", "Name the agent as well: water, wind, gravity and glaciers are the carriers."]);

E("s7-u4-winter-chime", 4, ["SC7.10.8"], 2, "var", varset([
  function () {
    return mcq("A class hangs a wind chime made of glass tubes and metal bells outside for a winter design challenge. By spring, the glass is chipped where small stones struck it on windy nights, and the metal bells show rust spots. Which pairing is correct?",
      "The chipping is mechanical weathering by wind-blown particles; the rusting is chemical weathering",
      ["The chipping is chemical weathering; the rusting is mechanical weathering",
       "Both the chipping and the rusting are erosion",
       "Both the chipping and the rusting are chemical weathering"],
      "Impacts break the glass without changing what glass is: mechanical weathering. Rust is a new substance formed when iron reacts with oxygen and water: chemical weathering. Nothing here was carried away, so neither is erosion.", {});
  },
  function () {
    return mcq("For the same wind chime challenge, a team wants to slow the weathering of the metal bells. Which design choice targets the CHEMICAL weathering they observed?",
      "Coat the bells so water and oxygen cannot reach the metal surface as easily",
      ["Hang the chime where wind-blown sand cannot strike it",
       "Make the bells thicker so impacts chip them less",
       "Hang the chime lower so it is easier to inspect"],
      "Rusting needs water and oxygen at the metal's surface; a coating blocks both and slows the reaction. Shielding from blown sand and thickening the metal target the mechanical damage instead.", {});
  }
]), ["Sort each damage type first: broken, or chemically changed?", "A protection only works on the process it blocks: coatings block reactions, shields block impacts."]);

E("s7-u4-cr-weathering", 4, ["SC7.10.8"], 3, "var", varset([
  function () {
    return textq("A granite cliff stands above a river. Explain how material from this cliff could, over a very long time, end up as part of a soil or a sedimentary rock. Name the processes in order.",
      ["Weathering breaks the cliff down (frost wedging in cracks, root action, chemical weathering of its minerals); erosion (gravity dropping pieces, the river carrying them) moves the material; the pieces are broken down further as they travel; where the material settles and stays, it can build soil in place (with decaying organic matter added) or be buried, compacted and cemented into sedimentary rock"],
      "<b>Model answer:</b> First, weathering attacks the cliff where it stands: water freezes in its cracks and wedges pieces off (frost wedging), roots pry at the cracks, and rainwater chemically weakens some of its minerals. Gravity drops the loosened pieces to the cliff's base, and the river erodes them, carrying them downstream and breaking them smaller as they tumble. Where the river slows, the sediment is deposited. From there the paths divide: sediment that stays at the surface, mixed with decaying plant and animal material, becomes soil over time; sediment that is buried under later layers is compacted and cemented into sedimentary rock.<br><br><b>Marking points:</b> 1 mark for weathering named and described at the cliff (any agent). 1 mark for erosion and transport by gravity or the river. 1 mark for a correct ending: soil formation at the surface with organic matter, or burial, compaction and cementation into sedimentary rock.", {});
  }
]), ["Keep the sequence in order: break down, carry away, settle, then become soil or rock.", "Soil needs one ingredient rock alone cannot supply: material from living things."]);

/* ---------- SC7.10.9 Classify soils by characteristics ---------- */

E("s7-u4-soil-texture", 4, ["SC7.10.9"], 1, "gen", function () {
  var DESC = {
    "Coarse-textured (sandy) soil": "made of coarse particles that feel gritty",
    "Fine-textured (clay) soil": "made of very fine particles that feel smooth and sticky",
    "Medium-textured (loamy) soil": "made of a mixture of particle sizes"
  };
  var sets = [
    { d: "feels gritty between the fingers, falls apart easily when squeezed, and is made of coarse particles", cls: "Coarse-textured (sandy) soil" },
    { d: "feels smooth and greasy, sticks together in a lump, and is made of very fine particles", cls: "Fine-textured (clay) soil" },
    { d: "feels like a mixture: some grit, some smooth material, and it holds together loosely without being sticky", cls: "Medium-textured (loamy) soil" },
    { d: "is full of small stones and coarse grains that you can see and feel individually", cls: "Coarse-textured (sandy) soil" }
  ];
  var s = pick(sets);
  var classes = Object.keys(DESC);
  var others = classes.filter(function (c) { return c !== s.cls; });
  return mcq("A soil sample " + s.d + ". Which classification is correct?",
    s.cls + ": " + DESC[s.cls],
    [others[0] + ": " + DESC[others[0]], others[1] + ": " + DESC[others[1]], s.cls + ": " + DESC[others[0]]],
    "Texture class follows particle size: coarse particles you can feel as grit make a sandy (coarse-textured) soil; the finest particles, smooth and sticky, make clay (fine-textured); a mixture of sizes makes loam (medium-textured). The right option pairs the class with its own particle description.", {});
}, ["Feel is data here: grit means coarse, grease and stickiness mean fine, a mixture means loam.", "Check both halves of each option: a right class with a wrong particle description is still wrong."]);

E("s7-u4-soil-form", 4, ["SC7.10.9"], 1, "var", varset([
  function () {
    return mcq("What is soil made from?",
      "Weathered rock material mixed with decaying organic matter from living things, plus air and water in its spaces",
      ["Rock dust alone, ground fine by glaciers",
       "Decayed plants alone, with no rock material in it",
       "Sand washed up from the ocean over thousands of years"],
      "Soil needs both parents: weathering supplies the mineral particles from rock, and living things supply the organic matter as they die and decay. Neither one alone makes soil.", {});
  },
  function () {
    return mcq("Two soils form side by side, one on granite bedrock and one on shale bedrock, under the same climate and plants. Why do the two soils differ?",
      "Soil inherits characteristics from its parent rock, so different bedrock produces different soil",
      ["The climate must secretly be different over the two soils",
       "Soils never differ when the plants growing in them are the same",
       "The soil on granite is older, and age is the only thing that matters"],
      "The parent material is one of the things that shapes a soil: granite weathers to a coarser, sandier soil, while shale weathers toward finer, clay-rich soil. Same weather, same plants, different starting rock, different soil.", {});
  }
]), ["Soil has two parents: broken rock and once-living material.", "Where a soil forms decides what it starts from: the rock underneath matters."]);

E("s7-u4-soil-drainage", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    var q = mcq("Use the drainage results. Which soil would leave a plant's roots sitting in water longest after rain, and why?",
      "The clay soil: its fine particles pack tightly, leaving small spaces, so water moves through it very slowly (low permeability)",
      ["The sandy soil: its large particles trap water between them",
       "The gravel: its spaces are too small for water to enter",
       "All three soils drain at the same rate once they are wet"],
      "Read the bars: clay took by far the longest for the same volume of water. Fine particles pack closely, so the connected spaces are small and water creeps through slowly; sand and gravel have larger spaces and drain fast.", {});
    q.figure = s7DrainSVG([{ name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }, { name: "gravel", secs: 6 }]);
    return q;
  },
  function () {
    return mcq("What is the difference between a soil's porosity and its permeability?",
      "Porosity is how much open space the soil has to hold water; permeability is how easily water can move through those spaces",
      ["Porosity is how fast water drains; permeability is how much water the soil holds",
       "They are two names for the same property of a soil",
       "Porosity applies only to clay and permeability only to sand"],
      "A soil can hold a lot of water yet let it move slowly: clay is porous but not very permeable, because its spaces are tiny. Porosity is storage; permeability is movement.", {});
  }
]), ["Longest bar means slowest drainage; connect slow drainage to small, tightly packed particles.", "Hold versus flow: one word is about space, the other about movement through the space."]);

E("s7-u4-cr-soil-case", 4, ["SC7.10.9"], 2, "var", varset([
  function () {
    return textq("A gardener digs a sample of soil from a new plot. The sample feels greasy and sticks together in a lump when squeezed, its particles are too fine to see individually, and after rain the plot stays puddled for days. (a) Classify this soil by its texture. (b) Justify your classification with TWO of the observations. (c) The bedrock under the plot is shale. Explain why that fits your classification.",
      ["(a) Fine-textured (clay) soil. (b) Any two of: greasy feel and sticking together (fine particles), particles too fine to see (smallest particle size), very slow drainage leaving puddles (low permeability of packed fine particles). (c) Shale is a fine-grained rock; it weathers into fine particles, so a shale parent rock produces a fine-textured, clay-rich soil"],
      "<b>Model answer:</b> (a) The soil is a fine-textured (clay) soil. (b) Its particles are too fine to see one by one, the smallest of the three texture classes, and it feels greasy and sticks together when squeezed, which is how fine clay particles behave; it also drains so slowly that puddles sit for days, because the tightly packed fine particles leave only tiny spaces for water to move through. (c) Soil inherits its particle sizes from its parent rock. Shale is itself made of fine mud particles, so as it weathers it breaks down into fine material, producing a clay soil rather than a sandy one.<br><br><b>Marking points:</b> 1 mark for the classification (fine-textured, clay) supported by at least one observation tied to particle size or drainage. 1 mark for the parent rock explanation: shale is fine-grained and weathers into fine particles, producing a fine-textured soil.", {});
  }
]), ["Classify from the feel and the drainage together; one observation alone can mislead.", "Finish the chain: bedrock weathers into particles, and the particles set the texture."]);

/* ---------- SC7.11.1 How plate tectonic theory evolved ---------- */

E("s7-u4-wegener-evidence", 4, ["SC7.11.1"], 1, "var", varset([
  function () {
    return mcq("Alfred Wegener argued that the continents had once been joined. Which of the following was one of his four main types of evidence?",
      "Fossils of the same land animals and plants found on continents now separated by oceans",
      ["Photographs of the continents taken from space",
       "Measurements showing the continents moving several metres each year",
       "Rock samples drilled from the middle of the ocean floor"],
      "Wegener's evidence was the fit of the continents, matching fossils across oceans, matching rock layers and mountain ranges, and evidence of past climates. Drilling the ocean floor and measuring movement came decades later and belonged to the next stage of the theory.", {});
  },
  function () {
    return mcq("Coal, which forms in warm, swampy climates, is found in Antarctica, now covered in ice. For Wegener, what kind of evidence was this?",
      "Climate evidence: the continent must once have sat in a warmer climate zone",
      ["Fossil evidence, because coal is made of fossils",
       "Rock layer evidence, because coal is a type of rock layer",
       "Evidence against his theory, since it had nothing to do with continents"],
      "Wegener sorted his evidence into fit, fossils, rock layers and climate. Coal in a frozen continent is climate evidence: either the continent moved from a warmer place, or the whole Earth's climate was once different, and the fossil and rock evidence pointed to the continent moving.", {});
  }
]), ["Wegener worked in 1912: if an option needs ships, drills or satellites, it is not his.", "Sort each option into his four boxes: fit, fossils, rocks, climate."]);

E("s7-u4-boundaries", 4, ["SC7.11.1"], 1, "gen", function () {
  var MOVE = {
    "A diverging boundary": "the plates are pulling apart",
    "A converging boundary": "the plates are pushing together",
    "A transform boundary": "the plates are sliding sideways past each other"
  };
  var sets = [
    { d: "New crust forms in the gap between two plates, as along the mid-Atlantic ridge", b: "A diverging boundary" },
    { d: "One plate dives beneath another, as off the coast of Japan", b: "A converging boundary" },
    { d: "Two plates grind past each other horizontally, as along the San Andreas Fault in California", b: "A transform boundary" },
    { d: "Two plates carrying continents collide, and the crust between them crumples upward into mountains", b: "A converging boundary" }
  ];
  var s = pick(sets);
  var types = Object.keys(MOVE);
  var others = types.filter(function (t) { return t !== s.b; });
  return mcq(s.d + ". Which classification is correct?",
    s.b + ": " + MOVE[s.b],
    [others[0] + ": " + MOVE[others[0]], others[1] + ": " + MOVE[others[1]], s.b + ": " + MOVE[others[0]]],
    "Boundary names describe the movement: diverging plates pull apart, converging plates push together, and transform plates slide sideways past each other. The right option pairs the boundary with its own movement.", {});
}, ["Name the movement in the description first (apart, together, sideways), then pick the option that pairs it with the right word.", "Check both halves: a right name with a wrong movement is still a wrong answer."]);

E("s7-u4-convection", 4, ["SC7.11.1"], 2, "var", varset([
  function () {
    return mcq("Scientists model the mantle's movement with a pot of thick soup heating on a stove: hot soup rises, spreads at the surface, cools and sinks at the edges. In the Earth model, what do these convection currents do?",
      "They carry the plates along as the mantle material slowly circulates",
      ["They melt the crust from below wherever they rise",
       "They cause the ocean tides as the mantle sloshes",
       "They spin the inner core to make Earth's magnetic field"],
      "Heat from the core drives slow convection in the mantle: rising, spreading, sinking. The plates ride on this moving material, which supplies the mechanism Wegener's theory lacked.", {});
  },
  function () {
    return mcq("Why did the idea of convection currents in the mantle matter so much to plate tectonic theory?",
      "It supplied a possible mechanism: a way for the plates to be moved, which continental drift had never explained",
      ["It proved that the continents themselves were liquid",
       "It explained why earthquakes happen on the Moon",
       "It showed that the mantle was the same temperature throughout"],
      "Wegener could say the continents moved but not what moved them, and that gap sank his theory. Convection currents gave plate tectonics the engine it needed: heat-driven circulation in the mantle dragging the plates.", {});
  }
]), ["The soup pot is a model: rising, spreading, sinking, in a slow loop.", "Ask what problem the idea solved. The theory before it had a famous missing piece."]);

E("s7-u4-new-evidence", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return mcq("In the 1960s, drilling ships brought up rock samples from the ocean floor. The rocks were youngest at the mid-ocean ridges and older farther away, on both sides. Why was this evidence so powerful for plate tectonics?",
      "It showed new crust forming at the ridges and spreading outward, exactly as sea floor spreading predicted",
      ["It proved the ocean floor was the oldest part of the Earth",
       "It showed that the continents had never moved at all",
       "It revealed that ocean water was slowly dissolving the crust"],
      "A prediction confirmed is strong evidence: sea floor spreading said crust is born at ridges and ages as it moves away, and the drilled ages matched on both sides of the ridge. Continental drift alone never predicted this.", {});
  },
  function () {
    return mcq("Three technologies produced three discoveries: sonar mapped a mountain ridge down the middle of the Atlantic; magnetometers found magnetic stripes matching on both sides of the ridge; drilling showed the floor aging away from the ridge. Taken together, what did they establish?",
      "That the ocean floor is spreading apart from the ridges, carrying the continents with it",
      ["That the Atlantic Ocean has always been its present size",
       "That Wegener's original evidence had all been mistaken",
       "That the continents plough through a stationary ocean floor"],
      "Each technology added a piece: shape (sonar), record (magnetism), and age (drilling). Together they replaced Wegener's picture of continents ploughing through the floor with plates, ocean floor included, moving as one.", {});
  }
]), ["Judge evidence by what it confirms: a prediction that comes true carries weight.", "Three tools, three different kinds of data, one conclusion: check that the conclusion uses all three."]);

E("s7-u4-cr-theory-evolved", 4, ["SC7.11.1"], 3, "var", varset([
  function () {
    return textq("Explain how the explanation of the moving Earth changed from Wegener's continental drift to modern plate tectonics. In your answer, name the evidence Wegener started with, the problem his theory could not solve, and the new evidence that solved it.",
      ["Wegener's evidence: the fit of the continents, matching fossils across oceans, matching rock layers, and climate evidence such as coal in Antarctica. The problem: no mechanism; he could not say what force moved the continents, so most scientists rejected the theory. The new evidence: sonar mapping of mid-ocean ridges, magnetometer records of magnetic stripes, and deep sea drilling showing the ocean floor aging away from the ridges, leading to sea floor spreading and convection currents as the mechanism. The theory that resulted (plate tectonics) has whole plates, continents and ocean floor together, moving"],
      "<b>Model answer:</b> Wegener began with continental drift: the continents fit together like puzzle pieces, the same fossils appear on continents now separated by oceans, rock layers and mountain ranges match across the Atlantic, and coal in Antarctica points to continents having sat in different climates. But he could not explain what moved the continents, and without a mechanism most scientists rejected his theory. After the Second World War, new technology changed the picture. Sonar mapped a great ridge down the middle of the Atlantic. Magnetometers found stripes of normal and reversed magnetism in the ocean floor, matching on both sides of the ridge. Drilling ships showed the floor is youngest at the ridge and older with distance, proof that new crust forms at ridges and spreads outward. With convection currents in the mantle proposed as the engine, the explanation became plate tectonics: not continents ploughing through the ocean floor, but whole plates, continent and ocean floor together, in motion.<br><br><b>Marking points:</b> 1 mark for Wegener's evidence, at least two types named. 1 mark for the problem: no mechanism for moving the continents. 1 mark for the new evidence (any two of sonar, magnetometers, drilling) and what it established (sea floor spreading, plates moving as wholes).", {});
  }
]), ["Structure the story in three acts: the claim, the flaw, the fix.", "Every act needs its evidence named, not just its conclusion."]);

/* ---------- SC7.11.2 Canadian contributions ---------- */

E("s7-u4-canadian-match", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("Which Canadian scientist is matched with the contribution he is known for?",
      "J. Tuzo Wilson recognized transform boundaries, where plates slide sideways past each other",
      ["J. Tuzo Wilson discovered the fossil dinosaurs of Alberta",
       "Joseph Tyrrell proposed the theory of continental drift",
       "Harold Williams invented the seismograph"],
      "Wilson's contribution was transform boundaries, the third boundary type, which plate tectonics needed. Tyrrell is the dinosaur and past-climate name; Williams worked on plate activity along eastern North America; continental drift was Wegener, who was German.", {});
  },
  function () {
    return mcq("Harold Williams, working in Newfoundland, studied the rocks of the Appalachian region. What was his contribution?",
      "He recognized evidence of ancient plate activity along the eastern margin of North America, helping explain how the Appalachians formed",
      ["He proved that Newfoundland was once part of Europe by drilling the ocean floor",
       "He discovered the mid-Atlantic ridge using sonar",
       "He named the three types of plate boundaries"],
      "Williams read the rocks of Newfoundland and the Appalachians as the remains of an ancient ocean and its plate collisions, evidence that plate tectonics had been at work along eastern North America hundreds of millions of years ago.", {});
  }
]), ["Three Canadians, three contributions: boundaries, dinosaurs and climate, ancient plates in the east.", "If an option hands a Canadian someone else's famous work (drift, sonar, the seismograph), it is wrong."]);

E("s7-u4-canadian-scenario", 4, ["SC7.11.2"], 1, "var", varset([
  function () {
    return mcq("In the 1880s, a Canadian geologist surveying in Alberta found dinosaur fossils and other evidence that the region had once had a much warmer climate. Which contributor and scale does this describe?",
      "Joseph Tyrrell, whose fossil evidence spoke to the climate history of a whole region",
      ["J. Tuzo Wilson, whose work was on the scale of single rock samples",
       "Harold Williams, whose work concerned only his local outcrop",
       "Alfred Wegener, whose work was Canadian and regional"],
      "Tyrrell's Alberta finds, dinosaurs and signs of a warmer past climate, fed the same kind of climate evidence Wegener later used. The contribution worked at regional scale: what Alberta's rocks said about the past of a whole region.", {});
  },
  function () {
    return mcq("A contribution to geology can work at a local, regional or global scale. Wilson's recognition of transform boundaries applies to plates all over the Earth. At which scale did his contribution work?",
      "The global scale: it changed how every plate boundary on Earth is understood",
      ["The local scale: it explained one outcrop near his university",
       "The regional scale: it applied only to Canada's west coast",
       "No scale: it was later shown to be wrong everywhere"],
      "Transform boundaries completed the boundary set (diverging, converging, transform) for the whole planet. A contribution that changes a worldwide theory works at the global scale, wherever its author lived.", {});
  }
]), ["Match the person to the finding first; the scale follows from how far the finding reaches.", "A theory-level contribution is global even when the scientist worked in one place."]);

/* ---------- SC7.11.3 Explanations rest on evidence ---------- */

E("s7-u4-imagination-role", 4, ["SC7.11.3"], 1, "var", varset([
  function () {
    return mcq("Fossils of ocean animals are found in rock high in the mountains of Newfoundland. What does this observation suggest, when scientists reason imaginatively from the evidence?",
      "That the rock formed under an ancient ocean and was later pushed up as mountains formed",
      ["That the ocean animals once lived on dry land",
       "That people carried the fossils up the mountains long ago",
       "That the mountains were built by the fossils piling up"],
      "The fossils are evidence; the explanation is inferred. Ocean animals live in oceans, so their fossils in mountain rock mean the rock was once sea floor, raised up by the same plate forces that built the mountains.", {});
  },
  function () {
    return mcq("Minerals that form only in warm climates are found in rocks in the polar regions. Which statement best describes how a scientist uses this observation?",
      "The observation is evidence; imagining the continent in a warmer place in the past is the inference built on it",
      ["The observation proves by itself exactly where the continent was",
       "The observation is an opinion, because it cannot be seen today",
       "The observation should be ignored, since the minerals might be wrong"],
      "Scientific explanations are built from evidence plus inferred relationships: the minerals (evidence) connect to a past climate, and the past climate connects to a continent that has moved. The observation alone is not the whole explanation.", {});
  }
]), ["Separate the two parts: what was observed, and what was inferred from it.", "An inference is not a guess: it is a relationship the evidence supports."]);

E("s7-u4-evidence-link", 4, ["SC7.11.3"], 2, "var", varset([
  function () {
    return mcq("A scientist argues that South America and Africa were once joined. Which PAIR of observations, taken together, makes the strongest case?",
      "The two coastlines fit together, and the same distinctive rock layers and fossils appear on both sides of the Atlantic",
      ["Both continents have beaches, and both are in the southern hemisphere",
       "Both continents are large, and both have mountains somewhere",
       "Both continents have rivers, and both have warm climates today"],
      "One observation can be coincidence; two independent ones that point the same way are a relationship. Fit plus matching rocks and fossils is the combination Wegener built on. The other pairs are true of many places that were never joined.", {});
  },
  function () {
    return mcq("Which observation most directly supports the explanation that the Atlantic Ocean is still widening?",
      "Measurements show the ocean floor is youngest at the mid-Atlantic ridge and gets older toward both continents",
      ["The Atlantic has storms that push water toward both shores",
       "Ships take longer to cross the Atlantic than they used to",
       "The coastlines of the Atlantic continents are slowly eroding"],
      "A widening ocean predicts new crust at the ridge aging outward, and that is exactly what drilling found. The relationship between ridge, age and distance is the evidence; the other options do not measure the floor at all.", {});
  }
]), ["Strong cases pair independent observations that point the same way.", "Ask of each option: if this were true, would it actually support the claim?"]);

E("s7-u4-cr-big-picture", 4, ["SC7.11.3"], 3, "var", varset([
  function () {
    return textq("In the 1950s, scientists had three separate observations: a mountain ridge runs down the middle of the Atlantic Ocean; the rocks of the ocean floor carry stripes of normal and reversed magnetism; and the ocean floor is youngest in the middle and older toward the continents. Explain how scientists connected these separate observations into ONE explanation.",
      ["The three observations fit a single process: new crust forms at the ridge (explaining the ridge and the young rocks there), spreads outward carrying the magnetic record with it (explaining the matching stripes), and ages as it travels (explaining the age pattern). The explanation, sea floor spreading, is built by finding the relationship among the observations, not from any one of them alone"],
      "<b>Model answer:</b> No single observation explains itself, but together they interlock. The ridge in the middle of the Atlantic is where new crust could be forming. The magnetic stripes match on both sides of the ridge, as if the floor were a tape recording made at the ridge and carried away in both directions. The ages confirm it: youngest at the ridge, older the farther you drill from it. The one explanation that fits all three is sea floor spreading: crust is born at the ridge and moves outward, recording Earth's magnetic reversals as it goes and aging as it travels. This is how scientific explanations are built: evidence collected separately, then connected by an inferred relationship that accounts for all of it at once.<br><br><b>Marking points:</b> 1 mark for using at least two of the three observations accurately. 1 mark for the single explanation (sea floor spreading) stated. 1 mark for the connection: how the explanation accounts for the observations together rather than one at a time.", {});
  }
]), ["One observation is a fact; three that interlock are an explanation.", "Say what process would produce ALL of the observations at once."]);

/* ---------- SC7.11.4 Understanding changed as evidence collected ---------- */

E("s7-u4-change-timeline", 4, ["SC7.11.4"], 1, "var", varset([
  function () {
    return mcq("Which sequence shows how the scientific understanding of Earth's moving crust changed over time, in the correct order?",
      "Continental drift proposed, drift widely rejected, sea floor spreading discovered, plate tectonics accepted",
      ["Plate tectonics accepted, sea floor spreading discovered, drift proposed, drift rejected",
       "Sea floor spreading discovered, drift proposed, plate tectonics accepted, drift rejected",
       "Drift rejected, drift proposed, plate tectonics accepted, sea floor spreading discovered"],
      "The order matters: Wegener proposed drift (1912), the missing mechanism led to rejection, the ocean floor evidence of the 1950s and 1960s supplied spreading, and plate tectonics followed as the accepted explanation.", {});
  },
  function () {
    return mcq("Early maps, such as one from 1482, showed a world very different from the world map of 1587, after explorers had sailed the oceans. What made the pictured world change between the two maps?",
      "New observations: explorers' reports and measurements replaced guesses about lands no one had mapped",
      ["Artists became more skilled at drawing coastlines",
       "The continents moved noticeably during those hundred years",
       "Mapmakers agreed to draw the world differently as a fashion"],
      "The world did not change; the evidence did. Each voyage added observations, and the picture of the Earth was redrawn to fit them, the same pattern by which plate tectonics later redrew it again.", {});
  }
]), ["The theory's story has a fixed order: proposal, rejection, new evidence, acceptance.", "When a picture of the world changes, ask what new observations forced the change."]);

E("s7-u4-change-why", 4, ["SC7.11.4"], 2, "var", varset([
  function () {
    return mcq("Wegener's continental drift was rejected by most scientists of his time, even though his fossil and coastline evidence was real. What was the main scientific reason for the rejection?",
      "He could not explain what force could move the continents; his theory had no mechanism",
      ["His fossils were later shown to be fakes",
       "Scientists had already proven the continents were fixed using satellites",
       "He refused to publish his evidence for others to check"],
      "The evidence was genuine but incomplete: a theory that says continents move must say how. With no workable mechanism, the scientific community set the theory aside until the ocean floor evidence and convection supplied one.", {});
  },
  function () {
    return mcq("Why did acceptance of moving continents come in the 1960s rather than in Wegener's lifetime?",
      "New technology (sonar, magnetometers, drilling ships) produced ocean floor evidence that Wegener never had",
      ["Scientists of the 1960s were simply more open-minded people",
       "Wegener's original notes were rediscovered in an archive",
       "A single large earthquake proved the continents were moving"],
      "The change was driven by evidence, not fashion: instruments that did not exist in 1912 mapped the ridges, read the magnetic stripes and dated the floor. Understanding changed when the evidence arrived.", {});
  }
]), ["A theory can have true evidence and still fail: check for the missing mechanism.", "Understanding changes when evidence changes; look for the new instrument or data set."]);

E("s7-u4-cr-change-explain", 4, ["SC7.11.4"], 3, "var", varset([
  function () {
    return textq("Describe how scientific understanding of the forces that shape the Earth changed as ONE of these bodies of evidence was collected: the magnetic stripes in the ocean floor, OR the ages of ocean floor rocks from drilling. In your answer, state what scientists believed before the evidence, what the evidence showed, and how the understanding changed.",
      ["Before: the ocean floor was assumed old and unchanging, and continents were widely believed fixed (drift rejected). The magnetic stripes showed bands of normal and reversed magnetism matching on both sides of the mid-ocean ridge, a record of the floor spreading from the ridge; OR the drilling ages showed the floor youngest at the ridge and older with distance, proving new crust forms at ridges. After: the floor itself moves, carrying continents as parts of plates; the fixed-Earth understanding gave way to plate tectonics"],
      "<b>Model answer:</b> Before the evidence: after Wegener's rejection, the standard understanding was that the continents and ocean floor were fixed, and the ocean floor was assumed to be ancient. What the evidence showed: ships towing magnetometers found stripes of normal and reversed magnetism in the ocean floor rocks, and the stripe pattern on one side of the mid-Atlantic ridge matched the pattern on the other side, stripe for stripe. How the understanding changed: matching stripes are the signature of a recording made in the middle and carried both ways. The floor must be forming at the ridge, locking in the magnetism of the day, and spreading outward. Once the floor itself moves, the continents riding on the plates move with it, and the fixed-Earth picture was replaced by plate tectonics.<br><br><b>Marking points:</b> 1 mark for the before state (fixed continents, ancient unchanging floor). 1 mark for what the chosen evidence actually showed. 1 mark for the changed understanding (moving floor, plates, continents carried).", {});
  }
]), ["Use a before, evidence, after structure; the change is the story.", "Pick one body of evidence and follow it all the way through."]);

/* ---------- SC7.11.5 Continental drift as an early explanation ---------- */

E("s7-u4-drift-identify", 4, ["SC7.11.5"], 1, "var", varset([
  function () {
    return mcq("What did the theory of continental drift claim?",
      "That the continents were once joined in a single landmass and have slowly moved apart to their present positions",
      ["That the continents are shrinking as the Earth cools",
       "That ocean water is slowly covering the continents",
       "That the continents formed where they are and have never moved"],
      "Continental drift (Wegener, 1912) proposed one supercontinent, Pangaea, breaking apart and drifting to today's map. It was the early explanation that plate tectonics later replaced and completed.", {});
  },
  function () {
    return mcq("Wegener named the single landmass that he believed later broke apart. What was it called?",
      "Pangaea",
      ["Atlantis", "Gondwana was the name he gave the whole landmass", "The name was never recorded"],
      "Wegener called the joined landmass Pangaea, meaning all lands. (Gondwana was its southern part, not the whole.)", {});
  }
]), ["Drift is the early explanation: joined once, apart now.", "One name belongs to the whole landmass; the others are parts or legends."]);

E("s7-u4-drift-evidence", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("Trilobite fossils found in the rocks of Newfoundland's Avalon Peninsula match fossils found in Wales, in the United Kingdom, more closely than fossils on the North American mainland nearby. How does this support continental drift?",
      "The Avalon region and Wales were once joined or close together, and drifted apart to their present positions",
      ["Trilobites swam across the Atlantic and settled in both places",
       "The fossils prove that Wales was once part of Canada politically",
       "The matching is a coincidence with no geological meaning"],
      "Trilobites were shallow-water animals that could not cross a deep ocean. Matching fossils across the Atlantic make sense if the two coasts were once neighbours, as Newfoundland's Avalon zone is now understood to have been attached to the European side.", {});
  },
  function () {
    return mcq("Which observation did Wegener use that involves the SHAPE of the continents?",
      "The coastlines of South America and Africa fit together like pieces of a jigsaw puzzle",
      ["Both continents are roughly triangular in shape",
       "The continents are all wider in the north than in the south",
       "The continents' shapes change noticeably every century"],
      "The fit of the Atlantic coastlines was Wegener's starting observation, and it grew stronger when the fit was made at the edge of the continental shelves rather than the modern beaches.", {});
  }
]), ["Fossils that match across an ocean need the ocean to have been absent or narrow.", "Wegener's first clue was a map: look for the option about fit."]);

E("s7-u4-drift-flaw", 4, ["SC7.11.5"], 2, "var", varset([
  function () {
    return mcq("What was the major flaw in Wegener's theory of continental drift?",
      "It offered no workable mechanism: no force or process that could actually move the continents",
      ["It claimed the continents moved at several metres per year",
       "It was based on fossils that did not exist",
       "It said the continents had once been joined, which was the flaw"],
      "The claim itself turned out to be right; the flaw was the missing engine. Wegener suggested forces far too weak to do the job, and until convection and sea floor spreading supplied a mechanism, the theory could not be accepted.", {});
  },
  function () {
    return mcq("Wegener suggested the continents ploughed through the ocean floor as they moved. Why did this part of his theory fail?",
      "The ocean floor is strong rock; continents cannot plough through it, and no grooves or crushed floor from such ploughing exist",
      ["The ocean floor is liquid, so the continents would have sunk",
       "Continents move too fast to leave any mark on the floor",
       "The continents are lighter than air and float above the floor"],
      "Sea floor spreading replaced the ploughing picture: the floor moves with the continent as part of the same plate. Wegener's mechanism predicted a battered ocean floor that surveys never found.", {});
  }
]), ["The flaw was not the claim but the how: no mechanism strong enough.", "A mechanism makes predictions; check whether the predicted traces exist."]);

/* ---------- SC7.11.6 Plate tectonics as a major shift in world view ---------- */

E("s7-u4-shift-identify", 4, ["SC7.11.6"], 1, "var", varset([
  function () {
    return mcq("Why is plate tectonics described as a major shift in the scientific world view, rather than a small correction?",
      "It replaced the picture of a fixed Earth with a picture of an Earth whose surface is constantly being created, moved and recycled",
      ["It changed the names of the continents on world maps",
       "It corrected the measured size of the Earth by a small amount",
       "It only affected how earthquakes are named"],
      "A world view shift changes the framework itself: before, the Earth's surface was fixed and only wore down; after, the surface is a system of moving plates that builds mountains, opens oceans and recycles crust. Everything in geology is read differently inside the new picture.", {});
  },
  function () {
    return mcq("Which statement belongs to the plate tectonics world view?",
      "The Earth's surface is divided into plates that move, carrying continents and ocean floor, and interact at their boundaries",
      ["The continents are fixed, and only the oceans change over time",
       "Mountains form mainly where rivers deposit sediment",
       "The Earth's interior is completely solid and still"],
      "The plate tectonics picture: a moving, divided surface, with earthquakes, volcanoes and mountains concentrated at the boundaries where plates interact. The fixed-surface statements belong to the older view.", {});
  }
]), ["A shift replaces the framework, not a detail inside it.", "Look for the option in which the surface itself is in motion."]);

E("s7-u4-shift-contrast", 4, ["SC7.11.6"], 2, "var", varset([
  function () {
    return mcq("A student writes: 'The Atlantic Ocean has always been the same width, because the continents cannot move.' Which world view is the student using, and what evidence contradicts it?",
      "The old fixed-continent view; the matching coastlines, fossils and rock layers across the Atlantic, and the young, spreading ocean floor between them, contradict it",
      ["The plate tectonics view; no evidence contradicts it",
       "The continental drift view; satellite photographs contradict it",
       "The old fixed-continent view; the existence of tides contradicts it"],
      "Fixed continents was the pre-drift world view. It cannot explain why the Atlantic's shores match in shape, fossils and rocks, nor why the floor between them is young at the ridge and spreading: the ocean opened as the continents parted.", {});
  },
  function () {
    return mcq("Before plate tectonics, folded mountain ranges were explained by a cooling, shrinking Earth wrinkling like a baked apple. What did the plate tectonics shift change about this explanation?",
      "Mountains are now explained by plates colliding and squeezing the rock, a process still running today, not by a one-way shrinking of the whole Earth",
      ["Mountains are now believed to form in a single day",
       "The shrinking-apple explanation was proven correct in every detail",
       "Mountains are no longer considered worth explaining"],
      "The shift replaced a global shrinking with local, ongoing collisions: ranges rise where plates converge, which is why the Himalayas still grow and why ranges sit along boundary belts rather than anywhere at all.", {});
  }
]), ["Name the view from its claim: fixed, or moving?", "The contradicting evidence is the drift and spreading evidence, not everyday observations like tides."]);

/* ---------- SC7.11.7 Past theories ---------- */

E("s7-u4-past-explanations", 4, ["SC7.11.7"], 1, "var", varset([
  function () {
    return mcq("In Hawaiian tradition, volcanic eruptions were explained through Pele, the goddess of fire, whose anger or movements produced the lava. What observation was this explanation trying to account for?",
      "Lava erupting from the Earth and building new land, sometimes destructively and sometimes gently",
      ["The movement of the stars across the Hawaiian sky",
       "The arrival of the rainy season each year",
       "The formation of fossils in mountain rocks"],
      "Past explanations addressed real observations: Hawaiians lived with active volcanoes, and the Pele tradition explained when and why eruptions came, and how new land formed, in the terms their culture had.", {});
  },
  function () {
    return mcq("Which pairing of a past explanation with its idea is correct?",
      "Anaxagoras, a Greek thinker, suggested earthquakes were caused by winds and gases moving inside a hollow Earth",
      ["Descartes suggested earthquakes were caused by plates sliding past each other",
       "The Mi'kmaq tradition of Glooscap explains the Sugarloaf Mountains of New Brunswick as the remains of a giant beaver dam and its beavers, turned to stone",
       "Pele was a Greek goddess said to shake the Earth when angry"],
      "Anaxagoras blamed underground winds; Descartes imagined a once-incandescent Earth cooling and cracking; Glooscap's beaver dam story belongs to the Sugarloaf Mountains (the dam became the mountains and the beavers the islands); Pele is Hawaiian, not Greek.", {});
  }
]), ["Match each explanation to its culture and its event: volcano, earthquake, or mountains.", "Watch for swapped owners: the right idea with the wrong name attached is a wrong answer."]);

E("s7-u4-past-purpose", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return mcq("What do past explanations of volcanoes and earthquakes (such as Pele, or underground winds) have in common with modern scientific theories?",
      "Both try to explain observations of the natural world using the knowledge available at the time",
      ["Both are tested by controlled experiments before anyone believes them",
       "Both are written down by professional scientists",
       "Both turn out to be correct in their details"],
      "The shared purpose is explanation: people in every era connect observations into accounts of why events happen. What changed is the method: modern theories must survive testing against new evidence, and are revised or replaced when they do not.", {});
  },
  function () {
    return mcq("How do past explanations differ most importantly from the modern theory of plate tectonics?",
      "Plate tectonics is tested against new evidence and revised when evidence demands; the past explanations were not put to such tests",
      ["Plate tectonics is much older than the past explanations",
       "Past explanations were never believed by the people who told them",
       "Plate tectonics explains fewer observations than the past explanations"],
      "Belief and storytelling are not the difference; testing is. Plate tectonics makes predictions (where events occur, how old the floor is) that were checked and could have failed. The past explanations explained after the fact and were not tested that way.", {});
  }
]), ["Same job, different method: both explain; only one is tested.", "If an option says past peoples did not believe their own explanations, it underrates them and misses the point."]);

E("s7-u4-cr-past-theory", 4, ["SC7.11.7"], 2, "var", varset([
  function () {
    return textq("Long ago, people living near an active volcano explained its eruptions as the work of a powerful being who lived inside the mountain. (a) What observation was this explanation trying to explain? (b) How is this explanation different from the modern scientific explanation of the same volcano?",
      ["(a) The observed eruptions themselves: lava, ash, rumblings and new land forming, events that were powerful, dangerous and irregular. (b) The past explanation names a being's actions and is not tested; the modern explanation (magma rising through a plate boundary or hot spot) is built from evidence, makes predictions (where eruptions occur, warning signs) and is revised when evidence changes"],
      "<b>Model answer:</b> (a) The explanation was trying to account for the eruptions people actually observed: the mountain rumbling, ash darkening the sky, lava flowing and sometimes destroying villages, and new land appearing where lava met the sea. (b) The difference is in how the explanation is held. The past explanation rests on the being's moods, so it fits any eruption after it happens and cannot be tested or used to predict the next one. The modern explanation says magma rises where plates part, collide or pass over a hot spot; it is built from evidence (the volcano's position in the worldwide pattern, gas and earthquake monitoring), it predicts where volcanoes should and should not occur, and it would be revised if the evidence stopped fitting.<br><br><b>Marking points:</b> 1 mark for the observation correctly identified (the eruptions and their effects). 1 mark for the difference stated in terms of testing, evidence or prediction, not merely that one is old and one is new.", {});
  }
]), ["Every explanation, old or new, starts from something observed: name it.", "The sharpest difference is testability: can the explanation be checked, and could it fail?"]);

/* ---------- SC7.12.1 Use a mineral classification key ---------- */

E("s7-u4-key-mineral", 4, ["SC7.12.1"], 1, "var", varset([
  function () {
    var q = mcq("Use the classification key and the specimen data. Which mineral is Specimen 1?",
      "Calcite",
      ["Feldspar", "Gypsum", "Quartz"],
      "Work the key: Specimen 1 is not magnetic (step 1), its streak is not red-brown (step 2), it does not break into heavy cubes (step 3) and does not split into sheets (step 4). A fingernail does not scratch it, and it fizzes in acid (step 8): calcite.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen 1: white and glassy; streak white; a fingernail does not scratch it, but a copper penny does; it fizzes (bubbles) when weak acid is dripped on it; not attracted to a magnet",
      "Specimen 2: clear and glassy; no streak visible on the plate; cannot be scratched by a steel file; breaks with a shell-like fracture; not attracted to a magnet"
    ]);
    return q;
  },
  function () {
    var q = mcq("Use the classification key and the specimen data. Which mineral is Specimen 2?",
      "Quartz",
      ["Calcite", "Feldspar", "Pyrite"],
      "Work the key: Specimen 2 passes steps 1 to 5 without matching, does not fizz in acid (step 8), is not brassy yellow (step 9), and at step 10 it is glassy with no cleavage, a shell-like fracture and hardness 7: quartz.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen 1: white and glassy; streak white; a fingernail does not scratch it, but a copper penny does; it fizzes (bubbles) when weak acid is dripped on it; not attracted to a magnet",
      "Specimen 2: clear and glassy; no streak visible on the plate; cannot be scratched by a steel file; breaks with a shell-like fracture; not attracted to a magnet"
    ]);
    return q;
  }
]), ["Work the key in order and eliminate as you go; do not jump to a mineral that merely looks right.", "The acid result is decisive for one specimen; the file result is decisive for the other."]);

E("s7-u4-key-mineral-2", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    var q = mcq("Use the classification key. Two dark specimens both have a metallic shine. Specimen A is strongly attracted to a magnet; Specimen B is not, but leaves a red-brown streak. What are A and B?",
      "A is magnetite and B is hematite",
      ["A is hematite and B is magnetite", "A is galena and B is pyrite", "Both specimens are magnetite"],
      "The key separates them at the first two steps: attraction to a magnet names magnetite at step 1, and a red-brown streak names hematite at step 2. Their similar appearance is exactly why the key starts with these tests.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen A: black, metallic shine; strongly attracted to a magnet; streak black",
      "Specimen B: dark grey, metallic shine; not attracted to a magnet; streak red-brown"
    ]);
    return q;
  },
  function () {
    var q = mcq("Use the classification key. A specimen is soft enough to be scratched by a fingernail, feels greasy, and leaves a black mark when rubbed on paper. Which mineral is it?",
      "Graphite",
      ["Gypsum", "Magnetite", "Talc"],
      "At step 5 the fingernail scratch sends the specimen to step 6, and at step 6 the greasy feel and the mark on paper name graphite. Talc is also soft and greasy-feeling, but it does not mark paper.", {});
    q.figure = s7MineralKeyFigure([
      "Specimen: black and soft; scratched by a fingernail; feels greasy; marks paper with a black streak"
    ]);
    return q;
  }
]), ["When two specimens look alike, find the key step where their data first differs.", "Soft minerals are separated late in the key: follow the fingernail branch."]);

E("s7-u4-key-choose", 4, ["SC7.12.1"], 2, "var", varset([
  function () {
    return mcq("A student must identify an unknown mineral for a practical problem: it will be used to test whether a 'gold' nugget from a stream is real. Which property from the key should the student test FIRST to settle the question?",
      "Streak: gold leaves a yellow streak and its common look-alike, pyrite, leaves a greenish-black one",
      ["Colour: gold is the only yellow mineral",
       "Crystal form: gold never forms crystals",
       "Transparency: gold lets light through and pyrite does not"],
      "The practical problem is gold against pyrite, and streak separates them in one test. Colour cannot settle it (that is the whole difficulty), and the other options are not reliable differences.", {});
  },
  function () {
    return mcq("A key user reaches step 8 with a specimen and is unsure whether it fizzed in acid, because only one tiny bubble appeared. What is the most sensible next step?",
      "Repeat the acid test on a fresh surface of the specimen and watch carefully, since the identification depends on it",
      ["Skip the step and choose whichever mineral seems more likely",
       "Abandon the key and identify the mineral by colour alone",
       "Record the mineral as both calcite and not calcite"],
      "A key is only as good as its observations. When a decisive observation is doubtful, the practical move is to repeat the test properly, not to guess past it.", {});
  }
]), ["Choose the test that separates the actual candidates, not a test that is merely easy.", "A doubtful observation at a branching step is worth repeating; guessing compounds the error."]);

/* ---------- SC7.12.2 Select methods and tools to identify minerals ---------- */

E("s7-u4-tool-ladder", 4, ["SC7.12.2"], 1, "gen", function () {
  var sets = [
    { q: "A mineral is scratched by a steel nail (hardness 4.5) but not by a copper penny (hardness 3.5). Which tool should be tried next to narrow down its hardness?", tool: "A glass plate (hardness 5.5): if the mineral scratches the glass, it is harder than 5.5; if not, its hardness lies between 4.5 and 5.5", others: ["A fingernail (hardness 2.5), which is softer than the penny that already failed", "Sandpaper alone, without comparing it to the known tools", "A magnet, to test the mineral's hardness by attraction"] },
    { q: "A mineral cannot be scratched by a fingernail (hardness 2.5) but is scratched by a copper penny (hardness 3.5). What is the best next test?", tool: "Try the steel nail (hardness 4.5) to check whether the hardness reaches that high, bracketing the value between 3.5 and 4.5", others: ["Try the emery cloth (hardness 9) to see the mineral at its hardest test first", "Stop testing: the hardness is exactly 3.5", "Test the streak, which gives the hardness directly"] },
    { q: "A mineral scratches a glass plate (hardness 5.5) but is scratched by a steel file (hardness 6.5). Which statement about its hardness is correct?", tool: "Its hardness is between 5.5 and 6.5", others: ["Its hardness is exactly 6.5, the file's value", "Its hardness is below 5.5, because the file scratched it", "Its hardness cannot be estimated from scratch tests"] }
  ];
  var s = pick(sets);
  return mcq(s.q, s.tool, s.others,
    "Scratch testing brackets a mineral's hardness between the hardest tool that fails and the softest tool that succeeds. Each new test should narrow the bracket, using the ladder of known tools: fingernail 2.5, penny 3.5, nail 4.5, glass 5.5, file 6.5.", {});
}, ["Build a bracket: the hardness sits between the last tool that failed and the first that worked.", "A useful next test is one whose result would shrink the bracket, not repeat it."]);

E("s7-u4-method-match", 4, ["SC7.12.2"], 1, "var", varset([
  function () {
    return mcq("A student wants to find out whether an unknown mineral reacts with acid, the way calcite does. Which method should the student select?",
      "Place a drop of weak acid (or vinegar) on a fresh surface of the mineral and watch for bubbles of gas",
      ["Rub the mineral on a porcelain plate and examine the powder",
       "Hold a magnet near the mineral and watch for movement",
       "Shine a bright light through a thin edge of the mineral"],
      "Each method answers one question: acid tests for the carbonate reaction (fizzing), the plate gives streak, the magnet tests magnetism, and the light tests transparency. Match the method to the property asked about.", {});
  },
  function () {
    return mcq("Which method is the right tool for examining the tiny crystals on a mineral sample's surface?",
      "A hand lens, held close, to magnify the surface so the crystals can be seen and described",
      ["A streak plate, rubbed across the surface",
       "A steel file, drawn across the surface",
       "A magnet, passed slowly over the surface"],
      "Observation tools and testing tools do different jobs: the hand lens magnifies for looking; the plate, file and magnet all change or test the sample rather than help you see it.", {});
  }
]), ["One method per property: acid for reaction, plate for streak, magnet for magnetism, lens for looking.", "If a method would damage or alter the sample, it is not an observation tool."]);

E("s7-u4-method-plan", 4, ["SC7.12.2"], 2, "var", varset([
  function () {
    return mcq("A student is given one small unknown mineral sample that must be returned undamaged if possible. Which order of tests is the best plan?",
      "Observe colour and lustre, test magnetism and streak, then scratch tests from softest tool upward, and acid last on a small corner",
      ["Acid first, then the steel file, then observation of colour and lustre",
       "Scratch with the steel file first to settle the hardness at once",
       "Break the sample in half first so the inside can be tested"],
      "A good plan runs from least to most damaging and from observation to intervention: looking costs nothing, streak and magnetism leave the sample nearly untouched, scratch tools go soft to hard so the first successful scratch does the least harm, and acid, which consumes a little of the sample, goes last.", {});
  },
  function () {
    return mcq("Why do mineral testers work UP the hardness ladder (fingernail, penny, nail, glass, file) instead of starting with the steel file?",
      "Starting soft brackets the hardness with the least damage: each failed tool leaves no mark, and the first tool that works sets the upper edge of the bracket",
      ["The file is too expensive to use on unknown minerals",
       "The ladder's order is a tradition with no practical reason",
       "Soft tools give more accurate hardness values than hard tools"],
      "If the file went first, every soft mineral would be gouged before its hardness was known, and the result would only say 'softer than 6.5'. Climbing the ladder narrows the value step by step and leaves failed tests unmarked.", {});
  }
]), ["Order tests by cost: free observations first, damaging tests last.", "Soft-to-hard is not politeness; it is how the bracket narrows without ruining the sample."]);

/* ---------- SC7.12.3 Identify common minerals using a key ---------- */

E("s7-u4-mineral-id", 4, ["SC7.12.3"], 1, "gen", function () {
  var sets = [
    { props: "brassy yellow colour, metallic lustre, greenish-black streak, hardness about 6, not attracted to a magnet", name: "Pyrite", others: ["Galena", "Graphite", "Magnetite"] },
    { props: "lead grey colour, metallic lustre, grey streak, hardness 2.5, breaks into cube-shaped pieces and feels very heavy for its size", name: "Galena", others: ["Graphite", "Hematite", "Pyrite"] },
    { props: "white to clear, silky lustre, hardness 2, can be scratched by a fingernail, does not feel greasy and does not mark paper", name: "Gypsum", others: ["Calcite", "Quartz", "Talc"] },
    { props: "black, metallic lustre, black streak, hardness about 6, strongly attracted to a magnet", name: "Magnetite", others: ["Galena", "Graphite", "Hematite"] }
  ];
  var s = pick(sets);
  var q = mcq("Use the classification key. A specimen shows these properties: " + s.props + ". Which mineral is it?",
    s.name, s.others,
    "Run the property set through the key in order, checking the decisive properties (magnetism, streak, hardness, special features like cubic cleavage or fizzing) rather than matching on colour alone.", {});
  q.figure = s7MineralKeyFigure(["Specimen: " + s.props]);
  return q;
}, ["Check the decisive properties first: magnetism, streak colour, and any special feature.", "Colour alone matches several minerals; the key exists because colour is not enough."]);

E("s7-u4-mineral-id-2", 4, ["SC7.12.3"], 2, "gen", function () {
  var sets = [
    { props: "dark silver-grey and metallic looking, but its streak on the plate is red-brown; hardness about 6; not attracted to a magnet", name: "Hematite", others: ["Galena", "Magnetite", "Pyrite"] },
    { props: "clear and glassy, hardness 3, splits along flat planes, and fizzes steadily when weak acid is dripped on it", name: "Calcite", others: ["Feldspar", "Gypsum", "Quartz"] },
    { props: "pale pink, pearly to glassy lustre, hardness 6, white streak, and it splits along flat planes in two directions", name: "Feldspar", others: ["Calcite", "Gypsum", "Quartz"] },
    { props: "silvery and pearly, hardness about 2.5 to 3, and it peels apart into thin, flexible, transparent sheets", name: "Mica", others: ["Galena", "Gypsum", "Talc"] }
  ];
  var s = pick(sets);
  var q = mcq("Use the classification key. A specimen shows these properties: " + s.props + ". Which mineral is it?",
    s.name, s.others,
    "Each set carries one decisive property: hematite's red-brown streak contradicts its grey look, calcite fizzes in acid, feldspar has two-direction cleavage at hardness 6, and mica peels into flexible sheets.", {});
  q.figure = s7MineralKeyFigure(["Specimen: " + s.props]);
  return q;
}, ["These sets hide one decisive property each; find it before choosing.", "When looks and streak disagree, believe the streak."]);

E("s7-u4-mineral-pair", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    return mcq("Quartz and calcite can both be clear and glassy. Which single property from the key separates them most reliably?",
      "Hardness: quartz (7) cannot be scratched by a steel file, while calcite (3) is scratched even by a copper penny",
      ["Colour: quartz is always white and calcite is always clear",
       "Lustre: calcite is metallic and quartz is not",
       "Streak: both leave a bright red streak"],
      "Their looks overlap, but their hardnesses are far apart (7 against 3), so one scratch test settles it; calcite's acid fizz also separates them. Colour and lustre overlap too much to trust.", {});
  },
  function () {
    return mcq("Hematite and magnetite are both dark, heavy, metallic minerals. Which single test separates them fastest?",
      "A magnet: magnetite is attracted to it and hematite is not (and their streaks also differ, black against red-brown)",
      ["Weighing them: both are heavy, so the heavier one is magnetite",
       "Colour: magnetite is dark and hematite is light",
       "Hardness: their hardnesses are at opposite ends of the scale"],
      "Magnetism is decisive and instant for this pair: only magnetite responds. Weight and colour are too similar to separate them, and their hardness ranges overlap.", {});
  }
]), ["For a look-alike pair, hunt the property where the two minerals differ most.", "If both minerals share the property in an option, that option cannot separate them."]);

E("s7-u4-cr-mineral-id", 4, ["SC7.12.3"], 2, "var", varset([
  function () {
    var q = textq("Use the classification key. Identify Specimen X and justify your identification with TWO properties from its data.",
      ["Specimen X is hematite: the red-brown streak is decisive (step 2 of the key), supported by its hardness (about 6, not scratched by a nail) or its dark metallic appearance combined with no magnetism (ruling out magnetite)"],
      "<b>Model answer:</b> Specimen X is hematite. First property: its streak is red-brown, which the key gives at step 2 as hematite's signature; no other mineral in the key leaves that streak. Second property: it is not attracted to a magnet, which rules out magnetite, the other dark metallic mineral it resembles; its hardness of about 6 also fits hematite and rules out the soft dark minerals such as graphite.<br><br><b>Marking points:</b> 1 mark for the correct identification (hematite). 1 mark for two properties from the data correctly used as justification, at least one of them decisive (the red-brown streak).", {});
    q.figure = s7MineralKeyFigure([
      "Specimen X: dark grey, metallic shine; streak red-brown; hardness about 6 (a steel nail does not scratch it); not attracted to a magnet"
    ]);
    return q;
  }
]), ["Name the mineral, then defend it: two properties, at least one of them decisive.", "A justification that only repeats the colour earns nothing; use the key's branching properties."]);

/* ---------- SC7.12.4 Identify questions from rock cycle study ---------- */

E("s7-u4-question-identify", 4, ["SC7.12.4"], 1, "var", varset([
  function () {
    return mcq("A class is studying the rock cycle with a tray of local rock samples. Which of the following is an investigable question arising from that study?",
      "How do the crystals or minerals form in a rock?",
      ["What is the exact age of the Earth?",
       "Which rock in the tray is the prettiest?",
       "Who first named the three rock families?"],
      "An investigable question can be pursued with observations, samples or research into processes: crystal formation can be investigated through cooling experiments and samples. Exact ages, tastes and naming history cannot be investigated from the rock study itself.", {});
  },
  function () {
    return mcq("Which question arising from rock cycle study could actually be investigated with the samples and tools in a classroom?",
      "Why are some rocks rounded and others angular: what does the shape record about how far the pieces travelled?",
      ["Why did the Earth form with exactly three rock families?",
       "What will this rock look like in exactly one million years?",
       "Which rock family is the most important on Earth?"],
      "Rounded against angular pieces can be compared across samples and connected to transport distance, an investigation the class can run. The others ask for unknowable exact futures, purposes, or rankings no evidence can settle.", {});
  }
]), ["Investigable means evidence can be brought to bear: samples, observations, comparisons.", "Questions of taste, purpose or exact distant futures cannot be investigated, however interesting they are."]);

E("s7-u4-question-best", 4, ["SC7.12.4"], 3, "var", varset([
  function () {
    return mcq("After studying the rock cycle, a student still has a question and wants one that could drive a real investigation with rock samples, a freezer, water and a tumbler of sand. Which question is strongest?",
      "Does freezing and thawing water in rock cracks break rock faster than tumbling the same rock in sand and water?",
      ["Why is the rock cycle a cycle and not a line?",
       "How many rocks are there in the world?",
       "What is the best rock for a pet rock?"],
      "The strongest question compares two weathering processes under controlled conditions with the equipment named, and its answer comes from measurements the student can take. The others are definitional, uncountable, or matters of taste.", {});
  },
  function () {
    return mcq("A student asks: 'I wonder why this sedimentary rock has layers of different colours.' Which follow-up turns it into the strongest investigable question?",
      "Do the different-coloured layers contain different sediment sizes or materials, suggesting the conditions changed as each layer was deposited?",
      ["Are the layers pretty enough to display in the classroom?",
       "Who coloured the layers, and why did they choose those colours?",
       "How old is each layer, to the exact year?"],
      "The strong follow-up points at observable differences (grain size, material) that can be checked in the sample and connected to deposition conditions. Exact years are beyond the tools, and the rest are taste or false agency.", {});
  }
]), ["A strong question names something measurable and a comparison to make.", "If the question cannot be answered with the samples and tools at hand, it is not yet investigable."]);

E("s7-u4-cycle-path", 4, ["SC7.12.4"], 2, "var", varset([
  function () {
    var q = mcq("Use the rock cycle diagram. A question arises from the diagram: can a sedimentary rock become an igneous rock directly, in one step? What does the diagram show?",
      "No: the sedimentary rock must first be changed by heat and pressure and then melt, or melt as burial deepens, before cooling can make it igneous",
      ["Yes: any rock can become any other rock in one step",
       "No: sedimentary rock can never become igneous rock, even over millions of years",
       "Yes, if the sedimentary rock is left at the surface long enough"],
      "Follow the arrows from the sedimentary box: none runs straight to igneous. The route passes through metamorphic rock and magma: heat and pressure, then melting, then cooling. The cycle allows the journey, but never in one step.", {});
    q.figure = s7RockCycleSVG();
    return q;
  },
  function () {
    var q = mcq("Use the rock cycle diagram. Which route takes a metamorphic rock back to the start of the cycle as sediments?",
      "Weathering and erosion break the metamorphic rock down into sediments",
      ["Melting turns it directly into sediments",
       "Compaction and cementation press it into sediments",
       "Cooling hardens it into sediments"],
      "Sediments are made by breaking rock down at the surface: weathering and erosion. Melting makes magma, compaction and cementation consume sediments rather than create them, and cooling makes igneous rock.", {});
    q.figure = s7RockCycleSVG();
    return q;
  }
]), ["Answer from the arrows, not from intuition: a route exists only if arrows trace it.", "Sediments come from breaking down, never from melting or cooling."]);

/* ---------- SC7.12.5 Carry out procedures controlling variables (CORE) ----------
   Cognitive core covered here and in the design CR: naming the
   manipulated, responding and controlled variables in the Rocks
   that Fizz and Soil Sleuth procedures, and designing a fair test
   on paper. Performance residue: carrying out the procedures
   themselves (handling acid safely, timing drainage, controlling
   the variables in a real laboratory) stands outside the bank. */

E("s7-u4-fizz-variables", 4, ["SC7.12.5"], 1, "var", varset([
  function () {
    return mcq("In the Rocks that Fizz investigation, a student places drops of acid on six different rocks and rates how much each one fizzes. What is the manipulated (independent) variable?",
      "The type of rock tested",
      ["The amount of fizz produced",
       "The number of drops of acid used",
       "The time of day the test is done"],
      "The student deliberately changes the rock from trial to trial: that is the manipulated variable. The fizz is what responds. The drops of acid are kept the same on purpose, which makes them a controlled variable, not the manipulated one.", {});
  },
  function () {
    return mcq("In the same investigation, what is the responding (dependent) variable?",
      "The amount of fizz each rock produces",
      ["The type of rock tested",
       "The strength of the acid used",
       "The size of the drops"],
      "The responding variable is the one measured as the outcome: how much each rock fizzes. The rock type is manipulated by the student, and the acid strength and drop size are controlled so they cannot confuse the result.", {});
  }
]), ["Manipulated means the investigator changes it on purpose; responding means it is measured as the outcome.", "Anything deliberately kept the same is controlled, and belongs to neither answer."]);

E("s7-u4-fair-test-design", 4, ["SC7.12.5"], 2, "var", varset([
  function () {
    return mcq("A class designs a fair test of how fast water drains through sand, clay and gravel. Which set of choices keeps the test fair?",
      "The same volume of each soil, the same volume of water poured the same way, the same cup and filter set-up, and timing started the same way for each",
      ["More water for the clay, since it is slower, to help it finish in time",
       "A bigger cup for the gravel so its large pieces fit better",
       "Different amounts of soil, using whatever each group scooped up"],
      "A fair test changes only the soil type. Helping the clay with extra water, or changing the apparatus between samples, would mix other variables into the drainage times and ruin the comparison.", {});
  },
  function () {
    return mcq("Midway through the drainage test, a group notices their clay sample was packed down hard while the sand was poured loosely. What should they do?",
      "Restart the clay trial with the sample prepared the same way as the others, and note the change",
      ["Keep the result, since clay is slow anyway",
       "Pack the sand down in the next class to make up for it",
       "Drop the clay result and report only sand and gravel"],
      "Packing is a variable: if it differs between samples, the times no longer compare soils alone. The fair move is to redo the affected trial under the same preparation and record what was done.", {});
  }
]), ["Fair means one difference only: the thing being tested.", "A discovered unfairness is fixed by redoing the trial properly, not by adjusting the numbers."]);

E("s7-u4-cr-design-investigation", 4, ["SC7.12.5"], 3, "var", varset([
  function () {
    return textq("Design a fair test to answer this question: does the size of a soil's particles affect how fast water drains through it? In your design, state a hypothesis, name the manipulated variable, the responding variable and at least two variables you would control, and describe briefly how you would set the test up. (This entry is for practice and teacher-picked sets; it is not drawn by the unit test convention.)",
      ["A complete design: hypothesis linking particle size to drainage speed; manipulated variable the soil type (particle size: sand, loam, clay or gravel); responding variable the time for a fixed volume of water (for example 25 mL) to drain through; controls such as same volume of soil, same cup and filter, same volume and pouring of water, same preparation; a set-up repeating the timing for each soil under identical conditions"],
      "<b>Model answer:</b> Hypothesis: if a soil's particles are larger, then water will drain through it faster, because larger particles leave larger connected spaces for water to move through. Manipulated variable: the type of soil (gravel, sand, loam, clay), which sets the particle size. Responding variable: the time taken for 25 mL of water to drain through the sample. Controls: the same volume of each soil, the same cup with the same filter, the same 25 mL of water poured at the same rate, each sample prepared the same way (poured in loosely, not packed), and the same timing method. Set-up: line identical cups with filter material, add the same volume of each soil, pour 25 mL of water over each, and time how long the water takes to drain through, repeating each soil at least twice to check the times are consistent.<br><br><b>Marking points:</b> 1 mark for a testable hypothesis connecting particle size to drainage. 1 mark for the manipulated and responding variables correctly named. 1 mark for at least two sensible controls held constant. 1 mark for a workable set-up in which only the soil changes between trials.", {});
  }
]), ["Use the Soil Sleuth pattern: hypothesis, what you change, what you time, what you hold still.", "Same water, same volume, same set-up: fairness is a list of sames."]);

/* ---------- SC7.12.6 Use instruments effectively and accurately (CORE) ----------
   Cognitive core covered here: choosing the instrument for a
   measurement and reading a stated measurement accurately.
   Performance residue: using the instruments themselves
   (estimating particle diameter through a hand lens, reading a
   meniscus on a real cylinder, timing a drainage accurately)
   stands outside the bank. */

E("s7-u4-instrument-read", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("A student times how long 25 mL of water takes to drain through a soil sample. The stopwatch shows the water finished draining somewhere between 44 and 45 seconds, closer to 45. Which is the most accurate way to record the result?",
      "Record the time to the precision the watch allows (for example 44.8 s if the watch shows tenths), and use the same method for every sample",
      ["Record exactly 45 s, since it must be a whole number",
       "Record 'about a minute', since precision does not matter in a comparison",
       "Record 44 s for this sample and round other samples differently to save time"],
      "Accuracy means reading the instrument to its real precision and reading every trial the same way. Invented round numbers and changing methods between samples both corrupt the comparison the times are for.", {});
  },
  function () {
    return mcq("A graduated cylinder holds water for the drainage test. The bottom of the water's curved surface (the meniscus) sits level with the 25 mark when viewed at eye level, but a student reading from above sees it at 27. Which reading is accurate, and why?",
      "25 mL: a meniscus is read at eye level, from the bottom of the curve, to avoid the viewing-angle error",
      ["27 mL: the view from above is always the true one",
       "26 mL: the average of the two views is most accurate",
       "Either reading is fine, since 2 mL cannot affect the test"],
      "Liquid surfaces curve, and the scale is read at the bottom of the meniscus with the eye level with it. Reading from above introduces a consistent error, and 2 mL in 25 is an 8 percent error, large enough to distort a drainage comparison.", {});
  }
]), ["Read the instrument the way it was designed to be read: eye level, bottom of the meniscus, real precision.", "Consistency across trials is part of accuracy, not a nicety."]);

E("s7-u4-instrument-choose", 4, ["SC7.12.6"], 1, "var", varset([
  function () {
    return mcq("A Soil Sleuth team must compare the particle sizes of sand, clay and gravel samples. Which instrument and practice best serves the measurement?",
      "A hand lens and a ruler: examine the particles magnified and measure or compare their diameters against the ruler's scale",
      ["A graduated cylinder: pour the particles in and read their size from the scale",
       "A stopwatch: time how fast the particles settle and report the time as the size",
       "A magnet: sort the particles by attraction and report the groups as sizes"],
      "Particle size is a length: it is measured by looking (magnified, with the hand lens) and comparing against a scale (the ruler). The cylinder measures volume, the watch measures time, and the magnet sorts by magnetism, none of which is a diameter.", {});
  },
  function () {
    return mcq("Which pairing of measurement and instrument is correct for the soil investigations?",
      "Volume of water: graduated cylinder; drainage time: stopwatch; particle size: hand lens with a ruler",
      ["Volume of water: stopwatch; drainage time: graduated cylinder; particle size: magnet",
       "Volume of water: hand lens; drainage time: ruler; particle size: graduated cylinder",
       "All three measurements: the graduated cylinder alone"],
      "Each quantity has its instrument: volumes in the cylinder, times on the watch, sizes under the lens against a scale. Instruments are chosen by the quantity they measure, not by which is nearest.", {});
  }
]), ["Name the quantity first (volume, time, length), then pick the instrument that measures it.", "A familiar instrument used on the wrong quantity gives a precise wrong answer."]);

/* ---------- SC7.12.7 Compile, organize and display data in tables ---------- */

E("s7-u4-table-build", 4, ["SC7.12.7"], 1, "var", varset([
  function () {
    return mcq("A Soil Sleuth team records, for each of four samples (sand, clay, gravel, local soil), its colour, average particle size, texture and drainage time. Which table organizes this data correctly?",
      "A table with one row per sample and one column per measurement (colour, particle size, texture, drainage time), with a title naming what was measured",
      ["A table with one row per measurement and the four samples' values added together in a single column",
       "A list of the samples in the order the team happened to test them, with notes underneath",
       "A table showing only the drainage times, since those are the results that matter"],
      "The data has two factors (sample and measurement), so the table needs rows for one and columns for the other, with every value kept separate and a title. Adding values together or dropping measurements destroys data the team collected.", {});
  },
  function () {
    return mcq("A mineral team tested eight samples and recorded colour, streak, hardness and the mineral each turned out to be. Which feature must their results table have to be useful for spotting patterns later?",
      "One row per sample with the properties in the same columns for every sample, so any property can be compared down its column",
      ["The samples arranged by how much the team liked them",
       "A separate small table for each sample, each with its own layout",
       "Only the correctly identified samples included, to keep the table tidy"],
      "Patterns appear down columns: streak against identification, hardness against identification. That requires a consistent grid, every sample in the same columns, including the misses, which are data too.", {});
  }
]), ["Rows for one factor, columns for the other, every value kept, and a title.", "A table that drops the failures drops the pattern with them."]);

E("s7-u4-table-read", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return mcq("A results table from the mineral laboratory shows: Sample 1, streak white, hardness 3, fizzes in acid, identified as calcite; Sample 2, streak white, hardness 7, no fizz, identified as quartz; Sample 3, streak red-brown, hardness 6, no fizz, identified as hematite; Sample 4, streak yellow, hardness 3, no fizz, not in the key's ten minerals. Which conclusion does the table support?",
      "Streak colour alone does not identify a mineral: two samples share a white streak but are different minerals, separated by hardness and the acid test",
      ["Every mineral with a white streak is calcite",
       "Hardness never matters when the streak is known",
       "Sample 4 must be gold, because its streak is yellow"],
      "Read down the columns: Samples 1 and 2 share a streak but differ in hardness and acid reaction, and they are different minerals. Identification needs the combination of properties, which is the table's whole lesson. Sample 4's yellow streak is noted without an identification; the table does not name it gold.", {});
  }
]), ["Read down each column and look for what stays together and what splits.", "Shared values in one column mean that property alone cannot be the identifier."]);

E("s7-u4-cr-table-display", 4, ["SC7.12.7"], 2, "var", varset([
  function () {
    return textq("A student ran the Rocks that Fizz test and recorded the results in rough notes: granite, no fizz; chalk, strong fizz; sandstone, no fizz; shale, no fizz; marble, strong fizz; limestone, strong fizz. Organize these results into a data table. Give your table a title, and state in one sentence what the table makes easy to see.",
      ["A table titled, for example, 'Amount of fizz when acid is dripped on six rocks', with one row per rock and columns for the rock and its fizz result (none or strong). The sentence: the table makes it easy to see at a glance which rocks reacted with the acid and which did not, so the reacting group (chalk, marble, limestone) can be compared with the non-reacting group"],
      "<b>Model answer:</b> Title: Amount of fizz produced when acid is dripped on six rocks. Table: Rock | Fizz result. Granite | none. Chalk | strong. Sandstone | none. Shale | none. Marble | strong. Limestone | strong. What the table makes easy to see: the six rocks split cleanly into two groups, three that fizz strongly in acid and three that do not react at all, a pattern that is hard to spot in the rough notes but obvious in the table.<br><br><b>Marking points:</b> 1 mark for a correctly organized table (title, one row per rock, the fizz results accurately placed). 1 mark for the sentence identifying what the table reveals (the clean split into reacting and non-reacting rocks).", {});
  }
]), ["A table needs a title that says what was measured, not just 'Results'.", "The sentence after the table is the point of the exercise: name the pattern the table exposes."]);

/* ---------- SC7.12.8 Interpret patterns and trends in data ---------- */

E("s7-u4-pattern-drainage", 4, ["SC7.12.8"], 2, "var", varset([
  function () {
    var q = mcq("Use the drainage data display. Which relationship between particle size and drainage does the data show?",
      "As particle size increases, drainage gets faster: the coarse gravel drains quickest and the fine clay slowest",
      ["As particle size increases, drainage gets slower",
       "Particle size makes no difference to drainage in this data",
       "The relationship reverses halfway: medium particles drain slowest of all"],
      "Read the bars against the particle sizes: gravel (coarsest) 6 s, sand 14 s, loam 47 s, clay (finest) 168 s. The times rise steadily as the particles get finer, a single clear relationship.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  },
  function () {
    var q = mcq("Use the drainage data display. A fifth sample, a coarse sand mixed with small pebbles, is tested the same way. Based on the pattern, what drainage time is most reasonable to predict?",
      "A short time, closer to gravel and sand than to clay, because its particles are coarse",
      ["The longest time of all, because new samples always drain slowest",
       "Exactly 168 s, the same as clay",
       "The pattern gives no basis for any prediction"],
      "Patterns earn their keep by predicting: drainage time falls as particle size rises, so a coarse mixture should drain fast, in the range of the other coarse samples, not near the clay's time.", {});
    q.figure = s7DrainSVG([{ name: "gravel", secs: 6 }, { name: "sand", secs: 14 }, { name: "loam", secs: 47 }, { name: "clay", secs: 168 }]);
    return q;
  }
]), ["Order the samples by particle size first, then read the times in that order.", "A pattern you cannot predict from is a pattern you have not really read."]);

E("s7-u4-pattern-infer", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return mcq("In the fizz test, the results were: granite no fizz, sandstone no fizz, shale no fizz, chalk strong fizz, marble strong fizz, limestone strong fizz. Marble is metamorphosed limestone, and chalk is a soft form of limestone. Which inference best explains the pattern?",
      "The fizzing rocks are all forms of the same material (limestone), so the acid reaction depends on what the rock is made of, not on the rock family it belongs to",
      ["Metamorphic rocks always fizz and igneous rocks never do",
       "Rocks with shorter names fizz more than rocks with longer names",
       "The acid was stronger on the days the fizzing rocks were tested"],
      "Group the results by composition and the pattern resolves: the three fizzers share limestone's material across two families (sedimentary chalk and limestone, metamorphic marble), while the non-fizzers are other materials. The variable that explains the split is composition.", {});
  },
  function () {
    return mcq("A class plots its mineral results: every sample with hardness above 5.5 scratched glass, every sample below 5.5 did not, and the one sample at about 5.5 left a faint mark. What relationship can the class infer?",
      "Whether a mineral scratches glass depends on whether its hardness is above or below the glass's hardness of 5.5",
      ["Harder minerals are always darker in colour",
       "Glass scratches every mineral given enough time",
       "Hardness and scratching are unrelated, and the plot is a coincidence"],
      "The split in the data falls exactly at the glass's own hardness, which is the relationship scratch testing is built on: the harder material scratches the softer. Colour plays no part in the pattern.", {});
  }
]), ["Group the results two ways (by family, by composition; by colour, by hardness) and see which grouping explains the split.", "The explaining variable is the one whose groups line up perfectly with the outcomes."]);

E("s7-u4-cr-pattern", 4, ["SC7.12.8"], 3, "var", varset([
  function () {
    return textq("A class tested how long 25 mL of water took to drain through four soils: gravel 6 s, sand 14 s, loam 47 s, clay 168 s. (a) Describe the pattern in the data. (b) Explain the relationship between the soils' particle sizes and the drainage times, using the idea of spaces between particles.",
      ["(a) Drainage time increases steadily as the soil gets finer: gravel fastest, then sand, then loam, with clay far slower than all the others. (b) Larger particles leave larger connected spaces (pores) between them, so water moves through quickly (high permeability); fine clay particles pack tightly with tiny spaces, so water creeps through slowly even though the clay can hold a lot of water in total"],
      "<b>Model answer:</b> (a) The pattern is a steady rise: as the soils go from coarsest to finest (gravel, sand, loam, clay), the drainage time climbs from 6 seconds to 168 seconds, with the biggest jump at the clay. (b) The relationship runs through the spaces between particles. Coarse particles cannot pack closely, so they leave large, connected spaces, and water flows through them quickly. Fine clay particles pack tightly together, leaving only tiny spaces; the clay can hold plenty of water in total (it is porous), but the water can barely move (it is not very permeable), so draining takes far longer. Particle size controls the size of the spaces, and the size of the spaces controls the drainage.<br><br><b>Marking points:</b> 1 mark for the pattern described accurately, in order, with the clay's jump noted. 1 mark for the relationship stated (finer particles, slower drainage). 1 mark for the explanation through pore size and permeability.", {});
  }
]), ["Describe the numbers in order before explaining them.", "The explanation lives in the spaces: big particles, big spaces, fast flow."]);

/* ---------- SC7.12.9 State a conclusion from experimental data ---------- */

E("s7-u4-conclusion-state", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("A student's initial idea was: 'Any rock will fizz if you use enough acid.' In the test, granite, sandstone and shale produced no fizz at all with the acid used, while chalk, marble and limestone fizzed strongly. Which conclusion should the student state?",
      "The data refutes the initial idea as stated: with this acid, only the limestone-family rocks fizzed, so fizzing depends on what the rock is made of",
      ["The data supports the initial idea, because some rocks fizzed",
       "The data proves no rock anywhere can fizz",
       "The conclusion is that the acid was too weak to test anything"],
      "A conclusion answers the initial idea directly: it predicted all rocks would fizz, and three did not. The supported conclusion is narrower and matches the data: composition decides. Some rocks fizzing does not rescue a claim about all rocks.", {});
  },
  function () {
    return mcq("A team hypothesized that the local soil would drain like sand, because it looks gritty. Their times were: local soil 41 s, sand 14 s, loam 47 s, clay 168 s. Which conclusion fits the data?",
      "The hypothesis is not supported: the local soil drained much more slowly than sand and closest to loam, so it behaves as a loamy soil despite its gritty look",
      ["The hypothesis is supported, because the local soil did drain",
       "The data is useless, because the hypothesis turned out wrong",
       "The conclusion is that drainage times cannot be compared"],
      "Compare the local soil's time with the references: 41 s sits beside loam's 47 s, far from sand's 14 s. The conclusion must follow the numbers, and a refuted hypothesis is a result, not a failure of the data.", {});
  }
]), ["A conclusion speaks to the initial idea by name: supported, or refuted, and by which numbers.", "'Some' never proves 'all': check the claim's exact wording against the data."]);

E("s7-u4-conclusion-refute", 4, ["SC7.12.9"], 2, "var", varset([
  function () {
    return mcq("A student predicted that a dark, heavy rock sample would fizz in acid 'because it looks like the rocks that fizzed yesterday'. It produced no fizz at all, and its streak was red-brown. What is the best conclusion?",
      "The prediction is refuted: appearance misled, and the data (no fizz, red-brown streak) point to the sample being hematite, an iron mineral that does not react with acid",
      ["The prediction stands, because the rock still looks like a fizzing rock",
       "The test must have been done wrong, since predictions are never wrong",
       "The conclusion is that streak tests cause rocks not to fizz"],
      "Conclusions follow data, not hopes: the fizz test says not a limestone-family rock, and the streak identifies hematite. The refuted prediction is useful: it shows appearance is a poor guide, which the conclusion should say.", {});
  }
]), ["When the data and the prediction disagree, the conclusion sides with the data and says so.", "A refuted prediction is a finding: state what the data points to instead."]);

E("s7-u4-cr-conclusion", 4, ["SC7.12.9"], 3, "var", varset([
  function () {
    return textq("A class began with this idea: 'Adding sand to a clay soil will not change how it drains, because the clay will still be there.' They tested pure clay (drainage time 168 s), then clay mixed with sand (74 s), then clay mixed with twice as much sand (38 s), using the same volume of soil and water each time. State a conclusion from this data, and explain how the data supports or refutes the class's initial idea.",
      ["Conclusion: adding sand makes clay soil drain faster, and more sand makes it faster still. The initial idea is refuted: the drainage time fell from 168 s to 74 s to 38 s as sand was added, even though the clay was still present in every mixture. Explanation: the sand's larger particles open larger spaces in the mixture, raising its permeability"],
      "<b>Model answer:</b> Conclusion: adding sand to clay soil speeds up its drainage, and the more sand is added, the faster it drains. The class's initial idea is refuted by the data: with the same volumes and the same test each time, the drainage time dropped from 168 s for pure clay to 74 s with sand added and 38 s with twice the sand, even though clay was present in all three samples. The reason fits the particle-space model: the sand grains hold the clay particles apart and open larger connected spaces, so water moves through the mixture more easily. The clay being 'still there' did not preserve the drainage time, because drainage depends on the spaces in the whole mixture, not on one ingredient.<br><br><b>Marking points:</b> 1 mark for a conclusion that states the effect (sand speeds drainage, more sand speeds it more). 1 mark for the verdict on the initial idea (refuted) tied to the actual times. 1 mark for the explanation through particle spaces or permeability.", {});
  }
]), ["Quote the times in your answer; a conclusion without its numbers is an opinion.", "Refuted is a respectable verdict: say it plainly and show the data that forces it."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-a-fair-test item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U4 = {
  "s7-u4-cr-design-investigation": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });
