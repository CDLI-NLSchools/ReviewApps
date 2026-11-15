// Math 2202 Unit 3 Volume and Capacity question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 1164 to 1893).
// CRMARKS: u3-cr-tank-capacity=2
// CRMARKS: u3-cr-cylinder=2
// CRMARKS: u3-cr-si-conversion=2
// CRMARKS: u3-cr-cone=3
// CRMARKS: u3-cr-find-height=3
// CRMARKS: u3-cr-composite=3
// CRMARKS: u3-cr-capacity-remaining=2
// CRMARKS: u3-cr-find-base-side=3
/* ===== Unit 3 ===== */
/* Unit 3: Volume and Capacity. Helpers prefixed u3v. */
function u3vUniq(a){ return new Set(a.map(function(x){return String(x);})).size===a.length; }
function u3vBoxFig(l,w,h,unit){
  var s='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangular prism with length, width and height marked">';
  s+='<polygon points="62,78 98,50 190,50 154,78" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="154,78 190,50 190,112 154,140" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="62" y="78" width="92" height="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="108" y="164" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">l = '+l+' '+unit+'</text>';
  s+='<text x="76" y="42" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">w = '+w+' '+unit+'</text>';
  s+='<text x="198" y="100" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vCylFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cylinder with radius and height marked">';
  s+='<path d="M54,48 L54,136 A46,12 0 0 0 146,136 L146,48" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="100" cy="48" rx="46" ry="12" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="100" y1="48" x2="146" y2="48" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="100" y="28" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="156" y="96" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vConeFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cone with height marked">';
  s+='<polygon points="110,28 52,142 168,142" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="14" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="28" x2="110" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  s+='<line x1="110" y1="142" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="162" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="118" y="88" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vPyrFig(l,w,h,unit){
  var s='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square based pyramid with height marked">';
  s+='<polygon points="120,30 60,150 180,150" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="120,30 180,150 205,125 145,30" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<line x1="60" y1="150" x2="205" y2="150" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="120" y1="30" x2="120" y2="150" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  s+='<text x="120" y="170" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">base '+l+' '+unit+' by '+w+' '+unit+'</text>';
  s+='<text x="128" y="92" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vSphereFig(r,unit){
  var s='<svg viewBox="0 0 200 190" width="200" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sphere with radius marked">';
  s+='<circle cx="100" cy="88" r="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="100" y1="88" x2="162" y2="88" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="100" y="172" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vCompFig(l1,l2,h1,h2,unit){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step shaped solid, side view">';
  s+='<polygon points="40,160 240,160 240,90 140,90 140,40 40,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="90" y="180" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">lower part '+l1+' '+unit+' long</text>';
  s+='<text x="90" y="28" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">upper part '+l2+' '+unit+' long</text>';
  s+='<text x="252" y="128" font-size="13" fill="'+FIG_INK+'" text-anchor="start">lower height '+h1+'</text>';
  s+='<text x="90" y="70" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">upper height '+h2+'</text>';
  return s+'</svg>';
}

/* ---------- Level 1 ---------- */
E("u3-vol-vs-capacity", 3, ["3.6"], 1, "var", varset([
  function(){ return mcq("A gravel pile takes up space in a yard. A water jug can be filled with juice. Which pairing is correct?",
    {t:"The gravel pile has volume; the jug has capacity", fb:"Yes: volume is the space an object takes up, and capacity is how much a container can hold."},
    [{t:"The gravel pile has capacity; the jug has volume only", fb:"That swaps the terms: a solid pile is described by the space it takes up, which is volume."},
     {t:"Both are capacity, because both can be measured", fb:"Being measurable does not make both capacity: capacity is only about what a container holds."},
     {t:"Both are volume, because a jug is a solid object", fb:"The jug as an object has volume, but the amount it can hold inside is its capacity, which is what the question pairs."}],
    "Volume is the amount of space a 3-D object takes up. Capacity is the amount a container can hold. The answer is <b>the gravel pile has volume; the jug has capacity</b>.", {}); },
  function(){ return mcq("Which statement best explains capacity?",
    {t:"Capacity is the amount a container can hold inside", fb:"Yes: capacity describes the inside space of a container, often measured in litres or millilitres."},
    [{t:"Capacity is the space any solid object takes up", fb:"That describes volume in general, not the holding amount of a container."},
     {t:"Capacity is the area covering the outside of a container", fb:"Outside covering is surface area, not capacity."},
     {t:"Capacity is the distance around a container", fb:"Distance around is perimeter or circumference, not capacity."}],
    "Capacity is the amount a container can hold. The answer is <b>capacity is the amount a container can hold inside</b>.", {}); },
  function(){ return mcq("A full aquarium holds 40 L of water. The glass tank itself sits on a stand and takes up room. What does the 40 L describe?",
    {t:"The capacity of the aquarium", fb:"Yes: 40 L is the amount the container holds."},
    [{t:"The surface area of the aquarium", fb:"Surface area would be in square units, not litres."},
     {t:"The volume of the glass only", fb:"The glass material is a small part; 40 L of water describes what the tank holds."},
     {t:"The perimeter of the aquarium", fb:"Perimeter is a length and would be in units such as centimetres, not litres."}],
    "Litres of water held describe how much the container holds. The answer is <b>the capacity of the aquarium</b>.", {}); },
  function(){ return mcq("Which statement best explains volume?",
    {t:"Volume is the amount of space a 3-D object takes up", fb:"Yes: volume measures the space occupied by a solid, a liquid or a gas."},
    [{t:"Volume is the amount a measuring cup can hold in total", fb:"That is a capacity description for one container, not the general meaning of volume."},
     {t:"Volume is the flat area on top of an object", fb:"A flat area is area, measured in square units."},
     {t:"Volume is the height of an object, bottom to top", fb:"Height is one length; volume combines three dimensions of space."}],
    "Volume is the amount of space a 3-D object takes up, measured in cubed units. The answer is <b>volume is the amount of space a 3-D object takes up</b>.", {}); },
  function(){ return mcq("A recipe says a mixing bowl has a capacity of 3 L. Why is the word capacity used?",
    {t:"The bowl is a container, and 3 L is how much it can hold", fb:"Yes: containers are described by how much they hold."},
    [{t:"The bowl is a solid, and 3 L is the space the metal takes up", fb:"The metal of the bowl takes up far less than 3 L; the 3 L is the holding amount."},
     {t:"Litres are always used for solids", fb:"Litres are used for volumes and capacities of liquids and containers, not solids as such."},
     {t:"Capacity and surface area mean the same thing here", fb:"Surface area would be in square units; the bowl holding 3 L is capacity."}],
    "A bowl is a container, so the amount it can hold is its capacity. The answer is <b>the bowl is a container, and 3 L is how much it can hold</b>.", {}); },
  function(){ return mcq("A brick is 20 cm long, 10 cm wide and 6 cm high, so it takes up 1,200 cm\u00B3 of space. Which term fits the 1,200 cm\u00B3?",
    {t:"Volume, because the brick is a solid taking up space", fb:"Yes: a solid brick is described by the space it occupies."},
    [{t:"Capacity, because bricks are used to build containers", fb:"The brick itself holds nothing; the measurement is the space the solid takes up."},
     {t:"Capacity, because the value is in cubed units", fb:"Cubed units measure volume; capacity of containers is usually given in litres or millilitres."},
     {t:"Surface area, because the dimensions are given", fb:"Multiplying the three dimensions gives volume, not the outside covering area."}],
    "\\(20 \\times 10 \\times 6 = 1{,}200\\), and a solid taking up space is measured by volume. The answer is <b>volume, because the brick is a solid taking up space</b>.", {}); }
]), ["Volume describes space taken up; capacity describes what a container holds.", "Ask whether the item is a solid taking up space or a container being filled."]);

E("u3-referents", 3, ["3.7","3.8"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for a capacity of \\(1\\ \\text{L}\\)?",
    {t:"A large water bottle or a milk carton", fb:"Yes: both are sold as 1 L containers."},
    [{t:"A teaspoon", fb:"A teaspoon holds about 5 mL, far less than 1 L."},
     {t:"A bathtub", fb:"A bathtub holds well over 100 L, far more than 1 L."},
     {t:"A thimble", fb:"A thimble holds only a few millilitres, far less than 1 L."}],
    "A familiar 1 L referent is a large water bottle or milk carton. The answer is <b>a large water bottle or a milk carton</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{cm}^3\\)?",
    {t:"A sugar cube", fb:"Yes: a sugar cube is about 1 cm on each side."},
    [{t:"A shoebox", fb:"A shoebox is thousands of cubic centimetres."},
     {t:"A dice cup", fb:"A dice cup holds hundreds of cubic centimetres."},
     {t:"A backpack", fb:"A backpack is tens of thousands of cubic centimetres."}],
    "\\(1\\ \\text{cm} \\times 1\\ \\text{cm} \\times 1\\ \\text{cm} = 1\\ \\text{cm}^3\\), about the size of a sugar cube. The answer is <b>a sugar cube</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{m}^3\\)?",
    {t:"A large appliance box, such as a fridge box", fb:"Yes: a fridge box is roughly 1 m in each dimension."},
    [{t:"A lunch box", fb:"A lunch box is only a few thousand cubic centimetres, far under 1 cubic metre."},
     {t:"A kitchen sink", fb:"A sink holds tens of litres, which is far under 1 cubic metre (1,000 L)."},
     {t:"A shoebox", fb:"A shoebox is far smaller than a cubic metre."}],
    "\\(1\\ \\text{m}^3 = 1{,}000\\ \\text{L}\\), about the space inside a large appliance box. The answer is <b>a large appliance box, such as a fridge box</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a capacity of \\(1\\ \\text{mL}\\)?",
    {t:"A small cube 1 cm on each side, such as a tiny dice", fb:"Yes: 1 cm cubed is exactly 1 mL."},
    [{t:"A coffee mug", fb:"A mug holds about 250 mL, far more than 1 mL."},
     {t:"A soup spoon", fb:"A soup spoon holds about 15 mL, still well over 1 mL."},
     {t:"A juice box", fb:"A juice box holds about 200 mL, far more than 1 mL."}],
    "\\(1\\ \\text{mL} = 1\\ \\text{cm}^3\\), the size of a small 1 cm cube. The answer is <b>a small cube 1 cm on each side</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{ft}^3\\)?",
    {t:"A milk crate, about 1 ft in each dimension", fb:"Yes: a standard milk crate is close to a cubic foot."},
    [{t:"A shoebox", fb:"A shoebox is well under a cubic foot."},
     {t:"A garden shed", fb:"A shed is hundreds of cubic feet."},
     {t:"A dice", fb:"A dice is about a cubic inch, far smaller than a cubic foot."}],
    "\\(1\\ \\text{ft} \\times 1\\ \\text{ft} \\times 1\\ \\text{ft} = 1\\ \\text{ft}^3\\), about a milk crate. The answer is <b>a milk crate, about 1 ft in each dimension</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{yd}^3\\)?",
    {t:"A large load of topsoil in a small trailer", fb:"Yes: topsoil is sold by the cubic yard, and a small trailer load is about that size."},
    [{t:"A wheelbarrow load of soil", fb:"A wheelbarrow holds only part of a cubic yard, roughly a quarter or less."},
     {t:"A bucket of soil", fb:"A bucket is a tiny fraction of a cubic yard."},
     {t:"A full tandem dump truck load", fb:"A tandem truck holds many cubic yards, far more than one."}],
    "Soil and gravel are sold by the cubic yard; a small trailer load is a good referent. The answer is <b>a large load of topsoil in a small trailer</b>.", {}); }
]), ["Picture a familiar object that is about the stated size.", "Compare each object with the unit: millilitres are tiny, litres are bottles, cubic metres are room sized."]);

