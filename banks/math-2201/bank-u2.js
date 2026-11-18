// Math 2201 Unit 2: Quadratic Functions question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1283 to 1362).
// CRMARKS: u2-vertex-x=1
// CRMARKS: u2-vertex-value=2
// CRMARKS: u2-axis-from-intercepts=1
// CRMARKS: u2-xintercepts=2
// CRMARKS: u2-xintercepts-factored=1
// CRMARKS: u2-factored-coeffs=2
// CRMARKS: u2-eq-from-vertex=2
// CRMARKS: u2-max-context=2
// CRMARKS: u2-max-product=2
// CRMARKS: u2-perimeter-max-area=2
// CRMARKS: u2-profit-max=2
// CRMARKS: u2-revenue-max-price=3
// CRMARKS: u2-min-cost=2
// CRMARKS: u2-xintercepts-vertex-form=2
// CRMARKS: u2-other-intercept=2
// CRMARKS: u2-c-from-point=2
// CRMARKS: u2-vertex-from-factored=2
// CRMARKS: u2-vertex-fraction-y=3
// CRMARKS: u2-vertex-from-two-points=2
// CRMARKS: u2-vertex-given-axis=2
// CRMARKS: u2-vertex-given-axis-factored=2
// CRMARKS: u2-vertex-x-fraction=2
// CRMARKS: u2-find-b-given-axis=2
// CRMARKS: u2-axis-factored-num=1
// CRMARKS: u2-mirror-intercept=2
// CRMARKS: u2-standard-to-vertex-k=2
// CRMARKS: u2-vertex-to-standard-c=1
// CRMARKS: u2-a-from-intercepts-point=3
/* ============ Unit 2: Quadratic Functions ============ */
function quadStr(a,b,c){var s=(a===1?"":a===-1?"\u2212":""+a)+"x\u00B2";if(b!==0)s+=" "+(b>0?"+":"\u2212")+" "+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=" "+(c>0?"+":"\u2212")+" "+Math.abs(c);return s;}
function quadB(a,b,c){var s=(a===1?"":a===-1?"-":""+a)+"x^2";if(b!==0)s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=(c>0?" + ":" - ")+Math.abs(c);return s;}
function quadT(a,b,c){return "\\("+quadB(a,b,c)+"\\)";}
function fracT(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";}
function frB(n,d){function g2(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=x%y;x=y;y=t;}return x||1;}var g=g2(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}if(d===1)return ""+n;return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}";}
function vertB(a,h,k){var s=(a===1?"":a===-1?"-":""+a)+(h===0?"x^2":"(x "+(h>0?"- "+h:"+ "+(-h))+")^2");if(k>0)s+=" + "+k;else if(k<0)s+=" - "+(-k);return s;}
function vertT(a,h,k){return "\\(y = "+vertB(a,h,k)+"\\)";}
function factB(a,r1,r2){function f(r){return r===0?"x":(r>0?"(x - "+r+")":"(x + "+(-r)+")");}return (a===1?"":a===-1?"-":""+a)+f(r1)+f(r2);}
function factT(a,r1,r2){return "\\(y = "+factB(a,r1,r2)+"\\)";}
E("u2-vertex-x",2,["4.12"],1,"var",varset([
  function(){
  var a=pick([1,1,2,-1]),h=ri(-5,6)||2;var b=-2*a*h;var c=a*h*h+ri(-6,6);
  return numq("What is the x-coordinate of the vertex of \\(y = "+quadB(a,b,c)+"\\)?",
    h,0.011,"Axis of symmetry: \\(x = \\frac{-b}{2a} = \\frac{-("+b+")}{"+(2*a)+"} = \\)<b>\\("+h+"\\)</b>. The vertex sits on the axis of symmetry.",{a:a,b:b,c:c});
},
  function(){
  var a=pick([1,1,2,-1]),h=ri(-5,6)||2;var b=-2*a*h;var c=a*h*h+ri(-6,6);
  var kv=c-a*h*h;
  var qfig=numq("The graph shows a parabola with its vertex marked. What is the x-coordinate of the vertex?",
    h,0.011,"The marked point is the vertex, \\(("+h+", "+kv+")\\). The x-coordinate of the vertex is <b>\\("+h+"\\)</b>.",{a:a,b:b,c:c});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:kv}]});
  return qfig;
}
]));
E("u2-vertex-value",2,["4.11"],2,"var",varset([
  function(){
  var a=pick([1,2,-1]),h=ri(-4,5),k=ri(-8,12);var b=-2*a*h,c=a*h*h+k;
  return numq("Find the "+(a>0?"minimum":"maximum")+" value of \\(y = "+quadB(a,b,c)+"\\)"+".",
    k,0.011,"The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\). Substituting: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>. Since \\(a "+(a>0?">":"<")+" 0\\), the parabola opens "+(a>0?"up and this is a minimum.":"down and this is a maximum."),{a:a,h:h,k:k});
},
  function(){
  var a=pick([1,2,-1]),h=ri(-4,5),k=ri(-8,12);var b=-2*a*h,c=a*h*h+k;
  var qfig=numq("The graph shows a parabola with its vertex marked. Find the "+(a>0?"minimum":"maximum")+" value of the function.",
    k,0.011,"The marked point is the vertex, \\(("+h+", "+k+")\\). Since the parabola opens "+(a>0?"up, the vertex is its lowest point, so the minimum value is the y-coordinate of the vertex":"down, the vertex is its highest point, so the maximum value is the y-coordinate of the vertex")+": <b>\\("+k+"\\)</b>.",{a:a,h:h,k:k});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return qfig;
}
]));
E("u2-axis-from-intercepts",2,["4.13"],1,"gen",function(){
  var p=ri(-10,-1),q=ri(1,10);var mid=(p+q)/2;
  var frame=pick([
    "A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number).",
    "The graph of a parabola crosses the x-axis at \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number)."]);
  var qfig=numq(frame,mid,0.011,"The axis of symmetry passes midway between the intercepts: \\(x = \\frac{"+p+" + "+q+"}{2} = \\)<b>\\("+fmt(mid)+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,-(p+q),p*q,{marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-xintercepts",2,["4.4"],2,"var",varset([
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=false;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
},
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var qfig=numq("The graph shows a parabola with its x-intercepts marked. What is the larger x-intercept?",
    q,0.011,"The marked intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
}
]));
E("u2-xintercepts-factored",2,["4.4"],1,"var",varset([
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=true;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
},
  function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var qfig=numq("The parabola shown in the graph crosses the x-axis at the marked points. What is the larger x-intercept?",
    q,0.011,"The marked intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
  qfig.figure=parSVG(1,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
}
]));
E("u2-factored-coeffs",2,["4.5"],1,"gen",function(){
  var p=ri(-7,-2),q=ri(2,7);var askB=Math.random()<0.5;
  return numq("A quadratic function has zeros \\("+p+"\\) and \\("+q+"\\), so its equation can be written \\(y = (x - ("+p+"))(x - ("+q+"))\\). Expanded into the form \\(y = x^2 + bx + c\\), what is the value of \\("+(askB?"b":"c")+"\\)?",
    askB?-(p+q):p*q,0.011,"Expanding: \\((x - ("+p+"))(x - ("+q+")) = x^2 - ("+(p+q)+")x + ("+(p*q)+")\\), so \\(b = "+(-(p+q))+"\\) and \\(c = "+(p*q)+"\\). The asked coefficient is <b>\\("+(askB?-(p+q):p*q)+"\\)</b>.",{p:p,q:q,askB:askB});
});
E("u2-domain-range",2,["4.1"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,10);
  var correct=a>0?"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)";
  var q=mcq("A quadratic function has vertex \\(("+h+", "+k+")\\) and opens "+(a>0?"upward":"downward")+". What are its domain and range?",correct,
    [a>0?"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers","Domain: \\(x \\geq "+h+"\\); Range: \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"],
    "Every quadratic has domain all real numbers. The vertex is the turning point: opening "+(a>0?"up, the smallest \\(y\\) is the vertex's y-value \\("+k+"\\)":"down, the largest \\(y\\) is \\("+k+"\\)")+", so the range is \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"+".",{a:a,h:h,k:k});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k}]});
  return q;
});
E("u2-vertex-form-params",2,["4.15"],1,"var",varset([
  figArm(function(){return mcq("In \\(y = (x - 3)^2 + 5\\), what is the vertex?",
    "\\((3, 5)\\) — the graph of \\(y = x^2\\) shifted right \\(3\\) and up \\(5\\)",
    ["\\((-3, 5)\\) — the graph of \\(y = x^2\\) shifted left \\(3\\) and up \\(5\\)","\\((3, -5)\\) — shifted right \\(3\\) and down \\(5\\) from the origin","\\((5, 3)\\) — the numbers swap places, so the vertical shift comes first"],
    "Vertex form \\(y = a(x - h)^2 + k\\) has vertex \\((h, k)\\). The minus sign in \\((x - 3)\\) means \\(h = +3\\).",{});},figVPParams1),
  figArm(function(){return mcq("What does the value of \\(a\\) do in \\(y = a(x - h)^2 + k\\)?",
    "If \\(|a| > 1\\) the parabola narrows; if \\(a < 0\\) it opens downward",
    ["It moves the vertex left or right, changing where the parabola is centred","It moves the vertex up or down, raising the whole parabola","It changes only the y-intercept, leaving the shape of the parabola untouched"],
    "\\(h\\) shifts sideways, \\(k\\) shifts vertically, and \\(a\\) controls opening direction and width — the 'stretch' of the parabola.",{});},figVPParams2),
  figArm(function(){return mcq("The graph of \\(y = x^2\\) is shifted left \\(4\\) and down \\(2\\). What is its equation?",
    "\\(y = (x + 4)^2 - 2\\)",
    ["\\(y = (x - 4)^2 + 2\\)","\\(y = (x + 4)^2 + 2\\)","\\(y = (x - 4)^2 - 2\\)"],
    "Left \\(4\\) means \\(h = -4\\), written \\((x - (-4)) = (x + 4)\\); down \\(2\\) means \\(k = -2\\).",{});},figVPParams3)
]));
E("u2-eq-from-vertex",2,["4.16"],2,"gen",function(){
  var h=ri(-4,4),k=ri(-5,5),a=pick([1,2,3,-1]);var dx=pick([1,2]);var px=h+dx,py=a*dx*dx+k;
  var q=numq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through \\(("+px+", "+py+")\\). Using \\(y = a(x - h)^2 + k\\), find the value of \\(a\\).",
    a,0.011,"Substitute the point: \\[\\begin{aligned} "+py+" &= a("+px+" - ("+h+"))^2 + ("+k+") \\\\ &= "+(dx*dx)+"a + ("+k+") \\\\ a &= \\frac{"+py+" - ("+k+")}{"+(dx*dx)+"} = "+a+" \\end{aligned}\\]",{h:h,k:k,a:a});
  q.figure=parSVG(a,-2*a*h,a*h*h+k,{marks:[{x:h,y:k},{x:px,y:py}]});
  return q;
});
E("u2-max-context",2,["4.2"],2,"gen",function(){
  var v=pick([10,20,30,40,50,60,70]),h0=pick([0,2,5,8,10,12,15,20,25,30]);
  var thing=pick(["A ball is thrown upward","A firework shell is launched upward","A water jet from a fountain arcs upward"]);
  var tmax=v/10,hmax=-5*tmax*tmax+v*tmax+h0;
  var q=numq(thing+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t"+(h0?" + "+h0:"")+"\\) metres. What is the maximum height it reaches, in metres?",
    hmax,0.11,"The maximum is at the vertex: \\(t = \\frac{-b}{2a} = \\frac{-"+v+"}{-10} = "+fmt(tmax,1)+"\\) s. Then \\(h("+fmt(tmax,1)+") = -5("+fmt(tmax*tmax,2)+") + "+v+"("+fmt(tmax,1)+") + "+h0+" = \\)<b>\\("+fmt(hmax,1)+"\\text{ m}\\)</b>.",{v:v,h0:h0});
  q.figure=trajSVG(-5,v,h0);
  return q;
});

/* ============ Expansion (November 18, 2026) ============
   Bank expansion programme, Unit 2 pass: 54 new indicator templates
   and 6 new prior knowledge templates, authored new (new question
   shapes, contexts and solution paths, not re-skins of the entries
   above). Before this pass the unit held 39 templates (31 indicator,
   8 PK); several indicators rested on one or two templates (4.11,
   4.12 and 4.14 on one each), so repeated draws across a unit
   re-dealt the same shapes with new numbers. Depth targets follow
   the November 17, 2026 Unit 1 enrichment: every indicator pool at
   least 6, the unit at 99 templates in all. A small line figure
   builder for the PK graph items comes first. */
function u2pkLineSVG(o){
  o=o||{};
  var W=300,H=238,mL=36,mR=12,mT=12,mB=26,iw=W-mL-mR,ih=H-mT-mB;
  var xs=[-2,2],ys=[-2,2];
  if(o.pts)o.pts.forEach(function(p){xs.push(p[0]);ys.push(p[1]);});
  if(o.seg){xs.push(o.seg[0][0],o.seg[1][0]);ys.push(o.seg[0][1],o.seg[1][1]);}
  var mm=null,bb=0;
  if(o.line){mm=o.line[0]/o.line[1];bb=o.line[2];xs.push(-7,7);ys.push(mm*-7+bb,mm*7+bb);}
  var x0=Math.floor(Math.min.apply(null,xs)-1),x1=Math.ceil(Math.max.apply(null,xs)+1);
  var y0=Math.floor(Math.min.apply(null,ys)-1),y1=Math.ceil(Math.max.apply(null,ys)+1);
  if(x1-x0<6){x0-=2;x1+=2;}
  if(y1-y0<6){y0-=2;y1+=2;}
  function X(x){return mL+(x-x0)/(x1-x0)*iw;}
  function Y(y){return mT+(y1-y)/(y1-y0)*ih;}
  function stepFor(s){return s<=13?1:(s<=32?2:5);}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Graph")+'">';
  var sx=stepFor(x1-x0),sy=stepFor(y1-y0),g;
  for(g=Math.ceil(x0/sx)*sx;g<=x1+1e-9;g+=sx){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+fmt(X(g),1)+'" y1="'+mT+'" x2="'+fmt(X(g),1)+'" y2="'+(mT+ih)+'" stroke="#d8e2dc" stroke-width="1"/>';
    out+=_txt(X(g),mT+ih+13,_parNum(g),10.5,false);
  }
  for(g=Math.ceil(y0/sy)*sy;g<=y1+1e-9;g+=sy){
    if(Math.abs(g)<1e-9)continue;
    out+='<line x1="'+mL+'" y1="'+fmt(Y(g),1)+'" x2="'+(mL+iw)+'" y2="'+fmt(Y(g),1)+'" stroke="#d8e2dc" stroke-width="1"/>';
    out+=_txt(mL-5,Y(g),_parNum(g),10.5,false,"end");
  }
  var yAx=(y0<0&&y1>0)?Y(0):(mT+ih),xAx=(x0<0&&x1>0)?X(0):mL;
  out+='<line x1="'+mL+'" y1="'+fmt(yAx,1)+'" x2="'+(mL+iw)+'" y2="'+fmt(yAx,1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="'+fmt(xAx,1)+'" y1="'+mT+'" x2="'+fmt(xAx,1)+'" y2="'+(mT+ih)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  if(mm!==null){
    var d="",pen=false,i,x,y;
    for(i=0;i<=60;i++){x=x0+(x1-x0)*i/60;y=mm*x+bb;if(y<y0||y>y1){pen=false;continue;}d+=(pen?"L":"M")+fmt(X(x),1)+" "+fmt(Y(y),1);pen=true;}
    out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  }
  if(o.seg)out+='<line x1="'+fmt(X(o.seg[0][0]),1)+'" y1="'+fmt(Y(o.seg[0][1]),1)+'" x2="'+fmt(X(o.seg[1][0]),1)+'" y2="'+fmt(Y(o.seg[1][1]),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  if(o.pts)o.pts.forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="'+FIG_INK+'"/>';});
  (o.marks||[]).forEach(function(mk){out+='<circle cx="'+fmt(X(mk[0]),1)+'" cy="'+fmt(Y(mk[1]),1)+'" r="4" fill="'+FIG_ACC+'" stroke="#ffffff" stroke-width="1.2"/>';});
  if(o.xLab)out+=_txt(mL+iw,H-4,o.xLab,12,false,"end");
  return out+'</svg>';
}
/* --- 4.1: domain and range --- */
E("u2-dr-from-graph",2,["4.1"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while(k===h&&tries<40){k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  var q=mcq("The graph shows a quadratic function with its vertex marked. What are the domain and range of the function?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers",
     "Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+h+"\\)"],
    "The domain of every quadratic function is all real numbers. The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(up?"up, so the smallest value of \\(y\\) is \\("+k+"\\)":"down, so the largest value of \\(y\\) is \\("+k+"\\)")+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-dr-vertex-form",2,["4.1"],2,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-5,5),k=ri(-7,9),tries=0;
  while((k===h||k===0)&&tries<40){k=ri(-7,9);tries++;}
  var up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  return mcq("What are the domain and range of the function "+vertT(a,h,k)+"?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers",
     "Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+h+"\\)"],
    "Vertex form shows the vertex directly: \\(("+h+", "+k+")\\). The domain of a quadratic function is all real numbers. Since \\(a = "+a+"\\) is "+(up?"positive, the parabola opens up and the least value of \\(y\\) is the vertex's y-coordinate":"negative, the parabola opens down and the greatest value of \\(y\\) is the vertex's y-coordinate")+", \\("+k+"\\)"+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>.",
    {a:a,h:h,k:k});
});
E("u2-dr-standard-form",2,["4.1"],2,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while((h===0||k===h)&&tries<40){h=ri(-4,4);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  var key="Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)";
  return mcq("What are the domain and range of \\(y = "+quadB(a,b,c)+"\\)?",
    key,
    ["Domain: all real numbers; Range: \\(y "+(up?"\\geq":"\\leq")+" "+c+"\\)",
     "Domain: all real numbers; Range: \\(y "+(up?"\\leq":"\\geq")+" "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers"],
    "The domain of a quadratic function is all real numbers. The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\), and substituting gives \\(y = "+k+"\\), so the vertex is \\(("+h+", "+k+")\\). The parabola opens "+(up?"up, so \\("+k+"\\) is the least value of \\(y\\)":"down, so \\("+k+"\\) is the greatest value of \\(y\\)")+". The <b>range is \\(y "+(up?"\\geq":"\\leq")+" "+k+"\\)</b>. (The value \\("+c+"\\) is the y-intercept, not the range boundary.)",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-domain-context",2,["4.1"],2,"gen",function(){
  var v=pick([10,15,20,25,30]),T=v/5,H=v*v/20;
  var ctx=pick(["A ball is kicked into the air","A stone is thrown into the air","A flare is fired into the air"]);
  return mcq(ctx+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\) metres, until it lands. What is the domain of this function in this situation?",
    "\\(0 \\leq t \\leq "+T+"\\)",
    ["\\(0 \\leq h \\leq "+H+"\\)","\\(-"+T+" \\leq t \\leq "+T+"\\)","\\(0 \\leq t \\leq "+(2*T)+"\\)"],
    "Time in this situation starts at the kick, \\(t = 0\\), and ends when the height returns to zero: \\(-5t^2 + "+v+"t = 0\\) gives \\(t = "+T+"\\) (besides \\(t = 0\\)). So the <b>domain is \\(0 \\leq t \\leq "+T+"\\)</b>. The statement about \\(h\\) describes heights (the range), not times, and negative times do not occur.",
    {v:v,T:T,H:H});
});
E("u2-range-context-mc",2,["4.1"],2,"gen",function(){
  var v=pick([10,20,30]),H=v*v/20,T=v/5;
  var ctx=pick(["A ball is kicked into the air","A model rocket is launched from the ground","A water jet arcs from a fountain at ground level"]);
  return mcq(ctx+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t\\) metres. Which statement gives the range of the height function during the flight?",
    "\\(0 \\leq h \\leq "+H+"\\)",
    ["\\(0 \\leq t \\leq "+T+"\\)","\\(0 \\leq h \\leq "+(2*H)+"\\)","\\(-"+H+" \\leq h \\leq "+H+"\\)"],
    "During the flight the height starts at \\(0\\), rises to its greatest value at the vertex, and returns to \\(0\\). The vertex is at \\(t = \\frac{"+v+"}{10} = "+fmt(T/2,1)+"\\), where \\(h = "+H+"\\) m. So the heights taken are exactly <b>\\(0 \\leq h \\leq "+H+"\\)</b>. The statement \\(0 \\leq t \\leq "+T+"\\) is the domain, not the range, and heights below \\(0\\) would be underground.",
    {v:v,H:H,T:T});
});
/* --- 4.2: contextual problems --- */
E("u2-max-product",2,["4.2"],2,"gen",function(){
  var S=pick([12,16,20,24,28,32,36,40]),half=S/2,prod=half*half,mode=ri(0,1);
  return numq("Two numbers add to \\("+S+"\\)"+". What is "+(mode===0?"the greatest possible product of the two numbers":"the value of each number when their product is greatest")+"?",
    mode===0?prod:half,0.011,
    "Let one number be \\(x\\); the other is \\("+S+" - x\\), so the product is \\(P(x) = x("+S+" - x) = -x^2 + "+S+"x\\). The vertex of this downward parabola is at \\(x = \\frac{"+S+"}{2} = "+half+"\\), where the other number is also \\("+S+" - "+half+" = "+half+"\\). The greatest product is \\("+half+" \\times "+half+" = \\)<b>\\("+prod+"\\)</b>"+(mode===1?"; it occurs when each number is <b>\\("+half+"\\)</b>":"")+".",
    {S:S,half:half,prod:prod,mode:mode});
});
E("u2-perimeter-max-area",2,["4.2"],2,"gen",function(){
  var side=ri(4,15),P=4*side,area=side*side,mode=ri(0,1);
  var ctx=pick(["rectangular garden","rectangular dog pen","rectangular vegetable plot","rectangular patio"]);
  return numq("A "+ctx+" is enclosed with \\("+P+"\\) m of fencing, with fencing on all four sides. "+(mode===0?"What is the greatest area that can be enclosed, in \\(\\text{m}^2\\)?":"How long is each side when the enclosed area is greatest, in m?"),
    mode===0?area:side,0.011,
    "Let one side be \\(x\\) m. The perimeter gives the other side as \\(\\frac{"+P+"}{2} - x = "+(P/2)+" - x\\) m, so the area is \\(A(x) = x("+(P/2)+" - x)\\), a downward parabola with vertex at \\(x = \\frac{"+(P/2)+"}{2} = "+side+"\\) m. The other side is then also \\("+(P/2)+" - "+side+" = "+side+"\\) m: the plot is a square. The greatest area is \\("+side+" \\times "+side+" = \\)<b>\\("+area+"\\text{ m}^2\\)</b>"+(mode===1?"; each side is <b>\\("+side+"\\) m</b>":"")+".",
    {P:P,side:side,area:area,mode:mode});
});
E("u2-profit-max",2,["4.2"],2,"gen",function(){
  var a=pick([1,2,3]),xv=ri(10,40),c0=pick([100,300,500,800,1200]),tries=0;
  while(a*xv*xv<=c0&&tries<40){xv=ri(10,40);tries++;}
  var b=2*a*xv,pmax=a*xv*xv-c0,mode=ri(0,1);
  var ctx=pick(["A bakery sells x cakes per day","A workshop sells x chairs per week","A farm stand sells x baskets of apples per day"]);
  return numq(ctx+". Its profit is \\(P(x) = -"+(a===1?"":a)+"x^2 + "+b+"x - "+c0+"\\) dollars. "+(mode===0?"What is the greatest profit, in dollars?":"How many are sold when the profit is greatest?"),
    mode===0?pmax:xv,0.011,
    "The profit parabola opens downward, so its greatest value is at the vertex: \\(x = \\frac{-b}{2a} = \\frac{-"+b+"}{"+(-2*a)+"} = "+xv+"\\)"+". Substituting: \\(P("+xv+") = -"+(a===1?"":a)+"("+xv+")^2 + "+b+" \\times "+xv+" - "+c0+" = \\)<b>\\($"+pmax+"\\)</b>"+(mode===1?", reached when <b>\\("+xv+"\\)</b> are sold":"")+".",
    {a:a,xv:xv,b:b,c0:c0,pmax:pmax,mode:mode});
});
E("u2-revenue-max-price",2,["4.2"],3,"gen",function(){
  var s=pick([5,10,20]),P=pick([4,5,6,8,10]),xs=pick([3,4,5,6,7,8,9,10,12,15]);
  var N=s*(2*xs+P),price=P+xs;
  var ctx=pick([["candle","candles"],["concert ticket","concert tickets"],["smoothie","smoothies"],["bus pass","bus passes"]]);
  return numq("A shop sells \\("+N+"\\) "+ctx[1]+" a week at $"+P+" per "+ctx[0]+". For every $1 increase in the price, \\("+s+"\\) fewer "+ctx[1]+" are sold. What price gives the greatest weekly revenue, in dollars?",
    price,0.011,
    "Let \\(x\\) be the number of $1 increases. The price is \\("+P+" + x\\) dollars and the number sold is \\("+N+" - "+s+"x\\), so revenue is \\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\). Expanding, \\(R(x) = -"+s+"x^2 + "+(N-s*P)+"x + "+(N*P)+"\\)"+", whose vertex is at \\(x = \\frac{"+(N-s*P)+"}{"+(2*s)+"} = "+xs+"\\)"+". The best number of increases is \\("+xs+"\\), so the price is \\("+P+" + "+xs+" = \\)<b>\\($"+price+"\\)</b>.",
    {s:s,P:P,xs:xs,N:N,price:price});
});
E("u2-min-cost",2,["4.2"],2,"gen",function(){
  var a=pick([1,2]),xv=ri(6,25),b=2*a*xv,cmin=pick([150,200,250,300,400,500,600,750,900,1200]);
  var c=cmin+a*xv*xv,mode=ri(0,1);
  var ctx=pick([["A ferry company","trips per day"],["A bakery","batches per day"],["A courier company","delivery runs per day"]]);
  return numq(ctx[0]+" models its daily cost as \\(C(x) = "+(a===1?"":a)+"x^2 - "+b+"x + "+c+"\\) dollars, where \\(x\\) is the number of "+ctx[1]+". "+(mode===0?"What is the least possible daily cost, in dollars?":"How many "+ctx[1].split(" per day")[0]+" give the least daily cost?"),
    mode===0?cmin:xv,0.011,
    "The cost parabola opens upward, so its least value is at the vertex: \\(x = \\frac{-b}{2a} = \\frac{"+b+"}{"+(2*a)+"} = "+xv+"\\)"+". Substituting: \\(C("+xv+") = "+(a===1?"":a)+"("+xv+")^2 - "+b+" \\times "+xv+" + "+c+" = \\)<b>\\($"+cmin+"\\)</b>"+(mode===1?", reached at <b>\\("+xv+"\\)</b> "+ctx[1]:"")+".",
    {a:a,xv:xv,b:b,c:c,cmin:cmin,mode:mode});
});
/* --- 4.4: intercepts --- */
E("u2-intercepts-read-graph",2,["4.4"],1,"gen",function(){
  var p=ri(-8,-1),q=ri(1,8),a=pick([1,-1]);
  var b=-a*(p+q),c=a*p*q;
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. What are the x-intercepts?",
    "\\(x = "+p+"\\) and \\(x = "+q+"\\)",
    ["\\(x = "+(-p)+"\\) and \\(x = "+(-q)+"\\)",
     "\\(x = "+p+"\\) and \\(x = "+(-q)+"\\)",
     "\\(x = "+(-p)+"\\) and \\(x = "+q+"\\)"],
    "Read the marked points where the graph crosses the x-axis: <b>\\(x = "+p+"\\) and \\(x = "+q+"\\)</b>. Watch the signs: the intercept on the left of the origin is negative.",
    {p:p,q:q,a:a});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-xintercepts-vertex-form",2,["4.4"],2,"gen",function(){
  var a=pick([1,2]),d=ri(2,6),h=ri(-5,5),k=-a*d*d,larger=Math.random()<0.5;
  var ans=larger?h+d:h-d;
  return numq("Find the "+(larger?"larger":"smaller")+" x-intercept of \\(y = "+vertB(a,h,k)+"\\)"+".",
    ans,0.011,
    "Set \\(y = 0\\): \\("+a+"(x - ("+h+"))^2 "+(k>0?"+ "+k:"- "+(-k))+" = 0\\) gives \\((x - ("+h+"))^2 = "+(d*d)+"\\)"+", so \\(x - ("+h+") = \\pm "+d+"\\) and the intercepts are \\(x = "+(h-d)+"\\) and \\(x = "+(h+d)+"\\)"+". The "+(larger?"larger":"smaller")+" is <b>\\("+ans+"\\)</b>.",
    {a:a,d:d,h:h,k:k,ans:ans});
});
E("u2-y-intercept-point",2,["4.4"],1,"gen",function(){
  var a=ri(-4,4),b=ri(-9,9),c=ri(-11,11),tries=0;
  while((a===0||c===0||b===c||a+b+c===c||a+b+c===b)&&tries<60){a=ri(-4,4);b=ri(-9,9);c=ri(-11,11);tries++;}
  return mcq("At which point does the graph of \\(y = "+quadB(a,b,c)+"\\) cross the y-axis?",
    "\\((0, "+c+")\\)",
    ["\\(("+c+", 0)\\)","\\((0, "+b+")\\)","\\((0, "+(a+b+c)+")\\)"],
    "A graph crosses the y-axis where \\(x = 0\\). Substituting \\(x = 0\\) leaves \\(y = "+c+"\\), so the crossing point is <b>\\((0, "+c+")\\)</b>. (The value \\("+(a+b+c)+"\\) is \\(f(1)\\), the value of the function at \\(x = 1\\).)",
    {a:a,b:b,c:c});
});
E("u2-intercepts-set",2,["4.4"],2,"gen",function(){
  var p=ri(-7,-1),q=ri(1,7),a=pick([1,2,-1]);
  var b=-a*(p+q),c=a*p*q;
  function stmt(x1,x2,yi){return "x-intercepts \\("+x1+"\\) and \\("+x2+"\\); y-intercept \\("+yi+"\\)";}
  return mcq("What are the intercepts of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(p,q,c),
    [stmt(-p,-q,c),stmt(p,q,-c),stmt(-p,q,c)],
    "The function factors as \\(y = "+factB(a,p,q)+"\\)"+", so it crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+". At \\(x = 0\\), \\(y = "+a+" \\times ("+(-p)+") \\times ("+(-q)+") = "+c+"\\)"+". The intercepts are <b>"+stmt(p,q,c)+"</b>.",
    {p:p,q:q,a:a,b:b,c:c});
});
E("u2-other-intercept",2,["4.4"],2,"gen",function(){
  var h=ri(-5,5),d=ri(2,7),side=Math.random()<0.5?1:-1,a=pick([1,-1]);
  var x1=h+side*d,x2=h-side*d,b=-2*a*h,c=a*(h*h-d*d);
  var q=numq("The graph shows a parabola with one x-intercept marked. The dashed line is its axis of symmetry, \\(x = "+h+"\\)"+". What is the other x-intercept?",
    x2,0.011,
    "The two x-intercepts sit at equal distances on either side of the axis of symmetry. The marked intercept \\("+x1+"\\) is \\("+d+"\\) units from the axis \\(x = "+h+"\\)"+", so the other intercept is \\("+d+"\\) units on the other side: \\("+h+" "+(x2>h?"+":"-")+" "+d+" = \\)<b>\\("+x2+"\\)</b>.",
    {h:h,d:d,x1:x1,x2:x2,a:a});
  q.figure=parSVG(a,b,c,{labels:"values",vline:h,marks:[{x:x1,y:0}]});
  return q;
});
/* --- 4.5: factored form from the zeros --- */
E("u2-factored-with-a",2,["4.5"],2,"gen",function(){
  var a=pick([2,3,-2,-3]),r1=ri(-6,-1),r2=ri(1,6);
  return mcq("A quadratic function has zeros \\("+r1+"\\) and \\("+r2+"\\) and leading coefficient \\("+a+"\\)"+". Which function is it, in factored form?",
    factT(a,r1,r2),
    [factT(1,r1,r2),factT(a,-r1,r2),factT(a,r1,-r2)],
    "Each zero \\(r\\) gives a factor \\((x - r)\\), and the leading coefficient multiplies the whole product: <b>"+factT(a,r1,r2)+"</b>. Dropping the \\("+a+"\\) would change every value of the function, and flipping a sign inside a factor moves that zero to its opposite.",
    {a:a,r1:r1,r2:r2});
});
E("u2-factored-from-graph",2,["4.5"],2,"gen",function(){
  var a=pick([1,-1]),p=ri(-7,-1),q=ri(1,7);
  var b=-a*(p+q),c=a*p*q;
  var ds=a===1?[factT(1,-p,-q),factT(-1,p,q),factT(2,p,q)]:[factT(-1,-p,-q),factT(1,p,q),factT(-1,p,-q)];
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. Which function, in factored form, has this graph?",
    factT(a,p,q),ds,
    "The graph crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+", so the factors are \\((x - ("+p+"))\\) and \\((x - ("+q+"))\\)"+". The parabola opens "+(a>0?"upward, so the leading coefficient is positive":"downward, so the leading coefficient is negative")+". The function is <b>"+factT(a,p,q)+"</b>.",
    {a:a,p:p,q:q});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-factored-double-root",2,["4.5"],1,"gen",function(){
  var r=ri(-6,6),a=pick([1,2,-1]),tries=0;
  while(r===0&&tries<40){r=ri(-6,6);tries++;}
  function fsF(rr){return "(x "+(rr>0?"- "+rr:"+ "+(-rr))+")";}
  return mcq("A quadratic function has a single zero at \\(x = "+r+"\\) (its graph touches the x-axis there and turns around). Which function is it, in factored form?",
    "\\(y = "+vertB(a,r,0)+"\\)",
    ["\\(y = "+vertB(a,-r,0)+"\\)",
     "\\(y = "+factB(a,r,-r)+"\\)",
     "\\(y = "+(a===1?"":a===-1?"-":a)+fsF(r)+"\\)"],
    "A single (repeated) zero means the same factor appears twice: the factor from the zero \\("+r+"\\) is \\("+fsF(r)+"\\)"+", squared. The function is <b>\\(y = "+vertB(a,r,0)+"\\)</b>. The product \\("+factB(a,r,-r)+"\\) would have two different zeros, \\("+r+"\\) and \\("+(-r)+"\\)"+".",
    {a:a,r:r});
});
E("u2-standard-to-factored",2,["4.5"],2,"gen",function(){
  var p=ri(-8,-1),q=ri(1,8),b=-(p+q),c=p*q;
  var cand=[factT(1,-p,-q),factT(1,-p,q),factT(1,p,-q),"\\(y = (x "+(b>0?"+ "+b:"- "+(-b))+")(x "+(c>0?"+ "+c:"- "+(-c))+")\\)"];
  var key=factT(1,p,q),ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Which function is the factored form of \\(y = "+quadB(1,b,c)+"\\)?",
    key,ds,
    "Work backwards from the zeros: a factored form \\((x - m)(x - n)\\) expands to \\(x^2 - (m + n)x + mn\\)"+". Matching \\(mn = "+c+"\\) and \\(m + n = "+(-b)+"\\) gives \\(m = "+p+"\\) and \\(n = "+q+"\\)"+", so the factored form is <b>"+key+"</b>. (Equivalently, the two numbers that multiply to \\("+c+"\\) and add to \\("+b+"\\) are \\("+(-p)+"\\) and \\("+(-q)+"\\)"+", written as the factors \\((x + ("+(-p)+"))\\) and \\((x + ("+(-q)+"))\\)"+"; the two writings are the same.)",
    {p:p,q:q,b:b,c:c});
});
E("u2-zeros-from-factored",2,["4.5"],1,"gen",function(){
  var a=pick([2,3,-2]),r1=ri(-6,-1),r2=ri(1,6);
  function zs(x,y){return "\\(x = "+x+"\\) and \\(x = "+y+"\\)";}
  return mcq("What are the zeros of \\(f(x) = "+factB(a,r1,r2)+"\\)?",
    zs(r1,r2),
    [zs(-r1,-r2),zs(-r1,r2),zs(r1,-r2)],
    "A zero is where a factor equals zero. The factor \\((x - ("+r1+"))\\) is zero at \\(x = "+r1+"\\) and the factor \\((x - ("+r2+"))\\) is zero at \\(x = "+r2+"\\)"+". The leading coefficient \\("+a+"\\) does not move the zeros. The zeros are <b>"+zs(r1,r2)+"</b>.",
    {a:a,r1:r1,r2:r2});
});
/* --- 4.10: characteristics through a, b, c --- */
E("u2-effect-of-c",2,["4.10"],1,"gen",function(){
  var b=pick([0,2,-3,4]),c1=ri(-6,6),d=pick([2,3,4,5]),up=Math.random()<0.5;
  var c2=up?c1+d:c1-d;
  function stmt(dir,amt){return "The second graph is the first graph shifted "+dir+" by "+amt+" units";}
  return mcq("How does the graph of \\(y = "+quadB(1,b,c2)+"\\) compare with the graph of \\(y = "+quadB(1,b,c1)+"\\)?",
    stmt(up?"up":"down",d),
    [stmt(up?"down":"up",d),stmt("left",d),stmt("right",d)],
    "The two functions differ only in the constant term: \\("+c2+" - ("+c1+") = "+(c2-c1)+"\\)"+". Changing the constant term moves the whole graph straight "+(up?"up":"down")+" by that amount, with no change to its shape or its axis. The second graph is <b>shifted "+(up?"up":"down")+" by "+d+" units</b>.",
    {b:b,c1:c1,c2:c2,d:d,up:up});
});
E("u2-effect-of-a",2,["4.10"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var m=pick([2,3,4]);
    return mcq("Which statement compares the graph of \\(y = "+m+"x^2\\) with the graph of \\(y = x^2\\)?",
      "It is narrower, with the same vertex and the same opening direction",
      ["It is wider, with the same vertex and the same opening direction",
       "It opens downward instead of upward, with the same vertex",
       "It has the same width, but its vertex is higher"],
      "Multiplying by \\("+m+" > 1\\) makes every value of \\(y\\) larger in size, so the arms rise faster and the graph is <b>narrower</b>. The vertex stays at the origin and the graph still opens upward.",
      {mode:mode,m:m});
  }
  if(mode===1){
    var fr=pick(["\\frac{1}{2}","\\frac{1}{4}"]);
    return mcq("Which statement compares the graph of \\(y = "+fr+"x^2\\) with the graph of \\(y = x^2\\)?",
      "It is wider, with the same vertex and the same opening direction",
      ["It is narrower, with the same vertex and the same opening direction",
       "It opens downward instead of upward, with the same vertex",
       "It has the same width, but its vertex is lower"],
      "Multiplying by a positive number between \\(0\\) and \\(1\\) makes every value of \\(y\\) smaller in size, so the arms rise more slowly and the graph is <b>wider</b>. The vertex stays at the origin and the graph still opens upward.",
      {mode:mode,fr:fr});
  }
  return mcq("Which statement compares the graph of \\(y = -x^2\\) with the graph of \\(y = x^2\\)?",
    "It opens downward instead of upward, a reflection in the x-axis",
    ["It is wider, with the same vertex and the same opening direction",
     "It is narrower, with the same vertex and the same opening direction",
     "It has the same width and opening, but its vertex is lower"],
    "The negative sign flips the sign of every value of \\(y\\), so the graph is <b>reflected in the x-axis</b>: it opens downward instead of upward, with the same vertex and the same width.",
    {mode:mode});
});
E("u2-signs-from-graph",2,["4.10"],2,"gen",function(){
  var sa=pick([1,-1]),hv=pick([-3,-2,-1,1,2,3]),sc=pick([1,-1]);
  var a=sa,c=sc*ri(2,9),h=hv,k=c-a*h*h,b=-2*a*h;
  function sg(v){return v>0?"> 0":"< 0";}
  function stmt(x,y,z){return "\\(a "+sg(x)+"\\), \\(b "+sg(y)+"\\), \\(c "+sg(z)+"\\)";}
  var q=mcq("The graph of \\(y = ax^2 + bx + c\\) is shown, with its vertex marked. Which statement gives the signs of \\(a\\), \\(b\\) and \\(c\\)?",
    stmt(a,b,c),
    [stmt(-a,b,c),stmt(a,-b,c),stmt(a,b,-c)],
    "The parabola opens "+(a>0?"upward, so \\(a > 0\\)":"downward, so \\(a < 0\\)")+". It crosses the y-axis "+(c>0?"above":"below")+" the origin, so \\(c "+sg(c)+"\\)"+". The vertex is on the "+(h>0?"right":"left")+" of the y-axis, so the axis \\(x = \\frac{-b}{2a} = "+h+"\\) is "+(h>0?"positive":"negative")+"; with \\(a "+sg(a)+"\\) that forces \\(b "+sg(b)+"\\)"+". The signs are <b>"+stmt(a,b,c)+"</b>.",
    {a:a,b:b,c:c,h:h,k:k});
  q.figure=parSVG(a,b,c,{marks:[{x:h,y:k}]});
  return q;
});
E("u2-c-from-point",2,["4.10"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),b=ri(-9,9),x0=ri(-4,4),c=ri(-12,12),tries=0;
  while((x0===0||c===0)&&tries<40){x0=ri(-4,4);c=ri(-12,12);tries++;}
  var y0=a*x0*x0+b*x0+c;
  return numq("The graph of \\(y = "+quadB(a,b,0)+" + c\\) passes through the point \\(("+x0+", "+y0+")\\)"+". What is the value of \\(c\\)?",
    c,0.011,
    "Substitute the point into the equation: \\[ \\begin{aligned} "+y0+" &= "+a+"("+x0+")^2 + ("+b+")("+x0+") + c \\\\ "+y0+" &= "+(a*x0*x0)+" + "+(b*x0)+" + c \\\\ c &= "+y0+" - "+(a*x0*x0+b*x0)+" = "+c+" \\end{aligned} \\] The value is <b>\\("+c+"\\)</b>.",
    {a:a,b:b,x0:x0,y0:y0,c:c});
});
E("u2-widest-graph",2,["4.10"],1,"gen",function(){
  var mags=shuffle([3,2,0.5,0.25]).slice();
  var signs=mags.map(function(){return Math.random()<0.5?-1:1;});
  function eqs(m,s){
    if(m===0.5)return "\\(y = "+(s<0?"-":"")+"\\frac{1}{2}x^2\\)";
    if(m===0.25)return "\\(y = "+(s<0?"-":"")+"\\frac{1}{4}x^2\\)";
    return "\\(y = "+(s*m)+"x^2\\)";
  }
  var keyI=mags.indexOf(0.25);
  var opts=mags.map(function(m,i){return eqs(m,signs[i]);});
  return mcq("Which function has the widest graph?",
    opts[keyI],
    opts.filter(function(_,i){return i!==keyI;}),
    "The width of a parabola is set by the size of the coefficient of \\(x^2\\): the smaller \\(|a|\\) is, the slower the arms rise and the wider the graph. Of the four, \\(|a| = \\frac{1}{4}\\) is the smallest, so <b>"+opts[keyI]+"</b> has the widest graph. The sign of \\(a\\) only chooses the opening direction.",
    {mags:mags,signs:signs});
});
/* --- 4.11: coordinates of the vertex --- */
E("u2-vertex-from-factored",2,["4.11"],2,"gen",function(){
  var a=pick([1,2,-1,-2]),r1=ri(-7,-1),gap=2*ri(2,5),r2=r1+gap;
  var mid=(r1+r2)/2,yv=-a*(gap/2)*(gap/2);
  return numq("What is the y-coordinate of the vertex of \\(y = "+factB(a,r1,r2)+"\\)?",
    yv,0.011,
    "The vertex sits on the axis of symmetry, midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+": \\(x = \\frac{"+r1+" + "+r2+"}{2} = "+mid+"\\)"+". Substituting: \\(y = "+a+"("+mid+" - ("+r1+"))("+mid+" - ("+r2+")) = "+a+" \\times "+(mid-r1)+" \\times "+(mid-r2)+" = \\)<b>\\("+yv+"\\)</b>.",
    {a:a,r1:r1,r2:r2,mid:mid,yv:yv});
});
E("u2-vertex-from-table",2,["4.11"],2,"gen",function(){
  var h=ri(-3,3),k=ri(-7,9),a=pick([1,-1,2]),tries=0;
  while((h===0||k===0||k===h)&&tries<40){h=ri(-3,3);k=ri(-7,9);tries++;}
  var xs=[h-2,h-1,h,h+1,h+2],ys=xs.map(function(x){return a*(x-h)*(x-h)+k;});
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(h,k);
  var cand=[pt(-h,k),pt(h,-k),pt(k,h),pt(h+1,ys[3])],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return mcq("A quadratic function has the values in the table. "+tab+" What is the vertex of its graph?",
    key,ds,
    "The y-values fall and then rise (or rise and then fall) symmetrically: the values at equal distances left and right of \\(x = "+h+"\\) match ("+ys[0]+" and "+ys[4]+", "+ys[1]+" and "+ys[3]+"). The turning point is the middle value, at \\(x = "+h+"\\)"+". The vertex is <b>"+key+"</b>.",
    {h:h,k:k,a:a,xs:xs,ys:ys});
});
E("u2-vertex-interpret",2,["4.11"],1,"gen",function(){
  var vx=pick([8,10,12,15,20]),vy=pick([2400,3600,4200,5400,6000,7500]);
  return mcq("A shop's revenue is modelled by a quadratic function of \\(x\\), the number of $1 price increases. The vertex of the revenue graph is \\(("+vx+", "+vy+")\\)"+". What does the vertex tell the shop?",
    "Revenue is greatest, at $"+vy+", after "+vx+" price increases of $1",
    ["Revenue is greatest, at $"+vx+", after "+vy+" price increases of $1",
     "The shop sells "+vx+" items a day and earns $"+vy+" before any increase",
     "Costs are least, at $"+vy+", after "+vx+" price increases of $1"],
    "On the revenue graph, the first coordinate counts the price increases and the second is the revenue in dollars. The vertex is the highest point of the graph, so it says: <b>revenue is greatest, at $"+vy+", after "+vx+" price increases of $1</b>.",
    {vx:vx,vy:vy});
});
E("u2-vertex-graph-mc",2,["4.11"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-4,4),k=ri(-6,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-4,4);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  while((k===h||k===0)&&tries<80){k=ri(-6,9);c=a*h*h+k;tries++;}
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(h,k),cand=[pt(-h,k),pt(h,-k),pt(k,h)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var q=mcq("The graph shows a parabola with its vertex marked. What is the vertex?",
    key,ds,
    "Read the marked point's coordinates from the axes: across \\("+h+"\\), up \\("+k+"\\)"+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-vertex-fraction-y",2,["4.11"],3,"gen",function(){
  var b=pick([-9,-7,-5,-3,-1,1,3,5,7,9]),c=ri(-9,12);
  var yv=(4*c-b*b)/4;
  return numq("What is the y-coordinate of the vertex of \\(y = "+quadB(1,b,c)+"\\)? Give the exact value.",
    yv,0.011,
    "The vertex is at \\(x = \\frac{-b}{2} = \\frac{"+(-b)+"}{2} = "+frB(-b,2)+"\\)"+". Substituting: \\[ \\begin{aligned} y &= \\left("+frB(-b,2)+"\\right)^2 + ("+b+")\\left("+frB(-b,2)+"\\right) + ("+c+") \\\\ &= \\frac{"+(b*b)+"}{4} - \\frac{"+(b*b)+"}{2} + "+c+" \\\\ &= "+frB(4*c-b*b,4)+" \\end{aligned} \\] The y-coordinate is <b>\\("+frB(4*c-b*b,4)+"\\)</b>.",
    {b:b,c:c,yv:yv});
});
E("u2-vertex-from-two-points",2,["4.11"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-4,4),k=ri(-6,10),d=pick([2,3]);
  var b=-2*a*h,c=a*h*h+k,x1=h-d,x2=h+d,y=a*d*d+k;
  return numq("The points \\(("+x1+", "+y+")\\) and \\(("+x2+", "+y+")\\) lie on the graph of \\(y = "+quadB(a,b,c)+"\\)"+". What is the y-coordinate of the vertex?",
    k,0.011,
    "The two points have the same y-coordinate, so they sit at the same height on the parabola, symmetrically about the axis. The axis is midway between them: \\(x = \\frac{"+x1+" + "+x2+"}{2} = "+h+"\\)"+". The vertex is on the axis, and substituting \\(x = "+h+"\\) gives \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b,c:c,h:h,k:k,x1:x1,x2:x2,y:y});
});
/* --- 4.12: vertex given the axis of symmetry --- */
E("u2-vertex-given-axis",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),d=pick([2,3,4]),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h,c=ri(-9,9),x0=h+d,y0=a*x0*x0+b*x0+c,k=a*h*h+b*h+c;
  var q=numq("A parabola has axis of symmetry \\(x = "+h+"\\) and passes through the point \\(("+x0+", "+y0+")\\)"+". Its equation is \\(y = "+quadB(a,b,0)+" + c\\)"+". What is the y-coordinate of its vertex?",
    k,0.011,
    "First find \\(c\\) from the given point: \\("+y0+" = "+a+"("+x0+")^2 + ("+b+")("+x0+") + c\\)"+", so \\(c = "+y0+" - ("+(a*x0*x0+b*x0)+") = "+c+"\\)"+". The vertex lies on the axis of symmetry, so its x-coordinate is \\("+h+"\\)"+". Its y-coordinate is the value there: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>.",
    {a:a,b:b,c:c,h:h,x0:x0,y0:y0,k:k});
  return q;
});
E("u2-vertex-given-axis-factored",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-5,5),d=pick([2,3,4]),r1=h-d,r2=h+d,yv=-a*d*d;
  return numq("A parabola with equation \\(y = "+factB(a,r1,r2)+"\\) has axis of symmetry \\(x = "+h+"\\)"+". What is the y-coordinate of its vertex?",
    yv,0.011,
    "The vertex is on the axis, at \\(x = "+h+"\\)"+". Substituting into the factored form: \\(y = "+a+"("+h+" - ("+r1+"))("+h+" - ("+r2+")) = "+a+" \\times "+(h-r1)+" \\times "+(h-r2)+" = \\)<b>\\("+yv+"\\)</b>. (Check: the axis \\(x = "+h+"\\) is midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+", as it must be.)",
    {a:a,h:h,r1:r1,r2:r2,yv:yv});
});
E("u2-axis-standard-mc",2,["4.12"],1,"gen",function(){
  var a=pick([1,2,3,-1]),h=ri(-6,6),c=ri(-9,9),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h;
  return mcq("What is the axis of symmetry of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+(-h)+"\\)","\\(x = "+b+"\\)","\\(x = "+(-b)+"\\)"],
    "The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+h+"\\)"+". The axis is <b>\\(x = "+h+"\\)</b>.",
    {a:a,b:b,c:c,h:h});
});
E("u2-vertex-x-fraction",2,["4.12"],2,"gen",function(){
  var a=2,b=pick([-10,-6,-2,2,6,10]),c=ri(-8,10);
  var hv=-b/(2*a);
  return numq("What is the x-coordinate of the vertex of \\(y = "+quadB(a,b,c)+"\\)? Give the exact value.",
    hv,0.011,
    "The vertex is on the axis of symmetry: \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+frB(-b,2*a)+"\\)"+". The x-coordinate is <b>\\("+frB(-b,2*a)+"\\)</b>.",
    {a:a,b:b,c:c,hv:hv});
});
E("u2-find-b-given-axis",2,["4.12"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),c=ri(-9,9),tries=0;
  while(h===0&&tries<40){h=ri(-6,6);tries++;}
  var b=-2*a*h;
  return numq("The graph of \\(y = "+(a===1?"":a===-1?"-":a)+"x^2 + bx + "+(c<0?"- "+(-c):"+ "+c)+"\\) has axis of symmetry \\(x = "+h+"\\)"+". What is the value of \\(b\\)?",
    b,0.011,
    "The axis of symmetry is \\(x = \\frac{-b}{2a}\\)"+". Setting \\(\\frac{-b}{"+(2*a)+"} = "+h+"\\) and solving: \\(-b = "+(2*a*h)+"\\)"+", so \\(b = \\)<b>\\("+b+"\\)</b>.",
    {a:a,h:h,c:c,b:b});
});
/* --- 4.13: axis of symmetry --- */
E("u2-axis-from-vertex-form",2,["4.13"],1,"gen",function(){
  var a=pick([1,2,-1,-2]),h=ri(-7,7),k=ri(-8,9),tries=0;
  while((h===0||k===h||k===-h)&&tries<40){h=ri(-7,7);k=ri(-8,9);tries++;}
  return mcq("What is the axis of symmetry of the graph of \\(y = "+vertB(a,h,k)+"\\)?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+k+"\\)","\\(x = "+(-h)+"\\)","\\(y = "+k+"\\)"],
    "In vertex form, the vertex is \\(("+h+", "+k+")\\)"+". The axis of symmetry is the vertical line through the vertex: <b>\\(x = "+h+"\\)</b>. (The value \\("+k+"\\) is the vertex's y-coordinate, not the axis.)",
    {a:a,h:h,k:k});
});
E("u2-axis-factored-num",2,["4.13"],1,"gen",function(){
  var r1=ri(-8,-1),gap=2*ri(1,5),r2=r1+gap,mid=(r1+r2)/2,a=pick([1,2,-1]);
  return numq("What is the axis of symmetry of the graph of \\(y = "+factB(a,r1,r2)+"\\)? Give its equation as \\(x = \\text{(a number)}\\) and enter the number.",
    mid,0.011,
    "The axis of symmetry passes midway between the zeros \\("+r1+"\\) and \\("+r2+"\\)"+": \\(x = \\frac{"+r1+" + "+r2+"}{2} = \\)<b>\\("+mid+"\\)</b>.",
    {r1:r1,r2:r2,mid:mid,a:a});
});
E("u2-mirror-intercept",2,["4.13"],2,"gen",function(){
  var h=ri(-5,5),d=ri(2,7),side=Math.random()<0.5?1:-1,a=pick([1,-1]);
  var x1=h+side*d,x2=h-side*d,b=-2*a*h,c=a*(h*h-d*d);
  var q=numq("The graph shows a parabola with one x-intercept marked and its axis of symmetry drawn. Using the symmetry of the graph, find the other x-intercept.",
    x2,0.011,
    "The axis of symmetry is \\(x = "+h+"\\)"+". The marked intercept \\("+x1+"\\) is \\("+d+"\\) units from the axis, so its mirror image, the other intercept, is \\("+d+"\\) units on the other side: \\("+h+" "+(x2>h?"+":"-")+" "+d+" = \\)<b>\\("+x2+"\\)</b>.",
    {h:h,d:d,x1:x1,x2:x2,a:a});
  q.figure=parSVG(a,b,c,{labels:"values",vline:h,marks:[{x:x1,y:0}]});
  return q;
});
E("u2-axis-from-graph",2,["4.13"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-5,5),k=ri(-6,9),tries=0;
  while((h===0||k===h||k===-h)&&tries<40){h=ri(-5,5);k=ri(-6,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var q=mcq("The graph shows a parabola with its vertex marked. What is the axis of symmetry?",
    "\\(x = "+h+"\\)",
    ["\\(x = "+k+"\\)","\\(y = "+k+"\\)","\\(x = "+(-h)+"\\)"],
    "The axis of symmetry is the vertical line through the vertex \\(("+h+", "+k+")\\)"+", so it is <b>\\(x = "+h+"\\)</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
/* --- 4.14: sketching by characteristics --- */
E("u2-match-graph-standard",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var specs=[
    {a:a,b:b,c:c},
    {a:-a,b:2*a*h,c:-a*h*h+k},
    {a:a,b:2*a*h,c:a*h*h+k},
    {a:a,b:-2*a*h,c:a*h*h-k}
  ];
  var order=shuffle([0,1,2,3]),letters=["A","B","C","D"];
  var panels=order.map(function(si,idx){var s=specs[si];return {a:s.a,b:s.b,c:s.c,caption:letters[idx],xrange:[-9,9],yrange:[-12,14]};});
  var keyLetter=letters[order.indexOf(0)];
  var q=mcq("Which graph shows \\(y = "+quadB(a,b,c)+"\\)?",
    keyLetter,letters.filter(function(L){return L!==keyLetter;}),
    "Work out the key features first: the vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\), \\(y = "+k+"\\)"+", so the vertex is \\(("+h+", "+k+")\\)"+"; the parabola opens "+(a>0?"upward":"downward")+" and the y-intercept is \\("+c+"\\)"+". Only one panel has that vertex, that opening and that y-intercept: panel <b>"+keyLetter+"</b>.",
    {a:a,b:b,c:c,h:h,k:k,keyLetter:keyLetter});
  q.figure=parPanelsSVG(panels);
  return q;
});
E("u2-graph-features",2,["4.14"],1,"gen",function(){
  var a=pick([1,-1,2,-2]),h=ri(-5,5),k=ri(-7,9),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-5,5);k=ri(-7,9);tries++;}
  var b=-2*a*h,c=a*h*h+k,up=a>0;
  function stmt(dir,vx,vy,ext){return "Opens "+dir+"; vertex \\(("+vx+", "+vy+")\\); "+ext+" value \\("+vy+"\\)";}
  return mcq("Which description matches the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(up?"up":"down",h,k,up?"minimum":"maximum"),
    [stmt(up?"down":"up",h,k,up?"minimum":"maximum"),
     stmt(up?"up":"down",-h,k,up?"minimum":"maximum"),
     stmt(up?"up":"down",h,-k,up?"maximum":"minimum")],
    "The sign of \\(a = "+a+"\\) says the parabola opens "+(up?"up":"down")+". The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\)"+", \\(y = "+k+"\\)"+", and a parabola that opens "+(up?"up has a minimum":"down has a maximum")+" there. The matching description is <b>"+stmt(up?"up":"down",h,k,up?"minimum":"maximum")+"</b>.",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-sketch-points",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=pick([-3,-2,-1,1,2,3]),d=pick([2,3]);
  var x1=h-d,x2=h+d,k=ri(-6,8),y=a*d*d+k,tries=0;
  while((y===0||k===0)&&tries<40){k=ri(-6,8);y=a*d*d+k;tries++;}
  var b=-2*a*h,c=a*h*h+k;
  function stmt(vx,vy,xa,xb,yy){return "Vertex \\(("+vx+", "+vy+")\\), passing through \\(("+xa+", "+yy+")\\) and \\(("+xb+", "+yy+")\\)";}
  var q=mcq("Which set of points would you plot to sketch the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    stmt(h,k,x1,x2,y),
    [stmt(-h,k,x1,x2,y),stmt(h,-k,x1,x2,y),stmt(h,k,x1,x2,-y)],
    "The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\)"+", \\(y = "+k+"\\)"+". Points at equal distances on either side of the axis share a y-value: at \\(x = "+x1+"\\) and \\(x = "+x2+"\\)"+", \\(y = "+y+"\\)"+". A sketch through <b>"+stmt(h,k,x1,x2,y)+"</b> has the right vertex and the right symmetry.",
    {a:a,b:b,c:c,h:h,k:k,x1:x1,x2:x2,y:y});
  return q;
});
E("u2-match-graph-vertex-form",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var specs=[
    {a:a,b:-2*a*h,c:a*h*h+k},
    {a:-a,b:2*a*h,c:-a*h*h+k},
    {a:a,b:2*a*h,c:a*h*h+k},
    {a:a,b:-2*a*h,c:a*h*h-k}
  ];
  var order=shuffle([0,1,2,3]),letters=["A","B","C","D"];
  var panels=order.map(function(si,idx){var s=specs[si];return {a:s.a,b:s.b,c:s.c,caption:letters[idx],xrange:[-9,9],yrange:[-12,14]};});
  var keyLetter=letters[order.indexOf(0)];
  var q=mcq("Which graph shows \\(y = "+vertB(a,h,k)+"\\)?",
    keyLetter,letters.filter(function(L){return L!==keyLetter;}),
    "Vertex form names the vertex directly: \\(("+h+", "+k+")\\)"+", and \\(a = "+a+"\\) says the parabola opens "+(a>0?"upward":"downward")+". Only one panel has that vertex and that opening: panel <b>"+keyLetter+"</b>.",
    {a:a,h:h,k:k,keyLetter:keyLetter});
  q.figure=parPanelsSVG(panels);
  return q;
});
E("u2-point-on-graph",2,["4.14"],1,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-4,4),k=ri(-7,9),b=-2*a*h,c=a*h*h+k;
  var x0=pick([-3,-2,-1,1,2,3]),y0=a*(x0-h)*(x0-h)+k,tries=0;
  while((y0===k||y0===0||y0===x0)&&tries<40){x0=pick([-3,-2,-1,1,2,3]);y0=a*(x0-h)*(x0-h)+k;tries++;}
  function pt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=pt(x0,y0),cand=[pt(x0,-y0),pt(-x0,y0),pt(y0,x0)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Which point lies on the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    key,ds,
    "Test each point by substituting its x-coordinate. At \\(x = "+x0+"\\)"+": \\(y = "+a+"("+x0+")^2 + ("+b+")("+x0+") + ("+c+") = "+y0+"\\)"+", so the point <b>"+key+"</b> lies on the graph. The other points fail the same test.",
    {a:a,b:b,c:c,x0:x0,y0:y0});
});
/* --- 4.15: vertex form from standard form and back --- */
E("u2-standard-to-vertex-k",2,["4.15"],2,"gen",function(){
  var a=pick([1,2,3,-1,-2]),h=ri(-6,6),k=ri(-9,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-6,6);k=ri(-9,9);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  return numq("When \\(y = "+quadB(a,b,c)+"\\) is written in vertex form \\(y = a(x - h)^2 + k\\), what is the value of \\(k\\)?",
    k,0.011,
    "The value of \\(k\\) is the y-coordinate of the vertex. The vertex is at \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+h+"\\)"+". Substituting: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>, so \\(k = "+k+"\\)"+". (Completing the square gives the same result: \\(y = "+vertB(a,h,k)+"\\)"+")",
    {a:a,b:b,c:c,h:h,k:k});
});
E("u2-vertex-to-standard-c",2,["4.15"],1,"gen",function(){
  var a=pick([1,2,-1,-2]),h=ri(-5,5),k=ri(-8,9),c=a*h*h+k,mid=-2*h;
  return numq("When \\(y = "+vertB(a,h,k)+"\\) is expanded into standard form \\(y = ax^2 + bx + c\\), what is the value of \\(c\\)?",
    c,0.011,
    "Expand: \\("+a+"(x - ("+h+"))^2 + ("+k+") = "+a+"(x^2 "+(mid>0?"+ "+mid+"x":mid<0?"- "+(-mid)+"x":"+ 0x")+" + "+(h*h)+") + ("+k+")\\)"+". The constant terms combine to \\("+a+" \\times "+(h*h)+" + ("+k+") = "+(a*h*h)+" + ("+k+") = \\)<b>\\("+c+"\\)</b>. (This is also the y-intercept: the value of the function at \\(x = 0\\).)",
    {a:a,h:h,k:k,c:c});
});
E("u2-vertex-form-from-graph",2,["4.15"],2,"gen",function(){
  var a=pick([1,-1]),h=ri(-4,4),k=ri(-6,8),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-4,4);k=ri(-6,8);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  var q=mcq("The graph shows a parabola with its vertex marked. Which function has this graph?",
    vertT(a,h,k),
    [vertT(a,-h,k),vertT(-a,h,k),vertT(a,h,-k)],
    "Read the vertex from the marked point: \\(("+h+", "+k+")\\)"+". The parabola opens "+(a>0?"upward, so \\(a\\) is positive":"downward, so \\(a\\) is negative")+". Vertex form with vertex \\(("+h+", "+k+")\\) is <b>"+vertT(a,h,k)+"</b>.",
    {a:a,h:h,k:k});
  q.figure=parSVG(a,b,c,{labels:"values",marks:[{x:h,y:k}]});
  return q;
});
E("u2-expand-vertex-form",2,["4.15"],2,"gen",function(){
  var a=pick([2,3,-2]),h=ri(-5,5),k=ri(-8,9),tries=0;
  while(h===0&&tries<40){h=ri(-5,5);tries++;}
  var b=-2*a*h,c=a*h*h+k;
  while((c===0||k===-c)&&tries<80){k=ri(-8,9);c=a*h*h+k;tries++;}
  var mid=-2*h;
  function std(bb,cc){return "\\(y = "+quadB(a,bb,cc)+"\\)";}
  return mcq("Which function is \\(y = "+vertB(a,h,k)+"\\) written in standard form?",
    std(b,c),
    [std(-b,c),std(b,k),std(b,-c)],
    "Expand the square: \\((x - ("+h+"))^2 = x^2 "+(mid>0?"+ "+mid+"x":"- "+(-mid)+"x")+" + "+(h*h)+"\\)"+". Multiply by \\("+a+"\\) and add \\("+k+"\\)"+": the middle coefficient is \\("+a+" \\times ("+mid+") = "+b+"\\) and the constant is \\("+a+" \\times "+(h*h)+" + ("+k+") = "+c+"\\)"+". The standard form is <b>"+std(b,c)+"</b>.",
    {a:a,h:h,k:k,b:b,c:c});
});
/* --- 4.16: equation from characteristics --- */
E("u2-a-from-intercepts-point",2,["4.16"],3,"gen",function(){
  var p=ri(-6,-1),q=ri(1,6),a=pick([1,2,3,-1,-2]),xp=pick([0,1,-1]),tries=0;
  while(((xp===p||xp===q)||(xp===0&&a*p*q===0))&&tries<40){xp=pick([0,1,-1,2,-2]);tries++;}
  var yp=a*(xp-p)*(xp-q);
  return numq("A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\) and passes through the point \\(("+xp+", "+yp+")\\)"+". Its equation has the form \\(y = a(x - ("+p+"))(x - ("+q+"))\\)"+". What is the value of \\(a\\)?",
    a,0.011,
    "Substitute the point into the form: \\("+yp+" = a("+xp+" - ("+p+"))("+xp+" - ("+q+")) = a \\times "+(xp-p)+" \\times "+(xp-q)+" = "+((xp-p)*(xp-q))+"a\\)"+". Dividing, \\(a = \\frac{"+yp+"}{"+((xp-p)*(xp-q))+"} = \\)<b>\\("+a+"\\)</b>.",
    {p:p,q:q,a:a,xp:xp,yp:yp});
});
E("u2-equation-from-graph",2,["4.16"],1,"gen",function(){
  var a=pick([1,-1]),p=ri(-6,-1),q=ri(1,6),b=-a*(p+q),c=a*p*q;
  var qfig=mcq("The graph shows a parabola with its x-intercepts marked. Which equation has this graph?",
    factT(a,p,q),
    [factT(-a,p,q),factT(a,-p,-q),quadT(a,-b,c)],
    "The graph crosses the x-axis at \\(x = "+p+"\\) and \\(x = "+q+"\\)"+", so the factors are \\((x - ("+p+"))\\) and \\((x - ("+q+"))\\)"+". It opens "+(a>0?"upward, so the leading coefficient is positive":"downward, so the leading coefficient is negative")+". The equation is <b>"+factT(a,p,q)+"</b>. (The standard form shown as one option has the same intercepts' product but the wrong middle coefficient, so it is a different parabola.)",
    {a:a,p:p,q:q});
  qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:0},{x:q,y:0}]});
  return qfig;
});
E("u2-eq-from-characteristics",2,["4.16"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-5,5),k=ri(-8,9),tries=0;
  while((h===0||k===0)&&tries<40){h=ri(-5,5);k=ri(-8,9);tries++;}
  return mcq("A quadratic function opens "+(a>0?"upward":"downward")+" and has vertex \\(("+h+", "+k+")\\)"+". Which function could it be?",
    vertT(a,h,k),
    [vertT(-a,h,k),vertT(a,-h,k),vertT(a,h,-k)],
    "The vertex \\(("+h+", "+k+")\\) goes into vertex form as \\(h = "+h+"\\) and \\(k = "+k+"\\)"+", and opening "+(a>0?"upward means \\(a > 0\\)":"downward means \\(a < 0\\)")+". Of the choices, only <b>"+vertT(a,h,k)+"</b> has that vertex and that opening.",
    {a:a,h:h,k:k});
});
E("u2-eq-from-table",2,["4.16"],3,"gen",function(){
  var a=pick([1,-1]),h=ri(-3,3),k=ri(-6,9),tries=0;
  while((k===0||h===0)&&tries<40){h=ri(-3,3);k=ri(-6,9);tries++;}
  var xs=[h-2,h-1,h,h+1,h+2],ys=xs.map(function(x){return a*(x-h)*(x-h)+k;});
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return mcq("A quadratic function has the values in the table. "+tab+" Which equation gives the function?",
    vertT(a,h,k),
    [vertT(-a,h,k),vertT(a,-h,k),vertT(a,h,-k)],
    "The y-values are symmetric about the middle column, so the vertex is at \\(x = "+h+"\\) with value \\("+k+"\\)"+": the vertex is \\(("+h+", "+k+")\\)"+". Moving one step from the vertex changes \\(y\\) by \\("+(ys[3]-k)+"\\)"+", so \\(a = "+a+"\\)"+". The equation is <b>"+vertT(a,h,k)+"</b>.",
    {a:a,h:h,k:k,xs:xs,ys:ys});
});
E("u2-eq-intercepts-standard",2,["4.16"],2,"gen",function(){
  var a=pick([1,2,-1]),p=ri(-6,-1),q=ri(1,6),tries=0;
  while(p===-q&&tries<40){q=ri(1,6);tries++;}
  var b=-a*(p+q),c=a*p*q;
  function std(bb,cc){return "\\(y = "+quadB(a,bb,cc)+"\\)";}
  return mcq("A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\) and opens "+(a>0?"upward":"downward")+(Math.abs(a)>1?" with leading coefficient "+a:"")+". Which equation, in standard form, has this graph?",
    std(b,c),
    [std(-b,c),std(b,-c),factT(a,p,q)],
    "Start in factored form: \\(y = "+factB(a,p,q)+"\\)"+". Expanding, the middle coefficient is \\("+a+" \\times (-("+p+" + "+q+")) = "+b+"\\) and the constant is \\("+a+" \\times ("+(-p)+") \\times ("+(-q)+") = "+c+"\\)"+". In standard form the equation is <b>"+std(b,c)+"</b>. (The factored form listed is the same parabola, but the question asks for standard form.)",
    {a:a,p:p,q:q,b:b,c:c});
});
/* --- Prior knowledge additions (expansion, November 18, 2026) --- */
E("u2-pk-eval-quad",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var a=pick([2,3,-2]),b=ri(-9,9),c=ri(-12,12),x0=pick([-3,-2,-1,2,3]),tries=0;
  while(b===0&&tries<40){b=ri(-9,9);tries++;}
  var y0=a*x0*x0+b*x0+c;
  return numq("If \\(f(x) = "+quadB(a,b,c)+"\\), what is \\(f("+x0+")\\)?",
    y0,0.011,
    "Substitute \\(x = "+x0+"\\): \\[ \\begin{aligned} f("+x0+") &= "+a+"("+x0+")^2 + ("+b+")("+x0+") + ("+c+") \\\\ &= "+(a*x0*x0)+" + "+(b*x0)+" + ("+c+") \\\\ &= "+y0+" \\end{aligned} \\] So \\(f("+x0+") = \\)<b>\\("+y0+"\\)</b>.",
    {a:a,b:b,c:c,x0:x0,y0:y0});
});
E("u2-pk-table-value",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([2,3,-2,-3]),bb=ri(-6,6),x0=ri(-4,5),tries=0;
  while(bb===0&&tries<40){bb=ri(-6,6);tries++;}
  var y0=m*x0+bb;
  var xs=[x0-2,x0-1,x0,x0+1,x0+2],ys=xs.map(function(x){return m*x+bb;});
  var tab="\\(\\begin{array}{c|ccccc} x & "+xs.join(" & ")+" \\\\ \\hline y & "+ys.join(" & ")+" \\end{array}\\)";
  return numq("The table shows values of a linear function. "+tab+" What is the value of the function when \\(x = "+(x0+7)+"\\)?",
    m*(x0+7)+bb,0.011,
    "The y-values change by \\("+m+"\\) for each step of \\(1\\) in \\(x\\), so the rate of change is \\("+m+"\\)"+". From \\(x = "+x0+"\\), where \\(y = "+y0+"\\), moving to \\(x = "+(x0+7)+"\\) is \\(7\\) steps: \\(y = "+y0+" + 7 \\times ("+m+") = \\)<b>\\("+(m*(x0+7)+bb)+"\\)</b>.",
    {m:m,bb:bb,x0:x0,y0:y0});
});
E("u2-pk-line-equation-from-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([1,2,-1,-2]),bb=ri(-5,5),tries=0;
  while((bb===0||bb===m)&&tries<40){bb=ri(-5,5);tries++;}
  function eq(mm,cc){return "\\(y = "+(mm===1?"":mm===-1?"-":mm)+"x "+(cc<0?"- "+(-cc):"+ "+cc)+"\\)";}
  var q=mcq("The graph shows a line. What is its equation?",
    eq(m,bb),
    [eq(-m,bb),eq(m,-bb),eq(bb,m)],
    "The line crosses the y-axis at \\("+bb+"\\)"+", so the constant term is \\("+bb+"\\)"+". From the intercept, the line rises \\("+m+"\\) for each step of \\(1\\) to the right, so the slope is \\("+m+"\\)"+". The equation is <b>"+eq(m,bb)+"</b>.",
    {m:m,bb:bb});
  q.figure=u2pkLineSVG({line:[m,1,bb],marks:[[0,bb]],aria:"Graph of a line"});
  return q;
});
E("u2-pk-line-x-intercept-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var m=pick([1,2,-1,-2]),xi=pick([-4,-3,-2,-1,1,2,3,4]),bb=-m*xi;
  var q=numq("The graph shows a line. At what value of \\(x\\) does it cross the x-axis?",
    xi,0.011,
    "The line crosses the x-axis at the marked point, where \\(y = 0\\). Reading the mark on the axis, the crossing is at <b>\\(x = "+xi+"\\)</b>.",
    {m:m,bb:bb,xi:xi});
  q.figure=u2pkLineSVG({line:[m,1,bb],marks:[[xi,0]],aria:"Graph of a line crossing the x-axis"});
  return q;
});
E("u2-pk-dr-segment-graph",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var x1=pick([-4,-3,-2,-1]),x2=pick([2,3,4,5]),y1=ri(-4,4),y2=ri(-4,4),tries=0;
  while((y1===y2||(Math.min(y1,y2)===x1&&Math.max(y1,y2)===x2))&&tries<40){y1=ri(-4,4);y2=ri(-4,4);tries++;}
  var lo=Math.min(y1,y2),hi=Math.max(y1,y2);
  function dr(dx,rx){return "Domain: \\("+dx+"\\); Range: \\("+rx+"\\)";}
  var key=dr(x1+" \\leq x \\leq "+x2,lo+" \\leq y \\leq "+hi);
  var candS=[dr(lo+" \\leq x \\leq "+hi,x1+" \\leq y \\leq "+x2),
             dr(x1+" \\leq x \\leq "+x2,(lo-1)+" \\leq y \\leq "+(hi+1)),
             dr(y1+" \\leq x \\leq "+y2,lo+" \\leq y \\leq "+hi),
             dr((x1-1)+" \\leq x \\leq "+(x2-1),lo+" \\leq y \\leq "+hi)],ds=[];
  for(var ci=0;ci<candS.length&&ds.length<3;ci++){if(candS[ci]!==key&&ds.indexOf(candS[ci])<0)ds.push(candS[ci]);}
  var q=mcq("The graph shows a line segment with its endpoints marked. What are the domain and range of the segment?",
    key,ds,
    "The segment runs from \\(x = "+x1+"\\) to \\(x = "+x2+"\\)"+", so the domain is \\("+x1+" \\leq x \\leq "+x2+"\\)"+". Its lowest point has \\(y = "+lo+"\\) and its highest has \\(y = "+hi+"\\) (read from the two endpoints, \\(y = "+y1+"\\) and \\(y = "+y2+"\\))"+", so the range is \\("+lo+" \\leq y \\leq "+hi+"\\)"+". The domain and range are <b>"+key+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2});
  q.figure=u2pkLineSVG({seg:[[x1,y1],[x2,y2]],pts:[[x1,y1],[x2,y2]],aria:"Graph of a line segment"});
  return q;
});
E("u2-pk-scatter-dr",2,["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"],1,"gen",function(){
  var xs=shuffle([1,2,3,4,5,6,7]).slice(0,5).sort(function(u,v){return u-v;});
  var ys=xs.map(function(){return ri(1,9);});
  var xlo=xs[0],xhi=xs[xs.length-1],ylo=Math.min.apply(null,ys),yhi=Math.max.apply(null,ys),tries=0;
  while(ylo===xlo&&yhi===xhi&&tries<40){ys=xs.map(function(){return ri(1,9);});ylo=Math.min.apply(null,ys);yhi=Math.max.apply(null,ys);tries++;}
  var pts=xs.map(function(x,i){return [x,ys[i]];});
  function dr(dx,rx){return "Domain: "+dx+"; Range: "+rx;}
  var key=dr("\\(x\\) from "+xlo+" to "+xhi,"\\(y\\) from "+ylo+" to "+yhi);
  var ds=[dr("\\(x\\) from "+ylo+" to "+yhi,"\\(y\\) from "+xlo+" to "+xhi),
          dr("\\(x\\) from "+xlo+" to "+xhi,"\\(y\\) from "+xlo+" to "+xhi),
          dr("\\(x\\) from "+ylo+" to "+yhi,"\\(y\\) from "+ylo+" to "+yhi)];
  var q=mcq("The scatter plot shows data collected in an experiment, with \\(x\\) the input and \\(y\\) the output. Which statement describes the domain and range covered by the data?",
    key,ds,
    "The domain is covered by the x-values of the plotted points, which run from \\("+xlo+"\\) to \\("+xhi+"\\)"+". The range is covered by the y-values, which run from \\("+ylo+"\\) to \\("+yhi+"\\)"+". So: <b>"+key+"</b>.",
    {xs:xs,ys:ys});
  q.figure=u2pkLineSVG({pts:pts,xLab:"x",aria:"Scatter plot"});
  return q;
});
/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 2 (Quadratic Functions prerequisites), borrowed set.
   Provenance (host id: source entry in its home bank, the feeder
   indicator it assesses, verified by draw sweep):
   - u2-pk-graph-data: copied from math-1201 u4-graph-data, indicator 4.9.
   - u2-pk-domain-range: copied from math-1201 u4-domain-range, indicator 4.10.
   - u2-pk-dr-linear: copied from math-1201 u4-dr-linear, indicator 4.12.
   - u2-pk-intercepts: copied from math-1201 u4-intercepts, indicator 4.28.
   - u2-pk-eval-function: copied from math-1201 u4-eval-function, indicator 4.47.
   - u2-pk-solve-input: copied from math-1201 u4-solve-input, indicator 4.48
     (also copied into Unit 6 under its own host id).
   - u2-pk-graph-strategy: copied from math-1201 u5-graph-strategy, indicator 4.34
     (that entry sits in the feeder's Unit 5 file but carries a Unit 4 code;
     it is copied by indicator, as the spec directs).
   - u2-pk-graph-form: copied from math-1201 u5-graph-form, indicator 4.35.
   The u4 and u5 helper families were copied into bank-helpers.js
   with the tranche. Indicator tags are support tags, not assessed
   targets: assessed targets are in pkSrc, the full dependent list
   in pkFor. */
