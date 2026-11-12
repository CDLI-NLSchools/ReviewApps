/* Biology 2201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/bio-2201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-u1.js ----- */
// Biology 2201 Unit 1 bank: Ecosystem Interactions and Population Dynamics.
// All 85 selected-response questions from the Unit 1 Mid-Year Exam Review
// book (Jason Counsel's H5P review book, CDLI), converted Nov 12, 2026 by
// convert2201.py from the extracted book. Stems, options and keys are the
// book's, verbatim, under Jason's ruling that his review books replicate
// as-is. Each book Hint panel is the entry's hint and each Solution panel
// its worked solution; the books' Help panels (video pointers) have no
// slot in the app and are not carried. Indicator codes follow each
// chapter's declared numbers, verified against the Indicator panels,
// with one ruling applied: the STSE Indicators 4 and 5 chapter's 13
// questions test human population and footprint outcomes and carry 5.5.
// Levels are the calibrated tags in bio2201-levels.json. House-style
// fixes, kept minimal: em dashes in the book text become commas, colons
// or periods; one duplicated word in an option is repaired; diagrams
// travel with their questions as figure images under
// banks/bio-2201/assets/.

/* ---------- 5.1 Energy in Ecosystems ---------- */
E("bio-u1-51-q01",1,["5.1"],1,"var",varset([
  function(){
    return mcq("What is the main energy source for most ecosystems?",
      "Light energy",
      ["Chemical energy","Sound energy","Thermal energy"],
      "The correct answer is light energy . Most ecosystems run on energy captured from sunlight by producers during photosynthesis. Chemical energy is a product stored inside molecules, not the original source; sound and thermal energy are not used by producers to build food.",
      {});
  }
]),["Think about where the energy comes from that producers use to make food in the vast majority of ecosystems on Earth's surface."]);
E("bio-u1-51-q02",1,["5.1"],2,"var",varset([
  function(){
    return mcq("An ecosystem is discovered near a hydrothermal vent where no sunlight can access it. Which process most likely supports the food web?",
      "Chemosynthesis",
      ["Photosynthesis","Respiration","Transpiration"],
      "The correct answer is chemosynthesis . Without light, photosynthesis can't occur, but certain bacteria can build energy-rich molecules using chemicals (such as hydrogen sulfide) released from the vent. Respiration releases energy from food rather than capturing it from the environment, and transpiration is water loss from plants, unrelated to energy entering the ecosystem.",
      {});
  }
]),["Without sunlight, producers there can't photosynthesize. What process lets bacteria make energy-rich molecules using chemicals instead of light?"]);
E("bio-u1-51-q03",1,["5.1"],2,"var",varset([
  function(){
    return mcq("A plant is placed in darkness for several days. Which change will most directly occur?",
      "Glucose production decreases",
      ["Chemical energy production increases","Oxygen production increases","Water absorption stops"],
      "The correct answer is glucose production decreases . Photosynthesis requires light to convert carbon dioxide and water into glucose; without light, this process slows or stops, so glucose (and the oxygen released alongside it) decreases rather than increases. Water absorption through the roots is not directly dependent on light.",
      {});
  }
]),["Photosynthesis requires light. If light is removed, what happens to the product of photosynthesis that the plant normally makes?"]);
E("bio-u1-51-q04",1,["5.1"],1,"var",varset([
  function(){
    return mcq("What type of organisms obtain energy by consuming other organisms?",
      "Consumers",
      ["Autotrophs","Producers","Plants"],
      "The correct answer is consumers , the term for organisms that eat other organisms to get energy. Autotrophs and producers are the same category, organisms that make their own food, which is the opposite of what the question describes. 'Plants' is too narrow and describes only one type of producer.",
      {});
  }
]),["This is the basic definition, organisms that get energy by eating other organisms rather than making their own food."]);
E("bio-u1-51-q05",1,["5.1"],2,"var",varset([
  function(){
    return mcq("A wolf hunts a moose in a boreal forest ecosystem. Which statement best describes the transfer of energy?",
      "Energy stored in the moose is transferred to the wolf.",
      ["Energy is created when the wolf consumes the moose.","The wolf receives energy directly from sunlight.","Energy cycles completely back to the producer."],
      "The correct answer is energy stored in the moose is transferred to the wolf . Energy cannot be created (it can only be transferred or transformed), so the moose's stored energy simply moves to the wolf when eaten. The wolf does not get energy directly from sunlight, and energy does not cycle back to the producer once consumed: it is mostly lost as heat through the food chain.",
      {});
  }
]),["Energy isn't created or destroyed, it's transferred. Where did the moose get its energy from, and where does that energy go when the wolf eats it?"]);

/* ---------- 8.1 (STSE) & Indicator #1 — Levels of Ecological Organization ---------- */
E("bio-u1-81-q01",1,["8.1", "5.1"],1,"var",varset([
  function(){
    return mcq("Which of the following best defines ecology?",
      "The study of organism interactions",
      ["The study of animal behavior","The study of cell structures","The study of chemical reactions"],
      "The correct answer is the study of organism interactions . Ecology specifically studies how living things interact with each other and their environment. Studying cell structures or chemical reactions falls under cell biology or chemistry, and animal behavior alone is only one small piece of ecology, not the whole definition.",
      {});
  }
]),["Ecology is about more than just one organism, think about what relationships it studies."]);
E("bio-u1-81-q02",1,["8.1", "5.1"],1,"var",varset([
  function(){
    return mcq("Which term describes all individuals of one species in an area?",
      "Population",
      ["Community","Ecosystem","Species"],
      "The correct answer is population , defined as all individuals of one species living in the same area. A community includes multiple species, an ecosystem includes the community plus the physical environment, and 'species' alone doesn't specify a particular group or location.",
      {});
  }
]),["This term refers to one species only, in one area, at one time."]);
E("bio-u1-81-q03",1,["8.1", "5.1"],1,"var",varset([
  function(){
    return mcq("Which of the following best describes a community?",
      "All populations",
      ["All ecosystems","One species","One organism"],
      "The correct answer is all populations (of different species) living together in an area. 'All ecosystems' is too broad since an ecosystem includes abiotic factors too. 'One species' describes a population, not a community, and 'one organism' is far too narrow.",
      {});
  }
]),["A community includes more than one species, think about how it differs from a population."]);
E("bio-u1-81-q04",1,["8.1", "5.1"],2,"var",varset([
  function(){
    return mcq("A tropical rainforest contains many ecosystems. This demonstrates which of the following?",
      "Biomes contain ecosystems",
      ["Ecosystems contain biomes","Habitats create biospheres","Species form climates"],
      "The correct answer is biomes contain ecosystems . A rainforest is a biome, and the many distinct ecosystems within it (such as the forest floor, canopy, and rivers) show that a biome is the larger category containing multiple ecosystems, the reverse relationship described in the other choices.",
      {});
  }
]),["Think about the size hierarchy: biome \u2192 ecosystem \u2192 community \u2192 population. Which is the bigger container?"]);
E("bio-u1-81-q05",1,["8.1", "5.1"],2,"var",varset([
  function(){
    return mcq("A researcher studies all living organisms and their physical environment in a wetland. What level of organization is being investigated?",
      "Ecosystem",
      ["Community","Population","Species"],
      "The correct answer is ecosystem , because the question specifically mentions both living organisms AND their physical (abiotic) environment together, that combination defines an ecosystem. A community would only include the living organisms, not the physical environment.",
      {});
  }
]),["Notice the question mentions both living organisms AND their physical (abiotic) environment together, what level of organization includes both?"]);
E("bio-u1-81-q06",1,["8.1", "5.1"],2,"var",varset([
  function(){
    return mcq("Which example represents a community?",
      "All fish, algae, insects, and frogs in a pond",
      ["All moose living in a forest","All organisms and abiotic factors in a lake","A single beaver living in a pond"],
      "The correct answer is all fish, algae, insects, and frogs in a pond, multiple different species living together, which is exactly what a community is. The option mentioning abiotic factors describes an ecosystem rather than a community, and the other two options describe only a single species or a single organism (which would be a population or an individual, not a community).",
      {});
  }
]),["A community is all the different species living together in one area, not just one species, and not including abiotic factors."]);

/* ---------- 5.2 Energy Pyramids & Trophic Levels ---------- */
E("bio-u1-52-q01",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Which group of organisms occupies the first trophic level in almost all ecosystems?",
      "Producers",
      ["Carnivores","Herbivores","Omnivores"],
      "The correct answer is producers , since they make their own food using energy from the sun (or chemicals) and form the base of every food chain. Carnivores, herbivores, and omnivores are all consumers that occupy higher trophic levels because they depend on other organisms for energy.",
      {});
  }
]),["The first trophic level is always the base of the energy pyramid, what kind of organism makes its own food?"]);
E("bio-u1-52-q02",1,["5.2"],2,"var",varset([
  function(){
    return mcq("If a grassland ecosystem experiences a sudden, drastic decline in its primary producer population, which trophic level will experience the most immediate negative impact?",
      "Primary consumers",
      ["Quaternary consumers","Secondary consumers","Tertiary consumers"],
      "The correct answer is primary consumers , because they feed directly on producers and would lose their food source immediately. Secondary, tertiary, and quaternary consumers are further along the food chain, so the effects on them would happen more gradually as the shortage works its way up.",
      {});
  }
]),["Producers are eaten directly by which consumer level? That level would feel the food shortage first."]);
E("bio-u1-52-q03",1,["5.2"],2,"var",varset([
  function(){
    var q=mcq("If the phytoplankton in the energy pyramid have 50,000 Joules (J) of energy, how much energy will be available to the zooplankton?",
      "5,000 J",
      ["50 J","500 J","50,000 J"],
      "The correct answer is 5,000 J . Only about 10% of energy transfers from one trophic level to the next (most is lost as heat), so 10% of 50,000 J is 5,000 J. The other options either ignore the 10% rule entirely or apply it incorrectly.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-52-q03.png" alt="Energy pyramid in an underwater scene with four levels, from the bottom: Phytoplankton, Zooplankton, Herring, and Salmon at the top" style="max-width:100%;height:auto">';
    return q;
  }
]),["Remember the 10% rule: only about 10% of energy transfers from one trophic level to the next."]);
E("bio-u1-52-q04",1,["5.2"],2,"var",varset([
  function(){
    return mcq("Which best describes the shape of an energy pyramid?",
      "Heat loss lowers the amount of energy available to higher levels",
      ["Energy accumulates at higher levels because top predators live longer","Energy increases at each level due to the concentration of nutrients","Respired carbon dioxide is converted back into usable energy"],
      "The correct answer is heat loss lowers the amount of energy available to higher levels . Energy is lost as heat at every trophic level through metabolic processes like respiration, which is why each level holds less energy than the one below it. Energy does not accumulate at higher levels, increase due to nutrient concentration, or get converted back from carbon dioxide, that would violate the loss of usable energy that occurs at each transfer.",
      {});
  }
]),["Think about why pyramids get smaller at each level, what happens to most of the energy at each transfer?"]);
E("bio-u1-52-q05",1,["5.2"],2,"var",varset([
  function(){
    return mcq("An energy pyramid shows that producers contain 20 000 kJ of energy. Approximately how much energy would be available to primary consumers?",
      "2 000 kJ",
      ["20 kJ","200 kJ","10 000 kJ"],
      "The correct answer is 2 000 kJ . Applying the 10% rule, only about 10% of the producers' energy transfers to primary consumers: 10% of 20,000 kJ is 2,000 kJ. The other answers don't reflect this standard energy-transfer efficiency.",
      {});
  }
]),["Apply the 10% rule to find out how much energy moves up to the next level."]);
E("bio-u1-52-q06",1,["5.2"],2,"var",varset([
  function(){
    return mcq("A food chain is shown: Grass \u2192 Rabbit \u2192 Fox \u2192 Hawk. Which organism occupies the third trophic level?",
      "Fox",
      ["Grass","Hawk","Rabbit"],
      "The correct answer is fox . Counting trophic levels from the producer: grass is the first trophic level, rabbit is the second, fox is the third, and hawk is the fourth. Grass is the first level (a producer, not a consumer at all), and hawk is actually the fourth level, not the third.",
      {});
  }
]),["Grass is the first trophic level (producer). Count the steps from there to find the third trophic level."]);
E("bio-u1-52-q07",1,["5.2"],2,"var",varset([
  function(){
    return mcq("A forest experiences a major decline in its producer population due to disease. Which outcome is most likely?",
      "Energy available to higher trophic levels will decrease.",
      ["Energy available to consumers will increase.","Predator populations will immediately increase.","Secondary consumers will become producers."],
      "The correct answer is energy available to higher trophic levels will decrease , since producers form the base of the energy pyramid that all consumers depend on. If that base shrinks, less energy is available to flow upward, consumers won't suddenly increase, predators won't immediately benefit, and consumers cannot transform into producers.",
      {});
  }
]),["If the base of the energy pyramid shrinks, what happens to the amount of energy available to every level above it?"]);
E("bio-u1-52-q08",1,["5.2"],2,"var",varset([
  function(){
    return mcq("In an energy pyramid, why is less energy available at each successive trophic level?",
      "Much of the energy is lost as heat through metabolic processes.",
      ["Consumers convert all energy into biomass.","Energy is destroyed during feeding.","Producers absorb all available energy."],
      "The correct answer is much of the energy is lost as heat through metabolic processes , such as respiration and movement, at every level of the food chain. Energy is not destroyed (that would violate the conservation of energy) and is not entirely converted into biomass, only a small fraction (about 10%) actually becomes new body tissue that the next consumer can eat.",
      {});
  }
]),["Think about cellular respiration and what living things use most of their consumed energy for, besides growth."]);
E("bio-u1-52-q09",1,["5.2"],2,"var",varset([
  function(){
    return mcq("An aquatic ecosystem contains algae, zooplankton, small fish, and large fish. A pollutant causes a sharp decline in zooplankton. Which population would most likely decline first?",
      "Small fish",
      ["Algae","Decomposers","Large fish"],
      "The correct answer is small fish , since they feed directly on zooplankton and would be the first to lose their food source when zooplankton decline. Algae are producers unaffected directly by a consumer decline, and large fish (which eat small fish) would only be affected later, after the small fish population has already dropped.",
      {});
  }
]),["Trace the energy pathway forward from zooplankton, which organism depends directly on zooplankton as its food source?"]);
E("bio-u1-52-q10",1,["5.2"],2,"var",varset([
  function(){
    return mcq("If a disease eliminates most of the secondary consumers in an ecosystem, what is the most likely immediate effect on the primary consumers and producers?",
      "Primary consumers increase; producers decrease",
      ["Primary consumers decrease; producers decrease","Primary consumers decrease; producers increase","Primary consumers increase; producers increase"],
      "The correct answer is primary consumers increase; producers decrease . With fewer secondary consumers to eat them, primary consumers face less predation and their numbers rise; those extra primary consumers then eat more producers, causing the producer population to decline.",
      {});
  }
]),["If predators of primary consumers disappear, what happens to the primary consumer population, and then what happens to what the primary consumers eat?"]);
E("bio-u1-52-q11",1,["5.2"],3,"var",varset([
  function(){
    return mcq("A farmer wants to maximize the amount of food energy available for human consumption. Which strategy would be most efficient?",
      "Harvest producers directly for food.",
      ["Consume organisms from higher trophic levels.","Feed crops to livestock before human consumption.","Increase the number of trophic levels in the food chain."],
      "The correct answer is harvest producers directly for food . Since roughly 90% of energy is lost at each trophic transfer, eating producers directly (rather than feeding them to livestock first, or eating animals further up the chain) keeps the most energy available for people, and fewer trophic levels means less energy loss overall.",
      {});
  }
]),["Every trophic level loses about 90% of its energy. The fewer the steps between the sun and your plate, the more energy you keep."]);
E("bio-u1-52-q12",1,["5.2"],2,"var",varset([
  function(){
    var q=mcq("Based on the diagram, how would decrease in the frog population impact the energy transfer to the hawk population?",
      "Unchanged, because hawks can shift their diet to consume more rabbits",
      ["Decreased, because rabbits will experience higher predation from hawks","Increased, because frogs compete directly with rabbits for grass","Unchanged, because snakes will reproduce faster to compensate for the loss"],
      "The correct answer is unchanged, because hawks can shift their diet to consume more rabbits . In a food web (unlike a simple food chain), the hawk has more than one prey source, so a decline in frogs doesn't necessarily reduce energy flow to the hawk if it can rely more heavily on rabbits instead.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-52-q12.png" alt="Food web diagram with arrows showing energy flow: grass is eaten by a grasshopper and by a rabbit; the grasshopper is eaten by a frog; the frog is eaten by a snake; the snake and the rabbit are both eaten by a hawk" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the food web carefully, does the hawk have only one prey source, or can it get energy through multiple paths?"]);

/* ---------- 8.2 (STSE) Energy Entering the Biosphere ---------- */
E("bio-u1-82-q01",1,["8.2"],2,"var",varset([
  function(){
    return mcq("A hydrothermal vent community contains chemosynthetic bacteria, tube worms, crabs, and fish. Which organism is responsible for introducing energy into this ecosystem?",
      "Chemosynthetic bacteria",
      ["Crabs","Fish","Tube worms"],
      "The correct answer is chemosynthetic bacteria , the only producers in this list. They introduce new energy into the ecosystem by converting chemical energy from the vent into food. Tube worms, crabs, and fish are all consumers that rely on that energy rather than creating it.",
      {});
  }
]),["Energy has to enter an ecosystem somewhere. Which organism in this list is a producer that doesn't need sunlight?"]);
E("bio-u1-82-q02",1,["8.2"],2,"var",varset([
  function(){
    return mcq("A food chain is shown: Grass \u2192 Grasshopper \u2192 Frog \u2192 Snake. Which statement best explains why the snake population is smaller than the grasshopper population?",
      "Less energy is available at higher trophic levels.",
      ["Energy increases as it moves through the food chain.","Grasshoppers compete with snakes for food.","Snakes reproduce more slowly than grasshoppers."],
      "The correct answer is less energy is available at higher trophic levels . Energy decreases by about 90% at each transfer up the food chain, so fewer organisms (and a smaller population) can be supported at the snake's trophic level than at the grasshopper's. Energy does not increase moving up a food chain, and reproduction rate differences are not the main reason for the population size difference described here.",
      {});
  }
]),["Apply the 10% rule across three energy transfers and think about why the top of a food chain always supports fewer individuals."]);
E("bio-u1-82-q03",1,["8.2"],3,"var",varset([
  function(){
    return mcq("A student claims that all energy entering an ecosystem is eventually recycled. Which statement best evaluates this claim?",
      "The claim is incorrect because much energy is lost as heat during metabolism.",
      ["The claim is correct because consumers store energy permanently.","The claim is correct because decomposers recycle all energy.","The claim is incorrect because producers cannot use solar energy."],
      "The correct answer is that the claim is incorrect because much energy is lost as heat during metabolism . Unlike matter (which does cycle through ecosystems), energy flows through and is progressively lost as heat at each trophic transfer: it is not stored permanently or fully recycled by decomposers.",
      {});
  }
]),["Energy and matter behave differently in ecosystems, matter cycles, but what happens to energy as heat during metabolism?"]);
E("bio-u1-82-q04",1,["8.2"],2,"var",varset([
  function(){
    return mcq("A decline in a top predator causes herbivore populations to increase dramatically. Which consequence is most likely?",
      "Decreased producer populations",
      ["Decreased competition among herbivores","Increased energy entering the ecosystem","Increased producer populations"],
      "The correct answer is decreased producer populations . With fewer predators controlling them, herbivores increase and consume more plant matter, putting greater pressure on and reducing the producer population, the opposite of an increase in producers.",
      {});
  }
]),["If there are more herbivores eating the same amount of plant life, what happens to the producers?"]);
E("bio-u1-82-q05",1,["8.2"],2,"var",varset([
  function(){
    var q=mcq("Which conclusion is best supported by the pyramid?",
      "Energy transfer between trophic levels is inefficient.",
      ["Energy is recycled completely between trophic levels.","Tertiary consumers produce more energy than producers.","Producers depend on consumers for energy."],
      "The correct answer is energy transfer between trophic levels is inefficient . The pyramid shape itself, getting smaller at each level, visually demonstrates that only a fraction of energy passes from one level to the next, rather than energy being recycled completely or produced by consumers (producers don't depend on consumers for their energy; it's the other way around).",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-82-q05.png" alt="Energy pyramid with four labelled levels and their energies: Producers 100 000 kJ, Primary Consumers 10 000 kJ, Secondary Consumers 1000 kJ, Tertiary Consumers 100 kJ" style="max-width:100%;height:auto">';
    return q;
  }
]),["Compare the energy values at each level in the diagram, what trend do you notice from bottom to top?"]);
E("bio-u1-82-q06",1,["8.2"],2,"var",varset([
  function(){
    return mcq("A scientist observes that the tertiary consumer population suddenly doubles. Which explanation explains the increase?",
      "Producer biomass likely increased, allowing more energy to move through the food web.",
      ["Energy transfer efficiency increased to 100%.","Secondary consumers no longer lose energy through metabolism.","Tertiary consumers began producing their own food."],
      "The correct answer is producer biomass likely increased, allowing more energy to move through the food web . Since energy flows up from producers through each trophic level, an increase at the top almost always traces back to more energy entering at the base. Energy transfer efficiency does not suddenly jump to 100%, and tertiary consumers cannot make their own food.",
      {});
  }
]),["For tertiary consumers to increase, there must be more food available below them. Trace that increase back to its ultimate source."]);
E("bio-u1-82-q07",1,["8.2"],2,"var",varset([
  function(){
    return mcq("If a disease reduced the producer population in an ecosystem by 50%, which outcome would most likely occur over time?",
      "Energy available to all higher trophic levels would decrease.",
      ["Energy available to tertiary consumers would increase.","Secondary consumers would become producers.","The efficiency of energy transfer would increase."],
      "The correct answer is energy available to all higher trophic levels would decrease , since every consumer level ultimately depends on the energy producers capture. A reduction at the base limits how much energy can flow upward: it would not increase energy at the top, improve transfer efficiency, or allow secondary consumers to become producers.",
      {});
  }
]),["If the base of the pyramid is cut in half, what happens to every level that depends on it for energy?"]);
E("bio-u1-82-q08",1,["8.2"],2,"var",varset([
  function(){
    return mcq("Why are food chains rarely longer than four or five trophic levels?",
      "Energy becomes increasingly limited at higher trophic levels.",
      ["Consumers create less biomass at lower trophic levels.","Energy is recycled back to producers after each transfer.","Producers stop photosynthesizing after several transfers."],
      "The correct answer is energy becomes increasingly limited at higher trophic levels . Because roughly 90% of energy is lost at each transfer, after four or five levels there typically isn't enough energy left to support another trophic level. Energy is not recycled back to producers, and producers don't stop photosynthesizing because of the food chain's length.",
      {});
  }
]),["Each transfer loses about 90% of the energy. After several transfers, how much usable energy is realistically left?"]);

/* ---------- 5.3 Canadian Biomes ---------- */
E("bio-u1-53-q01",1,["5.3"],2,"var",varset([
  function(){
    return mcq("A region experiences long, cold winters, short growing seasons, and is dominated by coniferous trees such as spruce and fir. Which Canadian biome is being described?",
      "Boreal forest",
      ["Grassland","Temperate deciduous forest","Tundra"],
      "The correct answer is boreal forest , the Canadian biome characterized by cold winters, short summers, and coniferous trees like spruce and fir. Grassland is dominated by grasses, temperate deciduous forest has broadleaf trees that lose their leaves, and tundra lacks substantial tree cover at all.",
      {});
  }
]),["Coniferous (cone-bearing) trees like spruce and fir are the signature vegetation of which Canadian biome?"]);
E("bio-u1-53-q02",1,["5.3"],2,"var",varset([
  function(){
    return mcq("A biome receives very little precipitation, experiences large temperature fluctuations, and is dominated by grasses rather than trees. Which biome is this?",
      "Grassland",
      ["Boreal forest","Temperate rainforest","Tundra"],
      "The correct answer is grassland , matching low precipitation, large temperature swings, and grass-dominated vegetation, the Canadian Prairies. Boreal forest and temperate rainforest both have significant tree cover, and tundra has very different (cold, low-precipitation but stable) conditions with no grass dominance in the way described.",
      {});
  }
]),["Low precipitation and grass-dominated vegetation, picture the Canadian Prairies."]);
E("bio-u1-53-q03",1,["5.3"],1,"var",varset([
  function(){
    return mcq("Which abiotic factor most directly limits plant growth in the tundra biome?",
      "Permafrost",
      ["High salinity","Low oxygen levels","Strong ocean currents"],
      "The correct answer is permafrost , the permanently frozen layer of soil that prevents deep root growth and limits which plants can survive. High salinity and ocean currents are not defining tundra factors, and low oxygen is not a primary limitation for tundra plant growth.",
      {});
  }
]),["Think about what's beneath the soil surface in the tundra that prevents deep root growth."]);
E("bio-u1-53-q04",1,["5.3"],2,"var",varset([
  function(){
    var q=mcq("What Canadian biome is represented by the information in the climograph?",
      "Temperate rainforest",
      ["Boreal forest","Grassland","Temperate deciduous forest"],
      "The correct answer is temperate rainforest , shown by the climograph's high year-round precipitation combined with mild winters and warm (not extreme) summers, a coastal climate pattern. Boreal forest and tundra would show much colder winters and far less precipitation, and grassland would show much lower precipitation overall.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-53-q04.png" alt="Climograph: blue precipitation bars stay high all year, about 180 to 410 mm per month with the lowest values in July and August; the red temperature line peaks at about 20 degrees Celsius in July and August and stays above 0 degrees in winter; the graph is annotated warm summers and mild winters" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at both bars (precipitation) and the line (temperature), mild winters with high year-round precipitation suggest a coastal biome."]);
E("bio-u1-53-q05",1,["5.3"],2,"var",varset([
  function(){
    return mcq("Which statement best explains why biodiversity is generally lower in the tundra than in temperate forests?",
      "Harsher abiotic conditions limit the number of species that can survive.",
      ["Energy enters tundra ecosystems through chemosynthesis.","Tundra ecosystems contain more predators than producers.","Tundra ecosystems receive more solar energy."],
      "The correct answer is harsher abiotic conditions limit the number of species that can survive . Extreme cold, permafrost, and short growing seasons in the tundra restrict which species can adapt and survive there, unlike the more moderate conditions in temperate forests. Energy entering through chemosynthesis and predator/producer ratios are not the actual explanations for the biodiversity difference.",
      {});
  }
]),["Tundra has extreme cold, short growing seasons, and permafrost. How would those conditions affect the variety of species that can survive there?"]);
E("bio-u1-53-q06",1,["5.3"],2,"var",varset([
  function(){
    return mcq("Climate change causes average temperatures to increase in a tundra region. Which ecological change is most likely to occur over time?",
      "Expansion of tree and shrub growth into the region",
      ["Increased formation of permafrost","Reduction in decomposition rates","Replacement of shrubs by lichens only"],
      "The correct answer is expansion of tree and shrub growth into the region . As permafrost thaws and the growing season lengthens with warming, vegetation typically found further south can begin to take root, a process already observed in real tundra ecosystems. Warming would not increase permafrost formation or only allow lichens. It allows larger plants to expand.",
      {});
  }
]),["If permafrost thaws and the growing season lengthens, what kind of vegetation that currently can't survive there might start to move in?"]);

/* ---------- 5.4 Population Growth & Sampling Techniques ---------- */
E("bio-u1-54-q01",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A population of seabirds contains 250 individuals occupying an island with an area of 5 km\u00b2. What is the population density?",
      "50 birds/km\u00b2",
      ["125 birds/km\u00b2","245 birds/km\u00b2","1250 birds/km\u00b2"],
      "Population Density = Number of Individuals \u00f7 Area Population Density = 250 \u00f7 5 = 50 birds/km\u00b2 \u2713 50 birds/km\u00b2",
      {});
  }
]),["Population density = number of individuals \u00f7 area. Just divide."]);
E("bio-u1-54-q02",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A researcher wants to estimate the abundance of sea stars attached to rocks along a shoreline. Which sampling technique would be most appropriate?",
      "Quadrat sampling",
      ["Mark-recapture","Random trapping","Transect sampling"],
      "The correct answer is quadrat sampling , ideal for stationary organisms like sea stars on rocks, since a frame of known area can be placed randomly and the count scaled up to the whole shoreline. Mark-recapture is used for mobile animals, and transect sampling is better suited to organisms distributed along a line rather than scattered across an area.",
      {});
  }
]),["Sea stars are stationary on rocks along a shoreline, which sampling method involves placing a frame randomly to count organisms within it?"]);
E("bio-u1-54-q03",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A biologist stretches a measuring tape across a meadow and records all plant species touching the line. Which sampling technique is being used?",
      "Transect sampling",
      ["Capture-recapture","Quadrat sampling","Systematic trapping"],
      "The correct answer is transect sampling , which is defined by exactly this method, laying a line across a habitat and recording what is found along it. Quadrat sampling uses a frame/area instead of a line, and capture-recapture is used for counting mobile animals, not stationary plants.",
      {});
  }
]),["A tape measure laid across an area to record what touches the line describes which named sampling technique?"]);
E("bio-u1-54-q04",1,["5.4"],2,"var",varset([
  function(){
    return mcq("Students sample balsam fir trees using a transect measuring 100 meters long by 4 meters wide. They count a total of 12 balsam firs within the belt. What is the estimated population density of the balsam fir trees?",
      "0.03 trees per square meter",
      ["0.12 trees per square meter","3.00 trees per square meter","33.33 trees per square meter"],
      "Step 1: Calculate the area sampled. A belt transect is a rectangle, so: Area = length \u00d7 width = 100 m \u00d7 4 m = 400 m\u00b2. The students sampled 400 m\u00b2 of forest. Step 2: Calculate population density. Population density = Number of organisms counted \u00f7 Area sampled = 12 trees \u00f7 400 m\u00b2 = 0.03 trees/m\u00b2 \u2713 0.03 trees per square meter",
      {});
  }
]),["First find the area of the transect (length \u00d7 width), then divide the number of trees counted by that area."]);
E("bio-u1-54-q05",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which of the following best defines demography?",
      "The study of human population dynamics",
      ["The study of animal foraging patterns","The genetic analysis of endangered species clones","The structural mapping of diverse ecosystems"],
      "The correct answer is the study of human population dynamics , since demography specifically focuses on human populations (birth rates, death rates, age structure, etc.), unlike the other options which describe animal behavior, genetics, or ecosystem mapping.",
      {});
  }
]),["Demography specifically studies a particular species, which one is implied by the term itself?"]);
E("bio-u1-54-q06",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which of the following processes describes the permanent movement of individuals out of a specific population?",
      "Emigration",
      ["Births","Deaths","Immigration"],
      "The correct answer is emigration , defined as individuals permanently leaving a population. Immigration is the opposite (individuals moving in), while births and deaths involve the population's reproduction and mortality rather than movement.",
      {});
  }
]),["This is one of the four factors changing population size, moving OUT permanently, as opposed to moving in."]);
E("bio-u1-54-q07",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A population of sea otters experiences a sudden increase in their food supply. Which of the following changes will most likely occur first?",
      "Birth rate increases",
      ["Death rate increases","Emigration rate increases","Immigration rate decreases"],
      "The correct answer is birth rate increases . More available food typically improves the health and reproductive success of individuals fairly quickly, raising the birth rate first; death rate, emigration, and immigration would be expected to respond more slowly or in the opposite direction.",
      {});
  }
]),["More food available means better survival and reproduction, which of the four population factors (births, deaths, immigration, emigration) would respond first and most directly?"]);
E("bio-u1-54-q08",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A population has 120 births, 30 deaths, 50 immigrants, and 20 emigrants during one year. What is the change in population size (\u0394N)?",
      "+120",
      ["+80","+90","+170"],
      "\u0394N = (Births + Immigration) \u2212 (Deaths + Emigration) Births = 120, Deaths = 30, Immigration = 50, Emigration = 20 \u0394N = (120 + 50) \u2212 (30 + 20) \u0394N = 170 \u2212 50 = 120 \u2713 +120",
      {});
  }
]),["Use \u0394N = (births + immigration) \u2212 (deaths + emigration). Plug in the numbers."]);
E("bio-u1-54-q09",1,["5.4"],2,"var",varset([
  function(){
    return mcq("In a mark-recapture investigation, 50 rabbits are captured, marked, and released. Later, 40 rabbits are captured, and 10 are marked. What is the estimated population size?",
      "200",
      ["100","150","250"],
      "N = nK/k, where N = estimated total population size, n = number marked in first capture = 50, K = total captured in second sample = 40, k = number marked recaptured = 10 N = 50 \u00d7 40 \u00f7 10 = 2000 \u00f7 10 = 200 \u2713 200",
      {});
  }
]),["Use the Lincoln-Petersen formula: N = (number marked first capture \u00d7 total second capture) \u00f7 number recaptured marked."]);
E("bio-u1-54-q10",1,["5.4"],3,"var",varset([
  function(){
    var q=mcq("Based on the graph, which mathematical relationship best describes the population dynamics occurring between Year 5 and Year 10?",
      "(d + e) is greater than (b + i)",
      ["(b + e) is greater than (d + i)","(b + i) is equal to (d + e)","(b + i) is greater than (d + e)"],
      "The correct answer is (d + e) is greater than (b + i) . If the population is declining between years 5 and 10, then deaths plus emigration (the factors that decrease population) must outweigh births plus immigration (the factors that increase it), the opposite relationship would cause the population to grow rather than shrink.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-54-q10.png" alt="Line graph titled Total Population Size (Years 1 to 10), with total population size in millions on the vertical axis: the population rises steadily from 4 million in Year 1 to a peak of 25 million in Year 5, then falls steadily to 3 million by Year 10" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at what the graph is doing between years 5 and 10, is the population growing or shrinking? Which side of the \u0394N equation would be larger if the population is declining?"]);
E("bio-u1-54-q11",1,["5.4"],2,"var",varset([
  function(){
    var q=mcq("What growth model is shown in the graph below?",
      "Logistic growth",
      ["Arithmetic growth","Exponential growth","Geometric growth"],
      "The correct answer is logistic growth , identifiable by the S-shaped curve that levels off at the carrying capacity (shown by the dashed line). Exponential growth would show a curve that keeps climbing without leveling off, and arithmetic/geometric growth don't describe the typical population growth patterns seen in nature.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-54-q11.png" alt="Graph of population size N(t) against time: an S-shaped blue curve rises from near zero and levels off at a dashed red line labelled Carrying Capacity K at 1000" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the shape: does the curve level off at a maximum (carrying capacity), or does it keep climbing without limit?"]);
E("bio-u1-54-q12",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which term describes the maximum reproductive capacity of an organism under ideal environmental conditions?",
      "Biotic potential",
      ["Carrying capacity","Environmental resistance","Fecundity"],
      "The correct answer is biotic potential , the textbook definition of an organism's maximum reproductive output when nothing is limiting growth. Carrying capacity refers to the maximum sustainable population size for a habitat, environmental resistance refers to limiting factors, and fecundity refers to actual reproductive output (which may be lower than the biotic potential).",
      {});
  }
]),["This term describes the theoretical maximum reproduction rate when nothing is limiting growth."]);
E("bio-u1-54-q13",1,["5.4"],2,"var",varset([
  function(){
    var q=mcq("According to the graph, which statement correctly identifies the population growth models represented by Line X and Line Y?",
      "Line X is exponential; Line Y is logistic",
      ["Line X is logistic; Line Y is exponential","Line X shows carrying capacity; Line Y shows biotic potential","Line X shows environmental resistance; Line Y shows fecundity"],
      "The correct answer is Line X is exponential; Line Y is logistic . Line X keeps climbing steeply without limit (J-shaped, exponential), while Line Y levels off at a maximum (S-shaped, logistic), the reverse pairing or the other terms (carrying capacity, biotic potential, environmental resistance, fecundity) don't correctly describe what each curve's overall shape represents.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-54-q13.png" alt="Graph with two population curves on unlabelled axes: curve X (blue) rises slowly at first, then climbs steeply upward past the dashed horizontal line without levelling off; curve Y (orange) rises in an S shape and levels off at the dashed line" style="max-width:100%;height:auto">';
    return q;
  }
]),["One line keeps climbing without limit (J-shaped); the other levels off at a maximum (S-shaped). Match each shape to its growth model."]);
E("bio-u1-54-q14",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A population of beetles enters an environment with unlimited resources and no predators. As the population size increases, how do its growth rate and environmental resistance change?",
      "Growth rate increases while resistance stays at zero",
      ["Both growth rate and resistance decrease","Both growth rate and resistance increase","Growth rate decreases while resistance stays at zero"],
      "The correct answer is growth rate increases while resistance stays at zero . With nothing limiting the population (unlimited resources, no predators), environmental resistance remains at zero and the population can grow at its maximum rate, exponential growth, rather than slowing down.",
      {});
  }
]),["With nothing limiting the population (no resources scarcity, no predators), what happens to environmental resistance, and how does that affect growth rate?"]);
E("bio-u1-54-q15",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which characteristic is typically associated with an r-selected species?",
      "Many small offspring",
      ["High parental care","Long life expectancy","Stable population size"],
      "The correct answer is many small offspring , a hallmark of r-selected species that prioritize reproducing quickly in large numbers over investing heavily in any one offspring. High parental care, long life expectancy, and stable population size are instead characteristics of K-selected species.",
      {});
  }
]),["r-selected species are adapted for rapid colonization. Think about offspring number versus parental investment."]);
E("bio-u1-54-q16",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A specific ecosystem experiences frequent, unpredictable wildfires that clear out existing vegetation every few years. Which type of species will be most likely to successfully colonize this habitat following a fire?",
      "r-selected species, because they grow rapidly and reproduce quickly",
      ["K-selected species, because they compete well for limited space","K-selected species, because they exhibit slow, stable development","r-selected species, because they invest heavy energy into parental care."],
      "The correct answer is r-selected species, because they grow rapidly and reproduce quickly . After a disturbance like a wildfire clears the habitat, species that can grow and reproduce fast are best suited to quickly colonize the newly available space, K-selected species, which grow and reproduce slowly, would be at a disadvantage in this unstable environment.",
      {});
  }
]),["After a disturbance wipes out the existing community, which life strategy is best suited to quickly colonize the open space?"]);
E("bio-u1-54-q17",1,["5.4"],1,"var",varset([
  function(){
    return mcq("A marine biologist notes that a sea turtle species lays hundreds of eggs per nesting season, but the individual eggs have a low survival rate. What does this illustrate?",
      "Fecundity",
      ["Carrying capacity","Environmental resistance","Logistic growth"],
      "The correct answer is fecundity , which refers to the actual reproductive output (number of offspring produced) regardless of how many ultimately survive. This is distinct from carrying capacity (maximum sustainable population), environmental resistance (limiting factors), or logistic growth (a growth pattern over time).",
      {});
  }
]),["Fecundity refers to the reproductive output (number of offspring produced), regardless of how many actually survive."]);
E("bio-u1-54-q18",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which factor represents environmental resistance?",
      "Predation",
      ["High fecundity","Immigration","Reproductive potential"],
      "The correct answer is predation , a classic limiting factor that reduces population growth. High fecundity, immigration, and reproductive potential are all factors that tend to increase population size, which is the opposite of environmental resistance.",
      {});
  }
]),["Environmental resistance includes anything that limits population growth, think about which answer choice is a limiting factor rather than a reproductive trait."]);
E("bio-u1-54-q19",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A population of insects produces hundreds of offspring, provides little parental care, and experiences large fluctuations in population size. Which life strategy is most likely represented?",
      "r-selected",
      ["K-selected","Logistic-selected","Stable-selected"],
      "The correct answer is r-selected , since many offspring, low parental investment, and unstable population numbers are the defining traits of an r-selected life strategy. K-selected species show the opposite pattern (few offspring, high parental care, stable populations), and 'logistic-selected' and 'stable-selected' are not recognized life history strategies.",
      {});
  }
]),["Many offspring + little parental care + unstable population size is the classic profile of which life history strategy?"]);
E("bio-u1-54-q20",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which species is most likely to exhibit a K-selected life strategy?",
      "Moose",
      ["Dandelion","Fruit fly","House mouse"],
      "The correct answer is moose , a large, long-lived animal that produces few offspring with substantial parental care, classic K-selected traits. Dandelions and fruit flies are both r-selected (rapid reproduction, many offspring), and house mice, while intermediate, reproduce far more quickly than a K-selected species like a moose.",
      {});
  }
]),["K-selected species tend to be large, long-lived, and produce few offspring with high parental investment. Which organism in the list fits that profile?"]);
E("bio-u1-54-q21",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A wildlife manager observes that a moose population has exceeded the carrying capacity of its habitat. Which outcome is most likely?",
      "Resource shortages will increase mortality.",
      ["Birth rates will increase indefinitely.","Environmental resistance will decrease.","The population will continue exponential growth."],
      "The correct answer is resource shortages will increase mortality . When a population exceeds what its habitat can sustainably support, food and other resources become scarce, leading to increased death rates rather than continued unchecked growth, environmental resistance would increase, not decrease, in this situation.",
      {});
  }
]),["When a population exceeds carrying capacity, resources become scarce. What happens to death rates when there isn't enough food to go around?"]);
E("bio-u1-54-q22",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A quadrat measuring 1 m\u00b2 is placed randomly 20 times in a field. The average number of dandelions per quadrat is 12. If the field covers 500 m\u00b2, what is the estimated population size?",
      "6000",
      ["240","2400","12000"],
      "12 dandelions/m\u00b2 \u00d7 500 m\u00b2 = 6 000 dandelions \u2713 6000",
      {});
  }
]),["Multiply the average density per square meter by the total area of the field."]);
E("bio-u1-54-q23",1,["5.4"],1,"var",varset([
  function(){
    return mcq("A population has a high biotic potential. Which characteristic would most likely be observed?",
      "High reproductive capacity under ideal conditions",
      ["Few offspring and extensive parental care","Long generation times and stable populations","Population growth limited by carrying capacity"],
      "The correct answer is high reproductive capacity under ideal conditions , which is the definition of biotic potential itself. Few offspring with extensive parental care, long generation times, and growth limited by carrying capacity all describe the opposite, a low biotic potential or a population already constrained by environmental resistance.",
      {});
  }
]),["Biotic potential is about reproductive capacity under IDEAL conditions, think about what high biotic potential would look like in practice."]);
E("bio-u1-54-q24",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A researcher compares two populations. Population A exhibits rapid reproduction and short life spans. Population B exhibits slower reproduction and extensive parental care. Which prediction is most reasonable?",
      "Population A is more likely to recover quickly after a disturbance.",
      ["Population A is more likely to be K-selected.","Population B is more likely to experience boom-and-bust cycles.","Population B is more likely to have a higher biotic potential."],
      "The correct answer is Population A is more likely to recover quickly after a disturbance . Population A's rapid reproduction (r-selected traits) allows it to rebound faster after a population crash, while Population B (K-selected traits, slower reproduction) would take longer to recover, Population A is r-selected, not K-selected, and Population B would have a lower, not higher, biotic potential.",
      {});
  }
]),["Population A sounds r-selected; population B sounds K-selected. Which strategy tends to bounce back faster after a population crash?"]);