E("u3-choose-unit", 3, ["3.8","3.7"], 1, "gen", function(){
  var S=[
    {o:"a dose of liquid medicine in a small syringe", u:"mL", lo:2, hi:9, d:["L","cm\u00B3","gal"]},
    {o:"the water in a community swimming pool", u:"m\u00B3", lo:400, hi:900, d:["mL","in\u00B3","cm\u00B3"]},
    {o:"the water a bathtub holds", u:"L", lo:120, hi:220, d:["mL","m\u00B3","yd\u00B3"]},
    {o:"one ice cube from a tray", u:"cm\u00B3", lo:15, hi:40, d:["L","ft\u00B3","m\u00B3"]},
    {o:"the gravel in a tandem dump truck box", u:"yd\u00B3", lo:8, hi:14, d:["in\u00B3","mL","cm\u00B3"]},
    {o:"the soil a large storage tote can hold", u:"ft\u00B3", lo:2, hi:5, d:["yd\u00B3","mL","gal"]},
    {o:"the fuel in a pickup truck tank", u:"gal", lo:16, hi:28, d:["mL","in\u00B3","cm\u00B3"]},
    {o:"the air space inside a moving box", u:"ft\u00B3", lo:3, hi:8, d:["m\u00B3","mL","in\u00B3"]}
  ];
  var s=pick(S), v=ri(s.lo,s.hi);
  var opts=s.d.map(function(x){return {t:x, fb:"That unit is the wrong size for "+s.o+": the recorded value would be awkwardly huge or tiny."};});
  return mcq("A worker records the volume or capacity for "+s.o+" as about "+v+" of a unit. Which unit makes the record sensible?",
    {t:s.u, fb:"Yes: about "+v+" "+s.u+" is a sensible size for "+s.o+"."}, opts,
    "Match the object to a referent of the right size. About "+v+" "+s.u+" fits "+s.o+". The answer is <b>"+s.u+"</b>.",
    {obj:s.o, unit:s.u, v:v});
}, ["Think of a referent object for each unit and compare sizes.", "Reject units that would make the number enormous or a tiny decimal for this object."]);

E("u3-si-cubed", 3, ["3.10"], 1, "gen", function(){
  var modes=[
    {f:"m\u00B3", t:"L", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,15);}},
    {f:"L", t:"mL", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,12);}},
    {f:"cm\u00B3", t:"L", fac:0.001, ftxt:"1/1,000", lin:0.1, gen:function(){return ri(15,90)*100;}},
    {f:"L", t:"cm\u00B3", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,9);}},
    {f:"m\u00B3", t:"cm\u00B3", fac:1000000, ftxt:"1,000,000", lin:100, gen:function(){return ri(2,8);}},
    {f:"cm\u00B3", t:"m\u00B3", fac:0.000001, ftxt:"1/1,000,000", lin:0.01, gen:function(){return ri(2,9)*500000;}}
  ];
  var m=pick(modes), v=m.gen(), ans=v*m.fac;
  var cands=[ans, v, v*m.lin, ans*10];
  if(!u3vUniq(cands)){ cands=[ans, v, ans/10, ans*100]; }
  var dvals=cands.slice(1);
  var fbs=["That keeps the original number, so no conversion was done.","That uses the wrong power of ten for a cubed SI conversion.","That is off by a further factor of ten."];
  var opts=dvals.map(function(x,i){return {t:fmt(x)+"", fb:fbs[i%fbs.length]};});
  var _bo0=balOpts({t:fmt(ans)+"", fb:"Yes: multiplying or dividing by the cubed conversion factor gives "+fmt(ans)+" "+m.t+"."}, opts); return mcq("Convert \\("+fmt(v)+"\\ \\text{"+m.f+"}\\) to "+m.t+".", _bo0[0], _bo0[1],
    "SI cubed units convert by factors of \\(1{,}000\\) or \\(1{,}000{,}000\\): \\(1\\ \\text{m}^3 = 1{,}000\\ \\text{L}\\), \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3 = 1{,}000\\ \\text{mL}\\). \\["+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+"\\] The answer is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {from:m.f, to:m.t, v:v});
}, ["Cubed SI units step by 1,000, not by 10.", "Decide whether the new unit is bigger or smaller, then multiply or divide by 1,000 (or 1,000,000 for two steps)."]);

E("u3-imperial-cubed", 3, ["3.11"], 1, "gen", function(){
  var modes=[
    {f:"ft\u00B3", t:"in\u00B3", fac:1728, ftxt:"1,728", lin:12, gen:function(){return ri(2,12);}},
    {f:"in\u00B3", t:"ft\u00B3", fac:1/1728, ftxt:"1/1,728", lin:1/12, gen:function(){return ri(2,12)*1728;}},
    {f:"yd\u00B3", t:"ft\u00B3", fac:27, ftxt:"27", lin:3, gen:function(){return ri(2,20);}},
    {f:"ft\u00B3", t:"yd\u00B3", fac:1/27, ftxt:"1/27", lin:1/3, gen:function(){return ri(2,15)*27;}},
    {f:"yd\u00B3", t:"in\u00B3", fac:46656, ftxt:"46,656", lin:36, gen:function(){return ri(1,6);}},
    {f:"in\u00B3", t:"yd\u00B3", fac:1/46656, ftxt:"1/46,656", lin:1/36, gen:function(){return ri(1,6)*46656;}}
  ];
  var m=pick(modes), v=m.gen(), ans=Math.round(v*m.fac*100)/100;
  var cands=[ans, v, Math.round(v*m.lin*100)/100, Math.round(ans*10*100)/100];
  var dvals=cands.slice(1);
  var fbs=["That keeps the original number, so no conversion was done.","That uses the linear factor (12 or 3) instead of cubing it.","That is off by a further factor of ten."];
  var opts=dvals.map(function(x,i){return {t:fmt(x)+" "+m.t, fb:fbs[i]};});
  return mcq("Convert \\("+fmt(v)+"\\ \\text{"+m.f+"}\\) to "+m.t+".",
    {t:fmt(ans)+" "+m.t, fb:"Yes: the cubed factor gives "+fmt(ans)+" "+m.t+"."}, opts,
    "Cube the linear factor: \\(12^3 = 1{,}728\\) and \\(3^3 = 27\\). \\["+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+"\\] The answer is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {from:m.f, to:m.t, v:v});
}, ["Cube the linear conversion: 12 in. per foot becomes 1,728, and 3 ft per yard becomes 27.", "Decide whether you are moving to a smaller unit (multiply) or a larger unit (divide)."]);

E("u3-prism-volume", 3, ["3.12","2.1"], 1, "gen", function(){
  var ctx=pick(["A storage crate","A toolbox","A planter box","A shipping carton","A fish tank (outside measures)"]);
  var l,w,h,ans,ds,tries=0;
  do { l=ri(3,14); w=ri(3,12); h=ri(3,10); ans=l*w*h;
    ds=[l+w+h, 2*(l*w+l*h+w*h), l*w]; tries++;
  } while(!u3vUniq([ans].concat(ds)) && tries<40);
  if(!u3vUniq([ans].concat(ds))){ l=4; w=5; h=6; ans=120; ds=[15,148,20]; }
  var unit=pick(["cm","in.","m"]);
  var q=mcq(ctx+" is "+l+" "+unit+" long, "+w+" "+unit+" wide and "+h+" "+unit+" high. What is its volume?",
    {t:fmt(ans)+" "+unit+"\u00B3", fb:"Yes: length times width times height."},
    [{t:fmt(ds[0])+" "+unit+"\u00B3", fb:"That adds the dimensions; volume multiplies all three."},
     {t:fmt(ds[1])+" "+unit+"\u00B3", fb:"That is the surface area formula, which covers the outside instead of filling the space."},
     {t:fmt(ds[2])+" "+unit+"\u00B3", fb:"That is only the base area; the height still has to be multiplied in."}],
    "For a rectangular prism, \\(V = lwh\\). \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" "+unit+"\u00B3</b>.",
    {l:l,w:w,h:h});
  q.figure=u3vBoxFig(l,w,h,unit);
  return q;
}, ["Use the prism formula from the formula sheet, with all three dimensions.", "Multiply the length by the width first to get the base area, then multiply by the height."]);

/* ---------- Level 2, multiple choice ---------- */
E("u3-estimate-referent", 3, ["3.9","3.7"], 2, "var", varset([
  function(){ return mcq("A 1 L bottle is your referent. A bathtub filled to its regular line takes about 150 bottlefuls of water. What is the best estimate of the bathtub capacity?",
    {t:"About 150 L", fb:"Yes: 150 bottlefuls at 1 L each is about 150 L."},
    [{t:"About 15 L", fb:"That is only 15 bottlefuls, far less than the count given."},
     {t:"About 1,500 L", fb:"That would take about 1,500 bottlefuls, ten times the count given."},
     {t:"About 1.5 L", fb:"That is about one and a half bottles, not 150."}],
    "Multiply the count by the referent size: \\(150 \\times 1\\ \\text{L} = 150\\ \\text{L}\\). The answer is <b>about 150 L</b>.", {}); },
  function(){ return mcq("A cardboard box with a volume of \\(1\\ \\text{m}^3\\) is your referent. A classroom would hold about 60 of these boxes stacked with no gaps. What is the best estimate of the classroom volume?",
    {t:"About 60 m\u00B3", fb:"Yes: 60 referent boxes at 1 cubic metre each."},
    [{t:"About 6 m\u00B3", fb:"That is only 6 boxes, far under the count of 60."},
     {t:"About 600 m\u00B3", fb:"That would need about 600 boxes, ten times the count."},
     {t:"About 0.6 m\u00B3", fb:"That is less than a single referent box."}],
    "Multiply the count by the referent size: \\(60 \\times 1\\ \\text{m}^3 = 60\\ \\text{m}^3\\). The answer is <b>about 60 m\u00B3</b>.", {}); },
  function(){ return mcq("A measuring spoon holds 5 mL. A bottle of cough syrup holds about 24 level spoonfuls. What is the best estimate of the syrup bottle capacity?",
    {t:"About 120 mL", fb:"Yes: 24 spoonfuls at 5 mL each is 120 mL."},
    [{t:"About 24 mL", fb:"That uses the count alone and forgets each spoon holds 5 mL."},
     {t:"About 1,200 mL", fb:"That would need 240 spoonfuls, ten times the count."},
     {t:"About 12 mL", fb:"That is only about two and a half spoonfuls."}],
    "\\(24 \\times 5\\ \\text{mL} = 120\\ \\text{mL}\\). The answer is <b>about 120 mL</b>.", {}); },
  function(){ return mcq("A milk crate with a volume of about \\(1\\ \\text{ft}^3\\) is your referent. The cargo space of a hatchback holds about 25 crates with no gaps. What is the best estimate of the cargo volume?",
    {t:"About 25 ft\u00B3", fb:"Yes: 25 crates at about 1 cubic foot each."},
    [{t:"About 2.5 ft\u00B3", fb:"That is only about two or three crates."},
     {t:"About 250 ft\u00B3", fb:"That would need about 250 crates, ten times the count."},
     {t:"About 12 ft\u00B3", fb:"That uses only the crate edge idea and ignores the count of 25."}],
    "Multiply the count by the referent size: \\(25 \\times 1\\ \\text{ft}^3 = 25\\ \\text{ft}^3\\). The answer is <b>about 25 ft\u00B3</b>.", {}); },
  function(){ return mcq("A 10 L bucket is your referent. Filling a rain barrel takes about 18 level bucketfuls. What is the best estimate of the rain barrel capacity?",
    {t:"About 180 L", fb:"Yes: 18 bucketfuls at 10 L each is 180 L."},
    [{t:"About 18 L", fb:"That is the count alone, without the 10 L size of each bucketful."},
     {t:"About 1,800 L", fb:"That would take 180 bucketfuls, ten times the count."},
     {t:"About 90 L", fb:"That is only 9 bucketfuls, half the count given."}],
    "\\(18 \\times 10\\ \\text{L} = 180\\ \\text{L}\\). The answer is <b>about 180 L</b>.", {}); },
  function(){ return mcq("A sugar cube has a volume of about \\(1\\ \\text{cm}^3\\). A small jewellery box holds about 90 sugar cubes packed with no gaps. What is the best estimate of the inside volume of the box?",
    {t:"About 90 cm\u00B3", fb:"Yes: 90 cubes at about 1 cubic centimetre each."},
    [{t:"About 9 cm\u00B3", fb:"That is only about 9 cubes, a tenth of the count."},
     {t:"About 900 cm\u00B3", fb:"That would need about 900 cubes, ten times the count."},
     {t:"About 30 cm\u00B3", fb:"That would be about 30 cubes, not 90."}],
    "Multiply the count by the referent size: \\(90 \\times 1\\ \\text{cm}^3 = 90\\ \\text{cm}^3\\). The answer is <b>about 90 cm\u00B3</b>.", {}); }
]), ["Multiply the number of referent units by the size of one referent.", "First state the size of one referent, then scale it by the count."]);

E("u3-cylinder-volume", 3, ["3.12","2.1"], 2, "gen", function(){
  var ctx=pick(["A soup can","A water pipe section","A cylindrical storage drum","A rolled poster tube","A paint can"]);
  var r,h,ans,ds,tries=0;
  do { r=ri(3,10); h=ri(6,20); ans=Math.PI*r*r*h;
    ds=[Math.PI*r*h, 2*Math.PI*r*h, Math.PI*r*r*h/3]; tries++;
  } while(!u3vUniq([ans].concat(ds).map(function(x){return fmt(x);})) && tries<40);
  var unit=pick(["cm","in."]);
  var q=mcq(ctx+" has radius "+r+" "+unit+" and height "+h+" "+unit+". What is its volume, to the nearest whole unit?",
    {t:fmt(Math.round(ans))+" "+unit+"\u00B3", fb:"Yes: \\(\\pi r^2 h\\) with the radius squared."},
    [{t:fmt(Math.round(ds[0]))+" "+unit+"\u00B3", fb:"That uses \\(\\pi r h\\): the radius was not squared."},
     {t:fmt(Math.round(ds[1]))+" "+unit+"\u00B3", fb:"That is a lateral surface style calculation, not the filled volume."},
     {t:fmt(Math.round(ds[2]))+" "+unit+"\u00B3", fb:"That divides by 3, which is the cone formula; a cylinder keeps the full base times height."}],
    "For a cylinder, \\(V = \\pi r^2 h\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(ans)+"\\ \\text{"+unit+"}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" "+unit+"\u00B3</b>.",
    {r:r,h:h});
  q.figure=u3vCylFig(r,h,unit);
  return q;
}, ["Use the cylinder formula from the formula sheet.", "Square the radius first, then multiply by pi and by the height."]);

E("u3-cone-pyramid-volume", 3, ["3.12","3.15"], 2, "gen", function(){
  var mode=pick(["cone","pyramid"]);
  if(mode==="cone"){
    var r=ri(3,9), h=ri(6,18), ans=Math.PI*r*r*h/3;
    var ds=[Math.PI*r*r*h, Math.PI*r*r*h/2, Math.PI*r*h/3];
    var q=mcq("A cone shaped funnel has radius "+r+" cm and height "+h+" cm. What is its volume, to the nearest whole unit?",
      {t:fmt(Math.round(ans))+" cm\u00B3", fb:"Yes: a cone is one third of the matching cylinder."},
      [{t:fmt(Math.round(ds[0]))+" cm\u00B3", fb:"That is the full cylinder volume; the cone takes one third of it."},
       {t:fmt(Math.round(ds[1]))+" cm\u00B3", fb:"That takes one half; a cone takes one third, not one half."},
       {t:fmt(Math.round(ds[2]))+" cm\u00B3", fb:"That forgets to square the radius before dividing by 3."}],
      "For a cone, \\(V = \\frac{\\pi r^2 h}{3}\\). \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" cm\u00B3</b>.",
      {mode:mode,r:r,h:h});
    q.figure=u3vConeFig(r,h,"cm");
    return q;
  }
  var l=ri(4,10), w=ri(4,10), h=ri(6,15), ans2=l*w*h/3;
  var ds2=[l*w*h, l*w*h/2, l*w];
  var q2=mcq("A square based pyramid display has a base "+l+" cm by "+w+" cm and height "+h+" cm. What is its volume?",
    {t:fmt(ans2)+" cm\u00B3", fb:"Yes: a pyramid is one third of the matching prism."},
    [{t:fmt(ds2[0])+" cm\u00B3", fb:"That is the full prism volume; the pyramid takes one third of it."},
     {t:fmt(ds2[1])+" cm\u00B3", fb:"That takes one half; a pyramid takes one third, not one half."},
     {t:fmt(ds2[2])+" cm\u00B3", fb:"That is only the base area; the height and the one third are both missing."}],
    "For a square pyramid, \\(V = \\frac{lwh}{3}\\). \\[ \\begin{aligned} V &= \\frac{"+l+" \\times "+w+" \\times "+h+"}{3} \\\\ &= "+fmt(ans2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" cm\u00B3</b>.",
    {mode:mode,l:l,w:w,h:h});
  q2.figure=u3vPyrFig(l,w,h,"cm");
  return q2;
}, ["Cones and pyramids each take one third of the matching cylinder or prism.", "Find the full cylinder or prism volume first, then divide by 3."]);

E("u3-sphere-volume", 3, ["3.12"], 2, "gen", function(){
  var ctx=pick(["A bocce ball","A spherical water feature ball","An exercise ball (treat as a solid for the space it takes up)","A spherical ornament","A bowling ball","A globe","A spherical paperweight","A round fishbowl (treat as a full sphere)"]);
  var r=ri(5,16), ans=4*Math.PI*r*r*r/3;
  var ds=[4*Math.PI*r*r, Math.PI*r*r*r, 4*Math.PI*r*r/3];
  var q=mcq(ctx+" has radius "+r+" cm. What is the volume of space it takes up, to the nearest whole unit?",
    {t:fmt(Math.round(ans))+" cm\u00B3", fb:"Yes: \\(\\frac{4\\pi r^3}{3}\\) with the radius cubed."},
    [{t:fmt(Math.round(ds[0]))+" cm\u00B3", fb:"That is the sphere surface area formula, \\(4\\pi r^2\\), which covers the outside."},
     {t:fmt(Math.round(ds[1]))+" cm\u00B3", fb:"That cubes the radius but drops the factor of four thirds."},
     {t:fmt(Math.round(ds[2]))+" cm\u00B3", fb:"That uses the radius squared in the volume formula; volume needs the radius cubed."}],
    "For a sphere, \\(V = \\frac{4\\pi r^3}{3}\\). \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r+")^3}{3} \\\\ &\\approx "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" cm\u00B3</b>.",
    {r:r});
  q.figure=u3vSphereFig(r,"cm");
  return q;
}, ["Use the sphere formula from the formula sheet, with the radius cubed.", "Cube the radius first, then multiply by 4 pi and divide by 3."]);

