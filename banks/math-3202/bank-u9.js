// Math 3202 Unit 9 Trigonometry question bank
// CRMARKS: u9-sine-side-cr=3
// CRMARKS: u9-cosine-angle-cr=4
// CRMARKS: u9-mixed-choose-cr=5
// CRMARKS: u9-two-step-cr=4
// CRMARKS: u9-survey-application-cr=5
/* ===== Unit 9 ===== */
/* Math 3202 Unit 9: Trigonometry, sine law and cosine law (5.1 to 5.4), plus a
   primary ratio bridging set (ids u9r-, prior learning review, see notes9.md).
   Helpers prefixed u9. Standard notation: side a is BC opposite A, side b is CA
   opposite B, side c is AB opposite C. Angles to nearest degree, sides to 1 decimal. */
function u9rad(d){return d*Math.PI/180;}
function u9deg(r){return r*180/Math.PI;}
function u9sin(d){return Math.sin(u9rad(d));}
function u9cos(d){return Math.cos(u9rad(d));}
function u9r1(x){return Math.round(x*10)/10;}
function u9fig(a,b,c,sideLabs,angLabs,labels){return triSVG(a,b,c,{side:sideLabs,ang:angLabs,L:labels||["A","B","C"]});}
function u9mkD(cv,cands){
  var out=[], seen={}; seen[fmtF(cv,1)]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<=0) continue;
    var t=fmtF(v,1); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[3.7,-2.9,5.4,-4.6,7.2];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=cv+offs[k]; if(vv<=0) continue; var tt=fmtF(vv,1); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That value comes from an arithmetic slip after the setup. Keep the setup and redo the final calculation."});
  }
  return out;
}
function u9mkDeg(cv,cands){
  var out=[], seen={}; seen[String(Math.round(cv))]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<=2 || v>=178) continue;
    var t=String(Math.round(v)); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[11,-9,17,-14,23];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=Math.round(cv)+offs[k]; if(vv<=2 || vv>=178) continue; var tt=String(vv); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That angle comes from an arithmetic slip after the setup. Keep the setup and redo the inverse step."});
  }
  return out;
}
function u9sssAngles(a,b,c){
  function ang(op,s1,s2){var v=(s1*s1+s2*s2-op*op)/(2*s1*s2); v=Math.max(-1,Math.min(1,v)); return u9deg(Math.acos(v));}
  return [ang(a,b,c), ang(b,a,c), ang(c,a,b)];
}
/* Diagram coverage addition (November 2026): the ambiguous case setup for
   u9-mixed-wide. Angle A at the left, side b along the ray to the far
   vertex C, the dashed height h from C to the base line, and a dashed arc
   of radius a centred at C showing where side a can land on the base line.
   The arc is drawn from the draw's own A, b and a, so it crosses the base
   line twice, once or not at all exactly as the draw's numbers dictate. */
function u9AmbFig(A,b,a,h){
  var Ar=u9rad(A);
  var C=[b*Math.cos(Ar), b*Math.sin(Ar)], F=[C[0],0];
  var xR=Math.max(C[0]+a, b, C[0]+2);
  var arc=[], t;
  for(t=180; t<=360; t+=9){ var tr=u9rad(t); arc.push([C[0]+a*Math.cos(tr), C[1]+a*Math.sin(tr)]); }
  var fitPts=[[0,0], C, F, [xR,0], [C[0]-a,C[1]], [C[0]+a,C[1]], [C[0],C[1]-a]];
  var T=_fit(fitPts,330,215,44);
  var PA=T([0,0]), PC=T(C), PF=T(F), PR=T([xR,0]);
  function ln(p,q,dash,w){ return '<line x1="'+fmt(p[0],1)+'" y1="'+fmt(p[1],1)+'" x2="'+fmt(q[0],1)+'" y2="'+fmt(q[1],1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>'; }
  var out=ln(PA,PR,false,2)+ln(PA,PC,false,2)+ln(PC,PF,true,1.4);
  var d="M"+arc.map(function(p){ var q=T(p); return fmt(q[0],1)+" "+fmt(q[1],1); }).join(" L");
  out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  var dirC=_vnorm(_vsub(PC,PA)), bis=_vnorm([dirC[0]+1, dirC[1]]);
  out+=_txt(PA[0]+bis[0]*27, PA[1]+bis[1]*27, A+"°", 12, false);
  out+=_txt(PA[0]-14, PA[1]+4, "A", 14, true);
  out+=_txt(PC[0]-2, PC[1]-16, "C", 14, true);
  var M=[(PA[0]+PC[0])/2,(PA[1]+PC[1])/2], off=_sideOff(PA,PC,PF,16);
  out+=_txt(M[0]+off[0], M[1]+off[1], String(b), 12, false);
  out+=_txt((PC[0]+PF[0])/2+13, (PC[1]+PF[1])/2, fmtF(h,1), 12, false, "start");
  var PB=T([C[0], C[1]-a]);
  out+=_txt(PB[0], PB[1]+13, fmtF(a,1), 12, false);
  return '<svg viewBox="0 0 330 215" width="330" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ambiguous case diagram: side a swinging from the far vertex toward the base line">'+out+'</svg>';
}

/* ================= The 14 spreadsheet-governed law entries ================= */

E("u9-sine-side", 9, ["5.1"], 1, "gen", function(){
  var A,B,a,guard=0;
  do { A=ri(32,58); B=ri(35,65); a=ri(9,28); guard++; } while(guard<60 && (A+B>145 || Math.abs(A-B)<7));
  if(A+B>145){A=40; B=55; a=18;}
  var C=180-A-B;
  var b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var cv=u9r1(b);
  var dists=u9mkD(cv,[
    [a*u9sin(A)/u9sin(B), "That setup swaps the two angles. Side b pairs with angle B, and the known side a pairs with angle A."],
    [a*u9sin(C)/u9sin(A), "That uses angle C in the top. Side b pairs with angle B, not angle C."],
    [a*u9sin(B)/u9sin(C), "That divides by the sine of angle C. The known pair in the ratio is side a with angle A."]
  ]);
  var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\) and side \\(a\\) is "+a+" m, as shown. What is the length of side \\(b\\), to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: side b comes from the sine law pair b with B and a with A."}, dists,
    "Set up the sine law first, pairing each side with its opposite angle. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(cv,1)+" \\end{aligned} \\] The length of side b is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"sine-side", A:A, B:B, a:a});
  q.figure=u9fig(a,b,c,[String(a),"?", ""],[""+A+"°",""+B+"°",""]);
  return q;
}, ["Pair each side with the angle opposite it, then look for a complete known pair.", "Start by writing the sine law with side b over the sine of angle B."]);

E("u9-cosine-side", 9, ["5.2"], 1, "gen", function(){
  var b=ri(7,22), c=ri(7,22), A=ri(42,118);
  var a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
  var cv=u9r1(a);
  var dists=u9mkD(cv,[
    [Math.sqrt(b*b+c*c), "That is the Pythagorean result for a right angle. Angle A is "+A+" degrees, so the cosine law term is needed."],
    [Math.sqrt(b*b+c*c+2*b*c*u9cos(A)), "That adds the last term. The cosine law subtracts 2bc cos A."],
    [b+c-a, "That combines the two given sides by adding and subtracting. The cosine law uses squares and the contained angle."]
  ]);
  var q=mcq("In triangle ABC, sides \\(b\\) and \\(c\\) are "+b+" m and "+c+" m, and the angle between them, angle A, is \\("+A+"^\\circ\\), as shown. What is the length of side \\(a\\), to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: two sides and the contained angle call for the cosine law."}, dists,
    "Two sides and the angle between them call for the cosine law. \\[ \\begin{aligned} a^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ &= "+fmtF(a*a,1)+" \\\\ a &= "+fmtF(cv,1)+" \\end{aligned} \\] The length of side a is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"cosine-side", b:b, c:c, A:A});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","",""]);
  return q;
}, ["Check whether the known angle sits between the two known sides.", "Start with the cosine law for the side opposite the known angle."]);

