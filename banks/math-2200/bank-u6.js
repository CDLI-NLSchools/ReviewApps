// Math 2200 Unit 6 Absolute Value and Reciprocal Functions question bank
// CRMARKS: u6-abs-context=2
// CRMARKS: u6-distance=1
// CRMARKS: u6-equation-from-graph=2
// CRMARKS: u6-evaluate-abs=1
// CRMARKS: u6-invariant-points=2
// CRMARKS: u6-no-solution=2
// CRMARKS: u6-order-abs=1
// CRMARKS: u6-original-from-reciprocal=3
// CRMARKS: u6-piecewise=2
// CRMARKS: u6-recip-features=2
// CRMARKS: u6-simplify-expr=2
// CRMARKS: u6-solve-graphical=2
// CRMARKS: u6-solve-linear=2
// CRMARKS: u6-solve-quadratic=3
/* ================= Unit 6: Absolute Value and Reciprocal Functions ================= */
/* ================= Unit 6: Absolute Value and Reciprocal Functions (MA2200.1.5 to 1.8, 1.10, 4.1 to 4.8, 4.33 to 4.36) =================
   Tranche 2, final scope. All stems, contexts and values are original.
   Helpers are prefixed u6; entries register through E(...). */

/* ---------- u6 helpers ---------- */
function u6JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u6Lin(a,b){ /* ax + b as a string */
  var s=(a===1?"x":a===-1?"-x":a+"x");
  if(b>0) s+=" + "+b; else if(b<0) s+=" - "+(-b);
  return s;
}
function u6Quad(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u6Pt(x,y){ return "("+fmt(x)+", "+fmt(y)+")"; }
function u6SetStr(vals){ return "\\{"+vals.join(", ")+"\\}"; }
function u6PtSet(pts){ return "\\{"+pts.map(function(p){ return u6Pt(p[0],p[1]); }).join(", ")+"\\}"; }
function u6AbsArg(a,b){ return "\\left|"+u6Lin(a,b)+"\\right|"; }
function u6Plot(fn,x0,x1,o){ /* axes-and-curve SVG; segments break when the curve leaves the y-range (poles) */
  o=o||{}; var W=440,H=250,pad=26,i,x,y;
  var y1=(o.y1!==undefined)?o.y1:12;
  var y0=(o.y0!==undefined)?o.y0:-12;
  var X=function(v){ return pad+(v-x0)/(x1-x0)*(W-2*pad); };
  var Y=function(v){ return H-pad-(v-y0)/(y1-y0)*(H-2*pad); };
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy=(y1-y0>90)?20:((y1-y0>45)?10:((y1-y0>22)?5:((y1-y0>11)?2:1))), gx, gyv;
  for(gx=Math.ceil(x0);gx<=x1;gx+=1){ out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+gx+'</text>'; }
  for(gyv=Math.ceil(y0/gy)*gy;gyv<=y1;gyv+=gy){ out+='<line x1="'+pad+'" y1="'+fmt(Y(gyv),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gyv),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(gyv!==0) out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gyv)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+gyv+'</text>'; }
  if(y0<0&&y1>0) out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0) out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  (o.poles||[]).forEach(function(px){ out+='<line x1="'+fmt(X(px),1)+'" y1="'+pad+'" x2="'+fmt(X(px),1)+'" y2="'+(H-pad)+'" stroke="#b3541e" stroke-width="1.2" stroke-dasharray="5 4"/>'; });
  function trace(f,colour,width){
    var segs=[],cur=[],N=280,j,xx,yy;
    for(j=0;j<=N;j++){ xx=x0+(x1-x0)*j/N; yy=f(xx);
      if(!isFinite(yy)||yy<y0||yy>y1){ if(cur.length>1)segs.push(cur); cur=[]; continue; }
      cur.push(fmt(X(xx),1)+","+fmt(Y(yy),1));
    }
    if(cur.length>1)segs.push(cur);
    return segs.map(function(s){ return '<polyline points="'+s.join(" ")+'" fill="none" stroke="'+colour+'" stroke-width="'+width+'"/>'; }).join("");
  }
  out+=trace(fn,"#0f766e",2.2);
  if(o.fn2) out+=trace(o.fn2,"#7a4fa3",2);
  (o.points||[]).forEach(function(p){ out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>'; });
  (o.labels||[]).forEach(function(L){ out+='<text x="'+fmt(X(L.p[0])+(L.dx||8),1)+'" y="'+fmt(Y(L.p[1])+(L.dy||-8),1)+'" font-size="11" fill="#17352a" text-anchor="'+(L.anc||"start")+'">'+L.t+'</text>'; });
  return out+'</svg>';
}

/* ---------- 1.5, 1.6 and 1.10: evaluate a numerical absolute-value expression (L1) ---------- */
E("u6-evaluate-abs",6,["1.5","1.6","1.10"],1,"gen",function(){
  var fam=pick(["a","b","c"]);
  if(fam==="a"){
    var a=ri(3,14), b=ri(2,6), c=ri(2,5), d=ri(1,9);
    var inside=a-b*c, ans=Math.abs(inside)+d;
    return numq("Evaluate \\(\\left|"+a+" - "+b+"("+c+")\\right| + "+d+"\\).",
      ans, 0.01,
      "Work inside the absolute value first, using the order of operations:"+
      "\\[ \\begin{aligned} \\left|"+a+" - "+b+"("+c+")\\right| + "+d+" &= \\left|"+a+" - "+(b*c)+"\\right| + "+d+" \\\\ &= \\left|"+inside+"\\right| + "+d+" \\\\ &= "+Math.abs(inside)+" + "+d+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      "The absolute value is taken only after the inside has been simplified to a single number, and it gives the distance of that number from zero.",
      {fam:fam, a:a, b:b, c:c, d:d});
  }
  if(fam==="b"){
    var a2=ri(2,5), b2=ri(3,7), c2=ri(2,12), d2=ri(1,8);
    var inside2=a2*b2-c2, ans2=d2-Math.abs(inside2);
    return numq("Evaluate \\("+d2+" - \\left|"+a2+"("+b2+") - "+c2+"\\right|\\).",
      ans2, 0.01,
      "Simplify inside the absolute value first:"+
      "\\[ \\begin{aligned} "+d2+" - \\left|"+a2+"("+b2+") - "+c2+"\\right| &= "+d2+" - \\left|"+(a2*b2)+" - "+c2+"\\right| \\\\ &= "+d2+" - \\left|"+inside2+"\\right| \\\\ &= "+d2+" - "+Math.abs(inside2)+" \\\\ &= "+ans2+" \\end{aligned} \\]"+
      "The subtraction outside the bars happens last, after the absolute value has been found.",
      {fam:fam, a:a2, b:b2, c:c2, d:d2});
  }
  var a3=ri(2,9), b3=ri(2,11), c3=ri(2,5), d3=ri(2,6);
  var inside3=b3-c3*d3, ans3=a3+Math.abs(inside3);
  return numq("Evaluate \\(\\left|-"+a3+"\\right| + \\left|"+b3+" - "+c3+"("+d3+")\\right|\\).",
    ans3, 0.01,
    "Each absolute value gives a distance from zero, so each one is positive or zero:"+
    "\\[ \\begin{aligned} \\left|-"+a3+"\\right| + \\left|"+b3+" - "+c3+"("+d3+")\\right| &= "+a3+" + \\left|"+b3+" - "+(c3*d3)+"\\right| \\\\ &= "+a3+" + \\left|"+inside3+"\\right| \\\\ &= "+a3+" + "+Math.abs(inside3)+" \\\\ &= "+ans3+" \\end{aligned} \\]",
    {fam:fam, a:a3, b:b3, c:c3, d:d3});
});

/* ---------- 1.8 and 1.6: order a set of absolute values (L1) ---------- */
E("u6-order-abs",6,["1.8","1.6"],1,"gen",function(){
  var pool=[
    {d:"\\left|-8\\right|", sv:-8, v:8}, {d:"\\left|6\\right|", sv:6, v:6},
    {d:"\\left|-4\\right|", sv:-4, v:4}, {d:"\\left|-11\\right|", sv:-11, v:11},
    {d:"\\left|3\\right|", sv:3, v:3}, {d:"\\left|-2.5\\right|", sv:-2.5, v:2.5},
    {d:"\\left|\\frac{7}{2}\\right|", sv:3.5, v:3.5}, {d:"\\left|-\\frac{9}{4}\\right|", sv:-2.25, v:2.25},
    {d:"\\left|4 - 9\\right|", sv:-5, v:5}, {d:"\\left|-1\\right|", sv:-1, v:1},
    {d:"\\left|-0.5\\right|", sv:-0.5, v:0.5}, {d:"\\left|10 - 3\\right|", sv:7, v:7},
    {d:"\\left|-\\frac{5}{4}\\right|", sv:-1.25, v:1.25}, {d:"\\left|12\\right|", sv:12, v:12}
  ];
  var att=0, q=null;
  while(att<400 && !q){
    att++;
    var drawn=shuffle(pool).slice(0,4);
    var vs=drawn.map(function(it){ return it.v; });
    if(new Set(vs).size<4) continue;
    var labels=["A","B","C","D"];
    var items=drawn.map(function(it,i){ return {lab:labels[i], d:it.d, sv:it.sv, v:it.v}; });
    var byAbs=items.slice().sort(function(m,n){ return m.v-n.v; }).map(function(it){ return it.lab; });
    var bySign=items.slice().sort(function(m,n){ return m.sv-n.sv; }).map(function(it){ return it.lab; });
    var key=byAbs.join(", "), rev=byAbs.slice().reverse().join(", "), sgn=bySign.join(", ");
    var swapped=byAbs.slice(); var tmp=swapped[0]; swapped[0]=swapped[1]; swapped[1]=tmp; var swp=swapped.join(", ");
    var dis=[rev, sgn, swp];
    if(dis.indexOf(key)>=0 || new Set(dis).size<3) continue;
    var list=items.map(function(it){ return it.lab+". \\("+it.d+"\\)"; }).join("; ");
    var vals=items.slice().sort(function(m,n){ return m.v-n.v; }).map(function(it){ return "\\("+it.d+" = "+fmt(it.v)+"\\)"; }).join(", ");
    q=mcq("Four values are labelled A to D: "+list+". Which list orders the values from <b>least to greatest</b>?",
      key, dis,
      "Evaluate each absolute value first: "+vals+". Ordering those results from least to greatest gives "+key+". Ordering the numbers inside the bars instead, without taking absolute values, would give "+sgn+", which is a different list.",
      {key:key, vals:items.map(function(it){ return it.v; })});
  }
  return q;
});

/* ---------- 1.7: distance between two numbers on a number line (L1) ---------- */
E("u6-distance",6,["1.7"],1,"gen",function(){
  var fam=pick(["street","street","temp","numbers"]);
  if(fam==="street"){
    var names=["the library","the post office","the bakery","the arena","the school","the pharmacy","the café","the fire hall"];
    var two=shuffle(names).slice(0,2);
    var p1=0, p2=0;
    while(p1===0) p1=ri(-14,14)*25;
    while(p2===0 || p2===p1) p2=ri(-14,14)*25;
    var dist=Math.abs(p1-p2);
    return numq("On the main street of a town, positions are measured in metres from the town square, with east positive. "+u6Cap(two[0])+" is at position "+p1+" and "+two[1]+" is at position "+p2+". What is the <b>distance</b>, in metres, between them?",
      dist, 0.01,
      "The distance between two positions \\(a\\) and \\(b\\) on a number line is \\(\\left|a - b\\right|\\):"+
      "\\[ \\begin{aligned} \\left|"+p1+" - ("+p2+")\\right| &= \\left|"+(p1-p2)+"\\right| \\\\ &= "+dist+" \\end{aligned} \\]"+
      "Distance is never negative, so the answer is <b>"+dist+" m</b>, whichever position is subtracted from the other.",
      {fam:fam, a:p1, b:p2, ctx:"street metres", n1:two[0], n2:two[1]});
  }
  if(fam==="temp"){
    var t1=ri(-28,-2), t2=ri(-6,18);
    if(t2===t1) t2=t1+5;
    var distT=Math.abs(t1-t2);
    return numq("A thermometer reads "+t1+" °C at dawn and "+t2+" °C in the middle of the afternoon. What is the <b>distance</b> between the two temperatures on the number line, in degrees?",
      distT, 0.01,
      "Distance on a number line is the absolute value of the difference:"+
      "\\[ \\begin{aligned} \\left|"+t1+" - ("+t2+")\\right| &= \\left|"+(t1-t2)+"\\right| \\\\ &= "+distT+" \\end{aligned} \\]"+
      "So the two temperatures are <b>"+distT+" degrees</b> apart.",
      {fam:fam, a:t1, b:t2, ctx:"temperature °C"});
  }
  var a3=ri(-24,20)/2, b3=ri(-24,24)/2;
  if(b3===a3) b3=a3+1.5;
  var dist3=Math.abs(a3-b3);
  return numq("What is the <b>distance</b> between "+fmt(a3)+" and "+fmt(b3)+" on a number line?",
    dist3, 0.01,
    "Subtract one number from the other and take the absolute value:"+
    "\\[ \\begin{aligned} \\left|"+fmt(a3)+" - ("+fmt(b3)+")\\right| &= \\left|"+fmt(a3-b3)+"\\right| \\\\ &= "+fmt(dist3)+" \\end{aligned} \\]",
    {fam:fam, a:a3, b:b3, ctx:"number line"});
});
function u6Cap(s){ return s.charAt(0).toUpperCase()+s.slice(1); }

/* ---------- 1.10: simplify a multi-term absolute-value expression (L2) ---------- */
E("u6-simplify-expr",6,["1.10"],1,"gen",function(){
  var att=0, q=null;
  while(att<400 && !q){
    att++;
    var c1=ri(1,4), c2=ri(1,4), s2=pick([1,-1]);
    var v1=ri(-9,9); if(v1===0) continue;
    var mode=pick(["sub","mulsub"]);
    var p=ri(2,9), qq=ri(2,5), r=ri(2,6);
    var inside2=(mode==="sub") ? p-qq*r : p*qq-r;
    var g=ri(-8,8);
    var key=c1*Math.abs(v1)+s2*c2*Math.abs(inside2)+g;
    var e1=c1*v1+s2*c2*Math.abs(inside2)+g;
    var e2=c1*Math.abs(v1)-s2*c2*Math.abs(inside2)+g;
    var inside2alt=(mode==="sub") ? (p-qq)*r : (p-r)*qq;
    var e3=c1*Math.abs(v1)+s2*c2*Math.abs(inside2alt)+g;
    var dis=[e1,e2,e3];
    if(dis.indexOf(key)>=0 || new Set(dis).size<3) continue;
    var coef1=(c1===1?"":(""+c1)), coef2=(c2===1?"":(""+c2));
    var insideDisp=(mode==="sub") ? (p+" - "+qq+"("+r+")") : (p+"("+qq+") - "+r);
    var expr=coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+insideDisp+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"");
    var line3=u6JoinSigned([c1*Math.abs(v1), s2*c2*Math.abs(inside2), g]);
    q=mcq("Evaluate \\("+expr+"\\).",
      ""+key, dis.map(function(v){ return ""+v; }),
      "Simplify inside each pair of bars first, then take the absolute values, then combine:"+
      "\\[ \\begin{aligned} &"+coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+insideDisp+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"")+" \\\\ &= "+coef1+"\\left|"+v1+"\\right| "+(s2>0?"+":"-")+" "+coef2+"\\left|"+inside2+"\\right|"+(g>0?" + "+g:g<0?" - "+(-g):"")+" \\\\ &= "+line3+" \\\\ &= "+key+" \\end{aligned} \\]"+
      "Note that the coefficient in front of a pair of bars multiplies the absolute value after it is taken; it does not go inside the bars.",
      {c1:c1, v1:v1, s2:s2, c2:c2, inside2:inside2, g:g});
  }
  return q;
});