/* ---------- 8.3 (STSE) Competition, Symbiosis & Non-native Species ---------- */
E("bio-u1-83-q01",1,["8.3"],1,"var",varset([
  function(){
    return mcq("Two male moose fight over females. Which term best describes this interaction?",
      "Intraspecific competition",
      ["Commensalism","Interspecific competition","Mutualism"],
      "The correct answer is intraspecific competition , since both moose are the same species competing for the same resource (mates). Interspecific competition involves different species, and neither commensalism nor mutualism describes a competitive struggle like this.",
      {});
  }
]),["Both moose are the same species, competing for the same resource (mates), what type of competition is this?"]);
E("bio-u1-83-q02",1,["8.3"],1,"var",varset([
  function(){
    return mcq("Which statement accurately distinguishes between interspecific and intraspecific competition?",
      "Interspecific occurs between different species; intraspecific occurs within the same species",
      ["Interspecific occurs within the same species; intraspecific occurs between different species","Interspecific relates only to abiotic resources; intraspecific relates only to biotic resources","Interspecific results in cooperation; intraspecific results in the extinction of a population."],
      "The correct answer is that interspecific occurs between different species; intraspecific occurs within the same species, this matches the prefixes exactly ('inter-' = between, 'intra-' = within). The reversed pairing, or claims that one type only involves abiotic resources or always results in cooperation/extinction, do not accurately describe either type of competition.",
      {});
  }
]),["Break down the prefixes: 'inter-' means between, 'intra-' means within. Which type of competition involves different species versus the same species?"]);
E("bio-u1-83-q03",1,["8.3"],3,"var",varset([
  function(){
    return mcq("A farmer introduces a non-native beetle species to control an invasive weed that is damaging crops. After several years, the beetle population spreads and begins feeding on native plant species. Which statement best evaluates this biological control strategy?",
      "The strategy had both benefits and risks because controlling one species may negatively affect other organisms.",
      ["The strategy was successful because the beetle reduced all plant populations.","The strategy was beneficial because introduced species always improve ecosystems.","The strategy failed because predators cannot influence population size."],
      "The correct answer is that the strategy had both benefits and risks because controlling one species may negatively affect other organisms . The beetle helped control the weed (a benefit) but also began harming native plants (a risk), introduced species don't always 'improve' ecosystems, and the scenario describes a beetle successfully spreading and feeding, not a failed predator.",
      {});
  }
]),["Biological control can work as intended, but introduced species don't always stay confined to their original target. What does the question say happened years later?"]);
E("bio-u1-83-q04",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A researcher observes two bird species nesting in the same forest. Both species eat the same insects and require the same nesting areas. Over time, one species becomes less common. Which ecological interaction is most likely occurring?",
      "Interspecific competition",
      ["Intraspecific competition","Mutualism","Parasitism"],
      "The correct answer is interspecific competition , since two different species are competing directly for the same limited resources (food and nesting sites). This is not intraspecific competition (which would involve only one species), and there's no evidence of a mutual benefit or one species harming the other directly, which would rule out mutualism or parasitism.",
      {});
  }
]),["Two different species competing for the exact same limited resources, this is a classic example of which type of competition?"]);
E("bio-u1-83-q05",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A population of rabbits increases after a predator is removed from an ecosystem. Which explanation best describes this change?",
      "The rabbits had fewer limiting factors affecting their population growth.",
      ["The rabbits experienced increased environmental resistance.","The rabbits changed from consumers into producers.","The rabbits developed a mutualistic relationship with predators."],
      "The correct answer is the rabbits had fewer limiting factors affecting their population growth . Predation is a major limiting factor; removing it allows the rabbit population to grow with less environmental resistance, rather than the rabbits somehow experiencing more limiting factors or changing their basic biology.",
      {});
  }
]),["Predation is a limiting factor. If that limiting factor is removed, what happens to the population's growth potential?"]);
E("bio-u1-83-q06",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A flower grows on the high branch of a tree, gaining access to sunlight and rain without affecting the tree. Which type of symbiotic relationship does this demonstrate?",
      "Commensalism",
      ["Competition","Mutualism","Parasitism"],
      "The correct answer is commensalism , where one organism (the flower) benefits while the other (the tree) is neither helped nor harmed. Mutualism would require the tree to also benefit, and parasitism would require the tree to be harmed, neither is described here.",
      {});
  }
]),["One organism benefits, the other is neither helped nor harmed, which symbiotic relationship matches that pattern?"]);
E("bio-u1-83-q07",1,["8.3"],2,"var",varset([
  function(){
    return mcq("Which of the following scenarios describes a parasitic relationship?",
      "Wasp larvae consuming a living caterpillar from the inside.",
      ["Bacteria fixing nitrogen inside legume root nodules.","Barnacles obtaining a mobile home on a whale's skin.","Cows digesting grass with the help of intestinal microbes."],
      "The correct answer is wasp larvae consuming a living caterpillar from the inside , since the wasp larvae directly benefit while actively harming (and ultimately killing) the caterpillar. The other examples describe mutualistic relationships (nitrogen-fixing bacteria, gut microbes helping digestion) or commensalism (barnacles riding on a whale without harming it).",
      {});
  }
]),["Parasitism involves one organism benefiting while harming the host. Look for the option where the relationship clearly damages one organism for the benefit of the other."]);
E("bio-u1-83-q08",1,["8.3"],1,"var",varset([
  function(){
    return mcq("Which relationship is an example of parasitism?",
      "Hookworm larvae grow inside the human intestines where they attach to the wall of the intestine and drink the blood of the host, sometimes causing weakness.",
      ["Aphids are little sap-sucking insects that secrete honeydew, a sugary liquid that feeds ants. Ants will protect the aphids from predators and parasites.","Oxpecker birds pick at parasites on the mammal's body, including ticks and blood-sucking flies. This keeps the mammal's parasite load under control, and the birds get an easy meal.","The burdock plant produces spiny seeds that cling to the fur of animals or clothing of humans which helps with seed dispersal for reproduction, while the animals are unharmed."],
      "The correct answer is the hookworm scenario, since the hookworm directly benefits by feeding on the host's blood while harming the host (causing weakness), the defining feature of parasitism. The aphid/ant and oxpecker/mammal relationships both describe mutualism (both species benefit), and the burdock seed scenario describes commensalism (the plant benefits, the animal is unaffected).",
      {});
  }
]),["Look for the relationship where one organism benefits at the direct expense, and harm, of the other."]);
E("bio-u1-83-q09",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A student observes the following relationships: A tick feeds on a deer and harms the deer. A bee collects nectar while pollinating a flower. A bird builds a nest in a tree but does not affect the tree. Which classification is correct?",
      "Tick: parasitism; bee: mutualism; bird: commensalism",
      ["Tick: commensalism; bee: competition; bird: parasitism","Tick: competition; bee: commensalism; bird: mutualism","Tick: mutualism; bee: parasitism; bird: competition"],
      "The correct answer is Tick: parasitism; bee: mutualism; bird: commensalism . The tick harms the deer while benefiting itself (parasitism), the bee and flower both benefit from pollination in exchange for nectar (mutualism), and the bird benefits from the nest site while the tree is unaffected (commensalism), every other option mismatches at least one of these relationships.",
      {});
  }
]),["Match each relationship to its type: one harms its host, one benefits both parties, and one benefits only one party without harming the other."]);
E("bio-u1-83-q10",1,["8.3"],2,"var",varset([
  function(){
    return mcq("An invasive plant species is introduced into a grassland. It grows rapidly and uses large amounts of water, reducing resources available to native plants. What is the most likely effect on the native plant population?",
      "Native plants will experience increased competition and may decline.",
      ["Native plants will increase because competition decreases.","Native plants will develop a mutualistic relationship with the invasive species.","Native plants will become producers with a higher energy supply."],
      "The correct answer is native plants will experience increased competition and may decline . Since the invasive plant is taking water and resources away from native plants, those native plants face greater competition for what remains, making decline more likely rather than an increase or a new mutualistic relationship forming.",
      {});
  }
]),["If the invasive plant takes resources away from native plants, what would you expect to happen to the native plants' ability to compete?"]);
E("bio-u1-83-q11",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A scientist studies a population of wolves and deer. When wolf numbers increase, deer numbers decrease. When deer numbers decrease, wolf numbers later decline. Which relationship does this demonstrate?",
      "Predator-prey interactions between populations",
      ["Commensalism between wolves and deer","Competition between wolves and deer","Mutualism between wolves and deer"],
      "The correct answer is predator-prey interactions between populations . This back-and-forth cycle, predator numbers rising as prey is plentiful, then falling as prey becomes scarce, is the classic pattern of a predator-prey relationship, not competition (which would involve two species competing for the same resource) or a mutually beneficial/commensal relationship.",
      {});
  }
]),["This back-and-forth cycle between a hunting species and its food source describes which classic ecological relationship?"]);

/* ---------- 5.5 (STSE) Human Population, Carrying Capacity & Ecological Footprint ---------- */
E("bio-u1-55-q01",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which best describes the current global human population trend?",
      "Exponential growth",
      ["Declining","Linear growth","Stable"],
      "The correct answer is exponential growth . Since the Industrial Revolution, the human population has been growing at an accelerating rate rather than leveling off, declining, or remaining stable.",
      {});
  }
]),["Think about the shape of the human population graph since the Industrial Revolution, is it leveling off, or still climbing steeply?"]);
E("bio-u1-55-q02",1,["5.5"],2,"var",varset([
  function(){
    return mcq("Country X and Country Y have the exact same geographic area and climate, yet Country X has a significantly higher biocapacity. What is the most responsible explanation for this?",
      "Country X utilizes advanced farming methods",
      ["Country X has a higher total human population","Country Y relies less heavily on international trade","Country Y imports more of its raw manufacturing materials"],
      "The correct answer is that Country X utilizes advanced farming methods . Since geography and climate are identical between the two countries, the difference in biocapacity (the ability to produce resources) must come from a human factor like technology and farming efficiency, not population size or trade patterns, which don't directly affect a region's biological productive capacity.",
      {});
  }
]),["Biocapacity reflects how efficiently a region can produce resources. What human factor (not geography) could boost a country's productive capacity?"]);
E("bio-u1-55-q03",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Before the Industrial Revolution, human population growth was relatively slow. Which development most directly contributed to the rapid increase in human population after the Industrial Revolution?",
      "Improvements in agriculture, medicine, and technology",
      ["Decreased access to natural resources","Increased competition between human populations","Reduced availability of food supplies"],
      "The correct answer is improvements in agriculture, medicine, and technology . These advances during and after the Industrial Revolution allowed more people to survive and live longer, directly fueling rapid population growth, the other options describe conditions that would slow population growth, not accelerate it.",
      {});
  }
]),["Think about what changed around the 18th-19th centuries that allowed more people to survive and live longer."]);
E("bio-u1-55-q04",1,["5.5"],3,"var",varset([
  function(){
    var q=mcq("A student claims, \u201cThis country has a high ecological footprint because its population pyramid shows rapid population growth.\u201d How should this claim be evaluated?",
      "The claim is incorrect because the pyramid suggests declining growth, and ecological footprint depends on resource use per person.",
      ["The claim is correct because all countries with large elderly populations have high ecological footprints.","The claim is correct because a wide base always indicates high resource use per person.","The claim is incorrect because population pyramids cannot provide any information about population trends."],
      "The correct answer is that the claim is incorrect because the pyramid suggests declining growth, and ecological footprint depends on resource use per person . A population pyramid's shape reflects birth and survival patterns, not resource consumption directly, even a country with a narrowing base (declining growth) could have a high ecological footprint if its citizens consume a lot of resources per person, so the original claim's reasoning doesn't hold.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u1-55-q04.png" alt="Population pyramid with percentage of total population by five-year age groups, males on the left and females on the right: the widest bars are at ages 40 to 59 (about 6 percent), and the bars narrow toward the youngest groups (about 3.5 percent at ages 0 to 4) and toward the oldest" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look carefully at the shape of the pyramid described, does it actually show a wide, growing base, or something else? Also remember that ecological footprint depends on consumption, not just population shape."]);
E("bio-u1-55-q05",1,["5.5"],2,"var",varset([
  function(){
    return mcq("If this country's birth rate continues to decline, what change would most likely occur in future population pyramids?",
      "The base would become narrower as fewer children are born.",
      ["The middle age groups would disappear completely.","The oldest age groups would become smaller because people live shorter lives.","The population would immediately return to a rapid growth pattern."],
      "The correct answer is the base would become narrower as fewer children are born , since the base of a population pyramid represents the youngest age groups. A declining birth rate directly shrinks that youngest cohort, it wouldn't cause middle age groups to disappear or older groups to shrink due to people living shorter lives.",
      {});
  }
]),["If fewer children are being born, which part of the pyramid (the base, representing youngest age groups) would shrink?"]);
E("bio-u1-55-q06",1,["5.5"],2,"var",varset([
  function(){
    return mcq("A government official examines this population pyramid when planning future services. Which decision would be most appropriate based on the data?",
      "Increase retirement services because a large portion of the population is approaching older age groups.",
      ["Build more elementary schools because the largest population group is under age 10.","Focus only on immigration because there are no young adults entering the workforce.","Reduce healthcare funding because the elderly population is very small."],
      "The correct answer is increase retirement services because a large portion of the population is approaching older age groups . Reading the age distribution in the pyramid allows planners to anticipate which services will be needed as that group ages, rather than assuming the largest group is young children or that there are no young adults at all.",
      {});
  }
]),["Look at which age groups appear to be the largest in the pyramid, what services would that group need as they age?"]);
E("bio-u1-55-q07",1,["5.5"],2,"var",varset([
  function(){
    return mcq("Two countries have similar populations. Country A has a much larger average ecological footprint than Country B. Which explanation best accounts for this difference?",
      "Country A likely uses more resources per person through consumption and technology.",
      ["Country A likely has fewer technological developments.","Country B likely produces more waste per person.","Country B likely requires more land and resources per person."],
      "The correct answer is that Country A likely uses more resources per person through consumption and technology . Since the two countries have similar population sizes, the difference in footprint must come from how much each individual consumes and the technology used, not from population size itself.",
      {});
  }
]),["Ecological footprint reflects resource use and consumption per person, not population size. Which factor would explain a per-person difference?"]);
E("bio-u1-55-q08",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which statement best describes biocapacity?",
      "The ability of an ecosystem to regenerate resources and absorb wastes",
      ["The amount of waste produced by a population each year","The number of people living in a specific area","The total amount of technology available in a country"],
      "The correct answer is the ability of an ecosystem to regenerate resources and absorb wastes, the actual definition of biocapacity. It is not simply a measure of waste produced, population size, or technology level, though those factors can influence biocapacity indirectly.",
      {});
  }
]),["Biocapacity is about an ecosystem's ABILITY to produce and absorb, not about population or waste directly."]);
E("bio-u1-55-q09",1,["5.5"],2,"var",varset([
  function(){
    return mcq("A new agricultural technology allows farmers to produce more food on the same amount of land. How could this technology affect biocapacity?",
      "It may increase biocapacity by improving resource production efficiency.",
      ["It will always decrease biocapacity by reducing available resources.","It will eliminate the need for natural resources.","It will prevent population growth from occurring."],
      "The correct answer is it may increase biocapacity by improving resource production efficiency . Producing more food from the same land increases how many resources that land can sustainably provide, directly raising biocapacity: it would not eliminate the need for natural resources or have a guaranteed negative effect.",
      {});
  }
]),["If more resources (food) can be produced from the same land, how would that affect the region's capacity to support its population?"]);
E("bio-u1-55-q10",1,["5.5"],2,"var",varset([
  function(){
    return mcq("A community's population continues to grow while available freshwater supplies decrease. Which outcome is most likely if the trend continues?",
      "Increased pressure on natural resources",
      ["Decreased demand for ecosystem services","Increased availability of freshwater resources","Increased carrying capacity without environmental changes"],
      "The correct answer is increased pressure on natural resources . A growing population needing a shrinking resource (freshwater) inevitably puts more strain on that resource, the opposite of increased availability or carrying capacity remaining unaffected.",
      {});
  }
]),["More people needing a shrinking resource, what is the inevitable outcome for that resource?"]);
E("bio-u1-55-q11",1,["5.5"],2,"var",varset([
  function(){
    return mcq("A government proposes limiting water use, improving public transportation, and increasing renewable energy use. Which goal is this plan most directly addressing?",
      "Reducing human impacts on Earth's carrying capacity",
      ["Increasing ecological footprints","Increasing population growth","Reducing technological development"],
      "The correct answer is reducing human impacts on Earth's carrying capacity . All three actions reduce resource consumption and environmental strain, which directly supports sustaining the planet's carrying capacity rather than increasing footprints or population growth.",
      {});
  }
]),["All three actions reduce resource consumption and environmental impact, what's the overall goal these strategies share?"]);
E("bio-u1-55-q12",1,["5.5"],1,"var",varset([
  function(){
    return mcq("A country's population growth rate decreases over time. Which factor could contribute to this change?",
      "Increased access to education and healthcare",
      ["Decreased technological development","Increased environmental damage","Increased resource consumption"],
      "The correct answer is increased access to education and healthcare , both of which are strongly associated with declining birth rates as families tend to have fewer children. Decreased technology, more environmental damage, or increased consumption would not be expected to slow population growth in this way.",
      {});
  }
]),["Think about what tends to lower birth rates in a population, often linked to opportunities outside of having large families."]);
E("bio-u1-55-q13",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which statement best describes the trend in human population growth since the Industrial Revolution?",
      "Growth has become exponential due to advances in technology and medicine.",
      ["Growth has remained constant because resources are unlimited.","Growth has slowed because birth rates increased worldwide.","Growth has stopped because carrying capacity has been reached."],
      "The correct answer is growth has become exponential due to advances in technology and medicine . These advances reduced death rates and extended lifespans, leading to accelerating (not constant, slowed, or stopped) population growth.",
      {});
  }
]),["Recall what triggered the population boom after the Industrial Revolution and whether that growth pattern has continued."]);

/* ----- bank-u2.js ----- */
// Biology 2201 Unit 2 bank: Processes that Sustain Life.
// All 106 selected-response questions from the Unit 2 Mid-Year Exam
// Review book (Jason Counsel's H5P review book, CDLI), converted
// Nov 12, 2026 by convert2201.py from the extracted book. Stems, options
// and keys are the book's, verbatim, under Jason's ruling that his
// review books replicate as-is. Each book Hint panel is the entry's
// hint and each Solution panel its worked solution; the books' Help
// panels (video pointers) have no slot in the app and are not carried.
// Indicator codes follow each chapter's declared numbers, verified
// against the Indicator panels. Levels are the calibrated tags in
// bio2201-levels.json. House-style fixes, kept minimal: em dashes in
// the book text become commas, colons or periods; diagrams travel with
// their questions as figure images under banks/bio-2201/assets/.

/* ---------- 6.1 Cell Theory & Abiogenesis ---------- */
E("bio-u2-61-q01",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which statement best describes the idea of abiogenesis as it was originally proposed?",
      "Life can arise spontaneously from non-living matter.",
      ["Cells are produced by cell division.","Living organisms arise from pre-existing organisms.","Organisms evolve through natural selection."],
      "The correct answer is life can arise spontaneously from non-living matter, the literal definition of abiogenesis as it was historically believed. The other options describe cell division, biogenesis (the opposite idea), and natural selection, none of which match the original abiogenesis claim.",
      {});
  }
]),["Abiogenesis literally means life arising from non-life. What would that look like in practice, before the theory was disproven?"]);
E("bio-u2-61-q02",2,["6.1"],2,"var",varset([
  function(){
    return mcq("A scientist claims that maggots appear on meat because flies lay eggs on it. Which historical debate is this claim addressing?",
      "Abiogenesis versus biogenesis",
      ["Cell theory versus germ theory","Evolution versus natural selection","Photosynthesis versus respiration"],
      "The correct answer is abiogenesis versus biogenesis . This claim says maggots come from a pre-existing organism (the fly's eggs), directly opposing the idea that life spontaneously arises from non-living meat, exactly the historical debate between these two theories, not a debate about cell theory, evolution, or photosynthesis/respiration.",
      {});
  }
]),["This claim says maggots come from a pre-existing organism (the fly), not from the meat itself. Which historical debate does that directly oppose?"]);
E("bio-u2-61-q03",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which scientist used open, sealed, and gauze-covered jars containing meat to provide early historical evidence against the theory of abiogenesis?",
      "Francesco Redi",
      ["Anton van Leeuwenhoek","John Needham","Louis Pasteur"],
      "The correct answer is Francesco Redi , who designed this exact three-jar experiment to test whether flies (not spontaneous generation) caused maggots to appear on meat. Leeuwenhoek is known for early microscopy, Needham argued in favor of spontaneous generation, and Pasteur's swan-neck flask experiment came later and used a different method.",
      {});
  }
]),["This classic experiment used three jar conditions to test whether flies (not spontaneous generation) caused maggots to appear."]);
E("bio-u2-61-q04",2,["6.1"],2,"var",varset([
  function(){
    return mcq("What conclusion was best supported by Pasteur's experimental evidence?",
      "life arises only from existing microbes",
      ["life arises spontaneously in broth","sterilization prevents chemical change","temperature creates microbes"],
      "The correct answer is that life arises only from existing microbes . Pasteur's swan-neck flask kept microbes out while still allowing air in, and the broth stayed sterile until exposed to microbes, directly supporting biogenesis, not spontaneous generation in broth, and his experiment was not actually about temperature creating microbes or sterilization preventing chemical change.",
      {});
  }
]),["Pasteur's swan-neck flask kept microbes out while still allowing air in, what did the broth staying sterile prove about where life comes from?"]);
E("bio-u2-61-q05",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which of the following is a statement of the cell theory?",
      "All living things are composed of cells",
      ["All cells contain a nucleus","All cells have a cell wall","All living things require oxygen."],
      "The correct answer is all living things are composed of cells , one of the three core tenets of cell theory that applies to literally every living thing. Not all cells contain a nucleus (prokaryotes don't) or a cell wall (animal cells don't), and not all living things require oxygen (some organisms are anaerobic), so those options describe exceptions rather than universal rules.",
      {});
  }
]),["Cell theory has three core tenets. Which of the answer choices describes a universal rule about ALL living things, rather than a feature only some cells have?"]);
E("bio-u2-61-q06",2,["6.1"],2,"var",varset([
  function(){
    return mcq("A researcher repeats Redi's experiment using sealed and unsealed jars of fish. Maggots appear only in the unsealed jars. Which conclusion is most supported?",
      "Flies are involved in the production of maggots.",
      ["Abiogenesis occurs only under certain conditions.","Maggots form from decomposing tissue.","Microorganisms create maggots."],
      "The correct answer is flies are involved in the production of maggots . Since maggots only appeared where flies could physically reach the meat (the unsealed jars), this directly supports the idea that flies, not spontaneous generation or decomposing tissue itself, are responsible for the maggots.",
      {});
  }
]),["If maggots only appear where flies can physically reach the meat, what does that tell you about where the maggots come from?"]);
E("bio-u2-61-q07",2,["6.1"],1,"var",varset([
  function(){
    return mcq("What was the purpose of the curved neck in Pasteur's swan-neck flask?",
      "To trap microorganisms while allowing air to enter",
      ["To increase oxygen levels in the broth","To prevent evaporation of the broth","To sterilize microorganisms entering the flask"],
      "The correct answer is to trap microorganisms while allowing air to enter . The S-shaped curve let air (needed to disprove the idea that air itself caused contamination) reach the broth, while dust and microbes settled in the curve rather than reaching the liquid. The flask's purpose was not to increase oxygen levels, prevent evaporation, or sterilize anything entering it.",
      {});
  }
]),["The curve in the neck was designed to let something through while blocking something else heavier that would otherwise fall in."]);
E("bio-u2-61-q08",2,["6.1"],2,"var",varset([
  function(){
    return mcq("A student accidentally tips a swan-neck flask, allowing broth to contact trapped dust particles. Several days later, microbial growth is observed. Which explanation is most consistent with Pasteur's findings?",
      "Dust introduced microorganisms into the broth.",
      ["Air activated dormant cells in the broth.","The broth spontaneously generated life.","The curved neck caused contamination."],
      "The correct answer is dust introduced microorganisms into the broth . The dust trapped in the curved neck contained microorganisms; once the broth touched that dust, those microbes could grow in the broth, consistent with biogenesis, not spontaneous generation, dormant cells being 'activated' by air, or the curve itself somehow causing contamination.",
      {});
  }
]),["Dust collects in the curve of the neck and can harbor microorganisms. If the broth touches that dust, what would introduce the contamination?"]);
E("bio-u2-61-q09",2,["6.1"],2,"var",varset([
  function(){
    return mcq("How did Pasteur's experiment contribute to scientific understanding?",
      "It provided evidence supporting biogenesis.",
      ["It confirmed spontaneous generation.","It demonstrated that cells contain nuclei.","It proved evolution occurs."],
      "The correct answer is that it provided evidence supporting biogenesis, the idea that life comes only from existing life. His broth stayed sterile unless exposed to microbes, directly contradicting spontaneous generation; his work was not related to cell nuclei or evolution.",
      {});
  }
]),["Pasteur's results directly supported one side of the abiogenesis vs. biogenesis debate, which one?"]);

/* ---------- 9.1 (STSE) Evidence, Theories & Paradigms ---------- */
E("bio-u2-91-q01",2,["9.1"],2,"var",varset([
  function(){
    return mcq("Why is experimental evidence important when evaluating scientific explanations?",
      "It allows claims to be tested and supported.",
      ["It guarantees that theories never change.","It replaces the need for observation.","It prevents the development of new ideas."],
      "The correct answer is that it allows claims to be tested and supported . Evidence is what separates a scientific claim from an untested guess, allowing other scientists to check whether it holds up: it doesn't guarantee theories never change, replace the need for observation, or prevent the development of new ideas (science actually depends on new ideas being tested).",
      {});
  }
]),["Science relies on testing ideas, not just accepting them. What does evidence allow scientists to do with a claim?"]);
E("bio-u2-91-q02",2,["9.1"],2,"var",varset([
  function(){
    return mcq("Which statement best explains why Pasteur's findings were widely accepted?",
      "They were supported by reproducible experimental evidence.",
      ["They agreed with existing beliefs.","They eliminated all future scientific debate.","They required no peer review."],
      "The correct answer is that they were supported by reproducible experimental evidence . Other scientists could repeat his swan-neck flask experiment and get the same results, which is what builds scientific consensus, acceptance wasn't because his ideas agreed with existing beliefs (they actually overturned a long-held belief), eliminated all future debate, or skipped peer review.",
      {});
  }
]),["Good scientific results need to be checked independently by others. What quality of an experiment allows that to happen?"]);
E("bio-u2-91-q03",2,["9.1"],2,"var",varset([
  function(){
    return mcq("Two scientists disagree about the origin of microorganisms. Which approach would best help resolve their disagreement?",
      "Compare experimental evidence.",
      ["Accept the oldest explanation.","Vote on the most popular idea.","Use personal observations only."],
      "The correct answer is to compare experimental evidence . Scientific disagreements are resolved through testable, repeatable evidence, not by simply accepting the oldest explanation, voting on popularity, or relying on personal observations alone.",
      {});
  }
]),["Scientific disagreements are best resolved using something objective and testable, not opinion or tradition."]);

/* ---------- 9.2 (STSE) Communicating Scientific Results ---------- */
E("bio-u2-92-q01",2,["9.2"],2,"var",varset([
  function(){
    return mcq("Why was communication of Pasteur's results important to the scientific community?",
      "It allowed other scientists to evaluate and repeat his work.",
      ["It guaranteed immediate acceptance.","It prevented future experimentation.","It reduced the need for evidence."],
      "The correct answer is that it allowed other scientists to evaluate and repeat his work . Sharing results lets the broader scientific community verify findings independently, communication doesn't guarantee immediate acceptance, and it certainly doesn't prevent future experimentation or reduce the need for evidence.",
      {});
  }
]),["If no one else knows about your results, what can't happen to verify or build on your work?"]);
E("bio-u2-92-q02",2,["9.2"],2,"var",varset([
  function(){
    return mcq("Why is the acceptance of biogenesis over abiogenesis considered a paradigm shift?",
      "A long-standing explanation was replaced by a new evidence-based understanding.",
      ["All scientific theories were discarded.","A new scientific instrument was invented.","Scientists stopped conducting experiments."],
      "The correct answer is that a long-standing explanation was replaced by a new evidence-based understanding . Abiogenesis had been widely accepted for a long time before strong evidence (from Pasteur and others) overturned it: this is the definition of a paradigm shift, not the discarding of all theories, the invention of an instrument, or scientists stopping experimentation.",
      {});
  }
]),["A paradigm shift means a long-held, widely accepted idea gets replaced. What had to happen to abiogenesis as a belief for biogenesis to take over?"]);
E("bio-u2-92-q03",2,["9.2"],2,"var",varset([
  function(){
    return mcq("Which event would best represent a paradigm shift in science?",
      "Replacing a widely accepted explanation after substantial new evidence emerges",
      ["Publishing a laboratory report","Repeating an experiment and obtaining the same results","Using a more precise measuring device"],
      "The correct answer is replacing a widely accepted explanation after substantial new evidence emerges , which is the actual definition of a paradigm shift, a fundamental change, not a minor event like publishing a routine report, repeating an experiment with the same results, or simply using a better measuring tool.",
      {});
  }
]),["A paradigm shift is more than a small tweak, it's a fundamental replacement of a previously accepted explanation."]);

/* ---------- 9.3 (STSE) Microscopy & the Development of Cell Theory ---------- */
E("bio-u2-93-q01",2,["9.3"],2,"var",varset([
  function(){
    return mcq("How did improvements in microscope technology contribute to the development of cell theory?",
      "They allowed scientists to directly observe cells.",
      ["They prevented contamination.","They proved abiogenesis was correct.","They replaced experimental investigations."],
      "The correct answer is that they allowed scientists to directly observe cells for the first time, which was essential to developing the cell theory. Microscopes didn't prevent contamination, prove abiogenesis (they actually helped support biogenesis), or replace the need for experiments, they enabled a new kind of observation.",
      {});
  }
]),["Before better microscopes, scientists couldn't see cells at all. What capability did improved microscopes give scientists that led to the cell theory?"]);
E("bio-u2-93-q02",2,["9.3"],2,"var",varset([
  function(){
    return mcq("A student examines a plant cell using a microscope with twice the magnification of a previous model. Which outcome is most likely?",
      "Additional cellular details may become visible.",
      ["The cell will become larger.","The cell will divide more quickly.","The specimen will become contaminated."],
      "The correct answer is that additional cellular details may become visible . Higher magnification reveals finer structures that weren't visible before: it doesn't physically change the size of the actual cell, speed up cell division, or cause contamination.",
      {});
  }
]),["Higher magnification reveals finer detail, think about what becomes visible that wasn't before, rather than the cell physically changing."]);
E("bio-u2-93-q03",2,["9.3"],2,"var",varset([
  function(){
    return mcq("During a laboratory activity, students observe onion root tip cells undergoing mitosis. Which principle of cell theory is demonstrated?",
      "Cells arise from pre-existing cells.",
      ["Cells are the basic unit of life.","Organisms contain specialized tissues.","Living things require energy."],
      "The correct answer is cells arise from pre-existing cells . Mitosis is literally one cell dividing to form two new cells, which directly demonstrates this specific principle of cell theory: it doesn't specifically demonstrate that cells are the basic unit of life (a separate tenet), specialized tissues, or energy requirements.",
      {});
  }
]),["Mitosis is literally a new cell forming by division of an existing one. Which cell theory principle does that directly demonstrate?"]);
E("bio-u2-93-q04",2,["9.3"],2,"var",varset([
  function(){
    return mcq("Which observation provides the strongest evidence that cells are the basic unit of life?",
      "Living processes occur within cells.",
      ["Every organism requires energy.","Organisms interact with their environment.","Species evolve over time."],
      "The correct answer is that living processes occur within cells , since this directly shows that the cell itself is where the actual functions of life take place. Requiring energy, interacting with the environment, and evolving over time are all true of living things, but they don't specifically pinpoint the cell as the basic functional unit the way this observation does.",
      {});
  }
]),["The 'basic unit of life' idea means that life's actual functioning happens at the cellular level, what supports that idea most directly?"]);

