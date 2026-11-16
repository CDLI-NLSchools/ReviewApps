// Math 2201 Tranche 3 to 8 additions (Units 1 to 4 depth, the QE RHS review, and the October 2026 finish-line passes) question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 2142 to
// 3852, the Tranche 3 to 8 blocks at the head of its main
// script), followed by its selection-engine note and the
// postMid flagging (lines 3860 to 3865), which runs last
// there too. The mid-course cap those flags serve is a
// shell behaviour driven by the course configuration
// (presets.mid.cap in courses.js).
// CRMARKS: u1-sine-two-step=2
// CRMARKS: u1-cosine-context=2
// CRMARKS: u1-two-station-height=4
// CRMARKS: u2-axis-two-points=1
// CRMARKS: u2-standard-from-factored=2
// CRMARKS: u2-revenue-model=2
// CRMARKS: u2-count-intercepts=1
// CRMARKS: u2-max-area=3
// CRMARKS: u3-zeros-factored=1
// CRMARKS: u3-factor-monic=2
// CRMARKS: u3-solve-square=1
// CRMARKS: u3-gcf-solve=2
// CRMARKS: u3-setup-equation=1
// CRMARKS: u3-border=3
// CRMARKS: u3-exact-roots=2
// CRMARKS: u4-variable-mixed=2
// CRMARKS: u4-multiply-mixed=2
// CRMARKS: u4-equation-restriction=1
// CRMARKS: u4-verify-root=1
// CRMARKS: u4-model-equation=2
// CRMARKS: u4-model-evaluate=1
// CRMARKS: u4-cube-mixed=2
// CRMARKS: u4-cube-equation=2
// CRMARKS: u4-combine-multi=2
// CRMARKS: u4-binomial-square=2
// CRMARKS: u4-triangle-perimeter=2
// CRMARKS: u4-width-radical=2
// CRMARKS: u3-equation-fraction-roots=2
// CRMARKS: u3-solve-height=2
// CRMARKS: u3-model-number=2
// CRMARKS: u8-congruence-deduce=1
// CRMARKS: u8-multi-angle=2
// CRMARKS: u8-triangle-algebra=2
// CRMARKS: u8-polygon-inverse=1
// CRMARKS: u1-smallest-angle=2
// CRMARKS: u1-angle-between-paths=4
// CRMARKS: u1-guy-wire=3
// CRMARKS: u6-pack-cost=2
// CRMARKS: u6-rate-difference=2
// CRMARKS: u6-poster-dimensions=2
// CRMARKS: u6-tile-cost=3
// CRMARKS: u7-race-order=2
// CRMARKS: u7-everyday-counterexample=2
// CRMARKS: u7-pattern-equation=2
// CRMARKS: u7-counterexample-claims=2
// CRMARKS: u2-y-intercept=1
// CRMARKS: u2-mirror-point=1
// CRMARKS: u2-vertex-time=1
// CRMARKS: u2-fence-max=3
// CRMARKS: u3-roots-sum-product=1
// CRMARKS: u3-factor-nonmonic=2
// CRMARKS: u3-standard-coeffs=1
// CRMARKS: u3-two-numbers=3
// CRMARKS: u4-evaluate-mixed=1
// CRMARKS: u4-divide-radicals=2
// CRMARKS: u4-rationalize-coefficient=2
// CRMARKS: u4-conjugate-area=2
// CRMARKS: u8-diagonals=1
// CRMARKS: u8-isosceles-angles=2
// CRMARKS: u8-corresponding-algebra=2
// CRMARKS: u8-parallel-x-value=3
// CRMARKS: u8-isosceles-exterior=2
// CRMARKS: u8-regular-sides-from-angle=3
// CRMARKS: u8-exterior-algebra=3
// CRMARKS: u2-vertex-form-eval=1
// CRMARKS: u2-factored-y-intercept=1
// CRMARKS: u2-max-height=2
// CRMARKS: u3-factor-difference=2
// CRMARKS: u3-root-difference=3
// CRMARKS: u4-entire-cube=1
// CRMARKS: u4-product-simplify=2
// CRMARKS: u4-add-unlike=2
// CRMARKS: u4-diagonal-radical=2
// CRMARKS: u8-cointerior-algebra=2
// CRMARKS: u8-congruence-perimeter=2
// CRMARKS: u8-congruent-perimeter=1
// CRMARKS: u8-angle-chase=2
// CRMARKS: u1-ambiguous-count=3
// CRMARKS: u1-median-length=4
// CRMARKS: u2-evaluate-f=1
// CRMARKS: u2-vertex-shift=1
// CRMARKS: u2-factored-max-height=2
// CRMARKS: u3-formula-exact-roots=2
// CRMARKS: u3-squares-area=3
// CRMARKS: u3-number-pair=2
// CRMARKS: u4-compare-radicals=1
// CRMARKS: u4-difference-simplify=2
// CRMARKS: u4-reciprocal-sum=3
// CRMARKS: u6-map-distance=2
// CRMARKS: u7-proof-repair=3
// CRMARKS: u7-smallest-counterexample=2
// CRMARKS: u7-counterexample-name=2
// CRMARKS: u7-triangular-total=3
// CRMARKS: u7-chain-conclusion=3
// CRMARKS: u7-false-pattern=2
// CRMARKS: u7-figure-pattern=1
/* ============ Tranche 3 (Oct 26): Units 1-4 depth ============
   Existing tests and question banks, including the Holy Spirit sample
   tests and reviews and the NL Schools topic lists (see
   harvest/newsites-inventory.md), were reviewed only to gauge the
   expected depth and range of treatment; every item was written new
   with new numbers and contexts, nothing copied verbatim.
   Also repairs two indicator tags from the original build: u4-order was
   tagged 1.3 but it orders radicals (1.4), and u4-multiply was tagged
   1.4 but it multiplies radicals (an operation, 1.6). */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-sine-side-mc",1,["7.2"],2,"gen",function(){
  var A=0,B=0,a=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,60);B=ri(40,80);a=ri(8,24);
    if(A+B<=95||A+B>=168)continue;
    var C=180-A-B;if(C<=10||C>=90)continue;
    var sA=Math.sin(A*Math.PI/180),sB=Math.sin(B*Math.PI/180),sC=Math.sin(C*Math.PI/180);
    key=a*sB/sA;d1=a*sA/sB;d2=a*sB/sC;d3=a*sC/sA;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var b=key,cval=a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (the side opposite \\(\\angle A\\)). What is the length of side \\(b\\), in cm?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "Use the sine law and pair each side with its opposite angle: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\). So \\(b = \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,a:a});
  q.figure=triSVG(a,b,cval,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[a+" cm","?",null]});
  return q;
});
E("u1-cosine-angle-mc",1,["7.2"],2,"gen",function(){
  var Atar=0,b=0,c=0,a=0,Aang=0,Bang=0,Cang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70,75,80]);b=ri(6,14);c=ri(6,14);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180))*10)/10;
    var cosA=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cosA)>=1)continue;
    Aang=Math.acos(cosA)*180/Math.PI;
    var cosB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(cosB)>=1)continue;
    Bang=Math.acos(cosB)*180/Math.PI;Cang=180-Aang-Bang;
    if(Cang<=5||Cang>=90)continue;
    var os=[""+Math.round(Aang),""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq("A triangle has sides "+fmt(a,1)+" cm, "+b+" cm and "+c+" cm. What is the angle opposite the side of length "+fmt(a,1)+" cm, in degrees?",
    ""+Math.round(Aang),[""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)],
    "Rearrange the cosine law for the angle opposite side \\(a\\): \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2("+b+")("+c+")}\\). This gives \\(A \\approx \\)<b>\\("+Math.round(Aang)+"^\\circ\\)</b>. The side squared on its own at the end of the numerator is the one opposite the angle being found.",
    {a:a,b:b,c:c});
  q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-crossing-distance",1,["7.3"],2,"gen",function(){
  var D=0,al=0,be=0,R=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    D=ri(40,120);al=ri(35,70);be=ri(35,70);
    R=180-al-be;if(R<25||R>80)continue;
    var sR=Math.sin(R*Math.PI/180);
    key=D*Math.sin(be*Math.PI/180)/sR;
    d1=D*Math.sin(al*Math.PI/180)/sR;
    d2=D*sR/Math.sin(be*Math.PI/180);
    d3=D*Math.sin(be*Math.PI/180)/Math.sin(al*Math.PI/180);
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("Two points \\(P\\) and \\(Q\\) on one shore of a lake are "+D+" m apart. A buoy \\(R\\) floats on the lake. From \\(P\\), the angle between the line to \\(Q\\) and the line to the buoy is \\("+al+"^\\circ\\); from \\(Q\\), the angle between the line to \\(P\\) and the line to the buoy is \\("+be+"^\\circ\\). How far is the buoy from \\(P\\), in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The two shore points and the buoy form a triangle. The angle at the buoy is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+R+"^\\circ\\). By the sine law, \\(\\frac{PR}{\\sin "+be+"^\\circ} = \\frac{"+D+"}{\\sin "+R+"^\\circ}\\), so \\(PR = \\frac{"+D+" \\sin "+be+"^\\circ}{\\sin "+R+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ m}\\)</b>.",
    {D:D,al:al,be:be,R:R});
});
E("u1-sine-two-step",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A,B,C,tries=0;
  do{A=ri(28,58);B=ri(24,58);C=180-A-B;tries++;}while((C<25||C>95)&&tries<40);
  var a=ri(8,30);
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var q=numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and the side opposite \\(\\angle A\\) is \\("+a+"\\text{ cm}\\). Find the length of the side opposite \\(\\angle C\\), to one decimal place, in cm.",
    fmt(c,1),0.06,
    "First the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Then the sine law: \\(\\frac{c}{\\sin "+C+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\), so \\(c = "+a+" \\times \\frac{\\sin "+C+"^\\circ}{\\sin "+A+"^\\circ} = \\)<b>\\("+fmt(c,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,C:C,a:a});
  q.figure=triAngSVG(A,B,C,{ang:[A+"\u00B0",B+"\u00B0",C+"\u00B0"],side:[a+" cm",null,"?"]});
  return q;
});
E("u1-cosine-context",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(8,38),w=ri(8,38),ang=ri(38,128);
  var d=Math.sqrt(p*p+w*w-2*p*w*Math.cos(rd(ang)));
  var ctx=pick([
    "Two boats leave the same wharf at the same time. One travels "+p+" km and the other travels "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their courses.",
    "Two hikers leave a trailhead at the same time. One walks "+p+" km and the other walks "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their paths.",
    "Two straight roads leave an intersection. A gas station is "+p+" km along one road and a school is "+w+" km along the other, with an angle of \\("+ang+"^\\circ\\) between the roads. The distance between the gas station and the school is measured straight across."
  ]);
  var q=numq(ctx+" How far apart are the two endpoints, to one decimal place, in km?",
    fmt(d,1),0.06,
    "The two distances and the distance apart form a triangle with an included angle of \\("+ang+"^\\circ\\), so the cosine law applies: \\(d^2 = "+p+"^2 + "+w+"^2 - 2("+p+")("+w+")\\cos("+ang+"^\\circ) = "+fmt(p*p+w*w-2*p*w*Math.cos(rd(ang)),1)+"\\), so \\(d = \\)<b>\\("+fmt(d,1)+"\\text{ km}\\)</b>.",
    {p:p,w:w,ang:ang});
  q.figure=triSVG(d,p,w,{L:["A","B","C"],ang:[ang+"\u00B0",null,null],side:["?",w+" km",p+" km"]});
  return q;
});
E("u1-two-station-height",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(18,36),be=al+ri(12,28),dd=pick([15,20,25,30,40,50,60]);
  var slant=dd*Math.sin(rd(al))/Math.sin(rd(be-al));
  var h=slant*Math.sin(rd(be));
  var thing=pick(["a tower","a lighthouse","a communications mast"]);
  return numq("From a point on level ground, the angle of elevation to the top of "+thing+" is \\("+al+"^\\circ\\). Moving "+dd+" m closer to it, the angle of elevation is \\("+be+"^\\circ\\). Find its height, to one decimal place, in m.",
    fmt(h,1),0.06,
    "The two ground points and the top form a triangle. Its angle at the farther point is \\("+al+"^\\circ\\), and its angle at the top is \\("+be+"^\\circ - "+al+"^\\circ = "+(be-al)+"^\\circ\\). By the sine law, the distance from the nearer point to the top is \\("+dd+" \\times \\frac{\\sin "+al+"^\\circ}{\\sin "+(be-al)+"^\\circ} = "+fmt(slant,1)+"\\text{ m}\\). The height is then \\("+fmt(slant,1)+" \\times \\sin "+be+"^\\circ = \\)<b>\\("+fmt(h,1)+"\\text{ m}\\)</b>.",
    {al:al,be:be,dd:dd});
});
E("u1-law-choice-context",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("A triangle has sides of \\(9\\text{ cm}\\) and \\(14\\text{ cm}\\) with the angle of \\(58^\\circ\\) between them. Which law gives the third side directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "The known angle sits between the two known sides (SAS), so the cosine law gives the third side in one step. The sine law needs a known side-angle pair, which this triangle does not give yet." );},
  function(){return mcq("A triangle has angles of \\(47^\\circ\\) and \\(71^\\circ\\) and a side of \\(12\\text{ m}\\) opposite the \\(47^\\circ\\) angle. Which law gives another side directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "There is a known side-angle pair (\\(12\\text{ m}\\) opposite \\(47^\\circ\\)), so the sine law sets up a proportion for any other side. The cosine law would need two sides around a known angle." );},
  function(){return mcq("The three sides of a triangle measure \\(7\\text{ km}\\), \\(10\\text{ km}\\) and \\(13\\text{ km}\\). Which law gives one of its angles directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "With all three sides known (SSS) and no angle given, the cosine law rearranges to give an angle. The sine law cannot start without a known angle." );},
  function(){return mcq("In \\(\\triangle PQR\\), \\(\\angle P = 39^\\circ\\), \\(\\angle Q = 84^\\circ\\), and the side opposite \\(\\angle Q\\) is \\(15\\text{ m}\\). Which law gives the side opposite \\(\\angle P\\) directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "The side of \\(15\\text{ m}\\) is opposite the known angle of \\(84^\\circ\\), a known side-angle pair, so the sine law gives the side opposite \\(39^\\circ\\) in one proportion.");}
]));

/* --- Unit 2: Quadratic Functions --- */
E("u2-which-quadratic",2,["4.10"],1,"var",varset([
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 2)(x - 5)\\)",["\\(y = 3x - 7\\)","\\(y = x^3 - x\\)","\\(y = \\sqrt{x + 1}\\)"],
    "\\((x + 2)(x - 5)\\) expands to \\(x^2 - 3x - 10\\): an \\(x^2\\) term and nothing of higher degree. The others are linear, cubic and a radical relation." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (2x - 1)(x + 3)\\)",["\\(y = \\frac{5}{x}\\)","\\(y = x(x^2 + 1)\\)","\\(y = -4x + 1\\)"],
    "\\((2x - 1)(x + 3)\\) expands to \\(2x^2 + 5x - 3\\), which is quadratic. Note \\(y = x(x^2 + 1)\\) expands to \\(x^3 + x\\), a cubic in disguise." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 4)^2\\)",["\\(y = 3x\\)","\\(y = x^3 + 2x\\)","\\(y = -x + 9\\)"],
    "\\((x + 4)^2\\) expands to \\(x^2 + 8x + 16\\), a quadratic. Squaring a binomial always produces an \\(x^2\\) term." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = x^2 - 3x\\)",["\\(y = 7 - x\\)","\\(y = 2x^3\\)","\\(y = \\sqrt{x}\\)"],
    "\\(y = x^2 - 3x\\) has degree \\(2\\). The others are linear (degree \\(1\\)), cubic (degree \\(3\\)) and a square-root relation.");}
]));
E("u2-axis-two-points",2,["4.13"],1,"gen",function(){
  var x1=ri(-9,3),gap=pick([2,4,6,8,10,12,14]),x2=x1+gap,y=ri(-6,12);
  var mid=(x1+x2)/2;
  var q=numq("The points \\(("+x1+", "+y+")\\) and \\(("+x2+", "+y+")\\) lie on the same parabola. What is the equation of the axis of symmetry? Give the value of \\(x\\).",
    mid,0.011,
    "The two points have the same y-coordinate, so they sit at the same height on the parabola, one on each side of the axis. The axis passes midway between them: \\(x = \\frac{"+x1+" + "+x2+"}{2} = \\)<b>\\("+fmt(mid,1)+"\\)</b>.",
    {x1:x1,x2:x2,y:y});
  q.figure=parTwoPtsSVG(x1,x2,y);
  return q;
});
E("u2-standard-from-factored",2,["4.5"],1,"gen",function(){
  var a=pick([1,2,-2,3,-1]),r1,r2,tries=0;
  do{r1=ri(-6,6);r2=ri(-6,6);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<40);
  var B=-a*(r1+r2),C=a*r1*r2;
  function fsB(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which function is the standard form of "+factT(a,r1,r2)+"?",
    "\\(y = "+quadB(a,B,C)+"\\)",
    ["\\(y = "+quadB(a,-B,C)+"\\)","\\(y = "+quadB(a,B,-C)+"\\)","\\(y = "+quadB(a,-B,-C)+"\\)"],
    "Expand the factors: \\[\\begin{aligned} "+fsB(r1)+fsB(r2)+" &= x^2 - ("+r1+" + "+r2+")x + ("+r1+")("+r2+") \\\\ &= x^2 "+((-(r1+r2))>0?"+ ":"- ")+Math.abs(r1+r2)+"x "+(r1*r2>0?"+ ":"- ")+Math.abs(r1*r2)+" \\end{aligned}\\] Multiplying through by \\("+a+"\\) gives \\(y = "+quadB(a,B,C)+"\\). Watch the signs: the middle coefficient is \\(-"+a+" \\times ("+r1+" + "+r2+") = "+B+"\\).",
    {a:a,r1:r1,r2:r2});
});
E("u2-revenue-model",2,["4.2"],2,"gen",function(){
  var N=pick([240,300,360,400,450,500,600]),P=pick([8,10,12,15,20]),s=pick([10,15,20,25,30,40]);
  var frame=pick([
    "A theatre sells "+N+" tickets per show at $"+P+" each. For every $1 increase in the ticket price, "+s+" fewer tickets are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A ferry carries "+N+" passengers per crossing at $"+P+" per passenger. For every $1 added to the fare, "+s+" fewer passengers ride. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A market stall sells "+N+" jars of preserves a week at $"+P+" each. For every $1 increase in the price, "+s+" fewer jars are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?"
  ]);
  var q=mcq(frame,
    "\\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\)",
    ["\\(R(x) = ("+N+" + "+s+"x)("+P+" + x)\\)","\\(R(x) = ("+N+" - "+s+"x)("+P+" - x)\\)","\\(R(x) = ("+N+" - "+s+")("+P+" + x)\\)"],
    "After \\(x\\) increases, the price is \\("+P+" + x\\) dollars and the number sold is \\("+N+" - "+s+"x\\) (it drops by "+s+" per increase, so the drop is \\("+s+"x\\) in total). Revenue is price \\(\\times\\) quantity: \\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\).",
    {N:N,P:P,s:s});
  q.figure=parSVG(-s,N-s*P,N*P,{xrange:[0,N/s],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return q;
});
E("u2-count-intercepts",2,["4.15"],1,"gen",function(){
  var a=pick([1,2,-1,-2,3,-3]),h=ri(-6,6),k=ri(-9,9);
  var cnt=(k===0)?1:(((a>0&&k<0)||(a<0&&k>0))?2:0);
  var q=numq("How many x-intercepts does the graph of "+vertT(a,h,k)+" have?",
    cnt,0.011,
    "The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(a>0?"upward":"downward")+". "+(k===0?"The vertex sits right on the x-axis, so the graph touches it at exactly one point: <b>\\(1\\)</b> x-intercept.":(cnt===2?"The vertex is on the opposite side of the x-axis from the direction the parabola opens away from, so the graph must cross the axis twice: <b>\\(2\\)</b> x-intercepts.":"The vertex is on the same side of the x-axis as the opening, so the graph never reaches the axis: <b>\\(0\\)</b> x-intercepts.")),
    {a:a,h:h,k:k});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{});
  return q;
});
E("u2-max-area",2,["4.2"],3,"gen",function(){
  var F=4*ri(6,40);
  var w=F/4,maxA=F*F/8,mode=ri(0,2);
  var c=pick([
    "A farmer uses "+F+" m of fencing to enclose a rectangular garden against a long barn wall. The wall forms one full side of the garden, so fencing is needed on only three sides.",
    "A homeowner uses "+F+" m of fencing to build a rectangular dog pen against the side of a house. The house forms one full side of the pen, so fencing is needed on only three sides.",
    "A lifeguard uses "+F+" m of rope to mark off a rectangular swimming area along a straight beach. The beach forms one full side, so rope is needed on only three sides."
  ]);
  var ask=(mode===0?" What is the maximum area that can be enclosed, in \\(m^2\\)?":(mode===1?" What is the length of each side perpendicular to the wall or beach when the area is greatest, in m?":" What is the length of the side parallel to the wall or beach when the area is greatest, in m?"));
  var q=numq(c+ask,
    mode===0?maxA:(mode===1?w:F/2),0.011,
    "Let \\(w\\) be the length of each side perpendicular to the wall. The side parallel to the wall is then \\("+F+" - 2w\\), and the area is \\(A = w("+F+" - 2w)\\). This quadratic opens downward; its vertex is at \\(w = \\frac{"+F+"}{4} = "+w+"\\) m. The maximum area is \\("+w+" \\times ("+F+" - 2 \\times "+w+") = "+w+" \\times "+(F-2*w)+" = \\)<b>\\("+maxA+"\\text{ m}^2\\)</b>, with the parallel side measuring "+(F-2*w)+" m.",
    {F:F,mode:mode});
  q.figure=fenceSVG(F,(c.indexOf("barn")>=0?"barn wall":(c.indexOf("house")>=0?"house":"beach")));
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-zeros-factored",3,["4.6","4.8"],1,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var p=ri(2,5),qq,tries=0;
  do{qq=ri(1,9);tries++;}while(qq===p&&tries<30);
  var r=ri(1,9);
  var root1=fr(qq,p),root1T=frB(qq,p);
  return mcq("What are the zeros of \\(y = ("+p+"x - "+qq+")(x + "+r+")\\)?",
    "\\(x = -"+r+"\\) and \\(x = "+root1T+"\\)",
    ["\\(x = "+r+"\\) and \\(x = "+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = -"+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = "+frB(p,qq)+"\\)"],
    "Set each factor equal to zero. From \\(x + "+r+" = 0\\), \\(x = -"+r+"\\). From \\("+p+"x - "+qq+" = 0\\), \\("+p+"x = "+qq+"\\), so \\(x = "+root1T+"\\).",
    {p:p,qq:qq,r:r});
});
E("u3-factor-monic",3,["PK.2"],1,"gen",function(){
  var r1,r2,tries=0;
  do{r1=ri(-9,9);r2=ri(-9,9);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<60);
  var b=-(r1+r2),c=r1*r2;
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which is the factored form of "+quadT(1,b,c)+"?",
    "\\("+fs(r1)+fs(r2)+"\\)",
    ["\\("+fs(-r1)+fs(-r2)+"\\)","\\("+fs(-r1)+fs(r2)+"\\)","\\("+fs(r1)+fs(-r2)+"\\)"],
    "Look for two numbers that multiply to \\("+c+"\\) and add to \\("+b+"\\): they are \\("+(-r1)+"\\) and \\("+(-r2)+"\\). So \\("+quadB(1,b,c)+" = "+fs(r1)+fs(r2)+"\\). (Expand it back to check: the middle term is \\(-("+r1+" + "+r2+")x = "+b+"x\\).)",
    {r1:r1,r2:r2});
});
E("u3-first-mistake",3,["4.6"],2,"var",varset([
  function(){return mcq("A student solves \\(x^2 - 5x + 6 = 0\\) by factoring.<br>Line 1: \\((x - 2)(x - 3) = 0\\)<br>Line 2: \\(x - 2 = 0\\) &nbsp;or&nbsp; \\(x - 3 = 0\\)<br>Line 3: \\(x = 2\\) &nbsp;or&nbsp; \\(x = -3\\)<br>Line 4: The roots are \\(2\\) and \\(-3\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "The factoring in Line 1 is correct (\\(2 \\times 3 = 6\\) and \\(-2 - 3 = -5\\)) and Line 2 applies the zero-product rule properly. In Line 3, \\(x - 3 = 0\\) gives \\(x = +3\\), not \\(-3\\). The roots are \\(2\\) and \\(3\\)." );},
  function(){return mcq("A student solves \\(x^2 + 6x + 4 = 0\\) using the quadratic formula.<br>Line 1: \\(x = \\frac{-6 \\pm \\sqrt{6^2 - 4(1)(4)}}{2}\\)<br>Line 2: \\(x = \\frac{-6 \\pm \\sqrt{52}}{2}\\)<br>Line 3: \\(x = \\frac{-6 \\pm 2\\sqrt{13}}{2}\\)<br>Line 4: \\(x = -3 \\pm \\sqrt{13}\\)<br>In which line is the FIRST mistake?",
    "Line 2",["Line 1","Line 3","Line 4"],
    "Line 1 sets up the formula correctly. In Line 2, \\(6^2 - 4(1)(4) = 36 - 16 = 20\\), not \\(52\\) (the student added instead of subtracting). Everything after is consistent with that wrong value; the correct roots are \\(x = -3 \\pm \\sqrt{5}\\)." );},
  function(){return mcq("A student solves \\(x^2 = 5x\\).<br>Line 1: Divide both sides by \\(x\\): \\(x = 5\\)<br>Line 2: Check: \\(5^2 = 25\\) and \\(5 \\times 5 = 25\\), so \\(x = 5\\) works<br>Line 3: The only root is \\(x = 5\\)<br>Line 4: Answer: \\(x = 5\\)<br>In which line is the FIRST mistake?",
    "Line 1",["Line 2","Line 3","Line 4"],
    "The mistake is Line 1: dividing both sides by \\(x\\) throws away the root \\(x = 0\\), because you cannot divide by a quantity that might be zero. Done properly: \\(x^2 - 5x = 0\\), so \\(x(x - 5) = 0\\), giving \\(x = 0\\) or \\(x = 5\\)." );},
  function(){return mcq("A student solves \\(x^2 - 4x - 5 = 0\\) by factoring.<br>Line 1: \\((x - 5)(x + 1) = 0\\)<br>Line 2: \\(x - 5 = 0\\) &nbsp;or&nbsp; \\(x + 1 = 0\\)<br>Line 3: \\(x = 5\\) &nbsp;or&nbsp; \\(x = 1\\)<br>Line 4: The roots are \\(5\\) and \\(1\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "Line 1 factors correctly (\\(-5 \\times 1 = -5\\) and \\(-5 + 1 = -4\\)) and Line 2 is a proper zero-product split. In Line 3, \\(x + 1 = 0\\) gives \\(x = -1\\), not \\(1\\). The roots are \\(5\\) and \\(-1\\).");}
]));
E("u3-solve-square",3,["4.8"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var m=ri(1,9),n=pick([1,2,3,4]),k=pick([1,2,3]),tries=0;
  while(m===n&&tries<30){m=ri(1,9);tries++;}
  var A=n*n*k,B=m*m*k;
  var d3=(m===1)?("\\(x = \\pm "+frB(2,n)+"\\)"):("\\(x = \\pm "+frB(m*m,n)+"\\)");
  return mcq("Solve: \\("+(A===1?"":A)+"x^2 = "+B+"\\).",
    "\\(x = \\pm "+frB(m,n)+"\\)",
    ["\\(x = "+frB(m,n)+"\\) only","\\(x = \\pm "+frB(n,m)+"\\)",d3],
    "Divide both sides by \\("+A+"\\), then take the square root of both sides, remembering the negative root: \\[\\begin{aligned} x^2 &= \\frac{"+B+"}{"+A+"} = "+frB(B,A)+" \\\\ x &= \\pm "+frB(m,n)+" \\end{aligned}\\]",
    {m:m,n:n,k:k});
});
E("u3-gcf-solve",3,["4.8"],2,"gen",function(){
  var a=ri(2,7),r=ri(-9,9);while(r===0)r=ri(-9,9);
  var b=a*r;
  return numq("Solve by factoring: "+"\\("+quadB(a,b,0)+" = 0\\)"+". Give the nonzero root.",
    -r,0.011,
    "Factor out the common factor \\("+a+"x\\): \\("+a+"x(x "+(r>0?"+ "+r:"- "+(-r))+") = 0\\). So \\(x = 0\\) or \\(x = "+(-r)+"\\). The nonzero root is <b>\\("+(-r)+"\\)</b>.",
    {a:a,r:r});
});
E("u3-setup-equation",3,["4.3"],2,"var",varset([
  figArm(function(){return mcq("A flare is launched from the top of a 45 m cliff. Its height above the water after t seconds is \\(h(t) = -5t^2 + 30t + 45\\). Which equation determines the times when the flare is 65 m above the water?",
    "\\(65 = -5t^2 + 30t + 45\\)",
    ["\\(0 = -5t^2 + 30t + 45\\)","\\(t = -5(65)^2 + 30(65) + 45\\)","\\(65 = -5t^2 + 30t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 65\\). The equation \\(0 = \\dots\\) would be for hitting the water, and the second option wrongly substitutes \\(65\\) for \\(t\\) instead of for \\(h(t)\\)." );},figSetupEq1),
  figArm(function(){return mcq("A diver's height above a pool after t seconds is \\(h(t) = -5t^2 + 8t + 12\\). Which equation determines the times when the diver is 14 m above the pool?",
    "\\(14 = -5t^2 + 8t + 12\\)",
    ["\\(0 = -5t^2 + 8t + 12\\)","\\(t = -5(14)^2 + 8(14) + 12\\)","\\(14 = -5t^2 + 8t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 14\\), keeping the constant term \\(12\\) (the starting height) in place." );},figSetupEq2),
  figArm(function(){return mcq("A fountain jet's height after t seconds is \\(h(t) = -5t^2 + 20t + 3\\). Which equation determines the times when the water is 18 m above the nozzle?",
    "\\(18 = -5t^2 + 20t + 3\\)",
    ["\\(0 = -5t^2 + 20t + 3\\)","\\(t = -5(18)^2 + 20(18) + 3\\)","\\(18 = -5t^2 + 20t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 18\\). Substituting \\(18\\) for \\(t\\) (the second option) would evaluate the height at \\(t = 18\\) s instead.");},figSetupEq3)
]));
E("u3-border",3,["4.3"],3,"gen",function(){
  var L=pick([12,16,18,20,24,30]),W=pick([8,10,12,14]),w=pick([1,1.5,2,2.5,3]),tries=0;
  while(W>=L&&tries<30){W=pick([8,10,12,14]);tries++;}
  var T=(L+2*w)*(W+2*w);
  var c=pick([
    {s:"A rectangular driveway is "+L+" m long and "+W+" m wide. A brick border of uniform width is built around all four sides of the driveway. The total area of the driveway and the border together is \\("+T+"\\text{ m}^2\\).",n:"border"},
    {s:"A rectangular garden plot is "+L+" m by "+W+" m. A gravel path of uniform width is built around all four sides of the plot. The total area of the plot and the path together is \\("+T+"\\text{ m}^2\\).",n:"path"}
  ]);
  var q=numq(c.s+" Find the width of the "+c.n+", in m.",
    w,0.011,
    "Let the width be \\(w\\). The border adds \\(w\\) to every side, so the outside dimensions are \\(("+L+" + 2w)\\) by \\(("+W+" + 2w)\\), and \\[\\begin{aligned} ("+L+" + 2w)("+W+" + 2w) &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w + "+(L*W)+" &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w - "+(T-L*W)+" &= 0 \\end{aligned}\\] The quadratic formula gives \\(w = "+w+"\\) or a negative value; a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",
    {L:L,W:W,w:w});
  q.figure=borderSVG(L,W);
  return q;
});
E("u3-formula-repair",3,["4.9"],3,"gen",function(){
  function pair(r1,r2){var lo=Math.min(r1,r2),hi=Math.max(r1,r2);return "\\(x = "+lo+"\\) and \\(x = "+hi+"\\)";}
  var m=0,n=0,a=1,b=0,c=0,D=0,sq=0,tmpl=0,tries=0,ok=false,keyS="",stuS="",othS="",flipS="";
  while(!ok&&tries<400){tries++;
    m=ri(-6,6);n=ri(-6,6);a=pick([1,2]);tmpl=ri(0,1);
    if(m===0||n===0||m===n||m+n===0)continue;
    b=-a*(m+n);c=a*m*n;D=b*b-4*a*c;sq=a*Math.abs(m-n);
    keyS=pair(m,n);
    stuS=tmpl===0?pair(-m,-n):pair(2*m,2*n);
    othS=tmpl===0?pair(2*m,2*n):pair(-m,-n);
    flipS=pair(-m,n);
    var os=[keyS,stuS,othS,flipS];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var work;
  if(tmpl===0){
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+b+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }else{
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+a+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }
  return mcq(work,keyS,[stuS,othS,flipS],
    "The quadratic formula needs \\(-b\\) in the numerator and \\(2a\\) in the denominator: \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} = \\frac{"+(-b)+" \\pm "+sq+"}{"+(2*a)+"}\\), which gives <b>"+keyS+"</b>. The student\u2019s first line already departs from the formula, so their roots are wrong even though the arithmetic after it was consistent.",
    {m:m,n:n,a:a,tmpl:tmpl});
});
E("u3-discriminant-parameter",3,["4.7"],3,"gen",function(){
  if(Math.random()<0.5){
    var pairs=[[1,9],[1,16],[1,25],[1,36],[2,8],[2,18],[4,9]];
    var pr=pick(pairs);var a=pr[0],c=pr[1];var ac=a*c;var rt=Math.round(Math.sqrt(ac));
    function os4(p){return "\\(k = "+p+"\\) or \\(k = -"+p+"\\)";}
    var stems=[
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have exactly one real solution?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have two equal real roots?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have a repeated root?"];
    return mcq(pick(stems),os4(2*rt),[os4(rt),os4(2*ac),os4(ac)],
      "A single repeated solution means the discriminant is zero: \\(k^2 - 4("+a+")("+c+") = 0\\), so \\(k^2 = "+(4*ac)+"\\) and \\(k = \\pm 2\\sqrt{"+ac+"}\\), giving <b>"+os4(2*rt)+"</b>. Both signs work, because only \\(k^2\\) appears in the discriminant.",
      {a:a,c:c});
  }
  var bs=[6,8,10,12,14];var b=pick(bs);var th=b*b/4;var off=ri(1,8);
  var e1=ri(2,4),e2=e1+ri(2,4);
  return mcq("The equation \\(x^2 + "+b+"x + k = 0\\) has no real solutions. Which value could \\(k\\) be?",
    ""+(th+off),[""+th,""+(th-e1),""+(th-e2)],
    "No real solutions means the discriminant is negative: \\("+b+"^2 - 4k < 0\\), which gives \\(k > \\frac{"+(b*b)+"}{4} = "+th+"\\). Only \\("+(th+off)+"\\) is greater than \\("+th+"\\): at \\(k = "+th+"\\) there would be exactly one solution, and smaller values give two.",
    {b:b,th:th});
});
E("u3-exact-roots",3,["4.9"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function rootPair(aa,bb,cc){
    var D=bb*bb-4*aa*cc;if(D<=0)return null;
    var rt=Math.round(Math.sqrt(D));if(rt*rt===D)return null;
    var sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
    if(d0===1)return null;
    var g=g2(g2(Math.abs(bb),sq),2*aa),nb=-bb/g,s=sq/g,den=(2*aa)/g;
    var num=""+nb+" \\pm "+(s===1?"":s)+"\\sqrt{"+d0+"}";
    return den===1?("\\(x = "+num+"\\)"):("\\(x = \\frac{"+num+"}{"+den+"}\\)");
  }
  var a,b,c,key,d1,d2,d3,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-9,9);tries++;
    if(b===0||c===0){key=null;continue;}
    key=rootPair(a,b,c);d1=rootPair(a,-b,c);d2=rootPair(a,b,-c);d3=rootPair(a,c,b);
  }while((!key||!d1||!d2||!d3||d1===key||d2===key||d3===key||d2===d1||d3===d1||d3===d2)&&tries<300);
  var D=b*b-4*a*c,sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
  var g=g2(g2(Math.abs(b),sq),2*a);
  return mcq("What are the exact roots of "+"\\("+quadB(a,b,c)+" = 0\\)"+"?",
    key,[d1,d2,d3],
    "Quadratic formula: \\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] Since \\("+D+" = "+(sq*sq)+" \\times "+d0+"\\), \\(\\sqrt{"+D+"} = "+sq+"\\sqrt{"+d0+"}\\)"+(g>1?", and dividing numerator and denominator by \\("+g+"\\)":"")+", giving <b>"+key+"</b>.",
    {a:a,b:b,c:c});
});

/* --- Unit 4: Radicals --- */
E("u4-variable-mixed",4,["1.3"],2,"gen",function(){
  var s=ri(2,5),r=pick([2,3,5,6,7]),n=pick([1,2,3]);
  var coef=s*s*r,p=2*n+1;
  var xnT=(n===1?"x":"x^{"+n+"}");
  return mcq("Simplify: \\(\\sqrt{"+coef+"x^{"+p+"}}\\).",
    "\\("+s+xnT+"\\sqrt{"+r+"x}\\)",
    ["\\("+(s+1)+xnT+"\\sqrt{"+r+"x}\\)", "\\("+s+"x^{"+(n+1)+"}\\sqrt{"+r+"x}\\)", "\\("+s+xnT+"\\sqrt{"+coef+"x}\\)"],
    "\\("+coef+" = "+(s*s)+" \\times "+r+"\\) and \\(x^{"+p+"} = (x^{"+n+"})^2 x\\), so the square factors come out: \\(\\sqrt{"+coef+"x^{"+p+"}} = "+s+xnT+"\\sqrt{"+r+"x}\\). One x stays inside because the exponent \\("+p+"\\) is odd.",
    {s:s,r:r,n:n});
});
E("u4-multiply-mixed",4,["1.6"],2,"gen",function(){
  var pairs=[[2,3],[2,5],[2,6],[2,7],[2,10],[3,5],[3,6],[3,7],[3,10],[5,6],[5,7],[5,10],[6,7],[6,10],[7,10]];
  var pr=pick(pairs),b=pr[0],d=pr[1],a=ri(2,4),c=ri(2,4);
  var bd=b*d,t=1,rr=bd,f;for(f=2;f*f<=rr;f++){while(rr%(f*f)===0){rr/=(f*f);t*=f;}}
  var key=radT(a*c*t,rr);
  var d2=(t>1)?radT(a*c,rr):radT(a*c*t,d);
  var d3=radT(a*c*t,b+d);
  return mcq("Simplify: ("+radT(a,b)+")("+radT(c,d)+").",
    key,
    [radT(a*c*t,b),d2,d3],
    "Multiply the outside numbers together and the inside numbers together: \\("+a+" \\times "+c+" = "+(a*c)+"\\) and \\(\\sqrt{"+b+"} \\times \\sqrt{"+d+"} = \\sqrt{"+bd+"}\\). Then simplify \\(\\sqrt{"+bd+"} = "+(t>1?(t+"\\sqrt{"+rr+"}"):("\\sqrt{"+rr+"}"))+"\\), so the product is "+key+".",
    {a:a,b:b,c:c,d:d});
});
E("u4-equation-restriction",4,["1.8"],1,"gen",function(){
  var p=pick([1,2,3,4]),m=ri(-6,8),r=ri(2,9),tries=0;
  while(m===0&&tries<20){m=ri(-6,8);tries++;}
  var q=-p*m;
  var inside=(p===1?"x":(""+p+"x"))+(q>0?" + "+q:" - "+(-q));
  return mcq("State the restriction on x in the radical equation \\(\\sqrt{"+inside+"} = "+r+"\\).",
    "\\(x \\geq "+m+"\\)",
    ["\\(x \\leq "+m+"\\)","\\(x \\geq "+(-m)+"\\)","All real numbers"],
    "The radicand cannot be negative: \\("+inside+" \\ge 0\\) gives \\("+(p===1?"x":(""+p+"x"))+" \\ge "+(-q)+"\\), so \\(x \\ge "+m+"\\). This restriction must hold before the equation can have any solution at all.",
    {p:p,m:m,r:r});
});
E("u4-verify-root",4,["1.10"],1,"gen",function(){
  var s=ri(3,9),a=ri(3,20),b=ri(2,6);
  var X=s*s-a;
  if(Math.random()<0.5){
    return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the LEFT side, \\(\\sqrt{x + "+a+"}\\)?",
      s,0.011,
      "\\(\\sqrt{"+X+" + "+a+"} = \\sqrt{"+(s*s)+"}\\) = <b>\\("+s+"\\)</b>. (For comparison, the right side at \\(x = "+X+"\\) is \\("+X+" - "+b+" = "+(X-b)+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
      {mode:1,X:X,a:a,b:b});
  }
  return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the RIGHT side, \\(x - "+b+"\\)?",
    X-b,0.011,
    "\\("+X+" - "+b+"\\) = <b>\\("+(X-b)+"\\)</b>. (For comparison, the left side at \\(x = "+X+"\\) is \\(\\sqrt{"+X+" + "+a+"} = "+s+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
    {mode:2,X:X,a:a,b:b});
});
E("u4-model-equation",4,["1.12"],2,"gen",function(){
  var T=pick([2,3,4,5,6]),L=T*T/4;
  return numq("The period of a simple pendulum is modelled by \\(T = 2\\sqrt{L}\\), where T is the period in seconds and L is the length in metres. How long is a pendulum whose period is "+T+" s, in m?",
    L,0.011,
    "\\("+T+" = 2\\sqrt{L}\\), so \\(\\sqrt{L} = "+T+" \\div 2 = "+fmt(T/2,2)+"\\). Squaring both sides gives \\(L\\) = <b>\\("+fmt(L,2)+"\\text{ m}\\)</b>.",
    {mode:2,T:T});
});
E("u4-model-evaluate",4,["1.12"],1,"gen",function(){
  {
    var d=ri(3,60),sp=5*Math.sqrt(d);
    return numq("Police estimate a car's speed from a skid mark using \\(s = \\sqrt{25d}\\), where s is the speed in km/h and d is the length of the skid mark in metres. A skid mark at a collision scene measures "+d+" m. Estimate the car's speed, to one decimal place, in km/h.",
      fmt(sp,1),0.06,
      "Substitute \\(d = "+d+"\\): \\(s = \\sqrt{25 \\times "+d+"} = \\sqrt{"+(25*d)+"} \\approx "+fmt(sp,1)+"\\). So the speed is about <b>\\("+fmt(sp,1)+"\\text{ km/h}\\)</b>.",
      {mode:1,d:d});
  }
});

/* ============ Tranche 4 (Oct 26): QE RHS review: Units 4, 3, 8 ============
   Existing tests and question banks, including the QE RHS radicals /
   quadratic equations / angles tests and reviews (see
   harvest/qerhs-inventory.md), were reviewed only to gauge the expected
   depth and range of treatment; every item was written new with new
   numbers and contexts, nothing copied verbatim. */

/* --- Unit 4: Radicals --- */
E("u4-cube-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7,10,11,13,14,15,21,22,26,30]);
  var neg=Math.random()<0.25;
  var mag=a*a*a*b;
  return mcq("Express "+cbrtT((neg?"-":"")+mag)+" as a mixed radical in simplest form.",
    rad3T(neg?-a:a,b),
    [rad3T(neg?-(a+1):a+1,b),rad3T(neg?-a:a,b+1),rad3T(neg?-a:a,a*b)],
    "Find the largest perfect cube dividing \\("+mag+"\\): \\("+mag+" = "+(a*a*a)+" \\times "+b+"\\). Cube roots group factors in threes, so "+cbrtT((neg?"-":"")+mag)+" = "+rad3T(neg?-a:a,b)+"."+(neg?" (A cube root of a negative number is negative.)":""),
    {a:a,b:b,neg:neg});
});
E("u4-cube-equation",4,["1.9"],2,"gen",function(){
  var r=ri(-4,5),p=pick([1,2,3]),x0=ri(-12,20);
  var q=r*r*r-p*x0;
  var inside=(p===1?"x":p+"x")+(q>0?" + "+q:(q<0?" - "+(-q):""));
  var sol="Cube both sides"+(p>1?", then divide by \\("+p+"\\)":"")+": \\[\\begin{aligned} "+inside+" &= {"+r+"}^{3} = "+(r*r*r)+" \\\\ "+(p===1?"x":p+"x")+" &= "+(r*r*r)+(q>0?" - "+q:(q<0?" + "+(-q):""))+" = "+(p*x0)+" \\\\ x &= "+x0+" \\end{aligned}\\] (Cube roots accept negative inputs, so there is no restriction to check.)";
  return numq("Solve: \\(\\sqrt[3]{"+inside+"} = "+r+"\\). Give the value of x.",
    x0,0.011,sol,{r:r,p:p,x0:x0,q:q});
});
E("u4-combine-multi",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var D,M,SG,tot,tries=0;
  do{
    D=[ri(1,3),ri(1,3),ri(1,3)];M=[ri(1,4),ri(2,4),ri(1,4)];
    SG=[1,Math.random()<0.5?-1:1,Math.random()<0.5?-1:1];
    tot=D[0]*M[0]+SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];tries++;
  }while(tot<1&&tries<60);
  function term(i){return radT(D[i],M[i]*M[i]*b);}
  var key=radT(tot,b);
  var slip1=D[0]*M[0]-SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];
  var d2v=D[0]*M[0]+SG[1]*D[1]*M[1];
  var cand=[slip1,d2v,tot+1,tot+2,tot+3,tot+5],ds=[];
  for(var ci=0;ci<cand.length&&ds.length<2;ci++){var cv=cand[ci];if(cv>=1&&cv!==tot&&ds.indexOf(cv)<0)ds.push(cv);}
  var d1=radT(ds[0],b),d2=radT(ds[1],b);
  var d3=sqrtT(M[0]*M[0]*b+M[1]*M[1]*b+M[2]*M[2]*b);
  return mcq("Simplify: \\("+term(0).slice(2,-2)+(SG[1]>0?" + ":" - ")+term(1).slice(2,-2)+(SG[2]>0?" + ":" - ")+term(2).slice(2,-2)+"\\)",
    key,[d1,d2,d3],
    "Simplify each term first: "+term(0)+" = "+radT(D[0]*M[0],b)+", "+term(1)+" = "+radT(D[1]*M[1],b)+", and "+term(2)+" = "+radT(D[2]*M[2],b)+". They are like radicals, so combine the coefficients: \\("+(D[0]*M[0])+" "+(SG[1]>0?"+ ":"- ")+(D[1]*M[1])+" "+(SG[2]>0?"+ ":"- ")+(D[2]*M[2])+" = "+tot+"\\), giving <b>"+key+"</b>.",
    {b:b,D:D,M:M,SG:SG});
});
E("u4-binomial-square",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),n=pick([2,3,5,6,7,10,11,13].filter(function(x){return x!==m;}));
  var mn=m*n,t=1,r=mn,f;for(f=2;f*f<=r;f++){while(r%(f*f)===0){r/=(f*f);t*=f;}}
  var plus=Math.random()<0.5;
  var sgn=plus?"+":"\u2212",osgn=plus?"\u2212":"+";
  var sgnT=plus?"+":"-",osgnT=plus?"-":"+";
  var key="\\("+(m+n)+" "+sgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)";
  return mcq("Expand and simplify: \\((\\sqrt{"+m+"} "+sgnT+" \\sqrt{"+n+"})^2\\).",
    key,
    ["\\("+(m+n)+" "+osgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)","\\("+(m+n)+" "+sgnT+" \\sqrt{"+mn+"}\\)","\\("+(m+n)+" "+sgnT+" "+t+"\\sqrt{"+r+"}\\)"],
    "\\((a "+sgnT+" b)^2 = a^2 "+sgnT+" 2ab + b^2\\). Here \\(a^2 = "+m+"\\) and \\(b^2 = "+n+"\\), and the middle term is \\(2\\sqrt{"+m+"} \\times \\sqrt{"+n+"} = 2\\sqrt{"+mn+"} = "+(2*t)+"\\sqrt{"+r+"}\\). Adding the parts: \\("+m+" + "+n+" = "+(m+n)+"\\), so the expansion is "+key+".",
    {m:m,n:n,plus:plus});
});
E("u4-triangle-perimeter",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var s1=ri(1,4),s2=ri(1,4),s3=ri(1,4),sum=s1+s2+s3;
  var n1=s1*s1*b,n2=s2*s2*b,n3=s3*s3*b;
  return mcq("A triangle has sides of "+sqrtT(n1)+" cm, "+sqrtT(n2)+" cm and "+sqrtT(n3)+" cm. What is its perimeter, in simplest radical form?",
    radT(sum,b),
    [radT(s1+s2,b),sqrtT(n1+n2+n3),radT(sum+1,b)],
    "Simplify each side: "+sqrtT(n1)+" = "+radT(s1,b)+", "+sqrtT(n2)+" = "+radT(s2,b)+", "+sqrtT(n3)+" = "+radT(s3,b)+". Add the like radicals: \\("+s1+" + "+s2+" + "+s3+" = "+sum+"\\), so the perimeter is <b>"+radT(sum,b)+" cm</b>. (Do not add the numbers under one root.)",
    {b:b,s:[s1,s2,s3]});
});
E("u4-width-radical",4,["1.6"],2,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7]),c=ri(2,5),d=pick([2,3,5,6,7]);
  var bd=b*d,t=1,r0=bd,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var keyW=radT(a,b);
  var candW=[[a,b*d],[a*c,b],[a*t,r0],[a,d],[a+1,b],[c,b],[a*c,b*d]],dsW=[];
  for(var ci=0;ci<candW.length&&dsW.length<3;ci++){var stW=radT(candW[ci][0],candW[ci][1]);if(stW!==keyW&&dsW.indexOf(stW)<0)dsW.push(stW);}
  return mcq("A rectangle has area \\("+(a*c)+"\\sqrt{"+bd+"}\\) \\(cm^2\\) and length "+radT(c,d)+" cm. What is its width, in simplest radical form?",
    keyW,
    dsW,
    "Width = area \\(\\div\\) length = \\("+(a*c)+"\\sqrt{"+bd+"} \\div "+c+"\\sqrt{"+d+"}\\). Divide the coefficients: \\("+(a*c)+" \\div "+c+" = "+a+"\\). Divide the radicals: \\(\\sqrt{"+bd+"} \\div \\sqrt{"+d+"} = \\sqrt{"+b+"}\\). So the width is <b>"+radT(a,b)+" cm</b>.",
    {a:a,b:b,c:c,d:d});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-equation-fraction-roots",3,["4.6"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x;}
  function mkRoot(){var p,q,tries=0;do{p=pick([-3,-2,-1,1,2,3]);q=pick([2,3,4]);tries++;}while(gcd(p,q)!==1&&tries<40);return [p,q];}
  var r1=mkRoot(),r2=mkRoot(),tries=0;
  while(r1[0]*r2[1]+r2[0]*r1[1]===0&&tries<40){r2=mkRoot();tries++;}
  var p1=r1[0],q1=r1[1],p2=r2[0],q2=r2[1];
  var A=q1*q2,B=-(p1*q2+p2*q1),C=p1*p2;
  function fr(p,q){return (p<0?"-":"")+Math.abs(p)+"/"+q;}
  var key="\\("+quadB(A,B,C)+" = 0\\)";
  return mcq("Which quadratic equation has roots of \\("+frB(p1,q1)+"\\) and \\("+frB(p2,q2)+"\\)?",
    key,
    ["\\("+quadB(A,-B,C)+" = 0\\)","\\("+quadB(A,B,-C)+" = 0\\)","\\("+quadB(A,-B,-C)+" = 0\\)"],
    "Build the factors from the roots: \\(("+q1+"x "+(p1>0?"- "+p1:"+ "+(-p1))+")("+q2+"x "+(p2>0?"- "+p2:"+ "+(-p2))+") = 0\\). Expanding gives \\("+quadB(A,B,C)+" = 0\\), that is, <b>"+key+"</b>.",
    {A:A,B:B,C:C});
});
E("u3-solve-height",3,["4.3"],2,"gen",function(){
  var combos=[[1,4,40],[1,4,50],[1,5,40],[1,5,50],[1,5,60],[1,6,50],[1,6,60],[2,4,60],[2,4,80],[2,5,80],[1,7,60],[2,6,100]];
  var cb=pick(combos),t1=cb[0],t2=cb[1],H=cb[2];
  var b=5*(t1+t2),c0=H-5*t1*t2;
  var later=Math.random()<0.5;
  var ctx=pick([["missile","fired from a ship","above the water"],["rocket","launched from a platform","above the ground"],["flare","fired from a cliff top","above the sea"]]);
  var q=numq("A "+ctx[0]+" is "+ctx[1]+". Its height "+ctx[2]+" after t seconds is \\(h(t) = -5t^2 + "+b+"t + "+c0+"\\) (metres). At what time is it exactly "+H+" m "+ctx[2]+"? Give the "+(later?"later":"earlier")+" time, in s.",
    later?t2:t1,0.011,
    "Set \\(h(t) = "+H+"\\), then divide by \\(-5\\) and factor: \\[\\begin{aligned} -5t^2 + "+b+"t + "+c0+" &= "+H+" \\\\ -5t^2 + "+b+"t + "+(c0-H)+" &= 0 \\\\ t^2 - "+(t1+t2)+"t + "+(t1*t2)+" &= 0 \\\\ (t - "+t1+")(t - "+t2+") &= 0 \\end{aligned}\\] The "+ctx[0]+" is at "+H+" m at \\(t = "+t1+"\\) s and \\(t = "+t2+"\\) s; the "+(later?"later":"earlier")+" time is <b>\\("+(later?t2:t1)+"\\) s</b>.",
    {t1:t1,t2:t2,H:H,later:later});
  q.figure=trajSVG(-5,b,c0,{hline:H});
  return q;
});
E("u3-model-number",3,["4.3"],2,"var",varset([
  function(){return mcq("The product of two consecutive even integers is 120. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x(x + 2) = 120\\)",
    ["\\(x(x + 1) = 120\\)","\\((x + 2)(x + 2) = 120\\)","\\(x + (x + 2) = 120\\)"],
    "Consecutive even integers differ by \\(2\\), so the integers are \\(x\\) and \\(x + 2\\). Their product is \\(x(x + 2)\\), set equal to \\(120\\).",
    {});},
  function(){return mcq("The sum of the squares of two consecutive integers is 85. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x^2 + (x + 1)^2 = 85\\)",
    ["\\((x + (x + 1))^2 = 85\\)","\\(x^2 + (x + 2)^2 = 85\\)","\\(2x^2 = 85\\)"],
    "Consecutive integers are \\(x\\) and \\(x + 1\\). Square each, then add: \\(x^2 + (x + 1)^2 = 85\\).",
    {});},
  function(){return mcq("A rectangular room is 10 m by 8 m. A strip of width x metres is removed along one full length and one full width, making the room smaller on two adjacent sides. The new area is \\(48\\text{ m}^2\\). Which equation models this?",
    "\\((10 - x)(8 - x) = 48\\)",
    ["\\((10 - 2x)(8 - 2x) = 48\\)","\\((10 + x)(8 + x) = 48\\)","\\((10 - 2x)(8 - x) = 48\\)"],
    "Only one length and one width shrink, each by \\(x\\) (not \\(2x\\)): the new dimensions are \\((10 - x)\\) and \\((8 - x)\\), and their product is the new area, \\(48\\).",
    {});},
  function(){return mcq("A rectangle's length is 3 m more than its width. Its area is \\(40\\text{ m}^2\\). If \\(x\\) is the width, which equation models this?",
    "\\(x(x + 3) = 40\\)",
    ["\\(x + (x + 3) = 40\\)","\\(x^2 + 3 = 40\\)","\\((x - 3)x = 40\\)"],
    "The width is \\(x\\) and the length is \\(x + 3\\). Area = width \\(\\times\\) length = \\(x(x + 3) = 40\\).",
    {});}
]));

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-congruence-deduce",8,["5.6"],1,"gen",function(){
  var sets=[["A","B","C"],["P","Q","R"],["X","Y","Z"],["D","E","F"],["M","N","S"],["J","K","L"]];
  var s1=pick(sets),s2=pick(sets.filter(function(x){return x!==s1;}));
  var name1=s1.join(""),name2=s2.join("");
  var corr="\\("+s1[0]+" \\leftrightarrow "+s2[0]+", "+s1[1]+" \\leftrightarrow "+s2[1]+", "+s1[2]+" \\leftrightarrow "+s2[2]+"\\)";
  var i=ri(0,2);
  if(Math.random()<0.5){
    var key="\\(\\angle "+s1[i]+" = \\angle "+s2[i]+"\\)";
    return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
      key,
      ["\\(\\angle "+s1[i]+" = \\angle "+s2[(i+1)%3]+"\\)","\\(\\angle "+s1[i]+" = \\angle "+s2[(i+2)%3]+"\\)","\\(\\angle "+s1[(i+1)%3]+" = \\angle "+s2[i]+"\\)"],
      "In a congruence statement the vertices match in order: "+corr+". So \\(\\angle "+s1[i]+"\\) corresponds to \\(\\angle "+s2[i]+"\\), and corresponding angles of congruent triangles are equal.",
      {mode:"angle",s1:s1,s2:s2,i:i});
  }
  var sides=[[0,1],[1,2],[0,2]],sd=pick(sides),u=sd[0],v=sd[1],w=3-u-v;
  var keyS="\\("+s1[u]+s1[v]+" = "+s2[u]+s2[v]+"\\)";
  return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
    keyS,
    ["\\("+s1[u]+s1[v]+" = "+s2[u]+s2[w]+"\\)","\\("+s1[u]+s1[v]+" = "+s2[v]+s2[w]+"\\)","\\("+s1[u]+s1[w]+" = "+s2[u]+s2[v]+"\\)"],
    "In a congruence statement the vertices match in order: "+corr+". Side \\("+s1[u]+s1[v]+"\\) joins the first-named corresponding vertices, so it matches side \\("+s2[u]+s2[v]+"\\), and corresponding sides of congruent triangles are equal.",
    {mode:"side",s1:s1,s2:s2,u:u,v:v});
});
E("u8-multi-angle",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is vertically opposite a \\(110^\\circ\\) angle. \\(\\angle y\\) is a corresponding angle to \\(\\angle x\\). \\(\\angle z\\) forms a co-interior pair with \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)",
    ["\\(\\angle x = 110^\\circ, \\angle y = 70^\\circ, \\angle z = 110^\\circ\\)","\\(\\angle x = 70^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)","\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 110^\\circ\\)"],
    "Vertically opposite angles are equal, so \\(\\angle x = 110^\\circ\\). Corresponding angles are equal, so \\(\\angle y = 110^\\circ\\). Co-interior angles are supplementary: \\(\\angle z = 180^\\circ - 110^\\circ = 70^\\circ\\).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is a corresponding angle to a \\(65^\\circ\\) angle. \\(\\angle y\\) sits beside \\(\\angle x\\) on a straight line. \\(\\angle z\\) is vertically opposite \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 115^\\circ\\)",
    ["\\(\\angle x = 65^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 115^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 65^\\circ\\)"],
    "Corresponding angles are equal, so \\(\\angle x = 65^\\circ\\). Angles on a straight line add to \\(180^\\circ\\), so \\(\\angle y = 115^\\circ\\). Vertically opposite angles are equal, so \\(\\angle z = 115^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 48^\\circ\\) and \\(\\angle B = 67^\\circ\\). \\(\\angle D\\) is the exterior angle at \\(C\\), formed by extending side \\(BC\\). What are \\(\\angle C\\) and \\(\\angle D\\)?",
    "\\(\\angle C = 65^\\circ, \\angle D = 115^\\circ\\)",
    ["\\(\\angle C = 65^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 115^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 67^\\circ, \\angle D = 113^\\circ\\)"],
    "The interior angles add to \\(180^\\circ\\): \\(\\angle C = 180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ\\). The exterior angle sits on a straight line with \\(\\angle C\\): \\(\\angle D = 180^\\circ - 65^\\circ = 115^\\circ\\) (which also equals \\(\\angle A + \\angle B\\)).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle p\\) and a \\(72^\\circ\\) angle are alternate interior angles. \\(\\angle q\\) forms a co-interior pair with \\(\\angle p\\). \\(\\angle r\\) is vertically opposite \\(\\angle q\\). What are the three measures?",
    "\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 108^\\circ\\)",
    ["\\(\\angle p = 72^\\circ, \\angle q = 72^\\circ, \\angle r = 108^\\circ\\)","\\(\\angle p = 108^\\circ, \\angle q = 72^\\circ, \\angle r = 72^\\circ\\)","\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 72^\\circ\\)"],
    "Alternate interior angles are equal, so \\(\\angle p = 72^\\circ\\). Co-interior angles are supplementary: \\(\\angle q = 180^\\circ - 72^\\circ = 108^\\circ\\). Vertically opposite angles are equal, so \\(\\angle r = 108^\\circ\\).",
    {});}
]));
E("u8-triangle-algebra",8,["5.8"],2,"gen",function(){
  var combos=[[1,2,3],[1,2,6],[2,3,4],[1,3,5],[2,3,7],[3,4,5],[1,4,7],[2,5,8],[3,5,7],[4,5,9],[5,7,8],[1,1,4],[1,2,7],[1,3,6],[2,2,6],[3,3,4],[1,4,5],[2,4,9],[4,4,7],[1,5,9],[3,6,9],[4,6,8],[5,5,8],[2,7,11],[4,7,9],[6,6,8],[1,9,20],[5,10,15],[10,12,14],[9,13,14],[15,20,25],[20,25,45]];
  var cb=pick(combos),a=cb[0],b=cb[1],c=cb[2];
  var x=180/(a+b+c),vi=ri(0,2),coef=cb[vi];
  return numq("The three angles of a triangle measure \\(("+a+"x)^\\circ\\), \\(("+b+"x)^\\circ\\) and \\(("+c+"x)^\\circ\\). What is the measure of the \\(("+coef+"x)^\\circ\\) angle, in degrees?",
    coef*x,0.011,
    "The angles add to \\(180^\\circ\\): \\[\\begin{aligned} ("+a+" + "+b+" + "+c+")x &= 180 \\\\ "+(a+b+c)+"x &= 180 \\\\ x &= "+x+" \\end{aligned}\\] The angle asked for is \\("+coef+"x = "+coef+" \\times "+x+" = \\)<b>\\("+(coef*x)+"^\\circ\\)</b>.",
    {cb:cb,vi:vi});
});
E("u8-polygon-inverse",8,["5.5"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var n=ri(5,40),S=(n-2)*180;
    return numq("The interior angles of a convex polygon add up to \\("+S+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,"The sum is \\((n - 2) \\times 180^\\circ\\). So \\(n - 2 = "+S+" \\div 180 = "+(n-2)+"\\), which gives \\(n = \\)<b>\\("+n+"\\)</b>.",{mode:0,n:n});
  }
  if(mode===1){
    var pair=pick([[5,108],[6,120],[8,135],[9,140],[10,144],[12,150],[15,156],[18,160],[20,162],[24,165]]),n1=pair[0];
    return numq("Each interior angle of a regular polygon measures \\("+pair[1]+"^\\circ\\). How many sides does the polygon have?",
      n1,0.011,"For a regular polygon each interior angle is \\((n - 2) \\times 180^\\circ \\div n\\). Trying \\(n = "+n1+"\\): \\(("+n1+" - 2) \\times 180 \\div "+n1+" = "+pair[1]+"^\\circ\\). So \\(n = \\)<b>\\("+n1+"\\)</b>. (Equivalently, each exterior angle is \\(180^\\circ - "+pair[1]+"^\\circ = "+(180-pair[1])+"^\\circ\\), and \\(360 \\div "+(180-pair[1])+" = "+n1+"\\).)",{mode:1,n:n1});
  }
  var pr=pick([[4,90],[5,72],[6,60],[8,45],[9,40],[10,36],[12,30],[15,24],[18,20],[20,18],[24,15],[30,12],[36,10],[40,9],[45,8],[60,6],[72,5],[90,4],[120,3],[180,2]]),n2=pr[0];
  return numq("Each exterior angle of a regular polygon measures \\("+pr[1]+"^\\circ\\). How many sides does the polygon have?",
    n2,0.011,"The exterior angles of any convex polygon add to \\(360^\\circ\\). For a regular polygon they are all equal, so \\(n = 360 \\div "+pr[1]+" = \\)<b>\\("+n2+"\\)</b>.",{mode:2,n:n2});
});
E("u8-proof-reason",8,["5.4"],1,"var",varset([
  function(){return mcq("Lines \\(PQ\\) and \\(RS\\) are parallel, cut by a transversal. \\(\\angle a\\) is at the top right of the first intersection, and \\(\\angle b\\) is at the top right of the second intersection. A student writes: “\\(\\angle a = \\angle b\\) because they are alternate interior angles.” What is wrong with the reason?",
    "The angles are corresponding angles, not alternate interior angles",
    ["Nothing - the reason given is correct for these two angles","The angles are co-interior angles, not alternate interior angles","The angles are vertically opposite angles, not alternate interior angles"],
    "\\(\\angle a\\) and \\(\\angle b\\) sit in the same relative position (top right) at each intersection, which makes them corresponding angles. Alternate interior angles sit between the two lines, on opposite sides of the transversal. The equality is right; the named reason is wrong.",
    {});},
  function(){var q=mcq("Given \\(AB \\parallel CD\\) and \\(AE = DE\\), with \\(E\\) on the segment joining the two lines, a proof shows \\(\\triangle ABE \\cong \\triangle DCE\\). One step states \\(\\angle BAE = \\angle CDE\\). Which reason justifies that step?",
    "Alternate interior angles, because \\(AB \\parallel CD\\)",
    ["Vertically opposite angles at the crossing","Corresponding angles, because \\(AB \\parallel CD\\) holds here","Co-interior angles, because \\(AB \\parallel CD\\) - they add up"],
    "\\(\\angle BAE\\) and \\(\\angle CDE\\) lie between the parallel lines, on opposite sides of the transversal \\(AD\\) (the line through A, E and D), so they are alternate interior angles, which are equal when the lines are parallel. (Co-interior angles would be supplementary, not equal.)",
    {});q.figure=bowtieSVG();return q;},
  function(){var q=mcq("In the same proof (\\(AB \\parallel CD\\), \\(AE = DE\\), prove \\(\\triangle ABE \\cong \\triangle DCE\\)), another step states \\(\\angle AEB = \\angle CED\\). Which reason justifies that step?",
    "Vertically opposite angles",
    ["Alternate interior angles, because \\(AB \\parallel CD\\)","Given information stated","The SSS congruence postulate"],
    "\\(\\angle AEB\\) and \\(\\angle CED\\) are formed by the same two intersecting lines at point \\(E\\), directly across from each other \u2014 vertically opposite angles, which are always equal. No parallel lines are needed for this step.",
    {});q.figure=bowtieSVG();return q;}
]));

