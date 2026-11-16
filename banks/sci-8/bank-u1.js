// CRMARKS: s8-u1-cr-cycle-role=3
// CRMARKS: s8-u1-cr-glacier=3
// CRMARKS: s8-u1-cr-abiotic=3
// CRMARKS: s8-u1-cr-coastal-climate=3
// CRMARKS: s8-u1-cr-tides=3
// CRMARKS: s8-u1-cr-headland=3
// CRMARKS: s8-u1-cr-indirect=3
// CRMARKS: s8-u1-cr-protect=3
// CRMARKS: s8-u1-cr-tech-effects=3
// CRMARKS: s8-u1-cr-decision=4
// CRMARKS: s8-u1-cr-design-salinity=4
// CRMARKS: s8-u1-cr-results-summary=3
// CRMARKS: s8-u1-cr-pond-data=3
// CRMARKS: s8-u1-cr-population=3
// Science 8 Unit 1 bank: Water Systems on Earth's Surface
// (SC8.1.1 to SC8.3.10), built Nov 15, 2026 to the Water Systems
// authoring spec. All entries are original and were written new
// for this app. Existing tests and question banks, including
// teacher tests, the MHR ExamView chapters 1 to 3, the WNLSD
// Unit 1 set, the core laboratories and the Undersea Adventure
// STSE, were reviewed only to gauge the expected depth and range
// of treatment.
// Guide discipline: ocean and fresh water are compared qualitatively
// (salinity, density, freezing point); no entry keys a memorized
// salinity or density value. The reviewed satellite item keyed to
// infrared light was not carried; research technologies are keyed by
// purpose only.
// CORE residue: SC8.3.1 entries assess procedure steps, the estuary
// extension and investigation design; they do not assess carrying
// out Core Lab 1-2B at the bench. SC8.3.2 carries one entry on safe
// practice; safe handling itself is classroom assessment. SC8.3.5
// entries assess judging and stating conclusions from described
// results, not drawing a conclusion live from bench work.
// Near-duplicate pair: SC8.3.3 entries work from displayed data
// sets; SC8.3.7 entries infer and explain the relationship behind a
// pattern. The pair is recorded, not merged.

/* ---------- SC8.1.1 The water cycle and Earth's water ---------- */

E("s8-u1-cycle-process", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { d: "the Sun heats a lake and water vapour rises from its surface", k: "Evaporation", w: ["Condensation", "Precipitation", "Run-off"] },
    { d: "water vapour high in the air cools and changes into tiny liquid droplets that form a cloud", k: "Condensation", w: ["Evaporation", "Precipitation", "Run-off"] },
    { d: "rain falls from a cloud onto a hillside", k: "Precipitation", w: ["Condensation", "Evaporation", "Run-off"] },
    { d: "rainwater flows over the land surface into a nearby stream", k: "Run-off", w: ["Condensation", "Evaporation", "Precipitation"] },
    { d: "snow piled on a mountain slowly packs down into a mass of ice", k: "Glacier formation", w: ["Condensation", "Evaporation", "Precipitation"] }
  ];
  var c = pick(cases);
  return mcq("In the water cycle, which process is described here: " + c.d + "?",
    c.k, c.w,
    "The water cycle moves water between the oceans, the land and the atmosphere. Evaporation turns liquid water into vapour, condensation turns vapour back into liquid droplets, precipitation returns water to the surface, and run-off carries surface water toward streams, lakes and the ocean. Packed snow that turns to ice builds a glacier, one of Earth's stores of fresh water.",
    {});
}, ["Name what the water is doing, then match it to the process word.", "Ask whether the water is rising as vapour, forming droplets, falling, or flowing over land."]);

E("s8-u1-distribution", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "About what share of all the water on Earth is salt water in the oceans?", k: "About 97 percent", w: ["About 1 percent", "About 50 percent", "About 75 percent"] },
    { q: "About what share of Earth's water is frozen in ice caps and glaciers?", k: "About 2 percent", w: ["About 1 percent", "About 25 percent", "About 97 percent"] },
    { q: "About what share of Earth's water is fresh water that is available in lakes, rivers and ground water?", k: "About 1 percent", w: ["About 2 percent", "About 25 percent", "About 97 percent"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Earth's water is distributed very unevenly: about 97 percent is salt water in the oceans, about 2 percent is frozen in ice caps and glaciers, and only about 1 percent is fresh water available in lakes, rivers and ground water. That small available share is why fresh water sources matter so much.",
    {});
}, ["The three shares are 97, 2 and 1 percent. Match the description to its share.", "Almost all of Earth's water is ocean water."]);

E("s8-u1-fresh-sources", 1, ["SC8.1.1"], 1, "gen", function () {
  var cases = [
    { q: "A town draws its drinking water from wells drilled deep into the ground. Which fresh water source is the town using?", k: "Ground water", w: ["A drainage basin", "A glacier", "Run-off"] },
    { q: "A community's water supply comes from a huge slow-moving mass of ice. Which fresh water source is this?", k: "A glacier", w: ["A drainage basin", "Ground water", "Run-off"] },
    { q: "All the rain that falls on a valley eventually drains into one main river. What is the whole area of land that drains this way called?", k: "A drainage basin", w: ["A glacier", "Ground water", "An estuary"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide names three sources of fresh water: drainage basins (the land area that drains into a common river), ground water (water stored underground) and glaciers (water stored as ice). Each case here describes one of the three.",
    {});
}, ["The guide names three sources of fresh water. Decide which one the case describes.", "Wells tap ground water; ice masses are glaciers; land that drains to one river is a drainage basin."]);

E("s8-u1-ocean-vs-fresh", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return mcq("Which statement correctly compares ocean water with fresh water?",
      "Ocean water has higher salinity and higher density, and it freezes at a lower temperature than fresh water",
      ["Ocean water has higher salinity and lower density, and it freezes at a lower temperature than fresh water",
       "Ocean water has lower salinity and higher density, and it freezes at a higher temperature than fresh water",
       "Ocean water has lower salinity and lower density, and it freezes at the same temperature as fresh water"],
      "Dissolved salts make ocean water different from fresh water in three linked ways: its salinity is higher, the dissolved material makes it denser, and the salt lowers its freezing point, so ocean water must get colder than 0 degrees Celsius before it freezes. The comparisons are qualitative, as the guide directs.",
      {});
  },
  function () {
    return mcq("A hydrologist and an oceanographer are comparing notes. Which statement would both accept?",
      "Ocean water is denser than fresh water because of the salts dissolved in it",
      ["Fresh water is denser than ocean water because it is colder",
       "Ocean water and fresh water have the same density because both are mostly water",
       "Fresh water freezes at a lower temperature than ocean water"],
      "The salts dissolved in ocean water add mass without adding much volume, so ocean water is denser than fresh water. Fresh water freezes at 0 degrees Celsius; dissolved salt lowers ocean water's freezing point below that.",
      {});
  }
]), ["Think about what dissolved salt does to water: it adds dissolved material.", "Salt raises density and lowers the freezing point."]);

E("s8-u1-cycle-sequence", 1, ["SC8.1.1"], 1, "var", varset([
  function () {
    return mcq("Which list gives the water cycle processes in a correct order, starting with water leaving the ocean surface?",
      "Evaporation, condensation, precipitation, run-off",
      ["Condensation, evaporation, precipitation, run-off",
       "Evaporation, precipitation, condensation, run-off",
       "Precipitation, evaporation, run-off, condensation"],
      "The Sun's energy evaporates water from the ocean. The vapour cools and condenses into cloud droplets. Water falls as precipitation, and what lands on the ground flows as run-off back toward streams, lakes and the ocean, where the cycle continues.",
      {});
  }
]), ["Follow one parcel of water: up as vapour, into a cloud, down as rain, then flowing away.", "The Sun drives the first step."]);

E("s8-u1-cr-cycle-role", 1, ["SC8.1.1"], 2, "var", varset([
  function () {
    return textq("The oceans hold about 97 percent of Earth's water, yet the water cycle keeps lakes, rivers and ground water supplied with fresh water. Explain how the water cycle does this. (3 marks)",
      ["evaporation leaves the salt behind", "condensation", "precipitation", "run-off and ground water"],
      "<b>Model answer:</b> Energy from the Sun evaporates water from the ocean surface, and the dissolved salts are left behind, so the vapour is fresh. The vapour cools and condenses into clouds, then falls as precipitation. Rain and snow that fall on land collect in lakes and rivers, soak in to become ground water, or flow back as run-off, so the cycle continually delivers fresh water to the land even though almost all of Earth's water is salty ocean water.<br><br><b>Marking points:</b> 1 mark for evaporation leaving the salts behind in the ocean. 1 mark for condensation and precipitation returning the water. 1 mark for the water collecting as surface water or ground water (or returning as run-off).",
      {});
  }
]), ["Start at the ocean surface and follow the water to a lake.", "The key step is what happens to the salt during evaporation."]);

/* ---------- SC8.1.2 Climate change and glaciers ---------- */

E("s8-u1-ice-age", 1, ["SC8.1.2"], 1, "var", varset([
  function () {
    return mcq("What is an ice age?",
      "An extended period of global cooling when glaciers advance and cover large areas of land",
      ["A single very cold winter season in one small region, with heavy snow and frozen lakes",
       "A period when ocean water freezes over completely across the whole surface of the ocean",
       "A short period of warming when a glacier melts back a small distance from its front edge"],
      "An ice age is an extended period of global cooling, lasting far beyond a single season, during which glaciers advance and spread over large areas. Periods of climate change like this have advanced and retreated glaciers many times in Earth's history.",
      {});
  }
]), ["Think about scale: an ice age is measured in thousands of years, not one winter.", "Glaciers grow and advance when the whole climate cools for a long time."]);

E("s8-u1-glacier-retreat", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return mcq("Across the north, glaciers have been retreating as the climate warms. Which set of effects follows from this retreat?",
      "Sea level rises as meltwater reaches the ocean, and the supply of stored fresh water shrinks",
      ["Sea level falls as meltwater reaches the ocean, and the supply of stored fresh water grows",
       "Sea level stays the same, because glacier ice was never part of the water cycle",
       "Permafrost deepens, because retreating glaciers cool the ground beneath them"],
      "Glaciers store fresh water as ice on land. When they retreat, the meltwater runs to the ocean and sea level rises, the stored fresh water supply shrinks, and warming also thaws permafrost in northern ground. Each effect follows from water moving out of storage on land.",
      {});
  }
]), ["Glacier ice is fresh water stored on land. Follow where the meltwater goes.", "Water that leaves land storage ends up in the ocean."]);

E("s8-u1-cr-glacier", 1, ["SC8.1.2"], 2, "var", varset([
  function () {
    return textq("A northern community gets much of its summer water supply from a glacier-fed river. The glacier has retreated steadily for decades. Explain two effects this retreat could have, one on the community's water supply and one on the wider environment. (3 marks)",
      ["less meltwater in summer once the glacier shrinks", "sea level rise", "permafrost thaw"],
      "<b>Model answer:</b> While a glacier is retreating, meltwater flow can be strong, but as the glacier shrinks there is less ice left to melt, so the river's summer flow falls and the community's stored fresh water supply becomes less reliable. In the wider environment, the meltwater that leaves the land reaches the ocean and contributes to rising sea level, and the same warming thaws permafrost, changing northern drainage and land. (Either environmental effect, developed, earns the mark.)<br><br><b>Marking points:</b> 1 mark for the shrinking ice store. 1 mark for the effect on the community's summer water supply. 1 mark for a wider environmental effect (sea level rise or permafrost thaw) with its cause stated.",
      {});
  }
]), ["Separate the two scales: the community's river, then the wider environment.", "A glacier is a store of fresh water. What happens as the store empties?"]);

