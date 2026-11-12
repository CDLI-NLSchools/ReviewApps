// Chemistry 3202 Unit 4 Electrochemistry question bank
// Phase C diagram figures (Nov 2026): the 8.4 cell entries and the molten
// electrolysis entry now draw standard cell diagrams. Where an entry asks
// which part is which, electrodes are labelled only with the metals and
// ions the stem itself names (or generic labels), never with anode or
// cathode, and no electron flow arrows are shown. Helpers in bank-u1.js.
// CRMARKS: u4-83-balance-acidic=5
// CRMARKS: u4-83-half-reaction-write=3
// CRMARKS: u4-83-net-reaction=4
// CRMARKS: u4-84-build-cell=4
// CRMARKS: u4-84-label-scenario=2
// CRMARKS: u4-86-predict-spontaneous=3
// CRMARKS: u4-87-cell-voltage=4
// CRMARKS: u4-87-find-e-half=3
// CRMARKS: u4-88-faraday-mass=4
// CRMARKS: u4-88-faraday-time=4

/* Standard reduction couples (metal systems), matching the Reference
   Information panel. e is E\u00B0 in volts for ion + electrons \u2192 metal. */
var ECOUPLES=[
  {ion:"Ag\u207A",metal:"Ag",z:1,e:0.80},
  {ion:"Cu\u00B2\u207A",metal:"Cu",z:2,e:0.34},
  {ion:"Pb\u00B2\u207A",metal:"Pb",z:2,e:-0.13},
  {ion:"Ni\u00B2\u207A",metal:"Ni",z:2,e:-0.25},
  {ion:"Fe\u00B2\u207A",metal:"Fe",z:2,e:-0.44},
  {ion:"Zn\u00B2\u207A",metal:"Zn",z:2,e:-0.76},
  {ion:"Al\u00B3\u207A",metal:"Al",z:3,e:-1.66},
  {ion:"Mg\u00B2\u207A",metal:"Mg",z:2,e:-2.37}
];
function eF(x){return (x>0?"+":"")+fmtF(x,2);}

/* ---------- 8.1 Oxidation and reduction ---------- */

var ONCASES=[
    {q:"the oxidation number of Mn in KMnO\u2084",setup:"K is +1 and each O is -2. +1 + Mn + 4(-2) = 0, so Mn = +7",a:"+7",w:["+2","+5","+6"]},
    {q:"the oxidation number of Cr in K\u2082Cr\u2082O\u2087",setup:"Each K is +1 and each O is -2. 2(+1) + 2Cr + 7(-2) = 0, so 2Cr = +12 and Cr = +6",a:"+6",w:["+3","+7","+12"]},
    {q:"the oxidation number of S in H\u2082SO\u2084",setup:"Each H is +1 and each O is -2. 2(+1) + S + 4(-2) = 0, so S = +6",a:"+6",w:["+4","+2","-2"]},
    {q:"the oxidation number of N in NH\u2084\u207A",setup:"Each H is +1 and the ion's charge is +1. N + 4(+1) = +1, so N = -3",a:"-3",w:["+3","-1","+5"]},
    {q:"the oxidation number of N in NO\u2083\u207B",setup:"Each O is -2 and the ion's charge is -1. N + 3(-2) = -1, so N = +5",a:"+5",w:["+3","-3","+1"]},
    {q:"the oxidation number of Cl in HClO",setup:"H is +1 and O is -2. +1 + Cl - 2 = 0, so Cl = +1",a:"+1",w:["-1","+3","+5"]},
    {q:"the oxidation number of Fe in Fe\u2082O\u2083",setup:"Each O is -2. 2Fe + 3(-2) = 0, so Fe = +3",a:"+3",w:["+2","-3","+6"]},
    {q:"the oxidation number of C in CO\u2082",setup:"Each O is -2. C + 2(-2) = 0, so C = +4",a:"+4",w:["+2","-4","0"]},
    {q:"the oxidation number of P in H\u2083PO\u2084",setup:"Each H is +1 and each O is -2. 3(+1) + P + 4(-2) = 0, so P = +5",a:"+5",w:["+3","-3","+1"]},
    {q:"the oxidation number of S in SO\u2083\u00B2\u207B",setup:"Each O is -2 and the ion's charge is -2. S + 3(-2) = -2, so S = +4",a:"+4",w:["+6","+2","-2"]},
    {q:"the oxidation number of Mn in MnO\u2082",setup:"Each O is -2. Mn + 2(-2) = 0, so Mn = +4",a:"+4",w:["+2","+7","-4"]},
    {q:"the oxidation number of Br in HBrO\u2083",setup:"H is +1 and each O is -2. +1 + Br + 3(-2) = 0, so Br = +5",a:"+5",w:["+3","+1","-1"]},
    {q:"the oxidation number of N in N\u2082O",setup:"O is -2. 2N - 2 = 0, so each N = +1",a:"+1",w:["+2","-1","+3"]},
    {q:"the oxidation number of Cr in Cr\u2082O\u2083",setup:"Each O is -2. 2Cr + 3(-2) = 0, so Cr = +3",a:"+3",w:["+6","+2","-3"]},
    {q:"the oxidation number of Cu in CuSO\u2084",setup:"The sulfate ion is -2 overall, so Cu balances it at +2",a:"+2",w:["+1","0","+4"]},
    {q:"the oxidation number of O in H\u2082O\u2082 (hydrogen peroxide)",setup:"Peroxides are the exception: O is -1 here (each H is +1 and 2(+1) + 2O = 0)",a:"-1",w:["-2","0","+1"]}
];
E("u4-81-oxidation-number",4,["8.1"],1,"var",varset(ONCASES.map(function(c){
  return function(){
    return mcq("Determine "+c.q+":",
      c.a,c.w,
      c.setup+". The oxidation number is <b>"+c.a+"</b>.",{});
  };
})));

E("u4-81-rules",4,["8.1"],1,"var",varset([
  function(){
    return mcq("The oxidation number of a free, uncombined element (such as Zn(s) or Cl\u2082(g)) is",
      "0",
      ["+1","-1","Equal to its group number in every case"],
      "By definition, atoms in an uncombined element have oxidation number 0: no electron transfer has occurred.",{});
  },
  function(){
    return mcq("In most of its compounds, oxygen has an oxidation number of -2. A common exception is",
      "Peroxides, such as H\u2082O\u2082, where oxygen is -1",
      ["Carbon dioxide, where oxygen is 0",
       "Water, where oxygen is +2",
       "Metal oxides, where oxygen is +1"],
      "In peroxides the O-O bond changes the assignment: each oxygen is -1. In ordinary oxides, water and carbon dioxide, oxygen stays at -2.",{});
  },
  function(){
    return mcq("The sum of the oxidation numbers in a neutral compound is",
      "Zero, always",
      ["Equal to the number of atoms in the formula",
       "Equal to the charge on the most electronegative atom",
       "Positive, because compounds are stable"],
      "Oxidation numbers are bookkeeping for electrons: in a neutral species the gains and losses balance exactly, so the sum is zero. In an ion, the sum equals the ion's charge.",{});
  },
  function(){
    return mcq("Hydrogen has an oxidation number of +1 in most compounds. In a metal hydride such as NaH, hydrogen is",
      "-1, because it takes an electron from the metal",
      ["+1, with no exceptions anywhere",
       "0, because hydrides are elements",
       "+2, because it bonds to a metal"],
      "With a less electronegative partner (a metal), hydrogen gains the electron and is assigned -1. The +1 rule applies when hydrogen is bonded to nonmetals.",{});
  }
]));

