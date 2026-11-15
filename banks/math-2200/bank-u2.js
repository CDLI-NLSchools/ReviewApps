// Math 2200 Unit 2 Quadratic Functions question bank
// Graphics pass Tranche 2 (November 12, 2026): figures attached
// attach-only from the builders ported into bank-helpers.js;
// u2-translations, u2-intercepts-count and u2-vertex-standard
// gained graphed read-off second arms under the Tranche 1b ruling
// (their original generators sit verbatim as arm 1).
// CRMARKS: u2-analyze-problem=3
// CRMARKS: u2-complete-square=2
// CRMARKS: u2-cts-reasoning=2
// CRMARKS: u2-error-complete-square=3
// CRMARKS: u2-evaluate-claim=4
// CRMARKS: u2-intercepts-count=2
// CRMARKS: u2-model-situation=3
// CRMARKS: u2-model-situation-evaluate=3
// CRMARKS: u2-translations=1
// CRMARKS: u2-vertex-read=1
// CRMARKS: u2-vertex-rule=3
// CRMARKS: u2-vertex-standard=2
// CRMARKS: u2-why-quadratic=2
// CRMARKS: u2-write-from-characteristics=3
/* ================= Unit 2: Quadratic Functions ================= */
/* ================= Unit 2: Quadratic Functions (MA2200.4.27 to 4.32, 4.37 to 4.47) =================
   Tranche 1, mid scope. All stems, contexts and values are original.
   Helpers are prefixed u2; entries register through E(...). */

