// Math 3200 Unit 2 Function Transformations question bank
// CRMARKS: u2-find-stretch-cr=3
// CRMARKS: u2-full-equation=2
// CRMARKS: u2-inv-domran=1
// CRMARKS: u2-inv-equation=2
// CRMARKS: u2-inv-figure=1
// CRMARKS: u2-inv-restrict=2
// CRMARKS: u2-inverse-points-cr=3
// CRMARKS: u2-refl-equation=1
// CRMARKS: u2-refl-point=1
// CRMARKS: u2-reflection-equation-cr=2
// CRMARKS: u2-stretch-equation=2
// CRMARKS: u2-stretch-identify=1
// CRMARKS: u2-stretch-point=2
// CRMARKS: u2-trans-describe=1
// CRMARKS: u2-trans-equation=2
// CRMARKS: u2-trans-point=1
// CRMARKS: u2-trans-zeros=3
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u2-inv-which=2
// CRMARKS: u2-refl-yx=3
// BIMODAL: u2-trans-zeros=a
// BIMODAL: u2-reflection-equation-cr=b
// BIMODAL: u2-inv-restrict=a
// BIMODAL: u2-inv-equation=b
// BIMODAL: u2-full-equation=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u2-inv-which=a
// BIMODAL: u2-refl-yx=b
/* ================= Unit 2: Function Transformations ================= */
/* ================= Unit 2: Function Transformations =================
   Bank source chunk for the Math 3200 Review app. Helpers are prefixed u2.
   Sources are type-level only (Mauger Chapter 1 sets, MHR Pre-Calculus 12
   Chapter 1): every stem, context and value here is original. */

/* ---------- u2 helpers ---------- */
function u2pm(v){return (v>=0?" + ":" - ")+Math.abs(v);}                 /* " + 3" or " - 3", appended after a term */
function u2pm0(v){return v===0?"":u2pm(v);}                             /* u2pm, but blank when zero */
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2pmFrac(num,den){ /* the signed value num/den as a trailing term: " + 3", " - \\frac{2}{3}", or "" */
  if(num===0)return "";
  var g=u2gcd(num,den),a=Math.abs(num)/g,d2=den/g;
  var body=d2===1?""+a:"\\frac{"+a+"}{"+d2+"}";
  return (num>0?" + ":" - ")+body;
}
function u2xarg(s){if(s===0)return "x";return s>0?"x - "+s:"x + "+(-s);} /* renders "x - s" for the signed value s */
function u2pt(x,y){return "("+x+", "+y+")";}
function u2lin(a,b){var s=a===1?"x":a===-1?"-x":a+"x";return s+u2pm0(b);}
function u2scaleExpr(n,d,v){ /* the factor n/d applied to variable v, as a string */
  if(n===d)return v;
  if(d===1)return n+v;
  if(n===1)return "\\frac{"+v+"}{"+d+"}";
  return "\\frac{"+n+v+"}{"+d+"}";
}
function u2coefStr(n,d){ /* a standalone coefficient n/d as a string */
  if(d===1)return ""+n;
  if(n===1)return "\\frac{1}{"+d+"}";
  return "\\frac{"+n+"}{"+d+"}";
}
function u2argStr(n,d){ /* the expression (n/d)x rendered as an argument: "2x" or "\\frac{x}{2}" */
  if(d===1)return n===1?"x":n+"x";
  if(n===1)return "\\frac{x}{"+d+"}";
  return "\\frac{"+n+"x}{"+d+"}";
}
function u2shifted(base,sx,sy){ /* base function with argument x - sx, plus sy */
  var xa=u2xarg(sx),tail=u2pm0(sy);
  if(base==="sq")return "("+xa+")^2"+tail;
  if(base==="cu")return "("+xa+")^3"+tail;
  if(base==="abs")return "|"+xa+"|"+tail;
  if(base==="sqrt")return "\\sqrt{"+xa+"}"+tail;
  return "\\frac{1}{"+xa+"}"+tail; /* rec */
}
function u2baseDisplay(base){
  if(base==="sq")return "x^2";
  if(base==="cu")return "x^3";
  if(base==="abs")return "|x|";
  if(base==="sqrt")return "\\sqrt{x}";
  return "\\frac{1}{x}";
}
function u2baseFn(base){ /* the base function itself, as a JS function */
  if(base==="sq")return function(x){return x*x;};
  if(base==="cu")return function(x){return x*x*x;};
  if(base==="abs")return function(x){return Math.abs(x);};
  if(base==="sqrt")return function(x){return Math.sqrt(x);};
  return function(x){return 1/x;}; /* rec */
}
function u2baseFig(base){ /* a graph of the untransformed base function (Tranche 4) */
  var fn=u2baseFn(base);
  if(base==="sq")return fnPlotSVG(fn,-4,4,-2,17,{gx:1,gy:2,labelX:true,labelY:true});
  if(base==="cu")return fnPlotSVG(fn,-3,3,-27,27,{gx:1,gy:9,labelX:true,labelY:true});
  if(base==="abs")return fnPlotSVG(fn,-5,5,-1,6,{gx:1,gy:1,labelX:true,labelY:true});
  if(base==="sqrt")return fnPlotSVG(fn,-1,9,-1,4,{gx:1,gy:1,labelX:true,labelY:true});
  return fnPlotSVG(fn,-5,5,-5,5,{gx:1,gy:1,labelX:true,labelY:true,asymX:0});
}
function u2autoWin(fns,x0,x1){ /* a y-window covering every finite value of the given functions on [x0, x1], with a readable grid step */
  var lo=Infinity,hi=-Infinity,i,x,y,j;
  for(i=0;i<=200;i++){x=x0+(x1-x0)*i/200;
    for(j=0;j<fns.length;j++){try{y=fns[j](x);}catch(e){y=NaN;}
      if(typeof y==="number"&&isFinite(y)){if(y<lo)lo=y;if(y>hi)hi=y;}}}
  if(!isFinite(lo)){lo=-1;hi=1;}
  var pad=(hi-lo)*0.12+0.5;lo=Math.floor(lo-pad);hi=Math.ceil(hi+pad);
  var span=hi-lo,gy=span<=14?1:span<=35?2:span<=70?5:10;
  return [lo,hi,gy];
}
function u2origFig(base,c){ /* a graph of the original function y = base(x) + c (Tranche 4) */
  var bf=u2baseFn(base);
  var fn=function(x){return bf(x)+c;};
  var xr=(base==="sq")?[-4,4]:(base==="cu")?[-3,3]:(base==="abs")?[-6,6]:[-1,16];
  var wv=u2autoWin([fn],xr[0],xr[1]);
  return fnPlotSVG(fn,xr[0],xr[1],wv[0],wv[1],{gx:1,gy:wv[2],labelX:true,labelY:true});
}
function u2coefBase(n,d,base){ /* coefficient n/d times a base function, as a string */
  var b=u2baseDisplay(base);
  if(n===d)return b;
  if(d===1)return n+b;
  if(n===1)return "\\frac{"+b+"}{"+d+"}";
  return "\\frac{"+n+"}{"+d+"}"+b;
}
function u2pointsSVG(pts){ /* scatter plot of labelled points on a -6..6 grid */
  var W=252,H=252,lo=-6,span=12;
  function X(v){return (v-lo)/span*W;}
  function Y(v){return H-(v-lo)/span*H;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plotted points">';
  for(var g=-6;g<=6;g+=2){
    out+='<line x1="'+fmt(X(g),1)+'" y1="0" x2="'+fmt(X(g),1)+'" y2="'+H+'" stroke="#dddddd" stroke-width="1"/>';
    out+='<line x1="0" y1="'+fmt(Y(g),1)+'" x2="'+W+'" y2="'+fmt(Y(g),1)+'" stroke="#dddddd" stroke-width="1"/>';
  }
  out+='<line x1="'+fmt(X(0),1)+'" y1="0" x2="'+fmt(X(0),1)+'" y2="'+H+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="0" y1="'+fmt(Y(0),1)+'" x2="'+W+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="'+fmt(X(-6),1)+'" y1="'+fmt(Y(0)-6,1)+'" x2="'+fmt(X(-6),1)+'" y2="'+fmt(Y(0)+6,1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  pts.forEach(function(p){
    out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="4.2" fill="'+FIG_ACC+'"/>';
    out+=_txt(X(p[0])+16,Y(p[1])-10,"("+p[0]+", "+p[1]+")",12,false);
  });
  return out+'</svg>';
}
function u2setStr(pts){ /* a set of points as a math string, sorted by x then y */
  var s=pts.slice().sort(function(a,b){return a[0]-b[0]||a[1]-b[1];});
  return "\\{ "+s.map(function(p){return u2pt(p[0],p[1]);}).join(", ")+" \\}";
}

