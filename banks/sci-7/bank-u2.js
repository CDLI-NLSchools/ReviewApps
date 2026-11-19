/* Science 7, Unit 2: Heat (SC7.4.1 to SC7.6.9, 26 indicators, 75 entries).
   Sources: the current English guide (Focus for Learning for all 26
   indicators; terminology governs), the outcome spreadsheet (tag set
   verified set-identical to the guide, in order), ExamView Chapters 4 to 6
   (305 items parsed), Core Lab 5-3C The Plateau Problem and Core Lab 6-1D
   Absorb That Energy (each in three artefacts, counted once), the Heat
   Pumps STSE module (WNLSD and ESD copies byte-identical, counted once),
   the WNLSD objectives list, Unit Test 2, Chapter Four Test and Key Terms,
   the ESD heat unit test sample, the rubbing alcohol heating curve case
   study, the SLA unit 2 reading, and the Heat Transfer Design Challenge.
   All items were written new for this app: existing tests and
   question banks were reviewed only to gauge the expected depth
   and range of treatment, and nothing was carried verbatim.
   Harvest catalogue and authoring spec: Science-7-Heat-Harvest-Catalogue-2026-11-15.md and
   Science-7-Heat-Authoring-Spec-2026-11-15.md. */
// CRMARKS: s7-u2-cr-temp-explain=3
// CRMARKS: s7-u2-cr-expansion=3
// CRMARKS: s7-u2-cr-plateau=3
// CRMARKS: s7-u2-cr-transfer-explain=3
// CRMARKS: s7-u2-cr-absorb=2
// CRMARKS: s7-u2-cr-heating-example=2
// CRMARKS: s7-u2-cr-heating-decision=3
// CRMARKS: s7-u2-cr-improvement=2
// CRMARKS: s7-u2-cr-pump-chain=3
// CRMARKS: s7-u2-cr-thermometer-display=2
// CRMARKS: s7-u2-cr-inquiry=3
// CRMARKS: s7-u2-cr-display=3
// CRMARKS: s7-u2-cr-design-test=4
// CRMARKS: s7-u2-cr-conclusion=3
// CRMARKS: s7-u2-cr-instrument-jobs=3

/* ---------- SC7.4.1 Instruments used to measure temperature ---------- */
E("s7-u2-instrument-match", 2, ["SC7.4.1"], 1, "gen", function () {
  var cases = [
    { job: "measuring the temperature inside a pottery kiln, far hotter than boiling water", key: "a thermocouple thermometer", d: ["a liquid-in-glass thermometer", "a bimetallic strip thermometer", "an infrared thermometer"] },
    { job: "finding the surface temperature of a hot engine part without touching it", key: "an infrared thermometer", d: ["a liquid-in-glass thermometer", "a resistance thermometer", "a thermocouple thermometer"] },
    { job: "switching a home heating system on and off as the room warms and cools", key: "a bimetallic strip thermostat", d: ["an infrared thermometer", "a liquid-in-glass thermometer", "a resistance thermometer"] },
    { job: "measuring the temperature of water in a beaker during a class investigation", key: "a liquid-in-glass thermometer", d: ["a bimetallic strip thermostat", "a thermocouple thermometer", "an infrared thermometer"] },
    { job: "recording air temperature at a weather station with a probe wired to a display", key: "a resistance thermometer", d: ["a liquid-in-glass thermometer", "a bimetallic strip thermostat", "an infrared thermometer"] }
  ];
  var c = pick(cases);
  return mcq("Which instrument is built for this job: " + c.job + "?",
    c.key, c.d,
    "Each instrument suits a different job. A thermocouple handles the extreme heat inside furnaces and kilns. An infrared thermometer reads a surface from a distance, with no contact. A bimetallic strip bends with temperature, which makes it useful as the switch inside a thermostat. A liquid-in-glass thermometer is the everyday tool for liquids in a lab, and a resistance thermometer sends its reading along wires to a display.",
    {});
}, ["Think about what each instrument can survive and how it takes its reading.", "Match the job's conditions first: extreme heat, no contact, automatic switching, an ordinary liquid, or a wired probe."]);

E("s7-u2-instrument-how", 2, ["SC7.4.1"], 1, "var", varset([
  function () {
    return mcq("How does a bimetallic strip thermometer respond when it gets warmer?",
      "Its two joined metals expand by different amounts, so the strip bends",
      ["Its liquid rises because the liquid expands",
       "Its electrical resistance drops, and the drop is displayed as a temperature",
       "It detects invisible radiation given off by the surface"],
      "A bimetallic strip joins two different metals. Because the metals expand by different amounts when heated, the strip bends, and the bending moves a pointer or works a switch. Rising liquid belongs to a liquid-in-glass thermometer, resistance changes to a resistance thermometer, and radiation detection to an infrared thermometer.",
      {});
  },
  function () {
    return mcq("A liquid-in-glass thermometer shows a higher reading when the liquid warms because the liquid",
      "expands and rises up the narrow tube",
      ["contracts and pulls away from the bulb",
       "changes colour as its particles speed up",
       "boils and pushes vapour up the tube"],
      "The liquid in the bulb expands as it warms, and the only place it can go is up the narrow tube, so the height of the column shows the temperature. The liquid does not boil, change colour, or contract on warming.",
      {});
  },
  function () {
    return mcq("An infrared thermometer can take the temperature of a hot surface without touching it because it",
      "measures the invisible radiation the surface gives off",
      ["sends out a beam that bounces back carrying the temperature",
       "reads the temperature of the air just above the surface",
       "uses two joined metals that bend in the heat"],
      "Every warm surface gives off infrared radiation, and the hotter the surface, the more it gives off. The thermometer measures that radiation and converts it to a temperature, so it never has to touch the surface.",
      {});
  }
]), ["Each instrument works by a different physical effect.", "Ask which effect fits: expanding liquid, bending metals, changing resistance, or radiation."]);

E("s7-u2-thermometer-read", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return mcq("School thermometers usually contain coloured alcohol rather than mercury mainly because",
      "mercury is poisonous, so a broken thermometer would be a safety hazard",
      ["alcohol expands more evenly than mercury does",
       "mercury cannot be seen through glass",
       "alcohol works at much higher temperatures than mercury"],
      "Mercury is a poison. If a mercury thermometer broke in a classroom, the spilled mercury would be a health hazard and hard to clean up safely, so schools use alcohol thermometers instead. Alcohol also freezes at a much lower temperature than mercury, which suits outdoor winter readings.",
      {});
  },
  function () {
    return mcq("A student is reading an alcohol thermometer in a beaker of warm water. Which practice gives the most trustworthy reading?",
      "Wait until the column stops moving, keep the bulb in the water, and read at eye level",
      ["Lift the thermometer out of the water and read it quickly before it changes",
       "Shake the thermometer down before placing it in the water",
       "Read the top of the column from above while the bulb rests on the beaker's bottom"],
      "The column needs time to reach the water's temperature, the bulb must stay in the water while reading (it starts changing temperature the moment it is lifted out), and eye-level reading avoids a parallax error. Resting the bulb on the bottom measures the beaker, not the water.",
      {});
  }
]), ["Think about safety first, then about what makes a reading accurate.", "One answer is about why alcohol replaces mercury; the other is about waiting, keeping the bulb in place, and eye level."]);

E("s7-u2-instrument-choose", 2, ["SC7.4.1"], 3, "var", varset([
  function () {
    return mcq("A nurse needs the temperature of a burn patient's skin without touching the skin, and a furnace technician needs the temperature inside a running furnace. Which pairing of instruments fits both jobs?",
      "Infrared thermometer for the skin; thermocouple for the furnace",
      ["Liquid-in-glass thermometer for the skin; infrared thermometer for the furnace",
       "Bimetallic strip for the skin; liquid-in-glass thermometer for the furnace",
       "Infrared thermometer for the skin; liquid-in-glass thermometer for the furnace"],
      "The skin reading must not involve contact, which is exactly what an infrared thermometer does. The furnace is far beyond the range of glass or surface instruments, and a thermocouple is built to work at those temperatures. A liquid-in-glass thermometer would have to touch the skin and would be destroyed in the furnace.",
      {});
  },
  function () {
    return mcq("A greenhouse owner wants the heating to switch itself on at 15 °C and off at 19 °C, with no one present. Which instrument does that job, and why do the others fail it?",
      "A bimetallic strip thermostat, because its bending can work the switch by itself",
      ["A liquid-in-glass thermometer, because it is the most accurate of the four",
       "An infrared thermometer, because it can watch the whole greenhouse at once",
       "A resistance thermometer, because it can be read from the owner's house"],
      "Only the bimetallic strip turns a temperature change into movement, and that movement can open and close the heating switch automatically. The other instruments only display a temperature; none of them can switch anything.",
      {});
  }
]), ["Two jobs, two different demands. Test each instrument against both.", "Contact is the problem in one job and extreme heat in the other; automatic switching needs an instrument that moves."]);

/* Added November 19, 2026: closes the Unit 2 Test 1 CR denomination
   gap in the test blueprint. The test covers SC7.4.1 alone against a
   3-mark CR target, and the indicator held no CR entry. See
   Junior-Science-Blueprint-Depth-Queue-2026-11-19.md. */
E("s7-u2-cr-instrument-jobs", 2, ["SC7.4.1"], 2, "var", varset([
  function () {
    return textq("Three temperature jobs (3 marks)\n(a) A lifeguard must check whether the metal surface of a playground slide is too hot for children to touch, without touching it herself. (1)\n(b) A potter must know the temperature inside a kiln while it is firing, far above the boiling point of water. (1)\n(c) A greenhouse owner wants the heater to switch itself on when the air cools and off when it warms, with nobody present. (1)\nFor each job, name the instrument that fits and state why it fits.",
      ["(a) An infrared thermometer: it reads the radiation from the surface, so no contact is needed.",
       "(b) A thermocouple thermometer: it is built to withstand and measure temperatures far beyond the range of a glass thermometer.",
       "(c) A bimetallic strip thermostat: the strip bends as the temperature changes and can work the switch by itself."],
      "<b>Model answer:</b> (a) An infrared thermometer: it measures the invisible radiation the hot surface gives off, so the lifeguard gets the reading from a distance without touching the slide. (b) A thermocouple thermometer: its joined wires of two different metals survive the extreme heat inside a firing kiln and turn the temperature into an electrical signal, where a liquid-in-glass thermometer would break. (c) A bimetallic strip thermostat: its two joined metals expand by different amounts as the temperature changes, so the strip bends, and the bending can open and close the heater's switch by itself.<br><br><b>Marking points:</b> 1 mark for each job: the fitting instrument named, with the reason it fits that job's conditions.", {});
  },
  function () {
    return textq("Three temperature jobs (3 marks)\n(a) A weather station records the air temperature day and night and sends each reading along wires to a display inside a building. (1)\n(b) A student measures the temperature of warm water in a beaker during a class investigation. (1)\n(c) A heat alarm must trigger a switch by itself if the air in a storage room rises above a set temperature. (1)\nFor each job, name the instrument that fits and state why it fits.",
      ["(a) A resistance thermometer: its probe's electrical resistance changes with temperature and the signal travels along wires to the display.",
       "(b) A liquid-in-glass thermometer: the everyday instrument for a liquid in a lab, read directly from the column's height.",
       "(c) A bimetallic strip: it bends as the temperature rises and can trip the alarm switch by itself."],
      "<b>Model answer:</b> (a) A resistance thermometer: the resistance of its probe changes with temperature, and that electrical signal can be sent along wires to a display and recorded, which is what a weather station needs. (b) A liquid-in-glass thermometer: it is the standard tool for measuring a liquid in a lab; the liquid expands as it warms and the height of the column gives the reading directly. (c) A bimetallic strip: two joined metals expand by different amounts, the strip bends as the room warms, and at the set temperature the bending trips the switch, so the alarm works with nobody watching it.<br><br><b>Marking points:</b> 1 mark for each job: the fitting instrument named, with the reason it fits that job's conditions.", {});
  }
]), ["Each job has one condition that rules most instruments out: no contact, extreme heat, automatic switching, a wired signal, an ordinary liquid.", "Name the instrument and the condition it satisfies, one job at a time."]);

/* ---------- SC7.4.2 Define temperature (particle theory) ---------- */
E("s7-u2-temp-define", 2, ["SC7.4.2"], 1, "var", varset([
  function () {
    return mcq("In the particle theory, temperature is a measure of",
      "the average kinetic energy of the particles of a substance",
      ["the total kinetic energy of all the particles of a substance",
       "the amount of heat a substance contains",
       "the speed of the fastest particles in a substance"],
      "Temperature measures the average kinetic energy of the particles, not the total. A bathtub of warm water holds more total particle energy than a cup of hotter water, but the cup's particles have the higher average, so the cup has the higher temperature. Temperature is also not an amount of heat: heat is energy being transferred.",
      {});
  },
  function () {
    return mcq("Kinetic energy is",
      "the energy an object or particle has because it is moving",
      ["the energy stored in the bonds between particles",
       "the energy given off as light by a warm object",
       "the energy needed to change a solid into a liquid"],
      "Kinetic energy is energy of motion. The faster a particle moves, the more kinetic energy it has, and temperature reflects the average of that energy across all the particles in a substance.",
      {});
  }
]), ["Temperature is about particles and their motion.", "It is an average, not a total, and not an amount of stored heat."]);

