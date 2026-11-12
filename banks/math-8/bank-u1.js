// Math 8 Unit 1 Square Roots and the Pythagorean Theorem question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 8 to 377).
// CRMARKS: u1-calc-approx=3
// CRMARKS: u1-diagonal-square=3
// CRMARKS: u1-hypotenuse=3
// CRMARKS: u1-ladder-context=2
// CRMARKS: u1-missing-leg=3
// CRMARKS: u1-square-plot-perimeter=2
// CRMARKS: u1-triple-find=2
/* Unit 1: Square Roots and the Pythagorean Theorem */
function u1d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u1nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<80){n=ri(lo,hi);t++;}if(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n=lo+1;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n++;}}return n;}
function u1r1(x){return Math.round(x*10)/10;}
function u1gridSVG(s){
  var cell=(s>10)?14:22,pad=26,W=s*cell+2*pad,H=s*cell+2*pad+8,out="";
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square region '+s+' units by '+s+' units">';
  out+='<rect x="'+pad+'" y="'+pad+'" width="'+(s*cell)+'" height="'+(s*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<s;i++){out+='<line x1="'+(pad+i*cell)+'" y1="'+pad+'" x2="'+(pad+i*cell)+'" y2="'+(pad+s*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';out+='<line x1="'+pad+'" y1="'+(pad+i*cell)+'" x2="'+(pad+s*cell)+'" y2="'+(pad+i*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';}
  out+=_txt(pad+s*cell/2,pad-12,s+" units",12,true);
  out+=_txt(10,pad+s*cell/2,s+"",12,true);
  return out+'</svg>';
}
function u1numLineSVG(lo,hi){
  var W=320,H=70,x0=35,x1=285,out="";
  function X(v){return x0+(v-lo)/(hi-lo)*(x1-x0);}
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from '+lo+' to '+hi+'">';
  out+='<line x1="'+x0+'" y1="38" x2="'+x1+'" y2="38" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var v=lo;v<=hi;v++){out+='<line x1="'+X(v)+'" y1="32" x2="'+X(v)+'" y2="44" stroke="'+FIG_INK+'" stroke-width="1.6"/>';out+=_txt(X(v),58,String(v),12,false);}
  return out+'</svg>';
}
function u1triFig(hyp,legV,base,labHyp,labV,labB){
  return triSVG(hyp,legV,base,{L:["A","B","C"],side:[labHyp,labV,labB]});
}

E("u1-square-of-number", 1, ["5.3"], 1, "gen", function(){
  var n=ri(3,25); var sq=n*n;
  var ds=u1d3(sq,[2*n,sq+n,sq-n,(n+1)*(n+1),(n-1)*(n-1),sq+10]);
  var opts=ds.map(function(d){return {t:String(d), fb:"That is not "+n+" times "+n+": multiply the number by itself."};});
  var mode=pick(["plain","tile","product"]);
  var prompt=(mode==="plain")?("What is \\("+n+"^{2}\\)?"):((mode==="tile")?("A square tile has sides of "+n+" cm. What is the area of the tile, in square centimetres?"):("What is the value of \\("+n+" \\times "+n+"\\)?"));
  return mcq(prompt, {t:String(sq), fb:"Yes: "+n+" times "+n+" equals "+sq+"."}, opts,
    "Squaring means multiplying the number by itself: \\[ \\begin{aligned} "+n+"^{2} &= "+n+" \\times "+n+" \\\\ &= "+sq+" \\end{aligned} \\] The square is <b>"+sq+"</b>.",
    {n:n, mode:mode});
}, ["Squaring a number means multiplying it by itself.", "Write the number times itself and multiply."]);

E("u1-sqrt-perfect", 1, ["5.2"], 1, "gen", function(){
  var r=ri(2,20); var n=r*r;
  var ds=u1d3(r,[r+1,r-1,r+2,Math.max(r-2,1),r+3]);
  var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+(d*d)+", not "+n+": try another value."};});
  var mode=pick(["plain","area","pairs"]);
  var prompt=(mode==="plain")?("What is \\(\\sqrt{"+n+"}\\)?"):((mode==="area")?("A square has an area of "+n+" square centimetres. What is its side length, in centimetres?"):("A number multiplied by itself gives "+n+". What is the number?"));
  var q=mcq(prompt, {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
    "Find the number that multiplies by itself to give "+n+": \\[ \\begin{aligned} "+r+" \\times "+r+" &= "+n+" \\\\ \\sqrt{"+n+"} &= "+r+" \\end{aligned} \\] The square root is <b>"+r+"</b>.",
    {r:r, n:n, mode:mode});
  q.figure=u1gridSVG(r);
  return q;
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Test small squares in order until one equals the number shown."]);

E("u1-perfect-square-region", 1, ["3.19"], 1, "gen", function(){
  var s=ri(2,14); var area=s*s;
  var ds=u1d3(area,[2*s,area+s,area-s,(s+1)*(s+1)]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Count the rows and columns: the region has "+s+" rows of "+s+" squares."};});
  var ctx=pick(["a square region built from small squares","a square patio built from paving stones in a grid","a square quilt block sewn from small squares","a square garden bed marked out in a grid"]);
  var q=mcq("The diagram shows "+ctx+". How many small squares are in the region?", {t:String(area), fb:"Yes: "+s+" rows with "+s+" squares in each row gives "+area+"."}, opts,
    "The region is "+s+" squares along each side, so it is a square array: \\[ \\begin{aligned} \\text{total} &= "+s+" \\times "+s+" \\\\ &= "+area+" \\end{aligned} \\] The region holds <b>"+area+" small squares</b>, so "+area+" is shown as the perfect square \\("+s+"^{2}\\).",
    {s:s});
  q.figure=u1gridSVG(s);
  return q;
}, ["A square region has the same number of squares along each side.", "Count the squares along one side, then multiply that count by itself."]);

E("u1-is-perfect-square", 1, ["3.20"], 1, "gen", function(){
  if(pick(["yes","no"])==="yes"){
    var r=ri(4,16); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" lies between neighbouring squares, so no whole number squares to it."};});
    return mcq("Which number is a perfect square?", {t:String(n), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "Only one value is a whole number times itself: \\("+r+" \\times "+r+" = "+n+"\\). The perfect square is <b>"+n+"</b>.",
      {mode:"yes", n:n});
  }
  var k=ri(4,15); var n=k*k+ri(1,2*k-1);
  return mcq("Which statement about the number "+n+" is correct?",
    {t:n+" lies between the squares "+(k*k)+" and "+((k+1)*(k+1))+", so it is not a perfect square", fb:"Yes: "+n+" sits between two neighbouring squares, so no whole number squares to it."},
    [{t:n+" is a perfect square, since it is close to the square "+(k*k), fb:"Close is not equal: a perfect square must be a whole number times itself exactly."},
     {t:n+" is a perfect square, since it ends in a digit that squares can end in", fb:"The last digit alone cannot prove it: compare with the neighbouring squares."},
     {t:n+" lies between the squares "+((k+1)*(k+1))+" and "+((k+2)*(k+2))+", so it is not a perfect square", fb:"Check the bracket: "+n+" is below "+((k+1)*(k+1))+", so that pair is too high."}],
    "The squares near "+n+" are \\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). Since "+n+" lies between them, no whole number squares to it. The correct statement is <b>"+n+" is not a perfect square</b>.",
    {mode:"no", n:n});
}, ["A perfect square is a whole number multiplied by itself.", "List the squares near each value and check which values appear in the list."]);

E("u1-factors-root", 1, ["5.1"], 1, "gen", function(){
  var r=ri(4,16); var n=r*r;
  var facs=[]; for(var d=1;d<=n;d++){ if(n%d===0){facs.push(d);} }
  var others=facs.filter(function(d){return d!==r;});
  var wrong=pick(others);
  var opts=[
    {t:String(wrong), fb:wrong+" is a factor, but "+wrong+" times "+wrong+" is not "+n+", so it is not the square root."},
    {t:String(n), fb:n+" is a factor, but a square root must multiply by itself to give "+n+"."},
    {t:String(2*r===n?n+1:2*r), fb:"Check the factor pairs: a square root pairs with itself."}
  ];
  var seenOpts={}; var clean=[]; opts.forEach(function(o){if(o.t!==String(r)&&!seenOpts[o.t]){seenOpts[o.t]=1;clean.push(o);}});
  while(clean.length<3){var cand=String(ri(2,20)); if(cand!==String(r)&&!seenOpts[cand]){seenOpts[cand]=1;clean.push({t:cand, fb:"That value does not pair with itself to give "+n+"."});}}
  var fmode=pick(["pairs","which","area","def"]);
  var fprompt=(fmode==="pairs")?(n+" has factor pairs that multiply to "+n+". Which factor is the square root of "+n+"?"):((fmode==="which")?("Which factor of "+n+" is its square root?"):((fmode==="area")?("A square with area "+n+" has whole-number side lengths among the factors of "+n+". Which factor gives the side length?"):("The factors of "+n+" can be listed in pairs. Which factor is the square root of "+n+"?")));
  return mcq(fprompt, {t:String(r), fb:"Yes: "+r+" pairs with itself, since "+r+" times "+r+" equals "+n+"."}, clean.slice(0,3),
    "List the factor pairs of "+n+". Every pair has two different factors except one: \\("+r+" \\times "+r+" = "+n+"\\). A square root is the factor that pairs with itself. The square root is <b>"+r+"</b>.",
    {r:r, n:n});
}, ["A square root is the factor that multiplies by itself to give the number.", "Write out the factor pairs and find the pair where both factors are the same."]);

E("u1-estimate-between", 1, ["6.30"], 1, "gen", function(){
  var n=u1nonSquare(10,200); var k=Math.floor(Math.sqrt(n));
  var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
  var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
  var q=mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
    "Use the perfect squares on each side as benchmarks: \\[ \\begin{aligned} "+k+"^{2} &= "+(k*k)+" \\\\ "+(k+1)+"^{2} &= "+((k+1)*(k+1))+" \\end{aligned} \\] Since "+(k*k)+" is less than "+n+", which is less than "+((k+1)*(k+1))+", the root lies between <b>"+k+" and "+(k+1)+"</b>.",
    {n:n, k:k});
  q.figure=u1numLineSVG(Math.max(k-1,0),k+2);
  return q;
}, ["Find the perfect squares just below and just above the number.", "Square whole numbers in order until their squares bracket the number."]);

