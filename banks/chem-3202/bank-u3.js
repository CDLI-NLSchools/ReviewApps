// Chemistry 3202 Unit 3 Thermochemistry question bank
// Recode (Nov 19, 2026): entries re-registered to the curriculum
// codes from the guide-code re-mapping, with ids renamed to match;
// blocks regrouped under banners carrying the outcome wording.
// Joint landing (Nov 19, 2026): the redesigned sheet's 31 Gemini
// entries integrated (pool 7.3 filled; 7.12 completed by the draft
// tail's bond-compare and formation-solve). Pool 7.11 stands at 5
// of 6: u3-711-scaled-amount was rejected at intake (its
// no-coefficient distractor equals the key on coefficient-1 draws)
// and awaits a design ruling before re-drafting.
// Phase C diagram figures (Nov 2026): u3-76-diagram-language now draws the
// enthalpy diagram from its own values, and u3-77-curve-read draws the
// standard heating curve (no plateau temperatures are given by that entry,
// so none are labelled). Figure helpers are in bank-u1.js.
// CRMARKS: u3-79-calorimetry-error=4
// CRMARKS: u3-710-calorimetry-molar=4
// CRMARKS: u3-74-find-delta-t=2
// CRMARKS: u3-74-mixture-temp=4
// CRMARKS: u3-74-q-temp=3
// CRMARKS: u3-74-cup-heat=3
// CRMARKS: u3-77-q-combined=4
// CRMARKS: u3-77-q-phase=3
// CRMARKS: u3-77-full-range=5
// CRMARKS: u3-77-q-release=3
// CRMARKS: u3-78-deltah-from-q=3
// CRMARKS: u3-78-limiting=3
// CRMARKS: u3-710-molar-combustion=4
// CRMARKS: u3-710-compare-per-gram=3
// CRMARKS: u3-710-mass-for-energy=3
// CRMARKS: u3-711-write-thermochem=3
// CRMARKS: u3-712-bond-energy=3
// CRMARKS: u3-712-formation=3
// CRMARKS: u3-712-hess=5
// CRMARKS: u3-712-formation-solve=4

/* ---------- 7.1 Explain temperature and heat using the concept of kinetic energy and the particle model of matter ---------- */

E("u3-71-forms",3,["7.1"],1,"var",varset([
  function(){
    return mcq("The energy stored in the bonds of a glucose molecule is an example of",
      "Chemical potential energy",
      ["Kinetic energy of motion","Thermal energy","Electrical potential energy"],
      "Energy held in the arrangement of atoms and their bonds is chemical potential energy, a stored (potential) form. It becomes available when the bonds are rearranged in a reaction.",{});
  },
  function(){
    return mcq("Which of the following is a kinetic form of energy?",
      "The thermal energy of a warm water sample, from the motion of its particles",
      ["The chemical energy in a battery","The energy stored in a stretched elastic band","The energy of water held behind a dam"],
      "Kinetic energy is energy of motion. Thermal energy is the total kinetic energy of the particles in the sample; the others are stored, potential forms.",{});
  },
  function(){
    return mcq("In thermochemistry, the internal energy changes that matter in a reaction are tracked mainly through",
      "Changes in chemical potential energy (bond energies) and the thermal energy of the system",
      ["The colour and brightness of the substances",
       "The mass of the container",
       "The speed at which the reaction finishes"],
      "A chemical reaction rearranges bonds, changing stored chemical potential energy, and the difference shows up as thermal energy changes (temperature changes) or is transferred as heat or work.",{});
  }
]));

E("u3-71-conversion",3,["7.1"],2,"gen",function(){
  var v=pick([
    {d:"a burning candle lighting a room",a:"Chemical potential energy \u2192 thermal energy and light (radiant energy)",w:["Kinetic energy \u2192 chemical potential energy","Electrical energy \u2192 chemical potential energy","Radiant energy \u2192 gravitational potential energy"]},
    {d:"a plant carrying out photosynthesis",a:"Radiant energy (sunlight) \u2192 chemical potential energy stored in glucose",w:["Chemical potential energy \u2192 radiant energy leaving the plant","Thermal energy \u2192 kinetic energy of the leaves","Electrical energy \u2192 chemical potential energy"]},
    {d:"a battery-powered flashlight switched on",a:"Chemical potential energy \u2192 electrical energy \u2192 radiant energy and thermal energy",w:["Radiant energy \u2192 electrical energy \u2192 chemical energy","Kinetic energy \u2192 electrical energy \u2192 chemical energy","Electrical energy \u2192 chemical energy \u2192 radiant energy"]},
    {d:"a hydroelectric dam generating power",a:"Gravitational potential energy \u2192 kinetic energy of water \u2192 electrical energy",w:["Electrical energy \u2192 kinetic energy \u2192 gravitational potential energy","Chemical potential energy \u2192 electrical energy directly","Kinetic energy \u2192 chemical potential energy \u2192 electrical energy"]},
    {d:"a car engine driving the wheels",a:"Chemical potential energy of the fuel \u2192 thermal energy \u2192 kinetic energy of the car",w:["Kinetic energy of the fuel \u2192 chemical potential energy \u2192 thermal energy","Electrical energy \u2192 chemical potential energy \u2192 kinetic energy","Thermal energy \u2192 chemical potential energy \u2192 kinetic energy"]}
  ]);
  var t=ri(10,30);
  return mcq("At an ambient temperature of "+t+" \u00B0C, consider "+v.d+". Which chain correctly describes the energy conversions?",
    v.a,v.w,
    "Energy changes form but the total is conserved. Tracing the stored energy through its conversions gives: <b>"+v.a+"</b>.",{t:t});
});

// LEVEL: 2 - Applying the particle model to a concrete thermal contact rather than reciting definitions.
// VARIANTS: Two asks at equal mix: (a) direction of heat flow and final thermal equilibrium state; (b) particle-level meaning of the shared final temperature.
// LENGTHS: key=92, distractors=93,97,94
E("u3-71-heat-flow",3,["7.1"],2,"gen",function(){
  var frame=Math.random()<0.5?"a":"b";
  var pair=pick([
    {a:"a metal block",b:"a sample of water"},
    {a:"a larger sample of water",b:"a smaller sample of water"},
    {a:"a sample of hot gas",b:"a sample of cold gas"}
  ]);
  var tHot=ri(40,90);
  var tCool=ri(5,Math.min(25,tHot-20));
  var swap=Math.random()<0.5;
  var s1=swap?pair.b:pair.a, s2=swap?pair.a:pair.b;
  var t1=swap?tCool:tHot, t2=swap?tHot:tCool;
  var hotName=swap?s2:s1, coolName=swap?s1:s2;
  var stem="Inside an insulated container, "+s1+" at "+t1+" °C is placed in thermal contact with "+s2+" at "+t2+" °C. ";
  var prompt,key,ds,sol;
  if(frame==="a"){
    prompt=stem+"Which statement best describes the net energy transfer and the final state of the two samples?";
    key="Heat flows from "+hotName+" to "+coolName+" until both samples reach the same temperature.";
    ds=[
      "Heat flows from "+coolName+" to "+hotName+" until both samples reach the same temperature.",
      "Cold flows from "+coolName+" into "+hotName+" until both samples reach the same temperature.",
      "Heat flows from "+hotName+" to "+coolName+" until the particles in "+coolName+" stop moving."
    ];
    sol="Because "+hotName+" is at "+tHot+" °C and "+coolName+" is at "+tCool+" °C, energy transfers as heat from the warmer sample to the cooler sample until thermal equilibrium is reached at a shared temperature. Therefore, <b>"+key+"</b>.";
  }else{
    prompt=stem+"Once the two samples reach thermal equilibrium at the same final temperature, what is true at the particle level?";
    key="The particles in both samples have the same average kinetic energy and continue moving with no net transfer.";
    ds=[
      "The particles in "+hotName+" stop transferring energy once contact is made and keep their starting speeds.",
      "The particles in "+coolName+" stop moving once equilibrium is reached because no more heat flows into them.",
      "The particles in the larger sample keep a higher average kinetic energy because temperature measures total energy."
    ];
    sol="Temperature measures the average kinetic energy of particles. At thermal equilibrium, both samples share the same temperature, so their particles have the same average kinetic energy and keep colliding with balanced energy exchanges. Therefore, <b>"+key+"</b>.";
  }
  return mcq(prompt,key,ds,sol,{frame:frame,s1:s1,s2:s2,t1:t1,t2:t2,tHot:tHot,tCool:tCool});
});

// LEVEL: 1 - Classifying thermochemistry examples as stored potential energy or kinetic energy of motion.
// VARIANTS: Four fixed variants: (a) hot gas particles; (b) fuel bonds in camping canister; (c) compressed gas cylinder; (d) water moving through a turbine.
// LENGTHS: key=98, distractors=96,95,103
// LENGTHS: key=102, distractors=99,99,102
// LENGTHS: key=101, distractors=99,99,102
// LENGTHS: key=104, distractors=100,101,100
E("u3-71-stored-or-motion",3,["7.1"],1,"var",varset([
  function(){
    var key="A form of motion, because it is the kinetic energy of particles moving randomly inside the gas.";
    return mcq("A sealed container holds a sample of hot gas. How is the thermal energy of the moving gas particles classified?",
      key,
      [
        "A stored form, because any energy held inside a closed container of matter is potential energy.",
        "A stored form, because gas particles hold their thermal energy only inside their chemical bonds.",
        "A form of motion, because the container itself is sliding across the laboratory bench at high speed."
      ],
      "Thermal energy at the particle level comes from the constant, random motion of atoms and molecules, which is kinetic energy. Therefore, the correct classification is <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="A stored form, because it is chemical potential energy held in the arrangement of atoms and bonds.";
    return mcq("A camping stove canister holds butane fuel before the burner is lit. How is the chemical energy in the fuel classified?",
      key,
      [
        "A form of motion, because energy that can be released during burning is already kinetic energy.",
        "A form of motion, because the liquid fuel molecules are moving rapidly inside the closed canister.",
        "A stored form, because the canister is sitting still on the ground and has gravitational energy only."
      ],
      "Energy held within chemical bonds and molecular structure is stored energy that is released or absorbed when bonds rearrange during a reaction. Therefore, the correct classification is <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="A stored form, because it is potential energy held by forcing the gas particles closer together.";
    return mcq("A steel cylinder holds compressed air under high pressure, ready to expand when the valve opens. How is this energy classified?",
      key,
      [
        "A form of motion, because the compressed gas particles have stopped moving inside the cylinder.",
        "A form of motion, because energy ready to do work on a piston is always kinetic energy first.",
        "A stored form, because compressing a gas converts all particle kinetic energy into chemical bonds."
      ],
      "Compressing a gas stores mechanical potential energy that can later convert into bulk kinetic energy when the gas expands. Therefore, the correct classification is <b>"+key+"</b>.",
      {variant:3});
  },
  function(){
    var key="A form of motion, because it is the kinetic energy of the flowing mass of water turning the blades.";
    return mcq("Water rushes through a penstock pipe and spins a hydroelectric turbine. How is the energy of the flowing water classified?",
      key,
      [
        "A stored form, because water molecules hold all of their usable energy inside O-H covalent bonds.",
        "A stored form, because energy carried by a liquid stream is potential energy until it stops moving.",
        "A form of motion, because the water temperature rises above boiling as it passes through the pipe."
      ],
      "Moving water possesses bulk kinetic energy due to its mass and speed, which it transfers to the turbine blades. Therefore, the correct classification is <b>"+key+"</b>.",
      {variant:4});
  }
]));

// LEVEL: 2 - Tracing energy conversion chains across thermochemistry processes.
// VARIANTS: Five contexts at equal mix: chemical hand warmer, glow stick, electric kettle, solar panel charging a battery, gas stove burner.
// LENGTHS: key=43, distractors=43,34,42
E("u3-71-chem-chains",3,["7.1"],2,"gen",function(){
  var cases=[
    {
      ctx:"a disposable iron-powder chemical hand warmer warming a skier's hands",
      key:"chemical potential energy → thermal energy",
      ds:[
        "thermal energy → chemical potential energy",
        "electrical energy → thermal energy",
        "radiant energy → chemical potential energy"
      ],
      exp:"Oxidation of the iron powder releases stored chemical potential energy directly as thermal energy."
    },
    {
      ctx:"a plastic glow stick giving off light after its inner vial is snapped",
      key:"chemical potential energy → radiant energy",
      ds:[
        "radiant energy → chemical potential energy",
        "thermal energy → radiant energy",
        "electrical energy → radiant energy"
      ],
      exp:"Mixing the chemicals triggers a reaction that converts stored chemical potential energy directly into radiant (light) energy."
    },
    {
      ctx:"an electric kettle plugged into a wall outlet heating water to a boil",
      key:"electrical energy → thermal energy",
      ds:[
        "thermal energy → electrical energy",
        "chemical potential energy → thermal energy",
        "radiant energy → thermal energy"
      ],
      exp:"Electric current passing through the heating element converts electrical energy into thermal energy in the water."
    },
    {
      ctx:"a rooftop solar panel charging a storage battery during the afternoon",
      key:"radiant energy → electrical energy → chemical potential energy",
      ds:[
        "chemical potential energy → electrical energy → radiant energy",
        "radiant energy → chemical potential energy",
        "thermal energy → electrical energy → chemical potential energy"
      ],
      exp:"The photovoltaic cells first convert sunlight (radiant energy) into electrical energy, which then drives an endothermic charging reaction to store chemical potential energy in the battery."
    },
    {
      ctx:"a natural gas stove burner heating a metal cooking pot",
      key:"chemical potential energy → thermal energy and radiant energy",
      ds:[
        "thermal energy and radiant energy → chemical potential energy",
        "electrical energy → thermal energy and radiant energy",
        "kinetic energy → thermal energy and radiant energy"
      ],
      exp:"Burning methane converts stored chemical potential energy into thermal energy (heat) and radiant energy (the visible blue flame)."
    }
  ];
  var c=pick(cases);
  return mcq("Which energy conversion chain best describes "+c.ctx+"?",
    c.key,c.ds,
    c.exp+" The chain is <b>"+c.key+"</b>.",
    {ctx:c.ctx});
});

// LEVEL: 2 - Separating temperature (average particle kinetic energy) from heat and total thermal energy.
// VARIANTS: Three fixed variants: (a) what temperature measures; (b) large cool sample vs small hot sample; (c) two objects at the same temperature in contact.
// LENGTHS: key=102, distractors=103,103,103
// LENGTHS: key=107, distractors=103,101,105
// LENGTHS: key=107, distractors=104,106,104
E("u3-71-heat-vs-temp",3,["7.1"],2,"var",varset([
  function(){
    var key="Temperature measures the average kinetic energy of the particles, not the total energy in a sample.";
    return mcq("Which statement accurately distinguishes temperature from the thermal energy contained in a sample of matter?",
      key,
      [
        "Temperature measures the total kinetic energy of all particles combined, regardless of sample mass.",
        "Temperature measures the amount of heat substance stored inside an object that flows out on contact.",
        "Temperature measures the potential energy stored in chemical bonds rather than any particle motion."
      ],
      "Temperature depends only on the average kinetic energy per particle, whereas total thermal energy also depends on the number of particles present. Therefore, <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="The large bucket can hold more total thermal energy because total energy depends on mass and temperature.";
    return mcq("A large bucket holds 20 kg of water at 25 °C, while a small cup holds 0.20 kg of water at 80 °C. How do their energies compare?",
      key,
      [
        "The small cup holds more total thermal energy because the hotter sample always contains more energy.",
        "Both samples hold the exact same total thermal energy because both are made of pure liquid water.",
        "The large bucket has a higher average particle kinetic energy because its total mass is much larger."
      ],
      "Although particles in the 80 °C cup have higher average kinetic energy, the bucket has 100 times as many particles, giving it far greater total thermal energy. Therefore, <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="No net heat flows between them because heat is energy in transfer driven by a temperature difference.";
    return mcq("A copper block at 22 °C is placed against an iron block at 22 °C inside an insulated box. What happens next?",
      key,
      [
        "All particle motion in both blocks stops immediately because the two temperatures are now identical.",
        "Heat flows from the denser metal to the less dense metal until each block holds equal heat content.",
        "A steady quantity of heat flows back and forth because every object contains a fixed store of heat."
      ],
      "Heat is thermal energy transferred due to a temperature difference; when two objects are at the same temperature, particle collisions continue equally in both directions with zero net transfer. Therefore, <b>"+key+"</b>.",
      {variant:3});
  }
]));

/* ---------- 7.2 Distinguish between a system and surroundings and the relationship of each to the universe ---------- */

E("u3-72-system-types",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Hot coffee is poured into an open mug on a desk. For the coffee as the system, this is best classified as",
      "An open system, because both matter (steam) and energy (heat) can leave",
      ["A closed system, because the mug holds the liquid in",
       "An isolated system, because the coffee does not react with the air",
       "An open system, because energy can leave but matter cannot"],
      "An open system exchanges both matter and energy with the surroundings. The coffee loses water vapour (matter) and heat (energy), so it is open.",{});
  },
  function(){
    return mcq("A chemical reaction is carried out in a sealed steel vessel with thick insulation, so that neither matter nor heat crosses the walls. The vessel is best classified as",
      "An isolated system",
      ["An open system","A closed system","A surroundings system"],
      "No matter crosses the walls of any sealed vessel, and the insulation stops energy transfer as well. A system exchanging neither matter nor energy is isolated.",{});
  },
  function(){
    return mcq("Hot water is stored in a stoppered flask whose stopper lets no liquid or vapour escape, although heat slowly passes through the glass. The flask is best classified as",
      "A closed system, because energy can cross the boundary but matter cannot",
      ["An open system, because energy can cross the boundary",
       "An isolated system, because nothing can get in or out",
       "An open system, because the water is a liquid"],
      "The stopper blocks matter but heat still crosses the glass, so the system exchanges energy only. That is a closed system.",{});
  }
]));

E("u3-72-isolated-judgement",3,["7.2"],2,"gen",function(){
  var v=pick([
    {d:"a gas reacting inside a vacuum-jacketed, sealed steel bomb",a:"Isolated: the seal blocks matter and the vacuum jacket blocks heat transfer",w:["Open: gases always exchange with the surroundings","Closed: a sealed container is always a closed system","Open: the reaction releases energy inside"]},
    {d:"soup cooling in a pot with the lid ajar",a:"Open: steam (matter) and heat (energy) both escape past the lid",w:["Isolated: the pot is mostly covered","Closed: the lid keeps the matter in","Isolated: no reaction is taking place"]},
    {d:"a stoppered bottle of warm water on a bench",a:"Closed: the stopper blocks matter but heat crosses the glass",w:["Isolated: the stopper seals everything in","Open: heat crossing makes it an open system","Open: the water can evaporate inside the bottle"]},
    {d:"ice melting in an uncovered glass",a:"Open: meltwater can be lost by evaporation and heat flows in from the room",w:["Closed: glass is a solid boundary","Isolated: while melting, the temperature does not change","Closed: only energy crosses the boundary"]}
  ]);
  var ml=pick([150,200,250,300]),tp=ri(10,35);
  return mcq("In an experiment at "+tp+" \u00B0C, "+ml+" mL of liquid is involved in the setup: "+v.d+". Which classification and reasoning are correct?",
    v.a,v.w,
    "Classify by what crosses the boundary: matter and energy (open), energy only (closed), or neither (isolated). <b>"+v.a+"</b>.",{ml:ml});
});

E("u3-72-surroundings",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A student warms 200 mL of water in a beaker over a burner and studies the water as the system. The surroundings are",
      "Everything else: the beaker, the burner, the air, and the rest of the universe outside the water",
      ["Only the beaker, because it touches the water",
       "Only the burner, because it supplies the heat",
       "The water vapour above the surface"],
      "The surroundings are everything outside the system under study. The burner and beaker matter most in practice, but the definition covers everything that is not the water itself.",{});
  },
  function(){
    return mcq("In a calorimetry experiment, the temperature of the water in the cup rises. Interpreting this with systems language:",
      "The reaction (system) released energy, and the water (part of the surroundings) gained it, warming up",
      ["The water (system) created energy and warmed itself",
       "The reaction (surroundings) absorbed energy from the water",
       "Energy appeared because exothermic reactions create it"],
      "Energy is transferred, never created. The reacting chemicals are the system; the water around them is the surroundings that receive the released energy and warm.",{});
  },
  function(){
    return mcq("A student studies the combustion of a fuel as 'the system' while it heats water in a can. Which list correctly names the system and the main surroundings?",
      "System: the fuel and the oxygen it reacts with. Surroundings: the water, the can, the air, and everything else",
      ["System: the water being heated. Surroundings: the fuel only",
       "System: the flame. Surroundings: the thermometer only",
       "System: the whole apparatus. Surroundings: nothing, because the apparatus is complete"],
      "The system is the part under study: here the reacting fuel and oxygen. Everything else that can exchange energy with it, starting with the water and can, is the surroundings.",{});
  }
]));

E("u3-72-conservation",3,["7.2"],1,"var",varset([
  function(){
    return mcq("The law of conservation of energy states that",
      "Energy can be converted from one form to another, but the total amount of energy in the universe stays constant",
      ["Energy can be created by exothermic reactions and destroyed by endothermic ones",
       "The energy of a system can never change",
       "Heat and work are the only two forms of energy"],
      "Energy is never created or destroyed, only converted or transferred. That is why the energy lost by a system always equals the energy gained by its surroundings.",{});
  },
  function(){
    var q=pick([120,250,480,750]);
    return mcq("In an experiment, a chemical system releases "+q+" J of energy to its surroundings. By the law of conservation of energy, the surroundings",
      "Gain exactly "+q+" J of energy",
      ["Gain more than "+q+" J, because transfers multiply energy",
       "Gain less than "+q+" J, because some energy is destroyed in transfer",
       "Gain no energy, because released energy disappears"],
      "Conservation of energy requires the books to balance: what the system loses, the surroundings gain, joule for joule. The surroundings gain exactly "+q+" J.",{q:q});
  }
]));