E("s7-u2-particle-points", 2, ["SC7.4.2"], 1, "gen", function () {
  var cases = [
    { topic: "what matter is made of", key: "All matter is made up of tiny particles", d: ["All particles of a substance are the same size and mass", "Particles disappear when a substance melts", "A substance's particles are joined together with no spaces between them"] },
    { topic: "the spaces between particles", key: "There are empty spaces between the particles of a substance", d: ["Particles touch each other with no gaps in every state of matter", "The spaces between particles are filled with air", "Particles in a gas have no spaces between them"] },
    { topic: "whether particles move", key: "Particles are constantly moving", d: ["Particles move only when a substance is heated", "Particles in a solid do not move at all", "Particles stop moving at 0 °C"] },
    { topic: "temperature and particle motion", key: "Particles move faster as the temperature increases", d: ["Particles grow larger as the temperature increases", "Particles move faster as the temperature decreases", "All particles in a substance move at exactly the same speed"] },
    { topic: "forces between particles", key: "Particles attract each other", d: ["Particles push each other away at all times", "Particles attract each other only in liquids", "Particles are held together by tiny hooks"] }
  ];
  var c = pick(cases);
  return mcq("Which statement about " + c.topic + " is one of the points of the particle theory of matter?",
    c.key, c.d,
    "The particle theory says: all matter is made of tiny particles; there are empty spaces between particles; particles are constantly moving; particles move faster as temperature increases; and particles attract each other. The distractors break one point each: particles of different substances differ, particles in a solid still vibrate, particles do not grow when heated, and particles keep moving well below 0 °C.",
    {});
}, ["Five statements make up the theory; four of these options break one of them.", "Watch for absolute claims: only, never, all the same, stop completely."]);

E("s7-u2-particle-speed", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return mcq("Two identical containers hold the same gas. In container A the particles are drawn with short movement arrows and are close together. In container B the particles are drawn with long movement arrows and fill the whole container. What can be concluded?",
      "B is at the higher temperature, and its particles have spread out because they are moving faster",
      ["A is at the higher temperature, because its particles are packed closer together in the container",
       "Both are at the same temperature, because they hold the same gas in identical containers",
       "B is at the higher temperature, because it holds more particles than container A holds"],
      "Arrow length stands for particle speed, and faster particles mean a higher average kinetic energy, which is a higher temperature. Moving faster, the particles also spread out to fill the container. Closeness does not mean hotter, and the containers hold the same amount of gas.",
      {});
  },
  function () {
    return mcq("A sealed balloon of air is moved from a cold porch into a warm room. After a while the balloon is slightly bigger. Which particle explanation is correct?",
      "The air particles move faster, push harder and more often on the balloon's walls, and spread farther apart",
      ["The air particles grow larger as they warm up, so each one takes up more room inside the balloon",
       "More air particles form inside the balloon as it warms, so the balloon fills with extra air",
       "The particles slow down and settle toward the bottom, leaving more empty space above them"],
      "Warming raises the particles' average kinetic energy: they move faster, collide harder and more often, and spread farther apart, which inflates the balloon. Particles never grow, no new particles appear, and warming speeds particles up rather than slowing them down.",
      {});
  }
]), ["Arrow length stands for speed; spacing stands for how far particles have spread.", "Higher temperature means faster particles, and faster particles spread out."]);

E("s7-u2-cr-temp-explain", 2, ["SC7.4.2"], 3, "var", varset([
  function () {
    return textq("A thermometer in a pot of soup reads 20 °C. After heating, it reads 85 °C. Explain, using the particle theory, what the thermometer is actually measuring and what changed in the soup. (3 marks)",
      ["temperature measures average kinetic energy", "average kinetic energy of particles", "particles move faster when heated"],
      "<b>Model answer:</b> The thermometer measures the temperature of the soup, which is the average kinetic energy of the soup's particles. At 20 °C the particles move at a certain average speed. As heat energy is transferred into the soup, the particles move faster and faster, so their average kinetic energy rises, and the thermometer reads 85 °C. The particles themselves did not grow or multiply; only their motion changed.<br><br><b>Marking points:</b> 1 mark for temperature as average kinetic energy of the particles; 1 mark for the particles moving faster as energy is transferred in; 1 mark for a correct denial or correct handling of a misconception (particles do not grow, increase in number, or contain the temperature).",
      {});
  }
]), ["Name what temperature measures first, then describe what heating does to the particles.", "Average kinetic energy is the key phrase; then faster particles, and no growing or multiplying."]);

/* ---------- SC7.4.3 States of matter and temperature change ---------- */
E("s7-u2-states-compare", 2, ["SC7.4.3"], 1, "var", varset([
  function () {
    return mcq("Which comparison of the three states of matter is correct?",
      "A solid keeps its own shape and volume; a liquid keeps its volume but takes its container's shape; a gas takes both the shape and volume of its container",
      ["A solid takes its container's shape; a liquid keeps its own shape and volume; a gas keeps its own volume in any container",
       "A liquid expands to fill its whole container; a gas keeps a fixed volume of its own; a solid flows slowly to match its container's shape",
       "All three states keep their own shape and volume at any temperature, whatever container they are placed in"],
      "Solids hold both shape and volume because their particles are locked in place. Liquids hold volume but flow into their container's shape because their particles can slide past each other. Gases spread to fill all the space available because their particles move freely and far apart.",
      {});
  },
  function () {
    return mcq("In which state are the particles arranged in a regular pattern, vibrating in place, held by strong attractions?",
      "Solid",
      ["Liquid", "Gas", "All three states equally"],
      "In a solid the particles sit in a regular arrangement, held by strong attractions, and can only vibrate in place. Liquid particles are close but disordered and can slide past each other; gas particles are far apart and move freely.",
      {});
  }
]), ["Compare shape, volume, arrangement and movement, state by state.", "Solids are locked in place; liquids slide; gases spread out."]);

E("s7-u2-expansion-scenario", 2, ["SC7.4.3"], 2, "gen", function () {
  var cases = [
    { s: "A car's tires are filled to the correct pressure in a cool garage. After a long highway drive on a hot day, the pressure inside them is higher.", key: "The air inside expanded as it warmed, pushing harder on the tire walls", d: ["The rubber of the tires contracted and squeezed the air", "More air leaked into the tires through the valves", "The air particles shrank, leaving more room to press outward"] },
    { s: "A playground ball that felt firm indoors feels soft after being left outside on a very cold day.", key: "The air inside contracted as it cooled, so it pushes less on the ball", d: ["Air escaped through the ball's material because of the cold", "The air particles grew heavier and sank to the bottom", "The ball's material expanded and made more room inside"] },
    { s: "A balloon tied at room temperature is placed in a freezer. An hour later it is noticeably smaller.", key: "The air particles slowed and moved closer together, so the air contracted", d: ["Some air particles froze and disappeared", "The cold air pushed the balloon walls inward from outside", "The balloon rubber expanded and used up the space"] },
    { s: "A metal lid on a jam jar will not turn. Running hot water over the lid loosens it.", key: "The metal lid expanded slightly more than the glass, loosening its grip", d: ["The hot water melted the sealant holding the lid", "The glass jar contracted away from the lid", "The jam inside expanded and pushed the lid upward"] }
  ];
  var c = pick(cases);
  return mcq(c.s + " What is the best particle explanation?",
    c.key, c.d,
    "Heating makes particles move faster and spread farther apart, so substances expand; cooling slows particles and pulls them closer, so substances contract. In the tire, the warmed air expands against the walls; in the ball and the balloon, the cooled air contracts and pushes less; the metal lid expands a little more than the glass under hot water, which breaks its grip.",
    {});
}, ["Decide first whether the case is a warming (expansion) or a cooling (contraction).", "Particles spread apart when warmed and come closer when cooled; they never grow, shrink, or vanish."]);

E("s7-u2-states-heated", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows the particles of a solid, a liquid and a gas when cooler (top row) and warmer (bottom row). When a substance is heated, what changes about its particles?",
      "They move faster and, in liquids and gases, spread farther apart; the particles themselves stay the same size",
      ["They grow larger as they warm up, which is why the substance expands to fill more space",
       "They multiply as they warm, so there are more particles taking up space in the substance",
       "They change into particles of a completely different substance, which is why the substance expands"],
      "Heating raises the particles' kinetic energy, so they move faster; in liquids and gases they also spread farther apart, which is expansion. The particles themselves do not grow, multiply, or change identity.",
      {});
    q.figure = s7ParticlePanelSVG();
    return q;
  },
  function () {
    var q = mcq("A steel rail and a puddle of water are both left in the sun. By afternoon both are warmer. Which statement about their particles is true for both?",
      "In both, the particles are moving faster on average than they were in the morning",
      ["In both, the particles have spread far apart like the particles of a gas",
       "In both, the particles have stopped attracting each other altogether",
       "In both, the particles themselves are larger than they were in the morning"],
      "Whatever the state, warming means faster particles on average. The rail's particles still vibrate in place and the puddle's particles still slide past each other; neither spreads out like a gas, and no particle grows.",
      {});
    q.figure = s7ParticlePanelSVG();
    return q;
  }
]), ["Use the diagram: compare the top and bottom rows for spacing and arrow length.", "Speed and spacing change with temperature; particle size, number and identity do not."]);

E("s7-u2-cr-expansion", 2, ["SC7.4.3"], 2, "var", varset([
  function () {
    return textq("On a hot afternoon, a sealed plastic water bottle left in the sun bulges outward, even though no air was added. Explain the bulging using the particle theory. (3 marks)",
      ["particles move faster and spread apart", "air expands when heated", "particles collide harder and more often"],
      "<b>Model answer:</b> The air trapped inside the bottle warms in the sun. Its particles gain kinetic energy and move faster, so they spread farther apart and collide with the bottle's walls harder and more often. The air expands, and because the bottle is flexible plastic, the extra push bulges the walls outward. No particles were added; the same particles simply take up more space when moving faster.<br><br><b>Marking points:</b> 1 mark for the trapped air warming; 1 mark for particles moving faster and spreading apart (expansion); 1 mark for harder or more frequent collisions pushing the flexible walls out.",
      {});
  }
]), ["Start with the air inside warming up.", "Faster particles, farther apart, pushing harder on the walls."]);

/* ---------- SC7.4.4 Changes of state ---------- */
E("s7-u2-change-name", 2, ["SC7.4.4"], 1, "gen", function () {
  var cases = [
    { s: "Frost appears on a car windshield overnight without any liquid water being present first", key: "Sublimation (gas directly to solid, in the depositing direction)", d: ["Condensation", "Freezing", "Evaporation"] },
    { s: "Droplets form on the outside of a cold drink can on a humid day", key: "Condensation", d: ["Evaporation", "Sublimation", "Melting"] },
    { s: "A puddle gradually disappears on a windy afternoon, long before the water could boil", key: "Evaporation", d: ["Condensation", "Boiling throughout the liquid at once", "Sublimation"] },
    { s: "An ice cube tray left in a freezer turns liquid water into cubes", key: "Freezing", d: ["Melting", "Condensation", "Evaporation"] },
    { s: "A block of dry ice in a cooler gives off fog and shrinks, with no liquid puddle forming", key: "Sublimation", d: ["Melting", "Evaporation", "Condensation"] },
    { s: "Butter in a warm pan turns from a solid block to a liquid pool", key: "Melting", d: ["Freezing", "Sublimation", "Condensation"] }
  ];
  var c = pick(cases);
  return mcq("Which change of state is happening? " + c.s + ".",
    c.key, c.d,
    "Name the change by its start and end states. Liquid to gas at the surface is evaporation; gas to liquid is condensation; liquid to solid is freezing; solid to liquid is melting; and a change directly between solid and gas, with no liquid stage, is sublimation, which is how the frost forms and how dry ice shrinks.",
    {});
}, ["Name the starting state and the ending state, then pick the change that connects them.", "If there is no liquid stage at all, the change is sublimation."]);

