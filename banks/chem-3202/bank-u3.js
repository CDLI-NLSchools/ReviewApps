// Chemistry 3202 Unit 3 Thermochemistry question bank
// Phase C diagram figures (Nov 2026): u3-72-diagram-language now draws the
// enthalpy diagram from its own values, and u3-77-curve-read draws the
// standard heating curve (no plateau temperatures are given by that entry,
// so none are labelled). Figure helpers are in bank-u1.js.
// CRMARKS: u3-74-calorimetry-error=4
// CRMARKS: u3-74-calorimetry-molar=4
// CRMARKS: u3-74-find-delta-t=2
// CRMARKS: u3-74-mixture-temp=4
// CRMARKS: u3-74-q-temp=3
// CRMARKS: u3-77-q-combined=4
// CRMARKS: u3-77-q-phase=3
// CRMARKS: u3-78-deltah-from-q=3
// CRMARKS: u3-710-molar-combustion=4
// CRMARKS: u3-711-write-thermochem=3
// CRMARKS: u3-712-bond-energy=3
// CRMARKS: u3-712-formation=3
// CRMARKS: u3-712-hess=5

/* ---------- 7.1 Systems and energy ---------- */

E("u3-71-system-types",3,["7.1"],1,"var",varset([
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

E("u3-71-isolated-judgement",3,["7.1"],2,"gen",function(){
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

E("u3-71-surroundings",3,["7.1"],2,"var",varset([
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

/* ---------- 7.2 Enthalpy and energy changes ---------- */

E("u3-72-exo-endo",3,["7.2"],1,"gen",function(){
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

E("u3-72-delta-h-numeric",3,["7.2"],2,"gen",function(){
  var Hreact=pick([120,180,240,300,360,420]);
  var d=pick([-140,-95,-70,-45,-30,35,60,85,120]);
  var Hprod=Hreact+d;
  var ans=sfR(d,3);
  return numq("The total enthalpy of the reactants of a chemical system is "+Hreact+" kJ and the total enthalpy of the products is "+Hprod+" kJ. Calculate \u0394H for the reaction. Give your answer in kJ.",
    ans,1,
    "\u0394H = H(products) - H(reactants) = "+Hprod+" kJ - "+Hreact+" kJ = "+(d>0?"+":"")+iF(d)+" kJ. So \u0394H = <b>"+(d>0?"+":"")+F3(d)+" kJ</b>"+(d<0?", and the reaction is exothermic.":", and the reaction is endothermic."),{});
});

E("u3-72-temp-direction",3,["7.2"],1,"var",varset([
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

E("u3-72-diagram-language",3,["7.2"],2,"gen",function(){
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

/* ---------- 7.3 Forms of energy ---------- */

E("u3-73-forms",3,["7.3"],1,"var",varset([
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

E("u3-73-conversion",3,["7.3"],2,"gen",function(){
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

E("u3-73-conservation",3,["7.3"],1,"var",varset([
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

/* ---------- 7.4 Calorimetry: q = mc\u0394T ---------- */

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

E("u3-74-calorimetry-molar",3,["7.4"],3,"gen",function(){
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

E("u3-74-calorimetry-error",3,["7.4"],3,"gen",function(){
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

/* ---------- 7.5 Heat, work and enthalpy ---------- */

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

/* ---------- 7.6 Calorimetry in practice ---------- */

E("u3-76-assumptions",3,["7.6"],2,"var",varset([
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

E("u3-76-device-choice",3,["7.6"],2,"gen",function(){
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

E("u3-76-insulation-effect",3,["7.6"],2,"gen",function(){
  var layers=pick([1,2,3]);
  var mw=pick([100,150,200,250]),fuel=pick(["methanol","ethanol","propane","a solid fuel pellet"]),t0=pick([15.0,20.0,25.0]);
  return mcq("A calorimetry trial burning "+fuel+" under "+gF(mw)+" g of water (starting at "+gF(t0)+" \u00B0C) is repeated with "+layers+" extra layer"+(layers>1?"s":"")+" of insulation wrapped around the cup. Compared with the first trial, the measured temperature change is expected to be",
    "Larger and closer to the true value, because less heat escapes to the surroundings",
    ["Smaller, because the insulation absorbs the reaction's energy permanently",
     "The same, because insulation cannot affect a temperature measurement",
     "Larger, because the insulation adds chemical energy to the reaction"],
    "Insulation does not add energy; it keeps the reaction's energy in the water. With less escaping, the thermometer registers a temperature change nearer the full amount. <b>Larger and closer to the true value</b>.",{layers:layers});
});

E("u3-76-procedure",3,["7.6"],2,"gen",function(){
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

/* ---------- 7.7 Energy changes during phase changes ---------- */

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

/* ---------- 7.8 Measuring enthalpy changes ---------- */

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

E("u3-78-sign-judgement",3,["7.8"],2,"gen",function(){
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

E("u3-78-per-mole",3,["7.8"],1,"var",varset([
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

/* ---------- 7.9 Calorimetry: experimental design and analysis ---------- */

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

/* ---------- 7.10 Combustion reactions ---------- */

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

/* ---------- 7.11 Thermochemical equations ---------- */

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

E("u3-711-molar-from-data",3,["7.11"],2,"gen",function(){
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

/* ---------- 7.12 Calculating enthalpy changes ---------- */

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
