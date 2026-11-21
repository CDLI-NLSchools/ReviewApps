// Math 2200 Unit 4 Radical Expressions and Equations question bank
// CRMARKS: u4-conjugate-why=3
// CRMARKS: u4-convert-numeric=1
// CRMARKS: u4-defined-values=2
// CRMARKS: u4-extraneous-why=3
// CRMARKS: u4-model-radical=3
// CRMARKS: u4-order-radicals=2
// CRMARKS: u4-rationalize-binomial=3
// CRMARKS: u4-rationalize-mono=1
// CRMARKS: u4-root-of-square=1
// CRMARKS: u4-simplify-ops=2
// CRMARKS: u4-solve-radical=2
// CRMARKS: u4-var-to-entire=1
// CRMARKS: u4-var-to-mixed=2
// CRMARKS: u4-verify-roots=2
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u4-pk-radical-mixed=2
// CRMARKS: u4-pk-radical-entire=2
// CRMARKS: u4-pk-laws-integral=3
// CRMARKS: u4-pk-laws-rational=3
// CRMARKS: u4-pk-sort-numbers=2
// CRMARKS: u4-pk-which-is-solution=2
// BIMODAL: u4-var-to-mixed=b
// BIMODAL: u4-simplify-ops=b
// BIMODAL: u4-rationalize-binomial=b
// BIMODAL: u4-order-radicals=a
// BIMODAL: u4-extraneous-why=b
// BIMODAL: u4-conjugate-why=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u4-pk-radical-mixed=a
// BIMODAL: u4-pk-radical-entire=a
// BIMODAL: u4-pk-laws-integral=b
// BIMODAL: u4-pk-laws-rational=b
// BIMODAL: u4-pk-sort-numbers=a
// BIMODAL: u4-pk-which-is-solution=a
/* ================= Unit 4: Radical Expressions and Equations ================= */
/* ================= Unit 4: Radical Expressions and Equations ================= */
/* Indicators: 1.1, 1.2, 1.3, 1.4, 1.9, 1.11, 1.12, 1.13, 1.14, 1.15, 1.16,
   1.17, 1.18, 1.19, 1.20. Types follow the Mauger Chapter 5 sets (simplify
   radicals, convert between entire and mixed radicals, add/subtract/multiply
   radicals, rationalize denominators, restrictions, solve radical equations
   and check roots, error spotting) and the MHR Pre-Calculus 11 Chapter 5 bank
   (Radical Expressions and Equations), rewritten with original stems and
   values. */

function u4sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u4gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u4sqf(n){if(n<2)return false;for(var d=2;d*d<=n;d++){if(n%(d*d)===0)return false;}return true;}
function u4simp(N){var a=1;for(var d=Math.floor(Math.sqrt(N));d>=2;d--){if(N%(d*d)===0){a=d;break;}}return [a,N/(a*a)];}
function u4simp3(N){var a=1;for(var d=Math.floor(Math.cbrt(N))+1;d>=2;d--){if(N%(d*d*d)===0){a=d;break;}}return [a,N/(a*a*a)];}
function u4mixS(a,b,idx){var rad=(idx===3)?"\\sqrt[3]{"+b+"}":"\\sqrt{"+b+"}";return (a===1?"":a)+rad;}
function u4vp(v,e){return e===0?"":(e===1?v:v+"^{"+e+"}");}
function u4coef(c){return c===1?"":(""+c);}
/* collect n distractor strings from cands, each distinct and different from correct */
function u4dis(correct,cands,n){
  var out=[],seen={};seen[String(correct)]=1;
  for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}
  return out;
}
function u4wrap(s){return "\\("+s+"\\)";}

/* ---------- 1.1 + 1.2: convert between entire and mixed radicals, numerical (L1) ---------- */
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u4-convert-numeric",4,["1.1","1.2"],1,"gen",function(){
  var shape=pick(["toMixed","toMixed","toEntire"]);
  if(shape==="toMixed"){
    var idx=pick([2,2,2,3]);
    if(idx===2){
      var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30]);
      var N=a*a*b,cor=u4mixS(a,b,2);
      var b2=pick([2,3,5,6,7,10,11,13,14,15].filter(function(z){return z!==b;}));
      var cands=[u4mixS(a+1,b,2),u4mixS(a,b2,2),u4mixS(a+2,b,2)];
      if(a>2)cands.push(u4mixS(a-1,b,2));
      if(a%2===0)cands.push(u4mixS(a/2,4*b,2));
      return mcq("Express \\(\\sqrt{"+N+"}\\) as a mixed radical in simplest form.",
        u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
        "The largest perfect square that divides \\("+N+"\\) is \\("+a+"^2 = "+(a*a)+"\\), and \\("+N+" = "+(a*a)+" \\times "+b+"\\): \\[ \\begin{aligned} \\sqrt{"+N+"} &= \\sqrt{"+(a*a)+" \\times "+b+"} \\\\ &= \\sqrt{"+(a*a)+"} \\times \\sqrt{"+b+"} \\\\ &= "+cor+" \\end{aligned} \\] So \\(\\sqrt{"+N+"} = \\)<b>\\("+cor+"\\)</b>.",
        {a:a,b:b,idx:idx,shape:shape});
    }
    var a3=ri(2,5),b3=2,sm3,tries=0;
    do{b3=pick([2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,22,23,25,26,28,30]);sm3=u4simp3(a3*a3*a3*b3);tries++;}
    while((sm3[0]!==a3||sm3[1]!==b3)&&tries<80);
    var N3=a3*a3*a3*b3,cor3=u4mixS(a3,b3,3);
    var b3x=pick([2,3,5,6,7,10,12,14,15,20].filter(function(z){return z!==b3;}));
    var cands3=[u4mixS(a3+1,b3,3),u4mixS(a3,b3x,3),u4mixS(a3+2,b3,3)];
    if(a3>2)cands3.push(u4mixS(a3-1,b3,3));
    return mcq("Express \\(\\sqrt[3]{"+N3+"}\\) as a mixed radical in simplest form.",
      u4wrap(cor3),u4dis(cor3,cands3,3).map(u4wrap),
      "The largest perfect cube that divides \\("+N3+"\\) is \\("+a3+"^3 = "+(a3*a3*a3)+"\\), and \\("+N3+" = "+(a3*a3*a3)+" \\times "+b3+"\\): \\[ \\begin{aligned} \\sqrt[3]{"+N3+"} &= \\sqrt[3]{"+(a3*a3*a3)+" \\times "+b3+"} \\\\ &= \\sqrt[3]{"+(a3*a3*a3)+"} \\times \\sqrt[3]{"+b3+"} \\\\ &= "+cor3+" \\end{aligned} \\] So \\(\\sqrt[3]{"+N3+"} = \\)<b>\\("+cor3+"\\)</b>.",
      {a:a3,b:b3,idx:3,shape:shape});
  }
  var idx2=pick([2,2,3]);
  if(idx2===2){
    var p=ri(2,9),q=pick([2,3,5,6,7,10,11,13,14,15].filter(function(z){return z!==p;}));
    var R=p*p*q;
    var candR=u4dis(""+R,[p*q,p*q*q,p*p+q,(p+1)*(p+1)*q,p*p*q+q],3);
    return mcq("Express \\("+p+"\\sqrt{"+q+"}\\) as an entire radical.",
      "\\(\\sqrt{"+R+"}\\)",candR.map(function(z){return "\\(\\sqrt{"+z+"}\\)";}),
      "The coefficient moves inside the radical as its square: \\[ \\begin{aligned} "+p+"\\sqrt{"+q+"} &= \\sqrt{"+(p*p)+"} \\times \\sqrt{"+q+"} \\\\ &= \\sqrt{"+(p*p)+" \\times "+q+"} \\\\ &= \\sqrt{"+R+"} \\end{aligned} \\] So \\("+p+"\\sqrt{"+q+"} = \\)<b>\\(\\sqrt{"+R+"}\\)</b>.",
      {p:p,q:q,idx:idx2,shape:shape});
  }
  var p3=ri(2,5),q3=pick([2,3,4,5,6,7,9,10,11,13,14,15].filter(function(z){return z!==p3;}));
  var R3=p3*p3*p3*q3;
  var candR3=u4dis(""+R3,[p3*q3,p3*q3*q3*q3,p3*p3*p3+q3,(p3+1)*(p3+1)*(p3+1)*q3,p3*p3*q3],3);
  return mcq("Express \\("+p3+"\\sqrt[3]{"+q3+"}\\) as an entire radical.",
    "\\(\\sqrt[3]{"+R3+"}\\)",candR3.map(function(z){return "\\(\\sqrt[3]{"+z+"}\\)";}),
    "The coefficient moves inside the radical as its cube: \\[ \\begin{aligned} "+p3+"\\sqrt[3]{"+q3+"} &= \\sqrt[3]{"+(p3*p3*p3)+"} \\times \\sqrt[3]{"+q3+"} \\\\ &= \\sqrt[3]{"+(p3*p3*p3)+" \\times "+q3+"} \\\\ &= \\sqrt[3]{"+R3+"} \\end{aligned} \\] So \\("+p3+"\\sqrt[3]{"+q3+"} = \\)<b>\\(\\sqrt[3]{"+R3+"}\\)</b>.",
    {p:p3,q:q3,idx:idx2,shape:shape});
});