/* ---------- inverses: 4.1 to 4.8 ---------- */
E("u2-inv-which",2,["4.1"],1,"gen",function(){
  var form=pick(["lin","sqrt"]),correct,why;
  if(form==="lin"){
    var m=pick([1,2,3,4,-2,-3,-4]),b=ri(-6,6);
    while(b===0)b=ri(-6,6);
    correct="\\(y = "+u2lin(m,b)+"\\)";
    why="a non-horizontal straight line passes the horizontal line test, because it increases or decreases steadily across its whole domain";
  }else{
    var h=ri(-5,5),k=ri(-5,5);
    correct="\\(y = \\sqrt{"+u2xarg(h)+"}"+u2pm0(k)+"\\)";
    why="a square root graph increases steadily across its whole domain, so it passes the horizontal line test";
  }
  var pool=[
    function(){var bb=ri(-6,6),cc=ri(-6,6);while(bb===0)bb=ri(-6,6);return "\\(y = x^2"+u2pm(bb)+"x"+u2pm(cc)+"\\)";},
    function(){var hh=ri(-5,5),kk=ri(-5,5);return "\\(y = |"+u2xarg(hh)+"|"+u2pm0(kk)+"\\)";},
    function(){var hh=ri(-5,5),kk=ri(-5,5);return "\\(y = ("+u2xarg(hh)+")^2"+u2pm0(kk)+"\\)";},
    function(){var cc=pick([2,3,4,5,6,7,8,9]);return "\\(y = x^2 - "+cc+"\\)";},
    function(){var bb=ri(-6,6);while(bb===0)bb=ri(-6,6);return "\\(y = -x^2"+u2pm(bb)+"x\\)";}
  ];
  var idx=shuffle([0,1,2,3,4]).slice(0,3);
  var dis=idx.map(function(i){return pool[i]();});
  return mcq("Which function has an inverse that is also a function?",
    correct,dis,
    "A function has an inverse that is also a function exactly when it passes the <b>horizontal line test</b>: every horizontal line meets the graph at most once. The correct choice qualifies because "+why+". Each of the other graphs is met twice by some horizontal line, so its inverse would pair one input with two different outputs.",
    {form:form});
});
E("u2-inv-figure",2,["4.2","4.3","4.4"],2,"gen",function(){
  var pts,opts,tries=0;
  do{
    tries++;
    var xs=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3);
    var ys=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3);
    pts=[[xs[0],ys[0]],[xs[1],ys[1]],[xs[2],ys[2]]];
    var swapped=pts.map(function(p){return [p[1],p[0]];});
    var negX=pts.map(function(p){return [-p[0],p[1]];});
    var negY=pts.map(function(p){return [p[0],-p[1]];});
    opts=[u2setStr(swapped),u2setStr(pts),u2setStr(negX),u2setStr(negY)];
  }while((new Set(opts)).size<4&&tries<60);
  var q=mcq("The diagram shows the plotted points of a relation. Which set of points lies on the graph of the <b>inverse relation</b>?",
    opts[0],[opts[1],opts[2],opts[3]],
    "Reflecting a graph in the line \\(y = x\\) swaps the coordinates of every point, and that reflection is the graph of the inverse relation. Here "+pts.map(function(p){return "\\("+u2pt(p[0],p[1])+"\\) maps to \\("+u2pt(p[1],p[0])+"\\)";}).join(", ")+".",
    {pts:pts});
  q.figure=u2pointsSVG(pts);
  return q;
});
E("u2-inv-equation",2,["4.5","4.6"],2,"gen",function(){
  if(ri(0,1)===0){
    var m=pick([2,3,4,-2,-3,-4]),b=ri(-9,9);
    while(b===0)b=ri(-9,9);
    var correct="\\(f^{-1}(x) = \\frac{x"+u2pm(-b)+"}{"+m+"}\\)";
    var dis=[
      "\\(f^{-1}(x) = \\frac{x"+u2pm(b)+"}{"+m+"}\\)",
      "\\(f^{-1}(x) = \\frac{1}{"+u2lin(m,b)+"}\\)",
      "\\(f^{-1}(x) = "+u2lin(m,-b)+"\\)"
    ];
    return mcq("What is the inverse of the function \\(f(x) = "+u2lin(m,b)+"\\)?",
      correct,dis,
      "Swap \\(x\\) and \\(y\\), then solve for \\(y\\): \\[ \\begin{aligned} x &= "+m+"y"+u2pm(b)+" \\\\ x"+u2pm(-b)+" &= "+m+"y \\\\ y &= \\frac{x"+u2pm(-b)+"}{"+m+"} \\end{aligned} \\] So \\(f^{-1}(x) = \\frac{x"+u2pm(-b)+"}{"+m+"}\\). The reciprocal \\(\\frac{1}{f(x)}\\) is a different idea from the inverse function.",
      {shape:"lin",m:m,b:b});
  }
  var h=ri(-5,5),k=ri(-6,6);
  while(h===0&&k===0){h=ri(-5,5);k=ri(-6,6);}
  var sq="\\sqrt{"+u2xarg(k)+"}";
  var correct2="\\(f^{-1}(x) = "+(h===0?sq:h+" + "+sq)+"\\)";
  var dis2=[
    "\\(f^{-1}(x) = "+(h===0?"-"+sq:h+" - "+sq)+"\\)",
    "\\(f^{-1}(x) = \\sqrt{"+u2xarg(h)+"}"+u2pm0(k)+"\\)",
    "\\(f^{-1}(x) = ("+u2xarg(k)+")^2"+u2pm0(h)+"\\)"
  ];
  return mcq("The function \\(f(x) = ("+u2xarg(h)+")^2"+u2pm0(k)+"\\) has domain \\(x \\geq "+h+"\\). What is its inverse?",
    correct2,dis2,
    "Swap \\(x\\) and \\(y\\), then solve: \\[ \\begin{aligned} x &= ("+u2xarg(h).replace("x","y")+")^2"+u2pm0(k)+" \\\\ x"+u2pm0(-k)+" &= ("+u2xarg(h).replace("x","y")+")^2 \\\\ \\sqrt{x"+u2pm0(-k)+"} &= "+u2xarg(h).replace("x","y")+" \\\\ y &= "+h+" + \\sqrt{x"+u2pm0(-k)+"} \\end{aligned} \\] The positive root is used because the restricted domain of \\(f\\) keeps the inverse on the branch \\(y \\geq "+h+"\\).",
    {shape:"quad",h:h,k:k});
});
E("u2-inv-domran",2,["4.7"],1,"gen",function(){
  var a,b,c,d,opts,tries=0;
  do{
    tries++;
    a=ri(-8,3);b=a+ri(2,7);
    c=ri(-8,3);d=c+ri(2,7);
    function iv(D1,D2,R1,R2){return "Domain: \\("+D1+" \\leq x \\leq "+D2+"\\); range: \\("+R1+" \\leq y \\leq "+R2+"\\)";}
    opts=[iv(c,d,a,b),iv(a,b,c,d),iv(-d,-c,-b,-a),iv(c,d,c,d)];
  }while((new Set(opts)).size<4&&tries<60);
  return mcq("A relation has domain \\("+a+" \\leq x \\leq "+b+"\\) and range \\("+c+" \\leq y \\leq "+d+"\\). What are the domain and range of its inverse relation?",
    opts[0],[opts[1],opts[2],opts[3]],
    "Forming the inverse swaps \\(x\\) and \\(y\\) in every point, so the domain and range trade places: the inverse has domain \\("+c+" \\leq x \\leq "+d+"\\) (the old range) and range \\("+a+" \\leq y \\leq "+b+"\\) (the old domain). The endpoints themselves do not change.",
    {a:a,b:b,c:c,d:d});
});
E("u2-inv-restrict",2,["4.8","4.1"],3,"var",varset([
  function(){var q=mcq("The function \\(f(x) = (x - 3)^2 + 2\\) has an inverse that is not a function. Which restriction on the domain of \\(f\\) makes its inverse a function?",
    "\\(x \\geq 3\\)",
    ["\\(x \\geq 2\\)","\\(x \\leq 4\\)","No restriction is needed"],
    "The graph of \\(f\\) is a parabola with vertex \\((3, 2)\\). It fails the horizontal line test because points on the left and right of \\(x = 3\\) share the same \\(y\\)-value. Restricting the domain to one side of the vertex, such as \\(x \\geq 3\\), makes \\(f\\) one-to-one, so its inverse is a function. The restrictions \\(x \\geq 2\\) and \\(x \\leq 4\\) both keep points from both sides of the vertex, so they do not work.",
    {v:1});q.figure=fnPlotSVG(function(x){return (x-3)*(x-3)+2;},-1,7,undefined,undefined,{gx:1,gy:2,labelX:true,labelY:true,points:[[3,2]]});return q;},
  function(){var q=mcq("The function \\(f(x) = x^2 - 4x + 1\\) has an inverse that is not a function. Which restriction on the domain of \\(f\\) makes its inverse a function?",
    "\\(x \\leq 2\\)",
    ["\\(x \\geq -3\\)","\\(x \\leq 3\\)","No restriction is needed"],
    "Complete the square to locate the vertex: \\[ \\begin{aligned} f(x) &= x^2 - 4x + 1 \\\\ &= (x - 2)^2 - 3 \\end{aligned} \\] The vertex is \\((2, -3)\\), so \\(f\\) is one-to-one on either side of \\(x = 2\\). Restricting the domain to \\(x \\leq 2\\) keeps only the left branch, and the inverse is then a function. The value \\(-3\\) is the minimum value of \\(f\\), not the \\(x\\)-coordinate of the vertex.",
    {v:2});q.figure=fnPlotSVG(function(x){return x*x-4*x+1;},-2,6,undefined,undefined,{gx:1,gy:2,labelX:true,labelY:true,points:[[2,-3]]});return q;},
  function(){var q=mcq("The function \\(f(x) = |x + 1| - 4\\) has an inverse that is not a function. Which restriction on the domain of \\(f\\) makes its inverse a function?",
    "\\(x \\geq -1\\)",
    ["\\(x \\geq -4\\)","\\(x \\leq 0\\)","No restriction is needed"],
    "The graph of \\(f\\) is a V with its vertex at \\((-1, -4)\\). Inputs on opposite sides of \\(x = -1\\) can give the same output, so the inverse is not a function. Keeping only one side of the V, such as \\(x \\geq -1\\), makes \\(f\\) one-to-one. The restrictions \\(x \\geq -4\\) and \\(x \\leq 0\\) both include inputs from both sides of the vertex.",
    {v:3});q.figure=fnPlotSVG(function(x){return Math.abs(x+1)-4;},-7,5,undefined,undefined,{gx:1,gy:1,labelX:true,labelY:true,points:[[-1,-4]]});return q;},
  function(){var q=mcq("The function \\(f(x) = (x + 2)^2 - 5\\) has an inverse that is not a function. Which restriction on the domain of \\(f\\) makes its inverse a function?",
    "\\(x \\leq -2\\)",
    ["\\(x \\geq -5\\)","\\(x \\leq -1\\)","No restriction is needed"],
    "The graph of \\(f\\) is a parabola with vertex \\((-2, -5)\\). On the domain \\(x \\leq -2\\) the function decreases steadily, so it is one-to-one and its inverse is a function. The restrictions \\(x \\geq -5\\) and \\(x \\leq -1\\) both keep inputs from both sides of the vertex, and \\(-5\\) is the minimum value of \\(f\\), not the vertex \\(x\\)-coordinate.",
    {v:4});q.figure=fnPlotSVG(function(x){return (x+2)*(x+2)-5;},-7,3,undefined,undefined,{gx:1,gy:2,labelX:true,labelY:true,points:[[-2,-5]]});return q;}
]));

