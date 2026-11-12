// Chemistry 3202 Unit 1 From Kinetics to Equilibrium question bank
// Phase C diagram figures (Nov 2026): original SVG figures generated from
// each question's own values were added to the 5.3 potential energy diagram
// entries. Shared figure helpers live below the sig-fig helpers in this
// slice because the assembler order for chem-3202 is u1, u2, u3, u4, br
// and this course has no bank-helpers.js slice; Units 2 to 4 reuse them.
// CRMARKS: u1-51-rate-explain=3
// CRMARKS: u1-52-rate-scenario=2
// CRMARKS: u1-53-ea-reverse=3
// CRMARKS: u1-54-mechanism-analysis=4
// CRMARKS: u1-56-k-calc=3
// CRMARKS: u1-56-ice-k=4
// CRMARKS: u1-57-shift-predict=2

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens print at 3 significant figures minimum (data sheet constants such
   as molar masses keep their full printed precision). Intermediates print
   at 4 significant figures: one guard digit, following the Chemistry 3202
   clarifications rule to carry at least one extra digit through a
   calculation and round only the final answer. Final answers are stored
   and printed at 3 significant figures, always with their unit in the
   solution. Exact numbers (coefficients, counts, ratios) are exempt. pH
   values follow the log rule instead: the decimal places in the pH equal
   the significant figures in the concentration. */
function sfR(x,sf){if(!isFinite(x)||x===0)return 0;var d=Math.pow(10,sf-Math.ceil(Math.log10(Math.abs(x))));return Math.round(x*d)/d;}
function sfSup(e){var m={"-":"\u207B","0":"\u2070","1":"\u00B9","2":"\u00B2","3":"\u00B3","4":"\u2074","5":"\u2075","6":"\u2076","7":"\u2077","8":"\u2078","9":"\u2079"};return String(e).split("").map(function(c){return m[c];}).join("");}
function sfF(x,sf){var r=sfR(x,sf);if(r===0)return "0."+"000".slice(0,Math.max(0,sf-1));var exp=Math.floor(Math.log10(Math.abs(r))),dec=sf-1-exp;if(dec<0){return (r/Math.pow(10,exp)).toFixed(sf-1)+" \u00D7 10"+sfSup(exp);}return r.toFixed(dec);}
function F3(x){return sfF(x,3);}
function iF(x){return sfF(x,4);}
function gF(x){for(var sf=3;sf<=5;sf++){if(Math.abs(sfR(x,sf)-x)<=Math.abs(x)*1e-9+1e-12)return sfF(x,sf);}return fmt(x);}
function phF(x,dec){return (Math.round(x*Math.pow(10,dec))/Math.pow(10,dec)).toFixed(dec);}

/* ============ Diagram figures (Phase C, Nov 2026) ============
   Original code-generated SVG drawings, built from each question's own
   drawn values at generation time. c32peSVG(R, peak, Pr, o) draws a
   potential energy curve through reactant level R, barrier peak and
   product level Pr (all in kJ, or relative kJ when the stem gives only
   differences). o.r, o.k and o.p are the level labels; omit one to leave
   that level unlabelled. o.ea and o.dh add annotation arrows for values
   the stem itself gives; the value an entry asks for is never annotated.
   c32catSVG draws the catalyst comparison (solid peak and lowered
   dashed peak sharing the same reactant and product levels). */
