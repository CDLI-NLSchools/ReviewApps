// Chemistry 3202 Unit 2 Acids and Bases question bank
// Phase C diagram figures (Nov 2026): u2-68-curve-equivalence now draws the
// titration curve for the titration type its stem names, with the
// equivalence region unmarked. Figure helpers are in bank-u1.js.
// CRMARKS: u2-63-net-equation=3
// CRMARKS: u2-63-write-net=4
// CRMARKS: u2-64-dilution-ph=3
// CRMARKS: u2-64-mix-stoich-ph=4
// CRMARKS: u2-64-ph-from-h=2
// CRMARKS: u2-65-ka-from-ph=3
// CRMARKS: u2-65-weak-acid-ph=4
// CRMARKS: u2-65-weak-base-ph=4
// CRMARKS: u2-66-kb-calc=2
// CRMARKS: u2-68-titration-calc=3
// CRMARKS: u2-68-titration-diprotic=4

/* Scientific-notation formatter at a chosen significant-figure count,
   used wherever a concentration or constant is very small or very large.
   Declared here; the Unit 4 bank (loaded later) uses it too. */
function sciF(x,sf){var r=sfR(x,sf);if(r===0)return "0";var e=Math.floor(Math.log10(Math.abs(r)));var m=r/Math.pow(10,e);if(Math.abs(m)>=9.9995){m=1;e++;}return sfF(m,sf)+" \u00D7 10"+sfSup(e);}

/* Acid and base constants, matching the Reference Information panels. */
var KA3202={"HF":3.5e-4,"benzoic acid":6.3e-5,"acetic acid":1.8e-5,"carbonic acid":4.3e-7,"HCN":6.2e-10,"the ammonium ion":5.6e-10};
var KB3202={"ammonia":1.8e-5,"the cyanide ion":1.6e-5,"the acetate ion":5.6e-10,"the fluoride ion":2.9e-11};

/* ---------- 6.1 Acid and base theories ---------- */

E("u2-61-theory-name",2,["6.1"],1,"var",varset([
  function(){
    return mcq("An acid is defined as a proton (H\u207A) donor and a base as a proton acceptor. These definitions come from",
      "The Br\u00F8nsted-Lowry theory",
      ["The Arrhenius theory","The collision theory","The kinetic molecular theory"],
      "Donating and accepting protons is the heart of the Br\u00F8nsted-Lowry theory. The Arrhenius theory is narrower: an acid produces H\u207A in water and a base produces OH\u207B in water. <b>The Br\u00F8nsted-Lowry theory</b>.",{});
  },
  function(){
    return mcq("A base is defined as a substance that produces OH\u207B ions when dissolved in water. This definition comes from",
      "The Arrhenius theory",
      ["The Br\u00F8nsted-Lowry theory","The equilibrium theory","The atomic theory"],
      "Producing OH\u207B in water is the Arrhenius definition of a base. The Br\u00F8nsted-Lowry theory defines a base more generally, as a proton acceptor, whether or not water is involved. <b>The Arrhenius theory</b>.",{});
  },
  function(){
    return mcq("Ammonia, NH\u2083, has no OH\u207B in its formula, yet it behaves as a base in water. Which theory explains this most directly?",
      "The Br\u00F8nsted-Lowry theory: NH\u2083 accepts a proton from water, leaving OH\u207B behind",
      ["The Arrhenius theory: NH\u2083 must contain hidden OH\u207B",
       "The collision theory: NH\u2083 particles collide harder than water particles",
       "No theory explains it: ammonia is not really a base"],
      "Under Br\u00F8nsted-Lowry, a base is a proton acceptor. NH\u2083 takes a proton from H\u2082O, forming NH\u2084\u207A and OH\u207B, which is exactly why the solution is basic even though ammonia contains no hydroxide. <b>The Br\u00F8nsted-Lowry theory</b>.",{});
  },
  function(){
    return mcq("Which statement correctly compares the two acid-base theories?",
      "Every Arrhenius acid is also a Br\u00F8nsted-Lowry acid, but some Br\u00F8nsted-Lowry bases are not Arrhenius bases",
      ["Every Br\u00F8nsted-Lowry base is also an Arrhenius base, but not the reverse",
       "The two theories contradict each other, so only one can be right",
       "The Arrhenius theory is newer and replaces the Br\u00F8nsted-Lowry theory"],
      "Br\u00F8nsted-Lowry is the broader theory. Anything that produces H\u207A in water also donates protons, but a base such as NH\u2083 accepts protons without containing OH\u207B, so it is a Br\u00F8nsted-Lowry base only. <b>Every Arrhenius acid is a Br\u00F8nsted-Lowry acid, but some bases are Br\u00F8nsted-Lowry only</b>.",{});
  }
]));

E("u2-61-arrhenius-ions",2,["6.1"],1,"gen",function(){
  var a=pick([
    {f:"hydrochloric acid, HCl",ions:"H\u207A(aq) and Cl\u207B(aq)",w:["H\u207A(aq) and OH\u207B(aq)","HCl molecules only, since acids do not ionize","H\u2082(g) and Cl\u2082(g)"]},
    {f:"nitric acid, HNO\u2083",ions:"H\u207A(aq) and NO\u2083\u207B(aq)",w:["H\u207A(aq) and O\u00B2\u207B(aq)","H\u2083\u207A(aq) and N\u207B(aq)","H\u207A(aq) and OH\u207B(aq)"]},
    {f:"sodium hydroxide, NaOH",ions:"Na\u207A(aq) and OH\u207B(aq)",w:["Na\u207B(aq) and OH\u207A(aq)","Na\u207A(aq) and H\u207A(aq)","NaOH molecules only, since bases do not dissolve"]},
    {f:"potassium hydroxide, KOH",ions:"K\u207A(aq) and OH\u207B(aq)",w:["K\u207B(aq) and OH\u207A(aq)","K\u207A(aq) and O\u00B2\u207B(aq)","K\u207A(aq) and H\u2082O(l)"]},
    {f:"sulfuric acid, H\u2082SO\u2084",ions:"H\u207A(aq) and SO\u2084\u00B2\u207B(aq) ions (two H\u207A for each SO\u2084\u00B2\u207B)",w:["H\u2082\u207A(aq) and SO\u2084\u207B(aq)","H\u207A(aq) and S\u207B(aq)","H\u2082SO\u2084 molecules only"]}
  ]);
  var ml=pick([100,200,250,500]),tp=ri(15,35);
  return mcq("A "+ml+" mL solution of "+a.f+" is prepared at "+tp+" \u00B0C. Under the Arrhenius theory, the particles it contributes to the solution are",
    a.ions,a.w,
    "An Arrhenius acid contributes H\u207A ions and an Arrhenius base contributes OH\u207B ions, along with the partner ion from the formula. For "+a.f+" the particles are <b>"+a.ions+"</b>.",{ml:ml});
});

E("u2-61-bronsted-role",2,["6.1"],2,"var",varset([
  function(){
    return mcq("In the reaction HF(aq) + H\u2082O(l) \u21CC F\u207B(aq) + H\u2083O\u207A(aq), identify the Br\u00F8nsted-Lowry acid:",
      "HF, because it donates a proton to the water",
      ["H\u2082O, because it donates a proton to the HF","F\u207B, because it can accept a proton","H\u2083O\u207A, because it is the strongest acid present"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>HF, because it donates a proton to the water</b>.",{});
  },
  function(){
    return mcq("In the reaction NH\u2083(aq) + H\u2082O(l) \u21CC NH\u2084\u207A(aq) + OH\u207B(aq), identify the Br\u00F8nsted-Lowry base:",
      "NH\u2083, because it accepts a proton from the water",
      ["H\u2082O, because it accepts a proton from the NH\u2083","OH\u207B, because it contains oxygen and hydrogen","NH\u2084\u207A, because it can donate a proton"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>NH\u2083, because it accepts a proton from the water</b>.",{});
  },
  function(){
    return mcq("In the reaction HCO\u2083\u207B(aq) + H\u2082O(l) \u21CC H\u2082CO\u2083(aq) + OH\u207B(aq), identify the Br\u00F8nsted-Lowry acid:",
      "H\u2082O, because it donates a proton to the HCO\u2083\u207B",
      ["HCO\u2083\u207B, because it is listed first in the equation","OH\u207B, because it is a base in every reaction","H\u2082CO\u2083, because it has two hydrogen atoms"],
      "Follow the proton: the acid donates it and the base accepts it. Here the donor is the water: <b>H\u2082O, because it donates a proton to the HCO\u2083\u207B</b>. Water is amphiprotic and plays the acid role in this reaction.",{});
  },
  function(){
    return mcq("In the reaction CH\u2083COOH(aq) + NH\u2083(aq) \u21CC CH\u2083COO\u207B(aq) + NH\u2084\u207A(aq), identify the Br\u00F8nsted-Lowry base:",
      "NH\u2083, because it accepts the proton from the acetic acid",
      ["CH\u2083COOH, because it accepts a proton","CH\u2083COO\u207B, because it is formed from an acid","NH\u2084\u207A, because it carries a positive charge"],
      "Follow the proton: the acid donates it and the base accepts it. Here <b>NH\u2083, because it accepts the proton from the acetic acid</b>.",{});
  }
]));

E("u2-61-properties",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which set of properties belongs to aqueous solutions of acids?",
      "Sour taste, turn blue litmus red, react with active metals to produce hydrogen gas",
      ["Slippery feel, turn red litmus blue, taste bitter",
       "Sour taste, turn red litmus blue, feel slippery",
       "No reaction with metals, turn blue litmus red, feel slippery"],
      "Acids taste sour, turn blue litmus red, and react with active metals to release hydrogen gas. The slippery feel and bitter taste belong to bases. <b>Sour taste, blue litmus turns red, hydrogen gas with active metals</b>.",{});
  },
  function(){
    return mcq("Which set of properties belongs to aqueous solutions of bases?",
      "Bitter taste, slippery feel, turn red litmus blue",
      ["Sour taste, slippery feel, turn blue litmus red",
       "Bitter taste, turn red litmus blue, react with metals to produce hydrogen",
       "Slippery feel, sour taste, no effect on litmus"],
      "Bases taste bitter, feel slippery, and turn red litmus blue. The sour taste and the hydrogen gas reaction belong to acids. <b>Bitter taste, slippery feel, red litmus turns blue</b>.",{});
  },
  function(){
    return mcq("A drop of an unknown solution turns blue litmus red but does not feel slippery. The solution is most likely",
      "An acid",
      ["A base","A neutral salt solution","Pure water"],
      "Blue litmus turning red is the acid test, and acids do not feel slippery (that is a base property). The solution is an acid.",{});
  }
]));