/* ---------- u2 helpers ---------- */
function u2VS(a,p,q){ /* vertex form a(x - p)^2 + q as a string */
  var s=(a===1?"":a===-1?"-":""+a);
  if(p===0) s+="x^2";
  else s+="(x"+(p>0?" - "+p:" + "+(-p))+")^2";
  if(q>0) s+=" + "+q; else if(q<0) s+=" - "+(-q);
  return s;
}
function u2Std(a,b,c){ /* ax^2 + bx + c as a string */
  var s=(a===1?"x^2":a===-1?"-x^2":a+"x^2");
  if(b!==0) s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");
  if(c!==0) s+=(c>0?" + ":" - ")+Math.abs(c);
  return s;
}
function u2QuadB(B){ /* x^2 + Bx as a string, B nonzero */
  return "x^2"+(B>0?" + ":" - ")+(Math.abs(B)===1?"x":Math.abs(B)+"x");
}
function u2JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u2Pair(x,y){ return "\\(("+x+", "+y+")\\)"; }
function u2Plot(fn,x0,x1,o){ /* axes-and-curve SVG, y-range fitted from samples and capped */
  o=o||{}; var W=440,H=250,pad=26,i,x,y,mn=1e18,mx=-1e18;
  for(i=0;i<=200;i++){ x=x0+(x1-x0)*i/200; y=fn(x); if(isFinite(y)){ if(y<mn)mn=y; if(y>mx)mx=y; } }
  var y1=(o.y1!==undefined)?o.y1:Math.min(90,Math.max(12,Math.ceil(mx*1.2)));
  var y0=(o.y0!==undefined)?o.y0:Math.max(-90,Math.min(-12,Math.floor(mn*1.2)));
  var X=function(v){ return pad+(v-x0)/(x1-x0)*(W-2*pad); };
  var Y=function(v){ return H-pad-(v-y0)/(y1-y0)*(H-2*pad); };
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gy=(y1-y0>90)?20:((y1-y0>45)?10:((y1-y0>22)?5:2)), gx, gyv;
  for(gx=Math.ceil(x0);gx<=x1;gx+=1){ out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+gx+'</text>'; }
  for(gyv=Math.ceil(y0/gy)*gy;gyv<=y1;gyv+=gy){ out+='<line x1="'+pad+'" y1="'+fmt(Y(gyv),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gyv),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(gyv!==0) out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gyv)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+gyv+'</text>'; }
  if(y0<0&&y1>0) out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0) out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  var pts=[], N=160;
  for(i=0;i<=N;i++){ x=x0+(x1-x0)*i/N; y=fn(x); if(y<y0)y=y0; if(y>y1)y=y1; pts.push(fmt(X(x),1)+","+fmt(Y(y),1)); }
  out+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="#0f766e" stroke-width="2.2"/>';
  (o.points||[]).forEach(function(p){ out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>'; });
  return out+'</svg>';
}
function u2EffectPanels(items){ /* parPanelsSVG panels for y = v x^2 items, at a common scale */
  function plain(d){ return d.replace(/\\frac\{(\d+)\}\{(\d+)\}/,"$1/$2"); }
  var maxAbs=1; items.forEach(function(it){ if(Math.abs(it.v)>maxAbs) maxAbs=Math.abs(it.v); });
  var yAbs=4*maxAbs, anyNeg=items.some(function(it){ return it.v<0; });
  var yr=anyNeg?[-yAbs*1.06, yAbs*1.06]:[-yAbs*0.16, yAbs*1.06];
  return parPanelsSVG(items.map(function(it){
    return {a:it.v, b:0, c:0, caption:(it.d===""?"y = x\u00B2":"y = "+plain(it.d)+"x\u00B2"), xrange:[-2,2], yrange:yr};
  }));
}

/* ---------- 4.29: effect of a on the width of y = ax^2 (L1) ---------- */
E("u2-effect-of-a",2,["4.29"],1,"gen",function(){
  var pool=[{d:"2",v:2},{d:"3",v:3},{d:"4",v:4},{d:"5",v:5},{d:"-2",v:-2},{d:"-3",v:-3},
            {d:"\\frac{1}{2}",v:0.5},{d:"\\frac{1}{3}",v:1/3},{d:"\\frac{1}{4}",v:0.25},
            {d:"\\frac{2}{3}",v:2/3},{d:"\\frac{3}{4}",v:0.75},{d:"\\frac{1}{5}",v:0.2}];
  if(ri(0,2)<2){ /* compare a set of three parabolas */
    var att=0, it1, it2;
    while(att<200){
      att++;
      it1=pick(pool); it2=pick(pool);
      if(Math.abs(it1.v)!==Math.abs(it2.v)) break;
    }
    var askWide=ri(0,1)===0;
    var items=[{d:"",v:1},{d:it1.d,v:it1.v},{d:it2.d,v:it2.v}];
    function eqOf(it){ return "\\(y = "+(it.d===""?"":it.d)+"x^2\\)"; }
    var target=items.slice().sort(function(m,n){ return askWide ? Math.abs(m.v)-Math.abs(n.v) : Math.abs(n.v)-Math.abs(m.v); })[0];
    var keyEq=eqOf(target);
    var dis=items.filter(function(it){ return eqOf(it)!==keyEq; }).map(eqOf);
    dis.push("All three parabolas are equally wide.");
    var absList=items.map(function(it){ var av=Math.abs(it.v); return "\\(\\left|"+(it.d===""?"1":it.d)+"\\right| "+(Number.isInteger(av*4)?"=":"\\approx")+" "+fmt(av,2)+"\\)"; }).join(", ");
    var qe1=mcq("The graphs of \\(y = x^2\\), \\(y = "+it1.d+"x^2\\) and \\(y = "+it2.d+"x^2\\) are drawn on the same axes. Which parabola is the <b>"+(askWide?"widest":"narrowest")+"</b>?",
      keyEq, dis,
      "Comparing parabolas of the form \\(y = ax^2\\), the width is decided by \\(\\left|a\\right|\\): the larger \\(\\left|a\\right|\\) is, the faster the values grow and the narrower the parabola; the smaller \\(\\left|a\\right|\\), the wider it is. Here the absolute values are "+absList+". So the "+(askWide?"widest":"narrowest")+" parabola is "+keyEq+". A negative value of \\(a\\) reflects a parabola in the x-axis but does not change its width.",
      {askWide:askWide, v1:it1.v, v2:it2.v});
    qe1.figure=u2EffectPanels(items);
    return qe1;
  }
  var it=pick(pool);
  var W=Math.abs(it.v)>1?"narrower":"wider", O=it.v>0?"opens upward":"opens downward";
  var W2=Math.abs(it.v)>1?"wider":"narrower", O2=it.v>0?"opens downward":"opens upward";
  function stmt(w,o){ return "It is "+w+" and "+o+"."; }
  var qe2=mcq("Compared with the graph of \\(y = x^2\\), how does the graph of \\(y = "+it.d+"x^2\\) differ?",
    stmt(W,O), [stmt(W2,O), stmt(W,O2), stmt(W2,O2)],
    "For \\(y = ax^2\\), compare \\(\\left|a\\right|\\) with 1 and check the sign of \\(a\\). Here \\(\\left|a\\right| = "+fmt(Math.abs(it.v),2)+"\\), which is "+(Math.abs(it.v)>1?"greater":"less")+" than 1, so the values of \\(y\\) change "+(Math.abs(it.v)>1?"faster":"more slowly")+" than for \\(y = x^2\\) and the parabola is "+W+". The coefficient is "+(it.v>0?"positive, so the parabola still opens upward.":"negative, so the parabola is reflected in the x-axis and opens downward."),
    {v:it.v});
  qe2.figure=u2EffectPanels([{d:"",v:1},it]);
  return qe2;
});

/* ---------- 4.30 and 4.31: translations from p and q (L1) ---------- */
E("u2-translations",2,["4.30","4.31"],1,"var",varset([
  function(){
  var fam=pick(["p","q","both"]);
  if(fam==="p"){
    var p=ri(2,8), sgn=pick([1,-1]);
    var form=sgn>0?"(x - "+p+")^2":"(x + "+p+")^2";
    var keyDir=sgn>0?"to the right":"to the left", altDir=sgn>0?"to the left":"to the right";
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form+"\\). How does the graph change?",
      "It shifts "+p+" units "+keyDir+".",
      ["It shifts "+p+" units "+altDir+".", "It shifts "+p+" units up.", "It shifts "+p+" units down."],
      "Replacing \\(x\\) by \\("+(sgn>0?"(x - "+p+")":"(x + "+p+")")+"\\) shifts every point of the graph "+p+" units "+keyDir+": the value in the brackets must reach the same size as before, so each point moves "+keyDir+" by "+p+". The sign inside the brackets points opposite to the direction of the shift.",
      {fam:fam, p:p, sgn:sgn});
  }
  if(fam==="q"){
    var q=ri(2,9), up=ri(0,1)===0;
    var form2=up?"x^2 + "+q:"x^2 - "+q;
    return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+form2+"\\). How does the graph change?",
      "It shifts "+q+" units "+(up?"up":"down")+".",
      ["It shifts "+q+" units "+(up?"down":"up")+".", "It shifts "+q+" units to the right.", "It shifts "+q+" units to the left."],
      "Adding a constant to the whole function moves every point straight up or down by that amount. Here "+(up?"\\(+"+q+"\\) is added, so each y-value grows by "+q+" and the graph shifts "+q+" units up.":"\\("+q+"\\) is subtracted, so each y-value drops by "+q+" and the graph shifts "+q+" units down."),
      {fam:fam, q:q, up:up});
  }
  var p2=ri(2,8), q2=ri(2,8), sp=pick([1,-1]), sq=pick([1,-1]);
  var H=sp>0?"to the right":"to the left", H2=sp>0?"to the left":"to the right";
  var V=sq>0?"up":"down", V2=sq>0?"down":"up";
  function st(h,v){ return "It shifts "+p2+" units "+h+" and "+q2+" units "+v+"."; }
  return mcq("The graph of \\(y = x^2\\) is transformed to the graph of \\(y = "+u2VS(1,sp*p2,sq*q2)+"\\). How does the graph change?",
    st(H,V), [st(H2,V), st(H,V2), st(H2,V2)],
    "The two changes act independently. Inside the brackets, \\((x "+(sp>0?"- ":"+ ")+p2+")\\) shifts the graph "+p2+" units "+H+" (the sign inside points opposite to the shift). The constant "+(sq>0?"+ "+q2:"- "+q2)+" added to the whole function shifts it "+q2+" units "+V+".",
    {fam:fam, p:p2, q:q2, sp:sp, sq:sq});
},
  function(){
    var fam=pick(["p","q","both"]);
    var P=0, Q=0;
    if(fam==="p"){ P=ri(2,8)*pick([1,-1]); }
    else if(fam==="q"){ Q=ri(2,9)*pick([1,-1]); }
    else { P=ri(2,8)*pick([1,-1]); Q=ri(2,8)*pick([1,-1]); }
    var H=P>0?"to the right":"to the left", H2=P>0?"to the left":"to the right";
    var V=Q>0?"up":"down", V2=Q>0?"down":"up";
    function st(h,v){ return "It shifts "+Math.abs(P)+" units "+h+" and "+Math.abs(Q)+" units "+v+"."; }
    var key, dis;
    if(fam==="p"){ key="It shifts "+Math.abs(P)+" units "+H+"."; dis=["It shifts "+Math.abs(P)+" units "+H2+".", "It shifts "+Math.abs(P)+" units up.", "It shifts "+Math.abs(P)+" units down."]; }
    else if(fam==="q"){ key="It shifts "+Math.abs(Q)+" units "+V+"."; dis=["It shifts "+Math.abs(Q)+" units "+V2+".", "It shifts "+Math.abs(Q)+" units to the right.", "It shifts "+Math.abs(Q)+" units to the left."]; }
    else { key=st(H,V); dis=[st(H2,V), st(H,V2), st(H2,V2)]; }
    var move=(P!==0?Math.abs(P)+" units "+H:"")+((P!==0&&Q!==0)?" and ":"")+(Q!==0?Math.abs(Q)+" units "+V:"");
    var qfig=mcq("The graph shows the parabola obtained by transforming the graph of \\(y = x^2\\). How has the graph changed?",
      key, dis,
      "The graph of \\(y = x^2\\) has its vertex at \\((0, 0)\\). The marked vertex of the shown graph is \\(("+P+", "+Q+")\\), so the graph has shifted "+move+".",
      {fam:fam, P:P, Q:Q});
    qfig.figure=parSVG(1,-2*P,P*P+Q,{labels:"values",marks:[{x:P,y:Q}]});
    return qfig;
  }
]));

/* ---------- 4.38: read the vertex from vertex form (L1) ---------- */
E("u2-vertex-read",2,["4.38"],1,"gen",function(){
  var a=pick([1,2,3,-1,-2,-3]);
  var p=0, q=0;
  while(p===0) p=ri(-6,6);
  while(q===0) q=ri(-6,6);
  var qv=mcq("What are the coordinates of the <b>vertex</b> of the graph of \\(y = "+u2VS(a,p,q)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,-q), u2Pair(-p,-q)],
    "In the form \\(y = a(x - p)^2 + q\\), the vertex is \\((p, q)\\): the squared part is zero when \\(x = "+p+"\\), and the value of the function there is \\("+q+"\\). A check on a graphing utility shows the turning point at "+u2Pair(p,q)+", confirming the read-off.",
    {a:a, p:p, q:q});
  qv.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qv;
});

