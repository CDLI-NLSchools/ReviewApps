// Math 2200 Unit 5 Rational Expressions and Equations question bank
// CRMARKS: u5-add-subtract=2
// CRMARKS: u5-complex-fraction=2
// CRMARKS: u5-divide=2
// CRMARKS: u5-equivalent-form=1
// CRMARKS: u5-equivalent-restrictions=2
// CRMARKS: u5-error-cancel=2
// CRMARKS: u5-lcd=1
// CRMARKS: u5-lcd-choose=2
// CRMARKS: u5-meeting-problem=3
// CRMARKS: u5-multiply=2
// CRMARKS: u5-npv-basic=1
// CRMARKS: u5-npv-quadratic=2
// CRMARKS: u5-simplify-basic=1
// CRMARKS: u5-simplify-evaluate=2
// CRMARKS: u5-simplify-trinomial=2
// CRMARKS: u5-solve-extraneous=3
// CRMARKS: u5-solve-linear=2
// CRMARKS: u5-word-problem=3
/* ================= Unit 5: Rational Expressions and Equations ================= */
/* ================= Unit 5: Rational Expressions and Equations ================= */
/* Indicators: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12,
   3.13, 3.18, 3.19, 3.20, 3.21. Types follow the Mauger Chapter 6 sets
   (non-permissible values, equivalent expressions, simplify and state
   restrictions, multiply/divide, add/subtract with LCD, complex fractions,
   solve rational equations with extraneous roots, first-step and first-error
   items, and the four word-problem scenarios: work rates, distance and
   speed, upstream/downstream, shared cost) and the MHR Pre-Calculus 11
   Chapter 6 bank, rewritten with original stems and values.
   19 entries: L1 4, L2 11, L3 4. Helpers are prefixed u5. */

