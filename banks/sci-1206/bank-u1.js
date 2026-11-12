// CRMARKS: sci-u1-cr-climate=4
// CRMARKS: sci-u1-cr-frontpass=3
// CRMARKS: sci-u1-cr-forecast=3
// Science 1206 Unit 1 bank: Weather Dynamics (SC10.6.1 to 6.5).
// Original entries written for this app from the question types in
// the source analysis (heat sinks, heat transfer, currents, weather
// systems, meteorological data). Synoptic map reading items are held
// out pending Jason's approval of the weather map prototype; the
// unit's diagram types that launch are front symbols, the wind belt
// diagram and generated data records (s6WxSeries in bank-helpers.js).

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
      ["the coast receives more direct sunlight in winter than the interior", "ocean water freezes and gives off heat all winter long", "winds blow only from the ocean toward Town A"],
      "At the same latitude both towns receive the same sunlight. The difference is storage: the ocean absorbed heat all summer and releases it slowly, so the coastal town stays milder. The inland town, surrounded by land that cools quickly, gets much colder.", {});
  },
  function () {
    return mcq("On a summer afternoon, the sand at a beach is too hot to walk on while the ocean water beside it is still cool. This happens because",
      "land has a lower specific heat capacity than water, so the sand's temperature rises faster",
      ["the Sun shines more strongly on sand than on water", "the water reflects all of the Sun's energy", "the sand absorbs heat and the water does not"],
      "Both surfaces receive the same sunlight. Sand (land) heats quickly because it takes little energy to raise its temperature; water needs much more energy for the same rise, so it stays cool. Both absorb energy: the difference is how much their temperatures change.", {});
  },
  function () {
    return mcq("A coastal city and an inland city have the same summer daytime high of 24 °C. At midnight the coastal city is at 19 °C and the inland city is at 11 °C. The coastal city cools less overnight because",
      "the nearby ocean releases stored heat, slowing the cooling of the air above the coast",
      ["the ocean produces heat during the night", "clouds never form over coastal cities", "the land near the coast cannot lose heat"],
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
      ["Earth is closest to the Sun in September", "the Labrador Current stops flowing in the fall", "daylight lasts longer in September than in June"],
      "The ocean is a slow heat store. It lags the seasons: still cold in spring, still warm in early fall. Day length peaks in June, so sunlight alone cannot explain a September warm peak.", {});
  },
  function () {
    return mcq("Gardeners near a large lake can often grow plants that would be killed by early frost a short distance inland. The lake helps because it",
      "releases stored heat at night and in the fall, keeping nearby air a few degrees warmer",
      ["reflects extra sunlight onto the plants in the evening", "stops frost from forming anywhere in the region", "raises the altitude of the shoreline"],
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
      ["has a higher albedo than the ice, so it reflects more sunlight", "blocks sunlight from reaching the remaining ice", "cools the air, which then freezes more water elsewhere"],
      "This is the ice-albedo feedback: ice reflects, water absorbs. Losing ice replaces a reflector with an absorber, adding heat, which melts more ice. The loop reinforces itself.", {});
  },
  function () {
    return mcq("Two fields side by side receive equal sunlight. One is bare dark soil and the other is covered with light-coloured straw mulch. After several hours, the air just above the soil field is warmer mainly because the soil",
      "absorbed more sunlight due to its lower albedo and heated the air in contact with it",
      ["reflected more sunlight into the air above it", "stored heat from the previous night", "blocked the wind from cooling it"],
      "Dark soil absorbs more sunlight (lower albedo), becomes hotter, and heats the air touching it by conduction and then convection. Reflected sunlight mostly passes back through the air without warming it directly.", {});
  },
  function () {
    return mcq("A town paints its flat rooftops white. The most likely local effect on a sunny summer day is",
      "slightly cooler air temperatures in the town, because less solar energy is absorbed by the roofs",
      ["warmer air temperatures, because white surfaces store more heat", "no change, because albedo does not affect temperature", "more rainfall, because reflected sunlight seeds clouds"],
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
      ["absorbing energy from the air, which makes the cloud sink", "having no effect, because changes of state involve no energy", "cooling the air, which is why clouds are cold on top"],
      "Condensation is evaporation in reverse: the stored latent energy is released as heat into the cloud air. That extra warmth is a real engine inside storms, making the air more buoyant.", {});
  },
  function () {
    return mcq("Which step of the water cycle moves the largest amount of energy from the ocean into the atmosphere?",
      "Evaporation from the ocean surface, with the energy released later when the vapour condenses",
      ["Rain falling back into the ocean", "Rivers flowing from land to the sea", "Ocean currents flowing poleward"],
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
      ["metal absorbs more heat from the water because it is heavier", "wood reflects the heat back into the water", "the water heats metal by convection but wood by conduction"],
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
      ["absorbs the heat and stores it until night", "reflects all infrared radiation back into the room", "creates a vacuum that blocks radiation"],
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
      ["the Moon's gravity alone", "differences in the salt content of the water only", "heat conducted up from Earth's core"],
      "Wind friction starts surface water moving; Coriolis bends the flow and continents redirect it into the great gyres. The Moon drives tides, and deep circulation involves density, but surface currents are wind-driven.", {});
  },
  function () {
    return mcq("Warm surface currents generally flow",
      "from the equator toward the poles along the eastern sides of ocean basins (western sides of oceans carry them poleward), carrying heat with them",
      ["from the poles toward the equator on both sides of every ocean", "in straight lines from east to west everywhere", "only in the Southern Hemisphere"],
      "Currents redistribute the heat the tropics absorb: warm water moves poleward and cold water returns equatorward. The Gulf Stream carrying warm water past the Atlantic provinces is the local example.", {});
  },
  function () {
    return mcq("The water in a current keeps moving in a curve even after the wind pattern changes, partly because of inertia, but the large-scale curving of ocean gyres is set by",
      "the Coriolis effect and the shape of the continents",
      ["the saltiness of the water", "the depth of the ocean floor", "the pull of the Sun's gravity"],
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
      ["warm water that makes the coast warmer than inland areas in winter", "dry desert-like conditions to the coast", "hurricanes toward the province every summer"],
      "The Labrador Current is a cold current: it chills the air above it, keeps summers cool, carries icebergs south, and where its cold air undercuts warm moist air from the Gulf Stream region, fog forms. It is a major reason the province's east coast is cooler than places at the same latitude in Europe.", {});
  },
  function () {
    return mcq("Western Europe at the same latitude as Labrador has much milder winters. A major reason is that Europe is warmed by",
      "the warm North Atlantic Drift (an extension of the Gulf Stream) flowing past its coasts",
      ["the Labrador Current flowing toward Europe", "hot winds blowing off the Sahara in winter", "heat conducted through the Atlantic Ocean floor"],
      "Warm currents carry tropical heat to Europe's coasts while cold currents carry Arctic water past Labrador. Same latitude, opposite currents, opposite climates: currents move heat, and coasts feel it.", {});
  },
  function () {
    return mcq("Grand Banks fog forms most often when",
      "warm, moist air from over the Gulf Stream moves over the cold water of the Labrador Current and is chilled to its dewpoint",
      ["cold dry air moves over warm water in winter", "the Labrador Current stops flowing", "high pressure pushes the fog out to sea"],
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
      ["colder temperatures, because a warm current pushes cold air ahead of it", "no change, because currents do not affect the air above them", "much drier winters, because warm water absorbs moisture from the air"],
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
      ["blocking warm winds from ever reaching the coast", "reflecting sunlight back into space from the water surface", "pulling all of the region's rain clouds out to sea"],
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
      ["Continental Arctic (cA) air from the far north", "Continental Polar (cP) air from the Prairies", "Maritime Arctic air from the Labrador Sea"],
      "July heat with humidity needs a warm, moist source: the tropical Atlantic. The polar and arctic air masses are cold, and continental polar air is dry as well as cool.", {});
  },
  function () {
    return mcq("An air mass takes on the temperature and moisture characteristics of",
      "the surface it sits over for several days (its source region)",
      ["the last front it crossed", "the altitude at which it formed", "the season in which it is named"],
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
      ["the maritime Tropical air mass losing moisture to the Sun", "a front forming inside the air mass", "the town's altitude increasing"],
      "Air mass weather changes when one air mass replaces another. Cool and dry replacing warm and moist is the signature of continental Polar air (from the northern land interior) displacing maritime Tropical air.", {});
  },
  function () {
    return mcq("Why does maritime Polar air bring cool, cloudy, showery weather to the province in spring?",
      "It forms over cold North Pacific and North Atlantic water, so it arrives cool and loaded with moisture picked up from the ocean",
      ["It forms over the Arctic ice cap and picks up moisture crossing the Prairies", "It is heated from below by the warm ocean floor", "It only travels at night, when temperatures fall"],
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
      ["days of gentle, steady rain over a wide area", "fog and drizzle that last for a week", "no change in weather at all"],
      "A cold front lifts warm air abruptly along a steep boundary, producing a narrow, intense band of precipitation. Once it passes, cooler, drier air and clearing skies follow. Long, gentle, wide-area rain belongs to warm fronts.", {});
  },
  function () {
    return mcq("As a warm front approaches a town, the usual sequence is",
      "high thin clouds thickening into a wide shield of steady rain, then warmer air arriving as the front passes",
      ["a sudden thunderstorm, then an immediate drop in temperature", "clear skies until the front arrives, then heavy snow", "fog that lifts the moment the front passes into colder air"],
      "Warm air slides gradually up over the cool air ahead of a warm front, so clouds build and thicken over a wide area well before the surface front arrives, giving steady precipitation, and temperatures rise after passage.", {});
  },
  function () {
    return mcq("Which pairing of front and precipitation pattern is correct?",
      "Warm front: steady rain over a large area for many hours. Cold front: brief, heavy showers in a narrow band.",
      ["Warm front: brief, heavy showers. Cold front: steady rain over a large area.", "Both fronts: identical precipitation patterns.", "Warm front: no precipitation. Cold front: steady rain for days."],
      "The slope of the boundary sets the pattern: the warm front's gentle slope spreads lifting (and rain) over hundreds of kilometres, while the cold front's steep slope concentrates it in a narrow, intense band.", {});
  },
  function () {
    return mcq("A stationary front has stalled over a region for two days. The most likely weather there is",
      "prolonged cloud and repeated periods of rain along the boundary, with little temperature change",
      ["rapid clearing and warming", "a single short thunderstorm and then sunshine", "steadily falling temperatures for the whole period"],
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
      ["southeast, and die out completely", "south, and stay warm and gentle", "northeast, bringing warmer air"],
      "Winds ahead of the front blow from the south or southwest (warm sector). At passage they veer sharply to the northwest, the direction of the cold air behind the front, often with gusts in the shower band.", {});
  },
  function () {
    return mcq("Two neighbouring towns are on opposite sides of a cold front that is nearly stationary this morning. Town A reports 19 °C and humid; Town B, 60 km away, reports 7 °C and dry. Later the front surges southeast. By evening Town A should expect",
      "a sharp temperature drop into the range Town B reported, with a band of showers as the front crosses",
      ["no change, because fronts do not affect towns ahead of them", "a gradual warming as the front approaches", "the same weather as Town B had, but without any precipitation"],
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
      ["rising, which cools it and squeezes out moisture", "moving so fast that clouds cannot form", "always colder than the air around it"],
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
      ["an intense low-pressure system", "a cold front at the moment of passage", "a hurricane"],
      "1041 hPa is well above the average sea-level pressure of about 1013 hPa, and steady high pressure means sinking air and fair weather. Lows and fronts come with lower and changing pressure.", {});
  }
]), ["Lows: air rises, winds spiral in counterclockwise. Highs: air sinks, winds spiral out clockwise. Isobars are equal pressure."]);