/* ---------- SC8.1.3 Productivity and species distribution ---------- */

E("s8-u1-fresh-env", 1, ["SC8.1.3"], 1, "gen", function () {
  var cases = [
    { d: "a lowland area that stays saturated with water for much of the year, with cattails and sphagnum growing in it", k: "A wetland", w: ["An estuary", "A lake", "A river"] },
    { d: "the place where a river meets the ocean and its fresh water mixes with salt water", k: "An estuary", w: ["A lake", "A wetland", "The benthic zone"] },
    { d: "a flowing freshwater environment that carries water from higher ground toward a lake or the ocean", k: "A river or stream", w: ["An estuary", "A wetland", "The pelagic zone"] },
    { d: "a standing body of fresh water, deep enough in the middle that sunlight does not reach the bottom", k: "A lake or pond", w: ["An estuary", "A river", "A wetland"] }
  ];
  var c = pick(cases);
  return mcq("Which freshwater or coastal environment is described here: " + c.d + "?",
    c.k, c.w,
    "The guide's freshwater environments are lakes and ponds (standing water), wetlands (land saturated with water), rivers and streams (flowing water), and estuaries, where a river's fresh water mixes with ocean salt water and the water is brackish.",
    {});
}, ["Decide first whether the water is standing, flowing, saturated land, or mixing with the ocean.", "An estuary is defined by mixing: fresh water meeting salt water."]);

E("s8-u1-species-category", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("A survey of a pond records snails, frogs, bacteria and cattails. Which list correctly matches each kind of organism to its category?",
      "Snails are invertebrates, frogs are vertebrates, bacteria are microorganisms, and cattails are plants",
      ["Snails are vertebrates, frogs are invertebrates, bacteria are plants, and cattails are microorganisms",
       "Snails are microorganisms, frogs are vertebrates, bacteria are invertebrates, and cattails are plants",
       "Snails are invertebrates, frogs are microorganisms, bacteria are vertebrates, and cattails are plants"],
      "The guide sorts the species of an environment into invertebrates (animals without backbones, like snails), vertebrates (animals with backbones, like frogs), microorganisms (tiny living things like bacteria) and plants (like cattails).",
      {});
  }
]), ["Use the backbone test first: snails have none, frogs have one.", "Bacteria are microorganisms; cattails are plants."]);

E("s8-u1-zones", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("A flounder lies flat on the ocean floor and feeds there. Which zone of the marine environment is the flounder's home?",
      "The benthic zone, the ocean floor environment",
      ["The pelagic zone, the open water environment",
       "An estuary, where the river meets the ocean",
       "A wetland, where the land stays saturated"],
      "Marine environments divide into the pelagic zone, the open water, and the benthic zone, the ocean floor. A bottom-dwelling fish like a flounder lives in the benthic zone.",
      {});
  }
]), ["Pelagic means open water; benthic means the bottom.", "The flounder's home is the floor itself."]);

E("s8-u1-estuary", 1, ["SC8.1.3"], 1, "var", varset([
  function () {
    return mcq("The water in an estuary is often described as brackish. What does brackish mean?",
      "It is a mixture of fresh water and salt water",
      ["It is high in pollutants",
       "It is low in living things",
       "It is very muddy and hard to see through"],
      "An estuary forms where a river enters the ocean, so its water is a mixture of the river's fresh water and the ocean's salt water. That mixture is called brackish.",
      {});
  }
]), ["An estuary is where a river meets the ocean. What happens to the water there?", "Brackish describes mixing, not pollution or muddiness."]);

E("s8-u1-productivity", 1, ["SC8.1.3"], 3, "var", varset([
  function () {
    return mcq("Two bays are surveyed. Bay A receives a steady upwelling of deep ocean water. Bay B has no upwelling and few nutrients reaching its surface water. Both bays get similar sunlight and temperatures. Which bay should support more species, and why?",
      "Bay A, because the upwelled water carries nutrients that feed plankton, which supports the rest of the food web",
      ["Bay A, because deep water is colder, and cold water always holds more species than warm water does in any bay",
       "Bay B, because low nutrient levels keep algae from using up the oxygen in the water, so more species survive there",
       "Both bays equally, because sunlight and temperature are the only factors that matter for the species in a bay"],
      "Productivity depends on more than light and temperature. Upwelling brings nutrient-rich deep water to the surface, the nutrients feed plankton growth, and the plankton supports the food web above it. Bay B lacks that nutrient supply, so its productivity and species distribution are limited by it.",
      {});
  }
]), ["Follow the chain: nutrients, plankton, then everything that eats plankton.", "The guide names upwelling as the marine factor that feeds productivity."]);

/* ---------- SC8.1.4 Abiotic factors ---------- */

E("s8-u1-upwelling", 1, ["SC8.1.4"], 1, "var", varset([
  function () {
    return mcq("What is upwelling?",
      "The vertical movement of colder, denser, nutrient-rich water from below up to the ocean surface",
      ["The movement of warm surface water down through the water column to the ocean floor below",
       "The sideways movement of surface water pushed along by the wind blowing over the ocean",
       "The rise and fall of the ocean surface as the tides move in and out along the shore"],
      "Upwelling is the vertical motion that brings subsurface water, which is colder, denser and rich in nutrients, up to the surface. It is most common along the western coastlines of continents, and it feeds the productivity of those surface waters.",
      {});
  }
]), ["Upwelling moves water in one direction: up. What kind of water comes up?", "The water that rises is cold, dense and full of nutrients."]);

E("s8-u1-abiotic", 1, ["SC8.1.4"], 2, "gen", function () {
  var cases = [
    { d: "Heavy rain washes soil into a pond, and the water becomes cloudy for weeks. The water plants on the bottom begin to die off.", k: "Turbidity: suspended particles block the sunlight the plants need", w: ["Dissolved oxygen: the rain adds oxygen the plants cannot use", "Phosphates: the soil removes nutrients the plants need", "Temperature: the rain cools the water below what plants tolerate"] },
    { d: "Fertilizer run-off enters a lake, and algae grow so thick that the water turns green.", k: "Phosphates: extra nutrients feed a burst of algae growth", w: ["Acidity: the fertilizer makes the water too acidic for algae", "Pollution: the fertilizer poisons the algae's predators only", "Turbidity: the fertilizer clouds the water and shades the algae"] },
    { d: "A factory releases warm water into a river all summer, and the fish that used to live there move downstream.", k: "Temperature: warmer water holds less dissolved oxygen, so the fish leave", w: ["Acidity: warm water is always more acidic than cold water", "Phosphates: the warm water carries phosphates that repel fish", "Upwelling: the warm water sinks and pushes the fish away"] }
  ];
  var c = pick(cases);
  return mcq("Which abiotic factor best explains this change: " + c.d,
    c.k, c.w,
    "Abiotic factors act through specific mechanisms. Turbidity is suspended material that blocks light. Phosphates are nutrients, so extra phosphates feed algae growth. Temperature matters partly because warm water holds less dissolved oxygen than cold water, which is why fish leave warmed water. Matching the factor to its mechanism is the skill.",
    {});
}, ["Name the factor, then check its mechanism against what changed.", "Cloudy water points to turbidity; a nutrient burst points to phosphates; warmed water points to temperature and oxygen."]);

E("s8-u1-cr-abiotic", 1, ["SC8.1.4"], 2, "var", varset([
  function () {
    return textq("A pond that supported frogs, fish and water plants changes over one summer: run-off from a new road makes the water cloudy for weeks at a time, and fertilizer from nearby lawns washes in after every rain. Explain the effect each change would have on the pond's species, naming the abiotic factor in each case. (3 marks)",
      ["turbidity blocks sunlight so water plants die", "phosphates feed algae growth", "species that depend on the plants are affected"],
      "<b>Model answer:</b> The road run-off raises the pond's turbidity: suspended particles block sunlight, so the water plants on the bottom get less light and begin to die off, and the animals that feed on or shelter among the plants are affected with them. The fertilizer raises phosphate levels: phosphates are nutrients, so algae grow rapidly, and the algal growth further shades the plants and changes the pond's oxygen balance as it decays. Both changes shift which species the pond can support.<br><br><b>Marking points:</b> 1 mark for turbidity named and linked to blocked sunlight and plant loss. 1 mark for phosphates named and linked to increased algae growth. 1 mark for a consequence carried through to the pond's other species.",
      {});
  }
]), ["Take the two changes one at a time: cloudy water, then fertilizer.", "Each factor acts through a mechanism. Name the factor, then its mechanism, then the species effect."]);

E("s8-u1-temp-oxygen", 1, ["SC8.1.4"], 3, "var", varset([
  function () {
    return mcq("Ocean temperatures in a fishing region rise over several years. Following the chain of effects the guide describes, which sequence is correct?",
      "Warmer water holds less dissolved oxygen, so fish move to other areas, and the local fishery is affected",
      ["Warmer water holds more dissolved oxygen, so fish populations grow, and the local fishery expands",
       "Warmer water holds less dissolved oxygen, but fish stay because temperature does not affect distribution",
       "Warmer water changes the water's salinity, so fish move, and the local fishery is affected"],
      "The guide's example chain runs: ocean temperature increases, the warmer water holds less dissolved oxygen, fish move away from the region, and the local fishery is affected. Temperature acts on distribution through the oxygen the water can hold.",
      {});
  }
]), ["The chain has four links: temperature, oxygen, fish, fishery. Check each option against it.", "Warm water holds less dissolved oxygen than cold water."]);

/* ---------- SC8.1.5 Ocean basin development ---------- */

E("s8-u1-profile-figure", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the continental slope?",
      "B",
      ["A", "C", "D"],
      "In the basin profile, A sits on the continental shelf, the flat extension of the continent under shallow water. B sits where the floor drops steeply, the continental slope. C lies on the wide, flat abyssal plain, and D is the raised mid-ocean ridge.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the abyssal plain?",
      "C",
      ["A", "B", "D"],
      "The abyssal plain is the wide, flat region of deep ocean floor, marked C. A is the continental shelf, B is the steep continental slope, and D is the raised mid-ocean ridge.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a cross-section of an ocean basin. Which letter marks the mid-ocean ridge?",
      "D",
      ["A", "B", "C"],
      "The mid-ocean ridge is the underwater mountain range where new ocean floor forms, marked D where the profile rises. A is the continental shelf, B the continental slope, and C the flat abyssal plain.",
      {});
    q.figure = S8_PROFILE_SVG;
    return q;
  }
]), ["Work from the shore outward: shelf, then the steep drop, then the flat deep floor, then the ridge.", "The slope is the steep part of the profile."]);

E("s8-u1-basin-process", 1, ["SC8.1.5"], 3, "gen", function () {
  var cases = [
    { d: "a long underwater mountain range where molten material rises, cools and hardens into new ocean floor", k: "Volcanic action and plate tectonics building new floor at a mid-ocean ridge", w: ["Erosion wearing down the outer edge of the continent over a long period of time", "Glaciation carving a deep drainage channel through the land as the ice moves", "Deposition of sediment settling slowly across the flat abyssal plain over time"] },
    { d: "a deep valley system on land that now carries a river's water toward the ocean, cut over thousands of years by moving ice and then by flowing water", k: "Glaciation and erosion shaping a continental drainage system", w: ["Plate tectonics raising a mid-ocean ridge along the middle of the ocean floor", "Volcanic action forming new ocean floor where the plates spread apart", "Deposition building up the outer edge of the continental shelf over a long period of time"] }
  ];
  var c = pick(cases);
  return mcq("Which process or pair of processes best explains this feature: " + c.d + "?",
    c.k, c.w,
    "Ocean basins and continental drainage systems develop through volcanic action, plate tectonics, erosion and glaciation. New ocean floor is built where plates move apart and volcanic material hardens at mid-ocean ridges. On land, glaciation's role is erosion: moving ice and the water that follows carve the drainage systems that carry water to the ocean.",
    {});
}, ["Decide whether the feature is being built up (new floor) or worn and carved (drainage).", "New ocean floor means volcanic action at a ridge; carved valleys mean erosion, with glaciation as the ice-driven part."]);

