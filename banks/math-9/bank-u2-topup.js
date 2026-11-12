// Math 9 Unit 2 top-up tranche (November 7, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-9-review/bank-src.js, lines 1697 to 1846).
/* Top-up tranche (November 7, 2026): Unit 2 additions from tranche1/unit2-topup.js */
/* Unit 2 top-up tranche: five companion entries. Helpers u2gcd, u2r1, u2r2,
   u2d3 and u2nonSquare are defined in unit2.js and the assembled bank. */

E("u2-sqrt-fraction", 2, ["6.9"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var a=ri(2,15), b=ri(2,15), g=0;
    while(u2gcd(a,b)!==1&&g<60){a=ri(2,15);b=ri(2,15);g++;}
    var correct="\\("+FR(a,b)+"\\)";
    var cands=[
      {t:"\\("+FR(a,b*b)+"\\)", fb:"That roots the top part only: the bottom part must be rooted too."},
      {t:"\\("+FR(a*a,b)+"\\)", fb:"That roots the bottom part only: the top part must be rooted too."},
      {t:"\\("+FR(a+1,b)+"\\)", fb:"Squaring it gives a top part of "+((a+1)*(a+1))+", not "+(a*a)+": check both parts."},
      {t:"\\("+FR(a,b+1)+"\\)", fb:"Squaring it gives a bottom part of "+((b+1)*(b+1))+", not "+(b*b)+": check both parts."},
      {t:"\\("+FR(a+1,b+1)+"\\)", fb:"Squaring it changes both parts: compare each part with the one shown."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    return mcq("What is \\(\\sqrt{"+FR(a*a,b*b)+"}\\)? Give the exact value.", {t:correct, fb:"Yes: "+a+" squared is "+(a*a)+" and "+b+" squared is "+(b*b)+"."}, opts,
      "Root the top and the bottom separately: \\[ \\begin{aligned} \\sqrt{"+FR(a*a,b*b)+"} &= "+FR(a,b)+" \\end{aligned} \\] The square root is <b>\\("+FR(a,b)+"\\)</b>.",
      {mode:"fraction", a:a, b:b});
  }
  var k=ri(3,39); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd*2),u2r1(rd+0.2),u2r1(rd/2),u2r1(rd+1)]);
  var dopts=fmtPairDs(fmt(rd), dc.map(function(d){return {v:d, fb:fmt(d)+" squared is "+fmt(u2r2(d*d))+", not "+fmt(nd)+": try another tenth."};}));
  return mcq("What is \\(\\sqrt{"+fmt(nd)+"}\\)? Give the exact value.", {t:fmt(rd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
    "Find the decimal that multiplies by itself to give "+fmt(nd)+": \\[ \\begin{aligned} "+fmt(rd)+" \\times "+fmt(rd)+" &= "+fmt(nd)+" \\\\ \\sqrt{"+fmt(nd)+"} &= "+fmt(rd)+" \\end{aligned} \\] The square root is <b>"+fmt(rd)+"</b>.",
    {mode:"decimal", n:nd});
}, ["For a fraction, root the top and the bottom separately; for a decimal, hunt among the tenths.", "Ask which number, multiplied by itself, gives exactly the value under the root sign."]);

