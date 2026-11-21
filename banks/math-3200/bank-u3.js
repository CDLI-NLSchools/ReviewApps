// Math 3200 Unit 3 Radical Functions question bank
// CRMARKS: u3-domain-from-quadratic-cr=2
// CRMARKS: u3-evaluate-transformed-cr=3
// CRMARKS: u3-graphical-solve=1
// CRMARKS: u3-intercept-solution=2
// CRMARKS: u3-recover-coefficient-cr=3
// CRMARKS: u3-recover-f-value=3
// CRMARKS: u3-shift-from-intercept-cr=2
// CRMARKS: u3-sqrtx-table=1
// CRMARKS: u3-start-point=1
// CRMARKS: u3-transform-domain-range=2
// CRMARKS: u3-sqrtf-multistep-cr=5
// CRMARKS: u3-radical-equation-critique-cr=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u3-compare-domains=2
// CRMARKS: u3-two-methods=3
// CRMARKS: u3-intercept-statement=2
// CRMARKS: u3-add-sqrtx-point-sets=2
// CRMARKS: u3-add-graphical-solve-mc=2
// BIMODAL: u3-recover-f-value=a
// BIMODAL: u3-domain-from-quadratic-cr=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u3-compare-domains=a
// BIMODAL: u3-two-methods=b
// BIMODAL: u3-intercept-statement=b
// BIMODAL: u3-add-sqrtx-point-sets=a
// BIMODAL: u3-add-graphical-solve-mc=a
/* ================= Unit 3: Radical Functions ================= */
/* ================= Unit 3: Radical Functions ================= */
/* Indicators: 4.9, 4.10, 4.11, 4.12, 4.25, 4.26. Types follow the Mauger
   Radical Functions set and the MHR Pre-Calculus 12 radical chapter
   (domain and range of a square-root function, transformations of
   y = sqrt(x), the square root of a function, graphical solutions of
   radical equations), rewritten with original stems and values.
   Algebraic solving of radical equations is Math 2200 content, so the
   4.26 entries here are graphical, as the guide states. */

function u3sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u3inside(c){return c>0?"x + "+c:(c<0?"x - "+(-c):"x");}
function u3coef(a){return a===1?"":(a===-1?"-":""+a);}
function u3eqnT(a,b,h,k){
  var inner=(b===1)?u3inside(-h):b+"("+u3inside(-h)+")";
  return "y = "+u3coef(a)+"\\sqrt{"+inner+"}"+u3sgn(k);
}
function u3figT(a,b,h,k){ /* graph of y = a sqrt(b(x - h)) + k with its starting point marked (Tranche 4) */
  var fn=function(x){return a*Math.sqrt(b*(x-h))+k;};
  var x1=h+14/b, yEnd=a*Math.sqrt(14)+k;
  var y0=Math.floor(Math.min(0,k,yEnd)-1.5), y1=Math.ceil(Math.max(0,k,yEnd)+1.5);
  return fnPlotSVG(fn,h-1,x1,y0,y1,{gx:1,gy:(y1-y0>12?2:1),labelX:true,labelY:true,points:[[h,k]]});
}
function u3figCompare(r,h,n,lo,hi){ /* the parabola f and g = sqrt(f) side by side (Tranche 4) */
  var f=function(x){return (x-h)*(x-h)-n;};
  var g=function(x){var v=f(x);return v<0?NaN:Math.sqrt(v);};
  var fx=r+2, fy=f(h-fx), fspan=fy+n+2;
  return fnPanelsSVG([
    {fn:f,x0:h-fx,x1:h+fx,y0:-n-2,y1:fy,gx:2,gy:(fspan<=20?2:fspan<=45?5:10),title:"f(x)",points:[[lo,0],[hi,0]]},
    {fn:g,x0:h-fx,x1:h+fx,y0:-0.5,y1:Math.sqrt(fy)+0.5,gx:2,gy:1,title:"g(x) = \u221af(x)"}
  ]);
}
function u3svgSolve(form,a,c,sol){
  var xMin=-2,xMax=Math.max(16,sol+5),yMin=-1.5,yMax=c+1.5;
  var W=320,H=228,L=30,R=10,T=10,B=24;
  function X(x){return L+(x-xMin)*(W-L-R)/(xMax-xMin);}
  function Y(y){return (H-B)-(y-yMin)*(H-T-B)/(yMax-yMin);}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graphs of a square root function and a horizontal line meeting at one point">';
  var gx,gy;
  for(gx=Math.ceil(xMin);gx<=xMax;gx++){out+='<line x1="'+fmt(X(gx),1)+'" y1="'+fmt(Y(yMin),1)+'" x2="'+fmt(X(gx),1)+'" y2="'+fmt(Y(yMax),1)+'" stroke="#e5e7eb" stroke-width="1"/>';}
  for(gy=0;gy<=Math.floor(yMax);gy++){out+='<line x1="'+fmt(X(xMin),1)+'" y1="'+fmt(Y(gy),1)+'" x2="'+fmt(X(xMax),1)+'" y2="'+fmt(Y(gy),1)+'" stroke="#e5e7eb" stroke-width="1"/>';}
  out+='<line x1="'+fmt(X(xMin),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(xMax),1)+'" y2="'+fmt(Y(0),1)+'" stroke="#374151" stroke-width="1.4"/>';
  out+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(yMin),1)+'" x2="'+fmt(X(0),1)+'" y2="'+fmt(Y(yMax),1)+'" stroke="#374151" stroke-width="1.4"/>';
  var startX=(form===1)?-a:a,d="",i,x,y;
  for(i=0;i<=64;i++){x=startX+(xMax-startX)*i/64;y=Math.sqrt((form===1)?x+a:x-a);if(y>yMax)y=yMax;d+=((i===0)?"M ":"L ")+fmt(X(x),1)+" "+fmt(Y(y),1)+" ";}
  out+='<path d="'+d+'" fill="none" stroke="#1d4ed8" stroke-width="2"/>';
  out+='<line x1="'+fmt(X(xMin),1)+'" y1="'+fmt(Y(c),1)+'" x2="'+fmt(X(xMax),1)+'" y2="'+fmt(Y(c),1)+'" stroke="#dc2626" stroke-width="2"/>';
  out+='<line x1="'+fmt(X(sol),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(sol),1)+'" y2="'+fmt(Y(c),1)+'" stroke="#6b7280" stroke-width="1.2" stroke-dasharray="4 3"/>';
  out+='<circle cx="'+fmt(X(sol),1)+'" cy="'+fmt(Y(c),1)+'" r="3.6" fill="#dc2626"/>';
  for(gx=0;gx<=xMax;gx+=5){out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="10" fill="#111827" text-anchor="middle" font-family="sans-serif">'+gx+'</text>';}
  out+='<text x="'+(L-6)+'" y="'+fmt(Y(c)+3,1)+'" font-size="11" fill="#111827" text-anchor="end" font-family="sans-serif">'+c+'</text>';
  out+='<text x="'+(W-12)+'" y="'+fmt(Y(0)-5,1)+'" font-size="11" fill="#111827" font-family="sans-serif">x</text>';
  out+='<text x="'+fmt(X(0)+5,1)+'" y="'+(T+8)+'" font-size="11" fill="#111827" font-family="sans-serif">y</text>';
  return out+'</svg>';
}