function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5sgn(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u5lin(a,b){if(a===0)return ""+b;var s=(a===1?"x":(a===-1?"-x":a+"x"));if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u5par(a,b){return "("+u5lin(a,b)+")";}
function u5quad(a,b,c){var s=(a===1?"x^2":(a===-1?"-x^2":a+"x^2"));if(b>0)s+=" + "+(b===1?"x":b+"x");else if(b<0)s+=" - "+(b===-1?"x":(-b)+"x");if(c>0)s+=" + "+c;else if(c<0)s+=" - "+(-c);return s;}
function u5fr(n,d){if(d<0){n=-n;d=-d;}if(n===0)return "0";var g=u5gcd(n,d);n/=g;d/=g;var s=n<0?"-":"";n=Math.abs(n);if(d===1)return s+n;return s+"\\frac{"+n+"}{"+d+"}";}
function u5wrap(s){return "\\("+s+"\\)";}
function u5frac(n,d){return "\\frac{"+n+"}{"+d+"}";}
function u5dis(correct,cands,n){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length&&out.length<n;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}return out;}
function u5npvStr(vals){var v=vals.slice().sort(function(x,y){return x-y;});return v.map(function(z){return "x \\ne "+z;}).join(", ");}
function u5pow(e){return e===0?"":(e===1?"x":"x^{"+e+"}");}
function u5cp(c,e){if(e===0)return ""+c;var p=u5pow(e);return c===1?p:c+p;}
function u5fac(r,p){var s=u5par(1,-r);return p===1?s:s+"^"+p;}
function u5monoVal(cn,cd,e){ /* body for (cn/cd) * x^e, cn,cd positive and reduced, e any sign */
  var top,bot;
  if(e>=0){top=u5cp(cn,e);bot=(cd===1?"":""+cd);}
  else{top=""+cn;bot=(cd===1?"":cd)+u5pow(-e);}
  if(bot==="")return top;
  return "\\frac{"+top+"}{"+bot+"}";
}
var U5NZ=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
function u5twoRoots(){var r1=pick(U5NZ),r2=pick(U5NZ),t=0;while(r2===r1&&t<60){r2=pick(U5NZ);t++;}return [r1,r2];}

/* ---------- 3.1 + 3.2: non-permissible values, monomial/binomial/factored denominators (L1) ---------- */
E("u5-npv-basic",5,["3.1","3.2"],1,"gen",function(){
  var shape=pick(["mono","binom","factored","factored3"]);
  if(shape==="mono"){
    var a=ri(2,6),c=ri(2,9),tc=0;
    while(c===a&&tc<40){c=ri(2,9);tc++;}
    var cor="x \\ne 0";
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c,a+"x")+"\\).",
      u5wrap(cor),u5dis(cor,["x \\ne "+a,"x \\ne "+(-a),"x \\ne "+c,"x \\ne "+(a+2)],3).map(u5wrap),
      "A value is non-permissible when it makes the denominator zero. Here \\("+a+"x = 0\\) when \\(x = 0\\), so the non-permissible value is <b>\\(x \\ne 0\\)</b>.",
      {shape:shape,roots:[0]});
  }
  if(shape==="binom"){
    var r=pick(U5NZ),c2=ri(2,9);
    var cor2="x \\ne "+r;
    return mcq("State the non-permissible value of the rational expression \\("+u5frac(c2,u5lin(1,-r))+"\\).",
      u5wrap(cor2),u5dis(cor2,["x \\ne "+(-r),"x \\ne 0","x \\ne "+(r+(r>0?2:-2))],3).map(u5wrap),
      "Set the denominator equal to zero and solve: \\[ \\begin{aligned} "+u5lin(1,-r)+" &= 0 \\\\ x &= "+r+" \\end{aligned} \\] So the non-permissible value is <b>\\(x \\ne "+r+"\\)</b>.",
      {shape:shape,roots:[r]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1],c3=ri(2,9);
  if(shape==="factored"){
    var cor3=u5npvStr([r1,r2]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2))+"\\).",
      u5wrap(cor3),u5dis(cor3,[u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,-r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
      "The denominator is zero when either factor is zero: \\("+u5lin(1,-r1)+" = 0\\) gives \\(x = "+r1+"\\), and \\("+u5lin(1,-r2)+" = 0\\) gives \\(x = "+r2+"\\). So the non-permissible values are <b>\\("+cor3+"\\)</b>.",
      {shape:shape,roots:[r1,r2]});
  }
  var r3=pick(U5NZ),t3=0;while((r3===r1||r3===r2)&&t3<60){r3=pick(U5NZ);t3++;}
  var cor4=u5npvStr([r1,r2,r3]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(c3,u5par(1,-r1)+u5par(1,-r2)+u5par(1,-r3))+"\\).",
    u5wrap(cor4),u5dis(cor4,[u5npvStr([r1,r2]),u5npvStr([-r1,-r2,-r3]),u5npvStr([r1,r3]),u5npvStr([r2,r3])],3).map(u5wrap),
    "The denominator is zero when any one of its factors is zero: \\(x = "+r1+"\\), \\(x = "+r2+"\\), or \\(x = "+r3+"\\). So the non-permissible values are <b>\\("+cor4+"\\)</b>.",
    {shape:shape,roots:[r1,r2,r3]});
});

/* ---------- 3.2: non-permissible values, trinomial denominator to factor (L2) ---------- */
E("u5-npv-quadratic",5,["3.2"],2,"gen",function(){
  var shape=pick(["trinom","trinom","dos"]);
  if(shape==="dos"){
    var a=ri(2,7),n=ri(2,9);
    var cor=u5npvStr([-a,a]);
    return mcq("State the non-permissible values of the rational expression \\("+u5frac(n,"x^2 - "+(a*a))+"\\).",
      u5wrap(cor),u5dis(cor,[u5npvStr([a]),u5npvStr([-a]),u5npvStr([a*a]),u5npvStr([0,a])],3).map(u5wrap),
      "Factor the denominator and set each factor equal to zero: \\[ \\begin{aligned} x^2 - "+(a*a)+" &= 0 \\\\ "+u5par(1,-a)+u5par(1,a)+" &= 0 \\\\ x &= "+a+" \\text{ or } x = "+(-a)+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor+"\\)</b>.",
      {shape:shape,roots:[-a,a]});
  }
  var rs=u5twoRoots(),r1=rs[0],r2=rs[1];
  var b=-(r1+r2),cc=r1*r2;
  var num=pick(["const","lin"]),nv=(num==="const")?(""+ri(2,9)):u5lin(1,pick(U5NZ));
  var cor2=u5npvStr([r1,r2]);
  return mcq("State the non-permissible values of the rational expression \\("+u5frac(nv,u5quad(1,b,cc))+"\\).",
    u5wrap(cor2),u5dis(cor2,[u5npvStr([-r1,-r2]),u5npvStr([r1]),u5npvStr([r2]),u5npvStr([-r1,r2]),u5npvStr([r1,-r2])],3).map(u5wrap),
    "Factor the denominator, then set each factor equal to zero: \\[ \\begin{aligned} "+u5quad(1,b,cc)+" &= 0 \\\\ "+u5par(1,-r1)+u5par(1,-r2)+" &= 0 \\\\ x &= "+r1+" \\text{ or } x = "+r2+" \\end{aligned} \\] So the non-permissible values are <b>\\("+cor2+"\\)</b>.",
    {shape:shape,roots:[r1,r2]});
});

/* ---------- 3.3: build an equivalent expression by multiplying num and denom (L1) ---------- */
E("u5-equivalent-form",5,["3.3"],1,"gen",function(){
  var mode=pick(["linOverConst","constOverLin","linOverLin","negOne"]);
  if(mode==="linOverConst"){
    var a=pick(U5NZ),k=ri(2,6),c=pick(U5NZ);
    var base=u5frac(u5par(1,a),""+k),mult=u5par(1,c);
    var cor=u5frac(u5par(1,a)+u5par(1,c),""+k+u5par(1,c));
    var cands=[u5frac(u5par(1,a)+u5par(1,c),""+k),
      u5frac(u5par(1,a),""+k+u5par(1,c)),
      u5frac(u5par(1,a)+u5par(1,-c),""+k+u5par(1,-c)),
      u5frac(u5par(1,c),""+k+u5par(1,a))];
    return mcq("The numerator and denominator of \\("+base+"\\) are both multiplied by \\("+mult+"\\). What is the resulting expression?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Multiplying the numerator and denominator by the same factor multiplies the expression by \\(1\\), so its value does not change. The numerator becomes \\("+u5par(1,a)+u5par(1,c)+"\\) and the denominator becomes \\("+k+u5par(1,c)+"\\). The resulting expression is <b>\\("+cor+"\\)</b>.",
      {mode:mode,a:a,k:k,c:c});
  }
  if(mode==="constOverLin"){
    var m=ri(2,8),b=pick(U5NZ),n=ri(2,5);
    var base2=u5frac(""+m,u5par(1,b));
    var cor2=u5frac(""+(m*n),""+n+u5par(1,b));
    var cands2=[u5frac(""+m,""+n+u5par(1,b)),
      u5frac(""+(m*n),u5par(1,b)),
      u5frac(""+(m+n),""+n+u5par(1,b)),
      u5frac(""+(m*n),""+n+u5par(1,-b))];
    return mcq("The numerator and denominator of \\("+base2+"\\) are both multiplied by \\("+n+"\\). What is the resulting expression?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Both parts must be multiplied: the numerator \\("+m+"\\) becomes \\("+(m*n)+"\\) and the denominator \\("+u5par(1,b)+"\\) becomes \\("+n+u5par(1,b)+"\\). Multiplying only one part would change the value. The resulting expression is <b>\\("+cor2+"\\)</b>.",
      {mode:mode,m:m,b:b,n:n});
  }
  if(mode==="negOne"){
    var an=pick(U5NZ),bn=pick(U5NZ);
    var baseN=u5frac(u5par(1,an),u5par(1,bn));
    var corN=u5frac(u5lin(-1,-an),u5lin(-1,-bn));
    var candsN=[u5frac(u5lin(-1,-an),u5lin(1,bn)),
      u5frac(u5lin(1,an),u5lin(-1,-bn)),
      u5frac(u5lin(-1,an),u5lin(-1,bn)),
      u5frac(u5lin(-1,-an),u5lin(-1,-an))];
    return mcq("The numerator and denominator of \\("+baseN+"\\) are both multiplied by \\(-1\\). What is the resulting expression?",
      u5wrap(corN),u5dis(corN,candsN,3).map(u5wrap),
      "Multiplying by \\(-1\\) changes the sign of <b>every</b> term it multiplies. The numerator \\("+u5par(1,an)+"\\) becomes \\("+u5lin(-1,-an)+"\\), and the denominator \\("+u5par(1,bn)+"\\) becomes \\("+u5lin(-1,-bn)+"\\). Since both parts were multiplied by the same number, the expression was multiplied by \\(1\\) and its value is unchanged. The resulting expression is <b>\\("+corN+"\\)</b>.",
      {mode:mode,a:an,b:bn});
  }
  var a3=pick(U5NZ),b3=pick(U5NZ),c3=pick(U5NZ),t=0;
  while(b3===-a3&&t<40){b3=pick(U5NZ);t++;}
  var base3=u5frac(u5par(1,a3),u5par(1,b3)),mult3=u5par(1,c3);
  var cor3=u5frac(u5par(1,a3)+u5par(1,c3),u5par(1,b3)+u5par(1,c3));
  var cands3=[u5frac(u5par(1,a3)+u5par(1,c3),u5par(1,b3)),
    u5frac(u5par(1,a3),u5par(1,b3)+u5par(1,c3)),
    u5frac(u5par(1,a3)+u5par(1,-c3),u5par(1,b3)+u5par(1,-c3)),
    u5frac(u5par(1,c3),u5par(1,b3)+u5par(1,a3))];
  return mcq("The numerator and denominator of \\("+base3+"\\) are both multiplied by \\("+mult3+"\\). What is the resulting expression?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Multiplying the numerator and denominator by the same factor multiplies the expression by \\(1\\), so its value does not change. The numerator becomes \\("+u5par(1,a3)+u5par(1,c3)+"\\) and the denominator becomes \\("+u5par(1,b3)+u5par(1,c3)+"\\). The resulting expression is <b>\\("+cor3+"\\)</b>.",
    {mode:mode,a:a3,b:b3,c:c3});
});

/* ---------- 3.4 (+3.3): equivalence includes the restrictions (L2) ---------- */
E("u5-equivalent-restrictions",5,["3.4","3.3"],2,"gen",function(){
  var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var orig=u5frac(u5par(1,-r)+u5par(1,-s),u5par(1,-r)+u5par(1,-tt));
  var simp=u5frac(u5lin(1,-s),u5lin(1,-tt));
  var cor=simp+", \\quad "+u5npvStr([r,tt]);
  var cands=[simp+", \\quad "+u5npvStr([tt]),
    simp+", \\quad "+u5npvStr([s,tt]),
    u5frac(u5lin(1,-r),u5lin(1,-tt))+", \\quad "+u5npvStr([r,tt]),
    simp+", \\quad "+u5npvStr([r,s])];
  return mcq("Which expression is equivalent to \\("+orig+"\\), restrictions included?",
    u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
    "Factor and cancel the common factor \\("+u5par(1,-r)+"\\): the expression simplifies to \\("+simp+"\\). But two rational expressions are equivalent only when their restrictions also match. The original denominator is zero at \\(x = "+r+"\\) and \\(x = "+tt+"\\), so both restrictions must be carried along: <b>\\("+cor+"\\)</b>. The simplified fraction on its own would wrongly allow \\(x = "+r+"\\).",
    {r:r,s:s,t:tt});
});

/* ---------- 3.5: simplify to lowest terms, basic shapes (L1) ---------- */
E("u5-simplify-basic",5,["3.5"],1,"gen",function(){
  var mode=pick(["mono","binom"]);
  if(mode==="mono"){
    var g0=pick([2,3]),a1=ri(2,7),b1=ri(2,7),t=0;
    while((a1===b1||u5gcd(a1,b1)!==1)&&t<80){a1=ri(2,7);b1=ri(2,7);t++;}
    var a=g0*a1,b=g0*b1,m=ri(3,6),n=ri(1,m-1),e=m-n;
    var expr=u5frac(u5cp(a,m),u5cp(b,n));
    var cor=(b1===1)?u5cp(a1,e):u5frac(u5cp(a1,e),""+b1);
    var cands=[u5frac(u5cp(a1,e),""+b),
      (b1===1)?u5cp(a1,m+n):u5frac(u5cp(a1,m+n),""+b1),
      u5frac(u5cp(b1,e),""+a1),
      u5frac(u5cp(a,e),""+b1)];
    return mcq("Simplify \\("+expr+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Divide the numerator and denominator by their common factors: the coefficients share a factor of \\("+g0+"\\), and the powers combine by subtracting exponents, \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\): \\[ \\begin{aligned} "+expr+" &= \\frac{"+a1+"x^{"+m+"}}{"+b1+"x^{"+n+"}} \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  var k=ri(2,6),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var expr2=u5frac(""+k+u5par(1,-r),u5par(1,-r)+u5par(1,-s));
  var cor2=u5frac(""+k,u5lin(1,-s));
  var cands2=[u5frac(""+k,u5lin(1,-r)),
    u5frac("1",u5lin(1,-s)),
    u5frac(u5par(1,-r),u5lin(1,-s)),
    u5frac(""+k,u5lin(1,-r)+u5par(1,-s))];
  return mcq("Simplify \\("+expr2+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The factor \\("+u5par(1,-r)+"\\) appears in both the numerator and the denominator, so it divides out: \\[ \\begin{aligned} "+expr2+" &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,k:k,r:r,s:s});
});

/* ---------- 3.5 + 3.6: simplify a trinomial ratio, restrictions carried (L2) ---------- */
E("u5-simplify-trinomial",5,["3.5","3.6"],2,"gen",function(){
  var mode=pick(["both","binomialDen"]);
  var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+s),r*s);
  if(mode==="both"){
    var denQ=u5quad(1,-(r+tt),r*tt);
    var cor=u5frac(u5lin(1,-s),u5lin(1,-tt));
    var cands=[u5frac(u5lin(1,-tt),u5lin(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-tt)),
      u5fr(s,tt),
      u5frac(u5lin(1,-s),u5lin(1,-r))];
    return mcq("Simplify \\("+u5frac(numQ,denQ)+"\\) to lowest terms.",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Factor both polynomials. The numerator is \\("+u5par(1,-r)+u5par(1,-s)+"\\) and the denominator is \\("+u5par(1,-r)+u5par(1,-tt)+"\\), so the common factor \\("+u5par(1,-r)+"\\) divides out: \\[ \\begin{aligned} "+u5frac(numQ,denQ)+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),u5par(1,-r)+u5par(1,-tt))+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified form is <b>\\("+cor+"\\)</b>, for \\("+u5npvStr([r,tt])+"\\). Only factors divide out; the terms of the trinomials cannot be cancelled.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var k=pick([2,3,4]);
  var cor2=u5frac(u5lin(1,-s),""+k);
  var cands2=[u5frac(u5lin(1,-tt),""+k),
    u5frac(u5lin(1,-s),u5lin(1,-r)),
    u5fr(s,k),
    u5frac(u5lin(1,-r),""+k)];
  return mcq("Simplify \\("+u5frac(numQ,""+k+u5par(1,-r))+"\\) to lowest terms.",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor the numerator: \\("+numQ+" = "+u5par(1,-r)+u5par(1,-s)+"\\). The factor \\("+u5par(1,-r)+"\\) also appears in the denominator, so it divides out: \\[ \\begin{aligned} "+u5frac(numQ,""+k+u5par(1,-r))+" &= "+u5frac(u5par(1,-r)+u5par(1,-s),""+k+u5par(1,-r))+" \\\\ &= "+cor2+" \\end{aligned} \\] The simplified form is <b>\\("+cor2+"\\)</b>, for \\(x \\ne "+r+"\\).",
    {mode:mode,r:r,s:s,t:tt,k:k});
});

/* ---------- 3.6: simplify, then evaluate (L2, numeric) ---------- */
E("u5-simplify-evaluate",5,["3.6"],2,"gen",function(){
  var mode=pick(["trinomial","monomial"]);
  if(mode==="trinomial"){
    var rs=u5twoRoots(),r=rs[0],s=rs[1];
    var k0=ri(-3,6),t=0;while((k0===r||k0===s)&&t<60){k0=ri(-3,6);t++;}
    var expr=u5frac(u5quad(1,-(r+s),r*s),u5lin(1,-r));
    var val=k0-s;
    return numq("What is the value of \\("+expr+"\\) when \\(x = "+k0+"\\)?",
      val,0.01,
      "Simplify first. The numerator factors as \\("+u5par(1,-r)+u5par(1,-s)+"\\), and the factor \\("+u5par(1,-r)+"\\) divides out, leaving \\("+u5lin(1,-s)+"\\) (for \\(x \\ne "+r+"\\)). Substituting \\(x = "+k0+"\\): \\[ \\begin{aligned} "+u5lin(1,-s)+" &= "+k0+u5sgn(-s)+" \\\\ &= "+val+" \\end{aligned} \\] The value is <b>"+val+"</b>.",
      {mode:mode,r:r,s:s,k0:k0});
  }
  var a=pick([2,3]),p=ri(2,6),k1=ri(2,5);
  var expr2=u5frac(u5quad(a,a*p,0),""+a+"x");
  var val2=k1+p;
  return numq("What is the value of \\("+expr2+"\\) when \\(x = "+k1+"\\)?",
    val2,0.01,
    "Simplify first: factor the numerator and divide out the common factor \\("+a+"x\\) (for \\(x \\ne 0\\)): \\[ \\begin{aligned} "+expr2+" &= \\frac{"+a+"x"+u5par(1,p)+"}{"+a+"x} \\\\ &= "+u5lin(1,p)+" \\end{aligned} \\] Substituting \\(x = "+k1+"\\) gives \\("+k1+" + "+p+" = "+val2+"\\). The value is <b>"+val2+"</b>.",
    {mode:mode,a:a,p:p,k0:k1});
});

/* ---------- 3.7: a shown simplification cancels terms, not factors (L3) ---------- */
E("u5-error-cancel",5,["3.7"],3,"gen",function(){
  var mode=pick(["linTerms","splitNum","noFactor"]);
  if(mode==="linTerms"){
    var p=pick(U5NZ),q=pick(U5NZ),t=0;while(q===p&&t<60){q=pick(U5NZ);t++;}
    var expr=u5frac(u5lin(1,p),u5lin(1,q)),claim=u5fr(p,q);
    var cor=expr;
    var cands=[claim,u5frac(u5lin(1,q),u5lin(1,p)),"1",u5fr(q,p)];
    return mcq("A student simplifies \\("+expr+"\\) and writes \\("+claim+"\\), explaining that the \\(x\\) terms cancel. What is the correct simplification?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The student's move cancels <b>terms</b>, not factors. In \\("+u5lin(1,p)+"\\) the \\(x\\) is one term of a sum, not a factor of the whole numerator, and the same holds in the denominator, so nothing can divide out. No factor is common to the numerator and the denominator, so the expression is already in lowest terms: <b>\\("+cor+"\\)</b> (for \\(x \\ne "+(-q)+"\\).",
      {mode:mode,p:p,q:q});
  }
  if(mode==="splitNum"){
    var p2=pick([2,3,4,5,6]);
    var expr2=u5frac(u5lin(2,2*p2),"2"),claim2=u5lin(1,2*p2);
    var cor2=u5lin(1,p2);
    var cands2=[claim2,"x + "+u5fr(p2,2),u5lin(2,p2),u5frac(u5lin(1,p2),"2")];
    return mcq("A student simplifies \\("+expr2+"\\) and writes \\("+claim2+"\\), explaining that the \\(2\\) in the denominator cancels the \\(2x\\) term. What is the correct simplification?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "The denominator \\(2\\) is a factor of the whole numerator, so it must divide <b>every</b> term, not just the first one: \\[ \\begin{aligned} "+expr2+" &= \\frac{2"+u5par(1,p2)+"}{2} \\\\ &= "+cor2+" \\end{aligned} \\] The student divided only the \\(2x\\) term and left the constant untouched. The correct simplification is <b>\\("+cor2+"\\)</b>.",
      {mode:mode,p:p2});
  }
  var p3=pick([3,5,6,7,8,10,12]);
  var expr3=u5frac(u5quad(1,0,p3),"x^2"),claim3=""+(p3+1);
  var cor3=expr3;
  var cands3=[claim3,u5frac("x^2",u5quad(1,0,p3)),u5fr(p3,1)+" + "+u5frac("1","x^2")];
  return mcq("A student simplifies \\("+expr3+"\\) and writes \\("+claim3+"\\), explaining that \\(x^2\\) divided by \\(x^2\\) is \\(1\\) and the constant stays. What is the correct simplification?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "The student treated the numerator as separate pieces. In fact \\(x^2\\) is not a factor of the whole numerator \\("+u5quad(1,0,p3)+"\\): the constant term \\("+p3+"\\) has no \\(x^2\\) in it, so nothing divides out. A sum cannot be split and simplified piece by piece unless each term is divided, which here would give \\(1 + "+u5frac(p3,"x^2")+"\\), a different (and not simpler) form. The expression is already in lowest terms: <b>\\("+cor3+"\\)</b> (for \\(x \\ne 0\\).",
    {mode:mode,p:p3});
});

/* ---------- 3.8: multiply rational expressions (L2) ---------- */
E("u5-multiply",5,["3.8"],2,"gen",function(){
  var mode=pick(["poly","poly","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4);
    var g=u5gcd(a*c,b*d),cn=(a*c)/g,cd=(b*d)/g,e=m-n;
    var expr=u5frac(u5cp(a,m),""+b)+" \\times "+u5frac(""+c,u5cp(d,n));
    var cor=u5monoVal(cn,cd,e);
    var gd=u5gcd(a*d,b*c);
    var cands=[u5monoVal(cn,cd,m+n),
      u5monoVal((a*d)/gd,(b*c)/gd,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Multiply and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Multiply the numerators and the denominators, then reduce: the coefficients give \\("+a+" \\times "+c+" = "+(a*c)+"\\) over \\("+b+" \\times "+d+" = "+(b*d)+"\\), which reduces to \\("+u5fr(a*c,b*d)+"\\), and \\(x^{"+m+"} \\div x^{"+n+"} = x^{"+e+"}\\) (with the power moving to the denominator if the exponent is negative). The product is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n});
  }
  var r=pick(U5NZ),u=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
  while((u===r||s===r||s===u||tt===r||tt===u||tt===s)&&t<100){u=pick(U5NZ);s=pick(U5NZ);tt=pick(U5NZ);t++;}
  var numQ=u5quad(1,-(r+u),r*u);
  var expr2=u5frac(numQ,u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt));
  var cor2=u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt));
  var cands2=[u5frac(u5lin(1,-tt),u5par(1,-r)+u5par(1,-u)),
    u5frac(u5par(1,-s)+u5par(1,-u),u5lin(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-u),u5par(1,-s)+u5par(1,-tt)),
    u5frac(u5par(1,-r)+u5par(1,-tt),u5lin(1,-u))];
  return mcq("Multiply and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "Factor first, then divide out the common factors before multiplying. The trinomial factors as \\("+u5par(1,-r)+u5par(1,-u)+"\\), and the factor \\("+u5par(1,-s)+"\\) appears in a numerator and a denominator: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5par(1,-r)+u5par(1,-u),u5lin(1,-tt))+" \\end{aligned} \\] The product is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\).",
    {mode:mode,r:r,u:u,s:s,t:tt});
});

/* ---------- 3.9: divide rational expressions (L2) ---------- */
E("u5-divide",5,["3.9"],2,"gen",function(){
  var mode=pick(["poly","poly2","mono"]);
  if(mode==="mono"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),m=ri(2,5),n=ri(1,4),p=ri(1,4),q=ri(1,4);
    var cn0=a*d,cd0=b*c,e=(m-n)-(p-q),g=u5gcd(cn0,cd0),cn=cn0/g,cd=cd0/g;
    var expr=u5frac(u5cp(a,m),u5cp(b,n))+" \\div "+u5frac(u5cp(c,p),u5cp(d,q));
    var cor=u5monoVal(cn,cd,e);
    var gm=u5gcd(a*c,b*d);
    var cands=[u5monoVal(cn,cd,(m-n)+(p-q)),
      u5monoVal((a*c)/gm,(b*d)/gm,e),
      u5monoVal(cd,cn,e),
      u5monoVal(cn,cd,-e),
      u5monoVal(cn,cd,(m-n)-(p+q)),
      u5monoVal(cn,cd,e+2),
      u5monoVal(cd+1,cn,e)];
    return mcq("Divide and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "To divide, multiply by the reciprocal of the second expression: \\[ \\begin{aligned} "+expr+" &= \\frac{"+u5cp(a,m)+"}{"+u5cp(b,n)+"} \\times \\frac{"+u5cp(d,q)+"}{"+u5cp(c,p)+"} \\\\ &= "+cor+" \\end{aligned} \\] The coefficients combine to \\("+u5fr(cn0,cd0)+"\\), and the exponent of \\(x\\) is \\(("+m+" - "+n+") - ("+p+" - "+q+") = "+e+"\\); a negative exponent places the power in the denominator. The quotient is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\).",
      {mode:mode,a:a,b:b,c:c,d:d,m:m,n:n,p:p,q:q});
  }
  if(mode==="poly"){
    var r=pick(U5NZ),s=pick(U5NZ),tt=pick(U5NZ),t=0;
    while((s===r||tt===r||tt===s)&&t<80){s=pick(U5NZ);tt=pick(U5NZ);t++;}
    var expr2=u5frac(u5lin(1,-r),u5lin(1,-s))+" \\div "+u5frac(u5lin(1,-tt),u5lin(1,-s));
    var cor2=u5frac(u5lin(1,-r),u5lin(1,-tt));
    var cands2=[u5frac(u5lin(1,-tt),u5lin(1,-r)),
      u5frac(u5par(1,-r)+u5par(1,-tt),u5par(1,-s)+u5par(1,-s)),
      u5frac(u5lin(1,-r),u5lin(1,-s)),
      u5frac(u5lin(1,-s),u5lin(1,-tt))];
    return mcq("Divide and simplify: \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Dividing by a rational expression means multiplying by its reciprocal. The divisor's reciprocal is \\("+u5frac(u5lin(1,-s),u5lin(1,-tt))+"\\), and the factor \\("+u5par(1,-s)+"\\) then divides out: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(u5lin(1,-r),u5lin(1,-s))+" \\times "+u5frac(u5lin(1,-s),u5lin(1,-tt))+" \\\\ &= "+cor2+" \\end{aligned} \\] The quotient is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([s,tt])+"\\). Note the extra restriction \\(x \\ne "+tt+"\\): it comes from the numerator of the divisor, which becomes a denominator after the flip.",
      {mode:mode,r:r,s:s,t:tt});
  }
  var r2=pick(U5NZ),u2=pick(U5NZ),s2=pick(U5NZ),t2=0;
  while((u2===r2||s2===r2||s2===u2)&&t2<80){u2=pick(U5NZ);s2=pick(U5NZ);t2++;}
  var numQ=u5quad(1,-(r2+u2),r2*u2);
  var expr3=u5frac(numQ,u5lin(1,-s2))+" \\div "+u5frac(u5lin(1,-u2),u5lin(1,-s2));
  var cor3=u5lin(1,-r2);
  var cands3=[u5frac(u5lin(1,-r2),u5lin(1,-u2)),
    u5frac(u5par(1,-r2)+u5par(1,-u2),u5lin(1,-s2)),
    u5lin(1,-u2),
    u5frac(u5lin(1,-r2),u5lin(1,-s2))];
  return mcq("Divide and simplify: \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Factor the numerator of the first expression: \\("+numQ+" = "+u5par(1,-r2)+u5par(1,-u2)+"\\). Then multiply by the reciprocal of the divisor: \\[ \\begin{aligned} "+expr3+" &= "+u5frac(numQ,u5lin(1,-s2))+" \\times "+u5frac(u5lin(1,-s2),u5lin(1,-u2))+" \\\\ &= "+cor3+" \\end{aligned} \\] The factors \\("+u5par(1,-s2)+"\\) and \\("+u5par(1,-u2)+"\\) both divide out, leaving just \\("+cor3+"\\). The quotient is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([s2,u2])+"\\).",
    {mode:mode,r:r2,u:u2,s:s2});
});