E("s8-u1-glaciation-role", 1, ["SC8.1.5"], 2, "var", varset([
  function () {
    return mcq("In the development of ocean basins and continental drainage systems, what is glaciation's role?",
      "Glaciation erodes land as ice moves, shaping the drainage systems that carry water to the ocean",
      ["Glaciation builds new ocean floor in the places where the plates of the crust move apart",
       "Glaciation deposits the sediment that settles out and forms the flat abyssal plain",
       "Glaciation creates the volcanic action that takes place all along the mid-ocean ridges"],
      "The guide limits glaciation's role to erosion in drainage systems: moving ice scrapes and carves the land, shaping the valleys and basins that drain toward the ocean. New ocean floor comes from volcanic action and plate tectonics, not from ice.",
      {});
  }
]), ["The guide gives glaciation one specific job. It is a wearing-away job, not a building job.", "Ice moves and scrapes: that is erosion."]);

E("s8-u1-profile-order", 1, ["SC8.1.5"], 1, "var", varset([
  function () {
    return mcq("Starting at the shoreline and moving out into the deep ocean, which order of features is correct?",
      "Continental shelf, continental slope, abyssal plain, mid-ocean ridge",
      ["Continental slope, continental shelf, mid-ocean ridge, abyssal plain",
       "Abyssal plain, continental slope, continental shelf, mid-ocean ridge",
       "Continental shelf, abyssal plain, continental slope, mid-ocean ridge"],
      "From the shore, the continent extends under shallow water as the continental shelf. The floor then drops steeply along the continental slope to the wide, flat abyssal plain, and the mid-ocean ridge rises beyond it.",
      {});
  }
]), ["Picture the profile: gentle shelf, steep drop, flat deep floor, then the ridge rises.", "The shelf comes first because it is the continent's own edge."]);

/* ---------- SC8.1.6 Currents, winds and regional climates ---------- */

E("s8-u1-currents", 1, ["SC8.1.6"], 1, "gen", function () {
  var cases = [
    { q: "Which description fits the Labrador Current?", k: "A cold current flowing southward past Newfoundland and Labrador", w: ["A cold current flowing northward past Florida", "A warm current flowing northward past Newfoundland and Labrador", "A warm current flowing southward from the Gulf of Mexico"] },
    { q: "Which description fits the Gulf Stream?", k: "A warm current flowing northward from the Gulf of Mexico along the east coast", w: ["A cold current flowing southward from the Arctic", "A warm current flowing southward past Labrador", "A cold current flowing northward along the west coast"] },
    { q: "A ship's crew wants to know which current carries icebergs southward past Newfoundland each spring. Which current is it?", k: "The Labrador Current", w: ["The Gulf Stream", "The North Atlantic Drift only", "The thermocline"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Two currents dominate this province's ocean. The Labrador Current carries cold Arctic water southward past Labrador and Newfoundland, icebergs with it. The Gulf Stream carries warm water northward from the Gulf of Mexico along the east coast of North America.",
    {});
}, ["Cold water comes from the north: that is the Labrador Current. Warm water comes from the south: the Gulf Stream.", "Icebergs travel with the cold current."]);

E("s8-u1-fog", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Newfoundland's coasts are famous for thick fog. What produces it?",
      "Warm, moist air carried by the Gulf Stream passes over the cold water of the Labrador Current and condenses",
      ["Cold, dry air from the Labrador Current mixes with the cold water offshore and turns into fog banks",
       "Warm water from the Gulf Stream evaporates directly into fog that hangs over the Grand Banks",
       "Cold air sinks over the warm Gulf Stream and forms a layer of cloud right at the surface of the water"],
      "Fog forms when warm, moist air from over the Gulf Stream moves over the much colder surface water of the Labrador Current. The air cools, its water vapour condenses into tiny droplets, and fog results. The meeting of the two currents is why this province is so foggy.",
      {});
  }
]), ["Fog is condensation at the surface. Which air mass carries the moisture, and what cools it?", "Warm moist air plus a cold surface gives fog."]);

E("s8-u1-nino-nina", 1, ["SC8.1.6"], 2, "gen", function () {
  var cases = [
    { q: "During an El Niño event, what happens to the trade winds and the surface ocean in the Pacific?", k: "The trade winds decrease and the surface ocean warms", w: ["The trade winds decrease and the surface ocean cools", "The trade winds increase and the surface ocean cools", "The trade winds increase and the surface ocean warms"] },
    { q: "During a La Niña event, what happens to the trade winds and the surface ocean in the Pacific?", k: "The trade winds increase and the surface ocean cools", w: ["The trade winds decrease and the surface ocean cools", "The trade winds decrease and the surface ocean warms", "The trade winds increase and the surface ocean warms"] },
    { q: "A report says the Pacific's trade winds have weakened and its surface waters are warmer than usual this year. Which event is being described?", k: "El Niño", w: ["La Niña", "A neap tide", "Upwelling"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide distinguishes the pair by the trade winds. In El Niño the trade winds decrease and the ocean warms. In La Niña the trade winds increase and the ocean cools. The wind change comes first in each definition.",
    {});
}, ["Anchor on the winds: weaker winds go with warming, stronger winds with cooling.", "El Niño: winds decrease, ocean warms. La Niña is the reverse."]);

E("s8-u1-heat-storage", 1, ["SC8.1.6"], 2, "var", varset([
  function () {
    return mcq("Coastal towns in this province usually have milder winters and cooler summers than inland towns at the same latitude. What property of the ocean causes this?",
      "Water heats up and cools down slowly, so the ocean stores heat and moderates the climate of nearby land",
      ["Ocean currents move so fast that they carry the summer heat away from the coast before winter arrives",
       "Salt water freezes at a lower temperature, which keeps warming the air above the coast all winter long",
       "The ocean reflects sunlight back into the air over coastal towns, warming them in every season"],
      "Water has a high heat capacity: it takes a long time to heat up and a long time to cool down. The ocean stores summer heat and releases it slowly through winter, and stays cool into summer, so it moderates the climate of the land beside it. Convection and thermals then move that warmed or cooled air over the coast.",
      {});
  }
]), ["The ocean is a heat store. Think about how slowly a large body of water changes temperature.", "Heat capacity: water resists temperature change, and the coast shares that steadiness."]);

E("s8-u1-cr-coastal-climate", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return textq("A coastal town and an inland town sit at the same latitude. In January the coastal town averages -4 degrees Celsius while the inland town averages -14 degrees Celsius, and in July the coastal town is the cooler of the two. Explain the ocean's role in this pattern. (3 marks)",
      ["the ocean stores heat because water heats and cools slowly", "stored heat is released in winter and the ocean stays cool in summer", "currents and winds move the moderated air over the coast"],
      "<b>Model answer:</b> Water heats up and cools down very slowly, so the ocean stores a great deal of heat. Through the winter the ocean gives up its stored heat gradually, warming the air over the coast, while the inland town, with no such store beside it, gets much colder. In summer the ocean is still cool from winter and holds the coastal town's temperature down. Currents such as the warm Gulf Stream add heat to the water offshore, and winds and convection carry the ocean-moderated air over the coastal town.<br><br><b>Marking points:</b> 1 mark for water's slow heating and cooling (heat storage). 1 mark for the stored heat moderating winter (and the cool ocean moderating summer). 1 mark for a carrying mechanism: currents supplying the heat, or winds and convection moving the moderated air onshore.",
      {});
  }
]), ["The pattern runs both ways: warmer in winter, cooler in summer. One property of water explains both.", "Think of the ocean as a very slow heater and cooler beside the town."]);

E("s8-u1-iceberg", 1, ["SC8.1.6"], 3, "var", varset([
  function () {
    return mcq("Each spring, tour operators off St. John's advertise iceberg viewing as the bergs drift south past the Avalon Peninsula. A student claims the Gulf Stream brings the bergs. Which correction is right, and why does it matter to the tour season?",
      "The cold Labrador Current carries the bergs south from Greenland; it matters because the bergs arrive as the current carries them past the coast in spring",
      ["The Gulf Stream does bring the bergs south, and it matters because its warm water melts them quickly once they reach the coast",
       "The Labrador Current carries the bergs north from Antarctica; it matters because they arrive off the coast in the autumn instead",
       "Neither current is involved; the bergs drift south with the tides alone, which is why the viewing season stays so short each year"],
      "Icebergs calve from Greenland's glaciers into the cold Labrador Current, which flows southward past Labrador and Newfoundland carrying them. The warm Gulf Stream flows the other way and would melt bergs, not deliver them. The viewing season follows the cold current's spring delivery.",
      {});
  }
]), ["Icebergs come from Greenland, in the north. Which current flows southward from there?", "A warm current would be a problem for an iceberg, not a delivery service."]);

/* ---------- SC8.1.7 Waves and tides ---------- */

E("s8-u1-wave-energy", 1, ["SC8.1.7"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a water wave. Where does the energy of ocean surface waves come from?",
      "Moving air: the wind transfers its energy to the water surface",
      ["The gravitational pull of the moon",
       "Earthquakes under the ocean floor",
       "Ocean currents flowing beneath the surface"],
      "A wave on the surface of water is moving water that transfers energy. Ordinary ocean waves are generated primarily by the wind: moving air transfers its energy across the surface of the water. The moon's pull generates tides instead, and undersea earthquakes generate the exceptional case, tsunamis.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the crest of the wave?",
      "A",
      ["B", "C", "D"],
      "The crest is the top of the wave, marked A. B sits in the trough, the lowest point, C spans the wavelength, the distance from one crest to the next, and D spans the wave height, from crest level down to trough level.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the wavelength?",
      "C",
      ["A", "B", "D"],
      "The wavelength is the distance between two neighbouring crests, spanned by C. A marks a single crest, B sits in a trough, and D spans the wave height.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  },
  function () {
    var q = mcq("In the wave diagram, which letter marks the wave height?",
      "D",
      ["A", "B", "C"],
      "The wave height is the vertical distance from trough level to crest level, spanned by D. A marks a single crest, B sits in a trough, and C spans the wavelength horizontally.",
      {});
    q.figure = S8_WAVE_SVG;
    return q;
  }
]), ["Ordinary waves are wind-driven. Tides are the moon-driven movement.", "The crest is the high point; the wavelength runs crest to crest; the height runs crest to trough."]);

