// Math 2200 Unit 3 Quadratic Equations question bank
// Graphics pass Tranche 2 (November 12, 2026): figures attached
// attach-only from the builders ported into bank-helpers.js;
// u3-discriminant-nature gained a graphed read-off second arm
// under the Tranche 1b ruling (its original generator sits
// verbatim as arm 1). The frame context of u3-problem-model
// carries no figure: the border builder's labels are in metres
// and that context is in centimetres.
// CRMARKS: u3-derive-formula=4
// CRMARKS: u3-discriminant-k=3
// CRMARKS: u3-error-analysis=3
// CRMARKS: u3-factor-common=1
// CRMARKS: u3-factor-func-diff=2
// CRMARKS: u3-factor-test=2
// CRMARKS: u3-factor-trinomial=2
// CRMARKS: u3-factor-trinomial-nonmonic=2
// CRMARKS: u3-method-choice=3
// CRMARKS: u3-problem-model=3
// CRMARKS: u3-roots-zeros=1
// CRMARKS: u3-solve-strategies=2
/* ================= Unit 3: Quadratic Equations ================= */
/* ================= Unit 3: Quadratic Equations (MA2200.3.14 to 3.17, 4.9 to 4.15) =================
   Tranche 1, mid scope. All stems, contexts and values are original.
   Helpers are prefixed u3; entries register through E(...). */

/* ---------- u3 helpers ---------- */
function u3Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
function u3PolyS(cf){ /* coefficients, highest degree first, to a polynomial string in x */
  var out="", first=true, n=cf.length-1, i, c, p, term;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue;
    if(p===0) term=""+Math.abs(c);
    else { var base=(p===1?"x":"x^"+p); term=(Math.abs(c)===1?base:Math.abs(c)+base); }
    if(first){ out=(c<0?"-":"")+term; first=false; }
    else out+=(c<0?" - ":" + ")+term;
  }
  return out===""?"0":out;
}
function u3QuadS(a,b,c){ return u3PolyS([a,b,c]); }
function u3FacS(r){ /* factor (x - r) as a string, for a root r */
  if(r===0) return "x";
  return r>0?"(x - "+r+")":"(x + "+(-r)+")";
}
function u3FacLinS(p,q){ /* factor (px + q) as a string, p >= 1 */
  if(q===0) return p===1?"x":"("+p+"x)";
  var lead=(p===1?"x":p+"x");
  return "("+lead+(q>0?" + "+q:" - "+(-q))+")";
}
function u3TwoFac(s1,s2){ /* two factor strings concatenated in a fixed (alphabetical) order */
  return s1<=s2 ? s1+s2 : s2+s1;
}
function u3BinS(r){ /* binomial text for a root r: x - r, x + |r|, or x */
  if(r===0) return "x";
  return r>0?"x - "+r:"x + "+(-r);
}
function u3InnerS(coef,v,k){ /* inner linear expression: coef*v + k, coef >= 1 */
  var s=(coef===1?v:coef+v);
  if(k>0) s+=" + "+k; else if(k<0) s+=" - "+(-k);
  return s;
}
function u3FracS(num,den){ /* reduced fraction as LaTeX content (no delimiters); den != 0 */
  if(den<0){ num=-num; den=-den; }
  var g=u3Gcd(num,den); num/=g; den/=g;
  if(den===1) return ""+num;
  return (num<0?"-":"")+"\\frac{"+Math.abs(num)+"}{"+den+"}";
}
function u3RadParts(n){ /* n = c^2 * m with m squarefree; returns [c, m] */
  var c=1, m=n, i;
  for(i=2;i*i<=m;i++){ while(m%(i*i)===0){ m/=(i*i); c*=i; } }
  return [c,m];
}
function u3PairNum(a,b){ /* solution-set option for two integer roots, ascending */
  var lo=Math.min(a,b), hi=Math.max(a,b);
  return "\\(x = "+lo+" \\text{ or } x = "+hi+"\\)";
}
function u3Opts(key,cands){ /* first 3 candidate strings distinct from the key and each other */
  var out=[], seen={}; seen[key]=1;
  for(var i=0;i<cands.length;i++){ var s=String(cands[i]);
    if(!seen[s]){ seen[s]=1; out.push(s); if(out.length===3) break; } }
  return out;
}
function u3SignCands(r1,r2){ /* distractor solution-set options for integer roots r1, r2 */
  return [ u3PairNum(-r1,-r2), u3PairNum(-r1,r2), u3PairNum(r1,-r2),
           u3PairNum(r1+r2, r1*r2), u3PairNum(r1-1, r2), u3PairNum(r1, r2+1),
           u3PairNum(r1+1, r2), u3PairNum(r1, r2-1), u3PairNum(r2-r1, r1+r2),
           u3PairNum(r1-1, r2+1), u3PairNum(r1-2, r2), u3PairNum(r1, r2+2) ];
}

/* ---------- 3.14: factor out a common factor (L1) ---------- */
E("u3-factor-common",3,["3.14"],1,"gen",function(){
  var att=0, d, k, A2, A1, A0, inside, origP;
  while(att<300){
    att++;
    d=ri(2,9); k=ri(1,2);
    A2=pick([0,1,2,3,-2,-3]); A1=ri(-9,9);
    A0=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
    var nz=(A2!==0?1:0)+(A1!==0?1:0)+1;
    if(nz<2) continue;
    if(u3Gcd(u3Gcd(A2,A1),A0)!==1) continue;
    if(A2!==0){ var disc=A1*A1-4*A2*A0, dsq=Math.sqrt(disc); if(disc>=0&&dsq===Math.floor(dsq)) continue; }
    break;
  }
  inside={0:A0,1:A1,2:A2};
  origP={}; Object.keys(inside).forEach(function(p){ origP[Number(p)+k]=d*inside[p]; });
  function polyPS(P){ var ps=Object.keys(P).map(Number).sort(function(x,y){return y-x;});
    var cf=ps.map(function(p){ return P[p]; });
    /* rebuild with explicit degree so zero gaps are kept */
    var top=ps[0], arr=[], i;
    for(i=top;i>=0;i--) arr.push(P[i]||0);
    return u3PolyS(arr);
  }
  var gcfS=d+"x"+(k>1?"^"+k:"");
  var insideS=polyPS(inside);
  var key=gcfS+"("+insideS+")";
  var shifted={}; Object.keys(inside).forEach(function(p){ shifted[Number(p)+k]=inside[p]; });
  var scaled={}; Object.keys(inside).forEach(function(p){ scaled[p]=d*inside[p]; });
  var midFlip={0:A0,1:-A1,2:A2}, constFlip={0:-A0,1:A1,2:A2}, noConst={1:A1,2:A2};
  var cands=[ d+"("+polyPS(shifted)+")",
              gcfS+"("+polyPS(midFlip)+")",
              gcfS+"("+polyPS(constFlip)+")",
              "x^"+k+"("+polyPS(scaled)+")".replace("x^1","x"),
              (d+1)+"x"+(k>1?"^"+k:"")+"("+insideS+")" ];
  if(A1===0) cands.splice(1,1);
  return mcq("Factor completely: \\("+polyPS(origP)+"\\)",
    "\\("+key+"\\)",
    u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
    "Every term of \\("+polyPS(origP)+"\\) is divisible by \\("+gcfS+"\\), and the remaining factor \\("+insideS+"\\) has no factor common to all of its terms:"+
    "\\[ "+polyPS(origP)+" = "+key+" \\]"+
    "So the complete factorization is <b>\\("+key+"\\)</b>.",
    {d:d, k:k});
});

/* ---------- 4.9: roots, zeros and x-intercepts are the same numbers (L1) ---------- */
E("u3-roots-zeros",3,["4.9"],1,"gen",function(){
  var mode=pick(["given","intercepts","factored","factored","statement"]);
  if(mode==="statement"){
    return mcq("For a quadratic function \\(f\\) and the corresponding equation \\(f(x) = 0\\), which statement is correct?",
      "The roots of the equation are exactly the zeros of the function, and both are the x-coordinates of the x-intercepts of the graph",
      ["The roots of the equation are exactly the zeros of the function, and both are the y-coordinates of the y-intercept of the graph",
       "The zeros of the function are the x-coordinates of the x-intercepts, and the roots of the equation are the coordinates of the vertex",
       "The zeros of the function occur where the graph crosses the y-axis, and the roots are the values of the function at those points"],
      "The three terms name the same numbers from three points of view. Solving \\(f(x) = 0\\) gives the <b>roots</b> of the equation; those input values are the <b>zeros</b> of the function; and on the graph they appear as the x-coordinates of the <b>x-intercepts</b>, the points where the graph crosses the x-axis.",
      {mode:mode});
  }
  var r1=0, r2=0, att=0;
  while(att<200){ att++; r1=ri(-6,6); r2=ri(-6,6);
    if(r1!==0 && r2!==0 && r1!==r2 && r1+r2!==0) break; }
  var lo=Math.min(r1,r2), hi=Math.max(r1,r2);
  var a=pick([1,2,3]), b=-a*(r1+r2), c=a*r1*r2, Q=u3QuadS(a,b,c);
  function andPair(x,y){ return "\\(x = "+x+"\\) and \\(x = "+y+"\\)"; }
  function andPairN(x,y){ return andPair(Math.min(x,y), Math.max(x,y)); }
  if(mode==="given"){
    var key=andPairN(lo,hi);
    var cands=[andPairN(-lo,-hi), andPairN(-lo,hi), andPairN(lo,-hi), andPairN(lo+hi, lo*hi)];
    var qz=mcq("The equation \\("+Q+" = 0\\) has solutions \\(x = "+lo+"\\) and \\(x = "+hi+"\\). What are the <b>zeros</b> of the function \\(f(x) = "+Q+"\\)?",
      key, u3Opts(key,cands),
      "The zeros of a function are the input values that make the output zero, so they are exactly the solutions of the equation \\(f(x) = 0\\). The zeros are <b>\\(x = "+lo+"\\)</b> and <b>\\(x = "+hi+"\\)</b>.",
      {mode:mode, a:a});
    qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
    return qz;
  }
  if(mode==="intercepts"){
    var key2=andPairN(lo,hi);
    var cands2=[andPairN(-lo,-hi), andPairN(-lo,hi), andPairN(lo,-hi), andPairN(lo+hi, lo*hi)];
    var qz=mcq("The graph of the function \\(f(x) = "+Q+"\\) crosses the x-axis at \\(("+lo+", 0)\\) and \\(("+hi+", 0)\\). What are the <b>solutions</b> of the equation \\("+Q+" = 0\\)?",
      key2, u3Opts(key2,cands2),
      "An x-intercept is a point where the function value is zero, so its x-coordinate is a solution of \\(f(x) = 0\\). The solutions are <b>\\(x = "+lo+"\\)</b> and <b>\\(x = "+hi+"\\)</b>.",
      {mode:mode, a:a});
    qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
    return qz;
  }
  /* factored */
  var fS="\\(f(x) = "+(a===1?"":a)+u3FacS(r1)+u3FacS(r2)+"\\)";
  function ptPair(x,y){ return "\\(("+x+", 0)\\) and \\(("+y+", 0)\\)"; }
  function ptPairN(x,y){ return ptPair(Math.min(x,y), Math.max(x,y)); }
  var key3=ptPairN(lo,hi);
  var cands3=[ptPairN(-lo,-hi), ptPairN(-lo,hi), ptPairN(lo,-hi),
              "\\((0, "+lo+")\\) and \\((0, "+hi+")\\)"];
  var qz=mcq("Given "+fS+", what are the <b>x-intercepts</b> of the graph of \\(f\\)?",
    key3, u3Opts(key3,cands3),
    "The product "+(a===1?"":a)+u3FacS(r1)+u3FacS(r2)+" is zero when one of its factors is zero: \\("+u3BinS(r1)+" = 0\\) gives \\(x = "+r1+"\\), and \\("+u3BinS(r2)+" = 0\\) gives \\(x = "+r2+"\\). So the graph crosses the x-axis at <b>\\(("+lo+", 0)\\)</b> and <b>\\(("+hi+", 0)\\)</b>.",
    {mode:mode, a:a});
  qz.figure=parSVG(a,b,c,{marks:[{x:lo,y:0},{x:hi,y:0}]});
  return qz;
});