E("u2-61-amphiprotic",2,["6.1"],2,"gen",function(){
  var s=pick([
    {sp:"HCO\u2083\u207B",asAcid:"HCO\u2083\u207B + H\u2082O \u21CC CO\u2083\u00B2\u207B + H\u2083O\u207A",asBase:"HCO\u2083\u207B + H\u2082O \u21CC H\u2082CO\u2083 + OH\u207B"},
    {sp:"HSO\u2084\u207B",asAcid:"HSO\u2084\u207B + H\u2082O \u21CC SO\u2084\u00B2\u207B + H\u2083O\u207A",asBase:"HSO\u2084\u207B + H\u2082O \u21CC H\u2082SO\u2084 + OH\u207B"},
    {sp:"H\u2082PO\u2084\u207B",asAcid:"H\u2082PO\u2084\u207B + H\u2082O \u21CC HPO\u2084\u00B2\u207B + H\u2083O\u207A",asBase:"H\u2082PO\u2084\u207B + H\u2082O \u21CC H\u2083PO\u2084 + OH\u207B"},
    {sp:"H\u2082O",asAcid:"H\u2082O + NH\u2083 \u21CC OH\u207B + NH\u2084\u207A",asBase:"H\u2082O + HCl \u2192 H\u2083O\u207A + Cl\u207B"}
  ]);
  var role=Math.random()<0.5;
  var cc=pick([0.0500,0.100,0.200,0.250,0.500]),vv=pick([100,250,500]);
  if(role){
    return mcq("A "+vv+" mL sample of a "+gF(cc)+" mol/L solution contains the amphiprotic species "+s.sp+". Which equation shows it acting as a Br\u00F8nsted-Lowry ACID?",
      s.asAcid,[s.asBase,s.sp+" + H\u207A \u2192 "+s.sp.replace("\u207B","")+" with no other change","2 "+s.sp+" \u2192 a salt and water"],
      "Acting as an acid means donating a proton. In "+s.asAcid+", "+s.sp+" gives a proton to water and becomes its conjugate base. <b>"+s.asAcid+"</b>.",{sp:s.sp,role:"acid"});
  }
  return mcq("A "+vv+" mL sample of a "+gF(cc)+" mol/L solution contains the amphiprotic species "+s.sp+". Which equation shows it acting as a Br\u00F8nsted-Lowry BASE?",
    s.asBase,[s.asAcid,s.sp+" + OH\u207B \u2192 "+s.sp.replace("\u207B","")+" with no other change","2 "+s.sp+" \u2192 a salt and water"],
    "Acting as a base means accepting a proton. In "+s.asBase+", "+s.sp+" takes a proton from water, leaving OH\u207B behind. <b>"+s.asBase+"</b>.",{sp:s.sp,role:"base"});
});

/* ---------- 6.2 Strength versus concentration ---------- */

E("u2-62-strong-list",2,["6.2"],1,"gen",function(){
  var strong=pick(["hydrochloric acid","nitric acid","sulfuric acid (first proton)","hydrobromic acid"]);
  var weak=shuffle(["acetic acid","carbonic acid","hydrofluoric acid","ammonia","benzoic acid","hydrocyanic acid"]).slice(0,3);
  var c0=pick([0.0100,0.100,0.500,1.00]);
  var list=shuffle([strong].concat(weak)).join(", ");
  return mcq("Four "+gF(c0)+" mol/L solutions are on a bench: "+list+". Which one contains a strong electrolyte that ionizes (or dissociates) essentially completely?",
    strong,weak,
    "Strong acids and bases ionize or dissociate essentially 100% in water. Of the four, only <b>"+strong+"</b> does this; the others are weak and exist mostly as un-ionized molecules or ions in equilibrium.",{c0:c0});
});

E("u2-62-dissociation-eq",2,["6.2"],2,"gen",function(){
  var w=Math.random()<0.5;
  var cc2=pick([0.0100,0.0500,0.100,0.200,0.500,1.00]),vv2=pick([100,250,500]);
  if(w){
    var acid=pick(["acetic acid, CH\u2083COOH","hydrofluoric acid, HF","benzoic acid, C\u2086H\u2085COOH"]);
    var f=acid.split(", ")[1];
    var prod=f==="HF"?"H\u2083O\u207A(aq) + F\u207B(aq)":(f==="CH\u2083COOH"?"H\u2083O\u207A(aq) + CH\u2083COO\u207B(aq)":"H\u2083O\u207A(aq) + C\u2086H\u2085COO\u207B(aq)");
    return mcq("Which equation correctly represents the ionization of the weak acid "+acid+" in a "+gF(cc2)+" mol/L aqueous solution (a "+vv2+" mL sample)?",
      f+"(aq) + H\u2082O(l) \u21CC "+prod,
      [f+"(aq) + H\u2082O(l) \u2192 "+prod,
       f+"(aq) \u2192 H\u207A(aq) + OH\u207B(aq)",
       f+"(aq) + H\u2082O(l) \u21CC "+prod.replace("H\u2083O\u207A","H\u207B")],
      "A weak acid ionizes only slightly, so the equation takes an equilibrium arrow, and in water the proton is carried as H\u2083O\u207A. <b>"+f+"(aq) + H\u2082O(l) \u21CC "+prod+"</b>.",{acid:acid});
  }
  var acid2=pick(["hydrochloric acid, HCl","nitric acid, HNO\u2083","hydrobromic acid, HBr"]);
  var f2=acid2.split(", ")[1];
  var prod2=f2==="HCl"?"H\u2083O\u207A(aq) + Cl\u207B(aq)":(f2==="HNO\u2083"?"H\u2083O\u207A(aq) + NO\u2083\u207B(aq)":"H\u2083O\u207A(aq) + Br\u207B(aq)");
  return mcq("Which equation correctly represents the ionization of the strong acid "+acid2+" in a "+gF(cc2)+" mol/L aqueous solution (a "+vv2+" mL sample)?",
    f2+"(aq) + H\u2082O(l) \u2192 "+prod2,
    [f2+"(aq) + H\u2082O(l) \u21CC "+prod2,
     f2+"(aq) \u2192 H\u207A(aq) + OH\u207B(aq)",
     f2+"(aq) + H\u2082O(l) \u2192 "+prod2.replace("H\u2083O\u207A","H\u2083O\u00B2\u207A")],
    "A strong acid ionizes essentially completely, so the equation takes a single forward arrow, and in water the proton is carried as H\u2083O\u207A. <b>"+f2+"(aq) + H\u2082O(l) \u2192 "+prod2+"</b>.",{acid:acid2});
});

E("u2-62-strength-vs-conc",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Solution A is 6.0 mol/L acetic acid (a weak acid). Solution B is 0.0010 mol/L hydrochloric acid (a strong acid). Which statement is correct?",
      "A is the more concentrated solution, but B may still have the higher [H\u2083O\u207A], because strength and concentration are different ideas",
      ["A must have the higher [H\u2083O\u207A], because it is more concentrated",
       "B must have the higher [H\u2083O\u207A], because it is stronger, in every case",
       "The two ideas, strength and concentration, mean the same thing"],
      "Concentration is how much solute is dissolved; strength is what fraction of it ionizes. A concentrated weak acid can hold far more acid in total yet release fewer H\u2083O\u207A ions than a very dilute strong acid. The two ideas must be kept separate.",{});
  },
  function(){
    return mcq("A student says a 12 mol/L bottle of acetic acid must be a strong acid because it is so concentrated. Which response is correct?",
      "Acetic acid is weak at any concentration: only a small fraction of its molecules ionize, however much is dissolved",
      ["The student is right: concentrated acids are strong by definition",
       "Acetic acid becomes strong once its concentration passes 1 mol/L",
       "Strength depends only on how the bottle is labelled"],
      "Strength describes the fraction ionized, not the amount dissolved. Acetic acid ionizes only slightly at any concentration, so it stays a weak acid even at 12 mol/L.",{});
  },
  function(){
    return mcq("Two acids are both 0.100 mol/L. Acid X has a pH of 1.00 and acid Y has a pH of 2.87. Which statement is correct?",
      "X is a strong acid and Y is a weak acid: at equal concentration the strong acid produces far more H\u2083O\u207A",
      ["X is a weak acid and Y is a strong acid",
       "Both are strong acids, because their concentrations are equal",
       "Concentration alone decides the pH, so the readings must be wrong"],
      "At the same concentration, the acid that ionizes completely gives [H\u2083O\u207A] = 0.100 mol/L and pH 1.00. The weak acid ionizes only slightly, giving a much lower [H\u2083O\u207A] and a higher pH. <b>X is strong and Y is weak</b>.",{});
  },
  function(){
    return mcq("Which pairing of terms is correct?",
      "Concentrated and dilute describe amounts dissolved; strong and weak describe fractions ionized",
      ["Concentrated means strong, and dilute means weak",
       "Strong and weak describe amounts dissolved; concentrated and dilute describe fractions ionized",
       "All four terms describe the fraction of molecules ionized"],
      "The pairs answer different questions. Concentrated/dilute: how much solute per litre. Strong/weak: what fraction of that solute ionizes. <b>Concentrated and dilute describe amounts; strong and weak describe fractions ionized</b>.",{});
  }
]));

E("u2-62-conductivity",2,["6.2"],2,"gen",function(){
  var c0=pick([0.0100,0.0200,0.0500,0.100,0.200,0.500,1.00]);
  var vol=pick([50,100,250,500]);
  var pair=pick([
    {good:"hydrochloric acid",bad:"acetic acid",why:"the strong acid is fully ionized while the weak acid is mostly un-ionized molecules, so the strong acid solution holds far more ions to carry the current"},
    {good:"sodium hydroxide",bad:"ammonia",why:"the strong base dissociates completely while ammonia ionizes only slightly, so the strong base solution holds far more ions to carry the current"},
    {good:"nitric acid",bad:"carbonic acid",why:"the strong acid is fully ionized while the weak acid is mostly un-ionized molecules, so the strong acid solution holds far more ions to carry the current"}
  ]);
  return mcq("A conductivity tester is placed in "+vol+" mL of "+gF(c0)+" mol/L "+pair.good+" and then in "+vol+" mL of "+gF(c0)+" mol/L "+pair.bad+". In which solution does the bulb glow more brightly, and why?",
    "In the "+pair.good+": "+pair.why,
    ["In the "+pair.bad+": "+pair.why,
     "Equally in both: equal concentrations always conduct equally",
     "In neither: solutions of acids and bases do not conduct electricity"],
    "Conductivity depends on the number of ions present. At equal concentration, "+pair.why+". The bulb glows more brightly in the <b>"+pair.good+"</b>.",{c0:c0});
});

E("u2-62-weak-meaning",2,["6.2"],1,"gen",function(){
  var acid=pick(["acetic acid","hydrofluoric acid","benzoic acid","carbonic acid"]);
  var pct=pick([1.3,2.8,4.2,7.5,13]);
  var c0=pick([0.0100,0.100,0.250]);
  return mcq("A "+gF(c0)+" mol/L solution of "+acid+" is found to be only "+pct+"% ionized. This behaviour classifies the acid as",
    "Weak, because only a small fraction of its molecules ionize and an equilibrium is established",
    ["Strong, because strong acids ionize slowly",
     "Concentrated, because percent ionization measures concentration",
     "Neutral, because most of it is still molecules"],
    "Weak acids and bases are defined by partial ionization: most of the solute stays as molecules, a small fraction ionizes, and the two forms sit in equilibrium. <b>Weak</b>.",{acid:acid,pct:pct});
});

/* ---------- 6.3 Br\u00F8nsted-Lowry reactions ---------- */

E("u2-63-conjugate-pair",2,["6.3"],1,"gen",function(){
  var s=pick([
    {sp:"HCO\u2083\u207B",ca:"H\u2082CO\u2083",cb:"CO\u2083\u00B2\u207B",ask:"acid"},
    {sp:"H\u2082O",ca:"H\u2083O\u207A",cb:"OH\u207B",ask:"base"},
    {sp:"NH\u2083",ca:"NH\u2084\u207A",cb:"NH\u2082\u207B",ask:"acid"},
    {sp:"HSO\u2084\u207B",ca:"H\u2082SO\u2084",cb:"SO\u2084\u00B2\u207B",ask:"base"},
    {sp:"CH\u2083COOH",ca:"CH\u2083COOH\u2082\u207A",cb:"CH\u2083COO\u207B",ask:"base"},
    {sp:"HF",ca:"H\u2082F\u207A",cb:"F\u207B",ask:"base"}
  ]);
  var cc3=pick([0.0100,0.0500,0.100,0.200,0.500]),vv3=pick([100,250,500]);
  if(s.ask==="acid"){
    return mcq("The species "+s.sp+" is present in a "+gF(cc3)+" mol/L solution (a "+vv3+" mL sample). What is the conjugate acid of "+s.sp+"?",
      s.ca,[s.cb,s.sp+" itself","H\u2083O\u207A"],
      "A conjugate acid is formed when the species accepts a proton, so it has one more H and one more unit of positive charge than the original: "+s.sp+" + H\u207A \u2192 "+s.ca+". The conjugate acid is <b>"+s.ca+"</b>.",{sp:s.sp});
  }
  return mcq("The species "+s.sp+" is present in a "+gF(cc3)+" mol/L solution (a "+vv3+" mL sample). What is the conjugate base of "+s.sp+"?",
    s.cb,[s.ca,s.sp+" itself","H\u207A"],
    "A conjugate base is what remains when the species donates a proton, so it has one fewer H and one more unit of negative charge: "+s.sp+" \u2192 "+s.cb+" + H\u207A. The conjugate base is <b>"+s.cb+"</b>.",{sp:s.sp});
});