function c32txt(x,y,str,size,bold,anchor,color){
  return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||12)+'" fill="'+(color||"#17352a")+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
}
function c32peSVG(R,Pk,Pr,o){
  o=o||{};
  var W=340,H=238,yb=192,yt=34;
  var lo=Math.min(0,R,Pr),hi=Math.max(Pk,R,Pr),pad=(hi-lo)*0.22+8; lo-=pad; hi+=pad;
  function Y(v){return yb-(v-lo)/(hi-lo)*(yb-yt);}
  var yR=Y(R),yK=Y(Pk),yP=Y(Pr);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Potential energy diagram">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Potential energy (kJ)",11.5,false);
  out+=c32txt(182,220,"Reaction progress",11.5,false);
  out+='<path d="M66 '+fmt(yR,1)+' L118 '+fmt(yR,1)+' C150 '+fmt(yR,1)+' 164 '+fmt(yK,1)+' 188 '+fmt(yK,1)+' C212 '+fmt(yK,1)+' 226 '+fmt(yP,1)+' 248 '+fmt(yP,1)+' L302 '+fmt(yP,1)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  if(o.r)out+=c32txt(92,yR-13,o.r,12,true);
  if(o.k)out+=c32txt(188,yK-13,o.k,11.5,false);
  if(o.p)out+=c32txt(275,yP-13,o.p,12,true);
  if(o.ea){
    out+='<line x1="150" y1="'+fmt(yR,1)+'" x2="150" y2="'+fmt(yK,1)+'" stroke="#b3541e" stroke-width="1.8"/>';
    out+='<path d="M150 '+fmt(yK,1)+' l-4 7 l8 0 Z" fill="#b3541e"/>';
    out+='<path d="M150 '+fmt(yR,1)+' l-4 -7 l8 0 Z" fill="#b3541e"/>';
    out+=c32txt(158,(yR+yK)/2,o.ea,11,false,"start","#b3541e");
  }
  if(o.dh){
    out+='<line x1="252" y1="'+fmt(yR,1)+'" x2="310" y2="'+fmt(yR,1)+'" stroke="#2e7d4f" stroke-width="1.2" stroke-dasharray="4 3"/>';
    out+='<line x1="306" y1="'+fmt(yR,1)+'" x2="306" y2="'+fmt(yP,1)+'" stroke="#2e7d4f" stroke-width="1.8"/>';
    out+='<path d="M306 '+fmt(yP,1)+' l-4 '+(yP>yR?"-7":"7")+' l8 0 Z" fill="#2e7d4f"/>';
    out+=c32txt(300,(yR+yP)/2,o.dh,11,false,"end","#2e7d4f");
  }
  return out+'</svg>';
}
function c32catSVG(peak,drop){
  var cat=peak-drop;
  var W=340,H=238,yR=158,yP=182,yK=46;
  var yC=yR-(yR-yK)*(cat/peak); if(yC<yK+18)yC=yK+18;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Potential energy diagram with and without a catalyst">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Potential energy (kJ)",11.5,false);
  out+=c32txt(182,220,"Reaction progress",11.5,false);
  out+='<path d="M66 '+yR+' L118 '+yR+' C150 '+yR+' 164 '+yK+' 188 '+yK+' C212 '+yK+' 226 '+yP+' 248 '+yP+' L302 '+yP+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+='<path d="M66 '+yR+' L118 '+yR+' C150 '+yR+' 164 '+fmt(yC,1)+' 188 '+fmt(yC,1)+' C212 '+fmt(yC,1)+' 226 '+yP+' 248 '+yP+' L302 '+yP+'" fill="none" stroke="#b3541e" stroke-width="2" stroke-dasharray="6 4"/>';
  out+=c32txt(92,yR-13,"Reactants",12,true);
  out+=c32txt(275,yP-13,"Products",12,true);
  out+=c32txt(188,yK-13,"Peak without catalyst: "+peak+" kJ",11.5,false);
  out+=c32txt(238,yC-12,"Peak with catalyst: "+cat+" kJ",11.5,false,"middle","#b3541e");
  return out+'</svg>';
}
function c32smooth(pts){
  var d="M"+fmt(pts[0][0],1)+" "+fmt(pts[0][1],1);
  for(var i=0;i<pts.length-1;i++){
    var p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
    var c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6];
    var c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
    d+="C"+fmt(c1[0],1)+" "+fmt(c1[1],1)+" "+fmt(c2[0],1)+" "+fmt(c2[1],1)+" "+fmt(p2[0],1)+" "+fmt(p2[1],1);
  }
  return d;
}
function c32titrSVG(dir,xlab){
  var W=340,H=248;
  function X(v){return 52+v/100*262;}
  function Y(ph){return 212-(ph/14)*178;}
  var keys=(dir==="rising")?
    [[0,3.0],[18,4.0],[38,4.8],[50,5.8],[54,6.8],[58,9.0],[63,10.8],[82,11.9],[100,12.4]]:
    [[0,11.6],[18,10.6],[38,9.6],[50,8.4],[56,6.2],[59,5.0],[64,3.8],[82,2.8],[100,2.3]];
  var pts=keys.map(function(k){return [X(k[0]),Y(k[1])];});
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Titration curve">';
  [0,7,14].forEach(function(ph){
    out+='<line x1="52" y1="'+fmt(Y(ph),1)+'" x2="314" y2="'+fmt(Y(ph),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    out+=c32txt(42,Y(ph),String(ph),10.5,false,"end");
  });
  out+='<line x1="52" y1="24" x2="52" y2="212" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="52" y1="212" x2="314" y2="212" stroke="#17352a" stroke-width="1.4"/>';
  out+='<path d="'+c32smooth(pts)+'" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  out+=c32txt(30,26,"pH",12,true);
  out+=c32txt(183,234,xlab,11.5,false);
  return out+'</svg>';
}
function c32heatSVG(){
  var W=340,H=238;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Heating curve">';
  out+='<line x1="46" y1="20" x2="46" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+='<line x1="46" y1="200" x2="318" y2="200" stroke="#17352a" stroke-width="1.4"/>';
  out+=c32txt(170,12,"Temperature",11.5,false);
  out+=c32txt(182,220,"Heat added",11.5,false);
  out+='<polyline points="58,188 100,152 158,152 208,96 266,96 310,58" fill="none" stroke="#17352a" stroke-width="2.2"/>';
  return out+'</svg>';
}
function c32cellSVG(lLab,lIon,rLab,rIon,saltLab){
  var W=360,H=254;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Galvanic cell diagram">';
  out+='<rect x="37" y="140" width="116" height="73" fill="#dceef7"/>';
  out+='<rect x="207" y="140" width="116" height="73" fill="#dceef7"/>';
  out+='<path d="M128 152 L128 96 L232 96 L232 152" fill="none" stroke="#c98a2d" stroke-width="9" stroke-linecap="round" opacity="0.65"/>';
  out+='<path d="M35 108 L35 215 L155 215 L155 108" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<path d="M205 108 L205 215 L325 215 L325 108" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="86" y="52" width="13" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<rect x="261" y="52" width="13" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<path d="M92 52 L92 38 L267 38 L267 52" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<circle cx="180" cy="38" r="13" fill="#ffffff" stroke="#17352a" stroke-width="1.8"/>';
  out+=c32txt(180,38,"V",12,true);
  out+=c32txt(180,82,saltLab,11.5,true);
  out+=c32txt(95,178,lIon,11,false);
  out+=c32txt(265,178,rIon,11,false);
  out+=c32txt(95,234,lLab,12,true);
  out+=c32txt(265,234,rLab,12,true);
  return out+'</svg>';
}
function c32electroSVG(name){
  var short=name.split(" (")[0];
  var W=340,H=254;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electrolytic cell diagram">';
  out+='<rect x="72" y="146" width="196" height="67" fill="#f3d9b0"/>';
  out+='<path d="M70 118 L70 215 L270 215 L270 118" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<rect x="118" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<rect x="208" y="58" width="12" height="104" fill="#b9c4cc" stroke="#17352a" stroke-width="1.6"/>';
  out+='<path d="M124 58 L124 40 L172 40" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<path d="M188 40 L214 40 L214 58" fill="none" stroke="#17352a" stroke-width="2"/>';
  out+='<line x1="172" y1="25" x2="172" y2="55" stroke="#17352a" stroke-width="3"/>';
  out+='<line x1="188" y1="33" x2="188" y2="47" stroke="#17352a" stroke-width="6"/>';
  out+=c32txt(170,184,"Molten "+short,12,true);
  out+=c32txt(124,234,"Electrode",12,true);
  out+=c32txt(214,234,"Electrode",12,true);
  return out+'</svg>';
}

/* ---------- 5.1 Collision theory ---------- */

E("u1-51-collision-conditions",1,["5.1"],1,"gen",function(){
  var f=pick(["heat","concentrate","grind","catalyst"]);
  if(f==="heat"){
    var t1=ri(15,35),t2=t1+ri(15,40);
    return mcq("A reaction mixture is heated from "+t1+" \u00B0C to "+t2+" \u00B0C. What happens to the collisions between the reactant particles?",
      "They collide more often, and a larger fraction of the collisions have enough energy to react",
      ["They collide more often, but the fraction with enough energy to react stays the same",
       "They collide at the same rate, but each collision is weaker",
       "They collide less often, because the particles spread farther apart"],
      "Heating raises the average kinetic energy of the particles. They move faster, so collisions happen more often, and more importantly a larger fraction of those collisions reach the activation energy, so more of them are successful. They collide more often, and a larger fraction of the collisions have enough energy to react.",{f:f});
  }
  if(f==="concentrate"){
    var c1=pick([0.100,0.200,0.250,0.500]),c2=c1*2;
    return mcq("The concentration of a reactant in solution is raised from "+gF(c1)+" mol/L to "+gF(c2)+" mol/L. What happens to the collisions between the reactant particles?",
      "There are more particles in each litre, so collisions happen more often and successful collisions happen more often",
      ["Each particle has more energy, so the same number of collisions produces more reactions",
       "Collisions happen less often, because the particles get in each other's way",
       "Nothing changes, because concentration does not affect collisions"],
      "Doubling the concentration puts twice as many particles in the same volume. Particles meet more often, so both the total number of collisions and the number of successful collisions per second increase. There are more particles in each litre, so collisions happen more often and successful collisions happen more often.",{f:f});
  }
  if(f==="grind"){
    var m=ri(2,20);
    return mcq("A "+m+" g lump of a solid reactant is ground into a fine powder before it is added to a solution. What happens to the collisions between the reactant particles?",
      "Far more solid particles are exposed at the surface, so collisions with the solution happen far more often",
      ["The particles inside the lump gain energy and collide harder",
       "The powder particles are smaller, so each collision has less energy and fewer succeed",
       "Nothing changes, because the mass of solid is the same"],
      "Only particles at the surface of a solid can collide with particles in the solution. Grinding exposes far more particles at the surface, so collisions happen far more often and the reaction speeds up. Far more solid particles are exposed at the surface, so collisions with the solution happen far more often.",{f:f});
  }
  var cat=pick(["manganese(IV) oxide","iron filings","a platinum surface","copper(II) ions"]);
  return mcq(cat.charAt(0).toUpperCase()+cat.slice(1)+" is added as a catalyst. What happens to the collisions between the reactant particles?",
    "The collision rate is about the same, but a larger fraction of collisions succeed because the activation energy is lower",
    ["The particles collide far more often, because the catalyst pushes them together",
     "Each collision has more energy, because the catalyst heats the mixture",
     "Fewer collisions are needed because the catalyst is used up as the reaction proceeds"],
    "A catalyst does not change how often particles collide or how much energy they carry. It provides a different pathway with a lower activation energy, so a larger fraction of the collisions that do happen are successful. The collision rate is about the same, but a larger fraction of collisions succeed because the activation energy is lower.",{f:f});
});

E("u1-51-successful-collision",1,["5.1"],1,"var",varset([
  function(){
    return mcq("According to collision theory, a collision between two reactant particles produces a reaction only if the particles",
      "Collide with the correct orientation and with energy at least equal to the activation energy",
      ["Collide at exactly the same speed",
       "Collide any number of times in a row",
       "Are both in the gas state"],
      "Collision theory requires two things of a successful collision: the particles must meet in the correct orientation, and the energy of the collision must be at least the activation energy. Meeting either condition alone is not enough. A successful collision needs the correct orientation and energy at least equal to the activation energy.",{});
  },
  function(){
    return mcq("Two particles collide head-on with more than enough energy to react, but the wrong atoms touch first and nothing happens. Collision theory explains this because",
      "The collision had the wrong orientation, so it was not a successful collision",
      ["The particles needed to collide a second time",
       "The activation energy increased during the collision",
       "Energy alone always decides whether a collision succeeds"],
      "Energy is only half of the requirement. The particles must also meet with the correct orientation so that the right bonds can break and form. A high-energy collision with the wrong orientation is still an unsuccessful collision.",{});
  },
  function(){
    return mcq("The activation energy of a reaction is best described as",
      "The minimum collision energy needed for a collision to be successful",
      ["The total energy released by the reaction",
       "The energy of the products minus the energy of the reactants",
       "The average kinetic energy of the particles at room temperature"],
      "The activation energy is the energy barrier a collision must clear: only collisions with at least this much energy can succeed. It is not the overall energy change of the reaction, which is the difference between products and reactants.",{});
  },
  function(){
    return mcq("Most collisions between reactant particles in a typical reaction mixture do NOT lead to a reaction because",
      "Most collisions lack either the energy or the orientation needed to succeed",
      ["The particles are too far apart to collide at all",
       "Collisions destroy the reactant particles",
       "The particles bounce off each other without ever touching"],
      "Particles in a mixture collide constantly. Only a small fraction of those collisions combine enough energy, at least the activation energy, with the correct orientation. The rest simply bounce apart unchanged.",{});
  }
]));

E("u1-51-rate-explain",1,["5.1"],2,"var",varset([
  function(){
    var m=pick([2,3,5,8,10]);
    return mcq("A student reacts "+m+" g of zinc granules with dilute sulfuric acid, then repeats the experiment with "+m+" g of powdered zinc in the same acid at the same temperature. The powder reacts much faster. Which statement correctly explains this using collision theory?",
      "The powdered zinc exposes far more particles at its surface, so collisions between zinc and acid particles happen far more often, and successful collisions happen far more often",
      ["The surface area increased, and that is all that needs to be said",
       "The equilibrium shifts toward the products, so more product forms per second",
       "The powder lowers the activation energy of the reaction"],
      "A collision theory explanation has to talk about collisions: how often particles meet, and what fraction of the meetings succeed. Only surface particles of the zinc can collide with the acid, and the powder exposes far more of them, so successful collisions happen far more often. The powdered zinc exposes far more particles at its surface, so collisions happen far more often.",{});
  },
  function(){
    var t1=pick([20,22,25,28]),t2=pick([2,4,5]);
    return mcq("A cut potato left on a counter at "+t1+" \u00B0C browns within hours, while the same potato kept in a refrigerator at "+t2+" \u00B0C browns far more slowly. Which statement correctly explains this using collision theory?",
      "At the lower temperature the particles have less kinetic energy, so collisions happen less often and a smaller fraction of them reach the activation energy",
      ["The cold destroys the activation energy, so no collisions can succeed",
       "The equilibrium shifts toward the reactants in the cold, so browning stops",
       "The temperature changed, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. At the lower temperature the particles move more slowly and carry less energy: collisions are less frequent, and a smaller fraction of them reach the activation energy, so successful collisions and the rate both fall. At the lower temperature, successful collisions happen less often.",{});
  },
  function(){
    var v=pick([10,15,20,30]);
    return mcq("Hydrogen peroxide solution decomposes very slowly in a "+v+" mL bottle, but it bubbles vigorously when a drop of blood, which contains a natural catalyst, touches it on a cut. Which statement correctly explains this using collision theory?",
      "The catalyst gives the reaction a pathway with a lower activation energy, so a much larger fraction of the collisions are successful, even though collisions happen at about the same rate",
      ["The catalyst makes the particles collide far more often by stirring the mixture",
       "The catalyst is consumed, and being used up pulls the reaction forward",
       "The temperature rises, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions and about what fraction of them succeed. The catalyst does not change the collision rate or the particle energies: it lowers the activation energy, so a much larger fraction of the collisions that occur are successful. The catalyst gives a pathway with a lower activation energy.",{});
  },
  function(){
    var f1=pick([2,3,4]),f2=f1*2;
    return mcq("A furnace burns natural gas steadily with the valve set so "+f1+" L of gas flows in per minute. The valve is opened so "+f2+" L per minute flows into the same burner volume, and the flame burns more vigorously. Which statement correctly explains this using collision theory?",
      "With more gas particles in the same volume, collisions between gas and oxygen particles happen more often, so successful collisions happen more often",
      ["Each gas particle now has more energy, so the same collisions succeed more often",
       "The equilibrium shifts toward the products, so more product forms per second",
       "The concentration changed, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. Doubling the number of particles in the same volume doubles how often they meet, so successful collisions happen more often and the rate rises. With more particles in the same volume, collisions happen more often.",{});
  },
  function(){
    var m=pick([1,2,3,5]);
    return mcq("An effervescent tablet of mass "+m+" g fizzes in water. A second, identical tablet is crushed to a powder first, and it fizzes away much faster. Which statement correctly explains this using collision theory?",
      "Crushing exposes far more particles at the surface of the tablet, so collisions between the tablet particles and water happen far more often",
      ["The powder has a lower activation energy than the tablet",
       "Crushing increases the temperature of the tablet particles",
       "The surface area increased, and that is all that needs to be said"],
      "A collision theory explanation has to talk about collisions. Only the surface particles of the tablet can meet the water, and crushing exposes far more of them, so collisions and successful collisions happen far more often. Crushing exposes far more particles at the surface, so collisions happen far more often.",{});
  }
]));

E("u1-51-temperature-effect",1,["5.1"],2,"gen",function(){
  var rise=pick([10,10,20]),factor=rise===20?"about four times":"about double";
  var base=ri(10,40);
  return mcq("For many reactions, raising the temperature from "+base+" \u00B0C by "+rise+" \u00B0C makes the reaction run "+factor+" as fast. Which statement best explains why the effect of temperature is so large?",
    "Particles collide slightly more often, but the main effect is that a much larger fraction of collisions reach the activation energy",
    ["Particles collide "+factor+" as often, and the fraction reaching the activation energy is unchanged",
     "The activation energy falls as temperature rises, so the same collisions succeed more easily",
     "The reaction becomes more exothermic at higher temperatures, so it releases energy faster"],
    "Collision frequency rises only modestly with temperature. The large effect comes from the energy distribution: at the higher temperature a much larger fraction of collisions carry at least the activation energy, so far more collisions succeed. Particles collide slightly more often, but the main effect is that a much larger fraction of collisions reach the activation energy.",{rise:rise,base:base});
});

E("u1-51-catalyst-collision",1,["5.1"],2,"var",varset([
  function(){
    return mcq("Manganese(IV) oxide is added as a catalyst to the decomposition of hydrogen peroxide at a constant temperature. Which statement is correct?",
      "The catalyst provides a pathway with a lower activation energy, so a larger fraction of collisions are successful",
      ["The catalyst increases the kinetic energy of the particles, so collisions are harder",
       "The catalyst is slowly used up, which pulls the reaction forward",
       "The catalyst raises the temperature of the mixture, which speeds up the collisions"],
      "A catalyst works by giving the reaction a different mechanism whose activation energy is lower. The particles have the same energies as before, but now a larger fraction of their collisions clear the smaller barrier. The catalyst itself is regenerated, not used up. The catalyst provides a pathway with a lower activation energy, so a larger fraction of collisions are successful.",{});
  },
  function(){
    return mcq("Ethene reacts with hydrogen over a heated nickel catalyst. Which statement about the catalyst is correct?",
      "It lowers the activation energy, so more of the collisions between ethene and hydrogen succeed",
      ["It raises the kinetic energy of the gas particles",
       "It is converted into product as the reaction proceeds",
       "It works by increasing the pressure inside the reactor"],
      "The nickel surface gives the reaction a lower-energy pathway. Particle energies and collision frequency are set by temperature and concentration, not by the catalyst. The catalyst is not consumed. It lowers the activation energy, so more collisions succeed.",{});
  },
  function(){
    return mcq("A catalytic converter uses platinum to speed up the breakdown of nitrogen oxides in exhaust gases. The platinum speeds the reaction because",
      "It provides an alternative pathway with a lower activation energy",
      ["It heats the exhaust gases to a higher temperature",
       "It forces the gas particles to collide more violently",
       "It is gradually consumed, releasing energy as it goes"],
      "Catalysts act on the energy barrier, not on the particles. The platinum offers a route with a lower activation energy, so a larger fraction of collisions succeed at the same temperature. It provides an alternative pathway with a lower activation energy.",{});
  },
  function(){
    return mcq("Sulfur dioxide is converted to sulfur trioxide over a vanadium(V) oxide catalyst. Which statement is correct?",
      "With the catalyst present, a larger fraction of collisions have enough energy to react, because the barrier is lower",
      ["With the catalyst present, the particles collide more times per second",
       "With the catalyst present, each particle carries more kinetic energy",
       "With the catalyst present, the reaction needs no collisions at all"],
      "Temperature and concentration set how often particles collide and how much energy they carry. The catalyst changes the barrier: with a lower activation energy, more of the collisions that happen are successful. A larger fraction of collisions succeed, because the barrier is lower.",{});
  }
]));

/* ---------- 5.2 Factors that affect reaction rate ---------- */

E("u1-52-factor-effect",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Which change will increase the rate of the reaction between marble chips and hydrochloric acid?",
      "Using smaller marble chips",
      ["Using larger marble chips","Diluting the acid with water","Cooling the acid in a fridge"],
      "Reaction rate is raised by anything that produces more successful collisions per second: higher temperature, higher concentration, more exposed surface area, or a catalyst. Only one of the listed changes does that here: <b>using smaller marble chips</b>, which increases the exposed surface area.",{});
  },
  function(){
    return mcq("Which change will increase the rate at which hydrogen peroxide solution decomposes?",
      "Warming the solution",
      ["Cooling the solution","Diluting the solution with water","Storing it in a larger bottle"],
      "Reaction rate is raised by anything that produces more successful collisions per second. Warming the solution gives the particles more energy, so a larger fraction of collisions succeed. The other changes slow the reaction down or do nothing.",{});
  },
  function(){
    return mcq("Which change will increase the rate of a reaction between two solutions?",
      "Using more concentrated solutions",
      ["Diluting both solutions","Cooling both solutions","Carrying out the reaction in a wider beaker"],
      "More concentrated solutions hold more particles per litre, so collisions happen more often. Diluting or cooling slows the reaction, and the width of the beaker changes nothing. <b>Using more concentrated solutions</b>.",{});
  },
  function(){
    return mcq("Which change will increase the rate at which a strip of magnesium reacts with an acid?",
      "Using a more concentrated acid",
      ["Using a shorter strip of magnesium","Cooling the acid","Adding water to the acid"],
      "A more concentrated acid puts more acid particles in each litre, so collisions with the magnesium surface happen more often. Cooling the acid or diluting it slows the reaction. <b>Using a more concentrated acid</b>.",{});
  },
  function(){
    return mcq("Which change will increase the rate of a slow reaction between two gases in a sealed vessel?",
      "Adding a suitable catalyst",
      ["Expanding the vessel to a larger volume","Cooling the vessel in ice water","Letting some of the gas escape"],
      "A catalyst lowers the activation energy, so a larger fraction of collisions succeed. Expanding the vessel lowers the concentration, cooling lowers the energy of the particles, and losing gas lowers the amount reacting. <b>Adding a suitable catalyst</b>.",{});
  }
]));