E("u1-root-between-numbers", 1, ["6.31"], 1, "gen", function(){
  var a=ri(2,14); var b=a+ri(1,2);
  var m=a*a+ri(1,(b*b-a*a)-1);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", an endpoint rather than a value between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", an endpoint rather than a value between."},
            {t:String(b*b+ri(2,15)), fb:"Its square root is greater than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints to turn the question into a range: \\[ \\begin{aligned} "+a+"^{2} &= "+(a*a)+" \\\\ "+b+"^{2} &= "+(b*b)+" \\end{aligned} \\] Only "+m+" lies between those squares. The number is <b>"+m+"</b>.",
    {a:a, b:b, m:m});
}, ["Square the two given numbers to get a range for the number itself.", "Check which candidate falls between the two squares."]);

E("u1-calc-approx", 1, ["6.32"], 1, "gen", function(){
  var n=u1nonSquare(11,300);
  var ans=u1r1(Math.sqrt(n));
  return numq("Use a calculator to find \\(\\sqrt{"+n+"}\\), to one decimal place.", ans, 0.05,
    "A calculator gives a long decimal: \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmt(Math.sqrt(n))+" \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] To one decimal place, the square root is <b>"+fmt(ans)+"</b>.",
    {n:n});
}, ["Enter the number and use the square root key on a calculator.", "Read the display, then round to one decimal place."]);