E("u3-sqrtx-table",3,["4.10"],1,"gen",function(){
  var shape=ri(1,3);
  if(shape===3){
    var m=ri(3,9);
    return mcq("Which point lies on the graph of \\(y = \\sqrt{x}\\)?",
      "("+(m*m)+", "+m+")",
      ["("+m+", "+(m*m)+")","("+(m*m)+", "+(2*m)+")","("+((m+1)*(m+1))+", "+m+")"],
      "On the graph of \\(y = \\sqrt{x}\\), each y-value is the non-negative square root of its x-value: \\(\\sqrt{"+(m*m)+"} = "+m+"\\). So the point is <b>("+(m*m)+", "+m+")</b>. Swapping the coordinates, doubling the root, or pairing the next square with the same root all break that relationship.",
      {m:m,shape:shape});
  }
  var s=0,R=4,j=1,v=3,tries=0;
  do{s=ri(0,4);R=pick([4,5]);j=ri(1,R-1);v=s+j;tries++;}while(v<3&&tries<60);
  var pairs=[],i,x;
  for(i=0;i<R;i++){
    if(shape===1)pairs.push("("+(s+i)*(s+i)+", "+((i===j)?"?":(s+i))+")");
    else pairs.push("("+((i===j)?"?":(s+i)*(s+i))+", "+(s+i)+")");
  }
  var table="A table of values for \\(y = \\sqrt{x}\\) gives the points "+pairs.join(", ")+".";
  if(shape===1){
    return mcq(table+" What is the missing y-value?",
      ""+v,[""+(2*v),""+(v*v),""+(v-1)],
      "In the table, each y-value is the non-negative square root of its x-value. The incomplete pair has \\(x = "+(v*v)+"\\), and \\(\\sqrt{"+(v*v)+"} = "+v+"\\), so the missing y-value is <b>"+v+"</b>.",
      {v:v,shape:shape});
  }
  var w=v*v;
  return mcq(table+" What is the missing x-value?",
    ""+w,[""+((v-1)*(v-1)),""+((v+1)*(v+1)),""+(2*v)],
    "In the table, each x-value is the square of its y-value. The incomplete pair has \\(y = "+v+"\\), and \\("+v+"^2 = "+w+"\\), so the missing x-value is <b>"+w+"</b>.",
    {v:v,shape:shape});
});

E("u3-start-point",3,["4.11"],1,"gen",function(){
  var a=pick([-3,-2,-1,1,2,3]),b=pick([1,2,4]),h=0,k=0,t=0;
  while((h===0||k===0)&&t<60){h=ri(-6,6);k=ri(-6,6);t++;}
  var eq=u3eqnT(a,b,h,k);
  var q=mcq("The graph of \\("+eq+"\\) is a transformation of the graph of \\(y = \\sqrt{x}\\). At which point does the graph begin?",
    "("+h+", "+k+")",
    ["("+(-h)+", "+k+")","("+h+", "+(-k)+")","("+(-h)+", "+(-k)+")"],
    "The graph of \\(y = \\sqrt{x}\\) begins at \\((0, 0)\\), where the radicand first reaches zero. Here the radicand is zero when \\(x = "+h+"\\), and at that point the value of the function is the vertical shift, \\(y = "+k+"\\). So the graph begins at <b>("+h+", "+k+")</b>. The factors \\(a = "+a+"\\) and \\(b = "+b+"\\) stretch, compress or reflect the graph, but they do not move its starting point.",
    {a:a,b:b,h:h,k:k});
  q.figure=u3figT(a,b,h,k);
  return q;
});

E("u3-transform-domain-range",3,["4.11"],1,"gen",function(){
  var a=1,b=1,h=2,k=3,t=0;
  do{a=pick([-3,-2,-1,1,2,3]);b=pick([1,2,4]);h=ri(-6,6);k=ri(-6,6);t++;}
  while((h===0||k===0||Math.abs(h)===Math.abs(k))&&t<80);
  var eq=u3eqnT(a,b,h,k),shape=pick(["domain","range"]);
  if(shape==="domain"){
    var inn=u3inside(-h),rad=(b===1)?inn:b+"("+inn+")",steps;
    if(b===1)steps=rad+" &\\geq 0 \\\\ x &\\geq "+h;
    else steps=rad+" &\\geq 0 \\\\ "+inn+" &\\geq 0 \\\\ x &\\geq "+h;
    var q=mcq("What is the <b>domain</b> of the function \\("+eq+"\\)?",
      "\\(x \\geq "+h+"\\)",
      ["\\(x \\geq "+(-h)+"\\)","\\(x \\leq "+h+"\\)","\\(x \\geq "+k+"\\)"],
      "The radicand of a square root must be non-negative. Because \\(b = "+b+"\\) is positive, dividing by it keeps the direction of the inequality: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] So the domain is <b>\\(x \\geq "+h+"\\)</b>.",
      {a:a,b:b,h:h,k:k,shape:shape});q.figure=u3figT(a,b,h,k);return q;
  }
  var up=(a>0),cor,dis;
  if(up){cor="\\(y \\geq "+k+"\\)";dis=["\\(y \\leq "+k+"\\)","\\(y \\geq "+(-k)+"\\)","\\(y \\geq "+h+"\\)"];}
  else{cor="\\(y \\leq "+k+"\\)";dis=["\\(y \\geq "+k+"\\)","\\(y \\leq "+(-k)+"\\)","\\(y \\leq "+h+"\\)"];}
  var q=mcq("What is the <b>range</b> of the function \\("+eq+"\\)?",
    cor,dis,
    "A square root is never negative, so \\(\\sqrt{"+((b===1)?u3inside(-h):b+"("+u3inside(-h)+")")+"}\\) takes every value from \\(0\\) upward. Multiplying by \\(a = "+a+"\\) makes the term "+(up?"non-negative":"non-positive")+", and the vertical shift then moves its smallest or largest value to \\("+k+"\\). So the range is <b>"+cor+"</b>.",
    {a:a,b:b,h:h,k:k,shape:shape});q.figure=u3figT(a,b,h,k);return q;
});