E("sci-u1-isobars", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Two weather maps show lows of the same central pressure. On Map 1 the isobars are drawn close together; on Map 2 they are far apart. The winds will be stronger on",
      "Map 1, because closely spaced isobars mean the pressure changes quickly over distance, which drives strong winds",
      ["Map 2, because widely spaced isobars give the wind room to accelerate", "both maps equally, because the central pressures are the same", "Map 2, because weak pressure gradients always produce storms"],
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
      ["the pressure is so high it pushes the sails flat", "the air is too dense for a boat to move through", "the winds circle so fast the boat cannot steer"],
      "At the centre of a high the pressure barely changes from place to place, so there is almost no gradient to drive wind. The same weak-gradient logic explains calms in the doldrums and horse latitudes.", {});
  }
]), ["Forget the centre's number: spacing is the wind. Tight isobars, steep gradient, strong wind."]);

E("sci-u1-low-formation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Mid-latitude low-pressure systems (the storms that cross this province) typically develop",
      "along a front where cold polar air meets warm tropical air, with the boundary beginning to wave and wrap around a centre",
      ["in the middle of a uniform air mass, for no boundary reason", "only over tropical oceans in summer", "where two high-pressure systems collide"],
      "The energy for these storms comes from the contrast between air masses along a front. A wave forms on the boundary, pressure falls at the wave's crest, and the cold and warm fronts of the mature low develop from there. Hurricanes are the tropical exception, not the local rule.", {});
  },
  function () {
    return mcq("Why do so many of the province's storms arrive from the southwest and travel toward the northeast?",
      "The prevailing westerlies steer weather systems from west to east across the mid-latitudes, and the storm track follows the temperature contrast along the coast",
      ["Storms are pulled northeast by the Labrador Current", "The Coriolis effect pushes every storm northeast regardless of other factors", "Storms form over the province and drift backward"],
      "Systems are embedded in the westerly flow of the mid-latitudes, so they are carried west to east (here, southwest to northeast). The strong land-ocean temperature contrast along the east coast helps intensify them on the way.", {});
  },
  function () {
    return mcq("A low deepens (its central pressure falls) as it approaches the province. Deepening means the storm is",
      "intensifying: its pressure gradient steepens and its winds strengthen",
      ["weakening and about to clear", "slowing down and becoming stationary", "changing into a high-pressure system"],
      "Falling central pressure against the surrounding pressure steepens the gradient, and a steeper gradient means faster winds and usually more precipitation. A filling low (rising central pressure) is the one that is weakening.", {});
  }
]), ["Storms here are born on boundaries between air masses and ride the westerlies. Contrast is the fuel."]);