E("u9-choose-law", 9, ["5.3"], 1, "gen", function(){
  var mode=ri(0,3);
  var opts=[
    "Sine law, using a side with its opposite angle",
    "Cosine law, using two sides and the angle between them",
    "Cosine law, using all three sides",
    "Sine law, using two sides and an angle opposite one of them"
  ];
  var why=[
    "The givens include a complete side and opposite angle pair, which is what the sine law needs.",
    "The givens are two sides with the angle between them, which is the cosine law side pattern.",
    "The givens are all three sides, which is the cosine law angle pattern.",
    "The givens are two sides with an angle opposite one of them, which is what the sine law needs."
  ];
  var A,B,C,a,b,c, givenText, correctIdx;
  if(mode===0){
    A=ri(35,55); B=ri(40,60); if(A+B>140){A=42; B=54;}
    C=180-A-B; a=ri(10,24); b=a*u9sin(B)/u9sin(A); c=a*u9sin(C)/u9sin(A);
    givenText="angles A and B and side a, which sits opposite angle A"; correctIdx=0;
    var fig=u9fig(a,b,c,[String(a),"",""],[""+A+"°",""+B+"°",""]);
  } else if(mode===1){
    b=ri(8,20); c=ri(8,20); A=ri(45,115); a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
    var angs=u9sssAngles(a,b,c); B=Math.round(angs[1]); C=Math.round(angs[2]);
    givenText="sides b and c and angle A, which sits between them"; correctIdx=1;
    var fig=u9fig(a,b,c,["",String(b),String(c)],[""+A+"°","",""]);
  } else if(mode===2){
    A=ri(50,95); B=ri(35,65); if(A+B>150){A=70; B=50;}
    C=180-A-B; c=16; a=c*u9sin(A)/u9sin(C); b=c*u9sin(B)/u9sin(C);
    a=u9r1(a); b=u9r1(b);
    givenText="all three side lengths"; correctIdx=2;
    var fig=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["","",""]);
  } else {
    A=ri(30,50); a=ri(16,26); b=ri(10,a-4);
    var sB=b*u9sin(A)/a; B=Math.round(u9deg(Math.asin(Math.min(1,sB)))); C=180-A-B; c=a*u9sin(C)/u9sin(A);
    givenText="sides a and b and angle A, which sits opposite side a"; correctIdx=3;
    var fig=u9fig(a,b,c,[String(a),String(b),""],[""+A+"°","",""]);
  }
  var dists=[];
  for(var i=0;i<4;i++){ if(i!==correctIdx) dists.push({t:opts[i], fb:"That method needs a different pattern of givens than the diagram shows. Match the method to the marked information first."}); }
  var q=mcq("A triangle is shown with these givens: "+givenText+". Which starting method fits the given information?",
    {t:opts[correctIdx], fb:"Yes: "+why[correctIdx]}, dists,
    "Look at the pattern of the givens before choosing a law. "+why[correctIdx]+" The answer is <b>"+opts[correctIdx]+"</b>.",
    {mode:"choose-law", pattern:correctIdx});
  q.figure=fig;
  return q;
}, ["Sort the givens first: what is known, sides, angles, or a mix?", "Look for a side paired with its opposite angle, or two sides with the angle between them."]);

E("u9-sine-angle", 9, ["5.1"], 2, "gen", function(){
  var A,a,b,guard=0,Bv;
  do { A=ri(28,52); a=ri(15,27); b=ri(8,a-4); Bv=u9deg(Math.asin(b*u9sin(A)/a)); guard++; }
  while(guard<60 && (Bv<15 || Bv>70 || Math.abs(Bv-A)<5));
  var cv=Math.round(Bv);
  var altArg=a*u9sin(A)/b;
  var dists=u9mkDeg(cv,[
    [180-Bv, "That is the supplement of the angle. Side b is shorter than side a here, so angle B is the acute value."],
    [u9deg(Math.asin(Math.min(0.999,b*u9cos(A)/a))), "That setup uses the cosine of angle A. The sine law uses the sine of the given angle."],
    [altArg<=1 ? u9deg(Math.asin(altArg)) : Bv+16, "That setup flips the known pair upside down. Keep side a with angle A on one side of the proportion."]
  ]);
  var angs=u9sssAngles(a,b, a*u9sin(180-A-cv)/u9sin(A));
  var c=a*u9sin(180-A-Bv)/u9sin(A);
  var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), side \\(a\\) is "+a+" m and side \\(b\\) is "+b+" m, as shown. What is the measure of angle B, to the nearest degree?",
    {t:String(cv), fb:"Yes: the sine law with the known pair a and A gives angle B."}, dists,
    "Use the sine law with the complete known pair, side a with angle A. \\[ \\begin{aligned} \\frac{\\sin B}{"+b+"} &= \\frac{\\sin "+A+"^\\circ}{"+a+"} \\\\ \\sin B &= \\frac{"+b+" \\sin "+A+"^\\circ}{"+a+"} \\\\ B &= "+cv+"^\\circ \\end{aligned} \\] The measure of angle B is <b>"+cv+" degrees</b>.",
    {mode:"sine-angle", A:A, a:a, b:b});
  q.figure=u9fig(a,b,c,[String(a),String(b),""],[""+A+"°","?",""]);
  return q;
}, ["Find the complete known pair first: a side together with its opposite angle.", "Start with the sine law written so the unknown angle is on one side."]);

E("u9-cosine-angle", 9, ["5.2"], 2, "gen", function(){
  var A,B,C,c=15,a=13,b=11,angs=[55,60,65],guard=0;
  do {
    A=ri(48,105); B=ri(32,68); guard++;
    if(A+B>152) continue;
    C=180-A-B; c=ri(12,18);
    a=u9r1(c*u9sin(A)/u9sin(C)); b=u9r1(c*u9sin(B)/u9sin(C));
    angs=u9sssAngles(a,b,c);
  } while(guard<80 && (Math.abs(angs[0]-angs[1])<5 || Math.abs(angs[0]-angs[2])<5 || angs[0]<35 || angs[0]>120));
  var cv=Math.round(angs[0]);
  var dists=u9mkDeg(cv,[
    [angs[1], "That is angle B, at the vertex between sides a and c. The question asks for the angle opposite side a."],
    [angs[2], "That is angle C, at the vertex between sides a and b. The question asks for the angle opposite side a."],
    [180-angs[0], "That is the supplement of angle A. An angle inside this triangle is below 180 degrees and matches the side lengths shown."]
  ]);
  var q=mcq("Triangle ABC has sides \\(a = "+fmtF(a,1)+"\\) m, \\(b = "+fmtF(b,1)+"\\) m and \\(c = "+c+"\\) m, as shown. What is the measure of angle A, to the nearest degree?",
    {t:String(cv), fb:"Yes: with all three sides known, the cosine law in angle form gives angle A."}, dists,
    "All three sides are known, so use the cosine law in angle form for the angle opposite side a. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b,1)+"^2 + "+c+"^2 - "+fmtF(a,1)+"^2}{2("+fmtF(b,1)+")("+c+")} \\\\ A &= "+cv+"^\\circ \\end{aligned} \\] The measure of angle A is <b>"+cv+" degrees</b>.",
    {mode:"cosine-angle", a:a, b:b, c:c});
  q.figure=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["?","",""]);
  return q;
}, ["Three known sides point to the cosine law in angle form.", "Start by writing cos A with side a as the side being subtracted."]);

