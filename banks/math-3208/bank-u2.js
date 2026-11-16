// Math 3208 Unit 2 Limits and Continuity question bank
// CRMARKS: u2-limit-table=1
// CRMARKS: u2-limit-substitution=1
// CRMARKS: u2-limit-properties=1
// CRMARKS: u2-limit-existence=1
// CRMARKS: u2-limit-graph=3
// CRMARKS: u2-reciprocal-limit=1
// CRMARKS: u2-limit-factor-cancel=2
// CRMARKS: u2-limit-conjugate=2
// CRMARKS: u2-limit-complex-fraction=2
// CRMARKS: u2-limit-infinite=2
// CRMARKS: u2-limit-at-infinity=2
// CRMARKS: u2-horizontal-asymptote=1
// CRMARKS: u2-oblique-asymptote=2
// CRMARKS: u2-continuity-definition=3
// CRMARKS: u2-removable-redefine=3
// CRMARKS: u2-limit-absvalue=2
// CRMARKS: u2-sequence-convergence=1
// CRMARKS: u2-repeating-decimal=2
/* Math 3208 Review, Unit 2 (Limits and Continuity) entries. Helpers carry the
   u2q prefix so they cannot collide with other units when files are assembled. */
function u2qGcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2qFracRaw(n,d){if(d<0){n=-n;d=-d;}if(n===0)return "0";var g=u2qGcd(n,d);n/=g;d/=g;if(d===1)return ""+n;return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}";}
function u2qFrac(n,d){return "\\("+u2qFracRaw(n,d)+"\\)";}
function u2qFracS(n,dStr){return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+dStr+"}";}
function u2qLin(m,b){var s=(m===1?"x":m===-1?"-x":m+"x");if(b>0)s+=" + "+b;else if(b<0)s+=" - "+(-b);return s;}
function u2qDen(r){return r>0?"x - "+r:(r<0?"x + "+(-r):"x");}
function u2qPoly(cf){var n=cf.length-1,parts=[];for(var i=0;i<cf.length;i++){var c=cf[i],p=n-i;if(c===0)continue;var mag=Math.abs(c),term;if(p===0)term=""+mag;else{var cs=mag===1?"":(""+mag);term=cs+(p===1?"x":"x^"+p);}parts.push({neg:c<0,term:term});}if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
function u2qJoin(nums){var s=""+nums[0];for(var i=1;i<nums.length;i++)s+=nums[i]<0?" - "+(-nums[i]):" + "+nums[i];return s;}
function u2qF3(v){var r=Math.round(v*1000)/1000;if(r===Math.round(r))return ""+Math.round(r);var s=r.toFixed(3);while(s.charAt(s.length-1)==="0")s=s.slice(0,-1);return s;}

E("u2-limit-table",2,["2.4"],1,"gen",function(){
  var mode=pick(["cancel","cubic","quad"]);
  var offs=pick([[0.5,0.1,0.01],[0.2,0.05,0.005],[0.1,0.01,0.001],[0.25,0.05,0.01]]);
  var a,key,ds,f,note;
  if(mode==="cancel"){
    a=ri(-6,6);while(a===0)a=ri(-6,6);
    f=function(x){return x+a;};key=2*a;
    var slip=pick([2*a+1,2*a-1,-2*a].filter(function(v){return v!==a;}));
    ds=["\\("+a+"\\)","\\("+slip+"\\)","\\(\\text{does not exist}\\)"];
    note="The values close in on the same number from both sides, even though the underlying expression is undefined at the point itself. A limit describes the approach, not the value at the point.";
  }else if(mode==="cubic"){
    a=pick([-3,-2,-1,1,2,3]);
    f=function(x){return x*x+a*x+a*a;};key=3*a*a;
    ds=["\\("+(a*a)+"\\)","\\("+(2*a*a)+"\\)","\\(\\text{does not exist}\\)"];
    note="The values close in on the same number from the left and from the right, so the two-sided limit is that number.";
  }else{
    a=ri(-5,5);var c=ri(-6,6);while(c===0)c=ri(-6,6);
    f=function(x){return x*x+c;};key=a*a+c;
    ds=["\\("+(a*a-c)+"\\)","\\("+((a+1)*(a+1)+c)+"\\)","\\(\\text{does not exist}\\)"];
    note="The values close in on the same number from both sides of the point, so the limit is that number.";
  }
  var xs=[a-offs[0],a-offs[1],a-offs[2],a+offs[2],a+offs[1],a+offs[0]];
  var row1=xs.map(function(x){return u2qF3(x);}).join(", ");
  var row2=xs.map(function(x){return u2qF3(f(x));}).join(", ");
  return mcq("The table shows values of \\(f(x)\\) for \\(x\\) close to \\("+a+"\\).<br>\\(x\\): "+row1+"<br>\\(f(x)\\): "+row2+"<br>What value does \\(f(x)\\) approach as \\(x\\) approaches \\("+a+"\\)?",
    "\\("+key+"\\)",ds,
    "Reading across the table, as the \\(x\\)-values close in on \\("+a+"\\) from both sides, the \\(f(x)\\)-values close in on \\("+key+"\\). "+note+" The limit is <b>\\("+key+"\\)</b>.",
    {mode:mode,a:a,offs:offs.join("/")});
});
E("u2-limit-substitution",2,["2.7"],1,"gen",function(){
  var mode=pick(["poly","rational","sqrt"]);
  for(var tries=0;tries<90;tries++){
    if(mode==="poly"){
      var A=pick([1,2,3,-1,-2]),B=ri(-6,6),C=ri(-8,8),a=ri(-4,4);
      var key=A*a*a+B*a+C;
      var o=["\\("+key+"\\)","\\("+(A*a*a+B*a-C)+"\\)","\\("+(A*a*a-B*a+C)+"\\)","\\("+(A*a+B*a+C)+"\\)"];
      if(new Set(o).size===4){
        return mcq("Evaluate \\(\\lim_{x \\to "+a+"} \\left("+u2qPoly([A,B,C])+"\\right)\\).",
          o[0],[o[1],o[2],o[3]],
          "The function is a polynomial, so the limit is found by direct substitution.\\[ \\begin{aligned} \\lim_{x \\to "+a+"} \\left("+u2qPoly([A,B,C])+"\\right) &= "+u2qJoin([A*a*a,B*a,C])+" \\\\ &= "+key+" \\end{aligned} \\] The limit is <b>\\("+key+"\\)</b>.",
          {mode:mode,A:A,B:B,C:C,a:a});
      }
    }else if(mode==="rational"){
      var p=ri(-5,5),q=ri(-5,5),a2=ri(-4,4);
      if(p===0||q===0||a2+q===0||a2+p===0||a2-q===0)continue;
      var o2=[u2qFrac(a2+p,a2+q),u2qFrac(a2-p,a2+q),u2qFrac(a2+p,a2-q),u2qFrac(a2+q,a2+p)];
      if(new Set(o2).size===4){
        return mcq("Evaluate \\(\\lim_{x \\to "+a2+"} \\frac{"+u2qLin(1,p)+"}{"+u2qLin(1,q)+"}\\).",
          o2[0],[o2[1],o2[2],o2[3]],
          "The denominator is not zero at \\(x = "+a2+"\\), so substitute directly.\\[ \\begin{aligned} \\lim_{x \\to "+a2+"} \\frac{"+u2qLin(1,p)+"}{"+u2qLin(1,q)+"} &= \\frac{"+(a2+p)+"}{"+(a2+q)+"} \\\\ &= "+u2qFracRaw(a2+p,a2+q)+" \\end{aligned} \\] The limit is <b>"+o2[0]+"</b>.",
          {mode:mode,p:p,q:q,a:a2});
      }
    }else{
      var r=pick([2,3,4,5]),a3=ri(-4,6),k=r*r-a3;
      return mcq("Evaluate \\(\\lim_{x \\to "+a3+"} \\sqrt{"+u2qLin(1,k)+"}\\).",
        "\\("+r+"\\)",["\\("+(r+1)+"\\)","\\("+(r*r)+"\\)","\\("+(r-1)+"\\)"],
        "The expression under the root is positive at \\(x = "+a3+"\\), so substitute directly.\\[ \\begin{aligned} \\lim_{x \\to "+a3+"} \\sqrt{"+u2qLin(1,k)+"} &= \\sqrt{"+(a3+k)+"} \\\\ &= "+r+" \\end{aligned} \\] The limit is <b>\\("+r+"\\)</b>.",
        {mode:mode,r:r,a:a3});
    }
  }
});
E("u2-limit-properties",2,["2.6"],1,"gen",function(){
  var mode=pick(["sum","diff","prod","quot","pow","root","combo"]);
  var a=ri(-4,4),Lf,Lg,expr,key,ds,rule;
  if(mode==="quot"){
    Lg=pick([-4,-3,-2,-1,1,2,3,4]);var kk=ri(-4,4);while(kk===0)kk=ri(-4,4);Lf=kk*Lg;
    expr="\\frac{f(x)}{g(x)}";key=kk;rule="Quotient Rule";
    var qall=[key,Lf+Lg,Lf-Lg,-kk];
    for(var qi=1;qi<4;qi++){var qguard=0;while(qall.indexOf(qall[qi])!==qi&&qguard<40){qall[qi]+=7;qguard++;}}
    var qo=qall.map(function(v){return "\\("+v+"\\)";});
    return mcq("Suppose \\(\\lim_{x \\to "+a+"} f(x) = "+Lf+"\\) and \\(\\lim_{x \\to "+a+"} g(x) = "+Lg+"\\). Evaluate \\(\\lim_{x \\to "+a+"} "+expr+"\\).",
      qo[0],[qo[1],qo[2],qo[3]],
      "By the "+rule+", divide the two limits: \\(\\frac{"+Lf+"}{"+Lg+"} = "+key+"\\). The limit is <b>\\("+key+"\\)</b>.",
      {mode:mode,a:a,Lf:Lf,Lg:Lg});
  }
  Lf=ri(-6,8);while(Lf===0)Lf=ri(-6,8);Lg=ri(-6,8);while(Lg===0)Lg=ri(-6,8);
  if(mode==="sum"){expr="\\left[f(x) + g(x)\\right]";key=Lf+Lg;ds=[Lf-Lg,Lf*Lg,-(Lf+Lg)];rule="Sum Rule";}
  else if(mode==="diff"){expr="\\left[f(x) - g(x)\\right]";key=Lf-Lg;ds=[Lg-Lf,Lf+Lg,Lf*Lg];rule="Difference Rule";}
  else if(mode==="prod"){expr="\\left[f(x) \\cdot g(x)\\right]";key=Lf*Lg;ds=[Lf+Lg,Lf-Lg,-(Lf*Lg)];rule="Product Rule";}
  else if(mode==="pow"){while(Lf===0||Lf===1||Lf===2)Lf=ri(-6,8);expr="\\left[f(x)\\right]^2";key=Lf*Lf;ds=[2*Lf,Lf,-(Lf*Lf)];rule="Power Rule";}
  else if(mode==="root"){Lf=pick([4,9,16,25,36]);expr="\\sqrt{f(x)}";key=Math.sqrt(Lf);ds=[Lf,key+1,2*key];rule="Power Rule (root form)";}
  else{var cf=pick([2,3]),cg=pick([2,3]);expr="\\left["+cf+"f(x) - "+cg+"g(x)\\right]";key=cf*Lf-cg*Lg;ds=[cf*Lf+cg*Lg,cf*Lg-cg*Lf,Lf-Lg];rule="Constant Multiple and Difference Rules";}
  var all=[key].concat(ds);
  for(var i=1;i<4;i++){var guard=0;while(all.indexOf(all[i])!==i&&guard<40){all[i]+=7;guard++;}}
  var opts=all.map(function(v){return "\\("+v+"\\)";});
  var arith=(mode==="combo")?(""+cf+"("+Lf+") - "+cg+"("+Lg+") = "+key):(mode==="pow"||mode==="root")?("applied to the limit of \\(f\\) alone gives "+key):("combining "+Lf+" and "+Lg+" gives "+key);
  return mcq("Suppose \\(\\lim_{x \\to "+a+"} f(x) = "+Lf+"\\) and \\(\\lim_{x \\to "+a+"} g(x) = "+Lg+"\\). Evaluate \\(\\lim_{x \\to "+a+"} "+expr+"\\).",
    opts[0],[opts[1],opts[2],opts[3]],
    "By the "+rule+", "+arith+". The limit is <b>\\("+key+"\\)</b>.",
    {mode:mode,a:a,Lf:Lf,Lg:Lg});
});
E("u2-limit-existence",2,["2.3"],1,"var",varset([
  function(){return mcq("For a function \\(f\\), the values of \\(f(x)\\) approach \\(3\\) as \\(x\\) approaches \\(2\\) from the left, and approach \\(3\\) as \\(x\\) approaches \\(2\\) from the right. The value of the function at the point is \\(f(2) = 5\\). What is \\(\\lim_{x \\to 2} f(x)\\)?",
    "\\(3\\)",["\\(5\\)","\\(2\\)","\\(\\text{does not exist}\\)"],
    "A two-sided limit depends only on the values approached from each side. Both sides approach \\(3\\), so the limit exists and equals \\(3\\); the function value \\(f(2) = 5\\) does not affect it. The limit is <b>\\(3\\)</b>.",
    {v:1});},
  function(){return mcq("For a function \\(f\\), the values of \\(f(x)\\) approach \\(-2\\) as \\(x\\) approaches \\(-1\\) from the left, and approach \\(4\\) as \\(x\\) approaches \\(-1\\) from the right. The value of the function at the point is \\(f(-1) = 0\\). What is \\(\\lim_{x \\to -1} f(x)\\)?",
    "\\(\\text{does not exist}\\)",["\\(-2\\)","\\(4\\)","\\(1\\)"],
    "The left-hand limit is \\(-2\\) and the right-hand limit is \\(4\\). A two-sided limit exists only when the two one-sided limits agree, and here they do not. The limit <b>does not exist</b>.",
    {v:2});},
  function(){return mcq("Let \\(f(x) = \\begin{cases} x + 3, & x < 1 \\\\ 5 - x, & x \\ge 1 \\end{cases}\\). What is \\(\\lim_{x \\to 1} f(x)\\)?",
    "\\(4\\)",["\\(1\\)","\\(5\\)","\\(\\text{does not exist}\\)"],
    "From the left, the first branch gives \\(1 + 3 = 4\\). From the right, the second branch gives \\(5 - 1 = 4\\). The one-sided limits agree, so the two-sided limit is <b>\\(4\\)</b>.",
    {v:3});},
  function(){return mcq("For a function \\(f\\), the values of \\(f(x)\\) approach \\(0\\) as \\(x\\) approaches \\(0\\) from both sides, but \\(f(0)\\) is undefined. What is \\(\\lim_{x \\to 0} f(x)\\)?",
    "\\(0\\)",["\\(1\\)","\\(\\text{does not exist}\\)","\\(\\text{undefined}\\)"],
    "Both one-sided approaches head to \\(0\\), so the limit is \\(0\\). A function does not need to be defined at the point for its limit there to exist. The limit is <b>\\(0\\)</b>.",
    {v:4});}
]));

E("u2-limit-graph",2,["2.1","2.4","2.5"],2,"gen",function(){
  var a=ri(-3,3);
  var m1=pick([1,2,-1,-2,3]),m2=pick([1,2,-1,-2]);
  var Lv=ri(-5,5);
  var match=ri(0,1)===0;
  var Rv=match?Lv:ri(-5,5);while(!match&&Rv===Lv)Rv=ri(-5,5);
  var b1=Lv-m1*a,b2=Rv-m2*a;
  var favMode=pick(["third","left","right","none"]);
  var fav=null;
  if(favMode==="third"){fav=ri(-6,6);while(fav===Lv||fav===Rv)fav=ri(-6,6);}
  else if(favMode==="left")fav=Lv;
  else if(favMode==="right")fav=Rv;
  var L=u2qLin(m1,b1),R=u2qLin(m2,b2),piece;
  if(favMode==="third")piece="\\(f(x) = \\begin{cases} "+L+", & x < "+a+" \\\\ "+fav+", & x = "+a+" \\\\ "+R+", & x > "+a+" \\end{cases}\\)";
  else if(favMode==="left")piece="\\(f(x) = \\begin{cases} "+L+", & x \\le "+a+" \\\\ "+R+", & x > "+a+" \\end{cases}\\)";
  else if(favMode==="right")piece="\\(f(x) = \\begin{cases} "+L+", & x < "+a+" \\\\ "+R+", & x \\ge "+a+" \\end{cases}\\)";
  else piece="\\(f(x) = \\begin{cases} "+L+", & x < "+a+" \\\\ "+R+", & x > "+a+" \\end{cases}\\), with \\(f("+a+")\\) undefined";
  var DNE="\\(\\text{does not exist}\\)",UND="\\(\\text{undefined}\\)";
  var favDisp=(fav===null)?null:"\\("+fav+"\\)";
  function takeDs(cands,keyStr){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==null&&c!==keyStr&&out.indexOf(c)<0)out.push(c);}return out.slice(0,3);}
  var q=pick(["left","right","two","value"]),key,ds,sol;
  if(q==="left"){
    key="\\("+Lv+"\\)";
    ds=takeDs(["\\("+Rv+"\\)",favDisp,DNE,"\\("+(Lv+2)+"\\)","\\("+(Lv-2)+"\\)"],key);
    sol="For \\(x\\) just below \\("+a+"\\), the first branch applies.\\[ \\begin{aligned} \\lim_{x \\to "+a+"^-} f(x) &= "+u2qJoin([m1*a,b1])+" \\\\ &= "+Lv+" \\end{aligned} \\] The left-hand limit is <b>\\("+Lv+"\\)</b>.";
  }else if(q==="right"){
    key="\\("+Rv+"\\)";
    ds=takeDs(["\\("+Lv+"\\)",favDisp,DNE,"\\("+(Rv+2)+"\\)","\\("+(Rv-2)+"\\)"],key);
    sol="For \\(x\\) just above \\("+a+"\\), the second branch applies.\\[ \\begin{aligned} \\lim_{x \\to "+a+"^+} f(x) &= "+u2qJoin([m2*a,b2])+" \\\\ &= "+Rv+" \\end{aligned} \\] The right-hand limit is <b>\\("+Rv+"\\)</b>.";
  }else if(q==="two"){
    if(match){
      key="\\("+Lv+"\\)";
      ds=takeDs([favDisp,"\\("+(Lv+2)+"\\)","\\("+(Lv-3)+"\\)",DNE],key);
      sol="The left-hand limit is \\("+Lv+"\\) and the right-hand limit is \\("+Rv+"\\). They agree, so the two-sided limit exists and equals that common value, whatever the function value at the join happens to be. The limit is <b>\\("+Lv+"\\)</b>.";
    }else{
      key=DNE;
      ds=takeDs(["\\("+Lv+"\\)","\\("+Rv+"\\)",favDisp,"\\(0\\)","\\("+(Lv+4)+"\\)","\\("+(Lv-4)+"\\)","\\("+(Rv+4)+"\\)","\\("+(Rv-4)+"\\)"],key);
      sol="The left-hand limit is \\("+Lv+"\\) and the right-hand limit is \\("+Rv+"\\). They are different numbers, so no single value is approached from both sides. The limit <b>does not exist</b>.";
    }
  }else{
    if(fav===null){
      key=UND;
      ds=takeDs(["\\("+Lv+"\\)","\\("+Rv+"\\)",DNE,"\\("+(Lv+3)+"\\)","\\("+(Rv-3)+"\\)"],key);
      sol="Neither branch includes \\(x = "+a+"\\), and the problem states the value there is undefined. So \\(f("+a+")\\) is <b>undefined</b>, even though the one-sided limits are \\("+Lv+"\\) and \\("+Rv+"\\)";
    }else{
      key="\\("+fav+"\\)";
      ds=takeDs(["\\("+Lv+"\\)","\\("+Rv+"\\)",DNE,"\\("+(fav+2)+"\\)","\\("+(fav-3)+"\\)"],key);
      sol="The function value at the join is the value assigned to \\(x = "+a+"\\) by the definition, which is \\("+fav+"\\). It need not equal either one-sided limit. So \\(f("+a+") = \\)<b>\\("+fav+"\\)</b>.";
    }
  }
  var qtext=(q==="left")?("Find \\(\\lim_{x \\to "+a+"^-} f(x)\\)."):(q==="right")?("Find \\(\\lim_{x \\to "+a+"^+} f(x)\\)."):(q==="two")?("Find \\(\\lim_{x \\to "+a+"} f(x)\\)."):("Find \\(f("+a+")\\).");
  return mcq("Let "+piece+". "+qtext,key,ds,sol,{a:a,m1:m1,b1:b1,m2:m2,b2:b2,Lv:Lv,Rv:Rv,favMode:favMode,q:q});
});