E("u1-52-rate-scenario",1,["5.2"],2,"gen",function(){
  var acid=pick(["hydrochloric acid","sulfuric acid","nitric acid"]);
  var metal=pick(["zinc","magnesium","iron"]);
  var hi=pick([1.00,2.00]),lo=hi/2,t1=ri(35,50),t2=ri(15,25);
  var sets=[
    {d:"powdered "+metal+", "+gF(hi)+" mol/L "+acid+", "+t1+" \u00B0C",rank:3},
    {d:"powdered "+metal+", "+gF(lo)+" mol/L "+acid+", "+t1+" \u00B0C",rank:2},
    {d:metal+" granules, "+gF(hi)+" mol/L "+acid+", "+t2+" \u00B0C",rank:1},
    {d:metal+" granules, "+gF(lo)+" mol/L "+acid+", "+t2+" \u00B0C",rank:0}
  ];
  var correct=sets[0].d;
  var ds=shuffle(sets.slice(1).map(function(x){return x.d;}));
  return mcq("Four experiments react "+metal+" with "+acid+" under different conditions. Which experiment has the fastest initial rate?",correct,ds,
    "Rate increases with surface area, concentration and temperature, and the first experiment is highest in all three: powdered metal (most surface), "+gF(hi)+" mol/L acid (most concentrated) and "+t1+" \u00B0C (warmest). It has the most successful collisions per second, so it is fastest.",{});
});

E("u1-52-not-a-factor",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Carrying out the reaction in a blue glass flask instead of a clear one",
      ["Raising the temperature of the reactants","Increasing the concentration of one reactant","Adding a catalyst"],
      "Rate depends on successful collisions: temperature, concentration, surface area and catalysts all change them. The colour of the glass touches none of these, so the rate is unaffected.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Stirring the finished product mixture after the reaction is complete",
      ["Grinding a solid reactant to a powder","Warming the reaction mixture","Using a more concentrated solution"],
      "Once the reaction is complete there are no reactant collisions left to change. Grinding, warming and concentrating all act on reactant collisions during the reaction.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Changing the colour of the indicator used to watch the reaction",
      ["Increasing the surface area of a solid reactant","Raising the temperature","Adding a catalyst"],
      "An indicator only reports on the reaction; it does not change the particles, their energies or their collisions. Surface area, temperature and catalysts all change the rate.",{});
  },
  function(){
    return mcq("Which change will NOT affect the rate of a chemical reaction?",
      "Doing the reaction on a taller bench",
      ["Crushing a solid reactant before adding it","Using a catalyst","Heating the reaction mixture"],
      "The height of the bench changes nothing about the reacting particles. Crushing, catalysts and heating all change the number of successful collisions per second.",{});
  }
]));

E("u1-52-initial-rate-compare",1,["5.2"],2,"gen",function(){
  var f=pick(["conc","temp","area"]);
  if(f==="conc"){
    var cA=pick([0.500,1.00,2.00]),cB=cA/2;
    return mcq("Experiment A uses "+gF(cA)+" mol/L acid and Experiment B uses "+gF(cB)+" mol/L of the same acid, with the same metal, mass and temperature. Which statement is correct?",
      "A has the faster initial rate, because more acid particles per litre means more frequent collisions",
      ["B has the faster initial rate, because its particles have more room to move",
       "Both rates are equal, because the same total amount of metal is present",
       "B has the faster initial rate, because dilute solutions react more completely"],
      "With everything else equal, the more concentrated acid has more particles in each litre, so collisions with the metal surface happen more often and the initial rate is higher. A has the faster initial rate, because more acid particles per litre means more frequent collisions.",{f:f});
  }
  if(f==="temp"){
    var tA=ri(40,60),tB=tA-ri(15,25);
    return mcq("Experiment A runs at "+tA+" \u00B0C and Experiment B at "+tB+" \u00B0C, with all other conditions identical. Which statement is correct?",
      "A has the faster initial rate, because a larger fraction of its collisions reach the activation energy",
      ["B has the faster initial rate, because cooler particles collide more gently and stick together",
       "Both rates are equal, because temperature changes only the amount of product",
       "B has the faster initial rate, because the activation energy is higher at lower temperatures"],
      "At the higher temperature the particles carry more energy, so a larger fraction of collisions reach the activation energy and succeed. A has the faster initial rate, because a larger fraction of its collisions reach the activation energy.",{f:f});
  }
  var mA=ri(2,6);
  return mcq("Experiment A uses "+mA+" g of a solid as one lump and Experiment B uses "+mA+" g of the same solid as a powder, in the same solution at the same temperature. Which statement is correct?",
    "B has the faster initial rate, because far more of its particles are exposed at the surface",
    ["A has the faster initial rate, because a lump holds its energy better",
     "Both rates are equal, because the masses of solid are the same",
     "A has the faster initial rate, because powder particles are too small to collide properly"],
    "Only surface particles of a solid can collide with the solution. The powder exposes far more particles, so collisions happen far more often even though the mass is identical. B has the faster initial rate, because far more of its particles are exposed at the surface.",{f:f});
});