E("s7-u2-plateau-read", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    var q = mcq("The graph shows a sample of ice being heated steadily until the water boils. During which part of the graph is the average kinetic energy of the particles increasing?",
      "On the rising sections only; it stays steady along both flat sections",
      ["Along the whole graph, including the flat sections",
       "On the flat sections only, because that is when the state changes",
       "Nowhere; the kinetic energy is used up by the changes of state"],
      "Temperature measures average kinetic energy, so kinetic energy rises exactly where the temperature rises: the three sloping sections. Along the flat sections (the plateaus at 0 °C and 100 °C) the temperature, and so the average kinetic energy, holds steady while the added energy breaks attractions between particles instead.",
      {});
    q.figure = s7HeatingCurveSVG(0, 100, 30, 120);
    return q;
  },
  function () {
    var q = mcq("On the graph, the two flat sections (plateaus) are at 0 °C and 100 °C. What is happening to the water along those sections?",
      "It is changing state: melting at 0 °C and boiling at 100 °C, with the temperature holding steady",
      ["The heater has stopped working during those sections, then started again afterward",
       "The thermometer has reached the top of its scale and cannot show a higher temperature",
       "The water is cooling down between bursts of heating, then warming up again afterward"],
      "A plateau means energy is being added but the temperature is not rising: the energy is being used to break attractions between particles as the state changes. Melting happens at 0 °C and boiling at 100 °C for water.",
      {});
    q.figure = s7HeatingCurveSVG(0, 100, 30, 120);
    return q;
  }
]), ["Find the flat sections first; they are the plateaus.", "Where the line climbs, kinetic energy climbs; where it is flat, the state is changing."]);

E("s7-u2-change-particles", 2, ["SC7.4.4"], 2, "var", varset([
  function () {
    return mcq("Ice at 0 °C is heated and begins to melt, yet its temperature stays at 0 °C until all the ice has melted. Where does the added energy go?",
      "It breaks attractions between the particles, freeing them to slide past each other as a liquid",
      ["It raises the particles' kinetic energy, but the thermometer cannot show it",
       "It is stored inside each particle, making the particles larger",
       "It escapes through the container walls as fast as it is added"],
      "During a change of state, added energy does the work of breaking attractions between particles instead of speeding them up. Since the particles' average kinetic energy does not change, the temperature holds steady until the change is complete.",
      {});
  },
  function () {
    return mcq("Which particles escape from the surface of a liquid when it evaporates?",
      "The fastest-moving particles at the surface",
      ["The slowest-moving particles at the surface",
       "Particles from the bottom of the liquid only",
       "Particles that have stopped attracting each other completely"],
      "Evaporation happens at the surface, and only the fastest surface particles have enough energy to break free of the attractions holding them in the liquid. That is also why evaporation cools the liquid left behind: the particles that remain have a lower average kinetic energy.",
      {});
  }
]), ["During a change of state, energy breaks attractions instead of speeding particles up.", "Evaporation takes the fastest surface particles, which is why it cools what is left."]);

E("s7-u2-cr-plateau", 2, ["SC7.4.4"], 3, "var", varset([
  function () {
    var q = textq("The graph shows a solid substance being heated steadily. (a) At what temperatures does the substance melt and boil? (b) Explain why the temperature stays the same during each of those changes even though heat is still being added. (3 marks)",
      ["melts at 40", "boils at 140", "energy breaks attractions between particles"],
      "<b>Model answer:</b> (a) The first plateau is at 40 °C, so the substance melts at 40 °C; the second plateau is at 140 °C, so it boils at 140 °C. (b) During a change of state, the added energy is used to break the attractions between particles, pulling them out of their solid arrangement (melting) or free of the liquid altogether (boiling). None of the energy goes into speeding the particles up, so their average kinetic energy, and therefore the temperature, stays the same until the change is finished.<br><br><b>Marking points:</b> 1 mark for both plateau temperatures read correctly from the graph (40 °C and 140 °C); 1 mark for energy breaking attractions during a change of state; 1 mark for linking steady temperature to unchanged average kinetic energy.",
      {});
    q.figure = s7HeatingCurveSVG(40, 140, 30, 160);
    return q;
  }
]), ["Read the two plateau heights off the temperature axis first.", "Then explain the plateaus: energy breaks attractions, so particle speed and temperature hold steady."]);

/* ---------- SC7.4.5 Conduction, convection, radiation ---------- */
E("s7-u2-transfer-classify", 2, ["SC7.4.5"], 1, "gen", function () {
  var cases = [
    { s: "A metal saucepan heats evenly on a stove element, and its metal handle gets hot too", key: "Conduction", d: ["Convection", "Radiation", "Evaporation"] },
    { s: "An ice pack cools an injured ankle it is pressed against", key: "Conduction", d: ["Convection", "Radiation", "Condensation"] },
    { s: "Warm air rises above a heater and cooler air moves in to take its place, setting up a circulating current", key: "Convection", d: ["Conduction", "Radiation", "Sublimation"] },
    { s: "Water in a pot circulates as it is heated from below, carrying heat to the top", key: "Convection", d: ["Conduction", "Radiation", "Freezing"] },
    { s: "You feel the warmth of a campfire on your face while standing a metre away from it", key: "Radiation", d: ["Conduction", "Convection", "Evaporation"] },
    { s: "Sunlight warms the dashboard of a parked car", key: "Radiation", d: ["Conduction", "Convection", "Condensation"] }
  ];
  var c = pick(cases);
  return mcq("Which process is transferring the heat here? " + c.s + ".",
    c.key, c.d,
    "Conduction passes heat through matter by particle collisions, as in the saucepan, its handle and the ice pack. Convection carries heat by the movement of a liquid or gas, as in the rising warm air and the circulating water. Radiation transfers heat as electromagnetic waves that need no matter at all, as with the campfire's warmth and the sunlight on the dashboard.",
    {});
}, ["Ask how the heat travels: through touching matter, by a moving fluid, or as waves needing nothing.", "Pass hand to hand is conduction; carried along is convection; thrown across is radiation."]);

E("s7-u2-transfer-particles", 2, ["SC7.4.5"], 1, "var", varset([
  function () {
    return mcq("Which statement about the three heat transfer processes is correct?",
      "Conduction happens in solids, liquids and gases; convection happens only in liquids and gases; radiation needs no matter at all",
      ["Convection happens in solids, liquids and gases; conduction happens only in solids, never in fluids",
       "Radiation happens only when two objects are touching each other directly",
       "Conduction is fastest in gases because their particles have the most room to move freely and collide"],
      "Conduction works in all three states but is most efficient in solids, where particles are packed close and collide often, and least in gases. Convection needs a fluid that can flow, so it happens only in liquids and gases. Radiation is electromagnetic waves and crosses empty space, which is how the Sun's heat reaches Earth.",
      {});
  },
  function () {
    return mcq("In conduction, heat moves through a metal spoon because",
      "fast-moving particles collide with slower neighbours and pass kinetic energy along the spoon",
      ["particles travel all the way from the hot end of the spoon to the cold end",
       "heat flows through the spoon as a liquid from the hot end to the cold end",
       "the spoon's particles expand as they warm and carry the heat along with them"],
      "The particles themselves stay in place; what travels is the energy. Particles at the hot end vibrate faster, collide with their neighbours, and pass kinetic energy along particle by particle, like a parcel passed hand to hand down a line.",
      {});
  }
]), ["Sort the processes by what they need: any matter, a flowing fluid, or nothing at all.", "In conduction the energy travels, not the particles."]);

E("s7-u2-transfer-compare", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("A metal spoon and a wooden spoon are left standing in the same pot of hot soup. The metal spoon's handle soon feels hot; the wooden spoon's handle does not. Why?",
      "Metal conducts heat well because its particles pass kinetic energy along quickly; wood is a poor conductor",
      ["Wood absorbs the heat and destroys it completely before it can reach the handle",
       "The metal spoon attracts heat out of the hot soup into its handle",
       "The wooden spoon reflects the heat back into the soup, so none of it reaches the handle"],
      "Both spoons sit in the same soup, so the difference is in the materials. Metal is a good conductor: its particles pass kinetic energy along efficiently. Wood is an insulator: its particles pass energy along poorly, so the handle stays cool.",
      {});
  },
  function () {
    return mcq("A room is heated by a hot water radiator under a window. The air touching the radiator warms, rises, spreads across the ceiling, cools, and sinks on the far side of the room. The main process moving heat around the room is",
      "convection, because the moving air carries the heat with it",
      ["conduction, because the air touches the radiator",
       "radiation, because the radiator is hot",
       "conduction, because heat passes through the window glass"],
      "Once the air is warmed, it is the air's own movement that carries the heat around the room in a circulating current, and carrying heat by a moving fluid is convection. Conduction warms the first layer of air at the radiator's surface, but it does not move heat across the room.",
      {});
  }
]), ["Name the process doing most of the work in each situation, not every process present.", "A moving fluid carrying heat is convection; particle-to-particle passing is conduction."]);

E("s7-u2-stove-three", 2, ["SC7.4.5"], 2, "var", varset([
  function () {
    return mcq("A wood stove heats a cabin in all three ways at once. Which list matches each way to its process correctly?",
      "The stove top heats a kettle by conduction; air warmed by the stove rises and circulates by convection; campers feel warmth on their faces across the room by radiation",
      ["The stove top heats a kettle by radiation; air warmed by the stove circulates by conduction; warmth is felt across the room by convection",
       "The stove top heats a kettle by convection; air warmed by the stove circulates by radiation; warmth is felt across the room by conduction",
       "All three effects are conduction, because everything in the cabin touches the stove or touches the air around it"],
      "The kettle touches the stove top, so heat passes particle to particle: conduction. The warmed air rises and circulates, carrying heat: convection. The warmth felt across the room travels as electromagnetic waves through the air without the air carrying it: radiation.",
      {});
  }
]), ["Take the three effects one at a time: touching, circulating air, felt at a distance.", "Contact is conduction, a circulating fluid is convection, across a gap is radiation."]);

E("s7-u2-cr-transfer-explain", 2, ["SC7.4.5"], 3, "var", varset([
  function () {
    return textq("A pot of water sits on a campfire. Explain how each of the three heat transfer processes is at work in this scene. (3 marks)",
      ["conduction through the pot", "convection in the water", "radiation from the fire"],
      "<b>Model answer:</b> Conduction: heat passes through the metal of the pot, particle to particle, from the side touching the flames to the side touching the water (and up the handle). Convection: the water at the bottom of the pot warms, expands and rises, while cooler water sinks to take its place, so currents carry heat through all the water. Radiation: the fire gives off electromagnetic waves that travel through the air with no matter needed, warming the outside of the pot and anyone sitting nearby.<br><br><b>Marking points:</b> 1 mark for conduction correctly placed (through the pot or its handle); 1 mark for convection correctly placed (currents in the water); 1 mark for radiation correctly placed (waves from the fire travelling without matter).",
      {});
  }
]), ["Give one process per part of the scene: the pot, the water, the space between fire and pot.", "Conduction needs contact, convection needs a flowing fluid, radiation needs nothing."]);