/* ---------- translations: 4.13 to 4.17 ---------- */
E("u2-trans-describe",2,["4.13","4.14"],1,"gen",function(){
  var amt=ri(2,12),form=ri(1,3),eq,dir;
  if(form===1){
    var k=pick([amt,-amt]);
    eq="\\(y = f(x)"+u2pm(k)+"\\)";
    dir=k>0?"up":"down";
  }else if(form===2){
    var h=pick([amt,-amt]);
    eq="\\(y = f("+u2xarg(h)+")\\)";
    dir=h>0?"right":"left";
  }else{
    var k2=pick([amt,-amt]);
    eq="\\(y"+(k2>0?" - "+k2:" + "+(-k2))+" = f(x)\\)";
    dir=k2>0?"up":"down";
  }
  var correct="The graph is translated "+amt+" units "+dir;
  var dis=["up","down","left","right"].filter(function(d){return d!==dir;}).map(function(d){return "The graph is translated "+amt+" units "+d;});
  return mcq("How is the graph of \\(y = f(x)\\) changed to give the graph of "+eq+"?",
    correct,dis,
    "In \\(y = f(x) + k\\) and \\(y - k = f(x)\\), a positive \\(k\\) moves the graph up; in \\(y = f(x - h)\\), a positive \\(h\\) moves the graph right, because each input must be \\(h\\) larger to produce the same output. For "+eq+", the change is a translation of "+amt+" units "+dir+".",
    {form:form,amt:amt,dir:dir});
});
E("u2-trans-point",2,["4.15","4.16"],1,"gen",function(){
  var h=pick([-7,-6,-5,-4,-3,-2,2,3,4,5,6,7]);
  var k=pick([-7,-6,-5,-4,-3,-2,2,3,4,5,6,7]);
  var x0=ri(-8,8),y0=ri(-8,8);
  var eq="\\(y"+(k>0?" - "+k:" + "+(-k))+" = f("+u2xarg(h)+")\\)";
  var correct="\\("+u2pt(x0+h,y0+k)+"\\)";
  var dis=[
    "\\("+u2pt(x0-h,y0+k)+"\\)",
    "\\("+u2pt(x0+h,y0-k)+"\\)",
    "\\("+u2pt(x0-h,y0-k)+"\\)"
  ];
  return mcq("The point \\("+u2pt(x0,y0)+"\\) lies on the graph of \\(y = f(x)\\). The graph of \\(f\\) is transformed to give the graph of "+eq+". What is the image of the point?",
    correct,dis,
    "The equation "+eq+" applies the mapping \\((x, y)\\) to \\((x"+u2pm(h)+", y"+u2pm(k)+")\\). So \\("+u2pt(x0,y0)+"\\) maps to \\("+u2pt(x0+h,y0+k)+"\\) . Watch the horizontal sign: in the form \\(y - k = f(x - h)\\) the graph shifts by \\(+h\\) horizontally, even though the equation shows a subtraction inside \\(f\\).",
    {h:h,k:k,x0:x0,y0:y0});
});
E("u2-trans-equation",2,["4.17","4.15"],1,"gen",function(){
  var base=pick(["sq","cu","abs","sqrt","rec"]);
  var sx=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var sy=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var hdesc=Math.abs(sx)+" units "+(sx>0?"right":"left");
  var vdesc=Math.abs(sy)+" units "+(sy>0?"up":"down");
  var desc=ri(0,1)===0?hdesc+" and "+vdesc:vdesc+" and "+hdesc;
  var correct="\\(g(x) = "+u2shifted(base,sx,sy)+"\\)";
  var dis=[
    "\\(g(x) = "+u2shifted(base,-sx,sy)+"\\)",
    "\\(g(x) = "+u2shifted(base,sx,-sy)+"\\)",
    "\\(g(x) = "+u2shifted(base,-sx,-sy)+"\\)"
  ];
  var q=mcq("The graph of \\(y = "+u2baseDisplay(base)+"\\) is translated "+desc+". What is the equation of the image graph?",
    correct,dis,
    "A translation of "+Math.abs(sx)+" units "+(sx>0?"right":"left")+" replaces \\(x\\) by \\("+u2xarg(sx)+"\\), and a translation of "+Math.abs(sy)+" units "+(sy>0?"up":"down")+" adds "+sy+" to the whole function. The image is \\(g(x) = "+u2shifted(base,sx,sy)+"\\) . The horizontal change uses the opposite sign from the direction of travel, which is the most common error in this type of question.",
    {base:base,sx:sx,sy:sy});
  q.figure=u2baseFig(base);
  return q;
});