/* ---------- 3.10: lowest common denominator of two rational expressions (L1) ---------- */
E("u5-lcd",5,["3.10"],1,"gen",function(){
  var mode=pick(["mono","distinct","shared"]);
  if(mode==="mono"){
    var a=pick([1,2,3,4,6]),b=pick([1,2,3,4,6]),m=ri(1,3),n=ri(1,3),p=ri(2,9),q=ri(2,9);
    var L=a*b/u5gcd(a,b),E=Math.max(m,n);
    var d1=(a===1?u5pow(m):a+u5pow(m)),d2=(b===1?u5pow(n):b+u5pow(n));
    var cor=(L===1?u5pow(E):L+u5pow(E));
    var cands=[(a*b===1?u5pow(m+n):(a*b)+u5pow(m+n)),
      (L===1?u5pow(Math.min(m,n)):L+u5pow(Math.min(m,n))),
      (a*b===1?u5pow(E):(a*b)+u5pow(E)),
      u5pow(Math.max(m,n)),
      (L+2)+u5pow(E),
      (L+1)+u5pow(E),
      (L+3)+u5pow(E),
      u5pow(E+1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The LCD must be a multiple of both denominators. The coefficient is the least common multiple of \\("+a+"\\) and \\("+b+"\\), which is \\("+L+"\\), and the power of \\(x\\) must be the larger of the two powers, \\(x^{"+E+"}\\). So the lowest common denominator is <b>\\("+cor+"\\)</b>. Taking the product of the coefficients or adding the powers would give a common denominator, but not the lowest one.",
      {mode:mode,a:a,b:b,m:m,n:n});
  }
  if(mode==="distinct"){
    var rs=u5twoRoots(),r=rs[0],s=rs[1],p2=ri(2,9),q2=ri(2,9);
    var cor2=u5par(1,-r)+u5par(1,-s);
    var cands2=[u5lin(2,-(r+s)),u5par(1,-r),u5par(1,-s),u5par(1,-r)+u5par(1,-r)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,u5lin(1,-r))+"\\) and \\("+u5frac(q2,u5lin(1,-s))+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "The two denominators share no factor, so neither divides the other. The lowest common denominator is their product: <b>\\("+cor2+"\\)</b>. Adding the denominators would not give a multiple of either one.",
      {mode:mode,r:r,s:s});
  }
  var rs3=u5twoRoots(),r3=rs3[0],s3=rs3[1],p3=ri(2,9),q3=ri(2,9);
  var cor3=u5par(1,-r3)+u5par(1,-s3);
  var cands3=[u5par(1,-r3)+u5par(1,-s3)+u5par(1,-s3),
    u5lin(1,-s3),
    u5par(1,-r3),
    u5par(1,-s3)+u5par(1,-s3)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p3,u5par(1,-r3)+u5par(1,-s3))+"\\) and \\("+u5frac(q3,u5lin(1,-s3))+"\\)?",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "The second denominator \\("+u5lin(1,-s3)+"\\) already divides the first, so it adds nothing new. The lowest common denominator is the first denominator itself: <b>\\("+cor3+"\\)</b>. Multiplying the two denominators together would repeat the factor \\("+u5par(1,-s3)+"\\).",
    {mode:mode,r:r3,s:s3});
});