/* ---------- 1.11: value of a square root of a square, numerical (L1) ---------- */
E("u4-root-of-square",4,["1.11"],1,"gen",function(){
  var shape=pick(["neg","neg","given","square","decimal"]);
  if(shape==="neg"||shape==="decimal"){
    var k=(shape==="neg")?ri(2,25):pick([0.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5]);
    var ks=fmt(k,1),nks=(shape==="decimal")?fmtF(-k,2):fmt(-k,1),sq=fmt(k*k,2);
    return mcq("What is the value of \\(\\sqrt{(-"+ks+")^2}\\)?",
      ks,[nks,"\\(\\pm "+ks+"\\)",sq],
      "The square removes the sign: \\((-"+ks+")^2 = "+sq+"\\). A square root symbol means the non-negative (principal) root, so \\(\\sqrt{"+sq+"} = "+ks+"\\). The value is never negative, and a single square root never gives a plus-or-minus pair. The value is <b>"+ks+"</b>.",
      {k:k,shape:shape});
  }
  if(shape==="given"){
    var k2=ri(2,20);
    return mcq("If \\(x = -"+k2+"\\), what is the value of \\(\\sqrt{x^2}\\)?",
      ""+k2,[""+(-k2),"\\(\\pm "+k2+"\\)",""+(k2*k2)],
      "Substituting gives \\(\\sqrt{(-"+k2+")^2} = \\sqrt{"+(k2*k2)+"}\\). The principal square root is non-negative, so the value is <b>"+k2+"</b>, the absolute value of \\(x\\).",
      {k:k2,shape:shape});
  }
  var k3=ri(2,20);
  return mcq("What is the value of \\((-"+k3+")^2\\)?",
    ""+(k3*k3),[""+(-k3*k3),""+k3,""+(-k3)],
    "Squaring a negative number gives a positive product: \\((-"+k3+")^2 = (-"+k3+") \\times (-"+k3+") = "+(k3*k3)+"\\). In general, \\((-x)^2 = x^2\\). The value is <b>"+(k3*k3)+"</b>.",
    {k:k3,shape:shape});
});

/* ---------- 1.4: mixed radical with variables to entire radical (L1) ---------- */
E("u4-var-to-entire",4,["1.4"],2,"gen",function(){
  var v=pick(["x","y","t","m"]),p=ri(2,6),q=ri(0,3),s=ri(0,2),r;
  if(q===0&&s===0)q=1;
  if(s===0)r=pick([2,3,5,6,7,10,11,13]);
  else r=pick([1,2,3,5,6,7,10]);
  var R=p*p*r,E=2*q+s;
  function rad(rc,re){return "\\sqrt{"+rc+u4vp(v,re)+"}";}
  var outside=u4coef(p)+u4vp(v,q);
  var inside=(r===1?"":r)+u4vp(v,s);
  var cor=rad(R,E);
  var cands=[rad(p*r,E),rad(R,q===0?2*s:q+s),rad(p*p*r*r,E),rad((p+1)*(p+1)*r,E),rad(R,E+1),rad(p*p,E)];
  return mcq("Express \\("+outside+"\\sqrt{"+inside+"}\\) as an entire radical.",
    u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
    "The outside factor moves inside by squaring it, variable part included: \\[ \\begin{aligned} "+outside+"\\sqrt{"+inside+"} &= \\sqrt{"+(p*p)+u4vp(v,2*q)+"} \\times \\sqrt{"+inside+"} \\\\ &= \\sqrt{"+R+u4vp(v,E)+"} \\end{aligned} \\] So the entire radical is <b>"+u4wrap(cor)+"</b>.",
    {p:p,q:q,r:r,s:s,v:v});
});

/* ---------- 1.3: entire radical with variables to mixed radical (L2) ---------- */
function u4mixVarStr(a,v,f,b,g){
  var out=u4coef(a)+u4vp(v,f);
  var inside=(b===1?"":b)+u4vp(v,g);
  if(inside==="")return out===""?"1":out;
  return out+"\\sqrt{"+inside+"}";
}
function u4twoVarStr(oc,ex,ey,ic,ix,iy){
  var out=u4coef(oc)+u4vp("x",ex)+u4vp("y",ey);
  var inside=(ic===1?"":ic)+u4vp("x",ix)+u4vp("y",iy);
  if(inside==="")return out===""?"1":out;
  return out+"\\sqrt{"+inside+"}";
}
E("u4-var-to-mixed",4,["1.3"],2,"gen",function(){
  var shape=pick(["one","one","two"]);
  if(shape==="one"){
    var a=ri(2,7),b=pick([1,2,3,5,6,7,10]),e=ri(2,9);
    if(b===1&&e%2===0)e=e+1;
    var c=a*a*b,f=Math.floor(e/2),g=e%2;
    var cor=u4mixVarStr(a,"x",f,b,g);
    var d2=(g===1)?u4mixVarStr(a,"x",f,b,0):u4mixVarStr(a,"x",f,b,1);
    var cands=[u4mixVarStr(1,"x",f,c,g),d2,u4mixVarStr(a,"x",f-1,b,g+2),u4mixVarStr(a,"x",f+1,b,0)];
    var insideB=(b===1?"":b)+u4vp("x",g);
    return mcq("Express \\(\\sqrt{"+c+u4vp("x",e)+"}\\) as a mixed radical in simplest form. Assume \\(x \\geq 0\\).",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Factor out the largest perfect square, \\("+a+"^2 x^{"+(2*f)+"} = "+(a*a)+u4vp("x",2*f)+"\\): \\[ \\begin{aligned} \\sqrt{"+c+u4vp("x",e)+"} &= \\sqrt{"+(a*a)+u4vp("x",2*f)+" \\times "+insideB+"} \\\\ &= "+cor+" \\end{aligned} \\] So the mixed radical is <b>"+u4wrap(cor)+"</b>.",
      {a:a,b:b,e:e,shape:shape});
  }
  var a2=ri(2,5),b2=pick([1,2,3,5,6]),ex=ri(1,6),ey=ri(1,6);
  if(ex===1&&ey===1)ey=2;
  if(b2===1&&ex%2===0&&ey%2===0)ex=ex+1;
  var c2=a2*a2*b2,fx=Math.floor(ex/2),fy=Math.floor(ey/2),gx=ex%2,gy=ey%2;
  var cor2=u4twoVarStr(a2,fx,fy,b2,gx,gy);
  var cands2=[u4twoVarStr(1,fx,0,c2,gx,ey),u4twoVarStr(1,0,fy,c2,ex,gy),u4twoVarStr(a2,fx,fy,b2,0,0),u4twoVarStr(1,fx,fy,c2,gx,gy)];
  return mcq("Express \\(\\sqrt{"+c2+u4vp("x",ex)+u4vp("y",ey)+"}\\) as a mixed radical in simplest form. Assume \\(x, y \\geq 0\\).",
    u4wrap(cor2),u4dis(cor2,cands2,3).map(u4wrap),
    "Factor out the largest perfect square, \\("+(a2*a2)+u4vp("x",2*fx)+u4vp("y",2*fy)+"\\), which is the square of \\("+a2+u4vp("x",fx)+u4vp("y",fy)+"\\): \\[ \\begin{aligned} \\sqrt{"+c2+u4vp("x",ex)+u4vp("y",ey)+"} &= \\sqrt{"+(a2*a2)+u4vp("x",2*fx)+u4vp("y",2*fy)+" \\times "+((b2===1?"":b2)+u4vp("x",gx)+u4vp("y",gy))+"} \\\\ &= "+cor2+" \\end{aligned} \\] So the mixed radical is <b>"+u4wrap(cor2)+"</b>.",
    {a:a2,b:b2,ex:ex,ey:ey,shape:shape});
});