E("u4-81-identify-redox",4,["8.1"],2,"gen",function(){
  var rxns=[
    {eq:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",ox:"Zn",red:"Cu\u00B2\u207A",pool:["Zn","Cu\u00B2\u207A","Zn\u00B2\u207A","Cu"]},
    {eq:"Mg(s) + 2 H\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + H\u2082(g)",ox:"Mg",red:"H\u207A",pool:["Mg","H\u207A","Mg\u00B2\u207A","H\u2082"]},
    {eq:"2 Fe\u00B2\u207A(aq) + Cl\u2082(g) \u2192 2 Fe\u00B3\u207A(aq) + 2 Cl\u207B(aq)",ox:"Fe\u00B2\u207A",red:"Cl\u2082",pool:["Fe\u00B2\u207A","Cl\u2082","Fe\u00B3\u207A","Cl\u207B"]},
    {eq:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",ox:"Cu",red:"Ag\u207A",pool:["Cu","Ag\u207A","Cu\u00B2\u207A","Ag"]},
    {eq:"Fe\u2082O\u2083(s) + 3 CO(g) \u2192 2 Fe(s) + 3 CO\u2082(g)",ox:"CO",red:"Fe\u2082O\u2083",pool:["CO","Fe\u2082O\u2083","Fe","CO\u2082"]},
    {eq:"CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)",ox:"CH\u2084",red:"O\u2082",pool:["CH\u2084","O\u2082","CO\u2082","H\u2082O"]}
  ];
  var r=pick(rxns);
  var ask=pick(["oxidized","reduced","oxidizing","reducing"]);
  var t=ri(15,35),vol=pick([100,250,500]);
  var ans,explain;
  if(ask==="oxidized"){ ans=r.ox; explain="Oxidation is loss of electrons (an increase in oxidation number)."; }
  if(ask==="reduced"){ ans=r.red; explain="Reduction is gain of electrons (a decrease in oxidation number)."; }
  if(ask==="oxidizing"){ ans=r.red; explain="The oxidizing agent is the species that gets reduced: it takes electrons from the other reactant."; }
  if(ask==="reducing"){ ans=r.ox; explain="The reducing agent is the species that gets oxidized: it gives electrons to the other reactant."; }
  var ds=r.pool.filter(function(x){return x!==ans;});
  var askText={"oxidized":"which species is oxidized","reduced":"which species is reduced","oxidizing":"which species is the oxidizing agent","reducing":"which species is the reducing agent"}[ask];
  return mcq("In the reaction "+r.eq+" (carried out at "+t+" \u00B0C, in "+vol+" mL of solution where a solution is involved), "+askText+"?",
    ans,ds,
    explain+" Tracking the electrons and oxidation numbers in this reaction gives <b>"+ans+"</b>.",{ask:ask});
});

E("u4-81-not-redox",4,["8.1"],2,"gen",function(){
  var sets=[
    {nr:"AgNO\u2083(aq) + NaCl(aq) \u2192 AgCl(s) + NaNO\u2083(aq)",r:["Zn(s) + CuSO\u2084(aq) \u2192 ZnSO\u2084(aq) + Cu(s)","Mg(s) + 2 HCl(aq) \u2192 MgCl\u2082(aq) + H\u2082(g)","C(s) + O\u2082(g) \u2192 CO\u2082(g)"]},
    {nr:"HCl(aq) + NaOH(aq) \u2192 NaCl(aq) + H\u2082O(l)",r:["2 Mg(s) + O\u2082(g) \u2192 2 MgO(s)","Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)","2 H\u2082O\u2082(aq) \u2192 2 H\u2082O(l) + O\u2082(g)"]},
    {nr:"CaCO\u2083(s) \u2192 CaO(s) + CO\u2082(g)",r:["CuO(s) + H\u2082(g) \u2192 Cu(s) + H\u2082O(g)","Cl\u2082(g) + 2 Br\u207B(aq) \u2192 2 Cl\u207B(aq) + Br\u2082(aq)","CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)"]},
    {nr:"BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2192 BaSO\u2084(s) + 2 NaCl(aq)",r:["Zn(s) + 2 H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)","2 Na(s) + Cl\u2082(g) \u2192 2 NaCl(s)","Sn(s) + 2 Ag\u207A(aq) \u2192 Sn\u00B2\u207A(aq) + 2 Ag(s)"]}
  ];
  var s=pick(sets);
  var t=ri(15,95);
  return mcq("At "+t+" \u00B0C, which of the following reactions is NOT a redox reaction?",
    s.nr,s.r,
    "A redox reaction has changes in oxidation numbers. In the correct answer, every element keeps the same oxidation number from reactants to products: it is an exchange (or simple decomposition) with no electron transfer. <b>The reaction that is NOT redox here</b>: "+s.nr+".",{});
});

E("u4-81-definition",4,["8.1"],1,"var",varset([
  function(){
    return mcq("Oxidation is best defined as",
      "The loss of electrons by a species, shown by an increase in its oxidation number",
      ["The gain of electrons by a species",
       "Any reaction with oxygen gas",
       "The loss of oxygen by a species in every case"],
      "The modern definition is electron transfer: oxidation is loss of electrons, and the oxidation number rises. Reduction is the matching gain of electrons.",{});
  },
  function(){
    return mcq("A species that is reduced in a reaction",
      "Gains electrons, and its oxidation number decreases",
      ["Loses electrons, and its oxidation number increases",
       "Gains oxygen atoms in every case",
       "Is always a metal"],
      "Reduction is gain of electrons. With more electrons counted on the species, its oxidation number goes down, which is why it is called a reduction.",{});
  },
  function(){
    return mcq("The phrases OIL RIG and LEO the lion summarize redox by stating that",
      "Oxidation Is Loss (of electrons) and Reduction Is Gain; Loss of Electrons is Oxidation",
      ["Oxidation Involves Light and Reduction Involves Gas",
       "Oxygen Is Lost in every Reduction In General",
       "Oxidation Is Limited to Reactions Involving Gases"],
      "OIL RIG: Oxidation Is Loss, Reduction Is Gain (of electrons). LEO: Loss of Electrons = Oxidation. Both mnemonics track the electrons, which is the reliable definition.",{});
  }
]));

/* ---------- 8.2 Half-reactions ---------- */

E("u4-82-concept",4,["8.2"],1,"var",varset([
  function(){
    return mcq("A half-reaction is",
      "An equation that shows only the oxidation or only the reduction part of a redox reaction, with the electrons written explicitly",
      ["An equation for a reaction that only goes halfway to completion",
       "The first half of any chemical equation",
       "An equation written with half-size coefficients"],
      "Splitting a redox reaction into its oxidation and reduction half-reactions shows exactly where the electrons leave and arrive. Each half-reaction must balance in both atoms and charge.",{});
  },
  function(){
    return mcq("In an oxidation half-reaction, the electrons appear",
      "As products, on the right side of the equation",
      ["As reactants, on the left side of the equation",
       "On both sides, cancelling out",
       "Nowhere: electrons are only in reduction half-reactions"],
      "Oxidation is loss of electrons, so the species gives electrons away: they are written as products. Reduction half-reactions show them as reactants.",{});
  },
  function(){
    return mcq("When the oxidation and reduction half-reactions are combined into the overall redox equation, the electrons",
      "Cancel completely, because the electrons lost in oxidation equal the electrons gained in reduction",
      ["Appear as a product, since some are always left over",
       "Are doubled, because both half-reactions contain them",
       "Determine the states of the products"],
      "Electrons are transferred, not created: the number given up must equal the number taken. Half-reactions are scaled so the electron counts match, and then the electrons cancel from the overall equation.",{});
  }
]));

E("u4-82-split-equation",4,["8.2"],2,"gen",function(){
  var rxns=[
    {full:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",ox:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Zn(s) + 2 e\u207B \u2192 Zn\u00B2\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"},
    {full:"Mg(s) + 2 H\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + H\u2082(g)",ox:"Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B",red:"2 H\u207A(aq) + 2 e\u207B \u2192 H\u2082(g)",wox:"Mg(s) + 2 e\u207B \u2192 Mg\u00B2\u207A(aq)",wred:"2 H\u207A(aq) \u2192 H\u2082(g) + 2 e\u207B"},
    {full:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",ox:"Cu(s) \u2192 Cu\u00B2\u207A(aq) + 2 e\u207B",red:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)",wox:"Cu(s) + 2 e\u207B \u2192 Cu\u00B2\u207A(aq)",wred:"Ag\u207A(aq) \u2192 Ag(s) + e\u207B"},
    {full:"Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)",ox:"Fe(s) \u2192 Fe\u00B2\u207A(aq) + 2 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Fe(s) + 2 e\u207B \u2192 Fe\u00B2\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"},
    {full:"2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B3\u207A(aq) + 3 Cu(s)",ox:"Al(s) \u2192 Al\u00B3\u207A(aq) + 3 e\u207B",red:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)",wox:"Al(s) + 3 e\u207B \u2192 Al\u00B3\u207A(aq)",wred:"Cu\u00B2\u207A(aq) \u2192 Cu(s) + 2 e\u207B"}
  ];
  var r=pick(rxns);
  var oxAsk=Math.random()<0.5;
  var vol=pick([50,100,200,250,500]),t=ri(15,35);
  var correct=oxAsk?r.ox:r.red;
  var wrong=oxAsk?r.wox:r.wred;
  var other=oxAsk?r.red:r.ox;
  return mcq("For the redox reaction "+r.full+" (in a "+vol+" mL vessel at "+t+" \u00B0C), which equation is the "+(oxAsk?"oxidation":"reduction")+" half-reaction?",
    correct,[wrong,other,"The complete reaction with electrons added to both sides"],
    "Oxidation half-reactions have electrons as products; reduction half-reactions have them as reactants. Here the "+(oxAsk?"oxidation":"reduction")+" half-reaction is <b>"+correct+"</b>.",{});
});

var ECCASES=[
    {half:"Fe\u00B2\u207A + 2 e\u207B \u2192 Fe",e:2,sub:"Fe\u00B2\u207A"},
    {half:"Al \u2192 Al\u00B3\u207A + 3 e\u207B",e:3,sub:"Al"},
    {half:"2 Cl\u207B \u2192 Cl\u2082 + 2 e\u207B",e:2,sub:"Cl\u207B (per Cl\u2082 formed)"},
    {half:"MnO\u2084\u207B + 8 H\u207A + 5 e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O",e:5,sub:"MnO\u2084\u207B"},
    {half:"Cu\u00B2\u207A + 2 e\u207B \u2192 Cu",e:2,sub:"Cu\u00B2\u207A"},
    {half:"Mg \u2192 Mg\u00B2\u207A + 2 e\u207B",e:2,sub:"Mg"},
    {half:"Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6 e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O",e:6,sub:"Cr\u2082O\u2087\u00B2\u207B"},
    {half:"O\u2082 + 4 H\u207A + 4 e\u207B \u2192 2 H\u2082O",e:4,sub:"O\u2082"}
];
E("u4-82-electron-count",4,["8.2"],2,"var",varset(ECCASES.map(function(c){
  return function(){
    var cands=[Math.max(1,c.e-1),c.e+1,c.e+2,c.e*2,Math.round(c.e*1.5),c.e+3].filter(function(x,i,arr){return x!==c.e&&x>0&&arr.indexOf(x)===i;});
    var ds=cands.slice(0,3);
    return mcq("In the half-reaction "+c.half+", the number of electrons transferred per "+c.sub+" is",
      c.e+(c.e===1?" electron":" electrons"),
      ds.map(function(x){return x+(x===1?" electron":" electrons");}),
      "The electrons appear explicitly in the balanced half-reaction: <b>"+c.e+" electrons</b> for "+c.sub+".",{});
  };
})));

/* ---------- 8.3 Balancing redox equations ---------- */

var HALFWRITE=[
  {ask:"the oxidation half-reaction when zinc metal reacts to form zinc ions",ctx:"Zn(s) \u2192 Zn\u00B2\u207A(aq)",
   ans:["Zn \u2192 Zn\u00B2\u207A + 2 e\u207B","Zn -> Zn2+ + 2 e-","Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B","Zn(s) -> Zn2+(aq) + 2 e-","Zn \u2192 Zn\u00B2\u207A + 2e\u207B","Zn -> Zn2+ + 2e-"],
   show:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B"},
  {ask:"the reduction half-reaction when copper(II) ions plate out as copper metal",ctx:"Cu\u00B2\u207A(aq) \u2192 Cu(s)",
   ans:["Cu\u00B2\u207A + 2 e\u207B \u2192 Cu","Cu2+ + 2 e- -> Cu","Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)","Cu2+(aq) + 2 e- -> Cu(s)","Cu\u00B2\u207A + 2e\u207B \u2192 Cu","Cu2+ + 2e- -> Cu"],
   show:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s)"},
  {ask:"the oxidation half-reaction when chloride ions form chlorine gas",ctx:"Cl\u207B(aq) \u2192 Cl\u2082(g)",
   ans:["2 Cl\u207B \u2192 Cl\u2082 + 2 e\u207B","2 Cl- -> Cl2 + 2 e-","2 Cl\u207B(aq) \u2192 Cl\u2082(g) + 2 e\u207B","2 Cl-(aq) -> Cl2(g) + 2 e-","2 Cl\u207B \u2192 Cl\u2082 + 2e\u207B","2 Cl- -> Cl2 + 2e-"],
   show:"2 Cl\u207B(aq) \u2192 Cl\u2082(g) + 2 e\u207B"},
  {ask:"the oxidation half-reaction when iron(II) ions are converted to iron(III) ions",ctx:"Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq)",
   ans:["Fe\u00B2\u207A \u2192 Fe\u00B3\u207A + e\u207B","Fe2+ -> Fe3+ + e-","Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + e\u207B","Fe2+(aq) -> Fe3+(aq) + e-","Fe\u00B2\u207A \u2192 Fe\u00B3\u207A + 1 e\u207B","Fe2+ -> Fe3+ + 1 e-"],
   show:"Fe\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + e\u207B"},
  {ask:"the reduction half-reaction when silver ions plate out as silver metal",ctx:"Ag\u207A(aq) \u2192 Ag(s)",
   ans:["Ag\u207A + e\u207B \u2192 Ag","Ag+ + e- -> Ag","Ag\u207A(aq) + e\u207B \u2192 Ag(s)","Ag+(aq) + e- -> Ag(s)","Ag\u207A + 1 e\u207B \u2192 Ag","Ag+ + 1 e- -> Ag"],
   show:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)"},
  {ask:"the oxidation half-reaction when magnesium metal reacts to form magnesium ions",ctx:"Mg(s) \u2192 Mg\u00B2\u207A(aq)",
   ans:["Mg \u2192 Mg\u00B2\u207A + 2 e\u207B","Mg -> Mg2+ + 2 e-","Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B","Mg(s) -> Mg2+(aq) + 2 e-","Mg \u2192 Mg\u00B2\u207A + 2e\u207B","Mg -> Mg2+ + 2e-"],
   show:"Mg(s) \u2192 Mg\u00B2\u207A(aq) + 2 e\u207B"}
];
E("u4-83-half-reaction-write",4,["8.3"],2,"var",varset(HALFWRITE.map(function(c){return function(){
  return textq("Write "+c.ask+": "+c.ctx+". Type the half-reaction using \u2192 or -> and e\u207B or e- for electrons.",
    c.ans,
    "Balance the atoms first, then add electrons to the correct side to balance the charge: electrons are products in oxidation and reactants in reduction. The half-reaction is <b>"+c.show+"</b>.",{});
};})));

var BALACID=[
  {skel:"MnO\u2084\u207B(aq) \u2192 Mn\u00B2\u207A(aq)",
   ans:["MnO\u2084\u207B + 8 H\u207A + 5 e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O","MnO4- + 8 H+ + 5 e- -> Mn2+ + 4 H2O","MnO\u2084\u207B(aq) + 8 H\u207A(aq) + 5 e\u207B \u2192 Mn\u00B2\u207A(aq) + 4 H\u2082O(l)","MnO4-(aq) + 8 H+(aq) + 5 e- -> Mn2+(aq) + 4 H2O(l)","MnO\u2084\u207B + 8 H\u207A + 5e\u207B \u2192 Mn\u00B2\u207A + 4 H\u2082O","MnO4- + 8 H+ + 5e- -> Mn2+ + 4 H2O"],
   show:"MnO\u2084\u207B(aq) + 8 H\u207A(aq) + 5 e\u207B \u2192 Mn\u00B2\u207A(aq) + 4 H\u2082O(l)",steps:"Balance O with 4 H\u2082O on the right, then H with 8 H\u207A on the left, then charge: the left totals +7 before electrons and the right is +2, so 5 e\u207B are added to the left."},
  {skel:"Cr\u2082O\u2087\u00B2\u207B(aq) \u2192 Cr\u00B3\u207A(aq)",
   ans:["Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6 e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O","Cr2O7^2- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O","Cr\u2082O\u2087\u00B2\u207B(aq) + 14 H\u207A(aq) + 6 e\u207B \u2192 2 Cr\u00B3\u207A(aq) + 7 H\u2082O(l)","Cr2O72- + 14 H+ + 6 e- -> 2 Cr3+ + 7 H2O","Cr\u2082O\u2087\u00B2\u207B + 14 H\u207A + 6e\u207B \u2192 2 Cr\u00B3\u207A + 7 H\u2082O","Cr2O7^2- + 14 H+ + 6e- -> 2 Cr3+ + 7 H2O"],
   show:"Cr\u2082O\u2087\u00B2\u207B(aq) + 14 H\u207A(aq) + 6 e\u207B \u2192 2 Cr\u00B3\u207A(aq) + 7 H\u2082O(l)",steps:"Balance Cr (2 on the right), then O with 7 H\u2082O, then H with 14 H\u207A, then charge: left is +12 before electrons and right is +6, so 6 e\u207B go on the left."},
  {skel:"NO\u2083\u207B(aq) \u2192 NO(g)",
   ans:["NO\u2083\u207B + 4 H\u207A + 3 e\u207B \u2192 NO + 2 H\u2082O","NO3- + 4 H+ + 3 e- -> NO + 2 H2O","NO\u2083\u207B(aq) + 4 H\u207A(aq) + 3 e\u207B \u2192 NO(g) + 2 H\u2082O(l)","NO3-(aq) + 4 H+(aq) + 3 e- -> NO(g) + 2 H2O(l)","NO\u2083\u207B + 4 H\u207A + 3e\u207B \u2192 NO + 2 H\u2082O","NO3- + 4 H+ + 3e- -> NO + 2 H2O"],
   show:"NO\u2083\u207B(aq) + 4 H\u207A(aq) + 3 e\u207B \u2192 NO(g) + 2 H\u2082O(l)",steps:"Balance O with 2 H\u2082O on the right, then H with 4 H\u207A on the left, then charge: left is +3 before electrons and right is 0, so 3 e\u207B go on the left."},
  {skel:"ClO\u207B(aq) \u2192 Cl\u207B(aq)",
   ans:["ClO\u207B + 2 H\u207A + 2 e\u207B \u2192 Cl\u207B + H\u2082O","ClO- + 2 H+ + 2 e- -> Cl- + H2O","ClO\u207B(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 Cl\u207B(aq) + H\u2082O(l)","ClO-(aq) + 2 H+(aq) + 2 e- -> Cl-(aq) + H2O(l)","ClO\u207B + 2 H\u207A + 2e\u207B \u2192 Cl\u207B + H\u2082O","ClO- + 2 H+ + 2e- -> Cl- + H2O"],
   show:"ClO\u207B(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 Cl\u207B(aq) + H\u2082O(l)",steps:"Balance O with 1 H\u2082O on the right, then H with 2 H\u207A on the left, then charge: left is +1 before electrons and right is -1, so 2 e\u207B go on the left."},
  {skel:"H\u2082O\u2082(aq) \u2192 H\u2082O(l)",
   ans:["H\u2082O\u2082 + 2 H\u207A + 2 e\u207B \u2192 2 H\u2082O","H2O2 + 2 H+ + 2 e- -> 2 H2O","H\u2082O\u2082(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 2 H\u2082O(l)","H2O2(aq) + 2 H+(aq) + 2 e- -> 2 H2O(l)","H\u2082O\u2082 + 2 H\u207A + 2e\u207B \u2192 2 H\u2082O","H2O2 + 2 H+ + 2e- -> 2 H2O"],
   show:"H\u2082O\u2082(aq) + 2 H\u207A(aq) + 2 e\u207B \u2192 2 H\u2082O(l)",steps:"Balance O by writing 2 H\u2082O on the right, then H with 2 H\u207A on the left, then charge: left is +2 before electrons and right is 0, so 2 e\u207B go on the left."}
];
E("u4-83-balance-acidic",4,["8.3"],3,"var",varset(BALACID.map(function(c){return function(){
  return textq("Balance this half-reaction in acidic solution: "+c.skel+". Type the balanced half-reaction using \u2192 or -> and e\u207B or e- for electrons.",
    c.ans,
    "Work in order: balance atoms other than O and H, balance O with H\u2082O, balance H with H\u207A, then balance charge with electrons. "+c.steps+" The balanced half-reaction is <b>"+c.show+"</b>.",{});
};})));

E("u4-83-net-reaction",4,["8.3"],3,"gen",function(){
  var cells=[
    {desc:"zinc metal with copper(II) ions",eq:"Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s)",E:"1.10",w:["Zn(s) + Cu\u00B2\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + Cu(s) + 2 e\u207B","Cu(s) + Zn\u00B2\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Zn(s)","2 Zn(s) + Cu\u00B2\u207A(aq) \u2192 2 Zn\u00B2\u207A(aq) + Cu(s)"]},
    {desc:"magnesium metal with silver ions",eq:"Mg(s) + 2 Ag\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + 2 Ag(s)",E:"3.17",w:["Mg(s) + Ag\u207A(aq) \u2192 Mg\u00B2\u207A(aq) + Ag(s)","Mg(s) + 2 Ag\u207A(aq) \u2192 Mg\u207A(aq) + 2 Ag(s)","2 Ag(s) + Mg\u00B2\u207A(aq) \u2192 2 Ag\u207A(aq) + Mg(s)"]},
    {desc:"iron metal with copper(II) ions",eq:"Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B2\u207A(aq) + Cu(s)",E:"0.78",w:["Fe(s) + Cu\u00B2\u207A(aq) \u2192 Fe\u00B3\u207A(aq) + Cu(s)","Cu(s) + Fe\u00B2\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Fe(s)","2 Fe(s) + Cu\u00B2\u207A(aq) \u2192 2 Fe\u00B2\u207A(aq) + Cu(s)"]},
    {desc:"zinc metal with hydrogen ions (an acid)",eq:"Zn(s) + 2 H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)",E:"0.76",w:["Zn(s) + H\u207A(aq) \u2192 Zn\u00B2\u207A(aq) + H\u2082(g)","Zn\u00B2\u207A(aq) + H\u2082(g) \u2192 Zn(s) + 2 H\u207A(aq)","2 Zn(s) + 2 H\u207A(aq) \u2192 2 Zn\u00B2\u207A(aq) + H\u2082(g)"]},
    {desc:"copper metal with silver ions",eq:"Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + 2 Ag(s)",E:"0.46",w:["Cu(s) + Ag\u207A(aq) \u2192 Cu\u00B2\u207A(aq) + Ag(s)","Cu(s) + 2 Ag\u207A(aq) \u2192 Cu\u207A(aq) + 2 Ag(s)","2 Ag(s) + Cu\u00B2\u207A(aq) \u2192 2 Ag\u207A(aq) + Cu(s)"]},
    {desc:"aluminium metal with copper(II) ions",eq:"2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B3\u207A(aq) + 3 Cu(s)",E:"2.00",w:["Al(s) + Cu\u00B2\u207A(aq) \u2192 Al\u00B3\u207A(aq) + Cu(s)","2 Al(s) + 3 Cu\u00B2\u207A(aq) \u2192 2 Al\u00B2\u207A(aq) + 3 Cu(s)","3 Cu(s) + 2 Al\u00B3\u207A(aq) \u2192 3 Cu\u00B2\u207A(aq) + 2 Al(s)"]}
  ];
  var c=pick(cells);
  var ctx=pick(["in a galvanic cell at 25 \u00B0C","in a beaker, as a displacement reaction","in an electrochemical cell with 1.00 mol/L solutions","in a galvanic cell demonstrated to a class","as a single-replacement reaction in a test tube","in a two-beaker cell joined by a salt bridge","in a galvanic cell powering a small motor","as a displacement reaction observed in the lab","in a cell built for a science fair demonstration"]);
  var withE=Math.random()<0.5;
  if(withE){
    return mcq("A cell is built from "+c.desc+" "+ctx+". Which overall equation and standard cell potential are correct?",
      c.eq+", E\u00B0cell = +"+c.E+" V",
      c.w.map(function(x){return x+", E\u00B0cell = +"+c.E+" V";}).concat([]).slice(0,2).concat([c.eq+", E\u00B0cell = -"+c.E+" V"]),
      "Balance the half-reactions so the electrons cancel (scaling a half-reaction does not change its E\u00B0), and take E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), which is positive for a spontaneous cell. <b>"+c.eq+", E\u00B0cell = +"+c.E+" V</b>.",{});
  }
  return mcq("A cell is built from "+c.desc+" "+ctx+". Which overall equation is correct?",
    c.eq,c.w,
    "Write the two half-reactions, scale them so the electrons lost equal the electrons gained, and add. The electrons cancel and the result is <b>"+c.eq+"</b>. Watch for distractors that keep electrons in the overall equation or leave the electron counts unbalanced.",{});
});

var IDHCASES=[
    {half:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B",a:"The oxidation half-reaction",w:["The reduction half-reaction","Neither: it is a precipitation","Neither: no electrons are involved"]},
    {half:"Ag\u207A(aq) + e\u207B \u2192 Ag(s)",a:"The reduction half-reaction",w:["The oxidation half-reaction","Neither: it is a neutralization","Neither: no electrons are involved"]},
    {half:"2 H\u2082O(l) \u2192 O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B",a:"The oxidation half-reaction",w:["The reduction half-reaction","Neither: it is a combustion only","Neither: it is an acid-base reaction"]},
    {half:"Fe\u00B3\u207A(aq) + e\u207B \u2192 Fe\u00B2\u207A(aq)",a:"The reduction half-reaction",w:["The oxidation half-reaction","Neither: charges are not balanced","Neither: it is a decomposition only"]}
];
E("u4-83-identify-half",4,["8.3"],2,"var",varset(IDHCASES.map(function(c){
  return function(){
    return mcq("The half-reaction "+c.half+" is",
      c.a,c.w,
      "Electrons as products mean oxidation (loss); electrons as reactants mean reduction (gain). <b>"+c.a+"</b>.",{});
  };
})));

var BSCASES=[
    {q:"In the standard method for balancing a redox half-reaction in acidic solution, after balancing the atoms other than O and H, the next step is to",
     a:"Balance the oxygen atoms by adding H\u2082O to the side that needs oxygen",
     w:["Balance the charge by adding electrons","Balance the hydrogen atoms by adding H\u207A","Convert the solution to basic conditions"]},
    {q:"In acidic solution, hydrogen atoms in a half-reaction are balanced by",
     a:"Adding H\u207A ions to the side short of hydrogen",
     w:["Adding H\u2082 gas to the side short of hydrogen","Adding OH\u207B ions to the side short of hydrogen","Removing O atoms"]},
    {q:"The final step in balancing any half-reaction is to",
     a:"Balance the charge by adding electrons to the more positive side",
     w:["Balance the charge by adding H\u207A to the more positive side","Cancel any water molecules on both sides","Check that the electrons appear as products"]},
    {q:"Combining two balanced half-reactions into the overall equation requires first",
     a:"Multiplying one or both half-reactions so the electrons lost equal the electrons gained, then cancelling the electrons",
     w:["Adding the two E\u00B0 values together","Removing all the electrons and H\u207A ions","Converting both to basic conditions"]}
];
E("u4-83-balance-steps",4,["8.3"],2,"var",varset(BSCASES.map(function(c){
  return function(){
    return mcq(c.q,
      c.a,c.w,
      "The order is: balance atoms except O and H, balance O with H\u2082O, balance H with H\u207A, then balance charge with electrons. <b>"+c.a+"</b>.",{});
  };
})));

var BASICCASES=[
    {h:"MnO\u2084\u207B(aq) \u2192 MnO\u2082(s)",acid:"MnO\u2084\u207B + 4 H\u207A + 3 e\u207B \u2192 MnO\u2082 + 2 H\u2082O",base:"MnO\u2084\u207B + 2 H\u2082O + 3 e\u207B \u2192 MnO\u2082 + 4 OH\u207B"},
    {h:"ClO\u207B(aq) \u2192 Cl\u207B(aq)",acid:"ClO\u207B + 2 H\u207A + 2 e\u207B \u2192 Cl\u207B + H\u2082O",base:"ClO\u207B + H\u2082O + 2 e\u207B \u2192 Cl\u207B + 2 OH\u207B"},
    {h:"NO\u2082\u207B(aq) \u2192 NH\u2083(g)",acid:"NO\u2082\u207B + 8 H\u207A + 6 e\u207B \u2192 NH\u2084\u207A + 2 H\u2082O",base:"NO\u2082\u207B + 5 H\u2082O + 6 e\u207B \u2192 NH\u2083 + 7 OH\u207B"}
];
E("u4-83-basic-solution",4,["8.3"],3,"var",varset(BASICCASES.map(function(c){
  return function(){
    return mcq("The half-reaction "+c.h+" is balanced in acidic solution as "+c.acid+". Converted to BASIC solution, the correctly balanced half-reaction is",
      c.base,
      [c.acid,"Add H\u207A to both sides until the OH\u207B is removed","Subtract OH\u207B from both sides of the acid-balanced equation"],
      "Add the same number of OH\u207B to both sides as there are H\u207A: each H\u207A + OH\u207B becomes H\u2082O, then cancel any water appearing on both sides. For this half-reaction the result is <b>"+c.base+"</b>.",{});
  };
})));

/* ---------- 8.4 Galvanic cells ---------- */

E("u4-84-label-parts",4,["8.4"],1,"var",varset([
  function(){
    var q=mcq("In a galvanic (voltaic) cell, oxidation takes place at the",
      "Anode, which is the negative electrode",
      ["Cathode, which is the positive electrode",
       "Salt bridge, which connects the solutions",
       "Anode, which is the positive electrode"],
      "An Ox and Red Cat: oxidation happens at the anode, reduction at the cathode. In a galvanic cell the anode is the negative terminal because it supplies the electrons.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("In a galvanic cell, the cathode is where",
      "Reduction takes place: ions from the solution gain electrons and are deposited or converted",
      ["Oxidation takes place: the metal dissolves as ions",
       "The salt bridge releases its ions",
       "Electrons are produced and stored"],
      "Red Cat: reduction at the cathode. In a galvanic cell the cathode is the positive electrode, and positive ions move toward it through the solution.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("In a galvanic cell, electrons travel through the external wire",
      "From the anode to the cathode",
      ["From the cathode to the anode",
       "In both directions equally, so there is no net current",
       "From the salt bridge into both electrodes"],
      "Oxidation at the anode releases electrons, which flow through the wire to the cathode, where reduction consumes them. Anode to cathode, always, in the external circuit.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  },
  function(){
    var q=mcq("The half-cells of a galvanic cell are connected by a salt bridge in order to",
      "Complete the electrical circuit by letting ions move, keeping both solutions electrically neutral",
      ["Let electrons flow between the two solutions",
       "Mix the two solutions slowly so they can react",
       "Hold the electrodes at a fixed distance apart"],
      "Electrons travel through the wire; ions travel through the salt bridge. Without it, charge would build up in each half-cell and the cell would stop almost immediately.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  }
]));

E("u4-84-label-scenario",4,["8.4"],2,"gen",function(){
  var pairs=[["Zn","Cu"],["Mg","Cu"],["Fe","Cu"],["Zn","Ag"],["Mg","Zn"],["Fe","Zn"],["Ni","Cu"],["Pb","Cu"]];
  var pr=pick(pairs);
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var A=map[pr[0]],B=map[pr[1]];
  var anode=A.e<B.e?A:B, cathode=A.e<B.e?B:A;
  var salt=pick(["potassium nitrate","sodium chloride","potassium chloride"]);
  var conc=pick([0.100,0.500,1.00]);
  var q=mcq("A galvanic cell is built with a "+A.metal+" electrode in a "+gF(conc)+" mol/L solution of its ions and a "+B.metal+" electrode in a "+gF(conc)+" mol/L solution of its ions, joined by a salt bridge containing "+salt+". Using the reduction potentials in the Reference Information, which statement is correct?",
    "The "+anode.metal+" electrode is the anode: it is oxidized, loses mass, and electrons flow from it to the "+cathode.metal+" electrode",
    ["The "+cathode.metal+" electrode is the anode: it is oxidized, loses mass, and electrons flow from it to the "+anode.metal+" electrode",
     "The "+anode.metal+" electrode is the cathode: it gains mass as its ions are deposited on it",
     "Electrons flow through the salt bridge from the "+anode.metal+" electrode to the "+cathode.metal+" electrode"],
    "The metal with the lower (more negative) E\u00B0 is oxidized: that is "+anode.metal+" ("+eF(anode.e)+" V) versus "+cathode.metal+" ("+eF(cathode.e)+" V). Oxidation happens at the anode, which loses mass as it dissolves, and electrons flow from anode to cathode through the wire, never through the salt bridge. <b>The "+anode.metal+" electrode is the anode</b>.",{});
    q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge ("+salt+")");
    return q;
});

E("u4-84-electron-flow",4,["8.4"],1,"gen",function(){
  var v=pick([
    {q:"Through the salt bridge of a working galvanic cell, positive ions (cations) move toward",a:"The cathode compartment, where reduction is consuming positive ions",w:["The anode compartment, where oxidation is producing electrons","The negative terminal of the voltmeter","Neither compartment: ions do not move in a salt bridge"]},
    {q:"As a galvanic cell runs, the anode electrode gradually",a:"Loses mass, because its atoms are oxidized to ions that enter the solution",w:["Gains mass, because ions plate onto it","Keeps exactly the same mass, because only electrons move","Gains mass, because electrons accumulate on it"]},
    {q:"As a galvanic cell runs, the cathode electrode gradually",a:"Gains mass, because ions from the solution are reduced and deposited on it",w:["Loses mass, because it is being oxidized","Keeps exactly the same mass, because reduction adds nothing","Loses mass, because it supplies the electrons"]},
    {q:"If the salt bridge is removed from a working galvanic cell, the cell",a:"Stops working almost at once, because charge builds up in the half-cells and breaks the circuit",w:["Works better, because the solutions stay purer","Keeps working, because the wire alone completes the circuit","Reverses direction and becomes a battery charger"]}
  ]);
  var t=ri(15,35);
  var q=mcq("A galvanic cell operates at "+t+" \u00B0C. "+v.q+":",
    v.a,v.w,
    "<b>"+v.a+"</b>.",{t:t});
  q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
});

var SBCASES=[
    {q:"The electrolyte in a salt bridge is chosen to be an inert salt such as potassium nitrate because",a:"Its ions must not react with either half-cell solution; they only need to move to balance charge",w:["Its ions carry the electrons between the half-cells","It must react with the anode to keep the cell going","Its colour shows when the cell is finished"]},
    {q:"In the anode compartment of a running galvanic cell, positive ions are being produced. The solution stays neutral because",a:"Negative ions flow in from the salt bridge to balance the new positive charge",w:["Positive ions flow out through the wire","Electrons flow back through the salt bridge","The electrode absorbs the extra positive ions"]},
    {q:"A student replaces the salt bridge with a metal wire dipped into both solutions. The cell fails mainly because",a:"A wire cannot let ions move between the solutions, and it would also short the cell: the circuit for charge balance is not completed",w:["Metal wires cannot touch solutions without dissolving instantly","The wire is too good a conductor, so the voltage becomes too high","The solutions needed the salt for their colour"]}
];
E("u4-84-salt-bridge",4,["8.4"],2,"var",varset(SBCASES.map(function(v){
  return function(){
    var q=mcq(v.q+":",
      v.a,v.w,
      "<b>"+v.a+"</b>.",{}); q.figure=c32cellSVG("Electrode","Ion solution","Electrode","Ion solution","Salt bridge"); return q;
  };
})));

E("u4-84-build-cell",4,["8.4"],3,"gen",function(){
  var pairs=[["Zn","Cu"],["Mg","Cu"],["Fe","Cu"],["Zn","Ag"],["Mg","Zn"],["Fe","Zn"],["Ni","Cu"],["Pb","Ag"],["Al","Cu"],["Mg","Ag"]];
  var pr=pick(pairs);
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var A=map[pr[0]],B=map[pr[1]];
  var anode=A.e<B.e?A:B, cathode=A.e<B.e?B:A;
  var conc=pick([0.100,0.500,1.00]);
  var notation=anode.metal+"(s) | "+anode.ion+"(aq) || "+cathode.ion+"(aq) | "+cathode.metal+"(s)";
  var mode=pick(["parts","notation"]);
  if(mode==="parts"){
    var q=mcq("Using "+gF(conc)+" mol/L solutions and the reduction potentials in the Reference Information, a galvanic cell is built from "+A.metal+" and "+B.metal+" half-cells. Which description of the finished cell is correct?",
      "Anode: "+anode.metal+" (oxidation); cathode: "+cathode.metal+" (reduction); electrons flow from "+anode.metal+" to "+cathode.metal+" through the wire; the "+anode.metal+" electrode loses mass",
      ["Anode: "+cathode.metal+" (oxidation); cathode: "+anode.metal+" (reduction); electrons flow from "+cathode.metal+" to "+anode.metal+" through the wire; the "+cathode.metal+" electrode loses mass",
       "Anode: "+anode.metal+" (reduction); cathode: "+cathode.metal+" (oxidation); electrons flow through the salt bridge",
       "Anode: "+anode.metal+" (oxidation); cathode: "+cathode.metal+" (reduction); the "+cathode.metal+" electrode loses mass as it dissolves"],
      "The couple with the lower E\u00B0 supplies the anode: "+anode.metal+" ("+eF(anode.e)+" V) is oxidized and dissolves, while "+cathode.ion+" is reduced at the "+cathode.metal+" cathode ("+eF(cathode.e)+" V), which gains mass. Electrons flow anode to cathode through the wire. <b>Anode: "+anode.metal+"; cathode: "+cathode.metal+"</b>.",{mode:mode});
      q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge");
      return q;
  }
  var q=mcq("Using "+gF(conc)+" mol/L solutions and the reduction potentials in the Reference Information, a galvanic cell is built from "+A.metal+" and "+B.metal+" half-cells. Which cell notation is correct?",
    notation,
    [cathode.metal+"(s) | "+cathode.ion+"(aq) || "+anode.ion+"(aq) | "+anode.metal+"(s)",
     anode.metal+"(s) | "+cathode.ion+"(aq) || "+anode.ion+"(aq) | "+cathode.metal+"(s)",
     anode.ion+"(aq) | "+anode.metal+"(s) || "+cathode.metal+"(s) | "+cathode.ion+"(aq)"],
    "Cell notation lists the anode (oxidation) on the left and the cathode (reduction) on the right, with a single line for a phase boundary and a double line for the salt bridge. The anode is "+anode.metal+" (lower E\u00B0). <b>"+notation+"</b>.",{mode:mode});
    q.figure=c32cellSVG(A.metal+" electrode",A.ion+"(aq) solution",B.metal+" electrode",B.ion+"(aq) solution","Salt bridge");
    return q;
});

/* ---------- 8.5 Electrolytic cells ---------- */

E("u4-85-compare",4,["8.5"],2,"var",varset([
  function(){
    return mcq("Which statement correctly contrasts galvanic and electrolytic cells?",
      "A galvanic cell converts chemical energy to electrical energy using a spontaneous reaction; an electrolytic cell uses electrical energy to drive a nonspontaneous reaction",
      ["Both cell types use electrical energy to drive reactions",
       "An electrolytic cell converts chemical energy to electrical energy spontaneously",
       "A galvanic cell requires a power supply to keep running"],
      "The two are opposites in energy conversion. Galvanic: spontaneous chemistry makes electricity. Electrolytic: electricity forces chemistry that would not happen on its own.",{});
  },
  function(){
    return mcq("In an electrolytic cell, the anode is the positive electrode, while in a galvanic cell the anode is negative. The reason for the difference is that",
      "What defines the anode is oxidation, not the sign: the power supply pulls electrons from the electrolytic anode, making it positive, while the galvanic anode produces electrons, making it negative",
      ["The labels anode and cathode swap meaning between the two cell types",
       "Electrolytic cells do not really have an anode",
       "The sign of an electrode is decided by its size"],
      "Anode always means oxidation. The sign follows from how the cell works: a galvanic anode is the source of electrons (negative); a power supply drains electrons from an electrolytic anode (positive).",{});
  },
  function(){
    return mcq("A rechargeable battery is being recharged. During recharging it operates as",
      "An electrolytic cell, because electrical energy is being supplied to reverse the discharge reaction",
      ["A galvanic cell, because all batteries are always galvanic",
       "Neither, because charging is not an electrochemical process",
       "A galvanic cell, because the reaction is spontaneous"],
      "Discharge is galvanic (spontaneous, producing current). Charging drives the same reaction backwards with outside electrical energy, which is electrolysis.",{});
  },
  function(){
    return mcq("Which process is an application of an electrolytic cell?",
      "Electroplating a steel bumper with chromium",
      ["A flashlight battery lighting a bulb",
       "A hydrogen fuel cell powering a bus",
       "Rusting of an iron gate"],
      "Electroplating forces metal ions onto an object using a power supply: a nonspontaneous reduction driven by electricity. The others are spontaneous processes or galvanic devices.",{});
  }
]));

E("u4-85-features",4,["8.5"],1,"var",varset([
  function(){
    return mcq("An electrolytic cell requires which component that a galvanic cell does not?",
      "An external power supply (such as a DC source or battery) to drive the reaction",
      ["A salt bridge in every design",
       "Two different metals",
       "A voltmeter"],
      "Electrolysis is nonspontaneous: without a power supply pushing the electrons, the reaction does not occur. A galvanic cell is its own power supply.",{});
  },
  function(){
    return mcq("In an electrolytic cell, reduction takes place at the",
      "Cathode, which is connected to the negative terminal of the power supply",
      ["Anode, which is connected to the negative terminal",
       "Cathode, which is connected to the positive terminal",
       "Salt bridge, which stores the electrons"],
      "Red Cat holds in both cell types: reduction is always at the cathode. In electrolysis the supply's negative terminal feeds electrons to the cathode, making it negative.",{});
  },
  function(){
    return mcq("Which statement is true of every electrolytic cell?",
      "Electrical energy is converted into chemical energy, stored in the products of a nonspontaneous reaction",
      ["Chemical energy is converted into electrical energy",
       "The overall reaction has a positive standard cell potential",
       "The cell can run indefinitely with no energy input"],
      "Electrolysis stores energy in chemical form by forcing a nonspontaneous reaction (one whose cell potential as a galvanic cell would be negative). The energy books always balance: in from the supply, stored in the products.",{});
  }
]));

E("u4-85-molten-products",4,["8.5"],2,"gen",function(){
  var salts=[
    {name:"sodium chloride",cat:"Sodium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Sodium metal forms at the anode","Hydrogen gas forms at the cathode"]},
    {name:"lead(II) bromide",cat:"Lead metal forms at the cathode",an:"Bromine forms at the anode",wc:["Bromine forms at the cathode","Lead metal forms at the anode","Oxygen gas forms at the cathode"]},
    {name:"magnesium chloride",cat:"Magnesium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Magnesium metal forms at the anode","Hydrogen gas forms at the anode"]},
    {name:"calcium chloride",cat:"Calcium metal forms at the cathode",an:"Chlorine gas forms at the anode",wc:["Chlorine gas forms at the cathode","Calcium metal forms at the anode","Sodium metal forms at the cathode"]},
    {name:"aluminium oxide (with cryolite, in the Hall process)",cat:"Aluminium metal forms at the cathode",an:"Oxygen gas forms at the anode (which slowly burns away)",wc:["Oxygen gas forms at the cathode","Aluminium metal forms at the anode","Carbon dioxide forms at the cathode"]}
  ];
  var s=pick(salts);
  var cur=pick([2.00,4.00,5.00,10.0,25.0,50.0,100.0]);
  var mins=pick([30,60,120,240]);
  var askAnode=Math.random()<0.5;
  if(askAnode){
    var q=mcq("Molten "+s.name+" is electrolyzed with a current of "+gF(cur)+" A for "+mins+" minutes. What forms at the anode?",
      s.an,[s.cat,s.wc[0],s.wc[2]],
      "At the anode, oxidation: the negative ions give up electrons. For molten "+s.name+", <b>"+s.an.toLowerCase()+"</b>.",{cur:cur,mins:mins});
    q.figure=c32electroSVG(s.name);
    return q;
  }
  var q=mcq("Molten "+s.name+" is electrolyzed with a current of "+gF(cur)+" A for "+mins+" minutes. What forms at the cathode?",
    s.cat,[s.an,s.wc[0],s.wc[1]],
    "At the cathode, reduction: the positive metal ions gain electrons. For molten "+s.name+", <b>"+s.cat.toLowerCase()+"</b>.",{cur:cur,mins:mins});
  q.figure=c32electroSVG(s.name);
  return q;
});

E("u4-85-scenario-judgement",4,["8.5"],3,"var",varset([
  function(){
    return mcq("A jeweller connects a silver-plating bath to a DC power supply: the object to be plated is wired to the negative terminal and a silver bar to the positive terminal, both in a silver nitrate solution. Which judgement is correct?",
      "This is an electrolytic cell: the object is the cathode, where Ag\u207A is reduced and deposited, and the silver bar is the anode, where silver is oxidized to replace the ions used",
      ["This is a galvanic cell: the object is the anode, where silver is deposited by oxidation",
       "This is an electrolytic cell: the object is the anode, where Ag\u207A is reduced",
       "No cell is involved, because plating is a physical coating process"],
      "Plating is driven by the supply, so it is electrolysis. Reduction (deposition) happens at the cathode, which must be the object; the supply's negative terminal feeds it electrons. The silver anode dissolves to keep [Ag\u207A] steady. <b>Electrolytic; object = cathode; bar = anode</b>.",{});
  },
  function(){
    return mcq("A fuel cell in a bus combines hydrogen and oxygen to produce water and electricity, and it runs a motor as long as fuel is supplied. Which judgement is correct?",
      "This is a galvanic cell: the reaction is spontaneous and converts chemical energy directly into electrical energy",
      ["This is an electrolytic cell: gases reacting always need a power supply",
       "This is neither: fuel cells are combustion engines",
       "This is an electrolytic cell while starting and galvanic after that"],
      "The hydrogen-oxygen reaction is spontaneous, and the cell harvests it as electricity rather than heat: the definition of a galvanic (voltaic) device. No external supply drives it. <b>Galvanic</b>.",{});
  },
  function(){
    return mcq("A car battery is first used to start the engine, then recharged by the alternator while driving. Which statement about the two phases is correct?",
      "Starting is galvanic (the battery supplies electrical energy); recharging is electrolytic (electrical energy is supplied to reverse the reaction)",
      ["Both phases are galvanic, because a battery is a galvanic device",
       "Both phases are electrolytic, because lead-acid chemistry is electrolysis",
       "Starting is electrolytic and recharging is galvanic"],
      "The same cell plays both roles: spontaneous discharge when it delivers energy, forced reversal when energy is pushed back in. Direction of energy flow decides the classification.",{});
  }
]));

/* ---------- 8.6 Predicting spontaneity from E\u00B0 ---------- */

E("u4-86-predict-spontaneous",4,["8.6"],2,"gen",function(){
  var metals=["Mg","Al","Zn","Fe","Ni","Pb","Cu","Ag"];
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var i1=ri(0,7),i2=ri(0,7);
  if(i1===i2)i2=(i2+1)%8;
  var strip=map[metals[i1]],ionC=map[metals[i2]];
  var reacts=strip.e<ionC.e;
  var vol=pick([50,100,200,250]),conc=pick([0.100,0.500,1.00]);
  var correct=reacts?
    "The "+strip.metal+" strip dissolves and "+ionC.metal+" plates out: the reaction is spontaneous because E\u00B0("+ionC.ion+") is greater than E\u00B0("+strip.ion+")":
    "Nothing observable happens: the reaction is not spontaneous because E\u00B0("+ionC.ion+") is less than E\u00B0("+strip.ion+"), so "+ionC.metal+" cannot take electrons from "+strip.metal;
  var wrongs=reacts?
    ["Nothing observable happens: "+strip.metal+" is less reactive than "+ionC.metal,
     "The "+strip.metal+" strip gains mass as "+strip.metal+" ions plate onto it from the solution",
     "The "+ionC.metal+" already in the solution dissolves the container instead"]:
    ["The "+strip.metal+" strip dissolves and "+ionC.metal+" plates out, because any metal dissolves in any ion solution",
     "The solution changes colour as "+strip.ion+" is reduced by the "+ionC.metal+" ions",
     "Hydrogen gas bubbles off the strip, because ion solutions are acidic"];
  return mcq("A strip of "+strip.metal+" is placed in "+vol+" mL of a "+gF(conc)+" mol/L solution containing "+ionC.ion+" ions. Using the reduction potentials in the Reference Information (E\u00B0 for "+strip.ion+" is "+eF(strip.e)+" V and for "+ionC.ion+" is "+eF(ionC.e)+" V), what is observed?",
    correct,wrongs,
    "A metal can reduce the ions of a metal below it in the reduction table, that is, a couple with a higher E\u00B0. Here E\u00B0("+ionC.ion+") = "+eF(ionC.e)+" V and E\u00B0("+strip.ion+") = "+eF(strip.e)+" V. "+(reacts?"Since "+eF(ionC.e)+" > "+eF(strip.e)+", the displacement goes ahead.":"Since "+eF(ionC.e)+" < "+eF(strip.e)+", the displacement cannot go ahead.")+" <b>"+(reacts?"The reaction is spontaneous":"No reaction")+"</b>.",{});
});

E("u4-86-table-reading",4,["8.6"],1,"gen",function(){
  var askOx=Math.random()<0.5;
  var sets=[["F\u2082","Cl\u2082","Br\u2082","I\u2082"],["O\u2082","Br\u2082","Ag\u207A","Cu\u00B2\u207A"],["Cl\u2082","Fe\u00B3\u207A","H\u207A","Zn\u00B2\u207A"]];
  var s=pick(sets);
  var vals={"F\u2082":2.87,"Cl\u2082":1.36,"Br\u2082":1.07,"I\u2082":0.54,"O\u2082":1.23,"Ag\u207A":0.80,"Cu\u00B2\u207A":0.34,"Fe\u00B3\u207A":0.77,"H\u207A":0.00,"Zn\u00B2\u207A":-0.76};
  var t=ri(15,35);
  if(askOx){
    var best=s.slice().sort(function(a,b){return vals[b]-vals[a];})[0];
    var ds=s.filter(function(x){return x!==best;});
    return mcq("At "+t+" \u00B0C, four oxidizing agents are compared using the reduction potential table: "+s.join(", ")+". Which is the strongest oxidizing agent?",
      best,ds,
      "The strongest oxidizing agent is the species most eager to be reduced, which sits with the highest (most positive) E\u00B0 in the table. That is <b>"+best+"</b> ("+eF(vals[best])+" V).",{});
  }
  var redMap={"F\u2082":"F\u207B","Cl\u2082":"Cl\u207B","Br\u2082":"Br\u207B","I\u2082":"I\u207B","O\u2082":"H\u2082O","Ag\u207A":"Ag","Cu\u00B2\u207A":"Cu","Fe\u00B3\u207A":"Fe\u00B2\u207A","H\u207A":"H\u2082","Zn\u00B2\u207A":"Zn"};
  var worst=s.slice().sort(function(a,b){return vals[a]-vals[b];})[0];
  var bestRed=redMap[worst];
  var ds2=s.filter(function(x){return x!==worst;}).map(function(x){return redMap[x];});
  return mcq("At "+t+" \u00B0C, the reduced forms of four couples are compared using the reduction potential table: the couples are those of "+s.join(", ")+". Which reduced form is the strongest reducing agent?",
    bestRed,ds2,
    "The strongest reducing agent is the reduced form of the couple with the lowest (most negative) E\u00B0: it gives up electrons most readily. That couple is "+worst+" ("+eF(vals[worst])+" V), whose reduced form is <b>"+bestRed+"</b>.",{});
});

E("u4-86-strongest-ranking",4,["8.6"],2,"var",varset([
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the strongest reducing agent among Li, Na, Mg, Zn and Cu (as metals):",
      "Li",["Na","Mg","Zn"],
      "The strongest reducing agent is the metal whose couple has the most negative E\u00B0: <b>Li</b>, because the couple Li\u207A/Li sits at -3.04 V, so lithium metal gives up electrons most readily.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the strongest oxidizing agent among F\u2082, Cl\u2082, Br\u2082 and O\u2082:",
      "F\u2082",["Cl\u2082","Br\u2082","O\u2082"],
      "The strongest oxidizing agent is the species whose couple has the most positive E\u00B0: <b>F\u2082</b>, because the couple F\u2082/F\u207B sits at +2.87 V, so fluorine takes electrons most readily.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the weakest reducing agent among Ag, Cu, Zn and Mg (as metals):",
      "Ag",["Cu","Zn","Mg"],
      "The weakest reducing agent is the metal whose couple has the most positive E\u00B0 of the four: <b>Ag</b>, because the couple Ag\u207A/Ag sits at +0.80 V, so silver metal holds its electrons most tightly.",{temp:temp});
  },
  function(){
    var temp=pick([20,25,30]);
    return mcq("Using the reduction potential table in the Reference Information at "+temp+" \u00B0C, identify the weakest oxidizing agent among Ag\u207A, Cu\u00B2\u207A, Zn\u00B2\u207A and Mg\u00B2\u207A (as ions):",
      "Mg\u00B2\u207A",["Ag\u207A","Cu\u00B2\u207A","Zn\u00B2\u207A"],
      "The weakest oxidizing agent is the ion whose couple has the most negative E\u00B0 of the four: <b>Mg\u00B2\u207A</b>, because the couple Mg\u00B2\u207A/Mg sits at -2.37 V, so magnesium ions are the least eager to be reduced.",{temp:temp});
  }
]));

E("u4-86-e-not-multiply",4,["8.6"],2,"gen",function(){
  var cases=[
    {half:"Zn(s) \u2192 Zn\u00B2\u207A(aq) + 2 e\u207B (E\u00B0 = +0.76 V for the oxidation)",mult:3,claim:"+2.28 V",right:"+0.76 V"},
    {half:"Ag\u207A(aq) + e\u207B \u2192 Ag(s) (E\u00B0 = +0.80 V)",mult:2,claim:"+1.60 V",right:"+0.80 V"},
    {half:"Cu\u00B2\u207A(aq) + 2 e\u207B \u2192 Cu(s) (E\u00B0 = +0.34 V)",mult:2,claim:"+0.68 V",right:"+0.34 V"},
    {half:"Fe\u00B2\u207A(aq) + 2 e\u207B \u2192 Fe(s) (E\u00B0 = -0.44 V)",mult:3,claim:"-1.32 V",right:"-0.44 V"}
  ];
  var c=pick(cases);
  var vol=pick([50,100,250,500]),conc=pick([0.100,0.500,1.00]),temp=pick([15,20,25,30]);
  return mcq("While balancing a cell reaction at "+temp+" \u00B0C (in "+vol+" mL of "+gF(conc)+" mol/L solutions), a student multiplies the half-reaction "+c.half+" by "+c.mult+" so the electrons cancel, and writes that its potential becomes "+c.claim+". Which judgement is correct?",
    "The student is wrong: E\u00B0 is an intensive property of the couple and does not change when the half-reaction is scaled, so it stays "+c.right+". Only the number of electrons changes",
    ["The student is right: multiplying the equation by "+c.mult+" multiplies the voltage by "+c.mult,
     "The student is wrong: the potential becomes zero when a half-reaction is scaled",
     "The student is right for reductions but wrong for oxidations"],
    "Voltage is energy per unit charge, an intensive quantity: scaling the equation scales the energy and the charge together, leaving the ratio unchanged. E\u00B0 stays <b>"+c.right+"</b> no matter the multiplier. This is one of the most common errors in cell calculations.",{});
});

/* ---------- 8.7 Standard reduction potentials and cell voltage ---------- */

E("u4-87-cell-voltage",4,["8.7"],2,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var keys=Object.keys(map);
  var i=ri(0,keys.length-1),j=ri(0,keys.length-1);
  if(i===j)j=(j+1)%keys.length;
  var hi=map[keys[Math.max(i,j)]],lo=map[keys[Math.min(i,j)]];
  if(hi.e<lo.e){var tmp=hi;hi=lo;lo=tmp;}
  var E=sfR(hi.e-lo.e,3);
  var device=pick(["a voltmeter","a small electric motor","an LED circuit"]);
  return numq("A galvanic cell is built from a "+lo.metal+" electrode in "+lo.ion+" solution and a "+hi.metal+" electrode in "+hi.ion+" solution, and connected to "+device+". Using the standard reduction potentials in the Reference Information, calculate the standard cell potential. Give your answer in V.",
    E,0.02,
    "The cathode is the couple with the higher E\u00B0: "+hi.ion+" ("+eF(hi.e)+" V). The anode is "+lo.ion+" ("+eF(lo.e)+" V). E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode) = "+fmtF(hi.e,2)+" V - ("+fmtF(lo.e,2)+" V) = +"+fmtF(E,2)+" V. The standard cell potential is <b>+"+fmtF(E,2)+" V</b>.",{});
});

E("u4-87-find-e-half",4,["8.7"],3,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var keys=Object.keys(map);
  var i=ri(0,keys.length-1),j=ri(0,keys.length-1);
  if(i===j)j=(j+2)%keys.length;
  var hi=map[keys[Math.max(i,j)]],lo=map[keys[Math.min(i,j)]];
  if(hi.e<lo.e){var tmp=hi;hi=lo;lo=tmp;}
  var E=sfR(hi.e-lo.e,3);
  var askAnode=Math.random()<0.5;
  if(askAnode){
    return numq("A galvanic cell built from a "+hi.metal+" electrode (in "+hi.ion+" solution) and a second metal electrode has a standard cell potential of +"+fmtF(E,2)+" V. The "+hi.ion+" couple is the cathode, with E\u00B0 = "+eF(hi.e)+" V. Calculate the standard reduction potential of the anode couple. Give your answer in V.",
      lo.e,0.02,
      "E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), so E\u00B0(anode) = E\u00B0(cathode) - E\u00B0cell = "+fmtF(hi.e,2)+" V - "+fmtF(E,2)+" V = "+fmtF(lo.e,2)+" V. The anode couple is "+lo.ion+"/"+lo.metal+", and its standard reduction potential is <b>"+eF(lo.e)+" V</b>.",{});
  }
  return numq("A galvanic cell built from a "+lo.metal+" electrode (in "+lo.ion+" solution) and a second metal electrode has a standard cell potential of +"+fmtF(E,2)+" V. The "+lo.ion+" couple is the anode, with E\u00B0 = "+eF(lo.e)+" V. Calculate the standard reduction potential of the cathode couple. Give your answer in V.",
    hi.e,0.02,
    "E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode), so E\u00B0(cathode) = E\u00B0cell + E\u00B0(anode) = "+fmtF(E,2)+" V + ("+fmtF(lo.e,2)+" V) = "+fmtF(hi.e,2)+" V. The cathode couple is "+hi.ion+"/"+hi.metal+", and its standard reduction potential is <b>"+eF(hi.e)+" V</b>.",{});
});

E("u4-87-standard-conditions",4,["8.7"],1,"var",varset([
  function(){
    return mcq("Standard reduction potentials, E\u00B0, are measured under standard conditions, which include",
      "Solutions at 1.00 mol/L, gases at 100 kPa, and a temperature of 25 \u00B0C",
      ["Solutions at any concentration, as long as the temperature is 0 \u00B0C",
       "Pure metals in distilled water at 100 \u00B0C",
       "Solutions at 1.00 mol/L and gases at 500 kPa"],
      "Standard state for these tables: 1.00 mol/L concentrations, 100 kPa for gases, and 25 \u00B0C. Potentials measured under other conditions differ from the tabulated E\u00B0 values.",{});
  },
  function(){
    return mcq("The standard hydrogen electrode is assigned E\u00B0 = 0.00 V. Its role in the table is",
      "The reference point: every other couple's potential is measured relative to it",
      ["To show that hydrogen never reacts in cells",
       "To mark the exact middle of the table by strength",
       "To supply hydrogen gas to every cell built"],
      "Potentials are relative. The hydrogen couple is set to zero by agreement, and every other E\u00B0 is the voltage of a cell built against it under standard conditions.",{});
  },
  function(){
    return mcq("A couple with a negative E\u00B0, such as Zn\u00B2\u207A/Zn at -0.76 V, is best interpreted as",
      "Its reduced form (Zn metal) is a stronger reducing agent than H\u2082: the metal gives up electrons more readily than hydrogen does",
      ["The couple can never appear in a working cell",
       "Its ions are stronger oxidizing agents than H\u207A",
       "The negative sign means the value was measured incorrectly"],
      "Negative means the couple sits below hydrogen in the table: the metal is more willing to be oxidized than H\u2082 is. Such metals react with acids to release hydrogen.",{});
  }
]));

E("u4-87-voltage-compare",4,["8.7"],3,"gen",function(){
  var map={}; ECOUPLES.forEach(function(c){map[c.metal]=c;});
  var names=["Mg","Al","Zn","Fe","Ni","Pb","Cu","Ag"];
  var pairs=[];
  var used={};
  while(pairs.length<4){
    var a=pick(names),b=pick(names);
    if(a===b)continue;
    var key=[a,b].sort().join("/");
    if(used[key])continue;
    used[key]=1;
    var ca=map[a],cb=map[b];
    var E=Math.abs(ca.e-cb.e);
    pairs.push({a:a,b:b,E:E,label:a+" with "+b+" (E\u00B0cell = +"+fmtF(E,2)+" V)"});
  }
  pairs.sort(function(x,y){return y.E-x.E;});
  var best=pairs[0];
  if(pairs[1]&&best.E-pairs[1].E<0.05){ return mcq("Four galvanic cells are built under standard conditions. Which pairing of electrodes gives the largest cell potential?",
    "Mg with Ag (E\u00B0cell = +3.17 V)",
    ["Zn with Cu (E\u00B0cell = +1.10 V)","Fe with Ag (E\u00B0cell = +1.24 V)","Pb with Cu (E\u00B0cell = +0.47 V)"],
    "The largest potential comes from the widest spread in the table: E\u00B0cell = E\u00B0(cathode) - E\u00B0(anode) = +0.80 - (-2.37) = +3.17 V for Mg with Ag. <b>Mg with Ag</b>.",{}); }
  var ds=pairs.slice(1).map(function(p){return p.label;});
  return mcq("Four galvanic cells are built under standard conditions from these electrode pairings: "+pairs.map(function(p){return p.a+" with "+p.b;}).join("; ")+". Which pairing gives the largest cell potential?",
    best.label,ds,
    "Cell potential is the gap between the two couples: E\u00B0cell = E\u00B0(higher) - E\u00B0(lower). Computing the four gaps from the table, the largest belongs to <b>"+best.a+" with "+best.b+"</b> at +"+fmtF(best.E,2)+" V.",{});
});

/* ---------- 8.8 Electrolysis calculations (Faraday's law) ---------- */

var PLATING=[
  {ion:"Ag\u207A",metal:"silver",z:1,M:107.87},
  {ion:"Cu\u00B2\u207A",metal:"copper",z:2,M:63.55},
  {ion:"Al\u00B3\u207A",metal:"aluminium",z:3,M:26.98},
  {ion:"Zn\u00B2\u207A",metal:"zinc",z:2,M:65.39},
  {ion:"Ni\u00B2\u207A",metal:"nickel",z:2,M:58.69},
  {ion:"Cr\u00B3\u207A",metal:"chromium",z:3,M:52.00},
  {ion:"Pb\u00B2\u207A",metal:"lead",z:2,M:207.20},
  {ion:"Sn\u00B2\u207A",metal:"tin",z:2,M:118.71}
];

E("u4-88-faraday-mass",4,["8.8"],3,"gen",function(){
  var p=pick(PLATING);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,5.00]);
  var mins=pick([10.0,15.0,20.0,30.0,45.0,60.0,90.0]);
  var t=mins*60;
  var Q=sfR(I*t,4);
  var ne=sfR(Q/96500,4);
  var n=sfR(ne/p.z,4);
  var mass=sfR(n*p.M,4);
  var ans=sfR(mass,3);
  return numq("A solution containing "+p.ion+" ions is electrolyzed with a current of "+gF(I)+" A for "+gF(mins)+" min. Calculate the mass of "+p.metal+" deposited at the cathode. Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in g.",
    ans,Math.max(0.02*ans,0.01),
    "Charge passed: Q = I \u00D7 t = "+gF(I)+" A \u00D7 ("+gF(mins)+" \u00D7 60) s = "+iF(Q)+" C. Moles of electrons: n = Q / F = "+iF(Q)+" / 96500 = "+iF(ne)+" mol. Each "+p.ion+" ion needs "+p.z+" electron"+(p.z>1?"s":"")+", so moles of "+p.metal+" = "+iF(ne)+" / "+p.z+" = "+iF(n)+" mol. Mass = "+iF(n)+" mol \u00D7 "+gF(p.M)+" g/mol = "+iF(mass)+" g. The mass deposited is <b>"+F3(ans)+" g</b>.",{});
});