E("sci-u1-extreme", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("A hurricane gets its energy from",
      "the heat stored in warm tropical ocean water, released as water vapour condenses in the storm",
      ["the cold Labrador Current", "friction with the land as it approaches the coast", "the collision of two cold fronts"],
      "Hurricanes are heat engines run on warm water (generally above about 26.5 °C): evaporation loads the air with latent energy and condensation aloft releases it. Over land or cold water the fuel supply is cut and the storm weakens.", {});
  },
  function () {
    return mcq("Which conditions are required for a blizzard?",
      "Strong winds (at least 40 km/h), falling or blowing snow reducing visibility below about 400 m, lasting at least four hours (with dangerous cold in the Canadian definition)",
      ["A temperature below -30 °C, with any amount of snow", "Snowfall of exactly 25 cm in one hour", "A low-pressure centre passing directly overhead"],
      "A blizzard is defined by wind and visibility in snow, not by a snowfall total: even old snow blown by strong wind can produce one (a ground blizzard). The temperature criterion applies in the Canadian Prairie definition; the wind and visibility criteria are the core everywhere.", {});
  },
  function () {
    return mcq("During a winter storm warning for the island, the safest interpretation of a forecast calling for a nor'easter is",
      "a strong low tracking northeastward along the coast, bringing heavy snow and powerful northeast winds to the island",
      ["a gentle rain event with winds from the southwest", "a high-pressure system arriving from the northeast", "a thunderstorm moving in from the Labrador Sea"],
      "A nor'easter is named for its winds: a coastal low travelling up the seaboard drives strong northeasterlies into the province, usually with heavy snow. It is the classic major winter storm pattern here.", {});
  }
]), ["Extreme weather still runs on this unit's engines: stored ocean heat for hurricanes, wind plus snow for blizzards."]);