/* ============ Tranche 5 (Oct 26): Payne first, then HHM ============
   Templates reworked from Mr. Payne's chapter reviews (Ch 3 Trigonometry,
   Ch 8a Proportional Reasoning) and Jason's HHM archive (Ch 1 reasoning
   review + the inductive reasoning / counterexamples worksheet). New
   numbers and contexts throughout; nothing copied verbatim. Targets the
   thinnest units against the outline weights: U1, U6, U7. */

/* --- Unit 1: Acute Triangle Trigonometry (Payne Ch 3) --- */
E("u1-law-formula",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(a\\) equals…",
    "\\(\\frac{c \\sin A}{\\sin C}\\)",
    ["\\(\\frac{c \\sin C}{\\sin A}\\)","\\(\\frac{\\sin A}{c \\sin C}\\)","\\(\\frac{c \\sin B}{\\sin C}\\)"],
    "From \\(\\frac{a}{\\sin A} = \\frac{c}{\\sin C}\\), multiply both sides by \\(\\sin A\\): \\(a = \\frac{c \\sin A}{\\sin C}\\). Each side pairs with the sine of its OPPOSITE angle.",
    {});},
  function(){return mcq("According to the cosine law, \\(c^2\\) equals…",
    "\\(a^2 + b^2 - 2ab\\cos C\\)",
    ["\\(a^2 + b^2 + 2ab\\cos C\\)","\\(a^2 + b^2 - 2ab\\cos A\\)","\\(a^2 - b^2 - 2ab\\cos C\\)"],
    "The cosine law for side \\(c\\) uses the angle BETWEEN sides \\(a\\) and \\(b\\), which is \\(C\\): \\(c^2 = a^2 + b^2 - 2ab\\cos C\\). The sign before the cosine term is minus.",
    {});},
  function(){return mcq("All three sides of a triangle are known. To find angle \\(C\\) first, \\(\\cos C\\) equals…",
    "\\(\\frac{a^2 + b^2 - c^2}{2ab}\\)",
    ["\\(\\frac{c^2 - a^2 - b^2}{2ab}\\)","\\(\\frac{a^2 + c^2 - b^2}{2ac}\\)","\\(\\frac{a^2 + b^2 - c^2}{ab}\\)"],
    "Rearrange \\(c^2 = a^2 + b^2 - 2ab\\cos C\\): move terms to get \\(2ab\\cos C = a^2 + b^2 - c^2\\), then divide by \\(2ab\\). (The second option is the rearrangement for angle \\(B\\), not \\(C\\)).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(b\\) equals…",
    "\\(\\frac{a \\sin B}{\\sin A}\\)",
    ["\\(\\frac{a \\sin A}{\\sin B}\\)","\\(\\frac{\\sin B}{a \\sin A}\\)","\\(\\frac{a \\sin C}{\\sin B}\\)"],
    "From \\(\\frac{b}{\\sin B} = \\frac{a}{\\sin A}\\), multiply both sides by \\(\\sin B\\): \\(b = \\frac{a \\sin B}{\\sin A}\\). Side \\(b\\) pairs with angle \\(B\\), and the known pair is \\(a\\) with \\(A\\).",
    {});}
]));
E("u1-smallest-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s,m,l,tries=0;
  do{
    s=ri(5,14);m=s+ri(1,8);l=m+ri(0,8);tries++;
  }while((s+m<=l||l>30)&&tries<60);
  var A=Math.acos((m*m+l*l-s*s)/(2*m*l))*180/Math.PI;
  var q=numq("A triangle has sides of \\("+s+"\\text{ cm}\\), \\("+m+"\\text{ cm}\\) and \\("+l+"\\text{ cm}\\). Find the measure of the SMALLEST angle, to the nearest degree.",
    Math.round(A),0.51,
    "The smallest angle is opposite the shortest side (\\("+s+"\\text{ cm}\\)). By the cosine law: \\(\\cos A = \\frac{"+m+"^2 + "+l+"^2 - "+s+"^2}{2 \\times "+m+" \\times "+l+"} = "+fmt((m*m+l*l-s*s)/(2*m*l),3)+"\\), so \\(A = \\)<b>\\("+Math.round(A)+"^\\circ\\)</b>. (Finding the angle opposite the longest side instead would give the LARGEST angle.)",
    {s:s,m:m,l:l});
  q.figure=triSVG(s,m,l,{L:["A","B","C"],ang:["?",null,null],side:[s+" cm",m+" cm",l+" cm"]});
  return q;
});
E("u1-angle-between-paths",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var ctx=pick([["airplane","airport"],["boat","dock"],["airplane","airport"]]);
  var v1=pick([240,280,320,360,400,440,480,520]),v2=pick([240,280,320,360,400,440,480,520].filter(function(x){return x!==v1;}));
  var t=pick([0.5,1,1.5]),d1=v1*t,d2=v2*t;
  var th=ri(35,145);
  var D=Math.round(Math.sqrt(d1*d1+d2*d2-2*d1*d2*Math.cos(rd(th))));
  var ang=Math.acos((d1*d1+d2*d2-D*D)/(2*d1*d2))*180/Math.PI;
  return numq("Two "+ctx[0]+"s leave the same "+ctx[1]+" at the same time. One travels at "+v1+" km/h and the other at "+v2+" km/h, each in a straight line. After "+t+" h they are "+D+" km apart. Find the angle between their paths, to the nearest degree.",
    Math.round(ang),0.51,
    "In \\("+t+"\\text{ h}\\) the "+ctx[0]+"s travel \\("+v1+" \\times "+t+" = "+d1+"\\text{ km}\\) and \\("+v2+" \\times "+t+" = "+d2+"\\text{ km}\\), so the triangle has sides \\("+d1+"\\text{ km}\\), \\("+d2+"\\text{ km}\\) and \\("+D+"\\text{ km}\\). The angle between the paths is at the "+ctx[1]+", opposite the \\("+D+"\\text{ km}\\) side: \\(\\cos\\theta = \\frac{"+d1+"^2 + "+d2+"^2 - "+D+"^2}{2 \\times "+d1+" \\times "+d2+"}\\), giving \\(\\theta = \\)<b>\\("+Math.round(ang)+"^\\circ\\)</b>.",
    {d1:d1,d2:d2,D:D});
});
E("u1-guy-wire",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(42,72),be=ri(42,76),tries=0;
  while(Math.abs(al-be)<6&&tries<40){be=ri(42,76);tries++;}
  var h0=ri(18,55);
  var D=Math.round(h0*(1/Math.tan(rd(al))+1/Math.tan(rd(be)))*10)/10;
  var ssum=Math.sin(rd(al+be));
  var wL=D*Math.sin(rd(be))/ssum,wR=D*Math.sin(rd(al))/ssum;
  var h=wL*Math.sin(rd(al));
  var askWire=Math.random()<0.5;
  var longest=Math.max(wL,wR);
  var q=numq("A radio tower stands vertically between two ground anchors "+fmt(D,1)+" m apart. From the anchor on the left, the angle of elevation to the top of the tower is \\("+al+"^\\circ\\); from the anchor on the right, it is \\("+be+"^\\circ\\). Find "+(askWire?"the length of the LONGER support wire":"the height of the tower")+", to one decimal place, in m.",
    fmt(askWire?longest:h,1),0.06,
    "The two anchors and the tower top form a triangle with base \\("+fmt(D,1)+"\\text{ m}\\) and base angles \\("+al+"^\\circ\\) and \\("+be+"^\\circ\\), so the angle at the top is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+(180-al-be)+"^\\circ\\). By the sine law, the wire from the left anchor (opposite the \\("+be+"^\\circ\\) angle) is \\("+fmt(D,1)+" \\times \\frac{\\sin "+be+"^\\circ}{\\sin "+(al+be)+"^\\circ} = "+fmt(wL,1)+"\\text{ m}\\), and the wire from the right anchor is \\("+fmt(wR,1)+"\\text{ m}\\). The height is \\("+fmt(wL,1)+" \\times \\sin "+al+"^\\circ = "+fmt(h,1)+"\\text{ m}\\)."+(askWire?" The longer wire is the one opposite the larger base angle: <b>\\("+fmt(longest,1)+"\\text{ m}\\)</b>.":" So the height is <b>\\("+fmt(h,1)+"\\text{ m}\\)</b>."),
    {D:D,al:al,be:be,askWire:askWire});
  q.figure=triSVG(wR,D,wL,{L:["P","T","Q"],ang:[al+"\u00B0",null,be+"\u00B0"],side:[null,fmt(D,1)+" m",null]});
  return q;
});