E("u9-sine-context", 9, ["5.1","5.3"], 2, "gen", function(){
  var sets=[["P","Q","R","A survey crew marks three corners of a building lot"],
            ["D","E","F","A roof crew checks three points on a gable roof"],
            ["X","Y","Z","A trail crew marks three points along a new path"]];
  var s=pick(sets), L=[s[0],s[1],s[2]];
  var A,B,a,guard=0;
  do { A=ri(34,56); B=ri(38,64); a=ri(11,30); guard++; } while(guard<60 && (A+B>146 || Math.abs(A-B)<7));
  if(A+B>146){A=44; B=56; a=20;}
  var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var cv=u9r1(b);
  var dists=u9mkD(cv,[
    [a*u9sin(A)/u9sin(B), "That setup swaps the two angles. The side opposite "+L[1]+" pairs with the angle at "+L[1]+"."],
    [a*u9sin(C)/u9sin(A), "That uses the third angle in the top. The side being found sits opposite the angle at "+L[1]+"."],
    [a*u9sin(B)/u9sin(C), "That divides by the sine of the third angle. The known pair is the given side with its opposite angle."]
  ]);
  var q=mcq(s[3]+". The angle at "+L[0]+" is \\("+A+"^\\circ\\), the angle at "+L[1]+" is \\("+B+"^\\circ\\), and the side opposite the angle at "+L[0]+" is "+a+" m, as shown. How long is the side opposite the angle at "+L[1]+", to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: the known side and its opposite angle anchor the sine law."}, dists,
    "The known side sits opposite the angle at "+L[0]+", so that pair anchors the sine law. \\[ \\begin{aligned} \\frac{x}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ x &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(cv,1)+" \\end{aligned} \\] The side is <b>"+fmtF(cv,1)+" m</b> long.",
    {mode:"sine-context", A:A, B:B, a:a, set:s[0]});
  q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""],L);
  return q;
}, ["Find the side that is paired with its opposite angle in the givens.", "Write the sine law with the unknown side over the sine of its opposite angle."]);

E("u9-cosine-context", 9, ["5.2","5.3"], 2, "gen", function(){
  var sets=[["M","N","P","Two docks, N and P, sit out from a boathouse at M. A straight run between the docks is needed"],
            ["G","H","K","A guy wire anchor plan shows two ground points, H and K, out from the base of a pole at G. The direct distance between the anchors is needed"],
            ["S","T","U","Two fence posts, T and U, sit out from a corner post at S. A straight rail between the posts is needed"]];
  var s=pick(sets), L=[s[0],s[1],s[2]];
  var b=ri(9,26), c=ri(9,26), A=ri(48,122);
  var a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
  var cv=u9r1(a);
  var dists=u9mkD(cv,[
    [Math.sqrt(b*b+c*c), "That treats the angle at "+L[0]+" as a right angle. The marked angle calls for the cosine law."],
    [Math.sqrt(b*b+c*c+2*b*c*u9cos(A)), "That adds the last term. The cosine law subtracts 2bc cos A."],
    [Math.abs(b-c)+a*0.35, "That estimate uses the difference of the two sides. The direct distance comes from the cosine law with the contained angle."]
  ]);
  var q=mcq(s[3]+". The distance from "+L[0]+" to "+L[1]+" is "+c+" m, the distance from "+L[0]+" to "+L[2]+" is "+b+" m, and the angle at "+L[0]+" between them is \\("+A+"^\\circ\\), as shown. What is the direct distance, to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: two sides with the angle between them call for the cosine law."}, dists,
    "The two known distances meet at "+L[0]+" with the angle between them, so use the cosine law. \\[ \\begin{aligned} x^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ x &= "+fmtF(cv,1)+" \\end{aligned} \\] The direct distance is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"cosine-context", b:b, c:c, A:A, set:s[0]});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","",""],L);
  return q;
}, ["Check whether the known angle sits between the two known distances.", "Start with the cosine law for the side opposite the known angle."]);

E("u9-applications", 9, ["5.4"], 2, "var", varset([
  function(){ var q=mcq("A carpenter builds a roof truss that is not a right triangle. Two members meeting at the peak are 4.2 m and 5.0 m, with a 78 degree angle between them, and the span across the bottom is needed. Which statement best describes the method?",
    {t:"Use the cosine law: two sides and the angle between them give the span", fb:"Yes: that pattern of givens is exactly the cosine law side form."},
    [{t:"Use the sine law: any two sides give a working ratio right away at once", fb:"The sine law needs a side paired with its opposite angle. That pair is not given here."},
     {t:"Use the tangent ratio: the span is one leg of a right triangle here", fb:"The truss is stated to not be a right triangle, so a primary ratio does not apply directly."},
     {t:"Add the two members: the span equals their total length exactly", fb:"Adding the members ignores the angle at the peak, which sets how far apart their ends sit."}],
    "The two members and the angle between them match the cosine law pattern for finding the side opposite that angle. The answer is <b>Use the cosine law: two sides and the angle between them give the span</b>.", {mode:"app-truss"}); q.figure=(function(){var span=Math.sqrt(4.2*4.2+5.0*5.0-2*4.2*5.0*u9cos(78)); return u9fig(span,4.2,5.0,["?","4.2","5.0"],["78°","",""]);})(); return q; },
  function(){ var q=mcq("A surveyor needs the width of a pond. From one shore point she measures angles of 63 degrees and 48 degrees to a tree on the far shore, using a 30 m baseline on her shore. Which statement best describes the method?",
    {t:"Use the sine law: a known baseline with angles gives the distance across", fb:"Yes: the baseline and the angles form a side and angle pattern the sine law handles."},
    [{t:"Use the cosine law: three sides are needed before any work can start on it", fb:"No side across the pond is known. The baseline and angles are enough for the sine law."},
     {t:"Walk the baseline twice: the width equals twice the baseline length", fb:"The width depends on the measured angles, not just on the baseline length."},
     {t:"Use the sine law only if the pond edge forms a right triangle shape", fb:"The sine law works in any triangle, right or not, when a side and opposite angle pair is available."}],
    "A known side with measured angles at its ends gives a complete side and opposite angle pair after the third angle is found, so the sine law gives the distance across. The answer is <b>Use the sine law: a known baseline with angles gives the distance across</b>.", {mode:"app-pond"}); q.figure=(function(){var aSide=30*u9sin(63)/u9sin(69), bSide=30*u9sin(48)/u9sin(69); return u9fig(aSide,bSide,30,["","?","30"],["63°","48°",""]);})(); return q; },
  function(){ var q=mcq("In a machine shop, a triangular mounting plate has sides of 18 cm, 24 cm and 30 cm. A fitter needs the angle opposite the 30 cm side so a bracket can be set. Which statement best describes the method?",
    {t:"Use the cosine law in angle form: three sides give the angle", fb:"Yes: the angle form of the cosine law starts from the three side lengths."},
    [{t:"Use the sine law: the longest side gives the angle directly", fb:"The sine law needs a known angle to pair with a side. No angle is known yet."},
     {t:"Use the cosine law in angle form only for angles over 90 degrees", fb:"The angle form works for acute and obtuse angles alike."},
     {t:"Estimate the angle from a photo of the plate taken earlier", fb:"A photo estimate is not a calculation. The three sides determine the angle exactly."}],
    "With all three sides known and no angle known, the cosine law in angle form is the starting method. The answer is <b>Use the cosine law in angle form: three sides give the angle</b>.", {mode:"app-plate"}); q.figure=u9fig(30,24,18,["30","24","18"],["?","",""]); return q; },
  function(){ return mcq("A real estate agent describes a triangular lot to a buyer. Two boundary lines and the angle where they meet at the road are surveyed, and the back boundary length is still needed for a fence quote. Which statement best describes the method?",
    {t:"Use the cosine law: the two boundaries and their contained angle give the back line", fb:"Yes: that is the standard lot measurement use of the cosine law."},
    [{t:"Use the sine law: the back line pairs with the road angle automatically at once here", fb:"The sine law needs a known side paired with its opposite angle. The road angle sits between the two known boundaries."},
     {t:"Measure the back line as the average of the two boundaries on the lot", fb:"An average ignores the angle at the road, which controls the back line length."},
     {t:"Use the cosine law only when the lot is a right triangle, which it must be", fb:"The cosine law is built for triangles that are not right triangles."}],
    "Two boundaries with the angle between them give the third side by the cosine law, which is how the fence length is found. The answer is <b>Use the cosine law: the two boundaries and their contained angle give the back line</b>.", {mode:"app-lot"}); },
  function(){ return mcq("A stage designer hangs a triangular set piece. From a front corner, angles to the two top corners are measured, and the front edge length is known. The designer needs the distance from the front corner to one top corner. Which statement best describes the method?",
    {t:"Use the sine law: the known front edge and the angles give the slanted distance", fb:"Yes: a known side with the triangle angles is a sine law setup."},
    [{t:"Use the cosine law: two slanted distances must be known first of all", fb:"The slanted distances are the unknowns here. The known edge and angles start the sine law."},
     {t:"Use the tangent ratio on the front edge, treating the set as a right triangle shape", fb:"The set piece triangle is not stated to be a right triangle, so a primary ratio does not start the work."},
     {t:"Scale the distance off the design sketch by eye, judging it from the drawing", fb:"An eye estimate is not the design calculation. The measured angles and edge determine the distance."}],
    "A known side together with the angles of the triangle gives a side and opposite angle pair, so the sine law finds the slanted distance. The answer is <b>Use the sine law: the known front edge and the angles give the slanted distance</b>.", {mode:"app-stage"}); },
  function(){ return mcq("A crane operator plans a lift where the load hangs from a jib, forming a triangle with the mast. The three cable and jib lengths are known, and the operator needs the angle at the mast to check clearance. Which statement best describes the method?",
    {t:"Use the cosine law in angle form: the three lengths give the angle at the mast", fb:"Yes: three known lengths and one unknown angle is the cosine law angle form."},
    [{t:"Use the sine law: the longest cable pairs with the mast angle right away in this case", fb:"The sine law needs one known angle to build a ratio. No angle is known at the start."},
     {t:"Use the cosine law in angle form only after measuring one angle first", fb:"The point of the angle form is that no angle measurement is needed; the sides carry the information."},
     {t:"Treat the mast angle as half the largest cable length on the mast", fb:"An angle does not come from halving a length. The three lengths go into the cosine law."}],
    "Three known lengths with an unknown angle call for the cosine law in angle form, a routine clearance check in lifting work. The answer is <b>Use the cosine law in angle form: the three lengths give the angle at the mast</b>.", {mode:"app-crane"}); }
]), ["Read the scenario for the pattern of givens: sides, angles, or both.", "Match that pattern to a law before judging any statement."]);

