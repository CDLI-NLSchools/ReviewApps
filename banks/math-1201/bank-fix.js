// Math 1201 unit test pool fix additions (November 9, 2026)
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 4642 to 4889).
// CRMARKS: u2-square-diagonal=3
// CRMARKS: u2-entire-radical-cr=3
// CRMARKS: u2-prime-factor-cr=2
// CRMARKS: u4-function-repair=3
// CRMARKS: u4-table-extend-cr=3
// CRMARKS: u4-graph-read-cr=2
// CRMARKS: u4-pair-intercept-cr=2
// CRMARKS: u5-point-from-slope-cr=3
// CRMARKS: u5-slope-from-form-cr=2
// CRMARKS: u5-line-point-cr=2
/* Unit test pool fix additions, November 9, 2026 (additions only).
   Unit 1: three Level 2 multiple choice generators (the unit's Level 2
   entries were all numeric, so Section A had no Level 2 pool).
   Unit 2: one Level 3 CR (3), Level 2 CR at 3 and 2 marks.
   Unit 4: one Level 3 CR (3), Level 2 CR at 3, 2 and 2 marks.
   Unit 5: Level 2 CR at 3, 2 and 2 marks. */

/* U1a. Conversion problem, multiple choice (6.2, L2) */
E("u1-convert-choice",1,["6.2"],2,"gen",function(){
  var modes=[
    {from:"inches",to:"centimetres",f:2.54,how:"multiply",note:"1 inch = 2.54 centimetres",vmin:2,vmax:30,dec:true},
    {from:"centimetres",to:"inches",f:2.54,how:"divide",note:"1 inch = 2.54 centimetres",vmin:10,vmax:90,dec:false},
    {from:"miles",to:"kilometres",f:1.6,how:"multiply",note:"1 mile = 1.6 kilometres",vmin:3,vmax:60,dec:false},
    {from:"kilometres",to:"miles",f:1.6,how:"divide",note:"1 mile = 1.6 kilometres",vmin:8,vmax:96,dec:false},
    {from:"feet",to:"metres",f:0.3048,how:"multiply",note:"1 foot = 0.3048 metres",vmin:5,vmax:80,dec:false},
    {from:"yards",to:"metres",f:0.9144,how:"multiply",note:"1 yard = 0.9144 metres",vmin:4,vmax:60,dec:false}
  ];
  var m=pick(modes),v,ans,tries=0,ds;
  do{
    tries++;
    v=m.dec?ri(m.vmin,m.vmax)+pick([0,0.5]):ri(m.vmin,m.vmax);
    ans=m.how==="multiply"?u1r2(v*m.f):u1r2(v/m.f);
    var wrongOp=m.how==="multiply"?u1r2(v/m.f):u1r2(v*m.f);
    var off10=m.how==="multiply"?u1r2(v*m.f*10):u1r2(v/m.f/10);
    var near=m.how==="multiply"?u1r2(v*(m.f+ (m.f>1?0.46:0.0452))):u1r2(v/(m.f-0.3));
    ds=[fmt(wrongOp),fmt(off10),fmt(near)];
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var op=m.how==="multiply"?"Multiply":"Divide";
  var sol=op+" by the conversion factor, since "+m.note+": \\[ "+fmt(v)+" "+(m.how==="multiply"?"\\times":"\\div")+" "+fmt(m.f)+" = "+fmt(ans)+" \\] The measure is <b>"+fmt(ans)+" "+m.to+"</b>.";
  return mcq("Convert "+fmt(v)+" "+m.from+" to "+m.to+". Use "+m.note+". Give the measure in "+m.to+".",fmt(ans),balDp(fmt(ans),ds),sol,{mode:m.from+"-"+m.to,v:v});
});

/* U1b. Surface area from stated dimensions, multiple choice (5.2, L2).
   Figures (Nov 2026): this entry and u1-vol-choice below carry inline
   SVG diagrams drawn from their drawn dimensions (helpers in
   bank-helpers.js). u1-convert-choice stays figureless. */
E("u1-sa-choice",1,["5.2"],2,"gen",function(){
  var mode=ri(1,2),ans,tries=0,ds,prompt,sol;
  do{
    tries++;
    if(mode===1){
      var l=ri(3,14),w=ri(2,10),h=ri(2,9);
      ans=2*(l*w+l*h+w*h);
      ds=[fmt(l*w*h),fmt(2*(l*h+w*h)),fmt(l*w+l*h+w*h)];
      prompt="A closed rectangular box is "+l+" cm long, "+w+" cm wide and "+h+" cm high. What is the surface area of the box, in square centimetres?";
      sol="The box has three pairs of matching faces: \\[ 2(lw + lh + wh) = 2("+l+" \\times "+w+" + "+l+" \\times "+h+" + "+w+" \\times "+h+") = 2("+ (l*w+l*h+w*h) +") = "+ans+" \\] The surface area is <b>"+ans+" square centimetres</b>.";
    }else{
      var r=pick([2,3,4,5,6,7,8]),hh=ri(4,15);
      ans=u1r2(2*3.14*r*(r+hh));
      ds=[fmt(u1r2(3.14*r*r*hh)),fmt(u1r2(2*3.14*r*hh)),fmt(u1r2(3.14*r*(r+hh)))];
      prompt="A closed cylinder has radius "+r+" cm and height "+hh+" cm. What is the surface area of the cylinder, in square centimetres? Use \\(\\pi = 3.14\\).";
      sol="The surface area is the two circular ends plus the curved side: \\[ 2\\pi r^2 + 2\\pi r h = 2(3.14)("+r+")("+r+" + "+hh+") = "+fmt(ans)+" \\] The surface area is <b>"+fmt(ans)+" square centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,ans:ans});
  if(mode===1)q.figure=u1figPrism(l,w,h,fmt(l)+" cm",fmt(w)+" cm",fmt(h)+" cm");
  else q.figure=u1figCyl(r,hh,fmt(r)+" cm",fmt(hh)+" cm");
  return q;
});

/* U1c. Volume from stated dimensions, multiple choice (5.4, L2) */
E("u1-vol-choice",1,["5.4"],2,"gen",function(){
  var mode=ri(1,3),ans,tries=0,ds,prompt,sol;
  do{
    tries++;
    if(mode===1){
      var r=pick([2,3,4,5,6,7,8,9,10]),h=ri(3,16);
      ans=u1r2(3.14*r*r*h);
      ds=[fmt(u1r2(3.14*r*r*h/3)),fmt(u1r2(3.14*2*r*2*r*h)),fmt(u1r2(2*3.14*r*h))];
      prompt="A cylinder has radius "+r+" cm and height "+h+" cm. What is the volume of the cylinder, in cubic centimetres? Use \\(\\pi = 3.14\\).";
      sol="For a cylinder, \\(V = A_b \\times h\\) where \\(A_b\\) is the area of the circular base: \\[ V = 3.14 \\times "+r+"^2 \\times "+h+" = "+fmt(ans)+" \\] The volume is <b>"+fmt(ans)+" cubic centimetres</b>.";
    }else if(mode===2){
      var r2=pick([3,4,5,6,7,8,9]),h2=pick([6,9,12,15]);
      ans=u1r2(3.14*r2*r2*h2/3);
      ds=[fmt(u1r2(3.14*r2*r2*h2)),fmt(u1r2(3.14*r2*r2*h2/2)),fmt(u1r2(3.14*2*r2*h2))];
      prompt="A cone has radius "+r2+" cm and height "+h2+" cm. What is the volume of the cone, in cubic centimetres? Use \\(\\pi = 3.14\\).";
      sol="A cone is a pointed solid, so \\(V = \\frac{1}{3} A_b \\times h\\): \\[ V = \\frac{1}{3} \\times 3.14 \\times "+r2+"^2 \\times "+h2+" = "+fmt(ans)+" \\] The volume is <b>"+fmt(ans)+" cubic centimetres</b>.";
    }else{
      var s=ri(3,12),h3=pick([3,6,9,12]);
      ans=s*s*h3/3;
      ds=[fmt(s*s*h3),fmt(s*s*h3/2),fmt(2*s*s+4*s*h3)];
      prompt="A square-based pyramid has base side "+s+" cm and height "+h3+" cm. What is the volume of the pyramid, in cubic centimetres?";
      sol="A pyramid is a pointed solid, so \\(V = \\frac{1}{3} A_b \\times h\\) with \\(A_b = "+s+"^2\\): \\[ V = \\frac{1}{3} \\times "+(s*s)+" \\times "+h3+" = "+ans+" \\] The volume is <b>"+ans+" cubic centimetres</b>.";
    }
  }while(!u1setOk([fmt(ans)].concat(ds))&&tries<90);
  var q=mcq(prompt,fmt(ans),balDp(fmt(ans),ds),sol,{mode:mode,ans:ans});
  if(mode===1)q.figure=u1figCyl(r,h,fmt(r)+" cm",fmt(h)+" cm");
  else if(mode===2)q.figure=u1figCone(r2,h2,{rLab:fmt(r2)+" cm",hLab:fmt(h2)+" cm"});
  else q.figure=u1figPyr(s,h3,{sLab:fmt(s)+" cm",hLab:fmt(h3)+" cm"});
  return q;
});

/* U2a. Squares and cubes in context, path not named (1.9, 1.20, L3, CR 3) */
E("u2-square-diagonal",2,["1.9","1.20"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var d=2*ri(3,15),ans=d*d/2;
    return numq("A square window has a diagonal of \\("+d+"\\) cm. What is the area of the window, in square centimetres?",
      ans,0.01,
      "The diagonal splits the square into two right triangles, and the area of a square can be built from its diagonal: the two triangles each have area \\(\\frac{d \\times d}{2} \\div 2\\), so together \\[ A = \\frac{d^2}{2} = \\frac{"+d+"^2}{2} = \\frac{"+(d*d)+"}{2} = "+ans+" \\] The area is <b>\\("+ans+"\\) square centimetres</b>.",
      {mode:mode,d:d,ans:ans});
  }
  if(mode===2){
    var A=pick([30,32,38,40,42,45,48,50,52,55,58,60,62,65,68,70,72,75,78,80,82,85,88,90,92,95,98]);
    var side=Math.sqrt(A),per=Math.round(4*side*10)/10;
    return numq("A square garden plot has an area of \\("+A+"\\) square metres. What is the perimeter of the plot, to the nearest tenth of a metre?",
      per,0.02,
      "Substitute the area into the area formula for a square and solve for the side: \\[ s = \\sqrt{"+A+"} \\approx "+(Math.round(side*100)/100)+" \\] The perimeter is four side lengths: \\[ P = 4 \\times "+(Math.round(side*100)/100)+" \\approx "+per+" \\] The perimeter is about <b>\\("+per+"\\) m</b>.",
      {mode:mode,A:A,ans:per});
  }
  var V=pick([50,60,70,80,90,100,110,120,130,140,150,160,175,190,200]);
  var edge=Math.cbrt(V),ans3=Math.round(edge*10)/10;
  return numq("A cube-shaped tank holds \\("+V+"\\) cubic centimetres of water when full. What is the edge length of the tank, to the nearest tenth of a centimetre?",
    ans3,0.02,
    "Substitute the volume into the volume formula for a cube and solve: \\[ s = \\sqrt[3]{"+V+"} \\approx "+(Math.round(edge*100)/100)+" \\] The edge length is about <b>\\("+ans3+"\\) cm</b>.",
    {mode:mode,V:V,ans:ans3});
});

/* U2b. Express a mixed radical as an entire radical (1.17, L2, CR 3) */
E("u2-entire-radical-cr",2,["1.17"],2,"gen",function(){
  var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15]);
  var ans=a*a*b;
  return numq("Express \\("+a+"\\sqrt{"+b+"}\\) as an entire radical \\(\\sqrt{n}\\). What is the value of \\(n\\)?",
    ans,0.001,
    "The coefficient enters the radicand as a square: \\[ "+a+"\\sqrt{"+b+"} = \\sqrt{"+a+"^2 \\times "+b+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = \\sqrt{"+ans+"} \\] So \\(n\\) is <b>"+ans+"</b>.",
    {a:a,b:b,ans:ans});
});