/* ---------- 4.1 and 4.2: features of a graphed absolute value function (L2) ---------- */
E("u6-graph-features",6,["4.1","4.2"],1,"gen",function(){
  var fam=pick(["linear","linear","quad"]);
  if(fam==="linear"){
    var a=pick([1,2,3,-1,-2]);
    var h=0; while(h===0) h=ri(-5,5);
    var b=-a*h, yint=Math.abs(b);
    var fn=function(x){ return Math.abs(a*x+b); };
    function feat(vx, rng, yi){
      return "Vertex: \\("+u6Pt(vx,0)+"\\); x-intercept: \\("+h+"\\); y-intercept: \\("+yi+"\\); range: \\(y "+rng+" 0\\)";
    }
    var key=feat(h, "\\geq", yint);
    var dis=[feat(-h, "\\geq", yint), feat(h, "\\leq", yint), feat(h, "\\geq", b)];
    if(b===yint) dis[2]=feat(h, "\\geq", yint+Math.abs(a));
    var qq=mcq("The graph of \\(y = "+u6AbsArg(a,b)+"\\) is shown. Which list of features matches the graph?",
      key, dis,
      "The graph is the graph of \\(y = "+u6Lin(a,b)+"\\) with its negative part reflected in the x-axis, so it is a V with its vertex on the x-axis. The inside of the bars is zero when \\("+u6Lin(a,b)+" = 0\\), at \\(x = "+h+"\\), so the vertex and the x-intercept are both at \\("+h+"\\) and the range is \\(y \\geq 0\\). Setting \\(x = 0\\) gives the y-intercept \\(\\left|"+b+"\\right| = "+yint+"\\).",
      {fam:fam, a:a, b:b, h:h});
    qq.figure=u6Plot(fn, h-5, h+5, {y0:-2, y1:Math.ceil(Math.abs(a)*5*1.2)+1, points:[[h,0]]});
    return qq;
  }
  var mid=ri(-2,2), d=pick([2,4,6]), r1=mid-d/2, r2=mid+d/2;
  var S=r1+r2, P=r1*r2, peak=d*d/4;
  var fnq=function(x){ return Math.abs((x-r1)*(x-r2)); };
  function featq(yi, pk, rng){
    return "x-intercepts: \\("+r1+"\\) and \\("+r2+"\\); y-intercept: \\("+yi+"\\); highest point between the intercepts: \\("+u6Pt(mid,pk)+"\\); range: \\(y "+rng+" 0\\)";
  }
  var keyq=featq(Math.abs(P), peak, "\\geq");
  var disq=[featq(P, peak, "\\geq"), featq(Math.abs(P), -peak, "\\geq"), featq(Math.abs(P), peak, "\\leq")];
  if(P===Math.abs(P)) disq[0]=featq(-Math.abs(P)-1, peak, "\\geq");
  var q2=mcq("The graph of \\(y = \\left|"+u6Quad(1,-S,P)+"\\right|\\) is shown. Which list of features matches the graph?",
    keyq, disq,
    "The expression inside the bars factors as \\((x - ("+r1+"))(x - ("+r2+"))\\) once the signs are tidied, so the x-intercepts are \\("+r1+"\\) and \\("+r2+"\\). Between the intercepts the quadratic is negative and the absolute value reflects it upward, reaching its highest point halfway across, at \\(x = "+mid+"\\), where the value is \\("+peak+"\\). The y-intercept is \\(\\left|"+P+"\\right| = "+Math.abs(P)+"\\), and the graph never goes below the x-axis, so the range is \\(y \\geq 0\\).",
    {fam:fam, r1:r1, r2:r2, mid:mid});
  q2.figure=u6Plot(fnq, r1-3, r2+3, {y0:-3, y1:Math.ceil(3*(d+3)*1.15)+1, points:[[r1,0],[r2,0],[mid,peak]]});
  return q2;
});