E("u1-why-approx", 1, ["6.33"], 1, "var", varset([
  function(){
    return mcq("A calculator shows \\(\\sqrt{5} \\approx 2.2360679\\). Why is the value on the screen an approximation?",
      {t:"Squaring 2.2360679 does not give exactly 5, only very close to 5", fb:"Right: the display is rounded, so its square misses 5 slightly."},
      [{t:"The calculator made an arithmetic mistake while finding the root", fb:"The calculator works properly: the limit is the size of the display."},
       {t:"The value is exact because it shows seven decimal places on screen", fb:"Many places still means rounded: the digits continue beyond them."},
       {t:"The number 5 has no square root, so the screen shows a rough guess", fb:"5 does have a square root: its decimal just never ends."}],
      "Squaring the screen value gives a result close to 5 but not equal to 5, because the true value continues past the display. The screen value is <b>an approximation because it is rounded</b>.",
      {mode:"sqrt5"});
  },
  function(){
    return mcq("A student says the exact value of \\(\\sqrt{11}\\) is 3.31662479, the value on the calculator screen. Why is the student wrong?",
      {t:"The true value has decimal digits that continue past the digits shown", fb:"Right: the screen shows only the first digits, rounded."},
      [{t:"The calculator rounded the last digit the wrong way on the screen", fb:"Either rounding direction still cuts the value off: that is the point."},
       {t:"The exact value of the root is 3.3, with only one decimal place", fb:"Roots do not stop at one place: this one keeps going."},
       {t:"The student copied the digits from the screen in the wrong order", fb:"The digits were copied fine: the value itself is incomplete."}],
      "The decimal for \\(\\sqrt{11}\\) never ends, so a screen can show only its first digits, rounded. The student is wrong because <b>the true value continues past the display</b>.",
      {mode:"sqrt11"});
  },
  function(){
    return mcq("For a project, a student uses 4.47 as the value of \\(\\sqrt{20}\\). Why is 4.47 called an approximation?",
      {t:"It is the true value rounded to two decimal places, not the full value", fb:"Right: 4.47 squared is 19.9809, close to 20 but not equal."},
      [{t:"It is an approximation because it was found with a calculator in class", fb:"The tool does not decide it: the rounding is what matters."},
       {t:"It is exact, since two decimal places are enough for the project work", fb:"Enough for a project can still be rounded rather than exact."},
       {t:"It is an approximation because the number 20 has no square root at all", fb:"20 does have a root: it just never terminates or repeats."}],
      "\\(4.47 \\times 4.47 = 19.9809\\), which is close to 20 but not equal to it. The value 4.47 is <b>an approximation because it is the true root rounded to two decimal places</b>.",
      {mode:"sqrt20"});
  }
]), ["Ask whether squaring the shown value gives back the starting number exactly.", "Square the shown value and compare it with the number under the root sign."]);