/* ---------- stretches and the full transformation: 4.18 to 4.24 ---------- */
E("u2-stretch-identify",2,["4.18","4.19"],1,"gen",function(){
  var base=pick(["sq","cu","abs","sqrt"]);
  var c=pick([-4,-3,-2,-1,1,2,3,4]);
  var fac=pick([[2,1],[3,1],[1,2],[1,3]]);
  var n=fac[0],d=fac[1],dir=ri(0,1);
  var orig="\\(y = "+u2baseDisplay(base)+u2pm(c)+"\\)",trans,correct,dis;
  if(dir===0){ /* vertical: y-coords multiplied by n/d, constant term included */
    trans="\\(y = "+u2coefBase(n,d,base)+u2pmFrac(n*c,d)+"\\)";
    correct="\\((x, "+u2scaleExpr(n,d,"y")+")\\)";
    dis=[
      "\\(("+u2scaleExpr(n,d,"x")+", y)\\)",
      "\\((x, "+u2scaleExpr(d,n,"y")+")\\)",
      "\\(("+u2scaleExpr(n,d,"x")+", "+u2scaleExpr(n,d,"y")+")\\)"
    ];
  }else{ /* horizontal: x-coords multiplied by n/d, so the equation divides x by n/d */
    var argB;
    if(base==="sq")argB="("+u2argStr(d,n)+")^2";
    else if(base==="cu")argB="("+u2argStr(d,n)+")^3";
    else if(base==="abs")argB="|"+u2argStr(d,n)+"|";
    else argB="\\sqrt{"+u2argStr(d,n)+"}";
    trans="\\(y = "+argB+u2pm(c)+"\\)";
    correct="\\(("+u2scaleExpr(n,d,"x")+", y)\\)";
    dis=[
      "\\((x, "+u2scaleExpr(n,d,"y")+")\\)",
      "\\(("+u2scaleExpr(d,n,"x")+", y)\\)",
      "\\(("+u2scaleExpr(n,d,"x")+", "+u2scaleExpr(n,d,"y")+")\\)"
    ];
  }
  var bf=u2baseFn(base);
  var fOrig=function(x){return bf(x)+c;};
  var fTrans=(dir===0)?function(x){return (n/d)*(bf(x)+c);}:function(x){return bf((d/n)*x)+c;};
  var wxr=(base==="sq")?[-4,4]:(base==="cu")?[-3,3]:(base==="abs")?[-6,6]:[0,16];
  var wv=u2autoWin([fOrig,fTrans],wxr[0],wxr[1]);
  var pgx=(base==="sq"||base==="cu")?1:2;
  var fig=fnPanelsSVG([
    {fn:fOrig,x0:wxr[0],x1:wxr[1],y0:wv[0],y1:wv[1],gx:pgx,gy:wv[2],title:"Original graph"},
    {fn:fTrans,x0:wxr[0],x1:wxr[1],y0:wv[0],y1:wv[1],gx:pgx,gy:wv[2],title:"Image graph"}
  ]);
  var q=mcq("The graph of "+orig+" is transformed to give the graph of "+trans+". Under this transformation, each point \\((x, y)\\) on the original graph maps to which point?",
    correct,dis,
    dir===0
      ?"A coefficient in front of the function multiplies every \\(y\\)-coordinate (the constant term is part of the function, so it is multiplied too): each point \\((x, y)\\) maps to \\((x, "+u2scaleExpr(n,d,"y")+"))\\). The \\(x\\)-coordinates do not change."
      :"Changing the input of a function stretches the graph horizontally: to land on the same output, each \\(x\\)-coordinate is multiplied by \\("+u2coefStr(n,d)+"\\), so each point \\((x, y)\\) maps to \\(("+u2scaleExpr(n,d,"x")+", y)\\) . Notice the equation divides \\(x\\) by that factor, which is why the direction surprises many students.",
    {base:base,c:c,n:n,d:d,dir:dir});
  q.figure=fig;
  return q;
});
E("u2-stretch-point",2,["4.20","4.21"],1,"gen",function(){
  var A=pick([[2,1],[3,1],[1,2],[1,3]]);
  var B=pick([[2,1],[3,1],[1,2],[1,3]]);
  var X=pick([-3,-2,-1,1,2,3]),Y=pick([-3,-2,-1,1,2,3]);
  var x0=6*X,y0=6*Y;
  function img(sx,sy){return "\\("+u2pt(sx,sy)+"\\)";}
  var correct=img(x0*B[1]/B[0],y0*A[0]/A[1]);
  var dis=[
    img(x0*B[0]/B[1],y0*A[0]/A[1]),
    img(x0*B[1]/B[0],y0*A[1]/A[0]),
    img(x0*B[0]/B[1],y0*A[1]/A[0])
  ];
  var eq="\\(y = "+(A[0]===A[1]?"":u2coefStr(A[0],A[1]))+"f("+u2argStr(B[0],B[1])+")\\)";
  return mcq("The point \\("+u2pt(x0,y0)+"\\) lies on the graph of \\(y = f(x)\\). What is the image of the point on the graph of "+eq+"?",
    correct,dis,
    "The mapping for "+eq+" sends \\((x, y)\\) to \\((x \\div "+u2coefStr(B[0],B[1])+", "+u2coefStr(A[0],A[1])+"y)\\): the input factor divides the \\(x\\)-coordinate, and the outside coefficient multiplies the \\(y\\)-coordinate. So \\("+u2pt(x0,y0)+"\\) maps to "+correct+" .",
    {A:A,B:B,x0:x0,y0:y0});
});
E("u2-stretch-equation",2,["4.22"],1,"gen",function(){
  var base=pick(["sq","cu","sqrt"]);
  var c=pick([-4,-3,-2,-1,1,2,3,4]);
  var shape=ri(0,1);
  var origD=u2baseDisplay(base)+u2pm(c);
  function argForm(nn,dd){ /* the base with (nn/dd)x as its argument */
    if(base==="sq")return "("+u2argStr(nn,dd)+")^2";
    if(base==="cu")return "("+u2argStr(nn,dd)+")^3";
    return "\\sqrt{"+u2argStr(nn,dd)+"}";
  }
  if(shape===0){ /* given a vertical stretch factor */
    var fac=pick([[2,1],[3,1],[4,1],[1,2],[1,3]]);
    var n=fac[0],d=fac[1];
    var correct="\\(g(x) = "+u2coefBase(n,d,base)+u2pmFrac(n*c,d)+"\\)";
    var dis=[
      "\\(g(x) = "+argForm(n,d)+u2pm(c)+"\\)",
      "\\(g(x) = "+u2coefBase(d,n,base)+u2pmFrac(d*c,n)+"\\)",
      "\\(g(x) = "+origD+u2pmFrac(n,d)+"\\)"
    ];
    var qv=mcq("The graph of \\(y = "+origD+"\\) is stretched vertically by a factor of \\("+u2coefStr(n,d)+"\\). What is the equation of the image graph?",
      correct,dis,
      "A vertical stretch by a factor of \\("+u2coefStr(n,d)+"\\) multiplies the whole function, including its constant term, by that factor, giving \\(g(x) = "+u2coefBase(n,d,base)+u2pmFrac(n*c,d)+"\\) . Putting the factor inside with the \\(x\\) would stretch the graph horizontally instead.",
      {shape:"v",base:base,c:c,n:n,d:d});
    qv.figure=u2origFig(base,c);
    return qv;
  }
  var fac2=pick([[2,1],[3,1],[1,2],[1,3]]);
  var sn=fac2[0],sd=fac2[1];
  var correct2="\\(g(x) = "+argForm(sd,sn)+u2pm(c)+"\\)";
  var dis2=[
    "\\(g(x) = "+argForm(sn,sd)+u2pm(c)+"\\)",
    "\\(g(x) = "+u2coefBase(sn,sd,base)+u2pmFrac(sn*c,sd)+"\\)",
    "\\(g(x) = "+u2coefBase(sd,sn,base)+u2pmFrac(sd*c,sn)+"\\)"
  ];
  var qh=mcq("The graph of \\(y = "+origD+"\\) is stretched horizontally by a factor of \\("+u2coefStr(sn,sd)+"\\). What is the equation of the image graph?",
    correct2,dis2,
    "A horizontal stretch by a factor of \\("+u2coefStr(sn,sd)+"\\) multiplies every \\(x\\)-coordinate by that factor, so the equation must divide \\(x\\) by it, while the constant term stays as it is: \\(g(x) = "+argForm(sd,sn)+u2pm(c)+"\\) . The factor appears with the \\(x\\), not as a coefficient in front of the function.",
    {shape:"h",base:base,c:c,sn:sn,sd:sd});
  qh.figure=u2origFig(base,c);
  return qh;
});
E("u2-full-equation",2,["4.23","4.24"],2,"gen",function(){
  var pattern=ri(0,3);
  var refl=pattern!==1;
  var hasA=pattern!==3, hasB=pattern!==2;
  var A=pick([[2,1],[3,1],[1,2]]);
  var S=pick([[2,1],[3,1],[1,2]]);
  var h=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var k=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  /* the argument is (x - h) divided by the horizontal stretch factor S, so the
     factor that multiplies (x - h) inside f is 1/S */
  function build2(reflF,aF,sF,hh,kk,sOverride){
    var s=sOverride||S;
    var coef=(reflF?"-":"")+(aF?u2coefStr(A[0],A[1]):"");
    var arg;
    if(!sF){
      arg=u2xarg(hh);
    }else{
      var iv0=s[1],iv1=s[0]; /* 1/S = iv0/iv1 */
      if(iv1===1)arg=iv0===1?u2xarg(hh):iv0+"("+u2xarg(hh)+")";
      else if(iv0===1)arg="\\frac{"+u2xarg(hh)+"}{"+iv1+"}";
      else arg="\\frac{"+iv0+"}{"+iv1+"}("+u2xarg(hh)+")";
    }
    return "\\(g(x) = "+coef+"f\\left("+arg+"\\right)"+u2pm0(kk)+"\\)";
  }
  var correct=build2(refl,hasA,hasB,h,k);
  var errs=[
    build2(refl,hasA,hasB,h,-k),
    build2(refl,hasA,hasB,-h,k),
    build2(!refl,hasA,hasB,h,k)
  ];
  if(hasB)errs.push(build2(refl,hasA,hasB,h,k,[S[1],S[0]]));
  var dis=shuffle(errs).slice(0,3);
  var phrases=[];
  if(refl)phrases.push("reflected in the \\(x\\)-axis");
  if(hasA)phrases.push("stretched vertically by a factor of \\("+u2coefStr(A[0],A[1])+"\\)");
  if(hasB)phrases.push("stretched horizontally by a factor of \\("+u2coefStr(S[0],S[1])+"\\)");
  phrases.push("translated "+Math.abs(h)+" units "+(h>0?"right":"left")+" and "+Math.abs(k)+" units "+(k>0?"up":"down"));
  var desc=phrases.join(", ");
  var solText="Build the equation in the form \\(g(x) = a f(b(x - h)) + k\\). "
    +(refl
      ?(hasA
        ?"The reflection in the \\(x\\)-axis and the vertical stretch give the outside coefficient \\(-"+u2coefStr(A[0],A[1])+"\\). "
        :"The reflection in the \\(x\\)-axis gives the outside coefficient \\(-1\\). ")
      :"The vertical stretch gives the outside coefficient \\("+u2coefStr(A[0],A[1])+"\\). ")
    +(hasB
      ?"The horizontal stretch by a factor of \\("+u2coefStr(S[0],S[1])+"\\) divides the input of \\(f\\) by that factor. "
      :"There is no horizontal stretch in this transformation, so the input of \\(f\\) is used as it stands. ")
    +"The translation replaces \\(x\\) by \\("+u2xarg(h)+"\\) and adds \\("+k+"\\) to the whole function. The result is "+correct+" .";
  return mcq("The graph of \\(y = f(x)\\) is "+desc+". What is the equation of the image graph?",
    correct,dis,solText,
    {pattern:pattern,refl:refl,A:A,S:S,h:h,k:k});
});
E("u2-trans-zeros",2,["4.21","4.23"],3,"gen",function(){
  var B=pick([[2,1],[3,1],[1,2],[1,3]]);
  var p=B[0],q=B[1];
  var u1=pick([-3,-2,-1,1,2,3]),u2=pick([-3,-2,-1,1,2,3]);
  while(u2===u1)u2=pick([-3,-2,-1,1,2,3]);
  var h=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var a=pick([2,3,-2]);
  var z1=p*q*u1,z2=p*q*u2;
  function pair(t1,t2){
    var lo=Math.min(t1,t2),hi=Math.max(t1,t2);
    return "\\(\\{"+lo+", "+hi+"\\}\\)";
  }
  var correct=pair(q*q*u1+h,q*q*u2+h);
  var dis=[
    pair(p*p*u1+h,p*p*u2+h),
    pair(q*q*u1-h,q*q*u2-h),
    pair(p*p*u1-h,p*p*u2-h)
  ];
  var bArg=B[0]===1?"\\frac{"+u2xarg(h)+"}{"+B[1]+"}":B[0]+"("+u2xarg(h)+")";
  var geq="\\(g(x) = "+a+"f\\left("+bArg+"\\right)\\)";
  var lo=Math.min(z1,z2),hi=Math.max(z1,z2);
  return mcq("The graph of \\(y = f(x)\\) has \\(x\\)-intercepts "+lo+" and "+hi+". The graph of \\(f\\) is transformed to give "+geq+". What are the \\(x\\)-intercepts of the graph of \\(g\\)?",
    correct,dis,
    "Intercepts move only under the horizontal parts of the transformation; the outside coefficient "+a+" does not move them. Each intercept \\(z\\) of \\(f\\) becomes an intercept of \\(g\\) where the input of \\(f\\) again equals \\(z\\): solving gives \\(x = z \\div "+u2coefStr(p,q)+" + "+h+"\\) . Applying this to "+lo+" and "+hi+" gives the intercepts "+correct+" .",
    {B:B,h:h,a:a,u1:u1,u2:u2});
});

