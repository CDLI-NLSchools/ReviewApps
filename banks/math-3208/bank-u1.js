// Math 3208 Unit 1 Pre-Calculus question bank
// CRMARKS: u1-write-operation=2
// CRMARKS: u1-evaluate-operation=1
// CRMARKS: u1-compose-value=2
// CRMARKS: u1-quotient-restrictions=2
// CRMARKS: u1-range-product=2
// CRMARKS: u1-compose-equation=2
// CRMARKS: u1-decompose=2
// CRMARKS: u1-graph-operation=2
// CRMARKS: u1-compound-inequality=2
/* ================= Unit 1: Pre-Calculus ================= */
/* Indicators: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7. Types follow the Mauger
   Chapter 1 material (operations on functions, compositions in both
   directions, domains of quotients and composites, graph-based values),
   reviewed only to gauge the expected depth and range of treatment;
   the entries were written new with original functions and values. Fractions are written
   directly as \frac inside the delimiters. */

function u1poly(terms){var out="";for(var i=0;i<terms.length;i++){var c=terms[i][0],v=terms[i][1];if(c===0)continue;var mag=(v!==""&&Math.abs(c)===1)?v:""+Math.abs(c)+v;if(out==="")out=(c<0?"-":"")+mag;else out+=(c<0?" - ":" + ")+mag;}return out===""?"0":out;}
function u1lin(a,b){return u1poly([[a,"x"],[b,""]]);}
function u1quad(a,b,c){return u1poly([[a,"x^2"],[b,"x"],[c,""]]);}
function u1nz(a,b){var v=0;do{v=ri(a,b);}while(v===0);return v;}
function u1sgnT(n){return n>0?" + "+n:(n<0?" - "+(-n):"");}
function u1par(n){return n<0?"("+n+")":""+n;}
function u1frac(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";}
function u1mult(a,p){return a===1?"("+p+")":(a===-1?"-("+p+")":""+a+"("+p+")");}

E("u1-write-operation",1,["1.1"],1,"gen",function(){
  var a1=0,a2=0,b1=0,b2=0,op=1,f="",g="",correct="",ds=[],res="",tries=0;
  do{
    a1=u1nz(-5,5);a2=u1nz(-5,5);b1=ri(-8,8);b2=u1nz(-7,7);op=ri(1,4);
    f=u1lin(a1,b1);g=u1lin(a2,b2);
    if(op===1){res=u1lin(a1+a2,b1+b2);correct="\\("+res+"\\)";ds=["\\("+u1lin(a1+a2,b1-b2)+"\\)","\\("+u1lin(a1-a2,b1+b2)+"\\)","\\("+u1lin(a1*a2,b1+b2)+"\\)"];}
    else if(op===2){res=u1lin(a1-a2,b1-b2);correct="\\("+res+"\\)";ds=["\\("+u1lin(a1-a2,b1+b2)+"\\)","\\("+u1lin(a2-a1,b2-b1)+"\\)","\\("+u1lin(a1+a2,b1-b2)+"\\)"];}
    else if(op===3){var A=a1*a2,M=a1*b2+a2*b1,C=b1*b2;res=u1quad(A,M,C);correct="\\("+res+"\\)";ds=["\\("+u1quad(A,a1*b2,C)+"\\)","\\("+u1quad(A,M,b1+b2)+"\\)","\\("+u1quad(a1+a2,M,C)+"\\)"];}
    else{correct=u1frac(f,g);ds=[u1frac(g,f),u1frac(f,u1lin(a2,-b2)),u1frac(u1lin(a1,-b1),g)];}
    tries++;
  }while((new Set([correct].concat(ds)).size<4||(op===4&&a2===-a1&&b2===-b1))&&tries<100);
  var opName=["","(f + g)(x)","(f - g)(x)","(fg)(x)","(f/g)(x)"][op],sol;
  if(op===1)sol="Add the two functions term by term: \\[ \\begin{aligned} (f + g)(x) &= ("+f+") + ("+g+") \\\\ &= "+res+" \\end{aligned} \\] So \\((f + g)(x) = \\) <b>"+correct+"</b>.";
  else if(op===2)sol="Subtract the second function, changing the sign of each of its terms: \\[ \\begin{aligned} (f - g)(x) &= ("+f+") - ("+g+") \\\\ &= "+res+" \\end{aligned} \\] So \\((f - g)(x) = \\) <b>"+correct+"</b>.";
  else if(op===3)sol="Multiply term by term, each term of the first function times each term of the second: \\[ \\begin{aligned} (fg)(x) &= ("+f+")("+g+") \\\\ &= "+res+" \\end{aligned} \\] So \\((fg)(x) = \\) <b>"+correct+"</b>.";
  else sol="By definition, the quotient function divides the first function by the second: \\((f/g)(x) = \\) <b>"+correct+"</b>, wherever \\(g(x) \\ne 0\\).";
  return mcq("Let \\(f(x) = "+f+"\\) and \\(g(x) = "+g+"\\). Write \\("+opName+"\\) as a single simplified expression.",correct,ds,sol,{a1:a1,b1:b1,a2:a2,b2:b2,op:op});
});
E("u1-evaluate-operation",1,["1.1"],1,"gen",function(){
  var shape=ri(1,3),p=ri(-4,4);
  if(shape===3){
    var a1=0,a2=0,b1=0,b2=0,fv=0,gv=0,tries=0;
    do{a1=u1nz(-5,5);a2=u1nz(-5,5);b1=ri(-8,8);b2=ri(-8,8);p=ri(-4,4);fv=a1*p+b1;gv=a2*p+b2;tries++;}
    while((gv===0||(fv*100)%gv!==0)&&tries<200);
    if(gv===0||(fv*100)%gv!==0){a1=2;a2=1;b1=1;b2=3;p=2;fv=5;gv=5;}
    var ans=fv/gv;
    return numq("Let \\(f(x) = "+u1lin(a1,b1)+"\\) and \\(g(x) = "+u1lin(a2,b2)+"\\). Evaluate \\((f/g)("+p+")\\).",ans,0.011,
      "Evaluate each function at \\(x = "+p+"\\), then divide: \\[ \\begin{aligned} f("+p+") &= "+u1mult(a1,p)+u1sgnT(b1)+" = "+fv+" \\\\ g("+p+") &= "+u1mult(a2,p)+u1sgnT(b2)+" = "+gv+" \\\\ (f/g)("+p+") &= \\frac{"+fv+"}{"+gv+"} = "+fmt(ans)+" \\end{aligned} \\] So \\((f/g)("+p+") = \\) <b>"+fmt(ans)+"</b>.",
      {a1:a1,b1:b1,a2:a2,b2:b2,p:p,shape:shape});
  }
  var op=pick(["+","-","*"]),opName=op==="+"?"(f + g)":(op==="-"?"(f - g)":"(fg)"),fv2,gv2,ans2,fStr,gStr,fLine,comb;
  var c1=u1nz(-5,5),d1=ri(-8,8),c2=u1nz(-5,5),d2=ri(-8,8);
  gStr=u1lin(c2,d2);gv2=c2*p+d2;
  if(shape===1){fStr=u1lin(c1,d1);fv2=c1*p+d1;fLine="f("+p+") &= "+u1mult(c1,p)+u1sgnT(d1)+" = "+fv2;}
  else{var qb=ri(-6,6),qc=ri(-8,8);fStr=u1quad(1,qb,qc);fv2=p*p+qb*p+qc;fLine="f("+p+") &= ("+p+")^2"+u1sgnT(qb*p)+u1sgnT(qc)+" = "+fv2;}
  if(op==="+"){ans2=fv2+gv2;comb=fv2+" + "+u1par(gv2);}
  else if(op==="-"){ans2=fv2-gv2;comb=fv2+" - "+u1par(gv2);}
  else{ans2=fv2*gv2;comb=fv2+" \\cdot "+u1par(gv2);}
  return numq("Let \\(f(x) = "+fStr+"\\) and \\(g(x) = "+gStr+"\\). Evaluate \\("+opName+"("+p+")\\).",ans2,0.011,
    "Evaluate each function at \\(x = "+p+"\\), then combine the two values: \\[ \\begin{aligned} "+fLine+" \\\\ g("+p+") &= "+u1mult(c2,p)+u1sgnT(d2)+" = "+gv2+" \\\\ "+opName+"("+p+") &= "+comb+" = "+ans2+" \\end{aligned} \\] So \\("+opName+"("+p+") = \\) <b>"+ans2+"</b>.",
    {shape:shape,p:p,op:op,c1:c1,d1:d1,c2:c2,d2:d2,qb:(shape===2?qb:0),qc:(shape===2?qc:0)});
});
E("u1-compose-value",1,["1.4"],2,"gen",function(){
  var shape=ri(1,4);
  if(shape===1){
    var a1=u1nz(-4,4),b1=ri(-6,6),a2=u1nz(-4,4),b2=ri(-6,6),a=ri(-4,4),dir=ri(1,3);
    var F=function(x){return a1*x+b1;},G=function(x){return a2*x+b2;};
    var inF="f("+a+") &= "+u1mult(a1,a)+u1sgnT(b1)+" = "+F(a),inG="g("+a+") &= "+u1mult(a2,a)+u1sgnT(b2)+" = "+G(a),comp,inner,ans,line1,line2;
    if(dir===1){comp="(f \\circ g)";inner=G(a);ans=F(inner);line1=inG;line2="f("+inner+") &= "+u1mult(a1,inner)+u1sgnT(b1)+" = "+ans;}
    else if(dir===2){comp="(g \\circ f)";inner=F(a);ans=G(inner);line1=inF;line2="g("+inner+") &= "+u1mult(a2,inner)+u1sgnT(b2)+" = "+ans;}
    else{comp="(f \\circ f)";inner=F(a);ans=F(inner);line1=inF;line2="f("+inner+") &= "+u1mult(a1,inner)+u1sgnT(b1)+" = "+ans;}
    return numq("Let \\(f(x) = "+u1lin(a1,b1)+"\\) and \\(g(x) = "+u1lin(a2,b2)+"\\). Evaluate \\("+comp+"("+a+")\\).",ans,0.011,
      "Work from the inside out: \\[ \\begin{aligned} "+line1+" \\\\ "+line2+" \\end{aligned} \\] So \\("+comp+"("+a+") = \\) <b>"+ans+"</b>.",
      {a1:a1,b1:b1,a2:a2,b2:b2,a:a,dir:dir,shape:shape});
  }
  if(shape===2){
    var c=ri(-6,6),a3=u1nz(-4,4),b3=ri(-6,6),a4=0,gv3=0,tries=0,dir2=pick([1,2]);
    do{a4=ri(-3,3);gv3=a3*a4+b3;tries++;}while(Math.abs(gv3)>7&&tries<100);
    var fa=a4*a4+c,ans3,lineA,lineB,comp3;
    if(dir2===1){comp3="(f \\circ g)";ans3=gv3*gv3+c;lineA="g("+a4+") &= "+u1mult(a3,a4)+u1sgnT(b3)+" = "+gv3;lineB="f("+gv3+") &= ("+gv3+")^2"+u1sgnT(c)+" = "+ans3;}
    else{comp3="(g \\circ f)";ans3=a3*fa+b3;lineA="f("+a4+") &= ("+a4+")^2"+u1sgnT(c)+" = "+fa;lineB="g("+fa+") &= "+u1mult(a3,fa)+u1sgnT(b3)+" = "+ans3;}
    return numq("Let \\(f(x) = "+u1quad(1,0,c)+"\\) and \\(g(x) = "+u1lin(a3,b3)+"\\). Evaluate \\("+comp3+"("+a4+")\\).",ans3,0.011,
      "Work from the inside out: \\[ \\begin{aligned} "+lineA+" \\\\ "+lineB+" \\end{aligned} \\] So \\("+comp3+"("+a4+") = \\) <b>"+ans3+"</b>.",
      {c:c,a3:a3,b3:b3,a4:a4,dir:dir2,shape:shape});
  }
  if(shape===3){
    var k=ri(0,6),sub=pick([1,2]);
    if(sub===1){
      var t=ri(1,6),m=pick([-2,-1,1,2]),a5=ri(-4,4),b5=t*t-k-m*a5,inner5=m*a5+b5;
      return numq("Let \\(f(x) = \\sqrt{"+u1lin(1,k)+"}\\) and \\(g(x) = "+u1lin(m,b5)+"\\). Evaluate \\((f \\circ g)("+a5+")\\).",t,0.011,
        "Work from the inside out: \\[ \\begin{aligned} g("+a5+") &= "+u1mult(m,a5)+u1sgnT(b5)+" = "+inner5+" \\\\ f("+inner5+") &= \\sqrt{"+inner5+u1sgnT(k)+"} = \\sqrt{"+(t*t)+"} = "+t+" \\end{aligned} \\] So \\((f \\circ g)("+a5+") = \\) <b>"+t+"</b>.",
        {k:k,t:t,m:m,a5:a5,b5:b5,shape:shape,sub:sub});
    }
    var t2=ri(2,5),k2=ri(0,9),a6=t2*t2-k2;
    if(a6<-4||a6>16){t2=3;k2=1;a6=8;}
    var m2=u1nz(-3,3),b6=ri(-6,6),ans6=m2*t2+b6;
    return numq("Let \\(f(x) = \\sqrt{"+u1lin(1,k2)+"}\\) and \\(g(x) = "+u1lin(m2,b6)+"\\). Evaluate \\((g \\circ f)("+a6+")\\).",ans6,0.011,
      "Work from the inside out: \\[ \\begin{aligned} f("+a6+") &= \\sqrt{"+a6+u1sgnT(k2)+"} = \\sqrt{"+(t2*t2)+"} = "+t2+" \\\\ g("+t2+") &= "+u1mult(m2,t2)+u1sgnT(b6)+" = "+ans6+" \\end{aligned} \\] So \\((g \\circ f)("+a6+") = \\) <b>"+ans6+"</b>.",
      {k:k2,t:t2,m:m2,a6:a6,b6:b6,shape:shape,sub:sub});
  }
  var mm=u1nz(-3,3),bb=ri(-6,6),aa=ri(-4,4),gvv=mm*aa+bb,h=ri(-6,6);
  if(h===gvv)h=gvv+3;
  var dd=gvv-h,mlt=u1nz(-6,6),cc=mlt*dd;
  return numq("Let \\(f(x) = \\)"+u1frac(""+cc,u1lin(1,-h))+" and \\(g(x) = "+u1lin(mm,bb)+"\\). Evaluate \\((f \\circ g)("+aa+")\\).",mlt,0.011,
    "Work from the inside out: \\[ \\begin{aligned} g("+aa+") &= "+u1mult(mm,aa)+u1sgnT(bb)+" = "+gvv+" \\\\ f("+gvv+") &= \\frac{"+cc+"}{"+gvv+u1sgnT(-h)+"} = \\frac{"+cc+"}{"+dd+"} = "+mlt+" \\end{aligned} \\] So \\((f \\circ g)("+aa+") = \\) <b>"+mlt+"</b>.",
    {mm:mm,bb:bb,aa:aa,h:h,cc:cc,shape:shape});
});
E("u1-quotient-restrictions",1,["1.1","1.3"],2,"gen",function(){
  var shape=ri(1,3);
  if(shape===1){
    var r=u1nz(-9,9),aN=pick([-2,-1,1,2]),s0=0,tries=0;
    do{s0=ri(-8,8);tries++;}while((s0===r||s0===-r)&&tries<100);
    var num=u1lin(aN,-aN*s0),den=u1lin(1,-r);
    return mcq("Determine the restrictions on \\(x\\) for the function \\(h(x) = \\)"+u1frac(num,den)+".",
      "\\(x \\ne "+r+"\\)",
      ["\\(x \\ne "+(-r)+"\\)","\\(x \\ne "+s0+"\\)","There are no restrictions"],
      "A quotient is defined only where its denominator is not zero. Setting the denominator to zero, \\("+den+" = 0\\), gives \\(x = "+r+"\\). The numerator does not restrict \\(x\\), so the restriction is <b>\\(x \\ne "+r+"\\)</b>.",
      {r:r,s0:s0,shape:shape});
  }
  if(shape===2){
    var r1=0,r2=0,tries2=0;
    do{r1=ri(-8,7);r2=r1+ri(1,8);tries2++;}while((r2>8||r1+r2===0)&&tries2<100);
    if(r2>8||r1+r2===0){r1=-5;r2=2;}
    var den2="("+u1lin(1,-r1)+")("+u1lin(1,-r2)+")",num2=u1lin(u1nz(-3,3),ri(-6,6));
    return mcq("Determine the restrictions on \\(x\\) for the function \\(h(x) = \\)"+u1frac(num2,den2)+".",
      "\\(x \\ne "+r1+"\\) and \\(x \\ne "+r2+"\\)",
      ["\\(x \\ne "+r1+"\\)","\\(x \\ne "+r2+"\\)","\\(x \\ne "+(-r1)+"\\) and \\(x \\ne "+(-r2)+"\\)"],
      "A quotient is defined only where its denominator is not zero. The denominator \\("+den2+"\\) is zero at \\(x = "+r1+"\\) and at \\(x = "+r2+"\\), and both values must be excluded: <b>\\(x \\ne "+r1+"\\) and \\(x \\ne "+r2+"\\)</b>.",
      {r1:r1,r2:r2,shape:shape});
  }
  var t=ri(2,9),d=t*t,den3=u1quad(1,0,-d),num3=u1lin(u1nz(-4,4),ri(-6,6));
  return mcq("Determine the restrictions on \\(x\\) for the function \\(h(x) = \\)"+u1frac(num3,den3)+".",
    "\\(x \\ne "+(-t)+"\\) and \\(x \\ne "+t+"\\)",
    ["\\(x \\ne "+t+"\\)","\\(x \\ne "+(-t)+"\\)","\\(x \\ne "+d+"\\)"],
    "A quotient is defined only where its denominator is not zero. Solving \\("+den3+" = 0\\) gives \\(x^2 = "+d+"\\), so \\(x = "+t+"\\) or \\(x = "+(-t)+"\\). Both values must be excluded: <b>\\(x \\ne "+(-t)+"\\) and \\(x \\ne "+t+"\\)</b>.",
    {t:t,shape:shape});
});
E("u1-domain-combined",1,["1.3"],2,"gen",function(){
  var shape=ri(1,3);
  if(shape===1){
    var s=ri(-6,4),r=s+ri(2,7);
    return mcq("Determine the domain of the function \\(h(x) = \\sqrt{"+u1lin(1,-s)+"} + \\)"+u1frac("1",u1lin(1,-r))+".",
      "All real numbers \\(x\\) with \\(x \\ge "+s+"\\) and \\(x \\ne "+r+"\\)",
      ["All real numbers \\(x\\) with \\(x \\ge "+s+"\\) and no other restriction",
       "All real numbers \\(x\\) with \\(x \\ne "+r+"\\) and no lower bound",
       "All real numbers \\(x\\) with \\(x > "+s+"\\) and \\(x \\ne "+r+"\\)"],
      "Both parts of the sum must be defined at the same time. The square root needs \\(x - "+u1par(s)+" \\ge 0\\), that is \\(x \\ge "+s+"\\) (equality is allowed, since \\(\\sqrt{0} = 0\\)). The fraction needs a nonzero denominator, so \\(x \\ne "+r+"\\). The domain is <b>all real numbers \\(x\\) with \\(x \\ge "+s+"\\) and \\(x \\ne "+r+"\\)</b>.",
      {s:s,r:r,shape:shape});
  }
  if(shape===2){
    var s2=ri(-6,3),t2=s2+ri(3,9);
    return mcq("Determine the domain of the function \\(h(x) = \\sqrt{"+u1lin(1,-s2)+"} + \\sqrt{"+u1lin(-1,t2)+"}\\).",
      "All real numbers \\(x\\) with \\("+s2+" \\le x \\le "+t2+"\\)",
      ["All real numbers \\(x\\) with \\(x \\ge "+s2+"\\) and no upper bound",
       "All real numbers \\(x\\) with \\(x \\le "+t2+"\\) and no lower bound",
       "All real numbers \\(x\\) with \\("+s2+" < x < "+t2+"\\)"],
      "Each square root needs a non-negative inside. The first gives \\(x \\ge "+s2+"\\) and the second gives \\(x \\le "+t2+"\\); both endpoints are included because \\(\\sqrt{0} = 0\\) is defined. The domain is <b>all real numbers \\(x\\) with \\("+s2+" \\le x \\le "+t2+"\\)</b>.",
      {s:s2,t:t2,shape:shape});
  }
  var rB=ri(-3,6),q=rB-ri(2,7);
  return mcq("Determine the domain of the function \\(h(x) = \\)"+u1frac("\\sqrt{"+u1lin(-1,rB)+"}",u1lin(1,-q))+".",
    "All real numbers \\(x\\) with \\(x \\le "+rB+"\\) and \\(x \\ne "+q+"\\)",
    ["All real numbers \\(x\\) with \\(x \\le "+rB+"\\) and no other restriction",
     "All real numbers \\(x\\) with \\(x \\ne "+q+"\\) and no upper bound",
     "All real numbers \\(x\\) with \\(x < "+rB+"\\) and \\(x \\ne "+q+"\\)"],
    "Both the root and the fraction must be defined. The square root needs \\("+rB+" - x \\ge 0\\), that is \\(x \\le "+rB+"\\) (equality is allowed). The fraction needs a nonzero denominator, so \\(x \\ne "+q+"\\), and \\("+q+"\\) lies inside the range set by the root, so it must still be excluded. The domain is <b>all real numbers \\(x\\) with \\(x \\le "+rB+"\\) and \\(x \\ne "+q+"\\)</b>.",
    {rB:rB,q:q,shape:shape});
});
E("u1-range-product",1,["1.3"],2,"gen",function(){
  var shape=ri(1,2);
  if(shape===1){
    var r1=ri(-6,5),gap=ri(1,7),r2=r1+gap,xv=(r1+r2)/2,hv=(xv-r1)*(xv-r2);
    var f=u1lin(1,-r1),g=u1lin(1,-r2);
    return mcq("Let \\(f(x) = "+f+"\\) and \\(g(x) = "+g+"\\), and let \\(h(x) = (fg)(x)\\). Determine the range of \\(h\\).",
      "\\(y \\ge "+fmt(hv)+"\\)",
      ["\\(y \\le "+fmt(hv)+"\\)","\\(y \\ge "+fmt(-hv)+"\\)","\\(y \\ge "+fmt(2*hv)+"\\)"],
      "Expanding, \\[ \\begin{aligned} h(x) &= ("+f+")("+g+") \\\\ &= "+u1quad(1,-(r1+r2),r1*r2)+" \\end{aligned} \\] The zeros of \\(h\\) are \\("+r1+"\\) and \\("+r2+"\\), so the vertex is midway between them, at \\(x = "+fmt(xv)+"\\). There, \\(h("+fmt(xv)+") = ("+fmt(xv-r1)+")("+fmt(xv-r2)+") = "+fmt(hv)+"\\). The parabola opens upward, so \\("+fmt(hv)+"\\) is its lowest value and the range is <b>\\(y \\ge "+fmt(hv)+"\\)</b>.",
      {r1:r1,r2:r2,shape:shape});
  }
  var a=ri(1,9),b=ri(1,9);
  if((a+b)%2!==0)b+=1;
  var M=(a+b)*(a+b)/4,xv2=(a-b)/2,f2=u1lin(-1,a),g2=u1lin(1,b);
  return mcq("Let \\(f(x) = "+f2+"\\) and \\(g(x) = "+g2+"\\), and let \\(h(x) = (fg)(x)\\). Determine the range of \\(h\\).",
    "\\(y \\le "+M+"\\)",
    ["\\(y \\ge "+M+"\\)","\\(y \\le "+(4*M)+"\\)","\\(y \\le "+(-M)+"\\)"],
    "Expanding, \\[ \\begin{aligned} h(x) &= ("+f2+")("+g2+") \\\\ &= "+u1quad(-1,a-b,a*b)+" \\end{aligned} \\] The zeros of \\(h\\) are \\("+a+"\\) and \\("+(0-b)+"\\), so the vertex is midway between them, at \\(x = "+fmt(xv2)+"\\). There, \\(h("+fmt(xv2)+") = ("+fmt((a+b)/2)+")("+fmt((a+b)/2)+") = "+M+"\\). The parabola opens downward, so \\("+M+"\\) is its highest value and the range is <b>\\(y \\le "+M+"\\)</b>.",
    {a:a,b:b,shape:shape});
});
E("u1-compose-equation",1,["1.5"],2,"gen",function(){
  var shape=ri(1,4);
  if(shape<=2){
    var c=u1nz(-9,9),a=u1nz(-4,4),b=u1nz(-7,7);
    var P=u1quad(1,0,c),L=u1lin(a,b);
    var PoL=u1quad(a*a,2*a*b,b*b+c),LoP=u1quad(a,0,a*c+b);
    if(shape===1){
      return mcq("Let \\(f(x) = "+P+"\\) and \\(g(x) = "+L+"\\). Determine \\((f \\circ g)(x)\\), in simplified form.",
        "\\("+PoL+"\\)",
        ["\\("+LoP+"\\)","\\("+u1quad(a*a,-2*a*b,b*b+c)+"\\)","\\("+u1quad(a*a,2*a*b,c)+"\\)"],
        "Substitute \\(g(x)\\) into \\(f\\), then expand: \\[ \\begin{aligned} (f \\circ g)(x) &= f(g(x)) \\\\ &= ("+L+")^2"+u1sgnT(c)+" \\\\ &= "+PoL+" \\end{aligned} \\] So \\((f \\circ g)(x) = \\) <b>\\("+PoL+"\\)</b>.",
        {c:c,a:a,b:b,shape:shape});
    }
    return mcq("Let \\(f(x) = "+L+"\\) and \\(g(x) = "+P+"\\). Determine \\((f \\circ g)(x)\\), in simplified form.",
      "\\("+LoP+"\\)",
      ["\\("+PoL+"\\)","\\("+u1quad(a,0,a*c-b)+"\\)","\\("+u1quad(-a,0,a*c+b)+"\\)"],
      "Substitute \\(g(x)\\) into \\(f\\): \\[ \\begin{aligned} (f \\circ g)(x) &= f(g(x)) \\\\ &= "+a+"("+P+")"+u1sgnT(b)+" \\\\ &= "+LoP+" \\end{aligned} \\] So \\((f \\circ g)(x) = \\) <b>\\("+LoP+"\\)</b>.",
      {c:c,a:a,b:b,shape:shape});
  }
  if(shape===3){
    var c3=u1nz(-5,9),a3=ri(1,4),b3=(a3===1)?u1nz(-7,7):ri(-7,7);
    var f3="\\sqrt{"+u1lin(1,c3)+"}",g3=u1lin(a3,b3);
    var corr3="\\(\\sqrt{"+u1lin(a3,b3+c3)+"}\\)";
    var gof3="\\("+(a3===1?"":a3)+"\\sqrt{"+u1lin(1,c3)+"}"+u1sgnT(b3)+"\\)";
    var out3="\\(\\sqrt{"+u1lin(a3,b3)+"}"+u1sgnT((a3===1&&b3===c3)?-c3:c3)+"\\)";
    var slip3="\\(\\sqrt{"+u1lin(a3,b3-c3)+"}\\)";
    return mcq("Let \\(f(x) = "+f3+"\\) and \\(g(x) = "+g3+"\\). Determine \\((f \\circ g)(x)\\), in simplified form.",
      corr3,[gof3,out3,slip3],
      "Substitute \\(g(x)\\) into \\(f\\): the whole of \\(g(x)\\) goes inside the square root: \\[ \\begin{aligned} (f \\circ g)(x) &= f(g(x)) \\\\ &= \\sqrt{("+g3+") + ("+c3+")} \\\\ &= \\sqrt{"+u1lin(a3,b3+c3)+"} \\end{aligned} \\] So \\((f \\circ g)(x) = \\) <b>"+corr3+"</b>.",
      {c:c3,a:a3,b:b3,shape:shape});
  }
  var h=u1nz(-6,6),a4=u1nz(-4,4),b4=(a4===1)?u1nz(-7,7):ri(-7,7);
  var g4=u1lin(a4,b4);
  var corr4=u1frac("1",u1lin(a4,b4-h));
  var gof4=u1frac(u1lin(b4,a4-b4*h),u1lin(1,-h));
  var slip4=u1frac("1",u1lin(a4,b4+h));
  var third4=(b4===0||b4===h)?u1frac("1",u1lin(-a4,b4-h)):u1frac("1",u1lin(a4,h-b4));
  return mcq("Let \\(f(x) = \\)"+u1frac("1",u1lin(1,-h))+" and \\(g(x) = "+g4+"\\). Determine \\((f \\circ g)(x)\\), in simplified form.",
    corr4,[gof4,slip4,third4],
    "Substitute \\(g(x)\\) into \\(f\\): the whole of \\(g(x)\\) replaces \\(x\\) in the denominator: \\[ \\begin{aligned} (f \\circ g)(x) &= f(g(x)) \\\\ &= \\frac{1}{("+g4+") - "+u1par(h)+"} \\\\ &= \\frac{1}{"+u1lin(a4,b4-h)+"} \\end{aligned} \\] So \\((f \\circ g)(x) = \\) <b>"+corr4+"</b>.",
    {h:h,a:a4,b:b4,shape:shape});
});
E("u1-compose-domain-range",1,["1.6"],2,"gen",function(){
  var shape=ri(1,4);
  if(shape===1){
    var r1=ri(-7,6),r2=r1+ri(1,8);
    if(r2>8)r2=8;
    var gq=u1quad(1,-(r1+r2),r1*r2);
    return mcq("Let \\(f(x) = \\sqrt{x}\\) and \\(g(x) = "+gq+"\\). Determine the domain of \\((f \\circ g)(x)\\).",
      "All real numbers \\(x\\) with \\(x \\le "+r1+"\\) or \\(x \\ge "+r2+"\\)",
      ["All real numbers \\(x\\) with \\("+r1+" \\le x \\le "+r2+"\\)",
       "All real numbers \\(x\\) with \\(x \\ge "+r1+"\\)",
       "All real numbers \\(x\\), with no restriction of any kind"],
      "The composite is \\((f \\circ g)(x) = \\sqrt{"+gq+"}\\), so the inside of the root must be non-negative. The quadratic \\("+gq+"\\) is an upward parabola with zeros \\("+r1+"\\) and \\("+r2+"\\); it is non-negative outside those zeros, not between them. The domain is <b>all real numbers \\(x\\) with \\(x \\le "+r1+"\\) or \\(x \\ge "+r2+"\\)</b>.",
      {r1:r1,r2:r2,shape:shape});
  }
  if(shape===2){
    var s=ri(-5,5),h=ri(1,4),q=s+h*h;
    return mcq("Let \\(f(x) = \\)"+u1frac("1",u1lin(1,-h))+" and \\(g(x) = \\sqrt{"+u1lin(1,-s)+"}\\). Determine the domain of \\((f \\circ g)(x)\\).",
      "All real numbers \\(x\\) with \\(x \\ge "+s+"\\) and \\(x \\ne "+q+"\\)",
      ["All real numbers \\(x\\) with \\(x \\ge "+s+"\\) and no other restriction",
       "All real numbers \\(x\\) with \\(x \\ne "+q+"\\) and no lower bound",
       "All real numbers \\(x\\) with \\(x > "+s+"\\) and \\(x \\ne "+q+"\\)"],
      "The composite is \\((f \\circ g)(x) = \\frac{1}{\\sqrt{"+u1lin(1,-s)+"} - "+h+"}\\). The root needs \\(x \\ge "+s+"\\). The denominator also cannot be zero: \\(\\sqrt{"+u1lin(1,-s)+"} = "+h+"\\) when \\(x - "+u1par(s)+" = "+(h*h)+"\\), that is at \\(x = "+q+"\\), so that value is excluded as well. The domain is <b>all real numbers \\(x\\) with \\(x \\ge "+s+"\\) and \\(x \\ne "+q+"\\)</b>.",
      {s:s,h:h,shape:shape});
  }
  if(shape===3){
    var a=ri(1,5),b=ri(-9,9);
    return mcq("Let \\(f(x) = \\sqrt{x}\\) and \\(g(x) = "+u1lin(a,b)+"\\). Determine the range of \\((f \\circ g)(x)\\).",
      "All real numbers \\(y\\) with \\(y \\ge 0\\)",
      ["All real numbers \\(y\\) with \\(y > 0\\)",
       "All real numbers \\(y\\), with no restriction",
       "All real numbers \\(y\\) with \\(y \\le 0\\)"],
      "The composite is \\((f \\circ g)(x) = \\sqrt{"+u1lin(a,b)+"}\\). A square root is never negative, and \\(0\\) does occur (where the inside is zero), while every positive value occurs as well. The range is <b>all real numbers \\(y\\) with \\(y \\ge 0\\)</b>.",
      {a:a,b:b,shape:shape});
  }
  var c=ri(-9,9),a2=u1nz(-4,4),b2=ri(-7,7);
  return mcq("Let \\(f(x) = "+u1quad(1,0,c)+"\\) and \\(g(x) = "+u1lin(a2,b2)+"\\). Determine the range of \\((f \\circ g)(x)\\).",
    "All real numbers \\(y\\) with \\(y \\ge "+c+"\\)",
    ["All real numbers \\(y\\) with \\(y > "+c+"\\)",
     "All real numbers \\(y\\) with \\(y \\le "+c+"\\)",
     "All real numbers \\(y\\), with no restriction"],
    "The composite is \\((f \\circ g)(x) = ("+u1lin(a2,b2)+")^2"+u1sgnT(c)+"\\). A square is never negative and reaches \\(0\\), and as \\(x\\) varies the inside takes every real value, so the smallest output is \\("+c+"\\) and every larger value occurs. The range is <b>all real numbers \\(y\\) with \\(y \\ge "+c+"\\)</b>.",
    {c:c,a2:a2,b2:b2,shape:shape});
});
E("u1-decompose",1,["1.7"],1,"var",varset([
  function(){return mcq("The function \\(h(x) = \\sqrt{7 - 3x}\\) can be written as \\(h(x) = f(g(x))\\), where \\(f(x) = \\sqrt{x}\\). What is \\(g(x)\\)?",
    "\\(7 - 3x\\)",
    ["\\(3x - 7\\)","\\(7 + 3x\\)","\\((7 - 3x)^2\\)"],
    "In \\(f(g(x))\\), the inner function is whatever sits inside the outer function's operation. Here the outer function takes a square root, and inside the root is \\(7 - 3x\\). Check: \\(f(g(x)) = \\sqrt{7 - 3x} = h(x)\\). So \\(g(x) = \\) <b>\\(7 - 3x\\)</b>.",
    {v:1});},
  function(){return mcq("The function \\(h(x) = (2x + 5)^3\\) can be written as \\(h(x) = f(g(x))\\), where \\(g(x) = 2x + 5\\). What is \\(f(x)\\)?",
    "\\(x^3\\)",
    ["\\((x + 5)^3\\)","\\(x^3 + 5\\)","\\((2x)^3\\)"],
    "The inner function \\(g(x) = 2x + 5\\) is the quantity being cubed, so the outer function just cubes its input. Check: \\(f(g(x)) = (2x + 5)^3 = h(x)\\). So \\(f(x) = \\) <b>\\(x^3\\)</b>.",
    {v:2});},
  function(){return mcq("The function \\(h(x) = \\)"+u1frac("1","3x - 4")+" can be written as \\(h(x) = f(g(x))\\), where \\(f(x) = \\)"+u1frac("1","x")+". What is \\(g(x)\\)?",
    "\\(3x - 4\\)",
    ["\\(4 - 3x\\)","\\(3x + 4\\)","\\(\\frac{1}{3x - 4}\\)"],
    "The outer function takes a reciprocal, so the inner function is the quantity in the denominator. Check: \\(f(g(x)) = \\)"+u1frac("1","3x - 4")+"\\(= h(x)\\). So \\(g(x) = \\) <b>\\(3x - 4\\)</b>.",
    {v:3});},
  function(){return mcq("The function \\(h(x) = (x^2 - 6)^5\\) can be written as \\(h(x) = f(g(x))\\), where \\(g(x) = x^2 - 6\\). What is \\(f(x)\\)?",
    "\\(x^5\\)",
    ["\\((x - 6)^5\\)","\\(x^5 - 6\\)","\\((x^2)^5\\)"],
    "The inner function \\(g(x) = x^2 - 6\\) is the quantity being raised to the fifth power, so the outer function just raises its input to the fifth power. Check: \\(f(g(x)) = (x^2 - 6)^5 = h(x)\\). So \\(f(x) = \\) <b>\\(x^5\\)</b>.",
    {v:4});}
]));
E("u1-graph-operation",1,["1.2"],1,"gen",function(){
  var xs=[-2,-1,0,1,2],fv={},gv={},i;
  for(i=0;i<xs.length;i++){fv[xs[i]]=pick(xs);gv[xs[i]]=pick(xs);}
  function pts(map){return xs.map(function(xx){return "("+xx+", "+map[xx]+")";}).join(", ");}
  var p=pick(xs),ask=ri(1,5),ans,comp,sol;
  if(ask===1){ans=fv[p]+gv[p];comp="(f + g)("+p+")";sol="From the listed points, \\(f("+p+") = "+fv[p]+"\\) and \\(g("+p+") = "+gv[p]+"\\). So \\((f + g)("+p+") = "+fv[p]+" + "+u1par(gv[p])+" = \\) <b>"+ans+"</b>.";}
  else if(ask===2){ans=fv[p]-gv[p];comp="(f - g)("+p+")";sol="From the listed points, \\(f("+p+") = "+fv[p]+"\\) and \\(g("+p+") = "+gv[p]+"\\). So \\((f - g)("+p+") = "+fv[p]+" - "+u1par(gv[p])+" = \\) <b>"+ans+"</b>.";}
  else if(ask===3){ans=fv[p]*gv[p];comp="(fg)("+p+")";sol="From the listed points, \\(f("+p+") = "+fv[p]+"\\) and \\(g("+p+") = "+gv[p]+"\\). So \\((fg)("+p+") = "+fv[p]+" \\cdot "+u1par(gv[p])+" = \\) <b>"+ans+"</b>.";}
  else if(ask===4){ans=fv[gv[p]];comp="(f \\circ g)("+p+")";sol="From the listed points, \\(g("+p+") = "+gv[p]+"\\). Then read off \\(f("+gv[p]+") = "+ans+"\\). So \\((f \\circ g)("+p+") = \\) <b>"+ans+"</b>.";}
  else{ans=gv[fv[p]];comp="(g \\circ f)("+p+")";sol="From the listed points, \\(f("+p+") = "+fv[p]+"\\). Then read off \\(g("+fv[p]+") = "+ans+"\\). So \\((g \\circ f)("+p+") = \\) <b>"+ans+"</b>.";}
  return numq("The graphs of two functions \\(f\\) and \\(g\\) pass through the points listed. For \\(f\\): "+pts(fv)+". For \\(g\\): "+pts(gv)+". Determine \\("+comp+"\\).",ans,0.011,sol,{p:p,ask:ask,fv:fv,gv:gv});
});

/* Pure Math review addition, November 13, 2026 (scan build order step 3):
   compound quadratic inequalities in interval notation, reviewed in the
   St. Pat's Math 31 precalculus material and written new. The app config
   carries no inequality-specific indicator for Unit 1; the entry is
   filed under 1.3 because it asks for the set of inputs whose outputs
   land in a stated range, a domain determination. */
function u1ivl(a,clA,b,clB){var l=(a==="-inf")?"-\\infty":(""+a),r=(b==="inf")?"\\infty":(""+b);return (clA?"[":"(")+l+", "+r+(clB?"]":")");}
function u1u2(p1,p2){return "\\("+p1+" \\cup "+p2+"\\)";}
E("u1-compound-inequality",1,["1.3"],2,"gen",function(){
  var mode=pick(["chain0","chainL","single"]);
  var cand=null,tries=0;
  while(!cand&&tries<300){
    tries++;
    var r1=ri(-6,4),r2=r1+ri(2,7);
    if(r2>6)continue;
    var d1=(mode==="chainL")?ri(2,3):ri(1,3);
    var t1=r1-d1,t2=(r1+r2)-t1,M=(t1-r1)*(t1-r2);
    var q=u1quad(1,-(r1+r2),r1*r2);
    var fq="\\(\\left("+u1lin(1,-r1)+"\\right)\\left("+u1lin(1,-r2)+"\\right)\\)";
    var key,ds,sol,prompt,sig;
    if(mode==="chain0"){
      key=u1u2(u1ivl(t1,false,r1,false),u1ivl(r2,false,t2,false));
      ds=[u1u2(u1ivl("-inf",false,r1,false),u1ivl(r2,false,"inf",false)),
          "\\("+u1ivl(t1,false,t2,false)+"\\)",
          u1u2(u1ivl(t1,true,r1,true),u1ivl(r2,true,t2,true))];
      sol="Solve the two conditions separately, then keep only the values that satisfy both. The quadratic factors as "+fq+". It is positive outside its roots \\("+r1+"\\) and \\("+r2+"\\), which handles the left condition \\(0 < "+q+"\\): \\(x < "+r1+"\\) or \\(x > "+r2+"\\). For the right condition, \\("+q+" - "+M+" = \\left("+u1lin(1,-t1)+"\\right)\\left("+u1lin(1,-t2)+"\\right)\\), which is negative between its roots: \\("+t1+" < x < "+t2+"\\). A chain is an AND, so the answer is the overlap of the two sets: <b>"+key+"</b>. Every endpoint is excluded, because both inequalities are strict.";
      prompt="Solve the inequality \\(0 < "+q+" < "+M+"\\). Give the solution set in interval notation.";
      sig={mode:mode,r1:r1,r2:r2,t1:t1,t2:t2,M:M,L:0,w1:null,w2:null,sub:"",strict:true};
    }else if(mode==="chainL"){
      var w1=t1+ri(1,d1-1),w2=(r1+r2)-w1,L=(w1-r1)*(w1-r2);
      key=u1u2(u1ivl(t1,false,w1,false),u1ivl(w2,false,t2,false));
      ds=[u1u2(u1ivl("-inf",false,w1,false),u1ivl(w2,false,"inf",false)),
          "\\("+u1ivl(t1,false,t2,false)+"\\)",
          u1u2(u1ivl(t1,true,w1,true),u1ivl(w2,true,t2,true))];
      sol="Solve the two conditions separately, then keep only the values that satisfy both. For the left condition, \\("+q+" - "+L+" = \\left("+u1lin(1,-w1)+"\\right)\\left("+u1lin(1,-w2)+"\\right)\\), which is positive outside its roots: \\(x < "+w1+"\\) or \\(x > "+w2+"\\). For the right condition, \\("+q+" - "+M+" = \\left("+u1lin(1,-t1)+"\\right)\\left("+u1lin(1,-t2)+"\\right)\\), which is negative between its roots: \\("+t1+" < x < "+t2+"\\). A chain is an AND, so the answer is the overlap: <b>"+key+"</b>. Every endpoint is excluded, because both inequalities are strict.";
      prompt="Solve the inequality \\("+L+" < "+q+" < "+M+"\\). Give the solution set in interval notation.";
      sig={mode:mode,r1:r1,r2:r2,t1:t1,t2:t2,M:M,L:L,w1:w1,w2:w2,sub:"",strict:true};
    }else{
      var sub=pick(["gtM","ltM","gt0","lt0"]),strict=ri(0,1)===0,sym;
      if(sub==="gtM"||sub==="ltM"){
        var rays=u1u2(u1ivl("-inf",false,t1,!strict),u1ivl(t2,!strict,"inf",false));
        var intv="\\("+u1ivl(t1,!strict,t2,!strict)+"\\)";
        var raysF=u1u2(u1ivl("-inf",false,t1,strict),u1ivl(t2,strict,"inf",false));
        var intvF="\\("+u1ivl(t1,strict,t2,strict)+"\\)";
        var raysR=u1u2(u1ivl("-inf",false,-t2,!strict),u1ivl(-t1,!strict,"inf",false));
        var intvR="\\("+u1ivl(-t2,!strict,-t1,!strict)+"\\)";
        if(sub==="gtM"){key=rays;ds=[intv,raysF,raysR];}else{key=intv;ds=[rays,intvF,intvR];}
        sym=strict?(sub==="gtM"?">":"<"):(sub==="gtM"?"\\geq":"\\leq");
        sol="The expression \\("+q+" - "+M+"\\) factors as \\(\\left("+u1lin(1,-t1)+"\\right)\\left("+u1lin(1,-t2)+"\\right)\\), an upward parabola in disguise: it is negative between its roots \\("+t1+"\\) and \\("+t2+"\\) and positive outside them. So \\("+q+"\\) is "+(sub==="gtM"?"above":"below")+" \\("+M+"\\) "+(sub==="gtM"?"outside that pair of points":"between them")+". The endpoints are "+(strict?"excluded, because the inequality is strict":"included, because the inequality allows equality")+". The solution set is <b>"+key+"</b>.";
        prompt="Solve the inequality \\("+q+" "+sym+" "+M+"\\). Give the solution set in interval notation.";
        sig={mode:mode,r1:r1,r2:r2,t1:t1,t2:t2,M:M,L:0,w1:null,w2:null,sub:sub,strict:strict};
      }else{
        var rays0=u1u2(u1ivl("-inf",false,r1,!strict),u1ivl(r2,!strict,"inf",false));
        var intv0="\\("+u1ivl(r1,!strict,r2,!strict)+"\\)";
        var rays0F=u1u2(u1ivl("-inf",false,r1,strict),u1ivl(r2,strict,"inf",false));
        var intv0F="\\("+u1ivl(r1,strict,r2,strict)+"\\)";
        var rays0R=u1u2(u1ivl("-inf",false,-r2,!strict),u1ivl(-r1,!strict,"inf",false));
        var intv0R="\\("+u1ivl(-r2,!strict,-r1,!strict)+"\\)";
        if(sub==="gt0"){key=rays0;ds=[intv0,rays0F,rays0R];}else{key=intv0;ds=[rays0,intv0F,intv0R];}
        sym=strict?(sub==="gt0"?">":"<"):(sub==="gt0"?"\\geq":"\\leq");
        sol="The quadratic factors as "+fq+", an upward parabola with roots \\("+r1+"\\) and \\("+r2+"\\). It is positive outside its roots and negative between them. So \\("+q+" "+sym+" 0\\) holds "+(sub==="gt0"?"outside the roots":"between the roots")+". The endpoints are "+(strict?"excluded, because the inequality is strict":"included, because the inequality allows equality")+". The solution set is <b>"+key+"</b>.";
        prompt="Solve the inequality \\("+q+" "+sym+" 0\\). Give the solution set in interval notation.";
        sig={mode:mode,r1:r1,r2:r2,t1:t1,t2:t2,M:M,L:0,w1:null,w2:null,sub:sub,strict:strict};
      }
    }
    if(new Set([key].concat(ds)).size===4)cand=mcq(prompt,key,ds,sol,sig);
  }
  if(!cand){
    var k2=u1u2(u1ivl(-3,false,-1,false),u1ivl(1,false,3,false));
    cand=mcq("Solve the inequality \\(0 < x^2 - 1 < 8\\). Give the solution set in interval notation.",
      k2,["\\("+u1ivl(-3,false,3,false)+"\\)",u1u2(u1ivl("-inf",false,-1,false),u1ivl(1,false,"inf",false)),u1u2(u1ivl(-3,true,-1,true),u1ivl(1,true,3,true))],
      "The quadratic \\(x^2 - 1\\) is positive outside its roots \\(-1\\) and \\(1\\), and \\(x^2 - 1 < 8\\) means \\(x^2 < 9\\), that is \\(-3 < x < 3\\). Both conditions at once give <b>"+k2+"</b>.",
      {mode:"chain0",r1:-1,r2:1,t1:-3,t2:3,M:8,L:0,w1:null,w2:null,sub:"",strict:true});
  }
  return cand;
});

