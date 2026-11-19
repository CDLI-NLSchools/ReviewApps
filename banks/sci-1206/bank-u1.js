// CRMARKS: sci-u1-cr-climate=4
// CRMARKS: sci-u1-cr-frontpass=3
// CRMARKS: sci-u1-cr-forecast=3
// Science 1206 Unit 1 bank: Weather Dynamics (SC10.6.1 to 6.5, plus
// the SC10.5 STSE tranche added Nov 19, 2026 at the end of this file).
// Original entries written for this app from the question types in
// the source analysis (heat sinks, heat transfer, currents, weather
// systems, meteorological data). Synoptic map reading items live in
// bank-u1-maps.js (approved prototype v3, Nov 12, 2026); the unit's
// other diagram types are front symbols, the wind belt diagram and
// generated data records (s6WxSeries in bank-helpers.js).

/* ---------- SC10.6.1 Heat sinks ---------- */

E("sci-u1-heatsink-def", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Why is the ocean described as a heat sink for coastal regions?",
      "It absorbs and stores large amounts of heat and releases it slowly",
      ["It reflects almost all of the Sun's energy back into space", "It produces its own heat through currents", "It blocks heat from reaching the land"],
      "A heat sink absorbs and stores heat. Water has a high heat capacity, so the ocean soaks up a great deal of solar energy in summer and gives it back slowly, moderating the climate of nearby land. The ocean does not make its own heat, and reflection is the albedo idea, not storage.", {});
  },
  function () {
    return mcq("Which property of water makes the oceans effective heat sinks?",
      "Water heats up and cools down slowly compared with land",
      ["Water is always warmer than the land beside it", "Water reflects more sunlight than any land surface", "Water stops moving once it has absorbed heat"],
      "Water's high specific heat capacity means it takes a lot of energy to change its temperature, so oceans warm and cool slowly and store heat in between. Water is not always warmer than land: in summer the land is usually warmer.", {});
  },
  function () {
    return mcq("The hydrosphere and atmosphere act as heat sinks mainly because they",
      "absorb, store and transport solar energy around the planet",
      ["prevent solar energy from reaching Earth's surface", "convert solar energy directly into wind", "keep every region at the same temperature"],
      "Oceans and air absorb solar energy, store it, and move it through currents and winds, evening out temperatures between regions. They do not block the energy or erase temperature differences completely.", {});
  }
]), ["Think about what a sink does: it takes something in and holds it. Which option has the ocean taking in and holding heat?"]);

E("sci-u1-specific-heat", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("Two towns sit at the same latitude. Town A is on the coast and Town B is 300 km inland. In January, Town A's average temperature is -2 °C and Town B's is -14 °C. The best explanation is that",
      "the ocean stores summer heat and releases it through the fall and winter, keeping the coast milder",
      ["the coast receives more direct sunlight in winter than the interior because its skies stay clearer", "ocean water freezes along the shore and gives off heat to the air above it steadily all winter long", "winds blow only from the ocean toward Town A and never carry cold continental air across the coastal town at all"],
      "At the same latitude both towns receive the same sunlight. The difference is storage: the ocean absorbed heat all summer and releases it slowly, so the coastal town stays milder. The inland town, surrounded by land that cools quickly, gets much colder.", {});
  },
  function () {
    return mcq("On a summer afternoon, the sand at a beach is too hot to walk on while the ocean water beside it is still cool. This happens because",
      "land has a lower specific heat capacity than water, so the sand's temperature rises faster",
      ["the Sun shines more strongly on the sand than on the water beside it through the whole afternoon", "the water reflects all of the Sun's energy back to the sky, so none of it warms the surface", "the sand absorbs heat from sunlight while the water absorbs none of the energy reaching it"],
      "Both surfaces receive the same sunlight. Sand (land) heats quickly because it takes little energy to raise its temperature; water needs much more energy for the same rise, so it stays cool. Both absorb energy: the difference is how much their temperatures change.", {});
  },
  function () {
    return mcq("A coastal city and an inland city have the same summer daytime high of 24 °C. At midnight the coastal city is at 19 °C and the inland city is at 11 °C. The coastal city cools less overnight because",
      "the nearby ocean releases stored heat, slowing the cooling of the air above the coast",
      ["the ocean produces its own heat during the night through currents under the surface", "clouds never form over coastal cities at night, so warm air stays over the coast", "the land near the coast cannot lose any heat at night because its soil traps it"],
      "The ocean stored heat during the day (and the season) and gives it back slowly at night, so coastal air cools less. Land stores little heat, so the inland city radiates its heat away and cools quickly.", {});
  },
  function () {
    return mcq("Which statement correctly compares how land and water respond to the same amount of added heat?",
      "The land's temperature rises more than the water's temperature",
      ["The water's temperature rises more than the land's temperature", "Both rise by exactly the same amount", "Neither changes temperature; the heat only drives currents"],
      "Water's specific heat capacity is much higher than land's, so the same energy input produces a smaller temperature change in water. This single fact drives coastal moderation, sea breezes and much of the weather in this unit.", {});
  }
]), ["Compare the two places: what is different about the surface beside each one, and how does that surface handle stored heat?"]);

E("sci-u1-heatsink-app", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("St. John's often has its warmest weather in late August and September, weeks after the longest day. The main reason is that",
      "the Atlantic Ocean takes all summer to warm up and keeps releasing heat into the fall",
      ["Earth is closest to the Sun in September, so sunlight reaching the island is strongest then", "the Labrador Current stops flowing in the fall, so cold water no longer reaches the coast", "daylight lasts longer in September than in June, so the ground gets more heating each day"],
      "The ocean is a slow heat store. It lags the seasons: still cold in spring, still warm in early fall. Day length peaks in June, so sunlight alone cannot explain a September warm peak.", {});
  },
  function () {
    return mcq("Gardeners near a large lake can often grow plants that would be killed by early frost a short distance inland. The lake helps because it",
      "releases stored heat at night and in the fall, keeping nearby air a few degrees warmer",
      ["reflects extra sunlight onto the plants in the evening, warming the beds after sunset", "stops frost from forming anywhere in the whole region, including fields far inland", "raises the altitude of the shoreline so gardens sit above the cold air settling inland"],
      "The lake's stored heat leaks back into the air during cool nights, delaying the first frost near shore. The effect is a few degrees and local; it does not prevent frost across the whole region.", {});
  },
  function () {
    return mcq("Why do weather forecasters treat the ocean surface temperature as important for predicting a coastal storm's strength?",
      "The ocean is the stored-energy source the storm draws its heat and moisture from",
      ["The ocean surface blocks storms from forming", "Storms are pushed only by the temperature of the land", "Ocean temperature determines the direction of the jet stream"],
      "Storms over water feed on the heat stored in the surface ocean and the moisture evaporating from it. Warm stored water means more available energy, which is why forecasters track it.", {});
  }
]), ["Look for the heat storage idea: slow warming, slow cooling, heat given back later."]);

E("sci-u1-albedo", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Albedo is a measure of",
      "the fraction of incoming sunlight a surface reflects",
      ["the heat a surface stores overnight", "the temperature a surface reaches at noon", "the amount of water vapour above a surface"],
      "Albedo is reflectivity: fresh snow reflects most incoming sunlight (high albedo), while dark ocean water absorbs most of it (low albedo). It is about reflection, not storage or temperature directly.", {});
  },
  function () {
    return mcq("Which surface has the highest albedo?",
      "Fresh snow",
      ["Open ocean water", "A dark asphalt parking lot", "A green forest"],
      "Fresh snow reflects up to about 80 to 90 percent of incoming sunlight. Ocean water, asphalt and forest are all dark surfaces that absorb most sunlight, so their albedos are low.", {});
  },
  function () {
    return mcq("A dark roof and a white roof receive the same sunlight on a summer day. The dark roof becomes much hotter because it has",
      "a lower albedo, so it absorbs more of the sunlight",
      ["a higher albedo, so it absorbs more of the sunlight", "a lower albedo, so it reflects more of the sunlight", "a higher albedo, so it reflects more of the sunlight"],
      "Low albedo means little reflection and much absorption, so the dark roof heats up. The two options that pair low albedo with reflection, or high albedo with absorption, contradict the meaning of the term.", {});
  }
]), ["Albedo is about reflection. Which surface sends the most sunlight back?"]);

E("sci-u1-albedo-effect", 1, ["SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("As Arctic sea ice melts, more dark ocean water is exposed. This speeds up further warming because the exposed water",
      "has a lower albedo than the ice, so it absorbs more sunlight and warms, melting still more ice",
      ["has a higher albedo than the ice, so it reflects more sunlight back to space and cools the surface below", "blocks sunlight from reaching the remaining ice, so the ice underneath stays shaded and melts more slowly", "cools the air above it, which then freezes more water elsewhere and slows the overall loss of sea ice"],
      "This is the ice-albedo feedback: ice reflects, water absorbs. Losing ice replaces a reflector with an absorber, adding heat, which melts more ice. The loop reinforces itself.", {});
  },
  function () {
    return mcq("Two fields side by side receive equal sunlight. One is bare dark soil and the other is covered with light-coloured straw mulch. After several hours, the air just above the soil field is warmer mainly because the soil",
      "absorbed more sunlight due to its lower albedo and heated the air in contact with it",
      ["reflected more sunlight into the air above it, warming that air as the light passed up", "stored heat from the previous night deep below its surface and released it all day", "blocked the wind from cooling it, so warm air stayed trapped above the soil all afternoon"],
      "Dark soil absorbs more sunlight (lower albedo), becomes hotter, and heats the air touching it by conduction and then convection. Reflected sunlight mostly passes back through the air without warming it directly.", {});
  },
  function () {
    return mcq("A town paints its flat rooftops white. The most likely local effect on a sunny summer day is",
      "slightly cooler air temperatures in the town, because less solar energy is absorbed by the roofs",
      ["warmer air temperatures in the town, because white surfaces store more heat during the day than dark ones do", "no change in the town, because albedo does not affect the temperature of a surface or the air above it at all", "more rainfall over the town, because the reflected sunlight seeds clouds in the moist air passing overhead"],
      "Raising the albedo of the roofs means more sunlight is reflected and less is absorbed as heat, so the surfaces and the air above them stay a little cooler. Albedo does affect temperature: that is the point of the change.", {});
  }
]), ["Follow the energy: does the surface reflect it away or absorb it as heat? Then ask what that does next."]);

/* ---------- SC10.6.2 Heat transfer ---------- */

var S6_TRANSFER_SCEN = [
  { s: "A metal spoon left in a pot of hot soup becomes hot at the handle end", k: "Conduction", w: "Heat travels through the metal itself, from particle to particle, from the hot end to the cooler end. That direct transfer through a material is conduction." },
  { s: "Warm air above a radiator rises and cooler air moves in to take its place, setting up a circulating current", k: "Convection", w: "The air itself moves and carries the heat with it. Bulk movement of a heated fluid is convection." },
  { s: "You can feel the heat of a campfire on your face from two metres away, with no contact and no air current toward you", k: "Radiation", w: "The energy crosses the gap as electromagnetic waves, needing no material between the fire and your face. That is radiation." },
  { s: "A cast-iron frying pan heats evenly after a few minutes on a burner", k: "Conduction", w: "Heat spreads through the solid iron by conduction, from the part touching the burner to the rest of the pan." },
  { s: "Water at the bottom of a pot is heated, becomes less dense and rises, while cooler water sinks to replace it", k: "Convection", w: "The water circulates: heated water rises and cooler water sinks. Moving fluid carrying heat is convection." },
  { s: "The Sun warms the sand on a beach even though space between the Sun and Earth is nearly empty", k: "Radiation", w: "No particles bridge the gap, so conduction and convection are impossible. The energy arrives as radiation." },
  { s: "Holding a mug of hot chocolate warms your hands", k: "Conduction", w: "Your hands touch the mug, and heat passes through the mug wall into your skin by direct contact: conduction." },
  { s: "Hot air balloons rise because the air inside the envelope is heated and expands", k: "Convection", w: "Heated air becomes less dense and rises, the core idea of convection, here lifting the balloon." },
  { s: "A black car roof becomes hot in the summer sun", k: "Radiation", w: "The energy arrives from the Sun as radiation and is absorbed by the dark surface. No contact or air movement is required." },
  { s: "Heat moves from a hot baking tray into the metal rack it rests on", k: "Conduction", w: "The tray and rack are solids in contact; heat flows through them particle to particle: conduction." },
  { s: "Ocean water at the equator is warmed and a surface current carries that warm water toward the poles", k: "Convection", w: "The moving water carries the heat with it over a long distance. Heat transported by a moving fluid is convection (on a planetary scale, in the currents)." },
  { s: "A greenhouse lets sunlight in and the inside air and soil become warm", k: "Radiation", w: "The incoming energy crosses the glass as radiation from the Sun. (The warming inside then involves the glass trapping heat, but the transfer from the Sun is radiation.)" }
];
E("sci-u1-transfer-id", 1, ["SC10.6.2"], 1, "gen", function () {
  var item = s6pick(S6_TRANSFER_SCEN);
  var others = ["Conduction", "Convection", "Radiation"].filter(function (m) { return m !== item.k; });
  return mcq("Which method of heat transfer is mainly at work here? " + item.s + ".",
    item.k, others.concat(["Evaporation"]),
    item.w, { k: item.k });
}, ["Ask two questions: does anything material move to carry the heat, and is there contact? Moving fluid means convection; contact through a solid means conduction; neither means radiation."]);

E("sci-u1-transfer-explain", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("Convection can happen in liquids and gases but not in solids, because convection requires",
      "the material itself to be able to flow and carry heat with it",
      ["the material to be transparent", "the particles to be held in a fixed crystal pattern", "a vacuum between the hot and cold regions"],
      "Convection is heat carried by the bulk movement of a fluid. Liquids and gases flow; the particles in a solid only vibrate in place, so a solid can conduct but cannot convect.", {});
  },
  function () {
    return mcq("Radiation is the only one of the three heat transfer methods that can cross a vacuum, because it travels as",
      "electromagnetic waves that need no material to carry them",
      ["tiny particles ejected from the hot object", "vibrations passed between neighbouring atoms", "currents in a very thin gas"],
      "Conduction needs particles passing vibrations along, and convection needs a flowing fluid. Radiation is electromagnetic waves, which travel through empty space, as sunlight does.", {});
  },
  function () {
    return mcq("A thermos keeps coffee hot for hours. Its silvered, vacuum-sealed double wall works by",
      "removing the material conduction and convection need, and reflecting radiation back",
      ["generating a small amount of heat inside the wall", "cooling the outside of the bottle", "letting conduction happen but blocking convection only"],
      "The vacuum has almost no particles, so conduction and convection have nothing to work through, and the silvering reflects radiation. All three transfer methods are attacked at once.", {});
  },
  function () {
    return mcq("Why does a down-filled winter jacket keep you warm?",
      "The trapped air in the down is a poor conductor and cannot circulate, so body heat escapes slowly",
      ["The down generates heat when it is compressed", "The jacket reflects all of the body's radiation back with a mirror effect", "The down conducts heat away from the skin quickly"],
      "Still, trapped air insulates: it conducts poorly and the small pockets stop convection currents from forming. The jacket slows heat loss; it does not create heat.", {});
  }
]), ["Each method needs something: conduction needs contact, convection needs flow, radiation needs nothing. Which need is present or missing?"]);

E("sci-u1-watercycle", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("When water evaporates from the ocean surface, the energy for the change of state comes from the water itself. As a result, evaporation",
      "cools the ocean surface slightly, storing the energy in the water vapour",
      ["warms the ocean surface, releasing energy to the air", "has no energy effect because the temperature does not change", "only happens when the water is heated by conduction from below"],
      "Evaporation takes energy: the fastest molecules escape, carrying energy into the vapour. The ocean surface loses that energy and cools slightly; the energy is released again later when the vapour condenses.", {});
  },
  function () {
    return mcq("Inside a rising cloud, water vapour condenses into droplets. Condensation affects the air in the cloud by",
      "releasing the energy that was stored during evaporation, warming the air and helping it keep rising",
      ["absorbing energy from the air around it, which cools the cloud and makes the whole cloud sink toward the ground", "having no effect on the air at all, because changes of state involve no energy moving in either direction", "cooling the air inside it steadily, which is why clouds are always colder at the top than at their base level"],
      "Condensation is evaporation in reverse: the stored latent energy is released as heat into the cloud air. That extra warmth is a real engine inside storms, making the air more buoyant.", {});
  },
  function () {
    return mcq("Which step of the water cycle moves the largest amount of energy from the ocean into the atmosphere?",
      "Evaporation from the ocean surface, with the energy released later when the vapour condenses",
      ["Rain falling back into the ocean, returning water and its energy directly to the surface it fell from", "Rivers flowing from land to the sea, carrying water downhill from the continents into the ocean", "Ocean currents flowing poleward, carrying warm surface water from the tropics toward the higher latitudes"],
      "Evaporation loads water vapour with latent energy drawn from the ocean; condensation in clouds releases it into the atmosphere. Rain and rivers move water, and currents move heat within the ocean, but the evaporation-condensation pair is the big ocean-to-air transfer.", {});
  },
  function () {
    return mcq("Sweating cools your skin through the same process that cools the ocean surface. That process is",
      "evaporation: the liquid takes energy from the surface as it changes to vapour",
      ["conduction: heat flows into the sweat and is trapped there", "radiation: the sweat reflects sunlight away from the skin", "condensation: vapour gives up its energy to the skin"],
      "In both cases liquid water evaporates and carries energy away from the surface it leaves, cooling what is left behind.", {});
  }
]), ["Evaporation and condensation are a pair: one stores energy, the other releases it. Which direction is this step going?"]);

E("sci-u1-transfer-homes", 1, ["SC10.6.2"], 1, "var", varset([
  function () {
    return mcq("Fibreglass insulation in a wall is mostly trapped air in a fibre mat. It slows heat loss mainly by",
      "stopping the air from circulating and conducting poorly itself",
      ["reflecting heat back like a mirror", "producing a thin layer of heat in the wall", "conducting heat around the house to spread it evenly"],
      "Insulation works by keeping air still: still air is a poor conductor and cannot form convection currents. The fibres' job is to hold the air in place.", {});
  },
  function () {
    return mcq("A wooden spoon is preferred over a metal spoon for stirring a hot pot because wood",
      "is a poor conductor, so the handle stays comfortable to hold",
      ["absorbs heat faster than metal", "reflects the heat of the soup back into the pot", "cools the soup as it stirs"],
      "Metal conducts heat quickly to your hand; wood conducts it slowly. The spoon material is chosen for its conduction behaviour.", {});
  },
  function () {
    return mcq("On a cold day, a tile floor feels much colder than a carpet at the same room temperature because the tile",
      "conducts heat away from your feet faster than the carpet does",
      ["is actually several degrees colder than the carpet", "radiates cold into your feet", "absorbs your body heat only by convection"],
      "Both are at room temperature. Tile is the better conductor, so it pulls heat from your feet faster, and the rate of heat loss is what your skin senses.", {});
  }
]), ["Same ideas as the textbook diagrams, in household clothes: contact, flow, or waves?"]);

E("sci-u1-conduction-materials", 1, ["SC10.6.2"], 2, "var", varset([
  function () {
    return mcq("A metal rod and a wooden rod of the same size have one end each placed in hot water. After a minute the far end of the metal rod is warm but the wooden rod's far end is not. The difference is that",
      "metal's particles pass on vibrations (and its free electrons carry energy) far more effectively than wood's",
      ["metal absorbs more heat from the water because it is heavier, and heavier materials take in heat faster", "wood reflects the heat from the hot water back into the pot before any of it can travel along the length of the rod", "the water heats the metal rod by convection currents in the pot but heats the wooden rod by conduction alone at its end"],
      "Both rods are heated by conduction at the hot end. Metals conduct well because their structure passes energy along efficiently; wood's structure does not. The method is the same; the rate differs.", {});
  },
  function () {
    return mcq("Which list puts the materials in order from best conductor to poorest conductor?",
      "Copper, then glass, then still air",
      ["Still air, then glass, then copper", "Glass, then copper, then still air", "Copper, then still air, then glass"],
      "Metals are the best common conductors, glass is a middling solid conductor, and still air is one of the poorest conductors, which is exactly why it is used in insulation.", {});
  },
  function () {
    return mcq("Double-glazed windows have a narrow gap of air or argon gas between the panes. The gap reduces heat loss because the gas",
      "conducts poorly and the narrow gap is too small for convection currents to form",
      ["absorbs the heat passing through it and stores that heat in the gap until night", "reflects all infrared radiation back into the room before any heat escapes", "creates a complete vacuum between the panes, and that vacuum blocks radiation"],
      "The gas layer attacks conduction (gas conducts poorly) and convection (the gap is too narrow for currents). Radiation losses are handled by coatings, not by the gas itself, and the gap is not a vacuum.", {});
  }
]), ["Do not just name the method: think about how fast each material moves heat, and why."]);