/* ---------- 3.15: factor trinomials and differences of squares (L1; the non-monic family was split out as u3-factor-trinomial-nonmonic under ruling 8, Nov 13, 2026) ---------- */
E("u3-factor-trinomial",3,["3.15"],1,"gen",function(){
  var fam=pick(["monic","diffsq"]);
  if(fam==="monic"){
    var r1=ri(-9,9), r2=ri(-9,9), att=0;
    while(att<200 && (r1===0 || r2===0)){ att++; r1=ri(-9,9); r2=ri(-9,9); }
    var b=-(r1+r2), c=r1*r2;
    var key=u3TwoFac(u3FacS(r1), u3FacS(r2));
    function expM(x,y){ return [1, -(x+y), x*y]; }
    var candRoots=[[-r1,r2],[r1,-r2],[-r1,-r2],[r1+1,r2-1],[r1-1,r2+1],[r1+2,r2],[r1,r2+2]];
    var cands=[];
    candRoots.forEach(function(pr){ var e=expM(pr[0],pr[1]);
      if(e[1]!==b || e[2]!==c) cands.push(u3TwoFac(u3FacS(pr[0]), u3FacS(pr[1]))); });
    return mcq("Factor: \\("+u3QuadS(1,b,c)+"\\)",
      "\\("+key+"\\)", u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
      "Look for two numbers with product \\("+c+"\\) and sum \\("+b+"\\): the numbers are \\("+(-r1)+"\\) and \\("+(-r2)+"\\), since \\(("+(-r1)+") \\times ("+(-r2)+") = "+c+"\\) and \\(("+(-r1)+") + ("+(-r2)+") = "+b+"\\)."+
      "\\[ "+u3QuadS(1,b,c)+" = "+key+" \\]"+
      "So the factorization is <b>\\("+key+"\\)</b>.",
      {fam:fam});
  }
  /* difference of squares */
  var A=ri(2,9), B=ri(2,9), twoVar=Math.random()<0.5;
  var stemExpr, key3, cands3;
  if(twoVar){
    stemExpr=(A*A)+"x^2 - "+(B*B)+"y^2";
    key3="("+A+"x - "+B+"y)("+A+"x + "+B+"y)";
    cands3=[ "("+A+"x - "+B+"y)("+A+"x - "+B+"y)",
             "("+A+"x + "+B+"y)("+A+"x + "+B+"y)",
             "("+(A*A)+"x - "+(B*B)+"y)("+(A*A)+"x + "+(B*B)+"y)",
             "("+A+"x - "+(B*B)+"y)("+A+"x + "+(B*B)+"y)" ];
  } else {
    stemExpr=(A*A)+"x^2 - "+(B*B);
    key3="("+A+"x - "+B+")("+A+"x + "+B+")";
    cands3=[ "("+A+"x - "+B+")("+A+"x - "+B+")",
             "("+A+"x + "+B+")("+A+"x + "+B+")",
             "("+(A*A)+"x - "+(B*B)+")("+(A*A)+"x + "+(B*B)+")",
             "("+A+"x - "+(B*B)+")("+A+"x + "+(B*B)+")" ];
  }
  return mcq("Factor: \\("+stemExpr+"\\)",
    "\\("+key3+"\\)", u3Opts("\\("+key3+"\\)", cands3.map(function(s3){ return "\\("+s3+"\\)"; })),
    "Each term is a perfect square: \\("+(A*A)+(twoVar?"x^2":"x^2")+" = ("+A+(twoVar?"x":"x")+")^2\\) and \\("+(B*B)+(twoVar?"y^2":"")+" = ("+B+(twoVar?"y":"")+")^2\\). A difference of squares factors as \\(u^2 - v^2 = (u - v)(u + v)\\):"+
    "\\[ "+stemExpr+" = "+key3+" \\]"+
    "So the factorization is <b>\\("+key3+"\\)</b>.",
    {fam:fam});
});

/* ---------- 3.15: factor non-monic trinomials (L2; split from u3-factor-trinomial under ruling 8, Nov 13, 2026) ---------- */
E("u3-factor-trinomial-nonmonic",3,["3.15"],2,"gen",function(){
  var fam="nonmonic";
    var att2=0, p,q,r,s,a2,b2,c2,key2;
    while(att2<300){
      att2++;
      p=pick([1,2,3]); r=pick([1,2,3]); q=ri(-6,6); s=ri(-6,6);
      if(q===0 || s===0) continue;
      a2=p*r; b2=p*s+q*r; c2=q*s;
      if(a2<2) continue;
      key2=u3TwoFac(u3FacLinS(p,q), u3FacLinS(r,s));
      break;
    }
    function expN(p1,q1,p2,q2){ return [p1*p2, p1*q2+q1*p2, q1*q2]; }
    var specs=[[p,-q,r,s],[p,q,r,-s],[p,-q,r,-s],[p,s,r,q],[r,q,p,s],[p,q+1,r,s],[p,q,r,s+1]];
    var cands2=[];
    specs.forEach(function(sp){ var e=expN(sp[0],sp[1],sp[2],sp[3]);
      if(e[0]!==a2 || e[1]!==b2 || e[2]!==c2)
        cands2.push(u3TwoFac(u3FacLinS(sp[0],sp[1]), u3FacLinS(sp[2],sp[3]))); });
    function xTerm(co){ if(co===0) return ""; var t=(Math.abs(co)===1?"x":Math.abs(co)+"x"); return (co<0?" - ":" + ")+t; }
    function cTerm(co){ if(co===0) return ""; return (co<0?" - "+(-co):" + "+co); }
    var expLine=a2+"x^2"+xTerm(p*s)+xTerm(q*r)+cTerm(q*s);
    return mcq("Factor: \\("+u3QuadS(a2,b2,c2)+"\\)",
      "\\("+key2+"\\)", u3Opts("\\("+key2+"\\)", cands2.map(function(s2){ return "\\("+s2+"\\)"; })),
      "The factor pair "+key2+" can be checked by expanding:"+
      "\\[ \\begin{aligned} "+key2+" &= "+expLine+" \\\\ &= "+u3QuadS(a2,b2,c2)+" \\end{aligned} \\]"+
      "which matches the given trinomial, so the factorization is <b>\\("+key2+"\\)</b>.",
      {fam:fam});
});