E("sci-u1-climate-factors", 1, ["SC10.6.4", "SC10.6.1"], 2, "var", varset([
  function () {
    return mcq("St. John's, Newfoundland (47.6 °N) has much colder winters than Lisbon, Portugal (38.7 °N) mainly because of latitude, but Vancouver (49.3 °N) is far milder than St. John's at nearly the same latitude. The Vancouver difference is mostly due to",
      "ocean currents and prevailing winds: Vancouver receives air that has crossed the warm Pacific, St. John's receives air from the cold Arctic and sits beside the cold Labrador Current",
      ["Vancouver being much closer to the equator in practice", "St. John's higher altitude", "the tilt of Earth's axis changing over Canada"],
      "Latitude sets the sunlight budget, but currents and wind direction deliver the heat. Pacific air and a warm current moderate Vancouver; Arctic air masses and a cold current chill St. John's. Altitude is a red herring here: St. John's is near sea level.", {});
  },
  function () {
    return mcq("A mountain town at 1500 m elevation is consistently about 9 °C colder than a town in the valley below it. This is the effect of",
      "altitude: temperature falls as elevation increases because the air is thinner and less able to hold heat",
      ["latitude", "albedo of the valley floor", "distance from the ocean"],
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
      ["its distance from the equator alone", "the rain shadow of the ocean", "the absence of any air masses over the region"],
      "The great deserts cluster near 30 degrees in both hemispheres where air sinks, and a cold current adds stability on the west coasts. Two of this unit's mechanisms stack to produce the desert.", {});
  }
]), ["Separate the controls: latitude, altitude, water, currents, winds. Then ask which one actually differs between the two places."]);