E("s8-u1-tides", 1, ["SC8.1.7"], 1, "gen", function () {
  var cases = [
    { q: "The Earth, the moon and the sun are in a straight line. What happens to the tidal range?", k: "It is at its greatest: these are spring tides", w: ["It is at its smallest: these are spring tides", "It is at its greatest: these are neap tides", "It is unchanged: alignment does not affect tides"] },
    { q: "The sun, the moon and the Earth form a right angle. What happens to the tidal range?", k: "It is at its smallest: these are neap tides", w: ["It is at its greatest: these are neap tides", "It is at its smallest: these are spring tides", "It is unchanged: right angles cancel the tides"] },
    { q: "A fishing crew wants the largest possible tidal range so their boat can clear a shallow shoal. When should they plan to leave?", k: "During spring tides, when the Earth, moon and sun line up", w: ["During neap tides, when the sun and moon form a right angle with Earth", "At any time, because tidal range does not change through the month", "Only during an El Niño event"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Tides are generated by the gravitational pull of the moon, with the sun adding a lesser pull. When the Earth, moon and sun line up, the pulls add and the tidal range is greatest: spring tides. When the sun and moon are at right angles to Earth, the pulls partly cancel and the range is smallest: neap tides. Each occurs twice a month.",
    {});
}, ["Line up means the pulls add. Right angle means they partly cancel.", "Spring tides have the greatest range; neap tides the smallest."]);

E("s8-u1-tidal-range", 1, ["SC8.1.7"], 2, "gen", function () {
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
  return mcq("At a harbour, high tide is measured at " + hi + " m and the following low tide at " + lo + " m. What is the tidal range?",
    fmt(range),
    dis.map(fmt),
    "The tidal range is the difference between high tide and low tide: " + hi + " m - " + lo + " m = " + range + " m. Large ranges like this are why harbours such as those in the Bay of Fundy need careful timing.",
    {});
}, ["Tidal range is a difference: high tide minus low tide.", "Subtract the low tide measurement from the high tide measurement."]);

E("s8-u1-cr-tides", 1, ["SC8.1.7"], 2, "var", varset([
  function () {
    return textq("Explain why spring tides have a greater tidal range than neap tides, referring to the positions of the Earth, the moon and the sun in each case. (3 marks)",
      ["tides are generated by the gravitational pull of the moon", "in spring tides the three bodies line up and the pulls add", "in neap tides the sun and moon are at right angles and the pulls partly cancel"],
      "<b>Model answer:</b> Tides are generated mainly by the gravitational pull of the moon on Earth's oceans, with the sun adding a smaller pull of its own. In spring tides the Earth, moon and sun are in a straight line, so the sun's pull reinforces the moon's and the tidal range is greatest. In neap tides the sun and moon sit at right angles as seen from Earth, so their pulls work against each other and the tidal range is smallest. Both occur twice each month.<br><br><b>Marking points:</b> 1 mark for tides caused by the moon's gravitational pull (the sun's to a lesser extent). 1 mark for the aligned positions in spring tides and the pulls adding. 1 mark for the right-angle positions in neap tides and the pulls partly cancelling.",
      {});
  }
]), ["Start with what causes tides at all, then compare the two arrangements of the three bodies.", "Same cause, two geometries: in line, or at right angles."]);

E("s8-u1-wave-size", 1, ["SC8.1.7"], 3, "var", varset([
  function () {
    return mcq("Three storms are compared. Storm 1: strong wind for two hours over a small bay. Storm 2: the same wind for two days over a small bay. Storm 3: the same wind for two days across a wide ocean. Which storm produces the largest waves, and why?",
      "Storm 3, because wave size grows with wind speed, with how long the wind blows, and with the size of the water area it passes over",
      ["Storm 1, because a small bay concentrates the wind's energy into a smaller area of water and builds the waves up there",
       "Storm 2, because how long the wind blows is the only factor that affects the size of the waves a storm produces",
       "All three storms equally, because the wind speed is exactly the same in each of the three storms compared here"],
      "Wave size is influenced by three things together: the speed of the wind, the duration it blows, and the size of the water area it passes over (the fetch). Storm 3 matches Storm 2 on speed and duration and adds a far greater fetch, so its waves grow largest before their energy reaches a shoreline.",
      {});
  }
]), ["Three factors build a wave. Check which storm has all three working for it.", "Speed, duration, and the distance of open water: the fetch."]);

/* ---------- SC8.1.8 Erosion and deposition at shorelines ---------- */

E("s8-u1-slope", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("Along one stretch of coast, a gently sloping beach is gaining sand while a steep cliff shore nearby is crumbling into the sea. Which statement explains the difference?",
      "Deposition happens on shorelines with shallow slopes, while erosion dominates on steeper slopes",
      ["Deposition happens on steep slopes, while erosion dominates on shallow slopes",
       "The slope makes no difference; only the rock type matters",
       "Both shores are eroding; deposition never adds material to a shoreline"],
      "The energy of waves erodes and deposits. On shallow-sloped shorelines, waves lose energy and drop the sediment they carry: deposition. On steep slopes, wave energy stays concentrated and tears material away: erosion. Slope is one of the factors, along with shoreline shape, rock type and wave energy, that decide which process wins.",
      {});
  }
]), ["Gaining sand means deposition; crumbling means erosion. Match each to its slope.", "Gentle slopes let waves drop their load."]);

E("s8-u1-headland-energy", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return mcq("Waves approaching a coast with headlands and bays do not strike it evenly. Where is the wave energy concentrated, and what follows?",
      "Energy concentrates on the headlands, so they erode fastest, while energy spreads out in the bays, where deposition builds beaches",
      ["Energy concentrates in the bays, so they erode fastest, while headlands receive spread-out energy and gain deposits",
       "Energy is equal everywhere, so headlands and bays change at the same rate",
       "Energy concentrates on the headlands, so sand is deposited there and the headlands grow"],
      "As waves bend toward a coast, their energy focuses on the headlands that jut out and spreads out as it reaches the bays. Concentrated energy erodes the headlands; spread-out energy in the bays drops sediment, building beaches. This is why headlands wear back while bays fill in.",
      {});
  }
]), ["A headland juts out and meets the waves first. What does that do to the energy it receives?", "Concentrated energy erodes; spread-out energy deposits."]);

E("s8-u1-rock-resistance", 1, ["SC8.1.8"], 1, "var", varset([
  function () {
    return mcq("The red rocks at St. George's are wearing away noticeably faster than the cliffs of Bell Island in Conception Bay. What does this comparison show?",
      "Less resistant rock types erode at a faster rate than more resistant rock types under the same wave action",
      ["Red rock always erodes faster than grey rock, whatever the actual rock type or its resistance to waves",
       "Rock type makes no difference to erosion rates at all; only the energy of the waves striking the shore matters",
       "Cliffs erode slowly only because they stand taller than the other shores along the same stretch of coast"],
      "The guide's own comparison: less resistant rock, such as the sandstone at St. George's, erodes faster than more resistant rock, such as the cliffs of Bell Island. Rock type is one of the factors that set how fast a shoreline changes, alongside slope, shape and wave energy.",
      {});
  }
]), ["Both shores face wave action. The difference named in the question is the rock itself.", "Resistance is the rock property that matters here."]);

E("s8-u1-cr-headland", 1, ["SC8.1.8"], 2, "var", varset([
  function () {
    return textq("A headland of resistant rock juts into the ocean between two sandy bays. Over many years the headland develops cracks, a cave, and eventually an arch, while the bays grow wider beaches. Explain both changes, referring to wave energy. (3 marks)",
      ["wave energy is concentrated on the headland", "concentrated energy erodes the rock, cutting caves and arches", "energy spreads out in the bays so sediment is deposited"],
      "<b>Model answer:</b> Waves bend as they approach the coast, and their energy is concentrated on the headland that juts out to meet them. That concentrated energy erodes the rock, working into cracks and hollowing out caves; where a cave cuts through, an arch forms, and continued erosion is what eventually leaves a stack. In the bays the same wave energy spreads out over a wider front, loses strength, and can no longer carry its sediment, so the sediment is deposited and the beaches grow.<br><br><b>Marking points:</b> 1 mark for wave energy concentrated on the headland. 1 mark for erosion of the headland producing the cave and arch sequence. 1 mark for energy spreading in the bays and depositing sediment.",
      {});
  }
]), ["One coast, two energy stories: focused on the headland, spread in the bays.", "Erosion needs concentrated energy; deposition happens where energy is lost."]);

/* ---------- SC8.1.9 Landforms ---------- */

E("s8-u1-landform-figure", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea arch?",
      "B",
      ["A", "C", "D"],
      "The landforms show the erosion sequence. A is a sea cave, hollowed into the headland. B is a sea arch, where erosion has cut through the headland. C is a sea stack, a pillar left standing when an arch collapses, and D is the low stump that remains as a stack wears down.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea stack?",
      "C",
      ["A", "B", "D"],
      "A sea stack is the isolated pillar of rock left when a sea arch collapses, marked C. A is a sea cave, B is a sea arch still joined to the headland, and D is the worn-down stump of an older stack.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  },
  function () {
    var q = mcq("The diagram shows a shoreline with several landforms. Which letter marks a sea cave?",
      "A",
      ["B", "C", "D"],
      "A sea cave is the hollow worn into the base of the headland, marked A. B is a sea arch, C a sea stack, and D a stump: the later stages of the same erosion sequence.",
      {});
    q.figure = S8_LANDFORM_SVG;
    return q;
  }
]), ["Follow the sequence: cave first, then the cut-through arch, then the standing stack.", "Each landform is one stage of the headland wearing away."]);