/* U2c. Largest prime factor (1.12, L2, CR 2) */
E("u2-prime-factor-cr",2,["1.12"],2,"gen",function(){
  function factorStr(n){
    var out=[],d=2,m=n;
    while(d*d<=m){while(m%d===0){out.push(d);m/=d;}d++;}
    if(m>1)out.push(m);
    return out;
  }
  var P=pick([17,19,23,29,31]),mult=pick([6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28]);
  var N=P*mult,facs=factorStr(N);
  return numq("What is the largest prime factor of \\("+N+"\\)?",
    P,0.001,
    "Divide \\("+N+"\\) by prime numbers in turn until the quotient is prime: \\[ "+N+" = "+facs.join(" \\times ")+" \\] The prime factors are "+facs.join(", ")+", so the largest is <b>\\("+P+"\\)</b>.",
    {N:N,ans:P});
});

/* U4a. Repair a wrong claim about functions (4.6, 4.8, L3, CR 3) */
E("u4-function-repair",4,["4.6","4.8"],3,"var",varset([
  function(){var key="The claim is wrong: an output may repeat; the relation is a function because each input has exactly one output";
    return mcq("A student says the relation \\(\\{(2, 4), (3, 4), (5, 6)\\}\\) is not a function, because the output 4 appears twice. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: an input may repeat; the relation is a function because each output has exactly one input",
     "The claim is right: an output may never repeat; the relation is not a function because the output 4 appears twice",
     "The claim is wrong: the relation is not a function either way, because the input 2 has the output 4 instead of 2"],
    "A relation is a function when each input has exactly one output. Here the inputs 2, 3 and 5 each appear once, so each has exactly one output; outputs are allowed to repeat. The error is <b>applying the one-output rule to the outputs instead of the inputs</b>, and the relation <b>is a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: the repeated input 1 has two different outputs, so the relation is not a function";
    return mcq("A student says the relation \\(\\{(1, 3), (1, 5), (2, 7)\\}\\) is a function, because every number in the set is used only a few times. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: the repeated output 3 has two different inputs, so the relation is not a function",
     "The claim is right: the repeated input 1 has two different outputs, so the relation is a function",
     "The claim is wrong: the relation is a function, but only because the outputs 3, 5 and 7 are all different numbers"],
    "Check the inputs: the input 1 appears twice, paired with 3 and with 5. One input with two different outputs breaks the definition, no matter how the other pairs look. The error is <b>not checking whether an input repeats with a different output</b>, and the relation <b>is not a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: a graph that fails the vertical line test is not a function, whatever its shape";
    return mcq("A student graphs a circle and says it is a function because the graph is smooth and unbroken. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: a graph that passes the vertical line test is not a function, whatever its shape",
     "The claim is right: any smooth, unbroken graph is a function, so the circle is a function",
     "The claim is wrong: the circle is a function, because every input on it has at most one output"],
    "The test is the vertical line test, not smoothness: a vertical line crosses a circle at two points, which means one input has two outputs. The error is <b>judging by the look of the graph instead of the vertical line test</b>, and the circle <b>is not a function</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The claim is wrong: swapping domain and range changes the question; inputs 1, 2, 3 each have one output, so it is a function";
    return mcq("A student is given the table with inputs 1, 2, 3 and outputs 6, 6, 9, and says it is not a function because the output 6 comes from two inputs. Which statement identifies the error and gives the correct conclusion?",
    key,
    ["The claim is wrong: swapping domain and range changes the question; outputs 6 and 9 each have one input, so it is a function",
     "The claim is right: an output with two inputs breaks the rule, so the table is not a function",
     "The claim is wrong: the table is a function only if the outputs increase, and here they do not always increase"],
    "The rule concerns inputs: each input may have only one output, but two inputs may share an output. Inputs 1, 2 and 3 each have exactly one output here. The error is <b>testing the outputs against the rule that belongs to the inputs</b>, and the table <b>does represent a function</b>.",
    {stmt:true,keyText:key});}
]));