/* ---------- 1.9: compare and order radicals (L2) ---------- */
E("u4-order-radicals",4,["1.9"],2,"gen",function(){
  var pool=[5,6,7,8,10,11,12,13,14,15,17,18,19,20,21,22,23,24,26,27,28,29,30,31,32,33,34,35,37,38,39,40,41,42,43,44,45,46,47,48];
  var vals,tries=0;
  do{
    vals=shuffle(pool.slice()).slice(0,4).sort(function(x,y){return x-y;});
    tries++;
  }while(vals.filter(function(v){return u4simp(v)[0]>1;}).length<2&&tries<60);
  var letters=["P","Q","R","S"];
  var items=vals.map(function(v){
    var sm=u4simp(v),form;
    if(sm[0]>1&&Math.random()<0.65)form="\\("+u4mixS(sm[0],sm[1],2)+"\\)";
    else form="\\(\\sqrt{"+v+"}\\)";
    return {v:v,form:form};
  });
  var order=shuffle([0,1,2,3]);
  var stem="The four radicals are: "+letters.map(function(L,i){return L+" = "+items[order[i]].form;}).join(", ")+". Which list orders the radicals from <b>least to greatest</b>?";
  var letterOf=items.map(function(it,vi){return letters[order.indexOf(vi)];});
  var corSeq=letterOf.join(", ");
  var sw1=letterOf.slice(),sw2=letterOf.slice(),tmp;
  tmp=sw1[0];sw1[0]=sw1[1];sw1[1]=tmp;
  tmp=sw2[2];sw2[2]=sw2[3];sw2[3]=tmp;
  var rev=letterOf.slice().reverse();
  return mcq(stem,corSeq,u4dis(corSeq,[sw1.join(", "),sw2.join(", "),rev.join(", ")],3),
    "Rewrite each radical as an entire radical: "+items.map(function(it,vi){return letterOf[vi]+" = \\(\\sqrt{"+it.v+"}\\)";}).join(", ")+". For square roots, a larger radicand means a larger value, and "+vals.join(" < ")+". So the order from least to greatest is <b>"+corSeq+"</b>.",
    {vals:vals});
});

/* ---------- 1.11: the identities sqrt(x^2) = |x| and (-x)^2 = x^2 (L2) ---------- */
E("u4-identity-truth",4,["1.11"],2,"gen",function(){
  var shape=pick(["allReal","allRealCoef","sign","whichX","shifted","numeric"]);
  if(shape==="allReal"){
    var v=pick(["x","a","t","n"]);
    return mcq("Which statement is true for <b>all</b> real values of \\("+v+"\\)?",
      "\\(\\sqrt{"+v+"^2} = |"+v+"|\\)",
      ["\\(\\sqrt{"+v+"^2} = "+v+"\\)","\\(\\sqrt{"+v+"^2} = \\pm "+v+"\\)","\\(\\sqrt{"+v+"^2} = "+v+"^2\\)"],
      "A square root symbol always gives the non-negative root. When \\("+v+"\\) is negative, \\(\\sqrt{"+v+"^2}\\) is still positive, so it equals the absolute value: <b>\\(\\sqrt{"+v+"^2} = |"+v+"|\\)</b>. It cannot equal \\("+v+"\\) itself when \\("+v+" < 0\\), and one square root never produces a plus-or-minus pair.",
      {v:v,shape:shape});
  }
  if(shape==="allRealCoef"){
    var k=ri(2,5),v2=pick(["x","t"]);
    return mcq("Which statement is true for <b>all</b> real values of \\("+v2+"\\)?",
      "\\(\\sqrt{("+k+v2+")^2} = |"+k+v2+"|\\)",
      ["\\(\\sqrt{("+k+v2+")^2} = "+k+v2+"\\)","\\(\\sqrt{("+k+v2+")^2} = \\pm "+k+v2+"\\)","\\(\\sqrt{("+k+v2+")^2} = -"+k+v2+"\\)"],
      "The expression inside the square, \\("+k+v2+"\\), can be negative, zero, or positive as \\("+v2+"\\) varies. The square root of its square is its absolute value: <b>\\(\\sqrt{("+k+v2+")^2} = |"+k+v2+"|\\)</b>, which is the choice that stays non-negative for every value of \\("+v2+"\\).",
      {k:k,v:v2,shape:shape});
  }
  if(shape==="sign"){
    var v3=pick(["x","a","t"]),neg=pick([true,false]);
    if(neg){
      return mcq("If \\("+v3+" < 0\\), then \\(\\sqrt{"+v3+"^2}\\) equals",
        "\\(-"+v3+"\\)",
        ["\\("+v3+"\\)","\\(\\pm "+v3+"\\)","\\("+v3+"^2\\)"],
        "Since \\(\\sqrt{"+v3+"^2} = |"+v3+"|\\) and \\("+v3+"\\) is negative, its absolute value is its opposite: <b>\\(-"+v3+"\\)</b>, which is positive.",
        {v:v3,shape:shape});
    }
    return mcq("If \\("+v3+" > 0\\), then \\(\\sqrt{"+v3+"^2}\\) equals",
      "\\("+v3+"\\)",
      ["\\(-"+v3+"\\)","\\(\\pm "+v3+"\\)","\\("+v3+"^2\\)"],
      "Since \\(\\sqrt{"+v3+"^2} = |"+v3+"|\\) and \\("+v3+"\\) is positive, its absolute value is itself: <b>\\("+v3+"\\)</b>.",
      {v:v3,shape:shape});
  }
  if(shape==="whichX"){
    var k4=ri(3,9);
    return mcq("For which value of \\(x\\) is the statement \\(\\sqrt{x^2} = -x\\) true?",
      ""+(-k4),[""+k4,"Every real number","No real number"],
      "The left side is \\(|x|\\) in disguise, and \\(|x| = -x\\) holds exactly when \\(x \\leq 0\\). Of the choices, only \\(x = "+(-k4)+"\\) qualifies: at \\(x = "+k4+"\\) the left side is \\("+k4+"\\) while the right side is \\("+(-k4)+"\\). So the statement is true for <b>\\(x = "+(-k4)+"\\)</b>.",
      {k:k4,shape:shape});
  }
  if(shape==="shifted"){
    var v5=pick(["x","t"]),h=ri(2,12);
    return mcq("What is \\(\\sqrt{("+v5+" - "+h+")^2}\\) in simplest form?",
      "\\(|"+v5+" - "+h+"|\\)",
      ["\\("+v5+" - "+h+"\\)","\\("+h+" - "+v5+"\\)","\\(\\pm ("+v5+" - "+h+")\\)"],
      "The square root of a square is the absolute value of the expression inside, because that expression can be positive or negative depending on \\("+v5+"\\). So \\(\\sqrt{("+v5+" - "+h+")^2} = \\)<b>|"+v5+" - "+h+"|</b>.",
      {v:v5,h:h,shape:shape});
  }
  var k6=ri(3,12);
  return mcq("Which statement is true?",
    "\\(\\sqrt{(-"+k6+")^2} = "+k6+"\\)",
    ["\\(\\sqrt{(-"+k6+")^2} = -"+k6+"\\)","\\(\\sqrt{"+(k6*k6)+"} = \\pm "+k6+"\\)","\\((-"+k6+")^2 = "+(-(k6*k6))+"\\)"],
    "Check each claim. Squaring first, \\((-"+k6+")^2 = "+(k6*k6)+"\\), and the principal root of \\("+(k6*k6)+"\\) is \\("+k6+"\\) (never negative, and a single value, not a plus-or-minus pair). Also \\((-"+k6+")^2\\) is positive \\("+(k6*k6)+"\\), not \\("+(-(k6*k6))+"\\). So the true statement is <b>\\(\\sqrt{(-"+k6+")^2} = "+k6+"\\)</b>.",
    {k:k6,shape:shape});
});

