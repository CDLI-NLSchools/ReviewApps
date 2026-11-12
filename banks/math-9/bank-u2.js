// Math 9 Unit 2 Square Roots and Surface Area question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 324 to 673).
// CRMARKS: u2-sa-single=3
// CRMARKS: u2-sa-tri-context=3
// CRMARKS: u2-overlap=2
// CRMARKS: u2-overlap-hidden=2
// CRMARKS: u2-sa-composite-rect=3
// CRMARKS: u2-sa-problem=2
// CRMARKS: u2-sa-cyl-on-prism=3
// CRMARKS: u2-best-estimate-side=2
/* Unit 2: Square Roots and Surface Area */
function u2gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
function u2r1(x){return Math.round(x*10)/10;}
function u2r2(x){return Math.round(x*100)/100;}
function u2d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u2nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<60){n=ri(lo,hi);t++;}return n;}

E("u2-sqrt-perfect", 2, ["6.9"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,20); var n=r*r;
    var ds=u2d3(r,[r+1,r-1,r+2,r*2,r+3]);
    var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+fmt(d*d)+", not "+n+": try another value."};});
    return mcq("What is \\(\\sqrt{"+n+"}\\)?", {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "\\("+r+" \\times "+r+" = "+n+"\\), so \\(\\sqrt{"+n+"} = "+r+"\\). The square root is <b>"+r+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(3,25); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd+1),u2r1(rd*2),u2r1(rd+0.2)]);
    var dopts=dc.map(function(d){return {t:fmt(d), fb:fmt(d)+" squared is "+fmt(u2r2(d*d))+", not "+fmt(nd)+"."};});
    return mcq("What is \\(\\sqrt{"+fmt(nd)+"}\\)?", {t:fmt(rd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
      "\\("+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+"\\), so \\(\\sqrt{"+fmt(nd)+"} = "+fmt(rd)+"\\). The square root is <b>"+fmt(rd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p+1,q)+"\\)", fb:"Squaring it gives the wrong numerator: check both parts."},
             {t:"\\("+FR(p,q+1)+"\\)", fb:"Squaring it gives the wrong denominator: check both parts."},
             {t:"\\("+FR(p-1,q)+"\\)", fb:"Squaring it gives a smaller numerator than the one shown."}];
  return mcq("What is \\(\\sqrt{"+FR(p*p,q*q)+"}\\)?", {t:"\\("+FR(p,q)+"\\)", fb:"Yes: both parts square to the parts shown."}, fopts,
    "The numerator "+(p*p)+" is "+p+" squared, and the denominator "+(q*q)+" is "+q+" squared. \\[ \\sqrt{"+FR(p*p,q*q)+"} = "+FR(p,q)+" \\] The square root is <b>\\("+FR(p,q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Work through small squares in order until one of them lands exactly on the number shown."]);

E("u2-square-from-root", 2, ["6.11"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,30); var n=r*r;
    var ds=u2d3(n,[2*r,n+1,n-1,n+r,n+10,3*r]);
    var opts=ds.map(function(d){return {t:String(d), fb:"That value does not come from squaring "+r+": try "+r+" times "+r+"."};});
    return mcq("A positive number has square root "+r+". What is the number?", {t:String(n), fb:"Yes: squaring the root gives back the number."}, opts,
      "Squaring undoes a square root: \\[ "+r+"^{2} = "+r+" \\times "+r+" = "+n+" \\] The number is <b>"+n+"</b>.",
      {mode:"whole", r:r});
  }
  if(mode==="decimal"){
    var k=ri(2,30); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(nd,[u2r2(2*rd),u2r2((rd+1)*(rd+1)),u2r2(nd+1),u2r2(nd+0.1),u2r2(nd+2)]);
    var dopts=fmtPairDs(fmt(nd), dc.map(function(d){return {v:d, fb:"That is not "+fmt(rd)+" times "+fmt(rd)+": square the root itself."};}));
    return mcq("A positive number has square root "+fmt(rd)+". What is the number?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" squared equals "+fmt(nd)+"."}, dopts,
      "Squaring undoes a square root: \\[ "+fmt(rd)+"^{2} = "+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+" \\] The number is <b>"+fmt(nd)+"</b>.",
      {mode:"decimal", r:rd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p,q)+"\\)", fb:"Only the top was squared: the bottom must be squared too."},
             {t:"\\("+FR(p,q*q)+"\\)", fb:"Only the bottom was squared: the top must be squared too."},
             {t:"\\("+FR(p*p,q*q+q)+"\\)", fb:"Square the bottom part itself: do not add it to itself."}];
  return mcq("A positive number has square root \\("+FR(p,q)+"\\) . What is the number?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Yes: square the top and the bottom separately."}, fopts,
    "Square the top and the bottom: \\[ \\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+" \\] The number is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Squaring and square roots undo each other, so square the given root.", "Multiply the root by itself, squaring the top and bottom separately for a fraction."]);

E("u2-identify-square", 2, ["3.3"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(4,25); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" sits between two neighbouring squares, so nothing squares to it."};});
    return mcq("Which number is a perfect square?", {t:String(n), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "Only one value is a number times itself: \\("+r+" \\times "+r+" = "+n+"\\). The perfect square is <b>"+n+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(4,24); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var pool=[0.12,0.15,0.18,0.21,0.27,0.32,0.35,0.45,0.48,0.54,0.6,0.72,0.75,0.8,0.9,1.1,1.2,1.5,1.8,2.2,2.5,2.8,3.5];
    var sh=shuffle(pool); var ds=[]; var i=0;
    while(ds.length<3&&i<sh.length){if(sh[i]!==nd){ds.push(sh[i]);} i++;}
    var opts=fmtPairDs(fmt(nd), ds.map(function(d){return {v:d, fb:"No number times itself gives "+fmt(d)+": test the nearby tenths."};}));
    return mcq("Which number is a perfect square?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, opts,
      "Only one value is a number times itself: \\("+fmt(rd)+" \\times "+fmt(rd)+" = "+fmt(nd)+"\\). The perfect square is <b>"+fmt(nd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p+1,q*q)+"\\)", fb:"The top part is not a square number, so the fraction is not one."},
             {t:"\\("+FR(p*p,q*q+1)+"\\)", fb:"The bottom part is not a square number, so the fraction is not one."},
             {t:"\\("+FR(p*p+2,q*q)+"\\)", fb:"The top part sits between two squares, so it is not a square."}];
  return mcq("Which number is a perfect square?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Yes: the top and bottom are both perfect squares."}, fopts,
    "A fraction is a perfect square when its top and bottom are both perfect squares: \\(\\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+"\\). The perfect square is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["A perfect square is a number multiplied by itself, in whole, decimal or fraction form.", "For each value, ask whether some number times itself gives exactly that value."]);

