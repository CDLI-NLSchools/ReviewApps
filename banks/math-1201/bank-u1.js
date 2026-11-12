// Math 1201 Unit 1 Measurement question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 9 to 629).
// CRMARKS: u1-convert-multistep=2
// CRMARKS: u1-sa-basic=3
// CRMARKS: u1-sa-unknown=2
// CRMARKS: u1-vol-basic=2
// CRMARKS: u1-vol-unknown=2
// CRMARKS: u1-sphere=3
// CRMARKS: u1-composite=3
// CRMARKS: u1-composite-sa=2
// Figures (Nov 2026): the shape, solid and instrument entries carry
// inline SVG diagrams drawn from each generator's own values, with
// the helpers in bank-helpers.js. Conversion, referent, estimation,
// justification and strategy entries stay figureless.
/* Unit 1: Measurement (indicators 5.1 to 5.15, 6.1 to 6.4).
   All scenarios and values are original. Helper prefix: u1. */

function u1r1(n){return Math.round(n*10)/10;}
function u1r2(n){return Math.round(n*100)/100;}
function u1setOk(a){return (new Set(a.map(function(x){return String(x);})).size===a.length);}

/* Rule 7 (balanced precision, pairs criterion, Nov 8 2026): pad distractor
   strings with trailing zeros so no option stands alone at a unique number
   of decimal places. The correct option's string is never changed, no value
   changes, and no randomness is consumed. Applies only when every option is
   a bare number string; otherwise the set is returned unchanged. */
function balDp(keyStr,ds){
  function dpOf(s){var m=/^-?\d+(?:\.(\d+))?$/.exec(s);if(!m)return null;return m[1]?m[1].length:0;}
  function padTo(s,dp){var cur=dpOf(s);if(cur===null||dp<=cur)return s;if(s.indexOf(".")<0)return s+"."+Array(dp+1).join("0");return s+Array(dp-cur+1).join("0");}
  var all=[keyStr].concat(ds),dps=all.map(dpOf);
  if(dps.some(function(d){return d===null;}))return ds;
  function ok(list){var c={};list.forEach(function(d){c[d]=(c[d]||0)+1;});return Object.keys(c).every(function(k){return c[k]!==1;});}
  if(ok(dps))return ds;
  var cap=Math.max.apply(null,dps)+2,best=null,bestCost=1e9;
  for(var a=dps[1];a<=cap;a++)for(var b=dps[2];b<=cap;b++)for(var c2=dps[3];c2<=cap;c2++){
    var cand=[dps[0],a,b,c2];
    if(!ok(cand))continue;
    var cost=(a-dps[1])+(b-dps[2])+(c2-dps[3]);
    if(cost<bestCost){bestCost=cost;best=[a,b,c2];}
  }
  if(!best)return ds;
  return ds.map(function(s,i){return padTo(s,best[i]);});
}

/* 1. Convert within one system */
E("u1-convert-si",1,["6.1"],1,"gen",function(){
  var modes=[
    {from:"kilometres",to:"metres",f:1000,alts:[100,10000,10],dec:true,note:"1 kilometre = 1000 metres"},
    {from:"metres",to:"centimetres",f:100,alts:[10,1000,10000],dec:true,note:"1 metre = 100 centimetres"},
    {from:"centimetres",to:"millimetres",f:10,alts:[100,1000,2],dec:false,note:"1 centimetre = 10 millimetres"},
    {from:"metres",to:"millimetres",f:1000,alts:[100,10,10000],dec:true,note:"1 metre = 1000 millimetres"},
    {from:"centimetres",to:"metres",f:0.01,alts:[0.1,0.001,10],dec:false,note:"100 centimetres = 1 metre"},
    {from:"millimetres",to:"centimetres",f:0.1,alts:[0.01,10,0.001],dec:false,note:"10 millimetres = 1 centimetre"},
    {from:"feet",to:"inches",f:12,alts:[3,36,6],dec:false,note:"1 foot = 12 inches"},
    {from:"yards",to:"feet",f:3,alts:[12,36,2],dec:false,note:"1 yard = 3 feet"},
    {from:"yards",to:"inches",f:36,alts:[12,3,72],dec:false,note:"1 yard = 36 inches"}
  ];
  var m=pick(modes),v,ans,tries=0,ds;
  do{
    v=m.dec?ri(2,24)+pick([0,0.25,0.5,0.75]):ri(3,40);
    if(m.f<1&&m.from==="centimetres")v=ri(2,40)*50;
    if(m.f===0.1)v=ri(3,40)*10;
    ans=u1r2(v*m.f);
    ds=m.alts.map(function(a){return fmt(u1r2(v*a));});
    tries++;
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<80);
  var sol="Use the fact that "+m.note+". Multiply or divide by the conversion factor: \\[ "+fmt(v)+" \\times "+fmt(m.f)+" = "+fmt(ans)+" \\] So the measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  if(m.f<1)sol="Use the fact that "+m.note+". Divide by the number of smaller units in one larger unit: \\[ "+fmt(v)+" \\times "+fmt(m.f)+" = "+fmt(ans)+" \\] So the measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  return mcq("Convert "+fmt(v)+" "+m.from+" to "+m.to+".",fmt(ans),balDp(fmt(ans),ds),sol,{mode:m.from+"-"+m.to,v:v});
});

/* 2. Convert between systems, multiple choice with numeric options */
E("u1-convert-between",1,["6.1","6.2"],1,"gen",function(){
  var mode=ri(1,5),v,ans,ds,prompt,sol,tries=0;
  do{
    tries++;
    if(mode===1){
      v=ri(2,40)+pick([0,0.25,0.5,0.75]); ans=u1r2(v*2.54);
      ds=[fmt(u1r2(v*2.5)),fmt(u1r2(v/2.54)),fmt(u1r2(v*25.4))];
      prompt="A ribbon is "+fmt(v)+" inches long. Convert this length to centimetres. Use 1 inch = 2.54 centimetres. Give the length in centimetres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+fmt(v)+" \\times 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the ribbon is <b>"+fmt(ans)+" centimetres</b> long.";
    }else if(mode===2){
      v=ri(10,60); ans=u1r2(v*0.3048);
      ds=[fmt(u1r2(v*0.3)),fmt(u1r2(v*3.048)),fmt(u1r2(v*0.03048))];
      prompt="An extension cable is "+v+" feet long. Convert this length to metres. Use 1 foot = 0.3048 metres. Give the length in metres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 0.3048 &= "+fmt(ans)+" \\end{aligned} \\] So the cable is <b>"+fmt(ans)+" metres</b> long.";
    }else if(mode===3){
      v=ri(2,90); ans=u1r1(v*1.6);
      ds=[fmt(u1r1(v*0.16)),fmt(v*16),fmt(u1r1(v*2.6))];
      prompt="A hiking trail is "+v+" miles long. Convert this length to kilometres. Use 1 mile = 1.6 kilometres. Give the length in kilometres.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 1.6 &= "+fmt(ans)+" \\end{aligned} \\] So the trail is <b>"+fmt(ans)+" kilometres</b> long.";
    }else if(mode===4){
      v=ri(2,40); ans=u1r2(v*3.28);
      ds=[fmt(u1r2(v*0.328)),fmt(u1r2(v*32.8)),fmt(u1r2(v*2.28))];
      prompt="A rope is "+v+" metres long. Convert this length to feet. Use 1 metre = 3.28 feet. Give the length in feet.";
      sol="Multiply by the conversion factor: \\[ \\begin{aligned} "+v+" \\times 3.28 &= "+fmt(ans)+" \\end{aligned} \\] So the rope is <b>"+fmt(ans)+" feet</b> long.";
    }else{
      var t=ri(2,30); v=u1r2(t*2.54); ans=t;
      ds=[fmt(u1r2(v*2.54)),fmt(t/2),fmt(t*2)];
      prompt="A photograph is "+fmt(v)+" centimetres wide. Convert this width to inches. Use 1 inch = 2.54 centimetres. Give the width in inches.";
      sol="Divide by the conversion factor, since centimetres are the smaller unit here: \\[ \\begin{aligned} "+fmt(v)+" \\div 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the photograph is <b>"+fmt(ans)+" inches</b> wide.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<80);
  return mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,v:v});
});