/* ---------- 1.12: values for which a radical expression is defined (L2) ---------- */
E("u4-defined-values",4,["1.12"],1,"gen",function(){
  var shape=pick(["pos","pos","neg","denom"]);
  var c0=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(shape==="pos"){
    var a=pick([1,2,3,4]);
    var rad="\\sqrt{"+(a===1?"x":a+"x")+u4sgn(-a*c0)+"}";
    var steps=(a===1)?("x"+u4sgn(-a*c0)+" &\\geq 0 \\\\ x &\\geq "+c0)
      :((a+"x")+u4sgn(-a*c0)+" &\\geq 0 \\\\ "+a+"x &\\geq "+(a*c0)+" \\\\ x &\\geq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad+"\\) defined?",
      "\\(x \\geq "+c0+"\\)",
      ["\\(x \\leq "+c0+"\\)","\\(x \\geq "+(-c0)+"\\)","\\(x > "+c0+"\\)"],
      "A square root is defined when its radicand is non-negative: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\geq "+c0+"\\)</b>. The endpoint is included because a square root of zero is zero.",
      {a:a,c0:c0,shape:shape});
  }
  if(shape==="neg"){
    var a2=pick([1,2,3,4]);
    var rad2="\\sqrt{"+(a2*c0)+(a2===1?" - x":" - "+a2+"x")+"}";
    var steps2=(a2===1)?((a2*c0)+" - x &\\geq 0 \\\\ -x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0)
      :((a2*c0)+" - "+a2+"x &\\geq 0 \\\\ -"+a2+"x &\\geq "+(-a2*c0)+" \\\\ x &\\leq "+c0);
    return mcq("For which values of \\(x\\) is the expression \\("+rad2+"\\) defined?",
      "\\(x \\leq "+c0+"\\)",
      ["\\(x \\geq "+c0+"\\)","\\(x \\leq "+(-c0)+"\\)","\\(x < "+c0+"\\)"],
      "The radicand must be non-negative. Dividing by a negative number reverses the inequality: \\[ \\begin{aligned} "+steps2+" \\end{aligned} \\] So the expression is defined for <b>\\(x \\leq "+c0+"\\)</b>.",
      {a:a2,c0:c0,shape:shape});
  }
  var n=ri(2,9);
  var expr="\\frac{"+n+"}{\\sqrt{x"+u4sgn(-c0)+"}}";
  return mcq("For which values of \\(x\\) is the expression \\("+expr+"\\) defined?",
    "\\(x > "+c0+"\\)",
    ["\\(x \\geq "+c0+"\\)","\\(x < "+c0+"\\)","\\(x > "+(-c0)+"\\)"],
    "The radicand sits in a denominator, so it must be strictly positive: zero would make the denominator zero, and a negative radicand has no real square root. \\[ \\begin{aligned} x"+u4sgn(-c0)+" &> 0 \\\\ x &> "+c0+" \\end{aligned} \\] So the expression is defined for <b>\\(x > "+c0+"\\)</b>.",
    {n:n,c0:c0,shape:shape});
});

/* ---------- 1.13: simplify with operations on radicals (L2) ---------- */
E("u4-simplify-ops",4,["1.13"],2,"gen",function(){
  var shape=pick(["add","add","product","conjugate","binomSquare","varAdd"]);
  if(shape==="add"){
    var b=pick([2,3,5,6,7,10]),a1=ri(2,6),a2=ri(2,6),t=0;
    while(a2===a1&&t<40){a2=ri(2,6);t++;}
    var N1=a1*a1*b,N2=a2*a2*b;
    var cor=u4mixS(a1+a2,b,2);
    var sm=u4simp(N1+N2);
    var sumOpt=(sm[1]===1)?(""+sm[0]):u4mixS(sm[0],sm[1],2);
    var cands=[u4mixS(a1*a2,b,2),sumOpt,u4mixS(Math.abs(a1-a2),b,2),u4mixS(a1+a2+1,b,2)];
    return mcq("Simplify \\(\\sqrt{"+N1+"} + \\sqrt{"+N2+"}\\).",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Simplify each radical first, then add the like radicals: \\[ \\begin{aligned} \\sqrt{"+N1+"} + \\sqrt{"+N2+"} &= "+u4mixS(a1,b,2)+" + "+u4mixS(a2,b,2)+" \\\\ &= "+cor+" \\end{aligned} \\] Radicals cannot be added by adding their radicands. The simplified sum is <b>"+u4wrap(cor)+"</b>.",
      {a1:a1,a2:a2,b:b,shape:shape});
  }
  if(shape==="product"){
    var a=ri(2,5),bb=ri(2,5);
    var m=pick([2,3,5,6,7,10,11,14,15]),n=pick([2,3,5,6,7,10,11,14,15].filter(function(z){return z!==m;}));
    var smB=u4simp(m*n);
    var corB=(smB[1]===1)?(""+(a*bb*smB[0])):u4mixS(a*bb*smB[0],smB[1],2);
    function rawS(coef,rad){return coef+"\\sqrt{"+rad+"}";}
    var candsB=[rawS(a+bb,m*n),rawS(a*bb,m+n),rawS(a*bb,m*n),rawS((a+1)*bb,m*n),rawS(a*bb+1,m*n)];
    var stepsB="\\[ \\begin{aligned} "+a+"\\sqrt{"+m+"} \\times "+bb+"\\sqrt{"+n+"} &= "+(a*bb)+"\\sqrt{"+(m*n)+"} \\\\ &= "+corB+" \\end{aligned} \\]";
    return mcq("Simplify \\("+a+"\\sqrt{"+m+"} \\times "+bb+"\\sqrt{"+n+"}\\). Give the answer in simplest form.",
      u4wrap(corB),u4dis(corB,candsB,3).map(u4wrap),
      "Multiply the coefficients together and the radicands together, then simplify the result: "+stepsB+" So the product is <b>"+u4wrap(corB)+"</b>.",
      {a:a,bb:bb,m:m,n:n,shape:shape});
  }
  if(shape==="conjugate"){
    var mm=pick([5,6,7,10,11,13,14,15,18,20,21,22]),nn=pick([2,3,5,6,7,10,11,13]),t2=0;
    while(nn>=mm&&t2<40){nn=pick([2,3,5,6,7,10,11,13]);t2++;}
    return mcq("Expand and simplify \\((\\sqrt{"+mm+"} + \\sqrt{"+nn+"})(\\sqrt{"+mm+"} - \\sqrt{"+nn+"})\\).",
      ""+(mm-nn),[""+(mm+nn),""+(nn-mm),""+(mm*nn)],
      "This is a conjugate pair, so the product is a difference of squares and the middle terms cancel: \\[ \\begin{aligned} (\\sqrt{"+mm+"} + \\sqrt{"+nn+"})(\\sqrt{"+mm+"} - \\sqrt{"+nn+"}) &= (\\sqrt{"+mm+"})^2 - (\\sqrt{"+nn+"})^2 \\\\ &= "+mm+" - "+nn+" \\\\ &= "+(mm-nn)+" \\end{aligned} \\] The product is <b>"+(mm-nn)+"</b>.",
      {mm:mm,nn:nn,shape:shape});
  }
  if(shape==="binomSquare"){
    var p=ri(2,6),q=pick([2,3,5,6,7,10,11,13]);
    var corC=""+(p*p+q)+" + "+(2*p)+"\\sqrt{"+q+"}";
    var candsC=[""+(p*p+q),""+(p*p+q)+" + "+p+"\\sqrt{"+q+"}",""+(p*p)+" + "+(2*p)+"\\sqrt{"+q+"}",""+(p*p+q)+" + "+(2*p)+"\\sqrt{"+(q+2)+"}"];
    return mcq("Expand and simplify \\(("+p+" + \\sqrt{"+q+"})^2\\).",
      u4wrap(corC),u4dis(corC,candsC,3).map(u4wrap),
      "Squaring a binomial produces a middle term; the expression is not squared term by term: \\[ \\begin{aligned} ("+p+" + \\sqrt{"+q+"})^2 &= "+p+"^2 + 2 \\times "+p+" \\times \\sqrt{"+q+"} + (\\sqrt{"+q+"})^2 \\\\ &= "+(p*p)+" + "+(2*p)+"\\sqrt{"+q+"} + "+q+" \\\\ &= "+corC+" \\end{aligned} \\] So the expansion is <b>"+u4wrap(corC)+"</b>.",
      {p:p,q:q,shape:shape});
  }
  var bD=pick([2,3,5,6]),d1=ri(2,5),d2=ri(2,5),t3=0;
  while(d2===d1&&t3<40){d2=ri(2,5);t3++;}
  var c1=d1*d1*bD,c2=d2*d2*bD;
  var corD=(d1+d2)+"\\sqrt{"+bD+"x}";
  var candsD=[(d1*d2)+"\\sqrt{"+bD+"x}",(d1+d2)+"\\sqrt{"+bD+"}",Math.abs(d1-d2)+"\\sqrt{"+bD+"x}",(d1+d2)+"\\sqrt{"+(bD+1)+"x}"];
  return mcq("Simplify \\(\\sqrt{"+c1+"x} + \\sqrt{"+c2+"x}\\). Assume \\(x \\geq 0\\).",
    u4wrap(corD),u4dis(corD,candsD,3).map(u4wrap),
    "Simplify each radical first: \\(\\sqrt{"+c1+"x} = "+d1+"\\sqrt{"+bD+"x}\\) and \\(\\sqrt{"+c2+"x} = "+d2+"\\sqrt{"+bD+"x}\\). These are like radicals, so their coefficients add: \\[ \\begin{aligned} \\sqrt{"+c1+"x} + \\sqrt{"+c2+"x} &= "+d1+"\\sqrt{"+bD+"x} + "+d2+"\\sqrt{"+bD+"x} \\\\ &= "+corD+" \\end{aligned} \\] The simplified sum is <b>"+u4wrap(corD)+"</b>.",
    {d1:d1,d2:d2,b:bD,shape:shape});
});