E("u1-pythag-model", 1, ["9.1"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  if(pick(["ab","ba"])==="ba"){ var tmp=tr[0]; tr[0]=tr[1]; tr[1]=tmp; }
  var a=tr[0], b=tr[1], c=tr[2];
  var punit=pick(["cm","m"]);
  var correct="\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)";
  var opts=[
    {t:"\\("+a+" + "+b+" = "+c+"\\)", fb:"The theorem uses squares of the sides, not the sides themselves."},
    {t:"\\("+a+"^{2} + "+c+"^{2} = "+b+"^{2}\\)", fb:"The hypotenuse squared stands alone: here "+c+" is the hypotenuse."},
    {t:"\\("+c+"^{2} - "+a+"^{2} = "+a+"^{2}\\)", fb:"Both legs are squared and added: check which sides are the legs."}
  ];
  var q=mcq("A right triangle has legs of "+a+" "+punit+" and "+b+" "+punit+" and a hypotenuse of "+c+" "+punit+", as shown. Which equation models the Pythagorean theorem for this triangle?", {t:correct, fb:"Yes: the squares of the two legs add to the square of the hypotenuse."}, opts,
    "The theorem says the squares of the legs add to the square of the hypotenuse: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ &= "+c+"^{2} \\end{aligned} \\] The modelling equation is <b>\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,c+" "+punit,b+" "+punit,a+" "+punit);
  return q;
}, ["The hypotenuse is the longest side, opposite the right angle.", "Square each leg, add them, and set the sum equal to the hypotenuse squared."]);

E("u1-hypotenuse", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has legs of "+a+" "+unit+" and "+b+" "+unit+", as shown in the diagram. Find the length of the hypotenuse, in "+unit+".", c, 0.01,
    "Use the Pythagorean theorem, with the hypotenuse as the unknown: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] The hypotenuse is <b>"+c+" "+unit+"</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,"?",b+" "+unit,a+" "+unit);
  return q;
}, ["The hypotenuse is opposite the right angle and is found from the two legs.", "Square both legs and add, then take the square root of the sum."]);

E("u1-missing-leg", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var known=pick(["a","b"]); var knownLeg=(known==="a")?a:b; var unknown=(known==="a")?b:a;
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has a hypotenuse of "+c+" "+unit+" and one leg of "+knownLeg+" "+unit+", as shown in the diagram. Find the length of the other leg, in "+unit+".", unknown, 0.01,
    "Rearrange the theorem to solve for the missing leg: \\[ \\begin{aligned} b^{2} &= "+c+"^{2} - "+knownLeg+"^{2} \\\\ &= "+(c*c)+" - "+(knownLeg*knownLeg)+" \\\\ &= "+(unknown*unknown)+" \\\\ b &= "+unknown+" \\end{aligned} \\] The other leg is <b>"+unknown+" "+unit+"</b>.",
    {a:a, b:b, c:c, known:known});
  if(known==="a"){ q.figure=u1triFig(c,b,a,c+" "+unit,"?",a+" "+unit); }
  else { q.figure=u1triFig(c,b,a,c+" "+unit,b+" "+unit,"?"); }
  return q;
}, ["A missing leg is found by subtracting, not adding, the squares.", "Square the hypotenuse, subtract the square of the known leg, then take the square root."]);