/* ---------- 6.2 Prokaryotic/Eukaryotic & Plant/Animal Cells ---------- */
E("bio-u2-62-q01",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which characteristic best distinguishes a eukaryotic cell from a prokaryotic cell?",
      "Contains a membrane-bound nucleus",
      ["Contains a cell membrane","Contains cytoplasm","Contains ribosomes"],
      "The correct answer is contains a membrane-bound nucleus , the defining structural difference between the two cell types. Both prokaryotic and eukaryotic cells have a cell membrane, cytoplasm, and ribosomes, so those features don't distinguish between them.",
      {});
  }
]),["The defining structural difference between these two cell types involves where the DNA is housed."]);
E("bio-u2-62-q02",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which organism is composed of prokaryotic cells?",
      "Streptococcus",
      ["Maple Tree","Mushroom","Protozoan"],
      "The correct answer is Streptococcus , a type of bacterium, and bacteria are the classic example of prokaryotic organisms. Maple trees and mushrooms are eukaryotic (plant and fungal cells), and protozoans are also eukaryotic single-celled organisms.",
      {});
  }
]),["Prokaryotic organisms are all single-celled and lack a nucleus. Which organism in the list is a type of bacterium?"]);
E("bio-u2-62-q03",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which structure is found in cells of a rose, but not in cells of a rat?",
      "Cell wall",
      ["Cell membrane","Cytoplasm","Mitochondria"],
      "The correct answer is cell wall , a defining feature of plant cells (like the rose) that animal cells (like the rat) lack. Cell membrane, cytoplasm, and mitochondria are present in both plant and animal cells, so they don't distinguish between the two.",
      {});
  }
]),["Roses are plants, rats are animals. Which structure is a defining feature of plant cells that animal cells lack?"]);
E("bio-u2-62-q04",2,["6.2"],1,"var",varset([
  function(){
    var q=mcq("Which organelle is primarily responsible for producing ATP during cellular respiration?",
      "A",
      ["B","C","D"],
      "The correct answer is A , which in the diagram points to a mitochondrion, often called the 'powerhouse of the cell' because it's where most ATP is generated during cellular respiration. The other labeled structures in the diagram correspond to different organelles not primarily responsible for ATP production.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-62-q04.png" alt="Diagram of an animal cell with four labels: A points to a small green bean-shaped organelle with folded inner membranes near the top of the cell; B points to the green network of membranes wrapped around the large central sphere; C points to the large dark blue sphere at the centre; D points to the orange stack of folded membranes on the right side" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the diagram and recall which organelle is often called the 'powerhouse of the cell.'"]);
E("bio-u2-62-q05",2,["6.2"],2,"var",varset([
  function(){
    var q=mcq("Which statement best describes the function of structure X?",
      "Produce proteins",
      ["Break down wastes and old cell parts","Package and transport proteins","Store genetic information"],
      "The correct answer is produce proteins . Structure X in the diagram points to ribosomes on the rough endoplasmic reticulum, which are the cell's protein-making machinery, breaking down wastes is the job of lysosomes, packaging/transport is the Golgi apparatus's role, and storing genetic information is the nucleus's function.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-62-q05.png" alt="Diagram of an animal cell with an arrow labelled X pointing to one of the small dark dots studding the green folded membranes that surround the large central sphere" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at where structure X is located in the diagram relative to the nucleus, it appears closely associated with making and modifying something."]);
E("bio-u2-62-q06",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which structure controls the movement of materials into and out of the cell?",
      "Cell membrane",
      ["Cell wall","Nucleus","Vacuole"],
      "The correct answer is cell membrane , which selectively controls what enters and exits the cell. The cell wall provides structural support (and is absent in animal cells), the nucleus controls genetic activity rather than material transport, and the vacuole stores substances rather than regulating overall cell entry/exit.",
      {});
  }
]),["This structure forms the outer boundary of the cell and selectively lets substances pass through."]);
E("bio-u2-62-q07",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A scientist observes a cell that contains a nucleus, mitochondria, and chloroplasts. How should the cell be classified?",
      "Plant eukaryotic cell",
      ["Animal eukaryotic cell","Prokaryotic cell","Viral particle"],
      "The correct answer is plant eukaryotic cell . A nucleus confirms it's eukaryotic, and chloroplasts specifically indicate a plant cell (animal cells don't have chloroplasts), a prokaryotic cell would lack a nucleus entirely, and this is clearly not a virus, which isn't even a true cell.",
      {});
  }
]),["A nucleus means eukaryotic. Chloroplasts are found in which type of organism's cells specifically?"]);
E("bio-u2-62-q08",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A bacterial cell is examined under a microscope. Which feature would most strongly support the conclusion that it is prokaryotic?",
      "DNA is not enclosed in a nucleus",
      ["Presence of a cell membrane","Presence of cytoplasm","Presence of ribosomes"],
      "The correct answer is that DNA is not enclosed in a nucleus , the defining feature of prokaryotic cells. A cell membrane, cytoplasm, and ribosomes are present in prokaryotic AND eukaryotic cells, so those features alone wouldn't help distinguish a prokaryote.",
      {});
  }
]),["The defining prokaryotic feature is the absence of something that eukaryotic cells have around their DNA."]);
E("bio-u2-62-q09",2,["6.2"],1,"var",varset([
  function(){
    return mcq("What is the primary structural difference between the rough endoplasmic reticulum and the smooth endoplasmic reticulum when viewed under a transmission electron microscope?",
      "Presence of attached ribosomes",
      ["Presence of internal DNA","Thickness of the lipid bilayer","Total number of membranes"],
      "The correct answer is the presence of attached ribosomes , which is literally why the rough ER looks 'rough' under an electron microscope, the smooth ER lacks these ribosomes. The difference is not about internal DNA, lipid bilayer thickness, or number of membranes.",
      {});
  }
]),["The name 'rough' comes from something visibly attached to its surface under the microscope."]);
E("bio-u2-62-q10",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A toxin prevents chloroplasts from functioning properly. Which cellular process would be affected first?",
      "Photosynthesis",
      ["ATP production","Protein synthesis","Waste digestion"],
      "The correct answer is photosynthesis , since chloroplasts are the specific organelle where photosynthesis takes place. ATP production (via mitochondria), protein synthesis (via ribosomes), and waste digestion (via lysosomes) are carried out by different organelles and wouldn't be directly affected first.",
      {});
  }
]),["Chloroplasts are the site of one specific process. If they stop working, which process is directly blocked first?"]);
E("bio-u2-62-q11",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Which cell type would be expected to contain the greatest number of mitochondria?",
      "Muscle cell",
      ["Bacterial cell","Red blood cell","Skin cell"],
      "The correct answer is muscle cell , since muscle cells perform continuous, high-energy work and need lots of ATP, which mitochondria supply. Bacterial cells don't have mitochondria at all, and red blood cells and skin cells have much lower energy demands than active muscle tissue.",
      {});
  }
]),["Mitochondria produce ATP for energy-demanding activities. Which of these cell types does the most continuous, high-energy work?"]);
E("bio-u2-62-q12",2,["6.2"],2,"var",varset([
  function(){
    return mcq("During a laboratory investigation, a student notes that a cell maintains its shape even when placed in distilled water. Which structure most likely provides this support?",
      "Cell wall",
      ["Cell membrane","Cytoplasm","Golgi apparatus"],
      "The correct answer is cell wall , a rigid structure that supports the cell and prevents it from changing shape or bursting even when water rushes in. The cell membrane alone (without a wall) would not provide this rigid support, and cytoplasm and the Golgi apparatus aren't structural support systems.",
      {});
  }
]),["Animal cells can burst in distilled water, but some cells keep their shape due to a rigid structure surrounding the membrane."]);
E("bio-u2-62-q13",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A student compares a muscle cell and a leaf cell. Which structure would most likely be found in both?",
      "Ribosome",
      ["Cell wall","Chloroplast","Large central vacuole"],
      "The correct answer is ribosome , since virtually all cells, animal or plant, need to make proteins and therefore contain ribosomes. Cell walls, chloroplasts, and large central vacuoles are specific to plant cells and would not be found in an animal muscle cell.",
      {});
  }
]),["Both cell types need to make proteins, which organelle is universal to virtually every cell type, plant or animal?"]);
E("bio-u2-62-q14",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A scientist removes the nucleus from a eukaryotic cell. Which long-term effect is most likely?",
      "The cell will eventually lose control of its activities",
      ["ATP production will immediately stop","The cell will instantly lose its membrane","The cell will no longer contain cytoplasm"],
      "The correct answer is that the cell will eventually lose control of its activities . The nucleus directs gene expression and cellular activity over time, so without it the cell gradually loses the ability to manage its functions, ATP production wouldn't stop immediately (that depends on mitochondria, not the nucleus), and removing the nucleus doesn't instantly destroy the membrane or cytoplasm.",
      {});
  }
]),["The nucleus directs and controls cellular activities through gene expression. Without that control center, what happens over time?"]);
E("bio-u2-62-q15",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Which statement best demonstrates that organelles work together to carry out life functions?",
      "Ribosomes make proteins that are modified by the Golgi apparatus and transported in vesicles",
      ["Chloroplasts store DNA independently of other organelles","Lysosomes produce ATP for cellular activities","Vacuoles direct cell division"],
      "The correct answer is that ribosomes make proteins that are modified by the Golgi apparatus and transported in vesicles, a clear example of multiple organelles cooperating in sequence. The other options describe organelles working independently or performing functions they don't actually carry out (lysosomes don't produce ATP, and vacuoles don't direct cell division).",
      {});
  }
]),["Look for an answer that describes a multi-step process involving more than one organelle working in sequence."]);

/* ---------- 6.3 Cell Structures Under the Microscope ---------- */
E("bio-u2-63-q01",2,["6.3"],1,"var",varset([
  function(){
    return mcq("Which organelle is responsible for modifying and packaging proteins?",
      "Golgi apparatus",
      ["Lysosome","Nucleus","Ribosome"],
      "The correct answer is Golgi apparatus , which receives proteins from the ER, modifies them, and packages them for transport, sometimes described as the cell's shipping department. Lysosomes break down waste, the nucleus stores genetic material, and ribosomes synthesize (rather than package) proteins.",
      {});
  }
]),["This organelle receives proteins from the ER, modifies them, and packages them for transport, sometimes described as the cell's post office."]);
E("bio-u2-63-q02",2,["6.3"],2,"var",varset([
  function(){
    return mcq("Pompe disease results from the inability to break down glycogen within cells because digestive enzymes are missing. Which organelle is most likely defective?",
      "Lysosome",
      ["Cell Membrane","Mitochondrion","Ribosome"],
      "The correct answer is lysosome , the organelle that contains the digestive enzymes responsible for breaking down molecules like glycogen. The cell membrane, mitochondrion, and ribosome are not responsible for this type of intracellular digestion.",
      {});
  }
]),["Which organelle contains the digestive enzymes responsible for breaking down cellular waste and large molecules?"]);
E("bio-u2-63-q03",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A cell is unable to transport newly synthesized proteins to other parts of the cell. Which structure is most likely malfunctioning?",
      "Vesicle",
      ["Golgi apparatus","Mitochondrion","Ribosomes"],
      "The correct answer is vesicle - they act as the cell's shipping containers for molecules like proteins to help move things around or in and out of cells. The Golgi apparatus acts as the cell's post office, but is not specifically involved in transport. Mitochondria are involved in energy generation, and ribosomes are involved in protein synthesis, not transport.",
      {});
  }
]),["Which is involved in storing and transporting molecules within a cell?"]);
E("bio-u2-63-q04",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A researcher finds that vesicles are accumulating in a cell because they cannot fuse with the Golgi apparatus. Which process would be most directly affected?",
      "Packaging and transport of cellular products",
      ["Digestion of glucose","Replication of DNA","Synthesis of ATP"],
      "The correct answer is packaging and transport of cellular products , since the Golgi apparatus's main job is to receive vesicles and finish preparing their contents for transport. This blockage wouldn't directly affect glucose digestion, DNA replication, or ATP synthesis, which are handled by different organelles.",
      {});
  }
]),["The Golgi apparatus's main job involves preparing materials brought to it by vesicles for their final destination."]);
E("bio-u2-63-q05",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A student observes a cell under a light microscope and identifies a nucleus, cytoplasm, and cell membrane but cannot see ribosomes. What is the best explanation?",
      "Ribosomes are too small to be resolved with a light microscope",
      ["Ribosomes are absent from the cell","Ribosomes only occur in prokaryotic cells","Ribosomes only occur in plant cells"],
      "The correct answer is that ribosomes are too small to be resolved with a light microscope . Light microscopes have limited resolving power and simply cannot show structures as small as ribosomes, it's not that ribosomes are absent, or that they only occur in prokaryotic or plant cells (ribosomes are found in essentially all cells).",
      {});
  }
]),["Light microscopes have limited resolving power. Ribosomes are extremely small, could the issue be the tool rather than the cell itself?"]);

/* ---------- 9.4 (STSE) Development of Microscope Technology ---------- */
E("bio-u2-94-q01",2,["9.4"],2,"var",varset([
  function(){
    var q=mcq("What type of microscope was used to view this image?",
      "Scanning electron microscope",
      ["Atomic force microscope","Compound light microscope","Transmission electron microscope"],
      "The correct answer is scanning electron microscope , identifiable by the detailed 3D-looking surface texture typical of SEM images. A transmission electron microscope instead shows flat, sliced internal views, and compound light and atomic force microscopes produce very different types of images.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-94-q01.png" alt="Grayscale micrograph of a single oval organelle cut open to show densely folded inner membranes; the image has a shaded, three-dimensional look with fine surface texture" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the image's texture, is it a detailed 3D surface view, or a flat 2D slice showing internal structures?"]);
E("bio-u2-94-q02",2,["9.4"],1,"var",varset([
  function(){
    return mcq("Why are transmission electron microscopes limited for studying living organisms?",
      "Requires dead samples",
      ["Cannot magnify samples","Cannot detect surfaces","Uses visible light"],
      "The correct answer is that it requires dead samples . TEM specimens must be extremely thin and are often chemically treated and placed in a vacuum, which living organisms cannot survive: the limitation is not about magnification, surface detection, or the use of visible light (TEM uses electrons, not light).",
      {});
  }
]),["TEM requires extremely thin, often chemically-treated specimens. Can a living organism survive that preparation process?"]);
E("bio-u2-94-q03",2,["9.4"],1,"var",varset([
  function(){
    return mcq("Which microscope uses visible light and glass lenses to magnify specimens?",
      "Compound light microscope",
      ["Atomic force microscope","Scanning electron microscope","Transmission electron microscope"],
      "The correct answer is compound light microscope , the most basic and common microscope type, typically found in classrooms, which uses visible light and glass lenses. Atomic force, scanning electron, and transmission electron microscopes all use different methods (probes or electron beams) rather than visible light.",
      {});
  }
]),["This is the most basic and common type of microscope, typically found in classrooms."]);
E("bio-u2-94-q04",2,["9.4"],1,"var",varset([
  function(){
    return mcq("Which microscope provides the highest magnification for viewing internal structures of cells?",
      "Transmission electron microscope",
      ["Compound light microscope","Fluorescence microscope","Scanning electron microscope"],
      "The correct answer is transmission electron microscope , which uses an electron beam that passes through the specimen to reveal extremely fine internal detail at far higher magnification than light-based microscopes. Compound light and fluorescence microscopes are limited by the wavelength of visible light, and scanning electron microscopy shows surfaces rather than internal structures.",
      {});
  }
]),["Among all microscope types, electron-based microscopes vastly outperform light-based ones in magnifying power. Internal structures require beams that pass through the specimen."]);
E("bio-u2-94-q05",2,["9.4"],2,"var",varset([
  function(){
    return mcq("Why was electron microscopy developed after light microscopy?",
      "To improve image resolution",
      ["To create larger microscope lenses","To make microscopes less expensive","To reduce specimen preparation time"],
      "The correct answer is to improve image resolution . Light microscopes have a fundamental resolution limit due to the wavelength of visible light, so electron microscopy was developed specifically to see finer detail, not to make microscopes bigger, cheaper, or to reduce specimen preparation time (electron microscopy actually requires more preparation).",
      {});
  }
]),["Light microscopes have a fundamental resolution limit due to the wavelength of visible light. What problem would scientists want to solve by using electrons instead?"]);
E("bio-u2-94-q06",2,["9.4"],2,"var",varset([
  function(){
    return mcq("A student wants to observe chloroplast movement in living plant cells. Which microscope would be the most appropriate choice?",
      "Compound light microscope",
      ["Atomic force microscope","Scanning electron microscope","Transmission electron microscope"],
      "The correct answer is compound light microscope , since the specimen needs to remain alive to observe movement, and only a light microscope allows this. Electron and atomic force microscopes require samples that are dead, dried, sectioned, or placed in a vacuum.",
      {});
  }
]),["The specimen needs to stay ALIVE to observe movement. Which type of microscope doesn't require dead, sectioned, or vacuum-prepared samples?"]);
E("bio-u2-94-q07",2,["9.4"],2,"var",varset([
  function(){
    return mcq("A student examines a cell using a compound light microscope at 400\u00d7 magnification and cannot clearly distinguish small organelles. Which technological improvement would most directly address this problem?",
      "Increasing image resolution",
      ["Increasing specimen size","Reducing staining techniques","Using lower magnification"],
      "The correct answer is increasing image resolution . The issue here isn't a lack of magnification (objects are already enlarged) but an inability to tell fine details apart, which is specifically what resolution, not magnification, specimen size, or staining, controls.",
      {});
  }
]),["More magnification alone doesn't help if you can't tell two close points apart, what property of the microscope actually controls that clarity?"]);

/* ---------- 9.5 (STSE) Magnification, Resolution & Microscope Skills ---------- */
E("bio-u2-95-q01",2,["9.5"],1,"var",varset([
  function(){
    return mcq("What is the minimum distance two points can be separated and still be distinguished as separate points?",
      "Resolution",
      ["Contrast","Depth of field","Magnification"],
      "The correct answer is resolution , the precise definition of this optical property. Contrast refers to how distinguishable structures are from their background, depth of field refers to the range of sharp focus, and magnification refers to how much larger an image appears, none of these match this specific definition.",
      {});
  }
]),["This is the textbook definition of one specific optical property."]);
E("bio-u2-95-q02",2,["9.5"],2,"var",varset([
  function(){
    return mcq("Why might a school choose compound light microscopes instead of electron microscopes for student investigations?",
      "Light microscopes are safer and less expensive",
      ["Electron microscopes provide lower resolution","Light microscopes can view smaller structures","Light microscopes require more maintenance"],
      "The correct answer is that light microscopes are safer and less expensive , both important practical factors for a classroom setting. Electron microscopes actually provide much higher (not lower) resolution, light microscopes cannot view smaller structures than electron microscopes, and light microscopes generally require less maintenance, not more.",
      {});
  }
]),["Think about practical classroom factors: cost, training, safety, and maintenance, not which microscope is more powerful."]);
E("bio-u2-95-q03",2,["9.5"],1,"var",varset([
  function(){
    return mcq("Which component should be adjusted first to bring a specimen into focus under low power?",
      "Coarse adjustment knob",
      ["Diaphragm lever","Fine adjustment knob","Stage clips"],
      "The correct answer is coarse adjustment knob , which is safe to use for large focus adjustments specifically under low power (there's plenty of distance between the lens and the slide). The diaphragm controls light, the fine adjustment is used for small refinements afterward, and stage clips just hold the slide in place.",
      {});
  }
]),["Under low power only, the larger, faster-moving knob is safe to use first; under high power, it becomes risky."]);
E("bio-u2-95-q04",2,["9.5"],2,"var",varset([
  function(){
    var q=mcq("Based on the image of three overlapping colored threads, which explains why only one specific thread is in sharp focus?",
      "Depth of field",
      ["Contrast","Magnification","Resolution"],
      "The correct answer is depth of field, the narrow range of distance from the lens within which objects appear sharply in focus. Since the three threads are at different depths, only the one within that narrow in-focus range appears sharp; this is not about contrast, magnification, or resolution.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-95-q04.png" alt="Microscope view of three coloured threads crossing: a green thread runs horizontally across the middle in sharp focus, while a blue thread and a red thread cross diagonally behind it, both out of focus" style="max-width:100%;height:auto">';
    return q;
  }
]),["Only objects within a certain narrow range of distance from the lens appear sharp at any one time, what is that range called?"]);
E("bio-u2-95-q05",2,["9.5"],1,"var",varset([
  function(){
    return mcq("What happens to the field of view when switching from medium power to high power?",
      "It decreases",
      ["It increases","It remains identical","It expands laterally"],
      "The correct answer is that it decreases . As magnification increases, you are zooming in on a smaller area of the slide, so naturally less of the specimen is visible at once, the field of view does not increase, stay the same, or expand.",
      {});
  }
]),["As magnification increases, you're zooming in more, which means you're seeing a smaller area of the slide."]);
E("bio-u2-95-q06",2,["9.5"],1,"var",varset([
  function(){
    return mcq("Why is the coarse adjustment knob strictly avoided when using the high-power objective lens?",
      "The lens may crack the slide",
      ["The image contrast will drop","The light source will overheat","The resolution will lock permanently"],
      "The correct answer is that the lens may crack the slide . Under high power, the objective lens sits extremely close to the slide, and the large, fast movements of the coarse adjustment knob risk slamming the lens into the slide, damaging both, this isn't primarily about contrast, light overheating, or resolution being 'locked.'",
      {});
  }
]),["Under high power, the lens sits extremely close to the slide. Large, fast movements at this distance risk physical damage."]);
E("bio-u2-95-q07",2,["9.5"],1,"var",varset([
  function(){
    return mcq("What is the proper sequence of steps to safely find and view a specimen at high power?",
      "Focus on low power, center the object, switch to medium, then high",
      ["Focus on high power first, then switch down to medium and low","Focus on medium power, switch to low power, then instantly jump to high","Place slide on stage, select high power, and turn coarse adjustment"],
      "The correct answer is to focus on low power, center the object, switch to medium, then high . Starting at the power with the widest field of view makes the specimen easiest to find, and then progressively zooming in keeps it centered, jumping straight to high power, or moving in the reverse order, makes the specimen very difficult (and risky) to locate.",
      {});
  }
]),["You should always start at the power that gives you the widest field of view to locate the specimen, then progressively zoom in."]);
E("bio-u2-95-q08",2,["9.5"],1,"var",varset([
  function(){
    return mcq("When a microscope is switched from low power to high power, what usually happens to the depth of field?",
      "It decreases",
      ["It doubles","It increases","It remains unchanged"],
      "The correct answer is that it decreases . As you zoom in more closely at higher magnification, the range of distance that stays in sharp focus becomes much narrower, not wider, doubled, or unchanged.",
      {});
  }
]),["As magnification increases and you zoom in more closely, the in-focus range becomes much narrower."]);
E("bio-u2-95-q09",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A student reports that a microscope has excellent magnification but poor resolution. What does this observation mean?",
      "The image is large but details are difficult to distinguish",
      ["The image is small but very detailed","The microscope has a large field of view","The specimen is too thick to observe"],
      "The correct answer is that the image is large but details are difficult to distinguish . Magnification makes things bigger, while resolution is what allows fine detail to be told apart, having one without the other means you get a big, blurry image rather than a small, detailed one, a large field of view, or a thickness problem with the specimen.",
      {});
  }
]),["Magnification makes things bigger; resolution determines whether fine details can be told apart. A blown-up blurry image has one but not the other."]);
E("bio-u2-95-q10",2,["9.5"],1,"var",varset([
  function(){
    return mcq("Which procedure is safest when transporting a microscope?",
      "Carry it with one hand under the base and one on the arm",
      ["Carry it by the arm only","Carry it by the eyepiece and arm","Slide it across the laboratory bench"],
      "The correct answer is to carry it with one hand under the base and one on the arm , which properly supports the microscope's weight and keeps it stable. Carrying it by the arm alone, by the eyepiece and arm, or sliding it across a bench all risk dropping or damaging the instrument.",
      {});
  }
]),["Microscopes are top-heavy and delicate, think about how to support both its weight and stability with two hands."]);
E("bio-u2-95-q11",2,["9.5"],1,"var",varset([
  function(){
    return mcq("Why should a microscope always be stored with the low-power objective in position?",
      "It reduces the risk of damaging slides and lenses",
      ["It allows immediate high-resolution viewing","It increases magnification during storage","It prevents dust from entering the eyepiece"],
      "The correct answer is that it reduces the risk of damaging slides and lenses , since low power keeps the greatest distance between the lens and the stage. This storage practice has nothing to do with achieving immediate high resolution, increasing magnification, or keeping dust out of the eyepiece.",
      {});
  }
]),["Low power keeps the most distance between the lens and the stage, protecting both from accidental contact."]);
E("bio-u2-95-q12",2,["9.5"],1,"var",varset([
  function(){
    return mcq("Why should focusing begin using the low-power objective?",
      "It provides the largest field of view",
      ["It prevents the use of coarse adjustment later","It produces the greatest total magnification","It provides the highest resolution available"],
      "The correct answer is that it provides the largest field of view , making it much easier to locate a specimen before zooming in further. Starting at low power doesn't prevent later use of coarse adjustment, and it does not produce the greatest magnification or highest resolution, those come at higher power.",
      {});
  }
]),["Starting with the widest possible view makes it much easier to locate a specimen before zooming in."]);
E("bio-u2-95-q13",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A student begins observing a specimen using the 40\u00d7 objective and cannot find the specimen. What should the student do next?",
      "Return to low power and recenter the specimen",
      ["Increase the light intensity","Rotate the eyepiece","Use the coarse adjustment knob"],
      "The correct answer is to return to low power and recenter the specimen . Going back to the power with the widest field of view is the safest and most reliable way to relocate a lost specimen, rather than increasing light, rotating the eyepiece, or using the coarse adjustment knob (which is risky at higher power).",
      {});
  }
]),["When you lose the specimen at higher power, the safest fix is to go back to where the field of view was largest."]);
E("bio-u2-95-q14",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A microscope has a 10x ocular lens and a 4x objective lens. What is the total magnification?",
      "40x",
      ["14x","100x","400x"],
      "Total Magnification = Ocular Lens \u00d7 Objective Lens = 10 \u00d7 4 = 40x \u2713 40x",
      {});
  }
]),["Total magnification = ocular lens \u00d7 objective lens. Just multiply the two numbers given."]);
E("bio-u2-95-q15",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A student observes a specimen at a total magnification of 100x using a 10x ocular lens. Which objective lens is being used?",
      "10x",
      ["4x","40x","100x"],
      "Objective Lens = Total Magnification \u00f7 Ocular Lens = 100 \u00f7 10 = 10x \u2713 10x",
      {});
  }
]),["Rearrange the magnification formula: divide total magnification by the ocular lens power to isolate the objective lens power."]);
E("bio-u2-95-q16",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A microscope has a field of view of 4.0 mm at 40x magnification. What is the field of view at 100x magnification?",
      "1.6 mm",
      ["0.8 mm","2.5 mm","10.0 mm"],
      "Med FOV = (Low FOV \u00d7 Low mag) \u00f7 Med mag Med FOV = (4.0 mm \u00d7 40x) \u00f7 100x Med FOV = 1.6 mm \u2713 1.6 mm",
      {});
  }
]),["Field of view and magnification are inversely related. Use the formula: new FOV = (old FOV \u00d7 old magnification) \u00f7 new magnification."]);
E("bio-u2-95-q17",2,["9.5"],2,"var",varset([
  function(){
    return mcq("The field of view at 100\u00d7 magnification is 1.8 mm. What is the field of view at 400\u00d7 magnification?",
      "0.45 mm",
      ["0.18 mm","0.72 mm","7.2 mm"],
      "High FOV = (Med FOV \u00d7 Med mag) \u00f7 High mag High FOV = (1.8 mm \u00d7 100x) \u00f7 400x High FOV = 0.45 mm \u2713 0.45 mm",
      {});
  }
]),["Use the same inverse relationship formula, scaling from 100x up to 400x magnification."]);
E("bio-u2-95-q18",2,["9.5"],2,"var",varset([
  function(){
    return mcq("A student notices that increasing magnification causes the field of view to become smaller. Which statement best explains this observation?",
      "Magnification and field of view are inversely related",
      ["Magnification and field of view are directly related","Resolution determines field of view","Total magnification remains constant"],
      "The correct answer is that magnification and field of view are inversely related, as one goes up, the other goes down, exactly as described in the scenario. Resolution does not determine field of view, and total magnification clearly is not constant since it's the very thing being increased.",
      {});
  }
]),["As one value goes up, the other goes down, that's the definition of which type of mathematical relationship?"]);
E("bio-u2-95-q19",2,["9.5"],2,"var",varset([
  function(){
    var q=mcq("The diameter of the field of view for this microscope is 4.0mm. What is the approximate size of one paramecium?",
      "0.8 mm",
      ["1.0 mm","2.5 mm","4.0 mm"],
      "Specimen Size = Field of View \u00f7 Number of specimens Specimen Size = 4.0 \u00f7 5 = 0.8 mm \u2713 0.8 mm",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-95-q19.png" alt="Circular microscope field of view (pale blue) with a single small slipper-shaped paramecium near the centre; the organism’s length is about one fifth of the field’s diameter" style="max-width:100%;height:auto">';
    return q;
  }
]),["If you can count how many organisms fit end-to-end across the field of view, divide the field of view diameter by that count."]);
E("bio-u2-95-q20",2,["9.5"],2,"var",varset([
  function(){
    return mcq("Under medium power, a field of view is 1.8 mm. A student estimates that six bacteria would fit across the diameter. What is the approximate size of one bacterium?",
      "0.30 mm",
      ["0.03 mm","1.08 mm","10.8 mm"],
      "Specimen Size = Field of View \u00f7 Number of specimens Specimen Size = 1.8 \u00f7 6 = 0.3 mm \u2713 0.30 mm",
      {});
  }
]),["Divide the field of view by the number of organisms that fit across it to estimate the size of just one."]);

/* ---------- 6.4 Chemical Elements & Compounds in Living Systems ---------- */
E("bio-u2-64-q01",2,["6.4"],2,"var",varset([
  function(){
    return mcq("A medical researcher is analyzing how a new drug binds to a specific protein in human cells. Which field of science is this researcher primarily practicing?",
      "Biochemistry",
      ["Biogeography","Ecology","Paleontology"],
      "The correct answer is biochemistry , the field that studies chemical interactions happening inside living things, including drug-protein binding. Biogeography studies species distribution, ecology studies organism interactions with environments, and paleontology studies fossils, none of which match studying molecular drug binding.",
      {});
  }
]),["This research is about chemical interactions happening inside living cells, which branch of science focuses specifically on that?"]);
E("bio-u2-64-q02",2,["6.4"],2,"var",varset([
  function(){
    return mcq("A mutated cell entirely loses its ability to form peptide bonds. Which structure or molecule will it be unable to produce?",
      "Plasma protein",
      ["Cell wall","Cytoplasmic membrane","Glycogen storage"],
      "The correct answer is plasma protein , since peptide bonds are specifically what link amino acids together to build proteins. Cell walls, cytoplasmic membranes, and glycogen storage are built from carbohydrates and lipids, not peptide bonds, so the cell's ability to make those would be unaffected.",
      {});
  }
]),["Peptide bonds link together the building blocks of one specific biomolecule. Which molecule requires peptide bonds to be constructed?"]);
E("bio-u2-64-q03",2,["6.4"],1,"var",varset([
  function(){
    return mcq("Which statement best defines biochemistry?",
      "The study of chemical processes occurring within living organisms",
      ["The study of physical structure and movement of multicellular animals","The study of inorganic compounds found in Earth's crust","The study of synthetic materials created in a laboratory"],
      "The correct answer is the study of chemical processes occurring within living organisms, literally combining 'bio' (life) and 'chemistry.' The other options describe animal physiology, geology, or materials science, none of which match the definition of biochemistry.",
      {});
  }
]),["Break the word apart: 'bio-' (life) + 'chemistry' (chemical processes). What would that combination study?"]);
E("bio-u2-64-q04",2,["6.4"],1,"var",varset([
  function(){
    return mcq("Which element is found in all major biological molecules?",
      "Carbon",
      ["Calcium","Iron","Sodium"],
      "The correct answer is carbon , which forms the structural backbone of carbohydrates, lipids, proteins, and nucleic acids alike. Calcium, iron, and sodium are important in biology but are not present in literally every major biological molecule the way carbon is.",
      {});
  }
]),["This element forms the backbone of carbohydrates, lipids, proteins, and nucleic acids alike, it's the basis of all organic chemistry."]);
E("bio-u2-64-q05",2,["6.4"],2,"var",varset([
  function(){
    return mcq("A scientist discovers an organism whose cells can no longer produce enzymes. Which conclusion is most reasonable?",
      "Chemical reactions in the cells would slow dramatically",
      ["Cell division would occur more rapidly","Oxygen would become unnecessary for the organism","Water would no longer be required by the cells"],
      "The correct answer is that chemical reactions in the cells would slow dramatically . Enzymes act as catalysts that speed up the chemical reactions essential to life; without them, those reactions would still occur but far too slowly to sustain normal cell function, cell division would not speed up, and oxygen and water would still be required.",
      {});
  }
]),["Enzymes speed up chemical reactions in cells. Without them, what happens to the rate at which those reactions occur?"]);
E("bio-u2-64-q06",2,["6.4"],2,"var",varset([
  function(){
    return mcq("During a laboratory investigation, a cell's ATP production suddenly stops. Which process would be most directly affected?",
      "Active transport across the membrane",
      ["Diffusion of oxygen into the cell","Osmosis of water into the cell","Random movement of molecules"],
      "The correct answer is active transport across the membrane , since this is the one process listed that specifically requires ATP to move substances against their concentration gradient. Diffusion of oxygen, osmosis, and random molecular movement are all passive processes that don't require cellular energy.",
      {});
  }
]),["Look for the transport process in the list that specifically requires energy (ATP) to move substances, unlike passive processes."]);

/* ---------- 6.5 Water, Glucose & ATP ---------- */
E("bio-u2-65-q01",2,["6.5"],2,"var",varset([
  function(){
    return mcq("A patient is severely dehydrated. Which cellular process would most likely be disrupted first?",
      "Chemical reactions occurring in solution",
      ["Cellular respiration","DNA replication","Protein synthesis"],
      "The correct answer is chemical reactions occurring in solution , since water serves as the medium for most of the chemical reactions taking place in cells. Without enough water, these reactions are disrupted immediately, before larger-scale processes like respiration, DNA replication, or protein synthesis are necessarily affected.",
      {});
  }
]),["Water serves as the medium in which most chemical reactions in cells take place. Without enough water, what happens first?"]);
E("bio-u2-65-q02",2,["6.5"],1,"var",varset([
  function(){
    return mcq("Which property of water makes it an effective transport medium in living organisms?",
      "It is a solvent for many substances",
      ["It dissolves in many solids","It is hydrophobic","It stores large amounts of ATP"],
      "The correct answer is that it is a solvent for many substances , allowing water to dissolve and carry dissolved materials throughout an organism. Water is not hydrophobic (it's the opposite), it doesn't dissolve in solids, and it doesn't store ATP, those don't relate to its role as a transport medium.",
      {});
  }
]),["Water's ability to transport dissolved substances comes from its capacity to dissolve a wide range of other molecules."]);
E("bio-u2-65-q03",2,["6.5"],1,"var",varset([
  function(){
    return mcq("What is meant by the term hydrophobic?",
      "Repelled by water",
      ["Attracted to water","Dissolves easily in water","Requires water for transport"],
      "The correct answer is repelled by water , exactly matching the word's roots ('hydro-' = water, '-phobic' = fearing/avoiding). 'Attracted to water' describes hydrophilic (the opposite term), and hydrophobic substances do not dissolve easily in water or require water for transport.",
      {});
  }
]),["Break down the word: 'hydro-' (water) + '-phobic' (fearing/avoiding). What would that combination mean?"]);
E("bio-u2-65-q04",2,["6.5"],2,"var",varset([
  function(){
    return mcq("A student compares glucose and ATP. Which statement accurately describes their relationship?",
      "Glucose can be broken down to produce ATP",
      ["ATP stores energy long-term while glucose stores energy short-term","Glucose and ATP store identical amounts of energy","Glucose is produced directly from ATP"],
      "The correct answer is that glucose can be broken down to produce ATP . Glucose is a stored fuel molecule, while ATP is the immediately usable energy currency cells spend, cellular respiration breaks down glucose to generate ATP, not the reverse, and the two molecules do not store identical or comparable amounts of energy.",
      {});
  }
]),["Glucose is a stored fuel; ATP is the usable energy currency cells spend directly. How does the cell get from one to the other?"]);

/* ---------- 6.6 Carbohydrates, Lipids & Proteins ---------- */
E("bio-u2-66-q01",2,["6.6"],1,"var",varset([
  function(){
    return mcq("Which biochemical compound is the primary source of quick energy for cells?",
      "Carbohydrates",
      ["Lipids","Proteins","Vitamins"],
      "The correct answer is carbohydrates , which the body breaks down rapidly to provide fast, readily available energy. Lipids provide longer-term energy storage, proteins are primarily structural/functional rather than a quick energy source, and vitamins are not an energy source at all.",
      {});
  }
]),["This biomolecule is broken down rapidly and is the body's preferred fast-energy fuel, especially during exercise."]);
E("bio-u2-66-q02",2,["6.6"],2,"var",varset([
  function(){
    return mcq("A student consumes a meal rich in bread and pasta before a soccer game. Why might this improve performance?",
      "Carbohydrates can be quickly converted into usable energy",
      ["Lipids provide immediate ATP production","Proteins increase oxygen levels in the blood","Water is produced directly from carbohydrates"],
      "The correct answer is that carbohydrates can be quickly converted into usable energy , which is why athletes commonly eat carbohydrate-rich foods before exercise. Lipids do not provide immediate ATP the way carbohydrates do, proteins don't directly raise blood oxygen levels, and water is not a direct product of carbohydrate consumption in this context.",
      {});
  }
]),["Bread and pasta are rich in a particular biomolecule that the body converts into usable energy especially quickly."]);
E("bio-u2-66-q03",2,["6.6"],1,"var",varset([
  function(){
    return mcq("Which function is most closely associated with proteins?",
      "Structural support and enzyme activity",
      ["Insulation and long-term energy storage","Transport of genetic information","Waterproofing surfaces"],
      "The correct answer is structural support and enzyme activity , both classic roles of proteins (e.g., structural proteins like collagen, and enzymes that catalyze reactions). Long-term energy storage and insulation are roles of lipids, transport of genetic information is the role of nucleic acids, and waterproofing is generally a function of certain lipids, not proteins.",
      {});
  }
]),["Proteins have many roles, but think about which answer involves both a structural role AND a catalytic (enzyme) role, that's distinctly protein territory."]);
E("bio-u2-66-q04",2,["6.6"],1,"var",varset([
  function(){
    return mcq("Which biomolecule is correctly matched with its monomer?",
      "Protein \u2013 Amino acid",
      ["Carbohydrate \u2013 Amino acid","Lipid \u2013 Nucleotide","Nucleic acid - Monosaccharide"],
      "The correct answer is protein \u2013 amino acid , the correct pairing of a biomolecule with its building block. Carbohydrates are built from monosaccharides (not amino acids), lipids are not typically described as having nucleotide monomers, and nucleic acids are built from nucleotides (not monosaccharides), so each other pairing mismatches the biomolecule with the wrong monomer.",
      {});
  }
]),["Each biomolecule category has its own building-block monomer: proteins use one specific type, distinct from sugars, glycerol+fatty acids, or nucleotides."]);
E("bio-u2-66-q05",2,["6.6"],1,"var",varset([
  function(){
    return mcq("Which characteristic is shared by carbohydrates and lipids?",
      "Both are major energy sources for organisms",
      ["Both contain amino acids as subunits","Both function primarily as enzymes","Both store genetic information"],
      "The correct answer is that both are major energy sources for organisms . Carbohydrates provide quick energy and lipids provide long-term energy storage, but neither is built from amino acids (that's proteins), neither functions primarily as enzymes (that's also proteins), and neither stores genetic information (that's nucleic acids).",
      {});
  }
]),["Both of these biomolecules can serve a similar overall purpose for the organism, even though their structures are very different."]);

/* ---------- 6.7 Membrane Transport: Diffusion & Osmosis ---------- */
E("bio-u2-67-q01",2,["6.7"],2,"var",varset([
  function(){
    return mcq("Why are most cells microscopic?",
      "Smaller cells exchange materials more efficiently",
      ["Larger cells require less genetic material","Larger cells divide much less frequently","Smaller cells move faster through tissues"],
      "The correct answer is that smaller cells exchange materials more efficiently . Smaller cells have a higher surface-area-to-volume ratio, allowing nutrients, gases, and wastes to move in and out more effectively, this isn't related to genetic material requirements, division frequency, or movement speed through tissues.",
      {});
  }
]),["Think about surface area to volume ratio, smaller cells have proportionally MORE surface area relative to their volume, which matters for moving materials in and out."]);
E("bio-u2-67-q02",2,["6.7"],1,"var",varset([
  function(){
    return mcq("Which component forms the primary bilayer of the cell membrane?",
      "Phospholipids",
      ["Carbohydrates","Cholesterol","Proteins"],
      "The correct answer is phospholipids , which arrange themselves into the double-layered structure that forms the basic framework of the cell membrane. Carbohydrates, cholesterol, and proteins are all embedded within or attached to this bilayer, but they don't form the bilayer itself.",
      {});
  }
]),["The cell membrane's basic structural framework is made of a double layer of one specific lipid-based molecule."]);
E("bio-u2-67-q03",2,["6.7"],1,"var",varset([
  function(){
    return mcq("Which membrane component is primarily responsible for allowing specific substances to cross the membrane?",
      "Proteins",
      ["Carbohydrates","Cholesterol","Phospholipids"],
      "The correct answer is proteins , which form the channels and carriers that allow specific molecules to pass through the membrane. Phospholipids form the general barrier, carbohydrates are mainly involved in cell recognition, and cholesterol affects membrane fluidity rather than substance-specific transport.",
      {});
  }
]),["Phospholipids form the barrier, but channels and carriers that let SPECIFIC molecules through are made of a different component."]);
E("bio-u2-67-q04",2,["6.7"],2,"var",varset([
  function(){
    return mcq("A researcher removes cholesterol from an animal cell membrane. Which effect would most likely occur?",
      "Decreased membrane stability during temperature changes",
      ["Increased ATP production","Increased protein synthesis","Reduced water movement through aquaporins"],
      "The correct answer is decreased membrane stability during temperature changes . Cholesterol helps the membrane maintain consistent fluidity across a range of temperatures; without it, the membrane becomes more vulnerable to temperature-related changes, this removal would not increase ATP production or protein synthesis, and aquaporins (which handle water movement) are a separate, unrelated membrane component.",
      {});
  }
]),["Cholesterol helps stabilize the membrane's fluidity across a range of temperatures. Without it, what would happen when temperatures change?"]);
E("bio-u2-67-q05",2,["6.7"],2,"var",varset([
  function(){
    var q=mcq("Which of these cells will best transport nutrients throughout its structure?",
      "Cell A",
      ["Cell B","Cell C","Cell D"],
      "The correct answer is Cell A , the smallest cell shown. Smaller cells have a greater surface-area-to-volume ratio, which allows nutrients to diffuse and be transported throughout the cell more efficiently than in the larger Cells B, C, and D.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-67-q05.png" alt="Four cartoon cells in a row, identical in structure but increasing in size from left to right: a small blue cell, a larger green cell, a still larger orange cell, and the largest, a red cell" style="max-width:100%;height:auto">';
    return q;
  }
]),["Smaller cells have a higher surface-area-to-volume ratio, which makes diffusion of nutrients throughout the cell faster and more efficient."]);
E("bio-u2-67-q06",2,["6.7"],1,"var",varset([
  function(){
    return mcq("What is the passive movement of water across a selectively permeable membrane called?",
      "Osmosis",
      ["Exocytosis","Pinocytosis","Simple diffusion"],
      "The correct answer is osmosis , the specific term for water (not just any molecule) moving passively across a membrane. Exocytosis and pinocytosis involve bulk movement of materials using vesicles, and simple diffusion refers to the general movement of any substance, not specifically water through a selectively permeable membrane.",
      {});
  }
]),["This is specifically about WATER moving passively, not just any molecule."]);
E("bio-u2-67-q07",2,["6.7"],2,"var",varset([
  function(){
    return mcq("Oxygen concentration is higher outside a cell than inside the cell. How will oxygen most likely enter the cell?",
      "Simple diffusion",
      ["Active transport","Endocytosis","Facilitated diffusion"],
      "The correct answer is simple diffusion . Oxygen is small and nonpolar, so it can cross the membrane directly without any helper proteins, moving passively from an area of high concentration to low concentration: it doesn't require the protein channels used in facilitated diffusion, energy as in active transport, or the bulk engulfing process of endocytosis.",
      {});
  }
]),["Oxygen is a small, nonpolar molecule that can cross the membrane directly without help, moving from high to low concentration."]);
E("bio-u2-67-q08",2,["6.7"],2,"var",varset([
  function(){
    return mcq("A freshwater protist is transferred to seawater. What will most likely happen?",
      "The cell will lose water and shrink",
      ["ATP production will stop immediately","The cell will gain water and swell","The cell will remain unchanged because osmosis only occurs in plants"],
      "The correct answer is that the cell will lose water and shrink . Seawater has a much higher solute concentration than the protist's cytoplasm, so by osmosis, water will move out of the cell toward the more concentrated seawater, causing the cell to shrink rather than swell, and osmosis affects animal-like cells too, not just plants.",
      {});
  }
]),["Seawater has a much higher solute concentration than the protist's cytoplasm. Which direction will water move via osmosis, into or out of the cell?"]);
E("bio-u2-67-q09",2,["6.7"],1,"var",varset([
  function(){
    return mcq("Which transport process requires a helper protein channel or carrier, but no cellular energy is required?",
      "Facilitated diffusion",
      ["Active transport","Endocytosis","Simple diffusion"],
      "The correct answer is facilitated diffusion , which moves substances down their concentration gradient (like simple diffusion, requiring no ATP) but needs a protein channel or carrier because the molecule can't cross the membrane unaided. Active transport requires energy, endocytosis involves engulfing material in vesicles, and simple diffusion doesn't need a helper protein at all.",
      {});
  }
]),["This process moves substances down their concentration gradient (like simple diffusion) but needs a protein helper because the molecule can't cross the membrane directly."]);
E("bio-u2-67-q10",2,["6.7"],3,"var",varset([
  function(){
    return mcq("Two cells contain equal concentrations of glucose. Cell A actively transports glucose while Cell B uses facilitated diffusion. Which conclusion is most reasonable?",
      "Cell A must be moving glucose against its concentration gradient.",
      ["Cell A does not require ATP.","Cell B is transporting glucose against its concentration gradient.","Cell B requires more energy than Cell A."],
      "The correct answer is that Cell A must be moving glucose against its concentration gradient . Active transport, by definition, moves substances against their gradient and therefore requires ATP, Cell A does require ATP (not the opposite), Cell B (facilitated diffusion) moves glucose with the gradient rather than against it, and Cell B requires less energy than Cell A, not more.",
      {});
  }
]),["Active transport is defined by moving a substance AGAINST its concentration gradient, which is the one process that requires ATP among these options."]);
E("bio-u2-67-q11",2,["6.7"],2,"var",varset([
  function(){
    return mcq("A plant cell and an animal cell are placed in the same hypertonic solution. After one hour, both cells lose water. Which observation would most likely distinguish the plant cell from the animal cell?",
      "The plant cell maintains its overall shape because of its cell wall.",
      ["The plant cell becomes turgid.","The plant cell undergoes plasmolysis.","The plant cell bursts."],
      "The correct answer is that the plant cell maintains its overall shape because of its cell wall . Even though both cells lose water in a hypertonic solution, the rigid cell wall keeps the plant cell's overall shape intact (a state called plasmolysis, where the membrane pulls away from the wall): it would not become turgid (that happens in a hypotonic solution) or burst, since plant cell walls specifically prevent bursting.",
      {});
  }
]),["Both cells lose water, but only one has a rigid outer structure that prevents it from changing its overall shape/collapsing completely."]);
E("bio-u2-67-q12",2,["6.7"],2,"var",varset([
  function(){
    return mcq("What would happen to a human red blood cell when it is placed in a highly concentrated salt solution?",
      "It shrinks",
      ["It bursts","It divides","It swells"],
      "The correct answer is that it shrinks . A highly concentrated salt solution is hypertonic relative to the cell's interior, so water moves out of the cell by osmosis, causing it to shrink rather than burst, divide, or swell.",
      {});
  }
]),["A highly concentrated salt solution is hypertonic relative to the cell's interior. Which direction does water move via osmosis in that case?"]);
E("bio-u2-67-q13",2,["6.7"],1,"var",varset([
  function(){
    return mcq("What type of solution has a lower solute concentration compared to the inside of a cell?",
      "Hypotonic",
      ["Hypertonic","Isotonic","Mesotonic"],
      "The correct answer is hypotonic . The prefix 'hypo-' means below or less than, matching a solution with lower solute concentration than the cell, hypertonic describes the opposite (higher concentration), isotonic describes equal concentration, and 'mesotonic' isn't a real term used to describe tonicity.",
      {});
  }
]),["Break down the prefix: 'hypo-' generally means below/under/less than."]);
E("bio-u2-67-q14",2,["6.7"],2,"var",varset([
  function(){
    return mcq("A researcher notices that an animal cell bursts when placed in Solution X, but a plant cell placed in Solution X remains intact. What best explains this difference?",
      "Plant cells have a rigid cell wall",
      ["Animal cells actively pump water inside","Plant cells have a higher solute concentration","Plant cells close their transport proteins"],
      "The correct answer is that plant cells have a rigid cell wall . If Solution X is hypotonic, water rushes into both cells, but the plant cell's rigid wall resists the pressure and prevents bursting (the animal cell has no such wall), animal cells don't actively pump water inside, and a higher solute concentration or closed transport proteins wouldn't explain this specific structural difference.",
      {});
  }
]),["If Solution X is causing cells to swell with water (hypotonic), what structural feature would prevent a plant cell from bursting the way an animal cell does?"]);

/* ---------- 6.8 Aerobic Respiration & Photosynthesis ---------- */
E("bio-u2-68-q01",2,["6.8"],2,"var",varset([
  function(){
    var q=mcq("The membrane in this U-shaped flask is only permeable to water. After several hours, what physical change will be observed in the U-tube setup?",
      "Fluid level rises on Side A",
      ["Fluid level rises on Side B","Sucrose moves to Side A","Sucrose moves to Side B"],
      "The correct answer is that fluid level rises on Side A . Side A has the higher sucrose concentration (10%) compared to Side B (5%), so water moves by osmosis toward the more concentrated side, raising the fluid level on Side A, sucrose itself cannot cross the membrane (it's only permeable to water), so neither side gains sucrose.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u2-68-q01.png" alt="Diagram of a U-shaped tube divided at the bottom centre by a semipermeable membrane: the left side holds a 10% sucrose solution and the right side holds a 5% sucrose solution, with the liquid at the same level on both sides" style="max-width:100%;height:auto">';
    return q;
  }
]),["Water moves toward the side with higher solute concentration. Compare the two sucrose percentages to determine which side gains fluid."]);
E("bio-u2-68-q02",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Which process requires the presence of oxygen to proceed?",
      "Aerobic respiration",
      ["Alcohol fermentation","Glycolysis","Lactic acid fermentation"],
      "The correct answer is aerobic respiration , which by definition requires oxygen as the final electron acceptor in the process. Glycolysis itself doesn't require oxygen, and alcohol and lactic acid fermentation are both anaerobic pathways that occur specifically in the absence of oxygen.",
      {});
  }
]),["This is the most efficient energy-releasing process, but it has one specific requirement in its name."]);
E("bio-u2-68-q03",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Where in a eukaryotic cell does the citric acid (Krebs) cycle take place?",
      "Mitochondrion",
      ["Cytoplasm","Lysosome","Ribosome"],
      "The correct answer is mitochondrion , the organelle where the Krebs cycle, the second major stage of aerobic respiration, occurs. The cytoplasm is where glycolysis (the first stage) happens, and lysosomes and ribosomes are not involved in this part of cellular respiration.",
      {});
  }
]),["This cycle is the second major stage of aerobic respiration and occurs inside a specific double-membraned organelle."]);
E("bio-u2-68-q04",2,["6.8"],2,"var",varset([
  function(){
    return mcq("Students sealed a plant in a dark glass jar and monitored the gas levels over 24 hours. They observed a steady decrease in oxygen and a sharp increase in carbon dioxide. What is the best interpretation of this data?",
      "The plant is performing aerobic respiration only",
      ["The plant is dead and decomposing","The plant is performing anaerobic respiration only","The plant is performing photosynthesis only."],
      "The correct answer is that the plant is performing aerobic respiration only . Without light, photosynthesis cannot occur, but the plant is still alive and respiring, consuming oxygen and releasing carbon dioxide, this rules out the plant being dead/decomposing, performing anaerobic respiration (plants default to aerobic respiration when oxygen is available), or performing photosynthesis (which requires light).",
      {});
  }
]),["Without light, photosynthesis can't occur, but the plant is still alive. Which process, requiring oxygen and producing carbon dioxide, would continue regardless of light?"]);
E("bio-u2-68-q05",2,["6.8"],2,"var",varset([
  function(){
    return mcq("A toxin blocks the electron transport chain in a cell. Which outcome would most likely occur?",
      "ATP production would decrease dramatically",
      ["Carbon dioxide production would immediately increase","Glycolysis would stop completely","Oxygen production would increase"],
      "The correct answer is that ATP production would decrease dramatically , since the electron transport chain generates the vast majority of ATP during aerobic respiration. Blocking it would not directly cause an immediate increase in carbon dioxide production, stop glycolysis (which occurs earlier and independently in the cytoplasm), or increase oxygen production (cells don't produce oxygen through respiration).",
      {});
  }
]),["The electron transport chain produces the vast majority of ATP in aerobic respiration. Blocking it has a direct effect on overall ATP output."]);
E("bio-u2-68-q06",2,["6.8"],2,"var",varset([
  function(){
    return mcq("During a sprint, a runner's breathing rate cannot meet the immediate oxygen demands of their muscles. What immediate change occurs inside these muscle cells?",
      "Pyruvate is converted into lactate.",
      ["Acetyl-CoA accumulates rapidly","NAD+ is completely exhausted","Oxygen acts as the final electron acceptor"],
      "The correct answer is that pyruvate is converted into lactate . When oxygen is insufficient, muscle cells shift to lactic acid fermentation, converting pyruvate into lactate to regenerate NAD+ and keep glycolysis running, acetyl-CoA would not accumulate (it requires oxygen to be produced via the Krebs cycle), NAD+ is regenerated (not exhausted) during fermentation, and oxygen cannot act as the final electron acceptor if it's in short supply.",
      {});
  }
]),["When oxygen is insufficient, cells shift to an anaerobic pathway. What molecule does pyruvate get converted into under those low-oxygen conditions in muscle cells?"]);
E("bio-u2-68-q07",2,["6.8"],2,"var",varset([
  function(){
    return mcq("If a metabolic toxin completely blocks the function of ATP synthase, which process is directly prevented?",
      "Oxidative phosphorylation",
      ["Carbon dioxide release","Electron transport","Glycolysis"],
      "The correct answer is oxidative phosphorylation , the specific process where ATP synthase uses the hydrogen ion gradient (built by the electron transport chain) to produce ATP. Carbon dioxide release happens earlier (in the Krebs cycle), electron transport itself is a separate step from ATP synthase's action, and glycolysis occurs independently in the cytoplasm.",
      {});
  }
]),["ATP synthase is the enzyme responsible for the final step of making ATP using the hydrogen ion gradient built by the electron transport chain."]);
E("bio-u2-68-q08",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Where do the light-dependent reactions occur within the chloroplast?",
      "Thylakoids",
      ["Cristae","Cytoplasm","Stroma"],
      "The correct answer is thylakoids , the membrane structures stacked inside the chloroplast that are specifically arranged to maximize light absorption for these reactions. Cristae are folds found in mitochondria (not chloroplasts), the cytoplasm is outside the chloroplast entirely, and the stroma is where the Calvin cycle (not the light-dependent reactions) takes place.",
      {});
  }
]),["These reactions need direct access to light, so they occur on the membrane structures that are stacked to maximize light absorption."]);
E("bio-u2-68-q09",2,["6.8"],1,"var",varset([
  function(){
    return mcq("What role do ATP and NADPH play in the Calvin cycle?",
      "They provide energy and electrons",
      ["They absorb sunlight and electrons","They release oxygen gas","They split water molecules"],
      "The correct answer is that they provide energy and electrons . ATP and NADPH were generated during the light-dependent reactions specifically to be 'spent' as energy and electron sources to power the Calvin cycle's sugar-building reactions: they don't absorb sunlight themselves, release oxygen (that happens during the light-dependent reactions), or split water molecules (also a light-dependent reaction step).",
      {});
  }
]),["ATP and NADPH were produced during the light-dependent reactions specifically to be 'spent' as inputs in the next stage, think about what they supply."]);
E("bio-u2-68-q10",2,["6.8"],2,"var",varset([
  function(){
    return mcq("Which molecule is a reactant in aerobic respiration but is a product in photosynthesis?",
      "Glucose",
      ["Carbon dioxide","NADPH","Water"],
      "The correct answer is glucose . Aerobic respiration uses glucose and oxygen as the reactants in its reaction; photosynthesis does the reverse, using carbon dioxide, water and light energy to produce glucose, and oxygen - making glucose the molecule that switches roles between the two processes as described.",
      {});
  }
]),["Look at the reactants and products of both processes, they're nearly mirror images of each other for this particular molecule."]);
E("bio-u2-68-q11",2,["6.8"],2,"var",varset([
  function(){
    return mcq("A sealed ecosystem contains plants and animals. Which statement best explains how photosynthesis and aerobic respiration are complementary?",
      "Products of one process serve as reactants for the other",
      ["Both processes consume carbon dioxide and release oxygen","Both processes produce glucose as their main waste product","Respiration occurs only during the day while photosynthesis occurs only at night"],
      "The correct answer is that products of one process serve as reactants for the other . Photosynthesis produces glucose and oxygen, which are exactly the reactants aerobic respiration needs, while respiration produces carbon dioxide and water, which photosynthesis needs in return, the two processes don't both consume carbon dioxide and release oxygen, don't both produce glucose as waste, and aren't strictly limited to day versus night.",
      {});
  }
]),["Compare the reactants and products of both processes side by side, what does one process need that the other one happens to produce?"]);