E("u2-63-identify-roles",2,["6.3"],2,"var",varset([
  function(){
    return mcq("HNO\u2083(aq) + H\u2082O(l) \u2192 NO\u2083\u207B(aq) + H\u2083O\u207A(aq)\nIn this reaction, water acts as:",
      "A Br\u00F8nsted-Lowry base, because it accepts the proton",
      ["A Br\u00F8nsted-Lowry acid, because it donates the proton","A catalyst, because it is not changed","An Arrhenius acid, because it contains hydrogen"],
      "Track the proton transfer: HNO\u2083 donates the proton and H\u2082O accepts it, forming H\u2083O\u207A. Accepting a proton is the base role. <b>A Br\u00F8nsted-Lowry base</b>.",{});
  },
  function(){
    return mcq("HCl(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq) + Cl\u207B(aq)\nIn this reaction, the conjugate acid of NH\u2083 is:",
      "NH\u2084\u207A",
      ["HCl","Cl\u207B","NH\u2083 itself"],
      "A conjugate acid is the species formed when the base accepts a proton: NH\u2083 + H\u207A \u2192 NH\u2084\u207A. <b>NH\u2084\u207A</b>.",{});
  },
  function(){
    return mcq("CH\u2083COOH(aq) + OH\u207B(aq) \u21CC CH\u2083COO\u207B(aq) + H\u2082O(l)\nIn this reaction, the conjugate base of acetic acid is:",
      "CH\u2083COO\u207B",
      ["OH\u207B","H\u2082O","CH\u2083COOH itself"],
      "A conjugate base is what remains when the acid donates a proton: CH\u2083COOH loses H\u207A to become CH\u2083COO\u207B. <b>CH\u2083COO\u207B</b>.",{});
  },
  function(){
    return mcq("H\u2082CO\u2083(aq) + H\u2082O(l) \u21CC HCO\u2083\u207B(aq) + H\u2083O\u207A(aq)\nIn this reaction, the conjugate base of carbonic acid is:",
      "HCO\u2083\u207B",
      ["H\u2083O\u207A","H\u2082O","CO\u2083\u00B2\u207B"],
      "A conjugate base is what remains when the acid donates one proton: H\u2082CO\u2083 loses H\u207A to become HCO\u2083\u207B (losing two protons would be one step too far). <b>HCO\u2083\u207B</b>.",{});
  }
]));

