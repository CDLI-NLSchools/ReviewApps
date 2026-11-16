// Math 1201 Unit 5 Linear Functions question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 3076 to 3697).
// CRMARKS: u5-problem-equation=2
// CRMARKS: u5-problem-equation-solve=2
// CRMARKS: u5-slope-rate=3
// CRMARKS: u5-parallel-perp=2
// CRMARKS: u5-slope-context=3
// CRMARKS: u5-context-line=2
// CRMARKS: u5-rewrite-form=2
// CRMARKS: u5-eq-from-graph=3
// CRMARKS: u5-eq-slope-point=2
// CRMARKS: u5-eq-two-points=3
// CRMARKS: u5-eq-parallel-perp=2
// CRMARKS: u5-slope-error=2
/* Math 1201 Review, Unit 5: Linear Functions (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u5. Every entry returns the same question type on every draw.
   No figures: lines and graphs are described in words or by stated points. */

/* ================= u5 helpers ================= */
function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5red(n,d){var g=u5gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u5fs(n,d){var r=u5red(n,d);if(r[1]===1)return ""+r[0];if(r[0]<0)return "-"+FR(-r[0],r[1]);return FR(r[0],r[1]);}
function u5coef(n,d,v){var r=u5red(n,d);if(r[0]===0)return "0";if(r[1]===1){if(r[0]===1)return v;if(r[0]===-1)return "-"+v;return r[0]+v;}return u5fs(r[0],r[1])+v;}
function u5ybRaw(mN,mD,b){var r=u5red(mN,mD);if(r[0]===0)return "y = "+b;var s="y = "+u5coef(r[0],r[1],"x");if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5ybOpt(mN,mD,b){return "\\("+u5ybRaw(mN,mD,b)+"\\)";}
function u5genRaw(A,B,C){
  var s=(A===1?"x":A===-1?"-x":A+"x");
  s+=(B<0?" - ":" + ")+(Math.abs(B)===1?"y":Math.abs(B)+"y");
  if(C>0)s+=" + "+C;else if(C<0)s+=" - "+(-C);
  return s+" = 0";
}
function u5genFromLine(mN,mD,b){ /* primitive general form of y = mx + b, A positive */
  var r=u5red(mN,mD),p=r[0],q=r[1];
  var A=Math.abs(p),B=(p>0?-q:q),C=(p>0?q*b:-q*b);
  if(p===0){A=0;B=1;C=-b;}
  return [A,B,C];
}
function u5pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=0;while(out.length<3){k++;var c2=ans+" (form "+k+")";if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u5pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u5slopes(){return [[1,2],[2,3],[3,2],[2,1],[3,1],[1,3],[4,3],[3,4],[5,2],[1,4],[5,4],[4,5],[-1,2],[-2,3],[-3,2],[-2,1],[-3,1],[-1,3],[-4,3],[-3,4],[-5,2],[-1,4],[-5,4],[-4,5]];}
function u5pickSlope(){return pick(u5slopes());}
function u5pt(x,y){return "("+x+", "+y+")";}
function u5minusTerm(v,val){return v+(val>=0?" - "+val:" + "+(-val));}
/* candidate equation options for a key line through work: tuples [mN,mD,b] */
function u5eqCands(keyT,candTs){
  var seen={},out=[];seen[keyT.join("/")]=1;
  for(var i=0;i<candTs.length&&out.length<3;i++){var r=u5red(candTs[i][0],candTs[i][1]);var t=[r[0],r[1],candTs[i][2]];var k=t.join("/");if(!seen[k]){seen[k]=1;out.push(u5ybOpt(t[0],t[1],t[2]));}}
  var d=2;while(out.length<3){out.push(u5ybOpt(keyT[0],keyT[1],keyT[2]+d));d++;}
  return out;
}

/* ================= 1. problem using an equation: substitute to evaluate (4.17, L1, num, CR 2; the substitution family kept when u5-problem-equation was split under the ruling 8 principle, Nov 13, 2026) ================= */
E("u5-problem-equation",5,["4.17"],1,"gen",function(){
  var mode=2;
  if(mode===1){
    var m=pick([12,15,18,20,24,25,30,36]),b=pick([15,20,25,30,40,50,60]),x=ri(2,9),y=m*x+b;
    return numq("A community hall charges a booking fee plus an hourly rate. The total cost, in dollars, is given by \\(C = "+m+"h + "+b+"\\), where \\(h\\) is the number of hours booked. A group pays "+y+" dollars in total. For how many hours did the group book the hall?",
      x,0.001,
      "Set the total cost equal to \\("+y+"\\) and solve for \\(h\\): \\[ \\begin{aligned} "+y+" &= "+m+"h + "+b+" \\\\ "+(y-b)+" &= "+m+"h \\\\ h &= "+x+" \\end{aligned} \\] The group booked the hall for <b>\\("+x+"\\) hours</b>.",
      {mode:mode,m:m,b:b,given:y,ans:x});
  }
  if(mode===2){
    var m2=pick([8,10,12,14,15,16,20,25]),b2=pick([20,30,40,50,60,80,100]),t=ri(2,12),ans=m2*t+b2;
    return numq("A water tank is being filled. The volume of water in the tank, in litres, is given by \\(V = "+m2+"t + "+b2+"\\), where \\(t\\) is the time in minutes since filling started. What is the volume of water in the tank after \\("+t+"\\) minutes?",
      ans,0.001,
      "Substitute \\(t = "+t+"\\) into the equation: \\[ \\begin{aligned} V &= "+m2+"("+t+") + "+b2+" \\\\ &= "+(m2*t)+" + "+b2+" \\\\ &= "+ans+" \\end{aligned} \\] The volume is <b>\\("+ans+"\\) litres</b>.",
      {mode:mode,m:m2,b:b2,given:t,ans:ans});
  }
  if(mode===3){
    var p=pick([8,9,10,11,12,14,15]),q=pick([5,6,7,8,9,10]),a=ri(2,8),c=ri(2,9),tot=p*a+q*c;
    return numq("Adult tickets cost "+p+" dollars each and child tickets cost "+q+" dollars each. The total cost, in dollars, is given by \\(T = "+p+"a + "+q+"c\\), where \\(a\\) is the number of adult tickets and \\(c\\) is the number of child tickets. A group pays "+tot+" dollars in total and buys "+a+" adult tickets. How many child tickets does the group buy?",
      c,0.001,
      "Substitute the total and the number of adult tickets, then solve for \\(c\\): \\[ \\begin{aligned} "+tot+" &= "+p+"("+a+") + "+q+"c \\\\ "+tot+" &= "+(p*a)+" + "+q+"c \\\\ "+(tot-p*a)+" &= "+q+"c \\\\ c &= "+c+" \\end{aligned} \\] The group buys <b>\\("+c+"\\) child tickets</b>.",
      {mode:mode,p:p,q:q,given:a,tot:tot,ans:c});
  }
  var m4=pick([20,25,30,35,40,45,50,60]),b4=pick([30,40,50,60,80,100,120]),x4=ri(2,10),y4=m4*x4+b4;
  return numq("A student is saving toward a goal. The total saved, in dollars, is given by \\(S = "+m4+"w + "+b4+"\\), where \\(w\\) is the number of weeks of saving. The student reaches a total of "+y4+" dollars. For how many weeks has the student been saving?",
    x4,0.001,
    "Set the total saved equal to \\("+y4+"\\) and solve for \\(w\\): \\[ \\begin{aligned} "+y4+" &= "+m4+"w + "+b4+" \\\\ "+(y4-b4)+" &= "+m4+"w \\\\ w &= "+x4+" \\end{aligned} \\] The student has been saving for <b>\\("+x4+"\\) weeks</b>.",
    {mode:mode,m:m4,b:b4,given:y4,ans:x4});
});

/* ================= 1b. problem using an equation: solve for the other variable (4.17, L2, num, CR 2; the solve family split from u5-problem-equation under the ruling 8 principle, Nov 13, 2026) ================= */
E("u5-problem-equation-solve",5,["4.17"],2,"gen",function(){
  var mode=pick([1,3,4]);
  if(mode===1){
    var m=pick([12,15,18,20,24,25,30,36]),b=pick([15,20,25,30,40,50,60]),x=ri(2,9),y=m*x+b;
    return numq("A community hall charges a booking fee plus an hourly rate. The total cost, in dollars, is given by \\(C = "+m+"h + "+b+"\\), where \\(h\\) is the number of hours booked. A group pays "+y+" dollars in total. For how many hours did the group book the hall?",
      x,0.001,
      "Set the total cost equal to \\("+y+"\\) and solve for \\(h\\): \\[ \\begin{aligned} "+y+" &= "+m+"h + "+b+" \\\\ "+(y-b)+" &= "+m+"h \\\\ h &= "+x+" \\end{aligned} \\] The group booked the hall for <b>\\("+x+"\\) hours</b>.",
      {mode:mode,m:m,b:b,given:y,ans:x});
  }
  if(mode===2){
    var m2=pick([8,10,12,14,15,16,20,25]),b2=pick([20,30,40,50,60,80,100]),t=ri(2,12),ans=m2*t+b2;
    return numq("A water tank is being filled. The volume of water in the tank, in litres, is given by \\(V = "+m2+"t + "+b2+"\\), where \\(t\\) is the time in minutes since filling started. What is the volume of water in the tank after \\("+t+"\\) minutes?",
      ans,0.001,
      "Substitute \\(t = "+t+"\\) into the equation: \\[ \\begin{aligned} V &= "+m2+"("+t+") + "+b2+" \\\\ &= "+(m2*t)+" + "+b2+" \\\\ &= "+ans+" \\end{aligned} \\] The volume is <b>\\("+ans+"\\) litres</b>.",
      {mode:mode,m:m2,b:b2,given:t,ans:ans});
  }
  if(mode===3){
    var p=pick([8,9,10,11,12,14,15]),q=pick([5,6,7,8,9,10]),a=ri(2,8),c=ri(2,9),tot=p*a+q*c;
    return numq("Adult tickets cost "+p+" dollars each and child tickets cost "+q+" dollars each. The total cost, in dollars, is given by \\(T = "+p+"a + "+q+"c\\), where \\(a\\) is the number of adult tickets and \\(c\\) is the number of child tickets. A group pays "+tot+" dollars in total and buys "+a+" adult tickets. How many child tickets does the group buy?",
      c,0.001,
      "Substitute the total and the number of adult tickets, then solve for \\(c\\): \\[ \\begin{aligned} "+tot+" &= "+p+"("+a+") + "+q+"c \\\\ "+tot+" &= "+(p*a)+" + "+q+"c \\\\ "+(tot-p*a)+" &= "+q+"c \\\\ c &= "+c+" \\end{aligned} \\] The group buys <b>\\("+c+"\\) child tickets</b>.",
      {mode:mode,p:p,q:q,given:a,tot:tot,ans:c});
  }
  var m4=pick([20,25,30,35,40,45,50,60]),b4=pick([30,40,50,60,80,100,120]),x4=ri(2,10),y4=m4*x4+b4;
  return numq("A student is saving toward a goal. The total saved, in dollars, is given by \\(S = "+m4+"w + "+b4+"\\), where \\(w\\) is the number of weeks of saving. The student reaches a total of "+y4+" dollars. For how many weeks has the student been saving?",
    x4,0.001,
    "Set the total saved equal to \\("+y4+"\\) and solve for \\(w\\): \\[ \\begin{aligned} "+y4+" &= "+m4+"w + "+b4+" \\\\ "+(y4-b4)+" &= "+m4+"w \\\\ w &= "+x4+" \\end{aligned} \\] The student has been saving for <b>\\("+x4+"\\) weeks</b>.",
    {mode:mode,m:m4,b:b4,given:y4,ans:x4});
});

/* ================= 2. slope from rise and run (4.18, L1, mcq) ================= */
E("u5-slope-rise-run",5,["4.18"],1,"gen",function(){
  var mode=ri(1,3),rise,run,desc;
  if(mode===3){
    var x1=ri(0,5),y1=ri(0,10),dx=ri(2,8),dy=0;while(dy===0)dy=ri(-9,9);
    rise=dy;run=dx;
    desc="A line segment joins the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x1+dx,y1+dy)+"\\)";
    var prm={mode:mode,x1:x1,y1:y1,x2:x1+dx,y2:y1+dy,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }else{
    var R=ri(2,24),U=ri(2,24);
    if(mode===1){rise=R;desc="A line segment rises "+R+" units over a horizontal run of "+U+" units";}
    else{rise=-R;desc="A line segment falls "+R+" units over a horizontal run of "+U+" units";}
    run=U;
    var prm={mode:mode,rise:rise,run:run,ansN:u5red(rise,run)[0],ansD:u5red(rise,run)[1]};
  }
  var ar=u5red(rise,run),ansN=ar[0],ansD=ar[1];
  var key="\\("+u5fs(ansN,ansD)+"\\)";
  var cands=["\\("+u5fs(run,rise)+"\\)","\\("+u5fs(-rise,run)+"\\)","\\("+u5fs(rise+run,run)+"\\)","\\("+u5fs(rise,run+rise)+"\\)","\\("+u5fs(rise*2,run)+"\\)"];
  var ds=u5pickS3(key,cands);
  return mcq(desc+". What is the slope of the segment?",
    key,ds,
    "Slope is rise divided by run: \\[ \\begin{aligned} m &= "+u5fs(rise,run)+" \\\\ &= "+u5fs(ansN,ansD)+" \\end{aligned} \\] The slope is <b>\\("+u5fs(ansN,ansD)+"\\)</b>.",
    prm);
});

/* ================= 3. why any two points give the same slope (4.20, L3, var, SR) ================= */
E("u5-slope-any-two",5,["4.20"],3,"var",varset([
  function(){var key="The rise and run between any two points form similar triangles, so the ratio of rise to run stays constant";
    return mcq("Why does using any two points on a straight line always give the same slope?",
    key,
    ["The rise and run between any two points are always equal, so the ratio of rise to run stays constant",
     "The points on a line are evenly spaced along it, so the ratio of rise to run stays the same at each step",
     "The slope formula subtracts the coordinates in reverse order, and that reversal makes every result match exactly"],
    "Join any two pairs of points on the line to the horizontal and vertical steps between them. Those step triangles all have the same shape, so they are similar, and in similar triangles the ratio of the vertical side to the horizontal side is fixed. That ratio is the slope, so <b>any two points give the same slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Between points farther apart, the rise and the run both grow by the same factor, so their ratio is unchanged";
    return mcq("Points \\(A\\) and \\(B\\) are close together on a line, and points \\(C\\) and \\(D\\) are far apart on the same line. Why is the slope from \\(C\\) to \\(D\\) the same as the slope from \\(A\\) to \\(B\\)?",
    key,
    ["Between points farther apart, the rise grows but the run stays fixed, so their ratio is unchanged",
     "Between points farther apart, the rise and the run are both equal to the distance, so their ratio is unchanged",
     "Between points farther apart, the coordinates are larger numbers, so their ratio is unchanged"],
    "Moving farther along the same line scales both steps together: the rise and the run are each multiplied by the same factor, and multiplying the top and bottom of a ratio by the same factor leaves the ratio unchanged. So <b>the slope is the same for any two points on the line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A straight line has a constant rate of change, so the change in y for each unit change in x is the same everywhere";
    return mcq("Which statement best explains why the slope of a line does not depend on which two of its points are chosen?",
    key,
    ["A line has a constant length between points, so the change in y per unit change in x is always the same",
     "A straight line has a constant direction word for it, so the change in y for each unit change in x is the same everywhere",
     "A straight line has coordinates that repeat in a pattern, so the change in y for each unit change in x is the same everywhere"],
    "A line is straight precisely because its rate of change never varies: each unit step in \\(x\\) always comes with the same change in \\(y\\). Slope measures that rate, so it comes out the same no matter which two points are used. The slope is <b>the same for every pair of points</b> because the rate of change is constant.",
    {stmt:true,keyText:key});},
  function(){var key="The step triangles built on any two pairs of points are similar, and similar triangles have equal ratios of matching sides";
    return mcq("A student draws a right triangle under a line using one pair of points, then a larger right triangle using another pair, and gets the same slope both times. Which statement explains this?",
    key,
    ["The step triangles built on any two pairs of points are congruent, and congruent triangles have equal ratios of matching sides",
     "The step triangles built on any two pairs of points have equal areas, and equal areas give equal ratios of matching sides",
     "The step triangles built on any two pairs of points share the line as a side, and a shared side gives equal ratios of matching sides"],
    "Both triangles sit against the same line, so they share its angle with the horizontal and both have a right angle. That makes them similar, and in similar triangles the ratios of matching sides are equal. The ratio of the vertical side to the horizontal side is the slope in both cases, so <b>the two slopes agree</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 4. slope as a rate of change (4.21, L2, num, CR 3) ================= */
E("u5-slope-rate",5,["4.21"],1,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var v=pick([45,50,55,60,65,70,75,80,90]),off=pick([0,10,20,30]),x1=ri(1,3),dt=ri(2,4),x2=x1+dt,y1=off+v*x1,y2=off+v*x2;
    return numq("A car travels along a highway. After \\("+x1+"\\) hours it is \\("+y1+"\\) km from its starting point, and after \\("+x2+"\\) hours it is \\("+y2+"\\) km from its starting point. The distance grows at a constant rate. What is the slope of the distance and time relation, as a rate of change? Give the rate in kilometres per hour.",
      v,0.001,
      "Slope is the change in distance divided by the change in time: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+v+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+v+"\\) kilometres per hour</b>.",
      {mode:mode,x1:x1,x2:x2,y1:y1,y2:y2,ans:v});
  }
  if(mode===2){
    var r=pick([3,4,5,6,8,10,12,15]),start=pick([10,20,30,40,50]),x1b=ri(2,6),dtb=ri(2,5),x2b=x1b+dtb,y1b=start+r*x1b,y2b=start+r*x2b;
    return numq("A tank fills at a constant rate. After \\("+x1b+"\\) minutes the tank holds \\("+y1b+"\\) litres, and after \\("+x2b+"\\) minutes it holds \\("+y2b+"\\) litres. What is the slope of the volume and time relation, as a rate of change? Give the rate in litres per minute.",
      r,0.001,
      "Slope is the change in volume divided by the change in time: \\[ \\begin{aligned} m &= \\frac{"+y2b+" - "+y1b+"}{"+x2b+" - "+x1b+"} \\\\ &= \\frac{"+(y2b-y1b)+"}{"+(x2b-x1b)+"} \\\\ &= "+r+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+r+"\\) litres per minute</b>.",
      {mode:mode,x1:x1b,x2:x2b,y1:y1b,y2:y2b,ans:r});
  }
  if(mode===3){
    var price=pick([1.5,2.5,3.5,4.5,5.5,6.5]),fee=pick([2,3,4,5,6]),n1=ri(2,5),dtn=ri(2,4),n2=n1+dtn,c1=fee+price*n1,c2=fee+price*n2;
    return numq("A snack stand charges a fixed tray fee plus a price for each item. Buying \\("+n1+"\\) items costs "+c1+" dollars in total, and buying \\("+n2+"\\) items costs "+c2+" dollars in total. What is the slope of the cost and items relation, as a rate of change? Give the rate in dollars per item.",
      price,0.011,
      "Slope is the change in cost divided by the change in the number of items: \\[ \\begin{aligned} m &= \\frac{"+c2+" - "+c1+"}{"+n2+" - "+n1+"} \\\\ &= \\frac{"+(c2-c1)+"}{"+(n2-n1)+"} \\\\ &= "+price+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+price+"\\) dollars per item</b>.",
      {mode:mode,x1:n1,x2:n2,y1:c1,y2:c2,ans:price});
  }
  var w=pick([16,18,20,22,24,25,28,30]),base=pick([0,15,30,45]),h1=ri(2,5),dth=ri(2,5),h2=h1+dth,e1=base+w*h1,e2=base+w*h2;
  return numq("A worker earns a fixed weekly bonus plus an hourly wage. Working \\("+h1+"\\) hours in a week pays "+e1+" dollars in total, and working \\("+h2+"\\) hours pays "+e2+" dollars in total. What is the slope of the pay and hours relation, as a rate of change? Give the rate in dollars per hour.",
    w,0.001,
    "Slope is the change in pay divided by the change in hours: \\[ \\begin{aligned} m &= \\frac{"+e2+" - "+e1+"}{"+h2+" - "+h1+"} \\\\ &= \\frac{"+(e2-e1)+"}{"+(h2-h1)+"} \\\\ &= "+w+" \\end{aligned} \\] As a rate of change, the slope is <b>\\("+w+"\\) dollars per hour</b>.",
    {mode:mode,x1:h1,x2:h2,y1:e1,y2:e2,ans:w});
});

/* ================= 5. positive or negative slope (4.22, L1, var, SR) ================= */
E("u5-slope-sign",5,["4.22"],1,"var",varset([
  function(){var key="It has a positive slope, because the y values increase as the x values increase along the line";
    return mcq("A line rises as it is read from left to right. Which classification is correct?",
    key,
    ["It has a negative slope, because the y values increase as the x values increase along the line",
     "It has a slope of zero, because the y values increase as the x values increase along the line",
     "It has no defined slope, because the y values increase as the x values increase along the line"],
    "A line that rises from left to right gains height as \\(x\\) grows, so the change in \\(y\\) and the change in \\(x\\) have the same sign and their ratio is positive. The line has a <b>positive slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It has a negative slope, because the y values decrease as the x values increase along the line";
    return mcq("A line falls as it is read from left to right. Which classification is correct?",
    key,
    ["It has a positive slope, because the y values decrease as the x values increase along the line",
     "It has a slope of zero, because the y values decrease as the x values increase along the line",
     "It has no defined slope, because the y values decrease as the x values increase along the line"],
    "A line that falls from left to right loses height as \\(x\\) grows, so the change in \\(y\\) is negative while the change in \\(x\\) is positive, and their ratio is negative. The line has a <b>negative slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It has a negative slope, because the second point is lower than the first point on the line";
    return mcq("A line passes through the points \\((2, 7)\\) and \\((6, 3)\\). Which classification is correct?",
    key,
    ["It has a positive slope, because the second point is lower than the first point on the line",
     "It has a slope of zero, because the second point is lower than the first point on the line",
     "It has no defined slope, because the second point is lower than the first point on the line"],
    "From the first point to the second, \\(y\\) drops from \\(7\\) to \\(3\\) while \\(x\\) grows from \\(2\\) to \\(6\\), so the rise is negative and the run is positive. The slope is negative: the line has a <b>negative slope</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The harbour path has a positive slope and the hill path has a negative slope, matching how each one is described";
    return mcq("One path rises steadily toward a harbour and another path descends steadily from a hill. Which pairing of slopes is correct?",
    key,
    ["The harbour path has a negative slope and the hill path has a positive slope, matching how each one is described",
     "The harbour path has a positive slope and the hill path has a positive slope, matching how each one is described",
     "The harbour path has a negative slope and the hill path has a negative slope, matching how each one is described"],
    "A path that rises has a positive slope, and a path that descends has a negative slope. So the harbour path has a <b>positive slope</b> and the hill path has a <b>negative slope</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 6. slope of horizontal and vertical lines (4.23, L1, var, SR) ================= */
E("u5-slope-hv",5,["4.23"],1,"var",varset([
  function(){var key="Its slope is 0, because the y values never change, so the rise is 0 for any run along the line";
    return mcq("What is the slope of a horizontal line, and why?",
    key,
    ["Its slope is not defined, because the y values never change, so the rise is 0 for any run along the line",
     "Its slope is 1, because the y values never change, so the rise is 0 for any run along the line",
     "Its slope is negative, because the y values never change, so the rise is 0 for any run along the line"],
    "On a horizontal line every point has the same \\(y\\) value, so the rise between any two points is \\(0\\), and \\(0\\) divided by any run is \\(0\\). The slope of a horizontal line is <b>0</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Its slope is not a number, because the x values never change, so the run is 0 and division by 0 is not possible";
    return mcq("What is the slope of a vertical line, and why?",
    key,
    ["Its slope is 0, because the x values never change, so the run is 0 and division by 0 is not possible",
     "Its slope is 1, because the x values never change, so the run is 0 and division by 0 is not possible",
     "Its slope is negative, because the x values never change, so the run is 0 and division by 0 is not possible in any case"],
    "On a vertical line every point has the same \\(x\\) value, so the run between any two points is \\(0\\). Slope would need a division by \\(0\\), which is not possible, so a vertical line has <b>no defined slope</b>. Undefined is the standard word for a slope that cannot be computed as a number.",
    {stmt:true,keyText:key});},
  function(){var key="The slope is 0, which means the height stays the same the whole way across the flat stretch of road";
    return mcq("A flat stretch of road is drawn as the horizontal line through points with height \\(4\\) m. What does its slope mean?",
    key,
    ["The slope is not defined, which means the height stays the same the whole way across the flat stretch of road",
     "The slope is 1, which means the height stays the same the whole way across the flat stretch of road",
     "The slope is 4, which means the height stays the same the whole way across the flat stretch of road"],
    "The line is horizontal, so its slope is \\(0\\). A slope of \\(0\\) means there is no rise at all: the height stays the same the whole way across. The slope is <b>0</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No slope value exists for it, which means the wall rises straight up with no horizontal run at all";
    return mcq("A wall face is drawn as the vertical line through points with position \\(3\\) m. What does its slope mean?",
    key,
    ["The slope is 0, which means the wall rises straight up with no horizontal run at all",
     "The slope is 1, which means the wall rises straight up with no horizontal run at all",
     "The slope is 3, which means the wall rises straight up with no horizontal run at all, from its base to its top"],
    "The line is vertical, so the run between any two of its points is \\(0\\), and slope would require dividing by \\(0\\). The line <b>has no defined slope</b>: the wall rises straight up with no horizontal run. Undefined is the standard word for this case.",
    {stmt:true,keyText:key});}
]));

/* ================= 7. draw a line from slope and a point (4.24, L2, mcq) ================= */
E("u5-draw-line",5,["4.24"],1,"gen",function(){
  var sl=u5slopes().filter(function(s){return Math.abs(s[0])!==s[1];});
  var s=pick(sl),mN=s[0],mD=s[1];
  var x=ri(-5,7),y=ri(-4,9),x2=x+mD,y2=y+mN;
  var dirWord=mN>0?("move "+mD+" units right and "+mN+" units up"):("move "+mD+" units right and "+(-mN)+" units down");
  var key="Start at "+u5pt(x,y)+", "+dirWord+" to reach "+u5pt(x2,y2)+", then draw the line through the two points";
  var sx=x+Math.abs(mN),sy=y+(mN>0?mD:-mD);
  var fx=x+mD,fy=y-mN;
  var lx=x-mD,ly=y+mN;
  var d1="Start at "+u5pt(x,y)+", move "+Math.abs(mN)+" units right and "+(mN>0?mD+" units up":mD+" units down")+" to reach "+u5pt(sx,sy)+", then draw the line through the two points";
  var d2="Start at "+u5pt(x,y)+", "+(mN>0?("move "+mD+" units right and "+mN+" units down"):("move "+mD+" units right and "+(-mN)+" units up"))+" to reach "+u5pt(fx,fy)+", then draw the line through the two points";
  var d3="Start at "+u5pt(x,y)+", "+(mN>0?("move "+mD+" units left and "+mN+" units up"):("move "+mD+" units left and "+(-mN)+" units down"))+" to reach "+u5pt(lx,ly)+", then draw the line through the two points";
  var ds=u5pickS3(key,[d1,d2,d3]);
  return mcq("A line has slope \\("+u5fs(mN,mD)+"\\) and passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)). Which description correctly draws the line?",
    key,ds,
    "Start at the given point and use the slope as rise over run, moving "+mD+" units right and "+mN+" units "+(mN>0?"up":"down (a negative rise)")+": \\[ \\begin{aligned} "+u5pt(x,y)+" &\\to "+u5pt(x2,y2)+" \\end{aligned} \\] Draw the line through those two points. The correct description starts at <b>"+u5pt(x,y)+"</b> and reaches <b>"+u5pt(x2,y2)+"</b>.",
    {mN:mN,mD:mD,x:x,y:y,x2:x2,y2:y2,keyText:key});
});

/* ================= 8. another point on a line (4.25, L2, mcq) ================= */
E("u5-another-point",5,["4.25"],1,"gen",function(){
  var sl=u5slopes().filter(function(s){return Math.abs(s[0])!==s[1];});
  var s=pick(sl),mN=s[0],mD=s[1];
  var x=ri(-6,6),y=ri(-5,9),st=pick([1,2]);
  var x2=x+mD*st,y2=y+mN*st;
  var key=u5pt(x2,y2);
  var candPts=[[x+Math.abs(mN)*st,y+(mN>0?mD*st:-mD*st)],[x+mD*st,y-mN*st],[x+mD*st+1,y+mN*st],[x-mD*st,y-mN*st],[x+mD*(st+1),y+mN*st]];
  var cands=candPts.map(function(p){return u5pt(p[0],p[1]);});
  var ds=u5pickS3(key,cands);
  return mcq("A line has slope \\("+u5fs(mN,mD)+"\\) and passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)). Which point is also on the line?",
    key,ds,
    "Use the slope as rise over run, taking "+st+(st===1?" step":" steps")+" from the given point: \\[ \\begin{aligned} x &: "+x+" + "+(mD*st)+" = "+x2+" \\\\ y &: "+y+" + "+(mN*st)+" = "+y2+" \\end{aligned} \\] Another point on the line is <b>\\("+u5pt(x2,y2)+"\\)</b>.",
    {mN:mN,mD:mD,x:x,y:y,st:st,x2:x2,y2:y2,keyText:key});
});

/* ================= 9. parallel or perpendicular (4.26, L2, mcq, CR 2) ================= */
E("u5-parallel-perp",5,["4.26"],1,"gen",function(){
  var rel=ri(0,2); /* 0 parallel, 1 perpendicular, 2 neither */
  var s=u5pickSlope(),m1N=s[0],m1D=s[1];
  var b1=ri(-8,8),b2=b1+pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var m2N,m2D;
  if(rel===0){m2N=m1N;m2D=m1D;}
  else if(rel===1){var r=u5red(-m1D,m1N);m2N=r[0];m2D=r[1];}
  else{
    var alt=u5slopes().filter(function(t){var a=u5red(t[0],t[1]);var same=(a[0]*m1D===m1N*a[1]);var perp=(a[0]*m1N===-m1D*a[1]);return !same&&!perp;});
    var t2=pick(alt);m2N=t2[0];m2D=t2[1];
  }
  var key=rel===0?"Parallel":rel===1?"Perpendicular":"Neither parallel nor perpendicular";
  var ds=u5pickS3(key,["Parallel","Perpendicular","Neither parallel nor perpendicular","The same line"]);
  var prodNote=rel===1?("The product of the slopes is \\("+u5fs(m1N,m1D)+" \\times "+u5fs(m2N,m2D)+" = -1\\), the test for perpendicular lines."):
    rel===0?("The slopes are equal, \\("+u5fs(m1N,m1D)+" = "+u5fs(m2N,m2D)+"\\), and the intercepts differ, so the lines are parallel and distinct."):
    ("The slopes \\("+u5fs(m1N,m1D)+"\\) and \\("+u5fs(m2N,m2D)+"\\) are not equal, and their product is not \\(-1\\), so the lines meet at one point without being perpendicular.");
  return mcq("Line A is \\("+u5ybRaw(m1N,m1D,b1)+"\\) and Line B is \\("+u5ybRaw(m2N,m2D,b2)+"\\) (each in the form \\(y = mx + b\\)). How are the two lines related?",
    key,ds,
    "Compare the slopes. Line A has slope \\("+u5fs(m1N,m1D)+"\\) and Line B has slope \\("+u5fs(m2N,m2D)+"\\). "+prodNote+" The lines are <b>"+key.toLowerCase()+"</b>.",
    {m1N:m1N,m1D:m1D,b1:b1,m2N:m2N,m2D:m2D,b2:b2,rel:rel,keyText:key});
});

/* ================= 10. contextual slope problem with a decision (4.27, L3, num, CR 3) ================= */
E("u5-slope-context",5,["4.27"],3,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var run=pick([120,144,168,192,216,240,264,288,312,360]),allowed=run/12,extra=pick([3,4,5,6,7,8,9,10,11,12,14,15,16,18,20,22,24]),actual=allowed+extra;
    return numq("A new access ramp rises "+actual+" cm over a horizontal run of "+run+" cm. A building standard allows a slope of at most \\(1\\) unit of rise for every \\(12\\) units of run. By how many centimetres must the rise of this ramp be reduced so that it meets the standard exactly?",
      extra,0.001,
      "The greatest rise the standard allows for this run is found from the limiting slope: \\[ \\begin{aligned} \\text{allowed rise} &= \\frac{"+run+"}{12} \\\\ &= "+allowed+" \\end{aligned} \\] The ramp rises "+actual+" cm, which is over the limit, so it must come down by \\("+actual+" - "+allowed+" = "+extra+"\\). The rise must be reduced by <b>\\("+extra+"\\) cm</b>.",
      {mode:mode,run:run,allowed:allowed,actual:actual,ans:extra});
  }
  if(mode===2){
    var rise=pick([16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,48]),need=12*rise,short=pick([18,24,30,36,42,48,54,60,72,84,96]),run2=need-short;
    return numq("A garden ramp must rise "+rise+" cm. Its horizontal run is currently "+run2+" cm. A safety guide allows a slope of at most \\(1\\) unit of rise for every \\(12\\) units of run. By how many centimetres must the run be lengthened so that the ramp meets the guide exactly?",
      short,0.001,
      "The shortest run the guide allows for this rise is found from the limiting slope: \\[ \\begin{aligned} \\text{needed run} &= 12 \\times "+rise+" \\\\ &= "+need+" \\end{aligned} \\] The run is "+run2+" cm, which is too short, so it must be lengthened by \\("+need+" - "+run2+" = "+short+"\\). The run must be lengthened by <b>\\("+short+"\\) cm</b>.",
      {mode:mode,rise:rise,need:need,run:run2,ans:short});
  }
  if(mode===3){
    var r1=ri(2,14),r2=ri(2,14),t=0;while(r2===r1&&t<50){r2=ri(2,14);t++;}
    var big=Math.max(r1,r2),ans=big/20;
    return numq("Two roofs each span a horizontal run of \\(20\\) m. One roof rises "+r1+" m over that run and the other rises "+r2+" m over that run. Which roof is steeper is decided by comparing slopes. What is the slope of the steeper roof?",
      ans,0.001,
      "With the same run, the roof with the greater rise has the greater slope. Compare the two slopes: \\[ \\begin{aligned} \\text{first slope} &= \\frac{"+r1+"}{20} = "+(r1/20)+" \\\\ \\text{second slope} &= \\frac{"+r2+"}{20} = "+(r2/20)+" \\end{aligned} \\] The steeper roof is the one rising "+big+" m. Its slope is <b>\\("+ans+"\\)</b>.",
      {mode:mode,r1:r1,r2:r2,ans:ans});
  }
  var a1=ri(2,12),gap=pick([3,6,9]),a2=a1+gap,ans2=gap/12;
  return numq("Two garden paths each cover a horizontal run of \\(12\\) m. One path climbs "+a1+" m over that run and the other climbs "+a2+" m over that run. By how much does the slope of the steeper path exceed the slope of the less steep path?",
    ans2,0.001,
    "Find each slope, then subtract: \\[ \\begin{aligned} \\text{steeper slope} &= \\frac{"+a2+"}{12} \\\\ \\text{less steep slope} &= \\frac{"+a1+"}{12} \\\\ \\text{difference} &= \\frac{"+a2+" - "+a1+"}{12} = "+ans2+" \\end{aligned} \\] The slope of the steeper path exceeds the other by <b>\\("+ans2+"\\)</b>.",
    {mode:mode,r1:a1,r2:a2,ans:ans2});
});

/* ================= 11. match a relation to its graph (4.33, L2, mcq) ================= */
E("u5-match-graphs",5,["4.33"],1,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=0;while(b===0)b=ri(-9,9);
  var signWord=mN>0?"positive":"negative";
  function desc(sw,bv){return "A line with "+sw+" slope that crosses the y-axis at "+bv;}
  var key=desc(signWord,b);
  var ds=u5pickS3(key,[desc(mN>0?"negative":"positive",b),desc(signWord,-b),desc(mN>0?"negative":"positive",-b),desc(signWord,b+3),desc("zero",b)]);
  return mcq("A graph is described in words only. Which description matches the graph of the relation \\("+u5ybRaw(mN,mD,b)+"\\)?",
    key,ds,
    "In the form \\(y = mx + b\\), the value of \\(m\\) gives the sign of the slope and the value of \\(b\\) gives where the line crosses the y-axis: \\[ \\begin{aligned} m &= "+u5fs(mN,mD)+" \\\\ b &= "+b+" \\end{aligned} \\] The slope is "+signWord+" and the line crosses the y-axis at \\("+b+"\\). The matching description is: <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,keyText:key});
});

/* ================= 12. graphing strategies for each form (4.34, L2, var, SR) ================= */
E("u5-graph-strategy",5,["4.34"],1,"var",varset([
  function(){var key="Plot the y-intercept first, then use the slope as rise over run to find another point and draw the line";
    return mcq("Which strategy graphs a linear relation given in slope-intercept form?",
    key,
    ["Plot the x-intercept first, then use the intercept as rise over run to find another point and draw the line",
     "Plot both intercepts first, then use the slope as rise over run to confirm a point and draw the line",
     "Plot a point from the equation first, then read the slope off the axes to find the intercept and draw the line"],
    "Slope-intercept form states the y-intercept and the slope directly, so the natural strategy is to plot the intercept, then step out the slope to a second point. The strategy is: <b>plot the y-intercept, then use the slope as rise over run</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Find the two intercepts by setting each variable to zero in turn, plot those two points, and draw the line";
    return mcq("Which strategy graphs a linear relation given in general form, using the intercepts directly?",
    key,
    ["Find the two intercepts by setting each variable to one in turn, plot those two points, and draw the line through them",
     "Find the one intercept by setting both variables to zero in turn, plot that one point, and draw the line",
     "Find the two intercepts by reading each coefficient in turn, plot those two points, and draw the line"],
    "In general form neither the slope nor an intercept is stated directly, but setting \\(x = 0\\) gives the y-intercept and setting \\(y = 0\\) gives the x-intercept. Two points fix a line, so the strategy is: <b>find both intercepts, plot them, and draw the line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Plot the given point first, then use the slope as rise over run to reach another point and draw the line";
    return mcq("Which strategy graphs a linear relation given in slope-point form?",
    key,
    ["Plot the given intercept first, then use the slope as rise over run to reach another point and draw the line",
     "Plot the given point first, then use the intercept as rise over run to reach another point and draw the line",
     "Plot the given point first, then use the run over rise of the slope to reach a point and draw the line"],
    "Slope-point form states one point on the line and the slope directly, so the natural strategy is to plot that point, then step out the slope to a second point. The strategy is: <b>plot the given point, then use the slope as rise over run</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The form decides the first step: an intercept and slope, a stated point and slope, or the two intercepts for general form";
    return mcq("A student must graph three relations, one in each of slope-intercept, slope-point and general form. Which statement about strategy is correct?",
    key,
    ["The form decides the first step: the two intercepts in every case, since each form is graphed from its intercepts alone",
     "The form decides the last step: an intercept and slope, a stated point and slope, or the two intercepts for general form",
     "The form changes nothing about strategy: an intercept and slope, a stated point and slope, or two intercepts for general form"],
    "Each form hands over different starting information. Slope-intercept form gives an intercept and a slope, slope-point form gives a point and a slope, and general form is handled most directly through its two intercepts. So <b>the form decides the first step</b> of the graphing strategy.",
    {stmt:true,keyText:key});}
]));

/* ================= 13. graph a relation in a given form (4.35, L2, mcq) ================= */
E("u5-graph-form",5,["4.35"],2,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var s=u5pickSlope(),mN=s[0],mD=s[1];
    var xi=mD*ri(1,4)*(pick([-1,1]));if(xi===0)xi=mD;
    var b=-(mN*xi)/mD; /* integer since xi is a multiple of mD */
    var key=""+xi;
    var ds=u5pickD3(xi,[-xi,b,-b,xi+1,xi-1]).map(function(v){return ""+v;});
    return mcq("A linear relation is given in slope-intercept form as \\("+u5ybRaw(mN,mD,b)+"\\) (given in the form \\(y = mx + b\\)). Using the strategy for this form, the line is plotted from its intercept and slope. What is the x-intercept of its graph?",
      key,ds,
      "The x-intercept is where \\(y = 0\\). Set \\(y\\) to \\(0\\) and solve: \\[ \\begin{aligned} 0 &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\\\ x &= "+xi+" \\end{aligned} \\] The x-intercept is <b>\\("+xi+"\\)</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,ansVal:xi});
  }
  if(mode===2){
    var s2=u5pickSlope(),mN2=s2[0],mD2=s2[1],b2=ri(-9,9);
    var g=u5genFromLine(mN2,mD2,b2),A=g[0],B=g[1],C=g[2];
    var targetY=pick([true,false]);
    var ansVal=targetY?b2:(-C/A); /* x-intercept: integer? A divides C check below handled by construction */
    if(!targetY&&C%A!==0){targetY=true;ansVal=b2;}
    var key2=""+ansVal;
    var ds2=u5pickD3(ansVal,[-ansVal,ansVal+2,ansVal-2,b2,-b2]).map(function(v){return ""+v;});
    return mcq("A linear relation is given in general form as \\("+u5genRaw(A,B,C)+"\\) (given in the form \\(Ax + By + C = 0\\)). Using the intercept strategy for this form, what is the "+(targetY?"y-intercept":"x-intercept")+" of its graph?",
      key2,ds2,
      (targetY?
        "The y-intercept is where \\(x = 0\\). Setting \\(x = 0\\) leaves \\("+B+"y "+(C>0?"+ "+C:C<0?"- "+(-C):"")+" = 0\\), which gives \\(y = "+ansVal+"\\).":
        "The x-intercept is where \\(y = 0\\). Setting \\(y = 0\\) leaves \\("+A+"x "+(C>0?"+ "+C:C<0?"- "+(-C):"")+" = 0\\), which gives \\(x = "+ansVal+"\\).")+
      " The "+(targetY?"y-intercept":"x-intercept")+" is <b>\\("+ansVal+"\\)</b>.",
      {mode:mode,A:A,B:B,C:C,targetY:targetY,ansVal:ansVal});
  }
  var s3=u5pickSlope(),mN3=s3[0],mD3=s3[1];
  var x1=mD3*ri(-2,3),y1=ri(-8,10),b3=y1-(mN3*x1)/mD3;
  var key3=""+b3;
  var ds3=u5pickD3(b3,[-b3,b3+2,b3-2,y1,-y1]).map(function(v){return ""+v;});
  var lhs=u5minusTerm("y",y1),rhs=u5coef(mN3,mD3,"")+"("+u5minusTerm("x",x1)+")";
  if(u5coef(mN3,mD3,"")==="1")rhs="("+u5minusTerm("x",x1)+")";else if(u5coef(mN3,mD3,"")==="-1")rhs="-("+u5minusTerm("x",x1)+")";else if(u5red(mN3,mD3)[1]===1)rhs=u5red(mN3,mD3)[0]+"("+u5minusTerm("x",x1)+")";else rhs=u5fs(mN3,mD3)+"("+u5minusTerm("x",x1)+")";
  return mcq("A linear relation is given in slope-point form as \\("+lhs+" = "+rhs+"\\) (given in the form \\(y - y_1 = m(x - x_1)\\)). The line is plotted from the stated point and slope. What is the y-intercept of its graph?",
    key3,ds3,
    "The stated point is \\("+u5pt(x1,y1)+"\\) and the slope is \\("+u5fs(mN3,mD3)+"\\). Work back to where \\(x = 0\\): \\[ \\begin{aligned} b &= y_1 - m x_1 \\\\ &= "+y1+" - ("+u5fs(mN3,mD3)+")("+x1+") \\\\ &= "+b3+" \\end{aligned} \\] The y-intercept is <b>\\("+b3+"\\)</b>.",
    {mode:mode,mN:mN3,mD:mD3,x1:x1,y1:y1,ansVal:b3});
});

/* ================= 14. equation from contextual data, then use it (4.36, L3, num, CR 2) ================= */
E("u5-context-line",5,["4.36"],3,"gen",function(){
  var mode=ri(1,4),m,b,x1,x2,x3,prompt;
  var step=ri(2,4),extra=ri(2,5);x1=ri(1,4);x2=x1+step;x3=x2+extra;
  if(mode===1){m=pick([6,8,10,12,15]);b=pick([5,10,15,20,25]);
    prompt="A bike rental shop keeps a record of its charges. Renting a bike for \\("+x1+"\\) hours costs "+(m*x1+b)+" dollars, and renting for \\("+x2+"\\) hours costs "+(m*x2+b)+" dollars. The cost follows a linear relation. Using the equation of that relation, what is the cost of renting a bike for \\("+x3+"\\) hours, in dollars?";}
  else if(mode===2){m=pick([12,15,18,20,24,30]);b=pick([40,60,80,100,120]);
    prompt="A tank is filling at a steady rate. After \\("+x1+"\\) minutes it holds "+(m*x1+b)+" litres of water, and after \\("+x2+"\\) minutes it holds "+(m*x2+b)+" litres. The volume follows a linear relation. Using the equation of that relation, how many litres does the tank hold after \\("+x3+"\\) minutes?";}
  else if(mode===3){var rate=pick([8,10,12,15,20]);m=-rate;b=pick([240,260,280,300,320,360]);
    prompt="A storage tank is draining at a steady rate. After \\("+x1+"\\) minutes it holds "+(m*x1+b)+" litres of water, and after \\("+x2+"\\) minutes it holds "+(m*x2+b)+" litres. The volume follows a linear relation. Using the equation of that relation, how many litres does the tank hold after \\("+x3+"\\) minutes?";}
  else{m=pick([25,30,40,50,60]);b=pick([20,40,60,80,100]);
    prompt="A student saves the same amount each week. After \\("+x1+"\\) weeks the student has saved "+(m*x1+b)+" dollars in total, and after \\("+x2+"\\) weeks the student has saved "+(m*x2+b)+" dollars in total. The total follows a linear relation. Using the equation of that relation, how many dollars has the student saved after \\("+x3+"\\) weeks?";}
  var y1=m*x1+b,y2=m*x2+b,ans=m*x3+b;
  return numq(prompt,ans,0.001,
    "First find the slope from the two stated values, then the starting value, then evaluate at the new value: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+m+" \\\\ b &= "+y1+" - "+m+"("+x1+") = "+b+" \\\\ \\text{value at } "+x3+" &= "+m+"("+x3+") + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The value at \\("+x3+"\\) is <b>\\("+ans+"\\)</b>.",
    {mode:mode,m:m,b:b,x1:x1,x2:x2,x3:x3,y1:y1,y2:y2,ans:ans});
});

/* ================= 15. same relation in different forms (4.38, L2, mcq) ================= */
E("u5-compare-forms",5,["4.38"],2,"gen",function(){
  var rel=ri(0,3); /* 0 same line, 1 parallel, 2 perpendicular, 3 intersecting only */
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-8,8);
  var m2N,m2D,b2;
  if(rel===0){m2N=mN;m2D=mD;b2=b;}
  else if(rel===1){m2N=mN;m2D=mD;b2=b+pick([-4,-3,-2,-1,1,2,3,4]);}
  else if(rel===2){var r=u5red(-mD,mN);m2N=r[0];m2D=r[1];b2=b+pick([-3,-2,-1,1,2,3]);}
  else{
    var alt=u5slopes().filter(function(t){var a=u5red(t[0],t[1]);return !(a[0]*mD===mN*a[1])&&!(a[0]*mN===-mD*a[1]);});
    var t2=pick(alt);m2N=t2[0];m2D=t2[1];b2=ri(-8,8);
  }
  var g=u5genFromLine(m2N,m2D,b2);
  var scale=pick([1,1,2,3]);var A=g[0]*scale,B=g[1]*scale,C=g[2]*scale;
  var key=rel===0?"The graphs are the same line":rel===1?"The graphs are parallel distinct lines":rel===2?"The graphs are perpendicular lines":"The graphs intersect at exactly one point, and are not perpendicular";
  var ds=u5pickS3(key,["The graphs are the same line","The graphs are parallel distinct lines","The graphs are perpendicular lines","The graphs intersect at exactly one point, and are not perpendicular"]);
  var reason=rel===0?("The general form rearranges and scales to the same slope \\("+u5fs(mN,mD)+"\\) and the same intercept \\("+b+"\\), so it is the same relation and the graphs coincide."):
    rel===1?("The second relation has slope \\("+u5fs(m2N,m2D)+"\\) like the first, but intercept \\("+b2+"\\) instead of \\("+b+"\\), so the graphs are parallel and distinct."):
    rel===2?("The second relation has slope \\("+u5fs(m2N,m2D)+"\\), and \\("+u5fs(mN,mD)+" \\times "+u5fs(m2N,m2D)+" = -1\\), so the graphs are perpendicular."):
    ("The second relation has slope \\("+u5fs(m2N,m2D)+"\\), which is neither equal to \\("+u5fs(mN,mD)+"\\) nor its negative reciprocal, so the graphs cross once without being perpendicular.");
  return mcq("One relation is given in slope-intercept form as \\("+u5ybRaw(mN,mD,b)+"\\) and another is given in general form as \\("+u5genRaw(A,B,C)+"\\) (forms: \\(y = mx + b\\) and \\(Ax + By + C = 0\\)). How do their graphs compare?",
    key,ds,
    reason+" The comparison is: <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,m2N:m2N,m2D:m2D,b2:b2,rel:rel,keyText:key});
});

/* ================= 16. rewrite a relation in another form (4.39, L2, mcq, CR 2) ================= */
E("u5-rewrite-form",5,["4.39"],2,"gen",function(){
  var mode=ri(1,2);
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var g=u5genFromLine(mN,mD,b),A=g[0],B=g[1],C=g[2];
  if(mode===1){
    var key=u5ybOpt(mN,mD,b);
    var ds=u5eqCands([mN,mD,b],[[-mN,mD,b],[mD,mN,b],[mN,mD,-b]]);
    return mcq("Rewrite the relation \\("+u5genRaw(A,B,C)+"\\) (given in general form, \\(Ax + By + C = 0\\)) in slope-intercept form.",
      key,ds,
      "Isolate \\(y\\): move the \\(x\\) term and the constant across, then divide through by the coefficient of \\(y\\): \\[ \\begin{aligned} "+u5genRaw(A,B,C).replace(" = 0","")+" &= 0 \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] In slope-intercept form, the relation is <b>"+key+"</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,A:A,B:B,C:C,keyStr:key});
  }
  var key2="\\("+u5genRaw(A,B,C)+"\\)";
  var alt1=u5genFromLine(-mN,mD,b),alt2=u5genFromLine(mN,mD,-b),alt3=u5genFromLine(mD,mN,b);
  var ds2=u5pickS3(key2,["\\("+u5genRaw(alt1[0],alt1[1],alt1[2])+"\\)","\\("+u5genRaw(alt2[0],alt2[1],alt2[2])+"\\)","\\("+u5genRaw(alt3[0],alt3[1],alt3[2])+"\\)"]);
  return mcq("Rewrite the relation \\("+u5ybRaw(mN,mD,b)+"\\) (given in slope-intercept form, \\(y = mx + b\\)) in general form, with integer coefficients, a positive coefficient for \\(x\\), and the constant on the same side as the variable terms.",
    key2,ds2,
    "Move every term to one side and clear the fraction in the slope: \\[ \\begin{aligned} "+u5ybRaw(mN,mD,b)+" &\\;\\text{ rearranged} \\\\ "+u5genRaw(A,B,C)+" &\\;\\text{ in general form} \\end{aligned} \\] In general form, the relation is <b>"+key2+"</b>.",
    {mode:mode,mN:mN,mD:mD,b:b,A:A,B:B,C:C,keyStr:key2});
});

/* ================= 17. equivalent relations (4.40, L2, mcq) ================= */
E("u5-equivalent",5,["4.40"],2,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var k=pick([2,3]);
  var g=u5genFromLine(mN,mD,b);
  var key="\\("+u5genRaw(g[0]*k,g[1]*k,g[2]*k)+"\\)";
  function genOpt(mmN,mmD,bb,kk){var gg=u5genFromLine(mmN,mmD,bb);return "\\("+u5genRaw(gg[0]*kk,gg[1]*kk,gg[2]*kk)+"\\)";}
  var ds=u5pickS3(key,[genOpt(-mN,mD,b,1),genOpt(mN,mD,b+pick([2,3]),1),genOpt(mD,mN,b,1),genOpt(mN,mD,-b,2)]);
  return mcq("Which relation is equivalent to \\("+u5ybRaw(mN,mD,b)+"\\) (given in the form \\(y = mx + b\\))? The choices are in general form, \\(Ax + By + C = 0\\).",
    key,ds,
    "Two relations are equivalent when they describe the same line: the same slope and the same intercept. Rearranging the given relation and multiplying through by \\("+k+"\\) gives \\[ \\begin{aligned} "+u5ybRaw(mN,mD,b)+" &\\;\\text{ rearranged and scaled} \\\\ "+key.slice(2,-2)+" &\\;\\text{ in general form} \\end{aligned} \\] The equivalent relation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,k:k,keyStr:key});
});

/* ================= 18. equation from a described graph (4.41, L2, mcq, CR 3) ================= */
E("u5-eq-from-graph",5,["4.41"],1,"gen",function(){
  var mode=ri(1,2),mN,mD,b,x1,y1,x2,y2,desc;
  if(mode===1){
    var s=u5pickSlope();mN=s[0];mD=s[1];b=ri(-9,9);
    x1=0;y1=b;var st=pick([1,2]);x2=mD*st;y2=b+mN*st;
    desc="A line is described by the points it passes through: \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))";
  }else{
    b=0;while(b===0)b=ri(-9,9);
    var xi=pick([2,3,4,5,6,8]); /* slope = -b/xi */
    var r=u5red(-b,xi);mN=r[0];mD=r[1];
    x1=xi;y1=0;x2=0;y2=b;
    desc="A line is described by its intercepts: it crosses the x-axis at \\("+u5pt(x1,y1)+"\\) and the y-axis at \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))";
  }
  var key=u5ybOpt(mN,mD,b);
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,b],[mD,mN,b],[mN,mD,-b],[mN,mD,b+2]]);
  return mcq(desc+". What is the equation of the line in the form \\(y = mx + b\\)?",
    key,ds,
    "Find the slope from the two points, and read the intercept from the point where \\(x = 0\\): \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+u5fs(mN,mD)+" \\\\ b &= "+b+" \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mode:mode,mN:mN,mD:mD,b:b,x1:x1,y1:y1,x2:x2,y2:y2,keyStr:key});
});

/* ================= 19. equation given slope and a point (4.42, L2, mcq, CR 2) ================= */
E("u5-eq-slope-point",5,["4.42"],1,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1];
  var x=mD*ri(-3,3),y=ri(-9,11),b=y-(mN*x)/mD;
  var key=u5ybOpt(mN,mD,b);
  var bNegSlope=y-((-mN)*x)/mD;
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,bNegSlope],[mN,mD,-b],[mD,mN,b],[mN,mD,b+3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line with slope \\("+u5fs(mN,mD)+"\\) that passes through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "Substitute the slope and the point into \\(y = mx + b\\) and solve for \\(b\\), reasoning that the point must satisfy the equation: \\[ \\begin{aligned} "+y+" &= ("+u5fs(mN,mD)+")("+x+") + b \\\\ "+y+" &= "+((mN*x)/mD)+" + b \\\\ b &= "+b+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,x:x,y:y,b:b,keyStr:key});
});

/* ================= 20. equation given two points (4.43, L2, mcq, CR 3) ================= */
E("u5-eq-two-points",5,["4.43"],2,"gen",function(){
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var x1=mD*ri(-3,2),st=pick([1,2]),x2=x1+mD*st;
  var y1=mN*(x1/mD)+b,y2=mN*(x2/mD)+b;
  var key=u5ybOpt(mN,mD,b);
  var ds=u5eqCands([mN,mD,b],[[-mN,mD,y1-((-mN)*x1)/mD],[mN,mD,-b],[mD,mN,b],[mN,mD,b-3]]);
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line through the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\))?",
    key,ds,
    "First find the slope from the two points, then use one point to find the intercept, reasoning that both points must satisfy the equation: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = "+u5fs(mN,mD)+" \\\\ b &= "+y1+" - ("+u5fs(mN,mD)+")("+x1+") = "+b+" \\\\ y &= "+u5coef(mN,mD,"x")+(b>0?" + "+b:b<0?" - "+(-b):"")+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mN:mN,mD:mD,b:b,x1:x1,y1:y1,x2:x2,y2:y2,keyStr:key});
});

/* ================= 21. equation parallel or perpendicular to a given line (4.44, L3, mcq, CR 2) ================= */
E("u5-eq-parallel-perp",5,["4.44"],3,"gen",function(){
  var mode=ri(1,2); /* 1 parallel, 2 perpendicular */
  var s=u5pickSlope(),m1N=s[0],m1D=s[1],b1=ri(-8,8);
  var m2N,m2D;
  if(mode===1){m2N=m1N;m2D=m1D;}
  else{var r=u5red(-m1D,m1N);m2N=r[0];m2D=r[1];}
  var x=m2D*ri(-3,3),y=ri(-9,11),b2=y-(m2N*x)/m2D;
  var key=u5ybOpt(m2N,m2D,b2);
  var wrongN,wrongD;
  if(mode===1){var rw=u5red(-m1D,m1N);wrongN=rw[0];wrongD=rw[1];}
  else{wrongN=m1N;wrongD=m1D;}
  var bWrong=y-(wrongN*x)/wrongD;
  var ds=u5eqCands([m2N,m2D,b2],[[wrongN,wrongD,bWrong],[m2N,m2D,b1],[-m2N,m2D,y-((-m2N)*x)/m2D],[m2N,m2D,b2+3]]);
  var word=mode===1?"parallel":"perpendicular";
  var slopeReason=mode===1?("A parallel line keeps the same slope, \\("+u5fs(m1N,m1D)+"\\)."):("A perpendicular line takes the negative reciprocal slope: \\("+u5fs(m1N,m1D)+"\\) becomes \\("+u5fs(m2N,m2D)+"\\), since the product of the two slopes is \\(-1\\).");
  return mcq("What is the equation, in the form \\(y = mx + b\\), of the line through the point \\("+u5pt(x,y)+"\\) (coordinates given as \\((x, y)\\)) that is "+word+" to the line \\("+u5ybRaw(m1N,m1D,b1)+"\\)?",
    key,ds,
    slopeReason+" Then substitute the new slope and the given point to find the intercept: \\[ \\begin{aligned} "+y+" &= ("+u5fs(m2N,m2D)+")("+x+") + b \\\\ b &= "+b2+" \\end{aligned} \\] The equation is <b>"+key+"</b>.",
    {mode:mode,m1N:m1N,m1D:m1D,b1:b1,m2N:m2N,m2D:m2D,x:x,y:y,b2:b2,keyStr:key});
});

/* ================= 22. error in a slope calculation (4.18, 4.43, L3, num, CR 2) ================= */
E("u5-slope-error",5,["4.18","4.43"],3,"gen",function(){
  var pairs=[[3,1],[2,1],[1,2],[3,2],[5,2],[-2,1],[-3,2],[-1,2],[4,5],[3,4],[5,4],[-4,5],[-3,4],[2,5],[-2,5],[5,1],[-5,2]];
  var pr=pick(pairs),mN=pr[0],mD=pr[1];
  var t=pick([1,2,3]),x1=ri(-6,6),y1=ri(-6,10),x2=x1+mD*t,y2=y1+mN*t;
  var mode=ri(1,3),wrongStr,errorWord;
  if(mode===1){wrongStr=u5fs(mD,mN);errorWord="swapped the rise and the run, dividing the run by the rise";}
  else if(mode===2){wrongStr=u5fs(-mN,mD);errorWord="lost the sign, subtracting the coordinates in opposite orders in the top and bottom";}
  else{wrongStr=u5fs(-mD,mN);errorWord="found the slope of a perpendicular line, taking the negative reciprocal of the true slope";}
  var ans=mN/mD;
  return numq("A line passes through the points \\("+u5pt(x1,y1)+"\\) and \\("+u5pt(x2,y2)+"\\) (coordinates given as \\((x, y)\\)). A student calculates the slope of the line as \\("+wrongStr+"\\), which is not correct. What is the correct slope of the line? Give the slope as a decimal or a whole number.",
    ans,0.001,
    "The student "+errorWord+". The correct calculation subtracts in the same order in the top and the bottom: \\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+u5fs(mN,mD)+" \\end{aligned} \\] The correct slope is <b>\\("+u5fs(mN,mD)+"\\)</b>.",
    {mode:mode,x1:x1,y1:y1,x2:x2,y2:y2,mN:mN,mD:mD,ans:ans});
});

/* ================= 23. identify the form of an equation (4.39, L1, mcq) ================= */
E("u5-identify-form",5,["4.39"],1,"gen",function(){
  var mode=ri(1,3),eqStr,key;
  var forms=["General form","Slope-intercept form","Slope-point form","Vertex form"];
  var s=u5pickSlope(),mN=s[0],mD=s[1],b=ri(-9,9);
  var mN2=mN,mD2=mD,b2v=b,x1=0,y1=0;
  if(mode===1){eqStr=u5ybRaw(mN,mD,b);key="Slope-intercept form";}
  else if(mode===2){
    x1=mD*ri(-3,3);y1=ri(-8,10);
    eqStr=u5minusTerm("y",y1)+" = "+u5fs(mN,mD)+"("+u5minusTerm("x",x1)+")";
    if(u5red(mN,mD)[0]===1&&u5red(mN,mD)[1]===1)eqStr=u5minusTerm("y",y1)+" = ("+u5minusTerm("x",x1)+")";
    key="Slope-point form";
  }else{
    var g=u5genFromLine(mN,mD,b),sc=pick([1,2]);
    eqStr=u5genRaw(g[0]*sc,g[1]*sc,g[2]*sc);key="General form";
    var gv={A:g[0]*sc,B:g[1]*sc,C:g[2]*sc};var A2=gv.A,B2=gv.B,C2=gv.C;
    var dsF=u5pickS3(key,forms.filter(function(f){return f!==key;}));
    return mcq("In which form is the linear equation \\("+eqStr+"\\) written?",
      key,dsF,
      "The equation has every term on one side, set equal to \\(0\\), with \\(x\\) and \\(y\\) terms and a constant term, which is the shape of general form. The equation is in <b>general form</b>.",
      {mode:mode,mN:mN,mD:mD,b:b,A:A2,B:B2,C:C2,keyText:key});
  }
  var ds=u5pickS3(key,forms.filter(function(f){return f!==key;}));
  return mcq("In which form is the linear equation \\("+eqStr+"\\) written?",
    key,ds,
    (mode===1?
      "The equation is solved for \\(y\\), with the slope and the y-intercept visible on the right side, which is the shape of slope-intercept form. The equation is in <b>slope-intercept form</b>.":
      "The equation states a point \\("+u5pt(x1,y1)+"\\) on the line and the slope \\("+u5fs(mN,mD)+"\\), in the shape \\(y - y_1 = m(x - x_1)\\), which is slope-point form. The equation is in <b>slope-point form</b>."),
    {mode:mode,mN:mN2,mD:mD2,b:b2v,x1:x1,y1:y1,keyText:key});
});

/* ---- Prior knowledge tranche entries (Nov 15, 2026) ----
   Borrowed verbatim from the feeder banks named in each entry's
   pkSrc (see the metadata pass at the end of this file), under the
   Math 1201 PK tranche spec. */
E("u5-pk-express-rate", 5, ["4.19"], 1, "gen", function () {
  var tmpls = [
    { desc: "A bus travels {A} km in {B} h", u1: "km", u2: "h", w1: "kilometres", w2: "hour" },
    { desc: "A tap fills {A} L in {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "A worker earns ${A} in {B} h", u1: "$", u2: "h", w1: "dollars", w2: "hour" },
    { desc: "A printer prints {A} pages in {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "A car uses {A} L of fuel for {B} km driven", u1: "L", u2: "km", w1: "litres", w2: "kilometre" },
    { desc: "A ferry carries {A} passengers in {B} trips", u1: "passengers", u2: "trips", w1: "passengers", w2: "trip" },
    { desc: "A heart beats {A} times in {B} min", u1: "beats", u2: "min", w1: "beats", w2: "minute" },
    { desc: "Snow falls {A} cm in {B} h", u1: "cm", u2: "h", w1: "centimetres", w2: "hour" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "That reverses the rate; the amount measured goes first and the unit it is measured against goes second." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "That swaps the two units; each number must keep the unit it was measured in." },
    { t: A + " " + t.u1 + " in total", fb: "That gives only the amount; a rate must also say what the amount is measured against." },
    { t: A + ":" + B, fb: "That is ratio notation for two amounts of the same kind; a rate keeps both units written in." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate joins an amount to the unit it is measured against: \\[ \\begin{aligned} \\text{rate} &= " + A + " \\text{ " + t.w1 + " per } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Written with symbols, the rate is <b>" + corr + "</b>.";
  return mcq(desc + ". Which expression records this rate with symbols?", { t: corr, fb: "Correct: the measured amount and its unit come first, then the unit it is measured against." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["A rate compares two different units, and both units stay in the written rate.", "First write the measured amount with its unit, then a slash, then the second amount with its unit."]);
E("u5-pk-two-term-ratio", 5, ["4.19"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters" }, { a: "girls", b: "boys" }, { a: "wins", b: "losses" },
    { a: "apples", b: "oranges" }, { a: "dogs", b: "cats" }, { a: "cars", b: "trucks" },
    { a: "forwards", b: "defenders" }, { a: "novels", b: "magazines" }
  ];
  var cx = pick(ctxs), a = ri(2, 15), b = ri(2, 15), att = 0;
  while (m8u5gcd(a, b) !== 1 && att < 60) { a = ri(2, 15); b = ri(2, 15); att++; }
  if (m8u5gcd(a, b) !== 1) { a = 3; b = 5; }
  var corr = a + ":" + b;
  var cands = [
    { t: b + ":" + a, fb: "That reverses the order; the ratio is asked as " + cx.a + " to " + cx.b + "." },
    { t: a + ":" + (a + b), fb: "That compares the first group with the total; the question asks for the first group to the second group." },
    { t: b + ":" + (a + b), fb: "That compares the second group with the total, not the two groups with each other." },
    { t: (a + b) + ":" + b, fb: "That puts the total first; a two-term ratio here compares the two named groups only." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Match the counts in the order named: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + a + " : " + b + " \\end{aligned} \\] So the ratio of " + cx.a + " to " + cx.b + " is <b>" + corr + "</b>.";
  return mcq("A group has " + a + " " + cx.a + " and " + b + " " + cx.b + ". What is the ratio of " + cx.a + " to " + cx.b + "?", { t: corr, fb: "Correct: the counts are written in the order the groups are named." }, ds, sol, { mode: "two-term", a: a, b: b });
}, ["A ratio keeps the order of the groups exactly as they are named in the question.", "First write the count for the group named first, then the count for the group named second."]);
E("u5-pk-rate-problem", 5, ["4.27"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Find the unit rate first, then use it for the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars per hour} \\\\ \\text{new earnings} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] So the earnings are <b>$" + ans + "</b>.";
    return numq("Sam earned $" + earned + " for " + h1 + " h of work at a steady rate. At the same rate, how much will Sam earn for " + h2 + " h of work, in dollars?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "The speed is the unit rate, and time is distance divided by that rate: \\[ \\begin{aligned} \\text{time} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] So the trip takes <b>" + ansT + " h</b>.";
    return numq("A bus travels at a steady speed. It covers " + dist1 + " km in " + t1 + " h. At the same speed, how many hours will it take to travel " + D + " km?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Find the flow per minute first, then multiply by the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L per min} \\\\ \\text{new volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] So the volume is <b>" + ans3 + " L</b>.";
  return numq("A hose delivers " + vol + " L of water in " + m1 + " min at a steady rate. At the same rate, how many litres will it deliver in " + m2 + " min?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Every rate problem starts from the unit rate: the amount for one unit of the second quantity.", "First divide to get the amount per single hour, kilometre or minute in the problem."]);
E("u5-pk-word-two-step", 5, ["4.17"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(3, 9), n = ri(3, 14), b = ri(2, 12), c = a * n + b;
    var sol = "Let n be the number of tickets. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a) + "n+" + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "n &= " + fmt(c - b) + " \\\\ n &= " + fmt(n) + " \\end{aligned} \\] So the group bought <b>" + fmt(n) + " tickets</b>.";
    return numq("A group buys tickets that cost $" + fmt(a) + " each, plus a $" + fmt(b) + " booking fee paid once. The total cost is $" + fmt(c) + ". How many tickets did the group buy?", n, 0.01, sol, { mode: "word-tickets", a: a, b: b, c: c });
  }
  if (form === 1) {
    var L = ri(4, 15), w = ri(3, 14), P = 2 * w + 2 * L;
    var sol2 = "Let w be the width. The perimeter gives the equation and its solution: \\[ \\begin{aligned} 2w+" + fmt(2 * L) + " &= " + fmt(P) + " \\\\ 2w &= " + fmt(P - 2 * L) + " \\\\ w &= " + fmt(w) + " \\end{aligned} \\] So the width is <b>" + fmt(w) + " cm</b>.";
    return numq("A rectangle has length " + fmt(L) + " cm and perimeter " + fmt(P) + " cm. What is its width, in centimetres?", w, 0.01, sol2, { mode: "word-perimeter", a: L, b: P });
  }
  var a3 = ri(2, 8), n3 = ri(4, 16), b3 = ri(3, 15), c3 = a3 * n3 + b3;
  var sol3 = "Let n be the number of notebooks. The cost gives the equation and its solution: \\[ \\begin{aligned} " + fmt(a3) + "n+" + fmt(b3) + " &= " + fmt(c3) + " \\\\ " + fmt(a3) + "n &= " + fmt(c3 - b3) + " \\\\ n &= " + fmt(n3) + " \\end{aligned} \\] So Sara bought <b>" + fmt(n3) + " notebooks</b>.";
  return numq("Sara buys notebooks that cost $" + fmt(a3) + " each, plus one pen for $" + fmt(b3) + ". She spends $" + fmt(c3) + " in total. How many notebooks did she buy?", n3, 0.01, sol3, { mode: "word-notebooks", a: a3, b: b3, c: c3 });
}, ["Write an equation for the story first: a rate times the unknown, plus a fixed amount, equals the total.", "First decide what the variable counts, then build the equation from the story."]);
E("u5-pk-pattern-solve-n", 5, ["4.17"], 2, "gen", function () {
  var F = ri(4, 10), m = ri(2, 5), nT = ri(8, 20);
  var c2 = F + m, c3 = F + 2 * m, T = F + m * (nT - 1);
  var ctx = pick([
    { item: "matchsticks", prompt: "A pattern is built with matchsticks. Figure 1 uses " + F + " matchsticks, Figure 2 uses " + c2 + " matchsticks, and Figure 3 uses " + c3 + " matchsticks. The pattern continues in the same way. Which figure number uses exactly " + T + " matchsticks?" },
    { item: "tiles", prompt: "A pattern is built with tiles along a border. Figure 1 uses " + F + " tiles, Figure 2 uses " + c2 + " tiles, and Figure 3 uses " + c3 + " tiles. The pattern continues in the same way. Which figure number uses exactly " + T + " tiles?" },
    { item: "dots", prompt: "A dot pattern is growing. Figure 1 has " + F + " dots, Figure 2 has " + c2 + " dots, and Figure 3 has " + c3 + " dots. The pattern continues in the same way. Which figure number has exactly " + T + " dots?" }
  ]);
  var sol = "Each new figure adds " + fmt(m) + ", and Figure 1 uses " + F + ". Let \\(n\\) be the figure number: \\[ \\begin{aligned} " + F + " + " + fmt(m) + "(n - 1) &= " + T + " \\\\ " + fmt(m) + "(n - 1) &= " + T + " - " + F + " = " + fmt(T - F) + " \\\\ n - 1 &= " + fmt((T - F) / m) + " \\\\ n &= " + fmt(nT) + " \\end{aligned} \\] So the figure that uses exactly " + T + " is <b>Figure " + fmt(nT) + "</b>.";
  return numq(ctx.prompt, nT, 0.01, sol, { mode: "pattern-solve-n", F: F, m: m, nT: nT, item: ctx.item });
}, ["Write an equation first: the first figure's count plus the step times the number of added figures.", "The step is the difference between the counts of two neighbouring figures."]);
E("u5-pk-which-is-solution", 5, ["4.17"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + u5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);
E("u5-pk-graph-equation", 5, ["4.33"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  var ctx = pick(ctxs);
  var b = ri(1, 8), m = ri(1, 4), att = 0;
  while (b === m && att < 40) { b = ri(1, 8); m = ri(1, 4); att++; }
  if (b === m) { b = 5; m = 2; }
  var xmax = pick([4, 5, 6]), ymax = b + m * xmax;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var corr = "\\(y = " + u6lin(m, b, "x") + "\\)";
  var sol = "Read the start from the y-intercept and the step from two points on the line: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + 2 * m) + " - " + fmt(b + m) + " = " + fmt(m) + " \\end{aligned} \\] So the equation of the line is <b>" + corr + "</b>.";
  var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which equation matches the graphed line?",
    { t: corr, fb: "Correct. The line starts at " + fmt(b) + " and rises by " + fmt(m) + " for each step in x." },
    [
      { t: "\\(y = " + u6lin(b, m, "x") + "\\)", fb: "That swaps the start value and the step. The y-intercept is " + fmt(b) + "." },
      { t: "\\(y = " + u6lin(m, -b, "x") + "\\)", fb: "That subtracts the start value. The line crosses the y-axis above zero, at " + fmt(b) + "." },
      { t: "\\(x = " + u6lin(m, b, "y") + "\\)", fb: "That exchanges the roles of x and y. On this graph, y depends on x." }
    ], sol, { mode: "graph-equation", b: b, m: m, ctx: ctx.x, xmax: xmax });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Start with the y-intercept: it is the constant in the equation.", "Then find the step: how much y changes when x grows by 1."]);
E("u5-pk-construct-graph", 5, ["4.35"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var m = ri(2, 6), b = ri(1, 8);
    if (m === b) continue;
    var win = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4], [2, 3, 4, 5]]);
    function setStr(mm, bb) { var p = []; for (var k = 0; k < win.length; k++) p.push("(" + win[k] + ", " + fmt(mm * win[k] + bb) + ")"); return p.join(", "); }
    var corr = setStr(m, b);
    var ds = u6pick3(corr, [
      { t: setStr(b, m), fb: "That set comes from swapping the step and the start. Check the point where x = 0: its y value should be " + fmt(b) + "." },
      { t: setStr(m, -b), fb: "That set subtracts the start value. At x = 0 the equation gives y = " + fmt(b) + ", a positive value." },
      { t: setStr(m + 1, b), fb: "That set uses a step of " + fmt(m + 1) + ". The equation's step is the number multiplying x, which is " + fmt(m) + "." },
      { t: setStr(m, b + m), fb: "That set starts one step too high. At x = 0 the y value is the start, " + fmt(b) + ", not " + fmt(b + m) + "." }
    ]);
    if (!ds) continue;
    var lines = win.map(function (xv) { return "x=" + xv + "&:\\ y = " + fmt(m * xv + b); }).join(" \\\\ ");
    var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\): \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Plotting those values gives the point set <b>" + corr + "</b>.";
    return mcq("A graph of the relation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\) is constructed by plotting points for \\(x = " + win.join(", ") + "\\). Which set of points is plotted?",
      { t: corr, fb: "Correct. Each point comes from substituting its x value into the equation." }, ds, sol,
      { mode: "construct-graph-points", m: m, b: b });
  }
  return mcq("A graph of the relation \\(y = 2x + 3\\) is constructed by plotting points for \\(x = 0, 1, 2, 3\\). Which set of points is plotted?",
    { t: "(0, 3), (1, 5), (2, 7), (3, 9)", fb: "Correct. Each point comes from substituting its x value into the equation." },
    [{ t: "(0, 2), (1, 5), (2, 8), (3, 11)", fb: "That set swaps the step and the start." }, { t: "(0, -3), (1, -1), (2, 1), (3, 3)", fb: "That set subtracts the start value." }, { t: "(0, 3), (1, 6), (2, 9), (3, 12)", fb: "That set uses a step of 3 instead of 2." }],
    "Substitute each x value: \\[ \\begin{aligned} x=0&:\\ y = 3 \\\\ x=1&:\\ y = 5 \\\\ x=2&:\\ y = 7 \\\\ x=3&:\\ y = 9 \\end{aligned} \\] The plotted set is <b>(0, 3), (1, 5), (2, 7), (3, 9)</b>.", { mode: "construct-graph-points-fallback" });
}, ["Build the points one at a time by substituting x = 0, 1, 2, 3 into the equation.", "The point at x = 0 always has y equal to the start value in the equation."]);

/* PK tranche metadata pass for Unit 5. The tranche's own entries are flagged here.  */
var PKT_U5_FOR=["4.17","4.18","4.19","4.20","4.22","4.23","4.24","4.25","4.26","4.27","4.28","4.29","4.30","4.31","4.32","4.33","4.34","4.35","4.36","4.37","4.38","4.39","4.40","4.41","4.42","4.43","4.44"];
var PKT_U5={
 "u5-pk-express-rate":{src:"math-8:3.16",group:"rate"},
 "u5-pk-two-term-ratio":{src:"math-8:3.8",group:"rate"},
 "u5-pk-rate-problem":{src:"math-8:6.29",group:"rate"},
 "u5-pk-word-two-step":{src:"math-9:8.22",group:"linear-equations"},
 "u5-pk-pattern-solve-n":{src:"math-9:8.23",group:"linear-equations"},
 "u5-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"},
 "u5-pk-graph-equation":{src:"math-9:7.6",group:"graph-forms"},
 "u5-pk-construct-graph":{src:"math-8:7.4",group:"graph-forms"}
};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});