/* ---------- 3.12 (+3.11): add or subtract rational expressions (L2) ---------- */
E("u5-add-subtract",5,["3.12","3.11"],2,"gen",function(){
  var mode=pick(["mono","binom","binom"]);
  if(mode==="mono"){
    var op=pick(["+","-"]),b=ri(2,6),d=ri(2,6),t=0;
    while(b===d&&t<40){d=ri(2,6);t++;}
    var L=b*d/u5gcd(b,d);
    var a=ri(2,9),c=ri(2,9);
    while((op==="-"&&a/b<=c/d)||(op==="+"&&(a/b===c/d))){a=ri(2,9);c=ri(2,9);}
    var num=a*(L/b)+(op==="+"?c*(L/d):-c*(L/d));
    var g=u5gcd(num,L),numR=num/g,LR=L/g;
    var expr=u5frac(a,""+b+"x")+" "+op+" "+u5frac(c,""+d+"x");
    var cor=(LR===1)?u5frac(numR,"x"):u5frac(numR,""+LR+"x");
    var numErr=a*(L/b)+(op==="+"?-c*(L/d):c*(L/d));
    var cands=[(LR===1)?u5frac(numErr,"x"):u5frac(numErr,""+LR+"x"),
      u5frac(a+c,""+(b+d)+"x"),
      u5frac(num,""+(L+b+d)+"x"),
      (LR===1)?u5frac(numR,"x"):(u5frac(numR,""+(LR+1)+"x"))];
    return mcq("Add or subtract and simplify: \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "The denominators are \\("+b+"x\\) and \\("+d+"x\\), so their lowest common denominator is \\("+L+"x\\). Rewrite each fraction with that denominator and combine the numerators: \\[ \\begin{aligned} "+expr+" &= "+u5frac(a*(L/b),""+L+"x")+" "+op+" "+u5frac(c*(L/d),""+L+"x")+" \\\\ &= "+u5frac(num,""+L+"x")+" \\\\ &= "+cor+" \\end{aligned} \\] The sum is <b>\\("+cor+"\\)</b>, for \\(x \\ne 0\\). The numerators are combined only after both fractions share the same denominator.",
      {mode:mode,op:op,a:a,b:b,c:c,d:d});
  }
  var op2=pick(["+","-"]),p=ri(2,7),q=ri(2,7),rs=u5twoRoots(),r=rs[0],s=rs[1];
  var A=p+q,B=-(p*s+q*r);
  if(op2==="-"){A=p-q;B=-p*s+q*r;}
  var numBody=u5lin(A,B);
  var expr2=u5frac(p,u5lin(1,-r))+" "+op2+" "+u5frac(q,u5lin(1,-s));
  var cor2=u5frac(numBody,u5par(1,-r)+u5par(1,-s));
  var numErr2=u5lin(A,-(p*s-q*r));
  if(op2==="-")numErr2=u5lin(A,-(p*s+q*r));
  var cands2=[u5frac(numErr2,u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5lin(2,-(r+s))),
    u5frac(""+(p+q),u5par(1,-r)+u5par(1,-s)),
    u5frac(numBody,u5par(1,-r))];
  return mcq("Add or subtract and simplify: \\("+expr2+"\\).",
    u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
    "The denominators share no factor, so the lowest common denominator is \\("+u5par(1,-r)+u5par(1,-s)+"\\). Give each fraction that denominator, then combine the numerators: \\[ \\begin{aligned} "+expr2+" &= "+u5frac(p+u5par(1,-s),u5par(1,-r)+u5par(1,-s))+" "+op2+" "+u5frac(q+u5par(1,-r),u5par(1,-r)+u5par(1,-s))+" \\\\ &= "+u5frac(numBody,u5par(1,-r)+u5par(1,-s))+" \\end{aligned} \\] The numerator is \\("+numBody+"\\); it shares no factor with the denominator, so nothing cancels. The result is <b>\\("+cor2+"\\)</b>, for \\("+u5npvStr([r,s])+"\\).",
    {mode:mode,op:op2,p:p,q:q,r:r,s:s});
});

/* ---------- 3.11: choose the lowest common denominator for a pair or triple (L2) ---------- */
E("u5-lcd-choose",5,["3.11"],1,"gen",function(){
  var mode=pick(["shared","shared","power","coeff","triple"]);
  function threeRoots(){var rs=u5twoRoots(),r=rs[0],s=rs[1],t=pick(U5NZ),g=0;while((t===r||t===s)&&g<60){t=pick(U5NZ);g++;}return [r,s,t];}
  if(mode==="shared"){
    var R=threeRoots(),r=R[0],s=R[1],t=R[2],p=ri(2,9),q=ri(2,9);
    var d1=u5fac(r,1)+u5fac(s,1),d2=u5fac(r,1)+u5fac(t,1);
    var cor=u5fac(r,1)+u5fac(s,1)+u5fac(t,1);
    var cands=[u5fac(r,2)+u5fac(s,1)+u5fac(t,1),
      pick([d1,d2]),
      u5fac(s,1)+u5fac(t,1),
      u5fac(-r,1)+u5fac(s,1)+u5fac(t,1),
      u5quad(2,-(2*r+s+t),r*s+r*t)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p,d1)+"\\) and \\("+u5frac(q,d2)+"\\)?",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+d1+"\\) and \\("+d2+"\\). Build the LCD factor by factor, taking each different factor the greatest number of times it appears in any one denominator. The factor \\("+u5fac(r,1)+"\\) appears in both denominators, but it is needed only once; \\("+u5fac(s,1)+"\\) and \\("+u5fac(t,1)+"\\) each appear once. So the LCD is \\["+cor+"\\] The lowest common denominator is <b>\\("+cor+"\\)</b>. Multiplying the two denominators together would use the shared factor \\("+u5fac(r,1)+"\\) twice, which gives a common denominator, but not the lowest one.",
      {mode:mode,dens:[{c:1,f:[[r,1],[s,1]]},{c:1,f:[[r,1],[t,1]]}],lcd:{c:1,f:[[r,1],[s,1],[t,1]]}});
  }
  if(mode==="power"){
    var R2=threeRoots(),r2=R2[0],s2=R2[1],t2=R2[2],p2=ri(2,9),q2=ri(2,9);
    var e1=u5fac(r2,2)+u5fac(s2,1),e2=u5fac(r2,1)+u5fac(t2,1);
    var cor2=u5fac(r2,2)+u5fac(s2,1)+u5fac(t2,1);
    var cands2=[u5fac(r2,1)+u5fac(s2,1)+u5fac(t2,1),
      u5fac(r2,3)+u5fac(s2,1)+u5fac(t2,1),
      pick([e1,u5fac(r2,2)+u5fac(t2,1)]),
      u5fac(-r2,2)+u5fac(s2,1)+u5fac(t2,1)];
    return mcq("What is the lowest common denominator of \\("+u5frac(p2,e1)+"\\) and \\("+u5frac(q2,e2)+"\\)?",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Both denominators are already in factored form: \\("+e1+"\\) and \\("+e2+"\\). The LCD takes each factor at the highest power it has in any one denominator. The factor \\("+u5fac(r2,1)+"\\) appears squared in the first denominator and only once in the second, so the LCD uses \\("+u5fac(r2,2)+"\\) for it, and takes \\("+u5fac(s2,1)+"\\) and \\("+u5fac(t2,1)+"\\) once each: \\["+cor2+"\\] The lowest common denominator is <b>\\("+cor2+"\\)</b>. Using only the first power of \\("+u5fac(r2,1)+"\\) would leave the first denominator unable to divide the result evenly.",
      {mode:mode,dens:[{c:1,f:[[r2,2],[s2,1]]},{c:1,f:[[r2,1],[t2,1]]}],lcd:{c:1,f:[[r2,2],[s2,1],[t2,1]]}});
  }
  if(mode==="coeff"){
    var a=ri(2,9),b=ri(2,9),g0=0;while(b===a&&g0<40){b=ri(2,9);g0++;}
    var L=a*b/u5gcd(a,b),r3=pick(U5NZ),p3=ri(2,9),q3=ri(2,9);
    var f1=u5fac(r3,1),dA=a+f1,dB=b+f1,cor3=L+f1;
    var cands3=[(a*b)+f1,""+a+f1,(a+b)+f1,""+b+f1,L+u5fac(-r3,1)];
    var remark=(u5gcd(a,b)>1)?("The coefficients "+a+" and "+b+" share a common factor, so their least common multiple is "+L+", not their product "+(a*b)+"."):("The coefficients "+a+" and "+b+" have no common factor, so their least common multiple is their product, "+L+".");
    return mcq("What is the lowest common denominator of \\("+u5frac(p3,dA)+"\\) and \\("+u5frac(q3,dB)+"\\)?",
      u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
      "Both denominators contain the factor \\("+f1+"\\), so that factor is needed only once in the LCD. "+remark+" So the LCD is \\["+cor3+"\\] The lowest common denominator is <b>\\("+cor3+"\\)</b>.",
      {mode:mode,dens:[{c:a,f:[[r3,1]]},{c:b,f:[[r3,1]]}],lcd:{c:L,f:[[r3,1]]}});
  }
  var R4=threeRoots(),r4=R4[0],s4=R4[1],t4=R4[2],p4=ri(2,9),q4=ri(2,9),w4=ri(2,9);
  var g1=u5fac(r4,1)+u5fac(s4,1),g2=u5fac(s4,1)+u5fac(t4,1),g3=u5fac(r4,1)+u5fac(t4,1);
  var cor4=u5fac(r4,1)+u5fac(s4,1)+u5fac(t4,1);
  var cands4=[u5fac(r4,2)+u5fac(s4,2)+u5fac(t4,2),
    pick([g1,g2,g3]),
    u5quad(3,-2*(r4+s4+t4),r4*s4+s4*t4+r4*t4),
    u5fac(-r4,1)+u5fac(s4,1)+u5fac(t4,1)];
  return mcq("What is the lowest common denominator of \\("+u5frac(p4,g1)+"\\), \\("+u5frac(q4,g2)+"\\) and \\("+u5frac(w4,g3)+"\\)?",
    u5wrap(cor4),u5dis(cor4,cands4,3).map(u5wrap),
    "Write out the factors of the three denominators: \\("+g1+"\\), \\("+g2+"\\) and \\("+g3+"\\). Across the three denominators, the different factors are \\("+u5fac(r4,1)+"\\), \\("+u5fac(s4,1)+"\\) and \\("+u5fac(t4,1)+"\\), and each one appears at most once in any single denominator, so the LCD takes each of them once: \\["+cor4+"\\] The lowest common denominator is <b>\\("+cor4+"\\)</b>. Multiplying all three denominators together would use every factor twice.",
    {mode:mode,dens:[{c:1,f:[[r4,1],[s4,1]]},{c:1,f:[[s4,1],[t4,1]]},{c:1,f:[[r4,1],[t4,1]]}],lcd:{c:1,f:[[r4,1],[s4,1],[t4,1]]}});
});