/* ---------- 1.14: rationalize a monomial denominator (L2) ---------- */
E("u4-rationalize-mono",4,["1.14"],1,"gen",function(){
  var shape=pick(["mono","monoCoef"]);
  if(shape==="mono"||shape==="monoCoef"){
    var n=ri(2,9),m=pick([2,3,5,6,7,10]);
    var a=(shape==="mono")?1:ri(2,5);
    var den=(a===1)?("\\sqrt{"+m+"}"):(a+"\\sqrt{"+m+"}");
    var D=a*m,g=u4gcd(n,D),n1=n/g,D1=D/g;
    var cor=(D1===1)?(n1+"\\sqrt{"+m+"}"):("\\frac{"+n1+"\\sqrt{"+m+"}}{"+D1+"}");
    var cands=["\\frac{"+n+"\\sqrt{"+m+"}}{"+(D*m)+"}","\\frac{\\sqrt{"+(n*m)+"}}{"+D+"}","\\frac{"+n+"}{"+D+"}","\\frac{"+(n+1)+"\\sqrt{"+m+"}}{"+D+"}"];
    return mcq("Rationalize the denominator of \\(\\frac{"+n+"}{"+den+"}\\) and simplify.",
      u4wrap(cor),u4dis(cor,cands,3).map(u4wrap),
      "Multiply the numerator and denominator by \\(\\sqrt{"+m+"}\\), which makes the denominator rational: \\[ \\begin{aligned} \\frac{"+n+"}{"+den+"} &= \\frac{"+n+"\\sqrt{"+m+"}}{"+D+"} \\\\ &= "+cor+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor)+"</b>.",
      {n:n,m:m,a:a,shape:shape});
  }
});

/* ---------- 1.14: rationalize a binomial denominator (L2) ---------- */
E("u4-rationalize-binomial",4,["1.14"],2,"gen",function(){
  var shape=pick(["binom","twoRad"]);
  if(shape==="binom"){
    var a2=ri(2,6),b2=pick([2,3,5,6,7,10,11,13].filter(function(z){return z<a2*a2&&z!==a2;})),n2=ri(1,6);
    var D2=a2*a2-b2,g2=u4gcd(n2,D2),n2r=n2/g2,D2r=D2/g2;
    var numCore="("+a2+" - \\sqrt{"+b2+"})";
    var cor2=(D2r===1)?((n2r===1?"":n2r)+numCore):("\\frac{"+(n2r===1?"":n2r)+numCore+"}{"+D2r+"}");
    var npre=(n2===1?"":n2);
    var cands2=["\\frac{"+npre+"("+a2+" + \\sqrt{"+b2+"})}{"+D2+"}",
      "\\frac{"+npre+numCore+"}{"+(a2*a2+b2)+"}",
      "\\frac{"+n2+"\\sqrt{"+b2+"}}{"+b2+" + "+a2+"\\sqrt{"+b2+"}}",
      "\\frac{"+npre+numCore+"}{"+(D2*D2)+"}"];
    return mcq("Rationalize the denominator of \\(\\frac{"+n2+"}{"+a2+" + \\sqrt{"+b2+"}}\\) and simplify.",
      u4wrap(cor2),u4dis(cor2,cands2,3).map(u4wrap),
      "Multiply the numerator and denominator by the conjugate \\("+a2+" - \\sqrt{"+b2+"}\\). The denominator becomes a difference of squares: \\[ \\begin{aligned} \\frac{"+n2+"}{"+a2+" + \\sqrt{"+b2+"}} &= \\frac{"+n2+numCore+"}{("+a2+")^2 - (\\sqrt{"+b2+"})^2} \\\\ &= \\frac{"+n2+numCore+"}{"+D2+"} \\\\ &= "+cor2+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor2)+"</b>.",
      {a:a2,b:b2,n:n2,shape:shape});
  }
  var A=pick([5,6,7,10,11,13,14,15]),B=pick([2,3,5,6,7,10].filter(function(z){return z<A;})),n3=ri(1,6);
  var D3=A-B,g3=u4gcd(n3,D3),n3r=n3/g3,D3r=D3/g3;
  var numC="(\\sqrt{"+A+"} + \\sqrt{"+B+"})";
  var cor3=(D3r===1)?((n3r===1?"":n3r)+numC):("\\frac{"+(n3r===1?"":n3r)+numC+"}{"+D3r+"}");
  var npre3=(n3===1?"":n3);
  var cands3=["\\frac{"+npre3+"(\\sqrt{"+A+"} - \\sqrt{"+B+"})}{"+D3+"}",
    "\\frac{"+npre3+numC+"}{"+(A+B)+"}",
    "\\frac{"+npre3+numC+"}{"+(D3*D3)+"}",
    "\\frac{"+npre3+"(\\sqrt{"+A+"} - \\sqrt{"+B+"})}{"+(A+B)+"}"];
  return mcq("Rationalize the denominator of \\(\\frac{"+n3+"}{\\sqrt{"+A+"} - \\sqrt{"+B+"}}\\) and simplify.",
    u4wrap(cor3),u4dis(cor3,cands3,3).map(u4wrap),
    "Multiply the numerator and denominator by the conjugate \\(\\sqrt{"+A+"} + \\sqrt{"+B+"}\\). The denominator becomes a difference of squares: \\[ \\begin{aligned} \\frac{"+n3+"}{\\sqrt{"+A+"} - \\sqrt{"+B+"}} &= \\frac{"+n3+numC+"}{(\\sqrt{"+A+"})^2 - (\\sqrt{"+B+"})^2} \\\\ &= \\frac{"+n3+numC+"}{"+D3+"} \\\\ &= "+cor3+" \\end{aligned} \\] So the rationalized form is <b>"+u4wrap(cor3)+"</b>.",
    {A:A,B:B,n:n3,shape:shape});
});