/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u3-sqrtf-evaluate",3,["4.12"],2,"gen",function(){
  var c=0,t=0;
  while(c===0&&t<40){c=ri(-9,9);t++;}
  var fstr="f(x) = "+u3inside(c),shape=pick([1,2]),m=ri(2,9);
  if(shape===1){
    var tv=m*m-c;
    return numq("Let \\("+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). What is \\(g("+tv+")\\)?",
      m,0.01,
      "\\[ \\begin{aligned} g("+tv+") &= \\sqrt{f("+tv+")} \\\\ &= \\sqrt{"+tv+u3sgn(c)+"} \\\\ &= \\sqrt{"+(m*m)+"} \\\\ &= "+m+" \\end{aligned} \\] So \\(g("+tv+") = \\)<b>"+m+"</b>.",
      {c:c,m:m,shape:shape});
  }
  var vals=[],tries=0;
  do{c=ri(-9,9);m=ri(3,9);vals=[m*m-c,m*m+c,m-c,2*(m-c)];tries++;}
  while((c===0||new Set(vals).size<4)&&tries<80);
  fstr="f(x) = "+u3inside(c);
  var xv=m*m-c;
  return mcq("Let \\("+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). For what value of \\(x\\) is \\(g(x) = "+m+"\\)?",
    ""+xv,vals.slice(1).map(function(z){return ""+z;}),
    "Set the output of \\(g\\) equal to \\("+m+"\\) and square both sides: \\[ \\begin{aligned} \\sqrt{"+u3inside(c)+"} &= "+m+" \\\\ "+u3inside(c)+" &= "+(m*m)+" \\\\ x &= "+xv+" \\end{aligned} \\] So \\(g(x) = "+m+"\\) when <b>\\(x = "+xv+"\\)</b>.",
    {c:c,m:m,shape:shape});
});

E("u3-compare-domains",3,["4.9"],2,"gen",function(){
  var r=pick([2,3,4,5,6,7]),n=r*r,shifted=pick([false,true]),h=shifted?pick([-3,-2,-1,1,2,3]):0;
  var base=shifted?"("+u3inside(-h)+")^2":"x^2",fstr=base+" - "+n;
  var lo=h-r,hi=h+r,shape=pick(["domain","range"]);
  if(shape==="domain"){
    var q=mcq("Let \\(f(x) = "+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). Which statement correctly compares the <b>domains</b> of the two functions?",
      "The domain of \\(f\\) is all real numbers, but the domain of \\(g\\) is \\(x \\leq "+lo+"\\) or \\(x \\geq "+hi+"\\)",
      ["The domain of \\(f\\) is all real numbers, but the domain of \\(g\\) is \\(x \\geq "+hi+"\\)",
       "The domain of \\(g\\) is all real numbers, but the domain of \\(f\\) is \\(x \\leq "+lo+"\\) or \\(x \\geq "+hi+"\\)",
       "The domains are the same, because taking a square root does not restrict where a function is defined"],
      "A polynomial such as \\(f\\) is defined for every real value of \\(x\\). For \\(g\\), the radicand must be non-negative: \\("+fstr+" \\geq 0\\) holds exactly where the parabola is on or above the x-axis, which is \\(x \\leq "+lo+"\\) or \\(x \\geq "+hi+"\\). So building \\(g\\) from the square root of \\(f\\) restricts the domain to where \\(f(x) \\geq 0\\).",
      {r:r,h:h,shape:shape});q.figure=u3figCompare(r,h,n,lo,hi);return q;
  }
  var q=mcq("Let \\(f(x) = "+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). Which statement correctly compares the <b>ranges</b> of the two functions?",
    "The range of \\(f\\) is \\(y \\geq "+(-n)+"\\), but the range of \\(g\\) is \\(y \\geq 0\\)",
    ["The range of \\(f\\) is \\(y \\geq 0\\), but the range of \\(g\\) is \\(y \\geq "+(-n)+"\\)",
     "The range of \\(f\\) is \\(y \\geq "+(-n)+"\\), and the range of \\(g\\) is \\(y \\geq "+(-n)+"\\) as well",
     "The range of \\(f\\) is \\(y \\geq "+n+"\\), but the range of \\(g\\) is \\(y \\geq 0\\)"],
    "The parabola \\(f\\) opens upward with minimum value \\(-"+n+"\\) at its vertex, so the range of \\(f\\) is \\(y \\geq "+(-n)+"\\). A square root never gives a negative output, and as \\(f(x)\\) grows, \\(\\sqrt{f(x)}\\) takes every value from \\(0\\) upward, so the range of \\(g\\) is \\(y \\geq 0\\). The square root discards the negative part of the range of \\(f\\).",
    {r:r,h:h,shape:shape});q.figure=u3figCompare(r,h,n,lo,hi);return q;
});

E("u3-intercept-solution",3,["4.25"],2,"gen",function(){
  var form=pick([1,2]),b=ri(2,6),a,sol,inn;
  if(form===1){a=ri(1,b*b-1);sol=b*b-a;inn=a;}
  else{a=ri(1,9);sol=b*b+a;inn=-a;}
  var rad="\\sqrt{"+u3inside(inn)+"}";
  var q=numq("The graph of \\(y = "+rad+" - "+b+"\\) has exactly one x-intercept. What is the solution of the equation \\("+rad+" = "+b+"\\)?",
    sol,0.01,
    "At an x-intercept, \\(y = 0\\), so the intercept is the value of \\(x\\) that makes \\("+rad+" - "+b+" = 0\\): \\[ \\begin{aligned} "+rad+" &= "+b+" \\\\ "+u3inside(inn)+" &= "+(b*b)+" \\\\ x &= "+sol+" \\end{aligned} \\] The solution is <b>\\(x = "+sol+"\\)</b>. In general, the roots of a radical equation are exactly the x-intercepts of the corresponding radical function.",
    {a:a,b:b,form:form});
  var fn=function(x){return Math.sqrt(x+inn)-b;};
  q.figure=fnPlotSVG(fn,-inn-1,sol+6,-(b+2),Math.ceil(Math.sqrt(b*b+6)-b)+1,{gx:1,gy:1,labelX:true,labelY:true,points:[[sol,0]]});
  return q;
});

