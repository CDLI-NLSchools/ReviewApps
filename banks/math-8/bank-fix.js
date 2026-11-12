// Math 8 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 4166 to 4667).
// CRMARKS: u1-garden-diagonal-gap=2
// CRMARKS: u1-grid-distance-gap=2
// CRMARKS: u1-fence-perimeter-gap=3
// CRMARKS: u1-square-side-perimeter-gap=3
// CRMARKS: u1-two-ladders-gap=3
// CRMARKS: u1-shortcut-saving-gap=3
// CRMARKS: u2-square-minus-product-gap=2
// CRMARKS: u2-missing-factor-follow-gap=3
// CRMARKS: u2-fifth-day-temp-gap=3
// CRMARKS: u2-chain-negative-divisor-gap=3
// CRMARKS: u2-two-divers-gap=3
// CRMARKS: u3-area-decimal-gap=2
// CRMARKS: u3-bottles-roundup-gap=3
// CRMARKS: u3-chain-subtract-product-gap=3
// CRMARKS: u4-tank-litres-gap=2
// CRMARKS: u4-open-box-sa-gap=3
// CRMARKS: u5-down-then-up-gap=3
// CRMARKS: u5-unit-rate-cost-gap=3
// CRMARKS: u5-ratio-part-percent-gap=3
// CRMARKS: u6-decimal-coefficient-gap=2
// CRMARKS: u6-two-points-evaluate-gap=3
// CRMARKS: u7-expected-count-gap=2
// CRMARKS: u7-missing-mean-value-gap=2
// CRMARKS: u7-mean-difference-gap=3
// CRMARKS: u7-two-colours-twice-gap=3
// CRMARKS: u7-survey-scale-gap=3
// CRMARKS: u7-combined-mean-gap=3
// CRMARKS: u8-hidden-cubes-gap=2
// CRMARKS: u8-rotated-side-view-gap=3
// CRMARKS: u8-tiles-at-point-gap=3
// CRMARKS: u8-cube-volume-gap=3
// CRMARKS: u8-changed-side-view-gap=3
/* Pool-gap fill, November 9, 2026 */
/* Level 2 entries added to close the unit-test and exam composition gaps
   found by the November 9, 2026 level calibration diagnostic. New entries
   only; no existing entry was changed. CR entries always return numq and
   are tagged in CR_MARKS; the four SR entries always return mcq. */