/* --- Unit 6: Proportional Reasoning (Payne Ch 8a) --- */
E("u6-pack-cost",6,["6.17"],2,"gen",function(){
  var ctx=pick([
    {item:"bottles of cola",pack:6,use:"fill the store cooler"},
    {item:"juice boxes",pack:8,use:"stock the school canteen"},
    {item:"granola bars",pack:12,use:"pack the hiking kits"},
    {item:"AA batteries",pack:4,use:"supply the science fair"},
    {item:"yogurt cups",pack:10,use:"fill the cafeteria fridge"},
    {item:"muffins",pack:6,use:"stock the bake sale table"}
  ]);
  var price=ri(2,12)+pick([0.25,0.49,0.5,0.75,0.79,0.89,0.99]);
  var need=ri(60,240);
  var packs=Math.ceil(need/ctx.pack);
  var total=packs*price;
  return numq(ctx.item.charAt(0).toUpperCase()+ctx.item.slice(1)+" are sold only in packs of "+ctx.pack+", at $"+fmt(price,2)+" per pack. A manager needs at least "+need+" to "+ctx.use+". What is the total cost, in dollars?",
    fmt(total,2),0.011,
    "Packs needed: \\("+need+" \\div "+ctx.pack+" = "+fmt(need/ctx.pack,2)+"\\), and part-packs cannot be bought, so round UP to \\("+packs+"\\) packs. Total cost: \\("+packs+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {pack:ctx.pack,price:price,need:need});
});
E("u6-rate-difference",6,["6.16"],2,"gen",function(){
  var frames=[
    {a:"Maya",b:"Leo",verb:"sent",thing:"text messages",per:"day",unit:"texts",periods:[5,7,10,14,20,28,31],rMin:80,rMax:220},
    {a:"Priya",b:"Owen",verb:"read",thing:"pages",per:"day",unit:"pages",periods:[4,5,6,7,10,14],rMin:25,rMax:90},
    {a:"Sofia",b:"Liam",verb:"swam",thing:"laps",per:"hour",unit:"laps",periods:[2,3,4,5,6,8],rMin:18,rMax:45}
  ];
  var F=pick(frames);
  var r1=ri(F.rMin,F.rMax),diff=ri(8,40),r2=r1+(Math.random()<0.5?diff:-diff),tries=0;
  while((r2<F.rMin||r2>F.rMax)&&tries<40){r2=r1+(Math.random()<0.5?diff:-diff);tries++;}
  var p1=pick(F.periods),p2=pick(F.periods);
  var T1=r1*p1,T2=r2*p2;
  var winA=r1>r2,win=winA?F.a:F.b,lose=winA?F.b:F.a;
  return mcq(F.a+" "+F.verb+" "+T1+" "+F.thing+" in "+p1+" "+F.per+"s. "+F.b+" "+F.verb+" "+T2+" "+F.thing+" in "+p2+" "+F.per+"s. Who has the higher rate, and by how many "+F.unit+" per "+F.per+"?",
    win+", by \\("+diff+"\\) per "+F.per,
    [lose+", by \\("+diff+"\\) per "+F.per,win+", by \\("+(diff+5)+"\\) per "+F.per,lose+", by \\("+(diff+5)+"\\) per "+F.per],
    F.a+"'s rate: \\("+T1+" \\div "+p1+" = "+r1+"\\text{ "+F.unit+" per "+F.per+"}\\). "+F.b+"'s rate: \\("+T2+" \\div "+p2+" = "+r2+"\\text{ "+F.unit+" per "+F.per+"}\\). The higher rate is "+win+"'s, by \\("+Math.max(r1,r2)+" - "+Math.min(r1,r2)+" = \\)<b>\\("+diff+"\\text{ per "+F.per+"}\\)</b>.",
    {r1:r1,r2:r2});
});
E("u6-poster-dimensions",6,["6.14"],2,"gen",function(){
  function trimNum(x){var s=fmt(x,2);if(s.indexOf(".")>=0)s=s.replace(/0+$/,"").replace(/\.$/,"");return s;}
  var w=ri(6,20),h=ri(6,20),k=pick([1.5,2,2.5,3,3.5,4,5]);
  var oldA=w*h,newA=k*k*oldA;
  var key="\\("+trimNum(w*k)+"\\text{ cm by }"+trimNum(h*k)+"\\text{ cm}\\)";
  var cand=[[w*k*k,h*k*k],[h*k,w*k],[w*(k+1),h*(k+1)],[w*k,h],[w,h*k],[w*2*k,h*2*k]],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var st="\\("+trimNum(cand[i][0])+"\\text{ cm by }"+trimNum(cand[i][1])+"\\text{ cm}\\)";if(st!==key&&ds.indexOf(st)<0)ds.push(st);}
  return mcq("A rectangular crest measuring "+w+" cm by "+h+" cm is enlarged to make a poster with an area of \\("+trimNum(newA)+"\\text{ cm}^2\\). What are the dimensions of the poster?",
    key,ds,
    "The original area is \\("+w+" \\times "+h+" = "+oldA+"\\text{ cm}^2\\). The area scale factor is \\("+trimNum(newA)+" \\div "+oldA+" = "+trimNum(k*k)+"\\), so the LINEAR scale factor is \\(\\sqrt{"+trimNum(k*k)+"} = "+trimNum(k)+"\\). Multiply each dimension by \\("+trimNum(k)+"\\): \\("+w+" \\times "+trimNum(k)+" = "+trimNum(w*k)+"\\text{ cm}\\) and \\("+h+" \\times "+trimNum(k)+" = "+trimNum(h*k)+"\\text{ cm}\\). The poster is <b>"+key+"</b>.",
    {w:w,h:h,k:k});
});
E("u6-tile-cost",6,["6.14","6.17"],2,"gen",function(){
  var frames=[
    {room:"bathroom floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:6,tileTxt:"6 in. by 6 in.",unit:"in."},
    {room:"kitchen floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:12,tileTxt:"12 in. by 12 in.",unit:"in."},
    {room:"patio",scale:30,scaleTxt:"1 unit = 30 cm",tile:15,tileTxt:"15 cm by 15 cm",unit:"cm"},
    {room:"deck",scale:30,scaleTxt:"1 unit = 30 cm",tile:30,tileTxt:"30 cm by 30 cm",unit:"cm"}
  ];
  var F=pick(frames);
  var W=pick([6,8,9,10,12,15]),H=pick([6,8,9,10,12]);
  var realW=W*F.scale,realH=H*F.scale;
  var across=realW/F.tile,along=realH/F.tile,count=across*along;
  var price=pick([0.79,0.99,1.25,1.49,2.29]);
  var total=count*price;
  return numq("A floor plan for a "+F.room+" has a scale of "+F.scaleTxt+". On the plan the room measures "+W+" units by "+H+" units. It will be covered with square tiles measuring "+F.tileTxt+", costing $"+fmt(price,2)+" each. What is the total cost of the tiles, in dollars?",
    fmt(total,2),0.011,
    "Real dimensions: \\("+W+" \\times "+F.scale+" = "+realW+"\\text{ "+F.unit+"}\\) by \\("+H+" \\times "+F.scale+" = "+realH+"\\text{ "+F.unit+"}\\). Tiles along each side: \\("+realW+" \\div "+F.tile+" = "+across+"\\) and \\("+realH+" \\div "+F.tile+" = "+along+"\\), so \\("+across+" \\times "+along+" = "+count+"\\) tiles. Total cost: \\("+count+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {W:W,H:H,count:count,price:price});
});

/* --- Unit 7: Reasoning (HHM Ch 1 archive) --- */
E("u7-race-order",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  function perms(a){if(a.length<2)return [a.slice()];var out=[];for(var i=0;i<a.length;i++){var rest=a.slice(0,i).concat(a.slice(i+1));perms(rest).forEach(function(p){out.push([a[i]].concat(p));});}return out;}
  var ALL=perms(names);
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  var order=null,clues=null,tries=0;
  while(!clues&&tries<40){
    tries++;
    var ord=shuffle(names.slice());
    var cand=[];
    (function(){for(var i=0;i<3;i++){var x=ord[i],y=ord[i+1];cand.push({t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)});}})();
    [[0,2],[0,3],[1,3]].forEach(function(pr){var x=ord[pr[0]],y=ord[pr[1]];cand.push({t:x+" finished ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)<o.indexOf(y);};})(x,y)});});
    [[1,0,3],[2,0,3],[1,0,2],[2,1,3]].forEach(function(tr){var x=ord[tr[0]],y=ord[tr[1]],z=ord[tr[2]];cand.push({t:x+" finished between "+y+" and "+z+".",f:(function(x,y,z){return function(o){var ix=o.indexOf(x);return (o.indexOf(y)<ix&&ix<o.indexOf(z))||(o.indexOf(z)<ix&&ix<o.indexOf(y));};})(x,y,z)});});
    (function(x){cand.push({t:x+" did not finish first.",f:function(o){return o[0]!==x;}});})(ord[1]);
    (function(x){cand.push({t:x+" did not finish last.",f:function(o){return o[3]!==x;}});})(ord[2]);
    for(var a1=0;a1<cand.length&&!clues;a1++)for(var b1=a1+1;b1<cand.length&&!clues;b1++)for(var c1=b1+1;c1<cand.length&&!clues;c1++){
      var set=[cand[a1],cand[b1],cand[c1]];
      var n=ALL.filter(function(o){return set.every(function(c){return c.f(o);});}).length;
      if(n===1){order=ord;clues=set;}
    }
    if(!clues&&tries===40){
      order=ord;
      clues=[0,1,2].map(function(i){var x=ord[i],y=ord[i+1];return {t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)};});
    }
  }
  var askPos=ri(0,3),ordinals=["first","second","third","fourth"];
  var others=names.filter(function(n){return n!==order[askPos];});
  return mcq("Four runners \u2014 "+names.join(", ")+" \u2014 finished a race in some order. Clues: (1) "+clues[0].t+" (2) "+clues[1].t+" (3) "+clues[2].t+" Who finished "+ordinals[askPos]+"?",
    order[askPos],others,
    "Testing the orders against all three clues, only one order fits: 1st "+order[0]+", 2nd "+order[1]+", 3rd "+order[2]+", 4th "+order[3]+". So "+ordinals[askPos]+" place went to <b>"+order[askPos]+"</b>.",
    {order:order,askPos:askPos,solutions:1});
});
E("u7-everyday-counterexample",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CAny piece of furniture with four legs is a chair.\u201D Which of the following is a counterexample?",
    "A dining table (a piece of furniture with four legs)",
    ["A chair with four legs and a padded seat at the table","A three-legged stool with a round wooden seat","A bookshelf with no legs, fixed flat against the wall"],
    "A counterexample must satisfy the condition (furniture with four legs) but break the conclusion (not a chair). A dining table does both. The stool and bookshelf never meet the four-leg condition, and the chair is just an example that agrees.",
    {});},
  function(){return mcq("Conjecture: \u201CIf the grass is wet, then it rained last night.\u201D Which of the following is a counterexample?",
    "The grass is wet because the sprinkler ran this morning",
    ["It rained last night and the grass is wet","The grass is dry and it did not rain last night","Rain is in the forecast for tonight, starting after midnight"],
    "A counterexample needs wet grass WITHOUT last night's rain. The sprinkler gives exactly that: the condition (wet grass) holds, but the conclusion (it rained) is false.",
    {});},
  function(){return mcq("Conjecture: \u201CIf something has a knob, then it is a door.\u201D Which of the following is a counterexample?",
    "A stove, which has control knobs",
    ["A door with a round metal knob","A window with no knob at all","A door with a lever handle instead of a knob"],
    "The stove has knobs (condition met) but is not a door (conclusion broken) \u2014 a true counterexample. The lever-handled door never meets the \u201Chas a knob\u201D condition.",
    {});},
  function(){return mcq("Conjecture: \u201CAll students at the school play a sport.\u201D Which of the following is a counterexample?",
    "One student at the school is in the chess club and plays no sport",
    ["Many students at the school play hockey on the school team each winter","One student at the school plays two sports, both hockey and soccer","A teacher at the school plays no sport and coaches no team either"],
    "To disprove \u201Call students,\u201D one student who plays no sport is enough. The teacher is not a student, so that option does not touch the claim.",
    {});}
]));
E("u7-pattern-equation",7,["2.1"],2,"var",varset([
  function(){return mcq("Look at the pattern: \\(37 \\times 3 = 111\\), \\(37 \\times 6 = 222\\), \\(37 \\times 9 = 333\\), \\(37 \\times 12 = 444\\). What is the next equation in the pattern?",
    "\\(37 \\times 15 = 555\\)",
    ["\\(37 \\times 13 = 481\\)","\\(37 \\times 15 = 505\\)","\\(37 \\times 18 = 666\\)"],
    "The multipliers grow by \\(3\\) (\\(3, 6, 9, 12, \\ldots\\)) and the products are \\(111, 222, 333, 444, \\ldots\\). Next multiplier: \\(15\\), and \\(37 \\times 15 = 555\\), continuing the repeated-digit pattern.",
    {});},
  function(){return mcq("Look at the pattern: \\(11^2 = 121\\), \\(111^2 = 12321\\), \\(1111^2 = 1234321\\). What is the next equation in the pattern?",
    "\\(11111^2 = 123454321\\)",
    ["\\(11111^2 = 12344321\\)","\\(1111^2 = 123454321\\)","\\(11111^2 = 12345654321\\)"],
    "Each base gains another digit \\(1\\), and the square counts up to the number of \\(1\\)s and back down: five \\(1\\)s give \\(123454321\\) (up to \\(5\\) and back). The last option counts to \\(6\\), which belongs to the following step, \\(111111^2\\).",
    {});},
  function(){return mcq("Look at the pattern: \\(12345679 \\times 9 = 111{,}111{,}111\\); \\(12345679 \\times 18 = 222{,}222{,}222\\); \\(12345679 \\times 27 = 333{,}333{,}333\\). What is the next equation in the pattern?",
    "\\(12345679 \\times 36 = 444{,}444{,}444\\)",
    ["\\(12345679 \\times 36 = 44{,}444{,}444\\)","\\(12345679 \\times 45 = 444{,}444{,}444\\)","\\(12345679 \\times 36 = 454{,}545{,}454\\)"],
    "The multipliers are multiples of \\(9\\) (\\(9, 18, 27, \\ldots\\)) and each product repeats the digit matching the multiple: \\(36 = 4 \\times 9\\), so the product is nine \\(4\\)s: \\(444{,}444{,}444\\).",
    {});}
]));
E("u7-counterexample-claims",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CIf a number is divisible by \\(4\\), then it is divisible by \\(8\\).\u201D Which number is a counterexample?",
    "\\(12\\)",
    ["\\(16\\)","\\(24\\)","\\(40\\)"],
    "\\(12\\) is divisible by \\(4\\) (\\(12 \\div 4 = 3\\)) but not by \\(8\\), so it breaks the claim. The other options are all divisible by \\(8\\), so they agree with the claim instead of disproving it.",
    {});},
  function(){return mcq("Conjecture: \u201CThe sum of any two prime numbers is even.\u201D Which calculation is a counterexample?",
    "\\(2 + 3 = 5\\)",
    ["\\(3 + 5 = 8\\)","\\(5 + 7 = 12\\)","\\(7 + 11 = 18\\)"],
    "\\(2\\) and \\(3\\) are both prime, but their sum, \\(5\\), is odd — one counterexample disproves the claim. (\\(2\\) is the only even prime, which is why it is the one that breaks this.) The other pairs all give even sums.",
    {});},
  function(){return mcq("Conjecture: \u201CEvery multiple of \\(5\\) ends in the digit \\(5\\).\u201D Which number is a counterexample?",
    "\\(20\\)",
    ["\\(15\\)","\\(25\\)","\\(12\\)"],
    "\\(20\\) is a multiple of \\(5\\) but ends in \\(0\\), breaking the claim. \\(15\\) and \\(25\\) end in \\(5\\) so they agree; \\(12\\) is not a multiple of \\(5\\) at all, so it cannot test the claim.",
    {});},
  function(){return mcq("Conjecture: \u201CIf \\(x^2 = 16\\), then \\(x = 4\\).\u201D Which value is a counterexample?",
    "\\(x = -4\\)",
    ["\\(x = 4\\)","\\(x = 16\\)","\\(x = -16\\)"],
    "\\((-4)^2 = 16\\), so \\(x = -4\\) meets the condition \\(x^2 = 16\\) but breaks the conclusion \\(x = 4\\). The values \\(16\\) and \\(-16\\) do not satisfy \\(x^2 = 16\\) in the first place.",
    {});},
  function(){return mcq("Conjecture: \u201CThe product of two numbers is always greater than each of the two numbers.\u201D Which calculation is a counterexample?",
    "\\(6 \\times \\frac{1}{2} = 3\\)",
    ["\\(3 \\times 4 = 12\\)","\\(\\frac{3}{2} \\times 2 = 3\\)","\\(10 \\times 1.1 = 11\\)"],
    "\\(6 \\times \\frac{1}{2} = 3\\), and \\(3\\) is NOT greater than \\(6\\), so the claim fails — multiplying by a fraction between \\(0\\) and \\(1\\) shrinks the number. In each other calculation the product is greater than both factors.",
    {});}
]));