/* ----- bank-u3.js ----- */
// Biology 2201 Unit 3 bank: Maintaining Dynamic Equilibrium.
// All 206 selected-response questions from the five Unit 3 review books
// (Homeostasis and Plant Systems 27, Nervous System 38, Endocrine
// System 28, Circulatory, Immunity and Respiratory Systems 79,
// Digestive and Excretory Systems 34; Jason Counsel's H5P review
// books, CDLI), converted Nov 12, 2026 by convert2201.py from the
// extracted books. Stems, options and keys are the books', verbatim,
// under Jason's ruling that his review books replicate as-is. Each book
// Hint panel is the entry's hint and each Solution panel its worked
// solution; the books' Help panels (video pointers) have no slot in
// the app and are not carried. Indicator codes follow each chapter's
// declared numbers, verified against the Indicator panels, with one
// ruling applied: five respiratory questions on environmental factors
// (book questions 72, 73, 77, 78, 79 of the Circulatory book) also
// carry 7.10. Levels are the calibrated tags in bio2201-levels.json.
// House-style fixes, kept minimal: em dashes in the book text become
// commas, colons or periods; the Unit 3 solutions' book option-letter
// tags are removed (the content is always named first, and the letters
// would be wrong once the shell re-sorts options), and the seven
// solutions that walked through options by letter are rewritten to
// name the options' content; diagrams travel with their questions as
// figure images under banks/bio-2201/assets/.

/* ---------- 7.1 Homeostasis & Feedback Mechanisms ---------- */
E("bio-u3-71-q01",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which term describes a stable internal environment?",
      "Homeostasis",
      ["Metabolism","Osmoregulation","Synthesis"],
      "Homeostasis describes the maintenance of a stable internal environment. Metabolism refers to chemical reactions in the body. Osmoregulation is the specific regulation of water and solute balance. Synthesis means building molecules. Only homeostasis refers to overall internal stability.",
      {});
  }
]),["Think about what the body is constantly trying to do despite changes in the external environment, temperature, humidity, activity level. What do we call it when a system works to keep its internal conditions within a narrow, stable range?"]);
E("bio-u3-71-q02",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which type of feedback mechanism acts to reverse or counteract change from a set point?",
      "Negative feedback",
      ["Amplifying feedback","Positive feedback","Stimulatory feedback"],
      "Negative feedback acts to reverse or counteract a change, it opposes the deviation from the set point. Positive feedback amplifies change. 'Amplifying' and 'stimulatory' are not standard feedback types. Negative feedback is the primary mechanism maintaining homeostasis.",
      {});
  }
]),["Think about the two types of feedback mechanisms you have studied and what each one does to a change. One of them amplifies the change further, the other works to bring conditions back toward the original set point. Which one would be responsible for correcting a disruption?"]);
E("bio-u3-71-q03",3,["7.1"],2,"var",varset([
  function(){
    return mcq("After eating a large meal, blood glucose levels increase. Which response best demonstrates negative feedback?",
      "Insulin promotes glucose uptake by cells",
      ["Glucose stimulates additional glucose production","The pancreas stops monitoring glucose levels","White blood cells remove glucose from the blood"],
      "Insulin promotes glucose uptake by cells, reducing blood glucose back toward normal: negative feedback reversing the change. A response that released still more glucose would amplify the change (positive feedback); a response that removed the detector would break the loop; the remaining option is not how glucose is regulated.",
      {});
  }
]),["After a meal, blood glucose rises above normal. What would bring it back down, something that opposes the change, or something that adds to it?"]);
E("bio-u3-71-q04",3,["7.1"],1,"var",varset([
  function(){
    return mcq("In a homeostatic negative feedback loop, which component is responsible for detecting a change in the environment?",
      "Receptor",
      ["Control center","Effector","Stimulus"],
      "The receptor detects a change in the environment and sends that information to the control center. The control center processes the information and directs a response. The effector carries out the response. The stimulus is the change itself, not a component that detects it.",
      {});
  }
]),["In the feedback loop, which part must first notice that something has changed before anything else can happen?"]);
E("bio-u3-71-q05",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which of the following acts as the effector to lower body temperature?",
      "Sweat glands",
      ["Brain","Heat","Skin arterioles"],
      "Sweat glands act as effectors to lower body temperature by releasing sweat, which cools the skin through evaporation. The brain is the control center, not the effector. Heat is the stimulus. Skin arterioles dilate to release heat but are not the primary sweating effector.",
      {});
  }
]),["Think about the components of a feedback loop, the receptor detects the change, the control centre processes it, and the effector carries out the response. On a hot day, which structure in the skin actually carries out the cooling response?"]);
E("bio-u3-71-q06",3,["7.1"],1,"var",varset([
  function(){
    return mcq("During childbirth, oxytocin causes uterine contractions, which stimulate more oxytocin release. This loop is an example of which of the following?",
      "Positive feedback",
      ["Homeostatic breakdown","Negative feedback","Neutral regulation"],
      "Positive feedback, oxytocin causes contractions, which stimulate more oxytocin, which causes stronger contractions. The response amplifies rather than corrects. This is not negative feedback, which would stop contractions. It is not a breakdown: this is a normal process during childbirth.",
      {});
  }
]),["Each contraction triggers more oxytocin, which triggers more contractions. Is this pushing the system away from a set point, or back toward one?"]);
E("bio-u3-71-q07",3,["7.1"],2,"var",varset([
  function(){
    var q=mcq("Based on the diagram, what occurs if the effector fails to respond?",
      "The system continues to avoid homeostasis.",
      ["The control center shuts down.","The response increases exponentially","The system immediately achieves homeostasis."],
      "If the effector fails to respond, no corrective action is taken, the system continues to deviate from the set point and cannot achieve homeostasis. The control center does not shut down. The response cannot increase exponentially without an effector. Homeostasis is not immediately achieved.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-71-q07.png" alt="Flow diagram of a feedback loop: boxes in a row read Stimulus, Receptor, Control Center, Effector, Response, joined by arrows, with a return arrow running from Response back to Stimulus" style="max-width:100%;height:auto">';
    return q;
  }
]),["In the feedback loop, the effector produces the response that feeds back to the stimulus. If the effector does nothing, where does the loop break?"]);
E("bio-u3-71-q08",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which process is an example of positive feedback?",
      "Fruit ripening through ethylene production",
      ["Blood glucose regulation","Body temperature regulation","Water balance regulation"],
      "Fruit ripening through ethylene production is positive feedback, ripe fruit releases ethylene, which triggers more ripening in surrounding fruit, which releases more ethylene. Blood glucose regulation and body temperature regulation are classic negative feedback examples. Water balance is also negative feedback.",
      {});
  }
]),["Positive feedback amplifies a change rather than correcting it. Which of the options describes a self-amplifying process?"]);