E("u2-reciprocal-limit",2,["2.2"],1,"gen",function(){
  var mode=pick(["pos","neg","shiftpos","shiftneg"]);
  var DNE="\\(\\text{does not exist}\\)";
  if(mode==="pos"||mode==="neg"){
    var k=pick([2,3,4,5,6,7,8,9,-2,-3,-4,-5]);
    var dir=(mode==="pos")?"\\infty":"-\\infty";
    var opp=(mode==="pos")?"\\(-\\infty\\)":"\\(\\infty\\)";
    return mcq("Evaluate \\(\\lim_{x \\to "+dir+"} "+u2qFracS(k,"x")+"\\).",
      "\\(0\\)",["\\("+k+"\\)",opp,DNE],
      "As \\(x\\) grows without bound, the numerator stays fixed while the denominator grows, so the fraction shrinks toward zero. This is the basic reciprocal fact: \\(\\frac{1}{x}\\) (and any constant multiple of it) tends to \\(0\\) at infinity. The limit is <b>\\(0\\)</b>.",
      {mode:mode,k:k});
  }
  var c=ri(-8,8);while(c===0)c=ri(-8,8);
  var k2=pick([2,3,4,5,6,7,8,9]),p=pick([1,2]);
  var dShift=[c+k2,c-k2,2*c].filter(function(v){return v!==0&&v!==c;})[0];
  var dir2=(mode==="shiftpos")?"\\infty":"-\\infty";
  var opp2=(mode==="shiftpos")?"\\(\\infty\\)":"\\(-\\infty\\)";
  return mcq("Evaluate \\(\\lim_{x \\to "+dir2+"} \\left("+c+" + "+u2qFracS(k2,p===1?"x":"x^2")+"\\right)\\).",
    "\\("+c+"\\)",["\\(0\\)","\\("+dShift+"\\)",opp2],
    "The reciprocal term tends to \\(0\\) as \\(x\\) grows without bound, since its denominator grows while its numerator stays fixed. That leaves only the constant term. The limit is <b>\\("+c+"\\)</b>.",
    {mode:mode,c:c,k:k2,p:p});
});
E("u2-limit-factor-cancel",2,["2.7"],2,"gen",function(){
  var mode=pick(["sq","quad","cube","both"]);
  if(mode==="sq"){
    var r=ri(-6,6);while(r===0)r=ri(-6,6);
    return mcq("Evaluate \\(\\lim_{x \\to "+r+"} \\frac{x^2 - "+(r*r)+"}{"+u2qDen(r)+"}\\).",
      "\\("+(2*r)+"\\)",["\\("+r+"\\)","\\(0\\)","\\("+(-2*r)+"\\)"],
      "Substitution gives \\(\\frac{0}{0}\\), so factor first.\\[ \\begin{aligned} \\lim_{x \\to "+r+"} \\frac{x^2 - "+(r*r)+"}{"+u2qDen(r)+"} &= \\lim_{x \\to "+r+"} \\frac{\\left("+u2qDen(r)+"\\right)\\left("+u2qDen(-r)+"\\right)}{"+u2qDen(r)+"} \\\\ &= \\lim_{x \\to "+r+"} \\left("+u2qDen(-r)+"\\right) \\\\ &= "+(2*r)+" \\end{aligned} \\] The limit is <b>\\("+(2*r)+"\\)</b>.",
      {mode:mode,r:r,key:2*r});
  }
  if(mode==="quad"){
    var r2=ri(-6,6),s=ri(-6,6);while(s===r2)s=ri(-6,6);
    var num=u2qPoly([1,-(r2+s),r2*s]),key=r2-s;
    var candQ=[r2+s,s-r2,0,key+4,key-4],dsQ=[];
    for(var ci=0;ci<candQ.length;ci++){var cv="\\("+candQ[ci]+"\\)";if(candQ[ci]!==key&&dsQ.indexOf(cv)<0)dsQ.push(cv);}
    return mcq("Evaluate \\(\\lim_{x \\to "+r2+"} \\frac{"+num+"}{"+u2qDen(r2)+"}\\).",
      "\\("+key+"\\)",dsQ.slice(0,3),
      "Substitution gives \\(\\frac{0}{0}\\), so factor the numerator and cancel the common factor.\\[ \\begin{aligned} \\lim_{x \\to "+r2+"} \\frac{"+num+"}{"+u2qDen(r2)+"} &= \\lim_{x \\to "+r2+"} \\frac{\\left("+u2qDen(r2)+"\\right)\\left("+u2qDen(s)+"\\right)}{"+u2qDen(r2)+"} \\\\ &= \\lim_{x \\to "+r2+"} \\left("+u2qDen(s)+"\\right) \\\\ &= "+key+" \\end{aligned} \\] The limit is <b>\\("+key+"\\)</b>.",
      {mode:mode,r:r2,s:s,key:key});
  }
  if(mode==="cube"){
    var r3=pick([2,3,4,5]),sgn=pick(["minus","plus"]),key3=3*r3*r3;
    var top=(sgn==="minus")?("x^3 - "+(r3*r3*r3)):("x^3 + "+(r3*r3*r3));
    var bot=(sgn==="minus")?u2qDen(r3):u2qDen(-r3);
    var pt=(sgn==="minus")?r3:(-r3);
    var fac=(sgn==="minus")?("\\left("+u2qDen(r3)+"\\right)\\left("+u2qPoly([1,r3,r3*r3])+"\\right)"):("\\left("+u2qDen(-r3)+"\\right)\\left("+u2qPoly([1,-r3,r3*r3])+"\\right)");
    var rem=(sgn==="minus")?u2qPoly([1,r3,r3*r3]):u2qPoly([1,-r3,r3*r3]);
    return mcq("Evaluate \\(\\lim_{x \\to "+pt+"} \\frac{"+top+"}{"+bot+"}\\).",
      "\\("+key3+"\\)",["\\("+(r3*r3)+"\\)","\\("+(2*r3*r3)+"\\)","\\(0\\)"],
      "Substitution gives \\(\\frac{0}{0}\\). Factor the numerator as a difference (or sum) of cubes and cancel.\\[ \\begin{aligned} \\lim_{x \\to "+pt+"} \\frac{"+top+"}{"+bot+"} &= \\lim_{x \\to "+pt+"} "+rem+" \\\\ &= "+key3+" \\end{aligned} \\] The limit is <b>\\("+key3+"\\)</b>.",
      {mode:mode,r:r3,sgn:sgn,key:key3});
  }
  var r4=ri(-5,5),s4=ri(-5,5),t4=ri(-5,5);
  while(s4===r4||t4===r4||s4===t4||2*r4===s4+t4){r4=ri(-5,5);s4=ri(-5,5);t4=ri(-5,5);}
  var numB=u2qPoly([1,-(r4+s4),r4*s4]),denB=u2qPoly([1,-(r4+t4),r4*t4]);
  var keyB=u2qFrac(r4-s4,r4-t4);
  return mcq("Evaluate \\(\\lim_{x \\to "+r4+"} \\frac{"+numB+"}{"+denB+"}\\).",
    keyB,[u2qFrac(r4-t4,r4-s4),"\\(1\\)",u2qFrac(s4-r4,r4-t4)],
    "Both parts factor, and the factor \\(\\left("+u2qDen(r4)+"\\right)\\) is common.\\[ \\begin{aligned} \\lim_{x \\to "+r4+"} \\frac{"+numB+"}{"+denB+"} &= \\lim_{x \\to "+r4+"} \\frac{\\left("+u2qDen(s4)+"\\right)}{\\left("+u2qDen(t4)+"\\right)} \\\\ &= "+u2qFracRaw(r4-s4,r4-t4)+" \\end{aligned} \\] The limit is <b>"+keyB+"</b>.",
    {mode:mode,r:r4,s:s4,t:t4});
});
E("u2-limit-conjugate",2,["2.7"],2,"gen",function(){
  var mode=pick(["atzero","atpoint","flipped"]);
  if(mode==="atzero"){
    var k=pick([2,3,4,5,6]);
    return mcq("Evaluate \\(\\lim_{x \\to 0} \\frac{\\sqrt{x + "+(k*k)+"} - "+k+"}{x}\\).",
      u2qFrac(1,2*k),[u2qFrac(1,k),"\\("+(2*k)+"\\)","\\(0\\)"],
      "Substitution gives \\(\\frac{0}{0}\\). Multiply by the conjugate of the numerator.\\[ \\begin{aligned} \\lim_{x \\to 0} \\frac{\\sqrt{x + "+(k*k)+"} - "+k+"}{x} &= \\lim_{x \\to 0} \\frac{x}{x\\left(\\sqrt{x + "+(k*k)+"} + "+k+"\\right)} \\\\ &= \\lim_{x \\to 0} \\frac{1}{\\sqrt{x + "+(k*k)+"} + "+k+"} \\\\ &= \\frac{1}{"+(2*k)+"} \\end{aligned} \\] The limit is <b>"+u2qFrac(1,2*k)+"</b>.",
      {mode:mode,k:k});
  }
  var s=pick([2,3,4,5]),r=ri(1,9),c=s*s-r;
  var rootArg=u2qLin(1,c);
  if(mode==="atpoint"){
    return mcq("Evaluate \\(\\lim_{x \\to "+r+"} \\frac{\\sqrt{"+rootArg+"} - "+s+"}{"+u2qDen(r)+"}\\).",
      u2qFrac(1,2*s),[u2qFrac(1,s),"\\("+(2*s)+"\\)","\\(0\\)"],
      "Substitution gives \\(\\frac{0}{0}\\), since the root equals \\("+s+"\\) at \\(x = "+r+"\\). Multiply by the conjugate.\\[ \\begin{aligned} \\lim_{x \\to "+r+"} \\frac{\\sqrt{"+rootArg+"} - "+s+"}{"+u2qDen(r)+"} &= \\lim_{x \\to "+r+"} \\frac{"+u2qDen(r)+"}{\\left("+u2qDen(r)+"\\right)\\left(\\sqrt{"+rootArg+"} + "+s+"\\right)} \\\\ &= \\frac{1}{"+s+" + "+s+"} \\\\ &= "+u2qFracRaw(1,2*s)+" \\end{aligned} \\] The limit is <b>"+u2qFrac(1,2*s)+"</b>.",
      {mode:mode,s:s,r:r});
  }
  return mcq("Evaluate \\(\\lim_{x \\to "+r+"} \\frac{"+u2qDen(r)+"}{\\sqrt{"+rootArg+"} - "+s+"}\\).",
    "\\("+(2*s)+"\\)",["\\("+s+"\\)",u2qFrac(1,2*s),"\\(0\\)"],
    "Substitution gives \\(\\frac{0}{0}\\). Multiply top and bottom by the conjugate of the denominator; the root terms then produce a factor of \\("+u2qDen(r)+"\\) that cancels.\\[ \\begin{aligned} \\lim_{x \\to "+r+"} \\frac{"+u2qDen(r)+"}{\\sqrt{"+rootArg+"} - "+s+"} &= \\lim_{x \\to "+r+"} \\frac{\\left("+u2qDen(r)+"\\right)\\left(\\sqrt{"+rootArg+"} + "+s+"\\right)}{"+u2qDen(r)+"} \\\\ &= "+s+" + "+s+" \\\\ &= "+(2*s)+" \\end{aligned} \\] The limit is <b>\\("+(2*s)+"\\)</b>.",
    {mode:mode,s:s,r:r});
});