E("u4-88-faraday-time",4,["8.8"],3,"gen",function(){
  var p=pick(PLATING);
  var target=pick([0.500,1.00,2.00,2.50,5.00,10.0]);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,5.00]);
  var n=sfR(target/p.M,4);
  var ne=sfR(n*p.z,4);
  var Q=sfR(ne*96500,4);
  var tsec=sfR(Q/I,4);
  var tmin=sfR(tsec/60,4);
  var ans=sfR(tmin,3);
  return numq("How long must a current of "+gF(I)+" A be passed through a solution containing "+p.ion+" ions to deposit "+gF(target)+" g of "+p.metal+" at the cathode? Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in minutes.",
    ans,Math.max(0.02*ans,0.2),
    "Moles of "+p.metal+": n = "+gF(target)+" g / "+gF(p.M)+" g/mol = "+iF(n)+" mol. Each "+p.ion+" ion needs "+p.z+" electron"+(p.z>1?"s":"")+", so moles of electrons = "+p.z+" \u00D7 "+iF(n)+" = "+iF(ne)+" mol. Charge needed: Q = "+iF(ne)+" \u00D7 96500 = "+iF(Q)+" C. Time: t = Q / I = "+iF(Q)+" / "+gF(I)+" = "+iF(tsec)+" s = "+iF(tmin)+" min. The time required is <b>"+F3(ans)+" min</b>.",{});
});