/* ---------- 7.2 Plant Systems & Homeostasis ---------- */
E("bio-u3-72-q01",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which tissue is primarily responsible for plant growth through cell division?",
      "Meristematic tissue",
      ["Dermal tissue","Ground tissue","Vascular tissue"],
      "Meristematic tissue is the only plant tissue composed of actively dividing cells. Dermal tissue covers and protects. Ground tissue provides support and storage. Vascular tissue transports water and nutrients.",
      {});
  }
]),["Think about where new cells are produced in a plant. Which tissue type is specifically associated with active cell division and growth?"]);
E("bio-u3-72-q02",3,["7.2"],2,"var",varset([
  function(){
    return mcq("During a microscope lab, a student observes paired cells surrounding a pore on a leaf. Which structures are being viewed?",
      "Guard cells",
      ["Root hairs","Sieve tube cells","Xylem vessels"],
      "Guard cells are the paired cells that surround each stoma (pore) on the leaf surface. Root hairs are on roots. Sieve tube cells are phloem cells. Xylem vessels transport water.",
      {});
  }
]),["These cells are stationed on either side of the pore to protect the plant from losing too much water. If their job is to look after and defend that opening, what might we call them?"]);
E("bio-u3-72-q03",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which tissue transports water and dissolved minerals upward from the roots?",
      "Xylem",
      ["Guard cells","Phloem","Trichomes"],
      "Xylem transports water and dissolved minerals upward from the roots via transpiration pull. Phloem transports sugars made by photosynthesis. Guard cells control stomata. Trichomes are hair-like surface structures.",
      {});
  }
]),["There are two main vascular tissues. One moves water up; which direction does the other move sugar?"]);
E("bio-u3-72-q04",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A plant continues to absorb water from the soil but can no longer transport sugars from its leaves to its roots. Which tissue is most likely damaged?",
      "Phloem",
      ["Epidermis","Ground tissue","Xylem"],
      "Phloem carries sugars from leaves to the rest of the plant, including roots. Xylem carries water up, not sugars down. Epidermis covers the plant surface. Ground tissue provides support and storage.",
      {});
  }
]),["If sugar can't get from leaves to roots, which transport tissue handles dissolved sugars in a plant?"]);
E("bio-u3-72-q05",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A plant is unable to take up sufficient amounts of water. Which of the following is most likely affected?",
      "Root hairs",
      ["Cuticle","Epidermal cells","Meristem"],
      "Root hairs dramatically increase the surface area available for water and mineral absorption from the soil. The cuticle reduces water loss from leaves. Epidermal cells cover the root surface but root hairs extend from them. Meristem is for cell division, not absorption.",
      {});
  }
]),["Water enters the plant through root hairs. What happens to water absorption if those hairs are absent?"]);
E("bio-u3-72-q06",3,["7.2"],2,"var",varset([
  function(){
    var q=mcq("What is the specific structure indicated by the pointer in the image?",
      "Stoma",
      ["Cuticle","Epidermis","Meristem"],
      "The pointer in the image targets the stoma, the pore between the two guard cells that allows gas exchange. The cuticle is the waxy outer layer. Epidermis is the outer cell layer. Meristem is a growth tissue not visible in this leaf cross-section.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-72-q06.png" alt="Diagram titled Cross-section of a Leaf, with a magnified inset of a small patch of the leaf’s lower surface; a large red arrow points to the narrow opening between two bean-shaped cells in the inset" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at where the pointer is directed on the leaf surface. Think about the structures on a leaf that open and close to allow gases to move in and out. What is the name of that opening?"]);
E("bio-u3-72-q07",3,["7.2"],2,"var",varset([
  function(){
    return mcq("What force drives the continuous upward movement of water through a plant during transpiration?",
      "Evaporation of water from leaves",
      ["Active transport by root cells","Gravitational pull on the stem","High pressure within the phloem"],
      "Evaporation of water from leaves creates a negative pressure (tension) that pulls water upward through the xylem: this is the transpiration-cohesion-tension mechanism. Active transport plays a role in root uptake but does not power the upward movement through the entire plant. Gravity would pull water down, not up. Phloem pressure drives sugar transport, not water.",
      {});
  }
]),["Water moves up through xylem by transpiration-pull. What creates the 'pull' at the top of the plant?"]);
E("bio-u3-72-q08",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A biologist coats the underside of a plant's leaves with a thick waxy coating. What is the most immediate consequence for the plant?",
      "Decreased water loss",
      ["Increased mineral uptake","Rapid root elongation","Accelerated sugar transport"],
      "Stomata on the underside of leaves are the primary sites of gas exchange and water vapour loss. Blocking them with wax reduces water loss from the leaf. This would not increase mineral uptake, cause root elongation, or accelerate sugar transport.",
      {});
  }
]),["Stomata are found on the underside of leaves and allow gas exchange, including water vapour loss. If those openings are blocked, what happens to water loss?"]);
E("bio-u3-72-q09",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which plant hormone is primarily responsible for promoting fruit ripening?",
      "Ethylene",
      ["Auxin","Cytokinin","Gibberellin"],
      "Ethylene is the plant hormone responsible for fruit ripening. Auxin promotes cell elongation and phototropism. Cytokinin promotes cell division. Gibberellin stimulates stem elongation and seed germination.",
      {});
  }
]),["Think about the plant hormones you have studied and the unique physical state of one of them, it behaves differently from the others in how it is produced and how it travels. Consider which hormone is associated with what happens to fruit as it matures on the plant."]);
E("bio-u3-72-q10",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A plant is placed next to a window and begins to bend toward the sunlight. Which mechanism explains this movement?",
      "Auxin elongates cells on the shaded side",
      ["Auxin breaks down on the sunny side","Cytokinin stops growth near the window","Gibberellin shrinks cells on the shaded side"],
      "Auxin migrates away from light, accumulating on the shaded side. Auxin causes cells to elongate, so cells on the shaded side grow longer than those on the sunny side, causing the plant to bend toward the light. Auxin does not break down on the sunny side. Cytokinin does not stop growth. Gibberellin does not shrink cells.",
      {});
  }
]),["Auxin migrates away from direct light. On which side of the stem does auxin accumulate, causing those cells to grow longer?"]);
E("bio-u3-72-q11",3,["7.2"],2,"var",varset([
  function(){
    var q=mcq("Based on the graph, what is the most accurate conclusion regarding this hormone's effect on plant growth?",
      "Moderate concentrations always optimize growth.",
      ["Higher concentrations always optimize growth","It acts exclusively as a growth inhibitor","It stimulates growth only at high levels"],
      "The graph shows the growth rate peaking at moderate concentrations and declining at higher levels, so the accurate conclusion is that moderate concentrations optimize growth. Very high concentrations inhibit growth rather than promoting it, while low-to-moderate concentrations stimulate it.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-72-q11.png" alt="Graph of stem elongation rate against hormone concentration: the curve rises from its starting level to a peak at moderate concentrations, then falls, dropping below the starting level at the highest concentrations" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the shape of the curve on the graph. Notice what happens to growth as concentration increases from low to high. Does the relationship stay consistent across all concentrations, or does growth respond differently at different points along the curve?"]);
E("bio-u3-72-q12",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Placing a ripe banana in a paper bag with an unripe avocado accelerates the avocado's ripening. Which type of mechanism causes this?",
      "Positive feedback",
      ["Amplifying feedback","Negative feedback","Stimulatory feedback"],
      "Positive feedback, ethylene from the ripe banana triggers ripening in the avocado, which will release more ethylene, accelerating ripening of both fruits. This is a self-amplifying chain reaction, not negative feedback, which would stop the ripening. 'Amplifying' and 'stimulatory' are not standard biological feedback terms.",
      {});
  }
]),["Ethylene is a gas released by ripening fruit. When a ripe banana releases ethylene into a closed bag, does it speed up or slow down ripening of the avocado?"]);
E("bio-u3-72-q13",3,["7.2"],2,"var",varset([
  function(){
    return mcq("Two identical plants are grown under identical conditions. Plant A loses its root hairs while Plant B remains unchanged. Which prediction is most reasonable?",
      "Plant A will absorb less water and minerals than Plant B",
      ["Plant A will transport sugars more efficiently","Plant A will have greater transpiration rates","Plant A will produce more guard cells"],
      "Root hairs massively increase the surface area for absorbing water and minerals. Plant A without root hairs will absorb significantly less of both. Sugar transport uses phloem, which is unaffected. Transpiration is driven by stomata, not root hairs. Guard cells are not related to root function.",
      {});
  }
]),["Root hairs dramatically increase the surface area available for water and mineral absorption. What would losing them do to a plant's ability to absorb these resources?"]);
E("bio-u3-72-q14",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A plant is exposed to dry, windy conditions for several days. Which adaptation would most directly help maintain homeostasis?",
      "Development of a thicker cuticle",
      ["Increased stomatal opening","Increased transpiration rate","Increased ethylene production"],
      "A thicker cuticle is a waxy layer that reduces water loss from the leaf surface, a direct adaptation to dry, windy conditions that cause high evaporation. Increasing stomatal opening would increase water loss. Increasing transpiration would also increase water loss. Ethylene is involved in fruit ripening, not water conservation.",
      {});
  }
]),["Think about the leaf surface and which layer is the plant's first line of defence against water loss to the environment. What would happen to that water loss if that layer became thicker or more developed?"]);
E("bio-u3-72-q15",3,["7.2"],1,"var",varset([
  function(){
    var q=mcq("Which hormone is directly involved in changing the colour of the banana?",
      "Ethylene",
      ["Abscisic acid","Auxin","Cytokinin"],
      "Ethylene is the gaseous hormone responsible for fruit ripening, including the colour change from green to yellow in bananas. Abscisic acid promotes dormancy and stress responses. Auxin controls growth direction. Cytokinin promotes cell division.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-72-q15.png" alt="Photograph of a ripe yellow banana with brown speckles lying on a wooden table" style="max-width:100%;height:auto">';
    return q;
  }
]),["Bananas change colour as they ripen. Which hormone promotes the ripening process in fruit?"]);

/* ---------- 7.3 Tropisms & Homeostasis ---------- */
E("bio-u3-73-q01",3,["7.3"],3,"var",varset([
  function(){
    return mcq("A researcher chemically blocks auxin transport on only the right side of a vertically growing stem while keeping the plant in overhead light. What will be the observed result?",
      "The stem will bend to the right",
      ["The stem will bend to the left","The stem will stop growing entirely","The stem will continue growing straight up."],
      "If auxin is blocked on the right side, only the left side elongates normally. The right side grows shorter, causing the stem to bend to the right. Bending left would require the left side to be blocked. The stem would not stop growing entirely or remain straight.",
      {});
  }
]),["Auxin transport is blocked on one side, so only the other side elongates. If the right side can't elongate but the left side can, which way does the stem curve?"]);
E("bio-u3-73-q02",3,["7.3"],2,"var",varset([
  function(){
    return mcq("How does phototropism help maintain homeostasis?",
      "It increases access to light for photosynthesis",
      ["It increases fruit production directly","It increases mineral absorption by roots","It reduces transpiration"],
      "Phototropism bends plants toward light, maximizing light capture for photosynthesis. Greater photosynthesis means more glucose and energy production, maintaining the plant's homeostasis. It does not directly increase fruit production, mineral absorption, or reduce transpiration.",
      {});
  }
]),["Phototropism moves the plant toward light. What does a plant need light for, and how does getting more of it help the plant stay alive?"]);
E("bio-u3-73-q03",3,["7.3"],2,"var",varset([
  function(){
    var q=mcq("What accounts for the pattern of growth observed in the trees on the side of the embankment?",
      "Gravitropism",
      ["Hydrotropism","Phototropism","Thigmotropism"],
      "The trees are growing on a slope but their trunks curve upward, away from the slope, responding to gravity (gravitropism, A). Roots grow toward gravity (positive gravitropism); stems grow against it (negative gravitropism). Hydrotropism is response to water. Phototropism would make them grow toward light, which could also explain upward growth but gravitropism is the primary explanation here. Thigmotropism is response to touch.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-73-q03.png" alt="Photograph of young conifer trees growing on a steep rocky slope: each trunk emerges nearly horizontally from the slope, then curves upward so the top of the tree grows vertically" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the image of the trees on the embankment. Their trunks curve upward despite growing on a slope. Which stimulus are they responding to?"]);
E("bio-u3-73-q04",3,["7.3"],2,"var",varset([
  function(){
    var q=mcq("Which tropism is being demonstrated by the vine in the image?",
      "Thigmotropism",
      ["Geotropism","Hydrotropism","Phototropism"],
      "The vine is wrapping around the post in response to physical contact: this is thigmotropism, the growth response to touch. Geotropism/gravitropism is response to gravity. Hydrotropism is response to water. Phototropism is response to light.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-73-q04.png" alt="Photograph of a climbing vine whose thin curling stems wrap tightly around a wooden fence post" style="max-width:100%;height:auto">';
    return q;
  }
]),["The vine is wrapping around a solid structure in response to touch. Which tropism involves a response to physical contact?"]);

/* ---------- 7.4 The Human Nervous System ---------- */
E("bio-u3-74-q01",3,["7.4"],2,"var",varset([
  function(){
    return mcq("Why is the nervous system critical for maintaining homeostasis?",
      "It detects changes and coordinates rapid responses to maintain internal balance",
      ["It produces all hormones required for body regulation","It replaces damaged cells throughout the body","It controls only voluntary movement of skeletal muscles"],
      "The nervous system rapidly detects internal and external changes and coordinates fast responses to bring the body back to its set point. It does not produce all hormones, the endocrine system does that. It does not replace damaged cells. It controls both voluntary and involuntary functions, not only voluntary movement.",
      {});
  }
]),["Think about what homeostasis actually requires, what does the body need to do first before it can correct any internal imbalance?"]);
E("bio-u3-74-q02",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which structure is part of the central nervous system?",
      "Spinal cord",
      ["Heart","Skin","Thyroid gland"],
      "The spinal cord is part of the central nervous system (CNS) along with the brain. The heart and skin are peripheral organs. The thyroid gland is part of the endocrine system.",
      {});
  }
]),["The CNS consists of two main structures. One is the brain, what is the other?"]);
E("bio-u3-74-q03",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which division of the nervous system is composed of the brain and the spinal cord?",
      "Central nervous system",
      ["Autonomic nervous system","Peripheral nervous system","Somatic nervous system"],
      "The central nervous system consists of the brain and spinal cord. The autonomic nervous system and somatic nervous system are divisions of the peripheral nervous system. The peripheral nervous system includes all nerves outside the brain and spinal cord.",
      {});
  }
]),["The nervous system has a central division and a peripheral division. Which one includes only the brain and spinal cord?"]);
E("bio-u3-74-q04",3,["7.4"],1,"var",varset([
  function(){
    return mcq("What is the primary role of the myelin sheath?",
      "Insulating axons to speed up nerve impulses",
      ["Increasing neurotransmitter production","Protecting dendrites from physical damage","Regulating blood flow to the brain"],
      "The myelin sheath insulates the axon and speeds up nerve impulse conduction by allowing saltatory conduction. It does not produce neurotransmitters, protect dendrites, or regulate blood flow.",
      {});
  }
]),["The myelin sheath is a fatty covering on axons. Think about how insulation affects the speed of electrical conduction."]);
E("bio-u3-74-q05",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A person accidentally touches a hot stove and immediately pulls their hand away before consciously feeling pain. Which explanation best describes why this response occurs?",
      "The reflex arc allows a rapid response without initial brain involvement",
      ["The brain processes the information before the spinal cord responds","The endocrine system releases hormones that contract the muscles","The motor neurons detect the heat stimulus directly"],
      "A reflex arc allows rapid response through the spinal cord without initially involving the brain. The brain processes the signal after the reflex has already occurred, not before. The endocrine system is too slow for this response. Motor neurons detect movement response, not the heat stimulus.",
      {});
  }
]),["Consider what would happen if every signal had to travel all the way to the brain before a response could happen. Why might that be a problem in a dangerous situation?"]);
E("bio-u3-74-q06",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A student is asked to organize structures involved in the nervous system from simplest organization to most complex. Which sequence is correct?",
      "Neurons \u2192 nervous system \u2192 spinal cord and brain",
      ["Brain \u2192 spinal cord \u2192 neurons \u2192 nervous system","Nervous system \u2192 neurons \u2192 spinal cord \u2192 brain","Spinal cord \u2192 neurons \u2192 nervous system \u2192 brain"],
      "The sequence runs from the individual neuron, the base unit, up through the nervous system to the spinal cord and brain as the most complex structures listed. The other sequences start from the complex end or skip the neuron as the base unit.",
      {});
  }
]),["Organize from individual cell \u2192 organ \u2192 organ system. Which of the options follows that progression correctly?"]);
E("bio-u3-74-q07",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which specific branch of the nervous system is responsible for activating the \"fight-or-flight\" response during stress?",
      "Sympathetic nervous system",
      ["Central nervous system","Parasympathetic nervous system","Somatic nervous system"],
      "The sympathetic nervous system activates the fight-or-flight response, increasing heart rate, dilating pupils, redirecting blood to muscles. The parasympathetic system is the rest-and-digest system. The central nervous system includes the brain and spinal cord. The somatic system controls voluntary movements.",
      {});
  }
]),["Fight-or-flight is an emergency response, increased heart rate, dilated pupils, reduced digestion. Which nervous system division activates these changes?"]);
E("bio-u3-74-q08",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A person accidentally touches a hot stove and quickly moves their hand before feeling pain. Which is the correct reflex arc?",
      "Receptor \u2192 Sensory neuron \u2192 Interneuron \u2192 Motor neuron \u2192 Effector",
      ["Effector \u2192 Sensory neuron \u2192 Interneuron \u2192 Motor neuron \u2192 Receptor","Receptor \u2192 Spinal cord \u2192 Brain \u2192 Motor neuron","Sensory neuron \u2192 Brain \u2192 Motor neuron \u2192 Muscles"],
      "The reflex arc runs: Receptor, then Sensory neuron, then Interneuron, then Motor neuron, then Effector. One sequence reverses that order; another routes the signal to the brain instead of through the spinal cord; another omits the receptor entirely.",
      {});
  }
]),["In a reflex arc, the signal travels from the point of detection, through the spinal cord, and out to a muscle. What is the correct order of neuron types?"]);
E("bio-u3-74-q09",3,["7.4"],2,"var",varset([
  function(){
    return mcq("If a patient suffers a localized injury that damages the motor neurons leading to the leg, what will be the most likely clinical outcome?",
      "Loss of motor control with preservation of sensation",
      ["Loss of all sensation and loss of all movement","Preservation of both motor control and sensation","Preservation of motor control with loss of sensation."],
      "Motor neurons carry signals from the CNS to muscles. If only motor neurons are damaged, the patient cannot move the leg but can still feel sensations. Loss of both sensation and movement would require damage to both sensory and motor neurons. Preservation of both would require no damage. Loss of sensation requires sensory neuron damage.",
      {});
  }
]),["Motor neurons control movement; sensory neurons carry information about sensations. If only motor neurons are damaged, which function is lost?"]);
E("bio-u3-74-q10",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which structure is responsible for receiving incoming chemical signals from other neurons?",
      "Dendrites",
      ["Axon terminals","Nodes of Ranvier","Schwann cells"],
      "Dendrites receive incoming chemical signals (neurotransmitters) from other neurons and convert them into electrical signals. Axon terminals release neurotransmitters to the next neuron. Nodes of Ranvier are gaps in the myelin sheath that speed conduction. Schwann cells produce myelin.",
      {});
  }
]),["The signal arrives at a neuron through one structure and leaves through another. Which part of the neuron receives incoming signals?"]);
E("bio-u3-74-q11",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A patient has damage to sensory neurons in their foot. Which effect would most likely occur?",
      "They would be unable to detect stimuli from the foot",
      ["They would be unable to contract any muscles","They would experience increased reflex responses","They would produce fewer neurotransmitters"],
      "Sensory neurons carry information about stimuli (touch, pain, temperature) from the body to the CNS. If damaged in the foot, the patient cannot detect stimuli from that foot. Motor neuron damage prevents muscle contraction. Reflex responses would decrease, not increase. Neurotransmitter production is in the neuron cell bodies, not sensory neurons specifically.",
      {});
  }
]),["Sensory neurons carry information from the body to the CNS. If these are damaged in the foot, what kind of information can no longer reach the brain?"]);
E("bio-u3-74-q12",3,["7.4"],2,"var",varset([
  function(){
    return mcq("During a reflex test, a physician taps below a patient's kneecap and observes the lower leg moving upward. Which structure was responsible for coordinating this rapid response?",
      "Spinal cord",
      ["Cerebrum","Hypothalamus","Thalamus"],
      "The knee-jerk reflex (patellar reflex) is coordinated in the spinal cord, not the brain. The cerebrum handles conscious thought. The hypothalamus regulates homeostatic functions. The thalamus relays sensory signals to the cortex.",
      {});
  }
]),["Think about where reflex arcs are processed in the nervous system. Does every rapid muscular response require the brain to get involved?"]);
E("bio-u3-74-q13",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A neuron is damaged so that signals cannot travel efficiently along the axon. Which structure is most likely affected?",
      "Myelin sheath",
      ["Axon terminals","Dendrites","Cell body"],
      "The myelin sheath insulates the axon and speeds up transmission. If it is damaged, signals travel slowly or are disrupted along the axon. Axon terminals release neurotransmitters at the synapse. Dendrites receive signals. The cell body maintains the neuron but does not directly conduct the signal along the axon.",
      {});
  }
]),["Think about what determines the speed and reliability of electrical signal transmission along a neuron. What structure surrounding the axon plays a role in that?"]);
E("bio-u3-74-q14",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A scientist removes the myelin sheath from a neuron. What effect would most likely occur?",
      "Impulse transmission would become slower",
      ["Neurotransmitters would no longer be produced","The neuron would no longer use dendrites","The neuron would permanently remain polarized"],
      "Without the myelin sheath, saltatory conduction cannot occur, so impulse transmission becomes slower. Neurotransmitters are produced in the cell body and released at axon terminals, myelin removal doesn't stop this. Dendrites still function. The neuron can still depolarize and repolarize; it wouldn't permanently remain polarized.",
      {});
  }
]),["Consider the role myelin plays in how quickly a nerve impulse travels. What would you expect to change if that function were removed?"]);
E("bio-u3-74-q15",3,["7.4"],1,"var",varset([
  function(){
    var q=mcq("Which structure contains neurotransmitters that are secreted to the postsynaptic neuron?",
      "D",
      ["A","B","C"],
      "Structure D points to the axon terminals, the branched endings at the far end of the axon. This is where vesicles containing neurotransmitters are located and where they are released into the synapse. Structure A is the dendrites. B is the cell body. C is the axon (with myelin sheath).",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-74-q15.png" alt="Diagram of a neuron with four labels: A points to one of the branching fibres spreading from the round body on the left; B points to the round body itself; C points to a narrow gap between segments of the long fibre running to the right; D points to the knobbed endings where that fibre branches at the far right" style="max-width:100%;height:auto">';
    return q;
  }
]),["Recall how a nerve impulse crosses from one neuron to the next. Where exactly are the chemical messengers stored before they are released into the synapse?"]);
E("bio-u3-74-q16",3,["7.4"],1,"var",varset([
  function(){
    return mcq("What is the normal ion distribution outside the neural membrane when a neuron is at rest?",
      "Low K\u207a concentration; High Na\u207a concentration",
      ["High K\u207a concentration; High Na\u207a concentration","High K\u207a concentration; Low Na\u207a concentration","Low K\u207a concentration; Low Na\u207a concentration"],
      "At rest, the outside of the membrane has LOW K\u207a and HIGH Na\u207a concentration. K\u207a is more concentrated inside the cell. Na\u207a is more concentrated outside. This creates the resting membrane potential of approximately \u221270 mV.",
      {});
  }
]),["At rest, the outside of a neuron is positive. Sodium ions (Na\u207a) are more concentrated outside. What about potassium (K\u207a)?"]);
E("bio-u3-74-q17",3,["7.4"],2,"var",varset([
  function(){
    var q=mcq("A neurotransmitter causes the membrane potential shown in the graph. What is the most likely outcome for the neuron?",
      "No action potential will be generated because the depolarization does not reach threshold potential.",
      ["An action potential will be generated because the membrane reaches +40 mV.","An action potential will be generated because the membrane reaches threshold potential.","No action potential will be generated because the neuron becomes hyperpolarized."],
      "Looking at the graph, the membrane potential rises slightly from \u221270 mV but does not reach the threshold (approximately \u221255 mV). No action potential is generated because the threshold was not reached. It does not reach +40 mV. It does not reach threshold. The neuron does not become hyperpolarized in this graph.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-74-q17.png" alt="Graph of membrane potential (mV) over time: the signal rests at -70 mV (resting membrane potential), rises in a small bump to about -55 mV, staying below the dashed threshold potential line, then returns to resting" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the graph, the membrane potential rises but never crosses the dashed threshold line. What is required for an action potential to fire?"]);
E("bio-u3-74-q18",3,["7.4"],3,"var",varset([
  function(){
    var q=mcq("A drug lowers the threshold potential from \u221255 mV to \u221260 mV. Based on the graph, what effect would this change most likely have?",
      "The neuron would generate an action potential from the same stimulus.",
      ["The neuron would be less likely to generate an action potential.","The resting membrane potential would become more negative.","The depolarization would become a hyperpolarization."],
      "Lowering the threshold from \u221255 mV to \u221260 mV makes it easier to reach, the same stimulus that previously produced a sub-threshold depolarization now crosses the threshold, generating an action potential. A lower (more negative) threshold is easier to reach, not harder. The resting potential is set by ion channels, not the threshold. Hyperpolarization would not result.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-74-q18.png" alt="Graph of membrane potential (mV) over time: the signal rests at -70 mV (resting membrane potential), rises in a small bump to about -55 mV, staying below the dashed threshold potential line, then returns to resting" style="max-width:100%;height:auto">';
    return q;
  }
]),["If the threshold is lowered (made less negative), is it now easier or harder for a depolarization to reach it?"]);
E("bio-u3-74-q19",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A medication prevents neurotransmitters from being released into the synapse. Which outcome would most likely occur?",
      "Communication between neurons would be disrupted",
      ["Sensory receptors would stop detecting stimuli","The axon would produce more myelin","The neuron would no longer have a resting potential"],
      "Neurotransmitters are the chemical signal that crosses the synapse to the next neuron. If they cannot be released, communication between neurons is disrupted. Sensory receptors operate independently of synaptic release. The axon produces myelin through Schwann cells, not in response to synaptic blockage. The resting potential is maintained by ion pumps, not neurotransmitter release.",
      {});
  }
]),["Neurotransmitters carry the signal across the synapse. If they can't be released, what happens to the signal between neurons?"]);
E("bio-u3-74-q20",3,["7.4"],1,"var",varset([
  function(){
    return mcq("During an action potential, a neuron changes from a negative internal state to a more positive state. Which process is occurring?",
      "Depolarization",
      ["Polarization","Repolarization","Resting membrane potential"],
      "Depolarization is the process where the inside of the neuron becomes more positive (from \u221270 mV toward +40 mV) as Na\u207a rushes in. Polarization refers to the resting state. Repolarization is when the neuron returns to resting potential. Resting membrane potential is the stable \u221270 mV state between action potentials.",
      {});
  }
]),["During an action potential, the inside of the neuron goes from negative to positive. What is the name of this phase?"]);
E("bio-u3-74-q21",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which neurotransmitter is most directly associated with the regulation of mood, sleep cycles, and appetite?",
      "Serotonin",
      ["Acetylcholine","Cholinesterase","Norepinephrine"],
      "Serotonin regulates mood, sleep cycles, and appetite. Low serotonin is associated with depression. Acetylcholine is involved in muscle activation. Cholinesterase is an enzyme that breaks down acetylcholine, not a neurotransmitter. Norepinephrine is associated with alertness and the stress response.",
      {});
  }
]),["Think about the neurotransmitters you've studied and the functions each one is linked to. Which one has been associated with emotional well-being, the sleep-wake cycle, and feelings of hunger?"]);
E("bio-u3-74-q22",3,["7.4"],1,"var",varset([
  function(){
    return mcq("During an emergency, which neurotransmitter helps prepare the body for action?",
      "Norepinephrine",
      ["Acetylcholine","Dopamine","Endorphins"],
      "Norepinephrine is released during emergencies and prepares the body for action, increasing alertness, heart rate, and blood flow to muscles. Acetylcholine is involved in muscle contraction and parasympathetic responses. Dopamine is associated with reward and motor control. Endorphins are associated with pain relief and wellbeing.",
      {});
  }
]),["Think about the fight-or-flight response. Which branch of the nervous system activates it, and what chemical messenger does it release to prepare the body for rapid action?"]);
E("bio-u3-74-q23",3,["7.4"],3,"var",varset([
  function(){
    return mcq("What would be the result of a nerve gas that irreversibly inhibits the enzyme cholinesterase?",
      "Continuous stimulation of the postsynaptic membrane",
      ["Immediate exhaustion of available norepinephrine","Inability of acetylcholine to bind to receptors","Rapid reuptake of serotonin from the cleft"],
      "Cholinesterase breaks down acetylcholine after it has acted. If it's irreversibly inhibited, acetylcholine accumulates, causing continuous stimulation of the postsynaptic membrane, muscles contract continuously, which is lethal. This does not affect norepinephrine, acetylcholine binding (C, the opposite happens; binding continues too long), or serotonin reuptake.",
      {});
  }
]),["Cholinesterase breaks down acetylcholine in the synapse. If it's blocked, what happens to acetylcholine levels at the synapse?"]);
E("bio-u3-74-q24",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A patient has difficulty moving skeletal muscles because communication between motor neurons and muscles is impaired. Which neurotransmitter is most likely involved?",
      "Acetylcholine",
      ["Dopamine","Serotonin","Endorphins"],
      "Acetylcholine is the primary neurotransmitter at the neuromuscular junction, between motor neurons and skeletal muscles. If communication between motor neurons and muscles is impaired, acetylcholine is the most likely neurotransmitter involved. Dopamine and serotonin are primarily CNS neurotransmitters. Endorphins are pain-modulating peptides.",
      {});
  }
]),["Recall what happens at the junction between a motor neuron and a muscle fibre. What neurotransmitter is released at that specific site to trigger muscle contraction?"]);
E("bio-u3-74-q25",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A medication blocks cholinesterase activity. What effect would most likely occur?",
      "Acetylcholine would remain active longer at the synapse",
      ["Dopamine production would immediately increase","Endorphin release would stop completely","Serotonin would prevent muscle contraction"],
      "Cholinesterase removes acetylcholine from the synapse to end signaling. If it's blocked, acetylcholine remains active longer at the synapse, causing prolonged stimulation. This does not increase dopamine, stop endorphin release, or involve serotonin.",
      {});
  }
]),["Think about the normal role of cholinesterase in the synapse, why does the body produce it? What would happen to the signal if that clean-up process were blocked?"]);
E("bio-u3-74-q26",3,["7.4"],2,"var",varset([
  function(){
    var q=mcq("A patient suffers damage to structure C. Which ability would most likely be affected?",
      "Balance and coordination of movement",
      ["Regulation of body temperature","Release of digestive enzymes","Processing of sensory information"],
      "Structure C in the diagram points to the cerebellum, the cauliflower-shaped structure at the back of the brain. The cerebellum coordinates balance and fine motor movement. Body temperature regulation is the hypothalamus. Digestive enzyme release involves the endocrine/digestive system. Sensory information processing is the thalamus/cerebrum.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-74-q26.png" alt="Side view diagram of the brain with four labels: A points to the large folded region forming the top and front; B points to a small oval region deep in the centre; C points to the green, finely folded region at the lower back; D points to the pale stalk descending from the bottom" style="max-width:100%;height:auto">';
    return q;
  }
]),["In the brain diagram, structure C is the small, cauliflower-shaped structure at the back. What is the cerebellum responsible for?"]);
E("bio-u3-74-q27",3,["7.4"],1,"var",varset([
  function(){
    return mcq("Which part of the brain controls hunger, body temperature, and aggression?",
      "Hypothalamus",
      ["Cerebellum","Cerebrum","Thalamus"],
      "The hypothalamus is the brain's master homeostatic regulator, controlling hunger, thirst, body temperature, and aggression. The cerebellum controls balance and coordination. The cerebrum controls conscious thought and voluntary movement. The thalamus relays sensory signals.",
      {});
  }
]),["Think about which brain region is most closely linked to maintaining the body's internal balance, regulating temperature, hunger, and certain emotional drives. It sits just above the brain stem."]);
E("bio-u3-74-q28",3,["7.4"],2,"var",varset([
  function(){
    var q=mcq("If a traumatic injury occurs precisely at the region labeled Y, which combination of life-sustaining functions would be permanently disrupted?",
      "Heart rate regulation and breathing",
      ["Complex reasoning and language processing","Fine motor coordination and equilibrium","Sleep-wake cycles and visual reflexes"],
      "Y points to the medulla oblongata in the brain stem. The medulla oblongata controls vital autonomic functions including heart rate and breathing. Damage here is often fatal. Complex reasoning is the cerebrum. Fine motor coordination is the cerebellum. Sleep-wake cycles and visual reflexes involve the pons and midbrain.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-74-q28.png" alt="Side view diagram of the brain with an arrow labelled Y pointing to the lowest section of the pale stalk below the brain, beneath the rounded layered region at the back" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at where Y is located in the diagram. Think about which part of the brain is responsible for the most basic, automatic life-sustaining functions, the ones you can't survive without for even a few minutes."]);
E("bio-u3-74-q29",3,["7.4"],1,"var",varset([
  function(){
    return mcq("What part of the brain is responsible for you being able to read and understand this question?",
      "Cerebrum",
      ["Amygdala","Cerebellum","Hypothalamus"],
      "The cerebrum is the large, folded outer brain responsible for conscious thought, language, reading, and comprehension. The amygdala processes emotions. The cerebellum controls motor coordination. The hypothalamus controls homeostatic regulation.",
      {});
  }
]),["Reading and understanding language involves higher-order thinking. Which large brain structure handles conscious thought, language, and sensory processing?"]);
E("bio-u3-74-q30",3,["7.4"],2,"var",varset([
  function(){
    return mcq("During a stressful situation, a person's heart rate increases and breathing becomes faster. Which brain structure helps coordinate these homeostatic responses?",
      "Hypothalamus",
      ["Cerebellum","Corpus callosum","Meninges"],
      "The hypothalamus monitors internal conditions and coordinates the body's response to stress, including triggering increased heart rate and breathing through the autonomic nervous system. The cerebellum controls balance. The corpus callosum connects the two hemispheres. The meninges are protective membranes around the brain.",
      {});
  }
]),["Think about which brain structure acts as the body's master regulator of internal conditions. It receives signals about stress and coordinates the nervous and endocrine systems to respond."]);
E("bio-u3-74-q31",3,["7.4"],1,"var",varset([
  function(){
    return mcq("A student voluntarily moves their hand to write their name. Which nervous system division controls this action?",
      "Somatic nervous system",
      ["Autonomic nervous system","Parasympathetic nervous system","Sympathetic nervous system"],
      "The somatic nervous system controls voluntary skeletal muscle movements, actions you consciously choose. The autonomic nervous system controls involuntary functions. The parasympathetic and sympathetic are divisions of the autonomic system.",
      {});
  }
]),["Voluntary actions are ones you consciously choose to do. Which division of the nervous system controls skeletal muscle movements you decide to make?"]);
E("bio-u3-74-q32",3,["7.4"],2,"var",varset([
  function(){
    return mcq("A person sees a bear while hiking. Their heart rate increases, pupils dilate, and digestion slows. Which response is occurring?",
      "Sympathetic response during fight-or-flight",
      ["Parasympathetic response during fight-or-flight","Somatic response controlling voluntary movement","Spinal reflex controlling voluntary movement"],
      "The sympathetic nervous system activates fight-or-flight, increasing heart rate, dilating pupils, and diverting blood to muscles when a threat is perceived. The parasympathetic system is active during calm states. The somatic system controls voluntary movement. Spinal reflexes are automatic but different from the autonomic response.",
      {});
  }
]),["Fight-or-flight responses are involuntary and automatic. Which branch of the autonomic nervous system activates them?"]);
E("bio-u3-74-q33",3,["7.4"],1,"var",varset([
  function(){
    return mcq("What is the primary role of the autonomic nervous system?",
      "Regulating involuntary bodily functions",
      ["Controlling voluntary muscle movements","Integrating sensory data in the brain","Processing conscious emotional thoughts"],
      "The autonomic nervous system regulates involuntary bodily functions, heart rate, digestion, breathing rate, and glandular secretions, without conscious control. It does not control voluntary muscle movement, integrate sensory data consciously, or process emotional thoughts consciously.",
      {});
  }
]),["Consider the two divisions of the peripheral nervous system. One controls actions you choose to do, the other operates without conscious control. Which division does the autonomic nervous system belong to?"]);
E("bio-u3-74-q34",3,["7.4"],1,"var",varset([
  function(){
    return mcq("A student lifts a heavy textbook off a desk. Which of the following is responsible for sending signals to contract their muscles in their arms?",
      "Somatic nervous system",
      ["Afferent nervous system","Autonomic nervous system","Parasympathetic nervous system"],
      "The somatic nervous system controls voluntary skeletal muscle movements, including lifting an object. The afferent nervous system carries sensory information toward the CNS. The autonomic and parasympathetic systems control involuntary functions.",
      {});
  }
]),["Lifting a textbook is a voluntary movement. Which division of the nervous system controls signals to skeletal muscles for intentional movement?"]);

/* ---------- 7.5 External Factors & Nervous System Disorders ---------- */
E("bio-u3-75-q01",3,["7.5", "7.6"],2,"var",varset([
  function(){
    return mcq("An external factor causes prolonged activation of the sympathetic nervous system. Which outcome would most likely occur?",
      "Increased heart rate and reduced digestive activity",
      ["Decreased heart rate and increased digestion","Increased muscle repair during sleep","Reduced breathing rate"],
      "Prolonged sympathetic activation keeps the body in fight-or-flight mode: heart rate increases and digestion decreases. The parasympathetic system would cause decreased heart rate and increased digestion. Muscle repair happens during rest, not sympathetic activation. Breathing rate increases, not decreases.",
      {});
  }
]),["Prolonged sympathetic activation means the body stays in 'fight-or-flight' mode. What does that do to heart rate and digestion over time?"]);
E("bio-u3-75-q02",3,["7.5", "7.6"],2,"var",varset([
  function(){
    return mcq("A factor is found to increase neurotransmitter activity at synapses. Which outcome would most likely be observed?",
      "Altered communication between neurons",
      ["Elimination of action potentials","Loss of sensory receptors","Reduced nervous system activity in all cases"],
      "Increased neurotransmitter activity means more signals cross synapses, altering communication between neurons. Action potentials are not eliminated, they may actually increase. Sensory receptors are unaffected by synaptic neurotransmitter levels. Not all cases would show reduced activity, enhanced activity could increase neural firing.",
      {});
  }
]),["If a factor increases neurotransmitter activity, more signals are being sent across synapses. What would that mean for communication between neurons?"]);
E("bio-u3-75-q03",3,["7.5", "7.6"],2,"var",varset([
  function(){
    return mcq("A patient has a disorder that affects dopamine-producing neurons. Which consequence would most likely result?",
      "Disrupted nervous system communication",
      ["Increased blood clotting","Reduced mineral absorption","Stopped cellular respiration"],
      "Dopamine is a neurotransmitter that carries signals between neurons. Damage to dopamine-producing neurons disrupts that chemical communication. Blood clotting, mineral absorption, and cellular respiration are not functions of the nervous system or dopamine.",
      {});
  }
]),["Dopamine is involved in movement coordination and reward pathways. What would happen to neural communication if neurons that produce it are damaged?"]);
E("bio-u3-75-q04",3,["7.5", "7.6"],2,"var",varset([
  function(){
    return mcq("Why can nervous system disorders have widespread effects on the body?",
      "The nervous system coordinates and regulates many body functions",
      ["Neurons carry oxygen throughout the body","The nervous system produces all body tissues","The nervous system is responsible only for movement"],
      "The nervous system coordinates and regulates virtually every body system, cardiovascular, respiratory, digestive, endocrine, and more. Neurons do not carry oxygen. The nervous system does not produce body tissues. It controls much more than just movement.",
      {});
  }
]),["The nervous system coordinates virtually every body system. What would happen to the body if this coordination is disrupted by disease?"]);

/* ---------- 7.7 The Human Endocrine System ---------- */
E("bio-u3-77-q01",3,["7.7"],2,"var",varset([
  function(){
    return mcq("How does the endocrine system primarily contribute to homeostasis?",
      "By producing hormones that regulate body functions over time",
      ["By rapidly transmitting electrical impulses between neurons","By removing wastes from the bloodstream","By transporting oxygen to body tissues"],
      "The endocrine system produces hormones that travel through the bloodstream to regulate body functions, typically slower but longer-lasting than nervous system responses. Rapid electrical impulses describe the nervous system. Waste removal is the excretory system's role. Oxygen transport is the circulatory system's role.",
      {});
  }
]),["The endocrine system uses chemical messengers carried in the blood. How does this differ from the speed of nervous system signals?"]);
E("bio-u3-77-q02",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A student consumes a meal high in carbohydrates. Several hours later, blood glucose levels returned to normal. Which statement best explains this response?",
      "Insulin increased cellular uptake of glucose through negative feedback",
      ["Insulin stimulated glucagon release to increase blood glucose levels","The adrenal glands secreted cortisol to decrease glucose storage","The thyroid gland secreted thyroxine to remove glucose from the blood"],
      "Insulin is released when blood glucose rises, promoting cellular uptake of glucose through negative feedback, glucose levels return to normal. Insulin does not stimulate glucagon release (B, glucagon does the opposite of insulin). Cortisol from adrenal glands is involved in stress responses, not post-meal glucose. Thyroxine regulates metabolic rate, not blood glucose.",
      {});
  }
]),["Blood glucose rose after the meal, so the body needs to bring it back down. Which hormone lowers blood glucose, and what type of feedback does this represent?"]);
E("bio-u3-77-q03",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A patient suffers damage to endocrine tissue and begins experiencing prolonged disruptions in body temperature, blood glucose, and water balance. Which conclusion is most reasonable?",
      "Hormonal regulation contributes to multiple homeostatic processes",
      ["Homeostasis is maintained only by the nervous system","Hormones act only on the organs that secrete them","The endocrine system functions independently of feedback mechanisms"],
      "Damage to endocrine tissue affecting multiple homeostatic processes shows that hormonal regulation contributes to many different processes simultaneously. The nervous system alone cannot maintain all of these. Hormones travel through the blood and act on distant target organs. The endocrine system absolutely depends on feedback mechanisms.",
      {});
  }
]),["The damage affects multiple homeostatic processes at once. What does this tell you about how many body functions the endocrine system is involved in regulating?"]);
E("bio-u3-77-q04",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which characteristic is associated with the endocrine system rather than the nervous system?",
      "Hormones transported through the bloodstream",
      ["Fast response time measured in milliseconds","Localized communication through neurons","Short-duration effects"],
      "Hormones travel through the bloodstream to reach target cells: this is a defining feature of the endocrine system. Fast responses and short-duration effects describe the nervous system. Localized neuron communication also describes the nervous system.",
      {});
  }
]),["Think about how endocrine signals travel (through blood) vs. nervous signals (through neurons). Which system is faster? Which lasts longer?"]);
E("bio-u3-77-q05",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which signaling molecule is used by the endocrine system to send messages throughout the body?",
      "Hormones",
      ["Antibodies","Neurotransmitters","Enzymes"],
      "The endocrine system uses hormones as its chemical messengers, which travel through the blood to target tissues. Antibodies are immune proteins. Neurotransmitters are used by the nervous system. Enzymes catalyze chemical reactions.",
      {});
  }
]),["The endocrine system's chemical messengers travel through the bloodstream to reach target organs. What are these chemical messengers called?"]);
E("bio-u3-77-q06",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which gland secretes melatonin?",
      "Pineal",
      ["Lacrimal","Pituitary","Sweat"],
      "The pineal gland is a small endocrine gland in the brain that secretes melatonin, regulating sleep-wake cycles. Lacrimal glands produce tears. The pituitary gland produces many other hormones. Sweat glands are exocrine glands.",
      {});
  }
]),["Melatonin regulates sleep-wake cycles. Which small brain-associated gland produces it?"]);
E("bio-u3-77-q07",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Compared to the nervous system, which of the following best describes the endocrine system?",
      "Slower and longer-lasting",
      ["Faster and longer-lasting","Faster and shorter-lived","Slower and shorter-lived"],
      "The endocrine system is slower to respond, because its hormones travel through the blood, but its effects last longer. The nervous system is the faster, shorter-lived system, so any description that makes the endocrine system faster, or gives it the nervous system's profile, reverses the two.",
      {});
  }
]),["Think about the two different ways the body sends signals, one uses electrical impulses along nerves, the other releases chemical messengers into the bloodstream. Consider how the delivery method for each would affect both the speed of the response and how long it lasts."]);
E("bio-u3-77-q08",3,["7.7"],2,"var",varset([
  function(){
    return mcq("Why would the hypothalamus be considered the link between the nervous and endocrine systems?",
      "It processes sensory neural inputs and responds by regulating the pituitary gland",
      ["It generates electrical impulses that travel directly to target organs via blood vessels","It is a giant neuron that secretes digestive enzymes instead of chemical messengers","It converts all endocrine hormones into neurotransmitters before they reach the brain"],
      "The hypothalamus receives sensory neural inputs from the nervous system and responds by regulating the pituitary gland using releasing/inhibiting hormones, making it the bridge between both systems. It does not send electrical impulses via blood vessels. It is not a single giant neuron. It does not convert hormones into neurotransmitters.",
      {});
  }
]),["Think about what makes something a bridge between two systems. The hypothalamus sits at the boundary of the nervous and endocrine systems, consider what kind of information it receives and what kind of output it produces in response."]);
E("bio-u3-77-q09",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which hormone stimulates the thyroid gland to release thyroxine?",
      "TSH",
      ["ACTH","ADH","hGH"],
      "TSH stands for Thyroid-Stimulating Hormone. Its name tells you it targets and stimulates the thyroid gland to produce thyroxine. ACTH targets the adrenal cortex. ADH acts on the kidneys. hGH stimulates growth.",
      {});
  }
]),["Look at the abbreviations in the answer choices and think about what each one stands for. The name of the correct hormone contains a direct reference to the gland it acts on. Which of the options has that built into its name?"]);
E("bio-u3-77-q10",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A doctor diagnoses a young patient with gigantism due to a tumor. In which gland is the tumor most likely located?",
      "Pituitary",
      ["Adrenal","Hypothalamus","Pancreas"],
      "The pituitary gland produces human growth hormone (hGH). A tumor causing excess hGH during childhood results in gigantism (abnormal growth). Adrenal gland tumors cause cortisol or adrenaline excess. Hypothalamus tumors affect releasing hormones. Pancreatic tumors affect insulin or glucagon.",
      {});
  }
]),["Think about which gland is responsible for producing the hormone that controls growth throughout the body. If a tumour caused that gland to overproduce that hormone during childhood, before the growth plates have closed, what would you expect to happen?"]);
E("bio-u3-77-q11",3,["7.7"],2,"var",varset([
  function(){
    return mcq("If a person consumes a large, sugary meal, which hormone response will immediately follow?",
      "Insulin increases",
      ["Aldosterone decreases","Glucagon increases","Thyroxine decreases"],
      "After a sugary meal, blood glucose rises and insulin is released from the pancreas to promote cellular uptake of glucose. Aldosterone regulates sodium/water balance. Glucagon raises blood glucose: it would not increase after a high-glucose meal. Thyroxine regulates metabolic rate.",
      {});
  }
]),["Blood glucose rises after a sugary meal. Which pancreatic hormone responds to high blood glucose to bring it back down?"]);
E("bio-u3-77-q12",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A patient has a rare tumor that hyper-secretes ACTH. What secondary physiological effect would you expect to observe in this patient?",
      "Elevated blood cortisol",
      ["Decreased blood pressure","Low blood sugar","Increased urine output"],
      "ACTH stimulates the adrenal cortex to produce cortisol. A tumor secreting excess ACTH would chronically stimulate the adrenal cortex, leading to elevated blood cortisol. Cortisol increases blood pressure (not decreases, A). Cortisol raises blood sugar (not lowers it, C). Increased urine output is related to ADH, not ACTH.",
      {});
  }
]),["Think about the relationship between ACTH and the gland it targets. ACTH is a tropic hormone, its job is to stimulate another gland to produce its own hormone. If ACTH is being overproduced, what happens downstream in that chain?"]);
E("bio-u3-77-q13",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which mechanism controls the regulation of the thyroid gland?",
      "Negative feedback",
      ["Positive feedback","Simple diffusion","Up-regulation"],
      "Thyroid regulation is controlled by negative feedback: thyroxine feeds back to inhibit TSH release from the pituitary and TRH from the hypothalamus. Positive feedback would amplify thyroxine production, which is not how it works. Simple diffusion is a physical process. Up-regulation increases receptor sensitivity, which is not the primary mechanism here.",
      {});
  }
]),["The thyroid produces thyroxine, which feeds back to reduce TSH. Is this positive or negative feedback?"]);
E("bio-u3-77-q14",3,["7.7"],2,"var",varset([
  function(){
    return mcq("During a sudden physical threat, which physiological change is directly triggered by the adrenal medulla?",
      "Dilation of bronchioles",
      ["Decreased breathing rate","Increased digestion speed","Lowered blood pressure"],
      "The adrenal medulla releases epinephrine during sudden physical threats. Epinephrine causes bronchodilation, widening the airways to allow more oxygen intake during the stress response. Breathing rate increases (not decreases, A). Digestion slows during fight-or-flight. Blood pressure increases (not decreases, D).",
      {});
  }
]),["Think about what the body needs to do during a sudden physical threat, it needs to get more oxygen to muscles as fast as possible. Consider which part of the airway, if widened, would allow more air to reach the lungs with each breath."]);
E("bio-u3-77-q15",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A tumour prevents the hypothalamus from releasing adequate thyroid-releasing hormone. Which outcome would most likely occur?",
      "Decreased secretion of TSH from the pituitary gland",
      ["Increased secretion of thyroxine from the thyroid gland","Increased secretion of TSH from the pituitary gland","No change in thyroid hormone production"],
      "TRH from the hypothalamus stimulates TSH release from the pituitary. If TRH is absent, the pituitary receives no stimulation and produces less TSH. Without TSH, the thyroid produces less thyroxine, not more. TSH would decrease, not increase. Thyroid hormone production would decrease, not remain unchanged.",
      {});
  }
]),["Thyroid-releasing hormone (TRH) from the hypothalamus \u2192 TSH from pituitary \u2192 thyroxine from thyroid. If TRH is blocked, what happens to TSH output?"]);
E("bio-u3-77-q16",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which hormone is produced by the thyroid gland and helps regulate metabolic rate?",
      "Thyroxine",
      ["Calcitonin","Cortisol","Parathyroid hormone"],
      "Thyroxine is the thyroid hormone that regulates the basal metabolic rate, the rate at which the body uses energy at rest. Calcitonin lowers blood calcium. Cortisol is an adrenal hormone. Parathyroid hormone raises blood calcium.",
      {});
  }
]),["The thyroid gland produces two hormones. Which one specifically regulates the rate at which cells use energy (metabolic rate)?"]);
E("bio-u3-77-q17",3,["7.7"],2,"var",varset([
  function(){
    var q=mcq("The graph shows blood glucose levels of a healthy person over a short period of time. Which hormone is most likely secreted by the pancreas at point Y?",
      "Glucagon",
      ["Insulin","Melatonin","Thyroxine"],
      "Point Y is at the lowest point of the blood glucose curve, below normal. This means glucose is too low, and the body needs to raise it. Glucagon, released by the pancreas, stimulates the liver to release stored glucose. Insulin would lower glucose further. Melatonin regulates sleep. Thyroxine affects metabolic rate.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-77-q17.png" alt="Graph of blood glucose levels over time: the level holds steady, rises to a peak, then falls below the starting level to a low point marked Y, then climbs back toward the starting level" style="max-width:100%;height:auto">';
    return q;
  }
]),["Point Y on the graph is at the bottom of a dip in blood glucose. The glucose dropped below normal, which hormone from the pancreas responds to low blood glucose?"]);
E("bio-u3-77-q18",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A patient produces insufficient thyroxine. Which symptom would most likely result?",
      "Reduced metabolic rate and fatigue",
      ["Elevated metabolic rate and weight loss","Increased energy production and body temperature","Rapid increases in blood calcium levels"],
      "Thyroxine speeds up cellular metabolism. Insufficient thyroxine slows metabolism, leading to fatigue and weight gain. Elevated metabolic rate and weight loss are symptoms of hyperthyroidism (too much thyroxine). Increased energy and body temperature also describe hyperthyroidism. Blood calcium changes are regulated by calcitonin and PTH, not thyroxine.",
      {});
  }
]),["Think about what thyroxine's primary role is in the body, it influences how quickly or slowly cells carry out their metabolic processes. If the amount of thyroxine available drops below normal, what would you expect to happen to that rate of activity?"]);
E("bio-u3-77-q19",3,["7.7"],3,"var",varset([
  function(){
    return mcq("A blood test reveals low thyroxine levels and elevated TSH levels. Which interpretation is most consistent with thyroid regulation?",
      "The pituitary gland is responding appropriately through negative feedback",
      ["The pituitary gland has completely stopped functioning","The thyroid gland is producing excess hormone","Thyroxine is stimulating additional TSH production"],
      "Low thyroxine means the negative feedback signal on the pituitary is weak. The pituitary responds by producing more TSH to try to stimulate the thyroid: this is the pituitary functioning correctly through negative feedback. The pituitary is working, not stopped. The thyroid is underproducing, not overproducing. Thyroxine normally inhibits TSH, not stimulates it.",
      {});
  }
]),["Low thyroxine means the feedback signal is weak. The pituitary keeps producing TSH trying to stimulate more thyroxine. Is this the pituitary working correctly or failing?"]);
E("bio-u3-77-q20",3,["7.7"],1,"var",varset([
  function(){
    return mcq("Which hormone is secreted when blood calcium levels become too low?",
      "Parathyroid hormone",
      ["ACTH","Calcitonin","Thyroxine"],
      "When blood calcium is too low, parathyroid hormone (PTH) is secreted by the parathyroid glands to stimulate calcium release from bones and absorption from the gut. ACTH stimulates cortisol. Calcitonin lowers blood calcium, the opposite of what's needed. Thyroxine affects metabolic rate.",
      {});
  }
]),["Blood calcium is too low. The body needs to raise it. Which gland and hormone act to release calcium from bones?"]);
E("bio-u3-77-q21",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A patient experiences a drop in blood calcium concentration. Which response would help restore homeostasis?",
      "Increased PTH secretion causing calcium release from bone",
      ["Increased calcitonin secretion causing calcium deposition in bone","Reduced PTH secretion decreasing calcium absorption","Reduced thyroxine secretion increasing calcium excretion"],
      "PTH increases blood calcium by releasing it from bones and enhancing absorption. When calcium is low, PTH secretion increases to release calcium from bone. Increased calcitonin would lower calcium further. Reduced PTH would worsen the low calcium. Thyroxine does not regulate calcium directly.",
      {});
  }
]),["Think about the two hormones involved in calcium regulation and what each one does, one works to bring calcium levels up, the other to bring them down. If blood calcium is already low, which direction does the body need to push it, and which hormone would drive that response?"]);
E("bio-u3-77-q22",3,["7.7"],2,"var",varset([
  function(){
    return mcq("Following removal of the parathyroid glands, a patient's blood calcium concentration declines. Which prediction is most reasonable?",
      "Homeostatic regulation of calcium will be impaired",
      ["Blood calcium will rise because calcitonin secretion increases","Blood calcium will remain constant because PTH is unnecessary","Thyroxine will fully compensate for the loss of PTH"],
      "Without PTH (from removed parathyroid glands), blood calcium cannot be adequately regulated and homeostatic regulation of calcium is impaired. Blood calcium would fall, not rise. PTH is essential for calcium regulation. Thyroxine does not regulate calcium and cannot compensate.",
      {});
  }
]),["Without parathyroid glands, PTH can't be produced. What does PTH normally do to maintain blood calcium, and what happens when it's absent?"]);
E("bio-u3-77-q23",3,["7.7"],1,"var",varset([
  function(){
    return mcq("A student narrowly avoids a car accident. Their heart rate and breathing rate increase rapidly. Which hormone is primarily responsible?",
      "Epinephrine",
      ["Aldosterone","Insulin","Thyroxine"],
      "Epinephrine (adrenaline) is released by the adrenal medulla in response to sudden threats, causing rapid increases in heart rate and breathing. Aldosterone regulates sodium balance. Insulin lowers blood glucose. Thyroxine regulates metabolic rate but acts much more slowly.",
      {});
  }
]),["A sudden threat triggers the 'fight-or-flight' response almost instantly. Which hormone, released by the adrenal medulla, causes the rapid heart rate increase?"]);
E("bio-u3-77-q24",3,["7.7"],1,"var",varset([
  function(){
    return mcq("A person experiences chronic stress for several months. Which hormone would most likely be elevated during this long-term stress response?",
      "Cortisol",
      ["Calcitonin","Melatonin","Oxytocin"],
      "Cortisol is the adrenal cortex hormone associated with long-term (chronic) stress response. It sustains elevated blood glucose and suppresses non-essential functions over weeks or months. Calcitonin regulates calcium. Melatonin regulates sleep. Oxytocin is associated with bonding and childbirth.",
      {});
  }
]),["Short-term stress uses epinephrine; long-term stress uses a different adrenal hormone. Which hormone is associated with chronic stress and prolonged cortisol elevation?"]);
E("bio-u3-77-q25",3,["7.7"],2,"var",varset([
  function(){
    return mcq("Researchers administer a drug that blocks epinephrine receptors. During an emergency situation, which response would most likely be reduced?",
      "Rapid increases in heart rate and blood pressure",
      ["Decreased metabolic rate during sleep","Increased blood glucose storage after eating","Regulation of blood calcium concentrations"],
      "Epinephrine binds to receptors to trigger rapid heart rate and blood pressure increases during emergencies. Blocking those receptors would reduce or eliminate the rapid heart rate and blood pressure response. Metabolic rate during sleep is not epinephrine-dependent. Blood glucose storage after eating involves insulin. Calcium regulation involves PTH and calcitonin.",
      {});
  }
]),["Think about what epinephrine normally does during an emergency, consider the specific cardiovascular effects it produces. If the receptors that receive that signal were blocked, what would fail to happen when the body tries to mount that response?"]);
E("bio-u3-77-q26",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A student skips breakfast and does not eat until lunchtime. Which hormonal response would most likely occur?",
      "Increased glucagon secretion stimulates glucose release from the liver",
      ["Increased insulin secretion stimulates glucose storage in the liver","Reduced glucagon secretion stimulates glycogen formation","Reduced insulin secretion directly increases glucose uptake"],
      "When blood glucose falls after skipping breakfast, glucagon is released from the pancreas. It stimulates the liver to break down glycogen and release glucose into the blood. Insulin would lower blood glucose further, opposite of what's needed. Reduced glucagon would not help raise glucose. Reduced insulin would not directly raise glucose on its own.",
      {});
  }
]),["When you skip breakfast, blood glucose drops. Which pancreatic hormone responds to low blood glucose by releasing stored glucose from the liver?"]);
E("bio-u3-77-q27",3,["7.7"],2,"var",varset([
  function(){
    return mcq("After consuming a sugary sports drink, blood glucose levels rise sharply. Which sequence best describes the homeostatic response?",
      "Insulin secretion increases \u2192 blood glucose returns toward normal",
      ["Glucagon secretion increases \u2192 glucose stored as glycogen","Insulin secretion decreases \u2192 cellular uptake increases","PTH secretion increases \u2192 glucose enters cells"],
      "Rising blood glucose triggers insulin release from the pancreas, which promotes cellular uptake and storage of glucose, bringing blood glucose back toward normal. Glucagon increases would raise glucose further. Insulin secretion actually increases in response to high glucose (B is backwards). PTH has no role in glucose regulation.",
      {});
  }
]),["Blood glucose rises sharply. The body needs to bring it back to normal. Which hormone increases, and what does it do to cellular glucose uptake?"]);
E("bio-u3-77-q28",3,["7.7"],2,"var",varset([
  function(){
    return mcq("A student constructs a model showing insulin and glucagon acting in opposite directions to maintain blood glucose within a narrow range. Which concept does the model best illustrate?",
      "Homeostasis through negative feedback",
      ["Positive feedback regulation","Structural organization of endocrine glands","Synergistic hormone action"],
      "Insulin lowers blood glucose; glucagon raises it. Together they maintain glucose within a narrow range through negative feedback, a classic example of homeostasis. This is not positive feedback, which would amplify glucose changes. It does not illustrate gland structure or synergism: antagonism is the key concept here.",
      {});
  }
]),["Insulin lowers blood glucose; glucagon raises it. They work in opposite directions to keep glucose in a narrow range. What homeostatic mechanism does this represent?"]);