/* ---------- reflections: 4.40 to 4.47 ---------- */
E("u2-refl-point",2,["4.40","4.45"],1,"gen",function(){
  var x=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
  var y=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
  while(Math.abs(x)===Math.abs(y))y=pick([-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
  var axis=pick(["x","y","yx"]);
  var imgX={x:[x,-y],y:[-x,y],yx:[y,x]};
  var correct="\\("+u2pt(imgX[axis][0],imgX[axis][1])+"\\)";
  var others={x:[x,-y],y:[-x,y],yx:[y,x]};
  var dis=Object.keys(others).filter(function(key){return key!==axis;}).map(function(key){return "\\("+u2pt(others[key][0],others[key][1])+"\\)";});
  dis.push("\\("+u2pt(-x,-y)+"\\)");
  var axisName=axis==="x"?"the \\(x\\)-axis":axis==="y"?"the \\(y\\)-axis":"the line \\(y = x\\)";
  var rule=axis==="x"?"a reflection in the \\(x\\)-axis keeps the \\(x\\)-coordinate and negates the \\(y\\)-coordinate"
    :axis==="y"?"a reflection in the \\(y\\)-axis negates the \\(x\\)-coordinate and keeps the \\(y\\)-coordinate"
    :"a reflection in the line \\(y = x\\) swaps the two coordinates";
  var q=mcq("The point \\(P"+u2pt(x,y)+"\\) is reflected in "+axisName+". What is the image of \\(P\\)?",
    correct,dis,
    "Use the coordinate rule: "+rule+". Applying it to \\("+u2pt(x,y)+"\\) gives "+correct+" .",
    {x:x,y:y,axis:axis});
  q.figure=fnPlotSVG(null,-10,10,-10,10,{gx:2,gy:2,labelX:true,labelY:true,points:[[x,y]]});
  return q;
});
E("u2-refl-equation",2,["4.41","4.42","4.43","4.44"],1,"gen",function(){
  var t=ri(1,3),axis=pick(["x","y"]);
  var f,negF,fNeg,negFNeg,fn;
  if(t===1){
    var c=ri(-9,9);while(c===0)c=ri(-9,9);
    f="x^3"+u2pm(c);
    negF="-x^3"+u2pm(-c);
    fNeg="-x^3"+u2pm(c);
    negFNeg="x^3"+u2pm(-c);
    fn=function(x){return x*x*x+c;};
  }else if(t===2){
    var b=pick([-7,-6,-5,-4,-3,-2,2,3,4,5,6,7]);
    f="x^2"+u2pm(b)+"x";
    negF="-x^2"+u2pm(-b)+"x";
    fNeg="x^2"+u2pm(-b)+"x";
    negFNeg="-x^2"+u2pm(b)+"x";
    fn=function(x){return x*x+b*x;};
  }else{
    var h=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),k=ri(-6,6);
    f="|"+u2xarg(h)+"|"+u2pm0(k);
    negF="-|"+u2xarg(h)+"|"+u2pm0(-k);
    fNeg="|"+u2xarg(-h)+"|"+u2pm0(k);
    negFNeg="-|"+u2xarg(-h)+"|"+u2pm0(-k);
    fn=function(x){return Math.abs(x-h)+k;};
  }
  var correct="\\(g(x) = "+(axis==="x"?negF:fNeg)+"\\)";
  var all=[negF,fNeg,negFNeg,f];
  var dis=all.filter(function(s){return "\\(g(x) = "+s+"\\)"!==correct;}).map(function(s){return "\\(g(x) = "+s+"\\)";});
  var axisName=axis==="x"?"the \\(x\\)-axis":"the \\(y\\)-axis";
  var q=mcq("The graph of \\(f(x) = "+f+"\\) is reflected in "+axisName+". What is the equation of the image graph?",
    correct,dis,
    axis==="x"
      ?"A reflection in the \\(x\\)-axis negates the whole function: \\(g(x) = -f(x)\\). Negating every term of \\(f(x) = "+f+"\\) gives "+correct+" . Replacing \\(x\\) by \\(-x\\) instead would reflect in the \\(y\\)-axis."
      :"A reflection in the \\(y\\)-axis replaces \\(x\\) by \\(-x\\) throughout: \\(g(x) = f(-x)\\). Applying that to \\(f(x) = "+f+"\\) gives "+correct+" . Negating the whole function instead would reflect in the \\(x\\)-axis.",
    {t:t,axis:axis});
  var txr=(t===1)?[-3,3]:(t===2)?[-6,6]:[h-7,h+7];
  var tw=u2autoWin([fn],txr[0],txr[1]);
  q.figure=fnPlotSVG(fn,txr[0],txr[1],tw[0],tw[1],{gx:1,gy:tw[2],labelX:true,labelY:true});
  return q;
});
E("u2-refl-yx",2,["4.46","4.47"],3,"var",varset([
  function(){return mcq("The graph of a function \\(f\\) is reflected in the line \\(y = x\\). The image graph does <b>not</b> pass the vertical line test. What must be true of \\(f\\)?",
    "\\(f\\) is not one-to-one",
    ["\\(f\\) is not a function","The inverse of \\(f\\) is a function","\\(f\\) does not pass the vertical line test"],
    "Reflecting in the line \\(y = x\\) produces the inverse relation. The image fails the vertical line test exactly when two points of \\(f\\) share the same \\(y\\)-value, because those points swap into two image points with the same \\(x\\)-coordinate. That means \\(f\\) is not one-to-one, which is also why its inverse is not a function. The function \\(f\\) itself still passes the vertical line test, since it is given to be a function.",
    {v:1});},
  function(){return mcq("The graph of a function \\(f\\) is reflected in the line \\(y = x\\). The image graph passes the vertical line test. What must be true?",
    "The inverse of \\(f\\) is a function",
    ["\\(f\\) is not one-to-one at all","\\(f\\) fails the horizontal line test","The image is the graph of the reciprocal of \\(f\\)"],
    "The reflection in the line \\(y = x\\) is the inverse relation of \\(f\\), and it passes the vertical line test, so the inverse is a function. That happens exactly when \\(f\\) is one-to-one, equivalently when \\(f\\) passes the horizontal line test. A reflection in \\(y = x\\) has nothing to do with the reciprocal \\(\\frac{1}{f(x)}\\).",
    {v:2});},
  function(){return mcq("A function \\(f\\) is one-to-one. Its graph is reflected in the line \\(y = x\\). Which statement about the image graph is true?",
    "The image is the graph of the inverse of \\(f\\)",
    ["The image is not a function at all","The image is the reflection of \\(f\\) in the \\(x\\)-axis","The image is the graph of the reciprocal of \\(f\\)"],
    "Reflecting any graph in the line \\(y = x\\) swaps the coordinates of every point, which produces the inverse relation. Because \\(f\\) is one-to-one, no two of its points share a \\(y\\)-value, so the swapped points never share an \\(x\\)-coordinate: the image passes the vertical line test and is the graph of the inverse function.",
    {v:3});},
  function(){return mcq("A relation \\(R\\) contains the points \\((1, 4)\\) and \\((3, 4)\\). The graph of \\(R\\) is reflected in the line \\(y = x\\). Why is the image not a function?",
    "The image contains \\((4, 1)\\) and \\((4, 3)\\), two points with the same \\(x\\)-coordinate",
    ["The image contains \\((1, 4)\\) and \\((3, 4)\\), unchanged from \\(R\\) after the reflection","Every reflection in the line \\(y = x\\) produces an image that fails the vertical line test","The relation \\(R\\) is not a function to begin with, before any reflection"],
    "Reflection in the line \\(y = x\\) swaps coordinates, so \\((1, 4)\\) maps to \\((4, 1)\\) and \\((3, 4)\\) maps to \\((4, 3)\\). The image pairs the input \\(4\\) with two different outputs, so it fails the vertical line test. Note that \\(R\\) itself is a function: its two points have different \\(x\\)-coordinates.",
    {v:4});}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: one Level 3 CR entry (3 marks, opens the 6 pick with the existing 3-mark entry) and two Level 2 CR entries (3 and 2 marks). ---------- */
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u2-find-stretch-cr",2,["4.17","4.24"],3,"gen",function(){
  var h=pick([-3,-2,-1,1,2,3]), u=ri(-4,4), v=pick([-6,-5,-4,-3,-2,2,3,4,5,6]), a=pick([-3,-2,2,3]), k=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var X=u+h, Y=a*v+k;
  var hs=h>0?"x - "+h:"x + "+(-h), ks=k>0?" + "+k:" - "+(-k);
  return numq("The point \\(("+X+", "+Y+")\\) lies on the graph of \\(y = a f("+hs+")"+ks+"\\), and \\(f("+u+") = "+v+"\\). Determine the value of \\(a\\).",
    a,0.001,
    "At this point the input to \\(f\\) is \\(("+X+") - ("+h+") = "+u+"\\), and \\(f("+u+") = "+v+"\\). On the transformed graph, that output is multiplied by \\(a\\) and then shifted by \\(("+k+")\\): \\[ a("+v+") + ("+k+") = "+Y+" \\] So \\(a("+v+") = "+(Y-k)+"\\), and \\(a = "+(Y-k)+" \\div "+v+" = \\)<b>"+a+"</b>.",
    {h:h,u:u,v:v,k:k});
});
E("u2-inverse-points-cr",2,["4.2","4.4"],2,"gen",function(){
  var xs=shuffle([-4,-3,-2,-1,0,1,2,3,4]).slice(0,5);
  var ys=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,5);
  var pts=xs.map(function(x,i){return [x,ys[i]];});
  var tg=pick(pts);
  var list=pts.map(function(p){return u2pt(p[0],p[1]);}).join(", ");
  var q=numq("A relation contains the points \\("+list+"\\). The inverse relation is formed by swapping the coordinates of each point. In the inverse relation, what is the <b>y-coordinate</b> of the point whose x-coordinate is "+tg[1]+"?",
    tg[0],0.001,
    "Swapping the coordinates of \\("+u2pt(tg[0],tg[1])+"\\) gives the inverse point \\("+u2pt(tg[1],tg[0])+"\\), and no other listed point produces that x-coordinate. Its y-coordinate is <b>"+tg[0]+"</b>.",
    {tg:tg});
  q.figure=u2pointsSVG(pts);
  return q;
});
function u2reflPoly(A,B,C){ var s=(A===1?"x^2":A===-1?"-x^2":A+"x^2"); s+=(B>0?" + ":" - ")+(Math.abs(B)===1?"x":Math.abs(B)+"x"); s+=(C>0?" + "+C:" - "+(-C)); return s; }
E("u2-reflection-equation-cr",2,["4.43","4.44"],2,"var",varset([
  function(){
    var a=pick([1,2,3]), b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c=pick([-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8]);
    var q=mcq("The graph of \\(f(x) = "+u2reflPoly(a,b,c)+"\\) is reflected in the <b>y-axis</b>. What is the equation of the image?",
      "\\(y = "+u2reflPoly(a,-b,c)+"\\)",
      ["\\(y = "+u2reflPoly(a,b,c)+"\\)",
       "\\(y = "+u2reflPoly(-a,-b,-c)+"\\)",
       "\\(y = "+u2reflPoly(a,-b,-c)+"\\)"],
      "A reflection in the y-axis replaces \\(x\\) with \\(-x\\). The \\(x^2\\) term is unchanged, the \\(x\\) term changes sign, and the constant is unchanged, giving <b>\\(y = "+u2reflPoly(a,-b,c)+"\\)</b>.",
      {a:a,b:b,c:c,axis:"y"});
    var fn=function(x){return a*x*x+b*x+c;};
    var wv=u2autoWin([fn],-6,6);
    q.figure=fnPlotSVG(fn,-6,6,wv[0],wv[1],{gx:1,gy:wv[2],labelX:true,labelY:true});
    return q;
  },
  function(){
    var a=pick([1,2,3]), b=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), c=pick([-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8]);
    var q=mcq("The graph of \\(f(x) = "+u2reflPoly(a,b,c)+"\\) is reflected in the <b>x-axis</b>. What is the equation of the image?",
      "\\(y = "+u2reflPoly(-a,-b,-c)+"\\)",
      ["\\(y = "+u2reflPoly(a,-b,c)+"\\)",
       "\\(y = "+u2reflPoly(a,b,c)+"\\)",
       "\\(y = "+u2reflPoly(-a,-b,c)+"\\)"],
      "A reflection in the x-axis negates the whole function: every term of \\(f(x)\\) changes sign, giving <b>\\(y = "+u2reflPoly(-a,-b,-c)+"\\)</b>.",
      {a:a,b:b,c:c,axis:"x"});
    var fn=function(x){return a*x*x+b*x+c;};
    var wv=u2autoWin([fn],-6,6);
    q.figure=fnPlotSVG(fn,-6,6,wv[0],wv[1],{gx:1,gy:wv[2],labelX:true,labelY:true});
    return q;
  }
]));