E("u4-88-electrons-moles",4,["8.8"],2,"gen",function(){
  var Q=pick([4825,9650,14475,19300,24125,28950,33775,38600,48250,57900,67525,77200,86850,96500,106150,115800]);
  var n=sfR(Q/96500,4),ans=sfR(n,3);
  var I=pick([0.500,1.00,1.50,2.00,2.50,3.00,4.00,5.00]);
  return numq("An electrolysis experiment passes a total charge of "+Q+" C (a current of "+gF(I)+" A run for the necessary time). Calculate the amount of electrons transferred. Use F = 9.65 \u00D7 10\u2074 C/mol. Give your answer in mol.",
    ans,Math.max(0.02*ans,0.002),
    "One mole of electrons carries 9.65 \u00D7 10\u2074 C (the Faraday constant). n(e\u207B) = Q / F = "+Q+" / 96500 = "+iF(n)+" mol. The amount of electrons transferred is <b>"+F3(ans)+" mol</b>.",{Q:Q});
});

E("u4-88-faraday-concept",4,["8.8"],1,"var",varset([
  function(){
    return mcq("The Faraday constant, F = 9.65 \u00D7 10\u2074 C/mol, represents",
      "The total charge carried by one mole of electrons",
      ["The charge on a single electron",
       "The voltage produced by one mole of electrons",
       "The mass of one mole of electrons"],
      "F links the mole scale to the coulomb scale: multiply moles of electrons by F to get coulombs, or divide a charge in coulombs by F to get moles of electrons.",{});
  },
  function(){
    return mcq("In an electrolysis, the mass of metal deposited at the cathode is doubled if",
      "The total charge passed is doubled, for example by doubling the current or doubling the time",
      ["The voltage alone is doubled, whatever the current and time",
       "The solution is made twice as deep",
       "The electrodes are moved twice as far apart"],
      "Faraday's law: the amount deposited tracks the total charge, Q = I \u00D7 t. Doubling Q (by current or by time) doubles the moles of electrons and so doubles the deposit.",{});
  },
  function(){
    return mcq("The same charge is passed through solutions of Ag\u207A ions and of Cu\u00B2\u207A ions in separate cells. The moles of metal deposited satisfy",
      "Twice as many moles of silver as of copper form, because each Ag\u207A needs one electron while each Cu\u00B2\u207A needs two",
      ["Equal moles of each metal form",
       "Twice as many moles of copper as of silver form",
       "No copper forms, because it needs two electrons"],
      "The charge buys electrons. A fixed number of moles of electrons reduces twice as many 1+ ions as 2+ ions, so n(Ag) = 2 \u00D7 n(Cu) for the same charge.",{});
  }
]));