/* U4b. Extend a linear table (4.13, L2, CR 3) */
E("u4-table-extend-cr",4,["4.13"],2,"gen",function(){
  var m=pick([2,3,4,5,-2,-3,1.5,2.5]),b=ri(-6,9),x0=ri(0,3),dx=pick([1,2]);
  var xs=[x0,x0+dx,x0+2*dx,x0+3*dx];
  var target=xs[3]+dx*ri(3,5);
  function y(x){return m*x+b;}
  var ans=y(target);
  var pairs=xs.map(function(x){return "("+x+", "+fmt(y(x))+")";}).join(", ");
  return numq("The ordered pairs "+pairs+" belong to a linear relation. What is the y-value when x = "+target+"?",
    ans,0.01,
    "The first differences are constant: each step of "+dx+" in x changes y by "+fmt(m*dx)+", so the rate of change is "+fmt(m)+" and the relation is linear. From the last given pair, x grows by "+(target-xs[3])+", which is "+((target-xs[3])/dx)+" steps, adding "+fmt(m*(target-xs[3]))+" to y: \\[ y = "+fmt(y(xs[3]))+" + "+fmt(m*(target-xs[3]))+" = "+fmt(ans)+" \\] The y-value is <b>"+fmt(ans)+"</b>.",
    {m:m,b:b,target:target,ans:ans});
});