/* ---------- SC7.4.6 Absorption of radiant heat ---------- */
E("s7-u2-absorb-classify", 2, ["SC7.4.6"], 1, "gen", function () {
  var cases = [
    { q: "Four car roofs sit in the same sunshine. Which roof absorbs the most radiant heat?", key: "A dull black roof", d: ["A shiny black roof", "A dull white roof", "A shiny silver roof"] },
    { q: "Four metal sheets are placed under the same lamp. Which sheet absorbs the least radiant heat?", key: "A shiny light-coloured sheet", d: ["A dull black sheet", "A dull dark-grey sheet", "A shiny black sheet"] },
    { q: "Two identical cans hold equal amounts of water under a lamp. Which can's water warms fastest?", key: "The can painted dull black", d: ["The can painted shiny white", "The can wrapped in shiny foil", "The can painted light grey and polished"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "Dark surfaces absorb more radiant heat than light ones, and dull surfaces absorb more than shiny ones, because shiny surfaces reflect much of the radiation away. A dull black surface is the strongest absorber; a shiny light surface is the weakest.",
    {});
}, ["Two features matter: colour (dark beats light) and finish (dull beats shiny).", "The strongest absorber is dark and dull; the weakest is light and shiny."]);

E("s7-u2-absorb-lab", 2, ["SC7.4.6"], 3, "var", varset([
  function () {
    var q = mcq("Two cans of oil, one dark and one light, stood the same distance from a 100 W lamp. The graph shows their temperatures over 15 minutes. Which conclusion and caution are both sound?",
      "The dark can warmed faster; but before concluding, check that both cans held the same amount of oil and sat the same distance from the lamp",
      ["The dark can warmed faster, which proves dark surfaces always heat twice as fast as light surfaces in any test",
       "The light can warmed faster, because light surfaces attract heat from a lamp more strongly",
       "The graph shows nothing useful, because the two cans were different colours and cannot be compared"],
      "The dark line climbs more steeply, so the dark surface absorbed more radiant heat and warmed its oil faster. A careful conclusion also checks the controlled factors the laboratory itself names: equal amounts of oil and equal distance from the lamp, since either one could produce a difference on its own. Nothing in the graph supports a claim about twice as fast.",
      {});
    q.figure = s7AbsorbGraphSVG([0, 5, 10, 15], [22, 30, 37, 43], [22, 26, 30, 33]);
    return q;
  }
]), ["Read the steepness of the two lines first.", "Then ask what else could explain a difference: amounts and distances must have been kept the same."]);

E("s7-u2-cr-absorb", 2, ["SC7.4.6"], 2, "var", varset([
  function () {
    return textq("Use the findings about absorbing and emitting radiant heat to explain both of these: (a) people in hot, sunny climates often wear light-coloured clothing; (b) gardeners sometimes mix dark soot into garden soil in spring. (2 marks)",
      ["light colours reflect radiant heat", "dark surfaces absorb more", "good absorbers are good emitters"],
      "<b>Model answer:</b> (a) Light-coloured surfaces reflect much of the Sun's radiant heat instead of absorbing it, so light clothing takes in less heat and keeps the wearer cooler. (b) Dark surfaces absorb radiant heat well, so soot-darkened soil takes in more of the spring sunshine and warms up faster, giving seeds and roots an earlier start.<br><br><b>Marking points:</b> 1 mark for light surfaces reflecting or poorly absorbing radiant heat, applied to clothing; 1 mark for dark surfaces absorbing radiant heat well, applied to the soil warming.",
      {});
  }
]), ["Both parts use the same finding from opposite ends.", "Light and shiny reflect; dark and dull absorb."]);

/* ---------- SC7.4.7 Specific heat capacity (qualitative) ---------- */
E("s7-u2-shc-compare", 2, ["SC7.4.7"], 2, "gen", function () {
  var cases = [
    { frame: "In a school laboratory", rows: [["Water", 6], ["Alcohol", 11], ["Steel", 22], ["Wood", 9]], key: "Steel", note: "steel rises most, so it stores the least energy per degree" },
    { frame: "In a materials testing lab", rows: [["Water", 5], ["Soil (dry)", 14], ["Steel", 24], ["Alcohol", 10]], key: "Steel", note: "steel rises most again with a fresh set of values" },
    { frame: "In a science fair experiment", rows: [["Water", 7], ["Alcohol", 13], ["Soil (dry)", 16], ["Wood", 10]], key: "Soil (dry)", note: "dry soil rises most in this set" }
  ];
  var c = pick(cases);
  var rows = c.rows.map(function (r) { return { name: r[0], rise: r[1] }; });
  var others = c.rows.map(function (r) { return r[0]; }).filter(function (n) { return n !== c.key; });
  var q = mcq(c.frame + ", equal masses of four materials are given exactly the same amount of energy. The display shows each material's temperature rise. Which material has the lowest specific heat capacity?",
    c.key, others,
    "Specific heat capacity is about how much energy a material can take in for each degree its temperature rises. Given equal energy, the material whose temperature rises most is storing the least energy per degree, so it has the lowest specific heat capacity. In this display, " + c.note + ". Water's rise is the smallest, which is why water is famous for soaking up energy with little temperature change.",
    {});
  q.figure = s7SHCBarsSVG(rows);
  return q;
}, ["Equal masses and equal energy: the biggest rise means the least stored per degree.", "Water's small rise is the clue to its high specific heat capacity."]);

E("s7-u2-shc-coastal", 2, ["SC7.4.7"], 2, "var", varset([
  function () {
    return mcq("A coastal town and an inland town get the same sunshine. The coastal town has cooler summer days and warmer winter nights than the inland town. Which explanation uses specific heat capacity correctly?",
      "The ocean's water has a high specific heat capacity, so it warms and cools slowly, evening out the coastal temperatures",
      ["The land has a high specific heat capacity, so it holds the summer heat into winter",
       "Water has a low specific heat capacity, so the ocean changes temperature quickly and the town follows",
       "The ocean reflects all the sunshine, so the coast never really warms up"],
      "Water stores a great deal of energy for each degree of temperature change, so the ocean warms slowly through summer and cools slowly through winter, moderating the air above the coast. Land materials like dry soil have lower specific heat capacities and swing temperature quickly, which is why inland temperatures are more extreme.",
      {});
  },
  function () {
    return mcq("Equal masses of water and dry soil receive the same amount of sunshine. Which statement is correct?",
      "The soil's temperature rises more, because dry soil has the lower specific heat capacity",
      ["The water's temperature rises more, because water has the lower specific heat capacity",
       "Both rise by the same amount, because they received the same energy",
       "The water's temperature does not rise at all, because water only stores energy"],
      "With equal masses and equal energy, the temperature rise is bigger for the material with the lower specific heat capacity. Dry soil rises quickly; water rises slowly because it can store much more energy per degree.",
      {});
  }
]), ["High specific heat capacity means slow temperature change for the same energy.", "Coasts are moderated by water; soil heats and cools fast."]);

E("s7-u2-heat-vs-temp", 2, ["SC7.4.7"], 1, "var", varset([
  function () {
    return mcq("Which statement correctly separates heat from temperature?",
      "Heat is energy transferred from a hotter object to a colder one; temperature measures the average kinetic energy of an object's particles",
      ["Heat and temperature are two names for the same measurement, taken in different units",
       "Temperature is the energy transferred between objects; heat measures the average kinetic energy of an object's particles",
       "Heat is a substance that flows into an object and raises the temperature of its particles"],
      "Heat is energy on the move, transferred because of a temperature difference, always from hotter to colder. Temperature is a property of one object: the average kinetic energy of its particles. Cold itself never travels; what people call cold moving is heat leaving.",
      {});
  },
  function () {
    return mcq("A student says, 'Close the door, you are letting the cold in.' What is wrong with that statement, scientifically?",
      "Cold does not travel; heat travels out of the warm room to the colder outdoors",
      ["Nothing; cold air is a substance that flows in through open doors",
       "The door blocks heat completely, so no transfer of any kind can happen",
       "Cold travels faster than heat, so the statement has it backwards"],
      "Transfer is always of heat, and always from warmer to colder. Opening the door lets the room's heat escape to the colder air outside (and lets cold air in as air, but what is transferred is heat leaving). There is no substance called cold that flows.",
      {});
  }
]), ["One of the pair is a transfer; the other is a measurement.", "Heat moves from hotter to colder. Cold never travels."]);

/* ---------- SC7.5.1 Personal activities and temperature (THIN) ---------- */
E("s7-u2-familiar-temp", 2, ["SC7.5.1"], 1, "gen", function () {
  var cases = [
    { q: "Which temperature best matches a comfortable classroom?", key: "22 °C", d: ["37 °C", "5 °C", "45 °C"] },
    { q: "Which temperature best matches a healthy human body?", key: "37 °C", d: ["22 °C", "32 °C", "42 °C"] },
    { q: "Which temperature best matches an oven baking bread?", key: "180 °C", d: ["100 °C", "120 °C", "250 °C"] },
    { q: "Which temperature best matches a January afternoon outdoors in this province?", key: "-8 °C", d: ["8 °C", "0 °C", "-28 °C"] },
    { q: "Which temperature best matches water in a kettle that has just boiled?", key: "100 °C", d: ["85 °C", "60 °C", "120 °C"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "Familiar reference temperatures anchor the scale: water freezes at 0 °C and boils at 100 °C, a comfortable room sits near 22 °C, and a healthy body is about 37 °C. A baking oven runs well above boiling, around 180 °C, and a January afternoon in Newfoundland and Labrador is typically a few degrees below zero.",
    {});
}, ["Anchor on the temperatures you know: freezing 0, room about 22, body 37, boiling 100.", "Rule out anything on the wrong side of those anchors."]);

E("s7-u2-activity-temp", 2, ["SC7.5.1"], 1, "var", varset([
  function () {
    return mcq("After an hour of pond hockey on a -10 °C day, a player says she feels warm, even hot. The thermometer still reads -10 °C. What does this show about judging temperature by feel?",
      "Feelings of warmth depend on what your body is doing, not only on the temperature, so skin is an unreliable thermometer",
      ["The thermometer must be broken, because it cannot read -10 °C while the player out on the ice feels warm",
       "Exercise raises the temperature of the air immediately around the player by several degrees",
       "Cold air always feels warm to anyone whenever the winter sun is shining on them"],
      "Your sense of hot and cold responds to your own state: exercise generates heat inside the body, so the same -10 °C air feels mild. That is why a thermometer, not skin, is the tool for measuring temperature, and why hands dipped in the same water can disagree about it.",
      {});
  },
  function () {
    return mcq("Two students disagree about whether their classroom is warm or cool. One just came in from outdoor recess; the other has been sitting inside all morning. What is the best way to settle it?",
      "Read a thermometer placed in the room, away from heaters and windows",
      ["Ask a third student to decide by feel",
       "Have both students hold their hands near the wall and compare again",
       "Average the two opinions and record that as the temperature"],
      "Feel depends on what each person's body was doing and what it was touching before, so opinions cannot settle the question. A thermometer gives a measurement that does not depend on the reader, as long as it is placed away from a heater or a cold window that would skew it.",
      {});
  }
]), ["Your skin reports on your body as much as on the air.", "A measurement beats an opinion: use a thermometer, placed sensibly."]);

/* ---------- SC7.5.2 Temperature technologies of the past ---------- */
E("s7-u2-thermoscope", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Galileo's early temperature instrument, the thermoscope, showed whether air was warmer or cooler than before, but it could not give a temperature reading in degrees. Why not?",
      "It had no scale marked on it, so there were no numbers to read",
      ["It was made of glass, which insulates too well",
       "It measured pressure instead of temperature",
       "Its liquid evaporated before a reading could be taken"],
      "The thermoscope's water level rose and fell with temperature, which showed change, but with no scale there was nothing to read a number from. Adding a marked scale to a liquid thermometer is what turned it into a measuring instrument whose readings could be compared between people and places.",
      {});
  }
]), ["Showing change is not the same as measuring.", "Without a scale, there are no numbers to compare."]);

E("s7-u2-scales", 2, ["SC7.5.2"], 1, "var", varset([
  function () {
    return mcq("Which statement about the three temperature scales is correct?",
      "The Celsius scale is built on water's freezing point (0) and boiling point (100); the Kelvin scale starts at absolute zero",
      ["The Kelvin scale is built on water's freezing and boiling points; Celsius starts at absolute zero",
       "The Fahrenheit scale starts at absolute zero and was the last of the three invented",
       "All three scales use the same two fixed points and differ only in name"],
      "Fahrenheit's was the first widely used scale. Celsius built his scale on two reproducible points, water freezing at 0 and boiling at 100. Kelvin starts his scale at absolute zero, the temperature at which particles have their minimum energy, so 0 K is about -273 °C.",
      {});
  },
  function () {
    return mcq("Absolute zero, 0 K, is best described as",
      "the temperature at which particles have the least kinetic energy possible",
      ["the temperature of deep space everywhere",
       "the coldest temperature ever recorded outdoors",
       "the temperature at which all particles stop and disappear"],
      "Absolute zero is the bottom of the Kelvin scale: the point where particles have the minimum kinetic energy they can have. It is far colder than any outdoor temperature and is a defined reference point, not a weather record. Particles do not disappear there; their motion is at its minimum.",
      {});
  }
]), ["Each scale has its own starting point and fixed points.", "Celsius belongs to water's two points; Kelvin belongs to absolute zero."]);

E("s7-u2-past-tech", 2, ["SC7.5.2"], 2, "var", varset([
  function () {
    return mcq("Early liquid thermometers existed before anyone could compare temperatures between towns. What development made such comparisons possible?",
      "Agreeing on a scale with fixed points, so the same reading meant the same temperature everywhere",
      ["Making the glass tube longer so the liquid rose higher when the temperature rose",
       "Colouring the liquid in the tube so it could be seen more easily from a distance",
       "Using wider tubes that held more liquid and were harder to break in use"],
      "A thermometer without a shared scale shows only warmer or cooler. Once scales were fixed to reproducible points, like water freezing and boiling, a reading of 20 meant the same thing in every town, and temperatures could be recorded, compared and used scientifically.",
      {});
  }
]), ["The missing piece was agreement, not glassware.", "Fixed points plus a shared scale turn change into measurement."]);

/* ---------- SC7.5.3 Home heating in NL, past and present ---------- */
E("s7-u2-heating-tech", 2, ["SC7.5.3"], 1, "gen", function () {
  var cases = [
    { s: "A stove in the kitchen burns split logs, and the family gathers in the one warm room", key: "A wood stove", d: ["An oil furnace", "An air-to-air heat pump", "Electric baseboard heaters"] },
    { s: "A unit outside the house pulls heat from the outdoor air and delivers it inside, running on electricity but producing no heat of its own", key: "An air-to-air heat pump", d: ["An oil furnace", "A wood stove", "Hot water radiation"] },
    { s: "Heaters mounted along the base of the walls in each room, each warming the air that touches it", key: "Electric baseboard heaters", d: ["Hot water radiation", "A wood stove", "A geothermal system"] },
    { s: "A furnace in the basement burns fuel delivered by truck and stored in a tank beside the house", key: "An oil furnace", d: ["A wood stove", "Solar heating panels", "An air-to-air heat pump"] },
    { s: "Pipes carry hot water from a boiler to radiators in each room of an older house", key: "Hot water radiation", d: ["Electric baseboard heaters", "A geothermal system", "An air-to-air heat pump"] },
    { s: "Pipes buried below the frost line bring the ground's steady warmth to a heat pump inside", key: "A geothermal (ground source) system", d: ["An oil furnace", "Solar heating panels", "A wood stove"] }
  ];
  var c = pick(cases);
  return mcq("Which home heating technology is described? " + c.s + ".",
    c.key, c.d,
    "The guide's named technologies each have a signature. A wood stove burns logs in the room it heats; an oil furnace burns delivered fuel; electric baseboards heat room air directly; hot water radiation circulates boiler water to radiators; an air-to-air heat pump moves heat from outdoor air; and a geothermal system moves heat from the ground below the frost line.",
    {});
}, ["Look for the fuel or the heat source in the description.", "Burning, direct electricity, circulating water, and moving heat are four different signatures."]);