/* ---------- 3.13: simplify a complex fraction (L2) ---------- */
E("u5-complex-fraction",5,["3.13"],1,"gen",function(){
  var mode=pick(["numeric","singleVar","binomial"]);
  if(mode==="numeric"){
    var a=ri(2,9),b=ri(2,9),c=ri(2,9),d=ri(2,9),t=0;
    while((a===b||c===d)&&t<60){a=ri(2,9);b=ri(2,9);c=ri(2,9);d=ri(2,9);t++;}
    var expr=u5frac(u5frac(a,b),u5frac(c,d));
    var cor=u5fr(a*d,b*c);
    var cands=[u5fr(b*c,a*d),u5fr(a*c,b*d),u5fr(a+c,b+d),u5fr(a*d+1,b*c)];
    return mcq("Simplify the complex fraction \\("+expr+"\\).",
      u5wrap(cor),u5dis(cor,cands,3).map(u5wrap),
      "A complex fraction is a division in disguise: divide the numerator by the denominator, which means multiplying by its reciprocal. \\[ \\begin{aligned} "+expr+" &= "+u5frac(a,b)+" \\div "+u5frac(c,d)+" \\\\ &= "+u5frac(a,b)+" \\times "+u5frac(d,c)+" \\\\ &= "+u5frac(a*d,b*c)+" \\\\ &= "+cor+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor+"\\)</b>.",
      {mode:mode,a:a,b:b,c:c,d:d});
  }
  if(mode==="singleVar"){
    var a2=ri(2,7),b2=ri(2,7),t2=0;while(a2===b2&&t2<60){b2=ri(2,7);t2++;}
    var expr2=u5frac(u5frac("x",""+a2),u5frac("x",""+b2));
    var cor2=u5fr(b2,a2);
    var cands2=[u5fr(a2,b2),"1",u5fr(a2+b2,a2)];
    return mcq("Simplify the complex fraction \\("+expr2+"\\).",
      u5wrap(cor2),u5dis(cor2,cands2,3).map(u5wrap),
      "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("x",""+b2)+"\\). \\[ \\begin{aligned} "+expr2+" &= "+u5frac("x",""+a2)+" \\div "+u5frac("x",""+b2)+" \\\\ &= "+u5frac("x",""+a2)+" \\times "+u5frac(""+b2,"x")+" \\\\ &= "+cor2+" \\end{aligned} \\] The \\(x\\) factors divide out (for \\(x \\ne 0\\)), leaving <b>\\("+cor2+"\\)</b>.",
      {mode:mode,a:a2,b:b2});
  }
  var a3=pick(U5NZ);
  var expr3=u5frac(u5frac("1",u5lin(1,-a3)),u5frac("1",u5lin(1,a3)));
  var cor3=u5frac(u5lin(1,a3),u5lin(1,-a3));
  var cands3=[u5frac(u5lin(1,-a3),u5lin(1,a3)),"1",u5frac(u5quad(1,0,-(a3*a3)),"1")];
  return mcq("Simplify the complex fraction \\("+expr3+"\\).",
    u5wrap(cor3),u5dis(cor3,cands3,3).map(u5wrap),
    "Divide the numerator by the denominator: multiply by the reciprocal of \\("+u5frac("1",u5lin(1,a3))+"\\). \\[ \\begin{aligned} "+expr3+" &= "+u5frac("1",u5lin(1,-a3))+" \\div "+u5frac("1",u5lin(1,a3))+" \\\\ &= "+u5frac("1",u5lin(1,-a3))+" \\times "+u5frac(u5lin(1,a3),"1")+" \\\\ &= "+cor3+" \\end{aligned} \\] The simplified fraction is <b>\\("+cor3+"\\)</b>, for \\("+u5npvStr([-a3,a3])+"\\).",
    {mode:mode,a:a3});
});

/* ---------- 3.18: solve a rational equation that reduces to a linear equation (L2, numeric) ---------- */
E("u5-solve-linear",5,["3.18"],2,"gen",function(){
  var mode=pick(["constOverLin","proportion","selfRatio"]);
  if(mode==="constOverLin"){
    var a=pick(U5NZ),m=ri(2,5),j=ri(2,6),k=m*j,x=a+j;
    var expr=u5frac(k,u5lin(1,-a))+" = "+m;
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restriction: \\("+u5npvStr([a])+"\\). Multiply both sides by \\("+u5lin(1,-a)+"\\): \\[ \\begin{aligned} "+k+" &= "+m+u5par(1,-a)+" \\\\ "+u5lin(1,-a)+" &= "+j+" \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:a,m:m,j:j});
  }
  if(mode==="proportion"){
    var av=ri(2,5),dm=ri(2,4),bv=av+dm,tv=ri(2,4),cv=dm*tv,x=av*tv;
    var expr=u5frac(av,"x")+" = "+u5frac(bv,"x + "+cv);
    return numq("Solve the equation \\("+expr+"\\).",
      x,0.01,
      "Restrictions: \\(x \\ne 0\\) and \\(x \\ne "+(-cv)+"\\). Cross-multiply, which is multiplying both sides by the LCD \\(x(x + "+cv+")\\) and then cancelling: \\[ \\begin{aligned} "+av+"(x + "+cv+") &= "+bv+"x \\\\ "+av+"x + "+(av*cv)+" &= "+bv+"x \\\\ "+(av*cv)+" &= "+dm+"x \\\\ x &= "+x+" \\end{aligned} \\] The value \\(x = "+x+"\\) is permissible, so it is kept. The solution is <b>\\(x = "+x+"\\)</b>.",
      {mode:mode,a:av,b:bv,c:cv});
  }
  var c0=ri(2,5),tv2=ri(2,5),av2=(c0-1)*tv2,x2=c0*tv2;
  var expr3=u5frac("x",u5lin(1,-av2))+" = "+c0;
  return numq("Solve the equation \\("+expr3+"\\).",
    x2,0.01,
    "Restriction: \\("+u5npvStr([av2])+"\\). Multiply both sides by \\("+u5lin(1,-av2)+"\\): \\[ \\begin{aligned} x &= "+c0+u5par(1,-av2)+" \\\\ x &= "+c0+"x "+(-c0*av2)+" \\\\ "+(c0*av2)+" &= "+(c0-1)+"x \\\\ x &= "+x2+" \\end{aligned} \\] The value \\(x = "+x2+"\\) is not the restricted value, so it is kept. The solution is <b>\\(x = "+x2+"\\)</b>.",
    {mode:mode,a:av2,c0:c0});
});

/* ---------- 3.19 (+3.18): solve, with one extraneous root from the cleared equation (L2) ---------- */
E("u5-solve-extraneous",5,["3.19","3.18"],2,"gen",function(){
  var mode=pick(["oneValid","oneValid","noSolution"]);
  if(mode==="noSolution"){
    var a=ri(2,8),sg=pick([1,1,-1]),xv=sg*a;
    var expr=u5frac("1",u5lin(1,-a))+" + "+u5frac("1",u5lin(1,a))+" = "+u5frac(""+(2*a*sg),"x^2 - "+(a*a));
    var cor="No solution";
    var cands=[""+a,""+(-a),"0"];
    return mcq("Solve the equation \\("+expr+"\\).",
      cor,u5dis(cor,cands,3),
      "Restrictions: \\("+u5npvStr([-a,a])+"\\). The LCD is \\(x^2 - "+(a*a)+" = "+u5par(1,-a)+u5par(1,a)+"\\). Multiply every term by it: \\[ \\begin{aligned} "+u5par(1,a)+" + "+u5par(1,-a)+" &= "+(2*a*sg)+" \\\\ 2x &= "+(2*a*sg)+" \\\\ x &= "+xv+" \\end{aligned} \\] But \\(x = "+xv+"\\) is one of the restricted values: it makes the original denominators zero. It is an extraneous root produced by clearing the denominators, so it must be rejected, and the equation has <b>no solution</b>.",
      {mode:mode,a:a});
  }
  var av=ri(2,8),cv=av+ri(1,7),t=0;
  while(cv===2*av&&t<40){cv=av+ri(1,7);t++;}
  var r=cv-av,dv=av*av-cv*av,pres=pick(["normal","flipped"]);
  var expr2=(pres==="normal")?(u5frac("x^2",u5lin(1,-av))+" = "+u5frac(u5lin(cv,dv),u5lin(1,-av))):(u5frac(u5lin(cv,dv),u5lin(1,-av))+" = "+u5frac("x^2",u5lin(1,-av)));
  return numq("Solve the equation \\("+expr2+"\\).",
    r,0.01,
    "Restriction: \\("+u5npvStr([av])+"\\). The denominators are the same, so set the numerators equal and solve the resulting quadratic: \\[ \\begin{aligned} x^2 &= "+u5lin(cv,dv)+" \\\\ "+u5quad(1,-cv,-dv)+" &= 0 \\\\ "+u5par(1,-av)+u5par(1,-r)+" &= 0 \\\\ x &= "+av+" \\text{ or } x = "+r+" \\end{aligned} \\] The value \\(x = "+av+"\\) makes the original denominator zero, so it is extraneous and is rejected. The only solution is <b>\\(x = "+r+"\\)</b>.",
    {mode:mode,a:av,c:cv,r:r});
});