/* 3. Multistep conversions, numeric answer */
E("u1-convert-multistep",1,["6.2"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var ft=ri(3,7),inch=ri(0,11),tot=ft*12+inch,ans=u1r2(tot*2.54);
    return numq("A student is "+ft+" feet "+inch+" inches tall. Convert this height to centimetres. Use 1 inch = 2.54 centimetres.",ans,0.011,
      "First change the whole height to inches, then convert: \\[ \\begin{aligned} "+ft+" \\times 12 + "+inch+" &= "+tot+" \\text{ inches} \\\\ "+tot+" \\times 2.54 &= "+fmt(ans)+" \\end{aligned} \\] So the height is <b>"+fmt(ans)+" centimetres</b>.",{mode:mode,ft:ft,inch:inch});
  }
  if(mode===2){
    var yd=ri(2,20),f2=pick([1,2]),ans2=yd*36+f2*12;
    return numq("A garden hose is "+yd+" yards "+f2+" feet long. Convert this length to inches.",ans2,0.011,
      "Change each part to inches and add: \\[ \\begin{aligned} "+yd+" \\times 36 &= "+(yd*36)+" \\\\ "+f2+" \\times 12 &= "+(f2*12)+" \\\\ \\text{Total} &= "+ans2+" \\end{aligned} \\] So the hose is <b>"+ans2+" inches</b> long.",{mode:mode,yd:yd,f2:f2});
  }
  if(mode===3){
    var yd3=ri(2,30),ans3=yd3*36;
    return numq("A roll of fencing is "+yd3+" yards long. Convert this length to inches.",ans3,0.011,
      "Work through feet as the middle step: \\[ \\begin{aligned} "+yd3+" \\times 3 &= "+(yd3*3)+" \\text{ feet} \\\\ "+(yd3*3)+" \\times 12 &= "+ans3+" \\end{aligned} \\] So the fencing is <b>"+ans3+" inches</b> long.",{mode:mode,yd:yd3});
  }
  if(mode===4){
    var m4=ri(1,5),c4=pick([10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]),ans4=m4*1000+c4*10;
    return numq("A ribbon is "+m4+" metres "+c4+" centimetres long. Convert this length to millimetres.",ans4,0.011,
      "Change each part to millimetres and add: \\[ \\begin{aligned} "+m4+" \\times 1000 &= "+(m4*1000)+" \\\\ "+c4+" \\times 10 &= "+(c4*10)+" \\\\ \\text{Total} &= "+ans4+" \\end{aligned} \\] So the ribbon is <b>"+ans4+" millimetres</b> long.",{mode:mode,m:m4,c:c4});
  }
  if(mode===5){
    var km=ri(1,9),m5=pick([50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900]),ans5=km*1000+m5;
    return numq("A cycling route is "+km+" kilometres "+m5+" metres long. Convert this length to metres.",ans5,0.011,
      "Change the kilometres to metres and add: \\[ \\begin{aligned} "+km+" \\times 1000 + "+m5+" &= "+ans5+" \\end{aligned} \\] So the route is <b>"+ans5+" metres</b> long.",{mode:mode,km:km,m:m5});
  }
  var tt=ri(3,30),cm6=u1r2(tt*2.54);
  return numq("A shelf board is "+fmt(cm6)+" centimetres long. Convert this length to inches. Use 1 inch = 2.54 centimetres.",tt,0.011,
    "Divide by the conversion factor: \\[ \\begin{aligned} "+fmt(cm6)+" \\div 2.54 &= "+tt+" \\end{aligned} \\] So the board is <b>"+tt+" inches</b> long.",{mode:mode,t:tt});
});

/* 4. Unit analysis setups */
E("u1-unit-analysis",1,["6.3"],1,"var",varset([
  function(){return mcq("Which setup correctly converts 7.5 kilometres to metres?",
    "7.5 km x (1000 m / 1 km)",
    ["7.5 km x (1 km / 1000 m)","7.5 km x (100 m / 1 km)","7.5 km x (1 m / 1000 km)"],
    "In the correct setup the kilometre units cancel and only metres remain, and the factor uses 1000 m = 1 km. The correct setup is <b>7.5 km x (1000 m / 1 km)</b>.",{});},
  function(){return mcq("Which setup correctly converts 48 inches to feet?",
    "48 in x (1 ft / 12 in)",
    ["48 in x (12 in / 1 ft)","48 in x (1 ft / 36 in)","48 in x (12 ft / 1 in)"],
    "In the correct setup the inch units cancel and only feet remain, and the factor uses 1 ft = 12 in. The correct setup is <b>48 in x (1 ft / 12 in)</b>.",{});},
  function(){return mcq("Which setup correctly converts 250 centimetres to metres?",
    "250 cm x (1 m / 100 cm)",
    ["250 cm x (100 cm / 1 m)","250 cm x (1 m / 10 cm)","250 cm x (1000 m / 1 cm)"],
    "In the correct setup the centimetre units cancel and only metres remain, and the factor uses 1 m = 100 cm. The correct setup is <b>250 cm x (1 m / 100 cm)</b>.",{});},
  function(){return mcq("Which setup correctly converts 6 feet to inches?",
    "6 ft x (12 in / 1 ft)",
    ["6 ft x (1 ft / 12 in)","6 ft x (36 in / 1 ft)","6 ft x (1 in / 12 ft)"],
    "In the correct setup the foot units cancel and only inches remain, and the factor uses 1 ft = 12 in. The correct setup is <b>6 ft x (12 in / 1 ft)</b>.",{});},
  function(){return mcq("Which setup correctly converts 9 miles to kilometres? Use 1 mile = 1.6 kilometres.",
    "9 mi x (1.6 km / 1 mi)",
    ["9 mi x (1 mi / 1.6 km)","9 mi x (16 km / 1 mi)","9 mi x (1.6 mi / 1 km)"],
    "In the correct setup the mile units cancel and only kilometres remain, and the factor uses 1 mi = 1.6 km. The correct setup is <b>9 mi x (1.6 km / 1 mi)</b>.",{});},
  function(){return mcq("Which setup correctly converts 3.2 metres to centimetres?",
    "3.2 m x (100 cm / 1 m)",
    ["3.2 m x (1 m / 100 cm)","3.2 m x (10 cm / 1 m)","3.2 m x (100 m / 1 cm)"],
    "In the correct setup the metre units cancel and only centimetres remain, and the factor uses 1 m = 100 cm. The correct setup is <b>3.2 m x (100 cm / 1 m)</b>.",{});},
  function(){return mcq("A student writes 5 yd x (1 yd / 3 ft) to convert 5 yards to feet. Which statement describes this setup?",
    "The units do not cancel to feet, and the factor is upside down",
    ["The units cancel to feet, and the factor is written correctly","The units cancel to yards, and the factor is written correctly","The units do not cancel to feet, but the answer will still be feet"],
    "The yard in the numerator cannot cancel the yards in the given measure, so the units do not reduce to feet, and the conversion factor is also upside down. The statement is <b>the units do not cancel to feet, and the factor is upside down</b>.",{});},
  function(){return mcq("Which setup correctly converts 420 millimetres to centimetres?",
    "420 mm x (1 cm / 10 mm)",
    ["420 mm x (10 mm / 1 cm)","420 mm x (1 cm / 100 mm)","420 mm x (10 cm / 1 mm)"],
    "In the correct setup the millimetre units cancel and only centimetres remain, and the factor uses 1 cm = 10 mm. The correct setup is <b>420 mm x (1 cm / 10 mm)</b>.",{});}
]));

/* 5. Reasonableness of a conversion, mental mathematics */
E("u1-reasonable",1,["6.4"],3,"var",varset([
  function(){return mcq("A runner says a 5 kilometre run is 500 metres long. Judge this conversion.",
    "Not reasonable: 1 km is 1000 m, so 5 km should be 5000 m",
    ["Reasonable: 1 km is 100 m, so 5 km should be 500 m","Not reasonable: 1 km is 100 m, so 5 km should be 50000 m","Reasonable: 1 km is 1000 m, so 5 km should be 500 m"],
    "Mentally, 1 km = 1000 m, so 5 km = 5000 m. The claim of 500 m is ten times too small. It is <b>not reasonable: 1 km is 1000 m, so 5 km should be 5000 m</b>.",{});},
  function(){return mcq("A ribbon 30 centimetres long is described as about 12 inches long. Judge this conversion. Use 1 inch = 2.54 centimetres.",
    "Reasonable: 30 divided by about 2.5 is about 12",
    ["Not reasonable: 30 divided by about 2.5 is about 12","Reasonable: 30 times about 2.5 is about 12","Not reasonable: 30 times about 2.5 is about 75"],
    "Mentally, divide 30 by about 2.5 to get about 12, which matches the claim. It is <b>reasonable: 30 divided by about 2.5 is about 12</b>.",{});},
  function(){return mcq("A student 180 centimetres tall is described as 18 feet tall. Judge this conversion.",
    "Not reasonable: 180 cm is about 1.8 m, which is about 6 ft",
    ["Reasonable: 180 cm is about 1.8 m, which is about 6 ft in height","Not reasonable: 180 cm is about 18 m, which is about 6 ft","Reasonable: 180 cm is about 18 m, which is about 60 ft"],
    "Mentally, 180 cm is 1.8 m, and a person 1.8 m tall is about 6 ft tall, not 18 ft. It is <b>not reasonable: 180 cm is about 1.8 m, which is about 6 ft</b>.",{});},
  function(){return mcq("A board 8 feet long is described as about 2.4 metres long. Judge this conversion.",
    "Reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m",
    ["Not reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m","Reasonable: 1 ft is about 3 m, so 8 ft is about 2.4 m","Not reasonable: 1 ft is about 3 m, so 8 ft is about 24 m"],
    "Mentally, 1 ft is about 0.3 m, so 8 ft is about 2.4 m, which matches the claim. It is <b>reasonable: 1 ft is about 0.3 m, so 8 ft is about 2.4 m</b>.",{});},
  function(){return mcq("A paperclip 3 centimetres long is described as 30 millimetres long. Judge this conversion.",
    "Reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm here",
    ["Not reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm","Reasonable: 1 cm is 100 mm, so 3 cm should be 30 mm","Not reasonable: 1 cm is 100 mm, so 3 cm should be 300 mm"],
    "Mentally, 1 cm = 10 mm, so 3 cm = 30 mm, which matches the claim. It is <b>reasonable: 1 cm is 10 mm, so 3 cm should be 30 mm here</b>.",{});},
  function(){return mcq("A drive of 100 kilometres is described as about 620 miles. Judge this conversion. Use 1 mile = 1.6 kilometres.",
    "Not reasonable: 100 divided by 1.6 is about 62, not 620",
    ["Reasonable: 100 divided by 1.6 is about 62, not 620","Not reasonable: 100 times 1.6 is about 160, not 620","Reasonable: 100 times 1.6 is about 620 miles, not 160 km at all"],
    "Mentally, divide 100 by 1.6 to get about 62 miles. The claim of 620 miles is ten times too large. It is <b>not reasonable: 100 divided by 1.6 is about 62, not 620</b>.",{});},
  function(){return mcq("A ribbon 45 centimetres wide is described as 4.5 metres wide. Judge this conversion.",
    "Not reasonable: 45 cm is 0.45 m, since 100 cm make 1 m",
    ["Reasonable: 45 cm is 0.45 m, since 100 cm make 1 m","Not reasonable: 45 cm is 4.5 m, since 10 cm make 1 m","Reasonable: 45 cm is 45 m, since 100 cm make up one full metre stick"],
    "Mentally, 45 cm is a little under half of 100 cm, so it is 0.45 m, not 4.5 m. It is <b>not reasonable: 45 cm is 0.45 m, since 100 cm make 1 m</b>.",{});},
  function(){return mcq("A yardstick 3 feet long is described as 36 inches long. Judge this conversion.",
    "Reasonable: 1 ft is 12 in, so 3 ft should be 36 in",
    ["Not reasonable: 1 ft is 12 in, so 3 ft should be 36 in","Reasonable: 1 ft is 36 in, so 3 ft should be 36 in","Not reasonable: 1 ft is 36 in, so 3 ft should be 108 in"],
    "Mentally, 1 ft = 12 in, so 3 ft = 36 in, which matches the claim. It is <b>reasonable: 1 ft is 12 in, so 3 ft should be 36 in</b>.",{});}
]));