/* ---------- 4.27: number of x-intercepts from a and q (L2) ---------- */
E("u2-intercepts-count",2,["4.27"],1,"var",varset([
  function(){
  var mode=pick(["two","two","one","none","none"]);
  var a=pick([1,2,3,-1,-2,-3]), q;
  if(mode==="one") q=0;
  else if(mode==="two"){ q=ri(1,9)*(a>0?-1:1); }
  else { q=ri(1,9)*(a>0?1:-1); }
  var key=mode==="two"?"Two x-intercepts":mode==="one"?"One x-intercept":"No x-intercepts";
  var dis=["Two x-intercepts","One x-intercept","No x-intercepts","More information is needed"].filter(function(s){ return s!==key; });
  var extrem=a>0?"minimum":"maximum";
  var sol;
  if(mode==="two"){
    sol="The vertex of the graph is \\((p, q)\\), so \\(q = "+q+"\\) is the "+extrem+" value of the function. Since \\(a = "+a+"\\) and the "+extrem+" value lies on the opposite side of the x-axis from the ends of the graph, the graph must cross the x-axis on both sides of the vertex: two x-intercepts. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  } else if(mode==="one"){
    sol="The vertex of the graph is \\((p, q)\\), and here \\(q = 0\\), so the vertex sits exactly on the x-axis. Since \\(a = "+a+"\\), the rest of the graph lies entirely on one side of the axis, so the graph touches the axis at the vertex and nowhere else: one x-intercept. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  } else {
    sol="The vertex of the graph is \\((p, q)\\), so \\(q = "+q+"\\) is the "+extrem+" value of the function. Since \\(a = "+a+"\\), the graph opens "+(a>0?"upward from a minimum":"downward from a maximum")+" that is already on the same side of the x-axis as the rest of the graph, so the graph never reaches the x-axis: no x-intercepts. The value of \\(p\\) only slides the graph sideways, so it cannot change the count.";
  }
  return mcq("A quadratic function is written as \\(y = a(x - p)^2 + q\\), with \\(a = "+a+"\\) and \\(q = "+q+"\\). How many <b>x-intercepts</b> does its graph have?",
    key, dis, sol, {a:a, q:q, mode:mode});
},
  function(){
    var a=pick([1,2,-1,-2,3,-3]), h=ri(-6,6), k=ri(-9,9);
    var cnt=(k===0)?1:(((a>0&&k<0)||(a<0&&k>0))?2:0);
    var mk=[];
    if(cnt===2){ var sd=Math.sqrt(-k/a); mk=[{x:h-sd,y:0},{x:h+sd,y:0}]; }
    else if(cnt===1){ mk=[{x:h,y:0}]; }
    var qfig=numq("How many x-intercepts does the parabola shown in the graph have?",
      cnt,0.011,
      "The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(a>0?"upward":"downward")+". "+(k===0?"The vertex sits right on the x-axis, so the graph touches it at exactly one point: <b>1</b> x-intercept.":(cnt===2?"The vertex is on the opposite side of the x-axis from the direction the parabola opens away from, so the graph must cross the axis twice: <b>2</b> x-intercepts.":"The vertex is on the same side of the x-axis as the opening, so the graph never reaches the axis: <b>0</b> x-intercepts.")),
      {a:a,h:h,k:k});
    qfig.figure=parSVG(a,-2*a*h,a*h*h+k,{labels:"values",marks:mk});
    return qfig;
  }
]));

/* ---------- 4.28: features of a graphed parabola in vertex form (L2) ---------- */
E("u2-graph-features",2,["4.28"],1,"gen",function(){
  var a=pick([1,2,-1,-2]);
  var p=0, q=0;
  while(p===0) p=ri(-4,4);
  while(q===0) q=ri(-4,4);
  var fn=function(x){ return a*(x-p)*(x-p)+q; };
  function feat(vx, vy, ax, geq, open){
    return "Vertex: \\(("+vx+", "+vy+")\\); axis of symmetry: \\(x = "+ax+"\\); range: \\(y "+(geq?"\\geq":"\\leq")+" "+vy+"\\); opens "+open;
  }
  var up=a>0;
  var key=feat(p, q, p, up, up?"upward":"downward");
  var d1=feat(-p, q, p, up, up?"upward":"downward");
  var d2=feat(p, q, p, !up, up?"upward":"downward");
  var d3=feat(p, q, p, up, up?"downward":"upward");
  var qq=mcq("The graph of \\(y = "+u2VS(a,p,q)+"\\) is shown. Which list of features matches the graph?",
    key, [d1, d2, d3],
    "Start from \\(y = x^2\\) and apply the transformations: the graph shifts "+(p>0?p+" units to the right":(-p)+" units to the left")+" and "+(q>0?q+" units up":(-q)+" units down")+(a===-1||a===1?"":", and the values are stretched by a factor of \\("+Math.abs(a)+"\\)")+(a<0?", and it is reflected in the x-axis":"")+". The vertex lands at \\(("+p+", "+q+")\\), the axis of symmetry is the vertical line through the vertex, \\(x = "+p+"\\), and because the graph opens "+(up?"upward, the smallest value is the vertex value, giving the range \\(y \\geq "+q+"\\)":"downward, the largest value is the vertex value, giving the range \\(y \\leq "+q+"\\)")+".",
    {a:a, p:p, q:q});
  qq.figure=u2Plot(fn, p-5, p+5, {points:[[p,q]]});
  return qq;
});

/* ---------- 4.32: vertex of a standard-form quadratic (L2) ---------- */
E("u2-vertex-standard",2,["4.32"],2,"var",varset([
  function(){
  var a=pick([1,2,3,-1,-2]);
  var p=0, q=0, att=0, b, c;
  while(att<200){
    att++;
    p=0; while(p===0) p=ri(-5,5);
    q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    var fneg=a*p*p - b*p + c; /* f(-p) */
    if(q!==c && fneg!==q && fneg!==c) break;
  }
  b=-2*a*p; c=a*p*p+q;
  var fneg2=a*p*p - b*p + c;
  var sub=(a===1?"":a===-1?"-":""+a)+"("+p+")^2"+(b>0?" + "+b+"("+p+")":b<0?" - "+(-b)+"("+p+")":"")+(c>0?" + "+c:c<0?" - "+(-c):"");
  return mcq("What is the <b>vertex</b> of the graph of \\(y = "+u2Std(a,b,c)+"\\)?",
    u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
    "To sketch the graph, first find its turning point. The vertex sits on the axis of symmetry, \\(x = \\frac{-b}{2a}\\):"+
    "\\[ \\begin{aligned} x &= \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+" \\\\ y &= "+sub+" \\\\ &= "+u2JoinSigned([a*p*p, b*p, c])+" \\\\ &= "+q+" \\end{aligned} \\]"+
    "So the vertex, the point where the graph turns, is "+u2Pair(p,q)+".",
    {a:a, p:p, q:q, b:b, c:c});
},
  function(){
    var a=pick([1,2,3,-1,-2]);
    var p=0, q=0, att=0, b, c;
    while(att<200){
      att++;
      p=0; while(p===0) p=ri(-5,5);
      q=ri(-6,6);
      b=-2*a*p; c=a*p*p+q;
      var fneg=a*p*p - b*p + c;
      if(q!==c && fneg!==q && fneg!==c) break;
    }
    b=-2*a*p; c=a*p*p+q;
    var fneg2=a*p*p - b*p + c;
    var qfig=mcq("The graph shows a parabola with its vertex marked. What is the <b>vertex</b> of the graph?",
      u2Pair(p,q), [u2Pair(-p,q), u2Pair(p,c), u2Pair(p,fneg2)],
      "The marked point is the turning point of the graph, its vertex: "+u2Pair(p,q)+".",
      {a:a, p:p, q:q, b:b, c:c});
    qfig.figure=parSVG(a,b,c,{labels:"values",marks:[{x:p,y:q}]});
    return qfig;
  }
]));