E("u1-52-nature-of-reactants",1,["5.2"],2,"var",varset([
  function(){
    return mcq("Silver nitrate solution and sodium chloride solution react almost instantly when mixed, while a lump of coal takes hours to burn away. Which statement best explains the difference?",
      "The solutions already contain separated ions, so no bonds have to be broken before new ones form; the coal reaction must break strong bonds first",
      ["The solutions are liquids and liquids always react faster than solids",
       "The coal reaction is slower because coal is a darker colour",
       "The solutions contain a hidden catalyst that the coal lacks"],
      "The nature of the reactants matters because it decides what a collision has to accomplish. <b>The solutions already contain separated ions, so no bonds have to be broken before new ones form; the coal reaction must break strong bonds first</b>.",{});
  },
  function(){
    return mcq("A precipitation reaction between two solutions is over in seconds, but rusting of an iron gate takes years. Which statement best explains the difference?",
      "In the solutions the ions are already separated and free to collide, while rusting requires breaking bonds in the iron and in oxygen molecules",
      ["Rusting is slower because iron is a metal and metals do not react",
       "The precipitation involves more particles, and more particles always means a slower start",
       "The gate is outdoors, and outdoor reactions are always slower"],
      "The nature of the reactants matters because it decides what a collision has to accomplish. <b>In the solutions the ions are already separated and free to collide, while rusting requires breaking bonds in the iron and in oxygen molecules</b>.",{});
  },
  function(){
    return mcq("A mixture of hydrogen and oxygen gas can sit unchanged for years, yet a single spark makes it explode. Which statement best explains the very slow rate before the spark?",
      "The strong bonds in the hydrogen and oxygen molecules give the reaction a high activation energy, so almost no ordinary collisions succeed",
      ["The gases do not collide with each other at room temperature",
       "Hydrogen and oxygen are both nonpolar, so they cannot react",
       "The reaction is slow because the mixture is not concentrated enough"],
      "The particles collide constantly, but the activation energy is high because strong covalent bonds must break, so hardly any collisions succeed without the extra energy of a spark. <b>The strong bonds give the reaction a high activation energy</b>.",{});
  },
  function(){
    return mcq("Magnesium ribbon bursts into flame in oxygen, while a copper strip only tarnishes slowly in air over months. Which statement best explains the difference?",
      "The two metals differ in how readily their atoms give up electrons and form new bonds, so their collisions with oxygen succeed at very different rates",
      ["Copper is heavier, so its particles move too slowly to collide",
       "Magnesium reacts faster because it is a lighter colour",
       "Copper does not react with oxygen at all, so no comparison is possible"],
      "The nature of the reactants is itself a rate factor: different substances present different bonds and electron arrangements to a collision, so the fraction of successful collisions differs greatly. <b>The two metals differ in reactivity, so their collisions with oxygen succeed at very different rates</b>.",{});
  }
]));

/* ---------- 5.3 Potential energy diagrams ---------- */

E("u1-53-diagram-read",1,["5.3"],1,"gen",function(){
  var exo=Math.random()<0.6;
  var R=pick([40,50,60,80,100]),rise=pick([60,75,90,120,150]),P=R+rise;
  var Pr=exo?R-pick([20,30,45,70]):R+pick([15,25,40,55]);
  var ask=pick(["ea","earev","dh","type"]);
  var ea=P-R,earev=P-Pr,dh=Pr-R;
  var q;
  var desc="On a potential energy diagram, the reactants sit at "+R+" kJ, the top of the energy barrier is at "+P+" kJ, and the products sit at "+Pr+" kJ. ";
  if(ask==="ea")q=mcq(desc+"What is the activation energy of the forward reaction?",ea+" kJ",[earev+" kJ",Math.abs(dh)+" kJ",(P)+" kJ"],"The activation energy is the rise from the reactants to the top of the barrier: "+P+" kJ - "+R+" kJ = <b>"+ea+" kJ</b>.",{ask:ask});
  if(ask==="earev")q=mcq(desc+"What is the activation energy of the reverse reaction?",earev+" kJ",[ea+" kJ",Math.abs(dh)+" kJ",(P)+" kJ"],"The reverse activation energy is the rise from the products back to the top of the barrier: "+P+" kJ - "+Pr+" kJ = <b>"+earev+" kJ</b>.",{ask:ask});
  if(ask==="dh")q=mcq(desc+"What is the value of \u0394H for the forward reaction?",(dh>0?"+":"")+dh+" kJ",[(dh>0?"-":"+")+Math.abs(dh)+" kJ",ea+" kJ",earev+" kJ"],"\u0394H is the energy of the products minus the energy of the reactants: "+Pr+" kJ - "+R+" kJ = <b>"+(dh>0?"+":"")+dh+" kJ</b>. The sign is part of the answer.",{ask:ask});
  var correct=exo?"Exothermic, because the products are lower in energy than the reactants":"Endothermic, because the products are higher in energy than the reactants";
  var wrong=exo?"Endothermic, because the products are higher in energy than the reactants":"Exothermic, because the products are lower in energy than the reactants";
  if(ask==="type")q=mcq(desc+"How should the forward reaction be classified?",correct,[wrong,"Exothermic, because the barrier is high","Endothermic, because the barrier is low"],"Classification follows the relative energies of reactants and products, not the height of the barrier. <b>"+correct+"</b>.",{ask:ask});
  q.figure=c32peSVG(R,P,Pr,{r:"Reactants: "+R+" kJ",k:"Barrier top: "+P+" kJ",p:"Products: "+Pr+" kJ"});
  return q;
});

E("u1-53-ea-reverse",1,["5.3"],2,"gen",function(){
  var ea=pick([50,64,80,95,120,145,180,210]);
  var dh=pick([-160,-120,-85,-60,-40,-25,30,45,70,110]);
  if(dh>0&&dh>=ea)dh=ea-25;
  var earev=sfR(ea-dh,4);
  var ans=sfR(earev,3);
  var q=numq("A reaction has an activation energy of "+ea+" kJ for the forward reaction and \u0394H = "+(dh>0?"+":"")+dh+" kJ. Calculate the activation energy of the reverse reaction. Give your answer in kJ.",
    ans,Math.max(1,Math.abs(ans)*0.02),
    "The reverse barrier is measured from the products. On the diagram, Ea(reverse) = Ea(forward) - \u0394H = "+ea+" kJ - ("+(dh>0?"+":"")+dh+" kJ) = "+iF(earev)+" kJ. The activation energy of the reverse reaction is <b>"+F3(ans)+" kJ</b>.",{ea:ea,dh:dh});
  q.figure=c32peSVG(0,ea,dh,{r:"Reactants",p:"Products",ea:"Ea (forward) = "+ea+" kJ",dh:"\u0394H = "+(dh>0?"+":"")+dh+" kJ"});
  return q;
});

E("u1-53-delta-h",1,["5.3"],2,"gen",function(){
  var R=pick([120,150,200,240,300,360]);
  var d=pick([-95,-70,-55,-40,-28,35,50,65,90]);
  var Pr=R+d;
  var ans=sfR(d,3);
  var q=numq("On a potential energy diagram the reactants of a reaction sit at "+R+" kJ and the products sit at "+Pr+" kJ. Calculate \u0394H for the reaction. Give your answer in kJ.",
    ans,1,
    "\u0394H = energy of products - energy of reactants = "+Pr+" kJ - "+R+" kJ = "+(d>0?"+":"")+iF(d)+" kJ. So \u0394H = <b>"+(d>0?"+":"")+F3(d)+" kJ</b>"+(d<0?", and the reaction is exothermic.":", and the reaction is endothermic."),{R:R,Pr:Pr});
  q.figure=c32peSVG(R,Math.max(R,Pr)+60,Pr,{r:"Reactants: "+R+" kJ",p:"Products: "+Pr+" kJ"});
  return q;
});

E("u1-53-exo-endo",1,["5.3"],1,"var",varset([
  function(){
    var dh=pick([-184,-112,-57,-286,-890]);
    var q=mcq("A reaction has \u0394H = "+dh+" kJ. Which statement is correct?",
      "The reaction is exothermic and the surroundings warm up",
      ["The reaction is endothermic and the surroundings warm up","The reaction is exothermic and the surroundings cool down","The reaction is endothermic and the surroundings cool down"],
      "A negative \u0394H means the products hold less energy than the reactants; the difference is released to the surroundings, which warm up. The reaction is exothermic.",{dh:dh}); q.figure=c32peSVG(0,Math.max(0,dh)+60,dh,{r:"Reactants",p:"Products",dh:"\u0394H = "+dh+" kJ"}); return q;
  },
  function(){
    var dh=pick([44,57,92,131,178]);
    var q=mcq("A reaction has \u0394H = +"+dh+" kJ. Which statement is correct?",
      "The reaction is endothermic and the surroundings cool down",
      ["The reaction is exothermic and the surroundings cool down","The reaction is endothermic and the surroundings warm up","The reaction is exothermic and the surroundings warm up"],
      "A positive \u0394H means the products hold more energy than the reactants; the extra energy is taken in from the surroundings, which cool down. The reaction is endothermic.",{dh:dh}); q.figure=c32peSVG(0,Math.max(0,dh)+60,dh,{r:"Reactants",p:"Products",dh:"\u0394H = +"+dh+" kJ"}); return q;
  },
  function(){
    return mcq("In an experiment, a reacting mixture makes the beaker feel cold. Which statement is correct?",
      "The reaction is endothermic: it takes in energy from the surroundings",
      ["The reaction is exothermic: it gives out energy to the surroundings","The reaction is endothermic: it gives out energy to the surroundings","The reaction is exothermic: it takes in energy from the surroundings"],
      "The beaker feels cold because the reaction is drawing energy out of its surroundings, including the glass and your hand. Taking in energy is endothermic.",{});
  },
  function(){
    var rise=pick([3,5,8,12]);
    return mcq("When two solutions are mixed in a foam cup, the temperature of the mixture rises by "+rise+" \u00B0C. Which statement is correct?",
      "The reaction is exothermic: it gives out energy to the surroundings",
      ["The reaction is endothermic: it gives out energy to the surroundings","The reaction is exothermic: it takes in energy from the surroundings","No energy change occurred, because the cup is insulated"],
      "The surroundings, here the solution itself, gained energy, so the reaction must have released it. Releasing energy is exothermic.",{rise:rise});
  }
]));