E("u3-graphical-solve",3,["4.26"],2,"gen",function(){
  var form=pick([1,2]),c=pick([2,3,4,5]),a=0,sol=0,t=0;
  if(form===1){do{a=ri(0,12);t++;}while(a>=c*c&&t<60);sol=c*c-a;}
  else{a=ri(1,10);sol=c*c+a;}
  var rad="\\sqrt{"+u3inside((form===1)?a:-a)+"}";
  var chk=(form===1)?((a===0)?""+sol:sol+" + "+a):sol+" - "+a;
  var q=numq("The graphs of \\(y = "+rad+"\\) and \\(y = "+c+"\\) are shown in the diagram. Use the graph to solve the equation \\("+rad+" = "+c+"\\).",
    sol,0.01,
    "On the graph, the solution is the x-coordinate of the point where the curve meets the line \\(y = "+c+"\\). The dashed line drops from that intersection point to the x-axis at <b>\\(x = "+sol+"\\)</b>. Check: \\(\\sqrt{"+chk+"} = \\sqrt{"+(c*c)+"} = "+c+"\\).",
    {a:a,c:c,form:form});
  q.figure=u3svgSolve(form,a,c,sol);
  return q;
});

E("u3-two-methods",3,["4.26"],3,"gen",function(){
  var a=ri(2,12),c=pick([2,3,4,5,6]),t=0;
  while(c*c<=a&&t<60){c=pick([2,3,4,5,6]);t++;}
  var s=c*c-a,pair=pick([["Ava","Liam"],["Noah","Emma"],["Lucas","Mia"],["Ella","Owen"]]);
  var rad="\\sqrt{"+u3inside(a)+"}";
  return mcq(pair[0]+" and "+pair[1]+" each solve \\("+rad+" = "+c+"\\) graphically. "+pair[0]+" graphs \\(y = "+rad+"\\) and \\(y = "+c+"\\) and reads the x-coordinate of their intersection point. "+pair[1]+" graphs \\(y = "+rad+" - "+c+"\\) and reads its x-intercept. Which statement is correct?",
    "Both methods give \\(x = "+s+"\\), because the intersection x-coordinate and the x-intercept both occur where \\("+rad+" = "+c+"\\)",
    ["Only "+pair[0]+"'s method works, because the solution of an equation is the x-coordinate where two graphs intersect",
     "Only "+pair[1]+"'s method works, because the solution of an equation has to be read from the x-intercept of a single graph",
     "Neither method works, because a solution read from a graph is only an estimate and cannot be checked against the equation"],
    pair[1]+"'s graph crosses the x-axis where \\("+rad+" - "+c+" = 0\\), which is the very same condition as \\("+rad+" = "+c+"\\). That x-value is also where "+pair[0]+"'s two graphs meet, since both graphs then have the same y-value. So both methods find \\(x = "+(c*c)+" - "+a+" = "+s+"\\), and substituting back confirms it exactly.",
    {a:a,c:c});
});

E("u3-recover-f-value",3,["4.12"],3,"gen",function(){
  var p=ri(-6,2),q=ri(p+2,8),side=pick([0,1]),off=ri(1,6),m=pick([3,4,5,6,7,8]);
  var tv=(side===0)?p-off:q+off;
  return mcq("For a certain function \\(f\\), the graph of \\(g(x) = \\sqrt{f(x)}\\) is defined for \\(x \\leq "+p+"\\) or \\(x \\geq "+q+"\\), and \\(g("+tv+") = "+m+"\\). What is the value of \\(f("+tv+")\\)?",
    ""+(m*m),
    [""+m,""+(2*m),""+(m*m+m)],
    "Because \\(g(x) = \\sqrt{f(x)}\\), the statement \\(g("+tv+") = "+m+"\\) means \\(\\sqrt{f("+tv+")} = "+m+"\\). Squaring both sides undoes the square root: \\[ \\begin{aligned} \\sqrt{f("+tv+")} &= "+m+" \\\\ f("+tv+") &= "+m+"^2 \\\\ &= "+(m*m)+" \\end{aligned} \\] So \\(f("+tv+") = \\)<b>"+(m*m)+"</b>. The domain information confirms that \\(g\\) is defined at \\(x = "+tv+"\\); the value itself comes from squaring.",
    {p:p,q:q,tv:tv,m:m});
});

E("u3-intercept-statement",3,["4.25"],1,"gen",function(){
  var form=pick([1,2]),b=ri(2,6),a,tv,inn;
  if(form===1){a=ri(1,b*b-1);tv=b*b-a;inn=a;}
  else{a=ri(1,9);tv=b*b+a;inn=-a;}
  var rad="\\sqrt{"+u3inside(inn)+"}",radOpp="\\sqrt{"+u3inside(-inn)+"}";
  var q=mcq("The graph of \\(y = "+rad+" - "+b+"\\) has x-intercept \\(x = "+tv+"\\). Which statement must be true?",
    "\\("+rad+" = "+b+"\\)",
    ["\\("+rad+" = 0\\)","\\("+rad+" = "+(-b)+"\\)","\\("+radOpp+" = "+b+"\\)"],
    "At an x-intercept, the y-value is \\(0\\): \\[ \\begin{aligned} 0 &= "+rad+" - "+b+" \\\\ "+rad+" &= "+b+" \\end{aligned} \\] So the intercept \\(x = "+tv+"\\) is a root of the equation \\("+rad+" = "+b+"\\). This is the general relationship: the roots of a radical equation are the x-intercepts of the corresponding radical function.",
    {a:a,b:b,form:form});
  var fn2=function(x){return Math.sqrt(x+inn)-b;};
  q.figure=fnPlotSVG(fn2,-inn-1,tv+6,-(b+2),Math.ceil(Math.sqrt(b*b+6)-b)+1,{gx:1,gy:1,labelX:true,labelY:true,points:[[tv,0]]});
  return q;
});