E("u2-limit-complex-fraction",2,["2.6","2.7"],2,"gen",function(){
  var mode=pick(["shift","point","scaled","recip"]);
  if(mode==="shift"){
    var a=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
    var inner="\\frac{1}{"+u2qDen(-a)+"} "+(a>0?("- \\frac{1}{"+a+"}"):("+ \\frac{1}{"+(-a)+"}"));
    var aDisp=(a>0)?(""+a):("\\left("+a+"\\right)");
    var denProd=aDisp+"\\left("+u2qDen(-a)+"\\right)";
    return mcq("Evaluate \\(\\lim_{x \\to 0} \\frac{"+inner+"}{x}\\).",
      u2qFrac(-1,a*a),[u2qFrac(1,a*a),u2qFrac(-1,a),"\\(0\\)"],
      "Combine the fractions in the numerator over a common denominator, then cancel the factor of \\(x\\).\\[ \\begin{aligned} \\lim_{x \\to 0} \\frac{"+inner+"}{x} &= \\lim_{x \\to 0} \\frac{\\frac{-x}{"+denProd+"}}{x} \\\\ &= \\lim_{x \\to 0} \\frac{-1}{"+denProd+"} \\\\ &= \\frac{-1}{\\left("+a+"\\right)^2} \\\\ &= "+u2qFracRaw(-1,a*a)+" \\end{aligned} \\] The limit is <b>"+u2qFrac(-1,a*a)+"</b>.",
      {mode:mode,a:a,key:u2qFracRaw(-1,a*a)});
  }
  if(mode==="point"){
    var r=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
    var inner2="\\frac{1}{x} "+(r>0?("- \\frac{1}{"+r+"}"):("+ \\frac{1}{"+(-r)+"}"));
    return mcq("Evaluate \\(\\lim_{x \\to "+r+"} \\frac{"+inner2+"}{"+u2qDen(r)+"}\\).",
      u2qFrac(-1,r*r),[u2qFrac(1,r*r),u2qFrac(-1,r),"\\(0\\)"],
      "Combine the fractions in the numerator, then cancel the common factor.\\[ \\begin{aligned} \\lim_{x \\to "+r+"} \\frac{"+inner2+"}{"+u2qDen(r)+"} &= \\lim_{x \\to "+r+"} \\frac{\\frac{"+r+" - x}{"+r+"x}}{"+u2qDen(r)+"} \\\\ &= \\lim_{x \\to "+r+"} \\frac{-1}{"+r+"x} \\\\ &= \\frac{-1}{\\left("+r+"\\right)^2} \\\\ &= "+u2qFracRaw(-1,r*r)+" \\end{aligned} \\] The limit is <b>"+u2qFrac(-1,r*r)+"</b>.",
      {mode:mode,r:r,key:u2qFracRaw(-1,r*r)});
  }
  if(mode==="scaled"){
    var a3=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
    var inner3="\\frac{"+a3+"}{"+u2qDen(-a3)+"} - 1";
    return mcq("Evaluate \\(\\lim_{x \\to 0} \\frac{"+inner3+"}{x}\\).",
      u2qFrac(-1,a3),[u2qFrac(1,a3),(a3>0?"\\(-1\\)":"\\(1\\)"),"\\(0\\)"],
      "Write the numerator over a common denominator; the constants cancel and a factor of \\(x\\) remains.\\[ \\begin{aligned} \\lim_{x \\to 0} \\frac{"+inner3+"}{x} &= \\lim_{x \\to 0} \\frac{\\frac{-x}{"+u2qDen(-a3)+"}}{x} \\\\ &= \\lim_{x \\to 0} \\frac{-1}{"+u2qDen(-a3)+"} \\\\ &= "+u2qFracRaw(-1,a3)+" \\end{aligned} \\] The limit is <b>"+u2qFrac(-1,a3)+"</b>.",
      {mode:mode,a:a3,key:u2qFracRaw(-1,a3)});
  }
  var a4=pick([2,3,4,5,6,7,8,9]);
  var inner4="\\frac{1}{"+a4+" - x} - \\frac{1}{"+a4+"}";
  return mcq("Evaluate \\(\\lim_{x \\to 0} \\frac{"+inner4+"}{x}\\).",
    u2qFrac(1,a4*a4),[u2qFrac(-1,a4*a4),u2qFrac(1,a4),"\\(0\\)"],
    "Combine the fractions in the numerator over a common denominator, then cancel the factor of \\(x\\).\\[ \\begin{aligned} \\lim_{x \\to 0} \\frac{"+inner4+"}{x} &= \\lim_{x \\to 0} \\frac{\\frac{x}{"+a4+"\\left("+a4+" - x\\right)}}{x} \\\\ &= \\lim_{x \\to 0} \\frac{1}{"+a4+"\\left("+a4+" - x\\right)} \\\\ &= "+u2qFracRaw(1,a4*a4)+" \\end{aligned} \\] The limit is <b>"+u2qFrac(1,a4*a4)+"</b>.",
    {mode:mode,a:a4,key:u2qFracRaw(1,a4*a4)});
});
E("u2-limit-infinite",2,["2.8"],1,"gen",function(){
  var form=pick(["pow","lin"]);
  var a=ri(-5,5),side=pick(["+","-"]);
  var DNE="\\(\\text{does not exist}\\)";
  var key,opp,ds,sol;
  if(form==="pow"){
    var p=pick([1,2]),c=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
    var denSign=(side==="+")?1:(p===1?-1:1);
    var vs=(c>0?1:-1)*denSign;
    key=(vs>0)?"\\(\\infty\\)":"\\(-\\infty\\)";
    opp=(vs>0)?"\\(-\\infty\\)":"\\(\\infty\\)";
    ds=[opp,"\\(0\\)",DNE];
    sol="As \\(x\\) approaches \\("+a+"\\) from the "+(side==="+"?"right":"left")+", the denominator shrinks toward \\(0\\) while the numerator stays at \\("+c+"\\), so the values grow without bound. The denominator is "+((p===2)?"positive on both sides, since it is a square":(side==="+"?"positive just right of the point":"negative just left of the point"))+", and the numerator is "+(c>0?"positive":"negative")+", which fixes the sign. The limit is <b>"+key+"</b>.";
    return mcq("Find \\(\\lim_{x \\to "+a+"^"+side+"} f(x)\\) for \\(f(x) = "+FR(""+c,"("+u2qDen(a)+")"+(p===2?"^2":""))+"\\).",
      key,ds,sol,{form:form,a:a,side:side,p:p,c:c});
  }
  var b=ri(-7,7);while(a+b===0)b=ri(-7,7);
  var nv=a+b;
  var denSign2=(side==="+")?1:-1;
  var vs2=(nv>0?1:-1)*denSign2;
  key=(vs2>0)?"\\(\\infty\\)":"\\(-\\infty\\)";
  opp=(vs2>0)?"\\(-\\infty\\)":"\\(\\infty\\)";
  ds=[opp,"\\("+nv+"\\)",DNE];
  sol="As \\(x\\) approaches \\("+a+"\\) from the "+(side==="+"?"right":"left")+", the numerator approaches \\("+nv+"\\) while the denominator shrinks to \\(0\\), "+(side==="+"?"staying positive":"staying negative")+" on that side. A fixed nonzero numerator over a shrinking denominator grows without bound, with the sign set by the two signs. The limit is <b>"+key+"</b>.";
  return mcq("Find \\(\\lim_{x \\to "+a+"^"+side+"} f(x)\\) for \\(f(x) = "+FR(u2qLin(1,b),u2qDen(a))+"\\).",
    key,ds,sol,{form:form,a:a,side:side,b:b});
});