E("u9-sine-side-cr", 9, ["5.1"], 2, "gen", function(){
  var A,B,a,guard=0;
  do { A=ri(36,57); B=ri(39,63); a=ri(12,32); guard++; } while(guard<60 && (A+B>144 || Math.abs(A-B)<6));
  if(A+B>144){A=46; B=58; a=22;}
  var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var ans=u9r1(b);
  var q=numq("A ferry route forms triangle ABC with a headland. Angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\), and side \\(a\\), opposite angle A, is "+a+" km, as shown. Find the length of side \\(b\\), in kilometres, to one decimal place. Show your work.",
    ans, 0.2,
    "Pair each side with its opposite angle and use the sine law. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" km</b>.",
    {mode:"sine-side-cr", A:A, B:B, a:a});
  q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""]);
  return q;
}, ["Pair each side with the angle opposite it, then look for a complete known pair.", "Start by writing the sine law with side b over the sine of angle B."]);

E("u9-cosine-angle-cr", 9, ["5.2"], 2, "gen", function(){
  var A,B,C,c=16,a=14,b=12,angs=[60,55,65],guard=0;
  do {
    A=ri(52,108); B=ri(30,64); guard++;
    if(A+B>150) continue;
    C=180-A-B; c=ri(13,19);
    a=u9r1(c*u9sin(A)/u9sin(C)); b=u9r1(c*u9sin(B)/u9sin(C));
    angs=u9sssAngles(a,b,c);
  } while(guard<80 && (angs[0]<40 || angs[0]>118));
  var ans=Math.round(angs[0]);
  var q=numq("A triangular brace has sides \\(a = "+fmtF(a,1)+"\\) m, \\(b = "+fmtF(b,1)+"\\) m and \\(c = "+c+"\\) m, as shown. Find the measure of angle A, in degrees, to the nearest degree. Show your work.",
    ans, 1,
    "All three sides are known, so use the cosine law in angle form. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b,1)+"^2 + "+c+"^2 - "+fmtF(a,1)+"^2}{2("+fmtF(b,1)+")("+c+")} \\\\ A &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+" degrees</b>.",
    {mode:"cosine-angle-cr", a:a, b:b, c:c});
  q.figure=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["?","",""]);
  return q;
}, ["Three known sides point to the cosine law in angle form.", "Start by writing cos A with side a as the side being subtracted."]);

E("u9-mixed-choose-cr", 9, ["5.3"], 2, "gen", function(){
  var d1=ri(14,34), d2=ri(14,34), A=ri(55,125);
  var dist=Math.sqrt(d1*d1+d2*d2-2*d1*d2*u9cos(A));
  var ans=u9r1(dist);
  var angs=u9sssAngles(dist,d2,d1);
  var q=numq("Two straight roads leave a town hall at an angle of \\("+A+"^\\circ\\) to each other. A school is "+d1+" km along one road and a clinic is "+d2+" km along the other road, as shown. Find the direct distance between the school and the clinic, in kilometres, to one decimal place. Choose the law that fits and show your work.",
    ans, 0.2,
    "The two road distances and the angle between them fit the cosine law, since the angle is contained between the known sides. \\[ \\begin{aligned} x^2 &= "+d1+"^2 + "+d2+"^2 - 2("+d1+")("+d2+") \\cos "+A+"^\\circ \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" km</b>.",
    {mode:"mixed-choose-cr", d1:d1, d2:d2, A:A});
  q.figure=u9fig(dist,d2,d1,["?",String(d2),String(d1)],[""+A+"°","",""],["T","S","C"]);
  return q;
}, ["Decide which law fits the pattern of givens before calculating.", "The known angle sits between the two known distances, so start with that law in side form."]);