/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 3 CR entries (2 and 3 marks) and two Level 2 CR entries (3 and 2 marks). The unit had a single Level 3 CR entry and an all-2-mark Level 2 pool. ---------- */
function u3facS(r){ return r===0?"x":(r>0?"(x - "+r+")":"(x + "+(-r)+")"); }
E("u3-domain-from-quadratic-cr",3,["4.9"],3,"gen",function(){
  var p=ri(-6,2), q=p+ri(2,6), B=-(p+q), C=p*q;
  var fs="x^2";
  if(B!==0) fs+=(B>0?" + ":" - ")+(Math.abs(B)===1?"x":Math.abs(B)+"x");
  if(C!==0) fs+=(C>0?" + "+C:" - "+(-C));
  var qq=mcq("What is the domain of the function \\(g(x) = \\sqrt{"+fs+"}\\)?",
    "\\(x \\leq "+p+"\\) or \\(x \\geq "+q+"\\)",
    ["\\("+p+" \\leq x \\leq "+q+"\\)",
     "\\(x \\geq "+q+"\\) only",
     "All real numbers"],
    "The radicand must be non-negative. Since \\("+fs+" = "+u3facS(p)+u3facS(q)+"\\), the radicand is zero at \\(x = "+p+"\\) and \\(x = "+q+"\\). The parabola opens upward, so the radicand is positive outside the interval between the roots. The domain is \\(x \\leq "+p+"\\) or \\(x \\geq "+q+"\\).",
    {p:p,q:q});
  var fn3=function(x){return (x-p)*(x-q);};
  var vy=fn3((p+q)/2), fy=Math.max(fn3(p-2),fn3(q+2));
  qq.figure=fnPlotSVG(fn3,p-2,q+2,Math.floor(vy)-2,Math.ceil(fy)+2,{gx:1,gy:(fy-vy>24?2:1),labelX:true,labelY:true,points:[[p,0],[q,0]]});
  return qq;
});
E("u3-recover-coefficient-cr",3,["4.12"],3,"gen",function(){
  var p=ri(-5,1), q=p+ri(3,7);
  var side=pick([0,1]), t=side===0? q+ri(1,5) : p-ri(1,5);
  var fv=(t-p)*(t-q);
  return numq("The function \\(g(x) = \\sqrt{f(x)}\\), where \\(f\\) is a quadratic function with leading coefficient 1, has domain \\(x \\leq "+p+"\\) or \\(x \\geq "+q+"\\). Determine the value of \\(f("+t+")\\).",
    fv,0.001,
    "The endpoints of the domain are the zeros of \\(f\\), so \\(f(x) = "+u3facS(p)+u3facS(q)+"\\). Evaluating at \\(x = "+t+"\\): \\(f("+t+") = ("+t+" "+(p>=0?"- "+p:"+ "+(-p))+")("+t+" "+(q>=0?"- "+q:"+ "+(-q))+") = "+(t-p)+" \\times "+(t-q)+" = \\)<b>"+fv+"</b>.",
    {p:p,q:q,t:t});
});
E("u3-evaluate-transformed-cr",3,["4.11"],2,"gen",function(){
  var b=pick([1,4]), s=b===1? ri(2,6) : pick([2,4,6]);
  var a=pick([2,3,-2,-3]), h=ri(-4,4), k=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var t=h+s*s/b, ans=a*s+k;
  var inside=b===1? u3inside(-h) : b+"(x"+(h===0?"":(h>0?" - "+h:" + "+(-h)))+")";
  var ks=k>0?"+ "+k:"- "+(-k);
  return numq("Given \\(g(x) = "+a+"\\sqrt{"+inside+"} "+(k>0?"+":"-")+" "+Math.abs(k)+"\\), determine the value of \\(g("+t+")\\).",
    ans,0.001,
    "At \\(x = "+t+"\\), the radicand is \\("+b+" \\times "+(t-h)+" = "+(s*s)+"\\), and \\(\\sqrt{"+(s*s)+"} = "+s+"\\). \\[ \\begin{aligned} g("+t+") &= "+a+"("+s+") "+ks+" \\\\ &= "+(a*s)+" "+ks+" \\\\ &= "+ans+" \\end{aligned} \\] So \\(g("+t+") = \\)<b>"+ans+"</b>.",
    {b:b,s:s,a:a,h:h,k:k});
});
E("u3-shift-from-intercept-cr",3,["4.25"],2,"gen",function(){
  var b=ri(2,6), i=ri(-4,10); if(b*b-i===0) i=i-3;
  var c=b*b-i;
  return numq("The graph of \\(y = \\sqrt{x + c} - "+b+"\\) has x-intercept "+i+". Determine the value of \\(c\\).",
    c,0.001,
    "At the x-intercept, \\(y = 0\\): \\[ \\begin{aligned} 0 &= \\sqrt{"+i+" + c} - "+b+" \\\\ \\sqrt{"+i+" + c} &= "+b+" \\\\ "+i+" + c &= "+(b*b)+" \\\\ c &= "+c+" \\end{aligned} \\] So \\(c = \\)<b>"+c+"</b>.",
    {b:b,i:i});
});

/* Bimodal build additions (Nov 19, 2026): two selected-response entries for Unit 3, placed on the thinnest indicators in the unit (4.10, with one existing entry, and 4.26, with two). SME-flagged for the specialist pass. */

E("u3-add-sqrtx-point-sets",3,["4.10"],2,"gen",function(){
  var pools=[[4,5,6,7,8,9],[10,11,12,13,14,15],[16,17,18,19,20,21]];
  var pool=pick(pools);
  var chosen=[];
  while(chosen.length<3){var r=pick(pool);if(chosen.indexOf(r)<0)chosen.push(r);}
  chosen.sort(function(x,y){return x-y;});
  function setStr(ys){return "\\("+chosen.map(function(r,i){return "("+(r*r)+", "+ys[i]+")";}).join(", ")+"\\)";}
  var corr=setStr(chosen);
  var dis=[];
  for(var j=0;j<3;j++){
    var ys=chosen.slice();
    ys[j]=(chosen[j]===pool[pool.length-1])?chosen[j]-1:chosen[j]+1;
    dis.push(setStr(ys));
  }
  return mcq("Which set of points all lie on the graph of \\(y = \\sqrt{x}\\)?",
    corr,dis,
    "A point lies on the graph of \\(y = \\sqrt{x}\\) when its y-coordinate is the non-negative square root of its x-coordinate. Here \\(\\sqrt{"+(chosen[0]*chosen[0])+"} = "+chosen[0]+"\\), \\(\\sqrt{"+(chosen[1]*chosen[1])+"} = "+chosen[1]+"\\) and \\(\\sqrt{"+(chosen[2]*chosen[2])+"} = "+chosen[2]+"\\), so all three points in this set satisfy the equation. Each other set changes one y-coordinate to a value that is not the square root of its x-coordinate. The set is <b>"+corr+"</b>.",
    {roots:chosen});
});

E("u3-add-graphical-solve-mc",3,["4.26"],2,"gen",function(){
  var c=pick([4,5,6,7]),form=pick([1,2]),sol;
  if(form===1)sol=ri(Math.max(11,c*c-9),c*c-1);
  else sol=ri(c*c+1,c*c+8);
  var a=(form===1)?(c*c-sol):(sol-c*c);
  var inn=(form===1)?a:-a;
  var rad="\\sqrt{"+u3inside(inn)+"}";
  var chk=(form===1)?(sol+" + "+a):(sol+" - "+a);
  var cands=[sol-2,sol+2,sol-1,sol+1,c*c,sol+10,sol-10,a+10];
  var dis=[];
  for(var i=0;i<cands.length&&dis.length<3;i++){var v=cands[i];if(v>=10&&v<=99&&v!==sol&&dis.indexOf(v)<0)dis.push(v);}
  var q=mcq("The graphs of \\(y = "+rad+"\\) and \\(y = "+c+"\\) are shown in the diagram. What is the solution of the equation \\("+rad+" = "+c+"\\)?",
    "\\(x = "+sol+"\\)",
    dis.map(function(v){return "\\(x = "+v+"\\)";}),
    "On the graph, the solution is the x-coordinate of the point where the curve meets the line \\(y = "+c+"\\). The dashed line drops from that intersection point to the x-axis at \\("+sol+"\\). Check: \\(\\sqrt{"+chk+"} = \\sqrt{"+(c*c)+"} = "+c+"\\). The solution is <b>\\(x = "+sol+"\\)</b>.",
    {a:a,c:c,form:form,sol:sol});
  q.figure=u3svgSolve(form,a,c,sol);
  return q;
});

/* ---------- Backfill tranche, November 20, 2026: two written (constructed response) entries restoring the Unit 3 written pool for the Math 3200 compose gate. A recent build removed two entries from this unit's written pool, leaving the Unit 3 test at 24 of 25 marks and the pooled Units 2 and 3 paper at 44 of 50 marks; the 5-mark Level 2 entry on indicator 4.12 and the 2-mark Level 3 entry on indicator 4.26 below close that gap. SME-flagged for the specialist pass. ---------- */