E("u2-asymptote-behaviour",2,["2.9"],2,"gen",function(){
  var form=pick(["simple","linear"]);
  var a=ri(-5,5),s,fr;
  if(form==="simple"){
    var c=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
    s=(c>0)?1:-1;fr=FR(""+c,u2qDen(a));
  }else{
    var b=ri(-7,7);while(a+b===0)b=ri(-7,7);
    s=(a+b>0)?1:-1;fr=FR(u2qLin(1,b),u2qDen(a));
  }
  function inf(v){return v>0?"\\infty":"-\\infty";}
  function stmt(L,R){return "As \\(x \\to "+a+"^-\\), \\(f(x) \\to "+inf(L)+"\\), and as \\(x \\to "+a+"^+\\), \\(f(x) \\to "+inf(R)+"\\)";}
  var key=stmt(-s,s);
  var ds=[stmt(s,-s),stmt(s,s),stmt(-s,-s)];
  return mcq("Let \\(f(x) = "+fr+"\\). Which statement describes the behaviour of \\(f\\) near \\(x = "+a+"\\)?",
    key,ds,
    "The denominator is zero at \\(x = "+a+"\\) while the numerator is not, so there is a vertical asymptote there. Just right of the point the denominator is a small positive number and the numerator keeps the sign it has at the point, giving "+(s>0?"positive":"negative")+" infinity; just left of the point the denominator is a small negative number, which flips the sign. So the two sides head to opposite infinities: <b>down on the "+(s>0?"left":"right")+" side and up on the other</b>, matching the key statement.",
    {form:form,a:a,formSign:s});
});
E("u2-limit-at-infinity",2,["2.10"],1,"gen",function(){
  var mode=pick(["less","equal","greater1","greater2"]);
  var dir=pick(["\\infty","-\\infty"]);
  var dirNeg=(dir.charAt(0)==="-");
  var key,ds,num,den,degN,degD,sol;
  function infStr(v){return v>0?"\\(\\infty\\)":"\\(-\\infty\\)";}
  if(mode==="less"){
    var A=pick([1,2,3,4,-1,-2,-3]),B=ri(-8,8),C=pick([1,2,3,-1,-2]),D=ri(-6,6),E2=ri(-6,6);
    num=u2qPoly([A,B]);den=u2qPoly([C,D,E2]);degN=1;degD=2;
    key="\\(0\\)";
    var d1=u2qFrac(A,C),d2=u2qFrac(C,A);
    ds=[d1,"\\(\\infty\\)",(d1===d2)?"\\(-\\infty\\)":d2];
    sol="The denominator has the higher degree, so it outgrows the numerator and the fraction shrinks to zero. (Dividing top and bottom by \\(x^2\\) sends every term to \\(0\\).) The limit is <b>\\(0\\)</b>.";
  }else if(mode==="equal"){
    var A2=pick([1,2,3,4,5,-1,-2,-3]),B2=ri(-8,8),C2=ri(-8,8),D2=pick([1,2,3,4,-1,-2,-3]),E3=ri(-6,6),F=ri(-6,6);
    while(Math.abs(A2)===Math.abs(D2))D2=pick([1,2,3,4,-1,-2,-3]);
    num=u2qPoly([A2,B2,C2]);den=u2qPoly([D2,E3,F]);degN=2;degD=2;
    key=u2qFrac(A2,D2);
    ds=[u2qFrac(D2,A2),"\\(0\\)","\\(\\infty\\)"];
    sol="The degrees are equal, so the limit is the ratio of the leading coefficients.\\[ \\begin{aligned} \\lim_{x \\to "+dir+"} \\frac{"+num+"}{"+den+"} &= \\frac{"+A2+"}{"+D2+"} \\\\ &= "+u2qFracRaw(A2,D2)+" \\end{aligned} \\] The limit is <b>"+key+"</b>.";
  }else{
    var odd=(mode==="greater1");
    var A3=pick([1,2,3,-1,-2]),B3=ri(-6,6),C3=ri(-6,6),D3=pick([1,2,-1,-2]),E4=ri(-6,6);
    if(odd){num=u2qPoly([A3,B3,C3]);degN=2;}
    else{num=u2qPoly([A3,B3,C3,ri(-6,6)]);degN=3;}
    den=u2qPoly([D3,E4]);degD=1;
    var lead=(A3*D3>0)?1:-1;
    var sgn=odd?(lead*(dirNeg?-1:1)):lead;
    key=infStr(sgn);ds=[infStr(-sgn),"\\(0\\)",u2qFrac(A3,D3)];
    sol="The numerator has the higher degree, so the fraction grows without bound. Its end behaviour matches the ratio of the leading terms, \\("+u2qFracRaw(A3,D3)+"x^{"+(degN-degD)+"}\\), whose sign "+(dirNeg?"as \\(x \\to -\\infty\\)":"as \\(x \\to \\infty\\)")+" is "+(sgn>0?"positive":"negative")+". The limit is <b>"+key+"</b>.";
  }
  return mcq("Evaluate \\(\\lim_{x \\to "+dir+"} \\frac{"+num+"}{"+den+"}\\).",
    key,ds,sol,{mode:mode,dir:dir});
});
E("u2-horizontal-asymptote",2,["2.11"],1,"gen",function(){
  var mode=pick(["less","equal","greater"]);
  var NONE="\\(\\text{no horizontal asymptote}\\)";
  var key,ds,num,den,sol;
  if(mode==="less"){
    var A=pick([1,2,3,4,-1,-2,-3]),B=ri(-8,8),C=pick([1,2,3,-1,-2]),D=ri(-6,6),E2=ri(-6,6);
    num=u2qPoly([A,B]);den=u2qPoly([C,D,E2]);
    key="\\(y = 0\\)";
    var o1="\\(y = "+u2qFracRaw(A,C)+"\\)",o2="\\(y = "+u2qFracRaw(C,A)+"\\)";
    ds=[o1,(o1===o2)?("\\(y = "+u2qFracRaw(2*A,C)+"\\)"):o2,NONE];
    sol="The degree of the denominator is larger, so the limit at both infinities is \\(0\\), and the graph flattens toward the line \\(y = 0\\). The horizontal asymptote is <b>\\(y = 0\\)</b>.";
  }else if(mode==="equal"){
    var A2=pick([1,2,3,4,5,-1,-2,-3]),B2=ri(-8,8),C2=ri(-8,8),D2=pick([1,2,3,4,-1,-2,-3]),E3=ri(-6,6),F=ri(-6,6);
    while(Math.abs(A2)===Math.abs(D2))D2=pick([1,2,3,4,-1,-2,-3]);
    num=u2qPoly([A2,B2,C2]);den=u2qPoly([D2,E3,F]);
    key="\\(y = "+u2qFracRaw(A2,D2)+"\\)";
    ds=["\\(y = 0\\)","\\(y = "+u2qFracRaw(D2,A2)+"\\)",NONE];
    sol="The degrees are equal, so both end limits equal the ratio of the leading coefficients, \\("+u2qFracRaw(A2,D2)+"\\). The horizontal asymptote is <b>\\(y = "+u2qFracRaw(A2,D2)+"\\)</b>.";
  }else{
    var A3=pick([1,2,3,-1,-2]),B3=ri(-6,6),C3=ri(-6,6),D3=pick([1,2,-1,-2]),E4=ri(-6,6);
    while(Math.abs(A3)===Math.abs(D3))D3=pick([1,2,-1,-2]);
    num=u2qPoly([A3,B3,C3]);den=u2qPoly([D3,E4]);
    key=NONE;
    ds=["\\(y = 0\\)","\\(y = "+u2qFracRaw(A3,D3)+"\\)","\\(y = "+u2qFracRaw(D3,A3)+"\\)"];
    sol="The degree of the numerator is larger, so the values grow without bound at both ends instead of settling to a constant. There is <b>no horizontal asymptote</b> (the end behaviour is described by an oblique asymptote instead).";
  }
  return mcq("What is the horizontal asymptote of the graph of \\(f(x) = \\frac{"+num+"}{"+den+"}\\)?",
    key,ds,sol,{mode:mode});
});
E("u2-oblique-asymptote",2,["2.12"],2,"gen",function(){
  var A=pick([1,2,3,-1,-2]),r=ri(-5,5);while(r===0)r=ri(-5,5);
  var B=ri(-6,6),C=ri(-9,9);
  var key,ds;
  for(var tries=0;tries<60;tries++){
    var q=B+A*r;
    key="\\(y = "+u2qLin(A,q)+"\\)";
    ds=["\\(y = "+u2qLin(A,B)+"\\)","\\(y = "+u2qLin(A,B-A*r)+"\\)","\\(y = "+u2qLin(q,A)+"\\)"];
    if(new Set([key].concat(ds)).size===4)break;
    B++;
  }
  var q2=B+A*r,rem=C+q2*r;
  var numP=u2qPoly([A,B,C]);
  return mcq("Find the oblique (slant) asymptote of the graph of \\(f(x) = "+FR(numP,u2qDen(r))+"\\).",
    key,ds,
    "Divide the numerator by the denominator.\\[ \\begin{aligned} "+numP+" &= \\left("+u2qDen(r)+"\\right)\\left("+u2qLin(A,q2)+"\\right) + "+rem+" \\end{aligned} \\] So \\(f(x) = "+u2qLin(A,q2)+" + "+FR(""+rem,u2qDen(r))+"\\), and the fraction term tends to \\(0\\) as \\(x\\) grows. The graph approaches the line given by the quotient. The oblique asymptote is <b>\\(y = "+u2qLin(A,q2)+"\\)</b>.",
    {A:A,B:B,C:C,r:r});
});
E("u2-discontinuity-type",2,["2.13","2.14"],1,"var",varset([
  function(){return mcq("The graph of \\(f(x) = \\frac{x^2 - 16}{x - 4}\\) is a straight line with a single break at \\(x = 4\\), where the function is undefined; the graph approaches the same height from both sides of the break. What type of discontinuity occurs at \\(x = 4\\)?",
    "A removable discontinuity",["A jump discontinuity","An infinite discontinuity","An oscillating discontinuity"],
    "The two-sided limit at \\(x = 4\\) exists (it is \\(8\\)), but the function is not defined there. A missing point that could be filled by defining the value is a removable discontinuity. The type is <b>a removable discontinuity</b>.",
    {v:1});},
  function(){return mcq("Let \\(f(x) = \\begin{cases} x + 2, & x < 1 \\\\ 5 - x, & x \\ge 1 \\end{cases}\\). The graph approaches \\(3\\) from the left at \\(x = 1\\) and \\(4\\) from the right. What type of discontinuity occurs at \\(x = 1\\)?",
    "A jump discontinuity",["A removable discontinuity","An infinite discontinuity","An oscillating discontinuity"],
    "Both one-sided limits exist as finite numbers, but they differ (\\(3\\) from the left, \\(4\\) from the right), so the graph leaps from one height to another. The type is <b>a jump discontinuity</b>.",
    {v:2});},
  function(){return mcq("For \\(f(x) = \\frac{3}{(x + 2)^2}\\), the values of \\(f(x)\\) grow without bound as \\(x\\) approaches \\(-2\\) from either side. What type of discontinuity occurs at \\(x = -2\\)?",
    "An infinite discontinuity",["A removable discontinuity","A jump discontinuity","An oscillating discontinuity"],
    "The function values blow up to positive infinity on both sides of \\(x = -2\\), where the graph has a vertical asymptote. The type is <b>an infinite discontinuity</b>.",
    {v:3});},
  function(){return mcq("The graph of \\(f(x) = \\sin\\left(\\frac{1}{x}\\right)\\) swings between \\(-1\\) and \\(1\\) faster and faster as \\(x\\) approaches \\(0\\), never settling toward any value. What type of discontinuity occurs at \\(x = 0\\)?",
    "An oscillating discontinuity",["A removable discontinuity","A jump discontinuity","An infinite discontinuity"],
    "The function keeps oscillating between fixed bounds as the point is approached, so no limit exists, yet the values stay bounded (ruling out an infinite discontinuity). The type is <b>an oscillating discontinuity</b>.",
    {v:4});},
  function(){return mcq("For \\(f(x) = \\frac{|x - 2|}{x - 2}\\), the values equal \\(-1\\) for every \\(x\\) just left of \\(2\\) and \\(1\\) for every \\(x\\) just right of \\(2\\). What type of discontinuity occurs at \\(x = 2\\)?",
    "A jump discontinuity",["A removable discontinuity","An infinite discontinuity","An oscillating discontinuity"],
    "The left-hand limit is \\(-1\\) and the right-hand limit is \\(1\\): both exist and are finite, but they are unequal, so the graph jumps. The type is <b>a jump discontinuity</b>.",
    {v:5});}
]));