E("u1-53-catalyst-diagram",1,["5.3"],2,"gen",function(){
  var drop=pick([20,30,40,55,70]);
  var peak=pick([90,120,150,180,210,240,280,320]);
  var t=ri(15,35);
  var q=mcq("At "+t+" \u00B0C, a catalyst is added to a reaction whose potential energy diagram has its barrier peak at "+peak+" kJ. With the catalyst, the top of the barrier drops by "+drop+" kJ. What happens to \u0394H and to the activation energy of the reverse reaction?",
    "\u0394H is unchanged, and the reverse activation energy also drops by "+drop+" kJ",
    ["\u0394H drops by "+drop+" kJ, and the reverse activation energy is unchanged",
     "\u0394H is unchanged, and the reverse activation energy rises by "+drop+" kJ",
     "Both \u0394H and the reverse activation energy rise by "+drop+" kJ"],
    "A catalyst lowers the peak of the diagram but moves neither the reactant level nor the product level, so \u0394H, the gap between those levels, is unchanged. Both the forward and reverse barriers are measured to the same peak, so both drop by "+drop+" kJ. \u0394H is unchanged, and the reverse activation energy also drops by "+drop+" kJ.",{drop:drop});
  q.figure=c32catSVG(peak,drop);
  return q;
});

E("u1-53-activated-complex",1,["5.3"],1,"var",varset([
  function(){
    var q=mcq("The activated complex in a reaction is best described as",
      "The unstable, high-energy arrangement of atoms at the top of the energy barrier",
      ["The final product of the reaction before it cools down",
       "The catalyst while it is attached to a reactant",
       "The mixture of reactants before any collisions happen"],
      "As a successful collision proceeds, the particles pass through a short-lived, high-energy arrangement called the activated complex, at the peak of the potential energy diagram. From there the arrangement falls apart into products, or back into reactants.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  },
  function(){
    var q=mcq("On a potential energy diagram, the activated complex is located",
      "At the highest point of the curve, between reactants and products",
      ["At the starting level of the reactants",
       "At the final level of the products",
       "Below the axis, where the energy is negative"],
      "The curve climbs from the reactants as bonds stretch, reaches its maximum at the activated complex, then falls toward the products. The activated complex sits at the highest point of the curve.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  },
  function(){
    var q=mcq("Which statement about the activated complex is correct?",
      "It can fall apart into either the products or back into the reactants",
      ["It always goes on to form products",
       "It is a stable substance that can be bottled and stored",
       "It only forms when a catalyst is present"],
      "The activated complex is a transition state, not a stable substance. It exists for an instant at the top of the barrier and then breaks apart, forward into products or backward into reactants.",{}); q.figure=c32peSVG(0,80,-35,{r:"Reactants",p:"Products"}); return q;
  }
]));

/* ---------- 5.4 Reaction mechanisms and catalysts ---------- */

var MECHS=[
  {steps:["NO\u2082(g) + NO\u2082(g) \u2192 NO\u2083(g) + NO(g)","NO\u2083(g) + CO(g) \u2192 NO\u2082(g) + CO\u2082(g)"],inter:"NO\u2083",cat:null,overall:"NO\u2082(g) + CO(g) \u2192 NO(g) + CO\u2082(g)",wrong:["NO\u2083(g) + CO(g) \u2192 NO(g) + CO\u2082(g)","2 NO\u2082(g) + CO(g) \u2192 NO\u2083(g) + NO(g) + CO\u2082(g)","NO\u2082(g) + CO(g) \u2192 NO\u2083(g)"]},
  {steps:["O\u2083(g) \u2192 O\u2082(g) + O(g)","O(g) + O\u2083(g) \u2192 2 O\u2082(g)"],inter:"O",cat:null,overall:"2 O\u2083(g) \u2192 3 O\u2082(g)",wrong:["O\u2083(g) \u2192 O\u2082(g) + O(g)","O\u2083(g) + O(g) \u2192 2 O\u2082(g)","3 O\u2083(g) \u2192 4 O\u2082(g)"]},
  {steps:["H\u2082(g) + ICl(g) \u2192 HI(g) + HCl(g)","HI(g) + ICl(g) \u2192 HCl(g) + I\u2082(g)"],inter:"HI",cat:null,overall:"H\u2082(g) + 2 ICl(g) \u2192 2 HCl(g) + I\u2082(g)",wrong:["H\u2082(g) + ICl(g) \u2192 HI(g) + HCl(g)","H\u2082(g) + 2 ICl(g) \u2192 HI(g) + HCl(g) + I\u2082(g)","2 H\u2082(g) + 2 ICl(g) \u2192 2 HCl(g) + I\u2082(g)"]}
];
var CATMECHS=[
  {steps:["Ce\u2074\u207A(aq) + Mn\u00B2\u207A(aq) \u2192 Ce\u00B3\u207A(aq) + Mn\u00B3\u207A(aq)","Mn\u00B3\u207A(aq) + Tl\u207A(aq) \u2192 Mn\u00B2\u207A(aq) + Tl\u00B3\u207A(aq)"],cat:"Mn\u00B2\u207A",inter:"Mn\u00B3\u207A",note:"Mn\u00B2\u207A is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"},
  {steps:["I\u207B(aq) + H\u2082O\u2082(aq) \u2192 IO\u207B(aq) + H\u2082O(l)","IO\u207B(aq) + H\u2082O\u2082(aq) \u2192 I\u207B(aq) + H\u2082O(l) + O\u2082(g)"],cat:"I\u207B",inter:"IO\u207B",note:"I\u207B is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"},
  {steps:["Fe\u00B3\u207A(aq) + S\u2082O\u2083\u00B2\u207B(aq) \u2192 Fe\u00B2\u207A(aq) + S\u2082O\u2083\u207B(aq)","Fe\u00B2\u207A(aq) + S\u2082O\u2088\u00B2\u207B(aq) \u2192 Fe\u00B3\u207A(aq) + SO\u2084\u00B2\u207B(aq) + S\u2082O\u2083\u00B2\u207B(aq)"],cat:"Fe\u00B3\u207A",inter:"Fe\u00B2\u207A",note:"Fe\u00B3\u207A is consumed in the first step and regenerated in the second, which is the behaviour of a catalyst"}
];

E("u1-54-intermediate",1,["5.4"],2,"gen",function(){
  var m=pick(MECHS);
  var t=ri(15,95);
  var pool=["NO\u2082","CO\u2082","O\u2082","HCl","I\u2082","NO","CO"];
  var ds=shuffle(pool.filter(function(x){return x!==m.inter;})).slice(0,3);
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhich species is a reaction intermediate?",
    m.inter,ds,
    "An intermediate is produced in one step and consumed in a later step, so it does not appear in the overall reaction. Here "+m.inter+" is formed in step 1 and used up in step 2. The reaction intermediate is <b>"+m.inter+"</b>.",{});
});

E("u1-54-catalyst-identify",1,["5.4"],2,"gen",function(){
  var m=pick(CATMECHS);
  var t=ri(15,95);
  var ds=[m.inter,"H\u2082O","the product of the final step"];
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhich species acts as the catalyst?",
    m.cat,ds,
    "A catalyst takes part in the mechanism but is regenerated by the end, so it appears as a reactant early and as a product later. "+m.note+". The catalyst is <b>"+m.cat+"</b>.",{});
});

E("u1-54-rds",1,["5.4"],2,"gen",function(){
  var slowFirst=Math.random()<0.5;
  var m=pick(MECHS);
  var t=ri(15,95);
  var steps=slowFirst?["Step 1 (slow): "+m.steps[0],"Step 2 (fast): "+m.steps[1]]:["Step 1 (fast): "+m.steps[0],"Step 2 (slow): "+m.steps[1]];
  var ask=pick(["which","change"]);
  if(ask==="which"){
    return mcq("At "+t+" \u00B0C, a mechanism is proposed:\n"+steps[0]+"\n"+steps[1]+"\nWhich step is the rate-determining step?",
      slowFirst?"Step 1, the slow step":"Step 2, the slow step",
      [slowFirst?"Step 2, the slow step":"Step 1, the slow step","Both steps equally, because both are needed","Whichever step produces the intermediate"],
      "The slowest step in a mechanism limits the speed of the whole process, in the same way that the slowest vehicle sets the pace of a convoy. The rate-determining step is the slow step.",{});
  }
  var species=slowFirst?"a reactant in step 1":"a reactant in step 2";
  return mcq("At "+t+" \u00B0C, a mechanism is proposed:\n"+steps[0]+"\n"+steps[1]+"\nThe concentration of "+species+" is doubled. What happens to the overall rate?",
    "The overall rate increases, because that species takes part in the rate-determining step",
    ["The overall rate is unchanged, because only the fastest step responds to concentration",
     "The overall rate decreases, because the steps become unbalanced",
     "The overall rate doubles exactly, no matter which step is slow"],
    "Only the rate-determining (slow) step controls the overall rate. A species in that step appears in the rate law, so raising its concentration speeds the whole reaction. The overall rate increases, because that species takes part in the rate-determining step.",{});
});

E("u1-54-overall-reaction",1,["5.4"],2,"gen",function(){
  var m=pick(MECHS);
  var t=ri(15,95);
  return mcq("At "+t+" \u00B0C, a reaction proceeds by the mechanism:\nStep 1: "+m.steps[0]+"\nStep 2: "+m.steps[1]+"\nWhat is the overall reaction?",
    m.overall,m.wrong,
    "Add the steps together, then cancel any species that appears on both sides. The intermediate cancels completely, leaving the overall reaction: <b>"+m.overall+"</b>.",{});
});

E("u1-54-mechanism-analysis",1,["5.4"],3,"var",varset([
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: A + B \u2192 C + D (fast)\nStep 2: C + E \u2192 F + G (slow)\nStep 3: D + H \u2192 F + A (fast)\nA student claims that doubling the concentration of B will noticeably speed up the overall reaction, because B is a reactant in the first step. Is the claim correct?",
      "No. The first step is fast, and the overall rate is set by the slow second step, in which B does not appear",
      ["Yes. Every reactant in the mechanism appears in the rate law",
       "Yes. Doubling any reactant concentration always doubles the overall rate",
       "No. Changing any concentration has no effect once a mechanism has more than one step"],
      "The overall rate is governed by the rate-determining step, here the slow second step. Species that appear only in fast steps do not appear in the rate law, so changing [B] has a negligible effect on the overall rate. The claim is not correct.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: A + B \u2192 C + D (fast)\nStep 2: C + E \u2192 F + G (slow)\nStep 3: D + H \u2192 F + A (fast)\nWhich species is an intermediate, and which step is rate-determining?",
      "C is the intermediate, and step 2 is rate-determining",
      ["C is the intermediate, and step 1 is rate-determining",
       "E is the intermediate, and step 2 is rate-determining",
       "B is the catalyst, and step 3 is rate-determining"],
      "An intermediate is made in one step and consumed in another: C is produced in step 1 and consumed in step 2. (A appears as a reactant in step 1 and a product in step 3, which makes A the catalyst, not B.) The rate-determining step is the slow step, step 2. <b>C is the intermediate, and step 2 is rate-determining</b>.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: P + Q \u2192 R + S (fast)\nStep 2: R + T \u2192 U + V (slow)\nStep 3: S + W \u2192 U + P (fast)\nA student claims that doubling the concentration of Q will noticeably speed up the overall reaction, because Q is a reactant in the first step. Is the claim correct?",
      "No. The first step is fast, and the overall rate is set by the slow second step, in which Q does not appear",
      ["Yes. Every reactant in the mechanism appears in the rate law",
       "Yes. Doubling any reactant concentration always doubles the overall rate",
       "No. A three-step mechanism has no rate-determining step"],
      "The overall rate is governed by the rate-determining step, here the slow second step. Species that appear only in fast steps do not appear in the rate law, so changing [Q] has a negligible effect on the overall rate. The claim is not correct.",{});
  },
  function(){
    return mcq("A reaction proceeds by the mechanism:\nStep 1: P + Q \u2192 R + S (fast)\nStep 2: R + T \u2192 U + V (slow)\nStep 3: S + W \u2192 U + P (fast)\nWhich species is an intermediate, and which step is rate-determining?",
      "R is the intermediate, and step 2 is rate-determining",
      ["R is the intermediate, and step 1 is rate-determining",
       "T is the intermediate, and step 2 is rate-determining",
       "Q is the catalyst, and step 3 is rate-determining"],
      "An intermediate is made in one step and consumed in another: R is produced in step 1 and consumed in step 2. (P appears as a reactant in step 1 and a product in step 3, which makes P the catalyst, not Q.) The rate-determining step is the slow step, step 2. <b>R is the intermediate, and step 2 is rate-determining</b>.",{});
  }
]));