E("u2-number-from-root", 2, ["6.11"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var p=ri(2,12), q=ri(2,12), g=0;
    while(u2gcd(p,q)!==1&&g<60){p=ri(2,12);q=ri(2,12);g++;}
    var correct="\\("+FR(p*p,q*q)+"\\)";
    var cands=[
      {t:"\\("+FR(2*p,q)+"\\)", fb:"That is double the root: squaring means multiply the root by itself, not by 2."},
      {t:"\\("+FR(p,2*q)+"\\)", fb:"That is half the root: the number comes from squaring the root, not halving it."},
      {t:"\\("+FR((p+1)*(p+1),q*q)+"\\)", fb:"That squares a neighbouring fraction: use the root shown, with top "+p+" and bottom "+q+"."},
      {t:"\\("+FR(p*p,(q+1)*(q+1))+"\\)", fb:"That squares a neighbouring fraction: use the root shown, with top "+p+" and bottom "+q+"."},
      {t:"\\("+FR(p*p,q)+"\\)", fb:"Only the top was squared: the bottom part must be squared as well."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    return mcq("A positive number has square root \\("+FR(p,q)+"\\) . What is the number?", {t:correct, fb:"Yes: square the top and the bottom separately."}, opts,
      "Squaring undoes a square root, and both parts are squared: \\[ \\begin{aligned} \\left("+FR(p,q)+"\\right)^{2} &= "+FR(p,q)+" \\times "+FR(p,q)+" \\\\ &= "+FR(p*p,q*q)+" \\end{aligned} \\] The number is <b>\\("+FR(p*p,q*q)+"\\)</b>.",
      {mode:"fraction", p:p, q:q});
  }
  var k=ri(4,29); var g2=0;
  while(k%10===0&&g2<40){k=ri(4,29);g2++;}
  var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var cands2=[
    {v:u2r2(2*rd), fb:"That is double the root: squaring means multiply the root by itself, not by 2."},
    {v:u2r2((rd+0.1)*(rd+0.1)), fb:"That squares the next tenth up: use the root shown, "+fmt(rd)+"."},
    {v:u2r2((rd-0.1)*(rd-0.1)), fb:"That squares the next tenth down: use the root shown, "+fmt(rd)+"."},
    {v:u2r2(nd+1), fb:"That adds 1 to the squared value: just multiply the root by itself."},
    {v:u2r2(nd+0.1), fb:"That is a little more than the squared root: multiply the root by itself exactly."}
  ];
  var dopts=[], seen2={};
  for(var j=0;j<cands2.length&&dopts.length<3;j++){var v=cands2[j].v; if(v!==nd&&v>0&&!seen2[v]){seen2[v]=1;dopts.push({v:v, fb:cands2[j].fb});}}
  dopts=fmtPairDs(fmt(nd), dopts);
  return mcq("A positive number has square root "+fmt(rd)+". What is the number?", {t:fmt(nd), fb:"Yes: "+fmt(rd)+" times "+fmt(rd)+" equals "+fmt(nd)+"."}, dopts,
    "Squaring undoes a square root: \\[ \\begin{aligned} "+fmt(rd)+"^{2} &= "+fmt(rd)+" \\times "+fmt(rd)+" \\\\ &= "+fmt(nd)+" \\end{aligned} \\] The number is <b>"+fmt(nd)+"</b>.",
    {mode:"decimal", r:rd});
}, ["Squaring and square roots undo each other, so square the given root.", "Multiply the root by itself, squaring the top and bottom separately for a fraction."]);

E("u2-calc-root-round", 2, ["6.6"], 1, "gen", function(){
  var isFrac=pick(["whole","fraction"])==="fraction";
  var val, label, rn, rd2;
  if(isFrac){
    var g=0;
    while(true){
      var n0=ri(2,40), d0=ri(2,12), gg=u2gcd(n0,d0);
      rn=n0/gg; rd2=d0/gg;
      if(rd2>1){var s1=Math.sqrt(rn), s2=Math.sqrt(rd2); if(!(s1===Math.floor(s1)&&s2===Math.floor(s2))){break;}}
      if(++g>200){break;}
    }
    val=rn/rd2; label=FR(rn,rd2);
  } else {
    var nw=u2nonSquare(11,399); val=nw; label=String(nw);
  }
  var root=Math.sqrt(val);
  var ans=u2r2(root);
  var trunc=Math.floor(root*100)/100;
  var onedp=u2r1(root);
  var delta=isFrac?((rn>1)?pick([-1,1]):1):pick([-1,1]);
  var neigh=isFrac?u2r2(Math.sqrt((rn+delta)/rd2)):u2r2(Math.sqrt(val+delta));
  var cands=[
    {v:trunc, fb:"That value is cut off after two decimal places: look at the third decimal and round up when it is 5 or more."},
    {v:onedp, fb:"That value is rounded to one decimal place: the question asks for two decimal places."},
    {v:neigh, fb:"That is the root of a neighbouring number: check the value under the root sign."},
    {v:u2r2(ans+0.01), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans-0.01), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans+0.02), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."},
    {v:u2r2(ans-0.02), fb:"That is a rounding slip in the last digit: check the third decimal place on the display."}
  ];
  var opts=[], seen={};
  for(var i=0;i<cands.length&&opts.length<3;i++){var v=cands[i].v; if(v!==ans&&v>0&&!seen[v]){seen[v]=1;opts.push({t:fmtF(v,2), fb:cands[i].fb});}}
  return mcq("Use a calculator. What is \\(\\sqrt{"+label+"}\\), to two decimal places?", {t:fmtF(ans,2), fb:"Yes: the third decimal place decides the rounding, and it rounds to "+fmtF(ans,2)+"."}, opts,
    "A calculator gives the root, and the third decimal decides how it rounds: \\[ \\begin{aligned} \\sqrt{"+label+"} &\\approx "+fmt(root)+" \\\\ &\\approx "+fmtF(ans,2)+" \\end{aligned} \\] To two decimal places, the square root is <b>"+fmtF(ans,2)+"</b>.",
    {mode:isFrac?"fraction":"whole", val:val});
}, ["Use a calculator for the root, then round the display to two decimal places.", "Read the third decimal digit: it tells you whether the second decimal stays or rounds up."]);