/* 6. Referents and comparing SI and imperial units */
E("u1-referent",1,["5.10","5.11"],1,"var",varset([
  function(){return mcq("Which unit is the best choice for measuring the length of a pencil?",
    "centimetres",["millimetres","kilometres","metres"],
    "A pencil is about 18 units long in centimetres, a manageable count. Millimetres give a large count for a hand object and metres and kilometres are far too large. The best unit is <b>centimetres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 millimetre?",
    "the thickness of a dime",["the width of a fingernail","the height of a doorway","the length of a paperclip"],
    "A dime is about 1 mm thick. A fingernail is about 1 cm wide, a paperclip is a few centimetres long, and a doorway is about 2 m high. The closest referent is <b>the thickness of a dime</b>.",{});},
  function(){return mcq("Which unit is the best choice for measuring the distance between two towns?",
    "kilometres",["centimetres","metres","millimetres"],
    "Town to town distances run to tens or hundreds of kilometres, a manageable count. The smaller units would give enormous counts. The best unit is <b>kilometres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 centimetre?",
    "the width of a fingernail",["the thickness of a dime","the height of a doorway","the length of a shoelace"],
    "A fingernail is about 1 cm wide. A dime is about 1 mm thick, a doorway is about 2 m high, and a shoelace is close to a metre long. The closest referent is <b>the width of a fingernail</b>.",{});},
  function(){return mcq("Which statement correctly compares 1 metre and 1 yard?",
    "A metre is a little longer than a yard",["A yard is a little longer than a metre","A metre is exactly the same as a yard","A yard is about twice as long as a metre"],
    "One metre is about 39 inches and one yard is 36 inches, so a metre is a little longer. The correct statement is <b>a metre is a little longer than a yard</b>.",{});},
  function(){return mcq("Which statement correctly compares 1 kilometre and 1 mile?",
    "A mile is longer than a kilometre",["A kilometre is longer than a mile","A mile is exactly the same as a kilometre","A kilometre is about twice as long as a mile"],
    "One mile is about 1.6 kilometres, so a mile is longer. The correct statement is <b>a mile is longer than a kilometre</b>.",{});},
  function(){return mcq("Which referent is closest to 1 inch?",
    "the width of an adult thumb",["the width of a fingernail","the height of a doorway","the length of a paperclip"],
    "An adult thumb is about 1 inch, or 2.54 cm, wide. A fingernail is about 1 cm wide, a paperclip is longer than an inch, and a doorway is about 2 m high. The closest referent is <b>the width of an adult thumb</b>.",{});},
  function(){return mcq("Which unit is the best choice for measuring the height of a classroom ceiling?",
    "metres",["centimetres","kilometres","millimetres"],
    "A ceiling is a few metres high, a manageable count in metres. Centimetres and millimetres give large counts and kilometres are far too large. The best unit is <b>metres</b>.",{});},
  function(){return mcq("Which referent is closest to 1 foot?",
    "the length of a standard ruler",["the width of an adult thumb","the height of a doorway","the length of a shoelace"],
    "A standard ruler is 12 inches, which is 1 foot. A thumb is about 1 inch wide, a doorway is about 2 m high, and a shoelace is close to a metre. The closest referent is <b>the length of a standard ruler</b>.",{});},
  function(){return mcq("Which statement correctly compares a centimetre and an inch?",
    "An inch is longer than a centimetre",["A centimetre is longer than an inch","An inch is exactly the same as a centimetre","A centimetre is about twice as long as an inch"],
    "One inch is 2.54 centimetres, so an inch is longer. The correct statement is <b>an inch is longer than a centimetre</b>.",{});}
]));

/* 7. Estimate a length using a referent */
E("u1-estimate",1,["5.12"],1,"var",varset([
  function(){return mcq("A doorway is about 2 metres high. A classroom wall is about 4 doorway heights wide. Estimate the width of the wall, in metres.",
    "8",["4","12","20"],
    "Use the doorway as the referent and multiply the count by its height: \\[ 4 \\times 2 = 8 \\] The best estimate is <b>8 metres</b>.",{});},
  function(){return mcq("A paperclip is about 3 centimetres long. A desk is about 20 paperclip lengths wide. Estimate the width of the desk, in centimetres.",
    "60",["23","40","120"],
    "Use the paperclip as the referent and multiply the count by its length: \\[ 20 \\times 3 = 60 \\] The best estimate is <b>60 centimetres</b>.",{});},
  function(){return mcq("One long stride is about 1 metre. A hallway takes about 15 strides to walk. Estimate the length of the hallway, in metres.",
    "15",["5","30","45"],
    "Use the stride as the referent and multiply the count by its length: \\[ 15 \\times 1 = 15 \\] The best estimate is <b>15 metres</b>.",{});},
  function(){return mcq("A student is about 1.8 metres tall. A tree is about 4 student heights tall. Estimate the height of the tree, in metres.",
    "7.2",["3.6","5.4","10.8"],
    "Use the student height as the referent and multiply: \\[ 4 \\times 1.8 = 7.2 \\] The best estimate is <b>7.2 metres</b>.",{});},
  function(){return mcq("A thumb width is about 2 centimetres. A phone is about 7 thumb widths wide. Estimate the width of the phone, in centimetres.",
    "14",["7","9","28"],
    "Use the thumb width as the referent and multiply the count by its width: \\[ 7 \\times 2 = 14 \\] The best estimate is <b>14 centimetres</b>.",{});},
  function(){return mcq("A car is about 4 metres long. A bus is about 3 car lengths long. Estimate the length of the bus, in metres.",
    "12",["7","8","24"],
    "Use the car as the referent and multiply the count by its length: \\[ 3 \\times 4 = 12 \\] The best estimate is <b>12 metres</b>.",{});},
  function(){return mcq("A floor tile is about 30 centimetres wide. A kitchen floor is about 12 tiles wide. Estimate the width of the floor, in centimetres.",
    "360",["42","180","720"],
    "Use the tile as the referent and multiply the count by its width: \\[ 12 \\times 30 = 360 \\] The best estimate is <b>360 centimetres</b>.",{});},
  function(){return mcq("A doorway is about 2 metres high. A school building is about 5 doorway heights tall. Estimate the height of the building, in metres.",
    "10",["7","15","25"],
    "Use the doorway as the referent and multiply the count by its height: \\[ 5 \\times 2 = 10 \\] The best estimate is <b>10 metres</b>.",{});}
]));