/* U4c. Rate of change from a described graph (4.31, L2, CR 2) */
E("u4-graph-read-cr",4,["4.31"],2,"gen",function(){
  var b=ri(-5,8),m=pick([2,3,4,-2,-3,0.5,1.5,-1.5,2.5]),x2=pick([2,4,5]);
  var y2=m*x2+b;
  return numq("A graph of a linear relation passes through the points (0, "+b+") and ("+x2+", "+fmt(y2)+"). What is the rate of change of the relation?",
    m,0.01,
    "The rate of change is the change in y divided by the change in x between the two points: \\[ \\frac{"+fmt(y2)+" - ("+b+")}{"+x2+" - 0} = \\frac{"+fmt(y2-b)+"}{"+x2+"} = "+fmt(m)+" \\] The rate of change is <b>"+fmt(m)+"</b>.",
    {b:b,m:m,ans:m});
});

/* U4d. Vertical intercept from a set of pairs (4.16, L2, CR 2) */
E("u4-pair-intercept-cr",4,["4.16"],2,"gen",function(){
  var m=pick([2,3,-2,4,-3,1]),b=ri(-7,9);
  var xs=[1,2,3,4].map(function(k){return k+pick([0,1]);});
  xs=Array.from(new Set(xs)).slice(0,4);
  while(xs.length<4)xs.push(xs[xs.length-1]+1);
  var pairs=xs.map(function(x){return "("+x+", "+(m*x+b)+")";}).join(", ");
  return numq("A linear relation contains the points "+pairs+". What is the vertical intercept of the relation?",
    b,0.01,
    "Consecutive points change y by "+m+" for each step of 1 in x, so the rate of change is "+m+". Work back from the first point ("+xs[0]+", "+(m*xs[0]+b)+") to x = 0, subtracting "+m+" a total of "+xs[0]+" times: \\[ "+(m*xs[0]+b)+" - "+xs[0]+" \\times "+m+" = "+b+" \\] The vertical intercept is <b>"+b+"</b>.",
    {m:m,b:b,ans:b});
});

