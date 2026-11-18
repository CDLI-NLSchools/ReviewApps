// Math 2201 Unit 4: Radicals question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1406 to 1518).
// CRMARKS: u4-mixed-to-entire=1
// CRMARKS: u4-entire-to-mixed=2
// CRMARKS: u4-simplify-add=2
// CRMARKS: u4-multiply=2
// CRMARKS: u4-rationalize=1
// CRMARKS: u4-restrictions=1
// CRMARKS: u4-radical-equation=2
// CRMARKS: u4-extraneous=3
// CRMARKS: u4-defined-count=3
// CRMARKS: u4-repair-simplify=2
// CRMARKS: u4-order=2
// CRMARKS: u4-variable-evaluate=1
// CRMARKS: u4-defined-boundary=1
// CRMARKS: u4-restriction-boundary=1
// CRMARKS: u4-cube-equation-shifted=2
// CRMARKS: u4-extraneous-valid-root=2
// CRMARKS: u4-model-solve-variable=2
/* ============ Unit 4: Radicals ============ */
function radStr(a,b){return (a===1?"":a)+"\u221A"+b;}
function radT(a,b){return "\\("+(a===1?"":a)+"\\sqrt{"+b+"}\\)";}
function sqrtT(x){return "\\(\\sqrt{"+x+"}\\)";}
function rad3T(a,b){return "\\("+(a===1?"":a)+"\\sqrt[3]{"+b+"}\\)";}
function cbrtT(x){return "\\(\\sqrt[3]{"+x+"}\\)";}
E("u4-mixed-to-entire",4,["1.1"],1,"gen",function(){
  var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15]);var inside=a*a*b;
  var frame=pick(["Express "+radT(a,b)+" as an entire radical.","Which entire radical is equal to "+radT(a,b)+"?"]);
  return mcq(frame,sqrtT(inside),[sqrtT(a*b),sqrtT(a*a+b),sqrtT(a*a*b*b)],
    "Bring the outside number in by squaring it: \\("+a+"^2 \\times "+b+" = "+(a*a)+" \\times "+b+" = "+inside+"\\), so "+radT(a,b)+" = "+sqrtT(inside)+".",{a:a,b:b});
});
E("u4-entire-to-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,12),b=pick([2,3,5,6,7,10,11,13,14,15]);var n=a*a*b;
  var frame=pick(["Express "+sqrtT(n)+" as a mixed radical in simplest form.","Write "+sqrtT(n)+" as a mixed radical in simplest form."]);
  return mcq(frame,radT(a,b),[radT(a+1,b),radT(a,b+1),sqrtT(n-1)],
    "Find the largest perfect square dividing \\("+n+"\\): \\("+n+" = "+(a*a)+" \\times "+b+"\\). So "+sqrtT(n)+" = "+radT(a,b)+".",{a:a,b:b,n:n});
});
E("u4-simplify-add",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);var a1=pick([2,3,4,5]);var a2=pick([2,3,4,5,6].filter(function(x){return x!==a1;}));
  var n1=a1*a1*b,n2=a2*a2*b;var tot=a1+a2;
  return mcq("Simplify: "+sqrtT(n1)+" + "+sqrtT(n2)+".",
    radT(tot,b),[radT(tot+1,b),radT(tot,b+1),sqrtT(n1+n2)],
    sqrtT(n1)+" = "+radT(a1,b)+" and "+sqrtT(n2)+" = "+radT(a2,b)+". Like radicals add: \\("+a1+" + "+a2+" = "+tot+"\\), so the sum is "+radT(tot,b)+". (You cannot just add the numbers under the roots.)",{b:b,a1:a1,a2:a2});
});
E("u4-multiply",4,["1.6"],2,"gen",function(){
  var k=pick([2,3,5,6,7,10,11,13,14,15]);var i=ri(1,3),j=ri(1,3);var x=k*i*i,y=k*j*j;
  return numq("The product \\(\\sqrt{"+x+"} \\times \\sqrt{"+y+"}\\) is a whole number. What is it?",
    k*i*j,0.011,"\\[\\begin{aligned} \\sqrt{"+x+"} \\times \\sqrt{"+y+"} &= \\sqrt{"+x+" \\times "+y+"} \\\\ &= \\sqrt{"+(x*y)+"} \\end{aligned}\\] Notice \\("+x+" = "+k+" \\times "+(i*i)+"\\) and \\("+y+" = "+k+" \\times "+(j*j)+"\\), so the product is <b>\\("+k+" \\times "+i+" \\times "+j+" = "+(k*i*j)+"\\)</b>.",{p:[x,y]});
});
E("u4-rationalize",4,["1.7"],1,"gen",function(){
  var d=pick([2,3,5,6,7,10,11,13,14,15]);var c=d*ri(1,5);
  var frame=pick(["Rationalize the denominator: \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\).","Write \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\) with a rational denominator."]);
  return mcq(frame,radT(c/d,d),[sqrtT(c*d),"\\(\\frac{"+c+"\\sqrt{"+d+"}}{"+d+"}\\)","\\("+(c/d)+"\\sqrt{"+(d*d)+"}\\)"],
    "Multiply top and bottom by "+sqrtT(d)+": \\[\\begin{aligned} \\frac{"+c+"}{\\sqrt{"+d+"}} &= \\frac{"+c+"\\sqrt{"+d+"}}{"+d+"} \\\\ &= "+(c/d)+"\\sqrt{"+d+"} \\end{aligned}\\] The denominator is now the rational number \\("+d+"\\).",{c:c,d:d});
});
E("u4-restrictions",4,["1.5"],1,"gen",function(){
  var a=ri(-6,15);var flipped=Math.random()<0.5;
  var rad=flipped?"("+a+" - x)":"(x "+(a>=0?"- "+a:"+ "+(-a))+")";
  var frame=pick(["For which values of x is the expression \\(\\sqrt{"+rad+"}\\) defined?","State the restriction on x so that \\(\\sqrt{"+rad+"}\\) is a real number."]);
  return mcq(frame,
    flipped?"\\(x \\leq "+a+"\\)":"\\(x \\geq "+a+"\\)",[flipped?"\\(x \\geq "+a+"\\)":"\\(x \\leq "+a+"\\)","\\(x > 0\\)","All real numbers"],
    "The radicand cannot be negative: "+(flipped?"\\("+a+" - x \\ge 0\\) gives \\(x \\le "+a+"\\)":"\\(x "+(a>=0?"- "+a:"+ "+(-a))+" \\ge 0\\) gives \\(x \\ge "+a+"\\)")+".",{a:a,flipped:flipped});
});
E("u4-radical-equation",4,["1.9"],2,"gen",function(){
  var b=ri(3,7),a=ri(1,15);var x=b*b-a;
  return numq("Solve \\(\\sqrt{x + "+a+"} = "+b+"\\). Give the value of x.",
    x,0.011,"Square both sides: \\[\\begin{aligned} x + "+a+" &= "+(b*b)+" \\\\ x &= "+(b*b)+" - "+a+" \\\\ &= "+x+" \\end{aligned}\\] Check: \\(\\sqrt{"+x+" + "+a+"} = \\sqrt{"+(b*b)+"} = "+b+"\\) \u2713.",{a:a,b:b});
});
E("u4-extraneous",4,["1.11"],3,"gen",function(){
  var b=pick([1,2,3,4]);var r=2*b+ri(1,6);var e=2*b+1-r;var a=b*b-r*e;
  var radicand="x + "+a;
  var frame=pick([
    "Solving \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring both sides gives two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?",
    "A student solves \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring and gets two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which candidate is extraneous, and why?",
    "Squaring both sides of \\(\\sqrt{"+radicand+"} = x - "+b+"\\) produces the candidates \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?"]);
  return mcq(frame,
    "\\(x = "+e+"\\) is extraneous \u2014 substituting it makes the right side negative, but a square root is never negative",
    ["\\(x = "+r+"\\) is extraneous - it is the larger answer, and the larger answer from squaring is always false","Neither is extraneous - squaring both sides never creates false roots, so both candidates work in the original equation","Both are extraneous, so the equation has no solution - each candidate fails when substituted back into the equation"],
    "Check \\(x = "+e+"\\): \\(\\sqrt{"+e+" + "+a+"} = \\sqrt{"+(e+a)+"} = "+Math.sqrt(e+a)+"\\), but \\(x - "+b+" = "+(e-b)+" < 0\\). A principal square root cannot equal a negative number, so \\(x = "+e+"\\) crept in when we squared. \\(x = "+r+"\\) checks: \\(\\sqrt{"+(r+a)+"} = "+Math.sqrt(r+a)+" = "+(r-b)+"\\) \u2713.",{b:b,r:r,e:e,a:a});
});
E("u4-defined-count",4,["1.5"],3,"gen",function(){
  function sub(v){return v>=0?"x - "+v:"x + "+(-v);}
  var mode=ri(0,2),prompt="",sol="",ans=0;
  if(mode===0){
    var a=ri(-6,4);var b=a+ri(5,14);ans=b-a+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+sub(a)+"} + \\sqrt{"+b+" - x}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\ge "+a+"\\), and the second gives \\(x \\le "+b+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+a+"\\) to \\("+b+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values. Either condition on its own would allow more.";
  }else if(mode===1){
    var a2=ri(-6,4);var b2=a2+ri(5,14);ans=b2-a2;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\frac{\\sqrt{"+sub(a2)+"}}{\\sqrt{"+b2+" - x}}\\) defined?";
    sol="The numerator needs \\(x \\ge "+a2+"\\). The denominator needs more: a square root sitting in a denominator must be positive, not just non-negative, so \\("+b2+" - x > 0\\) and \\(x < "+b2+"\\). The integers from \\("+a2+"\\) to \\("+(b2-1)+"\\) inclusive total <b>\\("+ans+"\\)</b> values.";
  }else{
    var hi=ri(2,14);var lo=hi-ri(5,14);ans=hi-lo+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+hi+" - x} + \\sqrt{"+sub(lo)+"}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\le "+hi+"\\), and the second gives \\(x \\ge "+lo+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+lo+"\\) to \\("+hi+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values.";
  }
  return numq(prompt,ans,0.011,sol,{mode:mode});
});
E("u4-repair-simplify",4,["1.2"],3,"gen",function(){
  var sqf=[2,3,5,6,7,10,11,13,14,15];
  var mode=ri(0,1);
  if(mode===0){
    var f=pick([2,3]);var mult=ri(2,5);var a=f*mult;var b=pick(sqf);
    var N=a*a*b;var p=a/f;var qq=b*f*f;
    return numq("A student simplifies \\(\\sqrt{"+N+"}\\) and writes \\("+p+"\\sqrt{"+qq+"}\\). The value is correct, but the radicand still contains a square factor, so the radical is not fully simplified. In the fully simplified form, what is the coefficient of the square root?",
      a,0.011,
      "The radicand \\("+qq+"\\) still contains the square factor \\("+f+"^2 = "+(f*f)+"\\). Pulling it out multiplies the coefficient by \\("+f+"\\): \\("+p+" \\times "+f+" = "+a+"\\), and indeed \\(\\sqrt{"+N+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = \\)<b>\\("+a+"\\sqrt{"+b+"}\\)</b>.",
      {N:N,p:p,qq:qq});
  }
  var a2=pick([4,5,6,7,8,9,10]);var b2=pick(sqf);var N2=a2*a2*b2;var pw=a2+pick([-1,1]);if(pw<2)pw=a2+1;
  return numq("A student simplifies \\(\\sqrt{"+N2+"}\\) and writes \\("+pw+"\\sqrt{"+b2+"}\\). Checking the value, \\("+pw+"^2 \\times "+b2+" \\ne "+N2+"\\), so the student\u2019s answer is wrong. What is the coefficient of the square root in the fully simplified form?",
    a2,0.011,
    "Redo the simplification from the start: \\("+N2+" = "+(a2*a2)+" \\times "+b2+"\\), and \\("+(a2*a2)+"\\) is a perfect square, so \\(\\sqrt{"+N2+"} = \\)<b>\\("+a2+"\\sqrt{"+b2+"}\\)</b>. The student\u2019s radicand was right, but the coefficient was not the square root of "+(a2*a2)+".",
    {N:N2,pw:pw});
});
E("u4-order",4,["1.4"],2,"gen",function(){
  var base=ri(5,10),g1=ri(2,4),g2=ri(2,4),g3=ri(2,5);
  var ins=[base,base+g1,base+g1+g2,base+g1+g2+g3];
  function render(n){var c=Math.floor(Math.sqrt(n));if(c*c===n)return ""+c;var r=n;var co=1;for(var d=2;d*d<=r;d++){while(r%(d*d)===0){r/=(d*d);co*=d;}}return (co>1?co:"")+"\\sqrt{"+r+"}";}
  var items=ins.map(function(n){return {s:render(n),v:Math.sqrt(n)};});
  var sorted=items.slice().sort(function(x,y){return x.v-y.v;});
  function list(arr){return "\\("+arr.map(function(o){return o.s;}).join(", ")+"\\)";}
  var asc=list(sorted);
  var shown=shuffle(items.slice());
  var shownStr=list(shown);
  var rev=list(sorted.slice().reverse());
  var rot=list([sorted[1],sorted[2],sorted[3],sorted[0]]);
  var midswap=list([sorted[0],sorted[2],sorted[1],sorted[3]]);
  return mcq("Which list shows these radicals in order from least to greatest? "+shownStr,
    asc,[rev,rot,midswap],
    "Square each value (or estimate): "+sorted.map(function(o){return "\\("+o.s+" \\approx "+fmt(o.v)+"\\)";}).join(", ")+". Ordered least to greatest: <b>"+asc+"</b>.",{items:items});
});

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 4 (Radical prerequisites): seven borrowed entries and one
   authored micro-item. Provenance (host id: source, verified by
   draw sweep):
   - u4-pk-radical-mixed: copied from math-1201 u2-radical-mixed, indicator 1.16
     (the same generator is also copied into Unit 3 under its own host id).
   - u4-pk-radical-entire: copied from math-1201 u2-radical-entire, indicator 1.17.
   - u4-pk-laws-integral: copied from math-1201 u2-laws-integral, indicator 1.6.
   - u4-pk-laws-rational: copied from math-1201 u2-laws-rational, indicator 1.6.
   - u4-pk-evaluate-exp: copied from math-1201 u2-evaluate-exp, indicators 1.6, 1.3.
   - u4-pk-which-is-solution: copied from math-9 u5-which-is-solution, indicator 8.20.
   - u4-pk-solve-two-step: copied from math-9 u5-solve-two-step, indicator 8.18
     (shared source with Units 3 and 8; see the Unit 3 note).
   - u4-pk-defined: authored for the Math 2201 PK tranche (spec
     construct u4-pk-defined: numerical definedness, the one named
     Cluster 4 subskill no feeder entry samples). It assesses the
     numerical case only; variable radicands are host content.
   The Math 1201 systems entries were read and not borrowed: they
   assess systems, not the single-equation solving this cluster
   names. Indicator tags are support tags, not assessed targets:
   assessed targets are in pkSrc, the full dependent list in pkFor. */
