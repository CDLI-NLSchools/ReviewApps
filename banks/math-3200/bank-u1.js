// Math 3200 Unit 1 Polynomial Functions question bank
// CRMARKS: u1-divide-quotient=2
// CRMARKS: u1-divide-result=2
// CRMARKS: u1-end-behaviour=1
// CRMARKS: u1-equation-from-graph=3
// CRMARKS: u1-error-synthetic=2
// CRMARKS: u1-find-coefficient=2
// CRMARKS: u1-largest-zero-cr=3
// CRMARKS: u1-multiplicity-graph=1
// CRMARKS: u1-remainder-point=1
// CRMARKS: u1-remainder-value=1
// CRMARKS: u1-tableau-step-cr=2
// CRMARKS: u1-which-factor=2
// CRMARKS: u1-zeros-from-factors=1
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u1-identify-polynomial=2
// CRMARKS: u1-synthetic-relation=2
// CRMARKS: u1-zeros-roots-intercepts=2
// CRMARKS: u1-constant-leading=2
// CRMARKS: u1-sketch-features=2
// CRMARKS: u1-multiplicity-statements=3
// BIMODAL: u1-which-factor=b
// BIMODAL: u1-error-synthetic=a
// BIMODAL: u1-equation-from-graph=b
// BIMODAL: u1-divide-result=b
// BIMODAL: u1-divide-quotient=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u1-identify-polynomial=b
// BIMODAL: u1-synthetic-relation=b
// BIMODAL: u1-zeros-roots-intercepts=a
// BIMODAL: u1-constant-leading=b
// BIMODAL: u1-sketch-features=b
// BIMODAL: u1-multiplicity-statements=b
/* ================= Unit 1: Polynomial Functions ================= */
/* ================= Unit 1: Polynomial Functions (MA3200.3.1 to 3.13) =================
   Tranche 1, mid scope. All stems, contexts and values are original.
   Helpers are prefixed u1; entries register through E(...). */