E("u2-estimate-between", 2, ["6.5"], 1, "gen", function(){
  var n=u2nonSquare(10,400); var k=Math.floor(Math.sqrt(n));
  if(pick(["between","closest"])==="between"){
    var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
    var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
    return mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
      "\\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\), and "+n+" lies between them. So \\(\\sqrt{"+n+"}\\) is between <b>"+k+" and "+(k+1)+"</b>.",
      {mode:"between", n:n});
  }
  var c=((n-k*k)<((k+1)*(k+1)-n))?k:k+1;
  var ds=u2d3(c,[c+1,c-1,c+2,c-2]);
  var opts2=ds.map(function(d){return {t:String(d), fb:"Square it: "+(d*d)+" is farther from "+n+" than the best choice."};});
  return mcq("Which whole number is closest to \\(\\sqrt{"+n+"}\\)?", {t:String(c), fb:"Yes: "+(c*c)+" is the square closest to "+n+"."}, opts2,
    "\\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). The number "+n+" is closer to "+(c*c)+", so the closest whole number is <b>"+c+"</b>.",
    {mode:"closest", n:n});
}, ["Find the perfect squares just below and just above the number.", "Square the whole numbers near the root and see which squares bracket the number."]);

E("u2-calc-root", 2, ["6.6"], 1, "gen", function(){
  var n=u2nonSquare(11,399);
  var ans=u2r1(Math.sqrt(n));
  return numq("Use a calculator. What is \\(\\sqrt{"+n+"}\\), to one decimal place?", ans, 0.05,
    "A calculator gives \\(\\sqrt{"+n+"} \\approx "+fmt(Math.sqrt(n))+"\\). Rounded to one decimal place, the square root is <b>"+fmt(ans)+"</b>.",
    {mode:"calc", n:n});
}, ["Enter the number and press the square root key on a calculator.", "Read the display, then round the value to one decimal place."]);