E("sci-u1-radiation", 1, ["SC10.6.2"], 1, "var", varset([
  function () {
    return mcq("Which statement about radiation is correct?",
      "Every object emits radiation, and hotter objects emit more of it",
      ["Only the Sun emits radiation", "Radiation can only travel through air", "Radiation transfers heat only when objects touch"],
      "All objects radiate energy; the hotter the object, the more it emits. Radiation needs no medium and no contact, which is how the Sun's energy crosses space.", {});
  },
  function () {
    return mcq("A shiny silver surface and a dull black surface sit in the same sunlight. The black surface warms faster because dark, dull surfaces are better at",
      "absorbing radiation (and are also better emitters of it)",
      ["reflecting radiation into themselves", "conducting sunlight into the material", "stopping radiation from leaving the surface"],
      "Dark dull surfaces absorb a larger share of incoming radiation, so they warm faster; shiny surfaces reflect more. Good absorbers are also good emitters, which is why radiators are often painted in light colours only for looks, not physics.", {});
  },
  function () {
    return mcq("Earth receives the Sun's energy and loses energy back to space. Both transfers happen by",
      "radiation",
      ["conduction", "convection", "evaporation"],
      "Space is a near vacuum, so conduction and convection cannot operate across it. Energy arrives and leaves as electromagnetic radiation; the balance between the two sets Earth's overall temperature.", {});
  }
]), ["Radiation is the traveller: it needs no contact and no material."]);

/* ---------- SC10.6.3 Heat transfer and currents ---------- */

E("sci-u1-sea-breeze", 1, ["SC10.6.3", "SC10.6.2"], 3, "var", varset([
  function () {
    return mcq("On a sunny afternoon, a breeze blows from the ocean toward a beach. Put the chain of causes in the correct order: (1) air over the land rises; (2) the land heats faster than the water; (3) cooler ocean air moves in to replace the rising air; (4) the Sun heats land and water equally.",
      "4, then 2, then 1, then 3",
      ["2, then 4, then 3, then 1", "4, then 1, then 2, then 3", "1, then 2, then 4, then 3"],
      "Equal sunlight (4) falls on both surfaces, but the land's temperature climbs faster (2) because of its lower specific heat capacity. The air above the land warms and rises (1), and cooler air from over the ocean slides in underneath (3): an onshore sea breeze. At night the pattern reverses into a land breeze.", {});
  },
  function () {
    return mcq("Late at night, the breeze at the same beach blows from the land toward the ocean. The reversal happens because",
      "the land cools faster than the water, so the air over the water is now relatively warm and rises",
      ["the ocean stops storing heat at night", "the Moon's gravity pulls the air seaward", "the Sun heats the water more strongly at night"],
      "After sunset both surfaces cool, but the land cools faster (low specific heat capacity again). The ocean, still holding the day's heat, keeps the air above it warmer; that air rises and surface air flows from land to sea to replace it.", {});
  },
  function () {
    return mcq("A sea breeze is best classified as which process, driven by which property?",
      "Convection, driven by the different specific heat capacities of land and water",
      ["Conduction, driven by the different colours of land and water", "Radiation, driven by the albedo of the beach sand", "Conduction, driven by the depth of the ocean"],
      "The moving air carrying heat is convection. The reason the air moves at all is the unequal heating of land and water under the same sunlight, which comes from their specific heat capacities.", {});
  }
]), ["Build the chain: equal sunlight, unequal heating, rising air, replacement air. Land versus water response is the key difference."]);

E("sci-u1-currents-cause", 1, ["SC10.6.3"], 1, "var", varset([
  function () {
    return mcq("Surface ocean currents are driven mainly by",
      "the prevailing winds dragging on the water surface, deflected by the Coriolis effect and blocked by continents",
      ["the Moon's gravity alone, pulling the surface water around the ocean basins in the same way it pulls the daily tides around", "differences in the salt content of the water only, with saltier water sinking and pulling the surface flow along", "heat conducted up from Earth's core through the ocean floor, warming the bottom water so it rises and drags the surface along"],
      "Wind friction starts surface water moving; Coriolis bends the flow and continents redirect it into the great gyres. The Moon drives tides, and deep circulation involves density, but surface currents are wind-driven.", {});
  },
  function () {
    return mcq("Warm surface currents generally flow",
      "from the equator toward the poles along the eastern sides of ocean basins (western sides of oceans carry them poleward), carrying heat with them",
      ["from the poles toward the equator on both sides of every ocean basin, carrying cold water into the tropics and cooling the coasts they pass along the way", "in straight lines from east to west everywhere on Earth, following the rotation of the planet without bending or splitting around any of the continents", "only in the Southern Hemisphere, where the large open oceans let warm water circle the globe without meeting land, while northern oceans stay cold all year"],
      "Currents redistribute the heat the tropics absorb: warm water moves poleward and cold water returns equatorward. The Gulf Stream carrying warm water past the Atlantic provinces is the local example.", {});
  },
  function () {
    return mcq("The water in a current keeps moving in a curve even after the wind pattern changes, partly because of inertia, but the large-scale curving of ocean gyres is set by",
      "the Coriolis effect and the shape of the continents",
      ["the saltiness of the water in parts of the ocean basin", "the depth of the ocean floor below the surface water", "the pull of the Sun's gravity on the surface water"],
      "Gyres are the product of wind drive plus Coriolis deflection plus continents blocking the flow. Salinity matters for deep density currents, not for the surface gyre pattern.", {});
  }
]), ["Surface currents start with wind. Then ask what bends them and what blocks them."]);

E("sci-u1-coriolis", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("In the Northern Hemisphere, the Coriolis effect deflects moving air and water",
      "to the right of their direction of motion",
      ["to the left of their direction of motion", "directly toward the equator", "straight downward"],
      "North of the equator, moving objects appear to curve right because Earth rotates beneath them. In the Southern Hemisphere the deflection is to the left. This is the rule the FrenchWinds activities drill, and it shapes both wind belts and currents.", {});
  },
  function () {
    return mcq("A wind blowing from the equator toward the North Pole is deflected by the Coriolis effect so that it ends up blowing mainly from the",
      "southwest",
      ["northeast", "northwest", "southeast"],
      "Start with air moving north. Deflect it to its right (eastward) and the flow becomes a wind coming FROM the southwest: these are the westerlies of the middle latitudes. Winds are named for where they come from.", {});
  },
  function () {
    return mcq("The Coriolis effect is strongest",
      "near the poles, and zero at the equator",
      ["at the equator, and zero at the poles", "at 30 degrees latitude in both hemispheres", "over the oceans only"],
      "The deflection grows with latitude: nothing at the equator, maximum near the poles. That is why tropical systems need to form a few degrees off the equator to start spinning.", {});
  },
  function () {
    return mcq("Two identical rockets are fired due north, one from the equator and one from 50 degrees north latitude. The one fired from 50 degrees north will appear to curve",
      "more strongly to the right, because the Coriolis effect increases with latitude",
      ["less, because the Coriolis effect fades with latitude", "to the left, because it is over land", "not at all, because rockets are powered"],
      "Latitude controls the strength of the effect: stronger toward the poles. Being powered does not remove the rotating-frame deflection.", {});
  }
]), ["Right in the north, left in the south, nothing at the equator, strongest at the poles."]);

E("sci-u1-labrador-current", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("The Labrador Current flows southward along the Labrador coast and past the island of Newfoundland. Its effect on coastal weather is to bring",
      "cold water and cold air, giving cool summers, sea ice and icebergs, and frequent fog where it meets warm moist air",
      ["warm water and warm air, making the coast warmer than inland areas in winter across the island", "dry, desert-like conditions to the coast, because cold water stops rain clouds forming along the shore", "hurricanes toward the province every summer, because cold water steers tropical storms north to the coast"],
      "The Labrador Current is a cold current: it chills the air above it, keeps summers cool, carries icebergs south, and where its cold air undercuts warm moist air from the Gulf Stream region, fog forms. It is a major reason the province's east coast is cooler than places at the same latitude in Europe.", {});
  },
  function () {
    return mcq("Western Europe at the same latitude as Labrador has much milder winters. A major reason is that Europe is warmed by",
      "the warm North Atlantic Drift (an extension of the Gulf Stream) flowing past its coasts",
      ["the Labrador Current flowing across the Atlantic toward Europe and warming its coasts", "hot winds blowing off the Sahara Desert in winter, warming all of western Europe", "heat conducted through the Atlantic Ocean floor from warm rocks below the seabed"],
      "Warm currents carry tropical heat to Europe's coasts while cold currents carry Arctic water past Labrador. Same latitude, opposite currents, opposite climates: currents move heat, and coasts feel it.", {});
  },
  function () {
    return mcq("Grand Banks fog forms most often when",
      "warm, moist air from over the Gulf Stream moves over the cold water of the Labrador Current and is chilled to its dewpoint",
      ["cold, dry air moves over warm water in winter and picks up vapour that condenses at once into a thick bank of fog over the harbour", "the Labrador Current stops flowing for several weeks, leaving still cold water that chills any air crossing the Grand Banks area", "high pressure builds over the island and pushes a layer of fog out to sea, where it stays parked over the Banks for days at a time"],
      "Air chilled from below reaches its dewpoint and the moisture condenses into fog. The meeting of the warm Gulf Stream air and the cold Labrador Current water is one of the foggiest combinations on Earth.", {});
  }
]), ["The local example matters here: one cold current, and everything it explains about this province's weather."]);

var S6_BELTS = [
  { letter: "A", name: "Polar easterlies (Northern Hemisphere)", dir: "toward the southwest" },
  { letter: "B", name: "Westerlies (Northern Hemisphere)", dir: "toward the northeast" },
  { letter: "C", name: "Northeast trade winds", dir: "toward the southwest" },
  { letter: "D", name: "Southeast trade winds", dir: "toward the northwest" },
  { letter: "E", name: "Westerlies (Southern Hemisphere)", dir: "toward the southeast" },
  { letter: "F", name: "Polar easterlies (Southern Hemisphere)", dir: "toward the northwest" }
];
E("sci-u1-windbelts-id", 1, ["SC10.6.3"], 1, "gen", function () {
  var mode = Math.random() < 0.5 ? "name" : "dir";
  var b = s6pick(S6_BELTS);
  var others = s6shuf(S6_BELTS.filter(function (x) { return x !== b; })).slice(0, 3);
  var q;
  if (mode === "name") {
    q = mcq("On the wind belt diagram, which belt is labelled " + b.letter + "?",
      b.name, others.map(function (x) { return x.name; }),
      "Belt " + b.letter + " sits between the latitude lines shown on the diagram. From the poles to the equator the pattern in each hemisphere is polar easterlies, westerlies, then trade winds, and the arrows show the surface flow: " + b.name.toLowerCase() + " blow " + b.dir + ".",
      { belt: b.letter, mode: mode });
  } else {
    q = mcq("In belt " + b.letter + " on the wind belt diagram, surface winds blow mainly",
      b.dir, ["toward the northeast", "toward the northwest", "toward the southeast", "toward the southwest"].filter(function (d) { return d !== b.dir; }),
      "Belt " + b.letter + " is the " + b.name.toLowerCase() + ". Air moving toward the equator is deflected westward, and air moving toward the poles is deflected eastward, which sets the arrow directions drawn on the diagram.",
      { belt: b.letter, mode: mode });
  }
  q.figure = s6WindBeltSVG("zones");
  return q;
}, ["Read the latitude lines first: 60 to 90, 30 to 60, 0 to 30, in each hemisphere. Then match the band to its belt."]);

E("sci-u1-windbelts-calm", 1, ["SC10.6.3"], 2, "gen", function () {
  var zones = [
    { letter: "X", name: "the doldrums", why: "At the equator (X), air rises rather than blowing horizontally, so surface winds are light and variable: the doldrums, dreaded by sailing ships for the lack of wind (though squalls are common)." },
    { letter: "Y", name: "the horse latitudes", why: "At about 30 degrees north (Y), air sinks back toward the surface under high pressure, producing the calm horse latitudes and many of the world's deserts at the same latitudes." },
    { letter: "Z", name: "the horse latitudes", why: "At about 30 degrees south (Z), air sinks back toward the surface under high pressure, producing the calm horse latitudes, the mirror image of the northern belt." }
  ];
  var z = s6pick(zones);
  var q = mcq("On the wind belt diagram, the calm zone labelled " + z.letter + " is called",
    z.name, ["the doldrums", "the horse latitudes", "the polar front", "the jet stream"].filter(function (n) { return n !== z.name; }),
    z.why, { zone: z.letter });
  q.figure = s6WindBeltSVG("calm");
  return q;
}, ["Calm zones sit where air rises (equator) or sinks (about 30 degrees). Match the letter to its latitude first."]);

E("sci-u1-current-effects", 1, ["SC10.6.3"], 3, "var", varset([
  function () {
    return mcq("Suppose the warm Gulf Stream shifted so that it flowed closer to the Nova Scotia and Newfoundland coasts. The most likely change to coastal winters would be",
      "milder temperatures and more moisture available for snow and rain, because the warm current heats and moistens the air above it",
      ["colder temperatures along the coast, because a warm current pushes a band of cold air ahead of it as it moves northward past the shore", "no change to coastal winters at all, because ocean currents do not affect the air above them in any season or at any latitude on Earth", "much drier winters along the coast, because warm ocean water absorbs moisture out of the air above it instead of adding vapour to it"],
      "Currents move heat, and the air takes on the character of the water it crosses. Warm water near the coast would warm and moisten the air, softening winter cold and feeding precipitation. The province's present climate is shaped the same way by the cold Labrador Current.", {});
  },
  function () {
    return mcq("A fishing town's records show the nearby ocean current has run about 2 °C warmer than usual for a whole summer. Which prediction is best supported?",
      "More fog and humidity near the coast, and warmer nights, as the warm water heats and moistens the air above it",
      ["Colder nights, because warm water reflects heat back to space", "Less fog, because warm water cannot chill air to its dewpoint under any conditions", "Stronger winds in every month, because warm currents always speed up the air"],
      "Warmer water transfers more heat and moisture to the air: nights stay warmer and humid air brings more low cloud and fog. Fog specifically needs the air to reach its dewpoint, which warm water makes more likely by loading the air with vapour, not less.", {});
  },
  function () {
    return mcq("Peru's coast is unusually cold and dry for its latitude because a cold current flows along it. The cold current produces this climate mainly by",
      "chilling the air above it so the air holds little moisture and sinks rather than rising to form rain",
      ["blocking warm winds from ever reaching the coast, because cold water turns onshore breezes back to sea", "reflecting sunlight back into space from the water surface, so the coast gets far less solar heating", "pulling all of the region's rain clouds out to sea, where storms release their rain over the ocean"],
      "Cold water cools the air in contact with it; cool air holds less moisture and tends to sink, suppressing rain. It is the same mechanism, with the sign reversed, as warm currents moistening and warming the coasts they pass.", {});
  }
]), ["A current is a heat delivery system. Ask what the water does to the air above it, then what that air does to the coast."]);

/* ---------- SC10.6.4 Weather systems ---------- */

E("sci-u1-airmass-id", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("An air mass that forms over the cold, dry Canadian Arctic in winter is classified as",
      "continental Arctic (cA): very cold and very dry",
      ["maritime Tropical (mT): warm and moist", "continental Tropical (cT): hot and dry", "maritime Polar (mP): cool and moist"],
      "The first letter tells the source surface (continental = land = dry; maritime = water = moist) and the second the source temperature (Arctic, Polar, Tropical). Over Arctic land in winter: continental Arctic, the coldest and driest air mass affecting the province.", {});
  },
  function () {
    return mcq("In the code mT, the two letters mean the air mass is",
      "maritime (moist) and Tropical (warm)",
      ["mountain (dry) and Temperate (mild)", "maritime (dry) and Tundra (cold)", "continental (moist) and Tropical (warm)"],
      "Lowercase m is maritime: formed over water, so moist. Capital T is Tropical: formed in warm regions. Continental (c) air is dry because it forms over land. mT air is the warm, humid air that brings muggy summer weather and feeds storms.", {});
  },
  function () {
    return mcq("Which air mass is most likely to bring a July heat wave with high humidity to the island of Newfoundland?",
      "Maritime Tropical (mT) air moving up from the warm Atlantic and the Gulf Stream region",
      ["Continental Arctic (cA) air from the far north, bringing cold, dry winter conditions south", "Continental Polar (cP) air from the Prairies, bringing cool, dry conditions to the island", "Maritime Arctic air from the Labrador Sea, bringing chilled ocean air south along the coast"],
      "July heat with humidity needs a warm, moist source: the tropical Atlantic. The polar and arctic air masses are cold, and continental polar air is dry as well as cool.", {});
  },
  function () {
    return mcq("An air mass takes on the temperature and moisture characteristics of",
      "the surface it sits over for several days (its source region)",
      ["the last front it crossed on its way into the region days earlier", "the altitude at which it formed high above the surface of the Earth", "the season in which it is named, no matter which surface it came from"],
      "Air masses are made by contact: days spent over cold ocean make air cold and moist; days over hot desert make it hot and dry. That is why the classification names the source: surface first, temperature second.", {});
  }
]), ["Decode the two letters: surface (c or m) sets moisture, temperature (A, P or T) sets warmth."]);

E("sci-u1-airmass-source", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("A weather station reports three days of bitterly cold, very dry air with clear skies in January. The air mass overhead most likely formed over",
      "the snow-covered Canadian Arctic (continental Arctic)",
      ["the warm Gulf of Mexico (maritime Tropical)", "the Pacific Ocean off British Columbia (maritime Polar)", "the deserts of the southwestern United States (continental Tropical)"],
      "Bitter cold plus very dry means a cold, land source: the Arctic interior in winter. Each wrong option is warm or moist or both, which contradicts one of the two reported properties.", {});
  },
  function () {
    return mcq("After several days of warm, humid weather, a town's air becomes noticeably drier and cooler without any rain. The most likely cause is",
      "a continental Polar air mass replacing the maritime Tropical air mass over the town",
      ["the maritime Tropical air mass losing its moisture to the Sun, drying and cooling in place", "a front forming inside the air mass, splitting it into warm and cool, dry parts", "the town's altitude increasing slowly, lifting it into cooler and drier air above the valley"],
      "Air mass weather changes when one air mass replaces another. Cool and dry replacing warm and moist is the signature of continental Polar air (from the northern land interior) displacing maritime Tropical air.", {});
  },
  function () {
    return mcq("Why does maritime Polar air bring cool, cloudy, showery weather to the province in spring?",
      "It forms over cold North Pacific and North Atlantic water, so it arrives cool and loaded with moisture picked up from the ocean",
      ["It forms over the Arctic ice cap, then picks up moisture while crossing the Prairies on its long route to the Atlantic coast", "It is heated from below by the warm ocean floor, so it arrives warm and unstable, ready to produce heavy downpours each day", "It only travels at night, when temperatures fall, so it reaches the province cooled and filled with fog gathered over the water"],
      "Maritime means the moisture comes with it from its ocean source, and polar means cold water, so cool air. Cool moist air lifted over the coast gives cloud and showers: classic spring weather on the island.", {});
  }
]), ["Use the two properties separately: temperature points to the latitude of the source, moisture points to land or water."]);

E("sci-u1-front-symbols", 1, ["SC10.6.4"], 1, "gen", function () {
  var kinds = [
    { kind: "cold", name: "A cold front", why: "Triangles on the line mark a cold front. The triangles point in the direction the front is moving, into the warmer air. (Semicircles would mark a warm front; alternating symbols on opposite sides mark a stationary front.)" },
    { kind: "warm", name: "A warm front", why: "Semicircles on the line mark a warm front. The semicircles sit on the side toward which the front is advancing, as the warm air slides up over the cooler air ahead of it." },
    { kind: "stationary", name: "A stationary front", why: "Triangles on one side and semicircles on the other mark a stationary front: the boundary between two air masses where neither is advancing, so the front stalls and its weather can linger for days." }
  ];
  var k = s6pick(kinds);
  var q = mcq("The diagram shows a segment of a front as it would be drawn on a weather map. Which front is it?",
    k.name, kinds.filter(function (x) { return x !== k; }).map(function (x) { return x.name; }).concat(["An occluded front"]),
    k.why, { kind: k.kind });
  q.figure = s6FrontSVG(k.kind);
  return q;
}, ["Triangles mean cold, semicircles mean warm, both together on opposite sides mean stationary."]);