/* ---------- u1 helpers ---------- */
function u1PolyS(cf){ /* coefficients, highest degree first, to a polynomial string */
  var out="", first=true, n=cf.length-1, i, c, p, term;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue;
    if(p===0) term=""+Math.abs(c);
    else { var base=(p===1?"x":"x^"+p); term=(Math.abs(c)===1?base:Math.abs(c)+base); }
    if(first){ out=(c<0?"-":"")+term; first=false; }
    else out+=(c<0?" - ":" + ")+term;
  }
  return out===""?"0":out;
}
function u1EvalC(cf,x){ var s=0,i; for(i=0;i<cf.length;i++) s=s*x+cf[i]; return s; }
function u1Synth(cf,a){ var b=[cf[0]], i; for(i=1;i<cf.length;i++) b.push(cf[i]+a*b[i-1]); var r=b.pop(); return {q:b, r:r}; }
function u1MulLin(cf,r){ var out=[], i; for(i=0;i<cf.length;i++){ out[i]=(out[i]||0)+cf[i]; out[i+1]=(out[i+1]||0)-r*cf[i]; } return out; }
function u1FromRoots(a,roots){ var cf=[a]; roots.forEach(function(rm){ for(var k=0;k<rm[1];k++) cf=u1MulLin(cf, rm[0]); }); return cf; }
function u1FacS(r){ if(r===0) return "x"; return r>0?"(x - "+r+")":"(x + "+(-r)+")"; }
function u1FactoredS(a,roots){ var s=(a===1?"":a===-1?"-":""+a); roots.forEach(function(rm){ s+=u1FacS(rm[0])+(rm[1]>1?"^"+rm[1]:""); }); return s; }
function u1JoinSigned(nums){ var out=""; nums.forEach(function(v,i){ if(i===0) out=""+v; else out+=(v<0?" - "+(-v):" + "+v); }); return out; }
function u1SubstS(cf,x){ /* polynomial string with the variable replaced by (x) */
  var out="", first=true, n=cf.length-1, i, c, p, term;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue;
    if(p===0) term=""+Math.abs(c);
    else { var base="("+x+")"+(p>1?"^"+p:""); term=(Math.abs(c)===1?base:Math.abs(c)+base); }
    if(first){ out=(c<0?"-":"")+term; first=false; }
    else out+=(c<0?" - ":" + ")+term;
  }
  return out===""?"0":out;
}
function u1EvalBlock(cf,x,label){ /* centred aligned evaluation of a polynomial at x */
  var vals=[], n=cf.length-1, i, c, p;
  for(i=0;i<cf.length;i++){ c=cf[i]; p=n-i; if(c===0) continue; vals.push(c*Math.pow(x,p)); }
  return "\\[ \\begin{aligned} "+label+"("+x+") &= "+u1SubstS(cf,x)+" \\\\ &= "+u1JoinSigned(vals)+" \\\\ &= "+u1EvalC(cf,x)+" \\end{aligned} \\]";
}
function u1Tableau(cf,a){ /* synthetic division tableau as a KaTeX array */
  var sy=u1Synth(cf,a), q=sy.q, n=cf.length, cols="r|", i;
  for(i=0;i<n;i++) cols+="r";
  var prods=q.map(function(v){ return a*v; });
  return "\\[ \\begin{array}{"+cols+"} "+a+" & "+cf.join(" & ")+" \\\\ & & "+prods.join(" & ")+" \\\\ \\hline & "+q.join(" & ")+" & "+sy.r+" \\end{array} \\]";
}
function u1DivResultS(q,R,a){ /* quotient-plus-remainder form as a string */
  var s=u1PolyS(q); if(R===0) return s;
  var den="x"+(a>0?" - "+a:" + "+(-a));
  return s+(R>0?" + ":" - ")+"\\frac{"+Math.abs(R)+"}{"+den+"}";
}
function u1EndClause(deg,a){
  if(deg%2===1) return a>0?"the left end falls and the right end rises":"the left end rises and the right end falls";
  return a>0?"both ends rise":"both ends fall";
}
function u1Plot(fn,x0,x1,o){ /* axes-and-curve SVG, y-range fitted from samples and capped */
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
  out+=clipCurveSVG(fn,X,Y,x0,x1,y0,y1);
  (o.points||[]).forEach(function(p){ out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>'; });
  return out+'</svg>';
}

/* ---------- 3.2: quotient by synthetic division (L1) ---------- */
function balDp(keyStr,ds){
  function dpOf(s){var m=/^-?\d+(?:\.(\d+))?$/.exec(s);if(!m)return null;return m[1]?m[1].length:0;}
  function padTo(s,dp){var cur=dpOf(s);if(cur===null||dp<=cur)return s;if(s.indexOf(".")<0)return s+"."+Array(dp+1).join("0");return s+Array(dp-cur+1).join("0");}
  var all=[keyStr].concat(ds),dps=all.map(dpOf);
  if(dps.some(function(d){return d===null;}))return ds;
  function ok(list){var c={};list.forEach(function(d){c[d]=(c[d]||0)+1;});return Object.keys(c).every(function(k){return c[k]!==1;});}
  if(ok(dps))return ds;
  var cap=Math.max.apply(null,dps)+2,best=null,bestCost=1e9;
  for(var a=dps[1];a<=cap;a++)for(var b=dps[2];b<=cap;b++)for(var c2=dps[3];c2<=cap;c2++){
    var cand=[dps[0],a,b,c2];
    if(!ok(cand))continue;
    var cost=(a-dps[1])+(b-dps[2])+(c2-dps[3]);
    if(cost<bestCost){bestCost=cost;best=[a,b,c2];}
  }
  if(!best)return ds;
  return ds.map(function(s,i){return padTo(s,best[i]);});
}

E("u1-divide-quotient",1,["3.2"],2,"gen",function(){
  var att=0, cf, a, sy;
  while(att<200){
    att++;
    cf=[pick([1,2,3,-1,-2]), ri(-9,9), ri(-9,9), ri(-9,9)];
    a=pick([-4,-3,-2,-1,1,2,3,4]);
    sy=u1Synth(cf,a);
    if(sy.r!==0) break;
  }
  if(sy.r===0){ cf=[1,0,-7,0]; a=2; sy=u1Synth(cf,a); }
  var q=sy.q, R=sy.r, key=u1PolyS(q);
  var pool=[ u1PolyS(u1Synth(cf,-a).q), u1PolyS([q[0],q[1],q[2]+R]), u1PolyS([q[0],q[1],q[2]+2]), u1PolyS([q[0]+1,q[1],q[2]]), u1PolyS([q[0],-q[1],q[2]]) ];
  var dis=[], seen={};
  pool.forEach(function(s){ if(s!==key && !seen[s]){ seen[s]=1; dis.push(s); } });
  dis=dis.slice(0,3).map(function(s){ return "\\("+s+"\\)"; });
  return mcq("Using synthetic division to divide \\(P(x) = "+u1PolyS(cf)+"\\) by \\("+u1FacS(a)+"\\) gives which <b>quotient</b>?",
    "\\("+key+"\\)", dis,
    "Synthetic division by \\("+u1FacS(a)+"\\) uses \\("+a+"\\) in the tableau:"+
    u1Tableau(cf,a)+
    "The bottom row, before the remainder, gives the quotient coefficients \\("+q.join(", ")+"\\), one degree lower than \\(P(x)\\). So the quotient is \\("+key+"\\) and the remainder is \\("+R+"\\).",
    {a:a, R:R});
});

/* ---------- 3.3: remainder from the remainder theorem (L1) ---------- */
E("u1-remainder-value",1,["3.3"],1,"gen",function(){
  var deg=pick([3,3,4]), cf=[], i;
  cf.push(pick([1,2,3,4,-2,-3]));
  for(i=1;i<=deg;i++) cf.push(ri(-9,9));
  var a=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var R=u1EvalC(cf,a);
  return numq("When \\(P(x) = "+u1PolyS(cf)+"\\) is divided by \\("+u1FacS(a)+"\\), what is the <b>remainder</b>?",
    R, 0.001,
    "By the remainder theorem, the remainder when \\(P(x)\\) is divided by \\("+u1FacS(a)+"\\) is \\(P("+a+")\\)."+
    u1EvalBlock(cf,a,"P")+
    "So the remainder is <b>"+R+"</b>.",
    {a:a, R:R});
});

/* ---------- 3.6: identify a polynomial function (L1) ---------- */
E("u1-identify-polynomial",1,["3.6"],1,"gen",function(){
  var form=ri(1,4), correct, why;
  if(form===1){ var cf=[pick([1,2,3,-2]), ri(-8,8), ri(-8,8), ri(-9,9)]; if(ri(0,1)) cf.push(ri(-9,9));
    correct="\\(f(x) = "+u1PolyS(cf)+"\\)"; why="it is a sum of terms with whole-number exponents"; }
  else if(form===2){ var r1=ri(-4,4), r2=ri(-4,4); while(r2===r1) r2=ri(-4,4);
    correct="\\(f(x) = "+u1FactoredS(pick([1,2,-1]),[[r1,1],[r2,1]])+"\\)"; why="it expands to a sum of terms with whole-number exponents"; }
  else if(form===3){ var la=ri(2,7), lb=ri(-12,12); while(lb===0) lb=ri(-12,12);
    correct="\\(f(x) = "+la+"x "+(lb>0?"+ ":"- ")+Math.abs(lb)+"\\)"; why="it is a sum of terms with whole-number exponents"; }
  else { correct="\\(f(x) = "+ri(3,20)+"\\)"; why="a constant is a polynomial of degree 0"; }
  var pool=[
    function(){ var k=ri(2,6), b=ri(1,8); return {s:"\\(f(x) = "+k+"\\sqrt{x} - "+b+"\\)", r:"a square root of the variable"}; },
    function(){ var k=ri(2,9), b=ri(1,9); return {s:"\\(f(x) = \\frac{"+k+"}{x} + "+b+"\\)", r:"the variable in a denominator"}; },
    function(){ var b=ri(2,6); return {s:"\\(f(x) = "+b+"^x\\)", r:"the variable in the exponent"}; },
    function(){ var b=ri(1,6); return {s:"\\(f(x) = x^{-2} + "+b+"x\\)", r:"a negative exponent on the variable"}; },
    function(){ var b=ri(1,6); return {s:"\\(f(x) = \\left|x - "+b+"\\right|\\)", r:"an absolute value, which no polynomial can reproduce"}; },
    function(){ var b=ri(1,5); return {s:"\\(f(x) = \\sin x + "+b+"\\)", r:"a trigonometric function of the variable"}; },
    function(){ var b=ri(1,6), c=ri(1,6); return {s:"\\(f(x) = \\frac{x + "+b+"}{x - "+c+"}\\)", r:"a ratio of polynomials, not a single polynomial"}; }
  ];
  var idx=shuffle([0,1,2,3,4,5,6]).slice(0,3), dis=[], reasons=[];
  idx.forEach(function(i){ var d=pool[i](); dis.push(d.s); reasons.push(d.r); });
  return mcq("Which function is a <b>polynomial function</b>?",
    correct, dis,
    "A polynomial function is built from terms where the variable appears only with whole-number exponents: no roots of the variable, no variable in a denominator, and no variable in an exponent. The correct choice qualifies because "+why+". The others involve "+reasons.join("; ")+".",
    {form:form});
});

/* ---------- 3.8: end behaviour from an equation (L1) ---------- */
E("u1-end-behaviour",1,["3.8"],1,"gen",function(){
  var deg=ri(1,6), cf=[pick([-5,-4,-3,-2,-1,1,2,3,4,5])], i;
  for(i=1;i<=deg;i++) cf.push(ri(-9,9));
  var a=cf[0], odd=(deg%2===1);
  var S={
    "odd+":"As \\(x \\to -\\infty\\), \\(f(x) \\to -\\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\)",
    "odd-":"As \\(x \\to -\\infty\\), \\(f(x) \\to \\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to -\\infty\\)",
    "even+":"As \\(x \\to -\\infty\\), \\(f(x) \\to \\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\)",
    "even-":"As \\(x \\to -\\infty\\), \\(f(x) \\to -\\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to -\\infty\\)"
  };
  var key=(odd?(a>0?"odd+":"odd-"):(a>0?"even+":"even-"));
  var dis=Object.keys(S).filter(function(k){ return k!==key; }).map(function(k){ return S[k]; });
  return mcq("What is the <b>end behaviour</b> of \\(f(x) = "+u1PolyS(cf)+"\\)?",
    S[key], dis,
    "The degree is \\("+deg+"\\), which is "+(odd?"odd":"even")+", and the leading coefficient is \\("+a+"\\), which is "+(a>0?"positive":"negative")+". "+
    (odd?"An odd degree sends the two ends in opposite directions, and the sign of the leading coefficient decides which end rises.":
         "An even degree sends both ends the same way, and the sign of the leading coefficient decides whether both rise or both fall.")+
    " Here: "+S[key]+".",
    {deg:deg, a:a});
});

/* ---------- 3.1: how synthetic division relates to long division (L2, var) ---------- */
E("u1-synthetic-relation",1,["3.1"],1,"var",varset([
  function(){
    var a=pick([-3,-2,2,3]);
    var cf=[pick([1,2,3]), ri(-8,8), ri(-8,8), ri(-8,8)];
    return mcq("A student uses synthetic division to divide \\(P(x) = "+u1PolyS(cf)+"\\) by \\("+u1FacS(a)+"\\). Which statement about the process is <b>correct</b>?",
      "The other numbers in the bottom row are the coefficients of the quotient, and the last number is the remainder.",
      ["The numbers in the bottom row are the zeros of the polynomial function being divided by the given divisor.",
       "Synthetic division gives the same result as long division for any divisor, including divisors that are quadratic.",
       "The value placed at the left of the tableau is always the value of \\("+(-a)+"\\) itself, not \\(" + a + "\\)."],
      "Synthetic division is a shortcut for long division by a divisor of the form \\((x - a)\\): the value used is \\("+a+"\\) itself. Each bottom-row entry, except the last, is a coefficient of the quotient, and the last entry is the remainder, exactly as long division would give.",
      {a:a});
  },
  function(){
    var b=ri(2,5);
    return mcq("To divide a polynomial by \\((x + "+b+")\\) using synthetic division, what value is placed at the <b>left of the tableau</b>?",
      ""+(-b), [""+b, "\\(\\frac{1}{"+b+"}\\)", "0"],
      "The divisor \\((x + "+b+")\\) has the form \\((x - a)\\) with \\(a = "+(-b)+"\\), and it is that value, \\("+(-b)+"\\), that goes at the left of the tableau.",
      {b:b});
  },
  function(){
    return mcq("Long division and synthetic division of a polynomial by \\((x - a)\\) produce the same quotient and remainder. Why can synthetic division be written so much more briefly?",
      "It works only with the coefficients, so the variables are omitted and each step is just a multiplication and an addition.",
      ["It skips the remainder entirely, which long division calculates separately at the end of the process.",
       "It is only an approximation, used when an exact answer is not needed, so it is quicker but less reliable in its results overall.",
       "It first rewrites the divisor as \\((x + a)\\) before starting the division itself, which shortens the calculation."],
      "In long division, the variables line up in the same pattern every step, so they carry no new information. Synthetic division drops them, records only the coefficients, and replaces each divide-and-subtract step with a multiply-and-add step. Nothing is skipped or approximated: the quotient and remainder are identical.",
      {});
  },
  function(){
    var att=0, cf, a, sy;
    while(att<100){
      att++;
      cf=[pick([1,2]), ri(-7,7), ri(-7,7), ri(-7,7)];
      a=pick([2,3,-2]);
      sy=u1Synth(cf,a);
      if(sy.q[2]!==sy.r) break;
    }
    if(sy.q[2]===sy.r){ cf=[1,-2,-5,6]; a=2; sy=u1Synth(cf,a); }
    return mcq("The completed synthetic division of \\(P(x) = "+u1PolyS(cf)+"\\) by \\("+u1FacS(a)+"\\) is shown."+
      u1Tableau(cf,a)+
      "Which statement is <b>true</b>?",
      "The remainder is \\("+sy.r+"\\), so \\(P("+a+") = "+sy.r+"\\).",
      ["The remainder is \\("+sy.q[2]+"\\), the last coefficient of the quotient.",
       "\\(P("+(-a)+") = "+sy.r+"\\).",
       "The quotient is \\("+u1PolyS(u1Synth(cf,-a).q)+"\\)."],
      "The bottom row of the tableau reads off the quotient coefficients \\("+sy.q.join(", ")+"\\) followed by the remainder \\("+sy.r+"\\). By the remainder theorem, that remainder is the value of the function at the value used in the tableau: \\(P("+a+") = "+sy.r+"\\).",
      {a:a, R:sy.r});
  }
]));

/* ---------- 3.2: full division result for a quartic (L2) ---------- */
E("u1-divide-result",1,["3.2"],2,"gen",function(){
  var att=0, cf, a, sy;
  while(att<200){
    att++;
    cf=[pick([1,2,3,-1,-2]), ri(-9,9), ri(-9,9), ri(-9,9), ri(-9,9)];
    a=pick([-4,-3,-2,-1,1,2,3,4]);
    sy=u1Synth(cf,a);
    if(sy.r!==0) break;
  }
  if(sy.r===0){ cf=[1,0,-3,0,4]; a=1; sy=u1Synth(cf,a); }
  var q=sy.q, R=sy.r;
  var key=u1DivResultS(q,R,a);
  var alt=u1Synth(cf,-a);
  var dis=[ u1DivResultS(alt.q, alt.r, a),
            u1DivResultS(q, -R, a),
            u1PolyS([q[0],q[1],q[2],q[3]+R]) ];
  return mcq("Dividing \\(P(x) = "+u1PolyS(cf)+"\\) by \\("+u1FacS(a)+"\\) gives which <b>result</b>?",
    "\\("+key+"\\)", dis.map(function(s){ return "\\("+s+"\\)"; }),
    "Synthetic division by \\("+u1FacS(a)+"\\) uses \\("+a+"\\) in the tableau:"+
    u1Tableau(cf,a)+
    "The quotient is \\("+u1PolyS(q)+"\\) with remainder \\("+R+"\\), so the result is written as quotient plus remainder over divisor: \\("+key+"\\).",
    {a:a, R:R});
});

/* ---------- 3.3: remainder theorem gives a point on the graph (L2) ---------- */
E("u1-remainder-point",1,["3.3"],1,"gen",function(){
  var att=0, cf, a, R;
  while(att<200){
    att++;
    cf=[pick([1,2,3,-2]), ri(-8,8), ri(-8,8), ri(-8,8)];
    a=pick([-4,-3,-2,-1,1,2,3,4]);
    R=u1EvalC(cf,a);
    if(R!==0 && R!==a && u1EvalC(cf,-a)!==R && u1EvalC(cf,R)!==a) break;
  }
  if(!(R!==0 && R!==a && u1EvalC(cf,-a)!==R && u1EvalC(cf,R)!==a)){ cf=[1,-2,-5,6]; a=2; R=u1EvalC(cf,a); }
  function pt(x,y){ return "\\(("+x+", "+y+")\\)"; }
  return mcq("When \\(P(x) = "+u1PolyS(cf)+"\\) is divided by \\("+u1FacS(a)+"\\), the remainder is \\("+R+"\\). Which point lies on the graph of \\(y = P(x)\\)?",
    pt(a,R), [pt(-a,R), pt(R,a), pt(a,0)],
    "By the remainder theorem, the remainder on division by \\("+u1FacS(a)+"\\) is the function value \\(P("+a+")\\). So \\(P("+a+") = "+R+"\\), which means the point \\(("+a+", "+R+")\\) lies on the graph.",
    {a:a, R:R});
});

/* ---------- 3.4: which binomial is a factor (L2) ---------- */
E("u1-which-factor",1,["3.4"],2,"gen",function(){
  var att=0, roots, rk, s, t, lead;
  while(att<200){
    att++;
    var vals=[-5,-4,-3,-2,-1,1,2,3,4,5];
    roots=shuffle(vals).slice(0,3);
    var cand=roots.filter(function(r){ return roots.indexOf(-r)<0; });
    if(!cand.length) continue;
    rk=cand[0];
    var rest=vals.filter(function(v){ return roots.indexOf(v)<0 && v!==-rk; });
    s=rest[ri(0,rest.length-1)];
    t=rest[ri(0,rest.length-1)];
    if(t===s) continue;
    lead=pick([1,1,2]);
    break;
  }
  if(att>=200){ roots=[1,2,-3]; rk=2; s=4; t=-1; lead=1; }
  var cf=u1FromRoots(lead, roots.map(function(r){ return [r,1]; }));
  var others=[[-rk,"P("+(-rk)+")"],[s,"P("+s+")"],[t,"P("+t+")"]];
  var lines=others.map(function(o){ return o[1]+" &= "+u1EvalC(cf,o[0]); }).join(" \\\\ ");
  return mcq("Which binomial is a <b>factor</b> of \\(P(x) = "+u1PolyS(cf)+"\\)?",
    "\\("+u1FacS(rk)+"\\)",
    ["\\("+u1FacS(-rk)+"\\)", "\\("+u1FacS(s)+"\\)", "\\("+u1FacS(t)+"\\)"],
    "By the factor theorem, \\((x - k)\\) is a factor of \\(P(x)\\) exactly when \\(P(k) = 0\\). Evaluating:"+
    "\\[ \\begin{aligned} P("+rk+") &= 0 \\\\ "+lines+" \\end{aligned} \\]"+
    "Only \\(P("+rk+")\\) is zero, so only \\("+u1FacS(rk)+"\\) is a factor.",
    {rk:rk});
});

/* ---------- 3.4: find a coefficient from a known factor (L2) ---------- */
E("u1-find-coefficient",1,["3.4"],2,"gen",function(){
  var vals=[-5,-4,-3,-2,-1,1,2,3,4,5];
  var trip=shuffle(vals).slice(0,3), a=trip[0], s=trip[1], t=trip[2];
  var cf=u1FromRoots(1,[[a,1],[s,1],[t,1]]);
  var k=cf[1], M=cf[2], N=cf[3];
  var disp="x^3 + kx^2";
  if(M!==0) disp+=" "+(M>0?"+ ":"- ")+Math.abs(M)+"x";
  disp+=" "+(N>0?"+ ":"- ")+Math.abs(N);
  var sub=""+Math.pow(a,3)+" + k("+Math.pow(a,2)+")"+(M!==0?" "+(M>0?"+ ":"- ")+Math.abs(M)+"("+a+")":"")+" "+(N>0?"+ ":"- ")+Math.abs(N);
  var rhs=-(Math.pow(a,3)+M*a+N);
  return numq("\\(P(x) = "+disp+"\\) has a factor \\("+u1FacS(a)+"\\). What is the value of \\(k\\)?",
    k, 0.001,
    "By the factor theorem, \\("+u1FacS(a)+"\\) is a factor exactly when \\(P("+a+") = 0\\). Substituting:"+
    "\\[ \\begin{aligned} P("+a+") &= "+sub+" = 0 \\\\ "+Math.pow(a,2)+"k &= "+rhs+" \\\\ k &= "+k+" \\end{aligned} \\]"+
    "So \\(k = "+k+"\\) (and indeed \\(P(x) = "+u1PolyS(cf)+"\\)).",
    {a:a, k:k});
});

/* ---------- 3.5: zeros from factored form (L2) ---------- */
E("u1-zeros-from-factors",1,["3.5"],1,"gen",function(){
  var att=0, roots, lead, S0, S1, S2, S3;
  function setS(arr){ var c=arr.slice().sort(function(x,y){ return x-y; }); return "\\(\\{"+c.join(", ")+"\\}\\)"; }
  while(att<200){
    att++;
    roots=shuffle([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]).slice(0,3);
    lead=pick([1,2,3,-1,-2]);
    S0=setS(roots);
    S1=setS([-roots[0], roots[1], roots[2]]);
    S2=setS(roots.map(function(r){ return -r; }));
    var deltas=[1,-1,2,-2], done=false;
    for(var di=0; di<deltas.length && !done; di++){
      var cand=roots.slice(); cand[2]+=deltas[di];
      if(cand[0]===cand[2] || cand[1]===cand[2]) continue;
      var cs=setS(cand);
      if(cs!==S0 && cs!==S1 && cs!==S2){ S3=cs; done=true; }
    }
    if(!done) continue;
    if(S0!==S1 && S0!==S2 && S1!==S2) break;
  }
  if(att>=200){ roots=[1,-2,3]; lead=1; S0=setS(roots); S1=setS([-1,-2,3]); S2=setS([-1,2,-3]); S3=setS([1,-2,4]); }
  var rs=roots.slice().sort(function(x,y){ return x-y; });
  return mcq("What are the <b>zeros</b> of the function \\(f(x) = "+u1FactoredS(lead, roots.map(function(r){ return [r,1]; }))+"\\)?",
    S0, [S1, S2, S3],
    "Setting each linear factor equal to zero: \\("+u1FacS(roots[0])+" = 0\\) gives \\(x = "+roots[0]+"\\), \\("+u1FacS(roots[1])+" = 0\\) gives \\(x = "+roots[1]+"\\), and \\("+u1FacS(roots[2])+" = 0\\) gives \\(x = "+roots[2]+"\\). Watch the signs: the factor \\((x - r)\\) produces the zero \\(r\\). So the zeros are \\("+rs.join(", ")+"\\) .",
    {roots:rs});
});

/* ---------- 3.9: zeros, roots and intercepts are the same values (L2) ---------- */
E("u1-zeros-roots-intercepts",1,["3.9"],1,"gen",function(){
  var roots=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3).sort(function(x,y){ return x-y; });
  var list=roots.join(", "), nlist=roots.map(function(r){ return -r; }).join(", ");
  var key="The roots of the corresponding polynomial equation are "+list+", and the x-intercepts of the graph are "+list+".";
  var d1="The roots of the corresponding polynomial equation are "+nlist+", and the x-intercepts of the graph are "+nlist+".";
  var d2="The roots of the corresponding polynomial equation are "+list+", and the graph crosses the y-axis at the points (0, "+roots[0]+"), (0, "+roots[1]+") and (0, "+roots[2]+").";
  var d3="The zeros of the function are the y-values of the points where the graph crosses the y-axis.";
  return mcq("A polynomial function has zeros "+list+". Which statement is <b>correct</b>?",
    key, [d1, d2, d3],
    "The zeros of a function, the roots of the corresponding equation \\(P(x) = 0\\), and the x-intercepts of the graph are three names for the same values: here, "+list+". They sit on the x-axis as the points ("+roots[0]+", 0), ("+roots[1]+", 0) and ("+roots[2]+", 0).",
    {roots:roots});
});

/* ---------- 3.7: roles of the constant term and leading coefficient (L2) ---------- */
E("u1-constant-leading",1,["3.7"],1,"gen",function(){
  var att=0, deg, cf, a, d0, m;
  while(att<200){
    att++;
    deg=pick([3,4]);
    cf=[pick([2,3,4,-2,-3,-4])];
    for(var i=1;i<=deg;i++) cf.push(ri(-9,9));
    a=cf[0]; d0=cf[deg]; m=cf[deg-1];
    if(d0!==0 && d0!==a && m!==d0 && m!==0) break;
  }
  if(att>=200){ deg=3; cf=[2,-3,5,-7]; a=2; d0=-7; m=5; }
  var clause=u1EndClause(deg,a), wclause=u1EndClause(deg,-a);
  function stmt(ct, lc, cl){ return "The constant term is \\("+ct+"\\), so the graph crosses the y-axis at \\((0, "+ct+")\\). The leading coefficient is \\("+lc+"\\), so "+cl+"."; }
  return mcq("For the polynomial function \\(f(x) = "+u1PolyS(cf)+"\\), which statement is <b>correct</b>?",
    stmt(d0, a, clause),
    [stmt(m, a, clause), stmt(d0, a, wclause), stmt(a, d0, clause)],
    "The constant term is the term with no variable: \\("+d0+"\\). Setting \\(x = 0\\) leaves only this term, so the graph crosses the y-axis at \\((0, "+d0+")\\). The leading coefficient is the coefficient of the highest power: \\("+a+"\\). With degree \\("+deg+"\\), "+clause+".",
    {deg:deg, a:a, d0:d0});
});

/* ---------- 3.10: multiplicity behaviour read from a graph (L2) ---------- */
E("u1-multiplicity-graph",1,["3.10"],1,"gen",function(){
  var pair=shuffle([-4,-3,-2,-1,1,2,3,4]).slice(0,2), rd=pair[0], rs=pair[1];
  var a=pick([1,-1]);
  var cf=u1FromRoots(a,[[rd,2],[rs,1]]);
  var fn=function(x){ return u1EvalC(cf,x); };
  var x0=Math.min(rd,rs)-3, x1=Math.max(rd,rs)+3;
  var targetRd=ri(0,1)===0, t=targetRd?rd:rs;
  var BEH={ cross:"It crosses the x-axis.", touch:"It touches the x-axis and turns around.", flat:"It flattens out and crosses the x-axis.", asym:"It approaches the x-axis but never reaches it." };
  var correct=targetRd?BEH.touch:BEH.cross;
  var dis=targetRd?[BEH.cross, BEH.flat, BEH.asym]:[BEH.touch, BEH.flat, BEH.asym];
  var q=mcq("The graph of \\(f(x) = "+u1FactoredS(a,[[rd,2],[rs,1]])+"\\) is shown. At \\(x = "+t+"\\), what does the graph do?",
    correct, dis,
    "The factor \\("+u1FacS(rd)+"\\) appears with multiplicity 2 (an even multiplicity), so at \\(x = "+rd+"\\) the graph touches the x-axis and turns around. The factor \\("+u1FacS(rs)+"\\) has multiplicity 1 (odd), so at \\(x = "+rs+"\\) the graph crosses the x-axis. At \\(x = "+t+"\\) the graph "+(targetRd?"touches the axis and turns around.":"crosses the axis."),
    {rd:rd, rs:rs, t:t});
  q.figure=u1Plot(fn, x0, x1, {points:[[rd,0],[rs,0]]});
  return q;
});

/* ---------- 3.11: match a feature list to a graph (L2) ---------- */
E("u1-sketch-features",1,["3.11"],2,"gen",function(){
  var roots=shuffle([-4,-3,-2,-1,1,2,3,4]).slice(0,3).sort(function(x,y){ return x-y; });
  var a=pick([1,2,-1,-2]);
  var cf=u1FromRoots(a, roots.map(function(r){ return [r,1]; }));
  var fn=function(x){ return u1EvalC(cf,x); };
  var y0=u1EvalC(cf,0);
  var clause=u1EndClause(3,a), wclause=u1EndClause(3,-a);
  function feat(rs, yv, cl){ return "x-intercepts: "+rs.join(", ")+"; y-intercept: "+yv+"; end behaviour: "+cl; }
  var flipIdx=roots.findIndex(function(r){ return roots.indexOf(-r)<0; });
  var flipped=roots.slice(); flipped[flipIdx]=-flipped[flipIdx];
  flipped.sort(function(x,y){ return x-y; });
  var q=mcq("The graph of a polynomial function is shown. Which list of features matches the graph?",
    feat(roots, y0, clause),
    [feat(roots, -y0, clause), feat(roots, y0, wclause), feat(flipped, y0, clause)],
    "Reading the graph: it crosses the x-axis at "+roots.join(", ")+", so those are the x-intercepts. It crosses the y-axis at \\("+y0+"\\) (the value of the function at \\(x = 0\\)). The function is a cubic with a "+(a>0?"positive":"negative")+" leading coefficient, so "+clause+".",
    {roots:roots, y0:y0});
  q.figure=u1Plot(fn, roots[0]-3, roots[2]+3, {points:[[0,y0]]});
  return q;
});

/* ---------- 3.10: multiplicity statements from factored form (L3) ---------- */
E("u1-multiplicity-statements",1,["3.10"],3,"gen",function(){
  var pair=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,2), p=pair[0], qq=pair[1];
  var a=pick([1,-1]);
  var TOUCH="touches the x-axis and turns around", FLAT="flattens out and then crosses the x-axis", CROSS="crosses the x-axis";
  function stmt(bp, bq){ return "At \\(x = "+p+"\\), the graph "+bp+", and at \\(x = "+qq+"\\), the graph "+bq+"."; }
  return mcq("Which statement describes the graph of \\(f(x) = "+u1FactoredS(a,[[p,2],[qq,3]])+"\\) at its x-intercepts?",
    stmt(TOUCH, FLAT),
    [stmt(FLAT, TOUCH), stmt(TOUCH, CROSS), stmt(CROSS, FLAT)],
    "Multiplicity decides the behaviour at an intercept. The zero \\("+p+"\\) has multiplicity 2, an even multiplicity, so the graph touches the x-axis there and turns around. The zero \\("+qq+"\\) has multiplicity 3, an odd multiplicity greater than 1, so the graph flattens out at the intercept and then crosses. A plain crossing with no flattening happens only for multiplicity 1.",
    {p:p, q:qq});
});