/* ---------- 3.16: is a binomial a factor? Use the factor theorem (L2) ---------- */
E("u3-factor-test",3,["3.16"],1,"gen",function(){
  var isFac=Math.random()<0.5;
  var k=ri(-6,6); if(k===0) k=3;
  var al=pick([1,2,3]), be=ri(-6,6);
  /* base = (x - k)(al x + be); P(k) = r0 */
  var a=al, b=be-al*k, c=-be*k;
  var r0=0;
  if(!isFac){ r0=pick([-5,-4,-3,-2,-1,1,2,3,4,5]); c+=r0; }
  var P=u3QuadS(a,b,c), val=a*k*k+b*k+c;
  var wk1=pick([1,2,3,4,6]), wk2=pick([-6,-4,-3,-2,-1,1,2,3,4,6]);
  if(wk2===val || wk2===0) wk2=val+3;
  var key, cands;
  if(isFac){
    key="Yes, because \\(P("+k+") = 0\\)";
    cands=["No, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+wk1+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  } else {
    key="No, because \\(P("+k+") = "+val+"\\)";
    cands=["Yes, because \\(P("+k+") = 0\\)",
           "Yes, because \\(P("+k+") = "+val+"\\)",
           "No, because \\(P("+k+") = "+wk2+"\\)"];
  }
  return mcq("Let \\(P(x) = "+P+"\\). Is \\("+u3BinS(k)+"\\) a factor of \\(P(x)\\)?",
    key, cands,
    "By the factor theorem, \\("+u3BinS(k)+"\\) is a factor of \\(P(x)\\) exactly when \\(P("+k+") = 0\\). Evaluate:"+
    "\\[ \\begin{aligned} P("+k+") &= "+a+"("+k+")^2 "+(b<0?"- "+(-b):"+ "+b)+"("+k+") "+(c<0?"- "+(-c):"+ "+c)+" \\\\ &= "+val+" \\end{aligned} \\]"+
    (isFac ? "Since \\(P("+k+") = 0\\), the remainder on division by \\("+u3BinS(k)+"\\) is zero, so <b>yes</b>, \\("+u3BinS(k)+"\\) is a factor."
           : "Since \\(P("+k+") = "+val+" \\ne 0\\), division by \\("+u3BinS(k)+"\\) leaves a remainder of \\("+val+"\\), so <b>no</b>, \\("+u3BinS(k)+"\\) is not a factor."),
    {k:k, val:val});
});

/* ---------- 3.17: factor a difference of squares with function expressions (L2) ---------- */
E("u3-factor-func-diff",3,["3.17"],2,"gen",function(){
  var fam=pick(["xy","xx","mix"]);
  var A=ri(2,9), B=ri(2,9), p=ri(-5,5), q=ri(-5,5);
  if(fam==="xx" && p===q) q=q+2;
  var innerX, innerY;
  if(fam==="xy"){ innerX=u3InnerS(1,"x",p); innerY=u3InnerS(1,"y",q); }
  else if(fam==="xx"){ innerX=u3InnerS(1,"x",p); innerY=u3InnerS(1,"x",q); }
  else { innerX=u3InnerS(2,"x",p); innerY=u3InnerS(1,"y",q); }
  var bigX=A+"("+innerX+")", bigY=B+"("+innerY+")";
  var stemExpr=(A*A)+"("+innerX+")^2 - "+(B*B)+"("+innerY+")^2";
  var key="("+bigX+" - "+bigY+")("+bigX+" + "+bigY+")";
  var bigX2=(A*A)+"("+innerX+")", bigY2=(B*B)+"("+innerY+")";
  var cands=[ "("+bigX+" - "+bigY+")("+bigX+" - "+bigY+")",
              "("+bigX+" + "+bigY+")("+bigX+" + "+bigY+")",
              "("+bigX2+" - "+bigY2+")("+bigX2+" + "+bigY2+")",
              "("+bigX+" - "+bigY2+")("+bigX+" + "+bigY2+")" ];
  return mcq("Factor: \\("+stemExpr+"\\)",
    "\\("+key+"\\)", u3Opts("\\("+key+"\\)", cands.map(function(s){ return "\\("+s+"\\)"; })),
    "The expression is a difference of squares, \\(\\left("+bigX+"\\right)^2 - \\left("+bigY+"\\right)^2\\), where the two squared parts are \\("+bigX+"\\) and \\("+bigY+"\\). Using \\(u^2 - v^2 = (u - v)(u + v)\\):"+
    "\\[ "+stemExpr+" = "+key+" \\]"+
    "So the factorization is <b>\\("+key+"\\)</b>.",
    {fam:fam});
});

/* ---------- 4.10: solve a quadratic equation (L2) ---------- */
E("u3-solve-strategies",3,["4.10"],2,"gen",function(){
  var fam=pick(["sqroot","sqroot","factor","formula","cts"]);
  if(fam==="sqroot"){
    var h=ri(-6,6); if(h===0) h=4;
    var radical=Math.random()<0.45, K, s, rp;
    if(radical){ var mm=pick([2,3,5,6,7]); s=pick([1,2]); K=s*s*mm; rp=[s,mm]; }
    else { s=ri(2,7); K=s*s; rp=[s,1]; }
    var inner=u3InnerS(1,"x",-h);
    var eqStr="("+inner+")^2 = "+K;
    function radRoot(sign){ /* h + sign * s*sqrt(mm) as a string */
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(h+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(h===0) return (sign<0?"-":"")+term;
      return h+(sign<0?" - ":" + ")+term;
    }
    var loS=radRoot(-1), hiS=radRoot(1);
    var key="\\(x = "+loS+" \\text{ or } x = "+hiS+"\\)";
    function radRootH(hh, sign){
      var coef=rp[0], mm2=rp[1];
      if(mm2===1) return ""+(hh+sign*coef);
      var term=(coef===1?"\\sqrt{"+mm2+"}":coef+"\\sqrt{"+mm2+"}");
      if(hh===0) return (sign<0?"-":"")+term;
      return hh+(sign<0?" - ":" + ")+term;
    }
    var cands=[ "\\(x = "+radRootH(-h,-1)+" \\text{ or } x = "+radRootH(-h,1)+"\\)",
                "\\(x = "+radRootH(0,-1)+" \\text{ or } x = "+radRootH(0,1)+"\\)" ];
    if(rp[1]===1) cands.push("\\(x = "+(h-s*s)+" \\text{ or } x = "+(h+s*s)+"\\)");
    else if(rp[0]===1) cands.push("\\(x = "+h+" - 2\\sqrt{"+rp[1]+"} \\text{ or } x = "+h+" + 2\\sqrt{"+rp[1]+"}\\)");
    else cands.push("\\(x = "+h+" - "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"} \\text{ or } x = "+h+" + "+(rp[0]*rp[1])+"\\sqrt{"+rp[0]+"}\\)");
    var sqrtK=(rp[1]===1? ""+rp[0] : (rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"));
    return mcq("Solve: \\("+eqStr+"\\)",
      key, u3Opts(key,cands),
      "Take the square root of both sides, keeping both the positive and negative roots:"+
      "\\[ \\begin{aligned} ("+inner+")^2 &= "+K+" \\\\ "+inner+" &= \\pm "+sqrtK+" \\\\ x &= "+h+" \\pm "+sqrtK+" \\end{aligned} \\]"+
      "So the solutions are <b>\\(x = "+loS+"\\)</b> and <b>\\(x = "+hiS+"\\)</b>.",
      {fam:fam});
  }
  if(fam==="factor" || fam==="formula"){
    var a2=(fam==="factor") ? pick([1,2]) : pick([2,3,4]);
    var r1=ri(-8,8), r2=ri(-8,8), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-8,8); }
    var b2=-a2*(r1+r2), c2=a2*r1*r2, Q=u3QuadS(a2,b2,c2);
    var key2=u3PairNum(r1,r2);
    var sol;
    if(fam==="factor"){
      sol="Factor the left side and set each factor equal to zero:"+
        "\\[ \\begin{aligned} "+Q+" &= 0 \\\\ "+(a2===1?"":a2)+u3FacS(r1)+u3FacS(r2)+" &= 0 \\end{aligned} \\]"+
        "So \\("+u3BinS(r1)+" = 0\\) or \\("+u3BinS(r2)+" = 0\\), giving <b>\\(x = "+r1+"\\)</b> or <b>\\(x = "+r2+"\\)</b>.";
    } else {
      var D=b2*b2-4*a2*c2, sD=Math.round(Math.sqrt(D));
      sol="Apply the quadratic formula with \\(a = "+a2+"\\), \\(b = "+b2+"\\) and \\(c = "+c2+"\\):"+
        "\\[ \\begin{aligned} x &= \\frac{-("+b2+") \\pm \\sqrt{("+b2+")^2 - 4("+a2+")("+c2+")}}{2("+a2+")} \\\\ &= \\frac{"+(-b2)+" \\pm "+sD+"}{"+(2*a2)+"} \\end{aligned} \\]"+
        "So the solutions are <b>\\(x = "+r1+"\\)</b> and <b>\\(x = "+r2+"\\)</b>.";
    }
    return mcq("Solve: \\("+Q+" = 0\\)",
      key2, u3Opts(key2, u3SignCands(r1,r2)), sol, {fam:fam});
  }
  /* completing the square, presented in the solution */
  var t1=ri(-8,8), t2=ri(-8,8), att3=0;
  while(att3<300){ att3++; t1=ri(-8,8); t2=ri(-8,8);
    if(t1!==t2 && ((t1+t2)%2===0)) break; }
  var B=-(t1+t2), C=t1*t2, m=B/2, s2=Math.abs(t2-t1)/2;
  var key3=u3PairNum(t1,t2);
  return mcq("Solve: \\("+u3QuadS(1,B,C)+" = 0\\)",
    key3, u3Opts(key3, u3SignCands(t1,t2)),
    "Complete the square. Move the constant, then add \\(\\left(\\frac{"+B+"}{2}\\right)^2 = "+(m*m)+"\\) to both sides:"+
    "\\[ \\begin{aligned} x^2 "+(B<0?"- "+(-B):"+ "+B)+"x &= "+(-C)+" \\\\ x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + "+(m*m)+" &= "+(-C)+" + "+(m*m)+" \\\\ (x "+(m<0?"- "+(-m):"+ "+m)+")^2 &= "+(s2*s2)+" \\\\ x "+(m<0?"- "+(-m):"+ "+m)+" &= \\pm "+s2+" \\end{aligned} \\]"+
    "So the solutions are <b>\\(x = "+t1+"\\)</b> and <b>\\(x = "+t2+"\\)</b>.",
    {fam:fam});
});

/* ---------- 4.14: discriminant and the nature of the roots (L2) ---------- */
E("u3-discriminant-nature",3,["4.14"],2,"var",varset([
  function(){
  var N={two:"two distinct real roots", rep:"one repeated real root", none:"no real roots"};
  var G={two:"crosses the x-axis at two points", rep:"touches the x-axis at exactly one point", none:"does not cross the x-axis"};
  if(Math.random()<0.3){
    var facts=[ ["The graph of a quadratic function crosses the x-axis at two points","two"],
                ["The graph of a quadratic function touches the x-axis at exactly one point","rep"],
                ["The graph of a quadratic function does not cross the x-axis","none"],
                ["A quadratic equation has two distinct real roots","two"],
                ["A quadratic equation has no real roots","none"],
                ["A quadratic equation has one repeated real root","rep"] ];
    var f=pick(facts), ck=f[1];
    var keyS="\\(b^2 - 4ac "+(ck==="two"?">":ck==="rep"?"=":"<")+" 0\\)";
    var others=[">","=","<"].filter(function(sy){ return sy!==(ck==="two"?">":ck==="rep"?"=":"<"); });
    var cands=["\\(b^2 - 4ac "+others[0]+" 0\\)", "\\(b^2 - 4ac "+others[1]+" 0\\)",
               "It cannot be determined from this information"];
    return mcq(f[0]+". What is the sign of the discriminant \\(b^2 - 4ac\\) of the corresponding equation?",
      keyS, cands,
      "The discriminant determines the number of real roots: positive means two distinct real roots and two x-intercepts, zero means one repeated root and one touching point, and negative means no real roots and no x-intercepts. Here the discriminant is <b>"+(ck==="two"?"positive":ck==="rep"?"zero":"negative")+"</b>, so <b>"+keyS.replace("\\(","").replace("\\)","")+"</b>.",
      {mode:"fact"});
  }
  var which=pick(["two-square","two-nonsquare","repeated","none"]);
  var a,b,c,D;
  if(which==="two-square"){
    a=pick([1,2]); var r1=ri(-7,7), r2=ri(-7,7), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-7,7); }
    b=-a*(r1+r2); c=a*r1*r2; D=b*b-4*a*c;
  } else if(which==="repeated"){
    a=pick([1,2,3]); var r=ri(-6,6); b=-2*a*r; c=a*r*r; D=0;
  } else {
    var att2=0;
    while(att2<500){ att2++; a=ri(1,3); b=ri(-10,10); c=ri(-10,10); D=b*b-4*a*c;
      if(which==="none" && D<0) break;
      if(which==="two-nonsquare" && D>0 && u3RadParts(D)[1]>1) break; }
  }
  var ck2=(which==="repeated")?"rep":(which==="none")?"none":"two";
  var wIdx=pick(["two","rep","none"].filter(function(x){ return x!==ck2; }));
  function stmt(n,g){ return "The equation has "+N[n]+", and the graph of the corresponding function "+G[g]; }
  var key4=stmt(ck2,ck2);
  var cands4=[stmt(ck2,wIdx), stmt(wIdx,ck2), stmt(wIdx,wIdx)];
  return mcq("For the equation \\("+u3QuadS(a,b,c)+" = 0\\), which statement is correct?",
    key4, cands4,
    "Compute the discriminant:"+
    "\\[ \\begin{aligned} b^2 - 4ac &= ("+b+")^2 - 4("+a+")("+c+") \\\\ &= "+D+" \\end{aligned} \\]"+
    (ck2==="two" ? "The discriminant is positive, so there are <b>two distinct real roots</b>, and the graph crosses the x-axis at two points."
      : ck2==="rep" ? "The discriminant is zero, so there is <b>one repeated real root</b>, and the graph touches the x-axis at exactly one point."
      : "The discriminant is negative, so there are <b>no real roots</b>, and the graph does not cross the x-axis."),
    {mode:"equation", D:D});
},
  function(){
    var kind=pick(["two","rep","none"]);var a=pick([1,2]),b,c,D;
    if(kind==="rep"){b=pick([4,6]);c=b*b/(4*a);D=0;}
    else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
    else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
    var NN={two:"two distinct real roots",rep:"one repeated real root",none:"no real roots"};
    var SS={two:"positive",rep:"zero",none:"negative"};
    function stmt(n){ return "The equation has "+NN[n]+", and its discriminant is "+SS[n]; }
    var key=stmt(kind);
    var others=["two","rep","none"].filter(function(x){ return x!==kind; });
    var solD=kind==="two" ? "The graph crosses the x-axis at two points, so the equation has two distinct real roots. That happens exactly when the discriminant is positive."
      : kind==="rep" ? "The graph touches the x-axis at exactly one point, so the equation has one repeated real root. That happens exactly when the discriminant is zero."
      : "The graph never reaches the x-axis, so the equation has no real roots. That happens exactly when the discriminant is negative.";
    var qfig=mcq("The graph of a quadratic function is shown. Which statement about the corresponding equation is correct?",
      key,[stmt(others[0]),stmt(others[1]),"It cannot be determined from the graph"],
      solD,
      {kind:kind,a:a,b:b,c:c,D:D});
    var mk=[];if(D>0){var sq=Math.sqrt(D);mk=[{x:(-b-sq)/(2*a),y:0},{x:(-b+sq)/(2*a),y:0}];}else if(D===0){mk=[{x:-b/(2*a),y:0}];}
    qfig.figure=parSVG(a,b,c,{labels:"values",marks:mk});
    return qfig;
  }
]));