/* ---------- 5.5 Dynamic equilibrium ---------- */

E("u1-55-equilibrium-state",1,["5.5"],1,"gen",function(){
  var rxn=pick(["N\u2082O\u2084(g) \u21CC 2 NO\u2082(g)","H\u2082(g) + I\u2082(g) \u21CC 2 HI(g)","2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g)","PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g)"]);
  var t=pick([25,80,150,200,250,300,350,400,450,500,550,600,700,800,1000]);
  return mcq("The reaction "+rxn+" has reached equilibrium in a sealed container at "+t+" \u00B0C. Which statement correctly describes the system?",
    "The forward and reverse reactions continue at equal rates, so the concentrations stay constant",
    ["Both reactions have stopped, so the concentrations stay constant",
     "The concentrations of reactants and products are equal",
     "The forward reaction continues but the reverse reaction has stopped"],
    "Equilibrium is dynamic: both reactions keep running, but at equal rates, so there is no net change. Concentrations stay constant, but they are not necessarily equal to each other. The forward and reverse reactions continue at equal rates, so the concentrations stay constant.",{rxn:rxn});
});

E("u1-55-not-equilibrium",1,["5.5"],2,"var",varset([
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "At equilibrium, the concentration of the reactants equals the concentration of the products",
      ["At equilibrium, the rates of the forward and reverse reactions are equal","At equilibrium, the concentrations of reactants and products stop changing","At equilibrium, both reactions continue to occur"],
      "The false statement is the common misconception: at equilibrium the concentrations are constant, but they are equal only by coincidence. Equilibrium means equal rates, not equal concentrations.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "At equilibrium, the forward reaction stops once the reverse reaction begins",
      ["At equilibrium, the forward and reverse reactions occur at the same rate","At equilibrium, no net change is observed in the concentrations","At equilibrium, the system must be in a closed container"],
      "The false statement claims a reaction stops. At equilibrium both reactions continue indefinitely at equal rates; that is what dynamic equilibrium means.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "A system at equilibrium shows constant concentrations because all particle movement has stopped",
      ["A system at equilibrium shows constant concentrations because the two reaction rates are equal","A system at equilibrium continues to react in both directions","A system at equilibrium must be closed so nothing escapes"],
      "Particle movement never stops. The concentrations are constant because the forward and reverse reactions proceed at equal rates, not because anything has frozen.",{});
  },
  function(){
    return mcq("Which statement about a system at equilibrium is FALSE?",
      "Adding a catalyst shifts the equilibrium toward the products",
      ["A catalyst does not change the value of K","A catalyst speeds up the forward and reverse reactions equally","A catalyst helps the system reach equilibrium sooner"],
      "A catalyst speeds both directions equally, so it cannot shift the position of equilibrium or change K. The false statement is the claim that it shifts the equilibrium toward the products.",{});
  }
]));

E("u1-55-attain-direction",1,["5.5"],2,"gen",function(){
  var rxn=pick(["2 NO\u2082(g) \u21CC N\u2082O\u2084(g)","CO(g) + H\u2082O(g) \u21CC CO\u2082(g) + H\u2082(g)","N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g)"]);
  var c0=pick([0.100,0.250,0.400,0.500,0.800,1.00]),vol=pick([0.500,1.00,2.00,5.00,10.0]);
  return mcq("Only reactants, at an initial concentration of "+gF(c0)+" mol/L, are placed in a sealed "+gF(vol)+" L container for the reaction "+rxn+". Which statement describes the rates as the system moves toward equilibrium?",
    "The forward rate starts at its maximum and decreases, while the reverse rate starts at zero and increases, until the two are equal",
    ["The forward rate starts at zero and increases, while the reverse rate decreases from its maximum",
     "Both rates increase steadily until they suddenly become equal",
     "The forward rate stays constant and the reverse rate stays at zero until equilibrium"],
    "At the start there are no products, so the reverse rate is zero and the forward rate is at its highest. As products build up the reverse rate grows and the forward rate falls, until the two meet at equilibrium. The forward rate starts at its maximum and decreases, while the reverse rate starts at zero and increases, until the two are equal.",{rxn:rxn});
});

E("u1-55-closed-system",1,["5.5"],1,"var",varset([
  function(){
    return mcq("A fizzy drink in an open glass eventually goes flat and stays flat, while the same drink in a sealed bottle stays fizzy. The sealed bottle can reach equilibrium because",
      "It is a closed system, so the carbon dioxide cannot escape and the reverse process can balance the forward one",
      ["The bottle is stronger than the glass",
       "The drink in the bottle is colder",
       "Pressure cannot build up in a sealed bottle"],
      "Equilibrium needs a closed system: matter must not leave, so the reverse process can catch up with the forward one. In the open glass the gas escapes and no balance is reached. It is a closed system, so the carbon dioxide cannot escape and the reverse process can balance the forward one.",{});
  },
  function(){
    return mcq("Which system could reach a state of equilibrium?",
      "Water and its vapour sealed inside a closed bottle at a constant temperature",
      ["Water boiling in an open pot",
       "A candle burning in an open room",
       "Exhaust fumes leaving the tailpipe of a car"],
      "Equilibrium requires a closed system at constant conditions, with both the forward and reverse processes able to occur. Only the sealed bottle qualifies: evaporation and condensation can balance there.",{});
  },
  function(){
    return mcq("For a reversible reaction to reach equilibrium, the container must be closed. The reason is that",
      "In an open container, products or reactants escape, so the reverse reaction can never balance the forward reaction",
      ["Equilibrium can only happen in glass containers",
       "A closed container keeps the temperature exactly at 25 \u00B0C",
       "Closing the container stops all molecular motion, which freezes the balance"],
      "If a substance can leave the system, its concentration keeps falling and the two rates can never become equal. A closed container keeps everything in, so balance is possible. Molecular motion never stops.",{});
  }
]));

E("u1-55-dynamic-meaning",1,["5.5"],2,"gen",function(){
  var t=ri(5,60),dur=pick(["a week","two weeks","a month","three months"]);
  return mcq("A sealed flask containing an equilibrium mixture is left undisturbed at "+t+" \u00B0C for "+dur+". A student says nothing is happening inside the flask. Which response is correct?",
    "The student is wrong: both reactions continue at equal rates, but because the rates are equal there is no net change to observe",
    ["The student is right: at equilibrium all reaction stops",
     "The student is wrong: the forward reaction continues alone, very slowly",
     "The student is right: the concentrations are equal, so the reactions cancel out and stop"],
    "Equilibrium is dynamic, not static. Forward and reverse reactions continue at the molecular level at equal rates; the concentrations stay constant because the two processes balance, not because they have stopped. The student is wrong.",{t:t});
});

/* ---------- 5.6 The equilibrium constant ---------- */

var KEQ=[
  {eq:"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g)",k:"K = [NH\u2083]\u00B2 / ([N\u2082][H\u2082]\u00B3)",w:["K = [N\u2082][H\u2082]\u00B3 / [NH\u2083]\u00B2","K = 2[NH\u2083] / (3[H\u2082] + [N\u2082])","K = [NH\u2083] / ([N\u2082][H\u2082])"]},
  {eq:"2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g)",k:"K = [SO\u2083]\u00B2 / ([SO\u2082]\u00B2[O\u2082])",w:["K = [SO\u2082]\u00B2[O\u2082] / [SO\u2083]\u00B2","K = 2[SO\u2083] / (2[SO\u2082] + [O\u2082])","K = [SO\u2083] / ([SO\u2082][O\u2082])"]},
  {eq:"H\u2082(g) + I\u2082(g) \u21CC 2 HI(g)",k:"K = [HI]\u00B2 / ([H\u2082][I\u2082])",w:["K = [H\u2082][I\u2082] / [HI]\u00B2","K = 2[HI] / ([H\u2082] + [I\u2082])","K = [HI] / ([H\u2082][I\u2082])"]},
  {eq:"PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g)",k:"K = [PCl\u2083][Cl\u2082] / [PCl\u2085]",w:["K = [PCl\u2085] / ([PCl\u2083][Cl\u2082])","K = [PCl\u2083] + [Cl\u2082] - [PCl\u2085]","K = [PCl\u2083][Cl\u2082] / [PCl\u2085]\u00B2"]},
  {eq:"N\u2082O\u2084(g) \u21CC 2 NO\u2082(g)",k:"K = [NO\u2082]\u00B2 / [N\u2082O\u2084]",w:["K = [N\u2082O\u2084] / [NO\u2082]\u00B2","K = 2[NO\u2082] / [N\u2082O\u2084]","K = [NO\u2082] / [N\u2082O\u2084]"]}
];