/* ---------- 3.20 (+3.19): find the first error in shown solving work (L3) ---------- */
E("u5-solve-first-error",5,["3.20","3.19"],3,"gen",function(){
  var tpl=pick(["distribute","extraneousKept","crossPair"]);
  if(tpl==="distribute"){
    var q=pick([2,3,4]),w=ri(1,3),av=q*w,j=ri(1,4),p=ri(2,9),r=p+q*j;
    var stuX=j+w,trueX=av+j;
    var eq=u5frac(p,u5lin(1,-av))+" + "+q+" = "+u5frac(r,u5lin(1,-av));
    var prompt="A student solves \\("+eq+"\\). The work is shown in four lines.<br>Line 1: \\("+eq+"\\)<br>Line 2: \\("+p+" + "+q+"x - "+av+" = "+r+"\\)<br>Line 3: \\("+q+"x = "+(r-p+av)+"\\)<br>Line 4: \\(x = "+stuX+"\\)<br>Which option describes the first error in the work?";
    var cor="Line 2: \\("+q+u5par(1,-av)+"\\) was expanded as \\("+q+"x - "+av+"\\), but the correct expansion is \\("+q+"x - "+(q*av)+"\\)";
    var cands=["Line 3: \\("+av+"\\) should have stayed negative when moved to the right side, giving \\("+q+"x = "+(r-p-av)+"\\)",
      "Line 1: the fractions should have been combined into one fraction before anything was done",
      "There is no error in any of the four lines of the student's work; the solution is correct"];
    return mcq(prompt,cor,u5dis(cor,cands,3),
      "Multiplying the equation by the LCD \\("+u5lin(1,-av)+"\\) turns the term \\("+q+"\\) into \\("+q+u5par(1,-av)+"\\), and expanding that product gives \\("+q+"x - "+(q*av)+"\\), not \\("+q+"x - "+av+"\\). That is the first error; lines 3 and 4 follow correctly from the wrong line 2. With the correct expansion, \\("+q+"x = "+(r-p+q*av)+"\\) and the true solution is \\(x = "+trueX+"\\), not \\("+stuX+"\\).",
      {tpl:tpl,line:2,stuX:stuX,trueX:trueX,p:p,q:q,a:av,r:r});
  }
  if(tpl==="extraneousKept"){
    var av2=pick([2,3,4,5]),cv2=av2+ri(1,5),t2=0;
    while(cv2===2*av2&&t2<40){cv2=av2+ri(1,5);t2++;}
    var r2=cv2-av2,dv2=av2*av2-cv2*av2;
    var eq2=u5frac("x^2",u5lin(1,-av2))+" = "+u5frac(u5lin(cv2,dv2),u5lin(1,-av2));
    var prompt2="A student solves \\("+eq2+"\\). The work is shown in four lines.<br>Line 1: \\("+eq2+"\\)<br>Line 2: \\(x^2 = "+u5lin(cv2,dv2)+"\\)<br>Line 3: \\("+u5quad(1,-cv2,-dv2)+" = 0\\), which factors as \\("+u5par(1,-av2)+u5par(1,-r2)+" = 0\\)<br>Line 4: The solutions are \\(x = "+av2+"\\) and \\(x = "+r2+"\\)<br>Which option describes the first error in the work?";
    var cor2="Line 4: \\(x = "+av2+"\\) is not a permissible value, because it makes the original denominator zero; it is extraneous and must be rejected";
    var cands2=["Line 2: the numerators of two fractions cannot be set equal to each other, even when the denominators are the same",
      "Line 3: the equation does not factor as \\("+u5par(1,-av2)+u5par(1,-r2)+" = 0\\); expanding the factors shown gives an entirely different trinomial instead",
      "There is no error in any of the four lines of the student's work; the final solution is correct as it stands"];
    return mcq(prompt2,cor2,u5dis(cor2,cands2,3),
      "Lines 2 and 3 are correct: with equal denominators the numerators can be set equal (for permissible \\(x\\)), and the trinomial does factor as shown. The error is at the end: \\(x = "+av2+"\\) makes the denominator of the original equation zero, so it is an extraneous root from clearing denominators and must be rejected. The only solution is \\(x = "+r2+"\\).",
      {tpl:tpl,line:4,stuX:av2,trueX:r2,a:av2,c:cv2,r:r2,d:dv2});
  }
  var av3=2,bv3=1,cv3=4,dv3=3,xt=0,xs=0,ok3=false,tries3=0;
  while(!ok3&&tries3<600){
    av3=ri(2,6);cv3=ri(2,6);bv3=pick(U5NZ);dv3=pick(U5NZ);tries3++;
    if(av3===cv3||bv3===dv3)continue;
    var den=av3-cv3,numT=av3*dv3-cv3*bv3,numS=av3*bv3-cv3*dv3;
    if(numT%den!==0||numS%den!==0)continue;
    xt=numT/den;xs=numS/den;
    if(xt===xs||xt===bv3||xt===dv3||xs===bv3||xs===dv3)continue;
    ok3=true;
  }
  var eq3=u5frac(av3,u5lin(1,-bv3))+" = "+u5frac(cv3,u5lin(1,-dv3));
  var prompt3="A student solves \\("+eq3+"\\). The work is shown in four lines.<br>Line 1: \\("+eq3+"\\)<br>Line 2: \\("+av3+u5par(1,-bv3)+" = "+cv3+u5par(1,-dv3)+"\\)<br>Line 3: \\("+u5lin(av3,-av3*bv3)+" = "+u5lin(cv3,-cv3*dv3)+"\\)<br>Line 4: \\(x = "+xs+"\\)<br>Which option describes the first error in the work?";
  var cor3="Line 2: each numerator was multiplied by its own denominator; \\("+av3+"\\) must multiply \\("+u5par(1,-dv3)+"\\) and \\("+cv3+"\\) must multiply \\("+u5par(1,-bv3)+"\\)";
  var cands3=["Line 3: the expansion of \\("+av3+u5par(1,-bv3)+"\\) is incorrect, so the lines that follow it are built on a wrong equation",
    "Line 4: the value of \\(x\\) was rounded to the wrong number when the final answer was stated at the end of the work, so it is wrong",
    "There is no error in any of the four lines of the student's work; the final solution is correct as it stands"];
  return mcq(prompt3,cor3,u5dis(cor3,cands3,3),
    "Cross-multiplication pairs each numerator with the <b>other</b> denominator: the cleared equation should be \\("+av3+u5par(1,-dv3)+" = "+cv3+u5par(1,-bv3)+"\\). Line 2 paired each numerator with its own denominator instead, and lines 3 and 4 follow correctly from that wrong line. The correct cleared equation gives the true solution \\(x = "+xt+"\\), not \\("+xs+"\\).",
    {tpl:tpl,line:2,stuX:xs,trueX:xt,a:av3,b:bv3,c:cv3,d:dv3});
});

/* ---------- 3.21: write and solve a rational equation for a problem (L3, numeric) ---------- */
E("u5-word-problem",5,["3.21"],3,"gen",function(){
  var ctx=pick(["work","work","boat","cost","reciprocal"]);
  if(ctx==="work"){
    var jobs=[
      {key:"paint fence",text:"Nora can paint a fence in ",text2:" hours working alone, and her cousin Dev can paint the same fence in ",unit:" hours",pairs:[[2,6],[3,6],[4,4],[6,6],[2,2],[4,12],[6,3],[8,8],[6,12],[3,3],[4,6]]},
      {key:"fill pool",text:"One hose can fill a backyard pool in ",text2:" hours, and a second hose can fill the same pool in ",unit:" hours",pairs:[[3,6],[4,12],[6,6],[2,6],[5,5],[6,12],[4,4],[8,8],[3,3]]},
      {key:"rake leaves",text:"Sam can rake a park lawn in ",text2:" hours working alone, and his sister Ana can rake the same lawn in ",unit:" hours",pairs:[[2,6],[3,6],[4,4],[6,12],[2,2],[6,6],[4,12],[3,3]]}];
    var job=pick(jobs),pr=pick(job.pairs),A=pr[0],B=pr[1],ans=A*B/(A+B);
    return numq(job.text+A+job.text2+B+". Working together, how long will they take, in"+job.unit+"?",
      ans,0.03,
      "Let \\(t\\) be the time working together. In one hour the pair completes \\(\\frac{1}{"+A+"} + \\frac{1}{"+B+"}\\) of the job, so: \\[ \\begin{aligned} \\frac{1}{"+A+"} + \\frac{1}{"+B+"} &= \\frac{1}{t} \\\\ \\frac{"+(A+B)+"}{"+(A*B)+"} &= \\frac{1}{t} \\\\ t &= \\frac{"+(A*B)+"}{"+(A+B)+"} \\\\ &\\approx "+fmt(ans,2)+" \\end{aligned} \\] Working together they take about <b>"+fmt(ans,2)+" hours</b>.",
      {ctx:"work: "+job.key,A:A,B:B});
  }
  if(ctx==="boat"){
    var boats=[
      {key:"tour boat",text:"A tour boat travels ",text2:" km downstream in ",text3:" hours and returns the same distance upstream in ",unit:" hours"},
      {key:"ferry",text:"A small ferry covers ",text2:" km downstream in ",text3:" hours and returns the same distance upstream in ",unit:" hours"}];
    var bt=pick(boats),sp=pick([[12,8],[15,9],[14,10],[16,12],[18,12],[20,16],[10,6]]),u=sp[0],v=sp[1];
    var lcm=u*v/u5gcd(u,v),mm=pick([1,1,2]),D=lcm*mm;
    var t1=D/u,t2=D/v,ans2=(u-v)/2;
    return numq(bt.text+D+bt.text2+t1+bt.text3+t2+bt.unit+". What is the speed of the current, in kilometres per hour?",
      ans2,0.01,
      "The downstream speed is \\("+D+" \\div "+t1+" = "+u+"\\) km/h and the upstream speed is \\("+D+" \\div "+t2+" = "+v+"\\) km/h. If \\(b\\) is the boat's speed in still water and \\(c\\) is the current: \\[ \\begin{aligned} b + c &= "+u+" \\\\ b - c &= "+v+" \\\\ 2c &= "+(u-v)+" \\\\ c &= "+ans2+" \\end{aligned} \\] The speed of the current is <b>"+ans2+" km/h</b>.",
      {ctx:"boat: "+bt.key,D:D,t1:t1,t2:t2});
  }
  if(ctx==="cost"){
    var gv=pick([4,5,6,7,8,9,10]),kk=pick([1,2,3,4]),wv=pick([5,10,15,20,25,30]),tg=0;
    while((wv*gv*(gv+kk))%kk!==0&&tg<40){kk=pick([1,2,3,4]);tg++;}
    var T=wv*gv*(gv+kk)/kk;
    return numq("A group of friends rents a cottage for a total of $"+T+". If "+kk+" more friend"+(kk===1?"":"s")+" join"+(kk===1?"s":"")+" the group, the cost per person drops by $"+wv+". How many friends were in the original group?",
      gv,0.01,
      "Let \\(x\\) be the original number of friends. The original share is \\(\\frac{"+T+"}{x}\\) and the new share is \\(\\frac{"+T+"}{x + "+kk+"}\\), and the drop is $"+wv+": \\[ \\begin{aligned} \\frac{"+T+"}{x} - \\frac{"+T+"}{x + "+kk+"} &= "+wv+" \\\\ "+T+"(x + "+kk+") - "+T+"x &= "+wv+"x(x + "+kk+") \\\\ x^2 + "+kk+"x - "+(gv*(gv+kk))+" &= 0 \\\\ (x - "+gv+")(x + "+(gv+kk)+") &= 0 \\\\ x &= "+gv+" \\text{ or } x = "+(-(gv+kk))+" \\end{aligned} \\] A group size cannot be negative, so the inadmissible root is rejected. The original group had <b>"+gv+" friends</b>.",
      {ctx:"cost: cottage",g:gv,k:kk,T:T,w:wv});
  }
  var nv=pick([2,3,4,5,6]);
  return numq("The sum of a number and its reciprocal is \\("+u5fr(nv*nv+1,nv)+"\\). The number is greater than \\(1\\). Find the number.",
    nv,0.01,
    "Let the number be \\(x\\). Translating the statement into an equation: \\[ \\begin{aligned} x + \\frac{1}{x} &= "+u5fr(nv*nv+1,nv)+" \\\\ "+nv+"x^2 - "+(nv*nv+1)+"x + "+nv+" &= 0 \\\\ (x - "+nv+")("+nv+"x - 1) &= 0 \\\\ x &= "+nv+" \\text{ or } x = "+u5fr(1,nv)+" \\end{aligned} \\] Only \\(x = "+nv+"\\) is greater than \\(1\\) (the other value is its reciprocal). The number is <b>"+nv+"</b>.",
    {ctx:"reciprocal",n:nv});
});