/* ---------- 4.2 and 4.1: the equation of a graphed absolute value function (L2) ---------- */
E("u6-equation-from-graph",6,["4.2","4.1"],2,"gen",function(){
  var a=pick([1,2,3]);
  var h=ri(-4,4), k=pick([-3,-2,-1,0,0,1,2,3]);
  var fn=function(x){ return a*Math.abs(x-h)+k; };
  var key="\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)";
  var dis=[
    "\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" + "+h:h<0?" - "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)",
    "\\(y = "+(a+1)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)",
    "\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right|"+(k>0?" - "+k:k<0?" + "+(-k):"")+"\\)"
  ];
  if(h===0) dis[0]="\\(y = "+(a===1?"":a)+"\\left|x - 2\\right|"+(k>0?" + "+k:k<0?" - "+(-k):"")+"\\)";
  if(k===0) dis[2]="\\(y = "+(a===1?"":a)+"\\left|x"+(h>0?" - "+h:h<0?" + "+(-h):"")+"\\right| + 2\\)";
  var qq=mcq("The graph of an absolute value function is shown, with two points marked. What is the equation of the function?",
    key, dis,
    "The vertex of the V is the marked point \\("+u6Pt(h,k)+"\\), so the function has the form \\(y = a\\left|x - ("+h+")\\right| + ("+k+")\\). The second marked point \\("+u6Pt(h+1,k+a)+"\\) is one unit across from the vertex and \\(a\\) units up, and the rise over that one unit gives \\(a = "+a+"\\). So the equation is "+key+".",
    {a:a, h:h, k:k});
  qq.figure=u6Plot(fn, h-4, h+4, {y0:Math.min(-2,k-2), y1:Math.max(6,k+4*a+2), points:[[h,k],[h+1,k+a]],
    labels:[{p:[h,k], t:u6Pt(h,k), dx:8, dy:14}, {p:[h+1,k+a], t:u6Pt(h+1,k+a), dx:8, dy:-8}]});
  return qq;
});

/* ---------- 4.3: write an absolute value function in piecewise notation (L2) ---------- */
E("u6-piecewise",6,["4.3"],2,"gen",function(){
  var fam=pick(["linear","linear","shifted","quad"]);
  if(fam==="linear" || fam==="shifted"){
    var a=pick([1,2,3]), h=0;
    while(h===0) h=ri(-6,6);
    var k=(fam==="shifted") ? pick([-3,-2,-1,1,2,3]) : 0;
    var b=-a*h;
    var expr=u6Lin(a,b), tail=(k>0?" + "+k:k<0?" - "+(-k):"");
    var posE=expr+tail, negE="-\\left("+expr+"\\right)"+tail;
    function pw(first, second, split){
      return "\\("+first+"\\) for \\(x \\geq "+split+"\\); \\("+second+"\\) for \\(x < "+split+"\\)";
    }
    var key=pw(posE, negE, h);
    var dis=[pw(negE, posE, h), pw(posE, negE, -h), pw(posE, posE, h)];
    return mcq("Which piecewise definition matches \\(y = "+u6AbsArg(a,b)+tail+"\\)?",
      key, dis,
      "The expression inside the bars, \\("+expr+"\\), is zero at \\(x = "+h+"\\) and decides the split. For \\(x \\geq "+h+"\\) the inside is positive (or zero), so the bars come off unchanged: \\("+posE+"\\). For \\(x < "+h+"\\) the inside is negative, so the bars negate it: \\("+negE+"\\)."+(k!==0?" The constant "+k+" outside the bars is added to both pieces.":""),
      {fam:fam, a:a, h:h, k:k});
  }
  var mid=ri(-2,2), d=pick([2,4]), r1=mid-d/2, r2=mid+d/2;
  var S=r1+r2, P=r1*r2, quad=u6Quad(1,-S,P);
  function pwq(first, second){
    return "\\("+first+"\\) for \\(x \\leq "+r1+"\\) or \\(x \\geq "+r2+"\\); \\("+second+"\\) for \\("+r1+" < x < "+r2+"\\)";
  }
  var keyq=pwq(quad, "-\\left("+quad+"\\right)");
  var candq=[pwq("-\\left("+quad+"\\right)", quad), pwq(quad, quad),
    "\\("+quad+"\\) for \\(x \\leq "+(-r2)+"\\) or \\(x \\geq "+(-r1)+"\\); \\(-\\left("+quad+"\\right)\\) for \\("+(-r2)+" < x < "+(-r1)+"\\)",
    "\\("+quad+"\\) for \\(x \\geq "+r1+"\\); \\(-\\left("+quad+"\\right)\\) for \\(x < "+r1+"\\)"];
  var disq=candq.filter(function(s){ return s!==keyq; }).slice(0,3);
  return mcq("Which piecewise definition matches \\(y = \\left|"+quad+"\\right|\\)?",
    keyq, disq,
    "The quadratic inside the bars has x-intercepts \\("+r1+"\\) and \\("+r2+"\\) and opens upward, so it is positive outside the interval between the intercepts and negative inside it. Where it is positive, the bars come off unchanged; where it is negative, the bars negate it. That gives the definition with \\("+quad+"\\) outside the interval and its negation inside.",
    {fam:fam, r1:r1, r2:r2});
});

/* ---------- 4.4: solve an absolute value equation graphically (L2) ---------- */
E("u6-solve-graphical",6,["4.4"],1,"gen",function(){
  var a=pick([1,2,3]);
  var s1=0, s2=0, att=0;
  while(att<200){
    att++;
    s1=ri(-8,6); s2=s1+pick([2,4,6,8,10]);
    if(s2>8) continue;
    if((a*(s1+s2))%2!==0) continue;
    break;
  }
  var c=a*(s2-s1)/2, b=-a*(s1+s2)/2;
  var fn=function(x){ return Math.abs(a*x+b); };
  var key="\\("+u6SetStr([s1,s2])+"\\)";
  var dis=["\\("+u6SetStr([s1])+"\\)", "\\("+u6SetStr([s2])+"\\)", "No solution"];
  var qq=mcq("The graphs of \\(y = "+u6AbsArg(a,b)+"\\) and \\(y = "+c+"\\) are shown. Use the graphs to solve \\("+u6AbsArg(a,b)+" = "+c+"\\).",
    key, dis,
    "The solutions of the equation are the x-coordinates of the points where the two graphs meet. The V meets the horizontal line at \\("+u6Pt(s1,c)+"\\) and \\("+u6Pt(s2,c)+"\\), so the solution set is "+key+". Reading only one meeting point misses half of the solution.",
    {a:a, b:b, c:c, s1:s1, s2:s2});
  qq.figure=u6Plot(fn, s1-3, s2+3, {y0:-2, y1:c+3*a+2, fn2:function(){ return c; }, points:[[s1,c],[s2,c]]});
  return qq;
});

/* ---------- 4.6 and 4.4: solve a linear absolute value equation algebraically (L2) ---------- */
E("u6-solve-linear",6,["4.6","4.4"],2,"gen",function(){
  var fam=pick(["standard","standard","both-sides"]);
  if(fam==="standard"){
    var a=pick([1,2,3]);
    var s1=0, s2=0, att=0;
    while(att<200){
      att++;
      s1=ri(-9,7); s2=s1+pick([2,4,6,8,10,12]);
      if(s2>9) continue;
      if((a*(s1+s2))%2!==0) continue;
      break;
    }
    var c=a*(s2-s1)/2, b=-a*(s1+s2)/2;
    var key="\\("+u6SetStr([s1,s2])+"\\)";
    var dis=["\\("+u6SetStr([s2])+"\\)", "\\("+u6SetStr([-s2,-s1])+"\\)", "No solution"];
    if(s1===-s2) dis[1]="\\("+u6SetStr([s1-1,s2+1])+"\\)";
    return mcq("Solve \\("+u6AbsArg(a,b)+" = "+c+"\\).",
      key, dis,
      "An absolute value equation splits into two cases, because the expression inside the bars can equal \\("+c+"\\) or \\(-"+c+"\\):"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= "+c+" \\\\ "+(a===1?"x":a+"x")+" &= "+(c-b)+" \\\\ x &= "+s2+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= -"+c+" \\\\ "+(a===1?"x":a+"x")+" &= "+(-c-b)+" \\\\ x &= "+s1+" \\end{aligned} \\]"+
      "Both values satisfy the original equation, so the solution set is "+key+".",
      {fam:fam, a:a, b:b, c:c, sols:[s1,s2]});
  }
  var bdPairs=[[3,3],[4,2],[4,5],[5,1],[5,4],[6,3],[7,2],[7,5],[8,1],[8,4],[9,3],[6,6],[9,6]];
  var bdp=pick(bdPairs), b2=bdp[0], d2=bdp[1];
  var v=b2-d2, w=-(b2+d2)/3;
  return mcq("Solve \\(\\left|x + "+b2+"\\right| = 2x + "+d2+"\\).",
    "\\("+u6SetStr([v])+"\\)",
    ["\\("+u6SetStr([w,v])+"\\)", "\\("+u6SetStr([w])+"\\)", "No solution"],
    "Split into two cases. Case 1, the inside is positive:"+
    "\\[ \\begin{aligned} x + "+b2+" &= 2x + "+d2+" \\\\ x &= "+v+" \\end{aligned} \\]"+
    "Case 2, the inside is negative:"+
    "\\[ \\begin{aligned} -\\left(x + "+b2+"\\right) &= 2x + "+d2+" \\\\ -x - "+b2+" &= 2x + "+d2+" \\\\ -3x &= "+(b2+d2)+" \\\\ x &= "+w+" \\end{aligned} \\]"+
    "Now check both candidates in the original equation. For \\(x = "+v+"\\): the left side is \\(\\left|"+(v+b2)+"\\right| = "+(v+b2)+"\\) and the right side is \\("+(2*v+d2)+"\\), so it works. For \\(x = "+w+"\\): the right side is \\(2("+w+") + "+d2+" = "+(2*w+d2)+"\\), which is negative, while an absolute value can never be negative, so \\("+w+"\\) is extraneous. The only solution is \\("+v+"\\)",
    {fam:fam, b:b2, d:d2, sols:[v], extra:w});
});