E("u2-63-spectators",2,["6.3"],2,"var",varset([
  function(){
    return mcq("For the reaction KOH(aq) + HCl(aq) \u2192 KCl(aq) + H\u2082O(l), which ions are the spectator ions?",
      "K\u207A and Cl\u207B",
      ["H\u207A and OH\u207B","K\u207A and OH\u207B","H\u207A and Cl\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>K\u207A and Cl\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction NaOH(aq) + HNO\u2083(aq) \u2192 NaNO\u2083(aq) + H\u2082O(l), which ions are the spectator ions?",
      "Na\u207A and NO\u2083\u207B",
      ["H\u207A and OH\u207B","Na\u207A and OH\u207B","H\u207A and NO\u2083\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Na\u207A and NO\u2083\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction Ca(OH)\u2082(aq) + 2 HBr(aq) \u2192 CaBr\u2082(aq) + 2 H\u2082O(l), which ions are the spectator ions?",
      "Ca\u00B2\u207A and Br\u207B",
      ["H\u207A and OH\u207B","Ca\u00B2\u207A and OH\u207B","H\u207A and Br\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Ca\u00B2\u207A and Br\u207B</b>.",{});
  },
  function(){
    return mcq("For the reaction LiOH(aq) + HBr(aq) \u2192 LiBr(aq) + H\u2082O(l), which ions are the spectator ions?",
      "Li\u207A and Br\u207B",
      ["H\u207A and OH\u207B","Li\u207A and OH\u207B","H\u207A and Br\u207B"],
      "Spectator ions appear unchanged on both sides of the total ionic equation. The ions that actually react are H\u207A (or H\u2083O\u207A) and OH\u207B, which form water. The spectators are <b>Li\u207A and Br\u207B</b>.",{});
  }
]));

E("u2-63-net-equation",2,["6.3"],2,"var",varset([
  function(){
    return mcq("When sodium hydroxide solution is mixed with hydrochloric acid, the net ionic equation for the reaction that takes place is",
      "H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)",
      ["Na\u207A(aq) + Cl\u207B(aq) \u2192 NaCl(s)","NaOH(aq) + HCl(aq) \u2192 NaCl(aq) + H\u2082O(l)","H\u207A(aq) + Cl\u207B(aq) \u2192 HCl(aq)"],
      "Write the total ionic equation, cancel the ions that appear unchanged on both sides (Na\u207A and Cl\u207B), and what remains is the net ionic equation: <b>H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)</b>.",{});
  },
  function(){
    return mcq("When potassium hydroxide solution is mixed with nitric acid, the net ionic equation for the reaction that takes place is",
      "H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)",
      ["K\u207A(aq) + NO\u2083\u207B(aq) \u2192 KNO\u2083(s)","KOH(aq) + HNO\u2083(aq) \u2192 KNO\u2083(aq) + H\u2082O(l)","OH\u207B(aq) + NO\u2083\u207B(aq) \u2192 HNO\u2083(aq)"],
      "Write the total ionic equation, cancel the ions that appear unchanged on both sides (K\u207A and NO\u2083\u207B), and what remains is the net ionic equation: <b>H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)</b>. Strong acid with strong base always reduces to this.",{});
  },
  function(){
    return mcq("When acetic acid solution is mixed with sodium hydroxide solution, the net ionic equation for the reaction that takes place is",
      "CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)",
      ["H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)","Na\u207A(aq) + CH\u2083COO\u207B(aq) \u2192 CH\u2083COONa(s)","CH\u2083COOH(aq) + Na\u207A(aq) \u2192 CH\u2083COONa(aq) + H\u207A(aq)"],
      "Acetic acid is a weak electrolyte, so it is written in molecular form, not as separated ions. Cancelling only the spectator Na\u207A gives: <b>CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)</b>.",{});
  },
  function(){
    return mcq("When ammonia solution is mixed with hydrochloric acid, the net ionic equation for the reaction that takes place is",
      "NH\u2083(aq) + H\u207A(aq) \u2192 NH\u2084\u207A(aq)",
      ["NH\u2083(aq) + OH\u207B(aq) \u2192 NH\u2082\u207B(aq) + H\u2082O(l)","Cl\u207B(aq) + NH\u2084\u207A(aq) \u2192 NH\u2084Cl(s)","H\u207A(aq) + OH\u207B(aq) \u2192 H\u2082O(l)"],
      "Ammonia is a weak base and is written as NH\u2083 molecules. The proton from the strong acid transfers to NH\u2083, and Cl\u207B is the only spectator: <b>NH\u2083(aq) + H\u207A(aq) \u2192 NH\u2084\u207A(aq)</b>.",{});
  }
]));

var NETCASES=[
    {desc:"hydrofluoric acid reacting with sodium hydroxide solution",
     ans:["HF + OH\u207B \u2192 F\u207B + H\u2082O","HF + OH- -> F- + H2O","HF(aq) + OH\u207B(aq) \u2192 F\u207B(aq) + H\u2082O(l)","HF(aq)+OH-(aq)->F-(aq)+H2O(l)","OH\u207B + HF \u2192 F\u207B + H\u2082O","OH- + HF -> F- + H2O"],
     show:"HF(aq) + OH\u207B(aq) \u2192 F\u207B(aq) + H\u2082O(l)"},
    {desc:"ammonium chloride solution reacting with potassium hydroxide solution",
     ans:["NH\u2084\u207A + OH\u207B \u2192 NH\u2083 + H\u2082O","NH4+ + OH- -> NH3 + H2O","NH\u2084\u207A(aq) + OH\u207B(aq) \u2192 NH\u2083(aq) + H\u2082O(l)","NH4+(aq)+OH-(aq)->NH3(aq)+H2O(l)","OH\u207B + NH\u2084\u207A \u2192 NH\u2083 + H\u2082O","OH- + NH4+ -> NH3 + H2O"],
     show:"NH\u2084\u207A(aq) + OH\u207B(aq) \u2192 NH\u2083(aq) + H\u2082O(l)"},
    {desc:"hydrochloric acid reacting with ammonia solution",
     ans:["H\u207A + NH\u2083 \u2192 NH\u2084\u207A","H+ + NH3 -> NH4+","H\u207A(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq)","H+(aq)+NH3(aq)->NH4+(aq)","NH\u2083 + H\u207A \u2192 NH\u2084\u207A","NH3 + H+ -> NH4+","H\u2083O\u207A + NH\u2083 \u2192 NH\u2084\u207A + H\u2082O","H3O+ + NH3 -> NH4+ + H2O"],
     show:"H\u207A(aq) + NH\u2083(aq) \u2192 NH\u2084\u207A(aq)"},
    {desc:"acetic acid reacting with potassium hydroxide solution",
     ans:["CH\u2083COOH + OH\u207B \u2192 CH\u2083COO\u207B + H\u2082O","CH3COOH + OH- -> CH3COO- + H2O","CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)","CH3COOH(aq)+OH-(aq)->CH3COO-(aq)+H2O(l)","OH\u207B + CH\u2083COOH \u2192 CH\u2083COO\u207B + H\u2082O","OH- + CH3COOH -> CH3COO- + H2O","C\u2082H\u2083O\u2082H + OH\u207B \u2192 C\u2082H\u2083O\u2082\u207B + H\u2082O"],
     show:"CH\u2083COOH(aq) + OH\u207B(aq) \u2192 CH\u2083COO\u207B(aq) + H\u2082O(l)"}
];
E("u2-63-write-net",2,["6.3"],3,"var",varset(NETCASES.map(function(r){return function(){
  return textq("Write the net ionic equation for "+r.desc+". Type the equation using \u2192 or -> between the reactants and products.",
    r.ans,
    "Identify the actual reacting species and cancel the spectators. Weak electrolytes (HF, NH\u2083, CH\u2083COOH) and the ion NH\u2084\u207A are written as they exist in solution. The net ionic equation is <b>"+r.show+"</b>.",{});
};})));

var EQJCASES=[
    {eq:"HF(aq) + CH\u2083COO\u207B(aq) \u21CC F\u207B(aq) + CH\u2083COOH(aq)",ans:"Products are favoured: HF (Ka = 3.5 \u00D7 10\u207B\u2074) is a stronger acid than acetic acid (Ka = 1.8 \u00D7 10\u207B\u2075), so the equilibrium favours the side with the weaker acid",w:["Reactants are favoured: the stronger acid always stays unreacted","Neither side is favoured, because all acid-base equilibria have K = 1","Products are favoured, because fluoride is a stronger base than acetate"]},
    {eq:"HCN(aq) + F\u207B(aq) \u21CC CN\u207B(aq) + HF(aq)",ans:"Reactants are favoured: HF (Ka = 3.5 \u00D7 10\u207B\u2074) is a much stronger acid than HCN (Ka = 6.2 \u00D7 10\u207B\u00B9\u2070), so the equilibrium favours the side with the weaker acid, HCN",w:["Products are favoured: HF is a stronger acid than HCN","Neither side is favoured, because both acids are weak","Products are favoured, because the cyanide ion is a weaker base than fluoride"]},
    {eq:"NH\u2084\u207A(aq) + CH\u2083COO\u207B(aq) \u21CC NH\u2083(aq) + CH\u2083COOH(aq)",ans:"Reactants are slightly favoured: acetic acid (Ka = 1.8 \u00D7 10\u207B\u2075) is a much stronger acid than the ammonium ion (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070), so the equilibrium favours the side holding the weaker acid, NH\u2084\u207A",w:["Products are strongly favoured: both products are neutral molecules","Neither side is favoured, because the two Ka values are nearly equal","Products are favoured, because NH\u2083 is a gas and escapes"]}
];
E("u2-63-equilibrium-judgement",2,["6.3"],3,"var",varset(EQJCASES.map(function(r){return function(){
  return mcq("Use the Ka values in the Reference Information to predict the position of this acid-base equilibrium: "+r.eq+".",
    r.ans,r.w,
    "In an acid-base equilibrium, the position favours the side with the weaker acid (and weaker base): the proton ends up on the stronger base. Comparing the Ka values gives the answer. <b>"+r.ans.split(":")[0]+"</b>.",{});
};})));

/* ---------- 6.4 The pH scale ---------- */

E("u2-64-ph-from-h",2,["6.4"],2,"gen",function(){
  var M=[[1.0,2],[1.5,2],[2.0,2],[2.5,2],[3.0,2],[4.0,2],[5.0,2],[6.0,2],[8.0,2],[1.25,3],[2.50,3],[3.20,3],[5.60,3],[7.90,3]];
  var mm=pick(M),e=ri(1,6);
  var H=mm[0]*Math.pow(10,-e),dec=mm[1];
  var pH=-Math.log10(H);
  var ctx=pick(["A solution","A sample of hydrochloric acid (a strong acid, completely ionized)","A sample of gastric juice","A laboratory solution"]);
  var ans=pH;
  return numq(ctx+" has [H\u2083O\u207A] = "+sciF(H,dec)+" mol/L. Calculate the pH of the solution.",
    ans,0.03,
    "pH = -log[H\u2083O\u207A] = -log("+sciF(H,dec)+") = "+phF(pH,dec)+". The concentration has "+dec+" significant figures, so the pH is reported to "+dec+" decimal places. The pH is <b>"+phF(ans,dec)+"</b>.",{e:e,dec:dec});
});

E("u2-64-h-from-ph",2,["6.4"],2,"gen",function(){
  var M=[[1.3,2],[2.0,2],[2.5,2],[3.2,2],[4.0,2],[5.6,2],[7.9,2],[1.25,3],[3.98,3],[6.31,3]];
  var mm=pick(M),e=ri(2,9);
  var H=mm[0]*Math.pow(10,-e);
  var pH=-Math.log10(H);
  var dec=mm[1];
  var sample=pick(["lemon juice","a soft drink","tomato juice","rainwater","a shampoo solution","black coffee"]);
  var ans=sfR(H,3);
  return numq("A sample of "+sample+" has a pH of "+phF(pH,dec)+". Calculate [H\u2083O\u207A] in the sample. Give your answer in mol/L, as a decimal or in scientific notation (for example 5.56e-10).",
    ans,Math.max(0.06*ans,1e-12),
    "[H\u2083O\u207A] = 10^-pH = 10^("+("-"+phF(pH,dec))+") = "+sciF(H,4)+" mol/L. So [H\u2083O\u207A] = <b>"+sciF(ans,3)+" mol/L</b>.",{e:e});
});

E("u2-64-oh-to-ph",2,["6.4"],2,"gen",function(){
  var M=[[1.0,2],[1.6,2],[2.0,2],[2.5,2],[4.0,2],[4.5,2],[5.0,2],[1.25,3],[3.20,3],[6.30,3],[8.90,3]];
  var mm=pick(M),e=ri(1,6);
  var OH=mm[0]*Math.pow(10,-e),dec=mm[1];
  var pOH=-Math.log10(OH);
  var pH=14-pOH;
  var ctx=pick(["A solution of sodium hydroxide (a strong base)","A cleaning solution","A solution of potassium hydroxide (a strong base)"]);
  return numq(ctx+" has [OH\u207B] = "+sciF(OH,dec)+" mol/L at 25 \u00B0C. Calculate the pH of the solution.",
    pH,0.03,
    "pOH = -log[OH\u207B] = -log("+sciF(OH,dec)+") = "+phF(pOH,dec)+". Then pH = 14.00 - pOH = 14.00 - "+phF(pOH,dec)+" = "+phF(pH,dec)+". The pH is <b>"+phF(pH,dec)+"</b>.",{e:e,dec:dec});
});

E("u2-64-scale-compare",2,["6.4"],1,"gen",function(){
  var p1=ri(1,4),d=pick([2,3]),p2=p1+d;
  var factor=Math.pow(10,d);
  var s1=pick(["a lemon juice","a vinegar solution","an acid rain sample"]),s2=pick(["a soap solution","a baking soda solution","a seawater sample"]);
  return mcq("Solution A ("+s1+") has a pH of "+p1+" and Solution B ("+s2+") has a pH of "+p2+". How do their [H\u2083O\u207A] values compare?",
    "Solution A has "+factor+" times the [H\u2083O\u207A] of Solution B",
    ["Solution A has "+d+" times the [H\u2083O\u207A] of Solution B",
     "Solution B has "+factor+" times the [H\u2083O\u207A] of Solution A",
     "The two solutions have equal [H\u2083O\u207A], because both are liquids"],
    "The pH scale is logarithmic: each pH unit is a factor of 10 in [H\u2083O\u207A]. A difference of "+d+" units means a factor of 10^"+d+" = "+factor+", and the lower pH has the higher concentration. Solution A has "+factor+" times the [H\u2083O\u207A] of Solution B.",{p1:p1,p2:p2});
});

E("u2-64-neutral-water",2,["6.4"],1,"var",varset([
  function(){
    return mcq("At 25 \u00B0C, pure water has a pH of 7.00. This is because",
      "In pure water [H\u2083O\u207A] = [OH\u207B] = 1.0 \u00D7 10\u207B\u2077 mol/L, so the water is neutral",
      ["Pure water contains no ions at all",
       "The pH scale runs from 0 to 14, so 7 must be the middle for every substance",
       "Water molecules stop ionizing at 25 \u00B0C"],
      "Water autoionizes slightly, producing equal amounts of H\u2083O\u207A and OH\u207B. Equal concentrations make it neutral, and at 25 \u00B0C each is 1.0 \u00D7 10\u207B\u2077 mol/L, giving pH 7.00.",{});
  },
  function(){
    return mcq("At 25 \u00B0C, Kw for water is 1.0 \u00D7 10\u207B\u00B9\u2074. Which relationship holds in every aqueous solution at this temperature?",
      "[H\u2083O\u207A] \u00D7 [OH\u207B] = 1.0 \u00D7 10\u207B\u00B9\u2074",
      ["[H\u2083O\u207A] + [OH\u207B] = 1.0 \u00D7 10\u207B\u00B9\u2074",
       "[H\u2083O\u207A] = [OH\u207B] in every solution",
       "[H\u2083O\u207A] \u00D7 [OH\u207B] = 14.00"],
      "Kw is the equilibrium constant for the autoionization of water, so the product of the two ion concentrations is fixed at 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C, even though the individual concentrations vary from solution to solution.",{});
  },
  function(){
    return mcq("A solution at 25 \u00B0C has a pH of 7.00 but contains a dissolved salt. Which statement must be true?",
      "The solution is neutral, because [H\u2083O\u207A] = [OH\u207B] at pH 7.00 and 25 \u00B0C",
      ["The solution must be pure water, since only pure water has pH 7",
       "The solution is an acid, because salts are acidic",
       "The solution cannot contain any OH\u207B ions"],
      "Neutral is defined by equal ion concentrations, not by the absence of other substances. At 25 \u00B0C that equality occurs at pH 7.00, whether or not a salt is dissolved.",{});
  }
]));

E("u2-64-dilution-ph",2,["6.4"],3,"gen",function(){
  var combos=[
    {c1:1.00,v1:10.0,v2:1000},{c1:1.00,v1:25.0,v2:500},{c1:0.500,v1:10.0,v2:250},
    {c1:2.00,v1:10.0,v2:1000},{c1:0.100,v1:50.0,v2:500},{c1:1.00,v1:20.0,v2:200},
    {c1:0.500,v1:25.0,v2:250},{c1:2.00,v1:25.0,v2:500},
    {c1:1.00,v1:5.00,v2:500},{c1:1.00,v1:10.0,v2:500},{c1:0.500,v1:20.0,v2:1000},
    {c1:2.00,v1:20.0,v2:250},{c1:0.200,v1:25.0,v2:250},{c1:1.00,v1:15.0,v2:300},
    {c1:0.250,v1:40.0,v2:200},{c1:2.00,v1:15.0,v2:600},{c1:0.100,v1:25.0,v2:100},
    {c1:0.500,v1:5.00,v2:100},{c1:1.50,v1:10.0,v2:300},{c1:0.750,v1:20.0,v2:400},
    {c1:1.00,v1:30.0,v2:600},{c1:0.400,v1:50.0,v2:1000},{c1:2.00,v1:5.00,v2:250},
    {c1:0.0500,v1:100,v2:500},{c1:1.00,v1:12.5,v2:250},{c1:0.600,v1:30.0,v2:300}
  ];
  var c=pick(combos);
  var acid=Math.random()<0.5;
  var c2=sfR(c.c1*c.v1/c.v2,4);
  var c2s=sfR(c2,3);
  if(acid){
    var pH=-Math.log10(c2s);
    return numq("A student takes "+gF(c.v1)+" mL of "+gF(c.c1)+" mol/L hydrochloric acid and dilutes it with water to a final volume of "+gF(c.v2)+" mL. Calculate the pH of the diluted solution.",
      pH,0.03,
      "Dilution: C\u2082 = C\u2081V\u2081 / V\u2082 = ("+gF(c.c1)+" \u00D7 "+gF(c.v1)+") / "+gF(c.v2)+" = "+sciF(c2,4)+" mol/L, which is "+sciF(c2s,3)+" mol/L to three significant figures. Hydrochloric acid is strong, so [H\u2083O\u207A] = "+sciF(c2s,3)+" mol/L. pH = -log("+sciF(c2s,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
  }
  var pOH=-Math.log10(c2s),pH=14-pOH;
  return numq("A student takes "+gF(c.v1)+" mL of "+gF(c.c1)+" mol/L sodium hydroxide solution and dilutes it with water to a final volume of "+gF(c.v2)+" mL. Calculate the pH of the diluted solution at 25 \u00B0C.",
    pH,0.03,
    "Dilution: C\u2082 = C\u2081V\u2081 / V\u2082 = ("+gF(c.c1)+" \u00D7 "+gF(c.v1)+") / "+gF(c.v2)+" = "+sciF(c2,4)+" mol/L, which is "+sciF(c2s,3)+" mol/L to three significant figures. Sodium hydroxide is a strong base, so [OH\u207B] = "+sciF(c2s,3)+" mol/L. pOH = -log("+sciF(c2s,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-64-mix-stoich-ph",2,["6.4"],3,"gen",function(){
  var combos=[
    {va:50.0,ca:0.200,vb:30.0,cb:0.200},{va:40.0,ca:0.250,vb:25.0,cb:0.200},
    {va:25.0,ca:0.400,vb:40.0,cb:0.100},{va:60.0,ca:0.150,vb:20.0,cb:0.300},
    {va:30.0,ca:0.200,vb:50.0,cb:0.200},{va:25.0,ca:0.200,vb:45.0,cb:0.250},
    {va:20.0,ca:0.300,vb:55.0,cb:0.200},{va:35.0,ca:0.100,vb:60.0,cb:0.150},
    {va:50.0,ca:0.100,vb:20.0,cb:0.100},{va:45.0,ca:0.200,vb:30.0,cb:0.100},
    {va:30.0,ca:0.300,vb:25.0,cb:0.200},{va:55.0,ca:0.150,vb:35.0,cb:0.100},
    {va:15.0,ca:0.400,vb:35.0,cb:0.100},{va:65.0,ca:0.120,vb:25.0,cb:0.240},
    {va:20.0,ca:0.500,vb:60.0,cb:0.100},{va:75.0,ca:0.0800,vb:30.0,cb:0.100},
    {va:40.0,ca:0.100,vb:70.0,cb:0.150},{va:28.0,ca:0.250,vb:52.0,cb:0.100},
    {va:33.0,ca:0.180,vb:66.0,cb:0.120},{va:48.0,ca:0.220,vb:24.0,cb:0.220},
    {va:18.0,ca:0.350,vb:42.0,cb:0.200},{va:52.0,ca:0.140,vb:28.0,cb:0.200},
    {va:26.0,ca:0.280,vb:54.0,cb:0.160},{va:38.0,ca:0.160,vb:62.0,cb:0.140},
    {va:70.0,ca:0.0900,vb:35.0,cb:0.210},{va:22.0,ca:0.420,vb:44.0,cb:0.260}
  ];
  var c=pick(combos);
  var nm=pick([["hydrochloric acid","sodium hydroxide solution"],["nitric acid","potassium hydroxide solution"],["hydrochloric acid","potassium hydroxide solution"],["nitric acid","sodium hydroxide solution"]]);
  var na=sfR(c.ca*c.va/1000,5),nb=sfR(c.cb*c.vb/1000,5);
  var vt=(c.va+c.vb)/1000;
  var acidExcess=na>nb;
  var excess=sfR(Math.abs(na-nb),5);
  var conc=sfR(excess/vt,4),conc3=sfR(conc,3);
  var solHead="Moles of H\u207A from the acid: "+gF(c.ca)+" mol/L \u00D7 "+gF(c.va)+" mL / 1000 = "+iF(na)+" mol. Moles of OH\u207B from the base: "+gF(c.cb)+" mol/L \u00D7 "+gF(c.vb)+" mL / 1000 = "+iF(nb)+" mol. ";
  if(acidExcess){
    var pH=-Math.log10(conc3);
    return numq(gF(c.va)+" mL of "+gF(c.ca)+" mol/L "+nm[0]+" is mixed with "+gF(c.vb)+" mL of "+gF(c.cb)+" mol/L "+nm[1]+". Calculate the pH of the resulting mixture.",
      pH,0.03,
      solHead+"The acid is in excess by "+iF(na)+" - "+iF(nb)+" = "+iF(excess)+" mol of H\u207A. The total volume is "+gF(c.va+c.vb)+" mL = "+fmt(vt,3)+" L, so [H\u2083O\u207A] = "+iF(excess)+" / "+fmt(vt,3)+" = "+sciF(conc,4)+" mol/L = "+sciF(conc3,3)+" mol/L. pH = -log("+sciF(conc3,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
  }
  var pOH=-Math.log10(conc3),pH2=14-pOH;
  return numq(gF(c.va)+" mL of "+gF(c.ca)+" mol/L "+nm[0]+" is mixed with "+gF(c.vb)+" mL of "+gF(c.cb)+" mol/L "+nm[1]+". Calculate the pH of the resulting mixture at 25 \u00B0C.",
    pH2,0.03,
    solHead+"The base is in excess by "+iF(nb)+" - "+iF(na)+" = "+iF(excess)+" mol of OH\u207B. The total volume is "+gF(c.va+c.vb)+" mL = "+fmt(vt,3)+" L, so [OH\u207B] = "+iF(excess)+" / "+fmt(vt,3)+" = "+sciF(conc,4)+" mol/L = "+sciF(conc3,3)+" mol/L. pOH = -log("+sciF(conc3,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH2,3)+". The pH is <b>"+phF(pH2,3)+"</b>.",{});
});

/* ---------- 6.5 Weak acid and base equilibrium ---------- */

E("u2-65-weak-acid-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"acetic acid",ka:1.8e-5,cs:[0.0100,0.0150,0.0200,0.0250,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500]},
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.200,0.250,0.300,0.400,0.500,0.600,0.750,0.800,1.00]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.300,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.300,0.500,0.750,1.00]},
    {name:"an ammonium chloride solution (NH\u2084\u207A)",ka:5.6e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00]}
  ];
  var p,x,pct,tries=0;
  do{ p=pick(pools); var C=pick(p.cs); x=Math.sqrt(p.ka*C); pct=100*x/C; tries++; }while(pct>=5&&tries<40);
  if(pct>=5){ p=pools[0]; C=0.100; x=Math.sqrt(p.ka*C); pct=100*x/C; }
  var x4=sfR(x,4),x3=sfR(x,3);
  var pH=-Math.log10(x3);
  return numq("Calculate the pH of a "+gF(C)+" mol/L solution of "+p.name+". The Ka value is in the Reference Information.",
    pH,0.03,
    "For the equilibrium, [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) = \u221A("+sciF(p.ka,2)+" \u00D7 "+gF(C)+") = "+sciF(x4,4)+" mol/L, which is "+sciF(x3,3)+" mol/L to three significant figures. Check: "+sciF(x3,3)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%, so [H\u2083O\u207A] is well under 5% of "+gF(C)+" mol/L and the approximation holds. pH = -log("+sciF(x3,3)+") = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-65-weak-base-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"ammonia",kb:1.8e-5,cs:[0.0100,0.0150,0.0200,0.0250,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500,0.750,1.00],label:"NH\u2083"},
    {name:"a sodium cyanide solution (CN\u207B)",kb:1.6e-5,cs:[0.0200,0.0300,0.0400,0.0500,0.0600,0.0800,0.100,0.150,0.200,0.250,0.300,0.400,0.500,0.750,1.00],label:"CN\u207B"},
    {name:"a sodium acetate solution (CH\u2083COO\u207B)",kb:5.6e-10,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00],label:"CH\u2083COO\u207B"},
    {name:"a sodium fluoride solution (F\u207B)",kb:2.9e-11,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500,0.750,1.00],label:"F\u207B"}
  ];
  var p,x,pct,tries=0;
  do{ p=pick(pools); var C=pick(p.cs); x=Math.sqrt(p.kb*C); pct=100*x/C; tries++; }while(pct>=5&&tries<40);
  if(pct>=5){ p=pools[0]; C=0.100; x=Math.sqrt(p.kb*C); pct=100*x/C; }
  var x4=sfR(x,4),x3=sfR(x,3);
  var pOH=-Math.log10(x3),pH=14-pOH;
  return numq("Calculate the pH of a "+gF(C)+" mol/L solution of "+p.name+" at 25 \u00B0C. The Kb value is in the Reference Information.",
    pH,0.03,
    "The base ionizes (or hydrolyzes) to produce OH\u207B: [OH\u207B] \u2248 \u221A(Kb \u00D7 C) = \u221A("+sciF(p.kb,2)+" \u00D7 "+gF(C)+") = "+sciF(x4,4)+" mol/L, which is "+sciF(x3,3)+" mol/L to three significant figures. Check: "+sciF(x3,3)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%, so the approximation holds. pOH = -log("+sciF(x3,3)+") = "+phF(pOH,3)+", and pH = 14.00 - "+phF(pOH,3)+" = "+phF(pH,3)+". The pH is <b>"+phF(pH,3)+"</b>.",{});
});

E("u2-65-ka-from-ph",2,["6.5"],3,"gen",function(){
  var pools=[
    {name:"acetic acid",cs:[0.0100,0.100,0.500,1.00]},
    {name:"benzoic acid",cs:[0.0200,0.0250]},
    {name:"hydrofluoric acid",cs:[0.200,0.500,1.00]},
    {name:"hydrocyanic acid",cs:[0.0100,0.100,1.00]},
    {name:"carbonic acid",cs:[0.0100,0.100]}
  ];
  var p=pick(pools),C=pick(p.cs);
  var es=C<=0.0100?[4,5,6]:(C<=0.0250?[4,5]:[3,4,5]);
  var e=pick(es),m=pick([1.25,2.50,3.16,4.00,5.01,6.31,7.94,9.55]);
  var h=m*Math.pow(10,-e);
  if(h>C/100){ h=C/200; }
  var pH=-Math.log10(h);
  var Ka=(h*h)/(C-h);
  var ans=sfR(Ka,3);
  return numq("A "+gF(C)+" mol/L solution of the weak acid "+p.name+" has a pH of "+phF(pH,3)+". Calculate the Ka of the acid. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans,Math.max(0.07*ans,1e-13),
    "[H\u2083O\u207A] = 10^-pH = 10^("+"-"+phF(pH,3)+") = "+sciF(h,3)+" mol/L. At equilibrium [A\u207B] = [H\u2083O\u207A] and [HA] = "+gF(C)+" - "+sciF(h,3)+" mol/L. Ka = [H\u2083O\u207A][A\u207B] / [HA] = ("+sciF(h,3)+")\u00B2 / ("+gF(C)+" - "+sciF(h,3)+") = "+sciF(Ka,4)+". So Ka = <b>"+sciF(ans,3)+"</b>.",{});
});

E("u2-65-percent-ionization",2,["6.5"],2,"gen",function(){
  var pools=[
    {name:"acetic acid",ka:1.8e-5,cs:[0.00100,0.00200,0.00500,0.0100,0.0200,0.0500,0.100,0.200,0.500]},
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.0100,0.0200,0.0500,0.100,0.200,0.250,0.500]},
    {name:"benzoic acid",ka:6.3e-5,cs:[0.00500,0.0100,0.0150,0.0200,0.0250]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.0500,0.100,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.0100,0.0500,0.100,0.500,1.00]}
  ];
  var p=pick(pools),C=pick(p.cs);
  var x=Math.sqrt(p.ka*C);
  var pct=100*x/C;
  var ans=sfR(pct,3);
  var vol=pick([100,250,500]);
  return numq("A "+vol+" mL sample of a "+gF(C)+" mol/L solution of "+p.name+" is prepared. Calculate the percent ionization of the acid. The Ka value is in the Reference Information. Give your answer as a percent.",
    ans,Math.max(0.03*ans,0.02),
    "[H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) = \u221A("+sciF(p.ka,2)+" \u00D7 "+gF(C)+") = "+sciF(x,4)+" mol/L. Percent ionization = [H\u2083O\u207A] / C \u00D7 100% = "+sciF(x,4)+" / "+gF(C)+" \u00D7 100% = "+F3(pct)+"%. The percent ionization is <b>"+F3(ans)+"%</b>.",{});
});

