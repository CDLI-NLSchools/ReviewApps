// Math 2201 Unit 1: Acute Triangle Trigonometry question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1204 to 1279).
// CRMARKS: u1-sine-side=2
// CRMARKS: u1-sine-angle=2
// CRMARKS: u1-cosine-side=2
// CRMARKS: u1-cosine-angle=2
// CRMARKS: u1-two-triangles=4
/* ============ Unit 1: Acute Triangle Trigonometry ============ */
function angFmt(x){return fmt(x,1)+"\u00B0";}
E("u1-law-choice",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In triangle ABC you know two angles and the side between them. Which law starts the solution?",
    "The sine law \u2014 an angle and its opposite side form a complete pair",
    ["The cosine law \u2014 it needs no angles, so the known pair does not matter","The tangent ratio \u2014 it works in any triangle, right-angled or not","The Pythagorean theorem \u2014 first find the third angle from the two given"],
    "Two angles give the third by the angle sum, and the known side sits opposite a known angle: a complete sine-law pair. (Pythagoras and the tangent ratio are for right triangles only.)",{});},
  function(){return mcq("In triangle PQR you know two sides and the angle between them, and you need the third side. Which law do you use?",
    "The cosine law \u2014 it is built for the side-angle-side case",
    ["The sine law \u2014 it only needs the two sides and no other information","The sine law, after splitting the triangle in two parts","The Pythagorean theorem, because two sides are known and that is enough here"],
    "With no angle-opposite-side pair, the sine law has nothing to anchor to. The cosine law, \\(c^2 = a^2 + b^2 - 2ab\\cos C\\), handles SAS directly.",{});},
  function(){return mcq("You know all three sides of an acute triangle and need its largest angle. Which law should you use, and why?",
    "The cosine law, rearranged \u2014 it is the only one that uses three sides to give an angle",
    ["The sine law, because three sides give three ratios to set equal for the angle","The tangent ratio, using the two longest sides as the opposite and adjacent pair","No law is needed — the largest angle is always \\(90^\\circ\\) in a triangle with three known sides"],
    "\\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\) uses exactly the three sides. The largest angle sits opposite the longest side.",{});}
,
function(){var q = mcq("In triangle ABC, a diagram marks side \\(a = 9\\text{ cm}\\) (opposite angle \\(A\\)), side \\(b = 7\\text{ cm}\\), and angle \\(A = 35^\\circ\\). Which set-up finds angle B?",
    "\\(\\frac{\\sin B}{7} = \\frac{\\sin 35^\\circ}{9}\\) — each angle is paired with the side opposite it",
    ["\\(\\frac{\\sin B}{9} = \\frac{\\sin 35^\\circ}{7}\\) \u2014 the marked sides stay with their marked angles","\\(b^2 = a^2 + c^2 - 2ac\\cos B\\) — the cosine law, because two sides are known","\\(\\tan B = \\frac{7}{9}\\) — opposite over adjacent in the marked triangle"],
    "The sine law pairs each side with the sine of its OPPOSITE angle: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\), so \\(\\frac{9}{\\sin 35^\\circ} = \\frac{7}{\\sin B}\\). The first trap swaps the pairing; the cosine law would need the side between the two known sides' angle, which is not what is marked.",{});q.figure=(function(){var Bv=Math.asin(7*Math.sin(35*Math.PI/180)/9)*180/Math.PI;return triSVG(9, 7, 9*Math.sin((180-35-Bv)*Math.PI/180)/Math.sin(35*Math.PI/180), {L:["A","B","C"], ang:["35°","?",null], side:["9 cm","7 cm",null]});})();return q;},
  function(){return mcq("You know two sides of a triangle and an angle opposite one of them, and you need another angle. Which law starts the solution, and what must you watch for?",
    "The sine law \u2014 and the angle it gives might not be the only possibility: an angle and its supplement both have the same sine, so the diagram has to rule one out",
    ["The cosine law \u2014 it is the only law that works with two known sides, so it must start the solution, and the angle it gives will be the one correct angle for the triangle shown","The sine law \u2014 and its answer is always the one correct angle, because the inverse sine returns the angle that fits the triangle, with no second candidate to check","The angle-sum rule \u2014 the third angle comes first, then either law finishes it, because knowing all three angles is what lets a law find the remaining angle"],
    "Side-side-angle is the ambiguous case for the sine law: \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\), so the calculation can offer two candidate angles and the shape of the triangle decides which one fits.",{});}
]));
E("u1-sine-side",1,["7.2"],1,"gen",function(){
  var A=pick([35,40,50,55,65]),B=pick([45,60,70,80]);var a=ri(8,20);
  var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q = numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (opposite \\(\\angle A\\)). Find side \\(b\\), to one decimal place, in cm.",
    Math.round(b*10)/10,0.06,"Sine law: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{a}{\\sin "+A+"^\\circ} = \\frac{"+a+"}{"+fmt(Math.sin(A*Math.PI/180),4)+"}\\). So \\(b = "+fmt(b,4)+" \\approx \\)<b>\\("+fmt(b,1)+"\\text{ cm}\\)</b>.",{A:A,B:B,a:a});
  q.figure = triSVG(a, b, a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180), {L:["A","B","C"], ang:[A+"°",B+"°",null], side:[a+" cm","?",null]});
  return q;
});
E("u1-sine-angle",1,["7.2"],1,"gen",function(){
  var tri=pick([{n:"DEF",u:"m"},{n:"ABC",u:"cm"},{n:"PQR",u:"km"}]);
  var A=pick([25,30,35,40,45,50,55,60]),a=pick([6,7,8,9,10,11,12,13,14,15,16]);
  var bts=[50,55,60,65,70,75,80].filter(function(x){return x>A+15&&A+x<175;});
  var Btar=pick(bts);
  var bTrue=a*Math.sin(Btar*Math.PI/180)/Math.sin(A*Math.PI/180);
  var b=Math.round(bTrue*10)/10;
  var Brev=Math.round(Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI);
  var L1=tri.n.charAt(0),L2=tri.n.charAt(1),l1=L1.toLowerCase(),l2=L2.toLowerCase();
  var q = numq("In \\(\\triangle "+tri.n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), side \\("+l1+" = "+a+"\\text{ "+tri.u+"}\\) (opposite \\(\\angle "+L1+"\\)), and side \\("+l2+" = "+fmt(b,1)+"\\text{ "+tri.u+"}\\). Find \\(\\angle "+L2+"\\), to the nearest degree.",
    Brev,1.1,"Sine law: \\(\\sin "+L2+" = \\frac{"+l2+" \\sin "+L1+"}{"+l1+"} = \\frac{"+fmt(b,1)+" \\times \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(b*Math.sin(A*Math.PI/180)/a,4)+"\\). So \\(\\angle "+L2+" = \\sin^{-1}("+fmt(b*Math.sin(A*Math.PI/180)/a,4)+") \\approx \\)<b>\\("+Brev+"^\\circ\\)</b> (the triangle is acute).",{A:A,a:a,b:b,Brev:Brev});
  q.figure = triSVG(a, b, (function(){var Bx=Math.asin(Math.min(1,b*Math.sin(A*Math.PI/180)/a))*180/Math.PI;return a*Math.sin((180-A-Bx)*Math.PI/180)/Math.sin(A*Math.PI/180);})(), {L:[L1,L2,tri.n.charAt(2)], ang:[A+"°","?",null], side:[a+" "+tri.u, fmt(b,1)+" "+tri.u, null]});
  return q;
});
E("u1-cosine-side",1,["7.2"],1,"gen",function(){
  var C=pick([50,60,70,80]),a=ri(6,14),b=ri(6,14);
  var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
  var q = numq("In \\(\\triangle PQR\\), sides \\(p = "+a+"\\text{ km}\\) and \\(q = "+b+"\\text{ km}\\) meet at \\(\\angle R = "+C+"^\\circ\\) between them. Find the side opposite \\(\\angle R\\), to one decimal place, in km.",
    Math.round(c*10)/10,0.06,"Cosine law: \\(r^2 = p^2 + q^2 - 2pq\\cos R = "+(a*a)+" + "+(b*b)+" - 2("+a+")("+b+")\\cos "+C+"^\\circ \\approx "+fmt(c*c,2)+"\\). So \\(r \\approx \\)<b>\\("+fmt(c,1)+"\\text{ km}\\)</b>.",{a:a,b:b,C:C});
  q.figure = triSVG(a, b, c, {L:["P","Q","R"], ang:[null,null,C+"°"], side:[a+" km",b+" km","?"]});
  return q;
});
E("u1-cosine-angle",1,["7.2"],1,"gen",function(){
  var Atar=pick([45,55,65,75]);var b=ri(6,12),c=ri(6,12);
  var aTrue=Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180));
  var a=Math.round(aTrue*10)/10;
  var cosA=(b*b+c*c-a*a)/(2*b*c);var Arev=Math.round(Math.acos(cosA)*180/Math.PI);
  var q = numq("A triangle has sides \\("+fmt(a,1)+", "+b+", "+c+"\\). Find the angle opposite the side of length \\("+fmt(a,1)+"\\), to the nearest degree.",
    Arev,1.1,"Cosine law rearranged: \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,2)+"}{"+(2*b*c)+"} \\approx "+fmt(cosA,4)+"\\). So \\(A \\approx \\)<b>\\("+Arev+"^\\circ\\)</b>.",{b:b,c:c,Arev:Arev,a:a});
  q.figure = triSVG(a, b, c, {L:["A","B","C"], ang:["?",null,null], side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-two-triangles",1,["7.3"],3,"gen",function(){
  var AB=pick([11,12,13]),BC=pick([8,9,10]),angB=pick([60,70,80]);
  var AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(angB*Math.PI/180));
  var angDAC=pick([50,55]),angD=pick([60,65]);var angACD=180-angDAC-angD;
  var CD=AC*Math.sin(angDAC*Math.PI/180)/Math.sin(angD*Math.PI/180);
  var q = numq("A surveyor maps two fields that share the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the length of \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.16,
    "Step 1 — the shared side, from \\(\\triangle ABC\\) (cosine law): \\(AC^2 = "+(AB*AB)+" + "+(BC*BC)+" - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Step 2 — use \\(AC\\) in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{AC}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(AC,2)+" \\times \\frac{\\sin "+angDAC+"^\\circ}{\\sin "+angD+"^\\circ} \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>. The first triangle exists to produce the side the second triangle needs.",{AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure = twoTriSVG(AB, BC, angB, AC, CD, AC*Math.sin(angACD*Math.PI/180)/Math.sin(angD*Math.PI/180), angDAC, angD);
  return q;
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 1 (Sine law and cosine law prerequisites), borrowed set.
   Provenance (host id: source entry in its home bank, the feeder
   indicators it assesses, verified by draw sweep):
   - u1-pk-label-sides: copied from math-1201 u7-label-sides, indicator 7.1
     (the only 7.1 entry in the feeder bank; no second source exists).
   - u1-pk-ratio-def: copied from math-1201 u7-ratio-def, indicator 7.2.
   - u1-pk-find-angle: copied from math-1201 u7-find-angle, indicator 7.3.
   - u1-pk-find-side: copied from math-1201 u7-find-side, indicator 7.4.
   - u1-pk-pythagoras: copied from math-1201 u7-pythagoras, indicators 7.5, 7.7.
   - u1-pk-solve-triangle: copied from math-1201 u7-solve-triangle, indicator 7.6
     (the only 7.6 entry in the feeder bank; no second source exists).
   - u1-pk-rope-angle: copied from math-1201 u7-rope-angle, indicators 7.3, 7.7.
   - u1-pk-ramp-run: copied from math-1201 u7-ramp-run, indicators 7.4, 7.5.
   The u7 helper family and balDp were copied into bank-helpers.js
   with the tranche. Indicator tags are support tags, not assessed
   targets: assessed targets are in pkSrc, the full dependent list
   in pkFor. */
E("u1-pk-label-sides", 1, ["7.1"], 1, "gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var marked=pick([X,Y]),other=(marked===X?Y:X);
  var hyp=u7side(X,Y),oppM=u7side(other,R),adjM=u7side(marked,R);
  var ask=pick(["hyp","opp","adj"]);
  function stmt(side1,role1,side2,role2){return side1+" is "+role1+", and "+side2+" is "+role2;}
  var key,ds,promptCore,solRole;
  if(ask==="hyp"){
    key=stmt(hyp,"the hypotenuse",oppM,"opposite angle "+marked);
    ds=[stmt(adjM,"the hypotenuse",oppM,"opposite angle "+marked),
        stmt(hyp,"the hypotenuse",adjM,"opposite angle "+marked),
        stmt(oppM,"the hypotenuse",hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the <b>hypotenuse</b>";
    solRole="The hypotenuse is the side opposite the right angle at "+R+", so it is <b>\\("+hyp+"\\)</b>.";
  }else if(ask==="opp"){
    key=stmt(oppM,"opposite angle "+marked,adjM,"adjacent to angle "+marked);
    ds=[stmt(adjM,"opposite angle "+marked,oppM,"adjacent to angle "+marked),
        stmt(hyp,"opposite angle "+marked,adjM,"adjacent to angle "+marked),
        stmt(oppM,"opposite angle "+marked,hyp,"adjacent to angle "+marked)];
    promptCore="correctly identifies the side <b>opposite</b> angle "+marked;
    solRole="The side opposite angle "+marked+" does not touch angle "+marked+"; it joins "+other+" and "+R+", so it is <b>\\("+oppM+"\\)</b>. The side adjacent to angle "+marked+" (other than the hypotenuse) is \\("+adjM+"\\).";
  }else{
    key=stmt(adjM,"adjacent to angle "+marked,oppM,"opposite angle "+marked);
    ds=[stmt(oppM,"adjacent to angle "+marked,adjM,"opposite angle "+marked),
        stmt(hyp,"adjacent to angle "+marked,oppM,"opposite angle "+marked),
        stmt(adjM,"adjacent to angle "+marked,hyp,"opposite angle "+marked)];
    promptCore="correctly identifies the side <b>adjacent</b> to angle "+marked;
    solRole="The side adjacent to angle "+marked+" forms that angle together with the hypotenuse; it joins "+marked+" and "+R+", so it is <b>\\("+adjM+"\\)</b>. The side opposite angle "+marked+" is \\("+oppM+"\\).";
  }
  var tri=X+Y+R;
  var prompt=pick([
    "Triangle "+tri+" is a right triangle with the right angle at "+R+". Angle "+marked+" is marked. Which statement "+promptCore+"?",
    "In right triangle "+tri+", the right angle is at "+R+" and angle "+marked+" is marked. Which statement "+promptCore+"?"
  ]);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var q=mcq(prompt,key,ds,
    "In triangle "+tri+" the right angle is at "+R+". "+solRole,
    {stmt:true,keyText:key,X:X,Y:Y,R:R,marked:marked,ask:ask});
  q.figure=triSVG(4,3,5,{L:[X,Y,R],ang:angLab,side:[Y+R,X+R,X+Y]});
  return q;
});
E("u1-pk-ratio-def", 1, ["7.2"], 1, "gen",function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,5);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den;
  if(fn==="sin"){num=opp;den=hyp;}else if(fn==="cos"){num=adj;den=hyp;}else{num=opp;den=adj;}
  var key="\\("+u7fracS(num,den)+"\\)";
  var all=[[opp,hyp],[adj,hyp],[opp,adj],[adj,opp],[hyp,opp],[hyp,adj]];
  var cands=[];
  all.forEach(function(pr){var s="\\("+u7fracS(pr[0],pr[1])+"\\)";if(s!==key)cands.push(s);});
  cands=shuffle(cands);
  var ds=u7pickS3(key,cands);
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var prompt="Triangle "+X+Y+R+" is a right triangle with the right angle at "+R+". Side "+X+R+" is \\("+legXR+"\\) "+unit+", side "+Y+R+" is \\("+legYR+"\\) "+unit+", and side "+X+Y+" is \\("+hyp+"\\) "+unit+". What is the value of \\(\\"+fn+" "+ang+"\\)?";
  var q=mcq(prompt,key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+": \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+(u7red(num,den)[1]===1?"":" \\\\ &= "+u7fracS(num,den))+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triSVG(legYR,legXR,hyp,{L:[X,Y,R],side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit]});
  return q;
});
E("u1-pk-find-angle", 1, ["7.2"], 1, "gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var rt=pick(["sin","cos","tan"]),num,den,sideText,ratioDisp,raw,tries=0;
  do{
    tries++;
    if(rt==="sin"){num=ri(4,30);den=num+ri(3,30);}
    else if(rt==="cos"){num=ri(4,30);den=num+ri(3,30);}
    else{num=ri(4,30);den=ri(4,30);}
    raw=(rt==="sin"?u7asinD(num/den):rt==="cos"?u7acosD(num/den):u7atanD(num/den));
  }while((raw<15||raw>75)&&tries<100);
  var ans=Math.round(raw);
  if(rt==="sin"){sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\sin "+V+" &= "+FR(num,den);}
  else if(rt==="cos"){sideText="the side adjacent to angle "+V+", "+adjName+", is \\("+num+"\\) cm and the hypotenuse, AB, is \\("+den+"\\) cm";
    ratioDisp="\\cos "+V+" &= "+FR(num,den);}
  else{sideText="the side opposite angle "+V+", "+oppName+", is \\("+num+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+den+"\\) cm";
    ratioDisp="\\tan "+V+" &= "+FR(num,den);}
  var inv=(rt==="sin"?"\\sin^{-1}":rt==="cos"?"\\cos^{-1}":"\\tan^{-1}");
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+sideText+". Give the measure of angle "+V+", in degrees, to the nearest degree.",
    ans,0.51,
    "Use the ratio that involves the two known sides, then undo it with the inverse ratio: \\[ \\begin{aligned} "+ratioDisp+" \\\\ "+V+" &= "+inv+"\\left("+FR(num,den)+"\\right) \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+V+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {V:V,rt:rt,num:num,den:den,ans:ans});
  var oppV,adjV,hypV;
  if(rt==="sin"){oppV=num;hypV=den;adjV=Math.sqrt(den*den-num*num);}
  else if(rt==="cos"){adjV=num;hypV=den;oppV=Math.sqrt(den*den-num*num);}
  else{oppV=num;adjV=den;hypV=Math.sqrt(num*num+den*den);}
  var sLab=[null,null,null];
  if(rt==="sin"){sLab[V==="A"?0:1]=num+" cm";sLab[2]=den+" cm";}
  else if(rt==="cos"){sLab[V==="A"?1:0]=num+" cm";sLab[2]=den+" cm";}
  else{sLab[V==="A"?0:1]=num+" cm";sLab[V==="A"?1:0]=den+" cm";}
  var aLab=[null,null,null];aLab[V==="A"?0:1]="?";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});
E("u1-pk-find-side", 1, ["7.2"], 1, "gen",function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"),adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES),mode=ri(1,4),given,targetName,givenText,raw,steps;
  if(mode===1){
    given=ri(12,48);targetName=oppName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7sinD(theta);
    steps="\\sin "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===2){
    given=ri(12,48);targetName=adjName;
    givenText="the hypotenuse, AB, is \\("+given+"\\) cm";
    raw=given*u7cosD(theta);
    steps="\\cos "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else if(mode===3){
    given=ri(8,40);targetName=oppName;theta=pick(U7_ANGLES.filter(function(a){return a>=25&&a<=60;}));
    givenText="the side adjacent to angle "+V+", "+adjName+", is \\("+given+"\\) cm";
    raw=given*u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR("x",given)+" \\\\ x &= "+given+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(raw);
  }else{
    given=ri(8,40);targetName=adjName;theta=pick(U7_ANGLES.filter(function(a){return a>=30&&a<=65;}));
    givenText="the side opposite angle "+V+", "+oppName+", is \\("+given+"\\) cm";
    raw=given/u7tanD(theta);
    steps="\\tan "+theta+"^\\circ &= "+FR(given,"x")+" \\\\ x &= "+FR(given,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(raw);
  }
  var ans=u7r1(raw);
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+givenText+". Find the length of side "+targetName+", in centimetres, to the nearest tenth.",
    ans,0.06,
    "Let \\(x\\) be the length of side "+targetName+". The known and unknown sides give this ratio at angle "+V+": \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] The length of side "+targetName+" is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV,adjV,hypV;
  if(mode===1){hypV=given;oppV=given*u7sinD(theta);adjV=given*u7cosD(theta);}
  else if(mode===2){hypV=given;adjV=given*u7cosD(theta);oppV=given*u7sinD(theta);}
  else if(mode===3){adjV=given;oppV=given*u7tanD(theta);hypV=given/u7cosD(theta);}
  else{oppV=given;adjV=given/u7tanD(theta);hypV=given/u7sinD(theta);}
  var oi=(V==="A"?0:1),ai=(V==="A"?1:0);
  var sLab=[null,null,null];
  sLab[(mode<=2)?2:(mode===3?ai:oi)]=given+" cm";
  sLab[(mode===1||mode===3)?oi:ai]="?";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab});
  return q;
});
E("u1-pk-pythagoras", 1, ["7.2"], 1, "gen",function(){
  var ctx=ri(1,11);
  var maxHyp=(ctx===1||ctx===6)?15:((ctx===8||ctx===11)?20:(ctx===3?30:(ctx===7?12:(ctx===2?60:150))));
  var scales=[0.5,1,1.5,2,2.5,3,4,5];
  var t=pick(U7_TRIPLES),k=pick(scales),trC=0;
  while(t[2]*k>maxHyp&&trC<200){t=pick(U7_TRIPLES);k=pick(scales);trC++;}
  var legA=t[0]*k,legB=t[1]*k,hyp=t[2]*k;
  if(pick([true,false])){var swp=legA;legA=legB;legB=swp;}
  var kind,prompt,solSteps,ans,known1,known2;
  if(ctx===1||ctx===6||ctx===8||ctx===11){
    kind="leg";var heightLeg=(ctx===1?legA:legB),otherLeg=(ctx===1?legB:legA);
    ans=otherLeg;known1=hyp;known2=heightLeg;
    if(ctx===1)prompt="A ladder \\("+hyp+"\\) m long leans against a vertical wall. The top of the ladder touches the wall \\("+heightLeg+"\\) m above the ground. How far, in metres, is the foot of the ladder from the wall?";
    else if(ctx===6)prompt="A ladder \\("+hyp+"\\) m long is placed with its foot \\("+heightLeg+"\\) m from the base of a vertical wall. How high, in metres, does the ladder reach up the wall?";
    else if(ctx===8)prompt="A staircase stringer \\("+hyp+"\\) m long rises \\("+heightLeg+"\\) m vertically from floor to landing. How long, in metres, is the horizontal run of the staircase?";
    else prompt="A loading ramp \\("+hyp+"\\) m long rises to a dock \\("+heightLeg+"\\) m above the ground. How far, in metres, does the foot of the ramp sit from the base of the dock?";
    solSteps="\\begin{aligned} x^2 + "+heightLeg+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+heightLeg+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===3){
    kind="leg";ans=legB;known1=hyp;known2=legA;
    prompt="A guy wire \\("+hyp+"\\) m long runs from the top of a vertical pole to a ground anchor. The wire is attached \\("+legA+"\\) m up the pole. How far, in metres, is the anchor from the base of the pole?";
    solSteps="\\begin{aligned} x^2 + "+legA+"^2 &= "+hyp+"^2 \\\\ x^2 &= "+hyp+"^2 - "+legA+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===2){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular garden plot measures \\("+legA+"\\) m by \\("+legB+"\\) m. How long, in metres, is a path that runs straight from one corner of the plot to the opposite corner?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===4){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular playing field is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A player runs in a straight line from one corner of the field to the diagonally opposite corner. How far, in metres, does the player run?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===9){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular building lot is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A survey line runs straight from one corner of the lot to the opposite corner. How long, in metres, is the survey line?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===10){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular meadow is \\("+legA+"\\) m long and \\("+legB+"\\) m wide. A hiker walks in a straight line from one corner of the meadow to the diagonally opposite corner. How far, in metres, does the hiker walk?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else if(ctx===7){
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A rectangular driveway gate is \\("+legA+"\\) m wide and \\("+legB+"\\) m tall. A brace runs straight from one corner of the gate to the opposite corner. How long, in metres, is the brace?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }else{
    kind="hyp";ans=hyp;known1=legA;known2=legB;
    prompt="A kite string is held so that the kite is directly above a point \\("+legA+"\\) m away from the flyer, at a height of \\("+legB+"\\) m above the flyer's hand. How long, in metres, is the straight section of string from the hand to the kite?";
    solSteps="\\begin{aligned} x^2 &= "+legA+"^2 + "+legB+"^2 \\\\ x^2 &= "+(ans*ans)+" \\\\ x &= "+ans+" \\end{aligned}";
  }
  var cands;
  if(kind==="leg")cands=[known1,known2,known1-known2,known1+known2,Math.abs(known2-2),ans+known2];
  else cands=[known1+known2,Math.abs(known1-known2),Math.max(known1,known2),known1+known2-1,Math.max(known1,known2)+1];
  var seenD={},ds=[];
  cands.forEach(function(c){if(ds.length<3&&typeof c==="number"&&isFinite(c)&&c>0&&c!==ans&&!seenD[c]){seenD[c]=1;ds.push(""+c);}});
  var pad=1;while(ds.length<3){var cc=ans+pad+2;pad++;if(!seenD[cc]){seenD[cc]=1;ds.push(""+cc);}}
  var q=mcq(prompt,""+ans,balDp(""+ans,ds),
    "The situation forms a right triangle, so the Pythagorean theorem applies. Let \\(x\\) be the length asked for: \\[ "+solSteps+" \\] The length is <b>\\("+ans+"\\) m</b>.",
    {kind:kind,x:known1,y:known2,ans:ans});
  if(ctx===2||ctx===4||ctx===7||ctx===9||ctx===10){
    q.figure=u7rectDiagSVG(legA,legB);
  }else if(ctx===5){
    q.figure=u7triSceneSVG({vert:legB,ground:legA,slant:hyp,vertLabel:legB+" m",groundLabel:legA+" m",slantLabel:"?",dashedVert:true});
  }else if(ctx===3){
    q.figure=u7triSceneSVG({vert:legA,ground:ans,slant:hyp,vertLabel:legA+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }else if(ctx===6){
    q.figure=u7triSceneSVG({vert:ans,ground:heightLeg,slant:hyp,vertLabel:"?",groundLabel:heightLeg+" m",slantLabel:hyp+" m"});
  }else{
    q.figure=u7triSceneSVG({vert:heightLeg,ground:ans,slant:hyp,vertLabel:heightLeg+" m",groundLabel:"?",slantLabel:hyp+" m"});
  }
  return q;
});
E("u1-pk-solve-triangle", 1, ["7.2"], 2, "gen",function(){
  var fam=ri(1,4),facts,tasks=[];
  var P={fam:fam};
  if(fam===1){
    var H=ri(14,50),theta=pick(U7_ANGLES);P.H=H;P.theta=theta;
    facts="the hypotenuse AB is \\("+H+"\\) cm and angle A is \\("+theta+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-theta,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+theta+"^\\circ \\\\ &= "+(90-theta)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-theta)+"^\\circ\\)</b>."},
      {f:"hSin",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(H*u7sinD(theta)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine with the hypotenuse: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR("BC",""+H)+" \\\\ BC &= "+H+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7sinD(theta))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(H*u7sinD(theta))+"\\) cm</b>."},
      {f:"hCos",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(H*u7cosD(theta)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine with the hypotenuse: \\[ \\begin{aligned} \\cos "+theta+"^\\circ &= "+FR("AC",""+H)+" \\\\ AC &= "+H+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(H*u7cosD(theta))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(H*u7cosD(theta))+"\\) cm</b>."}
    ];
  }else if(fam===2){
    var G2=ri(10,42),th2=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G2;P.theta=th2;
    facts="side AC, adjacent to angle A, is \\("+G2+"\\) cm and angle A is \\("+th2+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th2,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th2+"^\\circ \\\\ &= "+(90-th2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th2)+"^\\circ\\)</b>."},
      {f:"aTan",ask:"the length of side BC, in centimetres, to the nearest tenth",ans:u7r1(G2*u7tanD(th2)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent: \\[ \\begin{aligned} \\tan "+th2+"^\\circ &= "+FR("BC",""+G2)+" \\\\ BC &= "+G2+" \\times \\tan "+th2+"^\\circ \\\\ &\\approx "+u7f1(G2*u7tanD(th2))+" \\end{aligned} \\] The length of side BC is <b>\\("+u7f1(G2*u7tanD(th2))+"\\) cm</b>."},
      {f:"aHypCos",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G2/u7cosD(th2)),tol:0.06,
       sol:"Side AC is adjacent to angle A, so use cosine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\cos "+th2+"^\\circ &= "+FR(G2,"AB")+" \\\\ AB &= "+FR(G2,"\\cos "+th2+"^\\circ")+" \\\\ &\\approx "+u7f1(G2/u7cosD(th2))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G2/u7cosD(th2))+"\\) cm</b>."}
    ];
  }else if(fam===3){
    var G3=ri(10,42),th3=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));P.G=G3;P.theta=th3;
    facts="side BC, opposite angle A, is \\("+G3+"\\) cm and angle A is \\("+th3+"^\\circ\\)";
    tasks=[
      {f:"comp",ask:"the measure of angle B, in degrees, to the nearest degree",ans:90-th3,tol:0.51,
       sol:"The acute angles of a right triangle add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+th3+"^\\circ \\\\ &= "+(90-th3)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+(90-th3)+"^\\circ\\)</b>."},
      {f:"oAdjTan",ask:"the length of side AC, in centimetres, to the nearest tenth",ans:u7r1(G3/u7tanD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A and side AC is adjacent, so use tangent and rearrange: \\[ \\begin{aligned} \\tan "+th3+"^\\circ &= "+FR(G3,"AC")+" \\\\ AC &= "+FR(G3,"\\tan "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7tanD(th3))+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(G3/u7tanD(th3))+"\\) cm</b>."},
      {f:"oHypSin",ask:"the length of the hypotenuse AB, in centimetres, to the nearest tenth",ans:u7r1(G3/u7sinD(th3)),tol:0.06,
       sol:"Side BC is opposite angle A, so use sine and rearrange for the hypotenuse: \\[ \\begin{aligned} \\sin "+th3+"^\\circ &= "+FR(G3,"AB")+" \\\\ AB &= "+FR(G3,"\\sin "+th3+"^\\circ")+" \\\\ &\\approx "+u7f1(G3/u7sinD(th3))+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(G3/u7sinD(th3))+"\\) cm</b>."}
    ];
  }else{
    var t=pick(U7_TRIPLES),k=ri(1,4),aL=t[0]*k,bL=t[1]*k,cL=t[2]*k;
    var sub=pick(["legs","hypLeg"]);P.a=aL;P.b=bL;P.c=cL;P.sub=sub;
    if(sub==="legs"){
      facts="side BC is \\("+aL+"\\) cm and side AC is \\("+bL+"\\) cm";
      var angA=u7atanD(aL/bL);
      tasks=[
        {f:"pythHyp",ask:"the length of the hypotenuse AB, in centimetres",ans:cL,tol:0.001,
         sol:"Use the Pythagorean theorem with the two legs: \\[ \\begin{aligned} AB^2 &= "+aL+"^2 + "+bL+"^2 \\\\ AB^2 &= "+(cL*cL)+" \\\\ AB &= "+cL+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+cL+"\\) cm</b>."},
        {f:"invTanA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA),tol:0.51,
         sol:"Side BC is opposite angle A and side AC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan A &= "+FR(aL,bL)+" \\\\ A &= \\tan^{-1}\\left("+FR(aL,bL)+"\\right) \\\\ &\\approx "+Math.round(angA)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA)+"^\\circ\\)</b>."},
        {f:"invTanB",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA),tol:0.51,
         sol:"Side AC is opposite angle B and side BC is adjacent, so use inverse tangent: \\[ \\begin{aligned} \\tan B &= "+FR(bL,aL)+" \\\\ B &= \\tan^{-1}\\left("+FR(bL,aL)+"\\right) \\\\ &\\approx "+Math.round(90-angA)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA)+"^\\circ\\)</b>."}
      ];
    }else{
      facts="the hypotenuse AB is \\("+cL+"\\) cm and side BC is \\("+aL+"\\) cm";
      var angA2=u7asinD(aL/cL);
      tasks=[
        {f:"pythLeg",ask:"the length of side AC, in centimetres",ans:bL,tol:0.001,
         sol:"Use the Pythagorean theorem and rearrange for the missing leg: \\[ \\begin{aligned} AC^2 &= "+cL+"^2 - "+aL+"^2 \\\\ AC^2 &= "+(bL*bL)+" \\\\ AC &= "+bL+" \\end{aligned} \\] The length of side AC is <b>\\("+bL+"\\) cm</b>."},
        {f:"invSinA",ask:"the measure of angle A, in degrees, to the nearest degree",ans:Math.round(angA2),tol:0.51,
         sol:"Side BC is opposite angle A and AB is the hypotenuse, so use inverse sine: \\[ \\begin{aligned} \\sin A &= "+FR(aL,cL)+" \\\\ A &= \\sin^{-1}\\left("+FR(aL,cL)+"\\right) \\\\ &\\approx "+Math.round(angA2)+"^\\circ \\end{aligned} \\] The measure of angle A is <b>\\("+Math.round(angA2)+"^\\circ\\)</b>."},
        {f:"compFromA",ask:"the measure of angle B, in degrees, to the nearest degree",ans:Math.round(90-angA2),tol:0.51,
         sol:"First find angle A with inverse sine, since BC is opposite A: \\(A \\approx "+u7f1(angA2)+"^\\circ\\). The acute angles add to \\(90^\\circ\\): \\[ \\begin{aligned} B &= 90^\\circ - "+u7f1(angA2)+"^\\circ \\\\ &\\approx "+Math.round(90-angA2)+"^\\circ \\end{aligned} \\] The measure of angle B is <b>\\("+Math.round(90-angA2)+"^\\circ\\)</b>."}
      ];
    }
  }
  var task=pick(tasks);P.f=task.f;
  var fig;
  if(fam===1){
    var sL1=[null,null,H+" cm"],aL1=[theta+"°",null,null];
    if(task.f==="comp")aL1[1]="?";else if(task.f==="hSin")sL1[0]="?";else sL1[1]="?";
    fig=triSVG(H*u7sinD(theta),H*u7cosD(theta),H,{L:["A","B","C"],side:sL1,ang:aL1});
  }else if(fam===2){
    var sL2=[null,G2+" cm",null],aL2=[th2+"°",null,null];
    if(task.f==="comp")aL2[1]="?";else if(task.f==="aTan")sL2[0]="?";else sL2[2]="?";
    fig=triSVG(G2*u7tanD(th2),G2,G2/u7cosD(th2),{L:["A","B","C"],side:sL2,ang:aL2});
  }else if(fam===3){
    var sL3=[G3+" cm",null,null],aL3=[th3+"°",null,null];
    if(task.f==="comp")aL3[1]="?";else if(task.f==="oAdjTan")sL3[1]="?";else sL3[2]="?";
    fig=triSVG(G3,G3/u7tanD(th3),G3/u7sinD(th3),{L:["A","B","C"],side:sL3,ang:aL3});
  }else if(sub==="legs"){
    var sL4=[aL+" cm",bL+" cm",null],aL4=[null,null,null];
    if(task.f==="pythHyp")sL4[2]="?";else if(task.f==="invTanA")aL4[0]="?";else aL4[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL4,ang:aL4});
  }else{
    var sL5=[aL+" cm",null,cL+" cm"],aL5=[null,null,null];
    if(task.f==="pythLeg")sL5[1]="?";else if(task.f==="invSinA")aL5[0]="?";else aL5[1]="?";
    fig=triSVG(aL,bL,cL,{L:["A","B","C"],side:sL5,ang:aL5});
  }
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, "+facts+". Find "+task.ask+".",
    task.ans,task.tol,task.sol,P);
  q.figure=fig;
  return q;
});
E("u1-pk-rope-angle", 1, ["7.2"], 2, "var",varset([
  function(){return u7slantAngle("rope");},
  function(){return u7slantAngle("slide");},
  function(){return u7slantAngle("zip");},
  function(){return u7slantAngle("kite");}
]));
E("u1-pk-ramp-run", 1, ["7.2"], 2, "var",varset([
  function(){return u7riseRun("dock");},
  function(){return u7riseRun("belt");},
  function(){return u7riseRun("escalator");}
]));

/* ============ Enrichment build (November 17, 2026) ============
   89 new templates commissioned after the template-depth audit:
   16 dual-coded 7.1/7.2 (diagram representation; 7.1's first Level 2
   and Level 3 items), 23 for 7.2, 17 for 7.3, and 33 authored PK
   entries across the five groups (registered in PKT_U1 below with
   the Math 1201 outcome each one feeds). Diagram orientation follows
   Jason's November 17, 2026 rule: a good share of triangle figures
   are drawn slanted (triRotSVG / chainTriSVG / splitTriSVG with a
   rotation) so no side is horizontal, except where a horizontal side
   is intrinsic to the context. */
// CRMARKS: u1-ferry-distance=2
// CRMARKS: u1-sail-angle=2
// CRMARKS: u1-survey-baseline=2
// CRMARKS: u1-fence-angle=2
// CRMARKS: u1-orchard-tree=2
// CRMARKS: u1-lighthouse-bearing=2
// CRMARKS: u1-pipeline-angle=3
// CRMARKS: u1-panel-perimeter=3
// CRMARKS: u1-raft-crossing=2
// CRMARKS: u1-harbour-second-side=3
// CRMARKS: u1-rafter-span=2
// CRMARKS: u1-lock-gates=2
// CRMARKS: u1-meadow-angle=2
// CRMARKS: u1-regatta-choice=4
// CRMARKS: u1-perimeter-angles=3
// CRMARKS: u1-isosceles-span=2
// CRMARKS: u1-two-lamps=3
// CRMARKS: u1-scaffold-bay=3
// CRMARKS: u1-shared-side-intro=3
// CRMARKS: u1-kite-frame-chain=3
// CRMARKS: u1-river-chain=3
// CRMARKS: u1-headland-boats=3
// CRMARKS: u1-bisector-post=3
// CRMARKS: u1-truss-diagonal=3
// CRMARKS: u1-island-route=3
// CRMARKS: u1-drone-split=3
// CRMARKS: u1-race-course=3
// CRMARKS: u1-survey-network=4
// CRMARKS: u1-two-stage-height=4
// CRMARKS: u1-regatta-chain=4
// CRMARKS: u1-quad-perimeter=3
// CRMARKS: u1-offset-angle=3

// Math 2201 Unit 1 enrichment, batch A (November 17, 2026): dual-coded
// 7.1/7.2 entries giving indicator 7.1 real depth: diagram
// representation, diagram reading, first-step and plan structures.
// Fresh contexts and values throughout; solutions teach straight and
// bold the final answer.
E("u1-diagram-match",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("Two markers P and Q stand \\(46\\text{ m}\\) apart. From P, the angle between the line to Q and the line to a buoy R is \\(52^\\circ\\); from Q, the angle between the line to P and the line to the buoy is \\(63^\\circ\\). A diagram of \\(\\triangle PQR\\) is drawn to find the distance from P to the buoy. Which description matches the diagram?",
    "Angles of \\(52^\\circ\\) at P and \\(63^\\circ\\) at Q are marked known, the \\(46\\text{ m}\\) side between them is marked known, and the side from P to the buoy is marked ?",
    ["Angles of \\(52^\\circ\\) at P and \\(63^\\circ\\) at Q are marked known, the \\(46\\text{ m}\\) side between them is marked ?, and the side from P to the buoy is marked known",
     "Sides of \\(46\\text{ m}\\) from P to Q and \\(52\\text{ m}\\) from P to the buoy are marked known, the angle at Q is marked \\(63^\\circ\\), and the angle at R is marked ?",
     "The angle at R is marked \\(52^\\circ\\), the angle at P is marked \\(63^\\circ\\), the \\(46\\text{ m}\\) side is marked known, and the side from Q to the buoy is marked ?"],
    "A diagram marks exactly what the problem gives and labels the target as unknown. The problem gives two angles and the side between them, and asks for the side from P to the buoy, so the matching diagram is <b>the one that marks the \\(52^\\circ\\) and \\(63^\\circ\\) angles and the \\(46\\text{ m}\\) side as known, with the side from P to the buoy marked ?</b>.",
    {});},
  function(){return mcq("A triangular garden bed has sides of \\(8\\text{ m}\\) and \\(11\\text{ m}\\) that meet at a corner, with an angle of \\(74^\\circ\\) between them at that corner. A diagram is drawn to find the length of the third side. Which description matches the diagram?",
    "The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are marked known, the \\(74^\\circ\\) angle between them is marked known, and the third side is marked ?",
    ["The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are marked known, the \\(74^\\circ\\) angle opposite the \\(8\\text{ m}\\) side is marked known, and the third side is marked ?",
     "The \\(8\\text{ m}\\) side and the third side are marked known, the \\(74^\\circ\\) angle between them is marked known, and the \\(11\\text{ m}\\) side is marked ?",
     "The \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides are both marked ?, the \\(74^\\circ\\) angle between them is marked known, and the third side is marked known"],
    "The problem gives two sides and the angle between them, and asks for the remaining side. The matching diagram is <b>the one that marks the \\(8\\text{ m}\\) and \\(11\\text{ m}\\) sides and the \\(74^\\circ\\) angle between them as known, with the third side marked ?</b>.",
    {});},
  function(){return mcq("A triangular brace has sides of \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\). A diagram is drawn to find the angle opposite the \\(9\\text{ m}\\) side. Which description matches the diagram?",
    "All three sides, \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, no angle is marked known, and the angle opposite the \\(9\\text{ m}\\) side is marked ?",
    ["All three sides, \\(5\\text{ m}\\), \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, no angle is marked known, and the angle opposite the \\(5\\text{ m}\\) side is marked ?",
     "The \\(5\\text{ m}\\) and \\(7\\text{ m}\\) sides are marked known, the \\(9\\text{ m}\\) side is marked ?, and the angle opposite the \\(9\\text{ m}\\) side is marked known",
     "Two sides, \\(7\\text{ m}\\) and \\(9\\text{ m}\\), are marked known, the third side is marked ?, and the angle opposite the \\(9\\text{ m}\\) side is marked known"],
    "The problem gives all three sides and no angle, and asks for the angle across from the \\(9\\text{ m}\\) side. The matching diagram is <b>the one that marks all three sides as known, marks no angle as known, and puts the ? on the angle opposite the \\(9\\text{ m}\\) side</b>.",
    {});},
  function(){return mcq("In \\(\\triangle DEF\\), \\(\\angle D = 41^\\circ\\), side \\(d = 13\\text{ cm}\\) opposite \\(\\angle D\\), and side \\(e = 10\\text{ cm}\\). A diagram is drawn to find \\(\\angle E\\). Which description matches the diagram?",
    "Angle D is marked \\(41^\\circ\\) and the side opposite it is marked \\(13\\text{ cm}\\), side e is marked \\(10\\text{ cm}\\), and angle E is marked ?",
    ["Angle D is marked \\(41^\\circ\\) and the side next to it is marked \\(13\\text{ cm}\\), side e is marked \\(10\\text{ cm}\\), and angle E is marked ?",
     "Angle E is marked \\(41^\\circ\\) and the side opposite it is marked \\(10\\text{ cm}\\), side d is marked \\(13\\text{ cm}\\), and angle D is marked ?",
     "Angle D is marked \\(41^\\circ\\), side d is marked \\(13\\text{ cm}\\), side e is marked ?, and angle E is marked \\(10^\\circ\\)"],
    "Side d sits opposite angle D, so the \\(13\\text{ cm}\\) mark belongs on the side across from the \\(41^\\circ\\) angle, and the unknown is angle E. The matching diagram is <b>the one that marks angle D as \\(41^\\circ\\), the side opposite it as \\(13\\text{ cm}\\), side e as \\(10\\text{ cm}\\), and angle E as ?</b>.",
    {});}
]));
E("u1-diagram-unknown",1,["7.1","7.2"],1,"gen",function(){
  var frames=[
    {intro:"Three orienteering markers A, B and C form a triangle, with C the checkpoint marker.",
     key:"The straight-line distance between markers A and B",
     t1:"The straight-line distance between the checkpoint C and marker A",
     t2:"The straight-line distance between the checkpoint C and marker B",
     per:"The total distance around all three sides of the triangle"},
    {intro:"Three corners A, B and C of a triangular garden plot form a triangle, with C the corner by the gate.",
     key:"The straight-line distance between corners A and B of the plot",
     t1:"The straight-line distance between the gate corner C and corner A",
     t2:"The straight-line distance between the gate corner C and corner B",
     per:"The total distance around all three sides of the plot"},
    {intro:"Three survey posts A, B and C form a triangle, with C the post up on the hill.",
     key:"The straight-line distance between posts A and B",
     t1:"The straight-line distance between the hill post C and post A",
     t2:"The straight-line distance between the hill post C and post B",
     per:"The total distance around all three sides of the triangle"}
  ];
  var fr=pick(frames),a=0,b=0,C=0,c=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    a=ri(14,38);b=ri(14,38);C=ri(48,105);
    c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
    var os=[fr.key,fr.t1,fr.t2,fr.per];
    ok=isFinite(c)&&c>2&&os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(fr.intro+" The distance from C to A is \\("+b+"\\text{ m}\\), the distance from C to B is \\("+a+"\\text{ m}\\), and the angle at C between those two sides is \\("+C+"^\\circ\\). In the diagram the side AB is marked ?. What does the ? stand for?",
    fr.key,[fr.t1,fr.t2,fr.per],
    "The ? labels side AB, the side across from the marked angle at C. The two sides from C are already labelled \\("+a+"\\text{ m}\\) and \\("+b+"\\text{ m}\\), so the ? cannot stand for either of them, and it is a single side, not the total around the triangle. The ? stands for <b>"+fr.key+"</b>.",
    {frame:fr.key,a:a,b:b,C:C});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[null,null,C+"°"],side:[a+" m",b+" m","?"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-law-diagram-choice",1,["7.1","7.2"],1,"var",varset([
  function(){var A=48,B=63,C=180-A-B,c=18;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("The diagram marks angles of \\(48^\\circ\\) and \\(63^\\circ\\) and the \\(18\\text{ m}\\) side between them, with another side marked ?. Which law, applied to the marked information, finds the marked side?",
      "The sine law, because the third angle comes from the angle sum and the \\(18\\text{ m}\\) side then pairs with its opposite angle",
      ["The cosine law, because the third angle comes from the angle sum and the \\(18\\text{ m}\\) side then pairs with its opposite angle",
       "The cosine law, because two sides and the angle between them are marked, so the third side follows in one step",
       "The sine law, because any two marked angles are enough on their own to give a side length with no side marked"],
      "The third angle is \\(180^\\circ - 48^\\circ - 63^\\circ = 69^\\circ\\), and the \\(18\\text{ m}\\) side sits opposite it: a complete pair. The sine law then gives the marked side from \\(\\frac{x}{\\sin 48^\\circ} = \\frac{18}{\\sin 69^\\circ}\\). The law that finds the marked side is <b>the sine law</b>.",
      {});
    q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["48°","63°",null],side:["?",null,"18 m"]});
    return q;},
  function(){var A=57,b=14,c=9;
    var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    var q=mcq("The diagram marks sides of \\(14\\text{ m}\\) and \\(9\\text{ m}\\) and the \\(57^\\circ\\) angle between them, with the side opposite that angle marked ?. Which law, applied to the marked information, finds the marked side?",
      "The cosine law, because the marked angle sits between the two marked sides and the side opposite it is the unknown",
      ["The sine law, because the marked angle sits between the two marked sides and the side opposite it is the unknown",
       "The sine law, because a marked angle and the side opposite it form a complete pair ready to use in a proportion",
       "The cosine law, because all three sides are marked and any angle can be rearranged out of the three of them"],
      "The side opposite the \\(57^\\circ\\) angle is the unknown, so the sine law has no complete pair to start from. The cosine law uses exactly the marked information: \\(x^2 = 14^2 + 9^2 - 2(14)(9)\\cos 57^\\circ\\). The law that finds the marked side is <b>the cosine law</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["57°",null,null],side:["?","14 m","9 m"],rot:12});
    return q;},
  function(){var q=mcq("The diagram marks all three sides of a triangle, \\(8\\text{ cm}\\), \\(11\\text{ cm}\\) and \\(13\\text{ cm}\\), with the angle opposite the \\(13\\text{ cm}\\) side marked ?. Which law, applied to the marked information, finds the marked angle?",
      "The cosine law rearranged, because three sides are marked and no angle is marked, so an angle must come from the sides",
      ["The sine law, because three sides are marked and no angle is marked, so an angle must come from the sides alone",
       "The sine law, because the side opposite the marked angle is marked too, so a complete pair is ready to use",
       "The cosine law in side form, because two marked sides and their marked included angle give the third side directly"],
      "With no angle marked, the sine law cannot start. Rearranging the cosine law for the angle opposite the \\(13\\text{ cm}\\) side gives \\(\\cos C = \\frac{8^2 + 11^2 - 13^2}{2(8)(11)} \\approx 0.0909\\), so \\(C \\approx 85^\\circ\\). The law that finds the marked angle is <b>the cosine law rearranged</b>.",
      {});
    q.figure=triSVG(8,11,13,{L:["A","B","C"],ang:[null,null,"?"],side:["8 cm","11 cm","13 cm"]});
    return q;},
  function(){var A=38,a=10,b=14;
    var Bv=Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI,Cv=180-A-Bv;
    var cv=a*Math.sin(Cv*Math.PI/180)/Math.sin(A*Math.PI/180);
    var q=mcq("The diagram marks an angle of \\(38^\\circ\\), the \\(10\\text{ cm}\\) side opposite it, and another side of \\(14\\text{ cm}\\), with the angle opposite the \\(14\\text{ cm}\\) side marked ?. Which law, applied to the marked information, finds the marked angle?",
      "The sine law, because a marked angle and its opposite side form a pair, but the angle found may have a supplement that also fits",
      ["The cosine law, because a marked angle and its opposite side form a pair, but the angle found may have a supplement that also fits",
       "The sine law, because a marked angle and its opposite side form a pair, and the angle it returns is always the only one possible",
       "The cosine law, because two marked sides with any marked angle always give the remaining angle in one rearranged step"],
      "The \\(38^\\circ\\) angle and the \\(10\\text{ cm}\\) side opposite it form a complete pair, so \\(\\frac{\\sin B}{14} = \\frac{\\sin 38^\\circ}{10}\\) gives \\(\\sin B \\approx 0.862\\). That sine value belongs to \\(60^\\circ\\) and to its supplement \\(120^\\circ\\), and the diagram decides which one fits. The law that finds the marked angle is <b>the sine law, with the ambiguous-case caution</b>.",
      {});
    q.figure=triRotSVG(a,b,cv,{L:["A","B","C"],ang:["38°","?",null],side:["10 cm","14 cm",null],rot:-10});
    return q;}
]));
E("u1-pairing-diagram",1,["7.1","7.2"],1,"gen",function(){
  var sets=["ABC","DEF","PQR"];
  var n=pick(sets),L1=n.charAt(0),L2=n.charAt(1),L3=n.charAt(2);
  var l1=L1.toLowerCase(),l2=L2.toLowerCase(),l3=L3.toLowerCase();
  var A=0,B=0,C=0,a=0,key="",dS="",dC="",dT="",tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,60);B=ri(35,75);C=180-A-B;a=ri(8,20);
    if(C<25||C>85)continue;
    key="\\(\\frac{"+l2+"}{\\sin "+B+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\)";
    dS="\\(\\frac{"+l2+"}{\\sin "+A+"^\\circ} = \\frac{"+a+"}{\\sin "+B+"^\\circ}\\)";
    dC="\\("+l2+"^2 = "+l1+"^2 + "+l3+"^2 - 2"+l1+l3+"\\cos "+L2+"\\)";
    dT="\\(\\tan "+L2+" = \\frac{"+l2+"}{"+l1+"}\\)";
    var os=[key,dS,dC,dT];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  var c=a*Math.sin(C*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle "+n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), \\(\\angle "+L2+" = "+B+"^\\circ\\), and side \\("+l1+" = "+a+"\\text{ cm}\\) (opposite \\(\\angle "+L1+"\\)), as marked in the diagram. Which equation finds side \\("+l2+"\\)?",
    key,[dS,dC,dT],
    "The sine law pairs each side with the sine of its opposite angle: \\(\\frac{"+l2+"}{\\sin "+L2+"} = \\frac{"+l1+"}{\\sin "+L1+"}\\). Side \\("+l2+"\\) goes with \\(\\angle "+L2+" = "+B+"^\\circ\\) and the known side \\("+a+"\\text{ cm}\\) goes with \\(\\angle "+L1+" = "+A+"^\\circ\\), so the set-up is <b>"+key+"</b>. The cosine law would need the third side, and the tangent ratio belongs to right triangles.",
    {tri:n,A:A,B:B,a:a});
  q.figure=triRotSVG(a,b,c,{L:[L1,L2,L3],ang:[A+"°",B+"°",null],side:[a+" cm","?",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-diagram-givens",1,["7.1","7.2"],1,"var",varset([
  function(){var A=52,B=58,C=180-A-B,c=15;
    var a=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180),b=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Angles A and B are known, the side between them (side c) is \\(15\\text{ m}\\), and side a is marked unknown (?)",
      ["Angles A, B and C are all known, the side between A and B (side c) is \\(15\\text{ m}\\), and no side is left unknown",
       "Angles A and B are known, side c is \\(15\\text{ m}\\), and side a is also known from its mark on the diagram",
       "Angles A and B are known, and the \\(15\\text{ m}\\) side is the side opposite angle A, with no other side or angle given"],
      "The diagram marks two angles and one side as known and one side as unknown, and nothing else. Side c sits between angles A and B, so it is opposite angle C, not angle A. The exact list is <b>angles A and B known, side c equal to \\(15\\text{ m}\\), and side a marked unknown</b>.",
      {});
    q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["52°","58°",null],side:["?",null,"15 m"]});
    return q;},
  function(){var A=64,b=10,c=13;
    var a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the angle between them at A is \\(64^\\circ\\), and side a is marked unknown (?)",
      ["Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the angle between them at A is \\(64^\\circ\\), and angle B is known as well",
       "Sides a, b and c are all known, with side a read from its mark, and the angle between b and c at A is \\(64^\\circ\\)",
       "Sides b and c are known (\\(10\\text{ m}\\) and \\(13\\text{ m}\\)), the \\(64^\\circ\\) angle is opposite side b, and side a is marked unknown (?)"],
      "The diagram marks two sides and the angle between them as known, and the third side as unknown; no other angle carries a mark. The exact list is <b>sides b and c known, the \\(64^\\circ\\) angle between them at A, and side a marked unknown</b>.",
      {});
    q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["64°",null,null],side:["?","10 m","13 m"],rot:15});
    return q;},
  function(){var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), no angle is known, and angle B is marked unknown (?)",
      ["All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), angle A is known, and angle B is marked unknown (?)",
       "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), and angle B is known from the mark on the diagram",
       "All three sides are known (\\(7\\text{ cm}\\), \\(10\\text{ cm}\\) and \\(12\\text{ cm}\\)), no angle is known, and the angle opposite the \\(7\\text{ cm}\\) side is marked (?)"],
      "Every side carries a length and only one angle carries a mark, the unknown mark. Angle B sits opposite side b, the \\(10\\text{ cm}\\) side, not opposite the \\(7\\text{ cm}\\) side. The exact list is <b>all three sides known, no angle known, and angle B marked unknown</b>.",
      {});
    q.figure=triSVG(7,10,12,{L:["A","B","C"],ang:[null,"?",null],side:["7 cm","10 cm","12 cm"]});
    return q;},
  function(){var A=52,a=12,b=10;
    var Bv=Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI,Cv=180-A-Bv;
    var cv=a*Math.sin(Cv*Math.PI/180)/Math.sin(A*Math.PI/180);
    var q=mcq("Which statement lists exactly the information marked in the diagram?",
      "Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is marked unknown (?)",
      ["Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle C is known as well",
       "Angle A is known (\\(52^\\circ\\)), the side opposite it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is known from its mark",
       "Angle A is known (\\(52^\\circ\\)), the side next to it is \\(12\\text{ cm}\\), side b is \\(10\\text{ cm}\\), and angle B is marked unknown (?)"],
      "The diagram marks one angle, two sides and one unknown angle. The \\(12\\text{ cm}\\) side is side a, which sits across from angle A, not next to it. The exact list is <b>angle A known at \\(52^\\circ\\), the side opposite it \\(12\\text{ cm}\\), side b equal to \\(10\\text{ cm}\\), and angle B marked unknown</b>.",
      {});
    q.figure=triRotSVG(a,b,cv,{L:["A","B","C"],ang:["52°","?",null],side:["12 cm","10 cm",null],rot:-14});
    return q;}
]));
E("u1-angle-placement",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("A triangular sail has two edges of \\(4\\text{ m}\\) and \\(6\\text{ m}\\). The corner where those two edges meet measures \\(58^\\circ\\). In a labelled diagram of the sail, where does the \\(58^\\circ\\) angle sit?",
    "Between the \\(4\\text{ m}\\) side and the \\(6\\text{ m}\\) side, at the corner where they meet",
    ["Opposite the \\(4\\text{ m}\\) side, at the corner where the \\(6\\text{ m}\\) side and the third side meet",
     "Opposite the \\(6\\text{ m}\\) side, at the corner where the \\(4\\text{ m}\\) side and the third side meet",
     "Opposite the third side, at the corner where the third side and the \\(4\\text{ m}\\) side meet"],
    "The problem places the angle at the corner where the two named edges meet, so in the diagram it sits <b>between the \\(4\\text{ m}\\) side and the \\(6\\text{ m}\\) side</b>. An angle opposite a side sits at the one corner that side does not touch, which is a different corner for each side named.",
    {});},
  function(){return mcq("A triangular plot has a front boundary of \\(18\\text{ m}\\). At the back corner, across the plot from that front boundary, the angle measures \\(47^\\circ\\). One side boundary of the plot measures \\(13\\text{ m}\\). In a labelled diagram, where does the \\(47^\\circ\\) angle sit?",
    "Opposite the \\(18\\text{ m}\\) side, the first side named in the problem",
    ["Between the \\(18\\text{ m}\\) side and the \\(13\\text{ m}\\) side, at the corner where they meet",
     "Opposite the \\(13\\text{ m}\\) side, the second side named in the problem",
     "Opposite the third side, the side with no length given in the problem"],
    "The back corner is the one corner the front boundary does not touch, so the angle there faces the front boundary across the plot. In the diagram it sits <b>opposite the \\(18\\text{ m}\\) side, the first side named</b>. It is formed by the \\(13\\text{ m}\\) side and the third side, not by the two named sides together.",
    {});},
  function(){return mcq("A triangular kite frame has a spine of \\(30\\text{ cm}\\) and a cross spar of \\(42\\text{ cm}\\) joined to it. The angle across the frame from the cross spar measures \\(71^\\circ\\). In a labelled diagram, where does the \\(71^\\circ\\) angle sit?",
    "Opposite the \\(42\\text{ cm}\\) side, the second side named in the problem",
    ["Between the \\(30\\text{ cm}\\) side and the \\(42\\text{ cm}\\) side, at the corner where they meet",
     "Opposite the \\(30\\text{ cm}\\) side, the first side named in the problem",
     "Opposite the third side, the side with no length given in the problem"],
    "An angle described as across the frame from a side sits at the corner that side does not touch, facing that side. In the diagram it sits <b>opposite the \\(42\\text{ cm}\\) side, the second side named</b>. That corner is where the spine and the third side meet, so the angle is not between the two named sides.",
    {});},
  function(){return mcq("Two roads leave a junction in different directions: one runs \\(7\\text{ km}\\) to a first village and the other runs \\(9\\text{ km}\\) to a second village. The direct distance between the two villages has not been measured. The angle at the junction is \\(63^\\circ\\). In a labelled diagram, where does the \\(63^\\circ\\) angle sit relative to the side with no length given?",
    "Opposite the side with no length given, across the triangle from it",
    ["Between the \\(7\\text{ km}\\) side and the \\(9\\text{ km}\\) side, at the corner on the unmeasured side",
     "Opposite the \\(7\\text{ km}\\) side, the first side named in the problem",
     "Opposite the \\(9\\text{ km}\\) side, the second side named in the problem"],
    "The junction is the corner the unmeasured side does not touch: the unmeasured side joins the two villages, and the junction angle faces it across the triangle. In the diagram the \\(63^\\circ\\) angle sits <b>opposite the side with no length given</b>.",
    {});}
]));
E("u1-diagram-first-step",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("Two observation posts P and Q are \\(60\\text{ m}\\) apart. In the triangle formed with a fire tower T, the angle at P is \\(48^\\circ\\) and the angle at Q is \\(67^\\circ\\). Let x be the distance from P to the tower. Which equation is the correct first step?",
    "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 65^\\circ}\\)",
    ["\\(\\frac{x}{\\sin 65^\\circ} = \\frac{60}{\\sin 67^\\circ}\\)",
     "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 48^\\circ}\\)",
     "\\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 115^\\circ}\\)"],
    "The third angle is \\(180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ\\), and the \\(60\\text{ m}\\) baseline sits opposite it. Side x sits opposite the \\(67^\\circ\\) angle, so the sine law pairs them as \\(\\frac{x}{\\sin 67^\\circ} = \\frac{60}{\\sin 65^\\circ}\\), giving \\(x \\approx \\)<b>\\(60.9\\text{ m}\\)</b>. The \\(115^\\circ\\) option adds the two given angles instead of subtracting them from \\(180^\\circ\\).",
    {});},
  function(){return mcq("Two straight roads leave a junction, one running \\(120\\text{ m}\\) to a store and the other \\(85\\text{ m}\\) to a school, with an angle of \\(96^\\circ\\) between the roads at the junction. Let x be the direct distance from the store to the school. Which equation is the correct first step?",
    "\\(x^2 = 120^2 + 85^2 - 2(120)(85)\\cos 96^\\circ\\)",
    ["\\(x^2 = 120^2 + 85^2 + 2(120)(85)\\cos 96^\\circ\\)",
     "\\(x^2 = 120^2 + 85^2 - 2(120)(85)\\sin 96^\\circ\\)",
     "\\(\\frac{x}{\\sin 96^\\circ} = \\frac{120}{\\sin 85^\\circ}\\)"],
    "The two roads and the direct distance form a triangle with the \\(96^\\circ\\) angle included between the \\(120\\text{ m}\\) and \\(85\\text{ m}\\) sides, so the cosine law applies with a minus sign: \\(x^2 = 120^2 + 85^2 - 2(120)(85)\\cos 96^\\circ \\approx 23757\\), giving \\(x \\approx \\)<b>\\(154.1\\text{ m}\\)</b>. The sine law has no complete pair here, and \\(85\\text{ m}\\) is a length, not an angle.",
    {});},
  function(){return mcq("A triangular frame has sides of \\(10\\text{ m}\\), \\(12\\text{ m}\\) and \\(14\\text{ m}\\). Let X be the angle opposite the \\(14\\text{ m}\\) side. Which equation is the correct first step?",
    "\\(\\cos X = \\frac{10^2 + 12^2 - 14^2}{2(10)(12)}\\)",
    ["\\(\\cos X = \\frac{10^2 + 12^2 + 14^2}{2(10)(12)}\\)",
     "\\(\\cos X = \\frac{10^2 + 14^2 - 12^2}{2(10)(14)}\\)",
     "\\(\\frac{\\sin X}{14} = \\frac{\\sin 90^\\circ}{12}\\)"],
    "The cosine law rearranged puts the side opposite the wanted angle alone at the end of the numerator: \\(\\cos X = \\frac{10^2 + 12^2 - 14^2}{2(10)(12)} = \\frac{48}{240} = 0.2\\), so \\(X \\approx \\)<b>\\(78.5^\\circ\\)</b>. The second option would find the angle opposite the \\(12\\text{ m}\\) side instead, and no angle in this triangle is \\(90^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 39^\\circ\\), side \\(a = 8\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 11\\text{ cm}\\). The triangle is acute. Which equation is the correct first step to find \\(\\angle B\\)?",
    "\\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{8}\\)",
    ["\\(\\frac{\\sin B}{8} = \\frac{\\sin 39^\\circ}{11}\\)",
     "\\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{11}\\)",
     "\\(11^2 = 8^2 + c^2 + 2(8)(c)\\cos 39^\\circ\\)"],
    "The sine law pairs side b with angle B and side a with angle A: \\(\\frac{\\sin B}{11} = \\frac{\\sin 39^\\circ}{8}\\), so \\(\\sin B = \\frac{11 \\sin 39^\\circ}{8} \\approx 0.865\\) and \\(\\angle B \\approx \\)<b>\\(59.9^\\circ\\)</b> for the acute triangle described. The cosine-law option carries a plus sign and involves the unknown side c, so it cannot start the problem.",
    {});}
]));
E("u1-diagram-two-unknowns",1,["7.1","7.2"],2,"gen",function(){
  var mode=pick(["ASA","SAS"]),tries=0,ok=false;
  var A=0,B=0,C=0,c=0,b=0,key="",dR="",dW="",dU="",q=null;
  while(!ok&&tries<400){tries++;
    if(mode==="ASA"){
      A=ri(35,58);B=ri(35,58);C=180-A-B;c=ri(12,32);
      if(C<35||C>80)continue;
      key="First find \\(\\angle C\\) with the angle sum, then use the sine law with side \\(c\\) and its opposite angle to find side \\(a\\)";
      dR="First use the sine law with side \\(c\\) to find side \\(a\\), then find \\(\\angle C\\) with the angle sum at the end";
      dW="First find \\(\\angle C\\) with the angle sum, then use the cosine law with side \\(c\\) to find side \\(a\\)";
      dU="First find side \\(b\\), which is not marked, then use the angle sum for \\(\\angle C\\) and the sine law for side \\(a\\)";
    }else{
      b=ri(9,24);c=ri(9,24);A=ri(45,95);
      key="First use the cosine law with sides \\(b\\) and \\(c\\) and the included \\(\\angle A\\) to find side \\(a\\), then use the sine law to find \\(\\angle B\\)";
      dR="First use the sine law to find \\(\\angle B\\), then use the cosine law with sides \\(b\\) and \\(c\\) to find side \\(a\\)";
      dW="First use the sine law with sides \\(b\\) and \\(c\\) and the included \\(\\angle A\\) to find side \\(a\\), then use the cosine law to find \\(\\angle B\\)";
      dU="First find \\(\\angle C\\), which is not marked, with the angle sum, then use the cosine law for side \\(a\\) and the sine law for \\(\\angle B\\)";
    }
    var os=[key,dR,dW,dU];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  if(mode==="ASA"){
    var a2=c*Math.sin(A*Math.PI/180)/Math.sin(C*Math.PI/180);
    var b2=c*Math.sin(B*Math.PI/180)/Math.sin(C*Math.PI/180);
    q=mcq("In the diagram of \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\) and side \\(c = "+c+"\\text{ m}\\). Side \\(a\\) and \\(\\angle C\\) are both marked ?. Which plan finds both marked unknowns, in a workable order?",
      key,[dR,dW,dU],
      "Side c sits opposite angle C, which is still unknown, so the sine law has no complete pair until the angle sum supplies \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The cosine law cannot work from a single side. The workable order is <b>angle sum first, then the sine law</b>.",
      {mode:mode,A:A,B:B,C:C,c:c});
    q.figure=triRotSVG(a2,b2,c,{L:["A","B","C"],ang:[A+"°",B+"°","?"],side:["?",null,c+" m"],rot:pick([9,12,15,-10,-14])});
  }else{
    var a3=Math.sqrt(b*b+c*c-2*b*c*Math.cos(A*Math.PI/180));
    q=mcq("In the diagram of \\(\\triangle ABC\\), sides \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\) meet at \\(\\angle A = "+A+"^\\circ\\). Side \\(a\\) and \\(\\angle B\\) are both marked ?. Which plan finds both marked unknowns, in a workable order?",
      key,[dR,dW,dU],
      "The side opposite the known angle A is itself unknown, so the sine law has no complete pair at the start, and the angle sum cannot run with only one known angle. The cosine law first gives side a from the two known sides and their included angle, and then a complete pair exists for the sine law. The workable order is <b>cosine law for the marked side first, then the sine law for the marked angle</b>.",
      {mode:mode,b:b,c:c,A:A});
    q.figure=triRotSVG(a3,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:["?",""+b+" m",""+c+" m"],rot:pick([9,12,15,-10,-14])});
  }
  return q;
});
E("u1-mislabeled-diagram",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 46^\\circ\\), side \\(a = 12\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 9\\text{ cm}\\). The task is to find \\(\\angle B\\). A student's diagram shows \\(\\angle A\\) marked \\(46^\\circ\\) at vertex A, the side opposite \\(\\angle B\\) labelled \\(12\\text{ cm}\\), the side opposite \\(\\angle A\\) labelled \\(9\\text{ cm}\\), and \\(\\angle B\\) marked ?. What is the one error in the student's diagram?",
    "The \\(12\\text{ cm}\\) length is marked on the side opposite angle B instead of the side opposite angle A",
    ["The interior angle at A is marked as \\(134^\\circ\\), the supplement of \\(46^\\circ\\), instead of \\(46^\\circ\\) itself",
     "Side b is marked with the unknown symbol ? instead of its given length of \\(9\\text{ cm}\\)",
     "The \\(46^\\circ\\) angle is marked at vertex C instead of at vertex A, where it belongs in the triangle"],
    "Check each mark against the problem: angle A and its position are right, side b carries its given length, and angle B is the unknown. The side lengths are the problem: side a, opposite angle A, should carry \\(12\\text{ cm}\\), but the diagram puts it across from B. The one error is <b>the \\(12\\text{ cm}\\) length marked on the side opposite angle B instead of the side opposite angle A</b>.",
    {});},
  function(){return mcq("In \\(\\triangle PQR\\), the sides from vertex P measure \\(10\\text{ m}\\) and \\(15\\text{ m}\\), and the angle between them at P is \\(68^\\circ\\). The task is to find the side opposite P. A student's diagram labels the two sides from P as \\(10\\text{ m}\\) and \\(15\\text{ m}\\) and the side opposite P as ?, but marks the \\(68^\\circ\\) angle at vertex Q, between the \\(15\\text{ m}\\) side and the side marked ?. What is the one error in the student's diagram?",
    "The \\(68^\\circ\\) angle is marked at vertex Q instead of at vertex P, where the two given sides meet",
    ["The \\(15\\text{ m}\\) length is marked on the side opposite vertex P instead of on a side from vertex P",
     "The interior angle is marked as \\(112^\\circ\\), the supplement of \\(68^\\circ\\), instead of \\(68^\\circ\\) itself",
     "The side opposite P is labelled \\(15\\text{ m}\\) instead of being marked as the unknown with a ?"],
    "The side labels all match the problem, and the unknown is marked correctly. The angle does not: the problem puts the \\(68^\\circ\\) angle at P, between the two sides that meet there, while the diagram puts it at Q. The one error is <b>the \\(68^\\circ\\) angle marked at vertex Q instead of at vertex P</b>.",
    {});},
  function(){return mcq("A triangular frame has two sides of \\(16\\text{ m}\\) and \\(21\\text{ m}\\) with a \\(59^\\circ\\) angle between them. The task is to find the third side. A student's diagram marks the \\(59^\\circ\\) angle between the two known sides and labels one of those sides \\(16\\text{ m}\\), but it marks the \\(21\\text{ m}\\) side with a ? and labels the third side as \\(21\\text{ m}\\). What is the one error in the student's diagram?",
    "The \\(21\\text{ m}\\) side is marked ? and the third side is labelled \\(21\\text{ m}\\), so a given length and the unknown have been swapped",
    ["The \\(59^\\circ\\) angle is marked opposite the \\(16\\text{ m}\\) side instead of between the two known sides of the frame",
     "The interior angle is marked as \\(121^\\circ\\), the supplement of \\(59^\\circ\\), instead of \\(59^\\circ\\) itself",
     "The \\(16\\text{ m}\\) length is marked on the third side instead of on one of the two known sides of the frame"],
    "The angle sits correctly between the known sides and the \\(16\\text{ m}\\) label is on a known side. The remaining marks trade places: a side the problem gives as \\(21\\text{ m}\\) carries the unknown mark, and the side to be found carries that length. The one error is <b>the given \\(21\\text{ m}\\) length and the unknown mark swapped between the two sides</b>.",
    {});},
  function(){return mcq("A triangular plot has its corner at B on a straight boundary line that continues past the plot. The angle outside the plot at B, between the extended boundary and one side of the plot, is \\(64^\\circ\\). The sides from B measure \\(18\\text{ m}\\) and \\(25\\text{ m}\\). The task is to find the side opposite B, which needs the interior angle at B. A student's diagram labels the sides from B as \\(18\\text{ m}\\) and \\(25\\text{ m}\\), marks the side opposite B as ?, and marks the interior angle at B as \\(64^\\circ\\). What is the one error in the student's diagram?",
    "The interior angle at B is marked \\(64^\\circ\\), but that is the outside angle on the straight line; the interior angle is \\(116^\\circ\\)",
    ["The \\(25\\text{ m}\\) length is marked on the side opposite B instead of on one of the sides that starts at B",
     "The \\(64^\\circ\\) angle is marked at the wrong vertex, at the far end of the \\(18\\text{ m}\\) side instead of at B",
     "The side opposite B is labelled with a length instead of being marked as the unknown with a ?"],
    "The side labels and the unknown mark all match the problem, and the angle is at the right vertex. Its value is the problem: the \\(64^\\circ\\) angle lies outside the plot on a straight line, so the interior angle is its supplement, \\(180^\\circ - 64^\\circ = 116^\\circ\\). The one error is <b>the interior angle at B marked as \\(64^\\circ\\) instead of \\(116^\\circ\\)</b>.",
    {});}
]));
E("u1-diagram-ambiguous-fit",1,["7.1","7.2"],2,"gen",function(){
  var A=0,b=0,a=0,tB=0,fit=0,oth=0,asinD=0,C=0,obtuse=false,fo=0,oo=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,50);b=ri(12,30);obtuse=Math.random()<0.5;
    tB=obtuse?ri(100,130):ri(55,80);
    a=Math.round(b*Math.sin(A*Math.PI/180)/Math.sin(tB*Math.PI/180)*10)/10;
    if(a<=0)continue;
    var s=b*Math.sin(A*Math.PI/180)/a;
    if(s>=1||s<=0)continue;
    asinD=Math.asin(s)*180/Math.PI;
    fit=obtuse?(180-asinD):asinD;
    oth=obtuse?asinD:(180-asinD);
    if(Math.abs(fit-tB)>4)continue;
    C=180-A-fit;
    if(C<15||C>95)continue;
    fo=Math.round(fit);oo=Math.round(oth);d3=fo+A;
    var os=[""+fo,""+oo,""+d3,"90"];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4&&d3<176&&fo>=40&&fo<=140;
  }
  var cval=a*Math.sin(C*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), side \\(a = "+fmt(a,1)+"\\text{ cm}\\) (opposite \\(\\angle A\\)) and side \\(b = "+b+"\\text{ cm}\\). The diagram shows the one triangle that fits these measurements, with \\(\\angle B\\) marked ?. What is \\(\\angle B\\), in degrees?",
    ""+fo,[""+oo,""+d3,"90"],
    "Sine law: \\(\\sin B = \\frac{b \\sin A}{a} = \\frac{"+b+" \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(A*Math.PI/180)/a,3)+"\\). The inverse sine gives \\("+fmt(asinD,1)+"^\\circ\\), and its supplement is \\("+fmt(180-asinD,1)+"^\\circ\\); both have the same sine. In the diagram, angle B is "+(obtuse?"obtuse, wider than a right angle":"acute, narrower than a right angle")+", so \\(\\angle B \\approx \\)<b>\\("+fo+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,B:fo});
  q.figure=triRotSVG(a,b,cval,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" cm",""+b+" cm",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-sketch-values",1,["7.1","7.2"],2,"gen",function(){
  var mode=pick(["SAS","ASA"]),tries=0,ok=false;
  var p=0,qq=0,G=0,G1=0,G2=0,C=0,s=0,unit="m",frame="",key="",t1="",t2="",t3="",sol="",fig=null;
  while(!ok&&tries<400){tries++;
    if(mode==="SAS"){
      p=ri(7,20);qq=ri(7,20);G=pick([48,55,63,72,84,96]);
      if(p===qq)continue;
      var fr1=pick([
        {u:"m",f:"A triangular garden plot has two fences of "+p+" m and "+qq+" m that meet at one corner of the plot. The angle at that corner is "+G+"°."},
        {u:"cm",f:"A triangular kite has two outer edges of "+p+" cm and "+qq+" cm that meet at the top corner. The angle at that corner is "+G+"°."}
      ]);
      unit=fr1.u;frame=fr1.f;
      key="The "+p+" "+unit+" side and the "+qq+" "+unit+" side meet at the "+G+"° angle, and the side opposite that angle has no length given";
      t1="The "+p+" "+unit+" side sits opposite the "+G+"° angle, and the "+qq+" "+unit+" side forms that angle with the side of no given length";
      t2="The "+qq+" "+unit+" side sits opposite the "+G+"° angle, and the "+p+" "+unit+" side forms that angle with the side of no given length";
      t3="The "+G+"° angle sits between the "+p+" "+unit+" side and the side with no length given, and the "+qq+" "+unit+" side sits opposite that angle";
      sol="The two given sides meet at the corner, so the given angle sits between them, and the side across from that angle is the one with no measurement in the problem. The assignment is <b>the "+p+" "+unit+" and "+qq+" "+unit+" sides forming the "+G+"° angle, with the opposite side unmeasured</b>.";
      var av=Math.sqrt(p*p+qq*qq-2*p*qq*Math.cos(G*Math.PI/180));
      fig=triRotSVG(av,p,qq,{L:["A","B","C"],ang:[null,null,null],side:[null,null,null],rot:pick([9,12,15,-10,-14])});
    }else{
      G1=ri(35,65);G2=ri(35,65);C=180-G1-G2;s=ri(15,60);
      if(G1===G2||C<30||C>90)continue;
      frame=pick([
        "Two birdwatching posts stand "+s+" m apart. From one post, the angle between the line to the other post and the line to a nest is "+G1+"°; from the other post, the corresponding angle is "+G2+"°.",
        "Two lifeguard chairs stand "+s+" m apart along a beach. From one chair, the angle between the line to the other chair and the line to a swimmer is "+G1+"°; from the other chair, the corresponding angle is "+G2+"°."
      ]);
      key="The "+s+" m side sits between the "+G1+"° angle and the "+G2+"° angle, and the third angle has no measure given";
      t1="The "+s+" m side sits opposite the "+G1+"° angle, and the "+G2+"° angle stands at one end of that side";
      t2="The "+s+" m side sits opposite the "+G2+"° angle, and the "+G1+"° angle stands at one end of that side";
      t3="The "+s+" m side sits between the "+G1+"° angle and the third angle, and the "+G2+"° angle sits opposite that side";
      sol="The measured distance joins the two posts, so in the sketch it is the side with one given angle at each end; the angle at the far object is the one with no measure in the problem. The assignment is <b>the "+s+" m side between the "+G1+"° and "+G2+"° angles, with the third angle unmeasured</b>.";
      var aA=s*Math.sin(G1*Math.PI/180)/Math.sin(C*Math.PI/180);
      var bB=s*Math.sin(G2*Math.PI/180)/Math.sin(C*Math.PI/180);
      fig=triRotSVG(aA,bB,s,{L:["A","B","C"],ang:[null,null,null],side:[null,null,null],rot:pick([9,12,15,-10,-14])});
    }
    var os=[key,t1,t2,t3];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(frame+" A student sketches the triangle and has to place the three given numbers on it. Which statement assigns the three given numbers to the right positions in the sketch?",
    key,[t1,t2,t3],sol,
    mode==="SAS"?{mode:mode,p:p,q:qq,G:G}:{mode:mode,G1:G1,G2:G2,s:s});
  q.figure=fig;
  return q;
});
E("u1-diagram-supplement",1,["7.1","7.2"],2,"var",varset([
  function(){return mcq("Two observers at P and Q are \\(80\\text{ m}\\) apart along a straight shoreline, and a boat R floats offshore. Inside the triangle, the angle at P is \\(41^\\circ\\). At Q, the shoreline continues straight past Q, and the angle between that extension and the line from Q to the boat is \\(64^\\circ\\). Which first step is correct for finding the distance from Q to the boat?",
    "Use \\(180^\\circ - 64^\\circ = 116^\\circ\\) as the angle at Q inside the triangle, then apply the sine law",
    ["Use the given \\(64^\\circ\\) directly as the angle at Q inside the triangle, then apply the sine law",
     "Use \\(180^\\circ - 64^\\circ = 116^\\circ\\) as the angle at Q inside the triangle, then apply the cosine law",
     "Use the given \\(64^\\circ\\) directly as the angle at Q inside the triangle, then apply the cosine law"],
    "The \\(64^\\circ\\) angle sits outside the triangle on a straight line, so the interior angle at Q is its supplement: \\(180^\\circ - 64^\\circ = 116^\\circ\\). The third angle is then \\(180^\\circ - 41^\\circ - 116^\\circ = 23^\\circ\\), and the sine law gives \\(QR = \\frac{80 \\sin 41^\\circ}{\\sin 23^\\circ} \\approx \\)<b>\\(134.3\\text{ m}\\)</b>. Only one side is known, so the cosine law cannot be the first step.",
    {});},
  function(){return mcq("A straight fence line runs through corner B of a triangular plot and continues past it. Inside the plot, the two sides from B measure \\(30\\text{ m}\\) and \\(44\\text{ m}\\). The angle outside the plot at B, between the extended fence line and one side of the plot, is \\(58^\\circ\\). Which first step is correct for finding the side opposite B?",
    "Use \\(180^\\circ - 58^\\circ = 122^\\circ\\) as the angle at B inside the triangle, then apply the cosine law",
    ["Use the given \\(58^\\circ\\) directly as the angle at B inside the triangle, then apply the cosine law",
     "Use \\(180^\\circ - 58^\\circ = 122^\\circ\\) as the angle at B inside the triangle, then apply the sine law",
     "Use the given \\(58^\\circ\\) directly as the angle at B inside the triangle, then apply the sine law"],
    "The \\(58^\\circ\\) angle is outside the plot on a straight line, so the interior angle at B is \\(180^\\circ - 58^\\circ = 122^\\circ\\). That angle sits between the two known sides, so the cosine law applies: \\(x^2 = 30^2 + 44^2 - 2(30)(44)\\cos 122^\\circ \\approx 4235\\), giving \\(x \\approx \\)<b>\\(65.1\\text{ m}\\)</b>. The sine law has no complete pair to start from.",
    {});},
  function(){return mcq("A hiking trail runs \\(280\\text{ m}\\) from a trailhead A to a junction B, then \\(350\\text{ m}\\) from B to a lookout C. At B the trail bends: the angle between the straight-ahead extension of the first leg past B and the second leg is \\(71^\\circ\\). Which first step is correct for finding the straight-line distance from A to C?",
    "Use \\(180^\\circ - 71^\\circ = 109^\\circ\\) as the angle at B inside the triangle, then apply the cosine law",
    ["Use the given \\(71^\\circ\\) directly as the angle at B inside the triangle, then apply the cosine law",
     "Use \\(180^\\circ - 71^\\circ = 109^\\circ\\) as the angle at B inside the triangle, then apply the sine law",
     "Use the given \\(71^\\circ\\) directly as the angle at B inside the triangle, then apply the sine law"],
    "The bend is measured from the straight-ahead extension, outside the triangle, so the interior angle at B is \\(180^\\circ - 71^\\circ = 109^\\circ\\). It sits between the two known legs, so the cosine law applies: \\(d^2 = 280^2 + 350^2 - 2(280)(350)\\cos 109^\\circ \\approx 264711\\), giving \\(d \\approx \\)<b>\\(514.5\\text{ m}\\)</b>.",
    {});},
  function(){return mcq("Two points M and N are \\(95\\text{ m}\\) apart on a straight road, and a tower T stands off the road. Inside the triangle, the angle at M is \\(38^\\circ\\). At N, the road continues straight past N, and the angle between that extension and the line from N to the tower is \\(67^\\circ\\). Which first step is correct for finding the distance from N to the tower?",
    "Use \\(180^\\circ - 67^\\circ = 113^\\circ\\) as the angle at N inside the triangle, then apply the sine law",
    ["Use the given \\(67^\\circ\\) directly as the angle at N inside the triangle, then apply the sine law",
     "Use \\(180^\\circ - 67^\\circ = 113^\\circ\\) as the angle at N inside the triangle, then apply the cosine law",
     "Use the given \\(67^\\circ\\) directly as the angle at N inside the triangle, then apply the cosine law"],
    "The \\(67^\\circ\\) angle is outside the triangle on the straight road, so the interior angle at N is \\(180^\\circ - 67^\\circ = 113^\\circ\\). The third angle is \\(180^\\circ - 38^\\circ - 113^\\circ = 29^\\circ\\), and the sine law gives \\(NT = \\frac{95 \\sin 38^\\circ}{\\sin 29^\\circ} \\approx \\)<b>\\(120.6\\text{ m}\\)</b>. Only one side is known, so the cosine law cannot start.",
    {});}
]));
E("u1-diagram-chain-setup",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("Two triangular fields share a fence line AC. In the first field, \\(\\triangle ABC\\), the outside fences are \\(AB = 90\\text{ m}\\) and \\(BC = 70\\text{ m}\\) with the angle at B equal to \\(80^\\circ\\). In the second field, \\(\\triangle ACD\\), the angles at A and D are \\(55^\\circ\\) and \\(65^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first triangle, find it with the cosine law from the \\(90\\text{ m}\\) and \\(70\\text{ m}\\) sides and their included angle, then work in the second triangle",
    ["Start in the second triangle and find AC from its two given angles first, then carry AC back into the first triangle to finish the problem",
     "Draw the two fields as one big triangle with A and D as its far corners, and apply the cosine law once to the outside fences to get CD",
     "Draw AC as the unknown in the first triangle, but find it with the sine law, pairing the \\(90\\text{ m}\\) side with the \\(80^\\circ\\) angle as opposite sides"],
    "The second triangle has no known side, so nothing there can be found until AC is known. In the first triangle, AC sits opposite the \\(80^\\circ\\) angle between the two known fences, which is the cosine law case. The correct plan is <b>find the shared side AC with the cosine law in the first triangle, then work in the second triangle</b>. The \\(80^\\circ\\) angle is opposite AC, not opposite the \\(90\\text{ m}\\) side, so the sine-law pairing in the last option is wrong.",
    {});},
  function(){return mcq("Two points A and B on a lake shore are \\(150\\text{ m}\\) apart, and a buoy C forms a triangle with them; the angles at A and B in that triangle are \\(62^\\circ\\) and \\(48^\\circ\\). Across the side AC, a second triangle ACD shares the side AC, with a dock at D and angles at A and D of \\(50^\\circ\\) and \\(58^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the shore triangle, find its third angle and then AC with the sine law, then work in the second triangle",
    ["Start in the dock triangle and find AC from its two given angles first, then carry AC back into the shore triangle to finish the problem",
     "Draw the shore points and the dock as one big triangle, and apply the sine law once to the outside measurements to get CD",
     "Draw AC as the unknown in the shore triangle, but find it with the cosine law from the \\(150\\text{ m}\\) side and the two given angles at A and B"],
    "The dock triangle has no known side, so it cannot be started. In the shore triangle, the third angle is \\(180^\\circ - 62^\\circ - 48^\\circ = 70^\\circ\\), and the \\(150\\text{ m}\\) side sits opposite it, a complete pair for the sine law. The correct plan is <b>find the shared side AC with the sine law in the shore triangle, then work in the second triangle</b>. The cosine law cannot run on one known side.",
    {});},
  function(){return mcq("Two triangular lots share a driveway edge AC. In the first lot, \\(\\triangle ABC\\), \\(\\angle A = 45^\\circ\\), side \\(a = 60\\text{ m}\\) opposite \\(\\angle A\\), and side \\(c = 52\\text{ m}\\). In the second lot, \\(\\triangle ACD\\), the angles at C and D are \\(64^\\circ\\) and \\(51^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first lot, find it with the sine law from the \\(45^\\circ\\) angle and its opposite \\(60\\text{ m}\\) side, checking the diagram for the ambiguous case, then work in the second lot",
    ["Start in the second lot and find AC from its two given angles first, then carry AC back into the first lot to finish the problem",
     "Draw the two lots as one big triangle, and apply the sine law once to the outside measurements to finish the problem",
     "Draw AC as the unknown in the first lot, but find it with the cosine law, which the first lot's marked sides and angle support directly"],
    "The second lot has no known side, so it waits for AC. In the first lot, the \\(45^\\circ\\) angle and its opposite \\(60\\text{ m}\\) side form a complete pair, so the sine law finds the angles and then AC; this is the ambiguous case, so the diagram confirms which angle fits. The correct plan is <b>find the shared side AC with the sine law in the first lot, then work in the second lot</b>. The cosine law would need the included angle or all three sides.",
    {});},
  function(){return mcq("Two triangular garden beds share a path edge AC. In the first bed, \\(\\triangle ABC\\), the angles at A and B are \\(58^\\circ\\) and \\(71^\\circ\\), and side \\(a = 34\\text{ m}\\) sits opposite \\(\\angle A\\). In the second bed, \\(\\triangle ACD\\), the angles at A and D are \\(47^\\circ\\) and \\(66^\\circ\\). The task is to find CD. Which representation plan is correct?",
    "Draw AC as the unknown in the first bed, find it with the sine law using the \\(34\\text{ m}\\) side paired with its opposite \\(58^\\circ\\) angle, then work in the second bed",
    ["Start in the second bed and find AC from its two given angles first, then carry AC back into the first bed to finish the problem",
     "Draw the two beds as one big triangle, and apply the cosine law once to the outside measurements to get CD",
     "Draw AC as the unknown in the first bed, but find it with the cosine law from the \\(34\\text{ m}\\) side and the two given angles at A and B"],
    "The second bed has no known side, so it cannot be started. In the first bed, side a and angle A are a complete opposite pair, and AC sits opposite the \\(71^\\circ\\) angle, so the sine law finds AC in one proportion. The correct plan is <b>find the shared side AC with the sine law in the first bed, then work in the second bed</b>.",
    {});}
]));
E("u1-diagram-flaw-hunt",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("A problem states: in \\(\\triangle ABC\\), \\(\\angle A = 62^\\circ\\), side \\(a = 15\\text{ cm}\\) opposite \\(\\angle A\\), and side \\(b = 11\\text{ cm}\\); find \\(\\angle B\\), then side c. A student's setup reads: Diagram: angle A is marked \\(62^\\circ\\); the side opposite angle A is labelled \\(11\\text{ cm}\\) and the side opposite angle B is labelled \\(15\\text{ cm}\\); angle B is marked ?. Equation 1: \\(\\frac{\\sin B}{11} = \\frac{\\sin 62^\\circ}{15}\\). Equation 2: \\(C = 180^\\circ - 62^\\circ - B\\), then \\(\\frac{c}{\\sin C} = \\frac{15}{\\sin 62^\\circ}\\). Where is the flaw in this setup?",
    "The diagram: a side is paired with the wrong angle",
    ["Equation 1: the wrong law is chosen for the information given",
     "Equation 2: a value is substituted for the wrong side",
     "The setup is correct: there is no flaw"],
    "Equation 1 pairs \\(\\sin B\\) with \\(11\\) and \\(\\sin 62^\\circ\\) with \\(15\\), which matches the problem, and Equation 2 reuses that same known pair correctly. The diagram does not match: it puts \\(15\\text{ cm}\\) across from angle B and \\(11\\text{ cm}\\) across from angle A, the reverse of the problem. The flaw is <b>in the diagram, where a side is paired with the wrong angle</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle PQR\\), \\(\\angle P = 58^\\circ\\), side \\(p = 18\\text{ m}\\) opposite \\(\\angle P\\), and side \\(q = 13\\text{ m}\\); find \\(\\angle Q\\), then side r. A student's setup reads: Diagram: angle P is marked \\(58^\\circ\\); the side opposite angle P is labelled \\(18\\text{ m}\\) and the side opposite angle Q is labelled \\(13\\text{ m}\\); angle Q is marked ?. Equation 1: \\(q^2 = p^2 + r^2 - 2pr\\cos Q\\). Equation 2: \\(R = 180^\\circ - 58^\\circ - Q\\), then \\(\\frac{r}{\\sin R} = \\frac{18}{\\sin 58^\\circ}\\). Where is the flaw in this setup?",
    "Equation 1: the wrong law is chosen for the information given",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 2: a value is substituted for the wrong side",
     "The setup is correct: there is no flaw"],
    "The diagram matches the problem, and Equation 2 correctly reuses the known pair, \\(18\\text{ m}\\) opposite \\(58^\\circ\\). Equation 1 reaches for the cosine law, which involves the unknown side r and cannot give angle Q here; the known pair makes this a sine-law start: \\(\\frac{\\sin Q}{13} = \\frac{\\sin 58^\\circ}{18}\\). The flaw is <b>in Equation 1, where the wrong law is chosen</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle DEF\\), \\(\\angle D = 57^\\circ\\), side \\(d = 20\\text{ km}\\) opposite \\(\\angle D\\), and side \\(e = 14\\text{ km}\\); find \\(\\angle E\\), then side f. A student's setup reads: Diagram: angle D is marked \\(57^\\circ\\); the side opposite angle D is labelled \\(20\\text{ km}\\) and the side opposite angle E is labelled \\(14\\text{ km}\\); angle E is marked ?. Equation 1: \\(\\frac{\\sin E}{14} = \\frac{\\sin 57^\\circ}{20}\\). Equation 2: \\(F = 180^\\circ - 57^\\circ - E\\), then \\(\\frac{f}{\\sin F} = \\frac{14}{\\sin 57^\\circ}\\). Where is the flaw in this setup?",
    "Equation 2: a value is substituted for the wrong side",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 1: the wrong law is chosen for the information given",
     "The setup is correct: there is no flaw"],
    "The diagram matches the problem, and Equation 1 pairs each side with its opposite angle, giving \\(\\sin E \\approx 0.587\\), so \\(E \\approx 36^\\circ\\). Equation 2 then anchors the proportion on \\(14\\), but \\(14\\text{ km}\\) is side e, opposite angle E, not opposite the \\(57^\\circ\\) angle; the known pair is \\(20\\) with \\(57^\\circ\\), so it should read \\(\\frac{f}{\\sin F} = \\frac{20}{\\sin 57^\\circ}\\). The flaw is <b>in Equation 2, where a value is substituted for the wrong side</b>.",
    {});},
  function(){return mcq("A problem states: in \\(\\triangle XYZ\\), \\(\\angle X = 60^\\circ\\), side \\(x = 16\\text{ cm}\\) opposite \\(\\angle X\\), and side \\(y = 12\\text{ cm}\\); find \\(\\angle Y\\), then side z. A student's setup reads: Diagram: angle X is marked \\(60^\\circ\\); the side opposite angle X is labelled \\(16\\text{ cm}\\) and the side opposite angle Y is labelled \\(12\\text{ cm}\\); angle Y is marked ?. Equation 1: \\(\\frac{\\sin Y}{12} = \\frac{\\sin 60^\\circ}{16}\\). Equation 2: \\(Z = 180^\\circ - 60^\\circ - Y\\), then \\(\\frac{z}{\\sin Z} = \\frac{16}{\\sin 60^\\circ}\\). Where is the flaw in this setup?",
    "The setup is correct: there is no flaw",
    ["The diagram: a side is paired with the wrong angle",
     "Equation 1: the wrong law is chosen for the information given",
     "Equation 2: a value is substituted for the wrong side"],
    "Every part checks out: the diagram pairs \\(16\\text{ cm}\\) with the \\(60^\\circ\\) angle and \\(12\\text{ cm}\\) with angle Y, Equation 1 uses the sine law on that pair (\\(\\sin Y = \\frac{12 \\sin 60^\\circ}{16} \\approx 0.650\\), so \\(Y \\approx 40.5^\\circ\\)), and Equation 2 finds \\(Z \\approx 79.5^\\circ\\) and reuses the same known pair for side z. <b>The setup is correct: there is no flaw</b>.",
    {});}
]));
E("u1-diagram-complete-plan",1,["7.1","7.2"],3,"gen",function(){
  var mode=pick(["ASA","SAS"]),tries=0,ok=false;
  var A=0,B=0,C=0,c=0,b=0,key="",d1="",d2="",d3="",prompt="",sol="";
  while(!ok&&tries<400){tries++;
    if(mode==="ASA"){
      A=ri(35,58);B=ri(35,58);C=180-A-B;c=ri(12,36);
      if(C<35||C>80)continue;
      prompt="A triangular plot has angles \\(\\angle A = "+A+"^\\circ\\) and \\(\\angle B = "+B+"^\\circ\\) with the side between them measuring \\("+c+"\\text{ m}\\). Which plan solves the whole triangle, in a workable order?";
      key="First, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Next, use the sine law with the "+c+" m side and its opposite angle to find a second side. Finally, use the sine law again to find the last side.";
      d1="First, use the sine law with the "+c+" m side to find a second side. Next, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Finally, use the sine law again to find the last side.";
      d2="First, find the third angle with the angle sum: \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Next, use the cosine law with the "+c+" m side to find a second side. Finally, use the sine law to find the last side.";
      d3="First, use the cosine law with the "+c+" m side to find the third angle. Next, use the sine law to find a second side. Finally, use the sine law again to find the last side.";
      sol="The known side sits opposite the third angle, so no law has a complete pair until the angle sum runs: \\(\\angle C = "+C+"^\\circ\\). After that, the sine law works twice, once for each unknown side. The cosine law cannot find a side while only one side is known, and it cannot produce an angle from one side either. The workable plan is <b>angle sum first, then the sine law for each unknown side in turn</b>.";
    }else{
      b=ri(9,24);c=ri(9,24);A=ri(45,95);
      prompt="A triangular frame has sides \\(b = "+b+"\\text{ m}\\) and \\(c = "+c+"\\text{ m}\\) with the included angle \\(\\angle A = "+A+"^\\circ\\) between them. Which plan solves the whole triangle, in a workable order?";
      key="First, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the sine law to find one of the unknown angles. Finally, use the angle sum to find the last angle.";
      d1="First, use the sine law to find one of the unknown angles. Next, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Finally, use the angle sum to find the last angle.";
      d2="First, use the sine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the cosine law to find one of the unknown angles. Finally, use the angle sum to find the last angle.";
      d3="First, use the cosine law with the "+b+" m and "+c+" m sides and the included "+A+"° angle to find the third side. Next, use the angle sum to find the last angle. Finally, use the sine law to find the remaining unknown angle.";
      sol="The side opposite the known angle is unknown, so the sine law has no complete pair at the start, and the angle sum cannot run with one known angle. The cosine law opens the problem by giving the third side; after that, the sine law finds an angle (using the smaller known side keeps that angle acute), and the angle sum finishes. The workable plan is <b>cosine law first, then the sine law, then the angle sum</b>.";
    }
    var os=[key,d1,d2,d3];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq(prompt,key,[d1,d2,d3],sol,
    mode==="ASA"?{mode:mode,A:A,B:B,C:C,c:c}:{mode:mode,b:b,c:c,A:A});
});
E("u1-diagram-both-laws",1,["7.1","7.2"],3,"var",varset([
  function(){return mcq("A triangle is drawn from two angles, \\(54^\\circ\\) and \\(71^\\circ\\), and the side between them, \\(22\\text{ m}\\). Which statement about starting this problem is correct?",
    "The sine law can start, but only after the third angle is found from the angle sum, because the \\(22\\text{ m}\\) side then sits opposite a known angle; the cosine law cannot start, since it needs two known sides and only one side is known",
    ["The cosine law can start right away, because two known angles and one known side give it everything it needs; the sine law cannot start at all, since the known side sits between the angles and is opposite no angle in the triangle",
     "Either law can start right away, because two known angles and a known side are enough for the cosine law as well as for the sine law, and no angle has to be calculated before one of the laws is applied to the marks",
     "Neither law can start this problem, because the only known side is the one between the two known angles, so it can never be paired with an angle, and a problem like this has to be started with a scale drawing instead"],
    "The third angle is \\(180^\\circ - 54^\\circ - 71^\\circ = 55^\\circ\\), and the \\(22\\text{ m}\\) side sits opposite it, so once that angle is found the sine law has a complete pair. The cosine law needs two sides around a known angle, and only one side is known. The correct statement is <b>the sine law can start after the angle sum, and the cosine law cannot start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from two sides, \\(13\\text{ m}\\) and \\(19\\text{ m}\\), and the angle between them, \\(76^\\circ\\). Which statement about starting this problem is correct?",
    "The cosine law can start, because the two known sides and the angle between them are exactly what it uses; the sine law cannot start, since the side opposite the known angle is unknown and no complete pair exists yet",
    ["The sine law can start, because the two known sides and the angle between them form a complete pair; the cosine law cannot start, since it needs the side opposite the known angle, which is the unknown in this problem",
     "Either law can start right away, because two known sides and a known angle are enough information for the sine law as well as for the cosine law, and each law would give the third side in a single first step",
     "Neither law can start this problem, because the known angle sits between the two known sides rather than opposite one of them, so no law can use it until another angle in the triangle has been found first"],
    "A complete sine-law pair needs a side whose opposite angle is known; here the side opposite the \\(76^\\circ\\) angle is the unknown, so the sine law has nothing to anchor to. The cosine law is built for two sides with the included angle. The correct statement is <b>the cosine law can start, and the sine law cannot start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from three sides, \\(8\\text{ cm}\\), \\(11\\text{ cm}\\) and \\(14\\text{ cm}\\), with no angle given. Which statement about starting this problem is correct?",
    "Only the cosine law can start, rearranged to give an angle from the three sides; the sine law cannot start, because it needs a known angle paired with its opposite side and no angle in this problem is known",
    ["Only the sine law can start, by setting the three sides as three equal ratios; the cosine law cannot start, because it needs a known angle to work from and no angle in this problem is known at the beginning",
     "Either law can start right away, because three known sides are enough information for the sine law as well as for the cosine law, and each one would give an angle of the triangle in a single first step",
     "Neither law can start this problem, because every law needs at least one known angle to begin with, so a triangle given by three sides alone cannot be started until an angle is measured from a drawing"],
    "The sine law is a proportion between sides and sines of angles, so with no angle known it cannot be set up. The cosine law rearranged, \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\), uses the three sides alone to give an angle. The correct statement is <b>only the cosine law can start</b>.",
    {});},
  function(){return mcq("A triangle is drawn from an angle of \\(43^\\circ\\), the side opposite it, \\(10\\text{ cm}\\), and another side, \\(13\\text{ cm}\\). Which statement about starting this problem is correct?",
    "The sine law can start, because the \\(43^\\circ\\) angle and its opposite \\(10\\text{ cm}\\) side form a complete pair, but the angle it gives must be checked against the diagram since its supplement has the same sine; the cosine law cannot start here",
    ["The cosine law can start, because two known sides and a known angle are exactly what it uses; the sine law cannot start, since the second known side is not opposite the known angle and so no pair can be formed from the marks",
     "The sine law can start, because the \\(43^\\circ\\) angle and its opposite \\(10\\text{ cm}\\) side form a complete pair, and the angle it returns is always the one angle that fits, with no supplement ever needing to be checked against the diagram",
     "Either law can start right away, because two known sides and any known angle are enough for the cosine law as well as for the sine law, and each one would give the next part of the triangle in a single step"],
    "The \\(43^\\circ\\) angle and the \\(10\\text{ cm}\\) side opposite it are a complete pair, so the sine law starts; but \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\), so the angle it returns has a supplement with the same sine, and the diagram decides which one fits. The cosine law would need the included angle or the third side. The correct statement is <b>the sine law can start, with the ambiguous-case caution, and the cosine law cannot start</b>.",
    {});}
]));

// Math 2201 Unit 1 enrichment batch B: indicator 7.2 only (sine law / cosine law, one triangle).
// 23 new entries: 6 Level 1, 11 Level 2, 6 Level 3. All figures slanted via triRotSVG
// except the MC entries 5, 9, 14, 15 and the var entry 21, which carry no figure.
// Suggested CR marks for the num entries (MC entries carry no CR line here):
// CR: u1-ferry-distance=2
// CR: u1-sail-angle=2
// CR: u1-survey-baseline=2
// CR: u1-fence-angle=2
// CR: u1-orchard-tree=2
// CR: u1-lighthouse-bearing=2
// CR: u1-pipeline-angle=3
// CR: u1-panel-perimeter=3
// CR: u1-raft-crossing=2
// CR: u1-harbour-second-side=3
// CR: u1-rafter-span=2
// CR: u1-lock-gates=2
// CR: u1-meadow-angle=2
// CR: u1-regatta-choice=4
// CR: u1-perimeter-angles=3
// CR: u1-isosceles-span=2
// CR: u1-two-lamps=3
// CR: u1-scaffold-bay=3
E("u1-ferry-distance",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var v1=ri(14,30),v2=ri(14,30),t=pick([0.5,1,1.5,2]);
  var d1=v1*t,d2=v2*t,th=ri(40,130);
  var D=Math.sqrt(d1*d1+d2*d2-2*d1*d2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two ferries leave the same terminal at the same time. One travels at "+v1+" km/h and the other at "+v2+" km/h, with an angle of \\("+th+"^\\circ\\) between their routes. After "+t+" h, how far apart are the ferries, to one decimal place, in km?",
    Math.round(D*10)/10,0.06,
    "In "+t+" h the ferries travel \\("+v1+" \\times "+t+" = "+fmt(d1,1)+"\\text{ km}\\) and \\("+v2+" \\times "+t+" = "+fmt(d2,1)+"\\text{ km}\\). The two routes and the distance apart form a triangle with included angle \\("+th+"^\\circ\\), so the cosine law gives \\(D^2 = "+fmt(d1,1)+"^2 + "+fmt(d2,1)+"^2 - 2("+fmt(d1,1)+")("+fmt(d2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(D*D,1)+"\\). Taking the square root, \\(D \\approx \\)<b>\\("+fmt(D,1)+"\\text{ km}\\)</b>.",
    {v1:v1,v2:v2,t:t,d1:d1,d2:d2,th:th,rot:rot});
  q.figure=triRotSVG(D,d2,d1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",fmt(d2,1)+" km",fmt(d1,1)+" km"],rot:rot});
  return q;
});
E("u1-sail-angle",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,a=0,Btar=0,b=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([30,35,40,45,50]);a=ri(6,14);Btar=pick([40,45,50,55,60,65,70]);
    if(Btar<=A||A+Btar>=165)continue;
    b=Math.round(a*Math.sin(rd(Btar))/Math.sin(rd(A))*10)/10;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<20||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular sail has corners \\(A\\), \\(B\\) and \\(C\\). The edge opposite \\(\\angle A\\) measures \\("+a+"\\text{ m}\\) and \\(\\angle A = "+A+"^\\circ\\). The edge opposite \\(\\angle B\\) measures \\("+fmt(b,1)+"\\text{ m}\\). Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law and pair each edge with its opposite angle: \\(\\frac{\\sin B}{"+fmt(b,1)+"} = \\frac{\\sin "+A+"^\\circ}{"+a+"}\\), so \\(\\sin B = \\frac{"+fmt(b,1)+" \\times \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). Then \\(\\angle B = \\sin^{-1}("+fmt(b*Math.sin(rd(A))/a,4)+") \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>. The sail is drawn with \\(\\angle B\\) acute, so the acute value is the one that fits.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[a+" m",fmt(b,1)+" m",null],rot:rot});
  return q;
});
E("u1-survey-baseline",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,base=0,tries=0;
  while(tries<400){tries++;
    A=ri(38,68);B=ri(38,68);C=180-A-B;
    if(C<35||C>105)continue;
    base=ri(25,75);break;
  }
  var b=base*Math.sin(rd(B))/Math.sin(rd(C));
  var aside=base*Math.sin(rd(A))/Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A surveyor marks two points \\(A\\) and \\(B\\) that are \\("+base+"\\text{ m}\\) apart and sights a landmark \\(C\\) from both. At \\(A\\), the angle between the baseline and the line to the landmark is \\("+A+"^\\circ\\); at \\(B\\), the angle between the baseline and the line to the landmark is \\("+B+"^\\circ\\). How far is the landmark from \\(A\\), to one decimal place, in m?",
    Math.round(b*10)/10,0.06,
    "The two points and the landmark form a triangle. Its third angle is \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The distance from \\(A\\) to the landmark is opposite \\(\\angle B\\), so the sine law gives \\(\\frac{AC}{\\sin "+B+"^\\circ} = \\frac{"+base+"}{\\sin "+C+"^\\circ}\\), and \\(AC = \\frac{"+base+" \\times \\sin "+B+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+fmt(b,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,base:base,rot:rot});
  q.figure=triRotSVG(aside,b,base,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[null,"?",base+" m"],rot:rot});
  return q;
});
E("u1-fence-angle",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Arev=0,tries=0;
  while(tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70,75,80]);b=ri(8,20);c=ri(8,20);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var cs=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cs)>=1)continue;
    Arev=Math.acos(cs)*180/Math.PI;
    if(Arev<25||Arev>88)continue;
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Three fence lengths of \\("+fmt(a,1)+"\\text{ m}\\), \\("+b+"\\text{ m}\\) and \\("+c+"\\text{ m}\\) form a triangular pen. Find the angle at the corner opposite the \\("+fmt(a,1)+"\\text{ m}\\) side, to the nearest degree.",
    Math.round(Arev),0.51,
    "With all three sides known, rearrange the cosine law for the angle opposite the \\("+fmt(a,1)+"\\text{ m}\\) side: \\(\\cos A = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2 \\times "+b+" \\times "+c+"} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,1)+"}{"+(2*b*c)+"} \\approx "+fmt((b*b+c*c-a*a)/(2*b*c),4)+"\\). So \\(A = \\cos^{-1}("+fmt((b*b+c*c-a*a)/(2*b*c),4)+") \\approx \\)<b>\\("+Math.round(Arev)+"^\\circ\\)</b>.",
    {a:a,b:b,c:c,Arev:Arev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1)+" m",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-crane-spread",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=ri(6,16);s2=ri(6,16);th=ri(45,125);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("Two straps run from a single crane hook down to two attachment points on a load. The straps are "+s1+" m and "+s2+" m long, and the angle between them at the hook is \\("+th+"^\\circ\\). What is the distance between the two attachment points, in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The straps and the spread form a triangle with the \\("+th+"^\\circ\\) angle included between the strap lengths, so the cosine law applies: \\(d^2 = "+s1+"^2 + "+s2+"^2 - 2("+s1+")("+s2+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,1)+"\\). Taking the square root, the spread is <b>\\("+fmt(key,1)+"\\text{ m}\\)</b>. (Adding the cosine term instead of subtracting it, or using sine in place of cosine, gives the wrong spread.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-orchard-tree",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,D=0,tries=0;
  while(tries<400){tries++;
    A=ri(30,60);B=ri(45,75);C=180-A-B;
    if(C<35||C>105)continue;
    D=ri(40,90);break;
  }
  var aside=D*Math.sin(rd(A))/Math.sin(rd(C));
  var bside=D*Math.sin(rd(B))/Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two corners \\(A\\) and \\(B\\) of an orchard are \\("+D+"\\text{ m}\\) apart. From corner \\(A\\), the angle between the line to corner \\(B\\) and the line to a lone tree is \\("+A+"^\\circ\\); from corner \\(B\\), the angle between the line to corner \\(A\\) and the line to the tree is \\("+B+"^\\circ\\). How far is the tree from corner \\(B\\), to one decimal place, in m?",
    Math.round(aside*10)/10,0.06,
    "The corners and the tree form a triangle, and the angle at the tree is \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The distance from corner \\(B\\) to the tree is opposite the \\("+A+"^\\circ\\) angle, so the sine law gives \\(\\frac{BT}{\\sin "+A+"^\\circ} = \\frac{"+D+"}{\\sin "+C+"^\\circ}\\), and \\(BT = \\frac{"+D+" \\times \\sin "+A+"^\\circ}{\\sin "+C+"^\\circ} \\approx \\)<b>\\("+fmt(aside,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,D:D,rot:rot});
  q.figure=triRotSVG(aside,bside,D,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:["?",null,D+" m"],rot:rot});
  return q;
});
E("u1-lighthouse-bearing",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Arev=0,tries=0;
  while(tries<400){tries++;
    Atar=pick([35,40,45,50,55,60,65,70,75,80]);b=ri(4,15);c=ri(4,15);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var cs=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cs)>=1)continue;
    Arev=Math.acos(cs)*180/Math.PI;
    if(Arev<20||Arev>88)continue;
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two ships are \\("+c+"\\text{ km}\\) and \\("+b+"\\text{ km}\\) from a lighthouse, and the ships are \\("+fmt(a,1)+"\\text{ km}\\) apart. Find the angle at the lighthouse between the lines to the two ships, to the nearest degree.",
    Math.round(Arev),0.51,
    "The lighthouse and the ships form a triangle with all three sides known, so rearrange the cosine law for the angle at the lighthouse, which sits opposite the \\("+fmt(a,1)+"\\text{ km}\\) side: \\(\\cos A = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2 \\times "+b+" \\times "+c+"} \\approx "+fmt((b*b+c*c-a*a)/(2*b*c),4)+"\\). So the angle is \\(\\cos^{-1}("+fmt((b*b+c*c-a*a)/(2*b*c),4)+") \\approx \\)<b>\\("+Math.round(Arev)+"^\\circ\\)</b>.",
    {a:a,b:b,c:c,Arev:Arev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1)+" km",b+" km",c+" km"],rot:rot});
  return q;
});
E("u1-pipeline-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(30,90),q2=ri(30,90),turn=ri(25,65),interior=180-turn;
  var d=Math.sqrt(p*p+q2*q2-2*p*q2*Math.cos(rd(interior)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A pipeline runs in two straight sections of \\("+p+"\\text{ m}\\) and \\("+q2+"\\text{ m}\\). At the joint, the direction of the pipe turns through \\("+turn+"^\\circ\\) away from the straight-ahead direction. Find the straight-line distance between the two ends of the pipeline, to one decimal place, in m.",
    Math.round(d*10)/10,0.06,
    "A straight alignment would make an angle of \\(180^\\circ\\) at the joint, and the pipe turns \\("+turn+"^\\circ\\) away from it, so the interior angle of the triangle at the joint is \\(180^\\circ - "+turn+"^\\circ = "+interior+"^\\circ\\). The cosine law then gives \\(d^2 = "+p+"^2 + "+q2+"^2 - 2("+p+")("+q2+")\\cos "+interior+"^\\circ \\approx "+fmt(d*d,1)+"\\), so \\(d \\approx \\)<b>\\("+fmt(d,1)+"\\text{ m}\\)</b>.",
    {p:p,q:q2,turn:turn,interior:interior,rot:rot});
  q.figure=triRotSVG(q2,d,p,{L:["A","B","C"],ang:[null,interior+"°",null],side:[q2+" m","?",p+" m"],rot:rot});
  return q;
});
E("u1-gate-diagonal",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=pick([1.2,1.5,1.8,2.0,2.4,2.7,3.0]);s2=pick([1.2,1.5,1.8,2.0,2.4,2.7,3.0]);th=ri(50,110);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A triangular gate brace is formed by two sides of "+fmt(s1,1)+" m and "+fmt(s2,1)+" m with an angle of \\("+th+"^\\circ\\) between them. How long is the diagonal brace that joins their far ends, in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The diagonal sits opposite the angle between the two known sides, so the cosine law applies: \\(d^2 = "+fmt(s1,1)+"^2 + "+fmt(s2,1)+"^2 - 2("+fmt(s1,1)+")("+fmt(s2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,1)+"\\). Taking the square root, the brace is <b>\\("+fmt(key,1)+"\\text{ m}\\)</b>. (Adding the cosine term is a sign error, and using sine in place of cosine does not fit the included angle.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-panel-perimeter",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var a=ri(2,6),b=ri(2,6),C=ri(45,120);
  var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(rd(C)));
  var P=a+b+c;
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular solar panel has two edges of \\("+a+"\\text{ m}\\) and \\("+b+"\\text{ m}\\) with an angle of \\("+C+"^\\circ\\) between them. Find the perimeter of the panel, to one decimal place, in m.",
    Math.round(P*10)/10,0.06,
    "First find the third edge with the cosine law, since it sits opposite the included angle: \\(c^2 = "+a+"^2 + "+b+"^2 - 2("+a+")("+b+")\\cos "+C+"^\\circ \\approx "+fmt(c*c,1)+"\\), so \\(c \\approx "+fmt(c,1)+"\\text{ m}\\). The perimeter adds all three edges: \\("+a+" + "+b+" + "+fmt(c,1)+" \\approx \\)<b>\\("+fmt(P,1)+"\\text{ m}\\)</b>.",
    {a:a,b:b,C:C,c:c,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[null,null,C+"°"],side:[a+" m",b+" m","?"],rot:rot});
  return q;
});
E("u1-raft-crossing",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([55,60,65,70]);Btar=pick([30,35,40,45]);
    if(Btar>=A-10)continue;
    b=ri(8,18);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a<=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<15||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A raft crossing is modelled by \\(\\triangle ABC\\), where \\(\\angle A = "+A+"^\\circ\\), side \\(b = "+b+"\\text{ m}\\) and side \\(a = "+fmt(a,1)+"\\text{ m}\\) (side \\(a\\) is opposite \\(\\angle A\\)). Because side \\(a\\) is longer than side \\(b\\), only one triangle fits. Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law with the known pair \\(a\\) and \\(\\angle A\\): \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). Then \\(\\angle B = \\sin^{-1}("+fmt(b*Math.sin(rd(A))/a,4)+") \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>. Since \\(a > b\\), the supplement of this value cannot fit with \\(\\angle A\\), so this is the only possible value.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m",null],rot:rot});
  return q;
});
E("u1-harbour-second-side",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,a=0,tries=0;
  while(tries<400){tries++;
    A=ri(35,65);B=ri(35,65);C=180-A-B;
    if(C<40||C>100)continue;
    a=ri(15,40);break;
  }
  var b=a*Math.sin(rd(B))/Math.sin(rd(A));
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A harbour triangle \\(ABC\\) has \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\) and side \\(a = "+a+"\\text{ m}\\) opposite \\(\\angle A\\). Find side \\(c\\), to one decimal place, in m.",
    Math.round(c*10)/10,0.06,
    "First the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). The sine law proportion from the known pair is \\(\\frac{"+a+"}{\\sin "+A+"^\\circ} \\approx "+fmt(a/Math.sin(rd(A)),2)+"\\). As a check, side \\(b = "+fmt(a/Math.sin(rd(A)),2)+" \\times \\sin "+B+"^\\circ \\approx "+fmt(b,1)+"\\text{ m}\\). Using the same proportion for side \\(c\\): \\(c = "+fmt(a/Math.sin(rd(A)),2)+" \\times \\sin "+C+"^\\circ \\approx \\)<b>\\("+fmt(c,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,a:a,b:b,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[a+" m",null,"?"],rot:rot});
  return q;
});
E("u1-rafter-span",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var r1=ri(4,9),r2=ri(4,9),tries=0;
  while(r1===r2&&tries<40){r2=ri(4,9);tries++;}
  var th=ri(35,85);
  var span=Math.sqrt(r1*r1+r2*r2-2*r1*r2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A roof truss has two rafters of \\("+r1+"\\text{ m}\\) and \\("+r2+"\\text{ m}\\) meeting at the apex with an angle of \\("+th+"^\\circ\\) between them. Find the span across the bottom of the truss, to one decimal place, in m.",
    Math.round(span*10)/10,0.06,
    "The rafters and the span form a triangle with the apex angle included between the rafter lengths, so the cosine law gives \\(s^2 = "+r1+"^2 + "+r2+"^2 - 2("+r1+")("+r2+")\\cos "+th+"^\\circ \\approx "+fmt(span*span,1)+"\\). Taking the square root, the span is <b>\\("+fmt(span,1)+"\\text{ m}\\)</b>.",
    {r1:r1,r2:r2,th:th,rot:rot});
  q.figure=triRotSVG(span,r2,r1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",r2+" m",r1+" m"],rot:rot});
  return q;
});
E("u1-kite-spar",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s1=0,s2=0,th=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    s1=pick([0.6,0.8,0.9,1.0,1.2,1.5]);s2=pick([0.6,0.8,0.9,1.0,1.2,1.5]);th=ri(40,110);
    key=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.cos(rd(th)));
    d1=Math.sqrt(s1*s1+s2*s2+2*s1*s2*Math.cos(rd(th)));
    d2=Math.sqrt(s1*s1+s2*s2-2*s1*s2*Math.sin(rd(th)));
    d3=key*key;
    var os=[fmt(key,2),fmt(d1,2),fmt(d2,2),fmt(d3,2)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("One triangular half of a kite has frame lengths of "+fmt(s1,1)+" m and "+fmt(s2,1)+" m with an angle of \\("+th+"^\\circ\\) between them. How long is the cross-spar that joins their far ends, in m?",
    fmt(key,2),[fmt(d1,2),fmt(d2,2),fmt(d3,2)],
    "The cross-spar sits opposite the angle between the two frame lengths, so the cosine law applies: \\(d^2 = "+fmt(s1,1)+"^2 + "+fmt(s2,1)+"^2 - 2("+fmt(s1,1)+")("+fmt(s2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(key*key,2)+"\\). Taking the square root, the cross-spar is <b>\\("+fmt(key,2)+"\\text{ m}\\)</b>. (Adding the cosine term is a sign error, and the value before the square root is not the length.)",
    {s1:s1,s2:s2,th:th});
});
E("u1-corner-check",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Atar=0,b=0,c=0,a=0,Aang=0,Bang=0,Cang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70]);b=ri(10,30);c=ri(10,30);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Atar)))*10)/10;
    var csA=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(csA)>=1)continue;
    Aang=Math.acos(csA)*180/Math.PI;
    var csB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(csB)>=1)continue;
    Bang=Math.acos(csB)*180/Math.PI;Cang=180-Aang-Bang;
    if(Cang<12||Cang>120)continue;
    var os=[""+Math.round(Aang),""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A triangular property lot has sides of "+fmt(a,1)+" m, "+b+" m and "+c+" m. What is the angle at the corner opposite the side of length "+fmt(a,1)+" m, in degrees?",
    ""+Math.round(Aang),[""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)],
    "Rearrange the cosine law for the angle opposite side \\(a\\): \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2("+b+")("+c+")}\\), which gives \\(A \\approx \\)<b>\\("+Math.round(Aang)+"^\\circ\\)</b>. The other two computed values are the lot's other two corner angles, and the remaining option is the supplement of the answer, which would belong to a different corner configuration.",
    {a:a,b:b,c:c});
});
E("u1-lock-gates",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var g1=pick([3.6,4.2,4.8,5.4,6.0]),g2=pick([3.6,4.2,4.8,5.4,6.0].filter(function(x){return x!==g1;}));
  var th=ri(50,120);
  var gap=Math.sqrt(g1*g1+g2*g2-2*g1*g2*Math.cos(rd(th)));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("Two canal lock gates swing from opposite walls and meet partway across the channel. The gates are \\("+fmt(g1,1)+"\\text{ m}\\) and \\("+fmt(g2,1)+"\\text{ m}\\) long, and the angle between them where they meet is \\("+th+"^\\circ\\). Find the distance between the free ends of the gates at the walls, to one decimal place, in m.",
    Math.round(gap*10)/10,0.06,
    "The two gates and the distance between their wall ends form a triangle with the \\("+th+"^\\circ\\) angle included between the gate lengths, so the cosine law gives \\(d^2 = "+fmt(g1,1)+"^2 + "+fmt(g2,1)+"^2 - 2("+fmt(g1,1)+")("+fmt(g2,1)+")\\cos "+th+"^\\circ \\approx "+fmt(gap*gap,1)+"\\). Taking the square root, the distance is <b>\\("+fmt(gap,1)+"\\text{ m}\\)</b>.",
    {g1:g1,g2:g2,th:th,rot:rot});
  q.figure=triRotSVG(gap,g2,g1,{L:["A","B","C"],ang:[th+"°",null,null],side:["?",fmt(g2,1)+" m",fmt(g1,1)+" m"],rot:rot});
  return q;
});
E("u1-meadow-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,tries=0;
  while(tries<400){tries++;
    A=pick([30,35,40]);Btar=pick([50,55,60,65,70]);
    if(Btar<=A+15)continue;
    b=ri(20,45);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a>=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    if(Brev<20||Brev>85)continue;
    break;
  }
  var C=180-A-Brev;
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular meadow is modelled by \\(\\triangle ABC\\) in the diagram, where \\(\\angle A = "+A+"^\\circ\\), side \\(a = "+fmt(a,1)+"\\text{ m}\\) (opposite \\(\\angle A\\)) and side \\(b = "+b+"\\text{ m}\\). Find \\(\\angle B\\), to the nearest degree.",
    Math.round(Brev),0.51,
    "Use the sine law with the known pair \\(a\\) and \\(\\angle A\\): \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\). The inverse sine gives an acute value, and the diagram shows \\(\\angle B\\) acute (its supplement would not match the drawn shape), so \\(\\angle B \\approx \\)<b>\\("+Math.round(Brev)+"^\\circ\\)</b>.",
    {A:A,a:a,b:b,Brev:Brev,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m",null],rot:rot});
  return q;
});
E("u1-regatta-choice",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,b=0,a=0,B1=0,B2=0,selB=0,Csel=0,csel=0,larger=false,tries=0,ok=false;
  while(!ok&&tries<600){tries++;
    A=ri(28,42);b=ri(12,22);
    var h=b*Math.sin(rd(A));
    if(b-h<2)continue;
    a=Math.round((h+1+Math.random()*(b-h-2))*10)/10;
    if(a<=h||a>=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    B1=Math.asin(s)*180/Math.PI;B2=180-B1;
    if(B1<A+12)continue;
    var C1=180-A-B1,C2=180-A-B2;
    if(C1<20||C2<15)continue;
    larger=Math.random()<0.5;
    selB=larger?B2:B1;Csel=larger?C2:C1;
    csel=a*Math.sin(rd(Csel))/Math.sin(rd(A));
    ok=true;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("In a regatta course triangle \\(ABC\\), \\(\\angle A = "+A+"^\\circ\\), side \\(b = "+b+"\\text{ m}\\) and side \\(a = "+fmt(a,1)+"\\text{ m}\\) (side \\(a\\) is opposite \\(\\angle A\\)). Two positions for the mark at \\(B\\) fit these measurements. The course is set so that \\(\\angle B\\) is the "+(larger?"larger":"smaller")+" of the two possible values. Find side \\(c\\) for the course as set, to one decimal place, in m.",
    Math.round(csel*10)/10,0.06,
    "Start with the sine law: \\(\\sin B = \\frac{"+b+" \\times \\sin "+A+"^\\circ}{"+fmt(a,1)+"} \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\), which gives two candidates, \\(\\angle B \\approx "+fmt(B1,1)+"^\\circ\\) or its supplement \\(\\angle B \\approx "+fmt(B2,1)+"^\\circ\\) (this is the ambiguous case, since the height \\(h = "+b+" \\sin "+A+"^\\circ \\approx "+fmt(b*Math.sin(rd(A)),1)+"\\text{ m}\\) is less than \\(a\\), and \\(a\\) is less than \\(b\\)). The course uses the "+(larger?"larger":"smaller")+" value, \\(\\angle B \\approx "+fmt(selB,1)+"^\\circ\\), so \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+fmt(selB,1)+"^\\circ \\approx "+fmt(Csel,1)+"^\\circ\\). The sine law then gives \\(c = \\frac{"+fmt(a,1)+" \\times \\sin "+fmt(Csel,1)+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(csel,1)+"\\text{ m}\\)</b>.",
    {A:A,a:a,b:b,B1:B1,B2:B2,selB:selB,larger:larger,rot:rot});
  q.figure=triRotSVG(a,b,csel,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m","?"],rot:rot});
  return q;
});
E("u1-perimeter-angles",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,B=0,C=0,tries=0;
  while(tries<400){tries++;
    A=ri(40,70);B=ri(40,70);C=180-A-B;
    if(C<30||C>100)continue;
    break;
  }
  var P=pick([48,54,60,66,72,80,90]);
  var ssum=Math.sin(rd(A))+Math.sin(rd(B))+Math.sin(rd(C));
  var k=P/ssum;
  var a=k*Math.sin(rd(A)),b=k*Math.sin(rd(B)),c=k*Math.sin(rd(C));
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A triangular plot has angles of \\("+A+"^\\circ\\) and \\("+B+"^\\circ\\) at two of its corners, and its perimeter is \\("+P+"\\text{ m}\\). Find the length of the side opposite the \\("+A+"^\\circ\\) angle, to one decimal place, in m.",
    Math.round(a*10)/10,0.06,
    "The third angle is \\(180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). By the sine law the sides are proportional to the sines of their opposite angles, so write each side as a scale factor times a sine: the perimeter is \\(k(\\sin "+A+"^\\circ + \\sin "+B+"^\\circ + \\sin "+C+"^\\circ) = "+P+"\\), which gives \\(k = \\frac{"+P+"}{"+fmt(ssum,3)+"} \\approx "+fmt(k,2)+"\\). The side opposite the \\("+A+"^\\circ\\) angle is \\(k \\sin "+A+"^\\circ \\approx "+fmt(k,2)+" \\times "+fmt(Math.sin(rd(A)),3)+" \\approx \\)<b>\\("+fmt(a,1)+"\\text{ m}\\)</b>.",
    {A:A,B:B,C:C,P:P,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°",B+"°",C+"°"],side:["?",null,null],rot:rot});
  return q;
});
E("u1-isosceles-span",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var L=ri(5,15),mode=ri(0,1),apex=0,beta=0;
  if(mode===0){beta=ri(35,65);apex=180-2*beta;}
  else{apex=pick([40,60,80,90,100]);beta=(180-apex)/2;}
  var base=L*Math.sin(rd(apex))/Math.sin(rd(beta));
  var rot=pick([9,12,15,-10,-14]);
  var prompt=(mode===0?
    "An isosceles triangular brace has two equal sides of \\("+L+"\\text{ m}\\), and each base angle measures \\("+beta+"^\\circ\\). Find the length of the base, to one decimal place, in m.":
    "An isosceles triangular brace has two equal sides of \\("+L+"\\text{ m}\\) meeting at an apex angle of \\("+apex+"^\\circ\\). Find the length of the base, to one decimal place, in m.");
  var q=numq(prompt,
    Math.round(base*10)/10,0.06,
    (mode===0?
      "The apex angle is \\(180^\\circ - "+beta+"^\\circ - "+beta+"^\\circ = "+apex+"^\\circ\\). The base sits opposite the apex angle and each equal side sits opposite a base angle, so the sine law gives \\(\\frac{\\text{base}}{\\sin "+apex+"^\\circ} = \\frac{"+L+"}{\\sin "+beta+"^\\circ}\\), and the base is \\(\\frac{"+L+" \\times \\sin "+apex+"^\\circ}{\\sin "+beta+"^\\circ} \\approx \\)":
      "Each base angle is \\(\\frac{180^\\circ - "+apex+"^\\circ}{2} = "+beta+"^\\circ\\). The base sits opposite the apex angle and each equal side sits opposite a base angle, so the sine law gives \\(\\frac{\\text{base}}{\\sin "+apex+"^\\circ} = \\frac{"+L+"}{\\sin "+beta+"^\\circ}\\), and the base is \\(\\frac{"+L+" \\times \\sin "+apex+"^\\circ}{\\sin "+beta+"^\\circ} \\approx \\)")
    +"<b>\\("+fmt(base,1)+"\\text{ m}\\)</b>.",
    {L:L,mode:mode,apex:apex,beta:beta,rot:rot});
  q.figure=triRotSVG(base,L,L,{L:["A","B","C"],ang:[apex+"°",beta+"°",beta+"°"],side:["?",L+" m",L+" m"],rot:rot});
  return q;
});
E("u1-ambiguous-design",1,["7.2"],3,"var",varset([
  function(){return mcq("A triangular sign is specified by \\(\\angle A = 35^\\circ\\), side \\(b = 12\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different signs fit this specification?",
    "No sign fits the spec, because side a cannot reach the base line",
    ["Exactly one sign fits, and it is a right triangle","Exactly one sign fits, but it is not a right triangle","Two different signs fit the spec"],
    "Compare side \\(a\\) with the height \\(h = b\\sin A = 12 \\times \\sin 35^\\circ \\approx 6.9\\text{ cm}\\). Side \\(a = 5\\text{ cm}\\) is shorter than \\(h\\), so it cannot reach the base line at all and no triangle closes.",
    {});},
  function(){return mcq("A triangular shelf bracket is specified by \\(\\angle A = 30^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different brackets fit this specification?",
    "Exactly one bracket fits, and it is a right triangle",
    ["No bracket fits the spec, because side a is too short","Exactly one bracket fits, but it is not a right triangle","Two different brackets fit the spec"],
    "The height is \\(h = b\\sin A = 10 \\times \\sin 30^\\circ = 5\\text{ cm}\\). Side \\(a\\) equals \\(h\\) exactly, so side \\(a\\) just reaches the base at a right angle: exactly one bracket, and it is right-angled.",
    {});},
  function(){return mcq("A triangular tile is specified by \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 8\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). How many different tiles fit this specification?",
    "Two different tiles fit the spec",
    ["No tile fits the spec, because side a is too short","Exactly one tile fits, and it is a right triangle","Exactly one tile fits, but it is not a right triangle"],
    "The height is \\(h = 10 \\times \\sin 40^\\circ \\approx 6.4\\text{ cm}\\). Side \\(a = 8\\text{ cm}\\) is longer than \\(h\\) but shorter than \\(b = 10\\text{ cm}\\), so it can swing to two different positions on the base: two different tiles fit.",
    {});},
  function(){return mcq("A triangular piece of garden edging is specified by \\(\\angle A = 45^\\circ\\), side \\(b = 14\\text{ cm}\\) and side \\(a = 9\\text{ cm}\\) (side \\(a\\) is opposite \\(\\angle A\\)). As specified, no piece fits. Which single change to the specification would make exactly one piece fit?",
    "Lengthen side a to 14 cm, so that a equals b and only one piece fits",
    ["Shorten side a to 7 cm, so that it sits well below the height h","Lengthen side b to 18 cm, keeping side a at 9 cm","Reduce angle A to 30 degrees, keeping both sides unchanged"],
    "At present \\(h = 14 \\times \\sin 45^\\circ \\approx 9.9\\text{ cm}\\) and \\(a = 9\\text{ cm}\\) is shorter than \\(h\\), so no piece fits. Lengthening \\(a\\) to \\(14\\text{ cm}\\) makes \\(a = b\\), and whenever \\(a \\ge b\\) the side can land in only one position: exactly one piece. Shortening \\(a\\) or lengthening \\(b\\) leaves \\(a < h\\) (still none), and reducing \\(\\angle A\\) to \\(30^\\circ\\) gives \\(h = 7\\text{ cm}\\) with \\(h < a < b\\), which is the two-piece case.",
    {});}
]));
E("u1-two-lamps",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var Aang=0,b=0,c=0,a=0,Bang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Aang=ri(40,110);b=ri(10,30);c=ri(10,30);
    a=Math.sqrt(b*b+c*c-2*b*c*Math.cos(rd(Aang)));
    var s=b*Math.sin(rd(Aang))/a;if(s>=1)continue;
    Bang=Math.asin(s)*180/Math.PI;
    if(Bang<10||Bang>80)continue;
    var csB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(csB)>=1)continue;
    var Btrue=Math.acos(csB)*180/Math.PI;
    if(Math.abs(Btrue-Bang)>1)continue;
    ok=true;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("On a ground plan, a point \\(P\\) is \\("+c+"\\text{ m}\\) from one lamp and \\("+b+"\\text{ m}\\) from a second lamp, and the angle at \\(P\\) between the lines to the lamps is \\("+Aang+"^\\circ\\). Find the angle at the first lamp between the line to \\(P\\) and the line to the second lamp, to the nearest degree.",
    Math.round(Bang),0.51,
    "Step 1, the distance between the lamps, from the cosine law at \\(P\\): \\(d^2 = "+c+"^2 + "+b+"^2 - 2("+c+")("+b+")\\cos "+Aang+"^\\circ \\approx "+fmt(a*a,1)+"\\), so the lamps are \\(d \\approx "+fmt(a,1)+"\\text{ m}\\) apart. Step 2, the angle at the first lamp, from the sine law: \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+Aang+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B \\approx "+fmt(b*Math.sin(rd(Aang))/a,4)+"\\) and \\(\\angle B \\approx \\)<b>\\("+Math.round(Bang)+"^\\circ\\)</b>. The angle is acute, as the plan shows, so the acute value fits.",
    {Aang:Aang,b:b,c:c,a:a,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["P","L1","L2"],ang:[Aang+"°","?",null],side:["?",b+" m",c+" m"],rot:rot});
  return q;
});
E("u1-scaffold-bay",1,["7.2"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A=0,Btar=0,b=0,a=0,Brev=0,C=0,c=0,tries=0;
  while(tries<400){tries++;
    A=pick([55,60,65,70,75]);Btar=pick([30,35,40,45,50]);
    if(Btar>=A-10)continue;
    b=ri(3,9);
    a=Math.round(b*Math.sin(rd(A))/Math.sin(rd(Btar))*10)/10;
    if(a<=b)continue;
    var s=b*Math.sin(rd(A))/a;if(s>=1)continue;
    Brev=Math.asin(s)*180/Math.PI;
    C=180-A-Brev;
    if(C<25||C>110)continue;
    c=a*Math.sin(rd(C))/Math.sin(rd(A));
    break;
  }
  var rot=pick([9,12,15,-10,-14]);
  var q=numq("A scaffold bay forms \\(\\triangle ABC\\). A diagonal brace is side \\(a = "+fmt(a,1)+"\\text{ m}\\), opposite \\(\\angle A = "+A+"^\\circ\\), and side \\(b = "+b+"\\text{ m}\\). Find side \\(c\\), to one decimal place, in m.",
    Math.round(c*10)/10,0.06,
    "Step 1, find \\(\\angle B\\) with the sine law: \\(\\frac{\\sin B}{"+b+"} = \\frac{\\sin "+A+"^\\circ}{"+fmt(a,1)+"}\\), so \\(\\sin B \\approx "+fmt(b*Math.sin(rd(A))/a,4)+"\\) and \\(\\angle B \\approx "+fmt(Brev,1)+"^\\circ\\) (acute, and unique here because \\(a > b\\)). Step 2, the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+fmt(Brev,1)+"^\\circ \\approx "+fmt(C,1)+"^\\circ\\). Step 3, side \\(c\\) from the same sine law proportion: \\(c = \\frac{"+fmt(a,1)+" \\times \\sin "+fmt(C,1)+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(c,1)+"\\text{ m}\\)</b>.",
    {A:A,a:a,b:b,Brev:Brev,C:C,rot:rot});
  q.figure=triRotSVG(a,b,c,{L:["A","B","C"],ang:[A+"°","?",null],side:[fmt(a,1)+" m",b+" m","?"],rot:rot});
  return q;
});