E("s7-u2-cr-heating-example", 2, ["SC7.5.3"], 2, "var", varset([
  function () {
    return textq("Name one home heating technology used in Newfoundland and Labrador in the past and one used today, and explain how each one delivers heat to the rooms of a house. (2 marks)",
      ["wood stove", "heat pump", "electric baseboard", "oil furnace"],
      "<b>Model answer:</b> Past: a wood stove. Burning logs heated the stove itself, which warmed the room's air by convection and radiated heat to the people and objects around it; most of the house away from that room stayed cold. Present: an air-to-air heat pump. Running on electricity, it moves heat from the outdoor air into the house rather than making heat, and a fan circulates the warmed air through the rooms. (An oil furnace, electric baseboards, hot water radiation, geothermal or solar system is equally acceptable as the present-day example, with its delivery method explained.)<br><br><b>Marking points:</b> 1 mark for a correct past technology with its delivery explained; 1 mark for a correct present technology with its delivery explained.",
      {});
  }
]), ["One from the past, one from today, and the delivery method for each.", "Burning in the room, burning in a furnace, direct electricity, or moving heat."]);

/* ---------- SC7.5.4 Approaches to the heating problem ---------- */
E("s7-u2-approaches", 2, ["SC7.5.4"], 1, "var", varset([
  function () {
    return mcq("A family installs a heat pump instead of a bigger furnace. Which approach to the home heating problem have they taken?",
      "Move heat that already exists outdoors into the house, instead of making all the heat themselves",
      ["Burn a fuel on site in a furnace or stove to make all the heat the house needs",
       "Turn electricity directly into heat in every room with baseboard heaters",
       "Reduce the need for heat by sealing drafts and insulating the whole house well"],
      "A heat pump does not create its heat by burning or by direct electric heating; it moves heat from the outdoor air (or ground) into the house. The other options name the other approaches: burning a fuel, direct electric heat, and reducing the need through insulation.",
      {});
  },
  function () {
    return mcq("Which household has taken the 'reduce the need' approach to heating?",
      "A household that adds insulation and seals drafts, so their existing furnace runs far less",
      ["A household that switches from oil heat to a wood stove in the kitchen",
       "A household that installs a larger oil furnace to replace its old one",
       "A household that adds electric baseboard heaters to every room of the house"],
      "Reducing the need means the house loses less heat, so whatever system it has runs less. The other households changed how heat is made, not how much heat the house needs.",
      {});
  }
]), ["Name the approach, not the appliance: burn, direct electricity, move heat, capture sun, or need less.", "A heat pump moves heat; insulation reduces the need for it."]);

E("s7-u2-approaches-compare", 2, ["SC7.5.4"], 2, "var", varset([
  function () {
    return mcq("Household A heats with a wood stove because their property has plenty of free firewood and someone home all day. Household B, both adults working long shifts, heats with electric baseboards. Which statement best explains the difference?",
      "Each household's approach fits its situation: A can supply the labour wood heat demands; B needs heat that looks after itself",
      ["Household B has chosen the approach that is always better in every situation, whatever the house",
       "Household A is using an approach that no longer exists in this province, because wood heat has been given up everywhere",
       "The two households are actually using the same approach to heating their homes"],
      "Wood heat is cheap where firewood is free, but it demands daily labour: cutting, carrying, stoking. Electric baseboards cost more to run but need no labour at all. Neither approach is best in the abstract; each fits the household's circumstances, which is the heart of comparing approaches.",
      {});
  }
]), ["Compare the households' situations, not just their appliances.", "Labour, cost, and who is home decide which approach fits."]);

/* ---------- SC7.5.5 Informed decisions about heating ---------- */
E("s7-u2-heating-adv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Which is a genuine advantage of heating a home with a heat pump, as the Heat Pumps module presents it?",
      "It moves heat rather than making it, so it delivers more heat energy than the electrical energy it uses",
      ["It needs no electricity to run at all, even on the coldest days of the winter",
       "It works without any equipment outside the house or anywhere else on the property",
       "It costs nothing to install, so any household can have one put in without paying anything"],
      "Because a heat pump moves existing heat instead of converting electricity directly into heat, the heat delivered to the house can exceed the electrical energy consumed. It does use electricity, it does need an outdoor unit, and its installation cost is one of its real disadvantages.",
      {});
  },
  function () {
    return mcq("Which is a genuine advantage of heating with wood, as the Heat Pumps module presents it?",
      "The fuel is renewable and, for households with their own woodlot, can be very cheap",
      ["It requires no labour at all once the stove has been installed in the house",
       "It carries no risk of fuel spills or of air pollution inside or outside the house",
       "It heats every room of the house evenly, from the basement to the attic"],
      "Wood regrows, and a household cutting its own pays mostly in labour rather than money, which is wood's great advantage. Its disadvantages are just as real: heavy labour, storage space, smoke, and heat concentrated near the stove.",
      {});
  }
]), ["Advantages here come from the module's own question sets.", "Every technology has a real advantage and a real disadvantage; test each claim against both."]);

E("s7-u2-heating-disadv", 2, ["SC7.5.5"], 2, "var", varset([
  function () {
    return mcq("Which is a genuine disadvantage of heating with oil, as the Heat Pumps module presents it?",
      "The fuel must be delivered and stored in a tank, and a leak or spill can seriously damage soil and water",
      ["Oil furnaces cannot heat a whole house, only one or two rooms at a time",
       "Oil produces no greenhouse gases at all, which confuses buyers comparing heating fuels",
       "Oil tanks refill themselves automatically from the ground beneath the house"],
      "Oil's costs include delivery, storage and price swings, and its environmental risk is the spill: a leaking tank can contaminate soil and groundwater, an expensive disaster. Oil furnaces heat whole houses perfectly well, and burning oil does produce greenhouse gases.",
      {});
  },
  function () {
    return mcq("Which is a genuine disadvantage of electric baseboard heating, as the Heat Pumps module presents it?",
      "Turning electricity directly into heat is one of the most expensive ways to heat a house",
      ["Baseboards cannot be controlled room by room or turned down at night",
       "Baseboards need a fuel truck to visit the house every month of the year",
       "Baseboards produce smoke and soot inside the rooms they are heating"],
      "Baseboards are simple, cheap to install and controllable room by room, but every unit of heat costs a full unit of electricity, which makes running them expensive. They need no deliveries and produce no smoke; their weakness is running cost.",
      {});
  }
]), ["Disadvantages here also come from the module's question sets.", "Oil's weakness is storage and spills; electricity's weakness is running cost; wood's is labour."]);

E("s7-u2-cr-heating-decision", 2, ["SC7.5.5"], 3, "var", varset([
  function () {
    return textq("A family is building a house on a wooded lot outside a small town. Both adults work full time away from home. Money is tight this year, but they plan to stay in the house for decades. Choose a main heating technology for this family and defend your choice with advantages and disadvantages, using what you know about the technologies. (3 marks)",
      ["heat pump", "wood stove", "oil furnace", "electric"],
      "<b>Model answer:</b> A strong choice is an air-to-air heat pump, possibly with electric baseboards as backup. Advantages: it moves heat instead of making it, so running costs are low over the decades the family will stay; it needs no daily labour, which suits two adults working away from home; and it produces no on-site spills, smoke or fuel storage. Disadvantages to acknowledge: the installation cost is high in a year when money is tight, and on the coldest days its output drops, so a backup source is wise. A defended choice of wood (free fuel on a wooded lot, but heavy daily labour against the work schedule), oil, or electric could also earn full marks if its advantages and disadvantages are honestly weighed against this family's situation.<br><br><b>Marking points:</b> 1 mark for a clear choice; 1 mark for at least two genuine advantages tied to this family's situation (work schedule, time horizon, lot, budget); 1 mark for at least one genuine disadvantage of the chosen technology, honestly stated. Any technology can earn full marks; an answer claiming a technology has no disadvantages cannot earn the third mark.",
      {});
  }
]), ["There is no single right choice; the defence is what is marked.", "Weigh the family's situation, and name a real disadvantage of your own choice."]);

/* ---------- SC7.5.6 Improvements in heating over time ---------- */
E("s7-u2-improvement", 2, ["SC7.5.6"], 1, "var", varset([
  function () {
    return mcq("Which change is an improvement in home heating technology over time, of the kind this unit studies?",
      "The open fireplace giving way to the airtight wood stove, which burns wood more completely and sends less heat up the chimney",
      ["Houses being built with larger open fireplaces than before in every main room",
       "Families returning to heating one room only, as in the past, and closing off the rest of the house",
       "Furnaces being designed to need stoking by hand every hour of the day and night"],
      "Improvements make heating more efficient, safer, cleaner or less labour-intensive. The airtight stove controls its air supply, burns wood more completely and keeps more heat in the room than an open fireplace, which loses most of its heat up the chimney.",
      {});
  },
  function () {
    return mcq("What did the thermostat improve about home heating when it became common?",
      "It let the heating system switch itself on and off to hold a set temperature, ending the need to tend the furnace by hand around the clock",
      ["It made furnaces burn hotter than ever before, so houses could be kept much warmer",
       "It removed the need for fuel deliveries to the house altogether, in every season",
       "It allowed one furnace to heat several houses at once, sending heat through long pipes buried under the street between them"],
      "A thermostat senses the room temperature and switches the system on and off to hold the setting, using a bimetallic strip or an electronic sensor. That automation is the improvement: steady temperatures with far less labour and less wasted fuel.",
      {});
  }
]), ["An improvement makes heating more efficient, safer, cleaner or easier.", "Think fireplace to airtight stove, and hand-tending to thermostat control."]);

E("s7-u2-cr-improvement", 2, ["SC7.5.6"], 2, "var", varset([
  function () {
    return textq("Choose one home heating technology and explain how it improved over time, and what that improvement changed for the household using it. (2 marks)",
      ["airtight wood stove", "thermostat", "heat pump", "insulation"],
      "<b>Model answer:</b> Example: the wood stove. Early open fireplaces and simple stoves let most of their heat escape up the chimney and needed constant tending. The airtight wood stove sealed the firebox and let the user control the air supply, so wood burns more completely and slowly, more of its heat stays in the room, and one load can burn for hours. For the household, that meant less wood cut and carried, steadier heat, and fewer trips to the stove through the night. (Equally acceptable: furnace control by thermostat, or making heat giving way to moving heat with the heat pump, each with its change explained.)<br><br><b>Marking points:</b> 1 mark for a correct improvement in a named technology; 1 mark for what the improvement changed in practice for the household (efficiency, labour, cost, safety or comfort).",
      {});
  }
]), ["Name the technology, the improvement, and the difference it made at home.", "Efficiency, labour, cost, safety or comfort: the improvement must change one of them."]);

/* ---------- SC7.5.7 Evaporation, condensation and heat pumps ---------- */
E("s7-u2-pump-cycle", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("A heat pump's refrigerant carries heat from outside a house to inside. Which sequence of steps does the refrigerant follow?",
      "It evaporates at low pressure, absorbing heat outdoors; it is compressed; it condenses at high pressure indoors, releasing the heat; then it expands back through a valve",
      ["It condenses outdoors, releasing heat; it evaporates indoors, absorbing the house's heat; then it is stored in a tank until it is needed again",
       "It is compressed outdoors until it glows hot, then blown through ducts directly into the rooms of the house",
       "It freezes outside into a solid, is carried indoors, and melts there, releasing its heat into the rooms"],
      "The cycle runs on the two changes of state. At low pressure in the outdoor coil the refrigerant evaporates, and evaporation takes in heat, even from cold air. The compressor squeezes it, and at high pressure indoors it condenses, and condensation gives heat off into the house. The expansion valve drops its pressure and the cycle repeats.",
      {});
  }
]), ["The cycle is evaporation, compression, condensation, expansion.", "Evaporation absorbs heat; condensation releases it. Pressure decides where each happens."]);