E("s8-u1-landform-formation", 1, ["SC8.1.9"], 2, "gen", function () {
  var cases = [
    { q: "How does a sand bar form?", k: "Waves and currents deposit sand in shallow water, building up a ridge of sediment", w: ["Waves erode a headland until a ridge of solid rock is left standing in the water", "A cave cuts through a headland and the roof collapses into the water below", "Wind blows dry beach sand into large piles above the high tide line on shore"] },
    { q: "How does a beach form and grow?", k: "Deposition: waves drop sand and sediment along a gently sloping shore faster than they remove it", w: ["Erosion: waves tear sand from the shore and pile it up in a ridge at the waterline", "Deposition: glaciers leave sand and sediment behind as they slowly retreat back from the coast", "Weathering: rock breaks down in place and the broken pieces stay piled where they fell"] },
    { q: "How does a shoal form?", k: "Sediment deposited in shallow water builds an area that is a hazard to boats", w: ["A stack collapses and its rubble spreads out across the shallow harbour entrance", "Tides carve a deep channel through the harbour that fills with sediment at low tide", "Volcanic action raises a new ridge on the ocean floor near the shore"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Beaches, shoals and sand bars are deposition landforms: they exist because waves and currents dropped sediment in shallow water. Sea caves, arches and stacks are the erosion family. Sorting a landform into its family is the first step in explaining it.",
    {});
}, ["Ask whether material is being dropped or torn away.", "Sand features are built by deposition."]);

E("s8-u1-erosion-deposition", 1, ["SC8.1.9"], 1, "var", varset([
  function () {
    return mcq("Which list contains only landforms built by deposition?",
      "Beach, shoal, sand bar",
      ["Beach, sea arch, sand bar",
       "Sea cave, sea arch, sea stack",
       "Shoal, sea stack, sand bar"],
      "Beaches, shoals and sand bars are all built where waves and currents deposit sediment. Sea caves, sea arches and sea stacks are carved by erosion. The two families are the guide's organizing split for shoreline landforms.",
      {});
  }
]), ["Three of the six named landforms are deposited; three are eroded. Find the all-deposition list.", "Caves, arches and stacks are cut out of rock: erosion."]);

/* ---------- SC8.2.1 Ocean research institutions ---------- */

E("s8-u1-institutions", 1, ["SC8.2.1"], 1, "gen", function () {
  var cases = [
    { q: "A student is researching weather systems over the Atlantic. Which Canadian institution's work is most directly connected to weather?", k: "Environment Canada", w: ["C-CORE at Memorial University", "The Ocean Sciences Centre", "The Federal Department of Fisheries"] },
    { q: "A student wants to learn about research into cold ocean engineering, such as how structures stand up to icebergs. Which institution fits best?", k: "C-CORE, the Centre for Cold Ocean Research at Memorial University", w: ["Environment Canada", "The Federal Department of Fisheries", "The Ocean Sciences Centre"] },
    { q: "A student is studying the science of fish stocks and ocean ecosystems. Which institution fits best?", k: "The Ocean Sciences Centre at Memorial University", w: ["C-CORE at Memorial University", "Environment Canada", "A provincial tourism board"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Canada supports ocean research through public and private institutions, including Environment Canada (weather), the Federal Department of Fisheries, and Memorial University's Ocean Sciences Centre, its Oceanography Department, the Fisheries and Marine Institute, and C-CORE for cold ocean research. The guide asks that students be aware these agencies exist and what they broadly do.",
    {});
}, ["Match the institution to its broad focus: weather, fisheries and oceans science, or cold ocean engineering.", "C-CORE's name carries its focus: cold ocean research."]);

E("s8-u1-institution-focus", 1, ["SC8.2.1"], 1, "var", varset([
  function () {
    return mcq("Which statement about Canadian ocean research institutions is correct?",
      "Institutions such as Environment Canada, the Federal Department of Fisheries and Memorial University's Ocean Sciences Centre all support research involving the oceans",
      ["Only universities conduct ocean research in Canada, and no government department at any level takes any part in the work at all, in any region of the country",
       "Ocean research in Canada is carried out entirely by private fishing companies working on the Atlantic and Pacific coasts, with no other bodies involved",
       "The institutions exist and employ many scientists, but they study only the freshwater lakes and rivers of Canada and never the oceans around its coasts"],
      "Ocean research in Canada is shared among government departments and university centres. Environment Canada covers weather, the Federal Department of Fisheries covers fisheries and oceans, and Memorial University's Ocean Sciences Centre, C-CORE and Marine Institute research the ocean from St. John's. The guide requires awareness that these institutions exist and support ocean research.",
      {});
  }
]), ["The guide's point is awareness: these institutions exist and research the oceans.", "Government and university institutions both appear in the guide's list."]);

/* ---------- SC8.2.2 Technologies for researching ocean basins ---------- */

E("s8-u1-tech", 1, ["SC8.2.2"], 1, "gen", function () {
  var cases = [
    { q: "Scientists map the shape of the ocean floor by sending sound pulses down and timing their echoes. Which technology is this?", k: "Sonar", w: ["Diving", "Satellites", "Underwater photography"] },
    { q: "Scientists want to observe the wreck of the Titanic and collect samples from around it, far deeper than any diver can go. Which technology fits?", k: "A deep sea submersible", w: ["A satellite", "SCUBA diving", "Sonar alone"] },
    { q: "Scientists track broad ocean surface conditions, such as currents and storm systems, over the whole Atlantic at once. Which technology fits best?", k: "Satellites", w: ["Deep sea submersibles", "Diving", "Underwater photography"] },
    { q: "Scientists want close visual records of organisms living on a shallow reef. Which technology fits best?", k: "Underwater photography and videography", w: ["A deep sea submersible", "Satellites", "Sonar"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Much of what is known about ocean basins comes from indirect observations gathered by technology: sonar maps the floor with sound, satellites watch the surface broadly, underwater photography and videography record what is there, submersibles carry people and instruments to depth, and diving serves shallow work. Matching the tool to the job is the content.",
    {});
}, ["Decide what the scientists need: a map, a broad view, pictures, or a visit to depth.", "Sound and echoes mean sonar."]);

E("s8-u1-sonar", 1, ["SC8.2.2"], 1, "var", varset([
  function () {
    return mcq("Why is sonar so useful for researching ocean basins?",
      "Sound travels through water and returns echoes from the floor, so the floor's shape can be mapped without seeing it directly",
      ["Sonar cameras take clear photographs of the ocean floor even in total darkness far below the surface",
       "Sonar lets divers breathe safely at any depth they choose to descend to in the open ocean",
       "Sonar measures the salt content and the temperature of deep ocean water directly as it passes"],
      "Sonar works by sending sound pulses into the water and timing the echoes that bounce back from the ocean floor. From the timing, scientists build a picture of the basin's shape. It is an indirect observation: the floor is mapped without anyone seeing it, which is how most basin research proceeds.",
      {});
  }
]), ["Sonar uses sound. What does the returning echo tell the scientists?", "Echo timing becomes depth, and depth readings become a map."]);

E("s8-u1-cr-indirect", 1, ["SC8.2.2"], 2, "var", varset([
  function () {
    return textq("No one can see most of the ocean floor directly, yet scientists produce detailed maps of ocean basins and can describe features such as mid-ocean ridges and trenches. Explain how this knowledge is built, naming two technologies and what each contributes. (3 marks)",
      ["sonar maps the floor using sound echoes", "satellites or submersibles or photography add further evidence", "knowledge comes from indirect observations combined"],
      "<b>Model answer:</b> Knowledge of ocean basins is built from indirect observations. Ships using sonar send sound pulses down and time the echoes from the floor, and thousands of these depth readings are combined into a map of the basin's shape, revealing features like mid-ocean ridges and trenches. Other technologies add different evidence: satellites observe the ocean surface and conditions over whole basins at once, and deep sea submersibles and underwater photography let scientists examine and record specific features up close. Put together, the indirect evidence supports detailed claims about places no one can visit unaided.<br><br><b>Marking points:</b> 1 mark for sonar explained as sound echoes giving depth and shape. 1 mark for a second technology with its contribution (satellites, submersibles, underwater photography or diving). 1 mark for stating that the knowledge is indirect and built by combining evidence.",
      {});
  }
]), ["The puzzle: detailed knowledge of a place no one can see. Which tools supply the evidence?", "Sonar is the mapping tool. Add one more technology and say what it adds."]);

/* ---------- SC8.2.3 How ocean floor technologies improved ---------- */

E("s8-u1-tech-change", 1, ["SC8.2.3"], 2, "var", varset([
  function () {
    return mcq("Early ocean researchers measured depth by lowering a weighted wire line over the side of a ship and noting its length when it reached bottom. Modern ships use sonar instead. What is the main improvement?",
      "Sonar produces a continuous depth record as the ship moves, so a whole basin profile can be mapped rather than single scattered depths",
      ["Sonar works only in shallow coastal water close to shore, where the old wire lines were never able to reach the bottom beneath the ship",
       "Sonar removes the need for a ship at all in depth work, because its signals can be sent out from the shore instead of from a vessel",
       "Wire lines were far more accurate than sonar ever is; sonar is used on ships today only because it is the cheaper of the two methods"],
      "A wire line gives one depth at one spot, slowly. Sonar times sound echoes continuously as the ship travels, producing a running profile of the floor. The improvement is in the amount and continuity of the evidence, which is what turned scattered soundings into basin maps.",
      {});
  }
]), ["Compare what each method delivers: one point at a time, or a continuous record?", "More evidence, gathered faster, is the improvement pattern in this strand."]);

E("s8-u1-tech-improve", 1, ["SC8.2.3"], 1, "var", varset([
  function () {
    return mcq("How have deep sea submersibles improved on diving for ocean research?",
      "Submersibles carry researchers and instruments far deeper and for longer than a diver's body and air supply allow",
      ["Submersibles are smaller, simpler and cheaper than the equipment that divers have to carry with them",
       "Submersibles replaced the need for any surface ship to support the research work done below",
       "Divers can now stay down just as long as submersibles can, using ordinary diving equipment"],
      "Diving is limited by the human body and its air supply, so it serves shallow water. Deep sea submersibles, the technology at the centre of the strand's Undersea Adventure STSE, protect their crews from pressure and carry instruments, opening the deep ocean floor to direct research. The pattern is the same across this indicator: each generation of technology extends where and how long scientists can gather evidence.",
      {});
  }
]), ["What limits a diver? Depth and air. What does a submersible do about those limits?", "Improvement here means reaching places and depths that were closed before."]);

/* ---------- SC8.2.4 Technologies that contain wave and tide damage ---------- */

E("s8-u1-protection", 1, ["SC8.2.4"], 1, "gen", function () {
  var cases = [
    { q: "A harbour builds a wall of rock out in the water, before the wharves, so incoming waves break on it and lose their energy. What is this structure?", k: "A breakwater", w: ["A jetty used as a wharf", "A sea wall built along the beach", "Vegetation planting"] },
    { q: "A community plants grasses and shrubs along its shore so their roots hold the soil against wave wash. Which protection method is this?", k: "Vegetation", w: ["A breakwater", "Boulders placed against the wharf", "A sea wall"] },
    { q: "Workers pile very large boulders against the face of a wharf to absorb the force of storm waves. Which protection method is this?", k: "Large boulders placed against the wharf", w: ["A breakwater", "Coastline reconfiguration", "Vegetation"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Technologies designed to contain damage from waves and tides include breakwaters, jetties and wharves, vegetation, sea walls, coastline reconfiguration, and large boulders placed against wharves. Each either breaks the waves' energy before it lands or holds the shore against it.",
    {});
}, ["Picture where the structure sits: out in the water, along the shore, or living roots in the soil.", "A breakwater stands offshore and takes the wave's energy first."]);

E("s8-u1-protection-choice", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return mcq("A town must protect a beach that is also a nesting area for shorebirds. Engineers compare three plans: a concrete sea wall, a rock breakwater, and restoring the dune grasses that once covered the beach. The town's council asks which plan appears most successful at limiting damage with the least impact on the ecosystem present. Based on the guide's treatment, which answer is best supported?",
      "Restoring the dune vegetation, because living roots hold the shore and absorb wave wash while leaving the habitat in place",
      ["The concrete sea wall, because the hardest structure always has the least environmental impact",
       "The rock breakwater, because any structure placed offshore removes the need to consider the beach itself",
       "None of them, because the guide treats all protection methods as equally damaging"],
      "The guide's comparison activity asks students to identify which method appears most successful with the least environmental impact on the ecosystems present. Vegetation holds soil with living roots, absorbs wave energy gradually and preserves the habitat the birds use. Hard structures protect property but replace or disturb the shoreline ecosystem. The judgement follows from weighing protection and impact together.",
      {});
  }
]), ["The question has two tests: does it limit damage, and what does it do to the ecosystem that is there?", "A living shore can do both jobs; a wall trades habitat for hardness."]);

E("s8-u1-cr-protect", 1, ["SC8.2.4"], 3, "var", varset([
  function () {
    return textq("A small coastal community has a wharf used by fishing boats and a low, gently sloping shore that floods during winter storms. Choose one protection technology for this shore and justify your choice: say how it limits wave or tide damage, and name one drawback the community should weigh. (3 marks)",
      ["a named technology such as breakwater, sea wall, boulders or vegetation", "how it reduces wave energy or holds the shore", "a drawback such as cost, habitat impact or upkeep"],
      "<b>Model answer:</b> A breakwater fits this shore. Built out in the water before the wharf, it forces incoming storm waves to break on the rocks and spend their energy there, so the water reaching the wharf and the low shore is much calmer and flooding and damage are reduced. The drawback to weigh is that a breakwater is expensive to build and maintain, and it changes the water movement along that shore, which can shift where sediment is deposited and affect the shore habitat nearby. (A sea wall, boulders or vegetation, justified in the same pattern, also earns full marks.)<br><br><b>Marking points:</b> 1 mark for a suitable named technology. 1 mark for how it limits the damage (breaks wave energy, holds the shore, or absorbs the wash). 1 mark for a genuine drawback weighed.",
      {});
  }
]), ["Match the technology to this shore: a working wharf and a low flooding slope.", "A complete justification has three parts: the choice, how it works, and its cost."]);

/* ---------- SC8.2.5 Effects of marine technologies ---------- */

E("s8-u1-overfishing", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Fish stocks declined sharply in the decades when factory freezer trawlers spread through the fleet. Which statement best fits the guide's treatment of technology and overfishing?",
      "New technologies have contributed to overfishing: larger vessels, better fish-finding technology and more effective catch methods let fleets take fish faster than stocks can replace them",
      ["Technology reduced overfishing, because freezer trawlers waste less of each catch, so fleets needed to catch far fewer fish to supply the same markets",
       "Overfishing was caused only by the behaviour of the fish themselves changing, and not by any change in fishing technology",
       "Factory freezer trawlers affected only the freshwater fisheries of the inland lakes and rivers of Canada"],
      "The guide limits the discussion to the impact of improved fishing technology: catch methods, fish-finding technology and vessel type. Factory freezer trawlers combine all three, catching and processing huge amounts at sea, and that capability is a recognized contributor to the decline of stocks such as cod.",
      {});
  }
]), ["The guide's focus is narrow here: improved fishing technology. Which option stays on that point?", "Bigger vessels, better finding, better catching: capability grew faster than the stocks."]);

E("s8-u1-invasive", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("The European green crab, a species not native to this province, is now established in Placentia Bay, and the violet tunicate has appeared in Belleoram. Which technology-related route best explains introductions like these?",
      "Oil tankers and other ships release bilge and ballast water carrying foreign organisms into native habitats",
      ["Aquaculture pens release farmed fish into the bay, and those escaped fish turn into crabs and tunicates over time",
       "Factory freezer trawlers carry the new species in their nets as they move from harbour to harbour along the coast",
       "Tidal power turbines carry the organisms through their passages from one bay into another bay nearby"],
      "The guide names this route directly: when oil tankers release their bilge water, foreign species can be introduced, endangering native habitats and organisms. The green crab in Placentia Bay and the violet tunicate in Belleoram are its local examples.",
      {});
  }
]), ["The species arrived by water that ships carry and release. Which water is that?", "Bilge and ballast water move organisms around the world."]);