E("sci-u1-front-weather", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("A cold front is usually associated with",
      "a narrow band of heavy showers or thunderstorms, followed by clearing and cooler air",
      ["days of gentle, steady rain over a wide area, with mild temperatures behind it for a week", "fog and drizzle that last for a week, with calm winds and little temperature change", "no change in weather at all, because a cold front affects only pressure readings"],
      "A cold front lifts warm air abruptly along a steep boundary, producing a narrow, intense band of precipitation. Once it passes, cooler, drier air and clearing skies follow. Long, gentle, wide-area rain belongs to warm fronts.", {});
  },
  function () {
    return mcq("As a warm front approaches a town, the usual sequence is",
      "high thin clouds thickening into a wide shield of steady rain, then warmer air arriving as the front passes",
      ["a sudden thunderstorm along a narrow line, followed at once by a drop in temperature and clearing skies", "clear skies until the front arrives, then heavy snow beginning suddenly with no cloud ahead of it", "fog that forms ahead of the front and lifts the moment it passes, leaving colder, drier air behind"],
      "Warm air slides gradually up over the cool air ahead of a warm front, so clouds build and thicken over a wide area well before the surface front arrives, giving steady precipitation, and temperatures rise after passage.", {});
  },
  function () {
    return mcq("Which pairing of front and precipitation pattern is correct?",
      "Warm front: steady rain over a large area for many hours. Cold front: brief, heavy showers in a narrow band.",
      ["Warm front: brief, heavy showers in a narrow band. Cold front: steady rain over a large area for many hours at a time.", "Both fronts: identical precipitation patterns, with the same width, intensity and duration of rain.", "Warm front: no precipitation at all in any season. Cold front: steady rain for days over the whole region behind the line."],
      "The slope of the boundary sets the pattern: the warm front's gentle slope spreads lifting (and rain) over hundreds of kilometres, while the cold front's steep slope concentrates it in a narrow, intense band.", {});
  },
  function () {
    return mcq("A stationary front has stalled over a region for two days. The most likely weather there is",
      "prolonged cloud and repeated periods of rain along the boundary, with little temperature change",
      ["rapid clearing and warming, as the stalled boundary breaks up and dry air floods in", "a single short thunderstorm as the front stalls, then sunshine and warming air", "steadily falling temperatures, as cold air slowly wins and pushes the boundary south"],
      "Neither air mass is winning, so the boundary and its lifting zone sit in place. The result is persistent cloud and on-and-off rain with temperatures stuck on each side of the line.", {});
  }
]), ["Picture the boundary's slope: steep (cold front) means narrow and intense; gentle (warm front) means wide and steady."]);

E("sci-u1-front-passage", 1, ["SC10.6.4"], 3, "var", varset([
  function () {
    return mcq("A station records this sequence over six hours: temperature 16 °C and falling pressure; a brief period of heavy showers; then temperature 8 °C, pressure rising, and winds from the northwest. The best interpretation is that",
      "a cold front passed the station during the showers",
      ["a warm front passed the station during the showers", "a high-pressure centre passed directly overhead", "the station moved into a maritime Tropical air mass"],
      "Each clue points the same way: falling pressure ahead of the front, an intense narrow rain band at the front, then cold air, rising pressure and the northwest wind shift behind it. That is the textbook cold-front passage, told by the instruments in order.", {});
  },
  function () {
    return mcq("Ahead of an approaching cold front, a town's pressure is falling and its temperature is warm. A forecaster wants to warn residents about the wind change at frontal passage. The warning should say the winds will shift to blow from the",
      "northwest, and strengthen briefly in gusts with the showers",
      ["southeast, and die out completely once the front has passed by", "south, and stay warm and gentle for the rest of the day ahead", "northeast, bringing warmer and moister air in off the ocean"],
      "Winds ahead of the front blow from the south or southwest (warm sector). At passage they veer sharply to the northwest, the direction of the cold air behind the front, often with gusts in the shower band.", {});
  },
  function () {
    return mcq("Two neighbouring towns are on opposite sides of a cold front that is nearly stationary this morning. Town A reports 19 °C and humid; Town B, 60 km away, reports 7 °C and dry. Later the front surges southeast. By evening Town A should expect",
      "a sharp temperature drop into the range Town B reported, with a band of showers as the front crosses",
      ["no change at all, because a cold front does not affect towns ahead of it before it crosses", "a gradual warming as the front approaches, with humid air deepening and no rain that day", "the same weather as Town B had, with the same cold, dry air, but without any precipitation"],
      "A front is a boundary between two air masses; crossing it swaps one air mass for the other. Town B's current weather is the preview of Town A's post-frontal weather, delivered with the front's rain band.", {});
  }
]), ["Read the instruments as a story in time order: before, during and after the boundary crosses the station."]);

E("sci-u1-pressure-systems", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("In the Northern Hemisphere, surface winds around a low-pressure centre blow",
      "counterclockwise and inward toward the centre",
      ["clockwise and outward from the centre", "straight into the centre from all directions", "counterclockwise and outward from the centre"],
      "Coriolis deflection bends the inward-flowing air to the right, producing a counterclockwise spiral into a low. A high is the mirror image: clockwise and outward.", {});
  },
  function () {
    return mcq("High-pressure systems are usually associated with fair weather because the air in a high is",
      "sinking, which warms it slightly and prevents clouds from forming",
      ["rising, which cools it and squeezes out moisture as cloud", "moving so fast across the region that clouds cannot form in it", "always colder than the air around it, which keeps the skies clear"],
      "Sinking air is compressed and warmed as it descends, so its relative humidity drops and clouds evaporate. Rising air (in a low) does the opposite: it cools, condenses and makes weather.", {});
  },
  function () {
    return mcq("On a weather map, the letter L marks the centre of a low. The closed curves drawn around it are isobars, which connect places with the same",
      "air pressure",
      ["temperature", "wind speed", "humidity"],
      "Isobars are lines of equal pressure (iso means equal, bar refers to pressure). Isotherms join equal temperatures. Closely spaced isobars, whatever the system, mean strong winds.", {});
  },
  function () {
    return mcq("A barometer at a coastal station reads 1041 hPa and has been steady for two days. The station is most likely under",
      "a high-pressure system, with settled, fair weather",
      ["an intense low-pressure system bringing stormy weather", "a cold front passing at that moment, with shifting winds", "a hurricane centred just offshore, at its lowest pressure"],
      "1041 hPa is well above the average sea-level pressure of about 1013 hPa, and steady high pressure means sinking air and fair weather. Lows and fronts come with lower and changing pressure.", {});
  }
]), ["Lows: air rises, winds spiral in counterclockwise. Highs: air sinks, winds spiral out clockwise. Isobars are equal pressure."]);

E("sci-u1-isobars", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Two weather maps show lows of the same central pressure. On Map 1 the isobars are drawn close together; on Map 2 they are far apart. The winds will be stronger on",
      "Map 1, because closely spaced isobars mean the pressure changes quickly over distance, which drives strong winds",
      ["Map 2, because widely spaced isobars give the wind room to accelerate over long distances between lines", "both maps equally, because the central pressures are the same and the centre value alone decides the winds", "Map 2, because weak pressure gradients always produce the strongest storms, while steep gradients keep winds light"],
      "Wind strength is set by the pressure gradient, the change in pressure over distance, not by the central value alone. Tight spacing equals a steep gradient equals strong wind. This is why forecasters look at spacing first.", {});
  },
  function () {
    return mcq("A town sits between the 1008 hPa and 1004 hPa isobars of a low, where the isobars are crowded together. Another town the same distance from the centre sits where the isobars are spread out. Compared with the second town, the first town's winds are",
      "stronger, because its local pressure gradient is steeper",
      ["weaker, because crowded isobars trap the air", "identical, because both towns are the same distance from the centre", "calm, because isobars cancel the wind where they are close"],
      "Distance from the centre does not set the wind; the local spacing does. Crowded isobars mean pressure is changing fast over a short distance, and that steep gradient drives fast air movement.", {});
  },
  function () {
    return mcq("Sailors in the centre of a large high-pressure system often report frustrating conditions for sailing. The reason is that near a high's centre",
      "the isobars are widely spaced, the pressure gradient is weak, and winds are light and variable",
      ["the pressure is so high it pushes the sails flat and stops the boat gathering speed", "the air near the centre is too dense for a boat to move through, so sails hang limp", "the winds circle so fast around the centre that the boat cannot hold a course in them"],
      "At the centre of a high the pressure barely changes from place to place, so there is almost no gradient to drive wind. The same weak-gradient logic explains calms in the doldrums and horse latitudes.", {});
  }
]), ["Forget the centre's number: spacing is the wind. Tight isobars, steep gradient, strong wind."]);

E("sci-u1-low-formation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Mid-latitude low-pressure systems (the storms that cross this province) typically develop",
      "along a front where cold polar air meets warm tropical air, with the boundary beginning to wave and wrap around a centre",
      ["in the middle of a uniform air mass, far from any boundary, with the pressure falling for no reason tied to contrast", "only over warm tropical oceans in summer, where hurricanes form, never along air mass boundaries at mid-latitudes", "where two high-pressure systems collide and squeeze the air between them down until a low forms at the surface"],
      "The energy for these storms comes from the contrast between air masses along a front. A wave forms on the boundary, pressure falls at the wave's crest, and the cold and warm fronts of the mature low develop from there. Hurricanes are the tropical exception, not the local rule.", {});
  },
  function () {
    return mcq("Why do so many of the province's storms arrive from the southwest and travel toward the northeast?",
      "The prevailing westerlies steer weather systems from west to east across the mid-latitudes, and the storm track follows the temperature contrast along the coast",
      ["Storms are pulled northeast by the Labrador Current, which drags the low-pressure centres along the coast in the same direction as the cold water flows past the island each season", "The Coriolis effect pushes every storm toward the northeast regardless of the winds around it, so each low follows the same curving path no matter where it first formed", "Storms form directly over the province and then drift backward toward the southwest, which is why forecasters watch the waters off Nova Scotia for the systems that arrive here"],
      "Systems are embedded in the westerly flow of the mid-latitudes, so they are carried west to east (here, southwest to northeast). The strong land-ocean temperature contrast along the east coast helps intensify them on the way.", {});
  },
  function () {
    return mcq("A low deepens (its central pressure falls) as it approaches the province. Deepening means the storm is",
      "intensifying: its pressure gradient steepens and its winds strengthen",
      ["weakening steadily and about to clear, with lighter winds and breaking cloud", "slowing down and becoming stationary, with its winds dying out as it stalls", "changing into a high-pressure system, with sinking air and clearing skies"],
      "Falling central pressure against the surrounding pressure steepens the gradient, and a steeper gradient means faster winds and usually more precipitation. A filling low (rising central pressure) is the one that is weakening.", {});
  }
]), ["Storms here are born on boundaries between air masses and ride the westerlies. Contrast is the fuel."]);

E("sci-u1-extreme", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("A hurricane gets its energy from",
      "the heat stored in warm tropical ocean water, released as water vapour condenses in the storm",
      ["the cold Labrador Current flowing south past the island, whose cold water feeds the storm", "friction with the land as it approaches the coast, which spins the storm up as it nears shore", "the collision of two cold fronts over the ocean, releasing energy stored along their boundaries"],
      "Hurricanes are heat engines run on warm water (generally above about 26.5 °C): evaporation loads the air with latent energy and condensation aloft releases it. Over land or cold water the fuel supply is cut and the storm weakens.", {});
  },
  function () {
    return mcq("Which conditions are required for a blizzard?",
      "Strong winds (at least 40 km/h), falling or blowing snow reducing visibility below about 400 m, lasting at least four hours (with dangerous cold in the Canadian definition)",
      ["A temperature below -30 °C lasting a full day, with any amount of snow on the ground, even when the air is calm and visibility stays clear for kilometres in every direction", "Snowfall of exactly 25 cm within a single hour, measured at the station, no matter what the wind is doing or whether visibility in the falling snow stays good throughout", "A low-pressure centre passing directly overhead at the height of the storm, regardless of the wind speed, the visibility in blowing snow, or how long the conditions last"],
      "A blizzard is defined by wind and visibility in snow, not by a snowfall total: even old snow blown by strong wind can produce one (a ground blizzard). The temperature criterion applies in the Canadian Prairie definition; the wind and visibility criteria are the core everywhere.", {});
  },
  function () {
    return mcq("During a winter storm warning for the island, the safest interpretation of a forecast calling for a nor'easter is",
      "a strong low tracking northeastward along the coast, bringing heavy snow and powerful northeast winds to the island",
      ["a gentle rain event with light southwest winds, bringing mild air and small amounts of rain", "a high-pressure system arriving from the northeast, bringing sinking air and clearing skies to the island", "a thunderstorm moving in from the Labrador Sea, bringing brief heavy rain and gusty winds for an hour or two"],
      "A nor'easter is named for its winds: a coastal low travelling up the seaboard drives strong northeasterlies into the province, usually with heavy snow. It is the classic major winter storm pattern here.", {});
  }
]), ["Extreme weather still runs on this unit's engines: stored ocean heat for hurricanes, wind plus snow for blizzards."]);

E("sci-u1-climate-factors", 1, ["SC10.6.4", "SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("St. John's, Newfoundland (47.6 °N) has much colder winters than Lisbon, Portugal (38.7 °N) mainly because of latitude, but Vancouver (49.3 °N) is far milder than St. John's at nearly the same latitude. The Vancouver difference is mostly due to",
      "ocean currents and prevailing winds: Vancouver receives air that has crossed the warm Pacific, St. John's receives air from the cold Arctic and sits beside the cold Labrador Current",
      ["Vancouver being much closer to the equator in practice, because the curve of the continent places it far to the south of St. John's in sunlight terms even though the two latitudes look similar on a map", "altitude alone: St. John's sits high enough above sea level for its winter air to stay far colder than Vancouver's, while Vancouver rests in a deep, sheltered valley close to the water on the Pacific coast", "the tilt of Earth's axis changing over Canada through the winter, so the eastern half of the country tips away from the Sun while the western half keeps facing it for more hours each short winter day"],
      "Latitude sets the sunlight budget, but currents and wind direction deliver the heat. Pacific air and a warm current moderate Vancouver; Arctic air masses and a cold current chill St. John's. Altitude is a red herring here: St. John's is near sea level.", {});
  },
  function () {
    return mcq("A mountain town at 1500 m elevation is consistently about 9 °C colder than a town in the valley below it. This is the effect of",
      "altitude: temperature falls as elevation increases because the air is thinner and less able to hold heat",
      ["latitude: the mountain town lies much farther from the equator than the valley town below it", "albedo of the valley floor: the bright valley surface reflects sunlight up and keeps slopes cold", "distance from the ocean: the mountain town is cut off from the sea, while the valley town is coastal"],
      "Temperature drops roughly 6 to 10 °C per kilometre of elevation. The two towns share latitude and region, so elevation is the factor that differs.", {});
  },
  function () {
    return mcq("Which list contains only factors that affect a region's climate (not its day-to-day weather)?",
      "Latitude, altitude, nearness to water, ocean currents, prevailing winds",
      ["Today's pressure, tomorrow's front, wind gusts at noon", "Latitude, the passage of a single low, altitude", "Ocean currents, this week's rainfall, nearness to water"],
      "Climate is the long-term pattern: latitude, altitude, water, currents and prevailing winds. Individual fronts, gusts and this week's rain are weather events, not climate factors.", {});
  },
  function () {
    return mcq("A desert sits at 30 degrees south latitude on a continent's west coast, where a cold current flows and the horse-latitude high dominates. Its dryness is best explained by",
      "sinking air under the high (which suppresses cloud and rain) plus cold coastal water chilling and stabilizing the air",
      ["its distance from the equator alone, because places at 30 degrees south receive too little sunlight to evaporate water and form clouds", "the rain shadow of the ocean, because the sea blocks moist air from the coast as a mountain range blocks it inland", "the absence of any air masses over the region, because no air moves into the horse latitudes from nearby oceans"],
      "The great deserts cluster near 30 degrees in both hemispheres where air sinks, and a cold current adds stability on the west coasts. Two of this unit's mechanisms stack to produce the desert.", {});
  }
]), ["Separate the controls: latitude, altitude, water, currents, winds. Then ask which one actually differs between the two places."]);

E("sci-u1-greenhouse", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("The natural greenhouse effect works because greenhouse gases in the atmosphere",
      "let sunlight pass through but absorb much of the infrared radiation Earth emits, sending some of it back toward the surface",
      ["reflect incoming sunlight back to space before it reaches the ground, so the surface warms only from heat generated inside the Earth itself", "produce heat through chemical reactions in the air, releasing energy as the gases combine and break apart high above the surface of the Earth", "trap a layer of air against the surface so it cannot circulate to space, holding the day's warmth in place"],
      "Sunlight (mostly visible) passes through; Earth's outgoing infrared is absorbed by gases such as water vapour, carbon dioxide and methane, warming the lower atmosphere. Without the natural effect Earth would average about -18 °C instead of about +15 °C.", {});
  },
  function () {
    return mcq("The enhanced greenhouse effect refers to",
      "human activities increasing greenhouse gas concentrations, strengthening the natural effect and warming the planet",
      ["the Sun becoming steadily hotter over the last century, sending more energy to Earth and warming every planet in the same way", "greenhouses being used to grow food in winter, whose glass roofs trap enough heat across the world to warm the whole planet", "a hole in the ozone layer letting extra heat into the atmosphere from space, warming the surface below it year after year"],
      "The enhanced effect is the natural mechanism plus extra gases (mainly carbon dioxide from burning fossil fuels, and methane). The ozone hole is a separate issue about ultraviolet radiation, and the Sun's output has not risen enough to explain the warming.", {});
  },
  function () {
    return mcq("Venus is far hotter than Earth mainly because its atmosphere",
      "is very thick and almost all carbon dioxide, producing an extreme greenhouse effect",
      ["is closer to the Sun than Earth is, which alone explains its whole temperature difference", "contains no clouds at all, so nothing reflects any sunlight away from its surface", "reflects no sunlight at all back to space, absorbing every ray that reaches its surface"],
      "Venus is closer to the Sun, but the runaway greenhouse effect of its massive carbon dioxide atmosphere is what pushes its surface to about 460 °C. It is the solar system's demonstration of the greenhouse mechanism at full strength.", {});
  }
]), ["Short wavelengths in, long wavelengths partly trapped. Natural effect keeps us livable; enhancement is the human addition."]);

/* ---------- SC10.6.5 Meteorological data ---------- */

E("sci-u1-instruments", 1, ["SC10.6.5"], 1, "var", varset([
  function () {
    return mcq("Which instrument measures air pressure, the reading forecasters watch most closely for coming weather changes?",
      "A barometer",
      ["An anemometer", "A hygrometer", "A rain gauge"],
      "Barometers measure pressure, and pressure tendency (rising, falling, steady) is a primary forecasting signal. Anemometers measure wind speed, hygrometers humidity, and rain gauges precipitation amounts.", {});
  },
  function () {
    return mcq("A school weather station needs to record wind speed and humidity. The two instruments to install are",
      "an anemometer for wind speed and a hygrometer for humidity",
      ["a barometer for wind speed and a thermometer for humidity", "a wind vane for wind speed and a barometer for humidity", "a rain gauge for wind speed and an anemometer for humidity"],
      "Anemometer: wind speed (the spinning cups type is standard). Hygrometer: humidity. A wind vane gives direction, not speed, and a barometer gives pressure, not humidity.", {});
  },
  function () {
    return mcq("Which pairing of instrument and unit is correct?",
      "Rain gauge and millimetres of precipitation",
      ["Anemometer and millibars of pressure", "Hygrometer and degrees Celsius", "Barometer and kilometres per hour"],
      "Precipitation is measured as a depth in millimetres. Anemometers report km/h (wind speed), hygrometers report percent relative humidity, and barometers report hPa (pressure).", {});
  },
  function () {
    return mcq("A thermometer reads the same at two stations, but only one reports fog in the morning. The extra instrument reading that best explains the difference is the",
      "hygrometer: the foggy station's air was at or near saturation (relative humidity near 100 percent)",
      ["anemometer: the foggy station had stronger winds", "barometer: the foggy station had higher pressure", "rain gauge: the foggy station had more rain the day before"],
      "Fog is condensed water vapour: it needs saturated air. Strong wind actually mixes air and tends to clear fog, and pressure alone does not make fog. Humidity is the deciding measurement.", {});
  },
  function () {
    return mcq("Weather satellites contribute to forecasting mainly by",
      "imaging cloud systems and tracking their movement, revealing fronts and storms over oceans where there are no stations",
      ["measuring pressure at the surface directly", "replacing the need for any ground stations", "changing the direction of approaching storms"],
      "Satellites see the cloud patterns of systems across data-empty oceans, exactly the region this province's weather comes from. Surface pressure still comes from barometers on the ground and on buoys and ships.", {});
  }
]), ["Name the quantity first, then the instrument: pressure, wind speed, humidity, precipitation, temperature."]);