/* ============ Tranche 6 (Oct 27): finish-line pass, tranche 1 of 3 ============
   Units 2, 3, 4, 8 +4 each (bank 161 -> 177). Templates reworked from the
   inventoried-but-unbuilt stock (batch5 / QE RHS / HHM families, mapped by
   topic); every item re-created with new numbers and contexts, nothing
   copied verbatim. Fixes level mix: adds a Level 3 for Units 2, 4 and 8
   (Unit 8's first Level 3 entry). */

/* --- Unit 2: Quadratic Functions --- */
E("u2-y-intercept",2,["4.4"],1,"gen",function(){
  var a,b,c,ds,tries=0;
  do{
    a=ri(1,6)*(Math.random()<0.4?-1:1);b=ri(-9,9);c=ri(-12,12);tries++;
    var cand=[b,a,a+b+c,-c,b+c,c+2,c-2];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==c&&ds.indexOf(v)<0)ds.push(v);}
  }while((b===0||c===0||ds.length<3)&&tries<80);
  return mcq("What is the y-intercept of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    "\\("+c+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The y-intercept is the value of \\(y\\) when \\(x = 0\\). Substituting \\(x = 0\\) leaves only the constant term: \\(y = \\)<b>\\("+c+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u2-mirror-point",2,["4.13"],2,"gen",function(){
  var h=ri(-6,8),d=ri(1,9),x1=h+(Math.random()<0.5?d:-d),x2=2*h-x1,y=ri(3,45);
  var q=numq("A parabola has axis of symmetry \\(x = "+h+"\\). The point \\(("+x1+", "+y+")\\) lies on the parabola. Another point on the parabola has the same y-value. What is its x-coordinate?",
    x2,0.011,
    "Points with the same y-value sit symmetrically about the axis \\(x = "+h+"\\). The given point is \\("+Math.abs(x1-h)+"\\) units from the axis, so the mirror point is \\("+Math.abs(x1-h)+"\\) units on the other side: \\(x = "+h+" "+(x2>h?"+":"-")+" "+Math.abs(x2-h)+" = \\)<b>\\("+x2+"\\)</b>. (Check: the axis is the midpoint, \\(\\frac{"+x1+" + "+x2+"}{2} = "+h+"\\).)",
    {h:h,x1:x1,x2:x2,y:y});
  q.figure=parMirrorSVG(h,x1,y);
  return q;
});
E("u2-vertex-time",2,["4.2"],2,"gen",function(){
  var k=ri(4,18),B=5*k,C=ri(1,25);
  var ctx=pick(["ball thrown into the air","fountain jet","model rocket","firework shell"]);
  var q=numq("The height of a "+ctx+" is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it is launched. At what time does it reach its maximum height, in seconds?",
    k/2,0.011,
    "The maximum occurs at the vertex, where \\(t = \\frac{-B}{2 \\times -5} = \\frac{"+B+"}{10} = \\)<b>\\("+fmt(k/2,1)+"\\text{ s}\\)</b>.",
    {B:B,C:C,k:k,ans:k/2});
  q.figure=trajSVG(-5,B,C);
  return q;
});
E("u2-fence-max",2,["4.2"],3,"gen",function(){
  var k=ri(6,20),P=4*k,mode=ri(0,1),area=2*k*k;
  var ctx=pick([["rectangular garden","a house wall"],["rectangular dog pen","a barn wall"],["rectangular patio","an existing fence"],["rectangular chicken run","a shed wall"]]);
  var prompt="A "+ctx[0]+" is built against "+ctx[1]+", so fencing is needed on only three sides. A total of "+P+" m of fencing is available. ";
  if(mode===0)prompt+="What is the greatest area that can be enclosed, in \\(m^2\\)?";
  else prompt+="How wide should it be (each side perpendicular to the wall) to enclose the greatest possible area, in metres?";
  var q=numq(prompt,mode===0?area:k,0.011,
    "Let the two sides perpendicular to the wall each be \\(x\\) m. The side parallel to the wall is \\("+P+" - 2x\\), so the area is \\(A(x) = x("+P+" - 2x) = -2x^2 + "+P+"x\\). The vertex is at \\(x = \\frac{"+P+"}{4} = "+k+"\\) m, giving a parallel side of \\("+P+" - 2 \\times "+k+" = "+(2*k)+"\\) m and a maximum area of \\("+k+" \\times "+(2*k)+" = \\)<b>\\("+area+"\\text{ m}^2\\)</b>."+(mode===1?" The width at the maximum is <b>\\("+k+"\\text{ m}\\)</b>.":""),
    {P:P,k:k,mode:mode,area:area,width:k});
  q.figure=fenceSVG(P,ctx[1].replace(/^(a|an) /,""));
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-roots-sum-product",3,["4.6"],1,"gen",function(){
  var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var B=-(r1+r2),C=r1*r2,mode=Math.random()<0.5?"sum":"product";
  var key=mode==="sum"?r1+r2:r1*r2;
  var cand=[B,-B,C,-C,key+1,key-1,key+2,key-2,r1-r2,r2-r1],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==key&&ds.indexOf(v)<0)ds.push(v);}
  return mcq("For the equation "+"\\("+quadB(1,B,C)+" = 0\\)"+", what is the "+mode+" of the roots?",
    "\\("+key+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The equation factors as \\((x "+(r1>0?"- "+r1:"+ "+(-r1))+")(x "+(r2>0?"- "+r2:"+ "+(-r2))+") = 0\\), so the roots are \\("+r1+"\\) and \\("+r2+"\\). Their "+mode+" is \\("+(mode==="sum"?r1+" + "+r2:r1+" \\times "+r2)+" = "+key+"\\). (In general, for \\(x^2 + bx + c\\) the sum of the roots is \\(-b\\) and the product is \\(c\\).)",
    {r1:r1,r2:r2,B:B,C:C,mode:mode,key:key});
});
E("u3-factor-nonmonic",3,["PK.2"],2,"gen",function(){
  function lin(cf,tm){return (cf===1?"x":cf+"x")+(tm>0?" + "+tm:" - "+(-tm));}
  function expand(t){return [t[0]*t[2], t[0]*t[3]+t[1]*t[2], t[1]*t[3]];}
  var p,q,r,s,A,B,C,tries=0;
  do{
    p=ri(1,3);q=ri(1,3);r=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);s=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    A=p*q;B=p*s+r*q;C=r*s;tries++;
  }while((B===0||A===1)&&tries<80); /* B = 0 is a difference of squares: the sign-flip distractors collapse there (it has its own entry in tranche 7) */
  var key="\\(("+lin(p,r)+")("+lin(q,s)+")\\)";
  var cands=[[p,-r,q,s],[p,r,q,-s],[p,-r,q,-s],[q,r,p,s],[q,-r,p,-s],[p,-s,q,-r]],ds=[];
  for(var i=0;i<cands.length&&ds.length<3;i++){
    var ex=expand(cands[i]);if(ex[0]===A&&ex[1]===B&&ex[2]===C)continue;
    var st="\\(("+lin(cands[i][0],cands[i][1])+")("+lin(cands[i][2],cands[i][3])+")\\)";
    if(st!==key&&ds.indexOf(st)<0)ds.push(st);
  }
  return mcq("Factor fully: "+quadT(A,B,C)+".",
    key,ds,
    "Look for a factor pair whose cross-products add to \\("+B+"\\): \\(("+lin(p,r)+")("+lin(q,s)+")\\) expands to \\("+quadB(A,B,C)+"\\). So the factored form is <b>"+key+"</b>.",
    {p:p,r:r,q:q,s:s,A:A,B:B,C:C});
});
E("u3-standard-coeffs",3,["4.9"],1,"gen",function(){
  var A=ri(2,6),B=ri(-9,9),K=ri(-12,12),tries=0;
  while((B===0||K===0)&&tries<40){B=ri(-9,9);K=ri(-12,12);tries++;}
  var key="\\(a = "+A+", \\; b = "+B+", \\; c = "+(-K)+"\\)";
  var cand=["\\(a = "+A+", \\; b = "+B+", \\; c = "+K+"\\)","\\(a = "+A+", \\; b = "+(-B)+", \\; c = "+(-K)+"\\)","\\(a = "+B+", \\; b = "+A+", \\; c = "+(-K)+"\\)","\\(a = 1, \\; b = "+B+", \\; c = "+(-K)+"\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("The equation \\("+quadB(A,B,0)+" = "+K+"\\) is to be solved with the quadratic formula. When it is written in standard form \\(ax^2 + bx + c = 0\\), what are a, b and c?",
    key,ds,
    "Move every term to the left: \\("+quadB(A,B,0)+" - ("+K+") = 0\\), that is, \\("+quadB(A,B,-K)+" = 0\\). Reading off the coefficients: <b>"+key+"</b>. The constant changes sign when it crosses the equals sign.",
    {A:A,B:B,K:K});
});
E("u3-two-numbers",3,["4.3"],2,"gen",function(){
  var mode=pick([["consecutive integers",1],["consecutive even integers",2],["consecutive odd integers",2]]);
  var n,step=mode[1];
  if(mode[0].indexOf("even")>=0)n=2*ri(3,20);
  else if(mode[0].indexOf("odd")>=0)n=2*ri(3,20)-1;
  else n=ri(4,30);
  var N=n*(n+step);
  return numq("The product of two positive "+mode[0]+" is "+N+". What is the smaller of the two integers?",
    n,0.011,
    "Let the smaller integer be \\(x\\); the next one is \\(x + "+step+"\\). Then \\[\\begin{aligned} x(x + "+step+") &= "+N+" \\\\ x^2 + "+step+"x - "+N+" &= 0 \\\\ (x - "+n+")(x + "+(n+step)+") &= 0 \\end{aligned}\\] The positive root is \\(x = "+n+"\\) (the other root, \\(-"+(n+step)+"\\), is rejected because the integers are positive). The two integers are \\("+n+"\\) and \\("+(n+step)+"\\), and indeed \\("+n+" \\times "+(n+step)+" = "+N+"\\).",
    {n:n,step:step,N:N,mode:mode[0]});
});