/* 8. Justify the choice of unit in a problem context */
E("u1-justify-unit",1,["5.13"],3,"var",varset([
  function(){return mcq("A town crew must record the length of a marathon course for a race permit. Which choice of unit is best justified?",
    "Kilometres, because the course is long and the count stays manageable",
    ["Millimetres, because the course is long and the count stays small","Centimetres, because the course is short and the count stays manageable","Metres only, because the course is short and no other unit can be used"],
    "A marathon course is tens of kilometres long, so kilometres keep the count manageable while still describing the full distance. The best justified choice is <b>kilometres, because the course is long and the count stays manageable</b>.",{});},
  function(){return mcq("A carpenter must record the thickness of a sheet of plywood for a cutting plan. Which choice of unit is best justified?",
    "Millimetres, because the sheet is thin and small units show the detail",
    ["Kilometres, because the sheet is thin and small units show the detail","Metres only, because the sheet is thick and large units show the detail","Centimetres, because the sheet is thin and no other unit can be used"],
    "Plywood thickness is a small measure, so millimetres give a whole number count that shows the detail a cutting plan needs. The best justified choice is <b>millimetres, because the sheet is thin and small units show the detail</b>.",{});},
  function(){return mcq("A nurse must record a student height for a health form. Which choice of unit is best justified?",
    "Centimetres, because a height is moderate and the count is easy to read",
    ["Kilometres, because a height is moderate and the count is easy to read","Millimetres, because a height is very large and the count is easy to read","Metres only, because a height is moderate and decimals are never allowed"],
    "A student height is a moderate measure, and centimetres give a whole number count that is easy to read and compare. The best justified choice is <b>centimetres, because a height is moderate and the count is easy to read</b>.",{});},
  function(){return mcq("A gardener must buy a hose that reaches across a backyard. Which choice of unit is best justified?",
    "Metres, because the yard is moderate and the count is easy to handle too",
    ["Millimetres, because the yard is moderate and the count is easy to handle","Kilometres, because the yard is very small and the count is easy to handle","Inches only, because the yard is moderate and no other unit can be used"],
    "A backyard reach is a moderate measure of some metres, so metres keep the count easy to handle when choosing a hose. The best justified choice is <b>metres, because the yard is moderate and the count is easy to handle</b>.",{});},
  function(){return mcq("A machinist must record the length of a small screw for a parts order. Which choice of unit is best justified?",
    "Millimetres, because the screw is tiny and small units show the detail",
    ["Centimetres, because the screw is tiny and small units show the detail","Metres only, because the screw is long and large units show the detail","Kilometres, because the screw is tiny and no other unit can be used"],
    "A screw length is a tiny measure, so millimetres give a whole number count that shows the detail a parts order needs. The best justified choice is <b>millimetres, because the screw is tiny and small units show the detail</b>.",{});},
  function(){return mcq("A coach must record the length of a running track for a meet schedule. Which choice of unit is best justified?",
    "Metres, because the track is moderate and the count is standard for races",
    ["Kilometres, because the track is moderate and the count is standard for races","Millimetres, because the track is very long and the count is standard for races","Centimetres, because the track is moderate and no other unit can be used"],
    "A track lap is a moderate measure, and metres are the standard unit for race distances, keeping the count familiar. The best justified choice is <b>metres, because the track is moderate and the count is standard for races</b>.",{});},
  function(){return mcq("A mover must record the width of a doorway to check whether a sofa fits. Which choice of unit is best justified?",
    "Centimetres, because the width is under a metre and detail still counts",
    ["Kilometres, because the width is under a metre and detail still matters","Metres only, because the width is very large and detail still matters","Millimetres, because the width is under a metre and no detail is needed"],
    "A doorway width is under a metre, and centimetres give a precise whole number count for checking a fit. The best justified choice is <b>centimetres, because the width is under a metre and detail still matters</b>.",{});},
  function(){return mcq("A driver must record the distance of a highway trip for a log book. Which choice of unit is best justified?",
    "Kilometres, because the trip is long and the count stays manageable",
    ["Centimetres, because the trip is long and the count stays manageable","Millimetres, because the trip is short and the count stays manageable","Metres only, because the trip is long and no other unit can be used"],
    "A highway trip is a long distance, so kilometres keep the count manageable in a log book. The best justified choice is <b>kilometres, because the trip is long and the count stays manageable</b>.",{});}
]));

/* 9. Linear measure with instruments, multiple choice with numeric options */
E("u1-linear-problem",1,["5.14"],1,"gen",function(){
  var mode=ri(1,5),ans,ds,prompt,sol,tries=0,v1,v2;
  do{
    tries++;
    if(mode===1){
      v1=ri(5,24); var C=u1r1(Math.PI*v1); ans=v1;
      ds=[fmt(v1/2),fmt(v1*2),fmt(v1+3)];
      prompt="A tape measure wrapped around a circular jar reads "+fmt(C)+" centimetres. The reading is the circumference of the jar. Determine the diameter of the jar, in centimetres.";
      sol="The diameter comes from the circumference formula: \\[ \\begin{aligned} d &= \\frac{C}{\\pi} \\\\ &= \\frac{"+fmt(C)+"}{\\pi} \\\\ &\\approx "+v1+" \\end{aligned} \\] So the diameter is <b>"+v1+" centimetres</b>.";
    }else if(mode===2){
      v1=ri(3,15); var C2=u1r1(2*Math.PI*v1); ans=v1;
      ds=[fmt(v1*2),fmt(v1/2),fmt(v1+4)];
      prompt="A tape measure wrapped around a tree trunk reads "+fmt(C2)+" centimetres. The reading is the circumference of the trunk. Determine the radius of the trunk, in centimetres.";
      sol="The radius comes from the circumference formula: \\[ \\begin{aligned} r &= \\frac{C}{2\\pi} \\\\ &= \\frac{"+fmt(C2)+"}{2\\pi} \\\\ &\\approx "+v1+" \\end{aligned} \\] So the radius is <b>"+v1+" centimetres</b>.";
    }else if(mode===3){
      v1=ri(3,20); v2=ri(3,15); ans=2*(v1+v2);
      ds=[fmt(v1+v2),fmt(v1*v2),fmt(2*v1+v2)];
      prompt="A tape measure gives the length of a rectangular garden as "+v1+" metres and the width as "+v2+" metres. Determine the perimeter of the garden, in metres.";
      sol="Add the length and width, then double: \\[ \\begin{aligned} P &= 2(l + w) \\\\ &= 2("+v1+" + "+v2+") \\\\ &= "+ans+" \\end{aligned} \\] So the perimeter is <b>"+ans+" metres</b>.";
    }else if(mode===4){
      v1=pick([10,20,25,50]); v2=pick([2,3,4,5]); var tot4=v1*v2/10; ans=v2/10;
      ds=[fmt(tot4),fmt(v2),fmt(v2/100)];
      prompt="A caliper measures a stack of "+v1+" identical sheets of card stock as "+fmt(tot4)+" millimetres thick in total. Determine the thickness of one sheet, in millimetres.";
      sol="Divide the total thickness by the number of sheets: \\[ \\begin{aligned} \\frac{"+fmt(tot4)+"}{"+v1+"} &= "+fmt(ans)+" \\end{aligned} \\] So one sheet is <b>"+fmt(ans)+" millimetres</b> thick.";
    }else{
      v1=ri(15,80); v2=ri(3,8); ans=v1*v2;
      ds=[fmt(v1+v2),fmt(v1*v2/2),fmt(v1*2)];
      prompt="A measuring tape shows that one roll of ribbon is "+v1+" centimetres long. Determine the total length of "+v2+" identical rolls, in centimetres.";
      sol="Multiply the length of one roll by the number of rolls: \\[ \\begin{aligned} "+v1+" \\times "+v2+" &= "+ans+" \\end{aligned} \\] So the total length is <b>"+ans+" centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds.map(function(x){return String(x);})))&&tries<80);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,v1:v1,v2:v2});
  if(mode===1)q.figure=u1figCirc(fmt(C)+" cm","d");
  else if(mode===2)q.figure=u1figCirc(fmt(C2)+" cm","r");
  else if(mode===3)q.figure=u1figRect(v1,v2,v1+" m",v2+" m");
  return q;
});

/* 10. Personal strategy for a hard-to-measure length */
E("u1-strategy",1,["5.15"],3,"var",varset([
  function(){return mcq("Which strategy best determines the circumference of a water bottle?",
    "Wrap a string around the bottle, mark it, then measure the string flat out",
    ["Measure straight across the bottle top, then report that as the distance","Wrap a string around the bottle, mark it, then weigh the string on a scale","Estimate the distance by eye, then report that as the measured distance"],
    "A string can follow the curve around the bottle. Marking where it meets and measuring it flat against a ruler turns the curve into a straight length. The best strategy is to <b>wrap a string around the bottle, mark it, then measure the string flat</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a curved path on a map?",
    "Lay a thread along the curve, then straighten it and measure the thread",
    ["Draw a straight line between the ends, then measure that line on the map","Lay a thread along the curve, then count the colours printed on the map","Estimate the length by eye, then convert the guess using the map scale"],
    "A thread can follow the curve. Straightening it and measuring it gives the curve length, which the map scale then converts. The best strategy is to <b>lay a thread along the curve, then straighten it and measure the thread</b>.",{});},
  function(){return mcq("Which strategy best determines the perimeter of the base of an irregular planter?",
    "Wrap a tape around the base, mark the join, then read the full tape length",
    ["Measure the longest side of the base, then multiply that length by four","Wrap a tape around the base, mark the join, then read only half the length","Estimate each side by eye, then add the guesses and report the total sum"],
    "A flexible tape can follow the irregular base all the way around, so the full reading at the join is the perimeter. The best strategy is to <b>wrap a tape around the base, mark the join, then read the full tape length</b>.",{});},
  function(){return mcq("Which strategy best determines the diameter of a tree trunk too wide to measure across directly?",
    "Measure the circumference with a tape, then divide that measure by pi",
    ["Measure the circumference with a tape, then multiply that measure by pi","Measure the height of the trunk with a tape, then divide that by pi","Estimate the width by eye, then report that guess as the diameter"],
    "The tape gives the circumference, and diameter is circumference divided by pi. The best strategy is to <b>measure the circumference with a tape, then divide that measure by pi</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a curved garden edge?",
    "Lay a rope along the edge, mark its ends, then measure the rope straight out",
    ["Measure the straight distance between the ends, then report it as the length","Lay a rope along the edge, mark its ends, then count the stones beside it","Estimate the length by pacing beside it, then report the pace count alone"],
    "A rope can follow the curve. Measuring the marked rope laid straight gives the length of the edge. The best strategy is to <b>lay a rope along the edge, mark its ends, then measure the rope straight</b>.",{});},
  function(){return mcq("Which strategy best determines the circumference of a round table top?",
    "Wrap a tape around the edge, mark the join, then read the full tape length",
    ["Measure straight across the centre, then report that as the distance around","Wrap a tape around the edge, mark the join, then read only a quarter length","Estimate the distance by eye, then report that as the measured distance"],
    "A flexible tape follows the round edge all the way around, so the full reading at the join is the circumference. The best strategy is to <b>wrap a tape around the edge, mark the join, then read the full tape length</b>.",{});},
  function(){return mcq("Which strategy best determines the length of a winding hallway on a floor plan?",
    "Trace the path with a string on the plan, then measure the string and scale",
    ["Draw a straight line between the doors, then measure that line and scale it","Trace the path with a string on the plan, then weigh the string and scale it","Estimate the length by eye on the plan, then report the guess as the length"],
    "A string can trace the winding path on the plan. Measuring it and applying the plan scale gives the real length. The best strategy is to <b>trace the path with a string on the plan, then measure the string and scale it</b>.",{});},
  function(){return mcq("Which strategy best determines the perimeter of an irregularly shaped sticker?",
    "Press a thread around the outline, mark it, then measure the thread flat",
    ["Measure the widest part of the sticker, then multiply that width by four","Press a thread around the outline, mark it, then measure only half of it","Estimate each part by eye, then add the guesses and report the total sum"],
    "A thread can follow the irregular outline. Marking the join and measuring the thread flat gives the perimeter. The best strategy is to <b>press a thread around the outline, mark it, then measure the thread flat</b>.",{});}
]));

/* 11. Surface area of a basic solid, one mode describes a net (5.1) */
E("u1-sa-basic",1,["5.1","5.2"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1||mode===2){
    var r=ri(3,10),h=ri(5,15),ans=u1r1(2*Math.PI*r*(r+h));
    var prompt=mode===1?
      "A closed cylindrical paint can has radius "+r+" cm and height "+h+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed cylinder is a rectangle joined to two congruent circles. The circles have radius "+r+" cm, and the rectangle has height "+h+" cm and length equal to the circumference of a circle. Sketch the net in words and determine the total surface area of the cylinder. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt,ans,0.11,
      "The surface area of a closed cylinder is the two circles plus the curved rectangle: \\[ \\begin{aligned} SA &= 2\\pi r^2 + 2\\pi r h \\\\ &= 2\\pi("+r+")^2 + 2\\pi("+r+")("+h+") \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),l3=r3+ri(2,7),ans3=u1r1(Math.PI*r3*(r3+l3));
    var q=numq("A solid cone ornament has radius "+r3+" cm and slant height "+l3+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "The surface area of a cone is the circular base plus the lateral area: \\[ \\begin{aligned} SA &= \\pi r^2 + \\pi r l \\\\ &= \\pi("+r3+")^2 + \\pi("+r3+")("+l3+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r3,l:l3});
    q.figure=u1figCone(r3,Math.sqrt(Math.max(l3*l3-r3*r3,0.25)),{rLab:fmt(r3)+" cm",lLab:fmt(l3)+" cm"});
    return q;
  }
  if(mode===4||mode===5){
    var a=ri(3,12),b=ri(3,12),c=ri(3,12),ans4=2*(a*b+a*c+b*c);
    var prompt4=mode===4?
      "A closed rectangular storage box has length "+a+" cm, width "+b+" cm and height "+c+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.":
      "The net of a closed rectangular prism is six rectangles in three congruent pairs, with dimensions "+a+" cm by "+b+" cm, "+a+" cm by "+c+" cm, and "+b+" cm by "+c+" cm. Sketch the net in words and determine the total surface area of the prism. Give your answer to the nearest tenth, in square centimetres.";
    var q=numq(prompt4,ans4,0.11,
      "Add the areas of the three pairs of congruent faces: \\[ \\begin{aligned} SA &= 2(lw + lh + wh) \\\\ &= 2("+a+"\\times"+b+" + "+a+"\\times"+c+" + "+b+"\\times"+c+") \\\\ &= "+ans4+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans4)+" square centimetres</b>.",{mode:mode,a:a,b:b,c:c});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm",fmt(c)+" cm");
    return q;
  }
  var s=ri(4,12),l6=s+ri(2,8),ans6=s*s+2*s*l6;
  var q=numq("A square based pyramid paperweight has base side "+s+" cm and slant height "+l6+" cm. Determine its total surface area. Give your answer to the nearest tenth, in square centimetres.",ans6,0.11,
    "The surface area is the square base plus four congruent triangular faces: \\[ \\begin{aligned} SA &= s^2 + 2sl \\\\ &= "+s+"^2 + 2("+s+")("+l6+") \\\\ &= "+ans6+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans6)+" square centimetres</b>.",{mode:mode,s:s,l:l6});
  q.figure=u1figPyr(s,Math.sqrt(Math.max(l6*l6-(s/2)*(s/2),0.25)),{sLab:fmt(s)+" cm",lLab:fmt(l6)+" cm"});
  return q;
});