/* ---------- 8.9 The hydrogen fuel cell ---------- */

E("u4-89-fuel-cell-basics",4,["8.9"],1,"var",varset([
  function(){
    return mcq("The overall reaction in a hydrogen fuel cell is",
      "2 H\u2082(g) + O\u2082(g) \u2192 2 H\u2082O(l)",
      ["2 H\u2082O(l) \u2192 2 H\u2082(g) + O\u2082(g)",
       "H\u2082(g) + O\u2082(g) \u2192 H\u2082O\u2082(l)",
       "CH\u2084(g) + 2 O\u2082(g) \u2192 CO\u2082(g) + 2 H\u2082O(l)"],
      "A hydrogen fuel cell runs the familiar reaction of hydrogen with oxygen, but harvests it as electricity instead of heat: the only product is water.",{});
  },
  function(){
    return mcq("A hydrogen fuel cell differs from a hydrogen storage battery in that",
      "The fuel cell keeps producing electricity as long as hydrogen and oxygen are supplied from outside; it is not recharged and does not store the reactants inside",
      ["The fuel cell stores hydrogen inside itself like a tank battery",
       "The fuel cell burns hydrogen in a flame to spin a turbine",
       "There is no difference at all"],
      "A fuel cell is a flow device: reactants are fed in continuously and the product leaves. A battery stores its reactants inside and runs down (or is recharged).",{});
  },
  function(){
    return mcq("The main environmental advantage claimed for hydrogen fuel cells in vehicles is that",
      "Their only exhaust product is water, with no carbon dioxide produced at the vehicle",
      ["They consume no energy to run",
       "They produce hydrogen as a waste product",
       "They never need any fuel infrastructure"],
      "At the point of use, the product is water only. (How the hydrogen itself is produced is a separate question for the full environmental picture.)",{});
  }
]));