E("u3-sqrtf-multistep-cr",3,["4.12"],2,"var",varset([
  function(){
    var A=1,B=9,xa=16,m=7;
    var fstr=u3inside(B),fa=A*xa+B,ga=Math.sqrt(fa),xb=(m*m-B)/A,dom=-B/A;
    var subst=""+xa+u3sgn(B);
    var bSteps="\\sqrt{"+fstr+"} &= "+m+" \\\\ "+fstr+" &= "+(m*m)+" \\\\ x &= "+xb;
    var cSteps=fstr+" &\\geq 0 \\\\ x &\\geq "+dom;
    return textq("Let \\(f(x) = "+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). (a) Determine the value of \\(g("+xa+")\\). (b) Find the value of \\(x\\) for which \\(g(x) = "+m+"\\). (c) State the smallest value of \\(x\\) for which \\(g\\) is defined, and explain your answer.",
      ["(a) "+ga+" (b) x = "+xb+" (c) x = "+dom,""+ga+", "+xb+", "+dom],
      "(a) Substitute \\(x = "+xa+"\\) into \\(f\\), then take the square root: \\[ \\begin{aligned} g("+xa+") &= \\sqrt{f("+xa+")} \\\\ &= \\sqrt{"+subst+"} \\\\ &= \\sqrt{"+fa+"} \\\\ &= "+ga+" \\end{aligned} \\] (b) Set \\(g(x)\\) equal to \\("+m+"\\) and square both sides: \\[ \\begin{aligned} "+bSteps+" \\end{aligned} \\] (c) The function \\(g\\) is defined exactly where its radicand is non-negative, that is, where \\(f(x) \\geq 0\\): \\[ \\begin{aligned} "+cSteps+" \\end{aligned} \\] At \\(x = "+dom+"\\), \\(f("+dom+") = 0\\) and \\(g("+dom+") = 0\\); for any smaller value of \\(x\\), \\(f(x)\\) is negative and the square root is undefined. The answers are (a) <b>"+ga+"</b>, (b) <b>\\(x = "+xb+"\\)</b> and (c) <b>\\(x = "+dom+"\\)</b>. <b>Marking points (5 marks):</b> (a) 1 mark for the correct value "+ga+", found by substituting into \\(f\\) and taking the square root. (b) 2 marks: 1 mark for setting \\(\\sqrt{"+fstr+"}\\) equal to \\("+m+"\\) and squaring both sides to obtain \\("+fstr+" = "+(m*m)+"\\), and 1 mark for the correct value \\(x = "+xb+"\\). (c) 2 marks: 1 mark for the smallest value \\(x = "+dom+"\\), and 1 mark for the explanation that \\(g\\) is defined exactly where \\(f(x) \\geq 0\\), with the smallest value occurring where \\(f(x) = 0\\).",
      {A:A,B:B,xa:xa,m:m,xb:xb,dom:dom});
  },
  function(){
    var A=2,B=4,xa=6,m=6;
    var fstr=""+A+"x"+u3sgn(B),fa=A*xa+B,ga=Math.sqrt(fa),xb=(m*m-B)/A,dom=-B/A;
    var subst=""+A+"("+xa+")"+u3sgn(B);
    var bSteps="\\sqrt{"+fstr+"} &= "+m+" \\\\ "+fstr+" &= "+(m*m)+" \\\\ "+A+"x &= "+(m*m-B)+" \\\\ x &= "+xb;
    var cSteps=fstr+" &\\geq 0 \\\\ "+A+"x &\\geq "+(-B)+" \\\\ x &\\geq "+dom;
    return textq("Let \\(f(x) = "+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). (a) Determine the value of \\(g("+xa+")\\). (b) Find the value of \\(x\\) for which \\(g(x) = "+m+"\\). (c) State the smallest value of \\(x\\) for which \\(g\\) is defined, and explain your answer.",
      ["(a) "+ga+" (b) x = "+xb+" (c) x = "+dom,""+ga+", "+xb+", "+dom],
      "(a) Substitute \\(x = "+xa+"\\) into \\(f\\), then take the square root: \\[ \\begin{aligned} g("+xa+") &= \\sqrt{f("+xa+")} \\\\ &= \\sqrt{"+subst+"} \\\\ &= \\sqrt{"+fa+"} \\\\ &= "+ga+" \\end{aligned} \\] (b) Set \\(g(x)\\) equal to \\("+m+"\\) and square both sides: \\[ \\begin{aligned} "+bSteps+" \\end{aligned} \\] (c) The function \\(g\\) is defined exactly where its radicand is non-negative, that is, where \\(f(x) \\geq 0\\): \\[ \\begin{aligned} "+cSteps+" \\end{aligned} \\] At \\(x = "+dom+"\\), \\(f("+dom+") = 0\\) and \\(g("+dom+") = 0\\); for any smaller value of \\(x\\), \\(f(x)\\) is negative and the square root is undefined. The answers are (a) <b>"+ga+"</b>, (b) <b>\\(x = "+xb+"\\)</b> and (c) <b>\\(x = "+dom+"\\)</b>. <b>Marking points (5 marks):</b> (a) 1 mark for the correct value "+ga+", found by substituting into \\(f\\) and taking the square root. (b) 2 marks: 1 mark for setting \\(\\sqrt{"+fstr+"}\\) equal to \\("+m+"\\) and squaring both sides to obtain \\("+fstr+" = "+(m*m)+"\\), and 1 mark for the correct value \\(x = "+xb+"\\). (c) 2 marks: 1 mark for the smallest value \\(x = "+dom+"\\), and 1 mark for the explanation that \\(g\\) is defined exactly where \\(f(x) \\geq 0\\), with the smallest value occurring where \\(f(x) = 0\\).",
      {A:A,B:B,xa:xa,m:m,xb:xb,dom:dom});
  },
  function(){
    var A=4,B=-8,xa=11,m=8;
    var fstr=""+A+"x"+u3sgn(B),fa=A*xa+B,ga=Math.sqrt(fa),xb=(m*m-B)/A,dom=-B/A;
    var subst=""+A+"("+xa+")"+u3sgn(B);
    var bSteps="\\sqrt{"+fstr+"} &= "+m+" \\\\ "+fstr+" &= "+(m*m)+" \\\\ "+A+"x &= "+(m*m-B)+" \\\\ x &= "+xb;
    var cSteps=fstr+" &\\geq 0 \\\\ "+A+"x &\\geq "+(-B)+" \\\\ x &\\geq "+dom;
    return textq("Let \\(f(x) = "+fstr+"\\) and \\(g(x) = \\sqrt{f(x)}\\). (a) Determine the value of \\(g("+xa+")\\). (b) Find the value of \\(x\\) for which \\(g(x) = "+m+"\\). (c) State the smallest value of \\(x\\) for which \\(g\\) is defined, and explain your answer.",
      ["(a) "+ga+" (b) x = "+xb+" (c) x = "+dom,""+ga+", "+xb+", "+dom],
      "(a) Substitute \\(x = "+xa+"\\) into \\(f\\), then take the square root: \\[ \\begin{aligned} g("+xa+") &= \\sqrt{f("+xa+")} \\\\ &= \\sqrt{"+subst+"} \\\\ &= \\sqrt{"+fa+"} \\\\ &= "+ga+" \\end{aligned} \\] (b) Set \\(g(x)\\) equal to \\("+m+"\\) and square both sides: \\[ \\begin{aligned} "+bSteps+" \\end{aligned} \\] (c) The function \\(g\\) is defined exactly where its radicand is non-negative, that is, where \\(f(x) \\geq 0\\): \\[ \\begin{aligned} "+cSteps+" \\end{aligned} \\] At \\(x = "+dom+"\\), \\(f("+dom+") = 0\\) and \\(g("+dom+") = 0\\); for any smaller value of \\(x\\), \\(f(x)\\) is negative and the square root is undefined. The answers are (a) <b>"+ga+"</b>, (b) <b>\\(x = "+xb+"\\)</b> and (c) <b>\\(x = "+dom+"\\)</b>. <b>Marking points (5 marks):</b> (a) 1 mark for the correct value "+ga+", found by substituting into \\(f\\) and taking the square root. (b) 2 marks: 1 mark for setting \\(\\sqrt{"+fstr+"}\\) equal to \\("+m+"\\) and squaring both sides to obtain \\("+fstr+" = "+(m*m)+"\\), and 1 mark for the correct value \\(x = "+xb+"\\). (c) 2 marks: 1 mark for the smallest value \\(x = "+dom+"\\), and 1 mark for the explanation that \\(g\\) is defined exactly where \\(f(x) \\geq 0\\), with the smallest value occurring where \\(f(x) = 0\\).",
      {A:A,B:B,xa:xa,m:m,xb:xb,dom:dom});
  }
]));