E("u9-mixed-wide", 9, ["5.1","5.2","5.3"], 3, "gen", function(){
  var mode=ri(0,4);
  if(mode===0){
    var A=ri(30,60), B=ri(34,68), a=ri(8,30), guard=0;
    while((A+B>146 || Math.abs(A-B)<6) && guard++<50){ A=ri(30,60); B=ri(34,68); }
    if(A+B>146){A=45; B=57;}
    var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A), cv=u9r1(b);
    var dists=u9mkD(cv,[[a*u9sin(A)/u9sin(B),"That swaps the two angles in the ratio."],[a*u9sin(C)/u9sin(A),"That uses the third angle for the side being found."],[a*u9sin(B)/u9sin(C),"That divides by the sine of the third angle instead of the known pair."]]);
    var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\) and side \\(a\\) is "+a+" m. What is side \\(b\\), to one decimal place?",
      {t:fmtF(cv,1), fb:"Yes: the sine law with the known pair a and A."}, dists,
      "Use the sine law. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= "+fmtF(cv,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(cv,1)+" m</b>.", {mode:"wide-sine-side", A:A, B:B, a:a});
    q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""]);
    return q;
  }
  if(mode===1){
    var A2=ri(28,52), a2=ri(15,27), b2=ri(8,a2-4), Bv=u9deg(Math.asin(b2*u9sin(A2)/a2)), cv2=Math.round(Bv);
    var c2=a2*u9sin(180-A2-Bv)/u9sin(A2);
    var dists2=u9mkDeg(cv2,[[180-Bv,"That is the supplement; side b is shorter than side a, so angle B is acute here."],[u9deg(Math.asin(Math.min(0.999,b2*u9cos(A2)/a2))),"That uses the cosine of the given angle in the setup."]]);
    var q2=mcq("In triangle ABC, angle A is \\("+A2+"^\\circ\\), side \\(a\\) is "+a2+" m and side \\(b\\) is "+b2+" m. What is angle B, to the nearest degree?",
      {t:String(cv2), fb:"Yes: the sine law with the known pair a and A."}, dists2,
      "Use the sine law. \\[ \\begin{aligned} \\frac{\\sin B}{"+b2+"} &= \\frac{\\sin "+A2+"^\\circ}{"+a2+"} \\\\ B &= "+cv2+"^\\circ \\end{aligned} \\] The answer is <b>"+cv2+" degrees</b>.", {mode:"wide-sine-angle", A:A2, a:a2, b:b2});
    q2.figure=u9fig(a2,b2,c2,[String(a2),String(b2),""],[""+A2+"°","?",""]);
    return q2;
  }
  if(mode===2){
    var b3=ri(7,24), c3=ri(7,24), A3=ri(40,125);
    var a3=Math.sqrt(b3*b3+c3*c3-2*b3*c3*u9cos(A3)), cv3=u9r1(a3);
    var dists3=u9mkD(cv3,[[Math.sqrt(b3*b3+c3*c3),"That treats the contained angle as a right angle."],[Math.sqrt(b3*b3+c3*c3+2*b3*c3*u9cos(A3)),"That adds the last term of the cosine law instead of subtracting it."]]);
    var q3=mcq("In triangle ABC, sides \\(b\\) and \\(c\\) are "+b3+" m and "+c3+" m, with angle A, between them, equal to \\("+A3+"^\\circ\\). What is side \\(a\\), to one decimal place?",
      {t:fmtF(cv3,1), fb:"Yes: two sides and the contained angle call for the cosine law."}, dists3,
      "Use the cosine law. \\[ \\begin{aligned} a^2 &= "+b3+"^2 + "+c3+"^2 - 2("+b3+")("+c3+") \\cos "+A3+"^\\circ \\\\ a &= "+fmtF(cv3,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(cv3,1)+" m</b>.", {mode:"wide-cosine-side", b:b3, c:c3, A:A3});
    q3.figure=u9fig(a3,b3,c3,["?",String(b3),String(c3)],[""+A3+"°","",""]);
    return q3;
  }
  if(mode===3){
    var A4,B4,C4,c4=15,a4=13,b4=11,angs=[55,60,65],guard4=0;
    do { A4=ri(48,105); B4=ri(32,68); guard4++; if(A4+B4>152) continue;
      C4=180-A4-B4; c4=ri(12,18); a4=u9r1(c4*u9sin(A4)/u9sin(C4)); b4=u9r1(c4*u9sin(B4)/u9sin(C4)); angs=u9sssAngles(a4,b4,c4);
    } while(guard4<80 && (Math.abs(angs[0]-angs[1])<5 || Math.abs(angs[0]-angs[2])<5));
    var cv4=Math.round(angs[0]);
    var dists4=u9mkDeg(cv4,[[angs[1],"That is angle B, not the angle opposite side a."],[angs[2],"That is angle C, not the angle opposite side a."],[180-angs[0],"That is the supplement of angle A."]]);
    var q4=mcq("Triangle ABC has sides \\(a = "+fmtF(a4,1)+"\\) m, \\(b = "+fmtF(b4,1)+"\\) m and \\(c = "+c4+"\\) m. What is angle A, to the nearest degree?",
      {t:String(cv4), fb:"Yes: three sides call for the cosine law in angle form."}, dists4,
      "Use the cosine law in angle form. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b4,1)+"^2 + "+c4+"^2 - "+fmtF(a4,1)+"^2}{2("+fmtF(b4,1)+")("+c4+")} \\\\ A &= "+cv4+"^\\circ \\end{aligned} \\] The answer is <b>"+cv4+" degrees</b>.", {mode:"wide-cosine-angle", a:a4, b:b4, c:c4});
    q4.figure=u9fig(a4,b4,c4,[fmtF(a4,1),fmtF(b4,1),String(c4)],["?","",""]);
    return q4;
  }
  var A5=ri(30,50), b5=ri(14,24), kase=ri(0,2), h=b5*u9sin(A5), a5;
  if(kase===0) a5=u9r1(h*ri(62,80)/100);
  else if(kase===2) a5=u9r1(b5*ri(112,135)/100);
  else a5=u9r1(h + (b5-h)*ri(30,60)/100);
  var hD=u9r1(b5*u9sin(A5));
  var counts=["0","1","2","3"], correctCount=(kase===0?"0":kase===2?"1":"2");
  var fbMap={"0":"Side a is shorter than the height from the far vertex, so it cannot reach the base line at all.",
             "1":"Side a is longer than side b, so the swinging side lands in only one position.",
             "2":"Side a is longer than the height but shorter than side b, so it lands in two positions.",
             "3":"Three different triangles cannot come from one fixed angle and two fixed sides like this."};
  var dists5=counts.filter(function(x){return x!==correctCount;}).map(function(x){return {t:x, fb:fbMap[x]};});
  var q5=mcq("A triangle is to be built with angle A equal to \\("+A5+"^\\circ\\), side \\(b\\) equal to "+b5+" m, and side \\(a\\), opposite angle A, equal to "+fmtF(a5,1)+" m. The height from the far vertex to the base line works out to "+fmtF(hD,1)+" m. How many different triangles fit these givens?",
    {t:correctCount, fb:fbMap[correctCount]}, dists5,
    "Compare side a with the height and with side b. The height is \\("+fmtF(hD,1)+"\\) m and side b is "+b5+" m, while side a is "+fmtF(a5,1)+" m. "+fbMap[correctCount]+" The answer is <b>"+correctCount+"</b>.",
    {mode:"wide-ambiguous", A:A5, b:b5, a:a5, kase:kase});
  q5.figure=u9AmbFig(A5, b5, a5, b5*u9sin(A5));
  return q5;
}, ["Sort the givens first, then pick the law that matches the pattern.", "Look for a known side and opposite angle pair, two sides with the contained angle, or all three sides."]);

E("u9-two-step-cr", 9, ["5.3","5.2","5.1"], 3, "gen", function(){
  var b,c,A,a,Bv,guard=0;
  do { b=ri(8,15); c=ri(14,24); A=ri(50,95); a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A)); Bv=u9deg(Math.asin(Math.min(1,b*u9sin(A)/a))); guard++; }
  while(guard<80 && (b>=a || Bv<20 || Bv>75));
  var aR=u9r1(a), ans=Math.round(Bv);
  var q=numq("In triangle ABC, side \\(b\\) is "+b+" m, side \\(c\\) is "+c+" m, and angle A, between sides \\(b\\) and \\(c\\), is \\("+A+"^\\circ\\), as shown. First find side \\(a\\), then find the measure of angle B, in degrees, to the nearest degree. Give angle B as your answer and show both steps.",
    ans, 1,
    "Step 1 uses the cosine law, since two sides and the contained angle are known. Step 2 uses the sine law with the new known pair. \\[ \\begin{aligned} a^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ a &= "+fmtF(aR,1)+" \\\\ \\frac{\\sin B}{"+b+"} &= \\frac{\\sin "+A+"^\\circ}{"+fmtF(aR,1)+"} \\\\ B &= "+ans+"^\\circ \\end{aligned} \\] Side b is shorter than side a, so angle B is the acute value. The answer is <b>"+ans+" degrees</b>.",
    {mode:"two-step-cr", b:b, c:c, A:A});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","?",""]);
  return q;
}, ["Plan the order first: one law creates the known pair the other law needs.", "Start with the side opposite the contained angle, using the two given sides."]);