/* ---------- 4.6: solve an absolute value equation with a quadratic inside (L2) ---------- */
E("u6-solve-quadratic",6,["4.6"],2,"gen",function(){
  var fam=pick(["both-squares","one-square","linear-rhs","vertex-form"]);
  if(fam==="both-squares" || fam==="one-square"){
    var A, B, sols, dis;
    if(fam==="both-squares"){
      var pairs=[[36,16],[25,9],[49,25],[36,4],[64,36],[25,1],[49,9],[64,16],[81,49],[16,4],[81,25],[100,36]];
      var pr=pick(pairs), sBig=pr[0], sSmall=pr[1];
      A=(sBig+sSmall)/2; B=(sBig-sSmall)/2;
      var rB=Math.sqrt(sBig), rS=Math.sqrt(sSmall);
      sols=[-rB,-rS,rS,rB];
      dis=["\\("+u6SetStr([-rB,rB])+"\\)", "\\("+u6SetStr([-rS,rS])+"\\)", "\\("+u6SetStr([rS,rB])+"\\)"];
    } else {
      var combos=[[5,16],[10,25],[13,36],[8,25],[20,49],[12,36],[7,25],[11,49],[6,36],[14,64],[9,49],[15,81]];
      var cb=pick(combos); A=cb[0]; var s1q=cb[1]; B=s1q-A;
      var r1q=Math.sqrt(s1q);
      sols=[-r1q,r1q];
      dis=["\\("+u6SetStr([-r1q,r1q-1])+"\\)", "\\("+u6SetStr([r1q])+"\\)", "No solution"];
    }
    return mcq("Solve \\(\\left|x^2 - "+A+"\\right| = "+B+"\\).",
      "\\("+u6SetStr(sols)+"\\)", dis,
      "Split into two cases:"+
      "\\[ \\begin{aligned} x^2 - "+A+" &= "+B+" \\\\ x^2 &= "+(A+B)+" \\end{aligned} \\]"+
      (fam==="both-squares"
        ? "\\[ \\begin{aligned} x^2 - "+A+" &= -"+B+" \\\\ x^2 &= "+(A-B)+" \\end{aligned} \\]"+
          "The first case gives \\(x = \\pm "+Math.sqrt(A+B)+"\\) and the second gives \\(x = \\pm "+Math.sqrt(A-B)+"\\). All four values check in the original equation, so the solution set is \\("+u6SetStr(sols)+"\\)"
        : "\\[ \\begin{aligned} x^2 - "+A+" &= -"+B+" \\\\ x^2 &= "+(A-B)+" \\end{aligned} \\]"+
          "The second case asks for the square root of a negative number, so it gives no real solutions. The first case gives \\(x = \\pm "+Math.sqrt(A+B)+"\\), and both check in the original equation, so the solution set is \\("+u6SetStr(sols)+"\\)"),
      {fam:fam, A:A, B:B, sols:sols});
  }
  if(fam==="linear-rhs"){
    var pairsB=[[12,6,2],[12,4,3],[18,9,2],[20,10,2],[20,5,4],[24,12,2],[24,8,3],[24,6,4],[30,15,2],[30,10,3],[30,6,5],[36,18,2],[36,12,3],[40,20,2],[40,10,4],[42,21,2],[42,14,3],[48,24,2],[48,16,3],[48,12,4],[54,27,2],[54,18,3],[60,30,2],[60,20,3],[60,15,4],[56,28,2],[56,14,4],[72,36,2],[72,24,3],[72,18,4],[8,4,2],[16,8,2],[32,16,2],[32,8,4],[50,25,2],[50,10,5],[63,21,3],[63,9,7],[27,9,3]];
    var pb=pick(pairsB), A2=pb[0], r=pb[1], s=pb[2], B2=r-s;
    return mcq("Solve \\(\\left|x^2 - "+A2+"\\right| = "+B2+"x\\).",
      "\\("+u6SetStr([s,r])+"\\)",
      ["\\("+u6SetStr([-r,-s,s,r])+"\\)", "\\("+u6SetStr([-s,-r])+"\\)", "\\("+u6SetStr([r])+"\\)"],
      "Split into two cases:"+
      "\\[ \\begin{aligned} x^2 - "+A2+" &= "+B2+"x \\\\ x^2 - "+B2+"x - "+A2+" &= 0 \\\\ (x - "+r+")(x + "+s+") &= 0 \\\\ x &= "+r+" \\text{ or } x = -"+s+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} x^2 - "+A2+" &= -"+B2+"x \\\\ x^2 + "+B2+"x - "+A2+" &= 0 \\\\ (x - "+s+")(x + "+r+") &= 0 \\\\ x &= "+s+" \\text{ or } x = -"+r+" \\end{aligned} \\]"+
      "Now check the candidates, because the right side, \\("+B2+"x\\), must not be negative. At \\(x = -"+s+"\\) and \\(x = -"+r+"\\) the right side is negative, which an absolute value can never equal, so both are extraneous. At \\(x = "+s+"\\) and \\(x = "+r+"\\) both sides agree. The solution set is \\("+u6SetStr([s,r])+"\\)",
      {fam:fam, A:A2, B:B2, sols:[s,r], extra:[-r,-s]});
  }
  var pairsV=[[36,16],[25,9],[49,25],[36,4],[64,36],[25,1],[49,9],[64,16],[16,4],[100,36]];
  var pv=pick(pairsV), AV=(pv[0]+pv[1])/2, BV=(pv[0]-pv[1])/2;
  var rBV=Math.sqrt(pv[0]), rSV=Math.sqrt(pv[1]);
  var h=0; while(h===0) h=ri(-4,4);
  var solsV=[h-rBV, h-rSV, h+rSV, h+rBV];
  var hs=(h>0?" - "+h:" + "+(-h));
  return mcq("Solve \\(\\left|(x"+hs+")^2 - "+AV+"\\right| = "+BV+"\\).",
    "\\("+u6SetStr(solsV)+"\\)",
    ["\\("+u6SetStr([h-rBV,h+rBV])+"\\)", "\\("+u6SetStr([h-rSV,h+rSV])+"\\)", "\\("+u6SetStr([-rBV,-rSV,rSV,rBV])+"\\)"],
    "Split into two cases and solve for the squared bracket first:"+
    "\\[ \\begin{aligned} (x"+hs+")^2 - "+AV+" &= "+BV+" \\\\ (x"+hs+")^2 &= "+pv[0]+" \\\\ x"+hs+" &= \\pm "+rBV+" \\end{aligned} \\]"+
    "\\[ \\begin{aligned} (x"+hs+")^2 - "+AV+" &= -"+BV+" \\\\ (x"+hs+")^2 &= "+pv[1]+" \\\\ x"+hs+" &= \\pm "+rSV+" \\end{aligned} \\]"+
    "So \\(x = "+h+" \\pm "+rBV+"\\) or \\(x = "+h+" \\pm "+rSV+"\\), giving the solution set \\("+u6SetStr(solsV)+"\\) All four values check in the original equation.",
    {fam:fam, A:AV, B:BV, h:h, sols:solsV});
});

/* ---------- 4.5: problem solving with a linear absolute value model (L2) ---------- */
E("u6-abs-context",6,["4.5"],1,"gen",function(){
  var fam=pick(["bolt","bolt","storage","package"]);
  if(fam==="bolt"){
    var ctxs=[
      {n:"machine bolts", unit:"mm", Ts:[25,40,50,80,120], ts:[0.2,0.3,0.4,0.5,0.8]},
      {n:"cut dowels", unit:"mm", Ts:[150,200,300,450,600], ts:[0.5,1,1.5,2]},
      {n:"steel pins", unit:"mm", Ts:[12,18,24,36,48], ts:[0.1,0.2,0.3,0.5]}
    ];
    var ctx=pick(ctxs), T=pick(ctx.Ts), t=pick(ctx.ts), askMax=ri(0,1)===0;
    var ans=askMax ? Math.round((T+t)*100)/100 : Math.round((T-t)*100)/100;
    return numq("A workshop makes "+ctx.n+" with a target length of "+T+" "+ctx.unit+". A part is accepted when its length \\(x\\), in "+ctx.unit+", satisfies \\(\\left|x - "+T+"\\right| \\leq "+t+"\\). What is the <b>"+(askMax?"greatest":"least")+"</b> length, in "+ctx.unit+", that is accepted?",
      ans, 0.01,
      "The inequality says the length can differ from the target by at most "+t+" "+ctx.unit+":"+
      "\\[ \\begin{aligned} -"+t+" \\leq x - "+T+" &\\leq "+t+" \\\\ "+fmt(T-t)+" \\leq x &\\leq "+fmt(T+t)+" \\end{aligned} \\]"+
      "So the accepted lengths run from "+fmt(T-t)+" "+ctx.unit+" to "+fmt(T+t)+" "+ctx.unit+", and the "+(askMax?"greatest":"least")+" accepted length is <b>"+fmt(ans)+" "+ctx.unit+"</b>.",
      {fam:fam, ctx:ctx.n, T:T, t:t, askMax:askMax});
  }
  if(fam==="storage"){
    var ctxs2=[
      {n:"A cold-storage room for fish", S:2, ds:[1,1.5,2]},
      {n:"A vaccine fridge", S:4, ds:[1,1.5,2]},
      {n:"A greenhouse", S:21, ds:[2,2.5,3]},
      {n:"A server room", S:20, ds:[1.5,2,3]}
    ];
    var ctx2=pick(ctxs2), S2=ctx2.S, d2v=pick(ctx2.ds), askMax2=ri(0,1)===0;
    var ans2=askMax2 ? S2+d2v : S2-d2v;
    return numq(ctx2.n+" must be kept within "+fmt(d2v)+" °C of "+S2+" °C. The allowed temperatures \\(T\\), in °C, satisfy \\(\\left|T - "+S2+"\\right| \\leq "+fmt(d2v)+"\\). What is the <b>"+(askMax2?"warmest":"coolest")+"</b> allowed temperature, in °C?",
      ans2, 0.01,
      "The temperature can sit at most "+fmt(d2v)+" °C away from "+S2+" °C in either direction:"+
      "\\[ \\begin{aligned} -"+fmt(d2v)+" \\leq T - "+S2+" &\\leq "+fmt(d2v)+" \\\\ "+fmt(S2-d2v)+" \\leq T &\\leq "+fmt(S2+d2v)+" \\end{aligned} \\]"+
      "So the "+(askMax2?"warmest":"coolest")+" allowed temperature is <b>"+fmt(ans2)+" °C</b>.",
      {fam:fam, ctx:ctx2.n, T:S2, t:d2v, askMax:askMax2});
  }
  var ctxs3=[
    {n:"bags of flour", W:1000, gs:[10,15,20,25]},
    {n:"bags of coffee beans", W:500, gs:[5,8,10]},
    {n:"boxes of nails", W:750, gs:[10,15,20]},
    {n:"jars of preserves", W:250, gs:[4,5,8]}
  ];
  var ctx3=pick(ctxs3), W3=ctx3.W, g3=pick(ctx3.gs), askMax3=ri(0,1)===0;
  var ans3=askMax3 ? W3+g3 : W3-g3;
  return numq("A packer fills "+ctx3.n+" labelled "+W3+" g. A bag is accepted when its mass \\(m\\), in grams, satisfies \\(\\left|m - "+W3+"\\right| \\leq "+g3+"\\). What is the <b>"+(askMax3?"heaviest":"lightest")+"</b> accepted mass, in grams?",
    ans3, 0.01,
    "The mass can differ from the labelled mass by at most "+g3+" g:"+
    "\\[ \\begin{aligned} -"+g3+" \\leq m - "+W3+" &\\leq "+g3+" \\\\ "+(W3-g3)+" \\leq m &\\leq "+(W3+g3)+" \\end{aligned} \\]"+
    "So the "+(askMax3?"heaviest":"lightest")+" accepted mass is <b>"+ans3+" g</b>.",
    {fam:fam, ctx:ctx3.n, T:W3, t:g3, askMax:askMax3});
});