/* ---------- 3.2 and 3.3: diagnose a synthetic division sign error (L3) ---------- */
E("u1-error-synthetic",1,["3.2","3.3"],3,"gen",function(){
  var att=0, cf, a, R, SR, c0;
  while(att<200){
    att++;
    cf=[pick([1,2,3,-2]), ri(-8,8), ri(-8,8), ri(-8,8)];
    a=pick([-4,-3,-2,-1,1,2,3,4]);
    R=u1EvalC(cf,a); SR=u1EvalC(cf,-a); c0=cf[3];
    var vals=[R, SR, -R, c0];
    var uniq=vals.filter(function(v,i){ return vals.indexOf(v)===i; });
    if(R!==0 && uniq.length===4) break;
  }
  if(!(R!==0 && [R,SR,-R,c0].filter(function(v,i,arr){ return arr.indexOf(v)===i; }).length===4)){ cf=[1,-2,-5,6]; a=2; R=u1EvalC(cf,a); SR=u1EvalC(cf,-a); c0=cf[3]; }
  return mcq("A student divided \\(P(x) = "+u1PolyS(cf)+"\\) by \\("+u1FacS(a)+"\\) using synthetic division, but placed \\("+(-a)+"\\) at the left of the tableau instead of \\("+a+"\\). The student reported a remainder of \\("+SR+"\\). What is the <b>correct remainder</b>?",
    ""+R, [""+SR, ""+(-R), ""+c0],
    "Placing \\("+(-a)+"\\) in the tableau divides by \\((x - ("+(-a)+")) = (x + "+Math.abs(a)+")\\) instead, so the student's remainder is \\(P("+(-a)+") = "+SR+"\\), the remainder for the wrong divisor. The correct remainder is \\(P("+a+")\\), by the remainder theorem:"+
    u1EvalBlock(cf,a,"P")+
    "So the correct remainder is <b>"+R+"</b>.",
    {a:a, R:R, SR:SR});
});