E("u4-pk-radical-mixed", 4, ["1.2"], 1, "gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,N,mlist;
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
E("u4-pk-radical-entire", 4, ["1.1"], 1, "gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,mlist;
  if(idx===2){k=ri(2,12);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30];}
  else if(idx===3){k=ri(2,6);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30];}
  else{k=ri(2,3);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);
  var ansN=Math.pow(k,idx)*m;
  var key="\\("+u2radS(idx,ansN)+"\\)";
  var candN=[k*m,Math.pow(k,idx+1)*m,Math.pow(k+1,idx)*m,Math.pow(k,idx)*(m+1),Math.pow(k,idx-1)*m];
  var ds=u2pickS3(key,candN.map(function(v){return "\\("+u2radS(idx,v)+"\\)";}));
  return mcq("Express \\("+k+u2radS(idx,m)+"\\) as an <b>entire radical</b>.",
    key,ds,
    "Bring the coefficient \\("+k+"\\) under the radical sign by writing it as a root: \\("+k+" = "+u2radS(idx,Math.pow(k,idx))+"\\). Then \\["+
    "\\begin{aligned} "+k+u2radS(idx,m)+" &= "+u2radS(idx,Math.pow(k,idx))+" \\times "+u2radS(idx,m)+" \\\\ &= "+u2radS(idx,ansN)+" \\end{aligned} \\]"+
    " The entire radical is <b>\\("+u2radS(idx,ansN)+"\\)</b>.",
    {idx:idx,k:k,m:m,ansN:ansN});
});
E("u4-pk-laws-integral", 4, ["1.6"], 2, "gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var a=ri(2,9),b=ri(2,9),t=0;
    while((a*b===a+b||Math.abs(a-b)===a+b||a+b+1===a*b)&&t<100){a=ri(2,9);b=ri(2,9);t++;}
    var key="\\(x^{"+(a+b)+"}\\)";
    var ds=u2pickS3(key,["\\(x^{"+(a*b)+"}\\)","\\(x^{"+Math.abs(a-b)+"}\\)","\\(x^{"+(a+b+1)+"}\\)","\\(x^{"+(a+b-1)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a+"} \\times x^{"+b+"}\\)",
      key,ds,
      "When multiplying powers with the same base, add the exponents: \\["+
      "\\begin{aligned} x^{"+a+"} \\times x^{"+b+"} &= x^{"+a+" + "+b+"} \\\\ &= x^{"+(a+b)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a+b)+"}\\)</b>.",
      {mode:mode,a:a,b:b,keyStr:key});
  }
  if(mode===2){
    var a2=ri(5,12),b2=ri(2,10),t2=0;
    while((a2-b2<1||a2+b2===a2||a2-b2+1===a2)&&t2<100){a2=ri(5,12);b2=ri(2,a2-2);t2++;}
    var key2="\\(x^{"+(a2-b2)+"}\\)";
    var ds2=u2pickS3(key2,["\\(x^{"+(a2+b2)+"}\\)","\\(x^{"+a2+"}\\)","\\(x^{"+(a2-b2+1)+"}\\)","\\(x^{"+(a2*b2)+"}\\)"]);
    return mcq("Simplify: \\("+FR("x^{"+a2+"}","x^{"+b2+"}")+"\\)",
      key2,ds2,
      "When dividing powers with the same base, subtract the exponents: \\["+
      "\\begin{aligned} "+FR("x^{"+a2+"}","x^{"+b2+"}")+" &= x^{"+a2+" - "+b2+"} \\\\ &= x^{"+(a2-b2)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a2-b2)+"}\\)</b>.",
      {mode:mode,a:a2,b:b2,keyStr:key2});
  }
  if(mode===3){
    var a3=ri(2,4),b3=ri(2,4);
    if(a3===2&&b3===2)a3=3;
    var key3="\\(x^{"+(a3*b3)+"}\\)";
    var ds3=u2pickS3(key3,["\\(x^{"+(a3+b3)+"}\\)","\\(x^{"+Math.pow(a3,b3)+"}\\)","\\(x^{"+Math.pow(b3,a3)+"}\\)","\\(x^{"+(a3*b3+2)+"}\\)"]);
    return mcq("Simplify: \\(\\left(x^{"+a3+"}\\right)^{"+b3+"}\\)",
      key3,ds3,
      "When a power is raised to a power, multiply the exponents: \\["+
      "\\begin{aligned} \\left(x^{"+a3+"}\\right)^{"+b3+"} &= x^{"+a3+" \\times "+b3+"} \\\\ &= x^{"+(a3*b3)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a3*b3)+"}\\)</b>.",
      {mode:mode,a:a3,b:b3,keyStr:key3});
  }
  if(mode===4){
    var a4=ri(2,6);
    var key4="\\(x^{"+a4+"}y^{"+a4+"}\\)";
    var ds4=u2pickS3(key4,["\\(x^{"+a4+"}y\\)","\\(xy^{"+a4+"}\\)","\\((xy)^{"+(a4*a4)+"}\\)"]);
    return mcq("Simplify: \\((xy)^{"+a4+"}\\)",
      key4,ds4,
      "A power of a product applies the exponent to each factor: \\["+
      "\\begin{aligned} (xy)^{"+a4+"} &= x^{"+a4+"}y^{"+a4+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+a4+"}y^{"+a4+"}\\)</b>.",
      {mode:mode,a:a4,keyStr:key4});
  }
  if(mode===5){
    var a5=ri(3,8),b5=ri(3,8),c5=ri(3,8),d5=ri(3,8);
    var key5="\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)";
    var ds5=u2pickS3(key5,["\\(x^{"+(a5*c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5+c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5*c5)+"}y^{"+(b5+d5)+"}\\)","\\(x^{"+Math.abs(a5-c5)+"}y^{"+(b5+d5)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"}\\)",
      key5,ds5,
      "Group the powers base by base and add exponents for each base: \\["+
      "\\begin{aligned} x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"} &= x^{"+a5+" + "+c5+"}y^{"+b5+" + "+d5+"} \\\\ &= x^{"+(a5+c5)+"}y^{"+(b5+d5)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)</b>.",
      {mode:mode,a:a5,b:b5,c:c5,d:d5,keyStr:key5});
  }
  var b6=ri(2,8),c6=pick([3,4,5,6,7]);
  var key6="\\("+c6+"y^{"+b6+"}\\)";
  var ds6=u2pickS3(key6,["\\(0\\)","\\("+c6+"xy^{"+b6+"}\\)","\\(y^{"+b6+"}\\)"]);
  return mcq("Simplify: \\("+c6+"x^0y^{"+b6+"}\\)",
    key6,ds6,
    "Any nonzero base to the exponent \\(0\\) equals \\(1\\), so \\(x^0 = 1\\) and the factor \\(x\\) drops out without changing the coefficient: \\["+
    "\\begin{aligned} "+c6+"x^0y^{"+b6+"} &= "+c6+"(1)y^{"+b6+"} \\\\ &= "+c6+"y^{"+b6+"} \\end{aligned} \\]"+
    " The simplified form is <b>\\("+c6+"y^{"+b6+"}\\)</b>.",
    {mode:mode,b:b6,c:c6,keyStr:key6});
});
E("u4-pk-laws-rational", 4, ["1.6"], 2, "gen",function(){
  var base=pick(["x","y","z","t"]),mode=ri(1,3);
  var p=ri(1,7),q=pick([2,3,4,5,6]),r=ri(1,7),s=pick([2,3,4,5,6]),t=0;
  while(t<200){var rr1=u2red(p,q),rr2=u2red(r,s);if(rr1[1]>=2&&rr2[1]>=2)break;p=ri(1,7);q=pick([2,3,4,5,6]);r=ri(1,7);s=pick([2,3,4,5,6]);t++;}
  p=rr1[0];q=rr1[1];r=rr2[0];s=rr2[1];
  var eN,eD,lawText,exprStr;
  if(mode===1){eN=p*s+r*q;eD=q*s;lawText="When multiplying powers with the same base, add the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=base+"^{"+FR(p,q)+"} \\times "+base+"^{"+FR(r,s)+"}";}
  else if(mode===2){eN=p*s-r*q;eD=q*s;var t2=0;while(eN===0&&t2<50){r=ri(1,7);var rr3=u2red(r,s);r=rr3[0];s=rr3[1];eN=p*s-r*q;eD=q*s;t2++;}
    lawText="When dividing powers with the same base, subtract the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=FR(base+"^{"+FR(p,q)+"}",base+"^{"+FR(r,s)+"}");}
  else{var kk=pick([2,3]);eN=p*kk;eD=q;lawText="When a power is raised to a power, multiply the exponents";
    exprStr="\\left("+base+"^{"+FR(p,q)+"}\\right)^{"+kk+"}";}
  var er=u2red(eN,eD);eN=er[0];eD=er[1];
  var key=u2expStr(base,eN,eD);
  var candPairs;
  if(mode===1)candPairs=[[p*s-r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else if(mode===2)candPairs=[[p*s+r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else candPairs=[[p*2,q],[p*3,q],[p+1,q]];
  var seenV={},ds=[];
  candPairs.forEach(function(pr){
    if(ds.length>=3)return;
    var cr=u2red(pr[0],pr[1]);
    if(cr[0]*eD===eN*cr[1])return;
    var vk=cr[0]+"/"+cr[1];if(seenV[vk])return;seenV[vk]=1;
    ds.push(u2expStr(base,cr[0],cr[1]));
  });
  var pad=2;while(ds.length<3){var cr2=u2red(eN+pad*eD,eD);ds.push(u2expStr(base,cr2[0],cr2[1]));pad++;}
  return mcq("Simplify: \\("+exprStr+"\\)",
    key,ds,
    lawText+": \\[ \\begin{aligned} "+exprStr+" &= "+(key.slice(2,-2))+" \\end{aligned} \\]"+
    " The simplified form is <b>"+key+"</b>.",
    {mode:mode,base:base,p:p,q:q,r:r,s:s,eN:eN,eD:eD,keyStr:key});
});
E("u4-pk-evaluate-exp", 4, ["1.6"], 1, "gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var n=pick([2,3,4]),r,m,t=0;
    if(n===2)r=ri(2,14);else if(n===3)r=ri(2,7);else r=ri(2,4);
    m=ri(1,4);while(u2gcd(m,n)!==1&&t<60){m=ri(1,4);t++;}
    var b=Math.pow(r,n),ans=Math.pow(r,m);
    return numq("Evaluate \\("+b+"^{"+FR(m,n)+"}\\).",
      ans,0.001,
      "The denominator names the root and the numerator names the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+r+"^"+m+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,r:r,ans:ans});
  }
  if(mode===2){
    var fam=pick([2,5]),n2,m2,r2;
    if(fam===2){n2=pick([3,4,5]);r2=2;}else{n2=pick([2,3]);r2=5;}
    m2=ri(1,3);var tg2=0;while(u2gcd(m2,n2)!==1&&tg2<60){m2=ri(1,3);tg2++;}
    var b2=Math.pow(r2,n2),den=Math.pow(r2,m2),ans2=Math.round((1/den)*1e10)/1e10;
    return numq("Evaluate \\("+b2+"^{-"+FR(m2,n2)+"}\\). Give the exact decimal value.",
      ans2,0.001,
      "Take the root first, then the power, then the reciprocal for the negative exponent: \\["+
      "\\begin{aligned} "+b2+"^{-"+FR(m2,n2)+"} &= "+FR(1,b2+"^{"+FR(m2,n2)+" }")+" \\\\ &= "+FR(1,den+"")+" \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,b:b2,m:m2,n:n2,r:r2,ans:ans2});
  }
  if(mode===3){
    var nA=pick([2,3]),rA=nA===2?ri(2,10):ri(2,5),mA=ri(1,3),tgA=0;
    while(u2gcd(mA,nA)!==1&&tgA<60){mA=ri(1,3);tgA++;}
    var bA=Math.pow(rA,nA),vA=Math.pow(rA,mA);
    var nB=pick([2,3]),rB=nB===2?ri(2,10):ri(2,5),mB=ri(1,3),tgB=0;
    while(u2gcd(mB,nB)!==1&&tgB<60){mB=ri(1,3);tgB++;}
    var bB=Math.pow(rB,nB),vB=Math.pow(rB,mB),t3=0;
    while(bB===bA&&t3<50){rB=nB===2?ri(2,10):ri(2,5);bB=Math.pow(rB,nB);vB=Math.pow(rB,mB);t3++;}
    var ans3=vA+vB;
    return numq("Evaluate \\("+bA+"^{"+FR(mA,nA)+"} + "+bB+"^{"+FR(mB,nB)+"}\\).",
      ans3,0.001,
      "Evaluate each power separately, root first and then the power: \\["+
      "\\begin{aligned} "+bA+"^{"+FR(mA,nA)+"} &= "+vA+" \\\\ "+bB+"^{"+FR(mB,nB)+"} &= "+vB+" \\\\ "+vA+" + "+vB+" &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,bA:bA,mA:mA,nA:nA,bB:bB,mB:mB,nB:nB,ans:ans3});
  }
  var a4=ri(2,6),p4=ri(1,3),q4=p4+ri(1,4),ans4=Math.pow(a4,q4-p4);
  return numq("Evaluate \\("+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"}\\).",
    ans4,0.001,
    "The bases are the same, so add the exponents (the negative exponent subtracts): \\["+
    "\\begin{aligned} "+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"} &= "+a4+"^{"+(q4-p4)+"} \\\\ &= "+ans4+" \\end{aligned} \\]"+
    " The value is <b>\\("+ans4+"\\)</b>.",
    {mode:mode,a:a4,p:p4,q:q4,ans:ans4});
});
E("u4-pk-which-is-solution", 4, ["1.11"], 1, "gen", function () {
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
E("u4-pk-solve-two-step", 4, ["1.9"], 2, "gen", function () {
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
E("u4-pk-defined", 4, ["1.5"], 1, "gen", function () {
  var neg = ri(2, 64);
  var key = "\\(\\sqrt{-" + neg + "}\\)";
  var a = ri(2, 12), b = ri(2, 6), c = ri(3, 30);
  while (c === 4 || c === 9 || c === 16 || c === 25) c = ri(3, 30);
  var reals = ["\\(\\sqrt{" + (a * a) + "}\\)",
    "\\(\\sqrt[3]{-" + (b * b * b) + "}\\)",
    "\\(\\sqrt[3]{" + (b * b * b) + "}\\)",
    "\\(\\sqrt{" + c + "}\\)",
    "\\(-\\sqrt{" + (a * a) + "}\\)",
    "\\(\\sqrt{0}\\)"];
  var ds = shuffle(reals).slice(0, 3);
  return mcq("Which of these expressions is not a real number?",
    key, ds,
    "A square root of a negative number is not a real number, so \\(\\sqrt{-" + neg + "}\\) has no real value. The others all name real numbers: square roots of positive numbers and of zero are real, and a cube root of a negative number is real (a negative one). The expression that is not a real number is <b>\\(\\sqrt{-" + neg + "}\\)</b>.",
    { mode: "pk-defined", neg: neg });
});
/* ============ External drafting tranche (November 18, 2026) ============
   Twenty-one entries drafted externally (Gemini) under the External
   Authoring Pack against the Math 2201 Unit 4 assignment, and
   integrated after the intake sweep: 3,000 draws per entry with every
   key recomputed independently from the dealt parameters, plus the
   distractor length scan and the bank overlap check. Five entries
   carry intake repairs, each listed in the intake report
   (Intake-Report-Math-2201-Unit-4-Gemini-2026-11-18, review apps goal
   files). Two assigned entries were rejected from this tranche at
   intake (u4-equation-restriction-two and u4-extraneous-why). */

E("u4-mixed-to-entire-fraction",4,["1.1"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=y;y=x%y;x=t;}return x||1;}
  var p,q,r,tries=0,key,ds;
  do{
    p=ri(2,5);q=ri(p+1,7);r=pick([2,3,5,6,7,10,11,13]);tries++;
    if(gcd(p,q)!==1){ds=null;continue;}
    var n0=p*p*r,d0=q*q,g0=gcd(n0,d0);
    var kn=n0/g0,kd=d0/g0;
    key="\\(\\sqrt{"+frB(kn,kd)+"}\\)";
    var n1=p*r,d1=q,g1=gcd(n1,d1);
    var c1="\\(\\sqrt{"+frB(n1/g1,d1/g1)+"}\\)";
    var n2=p*p*p*r,d2=q*q,g2=gcd(n2,d2);
    var c2="\\(\\sqrt{"+frB(n2/g2,d2/g2)+"}\\)";
    var n3=p*r,d3=q*q,g3=gcd(n3,d3);
    var c3="\\(\\sqrt{"+frB(n3/g3,d3/g3)+"}\\)";
    var cands=[c1,c2,c3];
    ds=[];
    for(var i=0;i<cands.length;i++){if(cands[i]!==key&&ds.indexOf(cands[i])<0)ds.push(cands[i]);}
    if(ds.length<3)ds=null;
  }while(!ds&&tries<80);
  var knStr=frB(p*p*r/gcd(p*p*r,q*q),(q*q)/gcd(p*p*r,q*q));
  return mcq("Express \\("+frB(p,q)+"\\sqrt{"+r+"}\\) as an entire radical in simplest form.",
    key,ds,
    "Square the fractional coefficient before bringing it under the radical: \\(\\left("+frB(p,q)+"\\right)^2 = "+frB(p*p,q*q)+"\\). Multiply inside the square root: \\(\\sqrt{"+frB(p*p,q*q)+" \\times "+r+"} = \\sqrt{"+frB(p*p*r,q*q)+"}\\)"+(gcd(p*p*r,q*q)>1?", which reduces to \\(\\sqrt{"+knStr+"}\\)":"")+". The entire radical is <b>"+key+"</b>.",
    {p:p,q:q,r:r});
});

E("u4-mixed-to-entire-mistake",4,["1.1"],2,"var",varset([
  function(){
    return mcq("A student converts \\(4\\sqrt{3}\\) to an entire radical.<br>Line 1: \\(4\\sqrt{3}\\)<br>Line 2: \\(= \\sqrt{4 \\times 3}\\)<br>Line 3: \\(= \\sqrt{12}\\)<br>Line 4: The entire radical is \\(\\sqrt{12}\\).<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 restates the given expression correctly. In Line 2, the coefficient \\(4\\) was brought inside the radical without being squared first; it should be \\(\\sqrt{4^2 \\times 3} = \\sqrt{16 \\times 3} = \\sqrt{48}\\). The first mistake is in <b>Line 2</b>.",
      {variant:1,mistakeLine:2});
  },
  function(){
    return mcq("A student converts \\(3\\sqrt{5}\\) to an entire radical.<br>Line 1: \\(3\\sqrt{5}\\)<br>Line 2: \\(= \\sqrt{3^2 \\times 5^2}\\)<br>Line 3: \\(= \\sqrt{9 \\times 25}\\)<br>Line 4: \\(= \\sqrt{225}\\)<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 restates the given expression correctly. In Line 2, the student squared both the coefficient and the radicand, whereas only the coefficient moving inside the radical should be squared: \\(\\sqrt{3^2 \\times 5} = \\sqrt{45}\\). The first mistake is in <b>Line 2</b>.",
      {variant:2,mistakeLine:2});
  },
  function(){
    return mcq("A student converts \\(5\\sqrt{2}\\) to an entire radical.<br>Line 1: \\(5\\sqrt{2}\\)<br>Line 2: \\(= \\sqrt{5^2} \\cdot \\sqrt{2}\\)<br>Line 3: \\(= \\sqrt{25 + 2}\\)<br>Line 4: \\(= \\sqrt{27}\\)<br>In which line is the FIRST mistake?",
      "Line 3",["Line 1","Line 2","Line 4"],
      "Line 1 and Line 2 rewrite \\(5\\) as \\(\\sqrt{5^2}\\) properly. In Line 3, the student added the radicands instead of multiplying them (\\(\\sqrt{25 \\times 2} = \\sqrt{50}\\)). The first mistake is in <b>Line 3</b>.",
      {variant:3,mistakeLine:3});
  },
  function(){
    return mcq("A student converts \\(2\\sqrt{7}\\) to an entire radical.<br>Line 1: \\(2\\sqrt{7}\\)<br>Line 2: \\(= \\sqrt{2^2} \\cdot \\sqrt{7}\\)<br>Line 3: \\(= \\sqrt{4 \\times 7}\\)<br>Line 4: \\(= \\sqrt{11}\\)<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1 through 3 set up \\(\\sqrt{4 \\times 7}\\) properly. In Line 4, the student added \\(4 + 7 = 11\\) instead of multiplying \\(4 \\times 7 = 28\\). The first mistake is in <b>Line 4</b>.",
      {variant:4,mistakeLine:4});
  }
]));

E("u4-simplify-fraction-radicand",4,["1.2","1.7"],2,"gen",function(){
  var a,b,d,key,ds,tries=0;
  do{
    a=pick([2,3,4,5]);b=pick([2,3,5,6,7]);d=pick([3,4,5,6,7,8,9]);tries++;
    var num=a*a*b,den=d*d;
    if(num>=den)continue;
    function gcd(x,y){while(y){var t=y;y=x%y;x=t;}return x||1;}
    if(gcd(num,den)!==1)continue;
    key="\\(\\frac{"+radStr(a,b)+"}{"+d+"}\\)";
    var d1="\\(\\frac{"+radStr(a,b)+"}{\\sqrt{"+den+"}}\\)";
    var badA=a===2?3:2;
    var d2="\\(\\frac{"+radStr(badA,b)+"}{"+d+"}\\)";
    var d3="\\(\\frac{"+d+"}{"+radStr(a,b)+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  var num=a*a*b,den=d*d;
  return mcq("Express \\(\\sqrt{"+frB(num,den)+"}\\) in simplest form.",
    key,ds,
    "Split the radical across numerator and denominator: \\(\\frac{\\sqrt{"+num+"}}{\\sqrt{"+den+"}}\\). Factor the perfect square in the numerator: \\(\\sqrt{"+num+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = "+radStr(a,b)+"\\), and evaluate the denominator: \\(\\sqrt{"+den+"} = "+d+"\\). In simplest form, the expression is <b>"+key+"</b>.",
    {a:a,b:b,d:d});
});

E("u4-variable-entire",4,["1.3"],2,"gen",function(){
  var c,e,r,form,key,ds,tries=0;
  do{
    c=ri(2,6);e=ri(1,4);r=pick([2,3,5,6,7]);form=ri(0,1);tries++;
    var vPart=e===1?"x":"x^{"+e+"}";
    var vSq=(2*e)===1?"x":"x^{"+(2*e)+"}";
    var vUnch=e===1?"x":"x^{"+e+"}";
    if(form===0){
      // c x^e \sqrt{r} -> \sqrt{c^2 r x^{2e}}
      key="\\(\\sqrt{"+(c*c*r)+vSq+"}\\)";
      var d1="\\(\\sqrt{"+(c*c*r)+vUnch+"}\\)";
      var d2="\\(\\sqrt{"+(c*r)+vSq+"}\\)";
      var d3="\\(\\sqrt{"+(c*r)+vUnch+"}\\)";
      ds=[d1,d2,d3];
    }else{
      // c x^e \sqrt{r x} -> \sqrt{c^2 r x^{2e+1}}
      var vSqP="x^{"+(2*e+1)+"}";
      var vUnchP="x^{"+(e+1)+"}";
      key="\\(\\sqrt{"+(c*c*r)+vSqP+"}\\)";
      var d1="\\(\\sqrt{"+(c*c*r)+vUnchP+"}\\)";
      var d2="\\(\\sqrt{"+(c*r)+vSqP+"}\\)";
      var d3="\\(\\sqrt{"+(c*r)+vUnchP+"}\\)";
      ds=[d1,d2,d3];
    }
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<80);
  var vDisp=e===1?"x":"x^{"+e+"}";
  var radDisp=form===0?sqrtT(r):"\\(\\sqrt{"+r+"x}\\)";
  return mcq("Assuming \\(x \\ge 0\\), express \\("+c+vDisp+"\\)"+radDisp+" as an entire radical.",
    key,ds,
    "Square the entire outside factor \\("+c+vDisp+"\\) to move it inside the square root: \\(("+c+vDisp+")^2 = "+(c*c)+"x^{"+(2*e)+"}\\). Multiply by the existing radicand \\("+(form===0?r:r+"x")+"\\) to get <b>"+key+"</b>.",
    {c:c,e:e,r:r,form:form});
});

E("u4-variable-evaluate",4,["1.3"],1,"gen",function(){
  var coeff=ri(2,6);
  var m=ri(2,5);
  var k=ri(3,9);
  var shift=ri(1,10);
  var sign=pick([-1,1]);
  // rad = m*x + sign*shift = k^2 => m*x = k^2 - sign*shift
  var x,tries=0;
  do{
    m=ri(2,5);k=ri(3,9);shift=ri(1,12);sign=pick([-1,1]);tries++;
    var rhs=k*k-sign*shift;
    if(rhs>0&&rhs%m===0){x=rhs/m;break;}
  }while(tries<100);
  if(!x){m=2;k=4;shift=2;sign=1;x=7;}
  var ans=coeff*k;
  var radStrExpr=m+"x "+(sign>0?"+ "+shift:"- "+shift);
  return numq("Evaluate \\("+coeff+"\\sqrt{"+radStrExpr+"}\\) when \\(x = "+x+"\\).",
    ans,0.011,
    "Substitute \\(x = "+x+"\\) into the expression: \\("+coeff+"\\sqrt{"+m+"("+x+") "+(sign>0?"+ "+shift:"- "+shift)+"} = "+coeff+"\\sqrt{"+(k*k)+"} = "+coeff+"("+k+") = "+ans+"\\). The value is <b>\\("+ans+"\\)</b>.",
    {coeff:coeff,m:m,shift:shift,sign:sign,x:x,k:k});
});

E("u4-variable-cube",4,["1.3"],2,"gen",function(){
  var a,b,q,rem,key,ds,tries=0;
  do{
    a=pick([2,3,4]);b=pick([2,3,5]);q=ri(1,3);rem=pick([1,2]);tries++;
    var n=a*a*a*b;
    var exp=3*q+rem;
    var outVar=q===1?"x":"x^{"+q+"}";
    var inVar=rem===1?"x":"x^{"+rem+"}";
    key="\\("+a+outVar+"\\sqrt[3]{"+b+inVar+"}\\)";
    // Distractor 1: square root exponent habit (halve exp)
    var q2=Math.floor(exp/2),rem2=exp%2;
    var outV2=q2===1?"x":"x^{"+q2+"}";
    var inV2=rem2===0?"":(rem2===1?"x":"x^{"+rem2+"}");
    var d1="\\("+a+outV2+"\\sqrt[3]{"+b+inV2+"}\\)";
    // Distractor 2: variable brought out with exponent unchanged
    var d2="\\("+a+"x^{"+exp+"}\\sqrt[3]{"+b+"}\\)";
    // Distractor 3: numerical cube root mishandled (a^2 or wrong coeff)
    var badA=a===2?4:2;
    var d3="\\("+badA+outVar+"\\sqrt[3]{"+b+inVar+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  var n=a*a*a*b,exp=3*q+rem;
  var outVar=q===1?"x":"x^{"+q+"}";
  var inVar=rem===1?"x":"x^{"+rem+"}";
  return mcq("Simplify \\(\\sqrt[3]{"+n+"x^{"+exp+"}}\\) completely.",
    key,ds,
    "Factor the radicand into perfect cubes and leftovers: \\("+n+"x^{"+exp+"} = "+a+"^3 \\cdot "+b+" \\cdot (x^{"+q+"})^3 \\cdot "+inVar+"\\). Taking the cube root of the perfect cube factors gives \\("+a+outVar+"\\), leaving \\("+b+inVar+"\\) inside the cube root. The simplified form is <b>"+key+"</b>.",
    {a:a,b:b,q:q,rem:rem});
});

E("u4-order-mixed-index",4,["1.4"],2,"gen",function(){
  var pool=[
    {tex:"\\(\\sqrt{5}\\)",val:Math.sqrt(5)},
    {tex:"\\(\\sqrt{7}\\)",val:Math.sqrt(7)},
    {tex:"\\(\\sqrt{10}\\)",val:Math.sqrt(10)},
    {tex:"\\(\\sqrt{12}\\)",val:Math.sqrt(12)},
    {tex:"\\(\\sqrt{15}\\)",val:Math.sqrt(15)},
    {tex:"\\(2\\sqrt{2}\\)",val:2*Math.sqrt(2)},
    {tex:"\\(2\\sqrt{3}\\)",val:2*Math.sqrt(3)},
    {tex:"\\(\\sqrt[3]{10}\\)",val:Math.cbrt(10)},
    {tex:"\\(\\sqrt[3]{20}\\)",val:Math.cbrt(20)},
    {tex:"\\(\\sqrt[3]{30}\\)",val:Math.cbrt(30)},
    {tex:"\\(\\sqrt[3]{50}\\)",val:Math.cbrt(50)},
    {tex:"\\(2\\sqrt[3]{3}\\)",val:2*Math.cbrt(3)}
  ];
  var chosen,tries=0,key,ds;
  do{
    tries++;
    var idx=[];
    while(idx.length<4){var r=ri(0,pool.length-1);if(idx.indexOf(r)<0)idx.push(r);}
    chosen=idx.map(function(i){return pool[i];});
    var dealt=chosen.slice();
    chosen.sort(function(x,y){return x.val-y.val;});
    var ok=true;
    for(var i=0;i<3;i++){if(chosen[i+1].val-chosen[i].val<0.12)ok=false;}
    if(!ok){ds=null;continue;}
    function fmtList(arr){return arr.map(function(x){return x.tex;}).join(", ");}
    key=fmtList(chosen);
    var s1=[chosen[1],chosen[0],chosen[2],chosen[3]];
    var s2=[chosen[0],chosen[1],chosen[3],chosen[2]];
    var rev=[chosen[3],chosen[2],chosen[1],chosen[0]];
    ds=[fmtList(s1),fmtList(s2),fmtList(rev)];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<120);
  var approx=chosen.map(function(x){return x.tex+" \\(\\approx "+fmt(x.val,2)+"\\)";}).join(", ");
  return mcq("Order the following radicals from least to greatest: "+dealt.map(function(x){return x.tex;}).join(", ")+".",
    key,ds,
    "Convert each radical to an approximate decimal (or raise all to the 6th power to compare): "+approx+". Arranged from least to greatest, the order is <b>"+key+"</b>.",
    {items:dealt.map(function(x){return x.tex;})});
});

E("u4-closest-integer",4,["1.4"],1,"gen",function(){
  var k,n,tries=0;
  do{
    k=ri(3,11);
    n=ri(k*k+1,(k+1)*(k+1)-1);
    tries++;
    var sq=Math.sqrt(n);
    var distLow=sq-k,distHigh=(k+1)-sq;
    if(Math.abs(distLow-distHigh)>=0.12)break;
  }while(tries<100);
  var closest=Math.sqrt(n)-k<(k+1)-Math.sqrt(n)?k:(k+1);
  var otherBound=closest===k?(k+1):k;
  var key=String(closest);
  var ds=[String(k-1),String(otherBound),String(k+2)];
  return mcq("Which whole number is closest to \\(\\sqrt{"+n+"}\\)?",
    key,ds,
    "Note that \\("+k+"^2 = "+(k*k)+"\\) and \\("+(k+1)+"^2 = "+((k+1)*(k+1))+"\\), so \\(\\sqrt{"+n+"}\\) lies between \\("+k+"\\) and \\("+(k+1)+"\\). Since \\("+n+"\\) is closer to \\("+(closest*closest)+"\\) (and \\(\\sqrt{"+n+"} \\approx "+fmt(Math.sqrt(n),2)+"\\)), the closest whole number is <b>"+key+"</b>.",
    {k:k,n:n,closest:closest});
});

E("u4-defined-two-radicals",4,["1.5"],2,"gen",function(){
  var a,b,key,ds,tries=0;
  do{
    a=ri(-6,3);b=ri(a+2,9);tries++;
    // \sqrt{x - a} + \sqrt{b - x} => a <= x <= b
    var cond1="\\(x \\ge "+a+"\\)";
    var cond2="\\(x \\le "+b+"\\)";
    key="\\("+a+" \\le x \\le "+b+"\\)";
    var d3="\\(x \\le "+a+"\\) or \\(x \\ge "+b+"\\)";
    ds=[cond1,cond2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<80);
  var t1=a===0?"x":(a>0?"x - "+a:"x + "+(-a));
  var t2=b===0?"-x":(b>0?b+" - x":b+" - x");
  var op=pick(["+","-"]);
  return mcq("For which values of \\(x\\) is the expression \\(\\sqrt{"+t1+"} "+op+" \\sqrt{"+t2+"}\\) defined as a real number?",
    key,ds,
    "Both radicands must be non-negative simultaneously. From \\("+t1+" \\ge 0\\), we get \\(x \\ge "+a+"\\); from \\("+t2+" \\ge 0\\), we get \\(x \\le "+b+"\\). Combining both conditions gives <b>"+key+"</b>.",
    {a:a,b:b,op:op});
});

E("u4-defined-boundary",4,["1.5"],2,"gen",function(){
  var m,b,x0,tries=0;
  do{
    m=pick([-5,-4,-3,-2,2,3,4,5]);
    x0=ri(-8,8);
    b=-m*x0;
    tries++;
  }while(b===0&&tries<50);
  var expr=m+"x "+(b>0?"+ "+b:"- "+(-b));
  return numq("The radical expression \\(\\sqrt{"+expr+"}\\) is defined for \\(x "+(m>0?"\\ge":"\\le")+" k\\). What is the boundary value \\(k\\)?",
    x0,0.011,
    "Set the radicand equal to zero to find the endpoint of the domain: \\("+expr+" = 0\\), so \\("+m+"x = "+(-b)+"\\) and \\(x = "+x0+"\\). The boundary value is <b>\\("+x0+"\\)</b>.",
    {m:m,b:b,x0:x0});
});

E("u4-rationalize-binomial",4,["1.7"],2,"gen",function(){
  var num,a,b,den,key,ds,tries=0;
  do{
    num=pick([2,3,4,5,6]);
    a=ri(2,5);
    b=pick([2,3,5,6,7]);
    den=a*a-b;
    tries++;
    if(den<=1||num%den===0)continue;
    function gcd(x,y){while(y){var t=y;y=x%y;x=t;}return x||1;}
    if(gcd(num,den)!==1)continue;
    // num / (a + \sqrt{b}) => num(a - \sqrt{b}) / (a^2 - b)
    key="\\(\\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+den+"}\\)";
    // Distractor 1: multiplied by same binomial (a + \sqrt{b}) instead of conjugate => num(a + \sqrt{b}) / (a^2 + b + 2a\sqrt{b})
    var d1="\\(\\frac{"+(num*a)+" + "+num+"\\sqrt{"+b+"}}{"+(a*a+b)+" + "+(2*a)+"\\sqrt{"+b+"}}\\)";
    // Distractor 2: conjugate used, denominator difference of squares botched as a^2 + b
    var d2="\\(\\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+(a*a+b)+"}\\)";
    // Distractor 3: conjugate applied to denominator only, numerator unmultiplied
    var d3="\\(\\frac{"+num+"}{"+den+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<120);
  return mcq("Rationalize the denominator: \\(\\frac{"+num+"}{"+a+" + \\sqrt{"+b+"}}\\).",
    key,ds,
    "Multiply numerator and denominator by the conjugate \\("+a+" - \\sqrt{"+b+"}\\): \\(\\frac{"+num+"("+a+" - \\sqrt{"+b+"})}{("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"})} = \\frac{"+(num*a)+" - "+num+"\\sqrt{"+b+"}}{"+(a*a)+" - "+b+"}\\). Simplifying the denominator gives <b>"+key+"</b>.",
    {num:num,a:a,b:b,den:den});
});

E("u4-rationalize-cube-root",4,["1.7"],2,"gen",function(){
  var num,b,key,ds,tries=0;
  do{
    num=pick([2,3,4,5,7]);
    b=pick([2,3,4,5,6,7]);
    tries++;
    if(num%b===0)continue;
    var bSq=b*b;
    // Check if bSq has a cube factor (e.g., b=4 => bSq=16=8*2, avoid so \sqrt[3]{b^2} is already simplest)
    if(b===4||b===6)continue;
    key="\\(\\frac{"+num+"\\sqrt[3]{"+bSq+"}}{"+b+"}\\)";
    // Distractor 1: multiplied by \sqrt[3]{b} (square root habit) => num\sqrt[3]{b} / \sqrt[3]{b^2}
    var d1="\\(\\frac{"+num+"\\sqrt[3]{"+b+"}}{\\sqrt[3]{"+bSq+"}}\\)";
    // Distractor 2: correct multiplier on denominator, numerator left unmultiplied
    var d2="\\(\\frac{"+num+"}{"+b+"}\\)";
    // Distractor 3: denominator's cube computed incorrectly as b^2
    var d3="\\(\\frac{"+num+"\\sqrt[3]{"+bSq+"}}{"+bSq+"}\\)";
    ds=[d1,d2,d3];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<100);
  return mcq("Rationalize the denominator: \\(\\frac{"+num+"}{\\sqrt[3]{"+b+"}}\\).",
    key,ds,
    "To form a perfect cube \\("+b+"^3\\) under the cube root, multiply numerator and denominator by \\(\\sqrt[3]{"+b+"^2} = \\sqrt[3]{"+(b*b)+"}\\): \\(\\frac{"+num+"\\sqrt[3]{"+(b*b)+"}}{\\sqrt[3]{"+(b*b*b)+"}}\\). Simplifying \\(\\sqrt[3]{"+(b*b*b)+"} = "+b+"\\) gives <b>"+key+"</b>.",
    {num:num,b:b});
});

E("u4-restriction-boundary",4,["1.8"],1,"gen",function(){
  var a,x0,b,rhs,tries=0;
  do{
    a=ri(2,5);x0=ri(-6,7);b=-a*x0;rhs=ri(2,7);tries++;
  }while(b===0&&tries<50);
  var expr=a+"x "+(b>0?"+ "+b:"- "+(-b));
  return numq("For the radical equation \\(\\sqrt{"+expr+"} = "+rhs+"\\), the restriction on \\(x\\) is \\(x \\ge k\\). What is the value of \\(k\\)?",
    x0,0.011,
    "The radicand must be non-negative: \\("+expr+" \\ge 0\\), so \\("+a+"x \\ge "+(-b)+"\\) and \\(x \\ge "+x0+"\\). The smallest permitted value is <b>\\("+x0+"\\)</b>.",
    {a:a,b:b,rhs:rhs,x0:x0});
});

E("u4-equation-both-sides",4,["1.9"],2,"gen",function(){
  var a,b,c,d,sol,key,ds,tries=0;
  do{
    a=ri(3,6);c=ri(1,a-1);
    sol=ri(1,8);
    b=a*pick([-1,1])*ri(1,Math.floor(6/a));
    d=(a-c)*sol+b;
    tries++;
    if(b===0||d===0)continue;
    if(a*sol+b<0||c*sol+d<0)continue;
    key="\\(x = "+sol+"\\)";
    // Distractor 1: coefficients added instead of subtracted => (a+c)x = d - b
    var bad1=(d-b)/(a+c);
    // Distractor 2: constant sign flipped in collection => (a-c)x = d + b
    var bad2=(d+b)/(a-c);
    // Distractor 3: restriction boundary from left radicand => -b/a
    var bad3=-b/a;
    if(!Number.isInteger(bad1)||!Number.isInteger(bad2)||!Number.isInteger(bad3)){ds=null;continue;}
    ds=["\\(x = "+bad1+"\\)","\\(x = "+bad2+"\\)","\\(x = "+bad3+"\\)"];
    if(ds.indexOf(key)>=0||ds[0]===ds[1]||ds[0]===ds[2]||ds[1]===ds[2])ds=null;
  }while(!ds&&tries<150);
  var lhs=a+"x "+(b>0?"+ "+b:"- "+(-b));
  var rhs=(c===1?"x":c+"x")+" "+(d>0?"+ "+d:"- "+(-d));
  return mcq("Solve for \\(x\\): \\(\\sqrt{"+lhs+"} = \\sqrt{"+rhs+"}\\).",
    key,ds,
    "Square both sides to equate the radicands: \\("+lhs+" = "+rhs+"\\). Subtract \\("+(c===1?"x":c+"x")+"\\) from both sides to get \\("+(a-c)+"x = "+(d-b)+"\\), so \\(x = "+sol+"\\). Checking in both radicands confirms both equal \\("+(a*sol+b)+" \\ge 0\\). The solution is <b>"+key+"</b>.",
    {a:a,b:b,c:c,d:d,sol:sol});
});

E("u4-cube-equation-shifted",4,["1.9"],2,"gen",function(){
  var a,b,sol,k,c,rhs,tries=0;
  do{
    a=ri(2,4);sol=ri(-5,7);k=pick([-3,-2,2,3]);
    b=k*k*k-a*sol;
    c=ri(2,8);
    var sign=pick([-1,1]);
    rhs=k+sign*c;
    tries++;
    if(b===0)continue;
    var expr=a+"x "+(b>0?"+ "+b:"- "+(-b));
    var shiftStr=sign>0?"+ "+c:"- "+c;
    return numq("Solve for \\(x\\): \\(\\sqrt[3]{"+expr+"} "+shiftStr+" = "+rhs+"\\).",
      sol,0.011,
      "Isolate the cube root first by "+(sign>0?"subtracting "+c:"adding "+c)+" on both sides: \\(\\sqrt[3]{"+expr+"} = "+k+"\\). Cube both sides: \\("+expr+" = "+k+"^3 = "+(k*k*k)+"\\). Subtract "+(b>0?b:"("+b+")")+" to get \\("+a+"x = "+(a*sol)+"\\), so \\(x = "+sol+"\\). The root is <b>\\("+sol+"\\)</b>.",
      {a:a,b:b,c:c,sign:sign,rhs:rhs,sol:sol});
  }while(tries<50);
});

E("u4-verify-which-root",4,["1.10"],2,"gen",function(){
  var sol,negCand,flipCand,a,b,c,tries=0,key,ds;
  do{
    // Equation: \sqrt{x + a} = x - c, with sol > c so sol - c > 0
    sol=ri(3,9);
    var k=ri(2,4);
    c=sol-k;
    a=k*k-sol;
    // Equation is \sqrt{x + a} = x - c
    // Candidate 2 (negative radicand): x < -a
    negCand=-a-ri(2,5);
    // Candidate 3 (satisfies sign-flipped RHS, i.e., \sqrt{x + a} = c - x, where c - x > 0 so x < c):
    // Try to find integer flipCand < c with flipCand + a = (c - flipCand)^2
    flipCand=null;
    for(var cand=c-1;cand>=-a;cand--){
      if(cand+a===(c-cand)*(c-cand)){flipCand=cand;break;}
    }
    tries++;
    if(flipCand===null||flipCand===sol||flipCand===negCand||negCand===sol)continue;
    key="\\(x = "+sol+"\\)";
    var d1="\\(x = "+negCand+"\\)";
    var d2="\\(x = "+flipCand+"\\)";
    var d3="None of these values";
    ds=[d1,d2,d3];
  }while(!ds&&tries<200);
  var radStr=a===0?"x":(a>0?"x + "+a:"x - "+(-a));
  var rhsStr=c===0?"x":(c>0?"x - "+c:"x + "+(-c));
  return mcq("Which of the following values is a root of \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\)?",
    key,ds,
    "Substitute each candidate into \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\). At \\(x = "+negCand+"\\), the radicand is \\("+(negCand+a)+" < 0\\) (not real). At \\(x = "+flipCand+"\\), the left side is \\(\\sqrt{"+(flipCand+a)+"} = "+(c-flipCand)+"\\) while the right side is \\("+(flipCand-c)+"\\). At \\(x = "+sol+"\\), \\(\\sqrt{"+(sol+a)+"} = "+(sol-c)+"\\) and the right side is \\("+(sol-c)+"\\). The valid root is <b>"+key+"</b>.",
    {a:a,c:c,sol:sol,negCand:negCand,flipCand:flipCand});
});

E("u4-verify-first-mistake",4,["1.10"],2,"var",varset([
  function(){
    return mcq("A student checks whether \\(x = 6\\) is a root of \\(\\sqrt{2x + 4} = x - 2\\).<br>Line 1: Substitute \\(x = 6\\): \\(\\sqrt{2(6) + 4} = 6 - 2\\)<br>Line 2: Simplify inside the root: \\(\\sqrt{12 + 4} = 4\\)<br>Line 3: Evaluate: \\(\\sqrt{16} = 8\\), so \\(8 = 4\\)<br>Line 4: Since \\(8 \\ne 4\\), \\(x = 6\\) is not a root.<br>In which line is the FIRST mistake?",
      "Line 3",["Line 1","Line 2","Line 4"],
      "Lines 1 and 2 substitute \\(x = 6\\) and simplify the radicand to \\(16\\) correctly. In Line 3, the student evaluated \\(\\sqrt{16}\\) as \\(8\\) (halving instead of taking the square root); \\(\\sqrt{16} = 4\\), which matches the right side. The first mistake is in <b>Line 3</b>.",
      {variant:1,mistakeLine:3});
  },
  function(){
    return mcq("A student checks whether \\(x = 1\\) is a root of \\(\\sqrt{x + 8} = x - 4\\).<br>Line 1: Substitute \\(x = 1\\): \\(\\sqrt{1 + 8} = 1 - 4\\)<br>Line 2: Simplify both sides: \\(\\sqrt{9} = -3\\)<br>Line 3: Evaluate the principal root: \\(3 = -3\\)<br>Line 4: Both sides have magnitude \\(3\\), so \\(x = 1\\) is a root.<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1, 2, and 3 evaluate both sides accurately, arriving at \\(3 = -3\\). In Line 4, the student concludes \\(x = 1\\) is a root even though \\(3 \\ne -3\\) (an extraneous root). The first mistake is in <b>Line 4</b>.",
      {variant:2,mistakeLine:4});
  },
  function(){
    return mcq("A student checks whether \\(x = 5\\) is a root of \\(\\sqrt{3x + 1} - 1 = 3\\).<br>Line 1: Substitute \\(x = 5\\): \\(\\sqrt{3(5) + 1} - 1 = 3\\)<br>Line 2: Simplify inside the root: \\(\\sqrt{15 + 1} - 1 = 3\\)<br>Line 3: Evaluate: \\(\\sqrt{16} - 1 = 3 \\implies 4 - 1 = 3\\)<br>Line 4: Since \\(3 = 3\\), \\(x = 5\\) is extraneous.<br>In which line is the FIRST mistake?",
      "Line 4",["Line 1","Line 2","Line 3"],
      "Lines 1 through 3 evaluate the left side properly to \\(3\\), matching the right side. In Line 4, the student calls a verified solution extraneous instead of valid. The first mistake is in <b>Line 4</b>.",
      {variant:3,mistakeLine:4});
  },
  function(){
    return mcq("A student checks whether \\(x = -3\\) is a root of \\(\\sqrt{1 - 5x} = 1 - x\\).<br>Line 1: Substitute \\(x = -3\\): \\(\\sqrt{1 - 5(-3)} = 1 - (-3)\\)<br>Line 2: Simplify: \\(\\sqrt{1 - 15} = 4\\)<br>Line 3: Evaluate: \\(\\sqrt{-14} = 4\\)<br>Line 4: Since \\(\\sqrt{-14}\\) is not real, \\(x = -3\\) is not a root.<br>In which line is the FIRST mistake?",
      "Line 2",["Line 1","Line 3","Line 4"],
      "Line 1 substitutes \\(x = -3\\) correctly. In Line 2, \\(-5(-3) = +15\\), so the radicand is \\(1 + 15 = 16\\), not \\(1 - 15 = -14\\) (\\(x = -3\\) is actually a valid root since \\(\\sqrt{16} = 4\\)). The first mistake is in <b>Line 2</b>.",
      {variant:4,mistakeLine:2});
  }
]));

E("u4-extraneous-valid-root",4,["1.11"],2,"gen",function(){
  // Build \sqrt{x + a} = x - c with two distinct integer roots r1 < c < r2 of (x - c)^2 = x + a
  // Let k1 = c - r1 > 0 (extraneous) and k2 = r2 - c > 0 (valid), with k1 !== k2
  // Quadratic: x^2 - (2c + 1)x + (c^2 - a) = 0 => r1 + r2 = 2c + 1 => r2 - c = c - r1 + 1 => k2 = k1 + 1
  var k1=ri(1,4);
  var k2=k1+1;
  var c=ri(0,5);
  var r1=c-k1;
  var r2=c+k2;
  var a=k2*k2-r2;
  var radStr=a===0?"x":(a>0?"x + "+a:"x - "+(-a));
  var rhsStr=c===0?"x":(c>0?"x - "+c:"x + "+(-c));
  var bQuad=-(2*c+1),cQuad=c*c-a;
  return numq("Solve \\(\\sqrt{"+radStr+"} = "+rhsStr+"\\) and state the valid root.",
    r2,0.011,
    "Square both sides: \\("+radStr+" = ("+rhsStr+")^2\\), which rearranges to \\(x^2 "+(bQuad>=0?"+ "+bQuad:"- "+(-bQuad))+"x "+(cQuad>=0?"+ "+cQuad:"- "+(-cQuad))+" = 0\\). Factoring gives \\((x "+(r1>=0?"- "+r1:"+ "+(-r1))+")(x "+(r2>=0?"- "+r2:"+ "+(-r2))+") = 0\\), so \\(x = "+r1+"\\) or \\(x = "+r2+"\\). Check \\(x = "+r1+"\\): \\(\\sqrt{"+(r1+a)+"} = "+k1+"\\) while \\("+rhsStr+" = "+(r1-c)+"\\) (extraneous). Check \\(x = "+r2+"\\): \\(\\sqrt{"+(r2+a)+"} = "+k2+"\\) and \\("+rhsStr+" = "+(r2-c)+"\\). The valid root is <b>\\("+r2+"\\)</b>.",
    {a:a,c:c,r1:r1,r2:r2});
});

E("u4-no-solution-equation",4,["1.11"],3,"gen",function(){
  var a=ri(1,5);
  var k=ri(2,6);
  var r=k*k-a;
  // \sqrt{x + a} = -k => squaring gives x = k^2 - a = r; boundary is -a
  var radStr="x + "+a;
  var key="No solution";
  var ds=[
    "\\(x = "+r+"\\)",
    "\\(x = "+(-a)+"\\)",
    "\\(x = "+(-a)+"\\) and \\(x = "+r+"\\)"
  ];
  return mcq("Determine the solution to the equation \\(\\sqrt{"+radStr+"} = -"+k+"\\).",
    key,ds,
    "The principal square root \\(\\sqrt{"+radStr+"}\\) is always greater than or equal to \\(0\\) for all real values in its domain, so it can never equal the negative number \\(-"+k+"\\) (squaring gives the extraneous candidate \\(x = "+r+"\\)). Therefore, there is <b>No solution</b>.",
    {a:a,k:k,r:r});
});

E("u4-model-solve-variable",4,["1.12"],2,"gen",function(){
  var ctx=ri(0,1);
  if(ctx===0){
    // Distance to horizon d = 3.5 \sqrt{h}, pick h as a clean integer so d = 3.5 * k
    var k=ri(3,9);
    var h=k*k;
    var d=3.5*k;
    return numq("The distance \\(d\\) (in kilometres) to the horizon from an observation deck at height \\(h\\) (in metres) is modelled by \\(d = 3.5\\sqrt{h}\\). If a ferry is visible on the horizon at \\(d = "+fmt(d,1)+"\\text{ km}\\), find the height \\(h\\) of the deck in metres.",
      h,0.011,
      "Substitute \\(d = "+fmt(d,1)+"\\) into the formula: \\("+fmt(d,1)+" = 3.5\\sqrt{h}\\). Divide both sides by \\(3.5\\) to isolate the radical: \\(\\sqrt{h} = "+k+"\\). Square both sides to get \\(h = "+k+"^2 = "+h+"\\). The height is <b>\\("+h+"\\)</b>.",
      {ctx:0,k:k,h:h,d:d});
  }else{
    // Free-fall time t = \sqrt{d / 4.9}, pick t as integer so d = 4.9 * t^2
    var t=ri(2,6);
    var d=4.9*t*t;
    return numq("The time \\(t\\) (in seconds) for a stone to fall a distance \\(d\\) (in metres) is modelled by \\(t = \\sqrt{\\frac{d}{4.9}}\\). If the stone takes \\(t = "+t+"\\text{ s}\\) to reach the water below, find the distance \\(d\\) in metres.",
      d,0.011,
      "Substitute \\(t = "+t+"\\) into the formula: \\("+t+" = \\sqrt{\\frac{d}{4.9}}\\). Square both sides: \\("+(t*t)+" = \\frac{d}{4.9}\\). Multiply by \\(4.9\\) to get \\(d = "+(t*t)+" \\times 4.9 = "+fmt(d,1)+"\\). The distance is <b>\\("+fmt(d,1)+"\\)</b>.",
      {ctx:1,t:t,d:d});
  }
});

E("u4-model-equation-two-step",4,["1.12"],2,"gen",function(){
  var fixed=ri(4,15);
  var coeff=ri(2,6);
  var total=fixed+coeff*ri(3,7);
  var key="\\("+fixed+" + "+coeff+"\\sqrt{x} = "+total+"\\)";
  var d1="\\("+coeff+"\\sqrt{"+fixed+" + x} = "+total+"\\)";
  var d2="\\(\\sqrt{"+fixed+" + "+coeff+"x} = "+total+"\\)";
  var d3="\\("+fixed+" + "+coeff+"x^2 = "+total+"\\)";
  return mcq("A walkway consists of a fixed \\("+fixed+"\\text{ m}\\) wooden ramp connected to a stone path whose length (in metres) is \\("+coeff+"\\) times the square root of its width \\(x\\) (in metres). If the total length of the walkway is \\("+total+"\\text{ m}\\), which equation models this situation?",
    key,[d1,d2,d3],
    "The total length is the sum of the fixed \\("+fixed+"\\text{ m}\\) ramp and the stone path's length \\("+coeff+"\\sqrt{x}\\). Setting this sum equal to \\("+total+"\\) gives <b>"+key+"</b>.",
    {fixed:fixed,coeff:coeff,total:total});
});

/* PK tranche pass for Unit 4. pkFor is Cluster 4's dependent
   indicator list from the prior knowledge map. */
var PKT_U4_FOR=["1.1","1.2","1.4","1.5","1.6","1.7","1.9","1.11"];
var PKT_U4={
 "u4-pk-radical-mixed":{src:"math-1201:1.16",group:"radical-forms"},
 "u4-pk-radical-entire":{src:"math-1201:1.17",group:"radical-forms"},
 "u4-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-laws-rational":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-evaluate-exp":{src:"math-1201:1.6, 1.3",group:"exponent-laws"},
 "u4-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"},
 "u4-pk-solve-two-step":{src:"math-9:8.18",group:"equation-solving"},
 "u4-pk-defined":{src:"authored:definedness-numerical",group:"definedness"}};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});