/* Unit 1: Square Roots and the Pythagorean Theorem */
E("u1-garden-diagonal-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[12,35,37],[20,21,29]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var place=pick(["vegetable garden","school garden","community garden plot","rectangular lawn"]);
  var q=numq("A "+place+" is "+a+" m long and "+b+" m wide. A straight path runs from one corner of the rectangle to the opposite corner. How long is the path, in metres?", c, 0.01,
    "The path is the hypotenuse of a right triangle whose legs are the length and the width: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" m</b>.",
    {mode:"garden-diagonal", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["The straight path is the slanted side of a right triangle hidden in the rectangle.", "Square the length and the width, add the squares, then take the square root of the sum."]);

E("u1-grid-distance-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]);
  var kk=ri(1,2); var dx=base[0]*kk, dy=base[1]*kk, c=base[2]*kk;
  var x1=ri(0,4), y1=ri(0,4), x2=x1+dx, y2=y1+dy;
  var q=numq("On a grid map, a library stands at ("+x1+", "+y1+") and a skating rink stands at ("+x2+", "+y2+"). Each grid square represents 1 km. What is the straight-line distance between the library and the rink, in kilometres?", c, 0.01,
    "The two points give the legs of a right triangle: the horizontal change is "+x2+" - "+x1+" = "+dx+" and the vertical change is "+y2+" - "+y1+" = "+dy+". Then: \\[ \\begin{aligned} d^{2} &= "+dx+"^{2} + "+dy+"^{2} \\\\ &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" km</b>.",
    {mode:"grid-distance", x1:x1, y1:y1, x2:x2, y2:y2}); q.figure=m8GridDistSVG(x1,y1,x2,y2); return q;
}, ["Subtract the coordinates to find the two legs before using the theorem.", "Find the horizontal change and the vertical change first, then square and add them."]);

E("u1-fence-perimeter-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var bed=pick(["flower bed","herb plot","vegetable patch","rose garden","shrub bed"]);
  var q=numq("A triangular "+bed+" has two sides of "+a+" m and "+b+" m that meet at a right angle. The third side joins the ends of these two sides. Fencing is placed along all three sides of the bed. How many metres of fencing are needed?", a+b+c, 0.01,
    "First find the third side with the Pythagorean theorem: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] Then add all three sides for the perimeter: \\("+a+" + "+b+" + "+c+" = "+(a+b+c)+"\\). The answer is <b>"+(a+b+c)+" m</b>.",
    {mode:"fence-perimeter", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["The fencing follows all three sides, and one side length is not given directly.", "Find the third side with the Pythagorean theorem first, then add the three sides."]);

E("u1-square-side-perimeter-gap", 1, ["3.19", "5.2"], 2, "gen", function(){
  var s=ri(5,30); var area=s*s;
  var place2=pick(["patio","garden","mosaic floor","sandbox","dance floor"]);
  var q=numq("A square "+place2+" has an area of "+area+" square metres. A border is placed around all four sides of the patio. How many metres of border are needed?", 4*s, 0.01,
    "The side length is the square root of the area: \\[ \\begin{aligned} \\text{side} &= \\sqrt{"+area+"} \\\\ &= "+s+" \\end{aligned} \\] The border goes around four equal sides: \\(4 \\times "+s+" = "+(4*s)+"\\). The answer is <b>"+(4*s)+" m</b>.",
    {mode:"square-side-perimeter", s:s}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["The area of a square is its side length multiplied by itself.", "Take the square root of the area to get one side, then multiply by four."]);

E("u1-two-ladders-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var bases=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var TR=[]; bases.forEach(function(bs){ for(var k=1;k<=3;k++){ TR.push([bs[0]*k, bs[1]*k, bs[2]*k]); TR.push([bs[1]*k, bs[0]*k, bs[2]*k]); } });
  var t1=null, t2=null;
  for(var att=0; att<400 && !t1; att++){
    var p=pick(TR), q=pick(TR);
    if(p[0]===q[0] && p[1]!==q[1] && p[2]!==q[2]){ if(p[1]<q[1]){ t1=p; t2=q; } else { t1=q; t2=p; } }
  }
  if(!t1){ t1=[12,5,13]; t2=[12,9,15]; }
  var foot=t1[0], h1=t1[1], lad1=t1[2], h2=t2[1], lad2=t2[2];
  var wall=pick(["house","barn","lighthouse","school","silo"]);
  var q=numq("Two ladders lean against the wall of a "+wall+", and the foot of each ladder stands "+foot+" m from the wall. The first ladder is "+lad1+" m long and the second ladder is "+lad2+" m long. How much higher up the wall does the second ladder reach than the first ladder, in metres?", h2-h1, 0.01,
    "Apply the Pythagorean theorem to each ladder. For the first ladder: \\[ \\begin{aligned} h^{2} &= "+lad1+"^{2} - "+foot+"^{2} \\\\ &= "+(h1*h1)+" \\\\ h &= "+h1+" \\end{aligned} \\] For the second ladder: \\[ \\begin{aligned} h^{2} &= "+lad2+"^{2} - "+foot+"^{2} \\\\ &= "+(h2*h2)+" \\\\ h &= "+h2+" \\end{aligned} \\] The difference is \\("+h2+" - "+h1+" = "+(h2-h1)+"\\). The answer is <b>"+(h2-h1)+" m</b>.",
    {mode:"two-ladders", foot:foot, lad1:lad1, lad2:lad2}); q.figure=m8TwoLaddersSVG(foot,h1,h2,lad1+" m",lad2+" m",foot+" m"); return q;
}, ["Each ladder forms its own right triangle with the same wall and ground.", "Find the height reached by the first ladder, then the height reached by the second ladder."]);

E("u1-shortcut-saving-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var trav=pick(["student","hiker","cyclist","jogger","camper"]);
  var q=numq("A "+trav+" travels "+a+" m east along one trail and then "+b+" m north along a second trail. A straight trail leads directly from the end of the trip back to the start. How many metres shorter is the straight trail back than the route travelled, in metres?", (a+b)-c, 0.01,
    "The straight trail is the hypotenuse of a right triangle with legs "+a+" and "+b+": \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The walked route is \\("+a+" + "+b+" = "+(a+b)+" \\) m, so the saving is \\("+(a+b)+" - "+c+" = "+((a+b)-c)+" \\) m. The answer is <b>"+((a+b)-c)+" m</b>.",
    {mode:"shortcut-saving", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["Compare the straight-line distance with the total of the two walked legs.", "Find the straight-line distance with the Pythagorean theorem first, then subtract it from the walked total."]);

E("u1-diagonal-mc-gap", 1, ["9.12", "6.32"], 2, "gen", function(){
  var a=0, b=0, correct=0, dWrong=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    a=ri(4,15); b=ri(4,15); if(a===b) continue;
    var sq=Math.sqrt(a*a+b*b); if(Math.abs(sq-Math.round(sq))<1e-9) continue;
    correct=sq; dWrong=Math.sqrt(Math.abs(a*a-b*b));
    var strs=[fmtF(correct,1), fmtF(a*a+b*b,1), fmtF(a+b,1), fmtF(dWrong,1)];
    if(new Set(strs).size===4) ok=true;
  }
  if(!ok){ a=7; b=9; correct=Math.sqrt(130); dWrong=Math.sqrt(32); }
  var q=mcq("A rectangular hall is "+a+" m long and "+b+" m wide. What is the distance from one corner of the hall to the opposite corner, in metres? Give your answer to one decimal place.",
    {t:fmtF(correct,1), fb:"Yes: the corner-to-corner distance is the hypotenuse of a right triangle with legs "+a+" and "+b+"."},
    [{t:fmtF(a*a+b*b,1), fb:"That adds the squares of the sides but stops before taking the square root."},
     {t:fmtF(a+b,1), fb:"That adds the length and the width, which is the path along two walls, not the straight distance."},
     {t:fmtF(dWrong,1), fb:"That subtracts the squares of the sides, which treats one side as the hypotenuse; the diagonal is longer than either side."}],
    "The diagonal is the hypotenuse of a right triangle with legs "+a+" and "+b+": \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a+b*b)+" \\\\ d &= \\sqrt{"+(a*a+b*b)+"} \\\\ &\\approx "+fmtF(correct,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(correct,1)+" m</b>.",
    {mode:"diagonal-mc", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["The corner-to-corner distance is the slanted side of a right triangle hidden in the rectangle.", "Square the length and the width, add, then take the square root and round to one decimal place."]);

/* Unit 2: Integers */
E("u2-square-minus-product-gap", 2, ["6.18", "6.27"], 2, "gen", function(){
  var a=ri(3,9);
  var b=0, c=0; while(b===0) b=ri(-9,9); while(c===0) c=ri(-8,8);
  var prod=b*c, val=a*a-prod;
  return numq("Evaluate: \\( (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Work out the square and the product first: \\[ \\begin{aligned} (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+(a*a)+" - "+u2sg(prod)+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {mode:"square-minus-product", a:a, b:b, c:c});
}, ["The square of a negative number is positive, and the product follows the sign rules.", "Evaluate the squared term and the product separately, then subtract."]);

E("u2-missing-factor-follow-gap", 2, ["6.22", "6.24"], 2, "gen", function(){
  var s=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var x=0; while(x===0) x=ri(-12,12);
  var P=s*x;
  var t=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var ans=x*t;
  return numq("A number multiplied by \\("+s+"\\) gives \\("+P+"\\). What is the result when that same number is multiplied by \\("+t+"\\)?", ans, 0.01,
    "First find the number by dividing, using the sign rule for quotients: \\[ \\begin{aligned} \\text{number} &= "+P+" \\div "+u2sg(s)+" \\\\ &= "+x+" \\end{aligned} \\] Then multiply that number by "+t+": \\("+x+" \\times "+u2sg(t)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"missing-factor-follow", s:s, x:x, t:t});
}, ["The first sentence hides the number, so recover it before doing the second multiplication.", "Divide the product by the known factor to find the number, then multiply by the new factor."]);

E("u2-fifth-day-temp-gap", 2, ["6.27", "6.26"], 2, "gen", function(){
  var temps=null, fifth=0, mean=0;
  for(var att=0; att<400 && !temps; att++){
    var ts=[ri(-11,4), ri(-11,4), ri(-11,4), ri(-11,4)], f=ri(-11,4);
    var tot=ts[0]+ts[1]+ts[2]+ts[3]+f;
    if(tot%5===0){ temps=ts; fifth=f; mean=tot/5; }
  }
  if(!temps){ temps=[-6,-2,0,3]; fifth=0; mean=-1; }
  var sum4=temps[0]+temps[1]+temps[2]+temps[3];
  return numq("The noon temperatures on the first four days of a week were "+temps[0]+", "+temps[1]+", "+temps[2]+" and "+temps[3]+" degrees Celsius. The mean noon temperature for the five days was "+mean+" degrees Celsius. What was the noon temperature on the fifth day, in degrees Celsius?", fifth, 0.01,
    "The mean gives the five-day total first: \\[ \\begin{aligned} \\text{total} &= 5 \\times "+u2sg(mean)+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] The first four days total \\("+temps[0]+" + "+u2sg(temps[1])+" + "+u2sg(temps[2])+" + "+u2sg(temps[3])+" = "+sum4+"\\), so the fifth day is \\("+(5*mean)+" - "+u2sg(sum4)+" = "+fifth+"\\). The answer is <b>"+fifth+"</b>.",
    {mode:"fifth-day-temp", temps:temps.join(","), mean:mean});
}, ["A mean over five days fixes the total of all five values, not just the fifth one.", "Multiply the mean by five to get the total, then subtract the four known temperatures."]);

E("u2-chain-negative-divisor-gap", 2, ["6.27"], 2, "gen", function(){
  var s=pick([-6,-5,-4,-3,-2,2,3,4,5,6]);
  var q=0; while(q===0) q=ri(-9,9);
  var R=s*q;
  var a=ri(-10,14);
  var b=0, c=0; while(b===0) b=ri(-8,8); while(c===0) c=ri(-8,8);
  var val=a+q-b*c;
  return numq("Evaluate: \\( "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Do the division and the multiplication before the addition and subtraction: \\[ \\begin{aligned} "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+a+" + "+u2sg(q)+" - "+u2sg(b*c)+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {mode:"chain-negative-divisor", a:a, s:s, b:b, c:c});
}, ["Division and multiplication rank ahead of addition and subtraction, and each follows the sign rules.", "Work out the quotient and the product separately, then combine the three values."]);

E("u2-two-divers-gap", 2, ["6.26"], 2, "gen", function(){
  var posA=0, posB0=0, rise=0, posB=0, ans=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    posA=-ri(10,32); posB0=-ri(8,30); rise=ri(3,12); posB=posB0+rise;
    ans=Math.abs(posA-posB);
    if(posB<0 && ans>=2) ok=true;
  }
  if(!ok){ posA=-24; posB0=-14; rise=4; posB=-10; ans=14; }
  return numq("Positions below the surface of the water are written as negative numbers. One diver is at \\("+posA+"\\) m. A second diver starts at \\("+posB0+"\\) m and rises "+rise+" m. How many metres apart are the two divers vertically after the rise?", ans, 0.01,
    "First update the second diver's position: \\("+posB0+" + "+rise+" = "+posB+"\\). Then find the distance between the two positions: \\[ \\begin{aligned} \\text{distance} &= "+u2sg(posA)+" - "+u2sg(posB)+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" m</b>.",
    {mode:"two-divers", posA:posA, posB0:posB0, rise:rise});
}, ["The second diver moves before the distance can be found, so update that position first.", "Add the rise to the second diver's starting position, then subtract the two positions."]);

/* Unit 3: Operations with Fractions */
E("u3-area-decimal-gap", 3, ["6.8", "6.6"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<400 && !P; att++){
    var w1=ri(1,3), d1=pick([2,4,5]), n1=ri(1,d1-1);
    var w2=ri(1,2), d2=pick([2,4,5]), n2=ri(1,d2-1);
    var imp1=w1*d1+n1, imp2=w2*d2+n2;
    var val=(imp1/d1)*(imp2/d2);
    if(Math.abs(val*100-Math.round(val*100))>1e-9) continue;
    if(Math.abs(val-Math.round(val))<1e-9) continue;
    P={w1:w1, n1:n1, d1:d1, imp1:imp1, w2:w2, n2:n2, d2:d2, imp2:imp2, val:Math.round(val*100)/100};
  }
  if(!P) P={w1:2, n1:3, d1:4, imp1:11, w2:1, n2:2, d2:5, imp2:7, val:3.85};
  var rr=u3red(P.imp1*P.imp2, P.d1*P.d2);
  return numq("A garden bed is "+u3disp(P.imp1, P.d1)+" m long and "+u3disp(P.imp2, P.d2)+" m wide. What is the area of the bed, in square metres? Give your answer as a decimal.", P.val, 0.01,
    "Write both mixed numbers as improper fractions and multiply: \\[ \\begin{aligned} "+P.w1+FR(P.n1, P.d1)+" \\times "+P.w2+FR(P.n2, P.d2)+" &= "+FR(P.imp1, P.d1)+" \\times "+FR(P.imp2, P.d2)+" \\\\ &= "+FR(rr[0], rr[1])+" \\\\ &= "+fmt(P.val)+" \\end{aligned} \\] The answer is <b>"+fmt(P.val)+"</b>.",
    {mode:"area-decimal", imp1:P.imp1, d1:P.d1, imp2:P.imp2, d2:P.d2});
}, ["Area is length times width, and mixed numbers multiply most easily as improper fractions.", "Convert both measurements to improper fractions, multiply, then write the product as a decimal."]);

E("u3-bottles-roundup-gap", 3, ["6.12", "6.14"], 2, "gen", function(){
  var T=0, n=0, d=0, ans=0, q=0, ok=false;
  var sizes=[[3,4],[2,3],[3,5],[5,6],[4,5],[5,8]];
  for(var att=0; att<300 && !ok; att++){
    T=ri(9,28); var sz=pick(sizes); n=sz[0]; d=sz[1];
    q=T*d/n;
    if(Math.abs(q-Math.round(q))<1e-9) continue;
    ans=Math.ceil(q); ok=true;
  }
  if(!ok){ T=17; n=3; d=4; q=17*4/3; ans=23; }
  return numq("A tank holds "+T+" L of juice. The juice is poured into bottles that each hold "+u3disp(n, d)+" L. How many bottles are needed to hold all of the juice?", ans, 0.01,
    "Divide the total by the size of one bottle: \\[ \\begin{aligned} "+T+" \\div "+FR(n, d)+" &= "+T+" \\times "+FR(d, n)+" \\\\ &= "+fmt(Math.round(q*100)/100)+" \\end{aligned} \\] A part-filled bottle still counts as a bottle, so the count rounds up to the next whole number. The answer is <b>"+ans+"</b>.",
    {mode:"bottles-roundup", T:T, n:n, d:d});
}, ["Dividing by the bottle size gives the count, but a part-filled bottle still needs a bottle.", "Divide the total by the fraction, then round the result up to a whole number of bottles."]);

E("u3-chain-subtract-product-gap", 3, ["6.16"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<500 && !P; att++){
    var d1=pick([2,4,5,8,10]), n1=ri(1,d1-1);
    var d2=pick([2,4,5,8,10]), n2=ri(1,d2-1);
    var d3=pick([2,4,5,8,10]), n3=ri(1,d3-1);
    var val=n1/d1-(n2/d2)*(n3/d3);
    if(val<=0.2) continue;
    if(Math.abs(val*1000-Math.round(val*1000))>1e-9) continue;
    P={n1:n1, d1:d1, n2:n2, d2:d2, n3:n3, d3:d3, val:Math.round(val*1000)/1000};
  }
  if(!P) P={n1:7, d1:8, n2:1, d2:2, n3:3, d3:4, val:0.5};
  var prod=u3red(P.n2*P.n3, P.d2*P.d3);
  return numq("Evaluate: \\("+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\). Give your answer as a decimal.", P.val, 0.01,
    "The multiplication is done before the subtraction: \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" - "+FR(prod[0], prod[1])+" \\\\ &= "+fmt(P.val)+" \\end{aligned} \\] The answer is <b>"+fmt(P.val)+"</b>.",
    {mode:"chain-subtract-product", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["One operation in the chain outranks the other, so the order changes the result.", "Work out the product of the two fractions first, then subtract it from the first fraction."]);

E("u3-chain-mc-gap", 3, ["6.16", "6.15"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<600 && !P; att++){
    var d1=pick([2,4,5,8,10]), n1=ri(1,d1-1);
    var d2=pick([2,4,5,8,10]), n2=ri(1,d2-1);
    var d3=pick([2,4,5,8,10]), n3=ri(1,d3-1);
    var a=n1/d1, b=n2/d2, c=n3/d3;
    var correct=a+b*c, l2r=(a+b)*c, sumAll=a+b+c, wrongProd=a+(n2*n3)/(d2+d3);
    var vals=[correct, l2r, sumAll, wrongProd];
    var strs=vals.map(function(v){ return fmtF(v,3); });
    if(new Set(strs).size<4) continue;
    if(vals.some(function(v){ return v<=0; })) continue;
    if(Math.abs(correct*1000-Math.round(correct*1000))>1e-9) continue;
    P={n1:n1, d1:d1, n2:n2, d2:d2, n3:n3, d3:d3, correct:Math.round(correct*1000)/1000, l2r:l2r, sumAll:sumAll, wrongProd:wrongProd};
  }
  if(!P) P={n1:1, d1:2, n2:3, d2:4, n3:2, d3:5, correct:0.8, l2r:0.5, sumAll:1.65, wrongProd:0.5+6/9};
  var prod=u3red(P.n2*P.n3, P.d2*P.d3);
  return mcq("What is the value of \\("+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\)?",
    {t:fmtF(P.correct,3), fb:"Yes: the multiplication is done first, then the sum is completed."},
    [{t:fmtF(P.l2r,3), fb:"That works from left to right, adding before multiplying, which breaks the order of operations."},
     {t:fmtF(P.sumAll,3), fb:"That adds all three fractions and never multiplies."},
     {t:fmtF(P.wrongProd,3), fb:"That multiplies by adding the denominators; fraction multiplication multiplies the denominators instead."}],
    "Multiplication is done before addition: \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" + "+FR(prod[0], prod[1])+" \\\\ &= "+fmt(P.correct)+" \\end{aligned} \\] The answer is <b>"+fmt(P.correct)+"</b>.",
    {mode:"chain-mc", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["One operation in the chain outranks the other, so the order changes the result.", "Work out the product of the two fractions first, then add the first fraction."]);


/* Unit 4: Measuring Prisms and Cylinders */
E("u4-tank-litres-gap", 4, ["9.9", "9.11"], 2, "gen", function(){
  var r=pick([4,5,6,8,10,12,15,20]); var d=2*r; var h=ri(6,40);
  var vol=3.14*r*r*h;
  var litres=Math.round(vol/10)/100;
  var ctx=pick(["storage tank","water barrel","feed silo","rain barrel"]);
  var q=numq("A cylindrical "+ctx+" has a diameter of "+d+" cm and a height of "+h+" cm. How many litres of water does it hold when full? Use \\(\\pi = 3.14\\), and use 1000 cm\\(^{3}\\) = 1 L. Give your answer to two decimal places.", litres, 0.02,
    "Halve the diameter to get the radius, then find the volume: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(vol)+" \\text{ cm}^{3} \\end{aligned} \\] Convert to litres: \\("+fmt(vol)+" \\div 1000 = "+fmt(litres)+"\\). The answer is <b>"+fmt(litres)+" L</b>.",
    {mode:"tank-litres", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["The formula needs the radius, and the question asks for litres rather than cubic centimetres.", "Halve the diameter first, find the volume, then divide by 1000 to change the unit."]);

E("u4-open-box-sa-gap", 4, ["9.3", "10.3"], 2, "gen", function(){
  var l=ri(4,14), w=ri(3,11), h=ri(2,9);
  var sa=l*w+2*l*h+2*w*h;
  var q=numq("An open-top storage box is shaped like a right rectangular prism. It is "+l+" cm long, "+w+" cm wide and "+h+" cm high, and it has no lid. Cardboard is used for the bottom and the four sides only. How many square centimetres of cardboard are needed?", sa, 0.01,
    "An open top means the top face is missing, so count the bottom and the four side faces: \\[ \\begin{aligned} SA &= lw + 2lh + 2wh \\\\ &= "+(l*w)+" + "+(2*l*h)+" + "+(2*w*h)+" \\\\ &= "+sa+" \\end{aligned} \\] The answer is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"open-box-sa", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm",h+" cm",true); return q;
}, ["An open top changes which faces exist, so list the faces before calculating.", "Find the area of the bottom first, then add the two pairs of side faces."]);

/* Unit 5: Percent, Ratio and Rate */
E("u5-down-then-up-gap", 5, ["6.2", "6.1"], 2, "gen", function(){
  var item=pick(["kayak","stand-up paddleboard","greenhouse kit","snowboard","fishing rod set","garden shed kit"]);
  var P=pick([80,120,150,200,240,300,360,400]);
  var d1=pick([10,20,25,30,40,50]), d2=pick([5,10,15,20,25,30]);
  var afterDown=u5r2(P*(1-d1/100));
  var fin=u5r2(afterDown*(1+d2/100));
  return numq("A "+item+" is priced at $"+fmtF(P,2)+". Its price is first reduced by "+d1+"%. The reduced price is then increased by "+d2+"%. What is the final price, in dollars?", fin, 0.01,
    "Each percent acts on the price at that stage. After the reduction: \\[ \\begin{aligned} \\text{reduced price} &= "+fmtF(P,2)+" \\times "+fmt(1-d1/100,2)+" \\\\ &= "+fmtF(afterDown,2)+" \\end{aligned} \\] After the increase on the new price: \\[ \\begin{aligned} \\text{final price} &= "+fmtF(afterDown,2)+" \\times "+fmt(1+d2/100,2)+" \\\\ &= "+fmtF(fin,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(fin,2)+"</b>.",
    {mode:"down-then-up", P:P, d1:d1, d2:d2});
}, ["The second percent acts on the reduced price, not on the starting price.", "Find the reduced price first, then apply the increase to that amount."]);

E("u5-unit-rate-cost-gap", 5, ["6.29"], 2, "gen", function(){
  var goods=[["muffins","muffin"],["juice boxes","juice box"],["granola bars","granola bar"],["yogurt cups","yogurt cup"],["bagels","bagel"]];
  var g=pick(goods);
  var q1=pick([4,5,8,10,20,25]);
  var unit=pick([0.75,1.25,1.5,1.75,2.25,2.5,3.25,3.5,4.75]);
  var C=u5r2(q1*unit);
  var q2=ri(3,30); if(q2===q1) q2=q1+3;
  var ans=u5r2(unit*q2);
  return numq("A pack of "+q1+" "+g[0]+" costs $"+fmtF(C,2)+". At this rate, what is the cost of "+q2+" "+g[0]+", in dollars?", ans, 0.01,
    "Find the cost of one "+g[1]+" first: \\[ \\begin{aligned} \\text{unit rate} &= "+fmtF(C,2)+" \\div "+q1+" \\\\ &= "+fmtF(unit,2)+" \\text{ dollars per "+g[1]+"} \\end{aligned} \\] Then multiply by the new quantity: \\("+fmtF(unit,2)+" \\times "+q2+" = "+fmtF(ans,2)+"\\). The answer is <b>$"+fmtF(ans,2)+"</b>.",
    {mode:"unit-rate-cost", q1:q1, q2:q2});
}, ["The cost per single item is the bridge between the two quantities.", "Divide the pack cost by the pack size to get the unit rate, then multiply by the new quantity."]);

E("u5-ratio-part-percent-gap", 5, ["6.28", "3.11"], 2, "gen", function(){
  var pair=pick([[1,3],[3,1],[1,4],[4,1],[2,3],[3,2],[3,7],[7,3],[1,9],[9,1],[4,6],[6,4],[2,8],[8,2]]);
  var sum=pair[0]+pair[1], big=Math.max(pair[0], pair[1]);
  var A=sum*ri(20,120);
  var bigPart=A*big/sum;
  var pct=big*100/sum;
  var ctx=pick([["A school club divides"," between its art team and its music team"],["A trail crew divides"," between two work crews"],["A bakery divides"," between its two ovens"]]);
  return numq(ctx[0]+" $"+A+" in the ratio "+pair[0]+" : "+pair[1]+ctx[1]+". The larger share is what percent of the whole amount?", pct, 0.01,
    "First find the larger share. The ratio has "+sum+" parts in total, so each part is \\("+A+" \\div "+sum+" = "+(A/sum)+"\\), and the larger share is \\("+big+" \\times "+(A/sum)+" = "+bigPart+"\\). Then express it as a percent of the whole: \\[ \\begin{aligned} \\text{percent} &= "+bigPart+" \\div "+A+" \\times 100 \\\\ &= "+pct+"\\% \\end{aligned} \\] The answer is <b>"+pct+"%</b>.",
    {mode:"ratio-part-percent", pair:pair.join(":"), A:A});
}, ["Work with the shares themselves before turning one share into a percent.", "Add the ratio parts, find the value of the larger share, then divide it by the whole amount."]);

E("u5-find-whole-mc-gap", 5, ["6.1"], 2, "gen", function(){
  var W=0, p=0, part=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    W=pick([200,300,400,500,600]);
    p=pick([12,15,16,20,24,25,30,32,40,48,50,60,64,75,80]);
    part=W*p/100;
    if(part!==Math.round(part) || part<10) continue;
    if((part*p)%100!==0) continue;
    var vals=[W, part*p, part*p/100, W/100];
    if(new Set(vals.map(function(v){ return fmt(v); })).size<4) continue;
    ok=true;
  }
  if(!ok){ W=400; p=20; part=80; }
  var ctxs=[
    {q:part+" students is "+p+"% of the students in a school. How many students are in the school?", unit:"students"},
    {q:"A team scored "+part+" points, which is "+p+"% of the points it needs for a banner. How many points does the team need in total?", unit:"points"},
    {q:"After a morning sale, "+part+" tickets remained unsold, and that is "+p+"% of the tickets printed. How many tickets were printed?", unit:"tickets"}
  ];
  var cx=pick(ctxs);
  return mcq(cx.q,
    {t:fmt(W), fb:"Yes: the part is divided by the percent written as a decimal to recover the whole."},
    [{t:fmt(part*p), fb:"That multiplies the part by the whole percent number, which grows the part instead of recovering the whole."},
     {t:fmt(part*p/100), fb:"That finds the percent of the part itself, which is smaller than the part."},
     {t:fmt(W/100), fb:"That divides the part by the percent number without writing the percent as a decimal first."}],
    "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= "+part+" \\div "+fmt(p/100,2)+" \\\\ &= "+W+" \\end{aligned} \\] The answer is <b>"+W+" "+cx.unit+"</b>.",
    {mode:"find-whole-mc", p:p, part:part});
}, ["The given amount is only the named percent of the whole, so the whole is larger than the part.", "Write the percent as a decimal first, then divide the part by that decimal."]);

/* Unit 6: Linear Equations and Graphing */
E("u6-decimal-coefficient-gap", 6, ["8.1", "8.4"], 2, "gen", function(){
  var a=pick([0.2,0.25,0.4,0.5,0.75,1.25,1.5,2.5]);
  var x=ri(3,16);
  var b=pick([0.5,1,1.5,2,2.5,3,4,5,6,7,8]);
  var ax=a*x, c=ax+b;
  return numq("Solve the equation \\("+fmt(a)+"x + "+fmt(b)+" = "+fmt(c)+"\\). What is the value of x?", x, 0.01,
    "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} "+fmt(a)+"x + "+fmt(b)+" &= "+fmt(c)+" \\\\ "+fmt(a)+"x &= "+fmt(c)+" - "+fmt(b)+" \\\\ "+fmt(a)+"x &= "+fmt(ax)+" \\\\ x &= "+fmt(ax)+" \\div "+fmt(a)+" \\\\ x &= "+fmt(x)+" \\end{aligned} \\] The answer is <b>\\(x = "+fmt(x)+"\\)</b>.",
    {mode:"decimal-coefficient", a:a, b:b});
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the decimal coefficient of x."]);

E("u6-two-points-evaluate-gap", 6, ["7.2", "7.3"], 2, "gen", function(){
  var m=pick([-4,-3,-2,-1,1,2,3,4]);
  var b=ri(-8,10);
  var x1=ri(-2,3), dx=ri(2,4), x2=x1+dx;
  var y1=m*x1+b, y2=m*x2+b;
  var x3=(Math.random()<0.5)?(x2+ri(1,4)):(x1-ri(1,3));
  var ans=m*x3+b;
  return numq("A linear relation passes through the points ("+x1+", "+y1+") and ("+x2+", "+y2+"). What is the y-value of this relation when x = "+x3+"?", ans, 0.01,
    "First extract the rate of change from the two points: \\[ \\begin{aligned} \\text{rate} &= \\frac{"+y2+" - "+u2sg(y1)+"}{"+x2+" - "+u2sg(x1)+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+m+" \\end{aligned} \\] The relation is \\(y = "+fmt(m)+"x + "+u2sg(b)+"\\), so at \\(x = "+x3+"\\): \\(y = "+fmt(m)+" \\times "+u2sg(x3)+" + "+u2sg(b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"two-points-evaluate", x1:x1, y1:y1, x2:x2, y2:y2, x3:x3});
}, ["The two points hide the rate of change, which must be recovered before the relation can be used.", "Find the rate of change from the two points first, then build the relation and substitute the new x."]);

/* Unit 7: Data Analysis and Probability */
E("u7-expected-count-gap", 7, ["12.4", "12.2"], 2, "gen", function(){
  var S=pick([4,5,8,10,20]), F=ri(1,S-1);
  var colour=pick(["red","blue","green","gold","purple","orange"]);
  var k=ri(3,12), N=2*S*k, ans=F*k;
  return numq("A coin is tossed and a spinner with "+S+" equal sections, "+F+" of them "+colour+", is spun at the same time. This pair of actions is repeated "+N+" times. How many times would you expect heads and "+colour+" to occur together?", ans, 0.01,
    "The toss and the spin are independent, so multiply their probabilities, then scale by the number of repeats: \\[ \\begin{aligned} P &= "+FR(1,2)+" \\times "+FR(F,S)+" \\\\ &= "+FR(F,2*S)+" \\\\ \\text{expected} &= "+FR(F,2*S)+" \\times "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {mode:"expected-count", S:S, F:F, N:N});
}, ["An expected count starts from the probability of the combined event.", "Multiply the two separate probabilities first, then multiply by the number of repeats."]);

E("u7-missing-mean-value-gap", 7, ["11.1"], 2, "gen", function(){
  var vals=null, fifth=0, mean=0;
  for(var att=0; att<400 && !vals; att++){
    var vs=[ri(4,30), ri(4,30), ri(4,30), ri(4,30)], f=ri(4,30);
    var tot=vs[0]+vs[1]+vs[2]+vs[3]+f;
    if(tot%5===0){ vals=vs; fifth=f; mean=tot/5; }
  }
  if(!vals){ vals=[12,18,10,20]; fifth=15; mean=15; }
  var sum4=vals[0]+vals[1]+vals[2]+vals[3];
  return numq("A player scored "+vals[0]+", "+vals[1]+", "+vals[2]+" and "+vals[3]+" points in the first four games of a tournament. The mean score over five games was "+mean+" points. How many points did the player score in the fifth game?", fifth, 0.01,
    "The mean fixes the five-game total first: \\[ \\begin{aligned} \\text{total} &= 5 \\times "+mean+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] The first four games total "+sum4+" points, so the fifth game is \\("+(5*mean)+" - "+sum4+" = "+fifth+"\\). The answer is <b>"+fifth+"</b>.",
    {mode:"missing-mean-value", vals:vals.join(","), mean:mean});
}, ["A mean over five games fixes the total of all five scores, not just the missing one.", "Multiply the mean by five to get the total, then subtract the four known scores."]);

E("u7-mean-difference-gap", 7, ["11.1"], 2, "gen", function(){
  var A=null, B=null, meanA=0, meanB=0, ans=0;
  for(var att=0; att<400 && !A; att++){
    var as=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var bs=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var sa=as.reduce(function(x,y){return x+y;},0), sb=bs.reduce(function(x,y){return x+y;},0);
    if(Math.abs(sa-sb)>=5){ A=as; B=bs; meanA=sa/5; meanB=sb/5; ans=Math.round(Math.abs(meanA-meanB)*10)/10; }
  }
  if(!A){ A=[10,12,14,16,18]; B=[6,8,10,12,14]; meanA=14; meanB=10; ans=4; }
  return numq("Two players record their points in five games. Player One scored "+A.join(", ")+". Player Two scored "+B.join(", ")+". By how many points do the two mean scores differ?", ans, 0.01,
    "Find each mean separately: \\[ \\begin{aligned} \\text{mean One} &= "+fmt(meanA,1)+" \\\\ \\text{mean Two} &= "+fmt(meanB,1)+" \\end{aligned} \\] The difference is \\("+fmt(Math.max(meanA,meanB),1)+" - "+fmt(Math.min(meanA,meanB),1)+" = "+fmt(ans,1)+"\\). The answer is <b>"+fmt(ans,1)+"</b>.",
    {mode:"mean-difference", A:A.join(","), B:B.join(",")});
}, ["Each data set has its own mean, and the question compares the two means.", "Total each set of five scores and divide by five, then subtract the smaller mean from the larger."]);

E("u7-two-colours-twice-gap", 7, ["12.4", "12.1"], 2, "gen", function(){
  var a=ri(6,14); if(a===10) a=11;
  var b=20-a;
  var pair=pick([["red","blue"],["green","gold"],["white","black"],["purple","orange"]]);
  var item=pick(["marbles","counters","beads"]);
  var ans=(a*a+b*b)/4;
  return numq("A bag holds "+a+" "+pair[0]+" and "+b+" "+pair[1]+" "+item+", for a total of 20 "+item+". One is drawn, replaced, and another is drawn. What is the probability that the two drawn "+item+" are the same colour as each other? Give your answer as a percent.", ans, 0.01,
    "Same colour can happen two ways, and the draws are independent: \\[ \\begin{aligned} P &= "+FR(a,20)+" \\times "+FR(a,20)+" + "+FR(b,20)+" \\times "+FR(b,20)+" \\\\ &= "+FR(a*a,400)+" + "+FR(b*b,400)+" \\\\ &= "+fmt(ans)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(ans)+"%</b>.",
    {mode:"two-colours-twice", a:a, b:b});
}, ["Same colour has more than one way to happen, and each way is a product of two draws.", "Find the probability of the first colour twice and of the second colour twice, then add them."]);

E("u7-survey-scale-gap", 7, ["12.2"], 2, "gen", function(){
  var n=pick([20,25,40,50]), s=ri(2,n-2);
  var mult=ri(6,18), N=n*mult, ans=s*mult;
  var mode=pick(["walk to school","take the bus to school","bring a lunch from home"]);
  return numq("In a survey, "+s+" of the "+n+" students asked said they "+mode+". The whole school has "+N+" students. Based on the survey, how many students in the school would you expect to "+mode+"?", ans, 0.01,
    "The survey gives a proportion first: \\("+FR(s,n)+"\\) of students. Scale that proportion to the whole school: \\[ \\begin{aligned} \\text{expected} &= "+FR(s,n)+" \\times "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {mode:"survey-scale", n:n, s:s, N:N});
}, ["The survey fraction describes the sample, and the question asks about the whole school.", "Write the survey result as a fraction first, then multiply it by the school population."]);

E("u7-combined-mean-gap", 7, ["11.1"], 2, "gen", function(){
  var n1=0, m1=0, n2=0, m2=0, ans=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    n1=pick([4,5,6]); m1=ri(8,20); n2=pick([4,5,6]); m2=ri(8,20);
    if(m1===m2) continue;
    var tot=n1*m1+n2*m2, cnt=n1+n2;
    if((2*tot)%cnt!==0) continue;
    ans=tot/cnt; ok=true;
  }
  if(!ok){ n1=5; m1=14; n2=5; m2=18; ans=16; }
  return numq("Group One has "+n1+" students with a mean quiz score of "+m1+". Group Two has "+n2+" students with a mean quiz score of "+m2+". What is the mean quiz score of the two groups combined?", ans, 0.01,
    "Recover each group total from its mean before combining: \\[ \\begin{aligned} \\text{total One} &= "+n1+" \\times "+m1+" = "+(n1*m1)+" \\\\ \\text{total Two} &= "+n2+" \\times "+m2+" = "+(n2*m2)+" \\\\ \\text{combined mean} &= \\frac{"+(n1*m1+n2*m2)+"}{"+(n1+n2)+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"combined-mean", n1:n1, m1:m1, n2:n2, m2:m2});
}, ["A combined mean is a total divided by a total, not the average of the two means.", "Multiply each mean by its group size to get the group totals, then add the totals and the group sizes."]);

E("u7-two-events-mc-gap", 7, ["12.3", "12.4"], 2, "gen", function(){
  var S1=0, F1=0, S2=0, F2=0, ok=false;
  var correct=0, add=0, first=0, second=0;
  for(var att=0; att<400 && !ok; att++){
    S1=pick([4,5,8,10]); F1=ri(1,S1-1); S2=pick([4,5,8,10,20]); F2=ri(1,S2-1);
    correct=F1*F2*100/(S1*S2); add=(F1/S1+F2/S2)*100; first=F1/S1*100; second=F2/S2*100;
    if(add>100) continue;
    var strs=[correct, add, first, second].map(function(v){ return fmtF(v,2); });
    if(new Set(strs).size<4) continue;
    ok=true;
  }
  if(!ok){ S1=8; F1=3; S2=10; F2=4; correct=15; add=77.5; first=37.5; second=40; }
  var c1=pick(["red","blue","green","gold"]), c2=pick(["purple","orange","white","black"]);
  return mcq("One spinner has "+S1+" equal sections with "+F1+" coloured "+c1+", and a second spinner has "+S2+" equal sections with "+F2+" coloured "+c2+". Both spinners are spun. What is the probability of landing on "+c1+" on the first spinner and "+c2+" on the second spinner?",
    {t:fmtF(correct,2)+"%", fb:"Yes: the spins are independent, so the two probabilities are multiplied."},
    [{t:fmtF(add,2)+"%", fb:"That adds the two probabilities; probabilities of combined independent events are multiplied, not added."},
     {t:fmtF(first,2)+"%", fb:"That is the probability for the first spinner only; the second spin also has to land on its colour."},
     {t:fmtF(second,2)+"%", fb:"That is the probability for the second spinner only; the first spin also has to land on its colour."}],
    "The spins are independent, so multiply: \\[ \\begin{aligned} P &= "+FR(F1,S1)+" \\times "+FR(F2,S2)+" \\\\ &= "+fmt(correct,2)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(correct,2)+"%</b>.",
    {mode:"two-events-mc", S1:S1, F1:F1, S2:S2, F2:F2});
}, ["Two spins do not affect each other, so this is a product of two single probabilities.", "Write the probability for each spinner first, then multiply them and write the result as a percent."]);

/* Unit 8: Geometry */
E("u8-hidden-cubes-gap", 8, ["10.9", "10.17"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 10, 20);
  var tot=u8Sum(hm);
  var stacks=0; hm.forEach(function(row){ row.forEach(function(v){ if(v>0) stacks++; }); });
  var ans=tot-stacks;
  var cell=26, body=u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Height map of a block object");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. In the top view of the object, only the top cube of each stack shows. How many cubes are NOT visible in the top view?", ans, 0,
    "Count all the cubes first: the stacks total "+tot+" cubes. The top view shows one cube for each stack that has at least one cube, and there are "+stacks+" such stacks. So the hidden cubes are \\("+tot+" - "+stacks+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"hidden-cubes", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["The top view hides every cube except the top one of each stack.", "Add all the numbers for the total, then subtract the number of stacks that hold at least one cube."]);

E("u8-rotated-side-view-gap", 8, ["10.10", "10.16"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 6, 12);
  var turns=pick([1,2,3]);
  var rot=u8RotHM(hm, turns);
  var prof=u8SideProf(rot), ans=u8SumArr(prof);
  var dirWord=turns===1 ? "90° clockwise" : (turns===2 ? "180°" : "90° counterclockwise");
  var cell=24, body=u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body+=u8HM(hm, 124, 30, cell);
  var fig=u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned "+dirWord+" on the table, seen from above, and then the right side view is drawn. How many squares show in that side view?", ans, 0,
    "Turn the map "+dirWord+" first. In the side view, each row of the turned map contributes its tallest stack, giving heights "+u8ProfStr(prof)+": \\[ \\begin{aligned} \\text{squares} &= "+prof.join(" + ")+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"rotated-side-view", hm:u8Key(hm), turns:turns});
  q.figure=fig;
  return q;
}, ["The rotation changes which stacks line up in the side view, so turn the map before reading it.", "Turn the height map first, then take the tallest stack in each row of the turned map and add them."]);

E("u8-tiles-at-point-gap", 8, ["10.4"], 2, "gen", function(){
  var scenarios=[[3,6,1,4],[3,6,2,2],[3,4,2,3],[8,4,1,2],[4,3,3,2],[4,8,2,1],[12,3,1,2],[6,3,2,2]];
  var sc=pick(scenarios);
  var nA=sc[0], nB=sc[1], kB=sc[2], ans=sc[3];
  var angA=u8Interior(nA), angB=u8Interior(nB);
  var ctx=pick(["floor tiles","patio stones","quilt blocks","mosaic tiles","bathroom tiles","garden pavers","classroom art tiles","pool deck tiles"]);
  var q=numq("A design made of "+ctx+" uses regular polygon tiles around one point, with no gaps or overlaps. "+kB+" tile"+(kB===1?"":"s")+" shaped as a "+U8_POLY_NAMES[nB]+" "+(kB===1?"is":"are")+" placed at the point, and each "+U8_POLY_NAMES[nB]+" tile has an interior angle of "+fmt(angB)+" degrees. The rest of the point is filled with tiles shaped as a "+U8_POLY_NAMES[nA]+". How many "+U8_POLY_NAMES[nA]+" tiles meet at the point?", ans, 0,
    "First find the interior angle of a "+U8_POLY_NAMES[nA]+": \\[ \\begin{aligned} \\text{interior angle} &= \\frac{("+nA+" - 2) \\times 180°}{"+nA+"} \\\\ &= "+fmt(angA)+"° \\end{aligned} \\] The placed tiles cover \\("+kB+" \\times "+fmt(angB)+"° = "+fmt(kB*angB)+"°\\), leaving \\(360° - "+fmt(kB*angB)+"° = "+fmt(360-kB*angB)+"°\\). Then \\("+fmt(360-kB*angB)+"° \\div "+fmt(angA)+"° = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"tiles-at-point", nA:nA, nB:nB, kB:kB}); q.figure=m8PolyRowSVG([[nB,null],[nA,null]]); return q;
}, ["The angles around a point add to 360 degrees, and the second shape's angle is given while the first shape's angle is not.", "Find the interior angle of the first shape from its number of sides, then subtract the placed tiles' angles from 360 and divide."]);

E("u8-cube-volume-gap", 8, ["10.17"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 7, 14);
  var tot=u8Sum(hm), ans=tot*8;
  var cell=26, body=u8T(160, 14, "Build this object (numbers = cubes on each square)", 11, true);
  body+=u8HM(hm, 121, 30, cell);
  var fig=u8Svg(320, 112, body, "Height map of a block object to build");
  var flat=hm[0].concat(hm[1]);
  var q=numq("The diagram is the plan for a block object: each number tells how many cubes are stacked on that square. The object is built from cubes with side length 2 cm. What is the total volume of the object, in cubic centimetres?", ans, 0,
    "Add the stack on every square to count the cubes: \\("+flat.join(" + ")+" = "+tot+" \\) cubes. Each cube has volume \\(2 \\times 2 \\times 2 = 8\\) cm\\(^{3}\\), so the total volume is \\("+tot+" \\times 8 = "+ans+"\\). The answer is <b>"+ans+" cm\\(^{3}\\)</b>.",
    {mode:"cube-volume", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["The plan gives a count of cubes, and the question asks for a volume.", "Add the numbers to count the cubes, then multiply by the volume of one 2 cm cube."]);

E("u8-changed-side-view-gap", 8, ["10.15", "10.9"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 9, 18);
  var r=ri(0,2), c=ri(0,2), delta=ri(1,2);
  var mod=hm.map(function(row){ return row.slice(); });
  mod[r][c]+=delta;
  var prof=u8SideProf(mod), ans=u8SumArr(prof);
  var rowName=["back","middle","front"][r], colName=["left","middle","right"][c];
  var cell=26, body=u8T(160, 14, "Object before the change (numbers = cubes)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Height map of a block object before a change");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Then "+delta+" cube"+(delta===1?" is":"s are")+" added to the stack in the "+rowName+" row, "+colName+" column. How many squares show in the right side view after the cubes are added?", ans, 0,
    "Update the height map first: the stack in the "+rowName+" row, "+colName+" column grows from "+hm[r][c]+" to "+mod[r][c]+". In the right side view, each row contributes its tallest stack, giving heights "+u8ProfStr(prof)+": \\[ \\begin{aligned} \\text{squares} &= "+prof.join(" + ")+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"changed-side-view", hm:u8Key(hm), r:r, c:c, delta:delta});
  q.figure=fig;
  return q;
}, ["The added cubes change one stack before the side view is read, so update the map first.", "Add the new cubes to the named stack, then take the tallest stack in each row and add them."]);