/* ---------- 3.12: modelling with polynomial functions (L3, var) ---------- */
E("u1-modelling",1,["3.12"],3,"var",varset([
  function(){
    return mcq("An open-top box is made from a rectangular sheet of cardboard that is 36 cm long and 24 cm wide. A square of side \\(x\\) cm is cut from each corner and the sides are folded up. Which expression gives the <b>volume</b>, in cubic centimetres, of the box?",
      "\\(x(36 - 2x)(24 - 2x)\\)",
      ["\\(x(36 - x)(24 - x)\\)", "\\((36 - 2x)(24 - 2x)\\)", "\\(x(36 - 2x)(24 + 2x)\\)"],
      "Cutting a square of side \\(x\\) from each corner shortens every side of the base twice: the base is \\((36 - 2x)\\) cm by \\((24 - 2x)\\) cm, and the height of the folded box is \\(x\\) cm. Volume is height times length times width: \\(x(36 - 2x)(24 - 2x)\\).",
      {});
  },
  function(){
    return mcq("A farmer uses 48 m of fencing to enclose a rectangular pen on three sides, with an existing barn wall forming the fourth side. The two sides perpendicular to the wall each have length \\(x\\) metres. Which function gives the <b>area</b> of the pen, in square metres?",
      "\\(A(x) = x(48 - 2x)\\)",
      ["\\(A(x) = x(48 - x)\\)", "\\(A(x) = 2x(48 - 2x)\\)", "\\(A(x) = x(24 - x)\\)"],
      "The fencing covers two sides of length \\(x\\) and one side parallel to the wall, so the parallel side has length \\(48 - 2x\\) metres. Area is length times width: \\(A(x) = x(48 - 2x)\\).",
      {});
  },
  function(){
    var cf=[-2,30,-72,500];
    var p5=u1EvalC(cf,5), p2=u1EvalC(cf,2);
    return numq("A bakery chain models its monthly profit, in thousands of dollars, \\(t\\) months after opening a new location, by \\(P(t) = "+u1PolyS(cf)+"\\). How many thousands of dollars <b>greater</b> is the profit in month 5 than in month 2?",
      p5-p2, 0.001,
      "Evaluate the model at each time:"+
      u1EvalBlock(cf,5,"P")+
      u1EvalBlock(cf,2,"P")+
      "The difference is \\("+p5+" - "+p2+" = "+(p5-p2)+"\\), so the profit in month 5 is <b>"+(p5-p2)+" thousand dollars</b> greater.",
      {p5:p5, p2:p2});
  }
]));