E("u2-root-between", 2, ["6.8"], 1, "gen", function(){
  var a=ri(2,15); var b=a+1;
  var m=a*a+ri(1,2*a-1);
  var above=b*b+ri(1,12);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", which is an endpoint, not between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", which is an endpoint, not between."},
            {t:String(above), fb:"Its square root is more than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints: \\("+a+"^{2} = "+(a*a)+"\\) and \\("+b+"^{2} = "+(b*b)+"\\). Only "+m+" lies between those squares, so the number is <b>"+m+"</b>.",
    {mode:"between", a:a, b:b});
}, ["Square the two given numbers to turn the question into a range for the number itself.", "Check which candidate falls between the two squares you just found."]);

E("u2-spot-error", 2, ["6.10"], 2, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var c, R;
    if(ri(0,1)===0){ c=ri(3,30); R=2*c; }
    else { var kk=ri(13,39); if(kk===20){kk=21;} c=u2r1(kk/10); R=u2r1(2*c); }
    return mcq("A student writes: \\(\\sqrt{"+fmt(R)+"} = "+fmt(c)+"\\) because "+fmt(c)+" is half of "+fmt(R)+". What error was made?",
      {t:"The student halved the number instead of finding a value that squares to it", fb:"Right: a square root undoes squaring, not halving."},
      [{t:"The student rounded the answer to a whole number too early in the work", fb:"Rounding is not the issue here: the method itself is wrong."},
       {t:"The student squared the starting number instead of taking its square root", fb:"Look again: the step shown halves the starting number."},
       {t:"The student placed the decimal point in the wrong position in the answer", fb:"The decimal places are fine: the operation chosen is wrong."}],
      "Check by squaring: \\("+fmt(c)+" \\times "+fmt(c)+" = "+fmt(u2r2(c*c))+"\\), not "+fmt(R)+". Halving does not undo squaring. The error was <b>halving the number instead of finding a value that squares to it</b>.",
      {mode:"halving", R:R});
  }
  if(mode===2){
    var k=ri(4,19); if(k===10){k=11;}
    var r=u2r1(k/10); var N=u2r2(r*r); var claim=u2r2(r/10);
    return mcq("A student writes: \\(\\sqrt{"+fmt(N)+"} = "+fmt(claim)+"\\). What error was made?",
      {t:"The decimal point was placed one position too far to the left", fb:"Right: "+fmt(r)+" squared gives the number, so the point belongs there."},
      [{t:"The student halved the number instead of finding its square root", fb:"Halving was not the step used: compare the sizes of the digits."},
       {t:"The student squared the number shown instead of taking its root", fb:"Squaring would make the value bigger, not shift its point."},
       {t:"The student rounded a correct answer to the wrong decimal place", fb:"The digits are right but shifted: this is a place value slip."}],
      "Squaring the claim gives \\("+fmt(claim)+" \\times "+fmt(claim)+" = "+fmt(u2r2(claim*claim*100)/100)+"\\), not "+fmt(N)+", while \\("+fmt(r)+" \\times "+fmt(r)+" = "+fmt(N)+"\\). The error was <b>placing the decimal point one position too far to the left</b>.",
      {mode:"decimal-point", N:N});
  }
  if(mode===3){
    var n=ri(3,20); var cl=n*n;
    return mcq("A student writes: \\(\\sqrt{"+n+"} = "+cl+"\\) because "+n+" times "+n+" is "+cl+". What error was made?",
      {t:"The student squared the number instead of taking its square root", fb:"Right: squaring and rooting are opposite operations."},
      [{t:"The student halved the number instead of taking its square root", fb:"Halving was not used: the work multiplied the number by itself."},
       {t:"The student placed the decimal point in the wrong position instead", fb:"No decimals are involved: the operation itself was reversed."},
       {t:"The student rounded the answer to a whole number too early in the work", fb:"Rounding is not the issue: the answer grew instead of shrinking."}],
      "Check the claim by squaring it: \\("+cl+" \\times "+cl+" = "+(cl*cl)+"\\), not "+n+". A square root undoes squaring; it does not square again. The error was <b>squaring the number instead of taking its square root</b>.",
      {mode:"squared-instead", n:n});
  }
  var a=ri(3,11); var b=ri(3,11); var R=a*a+b*b; var claim=a+b;
  return mcq("A student writes: \\(\\sqrt{"+(a*a)+"+"+(b*b)+"} = "+a+"+"+b+" = "+claim+"\\). What error was made?",
    {t:"The student took the root of each part separately before adding", fb:"Right: the root applies to the whole sum, not to each part."},
    [{t:"The student halved the sum instead of finding its square root", fb:"Halving was not used: the roots were taken part by part."},
     {t:"The student squared the sum instead of taking the root of the sum", fb:"Squaring was not used: each part was rooted on its own."},
     {t:"The student placed the decimal point in the wrong position instead", fb:"No decimals are involved: the root was split across the sum."}],
    "Add first: \\("+(a*a)+"+"+(b*b)+" = "+R+"\\), and \\("+claim+" \\times "+claim+" = "+(claim*claim)+"\\), not "+R+". The error was <b>taking the root of each part separately before adding</b>.",
    {mode:"split-root", a:a, b:b});
}, ["Test the claim by squaring the answer the student gave.", "Square the claimed root: if it does not give the starting number, name the step that went wrong."]);