/* 12. Unknown dimension from a surface area, one clean step */
E("u1-sa-unknown",1,["5.3"],2,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,9),h=ri(4,14),SA=u1r1(2*Math.PI*r*(r+h));
    var q=numq("A closed cylinder has radius "+r+" cm and total surface area "+fmt(SA)+" square centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h,0.11,
      "Substitute into the surface area formula and solve for the height: \\[ \\begin{aligned} 2\\pi r(r + h) &= "+fmt(SA)+" \\\\ r + h &\\approx \\frac{"+fmt(SA)+"}{2\\pi("+r+")} \\\\ h &\\approx "+h+" \\end{aligned} \\] So the height is <b>"+h+" centimetres</b>.",{mode:mode,r:r});
    q.figure=u1figCyl(r,h,fmt(r)+" cm","?");
    return q;
  }
  if(mode===2){
    var w=ri(3,9),h2=ri(3,9),l=ri(4,14),SA2=2*(l*w+l*h2+w*h2);
    var q=numq("A closed rectangular box has width "+w+" cm, height "+h2+" cm and total surface area "+SA2+" square centimetres. Determine its length. Give your answer to the nearest tenth, in centimetres.",l,0.11,
      "Substitute into the surface area formula and solve for the length: \\[ \\begin{aligned} 2(lw + lh + wh) &= "+SA2+" \\\\ l("+w+" + "+h2+") &= "+(SA2/2-w*h2)+" \\\\ l &= "+l+" \\end{aligned} \\] So the length is <b>"+l+" centimetres</b>.",{mode:mode,w:w,h:h2});
    q.figure=u1figPrism(l,w,h2,"?",fmt(w)+" cm",fmt(h2)+" cm");
    return q;
  }
  if(mode===3){
    var l3=ri(6,14),r3=ri(3,8),LA=u1r1(Math.PI*r3*l3);
    if(r3>=l3){r3=l3-3;}
    LA=u1r1(Math.PI*r3*l3);
    var q=numq("The lateral surface area of a cone is "+fmt(LA)+" square centimetres and its slant height is "+l3+" cm. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r3,0.11,
      "The lateral area is pi times radius times slant height, so divide: \\[ \\begin{aligned} r &= \\frac{LA}{\\pi l} \\\\ &\\approx \\frac{"+fmt(LA)+"}{\\pi("+l3+")} \\\\ &\\approx "+r3+" \\end{aligned} \\] So the radius is <b>"+r3+" centimetres</b>.",{mode:mode,l:l3});
    q.figure=u1figCone(r3,Math.sqrt(Math.max(l3*l3-r3*r3,0.25)),{rLab:"?",lLab:fmt(l3)+" cm"});
    return q;
  }
  var s=ri(4,12),l4=ri(5,14),SA4=s*s+2*s*l4;
  var q=numq("A square based pyramid has base side "+s+" cm and total surface area "+SA4+" square centimetres. Determine its slant height. Give your answer to the nearest tenth, in centimetres.",l4,0.11,
    "Subtract the base area, then divide by twice the base side: \\[ \\begin{aligned} 2sl &= "+SA4+" - "+s+"^2 \\\\ l &= \\frac{"+(SA4-s*s)+"}{2("+s+")} \\\\ &= "+l4+" \\end{aligned} \\] So the slant height is <b>"+l4+" centimetres</b>.",{mode:mode,s:s});
  q.figure=u1figPyr(s,Math.sqrt(Math.max(l4*l4-(s/2)*(s/2),0.25)),{sLab:fmt(s)+" cm",lLab:"?"});
  return q;
});