E("s7-u2-pump-science", 2, ["SC7.5.7"], 2, "var", varset([
  function () {
    return mcq("Why does lowering the pressure on a liquid refrigerant make it evaporate more easily, and why does that matter to a heat pump?",
      "At low pressure the particles need less energy to escape as a gas, so the refrigerant can evaporate at a low temperature and absorb heat from cold outdoor air",
      ["Low pressure heats the refrigerant directly, boiling it with friction as it squeezes through the narrow valve",
       "At low pressure the refrigerant turns into a fuel and burns slowly in the outdoor coil, and that burning is what warms the house",
       "Low pressure removes most of the refrigerant's particles from the liquid, leaving room for heat to move in"],
      "Evaporation means particles escaping the liquid, and pressure pressing down on the liquid makes escape harder. Drop the pressure and the refrigerant boils at a much lower temperature, low enough to take heat from winter air. That is the same effect that makes a propane tank feel cold as gas escapes and the remaining liquid evaporates to replace it.",
      {});
  },
  function () {
    return mcq("A common objection is: 'There is no heat in -18 °C air for a heat pump to take.' Which reply is scientifically correct?",
      "Air at -18 °C still holds most of the heat energy it has at room temperature; heat exists in matter at every temperature above absolute zero",
      ["The objection is correct; heat pumps stop working completely once the air falls below 0 °C",
       "The heat pump makes up the difference by burning a small amount of fuel in a backup furnace inside the house",
       "Cold air contains a different kind of heat that only heat pumps can use, stored in a form other machines cannot reach"],
      "Heat is particle energy, and particles hold energy at every temperature above absolute zero. Air at -18 °C holds roughly 85 percent of the heat it holds at 21 °C, so there is plenty for the refrigerant to absorb, even though the pump works harder as the temperature falls.",
      {});
  }
]), ["Evaporation absorbs heat; pressure controls how easily a liquid evaporates.", "There is heat in cold air, because heat exists above absolute zero."]);

E("s7-u2-cr-pump-chain", 2, ["SC7.5.7"], 3, "var", varset([
  function () {
    return textq("Explain, step by step, how the scientific understanding of evaporation and condensation led to the heat pump as a way of heating a house. (3 marks)",
      ["evaporation absorbs heat", "condensation releases heat", "low pressure evaporates refrigerant", "compressor raises pressure"],
      "<b>Model answer:</b> Scientists understood two facts: when a liquid evaporates, it absorbs heat from its surroundings, and when a gas condenses, it releases heat. They also knew pressure controls both changes: a liquid under low pressure evaporates at a low temperature, and a gas under high pressure condenses readily. The heat pump chains the facts together. A refrigerant evaporates at low pressure in an outdoor coil, absorbing heat from the outside air. A compressor then squeezes the gas, and at high pressure in the indoor coil it condenses, releasing the absorbed heat into the house. An expansion valve drops the pressure again, and the cycle repeats, moving heat from outdoors to indoors.<br><br><b>Marking points:</b> 1 mark for evaporation absorbing heat and condensation releasing it; 1 mark for the role of pressure (low pressure for evaporating, high pressure for condensing); 1 mark for the chain applied to the house (heat absorbed outdoors, released indoors).",
      {});
  }
]), ["Two facts and one control: evaporation absorbs, condensation releases, pressure steers both.", "Finish the chain inside the house: absorbed outdoors, released indoors."]);

/* ---------- SC7.5.8 Insulating technologies ---------- */
E("s7-u2-insulator-examples", 2, ["SC7.5.8"], 1, "gen", function () {
  var cases = [
    { q: "Which of these is used as an insulator in the situation described?", key: "The trapped air in a puffy winter jacket, slowing heat loss from the body", d: ["The metal pot conducting heat from the stove to the soup inside it", "The copper wire carrying electric current to a heater in the next room", "The steel radiator giving off its heat to the air of the room"] },
    { q: "Which material is doing insulating work here?", key: "The fibreglass batts packed into an attic floor", d: ["The aluminum foil lining a roasting pan to spread heat", "The cast iron of a wood stove radiating heat", "The metal handle of a saucepan left on the stove"] },
    { q: "Which is an example of insulation, past or present?", key: "Sod walls on an early settler's house, trapping air and slowing heat loss", d: ["A steel bridge expanding in the heat on a hot summer day", "A black roof absorbing the Sun's heat through the whole afternoon", "A metal spoon warming up quickly in a bowl of hot soup"] }
  ];
  var c = pick(cases);
  return mcq(c.q,
    c.key, c.d,
    "An insulator slows the transfer of heat. Trapped air is one of the best insulators, which is why puffy jackets, fibreglass batts (mostly trapped air) and sod walls all work. The distractors are conductors doing the opposite job: carrying or giving off heat.",
    {});
}, ["An insulator slows heat transfer; a conductor speeds it.", "Trapped air is the quiet star: jackets, fibreglass and sod all trap it."]);

E("s7-u2-insulation-past", 2, ["SC7.5.8"], 1, "var", varset([
  function () {
    return mcq("Builders in Atlantic Canada once packed straw, seaweed, sawdust and even newspaper into house foundations and walls. Why did such loose, ordinary materials insulate at all?",
      "They trap a great deal of air in their spaces, and trapped air is a poor conductor of heat",
      ["They generate a small amount of heat of their own as they slowly decay",
       "They reflect heat back into the house like mirrors on every side",
       "They absorb a great deal of water, and wet materials insulate best"],
      "None of those materials is a remarkable insulator by itself; what they share is structure. Packed loosely, they hold pockets of still air, and still air conducts heat very poorly, so the wall loses heat slowly. Modern fibreglass and foam work on the same principle.",
      {});
  }
]), ["The material matters less than what it traps.", "Still air is the insulator; the material is the trap."]);

E("s7-u2-thermos", 2, ["SC7.5.8"], 2, "var", varset([
  function () {
    return mcq("A thermos keeps a cold drink cold for hours. Its wall is a vacuum (almost no air) between two layers, with a shiny inner surface. Which transfer processes do these features fight?",
      "The vacuum blocks conduction and convection, which need matter; the shiny surface reflects radiation",
      ["The vacuum blocks radiation completely; the shiny surface blocks conduction and convection",
       "The vacuum absorbs heat from the drink; the shiny surface generates cold to replace it",
       "Both features work together to block convection and nothing else"],
      "Conduction and convection both need matter to move through, so a vacuum, with almost no particles, stops both. Radiation needs no matter, so the vacuum cannot stop it; the shiny surface handles radiation by reflecting it instead of absorbing it. A good thermos fights all three processes at once.",
      {});
  },
  function () {
    return mcq("In the Heat Transfer Design Challenge, a team must keep a refrigerated juice box within 5 °C of a control juice box's temperature for two hours. Which design choice best fits the science?",
      "Wrap the juice box in layers that trap air, like foam or crumpled paper inside a sealed container",
      ["Wrap the juice box in a single layer of aluminum foil pressed tightly to it on all sides",
       "Stand the juice box inside a metal can so heat can spread evenly around it",
       "Paint the juice box black so it absorbs as much warmth from the room as possible"],
      "Layers that trap air insulate, because still air is a poor conductor, and sealing the container stops convection currents from carrying heat in. A tight metal wrap conducts; a metal can spreads heat; a black surface absorbs radiant heat, the opposite of the goal.",
      {});
  }
]), ["Match each feature to the process it blocks.", "Vacuum stops the two processes that need matter; shine handles the one that does not."]);

/* ---------- SC7.5.9 Needs driving developments ---------- */
E("s7-u2-needs-tech", 2, ["SC7.5.9"], 1, "var", varset([
  function () {
    return mcq("Which pairing correctly matches a heat-related human need to the development it produced?",
      "Treating sprains and sports injuries led to instant cold packs and heat packs that work without a freezer or stove",
      ["Wanting warmer houses in winter led to the invention of the thermometer to measure them",
       "Needing to cook food over open fires led to the development of fibreglass insulation for houses",
       "Wanting to measure temperature exactly led to the invention of the heat pump for houses"],
      "Instant packs answer a medical need: cold or heat applied on the spot, anywhere, with no equipment. The other pairings scramble the unit's stories: thermometers answer a measuring need, insulation a housing need, and the heat pump an energy need.",
      {});
  }
]), ["Match the need to the development it actually drove.", "Medical need, packs; measuring need, thermometer; heating need, pump and insulation."]);

E("s7-u2-winter-clothing", 2, ["SC7.5.9"], 2, "var", varset([
  function () {
    return mcq("Fishers in this province once wore wool sweaters coated in linseed oil when working on cold water. What problem was the oil solving?",
      "Plain wool insulates well when dry but loses much of its insulating power when soaked; the oil shed water and kept the trapped air in the wool",
      ["The oil made the wool fibres produce their own heat, like a small stove worn next to the skin",
       "The oil made the sweater much heavier, so it would not blow off in the strong wind coming off the cold water where the boats worked",
       "The oil attracted heat out of the sea air and held it in the wool fibres for the whole working day on the water"],
      "Wool insulates by trapping air, and trapped air only works while it stays in place. Soaked wool loses its air to water and its insulation with it. An oil coating sheds the water, keeping the air trapped and the fisher warm. Modern technical fabrics solve the same problem with synthetic fibres and waterproof-breathable layers.",
      {});
  }
]), ["The sweater insulates by trapped air; water is the enemy of trapped air.", "Oil sheds water; modern fabrics do the same job with new materials."]);

/* ---------- SC7.5.10 Careers in heat and temperature ---------- */
E("s7-u2-career-match", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("Which career's daily work most directly involves controlling high temperatures to shape metal?",
      "A blacksmith",
      ["A furnace service technician", "A health care worker", "A light bulb manufacturer"],
      "A blacksmith heats metal until it is soft enough to shape, judging and controlling its temperature throughout the work. The other careers in the guide's list work with heat too: the furnace technician services heating systems, health care workers manage patients' temperatures and therapies, and light bulb manufacture involves heating glass and filaments.",
      {});
  },
  function () {
    return mcq("A homeowner's furnace stops working in January. Which career from this unit's list is called, and why?",
      "A furnace service technician, who installs, maintains and repairs heating systems",
      ["A blacksmith, who works with a forge furnace for shaping hot metal",
       "A health care worker, who deals with medical emergencies of every kind",
       "A light bulb manufacturer, who makes small parts that fit inside the furnace"],
      "Furnace service technicians are the heating-system specialists: they install, maintain and repair furnaces and heat pumps, which is exactly the January problem. The blacksmith's furnace is a forge for shaping metal, not a home heating system.",
      {});
  }
]), ["The guide names four careers; match each to its heat work.", "Shaping metal, servicing furnaces, caring for patients, making bulbs."]);

E("s7-u2-career-scenario", 2, ["SC7.5.10"], 1, "var", varset([
  function () {
    return mcq("At work, this person checks patients' temperatures, uses warming blankets for patients who cannot hold their body heat, and applies cold packs to injuries. Which career is it?",
      "A health care worker",
      ["A furnace service technician", "A blacksmith", "A light bulb manufacturer"],
      "Managing the body's temperature is part of health care work: measuring it, warming patients who are losing heat, and cooling injuries with packs. That combination of temperature tasks belongs to health care workers in the guide's careers list.",
      {});
  },
  function () {
    return mcq("At work, this person heats glass until it softens, shapes it, and seals a filament inside so it can glow at a very high temperature without burning out. Which career is it?",
      "A light bulb manufacturer",
      ["A blacksmith", "A furnace service technician", "A health care worker"],
      "Light bulb manufacture is heat work: glass must be heated and shaped, and the filament inside runs extremely hot, protected from the air by the sealed bulb. The guide lists light bulb manufacturers among the careers built on heat and temperature.",
      {});
  }
]), ["Picture the working day described, then match it to the guide's four careers.", "Body temperature and packs point one way; hot glass and filaments point another."]);

/* ---------- SC7.6.1 Construct and test a thermometer ---------- */
E("s7-u2-thermometer-build", 2, ["SC7.6.1"], 1, "var", varset([
  function () {
    return mcq("A class is building air thermometers like the guide describes: a flask of air connected to a tube with a drop of coloured water in it. What makes the drop of water move when the flask warms?",
      "The air inside expands as it warms and pushes the drop along the tube",
      ["The coloured water boils and its vapour pushes the drop",
       "The glass flask contracts and squeezes the air out",
       "The drop evaporates and re-forms farther along the tube"],
      "The flask holds air, and air expands when warmed. The expanding air pushes the water drop along the tube, so the drop's position shows the temperature change. Marking the drop's positions against known temperatures is what turns the device into a thermometer.",
      {});
  }
]), ["The flask holds air; warming air expands.", "Expansion pushes the drop; its position becomes the reading."]);

E("s7-u2-calibrate", 2, ["SC7.6.1"], 2, "var", varset([
  function () {
    return mcq("To calibrate a homemade thermometer, a student marks the liquid level with the thermometer in melting ice water, then in boiling water. What should the student do next to finish the scale?",
      "Label the two marks 0 °C and 100 °C and divide the space between them into 100 equal parts",
      ["Label the marks 0 °C and 100 °C and leave the space between unmarked",
       "Mark every place the liquid stops during the day and average them",
       "Label the ice mark 100 °C and the boiling mark 0 °C, since the liquid rises when cold"],
      "Calibration fixes the scale to two known temperatures: melting ice at 0 °C and boiling water at 100 °C. Dividing the interval evenly gives every degree its place, so any later reading can be read off the scale. Without the divisions, only the two end points mean anything.",
      {});
  }
]), ["Two fixed points first: melting ice and boiling water.", "Then divide the space between them evenly."]);