E("u9-survey-application-cr", 9, ["5.4","5.3"], 3, "gen", function(){
  var A,B,base,guard=0;
  do { A=ri(48,72); B=ri(42,68); base=ri(30,60); guard++; } while(guard<60 && A+B>140);
  if(A+B>140){A=60; B=55; base=45;}
  var C=180-A-B;
  var dist=base*u9sin(B)/u9sin(C);
  var ans=u9r1(dist);
  var aSide=base*u9sin(A)/u9sin(C);
  var q=numq("Surveyors need the distance from point A on one shore of a pond to a marker at point C on the far shore. They measure a baseline from A to B of "+base+" m along their shore. The angle at A to the marker is \\("+A+"^\\circ\\) and the angle at B to the marker is \\("+B+"^\\circ\\), as shown. Find the distance from A to the marker, in metres, to one decimal place. Show your work.",
    ans, 0.3,
    "This is a standard surveying use of the sine law: a measured baseline and two measured angles give an unreachable distance. First the third angle is \\(180 - "+A+" - "+B+" = "+C+"^\\circ\\). \\[ \\begin{aligned} \\frac{x}{\\sin "+B+"^\\circ} &= \\frac{"+base+"}{\\sin "+C+"^\\circ} \\\\ x &= \\frac{"+base+" \\sin "+B+"^\\circ}{\\sin "+C+"^\\circ} \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"survey-application-cr", A:A, B:B, base:base});
  q.figure=u9fig(aSide,dist,base,[fmtF(u9r1(aSide),1),"?",String(base)],[""+A+"°",""+B+"°",""],["A","B","C"]);
  return q;
}, ["An unreachable distance with a measured baseline and angles is a sine law job.", "Start by finding the third angle from the two measured angles."]);

/* ============ Bridging set: primary ratio review (prior learning, ids u9r-) ============
   REVIEW entries per Jason's November 7, 2026 design addition. These refresh the
   Applied 1202 primary ratios before the law work above. They are coded to the
   closest Unit 9 code for the checker, but they are NOT 3202 indicator coverage.
   Ruled remap (Jason, November 8, 2026): u9r-find-side, u9r-find-side-workplace
   and u9r-find-angle serve Math 1202's indicator 5.5, solving right triangles
   with the primary ratios. That provenance is carried in the BRIDGE_SRC table
   after this set, which sets bridging:true and bridgeSrc on the named entries:
   the checker code stays in `indicators` because the coverage checker, the
   indicator filter and the on-screen tag all key on it, and coverage
   accounting for these entries reads bridgeSrc instead. A sixth entry,
   u9r-reasonable-result, judges whether a trig result is reasonable and
   carries MA1202.5.6 in the same table. */

E("u9r-ratio-value", 9, ["5.3"], 1, "gen", function(){
  var triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[12,16,20],[9,40,41],[12,35,37],[7,24,25],[20,21,29],[15,36,39],[10,24,26],[16,30,34],[15,20,25]];
  var tr=pick(triples), swap=ri(0,1), sc=ri(1,3);
  var b=(swap? tr[1]:tr[0])*sc, c=(swap? tr[0]:tr[1])*sc, a=tr[2]*sc;
  function red(n,d){var g=1; for(var k=Math.min(n,d); k>1; k--){ if(n%k===0 && d%k===0){ g=k; break; } } return "\\( "+FR(n/g,d/g)+" \\)";}
  var asks=[
    {name:"\\sin B", n:b, d:a, label:"sin B is opposite over hypotenuse"},
    {name:"\\cos B", n:c, d:a, label:"cos B is adjacent over hypotenuse"},
    {name:"\\tan B", n:b, d:c, label:"tan B is opposite over adjacent"}
  ];
  var ask=pick(asks), others=asks.filter(function(r){return r!==ask;});
  var dists=[
    {t:red(others[0].n,others[0].d), fb:"That is a different ratio for angle B. "+others[0].label+", which is not the ratio asked for."},
    {t:red(others[1].n,others[1].d), fb:"That is a different ratio for angle B. "+others[1].label+", which is not the ratio asked for."},
    {t:red(ask.d,ask.n), fb:"That flips the ratio upside down. The first named side for the ratio goes on top."}
  ];
  var q=mcq("In the right triangle shown, the right angle is at A. For angle B, which value equals \\("+ask.name+"\\)?",
    {t:red(ask.n,ask.d), fb:"Yes: "+ask.label+", using sides "+ask.n+" and "+ask.d+" from the diagram."}, dists,
    "For angle B, the opposite side is "+b+", the adjacent side is "+c+" and the hypotenuse is "+a+". "+ask.label+": \\("+ask.name+" = "+FR(ask.n,ask.d)+"\\) after simplifying. The answer is <b>"+red(ask.n,ask.d)+"</b>.",
    {mode:"bridge-ratio", ask:ask.name});
  q.figure=u9fig(a,b,c,[String(a),String(b),String(c)],["90°","",""]);
  return q;
}, ["Name the opposite, adjacent and hypotenuse sides for angle B first.", "Write the asked ratio from its two sides, then simplify the fraction."]);

E("u9r-find-side", 9, ["5.3"], 1, "gen", function(){
  var th=ri(26,64), mode=ri(0,2), a,b,c,givenLab,findLab,ans,setup,distVals;
  if(mode===0){
    a=ri(12,30); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(b);
    setup="\\sin "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9cos(th),"That uses the cosine ratio, which finds the side next to the angle. The side across from the angle uses sine with the hypotenuse."],
              [a*Math.tan(u9rad(th)),"That uses the tangent ratio, which needs the adjacent side. Here the hypotenuse is the known side."]];
    givenLab=[String(a),"?",""]; findLab="b";
  } else if(mode===1){
    a=ri(12,30); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(c);
    setup="\\cos "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9sin(th),"That uses the sine ratio, which finds the side across from the angle. The side next to the angle uses cosine with the hypotenuse."],
              [a/Math.tan(u9rad(th)),"That divides by the tangent. With the hypotenuse known, cosine gives the adjacent side directly."]];
    givenLab=[String(a),"", "?"]; findLab="c";
  } else {
    c=ri(10,24); b=c*Math.tan(u9rad(th)); a=Math.sqrt(b*b+c*c); ans=u9r1(b);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+c+"}";
    distVals=[[c*u9sin(th),"That uses the sine ratio with the adjacent side. Sine pairs the opposite side with the hypotenuse."],
              [c*u9cos(th),"That uses the cosine ratio, which pairs the adjacent side with the hypotenuse, not with the opposite side."]];
    givenLab=["", "?", String(c)]; findLab="b";
  }
  var dists=u9mkD(ans,distVals);
  var q=mcq("In the right triangle shown, the right angle is at A and angle B is \\("+th+"^\\circ\\). Find the length of the side marked ?, to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the setup "+(mode===0?"uses sine with the hypotenuse":mode===1?"uses cosine with the hypotenuse":"uses tangent with the adjacent side")+" and solves to that length."}, dists,
    "Pick the ratio built from the known side and the side being found, for angle B. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The side is <b>"+fmtF(ans,1)+"</b> long.",
    {mode:"bridge-find-side", th:th, sub:mode});
  q.figure=u9fig(a,b,c,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["For the marked angle, name the known side and the side being found: opposite, adjacent or hypotenuse.", "Choose the ratio that uses exactly those two sides, then solve it."]);