E("u1-56-write-k",1,["5.6"],2,"gen",function(){
  var e=pick(KEQ);
  var t=pick([25,100,200,300,400,450,500,600,700,800,900,1000]);
  return mcq("At "+t+" \u00B0C, the reaction "+e.eq+" is at equilibrium. Which expression gives the equilibrium constant?",
    e.k,e.w,
    "The K expression is the product of the product concentrations divided by the product of the reactant concentrations, with each concentration raised to the power of its coefficient in the balanced equation. <b>"+e.k+"</b>.",{eq:e.eq});
});

E("u1-56-k-value-meaning",1,["5.6"],1,"gen",function(){
  var big=Math.random()<0.5;
  var exp=big?ri(3,12):-ri(3,12);
  var kv=pick(["1.2","2.5","3.8","4.0","6.7","8.9"])+" \u00D7 10"+sfSup(exp);
  if(big){
    return mcq("At a certain temperature, a reaction has K = "+kv+". Which statement is correct?",
      "At equilibrium the products are strongly favoured: product concentrations are much larger than reactant concentrations",
      ["At equilibrium the reactants are strongly favoured",
       "At equilibrium the reactant and product concentrations must be equal",
       "The reaction does not occur at all"],
      "A K value far greater than 1 means the numerator of the K expression is much larger than the denominator at equilibrium: the products are strongly favoured. <b>Products are favoured</b>.",{exp:exp});
  }
  return mcq("At a certain temperature, a reaction has K = "+kv+". Which statement is correct?",
    "At equilibrium the reactants are strongly favoured: very little product is present",
    ["At equilibrium the products are strongly favoured",
     "At equilibrium the reactant and product concentrations must be equal",
     "The reaction reaches equilibrium instantly"],
    "A K value far less than 1 means the denominator of the K expression is much larger than the numerator at equilibrium: the reactants are strongly favoured and very little product forms. <b>Reactants are favoured</b>.",{exp:exp});
});

E("u1-56-k-calc",1,["5.6"],2,"gen",function(){
  var fam=pick(["ab","a2b","ab2"]);
  var a,b,c,K,expr,eq;
  if(fam==="ab"){
    a=pick([0.200,0.250,0.400,0.500,0.800]);b=pick([0.100,0.200,0.300,0.600]);
    K=sfR(b/a,4);expr="K = [B] / [A] = "+gF(b)+" / "+gF(a);eq="A(g) \u21CC B(g)";
  }else if(fam==="a2b"){
    a=pick([0.100,0.200,0.250,0.500]);b=pick([0.200,0.400,0.500,0.800]);
    K=sfR(b/(a*a),4);expr="K = [B] / [A]\u00B2 = "+gF(b)+" / ("+gF(a)+")\u00B2";eq="2 A(g) \u21CC B(g)";
  }else{
    a=pick([0.200,0.400,0.500,1.00]);b=pick([0.400,0.600,0.800]);c=pick([0.100,0.300,0.500]);
    K=sfR((b*c)/a,4);expr="K = [B][C] / [A] = ("+gF(b)+" \u00D7 "+gF(c)+") / "+gF(a);eq="A(g) \u21CC B(g) + C(g)";
  }
  var ans=sfR(K,3);
  var concLine=fam==="ab2"?("At equilibrium, [A] = "+gF(a)+" mol/L, [B] = "+gF(b)+" mol/L and [C] = "+gF(c)+" mol/L."):("At equilibrium, [A] = "+gF(a)+" mol/L and [B] = "+gF(b)+" mol/L.");
  return numq("For the equilibrium "+eq+", "+concLine+" Calculate the value of K.",
    ans,Math.max(0.02*Math.abs(ans),0.002),
    "Substitute the equilibrium concentrations into the K expression, with each concentration raised to the power of its coefficient: "+expr+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>. (Units for K vary from reaction to reaction and are usually omitted.)",{fam:fam});
});

E("u1-56-omit-solids",1,["5.6"],2,"gen",function(){
  var e=pick([
    {eq:"C(s) + H\u2082O(g) \u21CC CO(g) + H\u2082(g)",k:"K = [CO][H\u2082] / [H\u2082O]",w:["K = [CO][H\u2082] / ([C][H\u2082O])","K = [C][H\u2082O] / ([CO][H\u2082])","K = [CO][H\u2082][C] / [H\u2082O]"]},
    {eq:"CaCO\u2083(s) \u21CC CaO(s) + CO\u2082(g)",k:"K = [CO\u2082]",w:["K = [CO\u2082] / [CaCO\u2083]","K = [CaO][CO\u2082] / [CaCO\u2083]","K = [CaCO\u2083] / ([CaO][CO\u2082])"]},
    {eq:"NH\u2084HS(s) \u21CC NH\u2083(g) + H\u2082S(g)",k:"K = [NH\u2083][H\u2082S]",w:["K = [NH\u2083][H\u2082S] / [NH\u2084HS]","K = [NH\u2084HS] / ([NH\u2083][H\u2082S])","K = [NH\u2083] + [H\u2082S] - [NH\u2084HS]"]}
  ]);
  var t=pick([25,75,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,1000]);
  return mcq("At "+t+" \u00B0C, the reaction "+e.eq+" is at equilibrium. Which expression gives the equilibrium constant?",
    e.k,e.w,
    "Pure solids (and pure liquids) have constant concentrations, so they are left out of the K expression. Only the gases and dissolved species appear. <b>"+e.k+"</b>.",{eq:e.eq});
});

E("u1-56-ice-k",1,["5.6"],3,"gen",function(){
  var fam=pick(["hi","n2o4","pcl5"]);
  var scale=pick([0.8,1,1.25,1.5,1.75,2,2.5,3]);
  var tk=pick([25,200,350,450,500,575]);
  var K,ans,sol,prompt;
  if(fam==="hi"){
    var i0=sfR(0.400*scale,4),hi=sfR(0.640*scale,4),x=sfR(hi/2,4),rem=sfR(i0-x,4);
    K=sfR((hi*hi)/(rem*rem),4);ans=sfR(K,3);
    prompt="Hydrogen gas and iodine vapour are placed in a flask, each at an initial concentration of "+gF(i0)+" mol/L, and the equilibrium H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) is established. At equilibrium the concentration of HI is "+gF(hi)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. The change for HI is +"+gF(hi)+" mol/L, so x = "+gF(hi)+" / 2 = "+iF(x)+" mol/L. Then [H\u2082] = [I\u2082] = "+gF(i0)+" - "+iF(x)+" = "+iF(rem)+" mol/L. K = [HI]\u00B2 / ([H\u2082][I\u2082]) = ("+gF(hi)+")\u00B2 / ("+iF(rem)+" \u00D7 "+iF(rem)+") = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }else if(fam==="n2o4"){
    var i0=sfR(0.200*scale,4),eqm=sfR(0.160*scale,4),chg=sfR(i0-eqm,4),no2=sfR(2*chg,4);
    K=sfR((no2*no2)/eqm,4);ans=sfR(K,3);
    prompt="Dinitrogen tetroxide is placed in a flask at an initial concentration of "+gF(i0)+" mol/L and decomposes: N\u2082O\u2084(g) \u21CC 2 NO\u2082(g). At equilibrium the concentration of N\u2082O\u2084 is "+gF(eqm)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. The change in [N\u2082O\u2084] is "+gF(i0)+" - "+gF(eqm)+" = "+iF(chg)+" mol/L, so [NO\u2082] at equilibrium is 2 \u00D7 "+iF(chg)+" = "+iF(no2)+" mol/L. K = [NO\u2082]\u00B2 / [N\u2082O\u2084] = ("+iF(no2)+")\u00B2 / "+gF(eqm)+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }else{
    var i0=sfR(0.500*scale,4),x=sfR(0.200*scale,4),rem=sfR(i0-x,4);
    K=sfR((x*x)/rem,4);ans=sfR(K,3);
    prompt="Phosphorus pentachloride is placed in a flask at an initial concentration of "+gF(i0)+" mol/L and decomposes: PCl\u2085(g) \u21CC PCl\u2083(g) + Cl\u2082(g). At equilibrium the concentration of PCl\u2083 is "+gF(x)+" mol/L. Calculate the value of K.";
    sol="Use an ICE table. PCl\u2083 and Cl\u2082 form in a 1:1 ratio, so [Cl\u2082] = "+gF(x)+" mol/L as well, and [PCl\u2085] falls by the same amount: "+gF(i0)+" - "+gF(x)+" = "+iF(rem)+" mol/L. K = [PCl\u2083][Cl\u2082] / [PCl\u2085] = ("+gF(x)+" \u00D7 "+gF(x)+") / "+iF(rem)+" = "+iF(K)+". So K = <b>"+F3(ans)+"</b>.";
  }
  prompt=prompt+" The temperature is held constant at "+tk+" \u00B0C.";
  return numq(prompt,ans,Math.max(0.02*Math.abs(ans),0.002),sol,{fam:fam,scale:scale,tk:tk});
});

/* ---------- 5.7 Factors that affect equilibrium ---------- */

var SHIFTSYS=[
  {eq:"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g), \u0394H = -92 kJ",temps:[400,425,450,475,500],changes:[
    {c:"more N\u2082(g) is added",dir:"right, toward the products",why:"the system counteracts the addition by using up N\u2082, forming more NH\u2083"},
    {c:"NH\u2083(g) is removed as it forms",dir:"right, toward the products",why:"the system replaces the removed NH\u2083 by converting more reactants"},
    {c:"the mixture is compressed into a smaller volume",dir:"right, toward the products",why:"compression favours the side with fewer gas molecules, 2 mol of gas rather than 4 mol"},
    {c:"the temperature is raised",dir:"left, toward the reactants",why:"the forward reaction is exothermic, so added heat is counteracted by the reverse reaction absorbing it"}]},
  {eq:"2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g), \u0394H = -198 kJ",temps:[400,450,500,550,600],changes:[
    {c:"O\u2082(g) is removed",dir:"left, toward the reactants",why:"the system replaces the removed O\u2082 by decomposing SO\u2083"},
    {c:"the temperature is lowered",dir:"right, toward the products",why:"the forward reaction is exothermic, so removing heat is counteracted by the reaction releasing more"},
    {c:"the pressure is increased by compression",dir:"right, toward the products",why:"compression favours the side with fewer gas molecules, 2 mol rather than 3 mol"}]},
  {eq:"H\u2082(g) + I\u2082(g) \u21CC 2 HI(g), \u0394H = -10 kJ",temps:[300,350,400,425,450],changes:[
    {c:"HI(g) is added",dir:"left, toward the reactants",why:"the system uses up the added HI by converting it back to H\u2082 and I\u2082"},
    {c:"the mixture is compressed into half the volume",dir:"neither way: there is no shift",why:"both sides have 2 mol of gas, so compression raises all concentrations equally and neither side is favoured"}]},
  {eq:"CaCO\u2083(s) \u21CC CaO(s) + CO\u2082(g), \u0394H = +178 kJ",temps:[800,850,900,950,1000],changes:[
    {c:"the temperature is raised",dir:"right, toward the products",why:"the forward reaction is endothermic, so added heat is absorbed by decomposing more CaCO\u2083"},
    {c:"CO\u2082(g) is pumped into the container",dir:"left, toward the reactants",why:"the system uses up the added CO\u2082 by forming more CaCO\u2083"}]}
];

E("u1-57-shift-predict",1,["5.7"],2,"gen",function(){
  var s=pick(SHIFTSYS),ch=pick(s.changes);
  var dirs=["right, toward the products","left, toward the reactants","neither way: there is no shift"];
  var ds=dirs.filter(function(d){return d!==ch.dir;});
  ds.push("the equilibrium is destroyed and the reaction stops");
  var st=pick(s.temps);
  return mcq("The equilibrium "+s.eq+" is established in a sealed container at "+st+" \u00B0C. Now "+ch.c+". Which way does the equilibrium shift?",
    ch.dir,ds.slice(0,3),
    "By Le Ch\u00E2telier's principle the system counteracts the change: "+ch.why+". The equilibrium shifts <b>"+ch.dir+"</b>.",{});
});

E("u1-57-explain-rates",1,["5.7"],3,"var",varset([
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for 2 NO\u2082(g) \u21CC N\u2082O\u2084(g) in a 1.00 L container is disturbed when more NO\u2082 is injected, raising [NO\u2082] by "+amt+" mol/L at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly jump to new, higher values that are already equal",
       "The rate of the reaction in the direction of the added substance increases because its activation energy falls"],
      "An explanation, as opposed to a prediction, has to follow the rates. Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  },
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) in a 1.00 L container is disturbed when "+amt+" mol of HI is removed at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Removing product lowers the reverse rate at once, while the forward rate is unchanged, so the forward reaction runs ahead until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly drop to zero and restart together",
       "The forward rate increases at once because removing product lowers its activation energy"],
      "An explanation, as opposed to a prediction, has to follow the rates. Removing product lowers the reverse rate at once, while the forward rate is unchanged, so the forward reaction runs ahead until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  },
  function(){
    var amt=pick(["0.100","0.200","0.250","0.400","0.500"]);
    return mcq("An equilibrium mixture for 2 SO\u2082(g) + O\u2082(g) \u21CC 2 SO\u2083(g) in a 2.00 L container is disturbed when "+amt+" mol of O\u2082 is added at once. Which statement correctly EXPLAINS, in terms of reaction rates, how the new equilibrium is reached?",
      "Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position",
      ["Le Ch\u00E2telier's principle states that the system must oppose the change, so it shifts until the change is undone",
       "Both rates instantly jump to new, higher values that are already equal",
       "The rate of the reaction in the direction of the added substance increases because its activation energy falls"],
      "An explanation, as opposed to a prediction, has to follow the rates. Adding a reactant raises the forward rate at once, while the reverse rate is unchanged at first, so product forms faster than it is consumed until the rates become equal again at a new position. Simply quoting Le Ch\u00E2telier's principle predicts the shift but does not explain it.",{});
  }
]));