// LEVEL: 2 - Re-drawing the system boundary on apparatus and classifying as open, closed, or isolated.
// VARIANTS: Four boundary cases at equal mix: (a) water only in stoppered flask; (b) water + flask inside thick insulated box; (c) reacting chemicals only in open beaker; (d) gas in thin-walled steel cylinder in water bath.
// LENGTHS: key=98, distractors=100,98,98
E("u3-72-boundary-choice",3,["7.2"],2,"gen",function(){
  var cases=[
    {
      num:1,
      stem:"Hot water sits inside a stoppered glass flask on a bench. The system is defined strictly as the water itself.",
      key:"Closed, because energy crosses the boundary into the glass while matter is kept in by the stopper.",
      ds:[
        "Isolated, because the glass flask is stoppered and prevents any matter or energy from escaping.",
        "Open, because heat passes freely through the glass walls from the hot water to the surroundings.",
        "Isolated, because the boundary is drawn around the liquid water rather than around the lab room."
      ],
      exp:"With the water as the system, the stopper prevents matter (water vapour) from escaping, while thermal energy still passes through the glass walls to the surroundings."
    },
    {
      num:2,
      stem:"A stoppered flask of hot water is sealed inside a thick, rigid, insulated box. The system is defined as everything inside the outer box.",
      key:"Isolated, because neither matter nor appreciable energy crosses the outer insulated boundary wall.",
      ds:[
        "Closed, because energy still moves from the hot water into the glass flask inside the outer box.",
        "Open, because water vapour can evaporate from the liquid surface into the air space in the flask.",
        "Closed, because any rigid sealed container allows heat to cross its outer walls at the same rate."
      ],
      exp:"Transfers between the water and the flask occur inside the boundary; across the outer insulated box, neither matter nor appreciable energy exchanges with the surroundings."
    },
    {
      num:3,
      stem:"Zinc granules react with hydrochloric acid in an uncovered beaker, releasing hydrogen gas and heat. The system is defined as the reacting chemicals only.",
      key:"Open, because both matter (escaping hydrogen gas) and energy (heat) cross the system boundary.",
      ds:[
        "Closed, because the liquid acid remains inside the glass beaker throughout the entire reaction.",
        "Isolated, because the chemical energy released stays within the products formed in the reaction.",
        "Closed, because only gas leaves the beaker while the solid zinc and liquid solution stay behind."
      ],
      exp:"Hydrogen gas leaves the reacting mixture (matter transfer) and heat flows into the beaker and air (energy transfer), so both matter and energy cross the boundary."
    },
    {
      num:4,
      stem:"A sample of gas is sealed inside a thin-walled steel cylinder submerged in a water bath. The system is defined as the gas inside the cylinder.",
      key:"Closed, because the sealed steel walls block matter transfer while heat crosses the thin walls.",
      ds:[
        "Open, because a gaseous sample always expands and exchanges matter with its surrounding medium.",
        "Isolated, because the steel cylinder is completely sealed so nothing can cross its metal walls.",
        "Open, because thermal energy passes rapidly through the thin steel walls into the water bath."
      ],
      exp:"The sealed steel cylinder prevents any gas molecules from entering or leaving, while thermal energy conducts readily across the thin metal wall."
    }
  ];
  var c=pick(cases);
  return mcq(c.stem+" How is this system classified?",
    c.key,c.ds,
    c.exp+" Therefore, the system is <b>"+c.key+"</b>.",
    {caseNum:c.num});
});