/* ---------- 1.16 + 1.17: restrictions and solving radical equations (L2) ---------- */
E("u4-solve-radical",4,["1.16","1.17"],2,"gen",function(){
  var shape=pick(["basic","linear","isolated","twoRad"]);
  if(shape==="basic"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var x=c*c-b;
    return numq("Solve the equation \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\).",
      x,0.01,
      "Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x"+u4sgn(b)+"} &= "+c+" \\\\ x"+u4sgn(b)+" &= "+(c*c)+" \\\\ x &= "+x+" \\end{aligned} \\] Check: \\(\\sqrt{"+x+u4sgn(b)+"} = \\sqrt{"+(c*c)+"} = "+c+"\\), so the root is <b>\\(x = "+x+"\\)</b>.",
      {b:b,c:c,shape:shape});
  }
  if(shape==="linear"){
    var a=pick([2,3,4]),x0=ri(3,15),c2=ri(2,8);
    var Bc=c2*c2-a*x0;
    return numq("Solve the equation \\(\\sqrt{"+a+"x"+u4sgn(Bc)+"} = "+c2+"\\).",
      x0,0.01,
      "Restriction: the radicand must be non-negative, so \\("+a+"x"+u4sgn(Bc)+" \\geq 0\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{"+a+"x"+u4sgn(Bc)+"} &= "+c2+" \\\\ "+a+"x"+u4sgn(Bc)+" &= "+(c2*c2)+" \\\\ "+a+"x &= "+(a*x0)+" \\\\ x &= "+x0+" \\end{aligned} \\] Check: \\(\\sqrt{"+a+" \\times "+x0+u4sgn(Bc)+"} = \\sqrt{"+(c2*c2)+"} = "+c2+"\\), so the root is <b>\\(x = "+x0+"\\)</b>.",
      {a:a,x0:x0,c:c2,shape:shape});
  }
  if(shape==="isolated"){
    var p=ri(1,6),c3=ri(2,8),d=p+c3;
    var b3=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]);
    var x3=c3*c3-b3;
    return numq("Solve the equation \\("+p+" + \\sqrt{x"+u4sgn(b3)+"} = "+d+"\\).",
      x3,0.01,
      "First isolate the radical. Restriction: the radicand must be non-negative, so \\(x \\geq "+(-b3)+"\\). \\[ \\begin{aligned} "+p+" + \\sqrt{x"+u4sgn(b3)+"} &= "+d+" \\\\ \\sqrt{x"+u4sgn(b3)+"} &= "+c3+" \\\\ x"+u4sgn(b3)+" &= "+(c3*c3)+" \\\\ x &= "+x3+" \\end{aligned} \\] Check: \\("+p+" + \\sqrt{"+x3+u4sgn(b3)+"} = "+p+" + "+c3+" = "+d+"\\), so the root is <b>\\(x = "+x3+"\\)</b>.",
      {p:p,c:c3,b:b3,shape:shape});
  }
  var av=ri(1,9),bv=ri(1,9),xv=av+bv;
  return numq("Solve the equation \\(\\sqrt{x + "+av+"} = \\sqrt{2x"+u4sgn(-bv)+"}\\).",
    xv,0.01,
    "Restrictions: both radicands must be non-negative, so \\(x \\geq "+(-av)+"\\) and \\(x \\geq "+fmt(bv/2,1)+"\\). Square both sides and solve: \\[ \\begin{aligned} \\sqrt{x + "+av+"} &= \\sqrt{2x"+u4sgn(-bv)+"} \\\\ x + "+av+" &= 2x"+u4sgn(-bv)+" \\\\ x &= "+xv+" \\end{aligned} \\] Check: both radicands equal \\("+(xv+av)+"\\), which is non-negative, so the root is <b>\\(x = "+xv+"\\)</b>.",
    {a:av,b:bv,shape:shape});
});

/* ---------- 1.18: verify a claimed root by substitution (L2) ---------- */
E("u4-verify-roots",4,["1.18"],1,"gen",function(){
  var shape=pick(["simple","simple","validStmt","extrValue"]);
  if(shape==="simple"){
    var b=pick([-9,-7,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,11,13,15]),c=ri(2,9);
    var r=c*c-b;
    return numq("A student solves \\(\\sqrt{x"+u4sgn(b)+"} = "+c+"\\) and claims the root is \\(x = "+r+"\\). To verify the claim, the student substitutes \\(x = "+r+"\\) into the <b>left side</b> of the original equation. What value does the left side give?",
      c,0.01,
      "Substitute into the original equation, not a squared version of it: \\[ \\begin{aligned} \\sqrt{"+r+u4sgn(b)+"} &= \\sqrt{"+(c*c)+"} \\\\ &= "+c+" \\end{aligned} \\] The left side gives <b>"+c+"</b>, which matches the right side, so the claim checks.",
      {b:b,c:c,r:r,shape:shape});
  }
  var cc=ri(2,8),kk=ri(1,4),s=cc-kk,r2=2*cc+1-s,bb2=cc*cc-r2*s;
  var eq="\\sqrt{x"+u4sgn(bb2)+"} = x - "+cc, kv=r2-cc;
  if(shape==="validStmt"){
    var corS="Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks";
    var candsS=["Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+(-kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks",
      "Substituting gives \\(\\sqrt{"+(kv*kv)+"} = "+kv+"\\) on the left and \\("+r2+" - "+cc+" = "+(-kv)+"\\) on the right, so the value checks",
      "Substituting gives \\("+(kv*kv)+"\\) on the left and \\("+r2+" - "+cc+" = "+kv+"\\) on the right, so the value checks"];
    return mcq("A student solves \\("+eq+"\\) and obtains \\(x = "+r2+"\\). Which statement shows the <b>correct verification</b> of this value?",
      corS,u4dis(corS,candsS,3),
      "Verification means substituting into the original equation and evaluating each side separately. The left side is \\(\\sqrt{"+r2+u4sgn(bb2)+"} = \\sqrt{"+(kv*kv)+"} = "+kv+"\\) (a square root is never negative), and the right side is \\("+r2+" - "+cc+" = "+kv+"\\). The two sides agree, so <b>\\(x = "+r2+"\\)</b> is verified as a root.",
      {c:cc,s:s,r:r2,shape:shape});
  }
  return numq("A student solves \\("+eq+"\\) by squaring and lists \\(x = "+s+"\\) as a possible root. Substituting \\(x = "+s+"\\) into the <b>left side</b> of the original equation gives what value?",
    kk,0.01,
    "Substitute into the original equation: \\[ \\begin{aligned} \\sqrt{"+s+u4sgn(bb2)+"} &= \\sqrt{"+(kk*kk)+"} \\\\ &= "+kk+" \\end{aligned} \\] The left side gives <b>"+kk+"</b>. The right side at \\(x = "+s+"\\) is \\("+s+" - "+cc+" = "+(-kk)+"\\), which is different, so this substitution shows \\(x = "+s+"\\) is not a root.",
    {c:cc,s:s,r:r2,shape:shape});
});

/* ---------- 1.15: why the conjugate rationalizes (difference of squares) (L3) ---------- */
E("u4-conjugate-why",4,["1.15"],3,"gen",function(){
  var shape=pick(["whyConj","whyConj","claim"]);
  if(shape==="whyConj"){
    var b=pick([2,3,5,6,7,10,11,13]);
    var a=pick([2,3,4,5,6,7].filter(function(z){return z*z>b;}));
    var D=a*a-b;
    var cor="The product \\(("+a+")^2 - (\\sqrt{"+b+"})^2 = "+(a*a)+" - "+b+" = "+D+"\\) is a difference of squares, so it is a rational number";
    var cands=["The terms \\(+\\sqrt{"+b+"}\\) and \\(-\\sqrt{"+b+"}\\) add to zero, so the denominator becomes \\("+a+" + "+a+" = "+(2*a)+"\\) with no radical",
      "The product \\(("+a+")^2 + (\\sqrt{"+b+"})^2 = "+(a*a)+" + "+b+" = "+(a*a+b)+"\\) is a sum of squares, so it is a rational number",
      "The factor \\("+a+" - \\sqrt{"+b+"}\\) is the reciprocal of \\("+a+" + \\sqrt{"+b+"}\\), so their product is \\(1\\) and the radical disappears"];
    return mcq("To rationalize the denominator of \\(\\frac{1}{"+a+" + \\sqrt{"+b+"}}\\), the numerator and denominator are multiplied by the conjugate \\("+a+" - \\sqrt{"+b+"}\\). Why does this remove the radical from the denominator?",
      cor,u4dis(cor,cands,3),
      "Multiply the pair out: \\(("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"}) = "+a+"^2 - "+a+"\\sqrt{"+b+"} + "+a+"\\sqrt{"+b+"} - "+b+"\\). The two middle terms cancel, leaving the difference of squares \\("+a+"^2 - "+b+" = "+D+"\\), a rational number with no radical. The conjugate works precisely because a product of the form \\((p + q)(p - q)\\) collapses to \\(p^2 - q^2\\).",
      {a:a,b:b,shape:shape});
  }
  var A2=pick([2,3,5,6,7,10]),B2=pick([2,3,5,6,7,10].filter(function(z){return z!==A2;})),n2=ri(1,6);
  var corB="\\("+(A2+B2)+" + 2\\sqrt{"+(A2*B2)+"}\\)";
  var candsB=["\\("+(A2+B2)+"\\)","\\("+(A2-B2)+"\\)","\\("+(A2+B2)+" - 2\\sqrt{"+(A2*B2)+"}\\)"];
  return mcq("A student multiplies the numerator and denominator of \\(\\frac{"+n2+"}{\\sqrt{"+A2+"} + \\sqrt{"+B2+"}}\\) by \\(\\sqrt{"+A2+"} + \\sqrt{"+B2+"}\\), claiming the new denominator will be rational. What is the new denominator actually equal to?",
    corB,u4dis(corB,candsB,3).map(function(z){return z;}),
    "Squaring the binomial keeps a middle term: \\((\\sqrt{"+A2+"} + \\sqrt{"+B2+"})^2 = "+A2+" + 2\\sqrt{"+A2+" \\times "+B2+"} + "+B2+" = "+(A2+B2)+" + 2\\sqrt{"+(A2*B2)+"}\\), which still contains a radical, so the claim fails. The conjugate \\(\\sqrt{"+A2+"} - \\sqrt{"+B2+"}\\) is the multiplier that works, because its product with the denominator is the difference of squares \\("+A2+" - "+B2+" = "+(A2-B2)+"\\), a rational number.",
    {A:A2,B:B2,n:n2,shape:shape});
});