E("u3-capacity-tools", 3, ["3.13","3.6"], 2, "gen", function(){
  var mode=pick(["displace","fill","spoons"]);
  if(mode==="displace"){
    var start=ri(100,200), vol=ri(25,90), fin=start+vol;
    var _bo0=balOpts({t:vol+"", fb:"Yes: the rise in level equals the volume of the stone, and 1 mL is 1 cubic centimetre."}, [{t:fin+"", fb:"That is the final level, not the rise caused by the stone."},
       {t:start+"", fb:"That is the starting level of the water alone."},
       {t:(fin+start)+"", fb:"Adding the two levels double counts the water; subtract to find the rise."}]); return mcq("A graduated cylinder holds "+start+" mL of water. A stone is lowered in and the level rises to "+fin+" mL. The stone is a solid, so the rise measures the space it takes up. What is the volume of the stone, in cubic centimetres?", _bo0[0], _bo0[1],
      "Displacement: subtract the starting level from the final level. \\[ \\begin{aligned} V &= "+fin+" - "+start+" \\\\ &= "+vol+"\\ \\text{mL} = "+vol+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+vol+" cm\u00B3</b>.",
      {mode:mode,start:start,fin:fin});
  }
  if(mode==="fill"){
    var cap=pick([400,500,600,800,1000]), frac=pick([[1,2,"one half"],[1,4,"one quarter"],[3,4,"three quarters"]]);
    var amt=cap*frac[0]/frac[1];
    var _bo1=balOpts({t:amt+"", fb:"Yes: the stated fraction of the full capacity."}, [{t:cap+"", fb:"That is the full capacity; the jug is only partly filled."},
       {t:(cap+amt)+"", fb:"That adds the full capacity to the filled amount, which double counts the jug."},
       {t:(amt/2)+"", fb:"That halves the filled amount a second time; apply the fraction once."}]); return mcq("A measuring jug has a capacity of "+cap+" mL. It is filled to the "+frac[2]+" mark. How much liquid is in the jug, in millilitres?", _bo1[0], _bo1[1],
      "Capacity is what the jug can hold in total; multiply by the filled fraction. \\[ \\begin{aligned} \\text{Amount} &= "+cap+" \\times \\frac{"+frac[0]+"}{"+frac[1]+"} \\\\ &= "+amt+"\\ \\text{mL} \\end{aligned} \\] The answer is <b>"+amt+" mL</b>.",
      {mode:mode,cap:cap,amt:amt});
  }
  var spoon=pick([5,15]), n=ri(4,12), tot=spoon*n;
  var _bo2=balOpts({t:tot+"", fb:"Yes: spoonfuls times the size of one spoon."}, [{t:(tot-spoon)+"", fb:"That is one spoonful short of the full bottle."},
     {t:spoon+"", fb:"That is one spoonful only, not the whole bottle."},
     {t:(tot*10)+"", fb:"That is ten times too large; multiply the count by the spoon size once."}]); return mcq("A cook measures syrup with a "+spoon+" mL measuring spoon. A bottle takes "+n+" level spoonfuls to empty. What is the capacity of the bottle, in millilitres?", _bo2[0], _bo2[1],
    "Multiply the number of spoonfuls by the capacity of one spoon. \\[ \\begin{aligned} \\text{Capacity} &= "+n+" \\times "+spoon+" \\\\ &= "+tot+"\\ \\text{mL} \\end{aligned} \\] The answer is <b>"+tot+" mL</b>.",
    {mode:mode,spoon:spoon,n:n});
}, ["Capacity work uses a measuring tool: a level, a fill fraction, or a count of spoonfuls.", "For displacement subtract the two levels; for a fill fraction multiply it by the full capacity."]);

E("u3-dimension-change", 3, ["3.14"], 2, "gen", function(){
  var S=[
    {d:"only the length is doubled", f:2, w:[3,4,8]},
    {d:"only the height is tripled", f:3, w:[2,6,9]},
    {d:"every dimension is doubled", f:8, w:[2,4,6]},
    {d:"only the radius is doubled (height unchanged)", f:4, w:[2,8,16]},
    {d:"only the height is halved", f:0.5, w:[2,0.25,1]},
    {d:"every dimension is tripled", f:27, w:[3,9,81]}
  ];
  var s=pick(S), V=ri(30,300), ans=V*s.f;
  var ds=s.w.map(function(x){return V*x;});
  return mcq("A solid has a volume of "+V+" cm\u00B3. It is rebuilt so that "+s.d+". What is the new volume?",
    {t:fmt(ans)+" cm\u00B3", fb:"Yes: the volume scales by the factor for the change described."},
    ds.map(function(x,i){return {t:fmt(x)+" cm\u00B3", fb:"That scaling factor does not match the change: count how many dimensions changed and whether a radius was squared."};}),
    "Volume scales by the product of the dimension factors. Here the factor is \\("+fmt(s.f)+"\\). \\[ \\begin{aligned} V_{new} &= "+V+" \\times "+fmt(s.f)+" \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
    {change:s.d, V:V});
}, ["Each changed dimension contributes its own factor, and a radius change counts twice because it is squared.", "Decide the factor for one changed dimension, then multiply the factors together."]);

