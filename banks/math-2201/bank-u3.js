// Math 2201 Unit 3: Quadratic Equations question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1363 to 1405).
// CRMARKS: u3-factor-solve=2
// CRMARKS: u3-formula=2
// CRMARKS: u3-context-area=3
// CRMARKS: u3-discriminant-value=1
// CRMARKS: u3-equal-roots-constant=2
// CRMARKS: u3-solve-nonmonic=2
// CRMARKS: u3-solve-rearrange=2
// CRMARKS: u3-formula-negative-a=2
// CRMARKS: u3-formula-ground=2
// CRMARKS: u3-other-root=1
// CRMARKS: u3-sum-squares-solve=2
// CRMARKS: u3-right-triangle-legs=2
/* ============ Unit 3: Quadratic Equations ============ */
E("u3-factor-solve",3,["4.8"],2,"gen",function(){
  var p=ri(-8,-1),q=ri(1,9);var b=-(p+q),c=p*q;var askBig=Math.random()<0.5;
  return numq("Solve by factoring: "+"\\("+quadB(1,b,c)+" = 0\\)"+". Give the "+(askBig?"larger":"smaller")+" root.",
    askBig?q:p,0.011,"Factor: \\((x "+(p>0?"- "+p:"+ "+(-p))+")(x "+(q>0?"- "+q:"+ "+(-q))+") = 0\\), so \\(x = "+p+"\\) or \\(x = "+q+"\\) (check by substituting back). The "+(askBig?"larger":"smaller")+" root is <b>\\("+(askBig?q:p)+"\\)</b>.",{p:p,q:q,askBig:askBig});
});
E("u3-formula",3,["4.9"],2,"gen",function(){
  var a=pick([1,1,2]),b=ri(-9,9)||3,c=ri(-8,8)||-4;var D=b*b-4*a*c,guard=0;
  while((D<=0||Math.sqrt(D)===Math.floor(Math.sqrt(D)))&&guard++<60){b=ri(-9,9)||3;c=ri(-8,8)||-4;D=b*b-4*a*c;}
  var r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);var big=Math.max(r1,r2);
  return numq("Use the quadratic formula to solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Give the larger root, to two decimal places.",
    Math.round(big*100)/100,0.011,"\\(D = b^2 - 4ac = "+D+"\\). \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), giving \\(x \\approx "+fmt(r1)+"\\) or \\(x \\approx "+fmt(r2)+"\\). The larger root is <b>\\("+fmt(big)+"\\)</b>.",{a:a,b:b,c:c,D:D});
});
E("u3-discriminant",3,["4.7"],2,"var",varset([
  function(){
  var kind=pick(["two","one","zero"]);var a=pick([1,2]),b,c,D;
  if(kind==="one"){b=pick([4,6]);c=b*b/(4*a);D=0;}
  else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
  else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
  var correct=kind==="two"?"Two x-intercepts \u2014 the discriminant is positive":kind==="one"?"One x-intercept \u2014 the discriminant is zero":"No x-intercepts \u2014 the discriminant is negative";
  return mcq("How many x-intercepts does the graph of \\(y = "+quadB(a,b,c)+"\\) have?",correct,
    ["Two x-intercepts \u2014 the discriminant is positive","One x-intercept \u2014 the discriminant is zero","No x-intercepts \u2014 the discriminant is negative","It is impossible to tell without graphing"].filter(function(s){return s!==correct;}),
    "Discriminant: \\(b^2 - 4ac = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(D>0?"Positive, so the parabola crosses the x-axis twice.":D===0?"Zero, so the vertex just touches the x-axis \u2014 one intercept (a repeated root).":"Negative, so the parabola never reaches the x-axis."),{a:a,b:b,c:c,D:D});
},
  function(){
  var kind=pick(["two","one","zero"]);var a=pick([1,2]),b,c,D;
  if(kind==="one"){b=pick([4,6]);c=b*b/(4*a);D=0;}
  else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
  else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
  var correct=kind==="two"?"Two x-intercepts \u2014 the discriminant is positive":kind==="one"?"One x-intercept \u2014 the discriminant is zero":"No x-intercepts \u2014 the discriminant is negative";
  var qfig=mcq("How many x-intercepts does the parabola shown in the graph have?",correct,
    ["Two x-intercepts \u2014 the discriminant is positive","One x-intercept \u2014 the discriminant is zero","No x-intercepts \u2014 the discriminant is negative","It is impossible to tell without graphing"].filter(function(s){return s!==correct;}),
    "Discriminant: \\(b^2 - 4ac = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(D>0?"Positive, so the parabola crosses the x-axis twice.":D===0?"Zero, so the vertex just touches the x-axis \u2014 one intercept (a repeated root).":"Negative, so the parabola never reaches the x-axis."),{a:a,b:b,c:c,D:D});
  var mk=[];if(D>0){var sq=Math.sqrt(D);mk=[{x:(-b-sq)/(2*a),y:0},{x:(-b+sq)/(2*a),y:0}];}else if(D===0){mk=[{x:-b/(2*a),y:0}];}
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:mk});
  return qfig;
}
]));
E("u3-roots-zeros",3,["4.6"],1,"var",varset([
  figArm(function(){return mcq("The equation \\(x^2 - 5x + 6 = 0\\) has roots \\(2\\) and \\(3\\). What does that say about the function \\(f(x) = x^2 - 5x + 6\\)?",
    "Its zeros are \\(2\\) and \\(3\\), and its graph crosses the x-axis at \\((2, 0)\\) and \\((3, 0)\\)",
    ["Its vertex is at \\((2, 3)\\), because the two roots become the coordinates of the turning point","Its y-intercept is \\(6\\) and its maximum is \\(3\\), so the graph never crosses the x-axis at all","Its zeros are \\(-2\\) and \\(-3\\), because finding the zeros changes the sign of each root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are three names for the same numbers \u2014 where the function\u2019s value is \\(0\\).",{});},figRootsZeros1),
  figArm(function(){return mcq("A quadratic function\u2019s graph touches the x-axis at exactly one point. What is true of the corresponding equation?",
    "It has one root, repeated \u2014 the discriminant is zero",
    ["It has two different roots, as most quadratics do","It has no roots at all, because touching is not the same as crossing","Its discriminant is positive, as it is whenever a graph meets the axis"],
    "Touching at one point means one x-intercept, which matches a repeated root and \\(D = 0\\).",{});},figRootsZeros2),
  figArm(function(){return mcq("The graph of a quadratic function crosses the x-axis at \\(x = -4\\) and \\(x = 1\\). What are the roots of the corresponding quadratic equation?",
    "\\(-4\\) and \\(1\\) \u2014 the x-intercepts of the graph are exactly the roots of the equation",
    ["\\(4\\) and \\(-1\\), the opposite signs, because the roots change sign when read from the graph","There are no roots, because the graph crosses the axis instead of touching it","Only \\(1\\) \u2014 a root cannot be negative, so the crossing at \\(-4\\) does not count as a root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are the same numbers, signs included.",{});},figRootsZeros3)
]));
E("u3-context-area",3,["4.3"],2,"gen",function(){
  var w=ri(3,15),d=ri(2,12);var A=w*(w+d);
  var obj=pick(["garden","patio","deck","vegetable plot","parking pad"]);
  var q=numq("A rectangular "+obj+"'s length is "+d+" m more than its width. Its area is \\("+A+"\\text{ m}^2\\). What is the width, in metres?",
    w,0.011,"Let the width be \\(w\\). Then \\[\\begin{aligned} w(w + "+d+") &= "+A+" \\\\ w^2 + "+d+"w - "+A+" &= 0 \\\\ (w + "+(w+d)+")(w - "+w+") &= 0 \\end{aligned}\\] The roots are \\(w = "+w+"\\) and \\(w = -"+(w+d)+"\\); a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",{w:w,d:d});
  q.figure=rectDiagSVG("w m","w + "+d+" m","Area = "+A+" m\u00B2");
  return q;
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 3 (Quadratic Equations prerequisites), borrowed support
   set. The cluster's factoring core is the guide-named PK.2 family
   in bank-fix.js, which stays coded and untouched; these four
   borrowed entries sample the cluster's other named prerequisites.
   Provenance (host id: source entry in its home bank, the feeder
   indicator it assesses, verified by draw sweep):
   - u3-pk-gcf: copied from math-1201 u3-gcf, indicator 3.10.
   - u3-pk-binom-tri-expand: copied from math-1201 u3-binom-tri-expand, indicator 3.4.
   - u3-pk-solve-two-step: copied from math-9 u5-solve-two-step, indicator 8.18
     (a shared source: the same generator is also copied into Units 4 and 8
     under their own host ids, because equation solving underpins all three).
   - u3-pk-radical-mixed: copied from math-1201 u2-radical-mixed, indicator 1.16
     (also copied into Unit 4 under its own host id). DEVIATION from the
     source, this host copy only: the generator's radical index is fixed
     at 2 (square roots only), because Unit 3 readiness needs square-root
     simplification for the quadratic formula and quadratic roots, not
     cube or fourth roots (Jason's ruling, November 15, 2026). The
     math-1201 source and the Unit 4 host copy keep the full index range.
   The u3 and u2 helper families these entries call were copied into
   bank-helpers.js with the tranche. Indicator tags are support tags,
   not assessed targets: assessed targets are in pkSrc, the full
   dependent list in pkFor. */
E("u3-pk-gcf", 3, ["4.8"], 2, "gen", function () {
  var gp = ri(0, 2), gn, tries = 0;
  if (gp === 0) gn = ri(2, 7); else gn = pick([1, 2, 3, 4, 5, 6]);
  var A = ri(1, 6), B = u3Nz(-6, 6), C = u3Nz(-6, 6);
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && tries < 60) { tries++; A = ri(1, 6); B = u3Nz(-6, 6); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw = gRaw + u3Par(quo, "x");
  var cands = [], seen = {};
  function addCand(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  /* partial factor: only part of the common factor is removed */
  if (gn > 1) {
    var divs = [];
    for (var d = 1; d < gn; d++) if (gn % d === 0) divs.push(d);
    var dv = pick(divs), sc = gn / dv;
    addCand(u3Str([[dv, gp, 0]]) + u3Par([A * sc, B * sc, C * sc], "x"));
  } else {
    addCand(u3Str([[1, gp - 1, 0]]) + "(" + u3Str([[A, 3, 0], [B, 2, 0], [C, 1, 0]]) + ")");
  }
  /* quotient slips: one term not divided correctly */
  addCand(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addCand(gRaw + u3Par([A, B, gn * C], "x"));
  addCand(gRaw + u3Par([A, B, -C], "x"));
  addCand(gRaw + u3Par([A + 1, B, C], "x"));
  var prompt = "Determine the greatest common factor of the terms of \\(" + polyRaw + "\\), and express the polynomial in factored form.";
  var sol = "Every term contains the factor \\(" + gRaw + "\\). Dividing each term by \\(" + gRaw + "\\) leaves \\(" + u3PC(quo, "x") + "\\), whose terms share no further common factor." +
    u3Alg([polyRaw + " &= " + keyRaw]) +
    "In factored form, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});
E("u3-pk-binom-tri-expand", 3, ["4.8"], 2, "gen", function () {
  var A = [ri(1, 3), u3Nz(-5, 5)];
  var B = [ri(1, 3), u3Nz(-5, 5), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, "x");
  var partials = u3Mul(u3TermsOf(A, "x"), u3TermsOf(B, "x"));
  var prompt = "Expand and simplify \\(" + u3Par(A, "x") + u3Par(B, "x") + "\\).";
  var sol = "Multiply each term of the binomial by each of the three terms of the trinomial, giving six partial products, then combine like terms." +
    u3Alg([u3Par(A, "x") + u3Par(B, "x") + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, "x", 3), sol,
    { t: "expand", P: u3TermsOf(A, "x"), Q: u3TermsOf(B, "x") });
});
E("u3-pk-solve-two-step", 3, ["4.8"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);
E("u3-pk-radical-mixed", 3, ["4.9"], 1, "gen",function(){
  var idx=2,k,m,N,mlist;
  if(idx===2){k=ri(2,15);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30,31,33,34,35,37,38,39];}
  else if(idx===3){k=ri(2,7);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30,31,33,34,35,36,37,38,39,41,42];}
  else{k=ri(2,4);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);N=Math.pow(k,idx)*m;
  var key="\\("+k+u2radS(idx,m)+"\\)";
  var mAlt=pick(mlist.filter(function(x){return x!==m;}));
  var cands=["\\("+(k+1)+u2radS(idx,m)+"\\)","\\("+k+u2radS(idx,mAlt)+"\\)","\\("+(k*k)+u2radS(idx,m)+"\\)"];
  if(k>2)cands.push("\\("+(k-1)+u2radS(idx,m)+"\\)");
  cands.push("\\("+k+u2radS(idx,m*2)+"\\)");
  var ds=u2pickS3(key,cands);
  return mcq("Express \\("+u2radS(idx,N)+"\\) as a <b>mixed radical</b> in simplest form.",
    key,ds,
    "Pull out the largest perfect "+(idx===2?"square":idx===3?"cube":"fourth power")+" factor of \\("+N+"\\): \\["+
    "\\begin{aligned} "+u2radS(idx,N)+" &= "+u2radS(idx,Math.pow(k,idx)+" \\times "+m)+" \\\\ &= "+k+u2radS(idx,m)+" \\end{aligned} \\]"+
    " The mixed radical in simplest form is <b>\\("+k+u2radS(idx,m)+"\\)</b>.",
    {idx:idx,k:k,m:m,N:N});
});
/* ============ Expansion (November 18, 2026) ============
   Bank expansion programme, Unit 3 pass: 12 new indicator templates
   and 4 new prior knowledge templates, authored new (new question
   shapes, contexts and solution paths, not re-skins of the entries
   above). Before this pass the unit held 34 templates; counted the
   way the Unit 2 pass counted (indicator pools exclude prior
   knowledge entries), its pools stood at 4.3: 7, 4.6: 8, 4.7: 3,
   4.8: 4, 4.9: 6, and the prior knowledge pool at 7 (the coded PK.2
   family of 3 plus 4 borrowed entries, with three of its five skill
   groups resting on a single entry). Indicator 4.7 rested on three
   templates, all selected response, and indicator 4.8 on four.
   After this pass every indicator pool holds at least 6 templates
   and the unit holds 50. The four prior knowledge entries are
   authored new in the Unit 2 expansion's pattern, each taking its
   skill group from one entry to two; their provenance is recorded
   in PKT_U3 below. A small right triangle figure builder for the
   4.3 modelling item comes first. */
function u3RightTriSVG(s,l,h,d,mirror){
  var W=300,H=230,base=188;
  var sc=160/l;
  var hx=Math.max(60,Math.round(s*sc)),vy=Math.round(l*sc);
  var x0=mirror?204:96,y0=base,x1=mirror?x0-hx:x0+hx,y1=base-vy;
  var dx=mirror?-1:1,sq=11;
  return '<svg viewBox="0 0 '+W+' '+H+'" width="300" height="230" role="img" aria-label="Right triangle with shorter leg x, longer leg x plus '+d+', and hypotenuse '+h+'">'
    +'<polygon points="'+x0+','+y0+' '+x0+','+y1+' '+x1+','+y0+'" fill="#eef3f8" stroke="#333" stroke-width="1.8"/>'
    +'<path d="M '+(x0+dx*sq)+' '+y0+' L '+(x0+dx*sq)+' '+(y0-sq)+' L '+x0+' '+(y0-sq)+'" fill="none" stroke="#333" stroke-width="1.3"/>'
    +'<text x="'+((x0+x1)/2)+'" y="'+(y0+22)+'" text-anchor="middle" font-size="14" fill="#222">x m</text>'
    +'<text x="'+(mirror?x0+10:x0-10)+'" y="'+((y0+y1)/2)+'" text-anchor="'+(mirror?"start":"end")+'" font-size="14" fill="#222">(x + '+d+') m</text>'
    +'<text x="'+(((x0+x1)/2)+dx*16)+'" y="'+(((y0+y1)/2)-12)+'" text-anchor="middle" font-size="14" fill="#222">'+h+' m</text>'
    +'</svg>';
}
E("u3-vertex-intercepts",3,["4.7"],1,"gen",function(){
  var dir=Math.random()<0.5?"up":"down";
  var pos=pick([-1,0,1]);
  var h=ri(-6,6),k=pos===0?0:pos*ri(1,5);
  var count=pos===0?1:(((dir==="up"&&pos<0)||(dir==="down"&&pos>0))?2:0);
  var key=count===2?"Two x-intercepts":count===1?"One x-intercept":"No x-intercepts";
  var others=["Two x-intercepts","One x-intercept","No x-intercepts"].filter(function(s){return s!==key;});
  var where=pos===0?"on the x-axis":pos>0?"above the x-axis":"below the x-axis";
  return mcq("A parabola opens "+(dir==="up"?"upward":"downward")+" and its vertex is at \\(("+h+", "+k+")\\), which is "+where+". How many x-intercepts does its graph have?",
    key,[others[0],others[1],"It is impossible to tell without more information"],
    "The vertex is the graph's highest or lowest point, and the graph moves away from it in the direction it opens. "+(count===2?"The vertex sits on the opposite side of the x-axis from that direction, so the two arms must cross the axis: two x-intercepts.":count===1?"The vertex sits exactly on the x-axis, so the graph touches the axis there and nowhere else: one x-intercept.":"The vertex sits on the same side of the x-axis as the direction the graph opens, so the graph never reaches the axis: no x-intercepts."),
    {dir:dir,pos:pos,h:h,k:k});
});
E("u3-discriminant-value",3,["4.7"],1,"gen",function(){
  var a=pick([1,2,3]),b=ri(-9,9),c=ri(-9,9),tries=0;
  while(b===0&&c===0&&tries<40){b=ri(-9,9);c=ri(-9,9);tries++;}
  var D=b*b-4*a*c,ac4=4*a*c;
  return numq("What is the value of the discriminant of "+"\\("+quadB(a,b,c)+" = 0\\)"+"?",
    D,0.011,
    "\\(D = b^2 - 4ac\\). Here \\(a = "+a+"\\), \\(b = "+b+"\\) and \\(c = "+c+"\\), so \\[\\begin{aligned} D &= ("+b+")^2 - 4("+a+")("+c+") \\\\ &= "+(b*b)+(ac4>=0?" - "+ac4:" + "+(-ac4))+" \\\\ &= "+D+" \\end{aligned}\\] The discriminant is <b>\\("+D+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u3-equal-roots-constant",3,["4.7"],2,"gen",function(){
  var a=pick([1,1,2]);
  var b=a===1?pick([2,4,6,8,10,12,14]):pick([4,12,20]);
  if(Math.random()<0.5)b=-b;
  var k=(b*b)/(4*a);
  var stem=pick([
    "The equation \\("+(a===1?"":a)+"x^2 "+(b>0?"+ ":"- ")+Math.abs(b)+"x + k = 0\\) has exactly one real solution. What is the value of \\(k\\)?",
    "The equation \\("+(a===1?"":a)+"x^2 "+(b>0?"+ ":"- ")+Math.abs(b)+"x + k = 0\\) has two equal real roots. What is the value of \\(k\\)?"]);
  return numq(stem,k,0.011,
    "Exactly one (repeated) solution means the discriminant is zero: \\[\\begin{aligned} b^2 - 4ak &= 0 \\\\ ("+b+")^2 - "+(4*a)+"k &= 0 \\\\ "+(b*b)+" &= "+(4*a)+"k \\\\ k &= "+k+" \\end{aligned}\\] So \\(k = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b});
});
E("u3-which-no-roots",3,["4.7"],2,"gen",function(){
  function quadStr(t){return "\\("+quadB(t[0],t[1],t[2])+" = 0\\)";}
  var ka=pick([1,2]),kb=ri(-6,6);
  var kc=Math.floor((kb*kb)/(4*ka))+ri(1,5);
  var keyT=[ka,kb,kc],triples=[keyT],tries=0;
  while(triples.length<4&&tries<200){
    tries++;
    var r1=ri(-7,7),r2=ri(-7,7);
    if(r1===0||r2===0||r1===r2)continue;
    var t=[1,-(r1+r2),r1*r2],s=quadStr(t);
    if(triples.some(function(x){return quadStr(x)===s;}))continue;
    triples.push(t);
  }
  var opts=shuffle(triples).map(quadStr);
  var keyS=quadStr(keyT);
  return mcq("Which of these equations has no real roots?",
    keyS,opts.filter(function(s){return s!==keyS;}),
    "Compute each discriminant. For \\("+quadB(ka,kb,kc)+" = 0\\), \\(D = ("+kb+")^2 - 4("+ka+")("+kc+") = "+(kb*kb)+" - "+(4*ka*kc)+" = "+(kb*kb-4*ka*kc)+"\\), which is negative, so its graph never crosses the x-axis and it has no real roots. Each of the other three equations factors over the integers, so each of them has two real roots.",
    {triples:triples,key:keyT});
});
E("u3-solve-nonmonic",3,["4.8"],2,"gen",function(){
  var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
  var u=pick(pool),v=pick(pool.filter(function(x){return x!==u;}));
  var a=pick([2,3]);
  var A=a,B=-a*(u+v),C=a*u*v;
  var askBig=Math.random()<0.5;
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return numq("Solve by factoring: "+"\\("+quadB(A,B,C)+" = 0\\)"+". Give the "+(askBig?"larger":"smaller")+" root.",
    askBig?Math.max(u,v):Math.min(u,v),0.011,
    "The trinomial factors with its leading coefficient: \\("+quadB(A,B,C)+" = "+a+fs(u)+fs(v)+"\\). (Expanding \\("+a+fs(u)+fs(v)+"\\) gives \\("+quadB(A,B,C)+"\\) back.) Setting each bracket to zero gives \\(x = "+u+"\\) or \\(x = "+v+"\\). The "+(askBig?"larger":"smaller")+" root is <b>\\("+(askBig?Math.max(u,v):Math.min(u,v))+"\\)</b>.",
    {A:A,B:B,C:C,askBig:askBig});
});
E("u3-solve-rearrange",3,["4.8"],2,"gen",function(){
  var mode=ri(0,1),u,v,B,C,stem,ask,ans;
  if(mode===0){
    u=ri(2,9);v=ri(2,9);var t=0;while(v===u&&t<40){v=ri(2,9);t++;}
    B=-(u+v);C=u*v;
    stem="\\(x^2 + "+C+" = "+(u+v)+"x\\)";
    ask="smaller";ans=Math.min(u,v);
  }else{
    var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
    u=pick(pool.filter(function(x){return x>0;}));
    v=pick(pool.filter(function(x){return x<0&&x!==-u;}));
    B=-(u+v);C=u*v;
    var S=u+v,Q=-C;
    stem="\\(x^2 = "+(S>0?S+"x + ":"- "+(-S)+"x + ")+Q+"\\)";
    ask="larger";ans=Math.max(u,v);
  }
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return numq("Solve by factoring: "+stem+". Give the "+ask+" root.",
    ans,0.011,
    "Bring every term to the left first: \\("+quadB(1,B,C)+" = 0\\), which factors as \\("+fs(u)+fs(v)+" = 0\\). So \\(x = "+u+"\\) or \\(x = "+v+"\\); the "+ask+" root is <b>\\("+ans+"\\)</b>.",
    {B:B,C:C,mode:mode,ask:ask});
});
E("u3-solve-fraction-roots",3,["4.8"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function mkRoot(){var p,q,t=0;do{p=pick([-3,-2,-1,1,2,3]);q=pick([2,3,4]);t++;}while(gcd(p,q)!==1&&t<40);return [p,q];}
  function pair(p1,q1,p2,q2){return "\\(x = "+frB(p1,q1)+"\\) and \\(x = "+frB(p2,q2)+"\\)";}
  var r1,r2,lo,hi,A,B,C,key,ds,tries=0;
  do{
    r1=mkRoot();r2=mkRoot();tries++;
    if(r1[0]*r2[1]===r2[0]*r1[1]){ds=null;continue;}
    lo=r1[0]*r2[1]<r2[0]*r1[1]?r1:r2; hi=lo===r1?r2:r1;
    A=lo[1]*hi[1];B=-(lo[0]*hi[1]+hi[0]*lo[1]);C=lo[0]*hi[0];
    key=pair(lo[0],lo[1],hi[0],hi[1]);
    var cands=[pair(-lo[0],lo[1],-hi[0],hi[1]),pair(lo[1],lo[0],hi[1],hi[0]),pair(-lo[0],lo[1],hi[0],hi[1]),pair(lo[0],lo[1],-hi[0],hi[1])];
    ds=[];
    for(var i=0;i<cands.length&&ds.length<3;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  return mcq("Solve by factoring: "+"\\("+quadB(A,B,C)+" = 0\\)"+". What are the roots?",
    key,ds,
    "The equation factors as \\(("+lo[1]+"x "+(lo[0]>0?"- "+lo[0]:"+ "+(-lo[0]))+")("+hi[1]+"x "+(hi[0]>0?"- "+hi[0]:"+ "+(-hi[0]))+") = 0\\). From the first bracket, \\("+lo[1]+"x = "+lo[0]+"\\), so \\(x = "+frB(lo[0],lo[1])+"\\); from the second, \\(x = "+frB(hi[0],hi[1])+"\\). The roots are <b>"+key+"</b>.",
    {A:A,B:B,C:C,p1:lo[0],q1:lo[1],p2:hi[0],q2:hi[1]});
});
E("u3-formula-negative-a",3,["4.9"],2,"gen",function(){
  var a=pick([-1,-2]),b=ri(-9,9),c=ri(-9,9),D=b*b-4*a*c,tries=0;
  while((b===0||c===0||D<=0||Math.sqrt(D)===Math.floor(Math.sqrt(D)))&&tries<80){b=ri(-9,9);c=ri(-9,9);D=b*b-4*a*c;tries++;}
  var r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);
  var big=Math.max(r1,r2);
  return numq("Use the quadratic formula to solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Give the larger root, to two decimal places.",
    Math.round(big*100)/100,0.011,
    "\\(D = b^2 - 4ac = "+D+"\\). \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), giving \\(x \\approx "+fmt(r1)+"\\) or \\(x \\approx "+fmt(r2)+"\\). Mind the signs: with \\(a = "+a+"\\) the denominator \\(2a = "+(2*a)+"\\) is negative. The larger root is <b>\\("+fmt(big)+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u3-formula-ground",3,["4.9"],2,"gen",function(){
  var b=ri(13,29),c=ri(6,30),D=b*b+20*c,tries=0;
  while(Math.sqrt(D)===Math.floor(Math.sqrt(D))&&tries<80){b=ri(13,29);c=ri(6,30);D=b*b+20*c;tries++;}
  var t=(b+Math.sqrt(D))/10,tneg=(b-Math.sqrt(D))/10;
  var ctx=pick([["flare","fired from the top of a cliff","sea"],["rocket","launched from a raised platform","ground"],["ball","thrown from a balcony","ground"]]);
  return numq("A "+ctx[0]+" is "+ctx[1]+". Its height above the "+ctx[2]+" after \\(t\\) seconds is \\(h(t) = -5t^2 + "+b+"t + "+c+"\\) metres. How many seconds does it take to reach the "+ctx[2]+"? Give your answer to two decimal places.",
    Math.round(t*100)/100,0.011,
    "Reaching the "+ctx[2]+" means \\(h(t) = 0\\): \\(-5t^2 + "+b+"t + "+c+" = 0\\). This does not factor, so use the quadratic formula: \\[\\begin{aligned} t &= \\frac{-"+b+" \\pm \\sqrt{"+b+"^2 - 4(-5)("+c+")}}{2(-5)} \\\\ &= \\frac{-"+b+" \\pm \\sqrt{"+D+"}}{-10} \\end{aligned}\\] giving \\(t \\approx "+fmt(t)+"\\) or \\(t \\approx "+fmt(tneg)+"\\). A negative time would be before the launch, so the "+ctx[0]+" reaches the "+ctx[2]+" after <b>\\("+fmt(t)+"\\) s</b>.",
    {b:b,c:c});
});
E("u3-other-root",3,["4.6"],2,"gen",function(){
  var pool=[-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9];
  var g=pick(pool),o=pick(pool.filter(function(x){return x!==g;}));
  var B=-(g+o),C=g*o;
  return numq("One root of "+"\\("+quadB(1,B,C)+" = 0\\)"+" is \\("+g+"\\). What is the other root?",
    o,0.011,
    "For \\(x^2 + bx + c\\), the sum of the roots is \\(-b = "+(-B)+"\\). So the other root is \\("+(-B)+" - "+(g<0?"("+g+")":g)+" = "+o+"\\). (Check with the product: \\("+g+" \\times "+o+" = "+C+"\\), which is \\(c\\).) The other root is <b>\\("+o+"\\)</b>.",
    {B:B,C:C,given:g});
});
E("u3-sum-squares-solve",3,["4.3"],2,"gen",function(){
  var step=pick([1,2]);
  var n=step===2?2*ri(2,9):ri(3,16);
  var T=n*n+(n+step)*(n+step);
  var kind=step===2?"consecutive even integers":"consecutive integers";
  return numq("The sum of the squares of two positive "+kind+" is "+T+". What is the smaller of the two integers?",
    n,0.011,
    "Let the smaller integer be \\(x\\); the next is \\(x + "+step+"\\). Expanding, then dividing by 2 and collecting: \\[\\begin{aligned} x^2 + (x + "+step+")^2 &= "+T+" \\\\ 2x^2 + "+(2*step)+"x + "+(step*step)+" &= "+T+" \\\\ x^2 + "+step+"x - "+(n*(n+step))+" &= 0 \\\\ (x - "+n+")(x + "+(n+step)+") &= 0 \\end{aligned}\\] The roots are \\(x = "+n+"\\) and \\(x = -"+(n+step)+"\\); the integers are positive, so the smaller is <b>\\("+n+"\\)</b>. (Check: \\("+n+"^2 + "+(n+step)+"^2 = "+(n*n)+" + "+((n+step)*(n+step))+" = "+T+"\\).)",
    {step:step,T:T});
});
E("u3-right-triangle-legs",3,["4.3"],2,"gen",function(){
  var trip=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17],[12,16,20],[7,24,25],[20,21,29]]);
  var s=trip[0],l=trip[1],h=trip[2],d=l-s;
  var mirror=Math.random()<0.5;
  var q=numq("The two legs of a right triangle differ by "+d+" m. The hypotenuse is "+h+" m. How long is the shorter leg, in metres?",
    s,0.011,
    "Let the shorter leg be \\(x\\); the longer leg is \\(x + "+d+"\\). By the Pythagorean theorem: \\[\\begin{aligned} x^2 + (x + "+d+")^2 &= "+(h*h)+" \\\\ 2x^2 + "+(2*d)+"x + "+(d*d)+" &= "+(h*h)+" \\\\ x^2 + "+d+"x - "+(s*l)+" &= 0 \\\\ (x - "+s+")(x + "+l+") &= 0 \\end{aligned}\\] The positive root is \\(x = "+s+"\\), so the shorter leg is <b>\\("+s+"\\text{ m}\\)</b>. (Check: the longer leg is \\("+l+" m\\), and \\("+s+"^2 + "+l+"^2 = "+(s*s)+" + "+(l*l)+" = "+(h*h)+" = "+h+"^2\\).)",
    {d:d,h:h,mirror:mirror});
  q.figure=u3RightTriSVG(s,l,h,d,mirror);
  return q;
});
E("u3-pk-gcf-binomial",3,["4.8"],1,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  var g=ri(2,9),m=ri(1,5),n=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]),tries=0;
  while(gcd(m,Math.abs(n))!==1&&tries<60){n=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);tries++;}
  function lin(mm,nn){return (mm===1?"x":mm+"x")+(nn>0?" + "+nn:" - "+(-nn));}
  var key="\\("+g+"x("+lin(m,n)+")\\)";
  var ds=["\\("+g+"("+lin(m,n)+")\\)","\\("+g+"x("+lin(m,-n)+")\\)","\\("+g+"x("+m+"x"+(n>0?" + ":" - ")+Math.abs(g*n)+")\\)"];
  return mcq("Factor fully: \\("+(g*m)+"x^2 "+(g*n>0?"+ ":"- ")+Math.abs(g*n)+"x\\)",
    key,ds,
    "Both terms share the factor \\("+g+"x\\): \\("+(g*m)+"x^2 \\div "+g+"x = "+(m===1?"x":m+"x")+"\\) and \\("+(g*n)+"x \\div "+g+"x = "+n+"\\). Taking \\("+g+"x\\) out leaves <b>"+key+"</b>. (Multiply back to check: \\("+g+"x \\times "+(m===1?"x":m+"x")+" = "+(g*m)+"x^2\\), and \\("+g+"x \\times "+(n>0?"":"-")+Math.abs(n)+" = "+(g*n)+"x\\).)",
    {g:g,m:m,n:n});
},["Look for the greatest factor the two terms share, including a factor of x.","Divide each term by the shared factor; what is left goes inside the brackets."]);
E("u3-pk-expand-square",3,["4.8"],1,"gen",function(){
  var a=ri(-9,9);while(a===0)a=ri(-9,9);
  var key=quadT(1,2*a,a*a);
  var ds=[quadT(1,0,a*a),quadT(1,a,a*a),quadT(1,2*a,-(a*a))];
  return mcq("Expand and simplify \\((x "+(a>0?"+ ":"- ")+Math.abs(a)+")^2\\).",
    key,ds,
    "Squaring a binomial gives three terms: \\((x "+(a>0?"+ ":"- ")+Math.abs(a)+")^2 = x^2 + 2(x)("+a+") + ("+a+")^2 = \\)<b>"+key+"</b>. The middle term, \\("+(2*a)+"x\\), is twice the product of the two terms in the brackets; it does not vanish.",
    {a:a});
},["A square means the binomial multiplied by itself.","The middle term is twice the product of the two terms in the brackets."]);
E("u3-pk-solve-brackets",3,["4.8"],2,"gen",function(){
  var mode=ri(0,1),a=ri(2,7),b=ri(-8,8),x0=ri(-9,9),tries=0;
  while((b===0||x0===0)&&tries<40){b=ri(-8,8);x0=ri(-9,9);tries++;}
  if(mode===0){
    var R=a*(x0+b);
    return numq("Solve the equation \\("+a+"(x "+(b>0?"+ ":"- ")+Math.abs(b)+") = "+R+"\\). What is the value of \\(x\\)?",
      x0,0.01,
      "Undo the multiplication first, then the constant inside the brackets: \\[\\begin{aligned} "+a+"(x "+(b>0?"+ ":"- ")+Math.abs(b)+") &= "+R+" \\\\ x "+(b>0?"+ ":"- ")+Math.abs(b)+" &= "+(R/a)+" \\\\ x &= "+x0+" \\end{aligned}\\] So the solution is <b>\\(x = "+x0+"\\)</b>.",
      {a:a,b:b,R:R,mode:mode});
  }
  var R2=a*(b-x0);
  return numq("Solve the equation \\("+a+"("+b+" - x) = "+R2+"\\). What is the value of \\(x\\)?",
    x0,0.01,
    "Undo the multiplication first: \\("+a+"("+b+" - x) = "+R2+"\\) gives \\("+b+" - x = "+(R2/a)+"\\). Then \\(x = "+b+" - "+(R2/a)+" = "+x0+"\\). So the solution is <b>\\(x = "+x0+"\\)</b>.",
    {a:a,b:b,R:R2,mode:mode});
},["Undo the operations in reverse order: deal with the multiplication outside the brackets first.","Divide both sides by the number outside the brackets, then isolate x."]);
E("u3-pk-radical-coefficient",3,["4.9"],1,"gen",function(){
  var k0=ri(2,5),m=ri(2,4),r=pick([2,3,5,6,7,10,11,13,14,15]);
  if(k0===2&&m===2)m=3; /* else the added-coefficient distractor (k0 + m) equals the key (k0 x m) */
  var N=m*m*r;
  var key="\\("+(k0*m)+u2radS(2,r)+"\\)";
  var ds=["\\("+k0+u2radS(2,r)+"\\)","\\("+(k0+m)+u2radS(2,r)+"\\)","\\("+(k0*m)+u2radS(2,N)+"\\)"];
  return mcq("Simplify \\("+k0+"\\sqrt{"+N+"}\\), giving the answer in simplest radical form.",
    key,ds,
    "Simplify the radical first: \\(\\sqrt{"+N+"} = \\sqrt{"+(m*m)+" \\times "+r+"} = "+m+"\\sqrt{"+r+"}\\). Then multiply the coefficients: \\("+k0+" \\times "+m+" = "+(k0*m)+"\\), giving <b>"+key+"</b>.",
    {k0:k0,m:m,r:r,N:N});
},["Simplify the radical first, then combine it with the coefficient already outside.","The outside coefficient multiplies the coefficient that comes out of the root."]);

/* PK tranche pass for Unit 3. pkFor is Cluster 3's dependent
   indicator list from the prior knowledge map. */
var PKT_U3_FOR=["4.3","4.4","4.5","4.6","4.7","4.8","4.9","PK.2"];
var PKT_U3={
 "u3-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-binom-tri-expand":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"},
 "u3-pk-radical-mixed":{src:"math-1201:1.16, host copy index fixed at 2 (Jason ruling 2026-11-15)",group:"radicals"},
 "u3-pk-gcf-binomial":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-expand-square":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-solve-brackets":{src:"math-9:8.18",group:"linear-equations"},
 "u3-pk-radical-coefficient":{src:"math-1201:1.16",group:"radicals"}};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});