E("sci-u1-wxdata-read", 1, ["SC10.6.5"], 1, "gen", function () {
  var S = s6WxSeries();
  var kind = s6pick(["warmest", "windiest", "totalrain", "pchange"]);
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  var q;
  if (kind === "warmest") {
    var bi = 0; S.days.forEach(function (d, i) { if (d.T > S.days[bi].T) bi = i; });
    var others = s6shuf([0, 1, 2, 3, 4].filter(function (i) { return i !== bi; })).slice(0, 3);
    q = mcq(head + "<br>On which day was the temperature highest?",
      "Day " + (bi + 1), others.map(function (i) { return "Day " + (i + 1); }),
      "Read the Temp value on each line: the readings are " + S.days.map(function (d) { return d.T + " °C"; }).join(", ") + ". The largest is Day " + (bi + 1) + " at " + S.days[bi].T + " °C.",
      { kind: kind, bi: bi });
  } else if (kind === "windiest") {
    var wi = 0; S.days.forEach(function (d, i) { if (d.W > S.days[wi].W) wi = i; });
    var others2 = s6shuf([0, 1, 2, 3, 4].filter(function (i) { return i !== wi; })).slice(0, 3);
    q = mcq(head + "<br>On which day was the wind strongest?",
      "Day " + (wi + 1), others2.map(function (i) { return "Day " + (i + 1); }),
      "The wind speeds recorded are " + S.days.map(function (d) { return d.W + " km/h"; }).join(", ") + ". The strongest is Day " + (wi + 1) + " at " + S.days[wi].W + " km/h.",
      { kind: kind, bi: wi });
  } else if (kind === "totalrain") {
    var tot = Math.round(S.days.reduce(function (a, d) { return a + d.R; }, 0) * 10) / 10;
    var cands = [tot + 2.5, tot + 5.1, tot * 1.5 + 1, tot + 0.7];
    if (tot >= 3.2) cands.push(tot - 3.2);
    var seenT = {}; seenT[tot.toFixed(1)] = 1; var disT = [];
    s6shuf(cands).forEach(function (v) { var s = v.toFixed(1); if (!seenT[s] && disT.length < 3) { seenT[s] = 1; disT.push(s + " mm"); } });
    q = mcq(head + "<br>What was the total precipitation over the five days?",
      tot.toFixed(1) + " mm", disT,
      "Add the Precip values: " + S.days.map(function (d) { return d.R.toFixed(1); }).join(" + ") + " = " + tot.toFixed(1) + " mm.",
      { kind: kind, tot: tot });
  } else {
    var chg = Math.round((S.days[4].P - S.days[0].P) * 10) / 10;
    var ans = Math.abs(chg) <= 0.5 ? "It stayed about the same" : ("It has " + (chg > 0 ? "risen" : "fallen") + " by about " + Math.abs(chg).toFixed(1) + " hPa");
    var fixed = ["It has risen by about " + Math.abs(chg).toFixed(1) + " hPa", "It has fallen by about " + Math.abs(chg).toFixed(1) + " hPa", "It stayed about the same"];
    q = mcq(head + "<br>How did the pressure change from Day 1 to Day 5?",
      ans, fixed.filter(function (o) { return o !== ans; }).concat(["It cannot be determined from the data"]).slice(0, 3),
      "Day 1 pressure is " + S.days[0].P.toFixed(1) + " hPa and Day 5 is " + S.days[4].P.toFixed(1) + " hPa, a change of " + (chg >= 0 ? "+" : "") + chg.toFixed(1) + " hPa over the period.",
      { kind: kind, chg: chg });
  }
  return q;
}, ["Use the recorded lines one at a time and keep the units attached to each column."]);

E("sci-u1-wxdata-predict", 1, ["SC10.6.5"], 2, "gen", function () {
  var S = s6WxSeries();
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  var correct, why;
  var pool = {
    front: "Colder air arriving with northwest winds and clearing skies, as the cold front has passed and high pressure builds in",
    high: "Continued fair, dry and settled weather, with light winds and slowly warming temperatures",
    low: "Continued unsettled weather with more rain and strong winds, as the low remains in control"
  };
  if (S.arc === "front") { correct = pool.front; why = "Read the story in the data: pressure falls through Day 2, Day 3 brings the strongest winds, a shift into southwest flow, and the period's rain, then temperatures drop sharply, winds swing northwest and pressure climbs. That is a cold front passing on Day 3, so Day 6 continues the post-frontal pattern: colder, clearing, northwest winds."; }
  else if (S.arc === "high") { correct = pool.high; why = "Pressure is high and rising through the whole record, winds are light, and no precipitation falls: a high-pressure system is in control and settling in further. The fair pattern continues."; }
  else { correct = pool.low; why = "Pressure stays low all five days, winds are strong throughout, and rain falls every day: an unsettled low-pressure pattern with no sign of a front passing or a high arriving, so more of the same is the supported forecast."; }
  var distractors = Object.keys(pool).filter(function (k) { return pool[k] !== correct; }).map(function (k) { return pool[k]; });
  distractors.push("A rapid warm-up with humidex conditions and thunderstorms, as tropical air floods in");
  return mcq(head + "<br>Which forecast for Day 6 is best supported by the data?",
    correct, distractors,
    why, { arc: S.arc });
}, ["Forecast from tendency: what has the pressure been doing, and what story do the wind shifts tell?"]);

E("sci-u1-wxdata-front", 1, ["SC10.6.5"], 3, "gen", function () {
  var S = null;
  for (var t = 0; t < 30 && !S; t++) { var cand = s6WxSeries(); if (cand.arc === "front") S = cand; }
  if (!S) S = s6WxSeries();
  var head = "A school weather station records five days of data:<br>" + S.lines.join("<br>");
  return mcq(head + "<br>On which day did a cold front most likely pass the station?",
    "Day 3", ["Day 1", "Day 2", "Day 5"],
    "Day 3 is the hinge of the record: it has the strongest winds of the five days, southwest flow, and the period's heavy rain, and it is followed by a sharp temperature drop (from " + S.days[2].T + " °C to " + S.days[3].T + " °C), a wind shift to the northwest, and rising pressure. Days 1 and 2 are the warm, falling-pressure approach; Day 5 is settled post-frontal weather.",
    { arc: S.arc });
}, ["The front's day is the hinge: strongest winds and rain, then temperature, wind direction and pressure all flip their behaviour."]);

E("sci-u1-pressure-tendency", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("A barometer has fallen steadily by 8 hPa over the last 12 hours. The most likely weather development is",
      "an approaching low or front: expect increasing cloud, strengthening winds and precipitation to follow",
      ["improving weather with clearing skies, as high pressure is building in and pushing the clouds away from the region", "no change in the weather at all, because pressure changes do not affect cloud, wind or precipitation in any way", "an earthquake warning for the region, because a falling barometer is the signal used for ground movement"],
      "Falling pressure means a low or front is approaching or deepening. The faster and further it falls, the worse the coming weather tends to be. Rising pressure is the improving signal.", {});
  },
  function () {
    return mcq("After two days of rain, a station's pressure has risen 10 hPa in 24 hours and the wind has shifted northwest. The best short forecast is",
      "clearing skies and cooler air, with the fair weather likely to last a day or more",
      ["heavier rain within the hour, as the departing low deepens again just off the coast nearby", "a warm front arriving by evening, with thickening cloud and steady rain following it", "fog thickening overnight because of the pressure rise, with calm, saturated air all night"],
      "Rising pressure plus a northwest shift is the post-frontal signature: the low has moved off and a high is building in behind it. Expect clearing and cooler, drier air.", {});
  },
  function () {
    return mcq("A pressure reading of 1013 hPa that has not changed in three days tells a forecaster",
      "less than the tendency does: the same value with a falling trend would mean approaching poor weather",
      ["that fair weather is guaranteed for the whole week ahead, no matter what systems are approaching the region", "that a storm is exactly 24 hours away from the station, arriving on a fixed schedule set by that pressure value", "that the barometer must be broken, because a working instrument would never hold one reading for three days"],
      "The value alone is just near-average pressure. Forecasters read the tendency, the direction and rate of change: falling means trouble approaching, rising means improvement, steady means the current pattern persists.", {});
  }
]), ["The trend is the forecast: falling, trouble coming; rising, improvement; steady, more of the same."]);

E("sci-u1-station-model", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("A station model plots a temperature of 17 °C and a dewpoint of 16 °C, with a completely filled (black) station circle. The best interpretation is",
      "the air is nearly saturated and overcast, so fog or precipitation is likely",
      ["the air is very dry, with a wide gap between temperature and dewpoint, under a clear sky", "a cold front has just passed through, leaving cooler and drier air moving in behind it", "the station is at the centre of a high pressure system, where sinking air keeps skies clear"],
      "When the dewpoint nearly equals the temperature, the air is at saturation: cloud and precipitation processes are active, matching the filled circle (overcast). A large gap between temperature and dewpoint would mean dry air.", {});
  },
  function () {
    return mcq("On a station model, where are temperature and dewpoint plotted relative to the station circle?",
      "Temperature at the upper left, dewpoint at the lower left",
      ["Temperature at the upper right, dewpoint at the lower right", "Temperature above the circle, dewpoint inside it", "Temperature at the lower left, dewpoint at the upper left"],
      "The layout is fixed: temperature upper left, dewpoint lower left, and the coded pressure at the upper right. Reading any station model starts from knowing which number sits where.", {});
  },
  function () {
    return mcq("A station's wind shaft points toward the southeast with barbs totalling 25 knots. This means",
      "the wind is blowing FROM the northwest at 25 knots",
      ["the wind is blowing TOWARD the northwest at 25 knots", "the wind is blowing from the southeast at 25 knots", "the pressure is 25 hPa above normal"],
      "The shaft is drawn on the side the wind comes from, and the station sits at its base: the wind travels down the shaft toward the circle. A shaft on the northwest side means a northwest wind, and the barbs give its speed in knots.", {});
  }
]), ["Temperature upper left, dewpoint lower left, pressure coded upper right, and the wind shaft points back to where the wind comes from."]);

E("sci-u1-humidity", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("On a clear, calm night, grass becomes wet with dew even though no rain fell. This happens because",
      "the grass cools to the dewpoint of the air touching it, so water vapour condenses on it",
      ["the grass produces water overnight and pushes it out through its leaves by morning", "water rises from the soil through the grass blades at night and collects on them", "the air's pressure falls below the dewpoint at night, forcing vapour onto the grass"],
      "Radiational cooling drops the grass to the dewpoint temperature; vapour in contact with it condenses into liquid droplets. Dew is condensation at the surface, not rain and not water from inside the plant.", {});
  },
  function () {
    return mcq("Two towns have the same temperature, 12 °C. Town A's dewpoint is 11 °C and Town B's is 3 °C. Which statement is correct?",
      "Town A's air is much closer to saturation, so fog or cloud forms far more easily there",
      ["Town B's air holds more water vapour than Town A's, because a lower dewpoint means more vapour", "Both towns have identical relative humidity, because humidity depends only on temperature", "Town A must be raining at the moment, because air that close to saturation always rains"],
      "The temperature-dewpoint spread measures closeness to saturation: 1 degree at Town A versus 9 degrees at Town B. Town A's air needs only slight cooling to condense; Town B's air is dry. Near saturation does not guarantee rain, but it makes condensation easy.", {});
  },
  function () {
    return mcq("Relative humidity rises through a clear evening even though no moisture is added to the air. This is because",
      "the air cools toward its (unchanging) dewpoint, and cooler air reaches saturation with less vapour",
      ["evaporation speeds up as the temperature falls in the evening, adding extra vapour to the air near the ground", "the dewpoint rises all evening to meet the temperature, though the moisture stays the same", "pressure changes alter the amount of vapour present, raising the total held in the air"],
      "Relative humidity compares the vapour present to the amount needed for saturation at that temperature. Cooling shrinks the denominator, so the percentage rises until it hits 100 percent at the dewpoint and dew or fog forms.", {});
  }
]), ["Watch the gap between temperature and dewpoint: small gap, saturated air; shrinking gap, condensation coming."]);

E("sci-u1-forecast-reason", 1, ["SC10.6.5", "SC10.6.4"], 3, "var", varset([
  function () {
    return mcq("A forecaster in St. John's sees: a low southwest of Nova Scotia tracking northeast, pressure at St. John's falling steadily, and winds backing to the southeast and strengthening. The best forecast for the Avalon over the next 24 hours is",
      "increasing cloud and wind with rain arriving, heaviest as the low passes, because the region is entering the low's warm sector and frontal zones",
      ["clearing and colder conditions over the Avalon, because an approaching low brings fair weather and falling temperatures to the region ahead of its centre as a rule", "fair weather throughout the next day, because steadily falling pressure means a high-pressure system is arriving and will bring sinking, clearing air with it", "snow flurries with light winds over the Avalon, because southeast winds are always cold in this region and can only bring brief, scattered flurries with them"],
      "All three clues agree: an approaching low on the usual southwest-to-northeast track, falling pressure, and strengthening southeast flow ahead of the system. That combination delivers the low's cloud shield and frontal rain to the Avalon.", {});
  },
  function () {
    return mcq("Two forecasts are issued for a town. Forecast 1 uses only the current sunny conditions and predicts sun tomorrow. Forecast 2 uses falling pressure, thickening high cloud and a low approaching from the southwest, and predicts rain tomorrow. Forecast 2 is stronger because it",
      "is based on the system's approach signals (pressure tendency, cloud sequence and the storm track), not just persistence of current weather",
      ["uses more instruments than Forecast 1, and a greater number of instruments always produces a stronger forecast overall", "was made later in the day than Forecast 1, and a forecast issued closer to the event it predicts is automatically the more reliable of the two in every case", "assumes the weather always changes every 24 hours, so a sunny day must be followed by rain because the day has turned"],
      "Good forecasts read the dynamics: pressure tendency and the warm-front cloud sequence are the atmosphere announcing an approaching system. Assuming today repeats itself fails exactly when a system is arriving, which is when the forecast matters most.", {});
  },
  function () {
    return mcq("A cold front passed a town at noon. At 3 p.m. the sky is clearing and the temperature has dropped 6 °C, but a second band of showers is showing on radar behind the front. The best interpretation is",
      "showers can continue for a time in the unstable cold air behind the front even as the overall trend is toward clearing and colder conditions",
      ["the front has reversed direction and is coming back, bringing its main band of showers across again before evening", "a warm front is now passing, bringing a wide shield of steady rain and a slow rise in temperature through the day", "the temperature drop was an instrument error, and the air behind the front is still the warm air mass from before noon"],
      "Post-frontal cold air moving over relatively warmer ground or water is unstable and often produces scattered showers behind the main band. The trend (falling temperature, rising pressure) still says clearing overall; the radar showers are the cold air mass's own weather, not the front returning.", {});
  }
]), ["Combine independent clues: pressure tendency, cloud sequence, system track, and what the air behind a front does."]);

E("sci-u1-heatsink-data", 1, ["SC10.6.1"], 3, "var", varset([
  function () {
    return mcq("Monthly average temperatures: Town X: January -9 °C, July 21 °C. Town Y: January -1 °C, July 16 °C. Both are at the same latitude. Which conclusion is best supported?",
      "Town Y is coastal and Town X is inland: the ocean narrows Town Y's yearly temperature range (milder winter, cooler summer)",
      ["Town X is coastal and Town Y is inland: the ocean narrows Town X's yearly range while the land lets Town Y swing widely", "Town Y must be much farther south than Town X, close enough to the equator to explain its mild winter and cool summer", "The data must be wrong, because towns at one latitude have identical climates and any difference is a measuring error"],
      "Compute the ranges: Town X swings 30 degrees between January and July; Town Y swings only 17. A narrow range with milder winters and cooler summers is the fingerprint of ocean moderation, the heat sink effect in data form.", {});
  },
  function () {
    return mcq("A lake town and an inland town 80 km apart record these July overnight lows on the same clear night: lake town 17 °C, inland town 10 °C. Three nights later, under cloudy and windy conditions, the lows are 15 °C and 14 °C. The best explanation for the difference between the two nights is that",
      "on the clear calm night the inland town radiated its heat away quickly while the lake kept the shore town warm; clouds and wind on the later night reduced the contrast for both",
      ["the lake stopped storing any heat on the later night, because a lake can only hold heat for one night at a time and must release all of it before it can moderate the next night", "the inland town's altitude changed between the two nights, lifting it into colder air on the later night and removing the elevation advantage it had held over the lake town earlier", "clouds always make coastal towns colder than inland towns on summer nights, because the cloud layer reflects the lake's stored heat back down and chills the shoreline air before morning"],
      "The lake's moderation is strongest when the land can cool freely (clear and calm). Cloud cover acts like a blanket over both towns and wind mixes the air, so the land water contrast shrinks. Same heat sink, different conditions for expressing it.", {});
  }
]), ["Compute the temperature range and ask which place the ocean is smoothing out."]);

/* ---------- Constructed response (marks in the CRMARKS manifest) ---------- */

E("sci-u1-cr-climate", 1, ["SC10.6.1", "SC10.6.3"], 2, "var", varset([
  function () {
    return textq("Two towns are at almost the same latitude. Portside, on the coast, has a January average of -3 °C and a July average of 17 °C. Inland Flats, 250 km from the ocean, has a January average of -16 °C and a July average of 24 °C. Explain why Portside has the milder winter AND the cooler summer. In your answer, refer to the heat stored and released by the ocean and to the different specific heat capacities of land and water.",
      ["The ocean stores heat in summer and releases it slowly, warming Portside in winter; land heats and cools quickly so Inland Flats is colder in winter and hotter in summer"],
      "<b>Model answer:</b> Water has a much higher specific heat capacity than land, so the ocean absorbs a great deal of heat through the summer with only a slow temperature rise, and it gives that heat back slowly through the fall and winter. Portside's air is in contact with this heat store: in January the ocean is still releasing stored heat, keeping Portside at -3 °C, while Inland Flats, surrounded by land that has long since lost its summer heat, falls to -16 °C. In July the pattern reverses: the land around Inland Flats heats quickly to give 24 °C, while the ocean beside Portside is still cool from winter and absorbs heat, holding Portside to 17 °C. One mechanism, the ocean acting as a heat sink, explains both halves of the pattern.<br><br><b>Marking points:</b> 1 mark for the ocean storing summer heat and releasing it slowly. 1 mark for applying the release to Portside's milder winter. 1 mark for land's low specific heat capacity making Inland Flats heat and cool quickly (both its cold winter and hot summer). 1 mark for applying the ocean's slow warming to Portside's cooler summer.", {});
  },
  function () {
    return textq("A coastal town and an inland town sit at the same latitude, and both are under the same high-pressure system on a clear January night. By morning the inland town is 11 °C colder than the coastal town. Explain the difference, referring to how land and water gain and lose heat.",
      ["Land loses heat quickly overnight while the ocean releases stored heat slowly, keeping the coastal town warmer"],
      "<b>Model answer:</b> On a clear night both surfaces radiate heat to space. Land has a low specific heat capacity and stores little heat, so its surface and the air above it cool rapidly through the night. The ocean has stored a large amount of heat because of water's high specific heat capacity, and it conducts and mixes that heat up to the surface as the top layer cools, releasing heat to the coastal air all night. The coastal town is therefore moderated by the ocean's heat store and ends the night much warmer than the inland town, whose air has no such supply.<br><br><b>Marking points:</b> 1 mark for both surfaces losing heat by radiation overnight. 1 mark for land cooling faster because of its lower specific heat capacity and small heat store. 1 mark for the ocean releasing stored heat through the night (mixing/conduction within the water acceptable). 1 mark for tying that release to the coastal town's smaller temperature drop.", {});
  },
  function () {
    return textq("(a) Define evaporation. (1)\n(b) Define condensation. (1)\n(c) A puddle on the schoolyard shrinks on a sunny, windy afternoon even though no one touches it, and dew appears on the grass that night. Explain BOTH observations using your definitions, and state the role each process plays in the water cycle. (2)",
      ["Evaporation is liquid water changing to vapour at the surface; condensation is vapour changing back to liquid. The puddle evaporates (faster with sun and wind); overnight the grass cools the air to its dew point and vapour condenses as dew"],
      "<b>Model answer:</b> (a) Evaporation: the change of liquid water into water vapour at the surface of the liquid, as the fastest-moving molecules escape; it is the atmosphere's intake step for water. (b) Condensation: the change of water vapour back into liquid water when air cools to its dew point, forming droplets on surfaces or on particles in the air (clouds). It is the return step that makes precipitation possible. (c) The puddle shrinks because evaporation carries its water into the air; sunshine warms the water (more fast molecules) and wind sweeps the vapour away so more can follow, speeding the loss. At night the grass radiates heat and cools the air touching it to the dew point, so vapour condenses onto the cold blades as dew. In the water cycle, evaporation moves water from surfaces into the atmosphere, and condensation gathers it back into liquid form, in clouds and as dew.<br><br><b>Marking points:</b> 1 mark for the evaporation definition (liquid to vapour at the surface). 1 mark for the condensation definition (vapour to liquid at the dew point). 1 mark for explaining the puddle with evaporation, including the sun or wind effect. 1 mark for explaining the dew with cooling to the dew point, with the water-cycle roles of both processes stated.", {});
  }
]));