E("sci-u1-greenhouse", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("The natural greenhouse effect works because greenhouse gases in the atmosphere",
      "let sunlight pass through but absorb much of the infrared radiation Earth emits, sending some of it back toward the surface",
      ["reflect sunlight back to space before it reaches the ground", "produce heat through chemical reactions in the air", "trap air so it cannot circulate to space"],
      "Sunlight (mostly visible) passes through; Earth's outgoing infrared is absorbed by gases such as water vapour, carbon dioxide and methane, warming the lower atmosphere. Without the natural effect Earth would average about -18 °C instead of about +15 °C.", {});
  },
  function () {
    return mcq("The enhanced greenhouse effect refers to",
      "human activities increasing greenhouse gas concentrations, strengthening the natural effect and warming the planet",
      ["the Sun becoming hotter over the last century", "greenhouses being used to grow food in winter", "a hole in the ozone layer letting heat in"],
      "The enhanced effect is the natural mechanism plus extra gases (mainly carbon dioxide from burning fossil fuels, and methane). The ozone hole is a separate issue about ultraviolet radiation, and the Sun's output has not risen enough to explain the warming.", {});
  },
  function () {
    return mcq("Venus is far hotter than Earth mainly because its atmosphere",
      "is very thick and almost all carbon dioxide, producing an extreme greenhouse effect",
      ["is closer to the Sun, which alone explains any temperature", "contains no clouds", "reflects no sunlight at all"],
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
      ["improving weather, as high pressure is building in", "no change, because pressure changes do not affect weather", "an earthquake warning for the region"],
      "Falling pressure means a low or front is approaching or deepening. The faster and further it falls, the worse the coming weather tends to be. Rising pressure is the improving signal.", {});
  },
  function () {
    return mcq("After two days of rain, a station's pressure has risen 10 hPa in 24 hours and the wind has shifted northwest. The best short forecast is",
      "clearing skies and cooler air, with the fair weather likely to last a day or more",
      ["heavier rain within the hour", "a warm front arriving by evening", "fog thickening overnight because of the pressure rise"],
      "Rising pressure plus a northwest shift is the post-frontal signature: the low has moved off and a high is building in behind it. Expect clearing and cooler, drier air.", {});
  },
  function () {
    return mcq("A pressure reading of 1013 hPa that has not changed in three days tells a forecaster",
      "less than the tendency does: the same value with a falling trend would mean approaching poor weather",
      ["that fair weather is guaranteed for the week", "that a storm is exactly 24 hours away", "that the barometer must be broken"],
      "The value alone is just near-average pressure. Forecasters read the tendency, the direction and rate of change: falling means trouble approaching, rising means improvement, steady means the current pattern persists.", {});
  }
]), ["The trend is the forecast: falling, trouble coming; rising, improvement; steady, more of the same."]);

E("sci-u1-station-model", 1, ["SC10.6.5"], 2, "var", varset([
  function () {
    return mcq("A station model plots a temperature of 17 °C and a dewpoint of 16 °C, with a completely filled (black) station circle. The best interpretation is",
      "the air is nearly saturated and overcast, so fog or precipitation is likely",
      ["the air is very dry and the sky is clear", "a cold front has just passed", "the station is at the centre of a high"],
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
      ["the grass produces water overnight", "water rises from the soil through the grass blades", "the air's pressure falls below the dewpoint"],
      "Radiational cooling drops the grass to the dewpoint temperature; vapour in contact with it condenses into liquid droplets. Dew is condensation at the surface, not rain and not water from inside the plant.", {});
  },
  function () {
    return mcq("Two towns have the same temperature, 12 °C. Town A's dewpoint is 11 °C and Town B's is 3 °C. Which statement is correct?",
      "Town A's air is much closer to saturation, so fog or cloud forms far more easily there",
      ["Town B's air holds more water vapour", "Both towns have identical relative humidity", "Town A must be raining at the moment"],
      "The temperature-dewpoint spread measures closeness to saturation: 1 degree at Town A versus 9 degrees at Town B. Town A's air needs only slight cooling to condense; Town B's air is dry. Near saturation does not guarantee rain, but it makes condensation easy.", {});
  },
  function () {
    return mcq("Relative humidity rises through a clear evening even though no moisture is added to the air. This is because",
      "the air cools toward its (unchanging) dewpoint, and cooler air reaches saturation with less vapour",
      ["evaporation speeds up as the temperature falls", "the dewpoint rises all evening", "pressure changes alter the amount of vapour present"],
      "Relative humidity compares the vapour present to the amount needed for saturation at that temperature. Cooling shrinks the denominator, so the percentage rises until it hits 100 percent at the dewpoint and dew or fog forms.", {});
  }
]), ["Watch the gap between temperature and dewpoint: small gap, saturated air; shrinking gap, condensation coming."]);