E("s7-u2-thermometer-test", 2, ["SC7.6.1"], 3, "var", varset([
  function () {
    return mcq("A team built and calibrated an air thermometer and now tests it. Their plan: put their thermometer in three beakers (ice water, room-temperature water, warm water), read it, and also read a known-accurate thermometer in the same beakers at the same times. What makes this a sound test of their instrument?",
      "Their thermometer is compared against a trusted one, in the same substances, at the same times, across a range of temperatures",
      ["Their thermometer is tested in the warmest beaker only, where it matters most",
       "Their thermometer is read first and the trusted one an hour later, so the readings cannot influence each other",
       "The test uses three beakers, and three is always enough"],
      "A test of an instrument is a comparison: same substances, same times, a trusted standard, and a range wide enough to expose error anywhere on the scale. Testing one temperature, or at different times when the water has cooled, could hide a faulty scale.",
      {});
  }
]), ["A test compares: same substances, same times, trusted standard, wide range.", "Ask what could hide an error: one temperature, or readings taken at different times."]);

/* ---------- SC7.6.2 Display thermometer test data ---------- */
E("s7-u2-thermometer-data", 2, ["SC7.6.2"], 1, "var", varset([
  function () {
    return mcq("A team has five test results: their thermometer's reading and a reference thermometer's reading for each of five water baths. Which display shows the comparison most clearly?",
      "A table with one row per bath and two columns, one for each thermometer's reading",
      ["A paragraph describing each bath in the order tested",
       "A bar graph of the bath temperatures with the team's readings left out",
       "A list of the team's readings only, sorted from lowest to highest"],
      "The point of the test is the comparison, so the display must put the two readings side by side for each bath: rows for baths, paired columns for the two thermometers. Any display that drops one thermometer's readings hides exactly what the test was for.",
      {});
  }
]), ["The test is a comparison; the display must keep the two readings together.", "Rows for baths, paired columns for the two thermometers."]);

E("s7-u2-cr-thermometer-display", 2, ["SC7.6.2"], 2, "var", varset([
  function () {
    return textq("A team tested their homemade thermometer against a reference thermometer. Their notebook lists: ice water, ours 1, reference 0; cool water, ours 19, reference 20; room water, ours 24, reference 23; warm water, ours 41, reference 40; hot water, ours 63, reference 60. Organize these results into a table, and state what the display shows about their thermometer. (2 marks)",
      ["table with both readings", "readings within a few degrees", "close to the reference"],
      "<b>Model answer:</b> Table (title: Homemade thermometer test results, temperatures in °C): Bath | Homemade | Reference. Ice water | 1 | 0. Cool water | 19 | 20. Room water | 24 | 23. Warm water | 41 | 40. Hot water | 63 | 60. The display shows the homemade thermometer reads within 1 °C of the reference at the low end and drifts to 3 °C high at the hot end: it is accurate for cool water and slightly over-reads as temperatures rise.<br><br><b>Marking points:</b> 1 mark for a titled table with one row per bath and both readings in paired columns; 1 mark for a correct statement of what the comparison shows (close at low temperatures, reading high by the hot end).",
      {});
  }
]), ["Build the table first: one row per bath, both readings side by side.", "Then read the pattern: where is it close, and where does it drift?"]);

/* ---------- SC7.6.3 Hypothesis, variables, conclusion ---------- */
E("s7-u2-variables-plateau", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("In The Plateau Problem, students heated ice water and recorded its temperature every 3 minutes as it melted and then boiled. Which variable naming is correct?",
      "Time is the independent variable; the water's temperature is the dependent variable",
      ["Temperature is the independent variable; time is the dependent variable",
       "The amount of ice is the dependent variable; the hot plate setting is the independent variable",
       "Time and temperature are both dependent variables"],
      "The experimenters chose when to measure: time is what they controlled, the independent variable. The temperature is what responded and was recorded, the dependent variable. The laboratory sheet itself names them this way: temperature depends on time.",
      {});
  }
]), ["What did the experimenters set, and what did they record?", "Time was set by the measurers; temperature responded."]);

E("s7-u2-hypothesis-form", 2, ["SC7.6.3"], 1, "var", varset([
  function () {
    return mcq("A student asks: 'What happens to the temperature of ice water while the ice is melting?' Which is a proper testable hypothesis for this question?",
      "The temperature will stay the same while the ice melts, because the energy goes into breaking the ice's structure rather than warming the water",
      ["Melting is an interesting process that has fascinated scientists and students for centuries in many countries",
       "The temperature will do something unexpected at some point during the melting of the ice",
       "Ice melts at 0 °C because that is its melting point, listed in every table of melting points for common substances"],
      "A hypothesis is a prediction the experiment can test, with a reason attached: here, a flat temperature during melting, explained by energy going into the change of state. The other options are a topic sentence, a prediction too vague to test, and a fact restated rather than a prediction about the experiment.",
      {});
  }
]), ["A hypothesis predicts a result and gives a reason the data can judge.", "Too vague to test is the flaw in one option; a restated fact is the flaw in another."]);

E("s7-u2-experiment-chain", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return mcq("A team investigated whether a black or a white can warms faster under a lamp. Their write-up says: 'Hypothesis: the black can will warm faster. We filled the black can with 200 mL of oil and the white can with 100 mL, put both under the lamp, and measured after 15 minutes. The black can was warmer, so our hypothesis was correct.' What is the serious flaw in this chain?",
      "The amounts of oil differed, so the colour was not the only difference between the cans; the conclusion cannot be trusted",
      ["The hypothesis was stated before the experiment began, which is when hypotheses are supposed to be stated",
       "The team measured the temperatures only once, at the end of 15 minutes of heating",
       "The team used oil instead of water in the cans for the whole investigation"],
      "A fair test changes one variable at a time. With 200 mL in one can and 100 mL in the other, the smaller amount would warm faster whatever its colour, so the warmer can proves nothing about colour. Stating the hypothesis first is correct practice, and single end measurements and oil are both workable choices.",
      {});
  }
]), ["Check the chain link by link: hypothesis, variables, procedure, conclusion.", "A conclusion is only as good as the controls behind it."]);

E("s7-u2-cr-inquiry", 2, ["SC7.6.3"], 3, "var", varset([
  function () {
    return textq("A student's hypothesis for The Plateau Problem was: 'The temperature of the water will keep rising steadily the whole time it is heated, including while the ice melts.' Her results: the temperature stayed at 0 °C for the first 12 minutes while ice was present, then rose steadily to 100 °C, then stayed at 100 °C while the water boiled. State a conclusion from these results and explain how it stands against her hypothesis. (3 marks)",
      ["conclusion: temperature stays constant during changes of state", "hypothesis refuted during melting and boiling", "temperature rises only between changes of state"],
      "<b>Model answer:</b> Conclusion: while a substance is changing state, its temperature stays constant; it rises only when no change of state is happening. The results refute the hypothesis for the melting and boiling periods, where the temperature held at 0 °C and 100 °C instead of rising steadily, and support it only for the period between the two changes, when the temperature did rise steadily.<br><br><b>Marking points:</b> 1 mark for a conclusion naming the constant temperature during changes of state; 1 mark for the hypothesis judged refuted (not supported) for the melting and boiling periods; 1 mark for the data cited in support (0 °C held while ice was present, 100 °C held while boiling).",
      {});
  }
]), ["State the conclusion the data carry, then judge the hypothesis against it.", "Refuted where the temperature held; supported only where it rose."]);

/* ---------- SC7.6.4 Tools used accurately and safely (CORE) ---------- */
// CORE residue: the bank covers choosing safe handling and accurate
// measurement practice. The residue is the using itself: handling a hot
// plate and kettle, and reading a thermometer in a live investigation.
E("s7-u2-tools-safety", 2, ["SC7.6.4"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe one when heating water for a class investigation?",
      "Use a hot plate or kettle as directed, keep the cord and water apart from the edge of the bench, and treat every heated container as hot",
      ["Carry a full beaker of just-boiled water across the crowded room to your bench when you are ready for it in class",
       "Lean over the container of hot water to watch the thermometer reading inside it more closely",
       "Leave the hot plate switched on and unattended while you leave to get more materials"],
      "Heating investigations combine hot water, glassware and electricity. Working at the bench, keeping water and cords managed, and assuming heated containers are hot prevents the common injuries. Carrying boiling water, leaning over steam, and leaving a hot plate unattended are the accident patterns.",
      {});
  },
  function () {
    return mcq("A thermometer breaks during an investigation. Which response is correct?",
      "Tell the teacher and keep clear of the spill; school thermometers contain alcohol, and cleanup follows the teacher's directions",
      ["Pick up the glass quickly with bare hands and carry it to the bin before someone steps on it in the classroom",
       "Sweep the spill and the glass under the bench so the investigation can continue without delay",
       "Wash the spilled liquid down the sink with plenty of water without mentioning it to anyone"],
      "Broken glass and spilled liquid are a teacher-managed cleanup: bare hands on glass and hidden spills injure other people. School thermometers use alcohol rather than mercury, which is safer, but the spill and glass still need proper handling.",
      {});
  }
]), ["Hot water, glass and electricity meet in these investigations; plan for all three.", "Broken glass is never a bare-hands job."]);

E("s7-u2-tools-accurate", 2, ["SC7.6.4"], 2, "var", varset([
  function () {
    return mcq("A team records a different temperature every time they check the same beaker of warm water. Which change most improves the accuracy of their readings?",
      "Stir the water gently, keep the bulb off the beaker's bottom, and wait for the column to settle before reading at eye level",
      ["Read the thermometer as quickly as possible each time, before the column has settled",
       "Use a different thermometer for each reading and average the three readings together",
       "Hold the thermometer near the top of the water only, just under the surface, for every reading the team takes"],
      "Uneven temperatures in the beaker, a bulb touching hot glass, and reading a still-moving column all produce scattered readings. Stirring evens the water out, keeping the bulb in the liquid (not on the bottom) measures the water, and waiting for the column to settle, then reading at eye level, measures it the same way every time.",
      {});
  }
]), ["Scatter in readings usually has a physical cause: uneven water, a touching bulb, a moving column.", "Stir, suspend the bulb, wait, and read at eye level."]);

/* ---------- SC7.6.5 Display data in tables and graphs ---------- */
E("s7-u2-table-build", 2, ["SC7.6.5"], 1, "var", varset([
  function () {
    return mcq("Which table correctly organizes The Plateau Problem's data, where temperature was recorded every 3 minutes during melting and again during boiling?",
      "A table with a time column (0, 3, 6, 9... minutes) and two temperature columns, one for the melting run and one for the boiling run",
      ["A table with one row listing every temperature in the order the student happens to remember them afterward",
       "A table with temperatures down the side and the names of the group members across the top instead",
       "A table with a single column of temperatures and no times recorded beside any of them"],
      "The data are temperatures measured at times, in two runs. The table needs the independent variable (time) and a column for each run's temperatures so the two plateaus can be compared. Times are essential: without them, the plateaus cannot be seen at all.",
      {});
  }
]), ["The table must keep time with temperature, for both runs.", "No times, no plateaus: the display would hide the result."]);

E("s7-u2-graph-choice", 2, ["SC7.6.5"], 3, "gen", function () {
  var cases = [
    { sub: "a waxy solid", melt: -10, boil: 55, yMax: 80 },
    { sub: "a crystalline solid", melt: 5, boil: 78, yMax: 100 },
    { sub: "a powdered solid", melt: 18, boil: 96, yMax: 120 },
    { sub: "a metallic solid", melt: -4, boil: 64, yMax: 90 }
  ];
  var c = pick(cases);
  var q = mcq("The graph shows " + c.sub + " being heated steadily until it has all boiled. At what temperatures does it melt and boil?",
    "It melts at " + c.melt + " °C and boils at " + c.boil + " °C",
    ["It melts at " + c.boil + " °C and boils at " + c.melt + " °C",
     "It melts at 0 °C and boils at 100 °C, like every substance",
     "It melts at " + c.melt + " °C and boils at " + (c.boil + 20) + " °C"],
    "Changes of state happen along the plateaus, where the temperature holds steady. The first plateau sits at " + c.melt + " °C, so that is the melting temperature; the second sits at " + c.boil + " °C, the boiling temperature. Only water melts at 0 °C and boils at 100 °C; every substance has its own pair of values.",
    {});
  q.figure = s7HeatingCurveSVG(c.melt, c.boil, 30, c.yMax);
  return q;
}, ["Find the two flat sections and read their heights off the temperature axis.", "First plateau is melting, second is boiling; only water is 0 and 100."]);