E("u9r-find-side-workplace", 9, ["5.3"], 2, "gen", function(){
  var th=ri(24,62), mode=ri(0,3), ctx=ri(0,2);
  var a,b,c,ans,setup,distVals,story,givenLab;
  var ctxNames=["ladder","ramp","roof"];
  if(mode===0){
    a=ri(4,9); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(b);
    setup="\\sin "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9cos(th),"That finds the distance along the ground. The height up the wall is the side opposite the angle."]];
    givenLab=[String(a),"?",""];
    story=["A ladder "+a+" m long leans on a wall, making an angle of "+th+" degrees with the ground, as shown. How high up the wall does the ladder reach, in metres?",
           "A loading ramp "+a+" m long makes an angle of "+th+" degrees with the ground, as shown. How high is the top of the ramp, in metres?",
           "A roof rafter "+a+" m long rises at an angle of "+th+" degrees from the wall plate, as shown. How high does the rafter rise, in metres?"][ctx];
  } else if(mode===1){
    a=ri(4,9); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(c);
    setup="\\cos "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9sin(th),"That finds the height. The distance along the ground is the side next to the angle."]];
    givenLab=[String(a),"", "?"];
    story=["A ladder "+a+" m long leans on a wall, making an angle of "+th+" degrees with the ground, as shown. How far is the foot of the ladder from the wall, in metres?",
           "A loading ramp "+a+" m long makes an angle of "+th+" degrees with the ground, as shown. How far out from the truck does the ramp reach, in metres?",
           "A roof rafter "+a+" m long rises at an angle of "+th+" degrees from the wall plate, as shown. What is the horizontal run of the rafter, in metres?"][ctx];
  } else if(mode===2){
    b=ri(3,8); a=b/u9sin(th); c=b/Math.tan(u9rad(th)); ans=u9r1(a);
    setup="\\sin "+th+"^\\circ = \\frac{"+b+"}{x}";
    distVals=[[b*u9sin(th),"That multiplies by the sine. The known side is the opposite side, so the hypotenuse comes from dividing."],
              [b/Math.tan(u9rad(th)),"That finds the side along the ground. The slanted length is the hypotenuse."]];
    givenLab=["?",String(b),""];
    story=["A worker must reach a point "+b+" m up a wall with a ladder set at "+th+" degrees to the ground, as shown. How long must the ladder be, in metres?",
           "A dock ramp must rise "+b+" m at an angle of "+th+" degrees to the ground, as shown. How long must the ramp surface be, in metres?",
           "A roof must rise "+b+" m with rafters set at "+th+" degrees, as shown. How long must each rafter be, in metres?"][ctx];
  } else {
    c=ri(3,8); b=c*Math.tan(u9rad(th)); a=Math.sqrt(b*b+c*c); ans=u9r1(b);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+c+"}";
    distVals=[[c*u9sin(th),"That uses the sine ratio with the ground distance. Tangent pairs the height with the ground distance."]];
    givenLab=["", "?", String(c)];
    story=["A ladder foot sits "+c+" m from a wall and the ladder makes an angle of "+th+" degrees with the ground, as shown. How high does it reach, in metres?",
           "A ramp starts "+c+" m out from a loading door and rises at "+th+" degrees, as shown. How high is the door sill, in metres?",
           "A roof run is "+c+" m and the rafters rise at "+th+" degrees, as shown. How high is the ridge above the wall plate, in metres?"][ctx];
  }
  var dists=u9mkD(ans,distVals);
  var q=mcq(story+" Give the answer to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the ratio matches the known side and the side being found, and it solves to that value."}, dists,
    "Draw the right triangle in your work and pick the ratio using the known side and the side being found. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"bridge-workplace", th:th, sub:mode, ctx:ctxNames[ctx]});
  q.figure=u9fig(a,b,c,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["Sketch the right triangle and mark the known side and the side being found for the given angle.", "Choose the ratio that uses exactly those two sides, then solve it."]);

E("u9r-find-angle", 9, ["5.3"], 2, "gen", function(){
  var th=ri(24,66), mode=ri(0,2), hyp=ri(14,30);
  var opp=hyp*u9sin(th), adj=hyp*u9cos(th);
  var oppD=u9r1(opp), adjD=u9r1(adj);
  var ans, setup, givenLab, invName;
  if(mode===0){
    ans=Math.round(u9deg(Math.asin(oppD/hyp))); invName="\\sin^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(oppD,1)+"}{"+hyp+"}\\right)";
    givenLab=[String(hyp),fmtF(oppD,1),""];
  } else if(mode===1){
    ans=Math.round(u9deg(Math.acos(adjD/hyp))); invName="\\cos^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(adjD,1)+"}{"+hyp+"}\\right)";
    givenLab=[String(hyp),"",fmtF(adjD,1)];
  } else {
    ans=Math.round(u9deg(Math.atan(oppD/adjD))); invName="\\tan^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(oppD,1)+"}{"+fmtF(adjD,1)+"}\\right)";
    givenLab=["",fmtF(oppD,1),fmtF(adjD,1)];
  }
  var dists=u9mkDeg(ans,[
    [90-ans, "That is the other acute angle in the triangle. The two given sides belong to the ratio for angle B."],
    [mode===0 ? u9deg(Math.acos(oppD/hyp)) : u9deg(Math.asin(adjD/hyp)), "That uses the wrong inverse ratio for the two given sides. Match the ratio to the sides first."]
  ]);
  var q=mcq("In the right triangle shown, the right angle is at A and the marked sides are given. Find the measure of angle B, to the nearest degree.",
    {t:String(ans), fb:"Yes: the inverse ratio built from the two given sides gives angle B."}, dists,
    "Build the ratio for angle B from the two given sides, then use its inverse to get an angle. \\[ \\begin{aligned} B &= "+setup+" \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The measure of angle B is <b>"+ans+" degrees</b>.",
    {mode:"bridge-find-angle", th:th, sub:mode});
  q.figure=u9fig(hyp,opp,adj,givenLab,["90°","?",""]);
  return q;
}, ["Name the two given sides for angle B: opposite, adjacent or hypotenuse.", "Write the ratio from those sides, then use the inverse ratio to turn it into an angle."]);