/* ---------- 4.14: find k from a discriminant condition (L2) ---------- */
E("u3-discriminant-k",3,["4.14"],2,"gen",function(){
  var mode=pick(["constK","constK","linK","leadK","givenD"]);
  if(mode==="constK"){
    var pr=pick([[1,4],[1,6],[1,8],[1,10],[1,12],[1,-6],[1,-8],[1,-10],
                 [4,4],[4,8],[4,12],[4,16],[4,-8],[2,4],[2,8],[2,12],[2,-8]]);
    var A=pr[0], B=pr[1], kv=(B*B)/(4*A);
    return numq("The equation \\("+A+"x^2 "+(B<0?"- "+(-B):"+ "+B)+"x + k = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv, 0.001,
      "A repeated root occurs exactly when the discriminant is zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B+")^2 - 4("+A+")k &= 0 \\\\ "+(B*B)+" &= "+(4*A)+"k \\\\ k &= "+kv+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="linK"){
    var m=ri(2,9), C=m*m, kv2=2*m;
    return numq("The equation \\(x^2 + kx + "+C+" = 0\\) has two equal real roots. What is the positive value of \\(k\\)?",
      kv2, 0.001,
      "Equal roots require a discriminant of zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ k^2 - 4(1)("+C+") &= 0 \\\\ k^2 &= "+(4*C)+" \\\\ k &= \\pm "+kv2+" \\end{aligned} \\]"+
      "The positive value is <b>\\(k = "+kv2+"\\)</b>.",
      {mode:mode});
  }
  if(mode==="leadK"){
    var pr2=pick([[2,1],[4,1],[6,1],[4,4],[8,4],[12,4],[6,9],[12,9],[-6,1],[-8,4]]);
    var B2=pr2[0], C2=pr2[1], kv3=(B2*B2)/(4*C2);
    return numq("The equation \\(kx^2 "+(B2<0?"- "+(-B2):"+ "+B2)+"x + "+C2+" = 0\\) has exactly one repeated real root. What is the value of \\(k\\)?",
      kv3, 0.001,
      "Set the discriminant equal to zero:"+
      "\\[ \\begin{aligned} b^2 - 4ac &= 0 \\\\ ("+B2+")^2 - 4(k)("+C2+") &= 0 \\\\ "+(B2*B2)+" &= "+(4*C2)+"k \\\\ k &= "+kv3+" \\end{aligned} \\]"+
      "So <b>\\(k = "+kv3+"\\)</b>.",
      {mode:mode});
  }
  /* givenD: a discriminant value is given, one coefficient is missing */
  if(Math.random()<0.5){
    var B3=ri(-10,10), c0=ri(-12,12), D0=B3*B3-4*c0;
    return numq("The discriminant of \\(x^2 "+(B3<0?"- "+(-B3):"+ "+B3)+"x + c = 0\\) is "+D0+". What is the value of \\(c\\)?",
      c0, 0.001,
      "Substitute into the discriminant formula and solve for \\(c\\):"+
      "\\[ \\begin{aligned} b^2 - 4ac &= "+D0+" \\\\ ("+B3+")^2 - 4(1)c &= "+D0+" \\\\ "+(B3*B3)+" - 4c &= "+D0+" \\\\ c &= "+c0+" \\end{aligned} \\]"+
      "So <b>\\(c = "+c0+"\\)</b>.",
      {mode:mode});
  }
  var b0=ri(2,10), C3=ri(-8,12), D3=b0*b0-4*C3;
  return numq("The discriminant of \\(x^2 + bx "+(C3<0?"- "+(-C3):"+ "+C3)+" = 0\\) is "+D3+", and \\(b > 0\\). What is the value of \\(b\\)?",
    b0, 0.001,
    "Substitute into the discriminant formula and solve for \\(b\\):"+
    "\\[ \\begin{aligned} b^2 - 4ac &= "+D3+" \\\\ b^2 - 4(1)("+C3+") &= "+D3+" \\\\ b^2 &= "+(b0*b0)+" \\\\ b &= "+b0+" \\end{aligned} \\]"+
    "Taking the positive value, <b>\\(b = "+b0+"\\)</b>.",
    {mode:mode});
});