E("s7-u2-cr-display", 2, ["SC7.6.5", "SC7.6.8"], 2, "var", varset([
  function () {
    return textq("A student heated a beaker of ice water and recorded: 0 min, 0 °C; 3 min, 0 °C; 6 min, 0 °C; 9 min, 12 °C; 12 min, 31 °C; 15 min, 55 °C; 18 min, 82 °C; 21 min, 100 °C; 24 min, 100 °C; 27 min, 100 °C. Organize these results into a table, and state the two plateau temperatures the table shows and what each plateau means. (3 marks)",
      ["table of time and temperature", "plateau at 0 while melting", "plateau at 100 while boiling"],
      "<b>Model answer:</b> Table (title: Temperature of heated ice water over time): Time (min) | Temperature (°C). 0 | 0. 3 | 0. 6 | 0. 9 | 12. 12 | 31. 15 | 55. 18 | 82. 21 | 100. 24 | 100. 27 | 100. The first plateau is at 0 °C for the first 6 minutes: the ice was melting, and the temperature held steady during the change of state. The second plateau is at 100 °C from 21 minutes on: the water was boiling, and the temperature again held steady during the change of state.<br><br><b>Marking points:</b> 1 mark for a titled table with all ten time and temperature pairs in order; 1 mark for the 0 °C plateau identified as melting; 1 mark for the 100 °C plateau identified as boiling.",
      {});
  }
]), ["Table first, with a title and both columns complete.", "Then read the flat stretches: steady temperature means a change of state."]);

/* ---------- SC7.6.6 Design an experiment ---------- */
E("s7-u2-design-absorb", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("In Absorb That Energy, two cans of oil stood under one lamp: one can dark, one light. The investigation's hypothesis had two parts. Which set of design features matches the investigation?",
      "Compared: the cans' surfaces. Kept the same: the amount of oil, the lamp, and the distance. Measured: the oil temperature every 5 minutes",
      ["Compared: the amounts of oil. Kept the same: the cans' colours. Measured: the lamp's temperature",
       "Compared: two different lamps. Kept the same: the temperature readings. Measured: the colour of the oil",
       "Compared: oil against water. Kept the same: nothing, to keep it realistic. Measured: which can felt warmer"],
      "The investigation asks whether colour and finish affect absorption, so surface is the variable that changes; amount of oil, lamp and distance are controlled so the comparison is fair; and temperature, taken at regular times, is the measurement. The two-part hypothesis covers colour (dark against light) and finish (shiny against dull).",
      {});
  }
]), ["Name what changed, what was held, and what was measured.", "One variable changes; everything else that could matter is held the same."]);

E("s7-u2-design-challenge", 2, ["SC7.6.6"], 2, "var", varset([
  function () {
    return mcq("In the Heat Transfer Design Challenge, every team insulates a juice box and compares it with an uninsulated control juice box taken from the same refrigerator. Why is the control box essential to the design?",
      "It shows how much an uninsulated box warms in the same conditions, so a team's result measures their insulation and not just the room",
      ["It gives the team a spare juice box to use if their insulated box leaks or is damaged during the two hours of the test",
       "It keeps the refrigerator at a steady temperature while the test is running",
       "It proves that all juice boxes taken from a refrigerator start out at exactly the same temperature"],
      "Rooms differ and afternoons warm up; without a control, a team cannot tell whether their box stayed cold because of their design or because the room was cool. The control warms under the same conditions with no insulation, so the difference between the two boxes is the design's effect.",
      {});
  }
]), ["A result means little without the comparison case.", "The control shows what happens with no treatment, in the same conditions."]);

E("s7-u2-cr-design-test", 2, ["SC7.6.6"], 3, "var", varset([
  function () {
    return textq("A school wants to know which of three wrapping materials (bubble wrap, newspaper, or a wool blanket) best keeps a hot drink hot during a winter bus ride. Design a fair test to find out. State the question your test answers, your hypothesis, the variables you will change, keep the same, and measure, and the procedure you will follow. This design question is for practice and teacher-picked sets; it does not appear in composed unit tests. (4 marks)",
      ["hypothesis naming a material", "same drink volume and starting temperature", "temperature measured at set times", "control cup with no wrapping"],
      "<b>Model answer:</b> Question: which wrapping material keeps a hot drink hottest over the time of a bus ride? Hypothesis: the wool blanket will keep the drink hottest, because its fibres trap the most air, and trapped air insulates. Changed variable: the wrapping material (bubble wrap, newspaper, wool blanket, and one unwrapped control cup). Kept the same: the cups, the drink, the volume in each cup, the starting temperature, the room, and the measuring schedule. Measured variable: the drink temperature in each cup every 10 minutes for an hour. Procedure: fill all four cups at the same time from the same kettle, wrap three as designed, leave one unwrapped, place all four side by side, record temperatures on schedule, and compare the temperature drops; repeat once to check the result.<br><br><b>Marking points:</b> 1 mark for a testable question and a hypothesis with a reason; 1 mark for the changed variable (wrapping material) with an unwrapped control; 1 mark for at least three factors kept the same (cups, volume, starting temperature, place, schedule); 1 mark for a measurement plan (temperature at set times over a set period) that would let the materials be ranked.",
      {});
  }
]), ["Question, hypothesis with a reason, one changed variable, controls, and a measuring plan.", "Do not forget the unwrapped control cup."]);

/* ---------- SC7.6.7 Apparatus used safely (CORE) ---------- */
// CORE residue: the bank covers recognizing safe set-up and practice
// around hot liquids, lamps and glassware. The residue is carrying out
// the procedure with the apparatus in hand.
E("s7-u2-apparatus-safety", 2, ["SC7.6.7"], 1, "var", varset([
  function () {
    return mcq("In Absorb That Energy, the apparatus includes a 100 W lamp, cans of oil, glassware and thermometers. Which set-up is the safe one?",
      "The lamp is clamped steady, cords are kept away from the oil and water, and the hot lamp is treated as hot even after it is switched off",
      ["The lamp rests loosely on the edge of the bench so anyone can aim it by hand at any point during the run",
       "The cans of oil are filled right up to the brim so that no oil can possibly slosh out during the whole run",
       "The thermometers are laid across the hot lamp before the run to warm them up faster"],
      "A 100 W lamp is a burn and electrical hazard: it must be secured, kept clear of liquids and cords, and treated as hot after use. Loose lamps fall, brim-full cans spill hot oil, and nothing belongs on the lamp itself.",
      {});
  }
]), ["The lamp is the hazard to plan around: secure it, keep liquids and cords clear.", "A switched-off lamp is still a hot lamp."]);

E("s7-u2-apparatus-choice", 2, ["SC7.6.7"], 2, "var", varset([
  function () {
    return mcq("A team's Absorb That Energy readings jump around between minutes. Their thermometer is pushed through a hole in the can's lid so its bulb touches the can's metal side. What should they fix?",
      "Reposition the thermometer so its bulb sits in the oil, not touching the can, and seal the lid hole so heat does not escape",
      ["Read the thermometer much faster each time, before its reading has a chance to change at all",
       "Use a bigger, more powerful lamp so the temperature of the oil changes more quickly",
       "Stir the oil with the thermometer while it is still plugged through the hole in the lid of the can"],
      "A bulb touching the metal reads the can's temperature, not the oil's, and the can responds to the lamp faster and unevenly. The bulb belongs in the oil, clear of the sides, and the plasticine seal around the lid keeps heat in and the thermometer steady, which is part of the laboratory's own set-up.",
      {});
  }
]), ["Ask what the thermometer is actually touching.", "The bulb belongs in the oil, clear of the can, with the lid sealed."]);

/* ---------- SC7.6.8 Display data using tables and graphs ---------- */
E("s7-u2-graph-key", 2, ["SC7.6.8"], 1, "var", varset([
  function () {
    return mcq("A student graphs both cans' temperatures from Absorb That Energy on one set of axes. What must the graph include so a reader can use it?",
      "A title, labelled axes with units, and a key telling which line is which can",
      ["A paragraph under the graph explaining every reading",
       "The two lines drawn in the same colour so they can be compared",
       "Only the final temperatures, since those decide the conclusion"],
      "A two-line graph is read by matching lines to cans, which needs a key, and by reading values off the axes, which need labels and units. A title states what the display shows. Same-colour lines and dropped data both destroy the comparison the graph exists to make.",
      {});
  }
]), ["Two lines need a key; values need labelled axes with units.", "A display that hides which line is which has failed at its job."]);

E("s7-u2-display-absorb", 2, ["SC7.6.8", "SC7.6.5"], 3, "var", varset([
  function () {
    var q = mcq("The graph shows the two cans from Absorb That Energy. At the 15-minute mark the lamp is switched off. Which statement is best supported?",
      "At 15 minutes the dark can is about 10 °C warmer, and because good absorbers are also good emitters, the dark can should also cool faster once the lamp is off",
      ["At 15 minutes the light can is warmer than the dark can, and because it warmed faster it will also cool faster once the lamp is off",
       "The two cans have reached exactly the same temperature as each other at the 15-minute mark",
       "The dark can will stay warmer than the light can forever, even long after the lamp is switched off"],
      "Reading the lines at 15 minutes: the dark can is near 43 °C and the light can near 33 °C, a difference of about 10 °C. The laboratory's analysis adds the emission principle: surfaces that absorb well also emit well, so the dark can gives its heat away faster and cools faster in the dark. Nothing supports forever; both cans return to room temperature.",
      {});
    q.figure = s7AbsorbGraphSVG([0, 5, 10, 15], [22, 30, 37, 43], [22, 26, 30, 33]);
    return q;
  }
]), ["Read both lines at 15 minutes and subtract.", "Then use the emission principle: good absorbers are good emitters."]);

/* ---------- SC7.6.9 Conclusions from data ---------- */
E("s7-u2-conclusion-support", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("In The Plateau Problem, a class's graph shows the temperature holding at 0 °C while ice melts, rising steadily, then holding at 100 °C while the water boils. Which conclusion do these data support?",
      "While a substance changes state, its temperature stays constant; the added energy goes into the change of state itself",
      ["A thermometer cannot measure temperature properly while a substance is in the middle of changing state",
       "Ice melts and water boils at one and the same temperature on the graph",
       "Heating a substance always raises its temperature steadily from start to finish"],
      "The two plateaus are the data's message: during melting and boiling, added energy does the work of changing state instead of raising temperature. The thermometer worked throughout, the two changes happen at different temperatures, and the steady-rise claim is exactly what the plateaus disprove.",
      {});
  }
]), ["The plateaus are the evidence; the conclusion must be about them.", "Constant temperature during a change of state is what the data show."]);

E("s7-u2-conclusion-refute", 2, ["SC7.6.9"], 2, "var", varset([
  function () {
    return mcq("Before the investigation, a student predicted the dark can and the light can would warm at the same rate, 'because the lamp shines on both equally.' The data show the dark can 10 °C warmer after 15 minutes. What should the student conclude?",
      "The prediction is refuted: equal shining is not equal absorbing, and the dark surface absorbed more of the lamp's radiant heat",
      ["The prediction is supported, because both cans did warm up under the lamp",
       "The data must be wrong, because the lamp shone equally on both cans the whole time",
       "Nothing at all can be concluded until the whole test is done over again with water instead of oil in both cans"],
      "A conclusion judges the prediction against the data. Both cans received the same radiation, but absorption depends on the surface, and the 10 °C gap shows the dark surface absorbed more. The prediction is refuted, and the data, not the prediction, carry the conclusion.",
      {});
  }
]), ["Judge the prediction against the numbers, not against the intention.", "Equal shining is not equal absorbing."]);

E("s7-u2-cr-conclusion", 2, ["SC7.6.9"], 3, "var", varset([
  function () {
    return textq("In Absorb That Energy, a team's hypothesis was: 'The dark can will warm faster than the light can, and the dull can will warm faster than the shiny can.' Their results after 15 minutes under the lamp: dark dull can, 43 °C; light shiny can, 33 °C; light dull can, 38 °C. State a conclusion and explain how the data support or refute each part of the hypothesis. (3 marks)",
      ["dark warmed faster, supported", "dull warmed faster, supported", "both parts supported by the data"],
      "<b>Model answer:</b> Both parts of the hypothesis are supported. For colour: the dark dull can reached 43 °C against the light dull can's 38 °C, so with finish held the same, the dark surface warmed faster. For finish: the light dull can reached 38 °C against the light shiny can's 33 °C, so with colour held the same, the dull surface warmed faster. Conclusion: dark and dull surfaces absorb radiant heat better than light and shiny ones.<br><br><b>Marking points:</b> 1 mark for the colour comparison made fairly (dark dull against light dull) with its verdict; 1 mark for the finish comparison made fairly (light dull against light shiny) with its verdict; 1 mark for an overall conclusion naming dark and dull surfaces as the better absorbers.",
      {});
  }
]), ["Compare fairly: hold one feature the same in each comparison.", "Colour is judged between the two dull cans; finish between the two light cans."]);

/* Practice-only entries: the design-an-investigation CR is excluded from
   composed unit tests by the composer's noCompose flag (v1.2.0). It stays
   available in practice draws and explicit teacher picks. */
var NO_COMPOSE_U2 = {
  "s7-u2-cr-design-test": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });
