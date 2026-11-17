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
 "u1-pk-ramp-run":{src:"math-1201:7.4, 7.5",group:"trig-context"}};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});