E("u2-65-compare-ph",2,["6.5"],3,"gen",function(){
  var acids=[
    {name:"hydrofluoric acid",ka:3.5e-4,cs:[0.100,0.200,0.500]},
    {name:"acetic acid",ka:1.8e-5,cs:[0.0100,0.100,0.500]},
    {name:"benzoic acid",ka:6.3e-5,cs:[0.0200,0.0250]},
    {name:"carbonic acid",ka:4.3e-7,cs:[0.0100,0.100,0.500]},
    {name:"hydrocyanic acid",ka:6.2e-10,cs:[0.100,0.500,1.00]}
  ];
  var A,B,pHA,pHB,tries=0;
  do{
    A=pick(acids); B=pick(acids);
    var ca=pick(A.cs),cb=pick(B.cs);
    pHA=-Math.log10(Math.sqrt(A.ka*ca)); pHB=-Math.log10(Math.sqrt(B.ka*cb)); tries++;
  }while((A===B||Math.abs(pHA-pHB)<0.4)&&tries<60);
  if(A===B){ A=acids[0]; B=acids[1]; ca=0.100; cb=0.100; pHA=-Math.log10(Math.sqrt(A.ka*ca)); pHB=-Math.log10(Math.sqrt(B.ka*cb)); }
  var lowerFirst=pHA<pHB;
  var lowName=lowerFirst?"the "+A.name:"the "+B.name, highName=lowerFirst?"the "+B.name:"the "+A.name;
  var lowPh=lowerFirst?pHA:pHB, highPh=lowerFirst?pHB:pHA;
  var solA="the "+A.name+" ("+gF(ca)+" mol/L)", solB="the "+B.name+" ("+gF(cb)+" mol/L)";
  var correct="The solution of "+lowName+" has the lower pH: its [H\u2083O\u207A] is larger, giving pH \u2248 "+phF(lowPh,2)+" compared with pH \u2248 "+phF(highPh,2);
  return mcq("Solution 1 is "+solA+" and Solution 2 is "+solB+". Both Ka values are in the Reference Information. Which solution has the lower pH, and why?",
    correct,
    ["The solution of "+highName+" has the lower pH: its [H\u2083O\u207A] is larger, giving pH \u2248 "+phF(lowPh,2)+" compared with pH \u2248 "+phF(highPh,2),
     "Both solutions have the same pH, because pH depends only on concentration",
     "The solution with the smaller Ka always has the lower pH, regardless of concentration"],
    "Estimate [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C) for each: for "+solA+", [H\u2083O\u207A] \u2248 "+sciF(Math.sqrt(A.ka*ca),3)+" mol/L (pH \u2248 "+phF(pHA,2)+"); for "+solB+", [H\u2083O\u207A] \u2248 "+sciF(Math.sqrt(B.ka*cb),3)+" mol/L (pH \u2248 "+phF(pHB,2)+"). The larger [H\u2083O\u207A] gives the lower pH. <b>"+correct.split(":")[0]+"</b>.",{});
});

