// Math 3201 Unit 2 Polynomial Functions question bank
// CRMARKS: u2-correct-the-claim-cr=2
// CRMARKS: u2-degree-equation=1
// CRMARKS: u2-end-behaviour=1
// CRMARKS: u2-fit-value=2
// CRMARKS: u2-graph-characteristics=1
// CRMARKS: u2-interpret-model=2
// CRMARKS: u2-match-equation-graph=2
// CRMARKS: u2-model-change-cr=2
// CRMARKS: u2-recover-and-predict-cr=3
// CRMARKS: u2-reverse-intercepts=3
// CRMARKS: u2-turning-points-graph=1
// CRMARKS: u2-y-intercept=1
// CRMARKS: u2-zeros-and-intercept-cr=3
/* ================= Unit 2: Polynomial Functions ================= */
E("u2-degree-equation",2,["3.18"],1,"gen",function(){
  var choice=ri(1,6),f,deg,why;
  if(choice===1){var a=ri(2,6);f="f(x) = "+a+"x - "+ri(3,25)+" + x^2";deg=2;why="written in standard form it is \\(x^2 + "+a+"x - \\dots\\), so the highest power is \\(x^2\\)";}
  else if(choice===2){var r=ri(-6,6);f="f(x) = x^2(x "+(r>=0?"- "+r:"+ "+(-r))+")";if(r===0)f="f(x) = x^2(x)";deg=3;why="expanding gives \\(x^3\\) as the highest power";}
  else if(choice===3){var p=ri(-5,5),q=ri(-5,5);f="f(x) = (x "+(p>=0?"- "+p:"+ "+(-p))+")(x "+(q>=0?"- "+q:"+ "+(-q))+")";deg=2;why="two linear factors multiply to give degree 2";}
  else if(choice===4){var a3=ri(2,5),b3=ri(-8,8),c3=ri(-8,8),d3=ri(-8,8);f="f(x) = "+a3+"x^3 "+(b3>=0?"+ ":"- ")+Math.abs(b3)+"x^2 "+(c3>=0?"+ ":"- ")+Math.abs(c3)+"x "+(d3>=0?"+ ":"- ")+Math.abs(d3);deg=3;why="the highest power of \\(x\\) is \\(x^3\\)";}
  else if(choice===5){var a5=ri(2,7),b5=ri(-9,9);f="f(x) = "+(b5>=0?(a5+"x + "+b5):(a5+"x - "+(-b5)));deg=1;why="the highest power of \\(x\\) is \\(x^1\\)";}
  else{f="f(x) = "+ri(3,20);deg=0;why="a constant function has degree 0";}
  return mcq("What is the <b>degree</b> of the polynomial function \\("+f+"\\)?",
    ""+deg,["0","1","2","3"].filter(function(v){return v!==""+deg;}),
    "The degree is the highest power of \\(x\\) when the function is expanded: here "+why+", so the degree is <b>"+deg+"</b>.",
    {deg:deg,choice:choice});
});
E("u2-y-intercept",2,["3.18"],1,"gen",function(){
  var a=ri(2,6),b=ri(-9,9),c=ri(-12,12),form=ri(1,3),f,yi;
  if(form===1){f=quadS(a,b,c);yi=c;}
  else if(form===2){f="f(x) = "+c+" "+(b>=0?"+ ":"- ")+Math.abs(b)+"x "+(a>=0?"+ ":"- ")+a+"x^2";yi=c;}
  else{f="f(x) = x^3 "+(b>=0?"+ ":"- ")+Math.abs(b)+"x^2 "+(c>=0?"+ ":"- ")+Math.abs(c);yi=c;}
  return numq("What is the <b>y-intercept</b> of \\("+f+"\\)?",
    yi,0.001,
    "The y-intercept is the value at \\(x = 0\\). Every term containing \\(x\\) becomes 0, leaving the constant term: <b>"+yi+"</b>.",
    {yi:yi,form:form});
});
E("u2-turning-points-graph",2,["3.17"],1,"gen",function(){
  var kind=pick(["quad","cubic2","cubic0"]),fn,tp;
  if(kind==="quad"){var s=pick([1,-1]),h=ri(-2,2),k=ri(-3,3);fn=function(x){return s*(x-h)*(x-h)+k;};tp=1;
    var q=mcq("The graph of \\(f(x) = "+quadS(s,-2*s*h,s*h*h+k)+"\\) is shown. How many <b>turning points</b> does the graph have?","1",["0","2","3"],
      "The graph is a parabola with a single vertex, so it changes direction exactly once: <b>1 turning point</b>.",{kind:kind});
    q.figure=plotSVG(fn,-6,6,-8,12);return q;}
  if(kind==="cubic2"){var s2=pick([1,-1]),u=pick([1,1.5]),k2=ri(-3,3);fn=function(x){return s2*(x*x*x-3*u*u*x)+k2;};tp=2;
    var cc=-3*u*u*s2;
    var eq2=(s2<0?"-":"")+"x^3 "+(cc>=0?"+ ":"- ")+fmt(Math.abs(cc))+"x "+(k2>=0?"+ ":"- ")+Math.abs(k2);
    var q2=mcq("The graph of \\(f(x) = "+eq2+"\\) is shown. How many <b>turning points</b> does the graph have?","2",["0","1","3"],
      "The cubic rises (or falls), flattens into a local maximum, turns again at a local minimum, then continues: it changes direction twice, so there are <b>2 turning points</b>.",{kind:kind});
    q2.figure=plotSVG(fn,-4.5,4.5,-20,20);return q2;}
  var s3=pick([1,-1]),k3=ri(-4,4);fn=function(x){return s3*(x*x*x+x)+k3;};
  var eq3=(s3<0?"-":"")+"x^3 "+(s3>0?"+ ":"- ")+"x "+(k3>=0?"+ ":"- ")+Math.abs(k3);
  var q3=mcq("The graph of \\(f(x) = "+eq3+"\\) is shown. How many <b>turning points</b> does the graph have?","0",["1","2","3"],
    "This cubic keeps moving in the same direction the whole way across; it may flatten briefly but never changes direction, so there are <b>0 turning points</b>.",{kind:kind});
  q3.figure=plotSVG(fn,-3.5,3.5,-22,22);return q3;
});
E("u2-end-behaviour",2,["3.18"],1,"gen",function(){
  var deg=pick([1,2,3]),sgn=pick([1,-1]),a=sgn*ri(2,6),b=ri(-8,8),c=ri(-8,8);
  var fs=(deg===1)?linS(a,c):(deg===2?quadS(a,b,c):(""+a+"x^3 "+(b>=0?"+ ":"- ")+Math.abs(b)+"x^2 "+(c>=0?"+ ":"- ")+Math.abs(c)+"x"));
  var pats={"odd+":"Quadrant III to Quadrant I","odd-":"Quadrant II to Quadrant IV","even+":"Quadrant II to Quadrant I","even-":"Quadrant III to Quadrant IV"};
  var key=(deg%2===1?(sgn>0?"odd+":"odd-"):(sgn>0?"even+":"even-"));
  var correct=pats[key];
  var others=Object.keys(pats).filter(function(k){return k!==key;}).map(function(k){return pats[k];});
  return mcq("The graph of \\(f(x) = "+fs+"\\) extends from which quadrant to which quadrant?",
    correct,others,
    "The degree "+deg+" is "+(deg%2===1?"odd":"even")+" and the leading coefficient "+a+" is "+(sgn>0?"positive":"negative")+". "+(deg%2===1?("For an odd degree, the two ends go in opposite directions; a positive leading coefficient sends the right end up, so the graph runs from Quadrant III to Quadrant I."):("For an even degree, both ends go the same way; the sign of the leading coefficient decides whether both ends rise or both fall."))+" Here the graph extends from <b>"+correct+"</b>.",
    {deg:deg,a:a});
});
E("u2-characteristics-equation",2,["3.18"],1,"gen",function(){
  var feat=pick(["yint","end","count"]);
  if(feat==="end"){
    var a=pick([2,3,-2,-3]),r1=ri(-6,6),r2=ri(-6,6),r3=ri(-6,6),t=0;
    while((r1===r2||r1===r3||r2===r3)&&t<60){r1=ri(-6,6);r2=ri(-6,6);r3=ri(-6,6);t++;}
    var f="f(x) = "+(a<0?"-":"")+Math.abs(a)+linF(r1)+linF(r2)+linF(r3);
    var corr=(a>0)?"Quadrant III to Quadrant I":"Quadrant II to Quadrant IV";
    return mcq("Which statement describes the <b>end behaviour</b> of \\("+f+"\\)?",
      "It extends from "+corr,
      ["It extends from "+(a>0?"Quadrant II to Quadrant IV":"Quadrant III to Quadrant I"),"It extends from Quadrant II to Quadrant I","It extends from Quadrant III to Quadrant IV"],
      "The function is a cubic (odd degree) with leading coefficient "+a+". "+(a>0?"A positive leading coefficient means the left end falls and the right end rises: Quadrant III to Quadrant I.":"A negative leading coefficient reverses the cubic: Quadrant II to Quadrant IV.")+" The roots affect where the graph crosses the axis, not the end behaviour.",{feat:feat,a:a});
  }
  if(feat==="count"){
    var shape=pick(["distinct","double","triple"]);
    var a2=pick([1,2,-1,-2]),u=ri(-5,5),v=ri(-5,5),w=ri(-5,5),tt=0;
    while((u===v||u===w||v===w)&&tt<60){u=ri(-5,5);v=ri(-5,5);w=ri(-5,5);tt++;}
    var as=(a2===1?"":(a2===-1?"-":""+a2)),fcnt,fstr;
    if(shape==="distinct"){fcnt=3;fstr="f(x) = "+as+linF(u)+linF(v)+linF(w);}
    else if(shape==="double"){fcnt=2;fstr="f(x) = "+as+linF(u)+"^2"+linF(v);}
    else{fcnt=1;fstr="f(x) = "+as+linF(u)+"^3";}
    return mcq("How many <b>distinct x-intercepts</b> does \\("+fstr+"\\) have?",
      ""+fcnt,["0","1","2","3"].filter(function(x){return x!==""+fcnt;}),
      (shape==="distinct"?"Each of the three different linear factors gives its own x-intercept: \\(x = "+u+"\\), \\(x = "+v+"\\) and \\(x = "+w+"\\).":(shape==="double"?"The squared factor "+linF(u)+"^2 touches the axis at \\(x = "+u+"\\) but it is still only one distinct intercept; together with \\(x = "+v+"\\) there are 2 distinct x-intercepts.":"The cubed factor gives a single distinct x-intercept, \\(x = "+u+"\\), where the graph flattens and crosses."))+" The count is <b>"+fcnt+"</b>.",
      {feat:feat,shape:shape});
  }
  var a3=pick([2,3,-2,-3]),p=ri(-5,5),qq=ri(-5,5),rr=ri(-5,5),t3=0;
  while((p===0||qq===0||rr===0||p===qq||p===rr||qq===rr)&&t3<80){p=ri(-5,5);qq=ri(-5,5);rr=ri(-5,5);t3++;}
  var P=p*qq*rr,Y=-a3*P,S=p+qq+rr,vals=[Y,a3*P,-P,S],guard=0;
  while(new Set(vals).size<4&&guard<80){p=ri(-5,5);qq=ri(-5,5);rr=ri(-5,5);
    if(!(p===0||qq===0||rr===0||p===qq||p===rr||qq===rr)){P=p*qq*rr;Y=-a3*P;S=p+qq+rr;vals=[Y,a3*P,-P,S];}guard++;}
  return mcq("What is the <b>y-intercept</b> of \\(f(x) = "+(a3<0?"-":"")+Math.abs(a3)+linF(p)+linF(qq)+linF(rr)+"\\)?",
    ""+Y,[""+(a3*P),""+(-P),""+S],
    "Set \\(x = 0\\): each factor becomes the negative of its root, so \\(f(0) = "+a3+" \\times ("+(-p)+") \\times ("+(-qq)+") \\times ("+(-rr)+") = "+Y+"\\). Three negative factors give a negative product before the leading coefficient is applied. The y-intercept is <b>"+Y+"</b>.",
    {feat:"yint",Y:Y});
});
E("u2-match-equation-graph",2,["3.19"],2,"gen",function(){
  var r1=ri(-4,4),r2=ri(-4,4),r3=ri(-4,4),t=0;
  while((r1===0||r2===0||r3===0||r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-4,4);r2=ri(-4,4);r3=ri(-4,4);t++;}
  var a=pick([1,-1]);
  var fn=function(x){return a*(x-r1)*(x-r2)*(x-r3);};
  var eq=function(aa,s1,s2,s3){return "f(x) = "+(aa<0?"-":"")+linF(s1)+linF(s2)+linF(s3);};
  var q=mcq("Which equation matches the graphed polynomial function?",
    eq(a,r1,r2,r3),
    [eq(-a,r1,r2,r3),eq(a,-r1,r2,r3),eq(a,r1,-r2,r3)],
    "Read the graph: the x-intercepts are \\(x = "+r1+"\\), \\(x = "+r2+"\\) and \\(x = "+r3+"\\), giving the factors "+linF(r1)+", "+linF(r2)+" and "+linF(r3)+". The ends run "+(a>0?"from Quadrant III to Quadrant I, so the leading coefficient is positive":"from Quadrant II to Quadrant IV, so the leading coefficient is negative")+". Only the correct option matches all three intercepts and the end behaviour.",
    {r1:r1,r2:r2,r3:r3,a:a});
  var ys=[];for(var gx=-5.5;gx<=5.5;gx+=0.25)ys.push(fn(gx));
  var mx=Math.max.apply(null,ys.map(Math.abs));mx=Math.min(Math.max(mx,10),80);
  q.figure=plotSVG(fn,-5.5,5.5,-mx,mx);
  return q;
});
E("u2-match-by-characteristics",2,["3.19"],2,"gen",function(){
  var c=pick([-6,-4,-2,2,3,5]),p=ri(1,5),target=pick(["odd+","odd-","even+","even-"]);
  function build(kind){
    if(kind==="odd+")return "f(x) = x^3 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    if(kind==="odd-")return "f(x) = -x^3 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    if(kind==="even+")return "f(x) = x^2 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    return "f(x) = -x^2 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
  }
  var names={"odd+":"Quadrant III to Quadrant I","odd-":"Quadrant II to Quadrant IV","even+":"Quadrant II to Quadrant I","even-":"Quadrant III to Quadrant IV"};
  var others=["odd+","odd-","even+","even-"].filter(function(k){return k!==target;}).map(build);
  return mcq("Which polynomial function extends from <b>"+names[target]+"</b> and has a <b>constant term of "+c+"</b>?",
    build(target),others,
    "All four options share the constant term "+c+", so the decision comes from the end behaviour: "+names[target]+" needs "+(target.indexOf("odd")===0?"an odd degree":"an even degree")+" with a "+(target==="odd+"||target==="even+"?"positive":"negative")+" leading coefficient. That is <b>"+build(target)+"</b>.",
    {target:target,c:c});
});
E("u2-scatter-type",2,["3.20"],2,"gen",function(){
  var type=pick(["linear","quadratic","cubic"]),pts=[],xs=[];
  if(type==="linear"){var m=pick([2,3]),b0=ri(-2,4);for(var x=0;x<=5;x++){var y=m*x+b0+((x===2||x===4)?pick([-1,1]):0);xs.push(x);pts.push([x,y]);}}
  else if(type==="quadratic"){var h=ri(1,2);for(var x=-2;x<=3;x++){var y=(x-h)*(x-h)-2+((x===0)?1:0);xs.push(x);pts.push([x,y]);}}
  else{for(var x=-2;x<=2;x++){xs.push(x);pts.push([x,x*x*x]);}}
  var ys=pts.map(function(p){return p[1];});
  var y0=Math.min.apply(null,ys)-2,y1=Math.max.apply(null,ys)+2;
  var q=mcq("Data collected in an experiment are shown in the table and the scatter plot. "+tblHTML(xs,ys,"\\(x\\)","\\(y\\)")+" Which type of polynomial function <b>best fits</b> the data?",
    type==="linear"?"Linear":(type==="quadratic"?"Quadratic":"Cubic"),
    ["Linear","Quadratic","Cubic"].filter(function(v){return v!==(type==="linear"?"Linear":(type==="quadratic"?"Quadratic":"Cubic"));}).concat(["Constant"]),
    (type==="linear"?"The points follow a steady upward trend with roughly equal steps, the signature of a linear fit.":(type==="quadratic"?"The points fall and then rise in a single smooth U-turn (a parabola shape), the signature of a quadratic fit.":"The points sweep from low to high with an S-shaped flattening in the middle, the signature of a cubic fit."))+" The best fit is <b>"+(type==="linear"?"linear":(type==="quadratic"?"quadratic":"cubic"))+"</b>.",
    {type:type});
  q.figure=plotSVG(null,Math.min.apply(null,xs)-1,Math.max.apply(null,xs)+1,y0,y1,{nocurve:true,points:pts});
  return q;
});
E("u2-fit-value",2,["3.20"],2,"gen",function(){
  var kind=pick(["quadratic","cubic"]),xs=[0,1,2,3,4],fn,ask=5;
  if(kind==="quadratic"){var a=ri(1,3),b=ri(-3,4),c=ri(1,8);fn=function(x){return a*x*x+b*x+c;};}
  else{var b2=ri(-2,2),c2=ri(0,5),d2=ri(1,7);fn=function(x){return x*x*x+b2*x*x+c2*x+d2;};}
  var ys=xs.map(fn);
  return numq("A data set is modelled by a polynomial function. "+tblHTML(xs,ys,"\\(x\\)","\\(y\\)")+" Following the pattern of the data, what is the value of \\(y\\) when \\(x = "+ask+"\\)?",
    fn(ask),0.001,
    "Look at the differences: "+ys.join(", ")+" has first differences "+(function(){var d=[];for(var i=1;i<ys.length;i++)d.push(ys[i]-ys[i-1]);return d.join(", ");})()+". "+(kind==="quadratic"?"The second differences are constant, confirming a quadratic pattern; extending the differences gives the next value.":"The third differences are constant, confirming a cubic pattern; extending the differences gives the next value.")+" When \\(x = "+ask+"\\), <b>\\(y = "+fn(ask)+"\\)</b>.",
    {kind:kind,ans:fn(ask)});
});
E("u2-graph-characteristics",2,["3.17"],1,"gen",function(){
  var feat=pick(["yint","xint","range"]);
  if(feat==="range"){
    var s=pick([1,-1]),h=ri(-2,2),k=pick([-4,-2,2,3,5]);
    var fn=function(x){return s*(x-h)*(x-h)+k;};
    var corr=(s>0)?("y \\ge "+k):("y \\le "+k);
    var q=mcq("What is the <b>range</b> of the polynomial function shown?",
      "\\(\\{y \\mid "+corr+", \\ y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid y \\ge "+(-k)+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid "+(s>0?("y \\le "+k):("y \\ge "+k))+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y \\in \\mathbb{R}\\}\\)"],
      "The vertex of the parabola is at \\(y = "+k+"\\) and the graph "+(s>0?"opens upward, so every value from "+k+" upward occurs":"opens downward, so every value from "+k+" downward occurs")+". The range is <b>\\(\\{y \\mid "+corr+"\\}\\)</b>.",{feat:feat,k:k});
    q.figure=plotSVG(fn,-6,6,-10,14);return q;
  }
  if(feat==="xint"){
    var r1=ri(-4,4),r2=ri(-4,4),t=0;
    while((r1===r2)&&t<40){r2=ri(-4,4);t++;}
    var a=pick([1,-1]),fn2=function(x){return a*(x-r1)*(x-r2)*(x+2);};
    var roots=[r1,r2,-2];var distinct=new Set(roots).size;
    var q2=mcq("How many <b>x-intercepts</b> does the graphed polynomial function have?",
      ""+distinct,["0","1","2","3"].filter(function(v){return v!==""+distinct;}),
      "Count where the curve crosses the x-axis: it crosses at "+distinct+" distinct point"+(distinct===1?"":"s")+", so there are <b>"+distinct+" x-intercepts</b>.",{feat:feat,distinct:distinct});
    q2.figure=plotSVG(fn2,-6,6,-30,30);return q2;
  }
  var k3=pick([-6,-3,2,4,6]),a3=pick([1,-1]),h3=ri(-2,1),Y3,vals3,g3=0;
  do{k3=pick([-6,-3,2,4,6]);a3=pick([1,-1]);h3=ri(-2,1);Y3=a3*h3*h3+k3;vals3=[Y3,k3,-Y3,a3*(h3+1)*(h3+1)+k3];g3++;}
  while(new Set(vals3).size<4&&g3<60);
  var fn3=function(x){return a3*(x-h3)*(x-h3)+k3;};
  var q3=mcq("What is the <b>y-intercept</b> of the graphed polynomial function?",
    ""+Y3,[""+k3,""+(-Y3),""+(a3*(h3+1)*(h3+1)+k3)],
    "The y-intercept is where the curve crosses the y-axis, at \\(x = 0\\). Reading the graph there gives <b>"+Y3+"</b>. (The vertex value "+k3+" is the distractor: it is read at the turning point, not at the y-axis.)",{feat:feat});
  q3.figure=plotSVG(fn3,-6,6,-10,14);return q3;
});
E("u2-sketch-match",2,["3.17"],1,"gen",function(){
  var s=pick([1,-1]),h=pick([-1,0,0,1]),u=(h===0?pick([1,1.25,1.5]):1),k=pick([-6,-4,-2,0,3,5,7]);
  var fn=function(x){var t=x-h;return s*(t*t*t-3*u*u*t)+k;};
  var Y=fn(0);
  var lc=(s>0)?"positive":"negative";
  var corr="Degree 3, "+lc+" leading coefficient, 2 turning points, y-intercept "+fmt(Y);
  var q=mcq("Which list of characteristics matches the graphed polynomial function?",
    corr,
    ["Degree 3, "+(s>0?"negative":"positive")+" leading coefficient, 2 turning points, y-intercept "+fmt(Y),
     "Degree 2, "+lc+" leading coefficient, 1 turning point, y-intercept "+fmt(Y),
     "Degree 3, "+lc+" leading coefficient, 0 turning points, y-intercept "+fmt(-Y)],
    "The graph has the S-shape and two direction changes of a cubic, its ends run "+(s>0?"from Quadrant III to Quadrant I (positive leading coefficient)":"from Quadrant II to Quadrant IV (negative leading coefficient)")+", and it crosses the y-axis at "+fmt(Y)+". The matching list is: <b>"+corr+"</b>.",{s:s,k:k,h:h});
  q.figure=plotSVG(fn,-4.5,4.5,-20,20);return q;
});
E("u2-interpret-model",2,["3.21"],2,"var",varset([
  function(){return numq("An open-top box is made by cutting squares of side \\(x\\) cm from the corners of a 20 cm by 14 cm sheet and folding up the sides. The volume is modelled by \\(V(x) = x(20 - 2x)(14 - 2x)\\). What is the volume, in cm\\(^3\\), when squares of side 2 cm are cut?",
    320,1,
    "Substitute \\(x = 2\\): \\[ \\begin{aligned} V(2) &= 2(20 - 4)(14 - 4) \\\\ &= 2 \\times 16 \\times 10 \\\\ &= 320 \\end{aligned} \\] The volume is <b>320 cm\\(^3\\)</b>. The three factors are the height and the two reduced inside dimensions.",{});},
  function(){return mcq("A food truck's monthly profit, in dollars, is modelled by \\(P(x) = -2x^3 + 30x^2 - 4500\\), where \\(x\\) is the number of months since opening. What does the value \\(P(0) = -4500\\) represent?",
    "The truck started $4500 in the hole (start-up costs) before any monthly profit was made",
    ["The truck loses $4500 every month because the profit falls by that amount each month","The truck breaks even after 4500 months of operation, when its profit reaches zero","The profit in the first month was $4500, earned during the first month after opening"],
    "At \\(x = 0\\) no time has passed, so the value is the starting position: negative because of the initial costs. It is a one-time starting value, not a monthly rate.",{});},
  function(){return numq("The population of a town, in hundreds of people, \\(t\\) years after 2015 is modelled by \\(P(t) = 0.02t^3 - 0.3t^2 + 2t + 48\\). According to the model, how many <b>people</b> live in the town in 2025?",
    5800,1,
    "2025 is \\(t = 10\\): \\[ \\begin{aligned} P(10) &= 0.02(1000) - 0.3(100) + 2(10) + 48 \\\\ &= 20 - 30 + 20 + 48 \\\\ &= 58 \\end{aligned} \\] That is 58 hundred people, which is <b>5800 people</b>.",{});}
]));
E("u2-reverse-intercepts",2,["3.18"],3,"gen",function(){
  var r1=ri(-5,5),r2=ri(-5,5),r3=ri(-5,5),t=0;
  while((r1===0||r2===0||r3===0||r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-5,5);r2=ri(-5,5);r3=ri(-5,5);t++;}
  var a=pick([1,2,-1,-2]),Y=a*(-r1)*(-r2)*(-r3);
  var x0=pick([-3,-1,2,3,4]);while(x0===r1||x0===r2||x0===r3)x0=pick([-3,-1,2,3,4]);
  var fv=a*(x0-r1)*(x0-r2)*(x0-r3);
  return numq("A cubic function has x-intercepts "+r1+", "+r2+" and "+r3+", and a y-intercept of "+Y+". What is the value of the function at \\(x = "+x0+"\\)?",
    fv,0.001,
    "The intercepts give \\(f(x) = a"+linF(r1)+linF(r2)+linF(r3)+"\\). Use the y-intercept to solve for \\(a\\): \\[ \\begin{aligned} f(0) &= a("+(-r1)+")("+(-r2)+")("+(-r3)+") \\\\ "+(a*(-r1)*(-r2)*(-r3)/a)+"a &= "+Y+" \\\\ a &= "+a+" \\end{aligned} \\] Then \\(f("+x0+") = "+a+"("+ (x0-r1) +")("+(x0-r2)+")("+(x0-r3)+") = "+fv+"\\). The value is <b>"+fv+"</b>.",
    {r1:r1,r2:r2,r3:r3,a:a,x0:x0});
});
E("u2-model-decision",2,["3.22"],3,"var",varset([
  function(){return mcq("Weekly attendance at a new arena, in hundreds, was recorded over five weeks. "+tblHTML([0,1,2,3,4],[5,8,17,38,77],"Week","Attendance")+" Which statement best describes a polynomial model for the data, and the predicted attendance in week 5?",
    "A cubic model fits; predicted attendance is 140 (hundreds)",
    ["A quadratic model fits; predicted attendance is 80 (hundreds)","A linear model fits; predicted attendance is 95 (hundreds)","A cubic model fits; predicted attendance is 131 (hundreds)"],
    "First differences: 3, 9, 21, 39. Second differences: 6, 12, 18. Third differences: 6, 6, constant, so a cubic fits. Extending the pattern (next third difference 6, next second difference 24, next first difference 63) gives 77 + 63 = 140.",{});},
  function(){return mcq("A food truck records its weekly profit, in dollars, over five weeks. "+tblHTML([0,1,2,3,4],[5,15,21,23,21],"Week","Profit ($)")+" Which statement best describes a polynomial model for the data, and the predicted profit in week 5?",
    "A quadratic model fits; predicted profit is $15",
    ["A linear model fits; predicted profit is $25","A cubic model fits; predicted profit is $11","A quadratic model fits; predicted profit is $19"],
    "First differences: 10, 6, 2, -2. Second differences: -4, -4, -4, constant, so a quadratic fits (the rise-then-fall shape agrees). Extending: next first difference -6, so week 5 profit is 21 - 6 = 15 dollars.",{});},
  function(){return mcq("A rumour spreads through a school. The number of students who have heard it by each day is recorded. "+tblHTML([0,1,2,3,4],[3,5,9,17,33],"Day","Students")+" Which statement best describes modelling this data with a polynomial function?",
    "No low-degree polynomial fits well: the first differences (2, 4, 8, 16) keep doubling, which is exponential behaviour, not polynomial",
    ["A cubic model fits the data exactly, because the third differences settle to a constant value as the count keeps growing each day","A quadratic model fits the data exactly, because the second differences settle to a constant value as the count keeps growing each day","A linear model fits the data exactly, because the first differences settle to a constant value and the count grows evenly each day"],
    "For a polynomial fit, some level of differences must settle to a constant. Here the differences double each step (2, 4, 8, 16), and the second and third differences grow too. That doubling pattern is the signature of exponential growth, so a polynomial is the wrong family.",{});}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 3 CR entries (3 and 2 marks) and two Level 2 CR entries (3 and 2 marks). The unit had a single Level 3 CR entry and an all-2-mark Level 2 pool. ---------- */
function u2lead(a){ return a===1?"x^3":a===-1?"-x^3":a+"x^3"; }
function u2tm(v,p){ if(v===0) return ""; var m=Math.abs(v); var core=p? (m===1? p : m+p) : ""+m; return (v>0?" + ":" - ")+core; }
function u2polyLead(lead,b,c,d){ return lead+u2tm(b,"x^2")+u2tm(c,"x")+u2tm(d,""); }
E("u2-recover-and-predict-cr",2,["3.20","3.22"],3,"gen",function(){
  var a=pick([2,3,-2,-3]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6), x0=pick([2,3]);
  var t=pick([1,4,-1,5]); if(t===x0) t=t+2;
  function P(x){ return a*x*x*x + b*x*x + c*x + d; }
  var v0=P(x0), rest=b*x0*x0 + c*x0 + d, cube=x0*x0*x0, ans=P(t);
  return numq("A cubic model is given by \\(f(x) = "+u2polyLead("ax^3",b,c,d)+"\\), where \\(a\\) is a constant. The model satisfies \\(f("+x0+") = "+v0+"\\). Determine \\(f("+t+")\\).",
    ans,0.001,
    "Substitute \\(x = "+x0+"\\): \\("+cube+"a + ("+rest+") = "+v0+"\\), so \\("+cube+"a = "+(v0-rest)+" = "+(a*cube)+"\\), giving \\(a = "+a+"\\). The model is \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\). Evaluating at \\(x = "+t+"\\): \\(f("+t+") = "+a+"("+t+")^3"+u2tm(b,"("+t+")^2")+u2tm(c,"("+t+")")+u2tm(d,"")+" = \\)<b>"+ans+"</b>.",
    {a:a,x0:x0,t:t});
});
E("u2-correct-the-claim-cr",2,["3.17"],3,"var",varset([
  function(){
    var a=pick([-1,-2]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6);
    return mcq("A student looks at the cubic \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\) and claims that as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\) as well. Which statement correctly describes the end behaviour of \\(f\\)?",
      "As \\(x \\to -\\infty\\), \\(f(x) \\to \\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to -\\infty\\)",
      ["As \\(x \\to -\\infty\\), \\(f(x) \\to -\\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\)",
       "Both ends of the graph rise without bound",
       "Both ends of the graph fall without bound"],
      "The degree is odd and the leading coefficient is negative, so the two ends go in opposite directions: the left end rises and the right end falls. The student described the end behaviour of a cubic with a positive leading coefficient.",
      {sc:"end-behaviour"});
  },
  function(){
    var r=pick([1,2,3]), s=pick([-3,-2,-1,4]);
    var fs=linF(r)+"^2"+linF(s);
    return mcq("A student looks at the cubic \\(f(x) = "+fs+"\\) and claims that the graph crosses the x-axis at \\(x = "+r+"\\). Which statement is correct?",
      "The graph touches the x-axis at \\(x = "+r+"\\) and turns around, because that zero has multiplicity 2",
      ["The graph crosses the x-axis at \\(x = "+r+"\\), as the student says",
       "The graph touches the x-axis at \\(x = "+s+"\\) and turns around",
       "The graph crosses the x-axis at \\(x = "+r+"\\) and flattens there"],
      "The factor "+linF(r)+" appears squared, so the zero at \\(x = "+r+"\\) has multiplicity 2, an even multiplicity: the graph touches the axis there and turns around rather than crossing. The zero at \\(x = "+s+"\\) has multiplicity 1, so the graph crosses there.",
      {sc:"multiplicity"});
  },
  function(){
    var a=pick([1,2,-1,-2]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6);
    return mcq("A student looks at the cubic \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\) and claims that its graph has three turning points. Which statement is correct?",
      "A cubic function has at most two turning points",
      ["A cubic function always has exactly two turning points",
       "A cubic function has exactly three turning points, as the student says",
       "A cubic function can have any number of turning points"],
      "The derivative of a cubic is a quadratic, which has at most two zeros, so a cubic graph has at most two turning points. (Some cubics, such as \\(y = x^3\\), have none, so exactly two is not guaranteed either.)",
      {sc:"turning-points"});
  }
]));
E("u2-zeros-and-intercept-cr",2,["3.18"],2,"gen",function(){
  var roots=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3).sort(function(x,y){return x-y;});
  var a=pick([1,2]);
  var Y=-a*roots[0]*roots[1]*roots[2];
  var neg=roots.map(function(r){return -r;}).sort(function(x,y){return x-y;});
  function opt(rs,y){ return "Zeros: "+rs.join(", ")+"; y-intercept: "+y; }
  var fs=(a===1?"":a)+roots.map(function(r){return linF(r);}).join("");
  return mcq("What are the zeros and the y-intercept of \\(f(x) = "+fs+"\\)?",
    opt(roots,Y),
    [opt(neg,Y), opt(roots,-Y), opt(neg,-Y)],
    "Each factor is zero at one of the zeros, so the zeros are "+roots.join(", ")+". The y-intercept is \\(f(0) = "+(a===1?"":a+" \\times ")+"("+(-roots[0])+")("+(-roots[1])+")("+(-roots[2])+") = "+Y+"\\). Watch the signs: the constant in each factor is the opposite of the zero.",
    {roots:roots,a:a});
});
E("u2-model-change-cr",2,["3.21"],2,"gen",function(){
  var CTX=[
    {name:"The value, in dollars, of a collectible card", unit:"years after it was purchased", v:"V"},
    {name:"The volume, in litres, of water in a tank", unit:"minutes after it starts filling", v:"V"},
    {name:"The height, in centimetres, of a sunflower", unit:"weeks after it was planted", v:"H"}
  ];
  var cx=pick(CTX), a=pick([1,2]), b=ri(0,3), c=ri(2,9), d=ri(30,300);
  function P(x){ return a*x*x*x + b*x*x + c*x + d; }
  var t1=ri(1,3), t2=t1+ri(2,3), ans=P(t2)-P(t1);
  return numq(cx.name+" is modelled by \\("+cx.v+"(t) = "+u2polyLead(u2lead(a),b,c,d)+"\\), where \\(t\\) is the number of "+cx.unit+". Determine the change in the quantity from \\(t = "+t1+"\\) to \\(t = "+t2+"\\).",
    ans,0.001,
    "Evaluate the model at both times: \\("+cx.v+"("+t2+") = "+P(t2)+"\\) and \\("+cx.v+"("+t1+") = "+P(t1)+"\\). The change is \\("+P(t2)+" - "+P(t1)+" = \\)<b>"+ans+"</b>.",
    {a:a,t1:t1,t2:t2});
});