/* ---------- 4.15: model a problem with a quadratic equation and solve it (L2) ---------- */
E("u3-problem-model",3,["4.15"],2,"gen",function(){
  var ctx=pick(["rect","projectile","consecutive","frame"]);
  if(ctx==="rect"){
    var w=ri(4,15), d=ri(2,7), A=w*(w+d);
    var qp=numq("A rectangular garden is "+d+" m longer than it is wide, and its area is "+A+" m². What is the width of the garden, in metres?",
      w, 0.001,
      "Let the width be \\(w\\) metres, so the length is \\(w + "+d+"\\) metres. Area gives:"+
      "\\[ \\begin{aligned} w(w + "+d+") &= "+A+" \\\\ w^2 + "+d+"w - "+A+" &= 0 \\\\ (w - "+w+")(w + "+(w+d)+") &= 0 \\end{aligned} \\]"+
      "So \\(w = "+w+"\\) or \\(w = "+(-(w+d))+"\\). A width cannot be negative, so the width is <b>"+w+" m</b>.",
      {ctx:"rect", w:w, d:d});
    qp.figure=rectDiagSVG("w m","w + "+d+" m","Area = "+A+" m²");
    return qp;
  }
  if(ctx==="projectile"){
    var T=pick([2,3,4]);
    var v=pick(T===2?[5]:(T===3?[5,10]:[5,10,15]));
    var h0=T*(5*T-v), Dv=(10*T-v)*(10*T-v), sD=10*T-v;
    var surface=(h0>=40)?"the top of a cliff":"a platform";
    var qp=numq("A ball is thrown upward from "+surface+" "+h0+" m above the ground, with an initial speed of "+v+" m/s. Its height above the ground, in metres, after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t + "+h0+"\\). How long does it take for the ball to reach the ground, in seconds?",
      T, 0.001,
      "The ball reaches the ground when \\(h(t) = 0\\). Apply the quadratic formula:"+
      "\\[ \\begin{aligned} -5t^2 + "+v+"t + "+h0+" &= 0 \\\\ t &= \\frac{-"+v+" \\pm \\sqrt{"+v+"^2 - 4(-5)("+h0+")}}{2(-5)} \\\\ &= \\frac{-"+v+" \\pm "+sD+"}{-10} \\end{aligned} \\]"+
      "The two values are \\(t = "+T+"\\) and \\(t = "+fmt((v-5*T)/5,2)+"\\). Time cannot be negative, so the ball reaches the ground after <b>"+T+" s</b>.",
      {ctx:"projectile", T:T, v:v, h0:h0, surface:surface});
    qp.figure=trajSVG(-5,v,h0);
    return qp;
  }
  if(ctx==="consecutive"){
    var kind=pick(["plain","even","odd"]);
    var step=(kind==="plain")?1:2, n;
    if(kind==="plain") n=ri(6,20);
    else if(kind==="even") n=2*ri(3,12);
    else n=2*ri(2,11)+1;
    var P=n*(n+step);
    var label=(kind==="plain")?"consecutive positive integers":(kind==="even")?"consecutive positive even integers":"consecutive positive odd integers";
    var stepW=(kind==="plain")?"n + 1":"n + 2";
    return numq("The product of two "+label+" is "+P+". What is the smaller of the two numbers?",
      n, 0.001,
      "Let the smaller number be \\(n\\); the next one is \\("+stepW+"\\). Their product gives:"+
      "\\[ \\begin{aligned} n("+stepW+") &= "+P+" \\\\ n^2 + "+step+"n - "+P+" &= 0 \\\\ (n - "+n+")(n + "+(n+step)+") &= 0 \\end{aligned} \\]"+
      "So \\(n = "+n+"\\) or \\(n = "+(-(n+step))+"\\). The numbers are positive, so the smaller number is <b>"+n+"</b>.",
      {ctx:"consecutive", kind:kind, n:n, step:step});
  }
  /* frame */
  var dims=pick([[24,18],[30,20],[25,20],[40,30],[36,24],[20,16]]);
  var W=dims[0], H=dims[1], x=ri(2,5);
  var TOT=(W+2*x)*(H+2*x), S=W+H, sD2=2*(S+4*x);
  return numq("A photograph "+W+" cm by "+H+" cm is mounted in a frame with a border of uniform width. The total area of the photograph and the frame together is "+TOT+" cm². What is the width of the border, in centimetres?",
    x, 0.001,
    "Let the border width be \\(x\\) cm. The outer dimensions are \\(("+W+" + 2x)\\) cm by \\(("+H+" + 2x)\\) cm, so:"+
    "\\[ \\begin{aligned} ("+W+" + 2x)("+H+" + 2x) &= "+TOT+" \\\\ 4x^2 + "+(2*S)+"x "+((W*H-TOT)<0?"- "+(TOT-W*H):"+ "+(W*H-TOT))+" &= 0 \\\\ x &= \\frac{-"+(2*S)+" \\pm \\sqrt{"+(2*S)+"^2 - 16("+(W*H-TOT)+")}}{8} \\\\ &= \\frac{-"+(2*S)+" \\pm "+sD2+"}{8} \\end{aligned} \\]"+
    "The two values are \\(x = "+x+"\\) and \\(x = "+fmt((-(2*S)-sD2)/8,2)+"\\). A border width cannot be negative, so the width is <b>"+x+" cm</b>.",
    {ctx:"frame", W:W, H:H, x:x});
});

/* ---------- 4.11: derive the quadratic formula (L3, var) ---------- */
E("u3-derive-formula",3,["4.11"],3,"var",varset([
  function(){
    return mcq("The quadratic formula is derived from \\(ax^2 + bx + c = 0\\), where \\(a \\ne 0\\), by completing the square. After every term is divided by \\(a\\) and the constant term is moved to the right side, the equation reads \\(x^2 + \\frac{b}{a}x = -\\frac{c}{a}\\). What is the next step?",
      "Add \\(\\left(\\frac{b}{2a}\\right)^2\\) to both sides",
      ["Take the square root of both sides",
       "Add \\(\\frac{b}{2a}\\) to both sides",
       "Multiply both sides by \\(2a\\)"],
      "Completing the square means adding the square of half the coefficient of \\(x\\). Half of \\(\\frac{b}{a}\\) is \\(\\frac{b}{2a}\\), so \\(\\left(\\frac{b}{2a}\\right)^2\\) is added to both sides, which keeps the equation balanced and makes the left side a perfect square:"+
      "\\[ \\begin{aligned} x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 &= -\\frac{c}{a} + \\left(\\frac{b}{2a}\\right)^2 \\\\ \\left(x + \\frac{b}{2a}\\right)^2 &= \\frac{b^2 - 4ac}{4a^2} \\end{aligned} \\]"+
      "Taking square roots and then isolating \\(x\\) gives the formula.",
      {v:1});
  },
  function(){
    return mcq("When the square is completed on \\(x^2 + \\frac{b}{a}x\\), the number added to both sides is \\(\\frac{b^2}{4a^2}\\). Why is this the number that is added?",
      "It is the square of half the coefficient of \\(x\\): \\(\\left(\\frac{1}{2} \\cdot \\frac{b}{a}\\right)^2 = \\left(\\frac{b}{2a}\\right)^2\\)",
      ["It is chosen so that the right side of the equation becomes zero in the end",
       "It is the square of the constant term \\(c\\), adjusted by the value of \\(a\\)",
       "It is twice the coefficient of \\(x\\), divided by the value of \\(a\\), giving \\(\\left(\\frac{2b}{a}\\right)^2\\)"],
      "To complete the square on \\(x^2 + px\\), add \\(\\left(\\frac{p}{2}\\right)^2\\). Here \\(p = \\frac{b}{a}\\), so the number added is \\(\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}\\), and the left side becomes \\(\\left(x + \\frac{b}{2a}\\right)^2\\).",
      {v:2});
  },
  function(){
    return mcq("Near the end of deriving the quadratic formula, \\(\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}\\) is rewritten as \\(x + \\frac{b}{2a} = \\pm \\frac{\\sqrt{b^2 - 4ac}}{2a}\\). Why does the \\(\\pm\\) symbol appear?",
      "Taking a square root gives two possibilities, because a number and its opposite have the same square",
      ["Because the value of \\(a\\) in the equation can be positive or negative, depending on the quadratic",
       "To allow the formula to produce imaginary roots as well as real ones when they are needed in a problem",
       "Because the square root of a fraction must be written out twice, once for each of its two parts"],
      "If \\(u^2 = w\\), then \\(u = \\sqrt{w}\\) or \\(u = -\\sqrt{w}\\): both values square to \\(w\\). The \\(\\pm\\) records both possibilities in one line. It has nothing to do with the sign of \\(a\\); the denominator \\(2a\\) comes from \\(\\sqrt{4a^2}\\) in the root of the right side.",
      {v:3});
  },
  function(){
    return mcq("The quadratic formula is derived by completing the square on \\(ax^2 + bx + c = 0\\). The derivation begins by dividing every term by \\(a\\). Which condition is required for this step?",
      "\\(a \\ne 0\\): division by zero is not possible, and a quadratic equation has \\(a \\ne 0\\) by definition",
      ["\\(b \\ne 0\\), so that the equation still has an \\(x\\) term after the division step is carried out",
       "\\(c \\ne 0\\), so that the constant term can be moved to the right side of the equation afterwards",
       "The discriminant must be positive, so that a real square root exists later in the derivation"],
      "Dividing by \\(a\\) is only meaningful when \\(a \\ne 0\\). That condition is automatic: if \\(a\\) were zero, the equation would be linear, not quadratic. The values of \\(b\\) and \\(c\\) may be zero, and the sign of the discriminant plays no part in this step.",
      {v:4});
  }
]));

/* ---------- extra u3 helper (hoisted): join numbers with signs, e.g. 25 - 40 + 15 ---------- */
function u3JoinSigned(nums){
  var out="";
  nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); });
  return out;
}

/* ---------- 4.12: find the first error in a worked solution (L3) ----------
   Deliberate error-analysis entry: the stem presents flawed work by design. */