// Math 2201 Unit 1, indicator 7.3 enrichment batch C (November 2026):
// "Solve a contextual problem that involves more than one triangle."
// Seventeen new generated entries with genuinely different two-triangle
// structures (shared-side chains, cevian splits, SSS-then-SAS, an SSA
// ambiguous-case chain, a two-stage height, and perimeter / angle-sum
// composites). Figures are drawn from each entry's own drawn values:
// chain entries use chainTriSVG (slanted, asked side hidden), split
// entries use splitTriSVG (slanted), level entries use twoTriSVG.
// CR marks suggested for the numeric (constructed-response) entries:
// CRMARKS: u1-shared-side-intro=3
// CRMARKS: u1-kite-frame-chain=3
// CRMARKS: u1-river-chain=3
// CRMARKS: u1-headland-boats=3
// CRMARKS: u1-bisector-post=3
// CRMARKS: u1-truss-diagonal=3
// CRMARKS: u1-island-route=3
// CRMARKS: u1-drone-split=3
// CRMARKS: u1-race-course=3
// CRMARKS: u1-survey-network=4
// CRMARKS: u1-two-stage-height=4
// CRMARKS: u1-regatta-chain=4
// CRMARKS: u1-quad-perimeter=3
// CRMARKS: u1-offset-angle=3
// (u1-double-plot, u1-farm-lanes and u1-harbour-chain are multiple
// choice, so no CR marks are suggested for them.)
E("u1-shared-side-intro",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,tries=0;
  do{
    AB=ri(15,22);BC=ri(10,16);angB=pick([58,64,70,76]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([46,52,58]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angACD>=34&&AC>6&&CD>4&&AD>4)&&tries<400);
  var q=numq("Two fields share a fence along the diagonal \\(AC\\). In the first field, \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the length of \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law with the shared side gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure=twoTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD);
  return q;
});
E("u1-kite-frame-chain",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,tries=0;
  do{
    AB=ri(4,8);angA=pick([42,50,58]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(3,7);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(angC>=35&&AC>2&&CD>2&&angD>20&&angD<120)&&tries<400);
  var q=numq("A large kite sail is held by a frame of two triangles that share the spine \\(AC\\). In \\(\\triangle ABC\\), the spar \\(AB = "+AB+"\\text{ m}\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), the spar \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\), the angle between the spine and \\(AD\\). Find the length of the spar \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side, the spine \\(AC\\), in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\), where the spine and \\(AD\\) meet at \\(\\angle DAC\\): the cosine law gives \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:0,hideSides:["BC","CD"],sideAC:"spine"});
  return q;
});
E("u1-double-plot",1,["7.3"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,sum,sumWrong,opts,tries=0;
  do{
    AB=ri(13,20);BC=ri(9,15);angB=pick([58,66,74]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([46,54]);angD=pick([58,66]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    sum=AC+CD;
    /* pairing slip: CD paired with sin D instead of sin DAC */
    sumWrong=AC+AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    opts=[fmt(sum,1),fmt(AC,1),fmt(CD,1),fmt(sumWrong,1)];
    tries++;
  }while(!(angACD>=40&&new Set(opts).size===4)&&tries<400);
  var q=mcq("Two adjacent triangular garden plots share the fence line \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). A gardener is replacing the edging along \\(AC\\) and along \\(CD\\). What total length of edging is needed, to one decimal place, in m?",
    fmt(sum,1)+" m",
    [fmt(AC,1)+" m",fmt(CD,1)+" m",fmt(sumWrong,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then the sine law in \\(\\triangle ACD\\) gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(CD,2)+"\\text{ m}\\). The total edging is \\("+fmt(AC,2)+" + "+fmt(CD,2)+" \\approx \\)<b>\\("+fmt(sum,1)+"\\text{ m}\\)</b>. Stopping after either triangle gives only one of the two lengths.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure=twoTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD);
  return q;
});
E("u1-river-chain",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,angDAC,angD,angACD,CD,AD,rot,tries=0;
  do{
    AB=ri(28,55);angA=pick([38,46,54]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    angDAC=pick([44,52,60]);angD=pick([58,66,74]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angC>=35&&angACD>=32&&AC>10&&CD>5&&AD>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("Points \\(A\\) and \\(B\\) are on one bank of a river, \\(AB = "+AB+"\\text{ m}\\) apart. Point \\(C\\) is on the far bank and point \\(D\\) is also on the near bank. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the distance \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law with the shared side gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["BC","CD","AD"]});
  return q;
});
E("u1-headland-boats",1,["7.3"],2,"gen",function(){
  /* Figure: chainTriSVG (the two boats and the marker/headland form a
     chain of two triangles sharing AC, not a cevian split). */
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,rot,tries=0;
  do{
    AB=ri(30,60);BC=ri(25,50);angB=pick([62,70,78]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([44,52,60]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    tries++;
  }while(!(angACD>=34&&AC>10&&CD>5&&AD>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("In the diagram, \\(A\\) is a harbour marker, \\(B\\) is a headland point, \\(C\\) is a first boat and \\(D\\) is a second boat. The marker is \\("+AB+"\\text{ m}\\) from the headland and the headland is \\("+BC+"\\text{ m}\\) from the first boat, with \\(\\angle B = "+angB+"^\\circ\\) between those two distances. In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the distance between the two boats, \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\), the distance from the marker to the first boat, in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so the distance between the boats is \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["CD","AD"]});
  return q;
});
E("u1-bisector-post",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,BD,DC,AC,angC,AD,sinDAC,DAC,rot,tries=0;
  do{
    AB=ri(12,24);BC=ri(20,32);angB=pick([48,54,60,66]);BD=ri(6,14);DC=BC-BD;
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angC=Math.acos((BC*BC+AC*AC-AB*AB)/(2*BC*AC))*180/Math.PI;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    DAC=Math.acos((AD*AD+AC*AC-DC*DC)/(2*AD*AC))*180/Math.PI;
    sinDAC=DC*Math.sin(rd(angC))/AD;
    tries++;
  }while(!(DC>=8&&angC>=18&&angC<=75&&DAC>=20&&DAC<=78&&sinDAC>0&&sinDAC<1&&Math.abs(Math.asin(sinDAC)*180/Math.PI-DAC)<1.5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A post \\(D\\) stands on side \\(BC\\) of a triangular plot \\(ABC\\). The plot has \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). The post divides the side with \\(BD = "+BD+"\\text{ m}\\) and \\(DC = "+DC+"\\text{ m}\\). Find \\(\\angle DAC\\), to the nearest degree.",
    Math.round(DAC),0.51,
    "First work in the whole triangle \\(ABC\\): the cosine law gives \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\), and rearranging the cosine law for \\(\\angle C\\) gives \\(\\angle C \\approx "+fmt(angC,1)+"^\\circ\\). Next find the shared side \\(AD\\) in \\(\\triangle ABD\\): \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+angB+"^\\circ\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Finally, in \\(\\triangle ADC\\) the sine law pairs \\(DC\\) with \\(\\angle DAC\\) and \\(AD\\) with \\(\\angle C\\): \\(\\sin DAC = \\frac{"+DC+" \\times \\sin "+fmt(angC,1)+"^\\circ}{"+fmt(AD,2)+"} \\approx "+fmt(sinDAC,4)+"\\), and the angle is acute in the diagram, so \\(\\angle DAC \\approx \\)<b>\\("+Math.round(DAC)+"^\\circ\\)</b>.",
    {AB:AB,BC:BC,angB:angB,BD:BD,DC:DC,AC:AC,angC:angC,AD:AD,rot:rot});
  q.figure=splitTriSVG(BC,AC,AB,BD/BC,{L:["A","B","C"],DL:"D",angB:angB+"\u00B0",sideA1:BD+" m",sideA2:DC+" m",sideC:AB+" m",sideAD:"AD",rot:rot});
  return q;
});
E("u1-truss-diagonal",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,CA,BD,DC,angB,AD,rot,tries=0;
  do{
    AB=ri(10,22);BC=ri(10,22);CA=ri(10,22);BD=ri(5,14);
    angB=Math.acos((AB*AB+BC*BC-CA*CA)/(2*AB*BC))*180/Math.PI;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    DC=BC-BD;
    tries++;
  }while(!(Math.abs(AB-BC)<CA&&CA<AB+BC&&BD<BC-3&&angB>=25&&angB<=120&&AD>3)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A truss panel \\(ABC\\) has members \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(CA = "+CA+"\\text{ m}\\). A brace runs from \\(A\\) to a point \\(D\\) on \\(BC\\), with \\(BD = "+BD+"\\text{ m}\\). Find the length of the brace \\(AD\\), to one decimal place, in m.",
    Math.round(AD*10)/10,0.06,
    "First find the angle at the shared vertex \\(B\\) from the three members of \\(\\triangle ABC\\) (cosine law rearranged): \\(\\cos B = \\frac{"+AB+"^2 + "+BC+"^2 - "+CA+"^2}{2("+AB+")("+BC+")}\\), so \\(\\angle B \\approx "+fmt(angB,1)+"^\\circ\\). Then work in \\(\\triangle ABD\\), which uses that angle between \\(AB\\) and \\(BD\\): \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+fmt(angB,1)+"^\\circ\\), so the brace is \\(AD \\approx \\)<b>\\("+fmt(AD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,CA:CA,BD:BD,angB:angB,rot:rot});
  q.figure=splitTriSVG(BC,CA,AB,BD/BC,{L:["A","B","C"],DL:"D",sideC:AB+" m",sideB:CA+" m",sideA1:BD+" m",rot:rot});
  return q;
});
E("u1-island-route",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,rot,tries=0;
  do{
    AB=ri(70,130);angA=pick([36,44,52]);angB=pick([54,62,70]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(60,120);angDAC=pick([46,54,62]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(angC>=35&&AC>20&&CD>20&&angD>20&&angD<120)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("In the diagram, \\(A\\) is a harbour, \\(B\\) is a beacon, \\(C\\) is a first island and \\(D\\) is a second island. The beacon is \\("+AB+"\\text{ m}\\) from the harbour. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), the harbour is \\("+AD+"\\text{ m}\\) from the second island and \\(\\angle DAC = "+angDAC+"^\\circ\\). Find the distance \\(CD\\) between the two islands, to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\), the harbour-to-first-island distance, in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\), where \\(AC\\) and \\(AD\\) meet at \\(\\angle DAC\\): the cosine law gives \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:rot,hideSides:["BC","CD"]});
  return q;
});
E("u1-drone-split",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angBAD,angDAC,angB,angADB,angADC,angC,AD,DC,BD,aSide,bSide,rot,tries=0;
  do{
    AB=ri(20,45);angBAD=pick([24,30,36]);angDAC=pick([22,28,34]);angB=pick([34,42,50]);
    angADB=180-angBAD-angB;
    AD=AB*Math.sin(rd(angB))/Math.sin(rd(angADB));
    angADC=180-angADB;angC=180-angADC-angDAC;
    DC=AD*Math.sin(rd(angDAC))/Math.sin(rd(angC));
    BD=AB*Math.sin(rd(angBAD))/Math.sin(rd(angADB));
    aSide=AB*Math.sin(rd(angBAD+angDAC))/Math.sin(rd(angC));
    bSide=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    tries++;
  }while(!(angADB>=70&&angADB<=135&&angC>=20&&angC<=70&&DC>4&&Math.abs(BD+DC-aSide)<0.05*aSide)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A drone survey marks a triangular field \\(ABC\\) with a marker \\(D\\) on side \\(BC\\). From \\(A\\), the two parts of the angle are \\(\\angle BAD = "+angBAD+"^\\circ\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). Side \\(AB = "+AB+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). Find the distance \\(DC\\) along the boundary, to one decimal place, in m.",
    Math.round(DC*10)/10,0.06,
    "First work in \\(\\triangle ABD\\): its third angle is \\(\\angle ADB = 180^\\circ - "+angBAD+"^\\circ - "+angB+"^\\circ = "+angADB+"^\\circ\\), and the sine law gives the shared side \\(AD\\): \\(\\frac{AD}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angADB+"^\\circ}\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Then work in \\(\\triangle ADC\\): \\(\\angle ADC = 180^\\circ - "+angADB+"^\\circ = "+angADC+"^\\circ\\) (a straight line at \\(D\\)), so \\(\\angle C = 180^\\circ - "+angADC+"^\\circ - "+angDAC+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{DC}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AD,2)+"}{\\sin "+angC+"^\\circ}\\), so \\(DC \\approx \\)<b>\\("+fmt(DC,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angBAD:angBAD,angDAC:angDAC,angB:angB,AD:AD,rot:rot});
  q.figure=splitTriSVG(aSide,bSide,AB,BD/aSide,{L:["A","B","C"],DL:"D",angA1:angBAD+"\u00B0",angA2:angDAC+"\u00B0",angB:angB+"\u00B0",sideC:AB+" m",rot:rot});
  return q;
});
E("u1-farm-lanes",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,dSine,dPair,opts,tries=0;
  do{
    AB=ri(18,30);angA=pick([38,46,54]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(16,28);angDAC=pick([46,54,62]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    /* sine-ratio slip: AC treated as a hypotenuse, CD = AC sin(DAC) */
    dSine=AC*Math.sin(rd(angDAC));
    /* pairing slip: the sines of DAC and D swapped in the sine law */
    dPair=AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    opts=[fmt(CD,1),fmt(AC,1),fmt(dSine,1),fmt(dPair,1)];
    tries++;
  }while(!(angC>=35&&CD>5&&angD>20&&angD<120&&new Set(opts).size===4)&&tries<400);
  var q=mcq("Two farm fields share a lane along the diagonal \\(AC\\). In the first field, \\(\\triangle ABC\\), a lane \\(AB = "+AB+"\\text{ m}\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), a lane \\(AD = "+AD+"\\text{ m}\\) meets the diagonal at \\(\\angle DAC = "+angDAC+"^\\circ\\). A culvert is to run along \\(CD\\). How long is the culvert, to one decimal place, in m?",
    fmt(CD,1)+" m",
    [fmt(AC,1)+" m",fmt(dSine,1)+" m",fmt(dPair,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): \\(AC\\) and \\(AD\\) are two sides with the included angle \\(\\angle DAC\\) between them, so this is a cosine-law stage, not a sine-law one: \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), giving \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:0,hideSides:["BC","CD"]});
  return q;
});
E("u1-race-course",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,angDAC,angD,angACD,CD,AD,total,rot,tries=0;
  do{
    AB=ri(60,110);angA=pick([34,42,50]);angB=pick([56,64,72]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    angDAC=pick([46,54]);angD=pick([60,68]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    total=AC+CD;
    tries++;
  }while(!(angC>=35&&angACD>=40&&AC>20&&CD>10&&AD>10)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A sailing course is marked in the diagram: \\(A\\) is the first buoy, \\(B\\) is the start, \\(C\\) is the second buoy and \\(D\\) is the finish. The start is \\("+AB+"\\text{ m}\\) from the first buoy. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the total distance sailed on the two legs from buoy to buoy and then to the finish, \\(AC + CD\\), to one decimal place, in m.",
    Math.round(total*10)/10,0.06,
    "First find the shared side \\(AC\\), the buoy-to-buoy leg, in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{"+fmt(AC,2)+"}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(CD,2)+"\\text{ m}\\). The total of the two legs is \\("+fmt(AC,2)+" + "+fmt(CD,2)+" \\approx \\)<b>\\("+fmt(total,1)+"\\text{ m}\\)</b>.",
    {AB:AB,angA:angA,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["BC","CD","AD"]});
  return q;
});
E("u1-survey-network",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,BAC,CD,AD,CAD,angD,BAD,rot,tries=0;
  do{
    AB=ri(14,24);BC=ri(10,20);angB=pick([58,66,74]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    BAC=Math.acos((AB*AB+AC*AC-BC*BC)/(2*AB*AC))*180/Math.PI;
    CD=ri(12,22);AD=ri(12,22);
    CAD=Math.acos((AC*AC+AD*AD-CD*CD)/(2*AC*AD))*180/Math.PI;
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    BAD=BAC+CAD;
    tries++;
  }while(!(Math.abs(CD-AD)<AC&&AC<CD+AD&&BAC>=20&&BAC<=75&&CAD>=25&&CAD<=80&&BAD<165&&angD>20&&angD<130)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A survey network is a quadrilateral \\(ABCD\\) split by the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(CD = "+CD+"\\text{ m}\\) and \\(AD = "+AD+"\\text{ m}\\). Find the full angle of the quadrilateral at \\(A\\), \\(\\angle BAD\\), to the nearest degree.",
    Math.round(BAD),0.51,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). The part of the angle above the diagonal comes from the same triangle: \\(\\cos BAC = \\frac{"+AB+"^2 + "+fmt(AC,2)+"^2 - "+BC+"^2}{2("+AB+")("+fmt(AC,2)+")}\\), so \\(\\angle BAC \\approx "+fmt(BAC,1)+"^\\circ\\). Then work in \\(\\triangle ACD\\), which is SSS once \\(AC\\) is known: \\(\\cos CAD = \\frac{"+fmt(AC,2)+"^2 + "+AD+"^2 - "+CD+"^2}{2("+fmt(AC,2)+")("+AD+")}\\), so \\(\\angle CAD \\approx "+fmt(CAD,1)+"^\\circ\\). The full angle is the sum of the two parts: \\("+fmt(BAC,1)+"^\\circ + "+fmt(CAD,1)+"^\\circ \\approx \\)<b>\\("+Math.round(BAD)+"^\\circ\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,CD:CD,AD:AD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,Math.round(CAD),Math.round(angD),{rot:rot});
  return q;
});
E("u1-two-stage-height",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var PQ,angP,angQ,angT,QT,PT,elev,h,rot,tries=0;
  do{
    PQ=ri(30,60);angP=pick([28,36,44]);angQ=pick([58,66,74]);angT=180-angP-angQ;
    QT=PQ*Math.sin(rd(angP))/Math.sin(rd(angT));
    PT=PQ*Math.sin(rd(angQ))/Math.sin(rd(angT));
    elev=pick([38,46,54]);
    h=QT*Math.tan(rd(elev));
    tries++;
  }while(!(angP<angQ&&angT>=35&&QT>8&&h>5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("On a map, two observation points \\(P\\) and \\(Q\\) are \\("+PQ+"\\text{ m}\\) apart, and \\(T\\) is the base of a tower. In the map triangle \\(PQT\\), \\(\\angle P = "+angP+"^\\circ\\) and \\(\\angle Q = "+angQ+"^\\circ\\), so \\(Q\\) is the nearer point to the base. From \\(Q\\), the angle of elevation to the top of the tower is \\("+elev+"^\\circ\\). Find the height of the tower, to one decimal place, in m.",
    Math.round(h*10)/10,0.06,
    "First find the ground distance from the nearer point to the base, \\(QT\\), in the map triangle: its third angle is \\(180^\\circ - "+angP+"^\\circ - "+angQ+"^\\circ = "+angT+"^\\circ\\), and the sine law gives \\(\\frac{QT}{\\sin "+angP+"^\\circ} = \\frac{"+PQ+"}{\\sin "+angT+"^\\circ}\\), so \\(QT \\approx "+fmt(QT,2)+"\\text{ m}\\). Then use the angle of elevation from \\(Q\\) in the right triangle at the tower: \\(\\tan "+elev+"^\\circ = \\frac{h}{"+fmt(QT,2)+"}\\), so \\(h = "+fmt(QT,2)+" \\times \\tan "+elev+"^\\circ \\approx \\)<b>\\("+fmt(h,1)+"\\text{ m}\\)</b>.",
    {PQ:PQ,angP:angP,angQ:angQ,QT:QT,elev:elev,rot:rot});
  q.figure=triRotSVG(QT,PT,PQ,{L:["P","Q","T"],ang:[angP+"\u00B0",angQ+"\u00B0",null],side:["?",null,PQ+" m"],rot:rot});
  return q;
});
E("u1-regatta-chain",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var angA,AB,BC,h,sinC,C1,C2,B1,B2,AC1,AC2,AD,angDAC,CD,angD,tries=0;
  do{
    angA=pick([38,42,46,50]);AB=ri(20,32);h=AB*Math.sin(rd(angA));
    BC=ri(Math.ceil(h)+3,AB-2);
    sinC=AB*Math.sin(rd(angA))/BC;
    C1=Math.asin(sinC)*180/Math.PI;C2=180-C1;
    B1=180-angA-C1;B2=180-angA-C2;
    AC1=BC*Math.sin(rd(B1))/Math.sin(rd(angA));
    AC2=BC*Math.sin(rd(B2))/Math.sin(rd(angA));
    AD=ri(16,30);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC1*AC1+AD*AD-2*AC1*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC1*AC1)/(2*AD*CD))*180/Math.PI;
    tries++;
  }while(!(sinC<1&&B2>=12&&AC1-AC2>=4&&CD>5&&angD>20&&angD<120)&&tries<400);
  var q=numq("In a regatta, \\(A\\) is the start boat, \\(B\\) is a first marker, \\(C\\) is a second marker and \\(D\\) is the finish marker. In \\(\\triangle ABC\\), \\(\\angle BAC = "+angA+"^\\circ\\), \\(AB = "+AB+"\\text{ m}\\) and \\(BC = "+BC+"\\text{ m}\\). The second marker lies beyond the first, so \\(AC\\) is the longer of the two distances that fit this data. In \\(\\triangle ACD\\), \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). Find the distance \\(CD\\) from the second marker to the finish, to one decimal place, in m.",
    Math.round(CD*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\). This is the ambiguous case: \\(\\sin C = \\frac{"+AB+" \\times \\sin "+angA+"^\\circ}{"+BC+"} \\approx "+fmt(sinC,4)+"\\), giving \\(\\angle C \\approx "+fmt(C1,1)+"^\\circ\\) or \\("+fmt(C2,1)+"^\\circ\\). The two matching lengths are \\(AC \\approx "+fmt(AC1,2)+"\\text{ m}\\) and \\(AC \\approx "+fmt(AC2,2)+"\\text{ m}\\). The prompt states the second marker lies beyond the first, so take the longer shared side, \\(AC \\approx "+fmt(AC1,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\) with the cosine law: \\(CD^2 = "+fmt(AC1,2)+"^2 + "+AD+"^2 - 2("+fmt(AC1,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), so \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>.",
    {angA:angA,AB:AB,BC:BC,AC1:AC1,AC2:AC2,AD:AD,angDAC:angDAC});
  q.figure=twoTriSVG(AB,BC,Math.round(B1),AC1,CD,AD,angDAC,Math.round(angD));
  return q;
});
E("u1-quad-perimeter",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BC,angB,AC,angDAC,angD,angACD,CD,AD,per,rot,tries=0;
  do{
    AB=ri(16,26);BC=ri(12,22);angB=pick([60,70,80]);
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    angDAC=pick([42,50,58]);angD=pick([56,64,72]);angACD=180-angDAC-angD;
    CD=AC*Math.sin(rd(angDAC))/Math.sin(rd(angD));
    AD=AC*Math.sin(rd(angACD))/Math.sin(rd(angD));
    per=AB+BC+CD+AD;
    tries++;
  }while(!(angACD>=32&&AC>8&&CD>4&&AD>4)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("A quadrilateral plot \\(ABCD\\) is split by the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the perimeter of the quadrilateral, to one decimal place, in m.",
    Math.round(per*10)/10,0.06,
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\) with the cosine law: \\(AC^2 = "+AB+"^2 + "+BC+"^2 - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law gives both outer sides, \\(CD = "+fmt(AC,2)+" \\times \\frac{\\sin "+angDAC+"^\\circ}{\\sin "+angD+"^\\circ} \\approx "+fmt(CD,2)+"\\text{ m}\\) and \\(AD = "+fmt(AC,2)+" \\times \\frac{\\sin "+angACD+"^\\circ}{\\sin "+angD+"^\\circ} \\approx "+fmt(AD,2)+"\\text{ m}\\). The diagonal is inside the plot and is not part of the perimeter, so the perimeter is \\("+AB+" + "+BC+" + "+fmt(CD,2)+" + "+fmt(AD,2)+" \\approx \\)<b>\\("+fmt(per,1)+"\\text{ m}\\)</b>.",
    {AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,angD,{rot:rot,hideSides:["CD","AD"]});
  return q;
});
E("u1-offset-angle",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,BD,angB,DC,BC,AC,AD,ADB,ADC,sinADB,acute,rot,tries=0;
  do{
    AB=ri(18,28);BD=ri(6,12);angB=pick([35,45,55]);DC=ri(10,18);BC=BD+DC;
    AD=Math.sqrt(AB*AB+BD*BD-2*AB*BD*Math.cos(rd(angB)));
    ADB=Math.acos((AD*AD+BD*BD-AB*AB)/(2*AD*BD))*180/Math.PI;
    ADC=180-ADB;
    AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(rd(angB)));
    sinADB=AB*Math.sin(rd(angB))/AD;
    acute=Math.asin(Math.min(1,sinADB))*180/Math.PI;
    tries++;
  }while(!(ADB>95&&ADB<145&&ADC>=35&&ADC<=85&&Math.abs(acute-ADC)<1.5)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=numq("Point \\(D\\) lies on side \\(BC\\) of \\(\\triangle ABC\\), offset from the midpoint. In \\(\\triangle ABD\\), \\(AB = "+AB+"\\text{ m}\\), \\(BD = "+BD+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). Find \\(\\angle ADC\\), to the nearest degree.",
    Math.round(ADC),0.51,
    "First find the shared side \\(AD\\) in \\(\\triangle ABD\\) with the cosine law: \\(AD^2 = "+AB+"^2 + "+BD+"^2 - 2("+AB+")("+BD+")\\cos "+angB+"^\\circ\\), so \\(AD \\approx "+fmt(AD,2)+"\\text{ m}\\). Then the sine law in the same triangle gives \\(\\sin ADB = \\frac{"+AB+" \\times \\sin "+angB+"^\\circ}{"+fmt(AD,2)+"} \\approx "+fmt(sinADB,4)+"\\). The inverse sine returns \\("+fmt(acute,1)+"^\\circ\\), but the two candidates for \\(\\angle ADB\\) are that angle and its supplement, and the position of \\(D\\) makes \\(\\angle ADB\\) obtuse (check: \\(AD^2 + BD^2 < AB^2\\)), so \\(\\angle ADB = 180^\\circ - "+fmt(acute,1)+"^\\circ \\approx "+fmt(ADB,1)+"^\\circ\\). Since \\(B\\), \\(D\\) and \\(C\\) are on a straight line, \\(\\angle ADC = 180^\\circ - "+fmt(ADB,1)+"^\\circ \\approx \\)<b>\\("+Math.round(ADC)+"^\\circ\\)</b>.",
    {AB:AB,BD:BD,angB:angB,AD:AD,ADB:ADB,rot:rot});
  q.figure=splitTriSVG(BC,AC,AB,BD/BC,{L:["A","B","C"],DL:"D",angB:angB+"\u00B0",sideC:AB+" m",sideA1:BD+" m",rot:rot});
  return q;
});
E("u1-harbour-chain",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var AB,angA,angB,angC,AC,BC,AD,angDAC,CD,angD,dSine,dSwap,opts,rot,tries=0;
  do{
    AB=ri(35,60);angA=pick([40,48,56]);angB=pick([58,66,74]);angC=180-angA-angB;
    AC=AB*Math.sin(rd(angB))/Math.sin(rd(angC));
    BC=AB*Math.sin(rd(angA))/Math.sin(rd(angC));
    AD=ri(30,55);angDAC=pick([48,56,64]);
    CD=Math.sqrt(AC*AC+AD*AD-2*AC*AD*Math.cos(rd(angDAC)));
    angD=Math.acos((AD*AD+CD*CD-AC*AC)/(2*AD*CD))*180/Math.PI;
    /* sine-law pairing slip in stage 2: the sines of DAC and D swapped */
    dSine=AC*Math.sin(rd(angD))/Math.sin(rd(angDAC));
    /* sides swapped in stage 2: AD used in place of the shared side AC */
    dSwap=Math.sqrt(AD*AD+AD*AD-2*AD*AD*Math.cos(rd(angDAC)));
    opts=[fmt(CD,1),fmt(AC,1),fmt(dSine,1),fmt(dSwap,1)];
    tries++;
  }while(!(angC>=32&&CD>8&&angD>20&&angD<120&&new Set(opts).size===4)&&tries<400);
  rot=pick([9,12,15,-10,-14]);
  var q=mcq("A harbour chain is surveyed in two triangles that share the side \\(AC\\). In \\(\\triangle ABC\\), \\(A\\) is the harbour entrance, \\(B\\) is a beacon \\("+AB+"\\text{ m}\\) from the entrance, \\(\\angle BAC = "+angA+"^\\circ\\) and \\(\\angle B = "+angB+"^\\circ\\). In \\(\\triangle ACD\\), \\(D\\) is a lighthouse, \\(AD = "+AD+"\\text{ m}\\) and \\(\\angle DAC = "+angDAC+"^\\circ\\). What is the distance \\(CD\\) from the pier point \\(C\\) to the lighthouse, to one decimal place, in m?",
    fmt(CD,1)+" m",
    [fmt(AC,1)+" m",fmt(dSine,1)+" m",fmt(dSwap,1)+" m"],
    "First find the shared side \\(AC\\) in \\(\\triangle ABC\\): the third angle is \\(180^\\circ - "+angA+"^\\circ - "+angB+"^\\circ = "+angC+"^\\circ\\), and the sine law gives \\(\\frac{AC}{\\sin "+angB+"^\\circ} = \\frac{"+AB+"}{\\sin "+angC+"^\\circ}\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Then work in \\(\\triangle ACD\\): the shared side and \\(AD\\) meet at the included angle \\(\\angle DAC\\), so the cosine law applies: \\(CD^2 = "+fmt(AC,2)+"^2 + "+AD+"^2 - 2("+fmt(AC,2)+")("+AD+")\\cos "+angDAC+"^\\circ\\), giving \\(CD \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>. The shared side alone is only the first stage, and a sine-law pairing in the second triangle pairs a side with an angle that is not opposite it.",
    {AB:AB,angA:angA,angB:angB,AC:AC,AD:AD,angDAC:angDAC,rot:rot});
  q.figure=chainTriSVG(AB,BC,angB,AC,CD,AD,angDAC,Math.round(angD),{rot:rot,hideSides:["BC","CD"]});
  return q;
});

// Math 2201 Unit 1 prior-knowledge bank, batch D (authored new, November 2026).
// Right-triangle prerequisite items (feeder skills from Math 1201 Unit 7),
// flagged PK for Math 2201 Unit 1. Entries by group:
//   trig-sides (Level 1, ["7.1"]):
//     u1-pk-role-from-diagram, u1-pk-hypotenuse-pick, u1-pk-opposite-read,
//     u1-pk-two-angles-roles, u1-pk-role-value, u1-pk-role-words
//   trig-ratios (Level 1, ["7.2"]):
//     u1-pk-ratio-from-figure, u1-pk-ratio-equation, u1-pk-find-hypotenuse,
//     u1-pk-angle-from-legs, u1-pk-ratio-letters, u1-pk-other-angle-ratio,
//     u1-pk-ratio-decimal, u1-pk-angle-from-value, u1-pk-ratio-unreduced
//   pythagoras (Level 1, ["7.2"]):
//     u1-pk-diag-num, u1-pk-leg-num, u1-pk-point-distance,
//     u1-pk-right-check, u1-pk-screen-size, u1-pk-shortcut-saving
//   solve-triangle (Level 2, ["7.2"]):
//     u1-pk-solve-perimeter, u1-pk-solve-second-leg,
//     u1-pk-solve-isosceles, u1-pk-solve-scene
//   trig-context (Level 2, ["7.2"]):
//     u1-pk-elevation-height, u1-pk-depression-distance, u1-pk-shadow-angle,
//     u1-pk-ramp-length, u1-pk-ladder-reach, u1-pk-wire-length,
//     u1-pk-tree-distance, u1-pk-slide-angle
// Entry 5 note: u1-pk-role-value uses the scene form (flagpole / tent pole /
// mast with a wire or cable to a ground anchor; options are the scene parts
// and the question asks which part is adjacent to the angle at the anchor),
// because the pure-roles numeric form collapses into u1-pk-opposite-read.

/* ================= trig-sides ================= */
E("u1-pk-role-from-diagram", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,3);
  var swap=pick([true,false]);
  var legA=(swap?t[1]:t[0])*k, legB=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var marked=pick([X,Y]),other=(marked===X?Y:X);
  var hypN=u7side(X,Y),oppM=u7side(other,R),adjM=u7side(marked,R);
  var ask=pick(["hyp","opp","adj"]);
  var key,ds,sol;
  if(ask==="hyp"){
    key="Side "+hypN+" is the hypotenuse";
    ds=["Side "+adjM+" is the hypotenuse","Side "+oppM+" is the hypotenuse","Side "+hypN+" is opposite angle "+marked];
    sol="The hypotenuse is the side opposite the right angle at "+R+"; it joins "+X+" and "+Y+", so it is <b>side "+hypN+"</b>. (Relative to angle "+marked+", side "+oppM+" is opposite and side "+adjM+" is adjacent.)";
  }else if(ask==="opp"){
    key="Side "+oppM+" is opposite angle "+marked;
    ds=["Side "+adjM+" is opposite angle "+marked,"Side "+oppM+" is adjacent to angle "+marked,"Side "+hypN+" is opposite angle "+marked];
    sol="The side opposite angle "+marked+" does not touch angle "+marked+"; it joins "+other+" and "+R+", so it is <b>side "+oppM+"</b>. Side "+adjM+" touches angle "+marked+", so it is the adjacent side, and side "+hypN+" is the hypotenuse.";
  }else{
    key="Side "+adjM+" is adjacent to angle "+marked;
    ds=["Side "+oppM+" is adjacent to angle "+marked,"Side "+adjM+" is opposite angle "+marked,"Side "+hypN+" is adjacent to angle "+marked];
    sol="The side adjacent to angle "+marked+" forms that angle together with the hypotenuse; it joins "+marked+" and "+R+", so it is <b>side "+adjM+"</b>. Side "+oppM+" does not touch angle "+marked+", so it is the opposite side.";
  }
  var askText=(ask==="hyp"?"identifies the hypotenuse":ask==="opp"?"identifies the side opposite angle "+marked:"identifies the side adjacent to angle "+marked);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+". Angle "+marked+" is marked. Which statement correctly "+askText+"?",
    key,ds,
    "In triangle "+X+Y+R+" the right angle is at "+R+". "+sol,
    {X:X,Y:Y,R:R,marked:marked,ask:ask,keyText:key});
  q.figure=triRotSVG(legA,legB,hyp,{L:[X,Y,R],ang:angLab,side:[u7side(Y,R),u7side(X,R),u7side(X,Y)],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-hypotenuse-pick", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names();
  var perm=pick([[0,1,2],[2,0,1],[1,2,0]]);
  var L=[ns[perm[0]],ns[perm[1]],ns[perm[2]]],RA=L[2];
  var t=pick(U7_TRIPLES),k=ri(1,3);
  var swap=pick([true,false]);
  var legA=(swap?t[1]:t[0])*k, legB=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var hypN=u7side(L[0],L[1]),legN1=u7side(L[1],L[2]),legN2=u7side(L[2],L[0]);
  var mi=pick([0,1]),marked=L[mi];
  var angLab=[null,null,null];angLab[mi]=marked;
  var key="Side "+hypN;
  var q=mcq("The diagram shows a right triangle "+L[0]+L[1]+L[2]+" with the right angle at "+RA+". Angle "+marked+" is marked. Which side is the hypotenuse?",
    key,
    ["Side "+legN1,"Side "+legN2,"The side opposite the marked angle"],
    "The hypotenuse is the side opposite the right angle. The right angle is at "+RA+", and the side that does not touch "+RA+" joins "+L[0]+" and "+L[1]+", so the hypotenuse is <b>side "+hypN+"</b>. The side opposite the marked angle "+marked+" is a leg, not the hypotenuse.",
    {L0:L[0],L1:L[1],RA:RA,marked:marked,keyText:key});
  q.figure=triRotSVG(legA,legB,hyp,{L:L,ang:angLab,side:[legN1,legN2,hypN],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-opposite-read", 1, ["7.1"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
  var legA=t[0]*k, legB=t[1]*k, hyp=t[2]*k;
  var marked=pick([X,Y]);
  var oppLen=(marked===X?legA:legB), adjLen=(marked===X?legB:legA);
  var unit=pick(["cm","m"]);
  var angLab=[null,null,null];angLab[marked===X?0:1]=marked;
  var key=oppLen+" "+unit;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+" and one acute angle marked. What is the length of the side opposite the marked angle?",
    key,
    [adjLen+" "+unit,hyp+" "+unit,(legA+legB)+" "+unit],
    "The side opposite the marked angle is the side that does not touch that angle. In the diagram its label reads <b>"+oppLen+" "+unit+"</b>. (The side of length "+adjLen+" "+unit+" touches the marked angle, so it is adjacent, and the side of length "+hyp+" "+unit+" is the hypotenuse.)",
    {X:X,Y:Y,R:R,marked:marked,oppLen:oppLen,adjLen:adjLen,hyp:hyp});
  q.figure=triRotSVG(legA,legB,hyp,{L:[X,Y,R],ang:angLab,side:[legA+" "+unit,legB+" "+unit,hyp+" "+unit],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-two-angles-roles", 1, ["7.1"], 1, "var", varset([
  function(){
    var key="Angle P: opposite side QR, adjacent side PR. Angle Q: opposite side PR, adjacent side QR.";
    var q=mcq("In right triangle PQR, the right angle is at R. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle P: opposite side PR, adjacent side QR. Angle Q: opposite side PR, adjacent side QR.",
       "Angle P: opposite side QR, adjacent side PR. Angle Q: opposite side QR, adjacent side PR.",
       "Angle P: opposite side PR, adjacent side QR. Angle Q: opposite side QR, adjacent side PR."],
      "For angle P, the side that does not touch P is QR, so QR is opposite P, and the leg that forms P with the hypotenuse is PR, so PR is adjacent to P. For angle Q the roles reverse: the side that does not touch Q is PR (opposite Q) and the leg forming Q is QR (adjacent to Q). So the correct statement gives <b>opposite QR and adjacent PR for P, and opposite PR and adjacent QR for Q</b>.",
      {variant:1});
    q.figure=triSVG(4,3,5,{L:["P","Q","R"],ang:["P","Q",null],side:["QR","PR","PQ"]});
    return q;
  },
  function(){
    var key="Angle D: opposite side EF, adjacent side DF. Angle E: opposite side DF, adjacent side EF.";
    var q=mcq("In right triangle DEF, the right angle is at F. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle D: opposite side DF, adjacent side EF. Angle E: opposite side DF, adjacent side EF.",
       "Angle D: opposite side EF, adjacent side DF. Angle E: opposite side EF, adjacent side DF.",
       "Angle D: opposite side DF, adjacent side EF. Angle E: opposite side EF, adjacent side DF."],
      "For angle D, the side that does not touch D is EF, so EF is opposite D, and the leg that forms D with the hypotenuse is DF, so DF is adjacent to D. For angle E the roles reverse: the side that does not touch E is DF (opposite E) and the leg forming E is EF (adjacent to E). So the correct statement gives <b>opposite EF and adjacent DF for D, and opposite DF and adjacent EF for E</b>.",
      {variant:2});
    q.figure=triSVG(3,4,5,{L:["D","E","F"],ang:["D","E",null],side:["EF","DF","DE"]});
    return q;
  },
  function(){
    var key="Angle T: opposite side SU, adjacent side TU. Angle S: opposite side TU, adjacent side SU.";
    var q=mcq("In right triangle STU, the right angle is at U. Which statement correctly gives the opposite and adjacent sides for both acute angles?",
      key,
      ["Angle T: opposite side TU, adjacent side SU. Angle S: opposite side TU, adjacent side SU.",
       "Angle T: opposite side SU, adjacent side TU. Angle S: opposite side SU, adjacent side TU.",
       "Angle T: opposite side TU, adjacent side SU. Angle S: opposite side SU, adjacent side TU."],
      "For angle T, the side that does not touch T is SU, so SU is opposite T, and the leg that forms T with the hypotenuse is TU, so TU is adjacent to T. For angle S the roles reverse: the side that does not touch S is TU (opposite S) and the leg forming S is SU (adjacent to S). So the correct statement gives <b>opposite SU and adjacent TU for T, and opposite TU and adjacent SU for S</b>.",
      {variant:3});
    q.figure=triSVG(4,3,5,{L:["S","T","U"],ang:["S","T",null],side:["TU","SU","ST"]});
    return q;
  }
]));
E("u1-pk-role-value", 1, ["7.1"], 1, "gen", function(){
  var sc=pick([
    {stem:"A guy wire runs from the top of a flagpole to an anchor in level ground. At the anchor, the wire makes an angle with the ground.",key:"the ground between the pole and the anchor",slant:"the guy wire",vert:"the flagpole"},
    {stem:"A guy rope runs from the top of a tent pole to a peg in level ground. At the peg, the rope makes an angle with the ground.",key:"the ground between the pole and the peg",slant:"the guy rope",vert:"the tent pole"},
    {stem:"A support cable runs from the top of a mast to an anchor in level ground. At the anchor, the cable makes an angle with the ground.",key:"the ground between the mast and the anchor",slant:"the support cable",vert:"the mast"}
  ]);
  var q=mcq(sc.stem+" The wire, the vertical member and the ground form a right triangle. Which part of the scene is the side adjacent to the angle at the anchor?",
    sc.key,
    [sc.slant,sc.vert,"the hypotenuse"],
    "The angle at the anchor is formed by two sides: the slanted member, which is the hypotenuse, and the ground. The adjacent side is the side that forms the angle together with the hypotenuse, so it is <b>"+sc.key+"</b>. The vertical member ("+sc.vert+") is the side opposite the angle at the anchor.",
    {keyText:sc.key,slant:sc.slant,vert:sc.vert});
  q.figure=u7triSceneSVG({vert:6,ground:8,slant:10,angle:"?"});
  return q;
});
E("u1-pk-role-words", 1, ["7.1"], 1, "var", varset([
  function(){return mcq("A diagonal support beam braces a vertical post against a horizontal floor. The beam, the post and the floor form a right triangle, and a horizontal rail runs from the top of the post to the wall behind it. Which part of the scene is the hypotenuse of the right triangle?",
    "the diagonal support beam",
    ["the vertical post","the floor between the post and the foot of the beam","the horizontal rail at the top of the post"],
    "The right angle sits where the vertical post meets the horizontal floor. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the diagonal support beam</b>.",{variant:1});},
  function(){return mcq("A ramp rises from a level floor to the top of a loading platform. The ramp, the vertical face of the platform and the floor form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the ramp surface",
    ["the vertical face of the platform","the floor beneath the ramp","the flat top of the platform"],
    "The right angle sits where the vertical face of the platform meets the level floor. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the ramp surface</b>.",{variant:2});},
  function(){return mcq("A ladder leans against a vertical wall, reaching a windowsill. The ladder, the wall and the ground form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the ladder",
    ["the wall","the ground between the wall and the foot of the ladder","the windowsill the ladder reaches"],
    "The right angle sits where the vertical wall meets the level ground. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the ladder</b>.",{variant:3});},
  function(){return mcq("A guy rope runs from the top of a tent pole to a peg in level ground. The rope, the pole and the ground form a right triangle. Which part of the scene is the hypotenuse of the right triangle?",
    "the guy rope",
    ["the tent pole","the ground between the pole and the peg","the tent fabric beside the pole"],
    "The right angle sits where the vertical pole meets the level ground. The hypotenuse is the side opposite that right angle, which is the slanted side of the triangle: <b>the guy rope</b>.",{variant:4});}
]));

/* ================= trig-ratios ================= */
E("u1-pk-ratio-from-figure", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den;
  if(fn==="sin"){num=opp;den=hyp;}else if(fn==="cos"){num=adj;den=hyp;}else{num=opp;den=adj;}
  var key="\\("+u7fracS(num,den)+"\\)";
  var all=[[opp,hyp],[adj,hyp],[opp,adj],[adj,opp],[hyp,opp],[hyp,adj]];
  var cands=[];
  all.forEach(function(pr){var s="\\("+u7fracS(pr[0],pr[1])+"\\)";if(s!==key)cands.push(s);});
  cands=shuffle(cands);
  var ds=u7pickS3(key,cands);
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var angLab=[null,null,null];angLab[ang===X?0:1]=ang;
  var q=mcq("The diagram shows right triangle "+X+Y+R+" with the right angle at "+R+". Angle "+ang+" is marked. What is the value of \\(\\"+fn+" "+ang+"\\)?",
    key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+": \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+(u7red(num,den)[1]===1?"":" \\\\ &= "+u7fracS(num,den))+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triRotSVG(legYR,legXR,hyp,{L:[X,Y,R],ang:angLab,side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-equation", 1, ["7.2"], 1, "gen", function(){
  var t=pick(U7_TRIPLES);
  var swap=pick([true,false]);
  var oppLeg=(swap?t[1]:t[0]), adjLeg=(swap?t[0]:t[1]), hyp0=t[2];
  var fn=pick(["sin","cos"]);
  var askedNum=(fn==="sin"?oppLeg:adjLeg), compNum=(fn==="sin"?adjLeg:oppLeg);
  var g=u7gcd(askedNum,hyp0), rn=askedNum/g, rd=hyp0/g;
  var s=ri(2,6), H=rd*s, ans=rn*s, compVal=Math.round(compNum*H/hyp0);
  var roleWord=(fn==="sin"?"opposite":"adjacent");
  var candNums=[compVal,H,rn*(s+1),rn*(s-1),ans+rn,H+rn];
  var seen={},ds=[];
  candNums.forEach(function(c){if(ds.length<3&&c>0&&c!==ans&&!seen[c]){seen[c]=1;ds.push(c+" cm");}});
  var pad=2;while(ds.length<3){var cc=ans+pad;pad++;if(!seen[cc]){seen[cc]=1;ds.push(cc+" cm");}}
  var A=pick(["P","A","K","D"]);
  var q=mcq("In a right triangle, \\(\\"+fn+" "+A+" = "+u7fracS(askedNum,hyp0)+"\\) and the hypotenuse is \\("+H+"\\) cm. How long is the side "+roleWord+" angle "+A+"?",
    ans+" cm",ds,
    "The "+(fn==="sin"?"sine":"cosine")+" ratio is "+roleWord+" over hypotenuse, so the "+roleWord+" side is the ratio times the hypotenuse: \\[ \\begin{aligned} \\text{"+roleWord+"} &= "+u7fracS(askedNum,hyp0)+" \\times "+H+" \\\\ &= "+ans+" \\end{aligned} \\] The side "+roleWord+" angle "+A+" is <b>\\("+ans+"\\) cm</b>.",
    {fn:fn,A:A,H:H,ans:ans,compVal:compVal});
  return q;
});
E("u1-pk-find-hypotenuse", 1, ["7.2"], 1, "gen", function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"), adjName=(V==="A"?"AC":"BC");
  var theta=pick(U7_ANGLES), mode=pick([1,2]);
  var given=ri(8,40), ratio, givenName, fnWord, steps;
  if(mode===1){ratio=u7sinD(theta);givenName=oppName;fnWord="\\sin";
    steps="\\sin "+theta+"^\\circ &= "+FR(given,"AB")+" \\\\ AB &= "+FR(given,"\\sin "+theta+"^\\circ");}
  else{ratio=u7cosD(theta);givenName=adjName;fnWord="\\cos";
    steps="\\cos "+theta+"^\\circ &= "+FR(given,"AB")+" \\\\ AB &= "+FR(given,"\\cos "+theta+"^\\circ");}
  var hypV=given/ratio, ans=u7r1(hypV);
  var roleText=(mode===1?"the side opposite angle "+V+", "+oppName+", is":"the side adjacent to angle "+V+", "+adjName+", is");
  var q=numq("A right triangle ABC has the right angle at C and angle "+V+" is \\("+theta+"^\\circ\\). In the triangle, "+roleText+" \\("+given+"\\) cm. Find the length of the hypotenuse AB, in centimetres, to the nearest tenth.",
    ans,0.06,
    "The known side and the hypotenuse give the "+(mode===1?"sine":"cosine")+" ratio at angle "+V+". Rearrange it for the hypotenuse: \\[ \\begin{aligned} "+steps+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the hypotenuse AB is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {mode:mode,V:V,theta:theta,given:given,ans:ans});
  var oppV=hypV*u7sinD(theta), adjV=hypV*u7cosD(theta);
  var gi=(mode===1?(V==="A"?0:1):(V==="A"?1:0));
  var sLab=[null,null,"?"];sLab[gi]=given+" cm";
  var aLab=[null,null,null];aLab[V==="A"?0:1]=theta+"°";
  q.figure=triRotSVG(V==="A"?oppV:adjV,V==="A"?adjV:oppV,hypV,{L:["A","B","C"],side:sLab,ang:aLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-angle-from-legs", 1, ["7.2"], 1, "gen", function(){
  var V=pick(["A","B"]);
  var oppName=(V==="A"?"BC":"AC"), adjName=(V==="A"?"AC":"BC");
  var opp,adj,raw,tries=0;
  do{tries++;opp=ri(4,30);adj=ri(4,30);raw=u7atanD(opp/adj);}while((raw<15||raw>75)&&tries<100);
  var ans=Math.round(raw);
  var q=numq("A right triangle ABC has the right angle at C. In the triangle, the side opposite angle "+V+", "+oppName+", is \\("+opp+"\\) cm and the side adjacent to angle "+V+", "+adjName+", is \\("+adj+"\\) cm. Give the measure of angle "+V+", in degrees, to the nearest degree.",
    ans,0.51,
    "The two known sides are the opposite and adjacent sides for angle "+V+", so use the tangent ratio and undo it with the inverse tangent: \\[ \\begin{aligned} \\tan "+V+" &= "+FR(opp,adj)+" \\\\ "+V+" &= \\tan^{-1}\\left("+FR(opp,adj)+"\\right) \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+V+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {V:V,opp:opp,adj:adj,ans:ans});
  var bcLen=(V==="A"?opp:adj), acLen=(V==="A"?adj:opp);
  var hypV=Math.sqrt(opp*opp+adj*adj);
  var aLab=[null,null,null];aLab[V==="A"?0:1]="?";
  q.figure=triRotSVG(bcLen,acLen,hypV,{L:["A","B","C"],side:[bcLen+" cm",acLen+" cm",null],ang:aLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-letters", 1, ["7.2"], 1, "var", varset([
  function(){
    var key="\\("+FR("BC","AB")+"\\)";
    var q=mcq("Triangle ABC is a right triangle with the right angle at C, as shown. Which fraction equals \\(\\sin A\\)?",
      key,
      ["\\("+FR("AC","AB")+"\\)","\\("+FR("BC","AC")+"\\)","\\("+FR("AC","BC")+"\\)"],
      "Sine is opposite over hypotenuse. For angle A, the opposite side is BC and the hypotenuse is AB, so \\(\\sin A = \\)<b>"+key+"</b>. (AC over AB would be \\(\\cos A\\), and BC over AC would be \\(\\tan A\\).)",
      {variant:1});
    q.figure=triSVG(4,3,5,{L:["A","B","C"],ang:["A",null,null]});
    return q;
  },
  function(){
    var key="\\("+FR("QR","PQ")+"\\)";
    var q=mcq("Triangle PQR is a right triangle with the right angle at R, as shown. Which fraction equals \\(\\cos Q\\)?",
      key,
      ["\\("+FR("PR","PQ")+"\\)","\\("+FR("PR","QR")+"\\)","\\("+FR("PQ","QR")+"\\)"],
      "Cosine is adjacent over hypotenuse. For angle Q, the adjacent side is QR and the hypotenuse is PQ, so \\(\\cos Q = \\)<b>"+key+"</b>. (PR over PQ would be \\(\\sin Q\\), and PR over QR would be \\(\\tan Q\\).)",
      {variant:2});
    q.figure=triSVG(4,3,5,{L:["P","Q","R"],ang:[null,"Q",null]});
    return q;
  },
  function(){
    var key="\\("+FR("EF","DF")+"\\)";
    var q=mcq("Triangle DEF is a right triangle with the right angle at F, as shown. Which fraction equals \\(\\tan D\\)?",
      key,
      ["\\("+FR("EF","DE")+"\\)","\\("+FR("DF","DE")+"\\)","\\("+FR("DF","EF")+"\\)"],
      "Tangent is opposite over adjacent. For angle D, the opposite side is EF and the adjacent side is DF, so \\(\\tan D = \\)<b>"+key+"</b>. (EF over DE would be \\(\\sin D\\), and DF over DE would be \\(\\cos D\\).)",
      {variant:3});
    q.figure=triSVG(4,3,5,{L:["D","E","F"],ang:["D",null,null]});
    return q;
  }
]));
E("u1-pk-other-angle-ratio", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var t=pick(U7_TRIPLES),k=ri(1,4);
  var swap=pick([true,false]);
  var aLen=(swap?t[1]:t[0])*k, bLen=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var key="\\("+u7fracS(aLen,hyp)+"\\)";
  var ds=["\\("+u7fracS(bLen,hyp)+"\\)","\\("+u7fracS(bLen,aLen)+"\\)","\\("+u7fracS(hyp,aLen)+"\\)"];
  var q=mcq("In right triangle "+X+Y+R+" with the right angle at "+R+", the side opposite angle "+X+" is \\("+aLen+"\\) cm, the side adjacent to angle "+X+" is \\("+bLen+"\\) cm, and the hypotenuse is \\("+hyp+"\\) cm. What is the value of \\(\\cos "+Y+"\\)?",
    key,ds,
    "Cosine is adjacent over hypotenuse, but the angle asked for is "+Y+", not "+X+". The side adjacent to angle "+Y+" is the side joining "+Y+" and "+R+", which is the \\("+aLen+"\\) cm side (the side opposite angle "+X+"): \\[ \\begin{aligned} \\cos "+Y+" &= "+FR(aLen,hyp)+(u7red(aLen,hyp)[1]===1?"":" \\\\ &= "+u7fracS(aLen,hyp))+" \\end{aligned} \\] The value of \\(\\cos "+Y+"\\) is <b>"+key+"</b>. This matches \\(\\sin "+X+"\\): the two acute angles are complementary.",
    {X:X,Y:Y,R:R,aLen:aLen,bLen:bLen,hyp:hyp,keyText:key});
  q.figure=triRotSVG(aLen,bLen,hyp,{L:[X,Y,R],ang:[X,Y,null],side:[aLen+" cm",bLen+" cm",hyp+" cm"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-ratio-decimal", 1, ["7.2"], 1, "gen", function(){
  var A=pick(["A","P","K"]);
  var opp,adj,hyp,fn,keyVal,tries=0,vals=null;
  do{
    tries++;
    var t=pick(U7_TRIPLES),k=ri(1,3);
    var swap=pick([true,false]);
    opp=(swap?t[1]:t[0])*k; adj=(swap?t[0]:t[1])*k; hyp=t[2]*k;
    fn=pick(["sin","cos","tan"]);
    var sinV=opp/hyp, cosV=adj/hyp, tanV=opp/adj;
    keyVal=(fn==="sin"?sinV:fn==="cos"?cosV:tanV);
    var cand=[keyVal,(fn==="sin"?cosV:sinV),(fn==="tan"?cosV:tanV),1/keyVal];
    if(fn==="tan")cand=[keyVal,sinV,cosV,1/keyVal];
    var strs=cand.map(function(v){return (Math.round(v*100)/100).toFixed(2);});
    var uniq={};strs.forEach(function(s2){uniq[s2]=1;});
    if(Object.keys(uniq).length===4)vals={strs:strs};
  }while(!vals&&tries<200);
  var key=vals.strs[0];
  var ds=[vals.strs[1],vals.strs[2],vals.strs[3]];
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var num=(fn==="tan"?opp:fn==="sin"?opp:adj), den=(fn==="tan"?adj:hyp);
  var q=mcq("In a right triangle, the side opposite angle "+A+" is \\("+opp+"\\) cm, the side adjacent to angle "+A+" is \\("+adj+"\\) cm, and the hypotenuse is \\("+hyp+"\\) cm. What is the value of \\(\\"+fn+" "+A+"\\), to two decimal places?",
    key,ds,
    "The "+fnName+" ratio for angle "+A+" uses "+(fn==="tan"?"the opposite side over the adjacent side":"the "+(fn==="sin"?"opposite":"adjacent")+" side over the hypotenuse")+": \\[ \\begin{aligned} \\"+fn+" "+A+" &= "+FR(num,den)+" \\\\ &\\approx "+key+" \\end{aligned} \\] The value of \\(\\"+fn+" "+A+"\\) is <b>\\("+key+"\\)</b>.",
    {A:A,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  return q;
});
E("u1-pk-angle-from-value", 1, ["7.2"], 1, "gen", function(){
  var cases=[["sin",3,5,"0.6"],["sin",1,2,"0.5"],["cos",4,5,"0.8"],["cos",1,2,"0.5"],["sin",5,13,"0.3846"],["cos",12,13,"0.9231"],["tan",3,4,"0.75"],["tan",4,3,"1.3333"],["sin",8,17,"0.4706"],["cos",15,17,"0.8824"],["tan",5,12,"0.4167"],["sin",7,25,"0.28"]];
  var cs=pick(cases),fn=cs[0],val=cs[1]/cs[2],disp=cs[3];
  var A=pick(["A","P","K","T"]);
  var raw=(fn==="sin"?u7asinD(val):fn==="cos"?u7acosD(val):u7atanD(val));
  var ans=Math.round(raw);
  var inv=(fn==="sin"?"\\sin^{-1}":fn==="cos"?"\\cos^{-1}":"\\tan^{-1}");
  var q=numq("In a right triangle, \\(\\"+fn+" "+A+" = "+disp+"\\). Find the measure of angle "+A+", in degrees, to the nearest degree.",
    ans,0.51,
    "Undo the ratio with its inverse: \\[ \\begin{aligned} "+A+" &= "+inv+"("+disp+") \\\\ &\\approx "+ans+"^\\circ \\end{aligned} \\] The measure of angle "+A+" is <b>\\("+ans+"^\\circ\\)</b>.",
    {fn:fn,A:A,disp:disp,ans:ans});
  return q;
});
E("u1-pk-ratio-unreduced", 1, ["7.2"], 1, "gen", function(){
  var ns=u7names(),X=ns[0],Y=ns[1],R=ns[2];
  var prim=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var t=pick(prim),k=pick([2,3]);
  var swap=pick([true,false]);
  var legXR=(swap?t[1]:t[0])*k, legYR=(swap?t[0]:t[1])*k, hyp=t[2]*k;
  var ang=pick([X,Y]);
  var opp=(ang===X?legYR:legXR), adj=(ang===X?legXR:legYR);
  var fn=pick(["sin","cos","tan"]);
  var num,den,wrongPr;
  if(fn==="sin"){num=opp;den=hyp;wrongPr=[adj,hyp];}
  else if(fn==="cos"){num=adj;den=hyp;wrongPr=[opp,hyp];}
  else{num=opp;den=adj;wrongPr=[opp,hyp];}
  var key="\\("+u7fracS(num,den)+"\\)";
  var ds=["\\("+FR(num,den)+"\\)","\\("+u7fracS(den,num)+"\\)","\\("+u7fracS(wrongPr[0],wrongPr[1])+"\\)"];
  var fnName=(fn==="sin"?"sine":fn==="cos"?"cosine":"tangent");
  var ratioWord=(fn==="tan"?"opposite over adjacent":fn==="sin"?"opposite over hypotenuse":"adjacent over hypotenuse");
  var unit=pick(["cm","m"]);
  var q=mcq("Triangle "+X+Y+R+" is a right triangle with the right angle at "+R+". Side "+X+R+" is \\("+legXR+"\\) "+unit+", side "+Y+R+" is \\("+legYR+"\\) "+unit+", and side "+X+Y+" is \\("+hyp+"\\) "+unit+". What is the value of \\(\\"+fn+" "+ang+"\\), in lowest terms?",
    key,ds,
    "The "+fnName+" ratio is "+ratioWord+". For angle "+ang+", the opposite side is \\("+opp+"\\) "+unit+", the adjacent side is \\("+adj+"\\) "+unit+", and the hypotenuse is \\("+hyp+"\\) "+unit+". Written with the drawn lengths the ratio is \\("+FR(num,den)+"\\) (one of the options), but the value in lowest terms is \\[ \\begin{aligned} \\"+fn+" "+ang+" &= "+FR(num,den)+" \\\\ &= "+u7fracS(num,den)+" \\end{aligned} \\] The value of \\(\\"+fn+" "+ang+"\\) is <b>"+key+"</b>.",
    {ang:ang,fn:fn,opp:opp,adj:adj,hyp:hyp,keyText:key});
  q.figure=triSVG(legYR,legXR,hyp,{L:[X,Y,R],side:[legYR+" "+unit,legXR+" "+unit,hyp+" "+unit]});
  return q;
});

/* ================= pythagoras ================= */
E("u1-pk-diag-num", 1, ["7.2"], 1, "gen", function(){
  var CTX=[
    {u:"cm",scales:[0.5,1,1.5],max:22,fig:false,make:function(a,b){return "A tablet screen is "+u7trim(a)+" cm wide and "+u7trim(b)+" cm tall. How long, in centimetres, is the diagonal of the screen? Give your answer to the nearest tenth.";}},
    {u:"m",scales:[0.5,1],max:13,fig:true,make:function(a,b){return "A sheet of plywood is "+u7trim(a)+" m long and "+u7trim(b)+" m wide. A straight cut runs from one corner of the sheet to the opposite corner. How long, in metres, is the cut? Give your answer to the nearest tenth.";}},
    {u:"m",scales:[2,3,4],max:45,fig:true,make:function(a,b){return "A rectangular tennis court measures "+u7trim(a)+" m by "+u7trim(b)+" m. How long, in metres, is a line drawn straight from one corner of the court to the opposite corner? Give your answer to the nearest tenth.";}},
    {u:"cm",scales:[2,3,4],max:70,fig:false,make:function(a,b){return "A picture frame is "+u7trim(a)+" cm wide and "+u7trim(b)+" cm tall. A wire runs diagonally across the back of the frame from one corner to the opposite corner. How long, in centimetres, is the wire? Give your answer to the nearest tenth.";}}
  ];
  var ctx=pick(CTX),t,k,a,b,hyp,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick(ctx.scales);a=t[0]*k;b=t[1]*k;hyp=t[2]*k;}while(hyp>ctx.max&&tries<200);
  if(pick([true,false])){var sw=a;a=b;b=sw;}
  var ans=u7r1(hyp);
  var q=numq(ctx.make(a,b),ans,0.06,
    "The diagonal is the hypotenuse of a right triangle whose legs are the two sides of the rectangle. By the Pythagorean theorem: \\[ \\begin{aligned} x^2 &= "+u7trim(a)+"^2 + "+u7trim(b)+"^2 \\\\ x^2 &= "+u7trim(a*a)+" + "+u7trim(b*b)+" \\\\ x^2 &= "+u7trim(hyp*hyp)+" \\\\ x &= "+u7trim(hyp)+" \\end{aligned} \\] The length is <b>\\("+u7trim(ans)+"\\) "+ctx.u+"</b>.",
    {a:a,b:b,hyp:hyp,ans:ans,unit:ctx.u});
  if(ctx.fig)q.figure=u7rectDiagSVG(a,b);
  return q;
});
E("u1-pk-leg-num", 1, ["7.2"], 1, "gen", function(){
  var t,k,hyp,known,ans,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick([0.5,1,1.5,2]);hyp=t[2]*k;}while(hyp>16&&tries<200);
  if(pick([true,false])){known=t[0]*k;ans=t[1]*k;}else{known=t[1]*k;ans=t[0]*k;}
  var ctx=pick([1,2,3]),prompt;
  if(ctx===1)prompt="A ladder "+u7trim(hyp)+" m long leans against a vertical wall. The top of the ladder touches the wall "+u7trim(known)+" m above the ground. How far, in metres, is the foot of the ladder from the wall? Give your answer to the nearest tenth.";
  else if(ctx===2)prompt="A staircase stringer "+u7trim(hyp)+" m long rises "+u7trim(known)+" m vertically from floor to landing. How long, in metres, is the horizontal run of the staircase? Give your answer to the nearest tenth.";
  else prompt="A loading ramp "+u7trim(hyp)+" m long rises to a dock "+u7trim(known)+" m above the ground. How far, in metres, does the foot of the ramp sit from the base of the dock? Give your answer to the nearest tenth.";
  var q=numq(prompt,ans,0.06,
    "The slanted member is the hypotenuse of a right triangle, and the vertical rise is one leg. Rearrange the Pythagorean theorem for the missing leg: \\[ \\begin{aligned} x^2 + "+u7trim(known)+"^2 &= "+u7trim(hyp)+"^2 \\\\ x^2 &= "+u7trim(hyp)+"^2 - "+u7trim(known)+"^2 \\\\ x^2 &= "+u7trim(ans*ans)+" \\\\ x &= "+u7trim(ans)+" \\end{aligned} \\] The distance is <b>\\("+u7trim(ans)+"\\) m</b>.",
    {ctx:ctx,hyp:hyp,known:known,ans:ans});
  q.figure=u7triSceneSVG({vert:known,ground:ans,slant:hyp,vertLabel:u7trim(known)+" m",groundLabel:"?",slantLabel:u7trim(hyp)+" m"});
  return q;
});
E("u1-pk-point-distance", 1, ["7.2"], 1, "gen", function(){
  var t=pick(U7_TRIPLES),k=pick([1,2,3]);
  var dx=t[0]*k, dy=t[1]*k, dist=t[2]*k;
  if(pick([true,false])){var sw2=dx;dx=dy;dy=sw2;}
  var x1=ri(0,6),y1=ri(0,6),x2=x1+dx,y2=y1+dy;
  var q=numq("Find the distance between the points ("+x1+", "+y1+") and ("+x2+", "+y2+"). Give your answer to the nearest tenth.",
    dist,0.06,
    "The horizontal difference between the points is "+dx+" and the vertical difference is "+dy+". These differences are the legs of a right triangle whose hypotenuse is the distance between the points: \\[ \\begin{aligned} d^2 &= "+dx+"^2 + "+dy+"^2 \\\\ d^2 &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ d^2 &= "+(dist*dist)+" \\\\ d &= "+dist+" \\end{aligned} \\] The distance is <b>\\("+dist+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2,dx:dx,dy:dy,dist:dist});
  return q;
});
E("u1-pk-right-check", 1, ["7.2"], 1, "var", varset([
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "6, 8, 10",
    ["6, 8, 11","5, 12, 14","4, 5, 6"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 6, 8, 10: \\(6^2 + 8^2 = 36 + 64 = 100 = 10^2\\), so <b>6, 8, 10</b> forms a right triangle. The others fail the check: \\(6^2 + 8^2 \\ne 11^2\\), \\(5^2 + 12^2 \\ne 14^2\\), and \\(4^2 + 5^2 \\ne 6^2\\).",{variant:1});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "9, 12, 15",
    ["9, 12, 14","8, 15, 18","7, 10, 12"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 9, 12, 15: \\(9^2 + 12^2 = 81 + 144 = 225 = 15^2\\), so <b>9, 12, 15</b> forms a right triangle. The others fail the check: \\(9^2 + 12^2 \\ne 14^2\\), \\(8^2 + 15^2 \\ne 18^2\\), and \\(7^2 + 10^2 \\ne 12^2\\).",{variant:2});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "5, 12, 13",
    ["5, 12, 12","6, 8, 9","10, 24, 25"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 5, 12, 13: \\(5^2 + 12^2 = 25 + 144 = 169 = 13^2\\), so <b>5, 12, 13</b> forms a right triangle. The others fail the check: \\(5^2 + 12^2 \\ne 12^2\\), \\(6^2 + 8^2 \\ne 9^2\\), and \\(10^2 + 24^2 \\ne 25^2\\).",{variant:3});},
  function(){return mcq("Which set of side lengths, in centimetres, forms a right triangle?",
    "8, 15, 17",
    ["8, 15, 16","12, 16, 21","9, 40, 42"],
    "A set of lengths forms a right triangle exactly when the square of the longest length equals the sum of the squares of the other two. For 8, 15, 17: \\(8^2 + 15^2 = 64 + 225 = 289 = 17^2\\), so <b>8, 15, 17</b> forms a right triangle. The others fail the check: \\(8^2 + 15^2 \\ne 16^2\\), \\(12^2 + 16^2 \\ne 21^2\\), and \\(9^2 + 40^2 \\ne 42^2\\).",{variant:4});}
]));
E("u1-pk-screen-size", 1, ["7.2"], 1, "gen", function(){
  var pr=pick([[12,9,15],[16,12,20],[20,15,25],[24,18,30],[32,24,40],[40,30,50],[48,36,60]]);
  var w=pr[0],h=pr[1],d=pr[2];
  var dev=pick(["television","computer monitor"]);
  var q=numq("A "+dev+" screen is "+w+" cm wide and "+h+" cm tall. Screens are sized by the length of their diagonal. What is the screen size, in centimetres?",
    d,0.06,
    "The diagonal is the hypotenuse of a right triangle with legs "+w+" cm and "+h+" cm. By the Pythagorean theorem: \\[ \\begin{aligned} x^2 &= "+w+"^2 + "+h+"^2 \\\\ x^2 &= "+(w*w)+" + "+(h*h)+" \\\\ x^2 &= "+(d*d)+" \\\\ x &= "+d+" \\end{aligned} \\] The screen size is <b>\\("+d+"\\) cm</b>.",
    {w:w,h:h,d:d,dev:dev});
  return q;
});
E("u1-pk-shortcut-saving", 1, ["7.2"], 1, "gen", function(){
  var t,k,a,b,hyp,tries=0;
  do{tries++;t=pick(U7_TRIPLES);k=pick([1,2,3]);a=t[0]*k;b=t[1]*k;hyp=t[2]*k;}while(hyp>80&&tries<200);
  var saving=a+b-hyp;
  var q=numq("A rectangular field is "+a+" m long and "+b+" m wide. Walking from one corner along two edges to the opposite corner covers "+(a+b)+" m. A straight path across the diagonal of the field is shorter. How many metres does the diagonal path save? Give your answer to the nearest tenth.",
    saving,0.06,
    "First find the diagonal with the Pythagorean theorem: \\[ \\begin{aligned} d^2 &= "+a+"^2 + "+b+"^2 \\\\ d^2 &= "+(hyp*hyp)+" \\\\ d &= "+hyp+" \\end{aligned} \\] The saving is the edge route minus the diagonal: \\("+(a+b)+" - "+hyp+" = "+u7trim(saving)+"\\) m. The diagonal path saves <b>\\("+u7trim(saving)+"\\) m</b>.",
    {a:a,b:b,hyp:hyp,saving:saving});
  q.figure=u7rectDiagSVG(a,b);
  return q;
});

/* ================= solve-triangle ================= */
E("u1-pk-solve-perimeter", 1, ["7.2"], 2, "gen", function(){
  var theta=pick(U7_ANGLES), H=ri(14,50);
  var bc=H*u7sinD(theta), ac=H*u7cosD(theta);
  var per=H+bc+ac, ans=u7r1(per);
  var q=numq("A right triangle ABC has the right angle at C. Angle A is \\("+theta+"^\\circ\\) and the hypotenuse AB is \\("+H+"\\) cm. Find the perimeter of the triangle, in centimetres, to the nearest tenth.",
    ans,0.16,
    "Find each leg from angle A and the hypotenuse. Side BC is opposite angle A: \\[ \\begin{aligned} BC &= "+H+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(bc)+" \\end{aligned} \\] Side AC is adjacent to angle A: \\[ \\begin{aligned} AC &= "+H+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(ac)+" \\end{aligned} \\] Add all three sides: \\("+H+" + "+u7f1(bc)+" + "+u7f1(ac)+" \\approx "+u7f1(ans)+"\\). The perimeter is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {theta:theta,H:H,bc:bc,ac:ac,ans:ans});
  q.figure=triRotSVG(bc,ac,H,{L:["A","B","C"],ang:[theta+"°",null,null],side:["?","?",H+" cm"],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-second-leg", 1, ["7.2"], 2, "gen", function(){
  var theta=pick(U7_ANGLES.filter(function(a){return a>=28&&a<=62;}));
  var G=ri(10,42);
  var hyp=G/u7sinD(theta), ac=G/u7tanD(theta), ans=u7r1(ac);
  var q=numq("A right triangle ABC has the right angle at C. Angle A is \\("+theta+"^\\circ\\) and side BC, opposite angle A, is \\("+G+"\\) cm. Find the length of side AC, in centimetres, to the nearest tenth.",
    ans,0.06,
    "First find the hypotenuse from the sine ratio, rearranged: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(G,"AB")+" \\\\ AB &= "+FR(G,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(hyp)+" \\end{aligned} \\] Then use the cosine ratio at angle A with that hypotenuse: \\[ \\begin{aligned} AC &= AB \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(hyp)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of side AC is <b>\\("+u7f1(ans)+"\\) cm</b>.",
    {theta:theta,G:G,hyp:hyp,ans:ans});
  q.figure=triRotSVG(G,ac,hyp,{L:["A","B","C"],ang:[theta+"°",null,null],side:[G+" cm","?",null],rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-isosceles", 1, ["7.2"], 2, "gen", function(){
  var mode=pick([1,2]),leg,hyp,ans,prompt,sol;
  if(mode===1){
    hyp=pick([14,18,20,24,28,30,36,40]);leg=hyp/Math.SQRT2;ans=u7r1(leg);
    prompt="An isosceles right triangle has a hypotenuse of "+hyp+" cm. Its two legs are equal in length. Find the length of one leg, in centimetres, to the nearest tenth.";
    sol="Call each leg \\(x\\). The Pythagorean theorem gives \\[ \\begin{aligned} x^2 + x^2 &= "+hyp+"^2 \\\\ 2x^2 &= "+(hyp*hyp)+" \\\\ x^2 &= "+u7trim(hyp*hyp/2)+" \\\\ x &= \\frac{"+hyp+"}{\\sqrt{2}} \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of one leg is <b>\\("+u7f1(ans)+"\\) cm</b>.";
  }else{
    leg=pick([6,8,10,12,14,16,18,20]);hyp=leg*Math.SQRT2;ans=u7r1(hyp);
    prompt="An isosceles right triangle has legs of "+leg+" cm each. Find the length of the hypotenuse, in centimetres, to the nearest tenth.";
    sol="The two legs are equal, so the Pythagorean theorem gives \\[ \\begin{aligned} x^2 &= "+leg+"^2 + "+leg+"^2 \\\\ x^2 &= "+(2*leg*leg)+" \\\\ x &= "+leg+"\\sqrt{2} \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the hypotenuse is <b>\\("+u7f1(ans)+"\\) cm</b>.";
  }
  var sLab=(mode===1)?["?",null,hyp+" cm"]:[leg+" cm",null,"?"];
  var q=numq(prompt,ans,0.06,sol,{mode:mode,leg:leg,hyp:hyp,ans:ans});
  q.figure=triRotSVG(leg,leg,hyp,{L:["A","B","C"],ang:["45°","45°",null],side:sLab,rot:pick([9,12,15,-10,-14])});
  return q;
});
E("u1-pk-solve-scene", 1, ["7.2"], 2, "var", varset([
  function(){
    var s=12,theta=40;
    var height=s*u7tanD(theta), key=s/u7cosD(theta);
    var q=mcq("A flagpole stands on level ground. Its shadow is "+s+" m long, and the sun's angle of elevation is "+theta+"°. A straight line runs from the top of the flagpole to the far end of the shadow. How long is that line, in metres, to the nearest tenth?",
      u7f1(key)+" m",
      [u7f1(height)+" m",u7f1(s/u7sinD(theta))+" m",u7f1(s*u7tanD(90-theta))+" m"],
      "Two steps. First the height of the pole, from the tangent ratio with the shadow: \\[ \\begin{aligned} h &= "+s+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(height)+" \\end{aligned} \\] The line from the top of the pole to the end of the shadow is the hypotenuse, and the cosine ratio at the ground uses the shadow as the adjacent side: \\[ \\begin{aligned} L &= "+FR(s,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(key)+" \\end{aligned} \\] The line is <b>\\("+u7f1(key)+"\\) m</b> long. (Stopping after the first step gives the height, "+u7f1(height)+" m, not the line.)",
      {variant:1,s:s,theta:theta,height:height,ans:u7r1(key)});
    q.figure=u7triSceneSVG({vert:height,ground:s,slant:key,vertLabel:"?",groundLabel:s+" m",slantLabel:"?",angle:theta+"°"});
    return q;
  },
  function(){
    var h=1.2,theta=25;
    var L=h/u7sinD(theta), run=L*u7cosD(theta);
    var q=mcq("A loading ramp rises to a dock "+u7trim(h)+" m above level ground. The ramp runs in a straight line and makes an angle of "+theta+"° with the ground. How far, in metres, is the foot of the ramp from the base of the dock, to the nearest tenth?",
      u7f1(run)+" m",
      [u7f1(L)+" m",u7f1(h)+" m",u7f1(h/u7tanD(90-theta))+" m"],
      "Two steps. First the length of the ramp, from the sine ratio with the rise, rearranged: \\[ \\begin{aligned} L &= "+FR(u7trim(h),"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(L)+" \\end{aligned} \\] Then the horizontal distance, from the cosine ratio with that length: \\[ \\begin{aligned} \\text{distance} &= "+u7f1(L)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(run)+" \\end{aligned} \\] The foot of the ramp is <b>\\("+u7f1(run)+"\\) m</b> from the base of the dock. (Stopping after the first step gives the ramp's length, "+u7f1(L)+" m.)",
      {variant:2,h:h,theta:theta,L:L,ans:u7r1(run)});
    q.figure=u7triSceneSVG({vert:h,ground:run,slant:L,vertLabel:u7trim(h)+" m",groundLabel:"?",slantLabel:"?",angle:theta+"°"});
    return q;
  },
  function(){
    var d=20,theta=55;
    var height=d*u7tanD(theta), key=d/u7cosD(theta);
    var q=mcq("A kite is flying on a taut string that makes an angle of "+theta+"° with level ground. The kite is directly above a marker on the ground, "+d+" m horizontally from the flyer. How long is the string, in metres, to the nearest tenth?",
      u7f1(key)+" m",
      [u7f1(height)+" m",u7f1(d/u7sinD(theta))+" m",u7f1(d*u7tanD(90-theta))+" m"],
      "Two steps. First the height of the kite, from the tangent ratio with the horizontal distance: \\[ \\begin{aligned} h &= "+d+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(height)+" \\end{aligned} \\] The string is the hypotenuse, and the cosine ratio at the flyer uses the horizontal distance as the adjacent side: \\[ \\begin{aligned} L &= "+FR(d,"\\cos "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(key)+" \\end{aligned} \\] The string is <b>\\("+u7f1(key)+"\\) m</b> long. (Stopping after the first step gives the height, "+u7f1(height)+" m, not the string.)",
      {variant:3,d:d,theta:theta,height:height,ans:u7r1(key)});
    q.figure=u7triSceneSVG({vert:height,ground:d,slant:key,vertLabel:"?",groundLabel:d+" m",slantLabel:"?",angle:theta+"°",dashedVert:true});
    return q;
  },
  function(){
    var h=6,theta=70;
    var L=h/u7sinD(theta), foot=h/u7tanD(theta);
    var q=mcq("A ladder leans against a vertical wall so that its top reaches a window "+h+" m above level ground. The ladder makes an angle of "+theta+"° with the ground. How far, in metres, is the foot of the ladder from the wall, to the nearest tenth?",
      u7f1(foot)+" m",
      [u7f1(L)+" m",u7f1(h*u7tanD(theta))+" m",u7f1(L*u7cosD(90-theta))+" m"],
      "Two steps. First the length of the ladder, from the sine ratio with the height it reaches, rearranged: \\[ \\begin{aligned} L &= "+FR(h,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(L)+" \\end{aligned} \\] Then the distance of the foot from the wall, from the cosine ratio with that length: \\[ \\begin{aligned} \\text{distance} &= "+u7f1(L)+" \\times \\cos "+theta+"^\\circ \\\\ &\\approx "+u7f1(foot)+" \\end{aligned} \\] The foot of the ladder is <b>\\("+u7f1(foot)+"\\) m</b> from the wall. (Stopping after the first step gives the ladder's length, "+u7f1(L)+" m.)",
      {variant:4,h:h,theta:theta,L:L,ans:u7r1(foot)});
    q.figure=u7triSceneSVG({vert:h,ground:foot,slant:L,vertLabel:h+" m",groundLabel:"?",slantLabel:"?",angle:theta+"°"});
    return q;
  }
]));

/* ================= trig-context ================= */
E("u1-pk-elevation-height", 1, ["7.2"], 2, "gen", function(){
  var st=pick([{n:"building",art:"a building"},{n:"tree",art:"a tree"},{n:"cliff",art:"a cliff"},{n:"communications tower",art:"a communications tower"}]);
  var dist=ri(15,60), theta=pick(U7_ANGLES);
  var height=dist*u7tanD(theta), ans=u7r1(height);
  var q=textq("From a point on level ground "+dist+" m from the base of "+st.art+", the angle of elevation to the top of the "+st.n+" is "+theta+"°. Find the height of the "+st.n+", in metres, to the nearest tenth.",
    u7ans1(ans),
    "The height is opposite the angle of elevation and the ground distance is adjacent, so use the tangent ratio: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR("h",dist)+" \\\\ h &= "+dist+" \\times \\tan "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The height of the "+st.n+" is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {structure:st.n,dist:dist,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:height,ground:dist,slant:dist/u7cosD(theta),vertLabel:"?",groundLabel:dist+" m",angle:theta+"°"});
  return q;
});
E("u1-pk-depression-distance", 1, ["7.2"], 2, "gen", function(){
  var ctx=pick([1,2,3]),h,theta=pick([25,30,35,40,45,50,55]),prompt,place;
  if(ctx===1){h=ri(8,25);place="balcony";
    prompt="From a balcony "+h+" m above level ground, the angle of depression to a car parked on the street below is "+theta+"°. How far, in metres, is the car from the base of the building? Give your answer to the nearest tenth.";}
  else if(ctx===2){h=ri(25,70);place="cliff";
    prompt="From the top of a cliff "+h+" m above the sea, the angle of depression to a boat on the water is "+theta+"°. How far, in metres, is the boat from the base of the cliff? Give your answer to the nearest tenth.";}
  else{h=ri(15,45);place="lighthouse";
    prompt="From the deck of a lighthouse "+h+" m above the water, the angle of depression to a buoy is "+theta+"°. How far, in metres, is the buoy from the base of the lighthouse? Give your answer to the nearest tenth.";}
  var dist=h/u7tanD(theta), ans=u7r1(dist);
  var q=textq(prompt,u7ans1(ans),
    "The angle of depression from the top equals the angle of elevation from the object, because the horizontal lines are parallel (alternate interior angles). In the triangle, the height is opposite that angle and the distance from the base is adjacent: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR(h,"d")+" \\\\ d &= "+FR(h,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The distance is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {ctx:ctx,place:place,h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:dist,slant:h/u7sinD(theta),vertLabel:h+" m",groundLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-shadow-angle", 1, ["7.2"], 2, "gen", function(){
  var h,s,raw,tries=0;
  do{tries++;h=ri(3,12);s=ri(3,16);raw=u7atanD(h/s);}while((raw<25||raw>70)&&tries<100);
  var ang=Math.round(raw);
  var q=textq("A vertical pole "+h+" m tall casts a shadow "+s+" m long on level ground. Find the sun's angle of elevation, in degrees, to the nearest degree.",
    [""+ang,ang+"°",ang+" degrees"],
    "The pole is opposite the sun's angle of elevation and the shadow is adjacent, so use the tangent ratio and undo it with the inverse tangent: \\[ \\begin{aligned} \\tan \\theta &= "+FR(h,s)+" \\\\ \\theta &= \\tan^{-1}\\left("+FR(h,s)+"\\right) \\\\ &\\approx "+ang+"^\\circ \\end{aligned} \\] The sun's angle of elevation is <b>\\("+ang+"^\\circ\\)</b>.",
    {h:h,s:s,ang:ang});
  q.figure=u7triSceneSVG({vert:h,ground:s,slant:Math.sqrt(h*h+s*s),vertLabel:h+" m",groundLabel:s+" m",angle:"?"});
  return q;
});
E("u1-pk-ramp-length", 1, ["7.2"], 2, "gen", function(){
  var h=pick([0.9,1.2,1.5,1.8,2.4,3.0]), theta=pick([25,28,30,32,35,38]);
  var L=h/u7sinD(theta), ans=u7r1(L);
  var q=textq("A ramp rises "+u7trim(h)+" m above level ground and makes an angle of "+theta+"° with the ground. Find the length of the ramp, in metres, to the nearest tenth.",
    u7ans1(ans),
    "The rise is opposite the ramp's angle and the ramp itself is the hypotenuse, so use the sine ratio and rearrange: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(u7trim(h),"L")+" \\\\ L &= "+FR(u7trim(h),"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the ramp is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:L*u7cosD(theta),slant:L,vertLabel:u7trim(h)+" m",slantLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-ladder-reach", 1, ["7.2"], 2, "gen", function(){
  var L=ri(4,12), theta=pick([50,55,58,60,62,65,68,70]);
  var height=L*u7sinD(theta), ans=u7r1(height);
  var q=textq("A ladder "+L+" m long leans against a vertical wall, making an angle of "+theta+"° with the level ground. How high, in metres, up the wall does the ladder reach? Give your answer to the nearest tenth.",
    u7ans1(ans),
    "The height reached is opposite the angle at the ground and the ladder is the hypotenuse, so use the sine ratio: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR("h",L)+" \\\\ h &= "+L+" \\times \\sin "+theta+"^\\circ \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The ladder reaches <b>\\("+u7f1(ans)+"\\) m</b> up the wall.",
    {L:L,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:height,ground:L*u7cosD(theta),slant:L,vertLabel:"?",slantLabel:L+" m",angle:theta+"°"});
  return q;
});
E("u1-pk-wire-length", 1, ["7.2"], 2, "gen", function(){
  var h=ri(5,14), theta=pick([35,38,40,42,45,48,50,55,60]);
  var wire=h/u7sinD(theta), ans=u7r1(wire);
  var q=textq("A guy wire is attached to a pole "+h+" m above level ground and runs to an anchor in the ground, where it makes an angle of "+theta+"° with the ground. Find the length of the wire, in metres, to the nearest tenth.",
    u7ans1(ans),
    "The attachment height is opposite the angle at the anchor and the wire is the hypotenuse, so use the sine ratio and rearrange: \\[ \\begin{aligned} \\sin "+theta+"^\\circ &= "+FR(h,"L")+" \\\\ L &= "+FR(h,"\\sin "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The length of the wire is <b>\\("+u7f1(ans)+"\\) m</b>.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:h/u7tanD(theta),slant:wire,vertLabel:h+" m",slantLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-tree-distance", 1, ["7.2"], 2, "gen", function(){
  var h=ri(8,24), theta=pick([28,30,32,35,38,40,42,45,48,50]);
  var dist=h/u7tanD(theta), ans=u7r1(dist);
  var q=textq("A tree is "+h+" m tall. From a point on level ground, the angle of elevation to the top of the tree is "+theta+"°. How far, in metres, is the point from the base of the tree? Give your answer to the nearest tenth.",
    u7ans1(ans),
    "The height of the tree is opposite the angle of elevation and the distance from the base is adjacent, so use the tangent ratio and rearrange: \\[ \\begin{aligned} \\tan "+theta+"^\\circ &= "+FR(h,"d")+" \\\\ d &= "+FR(h,"\\tan "+theta+"^\\circ")+" \\\\ &\\approx "+u7f1(ans)+" \\end{aligned} \\] The point is <b>\\("+u7f1(ans)+"\\) m</b> from the base of the tree.",
    {h:h,theta:theta,ans:ans});
  q.figure=u7triSceneSVG({vert:h,ground:dist,slant:h/u7sinD(theta),vertLabel:h+" m",groundLabel:"?",angle:theta+"°"});
  return q;
});
E("u1-pk-slide-angle", 1, ["7.2"], 2, "gen", function(){
  var t,k,hLeg,hyp,ang,tries=0;
  do{
    tries++;
    t=pick(U7_TRIPLES);k=pick([0.5,1,1.5]);
    hLeg=pick([t[0],t[1]])*k;hyp=t[2]*k;
    ang=Math.round(u7asinD(hLeg/hyp));
  }while((ang<20||ang>65)&&tries<120);
  var ground=Math.sqrt(hyp*hyp-hLeg*hLeg);
  var q=textq("A playground slide is "+u7trim(hyp)+" m long, and the top of the slide is "+u7trim(hLeg)+" m above level ground. Find the angle the slide makes with the ground, in degrees, to the nearest degree.",
    [""+ang,ang+"°",ang+" degrees"],
    "The height of the slide is opposite the angle at the ground and the slide itself is the hypotenuse, so use the sine ratio and undo it with the inverse sine: \\[ \\begin{aligned} \\sin \\theta &= "+FR(u7trim(hLeg),u7trim(hyp))+" \\\\ \\theta &= \\sin^{-1}\\left("+FR(u7trim(hLeg),u7trim(hyp))+"\\right) \\\\ &\\approx "+ang+"^\\circ \\end{aligned} \\] The slide makes an angle of <b>\\("+ang+"^\\circ\\)</b> with the ground.",
    {hLeg:hLeg,hyp:hyp,ang:ang});
  q.figure=u7triSceneSVG({vert:hLeg,ground:ground,slant:hyp,vertLabel:u7trim(hLeg)+" m",slantLabel:u7trim(hyp)+" m",angle:"?"});
  return q;
});
/* PK tranche pass for Unit 1. pkFor is Cluster 1's dependent
   indicator list from the prior knowledge map. */
var PKT_U1_FOR=["7.1","7.2","7.3"];
var PKT_U1={
 "u1-pk-label-sides":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-def":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-angle":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-find-side":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-pythagoras":{src:"math-1201:7.5, 7.7",group:"pythagoras"},
 "u1-pk-solve-triangle":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-rope-angle":{src:"math-1201:7.3, 7.7",group:"trig-context"},
 "u1-pk-ramp-run":{src:"math-1201:7.4, 7.5",group:"trig-context"},
 "u1-pk-role-from-diagram":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-hypotenuse-pick":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-opposite-read":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-two-angles-roles":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-role-value":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-role-words":{src:"math-1201:7.1",group:"trig-sides"},
 "u1-pk-ratio-from-figure":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-equation":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-find-hypotenuse":{src:"math-1201:7.4",group:"trig-ratios"},
 "u1-pk-angle-from-legs":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-ratio-letters":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-other-angle-ratio":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-ratio-decimal":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-angle-from-value":{src:"math-1201:7.3",group:"trig-ratios"},
 "u1-pk-ratio-unreduced":{src:"math-1201:7.2",group:"trig-ratios"},
 "u1-pk-diag-num":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-leg-num":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-point-distance":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-right-check":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-screen-size":{src:"math-1201:7.5",group:"pythagoras"},
 "u1-pk-shortcut-saving":{src:"math-1201:7.5, 7.7",group:"pythagoras"},
 "u1-pk-solve-perimeter":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-second-leg":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-isosceles":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-solve-scene":{src:"math-1201:7.6",group:"solve-triangle"},
 "u1-pk-elevation-height":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-depression-distance":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-shadow-angle":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-ramp-length":{src:"math-1201:7.4, 7.7",group:"trig-context"},
 "u1-pk-ladder-reach":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-wire-length":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-tree-distance":{src:"math-1201:7.7",group:"trig-context"},
 "u1-pk-slide-angle":{src:"math-1201:7.3, 7.7",group:"trig-context"}};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});