E("sci-u1-cr-frontpass", 1, ["SC10.6.4", "SC10.6.5"], 3, "var", varset([
  function () {
    return textq("A weather station in Gander records the following over one day. Morning: temperature 15 °C, dewpoint 14 °C, pressure falling steadily, wind from the south at 20 km/h, overcast. Midday: a band of heavy showers with gusts to 60 km/h lasting about an hour. Afternoon: temperature 7 °C, dewpoint 4 °C, pressure rising, wind from the northwest at 30 km/h, skies clearing. (a) What weather feature passed Gander at midday? (b) Give three pieces of recorded evidence that support your answer, and state what each one shows.",
      ["A cold front passed; evidence: the narrow heavy shower band, the sharp temperature drop with dewpoint drop, and the wind shift to the northwest with pressure changing from falling to rising"],
      "<b>Model answer:</b> (a) A cold front passed at midday. (b) Evidence: (1) The precipitation came as a brief, intense band of showers with strong gusts, the signature of a steep cold-frontal boundary lifting warm air abruptly (a warm front gives long, steady rain over hours). (2) Temperature fell sharply (15 °C to 7 °C) and the dewpoint fell further (14 °C to 4 °C), showing colder, drier air replacing warm, moist air. (3) The wind shifted from southerly (the warm sector) to northwesterly (the cold air behind the front), and the pressure tendency reversed from falling to rising as the low moved away and high pressure built in. Any three of these, each tied to what it shows, earn the marks.<br><br><b>Marking points:</b> 1 mark for identifying the cold front. 1 mark for the precipitation pattern evidence (brief intense band versus warm-front steady rain). 1 mark for one of: the temperature/dewpoint drop, the wind shift to the northwest, or the pressure tendency reversal, with its meaning stated.", {});
  },
  function () {
    return textq("A station in Labrador City records high, thin cloud thickening through a morning, followed by light snow beginning at noon and continuing steadily for nine hours. The temperature rises slowly from -9 °C to -4 °C during the snow, winds are from the east, and pressure falls slowly throughout. (a) What weather feature is passing? (b) Explain the order of the cloud and precipitation changes, and why the temperature rises during the event.",
      ["A warm front; the warm air slides up over the cold air producing a thickening cloud shield and steady precipitation ahead of the surface front, and the station enters the warmer air as the front passes"],
      "<b>Model answer:</b> (a) A warm front is passing. (b) A warm front's boundary slopes very gently, so the advancing warm air slides up over the cold air mass for hundreds of kilometres ahead of the surface position. High in that slope the first sign is thin cirrus cloud, which thickens and lowers as the slope's thicker part arrives, until steady precipitation begins well ahead of the surface front and continues for many hours. The temperature rises slowly during the event because the cold air at the surface is gradually being displaced by the warm air mass behind (above) the front; once the surface front passes, the station sits in the warm sector with the higher temperature established.<br><br><b>Marking points:</b> 1 mark for identifying the warm front. 1 mark for the gentle slope producing the thickening cloud sequence and wide, steady precipitation ahead of the surface front. 1 mark for the temperature rise explained by the warm air mass replacing the cold air at the station.", {});
  }
]));

E("sci-u1-cr-forecast", 1, ["SC10.6.5"], 3, "var", varset([
  function () {
    return textq("A station in Corner Brook records four days of data. Day 1: Temp 13 °C, Pressure 1018.2 hPa, Wind 12 km/h SE, Precip 0.0 mm. Day 2: Temp 15 °C, Pressure 1012.6 hPa, Wind 20 km/h S, Precip 0.0 mm. Day 3: Temp 16 °C, Pressure 1005.9 hPa, Wind 30 km/h S, Precip 3.4 mm. Day 4: Temp 14 °C, Pressure 1001.8 hPa, Wind 38 km/h SW, Precip 9.6 mm. Write a forecast for Day 5 and Day 6, and support it with at least three observations from the data.",
      ["A cold front is approaching and should pass on Day 5 with heavy showers and a wind shift to the northwest, followed by colder, clearing weather on Day 6"],
      "<b>Model answer:</b> Forecast: Day 5 brings the cold front through: a band of heavy showers or thunderstorms, gusty winds shifting to the northwest, and temperatures falling during the day. Day 6 is colder and drier with clearing skies and rising pressure as high pressure builds in behind the front. Supporting observations (any three, developed): (1) Pressure has fallen every day and the fall is accelerating (1018.2 to 1001.8 hPa, down 16.4 hPa), showing a low approaching and deepening. (2) Winds have strengthened steadily and backed into the south and southwest, the warm-sector flow ahead of a cold front. (3) Temperatures rose into Day 3 (warm sector air established) and precipitation has begun and intensified, the front's outer bands arriving. (4) The pattern matches an approaching mid-latitude low on the usual southwest-to-northeast track, whose cold front is the next feature due.<br><br><b>Marking points:</b> 1 mark for a Day 5 forecast of frontal passage (heavy showers, wind shift to the northwest, temperatures falling). 1 mark for a Day 6 forecast of colder, clearing weather with rising pressure. 1 mark for at least three data observations correctly tied to the forecast (pressure tendency, wind strengthening and direction, temperature pattern, precipitation trend).", {});
  },
  function () {
    return textq("A station in St. Anthony records four days of data. Day 1: Temp 4 °C, Pressure 1008.4 hPa, Wind 34 km/h E, Precip 6.2 mm. Day 2: Temp 5 °C, Pressure 1014.9 hPa, Wind 26 km/h NE, Precip 1.8 mm. Day 3: Temp 6 °C, Pressure 1021.3 hPa, Wind 14 km/h N, Precip 0.0 mm. Day 4: Temp 8 °C, Pressure 1027.5 hPa, Wind 8 km/h NE, Precip 0.0 mm. Write a forecast for Day 5 and Day 6, and support it with at least three observations from the data.",
      ["Fair, settled weather continuing: a high-pressure system is building in, so expect dry conditions, light winds and slowly warming temperatures"],
      "<b>Model answer:</b> Forecast: Day 5 and Day 6 stay fair and dry, with light winds and temperatures continuing to edge upward, as the high-pressure system settles over the region. Supporting observations (any three, developed): (1) Pressure has risen strongly and steadily, from 1008.4 to 1027.5 hPa (up 19.1 hPa), the signature of a high building in behind a departing low. (2) Precipitation has ended: 6.2 mm, then 1.8 mm, then none for two days, as sinking air suppresses cloud. (3) Winds have eased from 34 km/h to 8 km/h and settled into the northeast, matching the weak pressure gradient of a high. (4) Temperatures are rising slowly in the settled air. No front is approaching: nothing in the record shows falling pressure or strengthening southerly flow.<br><br><b>Marking points:</b> 1 mark for forecasting continued fair, dry, settled weather for both days. 1 mark for naming the building high-pressure system as the cause. 1 mark for at least three data observations correctly tied to the forecast (pressure rise, precipitation ending, winds easing).", {});
  },
  function () {
    return textq("Using a relative humidity chart (3 marks)\nPart of a standard relative humidity chart: at an air temperature of 20 °C, wet-bulb depressions of 1, 2, 3, 4, 5 °C give relative humidities of 91, 83, 74, 66, 59 percent. At 24 °C, the same depressions give 91, 84, 76, 68, 61 percent.\nA psychrometer at a station reads a dry-bulb temperature of 24 °C and a wet-bulb temperature of 20 °C.\n(a) Calculate the wet-bulb depression. (1)\n(b) Use the chart to find the relative humidity. (1)\n(c) Overnight the air cools toward 15 °C without gaining or losing moisture. State what happens to the relative humidity, and what forms if the air reaches its dew point. (1)",
      ["(a) 4 °C. (b) 68 percent. (c) The relative humidity rises as the air cools, and dew (or fog) forms at the dew point"],
      "<b>Model answer:</b> (a) Depression = dry bulb - wet bulb = 24 - 20 = 4 °C. (b) At 24 °C with a depression of 4 °C, the chart gives a relative humidity of 68 percent: the air holds about two thirds of the vapour it could hold at that temperature. (c) Cooling the air lowers its capacity to hold vapour while the actual vapour stays the same, so the relative humidity climbs toward 100 percent. At the dew point the air is saturated and the excess vapour condenses: dew on surfaces, or fog if the whole air layer cools.<br><br><b>Marking points:</b> 1 mark for the depression of 4 °C. 1 mark for reading 68 percent from the correct row and column. 1 mark for the humidity rising on cooling (capacity falls, vapour unchanged) with dew or fog forming at the dew point.", {});
  }
]));

/* ---------- Inventory top-ups (library slot coverage: spheres, jet stream, clouds, precipitation, mountain winds, weather lore) ---------- */

E("sci-u1-spheres", 1, ["SC10.6.1"], 1, "var", varset([
  function () {
    return mcq("Weather happens in the troposphere, the lowest layer of the atmosphere. The four Earth systems that interact to produce weather are",
      "the atmosphere, hydrosphere, lithosphere (geosphere) and biosphere",
      ["the crust, mantle, outer core and inner core", "the troposphere, stratosphere, mesosphere and thermosphere (the layers of the air alone)", "the oceans, rivers, lakes and glaciers"],
      "The systems (spheres) are the air, the water, the land and the living things. Weather is what happens where they meet: the ocean stores heat, the land reflects sunlight, and the air carries both.", {});
  },
  function () {
    return mcq("Almost all weather occurs in the troposphere because that layer",
      "holds nearly all the atmosphere's water vapour and is heated from below by the Earth's surface, so air there rises, sinks and churns",
      ["is the hottest layer of the atmosphere, so its air is always expanding and rising through the cooler layers above", "is where the ozone layer absorbs ultraviolet light, and that energy drives the rising and sinking that makes storms", "contains no gravity to hold clouds down, so droplets drift freely and gather into cloud wherever air moves upward"],
      "The troposphere is heated from the ground up, which makes it unstable and mixing, and it contains the water vapour that becomes clouds and precipitation. Weather needs both ingredients, and only this layer has them.", {});
  }
]), ["Weather is the four spheres interacting, and it lives in the lowest layer of the air."]);

E("sci-u1-jetstream", 1, ["SC10.6.3"], 1, "var", varset([
  function () {
    return mcq("The jet stream is best described as",
      "a narrow band of very strong winds high in the troposphere that flows generally from west to east",
      ["a fast ocean current along the Labrador coast that carries cold water southward past the island all year", "a river of warm air at ground level that flows across the province in winter and melts the snow it passes over", "the boundary line drawn between two air masses on a weather map, marking where cold and warm air meet below"],
      "Jet streams are high-altitude wind rivers (around 10 km up) marking the boundary between cold polar air and warmer air to the south. Airliners ride them eastbound and avoid them westbound.", {});
  },
  function () {
    return mcq("Newfoundland and Labrador's weather is strongly affected by the jet stream because it",
      "steers surface low pressure systems (storms) across the province and separates the cold air to its north from warmer air to its south",
      ["blocks all storms from reaching the Atlantic provinces, turning them southward over the ocean long before any system can make landfall in this region", "warms the ocean surface directly beneath it as it flows, heating the water under its track and changing Atlantic currents", "creates the tides in the Bay of Fundy, because its winds push the ocean water in and out of the bay on a twice-daily cycle"],
      "Storms travel along the jet stream like cars on a highway, and the province sits near its usual track: that is why systems so often sweep up the Atlantic coast toward the island and Labrador.", {});
  },
  function () {
    return mcq("In winter the jet stream over eastern Canada usually shifts",
      "southward, letting Arctic air spill down over the province more often and strengthening the storms along the boundary",
      ["northward over the pole, ending winter storms and leaving mild, settled air in place all season", "down to ground level, where it becomes a surface wind blowing across the province through the long winter", "into a north-to-south flow that stops all weather systems crossing the province until the flow returns in spring"],
      "The polar jet follows the temperature contrast. In winter the cold air mass expands south, the jet moves with it, and the island and Labrador sit more often on the cold, stormy side of the boundary.", {});
  }
]), ["The jet stream is the storm highway: high, fast, west to east, and it moves with the seasons."]);

E("sci-u1-clouds", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("Clouds form when moist air rises and cools because",
      "cooling lowers the air's capacity to hold water vapour, so the vapour condenses onto tiny particles as droplets or ice crystals",
      ["rising air gets heavier as it climbs and squeezes the water out of itself until droplets appear in the column", "the Sun's rays freeze the vapour at high altitude, turning it into ice crystals that gather into clouds", "wind blows the water vapour together into visible clumps, pushing vapour from a wide area into narrow puffs"],
      "Condensation is the trigger: a parcel of air cooled to its dew point cannot hold all its vapour, and the excess condenses on dust and salt particles. Clouds are the visible result, droplet by droplet.", {});
  },
  function () {
    return mcq("Towering cumulonimbus clouds are the type associated with",
      "thunderstorms: heavy showers, lightning and gusty winds",
      ["days of gentle, steady drizzle falling over a wide area", "fog at ground level that forms on clear, calm nights", "clear, calm winter nights with frost forming on the ground"],
      "Cumulus family clouds grow upward where air rises strongly; the biggest, cumulonimbus, reach the top of the troposphere and carry the updrafts that build lightning and downpours. Flat layered stratus brings the steady drizzle instead.", {});
  },
  function () {
    return mcq("Thin, wispy cirrus clouds high in the sky are made of",
      "ice crystals: at that altitude the air is far below freezing",
      ["liquid water droplets only, the same as a low rain cloud", "smoke from surface fires carried up to that height by winds", "frozen carbon dioxide crystals formed high in the cold air"],
      "Cirrus live at the top of the troposphere where temperatures are well below 0 C, so their moisture exists as ice crystals. Lower, warmer clouds are mostly liquid droplets.", {});
  }
]), ["Clouds are condensation made visible; their shape tells you how the air is moving."]);

E("sci-u1-precipitation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Freezing rain forms when",
      "rain falls through a shallow layer of below-freezing air near the ground and freezes on contact with cold surfaces",
      ["snowflakes partially melt and refreeze into pellets in mid-air, then bounce off cold surfaces at the ground", "the whole air column is below freezing from cloud to ground, so precipitation falls as ice the entire way down", "rain evaporates in the cloud and re-condenses as ice before it leaves the cloud, falling as a glaze on surfaces"],
      "The layer cake decides the precipitation type: freezing rain melts fully in a warm layer aloft, then lands on sub-freezing surfaces and glazes them. Pellets that refreeze in mid-air are ice pellets (sleet), a different structure.", {});
  },
  function () {
    return mcq("A winter storm drops snow on the island's west coast but rain on the Avalon Peninsula at the same time. The most likely reason is",
      "the Avalon is surrounded by ocean water that moderates its air temperature to just above freezing, while the west coast air is colder",
      ["the west coast is much closer to the North Pole, so its air stays colder while the Avalon stays farther south", "rain cannot fall west of the Long Range Mountains in winter, because high ground blocks rain from the west coast", "the Avalon receives far more sunlight in January, warming its air by several degrees during winter storms in the region"],
      "The two coasts sit in the same storm but different air: the ocean keeps coastal Avalon air marginal (near 0 C), tipping the precipitation to rain, while colder air inland and west keeps it snow. Small temperature differences near zero flip the type.", {});
  },
  function () {
    return mcq("Hail forms inside strong thunderstorm clouds because",
      "powerful updrafts carry water droplets up into freezing air repeatedly, adding layers of ice until the stones are too heavy to hold up",
      ["rain falls so fast that it freezes from the speed of its fall, turning to ice before reaching the ground below the cloud", "lightning freezes the raindrops it strikes, turning each drop it touches into a stone of ice that falls within minutes", "hailstones fall ready-made from the stratosphere, dropping through the cloud without growing on the way down"],
      "Hail is a cycling product: updraft, freeze, fall partly, rise again, grow another layer. Only the violent updrafts of cumulonimbus can keep stones aloft long enough to grow, which is why hail is a warm-season thunderstorm hazard.", {});
  }
]), ["Precipitation type is a temperature-profile question: read the column from cloud to ground."]);

E("sci-u1-mountain-winds", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("Moist air from the Gulf of St. Lawrence is forced up over the Long Range Mountains. As the air rises on the windward side it",
      "cools, its vapour condenses, and clouds and precipitation form on the slopes facing the wind",
      ["warms up and dries out, so any clouds already in the air break apart and the slopes stay clear", "stops moving entirely, pooling against the mountainside so that no clouds can form there at all", "gains water vapour from the rocks it passes over, growing warmer and heavier as it climbs"],
      "Lifting is cooling: forced ascent chills the air to its dew point, wringing out moisture as orographic precipitation. The same mechanism gives the west coast of the island its heavy rain and snow while sheltered valleys stay drier.", {});
  },
  function () {
    return mcq("After crossing a mountain range, the descending air on the leeward side typically arrives",
      "warmer and drier than it started (a foehn or chinook type wind), because it lost moisture on the way up and compresses as it sinks",
      ["colder and wetter than it started, because it picks up fresh moisture from the snowfields along the ridge as it crosses over", "at exactly the same temperature and humidity it had when it reached the shore, because moving air keeps its properties unchanged", "carrying the clouds it made on the windward side along with it, so the valleys just beyond the range receive the same heavy rain"],
      "The mountain takes its toll in moisture on the way up; the dried air then warms by compression on the way down, arriving as a warm, dry wind. Alberta's chinooks are the famous Canadian example of the same physics.", {});
  }
]), ["Mountains are weather machines: lift, cool, condense on the way up; sink, warm, dry on the way down."]);

E("sci-u1-weather-lore", 1, ["SC10.6.5"], 1, "var", varset([
  function () {
    return mcq("The old saying 'red sky at night, sailor's delight; red sky in the morning, sailor's warning' has a scientific basis in mid-latitudes because",
      "weather systems here travel west to east: a red sunset means dry air and clear skies to the west (coming our way), while a red sunrise means the clear air has passed and wet weather approaches",
      ["the colour red in the sky repels rain clouds as they approach, pushing wet systems away from any place where a red sunset is seen and drawing them toward places that see a red sunrise instead", "sailors only ever sailed in the evening, so a morning sky was never part of the saying and the warning half of it was added much later by farmers who worked the fields at dawn in all weathers", "the Sun sets in the east in mid-latitudes, so a red sunset is a view of the eastern sky where tomorrow's weather is coming from, while a red sunrise shows weather that has already gone by in the west"],
      "The lore encodes the prevailing flow: we mostly receive tomorrow's weather from the west. Dusty, dry western air at sunset promises a fine tomorrow; the same sky at dawn means the dry air is already east of us and the next system follows.", {});
  },
  function () {
    return mcq("Weather lore such as 'when the wind is from the east, it is neither good for man nor beast' (an east wind in Newfoundland often brings cold, damp weather off the Atlantic) is best judged scientifically as",
      "a local observation pattern with a real mechanism behind it, useful as a clue but no substitute for measured data and a forecast",
      ["always true in every season and more reliable than instruments, so forecasters trust it ahead of barometers", "pure superstition with no connection to real weather at all in this region, invented after storms happened", "a rule that works the same way everywhere on Earth, because an east wind brings the same weather to every coast"],
      "Good lore is compressed local experience: an easterly flow here really does cross cold ocean water first. It fails as a universal rule and cannot beat barometers and models, which is exactly how forecasters treat it: a hint, not a verdict.", {});
  }
]), ["Lore is local experience in rhyme: respect the mechanism, verify with the instruments."]);

/* ---------- STSE tranche (Nov 19, 2026): SC10.5.1, 5.3, 5.4, 5.5, 5.6 ----------
   Registered so the unit's blueprint tests (Weather Dynamics Tests 1
   and 2 of the test-shaped practice map) carry their full indicator
   coverage. Content follows the guide's Focus for Learning for each
   outcome: extreme weather for 5.1, instruments, radar, satellites
   and models for 5.3, the named Canadian contributions for 5.4,
   climate change evidence for 5.5, and the discipline pairings for
   5.6. The remaining STSE codes stay a later tranche. */

/* ---------- SC10.5.1 How science explains natural phenomena ---------- */

E("sci-u1-stse-explanation", 1, ["SC10.5.1"], 1, "var", varset([
  function () {
    return mcq("A scientific explanation of a natural phenomenon, such as a hurricane, is best described as",
      "an account of how and why it happens, built from observations and evidence and open to testing",
      ["a description of what it looks like, written down the first time anyone observes it happen", "a rule that forecasters follow when they name storms and issue warnings to the public", "a story passed down in a community that tells people how to act when the phenomenon comes"],
      "An explanation does more than describe: it gives the mechanism, the how and the why, and it rests on observations that others can check. A description, a warning rule, or a traditional story may all be useful, but none of them explains. <b>an account of how and why it happens, built from observations and evidence and open to testing</b>.", {});
  },
  function () {
    return mcq("When meteorologists explain a thunderstorm, the explanation is expected to",
      "account for the observations, such as rising moist air cooling and condensing into cloud",
      ["describe the storm using the oldest weather lore available for the region where it forms", "predict the exact minute the storm will begin, the streets it will flood, and when it ends", "list the damage the storm is likely to cause to farms, roads, and buildings in its path"],
      "A scientific explanation accounts for what is observed: the rising air, the cooling, the condensation. It does not promise impossible precision about minutes and streets, and damage lists and lore are records, not explanations. <b>account for the observations, such as rising moist air cooling and condensing into cloud</b>.", {});
  },
  function () {
    return mcq("Science attempts to explain natural phenomena by",
      "gathering evidence about them and building explanations that the evidence supports",
      ["assigning each phenomenon a name and a category so that it can be filed and reported", "recording them carefully and leaving the reasons behind them to individual opinion", "waiting until every scientist agrees before saying anything about how they happen"],
      "Naming and recording are part of science, but the explaining is done by evidence-based accounts of the process behind the phenomenon, offered as soon as the evidence supports them and revised when it does not. <b>gathering evidence about them and building explanations that the evidence supports</b>.", {});
  }
]), ["An explanation has to say how and why, and it has to rest on evidence."]);