/* ---------- 4.41: characteristics of a standard-form quadratic (L2) ---------- */
E("u2-characteristics-standard",2,["4.41"],2,"gen",function(){
  var a=pick([1,2,-1,-2]);
  var p=0; while(p===0) p=ri(-5,5);
  var q=ri(-6,6); if(q===0) q=3;
  var b=-2*a*p, c=a*p*p+q;
  function stYint(v){ return "The y-intercept is \\("+v+"\\)."; }
  function stAxis(v){ return "The axis of symmetry is \\(x = "+v+"\\)."; }
  function stOpen(upw){ return upw?"The parabola opens upward.":"The parabola opens downward."; }
  function stExtr(isMax, v, x){ return "The "+(isMax?"maximum":"minimum")+" value is \\("+v+"\\), reached at \\(x = "+x+"\\)."; }
  var falseYint=[b, q, -c, c+1].filter(function(v){ return v!==c; })[0];
  var chars={
    yint:{ t:stYint(c), f:stYint(falseYint) },
    axis:{ t:stAxis(p), f:stAxis(-p) },
    open:{ t:stOpen(a>0), f:stOpen(a<0) },
    extr:{ t:stExtr(a<0, q, p), f:stExtr(a>0, q, p) }
  };
  var keyChar=pick(["yint","axis","open","extr"]);
  var opts={};
  ["yint","axis","open","extr"].forEach(function(k){ opts[k]=(k===keyChar?chars[k].t:chars[k].f); });
  var qc=mcq("Which statement about the graph of \\(y = "+u2Std(a,b,c)+"\\) is <b>correct</b>?",
    opts[keyChar], ["yint","axis","open","extr"].filter(function(k){ return k!==keyChar; }).map(function(k){ return opts[k]; }),
    "Work through the characteristics one at a time. The y-intercept comes from setting \\(x = 0\\), which leaves \\(y = "+c+"\\). The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{"+(-b)+"}{"+(2*a)+"} = "+p+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the parabola opens "+(a>0?"upward":"downward")+", so the vertex \\(("+p+", "+q+")\\) gives a "+(a>0?"minimum":"maximum")+" value of \\("+q+"\\). Only one of the four statements matches all of this.",
    {a:a, p:p, q:q, keyChar:keyChar});
  qc.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q}]});
  return qc;
});

/* ---------- 4.43 and 4.45: complete the square, and verify two forms agree (L2) ---------- */
E("u2-complete-square",2,["4.43","4.45"],2,"gen",function(){
  var fam=pick(["convert","verify"]);
  var a=1, p=0, q=0, b=0, c=0, key="", att=0, dis=[];
  while(att<200){
    att++;
    a=pick([1,1,2,-1,-2]);
    p=0; while(p===0) p=ri(-5,5);
    q=0; while(q===0) q=ri(-6,6);
    b=-2*a*p; c=a*p*p+q;
    key="\\(y = "+u2VS(a,p,q)+"\\)";
    var pool=["\\(y = "+u2VS(a,-p,q)+"\\)", "\\(y = "+u2VS(a,p,c)+"\\)", "\\(y = "+u2VS(a,p,-q)+"\\)", "\\(y = "+u2VS(a,-p,-q)+"\\)"];
    if(a!==1) pool.push("\\(y = "+u2VS(1,p,q)+"\\)");
    dis=[]; var seen={};
    pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
    if(dis.length>=3){ dis=dis.slice(0,3); break; }
  }
  var B=b/a, P2=p*p;
  var aPre=(a===1?"":a===-1?"-":""+a);
  var cTail=(c>0?" + "+c:c<0?" - "+(-c):"");
  var sol;
  if(fam==="convert"){
    var lines="\\[ \\begin{aligned} y &= "+u2Std(a,b,c)+" \\\\ ";
    if(a===1){
      lines+="&= \\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    } else {
      lines+="&= "+aPre+"\\left("+u2QuadB(B)+"\\right)"+cTail+" \\\\ &= "+aPre+"\\left("+u2QuadB(B)+" + "+P2+"\\right) + \\left("+u2JoinSigned([c,-a*P2])+"\\right) \\\\ &= "+u2VS(a,p,q)+" \\end{aligned} \\]";
    }
    sol="Complete the square on the x-terms. Half of the coefficient of \\(x\\) inside the brackets is \\("+(B/2)+"\\), and \\("+(B/2)+"\\) squared is \\("+P2+"\\); that amount is added inside the brackets and balanced outside them:"+
      lines+
      "The result is the vertex form \\(y = "+u2VS(a,p,q)+"\\) with vertex \\(("+p+", "+q+")\\).";
    return mcq("Rewrite \\(y = "+u2Std(a,b,c)+"\\) in the form \\(y = a(x - p)^2 + q\\).",
      key, dis, sol, {fam:fam, a:a, p:p, q:q});
  }
  sol="Expand the squared bracket in the matching choice and compare term by term:"+
    "\\[ \\begin{aligned} "+u2VS(a,p,q)+" &= "+aPre+"\\left("+u2Std(1,-2*p,P2)+"\\right) "+(q>0?"+ "+q:"- "+(-q))+" \\\\ &= "+u2Std(a,b,a*P2)+(q>0?" + "+q:" - "+(-q))+" \\\\ &= "+u2Std(a,b,c)+" \\end{aligned} \\]"+
    "The expansion gives exactly \\(y = "+u2Std(a,b,c)+"\\), so the two forms represent the same function. The other choices expand to different quadratics.";
  return mcq("Which function represents the <b>same function</b> as \\(y = "+u2Std(a,b,c)+"\\)?",
    key, dis, sol, {fam:fam, a:a, p:p, q:q});
});

/* ---------- 4.42: reasoning inside completing the square (L2, var) ---------- */
E("u2-cts-reasoning",2,["4.42"],1,"var",varset([
  function(){
    var b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]), h=b/2, h2=h*h;
    var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
    return mcq("A student begins completing the square on \\("+u2QuadB(b)+"\\) by adding \\("+h2+"\\). Why is \\("+h2+"\\) the number that is added?",
      "Because half of the coefficient of \\(x\\) is \\("+h+"\\), and adding its square makes \\("+u2QuadB(b)+" + "+h2+"\\) a perfect square: it factors as \\("+facS+"\\).",
      ["To eliminate the \\(x\\) term from the expression, so that the work is left with only two terms, \\(x^2\\) and a constant, to deal with.",
       "To make the constant term of the expression equal to the coefficient of \\(x\\), so the two middle values in the trinomial match each other exactly.",
       "Because the square of the full coefficient of \\(x\\) must always be added first, before any other step in the method is carried out."],
      "Completing the square aims at the pattern \\((x + k)^2 = x^2 + 2kx + k^2\\). Matching \\(2k\\) with the coefficient \\("+b+"\\) gives \\(k = "+h+"\\), so the constant to add is \\(k^2 = "+h2+"\\). With it added, the trinomial factors as \\("+facS+"\\).",
      {b:b});
  },
  function(){
    var b=pick([2,4,6,8,-2,-4,-6,-8]), h=b/2, h2=h*h, c=pick([1,3,5,7,-2,-4]);
    return mcq("When \\(y = "+u2Std(1,b,c)+"\\) is rewritten by completing the square, the work includes the step \\(y = "+u2QuadB(b)+" + "+h2+" - "+h2+(c>0?" + "+c:" - "+(-c))+"\\). Why is \\("+h2+"\\) subtracted as well as added?",
      "Adding and subtracting the same number does not change the value of the expression, so the rewritten function is still equivalent to the original one.",
      ["So that the y-intercept of the graph ends up in a different position once the function has been rewritten and is graphed in its new form at the end of the work shown.",
       "Because a square has to be completed on both sides of the equation, and the subtraction is what balances what was done on the left side.",
       "To make the constant term of the function into a perfect square as well, so that both parts of the expression end up as perfect squares."],
      "The \\(+"+h2+"\\) is there to complete the square, but it changes the value of the expression unless it is balanced. Subtracting \\("+h2+"\\) again keeps the new expression equal to \\("+u2Std(1,b,c)+"\\) for every value of \\(x\\), which is what makes the rewriting a rewriting of the same function.",
      {b:b, c:c});
  },
  function(){
    var a=pick([2,3]), B=pick([4,6,8]), c=pick([1,2,5,7]);
    return mcq("To rewrite \\(y = "+u2Std(a,a*B,c)+"\\) by completing the square, the first step gives \\(y = "+a+"\\left("+u2QuadB(B)+"\\right) + "+c+"\\). Why does the coefficient of \\(x^2\\) inside the brackets need to be 1?",
      "The pattern \\((x + k)^2 = x^2 + 2kx + k^2\\) has \\(x^2\\) with coefficient 1, so halving the \\(x\\)-coefficient gives \\(k\\) only when the \\(x^2\\) coefficient is 1.",
      ["Because a perfect square trinomial can never have a coefficient in front of it when it is written out in factored form, so the coefficient must be removed first.",
       "So that the constant term can be factored out of the brackets at the same time as the coefficient of \\(x^2\\) is factored out of them as well.",
       "Because the quadratic formula can only be used when the leading coefficient is 1, as in \\(x^2 + bx + c\\), which is the standard form the formula needs."],
      "Inside the brackets the work matches the trinomial against \\((x + k)^2 = x^2 + 2kx + k^2\\), whose \\(x^2\\) coefficient is 1. Factoring out \\("+a+"\\) first makes the bracket a monic trinomial, so half of \\("+B+"\\) is the value of \\(k\\) to use. The constant \\("+c+"\\) is not part of the square being completed and stays outside.",
      {a:a, B:B});
  },
  function(){
    var b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]), h=b/2, h2=h*h, c=pick([2,3,5,-1,-4,6]);
    var q=c-h2;
    var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
    return mcq("The work for rewriting \\(y = "+u2Std(1,b,c)+"\\) by completing the square is shown:"+
      "\\[ \\begin{aligned} y &= "+u2QuadB(b)+" + "+h2+" + \\left("+u2JoinSigned([c,-h2])+"\\right) \\\\ &= "+facS+(q>0?" + "+q:" - "+(-q))+" \\end{aligned} \\]"+
      "What does the last step, writing \\("+u2QuadB(b)+" + "+h2+"\\) as \\("+facS+"\\), accomplish?",
      "It puts the function in vertex form, so the vertex and the transformations of the graph can be read off directly.",
      ["It solves the equation \\(y = 0\\) for the function, which gives the x-intercepts of the graph where it crosses the axis.",
       "It removes the constant term from the function completely, so only the squared part of the function is left.",
       "It factors the original trinomial into two different binomials, each with its own constant term in it."],
      "The trinomial \\("+u2QuadB(b)+" + "+h2+"\\) is a perfect square, equal to \\("+facS+"\\). Writing it that way turns the whole function into vertex form, \\(y = "+u2VS(1,-h,q)+"\\), and the vertex \\(("+(-h)+", "+q+")\\) can be read from it. Nothing has been solved and no term has been dropped.",
      {b:b, c:c});
  }
]));

/* ---------- 4.37: why vertex form is a quadratic function (L2, var) ---------- */
E("u2-why-quadratic",2,["4.37"],2,"var",varset([
  function(){
    return mcq("The function \\(y = a(x - p)^2 + q\\) is a quadratic function only when \\(a \\neq 0\\). Why does setting \\(a = 0\\) destroy the quadratic property?",
      "If \\(a = 0\\), the whole squared term becomes 0 and the function reduces to the constant \\(y = q\\), which has degree 0.",
      ["If \\(a = 0\\), the function becomes linear, because the \\(x\\) term from the expansion is the highest term left.",
       "If \\(a = 0\\), the squared term still contains an \\(x^2\\) term, so the function stays quadratic.",
       "If \\(a = 0\\), the vertex of the graph moves to the origin, which a quadratic cannot have."],
      "The factor \\(a\\) multiplies the entire squared bracket. When \\(a = 0\\), that bracket contributes nothing, no matter what \\(x\\) is, and only the constant \\(q\\) survives. A constant function has degree 0, so it is not a quadratic function; this is why the definition of the form includes the condition \\(a \\neq 0\\).",
      {});
  },
  function(){
    var a=pick([2,3,4,5]), p=pick([1,2,3]), q=pick([1,2,3,4,5,6]);
    var lin=pick([3,5,7]), cub=pick([2,4]);
    return mcq("Which function is a <b>quadratic function</b>?",
      "\\(f(x) = "+u2VS(a,p,q)+"\\)",
      ["\\(f(x) = "+lin+"x - "+pick([1,2,6])+"\\)",
       "\\(f(x) = x^3 - "+cub+"x\\)",
       "\\(f(x) = \\sqrt{x} + "+pick([2,4])+"\\)"],
      "A quadratic function is a polynomial function of degree 2. Expanding \\("+u2VS(a,p,q)+"\\) gives \\("+u2Std(a,-2*a*p,a*p*p+q)+"\\), which has degree 2. The others have degree 1, degree 3, and a square root of the variable, so none of them is quadratic.",
      {a:a, p:p, q:q});
  },
  function(){
    var a=pick([2,3,4]), p=pick([1,2,3]), q=pick([1,2,3,4,5,6]);
    var std=u2Std(a,-2*a*p,a*p*p+q);
    return mcq("A classmate claims that \\(y = "+u2VS(a,p,q)+"\\) is not a quadratic function, because it contains no \\(x^2\\) term. Which statement corrects the claim?",
      "Expanding gives \\(y = "+std+"\\), which does contain an \\(x^2\\) term, so the function is quadratic.",
      ["The claim is correct. A quadratic function must show an \\(x^2\\) term in the form it is written.",
       "The claim is correct. The squared bracket makes the function a quartic, not a quadratic.",
       "The claim is incorrect. The function is quadratic because the constant \\("+q+"\\) shifts the graph up."],
      "Whether a function is quadratic is decided after it is written as a polynomial: expanding the squared bracket gives \\(y = "+std+"\\). The \\(x^2\\) term was there all along, hidden inside the squared bracket, and its coefficient \\("+a+"\\) is not zero, so the function has degree 2.",
      {a:a, p:p, q:q});
  },
  function(){
    return mcq("When \\(y = a(x - p)^2 + q\\) is expanded into the form \\(y = ax^2 + bx + c\\), what is the coefficient of the \\(x\\) term?",
      "\\(-2ap\\)",
      ["\\(2ap\\)", "\\(-ap\\)", "\\(ap\\)"],
      "Expand the squared bracket first: \\((x - p)^2 = x^2 - 2px + p^2\\). Multiplying by \\(a\\) gives \\(ax^2 - 2apx + ap^2\\), and adding \\(q\\) does not affect the \\(x\\) term. So the coefficient of \\(x\\) is \\(-2ap\\).",
      {});
  }
]));