E("u2-sa-single", 2, ["9.2"], 2, "gen", function(){
  var mode=pick(["rect","tri","cyl"]);
  if(mode==="rect"){
    var l=ri(2,12), w=ri(2,12), h=ri(2,12);
    var sa=2*(l*w+l*h+w*h);
    var q = numq("Find the surface area of a right rectangular prism with length "+l+" cm, width "+w+" cm and height "+h+" cm. Give your answer in square centimetres.", sa, 0.01,
      "Add the areas of the three different faces, then double: \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= 2("+fmt(l*w+l*h+w*h)+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"rect-prism", l:l, w:w, h:h});
    q.figure = solRectPrism(l, w, h, fmt(l) + " cm", fmt(w) + " cm", fmt(h) + " cm", "Rectangular prism with labelled dimensions");
    return q;
  }
  if(mode==="tri"){
    var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
    var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,18);
    var sa2=a*b+(a+b+c)*L;
    var q = numq("Find the surface area of a right triangular prism. The triangular end is a right triangle with legs "+a+" cm and "+b+" cm and hypotenuse "+c+" cm, and the prism is "+L+" cm long. Give your answer in square centimetres.", sa2, 0.01,
      "Two triangular ends plus three rectangles along the length: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+b+c)*L)+" \\\\ &= "+fmt(sa2)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa2)+" cm\\(^{2}\\)</b>.",
      {mode:"tri-prism", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism with labelled dimensions");
    return q;
  }
  var r=ri(2,10), hh=ri(3,15);
  var sac=u2r1(2*3.14*r*(r+hh));
  var q = numq("Find the surface area of a right cylinder with radius "+r+" cm and height "+hh+" cm. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sac, 0.6,
    "Two circles plus the curved side, using \\(\\pi = 3.14\\): \\[ \\begin{aligned} SA &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3.14)("+r+")("+r+"+"+hh+") \\\\ &= "+fmt(sac)+" \\end{aligned} \\] The surface area is <b>"+fmt(sac)+" cm\\(^{2}\\)</b>.",
    {mode:"cylinder", r:r, h:hh});
    q.figure = solCylinder(r, hh, fmt(r) + " cm", fmt(hh) + " cm", "Cylinder with labelled dimensions");
    return q;
}, ["Picture the net of the solid: every outside face must be counted once.", "Work out one face area at a time, then add the matching faces together."]);