/* ---------- 4.33 and 4.34: asymptotes, domain and range of a reciprocal function (L2) ---------- */
E("u6-recip-features",6,["4.33","4.34"],2,"gen",function(){
  var fam=pick(["va-linear","va-linear","va-quad","domain-range","point"]);
  if(fam==="va-linear"){
    var a=pick([1,2,3,-2,-3]), k=0;
    while(k===0) k=ri(-6,6);
    var b=-a*k;
    var key="\\(x = "+k+"\\)";
    var dis=["\\(x = "+(-k)+"\\)", "\\(x = "+b+"\\)", "\\(y = 0\\)"];
    if(b===k || b===-k) dis[1]="\\(x = "+(k+1)+"\\)";
    return mcq("What is the <b>vertical asymptote</b> of the graph of \\(y = \\frac{1}{"+u6Lin(a,b)+"}\\)?",
      key, dis,
      "A reciprocal function is undefined exactly where its denominator is zero, and that x-value is the vertical asymptote:"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= 0 \\\\ "+(a===1?"x":a+"x")+" &= "+(-b)+" \\\\ x &= "+k+" \\end{aligned} \\]"+
      "So the graph approaches the line \\(x = "+k+"\\) without ever reaching it. The horizontal asymptote is \\(y = 0\\), which describes the end behaviour, not a vertical line.",
      {fam:fam, a:a, b:b, va:k});
  }
  if(fam==="va-quad"){
    var r1=ri(-5,2), r2=r1+pick([2,3,4]);
    var S=r1+r2, P=r1*r2;
    return mcq("What are the <b>vertical asymptotes</b> of the graph of \\(y = \\frac{1}{"+u6Quad(1,-S,P)+"}\\)?",
      "\\(x = "+r1+"\\) and \\(x = "+r2+"\\)",
      ["\\(x = "+(-r1)+"\\) and \\(x = "+(-r2)+"\\)", "\\(x = "+r1+"\\) only", "There are no vertical asymptotes"],
      "Factor the denominator first: \\("+u6Quad(1,-S,P)+" = (x - ("+r1+"))(x - ("+r2+"))\\). The function is undefined where either factor is zero, at \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Each zero of the denominator gives a vertical asymptote, so there are two of them.",
      {fam:fam, r1:r1, r2:r2});
  }
  if(fam==="domain-range"){
    var a2=pick([1,2,3,-2]), k2=0;
    while(k2===0) k2=ri(-6,6);
    var b2=-a2*k2;
    function dr(d, rg){ return "Domain: all real numbers except \\(x = "+d+"\\); range: all real numbers except \\(y = "+rg+"\\)"; }
    return mcq("What are the <b>domain and range</b> of \\(y = \\frac{1}{"+u6Lin(a2,b2)+"}\\)?",
      dr(k2, 0), [dr(-k2, 0), dr(k2, 1), "Domain: all real numbers; range: all real numbers"],
      "The denominator is zero when \\("+u6Lin(a2,b2)+" = 0\\), at \\(x = "+k2+"\\), and the function is undefined there, so \\("+k2+"\\) is excluded from the domain. Every other x-value is allowed. The reciprocal of a real number is never 0, so \\(y = 0\\) is excluded from the range, and every other y-value does occur.",
      {fam:fam, a:a2, b:b2, va:k2});
  }
  var x0=ri(-5,5), y0=pick([2,4,5,10,-2,-4,-5,-10]), rev=ri(0,1)===0;
  function ptStr(x,y){ return "\\("+u6Pt(x,y)+"\\)"; }
  var frac1=(y0===2?"\\frac{1}{2}":y0===4?"\\frac{1}{4}":y0===5?"\\frac{1}{5}":y0===10?"\\frac{1}{10}":y0===-2?"-\\frac{1}{2}":y0===-4?"-\\frac{1}{4}":y0===-5?"-\\frac{1}{5}":"-\\frac{1}{10}");
  var recipDisp=frac1;
  function ptRaw(x,y){ return "("+x+", "+y+")"; }
  if(rev){
    return mcq("The point \\("+ptRaw(x0,recipDisp)+"\\) lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\). Which point lies on the graph of \\(y = f(x)\\)?",
      ptStr(x0,y0),
      ["\\("+ptRaw(x0,recipDisp)+"\\)", "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
      "A point \\((a, b)\\) on \\(y = \\frac{1}{f(x)}\\) has \\(b = \\frac{1}{f(a)}\\), so \\(f(a) = \\frac{1}{b}\\). Here \\(b = "+recipDisp+"\\), so \\(f("+x0+") = "+y0+"\\), and the corresponding point on the original function is "+ptStr(x0,y0)+". The x-coordinate does not change between the two graphs.",
      {fam:fam, x:x0, y:y0, rev:rev});
  }
  return mcq("The point "+ptStr(x0,y0)+" lies on the graph of \\(y = f(x)\\). Which point lies on the graph of the reciprocal function \\(y = \\frac{1}{f(x)}\\)?",
    "\\("+ptRaw(x0,recipDisp)+"\\)",
    [ptStr(x0,y0), "\\("+ptRaw(recipDisp,x0)+"\\)", ptStr(x0,-y0)],
    "A point \\((a, b)\\) on \\(y = f(x)\\) gives the value \\(f(a) = "+y0+"\\). On the reciprocal function the same x-value appears with the reciprocal of the y-value: \\(\\frac{1}{"+y0+"} = "+recipDisp+"\\). So the corresponding point is \\("+ptRaw(x0,recipDisp)+"\\)",
    {fam:fam, x:x0, y:y0, rev:rev});
});

/* ---------- 4.35: invariant points of a function and its reciprocal (L2) ---------- */
E("u6-invariant-points",6,["4.35"],2,"gen",function(){
  var fam=pick(["linear","linear","quad-a2","quad-k1"]);
  if(fam==="linear"){
    var a=pick([1,2,-1,-2]);
    var x1=ri(-6,6);
    var b=1-a*x1, x2=x1-2/a;
    var key=u6PtSet([[x1,1],[x2,-1]]);
    var dis=[u6PtSet([[x1,-1],[x2,1]]), u6PtSet([[x1,1],[x1,-1]]), u6PtSet([[-x1,1],[-x2,-1]])];
    if(x1===0 || x2===0 || x2===-x1) dis[2]=u6PtSet([[x1+1,1],[x2+1,-1]]);
    return mcq("What are the <b>invariant points</b> of \\(f(x) = "+u6Lin(a,b)+"\\) and its reciprocal function \\(y = \\frac{1}{f(x)}\\)?",
      "\\("+key+"\\)", dis.map(function(s){ return "\\("+s+"\\)"; }),
      "Invariant points are the points the two graphs share, where \\(f(x) = \\frac{1}{f(x)}\\). That happens when \\(f(x) = 1\\) or \\(f(x) = -1\\):"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= 1 \\\\ "+(a===1?"x":a+"x")+" &= "+(1-b)+" \\\\ x &= "+x1+" \\end{aligned} \\]"+
      "\\[ \\begin{aligned} "+u6Lin(a,b)+" &= -1 \\\\ "+(a===1?"x":a+"x")+" &= "+(-1-b)+" \\\\ x &= "+x2+" \\end{aligned} \\]"+
      "So the invariant points are \\("+key+"\\), where the graphs cross.",
      {fam:fam, a:a, b:b, pts:[[x1,1],[x2,-1]]});
  }
  if(fam==="quad-a2"){
    var h=ri(-4,4);
    var key2=u6PtSet([[h-1,1],[h,-1],[h+1,1]]);
    var dis2=[u6PtSet([[h-1,-1],[h,1],[h+1,-1]]), u6PtSet([[h-1,1],[h+1,1]]), u6PtSet([[h-2,1],[h,-1],[h+2,1]])];
    return mcq("What are the <b>invariant points</b> of \\(f(x) = 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1\\) and its reciprocal function?",
      "\\("+key2+"\\)", dis2.map(function(s){ return "\\("+s+"\\)"; }),
      "Invariant points satisfy \\(f(x) = 1\\) or \\(f(x) = -1\\). For \\(f(x) = 1\\):"+
      "\\[ \\begin{aligned} 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1 &= 1 \\\\ 2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 &= 2 \\\\ (x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 &= 1 \\\\ x &= "+(h-1)+" \\text{ or } x = "+(h+1)+" \\end{aligned} \\]"+
      "For \\(f(x) = -1\\): \\(2(x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 - 1 = -1\\) gives \\((x"+(h>0?" - "+h:h<0?" + "+(-h):"")+")^2 = 0\\), so \\(x = "+h+"\\). The invariant points are \\("+key2+"\\).",
      {fam:fam, h:h, pts:[[h-1,1],[h,-1],[h+1,1]]});
  }
  var h3=ri(-5,5);
  return mcq("What are the <b>invariant points</b> of \\(f(x) = (x"+(h3>0?" - "+h3:h<0?" + "+(-h3):"")+")^2 + 1\\) and its reciprocal function?",
    "\\("+u6PtSet([[h3,1]])+"\\)",
    ["\\("+u6PtSet([[h3,-1]])+"\\)", "\\("+u6PtSet([[h3-1,1],[h3+1,1]])+"\\)", "There are no invariant points."],
    "Invariant points satisfy \\(f(x) = 1\\) or \\(f(x) = -1\\). The squared part is never negative, so \\(f(x) \\geq 1\\) for every \\(x\\); the value \\(-1\\) never occurs. For \\(f(x) = 1\\), the squared part must be zero, so \\(x = "+h3+"\\), giving the single invariant point \\("+u6PtSet([[h3,1]])+"\\).",
    {fam:fam, h:h3, pts:[[h3,1]]});
});