/* ---------- 4.40: write a quadratic from a vertex and a point or intercept (L2) ---------- */
E("u2-write-from-characteristics",2,["4.40"],2,"gen",function(){
  var fam=pick(["point","yint"]);
  var a=pick([1,2,3,-1,-2,-3]);
  var p=0; while(p===0) p=ri(-4,4);
  var q=ri(-5,5);
  var key="\\(y = "+u2VS(a,p,q)+"\\)";
  var pool=["\\(y = "+u2VS(-a,p,q)+"\\)", "\\(y = "+u2VS(a,-p,q)+"\\)", "\\(y = "+u2VS(a,p,-q)+"\\)", "\\(y = "+u2VS(a,-p,-q)+"\\)", "\\(y = "+u2VS(a+(a>0?1:-1),p,q)+"\\)"];
  var dis=[], seen={};
  pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
  dis=dis.slice(0,3);
  var qTail=(q>0?" + "+q:q<0?" - "+(-q):"");
  if(fam==="point"){
    var d=pick([1,2,3]), x1=p+(ri(0,1)===0?d:-d), y1=a*d*d+q, dx=x1-p;
    var qw=mcq("A parabola has vertex \\(("+p+", "+q+")\\) and passes through the point \\(("+x1+", "+y1+")\\). Which function, in vertex form, describes the parabola?",
      key, dis,
      "Use the vertex form \\(y = a(x - p)^2 + q\\) with the given vertex, then substitute the known point to find \\(a\\):"+
      "\\[ \\begin{aligned} "+y1+" &= a("+dx+")^2"+qTail+" \\\\ "+(y1-q)+" &= "+(d*d)+"a \\\\ a &= \\frac{"+(y1-q)+"}{"+(d*d)+"} = "+a+" \\end{aligned} \\]"+
      "So the function is \\(y = "+u2VS(a,p,q)+"\\).",
      {fam:fam, a:a, p:p, q:q, x1:x1, y1:y1});
    qw.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q},{x:x1,y:y1}]});
    return qw;
  }
  var yi=a*p*p+q;
  var qw=mcq("A parabola has vertex \\(("+p+", "+q+")\\) and y-intercept \\("+yi+"\\). Which function, in vertex form, describes the parabola?",
    key, dis,
    "Use the vertex form \\(y = a(x - p)^2 + q\\) with the given vertex. The y-intercept is the value at \\(x = 0\\), so substitute the point \\((0, "+yi+")\\) to find \\(a\\):"+
    "\\[ \\begin{aligned} "+yi+" &= a("+(0-p)+")^2"+qTail+" \\\\ "+(yi-q)+" &= "+(p*p)+"a \\\\ a &= \\frac{"+(yi-q)+"}{"+(p*p)+"} = "+a+" \\end{aligned} \\]"+
    "So the function is \\(y = "+u2VS(a,p,q)+"\\).",
    {fam:fam, a:a, p:p, q:q, yi:yi});
  qw.figure=parSVG(a,-2*a*p,a*p*p+q,{marks:[{x:p,y:q},{x:0,y:yi}]});
  return qw;
});

/* ---------- 4.46: write a quadratic model, with assumptions (L2, var) ---------- */
E("u2-model-situation",2,["4.46"],2,"var",varset([
  function(){
    var price=pick([30,40,50]), cut=pick([1,2]), base=pick([150,200,250]), gain=pick([5,10,15]);
    return mcq("A gym has "+base+" members who each pay $"+price+" per month. For each $"+cut+" monthly discount the gym offers, "+gain+" new members join. Let \\(x\\) be the number of $"+cut+" discounts offered. Which function gives the monthly revenue \\(R\\), in dollars?",
      "\\(R(x) = ("+price+" - "+cut+"x)("+base+" + "+gain+"x)\\)",
      ["\\(R(x) = ("+price+" - "+cut+"x)("+base+" - "+gain+"x)\\)",
       "\\(R(x) = ("+price+" + "+cut+"x)("+base+" + "+gain+"x)\\)",
       "\\(R(x) = ("+price+" - x)("+base+" + x)\\)"],
      "Revenue is price per member times the number of members. Each discount lowers the price by $"+cut+", so the price is \\("+price+" - "+cut+"x\\), and each discount adds "+gain+" members, so membership is \\("+base+" + "+gain+"x\\). Multiplying gives the model. It assumes the joining pattern stays linear, with the same "+gain+" new members for each further discount.",
      {ctx:"gym membership", price:price, cut:cut, base:base, gain:gain});
  },
  function(){
    var W=pick([40,48,60,80]);
    var qf=mcq("A farmer uses "+W+" m of fencing to enclose a rectangular pen on three sides, with a long barn wall forming the fourth side. The two sides perpendicular to the wall each have length \\(x\\) metres. Which function gives the area \\(A\\), in square metres, of the pen?",
      "\\(A(x) = x("+W+" - 2x)\\)",
      ["\\(A(x) = x("+W+" - x)\\)",
       "\\(A(x) = 2x("+W+" - 2x)\\)",
       "\\(A(x) = x("+(W/2)+" - x)\\)"],
      "The fencing covers two sides of length \\(x\\) and the side opposite the wall, so that side has length \\("+W+" - 2x\\) metres. Area is length times width: \\(A(x) = x("+W+" - 2x)\\). The model assumes the barn wall is at least as long as the side opposite it and that the pen is rectangular.",
      {ctx:"fenced pen", W:W});
    qf.figure=fenceSVG(W,"barn wall");
    return qf;
  },
  function(){
    var S=pick([20,24,30,36]);
    return mcq("Two numbers add to "+S+". Let \\(x\\) be one of the numbers. Which function gives the product \\(P\\) of the two numbers?",
      "\\(P(x) = x("+S+" - x)\\)",
      ["\\(P(x) = x("+S+" + x)\\)",
       "\\(P(x) = "+S+" - x^2\\)",
       "\\(P(x) = x + ("+S+" - x)\\)"],
      "If one number is \\(x\\) and the two add to "+S+", the other number is \\("+S+" - x\\). The product is one number times the other: \\(P(x) = x("+S+" - x)\\). No further assumption is needed; the only condition is that the two numbers add to "+S+".",
      {ctx:"two numbers", S:S});
  }
]));

/* ---------- 4.46: substitute into a model form printed in the stem (L1, var; split from u2-model-situation under ruling 8, Nov 13, 2026) ---------- */
E("u2-model-situation-evaluate",2,["4.46"],1,"var",varset([
  function(){
    var v=pick([12,15,18,20]), h0=pick([1,2]);
    return mcq("A ball is thrown upward from a platform "+h0+" m above the ground, with an initial velocity of "+v+" m/s. The height of the ball is modelled by a function of the form \\(h(t) = -4.9t^2 + v_0 t + h_0\\), where \\(t\\) is the time in seconds. Which function models this ball?",
      "\\(h(t) = -4.9t^2 + "+v+"t + "+h0+"\\)",
      ["\\(h(t) = -4.9t^2 + "+v+"t\\)",
       "\\(h(t) = -4.9t^2 + "+h0+"t + "+v+"\\)",
       "\\(h(t) = 4.9t^2 + "+v+"t + "+h0+"\\)"],
      "In the template, \\(v_0\\) is the initial velocity, "+v+" m/s, and \\(h_0\\) is the starting height, "+h0+" m, so the model is \\(h(t) = -4.9t^2 + "+v+"t + "+h0+"\\). The model assumes the only force acting after the throw is gravity (the \\(-4.9\\) comes from half of \\(9.8\\ \\mathrm{m/s^2}\\)) and that air resistance is ignored.",
      {ctx:"thrown ball", v:v, h0:h0});
  }
]));