/* ---------- 7.8 Circulatory System & Cardiovascular Fitness ---------- */
E("bio-u3-78-q01",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Which function of the circulatory system most directly helps maintain cellular homeostasis?",
      "Delivering oxygen and nutrients to cells",
      ["Producing hormones for body regulation","Storing excess glucose in the liver","Synthesizing proteins for cell repair"],
      "The circulatory system delivers oxygen and nutrients to every cell and removes waste products, directly supporting cellular homeostasis. Hormone production is primarily the endocrine system. Glucose storage occurs in the liver. Protein synthesis is performed by cells themselves.",
      {});
  }
]),["Think about what individual cells need in order to carry out their functions. What must be delivered to them, and what must be taken away, for their internal environment to remain stable?"]);
E("bio-u3-78-q02",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which component of the blood is primarily responsible for transporting oxygen to body tissues?",
      "Red blood cells",
      ["Plasma","Platelets","White blood cells"],
      "Red blood cells contain haemoglobin, which binds and transports oxygen. Plasma carries dissolved substances but not oxygen efficiently. Platelets are involved in clotting. White blood cells fight infection.",
      {});
  }
]),["Think about what gives blood its red colour and what that pigment molecule is designed to carry. Which type of blood cell contains that pigment?"]);
E("bio-u3-78-q03",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which blood vessels have the thinnest walls to allow for the diffusion of gases and nutrients?",
      "Capillaries",
      ["Arterioles","Arteries","Veins"],
      "Capillaries have walls that are only one cell thick, allowing efficient diffusion of gases and nutrients. Arterioles and arteries have thick muscular walls. Veins have thicker walls than capillaries.",
      {});
  }
]),["Gas exchange requires substances to pass through vessel walls. Which vessel type has walls thin enough to allow diffusion?"]);
E("bio-u3-78-q04",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("During exercise, body temperature rises. How does the circulatory system respond to maintain homeostasis?",
      "Vasodilation of surface blood vessels",
      ["Decreasing total blood volume","Restricting blood flow to the skin","Vasoconstriction of deep veins"],
      "Vasodilation of surface blood vessels moves warm blood closer to the skin surface, releasing heat to the environment. Decreasing blood volume is not a normal response. Restricting blood flow to the skin would trap heat, the opposite of what's needed. Vasoconstriction conserves heat, also not what's needed here.",
      {});
  }
]),["During exercise, body temperature rises. The body needs to lose heat. Which circulatory response moves warm blood closer to the skin surface to release heat?"]);
E("bio-u3-78-q05",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which chamber of the heart receives deoxygenated blood from the body?",
      "Right atrium",
      ["Left atrium","Left ventricle","Right ventricle"],
      "Deoxygenated blood from the body returns via the vena cava to the right atrium. The left atrium receives oxygenated blood from the lungs. The left ventricle pumps oxygenated blood to the body. The right ventricle pumps deoxygenated blood to the lungs.",
      {});
  }
]),["Deoxygenated blood from the body returns to the heart. Which side of the heart (right or left) receives blood returning from the body, and which chamber specifically?"]);
E("bio-u3-78-q06",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which blood vessel carries oxygenated blood from the lungs back to the heart?",
      "Pulmonary vein",
      ["Aorta","Pulmonary artery","Vena cava"],
      "The pulmonary vein carries oxygenated blood from the lungs back to the left atrium of the heart. The aorta carries oxygenated blood away from the left ventricle. The pulmonary artery carries deoxygenated blood from the right ventricle to the lungs. The vena cava brings deoxygenated blood back from the body.",
      {});
  }
]),["Think carefully about the naming convention for blood vessels, veins carry blood toward the heart, arteries carry it away. Now think about which circuit brings blood back from the lungs specifically."]);
E("bio-u3-78-q07",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A surgeon is repairing a damaged heart valve that prevents the backflow of blood from the left ventricle into the left atrium. Which valve are they repairing?",
      "Bicuspid valve",
      ["Aortic valve","Pulmonary valve","Tricuspid valve"],
      "The bicuspid valve, also called the mitral valve, is located between the left atrium and left ventricle. It prevents backflow from the left ventricle into the left atrium. The aortic valve is between the left ventricle and aorta. The pulmonary valve is between the right ventricle and pulmonary artery. The tricuspid valve is on the right side.",
      {});
  }
]),["Think about where the left and right sides of the heart differ in terms of the valves between the atria and ventricles. The valve between the left atrium and left ventricle has a different name and number of flaps than the one on the right side."]);
E("bio-u3-78-q08",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("If a patient's superior and inferior vena cava are narrowed by disease, which of the following would immediately occur?",
      "Blood return to the right atrium would decrease.",
      ["Blood flow to the lungs would spike.","Oxygenated blood would leak into the ventricles.","Pressure in the aorta would dramatically rise."],
      "The vena cava returns blood from the body to the right atrium. If it narrows, blood return to the right atrium decreases. Blood flow to the lungs would subsequently decrease, not spike. Oxygenated blood would not leak from narrowed vena cava. Aortic pressure is downstream and not directly affected.",
      {});
  }
]),["Think about what the vena cava does, where does blood come from and where does it go? If the vessel delivering that blood became narrowed, what would happen to the volume returning to the heart?"]);
E("bio-u3-78-q09",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Trace the path of a single red blood cell entering the heart from the lower body. Which sequence correctly orders the structures it will pass through?",
      "Right atrium \u2192 right ventricle \u2192 pulmonary artery",
      ["Aorta \u2192 left atrium \u2192 pulmonary vein","Pulmonary vein \u2192 right ventricle \u2192 aorta","Vena cava \u2192 tricuspid valve \u2192 left atrium"],
      "From the lower body, blood enters via the inferior vena cava \u2192 right atrium \u2192 tricuspid valve \u2192 right ventricle \u2192 pulmonary artery. Aorta and pulmonary vein (A, B) are on the oxygenated side. The tricuspid valve leads to the right ventricle, not the left atrium.",
      {});
  }
]),["Picture the right side of the heart. Blood arrives from the body, what chamber does it enter first? Then trace its path through the next chamber before it heads to the lungs."]);
E("bio-u3-78-q10",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which blood vessels carry blood away from the heart?",
      "Arteries",
      ["Capillaries","Lymphatics","Veins"],
      "Arteries carry blood away from the heart. Capillaries are for exchange. Lymphatics carry lymph fluid, not blood. Veins carry blood toward the heart.",
      {});
  }
]),["Think about the root meanings of the two main vessel types. One of them literally means 'to carry away.' Which vessel type does that describe, and away from what?"]);
E("bio-u3-78-q11",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which structural feature is unique to veins compared to arteries?",
      "One-way valves",
      ["Elastic fibers","Endothelial lining","Smooth muscle"],
      "Veins contain one-way valves that prevent backflow, especially important in the legs where blood must travel against gravity. Elastic fibers are found in arteries. Endothelial lining is common to all vessels. Smooth muscle is in artery and vein walls, but thicker in arteries.",
      {});
  }
]),["Blood in veins moves against gravity, especially in the legs. What structural feature prevents blood from flowing backward in veins?"]);
E("bio-u3-78-q12",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Why do arteries require thicker, more elastic walls than veins?",
      "To resist high pumping pressure",
      ["To accommodate low-oxygen blood","To prevent backflow of blood","To speed up diffusion rates"],
      "Arteries carry blood under high pressure directly from the heart's ventricles. Their thick elastic walls withstand and dampen this high pressure. They do not need to accommodate low-oxygen blood. Valves that prevent backflow are in veins. Diffusion occurs in capillaries.",
      {});
  }
]),["Think about what arteries experience immediately after the heart contracts. What physical force do they need to be able to withstand, and what wall features would help them do that?"]);
E("bio-u3-78-q13",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("During strenuous exercise, muscle cells require more oxygen and nutrients. How does the circulatory system help maintain homeostasis?",
      "By directing more blood flow to active muscles",
      ["By decreasing heart rate to conserve energy","By reducing cellular respiration in muscle cells","By storing additional oxygen in plasma"],
      "During exercise, active muscles need more oxygen and glucose. The circulatory system directs more blood flow to those muscles. Decreasing heart rate would reduce delivery. Cellular respiration increases, not decreases. Oxygen is carried by red blood cells, not stored in plasma.",
      {});
  }
]),["During exercise, active muscles need more oxygen and glucose. Does the circulatory system increase or decrease blood flow to those muscles?"]);
E("bio-u3-78-q14",3,["7.8", "7.9"],3,"var",varset([
  function(){
    return mcq("A student states that the circulatory system only transports oxygen. Which evidence best refutes this claim?",
      "Blood also transports hormones, nutrients, and wastes",
      ["Blood contains platelets that produce antibodies","Blood transports oxygen only during exercise","Oxygen is carried by plasma instead of blood cells"],
      "Blood transports hormones, nutrients, carbon dioxide, and metabolic wastes, not just oxygen. This refutes the student's claim. Platelets do not produce antibodies. Blood transports oxygen continuously, not only during exercise. Oxygen is carried by haemoglobin in red blood cells, not plasma.",
      {});
  }
]),["Think about all the things the body needs to transport through the blood, not just gases, but also chemical signals, building materials, and waste products. Does the circulatory system only move one of those things?"]);
E("bio-u3-78-q15",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which chamber of the heart receives oxygen-rich blood returning from the lungs?",
      "Left atrium",
      ["Left ventricle","Right atrium","Right ventricle"],
      "The pulmonary veins bring oxygenated blood from the lungs to the left atrium. The left ventricle pumps it out to the body. The right atrium and right ventricle receive deoxygenated blood from the body.",
      {});
  }
]),["The lungs oxygenate blood and send it back to the heart. Which chamber receives this freshly oxygenated blood, on the left side or right side?"]);
E("bio-u3-78-q16",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A defect in the septum allows blood to move between the left and right sides of the heart. What is the most likely consequence?",
      "Mixing of oxygenated and deoxygenated blood",
      ["Increased production of red blood cells","Increased blood clot formation","Increased pressure in capillaries only"],
      "The septum separates oxygenated (left) and deoxygenated (right) blood. A hole allows mixing of both types. This does not directly increase red blood cell production, cause clots, or affect only capillary pressure.",
      {});
  }
]),["Think about what the septum's job is, it physically separates two sides of the heart that contain blood at very different stages of the circulation cycle. What would happen if that wall no longer kept those two sides apart?"]);
E("bio-u3-78-q17",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which structure prevents blood from flowing backward between heart contractions?",
      "Valves",
      ["Aorta","Pulmonary vein","Septum"],
      "Valves are one-way structures that prevent blood from flowing backward between heart contractions. The aorta carries blood away. The pulmonary vein brings oxygenated blood back. The septum separates left and right sides of the heart.",
      {});
  }
]),["Think about what happens to fluid flow when a one-way door is opened in one direction only. What does a valve do in the heart that a simple open passage could not?"]);
E("bio-u3-78-q18",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A blockage occurs between the left ventricle and the aorta. Which body system would be most directly affected?",
      "Systemic circulation",
      ["Pulmonary circulation only","Venous circulation only","Coronary circulation only"],
      "Blood leaving the left ventricle enters the aorta and goes to the entire body via systemic circulation. A blockage here would starve all body organs of oxygen and nutrients. Pulmonary circulation is the right side. Venous circulation would be indirectly affected downstream. Coronary circulation is a branch of systemic, but the whole systemic circuit is affected.",
      {});
  }
]),["A blockage between the left ventricle and aorta stops blood from reaching the body. Which circulation pathway, systemic or pulmonary, would be affected?"]);
E("bio-u3-78-q19",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which blood vessel is best adapted for the exchange of materials between blood and tissues?",
      "Capillary",
      ["Artery","Vein","Venule"],
      "Capillaries are the exchange vessels, their single-cell-thick walls allow diffusion of O\u2082, CO\u2082, nutrients, and waste. Arteries and veins have walls too thick for efficient diffusion. Venules are small veins, still too thick for optimal exchange.",
      {});
  }
]),["Materials must move between blood and body cells. Which vessel type allows this exchange to happen?"]);
E("bio-u3-78-q20",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A patient has damage to the valves inside several veins of the legs. What problem is most likely to occur?",
      "Blood flows backward and pools in the legs",
      ["Capillary exchange increases significantly","Oxygen-rich blood leaves the lungs more rapidly","The heart stops generating electrical impulses"],
      "Without functional valves, blood flows backward in the leg veins and pools in the legs. This does not increase capillary exchange. Lung blood flow is unrelated to leg vein valves. Heart electrical impulses are unrelated to venous valves.",
      {});
  }
]),["Think about why leg veins have valves in the first place, blood in the legs has to travel upward against gravity. What would happen if those one-way valves could no longer keep blood moving in the right direction?"]);
E("bio-u3-78-q21",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Why do arteries have thicker muscular walls than veins?",
      "Arteries carry blood under higher pressure",
      ["Arteries transport only oxygenated blood","Arteries contain valves that require support","Arteries perform nutrient exchange"],
      "Arteries receive blood at high pressure directly from the heart's powerful contractions. Their thick muscular walls are needed to withstand this pressure. Not all arteries carry oxygenated blood, the pulmonary artery carries deoxygenated blood. Arteries do not have valves. Capillaries perform nutrient exchange.",
      {});
  }
]),["Arteries receive blood directly from the heart's powerful contractions. Why do their walls need to be strong and muscular?"]);
E("bio-u3-78-q22",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A scientist compares an artery and a vein of similar diameter. Which observation would most likely identify the artery?",
      "Thicker muscular wall",
      ["Presence of valves","Thinner elastic layer","Wider internal lumen"],
      "Arteries have thicker muscular walls than veins to withstand high blood pressure: this is the key identifying observation. Veins have valves. Arteries have a thicker (not thinner) elastic layer. Veins have a wider lumen than arteries of similar size.",
      {});
  }
]),["Think about what structural differences exist between arteries and veins and why each structure suits the blood pressure conditions in that vessel type. Which feature is unique to one of them?"]);
E("bio-u3-78-q23",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which chamber of the heart receives oxygenated blood directly from the pulmonary pathway?",
      "Left atrium",
      ["Left ventricle","Right atrium","Right ventricle"],
      "Oxygenated blood from the pulmonary veins enters the left atrium first. It then moves to the left ventricle and out through the aorta. The left ventricle is next. Right atrium and right ventricle receive deoxygenated blood from the body.",
      {});
  }
]),["Oxygenated blood comes from the lungs via the pulmonary veins. Which chamber of the heart does it enter first?"]);
E("bio-u3-78-q24",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("If a blood clot blocks the left coronary artery, which process is immediately disrupted?",
      "Oxygen delivery to the heart muscle",
      ["Carbon dioxide release from the lungs","Blood flow to the lower limbs","Transport of nutrients to the brain"],
      "The coronary arteries supply the heart muscle (myocardium) with oxygen and nutrients. A blockage immediately disrupts oxygen delivery to the heart muscle. CO\u2082 release from lungs is unrelated to the coronary artery. Blood flow to the lower limbs uses systemic arteries. Nutrients to the brain travel through carotid arteries.",
      {});
  }
]),["Think about what the coronary arteries supply and to which tissue. If blood flow through one of those arteries is suddenly cut off, what does the tissue it was feeding immediately lose?"]);
E("bio-u3-78-q25",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which structure is known as the primary pacemaker of the heart?",
      "Sinoatrial node",
      ["Atrioventricular node","Bundle of His","Purkinje fibers"],
      "The sinoatrial (SA) node is the heart's natural pacemaker. Disruption causes irregular heartbeats (arrhythmia), which reduces circulatory efficiency. Exchange of materials in blood vessels is unrelated to pacemaker function. White blood cells and platelets function independently of the pacemaker.",
      {});
  }
]),["Think about how the heart's rhythm is initiated: it doesn't wait for a signal from the brain. Which structure within the heart itself generates the electrical impulse that starts each heartbeat?"]);
E("bio-u3-78-q26",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("What is the main role of white blood cells in the human body?",
      "Fighting infection",
      ["Clotting wounds","Regulating temperature","Transporting carbon dioxide"],
      "White blood cells are the body's immune cells that fight infection by engulfing pathogens, producing antibodies, and destroying infected cells. Clotting is done by platelets. Temperature regulation is circulatory/nervous system function. CO\u2082 transport is primarily red blood cells/plasma.",
      {});
  }
]),["White blood cells are the immune cells. What is their main role in the body?"]);
E("bio-u3-78-q27",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A patient's blood test reveals a significantly low red blood cell count. Which symptom would this patient most likely experience?",
      "Unusually high fatigue",
      ["Poor wound healing","Severe muscle cramps","Uncontrolled bleeding"],
      "Red blood cells carry oxygen via haemoglobin. Very few red blood cells means very little oxygen reaches tissues, causing extreme fatigue. Poor wound healing is from low platelets. Muscle cramps are from electrolyte imbalances. Uncontrolled bleeding is from low platelets.",
      {});
  }
]),["Red blood cells carry oxygen using haemoglobin. If there are very few red blood cells, what happens to oxygen delivery to tissues?"]);
E("bio-u3-78-q28",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("What is the primary function of blood platelets?",
      "Blood clotting",
      ["Nutrient transport","Oxygen delivery","Waste removal"],
      "Platelets are cell fragments that initiate the blood clotting process by accumulating at wound sites and releasing clotting factors. They do not transport nutrients, deliver oxygen, or remove waste.",
      {});
  }
]),["Platelets are involved in sealing wounds. What process do they initiate when a blood vessel is damaged?"]);
E("bio-u3-78-q29",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Which pathway correctly traces blood flow after blood leaves the right ventricle?",
      "Heart \u2192 lungs \u2192 heart",
      ["Body \u2192 lungs \u2192 heart","Heart \u2192 tissues \u2192 lungs","Lungs \u2192 body \u2192 heart"],
      "Blood leaving the right ventricle goes to the lungs via the pulmonary artery, picks up oxygen, and returns to the left atrium via the pulmonary vein, Heart \u2192 lungs \u2192 heart. Body \u2192 lungs \u2192 heart incorrectly starts from the body. Heart \u2192 tissues \u2192 lungs goes the wrong way. Lungs \u2192 body \u2192 heart is systemic, not pulmonary circulation.",
      {});
  }
]),["After leaving the right ventricle, blood goes to the lungs to pick up oxygen. What is the correct pathway from right ventricle to back to heart?"]);
E("bio-u3-78-q30",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A blood clot blocks the pulmonary artery. Which immediate consequence is most likely?",
      "Less oxygen enters the blood in the lungs",
      ["More oxygen enters body tissues","Reduced blood flow to the coronary arteries only","Increased systemic blood pressure"],
      "A clot in the pulmonary artery blocks blood flow to the lungs. Blood cannot pass through the alveolar capillaries to pick up oxygen, so less oxygen enters the blood. More oxygen entering tissues is impossible if blood can't reach the lungs. Only pulmonary flow is blocked, not coronary arteries directly. Systemic blood pressure might drop, not increase.",
      {});
  }
]),["The pulmonary artery carries blood to the lungs. A clot there means blood cannot reach the alveoli. What happens to oxygen pickup?"]);
E("bio-u3-78-q31",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Why is coronary circulation essential?",
      "Delivers oxygen and nutrients to heart muscle tissue",
      ["Exchanges gases between the lungs and blood","Returns blood from the body to the heart","Transports blood to all body tissues"],
      "The heart muscle works continuously and needs a constant supply of oxygen and nutrients delivered by the coronary arteries. The lungs exchange gases in the alveolar capillaries, not coronary vessels. Blood from the body returns via the vena cava, not coronary circulation. All body tissues are supplied by systemic circulation.",
      {});
  }
]),["The heart is a muscle that works continuously. It needs its own blood supply. What does coronary circulation provide?"]);
E("bio-u3-78-q32",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A narrowing of the coronary arteries reduces blood flow to heart muscle cells. Which symptom is most likely?",
      "Chest pain caused by reduced oxygen supply",
      ["Increased oxygen delivery to tissues","Increased platelet production","Reduced blood flow to the lungs only"],
      "Narrowed coronary arteries reduce oxygen delivery to the actively contracting heart muscle, causing chest pain (angina) due to oxygen deprivation. Oxygen delivery to tissues decreases, not increases. Platelet production is from bone marrow, not related to coronary narrowing directly. Lung blood flow is through pulmonary circulation.",
      {});
  }
]),["If blood flow to the heart muscle is reduced, heart muscle cells are starved of oxygen. What symptom would result?"]);
E("bio-u3-78-q33",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Which structure initiates the electrical impulse that normally triggers a heartbeat?",
      "Sinoatrial node",
      ["Atrioventricular node","Purkinje fibers","Ventricular septum"],
      "The sinoatrial (SA) node is the heart's primary pacemaker, it generates the electrical impulse that triggers each heartbeat. The atrioventricular (AV) node delays the signal before it reaches the ventricles. The Bundle of His and Purkinje fibers conduct the impulse through the ventricles.",
      {});
  }
]),["Think about where the electrical signal that controls heartbeat originates. It starts in a specific node in the right atrium, what is the name of that structure, and what does 'sinoatrial' tell you about its location?"]);
E("bio-u3-78-q34",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A disruption in the sinoatrial node causes an irregular heartbeat. How could this affect homeostasis?",
      "Blood circulation may become less efficient",
      ["Blood vessels may stop exchanging materials","White blood cells may stop functioning","Platelets may increase clotting activity"],
      "An irregular heartbeat from SA node disruption means blood is not pumped efficiently, reducing circulation throughout the body. Blood vessels still exchange materials passively. White blood cells and platelets function independently of heart rhythm.",
      {});
  }
]),["Think about what the heart's job is and what makes it effective. If the rhythm controlling that pumping becomes irregular, what happens to the consistency and efficiency of blood circulation throughout the body?"]);
E("bio-u3-78-q35",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("During a lab simulation, a student's heart rate increases from 70 bpm to 120 bpm during exercise. Why is this response beneficial?",
      "It increases circulation to meet metabolic demands",
      ["It decreases oxygen delivery to tissues","It prevents carbon dioxide production","It reduces nutrient transport"],
      "A higher heart rate during exercise delivers more oxygen and nutrients to working muscles and removes CO\u2082 faster, meeting the increased metabolic demands. It does not decrease oxygen delivery, prevent CO\u2082 production, or reduce nutrient transport.",
      {});
  }
]),["During exercise, muscles need more oxygen and produce more CO\u2082. What does increasing heart rate accomplish for those needs?"]);
E("bio-u3-78-q36",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A blood test shows a person has a very low hemoglobin concentration. Which symptom is most likely to result?",
      "Difficulty delivering oxygen to cells",
      ["Excessive blood clotting","Increased antibody production","Reduced digestion of nutrients"],
      "Hemoglobin that binds and transports oxygen, so low concentration would reduce oxygen delivery. Platelets clot wounds. Hemoglobin is not involved in antibody production or nutrient digestion.",
      {});
  }
]),["What is the role of hemoglobin in the blood? Symptoms of anemia include unusual fatigue, weakness, pale skin, shortness of breath, and lightheadedness. What could be the root cause of these symptoms?"]);
E("bio-u3-78-q37",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A patient has a condition that significantly reduces red blood cell production. Which symptom would most likely result?",
      "Reduced oxygen delivery to tissues",
      ["Increased clotting ability","Increased immunity","Reduced transport of hormones"],
      "Fewer red blood cells means less haemoglobin and reduced oxygen-carrying capacity, leading to reduced oxygen delivery to tissues. Clotting ability involves platelets. Immunity involves white blood cells. Hormone transport is by plasma.",
      {});
  }
]),["Fewer red blood cells means less haemoglobin. What does less haemoglobin mean for oxygen delivery?"]);
E("bio-u3-78-q38",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A blood test reveals an unusually low platelet count. Which outcome is most likely?",
      "Greater risk of prolonged bleeding",
      ["Decreased oxygen transport","Reduced antibody production","Reduced nutrient transport"],
      "Low platelet count means the body cannot form blood clots effectively, resulting in greater risk of prolonged bleeding. Platelets do not carry oxygen or produce antibodies. Nutrient transport is done by plasma and red blood cells.",
      {});
  }
]),["Think about what platelets do when a blood vessel is injured. What step in the repair process would be missing or incomplete if there were very few platelets available?"]);
E("bio-u3-78-q39",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A patient develops a severe bacterial infection. Which blood component would most likely increase in number?",
      "White blood cells",
      ["Platelets","Plasma proteins","Red blood cells"],
      "White blood cells are the immune cells that multiply in response to infection. They engulf bacteria (macrophages) and produce antibodies (lymphocytes). Platelets clot wounds. Plasma proteins include clotting factors and antibodies but the main proliferating cells are white blood cells. Red blood cells carry oxygen.",
      {});
  }
]),["Bacteria are foreign invaders. Which blood cell type is specifically designed to fight infection?"]);
E("bio-u3-78-q40",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A student exercises vigorously on a hot day. Which circulatory response helps maintain homeostasis?",
      "Vasodilation of skin blood vessels",
      ["Vasoconstriction of skin blood vessels","Increased clotting in capillaries","Reduced blood flow to the skin"],
      "Vasodilation of skin blood vessels brings warm blood to the surface, allowing heat to radiate away and cooling the body. Vasoconstriction (A, D) would keep heat in the core. Clotting is unrelated to temperature regulation.",
      {});
  }
]),["During vigorous exercise on a hot day, the body produces heat from both exercise and the environment. Which circulatory response moves heat from the core to the skin?"]);
E("bio-u3-78-q41",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A person walks outside into very cold weather. Why does vasoconstriction occur?",
      "To reduce heat loss and conserve body temperature",
      ["To increase heat loss from the skin","To increase oxygen absorption in the lungs","To stimulate platelet activity"],
      "Vasoconstriction reduces blood flow to the skin, keeping warm blood in the body's core, reducing heat loss and conserving body temperature. Increasing heat loss from the skin would worsen the cold. Oxygen absorption in the lungs is unrelated. Platelet activity is unrelated to cold exposure.",
      {});
  }
]),["Think about the relationship between blood vessel diameter near the skin and heat exchange with the environment. If the body needs to keep heat inside, should blood vessels near the skin surface open wider or narrow?"]);
E("bio-u3-78-q42",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Two students are exposed to high temperatures. Student A experiences vasodilation, while Student B does not. Which student is more likely to overheat?",
      "Student B because heat loss is reduced",
      ["Student A because heat loss increases","Student A because blood flow decreases","Student B because oxygen transport increases"],
      "Student B does not vasodilate, so warm blood stays away from the skin surface and heat loss is reduced. Less heat released means more heat retained, so Student B is more likely to overheat. Student A vasodilates and sheds heat effectively, reducing that risk.",
      {});
  }
]),["Think about how heat leaves the body, blood carries heat from the core toward the skin, where it can radiate away. If blood vessels near the skin don't widen, what happens to that heat transfer process?"]);
E("bio-u3-78-q43",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Why are capillary walls only one cell thick?",
      "To allow efficient exchange of materials",
      ["To increase blood pressure","To prevent oxygen from leaving the blood","To reduce nutrient absorption"],
      "Capillary walls that are only one cell thick allow O\u2082, CO\u2082, nutrients, and waste to pass through by diffusion between blood and surrounding tissue cells. They do not increase blood pressure, prevent oxygen from leaving, or reduce nutrient absorption.",
      {});
  }
]),["Capillary walls are just one cell thick. What does this thinness allow to happen between blood and surrounding tissues?"]);
E("bio-u3-78-q44",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A toxin damages capillary walls throughout the body. Which process would be affected most directly?",
      "Exchange of oxygen, nutrients, and wastes",
      ["Heart contractions","Production of blood cells","Transport of blood to the lungs"],
      "Capillary walls are the site of exchange between blood and tissues. Toxin damage to these walls disrupts the exchange of oxygen, nutrients, and wastes at the cellular level. Heart contractions and blood cell production are elsewhere. Transport of blood to the lungs occurs in larger vessels.",
      {});
  }
]),["Think about what capillaries are designed to do: they are the site of exchange between the blood and surrounding tissues. What would happen to that exchange if the walls of those capillaries were compromised?"]);
E("bio-u3-78-q45",3,["7.8", "7.9"],1,"var",varset([
  function(){
    return mcq("Blood clotting is considered a positive feedback mechanism because:",
      "clotting factors accelerate additional clot formation",
      ["platelets reduce blood flow through arteries","red blood cells increase oxygen transport","white blood cells stimulate immune responses"],
      "Clotting factors released by platelets attract more platelets and activate more clotting factors, this self-amplifying cycle accelerates clot formation. Platelets do not reduce blood flow through arteries. Red blood cells and serotonin transport are unrelated (C, D).",
      {});
  }
]),["Think about what positive feedback means, it amplifies a response rather than reversing it. Does blood clotting get stronger or weaker as more clotting factors are released?"]);
E("bio-u3-78-q46",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("A small cut continues to seal as more clotting factors are activated near the wound. Why is this response beneficial?",
      "It amplifies the response until the injury is sealed",
      ["It decreases oxygen delivery to the injured tissue","It prevents platelets from reaching the wound","It reduces the concentration of clotting proteins"],
      "Each platelet release amplifies the response by attracting more platelets - this is positive feedback, where the response intensifies (amplifies) the original stimulus. None of the other options would be beneficial in helping seal the wound.",
      {});
  }
]),["Each platelet release triggers more platelet accumulation. Is this a self-amplifying (positive) or self-correcting (negative) feedback loop?"]);
E("bio-u3-78-q47",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("An athlete's resting heart rate drops from 72 bpm to 54 bpm after months of training. What does this change indicate?",
      "Increased cardiac efficiency",
      ["Decreased stroke volume","Lowered blood volume","Weakened heart muscle"],
      "A lower resting heart rate after training indicates the heart pumps more blood per beat (increased stroke volume), requiring fewer beats per minute to maintain cardiac output: this is increased cardiac efficiency. Stroke volume increases (A is wrong). Blood volume typically increases with training. A trained heart is stronger, not weaker.",
      {});
  }
]),["A lower resting heart rate after training means the heart pumps more blood per beat. What does this tell you about the heart's efficiency?"]);
E("bio-u3-78-q48",3,["7.8", "7.9"],2,"var",varset([
  function(){
    return mcq("Two students complete the same stair-climbing activity. Student A's heart rate returns to resting levels within 3 minutes, while Student B's heart rate remains elevated after 10 minutes. What can be concluded?",
      "Student A has better cardiovascular fitness.",
      ["Student A has lower stroke volume.","Student B has greater oxygen-carrying capacity.","Student B requires less energy during exercise."],
      "Student A's heart rate returns to resting levels faster, indicating a more efficient cardiovascular system that can restore homeostasis quickly. Lower stroke volume would be less efficient. Student B cannot recover quickly, suggesting less fitness. Less energy required at rest doesn't explain the slower recovery.",
      {});
  }
]),["Recovery time after exercise reflects how efficiently the heart and lungs restore normal conditions. Which student's cardiovascular system responds more efficiently?"]);
E("bio-u3-78-q49",3,["7.8", "7.9"],3,"var",varset([
  function(){
    return mcq("A trained athlete and an untrained individual are running at the same speed. The athlete's heart rate is lower. Which explanation best accounts for this observation?",
      "The athlete has increased stroke volume.",
      ["The athlete has fewer capillaries supplying muscles.","The athlete produces less ATP.","The athlete uses anaerobic respiration exclusively."],
      "A trained athlete has a larger, stronger heart that pumps more blood per beat (increased stroke volume). At the same speed, the athlete needs fewer beats to deliver sufficient oxygen. Fewer capillaries would reduce, not improve, muscle oxygen delivery. Elite athletes produce more ATP through aerobic pathways. Athletes primarily use aerobic respiration.",
      {});
  }
]),["A lower heart rate at the same running speed means the heart doesn't need to beat as often to deliver adequate blood. What has changed about each beat's output?"]);