/* 13. Volume of a basic solid */
E("u1-vol-basic",1,["5.4"],2,"gen",function(){
  var mode=ri(1,5);
  if(mode===1){
    var r=ri(3,10),h=ri(5,16),ans=u1r1(Math.PI*r*r*h);
    var q=numq("A cylindrical water tank has radius "+r+" cm and height "+h+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans,0.11,
      "The volume of a cylinder is the area of its base times its height, \\(V = A_b \\times h\\). First find the base area: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r+")^2 \\\\ V &= A_b \\times h = \\pi("+r+")^2("+h+") \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans)+" cubic centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var r2=ri(3,9),h2=pick([6,9,12,15]),ans2=u1r1(Math.PI*r2*r2*h2/3);
    var q=numq("A cone shaped pile of sand has radius "+r2+" cm and height "+h2+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans2,0.11,
      "The volume of a cone is one third of the area of its base times its height. First find the base area: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r2+")^2 \\\\ V &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}\\pi("+r2+")^2("+h2+") \\\\ &\\approx "+fmt(ans2)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans2)+" cubic centimetres</b>.",{mode:mode,r:r2,h:h2});
    q.figure=u1figCone(r2,h2,{rLab:fmt(r2)+" cm",hLab:fmt(h2)+" cm"});
    return q;
  }
  if(mode===3){
    var a=ri(3,14),b=ri(3,12),c=ri(3,12),ans3=a*b*c;
    var q=numq("A rectangular storage crate has length "+a+" cm, width "+b+" cm and height "+c+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans3,0.11,
      "The volume of a prism is the area of its base times its height, \\(V = A_b \\times h\\). First find the base area: \\[ \\begin{aligned} A_b &= l \\times w = "+a+" \\times "+b+" = "+(a*b)+" \\\\ V &= A_b \\times h = "+(a*b)+" \\times "+c+" \\\\ &= "+ans3+" \\end{aligned} \\] So the volume is <b>"+ans3+" cubic centimetres</b>.",{mode:mode,a:a,b:b,c:c});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm",fmt(c)+" cm");
    return q;
  }
  if(mode===4){
    var tb=pick([4,6,8,10,12]),th=pick([3,4,5,6]),L=ri(5,14),ans4=(tb*th/2)*L;
    var q=numq("A tent is a triangular prism. Its triangular end has base "+tb+" cm and height "+th+" cm, and the prism is "+L+" cm long. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
      "The volume of a prism is the area of its base times its length. The base is the triangular end: \\[ \\begin{aligned} A_b &= \\frac{1}{2}bh = \\frac{1}{2}("+tb+")("+th+") = "+(tb*th/2)+" \\\\ V &= A_b \\times L = "+(tb*th/2)+" \\times "+L+" \\\\ &= "+ans4+" \\end{aligned} \\] So the volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,tb:tb,th:th,L:L});
    q.figure=u1figTriPrism(tb,th,L,fmt(tb)+" cm",fmt(th)+" cm",fmt(L)+" cm");
    return q;
  }
  var s=ri(4,12),h5=pick([3,6,9,12]),ans5=s*s*h5/3;
  var q=numq("A square based pyramid ornament has base side "+s+" cm and height "+h5+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans5,0.11,
    "The volume of a pyramid is one third of the area of its base times its height. First find the base area: \\[ \\begin{aligned} A_b &= s^2 = "+s+"^2 = "+(s*s)+" \\\\ V &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}("+s+")^2("+h5+") \\\\ &= "+ans5+" \\end{aligned} \\] So the volume is <b>"+fmt(ans5)+" cubic centimetres</b>.",{mode:mode,s:s,h:h5});
  q.figure=u1figPyr(s,h5,{sLab:fmt(s)+" cm",hLab:fmt(h5)+" cm"});
  return q;
});

/* 14. The one-third volume relation */
E("u1-vol-relation",1,["5.5"],1,"gen",function(){
  var mode=ri(1,4),small=ri(8,120),big=small*3,ans,ds,prompt,sol;
  if(mode===1){
    ans=small; ds=[fmt(big),fmt(big/2),fmt(big*3)];
    prompt="A right cylinder has volume "+big+" cubic centimetres. A right cone has the same base and the same height as the cylinder. Determine the volume of the cone, in cubic centimetres.";
    sol="A cone with the same base and height as a cylinder holds one third of the volume: \\[ \\begin{aligned} V &= \\frac{1}{3} \\times "+big+" \\\\ &= "+small+" \\end{aligned} \\] So the cone volume is <b>"+small+" cubic centimetres</b>.";
  }else if(mode===2){
    ans=big; ds=[fmt(small),fmt(small*2),fmt(u1r1(small/3))];
    prompt="A right cone has volume "+small+" cubic centimetres. A right cylinder has the same base and the same height as the cone. Determine the volume of the cylinder, in cubic centimetres.";
    sol="A cylinder holds three times the volume of a cone with the same base and height: \\[ \\begin{aligned} V &= 3 \\times "+small+" \\\\ &= "+big+" \\end{aligned} \\] So the cylinder volume is <b>"+big+" cubic centimetres</b>.";
  }else if(mode===3){
    ans=small; ds=[fmt(big),fmt(big/2),fmt(big*3)];
    prompt="A right prism has volume "+big+" cubic centimetres. A right pyramid has the same base and the same height as the prism. Determine the volume of the pyramid, in cubic centimetres.";
    sol="A pyramid with the same base and height as a prism holds one third of the volume: \\[ \\begin{aligned} V &= \\frac{1}{3} \\times "+big+" \\\\ &= "+small+" \\end{aligned} \\] So the pyramid volume is <b>"+small+" cubic centimetres</b>.";
  }else{
    ans=big; ds=[fmt(small),fmt(small*2),fmt(u1r1(small/3))];
    prompt="A right pyramid has volume "+small+" cubic centimetres. A right prism has the same base and the same height as the pyramid. Determine the volume of the prism, in cubic centimetres.";
    sol="A prism holds three times the volume of a pyramid with the same base and height: \\[ \\begin{aligned} V &= 3 \\times "+small+" \\\\ &= "+big+" \\end{aligned} \\] So the prism volume is <b>"+big+" cubic centimetres</b>.";
  }
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,small:small});
  if(mode===1)q.figure=u1figPair("cyl","cone",fmt(big)+" cm³","?");
  else if(mode===2)q.figure=u1figPair("cone","cyl",fmt(small)+" cm³","?");
  else if(mode===3)q.figure=u1figPair("prism","pyr",fmt(big)+" cm³","?");
  else q.figure=u1figPair("pyr","prism",fmt(small)+" cm³","?");
  return q;
});

/* 15. Unknown dimension from a volume */
E("u1-vol-unknown",1,["5.6"],2,"gen",function(){
  var mode=ri(1,5);
  if(mode===1){
    var r=ri(3,9),h=ri(4,14),V=u1r1(Math.PI*r*r*h);
    var q=numq("A cylinder has radius "+r+" cm and volume "+fmt(V)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h,0.11,
      "Substitute the known values into \\(V = A_b \\times h\\), where the base area is \\(A_b = \\pi r^2\\), and solve for the height: \\[ \\begin{aligned} "+fmt(V)+" &= \\pi("+r+")^2 \\times h \\\\ h &\\approx \\frac{"+fmt(V)+"}{\\pi("+r+")^2} \\\\ &\\approx "+h+" \\end{aligned} \\] So the height is <b>"+h+" centimetres</b>.",{mode:mode,r:r});
    q.figure=u1figCyl(r,h,fmt(r)+" cm","?");
    return q;
  }
  if(mode===2){
    var r2=ri(3,10),h2=ri(4,12),V2=u1r1(Math.PI*r2*r2*h2);
    var q=numq("A cylinder has height "+h2+" cm and volume "+fmt(V2)+" cubic centimetres. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r2,0.11,
      "Substitute the known values into the volume formula \\(V = \\pi r^2 h\\) and solve for the radius: \\[ \\begin{aligned} "+fmt(V2)+" &= \\pi r^2 \\times "+h2+" \\\\ r^2 &\\approx \\frac{"+fmt(V2)+"}{\\pi \\times "+h2+"} \\\\ r &\\approx "+r2+" \\end{aligned} \\] So the radius is <b>"+r2+" centimetres</b>.",{mode:mode,h:h2});
    q.figure=u1figCyl(r2,h2,"?",fmt(h2)+" cm");
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),h3=ri(4,15),V3=u1r1(Math.PI*r3*r3*h3/3);
    var q=numq("A cone has radius "+r3+" cm and volume "+fmt(V3)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h3,0.11,
      "Substitute the known values into \\(V = \\frac{1}{3} A_b \\times h\\), where the base area is \\(A_b = \\pi r^2\\), and solve for the height: \\[ \\begin{aligned} "+fmt(V3)+" &= \\frac{1}{3} \\times \\pi("+r3+")^2 \\times h \\\\ h &\\approx \\frac{3 \\times "+fmt(V3)+"}{\\pi("+r3+")^2} \\\\ &\\approx "+h3+" \\end{aligned} \\] So the height is <b>"+h3+" centimetres</b>.",{mode:mode,r:r3});
    q.figure=u1figCone(r3,h3,{rLab:fmt(r3)+" cm",hLab:"?"});
    return q;
  }
  if(mode===4){
    var a=ri(3,10),b=ri(3,10),c=ri(3,12),V4=a*b*c;
    var q=numq("A rectangular box has length "+a+" cm, width "+b+" cm and volume "+V4+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",c,0.11,
      "First find the area of the base, \\(A_b = "+a+" \\times "+b+" = "+(a*b)+"\\). Substitute the known values into \\(V = A_b \\times h\\) and solve for the height: \\[ \\begin{aligned} "+V4+" &= "+(a*b)+" \\times h \\\\ h &= \\frac{"+V4+"}{"+(a*b)+"} = "+c+" \\end{aligned} \\] So the height is <b>"+c+" centimetres</b>.",{mode:mode,a:a,b:b});
    q.figure=u1figPrism(a,b,c,fmt(a)+" cm",fmt(b)+" cm","?");
    return q;
  }
  var s=ri(3,9),h5=ri(3,12),V5=s*s*h5/3;
  if(V5!==Math.floor(V5)){h5=h5*3; V5=s*s*h5/3;}
  var q=numq("A square based pyramid has base side "+s+" cm and volume "+fmt(V5)+" cubic centimetres. Determine its height. Give your answer to the nearest tenth, in centimetres.",h5,0.11,
    "First find the area of the base, \\(A_b = "+s+"^2 = "+(s*s)+"\\). Substitute the known values into \\(V = \\frac{1}{3} A_b \\times h\\) and solve for the height: \\[ \\begin{aligned} "+fmt(V5)+" &= \\frac{1}{3} \\times "+(s*s)+" \\times h \\\\ h &= \\frac{3 \\times "+fmt(V5)+"}{"+(s*s)+"} = "+h5+" \\end{aligned} \\] So the height is <b>"+h5+" centimetres</b>.",{mode:mode,s:s});
  q.figure=u1figPyr(s,h5,{sLab:fmt(s)+" cm",hLab:"?"});
  return q;
});