E("u1-is-right", 1, ["9.13"], 1, "gen", function(){
  var isRight=pick([true,false]);
  var a,b,c;
  if(isRight){ var tr=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]]); a=tr[0]; b=tr[1]; c=tr[2]; }
  else { a=ri(3,9); b=ri(4,12); c=ri(b+1,17); var t=0; while(a*a+b*b===c*c&&t<40){c++;t++;} }
  var sum=a*a+b*b, csq=c*c;
  var ansTxt=isRight?"Yes, it is a right triangle":"No, it is not a right triangle";
  var opts=isRight?[
    {t:"No, it is not a right triangle", fb:"Check the sums: the squares of the two shorter sides add to the square of the longest side."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, if the longest side is at the bottom", fb:"Position does not matter: only the side lengths decide."}
  ]:[
    {t:"Yes, it is a right triangle", fb:"Check the sums: "+(a*a)+" + "+(b*b)+" is "+sum+", which does not equal "+csq+"."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, since the sides are close to a triple", fb:"Close is not enough: the squares must match exactly."}
  ];
  var q=mcq("A triangle has sides of "+a+" cm, "+b+" cm and "+c+" cm, as shown. Is it a right triangle?", {t:ansTxt, fb:isRight?"Yes: "+(a*a)+" + "+(b*b)+" equals "+csq+".":"Right: "+(a*a)+" + "+(b*b)+" is "+sum+", not "+csq+"."}, opts,
    "Test the longest side against the other two: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+sum+" \\\\ "+c+"^{2} &= "+csq+" \\end{aligned} \\] "+(isRight?"The two values are equal, so the triangle <b>is a right triangle</b>.":"The two values differ, so the triangle <b>is not a right triangle</b>."),
    {a:a, b:b, c:c, isRight:isRight});
  q.figure=u1triFig(c,b,a,c+" cm",b+" cm",a+" cm");
  return q;
}, ["Square the two shorter sides and compare their sum with the square of the longest side.", "Add the squares of the two shorter sides first."]);

E("u1-only-right", 1, ["9.2"], 1, "var", varset([
  function(){
    var q=mcq("A triangle has sides of 4 cm, 6 cm and 8 cm. A student uses \\(4^{2} + 6^{2} = 8^{2}\\) to find a side and gets a wrong answer. Why did the method fail?",
      {t:"The theorem only works for right triangles, and this triangle is not right", fb:"Right: 16 + 36 is 52, not 64, so the triangle has no right angle."},
      [{t:"The student added the sides in the wrong order when using the theorem", fb:"Order of adding does not matter here: the triangle itself is the problem."},
       {t:"The theorem needs the sides to be measured in metres, not centimetres", fb:"Units do not limit the theorem: the shape of the triangle does."},
       {t:"The student should have used the two longest sides as the legs of the triangle", fb:"Swapping sides still cannot fix it: the triangle is not right."}],
      "\\(4^{2} + 6^{2} = 52\\), while \\(8^{2} = 64\\). The values differ, so the triangle has no right angle, and the theorem does not apply. The method failed because <b>the theorem only works for right triangles</b>.",
      {mode:"not-right"}); q.figure=triSVG(8,6,4,{L:["A","B","C"],side:["8 cm","6 cm","4 cm"]}); return q;
  },
  function(){
    return mcq("Which statement about the Pythagorean theorem is correct?",
      {t:"It connects the sides of right triangles only", fb:"Right: the relationship holds exactly when the triangle has a right angle."},
      [{t:"It connects the sides of every triangle, right or not", fb:"Test a 2, 3, 4 triangle: 4 + 9 is not 16, so it fails there."},
       {t:"It connects equilateral triangles only", fb:"An equilateral triangle has no right angle, so the theorem cannot apply."},
       {t:"It connects the sides of triangles drawn with the right angle at the top", fb:"Position does not matter: having a right angle is what matters."}],
      "For any triangle with no right angle, the squares fail to match, as \\(2^{2} + 3^{2} = 13 \\ne 16 = 4^{2}\\) shows. The correct statement is <b>it connects the sides of right triangles only</b>.",
      {mode:"statement"});
  },
  function(){
    var q=mcq("A triangle has sides of 5 cm, 5 cm and 9 cm. A student applies the square test to it. What does the test show?",
      {t:"The test shows it is not right, since 25 + 25 does not equal 81", fb:"Right: the test itself shows the triangle has no right angle."},
      [{t:"The theorem cannot be used because two sides are equal in length", fb:"Equal legs are fine in a right triangle: the squares are the test."},
       {t:"The theorem cannot be used because the sides are odd numbers", fb:"Odd sides are fine: 9, 12, 15 uses odd sides and is right."},
       {t:"The theorem cannot be used because the triangle is too large", fb:"Size does not matter: only the square relationship matters."}],
      "\\(5^{2} + 5^{2} = 50\\), while \\(9^{2} = 81\\). Since the values differ, the triangle is not right, so <b>the theorem does not apply to it as a right triangle</b>.",
      {mode:"isosceles"}); q.figure=triSVG(9,5,5,{L:["A","B","C"],side:["9 cm","5 cm","5 cm"]}); return q;
  }
]), ["Test the square relationship first before trusting the theorem.", "Square the two shorter sides and compare with the square of the longest side."]);