E("sci-u1-forecast-reason", 1, ["SC10.6.5", "SC10.6.4"], 3, "var", varset([
  function () {
    return mcq("A forecaster in St. John's sees: a low southwest of Nova Scotia tracking northeast, pressure at St. John's falling steadily, and winds backing to the southeast and strengthening. The best forecast for the Avalon over the next 24 hours is",
      "increasing cloud and wind with rain arriving, heaviest as the low passes, because the region is entering the low's warm sector and frontal zones",
      ["clearing and colder conditions, because lows bring fair weather as they approach", "fair weather throughout, because falling pressure means a high is arriving", "snow flurries with light winds, because southeast winds are always cold"],
      "All three clues agree: an approaching low on the usual southwest-to-northeast track, falling pressure, and strengthening southeast flow ahead of the system. That combination delivers the low's cloud shield and frontal rain to the Avalon.", {});
  },
  function () {
    return mcq("Two forecasts are issued for a town. Forecast 1 uses only the current sunny conditions and predicts sun tomorrow. Forecast 2 uses falling pressure, thickening high cloud and a low approaching from the southwest, and predicts rain tomorrow. Forecast 2 is stronger because it",
      "is based on the system's approach signals (pressure tendency, cloud sequence and the storm track), not just persistence of current weather",
      ["uses more instruments than Forecast 1", "was made later in the day", "assumes the weather always changes every 24 hours"],
      "Good forecasts read the dynamics: pressure tendency and the warm-front cloud sequence are the atmosphere announcing an approaching system. Assuming today repeats itself fails exactly when a system is arriving, which is when the forecast matters most.", {});
  },
  function () {
    return mcq("A cold front passed a town at noon. At 3 p.m. the sky is clearing and the temperature has dropped 6 °C, but a second band of showers is showing on radar behind the front. The best interpretation is",
      "showers can continue for a time in the unstable cold air behind the front even as the overall trend is toward clearing and colder conditions",
      ["the front has reversed direction and is coming back", "a warm front is now passing", "the temperature drop was an instrument error"],
      "Post-frontal cold air moving over relatively warmer ground or water is unstable and often produces scattered showers behind the main band. The trend (falling temperature, rising pressure) still says clearing overall; the radar showers are the cold air mass's own weather, not the front returning.", {});
  }
]), ["Combine independent clues: pressure tendency, cloud sequence, system track, and what the air behind a front does."]);

E("sci-u1-heatsink-data", 1, ["SC10.6.1"], 3, "var", varset([
  function () {
    return mcq("Monthly average temperatures: Town X: January -9 °C, July 21 °C. Town Y: January -1 °C, July 16 °C. Both are at the same latitude. Which conclusion is best supported?",
      "Town Y is coastal and Town X is inland: the ocean narrows Town Y's yearly temperature range (milder winter, cooler summer)",
      ["Town X is coastal and Town Y is inland", "Town Y must be much farther south than Town X", "The data must be wrong, because towns at one latitude have identical climates"],
      "Compute the ranges: Town X swings 30 degrees between January and July; Town Y swings only 17. A narrow range with milder winters and cooler summers is the fingerprint of ocean moderation, the heat sink effect in data form.", {});
  },
  function () {
    return mcq("A lake town and an inland town 80 km apart record these July overnight lows on the same clear night: lake town 17 °C, inland town 10 °C. Three nights later, under cloudy and windy conditions, the lows are 15 °C and 14 °C. The best explanation for the difference between the two nights is that",
      "on the clear calm night the inland town radiated its heat away quickly while the lake kept the shore town warm; clouds and wind on the later night reduced the contrast for both",
      ["the lake stopped storing heat on the later night", "the inland town's altitude changed between the nights", "clouds always make coastal towns colder than inland towns"],
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
      ["is the hottest layer of the atmosphere", "is where the ozone layer absorbs ultraviolet light", "contains no gravity to hold clouds down"],
      "The troposphere is heated from the ground up, which makes it unstable and mixing, and it contains the water vapour that becomes clouds and precipitation. Weather needs both ingredients, and only this layer has them.", {});
  }
]), ["Weather is the four spheres interacting, and it lives in the lowest layer of the air."]);