E("sci-u1-stse-models", 1, ["SC10.5.1"], 1, "var", varset([
  function () {
    return mcq("A computer model that simulates a hurricane's track is a scientific tool because it",
      "puts an explanation of how hurricanes move into a form whose predictions can be checked",
      ["guarantees the storm will follow the exact path shown on the screen at every moment", "replaces the need to observe real storms with instruments, aircraft, and satellites", "shows the public colourful pictures of the storm so that warnings are taken seriously"],
      "A model is an explanation made runnable: it takes the current understanding of how storms move and produces a track that real observations can then confirm or correct. It guarantees nothing, and it feeds on observations rather than replacing them. <b>puts an explanation of how hurricanes move into a form whose predictions can be checked</b>.", {});
  },
  function () {
    return mcq("In science, a model of a natural phenomenon is",
      "a simplified representation built to explain observations and make testable predictions",
      ["an exact copy of the phenomenon, matching it in every detail at full size and speed", "a drawing made for textbooks, meant to be looked at rather than used to test ideas", "the final accepted account of the phenomenon, which later evidence cannot change"],
      "Models simplify on purpose: they keep the parts of a process that matter for the explanation and leave the rest out, so their predictions can be tested against the real phenomenon. <b>a simplified representation built to explain observations and make testable predictions</b>.", {});
  },
  function () {
    return mcq("A class builds a model in which warm, moist air rises, cools, and forms cloud to explain thunderstorms. The model is useful scientifically because it",
      "connects the steps of the process so the class can predict what happens when one step changes",
      ["proves that every real thunderstorm forms in exactly the same way and at the same rate as the model", "lets the class make rain indoors, which is the same thing as explaining rain outdoors in the sky", "removes the need to compare the model with real storms, since a working model is always correct"],
      "The value of the model is the chain it lays out: change the moisture or the cooling and the outcome changes in a way the class can state in advance and then check. A model that is never compared with real storms explains nothing. <b>connects the steps of the process so the class can predict what happens when one step changes</b>.", {});
  }
]), ["A model is an explanation you can run: it should predict, and its predictions can be checked."]);

E("sci-u1-stse-hurricane", 1, ["SC10.5.1"], 2, "var", varset([
  function () {
    return mcq("Meteorologists explain hurricane formation by pointing to warm ocean water (above about 26.5 °C), moist air, and weak upper winds. This explanation is scientific because it",
      "identifies the conditions that supply the storm's energy and predicts where and when storms can form",
      ["names the ocean regions where hurricanes are given personal names by the World Meteorological Organization", "describes the damage a hurricane causes once it reaches land and the flooding that follows in its wake", "records how many hurricanes have formed each season since records began in the nineteenth century"],
      "The explanation names the energy source (warm ocean water) and the conditions that let a storm organize, so it predicts the seasons and regions where hurricanes are possible. Names, damage, and counts are records about storms, not explanations of them. <b>identifies the conditions that supply the storm's energy and predicts where and when storms can form</b>.", {});
  },
  function () {
    return mcq("A nor'easter deepens rapidly as it moves up the Atlantic coast. The scientific explanation focuses on",
      "the contrast between cold continental air and warm, moist air over the ocean feeding the storm's growth",
      ["the storm's name, which comes from the direction of its strongest winds along the New England coastline", "the time of year, because nor'easters are defined as storms that occur only between November and March", "the damage reports from coastal towns, which are used to decide how strong the storm officially was"],
      "A nor'easter grows because two very different air masses meet over the coast: cold, dry continental air and warm, moist ocean air. The temperature contrast is the fuel. The name, the season, and the damage describe the storm; the contrast explains it. <b>the contrast between cold continental air and warm, moist air over the ocean feeding the storm's growth</b>.", {});
  },
  function () {
    return mcq("El Niño is an explanation built around a warming of surface water in the eastern Pacific. Scientists treat it as an explanation rather than just a description because it",
      "links the warm water to shifted rainfall and weather patterns observed on several continents",
      ["gives the warm water a memorable Spanish name that fishing crews have used for many generations", "states the average temperature of the Pacific Ocean in a normal year to two decimal places", "lists the years in which the warm water appeared, in order, from the earliest records onward"],
      "El Niño earns its place as an explanation by connecting a cause (unusually warm surface water) to effects far away (shifted rainfall and storm tracks), in a way that can be checked each time the warm water appears. <b>links the warm water to shifted rainfall and weather patterns observed on several continents</b>.", {});
  }
]), ["Look for the option that gives the mechanism: the energy source and the conditions, not the name or the damage."]);

E("sci-u1-stse-evidence-test", 1, ["SC10.5.1"], 2, "var", varset([
  function () {
    return mcq("An explanation of lake-effect snow says that cold air crossing a warm lake picks up moisture and drops it as snow on the far shore. The strongest test of this explanation is to check whether",
      "snowfall is heavy on the far shore when the air is much colder than the lake, and light when it is not",
      ["the explanation is printed in a textbook, because textbooks only publish explanations that are fully proven", "residents near the lake agree that the explanation sounds right, based on the winters they remember most", "the lake is large, because a large lake always produces heavy snow no matter what the air temperature is"],
      "The explanation makes a prediction: snow should depend on the temperature contrast between air and lake. Checking that prediction against many events, including the quiet ones, is the test. Print, memory, and lake size alone settle nothing. <b>snowfall is heavy on the far shore when the air is much colder than the lake, and light when it is not</b>.", {});
  },
  function () {
    return mcq("A student explains a tornado outbreak by pointing to warm, moist air at the surface under cold, dry air aloft, with winds changing direction with height. To test the explanation, the student should",
      "compare outbreak days with similar-looking days that produced no tornadoes, and look for what differed",
      ["ask classmates whether the explanation sounds convincing, and accept it if most of the class agrees with it", "find one outbreak that matches the explanation perfectly, and treat that single match as complete proof", "wait for the next outbreak and check whether it is stronger than the last one, since stronger means truer"],
      "A real test looks for the cases the explanation might fail: days with similar conditions but no outbreak. If the named conditions appear on both kinds of days, something is missing from the explanation. One matching case, or a class vote, proves nothing. <b>compare outbreak days with similar-looking days that produced no tornadoes, and look for what differed</b>.", {});
  },
  function () {
    return mcq("Scientific explanations of extreme weather are strengthened most when they",
      "successfully predict features of new events that were not used in building the explanation",
      ["are repeated by many media outlets in the days after a major storm has caused damage somewhere", "have been in use for a long time, since an explanation's age is the best measure of its accuracy", "are written in technical language that only specialists in the field are able to understand fully"],
      "An explanation grows stronger by surviving tests it was not designed for: predicting features of new storms correctly. Repetition, age, and technical wording are not tests. <b>successfully predict features of new events that were not used in building the explanation</b>.", {});
  }
]), ["A test compares the explanation's predictions with what actually happens, including the cases where nothing happens."]);

E("sci-u1-stse-explain-build", 1, ["SC10.5.1"], 2, "var", varset([
  function () {
    return mcq("A class investigates why one side of a mountain range is much wetter than the other. The explanation they build should be based mainly on",
      "measurements and observations of the air as it rises, cools, and sinks on either side of the range",
      ["the opinions of people who live on each side, collected in a survey about which side feels wetter", "the age of the mountains, because older ranges have had more time to sort wet air from dry air", "a single storm's rainfall totals, since one good storm shows everything about a place's climate"],
      "The wet side and the dry side are produced by what the air does at the range: rising and cooling on one side, sinking and warming on the other. Measuring that process builds the explanation; opinions and single storms cannot. <b>measurements and observations of the air as it rises, cools, and sinks on either side of the range</b>.", {});
  },
  function () {
    return mcq("Which of these is an explanation, rather than a description, of a thunderstorm?",
      "Rising moist air cools, its vapour condenses and releases heat, and the released heat drives the air higher",
      ["The storm produced 40 mm of rain in one hour, with frequent lightning and a brief period of pea-sized hail", "The storm began at 3:40 in the afternoon, moved northeast at 30 km/h, and weakened after sunset that day", "The storm was the third severe thunderstorm recorded in the region during the month of July this year"],
      "Only the key gives a mechanism: rising, cooling, condensation, and the released heat driving further rising. The others report amounts, times, and counts, which describe the storm without explaining it. <b>Rising moist air cools, its vapour condenses and releases heat, and the released heat drives the air higher</b>.", {});
  },
  function () {
    return mcq("Scientists explaining the jet stream point to the temperature contrast between polar and tropical air. This is an explanation because it",
      "gives a cause that also accounts for why the jet stream is stronger in winter than in summer",
      ["tells pilots the altitude at which the jet stream is usually found on transatlantic flights", "describes the jet stream's wavy path across a weather map in the greatest possible detail", "names the scientist who first identified the jet stream during the Second World War"],
      "The temperature contrast does explanatory work: the contrast is greatest in winter, which is exactly when the jet stream runs strongest. Altitude, path descriptions, and history are facts about the jet stream, not causes of it. <b>gives a cause that also accounts for why the jet stream is stronger in winter than in summer</b>.", {});
  }
]), ["Descriptions say what happened; explanations say why, in terms of a mechanism."]);

E("sci-u1-stse-explain-judge", 1, ["SC10.5.1"], 3, "var", varset([
  function () {
    return mcq("Two explanations are offered for a town's increasing number of floods. Explanation A blames the town's growth: pavement and roofs now cover fields that used to absorb rain. Explanation B says the river has 'always flooded and always will.' A scientist would judge A the better explanation mainly because A",
      "names a mechanism that can be checked, for example by comparing runoff before and after the town grew",
      ["is the newer of the two explanations, and in science the most recent explanation is usually the best one", "matches what most residents believe about the floods, and majority opinion is a strong form of evidence", "is stated in fewer words than B, and the simplest wording is what makes an explanation scientific"],
      "Explanation A points to a process, runoff from paved surfaces, that can be measured and compared across time. Explanation B explains nothing; it just restates that floods happen. Newness, popularity, and brevity are not scientific merits. <b>names a mechanism that can be checked, for example by comparing runoff before and after the town grew</b>.", {});
  },
  function () {
    return mcq("A fishing crew says the fog off the Grand Banks forms 'because the sea is cold.' A meteorologist's fuller explanation is that warm, moist air from the south moves over the cold Labrador Current and is chilled to its dew point. The meteorologist's version is the stronger scientific explanation because it",
      "identifies the air, the current, and the process (cooling to the dew point) in a way that predicts where fog forms",
      ["uses more technical terms than the crew's version, and technical language is what makes an explanation scientific", "comes from a person with a university degree, and explanations from credentialed people outrank all others", "is longer than the crew's version, and a longer explanation always contains more science than a shorter one"],
      "The crew's statement is true but thin. The fuller version names the moving air, the cold current, and the process, cooling to the dew point, so it predicts where and when fog will form. Length, credentials, and vocabulary do not make an explanation stronger. <b>identifies the air, the current, and the process (cooling to the dew point) in a way that predicts where fog forms</b>.", {});
  },
  function () {
    return mcq("A proposed explanation for a record-hot summer says only that 'the Sun was stronger that year.' Solar measurements for the year were normal. The explanation should be set aside mainly because it",
      "is contradicted by the evidence and offers no other mechanism that could account for the heat",
      ["was proposed by a single researcher rather than a large team working at a national laboratory", "is too short to be a real explanation, since genuine explanations fill at least a full page", "disagrees with what most people felt that summer, and public experience outranks measurements"],
      "An explanation that the measurements directly contradict cannot stand, whatever its source or length. Public impressions do not outrank instrument records. <b>is contradicted by the evidence and offers no other mechanism that could account for the heat</b>.", {});
  }
]), ["Judge an explanation by its mechanism and its evidence, not by who said it or how it is worded."]);

/* ---------- SC10.5.3 Technology enhancing or revising understanding ---------- */

E("sci-u1-stse-instruments", 1, ["SC10.5.3"], 1, "var", varset([
  function () {
    return mcq("Before weather instruments were invented, weather knowledge came from watching the sky and passing on lore. The invention of instruments such as the thermometer and barometer changed weather science mainly by",
      "making weather measurable, so records could be kept, compared, and searched for patterns",
      ["making weather predictable with complete accuracy for the first time in human history", "allowing sailors to control the weather they met on long voyages across the open ocean", "proving that weather lore and sky watching had been wrong about everything all along"],
      "Instruments turned impressions into numbers. Numbers can be recorded, compared between places, and searched for patterns, and that record-keeping is what let weather knowledge grow into a science. Instruments never gave complete accuracy or control. <b>making weather measurable, so records could be kept, compared, and searched for patterns</b>.", {});
  },
  function () {
    return mcq("Quantitative weather records, kept over many years with standard instruments, improved scientific understanding because they",
      "let scientists find patterns, such as seasonal cycles and storm tracks, that memory alone cannot hold",
      ["meant that every town's weather could be known in advance for the whole of the following year", "showed that weather follows a fixed calendar, with the same conditions returning on the same dates", "allowed governments to fine forecasters whose predictions turned out to be wrong the next day"],
      "A single observer's memory holds a few striking storms. Decades of standard records hold the patterns: when storms usually come, where they travel, and how conditions vary with the seasons. The records did not make weather follow a fixed calendar. <b>let scientists find patterns, such as seasonal cycles and storm tracks, that memory alone cannot hold</b>.", {});
  },
  function () {
    return mcq("A barometer in a school hallway is read and recorded every day for a school year. The scientific value of doing this is that it",
      "builds a measured record in which patterns, like pressure falls ahead of storms, can be identified",
      ["trains students to predict the weather a full month ahead from a single instrument's readings alone", "proves that pressure is the only weather variable worth measuring, ahead of wind and temperature", "lets the school announce the next day's weather with the same accuracy as a national weather service"],
      "The value is the record itself: a year of daily readings shows the pressure falls that precede storms and the rises that follow them, the same pattern-finding that instruments first made possible. One instrument alone does not make a forecast service. <b>builds a measured record in which patterns, like pressure falls ahead of storms, can be identified</b>.", {});
  }
]), ["Instruments turn impressions into numbers, and numbers kept over time reveal patterns."]);

E("sci-u1-stse-radar", 1, ["SC10.5.3"], 1, "var", varset([
  function () {
    return mcq("Weather radar improved the understanding of storms mainly because it",
      "shows where precipitation is falling and how it is moving, over a whole region at once",
      ["stops storms from strengthening by bouncing radio waves off the rain inside the clouds", "measures the temperature of the ground under a storm more accurately than thermometers", "lets forecasters name storms earlier in the season than was possible before it existed"],
      "Radar's gift is the regional picture: precipitation mapped continuously, so a storm's structure and movement can be watched as they happen. Radar does not weaken storms or measure ground temperature. <b>shows where precipitation is falling and how it is moving, over a whole region at once</b>.", {});
  },
  function () {
    return mcq("Before radar, a line of thunderstorms approaching a town at night could only be tracked by scattered reports. Radar changed this by",
      "revealing the line's position, direction, and speed continuously as it approached",
      ["warning each household individually by telephone as the line of storms drew closer", "weakening the line of storms by heating the rain inside it with pulses of radio energy", "showing which houses the storms would strike, street by street, hours before arrival"],
      "With radar, the line of storms is on the screen the whole time: where it is, which way it moves, and how fast. That continuous tracking replaced guesswork between scattered reports. <b>revealing the line's position, direction, and speed continuously as it approached</b>.", {});
  },
  function () {
    return mcq("Doppler radar added something plain radar could not give: it",
      "measures motion toward or away from the radar, revealing rotation inside a storm",
      ["measures the exact size of every raindrop inside a storm cloud as the rain falls", "photographs the tops of storm clouds from above, in colour, every few minutes", "predicts the weather for the same date next year by replaying this year's storms"],
      "The Doppler effect shifts the returning signal when precipitation moves toward or away from the radar. That motion data exposes rotation inside a storm, an early sign of tornado development that plain radar cannot show. <b>measures motion toward or away from the radar, revealing rotation inside a storm</b>.", {});
  }
]), ["Ask what the tool lets scientists see that they could not see before."]);

E("sci-u1-stse-satellites", 1, ["SC10.5.3"], 2, "var", varset([
  function () {
    return mcq("Weather satellites changed the understanding of hurricanes mainly because they",
      "watch storms form and move over the whole ocean, including regions with no ships or stations",
      ["photograph storms only after they reach land, where their damage can be assessed by officials", "steer storms away from populated coasts by reflecting sunlight onto the ocean surface below", "replace surface measurements entirely, since a picture from space shows everything needed"],
      "Most of a hurricane's life is spent over open ocean where nobody is watching. Satellites watch the whole ocean continuously, so storms are now seen forming, not just arriving. Surface measurements are still needed; satellites complement them. <b>watch storms form and move over the whole ocean, including regions with no ships or stations</b>.", {});
  },
  function () {
    return mcq("A forecaster in 1950 and a forecaster today both track a hurricane in the mid-Atlantic. The modern forecaster's understanding is deeper mainly because satellites provide",
      "continuous views of the storm's structure and motion, instead of occasional reports from ships",
      ["the storm's official name several weeks earlier than forecasters used to receive storm names", "a guarantee that the forecast track will not change as the storm approaches the coastline", "pictures in higher resolution than any photograph taken from an aircraft inside the storm"],
      "In 1950 a mid-ocean storm was known only when a ship happened to meet it. Satellites show its structure and motion hour by hour, which is a different depth of understanding, not just a sharper picture. <b>continuous views of the storm's structure and motion, instead of occasional reports from ships</b>.", {});
  },
  function () {
    return mcq("Satellite instruments that sense water vapour and temperature through the depth of the atmosphere improved forecasts because they",
      "supply data from the whole atmosphere over oceans and remote regions, where few other measurements exist",
      ["measure the depth of the ocean and the height of its waves, which are the main controls on the weather above it", "photograph cloud tops in colour, which is the only information forecast models are able to use as input", "count the ships and aircraft in each region, which tells forecasters where reports will come from that day"],
      "Forecast models need the atmosphere's state everywhere, including high above oceans with no weather stations. Satellite soundings supply temperature and moisture through the atmosphere's depth in exactly those gaps. <b>supply data from the whole atmosphere over oceans and remote regions, where few other measurements exist</b>.", {});
  }
]), ["Satellites filled in the map: continuous coverage where there were no observers."]);

E("sci-u1-stse-computers", 1, ["SC10.5.3"], 2, "var", varset([
  function () {
    return mcq("Computer models improved weather understanding and forecasting mainly because they",
      "apply the physics of the atmosphere to huge amounts of data faster than any human calculation",
      ["store old weather maps so that forecasters can look up what happened on the same date last year", "print weather maps in colour, which makes high and low pressure systems easier for the public to see", "remove the need for observations, since the equations alone describe the atmosphere completely"],
      "The equations of atmospheric physics were known long before they could be used: working them forward for a whole country by hand would take longer than the weather itself. Computers made the calculation faster than the weather. Models still begin from observations. <b>apply the physics of the atmosphere to huge amounts of data faster than any human calculation</b>.", {});
  },
  function () {
    return mcq("As computers grew faster and data from satellites and radar were fed into models, forecast accuracy improved. The main reason is that",
      "the models start closer to the atmosphere's real state and can follow its changes in finer detail",
      ["the models now run on the same computers that control the satellites, so the data arrive pre-sorted", "faster computers repeat the same calculation many times, and repetition by itself removes all error", "the public checks model output online, and errors are corrected by the readers who spot them first"],
      "A forecast can only be as good as its starting picture and its detail. More observations give a truer start; faster machines allow finer detail. Repetition alone fixes nothing, and the public does not correct models. <b>the models start closer to the atmosphere's real state and can follow its changes in finer detail</b>.", {});
  },
  function () {
    return mcq("A forecast model is rerun every six hours with fresh observations. Understanding of a developing storm grows between runs mainly because",
      "each run tests the previous forecast against new measurements and corrects the picture of the storm",
      ["each run adds the storm's name and category to a growing list that the public can follow in real time", "the storm weakens a little every six hours, so later runs have a simpler storm to describe accurately", "the computers rest between runs, and rested computers make fewer mistakes than ones that run steadily"],
      "Each new run is a check on the last: where the forecast and the fresh observations disagree, the starting picture is corrected. That cycle of predict, measure, and correct is how understanding of the storm sharpens. <b>each run tests the previous forecast against new measurements and corrects the picture of the storm</b>.", {});
  }
]), ["Models combine physics with fresh data; speed matters because the atmosphere will not wait."]);