/* ---------- 3.21: two travellers toward each other, or apart from one point (L3, numeric) ---------- */
E("u5-meeting-problem",5,["3.21"],3,"gen",function(){
  var ctxs=[
    {key:"cars",noun:"car",
     toward:"Two cars start at the same time from two towns that are D km apart and drive toward each other on the same road. One car travels at V1 km/h and the other at V2 km/h.",
     apart:"Two cars leave the same town at the same time and drive in opposite directions along a straight highway. One car travels at V1 km/h and the other at V2 km/h.",
     tuples:[[80,70,300],[90,60,300],[70,50,300],[80,40,300],[100,80,270],[60,40,250],[85,65,300],[95,55,300],[65,55,240],[75,45,240]]},
    {key:"cyclists",noun:"cyclist",
     toward:"Two cyclists start at the same time from opposite ends of a trail D km long and ride toward each other. One cyclist rides at V1 km/h and the other at V2 km/h.",
     apart:"Two cyclists leave the same trailhead at the same time and ride in opposite directions. One cyclist rides at V1 km/h and the other at V2 km/h.",
     tuples:[[16,14,45],[18,12,45],[20,16,54],[15,10,50],[22,18,60],[24,16,100],[14,10,36],[25,15,80],[16,12,42],[20,12,48]]},
    {key:"walkers",noun:"hiker",
     toward:"Two hikers start at the same time from trailheads at opposite ends of a trail D km long and walk toward each other. One hiker walks at V1 km/h and the other at V2 km/h.",
     apart:"Two hikers leave the same trailhead at the same time, one taking a north path and the other a south path. One hiker walks at V1 km/h and the other at V2 km/h.",
     tuples:[[5,4,18],[6,4,25],[6,3,18],[4,4,12],[6,5,22],[4,3,14],[7,5,24],[7,4,22],[8,4,24],[5,3,16]]}];
  var cx=pick(ctxs),dir=pick(["toward","toward","apart"]),ask=pick(["time","dist"]);
  var tp=pick(cx.tuples),v1=tp[0],v2=tp[1],D=tp[2];
  var t=D/(v1+v2),ans=(ask==="time")?t:v1*t;
  function fill(s){return s.replace(/V1/g,""+v1).replace(/V2/g,""+v2).replace(/\bD\b/g,""+D);}
  var stem=fill(dir==="toward"?cx.toward:cx.apart);
  var tStr=""+t,hm=(t%1===0.5)?(" ("+Math.floor(t)+" h 30 min)"):"";
  var meta={ctx:"meeting: "+cx.key,dir:dir,ask:ask,v1:v1,v2:v2,D:D,t:t,ans:ans};
  if(dir==="toward"&&ask==="time"){
    return numq(stem+" How long, in hours, until they meet?",
      ans,0.01,
      "Let \\(t\\) be the number of hours until they meet. In \\(t\\) hours the first "+cx.noun+" travels \\("+v1+"t\\) km and the second travels \\("+v2+"t\\) km, and together they cover the "+D+" km between their starting points, so the two distances add to "+D+": \\[ \\begin{aligned} "+v1+"t + "+v2+"t &= "+D+" \\\\ "+(v1+v2)+"t &= "+D+" \\\\ t &= "+tStr+" \\end{aligned} \\] They meet after <b>"+tStr+" hours</b>"+hm+".",
      meta);
  }
  if(dir==="apart"&&ask==="time"){
    return numq(stem+" How long, in hours, until they are "+D+" km apart?",
      ans,0.01,
      "Let \\(t\\) be the number of hours. In \\(t\\) hours the first "+cx.noun+" travels \\("+v1+"t\\) km and the second travels \\("+v2+"t\\) km in the opposite direction, so the distance between them is the sum of the two distances: \\[ \\begin{aligned} "+v1+"t + "+v2+"t &= "+D+" \\\\ "+(v1+v2)+"t &= "+D+" \\\\ t &= "+tStr+" \\end{aligned} \\] They are "+D+" km apart after <b>"+tStr+" hours</b>"+hm+".",
      meta);
  }
  if(dir==="toward"&&ask==="dist"){
    return numq(stem+" How far, in kilometres, has the first "+cx.noun+" travelled when they meet?",
      ans,0.01,
      "Let \\(x\\) be the distance, in kilometres, that the first "+cx.noun+" has travelled when they meet. The second "+cx.noun+" has then travelled \\("+D+" - x\\) km. They have been travelling for the same length of time, and time is distance divided by speed, so their two times are equal: \\[ \\begin{aligned} \\frac{x}{"+v1+"} &= \\frac{"+D+" - x}{"+v2+"} \\\\ "+v2+"x &= "+v1+"("+D+" - x) \\\\ "+v2+"x &= "+(v1*D)+" - "+v1+"x \\\\ "+(v1+v2)+"x &= "+(v1*D)+" \\\\ x &= "+ans+" \\end{aligned} \\] The first "+cx.noun+" has travelled <b>"+ans+" km</b> when they meet.",
      meta);
  }
  return numq(stem+" When they are "+D+" km apart, how far, in kilometres, has the first "+cx.noun+" travelled?",
    ans,0.01,
    "Moving in opposite directions, the two separate at a combined speed of \\("+v1+" + "+v2+" = "+(v1+v2)+"\\) km/h, so they are "+D+" km apart after \\(t = \\frac{"+D+"}{"+(v1+v2)+"} = "+tStr+"\\) hours. In that time the first "+cx.noun+" travels \\("+v1+" \\times "+tStr+" = "+ans+"\\) km. The first "+cx.noun+" has travelled <b>"+ans+" km</b>.",
    meta);
});

/* ============ Prior knowledge tranche (Nov 15, 2026) ============ */
/* Borrowed verbatim from the feeder banks named in the source
   comments and the PKT table below, plus authored micro-items
   where the prior knowledge map names a skill no feeder entry
   assesses. Spec: Math-2200-PK-Tranche-Spec-2026-11-15.md. */

/* u5-pk-frac-context: borrowed verbatim from math-9 entry u1-frac-context (math-9:6.1). */
E("u5-pk-frac-context",5,["3.8"], 1, "gen", function () {
  var dens = [2, 4, 5, 8, 10, 20];
  var d1 = pick(dens), d2 = pick(dens);
  var n1 = ri(1, 15), n2 = ri(1, 15);
  var v1 = n1 / d1, v2 = n2 / d2;
  var sub = Math.random() < 0.5;
  if (sub && v2 > v1) { var tn = n1; n1 = n2; n2 = tn; var td = d1; d1 = d2; d2 = td; v1 = n1 / d1; v2 = n2 / d2; }
  if (sub && Math.abs(v1 - v2) < 0.01) { n1 += d1; v1 = n1 / d1; }
  var ctxs = ["cups of flour", "metres of ribbon", "litres of juice"];
  var thing = pick(ctxs);
  var ans = n1round(sub ? v1 - v2 : v1 + v2, 4);
  var lcm = (d1 * d2) / n1gcd(d1, d2);
  var e1 = n1 * (lcm / d1), e2 = n2 * (lcm / d2);
  var resN = sub ? e1 - e2 : e1 + e2;
  var prompt = sub
    ? "A project starts with " + n1frac(n1, d1) + " " + thing + ". Then " + n1frac(n2, d2) + " " + thing + " is used. How much is left? Give your answer as a decimal."
    : "A project uses " + n1frac(n1, d1) + " " + thing + " in the morning and " + n1frac(n2, d2) + " " + thing + " in the afternoon. How much is used in total? Give your answer as a decimal.";
  var solution = "Use the common denominator \\(" + lcm + "\\): \\[ \\begin{aligned} " + FR(n1, d1) + (sub ? " - " : " + ") + FR(n2, d2) + " &= " + FR(e1, lcm) + (sub ? " - " : " + ") + FR(e2, lcm) + " \\\\ &= " + FR(resN, lcm) + " = " + fmt(ans) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans) + "</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: sub ? "sub-frac-ctx" : "add-frac-ctx", a: n1, b: d1, c: n2, d: d2 });
}, ["Fractions with different denominators need a common denominator first.", "Rewrite both fractions with the least common denominator, then combine the numerators."]);

/* u5-pk-frac-div-add: borrowed verbatim from math-9 entry u1-gap-div-add-cr (math-9:6.1). */
E("u5-pk-frac-div-add",5,["3.8"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]);
  var r = pick([2, 3]);
  var p = r * ri(2, 5);
  var f = pick([4, 8]);
  var e = ri(1, f - 1);
  var quot = p / r;
  var ans = Math.round((quot + e / f) * 1000) / 1000;
  var prompt = "Evaluate \\(" + FR(p, q) + " \\div " + FR(r, q) + " + " + FR(e, f) + "\\). Give your answer as a decimal.";
  var sol = "Divide first by multiplying by the reciprocal, then add: \\[ \\begin{aligned} " + FR(p, q) + " \\div " + FR(r, q) + " &= " + FR(p, q) + " \\times " + FR(q, r) + " = " + fmt(quot) + " \\\\ " + fmt(quot) + " + " + FR(e, f) + " &= " + fmt(quot) + " + " + fmt(e / f, 3) + " = " + fmt(ans, 3) + " \\end{aligned} \\] The answer is <b>" + fmt(ans, 3) + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-div-add", p: p, q: q, r: r, e: e, f: f });
}, ["Division is the first job: flip the divisor and multiply, then do the addition.", "Rewrite the division as a multiplication by the reciprocal of the second fraction."]);