/* ---------- 7.10 Immunity, Vaccines & Antibiotics ---------- */
E("bio-u3-710-q01",3,["7.10"],2,"var",varset([
  function(){
    return mcq("Researchers receive government funding to study the effects of exercise on long-term health. Which statement best explains why this research was supported?",
      "Public concern about maintaining health influences research priorities.",
      ["Governments only fund research involving technology.","Scientists choose research topics independently of society.","The study has no connection to societal needs."],
      "Research funding often reflects societal values and public health priorities. Public concern about health and fitness influences which research governments choose to fund. Governments fund a wide range of research beyond just technology. Scientists are influenced by available funding and societal needs. Health research directly addresses societal needs.",
      {});
  }
]),["Research funding often reflects what society values. If the public cares about health and fitness, how does that influence what gets funded?"]);
E("bio-u3-710-q02",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which specific type of protein is dissolved in blood plasma to recognize and bind to foreign antigens?",
      "Antibodies",
      ["Fibrinogens","Hemoglobins","Hormones"],
      "Antibodies are Y-shaped proteins dissolved in blood plasma that bind to specific antigens on pathogens. Fibrinogens are clotting proteins. Hemoglobin is in red blood cells. Hormones are chemical messengers from endocrine glands.",
      {});
  }
]),["Think about the specific proteins produced by B cells during an immune response. These proteins are released into the blood and are shaped to bind precisely to a specific foreign molecule. What are they called?"]);
E("bio-u3-710-q03",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which type of white blood cell is primarily responsible for engulfing and digesting cellular debris and pathogens?",
      "Macrophage",
      ["B-cell","Red blood cell","T-cell"],
      "Macrophages are large white blood cells that engulf and digest pathogens, dead cells, and cellular debris through phagocytosis. B-cells produce antibodies. Red blood cells carry oxygen. T-cells coordinate immune responses and kill infected cells.",
      {});
  }
]),["What cell uses the process of phagocytosis, described as the 'eating' of foreign material?"]);
E("bio-u3-710-q04",3,["7.10"],2,"var",varset([
  function(){
    return mcq("How does the immune response contribute to the maintenance of homeostasis?",
      "By eliminating disruptive pathogens",
      ["By decreasing core body temperature","By increasing blood glucose levels","By slowing down metabolic rates"],
      "The immune response eliminates pathogens that would otherwise disrupt normal body functions, helping maintain stable internal conditions. Immune responses can temporarily raise body temperature (not decrease, A). Blood glucose is not regulated by the immune system. Metabolic rates typically increase during immune responses.",
      {});
  }
]),["Think about what pathogens do to the body's internal environment. What does removing them allow the body to return to?"]);
E("bio-u3-710-q05",3,["7.10"],2,"var",varset([
  function(){
    return mcq("A student develops a bacterial infection after receiving a deep cut. Which immune response would most likely occur first?",
      "Macrophages engulf invading bacteria.",
      ["Antibodies immediately destroy all pathogens.","Red blood cells attack the bacteria.","Toxins are released by platelets."],
      "The first line of cellular defence is the macrophage, which engulfs and digests bacteria through phagocytosis. Antibodies are produced later by B-cells and are not immediately available. Red blood cells do not attack bacteria. Platelets are involved in clotting, not attacking bacteria.",
      {});
  }
]),["The body's first response to a wound and bacteria is a rapid, non-specific response. Which immune cell arrives first and engulfs the bacteria?"]);
E("bio-u3-710-q06",3,["7.10"],2,"var",varset([
  function(){
    return mcq("A patient has a reduced number of functional lymphocytes. Which outcome would most likely result?",
      "Reduced ability to recognize pathogens",
      ["Faster blood clotting","Increased antibody production","Reduced oxygen transport"],
      "Lymphocytes (B and T cells) produce antibodies and recognize specific pathogens. Reduced lymphocytes means reduced ability to recognize and mount a specific immune response against pathogens. Faster clotting involves platelets. Antibody production would decrease, not increase. Oxygen transport is by red blood cells.",
      {});
  }
]),["Lymphocytes produce antibodies and identify pathogens. If fewer are functional, what happens to the body's ability to mount a specific immune response?"]);
E("bio-u3-710-q07",3,["7.10"],2,"var",varset([
  function(){
    return mcq("A person is exposed to a virus for the second time several months after recovering from an infection. Why is the immune response likely to be faster?",
      "Memory cells recognize the pathogen.",
      ["More red blood cells are produced.","Plasma volume decreases.","White blood cells are no longer needed."],
      "Memory cells are formed after the first immune response. They recognize the same pathogen quickly during a second exposure, allowing a faster, stronger immune response. More red blood cells would not help fight viruses. Plasma volume is unrelated. White blood cells are still needed, memory cells are a type of white blood cell.",
      {});
  }
]),["Think about what happens after your immune system successfully fights off an infection for the first time. Does the immune system retain any information about that pathogen for future encounters?"]);
E("bio-u3-710-q08",3,["7.10"],2,"var",varset([
  function(){
    return mcq("A patient with a severely weakened immune system contracts a minor infection that becomes life-threatening. Which conclusion best explains the importance of homeostasis?",
      "Immune responses help maintain stable internal conditions.",
      ["Homeostasis depends on constant ATP production only.","Pathogens are necessary for normal body function.","White blood cells only function during severe illness."],
      "Without a functional immune system, pathogens can multiply unchecked, severely disrupting homeostasis. This illustrates that immune responses are essential for maintaining stable internal conditions. Homeostasis requires more than ATP production alone. Pathogens are not necessary: they are threats to be eliminated. White blood cells function as an ongoing defense.",
      {});
  }
]),["Without a functioning immune system, even a minor infection can overwhelm the body. What does this tell us about the immune system's role in maintaining stable internal conditions?"]);
E("bio-u3-710-q09",3,["7.10"],1,"var",varset([
  function(){
    return mcq("What is the purpose of introducing a weakened or killed pathogen into the body through vaccination?",
      "To prompt the immune system to generate memory cells",
      ["To deliver active antibodies directly to the bloodstream","To destroy existing pathogens before they cause cellular damage","To stimulate the rapid production of red blood cells"],
      "Vaccination introduces a harmless antigen, prompting the immune system to produce memory cells without causing disease. This provides rapid immune protection upon future exposure. Vaccines do not deliver ready-made antibodies. Vaccines do not destroy existing pathogens. Red blood cell production is unrelated to vaccination.",
      {});
  }
]),["Vaccination introduces a harmless version of a pathogen. What does the immune system produce in response that provides future protection?"]);
E("bio-u3-710-q10",3,["7.10"],2,"var",varset([
  function(){
    return mcq("Researchers continually modify vaccines to target emerging strains of pathogens. Why is this necessary?",
      "Pathogens can change over time.",
      ["The immune system stops functioning after vaccination.","Vaccines permanently eliminate all microorganisms.","White blood cells become ineffective after exposure."],
      "Pathogens, especially viruses, can mutate and change their surface antigens over time. If the antigens change enough, existing vaccines targeting the old strain may not recognize the new one. Immune systems continue to function after vaccination. Vaccines do not eliminate all microorganisms. White blood cells remain effective.",
      {});
  }
]),["Think about what a vaccine is designed to target on a pathogen. If the pathogen changes that target over time through mutation, what happens to the effectiveness of the original vaccine?"]);
E("bio-u3-710-q11",3,["7.10"],2,"var",varset([
  function(){
    return mcq("A patient stops taking prescribed antibiotics after two days because symptoms improve. Why is this practice discouraged?",
      "It can contribute to antibiotic-resistant bacteria.",
      ["It increases antibody production.","It improves long-term immunity.","It prevents bacterial adaptation."],
      "Stopping antibiotics early means some bacteria may survive, those that are most resistant. Resistant bacteria can contribute to populations of antibiotic-resistant bacteria. Early antibiotic cessation does not increase antibody production or improve immunity. Stopping early actually allows bacterial adaptation, not prevents it.",
      {});
  }
]),["Stopping antibiotics early means some bacteria survive. What happens to bacteria that survive exposure to an antibiotic?"]);
E("bio-u3-710-q12",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which outcome represents an unintended consequence of widespread antibiotic use?",
      "Antibiotic-resistant bacterial populations",
      ["Increased immunity through memory cells","Reduced bacterial survival during treatment","Reduced mortality from bacterial infections"],
      "Widespread antibiotic use selects for bacteria that are resistant. These survive, reproduce, and pass on resistance, creating antibiotic-resistant bacterial populations. Memory cells are produced by the immune system, not antibiotics. Antibiotics do reduce bacterial survival but also create resistance. Reduced mortality is an intended effect, not an unintended consequence.",
      {});
  }
]),["If some bacteria survive antibiotic treatment and reproduce, what trait gets passed on to their offspring?"]);

/* ---------- 7.11 The Human Respiratory System ---------- */
E("bio-u3-711-q01",3,["7.11"],2,"var",varset([
  function(){
    return mcq("How does the respiratory system help maintain homeostasis?",
      "By removing carbon dioxide and supplying oxygen",
      ["By regulating blood glucose levels","By producing hormones that control metabolism","By transporting nutrients throughout the body"],
      "The respiratory system removes CO\u2082 (a waste product) and supplies O\u2082 (needed for cellular respiration), directly maintaining homeostasis. Blood glucose is regulated by the pancreas. Hormones controlling metabolism come from the endocrine system. Nutrient transport is the circulatory system.",
      {});
  }
]),["Think about the two main gases involved in cellular respiration, one that cells need and one that is a waste product. What does the respiratory system do with each of them to keep the body in balance?"]);
E("bio-u3-711-q02",3,["7.11"],2,"var",varset([
  function(){
    return mcq("A student holds their breath for an extended period. Which change would most directly stimulate an increase in breathing rate?",
      "Increased carbon dioxide concentration in the blood",
      ["Decreased carbon dioxide concentration in the blood","Decreased oxygen use by body cells","Increased glucose concentration in the blood"],
      "When you hold your breath, CO\u2082 builds up in the blood. The brain detects increased CO\u2082 concentration and triggers faster breathing to remove it. Decreased CO\u2082 would reduce breathing rate. Decreased oxygen use doesn't directly stimulate breathing changes. Blood glucose is not a breathing trigger.",
      {});
  }
]),["Think about what accumulates in the blood when you stop breathing and what the brain uses to detect the need to breathe. Which chemical change is the actual trigger for increasing breathing rate?"]);
E("bio-u3-711-q03",3,["7.11"],2,"var",varset([
  function(){
    return mcq("A patient has a disease that significantly reduces gas exchange in the lungs. Which homeostatic imbalance would most likely occur first?",
      "Blood oxygen levels decrease",
      ["Blood pressure decreases","Body temperature increases","Digestive enzyme production decreases"],
      "If gas exchange in the lungs is reduced, less O\u2082 enters the blood, blood oxygen levels decrease. This would be the first and most immediate homeostatic imbalance. Blood pressure changes would follow. Body temperature is regulated separately. Digestive enzyme production is unrelated.",
      {});
  }
]),["Think about what gas exchange in the lungs accomplishes. If that process is impaired, which substance fails to enter the blood in sufficient quantities, and what is the immediate consequence of that shortage?"]);
E("bio-u3-711-q04",3,["7.11"],2,"var",varset([
  function(){
    return mcq("During intense exercise, muscle cells produce carbon dioxide at an increased rate. How does the respiratory system respond to maintain homeostasis?",
      "Breathing rate increases to remove excess carbon dioxide",
      ["Breathing rate decreases to conserve energy","Heart rate decreases to reduce oxygen demand","Oxygen diffusion into the blood decreases"],
      "Increased CO\u2082 signals the brain to increase breathing rate, removing the excess CO\u2082 and bringing in more O\u2082. Breathing rate decreasing would worsen CO\u2082 buildup. Heart rate is a separate response. Oxygen diffusion would need to increase.",
      {});
  }
]),["Think about what accumulates in the blood during intense exercise as muscles work harder. What does the brain detect, and what does it signal the body to do in response?"]);
E("bio-u3-711-q05",3,["7.11"],1,"var",varset([
  function(){
    return mcq("Which structure is the primary site of gas exchange between the respiratory and circulatory systems?",
      "Alveoli",
      ["Bronchi","Bronchioles","Trachea"],
      "Alveoli are the tiny air sacs at the end of the bronchioles where gas exchange occurs: they have thin walls and enormous surface area. Bronchi and bronchioles conduct air but are not the exchange surface. The trachea is the main airway.",
      {});
  }
]),["Gas exchange means O\u2082 moves into blood and CO\u2082 moves out. Which lung structure has the thin walls and large surface area needed for this exchange?"]);
E("bio-u3-711-q06",3,["7.11"],2,"var",varset([
  function(){
    return mcq("A patient has a blockage in the bronchioles. Which effect would most likely occur?",
      "Difficulty moving air to the alveoli",
      ["Inability to swallow food","Reduced filtering of incoming air","Reduced production of mucus"],
      "The bronchioles are the small airways that lead to the alveoli. A blockage prevents air from reaching the alveoli, causing difficulty moving air to the gas exchange surface. Swallowing is controlled by the epiglottis. Air filtering is done by nasal hairs and mucus. Mucus production would not be directly reduced by a blockage.",
      {});
  }
]),["Think about where the bronchioles sit in the airway pathway: they are the passages that lead air from the larger bronchi toward the tiny air sacs where gas exchange occurs. What would a blockage at that point prevent?"]);
E("bio-u3-711-q07",3,["7.11"],1,"var",varset([
  function(){
    return mcq("What happens to the diaphragm during inhalation?",
      "It contracts and moves downward",
      ["It contracts and moves upward","It relaxes and moves downward","It relaxes and moves upward"],
      "During inhalation, the diaphragm contracts and moves downward, increasing the volume of the thoracic cavity and decreasing air pressure inside the lungs, causing air to flow in. Upward movement (B, C) would decrease lung volume. Relaxation causes exhalation.",
      {});
  }
]),["The diaphragm is a dome-shaped muscle below the lungs. When it contracts, does it flatten (move down) or dome up? What does this do to lung volume?"]);
E("bio-u3-711-q08",3,["7.11"],2,"var",varset([
  function(){
    return mcq("A puncture wound causes air to enter the pleural cavity surrounding one lung. What effect would this most likely have?",
      "Lung expansion is impaired",
      ["Gas exchange becomes more efficient","Oxygen demand decreases","Respiratory rate immediately stops"],
      "The lungs expand because air pressure inside is lower than outside. If air enters the pleural cavity through a puncture, it equalizes pressure, and the lung can no longer expand properly: lung expansion is impaired. Gas exchange becomes less efficient (A is backwards). Oxygen demand doesn't decrease. Respiratory rate may increase as compensation.",
      {});
  }
]),["Think about how the lungs normally expand during inhalation, it relies on a pressure difference between the inside and outside of the lung. What happens to that pressure relationship when outside air enters a normally sealed space around the lung?"]);
E("bio-u3-711-q09",3,["7.11"],1,"var",varset([
  function(){
    return mcq("Which term describes the amount of air moved into or out of the lungs during a normal breath?",
      "Tidal volume",
      ["Expiratory reserve volume","Residual volume","Vital capacity"],
      "Tidal volume is the air moved in or out during a normal, relaxed breath, the 'tide' of regular breathing. Expiratory reserve volume is extra air you can forcefully exhale. Residual volume stays in the lungs. Vital capacity is the total air you can move in one breath.",
      {});
  }
]),["Think about the different measurements used to describe breathing, there is one that refers specifically to a quiet, normal breath, not a forced maximum inhale or exhale. What term describes the air moved during ordinary breathing?"]);
E("bio-u3-711-q10",3,["7.11"],2,"var",varset([
  function(){
    return mcq("A student measures a person's vital capacity. Which combination of volumes contributes to this measurement?",
      "Expiratory reserve volume + tidal volume + inspiratory reserve volume",
      ["Expiratory reserve volume + tidal volume + residual volume","Inspiratory reserve volume + residual volume","Residual volume + tidal volume"],
      "Vital capacity = tidal volume + inspiratory reserve volume + expiratory reserve volume, all the air you can voluntarily move. Residual volume (B, C, D) remains in the lungs and cannot be exhaled voluntarily, so it is NOT part of vital capacity.",
      {});
  }
]),["Vital capacity is the maximum air you can move in one breath. Which volumes, tidal, inspiratory reserve, expiratory reserve, residual, are under your voluntary control?"]);
E("bio-u3-711-q11",3,["7.11", "7.10"],1,"var",varset([
  function(){
    return mcq("Which environmental factor is most likely to irritate the respiratory tract and trigger inflammation?",
      "Cigarette smoke",
      ["Moderate humidity","Normal atmospheric pressure","Visible light"],
      "Cigarette smoke contains irritants, carcinogens, and toxins that damage and inflame the respiratory tract lining. Moderate humidity is beneficial. Normal atmospheric pressure does not irritate. Visible light does not affect the respiratory tract.",
      {});
  }
]),["Think about how the respiratory tract responds when it detects harmful or irritating substances. What defence responses does the airway lining trigger when it is irritated?"]);
E("bio-u3-711-q12",3,["7.11", "7.10"],2,"var",varset([
  function(){
    return mcq("A worker is exposed to airborne dust particles daily. Which respiratory response helps protect homeostasis?",
      "Increased mucus production and coughing",
      ["Increased sneezing and nasal filtration","Reduced breathing rate","Reduced heart rate"],
      "The respiratory system responds to airborne particles by increasing mucus production (to trap particles) and coughing (to expel them). Sneezing and nasal filtration are initial defenses. Reduced breathing rate would trap more particles. Reduced heart rate is unrelated to respiratory protection.",
      {});
  }
]),["Think about the two main defence mechanisms the respiratory system uses to physically clear particles from the airways. One traps particles; the other expels them."]);
E("bio-u3-711-q13",3,["7.11"],1,"var",varset([
  function(){
    return mcq("Which structure functions to warm, moisten, and filter incoming air before it enters the lower respiratory tract?",
      "Nasal cavity",
      ["Alveoli","Bronchioles","Trachea"],
      "The nasal cavity warms, moistens, and filters air. Cilia and mucus trap particles; blood vessels near the surface warm the air; moisture is added to prevent drying of the airways. Alveoli are for gas exchange. Bronchioles conduct air but do not primarily warm or filter it. The trachea also has cilia and mucus but is not the first or primary site.",
      {});
  }
]),["Think about the first part of the airway that incoming air passes through. What structural features of that region are suited to preparing air before it reaches the delicate lower respiratory surfaces?"]);
E("bio-u3-711-q14",3,["7.11"],1,"var",varset([
  function(){
    return mcq("During swallowing, which structure prevents food from entering the airway?",
      "Epiglottis",
      ["Bronchus","Pharynx","Trachea"],
      "The epiglottis is a cartilaginous flap that covers the trachea during swallowing, preventing food from entering the airway. The bronchus is lower in the airway. The pharynx is the throat, food passes through it. The trachea is what the epiglottis protects.",
      {});
  }
]),["Think about the structures at the back of the throat and what happens physically when you swallow. What needs to be covered or closed to make sure food goes to the oesophagus rather than the airway?"]);
E("bio-u3-711-q15",3,["7.11"],1,"var",varset([
  function(){
    return mcq("Which volume of air always remains in the lungs to prevent alveoli from collapsing, even after a forced exhalation?",
      "Residual volume",
      ["Inspiratory reserve volume","Tidal volume","Vital capacity"],
      "Residual volume is the air that always remains in the lungs after maximum exhalation, preventing alveoli from collapsing. Inspiratory reserve volume is extra air you can inhale. Tidal volume is normal breathing volume. Vital capacity is the maximum moveable air.",
      {});
  }
]),["After a maximum forced exhalation, some air remains. This prevents the alveoli from sticking shut. What is this remaining volume called?"]);
E("bio-u3-711-q16",3,["7.11", "7.10"],2,"var",varset([
  function(){
    return mcq("A person inhales pollen and experiences airway swelling and increased mucus production. What is the most likely explanation?",
      "An allergic response has been triggered",
      ["Blood glucose levels have increased","Carbon dioxide levels have decreased","Lung capacity has permanently increased"],
      "Inhaled pollen triggers an allergic immune response, the immune system overreacts to the pollen, causing inflammation, airway swelling, and mucus production. Blood glucose, CO\u2082 levels, and lung capacity are not directly triggered by pollen inhalation.",
      {});
  }
]),["Think about what an allergic response is: it is the immune system reacting to a normally harmless substance as though it were a threat. What are the physical signs of that immune reaction occurring in the airways?"]);
E("bio-u3-711-q17",3,["7.11", "7.10"],2,"var",varset([
  function(){
    return mcq("A doctor administers a bronchodilator during an allergic asthma attack. Why does this treatment help restore homeostasis?",
      "It increases airflow through the bronchioles",
      ["It decreases inflammation in the digestive tract","It increases mucus production","It prevents oxygen from entering the blood"],
      "A bronchodilator widens (dilates) the bronchioles, which were narrowed during the asthma attack, restoring airflow to the alveoli and improving gas exchange. It does not decrease digestive inflammation. It reduces, not increases, mucus production. It allows more oxygen into the blood, not prevents it.",
      {});
  }
]),["A bronchodilator relaxes and widens the bronchioles. If bronchioles are narrowed during an asthma attack, what does widening them restore?"]);
E("bio-u3-711-q18",3,["7.11", "7.10"],2,"var",varset([
  function(){
    return mcq("A student with untreated allergies consistently experiences reduced oxygen intake during physical activity. Which body system would most likely be affected first by the resulting decrease in oxygen availability?",
      "Circulatory system",
      ["Digestive system","Integumentary system","Reproductive system"],
      "The circulatory system is responsible for distributing oxygen-carrying red blood cells throughout the body. Reduced oxygen in the blood would be felt first by tissues with high oxygen demands, including the heart, which is part of the circulatory system. The digestive system has lower oxygen demands. The integumentary and reproductive systems are less immediately affected.",
      {});
  }
]),["Think about what system is responsible for moving oxygen from the lungs to every cell in the body. If less oxygen is available to enter that system, which system would be the first to feel the effects of that shortage?"]);

/* ---------- 7.12 Digestive System & Nutrition ---------- */
E("bio-u3-712-q01",3,["7.12", "7.13"],1,"var",varset([
  function(){
    return mcq("Which organ is primarily responsible for the absorption of water and the formation of feces?",
      "Large intestine",
      ["Liver","Small intestine","Stomach"],
      "The large intestine absorbs water from the remaining indigestible material and compacts it into feces. The liver produces bile. The small intestine absorbs most nutrients. The stomach digests food chemically and mechanically.",
      {});
  }
]),["Think about what happens to food material after nutrients have been absorbed, and where that happens? Absorption of water and formation of feces are the last steps before elimination."]);
E("bio-u3-712-q02",3,["7.12", "7.13"],1,"var",varset([
  function(){
    return mcq("Which structure is primarily responsible for absorbing most nutrients into the bloodstream?",
      "Small intestine",
      ["Large intestine","Rectum","Stomach"],
      "The small intestine has a large surface area (from villi and microvilli) and receives digestive enzymes from the pancreas and bile from the gallbladder, making it the primary site of nutrient absorption. The large intestine primarily absorbs water. The rectum stores feces. The stomach digests but does not absorb most nutrients.",
      {});
  }
]),["Most chemical digestion and absorption happen in the long, folded tube between the stomach and large intestine. Which organ is this?"]);
E("bio-u3-712-q03",3,["7.12", "7.13"],1,"var",varset([
  function(){
    return mcq("Which structure stores and concentrates bile before releasing it into the small intestine?",
      "Gallbladder",
      ["Liver","Pancreas","Stomach"],
      "The gallbladder stores and concentrates bile produced by the liver, releasing it into the small intestine when needed for fat digestion. The liver produces bile. The pancreas produces digestive enzymes. The stomach does not store bile.",
      {});
  }
]),["The liver produces bile, but doesn't store it. Which small organ stores and concentrates bile until it's needed for fat digestion?"]);
E("bio-u3-712-q04",3,["7.12", "7.13"],2,"var",varset([
  function(){
    var q=mcq("A student eats a meal rich in starch. In which labeled structures will chemical digestion of this carbohydrate occur?",
      "W and Y",
      ["W and X","X and Y","Y and Z"],
      "Starch digestion begins in the mouth (W) with salivary amylase, and continues in the small intestine (Y) with pancreatic amylase and other carbohydrases. X points to the stomach (not a site of carbohydrate digestion). Z is the large intestine (water absorption, not carbohydrate digestion). Answer: W and Y.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-712-q04.png" alt="Diagram of the human digestive system in a torso with four labels: W points to the mouth; X points to the J-shaped sac tucked under the large dark-brown organ in the upper abdomen; Y points to the mass of narrow coiled tubing in the centre of the abdomen; Z points to the wider tube that frames the coils" style="max-width:100%;height:auto">';
    return q;
  }
]),["Recall which digestive enzymes break down starch and where in the body they are active. Think about the journey a starch molecule takes from the moment food enters the mouth."]);
E("bio-u3-712-q05",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("A medication is designed to block the activity of pepsin. Which organ's digestion function will be directly affected by this drug?",
      "Stomach",
      ["Mouth","Pancreas","Small intestine"],
      "Pepsin is a protease enzyme produced and active in the stomach. Blocking it affects protein digestion in the stomach specifically. The mouth uses salivary amylase for carbohydrates. The pancreas produces its own proteases. The small intestine uses different proteases.",
      {});
  }
]),["Recall what type of molecule pepsin acts on, and which organ produces pepsin as part of its digestive secretions. Where in the digestive tract does that particular enzyme do its work?"]);
E("bio-u3-712-q06",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("During a lab activity, students compare the digestion of crackers that are chewed thoroughly versus swallowed in large pieces. Why would the thoroughly chewed crackers be digested more quickly?",
      "Chewing increases the surface area available for enzyme action.",
      ["Chewing increases the amount of hydrochloric acid produced.","Chewing prevents carbohydrates from entering the stomach.","Chewing reduces the need for chemical digestion."],
      "Chewing (mechanical digestion) breaks food into smaller pieces, dramatically increasing the total surface area exposed to digestive enzymes, speeding up chemical digestion. Chewing does not increase HCl production. Carbohydrates still enter the stomach. Chewing does not reduce the need for chemical digestion, it enhances it.",
      {});
  }
]),["Think about what determines how quickly enzymes can work on a substance. If you break a large piece of food into many smaller pieces, what changes about the amount of food surface that enzymes can contact?"]);
E("bio-u3-712-q07",3,["7.12", "7.13"],2,"var",varset([
  function(){
    var q=mcq("How does the structure shown in the diagram maximize the function of the small intestine?",
      "It increases surface area for maximum nutrient absorption",
      ["It secretes concentrated enzymes for protein breakdown","It churns food mechanically through muscular contractions","It standardizes the pH levels of incoming acidic chyme"],
      "Intestinal villi are finger-like projections that massively increase the surface area of the small intestine for nutrient absorption. They do not secrete concentrated enzymes. Churning is done by smooth muscle in the stomach and intestine wall. pH is regulated by bicarbonate, not villi.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-712-q07.png" alt="Cross-section diagram of the small intestine wall: rows of tall finger-like projections rise from the surface, each containing a network of tiny red and blue blood vessels, with larger vessels running in the layers beneath" style="max-width:100%;height:auto">';
    return q;
  }
]),["Consider how the shape of the small intestine's inner lining relates to its job of absorbing nutrients. What structural feature would allow more absorption to happen at once?"]);
E("bio-u3-712-q08",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("Why does mechanical digestion speed up chemical digestion in the stomach and small intestine?",
      "It increases the surface area of food",
      ["It activates pepsinogen into pepsin","It neutralizes the pH of the food bolus","It triggers the release of bile"],
      "Mechanical digestion (chewing, churning) physically breaks food into smaller pieces, increasing the surface area that digestive enzymes can act upon, thereby speeding up chemical digestion. Pepsinogen activation by HCl is a separate chemical process. pH neutralization is done by bicarbonate. Bile release is triggered by CCK.",
      {});
  }
]),["What does physically breaking food into smaller pieces through mechanical digestion do to help with chemical digestion?"]);
E("bio-u3-712-q09",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("A meal leaves the stomach and enters the small intestine. Why must bicarbonate be secreted into the duodenum?",
      "To neutralize acidic chyme",
      ["To activate bile salts","To increase stomach acidity","To stimulate saliva production"],
      "Chyme from the stomach is highly acidic. Digestive enzymes in the small intestine (from the pancreas) work best at neutral or slightly alkaline pH. Bicarbonate from the pancreas neutralizes the acid. Bile salts are activated separately. Increasing acidity would damage the intestinal lining. Saliva is produced in the mouth.",
      {});
  }
]),["Chyme from the stomach is acidic. Digestive enzymes in the small intestine work best in a neutral or slightly alkaline environment. What must happen to the pH before digestion can continue?"]);
E("bio-u3-712-q10",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("A patient has a blockage preventing bile from entering the small intestine. Which symptom would most likely result?",
      "Difficulty digesting fats",
      ["Difficulty digesting proteins","Excess absorption of glucose","Increased starch digestion"],
      "Bile emulsifies fats, breaking large fat globules into smaller droplets so lipase can work. Without bile, fat digestion is impaired. Protein digestion uses pepsin and proteases. Glucose absorption is unrelated to bile. Starch digestion uses amylase.",
      {});
  }
]),["Bile emulsifies fats, it breaks large fat droplets into smaller ones. What type of macromolecule would be hardest to digest without bile?"]);
E("bio-u3-712-q11",3,["7.12", "7.13"],1,"var",varset([
  function(){
    return mcq("Which enzyme is responsible for the initial chemical breakdown of starches in the human digestive system?",
      "Amylase",
      ["Lipase","Pepsin","Trypsin"],
      "Salivary amylase begins starch digestion in the mouth. In the small intestine, pancreatic amylase and other carbohydrases continue breaking down starch into simple sugars. Lipase digests fats. Pepsin digests proteins in the stomach. Trypsin digests proteins in the small intestine.",
      {});
  }
]),["Think about where carbohydrate digestion begins in the digestive system and what type of enzyme is responsible. Which enzyme specifically targets starch molecules?"]);
E("bio-u3-712-q12",3,["7.12", "7.13"],1,"var",varset([
  function(){
    return mcq("A person consumes a meal rich in protein. After digestion is complete, which molecules are most likely absorbed into the bloodstream?",
      "Amino acids",
      ["Glycerol molecules only","Polypeptides","Starch molecules"],
      "Proteins are broken down into their monomer building blocks, amino acids, which are absorbed into the bloodstream through the small intestine. Glycerol is a product of fat digestion. Polypeptides are partially digested proteins, not the absorbed form. Starch is a carbohydrate, not a protein product.",
      {});
  }
]),["Think about the structure of proteins at the molecular level. What are the individual building blocks that proteins are broken down into during digestion, and what form would they need to be in before they could cross into the bloodstream?"]);
E("bio-u3-712-q13",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("During a laboratory simulation, students remove lipase from a digestive system model. Which result would most likely occur?",
      "Fat digestion would decrease significantly.",
      ["Carbohydrate digestion would stop completely.","Protein digestion would increase.","Stomach acidity would increase."],
      "Lipase is the enzyme that breaks down fats (lipids) into fatty acids and glycerol. Without lipase, fat digestion decreases significantly. Carbohydrate digestion uses amylase. Protein digestion uses pepsin and proteases. Stomach acidity is regulated by HCl production, not lipase.",
      {});
  }
]),["Lipase is the enzyme that breaks down fats (lipids). If it's removed, which macromolecule can no longer be properly digested?"]);
E("bio-u3-712-q14",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("Following a meal rich in fats and proteins, elevated levels of CCK are detected in the bloodstream. Which response would most likely occur?",
      "Gall bladder contraction and pancreatic enzyme release",
      ["Increased hydrochloric acid secretion in the stomach","Increased water absorption in the colon","Reduced bile release into the small intestine"],
      "CCK is released when fats and proteins enter the small intestine, signaling the gallbladder to contract (release bile) and the pancreas to release digestive enzymes. HCl in the stomach is triggered by gastrin. Water absorption in the colon is regulated separately. CCK stimulates, not reduces, bile release.",
      {});
  }
]),["Think about what CCK is responding to, fats and proteins in the small intestine. Which two organs need to be signalled to help digest those nutrients, and what does each one contribute?"]);
E("bio-u3-712-q15",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("A patient takes an antacid medication that raises their stomach pH to a neutral 7. Which macromolecule's initial chemical digestion will be most severely impacted?",
      "Proteins",
      ["Carbohydrates","Lipids","Nucleic acids"],
      "Pepsin is activated by the low pH (acid) environment in the stomach. HCl is essential for pepsin function. Raising pH to neutral 7 inactivates pepsin, impairing protein digestion. Carbohydrate digestion starts in the mouth and is not pH-dependent in the same way. Fat emulsification uses bile. Nucleic acids are digested by nucleases.",
      {});
  }
]),["Pepsin is activated by HCl (hydrochloric acid) in the stomach. If stomach pH is raised to neutral, can pepsin function properly?"]);
E("bio-u3-712-q16",3,["7.12", "7.13"],3,"var",varset([
  function(){
    return mcq("A patient takes a medication that blocks cholecystokinin (CCK) receptors. Which digestive process will be most severely impaired?",
      "Fat emulsification in the small intestine",
      ["Carbohydrate breakdown in the mouth","Hydrochloric acid production in the stomach","Protein denaturation in the stomach"],
      "CCK signals the gallbladder to contract and release bile into the small intestine, where bile emulsifies fats. Blocking CCK receptors prevents this signal, impairing fat emulsification. Carbohydrate breakdown in the mouth uses amylase. HCl production is stimulated by gastrin. Protein denaturation in the stomach requires HCl and pepsin.",
      {});
  }
]),["Think about what CCK normally signals, and which organ it tells to release bile. What would stop happening if that signal could no longer be received?"]);
E("bio-u3-712-q17",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("Why is maintaining a balanced diet important for maintaining homeostasis?",
      "It allows the body to obtain nutrients needed for normal cell function.",
      ["It eliminates the need for the digestive system to process food.","It prevents all diseases from affecting the body.","It replaces the need for the body to produce hormones."],
      "A balanced diet provides the macronutrients, vitamins, and minerals that cells need for energy production, growth, and maintenance. Without these, normal cell function is disrupted, affecting homeostasis. The digestive system is still needed regardless of diet quality. A balanced diet reduces disease risk but cannot prevent all diseases. The body must still produce hormones from dietary building blocks.",
      {});
  }
]),["A balanced diet provides the raw materials (carbohydrates, proteins, fats, vitamins, minerals) that cells need for energy and maintenance. What happens to homeostasis if those materials aren't available?"]);
E("bio-u3-712-q18",3,["7.12", "7.13"],2,"var",varset([
  function(){
    return mcq("A student eats a food containing peanuts and quickly develops difficulty breathing, swelling, and hives. Which response is occurring?",
      "An allergic immune response causing inflammation and changes in body function",
      ["A digestive response increasing enzyme production to break down proteins","A hormonal response lowering blood glucose levels","A nutritional response increasing vitamin absorption"],
      "The symptoms, difficulty breathing, swelling, hives, appearing rapidly after peanut ingestion describe anaphylaxis, a severe allergic immune response causing inflammation and systemic changes. This is not a normal digestive enzyme response. Blood glucose is not lowered by peanuts. Vitamins are not being absorbed in this process.",
      {});
  }
]),["The student's symptoms (difficulty breathing, swelling, hives) appeared rapidly after eating peanuts. This is a classic description of which type of immune response?"]);