E("s8-u1-aquaculture", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return mcq("Mussel farms hang long lines of growing mussels in a bay. Which negative effect on the marine environment does the guide describe for this kind of aquaculture?",
      "Increased organic matter, called detritus rain, falls from the farms and accumulates on the sea floor",
      ["The mussels filter so much water as they feed that the salinity of the bay rises sharply within a single year",
       "The long lines block the ocean currents and change the climate of the whole region around the bay",
       "The farms attract factory trawlers into the bay, and the trawlers then overfish the wild stocks living there"],
      "The guide's aquaculture effects include the accidental release of farmed organisms into native populations, the spread of disease, and, for mussel farms specifically, detritus rain: increased organic matter falling and accumulating on the sea floor beneath the farm.",
      {});
  }
]), ["The effect named for mussel farms is about what falls from the farm to the floor.", "Detritus rain is the guide's own term for it."]);

E("s8-u1-cr-tech-effects", 1, ["SC8.2.5"], 2, "var", varset([
  function () {
    return textq("Choose one marine technology from this list: factory freezer trawlers, offshore oil rigs, tidal power, or aquaculture. Describe one positive effect and one negative effect of that technology on ocean species or their environment, and state the balance as you see it. (3 marks)",
      ["a positive effect tied to the technology", "a negative effect tied to the technology", "a stated balance or judgement"],
      "<b>Model answer:</b> Offshore oil rigs. On the positive side, a rig's structure acts as an artificial reef that shelters marine organisms, and the industry funds monitoring of the surrounding ocean. On the negative side, oil spills can kill sea birds and damage ecosystems, drilling scours the ocean floor and destroys marine habitat, and tankers serving the rigs can introduce foreign species in bilge water. On balance the negative effects reach further and last longer than the shelter benefit, so the technology's value depends on strict prevention of spills and habitat damage. (Any listed technology, treated in the same pattern, earns full marks.)<br><br><b>Marking points:</b> 1 mark for a positive effect genuinely tied to the chosen technology. 1 mark for a negative effect genuinely tied to it. 1 mark for a stated balance that follows from the two effects given.",
      {});
  }
]), ["Pick the technology you can say the most about, then keep both effects tied to it.", "The third mark is for the balance: say which side weighs more, from your own two effects."]);

E("s8-u1-offshore", 1, ["SC8.2.5"], 3, "var", varset([
  function () {
    return mcq("A review of an offshore oil project lists four findings. Which finding describes an effect on marine environments that the guide attributes to the offshore oil industry?",
      "Drilling activity scours the ocean floor, destroying marine habitats, and spills can spread oil across the surface",
      ["The project increases upwelling around the rig, which raises the productivity of the whole bay for years",
       "The project's lights attract fish to the waters around the rig, which increases the local catch there",
       "The project lowers the salinity of the ocean water all around the rig and across the nearby bay"],
      "The guide's discussion of the offshore oil industry names pollution including oil spills, and the scouring of the ocean floor destroying marine habitats, with bilge water introductions as a further route of harm. The other findings invent mechanisms the guide does not describe.",
      {});
  }
]), ["Two harms are named in the guide for this industry: one from spills, one from the floor itself.", "Scouring is the floor-damage word to watch for."]);

/* ---------- SC8.2.6 Science cannot resolve every ocean problem ---------- */

E("s8-u1-sustain-aspects", 1, ["SC8.2.6"], 1, "var", varset([
  function () {
    return mcq("A proposal to expand an offshore oil field is debated. One speaker says: 'It would bring well-paying jobs to the region, but a spill could kill sea birds and damage the ecosystem for years.' Which pair of sustainable development aspects is the speaker weighing?",
      "Economic (jobs) against environmental (harm to sea birds and ecosystems)",
      ["Environmental against environmental",
       "Social and cultural against economic",
       "Scientific against technological"],
      "Sustainable development decisions weigh three aspects: environmental, economic, and social and cultural. Jobs are an economic effect; harm to sea birds and ecosystems is an environmental effect. The speaker is weighing exactly the kind of trade-off the guide describes, where a decision rarely satisfies every aspect at once.",
      {});
  }
]), ["Sort the two consequences: jobs belong to one aspect, sea birds to another.", "The three aspects are environmental, economic, and social and cultural."]);

E("s8-u1-cr-decision", 1, ["SC8.2.6"], 3, "var", varset([
  function () {
    return textq("A company proposes a new aquaculture development in a bay that also supports a small inshore fishery and a community that values its traditional way of life. Lay out the decision the way the guide frames such decisions: give one possible positive effect and one possible negative effect, covering different aspects of sustainable development, state your recommendation, and explain why scientific and technological knowledge alone cannot settle the question. (4 marks)",
      ["a positive effect in one aspect, such as economic jobs", "a negative effect in another aspect, such as environmental or social and cultural", "a clear recommendation", "science informs the decision but values and compromise decide it"],
      "<b>Model answer:</b> Positively, the development could bring steady jobs and income to the community (economic). Negatively, escaped farmed fish and disease could harm the wild stocks the inshore fishery depends on, and increased organic matter could accumulate on the bay's floor (environmental), while a changed bay could alter the community's traditional way of life (social and cultural). My recommendation is to allow a smaller development with strict containment and monitoring, because that weighs the jobs against protections for the fishery. Scientific and technological knowledge can measure the risks and design the safeguards, but it cannot decide how much risk to the fishery and the way of life is worth the jobs: that weighing of pros and cons is a decision for the stakeholders, and it will not satisfy everyone.<br><br><b>Marking points:</b> 1 mark for a positive effect placed in its aspect. 1 mark for a negative effect placed in a different aspect. 1 mark for a clear recommendation that follows from the effects given. 1 mark for explaining that science informs but cannot settle the decision, because it rests on weighing values and compromise.",
      {});
  }
]), ["Structure it as the guide does: effects first, in different aspects, then the decision, then the limit of science.", "Four parts, four marks: positive, negative, recommendation, and why science alone cannot decide."]);

/* ---------- SC8.3.1 Core Lab 1-2B: carrying out the salinity procedure ---------- */

E("s8-u1-lab-procedure", 1, ["SC8.3.1"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 1-2B, a student investigates how salinity affects water density by adding drops of coloured fresh water to a container of salt water. Which procedure step is correct?",
      "Add the drops gently at the surface and observe where the coloured water settles before any stirring",
      ["Stir the container briskly after each drop so the two waters mix evenly through the container",
       "Pour the fresh water in quickly from a height so that it plunges straight down to the bottom",
       "Heat the salt water first so the fresh water spreads evenly through the whole container at once"],
      "The lab investigates how fresh and salt water interact when they meet. The coloured fresh water must be added gently and observed as it settles: it stays near the top, because fresh water is less dense than salt water. Stirring, pouring hard or heating would destroy the very layering the procedure is meant to reveal.",
      {});
  }
]), ["The lab's whole point is watching where the fresh water settles. Which step protects that observation?", "Anything that mixes the waters ruins the investigation."]);

E("s8-u1-lab-extension", 1, ["SC8.3.1"], 2, "var", varset([
  function () {
    return mcq("Core Lab 1-2B ends by extending the result to environments where fresh water and ocean water meet. In an estuary, where river water flows into the ocean, what arrangement should the lab's result predict?",
      "The less dense fresh water from the river rides over the denser salt water it meets",
      ["The denser fresh water sinks down beneath the salt water that it meets in the estuary",
       "The two waters always mix instantly into one single uniform layer from top to bottom",
       "The salt water floats on top of the fresh water because it is the warmer of the two"],
      "The lab's finding is that fresh water, being less dense, floats on salt water. Extended to an estuary, the river's fresh water rides over the ocean's salt water where they meet, which is part of what makes estuaries layered, productive environments.",
      {});
  }
]), ["Carry the lab result outdoors: same two waters, now a river meeting the ocean.", "Less dense water stays on top, in the lab and in the estuary."]);

E("s8-u1-cr-design-salinity", 1, ["SC8.3.1"], 3, "var", varset([
  function () {
    return textq("Design an investigation to test how salinity affects the density of water. Your plan must state the question you are testing, the variable you will change, the variables you will keep the same, what you will observe or measure, and how your observations will let you draw a conclusion. (4 marks)",
      ["testable question about salinity and density", "salinity changed while volume and temperature stay the same", "observe where each sample settles or whether an object floats higher", "conclusion drawn from comparing the samples"],
      "<b>Model answer:</b> Question: how does increasing the salinity of water affect its density? Prepare three samples of water with different measured amounts of salt dissolved (for example none, a moderate amount, and a large amount), keeping the volume of each sample and its temperature the same. Add drops of coloured water of one fixed salinity gently to each sample, or float the same object in each, and observe where the drops settle or how high the object floats. If the drops settle lower, or the object floats lower, in the less salty samples, the conclusion follows: increasing salinity increases density, because the saltier water supports the added water or object higher up.<br><br><b>Marking points:</b> 1 mark for a testable question naming salinity and density. 1 mark for salinity as the changed variable. 1 mark for at least two variables held the same (volume, temperature, the object or drop used). 1 mark for observations that connect to the conclusion (settling level or floating height compared across samples).",
      {});
  }
]), ["Plan it like the core lab: question, changed variable, kept variables, observations, conclusion.", "Four parts earn the four marks. Do not skip the variables you keep the same."]);

/* ---------- SC8.3.2 Using tools and apparatus safely ---------- */

E("s8-u1-safe-practice", 1, ["SC8.3.2"], 1, "var", varset([
  function () {
    return mcq("During the water health test, a student is about to carry a full container of pond water and a glass thermometer across the room. Which choice is the safe practice?",
      "Carry the container with two hands, walk slowly, and keep the thermometer in its case until it is needed at the bench",
      ["Carry the container in one hand and the thermometer in the other hand to save making a second trip",
       "Run the sample back to the bench as quickly as possible so the readings can be taken sooner",
       "Hold the thermometer by its bulb while walking across the room so it warms up ready for use at the bench"],
      "Safe tool use in this strand's labs means protecting both the student and the instruments: two hands for a full container, a slow walk, and glass instruments like thermometers kept protected until they are used at the bench. The bank carries this one entry on safe practice; safe handling itself is assessed in the classroom.",
      {});
  }
]), ["Think about what could spill or break, and choose the option that prevents both.", "Two hands, slow pace, glass kept in its case."]);