E("u2-sa-tri-context", 2, ["9.2"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(5,20);
  var mode=pick(["ramp","tent","bar"]);
  if(mode==="tent"){
    var sat=a*b+(a+c)*L;
    var q = numq("A lean-to tent is shaped like a right triangular prism. Each triangular end has a vertical side of "+a+" cm, a base of "+b+" cm and a sloped side of "+c+" cm, and the tent is "+L+" cm long. The rectangular face on the ground, "+b+" cm by "+L+" cm, has no material. Find the area of material needed, in square centimetres.", sat, 0.01,
      "Count two triangular ends and the two covered rectangles, leaving out the ground face: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+c)*L)+" \\\\ &= "+fmt(sat)+" \\end{aligned} \\] The area of material needed is <b>"+fmt(sat)+" cm\\(^{2}\\)</b>.",
      {mode:"tent-no-floor", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism tent with labelled dimensions");
    return q;
  }
  var sa=a*b+(a+b+c)*L;
  if(mode==="ramp"){
    var q = numq("A display ramp is shaped like a right triangular prism and is covered on all faces. Each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm, forming a right triangle, and the ramp is "+L+" cm long. Find the total surface area of the ramp, in square centimetres.", sa, 0.01,
      "Two triangular ends plus three rectangles along the length: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+b+c)*L)+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The total surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"ramp", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism ramp with labelled dimensions");
    return q;
  }
  var q = numq("A chocolate bar box is shaped like a right triangular prism, closed on all faces. Each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm, forming a right triangle, and the box is "+L+" cm long. Find the total surface area of the box, in square centimetres.", sa, 0.01,
    "Two triangular ends plus three rectangles along the length: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+b+c)*L)+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The total surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"bar-box", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(L) + " cm", "Triangular prism box with labelled dimensions");
    return q;
}, ["Sketch the prism and label every face before you calculate.", "Find the two triangular ends first, then add the rectangles that run along the length."]);

E("u2-overlap", 2, ["9.1"], 1, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("A small box sits on top of a larger box that is "+bl+" cm long and "+bw+" cm wide. The two boxes touch over a rectangle that measures "+p+" cm by "+q+" cm. What is the area of the overlap, in square centimetres?", p*q, 0.01,
    "The overlap is the rectangle where the boxes touch: \\[ \\begin{aligned} A &= "+p+" \\times "+q+" \\\\ &= "+(p*q)+" \\end{aligned} \\] The area of the overlap is <b>"+(p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"overlap", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmt(p) + " cm", fmt(q) + " cm", fmt(bl) + " cm", fmt(bw) + " cm", "Plan view of two boxes with the overlap shaded");
    return qq;
}, ["The overlap is the rectangle where the two solids touch each other.", "Find the area of the touching rectangle first, then think about how many faces it hides."]);

E("u2-overlap-hidden", 2, ["9.1"], 2, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("A small box sits on top of a larger box that is "+bl+" cm long and "+bw+" cm wide. The two boxes touch over a rectangle that measures "+p+" cm by "+q+" cm. How much surface area is hidden in total where the two boxes touch, in square centimetres?", 2*p*q, 0.01,
    "The touching rectangle hides one face on each box, so it is hidden twice: \\[ \\begin{aligned} \\text{hidden} &= 2\\times("+p+" \\times "+q+") \\\\ &= 2\\times "+(p*q)+" \\\\ &= "+(2*p*q)+" \\end{aligned} \\] The total hidden surface area is <b>"+(2*p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"hidden-total", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmt(p) + " cm", fmt(q) + " cm", fmt(bl) + " cm", fmt(bw) + " cm", "Plan view of two boxes with the overlap shaded");
    return qq;
}, ["The overlap is the rectangle where the two solids touch each other.", "Find the area of the touching rectangle first, then think about how many faces it hides."]);

E("u2-sa-composite-rect", 2, ["9.2"], 2, "gen", function(){
  var X=ri(8,16), W=ri(4,10), H1=ri(3,7), X2=ri(3,6), H2=ri(2,6);
  if(X2>=X){X2=X-3;}
  var sa1=2*(X*W+X*H1+W*H1), sa2=2*(X2*W+X2*H2+W*H2), contact=X2*W;
  var tot=sa1+sa2-2*contact;
  var q = numq("A step is built from two boxes joined together. The bottom box measures "+X+" cm long, "+W+" cm wide and "+H1+" cm high. The top box measures "+X2+" cm long, "+W+" cm wide and "+H2+" cm high, and it sits on top of the bottom box, flush with the back and the left side. Find the total surface area of the step, in square centimetres.", tot, 0.01,
    "Find each box on its own, then subtract the touching face twice because it is hidden on both boxes: \\[ \\begin{aligned} SA &= 2("+fmt(X*W)+"+"+fmt(X*H1)+"+"+fmt(W*H1)+") + 2("+fmt(X2*W)+"+"+fmt(X2*H2)+"+"+fmt(W*H2)+") - 2("+contact+") \\\\ &= "+sa1+" + "+sa2+" - "+(2*contact)+" \\\\ &= "+tot+" \\end{aligned} \\] The total surface area is <b>"+tot+" cm\\(^{2}\\)</b>.",
    {mode:"step", X:X, W:W, H1:H1, X2:X2, H2:H2});
    q.figure = solStep(X, W, H1, X2, H2, fmt(X) + " cm", fmt(W) + " cm", fmt(H1) + " cm", fmt(X2) + " cm", fmt(H2) + " cm", "Step built from two boxes with labelled dimensions");
    return q;
}, ["Treat the step as two separate boxes first, then adjust for the join.", "Add both surface areas, then subtract the touching face twice since it is hidden on both boxes."]);

E("u2-sa-problem", 2, ["9.3"], 2, "gen", function(){
  if(pick(["cans","cost"])==="cans"){
    var l=ri(4,11)/2, w=ri(3,9)/2, h=ri(3,8)/2;
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([8,10,12,15,20]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q = numq("A storage tank shaped like a right rectangular prism measures "+fmt(l)+" m long, "+fmt(w)+" m wide and "+fmt(h)+" m high. It will be painted on the outside, on all faces. One can of paint covers "+cover+" square metres. How many cans of paint are needed?", cans, 0.01,
      "Find the surface area first, then divide by the coverage and round up: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] Then \\("+fmt(sa)+" \\div "+cover+" \\approx "+fmt(u2r2(sa/cover))+"\\), so a part can is not enough. The number of cans needed is <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover});
    q.figure = solRectPrism(l, w, h, fmt(l) + " m", fmt(w) + " m", fmt(h) + " m", "Rectangular prism tank with labelled dimensions");
    return q;
  }
  var l2=ri(8,30)/10, w2=ri(6,24)/10, h2=ri(4,18)/10;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var price=pick([4,5,6,8,9]);
  var cost=u2r2(sa2*price);
  var q = numq("A gift box shaped like a right rectangular prism measures "+fmt(l2)+" m long, "+fmt(w2)+" m wide and "+fmt(h2)+" m high. It is covered on all faces with fabric that costs $"+price+" per square metre. What is the total cost of the fabric, in dollars, to the nearest cent?", cost, 0.05,
    "Find the surface area first, then multiply by the price per square metre: \\[ \\begin{aligned} SA &= 2("+fmt(u2r2(l2*w2))+"+"+fmt(u2r2(l2*h2))+"+"+fmt(u2r2(w2*h2))+") \\\\ &= "+fmt(u2r2(sa2))+" \\end{aligned} \\] Then \\("+fmt(u2r2(sa2))+" \\times "+price+" = "+fmt(cost)+"\\). The total cost is <b>$"+fmt(cost)+"</b>.",
    {mode:"fabric-cost", l:l2, w:w2, h:h2, price:price});
    q.figure = solRectPrism(l2, w2, h2, fmt(l2) + " m", fmt(w2) + " m", fmt(h2) + " m", "Rectangular prism box with labelled dimensions");
    return q;
}, ["Work out the total surface area before you use the coverage or the price.", "Divide the surface area by the coverage per can, or multiply it by the price per square metre."]);

E("u2-why-approx", 2, ["6.7"], 1, "var", varset([
  function(){
    return mcq("A calculator shows \\(\\sqrt{2} \\approx 1.414213562\\). Why is the value on the screen an approximation?",
      {t:"Squaring 1.414213562 does not give exactly 2, only very close to 2", fb:"Right: the display is rounded, so its square misses 2 slightly."},
      [{t:"The calculator made an arithmetic mistake when it found the root", fb:"The calculator works properly: the limit is the size of the display."},
       {t:"The value is exact because it has nine decimal places shown on it", fb:"Many places still means rounded: the digits continue beyond them."},
       {t:"The root of 2 is a fraction, and the screen cannot show fractions", fb:"The issue is endless decimals, not fractions: some roots are fractions."}],
      "Squaring the screen value gives about \\(1.999999999\\), close to 2 but not equal to it, because the true value continues past the display. The screen value is <b>an approximation because it is rounded</b>.",
      {mode:"static-sqrt2"});
  },
  function(){
    return mcq("A student says the exact value of \\(\\sqrt{7}\\) is 2.64575131, the value on the calculator screen. Why is the student wrong?",
      {t:"The true value has decimal digits that continue forever without ending", fb:"Right: the screen shows only the first digits, rounded."},
      [{t:"The calculator rounded the last digit the wrong way on the screen", fb:"Either rounding direction still cuts the value off: that is the point."},
       {t:"The exact value of the root is 2.6, with only one decimal place", fb:"Roots do not stop at one place: this one keeps going."},
       {t:"The student copied the digits from the screen in the wrong order", fb:"The digits were copied fine: the value itself is incomplete."}],
      "The decimal for \\(\\sqrt{7}\\) never ends, so any screen can show only its first digits, rounded. The student is wrong because <b>the true value continues forever past the display</b>.",
      {mode:"static-sqrt7"});
  },
  function(){
    return mcq("For a project, Sam uses 3.16 as the value of \\(\\sqrt{10}\\). Why is 3.16 called an approximation?",
      {t:"It is the true value rounded to two decimal places, not the full value", fb:"Right: 3.16 squared is 9.9856, close to 10 but not equal."},
      [{t:"It is an approximation because Sam found it without a calculator", fb:"The method does not decide it: the rounding is what matters."},
       {t:"It is exact, since two decimal places are enough for any project", fb:"Enough for a project can still be rounded rather than exact."},
       {t:"It is an approximation because the number 10 has no square root at all", fb:"10 does have a root: it just never terminates or repeats."}],
      "\\(3.16 \\times 3.16 = 9.9856\\), which is close to 10 but not equal to it. The value 3.16 is <b>an approximation because it is the true root rounded to two decimal places</b>.",
      {mode:"static-sqrt10"});
  }
]), ["Ask whether squaring the shown value gives back the starting number exactly.", "Check the shown value by squaring it, and think about whether more digits exist."]);

E("u2-sa-cyl-on-prism", 2, ["9.3"], 3, "gen", function(){
  var r=ri(2,5), hc=ri(4,12), l=ri(10,16), w=ri(10,16), h=ri(3,8);
  var prism=2*(l*w+l*h+w*h);
  var side=u2r1(2*3.14*r*hc), top=u2r2(3.14*r*r);
  var tot=u2r1(prism+side);
  var ctx=pick(["A cylindrical water tank stands on top of a rectangular concrete base","A thick round candle stands on top of a rectangular wooden stand"]);
  var q = numq(ctx+". The cylinder has radius "+r+" cm and height "+hc+" cm, and its base sits fully on the top face of the prism. The prism measures "+l+" cm long, "+w+" cm wide and "+h+" cm high. Find the total exposed surface area, in square centimetres. Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", tot, 0.6,
    "The circle where the cylinder meets the prism is hidden, and the cylinder bottom is not exposed, so those two equal circles cancel out of the total: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") + 2(3.14)("+r+")("+hc+") \\\\ &= "+prism+" + "+fmt(side)+" \\\\ &= "+fmt(tot)+" \\end{aligned} \\] The total exposed surface area is <b>"+fmt(tot)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-prism", r:r, hc:hc, l:l, w:w, h:h});
    q.figure = solCylOnPrism(r, hc, l, w, h, fmt(r) + " cm", fmt(hc) + " cm", fmt(l) + " cm", fmt(w) + " cm", fmt(h) + " cm", "Cylinder on a rectangular prism with labelled dimensions");
    return q;
}, ["Split the solid into the prism and the cylinder, then think about the join.", "Find the prism surface area, then add only the exposed parts of the cylinder."]);

E("u2-best-estimate-side", 2, ["6.5","6.8"], 3, "gen", function(){
  var best=u2r1(ri(24,98)/10);
  var A=u2r1(best*best+pick([-0.6,-0.3,0.3,0.6]));
  var ctx=pick(["A square patio","A square photo print","A square floor mat","A square rug"]);
  var vals=[u2r1(best-0.5), best, u2r1(best+0.5), u2r1(best+1)];
  var opts=vals.slice(0,1).concat(vals.slice(2)).map(function(v){
    return {t:fmt(v), fb:"Square it: "+fmt(v)+" squared is "+fmt(u2r2(v*v))+", not the closest square to "+fmt(A)+"."};
  });
  return mcq(ctx+" has an area of "+fmt(A)+" square metres. What is the best estimate for its side length, in metres?",
    {t:fmt(best), fb:"Yes: "+fmt(best)+" squared is "+fmt(u2r2(best*best))+", closest to "+fmt(A)+"."}, opts,
    "The side length is \\(\\sqrt{"+fmt(A)+"}\\). Since \\("+fmt(best)+"^{2} = "+fmt(u2r2(best*best))+"\\), the square closest to "+fmt(A)+", the best estimate is <b>"+fmt(best)+" m</b>.",
    {mode:"best-estimate", A:A});
}, ["The side length is the square root of the area, so estimate that root.", "Square each nearby one-decimal value and find which square lands closest to the area."]);

E("u2-reasoning-var", 2, ["3.3","6.10"], 3, "var", varset([
  function(){
    return mcq("Rina claims that 0.81 is a perfect square because 81 is a perfect square and the digits are the same. Which option judges her claim correctly?",
      {t:"The claim is correct, because 0.9 times 0.9 equals 0.81", fb:"Right: a decimal is a perfect square when a number squares to it."},
      [{t:"The claim is wrong, because decimals can never be squares", fb:"Decimals can be squares: check 0.9 times 0.9 for yourself."},
       {t:"The claim is wrong, because 0.81 divided by 2 is not whole", fb:"Halving is not the test: the test is multiplying a number by itself."},
       {t:"The claim is correct, because 81 over 100 is a whole number", fb:"The result is right but that reason fails: 81 over 100 is not whole."}],
      "\\(0.9 \\times 0.9 = 0.81\\), so a number times itself gives 0.81. The correct judgement is <b>the claim is correct, because 0.9 times 0.9 equals 0.81</b>.",
      {mode:"static-decimal-claim"});
  },
  function(){
    return mcq("Dev claims that \\("+FR(18,49)+"\\) is a perfect square because 49 is a perfect square. Which option judges his claim correctly?",
      {t:"The claim is wrong, because 18 is not a perfect square", fb:"Right: both the top and the bottom must be perfect squares."},
      [{t:"The claim is correct, because 49 is a perfect square", fb:"One part being a square is not enough: check the top part too."},
       {t:"The claim is wrong, because fractions can never be squares", fb:"Fractions can be squares when both parts are square numbers."},
       {t:"The claim is correct, because 18 is close to the square 16", fb:"Close is not equal: 18 itself would have to be a square."}],
      "A fraction is a perfect square only when its top and bottom are both perfect squares. Here 49 is a square but 18 is not. The correct judgement is <b>the claim is wrong, because 18 is not a perfect square</b>.",
      {mode:"static-fraction-claim"});
  },
  function(){
    return mcq("Tess estimates \\(\\sqrt{48}\\) as 24, saying she halved 48 to undo the square. Which option judges her method correctly?",
      {t:"The method is wrong: 48 lies between 36 and 49, so the root lies between 6 and 7", fb:"Right: benchmark squares give the range, and halving is not rooting."},
      [{t:"The method is right: halving a number always gives its square root exactly", fb:"Test it on 16: halving gives 8, but the square root is 4."},
       {t:"The method is wrong: the root of 48 is exactly 7 itself since 48 rounds to 49", fb:"Rounding the starting number does not make the root exact."},
       {t:"The method is right: 24 times 24 is close enough to 48 for an estimate here", fb:"24 squared is 576, which is nowhere near 48 at all."}],
      "Benchmark squares give \\(36 < 48 < 49\\), so \\(6 < \\sqrt{48} < 7\\), and halving never undoes squaring. The correct judgement is <b>the method is wrong: the root lies between 6 and 7</b>.",
      {mode:"static-estimate-flaw"});
  }
]), ["Judge a claim by testing it with the definition, not by how it sounds.", "For a square claim, multiply a candidate by itself; for an estimate, bracket it between perfect squares."]);