/* ---------- 7.14 The Excretory System ---------- */
E("bio-u3-714-q01",3,["7.14"],1,"var",varset([
  function(){
    return mcq("Which structure of the human excretory system is primarily responsible for filtering blood and producing urine?",
      "Kidney",
      ["Bladder","Ureter","Urethra"],
      "The kidneys filter blood to produce urine, removing waste products and regulating water and ion balance. The bladder stores urine. Ureters transport urine from kidneys to the bladder. The urethra carries urine out of the body.",
      {});
  }
]),["Think about the organs that make up the excretory system. Which one directly processes blood to remove metabolic wastes and produce urine as its main output?"]);
E("bio-u3-714-q02",3,["7.14"],1,"var",varset([
  function(){
    return mcq("Which structure stores urine before it is eliminated from the body?",
      "Bladder",
      ["Kidney","Ureter","Urethra"],
      "The bladder is the hollow muscular organ that stores urine until it is released. The kidneys produce urine. The ureters transport urine to the bladder. The urethra carries urine out of the body.",
      {});
  }
]),["After the kidneys produce urine, it must be stored somewhere before being eliminated. Which structure acts as the holding reservoir?"]);
E("bio-u3-714-q03",3,["7.14"],1,"var",varset([
  function(){
    return mcq("Which tube connects a kidney directly to the urinary bladder?",
      "Ureter",
      ["Nephron","Renal artery","Urethra"],
      "Ureters are the two tubes (one per kidney) that carry urine from the kidneys to the urinary bladder. The nephron is the functional unit inside the kidney. The renal artery brings blood to the kidney. The urethra carries urine from the bladder out of the body.",
      {});
  }
]),["There are two tubes connecting each kidney to the bladder, one per kidney. What are they called?"]);
E("bio-u3-714-q04",3,["7.14"],1,"var",varset([
  function(){
    return mcq("Which organ contributes to excretion by removing carbon dioxide and water vapour from the body?",
      "Lungs",
      ["Kidneys","Liver","Skin"],
      "The lungs excrete CO\u2082 and water vapour as byproducts of cellular respiration, removed with every exhalation. Kidneys excrete urea and other solutes in urine. The liver converts ammonia to urea but excretion is via kidneys. Skin excretes some water and salts through sweat.",
      {});
  }
]),["Think about what excretion means, removing metabolic waste products from the body. Which organ releases CO\u2082 and water vapour produced by cellular respiration with every breath you take?"]);
E("bio-u3-714-q05",3,["7.14"],1,"var",varset([
  function(){
    return mcq("Through which structure does urine leave the body?",
      "Urethra",
      ["Gallbladder","Ureter","Urinary bladder"],
      "Urine travels from the bladder to outside the body through the urethra. The gallbladder stores bile. Ureters transport urine from kidneys to bladder, not out of the body. The urinary bladder stores urine: it does not expel it.",
      {});
  }
]),["Urine leaves the bladder and travels out of the body. Which tube does it travel through to exit?"]);
E("bio-u3-714-q06",3,["7.14"],2,"var",varset([
  function(){
    return mcq("High blood pressure can damage the delicate filtering units inside the kidney, leading to kidney disease. Which of the following would most likely occur if this filtration process fails?",
      "Toxins build up in the blood",
      ["Blood pressure decreases rapidly","Excess water is absorbed","Urine production increases dramatically."],
      "If filtration fails, waste products and excess substances that should be removed cannot exit the blood, they build up in the bloodstream, becoming toxic. Blood pressure may increase, not decrease. Excess water would not be absorbed: it would remain in the blood. Urine production would decrease dramatically, not increase.",
      {});
  }
]),["The kidneys filter waste products, excess water, and ions from the blood. What would happen if this filtration stopped working?"]);
E("bio-u3-714-q07",3,["7.14"],1,"var",varset([
  function(){
    return mcq("What is the primary function of the kidneys?",
      "Filtering blood",
      ["Digesting nutrients","Producing hormones","Storing bile"],
      "The primary function of the kidneys is filtering blood, removing waste products, regulating water and ion balance, and producing urine. Digesting nutrients is the digestive system's role. Hormone production is primarily the endocrine system. Bile storage is the gallbladder.",
      {});
  }
]),["Think about the overall function of the excretory system. What role do the kidneys play?"]);
E("bio-u3-714-q08",3,["7.14"],2,"var",varset([
  function(){
    return mcq("A scientist examines a nephron and observes that blood filtration is occurring inside a structure containing a network of capillaries. Which structure is being observed?",
      "Glomerulus",
      ["Bowman's capsule","Collecting duct","Loop of Henle"],
      "The glomerulus is the knot of capillaries inside Bowman's capsule where blood is filtered under pressure. Bowman's capsule collects the filtrate from the glomerulus. The collecting duct collects urine from many nephrons. The Loop of Henle concentrates urine by creating an osmotic gradient.",
      {});
  }
]),["Recall the structure of a nephron and what happens at its very beginning. Which component consists of a dense network of capillaries where blood pressure forces fluid out of the blood?"]);
E("bio-u3-714-q09",3,["7.14"],2,"var",varset([
  function(){
    return mcq("A patient has damage to the proximal tubule of the nephron. Which process would most likely be affected?",
      "Reabsorption of useful substances such as glucose and ions",
      ["Filtration of blood cells from the glomerulus","Storage of urine before it leaves the body","Transport of urine through the ureters"],
      "The proximal tubule reabsorbs useful substances, glucose, amino acids, ions, and water, from the filtrate back into the blood. If damaged, reabsorption of these substances is impaired. Glomerular filtration occurs upstream in the glomerulus. Urine storage occurs in the bladder. Urine transport occurs in the ureters.",
      {});
  }
]),["Think about what needs to happen to useful substances, glucose, ions, water, after they are filtered out of the blood into the nephron."]);
E("bio-u3-714-q10",3,["7.14"],1,"var",varset([
  function(){
    return mcq("What waste product is primarily excreted by the lungs during exhalation?",
      "Carbon dioxide",
      ["Lactic acid","Salt","Urea"],
      "The lungs excrete CO\u2082 (carbon dioxide) as a gaseous waste product of cellular respiration during exhalation. Lactic acid is recycled, not primarily excreted by lungs. Salt is excreted mainly by kidneys and skin. Urea is excreted by kidneys in urine.",
      {});
  }
]),["Think about the waste products produced during cellular respiration. Which of those products is a gas that is carried in the blood and released from the body through breathing?"]);
E("bio-u3-714-q11",3,["7.14"],1,"var",varset([
  function(){
    return mcq("What is the primary function of the Bowman's capsule?",
      "Receiving filtrate from the glomerulus",
      ["Collecting urine from multiple nephrons","Creating a concentration gradient for water","Reabsorbing the majority of glucose"],
      "Bowman's capsule surrounds the glomerulus and receives the filtrate, the fluid forced out of the blood, beginning the process of urine formation. It does not collect urine from multiple nephrons: that is the collecting duct. Creating an osmotic gradient is the Loop of Henle. Glucose reabsorption occurs in the proximal tubule.",
      {});
  }
]),["Think about the physical relationship between Bowman's capsule and the glomerulus in the nephron. What role does a cup-shaped structure surrounding a capillary network play in the process of filtration?"]);
E("bio-u3-714-q12",3,["7.14"],2,"var",varset([
  function(){
    return mcq("Desert animals like the kangaroo rat need to conserve as much water as possible. Which of the following would you expect to be longer in these animals?",
      "Loop of Henle",
      ["Bowman's capsule","Glomerulus","Proximal tubule"],
      "A longer Loop of Henle creates a steeper osmotic concentration gradient, allowing more water to be reabsorbed from the filtrate, producing highly concentrated urine to conserve water. A longer Bowman's capsule is not relevant. The glomerulus filters, not concentrates. The proximal tubule reabsorbs but doesn't concentrate urine as efficiently.",
      {});
  }
]),["If an animal needs to produce very concentrated urine (i.e. more water is reabsorbed) to survive in a dry environment, what would you expect about the length of this structure compared to animals that live in water-rich environments?"]);
E("bio-u3-714-q13",3,["7.14"],2,"var",varset([
  function(){
    return mcq("During a period of severe dehydration, how does the body adjust nephron function to maintain blood plasma volume?",
      "Increasing antidiuretic hormone (ADH) to increase water reabsorption",
      ["Decreasing aldosterone production to lower sodium reabsorption","Decreasing filtration rates to stop waste excretion completely","Increasing tubular secretion to eliminate excess plasma proteins."],
      "During dehydration, the pituitary releases ADH (antidiuretic hormone), which increases water reabsorption in the collecting duct of the nephron. Decreasing aldosterone would reduce sodium reabsorption, worsening dehydration. Stopping filtration completely would prevent waste removal. Increasing secretion would remove more substances from the blood, worsening dehydration.",
      {});
  }
]),["Think about which hormone the body releases in response to low blood water levels. Where in the nephron does it act, and what does it cause the nephron to do with the water in the filtrate?"]);
E("bio-u3-714-q14",3,["7.14"],3,"var",varset([
  function(){
    var q=mcq("According to the graph, the concentration of Substance X drops to zero by the end of the proximal convoluted tubule, while Substance Y's concentration steadily increases throughout the entire nephron. What are the most likely identities of Substances X and Y?",
      "X is glucose; Y is urea",
      ["X is protein; Y is glucose","X is urea; Y is sodium","X is water; Y is protein"],
      "Substance X starts at 100% and drops to 0% in the proximal tubule: it is completely reabsorbed, the behaviour of a useful nutrient, glucose. Substance Y steadily increases as water and nutrients are removed: a waste product being concentrated, urea.",
      {});
    q.figure='<img src="banks/bio-2201/assets/u3-714-q14.png" alt="Graph of relative concentration in fluid (percent) against nephron region (Bowman’s Capsule, Proximal Tubule, Loop of Henle, Distal Tubule): Substance X (solid blue line) starts at 100 percent and falls steadily to 0 percent by the end of the proximal tubule, then stays at zero; Substance Y (dashed red line) starts near 7 percent and rises steadily to about 98 percent at the distal tubule" style="max-width:100%;height:auto">';
    return q;
  }
]),["Substance X starts at 100% in Bowman's capsule and drops to 0% by the proximal tubule, meaning it is completely reabsorbed. Substance Y increases throughout, meaning it is not reabsorbed and may even be secreted. Which substance is a useful nutrient (reabsorbed completely) and which is a waste (concentrated)?"]);
E("bio-u3-714-q15",3,["7.14"],2,"var",varset([
  function(){
    return mcq("A patient's urine sample contains large amounts of glucose. Which nephron process is most likely not functioning properly?",
      "Reabsorption in the proximal tubule",
      ["Filtration at the glomerulus","Secretion in the distal tubule","Water removal in the collecting duct"],
      "Glucose is normally completely reabsorbed in the proximal tubule, so healthy urine contains no glucose. If glucose appears in urine, reabsorption in the proximal tubule has failed. Filtration at the glomerulus would still let glucose pass through. Distal tubule secretion is for ions and drugs, not glucose. The collecting duct deals with water reabsorption.",
      {});
  }
]),["Think about where glucose normally goes after it appears in the nephron filtrate. Under normal conditions, does glucose appear in urine? If it does appear, what step in nephron processing must not be working correctly?"]);
E("bio-u3-714-q16",3,["7.14"],2,"var",varset([
  function(){
    return mcq("Which situation best demonstrates tubular secretion helping maintain homeostasis?",
      "Excess hydrogen ions are moved from the blood into the nephron",
      ["Blood cells are prevented from entering Bowman's capsule","Glucose is returned from the nephron to the bloodstream","Water moves from the collecting duct back into the blood"],
      "Tubular secretion moves substances FROM the blood INTO the nephron tubule. Excess hydrogen ions being moved from blood into the nephron is a perfect example of secretion, helping maintain blood pH. Blood cells being excluded from Bowman's capsule is filtration. Glucose returning to blood is reabsorption. Water moving from collecting duct back to blood is also reabsorption.",
      {});
  }
]),["Think about the direction substances move during tubular secretion, is it from the blood into the tubule, or from the tubule into the blood? Which of the answer options describes a substance moving in that direction?"]);

/* ----- bank-gen.js ----- */
// Biology 2201 generator families (indicators 5.4, 5.2 and 9.5).
// Each E entry is one parameterized family in the "gen" idiom: values
// and scenarios are drawn fresh on every call, so students can
// practise the same skill with new numbers. The families extend the
// calculation types the review books drill (mark-recapture and other
// sampling estimates, the ten percent law, magnification and field of
// view), with fresh scenarios and values written for this app; no book
// question is copied. Distractors are the classic errors for each
// method. Validated by brute-force draw harness (validate-gen2201.js
// in the build folder): 3000 draws per entry, keys recomputed from
// the stored parameters.

function g2ri(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
function g2pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function g2fmt(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
function g2mm(x) {
  var s = (Math.round(x * 100) / 100).toFixed(2);
  return s.replace(/\.?0+$/, "");
}

/* ---------- 5.4 Sampling techniques ---------- */

var G2_MARK_SKINS = [
  { sp: "brook trout", place: "a pond", verb: "caught, tagged and released" },
  { sp: "snowshoe hares", place: "a woodlot", verb: "live-trapped, ear-tagged and released" },
  { sp: "leopard frogs", place: "a marsh", verb: "caught, marked and released" },
  { sp: "song sparrows", place: "a coastal headland", verb: "netted, banded and released" },
  { sp: "meadow voles", place: "a pasture", verb: "live-trapped, marked and released" }
];
E("bio-gen-54-mark", 1, ["5.4"], 2, "gen", function () {
  var skin = g2pick(G2_MARK_SKINS), M = 0, C = 0, R = 0, N = 0, d1 = 0, d2 = 0, d3 = 0, okk = false;
  for (var t = 0; t < 500 && !okk; t++) {
    M = g2pick([40, 50, 60, 75, 80, 100, 120, 150]);
    C = g2pick([20, 24, 25, 30, 32, 40, 48, 50, 60]);
    R = g2pick([4, 5, 6, 8, 10, 12]);
    if ((M * C) % R !== 0) continue;
    N = M * C / R;
    d1 = Math.round(M * R / C);
    d2 = M + C - R;
    d3 = N + (C - R);
    okk = N > C && N <= 2400 && d1 > 0 && d1 !== N && d2 !== N && d3 !== N && d1 !== d2 && d1 !== d3 && d2 !== d3;
  }
  if (!okk) { M = 80; C = 40; R = 8; N = 400; d1 = 16; d2 = 112; d3 = 432; }
  return mcq("To estimate the number of " + skin.sp + " in " + skin.place + ", researchers " + skin.verb + " " + M +
    " of them. A second sample of " + C + " contained " + R + " marked individuals. What is the best estimate of the total population?",
    String(N), [String(d1), String(d2), String(d3)],
    "Mark-recapture: the marked fraction in the second sample estimates the marked fraction in the whole population, so " +
    R + "/" + C + " = " + M + "/N. Solving, N = " + M + " x " + C + " / " + R + " = " + g2fmt(N) + ".",
    { M: M, C: C, R: R, N: N });
});

E("bio-gen-54-density", 1, ["5.4"], 2, "gen", function () {
  var skins = ["barnacles on a rocky shore plot", "dandelions in a meadow plot",
    "mussels in an intertidal plot", "spruce seedlings in a forest plot", "periwinkles on a beach plot"];
  var D = g2pick([3, 4, 5, 6, 8, 10, 12, 15, 20, 25]);
  var A = g2pick([20, 25, 40, 50, 80, 100, 200, 250]);
  var N = D * A;
  return mcq("A researcher counts " + g2fmt(N) + " " + g2pick(skins) + " covering " + A + " m\u00B2. What is the population density?",
    D + " per m\u00B2", [g2mm(1 / D) + " per m\u00B2", (D * 10) + " per m\u00B2", g2fmt(N) + " per m\u00B2"],
    "Population density = number of organisms / area = " + g2fmt(N) + " / " + A + " = " + D + " organisms per m\u00B2.",
    { N: N, A: A, D: D });
});

E("bio-gen-54-quadrat", 1, ["5.4"], 2, "gen", function () {
  var m = g2ri(3, 9);
  var offs = [-2, -1, 0, 1, 2];
  for (var i = offs.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var tmp = offs[i]; offs[i] = offs[j]; offs[j] = tmp; }
  var counts = offs.map(function (o) { return m + o; });
  var sum = counts.reduce(function (a, b) { return a + b; }, 0);
  var A = g2pick([400, 600, 800, 1000, 1200, 2000]);
  var est = m * A;
  var plant = g2pick(["dandelions", "clover plants", "wild strawberry plants", "buttercups"]);
  return mcq("A student samples " + plant + " in a field of " + g2fmt(A) + " m\u00B2 using five 1 m\u00B2 quadrats. The counts are " +
    counts.join(", ") + ". What is the best estimate of the total number of " + plant + " in the field?",
    g2fmt(est), [g2fmt(sum * A), g2fmt(m * A / 5), g2fmt(m * A * 2)],
    "Mean per quadrat = (" + counts.join(" + ") + ") / 5 = " + m + " per m\u00B2. Scale up to the whole field: " +
    m + " x " + g2fmt(A) + " = " + g2fmt(est) + ".",
    { counts: counts, A: A, mean: m, est: est });
});

E("bio-gen-54-change", 1, ["5.4"], 2, "gen", function () {
  var N0 = 0, B = 0, D = 0, I = 0, E = 0, N1 = 0, d1 = 0, d2 = 0, d3 = 0, okk = false;
  for (var t = 0; t < 500 && !okk; t++) {
    N0 = g2ri(16, 38) * 25;
    B = g2ri(12, 36) * 5; D = g2ri(8, 28) * 5; I = g2ri(2, 18) * 5; E = g2ri(2, 18) * 5;
    N1 = N0 + B - D + I - E;
    d1 = N0 + B - D + I + E;
    d2 = N0 + B - D;
    d3 = N0 + B + D + I - E;
    okk = I !== E && N1 > 100 && d1 !== N1 && d2 !== N1 && d3 !== N1 && d1 !== d2 && d1 !== d3 && d2 !== d3;
  }
  var sp = g2pick(["snowshoe hares", "red squirrels", "meadow voles", "white-tailed deer"]);
  var net = B + I - D - E;
  return mcq("A population of " + sp + " in a study area starts the year with " + g2fmt(N0) + " individuals. Over the year there are " +
    B + " births, " + D + " deaths, " + I + " immigrants and " + E + " emigrants. What is the population at the end of the year?",
    g2fmt(N1), [g2fmt(d1), g2fmt(d2), g2fmt(d3)],
    "Population change = (births + immigration) - (deaths + emigration) = (" + B + " + " + I + ") - (" + D + " + " + E + ") = " +
    net + ". New population = " + g2fmt(N0) + (net < 0 ? " - " + (-net) : " + " + net) + " = " + g2fmt(N1) + ".",
    { N0: N0, B: B, D: D, I: I, E: E, N1: N1 });
});

/* ---------- 5.2 The ten percent law ---------- */

var G2_E0 = [20000, 50000, 80000, 120000, 250000, 400000, 600000, 1000000];
var G2_LEVELS = ["primary consumers", "secondary consumers", "tertiary consumers"];
E("bio-gen-52-up", 1, ["5.2"], 2, "gen", function () {
  var E0 = g2pick(G2_E0);
  var n = g2ri(1, 3);
  var E = E0 / Math.pow(10, n);
  var lin = E0 * (1 - 0.1 * n);
  var fac = []; for (var fi = 0; fi < n; fi++) fac.push("0.1");
  return mcq("The producers in an ecosystem store " + g2fmt(E0) + " kJ of energy. Using the ten percent law, how much of this energy is available to the " +
    G2_LEVELS[n - 1] + "?",
    g2fmt(E) + " kJ", [g2fmt(E * 10) + " kJ", g2fmt(E / 10) + " kJ", g2fmt(lin) + " kJ"],
    "Only about 10% of the energy at one trophic level passes to the next. The " + G2_LEVELS[n - 1] + " are " + n +
    (n === 1 ? " transfer" : " transfers") + " from the producers, so the energy is " + g2fmt(E0) + " x " + fac.join(" x ") + " = " + g2fmt(E) + " kJ.",
    { E0: E0, n: n, E: E });
});

E("bio-gen-52-down", 1, ["5.2"], 2, "gen", function () {
  var n = g2ri(2, 3);
  var Et = g2pick([150, 240, 300, 450, 600, 900, 1200]);
  var E0 = Et * Math.pow(10, n);
  var tens = []; for (var ti = 0; ti < n; ti++) tens.push("10");
  return mcq("A population of " + G2_LEVELS[n - 1] + " receives " + g2fmt(Et) + " kJ of energy. Using the ten percent law, how much energy must the producers have stored to support them?",
    g2fmt(E0) + " kJ", [g2fmt(Et * Math.pow(10, n - 1)) + " kJ", g2fmt(Et * Math.pow(10, n + 1)) + " kJ", g2fmt(Et * 10 * n) + " kJ"],
    "Work backwards: each trophic level passes on only about 10%, so the level below needed 10 times as much. The " +
    G2_LEVELS[n - 1] + " are " + n + " transfers from the producers, so producer energy = " + g2fmt(Et) + " x " + tens.join(" x ") + " = " + g2fmt(E0) + " kJ.",
    { Et: Et, n: n, E0: E0 });
});

E("bio-gen-52-lost", 1, ["5.2"], 2, "gen", function () {
  var E0 = g2pick(G2_E0);
  var lost = E0 * 0.9;
  return mcq("The producers in a food chain store " + g2fmt(E0) + " kJ of energy. How much of this energy is NOT passed on to the primary consumers?",
    g2fmt(lost) + " kJ", [g2fmt(E0 * 0.1) + " kJ", g2fmt(E0 - 10) + " kJ", g2fmt(E0 * 0.81) + " kJ"],
    "The primary consumers receive only about 10% of the producers' energy: 0.1 x " + g2fmt(E0) + " = " + g2fmt(E0 * 0.1) +
    " kJ. The rest is lost as heat, waste and the producers' own life processes: " + g2fmt(E0) + " - " + g2fmt(E0 * 0.1) + " = " + g2fmt(lost) + " kJ (90%).",
    { E0: E0, lost: lost });
});

/* ---------- 9.5 Magnification and field of view ---------- */

E("bio-gen-95-total", 2, ["9.5"], 2, "gen", function () {
  var obj = g2pick([4, 10, 40, 60]);
  var tot = 10 * obj;
  return mcq("A microscope has a 10x ocular lens and a " + obj + "x objective lens in place. What is the total magnification?",
    tot + "x", [(10 + obj) + "x", obj + "x", (tot * 10) + "x"],
    "Total magnification = ocular x objective = 10 x " + obj + " = " + tot + "x.",
    { ocular: 10, obj: obj, tot: tot });
});

E("bio-gen-95-fov", 2, ["9.5"], 2, "gen", function () {
  var F1 = g2pick([2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0]);
  var M2 = g2pick([100, 200, 400]);
  var F2 = F1 * 40 / M2;
  return mcq("At a total magnification of 40x, a microscope's field of view is " + g2mm(F1) + " mm. What is the field of view at " + M2 + "x?",
    g2mm(F2) + " mm", [g2mm(F1 * M2 / 40) + " mm", g2mm(F1 / 2) + " mm", g2mm(F1) + " mm"],
    "Field of view shrinks in inverse proportion to magnification: FOV at " + M2 + "x = " + g2mm(F1) + " x (40 / " + M2 + ") = " + g2mm(F2) + " mm.",
    { F1: F1, M1: 40, M2: M2, F2: F2 });
});

E("bio-gen-95-size", 2, ["9.5"], 2, "gen", function () {
  var pairs = [[1.8, 3], [1.8, 6], [2.0, 4], [2.0, 5], [2.0, 8], [2.4, 3], [2.4, 4], [2.4, 6], [2.4, 8],
    [3.0, 3], [3.0, 5], [3.0, 6], [3.6, 4], [3.6, 6], [3.6, 8], [4.0, 4], [4.0, 5], [4.0, 8], [4.5, 3], [4.5, 5], [4.5, 6]];
  var pr = g2pick(pairs);
  var F = pr[0], k = pr[1], size = F / k;
  var org = g2pick(["bacteria", "paramecia", "yeast cells", "amoebas"]);
  return mcq("Under a microscope, the diameter of the field of view is " + g2mm(F) + " mm. About " + k + " " + org +
    " fit side by side across the field. What is the approximate size of one organism?",
    g2mm(size) + " mm", [g2mm(F * k) + " mm", g2mm(F) + " mm", g2mm(size * 2) + " mm"],
    "One organism spans about 1/" + k + " of the field: " + g2mm(F) + " / " + k + " = " + g2mm(size) + " mm.",
    { F: F, k: k, size: size });
});

/* ----- bank-label.js ----- */
// Biology 2201 labelling conversions (tranche 2, Nov 12, 2026).
// The course's 13 labelling activities are 7 unique diagrams: six Drag
// and Drop diagrams each exist twice (a standalone activity and an
// identical copy inside a Unit 3 review book, same background image and
// zone layout), plus the standalone Endocrine System Image Hotspots.
// One entry per unique diagram, built from the in-book copy where the
// pair differs. In each figure the activity's own labels are replaced
// by numbered badges placed on the diagram's leader lines or on the
// structures themselves; badge placement was calibrated against the
// source zone geometry and verified on rendered composites. Each
// variant asks about one number; its three distractors are drawn fresh
// from the same diagram's other labels on every call.
// Labels are the activities' own, with three normalizations recorded
// in labels/label-spec.json: "Superior v.c." expanded to the zone's own
// name "Superior vena cava", the misspelling "Hyerpolarization"
// corrected, and "Gonads- Overies" corrected to "Gonads - Ovaries".
// Two source defects were worked around, not replicated: the digestive
// activity's drop zones do not land on its organs, and the endocrine
// thymus hotspot sits on the figure's shoulder; both diagrams' badges
// are hand-placed on the structures. The nephron's Afferent Arteriole
// zone names no correct element in either source copy; its label is
// the zone's own name, the only unmatched draggable in the activity.

function lbDraw(prompt, correct, solution, pool, fig) {
  var others = pool.filter(function (x) { return x !== correct; });
  for (var i = others.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = others[i]; others[i] = others[j]; others[j] = t;
  }
  var q = mcq(prompt, correct, others.slice(0, 3), solution, {});
  q.figure = fig;
  return q;
}


/* ---------- Heart (7.8, 7.9) ---------- */
var LB_HEART = ["Aorta","Superior vena cava","Right atrium","Tricuspid valve","Pulmonary valve","Right ventricle","Septum","Pulmonary artery","Pulmonary vein","Left atrium","Mitral valve","Aortic valve","Left ventricle"];
var FIG_HEART = '<img src="banks/bio-2201/assets/label-heart.png" alt="Diagram of the human heart with its labels replaced by the numbers 1 to 13" style="max-width:100%;height:auto">';
E("bio-lb-heart",3,["7.8","7.9"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 1?","Aorta","Position 1 is the Aorta: the large artery arching over the top of the heart, carrying blood to the body.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 2?","Superior vena cava","Position 2 is the Superior vena cava: the large blue vein entering the top of the right atrium, returning blood from the upper body.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 3?","Right atrium","Position 3 is the Right atrium: the upper chamber on the left side of the diagram (the heart's right side), which receives blood from the vena cavae.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 4?","Tricuspid valve","Position 4 is the Tricuspid valve: the valve between the right atrium and the right ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 5?","Pulmonary valve","Position 5 is the Pulmonary valve: the valve at the base of the pulmonary artery, where blood leaves the right ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 6?","Right ventricle","Position 6 is the Right ventricle: the lower chamber on the left side of the diagram, which pumps blood to the lungs.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 7?","Septum","Position 7 is the Septum: the muscular wall separating the left and right sides of the heart, marked at its lower end.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 8?","Pulmonary artery","Position 8 is the Pulmonary artery: the vessel carrying blood from the right ventricle to the lungs, at the top right of the diagram.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 9?","Pulmonary vein","Position 9 is the Pulmonary vein: one of the veins returning oxygenated blood from the lungs to the left atrium.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 10?","Left atrium","Position 10 is the Left atrium: the upper chamber on the right side of the diagram (the heart's left side), which receives blood from the pulmonary veins.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 11?","Mitral valve","Position 11 is the Mitral valve: the valve between the left atrium and the left ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 12?","Aortic valve","Position 12 is the Aortic valve: the valve at the base of the aorta, where blood leaves the left ventricle.",LB_HEART,FIG_HEART); },
  function(){ return lbDraw("In this diagram of the heart, the labels are replaced by numbers. Which structure is marked 13?","Left ventricle","Position 13 is the Left ventricle: the thick-walled lower chamber on the right side of the diagram, which pumps blood into the aorta.",LB_HEART,FIG_HEART); },
]),["Follow each dotted leader line from the number to the part of the heart it touches."]);

/* ---------- Respiratory system (7.11) ---------- */
var LB_RESP = ["Nasal Cavity","Nostril","Oral Cavity","Larynx","Right Bronchus","Right Lung","Pharynx","Trachea","Left Bronchus","Left Lung","Diaphragm"];
var FIG_RESP = '<img src="banks/bio-2201/assets/label-resp.png" alt="Diagram of the human respiratory system with its labels replaced by the numbers 1 to 11" style="max-width:100%;height:auto">';
E("bio-lb-resp",3,["7.11"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 1?","Nasal Cavity","Position 1 is the Nasal Cavity: the space inside the nose, at the top of the uppermost leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 2?","Nostril","Position 2 is the Nostril: the opening of the nose, on the second leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 3?","Oral Cavity","Position 3 is the Oral Cavity: the mouth, on the third leader line on the left.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 4?","Larynx","Position 4 is the Larynx: the voice box at the top of the trachea, on the lowest of the left-hand lines in the neck.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 5?","Right Bronchus","Position 5 is the Right Bronchus: the branch of the trachea entering the right lung (on the left of the diagram), at the left end of the long line crossing the chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 6?","Right Lung","Position 6 is the Right Lung: the lung on the left of the diagram (the person's right lung, shown behind the ribs).",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 7?","Pharynx","Position 7 is the Pharynx: the throat passage behind the nasal and oral cavities, on the uppermost leader line on the right.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 8?","Trachea","Position 8 is the Trachea: the windpipe, the ringed tube running down the centre of the neck and chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 9?","Left Bronchus","Position 9 is the Left Bronchus: the branch of the trachea entering the left lung (on the right of the diagram), at the right end of the long line crossing the chest.",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 10?","Left Lung","Position 10 is the Left Lung: the lung on the right of the diagram (the person's left lung).",LB_RESP,FIG_RESP); },
  function(){ return lbDraw("In this diagram of the respiratory system, the labels are replaced by numbers. Which structure is marked 11?","Diaphragm","Position 11 is the Diaphragm: the sheet of muscle under the lungs, at the bottom of the lowest leader line on the right.",LB_RESP,FIG_RESP); },
]),["Follow the leader line from the number to the airway or lung it points to."]);

/* ---------- Digestive system (7.12, 7.13) ---------- */
var LB_DIG = ["Mouth","Esophagus","Stomach","Large intestine","Small intestine","Rectum"];
var FIG_DIG = '<img src="banks/bio-2201/assets/label-dig.png" alt="Diagram of the human digestive system with its labels replaced by the numbers 1 to 6" style="max-width:100%;height:auto">';
E("bio-lb-dig",3,["7.12","7.13"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 1?","Mouth","Position 1 is the Mouth: where digestion begins, at the head of the figure.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 2?","Esophagus","Position 2 is the Esophagus: the tube carrying food from the mouth down through the chest to the stomach.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 3?","Stomach","Position 3 is the Stomach: the muscular sac under the liver that churns food with acid and enzymes.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 4?","Large intestine","Position 4 is the Large intestine: the wider tube framing the small intestine, which absorbs water from the remains.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 5?","Small intestine","Position 5 is the Small intestine: the long, coiled tube in the centre of the abdomen where most digestion and absorption happen.",LB_DIG,FIG_DIG); },
  function(){ return lbDraw("In this diagram of the digestive system, the labels are replaced by numbers. Which structure is marked 6?","Rectum","Position 6 is the Rectum: the final straight section of the large intestine, at the bottom of the figure.",LB_DIG,FIG_DIG); },
]),["The numbers sit on the organs themselves, in the order food passes through them."]);

/* ---------- Nephron (7.14) ---------- */
var LB_NEPHRON = ["PCT","DCT","Glomerulus","Renal Corpuscle","Glomerular Capsule","Afferent Arteriole","Efferent Arteriole","Loop of Henle","Collecting Duct"];
var FIG_NEPHRON = '<img src="banks/bio-2201/assets/label-nephron.png" alt="Diagram of a nephron with its labels replaced by the numbers 1 to 9" style="max-width:100%;height:auto">';
E("bio-lb-nephron",3,["7.14"],1,"var",varset([
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 1?","PCT","Position 1 is the PCT: the proximal convoluted tubule, the coiled section leaving the glomerular capsule at the upper left.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 2?","DCT","Position 2 is the DCT: the distal convoluted tubule, the coiled section at the top centre, passing beside the glomerulus.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 3?","Glomerulus","Position 3 is the Glomerulus: the ball of capillaries (shown in red) where blood is filtered.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 4?","Renal Corpuscle","Position 4 is the Renal Corpuscle: the glomerulus together with its capsule, the filtering unit at the top right.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 5?","Glomerular Capsule","Position 5 is the Glomerular Capsule: the cup surrounding the glomerulus, which collects the filtrate (also called Bowman's capsule).",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 6?","Afferent Arteriole","Position 6 is the Afferent Arteriole: the arteriole bringing blood into the glomerulus, on the left of the red vessels.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 7?","Efferent Arteriole","Position 7 is the Efferent Arteriole: the arteriole carrying blood away from the glomerulus, below the afferent arteriole.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 8?","Loop of Henle","Position 8 is the Loop of Henle: the long U-shaped loop of the tubule, marked beside its descending and ascending limbs.",LB_NEPHRON,FIG_NEPHRON); },
  function(){ return lbDraw("In this diagram of a nephron, the labels are replaced by numbers. Which structure is marked 9?","Collecting Duct","Position 9 is the Collecting Duct: the duct on the right that receives urine from the tubule and carries it toward the renal pelvis.",LB_NEPHRON,FIG_NEPHRON); },
]),["Follow the tubule: filtrate flows from the glomerulus through the capsule, the proximal tubule, the loop, the distal tubule and into the collecting duct."]);

/* ---------- Neuron (7.4) ---------- */
var LB_NEURON = ["Myelin","Node of Ranvier","Synapse","Cell body (Soma)","Dendrites","Axon","Axon terminal"];
var FIG_NEURON = '<img src="banks/bio-2201/assets/label-neuron.png" alt="Diagram of two neurons meeting at a synapse, with the labels replaced by the numbers 1 to 7" style="max-width:100%;height:auto">';
E("bio-lb-neuron",3,["7.4"],1,"var",varset([
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 1?","Myelin","Position 1 is the Myelin: the insulating sheath (shown in blue) wrapped around the upper neuron's axon.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 2?","Node of Ranvier","Position 2 is the Node of Ranvier: one of the gaps in the myelin sheath along the upper axon.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 3?","Synapse","Position 3 is the Synapse: the junction where the upper neuron's axon terminals meet the lower neuron's dendrites.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 4?","Cell body (Soma)","Position 4 is the Cell body (Soma): the large orange body of the lower neuron, containing its nucleus.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 5?","Dendrites","Position 5 is the Dendrites: the branching fibres carrying signals toward the lower neuron's cell body.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 6?","Axon","Position 6 is the Axon: the long orange fibre carrying the signal away from the lower neuron's cell body.",LB_NEURON,FIG_NEURON); },
  function(){ return lbDraw("In this diagram of two neurons, the labels are replaced by numbers. Which structure is marked 7?","Axon terminal","Position 7 is the Axon terminal: the branching end of the lower neuron's axon, which passes the signal on.",LB_NEURON,FIG_NEURON); },
]),["The diagram shows two neurons meeting at a synapse; follow each leader line to the part it touches."]);

/* ---------- Action potential (7.4) ---------- */
var LB_ACTION = ["Resting potential","Threshold of excitation","Peak action potential","Repolarization","Hyperpolarization"];
var FIG_ACTION = '<img src="banks/bio-2201/assets/label-action.png" alt="Graph of an action potential (membrane potential in millivolts against time) with its stage labels replaced by the numbers 1 to 5" style="max-width:100%;height:auto">';
E("bio-lb-action",3,["7.4"],2,"var",varset([
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 1?","Resting potential","Position 1 is the Resting potential: the flat section at -70 mV before the stimulus, where the membrane is at rest.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 2?","Threshold of excitation","Position 2 is the Threshold of excitation: the point at -55 mV (the dashed line) where the rising curve crosses threshold and the action potential fires.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 3?","Peak action potential","Position 3 is the Peak action potential: the top of the spike, where the membrane potential reaches about +30 mV.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 4?","Repolarization","Position 4 is the Repolarization: the falling section of the curve, where the membrane potential drops back toward resting.",LB_ACTION,FIG_ACTION); },
  function(){ return lbDraw("This graph shows an action potential. The stage labels are replaced by numbers. Which stage is marked 5?","Hyperpolarization","Position 5 is the Hyperpolarization: the dip below -70 mV after the spike, before the potential settles back to resting.",LB_ACTION,FIG_ACTION); },
]),["Read the curve left to right: it starts at resting potential, fires, and then recovers."]);

/* ---------- Endocrine system (7.7) ---------- */
var LB_ENDO = ["Pineal Gland","Pituitary Gland","Thyroid Gland","Parathyroid Glands","Thymus","Adrenal Glands","Pancreas","Gonads - Ovaries","Gonads - Testes"];
var FIG_ENDO = '<img src="banks/bio-2201/assets/label-endo.png" alt="Diagram of the human endocrine system in a female (left) and a male (right) figure, with enlarged views of the brain and thyroid glands; the labels are replaced by the numbers 1 to 9" style="max-width:100%;height:auto">';
E("bio-lb-endo",3,["7.7"],1,"var",varset([
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 1?","Pineal Gland","Position 1 is the Pineal Gland: the small gland deep in the brain, shown in the enlarged brain view at the top.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 2?","Pituitary Gland","Position 2 is the Pituitary Gland: the small gland hanging below the brain, shown in the enlarged brain view at the top.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 3?","Thyroid Gland","Position 3 is the Thyroid Gland: the gland wrapped around the trachea in the neck of the left-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 4?","Parathyroid Glands","Position 4 is the Parathyroid Glands: the four small glands on the back of the thyroid, shown as dots in the enlarged thyroid view.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 5?","Thymus","Position 5 is the Thymus: the elongated gland hanging below the thyroid at the top of the chest in the right-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 6?","Adrenal Glands","Position 6 is the Adrenal Glands: the glands capping the kidneys, marked on the left-hand figure.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 7?","Pancreas","Position 7 is the Pancreas: the gland behind the stomach of the right-hand figure, reaching across toward the spleen side.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 8?","Gonads - Ovaries","Position 8 is the Gonads - Ovaries: the ovaries of the left-hand (female) figure, at the ends of the fallopian tubes.",LB_ENDO,FIG_ENDO); },
  function(){ return lbDraw("In this diagram of the endocrine system, the labels are replaced by numbers. Which gland is marked 9?","Gonads - Testes","Position 9 is the Gonads - Testes: the testes of the right-hand (male) figure, at the bottom of the diagram.",LB_ENDO,FIG_ENDO); },
]),["The two figures show the same gland system in a female (left) and a male (right); the circles enlarge the brain glands and the thyroid glands."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={};