E("u4-89-fuel-cell-half",4,["8.9"],2,"var",varset([
  function(){
    var t=pick([25,40,60,80]);
    return mcq("In an acidic hydrogen fuel cell operating at "+t+" \u00B0C, hydrogen gas is fed to one electrode and oxygen to the other. The half-reaction at the anode is",
      "H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B",
      ["H\u2082(g) + 2 e\u207B \u2192 2 H\u207B(aq)",
       "O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)",
       "2 H\u2082O(l) \u2192 O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B"],
      "The anode is where oxidation happens: hydrogen is oxidized, releasing electrons that travel through the external circuit. <b>H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B</b>.",{t:t});
  },
  function(){
    var t=pick([25,40,60,80]);
    return mcq("In an acidic hydrogen fuel cell operating at "+t+" \u00B0C, hydrogen gas is fed to one electrode and oxygen to the other. The half-reaction at the cathode is",
      "O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)",
      ["H\u2082(g) \u2192 2 H\u207A(aq) + 2 e\u207B",
       "O\u2082(g) \u2192 2 O\u00B2\u207B(aq)",
       "2 H\u207A(aq) + 2 e\u207B \u2192 H\u2082(g)"],
      "The cathode is where reduction happens: oxygen accepts the electrons arriving from the anode and combines with H\u207A to form water. <b>O\u2082(g) + 4 H\u207A(aq) + 4 e\u207B \u2192 2 H\u2082O(l)</b>.",{t:t});
  },
  function(){
    return mcq("Combining the two fuel cell half-reactions gives the overall reaction. In that overall reaction, which substance is reduced?",
      "Oxygen, O\u2082: its oxidation number falls from 0 to -2 in water",
      ["Hydrogen, H\u2082: its oxidation number rises from 0 to +1",
       "Water, because it is the product",
       "Neither: a fuel cell reaction is not a redox reaction"],
      "Oxidation numbers tell the story: hydrogen goes 0 to +1 (oxidized) and oxygen goes 0 to -2 (reduced). The fuel cell is a redox reaction whose energy is harvested as electricity.",{});
  }
]));