/* --- Unit 4: Radicals --- */
E("u4-evaluate-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(3,15),b=ri(2,9),c=ri(2,12),tries=0;
  while(c>=a+b&&tries<40){c=ri(2,12);tries++;}
  var ans=a+b-c;
  return numq("Evaluate: \\(\\sqrt{"+(a*a)+"} + \\sqrt[3]{"+(b*b*b)+"} - \\sqrt{"+(c*c)+"}\\).",
    ans,0.011,
    "\\(\\sqrt{"+(a*a)+"} = "+a+"\\) because \\("+a+"^2 = "+(a*a)+"\\); \\(\\sqrt[3]{"+(b*b*b)+"} = "+b+"\\) because \\("+b+"^3 = "+(b*b*b)+"\\); \\(\\sqrt{"+(c*c)+"} = "+c+"\\). So the value is \\("+a+" + "+b+" - "+c+"\\) = <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,ans:ans});
});
E("u4-divide-radicals",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13,14,15]),k=ri(2,6),d0=ri(2,9);
  var A=d0*k*k*m,B=d0;
  var key=radT(k,m);
  var cand=[radT(k+1,m),radT(k,m+1),sqrtT(k*k*m),radT(k*k,m),radT(k,m+2)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}}\\). Give the answer in simplest radical form.",
    key,ds,
    "Combine under one root, then simplify (\\("+(k*k)+"\\) is a perfect square factor): \\[\\begin{aligned} \\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}} &= \\sqrt{\\frac{"+A+"}{"+B+"}} \\\\ &= \\sqrt{"+(k*k*m)+"} \\\\ &= "+k+"\\sqrt{"+m+"} \\end{aligned}\\] In simplest form: <b>"+key+"</b>.",
    {A:A,B:B,k:k,m:m,d0:d0});
});
E("u4-rationalize-coefficient",4,["1.7"],1,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var c,m,N,tries=0;
  do{c=ri(2,5);m=pick([2,3,5,6,7,10,11,13]);N=ri(2,11);tries++;}while(gcd(N,c*m)!==1&&tries<80);
  var key="\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)";
  var cand=["\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+c+"}\\)","\\(\\frac{"+(N*m)+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)","\\(\\frac{"+N+"}{"+(c*m)+"}\\)","\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c+m)+"}\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Rationalize the denominator and simplify: \\(\\frac{"+N+"}{"+c+"\\sqrt{"+m+"}}\\).",
    key,ds,
    "Multiply the numerator and denominator by \\(\\sqrt{"+m+"}\\): the denominator becomes \\("+c+" \\times \\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+c+" \\times "+m+" = "+(c*m)+"\\), and the numerator becomes \\("+N+"\\sqrt{"+m+"}\\). Since \\("+N+"\\) and \\("+(c*m)+"\\) share no common factor, the simplest form is <b>"+key+"</b>.",
    {N:N,c:c,m:m});
});
E("u4-conjugate-area",4,["1.6"],2,"gen",function(){
  var a=ri(4,12),sq=[],i;
  for(i=2;i<a*a;i++){var rt=Math.sqrt(i);if(rt!==Math.floor(rt))sq.push(i);}
  var b=pick(sq),area=a*a-b;
  var ctx=pick(["rectangular garden","rectangular rug","rectangular solar panel","rectangular patio"]);
  return numq("A "+ctx+" measures \\(("+a+" + \\sqrt{"+b+"})\\) m by \\(("+a+" - \\sqrt{"+b+"})\\) m. What is its area, in \\(m^2\\)?",
    area,0.011,
    "Area = \\(("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"})\\), a difference of squares: \\("+a+"^2 - (\\sqrt{"+b+"})^2 = "+(a*a)+" - "+b+" = "+area+"\\), so the area is <b>\\("+area+"\\text{ m}^2\\)</b>. The radical terms cancel, which is why conjugate pairs give a whole-number area.",
    {a:a,b:b,area:area});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-diagonals",8,["5.5"],1,"gen",function(){
  var n=ri(5,30),mode=ri(0,1);
  var ans=mode===0?n-3:n*(n-3)/2;
  var ctx=pick(["convex polygon","garden outline drawn as a polygon","polygon-shaped sign","polygon-shaped tile design"]);
  var prompt="A "+ctx+" has "+n+" sides. How many diagonals "+(mode===0?"can be drawn from one vertex":"does it have in total")+"?";
  return numq(prompt,ans,0.011,
    mode===0
      ?"From one vertex, a diagonal cannot go to the vertex itself or to either of its two neighbours, so it can reach the other \\("+n+" - 3\\) vertices: <b>\\("+ans+"\\)</b> diagonals."
      :"Each of the \\("+n+"\\) vertices connects to \\("+n+" - 3\\) others by a diagonal (not itself, not its two neighbours), and each diagonal is counted twice, once from each end: \\("+n+" \\times "+(n-3)+" \\div 2 = \\)<b>\\("+ans+"\\)</b>.",
    {n:n,mode:mode,ans:ans});
});
E("u8-isosceles-angles",8,["5.3"],1,"gen",function(){
  var mode=ri(0,1),base,vertex,ans;
  if(mode===0){base=ri(28,72);vertex=180-2*base;ans=vertex;}
  else{vertex=2*ri(20,65);base=(180-vertex)/2;ans=base;}
  var q=numq(mode===0
      ?"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The base angles at \\(B\\) and \\(C\\) each measure \\("+base+"^\\circ\\). What is the measure of the vertex angle at \\(A\\), in degrees?"
      :"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The vertex angle at \\(A\\) measures \\("+vertex+"^\\circ\\). What is the measure of each base angle, in degrees?",
    ans,0.011,
    "The angles of a triangle add to \\(180^\\circ\\), and the base angles of an isosceles triangle are equal. "+(mode===0?"Vertex angle \\(= 180^\\circ - "+base+"^\\circ - "+base+"^\\circ = \\)<b>\\("+vertex+"^\\circ\\)</b>.":"Each base angle \\(= (180^\\circ - "+vertex+"^\\circ) \\div 2 = \\)<b>\\("+base+"^\\circ\\)</b>."),
    {mode:mode,base:base,vertex:vertex,ans:ans});
  q.figure=triAngSVG(vertex,base,base,{ang:mode===0?["?",base+"°",base+"°"]:[vertex+"°","?","?"]});
  return q;
});
E("u8-corresponding-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,c2,V,b,d,tries=0;
  do{
    x0=ri(4,15);a=ri(3,7);c2=ri(1,a-1);V=ri(65,135);
    b=V-a*x0;d=V-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var q=numq("Two parallel lines are cut by a transversal. Two corresponding angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of each of these angles, in degrees?",
    V,0.011,
    "Corresponding angles between parallel lines are equal: \\("+exprT(a,b)+" = "+exprT(c2,d)+"\\). Solving gives \\(x = "+x0+"\\). Substituting back: \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = \\)<b>\\("+V+"^\\circ\\)</b> (the other expression gives the same value, as it must).",
    {a:a,b:b,c:c2,d:d,x0:x0,V:V});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-correspondence",8,["5.6"],3,"gen",function(){
  var tris=pick([["ABC","DEF"],["PQR","STU"],["XYZ","UVW"],["JKL","MNO"],["FGH","BCD"],["RST","UVW"],["GHJ","KLM"]]);
  var T1=tris[0],T2=tris[1];
  var perm=shuffle([0,1,2]);
  function L2(i){return T2.charAt(perm[i]);}
  var mode=ri(0,1),givens;
  if(mode===0){
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\) and \\("+T1.charAt(2)+T1.charAt(0)+" = "+L2(2)+L2(0)+"\\)";
  }else{
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\(\\angle "+T1.charAt(1)+" = \\angle "+L2(1)+"\\) and \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\)";
  }
  var keyStmt="\\(\\triangle "+T1+" \\cong \\triangle "+L2(0)+L2(1)+L2(2)+"\\)";
  var allPerms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  var others=allPerms.filter(function(p){return !(p[0]===perm[0]&&p[1]===perm[1]&&p[2]===perm[2]);});
  var ds=shuffle(others).slice(0,3).map(function(p){return "\\(\\triangle "+T1+" \\cong \\triangle "+T2.charAt(p[0])+T2.charAt(p[1])+T2.charAt(p[2])+"\\)";});
  return mcq("It is given that "+givens+". Which congruence statement matches these givens?",
    keyStmt,ds,
    "Match the vertices through the equal parts: "+T1.charAt(0)+" pairs with "+L2(0)+", "+T1.charAt(1)+" pairs with "+L2(1)+", and "+T1.charAt(2)+" pairs with "+L2(2)+". Writing the second triangle in that corresponding order gives <b>"+keyStmt+"</b>. In a congruence statement, the order of the letters is part of the claim.",
    {perm:perm,mode:mode});
});
E("u8-parallel-x-value",8,["5.9"],3,"gen",function(){
  var p=0,q=0,E=0,a=2,x=0,b=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    p=ri(35,70);q=ri(35,70);E=p+q;a=pick([2,3,4]);x=ri(8,30);
    b=(180-E)-a*x;
    ok=(E>=85&&E<=130&&b>=2&&b<=30);
  }
  return numq("Two lines are cut by a transversal. One co-interior angle is an exterior angle of a triangle, and the two remote interior angles of that triangle measure \\("+p+"^\\circ\\) and \\("+q+"^\\circ\\). The other co-interior angle, on the same side of the transversal, measures \\(("+a+"x + "+b+")^\\circ\\). For what value of \\(x\\) are the two lines parallel?",
    x,0.011,
    "Start with the triangle: an exterior angle equals the sum of the two remote interior angles, so the first co-interior angle measures \\("+p+"^\\circ + "+q+"^\\circ = "+E+"^\\circ\\). Two lines are parallel exactly when co-interior angles are supplementary, so \\("+a+"x + "+b+" = 180 - "+E+" = "+(180-E)+"\\). Then \\("+a+"x = "+(180-E-b)+"\\), giving \\(x = \\)<b>\\("+x+"\\)</b>.",
    {p:p,q:q,a:a,b:b});
});
E("u8-isosceles-exterior",8,["5.3"],3,"gen",function(){
  if(Math.random()<0.5){
    var E=2*ri(50,80);var ans=E/2;
    return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(A\\) measures \\("+E+"^\\circ\\). What is the measure of \\(\\angle B\\), in degrees?",
      ans,0.011,
      "The interior angle at \\(A\\) is supplementary to the exterior angle: \\(180^\\circ - "+E+"^\\circ = "+(180-E)+"^\\circ\\). Since \\(AB = AC\\), the base angles at \\(B\\) and \\(C\\) are equal, and the interior angles of a triangle sum to \\(180^\\circ\\), so each base angle is \\((180^\\circ - "+(180-E)+"^\\circ) \\div 2 = \\)<b>\\("+ans+"^\\circ\\)</b>.",
      {E:E,mode:0});
  }
  var E2=ri(100,130);var ans2=2*E2-180;
  return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(B\\) measures \\("+E2+"^\\circ\\). What is the measure of \\(\\angle A\\), in degrees?",
    ans2,0.011,
    "The interior angle at \\(B\\) is \\(180^\\circ - "+E2+"^\\circ = "+(180-E2)+"^\\circ\\). Since \\(AB = AC\\), \\(\\angle C = \\angle B = "+(180-E2)+"^\\circ\\). The interior angles sum to \\(180^\\circ\\), so \\(\\angle A = 180^\\circ - 2 \\times "+(180-E2)+"^\\circ = \\)<b>\\("+ans2+"^\\circ\\)</b>.",
    {E:E2,mode:1});
});
E("u8-regular-sides-from-angle",8,["5.5"],2,"gen",function(){
  var ns=[5,6,8,9,10,12,15,18,20,24,30,36,40,45,60,72,90];var n=pick(ns);var each=(n-2)*180/n;var sum=(n-2)*180;var mode=ri(0,2);
  if(mode===0){
    return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Work with the exterior angle first: it is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\). The exterior angles of a polygon add to \\(360^\\circ\\), so the number of sides is \\(360 \\div "+(180-each)+" = \\)<b>\\("+n+"\\)</b>.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  if(mode===1){
    return numq("The interior angles of a regular polygon add to \\("+sum+"^\\circ\\), and each interior angle measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Every interior angle has the same measure, so the number of angles, which equals the number of sides, is \\("+sum+" \\div "+each+" = \\)<b>\\("+n+"\\)</b>. Check: \\(("+n+" - 2) \\times 180^\\circ = "+sum+"^\\circ\\), as given.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). What is the sum of the interior angles, in degrees?",
    sum,0.011,
    "First find the number of sides from the exterior angle: each exterior angle is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\), and exterior angles add to \\(360^\\circ\\), so the polygon has \\(360 \\div "+(180-each)+" = "+n+"\\) sides. The sum of the interior angles is then \\(("+n+" - 2) \\times 180^\\circ = \\)<b>\\("+sum+"^\\circ\\)</b>.",
    {n:n,each:each,sum:sum,mode:mode});
});
E("u8-exterior-algebra",8,["5.11"],3,"gen",function(){
  function linT(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" - "+(-kn):""));}
  function quadT(B,C){var out="x^2";if(B>0)out+=" + "+B+"x";else if(B<0)out+=" - "+(-B)+"x";if(C>0)out+=" + "+C;else if(C<0)out+=" - "+(-C);return out;}
  var v,w,d,p,r,A1,A2,q,s,b,c,E,Ew,R1w,R2w,tries=0;
  do{
    v=ri(4,12);d=ri(6,14);w=v+d;
    p=ri(2,5);r=ri(2,5);A1=ri(35,80);A2=ri(35,80);
    q=A1-p*v;s=A2-r*v;b=(p+r)-(v+w);c=q+s+v*w;E=A1+A2;
    Ew=E+(p+r)*d;R1w=A1+p*d;R2w=A2+r*d;tries++;
  }while((q===0||s===0||Math.abs(q)>45||Math.abs(s)>45||c<20||Ew<=180||Ew>320||R1w>=180||R2w>=180)&&tries<200);
  return numq("In \\(\\triangle ABC\\), the two remote interior angles for the exterior angle at \\(C\\) measure \\(("+linT(p,q)+")^\\circ\\) and \\(("+linT(r,s)+")^\\circ\\). The exterior angle at \\(C\\) measures \\(("+quadT(b,c)+")^\\circ\\). What is the measure of the exterior angle at \\(C\\), in degrees?",
    E,0.011,
    "An exterior angle equals the sum of the two remote interior angles: \\("+quadT(b,c)+" = ("+linT(p,q)+") + ("+linT(r,s)+")\\). Rearranging gives \\("+quadT(-(v+w),v*w)+" = 0\\), which factors as \\((x - "+v+")(x - "+w+") = 0\\), so \\(x = "+v+"\\) or \\(x = "+w+"\\). Try \\(x = "+w+"\\): the exterior angle would be \\("+Ew+"^\\circ\\) \u2014 greater than \\(180^\\circ\\), which no exterior angle of a triangle can be \u2014 so \\(x = "+w+"\\) is extraneous. With \\(x = "+v+"\\), the remote interior angles are \\("+A1+"^\\circ\\) and \\("+A2+"^\\circ\\), and the exterior angle is \\("+A1+" + "+A2+" = \\)<b>\\("+E+"^\\circ\\)</b>.",
    {p:p,q:q,r:r,s:s,b:b,c:c,v:v,w:w,A1:A1,A2:A2,E:E,Ew:Ew});
});