E("sci-u1-jetstream", 1, ["SC10.6.3"], 1, "var", varset([
  function () {
    return mcq("The jet stream is best described as",
      "a narrow band of very strong winds high in the troposphere that flows generally from west to east",
      ["a fast ocean current along the Labrador coast", "a river of warm air at ground level that melts snow", "the boundary line drawn between two air masses"],
      "Jet streams are high-altitude wind rivers (around 10 km up) marking the boundary between cold polar air and warmer air to the south. Airliners ride them eastbound and avoid them westbound.", {});
  },
  function () {
    return mcq("Newfoundland and Labrador's weather is strongly affected by the jet stream because it",
      "steers surface low pressure systems (storms) across the province and separates the cold air to its north from warmer air to its south",
      ["blocks all storms from reaching the Atlantic provinces", "warms the ocean surface directly beneath it", "creates the tides in the Bay of Fundy"],
      "Storms travel along the jet stream like cars on a highway, and the province sits near its usual track: that is why systems so often sweep up the Atlantic coast toward the island and Labrador.", {});
  },
  function () {
    return mcq("In winter the jet stream over eastern Canada usually shifts",
      "southward, letting Arctic air spill down over the province more often and strengthening the storms along the boundary",
      ["northward over the pole, ending winter storms", "down to ground level, where it becomes a surface wind", "into a north-to-south flow that stops all weather systems"],
      "The polar jet follows the temperature contrast. In winter the cold air mass expands south, the jet moves with it, and the island and Labrador sit more often on the cold, stormy side of the boundary.", {});
  }
]), ["The jet stream is the storm highway: high, fast, west to east, and it moves with the seasons."]);

E("sci-u1-clouds", 1, ["SC10.6.4"], 1, "var", varset([
  function () {
    return mcq("Clouds form when moist air rises and cools because",
      "cooling lowers the air's capacity to hold water vapour, so the vapour condenses onto tiny particles as droplets or ice crystals",
      ["rising air gets heavier and squeezes the water out", "the Sun's rays freeze the vapour at high altitude", "wind blows the water vapour together into visible clumps"],
      "Condensation is the trigger: a parcel of air cooled to its dew point cannot hold all its vapour, and the excess condenses on dust and salt particles. Clouds are the visible result, droplet by droplet.", {});
  },
  function () {
    return mcq("Towering cumulonimbus clouds are the type associated with",
      "thunderstorms: heavy showers, lightning and gusty winds",
      ["days of gentle, steady drizzle", "fog at ground level", "clear, calm winter nights"],
      "Cumulus family clouds grow upward where air rises strongly; the biggest, cumulonimbus, reach the top of the troposphere and carry the updrafts that build lightning and downpours. Flat layered stratus brings the steady drizzle instead.", {});
  },
  function () {
    return mcq("Thin, wispy cirrus clouds high in the sky are made of",
      "ice crystals: at that altitude the air is far below freezing",
      ["liquid water droplets only", "smoke from surface fires", "frozen carbon dioxide"],
      "Cirrus live at the top of the troposphere where temperatures are well below 0 C, so their moisture exists as ice crystals. Lower, warmer clouds are mostly liquid droplets.", {});
  }
]), ["Clouds are condensation made visible; their shape tells you how the air is moving."]);