E("u2-65-approx-validity",2,["6.5"],2,"gen",function(){
  var cases=[
    {name:"acetic acid",ka:1.8e-5,C:0.00100},
    {name:"acetic acid",ka:1.8e-5,C:0.000500},
    {name:"acetic acid",ka:1.8e-5,C:0.0500},
    {name:"acetic acid",ka:1.8e-5,C:0.100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.0100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.0500},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.100},
    {name:"hydrofluoric acid",ka:3.5e-4,C:0.500},
    {name:"benzoic acid",ka:6.3e-5,C:0.0100},
    {name:"benzoic acid",ka:6.3e-5,C:0.0250},
    {name:"carbonic acid",ka:4.3e-7,C:0.0100},
    {name:"carbonic acid",ka:4.3e-7,C:0.100},
    {name:"hydrocyanic acid",ka:6.2e-10,C:0.100}
  ];
  var c=pick(cases);
  var tp=pick([18,20,22,25,28,30]);
  var x=Math.sqrt(c.ka*c.C),pct=100*x/c.C;
  var ok=pct<5;
  var yes="Yes: [H\u2083O\u207A] \u2248 "+sciF(x,3)+" mol/L is only "+F3(pct)+"% of the initial concentration, under the 5% limit";
  var no="No: [H\u2083O\u207A] \u2248 "+sciF(x,3)+" mol/L is "+F3(pct)+"% of the initial concentration, over the 5% limit, so the full equilibrium calculation is needed";
  var correct=ok?yes:no, wrong=ok?no:yes;
  return mcq("At "+tp+" \u00B0C, a student wants to calculate the pH of a "+gF(c.C)+" mol/L solution of "+c.name+" (Ka = "+sciF(c.ka,2)+") using the approximation [H\u2083O\u207A] \u2248 \u221A(Ka \u00D7 C), which neglects the change in the acid concentration. Is the approximation justified?",
    correct,[wrong,
     "Yes, always: the approximation works for every weak acid at every concentration",
     "No, never: approximations are not allowed in equilibrium calculations"],
    "Test the approximation: [H\u2083O\u207A] \u2248 \u221A("+sciF(c.ka,2)+" \u00D7 "+gF(c.C)+") = "+sciF(x,4)+" mol/L, and "+sciF(x,4)+" / "+gF(c.C)+" \u00D7 100% = "+F3(pct)+"%. The rule is that the ionized amount must be under about 5% of the initial concentration. <b>"+(ok?"Yes":"No")+"</b>: the value is "+F3(pct)+"% of C.",{});
});

/* ---------- 6.6 Conjugate pairs and hydrolysis ---------- */