/* ============ Tranche 7 (Oct 27): finish-line pass, tranche 2 of 3 ============
   Unit 2 +4, Unit 3 +4, Unit 4 +4, Unit 8 +3 (bank 177 -> 192). Same
   reworked-template sources as tranche 6, mapped by topic, nothing verbatim.
   Adds a second Level 3 for Unit 8 and another for Unit 2. */

/* --- Unit 2: Quadratic Functions --- */
E("u2-revenue-build",2,["4.2"],3,"gen",function(){
  var fr=null,P=0,N=0,s=0,d=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="";
  function R(t){return "\\(R(x) = "+quadB(t[0],t[1],t[2])+"\\)";}
  while(!ok&&tries<400){tries++;
    fr=pick([
      {w:"A community theatre",item:"tickets",each:"ticket"},
      {w:"A gym",item:"day passes",each:"day pass"},
      {w:"A market stall",item:"jars of preserves",each:"jar"}]);
    P=pick([6,8,9,10,12,15]);N=pick([120,150,180,200,240,300,360]);s=pick([0.5,1,1,2]);d=ri(4,25);
    if(s===d)continue;
    var A=-s*d,B=s*N-P*d,C=P*N;
    if(B===0||B-s*d===0)continue;
    keyS=R([A,B,C]);
    d1S=R([A,s*N+P*d,C]);
    d2S=R([A,B,(P+s)*(N-d)]);
    d3S=R([A,d*N-s*P,C]);
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq(fr.w+" sells "+fr.item+" at $"+P+" per "+fr.each+" and normally sells "+N+" of them. The seller estimates that for every $"+fmt(s,1)+" increase in the price, "+d+" fewer will be sold. Let \\(x\\) be the number of $"+fmt(s,1)+" increases. Which function models the revenue, in dollars?",
    keyS,[d1S,d2S,d3S],
    "After \\(x\\) increases, the price is \\("+P+" + "+fmt(s,1)+"x\\) dollars and the number sold is \\("+N+" - "+d+"x\\). Revenue is price times number sold: \\(R(x) = ("+P+" + "+fmt(s,1)+"x)("+N+" - "+d+"x)\\). Expanding gives <b>"+keyS+"</b>.",
    {P:P,N:N,s:s,d:d});
  q.figure=parSVG(A,B,C,{xrange:[0,N/d],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return q;
});
E("u2-function-from-vertex-point",2,["4.15","4.16"],3,"gen",function(){
  var a=0,h=0,k=0,side=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="",px=0,py=0;
  while(!ok&&tries<400){tries++;
    a=pick([-3,-2,-1,1,2,3]);h=ri(-5,5);k=ri(-8,8);side=pick([-2,2]);
    if(h===0||k===0)continue;
    px=h+side;py=k+a*side*side;
    var B=-2*a*h,C=a*h*h+k,a2=a*side;
    keyS="\\(y = "+quadB(a,B,C)+"\\)";
    d1S="\\(y = "+quadB(a,2*a*h,C)+"\\)";
    d2S="\\(y = "+quadB(a2,-2*a2*h,a2*h*h+k)+"\\)";
    d3S="\\(y = "+quadB(a,B,a*h*h-k)+"\\)";
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through the point \\(("+px+", "+py+")\\). Which equation gives the parabola in standard form?",
    keyS,[d1S,d2S,d3S],
    "Start in vertex form and use the point to find \\(a\\): \\("+py+" = a("+side+")^2 + "+k+"\\) gives \\(a = "+a+"\\). So the vertex form is \\(y = "+vertB(a,h,k)+"\\), and expanding it gives <b>"+keyS+"</b>.",
    {a:a,h:h,k:k,px:px,py:py});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k},{x:px,y:py}]});
  return q;
});
E("u2-concavity",2,["4.10"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-9,9);tries++;}
  var b=ri(-9,9),c=ri(-12,12),up=a>0;
  var key=up?"It opens upward, and its vertex is a minimum":"It opens downward, and its vertex is a maximum";
  var q=mcq("Which statement describes the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    key,
    [up?"It opens upward, and its vertex is a maximum":"It opens downward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a maximum":"It opens upward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a minimum":"It opens upward, and its vertex is a maximum"],
    "The sign of the \\(x^2\\) coefficient decides the opening: \\(a = "+a+"\\) is "+(up?"positive, so the parabola opens upward and the vertex is the lowest point — a minimum":"negative, so the parabola opens downward and the vertex is the highest point — a maximum")+". The other terms shift the graph but do not change its opening.",
    {a:a,b:b,c:c,up:up});
  q.figure=parSVG(a,b,c,{});
  return q;
});
E("u2-vertex-form-eval",2,["4.15"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var h=ri(-6,6),k=ri(-10,10),d=ri(1,5),sgn=Math.random()<0.5?1:-1;
  var x=h+sgn*d,ans=a*d*d+k;
  return numq("A quadratic function is given by \\(f(x) = "+vertB(a,h,k)+"\\). What is \\(f("+x+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+x+"\\): the squared part is \\(("+(h===0?x:x+" "+(h>0?"- "+h:"+ "+(-h)))+")^2 = ("+(sgn*d)+")^2 = "+(d*d)+"\\). So \\(f("+x+") = "+a+" \\times "+(d*d)+(k>0?" + "+k:(k<0?" - "+(-k):""))+" = \\)<b>\\("+ans+"\\)</b>. (The sign of \\("+(sgn*d)+"\\) disappears when it is squared.)",
    {a:a,h:h,k:k,d:d,ans:ans});
});
E("u2-factored-y-intercept",2,["4.4"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-3,3);tries++;}
  var pool=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var ans=a*r1*r2;
  return numq("What is the y-intercept of the graph of \\(f(x) = "+factB(a,r1,r2)+"\\)?",
    ans,0.011,
    "The y-intercept occurs at \\(x = 0\\): \\(f(0) = "+a+" \\times ("+(0-r1)+") \\times ("+(0-r2)+") = "+a+" \\times "+(r1*r2)+" = \\)<b>\\("+ans+"\\)</b>. (The x-intercepts are \\("+r1+"\\) and \\("+r2+"\\); the y-intercept is \\(a\\) times their product.)",
    {a:a,r1:r1,r2:r2,ans:ans});
});
E("u2-max-height",2,["4.2"],2,"gen",function(){
  var k=ri(3,9),B=10*k,C=ri(2,30),max=C+5*k*k;
  var ctx=pick([["ball","kicked"],["stone","thrown"],["water jet","a fountain"],["flare","fired"]]);
  var q=numq("A "+ctx[0]+" is "+ctx[1]+". Its height is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it starts. What is the greatest height it reaches, in metres?",
    max,0.011,
    "The vertex is at \\(t = \\frac{"+B+"}{10} = "+k+"\\) s. Substituting: \\(h("+k+") = -5 \\times "+(k*k)+" + "+B+" \\times "+k+" + "+C+" = "+(-5*k*k)+" + "+(B*k)+" + "+C+" = \\)<b>\\("+max+"\\text{ m}\\)</b>.",
    {B:B,C:C,k:k,max:max});
  q.figure=trajSVG(-5,B,C);
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-substitution",3,["4.9"],1,"var",varset([
  function(){return mcq("To solve \\(x^2 - 5x + 3 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{5 \\pm \\sqrt{25 - 12}}{2}\\)",
    ["\\(x = \\frac{-5 \\pm \\sqrt{25 - 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{25 + 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{5 - 12}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = -5\\), \\(c = 3\\). The formula starts with \\(-b = 5\\), and the discriminant is \\(b^2 - 4ac = 25 - 12\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(2x^2 + 3x - 4 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{4}\\)",
    ["\\(x = \\frac{3 \\pm \\sqrt{9 + 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 - 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{2}\\)"],
    "Here \\(a = 2\\), \\(b = 3\\), \\(c = -4\\). The formula starts with \\(-b = -3\\), the discriminant is \\(9 - 4(2)(-4) = 9 + 32\\), and the denominator is \\(2a = 4\\).",
    {});},
  function(){return mcq("To solve \\(x^2 + 7x + 2 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-7 \\pm \\sqrt{49 - 8}}{2}\\)",
    ["\\(x = \\frac{7 \\pm \\sqrt{49 - 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{49 + 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{7 - 8}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = 7\\), \\(c = 2\\). The formula starts with \\(-b = -7\\), and the discriminant is \\(b^2 - 4ac = 49 - 8\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(3x^2 - 4x - 6 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{6}\\)",
    ["\\(x = \\frac{-4 \\pm \\sqrt{16 + 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 - 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{3}\\)"],
    "Here \\(a = 3\\), \\(b = -4\\), \\(c = -6\\). The formula starts with \\(-b = 4\\), the discriminant is \\(16 - 4(3)(-6) = 16 + 72\\), and the denominator is \\(2a = 6\\).",
    {});}
]));
E("u3-factor-difference",3,["PK.2"],1,"gen",function(){
  var a=ri(1,5),k=ri(2,15),ax=a===1?"x":a+"x";
  var key="\\(("+ax+" - "+k+")("+ax+" + "+k+")\\)";
  return mcq("Factor fully: \\("+(a===1?"x^2":(a*a)+"x^2")+" - "+(k*k)+"\\)",
    key,
    ["\\(("+ax+" + "+k+")("+ax+" + "+k+")\\)","\\(("+ax+" - "+k+")("+ax+" - "+k+")\\)","\\(("+ax+" - "+(k*k)+")("+ax+" + "+(k*k)+")\\)"],
    "This is a difference of squares: \\("+(a===1?"x^2":(a*a)+"x^2")+"\\) is \\(("+ax+")^2\\) and \\("+(k*k)+"\\) is \\("+k+"^2\\). A difference of squares factors as (first - second)(first + second): <b>"+key+"</b>.",
    {a:a,k:k});
});
E("u3-discriminant-nature",3,["4.7"],2,"gen",function(){
  var mode=ri(0,2),a,b,c,D;
  if(mode===0){
    var pool=[-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7];
    var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
    a=1;b=-(r1+r2);c=r1*r2;
  }else if(mode===1){
    var m=ri(2,5),af=pick([1,4]);a=af;b=2*m*Math.sqrt(af);c=m*m;
  }else{
    a=1;b=ri(-4,4);c=Math.floor(b*b/4)+ri(1,6);
  }
  D=b*b-4*a*c;
  var nature=mode===0?"two different real roots":(mode===1?"one repeated real root":"no real roots");
  var key="\\(D = "+D+"\\); "+nature;
  var others=["two different real roots","one repeated real root","no real roots"].filter(function(x){return x!==nature;});
  var wrongD=D===0?4:-D;
  return mcq("For the equation "+"\\("+quadB(a,b,c)+" = 0\\)"+", what is the discriminant, and what does it say about the roots?",
    key,
    ["\\(D = "+D+"\\); "+others[0],"\\(D = "+D+"\\); "+others[1],"\\(D = "+wrongD+"\\); "+nature],
    "\\(D = b^2 - 4ac = ("+b+")^2 - 4 \\times "+a+" \\times "+c+" = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(mode===0?"Since \\(D > 0\\), the equation has two different real roots.":(mode===1?"Since \\(D = 0\\), the equation has one repeated real root.":"Since \\(D < 0\\), the equation has no real roots (its graph never crosses the x-axis).")),
    {a:a,b:b,c:c,D:D,mode:mode});
});
E("u3-root-difference",3,["4.6"],3,"gen",function(){
  var r=ri(2,12),d=ri(1,8),S=2*r+d,K=r*(r+d);
  var frame=pick([
    "The roots of \\(x^2 - "+S+"x + k = 0\\) differ by "+d+". What is the value of \\(k\\)?",
    "A quadratic equation \\(x^2 - "+S+"x + k = 0\\) has two roots, and the larger root is "+d+" more than the smaller root. What is the value of \\(k\\)?"
  ]);
  return numq(frame,K,0.011,
    "For \\(x^2 - Sx + k\\), the sum of the roots is \\(S = "+S+"\\) and the product is \\(k\\). If the roots differ by "+d+", they are \\(("+S+" - "+d+") \\div 2 = "+r+"\\) and \\("+r+" + "+d+" = "+(r+d)+"\\). So \\(k = "+r+" \\times "+(r+d)+" = "+K+"\\).",
    {r:r,d:d,S:S,K:K});
});

/* --- Unit 4: Radicals --- */
E("u4-entire-cube",4,["1.1"],1,"gen",function(){
  var a=ri(2,6),b=pick([2,3,4,5,6,7,9,10,11,13,14,15,18,20]);
  var key=cbrtT(a*a*a*b);
  return mcq("Express "+rad3T(a,b)+" as an entire radical.",
    key,
    [cbrtT(a*b),cbrtT(a*a*b),cbrtT((a+1)*(a+1)*(a+1)*b)],
    "The coefficient must be cubed to move under a cube root: \\("+a+" = \\sqrt[3]{"+(a*a*a)+"}\\). So \\[\\begin{aligned} "+a+"\\sqrt[3]{"+b+"} &= \\sqrt[3]{"+(a*a*a)+" \\times "+b+"} \\\\ &= \\sqrt[3]{"+(a*a*a*b)+"} \\end{aligned}\\] (Squaring the coefficient would be right for a square root, not a cube root.)",
    {a:a,b:b});
});
E("u4-product-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(2,6),b=ri(2,6),mode=ri(0,1);
  var A=a*a*m,B=mode===0?b*b:b*b*m;
  var key,ds;
  if(mode===0){
    key=radT(a*b,m);
    var cand=[radT(a+b,m),sqrtT(A*B),radT(a*b,m+1),radT(a*b+1,m)];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  }else{
    key="\\("+(a*b*m)+"\\)";
    var cand2=["\\("+(a*b)+"\\)","\\("+((a+b)*m)+"\\)","\\("+(a*b*m+m)+"\\)",radT(a*b,m)];ds=[];
    for(var i2=0;i2<cand2.length&&ds.length<3;i2++){if(cand2[i2]!==key&&ds.indexOf(cand2[i2])<0)ds.push(cand2[i2]);}
  }
  return mcq("Simplify: \\(\\sqrt{"+A+"} \\times \\sqrt{"+B+"}\\). Give the answer in simplest form.",
    key,ds,
    "Simplify each radical first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+(mode===0?"\\("+b+"\\)":radT(b,m))+". Multiplying: "+(mode===0?"\\("+a+" \\times "+b+" = "+(a*b)+"\\), giving <b>"+key+"</b>.":"\\("+a+" \\times "+b+" \\times "+m+"\\) because \\(\\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+m+"\\), giving <b>"+key+"</b>."),
    {a:a,b:b,m:m,mode:mode,A:A,B:B});
});
E("u4-add-unlike",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(1,6),b=ri(1,6),tries=0;
  while(b===a&&tries<40){b=ri(1,6);tries++;}
  var A=a*a*m,B=b*b*m,key=radT(a+b,m);
  var cand=[sqrtT(A+B),radT(a*b,m),radT(a+b+1,m),radT(Math.abs(a-b),m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} + \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so add the coefficients: \\("+a+" + "+b+" = "+(a+b)+"\\), giving <b>"+key+"</b>. (The numbers under the roots are never added together.)",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-diagonal-radical",4,["1.6"],2,"gen",function(){
  var s=ri(2,6),m=pick([2,3,5,6,7,10]);
  var r0=2*m,t=1,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var key=r0===1?"\\("+(s*t)+"\\)":radT(s*t,r0);
  var cand=[radT(s,m),radT(2*s,m),sqrtT(2*s*s*m),r0===1?"\\("+(2*s*t)+"\\)":radT(s*t+1,r0)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var ctx=pick(["square tile","square panel","square garden plot","square poster"]);
  return mcq("A "+ctx+" has side length "+radT(s,m)+" m. What is the length of its diagonal, in simplest radical form?",
    key,ds,
    "By Pythagoras, the diagonal is \\(\\sqrt{2}\\) times the side: \\("+s+"\\sqrt{"+m+"} \\times \\sqrt{2} = "+s+"\\sqrt{"+(2*m)+"}\\). Simplifying \\(\\sqrt{"+(2*m)+"} = "+(r0===1?(""+t):(t===1?"\\sqrt{"+r0+"}":t+"\\sqrt{"+r0+"}"))+"\\) gives the diagonal as <b>"+key+"</b> m.",
    {s:s,m:m,t:t,r0:r0});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-cointerior-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,b,c2,d,V1,V2,tries=0;
  do{
    x0=ri(4,14);V1=ri(70,120);V2=180-V1;
    a=ri(2,6);b=V1-a*x0;c2=ri(2,6);d=V2-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var mode=ri(0,1),ans=mode===0?V1:V2;
  var q=numq("Two parallel lines are cut by a transversal. Two co-interior angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of the "+(mode===0?"first":"second")+" of these angles, in degrees?",
    ans,0.011,
    "Co-interior angles between parallel lines are supplementary: \\(("+exprT(a,b)+") + ("+exprT(c2,d)+") = 180\\). Solving gives \\(x = "+x0+"\\). The first angle is \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = "+V1+"^\\circ\\) and the second is \\("+V2+"^\\circ\\), so the angle asked for is <b>\\("+ans+"^\\circ\\)</b>.",
    {a:a,b:b,c:c2,d:d,x0:x0,V1:V1,V2:V2,mode:mode,ans:ans});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-congruence-perimeter",8,["5.6"],2,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=0,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-congruent-perimeter",8,["5.6"],1,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=1,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-angle-chase",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) forms a co-interior pair with a \\(64^\\circ\\) angle. \\(\\angle y\\) is vertically opposite \\(\\angle x\\). \\(\\angle z\\) is a corresponding angle to \\(\\angle y\\). What is the measure of \\(\\angle z\\)?",
    "\\(116^\\circ\\)",
    ["\\(64^\\circ\\)","\\(128^\\circ\\)","\\(90^\\circ\\)"],
    "Co-interior angles are supplementary: \\(\\angle x = 180^\\circ - 64^\\circ = 116^\\circ\\). Vertically opposite angles are equal: \\(\\angle y = 116^\\circ\\). Corresponding angles are equal: \\(\\angle z = 116^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 52^\\circ\\) and \\(\\angle B = 68^\\circ\\). \\(\\angle e\\) is the exterior angle at \\(C\\). \\(\\angle f\\) forms a co-interior pair with \\(\\angle e\\) where a transversal cuts two parallel lines. \\(\\angle g\\) is vertically opposite \\(\\angle f\\). What is the measure of \\(\\angle g\\)?",
    "\\(60^\\circ\\)",
    ["\\(120^\\circ\\)","\\(68^\\circ\\)","\\(180^\\circ\\)"],
    "The exterior angle equals the sum of the remote interiors: \\(\\angle e = 52^\\circ + 68^\\circ = 120^\\circ\\). Co-interior angles are supplementary: \\(\\angle f = 180^\\circ - 120^\\circ = 60^\\circ\\). Vertically opposite angles are equal: \\(\\angle g = 60^\\circ\\).",
    {});},
  function(){return mcq("In an isosceles triangle the vertex angle measures \\(38^\\circ\\). \\(\\angle b\\) is one of the base angles. \\(\\angle h\\) is the exterior angle at that same base vertex. A second diagram shows \\(\\angle j\\) as an alternate interior angle equal to \\(\\angle h\\) (the lines are parallel). What is the measure of \\(\\angle j\\)?",
    "\\(109^\\circ\\)",
    ["\\(71^\\circ\\)","\\(38^\\circ\\)","\\(142^\\circ\\)"],
    "Base angle: \\(\\angle b = (180^\\circ - 38^\\circ) \\div 2 = 71^\\circ\\). Exterior angle on a straight line: \\(\\angle h = 180^\\circ - 71^\\circ = 109^\\circ\\). Alternate interior angles between parallel lines are equal: \\(\\angle j = 109^\\circ\\).",
    {});},
  function(){return mcq("Each interior angle of a regular pentagon measures \\(108^\\circ\\). In a triangle drawn beside the pentagon, one angle is supplementary to \\(108^\\circ\\) and a second angle measures \\(47^\\circ\\). What is the measure of the triangle's third angle?",
    "\\(61^\\circ\\)",
    ["\\(72^\\circ\\)","\\(108^\\circ\\)","\\(119^\\circ\\)"],
    "The supplementary angle is \\(180^\\circ - 108^\\circ = 72^\\circ\\). The triangle's angles add to \\(180^\\circ\\): \\(180^\\circ - 72^\\circ - 47^\\circ = 61^\\circ\\).",
    {});}
]));