/* ---------- 4.7: identify the error in a worked solution (L3, var) ----------
   Options state error descriptions, so the plausible-error space for each
   classic mistake is a fixed variant set rather than a generator. */
E("u6-error-analysis",6,["4.7"],3,"var",varset([
  function(){
    return mcq("A student solves \\(-2\\left|x - 3\\right| = 10\\) by first rewriting the left side as \\(\\left|-2x + 6\\right|\\), then splitting into cases. Which statement identifies the <b>error</b>?",
      "Multiplying through the absolute value is not valid. The coefficient -2 multiplies the whole absolute value, so the first move should be to divide both sides by -2 and get \\(\\left|x - 3\\right| = -5\\), which has no solution.",
      ["There is no error in the work. Distributing a negative number through the bars gives an equivalent equation, so rewriting \\(-2\\left|x - 3\\right|\\) as \\(\\left|-2x + 6\\right|\\) is a valid first step and the cases that follow from it are right.",
       "The error is in the splitting step. The cases should be \\(-2x + 6 = 10\\) and \\(-2x + 6 = -10\\), which the student did next, and solving those two cases gives \\(x = -2\\) and \\(x = 8\\) as the reported solutions of the equation.",
       "The only error is the arithmetic inside the bars: -2 multiplied by -3 gives -6, not 6, so the left side should have been \\(\\left|-2x - 6\\right|\\), and splitting that gives the two cases \\(-2x - 6 = 10\\) and \\(-2x - 6 = -10\\)."],
      "An absolute value is not a bracket: multiplying by a constant outside the bars does not distribute inside them, because \\(-2\\left|x - 3\\right|\\) and \\(\\left|-2x + 6\\right|\\) take different values (try \\(x = 0\\): they give -6 and 6). Dividing by -2 isolates the absolute value as \\(\\left|x - 3\\right| = -5\\), and since an absolute value is never negative, the equation has no solution.",
      {err:"distribute"});
  },
  function(){
    return mcq("A student solves \\(\\left|x - 3\\right| = 8\\) by writing the two cases \\(x - 3 = 8\\) and \\(-x - 3 = 8\\), and reports the solutions 11 and -11. Which statement identifies the <b>error</b>?",
      "The second case negates only the first term. It should negate the whole expression: \\(-(x - 3) = 8\\), that is \\(-x + 3 = 8\\), which gives \\(x = -5\\), not -11.",
      ["There is no error in the work: both reported solutions satisfy the original equation when they are substituted back into it and checked carefully.",
       "The error is in the first case: it should be \\(x + 3 = 8\\) rather than \\(x - 3 = 8\\), which gives \\(x = 5\\) as the first of the two reported solutions.",
       "The only error is the sign of the constant in the second case: -3 divided by -1 is 3, so the second solution is positive 11, and the reported -11 has the wrong sign."],
      "Splitting an absolute value equation means the entire expression inside the bars takes both signs: \\(x - 3 = 8\\) or \\(-(x - 3) = 8\\). Writing \\(-x - 3\\) negates only the \\(x\\), leaving the \\(- 3\\) untouched. Solving the correct second case gives \\(x = -5\\), which checks: \\(\\left|-5 - 3\\right| = 8\\). The reported -11 fails the check: \\(\\left|-11 - 3\\right| = 14\\).",
      {err:"negate"});
  },
  function(){
    return mcq("A student solves \\(\\left|x^2 - 4\\right| = 3x\\), splits into cases, and reports all four values -4, -1, 1 and 4 as the solutions. Which statement identifies the <b>error</b>?",
      "The candidates were never checked. At \\(x = -4\\) and \\(x = -1\\), the right side \\(3x\\) is negative and cannot equal an absolute value, so both are extraneous; only 1 and 4 are solutions.",
      ["There is no error in the work. Two cases arise from the bars, and each case is a quadratic with two roots, so four solutions are expected and all four of the reported values stand.",
       "The error is algebraic: the two case equations are \\(x^2 - 4 = 3x\\) and \\(x^2 - 4 = -3x\\), and neither of these equations has integer roots among its solutions at all.",
       "The only error is a missing fifth solution at \\(x = 0\\), where the two sides of the equation come closest to each other, so the reported list is incomplete rather than wrong in itself."],
      "Splitting gives candidates, not solutions. Every candidate must be checked in the original equation, because the right side can be negative for negative \\(x\\), and a negative number can never equal an absolute value. Checking: \\(x = 4\\) gives \\(12 = 12\\); \\(x = 1\\) gives \\(3 = 3\\); \\(x = -1\\) gives \\(3 = -3\\), false; \\(x = -4\\) gives \\(12 = -12\\), false. So the solution set is \\(\\{1, 4\\}\\)",
      {err:"extraneous"});
  },
  function(){
    return mcq("A student solves \\(\\left|2x - 1\\right| = 7\\) by writing only the case \\(2x - 1 = 7\\), and reports the single solution \\(x = 4\\). Which statement identifies the <b>error</b>?",
      "Only one of the two cases was solved. The number 7 is a distance from zero, so the inside can equal 7 or -7; the missing case \\(2x - 1 = -7\\) gives a second solution, \\(x = -3\\).",
      ["There is no error in the work. An absolute value equation has one case for each side of the equation, and only the right side varies here, so one case is enough for it.",
       "The error is that 7 should first be split into 7 and -7 on both sides, as in \\(\\left|2x - 1\\right| = 7\\) and \\(\\left|2x - 1\\right| = -7\\), giving four cases to solve instead of the single case the student wrote.",
       "The only error is arithmetic in the case shown: 7 plus 1 is 8, and 8 divided by 2 is 4, so the answer given is correct and the solution is complete as it stands in the work."],
      "The equation says the expression \\(2x - 1\\) is at distance 7 from zero, and two numbers sit at that distance: 7 and -7. Both cases must be solved. The second case gives \\(2x = -6\\), so \\(x = -3\\), and it checks: \\(\\left|2(-3) - 1\\right| = \\left|-7\\right| = 7\\). The full solution set is \\(\\{-3, 4\\}\\)",
      {err:"onecase"});
  }
]));

/* ---------- 4.8: recognize and justify when an equation has no solution (L3) ---------- */
E("u6-no-solution",6,["4.8"],3,"gen",function(){
  var fam=pick(["negative-rhs","parameter","quad-inside"]);
  if(fam==="negative-rhs"){
    var a=pick([1,2,3]), b=ri(-8,8), c=ri(2,9);
    return mcq("Which statement correctly describes the solutions of \\("+u6AbsArg(a,b)+" = -"+c+"\\)?",
      "No solution. The left side is an absolute value, so it is never negative, while the right side is negative.",
      ["Two solutions, found by solving \\("+u6Lin(a,b)+" = -"+c+"\\) and \\("+u6Lin(a,b)+" = "+c+"\\), one from each of the two cases that arise here.",
       "One solution, where the graph of \\(y = "+u6AbsArg(a,b)+"\\) touches the line \\(y = -"+c+"\\) at its vertex.",
       "Every real number is a solution, because absolute value makes both sides match in size."],
      "The graph of \\(y = "+u6AbsArg(a,b)+"\\) is a V lying on and above the x-axis, because an absolute value is a distance and distances are never negative. The line \\(y = -"+c+"\\) lies entirely below the x-axis, so the graphs never meet and the equation has no solution. Splitting into cases cannot rescue it: both case equations would claim a distance equals a negative number.",
      {fam:fam, a:a, b:b, c:c, ans:"none"});
  }
  if(fam==="parameter"){
    var ask=pick(["none","one","two"]);
    var a2=pick([1,2,3]), b2=ri(-8,8);
    var keyC=(ask==="none"?"\\(m < 0\\)":ask==="one"?"\\(m = 0\\)":"\\(m > 0\\)");
    var poolC=["\\(m < 0\\)","\\(m = 0\\)","\\(m > 0\\)","\\(m \\neq 0\\)"];
    var disC=poolC.filter(function(s){ return s!==keyC; });
    var desc=(ask==="none"?"no solution":ask==="one"?"exactly one solution":"two solutions");
    return mcq("For which values of \\(m\\) does \\("+u6AbsArg(a2,b2)+" = m\\) have <b>"+desc+"</b>?",
      keyC, disC,
      "Read the equation graphically. The left side is a V-shaped graph lying on and above the x-axis, and the right side is a horizontal line at height \\(m\\). The line meets the V twice when it is above the x-axis (\\(m > 0\\)), touches it once at the vertex when it is on the x-axis (\\(m = 0\\)), and misses it entirely when it is below (\\(m < 0\\)), because an absolute value is never negative. So "+desc+" occur exactly when "+keyC+".",
      {fam:fam, a:a2, b:b2, ask:ask});
  }
  var k=pick([1,2,3,5]), m=ri(1,8);
  return mcq("Which statement correctly describes the solutions of \\(\\left|x^2 + "+k+"\\right| = -"+m+"\\)?",
    "No solution. The expression inside the bars is positive for every \\(x\\), and its absolute value is even further from being negative.",
    ["Two solutions, found by setting \\(x^2 + "+k+" = -"+m+"\\) and \\(x^2 + "+k+" = "+m+"\\) and solving each of the two quadratics in turn, just as in the positive case.",
     "One solution when the variable is zero, where the inside of the bars takes its smallest value and the two sides come closest.",
     "Solutions exist but are not real numbers, so they are reported as imaginary values, written in the form \\(x = \\pm \\sqrt{"+(m+k)+"}\\,i\\)."],
    "Work by inspection: \\(x^2 \\geq 0\\), so \\(x^2 + "+k+" \\geq "+k+" > 0\\), and the absolute value of a positive number is that number, which is at least "+k+". The left side can therefore never equal the negative number \\(-"+m+"\\) and the equation has no solution. Splitting into cases produces a case with \\(x^2 = -"+(m+k)+"\\), which has no real solutions anyway.",
    {fam:fam, k:k, m:m, ans:"none"});
});