E("sci-u1-stse-tech-revises", 1, ["SC10.5.3"], 2, "var", varset([
  function () {
    return mcq("Instruments carried on spacecraft have measured winds and temperatures in the atmospheres of other planets. This has revised scientific understanding mainly by",
      "showing which parts of our weather explanations are general physics and which are special to Earth",
      ["proving that the weather on other planets is identical to Earth's weather in every important detail", "allowing forecasters to issue weather forecasts for other planets that settlers will use next year", "demonstrating that Earth's atmosphere is the only one in the solar system that has moving air"],
      "Measuring another planet's atmosphere tests our explanations: the parts that also work there are general physics, and the parts that fail mark what is special about Earth. Other planets plainly have moving air of their own. <b>showing which parts of our weather explanations are general physics and which are special to Earth</b>.", {});
  },
  function () {
    return mcq("When weather balloons began carrying instruments high into the atmosphere, scientists revised their picture of the atmosphere because the balloons",
      "revealed a layer above the troposphere where temperature stops falling and begins to rise",
      ["proved that the troposphere is the only layer of the atmosphere that contains any weather", "showed that temperature falls steadily all the way to the top of the atmosphere without pause", "carried the first passengers, whose reports described the upper air better than instruments"],
      "Ground-based reasoning assumed temperature kept falling with height. Balloon instruments found the stratosphere, where temperature levels off and rises. A new instrument reached a new region and the picture had to be redrawn. <b>revealed a layer above the troposphere where temperature stops falling and begins to rise</b>.", {});
  },
  function () {
    return mcq("Automated weather buoys now report conditions from the middle of the Atlantic every hour. Understanding of ocean storms improved because the buoys",
      "provide steady measurements from a region that ships cross only occasionally and report at all hours",
      ["provide photographs of waves that artists use when painting seascapes of storms for weather offices", "frighten storms into changing course, since a storm weakens when it passes over a line of steel buoys", "measure the depth of the ocean floor, which is the main factor deciding where hurricanes will travel"],
      "A storm's strength depends on the ocean surface it crosses, and that surface was mostly unmeasured between shipping lanes. Hourly buoy reports turned a blank region into data. <b>provide steady measurements from a region that ships cross only occasionally and report at all hours</b>.", {});
  }
]), ["New instruments often do not just add detail; they show that the old picture was incomplete."]);

E("sci-u1-stse-tech-judge", 1, ["SC10.5.3"], 3, "var", varset([
  function () {
    return mcq("A town's flood records go back 80 years, but a new river gauge with radar rainfall estimates suggests the worst historical flood was probably larger than the records say. The best scientific response is to",
      "revise the estimate of the old flood using the new evidence, and note that older records carry more uncertainty",
      ["keep the old record exactly as written, because changing historical records is not permitted in science", "discard all 80 years of records, because one doubtful entry means none of the old measurements can be trusted", "average the old and new estimates and report that figure, because the truth usually lies between two sources"],
      "New measurement technology can reach back: radar rainfall estimates let scientists re-estimate an old flood more accurately. The record is revised openly, with the older figure's uncertainty stated, not frozen, discarded whole, or averaged away. <b>revise the estimate of the old flood using the new evidence, and note that older records carry more uncertainty</b>.", {});
  },
  function () {
    return mcq("Forecasters once judged a hurricane's strength mainly by the pressure at its centre measured by ships. Satellite estimates and aircraft data later showed some storms were stronger than the old method suggested. This episode best illustrates that",
      "a new measuring technology can revise what earlier measurements seemed to establish about a phenomenon",
      ["earlier scientists were careless, and their measurements should never have been trusted in the first place", "the strongest hurricane is always the most recent one, because storms have grown stronger every single year", "pressure is a useless measurement for hurricanes, and it should be dropped from forecasting altogether"],
      "The ship-based measurements were careful work with limited tools. Better tools reached the storm's centre more often and revised the estimates. That is technology revising understanding, not carelessness being exposed. <b>a new measuring technology can revise what earlier measurements seemed to establish about a phenomenon</b>.", {});
  },
  function () {
    return mcq("A school weather station's rain gauge is replaced by an electronic gauge that catches wind-blown rain better. The new gauge reports about 10 percent more rain in storms. The class should conclude that",
      "the old gauge likely under-measured storm rainfall, so long-term comparisons must account for the change of instrument",
      ["storms have suddenly become 10 percent wetter in the schoolyard, starting exactly when the new gauge was installed", "the new gauge must be faulty, because a replacement instrument should always agree exactly with the one before it", "rainfall records are pointless, since changing an instrument changes the numbers and no comparison is possible"],
      "Instruments are part of every record. A better gauge catching more wind-blown rain means the old figures ran low, and any long-term comparison has to note the change. The weather did not jump the day the gauge did. <b>the old gauge likely under-measured storm rainfall, so long-term comparisons must account for the change of instrument</b>.", {});
  }
]), ["When the tool changes, ask what that does to the comparison between old and new measurements."]);

/* ---------- SC10.5.4 Canadian contributions to science and technology ---------- */

E("sci-u1-stse-canada-anemometer", 1, ["SC10.5.4"], 1, "var", varset([
  function () {
    return mcq("The three-cup anemometer, the standard instrument for measuring wind speed at weather stations worldwide, took its modern form through the work of",
      "John Patterson, a Canadian meteorologist who redesigned it for the Meteorological Service of Canada",
      ["André Robert, a Canadian meteorologist who first simulated weather patterns on a computer in Canada", "the Canadian Space Agency, whose engineers built it for the meteorological station carried to Mars", "Environment Canada forecasters, who adopted it from ships' logs during the Second World War at sea"],
      "John Patterson of the Meteorological Service of Canada redesigned the cup anemometer into the three-cup form that became the world standard for wind measurement. The other names belong to other Canadian contributions in this unit. <b>John Patterson, a Canadian meteorologist who redesigned it for the Meteorological Service of Canada</b>.", {});
  },
  function () {
    return mcq("An anemometer at a weather station measures",
      "wind speed, from the rate at which the wind spins its cups",
      ["wind direction, from the vane that points into the wind", "air pressure, from the height of a column of mercury", "humidity, from the difference between two thermometers"],
      "The cups catch the wind and spin; the faster they turn, the faster the wind. Direction is the vane's job, pressure the barometer's, and humidity the psychrometer's. <b>wind speed, from the rate at which the wind spins its cups</b>.", {});
  },
  function () {
    return mcq("The three-cup anemometer is given as a Canadian contribution to weather science because",
      "its standard design was developed in Canada and adopted by weather services around the world",
      ["the first weather station ever built was in Canada and every later station copied its instruments", "Canada is the windiest country in the world, so its scientists had the most reason to measure wind", "cups for measuring wind were unknown anywhere else until Canadian stations exported them abroad"],
      "A contribution counts when the work was done in Canada and taken up elsewhere: Patterson's redesign became the standard instrument worldwide. <b>its standard design was developed in Canada and adopted by weather services around the world</b>.", {});
  }
]), ["Think of the instrument that spins in the wind at the top of a station mast."]);

E("sci-u1-stse-canada-humidex", 1, ["SC10.5.4"], 1, "var", varset([
  function () {
    return mcq("The humidex, used in Canadian weather reports all summer, is",
      "a scale developed in Canada that combines air temperature and humidity to describe how hot it feels",
      ["a scale developed in Canada that combines air pressure and wind speed to describe how cold it feels", "an instrument carried on weather balloons that measures humidity high in the atmosphere over Canada", "a unit for measuring rainfall, used in Canada in place of millimetres during the summer season"],
      "The humidex joins temperature and humidity into one 'feels like' number, so a humid 30 °C day can be reported as feeling like 38. It was developed by Canadian meteorologists for exactly this public warning job. <b>a scale developed in Canada that combines air temperature and humidity to describe how hot it feels</b>.", {});
  },
  function () {
    return mcq("On a day when the temperature is 30 °C and the humidex is 38, the humidex is telling the public that",
      "the humidity makes the air feel as hot as 38 °C would feel in drier air",
      ["the temperature will rise to 38 °C later in the day as the sun gets higher", "the temperature is really 30 °C but the thermometer is reading 8 degrees low", "the wind will make the air feel 8 degrees cooler than the thermometer shows"],
      "Sweat cools the body by evaporating; humid air slows that evaporation, so the body feels hotter than the thermometer reads. The humidex reports that felt temperature, not a forecast or an instrument error. <b>the humidity makes the air feel as hot as 38 °C would feel in drier air</b>.", {});
  },
  function () {
    return mcq("The humidex is a Canadian contribution to science and technology because it was",
      "created by Canadian meteorologists to communicate the health risk of hot, humid weather",
      ["created by Canadian engineers to measure the humidity inside greenhouses and cold storage", "imported into Canada from a warmer country and renamed for use in Canadian weather reports", "required by law in Canada before any other country was allowed to report how heat feels"],
      "Canadian meteorologists created the humidex so that heat warnings could speak plainly about risk: high humidex values mean the body cannot cool itself well. <b>created by Canadian meteorologists to communicate the health risk of hot, humid weather</b>.", {});
  }
]), ["Humidex joins two measurements, temperature and humidity, into one 'feels like' number."]);

E("sci-u1-stse-canada-uv", 1, ["SC10.5.4"], 1, "var", varset([
  function () {
    return mcq("The UV index, now reported worldwide with sun safety advice, began as",
      "a Canadian invention, introduced by Environment Canada to report the strength of ultraviolet radiation",
      ["a Canadian invention, introduced by Environment Canada to report the depth of the ozone layer overhead", "an American invention, introduced by the Weather Service to report the strength of ultraviolet radiation", "a European invention, introduced by the World Health Organization to rate sunscreens sold in pharmacies"],
      "Environment Canada introduced the UV index in 1992, the first scale of its kind, and it was later adopted internationally. It reports the strength of ultraviolet radiation at the surface, not the ozone layer's depth. <b>a Canadian invention, introduced by Environment Canada to report the strength of ultraviolet radiation</b>.", {});
  },
  function () {
    return mcq("A UV index of 8 means that",
      "ultraviolet radiation is very strong and unprotected skin can burn quickly",
      ["ultraviolet radiation is very weak and unprotected skin is safe all day", "the temperature will reach 8 degrees above the seasonal average that day", "eight hours of sunshine are expected before the first clouds arrive"],
      "The index runs from low to extreme; 8 sits in the 'very high' band, where sunburn can occur in well under an hour. It says nothing about temperature or hours of sunshine. <b>ultraviolet radiation is very strong and unprotected skin can burn quickly</b>.", {});
  },
  function () {
    return mcq("The UV index is an example of a Canadian contribution to science and technology because Canadian scientists",
      "developed the scale and the public reporting system that other countries later adopted",
      ["developed the sunscreen lotions that the scale recommends to the public on high-index days", "receive the most ultraviolet radiation in the world at their latitude in the summer months", "banned outdoor work on days when the index is high, a law other countries later copied"],
      "The contribution is the scale itself: a simple number that turns ultraviolet measurements into public health guidance, first reported in Canada and now used around the world. <b>developed the scale and the public reporting system that other countries later adopted</b>.", {});
  }
]), ["The index rates the Sun's burning rays, and it started in Canadian forecasts."]);

E("sci-u1-stse-canada-mars", 1, ["SC10.5.4"], 2, "var", varset([
  function () {
    return mcq("Canada's contribution to the Mars Phoenix lander was a meteorological station whose lidar instrument",
      "fired laser pulses into the Martian sky and detected snow falling from clouds above the lander",
      ["fired laser pulses into the Martian soil and measured the depth of ice buried beneath the surface", "photographed the Martian landscape in colour so that maps of the landing region could be drawn", "drilled into the Martian soil and baked samples in an oven to search for the chemicals of life"],
      "The Canadian Space Agency's meteorological station (MET) carried a lidar that aimed laser pulses upward; the reflections revealed snow falling from Martian clouds, a first. The digging and baking were other instruments' work. <b>fired laser pulses into the Martian sky and detected snow falling from clouds above the lander</b>.", {});
  },
  function () {
    return mcq("The Phoenix lander's Canadian weather station matters to weather science on Earth because it",
      "showed that instruments built for Earth's atmosphere could measure another planet's atmosphere and test our understanding",
      ["showed that Mars has the same weather systems as Earth, including hurricanes, fronts, and nor'easters in its seasons", "allowed Canadian forecasters to add Mars to the list of regions covered by the daily weather forecast for the public", "proved that the Canadian GEM model can forecast weather on any planet once it is given enough satellite pictures"],
      "A weather station working on Mars is a test of atmospheric science itself: the same physics of pressure, temperature, and airborne particles applies there, and the measurements checked that understanding. Mars does not have Earth's weather systems. <b>showed that instruments built for Earth's atmosphere could measure another planet's atmosphere and test our understanding</b>.", {});
  },
  function () {
    return mcq("Lidar, used in the Phoenix meteorological package and in atmospheric research on Earth, works by",
      "timing pulses of laser light reflected from particles in the air to locate clouds and measure winds",
      ["timing pulses of radio waves reflected from raindrops to measure how fast a storm is moving inland", "measuring the temperature of the air directly with a thermometer carried aloft by a small balloon", "collecting samples of air in bottles at different heights and analysing them later in a laboratory"],
      "Lidar is radar's optical cousin: it times laser pulses bouncing off particles in the air. The return times locate cloud layers and falling snow, on Mars and on Earth. Radio pulses describe radar instead. <b>timing pulses of laser light reflected from particles in the air to locate clouds and measure winds</b>.", {});
  }
]), ["Phoenix carried Canadian weather instruments to Mars: remember the laser that watched snow fall."]);

E("sci-u1-stse-canada-models", 1, ["SC10.5.4"], 2, "var", varset([
  function () {
    return mcq("André Robert's contribution to Canadian weather science was to",
      "produce the first computer-based simulations of weather patterns and forecasts in Canada",
      ["produce the first printed weather maps used by Canadian newspapers in the nineteenth century", "design the three-cup anemometer in the form that weather stations around the world still use", "lead the Canadian Space Agency's meteorological package aboard the Mars Phoenix lander"],
      "André Robert pioneered numerical weather prediction in Canada, running the atmosphere's equations on the early computers. The anemometer was Patterson's work and the Phoenix package came decades later. <b>produce the first computer-based simulations of weather patterns and forecasts in Canada</b>.", {});
  },
  function () {
    return mcq("The GEM model named in Canadian forecasts is",
      "Canada's operational computer model, the Global Environmental Multiscale model, used to produce forecasts",
      ["Canada's operational weather satellite, the Global Environmental Multiscale satellite, used to photograph storms", "a global exchange program in which Canadian forecasters trade places with forecasters in other countries yearly", "a gemstone-based instrument once used in Canada to judge humidity from the colour change of a cobalt salt"],
      "GEM, the Global Environmental Multiscale model, is the Canadian computer model whose runs produce the country's forecasts. It is software, not a satellite, a program, or an instrument. <b>Canada's operational computer model, the Global Environmental Multiscale model, used to produce forecasts</b>.", {});
  },
  function () {
    return mcq("Computer weather modelling is listed among Canada's contributions because",
      "Canadian researchers were pioneers in simulating the atmosphere by computer, work that continues in the GEM model",
      ["Canadian researchers own the company that builds most of the world's weather computers for national services", "computers were invented in Canada, and every forecast model since has been written by Canadian programmers", "Canada's cold climate forced its scientists to abandon observations and rely on computers earlier than others"],
      "The contribution is the pioneering work itself, from André Robert's first simulations to today's GEM model. Computers were not invented in Canada, and Canadian forecasting never abandoned observations. <b>Canadian researchers were pioneers in simulating the atmosphere by computer, work that continues in the GEM model</b>.", {});
  }
]), ["One name to remember is André Robert; the model to remember is GEM."]);

E("sci-u1-stse-canada-purpose", 1, ["SC10.5.4"], 2, "var", varset([
  function () {
    return mcq("Which pairing of a Canadian contribution with its purpose is correct?",
      "Humidex: reporting how hot humid air feels, so people can judge the health risk of heat",
      ["Humidex: reporting how cold windy air feels, so people can judge the risk of frostbite", "UV index: reporting the depth of snow that ultraviolet light has melted on a ski slope", "UV index: reporting the air pressure at the top of the atmosphere for balloon launches"],
      "The humidex is about heat stress in humid air. The cold-and-wind pairing describes the wind chill idea instead, and the UV index reports radiation strength, not snow or pressure. <b>Humidex: reporting how hot humid air feels, so people can judge the health risk of heat</b>.", {});
  },
  function () {
    return mcq("A student writing about Canadian contributions to weather science should include the Mars Phoenix meteorological station because it",
      "carried Canadian-built weather instruments, including a lidar, that measured the atmosphere of another planet",
      ["carried Canadian-built drilling equipment, including a robotic arm, that dug for signs of life in Martian soil", "was the first spacecraft to land in Canada, where its instruments were tested in Arctic conditions before launch", "proved that Canadian weather instruments are the only ones that can survive the cold of a Martian winter night"],
      "The Phoenix station was Canada's weather contribution to the mission: pressure, temperature, wind, and the lidar that detected Martian snowfall. The lander touched down on Mars, not in Canada. <b>carried Canadian-built weather instruments, including a lidar, that measured the atmosphere of another planet</b>.", {});
  },
  function () {
    return mcq("The three-cup anemometer, the humidex, and the UV index are grouped together in this unit because they are all",
      "Canadian contributions to weather science and technology that are now used around the world",
      ["Canadian contributions to weather science and technology that are used only within Canada's borders", "instruments that must be present at every Canadian weather station before a forecast can be issued", "scales that combine two weather measurements into a single number reported to the general public"],
      "One is an instrument and two are public scales; what joins them is their Canadian origin and their worldwide adoption. The anemometer is not a scale, and the scales are not station instruments. <b>Canadian contributions to weather science and technology that are now used around the world</b>.", {});
  }
]), ["Each of these began in Canada: an instrument, and two scales the public uses."]);

/* ---------- SC10.5.5 How scientific knowledge evolves ---------- */

E("sci-u1-stse-tentative", 1, ["SC10.5.5"], 1, "var", varset([
  function () {
    return mcq("To say that scientific knowledge is 'tentative' means that it",
      "is reliable and well supported, yet can change when new evidence or a better interpretation appears",
      ["is only a guess, no more trustworthy than any opinion a person might hold about the same question", "changes completely every few years, so nothing learned in science class stays true for very long", "is kept secret by scientists until they are completely certain, which usually takes many decades"],
      "Tentative is not a weakness. Scientific knowledge is the most reliable knowledge we have precisely because it is tested, and it stays open to revision when stronger evidence arrives. <b>is reliable and well supported, yet can change when new evidence or a better interpretation appears</b>.", {});
  },
  function () {
    return mcq("Scientific knowledge is best described as",
      "durable but open to revision: it lasts because it is tested, and it changes when evidence demands",
      ["final and unchangeable: once a result is published, later evidence is not allowed to overturn it", "temporary and unreliable: it lasts only until the next study is published, which replaces it fully", "a matter of opinion: it lasts as long as most scientists vote to keep believing that it is correct"],
      "The two halves belong together: durability, because tested knowledge holds up, and openness, because new evidence can still revise it. Neither finality nor voting describes science. <b>durable but open to revision: it lasts because it is tested, and it changes when evidence demands</b>.", {});
  },
  function () {
    return mcq("When new evidence conflicts with an accepted scientific explanation, scientists usually",
      "check the evidence carefully and revise the explanation if the evidence holds up",
      ["ignore the evidence, because an accepted explanation cannot be changed once printed", "abandon the whole subject area and move on to a different field of science instead", "vote on which to keep, with the explanation preferred by senior scientists winning"],
      "The first move is scrutiny: is the new evidence sound? If it is, the explanation changes to fit it. That is the normal working of science, not a crisis in it. <b>check the evidence carefully and revise the explanation if the evidence holds up</b>.", {});
  }
]), ["Tentative does not mean weak; it means evidence is allowed to change the conclusion."]);

E("sci-u1-stse-past-climate", 1, ["SC10.5.5"], 2, "var", varset([
  function () {
    return mcq("Ice cores, tree rings, and fossils are used as evidence that Earth's climate has changed naturally in the past because they",
      "preserve records of past conditions, such as temperatures and air composition, from before instruments existed",
      ["preserve the written weather diaries of people who lived thousands of years ago in many parts of the world", "show that the climate has never actually changed, since the records in all three agree with today's climate", "allow scientists to control the climate of the past in a laboratory and rerun it under different conditions"],
      "These are proxy records: nature stored the data. Ice holds ancient air, rings record growing conditions year by year, and fossils mark where warmth-loving species once lived. Together they show climates very different from today's. <b>preserve records of past conditions, such as temperatures and air composition, from before instruments existed</b>.", {});
  },
  function () {
    return mcq("Air bubbles trapped in old ice are especially valuable evidence because they",
      "are samples of the ancient atmosphere itself, so its gases can be measured directly",
      ["are samples of ancient seawater, so the salt content of old oceans can be measured", "contain pollen from ancient plants, so the species living then can be identified", "contain tiny thermometers left by the climate, so past temperatures read directly"],
      "The bubbles are the past atmosphere, sealed in the ice as it formed. Melting a dated layer releases air from that year, and its carbon dioxide can be measured directly rather than inferred. <b>are samples of the ancient atmosphere itself, so its gases can be measured directly</b>.", {});
  },
  function () {
    return mcq("Tree rings provide evidence about past climate because",
      "wide and narrow rings record years of good and poor growing conditions, building a dated climate record",
      ["wide and narrow rings record the age of the forest, which is the same thing as a record of the climate", "each ring contains a sample of the air from its year, which can be analysed like the air in ice cores", "rings grow only in warm years, so counting them counts the warm years in a region's climate history"],
      "Trees add one ring a year, and the ring's width tracks the growing conditions of that year. Matching patterns across many trees builds a dated record centuries long. The air samples belong to ice cores, not rings. <b>wide and narrow rings record years of good and poor growing conditions, building a dated climate record</b>.", {});
  }
]), ["These are proxy records: nature kept the data before anyone was measuring."]);