/* ---------- 3.13: equation of a cubic from its graph (L3) ---------- */
E("u1-equation-from-graph",1,["3.13"],3,"gen",function(){
  var att=0, roots, a, cf, y0, flipRoot;
  while(att<200){
    att++;
    roots=shuffle([-4,-3,-2,-1,1,2,3,4]).slice(0,3).sort(function(x,y){ return x-y; });
    a=pick([2,3,-2,-3]);
    var cand=roots.filter(function(r){ return roots.indexOf(-r)<0; });
    if(!cand.length) continue;
    flipRoot=cand[0];
    break;
  }
  if(att>=200){ roots=[-3,1,2]; a=2; flipRoot=-3; }
  cf=u1FromRoots(a, roots.map(function(r){ return [r,1]; }));
  y0=u1EvalC(cf,0);
  var fn=function(x){ return u1EvalC(cf,x); };
  var flipped=roots.map(function(r){ return r===flipRoot?-r:r; });
  var key=u1FactoredS(a, roots.map(function(r){ return [r,1]; }));
  var q=mcq("The graph of a cubic function is shown. It crosses the x-axis at the marked intercepts and passes through the marked point \\((0, "+y0+")\\). Which <b>equation</b> defines the function?",
    "\\("+key+"\\)",
    ["\\("+u1FactoredS(-a, roots.map(function(r){ return [r,1]; }))+"\\)",
     "\\("+u1FactoredS(a, flipped.map(function(r){ return [r,1]; }))+"\\)",
     "\\("+u1FactoredS(1, roots.map(function(r){ return [r,1]; }))+"\\)"],
    "The x-intercepts are "+roots.join(", ")+", so the equation has the form \\(f(x) = a"+roots.map(function(r){ return u1FacS(r); }).join("")+"\\). Use the marked point \\((0, "+y0+")\\) to find \\(a\\):"+
    "\\[ \\begin{aligned} "+y0+" &= a("+roots.map(function(r){ return -r; }).join(")(")+") \\\\ &= "+((-roots[0])*(-roots[1])*(-roots[2]))+"a \\\\ a &= "+a+" \\end{aligned} \\]"+
    "So the equation is \\(f(x) = "+key+"\\).",
    {roots:roots, a:a, y0:y0});
  q.figure=u1Plot(fn, roots[0]-3, roots[2]+3, {points:[[0,y0],[roots[0],0],[roots[1],0],[roots[2],0]]});
  return q;
});