E("u3-one-third", 3, ["3.15"], 2, "gen", function(){
  var mode=pick(["coneFromCyl","pyrFromPrism","cylFromCone","prismFromPyr"]);
  var base=ri(15,120);
  var data={
    coneFromCyl:{given:"A cylinder has a volume of "+(base*3)+" cm\u00B3. A cone has the same base and the same height.", ask:"the volume of the cone", ans:base, unit:"cm\u00B3"},
    pyrFromPrism:{given:"A prism has a volume of "+(base*3)+" cm\u00B3. A pyramid has the same base and the same height.", ask:"the volume of the pyramid", ans:base, unit:"cm\u00B3"},
    cylFromCone:{given:"A cone has a volume of "+base+" cm\u00B3. A cylinder has the same base and the same height.", ask:"the volume of the cylinder", ans:base*3, unit:"cm\u00B3"},
    prismFromPyr:{given:"A pyramid has a volume of "+base+" cm\u00B3. A prism has the same base and the same height.", ask:"the volume of the prism", ans:base*3, unit:"cm\u00B3"}
  };
  var d=data[mode], ans=d.ans;
  var ds=(mode==="coneFromCyl"||mode==="pyrFromPrism") ? [base*3, base*2, Math.round(base/2)] : [base, base*2, base*6];
  return mcq(d.given+" What is "+d.ask+"?",
    {t:fmt(ans)+" "+d.unit, fb:"Yes: the pointed solid is one third of the straight sided partner with the same base and height."},
    ds.map(function(x){return {t:fmt(x)+" "+d.unit, fb:"That ratio is not one third (or three times): a cone or pyramid holds exactly one third of its partner."};}),
    "With the same base and height, a cone holds one third of a cylinder, and a pyramid holds one third of a prism. The required volume is <b>"+fmt(ans)+" "+d.unit+"</b>.",
    {mode:mode, base:base});
}, ["Same base and same height means the one third relationship applies.", "If the partner volume is given, divide by 3 for the cone or pyramid and multiply by 3 going the other way."]);

E("u3-composite-volume", 3, ["3.16","3.12"], 2, "gen", function(){
  var depth,l1,h1,l2,h2,low,up,ans,ds,ctries=0;
  do { depth=ri(4,8); l1=ri(8,14); h1=ri(3,6); l2=ri(4,7); h2=ri(2,5);
    low=l1*depth*h1; up=l2*depth*h2; ans=low+up; ds=[low, up, (l1+l2)*depth*(h1+h2)]; ctries++;
  } while(!u3vUniq([ans].concat(ds)) && ctries<40);
  if(!u3vUniq([ans].concat(ds))){ depth=5; l1=10; h1=4; l2=6; h2=3; low=200; up=90; ans=290; ds=[200,90,560]; }
  var q=mcq("A step shaped display stand is "+depth+" cm deep. Its lower block is "+l1+" cm long and "+h1+" cm high. Its upper block is "+l2+" cm long and "+h2+" cm high. What is the total volume?",
    {t:fmt(ans)+" cm\u00B3", fb:"Yes: add the volumes of the two blocks."},
    [{t:fmt(ds[0])+" cm\u00B3", fb:"That is only the lower block; the upper block still has to be added."},
     {t:fmt(ds[1])+" cm\u00B3", fb:"That is only the upper block; the lower block is much bigger and is missing."},
     {t:fmt(ds[2])+" cm\u00B3", fb:"That treats the stand as one tall block and counts space that is not there."}],
    "Split the composite into two prisms and add. \\[ \\begin{aligned} V &= ("+l1+" \\times "+depth+" \\times "+h1+") + ("+l2+" \\times "+depth+" \\times "+h2+") \\\\ &= "+fmt(low)+" + "+fmt(up)+" \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
    {depth:depth,l1:l1,h1:h1,l2:l2,h2:h2});
  q.figure=u3vCompFig(l1,l2,h1,h2,"cm");
  return q;
}, ["Split a composite solid into simple prisms, then add the parts.", "Find the volume of the lower block first."]);

E("u3-trade-formula", 3, ["2.3"], 2, "var", varset([
  function(){ return mcq("A concrete worker orders concrete for a slab. The slab volume is found with \\(V = lwh\\). How is the formula used in this trade?",
    {t:"It gives the volume to order, so the worker orders that many cubic units of concrete", fb:"Yes: concrete is sold by volume, so the formula sets the order amount."},
    [{t:"It gives the area of the top of the slab, for painting the top of it", fb:"Top area would use length times width only, with no height."},
     {t:"It gives the distance around the slab for edging, measured in metres", fb:"Distance around is perimeter, not a volume formula."},
     {t:"It gives the mass of the slab in kilograms, worked out directly from its size and shape", fb:"The formula gives volume; mass would also need the density of concrete."}],
    "Concrete is ordered by volume, and \\(V = lwh\\) gives the slab volume. The answer is <b>it gives the volume to order</b>.", {}); },
  function(){ return mcq("An aquarium shop worker uses \\(V = lwh\\) and then converts cubic centimetres to litres. Why?",
    {t:"Filters and heaters are rated by the water capacity of the tank, in litres", fb:"Yes: equipment is matched to how much water the tank holds."},
    [{t:"The colour of the fish depends on the tank volume in the pet shop today", fb:"Fish colour is not set by a volume calculation."},
     {t:"The glass thickness is read from the volume of water the tank can hold in total", fb:"Glass thickness is a separate specification; the conversion here is for water capacity."},
     {t:"Litres measure the length of the tank, end to end, in the shop", fb:"Litres measure capacity, not length."}],
    "Tank equipment is rated in litres, so the worker converts the inside volume to a capacity in litres. The answer is <b>filters and heaters are rated by the water capacity of the tank, in litres</b>.", {}); },
  function(){ return mcq("A pool installer uses \\(V = \\pi r^2 h\\) for a round above ground pool. What does the result tell the installer?",
    {t:"How much water is needed to fill the pool, so the fill time and chemical amounts can be planned", fb:"Yes: the cylinder volume is the water capacity of the pool."},
    [{t:"How much liner fabric is needed to cover the walls only, not the floor, so the fabric order can be placed", fb:"Liner fabric is a surface area question, not the cylinder volume."},
     {t:"How long the pool deck should be, so the boards can be ordered for building it", fb:"Deck length is a length decision, not a volume result."},
     {t:"How deep the pool ladder is, so a replacement can be ordered to match it", fb:"The ladder depth is a given length; the formula gives the full pool volume."}],
    "A round pool is a cylinder, so \\(V = \\pi r^2 h\\) gives the water it holds. The answer is <b>how much water is needed to fill the pool</b>.", {}); },
  function(){ return mcq("A grain farmer estimates the space in a cylindrical bin with \\(V = \\pi r^2 h\\). How is the result used?",
    {t:"It tells how much grain the bin can store before it is full", fb:"Yes: storage planning uses the bin volume."},
    [{t:"It tells the outside area to paint on the bin outside", fb:"Painting is a surface area question."},
     {t:"It tells the ground distance around the bin at ground level outside", fb:"Distance around is circumference, not volume."},
     {t:"It tells the height of the bin directly, in metres", fb:"The height is an input to the formula, not its result."}],
    "The bin is a cylinder, and its volume is its storage space. The answer is <b>it tells how much grain the bin can store</b>.", {}); },
  function(){ return mcq("A baker fills cone shaped moulds and uses \\(V = \\frac{\\pi r^2 h}{3}\\). Why does the division by 3 matter in this job?",
    {t:"Each mould holds only one third of a cylinder of batter, so the batch is portioned correctly", fb:"Yes: a cone holds one third of the matching cylinder."},
    [{t:"The batter triples when it bakes, so a small batch fills every mould in the bakery kitchen today", fb:"The factor of 3 is in the cone formula itself, not a baking change."},
     {t:"Three moulds share one oven shelf, so the whole batch is baked all at once in one go", fb:"Shelf layout does not explain the formula factor."},
     {t:"The mould is three times as tall as the cylinder it is portioned from in the bakery", fb:"The height used is the mould height; the one third is the cone shape factor."}],
    "A cone holds one third of the matching cylinder, so the formula portions the batter. The answer is <b>each mould holds only one third of a cylinder of batter</b>.", {}); },
  function(){ return mcq("A plumber checks a cylindrical hot water tank with \\(V = \\pi r^2 h\\) and converts the answer to litres. What job decision uses the result?",
    {t:"Choosing a replacement tank with enough capacity for the household", fb:"Yes: tanks are chosen by their capacity in litres."},
    [{t:"Choosing the colour of the tank jacket for the new house", fb:"Colour is not decided by a capacity calculation."},
     {t:"Measuring the pipe length to the bathroom, through the walls of the house", fb:"Pipe length is a length measurement, not the tank volume."},
     {t:"Setting the water pressure in the house, at the tap", fb:"Pressure is a separate setting; the formula gives capacity."}],
    "The tank volume converts to a capacity in litres, which drives the replacement choice. The answer is <b>choosing a replacement tank with enough capacity for the household</b>.", {}); }
]), ["Ask what decision the volume result drives in that job.", "Trades use volume to order, fill, store or size something; area and length answers serve different jobs."]);