E("u3-error-analysis",3,["4.12"],3,"gen",function(){
  var fam=pick(["F1","F1","F2","F2","F3","F4"]);
  function present(stem, lines){
    return stem+"<br>"+lines.map(function(L,i){ return "<b>Line "+(i+1)+":</b> "+L; }).join("<br>")+
      "<br>The work contains exactly one error. Which statement identifies the error?";
  }
  if(fam==="F1"){
    var A=pick([1,2]), r1=ri(2,7), r2=ri(3,8), att=0;
    while(att<200 && r1>=r2){ att++; r1=ri(2,7); r2=ri(3,8); }
    var B=-A*(r1+r2), C=A*r1*r2, D=A*A*(r2-r1)*(r2-r1), s=A*(r2-r1), base=-B;
    var mut=ri(1,4);
    var bv=(mut===1)?B:base;
    var sv=(mut===2)?s+2:s, Dv=sv*sv;
    var L1="\\(x = \\frac{"+(mut===1?"("+B+")":"-("+B+")")+" \\pm \\sqrt{("+B+")^2 - 4("+A+")("+C+")}}{2("+A+")}\\)";
    var L2="\\(x = \\frac{"+bv+" \\pm \\sqrt{"+Dv+"}}{"+(2*A)+"}\\)";
    var L3="\\(x = \\frac{"+bv+" + "+sv+"}{"+(2*A)+"} \\text{ or } x = \\frac{"+bv+" "+(mut===3?"+":"-")+" "+sv+"}{"+(2*A)+"}\\)";
    var plus, minus;
    if(mut===4){ plus=""+(-r2); minus=""+(-r1); }
    else { plus=u3FracS(bv+sv,2*A); minus=(mut===3)?plus:u3FracS(bv-sv,2*A); }
    var L4="\\(x = "+plus+" \\text{ or } x = "+minus+"\\)";
    var cat=["Line 1 writes the first term of the numerator as \\(b\\) instead of \\(-b\\) in the formula",
             "Line 2 evaluates the discriminant \\(b^2 - 4ac\\) incorrectly when its value is worked out",
             "Line 3 uses the same sign for both roots when the \\(\\pm\\) is split into two separate roots",
             "Line 4 changes the signs of the roots when the final answer is stated at the very end"];
    var why=[ "In Line 1, the numerator must begin with \\(-b = "+base+"\\), since \\(b = "+B+"\\). Every later line is built on the wrong starting value.",
              "In Line 2, the discriminant is \\(b^2 - 4ac = "+D+"\\), not "+Dv+"; its square root is \\("+s+"\\), not "+sv+".",
              "In Line 3, splitting \\(\\pm\\) must produce one root with \\(+\\) and one with \\(-\\). Using \\(+\\) twice loses the second root.",
              "Lines 1 to 3 are correct. Line 4 then changes the signs of both roots when the answer is stated."][mut-1];
    return mcq(present("A student solves the equation \\("+u3QuadS(A,B,C)+" = 0\\) using the quadratic formula. The work is shown below.", [L1,L2,L3,L4]),
      cat[mut-1], cat.filter(function(_,i){ return i!==mut-1; }),
      why+" The correct computation is \\(x = \\frac{"+base+" \\pm "+s+"}{"+(2*A)+"}\\), so the solutions are <b>\\(x = "+r1+"\\)</b> and <b>\\(x = "+r2+"\\)</b>.",
      {fam:fam, mut:mut});
  }
  if(fam==="F2"){
    var s1=ri(-8,7), s2=ri(-7,8), att2=0;
    while(att2<300){ att2++; s1=ri(-8,7); s2=ri(-7,8);
      if(s1<s2 && s2!==0) break; }
    var B2=-(s1+s2), C2=s1*s2, mut2=ri(1,4);
    var f1=s1, f2=(mut2===1)?-s2:s2;
    var prs=[{r:f1},{r:f2}];
    prs.forEach(function(o){ o.s=u3FacS(o.r); });
    prs.sort(function(x,y){ return x.s<y.s?-1:(x.s>y.s?1:0); });
    if(prs[1].r===0 && mut2===3) mut2=4; /* a sign flip on a zero root would be invisible */
    var LL1="\\("+prs.map(function(o){ return o.s; }).join("")+" = 0\\)";
    var LL2=(mut2===2) ? "\\("+u3BinS(prs[0].r)+" = 0\\)"
                       : "\\("+u3BinS(prs[0].r)+" = 0 \\text{ or } "+u3BinS(prs[1].r)+" = 0\\)";
    var t1=prs[0].r, t2=(mut2===3)?-prs[1].r:prs[1].r;
    var LL3=(mut2===2) ? "\\(x = "+t1+"\\)" : "\\(x = "+t1+" \\text{ or } x = "+t2+"\\)";
    var LL4;
    if(mut2===2) LL4="The solution is \\(x = "+t1+"\\).";
    else if(mut2===4) LL4="The solutions are \\(x = "+Math.min(-t1,-t2)+"\\) and \\(x = "+Math.max(-t1,-t2)+"\\).";
    else LL4="The solutions are \\(x = "+Math.min(t1,t2)+"\\) and \\(x = "+Math.max(t1,t2)+"\\).";
    var cat2=["A sign in one factor in Line 1 is wrong, so the factored form does not expand to the original trinomial",
              "Line 2 sets only one factor equal to zero, so one of the two solutions is lost from the work shown",
              "Line 3 changes a sign incorrectly when isolating \\(x\\) in one of the two equations in the student's work",
              "Line 4 states both of the solutions with their signs reversed when they are written out in full here"];
    var why2=[ "In Line 1, the factor \\("+u3FacS(f2)+"\\) should be \\("+u3FacS(s2)+"\\) so that the factors expand to \\("+u3QuadS(1,B2,C2)+"\\). The later lines follow the incorrect factor consistently.",
               "In Line 2, the zero product property must be applied to both factors. Setting only one factor equal to zero loses the solution \\(x = "+prs[1].r+"\\).",
               "In Line 3, solving \\("+u3BinS(prs[1].r)+" = 0\\) gives \\(x = "+prs[1].r+"\\), not \\(x = "+(-prs[1].r)+"\\). The sign is changed incorrectly at that step.",
               "Lines 1 to 3 are correct. Line 4 then reverses the signs of both solutions when stating the answer."][mut2-1];
    return mcq(present("A student solves the equation \\("+u3QuadS(1,B2,C2)+" = 0\\) by factoring. The work is shown below.", [LL1,LL2,LL3,LL4]),
      cat2[mut2-1], cat2.filter(function(_,i){ return i!==mut2-1; }),
      why2+" The correct solutions are <b>\\(x = "+s1+"\\)</b> and <b>\\(x = "+s2+"\\)</b>.",
      {fam:fam, mut:mut2});
  }
  if(fam==="F3"){
    var u1=ri(-7,8), u2=ri(-6,9), att3=0;
    while(att3<400){ att3++; u1=ri(-7,8); u2=ri(-6,9);
      if(u1<u2 && u1!==0 && u2!==0 && ((u1+u2)%2===0) && (u1+u2)!==0) break; }
    var B3=-(u1+u2), C3=u1*u2, m3=B3/2, s3=(u2-u1)/2, mut3=pick([3,4]);
    var ML1="\\("+u3QuadS(1,B3,0)+" = "+(-C3)+"\\)";
    var ML2="\\("+u3QuadS(1,B3,m3*m3)+" = "+(-C3)+" + "+(m3*m3)+"\\)";
    var fi="x"+(m3>0?" + "+m3:" - "+(-m3)), fiB="x"+(B3>0?" + "+B3:" - "+(-B3));
    var ML3=(mut3===3) ? "\\(("+fiB+")^2 = "+(s3*s3)+" \\Rightarrow "+fiB+" = \\pm "+s3+"\\)"
                       : "\\(("+fi+")^2 = "+(s3*s3)+" \\Rightarrow "+fi+" = \\pm "+s3+"\\)";
    var ML4=(mut3===3) ? "\\(x = "+(-B3-s3)+" \\text{ or } x = "+(-B3+s3)+"\\)"
                       : "\\(x = "+(m3-s3)+" \\text{ or } x = "+(m3+s3)+"\\)";
    var cat3=["Line 1 moves the constant term to the right side without changing its sign to the opposite one",
              "Line 2 adds a value that is not the square of half the coefficient of \\(x\\) in the trinomial shown",
              "Line 3 writes the squared factor with the full coefficient of \\(x\\) instead of half of it in the work",
              "Line 4 isolates \\(x\\) by adding half the coefficient of \\(x\\) instead of subtracting it at that step"];
    var why3=(mut3===3)
      ? "In Line 3, completing the square on \\(x^2 "+(B3<0?"- "+(-B3):"+ "+B3)+"x\\) produces the factor \\(("+fi+")^2\\), built from half the coefficient of \\(x\\), which is \\("+m3+"\\). Writing \\(("+fiB+")^2\\) uses the full coefficient \\("+B3+"\\) instead."
      : "In Line 4, isolating \\(x\\) from \\("+fi+" = \\pm "+s3+"\\) means subtracting \\("+m3+"\\) from both sides. Adding it instead shifts both roots.";
    return mcq(present("A student solves the equation \\("+u3QuadS(1,B3,C3)+" = 0\\) by completing the square. The work is shown below.", [ML1,ML2,ML3,ML4]),
      cat3[mut3-1], cat3.filter(function(_,i){ return i!==mut3-1; }),
      why3+" The correct solutions are <b>\\(x = "+u1+"\\)</b> and <b>\\(x = "+u2+"\\)</b>.",
      {fam:fam, mut:mut3});
  }
  /* F4: square-root method on (x - h)^2 = K */
  var h=ri(-7,7); if(h===0) h=5;
  var kk=ri(2,9), K=kk*kk, mut4=ri(1,4);
  var inner="x"+(h>0?" - "+h:" + "+(-h));
  var vP=h+kk, vM=h-kk;
  var NL1=(mut4===1) ? "\\("+inner+" = "+kk+"\\)" : "\\("+inner+" = \\pm "+kk+"\\)";
  var NL2=(mut4===1) ? "\\("+inner+" = "+kk+"\\)"
        : (mut4===2) ? "\\("+inner+" = "+kk+" \\text{ or } "+inner+" = "+kk+"\\)"
        : "\\("+inner+" = "+kk+" \\text{ or } "+inner+" = "+(-kk)+"\\)";
  var NL3=(mut4===1 || mut4===2) ? "\\(x = "+vP+"\\)"
        : (mut4===3) ? "\\(x = "+(-h+kk)+" \\text{ or } x = "+(-h-kk)+"\\)"
        : "\\(x = "+vP+" \\text{ or } x = "+vM+"\\)";
  var NL4;
  if(mut4===1 || mut4===2) NL4="The solution is \\(x = "+vP+"\\).";
  else if(mut4===3) NL4="The solutions are \\(x = "+(-h-kk)+"\\) and \\(x = "+(-h+kk)+"\\).";
  else if(mut4===4) NL4="The solutions are \\(x = "+(-vP)+"\\) and \\(x = "+(-vM)+"\\).";
  else NL4="The solutions are \\(x = "+vM+"\\) and \\(x = "+vP+"\\).";
  var cat4=["Line 1 takes the square root of the right side but drops the negative possibility entirely",
            "Line 2 writes the same equation twice instead of writing the positive and negative cases",
            "Line 3 moves the constant term to the other side of the equation with the wrong sign entirely",
            "Line 4 states both of the solutions with their signs reversed when they are written out in full"];
  var why4=[ "In Line 1, taking the square root of \\("+K+"\\) gives both \\("+kk+"\\) and \\("+(-kk)+"\\). Dropping the negative case loses the solution \\(x = "+vM+"\\).",
             "In Line 2, the two cases must be \\("+inner+" = "+kk+"\\) and \\("+inner+" = "+(-kk)+"\\). Writing the positive case twice loses the solution \\(x = "+vM+"\\).",
             "In Line 3, isolating \\(x\\) in \\("+inner+" = "+(-kk)+"\\) means adding \\("+h+"\\) to both sides. The sign is handled incorrectly, shifting both values.",
             "Lines 1 to 3 are correct. Line 4 then reverses the signs of both solutions when stating the answer."][mut4-1];
  return mcq(present("A student solves the equation \\(("+inner+")^2 = "+K+"\\). The work is shown below.", [NL1,NL2,NL3,NL4]),
    cat4[mut4-1], cat4.filter(function(_,i){ return i!==mut4-1; }),
    why4+" The correct solutions are <b>\\(x = "+vM+"\\)</b> and <b>\\(x = "+vP+"\\)</b>.",
    {fam:fam, mut:mut4});
});