/* ---------- 4.47: solve a problem by analyzing a quadratic (L2) ---------- */
E("u2-analyze-problem",2,["4.47"],2,"gen",function(){
  var fam=pick(["projectile","projectile","revenue","fence"]);
  if(fam==="projectile"){
    var ctxs=[
      {n:"A ball is thrown upward from a rooftop", h0s:[10,12,15,18,20], vs:[10,20,30]},
      {n:"A stone is tossed upward from the top of a cliff", h0s:[15,20,25,30], vs:[10,20,30]},
      {n:"A ball is launched upward from a platform", h0s:[2,3,4,5], vs:[10,20]}];
    var ctx=pick(ctxs), h0=pick(ctx.h0s), v=pick(ctx.vs);
    var ts=v/10, mx=h0+v*v/20;
    var qa=numq(ctx.n+" "+h0+" m above the ground. Its height, in metres, after \\(t\\) seconds is modelled by \\(h(t) = -5t^2 + "+v+"t + "+h0+"\\). What is the <b>maximum height</b>, in metres, that the ball reaches?",
      mx, 0.01,
      "The height function is a downward-opening parabola, so its maximum is at the vertex. The time at the vertex is \\(t = \\frac{-b}{2a}\\):"+
      "\\[ \\begin{aligned} t &= \\frac{-"+v+"}{2(-5)} = "+ts+" \\\\ h("+ts+") &= -5("+ts+")^2 + "+v+"("+ts+") + "+h0+" \\\\ &= "+u2JoinSigned([-5*ts*ts, v*ts, h0])+" \\\\ &= "+mx+" \\end{aligned} \\]"+
      "So the maximum height is <b>"+mx+" m</b>, reached after "+ts+" s.",
      {fam:fam, ctx:ctx.n, h0:h0, v:v});
    qa.figure=trajSVG(-5,v,h0);
    return qa;
  }
  if(fam==="revenue"){
    var ctx=pick([{n:"A concert venue", item:"tickets"}, {n:"A community theatre", item:"tickets"}, {n:"A ski hill", item:"lift passes"}]);
    var k=pick([10,20,25,50]), p0=pick([8,10,12,15,20]), xs=pick([2,3,4,5,6,8]);
    var n0=k*(2*xs+p0), B=n0-k*p0, price=p0+xs;
    var qa=numq(ctx.n+" sells "+n0+" "+ctx.item+" at $"+p0+" each. For each $1 increase in price, "+k+" fewer "+ctx.item+" are sold. The revenue is modelled by \\(R(x) = ("+p0+" + x)("+n0+" - "+k+"x)\\), where \\(x\\) is the number of $1 increases. What ticket price, in dollars, gives the <b>maximum revenue</b>?",
      price, 0.01,
      "First expand the revenue function into standard form:"+
      "\\[ \\begin{aligned} R(x) &= ("+p0+" + x)("+n0+" - "+k+"x) \\\\ &= -"+k+"x^2 + "+B+"x + "+(p0*n0)+" \\end{aligned} \\]"+
      "This parabola opens downward, so its vertex gives the maximum. The vertex is at:"+
      "\\[ \\begin{aligned} x &= \\frac{-"+B+"}{2(-"+k+")} = "+xs+" \\end{aligned} \\]"+
      "That is "+xs+" increases of $1 on the starting price of $"+p0+", so the price that gives the maximum revenue is <b>$"+price+"</b>.",
      {fam:fam, ctx:ctx.n, k:k, p0:p0, xs:xs, n0:n0});
    qa.figure=parSVG(-k,B,p0*n0,{xrange:[0,n0/k],xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
    return qa;
  }
  var ctx2=pick([{n:"A farmer builds a rectangular pen against a long barn wall", Ws:[40,60,80,100,120]},
                 {n:"A gardener makes a rectangular plot against a house wall", Ws:[40,60,80]},
                 {n:"A school builds a rectangular garden plot against a gym wall", Ws:[40,60]}]);
  var W=pick(ctx2.Ws), Amax=W*W/8;
  var qa=numq(ctx2.n+", using "+W+" m of fencing for the other three sides. The area is modelled by \\(A(x) = x("+W+" - 2x)\\), where \\(x\\) is the length, in metres, of each side perpendicular to the wall. What is the <b>maximum area</b>, in square metres, of the plot?",
    Amax, 0.01,
    "Expand the area function: \\(A(x) = -2x^2 + "+W+"x\\). This parabola opens downward, so the maximum is at the vertex:"+
    "\\[ \\begin{aligned} x &= \\frac{-"+W+"}{2(-2)} = "+(W/4)+" \\\\ A("+(W/4)+") &= "+(W/4)+"\\left("+W+" - 2("+ (W/4) +")\\right) \\\\ &= "+(W/4)+" \\times "+(W/2)+" \\\\ &= "+Amax+" \\end{aligned} \\]"+
    "So the maximum area is <b>"+Amax+" m<sup>2</sup></b>, when each perpendicular side is "+(W/4)+" m.",
    {fam:fam, ctx:ctx2.n, W:W});
  qa.figure=fenceSVG(W,(ctx2.n.indexOf("barn")>=0?"barn wall":(ctx2.n.indexOf("house")>=0?"house wall":"gym wall")));
  return qa;
});

/* ---------- 4.44: diagnose and correct an error in completing the square (L3, error analysis) ---------- */
E("u2-error-complete-square",2,["4.44"],3,"gen",function(){
  var att=0, b=0, c=0, h=0, h2=0, q=0, type="";
  while(att<200){
    att++;
    b=pick([2,4,6,8,10,-2,-4,-6,-8,-10]); h=b/2; h2=h*h;
    c=ri(-9,12); if(c===0) continue;
    q=c-h2; if(q===0) continue;
    type=pick(["nosub","bsq","sign"]);
    break;
  }
  var facS="(x"+(h>0?" + "+h:" - "+(-h))+")^2";
  var correct="\\(y = "+u2VS(1,-h,q)+"\\)";
  var flawed, flawNote;
  if(type==="nosub"){
    flawed="\\(y = "+u2VS(1,-h,c)+"\\)";
    flawNote="The student added \\("+h2+"\\) to complete the square but never subtracted it back out, so their expression is worth \\("+h2+"\\) more than the original function. The balance has to be kept: the constant must fall from \\("+c+"\\) to \\("+c+" - "+h2+" = "+q+"\\).";
  } else if(type==="bsq"){
    flawed="\\(y = "+u2VS(1,-b,c-b*b)+"\\)";
    flawNote="The student squared the whole coefficient of \\(x\\), using \\("+b+"^2 = "+(b*b)+"\\), instead of squaring half of it. The amount the pattern needs is the square of half the coefficient: \\(\\left(\\frac{"+b+"}{2}\\right)^2 = "+h2+"\\).";
  } else {
    flawed="\\(y = "+u2VS(1,h,q)+"\\)";
    flawNote="The constant work is right, but the sign inside the squared bracket is wrong. Since \\(2 \\times ("+h+") = "+b+"\\), the trinomial \\("+u2QuadB(b)+" + "+h2+"\\) factors as \\("+facS+"\\), with the sign of \\("+h+"\\) following the coefficient of \\(x\\).";
  }
  var others={
    nosub:"\\(y = "+u2VS(1,-h,c)+"\\)",
    bsq:"\\(y = "+u2VS(1,-b,c-b*b)+"\\)",
    sign:"\\(y = "+u2VS(1,h,q)+"\\)"
  };
  var dis=[flawed].concat(["nosub","bsq","sign"].filter(function(t){ return t!==type; }).map(function(t){ return others[t]; }));
  return mcq("A student rewrote \\(y = "+u2Std(1,b,c)+"\\) in vertex form. Their final answer was \\("+flawed.slice(2,-2)+"\\), but it contains exactly one error. What is the <b>correct</b> vertex form?",
    correct, dis,
    flawNote+" Correct work:"+
    "\\[ \\begin{aligned} y &= "+u2Std(1,b,c)+" \\\\ &= \\left("+u2QuadB(b)+" + "+h2+"\\right) + \\left("+u2JoinSigned([c,-h2])+"\\right) \\\\ &= "+u2VS(1,-h,q)+" \\end{aligned} \\]",
    {b:b, c:c, type:type});
});

/* ---------- 4.39: generalize the vertex rule from examples (L3) ---------- */
E("u2-vertex-rule",2,["4.39"],3,"gen",function(){
  var exs=[], att=0;
  while(exs.length<3 && att<400){
    att++;
    var p=ri(-6,6), q=ri(-6,6);
    if(p===0 || q===0) continue;
    if(exs.some(function(e){ return e.p===p && e.q===q; })) continue;
    exs.push({p:p, q:q});
  }
  var P=0, Q=0; att=0;
  while(att<400){
    att++;
    P=ri(-7,7); Q=ri(-7,7);
    if(P===0 || Q===0) continue;
    if(exs.some(function(e){ return e.p===P && e.q===Q; })) continue;
    break;
  }
  var list=exs.map(function(e){ return "\\(y = "+u2VS(1,e.p,e.q)+"\\) has vertex \\(("+e.p+", "+e.q+")\\)"; }).join("; ");
  return mcq("Three quadratic functions are listed with their vertices: "+list+". Following the pattern in these examples, what is the <b>vertex</b> of \\(y = "+u2VS(1,P,Q)+"\\)?",
    u2Pair(P,Q), [u2Pair(-P,Q), u2Pair(P,-Q), u2Pair(-P,-Q)],
    "Read the pattern across the examples. In each one, the x-coordinate of the vertex is the value that makes the squared part zero, which is the number subtracted from \\(x\\) inside the brackets, and the y-coordinate is the constant added at the end. Applying the same rule to \\(y = "+u2VS(1,P,Q)+"\\): the squared part is zero at \\(x = "+P+"\\) and the added constant is \\("+Q+"\\), so the vertex is \\(("+P+", "+Q+")\\).",
    {P:P, Q:Q});
});

/* ---------- 4.47: evaluate a claim about a maximum (L3) ---------- */
E("u2-evaluate-claim",2,["4.47"],3,"gen",function(){
  var ctx=pick([
    {n:"A theatre", item:"ticket prices"},
    {n:"A concert hall", item:"ticket prices"},
    {n:"A ski hill", item:"lift pass prices"},
    {n:"A bus tour company", item:"ticket prices"}]);
  var a=pick([2,5,10]);
  var xs=ri(3,10), b=2*a*xs, c=pick([1500,2400,3000,4800]);
  var M=a*xs*xs+c, xc=2*xs, Mc=c;
  var d=pick([1,2,3]), x2=xs+d, M2=c+a*xs*xs-a*d*d;
  function Rv(x){ return -a*x*x+b*x+c; }
  var key="The claim is incorrect. The vertex is at \\(x = "+xs+"\\), so the greatest revenue is $"+M+".";
  var dis=[
    "The claim is correct. The vertex is at \\(x = "+xc+"\\), so the greatest revenue is $"+Mc+".",
    "The claim is incorrect. The vertex is at \\(x = "+x2+"\\), so the greatest revenue is $"+M2+".",
    "The claim is incorrect. The revenue has no maximum, because it keeps increasing as \\(x\\) increases."];
  var qe=mcq(ctx.n+" models its revenue, in dollars, by \\(R(x) = "+u2Std(-a,b,c)+"\\), where \\(x\\) is the number of one-dollar increases in its "+ctx.item+". The manager claims that the revenue is greatest after "+xc+" increases. Which statement evaluates the claim correctly?",
    key, dis,
    "The revenue graph opens downward, so its maximum is at the vertex:"+
    "\\[ \\begin{aligned} x &= \\frac{-b}{2a} = \\frac{-"+b+"}{2("+(-a)+")} = "+xs+" \\\\ R("+xs+") &= "+u2JoinSigned([-a*xs*xs, b*xs, c])+" = "+M+" \\end{aligned} \\]"+
    "So the greatest revenue is $"+M+", after "+xs+" increases, not "+xc+". The manager divided by the coefficient of \\(x^2\\) only once instead of twice (using \\(x = "+xc+"\\)); at that point the revenue has already fallen back to $"+Mc+", the same as with no increase at all. (Revenue values check: \\(R("+x2+") = "+Rv(x2)+"\\), also less than $"+M+".)",
    {ctx:ctx.n, a:a, xs:xs, xc:xc});
  qe.figure=parSVG(-a,b,c,{xLab:"x",yLab:"R(x)",aria:"Revenue parabola"});
  return qe;
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u2-pk-graph-data: borrowed verbatim from math-1201 entry u4-graph-data (math-1201:4.9). */
E("u2-pk-graph-data",2,["4.41"],1,"gen",function(){
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

/* u2-pk-domain-range: borrowed verbatim from math-1201 entry u4-domain-range (math-1201:4.10). */
E("u2-pk-domain-range",2,["4.28"],1,"gen",function(){
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

/* u2-pk-dr-linear: borrowed verbatim from math-1201 entry u4-dr-linear (math-1201:4.12). */
E("u2-pk-dr-linear",2,["4.28"],1,"gen",function(){
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

/* u2-pk-intercepts: borrowed verbatim from math-1201 entry u4-intercepts (math-1201:4.28). */
E("u2-pk-intercepts",2,["4.41"],1,"gen",function(){
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

/* u2-pk-intercepts-solve: borrowed verbatim from math-1201 entry u4-intercepts-solve (math-1201:4.28). */
E("u2-pk-intercepts-solve",2,["4.41"],2,"gen",function(){
  var askX=true;
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

/* u2-pk-eval-function: borrowed verbatim from math-1201 entry u4-eval-function (math-1201:4.47). */
E("u2-pk-eval-function",2,["4.41"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* u2-pk-factor-monic: borrowed verbatim from math-1201 entry u3-factor-monic (math-1201:3.12). */
E("u2-pk-factor-monic",2,["4.41"], 2, "gen", function () {
  var v = pick(["x", "y"]);
  var r = u3Nz(-9, 9), s = u3Nz(-9, 9), guard = 0;
  while (r === s && guard < 40) { guard++; s = u3Nz(-9, 9); }
  var B = r + s, C = r * s;
  var poly = u3PC([1, B, C], v);
  var facs = [[1, Math.min(r, s)], [1, Math.max(r, s)]];
  var ans = Math.max(r, s);
  var prompt = "When the trinomial \\(" + poly + "\\) is factored as a product of two binomials, the two constant terms are two numbers. What is the larger of those two numbers?";
  var sol = "Find two numbers that multiply to \\(" + C + "\\) and add to \\(" + B + "\\): the numbers are \\(" + Math.min(r, s) + "\\) and \\(" + Math.max(r, s) + "\\)." +
    u3Alg([poly + " &= " + u3FacRaw("", facs, v)]) +
    "The larger of the two constant terms is **" + ans + "**.";
  return numq(prompt, ans, 0.01, sol, { t: "pair", r: r, s: s, B: B, C: C });
});

/* u2-pk-binom-expand: borrowed verbatim from math-1201 entry u3-binom-tri-expand (math-1201:3.4). */
E("u2-pk-binom-expand",2,["4.43"], 2, "gen", function () {
  var A = [ri(1, 3), u3Nz(-5, 5)];
  var B = [ri(1, 3), u3Nz(-5, 5), u3Nz(-6, 6)];
  var prod = u3Conv(A, B), keyRaw = u3PC(prod, "x");
  var partials = u3Mul(u3TermsOf(A, "x"), u3TermsOf(B, "x"));
  var prompt = "Expand and simplify \\(" + u3Par(A, "x") + u3Par(B, "x") + "\\).";
  var sol = "Multiply each term of the binomial by each of the three terms of the trinomial, giving six partial products, then combine like terms." +
    u3Alg([u3Par(A, "x") + u3Par(B, "x") + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), u3DistrCoeffs(prod, "x", 3), sol,
    { t: "expand", P: u3TermsOf(A, "x"), Q: u3TermsOf(B, "x") });
});

/* PK tranche pass for Unit 2. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U2_FOR=["4.27","4.28","4.29","4.30","4.31","4.32","4.37","4.38","4.39","4.40","4.41","4.42","4.43","4.44","4.45","4.46","4.47"];
var PKT_U2={
 "u2-pk-graph-data":{src:"math-1201:4.9",group:"graphing-data"},
 "u2-pk-domain-range":{src:"math-1201:4.10",group:"domain-range"},
 "u2-pk-dr-linear":{src:"math-1201:4.12",group:"domain-range"},
 "u2-pk-intercepts":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-intercepts-solve":{src:"math-1201:4.28",group:"intercepts"},
 "u2-pk-eval-function":{src:"math-1201:4.47",group:"substitution"},
 "u2-pk-factor-monic":{src:"math-1201:3.12",group:"factoring"},
 "u2-pk-binom-expand":{src:"math-1201:3.4",group:"polynomial-multiply"}
};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});