E("u1-triple-find", 1, ["9.14"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var k=ri(2,5); var a=base[0]*k, b=base[1]*k, c=base[2]*k;
  var miss=pick(["a","b","c"]); var ans=(miss==="a")?a:(miss==="b")?b:c;
  var givenTxt=(miss==="a")?("one leg of "+b+" cm and a hypotenuse of "+c+" cm"):((miss==="b")?("one leg of "+a+" cm and a hypotenuse of "+c+" cm"):("legs of "+a+" cm and "+b+" cm"));
  var q=numq("A right triangle is a scaled copy of the "+base[0]+", "+base[1]+", "+base[2]+" triple, scaled by a factor of "+k+". It has "+givenTxt+". Find the missing side length, in centimetres.", ans, 0.01,
    "Scale every side of the triple by "+k+": \\[ \\begin{aligned} "+base[0]+" \\times "+k+" &= "+a+" \\\\ "+base[1]+" \\times "+k+" &= "+b+" \\\\ "+base[2]+" \\times "+k+" &= "+c+" \\end{aligned} \\] The missing side is <b>"+ans+" cm</b>.",
    {base:base, k:k, miss:miss}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[(miss==="c"?"?":c+" cm"),(miss==="b"?"?":b+" cm"),(miss==="a"?"?":a+" cm")]}); return q;
}, ["Scaling a triple by the same factor keeps it a triple.", "Multiply each side of the base triple by the scale factor."]);

E("u1-ladder-context", 1, ["9.12"], 1, "gen", function(){
  var mode=pick(["reach","distance","foot"]);
  if(mode==="reach"){
    var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
    var foot=tr[0], height=tr[1], lad=tr[2];
    var place=pick(["in St. John's","in Gander","in Corner Brook","in Clarenville"]);
    var q=numq("A ladder "+lad+" m long leans against a wall "+place+". Its foot stands "+foot+" m from the wall, and the wall meets the ground at a right angle. How high up the wall does the ladder reach, in metres?", height, 0.01,
      "The ladder is the hypotenuse: \\[ \\begin{aligned} h^{2} &= "+lad+"^{2} - "+foot+"^{2} \\\\ &= "+(lad*lad)+" - "+(foot*foot)+" \\\\ &= "+(height*height)+" \\\\ h &= "+height+" \\end{aligned} \\] The ladder reaches <b>"+height+" m</b> up the wall.",
      {mode:"reach", foot:foot, height:height, lad:lad});
    q.figure=u1triFig(lad,height,foot,lad+" m",height+" m",foot+" m");
    return q;
  }
  if(mode==="foot"){
    var base3=pick([[3,4,5],[5,12,13],[8,15,17]]);
    var k3=ri(1,4); var ft=base3[0]*k3, ht=base3[1]*k3, ld=base3[2]*k3;
    var q3=numq("A support cable "+ld+" m long runs from the top of a pole to a point on level ground. The cable touches the ground level at the top of the pole, which is "+ht+" m tall, and the pole meets the ground at a right angle. How far from the base of the pole is the cable anchored, in metres?", ft, 0.01,
      "The cable is the hypotenuse: \\[ \\begin{aligned} f^{2} &= "+ld+"^{2} - "+ht+"^{2} \\\\ &= "+(ld*ld)+" - "+(ht*ht)+" \\\\ &= "+(ft*ft)+" \\\\ f &= "+ft+" \\end{aligned} \\] The anchor is <b>"+ft+" m</b> from the base.",
      {mode:"foot", ft:ft, ht:ht, ld:ld});
    q3.figure=u1triFig(ld,ht,ft,ld+" m",ht+" m","?");
    return q3;
  }
  var tr2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var sc=ri(1,4); var east=tr2[0]*sc, north=tr2[1]*sc, hyp=tr2[2]*sc;
  var q2=numq("A ferry dock lies "+east+" km east and "+north+" km north of a harbour, in a straight line across open water at a right angle to both legs of the trip. What is the straight-line distance from the harbour to the dock, in kilometres?", hyp, 0.01,
    "The straight line is the hypotenuse: \\[ \\begin{aligned} d^{2} &= "+east+"^{2} + "+north+"^{2} \\\\ &= "+(east*east)+" + "+(north*north)+" \\\\ &= "+(hyp*hyp)+" \\\\ d &= "+hyp+" \\end{aligned} \\] The straight-line distance is <b>"+hyp+" km</b>.",
    {mode:"distance", east:east, north:north, hyp:hyp});
  q2.figure=u1triFig(hyp,north,east,"?",north+" km",east+" km");
  return q2;
}, ["Draw the situation as a right triangle and mark the hypotenuse.", "Decide whether the unknown is a leg (subtract the squares) or the hypotenuse (add the squares)."]);