var FCCASES=[
    {q:"A fuel cell is described as more efficient than burning the same hydrogen in an engine mainly because",a:"The cell converts the chemical energy directly into electrical energy, avoiding the losses of the heat-to-motion steps in an engine",w:["The cell creates extra energy from the water it produces","Burning hydrogen in an engine produces no useful energy","The cell does not need oxygen, so it saves fuel"]},
    {q:"A hydrogen fuel cell powering a bus produces water fast enough that it must be drained or vented. This is because",a:"Water is the product of the cell reaction, formed continuously at the cathode as the cell runs",w:["The hydrogen fuel is stored dissolved in water","Water leaks in from the cooling system by design","The cell condenses all of the humidity from the air"]},
    {q:"If the hydrogen supply to a running fuel cell is cut off, the cell",a:"Stops producing electricity once the remaining hydrogen is used, because a fuel cell only runs while reactants are supplied",w:["Keeps running for hours from its stored charge, like a large battery","Switches to using water as its fuel","Produces more voltage to compensate"]}
];
E("u4-89-fuel-cell-reasoning",4,["8.9"],2,"var",varset(FCCASES.map(function(v){
  return function(){
    var t=pick([25,40,60,80]);
    return mcq("A hydrogen fuel cell operates at "+t+" \u00B0C in a test vehicle. "+v.q+":",
      v.a,v.w,
      "<b>"+v.a+"</b>.",{t:t});
  };
})));