E("u2-continuity-definition",2,["2.15","2.16"],3,"gen",function(){
  var form=pick(["linleft","quadleft","quadk"]);
  if(form==="linleft"){
    var k0=ri(-4,4),a=ri(-3,3);while(a===0)a=ri(-3,3);
    var b=ri(-6,6),m=pick([1,2,-1,-2,3]);
    var Rv=k0*a+b,n=Rv-m*a;
    var left="kx"+(b>0?" + "+b:(b<0?" - "+(-b):""));
    var piece="\\(f(x) = \\begin{cases} "+left+", & x \\le "+a+" \\\\ "+u2qLin(m,n)+", & x > "+a+" \\end{cases}\\)";
    return numq("Let "+piece+". Find the value of \\(k\\) that makes \\(f\\) continuous at \\(x = "+a+"\\).",
      k0,0.011,
      "Continuity at \\(x = "+a+"\\) requires the two one-sided limits to agree with the function value there, which comes from the first branch.\\[ \\begin{aligned} \\lim_{x \\to "+a+"^-} f(x) &= "+a+"k"+(b>0?" + "+b:(b<0?" - "+(-b):""))+" \\\\ \\lim_{x \\to "+a+"^+} f(x) &= "+Rv+" \\end{aligned} \\] Setting them equal: \\("+a+"k"+(b>0?" + "+b:(b<0?" - "+(-b):""))+" = "+Rv+"\\), so \\(k = "+k0+"\\). The value is <b>\\("+k0+"\\)</b>.",
      {form:form,a:a,k:k0});
  }
  if(form==="quadleft"){
    var a2=ri(-3,3),m2=pick([1,2,-1,-2,3]),n2=ri(-6,6);
    var k2=m2*a2+n2-a2*a2;
    var piece2="\\(f(x) = \\begin{cases} x^2 + k, & x < "+a2+" \\\\ "+u2qLin(m2,n2)+", & x \\ge "+a2+" \\end{cases}\\)";
    return numq("Let "+piece2+". Find the value of \\(k\\) that makes \\(f\\) continuous at \\(x = "+a2+"\\).",
      k2,0.011,
      "Continuity at \\(x = "+a2+"\\) requires the left-hand limit to equal the function value, which comes from the second branch.\\[ \\begin{aligned} \\lim_{x \\to "+a2+"^-} f(x) &= "+(a2*a2)+" + k \\\\ f\\left("+a2+"\\right) &= "+(m2*a2+n2)+" \\end{aligned} \\] Setting them equal: \\("+(a2*a2)+" + k = "+(m2*a2+n2)+"\\), so \\(k = "+k2+"\\). The value is <b>\\("+k2+"\\)</b>.",
      {form:form,a:a2,k:k2});
  }
  var k3=ri(-3,3);while(k3===0)k3=ri(-3,3);
  var a3=ri(-3,3);while(a3===0)a3=ri(-3,3);
  var b3=ri(-6,6),Rv3=k3*a3*a3+b3;
  var left3="kx^2"+(b3>0?" + "+b3:(b3<0?" - "+(-b3):""));
  var piece3="\\(f(x) = \\begin{cases} "+left3+", & x \\le "+a3+" \\\\ "+Rv3+", & x > "+a3+" \\end{cases}\\)";
  return numq("Let "+piece3+". Find the value of \\(k\\) that makes \\(f\\) continuous at \\(x = "+a3+"\\).",
    k3,0.011,
    "Continuity at \\(x = "+a3+"\\) requires the two one-sided limits to agree with the function value there, which comes from the first branch.\\[ \\begin{aligned} \\lim_{x \\to "+a3+"^-} f(x) &= "+(a3*a3)+"k"+(b3>0?" + "+b3:(b3<0?" - "+(-b3):""))+" \\\\ \\lim_{x \\to "+a3+"^+} f(x) &= "+Rv3+" \\end{aligned} \\] Setting them equal: \\("+(a3*a3)+"k"+(b3>0?" + "+b3:(b3<0?" - "+(-b3):""))+" = "+Rv3+"\\), so \\(k = "+k3+"\\). The value is <b>\\("+k3+"\\)</b>.",
    {form:form,a:a3,k:k3});
});
E("u2-continuity-interval",2,["2.17"],3,"gen",function(){
  var a=pick([-3,-2,-1]),b=pick([3,4,5]),c=pick([0,1,2]);
  while(!(a<c&&c<b)){c=pick([0,1,2]);a=pick([-3,-2,-1]);b=pick([3,4,5]);}
  var p=ri(-4,4);while(a*a+p===0)p=ri(-4,4);
  var V=a*a+p,q=V*(a-c);
  var Lb=q/(b-c);
  var W=Number.isInteger(Lb)?(Lb+2):(Math.round(Lb)+1);
  var m=pick([1,2,-1]),n=W-m*b;
  var piece="\\(f(x) = \\begin{cases} "+u2qPoly([1,0,p])+", & x \\le "+a+" \\\\ \\frac{"+q+"}{"+u2qDen(c)+"}, & "+a+" < x < "+b+" \\\\ "+u2qLin(m,n)+", & x \\ge "+b+" \\end{cases}\\)";
  var key="\\(f\\) is continuous at \\(x = "+a+"\\), has an infinite discontinuity at \\(x = "+c+"\\), and a jump discontinuity at \\(x = "+b+"\\)";
  var ds=[
    "\\(f\\) is continuous at \\(x = "+a+"\\) and at \\(x = "+b+"\\), and has an infinite discontinuity at \\(x = "+c+"\\) as its only break",
    "\\(f\\) has a discontinuity at each of the three points \\(x = "+a+"\\), \\(x = "+c+"\\), and \\(x = "+b+"\\) on the interval",
    "\\(f\\) is continuous at \\(x = "+a+"\\) and at \\(x = "+b+"\\), and has a removable discontinuity at \\(x = "+c+"\\) as its only break"];
  return mcq("Let "+piece+". Which statement about the continuity of \\(f\\) is correct?",
    key,ds,
    "Check each special point with the definition of continuity. At \\(x = "+a+"\\): the value is \\(f("+a+") = "+V+"\\), and the limit from the right is \\(\\frac{"+q+"}{"+a+" - "+c+"} = "+V+"\\), matching the value from the left branch, so \\(f\\) is continuous there. At \\(x = "+c+"\\): the middle branch has denominator \\(0\\) with numerator \\("+q+"\\), so the values blow up: an infinite discontinuity. At \\(x = "+b+"\\): the limit from the left is \\("+u2qFracRaw(q,b-c)+"\\) but \\(f("+b+") = "+W+"\\), so the graph jumps. Away from these points each branch is continuous on its own interval. The correct statement is the one naming <b>continuity at \\("+a+"\\), an infinite discontinuity at \\("+c+"\\), and a jump at \\("+b+"\\)</b>.",
    {a:a,b:b,c:c,p:p,q:q});
});
E("u2-removable-redefine",2,["2.18"],3,"gen",function(){
  var mode=pick(["quad","sq","both"]);
  if(mode==="quad"){
    var r=ri(-6,6),s=ri(-6,6);while(s===r)s=ri(-6,6);
    var num=u2qPoly([1,-(r+s),r*s]),ans=r-s;
    return numq("The function \\(f(x) = \\frac{"+num+"}{"+u2qDen(r)+"}\\) is undefined at \\(x = "+r+"\\), and the discontinuity there is removable. The function is redefined by setting \\(f("+r+") = m\\), which makes the redefined function continuous at \\(x = "+r+"\\). Find \\(m\\).",
      ans,0.011,
      "To remove the discontinuity, the new value must equal the limit at the point. Factor and cancel first.\\[ \\begin{aligned} \\lim_{x \\to "+r+"} \\frac{"+num+"}{"+u2qDen(r)+"} &= \\lim_{x \\to "+r+"} \\left("+u2qDen(s)+"\\right) \\\\ &= "+ans+" \\end{aligned} \\] So the redefined value must be <b>\\("+ans+"\\)</b>.",
      {mode:mode,r:r,s:s,ans:ans});
  }
  if(mode==="sq"){
    var r2=ri(-6,6);while(r2===0)r2=ri(-6,6);
    var ans2=2*r2;
    return numq("The function \\(f(x) = \\frac{x^2 - "+(r2*r2)+"}{"+u2qDen(r2)+"}\\) is undefined at \\(x = "+r2+"\\), and the discontinuity there is removable. The function is redefined by setting \\(f("+r2+") = m\\), which makes the redefined function continuous at \\(x = "+r2+"\\). Find \\(m\\).",
      ans2,0.011,
      "To remove the discontinuity, the new value must equal the limit at the point. Factor as a difference of squares and cancel.\\[ \\begin{aligned} \\lim_{x \\to "+r2+"} \\frac{x^2 - "+(r2*r2)+"}{"+u2qDen(r2)+"} &= \\lim_{x \\to "+r2+"} \\left("+u2qDen(-r2)+"\\right) \\\\ &= "+ans2+" \\end{aligned} \\] So the redefined value must be <b>\\("+ans2+"\\)</b>.",
      {mode:mode,r:r2,ans:ans2});
  }
  var r3=ri(-4,4),d1=pick([1,2,4,-1,-2,-4]),kk=ri(-4,4);while(kk===0)kk=ri(-4,4);
  var t=r3-d1,s3=r3-kk*d1;
  var numB=u2qPoly([1,-(r3+s3),r3*s3]),denB=u2qPoly([1,-(r3+t),r3*t]);
  return numq("The function \\(f(x) = \\frac{"+numB+"}{"+denB+"}\\) is undefined at \\(x = "+r3+"\\), and the discontinuity there is removable. The function is redefined by setting \\(f("+r3+") = m\\), which makes the redefined function continuous at \\(x = "+r3+"\\). Find \\(m\\).",
    kk,0.011,
    "To remove the discontinuity, the new value must equal the limit at the point. Both parts share the factor \\(\\left("+u2qDen(r3)+"\\right)\\); cancel it and substitute.\\[ \\begin{aligned} \\lim_{x \\to "+r3+"} \\frac{"+numB+"}{"+denB+"} &= \\lim_{x \\to "+r3+"} \\frac{"+u2qDen(s3)+"}{"+u2qDen(t)+"} \\\\ &= "+u2qFracRaw(r3-s3,r3-t)+" \\\\ &= "+kk+" \\end{aligned} \\] So the redefined value must be <b>\\("+kk+"\\)</b>.",
    {mode:mode,r:r3,t:t,ans:kk});
});
E("u2-limit-absvalue",2,["2.7","2.8"],3,"gen",function(){
  var mode=pick(["sign","oneside","square"]);
  var DNE="\\(\\text{does not exist}\\)";
  if(mode==="sign"){
    var a=ri(-6,6);while(a===0)a=ri(-6,6);
    return mcq("Evaluate \\(\\lim_{x \\to "+a+"} \\frac{|"+u2qDen(a)+"|}{"+u2qDen(a)+"}\\).",
      DNE,["\\(1\\)","\\(-1\\)","\\(0\\)"],
      "The quotient is a sign ratio: for \\(x\\) just right of \\("+a+"\\) the expression inside the absolute value is positive, so the quotient equals \\(1\\); for \\(x\\) just left of \\("+a+"\\) it is negative, so the quotient equals \\(-1\\). The one-sided limits disagree, so the two-sided limit <b>does not exist</b>.",
      {mode:mode,a:a});
  }
  if(mode==="oneside"){
    var a2=ri(-6,6);while(a2===0)a2=ri(-6,6);
    var side=pick(["+","-"]),kv=(side==="+")?1:-1;
    return mcq("Evaluate \\(\\lim_{x \\to "+a2+"^"+side+"} \\frac{|"+u2qDen(a2)+"|}{"+u2qDen(a2)+"}\\).",
      "\\("+kv+"\\)",["\\("+(-kv)+"\\)","\\(0\\)",DNE],
      "On the "+(side==="+"?"right":"left")+" side of \\("+a2+"\\), the expression inside the absolute value is "+(side==="+"?"positive":"negative")+" throughout, so the absolute value can be removed with a "+(side==="+"?"plus":"minus")+" sign and the quotient is constantly \\("+kv+"\\) there. The limit is <b>\\("+kv+"\\)</b>.",
      {mode:mode,a:a2,side:side});
  }
  var a3=pick([-5,-4,-3,-2,2,3,4,5]);
  var ask=pick(["right","left","two"]);
  var key3,ds3,sol3;
  var disp="\\frac{\\left|x^2 - "+(a3*a3)+"\\right|}{"+u2qDen(a3)+"}";
  if(ask==="two"){
    key3=DNE;ds3=["\\("+(2*a3)+"\\)","\\("+(-2*a3)+"\\)","\\(0\\)"];
    sol3="Split by cases. Just right of \\("+a3+"\\), \\(x^2 - "+(a3*a3)+"\\) is "+(a3>0?"positive":"negative")+", and just left of \\("+a3+"\\) it has the opposite sign, so removing the absolute value gives two different simplified forms: the one-sided limits are \\("+(2*Math.abs(a3))+"\\) and \\("+(-2*Math.abs(a3))+"\\) . Since they disagree, the two-sided limit <b>does not exist</b>.";
  }else{
    var kv3=(ask==="right")?(2*Math.abs(a3)):(-2*Math.abs(a3));
    key3="\\("+kv3+"\\)";
    var candA=["\\("+(-kv3)+"\\)","\\("+(2*a3)+"\\)",DNE,"\\(0\\)","\\("+a3+"\\)"];
    ds3=candA.filter(function(v,ix){return v!==key3&&candA.indexOf(v)===ix;}).slice(0,3);
    var posSide=((ask==="right")&&(a3>0))||((ask==="left")&&(a3<0));
    var formStr=posSide?("\\("+u2qLin(1,a3)+"\\)"):("\\(-\\left("+u2qLin(1,a3)+"\\right)\\)");
    sol3="Work by cases on the side requested. Just "+ask+" of \\("+a3+"\\), \\(x^2 - "+(a3*a3)+"\\) is "+(posSide?"positive, so the absolute value comes off unchanged":"negative, so the absolute value negates it")+", and the quotient simplifies to "+formStr+". Substituting \\(x = "+a3+"\\) then gives the value. The limit is <b>\\("+kv3+"\\)</b>.";
  }
    return mcq("Evaluate \\(\\lim_{x \\to "+a3+((ask==="right")?"^+":(ask==="left")?"^-":"")+"} "+disp+"\\).",
    key3,ds3,sol3,{mode:mode,a:a3,ask:ask});
});
E("u2-limit-error-analysis",2,["2.7","2.16"],3,"var",varset([
  function(){return mcq("A student is asked for \\(\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2}\\). The student substitutes \\(x = 2\\), gets \\(\\frac{0}{0}\\), and writes: the limit does not exist, because the expression is undefined at \\(x = 2\\) and \\(\\frac{0}{0}\\) has no value. Which statement best describes the student's work?",
    "The conclusion is wrong: \\(\\frac{0}{0}\\) is an indeterminate form, and factoring the numerator first shows the limit is 4",
    ["The work is correct: a limit cannot exist at a point where the function itself is undefined, just as it is here",
     "The only error is arithmetic: substituting \\(x = 2\\) actually gives \\(\\frac{0}{4}\\), which equals 0, so the limit is 0",
     "The method is the problem: limits must be read from a graph or a table, never found algebraically in this way"],
    "Getting \\(\\frac{0}{0}\\) means the method has stalled, not that the limit fails to exist. Factoring, \\(x^2 - 4 = (x - 2)(x + 2)\\), and cancelling gives \\(x + 2\\), whose limit is \\(4\\). The first statement is the accurate one: <b>the conclusion is wrong, and the limit is 4</b>.",
    {v:1});},
  function(){return mcq("A student checks whether \\(f(x) = \\frac{x^2 - 1}{x - 1}\\) is continuous at \\(x = 1\\). The student factors, cancels, computes the limit \\(2\\), and writes: the limit exists, so the function is continuous at \\(x = 1\\). Which statement best describes the student's work?",
    "Finding the limit is not enough: \\(f(1)\\) does not exist, so \\(f\\) cannot be continuous at \\(x = 1\\) (the discontinuity is removable)",
    ["The work is correct: the limit exists and equals 2, and that is all continuity at a point requires, so nothing more needs checking",
     "The only error is the limit value: factoring gives \\(x - 1\\) after cancelling, so the limit is 0, not 2",
     "The error is in the factoring step: \\(x^2 - 1\\) cannot be factored as the student did, so the limit does not exist"],
    "Continuity at a point needs three things: the limit exists, the function value exists, and the two agree. Here \\(f(1)\\) is undefined because the denominator vanishes, so continuity fails no matter what the limit is. The first statement is the accurate one: <b>the limit alone is not enough, and \\(f(1)\\) does not exist</b>.",
    {v:2});},
  function(){return mcq("A student is asked for \\(\\lim_{x \\to \\infty} \\frac{3x^2 + 1}{x^2 - 5}\\). The student keeps only the constant terms and writes: the limit is \\(-\\frac{1}{5}\\). Which statement best describes the student's work?",
    "The wrong terms were kept: as \\(x \\to \\infty\\) the lower terms become negligible, and the leading terms give a limit of 3",
    ["The work is correct: in a limit at infinity only the constant terms survive, so \\(-\\frac{1}{5}\\) is right in the end",
     "The only error is the sign: keeping the constant terms gives \\(\\frac{1}{5}\\), not \\(-\\frac{1}{5}\\), and nothing else is wrong",
     "The method is the problem: a limit at infinity must be found by substituting larger and larger numbers"],
    "In a limit at infinity the highest-degree terms dominate; the constants are the terms that matter least, not the ones that survive. The leading terms give \\(\\frac{3x^2}{x^2} = 3\\). The first statement is the accurate one: <b>the wrong terms were kept, and the limit is 3</b>.",
    {v:3});},
  function(){return mcq("A student writes: since \\(\\frac{1}{0.001} = 1000\\) is large and positive, \\(\\lim_{x \\to 0} \\frac{1}{x} = \\infty\\). Which statement best describes the student's work?",
    "Only the right side was considered: from the left the values are large and negative, so the two-sided limit does not exist",
    ["The work is correct: the values grow without bound near 0, so the limit is \\(\\infty\\) from both sides of 0, exactly as the student found",
     "The only error is arithmetic: \\(\\frac{1}{0.001}\\) equals 100, not 1000, so the reasoning collapses completely",
     "The error is using a decimal: limits at a point must be checked with fractions, never with a decimal value like this one"],
    "The number \\(0.001\\) tests only the right side of \\(0\\). From the left, values such as \\(\\frac{1}{-0.001} = -1000\\) are large and negative, so the two sides disagree completely. The first statement is the accurate one: <b>only the right side was considered, and the two-sided limit does not exist</b>.",
    {v:4});}
]));