/* ---------- SC8.3.3 Interpreting trends in data ---------- */

E("s8-u1-health-figure", 1, ["SC8.3.3"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows dissolved oxygen measured at four sites along a river. Water that supports fish well holds dissolved oxygen of 5 mg/L or greater, shown by the dashed line. Which site falls below that healthy level?",
      "Site C",
      ["Site A", "Site B", "Site D"],
      "Reading the bars against the dashed 5 mg/L line: Sites A, B and D sit above it, while Site C's bar reaches only about 3.5 mg/L, below the level that supports fish well. Interpreting data means comparing values with the standard that gives them meaning.",
      {});
    q.figure = s8HealthSVG([{ name: "Site A", value: 8.2 }, { name: "Site B", value: 6.4 }, { name: "Site C", value: 3.5 }, { name: "Site D", value: 7.1 }], "Dissolved oxygen", "mg/L", 5);
    return q;
  },
  function () {
    var q = mcq("The graph shows dissolved oxygen measured at four ponds. Water that supports fish well holds dissolved oxygen of 5 mg/L or greater, shown by the dashed line. Which pond has the healthiest dissolved oxygen level?",
      "Pond W",
      ["Pond X", "Pond Y", "Pond Z"],
      "All four ponds are compared against the same dashed line at 5 mg/L. Pond W's bar is the highest, at about 9 mg/L, comfortably above the healthy threshold. The skill is reading each value against the standard, not just picking the longest bar without checking the line.",
      {});
    q.figure = s8HealthSVG([{ name: "Pond W", value: 9 }, { name: "Pond X", value: 5.8 }, { name: "Pond Y", value: 4.2 }, { name: "Pond Z", value: 6.6 }], "Dissolved oxygen", "mg/L", 5);
    return q;
  }
]), ["Compare every bar with the dashed threshold line, not just with each other.", "The dashed line is the standard: 5 mg/L."]);

E("s8-u1-data-relationship", 1, ["SC8.3.3"], 3, "var", varset([
  function () {
    return mcq("A class measures a pond through the summer. In June the water is 12 degrees Celsius and holds 9.5 mg/L of dissolved oxygen. In July it is 18 degrees and holds 8.1 mg/L. In August it is 24 degrees and holds 6.8 mg/L. Which statement correctly interprets the trend in this data?",
      "As the water temperature increased, the dissolved oxygen decreased: warmer water holds less dissolved oxygen",
      ["As the water temperature increased through the summer, the dissolved oxygen increased in step with it",
       "Temperature and dissolved oxygen stayed in a fixed total added together all through the summer",
       "The data show no relationship at all, because three measurements are too few to read a trend from"],
      "Reading the pairs in order: 12 degrees with 9.5 mg/L, 18 with 8.1, 24 with 6.8. Each temperature rise comes with an oxygen fall, a consistent inverse trend. That is the relationship the guide uses in its own example chain: warmer water holds less dissolved oxygen.",
      {});
  }
]), ["Pair each temperature with its oxygen value and read the pairs in order.", "Both numbers move every month. Do they move together or in opposite directions?"]);

/* ---------- SC8.3.4 Communicating questions and results ---------- */

E("s8-u1-conclusion-statement", 1, ["SC8.3.4"], 1, "var", varset([
  function () {
    return mcq("A student must write the result of the salinity investigation in her notes in one clear sentence. Which sentence communicates the result best?",
      "The coloured fresh water floated on the salt water, showing fresh water is less dense than salt water",
      ["The lab was interesting and the water did what we thought",
       "We put drops in and watched them for a while",
       "Salt water and fresh water are both water, so the lab showed they are the same"],
      "Communicating a result means stating what was observed and what it shows, in one sentence a reader who missed the lab can use. The first option reports the observation (the fresh water floated) and the conclusion it supports (fresh water is less dense). The others are vague, or contradict the observation.",
      {});
  }
]), ["A good result sentence has two parts: what was seen, and what it shows.", "Vague sentences and contradicted sentences both fail the reader."]);

E("s8-u1-cr-results-summary", 1, ["SC8.3.4"], 2, "var", varset([
  function () {
    return textq("A group tested four samples from a stream for the water health lab. Their results: dissolved oxygen 7.8 mg/L; phosphates 6 micrograms per litre; pH 6.4; the water was slightly cloudy. Healthy ranges from the lab: dissolved oxygen 5 mg/L or greater; phosphates less than 10 micrograms per litre; pH between 5 and 8.5. Write a short results summary for the group's report: state each result against its healthy range and give the overall conclusion. (3 marks)",
      ["each measurement compared with its healthy range", "all three measured factors within range", "overall conclusion that the stream water is healthy, with the cloudiness noted"],
      "<b>Model answer:</b> The dissolved oxygen, 7.8 mg/L, is above the healthy minimum of 5 mg/L. The phosphates, 6 micrograms per litre, are below the healthy limit of 10. The pH, 6.4, sits inside the healthy range of 5 to 8.5. The water was slightly cloudy, a turbidity observation worth noting. Overall, all three measured factors fall within their healthy ranges, so the results support the conclusion that this stream water is in healthy condition for the species tested.<br><br><b>Marking points:</b> 1 mark for at least two measurements stated against their healthy ranges. 1 mark for the third measurement and the turbidity observation included. 1 mark for an overall conclusion that follows from the comparisons.",
      {});
  }
]), ["A results summary compares, it does not just list. Put every number beside its healthy range.", "Finish with the overall conclusion the comparisons support."]);

/* ---------- SC8.3.5 Stating a conclusion about salinity and density ---------- */

E("s8-u1-lab-conclusion", 1, ["SC8.3.5"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 1-2B, coloured fresh water added gently to salt water stays in a layer near the top instead of mixing or sinking. Which conclusion about salinity and density does this observation support?",
      "Increasing salinity increases density, so the less salty fresh water floats on the denser salt water",
      ["Increasing salinity decreases density, so the fresh water floats because it is denser",
       "Salinity has no effect on density; the colouring holds the fresh water up",
       "Fresh water and salt water have equal density, and the layer is temporary"],
      "The stated conclusion of the core lab: salinity affects density. Dissolved salt makes water denser, so fresh water added gently to salt water floats on top of it. The layering is the evidence; the density difference is the conclusion.",
      {});
  }
]), ["The observation is layering. Which density arrangement produces layering with fresh water on top?", "The water that floats is the less dense one."]);

E("s8-u1-conclusion-judge", 1, ["SC8.3.5"], 2, "var", varset([
  function () {
    return mcq("A student floats the same wooden block in three tanks: fresh water, slightly salty water, and very salty water. The block floats lowest in fresh water and highest in the very salty water. Which conclusion is supported by these observations?",
      "As salinity increases, density increases, so the block is supported higher in saltier water",
      ["As salinity increases, the block itself becomes lighter, so it floats higher in the tank",
       "The block floats higher in the salt water simply because salt water is always the warmer water",
       "No conclusion is possible from the test, because the block was not weighed before it was floated"],
      "The same block, with the same mass, floats at different heights, so the difference must be in the water. Floating higher means the water is supporting it more strongly, which is what greater density does. The observations support the conclusion that salinity increases density, the same conclusion as the core lab, reached by a different observation.",
      {});
  }
]), ["The block never changes. What changes from tank to tank, and what must it be doing?", "Floating height is the evidence; density is the explanation."]);

/* ---------- SC8.3.6 Selecting methods and tools ---------- */

E("s8-u1-tool-choice", 1, ["SC8.3.6"], 1, "var", varset([
  function () {
    return mcq("For the water health test, a group must measure how cloudy a pond sample is, since turbidity is one of the abiotic factors being checked. Which tool choice fits the job?",
      "A turbidity tube or disc, which measures how far light penetrates the sample",
      ["A thermometer, read carefully in the shade at the edge of the pond beside the sample",
       "A pH test kit, used twice on the same sample to be sure of the cloudiness reading",
       "A dissolved oxygen meter, set over to its cloudiness scale to read the pond sample"],
      "Selecting a tool means matching it to the quantity being measured. Turbidity is cloudiness, the blocking of light by suspended particles, so it is measured by how far light or a marked disc can be seen through the water. Thermometers measure temperature, pH kits measure acidity, and oxygen meters measure dissolved oxygen.",
      {});
  }
]), ["Match the tool to the quantity: turbidity is about light getting through water.", "Each of the other tools measures a different factor in the same lab."]);

E("s8-u1-method-choice", 1, ["SC8.3.6"], 2, "var", varset([
  function () {
    return mcq("A class is asked to judge the water health of a whole pond, not just one spot. Which method gives the most trustworthy picture?",
      "Take samples at several locations around and across the pond and average the results for each factor",
      ["Take one sample at the easiest point to reach and test it very carefully",
       "Sample only where the water looks dirtiest, since that is where problems would show",
       "Ask a student who swims in the pond to describe the water"],
      "A pond is not uniform: inlets, shade, depth and vegetation change conditions from place to place. Sampling several locations and averaging gives a picture of the whole pond and protects the conclusion from one unusual spot. Careful testing of a single convenient sample still describes only that sample.",
      {});
  }
]), ["The question is about the whole pond. Which method actually covers the whole pond?", "One careful sample is still one sample."]);

/* ---------- SC8.3.7 Interpreting patterns and inferring relationships ---------- */

E("s8-u1-pattern-infer", 1, ["SC8.3.7"], 2, "var", varset([
  function () {
    return mcq("Surveys of a bay over ten years show that in years when upwelling was strong, the catch of capelin was high, and in years when upwelling was weak, the catch was low. Which inference is best supported by this pattern?",
      "Strong upwelling supports larger capelin populations, because the upwelled water brings nutrients that feed the plankton capelin eat",
      ["Capelin themselves cause the upwelling along the coast in the years when their numbers are plentiful in the bay and the catch is high",
       "The pattern proves that fishing boats simply catch more capelin in any year they choose to go out to sea more often and stay out longer",
       "Upwelling and capelin catches in the bay are unrelated to each other, because the survey data cover only ten years of the bay's history"],
      "The pattern repeats across ten years in the same direction, which supports an inference, and the mechanism is known: upwelling delivers nutrient-rich water, nutrients feed plankton, and capelin feed on plankton. An inference pairs the observed pattern with a mechanism that explains it.",
      {});
  }
]), ["A repeating pattern plus a known mechanism makes an inference. Look for the option that has both.", "Capelin eat plankton. What feeds the plankton?"]);

E("s8-u1-relationship-explain", 1, ["SC8.3.7"], 3, "var", varset([
  function () {
    return mcq("Along a coastline, the bays with the most reliable upwelling also have the densest populations of seabirds, even though the birds nest on land. Which explanation best accounts for the whole pattern?",
      "Upwelling brings nutrients to the surface, plankton flourish, fish gather to feed on the plankton, and the seabirds feed on the fish, so the birds concentrate where the chain begins",
      ["Seabirds prefer the smell of the cold upwelled water rising along the coast and gather in dense flocks along those bays for that reason alone, season after season",
       "Upwelling cools the layer of air above the bay, and seabirds of every kind choose to nest along the stretches of coast wherever the air above the water is coolest",
       "The pattern is only a coincidence in the survey results, because birds that nest on cliffs on land cannot possibly be connected to any processes taking place in the ocean"],
      "Explaining a pattern means tracing the relationship through every link. Upwelling supplies nutrients; nutrients grow plankton; plankton draws fish; fish feed the birds. The birds' distribution on land is the far end of a chain that starts with a water movement, which is the kind of relationship this strand's data work is meant to surface.",
      {});
  }
]), ["The birds are two steps removed from the water. Build the chain link by link.", "Nutrients, plankton, fish, birds: each link feeds the next."]);