/* ---------- 4.36 and 4.34: recover the original function from its reciprocal graph (L3) ---------- */
E("u6-original-from-reciprocal",6,["4.36","4.34"],3,"gen",function(){
  var fam=pick(["quad-eq","quad-eq","quad-intercepts","linear-eq"]);
  if(fam==="quad-intercepts"){
    var r1=ri(-4,1), d=pick([2,4]), r2=r1+d;
    if(r2===0 || r1===0){ r1=-3; r2=r1+d; }
    var midQ=(r1+r2)/2, midVal=-4/(d*d);
    var fnI=function(x){ return 1/((x-r1)*(x-r2)); };
    var keyI="\\("+u6SetStr([r1,r2])+"\\)";
    var disI=["\\("+u6SetStr([-r1,-r2])+"\\)", "\\("+u6SetStr([midQ])+"\\)", "The graph of \\(f\\) has no x-intercepts."]; if(r1+r2===0) disI[0]="\\("+u6SetStr([r1-1,r2+1])+"\\)";
    var qI=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a quadratic function. What are the <b>x-intercepts</b> of the graph of \\(y = f(x)\\)?",
      keyI,
      disI,
      "Work backwards from the reciprocal graph. The dashed vertical lines are the vertical asymptotes of the reciprocal graph, at \\(x = "+r1+"\\) and \\(x = "+r2+"\\). An asymptote of the reciprocal sits exactly where the original function is zero, so those x-values are the x-intercepts of \\(f\\). The lowest point of the reciprocal graph, \\("+u6Pt(midQ,midVal)+"\\), lies between them, which matches a quadratic that dips below the axis between its intercepts.",
      {fam:fam, r1:r1, r2:r2});
    qI.figure=u6Plot(fnI, r1-3, r2+3, {y0:-3, y1:3, poles:[r1,r2], points:[[midQ,midVal]],
      labels:[{p:[midQ,midVal], t:u6Pt(midQ,midVal), dx:8, dy:14}]});
    return qI;
  }
  if(fam==="linear-eq"){
    var aL=pick([1,2,-1]), rL=0;
    while(rL===0) rL=ri(-5,5);
    var fnL=function(x){ return 1/(aL*(x-rL)); };
    var px=rL+1, pv=1/aL, pvDisp=(pv===0.5?"\\frac{1}{2}":pv===-1?"-1":"1");
    var keyL="\\(f(x) = "+u6Lin(aL,-aL*rL)+"\\)";
    var disL=[
      "\\(f(x) = "+u6Lin(aL,aL*rL)+"\\)",
      "\\(f(x) = \\frac{1}{"+u6Lin(aL,-aL*rL)+"}\\)",
      "\\(f(x) = "+u6Lin(1,-rL)+"\\)"
    ];
    if(aL===1) disL[2]="\\(f(x) = "+u6Lin(2,-2*rL)+"\\)";
    var qL=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a linear function, with one point marked. Which function is \\(f\\)?",
      keyL, disL,
      "The single dashed vertical asymptote of the reciprocal graph is at \\(x = "+rL+"\\), so \\(f\\) is zero there: \\(f(x) = a(x - ("+rL+"))\\) for some leading coefficient \\(a\\). The marked point on the reciprocal graph is \\("+u6Pt(px,pv)+"\\), so \\(f("+px+") = \\frac{1}{"+pvDisp+"} = "+aL+"\\). One unit across from the intercept, the original function has value \\(a\\), so \\(a = "+aL+"\\) and \\(f(x) = "+u6Lin(aL,-aL*rL)+"\\)",
      {fam:fam, a:aL, r:rL});
    qL.figure=u6Plot(fnL, rL-4, rL+4, {y0:-4, y1:4, poles:[rL], points:[[px,pv]],
      labels:[{p:[px,pv], t:u6Pt(px,pv), dx:8, dy:-8}]});
    return qL;
  }
  var aQ=pick([1,2]);
  var r1q=pick([-4,-3,-2,-1,1,2]), dQ=pick([2,4]), r2q=r1q+dQ;
  if(r2q===0){ dQ=(dQ===2?4:2); r2q=r1q+dQ; }
  var SQ=r1q+r2q, PQ=r1q*r2q, mid2=(r1q+r2q)/2;
  var fMid=aQ*(mid2-r1q)*(mid2-r2q), recMid=1/fMid;
  var recMidDisp=(recMid===-1?"-1":recMid===-0.5?"-\\frac{1}{2}":recMid===-0.25?"-\\frac{1}{4}":"-\\frac{1}{8}");
  var fnQ=function(x){ return 1/(aQ*(x-r1q)*(x-r2q)); };
  var keyQ="\\(f(x) = "+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"\\)";
  var candDisQ=[
    "\\(f(x) = "+u6Quad(aQ,aQ*SQ,aQ*PQ)+"\\)",
    "\\(f(x) = \\frac{1}{"+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"}\\)",
    "\\(f(x) = "+u6Quad(aQ,-aQ*SQ,-aQ*PQ)+"\\)",
    "\\(f(x) = "+u6Quad(aQ+1,-(aQ+1)*SQ,(aQ+1)*PQ)+"\\)"
  ];
  var disQ=candDisQ.filter(function(s){ return s!==keyQ; }).slice(0,3);
  var qQ=mcq("The graph shows \\(y = \\frac{1}{f(x)}\\), where \\(f\\) is a quadratic function, with one point marked. Which function is \\(f\\)?",
    keyQ, disQ,
    "The vertical asymptotes of the reciprocal graph are the dashed lines at \\(x = "+r1q+"\\) and \\(x = "+r2q+"\\), so \\(f\\) has x-intercepts there and looks like \\(f(x) = a(x - ("+r1q+"))(x - ("+r2q+"))\\). The marked point on the reciprocal graph is \\("+u6Pt(mid2,recMid)+"\\), so at \\(x = "+mid2+"\\) the original function has value \\(\\frac{1}{"+recMidDisp+"} = "+fMid+"\\). Trying \\(a = "+aQ+"\\) gives \\("+aQ+"("+mid2+" - ("+r1q+"))("+mid2+" - ("+r2q+")) = "+fMid+"\\), which matches, so \\(f(x) = "+u6Quad(aQ,-aQ*SQ,aQ*PQ)+"\\)",
    {fam:fam, a:aQ, r1:r1q, r2:r2q});
  qQ.figure=u6Plot(fnQ, r1q-3, r2q+3, {y0:-3, y1:3, poles:[r1q,r2q], points:[[mid2,recMid]],
    labels:[{p:[mid2,recMid], t:u6Pt(mid2,recMid), dx:8, dy:14}]});
  return qQ;
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u6-pk-number-line-distance: authored micro-item (authored:number-line-distance),
   written for this tranche. */
E("u6-pk-number-line-distance",6,["1.7"],1,"gen",function(){
  var mode=ri(0,1),a,b;
  if(mode===0){ a=-ri(2,12); b=ri(1,12); }
  else { a=-(ri(1,9)+0.5); b=ri(1,9)+0.5; }
  var d=b-a, as=fmt(a), bs=fmt(b), ds=fmt(d);
  return numq("Two points are marked on a number line at \\("+as+"\\) and \\("+bs+"\\). What is the distance between the two points?",
    d,0.01,
    "Distance is always positive, so take the positive difference of the two positions: \\("+bs+" - ("+as+") = "+ds+"\\). The distance is <b>"+ds+"</b>.",
    {mode:mode,a:a,b:b,ans:d});
}, ["Distance is never negative.", "Subtract the smaller position from the larger one."]);