E("u2-approx-explain-gen", 2, ["6.7"], 1, "gen", function(){
  var N=u2nonSquare(2,99);
  var places=pick([2,3,4]);
  var shown=Math.round(Math.sqrt(N)*Math.pow(10,places))/Math.pow(10,places);
  var shS=fmtF(shown,places);
  var sq=shown*shown;
  var frame=pick(["screen","student","project"]);
  var prompt;
  if(frame==="screen"){prompt="A calculator shows \\(\\sqrt{"+N+"} \\approx "+shS+"\\). Why is the value on the screen an approximation?";}
  else if(frame==="student"){prompt="A student says the exact value of \\(\\sqrt{"+N+"}\\) is "+shS+", the value on the calculator screen. Why is the student wrong?";}
  else {prompt="For a project, a student uses "+shS+" as the value of \\(\\sqrt{"+N+"}\\). Why is "+shS+" called an approximation?";}
  return mcq(prompt,
    {t:"Squaring "+shS+" does not give exactly "+N+", because the true root continues past the digits shown", fb:"Right: "+shS+" squared is "+fmt(sq)+", close to "+N+" but not equal to it."},
    [{t:"The calculator made an arithmetic error working out the root of "+N+", so its digits cannot be trusted", fb:"The calculator works properly: the limit is how many digits can be shown."},
     {t:"The value is exact, because a root shown to "+places+" decimal places has all of its digits given in full", fb:"More places still means rounded: the digits of this root continue past them."},
     {t:"The number "+N+" has no square root at all, so the screen can only show a rough guess in its place", fb:N+" does have a square root: it just never ends or repeats as a decimal."}],
    "The shown value is rounded, and squaring it shows the gap: \\[ \\begin{aligned} ("+shS+")^{2} &= "+fmt(sq)+" \\\\ &\\ne "+N+" \\end{aligned} \\] Because its square is not exactly "+N+", the shown value is <b>an approximation, not the exact root</b>.",
    {mode:frame, N:N, places:places});
}, ["Ask whether squaring the shown value gives back the starting number exactly.", "Square the shown value and compare it with the number under the root sign."]);