E("u2-pk-graph-data", 2, ["4.1"], 1, "gen",function(){
  var profs=[
    {name:"A weather station records the day number of a study and the high temperature that day, in degrees",xlab:"day",ylab:"temperature"},
    {name:"A coach records the week number of a training plan and the number of laps the team swam that week",xlab:"week",ylab:"laps"},
    {name:"A shop records the number of hours since opening and the number of loaves sold so far that day",xlab:"hours",ylab:"loaves"},
    {name:"A class records the number of school days since seeds were planted and the average seedling height, in centimetres",xlab:"days",ylab:"height"}
  ];
  var prof=pick(profs);
  var xs=shuffle([1,2,3,4,5,6,7]).slice(0,4).sort(function(a,b){return a-b;});
  var ys=[];while(ys.length<4){var y=ri(3,28);if(ys.indexOf(y)<0)ys.push(y);}
  var askRange=Math.random()<0.5;
  var vals=askRange?ys.slice().sort(function(a,b){return a-b;}):xs;
  var other=askRange?xs:ys.slice().sort(function(a,b){return a-b;});
  var key="\\("+u4setS(vals)+"\\)";
  var alt=vals.slice();alt[alt.length-1]=alt[alt.length-1]+2;
  var short=vals.slice(0,3);
  var ds=u4pickS3(key,["\\("+u4setS(other)+"\\)","\\("+u4setS(alt)+"\\)","\\("+u4setS(short)+"\\)"]);
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  return mcq(prof.name+". The data points are \\("+u4pairsS(pairs)+"\\), where the first coordinate is the "+prof.xlab+" value and the second is the "+prof.ylab+" value. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "The domain is the set of first coordinates and the range is the set of second coordinates. From \\("+u4pairsS(pairs)+"\\), the "+(askRange?"second":"first")+" coordinates are \\("+vals.join(", ")+"\\). The <b>"+(askRange?"range":"domain")+" is \\("+u4setS(vals)+"\\)</b>.",
    {profName:prof.name,asked:askRange?"range":"domain",xs:xs,ys:ys,keyStr:key});
});
E("u2-pk-domain-range", 2, ["4.1"], 1, "gen",function(){
  var useTable=Math.random()<0.5;
  var xs=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4);
  var ys=[];while(ys.length<4){var y=ri(1,18);if(ys.indexOf(y)<0)ys.push(y);}
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  var dom=xs.slice(),rng=ys.slice();
  function drStr(d,r){return "Domain: \\("+u4setS(d)+"\\); range: \\("+u4setS(r)+"\\)";}
  var key=drStr(dom,rng);
  var altR=rng.slice();altR[0]=altR[0]+3;while(dom.indexOf(altR[0])>=0&&rng.indexOf(altR[0])>=0)altR[0]++;
  var ds=u4pickS3(key,[drStr(rng,dom),drStr(dom,altR),drStr(xs.slice(0,3),rng)]);
  var shown=useTable?("A table of values has \\(x\\) values \\("+xs.join(", ")+"\\) with matching \\(y\\) values, in the same order, \\("+ys.join(", ")+"\\)"):("A relation is given by the set of ordered pairs \\("+u4pairsS(pairs)+"\\)");
  return mcq(shown+". Which choice gives the domain and the range of this relation?",
    key,ds,
    "Collect the first coordinates for the domain and the second coordinates for the range, listing each value once: \\[ \\begin{aligned} \\text{Domain} &= "+u4setS(dom)+" \\\\ \\text{Range} &= "+u4setS(rng)+" \\end{aligned} \\] The domain and range are <b>domain \\("+u4setS(dom)+"\\) and range \\("+u4setS(rng)+"\\)</b>.",
    {pairs:pairs,dom:dom,rng:rng,keyStr:key});
});
E("u2-pk-dr-linear", 2, ["4.1"], 1, "gen",function(){
  var x1=ri(-6,2),x2=x1+ri(3,9);
  var m=pick([-2,-1,1,2]),b=ri(-5,6);
  var y1=m*x1+b,y2=m*x2+b;
  var askRange=Math.random()<0.5;
  var lo=askRange?Math.min(y1,y2):x1, hi=askRange?Math.max(y1,y2):x2;
  var vname=askRange?"y":"x";
  var key=u4interval(vname,lo,hi);
  var oLo=askRange?x1:Math.min(y1,y2), oHi=askRange?x2:Math.max(y1,y2), oV=askRange?"x":"y";
  var ds=u4pickS3(key,[u4interval(oV,oLo,oHi),u4interval(vname,lo,hi+2),u4interval(vname,lo-1,hi)]);
  return mcq("The graph of a linear relation is the line segment joining the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\), including both endpoints. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "On a line segment, the domain runs from the smallest to the largest first coordinate and the range runs from the smallest to the largest second coordinate. The endpoints give \\(x\\) from \\("+x1+"\\) to \\("+x2+"\\) and \\(y\\) from \\("+Math.min(y1,y2)+"\\) to \\("+Math.max(y1,y2)+"\\): \\[ \\begin{aligned} \\text{Domain} &: "+x1+" \\le x \\le "+x2+" \\\\ \\text{Range} &: "+Math.min(y1,y2)+" \\le y \\le "+Math.max(y1,y2)+" \\end{aligned} \\] The <b>"+(askRange?"range":"domain")+" is "+key+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2,asked:askRange?"range":"domain",keyStr:key});
});
E("u2-pk-intercepts", 2, ["4.4"], 1, "gen",function(){
  var askX=false;
  var m=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var xi=ri(-9,9);while(xi===0)xi=ri(-9,9);
  var b=-m*xi;
  var ans=askX?xi:b;
  var eq="y = "+u4lin(m,b);
  var sol=askX?
    "The \\(x\\)-intercept is where the graph meets the horizontal axis, so set the output to zero and solve: \\[ \\begin{aligned} 0 &= "+u4lin(m,b)+" \\\\ "+(-b)+" &= "+u4num(m)+"x \\\\ x &= "+xi+" \\end{aligned} \\] The \\(x\\)-intercept is <b>\\("+xi+"\\)</b>, at the point \\("+u4pairS(xi,0)+"\\)":
    "The \\(y\\)-intercept is where the graph meets the vertical axis, so use an input of zero: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"(0) + ("+b+") \\\\ &= "+b+" \\end{aligned} \\] The \\(y\\)-intercept is <b>\\("+b+"\\)</b>, at the point \\("+u4pairS(0,b)+"\\)";
  return numq("A linear relation is given by the equation \\("+eq+"\\). What is the value of the "+(askX?"\\(x\\)-intercept":"\\(y\\)-intercept")+" of its graph?",
    ans,0.011,sol,{askX:askX,m:m,b:b,ans:ans});
});
E("u2-pk-eval-function", 2, ["4.1"], 1, "gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});
E("u2-pk-solve-input", 2, ["4.4"], 2, "gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});
E("u2-pk-graph-strategy", 2, ["4.14"], 1, "var",varset([
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
E("u2-pk-graph-form", 2, ["4.14"], 2, "gen",function(){
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
/* PK tranche pass for Unit 2. pkFor is Cluster 2's dependent
   indicator list from the prior knowledge map. */
var PKT_U2_FOR=["4.1","4.2","4.10","4.11","4.12","4.13","4.14","4.15","4.16"];
var PKT_U2={
 "u2-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u2-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-dr-linear":{src:"math-1201:4.12",group:"domain-range"},
 "u2-pk-intercepts":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-solve-input":{src:"math-1201:4.48",group:"substitution"},
 "u2-pk-graph-strategy":{src:"math-1201:4.34",group:"graph-forms"},
 "u2-pk-graph-form":{src:"math-1201:4.35",group:"graph-forms"},
 "u2-pk-eval-quad":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-table-value":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-line-equation-from-graph":{src:"math-1201:4.35",group:"graph-forms"},
 "u2-pk-line-x-intercept-graph":{src:"math-1201:4.12",group:"intercepts"},
 "u2-pk-dr-segment-graph":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-scatter-dr":{src:"math-1201:4.9",group:"graphing-data"}};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});