/* ---------- 4.13: choose a method, justify it, and verify (L3) ---------- */
E("u3-method-choice",3,["4.13"],3,"gen",function(){
  function formulaRootStr(base,coef,rad,den,sign){
    var g=u3Gcd(u3Gcd(base,coef),den); base/=g; coef/=g; den/=g;
    var radTerm=(coef===1?"\\sqrt{"+rad+"}":coef+"\\sqrt{"+rad+"}");
    var num;
    if(base===0) num=(sign<0?"-":"")+radTerm;
    else num=base+(sign<0?" - ":" + ")+radTerm;
    return den===1 ? num : "\\frac{"+num+"}{"+den+"}";
  }
  var sc=pick(["SA","SB","SC","SD","SE"]);
  var stemHead="Which method is the most appropriate first choice for solving the equation ";
  if(sc==="SA"){
    var form=pick(["shift","pure"]), rp, K, eqS, solA, hiS;
    if(form==="shift"){
      var h=ri(-6,6); if(h===0) h=3;
      K=pick([9,16,25,36,49,8,12,18,20,27,32,45,50]); rp=u3RadParts(K);
      var inner=u3InnerS(1,"x",-h);
      eqS="\\(("+inner+")^2 = "+K+"\\)";
      var sqrtTerm=(rp[1]===1? ""+rp[0] : (rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"));
      function rrS(hh,sign){ if(rp[1]===1) return ""+(hh+sign*rp[0]);
        var t=(rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}"); return hh+(sign<0?" - ":" + ")+t; }
      hiS=rrS(h,1);
      solA="Taking square roots is the direct method here:"+
        "\\[ \\begin{aligned} ("+inner+")^2 &= "+K+" \\\\ "+inner+" &= \\pm "+sqrtTerm+" \\\\ x &= "+h+" \\pm "+sqrtTerm+" \\end{aligned} \\]"+
        "Check: when \\(x = "+hiS+"\\), \\("+inner+" = "+sqrtTerm+"\\), and \\(("+sqrtTerm+")^2 = "+K+"\\), so the equation is satisfied.";
    } else {
      K=pick([6,10,14,15,21,24,30,35,40]); rp=u3RadParts(K);
      eqS="\\(x^2 = "+K+"\\)";
      var sqrtTerm2=(rp[0]===1?"\\sqrt{"+rp[1]+"}":rp[0]+"\\sqrt{"+rp[1]+"}");
      hiS=sqrtTerm2;
      solA="Taking square roots is the direct method here:"+
        "\\[ \\begin{aligned} x^2 &= "+K+" \\\\ x &= \\pm "+sqrtTerm2+" \\end{aligned} \\]"+
        "Check: \\(\\left("+sqrtTerm2+"\\right)^2 = "+K+"\\), so \\(x = "+sqrtTerm2+"\\) satisfies the equation, and so does its opposite.";
    }
    return mcq(stemHead+eqS+", and why?",
      "Take square roots of both sides: the equation is already a squared expression equal to a constant, so this undoes the square in one step",
      ["Use the quadratic formula: the equation must first be expanded into the form \\(ax^2 + bx + c = 0\\) before any method can be applied to it",
       "Complete the square: the squared expression on the left still has to be built by adding a constant to both sides of the equation",
       "Factor the left side and use the zero product property: the left side is written as a product of two different factors in the equation"],
      solA, {sc:sc});
  }
  if(sc==="SB"){
    var r1=ri(-7,7), r2=ri(-7,7), att=0;
    while(att<200 && r1===r2){ att++; r2=ri(-7,7); }
    var B=-(r1+r2), C=r1*r2, Q=u3QuadS(1,B,C);
    return mcq(stemHead+"\\("+Q+" = 0\\), and why?",
      "Factor the trinomial and apply the zero product property: it factors into two binomials with integer constants",
      ["Use the quadratic formula: no other method can produce the two roots of the equation exactly, whatever the roots are",
       "Use the quadratic formula: the trinomial factors, but only with fraction constants in the two binomials",
       "Take square roots of both sides: the trinomial on the left is already a perfect square trinomial here"],
      "Factoring is the most direct method:"+
      "\\[ \\begin{aligned} "+Q+" &= 0 \\\\ "+u3TwoFac(u3FacS(r1), u3FacS(r2))+" &= 0 \\end{aligned} \\]"+
      "So \\(x = "+r1+"\\) or \\(x = "+r2+"\\). Verify by substituting \\(x = "+r1+"\\) into the original equation:"+
      "\\[ ("+r1+")^2 + ("+B+")("+r1+") + ("+C+") = "+u3JoinSigned([r1*r1, B*r1, C])+" = 0 \\]"+
      "The value checks, so \\(x = "+r1+"\\) is a root.",
      {sc:sc});
  }
  if(sc==="SC"){
    var bE=pick([6,8,10,12])*pick([-1,1]), D=pick([20,28,40,44,52,60,68,76,80,84,92].filter(function(v){ return v<bE*bE && (bE*bE-v)%4===0; }));
    var cE=(bE*bE-D)/4, mE=bE/2, rpE=u3RadParts(D), tC=rpE[0]/2, tR=rpE[1];
    var Q2=u3QuadS(1,bE,cE);
    function scRoot(sign){ var t=(tC===1?"\\sqrt{"+tR+"}":tC+"\\sqrt{"+tR+"}"); return (-mE)+(sign<0?" - ":" + ")+t; }
    return mcq(stemHead+"\\("+Q2+" = 0\\), and why?",
      "Complete the square: \\(a = 1\\) and the coefficient of \\(x\\) is even, so halving it gives a whole number and the square completes without fractions",
      ["Factor the trinomial: it factors into two binomials with integer constants, and those two factors give both of the roots directly, with no fractions involved.",
       "Use the quadratic formula: it is the only method that can produce irrational roots, such as \\(x = -3 \\pm \\sqrt{5}\\), for an equation like this one",
       "Take square roots of both sides: the left side is a perfect square trinomial, so its square root can be taken directly in one step"],
      "Completing the square keeps the arithmetic clean here:"+
      "\\[ \\begin{aligned} x^2 "+(bE<0?"- "+(-bE):"+ "+bE)+"x &= "+(-cE)+" \\\\ x^2 "+(bE<0?"- "+(-bE):"+ "+bE)+"x + "+(mE*mE)+" &= "+(-cE)+" + "+(mE*mE)+" \\\\ (x "+(mE<0?"- "+(-mE):"+ "+mE)+")^2 &= "+(D/4)+" \\\\ x &= "+scRoot(-1)+" \\text{ or } "+scRoot(1)+" \\end{aligned} \\]"+
      "Verify with the sum and product of the roots: the sum is \\("+(-2*mE)+" = -b\\) and the product is \\("+(mE*mE)+" - "+(tC*tC*tR)+" = "+cE+" = c\\), which matches the equation.",
      {sc:sc});
  }
  if(sc==="SD"){
    var att3=0, a3,b3,c3,D3,rp3;
    while(att3<600){ att3++;
      a3=pick([2,3,5]); b3=pick([-9,-7,-5,-3,-1,1,3,5,7,9]); c3=ri(-9,9);
      if(c3===0) continue;
      D3=b3*b3-4*a3*c3; if(D3<=0) continue;
      rp3=u3RadParts(D3); if(rp3[1]<=1) continue;
      break; }
    var Q3=u3QuadS(a3,b3,c3);
    var loR=formulaRootStr(-b3, rp3[0], rp3[1], 2*a3, -1), hiR=formulaRootStr(-b3, rp3[0], rp3[1], 2*a3, 1);
    return mcq(stemHead+"\\("+Q3+" = 0\\), and why?",
      "Use the quadratic formula: the trinomial does not factor over the integers, so the formula gives the exact roots directly",
      ["Factor the trinomial: it factors into two binomials with integer constants, and those two factors give both of the roots directly, with no fractions involved.",
       "Complete the square: half of the coefficient of \\(x\\) is a whole number, so no fractions appear in the work at all",
       "Take square roots of both sides: the equation has no \\(x\\) term, so the squared part can be undone directly in one step"],
      "The discriminant is \\("+D3+"\\), which is not a perfect square, so the roots are irrational and no integer factorization exists. The formula gives them directly:"+
      "\\[ \\begin{aligned} x &= \\frac{-("+b3+") \\pm \\sqrt{"+D3+"}}{"+(2*a3)+"} \\\\ &= "+loR+" \\text{ or } "+hiR+" \\end{aligned} \\]"+
      "Verify with the sum and product of the roots: their sum is \\("+u3FracS(-b3,a3)+" = -\\frac{b}{a}\\) and their product is \\("+u3FracS(c3,a3)+" = \\frac{c}{a}\\), which matches the equation.",
      {sc:sc});
  }
  /* SE: perfect square trinomial */
  var mm=pick([-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8]);
  var B5=2*mm, C5=mm*mm, Q5=u3QuadS(1,B5,C5);
  var inner5="x"+(mm>0?" + "+mm:" - "+(-mm));
  return mcq(stemHead+"\\("+Q5+" = 0\\), and why?",
    "Take square roots: the left side is a perfect square trinomial, \\(("+inner5+")^2\\), so the equation has a single repeated root",
    ["Use the quadratic formula: the discriminant of the equation is positive, so the equation has two distinct roots",
     "Factor by grouping: the expression splits naturally into two pairs of terms that share factors with each other",
     "Complete the square: a square such as \\((x + k)^2\\) still has to be built by adding a constant to both sides of the equation"],
    "The left side is already a perfect square:"+
    "\\[ \\begin{aligned} "+Q5+" &= ("+inner5+")^2 \\\\ "+inner5+" &= 0 \\\\ x &= "+(-mm)+" \\end{aligned} \\]"+
    "Verify by substituting \\(x = "+(-mm)+"\\) into the original equation:"+
    "\\[ ("+(-mm)+")^2 + ("+B5+")("+(-mm)+") + ("+C5+") = "+u3JoinSigned([mm*mm, B5*(-mm), C5])+" = 0 \\]"+
    "The value checks, so \\(x = "+(-mm)+"\\) is the repeated root.",
    {sc:sc});
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u3-pk-gcf: borrowed verbatim from math-1201 entry u3-gcf (math-1201:3.10). */
E("u3-pk-gcf",3,["3.14"], 2, "gen", function () {
  var gp = ri(0, 2), gn, tries = 0;
  if (gp === 0) gn = ri(2, 7); else gn = pick([1, 2, 3, 4, 5, 6]);
  var A = ri(1, 6), B = u3Nz(-6, 6), C = u3Nz(-6, 6);
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && tries < 60) { tries++; A = ri(1, 6); B = u3Nz(-6, 6); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw = gRaw + u3Par(quo, "x");
  var cands = [], seen = {};
  function addCand(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  /* partial factor: only part of the common factor is removed */
  if (gn > 1) {
    var divs = [];
    for (var d = 1; d < gn; d++) if (gn % d === 0) divs.push(d);
    var dv = pick(divs), sc = gn / dv;
    addCand(u3Str([[dv, gp, 0]]) + u3Par([A * sc, B * sc, C * sc], "x"));
  } else {
    addCand(u3Str([[1, gp - 1, 0]]) + "(" + u3Str([[A, 3, 0], [B, 2, 0], [C, 1, 0]]) + ")");
  }
  /* quotient slips: one term not divided correctly */
  addCand(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addCand(gRaw + u3Par([A, B, gn * C], "x"));
  addCand(gRaw + u3Par([A, B, -C], "x"));
  addCand(gRaw + u3Par([A + 1, B, C], "x"));
  var prompt = "Determine the greatest common factor of the terms of \\(" + polyRaw + "\\), and express the polynomial in factored form.";
  var sol = "Every term contains the factor \\(" + gRaw + "\\). Dividing each term by \\(" + gRaw + "\\) leaves \\(" + u3PC(quo, "x") + "\\), whose terms share no further common factor." +
    u3Alg([polyRaw + " &= " + keyRaw]) +
    "In factored form, the polynomial is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), shuffle(cands).slice(0, 3), sol,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});

/* u3-pk-factor-monic: borrowed verbatim from math-1201 entry u3-factor-monic (math-1201:3.12). */
E("u3-pk-factor-monic",3,["3.15"], 2, "gen", function () {
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

/* u3-pk-diff-squares: borrowed verbatim from math-1201 entry u3-diff-squares (math-1201:3.14). */
E("u3-pk-diff-squares",3,["3.15"], 1, "gen", function () {
  var mode = pick(["pure", "pure", "twovar"]);
  if (mode === "twovar") {
    var a = ri(1, 4), b = ri(1, 6);
    var polyTerms = [[a * a, 2, 0], [-b * b, 0, 2]];
    var poly = u3Str(polyTerms);
    var f1 = u3Str([[a, 1, 0], [b, 0, 1]]), f2 = u3Str([[a, 1, 0], [-b, 0, 1]]);
    var keyRaw = "(" + f1 + ")(" + f2 + ")";
    var P = [[a, 1, 0], [b, 0, 1]], Q = [[a, 1, 0], [-b, 0, 1]];
    var cands = [], seen = {};
    function addT(s) { if (s !== keyRaw && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
    addT("(" + f2 + ")(" + f2 + ")");
    addT("(" + f1 + ")(" + f1 + ")");
    addT("(" + u3Str([[a, 1, 0], [b * b, 0, 1]]) + ")(" + u3Str([[a, 1, 0], [-b * b, 0, 1]]) + ")");
    addT("(" + u3Str([[1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[1, 1, 0], [-b, 0, 1]]) + ")");
    addT("(" + u3Str([[a, 1, 0], [b + 1, 0, 1]]) + ")(" + f2 + ")");
    addT("(" + u3Str([[a + 1, 1, 0], [b, 0, 1]]) + ")(" + u3Str([[a + 1, 1, 0], [-b, 0, 1]]) + ")");
    var solT = "Each term is a perfect square: \\(" + poly + " = (" + a + "x)^2 - (" + b + "y)^2\\). A difference of squares factors into a sum and a difference of the two square roots. As a trinomial the middle term is \\(0\\): a pair of numbers multiplying to the negative constant term and adding to \\(0\\) must be opposites, which is why the two factors differ only in sign." +
      u3Alg([poly + " &= " + keyRaw]) +
      "The factored form is **" + u3M(keyRaw) + "**.";
    return mcq("Factor the polynomial \\(" + poly + "\\).",
      u3M(keyRaw), shuffle(cands).slice(0, 3), solT, { t: "facT", P: P, Q: Q, poly: poly });
  }
  var v = pick(["x", "y"]);
  var a2 = ri(1, 5), b2 = ri(1, 9);
  var prod = [a2 * a2, 0, -b2 * b2];
  var poly2 = u3PC(prod, v);
  var facs = [[a2, b2], [a2, -b2]];
  var keyRaw2 = u3FacRaw("", facs, v);
  var sqTerm = a2 === 1 ? v + "^2" : (a2 * a2) + v + "^2";
  var sol = "Each term is a perfect square: \\(" + poly2 + " = (" + a2 + v + ")^2 - " + b2 + "^2\\). Written as a trinomial, this is \\(" + sqTerm + " + 0" + v + " - " + (b2 * b2) + "\\), the case where the middle coefficient is \\(0\\). A factor pair of \\(-" + (b2 * b2) + "\\) that adds to \\(0\\) must consist of opposites, \\(" + b2 + "\\) and \\(-" + b2 + "\\), so the factors differ only in sign." +
    u3Alg([poly2 + " &= " + keyRaw2]) +
    "The factored form is **" + u3M(keyRaw2) + "**.";
  return mcq("Factor the polynomial \\(" + poly2 + "\\).",
    u3M(keyRaw2), u3FacDistr("", facs, v, prod, 3), sol,
    { t: "fac", g: "", parts: facs, v: v });
});

/* u3-pk-monomial-expand: borrowed verbatim from math-1201 entry u3-monomial-expand (math-1201:3.4). */
E("u3-pk-monomial-expand",3,["3.14"], 1, "gen", function () {
  var mode = ri(0, 2), P, Q, pdesc;
  if (mode === 0) {
    var a = u3Nz(-6, 6); if (Math.abs(a) < 2) a = a < 0 ? -3 : 3;
    var k = ri(1, 2), p = ri(1, 4), q = u3Nz(-7, 7);
    P = [[a, k, 0]]; Q = [[p, 1, 0], [q, 0, 0]];
    pdesc = u3Str(P) + u3Par([p, q], "x");
  } else if (mode === 1) {
    var a2 = u3Nz(-5, 5); if (Math.abs(a2) < 2) a2 = a2 < 0 ? -2 : 2;
    var p2 = ri(1, 3), q2 = u3Nz(-6, 6), r2 = u3Nz(-8, 8);
    P = [[a2, 1, 0]]; Q = [[p2, 2, 0], [q2, 1, 0], [r2, 0, 0]];
    pdesc = u3Str(P) + u3Par([p2, q2, r2], "x");
  } else {
    var a3 = u3Nz(-5, 5); if (Math.abs(a3) < 2) a3 = a3 < 0 ? -4 : 4;
    var p3 = ri(1, 3), q3 = u3Nz(-4, 4);
    P = [[a3, 1, 1]]; Q = [[p3, 1, 0], [q3, 0, 1]];
    pdesc = u3Str(P) + "(" + u3Str(Q) + ")";
  }
  var partials = u3Mul(P, Q), keyRaw = u3Str(partials);
  var seen = {}, distr = [];
  shuffle(u3PerturbTerms(partials)).forEach(function (s) {
    if (s !== keyRaw && !seen[s]) { seen[s] = 1; distr.push(u3M(s)); }
  });
  var prompt = "Expand and simplify \\(" + pdesc + "\\).";
  var sol = "Multiply the monomial by every term inside the brackets." +
    u3Alg([pdesc + " &= " + u3StrSeq(partials), "&= " + keyRaw]) +
    "The expanded form is **" + u3M(keyRaw) + "**.";
  return mcq(prompt, u3M(keyRaw), distr.slice(0, 3), sol, { t: "expand", P: P, Q: Q });
});

/* u3-pk-graph-strategy: borrowed verbatim from math-1201 entry u5-graph-strategy (math-1201:4.34). */
E("u3-pk-graph-strategy",3,["4.9"],1,"var",varset([
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

/* u3-pk-graph-form: borrowed verbatim from math-1201 entry u5-graph-form (math-1201:4.35). */
E("u3-pk-graph-form",3,["4.9"],2,"gen",function(){
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

/* u3-pk-solve-input: borrowed verbatim from math-1201 entry u4-solve-input (math-1201:4.48). */
E("u3-pk-solve-input",3,["4.10"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* u3-pk-sqrt-eval: authored micro-item (authored:squares-and-square-roots),
   written for this tranche. */
E("u3-pk-sqrt-eval",3,["4.10"],1,"gen",function(){
  var a=ri(3,15);
  if(ri(0,1)===0){
    return mcq("What is \\(\\sqrt{(-"+a+")^2}\\)?",
      "\\("+a+"\\)",
      ["\\("+(-a)+"\\)","\\("+(a*a)+"\\)","\\("+(-(a*a))+"\\)"],
      "Squaring \\(-"+a+"\\) gives \\((-"+a+")^2 = "+(a*a)+"\\), and the square root then returns the size of the number: \\(\\sqrt{"+(a*a)+"} = "+a+"\\). The answer is <b>\\("+a+"\\)</b>.",
      {mode:"root-of-square",a:a,ans:a});
  }
  return mcq("What is \\((-"+a+")^2\\)?",
    "\\("+(a*a)+"\\)",
    ["\\("+(-(a*a))+"\\)","\\("+a+"\\)","\\("+(2*a)+"\\)"],
    "A negative number squared gives a positive result: \\((-"+a+")^2 = (-"+a+") \\times (-"+a+") = "+(a*a)+"\\). The answer is <b>\\("+(a*a)+"\\)</b>.",
    {mode:"square-of-negative",a:a,ans:a*a});
}, ["Work out the square first, then the root.", "Squaring a negative number gives a positive result."]);

/* PK tranche pass for Unit 3. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U3_FOR=["3.14","3.15","3.16","3.17","4.9","4.10","4.11","4.12","4.13","4.14","4.15"];
var PKT_U3={
 "u3-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u3-pk-factor-monic":{src:"math-1201:3.12",group:"factoring"},
 "u3-pk-diff-squares":{src:"math-1201:3.14",group:"factoring"},
 "u3-pk-monomial-expand":{src:"math-1201:3.4",group:"polynomial-multiply"},
 "u3-pk-graph-strategy":{src:"math-1201:4.34",group:"graph-forms"},
 "u3-pk-graph-form":{src:"math-1201:4.35",group:"graph-forms"},
 "u3-pk-solve-input":{src:"math-1201:4.48",group:"isolate-variable"},
 "u3-pk-sqrt-eval":{src:"authored:squares-and-square-roots",group:"square-roots"}
};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});