/* Pure Math review additions, November 13, 2026 (scan build order step 3):
   sequence convergence identification and the repeating decimal as the
   limit of an infinite geometric series, both reviewed in the St. Pat's
   Math 31 limits material and written new. Helpers carry the u2s prefix. */
function u2sPoly(cf){var n=cf.length-1,parts=[];for(var i=0;i<cf.length;i++){var c=cf[i],p=n-i;if(c===0)continue;var mag=Math.abs(c),term;if(p===0)term=""+mag;else{var cs=mag===1?"":(""+mag);term=cs+(p===1?"n":"n^"+p);}parts.push({neg:c<0,term:term});}if(!parts.length)return "0";var s=parts[0].neg?"-"+parts[0].term:parts[0].term;for(var j=1;j<parts.length;j++)s+=parts[j].neg?" - "+parts[j].term:" + "+parts[j].term;return s;}
function u2sFr(n,d){return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}";}
E("u2-sequence-convergence",2,["2.10"],1,"gen",function(){
  function nz(lo,hi){var v=0;do{v=ri(lo,hi);}while(v===0);return v;}
  function ratT(num,den){return "\\frac{"+u2sPoly(num)+"}{"+u2sPoly(den)+"}";}
  function denOK(den){for(var n=1;n<=80;n++){var v=0;for(var i=0;i<den.length;i++)v=v*n+den[i];if(v===0)return false;}return true;}
  function build(fam){
    var i;
    if(fam==="cr"){var a=nz(-6,6),b=ri(-8,8),c=nz(-6,6),d=ri(-8,8);
      return {fam:fam,tex:"\\("+ratT([a,b],[c,d])+"\\)",prm:{num:[a,b],den:[c,d]},
        note:"\\("+ratT([a,b],[c,d])+"\\): the numerator and denominator grow at the same rate, so the terms settle at the ratio of the leading coefficients, \\("+u2qFracRaw(a,c)+"\\)"};}
    if(fam==="cd"){var a2=nz(-6,6),b2=ri(-8,8),c2=nz(-3,3),d2=ri(-6,6),e2=ri(-6,6);
      return {fam:fam,tex:"\\("+ratT([a2,b2],[c2,d2,e2])+"\\)",prm:{num:[a2,b2],den:[c2,d2,e2]},
        note:"\\("+ratT([a2,b2],[c2,d2,e2])+"\\): the denominator is a degree higher and outgrows the numerator, so the terms shrink toward \\(0\\)"};}
    if(fam==="cg"){var k=ri(2,7),bs=pick([[1,2],[1,3],[2,3],[-1,2],[-2,3],[1,4],[3,4],[-3,4],[2,5],[-1,3]]),p=bs[0],q=bs[1];
      return {fam:fam,tex:"\\("+k+"\\left("+u2sFr(p,q)+"\\right)^n\\)",prm:{k:k,p:p,q:q},
        note:"\\("+k+"\\left("+u2sFr(p,q)+"\\right)^n\\): each term is the one before it multiplied by \\("+u2sFr(p,q)+"\\), whose absolute value is less than \\(1\\), so the terms shrink toward \\(0\\)"};}
    if(fam==="ca"){var c3=ri(1,9),m3=ri(1,9);
      return {fam:fam,tex:"\\(\\frac{(-1)^n"+(c3===1?"":" \\cdot "+c3)+"}{"+u2sPoly([1,m3])+"}\\)",prm:{c:c3,m:m3},
        note:"\\(\\frac{(-1)^n"+(c3===1?"":" \\cdot "+c3)+"}{"+u2sPoly([1,m3])+"}\\): the sign alternates, but the size of the terms shrinks toward \\(0\\), so the terms still settle at \\(0\\)"};}
    if(fam==="dg"){var a4=nz(-4,4),b4=ri(-6,6),c4=ri(-6,6),d4=nz(-3,3),e4=ri(-6,6);
      return {fam:fam,tex:"\\("+ratT([a4,b4,c4],[d4,e4])+"\\)",prm:{num:[a4,b4,c4],den:[d4,e4]},
        note:"\\("+ratT([a4,b4,c4],[d4,e4])+"\\): the numerator is a degree higher and outgrows the denominator, so the terms grow without bound"};}
    if(fam==="de"){var k5=ri(1,6),bs5=pick([[3,2],[5,4],[2,1],[3,1],[5,3],[4,3]]),p5=bs5[0],q5=bs5[1];
      var base5=q5===1?(""+p5):("\\frac{"+p5+"}{"+q5+"}");
      return {fam:fam,tex:"\\("+(k5===1?"":k5)+"\\left("+base5+"\\right)^n\\)",prm:{k:k5,p:p5,q:q5},
        note:"\\("+(k5===1?"":k5)+"\\left("+base5+"\\right)^n\\): each term is the one before it multiplied by a number greater than \\(1\\), so the terms grow without bound"};}
    if(fam==="dob"){var a6=nz(-6,6),b6=ri(-8,8),c6=nz(-6,6),d6=ri(-8,8);
      return {fam:fam,tex:"\\((-1)^n \\cdot "+ratT([a6,b6],[c6,d6])+"\\)",prm:{num:[a6,b6],den:[c6,d6]},
        note:"\\((-1)^n \\cdot "+ratT([a6,b6],[c6,d6])+"\\): the factor \\((-1)^n\\) flips the sign at every step while the size of the fraction approaches \\("+u2qFracRaw(Math.abs(a6),Math.abs(c6))+"\\), so the terms keep jumping between two different values and never settle"};}
    var k7=ri(1,5),bs7=pick([[-3,2],[-5,4],[-2,1],[-3,1],[-5,3],[-4,3]]),p7=bs7[0],q7=bs7[1];
    var base7=q7===1?(""+p7):u2sFr(p7,q7);
    return {fam:fam,tex:"\\("+(k7===1?"":k7)+"\\left("+base7+"\\right)^n\\)",prm:{k:k7,p:p7,q:q7},
      note:"\\("+(k7===1?"":k7)+"\\left("+base7+"\\right)^n\\): the terms alternate in sign and each one is larger in size than the one before, so they grow without settling anywhere"};
  }
  var convFam=pick(["cr","cd","cg","ca"]);
  var divFams=shuffle(["dg","de","dob","dou"]).slice(0,3);
  var items=[],tries=0;
  do{
    items=[build(convFam)];
    for(var j=0;j<3;j++)items.push(build(divFams[j]));
    tries++;
  }while((new Set(items.map(function(x){return x.tex;})).size<4||items.some(function(x){return x.prm.den&&!denOK(x.prm.den);})||(convFam==="cr"&&items[0].prm.num[0]*items[0].prm.den[1]===items[0].prm.num[1]*items[0].prm.den[0]))&&tries<200);
  var conv=items[0],divs=items.slice(1);
  var sol="A sequence converges when its terms settle toward a single finite number as \\(n\\) grows. Check each one. "+conv.note+", so this sequence converges. The other three diverge: "+divs.map(function(x){return x.note;}).join("; ")+". The convergent sequence is <b>"+conv.tex+"</b>.";
  return mcq("Which one of the following sequences converges?",
    conv.tex,divs.map(function(x){return x.tex;}),sol,
    {conv:{fam:convFam,prm:conv.prm},divs:divs.map(function(x){return {fam:x.fam,prm:x.prm};})});
});
E("u2-repeating-decimal",2,["2.10"],2,"gen",function(){
  function red(n,d){var g=u2qGcd(n,d);return [n/g,d/g];}
  function pairStr(pr){return "\\("+u2qFracRaw(pr[0],pr[1])+"\\)";}
  var W,h,p,head,block,H,B,pH,pP,key,e1,e2,e3,tries=0;
  do{
    W=ri(0,9);h=ri(1,2);p=ri(1,3);head="";block="";
    for(var i1=0;i1<h;i1++)head+=""+ri(0,9);
    for(var i2=0;i2<p;i2++)block+=""+ri(0,9);
    H=parseInt(head,10);B=parseInt(block,10);
    pH=Math.pow(10,h);pP=Math.pow(10,p);
    key=red((W*pH+H)*(pP-1)+B,pH*(pP-1));
    e1=red((W*pH+H)*(pP*10-1)+B,pH*(pP*10-1));
    e2=red(W*(pH*pP-1)+(H*pP+B),pH*pP-1);
    e3=red((W*pH+H)*(pP-1)+B*pH,pH*(pP-1));
    tries++;
  }while((/^0+$/.test(block)||/^9+$/.test(block)||new Set([key,e1,e2,e3].map(function(pr){return pr[0]+"/"+pr[1];})).size<4)&&tries<200);
  var S1=H*pP+B,den=pH*pP-pH;
  var sol="Work with the repeating part. Let \\(y = 0."+head+"\\overline{"+block+"}\\). Multiplying by \\(10^{"+(h+p)+"}\\) moves the decimal point past the head and one full repeat: \\(10^{"+(h+p)+"} y = "+S1+".\\overline{"+block+"}\\). Multiplying by \\(10^{"+h+"}\\) moves it just past the head: \\(10^{"+h+"} y = "+H+".\\overline{"+block+"}\\). Subtracting removes the repeating tail: \\[ \\left(10^{"+(h+p)+"} - 10^{"+h+"}\\right) y = "+S1+" - "+H+" = "+(S1-H)+" \\] So \\(y = \\frac{"+(S1-H)+"}{"+den+"}\\), and adding back the whole part \\("+W+"\\) and reducing gives \\(x = \\) <b>"+pairStr(key)+"</b>. (The repeating tail is an infinite geometric series with ratio \\(10^{-"+p+"}\\), and the subtraction is its sum formula in disguise.)";
  return mcq("Express the repeating decimal \\("+W+"."+head+"\\overline{"+block+"}\\) as a fraction in lowest terms.",
    pairStr(key),[pairStr(e1),pairStr(e2),pairStr(e3)],sol,
    {W:W,head:head,block:block,h:h,p:p});
});

/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess a Math 2200 outcome (the sum of an infinite geometric series, indicator 4.71), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-3208.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u2-repeating-decimal"].indexOf(e.id)>=0)e.pkFlag=true;});