/* u6-pk-domain-range: borrowed verbatim from math-1201 entry u4-domain-range (math-1201:4.10). */
E("u6-pk-domain-range",6,["4.33"],1,"gen",function(){
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

/* u6-pk-graph-data: borrowed verbatim from math-1201 entry u4-graph-data (math-1201:4.9). */
E("u6-pk-graph-data",6,["4.2"],1,"gen",function(){
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

/* u6-pk-eval-function: borrowed verbatim from math-1201 entry u4-eval-function (math-1201:4.47). */
E("u6-pk-eval-function",6,["4.2"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* u6-pk-fn-notation: borrowed verbatim from math-1201 entry u4-fn-notation (math-1201:4.45). */
E("u6-pk-fn-notation",6,["4.33"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* u6-pk-sort-numbers: borrowed verbatim from math-1201 entry u2-sort-numbers (math-1201:1.18). */
E("u6-pk-sort-numbers",6,["1.8"],1,"gen",function(){
  function ratItem(){
    var kind=ri(1,5);
    if(kind===1){var p=ri(1,15),q=pick([2,3,4,5,6,7,8,9]),tg=0;while(u2gcd(p,q)!==1&&tg<60){p=ri(1,15);q=pick([2,3,4,5,6,7,8,9]);tg++;}return {str:"\\("+FR(p,q)+"\\)",rat:true};}
    if(kind===2){return {str:""+pick([0.5,1.25,2.75,3.4,0.125,5.6,7.05,0.9]),rat:true};}
    if(kind===3){var r=ri(2,12);return {str:"\\(\\sqrt{"+(r*r)+"}\\)",rat:true};}
    if(kind===4){return {str:"\\(0.\\overline{"+ri(2,9)+"}\\)",rat:true};}
    var r5=ri(2,6);return {str:"\\(\\sqrt[3]{"+(r5*r5*r5)+"}\\)",rat:true};
  }
  function irrItem(){
    var kind=ri(1,4);
    if(kind===1){var n=ri(2,60);var t=0;while(u2isSq(n)&&t<100){n=ri(2,60);t++;}return {str:"\\(\\sqrt{"+n+"}\\)",rat:false};}
    if(kind===2){var n2=ri(2,80);var t2=0;while(u2isCu(n2)&&t2<100){n2=ri(2,80);t2++;}return {str:"\\(\\sqrt[3]{"+n2+"}\\)",rat:false};}
    if(kind===3){return {str:"\\(\\pi\\)",rat:false};}
    return {str:pick(["1.01001000100001...","2.12112111211112...","0.123456789101112...","3.23223222322223..."]),rat:false};
  }
  var mode=ri(1,3);
  if(mode===3){
    function rawOf(it){var s=it.str;if(s.slice(0,2)==="\\("&&s.slice(-2)==="\\)")return s.slice(2,-2);return s;}
    function fragSet(wantBad){
      var frags=[],seenF={},g=0;
      while(frags.length<3&&g<300){g++;
        var it=(wantBad&&frags.length===2)?irrItem():ratItem();
        var f=rawOf(it);
        if(seenF[f])continue;seenF[f]=1;frags.push(f);}
      return shuffle(frags);
    }
    function setStr(frags){return "\\(\\{"+frags.join(", ")+"\\}\\)";}
    var good=setStr(fragSet(false));
    var bads=[],guard=0;
    while(bads.length<3&&guard<200){guard++;var bs=setStr(fragSet(true));if(bs!==good&&bads.indexOf(bs)<0)bads.push(bs);}
    return mcq("Which set contains <b>only</b> rational numbers?",
      good,bads,
      "A rational number can be written as a ratio of integers, which includes fractions, terminating decimals, repeating decimals, and roots of perfect powers. Roots of numbers that are not perfect powers, \\(\\pi\\), and decimals that go on without repeating are irrational. Only one set avoids all of those. The set with only rational numbers is <b>"+good+"</b>.",
      {mode:mode,keyStr:good});
  }
  var wantIrr=(mode===1);
  var items=[],seen={};
  function addItem(it){if(!it||seen[it.str])return;seen[it.str]=1;items.push(it);}
  if(wantIrr){
    addItem(irrItem());
    var g1=0;while(items.length<4&&g1<300){g1++;addItem(ratItem());}
  }else{
    addItem(ratItem());
    var g2=0;while(items.length<4&&g2<300){g2++;addItem(irrItem());}
  }
  var target=items.filter(function(x){return x.rat===!wantIrr;})[0];
  var others=items.filter(function(x){return x!==target;}).map(function(x){return x.str;});
  return mcq(wantIrr?"Which number is <b>irrational</b>?":"Which number is <b>rational</b>?",
    target.str,others,
    "Rational numbers are exactly the numbers that can be written as a ratio of two integers: fractions, terminating or repeating decimals, and roots that come out whole. A root of a number that is not a perfect power, the number \\(\\pi\\), and a decimal that continues without repeating are irrational. The "+(wantIrr?"irrational":"rational")+" number in the list is <b>"+target.str+"</b>.",
    {mode:mode,items:items,keyStr:target.str});
});

/* u6-pk-approx: borrowed verbatim from math-1201 entry u2-approx (math-1201:1.20). */
E("u6-pk-approx",6,["1.8"],2,"gen",function(){
  var roll=Math.random();
  if(roll<0.6){
    var n=ri(2,600),t=0;while(u2isSq(n)&&t<200){n=ri(2,600);t++;}
    var lo=Math.floor(Math.sqrt(n)),ans=Math.round(Math.sqrt(n)*10)/10;
    var dLo=n-lo*lo,dHi=(lo+1)*(lo+1)-n;
    return numq("Give the approximate value of \\(\\sqrt{"+n+"}\\) to one decimal place.",
      ans,0.051,
      "Locate \\(\\sqrt{"+n+"}\\) between consecutive perfect squares: \\["+
      "\\begin{aligned} "+(lo*lo)+" &< "+n+" < "+((lo+1)*(lo+1))+" \\\\ "+lo+" &< \\sqrt{"+n+"} < "+(lo+1)+" \\end{aligned} \\]"+
      " Since \\("+n+"\\) is closer to \\("+(dLo<dHi?(lo*lo):((lo+1)*(lo+1)))+"\\), the root is closer to \\("+(dLo<dHi?lo:(lo+1))+"\\), and checking tenths gives \\(\\sqrt{"+n+"} \\approx "+ans+"\\). On a number line it sits between \\("+lo+"\\) and \\("+(lo+1)+"\\), nearer \\("+(dLo<dHi?lo:(lo+1))+"\\). The approximate value is <b>\\("+ans+"\\)</b>.",
      {mode:2,n:n,ans:ans});
  }
  if(roll<0.9){
    var n3=ri(2,600),t3=0;while(u2isCu(n3)&&t3<200){n3=ri(2,600);t3++;}
    var lo3=Math.floor(Math.cbrt(n3)),ans3=Math.round(Math.cbrt(n3)*10)/10;
    var dLo3=n3-lo3*lo3*lo3,dHi3=(lo3+1)*(lo3+1)*(lo3+1)-n3;
    return numq("Give the approximate value of \\(\\sqrt[3]{"+n3+"}\\) to one decimal place.",
      ans3,0.051,
      "Locate \\(\\sqrt[3]{"+n3+"}\\) between consecutive perfect cubes: \\["+
      "\\begin{aligned} "+(lo3*lo3*lo3)+" &< "+n3+" < "+((lo3+1)*(lo3+1)*(lo3+1))+" \\\\ "+lo3+" &< \\sqrt[3]{"+n3+"} < "+(lo3+1)+" \\end{aligned} \\]"+
      " Since \\("+n3+"\\) is closer to \\("+(dLo3<dHi3?(lo3*lo3*lo3):((lo3+1)*(lo3+1)*(lo3+1)))+"\\), the root is closer to \\("+(dLo3<dHi3?lo3:(lo3+1))+"\\), and checking tenths gives \\(\\sqrt[3]{"+n3+"} \\approx "+ans3+"\\). On a number line it sits between \\("+lo3+"\\) and \\("+(lo3+1)+"\\). The approximate value is <b>\\("+ans3+"\\)</b>.",
      {mode:3,n:n3,ans:ans3});
  }
  var k=ri(2,9),ansP=Math.round(k*Math.PI*100)/100;
  return numq("Give the approximate value of \\("+k+"\\pi\\) to two decimal places.",
    ansP,0.011,
    "Use \\(\\pi \\approx 3.14159\\): \\["+
    "\\begin{aligned} "+k+"\\pi &\\approx "+k+" \\times 3.14159 \\\\ &\\approx "+ansP+" \\end{aligned} \\]"+
    " The approximate value is <b>\\("+ansP+"\\)</b>.",
    {mode:1,k:k,ans:ansP});
});

/* u6-pk-reciprocal-values: authored micro-item (authored:reciprocal-of-a-value),
   written for this tranche. */
E("u6-pk-reciprocal-values",6,["4.33"],1,"gen",function(){
  var fr=function(p,q){return "\\(\\frac{"+p+"}{"+q+"}\\)";};
  var frI=function(p,q){return "\\frac{"+p+"}{"+q+"}";};
  var mode=ri(0,2);
  if(mode===0){
    var n=pick([-10,-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9,10]);
    var keyIn= n>0 ? frI(1,n) : "-"+frI(1,-n);
    var oppIn= n>0 ? "-"+frI(1,n) : frI(1,-n);
    return mcq("A function table gives \\(f(3) = "+n+"\\). What is \\(\\frac{1}{f(3)}\\)?",
      "\\("+keyIn+"\\)",
      ["\\("+n+"\\)","\\("+(-n)+"\\)","\\("+oppIn+"\\)"],
      "The reciprocal of a number flips it over and keeps its sign: \\(\\frac{1}{"+n+"} = "+keyIn+"\\). A small number has a large reciprocal, and a negative number has a negative reciprocal. The answer is <b>\\("+keyIn+"\\)</b>.",
      {mode:"integer",n:n});
  }
  if(mode===1){
    var k=pick([2,3,4,5,6,8,10]);
    return mcq("A function table gives \\(f(5) = "+frI(1,k)+"\\). What is \\(\\frac{1}{f(5)}\\)?",
      "\\("+k+"\\)",
      [fr(1,k),"\\("+(-k)+"\\)",fr(1,k*k)],
      "The reciprocal of \\("+frI(1,k)+"\\) flips it over: \\(\\frac{1}{1/"+k+"} = "+k+"\\). A number smaller than 1 has a reciprocal larger than 1. The answer is <b>\\("+k+"\\)</b>.",
      {mode:"unit-fraction",k:k});
  }
  var pair=pick([[2,3],[2,5],[3,4],[3,5],[4,5],[2,7],[3,7],[5,6],[5,8],[4,7]]);
  var p=pair[0],q=pair[1];
  return mcq("A function table gives \\(f(2) = -"+frI(p,q)+"\\). What is \\(\\frac{1}{f(2)}\\)?",
    "\\(-"+frI(q,p)+"\\)",
    [fr(q,p),"\\(-"+frI(p,q)+"\\)",fr(p,q)],
    "The reciprocal of \\(-"+frI(p,q)+"\\) flips the fraction over and keeps the negative sign: the reciprocal is \\(-"+frI(q,p)+"\\). The answer is <b>\\(-"+frI(q,p)+"\\)</b>.",
    {mode:"fraction",p:p,q:q});
}, ["The reciprocal flips the number over.", "The sign does not change when you take a reciprocal."]);

/* PK tranche pass for Unit 6. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U6_FOR=["1.5","1.6","1.7","1.8","1.10","4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.33","4.34","4.35","4.36"];
var PKT_U6={
 "u6-pk-number-line-distance":{src:"authored:number-line-distance",group:"number-line-distance"},
 "u6-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u6-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u6-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u6-pk-fn-notation":{src:"math-1201:4.45",group:"function-notation"},
 "u6-pk-sort-numbers":{src:"math-1201:1.18",group:"real-numbers"},
 "u6-pk-approx":{src:"math-1201:1.20",group:"real-numbers"},
 "u6-pk-reciprocal-values":{src:"authored:reciprocal-of-a-value",group:"reciprocal-values"}
};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});