// LEVEL: 1 - Identifying what crosses the boundary between system and surroundings for a given setup.
// VARIANTS: Three fixed variants: (a) uncovered beaker of hot water; (b) hot water in stoppered flask; (c) reaction in sealed insulated steel bomb.
// LENGTHS: key=91, distractors=93,93,97
// LENGTHS: key=97, distractors=96,98,97
// LENGTHS: key=93, distractors=100,98,97
E("u3-72-crossing-judgement",3,["7.2"],1,"var",varset([
  function(){
    var key="Both matter (as escaping water vapour) and energy (as heat) cross the system boundary.";
    return mcq("An uncovered beaker of hot water sits on a laboratory bench, with the water defined as the system. What crosses the boundary between the system and its surroundings?",
      key,
      [
        "Only energy crosses the boundary as heat, while no matter leaves the uncovered water surface.",
        "Only matter crosses the boundary as water vapour, while no thermal energy enters the room air.",
        "Neither matter nor energy crosses the boundary because the beaker stays stationary on the bench."
      ],
      "Because the beaker has no lid, water evaporates into the room (matter transfer) and heat flows into the cooler air and bench (energy transfer). Therefore, <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="Energy crosses the boundary as heat through the glass, while matter is kept inside the flask.";
    return mcq("Hot water is sealed inside a stoppered glass flask, with the water defined as the system. What crosses the boundary between the system and its surroundings?",
      key,
      [
        "Matter crosses the boundary through the stopper, while no thermal energy passes through the glass.",
        "Both matter and energy cross the boundary freely because glass cannot block escaping water vapour.",
        "Neither matter nor energy crosses the boundary because the rubber stopper seals the flask tightly."
      ],
      "The stopper blocks water vapour from escaping (no matter transfer), but heat still conducts through the glass walls into the surroundings (energy transfer). Therefore, <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="Neither matter nor appreciable energy crosses the boundary between the system and surroundings.";
    return mcq("A combustion reaction occurs inside a sealed, heavily insulated steel bomb calorimeter, with the bomb contents as the system. What crosses the boundary?",
      key,
      [
        "Only matter crosses the boundary because the reaction inside produces high-pressure gaseous products.",
        "Only energy crosses the boundary because heat passes easily through thick insulated calorimeter walls.",
        "Both matter and energy cross the boundary whenever a chemical reaction releases heat inside a vessel."
      ],
      "The heavy steel walls prevent any gases or liquids from escaping (no matter transfer), and the thick insulation prevents heat exchange with the room (no energy transfer). Therefore, <b>"+key+"</b>.",
      {variant:3});
  }
]));

/* ---------- 7.3 Define specific heat ---------- */

// LEVEL: 1 - Direct recall and face-value reading of specific heat capacity definition and units.
// VARIANTS: Four fixed variants: (a) definition of specific heat capacity; (b) SI/laboratory units of c; (c) face-value meaning of c = 4.18 J/(g·°C) for 10.0 g water; (d) comparing two equal-mass samples with different c values.
// LENGTHS: key=91, distractors=92,90,92
// LENGTHS: key=53, distractors=46,51,51
// LENGTHS: key=89, distractors=89,90,88
// LENGTHS: key=102, distractors=102,99,97
E("u3-73-define-c",3,["7.3"],1,"var",varset([
  function(){
    var key="The amount of heat required to raise the temperature of one gram of a substance by 1 °C.";
    return mcq("Which statement correctly defines the specific heat capacity of a substance?",
      key,
      [
        "The amount of heat required to raise the temperature of one mole of a substance by 1 °C.",
        "The total amount of thermal energy stored inside a sample regardless of its mass or state.",
        "The amount of heat required to melt one gram of a solid substance at its melting point."
      ],
      "Specific heat capacity is defined per unit mass (1 g) and per degree of temperature change (1 °C). Therefore, the correct definition is <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="Joules per gram per degree Celsius, written J/(g·°C).";
    return mcq("What are the standard laboratory units used to express specific heat capacity in Chemistry 3202?",
      key,
      [
        "Joules per gram of substance, written J/g.",
        "Joules per degree Celsius, written J/°C.",
        "Kilojoules per mole of substance, written kJ/mol."
      ],
      "Because specific heat capacity measures energy per unit mass per degree of temperature change, its units are joules divided by grams and degrees Celsius. Therefore, the units are <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="Raising the temperature of the 10.0 g sample by 1 °C requires 41.8 J of absorbed heat.";
    return mcq("Liquid water has a specific heat capacity of 4.18 J/(g·°C). What does this value directly tell you about a 10.0 g sample of liquid water?",
      key,
      [
        "Raising the temperature of the 10.0 g sample by 1 °C requires 4.18 J of absorbed heat.",
        "Raising the temperature of the 10.0 g sample by 1 °C requires 0.418 J of absorbed heat.",
        "Raising the temperature of the 10.0 g sample by 1 °C requires 418 J of absorbed heat."
      ],
      "Each gram of water requires 4.18 J to warm by 1 °C, so 10.0 g requires 10.0 × 4.18 J = 41.8 J for a 1 °C rise. Therefore, <b>"+key+"</b>.",
      {variant:3});
  },
  function(){
    var key="The substance with the larger specific heat capacity needs more heat for the same temperature rise.";
    return mcq("Two different pure substances have the exact same mass, and one has a larger specific heat capacity than the other. How do they compare when warmed?",
      key,
      [
        "The substance with the larger specific heat capacity needs less heat for the same temperature rise.",
        "Both substances need the exact same amount of heat because their sample masses are identical.",
        "The substance with the larger specific heat capacity must already be at a higher temperature."
      ],
      "A larger specific heat capacity means each gram requires more joules of heat to increase its temperature by 1 °C. Therefore, <b>"+key+"</b>.",
      {variant:4});
  }
]));

// LEVEL: 1 - Applying the definition of specific heat capacity to sample scaling statements.
// VARIANTS: Five metals (aluminium, iron, copper, silver, lead) paired with four masses (2.00, 5.00, 10.0, 20.0 g).
// LENGTHS: key=103, distractors=103,95,91
E("u3-73-c-units-judge",3,["7.3"],1,"gen",function(){
  var metals=[
    {name:"aluminium",c:0.897,cStr:"0.897"},
    {name:"iron",c:0.450,cStr:"0.450"},
    {name:"copper",c:0.385,cStr:"0.385"},
    {name:"silver",c:0.235,cStr:"0.235"},
    {name:"lead",c:0.128,cStr:"0.128"}
  ];
  var masses=[
    {m:2.00,mStr:"2.00",m2Str:"4.00"},
    {m:5.00,mStr:"5.00",m2Str:"10.0"},
    {m:10.0,mStr:"10.0",m2Str:"20.0"},
    {m:20.0,mStr:"20.0",m2Str:"40.0"}
  ];
  var met=pick(metals);
  var ms=pick(masses);
  var q1=sfR(ms.m*met.c,3);
  var q2=sfR(2*ms.m*met.c,3);
  var qHalf=sfR(0.5*ms.m*met.c,3);
  var c2Str=F3(2*met.c);
  var key="Warming "+ms.mStr+" g by 1 °C takes "+F3(q1)+" J, and doubling the mass to "+ms.m2Str+" g requires "+F3(q2)+" J per °C.";
  var ds=[
    "Warming "+ms.mStr+" g by 1 °C takes "+F3(q1)+" J, and doubling the mass to "+ms.m2Str+" g requires "+F3(qHalf)+" J per °C.",
    "Warming "+ms.mStr+" g by 1 °C takes "+F3(q1)+" J, and warming the same "+ms.mStr+" g by 2 °C still takes "+F3(q1)+" J.",
    "Warming "+ms.mStr+" g by 1 °C takes "+F3(q1)+" J, and doubling the mass changes c to "+c2Str+" J/(g·°C)."
  ];
  return mcq("A sample of "+met.name+" has a mass of "+ms.mStr+" g and a specific heat capacity of "+met.cStr+" J/(g·°C). Which statement correctly applies this value?",
    key,ds,
    "At "+met.cStr+" J/(g·°C), each gram requires "+met.cStr+" J for a 1 °C rise, so "+ms.mStr+" g requires "+ms.mStr+" × "+met.cStr+" = "+F3(q1)+" J per °C. Doubling the mass to "+ms.m2Str+" g doubles the heat needed per degree to "+F3(q2)+" J, while c itself stays "+met.cStr+" J/(g·°C). Therefore, <b>"+key+"</b>.",
    {metal:met.name,c:met.c,m:ms.m,q1:q1,q2:q2});
});

// LEVEL: 2 - Comparative reasoning from specific heat capacity values without a calculation chain.
// VARIANTS: Pairs of distinct substances from the section table whose c values differ by at least 0.200 J/(g·°C).
// LENGTHS: key=107, distractors=109,110,101
E("u3-73-larger-c",3,["7.3"],2,"gen",function(){
  var subs=[
    {name:"water",c:4.18,cStr:"4.18"},
    {name:"ice",c:2.10,cStr:"2.10"},
    {name:"ethanol",c:2.44,cStr:"2.44"},
    {name:"aluminium",c:0.897,cStr:"0.897"},
    {name:"iron",c:0.450,cStr:"0.450"},
    {name:"copper",c:0.385,cStr:"0.385"},
    {name:"silver",c:0.235,cStr:"0.235"},
    {name:"lead",c:0.128,cStr:"0.128"}
  ];
  var s1,s2,tries=0;
  do{
    s1=pick(subs);
    s2=pick(subs);
    tries++;
  }while((s1.name===s2.name||Math.abs(s1.c-s2.c)<0.200)&&tries<60);
  var hi=s1.c>s2.c?s1:s2;
  var lo=s1.c>s2.c?s2:s1;
  var key=hi.name[0].toUpperCase()+hi.name.slice(1)+" warms less, because its larger specific heat capacity means each gram needs more heat per °C.";
  var ds=[
    lo.name[0].toUpperCase()+lo.name.slice(1)+" warms less, because its smaller specific heat capacity means each gram needs more heat per °C.",
    hi.name[0].toUpperCase()+hi.name.slice(1)+" warms less, because its smaller specific heat capacity means each gram stores less heat per °C.",
    "Both warm by the same amount, because equal masses receiving equal heat per gram always rise equally."
  ];
  return mcq("Equal masses of "+s1.name+" (c = "+s1.cStr+" J/(g·°C)) and "+s2.name+" (c = "+s2.cStr+" J/(g·°C)) receive the exact same amount of heat per gram without changing state. Which substance experiences the smaller temperature rise, and why?",
    key,ds,
    "Specific heat capacity is the heat needed to raise 1 g by 1 °C. Because "+hi.name+" has the larger value ("+hi.cStr+" J/(g·°C) versus "+lo.cStr+" J/(g·°C)), each gram absorbs more energy for every 1 °C increase, so the same heat per gram produces fewer degrees of temperature rise. Therefore, <b>"+key+"</b>.",
    {s1:s1.name,c1:s1.c,s2:s2.name,c2:s2.c,smallerRise:hi.name});
});

// LEVEL: 2 - Distinguishing intensive specific heat capacity (per gram) from extensive total heat capacity (per sample).
// VARIANTS: Three fixed variants: (a) teaspoon vs swimming pool of water; (b) 1 g vs 1 kg of copper; (c) substance property vs sample property.
// LENGTHS: key=107, distractors=105,107,104
// LENGTHS: key=104, distractors=104,104,104
// LENGTHS: key=106, distractors=104,105,107
E("u3-73-c-versus-capacity",3,["7.3"],2,"var",varset([
  function(){
    var key="Both have the same specific heat capacity per gram, while the pool has a much larger total heat capacity.";
    return mcq("How does a teaspoon of liquid water compare with a full swimming pool of liquid water at the same temperature?",
      key,
      [
        "The swimming pool has a much larger specific heat capacity because it contains far more grams of water.",
        "Both have the same total heat capacity because both samples are made of pure liquid water at 4.18 J/(g·°C).",
        "The teaspoon has a larger specific heat capacity because a small sample warms up much faster than a pool."
      ],
      "Specific heat capacity (4.18 J/(g·°C)) is an intensive property of water per gram, so it is identical for both; total heat capacity multiplies c by mass and is vastly larger for the pool. Therefore, <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="Both have the same specific heat capacity, while warming the kilogram by 1 °C takes 1000 times more heat.";
    return mcq("Compare a 1.00 g piece of pure copper with a 1.00 kg block of pure copper (c = 0.385 J/(g·°C)). Which statement is correct?",
      key,
      [
        "The 1.00 kg block has a specific heat capacity of 385 J/(g·°C), which is 1000 times the 1.00 g value.",
        "Warming the 1.00 kg block by 1 °C takes the same 0.385 J because specific heat capacity never changes.",
        "The 1.00 g piece has a specific heat capacity 1000 times smaller per gram than the 1.00 kg copper block."
      ],
      "Both samples have c = 0.385 J/(g·°C), so 1.00 g takes 0.385 J per °C while 1000 g takes 1000 × 0.385 J = 385 J per °C. Therefore, <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="Specific heat capacity belongs to the substance and stays constant, whereas total heat capacity doubles.";
    return mcq("When the mass of a pure metal sample is doubled, what happens to its specific heat capacity and its total heat capacity?",
      key,
      [
        "Specific heat capacity doubles with the mass, whereas total heat capacity stays constant for the metal.",
        "Both specific heat capacity and total heat capacity double because twice as many atoms are being warmed.",
        "Both specific heat capacity and total heat capacity stay constant because the identity of the metal is fixed."
      ],
      "Specific heat capacity is defined per gram of the substance and is independent of sample size, while total heat capacity (m × c) scales directly with mass. Therefore, <b>"+key+"</b>.",
      {variant:3});
  }
]));

// LEVEL: 2 - Explaining real-world thermal moderation settings directly from water's specific heat capacity.
// VARIANTS: Three settings at equal mix: coastal vs inland town temperature moderation, water as an engine coolant, and a hot water bottle staying warm overnight.
// LENGTHS: key=109, distractors=106,108,108
E("u3-73-water-moderates",3,["7.3"],2,"gen",function(){
  var cases=[
    {
      setting:"coastal",
      prompt:"Liquid water has a specific heat capacity of 4.18 J/(g·°C), whereas coastal rock and soil are near 0.800 J/(g·°C). Why does a coastal town experience milder daily temperature swings than an inland town at the same latitude?",
      key:"Water absorbs and releases large amounts of heat per gram with small temperature changes, moderating coastal air.",
      ds:[
        "Water has a low specific heat capacity per gram, so the ocean warms and cools rapidly to match the air.",
        "Water's high specific heat capacity prevents its temperature from ever changing when sunlight strikes the sea.",
        "Water has a higher density than rock and soil, which blocks solar radiation from warming the coastal air."
      ],
      exp:"Because water's c (4.18 J/(g·°C)) is over five times that of rock and soil (0.800 J/(g·°C)), the sea absorbs much heat by day and releases much heat by night with only a small temperature change."
    },
    {
      setting:"coolant",
      prompt:"Liquid water has a specific heat capacity of 4.18 J/(g·°C), much higher than most liquids and metals. Why is water circulated through a car engine's cooling system?",
      key:"Each gram of water absorbs a large amount of heat from the engine while undergoing a small temperature rise.",
      ds:[
        "Each gram of water absorbs very little heat from the engine, keeping the coolant from warming up quickly.",
        "Water's high specific heat capacity allows it to absorb engine heat without any rise in its temperature.",
        "Water has a lower density than engine metal, so it carries heat away solely by rising to the top radiator."
      ],
      exp:"A high specific heat capacity (4.18 J/(g·°C)) lets circulating water remove large quantities of thermal energy from the engine block per gram without overheating."
    },
    {
      setting:"bottle",
      prompt:"A rubber hot water bottle filled with warm water (c = 4.18 J/(g·°C)) stays warm through a cold night far longer than a heated brick of the same mass. Why?",
      key:"Each gram of water releases a large amount of heat to the bed as it cools by each degree Celsius.",
      ds:[
        "Water has a low specific heat capacity, so each gram releases its stored thermal energy very slowly.",
        "Water's high specific heat capacity keeps the water at its starting temperature without cooling at all.",
        "Water evaporates through the sealed rubber walls, carrying thermal energy steadily into the blankets."
      ],
      exp:"With c = 4.18 J/(g·°C), water releases 4.18 J per gram for every 1 °C drop, delivering sustained warmth over many hours."
    }
  ];
  var c=pick(cases);
  return mcq(c.prompt,c.key,c.ds,c.exp+" Therefore, <b>"+c.key+"</b>.",{setting:c.setting});
});

// LEVEL: 2 - Ranking three substances by cooling rate from their specific heat capacities alone.
// VARIANTS: Three distinct substances chosen from the 8-substance section table.
// LENGTHS: key=23, distractors=23,23,23
E("u3-73-rank-cooling",3,["7.3"],2,"gen",function(){
  var subs=[
    {name:"water",c:4.18,cStr:"4.18"},
    {name:"ice",c:2.10,cStr:"2.10"},
    {name:"ethanol",c:2.44,cStr:"2.44"},
    {name:"aluminium",c:0.897,cStr:"0.897"},
    {name:"iron",c:0.450,cStr:"0.450"},
    {name:"copper",c:0.385,cStr:"0.385"},
    {name:"silver",c:0.235,cStr:"0.235"},
    {name:"lead",c:0.128,cStr:"0.128"}
  ];
  var s1,s2,s3,key,ds,tries=0;
  do{
    var sh=shuffle(subs);
    s1=sh[0];s2=sh[1];s3=sh[2];
    tries++;
    var asc=[s1,s2,s3].slice().sort(function(a,b){return a.c-b.c;});
    var desc=[s1,s2,s3].slice().sort(function(a,b){return b.c-a.c;});
    var midSwap=[asc[0],asc[2],asc[1]];
    var dealt=[s1,s2,s3];
    function fmtOrd(arr){return arr[0].name+", "+arr[1].name+", "+arr[2].name;}
    key=fmtOrd(asc);
    var cands=[fmtOrd(desc),fmtOrd(midSwap),fmtOrd(dealt),[asc[1],asc[0],asc[2]].map(function(x){return x.name;}).join(", ")];
    ds=[];
    for(var i=0;i<cands.length&&ds.length<3;i++){
      if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);
    }
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  var ascList=[s1,s2,s3].slice().sort(function(a,b){return a.c-b.c;});
  return mcq("Three equal-mass samples of "+s1.name+" (c = "+s1.cStr+" J/(g·°C)), "+s2.name+" (c = "+s2.cStr+" J/(g·°C)), and "+s3.name+" (c = "+s3.cStr+" J/(g·°C)) start at the same temperature and lose heat at the exact same rate per gram. Rank the samples from fastest to slowest temperature drop.",
    key,ds,
    "Because all three lose the same heat per gram each second, the sample that requires the least heat per degree Celsius drops in temperature fastest. Ordering from smallest to largest specific heat capacity ("+ascList[0].cStr+" < "+ascList[1].cStr+" < "+ascList[2].cStr+" J/(g·°C)) gives <b>"+key+"</b>.",
    {s1:s1.name,c1:s1.c,s2:s2.name,c2:s2.c,s3:s3.name,c3:s3.c,order:key});
});

/* ---------- 7.4 Calculate and compare the energy involved in changes of temperature ---------- */

E("u3-74-q-temp",3,["7.4"],2,"gen",function(){
  var subs=[
    {n:"water",c:4.18,unit:"J/(g\u00B7\u00B0C)"},
    {n:"aluminium",c:0.897,unit:"J/(g\u00B7\u00B0C)"},
    {n:"copper",c:0.385,unit:"J/(g\u00B7\u00B0C)"},
    {n:"iron",c:0.450,unit:"J/(g\u00B7\u00B0C)"}
  ];
  var s=pick(subs);
  var m=pick([25.0,40.0,50.0,75.0,100,125,150,200,250,300]);
  var dt=pick([3.0,4.5,5.0,6.5,8.0,10.0,12.5,15.0,18.0,20.0,25.0]);
  var q=sfR(m*s.c*dt,4);
  var ans=sfR(m*s.c*dt,3);
  return numq("A "+gF(m)+" g sample of "+s.n+" (c = "+gF(s.c)+" "+s.unit+") absorbs heat and its temperature rises by "+gF(dt)+" \u00B0C. Calculate the heat absorbed. Give your answer in J.",
    ans,Math.max(0.02*ans,1),
    "q = mc\u0394T = "+gF(m)+" g \u00D7 "+gF(s.c)+" J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J. The heat absorbed is <b>"+F3(ans)+" J</b>.",{});
});

E("u3-74-find-delta-t",3,["7.4"],2,"gen",function(){
  var subs=[{n:"water",c:4.18},{n:"aluminium",c:0.897},{n:"iron",c:0.450},{n:"copper",c:0.385}];
  var s=pick(subs);
  var m=pick([50.0,80.0,100,150,200,250]);
  var dtT=pick([4.0,5.0,6.0,7.5,9.0,10.0,12.0,15.0]);
  var q0=sfR(m*s.c*dtT,3);
  var dt=sfR(q0/(m*s.c),4);
  var ans=sfR(dt,3);
  var t1=pick([15.0,18.0,20.0,22.0]);
  return numq("A "+gF(m)+" g sample of "+s.n+" (c = "+gF(s.c)+" J/(g\u00B7\u00B0C)) starts at "+gF(t1)+" \u00B0C and absorbs "+F3(q0)+" J of heat. Calculate the temperature change of the sample. Give your answer in \u00B0C.",
    ans,Math.max(0.02*ans,0.05),
    "\u0394T = q / (mc) = "+F3(q0)+" J / ("+gF(m)+" g \u00D7 "+gF(s.c)+" J/(g\u00B7\u00B0C)) = "+iF(dt)+" \u00B0C. The temperature change is <b>"+F3(ans)+" \u00B0C</b>, so the final temperature is "+gF(t1)+" + "+F3(ans)+" = "+F3(sfR(t1+ans,3))+" \u00B0C.",{});
});

E("u3-74-find-c",3,["7.4"],2,"gen",function(){
  var metals=[{n:"aluminium",c:0.897},{n:"copper",c:0.385},{n:"iron",c:0.450},{n:"lead",c:0.128},{n:"silver",c:0.235},{n:"zinc",c:0.388}];
  var s=pick(metals);
  var m=pick([20.0,30.0,50.0,75.0,100]);
  var dt=pick([10.0,15.0,20.0,25.0,30.0,40.0]);
  var q0=sfR(m*s.c*dt,3);
  var c=sfR(q0/(m*dt),4);
  var ans=sfR(c,3);
  return numq("A "+gF(m)+" g sample of an unknown metal absorbs "+F3(q0)+" J of heat and its temperature rises by "+gF(dt)+" \u00B0C. Calculate the specific heat capacity of the metal. Give your answer in J/(g\u00B7\u00B0C).",
    ans,Math.max(0.02*ans,0.004),
    "c = q / (m\u0394T) = "+F3(q0)+" J / ("+gF(m)+" g \u00D7 "+gF(dt)+" \u00B0C) = "+iF(c)+" J/(g\u00B7\u00B0C). The specific heat capacity is <b>"+F3(ans)+" J/(g\u00B7\u00B0C)</b>, which matches "+s.n+" in the Reference Information.",{});
});

E("u3-74-mixture-temp",3,["7.4"],3,"gen",function(){
  var metals=[{n:"aluminium",c:0.897},{n:"copper",c:0.385},{n:"iron",c:0.450}];
  var s=pick(metals);
  var m1=pick([25.0,40.0,50.0,60.0,80.0,100]);
  var T1=pick([60.0,75.0,80.0,90.0,100]);
  var m2=pick([100,150,200,250,300]);
  var T2=pick([15.0,18.0,20.0,22.0,25.0]);
  var A1=sfR(m1*s.c,4),A2=sfR(m2*4.18,4);
  var Tf=(A1*T1+A2*T2)/(A1+A2);
  var ans=sfR(Tf,3);
  return numq("A "+gF(m1)+" g piece of "+s.n+" (c = "+gF(s.c)+" J/(g\u00B7\u00B0C)) at "+gF(T1)+" \u00B0C is dropped into "+gF(m2)+" g of water at "+gF(T2)+" \u00B0C in an insulated container. Calculate the final temperature of the mixture. Give your answer in \u00B0C.",
    ans,Math.max(0.02*ans,0.2),
    "Heat lost by the metal = heat gained by the water. m\u2081c\u2081 = "+gF(m1)+" \u00D7 "+gF(s.c)+" = "+iF(A1)+" J/\u00B0C and m\u2082c\u2082 = "+gF(m2)+" \u00D7 4.18 = "+iF(A2)+" J/\u00B0C. Tf = (m\u2081c\u2081T\u2081 + m\u2082c\u2082T\u2082) / (m\u2081c\u2081 + m\u2082c\u2082) = ("+iF(A1)+" \u00D7 "+gF(T1)+" + "+iF(A2)+" \u00D7 "+gF(T2)+") / ("+iF(A1)+" + "+iF(A2)+") = "+iF(Tf)+" \u00B0C. The final temperature is <b>"+F3(ans)+" \u00B0C</b>.",{});
});

// LEVEL: 3 - Summing two heat sinks (solution and calorimeter apparatus) in a temperature-change calculation.
// LENGTHS: key=4
E("u3-74-cup-heat",3,["7.4"],3,"gen",function(){
  var m=ri(10,30)*10;
  var C=ri(15,60);
  var dT=ri(30,120)/10;
  var qSol=m*4.18*dT;
  var qApp=C*dT;
  var qTot=qSol+qApp;
  var ans=sfR(qTot,3);
  var tol=Math.max(0.02*ans,5);
  return numq("A chemical reaction in solution runs inside a calorimeter whose cup and thermometer together have a heat capacity of "+gF(C)+" J/°C. The solution has a mass of "+gF(m)+" g and a specific heat capacity of 4.18 J/(g·°C), and its temperature rises by "+fmtF(dT,1)+" °C. Calculate the total heat absorbed by the solution and the calorimeter apparatus together, in joules.",
    ans,tol,
    "Unlike the simplified treatment that considers only the solution, both the solution and the apparatus absorb heat:<br>q(solution) = mcΔT = ("+gF(m)+" g)(4.18 J/(g·°C))("+fmtF(dT,1)+" °C) = "+iF(qSol)+" J<br>q(apparatus) = CΔT = ("+gF(C)+" J/°C)("+fmtF(dT,1)+" °C) = "+iF(qApp)+" J<br>q(total) = "+iF(qSol)+" J + "+iF(qApp)+" J = "+iF(qTot)+" J. Rounded to three significant figures, the total heat absorbed is <b>"+F3(ans)+" J</b>.",
    {m:m,C:C,dT:dT,qSol:sfR(qSol,4),qApp:sfR(qApp,4),ans:ans});
});

// LEVEL: 2 - Calculating q = mcΔT for two independent samples and comparing the absorbed heats.
// VARIANTS: Two samples drawn independently from the section table, masses 50.0 to 300 g, ΔT 5.0 to 40.0 °C, guarded so heats differ by at least 15%.
// LENGTHS: key=89, distractors=89,89,85
E("u3-74-compare-heating",3,["7.4"],2,"gen",function(){
  var subs=[
    {name:"water",c:4.18,cStr:"4.18"},
    {name:"ice",c:2.10,cStr:"2.10"},
    {name:"ethanol",c:2.44,cStr:"2.44"},
    {name:"aluminium",c:0.897,cStr:"0.897"},
    {name:"iron",c:0.450,cStr:"0.450"},
    {name:"copper",c:0.385,cStr:"0.385"},
    {name:"silver",c:0.235,cStr:"0.235"},
    {name:"lead",c:0.128,cStr:"0.128"}
  ];
  var sA,sB,mA,mB,dTA,dTB,qA,qB,tries=0;
  do{
    sA=pick(subs);
    sB=pick(subs.filter(function(x){return x.name!==sA.name;}));
    mA=ri(10,60)*5;
    mB=ri(10,60)*5;
    dTA=ri(50,400)/10;
    dTB=ri(50,400)/10;
    qA=mA*sA.c*dTA;
    qB=mB*sB.c*dTB;
    tries++;
  }while((Math.abs(qA-qB)<0.15*Math.max(qA,qB)||Math.abs(dTA-dTB)<2.0)&&tries<100);
  var qA3=sfR(qA,3),qB3=sfR(qB,3);
  var diff3=sfR(Math.abs(qA3-qB3),3);
  var bigIsA=qA3>qB3;
  var bigName=bigIsA?"Sample A ("+sA.name+")":"Sample B ("+sB.name+")";
  var smallName=bigIsA?"Sample B ("+sB.name+")":"Sample A ("+sA.name+")";
  var dTBigName=dTA>dTB?"Sample A ("+sA.name+")":"Sample B ("+sB.name+")";
  var qAStr=F3(qA3)+" J",qBStr=F3(qB3)+" J",diffStr=F3(diff3)+" J";
  var key=bigName+" absorbed more heat ("+qAStr+" vs "+qBStr+"), exceeding the other by "+diffStr+".";
  var ds=[
    smallName+" absorbed more heat ("+qAStr+" vs "+qBStr+"), exceeding the other by "+diffStr+".",
    bigName+" absorbed more heat ("+qBStr+" vs "+qAStr+"), exceeding the other by "+diffStr+".",
    dTBigName+" absorbed more heat ("+qAStr+" vs "+qBStr+"), because it had the larger ΔT."
  ];
  if(ds[2]===key){
    ds[2]=smallName+" absorbed more heat ("+qBStr+" vs "+qAStr+"), because specific heat is ignored.";
  }
  return mcq("Sample A is "+gF(mA)+" g of "+sA.name+" (c = "+sA.cStr+" J/(g·°C)) warmed by "+fmtF(dTA,1)+" °C. Sample B is "+gF(mB)+" g of "+sB.name+" (c = "+sB.cStr+" J/(g·°C)) warmed by "+fmtF(dTB,1)+" °C. Which sample absorbed more heat, and by how much?",
    key,ds,
    "Compute q = mcΔT for each sample:<br>Sample A: q = ("+gF(mA)+" g)("+sA.cStr+" J/(g·°C))("+fmtF(dTA,1)+" °C) = "+iF(qA)+" J ("+qAStr+")<br>Sample B: q = ("+gF(mB)+" g)("+sB.cStr+" J/(g·°C))("+fmtF(dTB,1)+" °C) = "+iF(qB)+" J ("+qBStr+")<br>Difference: |"+qAStr+" − "+qBStr+"| = "+diffStr+". Therefore, <b>"+key+"</b>.",
    {sA:sA.name,mA:mA,cA:sA.c,dTA:dTA,sB:sB.name,mB:mB,cB:sB.c,dTB:dTB,qA:qA3,qB:qB3,diff:diff3});
});

/* ---------- 7.5 Define endothermic reaction, exothermic reaction, enthalpy, bond energy, heat of reaction, and molar enthalpy ---------- */

E("u3-75-exo-endo",3,["7.5"],1,"gen",function(){
  var r=pick([
    {d:"magnesium reacts with hydrochloric acid and the test tube warms up",a:"Exothermic: the system releases energy, so \u0394H is negative",w:["Endothermic: the system releases energy, so \u0394H is positive","Exothermic: the system absorbs energy, so \u0394H is positive","Endothermic: \u0394H is zero because it is a reaction"]},
    {d:"an instant cold pack is activated and the pack becomes cold",a:"Endothermic: the system absorbs energy from the surroundings, so \u0394H is positive",w:["Exothermic: the system absorbs energy, so \u0394H is negative","Endothermic: the system releases energy, so \u0394H is negative","Exothermic: \u0394H is positive because the pack gets cold"]},
    {d:"propane burns in a barbecue, heating the grill",a:"Exothermic: the system releases energy, so \u0394H is negative",w:["Endothermic: burning always absorbs energy","Exothermic: the system absorbs energy, so \u0394H is negative","Endothermic: \u0394H is positive because the grill gets hot"]},
    {d:"ice melts in a drink, cooling the drink",a:"Endothermic: the melting system absorbs energy from the drink, so \u0394H is positive",w:["Exothermic: melting releases cold into the drink","Endothermic: the system releases energy, so \u0394H is positive","Exothermic: \u0394H is negative because the drink cools"]}
  ]);
  var t=ri(15,30);
  return mcq("At a starting temperature of "+t+" \u00B0C, "+r.d+". Which statement is correct?",
    r.a,r.w,
    "Follow the energy: released by the system means exothermic and \u0394H negative; absorbed by the system means endothermic and \u0394H positive. <b>"+r.a+"</b>.",{t:t});
});

E("u3-75-delta-h-numeric",3,["7.5"],2,"gen",function(){
  var Hreact=pick([120,180,240,300,360,420]);
  var d=pick([-140,-95,-70,-45,-30,35,60,85,120]);
  var Hprod=Hreact+d;
  var ans=sfR(d,3);
  var q=numq("The total enthalpy of the reactants of a chemical system is "+Hreact+" kJ and the total enthalpy of the products is "+Hprod+" kJ. Calculate \u0394H for the reaction. Give your answer in kJ.",
    ans,1,
    "\u0394H = H(products) - H(reactants) = "+Hprod+" kJ - "+Hreact+" kJ = "+(d>0?"+":"")+iF(d)+" kJ. So \u0394H = <b>"+(d>0?"+":"")+F3(d)+" kJ</b>"+(d<0?", and the reaction is exothermic.":", and the reaction is endothermic."),{});
  q.figure=c32peSVG(Hreact,Math.max(Hreact,Hprod)+55,Hprod,{r:"Reactants: "+Hreact+" kJ",p:"Products: "+Hprod+" kJ"});
  return q;
});

E("u3-75-temp-direction",3,["7.5"],1,"var",varset([
  function(){
    return mcq("A reaction mixture in an insulated container shows a temperature increase as the reaction proceeds. This tells you that",
      "The reaction is exothermic: energy released by the system raised the temperature of the mixture",
      ["The reaction is endothermic: absorbing energy raised the temperature",
       "The reaction has \u0394H = 0, because the container is insulated",
       "The products have more enthalpy than the reactants"],
      "In an insulated container the energy released by an exothermic reaction has nowhere to go except into the mixture itself, so the temperature rises and \u0394H is negative.",{});
  },
  function(){
    return mcq("A dissolving process in an insulated container shows a temperature decrease as it proceeds. This tells you that",
      "The process is endothermic: the system took energy from the mixture, lowering its temperature",
      ["The process is exothermic: releasing energy lowered the temperature",
       "The process has \u0394H = 0, because no heat crossed the walls",
       "The products have less enthalpy than the reactants"],
      "The temperature fell because the system absorbed energy from its immediate surroundings, the mixture. Absorbing energy is endothermic, with \u0394H positive.",{});
  },
  function(){
    return mcq("An exothermic reaction is run in an ordinary open beaker, and the mixture's temperature stays almost unchanged. The best explanation is",
      "The energy released escapes to the room about as fast as the reaction produces it, because the beaker is not insulated",
      ["The reaction must actually be thermoneutral, with \u0394H = 0",
       "Exothermic reactions never change the temperature of their mixture",
       "The thermometer must be faulty, since temperature must rise"],
      "Temperature change reflects the balance between energy produced and energy lost. In an uninsulated beaker the released energy leaks away steadily, so the mixture need not warm noticeably even though \u0394H is negative.",{});
  }
]));

E("u3-75-q-vs-dh",3,["7.5"],2,"var",varset([
  function(){
    return mcq("A gas is produced by a reaction in a cylinder fitted with a movable piston. The gas expands and pushes the piston out. Compared with the enthalpy change of the reaction, the heat released to the surroundings is",
      "Less, because some of the released energy was spent doing expansion work on the piston instead of appearing as heat",
      ["More, because expansion creates extra energy",
       "Exactly equal in every reaction, whether or not a piston moves",
       "Zero, because all the energy went into the piston"],
      "Energy is conserved: energy released = heat given out + work done. When the system spends energy pushing a piston, less remains to appear as heat, so the measured heat is less than the total enthalpy change.",{});
  },
  function(){
    return mcq("The enthalpy change of a reaction, \u0394H, equals the heat transferred only under the condition of",
      "Constant pressure, with the system doing no work other than expansion work",
      ["Constant volume in every case",
       "A completely isolated system",
       "A reaction that produces no gases"],
      "\u0394H is defined so that at constant pressure it matches the heat flow, provided the only work is expansion work against the pressure. At constant volume or with other work involved, heat and \u0394H differ.",{});
  },
  function(){
    return mcq("A reaction takes place in a sealed, rigid container (constant volume) and warms the container. In this case, the heat released is a measure of",
      "The total energy change of the system, because no expansion work can be done at constant volume",
      ["Only part of the energy change, because most energy went into expansion",
       "Nothing at all about the energy change",
       "The activation energy of the reaction"],
      "With a rigid container the system cannot push anything back, so no expansion work is done and all of the energy change appears as heat. That is the principle behind bomb calorimetry.",{});
  }
]));

E("u3-75-calorimeter-types",3,["7.5"],2,"gen",function(){
  var bomb=Math.random()<0.5;
  var v=pick([100,150,200,250]);
  var tp=ri(15,30);
  if(bomb){
    return mcq("At "+tp+" \u00B0C, a "+v+" mL coffee-cup calorimeter is open to the air and used for a reaction in solution. A bomb calorimeter is sealed and rigid. Which statement is correct?",
      "The coffee-cup calorimeter works at constant pressure, so it measures \u0394H directly; the bomb works at constant volume",
      ["The coffee-cup calorimeter works at constant volume, so it measures \u0394H directly",
       "Both instruments work at constant pressure",
       "The bomb calorimeter is used mainly for reactions in solution"],
      "The open cup is exposed to the atmosphere, so the pressure stays constant and the heat measured is \u0394H. The sealed, rigid bomb holds volume constant instead. <b>Constant pressure for the cup, constant volume for the bomb</b>.",{});
  }
  return mcq("At "+tp+" \u00B0C, a fuel sample is burned in a bomb calorimeter (containing a measured mass of water) to find its energy content. The bomb is the right choice mainly because",
    "Its sealed, rigid design prevents matter loss and expansion work, so the heat measured captures the full energy change of the combustion",
    ["It is open to the air, so the pressure stays constant",
     "It lets the hot gases escape so they do not disturb the thermometer",
     "It uses a larger mass of water than any other calorimeter"],
    "Combustion produces hot, expanding gases. The rigid sealed bomb keeps everything in and forbids expansion work, so the temperature rise of the water accounts for the energy change. <b>The sealed, rigid design is the point</b>.",{});
});

E("u3-75-qp-statement",3,["7.5"],1,"var",varset([
  function(){
    return mcq("In the expression \u0394H = q\u209A, the subscript p indicates that",
      "The heat is measured at constant pressure",
      ["The heat is measured at constant volume",
       "The heat is measured per mole of product only",
       "The reaction involves a precipitate"],
      "The subscript gives the condition attached to the quantity: p for constant pressure. \u0394H equals the heat flow when the reaction runs at constant pressure.",{});
  },
  function(){
    return mcq("Most ordinary bench reactions (in open beakers or flasks) take place at",
      "Constant pressure, because the container is open to the atmosphere",
      ["Constant volume, because beakers are rigid",
       "Zero pressure, because the containers are open",
       "Constant temperature, because the room does not change"],
      "An open container is exposed to the air, so the atmosphere holds the pressure essentially constant while the reaction runs. That is why bench calorimetry measures \u0394H.",{});
  },
  function(){
    return mcq("A student seals a reacting mixture in a rigid bomb calorimeter and writes '\u0394H = q measured here'. A classmate objects. The objection is that",
      "In the rigid bomb the volume is constant, not the pressure, so the heat measured there is not q\u209A and does not equal \u0394H directly",
      ["The bomb has no thermometer, so no heat can be measured",
       "The equality \u0394H = q\u209A holds in every container",
       "\u0394H can never be measured, only calculated"],
      "The subscript condition matters: q\u209A is heat at constant pressure. The bomb enforces constant volume, a different condition, so its heat is a different (though related) quantity.",{});
  }
]));

E("u3-75-work-sign",3,["7.5"],2,"gen",function(){
  var dir=Math.random()<0.5;
  var L=pick([0.5,1.0,1.5,2.0]);
  var tp=ri(15,35);
  if(dir){
    return mcq("During a reaction in a piston at "+tp+" \u00B0C, the gas volume increases by "+gF(L)+" L as the products form. Which statement about work is correct?",
      "The system does work on the surroundings, so part of the reaction's energy leaves as work rather than heat",
      ["The surroundings do work on the system, adding energy to it",
       "No work is done, because gases cannot push pistons",
       "The work done increases the enthalpy of the products"],
      "The expanding gas pushes the piston outward: the system spends energy on the surroundings. That energy is work, and it is separate from the heat transferred. <b>The system does work on the surroundings</b>.",{L:L});
  }
  return mcq("A gas in a piston at "+tp+" \u00B0C is compressed by "+gF(L)+" L when the surroundings push the piston in. Which statement about work is correct?",
    "The surroundings do work on the system, adding energy to the system",
    ["The system does work on the surroundings, losing energy",
     "No work is done, because the volume change is small",
     "Compression destroys energy, lowering the total"],
    "Pushing the piston in means the surroundings spend energy on the gas: work is done on the system and its energy increases. <b>The surroundings do work on the system</b>.",{L:L});
});

E("u3-75-sign-judgement",3,["7.5"],2,"gen",function(){
  var v=pick([
    {d:"a salt dissolves and the temperature of the solution drops by",a:"\u0394H is positive: the process is endothermic",w:["\u0394H is negative: the process is exothermic","\u0394H is zero: dissolving is not a chemical change","\u0394H is positive: the process is exothermic"]},
    {d:"an acid and a base are mixed and the temperature of the solution climbs by",a:"\u0394H is negative: the reaction is exothermic",w:["\u0394H is positive: the reaction is endothermic","\u0394H is zero: the temperature change is only from mixing","\u0394H is negative: the reaction is endothermic"]},
    {d:"a fuel burns under a calorimeter and the water temperature rises by",a:"\u0394H is negative: the combustion is exothermic",w:["\u0394H is positive: combustion is endothermic","\u0394H is zero: the water absorbed all of the change","\u0394H is positive: the combustion is exothermic"]}
  ]);
  var dt=pick([2.5,4.0,5.5,7.0,9.5,12.0]);
  var mw=pick([100,150,200,250]);
  return mcq("In a calorimetry measurement with "+gF(mw)+" g of solution in the cup, "+v.d+" "+gF(dt)+" \u00B0C. Which conclusion about \u0394H is correct?",
    v.a,v.w,
    "The measured temperature change of the surroundings reveals the direction of the energy flow: <b>"+v.a+"</b>.",{dt:dt,mw:mw});
});

E("u3-75-per-mole",3,["7.5"],1,"var",varset([
  function(){
    return mcq("Enthalpy changes are reported per mole (kJ/mol) mainly because",
      "Enthalpy change is extensive: it scales with the amount reacting, so dividing by the amount gives a value that can be compared between reactions",
      ["One mole is the only amount that can be measured in a calorimeter",
       "Per-mole values are always whole numbers",
       "The mole is the SI unit of temperature"],
      "Double the reactants and you double the heat. Reporting \u0394H per mole removes the size of the particular experiment and leaves the property of the reaction itself.",{});
  },
  function(){
    var q=pick([56,112,224]);
    return mcq("A neutralization releases "+q+" kJ when 2.00 mol of acid react. The molar enthalpy change is reported as half of "+q+" kJ because",
      "The reported value is per mole of acid, and 2.00 mol reacted, so the total is divided by 2.00",
      ["Half of the energy is always lost to the surroundings",
       "The calorimeter only measures half of the heat",
       "Molar values are defined with a factor of two"],
      "The measured heat belongs to the amount that actually reacted. Per mole means dividing by the moles: "+q+" kJ / 2.00 mol = "+(q/2)+" kJ/mol.",{q:q});
  }
]));

/* ---------- 7.6 Illustrate changes in energy of various chemical reactions, using potential energy diagrams ---------- */

E("u3-76-diagram-language",3,["7.6"],2,"gen",function(){
  var exo=Math.random()<0.6;
  var R=pick([80,100,150,200,250]),shift=exo?-pick([30,45,60,90]):pick([25,40,55,80]);
  var P=R+shift;
  var aspect=pick(["stored","barrier","classify"]);
  if(aspect==="stored"){
    var q=mcq("On an enthalpy diagram, the products of a reaction sit "+Math.abs(shift)+" kJ "+(exo?"below":"above")+" the reactants. Which statement about chemical potential energy is correct?",
      exo?"The products store less chemical potential energy than the reactants; the difference was released as heat and other forms":"The products store more chemical potential energy than the reactants; the difference was absorbed from the surroundings",
      [exo?"The products store more chemical potential energy than the reactants":"The products store less chemical potential energy than the reactants; the difference was absorbed from the surroundings",
       "Both store the same energy, because energy cannot be stored in bonds",
       "The diagram shows kinetic energy, not potential energy"],
      "The vertical gap between reactants and products is the energy stored difference. "+(exo?"Products lower means less energy stored in the products, and the difference left the system.":"Products higher means more energy stored in the products, taken in from the surroundings."),{aspect:aspect});
    q.figure=c32peSVG(0,Math.max(0,shift)+55,shift,{r:"Reactants",p:"Products"});
    return q;
  }
  if(aspect==="barrier"){
    var peak=P+pick([50,75,100,140]);
    var q=mcq("On an enthalpy diagram, the reactants sit at "+R+" kJ, the products at "+P+" kJ, and the top of the barrier at "+peak+" kJ. The height of the barrier above the reactants represents",
      "The activation energy: the minimum extra energy reactant particles need to react",
      ["The enthalpy change of the reaction",
       "The heat released to the surroundings",
       "The energy stored in the products"],
      "The barrier is measured from the reactant level to the peak: "+peak+" kJ - "+R+" kJ. It represents the activation energy. The enthalpy change is the separate gap between reactants and products.",{aspect:aspect});
    q.figure=c32peSVG(R,peak,P,{r:"Reactants: "+R+" kJ",k:"Barrier top: "+peak+" kJ",p:"Products: "+P+" kJ"});
    return q;
  }
  var q=mcq("On an enthalpy diagram, the reactants sit at "+R+" kJ and the products at "+P+" kJ. The reaction is",
    exo?"Exothermic, with \u0394H = -"+Math.abs(shift)+" kJ":"Endothermic, with \u0394H = +"+Math.abs(shift)+" kJ",
    [exo?"Endothermic, with \u0394H = +"+Math.abs(shift)+" kJ":"Exothermic, with \u0394H = -"+Math.abs(shift)+" kJ",
     exo?"Exothermic, with \u0394H = +"+Math.abs(shift)+" kJ":"Endothermic, with \u0394H = -"+Math.abs(shift)+" kJ",
     "Thermoneutral, with \u0394H = 0"],
    "\u0394H = H(products) - H(reactants) = "+P+" kJ - "+R+" kJ = "+(shift>0?"+":"")+shift+" kJ. The sign decides the classification: <b>"+(exo?"Exothermic":"Endothermic")+"</b>.",{aspect:aspect});
  q.figure=c32peSVG(R,Math.max(R,P)+55,P,{r:"Reactants: "+R+" kJ",p:"Products: "+P+" kJ"});
  return q;
});

// LEVEL: 1 - Identifying the labelled parts of a potential energy diagram and their definitions.
// VARIANTS: Four fixed variants: (a) top of the curve (activated complex); (b) peak height above reactants (forward Ea); (c) difference between reactant and product levels (ΔH); (d) left and right plateaus (reactants and products).
// LENGTHS: key=95, distractors=95,97,99
// LENGTHS: key=94, distractors=102,96,100
// LENGTHS: key=97, distractors=94,98,96
// LENGTHS: key=91, distractors=105,104,107
E("u3-76-diagram-parts",3,["7.6"],1,"var",varset([
  function(){
    var R=40,peak=130,Pr=15;
    var key="The activated complex, the unstable high-energy arrangement of atoms at the top of the barrier.";
    var q=mcq("In the potential energy diagram shown, what is represented by the highest point at the top of the energy curve?",
      key,
      [
        "The final products of the reaction, measured once all new chemical bonds have finished forming.",
        "The added catalyst, which lowers the energy pathway without being consumed in the overall change.",
        "The enthalpy change ΔH of the reaction, measured directly from the horizontal baseline to the peak."
      ],
      "The peak of a potential energy profile marks the transition state (activated complex), where old bonds are partially broken and new bonds are partially formed. Therefore, <b>"+key+"</b>.",
      {variant:1,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants",p:"Products"});
    return q;
  },
  function(){
    var R=30,peak=115,Pr=65;
    var key="The activation energy of the forward reaction, the minimum energy needed to reach the barrier.";
    var q=mcq("In the potential energy diagram shown, what does the vertical distance from the reactant level up to the peak represent?",
      key,
      [
        "The enthalpy change ΔH of the reaction, equal to the energy difference between products and reactants.",
        "The activation energy of the reverse reaction, measured from the product plateau up to the peak.",
        "The total potential energy stored inside the product molecules once the reaction reaches completion."
      ],
      "The vertical climb from the reactants to the transition-state peak is the energy barrier reactants must overcome, known as the forward activation energy. Therefore, <b>"+key+"</b>.",
      {variant:2,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants",p:"Products"});
    return q;
  },
  function(){
    var R=55,peak=135,Pr=20;
    var key="The enthalpy change ΔH of the reaction, the net energy difference between products and reactants.";
    var q=mcq("In the potential energy diagram shown, what is represented by the vertical difference between the reactant plateau and the product plateau?",
      key,
      [
        "The forward activation energy, the energy required to climb from the reactants up to the peak.",
        "The reverse activation energy, the energy required to climb from the products back up to the peak.",
        "The potential energy of the activated complex alone, measured without reference to the products."
      ],
      "Enthalpy change depends only on the initial and final states (ΔH = H(products) − H(reactants)), shown by the vertical gap between the two horizontal plateaus. Therefore, <b>"+key+"</b>.",
      {variant:3,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants",k:"Activated complex",p:"Products"});
    return q;
  },
  function(){
    var R=25,peak=120,Pr=70;
    var key="The reactants before the reaction begins (left) and the products after it finishes (right).";
    var q=mcq("In the potential energy diagram shown, what do the flat horizontal plateaus at the far left and far right represent?",
      key,
      [
        "The surrounding air at the start of the experiment (left) and the thermometer reading at the end (right).",
        "The solid catalyst before reaction begins (left) and the recovered catalyst after reaction ends (right).",
        "The starting temperature of the mixture (left) and the final equilibrium temperature of the vessel (right)."
      ],
      "A potential energy diagram plots potential energy along the reaction coordinate from initial reactants on the left plateau to final products on the right plateau. Therefore, <b>"+key+"</b>.",
      {variant:4,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{k:"Peak"});
    return q;
  }
]));

// LEVEL: 2 - Calculating ΔH and classifying exothermic vs endothermic directly from dealt potential energy levels.
// VARIANTS: Exothermic and endothermic reactions at equal mix with dealt reactant, product, and peak levels.
// LENGTHS: key=47, distractors=46,47,47
E("u3-76-diagram-dh",3,["7.6"],2,"gen",function(){
  var isExo=Math.random()<0.5;
  var R,Pr,peak,dh,eaF,eaR,tries=0;
  do{
    if(isExo){
      R=ri(35,85);
      var mag=ri(20,R-5);
      Pr=R-mag;
    }else{
      R=ri(10,50);
      var mag2=ri(20,80);
      Pr=R+mag2;
    }
    var margin=ri(40,110);
    peak=Math.max(R,Pr)+margin;
    dh=Pr-R;
    eaF=peak-R;
    eaR=peak-Pr;
    tries++;
  }while((Math.abs(dh)===eaF||Math.abs(dh)===eaR||eaF===eaR)&&tries<80);
  var verdict=dh<0?"exothermic":"endothermic";
  var oppVerdict=dh<0?"endothermic":"exothermic";
  var dhStr=(dh>0?"+"+dh:String(dh));
  var flipStr=(-dh>0?"+"+(-dh):String(-dh));
  var key="ΔH = "+dhStr+" kJ/mol, and the reaction is "+verdict+".";
  var ds=[
    "ΔH = "+flipStr+" kJ/mol, and the reaction is "+oppVerdict+".",
    "ΔH = +"+eaF+" kJ/mol, and the reaction is "+verdict+".",
    "ΔH = +"+eaR+" kJ/mol, and the reaction is "+verdict+"."
  ];
  var q=mcq("From the potential energy diagram shown (reactants at "+R+" kJ, peak at "+peak+" kJ, products at "+Pr+" kJ), what is ΔH for the forward reaction and how is the reaction classified?",
    key,ds,
    "Subtract the reactant enthalpy from the product enthalpy: ΔH = H(products) − H(reactants) = "+Pr+" kJ − "+R+" kJ = "+dhStr+" kJ/mol. Because ΔH is "+(dh<0?"negative (products lie lower than reactants)":"positive (products lie higher than reactants)")+", the reaction is "+verdict+". Therefore, <b>"+key+"</b>.",
    {R:R,peak:peak,Pr:Pr,dh:dh,isExo:isExo});
  q.figure=c32peSVG(R,peak,Pr,{r:R+" kJ",k:peak+" kJ",p:Pr+" kJ"});
  return q;
});

// LEVEL: 2 - Matching a drawn potential energy diagram to its verbal reaction profile description.
// VARIANTS: Three fixed variants: (a) exothermic with high barrier; (b) endothermic with low barrier; (c) exothermic with small ΔH and low barrier.
// LENGTHS: key=76, distractors=76,76,76
// LENGTHS: key=76, distractors=76,76,76
// LENGTHS: key=81, distractors=81,81,81
E("u3-76-diagram-select",3,["7.6"],2,"var",varset([
  function(){
    var R=80,peak=195,Pr=20;
    var key="An exothermic reaction that releases heat and has a large activation energy.";
    var q=mcq("Which verbal profile matches the potential energy diagram shown?",
      key,
      [
        "An endothermic reaction that absorbs heat and has a large activation energy.",
        "An exothermic reaction that releases heat and has a small activation energy.",
        "An endothermic reaction that absorbs heat and has a small activation energy."
      ],
      "The product plateau (20 kJ) sits well below the reactant plateau (80 kJ), showing heat is released (exothermic), while the peak (195 kJ) rises far above the reactants, indicating a large activation barrier. Therefore, the diagram shows <b>"+key+"</b>.",
      {variant:1,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants (80 kJ)",k:"Peak (195 kJ)",p:"Products (20 kJ)"});
    return q;
  },
  function(){
    var R=30,peak=105,Pr=85;
    var key="An endothermic reaction that absorbs heat and has a small activation energy.";
    var q=mcq("Which verbal profile matches the potential energy diagram shown?",
      key,
      [
        "An exothermic reaction that releases heat and has a small activation energy.",
        "An endothermic reaction that absorbs heat and has a large activation energy.",
        "An exothermic reaction that releases heat and has a large activation energy."
      ],
      "The product plateau (85 kJ) sits above the reactant plateau (30 kJ), showing net heat absorption (endothermic), and the peak (105 kJ) sits only 20 kJ above the products, giving a relatively small activation barrier. Therefore, the diagram shows <b>"+key+"</b>.",
      {variant:2,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants (30 kJ)",k:"Peak (105 kJ)",p:"Products (85 kJ)"});
    return q;
  },
  function(){
    var R=55,peak=80,Pr=35;
    var key="An exothermic reaction that releases a small amount of heat with a small barrier.";
    var q=mcq("Which verbal profile matches the potential energy diagram shown?",
      key,
      [
        "An endothermic reaction that absorbs a small amount of heat with a small barrier.",
        "An exothermic reaction that releases a small amount of heat with a large barrier.",
        "An endothermic reaction that absorbs a small amount of heat with a large barrier."
      ],
      "The products (35 kJ) lie just 20 kJ below the reactants (55 kJ) for a small exothermic ΔH, and the peak (80 kJ) rises only 25 kJ above the reactants for a small activation barrier. Therefore, the diagram shows <b>"+key+"</b>.",
      {variant:3,R:R,peak:peak,Pr:Pr});
    q.figure=c32peSVG(R,peak,Pr,{r:"Reactants (55 kJ)",k:"Peak (80 kJ)",p:"Products (35 kJ)"});
    return q;
  }
]));

// LEVEL: 3 - Distinguishing kinetics (activation energy lowering) from thermodynamics (unchanged ΔH and endpoint levels) on a catalyst diagram.
// VARIANTS: Uncatalyzed activation energy (90, 110, 130, 150 kJ) paired with catalyst drop (30, 45, 60 kJ).
// LENGTHS: key=113, distractors=107,104,100
E("u3-76-diagram-catalyst",3,["7.6"],3,"gen",function(){
  var peak=pick([90,110,130,150]);
  var drop=pick([30,45,60]);
  var catPeak=peak-drop;
  var key="The catalyst lowers Ea from "+peak+" kJ to "+catPeak+" kJ and speeds the reaction, while ΔH and both levels stay unchanged.";
  var ds=[
    "The catalyst lowers Ea from "+peak+" kJ to "+catPeak+" kJ and makes ΔH more negative by "+drop+" kJ at the products.",
    "The catalyst keeps Ea at "+peak+" kJ while lowering the product plateau by "+drop+" kJ to release extra heat.",
    "The catalyst raises Ea from "+catPeak+" kJ to "+peak+" kJ, slowing the reaction while leaving ΔH unchanged."
  ];
  var q=mcq("The diagram compares the same exothermic reaction without a catalyst (solid curve, Ea = "+peak+" kJ) and with a catalyst (dashed curve, Ea = "+catPeak+" kJ). What does adding the catalyst change, and what does it leave unchanged?",
    key,ds,
    "A catalyst provides an alternative pathway with a lower transition-state barrier, reducing Ea from "+peak+" kJ to "+catPeak+" kJ (a drop of "+drop+" kJ) so the reaction proceeds faster. Because the reactant and product plateaus do not move, ΔH is unchanged. Therefore, <b>"+key+"</b>.",
    {peak:peak,drop:drop,catPeak:catPeak});
  q.figure=c32catSVG(peak,drop);
  return q;
});

// LEVEL: 3 - Determining overall ΔH across a two-step reaction profile through an intermediate.
// VARIANTS: Five dealt energy levels (reactants, peak 1, intermediate, peak 2, products) with exothermic or endothermic overall ΔH.
// LENGTHS: key=26, distractors=26,26,26
E("u3-76-diagram-two-step",3,["7.6"],3,"gen",function(){
  function twoStepSVG(R,p1,mid,p2,Pr){
    var maxV=Math.max(R,p1,mid,p2,Pr,100);
    var minV=Math.min(R,p1,mid,p2,Pr,0);
    var span=(maxV-minV)||100;
    function yOf(v){return Math.round(165-((v-minV)/span)*125);}
    var yR=yOf(R),yP1=yOf(p1),yM=yOf(mid),yP2=yOf(p2),yPr=yOf(Pr);
    var d="M 55 "+yR+" L 95 "+yR+" C 115 "+yR+", 125 "+yP1+", 145 "+yP1+" C 165 "+yP1+", 175 "+yM+", 195 "+yM+" C 215 "+yM+", 225 "+yP2+", 245 "+yP2+" C 265 "+yP2+", 275 "+yPr+", 295 "+yPr+" L 335 "+yPr;
    return "<svg viewBox=\"0 0 360 200\" width=\"360\" height=\"200\" xmlns=\"http://www.w3.org/2000/svg\">"+
      "<line x1=\"45\" y1=\"20\" x2=\"45\" y2=\"175\" stroke=\"#334155\" stroke-width=\"1.5\"/>"+
      "<line x1=\"45\" y1=\"175\" x2=\"345\" y2=\"175\" stroke=\"#334155\" stroke-width=\"1.5\"/>"+
      "<text x=\"14\" y=\"105\" font-size=\"11\" fill=\"#334155\" transform=\"rotate(-90 14 105)\" text-anchor=\"middle\">Potential Energy (kJ)</text>"+
      "<text x=\"195\" y=\"193\" font-size=\"11\" fill=\"#334155\" text-anchor=\"middle\">Reaction Coordinate</text>"+
      "<path d=\""+d+"\" fill=\"none\" stroke=\"#2563eb\" stroke-width=\"2.5\"/>"+
      "<text x=\"75\" y=\""+(yR-6)+"\" font-size=\"10\" fill=\"#1e293b\" text-anchor=\"middle\">R: "+R+" kJ</text>"+
      "<text x=\"145\" y=\""+(yP1-6)+"\" font-size=\"10\" fill=\"#1e293b\" text-anchor=\"middle\">P1: "+p1+" kJ</text>"+
      "<text x=\"195\" y=\""+(yM+13)+"\" font-size=\"10\" fill=\"#1e293b\" text-anchor=\"middle\">Int: "+mid+" kJ</text>"+
      "<text x=\"245\" y=\""+(yP2-6)+"\" font-size=\"10\" fill=\"#1e293b\" text-anchor=\"middle\">P2: "+p2+" kJ</text>"+
      "<text x=\"315\" y=\""+(yPr-6)+"\" font-size=\"10\" fill=\"#1e293b\" text-anchor=\"middle\">Pr: "+Pr+" kJ</text>"+
      "</svg>";
  }
  var isExo=Math.random()<0.5;
  var R,p1,mid,p2,Pr,dh,dh1,dh2,peakSum,tries=0;
  do{
    if(isExo){
      R=ri(45,85);
      var mag=ri(20,R-5);
      Pr=R-mag;
    }else{
      R=ri(10,45);
      var mag2=ri(20,75);
      Pr=R+mag2;
    }
    var lowEnd=Math.min(R,Pr);
    var highEnd=Math.max(R,Pr);
    mid=ri(lowEnd+10,highEnd+35);
    p1=Math.max(R,mid)+ri(40,95);
    p2=Math.max(mid,Pr)+ri(35,90);
    dh=Pr-R;
    dh1=mid-R;
    dh2=Pr-mid;
    peakSum=(p1-R)+(p2-mid);
    tries++;
    var vals=[dh,dh1,dh2,peakSum];
    var uniq=[];
    for(var i=0;i<vals.length;i++){if(uniq.indexOf(vals[i])<0)uniq.push(vals[i]);}
  }while(uniq.length<4&&tries<100);
  function fmtVal(v){return (v>0?"+"+v:String(v));}
  var key="The overall ΔH is "+fmtVal(dh)+" kJ/mol.";
  var ds=[
    "The overall ΔH is "+fmtVal(dh1)+" kJ/mol.",
    "The overall ΔH is "+fmtVal(dh2)+" kJ/mol.",
    "The overall ΔH is "+fmtVal(peakSum)+" kJ/mol."
  ];
  var q=mcq("A two-step reaction proceeds from reactants ("+R+" kJ) over a first peak ("+p1+" kJ) to an intermediate ("+mid+" kJ), then over a second peak ("+p2+" kJ) to products ("+Pr+" kJ). What is the overall ΔH of the reaction?",
    key,ds,
    "Because enthalpy is a state function, the overall ΔH depends only on the initial reactants and final products, regardless of the intermediate or barrier heights: ΔH = H(products) − H(reactants) = "+Pr+" kJ − "+R+" kJ = "+fmtVal(dh)+" kJ/mol. As a check, Step 1 ("+fmtVal(dh1)+" kJ/mol) + Step 2 ("+fmtVal(dh2)+" kJ/mol) = "+fmtVal(dh)+" kJ/mol. Therefore, <b>"+key+"</b>.",
    {R:R,p1:p1,mid:mid,p2:p2,Pr:Pr,dh:dh});
  q.figure=twoStepSVG(R,p1,mid,p2,Pr);
  return q;
});

/* ---------- 7.7 Calculate and compare the energy involved in changes of state and temperature ---------- */

E("u3-77-q-phase",3,["7.7"],2,"gen",function(){
  var mode=pick(["fus","vap","molfus","molvap"]);
  if(mode==="fus"||mode==="vap"){
    var fus=mode==="fus";
    var per=fus?334:2260;
    var m=pick([10.0,12.0,15.0,18.0,20.0,25.0,30.0,40.0,50.0,60.0,75.0,80.0,90.0,100]);
    var ctx=pick(["in a calorimetry experiment","in a classroom demonstration","in an insulated container"]);
    var q=sfR(m*per,4),ans=sfR(m*per,3);
    return numq((fus?"A sample of ice at 0 \u00B0C melts completely with no temperature change "+ctx+". The mass of the ice is ":"A sample of liquid water at 100 \u00B0C vaporizes completely with no temperature change "+ctx+". The mass of the water is ")+gF(m)+" g. Using "+(fus?"\u0394Hfus = 334 J/g":"\u0394Hvap = 2.26 \u00D7 10\u00B3 J/g")+" from the Reference Information, calculate the heat required. Give your answer in J, as a decimal or in scientific notation (for example 2.26e5).",
      ans,Math.max(0.02*ans,5),
      "No temperature change occurs during a phase change, so q = m \u00D7 "+(fus?"\u0394Hfus":"\u0394Hvap")+" = "+gF(m)+" g \u00D7 "+(fus?"334":"2.26 \u00D7 10\u00B3")+" J/g = "+iF(q)+" J. The heat required is <b>"+F3(ans)+" J</b>.",{mode:mode});
  }
  var n=pick([0.250,0.500,0.750,1.00,1.25,1.50,2.00,2.50,3.00,4.00]);
  var fus2=mode==="molfus";
  var perM=fus2?6.01:40.7;
  var ctx2=pick(["in a calorimetry experiment","in a classroom demonstration","in an insulated container"]);
  var qk=sfR(n*perM,4),ansk=sfR(n*perM,3);
  return numq((fus2?"A sample of ice at 0 \u00B0C melts completely with no temperature change "+ctx2+". The sample contains ":"A sample of liquid water at 100 \u00B0C vaporizes completely with no temperature change "+ctx2+". The sample contains ")+gF(n)+" mol of water. Using "+(fus2?"\u0394Hfus = 6.01 kJ/mol":"\u0394Hvap = 40.7 kJ/mol")+" from the Reference Information, calculate the heat required. Give your answer in kJ.",
    ansk,Math.max(0.02*ansk,0.1),
    "q = n \u00D7 "+(fus2?"\u0394Hfus":"\u0394Hvap")+" = "+gF(n)+" mol \u00D7 "+(fus2?"6.01":"40.7")+" kJ/mol = "+iF(qk)+" kJ. The heat required is <b>"+F3(ansk)+" kJ</b>.",{mode:mode});
});

E("u3-77-q-combined",3,["7.7"],3,"gen",function(){
  var heat=Math.random()<0.5;
  var m=pick([10.0,20.0,25.0,40.0,50.0]);
  if(heat){
    var tStart=pick([10.0,15.0,18.0]),tEnd=pick([30.0,40.0,50.0,60.0]);
    var s1=sfR(m*2.10*tStart,4),s2=sfR(m*334,4),s3=sfR(m*4.18*tEnd,4);
    var tot=sfR(s1+s2+s3,4),totk=sfR(tot/1000,4),ans=sfR(tot/1000,3);
    return numq("A "+gF(m)+" g sample of ice at -"+gF(tStart)+" \u00B0C is heated until it becomes liquid water at "+gF(tEnd)+" \u00B0C. For ice, c = 2.10 J/(g\u00B7\u00B0C); for liquid water, c = 4.18 J/(g\u00B7\u00B0C); \u0394Hfus = 334 J/g. Calculate the total heat absorbed. Give your answer in kJ.",
      ans,Math.max(0.02*ans,0.05),
      "Work in three stages. Warm the ice: q\u2081 = "+gF(m)+" \u00D7 2.10 \u00D7 "+gF(tStart)+" = "+iF(s1)+" J. Melt the ice: q\u2082 = "+gF(m)+" \u00D7 334 = "+iF(s2)+" J. Warm the water: q\u2083 = "+gF(m)+" \u00D7 4.18 \u00D7 "+gF(tEnd)+" = "+iF(s3)+" J. Total: q = "+iF(s1)+" + "+iF(s2)+" + "+iF(s3)+" = "+iF(tot)+" J = "+iF(totk)+" kJ. The total heat absorbed is <b>"+F3(ans)+" kJ</b>.",{dir:"heat"});
  }
  var tW=pick([40.0,50.0,60.0,70.0]);
  var s1b=sfR(m*4.18*tW,4),s2b=sfR(m*334,4);
  var totb=sfR(s1b+s2b,4),totkb=sfR(totb/1000,4),ansb=sfR(totb/1000,3);
  return numq("A "+gF(m)+" g sample of liquid water at "+gF(tW)+" \u00B0C is cooled until it is entirely ice at 0 \u00B0C. For liquid water, c = 4.18 J/(g\u00B7\u00B0C); \u0394Hfus = 334 J/g. Calculate the total heat released. Give your answer in kJ.",
    ansb,Math.max(0.02*ansb,0.05),
    "Work in two stages. Cool the water to 0 \u00B0C: q\u2081 = "+gF(m)+" \u00D7 4.18 \u00D7 "+gF(tW)+" = "+iF(s1b)+" J released. Freeze the water: q\u2082 = "+gF(m)+" \u00D7 334 = "+iF(s2b)+" J released. Total: q = "+iF(s1b)+" + "+iF(s2b)+" = "+iF(totb)+" J = "+iF(totkb)+" kJ. The total heat released is <b>"+F3(ansb)+" kJ</b>.",{dir:"cool"});
});

E("u3-77-curve-read",3,["7.7"],2,"gen",function(){
  var v=pick([
    {d:"the temperature stays perfectly flat while the solid turns to liquid, even though heating continues",a:"The substance is melting: the energy goes into separating the particles, not into raising their kinetic energy",w:["The thermometer is broken, because temperature must always rise when heating","The substance is boiling at that temperature","The energy is being destroyed by the phase change"]},
    {d:"the temperature rises steadily while the substance is a single liquid",a:"The liquid is warming: the energy raises the average kinetic energy of the particles",w:["The liquid is boiling the whole time","The energy goes into separating particles at a fixed temperature","The substance is changing phase continuously"]},
    {d:"the temperature stays perfectly flat at the highest plateau while the liquid turns to gas",a:"The substance is boiling: the energy goes into separating the particles completely, not into raising the temperature",w:["The substance has reached the temperature of the hot plate and can get no hotter for that reason alone","The gas is condensing as fast as it forms","The thermometer is at its maximum reading"]}
  ]);
  var m=pick([10.0,20.0,25.0,40.0,50.0,75.0,100,200]);
  var rate=pick(["a 50 W heater","a 100 W heater","a 200 W heater"]);
  var q=mcq("A "+gF(m)+" g sample of a pure substance is heated with "+rate+" and its temperature is recorded. On the heating curve, "+v.d+". Which explanation is correct?",
    v.a,v.w,
    "On a heating curve, sloping parts are single-phase warming and flat parts are phase changes at constant temperature. Here, <b>"+v.a+"</b>.",{});
  q.figure=c32heatSVG();
  return q;
});

E("u3-77-phase-concept",3,["7.7"],1,"var",varset([
  function(){
    return mcq("While ice melts at 0 \u00B0C, heat flows in but the temperature does not rise. The energy is spent",
      "Separating the water molecules from their fixed positions in the solid, increasing their potential energy",
      ["Raising the kinetic energy of the molecules, which the thermometer cannot detect yet",
       "Breaking the covalent bonds inside the water molecules",
       "Warming the container instead of the ice"],
      "Temperature measures average kinetic energy. During melting the incoming energy does the work of pulling molecules out of the solid lattice, raising potential energy instead, so the temperature waits until the change is complete.",{});
  },
  function(){
    return mcq("Which statement about enthalpy changes of phase is correct?",
      "Melting and vaporizing are endothermic (positive \u0394H), while freezing and condensing are exothermic (negative \u0394H) with the same magnitudes",
      ["All phase changes are endothermic",
       "Freezing has a larger enthalpy change than melting for the same substance",
       "Vaporizing takes less energy than melting for the same substance"],
      "A phase change and its reverse exchange the same energy in opposite directions: \u0394Hfus and freezing are a matched pair, as are vaporization and condensation.",{});
  },
  function(){
    return mcq("On a cold morning, dew forms on a car windshield and the glass under the dew is very slightly warmer than the dry glass nearby. The warming is because",
      "Condensation is exothermic: water vapour releases energy as it becomes liquid",
      ["Condensation is endothermic and always warms surfaces",
       "The dew insulates the glass from the cold air in a way that creates heat",
       "Frost must have formed first and then melted"],
      "Condensing is the reverse of vaporizing, so it releases the enthalpy of vaporization. That released energy slightly warms the surface the dew forms on.",{});
  }
]));

// LEVEL: 2 - Calculating heat released during exothermic phase changes (freezing or condensation).
// VARIANTS: Two modes at equal mix: Mode A (water freezing at 0 °C, ΔHfus = 334 J/g); Mode B (steam condensing at 100 °C, ΔHvap = 2.26 × 10³ J/g).
// LENGTHS: key=5
E("u3-77-q-release",3,["7.7"],2,"gen",function(){
  var mode=Math.random()<0.5?"freeze":"condense";
  var m=pick([15.0,25.0,40.0,50.0,75.0,100,125,150,200,250]);
  var qRaw,ans,tol,prompt,sol;
  if(mode==="freeze"){
    qRaw=m*334;
    ans=sfR(qRaw,3);
    tol=Math.max(0.02*ans,5);
    prompt="A "+gF(m)+" g sample of liquid water freezes completely into ice at 0 °C. Using the heat of fusion of water from the Reference Information (334 J/g), calculate the amount of heat released, in joules. Enter a positive value in decimal or scientific notation (for example, 2.26e5).";
    sol="Freezing is the exothermic reverse of melting, so each gram of water releases 334 J at 0 °C:<br>q = mΔHfus = ("+gF(m)+" g)(334 J/g) = "+iF(qRaw)+" J. Rounded to three significant figures, the heat released is <b>"+F3(ans)+" J</b>.";
  }else{
    qRaw=m*2260;
    ans=sfR(qRaw,3);
    tol=Math.max(0.02*ans,5);
    prompt="A "+gF(m)+" g sample of steam condenses completely into liquid water at 100 °C. Using the heat of vaporization of water from the Reference Information (2.26 × 10³ J/g), calculate the amount of heat released, in joules. Enter a positive value in decimal or scientific notation (for example, 2.26e5).";
    sol="Condensation is the exothermic reverse of vaporization, so each gram of steam releases 2.26 × 10³ J at 100 °C:<br>q = mΔHvap = ("+gF(m)+" g)(2.26 × 10³ J/g) = "+iF(qRaw)+" J. Rounded to three significant figures, the heat released is <b>"+sciF(ans,3)+" J</b>.";
  }
  return numq(prompt,ans,tol,sol,{mode:mode,m:m,ans:ans});
});

// LEVEL: 3 - Four-stage heating calculation from sub-zero ice completely to steam at 100 °C.
// LENGTHS: key=4
E("u3-77-full-range",3,["7.7"],3,"gen",function(){
  var m=ri(10,50);
  var tInit=-ri(5,20);
  var dTIce=0-tInit;
  var q1=m*2.10*dTIce;
  var q2=m*334;
  var q3=m*4.18*100;
  var q4=m*2260;
  var qTotJ=q1+q2+q3+q4;
  var qTotKJ=qTotJ/1000;
  var ans=sfR(qTotKJ,3);
  var tol=Math.max(0.02*ans,0.05);
  return numq("A "+gF(m)+".0 g sample of ice at "+tInit+" °C is heated until it turns completely into steam at 100 °C. Using c(ice) = 2.10 J/(g·°C), ΔHfus = 334 J/g, c(water) = 4.18 J/(g·°C), and ΔHvap = 2.26 × 10³ J/g, calculate the total heat absorbed, in kilojoules.",
    ans,tol,
    "Break the heating process into four stages:<br>1. Warm ice from "+tInit+" °C to 0 °C: q₁ = ("+gF(m)+".0 g)(2.10 J/(g·°C))("+dTIce+" °C) = "+iF(q1)+" J<br>2. Melt ice at 0 °C: q₂ = ("+gF(m)+".0 g)(334 J/g) = "+iF(q2)+" J<br>3. Warm liquid water from 0 °C to 100 °C: q₃ = ("+gF(m)+".0 g)(4.18 J/(g·°C))(100 °C) = "+iF(q3)+" J<br>4. Vaporize water at 100 °C: q₄ = ("+gF(m)+".0 g)(2.26 × 10³ J/g) = "+iF(q4)+" J<br>Total heat: q = "+iF(q1)+" + "+iF(q2)+" + "+iF(q3)+" + "+iF(q4)+" = "+iF(qTotJ)+" J = "+iF(qTotKJ)+" kJ. Rounded to three significant figures, the total heat absorbed is <b>"+F3(ans)+" kJ</b>.",
    {m:m,tInit:tInit,q1:sfR(q1,4),q2:sfR(q2,4),q3:sfR(q3,4),q4:sfR(q4,4),ans:ans});
});

/* ---------- 7.8 Calculate and compare the energy involved in chemical reactions ---------- */

E("u3-78-deltah-from-q",3,["7.8"],2,"gen",function(){
  var vol=pick([25.0,50.0,50.0,100]);
  var conc=pick([0.500,1.00,1.00,2.00]);
  var dt=pick([3.40,5.20,6.70,6.70,8.10,10.5,13.4]);
  var mtot=2*vol;
  var q=sfR(mtot*4.18*dt,4),qk=sfR(q/1000,4);
  var n=sfR(conc*vol/1000,4);
  var dH=sfR(-qk/n,4),ans=sfR(dH,3);
  return numq(gF(vol)+" mL of "+gF(conc)+" mol/L hydrochloric acid is mixed with "+gF(vol)+" mL of "+gF(conc)+" mol/L sodium hydroxide in a foam-cup calorimeter. The temperature of the mixture rises by "+gF(dt)+" \u00B0C. Taking the total mass of solution as "+gF(mtot)+" g and c = 4.18 J/(g\u00B7\u00B0C), calculate the enthalpy change of neutralization per mole of acid. Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat released: q = mc\u0394T = "+gF(mtot)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qk)+" kJ. Amount of acid: n = "+gF(conc)+" mol/L \u00D7 "+gF(vol)+" mL / 1000 = "+iF(n)+" mol. \u0394H = -q / n = -"+iF(qk)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The enthalpy change of neutralization is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

E("u3-78-dissolving",3,["7.8"],2,"gen",function(){
  var salts=[{n:"ammonium nitrate",M:80.05,endo:true},{n:"potassium nitrate",M:101.10,endo:true},{n:"sodium hydroxide",M:40.00,endo:false},{n:"calcium chloride",M:110.98,endo:false}];
  var s=pick(salts);
  var mass=pick([2.00,4.00,5.00,8.00,10.0]);
  var mw=pick([100,150,200,250]);
  var dt=pick([2.5,3.8,4.6,5.5,7.2,9.0]);
  var mtot=mw+mass;
  var q=sfR(mtot*4.18*dt,4),qk=sfR(q/1000,4);
  var n=sfR(mass/s.M,4);
  var dH=sfR((s.endo?1:-1)*qk/n,4),ans=sfR(dH,3);
  return numq(gF(mass)+" g of "+s.n+" is dissolved in "+gF(mw)+" g of water in a calorimeter. The temperature of the solution "+(s.endo?"falls":"rises")+" by "+gF(dt)+" \u00B0C. Taking the total mass of solution as "+gF(mtot)+" g and c = 4.18 J/(g\u00B7\u00B0C), calculate the molar enthalpy of solution of "+s.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat "+(s.endo?"absorbed from":"released into")+" the solution: q = mc\u0394T = "+gF(mtot)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qk)+" kJ. Amount dissolved: n = "+gF(mass)+" g / "+gF(s.M)+" g/mol = "+iF(n)+" mol. The temperature "+(s.endo?"fell, so the dissolving took energy in: \u0394H is positive":"rose, so the dissolving released energy: \u0394H is negative")+". \u0394H = "+(s.endo?"+":"-")+"q / n = "+iF(dH)+" kJ/mol. The molar enthalpy of solution is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

E("u3-78-molar-from-data",3,["7.8"],2,"gen",function(){
  var subs=[{n:"magnesium",M:24.31,dH:-602,verb:"burns in oxygen"},{n:"calcium",M:40.08,dH:-635,verb:"burns in oxygen"},{n:"sulfur",M:32.07,dH:-297,verb:"burns in oxygen"},{n:"zinc",M:65.39,dH:-350,verb:"reacts completely with excess acid"}];
  var s=pick(subs);
  var mass=pick([1.00,1.50,2.00,2.50,3.00,5.00]);
  var n=sfR(mass/s.M,4);
  var q=sfR(Math.abs(s.dH)*n*(0.97+Math.random()*0.06),3);
  var dH=sfR(-q/n,4),ans=sfR(dH,3);
  return numq("When "+gF(mass)+" g of "+s.n+" "+s.verb+", "+F3(q)+" kJ of energy is released. Calculate the molar enthalpy change for the reaction. Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),1),
    "Amount reacted: n = "+gF(mass)+" g / "+gF(s.M)+" g/mol = "+iF(n)+" mol. \u0394H = -q / n = -"+F3(q)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy change is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

// LEVEL: 2 - Computing ΔH = H(products) - H(reactants) for two reactions and comparing their energy exchanges.
// VARIANTS: Two ask modes at equal mix: (a) both exothermic with ΔH differing by at least 40 kJ, asking which releases more energy; (b) one exothermic and one endothermic, asking which reaction is endothermic.
// LENGTHS: key=102, distractors=102,102,102
E("u3-78-compare-release",3,["7.8"],2,"gen",function(){
  var mixed=Math.random()<0.5;
  var rA,pA,rB,pB,dhA,dhB,tries=0;
  do{
    rA=ri(20,120)*5;
    rB=ri(20,120)*5;
    if(mixed){
      var exoA=Math.random()<0.5;
      var magExo=ri(12,60)*5;
      var magEndo=ri(12,60)*5;
      pA=exoA?rA-magExo:rA+magEndo;
      pB=exoA?rB+magEndo:rB-magExo;
    }else{
      var mag1=ri(12,45)*5;
      var mag2=mag1+ri(9,35)*5;
      if(Math.random()<0.5){
        pA=rA-mag2;pB=rB-mag1;
      }else{
        pA=rA-mag1;pB=rB-mag2;
      }
    }
    dhA=pA-rA;
    dhB=pB-rB;
    tries++;
  }while((pA<=0||pB<=0||Math.abs(dhA-dhB)<40||Math.abs(Math.abs(dhA)-Math.abs(dhB))<40)&&tries<100);
  function sFmt(v){return (v>0?"+"+v:String(v))+" kJ";}
  var prompt,key,ds,sol;
  if(mixed){
    var endoName=dhA>0?"Reaction A":"Reaction B";
    var exoName=dhA>0?"Reaction B":"Reaction A";
    var highPName=pA>pB?"Reaction A":"Reaction B";
    prompt="Reaction A has reactant enthalpy "+rA+" kJ and product enthalpy "+pA+" kJ. Reaction B has reactant enthalpy "+rB+" kJ and product enthalpy "+pB+" kJ. Which reaction is endothermic, and why?";
    key=endoName+" is endothermic, because ΔH = "+sFmt(dhA)+" for A and "+sFmt(dhB)+" for B (products exceed reactants).";
    ds=[
      exoName+" is endothermic, because ΔH = "+sFmt(dhA)+" for A and "+sFmt(dhB)+" for B (reactants exceed products).",
      highPName+" is endothermic, because its final product enthalpy alone is higher regardless of reactant energy.",
      "Neither reaction is endothermic, because both reactions start with reactant totals in the same energy range."
    ];
    if(ds[1]===key){
      ds[1]=(highPName==="Reaction A"?"Reaction B":"Reaction A")+" is endothermic, because lower product energy means heat is absorbed.";
    }
    sol="Compute ΔH = H(products) − H(reactants) for each:<br>Reaction A: ΔH = "+pA+" kJ − "+rA+" kJ = "+sFmt(dhA)+"<br>Reaction B: ΔH = "+pB+" kJ − "+rB+" kJ = "+sFmt(dhB)+"<br>A positive ΔH indicates an endothermic reaction. Therefore, <b>"+key+"</b>.";
  }else{
    var moreExo=dhA<dhB?"Reaction A":"Reaction B";
    var lessExo=dhA<dhB?"Reaction B":"Reaction A";
    var highProd=pA>pB?"Reaction A":"Reaction B";
    prompt="Reaction A has reactant enthalpy "+rA+" kJ and product enthalpy "+pA+" kJ. Reaction B has reactant enthalpy "+rB+" kJ and product enthalpy "+pB+" kJ. Which reaction releases more energy to the surroundings?";
    key=moreExo+" releases more energy, because ΔH = "+sFmt(dhA)+" for A compared with ΔH = "+sFmt(dhB)+" for B.";
    ds=[
      lessExo+" releases more energy, because ΔH = "+sFmt(dhA)+" for A compared with ΔH = "+sFmt(dhB)+" for B.",
      highProd+" releases more energy, because it has the larger total product enthalpy at the end of reaction.",
      "Both reactions release equal energy, because both have comparable starting reactant enthalpy totals."
    ];
    if(ds[1]===key){
      ds[1]=(highProd==="Reaction A"?"Reaction B":"Reaction A")+" releases more energy, because smaller product enthalpy alone sets heat.";
    }
    sol="Compute ΔH = H(products) − H(reactants) for each:<br>Reaction A: ΔH = "+pA+" kJ − "+rA+" kJ = "+sFmt(dhA)+"<br>Reaction B: ΔH = "+pB+" kJ − "+rB+" kJ = "+sFmt(dhB)+"<br>The more negative ΔH corresponds to the greater heat release. Therefore, <b>"+key+"</b>.";
  }
  return mcq(prompt,key,ds,sol,{mixed:mixed,rA:rA,pA:pA,rB:rB,pB:pB,dhA:dhA,dhB:dhB});
});

// LEVEL: 3 - Determining limiting reactant from unequal acid/base volumes and concentrations before calculating molar enthalpy of neutralization.
// LENGTHS: key=5
E("u3-78-limiting",3,["7.8"],3,"gen",function(){
  var vols=[25.0,50.0,100];
  var concs=[0.500,1.00,2.00];
  var vA,cA,vB,cB,nA,nB,tries=0;
  do{
    vA=pick(vols);cA=pick(concs);
    vB=pick(vols);cB=pick(concs);
    nA=(vA/1000)*cA;
    nB=(vB/1000)*cB;
    tries++;
  }while((Math.abs(nA-nB)<0.20*Math.max(nA,nB))&&tries<100);
  var nLim=Math.min(nA,nB);
  var limSide=nA<nB?"HCl (acid)":"NaOH (base)";
  var mTot=vA+vB;
  var dT=pick([3.2,3.8,4.4,5.1,5.7,6.3,6.8,7.4]);
  var qJ=mTot*4.18*dT;
  var qKJ=qJ/1000;
  var dh=-qKJ/nLim;
  var ans=sfR(dh,3);
  var tol=Math.max(0.02*Math.abs(ans),0.5);
  return numq("In a foam-cup calorimeter, "+gF(vA)+" mL of "+F3(cA)+" mol/L HCl(aq) is mixed with "+gF(vB)+" mL of "+F3(cB)+" mol/L NaOH(aq). Assuming the combined solution has a mass of "+gF(mTot)+" g and a specific heat capacity of 4.18 J/(g·°C), the temperature increases by "+fmtF(dT,1)+" °C. Calculate the molar enthalpy of neutralization per mole of limiting reactant, in kJ/mol.",
    ans,tol,
    "First find the amount of each reactant (1:1 stoichiometry):<br>n(HCl) = ("+F3(vA/1000)+" L)("+F3(cA)+" mol/L) = "+iF(nA)+" mol<br>n(NaOH) = ("+F3(vB/1000)+" L)("+F3(cB)+" mol/L) = "+iF(nB)+" mol<br>The limiting reactant is "+limSide+" with "+iF(nLim)+" mol.<br>Next, find the heat absorbed by the solution:<br>q = mcΔT = ("+gF(mTot)+" g)(4.18 J/(g·°C))("+fmtF(dT,1)+" °C) = "+iF(qJ)+" J = "+iF(qKJ)+" kJ<br>Since the reaction releases heat to the solution, ΔH = −q / n(limiting) = −"+iF(qKJ)+" kJ / "+iF(nLim)+" mol = "+iF(dh)+" kJ/mol. Rounded to three significant figures, ΔH = <b>"+F3(ans)+" kJ/mol</b>.",
    {vA:vA,cA:cA,vB:vB,cB:cB,nA:sfR(nA,4),nB:sfR(nB,4),limSide:limSide,dT:dT,qKJ:sfR(qKJ,4),ans:ans});
});

// LEVEL: 2 - Calculating ΔH = q/n and assigning the thermodynamic sign from a stated heat transfer direction.
// VARIANTS: Exothermic (heat released, ΔH < 0) and endothermic (heat absorbed, ΔH > 0) at equal mix.
// LENGTHS: key=17, distractors=17,17,17
E("u3-78-dh-value",3,["7.8"],2,"gen",function(){
  var isExo=Math.random()<0.5;
  var q,n,dhMag,tries=0;
  do{
    n=pick([0.250,0.400,0.500,0.750,1.25,1.50,2.00,2.50,3.00,4.00]);
    q=ri(25,280);
    dhMag=sfR(q/n,3);
    var halfMag=sfR(dhMag/2,3);
    var q3=sfR(q,3);
    tries++;
  }while((dhMag===q3||dhMag===halfMag||q3===halfMag)&&tries<80);
  var sign=isExo?-1:1;
  var keyVal=sign*dhMag;
  var wrongSignVal=-sign*dhMag;
  var halfVal=sign*halfMag;
  var unscaledVal=sign*q3;
  function fmtDH(v){
    var s=v>0?"+"+F3(v):F3(v);
    return "ΔH = "+s+" kJ/mol";
  }
  var key=fmtDH(keyVal);
  var ds=[fmtDH(wrongSignVal),fmtDH(halfVal),fmtDH(unscaledVal)];
  var dirWord=isExo?"released":"absorbed";
  return mcq("During a calorimetry experiment, "+gF(q)+" kJ of heat is "+dirWord+" when "+F3(n)+" mol of a reactant reacts completely. What is ΔH for this reaction?",
    key,ds,
    "Divide the heat exchanged by the amount of reactant: |ΔH| = "+gF(q)+" kJ / "+F3(n)+" mol = "+F3(dhMag)+" kJ/mol. Because heat is "+dirWord+" by the system, ΔH is "+(isExo?"negative":"positive")+". Therefore, <b>"+key+"</b>.",
    {isExo:isExo,q:q,n:n,ans:keyVal});
});

/* ---------- 7.9 Determine experimentally the changes in energy of various chemical reactions ---------- */

E("u3-79-calorimetry-error",3,["7.9"],3,"gen",function(){
  var v=pick([
    {setup:"A student burns a fuel under an open beaker on a bench, with no lid and no insulation, in a room with a noticeable draft",flaw:"heat escapes to the air and the beaker instead of all going into the water",effect:"the calculated enthalpy change is too small in magnitude (less exothermic than the true value)"},
    {setup:"A student reads the starting temperature of the water, lights the fuel, and records the temperature only after the flame has been out for a minute",flaw:"the water cools toward room temperature during the delay, so the recorded maximum temperature is too low",effect:"the calculated enthalpy change is too small in magnitude (less exothermic than the true value)"},
    {setup:"A student measures the water with a graduated cylinder marked in 10 mL steps and uses a thermometer marked in 2 \u00B0C steps",flaw:"both measurements carry large uncertainties, so the calculated value has a wide error range",effect:"the calculated enthalpy change is imprecise: repeated trials scatter widely around the true value"}
  ]);
  var mw=pick([100,200,250]),fuel=pick(["methanol","ethanol","propane","a candle fuel"]),tp=ri(15,25);
  return mcq("In a calorimetry experiment at "+tp+" \u00B0C using "+mw+" g of water and burning "+fuel+", "+v.setup.toLowerCase()+". Which evaluation of this design is correct?",
    "The flaw is that "+v.flaw+", so "+v.effect,
    ["There is no flaw: school calorimetry always gives the exact enthalpy change",
     "The flaw makes the calculated enthalpy change exactly twice the true value",
     "The design is fine because "+v.flaw+", which has no effect on the result"],
    "Evaluating a design means tracing how each weakness moves the numbers. Here, "+v.flaw+", so "+v.effect+". <b>The calculated value is shifted in the direction the flaw pushes it</b>.",{});
});

E("u3-79-assumptions",3,["7.9"],2,"var",varset([
  function(){
    return mcq("In school calorimetry calculations using q = mc\u0394T for the water, which assumption is NOT part of the standard treatment?",
      "The calorimeter cup and thermometer absorb a large, calculated share of the heat",
      ["No heat is lost to the air or the bench",
       "The density of a dilute solution is taken as 1.00 g/mL",
       "The specific heat capacity of a dilute solution is taken as that of water"],
      "The standard school treatment assumes the container and thermometer absorb negligible heat. It also assumes no losses to the surroundings and treats dilute solutions as water for density and specific heat capacity.",{});
  },
  function(){
    return mcq("A calculation treats 150 mL of a dilute acid solution as 150 g with c = 4.18 J/(g\u00B7\u00B0C). The justification is that",
      "Dilute aqueous solutions are mostly water, so their density and specific heat capacity are taken to be those of water",
      ["All solutions have exactly the same properties as water",
       "Acids always have a density of 1.00 g/mL by definition",
       "The volume of a solution in mL always equals its mass in grams for every liquid"],
      "The approximation works because a dilute solution is overwhelmingly water. It is an assumption of the method, and it fails for concentrated solutions or non-aqueous solvents.",{});
  },
  function(){
    return mcq("Why is a foam cup with a lid a better calorimeter than an open glass beaker?",
      "The foam insulates and the lid blocks evaporation, so less heat escapes and the temperature change is closer to the true value",
      ["Foam reacts with the solution to add extra heat",
       "Glass absorbs the thermometer's scale markings",
       "A lid makes the reaction go to completion faster"],
      "The dominant error in calorimetry is heat escaping. Insulation slows conduction through the walls and the lid stops vapour carrying energy away, so more of the energy stays in the water where the thermometer can register it.",{});
  }
]));

E("u3-79-device-choice",3,["7.9"],2,"gen",function(){
  var v=pick([
    {task:"measuring the enthalpy change when an acid neutralizes a base in solution",dev:"a foam-cup (coffee-cup) calorimeter",w:["a bomb calorimeter","a melting-point apparatus","a distillation apparatus"]},
    {task:"finding the energy released per gram when a fuel pellet burns",dev:"a bomb calorimeter",w:["a foam-cup (coffee-cup) calorimeter","a melting-point apparatus","a burette and flask"]},
    {task:"measuring the temperature change when a salt dissolves in water",dev:"a foam-cup (coffee-cup) calorimeter",w:["a bomb calorimeter","a distillation apparatus","a gas syringe"]}
  ]);
  var vol=pick([50,100,150,200]),tp=ri(15,30);
  return mcq("In a laboratory at "+tp+" \u00B0C, a student needs a device for "+v.task+", using about "+vol+" mL of material where a liquid is involved. The best choice is",
    v.dev,v.w,
    "Match the device to the job: solution reactions at constant pressure belong in an insulated cup; combustions of fuels belong in the sealed bomb. The best choice is <b>"+v.dev+"</b>.",{vol:vol});
});

E("u3-79-insulation-effect",3,["7.9"],2,"gen",function(){
  var layers=pick([1,2,3]);
  var mw=pick([100,150,200,250]),fuel=pick(["methanol","ethanol","propane","a solid fuel pellet"]),t0=pick([15.0,20.0,25.0]);
  return mcq("A calorimetry trial burning "+fuel+" under "+gF(mw)+" g of water (starting at "+gF(t0)+" \u00B0C) is repeated with "+layers+" extra layer"+(layers>1?"s":"")+" of insulation wrapped around the cup. Compared with the first trial, the measured temperature change is expected to be",
    "Larger and closer to the true value, because less heat escapes to the surroundings",
    ["Smaller, because the insulation absorbs the reaction's energy permanently",
     "The same, because insulation cannot affect a temperature measurement",
     "Larger, because the insulation adds chemical energy to the reaction"],
    "Insulation does not add energy; it keeps the reaction's energy in the water. With less escaping, the thermometer registers a temperature change nearer the full amount. <b>Larger and closer to the true value</b>.",{layers:layers});
});

E("u3-79-procedure",3,["7.9"],2,"gen",function(){
  var v=pick([
    {q:"Why is the highest temperature reached (rather than the temperature at the moment of mixing) used in calorimetry calculations?",a:"Mixing and reaction take time, and the peak temperature is the point where the energy released has fully registered before cooling takes over",w:["The first temperature is always wrong because thermometers lag by exactly one minute","The highest temperature is used because the reaction only starts at that point","Any temperature after mixing gives the same result, so the highest is a convention"]},
    {q:"Why is the solution stirred gently throughout a calorimetry trial?",a:"Stirring evens out the temperature so the thermometer reads the true average temperature of the whole solution",w:["Stirring speeds up the reaction so it finishes before heat can escape","Stirring adds a measured amount of kinetic energy to the calculation","Stirring prevents the thermometer from touching the cup"]},
    {q:"Why are temperature readings taken every 30 seconds for a few minutes after mixing, rather than a single final reading?",a:"The series of readings lets the student identify the true maximum and see the cooling trend around it",w:["A single reading would use up the thermometer","The readings are averaged to cancel the reaction's energy","Frequent readings keep the solution mixed by themselves"]}
  ]);
  var vol=pick([50,75,100,125,150,200]);
  var sys=pick(["an acid-base mixture","a dissolving salt","a reacting metal and acid"]);
  return mcq("In a calorimetry experiment with "+vol+" mL of "+sys+" in the cup, a procedural question arises. "+v.q,
    v.a,v.w,
    "<b>"+v.a+"</b>.",{vol:vol});
});

E("u3-79-controls",3,["7.9"],2,"gen",function(){
  var fuels=pick([["methanol","ethanol"],["propane","butane"],["ethanol","propane"],["methanol","butane"]]);
  var mw=pick([100,150,200,250]);
  var t0=pick([15.0,18.0,20.0,22.0]),loc=pick(["on a lab bench","in a fume hood","on a still day outdoors"]);
  return mcq("A student compares the energy released by burning "+fuels[0]+" and "+fuels[1]+" by heating water in a calorimeter "+loc+". Each fuel is burned in a separate trial under identical apparatus, with the water starting at "+gF(t0)+" \u00B0C. Which set of controls makes the comparison valid?",
    "Same mass of water ("+gF(mw)+" g), same starting temperature of the water, same distance from flame to container, and the same mass of fuel burned in each trial",
    ["Same mass of water, but a larger flame for the fuel expected to be weaker, to keep the trials fair",
     "Different masses of water, as long as each trial uses whichever amount is convenient",
     "Same starting temperature, but the second fuel is burned in a draft to speed it up"],
    "A fair comparison changes only the fuel. Water mass, starting temperature, geometry and fuel mass all affect the temperature rise, so all of them must be held the same; otherwise a difference in \u0394T could come from the setup instead of the fuel.",{});
});

E("u3-79-error-direction",3,["7.9"],2,"gen",function(){
  var v=pick([
    {d:"some of the fuel vapour escapes unburned before it can be ignited",a:"The measured heat is too small, so the calculated \u0394H is too small in magnitude (not exothermic enough)",w:["The measured heat is too large, so the calculated \u0394H is too large in magnitude","The result is unaffected, because the escaped vapour had no energy","The calculated \u0394H changes sign"]},
    {d:"the thermometer bulb rests against the hot metal container instead of sitting in the water",a:"The recorded temperature is too high, so the calculated \u0394H is too large in magnitude",w:["The recorded temperature is too low, so the calculated \u0394H is too small in magnitude","The result is unaffected, because metal and water are always the same temperature","The calculated \u0394H changes sign"]},
    {d:"a draft blows across the apparatus during the burn, carrying heat away",a:"The measured temperature rise is too small, so the calculated \u0394H is too small in magnitude (not exothermic enough)",w:["The measured temperature rise is too large, so the calculated \u0394H is too large in magnitude","The draft adds energy, making the result too exothermic","The result is unaffected once the fuel is fully burned"]}
  ]);
  var t=ri(10,35);
  return mcq("In a fuel calorimetry experiment at a room temperature of "+t+" \u00B0C, "+v.d+" throughout the trial. What is the effect on the calculated enthalpy change?",
    v.a,v.w,
    "Trace the error through the calculation: the flaw changes the measured heat or temperature, and the calculated \u0394H follows. <b>"+v.a+"</b>.",{t:t});
});

E("u3-79-design-eval",3,["7.9"],3,"var",varset([
  function(){
    return mcq("Two students measure the enthalpy of combustion of ethanol. Student A burns the fuel under an uninsulated open beaker 15 cm above the flame's base in a drafty room. Student B uses a lidded metal can, insulation around it, a fixed burner position, and repeats the trial three times, discarding a trial where the flame blew out. Whose value should be closer to the accepted value, and why?",
      "Student B: the design reduces heat loss (the main systematic error) and the repeats expose unreliable trials, while Student A's setup loses heat in several uncontrolled ways",
      ["Student A: fewer pieces of apparatus means fewer sources of error",
       "Both are equal: enthalpy values do not depend on the apparatus",
       "Student B: only because three trials were done; the insulation and lid make no difference"],
      "The dominant error in combustion calorimetry is heat escaping before it registers in the water. Student B's design attacks exactly that error and adds repeatability checks. Student A's open, drafty setup loses heat in ways that cannot be corrected. <b>Student B's value should be closer</b>.",{});
  },
  function(){
    return mcq("A student wants to find which of two hand warmers (different chemical mixtures) releases more heat per gram. The plan: put mixture 1 in a foam cup with 100 g of water and mixture 2 in a foam cup with 200 g of water, activate both, and compare the temperature rises directly. Which evaluation is correct?",
      "The comparison is invalid as planned: with different water masses, the same heat release gives different temperature rises, so the rises cannot be compared directly unless the heat for each is calculated from q = mc\u0394T first",
      ["The plan is valid: temperature rise alone always ranks heat release",
       "The plan is invalid because foam cups cannot be used for exothermic solids",
       "The comparison is valid if both cups are the same colour"],
      "Temperature rise depends on the mass being heated: q = mc\u0394T. Doubling the water halves the rise for the same heat. The student must either use equal masses or calculate q for each trial before comparing. <b>The comparison is invalid as planned</b>.",{});
  },
  function(){
    return mcq("A class measures the enthalpy of solution of a salt. One group's three trials give -41.2, -40.8 and -55.6 kJ/mol, while the class average of the other groups is close to -41 kJ/mol. The -55.6 trial was noted as 'solution splashed out when the salt was added'. What is the best handling of that trial?",
      "Exclude it, with the reason recorded: the splash lost some of the reacting material, so that trial did not measure the same process as the others",
      ["Keep it: all data must always be averaged, whatever happened",
       "Exclude the other two trials, because the largest value is the most complete",
       "Change -55.6 to -41.0 so it matches the class"],
      "Data may be excluded for a documented experimental fault that changed what was measured, never merely for disagreeing. Losing reactant to a splash means that trial's heat corresponds to a smaller, unknown amount. <b>Exclude it, with the reason recorded</b>.",{});
  }
]));

E("u3-79-precision",3,["7.9"],1,"gen",function(){
  var v=pick([
    {q:"A thermometer is graduated in 1 \u00B0C steps. Readings from it should be recorded to the nearest",a:"0.1 \u00B0C, estimating one decimal place between the graduations",w:["1 \u00B0C exactly, with no decimal places","0.01 \u00B0C, because digital-style precision is expected","10 \u00B0C, because temperature changes are large"]},
    {q:"A student repeats a calorimetry trial four times and averages the results. Averaging repeated trials mainly improves",a:"Precision: random errors partly cancel, giving a value closer to the group's own consistent result",w:["Accuracy against heat loss, because averaging returns escaped heat","The resolution of the thermometer","The sign of the enthalpy change"]}
  ]);
  var vol=pick([50,100,150,200,250]),tp=ri(15,30);
  return mcq("During a calorimetry practical at "+tp+" \u00B0C using "+vol+" mL of water, the following point comes up. "+v.q+":",
    v.a,v.w,
    "<b>"+v.a+"</b>.",{vol:vol});
});

/* ---------- 7.10 Compare the molar enthalpies of several combustion reactions involving organic compounds ---------- */

E("u3-710-calorimetry-molar",3,["7.10"],3,"gen",function(){
  var fuels=[{n:"methanol",M:32.05},{n:"ethanol",M:46.07},{n:"propane",M:44.10},{n:"glucose",M:180.16}];
  var f=pick(fuels);
  var mass=pick([0.500,0.800,1.00,1.25,1.50,2.00]);
  var mw=pick([150,200,250,300,400,500]);
  var dt=pick([8.0,10.0,12.5,15.0,18.0,20.0,24.0]);
  var q=sfR(mw*4.18*dt,4);
  var qkJ=sfR(q/1000,4);
  var n=sfR(mass/f.M,4);
  var dH=sfR(-qkJ/n,4);
  var ans=sfR(dH,3);
  return numq("A "+gF(mass)+" g sample of "+f.n+" is burned completely in a calorimeter, heating "+gF(mw)+" g of water by "+gF(dt)+" \u00B0C. Calculate the molar enthalpy of combustion of "+f.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.02*Math.abs(ans),0.5),
    "Heat absorbed by the water: q = mc\u0394T = "+gF(mw)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(q)+" J = "+iF(qkJ)+" kJ. Amount of fuel: n = "+gF(mass)+" g / "+gF(f.M)+" g/mol = "+iF(n)+" mol. \u0394H = -q / n = -"+iF(qkJ)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy of combustion is <b>"+F3(ans)+" kJ/mol</b>. The negative sign shows the combustion is exothermic.",{});
});

E("u3-710-per-gram",3,["7.10"],2,"gen",function(){
  var fuels=[{n:"methane",M:16.04,dH:-890},{n:"propane",M:44.10,dH:-2219},{n:"ethanol",M:46.07,dH:-1367},{n:"butane",M:58.12,dH:-2878},{n:"octane",M:114.23,dH:-5470}];
  var f=pick(fuels);
  var per=sfR(f.dH/f.M,4);
  var tp=pick([15,20,25,30]);
  if(Math.random()<0.5){
    var ans=sfR(per,3);
    return numq("At "+tp+" \u00B0C, the molar enthalpy of combustion of "+f.n+" is "+f.dH+" kJ/mol, and its molar mass is "+gF(f.M)+" g/mol. Calculate the energy released per gram of "+f.n+" burned. Give your answer in kJ/g.",
      ans,Math.max(0.02*Math.abs(ans),0.2),
      "Energy per gram = \u0394H per mole / molar mass = "+f.dH+" kJ/mol / "+gF(f.M)+" g/mol = "+iF(per)+" kJ/g. The energy released per gram is <b>"+F3(ans)+" kJ/g</b> (the negative sign shows the energy is released). Fuels are compared per gram because fuel is bought and carried by mass.",{mode:"pergram"});
  }
  var mass=pick([2.00,5.00,10.0,25.0,50.0,100]);
  var tot=sfR(per*mass,4),ans2=sfR(tot,3);
  return numq("At "+tp+" \u00B0C, the molar enthalpy of combustion of "+f.n+" is "+f.dH+" kJ/mol, and its molar mass is "+gF(f.M)+" g/mol. Calculate the total energy released when "+gF(mass)+" g of "+f.n+" burns completely. Give your answer in kJ.",
    ans2,Math.max(0.02*Math.abs(ans2),0.5),
    "First convert to a per-gram basis: "+f.dH+" kJ/mol / "+gF(f.M)+" g/mol = "+iF(per)+" kJ/g. Then scale by the mass: "+iF(per)+" kJ/g \u00D7 "+gF(mass)+" g = "+iF(tot)+" kJ. The total energy released is <b>"+F3(ans2)+" kJ</b>.",{mode:"total"});
});

E("u3-710-combustion-products",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Complete combustion of a hydrocarbon fuel in plentiful oxygen produces",
      "Carbon dioxide and water only",
      ["Carbon monoxide and water only","Carbon (soot), carbon monoxide, and no water","Carbon dioxide and hydrogen gas"],
      "Complete combustion fully oxidizes the fuel: every carbon becomes CO\u2082 and every hydrogen ends up in H\u2082O. Anything less (CO, soot) is incomplete combustion.",{});
  },
  function(){
    return mcq("A fuel burns with a sooty, orange flame in limited air and releases less heat per gram than its tabulated enthalpy of combustion. The best explanation is",
      "Incomplete combustion: some fuel forms carbon monoxide or soot instead of carbon dioxide, so less energy is released",
      ["The tabulated value is for a different fuel",
       "Heat is being destroyed by the soot",
       "The fuel absorbed energy from the flame"],
      "Full oxidation to CO\u2082 releases the maximum energy. When oxygen is short, carbon stops at CO or C, which still hold chemical energy, so the measured release is smaller. <b>Incomplete combustion</b>.",{});
  },
  function(){
    return mcq("The standard enthalpy of combustion of a substance is defined as the enthalpy change when",
      "One mole of the substance burns completely in oxygen under standard conditions",
      ["One gram of the substance burns in any conditions",
       "Any amount of the substance burns until the flame goes out",
       "One mole of the substance is formed from its elements"],
      "Molar enthalpy of combustion is per mole, for complete combustion, under standard conditions. (Formation from the elements is a different quantity, the enthalpy of formation.)",{});
  }
]));

E("u3-710-molar-combustion",3,["7.10"],3,"gen",function(){
  var fuels=[{n:"propane",M:44.10},{n:"butane",M:58.12},{n:"octane",M:114.23},{n:"ethanol",M:46.07}];
  var f=pick(fuels);
  var mass=pick([0.400,0.600,0.800,1.00,1.20]);
  var mw=pick([200,250,300,500]);
  var dt=pick([9.0,11.0,13.5,16.0,19.0,22.0]);
  var eff=pick([55,60,65,70,75,80]);
  var qw=sfR(mw*4.18*dt,4);
  var qcomb=sfR(qw/(eff/100),4),qck=sfR(qcomb/1000,4);
  var n=sfR(mass/f.M,4);
  var dH=sfR(-qck/n,4),ans=sfR(dH,3);
  return numq("A "+gF(mass)+" g sample of "+f.n+" is burned in a calorimeter containing "+gF(mw)+" g of water, and the water temperature rises by "+gF(dt)+" \u00B0C. Only "+eff+"% of the heat released by the combustion is captured by the water; the rest is lost to the apparatus and air. Calculate the molar enthalpy of combustion of "+f.n+". Give your answer in kJ/mol.",
    ans,Math.max(0.025*Math.abs(ans),1),
    "Heat captured by the water: q = mc\u0394T = "+gF(mw)+" g \u00D7 4.18 J/(g\u00B7\u00B0C) \u00D7 "+gF(dt)+" \u00B0C = "+iF(qw)+" J. That is only "+eff+"% of the combustion heat, so the total heat released is "+iF(qw)+" / 0."+eff+" = "+iF(qcomb)+" J = "+iF(qck)+" kJ. Amount burned: n = "+gF(mass)+" g / "+gF(f.M)+" g/mol = "+iF(n)+" mol. \u0394H = -"+iF(qck)+" kJ / "+iF(n)+" mol = "+iF(dH)+" kJ/mol. The molar enthalpy of combustion is <b>"+F3(ans)+" kJ/mol</b>.",{});
});

// LEVEL: 3 - Converting two organic fuels to heat released per gram and computing the difference.
// VARIANTS: Unordered pairs of distinct fuels from the 5-fuel table (methane, propane, ethanol, butane, octane) differing by at least 3 kJ/g.
// LENGTHS: key=4
E("u3-710-compare-per-gram",3,["7.10"],3,"gen",function(){
  var fuels=[
    {name:"methane",formula:"CH₄",M:16.04,dh:-890},
    {name:"propane",formula:"C₃H₈",M:44.10,dh:-2219},
    {name:"ethanol",formula:"C₂H₅OH",M:46.07,dh:-1367},
    {name:"butane",formula:"C₄H₁₀",M:58.12,dh:-2878},
    {name:"octane",formula:"C₈H₁₈",M:114.23,dh:-5470}
  ];
  var f1,f2,pg1,pg2,tries=0;
  do{
    f1=pick(fuels);
    f2=pick(fuels.filter(function(x){return x.name!==f1.name;}));
    pg1=Math.abs(f1.dh)/f1.M;
    pg2=Math.abs(f2.dh)/f2.M;
    tries++;
  }while(Math.abs(pg1-pg2)<3.0&&tries<80);
  var diff=Math.abs(pg1-pg2);
  var ans=sfR(diff,3);
  var tol=Math.max(0.02*ans,0.2);
  var hi=pg1>pg2?f1:f2;
  var lo=pg1>pg2?f2:f1;
  return numq("Compare the complete combustion of "+f1.name+" ("+f1.formula+", M = "+fmtF(f1.M,2)+" g/mol, ΔHcomb = "+f1.dh+" kJ/mol) and "+f2.name+" ("+f2.formula+", M = "+fmtF(f2.M,2)+" g/mol, ΔHcomb = "+f2.dh+" kJ/mol). How much more energy is released per gram by the fuel that releases more heat per gram, in kJ/g?",
    ans,tol,
    "Divide the magnitude of each molar enthalpy of combustion by its molar mass:<br>"+f1.name+": "+Math.abs(f1.dh)+" kJ/mol ÷ "+fmtF(f1.M,2)+" g/mol = "+iF(pg1)+" kJ/g<br>"+f2.name+": "+Math.abs(f2.dh)+" kJ/mol ÷ "+fmtF(f2.M,2)+" g/mol = "+iF(pg2)+" kJ/g<br>"+hi.name[0].toUpperCase()+hi.name.slice(1)+" releases more energy per gram than "+lo.name+". Subtracting gives "+iF(Math.max(pg1,pg2))+" − "+iF(Math.min(pg1,pg2))+" = "+iF(diff)+" kJ/g. Rounded to three significant figures, the difference is <b>"+F3(ans)+" kJ/g</b>.",
    {f1:f1.name,M1:f1.M,dh1:f1.dh,f2:f2.name,M2:f2.M,dh2:f2.dh,pg1:sfR(pg1,4),pg2:sfR(pg2,4),ans:ans});
});

// LEVEL: 2 - Working backwards from a stated heat demand to the required mass of organic fuel burned.
// VARIANTS: Five fuels from the pool table paired with heat demands from 500 to 5000 kJ.
// LENGTHS: key=4
E("u3-710-mass-for-energy",3,["7.10"],2,"gen",function(){
  var fuels=[
    {name:"methane",formula:"CH₄",M:16.04,dh:-890},
    {name:"propane",formula:"C₃H₈",M:44.10,dh:-2219},
    {name:"ethanol",formula:"C₂H₅OH",M:46.07,dh:-1367},
    {name:"butane",formula:"C₄H₁₀",M:58.12,dh:-2878},
    {name:"octane",formula:"C₈H₁₈",M:114.23,dh:-5470}
  ];
  var f=pick(fuels);
  var qReq=ri(5,50)*100;
  var pg=Math.abs(f.dh)/f.M;
  var mass=qReq/pg;
  var ans=sfR(mass,3);
  var tol=Math.max(0.02*ans,0.5);
  return numq("A camp heater burns "+f.name+" ("+f.formula+", M = "+fmtF(f.M,2)+" g/mol, ΔHcomb = "+f.dh+" kJ/mol) completely to supply "+gF(qReq)+" kJ of heat. What mass of "+f.name+" must burn, in grams?",
    ans,tol,
    "First find the energy released per gram of "+f.name+":<br>Energy per gram = "+Math.abs(f.dh)+" kJ/mol ÷ "+fmtF(f.M,2)+" g/mol = "+iF(pg)+" kJ/g<br>Divide the required heat by the energy released per gram:<br>m = "+gF(qReq)+" kJ ÷ "+iF(pg)+" kJ/g = "+iF(mass)+" g. Rounded to three significant figures, the mass required is <b>"+F3(ans)+" g</b>.",
    {fuel:f.name,M:f.M,dh:f.dh,qReq:qReq,pg:sfR(pg,4),ans:ans});
});

/* ---------- 7.11 Write and balance thermochemical equations including the combustion reactions of alkanes ---------- */

var THERMO_CASES=[
  {desc:"the complete combustion of methane, CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l), with \u0394H = -890 kJ per mole of methane",
   ans:["CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ","CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l) + 890 kJ","CH\u2084 + 2 O\u2082 \u2192 CO\u2082 + 2 H\u2082O + 890 kJ","CH4 + 2 O2 -> CO2 + 2 H2O + 890 kJ","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l), \u0394H = -890 kJ","CH4(g) + 2 O2(g) -> CO2(g) + 2 H2O(l), dH = -890 kJ","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) \u0394H = -890 kJ","CH4 + 2 O2 -> CO2 + 2 H2O dH = -890 kJ"],
   show:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ (equivalently, \u0394H = -890 kJ)"},
  {desc:"the synthesis of ammonia, N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g), with \u0394H = -92 kJ for the equation as written",
   ans:["N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) + 92 kJ","N2(g) + 3 H2(g) -> 2 NH3(g) + 92 kJ","N\u2082 + 3 H\u2082 \u2192 2 NH\u2083 + 92 kJ","N2 + 3 H2 -> 2 NH3 + 92 kJ","N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g), \u0394H = -92 kJ","N2(g) + 3 H2(g) -> 2 NH3(g), dH = -92 kJ","N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) \u0394H = -92 kJ","N2 + 3 H2 -> 2 NH3 dH = -92 kJ"],
   show:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g) + 92 kJ (equivalently, \u0394H = -92 kJ)"},
  {desc:"the decomposition of calcium carbonate, CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g), with \u0394H = +178 kJ for the equation as written",
   ans:["CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g)","CaCO3(s) + 178 kJ -> CaO(s) + CO2(g)","CaCO\u2083 + 178 kJ \u2192 CaO + CO\u2082","CaCO3 + 178 kJ -> CaO + CO2","CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g), \u0394H = +178 kJ","CaCO3(s) -> CaO(s) + CO2(g), dH = +178 kJ","CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g) \u0394H = +178 kJ","CaCO3 -> CaO + CO2 dH = +178 kJ"],
   show:"CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g) (equivalently, \u0394H = +178 kJ)"}
];

E("u3-711-write-thermochem",3,["7.11"],2,"var",varset(THERMO_CASES.map(function(c){return function(){
  return textq("Write the thermochemical equation for "+c.desc+". Include the energy term in the equation or give \u0394H with the equation.",
    c.ans,
    "A thermochemical equation is a balanced equation with the energy change attached: released energy is written as a product (or \u0394H is negative), and absorbed energy is written as a reactant (or \u0394H is positive). <b>"+c.show+"</b>.",{});
};})));

E("u3-711-reading-equation",3,["7.11"],1,"gen",function(){
  var v=pick([
    {eq:"2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l) + 572 kJ",a:"572 kJ is released for every 2 mol of hydrogen burned (that is, per mole of reaction as written)",w:["572 kJ is released for every 1 mol of hydrogen burned","572 kJ is absorbed for every 2 mol of hydrogen burned","572 kJ is the activation energy of the reaction"]},
    {eq:"CaCO\u2083(s) + 178 kJ \u2192 CaO(s) + CO\u2082(g)",a:"178 kJ is absorbed for every 1 mol of calcium carbonate decomposed",w:["178 kJ is released for every 1 mol of calcium carbonate decomposed","178 kJ is absorbed for every 1 g of calcium carbonate decomposed","178 kJ is the energy stored in the products alone"]},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l) + 890 kJ",a:"890 kJ is released when 1 mol of methane burns completely",w:["890 kJ is released when 1 mol of oxygen burns","890 kJ is absorbed when 1 mol of methane burns","890 kJ is released when 2 mol of methane burn"]}
  ]);
  var t=ri(0,60);
  return mcq("A thermochemical equation is written at "+t+" \u00B0C as: "+v.eq+". Which interpretation is correct?",
    v.a,v.w,
    "Energy terms in a thermochemical equation belong to the equation as written: scale them with the coefficients. <b>"+v.a+"</b>.",{t:t});
});

// LEVEL: 2 - Reversing thermochemical equations and moving or sign-flipping the energy term.
// VARIANTS: Three fixed variants: (a) reversing exothermic ammonia synthesis; (b) reversing endothermic CaCO3 decomposition; (c) diagnosing a reversal error that keeps energy on its original side.
// LENGTHS: key=37, distractors=37,28,38
// LENGTHS: key=39, distractors=39,30,40
// LENGTHS: key=98, distractors=97,99,96
E("u3-711-reversed",3,["7.11"],2,"var",varset([
  function(){
    var key="2 NH₃(g) + 92 kJ → N₂(g) + 3 H₂(g)";
    return mcq("The thermochemical equation for the synthesis of ammonia is: N₂(g) + 3 H₂(g) → 2 NH₃(g) + 92 kJ. How is the reverse reaction written?",
      key,
      [
        "2 NH₃(g) → N₂(g) + 3 H₂(g) + 92 kJ",
        "2 NH₃(g) → N₂(g) + 3 H₂(g)",
        "4 NH₃(g) + 184 kJ → 2 N₂(g) + 6 H₂(g)"
      ],
      "Reversing an exothermic reaction turns it into an endothermic reaction, so the 92 kJ energy term moves from the product side to the reactant side. Therefore, the reversed equation is <b>"+key+"</b>.",
      {variant:1});
  },
  function(){
    var key="CaO(s) + CO₂(g) → CaCO₃(s) + 178 kJ";
    return mcq("The thermochemical equation for the decomposition of calcium carbonate is: CaCO₃(s) + 178 kJ → CaO(s) + CO₂(g). How is the reverse reaction written?",
      key,
      [
        "CaO(s) + CO₂(g) + 178 kJ → CaCO₃(s)",
        "CaO(s) + CO₂(g) → CaCO₃(s)",
        "2 CaO(s) + 2 CO₂(g) → 2 CaCO₃(s) + 356 kJ"
      ],
      "Reversing an endothermic reaction makes it exothermic, moving the 178 kJ energy term from the reactant side to the product side. Therefore, the reversed equation is <b>"+key+"</b>.",
      {variant:2});
  },
  function(){
    var key="Incorrect, because reversing an equation moves the energy term to the opposite side and flips ΔH.";
    return mcq("To reverse H₂(g) + Cl₂(g) → 2 HCl(g) + 185 kJ, a student writes: 2 HCl(g) → H₂(g) + Cl₂(g) + 185 kJ. Which judgement of this equation is correct?",
      key,
      [
        "Correct, because the energy term stays on the right side of the arrow whenever an equation is flipped.",
        "Incorrect, because reversing an equation requires doubling all coefficients while keeping + 185 kJ.",
        "Correct, because reversing the chemical formulas automatically changes the sign of the product term."
      ],
      "Reversing a reaction reverses the direction of heat flow, so an exothermic forward process becomes an endothermic reverse process with + 185 kJ on the reactant side. Therefore, the student's work is <b>"+key+"</b>.",
      {variant:3});
  }
]));

// LEVEL: 2 - Writing and balancing complete alkane combustion thermochemical equations per mole of fuel.
// VARIANTS: Three alkanes at equal mix: ethane (-1560 kJ/mol), propane (-2219 kJ/mol), butane (-2878 kJ/mol).
// LENGTHS: key=50, distractors=50,48,50
E("u3-711-alkane-equation",3,["7.11"],2,"gen",function(){
  var alkanes=[
    {
      name:"ethane",
      dh:-1560,
      key:"C₂H₆(g) + 7/2 O₂(g) → 2 CO₂(g) + 3 H₂O(l) + 1560 kJ",
      ds:[
        "2 C₂H₆(g) + 7 O₂(g) → 4 CO₂(g) + 6 H₂O(l) + 1560 kJ",
        "C₂H₆(g) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l) + 1560 kJ",
        "C₂H₆(g) + 7/2 O₂(g) + 1560 kJ → 2 CO₂(g) + 3 H₂O(l)"
      ],
      exp:"One mole of C₂H₆ produces 2 CO₂ and 3 H₂O, requiring 7 oxygen atoms (7/2 O₂), with 1560 kJ released on the product side."
    },
    {
      name:"propane",
      dh:-2219,
      key:"C₃H₈(g) + 5 O₂(g) → 3 CO₂(g) + 4 H₂O(l) + 2219 kJ",
      ds:[
        "2 C₃H₈(g) + 10 O₂(g) → 6 CO₂(g) + 8 H₂O(l) + 2219 kJ",
        "C₃H₈(g) + 4 O₂(g) → 3 CO₂(g) + 4 H₂O(l) + 2219 kJ",
        "C₃H₈(g) + 5 O₂(g) + 2219 kJ → 3 CO₂(g) + 4 H₂O(l)"
      ],
      exp:"One mole of C₃H₈ produces 3 CO₂ and 4 H₂O, requiring 10 oxygen atoms (5 O₂), with 2219 kJ released on the product side."
    },
    {
      name:"butane",
      dh:-2878,
      key:"C₄H₁₀(g) + 13/2 O₂(g) → 4 CO₂(g) + 5 H₂O(l) + 2878 kJ",
      ds:[
        "2 C₄H₁₀(g) + 13 O₂(g) → 8 CO₂(g) + 10 H₂O(l) + 2878 kJ",
        "C₄H₁₀(g) + 6 O₂(g) → 4 CO₂(g) + 5 H₂O(l) + 2878 kJ",
        "C₄H₁₀(g) + 13/2 O₂(g) + 2878 kJ → 4 CO₂(g) + 5 H₂O(l)"
      ],
      exp:"One mole of C₄H₁₀ produces 4 CO₂ and 5 H₂O, requiring 13 oxygen atoms (13/2 O₂), with 2878 kJ released on the product side."
    }
  ];
  var a=pick(alkanes);
  return mcq("The molar enthalpy of combustion of "+a.name+" is "+a.dh+" kJ/mol. Which thermochemical equation is correctly balanced for the complete combustion of 1 mol of "+a.name+"?",
    a.key,a.ds,
    a.exp+" Therefore, the balanced thermochemical equation is <b>"+a.key+"</b>.",
    {alkane:a.name,dh:a.dh});
});

// LEVEL: 3 - Restating an entire thermochemical equation (all coefficients and energy term) on a new molar basis.
// VARIANTS: Five combinations of equation and target species yielding a scaling factor of 1/2 or 2.
// LENGTHS: key=40, distractors=40,41,38
E("u3-711-per-mole-basis",3,["7.11"],3,"gen",function(){
  var cases=[
    {
      orig:"2 H₂(g) + O₂(g) → 2 H₂O(l) + 572 kJ",
      target:"1 mol of H₂O(l)",
      factor:"1/2",
      keyQ:286,
      key:"H₂(g) + 1/2 O₂(g) → H₂O(l) + 286 kJ",
      ds:[
        "H₂(g) + 1/2 O₂(g) → H₂O(l) + 572 kJ",
        "H₂(g) + 1/2 O₂(g) → H₂O(l) + 1144 kJ",
        "2 H₂(g) + O₂(g) → 2 H₂O(l) + 286 kJ"
      ]
    },
    {
      orig:"2 H₂(g) + O₂(g) → 2 H₂O(l) + 572 kJ",
      target:"2 mol of O₂(g)",
      factor:"2",
      keyQ:1144,
      key:"4 H₂(g) + 2 O₂(g) → 4 H₂O(l) + 1144 kJ",
      ds:[
        "4 H₂(g) + 2 O₂(g) → 4 H₂O(l) + 572 kJ",
        "4 H₂(g) + 2 O₂(g) → 4 H₂O(l) + 286 kJ",
        "2 H₂(g) + O₂(g) → 2 H₂O(l) + 1144 kJ"
      ]
    },
    {
      orig:"CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l) + 890 kJ",
      target:"1 mol of O₂(g)",
      factor:"1/2",
      keyQ:445,
      key:"1/2 CH₄(g) + O₂(g) → 1/2 CO₂(g) + H₂O(l) + 445 kJ",
      ds:[
        "1/2 CH₄(g) + O₂(g) → 1/2 CO₂(g) + H₂O(l) + 890 kJ",
        "1/2 CH₄(g) + O₂(g) → 1/2 CO₂(g) + H₂O(l) + 1780 kJ",
        "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l) + 445 kJ"
      ]
    },
    {
      orig:"CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l) + 890 kJ",
      target:"2 mol of CH₄(g)",
      factor:"2",
      keyQ:1780,
      key:"2 CH₄(g) + 4 O₂(g) → 2 CO₂(g) + 4 H₂O(l) + 1780 kJ",
      ds:[
        "2 CH₄(g) + 4 O₂(g) → 2 CO₂(g) + 4 H₂O(l) + 890 kJ",
        "2 CH₄(g) + 4 O₂(g) → 2 CO₂(g) + 4 H₂O(l) + 445 kJ",
        "CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l) + 1780 kJ"
      ]
    },
    {
      orig:"CaCO₃(s) + 178 kJ → CaO(s) + CO₂(g)",
      target:"2 mol of CaCO₃(s)",
      factor:"2",
      keyQ:356,
      key:"2 CaCO₃(s) + 356 kJ → 2 CaO(s) + 2 CO₂(g)",
      ds:[
        "2 CaCO₃(s) + 178 kJ → 2 CaO(s) + 2 CO₂(g)",
        "2 CaCO₃(s) + 89 kJ → 2 CaO(s) + 2 CO₂(g)",
        "CaCO₃(s) + 356 kJ → CaO(s) + CO₂(g)"
      ]
    }
  ];
  var c=pick(cases);
  return mcq("Restate the thermochemical equation "+c.orig+" on the basis of "+c.target+".",
    c.key,c.ds,
    "Multiply every stoichiometric coefficient and the energy term by "+c.factor+" so the equation remains balanced and proportional to the new basis. This gives <b>"+c.key+"</b>.",
    {orig:c.orig,target:c.target,factor:c.factor,keyQ:c.keyQ});
});

/* ---------- 7.12 Calculate the changes in energy of various chemical reactions using bond energy, heats of formation, and Hess's law ---------- */

E("u3-712-bond-energy",3,["7.12"],2,"gen",function(){
  var rxns=[
    {eq:"H\u2082(g) + Cl\u2082(g) \u2192 2 HCl(g)",broken:"one H-H bond and one Cl-Cl bond",formed:"two H-Cl bonds",bSum:"436 + 242",bVal:678,fSum:"2 \u00D7 431",fVal:862},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(g)",broken:"four C-H bonds and two O=O bonds",formed:"two C=O bonds and four O-H bonds",bSum:"4 \u00D7 413 + 2 \u00D7 498",bVal:2648,fSum:"2 \u00D7 799 + 4 \u00D7 463",fVal:3450},
    {eq:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g)",broken:"one N\u2261N bond and three H-H bonds",formed:"six N-H bonds",bSum:"946 + 3 \u00D7 436",bVal:2254,fSum:"6 \u00D7 391",fVal:2346},
    {eq:"H\u2082(g) + Br\u2082(g) \u2192 2 HBr(g)",broken:"one H-H bond and one Br-Br bond",formed:"two H-Br bonds",bSum:"436 + 193",bVal:629,fSum:"2 \u00D7 366",fVal:732},
    {eq:"C\u2082H\u2084(g) + H\u2082(g) \u2192 C\u2082H\u2086(g)",broken:"one C=C bond and one H-H bond",formed:"one C-C bond and two C-H bonds",bSum:"614 + 436",bVal:1050,fSum:"348 + 2 \u00D7 413",fVal:1174}
  ];
  var r=pick(rxns);
  var dH=r.bVal-r.fVal;
  var ans=sfR(dH,3);
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, use the average bond energies in the Reference Information to estimate \u0394H for the reaction "+r.eq+". Bonds broken: "+r.broken+". Bonds formed: "+r.formed+". Give your answer in kJ (for the equation as written).",
    ans,Math.max(0.02*Math.abs(ans),1),
    "\u0394H \u2248 (energy to break bonds) - (energy released forming bonds) = ("+r.bSum+") - ("+r.fSum+") = "+r.bVal+" - "+r.fVal+" = "+iF(dH)+" kJ. The estimated \u0394H is <b>"+F3(ans)+" kJ</b>. Breaking bonds takes energy in; forming them releases it, and the difference is the enthalpy change.",{});
});

E("u3-712-formation",3,["7.12"],2,"gen",function(){
  var rxns=[
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",data:"\u0394Hf values (kJ/mol): CH\u2084(g) -74.8; O\u2082(g) 0; CO\u2082(g) -393.5; H\u2082O(l) -285.8",pSum:"-393.5 + 2 \u00D7 (-285.8)",pVal:-965.1,rSum:"-74.8 + 2 \u00D7 0",rVal:-74.8},
    {eq:"2 CO(g) + O\u2082(g) \u2192 2 CO\u2082(g)",data:"\u0394Hf values (kJ/mol): CO(g) -110.5; O\u2082(g) 0; CO\u2082(g) -393.5",pSum:"2 \u00D7 (-393.5)",pVal:-787,rSum:"2 \u00D7 (-110.5) + 0",rVal:-221},
    {eq:"N\u2082(g) + 3 H\u2082(g) \u2192 2 NH\u2083(g)",data:"\u0394Hf values (kJ/mol): N\u2082(g) 0; H\u2082(g) 0; NH\u2083(g) -45.9",pSum:"2 \u00D7 (-45.9)",pVal:-91.8,rSum:"0 + 3 \u00D7 0",rVal:0},
    {eq:"C\u2082H\u2085OH(l) + 3 O\u2082(g) \u2192 2 CO\u2082(g) + 3 H\u2082O(l)",data:"\u0394Hf values (kJ/mol): C\u2082H\u2085OH(l) -277.6; O\u2082(g) 0; CO\u2082(g) -393.5; H\u2082O(l) -285.8",pSum:"2 \u00D7 (-393.5) + 3 \u00D7 (-285.8)",pVal:-1644.4,rSum:"-277.6 + 3 \u00D7 0",rVal:-277.6},
    {eq:"CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g)",data:"\u0394Hf values (kJ/mol): CaCO\u2083(s) -1206.9; CaO(s) -635.1; CO\u2082(g) -393.5",pSum:"-635.1 + (-393.5)",pVal:-1028.6,rSum:"-1206.9",rVal:-1206.9}
  ];
  var r=pick(rxns);
  var dH=sfR(r.pVal-r.rVal,4),ans=sfR(dH,3);
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, calculate \u0394H for the reaction "+r.eq+" using standard enthalpies of formation. "+r.data+". Give your answer in kJ (for the equation as written).",
    ans,Math.max(0.015*Math.abs(ans),1),
    "\u0394H = \u03A3 n \u0394Hf(products) - \u03A3 n \u0394Hf(reactants) = ("+r.pSum+") - ("+r.rSum+") = "+iF(r.pVal)+" - ("+iF(r.rVal)+") = "+iF(dH)+" kJ. So \u0394H = <b>"+F3(ans)+" kJ</b>. Elements in their standard states contribute 0.",{});
});

E("u3-712-hess",3,["7.12"],3,"gen",function(){
  var fams=[
    {target:"2 C(s) + H\u2082(g) \u2192 C\u2082H\u2082(g)",rev:"C\u2082H\u2082(g) \u2192 2 C(s) + H\u2082(g)",
     given:"(1) C\u2082H\u2082(g) + 5/2 O\u2082(g) \u2192 2 CO\u2082(g) + H\u2082O(l), \u0394H = -1299.5 kJ\n(2) C(s) + O\u2082(g) \u2192 CO\u2082(g), \u0394H = -393.5 kJ\n(3) H\u2082(g) + \u00BD O\u2082(g) \u2192 H\u2082O(l), \u0394H = -285.8 kJ",
     steps:"Use 2 \u00D7 (2): 2 C(s) + 2 O\u2082(g) \u2192 2 CO\u2082(g), \u0394H = 2 \u00D7 (-393.5) = -787.0 kJ. Use (3) as written: \u0394H = -285.8 kJ. Reverse (1): 2 CO\u2082(g) + H\u2082O(l) \u2192 C\u2082H\u2082(g) + 5/2 O\u2082(g), \u0394H = +1299.5 kJ. Adding the three cancels the CO\u2082, H\u2082O and O\u2082 terms and leaves the target equation.",
     sum:"-787.0 + (-285.8) + 1299.5",val:226.7},
    {target:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",rev:"CO\u2082(g) + 2 H\u2082O(l) \u2192 CH\u2084(g) + 2 O\u2082(g)",
     given:"(1) C(s) + O\u2082(g) \u2192 CO\u2082(g), \u0394H = -393.5 kJ\n(2) H\u2082(g) + \u00BD O\u2082(g) \u2192 H\u2082O(l), \u0394H = -285.8 kJ\n(3) C(s) + 2 H\u2082(g) \u2192 CH\u2084(g), \u0394H = -74.8 kJ",
     steps:"Use (1) as written: \u0394H = -393.5 kJ. Use 2 \u00D7 (2): 2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l), \u0394H = 2 \u00D7 (-285.8) = -571.6 kJ. Reverse (3): CH\u2084(g) \u2192 C(s) + 2 H\u2082(g), \u0394H = +74.8 kJ. Adding the three cancels the C(s) and H\u2082 terms and leaves the target equation.",
     sum:"-393.5 + (-571.6) + 74.8",val:-890.3},
    {target:"2 NO(g) + O\u2082(g) \u2192 2 NO\u2082(g)",rev:"2 NO\u2082(g) \u2192 2 NO(g) + O\u2082(g)",
     given:"(1) N\u2082(g) + O\u2082(g) \u2192 2 NO(g), \u0394H = +180.5 kJ\n(2) N\u2082(g) + 2 O\u2082(g) \u2192 2 NO\u2082(g), \u0394H = +66.4 kJ",
     steps:"Use (2) as written: \u0394H = +66.4 kJ. Reverse (1): 2 NO(g) \u2192 N\u2082(g) + O\u2082(g), \u0394H = -180.5 kJ. Adding the two cancels the N\u2082 and one O\u2082, leaving the target equation. Only two equations are needed here; Hess's law does not require using a fixed number of steps.",
     sum:"66.4 + (-180.5)",val:-114.1}
  ];
  var f=pick(fams);
  var rev=Math.random()<0.5;
  var tp=pick([20,25,30]),pr=pick([95,100,101,105]);
  if(!rev){
    var ans=sfR(f.val,3);
    return numq("At "+tp+" \u00B0C and "+pr+" kPa, use Hess's law to calculate \u0394H for the target reaction:\n"+f.target+"\nGiven:\n"+f.given+"\nGive your answer in kJ.",
      ans,Math.max(0.015*Math.abs(ans),1),
      f.steps+" \u0394H(target) = "+f.sum+" = "+iF(f.val)+" kJ. So \u0394H = <b>"+F3(ans)+" kJ</b>.",{rev:0});
  }
  var ansR=sfR(-f.val,3);
  return numq("At "+tp+" \u00B0C and "+pr+" kPa, use Hess's law to calculate \u0394H for the target reaction:\n"+f.rev+"\nGiven:\n"+f.given+"\nGive your answer in kJ.",
    ansR,Math.max(0.015*Math.abs(ansR),1),
    "First build the forward direction. "+f.steps+" That sum gives \u0394H = "+f.sum+" = "+iF(f.val)+" kJ for the forward reaction. The target reaction is exactly the reverse of that, and reversing a reaction changes the sign of \u0394H, so \u0394H(target) = -("+iF(f.val)+") = "+iF(-f.val)+" kJ. So \u0394H = <b>"+F3(ansR)+" kJ</b>.",{rev:1});
});

E("u3-712-bond-average",3,["7.12"],1,"var",varset([
  function(){
    return mcq("Enthalpy changes calculated from bond energies are estimates rather than exact values mainly because",
      "Tabulated bond energies are averages over many different compounds, while the actual bond energy depends on the specific molecule",
      ["Bond energies are measured at the wrong temperature",
       "The method forgets to count the bonds in the products",
       "Bonds do not really store energy"],
      "A C-H bond in methane is not in exactly the same environment as a C-H bond in another molecule, but the table offers one average value. The arithmetic is exact; the input data are averages, so the result is an estimate.",{});
  },
  function(){
    return mcq("The bond energy of a bond (for example, H-H = 436 kJ/mol) is defined as the energy",
      "Required to break one mole of that bond in the gas phase",
      ["Released when one gram of the bond forms",
       "Stored in one molecule of the substance",
       "Needed to melt one mole of the substance"],
      "Bond energy is quoted per mole of bonds broken, for gas-phase species. Breaking takes energy in; forming the same bond releases the same amount.",{});
  },
  function(){
    return mcq("In the bond-energy method for estimating \u0394H, which sign convention is used?",
      "Breaking bonds is entered as a positive (energy in) term and forming bonds as a negative (energy out) term, and \u0394H is the sum",
      ["Breaking bonds releases energy, so it is entered as negative",
       "Both breaking and forming are entered as positive, and the smaller is subtracted",
       "Only the bonds in the reactants are counted"],
      "Energy must be supplied to break bonds (positive contribution) and is released when bonds form (negative contribution). \u0394H \u2248 \u03A3(bonds broken) - \u03A3(bonds formed) in magnitude terms, with the signs handled by the convention.",{});
  }
]));

// LEVEL: 2 - Computing ΔH = ΣD(broken) - ΣD(formed) for two reactions and comparing which is more exothermic.
// VARIANTS: Two exothermic reactions with dealt bond-breaking and bond-forming totals whose ΔH values differ by at least 100 kJ.
// LENGTHS: key=97, distractors=97,104,88
E("u3-712-bond-compare",3,["7.12"],2,"gen",function(){
  var brkA,frmA,brkB,frmB,dhA,dhB,tries=0;
  do{
    brkA=ri(80,220)*10;
    brkB=ri(80,220)*10;
    var netA=ri(12,50)*10;
    var netB=netA+ri(12,45)*10;
    if(Math.random()<0.5){
      frmA=brkA+netB;frmB=brkB+netA;
    }else{
      frmA=brkA+netA;frmB=brkB+netB;
    }
    dhA=brkA-frmA;
    dhB=brkB-frmB;
    tries++;
  }while((Math.abs(dhA-dhB)<100||brkA===brkB)&&tries<100);
  var moreExo=dhA<dhB?"Reaction A":"Reaction B";
  var lessExo=dhA<dhB?"Reaction B":"Reaction A";
  var bigBrk=brkA>brkB?"Reaction A":"Reaction B";
  var key=moreExo+" is more exothermic, because ΔH = "+dhA+" kJ for A compared with ΔH = "+dhB+" kJ for B.";
  var ds=[
    lessExo+" is more exothermic, because ΔH = "+dhA+" kJ for A compared with ΔH = "+dhB+" kJ for B.",
    bigBrk+" is more exothermic, because breaking "+Math.max(brkA,brkB)+" kJ of reactant bonds releases the most energy.",
    "Both are equally exothermic, because in both reactions bond forming exceeds bond breaking."
  ];
  if(ds[1]===key){
    ds[1]=(bigBrk==="Reaction A"?"Reaction B":"Reaction A")+" is more exothermic, because breaking fewer reactant bonds always lowers ΔH.";
  }
  return mcq("In Reaction A, breaking reactant bonds requires "+brkA+" kJ and forming product bonds releases "+frmA+" kJ. In Reaction B, breaking reactant bonds requires "+brkB+" kJ and forming product bonds releases "+frmB+" kJ. Which reaction is more exothermic?",
    key,ds,
    "Use ΔH = ΣD(bonds broken) − ΣD(bonds formed):<br>Reaction A: ΔH = "+brkA+" kJ − "+frmA+" kJ = "+dhA+" kJ<br>Reaction B: ΔH = "+brkB+" kJ − "+frmB+" kJ = "+dhB+" kJ<br>The reaction with the more negative ΔH releases more net energy. Therefore, <b>"+key+"</b>.",
    {brkA:brkA,frmA:frmA,brkB:brkB,frmB:frmB,dhA:dhA,dhB:dhB});
});

// LEVEL: 3 - Solving the standard enthalpy of formation formula backwards for an unknown fuel ΔHf°.
// VARIANTS: Two fuels at equal mix: methane (-890 kJ/mol) and ethanol (-1367 kJ/mol).
// LENGTHS: key=5
E("u3-712-formation-solve",3,["7.12"],3,"gen",function(){
  var isMeth=Math.random()<0.5;
  var fuel,eq,dhComb,nCO2,nH2O,prodSum,dhFuel,ans,tol,prompt,sol;
  if(isMeth){
    fuel="methane";
    eq="CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)";
    dhComb=-890;
    nCO2=1;
    nH2O=2;
    prodSum=nCO2*(-393.5)+nH2O*(-285.8);
    dhFuel=prodSum-dhComb;
    ans=sfR(dhFuel,3);
    tol=Math.max(0.015*Math.abs(ans),1);
    prompt="The complete combustion of methane follows "+eq+" with ΔH°comb = −890 kJ/mol. Given ΔH°f[CO₂(g)] = −393.5 kJ/mol and ΔH°f[H₂O(l)] = −285.8 kJ/mol (and ΔH°f[O₂(g)] = 0 kJ/mol), calculate the standard enthalpy of formation ΔH°f of methane, in kJ/mol.";
    sol="Apply ΔH°rxn = ΣnΔH°f(products) − ΣnΔH°f(reactants):<br>−890 kJ/mol = [1(−393.5) + 2(−285.8)] − [ΔH°f(CH₄) + 2(0)]<br>−890 = "+fmtF(prodSum,1)+" − ΔH°f(CH₄)<br>ΔH°f(CH₄) = "+fmtF(prodSum,1)+" − (−890) = "+fmtF(dhFuel,1)+" kJ/mol. Rounded to three significant figures, ΔH°f = <b>"+F3(ans)+" kJ/mol</b>.";
  }else{
    fuel="ethanol";
    eq="C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l)";
    dhComb=-1367;
    nCO2=2;
    nH2O=3;
    prodSum=nCO2*(-393.5)+nH2O*(-285.8);
    dhFuel=prodSum-dhComb;
    ans=sfR(dhFuel,3);
    tol=Math.max(0.015*Math.abs(ans),1);
    prompt="The complete combustion of ethanol follows "+eq+" with ΔH°comb = −1367 kJ/mol. Given ΔH°f[CO₂(g)] = −393.5 kJ/mol and ΔH°f[H₂O(l)] = −285.8 kJ/mol (and ΔH°f[O₂(g)] = 0 kJ/mol), calculate the standard enthalpy of formation ΔH°f of liquid ethanol, in kJ/mol.";
    sol="Apply ΔH°rxn = ΣnΔH°f(products) − ΣnΔH°f(reactants):<br>−1367 kJ/mol = [2(−393.5) + 3(−285.8)] − [ΔH°f(C₂H₅OH) + 3(0)]<br>−1367 = "+fmtF(prodSum,1)+" − ΔH°f(C₂H₅OH)<br>ΔH°f(C₂H₅OH) = "+fmtF(prodSum,1)+" − (−1367) = "+fmtF(dhFuel,1)+" kJ/mol. Rounded to three significant figures, ΔH°f = <b>"+F3(ans)+" kJ/mol</b>.";
  }
  return numq(prompt,ans,tol,sol,{fuel:fuel,dhComb:dhComb,nCO2:nCO2,nH2O:nH2O,ans:ans});
});