/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 2 CR entries (3 and 2 marks). The Unit 1 Level 2 CR pool held only 2-mark entries, so the 9-mark and 8-mark remainders behind the 5 and 6 Level 3 picks could not form. ---------- */
E("u1-largest-zero-cr",1,["3.4","3.9"],2,"gen",function(){
  var roots=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3);
  var given=roots[0], cf=u1FromRoots(1,roots.map(function(r){return [r,1];}));
  var q=u1Synth(cf,given).q, ans=Math.max(roots[0],roots[1],roots[2]);
  var sorted=roots.slice().sort(function(x,y){return x-y;});
  return numq("The polynomial \\(P(x) = "+u1PolyS(cf)+"\\) has \\("+u1FacS(given)+"\\) as a factor. What is the <b>greatest zero</b> of \\(P\\)?",
    ans,0.001,
    "Divide \\(P\\) by \\("+u1FacS(given)+"\\) using synthetic division with \\("+given+"\\):"+u1Tableau(cf,given)+
    "The quotient is \\("+u1PolyS(q)+"\\), which factors as \\("+u1FacS(roots[1])+u1FacS(roots[2])+"\\). So the zeros of \\(P\\) are "+sorted[0]+", "+sorted[1]+" and "+sorted[2]+", and the greatest zero is <b>"+ans+"</b>.",
    {roots:roots});
});
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u1-tableau-step-cr",1,["3.1"],2,"gen",function(){
  var cf=[1,ri(-6,6),ri(-9,9),ri(-9,9)], a=pick([-4,-3,-2,-1,1,2,3,4]);
  var b1=cf[1]+a*cf[0], b2=cf[2]+a*b1;
  return numq("When \\(P(x) = "+u1PolyS(cf)+"\\) is divided by \\("+u1FacS(a)+"\\) using synthetic division, the bottom row of the tableau starts \\("+cf[0]+", "+b1+", \\ldots\\) What is the <b>next entry</b> in the bottom row?",
    b2,0.001,
    "In synthetic division, each bottom-row entry is multiplied by \\("+a+"\\) and added to the next coefficient. The full tableau is:"+u1Tableau(cf,a)+
    "The second entry is \\("+cf[1]+" + ("+a+")("+cf[0]+") = "+b1+"\\). Multiplying it by \\("+a+"\\) and adding the next coefficient gives \\("+cf[2]+" + ("+a+")("+b1+") = \\)<b>"+b2+"</b>.",
    {cf:cf,a:a});
});