E("u9r-elevation-depression", 9, ["5.3"], 2, "gen", function(){
  var th=ri(18,52), mode=ri(0,2), d,h,ans,setup,distVals,story,givenLab;
  if(mode===0){
    d=ri(20,80); h=d*Math.tan(u9rad(th)); ans=u9r1(h);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+d+"}";
    distVals=[[d*u9sin(th),"That uses the sine ratio with the ground distance. Tangent pairs the height with the ground distance."],
              [d/Math.tan(u9rad(th)),"That divides by the tangent. The height is the tangent times the ground distance."]];
    givenLab=["", "?", String(d)];
    story="From a point "+d+" m from the base of a light pole, the angle of elevation to the top of the pole is "+th+" degrees, as shown. The angle of elevation is the angle between the ground and the line of sight, looking up. How tall is the pole, in metres?";
  } else if(mode===1){
    h=ri(15,45); d=h/Math.tan(u9rad(th)); ans=u9r1(d);
    setup="\\tan "+th+"^\\circ = \\frac{"+h+"}{x}";
    distVals=[[h*Math.tan(u9rad(th)),"That multiplies the height by the tangent. The ground distance comes from dividing the height by the tangent."],
              [h*u9cos(th),"That uses the cosine ratio, which needs the slanted line of sight length. That length is not given."]];
    givenLab=["", String(h), "?"];
    story="From a point on the ground, the angle of elevation to the top of a "+h+" m tower is "+th+" degrees, as shown. The angle of elevation is the angle between the ground and the line of sight, looking up. How far is the point from the base of the tower, in metres?";
  } else {
    h=ri(20,60); d=h/Math.tan(u9rad(th)); ans=u9r1(d);
    setup="\\tan "+th+"^\\circ = \\frac{"+h+"}{x}";
    distVals=[[h*Math.tan(u9rad(th)),"That multiplies the height by the tangent. The distance out comes from dividing the height by the tangent."],
              [h*u9sin(th),"That uses the sine ratio, which needs the slanted line of sight length. That length is not given."]];
    givenLab=["", String(h), "?"];
    story="From the top of a "+h+" m lookout, the angle of depression to a boat is "+th+" degrees. The angle of depression is the angle between the horizontal and the line of sight, looking down, and it equals the marked angle at the boat in the diagram. How far is the boat from the base of the lookout, in metres?";
  }
  var hyp=Math.sqrt(d*d+h*h);
  var dists=u9mkD(ans,distVals);
  var q=mcq(story+" Give the answer to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the height and the ground distance are the two legs, so the tangent ratio connects them with the angle."}, dists,
    "The height and the ground distance are the opposite and adjacent legs for the marked angle, so use the tangent ratio. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"bridge-elevation", th:th, sub:mode});
  q.figure=u9fig(hyp,h,d,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["The height and the ground distance are the two legs of a right triangle. Name them opposite and adjacent for the marked angle.", "The ratio using the two legs is tangent. Set it up with the angle, then solve."]);

E("u9r-reasonable-result", 9, ["5.3"], 2, "gen", function(){
  var mode=ri(0,2), q;
  if(mode===0){
    var w=ri(6,16), h=ri(6,16); if(h===w) h+=2;
    var hyp=Math.sqrt(w*w+h*h), hypR=u9r1(hyp);
    var claim=u9r1(Math.sqrt(Math.abs(w*w-h*h))), longer=Math.max(w,h);
    q=mcq("A rectangular gate frame is "+w+" m wide and "+h+" m tall, with a diagonal brace running from one corner to the opposite corner. A student calculates the length of the brace as "+fmtF(claim,1)+" m. Which statement best judges this result?",
      {t:"It cannot be correct, because the brace is the hypotenuse of a right triangle, and the hypotenuse is always its longest side.", fb:"Yes: the brace is the hypotenuse of the right triangle formed by the frame, so it must be longer than the longer side, "+longer+" m. The claimed length is shorter than that side."},
      [{t:"It is reasonable, because a diagonal brace can come out shorter than the longer side of the rectangular frame it crosses.", fb:"The brace is a hypotenuse, and a hypotenuse is always the longest side of its triangle. A brace shorter than the side it crosses cannot come from a correct calculation."},
       {t:"It cannot be correct, because the length of the brace must be equal to the width of the frame and its height added together.", fb:"The brace is shorter than the width and height added together, never equal to them. That is not the test that fails here; the brace also has to beat the longer side on its own."},
       {t:"It is reasonable, because the Pythagorean relation can produce a length that is smaller than one of the sides it is built from.", fb:"The Pythagorean relation produces the hypotenuse, which is longer than either side. A result smaller than a side means the squares were subtracted instead of added, or a similar slip."}],
      "Judge the claim against the sides before anything else. The brace is the hypotenuse of a right triangle with legs "+w+" m and "+h+" m, so it must be longer than the longer leg, "+longer+" m. The claimed "+fmtF(claim,1)+" m is shorter than that, so it cannot be right; a value like this is the mark of subtracting the squares instead of adding them. Done correctly: \\[ \\begin{aligned} \\text{brace} &= \\sqrt{"+w+"^2 + "+h+"^2} \\\\ &= "+fmtF(hypR,1)+" \\text{ m} \\end{aligned} \\] The brace is <b>"+fmtF(hypR,1)+" m</b> long.",
      {mode:"bridge-reasonable", sub:0});
    q.figure=u9fig(hyp,h,w,["?",String(h),String(w)],["90°","",""]);
    return q;
  }
  if(mode===1){
    var H=ri(24,48), D=ri(18,40);
    var correct=Math.round(u9deg(Math.atan(H/D))), claimA=180-correct;
    var hypT=Math.sqrt(H*H+D*D);
    q=mcq("A student stands "+D+" m from the base of a tower "+H+" m tall and calculates the angle of elevation to the top of the tower as "+claimA+" degrees. The angle of elevation is the angle between the ground and the line of sight, looking up. Which statement best judges this result?",
      {t:"It cannot be correct, because the angle of elevation is an acute angle of a right triangle, and acute angles measure under 90 degrees.", fb:"Yes: the tower, the ground and the line of sight form a right triangle, and its acute angles add to 90 degrees. One of them cannot measure "+claimA+" degrees."},
      [{t:"It is reasonable, because the angle of elevation goes past 90 degrees whenever the tower is taller than the distance to its base.", fb:"A taller tower makes the angle larger, but the line of sight still rises from the ground, so the angle stays under 90 degrees. Past 90 would mean looking back over your own head."},
       {t:"It cannot be correct, because the angle of elevation must be found by dividing the height of the tower by the distance to its base.", fb:"Dividing the height by the distance gives the tangent of the angle, not the angle itself; an inverse ratio is needed after that. The failing check is the size of the angle claimed: it is past 90 degrees."},
       {t:"It is reasonable, because an inverse tangent calculation can return an angle larger than 90 degrees when the object is tall enough.", fb:"Inverse tangent returns the acute angle with the given tangent. In a right triangle that angle is always under 90 degrees, however tall the object is."}],
      "The tower, the ground and the line of sight form a right triangle, so the angle of elevation is one of its acute angles and has to measure under 90 degrees. The claimed "+claimA+" degrees fails that check; it is what comes from subtracting the angle from 180 degrees. Done correctly: \\[ \\begin{aligned} \\tan\\theta &= \\frac{"+H+"}{"+D+"} \\\\ \\theta &= "+correct+"^\\circ \\end{aligned} \\] The angle of elevation is <b>"+correct+" degrees</b>.",
      {mode:"bridge-reasonable", sub:1});
    q.figure=u9fig(hypT,H,D,["",String(H),String(D)],["90°","?",""]);
    return q;
  }
  var S=ri(12,20), T=ri(38,48);
  var trueH=S*Math.tan(u9rad(T)), trueHR=u9r1(trueH), claimH=Math.round(trueH*10);
  var hypS=Math.sqrt(trueH*trueH+S*S);
  q=mcq("A flagpole casts a shadow "+S+" m long while the angle of elevation of the sun is "+T+" degrees. A student calculates the height of the flagpole as "+claimH+" m. Which statement best judges this result?",
    {t:"It cannot be correct, because with the sun angle near 45 degrees the height should be roughly the same size as the shadow, not ten times it.", fb:"Yes: the tangent of an angle near 45 degrees is near 1, so the height and the shadow come out about the same size. The claim is about ten times too big."},
    [{t:"It is reasonable, because the height of a pole is not limited by the length of its shadow, and the two can differ by any amount at all here.", fb:"The height is tied to the shadow by the sun angle: height equals shadow times the tangent of the angle. With the angle near 45 degrees, the two lengths land close together."},
     {t:"It cannot be correct, because the height of the pole must be found by dividing the shadow length by the sun angle in degrees alone.", fb:"Dividing a length by an angle is not a step in any trig ratio. The failing check is scale: the claimed height is far too large for this shadow and sun angle."},
     {t:"It is reasonable, because the tangent ratio often makes the height come out many times longer than the shadow that produced it in the first place.", fb:"Tangent multiplies the shadow by the tangent of the angle, which is near 1 here. It cannot stretch a "+S+" m shadow into a "+claimH+" m pole."}],
    "Compare the claim with the shadow before anything else. The height and the shadow are the two legs for the sun angle, joined by the tangent ratio: \\[ \\begin{aligned} \\text{height} &= "+S+" \\tan "+T+"^\\circ \\\\ &= "+fmtF(trueHR,1)+" \\text{ m} \\end{aligned} \\] With the angle near 45 degrees the tangent is near 1, so the height should land close to the "+S+" m shadow. The claimed "+claimH+" m is about ten times that, the mark of a slipped decimal point. The height is <b>"+fmtF(trueHR,1)+" m</b>.",
    {mode:"bridge-reasonable", sub:2});
  q.figure=u9fig(hypS,trueH,S,["","?",String(S)],["90°",T+"°",""]);
  return q;
}, ["Put the claimed result next to the other sizes in the problem and ask whether it could possibly fit the picture.", "Run the quick checks: the hypotenuse beats every leg, an acute angle stays under 90 degrees, and a result should match the scale of its scenario."]);

/* Bridging provenance (Jason's ruling, November 8, 2026): entries named here
   carry their true Math 1202 source indicator as bridgeSrc, with bridging set
   true, alongside the Unit 9 checker code in `indicators`. */
var BRIDGE_SRC={
  "u9r-find-side":"MA1202.5.5",
  "u9r-find-side-workplace":"MA1202.5.5",
  "u9r-find-angle":"MA1202.5.5",
  "u9r-reasonable-result":"MA1202.5.6"
};
BANK.forEach(function(e){ var s=BRIDGE_SRC[e.id]; if(s){ e.bridging=true; e.bridgeSrc=s; } });