/* U5a. Another point from slope and a point (4.25, L2, CR 3) */
E("u5-point-from-slope-cr",5,["4.25"],2,"gen",function(){
  var fracs=[[3,4],[2,3],[4,5],[5,3],[3,2],[5,4],[2,5],[4,3]];
  var f=pick(fracs),p=f[0]*pick([1,1,-1]),q=f[1],k=pick([1,2]);
  var x1=ri(0,9),y1=ri(1,15),x2=x1+k*q,y2=y1+k*p;
  return numq("A line has slope \\("+FR(p,q)+"\\) and passes through the point ("+x1+", "+y1+"). Another point on the line has x-coordinate "+x2+". What is its y-coordinate?",
    y2,0.01,
    "The slope \\("+FR(p,q)+"\\) means y changes by "+p+" for every run of "+q+" in x. From x = "+x1+" to x = "+x2+" the run is "+(x2-x1)+", which is "+k+" slope steps, so y changes by "+k+" \\times "+p+" = "+(k*p)+": \\[ y = "+y1+" + "+(k*p)+" = "+y2+" \\] The y-coordinate is <b>"+y2+"</b>.",
    {p:p,q:q,x2:x2,ans:y2});
});

/* U5b. Slope or intercept from general form (4.38, L2, CR 2) */
E("u5-slope-from-form-cr",5,["4.38"],2,"gen",function(){
  var mode=ri(1,2),B=pick([2,3,4,5]),m=pick([2,3,-2,-3,4,-4,1,-1]),b0=ri(-6,8);
  var A=-m*B,C=B*b0;
  function sgn(v,first){if(v<0)return " - "+fmt(-v);return first?fmt(v):" + "+fmt(v);}
  var eq=sgn(A,true)+"x + "+fmt(B)+"y = "+fmt(C);
  var solved=fmt(B)+"y = "+sgn(-A,true)+"x"+(C<0?" - "+fmt(-C):" + "+fmt(C));
  var finalForm="y = "+fmt(m)+"x"+(b0<0?" - "+fmt(-b0):" + "+fmt(b0));
  if(mode===1){
    return numq("The linear relation "+eq+" is rewritten in slope-intercept form. What is the slope of the relation?",
      m,0.01,
      "Solve for y: \\[ "+solved+" \\quad\\Rightarrow\\quad "+finalForm+" \\] The slope is <b>"+fmt(m)+"</b>.",
      {mode:mode,ans:m});
  }
  return numq("The linear relation "+eq+" is rewritten in slope-intercept form. What is the y-intercept of the relation?",
    b0,0.01,
    "Solve for y: \\[ "+solved+" \\quad\\Rightarrow\\quad "+finalForm+" \\] The y-intercept is <b>"+fmt(b0)+"</b>.",
    {mode:mode,ans:b0});
});

/* U5c. A point on a line from slope and a point (4.24, L2, CR 2) */
E("u5-line-point-cr",5,["4.24"],2,"gen",function(){
  var m=pick([2,3,4,-2,-3,-4,5,-5]),x1=ri(1,8),y1=ri(2,16),dx=pick([2,3,4,-2,-3]);
  var x2=x1+dx,ans=y1+m*dx;
  return numq("A line has slope "+m+" and passes through the point ("+x1+", "+y1+"). What is the y-value of the line at x = "+x2+"?",
    ans,0.01,
    "From x = "+x1+" to x = "+x2+" the run is "+dx+", so y changes by "+m+" \\times "+dx+" = "+(m*dx)+": \\[ y = "+y1+" + "+(m*dx)+" = "+ans+" \\] The y-value is <b>"+ans+"</b>.",
    {m:m,x2:x2,ans:ans});
});