E("u1-right-test-decide", 1, ["9.13"], 3, "gen", function(){
  var mode=pick(["close-call","claim","swap"]);
  if(mode==="swap"){
    var tb=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var ks=ri(1,4); var sa=tb[0]*ks, sb=tb[1]*ks, sc2=tb[2]*ks;
    var optsS=[{t:"Yes, since the longest was squared first", fb:"Order of writing does not matter: what matters is that the sum matches."},
               {t:"No, all sides must differ", fb:"Legs may be equal in some right triangles, and here the square test passes."},
               {t:"No, since a triple must be unscaled", fb:"Scaling a triple by "+ks+" keeps the square relationship true."}];
    var sunit=pick(["cm","m"]);
    var q=mcq("A triangle has sides of "+sa+" "+sunit+", "+sb+" "+sunit+" and "+sc2+" "+sunit+". A student tests it by computing \\("+sb+"^{2} + "+sa+"^{2}\\) and comparing with \\("+sc2+"^{2}\\). Is the triangle a right triangle?", {t:"Yes, it is a right triangle", fb:"Right: "+(sa*sa)+" + "+(sb*sb)+" equals "+(sc2*sc2)+"."}, optsS,
      "Add the squares of the two shorter sides: \\[ \\begin{aligned} "+sa+"^{2} + "+sb+"^{2} &= "+(sa*sa+sb*sb)+" \\\\ "+sc2+"^{2} &= "+(sc2*sc2)+" \\end{aligned} \\] The values match, so the triangle <b>is a right triangle</b>.",
      {mode:"swap", a:sa, b:sb, c:sc2}); q.figure=triSVG(sc2,sb,sa,{L:["A","B","C"],side:[sc2+" "+sunit,sb+" "+sunit,sa+" "+sunit]}); return q;
  }
  if(mode==="close-call"){
    var tr=pick([[6,8,10],[9,12,15],[12,16,20],[5,12,13],[8,15,17],[20,21,29]]);
    var a=tr[0], b=tr[1], c=tr[2]+pick([-1,1]);
    if(c<=b){c=tr[2]+1;}
    var isR=(a*a+b*b===c*c);
    var ansTxt=isR?"Yes, it is right":"No, it is not right";
    var other=isR?"No, it is not right":"Yes, it is right";
    var opts=[{t:other, fb:"Compute both sides: "+(a*a)+" + "+(b*b)+" is "+(a*a+b*b)+" and "+c+" squared is "+(c*c)+"."},
              {t:"Right only if it is marked", fb:"The lengths alone decide: the square test needs no drawing mark."},
              {t:"Not decidable", fb:"Nearly is decidable: the squares either match exactly or they do not."}];
    var cunit=pick(["m","cm"]);
    var q=mcq("A triangle has sides of "+a+" "+cunit+", "+b+" "+cunit+" and "+c+" "+cunit+". A classmate says it must be a right triangle because its sides are close to a familiar triple. Decide whether it is a right triangle.", {t:ansTxt, fb:"Right: "+(a*a)+" + "+(b*b)+" is "+(a*a+b*b)+", and "+c+" squared is "+(c*c)+"."}, opts,
      "Apply the test exactly: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a+b*b)+" \\\\ "+c+"^{2} &= "+(c*c)+" \\end{aligned} \\] "+(isR?"The values match, so it <b>is a right triangle</b>.":"The values do not match, so it is <b>not a right triangle</b>, even though it is close to a triple."),
      {mode:"close-call", a:a, b:b, c:c}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[c+" "+cunit,b+" "+cunit,a+" "+cunit]}); return q;
  }
  var t2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var kk2=ri(1,4); var a2=t2[0]*kk2, b2=t2[1]*kk2, c2=t2[2]*kk2;
  var opts2=[{t:"The claim is wrong: the longest side must be squared on its own first", fb:"Squaring a shorter side alone proves nothing about the triangle."},
             {t:"The claim is wrong: the sides must be added together before squaring", fb:"Adding first gives a different value, not the theorem test."},
             {t:"The claim is right: any matching square by itself proves a right angle", fb:"One square matching by itself is not the test: the sum must match."}];
  var q=mcq("To test whether a triangle with sides "+a2+", "+b2+" and "+c2+" is right, a student checks only that \\("+b2+"^{2} = "+(b2*b2)+"\\) and claims this proves a right angle. Judge the claim.",
    {t:"The claim is wrong: the two shorter squares must add to the longest square", fb:"Right: "+(a2*a2)+" + "+(b2*b2)+" equals "+(c2*c2)+", and that full test is what proves it."}, opts2,
    "The full test compares a sum with the longest square: \\[ \\begin{aligned} "+a2+"^{2} + "+b2+"^{2} &= "+(a2*a2)+" + "+(b2*b2)+" \\\\ &= "+(c2*c2)+" = "+c2+"^{2} \\end{aligned} \\] One square on its own proves nothing. The claim is <b>wrong: the two shorter squares must add to the longest square</b>.",
    {mode:"claim", a:a2, b:b2, c:c2}); q.figure=triSVG(c2,b2,a2,{L:["A","B","C"],side:[c2+"",b2+"",a2+""]}); return q;
}, ["Closeness to a triple is not proof: the squares must match exactly.", "Compute the sum of the two shorter squares and the longest square, then compare."]);