/* ============ Tranche 8 (Oct 27): finish-line pass, tranche 3 of 3 ============
   Unit 1 +2, Unit 2 +3, Unit 3 +3, Unit 4 +3, Unit 6 +1, Unit 7 +2
   (bank 192 -> 206, the finish line). Same reworked-template sources as
   tranches 6-7, mapped by topic, nothing verbatim. Unit 5 stays deep and
   untouched at 47; the other seven units land in outline proportion with
   each other: U1 16, U2 28, U3 28, U4 31, U6 17, U7 17, U8 22. */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-ambiguous-count",1,["7.2"],3,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "No triangle is possible",
    ["Exactly one triangle (a right triangle)","Exactly one triangle","Two different triangles are possible"],
    "Compare \\(a\\) with the height \\(h = b\\sin A = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Since \\(a = 5\\text{ cm}\\) is SHORTER than \\(6.43\\text{ cm}\\), side \\(a\\) cannot reach the base line at all — no triangle closes.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 30^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle (a right triangle)",
    ["No triangle is possible from these lengths","Exactly one triangle","Two different triangles fit this data"],
    "The height is \\(h = b\\sin A = 10 \\times \\sin 30^\\circ = 5\\text{ cm}\\). Side \\(a\\) equals \\(h\\) exactly, so side \\(a\\) just reaches the base at a right angle — exactly one triangle, and it is right-angled.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 8\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Two different triangles",
    ["No triangle is possible from these lengths","Exactly one triangle (a right triangle)","Exactly one triangle"],
    "The height is \\(h = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Side \\(a = 8\\text{ cm}\\) is longer than \\(h\\) but shorter than \\(b = 10\\text{ cm}\\), so it can swing to two different positions on the base — the ambiguous case gives two different triangles.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 50^\\circ\\), side \\(b = 9\\text{ cm}\\) and side \\(a = 11\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle",
    ["No triangle is possible in this case","Exactly one triangle (a right triangle)","Two triangles in all"],
    "Side \\(a = 11\\text{ cm}\\) is longer than side \\(b = 9\\text{ cm}\\), so it can only land in one position past the foot of the height — exactly one triangle. (Two triangles need \\(h < a < b\\).)",
    {});}
]));
E("u1-median-length",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(6,20),q=ri(6,20),A=ri(35,130);
  var a2=p*p+q*q-2*p*q*Math.cos(rd(A)),a=Math.sqrt(a2);
  var m=0.5*Math.sqrt(p*p+q*q+2*p*q*Math.cos(rd(A)));
  var ctx=pick(["triangular lot","triangular field","triangular garden plot"]);
  var qq=numq("A "+ctx+" has two sides of "+p+" m and "+q+" m meeting at a corner with an angle of \\("+A+"^\\circ\\) between them. A path runs from that corner to the midpoint of the opposite side. How long is the path, to one decimal place, in metres?",
    fmt(m,1),0.06,
    "First find the opposite side with the cosine law: \\(a^2 = "+p+"^2 + "+q+"^2 - 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ = "+fmt(a2,1)+"\\), so \\(a \\approx "+fmt(a,1)+"\\text{ m}\\). Then the median to that side (Apollonius's rule, from applying the cosine law in the two half-triangles) is \\(m = \\frac{1}{2}\\sqrt{"+p+"^2 + "+q+"^2 + 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ} = \\frac{1}{2}\\sqrt{"+fmt(p*p+q*q+2*p*q*Math.cos(rd(A)),1)+"} \\approx \\)<b>\\("+fmt(m,1)+"\\text{ m}\\)</b>.",
    {p:p,q:q,A:A,m:m});
  qq.figure=triSVG(a,q,p,{L:["A","B","C"],ang:[A+"°",null,null],side:[fmt(a,1)+" m",q+" m",p+" m"]});
  return qq;
});

/* --- Unit 2: Quadratic Functions --- */
E("u2-evaluate-f",2,["4.1"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var b=ri(-9,9),c=ri(-12,12),d=ri(-5,5),ans=a*d*d+b*d+c;
  return numq("For \\(f(x) = "+quadB(a,b,c)+"\\), what is \\(f("+d+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+d+"\\): \\(f("+d+") = "+a+" \\times ("+d+")^2 + ("+b+") \\times ("+d+") + ("+c+") = "+(a*d*d)+" + "+(b*d)+" + "+c+" = \\)<b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,d:d,ans:ans});
});
E("u2-vertex-shift",2,["4.15"],1,"var",varset([
  function(){
  var a=0,h=0,k=0,tries=0;
  while((a===0||h===0||k===0)&&tries<60){a=ri(-5,5);h=ri(-7,7);k=ri(-9,9);tries++;}
  var open=a>0?"upward":"downward";
  function vt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=vt(h,k)+"; opens "+open;
  return mcq("What is the vertex of \\(y = "+vertB(a,h,k)+"\\), and which way does the graph open?",
    key,
    [vt(-h,k)+"; opens "+open,vt(h,-k)+"; opens "+open,vt(-h,-k)+"; opens "+open],
    "In \\(y = a(x - h)^2 + k\\) the vertex is \\((h, k)\\). Here the squared part is \\((x "+(h>0?"- "+h:"+ "+(-h))+")\\), so \\(h = "+h+"\\) (the sign flips from how it appears), and \\(k = "+k+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the graph opens "+open+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
},
  function(){
  var a=0,h=0,k=0,tries=0;
  while((a===0||h===0||k===0)&&tries<60){a=ri(-5,5);h=ri(-7,7);k=ri(-9,9);tries++;}
  var open=a>0?"upward":"downward";
  function vt(x,y){return "\\(("+x+", "+y+"\\)";}
  var key=vt(h,k)+"; opens "+open;
  var qfig=mcq("The graph shows a parabola with its vertex marked. What is the vertex, and which way does the graph open?",
    key,
    [vt(-h,k)+"; opens "+open,vt(h,-k)+"; opens "+open,vt(-h,-k)+"; opens "+open],
    "The marked point is the vertex, \\(("+h+", "+k+")\\). The arms of the parabola point "+open+", so the graph opens "+open+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
  qfig.figure=parSVG(a,-2*a*h,a*h*h+k,{labels:"values",marks:[{x:h,y:k}]});
  return qfig;
}
]));
E("u2-factored-max-height",2,["4.2"],2,"gen",function(){
  var a=pick([2,3,4,5]),r1=ri(3,14),r2=ri(1,8);if(r2>=r1)r2=r1-1;
  var S=r1+r2,max=a*S*S/4,tstar=(r1-r2)/2;
  var q=numq("A projectile's height is modelled by \\(h(t) = -"+a+"(t - "+r1+")(t + "+r2+")\\) metres, \\(t\\) seconds after launch. What is the greatest height it reaches? Give the exact value, in metres.",
    max,0.011,
    "The height is zero at \\(t = "+r1+"\\) and (before launch) at \\(t = -"+r2+"\\); the vertex sits midway between the roots, at \\(t = \\frac{"+r1+" - "+r2+"}{2} = "+fmt(tstar,1)+"\\) s. Substituting: \\(h("+fmt(tstar,1)+") = -"+a+" \\times ("+fmt(tstar-r1,1)+") \\times ("+fmt(tstar+r2,1)+") = \\)<b>\\("+fmt(max,2)+"\\text{ m}\\)</b>.",
    {a:a,r1:r1,r2:r2,S:S,max:max});
  q.figure=trajSVG(-a,a*(r1-r2),a*r1*r2);
  return q;
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-exact-roots",3,["4.9"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function fmtRoot(num,coef,rad,den){var body=num+" \\pm "+(coef===1?"":coef)+"\\sqrt{"+rad+"}";return den===1?("\\("+body+"\\)"):("\\(\\frac{"+body+"}{"+den+"}\\)");}
  var a,b,c,D,t,Dp,g,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-8,8);
    D=b*b-4*a*c;t=1;Dp=D;
    for(var f=2;f*f<=Dp;f++){while(Dp%(f*f)===0){Dp/=(f*f);t*=f;}}
    tries++;
  }while((b===0||D<=0||Dp<=1)&&tries<90);
  /* require b != 0, D > 0 and D not a perfect square (Dp > 1 after extraction);
     the fallback below satisfies all three (D = 37) if the loop ever exhausts */
  if(b===0||D<=0||Dp<=1){a=1;b=-5;c=-3;D=b*b-4*a*c;t=1;Dp=D;for(var f2=2;f2*f2<=Dp;f2++){while(Dp%(f2*f2)===0){Dp/=(f2*f2);t*=f2;}}}
  g=gcd(gcd(b,t),2*a);
  var num=-b/g,coef=t/g,den=2*a/g;
  var key=fmtRoot(num,coef,Dp,den);
  var cand=[fmtRoot(b/g,coef,Dp,den),fmtRoot(num,1,D,2*a),fmtRoot(num,coef,Dp,a),fmtRoot(num,coef+1,Dp,den),fmtRoot(num+1,coef,Dp,den)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Which option gives the roots in simplest exact form?",
    key,ds,
    "\\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] "+(t>1?"Since \\(\\sqrt{"+D+"} = "+t+"\\sqrt{"+Dp+"}\\), ":"Since \\(\\sqrt{"+D+"}\\) does not simplify, ")+(g>1?"and the whole fraction divides by \\("+g+"\\), ":"")+"the simplest exact form is <b>"+key+"</b>.",
    {a:a,b:b,c:c,D:D,t:t,Dp:Dp,num:num,coef:coef,den:den});
});
E("u3-squares-area",3,["4.3"],2,"gen",function(){
  var s=ri(3,14),m=ri(1,6),T=s*s+(s+m)*(s+m);
  var ctx=pick([["two square garden plots","plot"],["two square patios","patio"],["two square quilts","quilt"]]);
  var q=numq("A gardener has "+ctx[0]+". The side of the larger "+ctx[1]+" is "+m+" m longer than the side of the smaller one, and their areas add to \\("+T+"\\text{ m}^2\\). What is the side length of the smaller "+ctx[1]+", in metres?",
    s,0.011,
    "Let the smaller side be \\(s\\); the larger is \\(s + "+m+"\\). Then \\(s^2 + (s + "+m+")^2 = "+T+"\\). A shortcut: \\((2s + "+m+")^2 = 2 \\times "+T+" - "+(m*m)+" = "+(2*T-m*m)+"\\), so \\(2s + "+m+" = "+(2*s+m)+"\\) and \\(s = "+s+"\\) m. (Check: \\("+s+"^2 + "+(s+m)+"^2 = "+(s*s)+" + "+((s+m)*(s+m))+" = "+T+"\\).)",
    {s:s,m:m,T:T});
  q.figure=twoSquaresSVG(m);
  return q;
});
E("u3-number-pair",3,["4.6"],2,"gen",function(){
  var u=ri(-6,10),v=u+ri(1,9),S=u+v,P=u*v;
  return numq("Two numbers add to "+S+" and multiply to "+P+". What is the larger of the two numbers?",
    v,0.011,
    "The numbers are the roots of \\(x^2 - ("+S+")x + ("+P+") = 0\\), which factors as \\("+(u>=0?"(x - "+u+")":"(x + "+(-u)+")")+(v>=0?"(x - "+v+")":"(x + "+(-v)+")")+" = 0\\). The roots are \\("+u+"\\) and \\("+v+"\\), so the larger number is <b>\\("+v+"\\)</b>. (Check: \\("+u+" + "+v+" = "+S+"\\) and \\("+u+" \\times "+v+" = "+P+"\\).)",
    {u:u,v:v,S:S,P:P});
});

/* --- Unit 4: Radicals --- */
E("u4-compare-radicals",4,["1.4"],2,"gen",function(){
  var a,b,c,d,x2,y2,tries=0;
  do{
    a=ri(1,6);b=pick([2,3,5,6,7,10,11,13]);c=ri(1,6);d=pick([2,3,5,6,7,10,11,13]);
    x2=a*a*b;y2=c*c*d;tries++;
  }while((x2===y2||(a===c&&b===d))&&tries<60);
  var X=radT(a,b),Y=radT(c,d),xBig=x2>y2;
  return mcq("Which statement about "+X+" and "+Y+" is true?",
    (xBig?X:Y)+" is the larger value",
    [(xBig?Y:X)+" is the larger value","They are equal in value","They cannot be compared without a calculator"],
    "Write both as entire radicals: "+X+" = "+sqrtT(x2)+" and "+Y+" = "+sqrtT(y2)+". Since \\("+Math.max(x2,y2)+" > "+Math.min(x2,y2)+"\\), the larger value is <b>"+(xBig?X:Y)+"</b>.",
    {a:a,b:b,c:c,d:d,x2:x2,y2:y2});
});
E("u4-difference-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(3,7),b=ri(1,a-1);
  var A=a*a*m,B=b*b*m,key=radT(a-b,m);
  var cand=[sqrtT(A-B),radT(a+b,m),radT(a,m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} - \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so subtract the coefficients: \\("+a+" - "+b+" = "+(a-b)+"\\), giving <b>"+key+"</b>.",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-reciprocal-sum",4,["1.7"],2,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var a=pick([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26]),k=ri(2,6),B=a*k*k;
  var g=gcd(k+1,k*a),num=(k+1)/g,den=(k*a)/g;
  function fr(nm,dn){return "\\(\\frac{"+(nm===1?"\\sqrt{"+a+"}":nm+"\\sqrt{"+a+"}")+"}{"+dn+"}\\)";}
  var key=fr(num,den);
  var cand=[fr(k+1,k*a),"\\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+a+"}\\)","\\(\\frac{\\sqrt{"+a+"}}{"+k+"}\\)",fr(k,k*a)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify, rationalizing the denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{\\sqrt{"+B+"}}\\).",
    key,ds,
    "First, \\(\\sqrt{"+B+"} = "+k+"\\sqrt{"+a+"}\\). Write the sum over a common denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{"+k+"\\sqrt{"+a+"}} = \\frac{"+(k+1)+"}{"+k+"\\sqrt{"+a+"}}\\). Rationalizing (multiply top and bottom by \\(\\sqrt{"+a+"}\\)) gives \\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+(k*a)+"}\\)"+(g>1?", which reduces by \\("+g+"\\)":"")+" — the simplest form is <b>"+key+"</b>.",
    {a:a,k:k,B:B,g:g,num:num,den:den});
});