E("u3-radical-equation-critique-cr",3,["4.26"],3,"var",varset([
  function(){
    var a=4,b=2,gen=5,ext=0;
    var inn=u3inside(a),line="x - "+b;
    var fac=(ext===0)?"x("+u3inside(-gen)+")":"("+u3inside(-gen)+")("+u3inside(-ext)+")";
    var gv=Math.sqrt(gen+a),ev=Math.sqrt(ext+a);
    return textq("The graphs of \\(y = \\sqrt{"+inn+"}\\) and \\(y = "+line+"\\) meet at exactly one point. A student solves the equation \\(\\sqrt{"+inn+"} = "+line+"\\) by squaring both sides and reports two candidate solutions, \\(x = "+ext+"\\) and \\(x = "+gen+"\\). One of the candidates is not a solution of the equation. (a) State which candidate is not a solution. (1 mark) (b) Explain, with reference to the two graphs, why that candidate is not a solution. (1 mark)",
      ["x = "+ext+" is not a solution","x = "+ext,""+ext],
      "Squaring both sides gives \\[ \\begin{aligned} \\sqrt{"+inn+"} &= "+line+" \\\\ "+inn+" &= (x - "+b+")^2 \\\\ "+inn+" &= x^2 - "+(2*b)+"x + "+(b*b)+" \\\\ 0 &= x^2 - "+(2*b+1)+"x"+u3sgn(b*b-a)+" \\\\ 0 &= "+fac+" \\end{aligned} \\] so the candidates are \\(x = "+ext+"\\) and \\(x = "+gen+"\\), but squaring can introduce a candidate that does not satisfy the original equation. At \\(x = "+ext+"\\), the square root graph has value \\(\\sqrt{"+(ext+a)+"} = "+ev+"\\), while the line has value \\("+ext+" - "+b+" = "+(ext-b)+"\\), below the x-axis. The square root graph never takes a negative value, so at \\(x = "+ext+"\\) the two graphs have different values and do not meet. At \\(x = "+gen+"\\), both graphs have value \\("+gv+"\\), and \\(("+gen+", "+gv+")\\) is the single meeting point of the two graphs. The candidate that is not a solution is <b>\\(x = "+ext+"\\)</b>. <b>Marking points (2 marks):</b> 1 mark for stating that \\(x = "+ext+"\\) is not a solution. 1 mark for the graphical explanation: at \\(x = "+ext+"\\) the line lies below the x-axis (its value is negative) while the square root graph never takes negative values, so the two graphs do not meet there.",
      {a:a,b:b,gen:gen,ext:ext});
  },
  function(){
    var a=10,b=2,gen=6,ext=-1;
    var inn=u3inside(a),line="x - "+b;
    var fac=(ext===0)?"x("+u3inside(-gen)+")":"("+u3inside(-gen)+")("+u3inside(-ext)+")";
    var gv=Math.sqrt(gen+a),ev=Math.sqrt(ext+a);
    return textq("The graphs of \\(y = \\sqrt{"+inn+"}\\) and \\(y = "+line+"\\) meet at exactly one point. A student solves the equation \\(\\sqrt{"+inn+"} = "+line+"\\) by squaring both sides and reports two candidate solutions, \\(x = "+ext+"\\) and \\(x = "+gen+"\\). One of the candidates is not a solution of the equation. (a) State which candidate is not a solution. (1 mark) (b) Explain, with reference to the two graphs, why that candidate is not a solution. (1 mark)",
      ["x = "+ext+" is not a solution","x = "+ext,""+ext],
      "Squaring both sides gives \\[ \\begin{aligned} \\sqrt{"+inn+"} &= "+line+" \\\\ "+inn+" &= (x - "+b+")^2 \\\\ "+inn+" &= x^2 - "+(2*b)+"x + "+(b*b)+" \\\\ 0 &= x^2 - "+(2*b+1)+"x"+u3sgn(b*b-a)+" \\\\ 0 &= "+fac+" \\end{aligned} \\] so the candidates are \\(x = "+ext+"\\) and \\(x = "+gen+"\\), but squaring can introduce a candidate that does not satisfy the original equation. At \\(x = "+ext+"\\), the square root graph has value \\(\\sqrt{"+(ext+a)+"} = "+ev+"\\), while the line has value \\("+ext+" - "+b+" = "+(ext-b)+"\\), below the x-axis. The square root graph never takes a negative value, so at \\(x = "+ext+"\\) the two graphs have different values and do not meet. At \\(x = "+gen+"\\), both graphs have value \\("+gv+"\\), and \\(("+gen+", "+gv+")\\) is the single meeting point of the two graphs. The candidate that is not a solution is <b>\\(x = "+ext+"\\)</b>. <b>Marking points (2 marks):</b> 1 mark for stating that \\(x = "+ext+"\\) is not a solution. 1 mark for the graphical explanation: at \\(x = "+ext+"\\) the line lies below the x-axis (its value is negative) while the square root graph never takes negative values, so the two graphs do not meet there.",
      {a:a,b:b,gen:gen,ext:ext});
  },
  function(){
    var a=-2,b=4,gen=6,ext=3;
    var inn=u3inside(a),line="x - "+b;
    var fac=(ext===0)?"x("+u3inside(-gen)+")":"("+u3inside(-gen)+")("+u3inside(-ext)+")";
    var gv=Math.sqrt(gen+a),ev=Math.sqrt(ext+a);
    return textq("The graphs of \\(y = \\sqrt{"+inn+"}\\) and \\(y = "+line+"\\) meet at exactly one point. A student solves the equation \\(\\sqrt{"+inn+"} = "+line+"\\) by squaring both sides and reports two candidate solutions, \\(x = "+ext+"\\) and \\(x = "+gen+"\\). One of the candidates is not a solution of the equation. (a) State which candidate is not a solution. (1 mark) (b) Explain, with reference to the two graphs, why that candidate is not a solution. (1 mark)",
      ["x = "+ext+" is not a solution","x = "+ext,""+ext],
      "Squaring both sides gives \\[ \\begin{aligned} \\sqrt{"+inn+"} &= "+line+" \\\\ "+inn+" &= (x - "+b+")^2 \\\\ "+inn+" &= x^2 - "+(2*b)+"x + "+(b*b)+" \\\\ 0 &= x^2 - "+(2*b+1)+"x"+u3sgn(b*b-a)+" \\\\ 0 &= "+fac+" \\end{aligned} \\] so the candidates are \\(x = "+ext+"\\) and \\(x = "+gen+"\\), but squaring can introduce a candidate that does not satisfy the original equation. At \\(x = "+ext+"\\), the square root graph has value \\(\\sqrt{"+(ext+a)+"} = "+ev+"\\), while the line has value \\("+ext+" - "+b+" = "+(ext-b)+"\\), below the x-axis. The square root graph never takes a negative value, so at \\(x = "+ext+"\\) the two graphs have different values and do not meet. At \\(x = "+gen+"\\), both graphs have value \\("+gv+"\\), and \\(("+gen+", "+gv+")\\) is the single meeting point of the two graphs. The candidate that is not a solution is <b>\\(x = "+ext+"\\)</b>. <b>Marking points (2 marks):</b> 1 mark for stating that \\(x = "+ext+"\\) is not a solution. 1 mark for the graphical explanation: at \\(x = "+ext+"\\) the line lies below the x-axis (its value is negative) while the square root graph never takes negative values, so the two graphs do not meet there.",
      {a:a,b:b,gen:gen,ext:ext});
  }
]));