E("u3-error-analysis", 3, ["2.5"], 2, "gen", function(){
  var mode=pick(["coneNoThird","cylDiameter","sphereSquare","pyrNoThird"]);
  if(mode==="coneNoThird"){
    var r=ri(3,8), h=ri(6,15), wrong=Math.PI*r*r*h, right=wrong/3;
    return mcq("A student finds the volume of a cone with radius "+r+" cm and height "+h+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student used the cylinder formula; divide by 3 to get about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: the cone formula has the factor of one third."},
      [{t:"The student should simply have doubled the answer to get about "+fmt(Math.round(wrong*2))+" cm\u00B3", fb:"Doubling moves the wrong way; a cone is smaller than the matching cylinder."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That value is the cylinder volume for the same base and height, so the one third is missing."},
       {t:"The student should have used the surface area formula in its place", fb:"The question asks for volume; the fix is the one third in the cone volume formula."}],
      "A cone is one third of the matching cylinder. \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the cylinder formula; divide by 3</b>.",
      {mode:mode,r:r,h:h});
  }
  if(mode==="cylDiameter"){
    var d=pick([8,10,12,14,16,20]), h=ri(6,16), r=d/2, wrong=Math.PI*d*d*h, right=Math.PI*r*r*h;
    return mcq("A student finds the volume of a cylinder with diameter "+d+" cm and height "+h+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student used the diameter as the radius; use radius "+r+" cm to get about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: the formula needs the radius, half the diameter."},
      [{t:"The student should have divided the answer by 2, not by 4, to get about "+fmt(Math.round(wrong/2))+" cm\u00B3", fb:"Halving is not enough: squaring the doubled radius made the answer four times too big."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"The diameter was squared in place of the radius, so the value is too large."},
       {t:"The student should have added the height and diameter first, before multiplying", fb:"Adding lengths is not part of the cylinder volume formula."}],
      "The radius is half the diameter: \\(r = "+r+"\\ \\text{cm}\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the diameter as the radius</b>.",
      {mode:mode,d:d,h:h});
  }
  if(mode==="sphereSquare"){
    var r2=ri(3,9), wrong=4*Math.PI*r2*r2/3, right=4*Math.PI*r2*r2*r2/3;
    return mcq("A student finds the volume of a sphere with radius "+r2+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student squared the radius instead of cubing it; the volume is about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: sphere volume uses the radius cubed."},
      [{t:"The student should have multiplied the whole answer by 3 to get about "+fmt(Math.round(wrong*3))+" cm\u00B3", fb:"The missing step is cubing the radius, not a further multiplication of the wrong value."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That value comes from the radius squared, so it understates the volume."},
       {t:"The student should have used the circumference formula instead of the volume formula", fb:"Circumference is a length; the question asks for volume."}],
      "Sphere volume cubes the radius. \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r2+")^3}{3} \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student squared the radius instead of cubing it</b>.",
      {mode:mode,r:r2});
  }
  var l=ri(4,9), w=ri(4,9), h2=ri(6,14), wrong2=l*w*h2, right2=wrong2/3;
  return mcq("A student finds the volume of a square based pyramid with base "+l+" cm by "+w+" cm and height "+h2+" cm and gets "+fmt(wrong2)+" cm\u00B3. Which statement identifies and corrects the error?",
    {t:"The student used the prism formula; divide by 3 to get "+fmt(right2)+" cm\u00B3", fb:"Yes: a pyramid is one third of the matching prism."},
    [{t:"The student should have taken one half of it to get "+fmt(wrong2/2)+" cm\u00B3", fb:"A pyramid takes one third of the prism, not one half."},
     {t:"There is no error; "+fmt(wrong2)+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That is the full prism volume for the same base and height."},
     {t:"The student should have found the base perimeter first, not the volume", fb:"Perimeter is not part of the pyramid volume formula."}],
    "A pyramid is one third of the matching prism. \\[ \\begin{aligned} V &= \\frac{"+l+" \\times "+w+" \\times "+h2+"}{3} \\\\ &= "+fmt(right2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the prism formula; divide by 3</b>.",
    {mode:mode,l:l,w:w,h:h2});
}, ["Compare the student value with the matching straight sided solid.", "Check for the classic errors: a missing one third, the diameter used as the radius, or a radius squared instead of cubed."]);

E("u3-equivalent-forms", 3, ["2.6"], 2, "var", varset([
  function(){ return mcq("Why are \\(V = lwh\\) and \\(V = (lw)h\\) equivalent forms for a rectangular prism?",
    {t:"Both multiply the same three dimensions; (lw) is the base area, then times the height", fb:"Yes: grouping the first two factors gives base area times height."},
    [{t:"They are equal only when the height is 1, and they disagree at every other height tried", fb:"The grouping holds for every height, not just 1."},
     {t:"(lw)h adds the base area to the height rather than multiplying by it", fb:"The brackets mean multiply, not add."},
     {t:"They give different answers in square units, so only one of them can be right", fb:"Volume is in cubed units, and both forms give the same value."}],
    "Multiplication can be grouped either way: \\((lw)h = lwh\\). The answer is <b>both multiply the same three dimensions</b>.", {}); },
  function(){ return mcq("A cylinder has diameter \\(d\\). Why does \\(V = \\pi \\left(\\frac{d}{2}\\right)^2 h\\) give the same volume as \\(V = \\pi r^2 h\\)?",
    {t:"The radius is half the diameter, so the two formulas use the same radius", fb:"Yes: substituting r = d/2 changes nothing about the value."},
    [{t:"The diameter and radius are the same length, both drawn from the centre point", fb:"The radius is half the diameter, not the same length."},
     {t:"Dividing by 2 cancels the squaring, so the radius is used just as is", fb:"The squaring still applies to the halved value; the forms match because r = d/2."},
     {t:"The formulas match only for height 2, and for no other height value", fb:"They match for every height because the radius terms are identical."}],
    "Since \\(r = \\frac{d}{2}\\), the two radius terms are the same number. The answer is <b>the radius is half the diameter, so the two formulas use the same radius</b>.", {}); },
  function(){ return mcq("Why are \\(V = \\frac{\\pi r^2 h}{3}\\) and \\(V = \\frac{1}{3} \\pi r^2 h\\) equivalent for a cone?",
    {t:"Dividing the whole product by 3 is the same as multiplying it by one third", fb:"Yes: division by 3 and multiplication by one third are the same operation."},
    [{t:"The 3 moves to the height and triples it in the second form instead of dividing", fb:"The 3 divides the product; it does not change the height."},
     {t:"They match only when pi is taken as 3, and not with the true value of pi", fb:"They match for the exact value of pi as well; the one third is the key."},
     {t:"One third of pi is exactly 1, so both give \\(r^2 h\\)", fb:"One third of pi is about 1.05, not 1; the forms are equal as written, not simplified that way."}],
    "Dividing by 3 equals multiplying by \\(\\frac{1}{3}\\). The answer is <b>dividing the whole product by 3 is the same as multiplying it by one third</b>.", {}); },
  function(){ return mcq("For any prism, \\(V = Bh\\) where \\(B\\) is the base area. Why does this agree with \\(V = lwh\\) for a rectangular prism?",
    {t:"The base area B is l times w, so Bh is lwh with the base grouped", fb:"Yes: B = lw for a rectangular base."},
    [{t:"B stands for the perimeter of the base of the solid", fb:"B is the base area, not its perimeter."},
     {t:"The two formulas agree only for cubes, and for no other solid shape", fb:"They agree for every rectangular prism because B = lw always."},
     {t:"h is part of the base area, so it sits inside B", fb:"The height is separate from the base; B covers only length and width."}],
    "With \\(B = lw\\), \\(Bh = (lw)h = lwh\\). The answer is <b>the base area B is l times w, so Bh is lwh with the base grouped</b>.", {}); },
  function(){ return mcq("Why are \\(V = \\frac{4\\pi r^3}{3}\\) and \\(V = \\frac{4}{3} \\pi r^3\\) equivalent for a sphere?",
    {t:"Four pi r cubed divided by 3 is the same as four thirds times pi r cubed", fb:"Yes: the fraction four thirds is the combined factor."},
    [{t:"The 4 and the 3 swap places in the second form of the formula shown", fb:"Nothing swaps; the second form writes 4 divided by 3 as the fraction four thirds."},
     {t:"They match only when the radius is 3, and at no other radius value", fb:"They match for every radius; the algebra does not depend on r."},
     {t:"Four thirds is greater than 4, so the second form gives a larger volume overall", fb:"Four thirds is about 1.33, and it already includes the division by 3."}],
    "\\(\\frac{4\\pi r^3}{3} = \\frac{4}{3} \\pi r^3\\). The answer is <b>four pi r cubed divided by 3 is the same as four thirds times pi r cubed</b>.", {}); },
  function(){ return mcq("A pyramid formula is written as \\(V = \\frac{Bh}{3}\\) and as \\(V = \\frac{lwh}{3}\\). Why are they equivalent for a square based pyramid?",
    {t:"The base area B equals l times w for the rectangular base", fb:"Yes: replacing B with lw gives the second form."},
    [{t:"B equals the height of the pyramid itself", fb:"B is a base area, not a height."},
     {t:"The forms agree only when l equals w equals h", fb:"They agree for any base length and width because B = lw by definition."},
     {t:"The division by 3 applies to the height only in one form of it", fb:"In both forms the whole product is divided by 3; the placement does not change the value."}],
    "For a rectangular base, \\(B = lw\\), so \\(\\frac{Bh}{3} = \\frac{lwh}{3}\\). The answer is <b>the base area B equals l times w</b>.", {}); }
]), ["Look for the same factors in both forms, grouped or written differently.", "Substitute what each letter stands for, such as B for base area or d/2 for radius."]);

E("u3-create-solve", 3, ["2.4","3.16"], 2, "gen", function(){
  var mode=pick(["bottles","boxes","filltime"]);
  if(mode==="bottles"){
    var pair=pick([[20,2],[20,4],[20,5],[40,2],[40,4],[40,5],[50,2],[50,5],[25,5],[60,4],[60,5],[30,2],[30,5]]);
    var capL=pair[0], bottle=pair[1], n=capL/bottle;
    return mcq("For a project, a student creates this problem: a cooler holds "+capL+" L. How many "+bottle+" L bottles fill it exactly? What is the answer to the created problem?",
      {t:fmt(n)+"", fb:"Yes: divide the capacity by the size of one bottle."},
      [{t:fmt(capL*bottle)+"", fb:"That multiplies; the number of bottles is the capacity shared into bottle sized parts."},
       {t:fmt(capL-bottle)+"", fb:"That subtracts; filling is a division relationship."},
       {t:fmt(n*2)+"", fb:"That doubles the quotient; divide once."}],
      "Share the capacity into bottle sized parts. \\[ \\begin{aligned} n &= "+capL+" \\div "+bottle+" \\\\ &= "+fmt(n)+" \\end{aligned} \\] The answer is <b>"+fmt(n)+" bottles</b>.",
      {mode:mode,capL:capL,bottle:bottle});
  }
  if(mode==="boxes"){
    var n2,l,w,h,one,tot,tries2=0;
    do { n2=ri(4,9); l=ri(3,6); w=ri(3,5); h=ri(2,4); one=l*w*h; tot=one*n2; tries2++;
    } while(!u3vUniq([tot, one, (l+w+h)*n2, tot*2]) && tries2<40);
    if(!u3vUniq([tot, one, (l+w+h)*n2, tot*2])){ n2=4; l=4; w=5; h=3; one=60; tot=240; }
    return mcq("For a project, a student creates this problem: "+n2+" identical crates each measure "+l+" m by "+w+" m by "+h+" m. What is their total volume, in cubic metres? What is the answer to the created problem?",
      {t:fmt(tot)+"", fb:"Yes: one crate volume times the number of crates."},
      [{t:fmt(one)+"", fb:"That is one crate only; there are "+n2+" crates."},
       {t:fmt((l+w+h)*n2)+"", fb:"That adds the dimensions; volume multiplies the three dimensions first."},
       {t:fmt(tot*2)+"", fb:"That doubles the total; multiply the single volume by the count once."}],
      "Find one volume, then scale by the count. \\[ \\begin{aligned} V_{one} &= "+l+" \\times "+w+" \\times "+h+" = "+one+" \\\\ V_{total} &= "+one+" \\times "+n2+" = "+fmt(tot)+"\\ \\text{m}^3 \\end{aligned} \\] The answer is <b>"+fmt(tot)+" m\u00B3</b>.",
      {mode:mode,n:n2,one:one});
  }
  var rate=pick([5,8,10,20]), mins=ri(3,9), tot2=rate*mins;
  return mcq("For a project, a student creates this problem: a hose fills a tank at "+rate+" L per minute for "+mins+" minutes. How much water is added, in litres? What is the answer to the created problem?",
    {t:fmt(tot2)+"", fb:"Yes: rate times time gives the amount added."},
    [{t:fmt(rate+mins)+"", fb:"That adds the rate and the time; a rate is multiplied by time."},
     {t:fmt(tot2-rate)+"", fb:"That is one minute of filling short of the full amount."},
     {t:fmt(tot2*10)+"", fb:"That is ten times too large; check the place value of the product."}],
    "Amount equals rate times time. \\[ \\begin{aligned} \\text{Amount} &= "+rate+" \\times "+mins+" \\\\ &= "+fmt(tot2)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(tot2)+" L</b>.",
    {mode:mode,rate:rate,mins:mins});
}, ["A created problem still uses the same volume relationships: divide to share, multiply to scale or to apply a rate.", "Solve the created problem one step at a time, starting with a single unit or a single crate."]);

/* ---------- Level 2, constructed response ---------- */
E("u3-cr-tank-capacity", 3, ["3.13","2.1"], 2, "gen", function(){
  var l=ri(8,16)*5, w=ri(6,10)*5, h=ri(6,12)*5;
  var cm3=l*w*h, ans=cm3/1000;
  return numq("A rectangular fish tank is "+l+" cm long, "+w+" cm wide and "+h+" cm high. What is its capacity, in litres? Give your answer in litres.",
    ans, 0.5,
    "Multiply the inside dimensions, then convert: \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3\\). \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+fmt(cm3)+"\\ \\text{cm}^3 \\\\ \\text{Capacity} &= "+fmt(cm3)+" \\div 1{,}000 \\\\ &= "+fmt(ans)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {l:l,w:w,h:h});
}, ["Find the inside volume in cubic centimetres first.", "Convert at the end: divide cubic centimetres by 1,000 to get litres."]);

E("u3-cr-cylinder", 3, ["3.12"], 2, "gen", function(){
  var r=ri(4,12), h=ri(8,24), raw=Math.PI*r*r*h, ans=Math.round(raw*10)/10;
  return numq("A cylindrical canister has radius "+r+" cm and height "+h+" cm. Find its volume, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.2,
    "Use \\(V = \\pi r^2 h\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {r:r,h:h});
}, ["Use the cylinder formula from the formula sheet.", "Square the radius first, then multiply by pi and the height."]);

E("u3-cr-si-conversion", 3, ["3.10"], 2, "gen", function(){
  var modes=[
    {txt:function(v){return "Convert "+fmt(v)+" m\u00B3 to litres.";}, fac:1000, ftxt:"1,000", unit:"L", gen:function(){return ri(3,14);}, step:"1 m\u00B3 = 1,000 L, so multiply"},
    {txt:function(v){return "Convert "+fmt(v)+" cm\u00B3 to litres.";}, fac:0.001, ftxt:"1/1,000", unit:"L", gen:function(){return ri(25,95)*100;}, step:"1 L = 1,000 cm\u00B3, so divide by 1,000"},
    {txt:function(v){return "Convert "+fmt(v)+" L to millilitres.";}, fac:1000, ftxt:"1,000", unit:"mL", gen:function(){return ri(3,11);}, step:"1 L = 1,000 mL, so multiply"},
    {txt:function(v){return "Convert "+fmt(v)+" m\u00B3 to cubic centimetres.";}, fac:1000000, ftxt:"1,000,000", unit:"cm\u00B3", gen:function(){return ri(2,7);}, step:"1 m\u00B3 = 1,000,000 cm\u00B3, so multiply"}
  ];
  var m=pick(modes), v=m.gen(), ans=v*m.fac;
  return numq(m.txt(v)+" Give your answer in "+m.unit+".",
    ans, Math.max(0.5, ans*0.01),
    "Cubed SI conversions use factors of \\(1{,}000\\): "+m.step+". \\[ "+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+" \\] The answer is <b>"+fmt(ans)+" "+m.unit+"</b>.",
    {v:v, unit:m.unit});
}, ["Cubed SI units step by 1,000, not by 10.", "Decide whether the target unit is bigger or smaller, then multiply or divide by 1,000 for each step."]);

E("u3-cr-cone", 3, ["3.12","3.15"], 2, "gen", function(){
  var r=ri(4,10), h=ri(9,21), raw=Math.PI*r*r*h/3, ans=Math.round(raw*10)/10;
  return numq("A cone shaped paper cup has radius "+r+" cm and height "+h+" cm. Find the volume it can hold, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.2,
    "A cone holds one third of the matching cylinder. \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {r:r,h:h});
}, ["Use the cone formula from the formula sheet.", "Find the matching cylinder volume first, then take one third of it."]);

E("u3-cr-find-height", 3, ["2.2","3.12"], 2, "gen", function(){
  var r=ri(3,8), h=ri(6,18), coeff=r*r*h;
  return numq("A cylinder has radius "+r+" cm and volume \\("+coeff+"\\pi\\) cm\u00B3. Find its height. Give your answer in cm.",
    h, 0.2,
    "Start from \\(V = \\pi r^2 h\\) and rearrange for the height. \\[ \\begin{aligned} "+coeff+"\\pi &= \\pi ("+r+")^2 h \\\\ h &= \\frac{"+coeff+"}{"+(r*r)+"} \\\\ &= "+h+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+h+" cm</b>.",
    {r:r,h:h});
}, ["Write the volume formula first, then rearrange it for the unknown height.", "Substitute the radius and the volume, cancel pi, then divide."]);

E("u3-cr-composite", 3, ["3.16"], 2, "gen", function(){
  var l=ri(6,12), w=ri(4,8), h1=ri(4,8), h2=ri(3,7);
  var base=l*w*h1, cyl=Math.PI*(w/2)*(w/2)*h2;
  var raw=base+cyl, ans=Math.round(raw*10)/10;
  return numq("A display block is a rectangular prism "+l+" cm long, "+w+" cm wide and "+h1+" cm high. A solid cylinder of diameter "+w+" cm and height "+h2+" cm stands on top of it. Find the total volume, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.3,
    "Add the prism volume and the cylinder volume. The cylinder radius is half of "+w+", which is "+fmt(w/2)+". \\[ \\begin{aligned} V_{prism} &= "+l+" \\times "+w+" \\times "+h1+" = "+fmt(base)+" \\\\ V_{cyl} &= \\pi ("+fmt(w/2)+")^2 ("+h2+") \\approx "+fmt(cyl)+" \\\\ V_{total} &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {l:l,w:w,h1:h1,h2:h2});
}, ["Split the composite into a prism part and a cylinder part, then add.", "Find the prism volume first; remember the cylinder needs the radius, half the diameter."]);

/* ---------- Level 3, multiple choice ---------- */
E("u3-sphere-capacity", 3, ["3.13","3.12"], 3, "gen", function(){
  var r=ri(18,45), raw=4*Math.PI*r*r*r/3, ansL=raw/1000;
  var ds=[raw, 4*Math.PI*r*r/1000, ansL/2];
  var tank=pick(["A spherical water tank","A spherical storage tank","A spherical aquarium tank","A spherical process tank"]);
  var q=mcq(tank+" has radius "+r+" cm. What is its capacity, to the nearest litre?",
    {t:fmt(Math.round(ansL))+"", fb:"Yes: sphere volume in cubic centimetres, then divided by 1,000 to get litres."},
    [{t:fmt(Math.round(ds[0]))+"", fb:"That is the volume in cubic centimetres with no conversion; litres are 1,000 times smaller as a count."},
     {t:fmt(Math.round(ds[1]))+"", fb:"That uses the surface area formula, \\(4\\pi r^2\\), which covers the outside of the sphere."},
     {t:fmt(Math.round(ds[2]))+"", fb:"That is only half the tank; the formula gives the full sphere."}],
    "Find the volume, then convert: \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3\\). \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r+")^3}{3} \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\\\ \\text{Capacity} &\\approx "+fmt(raw)+" \\div 1{,}000 \\\\ &\\approx "+fmt(ansL)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ansL))+" L</b>.",
    {r:r});
  q.figure=u3vSphereFig(r,"cm");
  return q;
}, ["Find the sphere volume first, then convert the units.", "Cube the radius, apply the sphere formula, and divide cubic centimetres by 1,000 for litres."]);

E("u3-imperial-context", 3, ["3.11","3.16","2.3"], 3, "gen", function(){
  var mode=pick(["concrete","tankgal"]);
  if(mode==="concrete"){
    var ft=ri(2,20)*27, yd=ft/27;
    var _bo0=balOpts({t:fmt(yd)+"", fb:"Yes: divide cubic feet by 27 to get cubic yards."}, [{t:fmt(ft/3)+"", fb:"That divides by the linear factor 3; cubed units divide by 3 cubed, which is 27."},
       {t:fmt(ft)+"", fb:"That keeps the cubic foot number; the unit changed, so the number must change."},
       {t:fmt(ft/9)+"", fb:"That divides by 9, the squared factor; volume needs the cubed factor, 27."}]); return mcq("A concrete worker measures a foundation form and finds it holds "+ft+" ft\u00B3. Concrete is ordered in cubic yards. How many cubic yards should be ordered (exact amount, before any extra for waste)?", _bo0[0], _bo0[1],
      "Cube the linear factor: \\(3^3 = 27\\), so \\(1\\ \\text{yd}^3 = 27\\ \\text{ft}^3\\). \\[ \\begin{aligned} \\text{Order} &= "+ft+" \\div 27 \\\\ &= "+fmt(yd)+"\\ \\text{yd}^3 \\end{aligned} \\] The answer is <b>"+fmt(yd)+" yd\u00B3</b>.",
      {mode:mode,ft:ft});
  }
  var ft2=ri(6,40), gal=Math.round(ft2*6.23*10)/10;
  var _bo1=balOpts({t:fmt(gal)+"", fb:"Yes: multiply the cubic feet by the stated rate."}, [{t:fmt(ft2)+"", fb:"That keeps the cubic foot number; apply the stated rate."},
     {t:fmt(Math.round(ft2/6.23*10)/10)+"", fb:"That divides by the rate; a gallon count is larger than the cubic foot count here, so multiply."},
     {t:fmt(gal*10)+"", fb:"That is ten times too large; check the place value of the product."}]); return mcq("A fuel tank holds "+ft2+" ft\u00B3. Use the stated rate: \\(1\\ \\text{ft}^3\\) holds about 6.23 imperial gallons. About how many imperial gallons does the tank hold?", _bo1[0], _bo1[1],
    "Multiply by the stated rate. \\[ \\begin{aligned} \\text{Gallons} &\\approx "+ft2+" \\times 6.23 \\\\ &\\approx "+fmt(gal)+" \\end{aligned} \\] The answer is <b>about "+fmt(gal)+" gal</b>.",
    {mode:mode,ft:ft2});
}, ["Convert with the cubed factor, or multiply by a rate when the stem states one.", "For cubic yards, divide cubic feet by 27, since 3 cubed is 27."]);

E("u3-dimension-change-hard", 3, ["3.14","2.4"], 3, "gen", function(){
  var mode=pick(["mixed","allscale","cylmix"]);
  if(mode==="mixed"){
    var V=ri(40,400), ans=V*3;
    return mcq("A student creates this scaling problem: a box has volume "+V+" cm\u00B3. Its length is doubled, its width is halved, and its height is tripled. What is the new volume?",
      {t:fmt(ans)+" cm\u00B3", fb:"Yes: the factors are 2, one half and 3, whose product is 3."},
      [{t:fmt(V*6)+" cm\u00B3", fb:"That multiplies 2 by 3 and forgets the halved width."},
       {t:fmt(V)+" cm\u00B3", fb:"That assumes the changes cancel fully; doubling and halving cancel, but the tripling remains."},
       {t:fmt(V*2)+" cm\u00B3", fb:"That keeps only the doubling; apply all three factors."}],
      "Multiply the dimension factors: \\(2 \\times \\frac{1}{2} \\times 3 = 3\\). \\[ \\begin{aligned} V_{new} &= "+V+" \\times 3 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
      {mode:mode,V:V});
  }
  if(mode==="allscale"){
    var V2=ri(30,200), ans2=V2*8;
    return mcq("A student creates this scaling problem: every dimension of a solid is doubled, and the original volume is "+V2+" cm\u00B3. By what amount does the volume increase?",
      {t:fmt(ans2-V2)+" cm\u00B3", fb:"Yes: the new volume is 8 times the original, so the increase is 7 times the original."},
      [{t:fmt(ans2)+" cm\u00B3", fb:"That is the new volume itself; the question asks for the increase."},
       {t:fmt(V2*2)+" cm\u00B3", fb:"That doubles the original; three doubled dimensions give a factor of 8, not 2."},
       {t:fmt(V2*7)+" cm\u00B3 is the new volume", fb:"Seven times the original is the increase, not the new volume; read what is asked."}],
      "Doubling all three dimensions multiplies volume by \\(2^3 = 8\\). \\[ \\begin{aligned} V_{new} &= 8 \\times "+V2+" = "+fmt(ans2)+" \\\\ \\text{Increase} &= "+fmt(ans2)+" - "+V2+" = "+fmt(ans2-V2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans2-V2)+" cm\u00B3</b>.",
      {mode:mode,V:V2});
  }
  var V3=ri(50,500), ans3=V3*2;
  return mcq("A student creates this scaling problem: a cylinder has volume "+V3+" cm\u00B3. Its radius is doubled and its height is halved. What is the new volume?",
    {t:fmt(ans3)+" cm\u00B3", fb:"Yes: the doubled radius gives a factor of 4, and the halved height gives one half, for a net factor of 2."},
    [{t:fmt(V3*4)+" cm\u00B3", fb:"That applies the radius factor only; the halved height still counts."},
     {t:fmt(V3)+" cm\u00B3", fb:"That assumes the two changes cancel; the radius change is squared, so it outweighs the height change."},
     {t:fmt(V3/2)+" cm\u00B3", fb:"That applies the height change only and drops the radius change."}],
    "The radius is squared, so doubling it gives a factor of \\(4\\); halving the height gives \\(\\frac{1}{2}\\). Net factor: \\(4 \\times \\frac{1}{2} = 2\\). \\[ \\begin{aligned} V_{new} &= "+V3+" \\times 2 \\\\ &= "+fmt(ans3)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" cm\u00B3</b>.",
    {mode:mode,V:V3});
}, ["Give each changed dimension its factor, remembering that a radius counts twice.", "Multiply all the factors first, then apply the net factor to the original volume."]);

E("u3-estimate-hard", 3, ["3.9","3.16"], 3, "gen", function(){
  var mode=pick(["room","tub","tank"]);
  if(mode==="room"){
    var a,b,c,est,rtries=0;
    do { a=ri(3,8); b=ri(3,6); c=ri(2,4); est=a*b*c; rtries++; } while(!u3vUniq([est, a+b+c, a*b, est*10]) && rtries<40);
    return mcq("A storage room is about "+a+" metre sticks long, "+b+" metre sticks wide and "+c+" metre sticks high, where one metre stick cube (\\(1\\ \\text{m}^3\\)) is the referent. What is the best estimate of the room volume?",
      {t:"About "+est+" m\u00B3", fb:"Yes: multiply the three referent counts."},
      [{t:"About "+(a+b+c)+" m\u00B3", fb:"That adds the counts; volume multiplies the three dimensions."},
       {t:"About "+(a*b)+" m\u00B3", fb:"That is the floor area only; the height count is missing."},
       {t:"About "+(est*10)+" m\u00B3", fb:"That is ten times too large for the counts given."}],
      "Multiply the three referent counts. \\[ \\begin{aligned} V &\\approx "+a+" \\times "+b+" \\times "+c+" \\\\ &= "+est+"\\ \\text{m}^3 \\end{aligned} \\] The answer is <b>about "+est+" m\u00B3</b>.",
      {mode:mode,est:est});
  }
  if(mode==="tub"){
    var n=ri(10,30), est2=n*10;
    return mcq("A worker estimates a hot tub capacity by filling it with a 10 L bucket. It takes about "+n+" bucketfuls. The tub also has a curved seat, so the true capacity is a little less than the bucket count suggests. Which estimate is best?",
      {t:"A little under "+est2+" L", fb:"Yes: the bucket count gives "+est2+" L, and the seat takes up some of that space."},
      [{t:"Exactly "+est2+" L", fb:"The seat displaces some water, so the true capacity is a little less than the raw count."},
       {t:"A little over "+est2+" L", fb:"The seat reduces the holding space; it does not add to it."},
       {t:"About "+(n)+" L", fb:"That is the bucket count alone, without the 10 L size of each bucketful."}],
      "The count gives \\("+n+" \\times 10 = "+est2+"\\ \\text{L}\\), and the seat takes up space, so the capacity is a little less. The answer is <b>a little under "+est2+" L</b>.",
      {mode:mode,n:n});
  }
  var jugs=ri(10,40), jugL=4, est3=jugs*jugL;
  return mcq("A gardener estimates a water barrel capacity by filling it with a "+jugL+" L jug. It takes about "+jugs+" jugfuls, but the last jug only partly empties before the barrel is full. Which estimate is best?",
    {t:"A little under "+est3+" L", fb:"Yes: "+jugs+" full jugfuls would be "+est3+" L, and the last one did not fully empty."},
    [{t:"Exactly "+est3+" L", fb:"The last jug only partly emptied, so the total is a little less than the full count."},
     {t:"A little over "+est3+" L", fb:"A partly emptied last jug cannot push the total above the full count value."},
     {t:"About "+jugs+" L", fb:"That is the jug count alone, without the "+jugL+" L size of each jugful."}],
    "The count gives \\("+jugs+" \\times "+jugL+" = "+est3+"\\ \\text{L}\\) for full jugfuls, and the last jug was partial, so the capacity is a little less. The answer is <b>a little under "+est3+" L</b>.",
    {mode:mode,jugs:jugs});
}, ["Start with the referent count times the referent size, then adjust for anything that adds or takes away space.", "Compute the raw estimate first, then decide whether the true value sits a little above or a little below it."]);

/* ---------- Level 3, constructed response ---------- */
E("u3-cr-capacity-remaining", 3, ["3.13","3.16","2.2"], 3, "gen", function(){
  var l=ri(10,15)*5, w=ri(8,12)*5, H=pick([40,50,60]), filled=pick([15,20,25,30]);
  if(filled>=H) filled=H-15;
  var rem=l*w*(H-filled), ans=rem/1000;
  return numq("A rectangular tank is "+l+" cm long and "+w+" cm wide. It is "+H+" cm deep in total, and it is already filled to a depth of "+filled+" cm. How much more water, in litres, will it hold? Give your answer in litres.",
    ans, 0.5,
    "Work with the empty depth, which is the total depth minus the filled depth. \\[ \\begin{aligned} \\text{Empty depth} &= "+H+" - "+filled+" = "+(H-filled)+"\\ \\text{cm} \\\\ V_{empty} &= "+l+" \\times "+w+" \\times "+(H-filled)+" \\\\ &= "+fmt(rem)+"\\ \\text{cm}^3 \\\\ \\text{Capacity left} &= "+fmt(rem)+" \\div 1{,}000 = "+fmt(ans)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {l:l,w:w,H:H,filled:filled});
}, ["Use the empty part of the tank, not the full depth.", "Subtract the filled depth from the total depth first, then find that volume and convert to litres."]);

E("u3-cr-find-base-side", 3, ["2.2","3.12"], 3, "gen", function(){
  var s=ri(4,15), h=pick([6,9,12,15,18,21,24]), V=s*s*h/3;
  return numq("A square based pyramid has height "+h+" cm and volume "+fmt(V)+" cm\u00B3. Find the side length of its square base. Give your answer in cm.",
    s, 0.2,
    "Start from \\(V = \\frac{lwh}{3}\\) with \\(l = w = s\\) for a square base, then rearrange. \\[ \\begin{aligned} "+fmt(V)+" &= \\frac{s^2 \\times "+h+"}{3} \\\\ s^2 &= \\frac{3 \\times "+fmt(V)+"}{"+h+"} = "+(s*s)+" \\\\ s &= "+s+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+s+" cm</b>.",
    {s:s,h:h});
}, ["Write the pyramid volume formula first, using one letter for both base sides.", "Multiply the volume by 3, divide by the height, then take the square root."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 5 and 3 (volume and capacity, formula strand support). Borrowed verbatim from Mathematics 8 (u4-vol-base-times-height, u4-vol-tri-prism, u4-vol-cylinder, u4-holds-most, u4-tank-litres-gap) and Mathematics 1202 (u3-si-convert, u3-imperial-convert, u3-convert-advanced, u2-cr-circ, u6-cr-leg); feeder helper copies ride in bank-helpers.js. ===== */
E("u3-pk-vol-base-height", 3, ["3.12"], 1, "gen", function(){
  var B=ri(8,60), h=ri(3,15);
  var obj=pick(["right prism","right triangular prism","right rectangular prism"]);
  var q=numq("A "+obj+" has a base with area "+B+" cm\\(^{2}\\) and a height of "+h+" cm. Find its volume, in cubic centimetres.", B*h, 0.01,
    "The volume of a right prism is the base area multiplied by the height: \\[ \\begin{aligned} V &= B \\times h \\\\ &= "+B+" \\times "+h+" \\\\ &= "+(B*h)+" \\end{aligned} \\] The volume is <b>"+(B*h)+" cm\\(^{3}\\)</b>.",
    {mode:"base-height", B:B, h:h}); q.figure=m8PrismBaseSVG(obj==="right triangular prism"?"tri":(obj==="right rectangular prism"?"rect":"generic"), B+" cm\u00B2", h+" cm"); return q;
}, ["For any right prism, volume is base area multiplied by height.", "Multiply the given base area by the given height."]);

E("u3-pk-vol-tri-prism", 3, ["3.12"], 1, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var B=a*b/2; var V=B*L;
  var q=numq("Find the volume of the right triangular prism shown, in cubic centimetres.", V, 0.01,
    "Find the area of the triangular base first, then multiply by the length of the prism: \\[ \\begin{aligned} B &= "+FR(1,2)+"\\times "+a+"\\times "+b+" = "+fmt(B)+" \\\\ V &= B \\times L \\\\ &= "+fmt(B)+" \\times "+L+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"tri-vol", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Volume of a prism is base area multiplied by the length it runs for.", "Find the triangle area with one half times leg times leg, then multiply by the prism length."]);

E("u3-pk-vol-cylinder", 3, ["3.12"], 1, "gen", function(){
  var r=ri(2,10), h=ri(3,15);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Find the volume of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in cubic centimetres, to one decimal place.", V, 0.6,
    "A cylinder is a prism with a circular base, so its volume is base area times height: \\[ \\begin{aligned} V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"cyl-vol", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Treat the cylinder like a prism whose base is a circle.", "Find the circle area with pi times radius squared, then multiply by the height."]);

E("u3-pk-holds-most", 3, ["3.16"], 2, "gen", function(){
  var sets=null, vols=null, t=0;
  while(t<200){
    var cand=[]; for(var i=0;i<4;i++){ cand.push([ri(2,12),ri(2,12),ri(2,12)]); }
    var vs=cand.map(function(s){return s[0]*s[1]*s[2];});
    var mx=Math.max.apply(null,vs);
    if(vs.filter(function(v){return v===mx;}).length===1 && new Set(vs).size>=3){ sets=cand; vols=vs; break; }
    t++;
  }
  if(!sets){ sets=[[4,5,6],[3,5,9],[6,6,5],[2,8,7]]; vols=sets.map(function(s){return s[0]*s[1]*s[2];}); }
  var best=vols.indexOf(Math.max.apply(null,vols));
  var names=["Tank A","Tank B","Tank C","Tank D"];
  var opts=names.filter(function(n,i){return i!==best;}).map(function(n){
    var i=names.indexOf(n);
    return {t:n, fb:n+" holds "+vols[i]+" cm\\(^{3}\\), which is less than the largest volume."};
  });
  var desc=sets.map(function(s,i){return names[i]+": "+s[0]+" cm by "+s[1]+" cm by "+s[2]+" cm";}).join("; ");
  var q=mcq("Four storage tanks are shaped like right rectangular prisms. "+desc+". Which tank holds the most water?",
    {t:names[best], fb:"Yes: its volume, "+vols[best]+" cm\\(^{3}\\), is the largest of the four."}, opts,
    "Find each volume by multiplying the three dimensions: "+vols.map(function(v,i){return names[i]+" holds "+v+" cm\\(^{3}\\)";}).join(", ")+". The largest volume belongs to <b>"+names[best]+"</b>.",
    {mode:"holds-most", best:best}); q.figure=m8TanksSVG(sets,names); return q;
}, ["Holding the most water means having the greatest volume.", "Multiply the three dimensions of each tank, then compare the four volumes."]);

E("u3-pk-tank-litres", 3, ["3.13"], 2, "gen", function(){
  var r=pick([4,5,6,8,10,12,15,20]); var d=2*r; var h=ri(6,40);
  var vol=3.14*r*r*h;
  var litres=Math.round(vol/10)/100;
  var ctx=pick(["storage tank","water barrel","feed silo","rain barrel"]);
  var q=numq("A cylindrical "+ctx+" has a diameter of "+d+" cm and a height of "+h+" cm. How many litres of water does it hold when full? Use \\(\\pi = 3.14\\), and use 1000 cm\\(^{3}\\) = 1 L. Give your answer to two decimal places.", litres, 0.02,
    "Halve the diameter to get the radius, then find the volume: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(vol)+" \\text{ cm}^{3} \\end{aligned} \\] Convert to litres: \\("+fmt(vol)+" \\div 1000 = "+fmt(litres)+"\\). The answer is <b>"+fmt(litres)+" L</b>.",
    {mode:"tank-litres", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["The formula needs the radius, and the question asks for litres rather than cubic centimetres.", "Halve the diameter first, find the volume, then divide by 1000 to change the unit."]);

E("u3-pk-area-si-convert", 3, ["3.10"], 1, "gen", function(){
  var mode=pick(["m2cm","cm2mm","cm2m"]);
  if(mode==="m2cm"){ var v=ri(2,18), ans=v*10000;
    return mcq("Write \\("+v+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: 1 square metre is 10 000 square centimetres."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor, 10 000."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000, the cubic factor. Areas use 10 000 here."},
       {t:fmt(v*10)+" \\(\\text{cm}^2\\)", fb:"That is far too small: each square metre holds 10 000 square centimetres."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{m}^2 &= "+v+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mm"){ var v2=ri(3,40), ans2=v2*100;
    return mcq("Write \\("+v2+"\\ \\text{cm}^2\\) in square millimetres.",
      {t:fmt(ans2)+" \\(\\text{mm}^2\\)", fb:"Yes: 1 square centimetre is 100 square millimetres."},
      [{t:fmt(v2*10)+" \\(\\text{mm}^2\\)", fb:"That uses the linear factor 10. Areas use the squared factor, 100."},
       {t:fmt(v2*1000)+" \\(\\text{mm}^2\\)", fb:"That is ten times too large: the squared factor from centimetres to millimetres is 100."},
       {t:fmt(v2)+" \\(\\text{mm}^2\\)", fb:"The value must change: square millimetres are smaller units, so the count grows."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{cm}^2 &= "+v2+" \\times 100\\ \\text{mm}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{mm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square millimetres</b>.", {mode:mode,v:v2}); }
  var k=ri(2,15), v3=k*10000, ans3=k;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{cm}^2\\) in square metres.",
    {t:fmt(ans3)+" \\(\\text{m}^2\\)", fb:"Yes: divide by 10 000 to move to the larger unit."},
    [{t:fmt(v3/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor, 10 000."},
     {t:fmt(v3/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. Areas use the squared factor, 10 000."},
     {t:fmt(v3*10000)+" \\(\\text{m}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller, not larger."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{cm}^2 &= "+fmt(v3)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square metres</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For metres to centimetres, the area factor is 100 squared, which is 10 000."]);

E("u3-pk-area-imp-convert", 3, ["3.11"], 1, "gen", function(){
  var mode=pick(["ft2in","yd2ft","ft2yd"]);
  if(mode==="ft2in"){ var v=ri(2,30), ans=v*144;
    return mcq("Write \\("+v+"\\ \\text{ft}^2\\) in square inches.",
      {t:fmt(ans)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square foot is 144 square inches."},
      [{t:fmt(v*12)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 12. Areas use the squared factor, 144."},
       {t:fmt(v*24)+" \\(\\text{in}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 144."},
       {t:fmt(v*100)+" \\(\\text{in}^2\\)", fb:"100 is an SI-style factor. For feet to inches the squared factor is 144."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{ft}^2 &= "+v+" \\times 144\\ \\text{in}^2 \\\\ &= "+fmt(ans)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square inches</b>.", {mode:mode,v:v}); }
  if(mode==="yd2ft"){ var v2=ri(2,30), ans2=v2*9;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square feet.",
      {t:fmt(ans2)+" \\(\\text{ft}^2\\)", fb:"Yes: 1 square yard is 9 square feet."},
      [{t:fmt(v2*3)+" \\(\\text{ft}^2\\)", fb:"That uses the linear factor 3. Areas use the squared factor, 9."},
       {t:fmt(v2*6)+" \\(\\text{ft}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 9."},
       {t:fmt(v2*36)+" \\(\\text{ft}^2\\)", fb:"36 is the squared factor for yards to inches. For yards to feet it is 9."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 9\\ \\text{ft}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square feet</b>.", {mode:mode,v:v2}); }
  var k=ri(2,30), v3=k*9, ans3=k;
  return mcq("Write \\("+v3+"\\ \\text{ft}^2\\) in square yards.",
    {t:fmt(ans3)+" \\(\\text{yd}^2\\)", fb:"Yes: divide by 9 to move to the larger unit."},
    [{t:fmt(v3/3)+" \\(\\text{yd}^2\\)", fb:"That divides by the linear factor 3. Areas use the squared factor, 9."},
     {t:fmt(v3*9)+" \\(\\text{yd}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3)+" \\(\\text{yd}^2\\)", fb:"The value must change: square yards are larger units, so the count drops."}],
    "\\[ \\begin{aligned} "+v3+"\\ \\text{ft}^2 &= "+v3+" \\div 9\\ \\text{yd}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{yd}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square yards</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For feet to inches, the area factor is 12 squared, which is 144."]);

E("u3-pk-area-convert-adv", 3, ["3.10"], 2, "gen", function(){
  var mode=pick(["m2cmD","cm2mD","yd2in","in2ft"]);
  if(mode==="m2cmD"){ var v=pick([0.25,0.5,0.75,1.25,1.5,1.75,2.25,2.5,3.5,4.25,0.35,0.65,1.35,2.75,3.25,5.5,6.75,0.15,1.05,2.05]), ans=v*10000;
    return mcq("Write \\("+fmt(v)+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: multiply by the squared factor 10 000."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000. The squared factor from metres to centimetres is 10 000."},
       {t:fmt(ans*10)+" \\(\\text{cm}^2\\)", fb:"That is ten times too large: it adds a factor of 10 to the correct squared conversion."}],
      "\\[ \\begin{aligned} "+fmt(v)+"\\ \\text{m}^2 &= "+fmt(v)+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mD"){ var k=pick([12500,17500,22500,25000,32500,47500,52500,60000,13500,26500,37500,42500,57500,72500,82500,92500,10500,15500,20500,30500]), ans=k/10000;
    return mcq("Write \\("+fmt(k)+"\\ \\text{cm}^2\\) in square metres.",
      {t:fmt(ans)+" \\(\\text{m}^2\\)", fb:"Yes: divide by the squared factor 10 000."},
      [{t:fmt(k/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor."},
       {t:fmt(k/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. The squared factor from centimetres to metres is 10 000."},
       {t:fmt(ans/10)+" \\(\\text{m}^2\\)", fb:"That is one tenth of the correct value: one factor too many was removed."}],
      "\\[ \\begin{aligned} "+fmt(k)+"\\ \\text{cm}^2 &= "+fmt(k)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square metres</b>.", {mode:mode,v:k}); }
  if(mode==="yd2in"){ var v2=ri(2,20), ans2=v2*1296;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square inches.",
      {t:fmt(ans2)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square yard is 1296 square inches, since 36 squared is 1296."},
      [{t:fmt(v2*36)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 36. Areas use the squared factor, 1296."},
       {t:fmt(v2*144)+" \\(\\text{in}^2\\)", fb:"144 is the squared factor from feet to inches. This conversion starts from yards."},
       {t:fmt(v2*108)+" \\(\\text{in}^2\\)", fb:"That triples the linear factor. Areas use the squared factor, 1296."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 1296\\ \\text{in}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square inches</b>.", {mode:mode,v:v2}); }
  var k2=ri(2,20), v3=k2*144, ans3=k2;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{in}^2\\) in square feet.",
    {t:fmt(ans3)+" \\(\\text{ft}^2\\)", fb:"Yes: divide by the squared factor 144."},
    [{t:fmt(v3/12)+" \\(\\text{ft}^2\\)", fb:"That divides by the linear factor 12. Areas use the squared factor, 144."},
     {t:fmt(v3*144)+" \\(\\text{ft}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3/100)+" \\(\\text{ft}^2\\)", fb:"100 is an SI-style factor. For inches to feet the squared factor is 144."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{in}^2 &= "+fmt(v3)+" \\div 144\\ \\text{ft}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square feet</b>.", {mode:mode,v:v3});
}, ["Chain the squared factors: square each linear factor before you use it.", "Decide the direction first: a smaller unit means a larger count."]);

E("u3-pk-circumference", 3, ["2.1"], 2, "gen", function(){
  var r=ri(2,30); var C=Math.round(2*Math.PI*r*10)/10;
  var ctx=pick(["round rug","circular garden","round table top","circular fire pit"]);
  var q=numq("A "+ctx+" has a radius of \\("+r+"\\ \\text{m}\\). Find its circumference. Use \\(C = 2\\pi r\\). Round the answer to one decimal place, in metres.", C, 0.15,
    "Apply the circumference formula directly. \\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2\\pi("+r+") \\\\ &\\approx "+fmt(C,1)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(C,1)+" m</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" m"); return q;
}, ["Circumference is the distance around a circle.", "Substitute the radius into C = 2 pi r."]);

E("u3-pk-find-leg", 3, ["2.2"], 2, "gen", function(){
  var sc=u6Scaled(), legA=sc[0], legB=sc[1], hyp=sc[2];
  var giveFirst=ri(0,1)===0;
  var given=giveFirst?legA:legB, wanted=giveFirst?legB:legA;
  var unit=pick(["m","ft","cm"]);
  var ctx=pick([
    "A kite string is "+hyp+" "+unit+" long and the kite is "+given+" "+unit+" directly above the ground point used for measuring.",
    "A roof rafter is "+hyp+" "+unit+" long and the roof rises "+given+" "+unit+" from the wall plate to the ridge.",
    "A brace board is "+hyp+" "+unit+" long and it reaches "+given+" "+unit+" up a post.",
    "A zipline cable is "+hyp+" "+unit+" long and the finish platform is "+given+" "+unit+" lower than the start platform."]);
  var wantedName=giveFirst?"the other leg of the right triangle":"the other leg of the right triangle";
  var q=numq(ctx+" The string, board or cable forms the hypotenuse of a right triangle. How long, in "+unit+", is "+wantedName+"?",
    wanted, 0.1,
    "The formula must be rearranged to isolate the unknown leg. \\[ \\begin{aligned} b^2 &= c^2 - a^2 \\\\ &= "+hyp+"^2 - "+given+"^2 = "+(hyp*hyp)+" - "+(given*given)+" = "+(wanted*wanted)+" \\\\ b &= "+wanted+" \\end{aligned} \\] The answer is <b>"+wanted+" "+unit+"</b>.",
    {hyp:hyp,given:given});
  q.figure=giveFirst?u6TriSVG(given,wanted,fmt(given)+" "+unit,"?",fmt(hyp)+" "+unit):u6TriSVG(wanted,given,"?",fmt(given)+" "+unit,fmt(hyp)+" "+unit);
  return q;
}, ["For a missing leg, rearrange the theorem: the leg squared equals the hypotenuse squared minus the known leg squared.", "Start by squaring the hypotenuse and the known leg separately."]);

/* PK tranche metadata pass for Unit 3. The tranche's own entries are flagged here.  */
var PKT_U3_FOR=["3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.14","3.15","3.16","2.1","2.2","2.3","2.4","2.5","2.6"];
var PKT_U3={
 "u3-pk-vol-base-height":{src:"math-8:9.7",group:"volume"},
 "u3-pk-vol-tri-prism":{src:"math-8:9.7",group:"volume"},
 "u3-pk-vol-cylinder":{src:"math-8:9.9",group:"volume"},
 "u3-pk-holds-most":{src:"math-8:9.11",group:"volume"},
 "u3-pk-tank-litres":{src:"math-8:9.9",group:"volume"},
 "u3-pk-area-si-convert":{src:"math-1202:3.29",group:"conversion"},
 "u3-pk-area-imp-convert":{src:"math-1202:3.30",group:"conversion"},
 "u3-pk-area-convert-adv":{src:"math-1202:3.29",group:"conversion"},
 "u3-pk-circumference":{src:"math-1202:2.3",group:"formula-use"},
 "u3-pk-find-leg":{src:"math-1202:2.4",group:"formula-use"}
};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});