/* ---------- 1.19: why a root from squaring can be extraneous (L3) ---------- */
E("u4-extraneous-why",4,["1.19"],3,"gen",function(){
  var c=ri(2,8),k=ri(1,4),s=c-k,r=2*c+1-s,b=c*c-r*s;
  var eq="\\sqrt{x"+u4sgn(b)+"} = x - "+c;
  var shape=pick(["why","why","step","which"]);
  if(shape==="why"){
    var cor="At \\(x = "+s+"\\), the right side is \\("+s+" - "+c+" = "+(-k)+"\\), which is negative, but a square root is never negative, so the two sides cannot be equal";
    var cands=["At \\(x = "+s+"\\), the radicand \\(x"+u4sgn(b)+"\\) is a negative number, so the square root in the equation is undefined there",
      "Squaring both sides is never a valid step in solving an equation, so both values found this way have to be thrown out entirely",
      "The value \\(x = "+s+"\\) does not satisfy the squared equation either, since it fails \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) when it is substituted back and checked"];
    return mcq("Solving \\("+eq+"\\) by squaring both sides leads to \\(x = "+r+"\\) and \\(x = "+s+"\\). The value \\(x = "+s+"\\) is not a solution of the original equation. Why not?",
      cor,u4dis(cor,cands,3),
      "Check \\(x = "+s+"\\) in the original equation: the left side is \\(\\sqrt{"+s+u4sgn(b)+"} = \\sqrt{"+(k*k)+"} = "+k+"\\) (the radicand there is positive), while the right side is \\("+s+" - "+c+" = "+(-k)+"\\). Squaring can produce values that solve the squared equation but fail the original, because the squared equation cannot tell \\("+k+"\\) from \\("+(-k)+"\\) on the right side. Only \\(x = "+r+"\\) checks.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  if(shape==="step"){
    var cor2="When both sides are squared, because the squared equation also admits roots of the equation with the right side negated";
    var cands2=["When the radical is isolated on one side, since moving terms across the equals sign changes the solution set of the equation",
      "When the resulting quadratic is factored, since factoring a quadratic can introduce values that were not there before",
      "When the final answers are checked by substitution, since the check itself can create values that fail the original equation"];
    return mcq("When an equation such as \\("+eq+"\\) is solved, an extraneous root can appear. At which step does it enter?",
      cor2,u4dis(cor2,cands2,3),
      "Squaring is the step that can enlarge the solution set: the squared equation \\(x"+u4sgn(b)+" = (x - "+c+")^2\\) is satisfied not only by roots of the original equation but also by roots of \\(\\sqrt{x"+u4sgn(b)+"} = -(x - "+c+")\\). Isolating and factoring preserve the solution set, and checking only filters values out. That is why every root is checked in the original equation.",
      {c:c,k:k,s:s,r:r,shape:shape});
  }
  return mcq("Solving \\("+eq+"\\) by squaring gives \\(x = "+r+"\\) or \\(x = "+s+"\\). Which value is extraneous?",
    ""+s,[""+r,"Both values","Neither value"],
    "Substitute each value into the original equation. At \\(x = "+r+"\\): the left side is \\(\\sqrt{"+(r+b)+"} = \\sqrt{"+((r-c)*(r-c))+"} = "+(r-c)+"\\) and the right side is \\("+r+" - "+c+" = "+(r-c)+"\\), so it checks. At \\(x = "+s+"\\): the left side is \\(\\sqrt{"+(k*k)+"} = "+k+"\\) but the right side is \\("+s+" - "+c+" = "+(-k)+"\\), so it fails. The extraneous value is <b>\\(x = "+s+"\\)</b>.",
    {c:c,k:k,s:s,r:r,shape:shape});
});

/* ---------- 1.20: model a situation with a radical equation (L3) ---------- */
E("u4-model-radical",4,["1.20"],3,"gen",function(){
  var shape=pick(["pendulum","pendulum","fallTime","fallHeight","horizon","tank"]);
  if(shape==="pendulum"){
    var penCtx=[
      {key:"longcase clock",text:"A pendulum in a longcase clock",Ts:[1.0,1.4,2.0]},
      {key:"science display",text:"A pendulum on a science centre display",Ts:[1.6,2.0,2.4,2.8,3.0]},
      {key:"playground swing",text:"A playground swing, modelled as a pendulum",Ts:[1.8,2.2,2.6,3.0]}];
    var pc=pick(penCtx),T=pick(pc.Ts);
    var L=9.8*Math.pow(T/(2*Math.PI),2);
    return numq(pc.text+" has a period of "+fmt(T,1)+" s. The period is modelled by \\(T = 2\\pi\\sqrt{\\frac{L}{9.8}}\\), where \\(L\\) is the length of the pendulum in metres. Find the length of the pendulum, in metres.",
      L,0.03,
      "Substitute \\(T = "+fmt(T,1)+"\\) and solve the radical equation for \\(L\\): \\[ \\begin{aligned} "+fmt(T,1)+" &= 2\\pi\\sqrt{\\frac{L}{9.8}} \\\\ \\frac{"+fmt(T,1)+"}{2\\pi} &= \\sqrt{\\frac{L}{9.8}} \\\\ \\left(\\frac{"+fmt(T,1)+"}{2\\pi}\\right)^2 &= \\frac{L}{9.8} \\\\ L &= 9.8 \\times \\left(\\frac{"+fmt(T,1)+"}{2\\pi}\\right)^2 \\\\ &\\approx "+fmt(L,2)+" \\end{aligned} \\] The length of the pendulum is about <b>"+fmt(L,2)+" m</b>.",
      {ctx:"pendulum: "+pc.key,T:T,L:Math.round(L*1000)/1000});
  }
  var fallCtx=[
    {key:"cliff",text:"A stone is dropped from a cliff",hs:[20,30,40,50,65,80],ts:[2,2.5,3,3.5,4]},
    {key:"scaffold",text:"A wrench slips from the top of a scaffold",hs:[5,10,15,20,25],ts:[1,1.5,2]},
    {key:"bridge",text:"A ball is dropped from a bridge deck",hs:[15,20,25,30,40,50],ts:[1.5,2,2.5,3]}];
  if(shape==="fallTime"){
    var fc=pick(fallCtx),h=pick(fc.hs),t=Math.sqrt(2*h/9.8);
    return numq(fc.text+" that is "+h+" m above the ground. The time to reach the ground is modelled by \\(t = \\sqrt{\\frac{2h}{9.8}}\\), with \\(t\\) in seconds and \\(h\\) in metres. Find the time, in seconds.",
      t,0.05,
      "Substitute \\(h = "+h+"\\) and evaluate: \\[ \\begin{aligned} t &= \\sqrt{\\frac{2 \\times "+h+"}{9.8}} \\\\ &= \\sqrt{"+fmt(2*h/9.8,2)+"} \\\\ &\\approx "+fmt(t,2)+" \\end{aligned} \\] The fall takes about <b>"+fmt(t,2)+" s</b>.",
      {ctx:"fall: "+fc.key,h:h,t:Math.round(t*100)/100});
  }
  if(shape==="fallHeight"){
    var fc2=pick(fallCtx),t2=pick(fc2.ts),h2=4.9*t2*t2;
    return numq(fc2.text+" and takes "+fmt(t2,1)+" s to reach the ground. The fall time is modelled by \\(t = \\sqrt{\\frac{2h}{9.8}}\\), with \\(t\\) in seconds and \\(h\\) in metres. Find the height, in metres.",
      h2,0.5,
      "Substitute \\(t = "+fmt(t2,1)+"\\) and solve the radical equation for \\(h\\): \\[ \\begin{aligned} "+fmt(t2,1)+" &= \\sqrt{\\frac{2h}{9.8}} \\\\ "+fmt(t2*t2,2)+" &= \\frac{2h}{9.8} \\\\ h &= \\frac{9.8 \\times "+fmt(t2*t2,2)+"}{2} \\\\ &= "+fmt(h2,1)+" \\end{aligned} \\] The height is about <b>"+fmt(h2,1)+" m</b>.",
      {ctx:"fall: "+fc2.key,t:t2,h:Math.round(h2*10)/10});
  }
  if(shape==="horizon"){
    var horCtx=[
      {key:"ship deck",text:"from the deck of a ship",hs:[4,9,16,25]},
      {key:"lighthouse",text:"from a lighthouse platform",hs:[16,25,36,49]},
      {key:"cliff top",text:"from a seaside cliff top",hs:[25,36,49,64,81,100]}];
    var hc=pick(horCtx),hh=pick(hc.hs),dd=3.57*Math.sqrt(hh);
    return numq("An observer "+hc.text+" is "+hh+" m above the sea. The distance to the horizon is modelled by \\(d = 3.57\\sqrt{h}\\), where \\(h\\) is the height in metres and \\(d\\) is the distance in kilometres. Find the distance to the horizon, in kilometres.",
      dd,0.15,
      "Substitute \\(h = "+hh+"\\) and evaluate: \\[ \\begin{aligned} d &= 3.57\\sqrt{"+hh+"} \\\\ &= 3.57 \\times "+fmt(Math.sqrt(hh),1)+" \\\\ &= "+fmt(dd,2)+" \\end{aligned} \\] The distance to the horizon is about <b>"+fmt(dd,2)+" km</b>.",
      {ctx:"horizon: "+hc.key,h:hh,d:Math.round(dd*10)/10});
  }
  var tankCtx=[
    {key:"rain barrel",text:"a rain barrel",hs:[0.5,1,1.5]},
    {key:"storage tank",text:"a storage tank",hs:[1,2,3,4,5]}];
  var tc=pick(tankCtx),th=pick(tc.hs),tv=Math.sqrt(19.6*th);
  return numq("Water drains through a hole near the bottom of "+tc.text+". The speed of the water leaving the hole is modelled by \\(v = \\sqrt{19.6h}\\), where \\(h\\) is the depth of the hole below the surface in metres and \\(v\\) is the speed in metres per second. If the hole is "+fmt(th,1)+" m below the surface, find the speed, in metres per second.",
    tv,0.1,
    "Substitute \\(h = "+fmt(th,1)+"\\) and evaluate: \\[ \\begin{aligned} v &= \\sqrt{19.6 \\times "+fmt(th,1)+"} \\\\ &= \\sqrt{"+fmt(19.6*th,1)+"} \\\\ &\\approx "+fmt(tv,2)+" \\end{aligned} \\] The speed is about <b>"+fmt(tv,2)+" m/s</b>.",
    {ctx:"tank: "+tc.key,h:th,v:Math.round(tv*100)/100});
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u4-pk-radical-mixed: borrowed verbatim from math-1201 entry u2-radical-mixed (math-1201:1.16). */
E("u4-pk-radical-mixed",4,["1.1"],1,"gen",function(){
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

/* u4-pk-radical-entire: borrowed verbatim from math-1201 entry u2-radical-entire (math-1201:1.17). */
E("u4-pk-radical-entire",4,["1.2"],1,"gen",function(){
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

/* u4-pk-laws-integral: borrowed verbatim from math-1201 entry u2-laws-integral (math-1201:1.6). */
E("u4-pk-laws-integral",4,["1.13"],2,"gen",function(){
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

/* u4-pk-laws-rational: borrowed verbatim from math-1201 entry u2-laws-rational (math-1201:1.6). */
E("u4-pk-laws-rational",4,["1.13"],2,"gen",function(){
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

/* u4-pk-sort-numbers: borrowed verbatim from math-1201 entry u2-sort-numbers (math-1201:1.18). */
E("u4-pk-sort-numbers",4,["1.9"],1,"gen",function(){
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

/* u4-pk-subsets: borrowed verbatim from math-1201 entry u2-subsets (math-1201:1.19). */
E("u4-pk-subsets",4,["1.9"],1,"var",varset([
  function(){var key="Integers: the whole numbers, their negatives, and zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(-12\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Whole numbers: the counting numbers, together with zero","Rational numbers: ratios of two integers"],
    "The number \\(-12\\) is a negative whole value. It is not a natural number (the counting numbers start at \\(1\\)) and not a whole number (whole numbers are \\(0\\) and up). It is an integer, and although every integer is also rational, the most specific set that fits is the integers. The most specific subset is <b>integers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Whole numbers: the counting numbers, together with zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(0\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(0\\) is not a natural number, because the natural numbers are the counting numbers \\(1, 2, 3, \\ldots\\). It is a whole number, since the whole numbers are the natural numbers together with \\(0\\). It is also an integer and a rational number, but the most specific set that fits is the whole numbers. The most specific subset is <b>whole numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Rational numbers: ratios of two integers, with a nonzero denominator";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\("+FR(4,5)+"\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one and continuing without end","Whole numbers: the counting numbers, together with zero","Integers: the whole numbers, their negatives, and zero"],
    "The value \\("+FR(4,5)+"\\) is a ratio of two integers, which is exactly the definition of a rational number. It is not a counting number, a whole number, or an integer, because it lies between \\(0\\) and \\(1\\). The most specific subset is <b>rational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Irrational numbers: real numbers that are not ratios of integers";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(\\sqrt{7}\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers, with a nonzero denominator, in lowest terms"],
    "The value \\(\\sqrt{7}\\) cannot be written as a ratio of two integers, because \\(7\\) is not a perfect square and its root is a non-terminating, non-repeating decimal. Numbers that are real but not rational form the irrational numbers. The most specific subset is <b>irrational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Natural numbers: the counting numbers, starting from one";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(9\\) belongs to?",
    key,["Whole numbers: the counting numbers, together with the number zero","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(9\\) is a counting number, so it is a natural number. Every natural number is also a whole number, an integer, and a rational number, since the sets nest inside each other, but the most specific set that fits is the smallest one containing it. The most specific subset is <b>natural numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Every integer is also a rational number";
    return mcq("Which statement about the subsets of the real numbers is <b>true</b>?",
    key,
    ["Every rational number is an integer","Every whole number is also a natural number","Irrational numbers are rational numbers written in lowest terms"],
    "The subsets nest: natural numbers sit inside whole numbers, inside integers, inside rational numbers. So any integer \\(k\\) can be written as the ratio \\("+FR("k",1)+"\\), which makes it rational. The reverse claims fail: \\("+FR(1,2)+"\\) is rational but not an integer, \\(0\\) is whole but not natural, and irrational numbers cannot be written as ratios at all. The true statement is: <b>every integer is also a rational number</b>.",
    {stmt:true,keyText:key});}
]));

/* u4-pk-approx: borrowed verbatim from math-1201 entry u2-approx (math-1201:1.20). */
E("u4-pk-approx",4,["1.9"],2,"gen",function(){
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

/* u4-pk-solve-two-step: borrowed verbatim from math-9 entry u5-solve-two-step (math-9:8.18). */
E("u4-pk-solve-two-step",4,["1.17"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + n5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
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
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + n5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + n5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);

/* u4-pk-which-is-solution: borrowed verbatim from math-9 entry u5-which-is-solution (math-9:8.20). */
E("u4-pk-which-is-solution",4,["1.18"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + n5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + n5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);

/* PK tranche pass for Unit 4. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U4_FOR=["1.1","1.2","1.3","1.4","1.9","1.11","1.12","1.13","1.14","1.15","1.16","1.17","1.18","1.19","1.20"];
var PKT_U4={
 "u4-pk-radical-mixed":{src:"math-1201:1.16",group:"radical-forms"},
 "u4-pk-radical-entire":{src:"math-1201:1.17",group:"radical-forms"},
 "u4-pk-laws-integral":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-laws-rational":{src:"math-1201:1.6",group:"exponent-laws"},
 "u4-pk-sort-numbers":{src:"math-1201:1.18",group:"real-numbers"},
 "u4-pk-subsets":{src:"math-1201:1.19",group:"real-numbers"},
 "u4-pk-approx":{src:"math-1201:1.20",group:"real-numbers"},
 "u4-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"},
 "u4-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"}
};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});