/* u5-pk-multistep-rational: borrowed verbatim from math-9 entry u1-multistep-rational (math-9:6.1). */
E("u5-pk-multistep-rational",5,["3.8"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-160, 80) / 4, r1 = ri(2, 20) / 4, f1 = ri(2, 16) / 4, r2 = ri(2, 12) / 4;
    var ans = n1round(start + r1 - f1 + r2, 4);
    var promptT = "At 6 a.m. the temperature in St. John's is " + fmt(start) + " degrees. By noon it rises by " + fmt(r1) + " degrees, by 6 p.m. it falls by " + fmt(f1) + " degrees, and by midnight it rises by " + fmt(r2) + " degrees. Determine the temperature at midnight, in degrees.";
    var solT = "Apply each change in order: \\[ \\begin{aligned} " + fmt(start) + " + " + fmt(r1) + " - " + fmt(f1) + " + " + fmt(r2) + " &= " + fmt(n1round(start + r1, 4)) + " - " + fmt(f1) + " + " + fmt(r2) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the temperature at midnight is <b>" + fmt(ans) + " degrees</b>.";
    return numq(promptT, ans, 0.01, solT, { mode: "temp-change", start: start });
  }
  if (mode === 1) {
    var startC = ri(2000, 20000), depC = ri(500, 8000), w1C = ri(400, 6000), w2C = ri(300, 5000);
    var ansB = n1round((startC + depC - w1C - w2C) / 100, 2);
    var promptB = "A bank account starts with $" + (startC / 100).toFixed(2) + ". A deposit of $" + (depC / 100).toFixed(2) + " is made, then withdrawals of $" + (w1C / 100).toFixed(2) + " and $" + (w2C / 100).toFixed(2) + " are made. Determine the final balance, in dollars.";
    var solB = "Add the deposit and subtract both withdrawals: \\[ \\begin{aligned} " + (startC / 100).toFixed(2) + " + " + (depC / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " &= " + ((startC + depC) / 100).toFixed(2) + " - " + (w1C / 100).toFixed(2) + " - " + (w2C / 100).toFixed(2) + " \\\\ &= " + ansB.toFixed(2) + " \\end{aligned} \\] So the final balance is <b>$" + ansB.toFixed(2) + "</b>.";
    return numq(promptB, ansB, 0.01, solB, { mode: "bank-balance", start: startC });
  }
  var dens = [2, 4, 5, 8, 10];
  var dA = pick(dens), dB = pick(dens), dC = pick(dens);
  var nA = ri(3, 30), nB = ri(3, 30), nC = ri(3, 30);
  var ansD = n1round(nA / dA + nB / dB + nC / dC, 4);
  var promptD = "On a three day hike, a group walks " + n1frac(nA, dA) + " km on day 1, " + n1frac(nB, dB) + " km on day 2, and " + n1frac(nC, dC) + " km on day 3. Determine the total distance walked, in kilometres, as a decimal.";
  var solD = "Add the three distances as decimals: \\[ \\begin{aligned} " + FR(nA, dA) + " + " + FR(nB, dB) + " + " + FR(nC, dC) + " &= " + fmt(n1round(nA / dA, 4)) + " + " + fmt(n1round(nB / dB, 4)) + " + " + fmt(n1round(nC / dC, 4)) + " \\\\ &= " + fmt(ansD) + " \\end{aligned} \\] So the total distance is <b>" + fmt(ansD) + " km</b>.";
  return numq(promptD, ansD, 0.01, solD, { mode: "distance-3day", a: nA, b: nB, c: nC });
}, ["Break the problem into one change or part at a time, in order.", "Start from the opening value and apply each step before moving to the next."]);

/* u5-pk-equiv-fractions: authored micro-item (authored:equivalent-fractions),
   written for this tranche. */
E("u5-pk-equiv-fractions",5,["3.3"],1,"gen",function(){
  var fr=function(p,q){return "\\(\\frac{"+p+"}{"+q+"}\\)";};
  var gcd=function(x,y){while(y){var t=x%y;x=y;y=t;}return x;};
  if(ri(0,1)===0){
    var p=ri(1,9),q=p+ri(1,9),k=ri(2,6);
    return mcq("Which fraction is equivalent to "+fr(p,q)+"?",
      fr(p*k,q*k),
      [fr(p+k,q+k),fr(p*k,q),fr(p,q*k)],
      "Equivalent fractions come from multiplying the numerator and the denominator by the same number: \\(\\frac{"+p+"}{"+q+"} = \\frac{"+p+" \\times "+k+"}{"+q+" \\times "+k+"} = \\frac{"+(p*k)+"}{"+(q*k)+"}\\). Changing only one of the two numbers, or adding instead of multiplying, gives a different value. The answer is <b>"+fr(p*k,q*k)+"</b>.",
      {mode:"build",p:p,q:q,k:k});
  }
  var g=pick([2,3,4,5,6]),p2=2,q2=3,tries=0;
  do { p2=ri(2,9); q2=p2+ri(1,8); tries++; } while(gcd(p2,q2)!==1&&tries<60);
  var P=p2*g,Q=q2*g;
  return mcq("Write "+fr(P,Q)+" in lowest terms.",
    fr(p2,q2),
    [fr(p2,Q),fr(P,q2),fr(P-g,Q-g)],
    "The numerator and the denominator share the factor "+g+", so divide both by "+g+": \\(\\frac{"+P+"}{"+Q+"} = \\frac{"+P+" \\div "+g+"}{"+Q+" \\div "+g+"} = \\frac{"+p2+"}{"+q2+"}\\). Dividing only one of the two numbers, or subtracting instead of dividing, changes the value. The answer is <b>"+fr(p2,q2)+"</b>.",
    {mode:"reduce",P:P,Q:Q,g:g});
}, ["The numerator and the denominator must change in the same way.", "Look for a factor the numerator and the denominator share."]);

/* u5-pk-gcf: borrowed verbatim from math-1201 entry u3-gcf (math-1201:3.10). */
E("u5-pk-gcf",5,["3.5"], 2, "gen", function () {
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

/* u5-pk-factor-product: borrowed verbatim from math-1201 entry u3-factor-product (math-1201:3.9). */
E("u5-pk-factor-product",5,["3.5"], 2, "gen", function () {
  var mode = pick(["bb", "mt"]);
  if (mode === "bb") {
    var a = ri(2, 4), b = u3Nz(-6, 6), c = u3Nz(-6, 6), prod, tries = 0;
    do { tries++; b = u3Nz(-6, 6); c = u3Nz(-6, 6); prod = u3Conv([a, b], [1, c]); }
    while (u3GCD3(prod[0], Math.abs(prod[1]), Math.abs(prod[2])) !== 1 && tries < 80);
    var facs = [[a, b], [1, c]];
    var keyRaw = u3FacRaw("", facs, "x");
    var poly = u3PC(prod, "x");
    var sol = "Find the two binomials whose product gives the polynomial, then verify by multiplying the factors back out." +
      u3Alg([poly + " &= " + keyRaw,
             keyRaw + " &= " + u3StrSeq(u3Mul(u3TermsOf(facs[0], "x"), u3TermsOf(facs[1], "x"))),
             "&= " + poly]) +
      "As a product of its factors, the polynomial is **" + u3M(keyRaw) + "**.";
    return mcq("Express the polynomial \\(" + poly + "\\) as a product of its factors.",
      u3M(keyRaw), u3FacDistr("", facs, "x", prod, 3), sol,
      { t: "fac", g: "", parts: facs, v: "x" });
  }
  var gn = ri(2, 5), gp = ri(1, 2);
  var A = ri(1, 3), B = u3Nz(-5, 5), C = u3Nz(-6, 6), t2 = 0;
  while (u3GCD3(A, Math.abs(B), Math.abs(C)) !== 1 && t2 < 60) { t2++; A = ri(1, 3); B = u3Nz(-5, 5); C = u3Nz(-6, 6); }
  var quo = [A, B, C];
  var polyTerms = [[gn * A, gp + 2, 0], [gn * B, gp + 1, 0], [gn * C, gp, 0]];
  var polyRaw = u3Str(polyTerms);
  var gRaw = u3Str([[gn, gp, 0]]);
  var keyRaw2 = gRaw + u3Par(quo, "x");
  var prodTerms = u3Mul([[gn, gp, 0]], u3TermsOf(quo, "x"));
  var cands = [], seen = {};
  function addC(s) { if (s !== keyRaw2 && !seen[s]) { seen[s] = 1; cands.push(u3M(s)); } }
  addC(gRaw + u3Par([A, B + (B > 0 ? 1 : -1), C], "x"));
  addC(gRaw + u3Par([A, B, -C], "x"));
  addC(u3Str([[gn, gp + 1, 0]]) + u3Par(quo, "x"));
  addC(gRaw + u3Par([A + 1, B, C], "x"));
  var sol2 = "The terms share the factor \\(" + gRaw + "\\). Removing it leaves \\(" + u3PC(quo, "x") + "\\). Verify by multiplying the factors back out." +
    u3Alg([keyRaw2 + " &= " + u3StrSeq(prodTerms), "&= " + polyRaw]) +
    "As a product of its factors, the polynomial is **" + u3M(keyRaw2) + "**.";
  return mcq("Express the polynomial \\(" + polyRaw + "\\) as a product of its factors.",
    u3M(keyRaw2), shuffle(cands).slice(0, 3), sol2,
    { t: "fac", g: gRaw, parts: [quo], v: "x" });
});

/* u5-pk-npv-numerical: authored micro-item (authored:undefined-numerical-fraction),
   written for this tranche. */
E("u5-pk-npv-numerical",5,["3.1"],1,"gen",function(){
  var fr=function(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";};
  var a=ri(2,9),b=ri(2,9);
  var undef=pick([
    fr(a,b+" - "+b),
    fr(a,(2*b)+" - "+b+" \\times 2"),
    fr(a,b+" \\times 3 - "+(3*b)),
    fr(a,(b+4)+" - "+(b+4))
  ]);
  var defs=[fr(a+1,b+" - 1"),fr(b,a+" + 2"),fr(a+b,"2 \\times "+b)];
  return mcq("Which of these fractions is <b>undefined</b>?",
    undef,defs,
    "A fraction is undefined when its denominator works out to 0, because division by 0 is undefined. In "+undef+" the denominator is 0. Each of the other denominators works out to a nonzero number, so those fractions are defined. The answer is <b>"+undef+"</b>.",
    {mode:"which-undefined",a:a,b:b});
}, ["Work out each denominator first.", "A fraction with denominator 0 has no value."]);

/* u5-pk-solve-two-step: borrowed verbatim from math-9 entry u5-solve-two-step (math-9:8.18). */
E("u5-pk-solve-two-step",5,["3.19"], 2, "gen", function () {
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

/* PK tranche pass for Unit 5. pkFor is the cluster's dependent
   indicator list from the prior knowledge map, as registered
   for this unit in courses.js. */
var PKT_U5_FOR=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9","3.10","3.11","3.12","3.13","3.18","3.19","3.20","3.21"];
var PKT_U5={
 "u5-pk-frac-context":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-frac-div-add":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-multistep-rational":{src:"math-9:6.1",group:"fraction-operations"},
 "u5-pk-equiv-fractions":{src:"authored:equivalent-fractions",group:"equivalent-fractions"},
 "u5-pk-gcf":{src:"math-1201:3.10",group:"common-factor"},
 "u5-pk-factor-product":{src:"math-1201:3.9",group:"factoring"},
 "u5-pk-npv-numerical":{src:"authored:undefined-numerical-fraction",group:"undefined-values"},
 "u5-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"}
};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});