E("u2-66-kb-calc",2,["6.6"],2,"gen",function(){
  var mant=pick([1.5,2.0,2.5,3.0,3.5,4.0,4.5,5.0,5.5,6.0,6.5,7.0,7.5,8.0,8.5,9.0,9.5]);
  var expo=pick([-4,-5,-6,-7,-8,-9,-10]);
  var ka=mant*Math.pow(10,expo);
  var kb=1.0e-14/ka;
  var ans=sfR(kb,3);
  return numq("A weak acid HA has Ka = "+sciF(ka,2)+" at 25 \u00B0C. Calculate Kb for its conjugate base, A\u207B. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans,0.03*ans,
    "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = Kw / Ka = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(ka,2)+" = "+sciF(kb,3)+". The Kb of A\u207B is <b>"+sciF(ans,3)+"</b>.",{});
});

E("u2-66-kb-from-ka",2,["6.6"],2,"gen",function(){
  var pairs=[
    {acid:"HF",ka:3.5e-4,base:"F\u207B"},
    {acid:"acetic acid",ka:1.8e-5,base:"CH\u2083COO\u207B"},
    {acid:"HCN",ka:6.2e-10,base:"CN\u207B"},
    {acid:"benzoic acid",ka:6.3e-5,base:"C\u2086H\u2085COO\u207B"},
    {acid:"the ammonium ion, NH\u2084\u207A",ka:5.6e-10,base:"NH\u2083"},
    {acid:"carbonic acid",ka:4.3e-7,base:"HCO\u2083\u207B"}
  ];
  var named=Math.random()<0.45;
  if(named){
    var p=pick(pairs);
    var Kb=1.0e-14/p.ka;
    var ans=sfR(Kb,3);
    return numq("At 25 \u00B0C, the Ka of "+p.acid+" is "+sciF(p.ka,2)+". Calculate the Kb of its conjugate base, "+p.base+". Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
      ans,Math.max(0.03*ans,1e-13),
      "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(p.ka,2)+" = "+sciF(Kb,4)+". So Kb = <b>"+sciF(ans,3)+"</b>.",{named:1});
  }
  var mant=pick([1.0,1.8,2.5,3.5,4.3,5.6,6.2,6.3,7.9,9.0]),ex=pick([-3,-4,-5,-6,-7,-8,-9,-10]);
  var Ka=mant*Math.pow(10,ex);
  var Kb2=1.0e-14/Ka;
  var ans2=sfR(Kb2,3);
  return numq("A weak acid HA has Ka = "+sciF(Ka,2)+" at 25 \u00B0C. Calculate the Kb of its conjugate base, A\u207B. Give your answer as a decimal or in scientific notation (for example 5.56e-10).",
    ans2,Math.max(0.03*ans2,1e-13),
    "For a conjugate acid-base pair, Ka \u00D7 Kb = Kw = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C. Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 / "+sciF(Ka,2)+" = "+sciF(Kb2,4)+". So Kb = <b>"+sciF(ans2,3)+"</b>.",{named:0});
});

E("u2-66-salt-predict",2,["6.6"],2,"gen",function(){
  var salts=[
    {s:"sodium chloride",v:"neutral (pH = 7)",why:"Na\u207A and Cl\u207B come from a strong base and a strong acid, so neither ion hydrolyzes"},
    {s:"potassium nitrate",v:"neutral (pH = 7)",why:"K\u207A and NO\u2083\u207B come from a strong base and a strong acid, so neither ion hydrolyzes"},
    {s:"ammonium chloride",v:"acidic (pH < 7)",why:"NH\u2084\u207A is the conjugate acid of a weak base and donates a proton to water, producing H\u2083O\u207A"},
    {s:"ammonium sulfate",v:"acidic (pH < 7)",why:"NH\u2084\u207A is the conjugate acid of a weak base and donates a proton to water, producing H\u2083O\u207A"},
    {s:"iron(III) chloride",v:"acidic (pH < 7)",why:"the small, highly charged Fe\u00B3\u207A ion pulls electron density from water and releases H\u2083O\u207A"},
    {s:"sodium acetate",v:"basic (pH > 7)",why:"CH\u2083COO\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"sodium cyanide",v:"basic (pH > 7)",why:"CN\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"sodium fluoride",v:"basic (pH > 7)",why:"F\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"potassium carbonate",v:"basic (pH > 7)",why:"CO\u2083\u00B2\u207B is the conjugate base of a weak acid and accepts a proton from water, producing OH\u207B"},
    {s:"ammonium acetate",v:"neutral (pH \u2248 7)",why:"NH\u2084\u207A (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070) and CH\u2083COO\u207B (Kb = 5.6 \u00D7 10\u207B\u00B9\u2070) hydrolyze to nearly the same extent, so the effects cancel"},
    {s:"ammonium fluoride",v:"acidic (pH < 7)",why:"NH\u2084\u207A (Ka = 5.6 \u00D7 10\u207B\u00B9\u2070) hydrolyzes more than F\u207B (Kb = 2.9 \u00D7 10\u207B\u00B9\u00B9), so H\u2083O\u207A production wins"}
  ];
  var p=pick(salts);
  var C=pick([0.0500,0.100,0.200]);
  var vol=pick([100,250,500]);
  var verdicts=["acidic (pH < 7)","basic (pH > 7)","neutral (pH = 7)","neutral (pH \u2248 7)"];
  var correctV=p.v;
  var ds=verdicts.filter(function(v){return v!==correctV&&!(correctV.indexOf("neutral")===0&&v.indexOf("neutral")===0);}).slice(0,2);
  ds.push("impossible to predict from the formula");
  return mcq("A "+gF(C)+" mol/L solution of "+p.s+" is prepared in a "+vol+" mL flask at 25 \u00B0C. Predict the nature of the solution.",
    correctV+": "+p.why,ds.map(function(d){return d+": the ions of any salt react completely with water";}),
    "Decide which ions come from a weak acid or a weak base, because only those hydrolyze. Here, "+p.why+". The solution is <b>"+correctV+"</b>.",{salt:p.s});
});

E("u2-66-hydrolysis-ion",2,["6.6"],2,"gen",function(){
  var salts=[
    {s:"sodium acetate",eq:"CH\u2083COO\u207B(aq) + H\u2082O(l) \u21CC CH\u2083COOH(aq) + OH\u207B(aq)",ion:"the acetate ion, CH\u2083COO\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","CH\u2083COO\u207B(aq) + H\u2082O(l) \u21CC CH\u2083\u207B(aq) + CO\u2082(g) + H\u2082O(l)","no ion hydrolyzes in this salt"]},
    {s:"ammonium chloride",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["Cl\u207B(aq) + H\u2082O(l) \u21CC HCl(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2085\u00B2\u207A(aq) + OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"sodium cyanide",eq:"CN\u207B(aq) + H\u2082O(l) \u21CC HCN(aq) + OH\u207B(aq)",ion:"the cyanide ion, CN\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","CN\u207B(aq) + H\u2082O(l) \u21CC C\u207A(aq) + N\u207B(aq) + H\u2082O(l)","no ion hydrolyzes in this salt"]},
    {s:"sodium fluoride",eq:"F\u207B(aq) + H\u2082O(l) \u21CC HF(aq) + OH\u207B(aq)",ion:"the fluoride ion, F\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","F\u207B(aq) + H\u2082O(l) \u21CC F\u2082\u207A(aq) + 2 H\u207A(aq)","no ion hydrolyzes in this salt"]},
    {s:"ammonium nitrate",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["NO\u2083\u207B(aq) + H\u2082O(l) \u21CC HNO\u2083(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2082(g) + OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"potassium carbonate",eq:"CO\u2083\u00B2\u207B(aq) + H\u2082O(l) \u21CC HCO\u2083\u207B(aq) + OH\u207B(aq)",ion:"the carbonate ion, CO\u2083\u00B2\u207B",w:["K\u207A(aq) + H\u2082O(l) \u21CC KOH(aq) + H\u207A(aq)","CO\u2083\u00B2\u207B(aq) + H\u2082O(l) \u21CC CO\u2082(g) + 2 OH\u207B(aq)","no ion hydrolyzes in this salt"]},
    {s:"sodium benzoate",eq:"C\u2086H\u2085COO\u207B(aq) + H\u2082O(l) \u21CC C\u2086H\u2085COOH(aq) + OH\u207B(aq)",ion:"the benzoate ion, C\u2086H\u2085COO\u207B",w:["Na\u207A(aq) + H\u2082O(l) \u21CC NaOH(aq) + H\u207A(aq)","C\u2086H\u2085COO\u207B(aq) \u2192 C\u2086H\u2086(g) + CO\u2082(g)","no ion hydrolyzes in this salt"]},
    {s:"ammonium sulfate",eq:"NH\u2084\u207A(aq) + H\u2082O(l) \u21CC NH\u2083(aq) + H\u2083O\u207A(aq)",ion:"the ammonium ion, NH\u2084\u207A",w:["SO\u2084\u00B2\u207B(aq) + H\u2082O(l) \u21CC H\u2082SO\u2084(aq) + OH\u207B(aq)","NH\u2084\u207A(aq) \u2192 N\u2082(g) + 4 H\u2082(g)","no ion hydrolyzes in this salt"]}
  ];
  var p=pick(salts);
  var vol=pick([100,250,500]),C=pick([0.0500,0.100,0.200]);
  return mcq("A "+gF(C)+" mol/L solution of "+p.s+" is prepared in a "+vol+" mL flask. Which equation correctly shows the hydrolysis that occurs?",
    p.eq,p.w,
    "Only the ion from a weak acid or a weak base hydrolyzes. In "+p.s+" that is "+p.ion+", which reacts with water: <b>"+p.eq+"</b>.",{salt:p.s});
});

E("u2-66-kw-relation",2,["6.6"],1,"var",varset([
  function(){
    return mcq("For any conjugate acid-base pair at 25 \u00B0C, the constants obey",
      "Ka \u00D7 Kb = 1.0 \u00D7 10\u207B\u00B9\u2074",
      ["Ka + Kb = 1.0 \u00D7 10\u207B\u00B9\u2074","Ka \u00D7 Kb = 14.00","Ka = Kb for every pair"],
      "The ionization of the acid and the hydrolysis of its conjugate base add up to the autoionization of water, so their constants multiply to Kw: Ka \u00D7 Kb = 1.0 \u00D7 10\u207B\u00B9\u2074 at 25 \u00B0C.",{});
  },
  function(){
    return mcq("Acid A has Ka = 1.0 \u00D7 10\u207B\u00B3 and acid B has Ka = 1.0 \u00D7 10\u207B\u2078. Which statement about their conjugate bases is correct?",
      "The conjugate base of B is much stronger than the conjugate base of A",
      ["The conjugate base of A is much stronger than the conjugate base of B",
       "Both conjugate bases have the same strength",
       "Neither acid has a conjugate base"],
      "Conjugate strengths run in opposite directions: the weaker the acid, the stronger its conjugate base. Acid B is far weaker, so its conjugate base is far stronger. <b>The conjugate base of B is much stronger</b>.",{});
  },
  function(){
    return mcq("Chloride ion, Cl\u207B, is the conjugate base of the strong acid HCl. Which statement describes Cl\u207B in water?",
      "It is an extremely weak base: it does not hydrolyze measurably, so a chloride salt of a strong base is neutral",
      ["It is a strong base that raises the pH sharply",
       "It hydrolyzes to produce H\u2083O\u207A",
       "It reacts with water to reform HCl completely"],
      "The conjugate base of a strong acid is a negligibly weak base. Chloride does not accept protons from water to any measurable extent, which is why NaCl solutions are neutral.",{});
  }
]));

/* ---------- 6.7 Indicators ---------- */

E("u2-67-indicator-choice",2,["6.7"],2,"gen",function(){
  var cases=[
    {desc:"hydrochloric acid titrated with sodium hydroxide",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]},
    {desc:"acetic acid titrated with sodium hydroxide",eq:"above 7 (about 9)",best:"phenolphthalein (range 8.2 to 10.0)",w:["methyl orange (range 3.1 to 4.4)","bromothymol blue (range 6.0 to 7.6)","methyl red (range 4.4 to 6.2)"]},
    {desc:"aqueous ammonia titrated with hydrochloric acid",eq:"below 7 (about 5)",best:"methyl orange (range 3.1 to 4.4)",w:["phenolphthalein (range 8.2 to 10.0)","bromothymol blue (range 6.0 to 7.6)","thymol blue (range 8.0 to 9.6)"]},
    {desc:"nitric acid titrated with potassium hydroxide",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]},
    {desc:"sodium hydroxide solution titrated with hydrochloric acid",eq:"about 7",best:"bromothymol blue (range 6.0 to 7.6)",w:["phenolphthalein (range 8.2 to 10.0)","methyl orange (range 3.1 to 4.4)","no indicator can work for a strong acid"]}
  ];
  var c=pick(cases);
  var vol=pick([10.0,20.0,25.0,50.0]),conc=pick([0.0500,0.100,0.200]),tp=ri(18,30);
  return mcq("In a titration at "+tp+" \u00B0C, "+gF(vol)+" mL of a "+gF(conc)+" mol/L solution is used in the reaction where "+c.desc+". The pH at the equivalence point is "+c.eq+". Using the indicator table in the Reference Information, the best indicator is",
    c.best,c.w,
    "An indicator works when its colour change range brackets the pH at the equivalence point. Here that pH is "+c.eq+", so the best choice is <b>"+c.best+"</b>.",{});
});

E("u2-67-indicator-colour",2,["6.7"],2,"gen",function(){
  var cases=[
    {ind:"bromothymol blue",ph:4.0,col:"yellow",w:["blue","green","pink"]},
    {ind:"bromothymol blue",ph:9.0,col:"blue",w:["yellow","green","red"]},
    {ind:"methyl orange",ph:2.0,col:"red",w:["yellow","orange","blue"]},
    {ind:"methyl orange",ph:8.0,col:"yellow",w:["red","orange","green"]},
    {ind:"phenolphthalein",ph:5.0,col:"colourless",w:["pink","magenta","purple"]},
    {ind:"phenolphthalein",ph:11.0,col:"pink",w:["colourless","yellow","blue"]},
    {ind:"litmus",ph:3.0,col:"red",w:["blue","purple","pink"]},
    {ind:"litmus",ph:10.0,col:"blue",w:["red","purple","yellow"]}
  ];
  var c=pick(cases);
  var vol=pick([50,100,250]),drops=ri(2,5);
  return mcq(drops+" drops of "+c.ind+" are added to "+vol+" mL of a solution with a pH of "+fmt(c.ph,1)+". Using the indicator table in the Reference Information, the colour observed is",
    c.col,c.w,
    "Compare the pH with the indicator's change range in the Reference Information. At pH "+fmt(c.ph,1)+", "+c.ind+" is well outside its transition range on one side, and shows its colour for that side: <b>"+c.col+"</b>.",{ind:c.ind,ph:c.ph});
});

E("u2-67-endpoint-equivalence",2,["6.7"],1,"var",varset([
  function(){
    return mcq("In a titration, the equivalence point and the endpoint are best described as",
      "The equivalence point is when moles of acid and base are stoichiometrically equal; the endpoint is when the indicator changes colour",
      ["Both terms mean the moment the indicator changes colour",
       "The endpoint is a theoretical idea and the equivalence point is read from the burette",
       "The equivalence point is when the pH reaches exactly 7.00 in every titration"],
      "The equivalence point is defined by the stoichiometry of the reaction. The endpoint is the experimental signal, the indicator's colour change, which the analyst tries to match to the equivalence point. The two are not the same idea.",{});
  },
  function(){
    return mcq("A titration is repeated three times and the volumes agree closely, but all three are slightly past the true equivalence point because the indicator changed late. The results show",
      "Good precision but a systematic error, because the endpoint did not match the equivalence point",
      ["Good accuracy, because the volumes agree with each other",
       "Poor precision, because the volumes are all wrong",
       "No error at all, because the indicator always changes exactly at equivalence"],
      "Agreement among trials is precision; agreement with the true value is accuracy. A late-changing indicator shifts every trial the same way, giving precise but systematically high volumes.",{});
  },
  function(){
    return mcq("Why is an indicator chosen so that its colour change range includes the equivalence point pH?",
      "So that the endpoint (the observed colour change) occurs as close as possible to the equivalence point",
      ["So that the indicator reacts with the acid and becomes part of the calculation",
       "So that the solution changes colour before any base is added",
       "So that the pH at the endpoint is always 7.00"],
      "The analyst can only see the endpoint. Matching the indicator's range to the equivalence pH keeps the visible endpoint within a drop of the true equivalence point, which keeps the titration accurate.",{});
  }
]));

E("u2-67-equivalence-ph",2,["6.7"],2,"gen",function(){
  var cases=[
    {desc:"acetic acid is titrated with sodium hydroxide",ans:"Above 7, because the acetate ion produced hydrolyzes to form OH\u207B",w:["Exactly 7, because all equivalence points are neutral","Below 7, because the sodium ion hydrolyzes to form H\u2083O\u207A","Above 7, because sodium hydroxide is still being added past the endpoint"]},
    {desc:"aqueous ammonia is titrated with hydrochloric acid",ans:"Below 7, because the ammonium ion produced hydrolyzes to form H\u2083O\u207A",w:["Exactly 7, because the acid and base have neutralized each other","Above 7, because ammonia is a base and bases dominate","Below 7, because the chloride ion hydrolyzes to form H\u2083O\u207A"]},
    {desc:"hydrochloric acid is titrated with sodium hydroxide",ans:"Equal to 7, because neither ion of the salt formed hydrolyzes",w:["Above 7, because the base was added from the burette","Below 7, because the acid was in the flask","Equal to 7, because the indicator forces the pH to 7"]}
  ];
  var c=pick(cases);
  var vol=pick([10.0,20.0,25.0,50.0]),conc=pick([0.0500,0.100,0.200,0.500]),tp=ri(18,30);
  return mcq("At "+tp+" \u00B0C, "+gF(vol)+" mL of a "+gF(conc)+" mol/L solution is titrated in a case where "+c.desc+". At the equivalence point, the pH is",
    c.ans,c.w,
    "At the equivalence point the original acid and base are gone; what remains is the salt, and the question is whether its ions hydrolyze. <b>"+c.ans+"</b>.",{});
});

E("u2-67-half-equivalence",2,["6.7"],3,"gen",function(){
  var acids=[
    {name:"acetic acid",ka:1.8e-5,pka:"4.74"},
    {name:"benzoic acid",ka:6.3e-5,pka:"4.20"},
    {name:"hydrofluoric acid",ka:3.5e-4,pka:"3.46"},
    {name:"carbonic acid",ka:4.3e-7,pka:"6.37"},
    {name:"hydrocyanic acid",ka:6.2e-10,pka:"9.21"}
  ];
  var a=pick(acids);
  var vol=pick([25.0,50.0]),conc=pick([0.0500,0.100,0.200]),base=pick(["sodium hydroxide","potassium hydroxide"]);
  return mcq("A "+gF(vol)+" mL sample of "+gF(conc)+" mol/L "+a.name+" is titrated with "+base+". Halfway to the equivalence point, the pH meter reads "+a.pka+". What is the Ka of the acid?",
    sciF(a.ka,2),
    [sciF(1.0e-14/a.ka,2),sciF(a.ka*10,2),sciF(a.ka/10,2)],
    "At the half-equivalence point, exactly half the acid has been converted, so [HA] = [A\u207B] and the equilibrium expression collapses to [H\u2083O\u207A] = Ka: the pH equals the pKa. Ka = 10^-pKa = 10^("+"-"+a.pka+") = <b>"+sciF(a.ka,2)+"</b>.",{});
});

/* ---------- 6.8 Titrations ---------- */

E("u2-68-titration-calc",2,["6.8"],2,"gen",function(){
  var pairs=[["hydrochloric acid","sodium hydroxide"],["nitric acid","potassium hydroxide"],["hydrochloric acid","potassium hydroxide"],["nitric acid","sodium hydroxide"]];
  var pr=pick(pairs);
  var ca=pick([0.100,0.125,0.200,0.250,0.500]),va=pick([10.0,15.0,20.0,25.0,30.0,40.0,50.0]),cb=pick([0.100,0.125,0.200,0.250,0.500]);
  var n=sfR(ca*va/1000,5);
  var vb=n/cb*1000;
  var ans=sfR(vb,3);
  return numq(gF(va)+" mL of "+gF(ca)+" mol/L "+pr[0]+" is titrated with "+gF(cb)+" mol/L "+pr[1]+" solution. Calculate the volume of base needed to reach the equivalence point. Give your answer in mL.",
    ans,Math.max(0.02*ans,0.05),
    "Moles of acid: n = C \u00D7 V = "+gF(ca)+" mol/L \u00D7 "+gF(va)+" mL / 1000 = "+iF(n)+" mol. The reaction is 1:1, so the moles of base needed equal "+iF(n)+" mol. Volume of base: V = n / C = "+iF(n)+" / "+gF(cb)+" = "+iF(vb/1000)+" L = <b>"+F3(ans)+" mL</b>.",{});
});

E("u2-68-titration-diprotic",2,["6.8"],3,"gen",function(){
  var mode=Math.random()<0.5;
  var acids=[["sulfuric acid","H\u2082SO\u2084"],["oxalic acid","H\u2082C\u2082O\u2084"]];
  var a=pick(acids);
  if(mode){
    var ca=pick([0.0500,0.100,0.125,0.200]),va=pick([10.0,20.0,25.0]),cb=pick([0.100,0.200,0.250]);
    var na=sfR(ca*va/1000,5),nb=sfR(2*na,5),vb=nb/cb*1000;
    var ans=sfR(vb,3);
    return numq(gF(va)+" mL of "+gF(ca)+" mol/L "+a[0]+" ("+a[1]+", a diprotic acid) is titrated with "+gF(cb)+" mol/L sodium hydroxide. Calculate the volume of base needed to reach the second equivalence point, where both protons have reacted. Give your answer in mL.",
      ans,Math.max(0.02*ans,0.05),
      "Moles of acid: n = "+gF(ca)+" mol/L \u00D7 "+gF(va)+" mL / 1000 = "+iF(na)+" mol. Each acid molecule reacts with two OH\u207B ions, so moles of base = 2 \u00D7 "+iF(na)+" = "+iF(nb)+" mol. Volume of base: V = "+iF(nb)+" / "+gF(cb)+" = "+iF(vb/1000)+" L = <b>"+F3(ans)+" mL</b>. Forgetting the 2:1 ratio is the classic error here.",{mode:"vol"});
  }
  var vb2=pick([18.0,22.5,24.0,30.0,36.0,40.0]),cb2=pick([0.100,0.125,0.200]),va2=pick([20.0,25.0]);
  var nb2=sfR(cb2*vb2/1000,5),na2=sfR(nb2/2,5),ca2=na2/(va2/1000);
  var ans2=sfR(ca2,3);
  return numq("A "+gF(va2)+" mL sample of "+a[0]+" ("+a[1]+", a diprotic acid) requires "+gF(vb2)+" mL of "+gF(cb2)+" mol/L sodium hydroxide to reach the second equivalence point. Calculate the concentration of the acid. Give your answer in mol/L.",
    ans2,Math.max(0.02*ans2,0.001),
    "Moles of base: n = "+gF(cb2)+" mol/L \u00D7 "+gF(vb2)+" mL / 1000 = "+iF(nb2)+" mol. The ratio is 2 mol OH\u207B to 1 mol acid, so moles of acid = "+iF(nb2)+" / 2 = "+iF(na2)+" mol. Concentration: C = "+iF(na2)+" / ("+gF(va2)+" / 1000) L = "+iF(ca2)+" mol/L. The concentration is <b>"+F3(ans2)+" mol/L</b>.",{mode:"conc"});
});

E("u2-68-technique",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Before a titration, the burette is rinsed with the solution it will contain, but the conical flask is only rinsed with distilled water. Why is this correct technique?",
      "Solution left in the burette would dilute the titrant and change its concentration; water left in the flask does not change the moles of analyte already measured into it",
      ["The flask must be kept dry because water reacts with acids",
       "Rinsing the burette is only done to clean off dust",
       "The flask is rinsed with water so the indicator will work"],
      "What matters in the burette is the concentration delivered, so it must not be diluted. What matters in the flask is the moles of the sample, which were measured by pipette; extra rinse water changes the volume but not the moles, so the titration result is unaffected.",{});
  },
  function(){
    return mcq("Titration volumes are usually reported to the nearest 0.05 mL or 0.1 mL because",
      "A burette is graduated in 0.1 mL divisions and can be read to about half a division",
      ["Burettes are not very accurate instruments",
       "Volumes in titrations do not need to be measured carefully",
       "The pH meter limits the precision of the volume"],
      "Precision follows the instrument. A standard burette has 0.1 mL graduations, and a careful reader estimates between them, giving readings to about 0.05 mL.",{});
  },
  function(){
    return mcq("Near the endpoint of a titration, the titrant should be added drop by drop, and the flask swirled, mainly because",
      "A single extra drop can carry the solution past the equivalence point, which would make the measured volume too large",
      ["Drops added quickly do not react with the solution",
       "Swirling changes the concentration of the titrant",
       "The indicator only works when the solution is moving"],
      "Close to equivalence the pH changes extremely steeply with volume. Adding titrant a drop at a time, with swirling to mix, lets the analyst stop the endpoint within one drop of the equivalence point.",{});
  },
  function(){
    return mcq("A pipette is used to transfer the acid sample into the flask rather than a graduated cylinder because",
      "A pipette delivers its stated volume much more precisely and accurately than a graduated cylinder",
      ["A graduated cylinder cannot hold acids",
       "A pipette is faster to fill",
       "The cylinder would change the concentration of the acid"],
      "Volumetric glassware is built for accuracy: a pipette delivers 25.00 mL with an uncertainty in the second decimal place, while a graduated cylinder is a rough measuring tool with an uncertainty about ten times larger.",{});
  }
]));