/* --- Unit 6: Proportional Reasoning --- */
E("u6-map-distance",6,["6.9"],2,"gen",function(){
  var N=pick([20000,25000,40000,50000,100000]),mode=ri(0,1);
  var dcm,km,ans,tries=0;
  if(mode===0){
    dcm=ri(3,18);km=dcm*N/100000;ans=km;
  }else{
    do{km=pick([2,3,4,5,6,8,10,12]);dcm=km*100000/N;tries++;}while(dcm!==Math.floor(dcm)&&tries<60);
    ans=dcm;
  }
  return numq(mode===0
      ?"On a map with scale \\(1 : "+N+"\\), the distance between two towns measures "+dcm+" cm. What is the actual distance between the towns, in kilometres?"
      :"On a map with scale \\(1 : "+N+"\\), two towns are actually "+km+" km apart. How far apart are they on the map, in centimetres?",
    ans,0.011,
    mode===0
      ?"Each map centimetre represents \\("+N+"\\text{ cm} = "+fmt(N/100000,2)+"\\text{ km}\\) on the ground. Actual distance: \\("+dcm+" \\times "+fmt(N/100000,2)+" = \\)<b>\\("+fmt(km,2)+"\\text{ km}\\)</b>."
      :"Each map centimetre represents \\("+fmt(N/100000,2)+"\\text{ km}\\), so the map distance is \\("+km+" \\div "+fmt(N/100000,2)+" = \\)<b>\\("+dcm+"\\text{ cm}\\)</b>.",
    {N:N,dcm:dcm,km:km,mode:mode,ans:ans});
});

/* --- Unit 7: Reasoning --- */
E("u7-proof-repair",7,["2.8"],3,"gen",function(){
  var f=pick([1,-1]);var a=ri(2,9);var rootA=f*a;var b=ri(2,9);if(b===rootA)b=b+1;
  var term=rootA>=0?"(x - "+rootA+")":"(x + "+(-rootA)+")";
  return numq("A student solves \\(x"+term+" = "+b+term+"\\) by cancelling the factor \\("+term+"\\) from both sides, and reports the single solution \\(x = "+b+"\\). Cancelling that factor lost one solution. What is the missing solution?",
    rootA,0.011,
    "Cancelling \\("+term+"\\) amounts to dividing both sides by it, which throws away the case where the factor itself is zero. Move everything to one side instead: \\(x"+term+" - "+b+term+" = "+term+"(x - "+b+") = 0\\), so the solutions are \\(x = "+rootA+"\\) and \\(x = "+b+"\\). The missing solution is <b>\\(x = "+rootA+"\\)</b>, exactly the value that makes the cancelled factor zero.",
    {rootA:rootA,b:b});
});
E("u7-smallest-counterexample",7,["2.4"],3,"var",varset([
  function(){return numq("Conjecture: \u2018Every multiple of \\(4\\) is a multiple of \\(8\\).\u2019 What is the smallest positive multiple of \\(4\\) that disproves it?",
    4,0.011,"The multiples of \\(4\\) are \\(4, 8, 12, 16, \\ldots\\) The very first one, \\(4\\), is not a multiple of \\(8\\), so it is a counterexample, and no smaller positive multiple of \\(4\\) exists.",{});},
  function(){return numq("Conjecture: \u2018Every multiple of \\(6\\) is a multiple of \\(9\\).\u2019 What is the smallest positive multiple of \\(6\\) that disproves it?",
    6,0.011,"The multiples of \\(6\\) are \\(6, 12, 18, \\ldots\\) The number \\(6\\) is not a multiple of \\(9\\), so it disproves the conjecture, and it is the first multiple to check.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(10\\) is divisible by \\(15\\).\u2019 What is the smallest positive number that disproves it?",
    10,0.011,"The number \\(10\\) is divisible by \\(10\\) but not by \\(15\\). It meets the condition and breaks the claim, and no smaller positive number meets the condition at all.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(12\\) is divisible by \\(18\\).\u2019 What is the smallest positive number that disproves it?",
    12,0.011,"The number \\(12\\) is divisible by \\(12\\), but \\(12 \\div 18\\) is not a whole number. So \\(12\\) is a counterexample, and the smallest one possible.",{});},
  function(){return numq("For whole numbers \\(n\\), the expression \\(n^2 + n + 11\\) gives a prime for \\(n = 0, 1, 2, \\ldots, 9\\). A student conjectures it is prime for every whole number. For what value of \\(n\\) does it first fail?",
    10,0.011,"Keep testing past the cases given: at \\(n = 10\\), \\(10^2 + 10 + 11 = 121 = 11 \\times 11\\), which is not prime. The pattern survived ten cases and still failed, which is why checking cases can support a conjecture but never prove it.",{});}
]));
E("u7-counterexample-name",7,["2.4"],3,"var",varset([
  function(){return textq("Conjecture: \u2018A quadrilateral with all four sides equal is a square.\u2019 Name a quadrilateral with all sides equal that is not a square. (Type the name of the shape.)",
    ["rhombus"],
    "A <b>rhombus</b> has all four sides equal, but its angles need not be right angles, so it need not be a square. A single counterexample disproves the conjecture.",{});},
  function(){return textq("Conjecture: \u2018If the diagonals of a quadrilateral are perpendicular, the quadrilateral is a rhombus.\u2019 Name a quadrilateral with perpendicular diagonals that is not a rhombus. (Type the name of the shape.)",
    ["kite"],
    "A <b>kite</b> has perpendicular diagonals, but its sides are two pairs of adjacent equal sides, not four equal sides, so it is not a rhombus.",{});},
  function(){return textq("Conjecture: \u2018A quadrilateral with a pair of parallel sides is a parallelogram.\u2019 Name a quadrilateral that has exactly one pair of parallel sides. (Type the name of the shape.)",
    ["trapezoid","trapezium"],
    "A <b>trapezoid</b> has exactly one pair of parallel sides; a parallelogram needs two pairs. So the trapezoid is a counterexample.",{});},
  function(){return textq("Conjecture: \u2018Every prime number is odd.\u2019 Type the prime number that is a counterexample.",
    ["2"],
    "The number <b>2</b> is prime, since its only factors are 1 and itself, but it is even. One counterexample is enough to disprove the conjecture.",{});}
]));
E("u7-triangular-total",7,["2.1"],2,"gen",function(){
  var mode=ri(0,3),N=0,ans=0,prompt="",sol="";
  if(mode===0){N=ri(8,26);ans=N*(N+1)/2;
    prompt="Blocks are stacked in a staircase: a 1-step staircase uses \\(1\\) block, a 2-step staircase uses \\(3\\) blocks, and a 3-step staircase uses \\(6\\) blocks. How many blocks does a "+N+"-step staircase use?";
    sol="The totals \\(1, 3, 6, \\ldots\\) grow by \\(2\\), then \\(3\\), then \\(4\\): step \\(k\\) adds \\(k\\) blocks. So the total for \\(n\\) steps is \\(1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}\\). For \\("+N+"\\) steps: \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> blocks.";}
  else if(mode===1){N=ri(7,22);ans=N*(N-1)/2;
    prompt="At a meeting, every person shakes hands with every other person exactly once. With \\(4\\) people there are \\(6\\) handshakes. How many handshakes are there with "+N+" people?";
    sol="Each of the \\("+N+"\\) people shakes \\("+(N-1)+"\\) hands, but that counts every handshake twice, once from each end. The total is \\(\\frac{"+N+" \\times "+(N-1)+"}{2} = \\)<b>\\("+ans+"\\)</b>. Check the given case: \\(\\frac{4 \\times 3}{2} = 6\\), as stated.";}
  else if(mode===2){N=ri(8,28);ans=N*(N+1)/2;
    prompt="Seats are arranged in rows: row 1 has \\(1\\) seat, row 2 has \\(2\\) seats, row 3 has \\(3\\) seats, and so on. How many seats are there in the first "+N+" rows altogether?";
    sol="Add the rows: \\(1 + 2 + \\cdots + "+N+"\\). Pair the first and last rows, the second and second-last, and so on: each pair sums to \\("+(N+1)+"\\), and there are \\("+N+" \\div 2\\) pairs, giving \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> seats.";}
  else{N=ri(9,24);ans=N*(N+1)/2;
    prompt="Counters are arranged in a triangular pattern: the first row has \\(1\\) counter, the second row has \\(2\\) counters, the third row has \\(3\\) counters, and so on. How many counters are there in the first "+N+" rows?";
    sol="The row counts are consecutive whole numbers, so the total is \\(1 + 2 + \\cdots + "+N+" = \\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> counters.";}
  return numq(prompt,ans,0.011,sol,{mode:mode,N:N});
});
E("u7-chain-conclusion",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  var order=shuffle(names.slice());
  var clues=[];for(var i=0;i<3;i++)clues.push(order[i]+" is taller than "+order[i+1]+".");
  clues=shuffle(clues);
  var askTall=Math.random()<0.5;
  var target=askTall?order[0]:order[3];
  return textq("Four students, "+names.join(", ")+", are compared by height. The clues are: (1) "+clues[0]+" (2) "+clues[1]+" (3) "+clues[2]+" Who is the "+(askTall?"tallest":"shortest")+" student? (Type the name.)",
    [target],
    "Chain the clues together: "+order[0]+" is taller than "+order[1]+", who is taller than "+order[2]+", who is taller than "+order[3]+". The clues force one full order, so the "+(askTall?"tallest":"shortest")+" student is <b>"+target+"</b>. This is deductive reasoning: the conclusion has to hold.",
    {order:order,askTall:askTall});
});
E("u7-false-pattern",7,["2.2"],2,"var",varset([
  function(){return numq("A flatbread is cut with straight cuts that cross the whole flatbread. One cut makes \\(2\\) pieces, \\(2\\) cuts make \\(4\\) pieces, and \\(3\\) cuts make \\(7\\) pieces. A student conjectures the pieces double each time and predicts \\(8\\) pieces for \\(4\\) cuts. How many pieces do \\(4\\) cuts actually make?",
    11,0.011,"Watch the increases instead: the counts grow by \\(2\\), then by \\(3\\), because each new cut crosses all the earlier cuts and so adds one more piece than the cut before. The next increase is \\(4\\), giving \\(7 + 4 = \\)<b>\\(11\\)</b> pieces. The doubling pattern fit the first step and failed soon after.",{});},
  function(){return numq("A pattern of counts begins \\(1, 2, 4, 7\\). The increases are \\(1\\), then \\(2\\), then \\(3\\). Following the same pattern of increases, what is the next count?",
    11,0.011,"The increases grow by \\(1\\) each time: \\(1, 2, 3\\), so the next increase is \\(4\\). The next count is \\(7 + 4 = \\)<b>\\(11\\)</b>. Judging a pattern means looking at how it grows, not just at the terms shown.",{});},
  function(){return numq("A student computes \\(3 = 3\\), \\(3 + 6 = 9\\) and \\(3 + 6 + 9 = 18\\), and conjectures that the sums are doubling. The sums are actually built by adding the next multiple of \\(3\\) each time. What is the next sum?",
    30,0.011,"The next multiple of \\(3\\) is \\(12\\), so the next sum is \\(18 + 12 = \\)<b>\\(30\\)</b>, not the \\(36\\) that doubling predicts. The first few terms of a pattern can fit a rule that the pattern is not following.",{});},
  function(){return numq("Matchsticks form a row of squares: \\(1\\) square uses \\(4\\) matchsticks, \\(2\\) squares use \\(7\\), and \\(3\\) squares use \\(10\\). A student conjectures that each new square adds \\(4\\) matchsticks, because the first square needed \\(4\\). How many matchsticks do \\(6\\) squares use?",
    19,0.011,"After the first square, each added square shares one side with the square before it, so it adds only \\(3\\) matchsticks: \\(4, 7, 10, 13, 16, 19\\). Six squares use <b>\\(19\\)</b> matchsticks. The first term alone does not set the rule.",{});}
]));
E("u7-deductive-chain",7,["2.3"],2,"gen",function(){
  /* rows: [singular A, plural A, plural B, singular C, plural C, singular D, plural D]
     with A in B, B in C, C in D */
  var rows=[
    ["daisy","daisies","flowers","plant","plants","living thing","living things"],
    ["robin","robins","birds","animal","animals","living thing","living things"],
    ["square","squares","rectangles","quadrilateral","quadrilaterals","polygon","polygons"],
    ["salmon","salmon","fish","animal","animals","living thing","living things"],
    ["violin","violins","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["poodle","poodles","dogs","mammal","mammals","animal","animals"],
    ["oak tree","oak trees","trees","plant","plants","living thing","living things"],
    ["emerald","emeralds","gems","mineral","minerals","natural substance","natural substances"],
    ["maple tree","maple trees","trees","plant","plants","living thing","living things"],
    ["eagle","eagles","birds","animal","animals","living thing","living things"],
    ["hexagon","hexagons","polygons","shape","shapes","figure","figures"],
    ["trumpet","trumpets","brass instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["wolf","wolves","canines","mammal","mammals","animal","animals"],
    ["trout","trout","fish","animal","animals","living thing","living things"],
    ["cube","cubes","prisms","solid","solids","figure","figures"],
    ["cello","cellos","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["beagle","beagles","dogs","mammal","mammals","animal","animals"],
    ["tulip","tulips","flowers","plant","plants","living thing","living things"],
    ["sparrow","sparrows","birds","animal","animals","living thing","living things"],
    ["trapezoid","trapezoids","quadrilaterals","polygon","polygons","figure","figures"]
  ];
  var R=pick(rows),mode=ri(0,2);
  if(mode===2){
    return mcq("All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+". All "+R[4]+" are "+R[6]+". One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
      "The "+R[0]+" is also a "+R[5],
      ["The "+R[0]+" is not a "+R[5],"Every "+R[5]+" is a "+R[0],"Every member of "+R[4]+" is a "+R[0]],
      "Follow the whole chain: all "+R[1]+" are "+R[2]+", all "+R[2]+" are "+R[4]+", and all "+R[4]+" are "+R[6]+" — so this "+R[0]+" must be a "+R[5]+". The other options reverse the chain, which deduction does not allow.",
      {row:R,mode:mode});
  }
  var first="All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+".";
  var second="All "+R[2]+" are "+R[4]+". All "+R[1]+" are "+R[2]+".";
  return mcq((mode===0?first:second)+" One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
    "The "+R[0]+" is also a "+R[3],
    ["The "+R[0]+" is not a "+R[3],"Every "+R[3]+" is a "+R[0],"Every member of "+R[2]+" is a "+R[0]],
    "Deduction follows the chain: all "+R[1]+" are "+R[2]+", and all "+R[2]+" are "+R[4]+", so this "+R[0]+" must be a "+R[3]+". The other options reverse the chain, which deduction does not allow.",
    {row:R,mode:mode});
});
E("u7-figure-pattern",7,["2.1"],1,"gen",function(){
  var p=ri(1,4),q=ri(0,5),N=ri(6,15);
  function cnt(n){return n*n+p*n+q;}
  var ctx=pick(["dots","stars","tiles"]);
  return numq("A pattern of "+ctx+" grows like this: Figure 1 has "+cnt(1)+", Figure 2 has "+cnt(2)+", and Figure 3 has "+cnt(3)+". The count for Figure \\(n\\) is \\(n^2 + "+p+"n"+(q>0?" + "+q:"")+"\\). How many "+ctx+" are in Figure \\("+N+"\\)?",
    cnt(N),0.011,
    "Substitute \\(n = "+N+"\\): \\("+N+"^2 + "+p+" \\times "+N+(q>0?" + "+q:"")+" = "+(N*N)+" + "+(p*N)+(q>0?" + "+q:"")+" = \\)<b>\\("+cnt(N)+"\\)</b>. (The formula checks against the given figures: for \\(n = 1, 2, 3\\) it gives \\("+cnt(1)+", "+cnt(2)+", "+cnt(3)+"\\), as stated.)",
    {p:p,q:q,N:N,ans:cnt(N)});
});

/* ============ selection engine ============ */
/* Mid-course scope (Table of Specifications, verified Oct 26, 2026): the mid-course
   exam samples Unit 4 only to Section 4.3, so the two Radical Equations entries
   (Section 4.4) are flagged postMid and held out whenever the Mid preset is active.
   Picking Unit 4 directly still serves the full unit. */
BANK.forEach(function(e){if(e.id==="u4-radical-equation"||e.id==="u4-extraneous"||e.id==="u4-model-equation"||e.id==="u4-model-evaluate"||e.id==="u4-cube-equation")e.postMid=true;});