E("sci-u1-precipitation", 1, ["SC10.6.4"], 2, "var", varset([
  function () {
    return mcq("Freezing rain forms when",
      "rain falls through a shallow layer of below-freezing air near the ground and freezes on contact with cold surfaces",
      ["snowflakes partially melt and refreeze into pellets in mid-air", "the whole air column is below freezing from cloud to ground", "rain evaporates and re-condenses as ice in the cloud"],
      "The layer cake decides the precipitation type: freezing rain melts fully in a warm layer aloft, then lands on sub-freezing surfaces and glazes them. Pellets that refreeze in mid-air are ice pellets (sleet), a different structure.", {});
  },
  function () {
    return mcq("A winter storm drops snow on the island's west coast but rain on the Avalon Peninsula at the same time. The most likely reason is",
      "the Avalon is surrounded by ocean water that moderates its air temperature to just above freezing, while the west coast air is colder",
      ["the west coast is closer to the North Pole", "rain cannot fall west of the Long Range Mountains", "the Avalon receives more sunlight in January"],
      "The two coasts sit in the same storm but different air: the ocean keeps coastal Avalon air marginal (near 0 C), tipping the precipitation to rain, while colder air inland and west keeps it snow. Small temperature differences near zero flip the type.", {});
  },
  function () {
    return mcq("Hail forms inside strong thunderstorm clouds because",
      "powerful updrafts carry water droplets up into freezing air repeatedly, adding layers of ice until the stones are too heavy to hold up",
      ["rain falls so fast that it freezes from the speed", "lightning freezes the raindrops it strikes", "hailstones fall from the stratosphere where it is always cold"],
      "Hail is a cycling product: updraft, freeze, fall partly, rise again, grow another layer. Only the violent updrafts of cumulonimbus can keep stones aloft long enough to grow, which is why hail is a warm-season thunderstorm hazard.", {});
  }
]), ["Precipitation type is a temperature-profile question: read the column from cloud to ground."]);

E("sci-u1-mountain-winds", 1, ["SC10.6.3"], 2, "var", varset([
  function () {
    return mcq("Moist air from the Gulf of St. Lawrence is forced up over the Long Range Mountains. As the air rises on the windward side it",
      "cools, its vapour condenses, and clouds and precipitation form on the slopes facing the wind",
      ["warms up and dries out", "stops moving entirely", "gains water vapour from the rocks"],
      "Lifting is cooling: forced ascent chills the air to its dew point, wringing out moisture as orographic precipitation. The same mechanism gives the west coast of the island its heavy rain and snow while sheltered valleys stay drier.", {});
  },
  function () {
    return mcq("After crossing a mountain range, the descending air on the leeward side typically arrives",
      "warmer and drier than it started (a foehn or chinook type wind), because it lost moisture on the way up and compresses as it sinks",
      ["colder and wetter than it started", "at exactly the same temperature and humidity", "carrying the clouds it made on the windward side"],
      "The mountain takes its toll in moisture on the way up; the dried air then warms by compression on the way down, arriving as a warm, dry wind. Alberta's chinooks are the famous Canadian example of the same physics.", {});
  }
]), ["Mountains are weather machines: lift, cool, condense on the way up; sink, warm, dry on the way down."]);

E("sci-u1-weather-lore", 1, ["SC10.6.5"], 1, "var", varset([
  function () {
    return mcq("The old saying 'red sky at night, sailor's delight; red sky in the morning, sailor's warning' has a scientific basis in mid-latitudes because",
      "weather systems here travel west to east: a red sunset means dry air and clear skies to the west (coming our way), while a red sunrise means the clear air has passed and wet weather approaches",
      ["the colour red repels rain clouds", "sailors only ever sailed in the evening", "the Sun sets in the east, so a red sunset shows tomorrow's weather"],
      "The lore encodes the prevailing flow: we mostly receive tomorrow's weather from the west. Dusty, dry western air at sunset promises a fine tomorrow; the same sky at dawn means the dry air is already east of us and the next system follows.", {});
  },
  function () {
    return mcq("Weather lore such as 'when the wind is from the east, it is neither good for man nor beast' (an east wind in Newfoundland often brings cold, damp weather off the Atlantic) is best judged scientifically as",
      "a local observation pattern with a real mechanism behind it, useful as a clue but no substitute for measured data and a forecast",
      ["always true and more reliable than instruments", "pure superstition with no connection to real weather", "a rule that works the same way everywhere on Earth"],
      "Good lore is compressed local experience: an easterly flow here really does cross cold ocean water first. It fails as a universal rule and cannot beat barometers and models, which is exactly how forecasters treat it: a hint, not a verdict.", {});
  }
]), ["Lore is local experience in rhyme: respect the mechanism, verify with the instruments."]);