E("u1-best-estimate", 1, ["6.30"], 3, "gen", function(){
  var n=u1nonSquare(20,150); var root=Math.sqrt(n);
  var best=u1r1(root);
  var vals=[u1r1(best-0.4), best, u1r1(best+0.4), u1r1(best+0.8)];
  var uniq=[]; vals.forEach(function(v){if(v>0&&uniq.indexOf(v)<0){uniq.push(v);}});
  while(uniq.length<4){uniq.push(u1r1(best+uniq.length));}
  var opts=uniq.filter(function(v){return v!==best;}).slice(0,3).map(function(v){return {t:fmtF(v,1), fb:"Square it: "+fmt(v)+" squared is "+fmt(Math.round(v*v*100)/100)+", farther from "+n+" than the best choice."};});
  var q=mcq("Which value is the best estimate of \\(\\sqrt{"+n+"}\\), to one decimal place?", {t:fmt(best), fb:"Yes: "+fmt(best)+" squared is "+fmt(Math.round(best*best*100)/100)+", closest to "+n+"."}, opts,
    "Bracket the root first, then test nearby tenths: \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmt(root)+" \\\\ &\\approx "+fmt(best)+" \\end{aligned} \\] The best estimate is <b>"+fmt(best)+"</b>.",
    {n:n, best:best});
  var k=Math.floor(root);
  q.figure=u1numLineSVG(k,k+1);
  return q;
}, ["Bracket the root between two whole numbers first.", "Square the nearby one-decimal values and pick the square closest to the number."]);

E("u1-diagonal-square", 1, ["9.12"], 3, "gen", function(){
  var s=ri(4,20);
  var diag=u1r1(s*Math.sqrt(2));
  var ctx=pick(["A square garden plot in Corner Brook","A square field near Bay Roberts","A square skating rink in Mount Pearl","A square classroom rug in a St. John's school"]);
  var q=numq(ctx+" has sides of "+s+" m. A line runs straight across it from one corner to the opposite corner. Find the length of that line, to one decimal place, in metres.", diag, 0.06,
    "The path is the hypotenuse of a right triangle with both legs equal to "+s+": \\[ \\begin{aligned} d^{2} &= "+s+"^{2} + "+s+"^{2} \\\\ &= "+(s*s)+" + "+(s*s)+" \\\\ &= "+(2*s*s)+" \\\\ d &= \\sqrt{"+(2*s*s)+"} \\approx "+fmt(diag)+" \\end{aligned} \\] The path is <b>"+fmt(diag)+" m</b> long.",
    {s:s}); q.figure=m8RectDiagSVG(s,s,s+" m",s+" m","?"); return q;
}, ["Split the square along the path: it becomes a right triangle with two equal legs.", "Square the side, double it, then take the square root and round."]);

E("u1-square-plot-perimeter", 1, ["5.2"], 3, "gen", function(){
  var r=ri(5,20); var area=r*r; var per=4*r;
  var ctx=pick(["A square vegetable plot","A square quilt top","A square sandbox","A square photo print"]);
  var edge=pick(["Fencing is placed around all four sides of it. How many metres of fencing are needed?","A border is sewn around all four sides of it. How many metres of border are needed?","Edging is placed around all four sides of it. How many metres of edging are needed?","A frame runs around all four sides of it. How many metres of framing are needed?"]);
  var q=numq(ctx+" has an area of "+area+" square metres. "+edge, per, 0.01,
    "Find the side length from the area first, then the perimeter: \\[ \\begin{aligned} \\text{side} &= \\sqrt{"+area+"} = "+r+" \\\\ \\text{fencing} &= 4 \\times "+r+" \\\\ &= "+per+" \\end{aligned} \\] The fencing needed is <b>"+per+" m</b>.",
    {r:r, area:area}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["The side of a square is the square root of its area.", "Find the side length first, then multiply by 4 for the four sides."]);