/* 16. Sphere surface area and volume, and radius from surface area */
E("u1-sphere",1,["5.7","5.8"],2,"gen",function(){
  var mode=ri(1,6),prof=pick([
    {name:"spherical garden ornament",lo:3,hi:12},
    {name:"globe",lo:10,hi:20},
    {name:"marble",lo:1,hi:3},
    {name:"spherical water tank",lo:8,hi:18},
    {name:"spherical exercise ball",lo:15,hi:35},
    {name:"beach ball",lo:12,hi:24}
  ]);
  var r=ri(prof.lo,prof.hi);
  if(mode===1){
    var ans=u1r1(4*Math.PI*r*r);
    var q=numq("A "+prof.name+" has radius "+r+" cm. Determine its surface area. Give your answer to the nearest tenth, in square centimetres.",ans,0.11,
      "The surface area of a sphere is four pi times radius squared: \\[ \\begin{aligned} SA &= 4\\pi r^2 \\\\ &= 4\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(fmt(r)+" cm",null);
    return q;
  }
  if(mode===2){
    var ans2=u1r1(4*Math.PI*r*r*r/3);
    var q=numq("A "+prof.name+" has radius "+r+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans2,0.11,
      "The volume of a sphere is four thirds pi times radius cubed: \\[ \\begin{aligned} V &= \\frac{4}{3}\\pi r^3 \\\\ &= \\frac{4}{3}\\pi("+r+")^3 \\\\ &\\approx "+fmt(ans2)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans2)+" cubic centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(fmt(r)+" cm",null);
    return q;
  }
  if(mode===3){
    var d=r*2,ans3=u1r1(4*Math.PI*r*r);
    var q=numq("A "+prof.name+" has diameter "+d+" cm. Determine its surface area. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "Halve the diameter to get the radius, then use the sphere formula: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ SA &= 4\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the surface area is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(null,fmt(d)+" cm");
    return q;
  }
  if(mode===4){
    var d4=r*2,ans4=u1r1(4*Math.PI*r*r*r/3);
    var q=numq("A "+prof.name+" has diameter "+d4+" cm. Determine its volume. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
      "Halve the diameter to get the radius, then use the sphere formula: \\[ \\begin{aligned} r &= "+d4+" \\div 2 = "+r+" \\\\ V &= \\frac{4}{3}\\pi("+r+")^3 \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere(null,fmt(d4)+" cm");
    return q;
  }
  if(mode===5){
    var SA5=u1r1(4*Math.PI*r*r);
    var q=numq("A sphere has surface area "+fmt(SA5)+" square centimetres. Determine its radius. Give your answer to the nearest tenth, in centimetres.",r,0.11,
      "Substitute the known value into the surface area formula \\(SA = 4\\pi r^2\\) and solve for the radius: \\[ \\begin{aligned} "+fmt(SA5)+" &= 4\\pi r^2 \\\\ r^2 &\\approx \\frac{"+fmt(SA5)+"}{4\\pi} \\\\ r &\\approx "+r+" \\end{aligned} \\] So the radius is <b>"+r+" centimetres</b>.",{mode:mode,r:r,prof:prof.name});
    q.figure=u1figSphere("?",null);
    return q;
  }
  var SA6=u1r1(4*Math.PI*r*r);
  var q=numq("A sphere has surface area "+fmt(SA6)+" square centimetres. Determine its diameter. Give your answer to the nearest tenth, in centimetres.",r*2,0.11,
    "Substitute the known value into the surface area formula \\(SA = 4\\pi r^2\\) and solve for the radius, then double it: \\[ \\begin{aligned} "+fmt(SA6)+" &= 4\\pi r^2 \\\\ r^2 &\\approx \\frac{"+fmt(SA6)+"}{4\\pi} \\\\ r &\\approx "+r+" \\\\ d &= 2 \\times "+r+" = "+(r*2)+" \\end{aligned} \\] So the diameter is <b>"+(r*2)+" centimetres</b>.",{mode:mode,r:r,prof:prof.name});
  q.figure=u1figSphere(null,"?");
  return q;
});

/* 17. Composite volume, the decomposition is the decision */
E("u1-composite",1,["5.9"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,8),h=ri(6,14),ans=u1r1(Math.PI*r*r*h+2*Math.PI*r*r*r/3);
    var q=numq("A storage silo is a cylinder with a hemispherical top. The cylinder has radius "+r+" cm and height "+h+" cm, and the hemisphere has the same radius. Determine the total volume of the silo. Give your answer to the nearest tenth, in cubic centimetres.",ans,0.11,
      "Split the solid into a cylinder plus a hemisphere. First find the area of the base, then use it for the cylinder. The hemisphere is half a sphere, so its volume is half the volume of a full sphere: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r+")^2 \\\\ V_{\\text{cylinder}} &= A_b \\times h = \\pi("+r+")^2("+h+") \\\\ V_{\\text{hemisphere}} &= \\frac{1}{2} \\times \\frac{4}{3}\\pi("+r+")^3 \\\\ V &= V_{\\text{cylinder}} + V_{\\text{hemisphere}} \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the total volume is <b>"+fmt(ans)+" cubic centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figSilo(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var a=ri(4,10),b=ri(3,8),hp=ri(4,10),hq=ri(3,8),ans2=a*b*hp+(a*b*hq)/3;
    if(ans2!==Math.floor(ans2))hq=hq*3,ans2=a*b*hp+(a*b*hq)/3;
    var q=numq("A storage building is a rectangular prism with a pyramid roof. The prism has length "+a+" cm, width "+b+" cm and height "+hp+" cm. The pyramid has the same length and width as its base and height "+hq+" cm. Determine the total volume of the building. Give your answer to the nearest tenth, in cubic centimetres.",u1r1(ans2),0.11,
      "Split the solid into a prism plus a pyramid on the same base. First find the shared base area: \\[ \\begin{aligned} A_b &= l \\times w = "+a+" \\times "+b+" = "+(a*b)+" \\\\ V &= A_b \\times "+hp+" + \\frac{1}{3} A_b \\times "+hq+" \\\\ &= "+fmt(u1r1(ans2))+" \\end{aligned} \\] So the total volume is <b>"+fmt(u1r1(ans2))+" cubic centimetres</b>.",{mode:mode,a:a,b:b,hp:hp,hq:hq});
    q.figure=u1figHouse(a,b,hp,hq,{aLab:fmt(a)+" cm",bLab:fmt(b)+" cm",hpLab:fmt(hp)+" cm",hqLab:fmt(hq)+" cm"});
    return q;
  }
  if(mode===3){
    var r3=ri(3,8),H=ri(8,15),hc=pick([3,6]),ans3=u1r1(Math.PI*r3*r3*H-Math.PI*r3*r3*hc/3);
    var q=numq("A cylindrical block has radius "+r3+" cm and height "+H+" cm. A cone shaped hole with the same radius and height "+hc+" cm is removed from the block. Determine the volume that remains. Give your answer to the nearest tenth, in cubic centimetres.",ans3,0.11,
      "Subtract the removed cone from the full cylinder. Both parts share the same circular base, so find its area first: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r3+")^2 \\\\ V &= A_b \\times "+H+" - \\frac{1}{3} A_b \\times "+hc+" \\\\ &= \\pi("+r3+")^2("+H+") - \\frac{1}{3}\\pi("+r3+")^2("+hc+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the remaining volume is <b>"+fmt(ans3)+" cubic centimetres</b>.",{mode:mode,r:r3,H:H,hc:hc});
    q.figure=u1figBlock(r3,H,hc,fmt(r3)+" cm",fmt(H)+" cm",fmt(hc)+" cm");
    return q;
  }
  var r4=ri(3,7),h4=pick([6,9,12]),ans4=u1r1(Math.PI*r4*r4*h4/3+2*Math.PI*r4*r4*r4/3);
  var q=numq("A treat is a cone topped with a hemispherical scoop. The cone has radius "+r4+" cm and height "+h4+" cm, and the hemisphere has the same radius. Determine the total volume of the treat. Give your answer to the nearest tenth, in cubic centimetres.",ans4,0.11,
    "Split the solid into a cone plus a hemisphere. First find the area of the base, then use it for the cone. The hemisphere is half a sphere, so its volume is half the volume of a full sphere: \\[ \\begin{aligned} A_b &= \\pi r^2 = \\pi("+r4+")^2 \\\\ V_{\\text{cone}} &= \\frac{1}{3} A_b \\times h = \\frac{1}{3}\\pi("+r4+")^2("+h4+") \\\\ V_{\\text{hemisphere}} &= \\frac{1}{2} \\times \\frac{4}{3}\\pi("+r4+")^3 \\\\ V &= V_{\\text{cone}} + V_{\\text{hemisphere}} \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the total volume is <b>"+fmt(ans4)+" cubic centimetres</b>.",{mode:mode,r:r4,h:h4});
  q.figure=u1figTreat(r4,h4,fmt(r4)+" cm",fmt(h4)+" cm");
  return q;
});

/* 18. Read an instrument scale */
E("u1-read-instrument",1,["5.14"],1,"var",varset([
  function(){var q=mcq("On a centimetre ruler, the end of a ribbon lines up with the third millimetre tick after the 7 centimetre mark. Determine the length of the ribbon, in centimetres.",
    "7.3",["7.0","7.03","10.00"],
    "Each millimetre tick is 0.1 cm, so three ticks past 7 cm add 0.3 cm: \\[ 7 + 0.3 = 7.3 \\] The length is <b>7.3 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:8,major:1,minorPer:10,from:0,to:7.3,unit:"cm"}); return q;},
  function(){return mcq("A caliper scale reads 24 millimetres for the diameter of a bolt. Which reading, in centimetres, matches the caliper?",
    "2.4",["0.24","24.0","240.00"],
    "Divide millimetres by 10 to get centimetres: \\[ 24 \\div 10 = 2.4 \\] The matching reading is <b>2.4 centimetres</b>.",{});},
  function(){return mcq("On a tape measure, a board ends at the 1 metre mark plus 24 centimetres more. Determine the length of the board, in centimetres.",
    "124",["24","100","125"],
    "Change the metre to centimetres and add: \\[ 100 + 24 = 124 \\] The length is <b>124 centimetres</b>.",{});},
  function(){var q=mcq("On an inch ruler divided into quarter inches, the end of a card lines up with the second quarter tick after the 3 inch mark. Determine the length of the card, in inches.",
    "3.5",["3.25","3.75","5.0"],
    "Two quarter ticks make one half inch past the 3 inch mark: \\[ 3 + 0.5 = 3.5 \\] The length is <b>3.5 inches</b>.",{}); q.figure=u1figRuler({min:0,max:5,major:1,minorPer:4,from:0,to:3.5,unit:"in"}); return q;},
  function(){return mcq("A length is given as 68 millimetres. Which caliper reading, in centimetres, shows the same length?",
    "6.8",["0.68","68.0","680.00"],
    "Divide millimetres by 10 to get centimetres: \\[ 68 \\div 10 = 6.8 \\] The matching reading is <b>6.8 centimetres</b>.",{});},
  function(){var q=mcq("On a metre stick, the end of a cord lines up with the 47 centimetre mark. Determine the length of the cord, in metres.",
    "0.47",["0.047","4.70","47.000"],
    "Divide centimetres by 100 to get metres: \\[ 47 \\div 100 = 0.47 \\] The length is <b>0.47 metres</b>.",{}); q.figure=u1figRuler({min:0,max:100,major:10,minorPer:10,from:0,to:47,unit:"cm"}); return q;},
  function(){return mcq("A caliper scale reads 12.5 millimetres for the thickness of a washer. Determine the thickness, in millimetres.",
    "12.5",["1.25","12.0","125.00"],
    "The scale already reads in millimetres, so the reading is taken directly. The thickness is <b>12.5 millimetres</b>.",{});},
  function(){var q=mcq("A strip of paper starts at the 2 centimetre mark of a ruler and ends at the 9 centimetre mark. Determine the length of the strip, in centimetres.",
    "7",["9","11","18"],
    "Subtract the starting mark from the ending mark, since the strip does not start at zero: \\[ 9 - 2 = 7 \\] The length is <b>7 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:10,major:1,minorPer:10,from:2,to:9,unit:"cm"}); return q;},
  function(){var q=mcq("A ribbon starts at the 1 inch mark of a ruler and ends at the 4.5 inch mark. Determine the length of the ribbon, in inches.",
    "3.5",["4.5","5.0","5.5"],
    "Subtract the starting mark from the ending mark, since the ribbon does not start at zero: \\[ 4.5 - 1 = 3.5 \\] The length is <b>3.5 inches</b>.",{}); q.figure=u1figRuler({min:0,max:6,major:1,minorPer:4,from:1,to:4.5,unit:"in"}); return q;},
  function(){var q=mcq("On a centimetre ruler, a screw lines up from the 0 mark to the sixth millimetre tick after the 4 centimetre mark. Determine the length of the screw, in centimetres.",
    "4.6",["4.06","5.0","10.00"],
    "Each millimetre tick is 0.1 cm, so six ticks past 4 cm add 0.6 cm: \\[ 4 + 0.6 = 4.6 \\] The length is <b>4.6 centimetres</b>.",{}); q.figure=u1figRuler({min:0,max:6,major:1,minorPer:10,from:0,to:4.6,unit:"cm"}); return q;}
]));

/* 19. Composite surface area, deciding which surfaces count */
E("u1-composite-sa",1,["5.9"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var r=ri(3,8),h=ri(6,14),ans=u1r1(2*Math.PI*r*h+2*Math.PI*r*r);
    var q=numq("A silo is a cylinder with a hemispherical top. The cylinder has radius "+r+" cm and height "+h+" cm, and the hemisphere has the same radius. The silo sits on the ground and is painted on all outside surfaces except the bottom. Determine the area painted. Give your answer to the nearest tenth, in square centimetres.",ans,0.11,
      "Only the curved wall of the cylinder and the curved surface of the hemisphere are painted. The flat circle where they join is inside the silo, and the bottom is not painted: \\[ \\begin{aligned} SA &= 2\\pi r h + 2\\pi r^2 \\\\ &= 2\\pi("+r+")("+h+") + 2\\pi("+r+")^2 \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] So the area painted is <b>"+fmt(ans)+" square centimetres</b>.",{mode:mode,r:r,h:h});
    q.figure=u1figSilo(r,h,fmt(r)+" cm",fmt(h)+" cm");
    return q;
  }
  if(mode===2){
    var s=ri(4,10),hp=ri(3,9),l=ri(5,12),ans2=s*s+4*s*hp+2*s*l;
    var q=numq("A solid ornament is a square prism with a square pyramid on top. The prism has base side "+s+" cm and height "+hp+" cm. The pyramid has the same base side and slant height "+l+" cm. Determine the total surface area of the solid. Give your answer to the nearest tenth, in square centimetres.",ans2,0.11,
      "Count the bottom and the four walls of the prism plus the four triangular faces of the pyramid. The top face of the prism is covered by the pyramid, and the base of the pyramid is inside the solid, so neither is counted: \\[ \\begin{aligned} SA &= s^2 + 4sh + 2sl \\\\ &= "+s+"^2 + 4("+s+")("+hp+") + 2("+s+")("+l+") \\\\ &= "+ans2+" \\end{aligned} \\] So the total surface area is <b>"+ans2+" square centimetres</b>.",{mode:mode,s:s,hp:hp,l:l});
    q.figure=u1figHouse(s,s,hp,Math.sqrt(Math.max(l*l-(s/2)*(s/2),0.25)),{aLab:fmt(s)+" cm",hpLab:fmt(hp)+" cm",lLab:fmt(l)+" cm"});
    return q;
  }
  if(mode===3){
    var r3=ri(3,9),h3=ri(5,13),ans3=u1r1(Math.PI*r3*r3+2*Math.PI*r3*h3);
    var q=numq("An open top cylindrical bin has radius "+r3+" cm and height "+h3+" cm. Sheet metal is used for the bottom and the curved side only. Determine the area of sheet metal used. Give your answer to the nearest tenth, in square centimetres.",ans3,0.11,
      "Count the circular bottom plus the curved side. There is no lid, so no top circle is counted: \\[ \\begin{aligned} SA &= \\pi r^2 + 2\\pi r h \\\\ &= \\pi("+r3+")^2 + 2\\pi("+r3+")("+h3+") \\\\ &\\approx "+fmt(ans3)+" \\end{aligned} \\] So the area used is <b>"+fmt(ans3)+" square centimetres</b>.",{mode:mode,r:r3,h:h3});
    q.figure=u1figCyl(r3,h3,fmt(r3)+" cm",fmt(h3)+" cm");
    return q;
  }
  var r4=ri(3,8),h4=ri(5,12),l4=r4+ri(3,7),ans4=u1r1(Math.PI*r4*r4+2*Math.PI*r4*h4+Math.PI*r4*l4);
  var q=numq("A solid tower ornament is a cylinder with a cone roof on top. The cylinder has radius "+r4+" cm and height "+h4+" cm. The cone has the same radius and slant height "+l4+" cm. Determine the total surface area of the solid. Give your answer to the nearest tenth, in square centimetres.",ans4,0.11,
    "Count the bottom circle and curved wall of the cylinder plus the lateral area of the cone. The top circle of the cylinder is covered by the cone, and the base of the cone is inside the solid, so neither is counted: \\[ \\begin{aligned} SA &= \\pi r^2 + 2\\pi r h + \\pi r l \\\\ &= \\pi("+r4+")^2 + 2\\pi("+r4+")("+h4+") + \\pi("+r4+")("+l4+") \\\\ &\\approx "+fmt(ans4)+" \\end{aligned} \\] So the total surface area is <b>"+fmt(ans4)+" square centimetres</b>.",{mode:mode,r:r4,h:h4,l:l4});
  q.figure=u1figTower(r4,h4,l4,fmt(r4)+" cm",fmt(h4)+" cm",fmt(l4)+" cm");
  return q;
});