E("u1-57-temperature-k",1,["5.7"],2,"gen",function(){
  var exo=Math.random()<0.5;
  var heat=Math.random()<0.5;
  var rxn=exo?"N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g), \u0394H = -92 kJ":"N\u2082O\u2084(g) \u21CC 2 NO\u2082(g), \u0394H = +57 kJ";
  var kUp=(exo!==heat);
  var correct=kUp?"K increases, because the equilibrium shifts toward the products":"K decreases, because the equilibrium shifts toward the reactants";
  var wrong=kUp?"K decreases, because the equilibrium shifts toward the reactants":"K increases, because the equilibrium shifts toward the products";
  var t1=pick([200,250,300,350,400,450]),t2=heat?t1+pick([50,100,150]):t1-pick([50,100]);
  var k0=pick(["1.5 \u00D7 10\u00B2","4.0 \u00D7 10\u00B3","6.2 \u00D7 10\u2074","2.8 \u00D7 10\u2075","9.1 \u00D7 10\u00B9"]);
  return mcq("For the equilibrium "+rxn+", K = "+k0+" at "+t1+" \u00B0C. The temperature is then "+(heat?"raised to "+t2+" \u00B0C":"lowered to "+t2+" \u00B0C")+". What happens to the value of K?",
    correct,[wrong,"K is unchanged, because temperature never affects K","K becomes 1, because the rates become equal"],
    "Temperature is the one change that alters K, because it alters the equilibrium position itself. Here the shift is "+(kUp?"toward the products, so the numerator of the K expression grows and K increases":"toward the reactants, so the numerator of the K expression shrinks and K decreases")+". <b>"+correct+"</b>.",{});
});

E("u1-57-catalyst-equilibrium",1,["5.7"],1,"var",varset([
  function(){
    return mcq("An iron catalyst is added to an equilibrium mixture for the synthesis of ammonia from nitrogen and hydrogen. Which statement is correct?",
      "The system reaches equilibrium faster, but the position of equilibrium and the value of K are unchanged",
      ["The position of equilibrium shifts toward the products",
       "The value of K increases because the forward reaction is sped up more than the reverse",
       "The position of equilibrium shifts toward the reactants"],
      "A catalyst speeds the forward and reverse reactions equally, so the balance point is reached sooner but is not moved. Neither the position of equilibrium nor K changes.",{});
  },
  function(){
    return mcq("A vanadium(V) oxide catalyst is added to an equilibrium mixture for the conversion of sulfur dioxide to sulfur trioxide. Which statement is correct?",
      "Equilibrium is reached sooner, but the equilibrium mixture contains the same proportions as before",
      ["The equilibrium mixture contains more sulfur trioxide than before",
       "The value of K increases because the catalyst lowers the forward activation energy only",
       "The equilibrium mixture contains less sulfur trioxide than before"],
      "A catalyst lowers the forward and reverse barriers by the same amount, so both rates grow together. The system arrives at the same equilibrium position, just sooner. Equilibrium is reached sooner, but the mixture contains the same proportions as before.",{});
  },
  function(){
    return mcq("A platinum catalyst is placed in an equilibrium mixture of nitrogen oxides. Which statement is correct?",
      "The catalyst changes how fast equilibrium is reached, not where the equilibrium lies",
      ["The catalyst shifts the equilibrium toward whichever side has fewer molecules",
       "The catalyst increases K by lowering the activation energy",
       "The catalyst is used up, and the equilibrium shifts until it is gone"],
      "Catalysts affect rates only. Both directions speed up equally, the position of equilibrium and K stay the same, and the catalyst is regenerated rather than consumed. The catalyst changes how fast equilibrium is reached, not where it lies.",{});
  },
  function(){
    return mcq("A reaction at equilibrium is given a catalyst, and the mixture is sampled an hour later. Compared with the same mixture without the catalyst, the sample shows",
      "The same equilibrium concentrations, reached in less time",
      ["A higher product concentration, because the forward reaction was favoured",
       "A lower reactant concentration, because K increased",
       "No reaction at all, because the catalyst froze the system"],
      "Given time, both mixtures sit at the same equilibrium position with the same concentrations and the same K. The catalyzed one simply got there faster. The same equilibrium concentrations, reached in less time.",{});
  }
]));

E("u1-57-pressure-nuance",1,["5.7"],3,"gen",function(){
  var fam=pick(["equal","inert"]);
  var t=pick([350,400,450,500]);
  if(fam==="equal"){
    var p0=pick([100,150,200,250,300,400,500,600]),frac=pick(["half","a third","a quarter"]);
    return mcq("The equilibrium H\u2082(g) + I\u2082(g) \u21CC 2 HI(g) is established in a container at "+t+" \u00B0C and "+p0+" kPa. The mixture is compressed to "+frac+" of its volume. A student predicts a shift toward the products because the pressure rose. Which judgement is correct?",
      "The student is wrong: both sides of the equation have 2 mol of gas, so compression raises every concentration in the same proportion and there is no shift",
      ["The student is right: higher pressure always favours the products",
       "The student is wrong: the equilibrium shifts toward the reactants instead",
       "The student is right: compression always favours the side with more molecules"],
      "Pressure changes shift an equilibrium only when the two sides have different numbers of gas molecules. Here both sides have 2 mol of gas, so no side is favoured and there is no shift, even though the pressure rose sharply. The student is wrong.",{fam:fam,p0:p0});
  }
  var vol=pick([1.00,2.00,5.00,10.0]),add=pick([50,80,100,150,200,250,300,400]);
  return mcq("The equilibrium N\u2082(g) + 3 H\u2082(g) \u21CC 2 NH\u2083(g) is established in a "+gF(vol)+" L container at "+t+" \u00B0C. Argon gas is pumped in, raising the total pressure by "+add+" kPa, while the volume is kept constant. Which statement is correct?",
    "There is no shift: the concentrations of N\u2082, H\u2082 and NH\u2083 are unchanged, because the volume did not change",
    ["The equilibrium shifts right, because the total pressure increased",
     "The equilibrium shifts left, because argon dilutes the reacting gases",
     "The equilibrium shifts right, because argon acts as a catalyst"],
    "What matters for the equilibrium is the concentrations (partial pressures) of the reacting gases, not the total pressure. At constant volume the argon changes none of them, so there is no shift. A pressure shift requires a volume change. There is no shift.",{fam:fam,vol:vol});
});