E("sci-u1-stse-co2-evidence", 1, ["SC10.5.5"], 2, "var", varset([
  function () {
    return mcq("Graphs of atmospheric carbon dioxide and of Earth's surface temperature over the past century show the two rising together. The scientific importance of this pattern is that it",
      "matches what the greenhouse explanation predicts, adding evidence that the added gases are warming the planet",
      ["matches the predictions of every explanation equally well, so it adds no evidence for one over the others", "proves by itself, with no other evidence needed, exactly how much of the warming each gas is responsible for", "shows that temperature causes carbon dioxide to rise, which settles the direction of the relationship fully"],
      "Evidence supports an explanation when the explanation predicted the pattern in advance. The greenhouse account predicted that adding these gases would warm the surface, and the paired rise is one of several lines of evidence, not a stand-alone proof of each gas's share. <b>matches what the greenhouse explanation predicts, adding evidence that the added gases are warming the planet</b>.", {});
  },
  function () {
    return mcq("Weather and climate are different, and the difference matters when judging climate evidence because",
      "climate is the long-term pattern, so one cold winter does not overturn decades of temperature records",
      ["climate is the long-term pattern, so one cold winter proves that the warming trend has ended for good", "weather is the long-term pattern, so one hot summer is enough to establish a new climate for a region", "weather and climate are two names for the same thing, so daily records and century records are equal"],
      "Weather is the day-to-day state; climate is the pattern over decades. A single cold winter is weather, fully compatible with a warming climate trend, just as one hot summer cannot establish a climate by itself. <b>climate is the long-term pattern, so one cold winter does not overturn decades of temperature records</b>.", {});
  },
  function () {
    return mcq("Measurements since 1880 show Earth's surface warming, with the recent rate faster than in earlier warming periods. Scientists connect the faster rate to human activity mainly because",
      "the timing matches the rise in human-produced greenhouse gases, and the gases' warming effect is well understood",
      ["the timing matches the growth of cities, and pavement alone is known to raise the temperature of the whole planet", "earlier warming periods were not measured by satellites, so their rates are assumed to have been slower than now", "human activity is the only possible cause of any warming, since natural causes of warming stopped long ago"],
      "Two things line up: the warming accelerated as human-produced greenhouse gases accumulated, and the physics of how those gases trap heat is established. Natural causes still operate; they do not explain the recent rate. <b>the timing matches the rise in human-produced greenhouse gases, and the gases' warming effect is well understood</b>.", {});
  }
]), ["Match the evidence to the prediction: what would the greenhouse explanation lead you to expect?"]);

E("sci-u1-stse-revision-examples", 1, ["SC10.5.5"], 2, "var", varset([
  function () {
    return mcq("Louis Pasteur's swan-neck flask experiments changed scientific knowledge because they",
      "provided evidence against the accepted idea that microbes generate spontaneously from broth",
      ["provided the first microscope powerful enough to see the microbes living in the broth itself", "proved that microbes can never grow in broth under any conditions, sterile or not, ever again", "showed that broth is the natural home of microbes, which is where all microbes originate"],
      "Broth stayed sterile in the swan-neck flasks until the neck was broken and microbes could enter. The accepted idea, spontaneous generation, could not survive that evidence, and it was replaced. <b>provided evidence against the accepted idea that microbes generate spontaneously from broth</b>.", {});
  },
  function () {
    return mcq("Alfred Wegener proposed that continents drift, but his idea was not accepted for decades. It became accepted knowledge mainly when",
      "new evidence, from the ocean floor and from magnetism recorded in rocks, corroborated the drifting",
      ["new generations of scientists simply became more willing to believe unusual ideas than earlier ones", "Wegener's supporters won a famous debate against his critics at a large scientific meeting in Europe", "satellites photographed the continents in motion, moving several centimetres during a single year"],
      "Wegener lacked a mechanism, and his evidence was thin. Seafloor spreading and magnetic stripes in ocean rocks supplied the corroboration in the 1960s, and drifting continents became plate tectonics. The change was driven by evidence, not by debate or fashion. <b>new evidence, from the ocean floor and from magnetism recorded in rocks, corroborated the drifting</b>.", {});
  },
  function () {
    return mcq("The Mars Phoenix lander dug into Martian soil and found ice that scientists had hypothesized was there. The finding illustrates knowledge evolving because",
      "a prediction drawn from earlier evidence was tested by new evidence gathered on the spot",
      ["a prediction drawn from earlier evidence was replaced by a guess that happened to be lucky", "scientists finally agreed to stop testing the idea and accept it on the word of the mission", "the ice proved that every earlier statement about Mars had been completely wrong all along"],
      "Orbital evidence had suggested ice below the surface; Phoenix dug and confirmed it. Knowledge evolved in the ordinary scientific way: a supported prediction met a direct test. <b>a prediction drawn from earlier evidence was tested by new evidence gathered on the spot</b>.", {});
  }
]), ["In each story, the turning point is new evidence, not a vote or a debate."]);

E("sci-u1-stse-greenhouse-evidence", 1, ["SC10.5.5"], 2, "var", varset([
  function () {
    return mcq("Human-produced greenhouse gases contribute to the enhanced greenhouse effect because they",
      "absorb heat radiated from Earth's surface and slow its escape to space, warming the lower atmosphere",
      ["absorb sunlight before it reaches Earth's surface and reflect most of it back into space unused", "form a solid layer high in the atmosphere that works like the glass roof of a garden greenhouse", "increase the amount of energy the Sun produces, so more sunlight arrives at the top of the atmosphere"],
      "The gases act on the outgoing side: the surface radiates heat upward, greenhouse gases absorb much of it and return part of it, so the lower atmosphere warms. There is no solid layer, and the Sun's output is not changed by our gases. <b>absorb heat radiated from Earth's surface and slow its escape to space, warming the lower atmosphere</b>.", {});
  },
  function () {
    return mcq("As evidence of an enhanced greenhouse effect accumulated, scientific statements about climate change were revised to",
      "state more firmly, and in more detail, that human activity is warming the climate",
      ["state more firmly, and in more detail, that human activity is cooling the climate", "remove the role of evidence entirely and rest only on computer model projections", "assign the whole change to the Sun, whose output was found to be rising quickly"],
      "Revision here meant strengthening: more evidence, from surface records, oceans, ice, and the upper atmosphere, made the human role clearer and the statements more confident and specific. <b>state more firmly, and in more detail, that human activity is warming the climate</b>.", {});
  },
  function () {
    return mcq("A graph shows carbon dioxide rising steadily while temperature rises in a jagged line with the same upward trend. The jaggedness of the temperature line is best explained by",
      "year-to-year weather variability layered on top of the long-term climate trend",
      ["year-to-year errors in the thermometers layered on top of the long-term climate trend", "carbon dioxide falling in the years when temperature dips, then rising again after", "the graph being drawn from too few years, since temperature records began only recently"],
      "Individual years bounce with weather: volcanic eruptions, ocean cycles, and ordinary variation. The trend underneath is the climate signal. The dips are not thermometer failures, and carbon dioxide does not fall in the dip years. <b>year-to-year weather variability layered on top of the long-term climate trend</b>.", {});
  }
]), ["The gases trap outgoing heat; the evidence trend is long-term, with weather noise on top."]);

E("sci-u1-stse-new-evidence", 1, ["SC10.5.5"], 3, "var", varset([
  function () {
    return mcq("A coastal community's tide gauge, installed in 1960, showed sea level rising 2 mm per year. Satellite measurements since 1993 show the local rate is now 4 mm per year. The most scientific conclusion is that",
      "the rate of sea level rise has increased, and the earlier figure should be updated using the fuller record",
      ["the rate of sea level rise has decreased, and the satellite figure should be discarded as an instrument error", "one of the instruments must be entirely wrong, since two measurements of the same thing can never differ", "sea level science should report the average of the two rates, because averaging is what scientists always do"],
      "The two instruments measured different periods. Read together, they show the rate itself grew: the honest move is to update the figure with the fuller record, not to discard a measurement or split the difference. <b>the rate of sea level rise has increased, and the earlier figure should be updated using the fuller record</b>.", {});
  },
  function () {
    return mcq("New fossil evidence shows that a region believed to have been ice-covered 15,000 years ago was actually ice-free then. The best response for a textbook author is to",
      "revise the account of the region's past climate, since the new evidence changes what the record supports",
      ["revise nothing, since a textbook's account of the past should stay fixed once it has been published", "discard the fossil evidence, since a single fossil find is never allowed to change an accepted account", "mention both versions without judging, since scientific accounts are not supposed to prefer evidence"],
      "A textbook's duty is to the evidence. One well-established fossil find can outweigh an older inference, and the account should change to say what the record now supports. <b>revise the account of the region's past climate, since the new evidence changes what the record supports</b>.", {});
  },
  function () {
    return mcq("A student says, 'Scientists changed their minds about this, so science cannot be trusted.' The strongest reply is that",
      "changing conclusions in response to new evidence is exactly how science corrects itself and earns trust",
      ["changing conclusions in response to new evidence is exactly how science admits that its methods failed", "scientists never actually change their minds; the student has misunderstood how textbooks are written", "trust in science rests on scientists being right the first time, so changes of mind should be hidden"],
      "A system that never changed its conclusions would be the untrustworthy one. Science earns trust by tying its conclusions to evidence, including when that means revising them. <b>changing conclusions in response to new evidence is exactly how science corrects itself and earns trust</b>.", {});
  }
]), ["Ask what the new evidence does to the old conclusion: update, not average and not ignore."]);

/* ---------- SC10.5.6 Relating activities to science disciplines ---------- */

E("sci-u1-stse-disciplines", 1, ["SC10.5.6"], 1, "var", varset([
  function () {
    return mcq("The study of weather and its forecasting is the discipline called",
      "meteorology",
      ["hydrology", "oceanography", "climatology"],
      "Meteorology is the study of the atmosphere and weather. The neighbouring fields study water, oceans, and long-term climate instead. <b>meteorology</b>.", {});
  },
  function () {
    return mcq("The study of ocean currents and the oceans' movement is",
      "oceanography",
      ["meteorology", "hydrology", "climatology"],
      "Oceanography covers the oceans: their currents, their coasts, and their water. Weather, fresh water, and climate patterns belong to the other fields named. <b>oceanography</b>.", {});
  },
  function () {
    return mcq("The study of long-term climate patterns and how they change is",
      "climatology",
      ["meteorology", "oceanography", "hydrology"],
      "Climatology works at the scale of decades and longer: the patterns we call climate and how they shift. Day-to-day weather is meteorology's scale. <b>climatology</b>.", {});
  }
]), ["Match the thing studied to the field that studies it: air, ocean, or climate."]);

E("sci-u1-stse-disciplines-more", 1, ["SC10.5.6"], 1, "var", varset([
  function () {
    return mcq("Analyzing atmospheric pressure, a property of forces and fluids, draws most directly on",
      "physics, the study of forces, fluids, and energy transfers",
      ["chemistry, the study of substances and how they react", "biology, the study of living organisms and their processes", "geology, the study of rocks and the solid Earth's structure"],
      "Pressure is force spread over an area, a core physics idea, and the guide pairs atmospheric pressure analysis with physics for exactly that reason. <b>physics, the study of forces, fluids, and energy transfers</b>.", {});
  },
  function () {
    return mcq("Investigating how the material a surface is made of affects its albedo draws most directly on",
      "chemistry, the study of substances and their properties",
      ["physics, the study of forces and energy in the world", "biology, the study of living things and their habitats", "geology, the study of rocks and the Earth's deep structure"],
      "The guide pairs albedo investigations with chemistry: how a material's composition and surface properties decide whether it absorbs or reflects energy. <b>chemistry, the study of substances and their properties</b>.", {});
  },
  function () {
    return mcq("Studying the water cycle, the movement of water through land, lakes, and air, is the work of",
      "hydrology, the study of water moving through the environment",
      ["meteorology, the study of weather and the atmosphere's behaviour", "oceanography, the study of the oceans and their currents and coasts", "climatology, the study of long-term climate patterns and their change"],
      "Hydrology follows water through the environment: evaporation, rivers, groundwater, and lakes. The water cycle is its home ground. <b>hydrology, the study of water moving through the environment</b>.", {});
  }
]), ["The guide pairs pressure with physics, surface materials with chemistry, and the water cycle with hydrology."]);

E("sci-u1-stse-personal-activities", 1, ["SC10.5.6"], 2, "var", varset([
  function () {
    return mcq("A student checks a weather app, chooses a jacket, and notes the wind for an afternoon sail. Relating these activities to science disciplines, the wind check for sailing draws most on",
      "meteorology, the study of weather and the atmosphere's behaviour",
      ["climatology, the study of long-term climate patterns and change", "hydrology, the study of water's movement through land and lakes", "geology, the study of rocks and the structure of the solid Earth"],
      "This afternoon's wind is weather, and weather is meteorology's subject. Climate patterns, fresh water, and rocks are other fields' subjects. <b>meteorology, the study of weather and the atmosphere's behaviour</b>.", {});
  },
  function () {
    return mcq("A farmer studies soil moisture and stream flow before irrigating a field. These activities relate most directly to",
      "hydrology, the study of water in the environment and its movement",
      ["meteorology, the study of weather and the atmosphere's behaviour", "oceanography, the study of the oceans and their currents and life", "climatology, the study of long-term climate patterns and change"],
      "Soil moisture and stream flow are water moving through the land, which is hydrology's territory, even though the farmer's purpose is practical. <b>hydrology, the study of water in the environment and its movement</b>.", {});
  },
  function () {
    return mcq("A harbour master predicts how a storm surge will move through a bay. The prediction draws most directly on",
      "oceanography, the study of the oceans, their currents, and their coasts",
      ["meteorology, the study of weather and the atmosphere's behaviour alone", "hydrology, the study of water's movement through rivers and groundwater", "geology, the study of rocks and the structure of the solid Earth itself"],
      "A surge is ocean water piling against a coast: oceanography's ground, even though the storm driving it is weather. The question asks for the most direct field. <b>oceanography, the study of the oceans, their currents, and their coasts</b>.", {});
  }
]), ["Name what is being studied: air, fresh water, or ocean, then pick the matching field."]);

E("sci-u1-stse-interdisciplinary", 1, ["SC10.5.6"], 2, "var", varset([
  function () {
    return mcq("Modern weather prediction is an interdisciplinary study because it combines",
      "meteorology with mathematics, statistics, and computer modelling",
      ["meteorology with the folklore and weather lore of coastal communities", "meteorology with astrology and the reading of signs in animal behaviour", "meteorology with geography alone, since maps are its only other tool"],
      "A forecast is meteorology computed: the atmosphere's physics, handled with mathematics and statistics, run on computers. Lore and signs are not part of the method, and maps are only its display. <b>meteorology with mathematics, statistics, and computer modelling</b>.", {});
  },
  function () {
    return mcq("Analyzing an ice core to reconstruct past climate is interdisciplinary because it draws on",
      "chemistry for the trapped gases, paleontology for fossil evidence, and climatology for the climate record",
      ["chemistry for the trapped gases, and no other field, since the ice itself holds all the needed evidence", "geography for the drilling location, and no other field, since the location decides what the ice can show", "history for the age of the ice, and no other field, since dating the layers is the whole of the analysis"],
      "The guide's own example: gases need chemistry, the living remains need paleontology, and the pattern they build is climatology. No single field carries the whole analysis. <b>chemistry for the trapped gases, paleontology for fossil evidence, and climatology for the climate record</b>.", {});
  },
  function () {
    return mcq("Studying the effect of ocean acidification on cold-water corals is interdisciplinary because it involves",
      "biology, chemistry, ecology, and oceanography working on one problem together",
      ["biology alone, since corals are living things and the rest is background detail", "chemistry alone, since acidity is a chemical property and the rest is description", "oceanography alone, since the corals live in the ocean and the rest is commentary"],
      "The corals are biology, the acidification is chemistry, the community effects are ecology, and the setting is oceanography. The problem sits across all four, which is what makes the study interdisciplinary. <b>biology, chemistry, ecology, and oceanography working on one problem together</b>.", {});
  }
]), ["Interdisciplinary means two or more fields genuinely needed, not one field with decorations."]);

E("sci-u1-stse-discipline-apply", 1, ["SC10.5.6"], 2, "var", varset([
  function () {
    return mcq("A research team measures how fast a glacier's meltwater stream carries sediment downhill. The team's work relates most directly to",
      "hydrology, through the movement of water across the land",
      ["climatology, through the movement of water across the land", "meteorology, through the movement of water across the land", "oceanography, through the movement of water across the land"],
      "A meltwater stream is water moving across the land, and following water through the environment is hydrology's work, whatever the stream's source. <b>hydrology, through the movement of water across the land</b>.", {});
  },
  function () {
    return mcq("A scientist studies how the Labrador Current affects spring temperatures in coastal Labrador. The work relates most directly to",
      "oceanography, through the movement of ocean water and its stored heat",
      ["hydrology, through the movement of ocean water and its stored heat", "meteorology, through the movement of ocean water and its stored heat", "climatology, through the movement of ocean water and its stored heat"],
      "A current is the ocean in motion, carrying stored heat with it. Studying that movement and its effects is oceanography. <b>oceanography, through the movement of ocean water and its stored heat</b>.", {});
  },
  function () {
    return mcq("A student investigates whether darker pavement makes city blocks hotter than grassy ones. The investigation relates most directly to",
      "chemistry and physics, through how materials absorb and reflect energy",
      ["biology and ecology, through how materials absorb and reflect energy", "geology and hydrology, through how materials absorb and reflect energy", "astronomy and geology, through how materials absorb and reflect energy"],
      "The question is about materials and energy: what a surface is made of (chemistry's side of albedo) and how it takes in or reflects energy (physics). The living and rock fields are not the direct route here. <b>chemistry and physics, through how materials absorb and reflect energy</b>.", {});
  }
]), ["Follow the water, the air, or the material: the thing studied names the field."]);

E("sci-u1-stse-interdisciplinary-why", 1, ["SC10.5.6"], 3, "var", varset([
  function () {
    return mcq("Emerging problems such as ocean acidification increasingly require interdisciplinary teams mainly because",
      "the problems cross the boundaries of single disciplines, so no one field holds all the needed methods and knowledge",
      ["the problems are too large for one scientist's lifetime, so teams are needed simply to finish the work in time", "governments require every funded project to list several disciplines, whether or not the problem needs them", "scientists in single disciplines have stopped making discoveries, so combining fields is the only way forward"],
      "Acidification is at once chemistry, biology, ecology, and oceanography. The team exists because the problem does not respect the boundaries, not because of funding rules or a failure of single fields. <b>the problems cross the boundaries of single disciplines, so no one field holds all the needed methods and knowledge</b>.", {});
  },
  function () {
    return mcq("A university advertises a program in hydrometeorology, joining the study of water and weather. The strongest reason such combined fields exist is that",
      "water and weather continually affect each other, so studying them together answers questions neither field settles alone",
      ["water and weather are the same subject, so the two older fields were merged to save universities the cost of both", "students prefer shorter program names, and combining fields produces the shortest names for university calendars", "the older fields ran out of questions to study, so their scientists combined them to keep their departments open"],
      "Rain is weather becoming water; evaporation is water becoming weather. Where two systems drive each other, a combined field answers questions that fall between the two parents. <b>water and weather continually affect each other, so studying them together answers questions neither field settles alone</b>.", {});
  },
  function () {
    return mcq("A climatologist, a chemist, and a marine biologist study the same melting sea ice. Their collaboration is interdisciplinary in the useful sense because",
      "each contributes methods and knowledge the others do not have, and the combined picture explains more than any one view",
      ["each contributes the same methods and knowledge as the others, and agreement among three fields settles the question", "three scientists always produce a better answer than one, whatever their fields, since more people means more truth", "their three fields are traditionally rivals, and collaboration is valued chiefly because it ends the rivalry"],
      "The test of a real interdisciplinary team is difference put to work: the chemist's gas analysis, the biologist's organisms, the climatologist's long record. Three identical viewpoints would add nothing. <b>each contributes methods and knowledge the others do not have, and the combined picture explains more than any one view</b>.", {});
  }
]), ["The test of a real interdisciplinary team: does each field supply something the others lack?"]);