E("u2-overlap-pair", 2, ["9.1"], 3, "gen", function(){
  if(pick(["tri-on-rect","cyl-on-tri"])==="tri-on-rect"){
    var tr=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]);
    var a=tr[0], b=tr[1], c=tr[2];
    var l=ri(6,14), h=ri(3,9), w=a;
    var boxSA=2*(l*w+l*h+w*h);
    var triSA=a*b+(a+b+c)*l;
    var contact=a*l;
    var tot=boxSA+triSA-2*contact;
    var q = numq("A model is built by joining two solids face to face. The bottom solid is a right rectangular prism "+l+" cm long, "+w+" cm wide and "+h+" cm high. On top of it sits a right triangular prism, a prism with right triangle ends and rectangular sides. Its triangular ends have legs "+a+" cm and "+b+" cm and hypotenuse "+c+" cm, the prism is "+l+" cm long, and its bottom face, "+a+" cm by "+l+" cm, exactly covers the top face of the bottom prism. The face where the two solids join is hidden inside the model. Find the total surface area of the model, in square centimetres.", tot, 0.01,
      "The overlap is the "+a+" cm by "+l+" cm rectangle where the two prisms join. It is a face of each solid, so it is hidden twice and comes off both surface areas: \\[ \\begin{aligned} \\text{overlap} &= "+a+" \\times "+l+" = "+contact+" \\\\ SA &= "+boxSA+" + "+triSA+" - 2("+contact+") \\\\ &= "+tot+" \\end{aligned} \\] The total surface area is <b>"+tot+" cm\\(^{2}\\)</b>.",
      {mode:"tri-on-rect", a:a, b:b, c:c, l:l, h:h});
    q.figure = solBoxTri(a, b, c, l, a, h, fmt(a) + " cm", fmt(b) + " cm", fmt(c) + " cm", fmt(l) + " cm", "", fmt(h) + " cm", "Triangular prism on a box with labelled dimensions");
    return q;
  }
  var tr2=pick([[6,8,10],[9,12,15],[12,16,20],[8,15,17]]);
  var a2=tr2[0], b2=tr2[1], c2=tr2[2];
  var L=ri(10,16);
  var r=(a2>=9)?ri(2,4):ri(2,3);
  var hc=ri(4,10);
  var triSA2=a2*b2+(a2+b2+c2)*L;
  var cylSA=u2r2(2*3.14*r*r+2*3.14*r*hc);
  var circ=u2r2(3.14*r*r);
  var tot2=u2r1(triSA2+cylSA-2*circ);
  var q = numq("A right cylinder stands on a right triangular prism, a prism with right triangle ends and rectangular sides. The triangular ends have legs "+a2+" cm and "+b2+" cm and hypotenuse "+c2+" cm, and the prism is "+L+" cm long. The cylinder has radius "+r+" cm and height "+hc+" cm, and it stands on the rectangular face of the prism that measures "+a2+" cm by "+L+" cm, with its whole base on that face. The part where the two solids touch is hidden inside the finished object. Find the total surface area, in square centimetres. Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", tot2, 0.6,
    "The overlap is the circle where the cylinder meets the prism. It is hidden on the prism face and it is the base of the cylinder, so its area comes off twice: \\[ \\begin{aligned} \\text{overlap} &= 3.14 \\times "+r+"^{2} = "+fmt(circ)+" \\\\ SA &= "+triSA2+" + "+fmt(cylSA)+" - 2("+fmt(circ)+") \\\\ &= "+fmt(tot2)+" \\end{aligned} \\] The total surface area is <b>"+fmt(tot2)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-tri", a:a2, b:b2, c:c2, L:L, r:r, hc:hc});
    q.figure = solCylOnTri(a2, b2, c2, L, r, hc, fmt(a2) + " cm", fmt(b2) + " cm", fmt(c2) + " cm", fmt(L) + " cm", fmt(r) + " cm", fmt(hc) + " cm", "Cylinder on a triangular prism with labelled dimensions");
    return q;
}, ["Add the surface areas of the two separate solids first, then deal with the join.", "Find the area of the face where the solids touch, and subtract it twice because it is hidden on both solids."]);