E("u2-68-curve-equivalence",2,["6.8"],2,"gen",function(){
  var weak=Math.random()<0.5;
  var vol=pick([15.0,20.0,25.0,40.0,50.0]),conc=pick([0.0500,0.100,0.200,0.250]);
  if(weak){
    var acid=pick(["acetic acid","benzoic acid","hydrofluoric acid"]);
    var q=mcq("A titration curve for "+gF(vol)+" mL of "+gF(conc)+" mol/L "+acid+" titrated with sodium hydroxide shows a pH of about 9 at the equivalence point, not 7. The reason is",
      "At the equivalence point the solution contains the conjugate base of the weak acid, which hydrolyzes to produce OH\u207B",
      ["Sodium hydroxide is stronger than the acid is weak, so some remains unreacted",
       "The pH meter always reads high at the equivalence point",
       "The indicator shifted the pH of the solution"],
      "At equivalence, all the weak acid has become its conjugate base. That ion hydrolyzes in water, accepting protons and leaving OH\u207B behind, so the solution is basic. <b>The conjugate base hydrolyzes to produce OH\u207B</b>.",{});
    q.figure=c32titrSVG("rising","Volume of sodium hydroxide added (mL)");
    return q;
  }
  var base=pick(["ammonia","methylamine"]);
  var q=mcq("A titration curve for "+gF(vol)+" mL of "+gF(conc)+" mol/L "+base+" solution titrated with hydrochloric acid shows a pH of about 5 at the equivalence point, not 7. The reason is",
    "At the equivalence point the solution contains the conjugate acid of the weak base, which hydrolyzes to produce H\u2083O\u207A",
    ["Hydrochloric acid is stronger than the base is weak, so some remains unreacted",
     "The chloride ion hydrolyzes to produce H\u2083O\u207A",
     "The pH meter always reads low at the equivalence point"],
    "At equivalence, all the weak base has become its conjugate acid. That ion donates a proton to water, producing H\u2083O\u207A, so the solution is acidic. <b>The conjugate acid hydrolyzes to produce H\u2083O\u207A</b>.",{});
  q.figure=c32titrSVG("falling","Volume of hydrochloric acid added (mL)");
  return q;
});

E("u2-68-standard-solution",2,["6.8"],1,"var",varset([
  function(){
    return mcq("In titration work, a standard solution is",
      "A solution whose concentration is known accurately",
      ["A solution that is always exactly 1.00 mol/L",
       "A solution made from distilled water only",
       "A solution that never reacts with indicators"],
      "Standard means known: a standard solution has an accurately known concentration, which is what makes the titration calculation possible.",{});
  },
  function(){
    return mcq("A sodium hydroxide solution is standardized by titrating it against a known mass of a primary standard acid. Standardizing is necessary because",
      "The concentration of the sodium hydroxide solution is not accurately known until it is measured against a known quantity",
      ["Sodium hydroxide solutions are always exactly 0.100 mol/L",
       "Standardizing removes the water from the solution",
       "Indicators do not work in unstandardized solutions"],
      "Sodium hydroxide absorbs water and carbon dioxide from the air, so a weighed mass does not give an accurate concentration. Titrating against a primary standard measures the true concentration.",{});
  },
  function(){
    return mcq("Which property makes a substance suitable as a primary standard?",
      "It is available pure, is stable in air, and dissolves completely and predictably",
      ["It has a bright colour so the endpoint is easy to see",
       "It is the cheapest chemical in the stockroom",
       "It reacts with every other substance"],
      "A primary standard anchors the whole measurement: it must be pure, stable while it is weighed, and react in a known ratio, so that its amount is known exactly.",{});
  }
]));