/* ---------- SC8.3.8 Reporting on abiotic factors and evaluating processes ---------- */

E("s8-u1-threshold-judge", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return mcq("A freshwater sample from Core Lab 3-3B gives these results: dissolved oxygen 4.1 mg/L, phosphates 6 micrograms per litre, pH 6.8. Healthy ranges: dissolved oxygen 5 mg/L or greater; phosphates less than 10 micrograms per litre; pH 5 to 8.5. Which judgement is correct?",
      "The dissolved oxygen is below its healthy range, while phosphates and pH are within theirs, so the water may not support fish well",
      ["All three factors are within their healthy ranges, so the sample shows the water is healthy for fish",
       "The phosphates are above their healthy limit, and that is the main problem shown by this water sample",
       "The pH is outside its healthy range, and that is the main problem shown by this sample of water"],
      "Compare each value with its range. Dissolved oxygen 4.1 mg/L is below the 5 mg/L minimum. Phosphates at 6 are under the limit of 10, and pH 6.8 sits inside 5 to 8.5. Only the oxygen fails, and low oxygen is what limits the fish the water can support.",
      {});
  }
]), ["Judge the three values one at a time against their ranges before choosing.", "Only one of the three values misses its range. Find it."]);

E("s8-u1-cr-pond-data", 1, ["SC8.3.8"], 2, "var", varset([
  function () {
    return textq("A class reports on a pond using Core Lab 3-3B. Results: dissolved oxygen 3.8 mg/L (healthy: 5 or greater); phosphates 14 micrograms per litre (healthy: less than 10); pH 6.1 (healthy: 5 to 8.5); the water was noticeably cloudy after rain. Write the group's findings: identify each factor that falls outside its healthy range, and explain what the combined results suggest about the pond's ability to support fish and water plants. (3 marks)",
      ["dissolved oxygen and phosphates outside their ranges, pH within", "low oxygen limits fish", "phosphate-fed algae and turbidity reduce light for plants"],
      "<b>Model answer:</b> Two factors fall outside their healthy ranges. Dissolved oxygen, at 3.8 mg/L, is below the healthy minimum of 5 mg/L, so the pond may not support fish well. Phosphates, at 14 micrograms per litre, are above the healthy limit of 10, which feeds excess algae growth. The pH, 6.1, is within its healthy range. Together with the cloudiness after rain (turbidity blocking light), the results suggest a pond under stress: fish are limited by low oxygen, and water plants are squeezed by both the turbidity and the algae the phosphates feed.<br><br><b>Marking points:</b> 1 mark for identifying dissolved oxygen and phosphates as outside their ranges and pH as within. 1 mark for the consequence for fish (low oxygen). 1 mark for the consequence for plants (light reduced by turbidity and phosphate-fed algae).",
      {});
  }
]), ["Report factor by factor first, then combine them into the pond's overall picture.", "Two factors fail their ranges. The conclusion connects them."]);

E("s8-u1-process-evaluate", 1, ["SC8.3.8"], 3, "var", varset([
  function () {
    return mcq("A group evaluated its water health investigation afterwards. Their plan had been: one sample, taken at the pond's edge on one afternoon, tested once for each factor. Their report concluded the whole pond was unhealthy because the oxygen reading was low. Which evaluation of their process is most accurate?",
      "The process was too weak for the conclusion: a single edge sample on one day cannot represent the whole pond, and one low reading should have been checked with repeat samples before concluding",
      ["The process was sound from start to finish and needs no improvement, because they used the correct test for each factor and recorded each result carefully in their lab notebooks",
       "The only weakness in their whole process was that they took the sample in the afternoon rather than in the morning of the same day, when the pond's oxygen level might have read differently",
       "The process itself was weak in only one way that matters: they wrote the conclusion too confidently for the single set of readings they had taken at the pond on that one afternoon"],
      "Evaluating a process means judging whether the plan could support the conclusion drawn from it. One sample from one edge on one day describes that spot at that moment, not the whole pond, and a single surprising reading calls for repeats. The tests themselves were right; the sampling plan and the leap to a whole-pond conclusion were the weaknesses.",
      {});
  }
]), ["Judge the plan against the conclusion's size: one sample, whole pond.", "Correct tests cannot rescue an unrepresentative sample."]);

/* ---------- SC8.3.9 Population graphs: interpolate and extrapolate ---------- */

E("s8-u1-pop-interpolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows counts of a marine species in a bay, taken every two years. Estimate the count in 2021, a year between measurements.",
      "About 185",
      ["About 160", "About 210", "About 240"],
      "Interpolating means estimating between known points. The 2020 count is 160 and the 2022 count is 210, so 2021 falls between them, at about their midpoint, 185. Reading off a measured year (160 or 210) is not an interpolation.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [120, 160, 210, 250], "Individuals counted");
    return q;
  },
  function () {
    var q = mcq("The graph shows counts of a marine species in a bay, taken every two years. Estimate the count in 2023, a year between measurements.",
      "About 175",
      ["About 150", "About 160", "About 200"],
      "The 2022 count is 150 and the 2024 count is 200. The in-between year, 2023, is estimated at about the midpoint, 175. That is interpolation: estimating a value inside the measured range.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [90, 130, 150, 200], "Individuals counted");
    return q;
  }
]), ["The wanted year sits between two measured years. Its value sits between their values too.", "Take the midpoint of the two neighbouring counts."]);

E("s8-u1-pop-extrapolate", 1, ["SC8.3.9"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows a marine species count rising steadily from 2019 to 2023. If the trend continues at the same rate, what is the best prediction for 2024?",
      "About 250",
      ["About 220", "About 235", "About 280"],
      "The counts rise by about 30 each year: 100, 130, 160, 190, 220. Extrapolating continues the pattern one step beyond the data, giving about 250 for 2024. Extrapolation assumes the trend continues, which is why it is a prediction, not a reading.",
      {});
    q.figure = s8PopGraphSVG([2019, 2020, 2021, 2022, 2023], [100, 130, 160, 190, 220], "Individuals counted");
    return q;
  },
  function () {
    var q = mcq("The graph shows a marine species count falling steadily from 2019 to 2023. If the trend continues at the same rate, what is the best prediction for 2024?",
      "About 150",
      ["About 120", "About 180", "About 200"],
      "The counts fall by about 30 each year: 300, 270, 240, 210, 180. Continuing the trend one more year gives about 150. That is extrapolation: extending the pattern beyond the measured years.",
      {});
    q.figure = s8PopGraphSVG([2019, 2020, 2021, 2022, 2023], [300, 270, 240, 210, 180], "Individuals counted");
    return q;
  }
]), ["Find the yearly step in the data, then take one more step of the same size.", "Extrapolation extends the trend; it does not repeat the last value."]);

E("s8-u1-cr-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    var q = textq("The graph shows counts of a marine species in a bay, taken every two years from 2018 to 2024. (a) Interpolate: estimate the count in 2021. (b) Extrapolate: predict the count in 2026 if the trend continues. (c) State the assumption your prediction depends on. (3 marks)",
      ["2021 about 130, between 110 and 150", "2026 about 230, continuing the increase of about 40 every two years", "the prediction assumes conditions and the trend stay the same"],
      "<b>Model answer:</b> (a) The 2020 count is 110 and the 2022 count is 150, so the 2021 count is estimated between them, at about 130. (b) The counts rise by about 40 every two years (80, 110, 150, 190, with the two-year steps 30, 40, 40), so continuing the trend gives about 230 in 2026. (c) The prediction assumes the conditions driving the increase stay the same: if food, predators, fishing pressure or water conditions change, the trend can break, which is why an extrapolation is a prediction rather than a measurement.<br><br><b>Marking points:</b> 1 mark for an interpolation of about 130 (accept 125 to 135). 1 mark for an extrapolation of about 230 (accept 220 to 240) from the trend. 1 mark for the assumption that conditions and the trend continue unchanged.",
      {});
    q.figure = s8PopGraphSVG([2018, 2020, 2022, 2024], [80, 110, 150, 190], "Individuals counted");
    return q;
  }
]), ["Part (a) reads between points; part (b) extends the pattern; part (c) names what could break it.", "The two-year steps in the counts are your guide for both estimates."]);

E("s8-u1-temp-population", 1, ["SC8.3.9"], 3, "var", varset([
  function () {
    return mcq("A class plots two graphs for the same bay over eight years: average summer water temperature, rising steadily, and the population of a cold-water fish species, falling steadily. They also know fishing pressure stayed about the same. Which suggestion best fits the guide's approach to relating the graphs?",
      "The rising temperature is a reasonable suggested cause of the decline, because warmer water holds less dissolved oxygen, but the graphs alone show a relationship, not proof, and other changing factors should be checked",
      ["The two graphs together prove that the temperature rise caused the decline outright, so no other changing factor in the bay needs to be checked before concluding",
       "No relationship can ever be suggested from the graphs, because the two graphs measure different things, and different measures can never be compared in a useful way",
       "The decline in the fish population must itself have caused the temperature of the bay to rise, since the population graph falls steadily as the temperature graph rises over the same years"],
      "Comparing population graphs with temperature graphs and suggesting possible relationships is exactly the activity the guide sets. The suggestion gains strength from a mechanism, warm water holding less oxygen, and from fishing pressure being steady. But two trends moving together show a relationship, not proof: an honest suggestion names the mechanism and keeps the door open to other factors.",
      {});
  }
]), ["A suggested relationship needs two things: a mechanism, and honesty about what graphs cannot prove.", "The guide's own example chain runs through dissolved oxygen."]);

/* ---------- SC8.3.10 Strengths and weaknesses of ocean floor technologies ---------- */

E("s8-u1-tech-strength", 1, ["SC8.3.10"], 2, "var", varset([
  function () {
    return mcq("Which pairing gives a genuine strength and a genuine weakness of sonar for investigating the ocean floor?",
      "Strength: it maps the floor's shape across whole basins from a moving ship. Weakness: it shows shape, not what the floor is made of or what lives there",
      ["Strength: it photographs organisms living in total darkness. Weakness: it works only in shallow coastal water",
       "Strength: it carries researchers down to the floor itself. Weakness: it endangers its crew while working at great depth",
       "Strength: it measures the temperature of the water at any depth. Weakness: it cannot detect the ocean floor at all"],
      "Judging a technology means pairing what it does well with what it cannot do. Sonar's strength is coverage: continuous depth readings from a moving ship become basin maps. Its weakness is that echoes give shape only; composition and life on the floor need other technologies, such as sampling, photography and submersibles.",
      {});
  }
]), ["Check each half of the pairing separately: is the strength real, and is the weakness real?", "Sonar gives shape. It does not give composition or life."]);

E("s8-u1-tech-weakness", 1, ["SC8.3.10"], 1, "var", varset([
  function () {
    return mcq("Deep sea submersibles transformed ocean floor research, but they have a real limitation. Which statement names it?",
      "They are expensive, carry only a few people, and can stay at depth for a limited time, so they sample only tiny parts of the floor",
      ["They cannot descend below the edge of the continental shelf into the deep ocean basin beyond it",
       "They disturb the water around them so much that sonar cannot be used anywhere near them during a dive",
       "They can work only on days when the surface of the ocean is completely calm from shore to shore"],
      "Submersibles reach the deep floor directly, which no other technology does with people aboard, but each dive is costly, brief and small in crew and coverage. That is why they complement rather than replace wide-coverage tools like sonar: the strength of one covers the weakness of the other.",
      {});
  }
]), ["The limitation is about scale: cost, crew and time, not about whether the technology works.", "A submersible visits a tiny patch of floor at a time."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE = {
  "s8-u1-cr-design-salinity": true
};
BANK.forEach(function (e) { if (NO_COMPOSE[e.id]) { e.noCompose = true; } });
