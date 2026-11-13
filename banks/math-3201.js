/* Math 3201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-3201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Math 3201 shared bank helpers, carried verbatim from the standalone
// app's bank source: the bank-local helpers the first builds use,
// plus the graph helpers for Units 2 to 4.
/* ================= bank-local helpers (Unit 1-4 builds) ================= */
function gcd2(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=x%y;x=y;y=t;}return x||1;}
function frN(n,d){var g=gcd2(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}if(d===1)return ""+n;return "\\frac{"+n+"}{"+d+"}";}
function linS(a,b){var s;if(a===1)s="x";else if(a===-1)s="-x";else if(a===0)s="";else s=a+"x";if(b===0)return s===""?"0":s;if(s==="")return ""+b;return s+(b>0?" + "+b:" - "+(-b));}
function linF(r){if(r===0)return "x";return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
function quadS(a,b,c){var s;if(a===1)s="x^2";else if(a===-1)s="-x^2";else s=a+"x^2";if(b!==0)s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"x":Math.abs(b)+"x");if(c!==0)s+=(c>0?" + ":" - ")+Math.abs(c);return s;}
function quadR(r1,r2){return quadS(1,-(r1+r2),r1*r2);}
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
function MV(s){return "\\("+s+"\\)";}

/* ================= graph helpers for Units 2 to 4 ================= */
function plotSVG(fn,x0,x1,y0,y1,o){
  o=o||{};var W=440,H=250,pad=26;
  var X=function(x){return pad+(x-x0)/(x1-x0)*(W-2*pad);};
  var Y=function(y){return H-pad-(y-y0)/(y1-y0)*(H-2*pad);};
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gsx=o.gx||1,gsy=o.gy||1,gx,gy;
  for(gx=Math.ceil(x0/gsx)*gsx;gx<=x1;gx+=gsx){out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelX)out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+fmt(gx)+'</text>';}
  for(gy=Math.ceil(y0/gsy)*gsy;gy<=y1;gy+=gsy){out+='<line x1="'+pad+'" y1="'+fmt(Y(gy),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gy),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelY&&gy!==0)out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gy)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+fmt(gy)+'</text>';}
  if(y0<0&&y1>0)out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">x</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">y</text>';
  if(!o.nocurve&&fn){
    var pts=[],N=140,i,x,y;
    for(i=0;i<=N;i++){x=x0+(x1-x0)*i/N;y=fn(x);if(y<y0)y=y0;if(y>y1)y=y1;pts.push(fmt(X(x),1)+","+fmt(Y(y),1));}
    out+='<polyline points="'+pts.join(" ")+'" fill="none" stroke="#0f766e" stroke-width="2.2"/>';
  }
  (o.points||[]).forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>';});
  return out+'</svg>';
}
function tblHTML(xs,ys,xh,yh){
  var s='<table><tr><th>'+xh+'</th>';xs.forEach(function(x){s+='<td>'+x+'</td>';});
  s+='</tr><tr><th>'+yh+'</th>';ys.forEach(function(y){s+='<td>'+(y===null?'?':y)+'</td>';});
  return s+'</tr></table>';
}

/* ================= Graphics pass tranche 4 builders (ported from the Math 3200 helpers) ================= */
// fnPathD: sample fn on [x0,x1]; skip non-finite values and break the path
// on jumps (asymptotes) instead of drawing false lines. No clamping.
function fnPathD(fn,X,Y,x0,x1,y0,y1,N){
  N=N||240;var d="",pen=false,py=0,i,x,y;
  for(i=0;i<=N;i++){
    x=x0+(x1-x0)*i/N;
    try{y=fn(x);}catch(e){y=NaN;}
    if(typeof y!=="number"||!isFinite(y)||y<y0||y>y1){pen=false;continue;}
    if(pen&&Math.abs(y-py)>0.75*(y1-y0)){pen=false;}
    d+=(pen?"L ":"M ")+fmt(X(x),1)+" "+fmt(Y(y),1)+" ";
    pen=true;py=y;
  }
  return d;
}
function fnPlotSVG(fn,x0,x1,y0,y1,o){
  o=o||{};
  var i,x,y;
  if(y0===undefined||y1===undefined){
    var lo=Infinity,hi=-Infinity;
    for(i=0;i<=400;i++){
      x=x0+(x1-x0)*i/400;
      try{y=fn(x);}catch(e){y=NaN;}
      if(typeof y==="number"&&isFinite(y)){if(y<lo)lo=y;if(y>hi)hi=y;}
    }
    if(!isFinite(lo)){lo=-1;hi=1;}
    if(o.asymY!==undefined){lo=Math.min(lo,o.asymY);hi=Math.max(hi,o.asymY);}
    var padY=(hi-lo)*0.15+0.5;
    if(y0===undefined)y0=Math.floor((lo-padY)*2)/2;
    if(y1===undefined)y1=Math.ceil((hi+padY)*2)/2;
    if(y1-y0<1)y1=y0+1;
  }
  var W=440,H=250,padL=30,padR=12,padT=10,padB=24;
  var X=function(x){return padL+(x-x0)/(x1-x0)*(W-padL-padR);};
  var Y=function(y){return H-padB-(y-y0)/(y1-y0)*(H-padT-padB);};
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  function labFmt(v,labels){
    if(labels){for(var j=0;j<labels.length;j++){if(Math.abs(labels[j][0]-v)<1e-6)return labels[j][1];}}
    return fmt(v);
  }
  var gx=o.gx||1,gy=o.gy||1,g,idx;
  if((x1-x0)/gx<=220){
    idx=0;
    for(g=Math.ceil(x0/gx)*gx;g<=x1+1e-9;g+=gx,idx++){
      out+='<line x1="'+fmt(X(g),1)+'" y1="'+padT+'" x2="'+fmt(X(g),1)+'" y2="'+(H-padB)+'" stroke="#eae5d6" stroke-width="1"/>';
      if(o.labelX&&(!o.labelEvery||idx%o.labelEvery===0))
        out+='<text x="'+fmt(X(g),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+labFmt(g,o.xLabels)+'</text>';
    }
  }
  if((y1-y0)/gy<=220){
    for(g=Math.ceil(y0/gy)*gy;g<=y1+1e-9;g+=gy){
      out+='<line x1="'+padL+'" y1="'+fmt(Y(g),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(g),1)+'" stroke="#eae5d6" stroke-width="1"/>';
      if(o.labelY&&!(g===0&&o.labelX))
        out+='<text x="'+(padL-4)+'" y="'+fmt(Y(g)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+labFmt(g,o.yLabels)+'</text>';
    }
  }
  if(y0<0&&y1>0)out+='<line x1="'+padL+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+padT+'" x2="'+fmt(X(0),1)+'" y2="'+(H-padB)+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  var xLabY=(y0<0&&y1>0)?Y(0):(H-padB);
  out+='<text x="'+(W-padR-2)+'" y="'+fmt(xLabY-6,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">x</text>';
  var yLabX=(x0<0&&x1>0)?X(0):padL;
  out+='<text x="'+fmt(yLabX+6,1)+'" y="'+(padT+10)+'" font-size="12" fill="'+FIG_INK+'">y</text>';
  if(o.asymY!==undefined&&o.asymY>y0&&o.asymY<y1){
    out+='<line x1="'+padL+'" y1="'+fmt(Y(o.asymY),1)+'" x2="'+(W-padR)+'" y2="'+fmt(Y(o.asymY),1)+'" stroke="'+FIG_ALT+'" stroke-width="1.4" stroke-dasharray="6 4"/>';
    out+='<text x="'+(W-padR-4)+'" y="'+fmt(Y(o.asymY)-5,1)+'" font-size="10" fill="'+FIG_ALT+'" text-anchor="end">y = '+fmt(o.asymY)+'</text>';
  }
  if(o.asymX!==undefined&&o.asymX>=x0&&o.asymX<=x1){
    out+='<line x1="'+fmt(X(o.asymX),1)+'" y1="'+padT+'" x2="'+fmt(X(o.asymX),1)+'" y2="'+(H-padB)+'" stroke="'+FIG_ALT+'" stroke-width="1.4" stroke-dasharray="6 4"/>';
    out+='<text x="'+fmt(X(o.asymX)+5,1)+'" y="'+(padT+24)+'" font-size="10" fill="'+FIG_ALT+'">x = '+fmt(o.asymX)+'</text>';
  }
  if(fn){
    var d=fnPathD(fn,X,Y,x0,x1,y0,y1,o.N);
    if(d)out+='<path d="'+d+'" fill="none" stroke="'+(o.color||FIG_ACC)+'" stroke-width="2.2"/>';
  }
  (o.extraFns||[]).forEach(function(ef){
    var dd=fnPathD(ef.fn,X,Y,x0,x1,y0,y1,o.N);
    if(dd)out+='<path d="'+dd+'" fill="none" stroke="'+(ef.color||FIG_ALT)+'" stroke-width="2"/>';
  });
  (o.points||[]).forEach(function(p,i){
    out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="'+FIG_ALT+'"/>';
    if(o.pointLabels&&o.pointLabels[i])out+='<text x="'+fmt(X(p[0])+7,1)+'" y="'+fmt(Y(p[1])-7,1)+'" font-size="10" fill="'+FIG_INK+'">'+o.pointLabels[i]+'</text>';
  });
  return out+'</svg>';
}
function treeSVG(stages,o){
  o=o||{};
  function optsAt(depth,path){
    var s=stages[depth];
    return (typeof s.options==="function")?s.options(path.slice()):s.options;
  }
  function countLeaves(depth,path){
    if(depth>=stages.length)return 1;
    var opts=optsAt(depth,path),sum=0,i;
    for(i=0;i<opts.length;i++)sum+=countLeaves(depth+1,path.concat([opts[i]]));
    return sum;
  }
  var leaves=countLeaves(0,[]);
  var maxL=o.maxLeaves||120;
  if(leaves>maxL)return null;
  var pitch=leaves<=12?24:(leaves<=30?19:16);
  var colW=o.colW||104;
  var leafW=o.leafLabel?58:14;
  var W=36+stages.length*colW+leafW;
  var top=34,H=top+leaves*pitch+8;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:520px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var d,px,cx;
  for(d=0;d<stages.length;d++){
    px=(d===0)?18:36+(d-1)*colW;
    cx=36+d*colW;
    if(stages[d].title)out+='<text x="'+fmt((px+cx)/2,1)+'" y="16" font-size="10.5" fill="'+FIG_INK+'" text-anchor="middle">'+stages[d].title+'</text>';
  }
  var body="",leafIdx=0;
  function layout(depth,path){
    var x=(depth<0)?18:36+depth*colW;
    if(depth===stages.length-1){
      var ly=top+(leafIdx+0.5)*pitch;leafIdx++;
      body+='<circle cx="'+x+'" cy="'+fmt(ly,1)+'" r="2.6" fill="'+FIG_ALT+'"/>';
      if(o.leafLabel)body+='<text x="'+(x+8)+'" y="'+fmt(ly+3.5,1)+'" font-size="10.5" fill="'+FIG_INK+'">'+o.leafLabel(path)+'</text>';
      return ly;
    }
    var opts=optsAt(depth+1,path),ys=[],i;
    for(i=0;i<opts.length;i++)ys.push(layout(depth+1,path.concat([opts[i]])));
    var y=(ys[0]+ys[ys.length-1])/2;
    var nx=36+(depth+1)*colW;
    for(i=0;i<opts.length;i++){
      body+='<line x1="'+x+'" y1="'+fmt(y,1)+'" x2="'+nx+'" y2="'+fmt(ys[i],1)+'" stroke="#8a8272" stroke-width="1.2"/>';
      body+='<text x="'+fmt(nx-7,1)+'" y="'+fmt(ys[i]-5,1)+'" font-size="10" fill="#5a5344" text-anchor="end">'+opts[i]+'</text>';
    }
    body+='<circle cx="'+x+'" cy="'+fmt(y,1)+'" r="2.6" fill="'+FIG_INK+'"/>';
    return y;
  }
  layout(-1,[]);
  return out+body+'</svg>';
}

/* ================= Venn builders, moved from bank-u7.js (Graphics pass tranche 4) ================= */
function venn2(aO,both,bO,none,lA,lB,mark){
  var s="<svg viewBox='0 0 220 150' width='220' height='150' xmlns='http://www.w3.org/2000/svg'>"
  +"<rect x='4' y='4' width='212' height='142' fill='none' stroke='#888'/>"
  +"<circle cx='84' cy='74' r='44' fill='#3a7bd5' fill-opacity='0.22' stroke='#3a7bd5'/>"
  +"<circle cx='136' cy='74' r='44' fill='#e67e22' fill-opacity='0.22' stroke='#e67e22'/>"
  +"<text x='14' y='20' font-size='12' fill='#666'>U</text>"
  +"<text x='52' y='38' font-size='13' font-weight='bold' fill='#2c5f9e'>"+lA+"</text>"
  +"<text x='146' y='38' font-size='13' font-weight='bold' fill='#b35c14'>"+lB+"</text>";
  if(aO!==null)s+="<text x='66' y='79' font-size='14' text-anchor='middle'>"+aO+"</text>";
  if(both!==null)s+="<text x='110' y='79' font-size='14' text-anchor='middle'>"+both+"</text>";
  if(bO!==null)s+="<text x='154' y='79' font-size='14' text-anchor='middle'>"+bO+"</text>";
  if(none!==null)s+="<text x='206' y='136' font-size='14' text-anchor='end'>"+none+"</text>";
  if(mark)s+="<text x='"+mark[0]+"' y='"+mark[1]+"' font-size='17' text-anchor='middle' fill='#c0392b'>★</text>";
  return s+"</svg>";
}
function venn3(aO,bO,cO,ab,ac,bc,abc,none,lA,lB,lC){
  var s="<svg viewBox='0 0 220 172' width='220' height='172' xmlns='http://www.w3.org/2000/svg'>"
  +"<rect x='4' y='4' width='212' height='164' fill='none' stroke='#888'/>"
  +"<circle cx='110' cy='64' r='40' fill='#3a7bd5' fill-opacity='0.20' stroke='#3a7bd5'/>"
  +"<circle cx='82' cy='110' r='40' fill='#27ae60' fill-opacity='0.20' stroke='#27ae60'/>"
  +"<circle cx='138' cy='110' r='40' fill='#e67e22' fill-opacity='0.20' stroke='#e67e22'/>"
  +"<text x='14' y='20' font-size='12' fill='#666'>U</text>"
  +"<text x='110' y='16' font-size='13' font-weight='bold' text-anchor='middle' fill='#2c5f9e'>"+lA+"</text>"
  +"<text x='30' y='88' font-size='13' font-weight='bold' fill='#1e8449'>"+lB+"</text>"
  +"<text x='178' y='88' font-size='13' font-weight='bold' fill='#b35c14'>"+lC+"</text>"
  +"<text x='110' y='45' font-size='13' text-anchor='middle'>"+aO+"</text>"
  +"<text x='52' y='133' font-size='13' text-anchor='middle'>"+bO+"</text>"
  +"<text x='168' y='133' font-size='13' text-anchor='middle'>"+cO+"</text>"
  +"<text x='83' y='86' font-size='13' text-anchor='middle'>"+ab+"</text>"
  +"<text x='137' y='86' font-size='13' text-anchor='middle'>"+ac+"</text>"
  +"<text x='110' y='133' font-size='13' text-anchor='middle'>"+bc+"</text>"
  +"<text x='110' y='106' font-size='13' text-anchor='middle'>"+abc+"</text>"
  +"<text x='208' y='162' font-size='13' text-anchor='end'>"+none+"</text>";
  return s+"</svg>";
}

/* ----- bank-u1.js ----- */
// Math 3201 Unit 1 Rational Expressions and Equations question bank
// CRMARKS: u1-add-diff-den=2
// CRMARKS: u1-add-same-den=2
// CRMARKS: u1-context-cost=3
// CRMARKS: u1-context-wind=3
// CRMARKS: u1-context-work=3
// CRMARKS: u1-create-equivalent=1
// CRMARKS: u1-div=2
// CRMARKS: u1-equiv-forms=1
// CRMARKS: u1-error-simplify=2
// CRMARKS: u1-lcd=1
// CRMARKS: u1-mult=2
// CRMARKS: u1-npv-equation=1
// CRMARKS: u1-npv-linear=1
// CRMARKS: u1-npv-operations=1
// CRMARKS: u1-npv-quadratic=2
// CRMARKS: u1-reverse-restrictions=3
// CRMARKS: u1-simplify-gcf=1
// CRMARKS: u1-simplify-monomial=1
// CRMARKS: u1-simplify-quad=2
// CRMARKS: u1-solve-cross=2
// CRMARKS: u1-solve-quad-eq=2
// CRMARKS: u1-solve-simple=1
// CRMARKS: u1-sub-monomial-den=2
// CRMARKS: u1-two-step-simplify=3
/* ================= Unit 1: Rational Expressions and Equations ================= */
/* --- non-permissible values and equivalence (3.1, 3.2, 3.3, 3.4, 3.6, 3.7) --- */
E("u1-npv-linear",1,["3.2"],1,"gen",function(){
  var shape=ri(1,3),numDen,root,solSteps;
  var num=pick([linS(ri(2,6),ri(-5,5)),ri(2,9)+"x",quadS(1,ri(-4,4),ri(-9,9)),""+ri(2,12)]);
  if(shape===1){root=ri(-9,9);numDen=linF(root);solSteps="Set the denominator equal to zero: \\("+linF(root)+" = 0\\), so \\(x = "+root+"\\)";}
  else if(shape===2){var a=ri(2,5);root=ri(-6,6);while(root===0)root=ri(-6,6);numDen=linS(a,-a*root);solSteps="Set the denominator equal to zero and solve: \\[ \\begin{aligned} "+linS(a,-a*root)+" &= 0 \\\\ "+a+"x &= "+(a*root)+" \\\\ x &= "+root+" \\end{aligned} \\]";}
  else{var a2=pick([1,2,3,4,5,6,7,8,9]);root=0;numDen=(a2===1?"x":a2+"x");solSteps="Set the denominator equal to zero: \\("+numDen+" = 0\\), so \\(x = 0\\)";}
  return numq("What is the <b>non-permissible value</b> of the rational expression \\("+FR(num,numDen)+"\\)?",
    root,0.001,
    solSteps+". Division by zero is undefined, so the non-permissible value is <b>\\(x = "+root+"\\)</b>.",
    {root:root,shape:shape});
});
E("u1-npv-why",1,["3.1"],1,"var",varset([
  function(){return mcq("Why is \\(x = 3\\) a non-permissible value for the expression \\("+FR("5","x - 3")+"\\)?",
    "Substituting \\(x = 3\\) makes the denominator equal to 0, and division by zero is undefined",
    ["Substituting \\(x = 3\\) makes the numerator equal to 0, and a numerator of 0 is not allowed","Substituting \\(x = 3\\) makes the expression negative, and negative values are not allowed","The expression has no numerator when \\(x = 3\\), so there is nothing to divide by the denominator"],
    "A value is non-permissible when it makes a denominator zero: \\(3 - 3 = 0\\). The numerator being zero would be fine; it is the denominator that cannot be 0.",{});},
  function(){return mcq("Why is \\(x = -4\\) a non-permissible value for the expression \\("+FR("2x + 1","x + 4")+"\\)?",
    "Substituting \\(x = -4\\) makes the denominator equal to 0, and division by zero is undefined",
    ["Substituting \\(x = -4\\) makes the numerator equal to 0, and a numerator of 0 is not allowed","Substituting \\(x = -4\\) makes the expression equal to 1, and an expression cannot equal 1 there","The variable cannot be negative in a rational expression, so a negative value is never permitted"],
    "Check the denominator: \\(-4 + 4 = 0\\). Any value that makes a denominator 0 is non-permissible, whether it is positive or negative.",{});},
  function(){return mcq("Why is \\(x = 2\\) a non-permissible value for the expression \\("+FR("x^2","3x - 6")+"\\)?",
    "Substituting \\(x = 2\\) makes the denominator equal to 0, and division by zero is undefined",
    ["Substituting \\(x = 2\\) makes the numerator equal to 0, and a numerator of 0 is not allowed","Substituting \\(x = 2\\) makes the expression equal to 0, and the expression cannot equal 0 there","The denominator is a multiple of the numerator when \\(x = 2\\), and that relationship is not allowed"],
    "In the denominator, \\(3(2) - 6 = 0\\). Non-permissible values always come from the denominator being zero, never from the numerator.",{});}
]));
E("u1-npv-quadratic",1,["3.2"],1,"gen",function(){
  var r1=ri(-8,8),r2=ri(-8,8),t=0;
  while((r1===0||r2===0||r1===r2||r1+r2===0)&&t<60){r1=ri(-8,8);r2=ri(-8,8);t++;}
  var lo=Math.min(r1,r2),hi=Math.max(r1,r2);
  var num=pick([linS(ri(1,4),ri(-6,6)),""+ri(2,10),quadS(1,ri(-3,3),ri(-8,8))]);
  var pair=function(a,b){return "\\(x = "+a+"\\) and \\(x = "+b+"\\)";};
  return mcq("What are the <b>non-permissible values</b> of the rational expression \\("+FR(num,quadR(r1,r2))+"\\)?",
    pair(lo,hi),
    [pair(-hi,-lo),"\\(x = "+hi+"\\) is the only one",pair(lo+hi,lo*hi)],
    "Set the denominator equal to zero and factor: \\("+quadR(r1,r2)+" = "+linF(r1)+linF(r2)+" = 0\\). So \\(x = "+lo+"\\) or \\(x = "+hi+"\\). The non-permissible values are <b>\\(x = "+lo+"\\) and \\(x = "+hi+"\\)</b>. Watch the signs: the roots of the factors are the values themselves, not their opposites.",
    {r1:r1,r2:r2});
});
E("u1-equiv-forms",1,["3.3"],1,"gen",function(){
  var a=ri(2,6),rb=ri(-7,7),rm=ri(-7,7),t=0;
  while((rm===rb||rm===0)&&t<40){rm=ri(-7,7);t++;}
  var den=linF(rb),fac=linF(rm);
  return mcq("Which expression is <b>equivalent</b> to \\("+FR(""+a,den)+"\\)?",
    MV(FR(a+fac,den+fac)),
    [MV(FR(a+fac,den)),MV(FR(""+a,den+fac)),MV(FR(a+linF(-rm),den+fac))],
    "An equivalent expression is made by multiplying the numerator and the denominator by the same nonzero expression, here \\("+fac+"\\). Multiplying only the top, only the bottom, or the top by a different factor changes the value of the expression.",
    {a:a,rb:rb,rm:rm});
});
E("u1-create-equivalent",1,["3.4"],1,"gen",function(){
  var a=ri(2,5),b=ri(-7,7),c=ri(1,4),d=ri(-7,7),t=0;
  while((b===0||d===0||(a===c&&b===d))&&t<60){b=ri(-7,7);d=ri(-7,7);t++;}
  var kf=ri(2,7),s=pick([1,-1]),mid=a*s*kf+b,last=b*s*kf;
  return mcq("The numerator and denominator of \\("+FR(linS(a,b),linS(c,d))+"\\) are both multiplied by \\((x "+(s>0?"+ ":"- ")+kf+")\\). What is the <b>new numerator</b>?",
    MV(quadS(a,mid,last)),
    [MV(quadS(a,mid,-last)),MV(quadS(a,-a*s*kf+b,last)),MV(quadS(c,c*s*kf+d,d*s*kf))],
    "Multiply out: \\(("+linS(a,b)+")(x "+(s>0?"+ ":"- ")+kf+") = "+quadS(a,mid,last)+"\\). The first distractor flips the sign of the constant term, the second uses the wrong sign on the middle term, and the third is the new denominator, not the numerator.",
    {a:a,b:b,c:c,d:d,kf:kf,s:s});
});
E("u1-npv-simplified",1,["3.6"],2,"var",varset([
  function(){return mcq("The expression \\("+FR(quadR(2,5),quadR(2,-3))+"\\) simplifies to \\("+FR("x - 5","x + 3")+"\\). A student says the simplified expression is non-permissible only when \\(x = -3\\). Which statement is correct?",
    "The student is wrong: \\(x = 2\\) is still non-permissible, because simplifying does not change the values for which the original expression is undefined",
    ["The student is right: cancelling the common factor removes its restriction, so only the values left in the denominator are still non-permissible","The only non-permissible value is \\(x = 2\\), because cancelling a common factor keeps its own restriction while the restriction from the other factor is dropped","Once an expression is simplified, it has no non-permissible values, because the simplified form can be evaluated for every value of the variable"],
    "The original denominator is \\((x - 2)(x + 3)\\), which is zero when \\(x = 2\\) and when \\(x = -3\\). Cancelling \\((x - 2)\\) changes how the expression is written, not where it is defined, so both restrictions carry over.",{});},
  function(){return mcq("The expression \\("+FR(quadR(-4,1),quadR(-4,6))+"\\) simplifies to \\("+FR("x - 1","x - 6")+"\\). A student says the simplified expression is non-permissible only when \\(x = 6\\). Which statement is correct?",
    "The student is wrong: \\(x = -4\\) is still non-permissible, because simplifying does not change the values for which the original expression is undefined",
    ["The student is right: cancelling the common factor removes its restriction, so only the values left in the denominator are still non-permissible","The only non-permissible value is \\(x = -4\\), because cancelling a common factor keeps its own restriction while the restriction from the other factor is dropped","Once an expression is simplified, it has no non-permissible values, because the simplified form can be evaluated for every value of the variable"],
    "The original denominator is \\((x + 4)(x - 6)\\), zero when \\(x = -4\\) and when \\(x = 6\\). The cancelled factor still contributes its restriction to the simplified form.",{});},
  function(){return mcq("The expression \\("+FR(quadR(3,-2),quadR(3,-5))+"\\) simplifies to \\("+FR("x + 2","x + 5")+"\\). A student says the simplified expression is non-permissible only when \\(x = -5\\). Which statement is correct?",
    "The student is wrong: \\(x = 3\\) is still non-permissible, because simplifying does not change the values for which the original expression is undefined",
    ["The student is right: cancelling the common factor removes its restriction, so only the values left in the denominator are still non-permissible","The only non-permissible value is \\(x = 3\\), because cancelling a common factor keeps its own restriction while the restriction from the other factor is dropped","Once an expression is simplified, it has no non-permissible values, because the simplified form can be evaluated for every value of the variable"],
    "The original denominator is \\((x - 3)(x + 5)\\), zero when \\(x = 3\\) and when \\(x = -5\\). Restrictions are a property of the original expression and survive simplification.",{});}
]));
E("u1-reverse-restrictions",1,["3.6"],3,"gen",function(){
  var r1=ri(-7,7),r2=ri(-7,7),r3=ri(-7,7),t=0;
  while((r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-7,7);r2=ri(-7,7);r3=ri(-7,7);t++;}
  var opt=function(n1,n2,d1,d2){return MV(FR(linF(n1)+linF(n2),linF(d1)+linF(d2)));};
  return mcq("A rational expression simplifies to \\("+FR(linF(r2),linF(r3))+"\\), and its non-permissible values are \\(x = "+r1+"\\) and \\(x = "+r3+"\\). Which expression could it have been <b>before</b> simplifying?",
    opt(r1,r2,r1,r3),
    [opt(r2,r3,r1,r3),opt(r1,r2,r2,r3),opt(r1,r3,r1,r3)],
    "The original denominator must be zero at both non-permissible values, so it needs the factors \\("+linF(r1)+"\\) and \\("+linF(r3)+"\\). Cancelling the shared factor \\("+linF(r1)+"\\) must leave \\("+FR(linF(r2),linF(r3))+"\\), so the numerator needs \\("+linF(r1)+"\\) and \\("+linF(r2)+"\\). Only the correct option satisfies both conditions at once.",
    {r1:r1,r2:r2,r3:r3});
});
E("u1-error-simplify",1,["3.7"],1,"var",varset([
  function(){return mcq("A student simplifies \\("+FR("5x + 20","5")+"\\) and gets \\(x + 20\\). What is the <b>correct</b> simplified form?",
    "\\(x + 4\\)",
    ["\\(x + 20\\)","\\(5x + 4\\)","\\(25x + 20\\)"],
    "Every term in the numerator must be divided by 5: \\(\\frac{5x}{5} + \\frac{20}{5} = x + 4\\). The student divided only the first term, which is the error.",{});},
  function(){return mcq("A student simplifies \\("+FR("x^2 - 9","x - 3")+"\\) and gets \\(x - 3\\). What is the <b>correct</b> simplified form?",
    "\\(x + 3\\), where \\(x \\ne 3\\)",
    ["\\(x - 3\\), where \\(x \\ne 3\\)","\\(x + 9\\), where \\(x \\ne 3\\)","\\(x - 9\\), where \\(x \\ne 3\\)"],
    "Factor first: \\(x^2 - 9 = (x - 3)(x + 3)\\), a difference of squares. Cancelling \\((x - 3)\\) leaves \\(x + 3\\). The student treated \\(-9\\) and \\(-3\\) as a common factor, but terms cannot be cancelled, only factors.",{});},
  function(){return mcq("A student simplifies \\("+FR("6 - 2x","2")+"\\) and gets \\(3 - 2x\\). What is the <b>correct</b> simplified form?",
    "\\(3 - x\\)",
    ["\\(3 - 2x\\)","\\(6 - x\\)","\\(3 + x\\)"],
    "Divide both terms by 2: \\(\\frac{6}{2} - \\frac{2x}{2} = 3 - x\\). The student divided only the constant term and left \\(-2x\\) untouched.",{});}
]));

/* --- simplifying (3.5) --- */
E("u1-simplify-monomial",1,["3.5"],1,"gen",function(){
  if(Math.random()<0.5){
    var a=ri(2,12),b=ri(2,12),t=0;
    while((gcd2(a,b)<2||a===b)&&t<80){a=ri(2,12);b=ri(2,12);t++;}
    var m=ri(2,4),n=ri(1,m-1),pw=m-n,pws=(pw===1?"x":"x^"+pw),coef=frN(a,b);
    var ds1=[MV(frN(b,a)+pws),MV(coef+"x^"+(m+n)),MV(FR(a,b)+pws)];
    if(coef.indexOf("/")<0&&coef.indexOf("frac")<0&&pw===1){ds1[2]=MV(""+a+pws);}
    return mcq("Simplify: \\("+FR(a+"x^"+m,b+"x^"+n)+"\\)",
      MV(coef+pws),
      ds1,
      "Divide the coefficients and subtract the exponents: \\(\\frac{"+a+"}{"+b+"} = "+coef+"\\) and \\(x^"+m+" \\div x^"+n+" = x^"+pw+"\\)"+(pw===1?"":"")+". The simplified form is <b>\\("+coef+pws+"\\)</b>. The coefficient must be reduced, and dividing powers subtracts exponents rather than adding them.",
      {a:a,b:b,m:m,n:n});
  }
  var a2=ri(2,9),b2=ri(-9,9),c2=ri(2,9),g=1,t2=0;
  while(t2<80){a2=ri(2,9);b2=ri(-9,9);c2=ri(2,9);g=gcd2(gcd2(a2,b2),c2);if(b2!==0&&g>=2)break;t2++;}
  var corr=(c2/g===1)?MV(linS(a2/g,b2/g)):MV(FR(linS(a2/g,b2/g),""+(c2/g)));
  return mcq("Simplify: \\("+FR(quadS(a2,b2,0),c2+"x")+"\\)",
    corr,
    [MV(FR(linS(a2,b2),""+c2)),(c2/g===1)?MV(linS(a2/g,b2)):MV(FR(linS(a2/g,b2/g),""+c2)),MV(FR(linS(a2,b2/g),""+(c2/g)))],
    "Factor the numerator and divide every term by the common factor \\("+g+"x\\), then cancel \\(x\\) and reduce by \\("+g+"\\): \\[ \\begin{aligned} \\frac{"+quadS(a2,b2,0)+"}{"+c2+"x} &= \\frac{x("+linS(a2,b2)+")}{"+c2+"x} \\\\ &= "+corr.slice(2,-2)+" \\end{aligned} \\]",
    {a:a2,b:b2,c:c2,g:g});
});
E("u1-simplify-gcf",1,["3.5"],1,"gen",function(){
  var c=ri(1,4),d=ri(-8,8),k=ri(2,7),t=0;
  while(d===0&&t<40){d=ri(-8,8);t++;}
  return numq("Simplify: \\("+FR(linS(k*c,k*d),linS(c,d))+"\\)",
    k,0.001,
    "Factor the numerator: \\("+linS(k*c,k*d)+" = "+k+"("+linS(c,d)+")\\). The factor \\(("+linS(c,d)+")\\) cancels with the denominator, leaving <b>\\("+k+"\\)</b>.",
    {c:c,d:d,k:k});
});
E("u1-simplify-quad",1,["3.5"],2,"gen",function(){
  var r1=ri(-8,8),r2=ri(-8,8),r3=ri(-8,8),t=0;
  while((r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-8,8);r2=ri(-8,8);r3=ri(-8,8);t++;}
  return mcq("Simplify: \\("+FR(quadR(r1,r2),quadR(r1,r3))+"\\)",
    MV(FR(linF(r2),linF(r3))),
    [MV(FR(linF(r1),linF(r3))),MV(FR(linF(r3),linF(r2))),MV(FR(linF(r2),linF(r1)))],
    "Factor both quadratics: the numerator is \\("+linF(r1)+linF(r2)+"\\) and the denominator is \\("+linF(r1)+linF(r3)+"\\). Cancelling the shared factor \\("+linF(r1)+"\\) leaves <b>\\("+FR(linF(r2),linF(r3))+"\\)</b>, with \\(x \\ne "+r1+"\\) and \\(x \\ne "+r3+"\\).",
    {r1:r1,r2:r2,r3:r3});
});
/* --- operations (3.8, 3.9, 3.10, 3.11, 3.12) --- */
E("u1-add-same-den",1,["3.10"],2,"gen",function(){
  var r=ri(-8,8),op=pick(["+","-"]),a1,b1,m,t=0,qa,qb;
  do{a1=ri(1,4);b1=ri(-8,8);m=ri(-6,6);t++;
    if(op==="+"){qa=m-a1;qb=-m*r-b1;}else{qa=a1-m;qb=b1+m*r;}
  }while((m===0||(qa===0&&qb===0))&&t<80);
  var D=linF(r),P=linS(a1,b1),Q=linS(qa,qb),S=linS(m,-m*r);
  var other=(op==="+")?linS(a1-qa,b1-qb):linS(a1+qa,b1+qb);
  return mcq("Determine, in simplified form: \\("+FR(P,D)+" "+op+" "+FR(Q,D)+"\\)",
    MV(""+m),
    [MV(FR(S,D)),MV(""+(-m)),MV(FR(other,D))],
    "The denominators already match, so combine the numerators: the numerator becomes \\("+S+" = "+m+linF(r)+"\\) . Cancelling \\("+linF(r)+"\\) with the denominator leaves <b>\\("+m+"\\)</b> (with \\(x \\ne "+r+"\\)). The first distractor is the combined fraction before cancelling.",
    {r:r,op:op,m:m});
});
E("u1-add-diff-den",1,["3.11"],2,"gen",function(){
  var p=ri(-8,8),q=ri(-8,8),a=ri(2,6),b=ri(2,6),op=pick(["+","-"]),t=0;
  while((p===0||q===0||p===q||a===b)&&t<80){p=ri(-8,8);q=ri(-8,8);a=ri(2,6);b=ri(2,6);t++;}
  var den=linF(p)+linF(q);
  var nA=(op==="+")?a+b:a-b, nB=(op==="+")?(-a*q-b*p):(-a*q+b*p);
  var nA2=(op==="+")?a-b:a+b, nB2=(op==="+")?(-a*q+b*p):(-a*q-b*p);
  return mcq("Determine, in simplified form: \\("+FR(""+a,linF(p))+" "+op+" "+FR(""+b,linF(q))+"\\)",
    MV(FR(linS(nA,nB),den)),
    [MV(FR(""+(op==="+"?a+b:a-b),den)),MV(FR(linS(nA2,nB2),den)),MV(FR(linS(nA,nB),quadS(1,p+q,p*q)))],
    "The lowest common denominator is \\("+den+"\\). Rewrite each fraction with that denominator and combine: the numerator is \\("+a+"(x "+(q>0?"- "+q:"+ "+(-q))+") "+op+" "+b+"(x "+(p>0?"- "+p:"+ "+(-p))+") = "+linS(nA,nB)+"\\). The result is <b>\\("+FR(linS(nA,nB),den)+"\\)</b>. Adding the numerators straight across, or using the wrong operation on the second term, gives the distractors.",
    {p:p,q:q,a:a,b:b,op:op});
});
E("u1-sub-monomial-den",1,["3.11"],2,"gen",function(){
  var a=ri(2,7),b=ri(2,9),op=pick(["+","-"]);
  var nb=(op==="-")?-b:b, straight=(op==="-")?(a-b):(a+b);
  return mcq("Determine, in simplified form: \\("+FR(""+a,"x")+" "+op+" "+FR(""+b,"x^2")+"\\)",
    MV(FR(linS(a,nb),"x^2")),
    [MV(FR(""+straight,"x^2")),MV(FR(linS(a,-nb),"x^2")),MV(FR(linS(a,nb),"x"))],
    "The lowest common denominator is \\(x^2\\), so the first fraction becomes \\(\\frac{"+a+"x}{x^2}\\). Combining gives \\(\\frac{"+linS(a,nb)+"}{x^2}\\). The result is <b>\\("+FR(linS(a,nb),"x^2")+"\\)</b>. The denominators cannot be treated as equal, and the denominator of the answer is \\(x^2\\), not \\(x\\).",
    {a:a,b:b,op:op});
});
E("u1-lcd",1,["3.11"],1,"gen",function(){
  var pr=pick([[2,3],[3,2],[3,4],[4,3],[4,6],[6,4]]),k1=pr[0],k2=pr[1];
  var L=k1*k2/gcd2(k1,k2);
  var p=ri(-6,6),q=ri(-6,6),t=0;
  while(p===q&&t<40){q=ri(-6,6);t++;}
  var A=pick(["x",""+ri(2,5),linS(1,ri(-4,4))]),B=pick([""+ri(2,6),"x"]);
  var D1=k1+linF(p),D2=k2+linF(p)+linF(q),lcd=L+linF(p)+linF(q);
  return mcq("What is the <b>lowest common denominator</b> of \\("+FR(A,D1)+"\\) and \\("+FR(B,D2)+"\\)?",
    MV(lcd),
    [MV(D2),MV(linF(p)+linF(q)),MV((k1*k2)+linF(p)+linF(p)+linF(q))],
    "The second denominator already contains both variable factors, \\("+linF(p)+"\\) and \\("+linF(q)+"\\). For the coefficients, the least common multiple of \\("+k1+"\\) and \\("+k2+"\\) is \\("+L+"\\), so the LCD is <b>\\("+lcd+"\\)</b>. The second denominator alone uses \\("+k2+"\\) instead of \\("+L+"\\), and multiplying the two denominators gives more than the lowest common one.",
    {k1:k1,k2:k2,p:p,q:q});
});
E("u1-mult",1,["3.12"],1,"gen",function(){
  var a=ri(-8,8),b=ri(-8,8),c=ri(-8,8),t=0;
  while((a===b||a===c||b===c)&&t<80){a=ri(-8,8);b=ri(-8,8);c=ri(-8,8);t++;}
  var m=ri(1,5),n=ri(1,5),coef=frN(m,n),coefI=frN(n,m);
  var cj=(coef==="1")?"":coef+" \\cdot ",cji=(coefI==="1")?"":coefI+" \\cdot ";
  var numA=(m===1?"":(""+m))+linF(a),denB=(n===1?"":(""+n))+linF(c);
  return mcq("Determine, in simplified form: \\("+FR(numA,linF(b))+" \\times "+FR(linF(b),denB)+"\\)",
    MV(cj+FR(linF(a),linF(c))),
    [MV(FR(numA+linF(b),linF(b)+denB)),MV(cji+FR(linF(c),linF(a))),MV(cj+FR(linF(a),linF(b)))],
    "Multiply the numerators and denominators, then cancel the shared factor \\("+linF(b)+"\\): the product is <b>\\("+(cj+FR(linF(a),linF(c)))+"\\)</b>. The first distractor skips the cancellation, and the second flips the result.",
    {a:a,b:b,c:c,m:m,n:n});
});
E("u1-div",1,["3.12"],1,"gen",function(){
  var a=ri(-8,8),b=ri(-8,8),c=ri(-8,8),t=0;
  while((a===b||a===c||b===c)&&t<80){a=ri(-8,8);b=ri(-8,8);c=ri(-8,8);t++;}
  return mcq("Determine, in simplified form: \\("+FR(linF(a),linF(b))+" \\div "+FR(linF(a),linF(c))+"\\)",
    MV(FR(linF(c),linF(b))),
    [MV(FR(linF(a)+linF(a),linF(b)+linF(c))),MV(FR(linF(b),linF(c))),MV(FR(linF(a),linF(b)))],
    "Dividing by a fraction means multiplying by its reciprocal: \\("+FR(linF(a),linF(b))+" \\times "+FR(linF(c),linF(a))+"\\). The factor \\("+linF(a)+"\\) cancels, leaving <b>\\("+FR(linF(c),linF(b))+"\\)</b>. Multiplying straight across without flipping is the first distractor.",
    {a:a,b:b,c:c});
});
E("u1-npv-operations",1,["3.9"],1,"gen",function(){
  function sample4(){var s=new Set();while(s.size<4)s.add(ri(-8,8));return [...s];}
  var v=sample4(),s=v[0],p=v[1],q=v[2],r=v[3];
  function lst(vals){return vals.slice().sort(function(x,y){return x-y;}).map(function(x){return "\\(x \\ne "+x+"\\)";}).join(", ");}
  if(Math.random()<0.5){
    var expr=FR(linF(s),linF(p))+" + "+FR(""+ri(2,6),linF(q));
    return mcq("For the expression \\("+expr+"\\), which values are <b>non-permissible</b>?",
      lst([p,q]),
      [lst([p]),lst([q]),lst([p,q,s])],
      "Only the denominators matter for an addition: \\("+linF(p)+"\\) is zero when \\(x = "+p+"\\) and \\("+linF(q)+"\\) is zero when \\(x = "+q+"\\). The numerator factor \\("+linF(s)+"\\) does not restrict anything, so the non-permissible values are <b>"+lst([p,q])+"</b>.",
      {shape:"add",p:p,q:q,s:s});
  }
  var expr2=FR(linF(s),linF(p))+" \\div "+FR(linF(q),linF(r));
  return mcq("For the expression \\("+expr2+"\\), which values are <b>non-permissible</b>?",
    lst([p,q,r]),
    [lst([p,r]),lst([p,q]),lst([p,q,r,s])],
    "Three spots cause trouble: the first denominator \\("+linF(p)+"\\) (zero at \\(x = "+p+"\\)) and the divisor \\("+FR(linF(q),linF(r))+"\\), which is undefined at \\(x = "+r+"\\) and equal to zero at \\(x = "+q+"\\), and a divisor of zero is not allowed. The non-permissible values are <b>"+lst([p,q,r])+"</b>. The root of the first numerator does not restrict anything.",
    {shape:"div",p:p,q:q,r:r,s:s});
});
E("u1-strategy-compare",1,["3.8"],1,"var",varset([
  function(){return mcq("Which statement correctly compares adding rational expressions with adding rational numbers (fractions)?",
    "Both must first be rewritten with a common denominator; the denominators themselves are never added",
    ["In both cases, the numerators and the denominators are added straight across to give the sum in one step","Rational expressions can be added straight across because the denominators contain variables too","The common denominator for rational expressions is always the sum of the two denominators being added"],
    "Adding \\(\\frac{1}{4} + \\frac{1}{6}\\) needs a common denominator of 12, and adding rational expressions works the same way, with the LCD built from the factors of the denominators. Straight-across addition is wrong in both worlds.",{});},
  function(){return mcq("Multiplying rational expressions uses the same strategy as multiplying fractions. Which statement explains why the strategies match?",
    "In both cases the numerators are multiplied, the denominators are multiplied, and common factors may be cancelled before or after multiplying",
    ["In both cases a common denominator must first be found before multiplying, and the two products are then written over that same common denominator","In both cases the numerators are added and the denominators are multiplied, and that combined result is then simplified by cancelling","Fractions cannot be simplified before multiplying, but rational expressions can, and that difference is why the two strategies do not match"],
    "Multiplication never needs a common denominator, for fractions or for rational expressions. Cancelling common factors first, as in \\(\\frac{2}{3} \\times \\frac{9}{4}\\), is the shared strategy.",{});},
  function(){return mcq("Which statement gives a key difference between simplifying a rational number and simplifying a rational expression?",
    "A rational expression can be undefined for some values of its variable, so its non-permissible values must be recorded; a rational number is one fixed value",
    ["A rational expression cannot be written in lowest terms, because its numerator and denominator are polynomials rather than ordinary whole number values","Factors can be cancelled in a rational number but never in a rational expression, because cancelling a factor would change the value of the expression itself","A rational number also has non-permissible values that must be recorded, in the same way, whenever it is written as one number over another single number"],
    "The number \\(\\frac{6}{9}\\) is just \\(\\frac{2}{3}\\). The expression \\(\\frac{6}{x + 9}\\) simplifies nothing and is undefined at \\(x = -9\\); that restriction has no counterpart for a plain number.",{});}
]));

/* --- equations (3.13, 3.14, 3.15, 3.16) --- */

/* --- equations (3.13, 3.14, 3.15, 3.16) --- */

/* --- equations (3.13, 3.14, 3.15, 3.16) --- */
E("u1-npv-equation",1,["3.13"],1,"gen",function(){
  var a=ri(-8,8),b=ri(-8,8),m=ri(2,9),n=ri(2,9),t=0;
  while((a===b||m===a||m===b||n===a||n===b||m===n)&&t<80){a=ri(-8,8);b=ri(-8,8);m=ri(2,9);n=ri(2,9);t++;}
  var pair=function(x,y){var lo=Math.min(x,y),hi=Math.max(x,y);return "\\(x \\ne "+lo+"\\) and \\(x \\ne "+hi+"\\)";};
  return mcq("What are the <b>non-permissible values</b> in the equation \\("+FR(""+m,linF(a))+" = "+FR(""+n,linF(b))+"\\)?",
    pair(a,b),
    ["\\(x \\ne "+a+"\\) only","\\(x \\ne "+b+"\\) only",pair(m,n)],
    "Non-permissible values come from the denominators: \\("+linF(a)+"\\) is zero at \\(x = "+a+"\\) and \\("+linF(b)+"\\) is zero at \\(x = "+b+"\\). The numerators \\("+m+"\\) and \\("+n+"\\) play no part. The non-permissible values are <b>"+pair(a,b)+"</b>.",
    {a:a,b:b,m:m,n:n});
});
E("u1-solve-simple",1,["3.14"],2,"gen",function(){
  var a,b,c,x,t=0;
  if(Math.random()<0.5){
    do{a=ri(2,9);b=ri(2,9);c=ri(2,9);t++;}while((a*c)%b!==0&&t<90);
    x=a*c/b;
    return numq("Solve: \\("+FR(""+a,"x")+" = "+FR(""+b,""+c)+"\\)",
      x,0.001,
      "Cross-multiply and solve: \\[ \\begin{aligned} "+b+"x &= "+(a*c)+" \\\\ x &= \\frac{"+(a*c)+"}{"+b+"} = "+x+" \\end{aligned} \\] The solution is <b>\\(x = "+x+"\\)</b>.",
      {a:a,b:b,c:c,shape:"a/x"});
  }
  do{a=ri(2,9);b=ri(2,9);c=ri(2,9);t++;}while((a*b)%c!==0&&t<90);
  x=a*b/c;
  return numq("Solve: \\("+FR("x",""+a)+" = "+FR(""+b,""+c)+"\\)",
    x,0.001,
    "Cross-multiply and solve: \\[ \\begin{aligned} "+c+"x &= "+(a*b)+" \\\\ x &= \\frac{"+(a*b)+"}{"+c+"} = "+x+" \\end{aligned} \\] The solution is <b>\\(x = "+x+"\\)</b>.",
    {a:a,b:b,c:c,shape:"x/a"});
});
E("u1-solve-cross",1,["3.14"],2,"gen",function(){
  var p=ri(-8,8),a,b,c,x,t=0;
  if(Math.random()<0.5){
    do{a=ri(2,9);b=ri(2,9);c=ri(2,9);t++;}while((a*c)%b!==0&&t<90);
    x=p+a*c/b;
    return numq("Solve: \\("+FR(""+a,linF(p))+" = "+FR(""+b,""+c)+"\\)",
      x,0.001,
      "Cross-multiply and solve: \\[ \\begin{aligned} "+(a*c)+" &= "+b+linF(p)+" \\\\ "+b+"x &= "+(a*c+b*p)+" \\\\ x &= \\frac{"+(a*c+b*p)+"}{"+b+"} = "+x+" \\end{aligned} \\] This is not the non-permissible value \\(x = "+p+"\\), so the solution is <b>\\(x = "+x+"\\)</b>.",
      {p:p,a:a,b:b,c:c,shape:"shift"});
  }
  do{a=ri(2,9);b=ri(2,9);c=ri(2,9);t++;}while((a*b)%c!==0&&t<90);
  x=p+a*b/c;
  return numq("Solve: \\("+FR(linF(p),""+a)+" = "+FR(""+b,""+c)+"\\)",
    x,0.001,
    "Cross-multiply and solve: \\[ \\begin{aligned} "+c+linF(p)+" &= "+(a*b)+" \\\\ "+c+"x &= "+(a*b+c*p)+" \\\\ x &= \\frac{"+(a*b+c*p)+"}{"+c+"} = "+x+" \\end{aligned} \\] The solution is <b>\\(x = "+x+"\\)</b>.",
    {p:p,a:a,b:b,c:c,shape:"numshift"});
});
E("u1-solve-quad-eq",1,["3.14"],2,"gen",function(){
  var s1,s2,d,b,a,t=0;
  do{s1=ri(2,7);s2=-ri(2,7);var prod=Math.abs(s1*s2);var divs=[2,3,4,5,6].filter(function(dd){return prod%dd===0;});t++;}
  while((!divs.length||s1===-s2)&&t<90);
  d=pick(divs);b=prod/d;a=-(s1+s2);
  var pair=function(x,y){return "\\(x = "+x+"\\) and \\(x = "+y+"\\)";};
  return mcq("Solve: \\("+FR(linS(1,a),""+d)+" = "+FR(""+b,"x")+"\\)",
    pair(s2,s1),
    ["\\(x = "+s1+"\\) only",pair(-s1,-s2),pair(s1+s2,s1*s2)],
    "Multiply both sides by \\("+d+"x\\) and expand: \\[ \\begin{aligned} x(x "+(a>=0?"+ ":"- ")+Math.abs(a)+") &= "+(b*d)+" \\\\ x^2 "+(a>=0?"+ ":"- ")+Math.abs(a)+"x - "+(b*d)+" &= 0 \\\\ "+linF(s1)+linF(s2)+" &= 0 \\end{aligned} \\] So \\(x = "+s1+"\\) or \\(x = "+s2+"\\). Neither value is 0, so both are permissible: <b>"+pair(s2,s1)+"</b>.",
    {s1:s1,s2:s2,d:d,b:b,a:a});
});
E("u1-extraneous",1,["3.15"],2,"var",varset([
  function(){return mcq("A student solves \\("+FR("5","x - 2")+" = "+FR("x + 3","x - 2")+"\\) by multiplying both sides by \\((x - 2)\\), gets \\(5 = x + 3\\), and concludes the solution is \\(x = 2\\). Why is \\(x = 2\\) <b>not</b> a solution?",
    "At \\(x = 2\\) both denominators in the original equation are 0, so the equation is undefined there",
    ["The student made an arithmetic error in the step \\(5 = x + 3\\): solved correctly, the equation gives \\(x = 8\\)","\\(x = 2\\) makes the two numerators equal, and equal numerators on two sides are not allowed","A rational equation can never have a positive solution, so a positive result must be rejected at once"],
    "Multiplying both sides by an expression that can be zero can introduce values that were never solutions. Here the only candidate, \\(x = 2\\), makes the original denominators zero, so it is extraneous and the equation has no solution.",{});},
  function(){return mcq("A student solves \\("+FR("2x","x + 5")+" = "+FR("x - 5","x + 5")+"\\) by multiplying both sides by \\((x + 5)\\), gets \\(2x = x - 5\\), and concludes the solution is \\(x = -5\\). Why is \\(x = -5\\) <b>not</b> a solution?",
    "At \\(x = -5\\) both denominators in the original equation are 0, so the equation is undefined there",
    ["The student made an arithmetic error in the step \\(2x = x - 5\\): solved correctly, the equation gives \\(x = 5\\)","\\(x = -5\\) is negative, and a solution involving lengths must always be a positive value in the end","The value makes the numerator of the left side equal to 0, and a numerator of 0 is never allowed"],
    "The candidate value is exactly the non-permissible value of the equation. Any value produced by solving must be checked against the original denominators; this one fails the check, so there is no solution.",{});},
  function(){return mcq("A student solves \\("+FR("x^2","x - 1")+" = "+FR("x","x - 1")+"\\) and reports two solutions, \\(x = 0\\) and \\(x = 1\\). Which statement is correct?",
    "Only \\(x = 0\\) is a solution: at \\(x = 1\\) the denominators are 0, so \\(x = 1\\) is extraneous even though it satisfies the multiplied-out equation \\(x^2 = x\\)",
    ["Both are solutions, because both satisfy the multiplied-out equation \\(x^2 = x\\), and multiplying both sides by \\((x - 1)\\) does not change the solution set","Only \\(x = 1\\) is a solution, because \\(x = 0\\) makes a numerator 0, and a value that makes a numerator 0 must be rejected if it is to count as a solution","Neither is a solution, because an equation with a fraction on each side can never be solved by multiplying out, so values obtained that way never count"],
    "Multiplying by \\((x - 1)\\) gives \\(x^2 = x\\), with roots 0 and 1. Checking in the original equation: \\(x = 0\\) gives \\(0 = 0\\), which works, but \\(x = 1\\) divides by zero. A numerator of 0 is fine; a denominator of 0 is not.",{});}
]));
E("u1-context-work",1,["3.16"],3,"gen",function(){
  var combos=[[3,6],[4,12],[6,12],[5,20],[8,24],[10,15],[9,18],[12,12],[15,30],[20,30],[6,6],[4,4],[7,7],[14,14]];
  var pr=pick(combos),a=pr[0],b=pr[1],t=a*b/(a+b);
  var ctx=pick([
    {w:"paint the community hall in Harbour Grace",p:["Alicia","Devon"]},
    {w:"stack the winter firewood at a cabin in Gros Morne",p:["Marcus","Jill"]},
    {w:"clear the snow from a long driveway in Corner Brook",p:["Erin","Colin"]},
    {w:"gut and pack a day's catch at the plant in Bay de Verde",p:["Shawn","Tessa"]},
    {w:"mow and line the ball field in Gander",p:["Noah","Priya"]}]);
  return numq(ctx.p[0]+" can "+ctx.w+" alone in "+a+" hours, and "+ctx.p[1]+" can do the same job alone in "+b+" hours. How long, in hours, will the job take if they work together?",
    t,0.011,
    "Work rates add. In one hour "+ctx.p[0]+" does \\(\\frac{1}{"+a+"}\\) of the job and "+ctx.p[1]+" does \\(\\frac{1}{"+b+"}\\). Together: \\[ \\begin{aligned} \\frac{1}{"+a+"} + \\frac{1}{"+b+"} &= \\frac{"+(a+b)+"}{"+(a*b)+"} \\\\ \\text{time} &= \\frac{"+(a*b)+"}{"+(a+b)+"} = "+fmt(t)+" \\end{aligned} \\] The combined rate is the job per hour, so the whole job takes "+fmt(t)+" hours. The time together is <b>"+fmt(t)+" hours</b>, less than either time alone, as it should be.",
    {a:a,b:b,t:t});
});
E("u1-context-wind",1,["3.16"],3,"gen",function(){
  var plane=Math.random()<0.5,v,w,t,d1,d2;
  if(plane){v=pick([150,180,200,220,240,260,300]);w=pick([10,20,25,30,40]);t=pick([2,2.5,3]);}
  else{v=pick([12,15,18,20,24,30]);w=pick([2,3,4,5,6]);t=pick([2,3,4]);}
  d1=t*(v-w);d2=t*(v+w);
  var stem=plane?
    "A flight from St. John's to Wabush covers "+d1+" km against the wind in the same time it covers "+d2+" km with the wind on the return flight. The wind speed is "+w+" km/h. What is the speed of the plane in still air, in km/h?":
    "A tour boat out of Bay Bulls travels "+d1+" km against the current in the same time it travels "+d2+" km with the current. The current flows at "+w+" km/h. What is the speed of the boat in still water, in km/h?";
  return numq(stem,
    v,0.001,
    "Let the still-air speed be \\(v\\). Equal times give \\(\\frac{"+d1+"}{v - "+w+"} = \\frac{"+d2+"}{v + "+w+"}\\). Cross-multiplying and collecting the \\(v\\) terms: \\[ \\begin{aligned} "+d1+"(v + "+w+") &= "+d2+"(v - "+w+") \\\\ "+d1+"v + "+(d1*w)+" &= "+d2+"v - "+(d2*w)+" \\\\ "+(d2-d1)+"v &= "+(w*(d1+d2))+" \\\\ v &= "+v+" \\end{aligned} \\] The speed is <b>\\(v = "+v+"\\) km/h</b>.",
    {v:v,w:w,d1:d1,d2:d2});
});
E("u1-context-cost",1,["3.16"],3,"gen",function(){
  var n,k,s1,C,e,t=0;
  do{n=ri(18,48);k=ri(2,9);s1=ri(15,40);C=n*s1;t++;}
  while((C%(n-k)!==0||C/(n-k)-s1<2)&&t<200);
  e=C/(n-k)-s1;var went=n-k;
  var dest=pick(["a class trip to Gros Morne","a ski trip to Marble Mountain","a band trip to St. John's","a geography field trip to the Tablelands"]);
  return numq("The total cost of "+dest+" is $"+C+", shared equally among the students who go. When "+k+" students could not go, each of the remaining students had to pay $"+e+" more. How many students actually went on the trip?",
    went,0.001,
    "Let \\(n\\) be the number who first signed up. The cost condition gives: \\[ \\begin{aligned} \\frac{"+C+"}{n - "+k+"} - \\frac{"+C+"}{n} &= "+e+" \\\\ \\frac{"+(C*k)+"}{n(n - "+k+")} &= "+e+" \\\\ n(n - "+k+") &= "+(C*k/e)+" \\end{aligned} \\] Trying the factor pair: \\("+n+" \\times "+went+" = "+(C*k/e)+"\\), so \\(n = "+n+"\\). The number who actually went is <b>"+went+"</b>.",
    {C:C,n:n,k:k,e:e});
});
E("u1-two-step-simplify",1,["3.12"],3,"gen",function(){
  var s=ri(2,6),t=ri(-6,6),k=ri(2,5),tr=0;
  while((t===0||t===s||t===-s)&&tr<60){t=ri(-6,6);tr++;}
  var numQuad=quadS(1,0,-s*s);
  var prompt="Simplify completely: \\("+FR(k+"("+numQuad+")",linF(s)+linF(t))+" \\div "+FR(linF(-s),linF(t))+"\\)";
  return numq(prompt,
    k,0.001,
    "Factor the difference of squares: \\("+numQuad+" = "+linF(s)+linF(-s)+"\\). Cancelling \\("+linF(s)+"\\) leaves \\(\\frac{"+k+linF(-s)+"}{"+linF(t)+"}\\). Dividing by \\("+FR(linF(-s),linF(t))+"\\) means multiplying by its reciprocal, and both remaining factors cancel, leaving <b>\\("+k+"\\)</b>. (Restrictions: \\(x \\ne "+s+"\\), \\(x \\ne "+t+"\\), \\(x \\ne "+(-s)+"\\).)",
    {s:s,t:t,k:k});
});

/* ----- bank-u2.js ----- */
// Math 3201 Unit 2 Polynomial Functions question bank
// CRMARKS: u2-correct-the-claim-cr=2
// CRMARKS: u2-degree-equation=1
// CRMARKS: u2-end-behaviour=1
// CRMARKS: u2-fit-value=2
// CRMARKS: u2-graph-characteristics=1
// CRMARKS: u2-interpret-model=2
// CRMARKS: u2-match-equation-graph=2
// CRMARKS: u2-model-change-cr=2
// CRMARKS: u2-recover-and-predict-cr=3
// CRMARKS: u2-reverse-intercepts=3
// CRMARKS: u2-turning-points-graph=1
// CRMARKS: u2-y-intercept=1
// CRMARKS: u2-zeros-and-intercept-cr=3
/* ================= Unit 2: Polynomial Functions ================= */
E("u2-degree-equation",2,["3.18"],1,"gen",function(){
  var choice=ri(1,6),f,deg,why;
  if(choice===1){var a=ri(2,6);f="f(x) = "+a+"x - "+ri(3,25)+" + x^2";deg=2;why="written in standard form it is \\(x^2 + "+a+"x - \\dots\\), so the highest power is \\(x^2\\)";}
  else if(choice===2){var r=ri(-6,6);f="f(x) = x^2(x "+(r>=0?"- "+r:"+ "+(-r))+")";if(r===0)f="f(x) = x^2(x)";deg=3;why="expanding gives \\(x^3\\) as the highest power";}
  else if(choice===3){var p=ri(-5,5),q=ri(-5,5);f="f(x) = (x "+(p>=0?"- "+p:"+ "+(-p))+")(x "+(q>=0?"- "+q:"+ "+(-q))+")";deg=2;why="two linear factors multiply to give degree 2";}
  else if(choice===4){var a3=ri(2,5),b3=ri(-8,8),c3=ri(-8,8),d3=ri(-8,8);f="f(x) = "+a3+"x^3 "+(b3>=0?"+ ":"- ")+Math.abs(b3)+"x^2 "+(c3>=0?"+ ":"- ")+Math.abs(c3)+"x "+(d3>=0?"+ ":"- ")+Math.abs(d3);deg=3;why="the highest power of \\(x\\) is \\(x^3\\)";}
  else if(choice===5){var a5=ri(2,7),b5=ri(-9,9);f="f(x) = "+(b5>=0?(a5+"x + "+b5):(a5+"x - "+(-b5)));deg=1;why="the highest power of \\(x\\) is \\(x^1\\)";}
  else{f="f(x) = "+ri(3,20);deg=0;why="a constant function has degree 0";}
  return mcq("What is the <b>degree</b> of the polynomial function \\("+f+"\\)?",
    ""+deg,["0","1","2","3"].filter(function(v){return v!==""+deg;}),
    "The degree is the highest power of \\(x\\) when the function is expanded: here "+why+", so the degree is <b>"+deg+"</b>.",
    {deg:deg,choice:choice});
});
E("u2-y-intercept",2,["3.18"],1,"gen",function(){
  var a=ri(2,6),b=ri(-9,9),c=ri(-12,12),form=ri(1,3),f,yi;
  if(form===1){f=quadS(a,b,c);yi=c;}
  else if(form===2){f="f(x) = "+c+" "+(b>=0?"+ ":"- ")+Math.abs(b)+"x "+(a>=0?"+ ":"- ")+a+"x^2";yi=c;}
  else{f="f(x) = x^3 "+(b>=0?"+ ":"- ")+Math.abs(b)+"x^2 "+(c>=0?"+ ":"- ")+Math.abs(c);yi=c;}
  return numq("What is the <b>y-intercept</b> of \\("+f+"\\)?",
    yi,0.001,
    "The y-intercept is the value at \\(x = 0\\). Every term containing \\(x\\) becomes 0, leaving the constant term: <b>"+yi+"</b>.",
    {yi:yi,form:form});
});
E("u2-turning-points-graph",2,["3.17"],1,"gen",function(){
  var kind=pick(["quad","cubic2","cubic0"]),fn,tp;
  if(kind==="quad"){var s=pick([1,-1]),h=ri(-2,2),k=ri(-3,3);fn=function(x){return s*(x-h)*(x-h)+k;};tp=1;
    var q=mcq("The graph of \\(f(x) = "+quadS(s,-2*s*h,s*h*h+k)+"\\) is shown. How many <b>turning points</b> does the graph have?","1",["0","2","3"],
      "The graph is a parabola with a single vertex, so it changes direction exactly once: <b>1 turning point</b>.",{kind:kind});
    q.figure=plotSVG(fn,-6,6,-8,12);return q;}
  if(kind==="cubic2"){var s2=pick([1,-1]),u=pick([1,1.5]),k2=ri(-3,3);fn=function(x){return s2*(x*x*x-3*u*u*x)+k2;};tp=2;
    var cc=-3*u*u*s2;
    var eq2=(s2<0?"-":"")+"x^3 "+(cc>=0?"+ ":"- ")+fmt(Math.abs(cc))+"x "+(k2>=0?"+ ":"- ")+Math.abs(k2);
    var q2=mcq("The graph of \\(f(x) = "+eq2+"\\) is shown. How many <b>turning points</b> does the graph have?","2",["0","1","3"],
      "The cubic rises (or falls), flattens into a local maximum, turns again at a local minimum, then continues: it changes direction twice, so there are <b>2 turning points</b>.",{kind:kind});
    q2.figure=plotSVG(fn,-4.5,4.5,-20,20);return q2;}
  var s3=pick([1,-1]),k3=ri(-4,4);fn=function(x){return s3*(x*x*x+x)+k3;};
  var eq3=(s3<0?"-":"")+"x^3 "+(s3>0?"+ ":"- ")+"x "+(k3>=0?"+ ":"- ")+Math.abs(k3);
  var q3=mcq("The graph of \\(f(x) = "+eq3+"\\) is shown. How many <b>turning points</b> does the graph have?","0",["1","2","3"],
    "This cubic keeps moving in the same direction the whole way across; it may flatten briefly but never changes direction, so there are <b>0 turning points</b>.",{kind:kind});
  q3.figure=plotSVG(fn,-3.5,3.5,-22,22);return q3;
});
E("u2-end-behaviour",2,["3.18"],1,"gen",function(){
  var deg=pick([1,2,3]),sgn=pick([1,-1]),a=sgn*ri(2,6),b=ri(-8,8),c=ri(-8,8);
  var fs=(deg===1)?linS(a,c):(deg===2?quadS(a,b,c):(""+a+"x^3 "+(b>=0?"+ ":"- ")+Math.abs(b)+"x^2 "+(c>=0?"+ ":"- ")+Math.abs(c)+"x"));
  var pats={"odd+":"Quadrant III to Quadrant I","odd-":"Quadrant II to Quadrant IV","even+":"Quadrant II to Quadrant I","even-":"Quadrant III to Quadrant IV"};
  var key=(deg%2===1?(sgn>0?"odd+":"odd-"):(sgn>0?"even+":"even-"));
  var correct=pats[key];
  var others=Object.keys(pats).filter(function(k){return k!==key;}).map(function(k){return pats[k];});
  return mcq("The graph of \\(f(x) = "+fs+"\\) extends from which quadrant to which quadrant?",
    correct,others,
    "The degree "+deg+" is "+(deg%2===1?"odd":"even")+" and the leading coefficient "+a+" is "+(sgn>0?"positive":"negative")+". "+(deg%2===1?("For an odd degree, the two ends go in opposite directions; a positive leading coefficient sends the right end up, so the graph runs from Quadrant III to Quadrant I."):("For an even degree, both ends go the same way; the sign of the leading coefficient decides whether both ends rise or both fall."))+" Here the graph extends from <b>"+correct+"</b>.",
    {deg:deg,a:a});
});
E("u2-characteristics-equation",2,["3.18"],1,"gen",function(){
  var feat=pick(["yint","end","count"]);
  if(feat==="end"){
    var a=pick([2,3,-2,-3]),r1=ri(-6,6),r2=ri(-6,6),r3=ri(-6,6),t=0;
    while((r1===r2||r1===r3||r2===r3)&&t<60){r1=ri(-6,6);r2=ri(-6,6);r3=ri(-6,6);t++;}
    var f="f(x) = "+(a<0?"-":"")+Math.abs(a)+linF(r1)+linF(r2)+linF(r3);
    var corr=(a>0)?"Quadrant III to Quadrant I":"Quadrant II to Quadrant IV";
    return mcq("Which statement describes the <b>end behaviour</b> of \\("+f+"\\)?",
      "It extends from "+corr,
      ["It extends from "+(a>0?"Quadrant II to Quadrant IV":"Quadrant III to Quadrant I"),"It extends from Quadrant II to Quadrant I","It extends from Quadrant III to Quadrant IV"],
      "The function is a cubic (odd degree) with leading coefficient "+a+". "+(a>0?"A positive leading coefficient means the left end falls and the right end rises: Quadrant III to Quadrant I.":"A negative leading coefficient reverses the cubic: Quadrant II to Quadrant IV.")+" The roots affect where the graph crosses the axis, not the end behaviour.",{feat:feat,a:a});
  }
  if(feat==="count"){
    var shape=pick(["distinct","double","triple"]);
    var a2=pick([1,2,-1,-2]),u=ri(-5,5),v=ri(-5,5),w=ri(-5,5),tt=0;
    while((u===v||u===w||v===w)&&tt<60){u=ri(-5,5);v=ri(-5,5);w=ri(-5,5);tt++;}
    var as=(a2===1?"":(a2===-1?"-":""+a2)),fcnt,fstr;
    if(shape==="distinct"){fcnt=3;fstr="f(x) = "+as+linF(u)+linF(v)+linF(w);}
    else if(shape==="double"){fcnt=2;fstr="f(x) = "+as+linF(u)+"^2"+linF(v);}
    else{fcnt=1;fstr="f(x) = "+as+linF(u)+"^3";}
    return mcq("How many <b>distinct x-intercepts</b> does \\("+fstr+"\\) have?",
      ""+fcnt,["0","1","2","3"].filter(function(x){return x!==""+fcnt;}),
      (shape==="distinct"?"Each of the three different linear factors gives its own x-intercept: \\(x = "+u+"\\), \\(x = "+v+"\\) and \\(x = "+w+"\\).":(shape==="double"?"The squared factor "+linF(u)+"^2 touches the axis at \\(x = "+u+"\\) but it is still only one distinct intercept; together with \\(x = "+v+"\\) there are 2 distinct x-intercepts.":"The cubed factor gives a single distinct x-intercept, \\(x = "+u+"\\), where the graph flattens and crosses."))+" The count is <b>"+fcnt+"</b>.",
      {feat:feat,shape:shape});
  }
  var a3=pick([2,3,-2,-3]),p=ri(-5,5),qq=ri(-5,5),rr=ri(-5,5),t3=0;
  while((p===0||qq===0||rr===0||p===qq||p===rr||qq===rr)&&t3<80){p=ri(-5,5);qq=ri(-5,5);rr=ri(-5,5);t3++;}
  var P=p*qq*rr,Y=-a3*P,S=p+qq+rr,vals=[Y,a3*P,-P,S],guard=0;
  while(new Set(vals).size<4&&guard<80){p=ri(-5,5);qq=ri(-5,5);rr=ri(-5,5);
    if(!(p===0||qq===0||rr===0||p===qq||p===rr||qq===rr)){P=p*qq*rr;Y=-a3*P;S=p+qq+rr;vals=[Y,a3*P,-P,S];}guard++;}
  return mcq("What is the <b>y-intercept</b> of \\(f(x) = "+(a3<0?"-":"")+Math.abs(a3)+linF(p)+linF(qq)+linF(rr)+"\\)?",
    ""+Y,[""+(a3*P),""+(-P),""+S],
    "Set \\(x = 0\\): each factor becomes the negative of its root, so \\(f(0) = "+a3+" \\times ("+(-p)+") \\times ("+(-qq)+") \\times ("+(-rr)+") = "+Y+"\\). Three negative factors give a negative product before the leading coefficient is applied. The y-intercept is <b>"+Y+"</b>.",
    {feat:"yint",Y:Y});
});
E("u2-match-equation-graph",2,["3.19"],2,"gen",function(){
  var r1=ri(-4,4),r2=ri(-4,4),r3=ri(-4,4),t=0;
  while((r1===0||r2===0||r3===0||r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-4,4);r2=ri(-4,4);r3=ri(-4,4);t++;}
  var a=pick([1,-1]);
  var fn=function(x){return a*(x-r1)*(x-r2)*(x-r3);};
  var eq=function(aa,s1,s2,s3){return "f(x) = "+(aa<0?"-":"")+linF(s1)+linF(s2)+linF(s3);};
  var q=mcq("Which equation matches the graphed polynomial function?",
    eq(a,r1,r2,r3),
    [eq(-a,r1,r2,r3),eq(a,-r1,r2,r3),eq(a,r1,-r2,r3)],
    "Read the graph: the x-intercepts are \\(x = "+r1+"\\), \\(x = "+r2+"\\) and \\(x = "+r3+"\\), giving the factors "+linF(r1)+", "+linF(r2)+" and "+linF(r3)+". The ends run "+(a>0?"from Quadrant III to Quadrant I, so the leading coefficient is positive":"from Quadrant II to Quadrant IV, so the leading coefficient is negative")+". Only the correct option matches all three intercepts and the end behaviour.",
    {r1:r1,r2:r2,r3:r3,a:a});
  var ys=[];for(var gx=-5.5;gx<=5.5;gx+=0.25)ys.push(fn(gx));
  var mx=Math.max.apply(null,ys.map(Math.abs));mx=Math.min(Math.max(mx,10),80);
  q.figure=plotSVG(fn,-5.5,5.5,-mx,mx);
  return q;
});
E("u2-match-by-characteristics",2,["3.19"],2,"gen",function(){
  var c=pick([-6,-4,-2,2,3,5]),p=ri(1,5),target=pick(["odd+","odd-","even+","even-"]);
  function build(kind){
    if(kind==="odd+")return "f(x) = x^3 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    if(kind==="odd-")return "f(x) = -x^3 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    if(kind==="even+")return "f(x) = x^2 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
    return "f(x) = -x^2 + "+p+"x "+(c>=0?"+ ":"- ")+Math.abs(c);
  }
  var names={"odd+":"Quadrant III to Quadrant I","odd-":"Quadrant II to Quadrant IV","even+":"Quadrant II to Quadrant I","even-":"Quadrant III to Quadrant IV"};
  var others=["odd+","odd-","even+","even-"].filter(function(k){return k!==target;}).map(build);
  return mcq("Which polynomial function extends from <b>"+names[target]+"</b> and has a <b>constant term of "+c+"</b>?",
    build(target),others,
    "All four options share the constant term "+c+", so the decision comes from the end behaviour: "+names[target]+" needs "+(target.indexOf("odd")===0?"an odd degree":"an even degree")+" with a "+(target==="odd+"||target==="even+"?"positive":"negative")+" leading coefficient. That is <b>"+build(target)+"</b>.",
    {target:target,c:c});
});
E("u2-scatter-type",2,["3.20"],2,"gen",function(){
  var type=pick(["linear","quadratic","cubic"]),pts=[],xs=[];
  if(type==="linear"){var m=pick([2,3]),b0=ri(-2,4);for(var x=0;x<=5;x++){var y=m*x+b0+((x===2||x===4)?pick([-1,1]):0);xs.push(x);pts.push([x,y]);}}
  else if(type==="quadratic"){var h=ri(1,2);for(var x=-2;x<=3;x++){var y=(x-h)*(x-h)-2+((x===0)?1:0);xs.push(x);pts.push([x,y]);}}
  else{for(var x=-2;x<=2;x++){xs.push(x);pts.push([x,x*x*x]);}}
  var ys=pts.map(function(p){return p[1];});
  var y0=Math.min.apply(null,ys)-2,y1=Math.max.apply(null,ys)+2;
  var q=mcq("Data collected in an experiment are shown in the table and the scatter plot. "+tblHTML(xs,ys,"\\(x\\)","\\(y\\)")+" Which type of polynomial function <b>best fits</b> the data?",
    type==="linear"?"Linear":(type==="quadratic"?"Quadratic":"Cubic"),
    ["Linear","Quadratic","Cubic"].filter(function(v){return v!==(type==="linear"?"Linear":(type==="quadratic"?"Quadratic":"Cubic"));}).concat(["Constant"]),
    (type==="linear"?"The points follow a steady upward trend with roughly equal steps, the signature of a linear fit.":(type==="quadratic"?"The points fall and then rise in a single smooth U-turn (a parabola shape), the signature of a quadratic fit.":"The points sweep from low to high with an S-shaped flattening in the middle, the signature of a cubic fit."))+" The best fit is <b>"+(type==="linear"?"linear":(type==="quadratic"?"quadratic":"cubic"))+"</b>.",
    {type:type});
  q.figure=plotSVG(null,Math.min.apply(null,xs)-1,Math.max.apply(null,xs)+1,y0,y1,{nocurve:true,points:pts});
  return q;
});
E("u2-fit-value",2,["3.20"],2,"gen",function(){
  var kind=pick(["quadratic","cubic"]),xs=[0,1,2,3,4],fn,ask=5;
  if(kind==="quadratic"){var a=ri(1,3),b=ri(-3,4),c=ri(1,8);fn=function(x){return a*x*x+b*x+c;};}
  else{var b2=ri(-2,2),c2=ri(0,5),d2=ri(1,7);fn=function(x){return x*x*x+b2*x*x+c2*x+d2;};}
  var ys=xs.map(fn);
  return numq("A data set is modelled by a polynomial function. "+tblHTML(xs,ys,"\\(x\\)","\\(y\\)")+" Following the pattern of the data, what is the value of \\(y\\) when \\(x = "+ask+"\\)?",
    fn(ask),0.001,
    "Look at the differences: "+ys.join(", ")+" has first differences "+(function(){var d=[];for(var i=1;i<ys.length;i++)d.push(ys[i]-ys[i-1]);return d.join(", ");})()+". "+(kind==="quadratic"?"The second differences are constant, confirming a quadratic pattern; extending the differences gives the next value.":"The third differences are constant, confirming a cubic pattern; extending the differences gives the next value.")+" When \\(x = "+ask+"\\), <b>\\(y = "+fn(ask)+"\\)</b>.",
    {kind:kind,ans:fn(ask)});
});
E("u2-graph-characteristics",2,["3.17"],1,"gen",function(){
  var feat=pick(["yint","xint","range"]);
  if(feat==="range"){
    var s=pick([1,-1]),h=ri(-2,2),k=pick([-4,-2,2,3,5]);
    var fn=function(x){return s*(x-h)*(x-h)+k;};
    var corr=(s>0)?("y \\ge "+k):("y \\le "+k);
    var q=mcq("What is the <b>range</b> of the polynomial function shown?",
      "\\(\\{y \\mid "+corr+", \\ y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid y \\ge "+(-k)+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid "+(s>0?("y \\le "+k):("y \\ge "+k))+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y \\in \\mathbb{R}\\}\\)"],
      "The vertex of the parabola is at \\(y = "+k+"\\) and the graph "+(s>0?"opens upward, so every value from "+k+" upward occurs":"opens downward, so every value from "+k+" downward occurs")+". The range is <b>\\(\\{y \\mid "+corr+"\\}\\)</b>.",{feat:feat,k:k});
    q.figure=plotSVG(fn,-6,6,-10,14);return q;
  }
  if(feat==="xint"){
    var r1=ri(-4,4),r2=ri(-4,4),t=0;
    while((r1===r2)&&t<40){r2=ri(-4,4);t++;}
    var a=pick([1,-1]),fn2=function(x){return a*(x-r1)*(x-r2)*(x+2);};
    var roots=[r1,r2,-2];var distinct=new Set(roots).size;
    var q2=mcq("How many <b>x-intercepts</b> does the graphed polynomial function have?",
      ""+distinct,["0","1","2","3"].filter(function(v){return v!==""+distinct;}),
      "Count where the curve crosses the x-axis: it crosses at "+distinct+" distinct point"+(distinct===1?"":"s")+", so there are <b>"+distinct+" x-intercepts</b>.",{feat:feat,distinct:distinct});
    q2.figure=plotSVG(fn2,-6,6,-30,30);return q2;
  }
  var k3=pick([-6,-3,2,4,6]),a3=pick([1,-1]),h3=ri(-2,1),Y3,vals3,g3=0;
  do{k3=pick([-6,-3,2,4,6]);a3=pick([1,-1]);h3=ri(-2,1);Y3=a3*h3*h3+k3;vals3=[Y3,k3,-Y3,a3*(h3+1)*(h3+1)+k3];g3++;}
  while(new Set(vals3).size<4&&g3<60);
  var fn3=function(x){return a3*(x-h3)*(x-h3)+k3;};
  var q3=mcq("What is the <b>y-intercept</b> of the graphed polynomial function?",
    ""+Y3,[""+k3,""+(-Y3),""+(a3*(h3+1)*(h3+1)+k3)],
    "The y-intercept is where the curve crosses the y-axis, at \\(x = 0\\). Reading the graph there gives <b>"+Y3+"</b>. (The vertex value "+k3+" is the distractor: it is read at the turning point, not at the y-axis.)",{feat:feat});
  q3.figure=plotSVG(fn3,-6,6,-10,14);return q3;
});
E("u2-sketch-match",2,["3.17"],1,"gen",function(){
  var s=pick([1,-1]),h=pick([-1,0,0,1]),u=(h===0?pick([1,1.25,1.5]):1),k=pick([-6,-4,-2,0,3,5,7]);
  var fn=function(x){var t=x-h;return s*(t*t*t-3*u*u*t)+k;};
  var Y=fn(0);
  var lc=(s>0)?"positive":"negative";
  var corr="Degree 3, "+lc+" leading coefficient, 2 turning points, y-intercept "+fmt(Y);
  var q=mcq("Which list of characteristics matches the graphed polynomial function?",
    corr,
    ["Degree 3, "+(s>0?"negative":"positive")+" leading coefficient, 2 turning points, y-intercept "+fmt(Y),
     "Degree 2, "+lc+" leading coefficient, 1 turning point, y-intercept "+fmt(Y),
     "Degree 3, "+lc+" leading coefficient, 0 turning points, y-intercept "+fmt(-Y)],
    "The graph has the S-shape and two direction changes of a cubic, its ends run "+(s>0?"from Quadrant III to Quadrant I (positive leading coefficient)":"from Quadrant II to Quadrant IV (negative leading coefficient)")+", and it crosses the y-axis at "+fmt(Y)+". The matching list is: <b>"+corr+"</b>.",{s:s,k:k,h:h});
  q.figure=plotSVG(fn,-4.5,4.5,-20,20);return q;
});
E("u2-interpret-model",2,["3.21"],2,"var",varset([
  function(){return numq("An open-top box is made by cutting squares of side \\(x\\) cm from the corners of a 20 cm by 14 cm sheet and folding up the sides. The volume is modelled by \\(V(x) = x(20 - 2x)(14 - 2x)\\). What is the volume, in cm\\(^3\\), when squares of side 2 cm are cut?",
    320,1,
    "Substitute \\(x = 2\\): \\[ \\begin{aligned} V(2) &= 2(20 - 4)(14 - 4) \\\\ &= 2 \\times 16 \\times 10 \\\\ &= 320 \\end{aligned} \\] The volume is <b>320 cm\\(^3\\)</b>. The three factors are the height and the two reduced inside dimensions.",{});},
  function(){return mcq("A food truck's monthly profit, in dollars, is modelled by \\(P(x) = -2x^3 + 30x^2 - 4500\\), where \\(x\\) is the number of months since opening. What does the value \\(P(0) = -4500\\) represent?",
    "The truck started $4500 in the hole (start-up costs) before any monthly profit was made",
    ["The truck loses $4500 every month because the profit falls by that amount each month","The truck breaks even after 4500 months of operation, when its profit reaches zero","The profit in the first month was $4500, earned during the first month after opening"],
    "At \\(x = 0\\) no time has passed, so the value is the starting position: negative because of the initial costs. It is a one-time starting value, not a monthly rate.",{});},
  function(){return numq("The population of a town, in hundreds of people, \\(t\\) years after 2015 is modelled by \\(P(t) = 0.02t^3 - 0.3t^2 + 2t + 48\\). According to the model, how many <b>people</b> live in the town in 2025?",
    5800,1,
    "2025 is \\(t = 10\\): \\[ \\begin{aligned} P(10) &= 0.02(1000) - 0.3(100) + 2(10) + 48 \\\\ &= 20 - 30 + 20 + 48 \\\\ &= 58 \\end{aligned} \\] That is 58 hundred people, which is <b>5800 people</b>.",{});}
]));
E("u2-reverse-intercepts",2,["3.18"],3,"gen",function(){
  var r1=ri(-5,5),r2=ri(-5,5),r3=ri(-5,5),t=0;
  while((r1===0||r2===0||r3===0||r1===r2||r1===r3||r2===r3)&&t<80){r1=ri(-5,5);r2=ri(-5,5);r3=ri(-5,5);t++;}
  var a=pick([1,2,-1,-2]),Y=a*(-r1)*(-r2)*(-r3);
  var x0=pick([-3,-1,2,3,4]);while(x0===r1||x0===r2||x0===r3)x0=pick([-3,-1,2,3,4]);
  var fv=a*(x0-r1)*(x0-r2)*(x0-r3);
  return numq("A cubic function has x-intercepts "+r1+", "+r2+" and "+r3+", and a y-intercept of "+Y+". What is the value of the function at \\(x = "+x0+"\\)?",
    fv,0.001,
    "The intercepts give \\(f(x) = a"+linF(r1)+linF(r2)+linF(r3)+"\\). Use the y-intercept to solve for \\(a\\): \\[ \\begin{aligned} f(0) &= a("+(-r1)+")("+(-r2)+")("+(-r3)+") \\\\ "+(a*(-r1)*(-r2)*(-r3)/a)+"a &= "+Y+" \\\\ a &= "+a+" \\end{aligned} \\] Then \\(f("+x0+") = "+a+"("+ (x0-r1) +")("+(x0-r2)+")("+(x0-r3)+") = "+fv+"\\). The value is <b>"+fv+"</b>.",
    {r1:r1,r2:r2,r3:r3,a:a,x0:x0});
});
E("u2-model-decision",2,["3.22"],3,"var",varset([
  function(){return mcq("Weekly attendance at a new arena, in hundreds, was recorded over five weeks. "+tblHTML([0,1,2,3,4],[5,8,17,38,77],"Week","Attendance")+" Which statement best describes a polynomial model for the data, and the predicted attendance in week 5?",
    "A cubic model fits; predicted attendance is 140 (hundreds)",
    ["A quadratic model fits; predicted attendance is 80 (hundreds)","A linear model fits; predicted attendance is 95 (hundreds)","A cubic model fits; predicted attendance is 131 (hundreds)"],
    "First differences: 3, 9, 21, 39. Second differences: 6, 12, 18. Third differences: 6, 6, constant, so a cubic fits. Extending the pattern (next third difference 6, next second difference 24, next first difference 63) gives 77 + 63 = 140.",{});},
  function(){return mcq("A food truck records its weekly profit, in dollars, over five weeks. "+tblHTML([0,1,2,3,4],[5,15,21,23,21],"Week","Profit ($)")+" Which statement best describes a polynomial model for the data, and the predicted profit in week 5?",
    "A quadratic model fits; predicted profit is $15",
    ["A linear model fits; predicted profit is $25","A cubic model fits; predicted profit is $11","A quadratic model fits; predicted profit is $19"],
    "First differences: 10, 6, 2, -2. Second differences: -4, -4, -4, constant, so a quadratic fits (the rise-then-fall shape agrees). Extending: next first difference -6, so week 5 profit is 21 - 6 = 15 dollars.",{});},
  function(){return mcq("A rumour spreads through a school. The number of students who have heard it by each day is recorded. "+tblHTML([0,1,2,3,4],[3,5,9,17,33],"Day","Students")+" Which statement best describes modelling this data with a polynomial function?",
    "No low-degree polynomial fits well: the first differences (2, 4, 8, 16) keep doubling, which is exponential behaviour, not polynomial",
    ["A cubic model fits the data exactly, because the third differences settle to a constant value as the count keeps growing each day","A quadratic model fits the data exactly, because the second differences settle to a constant value as the count keeps growing each day","A linear model fits the data exactly, because the first differences settle to a constant value and the count grows evenly each day"],
    "For a polynomial fit, some level of differences must settle to a constant. Here the differences double each step (2, 4, 8, 16), and the second and third differences grow too. That doubling pattern is the signature of exponential growth, so a polynomial is the wrong family.",{});}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 3 CR entries (3 and 2 marks) and two Level 2 CR entries (3 and 2 marks). The unit had a single Level 3 CR entry and an all-2-mark Level 2 pool. ---------- */
function u2lead(a){ return a===1?"x^3":a===-1?"-x^3":a+"x^3"; }
function u2tm(v,p){ if(v===0) return ""; var m=Math.abs(v); var core=p? (m===1? p : m+p) : ""+m; return (v>0?" + ":" - ")+core; }
function u2polyLead(lead,b,c,d){ return lead+u2tm(b,"x^2")+u2tm(c,"x")+u2tm(d,""); }
E("u2-recover-and-predict-cr",2,["3.20","3.22"],3,"gen",function(){
  var a=pick([2,3,-2,-3]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6), x0=pick([2,3]);
  var t=pick([1,4,-1,5]); if(t===x0) t=t+2;
  function P(x){ return a*x*x*x + b*x*x + c*x + d; }
  var v0=P(x0), rest=b*x0*x0 + c*x0 + d, cube=x0*x0*x0, ans=P(t);
  return numq("A cubic model is given by \\(f(x) = "+u2polyLead("ax^3",b,c,d)+"\\), where \\(a\\) is a constant. The model satisfies \\(f("+x0+") = "+v0+"\\). Determine \\(f("+t+")\\).",
    ans,0.001,
    "Substitute \\(x = "+x0+"\\): \\("+cube+"a + ("+rest+") = "+v0+"\\), so \\("+cube+"a = "+(v0-rest)+" = "+(a*cube)+"\\), giving \\(a = "+a+"\\). The model is \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\). Evaluating at \\(x = "+t+"\\): \\(f("+t+") = "+a+"("+t+")^3"+u2tm(b,"("+t+")^2")+u2tm(c,"("+t+")")+u2tm(d,"")+" = <b>"+ans+"</b>\\).",
    {a:a,x0:x0,t:t});
});
E("u2-correct-the-claim-cr",2,["3.17"],3,"var",varset([
  function(){
    var a=pick([-1,-2]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6);
    return mcq("A student looks at the cubic \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\) and claims that as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\) as well. Which statement correctly describes the end behaviour of \\(f\\)?",
      "As \\(x \\to -\\infty\\), \\(f(x) \\to \\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to -\\infty\\)",
      ["As \\(x \\to -\\infty\\), \\(f(x) \\to -\\infty\\), and as \\(x \\to \\infty\\), \\(f(x) \\to \\infty\\)",
       "Both ends of the graph rise without bound",
       "Both ends of the graph fall without bound"],
      "The degree is odd and the leading coefficient is negative, so the two ends go in opposite directions: the left end rises and the right end falls. The student described the end behaviour of a cubic with a positive leading coefficient.",
      {sc:"end-behaviour"});
  },
  function(){
    var r=pick([1,2,3]), s=pick([-3,-2,-1,4]);
    var fs=linF(r)+"^2"+linF(s);
    return mcq("A student looks at the cubic \\(f(x) = "+fs+"\\) and claims that the graph crosses the x-axis at \\(x = "+r+"\\). Which statement is correct?",
      "The graph touches the x-axis at \\(x = "+r+"\\) and turns around, because that zero has multiplicity 2",
      ["The graph crosses the x-axis at \\(x = "+r+"\\), as the student says",
       "The graph touches the x-axis at \\(x = "+s+"\\) and turns around",
       "The graph crosses the x-axis at \\(x = "+r+"\\) and flattens there"],
      "The factor "+linF(r)+" appears squared, so the zero at \\(x = "+r+"\\) has multiplicity 2, an even multiplicity: the graph touches the axis there and turns around rather than crossing. The zero at \\(x = "+s+"\\) has multiplicity 1, so the graph crosses there.",
      {sc:"multiplicity"});
  },
  function(){
    var a=pick([1,2,-1,-2]), b=ri(-4,4), c=ri(-5,5), d=ri(-6,6);
    return mcq("A student looks at the cubic \\(f(x) = "+u2polyLead(u2lead(a),b,c,d)+"\\) and claims that its graph has three turning points. Which statement is correct?",
      "A cubic function has at most two turning points",
      ["A cubic function always has exactly two turning points",
       "A cubic function has exactly three turning points, as the student says",
       "A cubic function can have any number of turning points"],
      "The derivative of a cubic is a quadratic, which has at most two zeros, so a cubic graph has at most two turning points. (Some cubics, such as \\(y = x^3\\), have none, so exactly two is not guaranteed either.)",
      {sc:"turning-points"});
  }
]));
E("u2-zeros-and-intercept-cr",2,["3.18"],2,"gen",function(){
  var roots=shuffle([-5,-4,-3,-2,-1,1,2,3,4,5]).slice(0,3).sort(function(x,y){return x-y;});
  var a=pick([1,2]);
  var Y=-a*roots[0]*roots[1]*roots[2];
  var neg=roots.map(function(r){return -r;}).sort(function(x,y){return x-y;});
  function opt(rs,y){ return "Zeros: "+rs.join(", ")+"; y-intercept: "+y; }
  var fs=(a===1?"":a)+roots.map(function(r){return linF(r);}).join("");
  return mcq("What are the zeros and the y-intercept of \\(f(x) = "+fs+"\\)?",
    opt(roots,Y),
    [opt(neg,Y), opt(roots,-Y), opt(neg,-Y)],
    "Each factor is zero at one of the zeros, so the zeros are "+roots.join(", ")+". The y-intercept is \\(f(0) = "+(a===1?"":a+" \\times ")+"("+(-roots[0])+")("+(-roots[1])+")("+(-roots[2])+") = "+Y+"\\). Watch the signs: the constant in each factor is the opposite of the zero.",
    {roots:roots,a:a});
});
E("u2-model-change-cr",2,["3.21"],2,"gen",function(){
  var CTX=[
    {name:"The value, in dollars, of a collectible card", unit:"years after it was purchased", v:"V"},
    {name:"The volume, in litres, of water in a tank", unit:"minutes after it starts filling", v:"V"},
    {name:"The height, in centimetres, of a sunflower", unit:"weeks after it was planted", v:"H"}
  ];
  var cx=pick(CTX), a=pick([1,2]), b=ri(0,3), c=ri(2,9), d=ri(30,300);
  function P(x){ return a*x*x*x + b*x*x + c*x + d; }
  var t1=ri(1,3), t2=t1+ri(2,3), ans=P(t2)-P(t1);
  return numq(cx.name+" is modelled by \\("+cx.v+"(t) = "+u2polyLead(u2lead(a),b,c,d)+"\\), where \\(t\\) is the number of "+cx.unit+". Determine the change in the quantity from \\(t = "+t1+"\\) to \\(t = "+t2+"\\).",
    ans,0.001,
    "Evaluate the model at both times: \\("+cx.v+"("+t2+") = "+P(t2)+"\\) and \\("+cx.v+"("+t1+") = "+P(t1)+"\\). The change is \\("+P(t2)+" - "+P(t1)+" = <b>"+ans+"</b>\\).",
    {a:a,t1:t1,t2:t2});
});

/* ----- bank-u3.js ----- */
// Math 3201 Unit 3 Sinusoidal Functions question bank
// CRMARKS: u3-build-equation=2
// CRMARKS: u3-characteristics-combo-cr=2
// CRMARKS: u3-data-equation=2
// CRMARKS: u3-data-fit-params=1
// CRMARKS: u3-decimal-convert=1
// CRMARKS: u3-deg-to-rad=1
// CRMARKS: u3-eq-amplitude-period=1
// CRMARKS: u3-eq-phase-shift=1
// CRMARKS: u3-eq-range-midline=1
// CRMARKS: u3-evaluate-equation-cr=3
// CRMARKS: u3-ferris-interpret=1
// CRMARKS: u3-first-max-time-cr=2
// CRMARKS: u3-graph-amplitude=1
// CRMARKS: u3-graph-full-equation=4
// CRMARKS: u3-graph-period-midline=1
// CRMARKS: u3-graph-range=1
// CRMARKS: u3-match-eq-graph=2
// CRMARKS: u3-rad-to-deg=1
// CRMARKS: u3-temp-model=3
// CRMARKS: u3-tide-predict=3
/* ================= Unit 3: Sinusoidal Functions ================= */
function radFrac(deg){var g=gcd2(deg,180);return [deg/g,180/g];}
function radStr(n,d){if(n===0)return "0";if(d===1)return n===1?"\\pi":(n+"\\pi");if(n===1)return "\\frac{\\pi}{"+d+"}";return "\\frac{"+n+"\\pi}{"+d+"}";}
function sinS(a,trig,b,c,d){
  var s=(a===1?"":(a===-1?"-":(a<0?"- "+Math.abs(a):""+a)))+" \\"+trig+" ";
  if(b!==1)s+=fmt(b);
  s+=" (x"+(c===0?"":(c>0?" - "+c+"^\\circ":" + "+(-c)+"^\\circ"))+")";
  if(d!==0)s+=(d>0?" + ":" - ")+Math.abs(d);
  return "y = "+s;
}
function sinFn(a,trig,b,c,d){return function(x){var ang=b*(x-c)*Math.PI/180;return a*(trig==="sin"?Math.sin(ang):Math.cos(ang))+d;};}

/* ================= Unit 3: Sinusoidal Functions ================= */
function radFrac(deg){var g=gcd2(deg,180);return [deg/g,180/g];}
function radStr(n,d){if(n===0)return "0";if(d===1)return n===1?"\\pi":(n+"\\pi");if(n===1)return "\\frac{\\pi}{"+d+"}";return "\\frac{"+n+"\\pi}{"+d+"}";}
function sinS(a,trig,b,c,d){
  var s=(a===1?"":(a===-1?"-":(a<0?"- "+Math.abs(a):""+a)))+" \\"+trig+" ";
  if(b!==1)s+=fmt(b);
  s+=" (x"+(c===0?"":(c>0?" - "+c+"^\\circ":" + "+(-c)+"^\\circ"))+")";
  if(d!==0)s+=(d>0?" + ":" - ")+Math.abs(d);
  return "y = "+s;
}
function sinFn(a,trig,b,c,d){return function(x){var ang=b*(x-c)*Math.PI/180;return a*(trig==="sin"?Math.sin(ang):Math.cos(ang))+d;};}
E("u3-deg-to-rad",3,["7.1"],1,"gen",function(){
  var pool=[];for(var v=15;v<=345;v+=5){if(v!==180)pool.push(v);}
  var d,opts,tries=0;
  do{d=pick(pool);var f=radFrac(d);
    var d45=(d+45<=360)?d+45:d-45;
    var cands=[radStr(f[0],f[1]),radStr.apply(null,radFrac(360-d)),radStr.apply(null,radFrac(d45)),radStr.apply(null,radFrac(2*d))];
    opts=cands;tries++;}
  while(new Set(cands).size<4&&tries<40);
  return mcq("Express \\("+d+"^\\circ\\) in radians.",
    "\\("+radStr(f[0],f[1])+"\\)",["\\("+cands[1]+"\\)","\\("+cands[2]+"\\)","\\("+cands[3]+"\\)"],
    "Multiply by \\(\\frac{\\pi}{180^\\circ}\\): \\("+d+"^\\circ \\times \\frac{\\pi}{180^\\circ} = "+radStr(f[0],f[1])+"\\) (the fraction \\(\\frac{"+d+"}{180}\\) reduces by "+gcd2(d,180)+").",
    {d:d});
});
E("u3-rad-to-deg",3,["7.1"],1,"gen",function(){
  var pool5=[];for(var v=15;v<=345;v+=5){if(v!==180)pool5.push(v);}
  var d=pick(pool5),f=radFrac(d),pool,tries=0;
  do{pool=[d/2,(d+90)%360||360,(3*d/2)%360||(3*d/2),360-d,2*d].filter(function(v){return v!==d&&v>0;});
    pool=pool.filter(function(v,i){return pool.indexOf(v)===i;});tries++;}
  while(pool.length<3&&tries<20);
  return mcq("Express \\("+radStr(f[0],f[1])+"\\) radians in degrees.",
    ""+d,[""+pool[0],""+pool[1],""+pool[2]],
    "Multiply by \\(\\frac{180^\\circ}{\\pi}\\): \\("+radStr(f[0],f[1])+" \\times \\frac{180^\\circ}{\\pi} = "+d+"^\\circ\\).",
    {d:d});
});
E("u3-decimal-convert",3,["7.1"],1,"gen",function(){
  if(Math.random()<0.5){
    var r=pick([0.2,0.3,0.5,0.7,0.8,0.9,1.1,1.2,1.4,1.6,1.9,2.2,2.4,2.7,2.9,3.3,3.6,3.9,4.2,4.5,4.8,5.1,5.5,5.9,6.1]);
    var deg=r*180/Math.PI;
    return numq("Convert "+r+" radians to degrees, to the nearest degree.",
      Math.round(deg),1.5,
      "Multiply by \\(\\frac{180^\\circ}{\\pi}\\): \\("+r+" \\times \\frac{180^\\circ}{\\pi} \\approx "+fmt(deg,1)+"^\\circ\\), which rounds to <b>"+Math.round(deg)+"°</b>. A proportion works the same way: \\(\\frac{180^\\circ}{\\pi} = \\frac{x}{"+r+"}\\).",
      {r:r});
  }
  var dg=pick([55,65,70,80,85,95,100,105,115,125,140,155,160,170,185,195,200,205,215,230,245,250,260,275,290,305,320,325,335,350]);
  var rad=dg*Math.PI/180;
  return numq("Convert \\("+dg+"^\\circ\\) to radians, to two decimal places.",
    Math.round(rad*100)/100,0.02,
    "Multiply by \\(\\frac{\\pi}{180^\\circ}\\): \\("+dg+" \\times \\frac{\\pi}{180} \\approx "+fmt(rad,3)+"\\), which rounds to <b>"+fmt(Math.round(rad*100)/100,2)+"</b> radians.",
    {dg:dg});
});
E("u3-graph-amplitude",3,["7.2"],1,"gen",function(){
  var a=pick([2,3,4,5]),d=pick([-3,-2,-1,1,2,3,4]),trig=pick(["sin","cos"]),b=pick([1,2]);
  while(d===a||d===2*a)d=pick([-3,-2,-1,1,2,3,4]);
  var fn=sinFn(a,trig,b,0,d);
  var corr=""+a;
  var q=mcq("What is the <b>amplitude</b> of the sinusoidal function shown?",
    corr,[""+(a+d),""+d,""+(2*a)],
    "The graph peaks at \\(y = "+(a+d)+"\\) and bottoms out at \\(y = "+(d-a)+"\\), so the midline is \\(y = "+d+"\\). The amplitude is the distance from the midline to a peak: \\("+ (a+d) +" - "+d+" = "+a+"\\). It is not the maximum value "+(a+d)+", which is the trap here.",
    {a:a,d:d,trig:trig});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-graph-period-midline",3,["7.2"],1,"gen",function(){
  var feat=pick(["period","midline"]);
  var b=pick([1,2]),a=pick([2,3,4]),d=pick([-3,-2,-1,0,1,2,3]),trig=pick(["sin","cos"]);
  while(new Set([d,a,d+a,(-d===0?1:-d)]).size<4){a=pick([2,3,4]);d=pick([-3,-2,-1,0,1,2,3]);}
  var fn=sinFn(a,trig,b,0,d),per=360/b;
  if(feat==="period"){
    var pd=(b===1)?["180","720","90"]:[""+b,""+(360*b),""+(per/2)];
    var q=mcq("What is the <b>period</b> of the sinusoidal function shown, in degrees?",
      ""+per,pd,
      "One complete cycle of the graph spans "+per+"° before the pattern repeats (measure peak to peak or start to start of a cycle). The period is <b>"+per+"°</b>. The coefficient \\(b = "+b+"\\) is not itself the period; the period is \\(\\frac{360^\\circ}{b}\\).",
      {feat:feat,b:b});
    q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
    return q;
  }
  var q2=mcq("What is the <b>equation of the midline</b> (sinusoidal axis) of the function shown?",
    "y = "+d,["y = "+a,"y = "+(d+a),"y = "+(-d===0?1:-d)],
    "The graph oscillates evenly between \\(y = "+(d+a)+"\\) and \\(y = "+(d-a)+"\\); the midline sits halfway between them: \\(\\frac{"+(d+a)+" + ("+(d-a)+")}{2} = "+d+"\\). The midline is <b>\\(y = "+d+"\\)</b>.",
    {feat:feat,d:d});
  q2.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q2;
});
E("u3-graph-range",3,["7.2"],1,"gen",function(){
  var a=pick([2,3,4,5]),d=pick([-4,-3,-1,2,3,5]),trig=pick(["sin","cos"]),bb=pick([1,2]);
  var fn=sinFn(a,trig,bb,0,d),lo=d-a,hi=d+a;
  var corr="\\(\\{y \\mid "+lo+" \\le y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)";
  var q=mcq("What is the <b>range</b> of the sinusoidal function shown?",
    corr,
    ["\\(\\{y \\mid "+(-a)+" \\le y \\le "+a+", \\ y \\in \\mathbb{R}\\}\\)",
     "\\(\\{y \\mid "+d+" \\le y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)",
     "\\(\\{y \\mid y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)"],
    "The lowest point of the graph is \\(y = "+lo+"\\) and the highest is \\(y = "+hi+"\\), and the smooth wave takes every value in between. The range is <b>"+corr+"</b>. Forgetting the vertical shift gives the \\([-"+a+", "+a+"]\\) distractor.",
    {a:a,d:d});
  q.figure=plotSVG(fn,0,720,lo-2,hi+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-periodic-or-sinusoidal",3,["7.3"],1,"gen",function(){
  var fam=pick(["sinusoidal","triangle","square","parabola"]),fn,x1=pick([9,10,12]);
  if(fam==="sinusoidal"){var A1=pick([1.5,2,2.5]),W1=pick([1.2,1.6,2.1]),D1=pick([-0.5,0,0.8]);fn=function(x){return A1*Math.sin(W1*x)+D1;};}
  else if(fam==="triangle"){var P1=pick([3,4,5]),A2=pick([1,1.5]);fn=function(x){var t=((x%P1)+P1)%P1,u=t/P1*4;return A2*(u<1?u:(u<3?2-u:u-4));};}
  else if(fam==="square"){var A3=pick([1,1.4]),W3=pick([Math.PI/2,Math.PI/3]);fn=function(x){return Math.sin(W3*x)>=0?A3:-A3;};}
  else{var VX=pick([4,5,6]),CF=pick([0.1,0.15]);fn=function(x){return CF*(x-VX)*(x-VX)-1.5;};}
  var corr=fam==="sinusoidal"?"Periodic and sinusoidal":(fam==="parabola"?"Not periodic":"Periodic, but not sinusoidal");
  var q=mcq("Which statement best describes the function shown in the graph?",
    corr,
    ["Periodic and sinusoidal","Periodic, but not sinusoidal","Not periodic","Sinusoidal, but not periodic"].filter(function(v){return v!==corr;}),
    (fam==="sinusoidal"?"The pattern repeats every cycle and each cycle is a smooth wave, so the function is periodic and sinusoidal.":
     fam==="parabola"?"The graph never repeats a cycle; it is a single U-shape, so it is not periodic (and therefore not sinusoidal either).":
     "The pattern does repeat, so the function is periodic, but the cycles are "+(fam==="triangle"?"straight-line zigzags":"flat steps")+", not the smooth wave shape of a sine or cosine curve. Every sinusoidal function is periodic, but not every periodic function is sinusoidal.")+" The answer is: <b>"+corr.toLowerCase()+"</b>.",
    {fam:fam});
  q.figure=plotSVG(fn,0,x1,-3,4,{gx:1,gy:1});
  return q;
});
E("u3-ferris-interpret",3,["7.3"],1,"var",varset([
  function(){var fn=function(t){return 9-7*Math.cos(30*t*Math.PI/180);};
    var q=mcq("The graph shows the height of a rider on a Ferris wheel at a St. John's fair, in metres, over time in minutes. Riders board at the lowest point of the ride. What is the <b>boarding height</b>?",
      "2 m",["9 m","16 m","7 m"],
      "Boarding happens at the lowest point of the graph. The curve bottoms out at 2 m (it peaks at 16 m, and the midline y = 9 m is the axle height). The boarding height is <b>2 m</b>.",{});
    q.figure=plotSVG(fn,0,24,0,18,{gx:2,gy:2,labelX:true,labelY:true});return q;},
  function(){var fn=function(t){return 11-9*Math.cos(22.5*t*Math.PI/180);};
    var q=mcq("The graph shows a rider's height on a Ferris wheel over one full rotation. The period of the graph is 16 minutes. What does the <b>period</b> represent in this situation?",
      "The time the wheel takes to complete one full rotation",
      ["The time it takes to first reach the very top of the wheel","The height of the centre (axle) of the wheel above the ground","The diameter of the wheel, measured from side to side"],
      "The period is the length of one complete cycle of the repeating pattern. Here one cycle is one full trip around the wheel, so the period is the time for one complete rotation, 16 minutes.",{});
    q.figure=plotSVG(fn,0,16,0,22,{gx:2,gy:2,labelX:true,labelY:true});return q;},
  function(){var fn=function(t){return 10-8*Math.cos(36*t*Math.PI/180);};
    var q=mcq("The graph shows a rider's height on a Ferris wheel, in metres, over time. The midline of the graph is \\(y = 10\\). What does the <b>midline</b> represent in this situation?",
      "The height of the wheel's centre (axle) above the ground",
      ["The greatest height a rider reaches at the top of the wheel","The diameter of the wheel, measured from side to side","The height above the ground where riders board the wheel"],
      "The height oscillates evenly between 2 m and 18 m around the midline y = 10. Halfway between the top and bottom of the ride is the centre of the wheel, so the midline gives the axle height, 10 m.",{});
    q.figure=plotSVG(fn,0,10,0,20,{gx:1,gy:2,labelX:true,labelY:true});return q;}
]));
E("u3-eq-amplitude-period",3,["7.4"],1,"gen",function(){
  var feat=pick(["amplitude","period"]);
  var a=pick([2,3,4,5])*pick([1,-1]),b=pick([0.5,1,2,3]),c=pick([0,20,40]),d=pick([-3,-1,0,2]),trig=pick(["sin","cos"]),tries=0;
  while((Math.abs(a)===b||d===Math.abs(a)||b===d)&&tries<40){a=pick([2,3,4,5])*pick([1,-1]);b=pick([0.5,1,2,3]);d=pick([-3,-1,0,2]);tries++;}
  var eq=sinS(a,trig,b,c,d);
  function normOpts(key,ds){
    function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
    function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
    var all=[key].concat(ds),guard=0;
    while(guard++<12){
      var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
      var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
      var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
      if(!sing.length)break;
      var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
      for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
      if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
      if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
      else{all[cand]=pad(all[cand],s);}
    }
    return [all[0],all.slice(1)];
  }
  if(feat==="amplitude"){
    var _na=normOpts(""+Math.abs(a),[""+b,""+d,""+(2*Math.abs(a))]);
    return mcq("What is the <b>amplitude</b> of \\("+eq+"\\)?",
      _na[0],_na[1],
      "The amplitude is \\(|a|\\), the size of the coefficient in front of the "+trig+" term: \\(|"+a+"| = "+Math.abs(a)+"\\). The sign of \\(a\\) only flips the graph; it does not change the amplitude.",
      {feat:feat,a:a,b:b});
  }
  var per=360/b;
  var _np=normOpts(""+per,[""+b,""+(360*b===per?180:360*b),""+(per===360?90:360)]);
  return mcq("What is the <b>period</b>, in degrees, of \\("+eq+"\\)?",
    _np[0],_np[1],
    "The period is \\(\\frac{360^\\circ}{b} = \\frac{360^\\circ}{"+b+"} = "+per+"^\\circ\\). The coefficient \\(b = "+b+"\\) compresses or stretches the basic cycle; it is not the period itself.",
    {feat:feat,b:b,per:per});
});
E("u3-eq-range-midline",3,["7.4"],1,"gen",function(){
  var feat=pick(["range","midline"]);
  var a=pick([2,3,4,5])*pick([1,-1]),d=pick([-4,-2,-1,1,3]),trig=pick(["sin","cos"]),tg=0;
  while((new Set([d,a,-d,d+Math.abs(a)]).size<4||d===0)&&tg<60){a=pick([2,3,4,5])*pick([1,-1]);d=pick([-4,-2,-1,1,3]);tg++;}
  var eq=sinS(a,trig,pick([1,2]),pick([0,30]),d),lo=d-Math.abs(a),hi=d+Math.abs(a);
  if(feat==="midline"){
    return mcq("What is the <b>equation of the midline</b> of \\("+eq+"\\)?",
      "y = "+d,["y = "+a,"y = "+(-d),"y = "+(d+Math.abs(a))],
      "The midline is set by the vertical shift \\(d\\): the graph oscillates evenly around \\(y = d = "+d+"\\). The value \\("+hi+"\\) is the maximum, not the midline.",
      {feat:feat,d:d});
  }
  return mcq("What is the <b>range</b> of \\("+eq+"\\)?",
    "\\(\\{y \\mid "+lo+" \\le y \\le "+hi+"\\}\\)",
    ["\\(\\{y \\mid "+(-Math.abs(a))+" \\le y \\le "+Math.abs(a)+"\\}\\)","\\(\\{y \\mid "+d+" \\le y \\le "+hi+"\\}\\)","\\(\\{y \\mid "+lo+" \\le y \\le "+d+"\\}\\)"],
    "The amplitude is \\(|a| = "+Math.abs(a)+"\\), so the graph runs from \\(d - |a| = "+lo+"\\) up to \\(d + |a| = "+hi+"\\) around the midline \\(y = "+d+"\\). The interval that stops at the midline, and the one that forgets the vertical shift, are the traps.",
    {feat:feat,a:a,d:d});
});
E("u3-eq-phase-shift",3,["7.4"],1,"var",varset([
  function(){
  var c=pick([15,30,45,60,90])*pick([1,-1]),a=pick([1,2,3]),d=pick([-2,0,1]),trig=pick(["sin","cos"]);
  var eq=sinS(a,trig,pick([1,2]),c,d);
  var corr=(c>0)?("Shifted right "+c+"°"):("Shifted left "+(-c)+"°");
  return mcq("Compared with the graph of \\(y = "+(a===1?"":a)+" \\"+trig+" x"+(d!==0?((d>0?" + ":" - ")+Math.abs(d)):"")+"\\), how is the graph of \\("+eq+"\\) shifted horizontally?",
    corr,
    [(c>0?("Shifted left "+c+"°"):("Shifted right "+(-c)+"°")),"Shifted up "+Math.abs(c)+"°","There is no horizontal shift"],
    "In the form \\(y = a \\"+trig+" b(x - c) + d\\), the value inside the brackets with \\(x\\) gives the horizontal shift: here \\(c = "+c+"\\), so the graph moves "+(c>0?"right by "+c+"°":"left by "+(-c)+"°")+". The trap is reading the sign backwards: \\((x - "+Math.abs(c)+"^\\circ)\\) shifts right, not left.",
    {c:c});
},
  function(){
    var c=pick([15,30,45,60,90])*pick([1,-1]),a=pick([1,2,3]),d=pick([-2,0,1]),trig=pick(["sin","cos"]);
    var b=pick([1,2]);
    var eq=sinS(a,trig,b,c,d);
    var corr=(c>0)?("Shifted right "+c+"°"):("Shifted left "+(-c)+"°");
    var q=mcq("Compared with the graph of \\(y = "+(a===1?"":a)+" \\"+trig+" x"+(d!==0?((d>0?" + ":" - ")+Math.abs(d)):"")+"\\), how is the graph of \\("+eq+"\\) (graphed below) shifted horizontally?",
      corr,
      [(c>0?("Shifted left "+c+"°"):("Shifted right "+(-c)+"°")),"Shifted up "+Math.abs(c)+"°","There is no horizontal shift"],
      "In the form \\(y = a \\"+trig+" b(x - c) + d\\), the value inside the brackets with \\(x\\) gives the horizontal shift: here \\(c = "+c+"\\), so the graph moves "+(c>0?"right by "+c+"°":"left by "+(-c)+"°")+". The trap is reading the sign backwards: \\((x - "+Math.abs(c)+"^\\circ)\\) shifts right, not left.",
      {c:c});
    var x0=(c<0?-180:0);
    q.figure=fnPlotSVG(sinFn(a,trig,b,c,d),x0,x0+720,d-a-1,d+a+1,{gx:15,gy:1,labelX:true,labelY:true,labelEvery:6,points:[[c,trig==="sin"?d:a+d]]});
    return q;
  }
]));
E("u3-match-eq-graph",3,["7.5"],2,"gen",function(){
  var a=pick([2,3,4]),b=pick([1,2,3]),d=pick([-3,-2,-1,1,2,3]),trig=pick(["sin","cos"]);
  var fn=sinFn(a,trig,b,0,d);
  var alt=(trig==="sin")?"cos":"sin";
  var q=mcq("Which equation matches the graphed sinusoidal function?",
    "\\("+sinS(a,trig,b,0,d)+"\\)",
    ["\\("+sinS(a,alt,b,0,d)+"\\)","\\("+sinS(a,trig,2*b,0,d)+"\\)","\\("+sinS(a,trig,b,0,-d)+"\\)"],
    "Read the graph: the maximum is "+(a+d)+" and the minimum is "+(d-a)+", giving amplitude "+a+" and midline \\(y = "+d+"\\). A full cycle takes "+(360/b)+"°, so \\(b = "+b+"\\). The curve "+(trig==="sin"?"starts on the midline and rises, the sine pattern":"starts at its maximum, the cosine pattern")+", which pins down the correct equation.",
    {a:a,b:b,d:d,trig:trig});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-build-equation",3,["7.5"],2,"gen",function(){
  var M=pick([6,8,9,10,12]),m=pick([-4,-2,-1,1,2]),P=pick([120,180,360,720]);
  while(((M+m)%2!==0)||m===0||(M-m)/2<1){M=pick([6,8,9,10,12]);m=pick([-4,-2,-1,1,2]);}
  var a=(M-m)/2,d=(M+m)/2,b=360/P;
  var q=mcq("A sinusoidal function has maximum value "+M+", minimum value "+m+", and period "+P+"°. It starts at its midline and rises first. Which equation models it?",
    "\\("+sinS(a,"sin",b,0,d)+"\\)",
    ["\\("+sinS(-a,"sin",b,0,d)+"\\)","\\("+sinS(a,"sin",360/(2*P),0,d)+"\\)","\\("+sinS(a,"sin",b,0,a)+"\\)"],
    "Amplitude: \\(\\frac{"+M+" - ("+m+")}{2} = "+a+"\\). Midline: \\(\\frac{"+M+" + ("+m+")}{2} = "+d+"\\). Period "+P+"° gives \\(b = \\frac{360}{"+P+"} = "+fmt(b)+"\\). Starting at the midline and rising is the sine pattern with a positive amplitude, so the model is \\("+sinS(a,"sin",b,0,d)+"\\).",
    {M:M,m:m,P:P});
  return q;
});
E("u3-graph-full-equation",3,["7.2","7.5"],3,"gen",function(){
  var a=pick([2,3,4]),c=pick([30,45,60,90,120]),d=pick([-3,-2,-1,1,2,3]);
  var fn=sinFn(a,"sin",1,c,d);
  var q=mcq("Which equation, in degrees, matches the graphed sinusoidal function?",
    "\\("+sinS(a,"sin",1,c,d)+"\\)",
    ["\\("+sinS(a,"sin",1,-c,d)+"\\)","\\("+sinS(a,"cos",1,c,d)+"\\)","\\("+sinS(a,"sin",1,c,-d)+"\\)"],
    "Extract all four values from the graph: the maximum "+(a+d)+" and minimum "+(d-a)+" give amplitude "+a+" and midline \\(y = "+d+"\\); one cycle spans 360°, so \\(b = 1\\); and the rising midline crossing is shifted "+c+"° right of the origin, so the phase shift is \\(c = "+c+"^\\circ\\) in a sine model. Only the correct option gets all four right.",
    {a:a,c:c,d:d});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:30,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-data-fit-params",3,["7.6"],1,"gen",function(){
  var a=pick([1.5,2,2.5,3,3.5,4]),d=pick([2,3,4,5,6,8,10]),feat=pick(["amplitude","period"]);
  while(d===a||2*a===d)d=pick([2,3,4,5,6,8,10]);
  var xs=[0,3,6,9,12],ys=[d,d+a,d,d-a,d];
  var tbl=tblHTML(xs,ys.map(function(v){return fmt(v);}),"Time (h)","Height (m)");
  var fig=fnPlotSVG(null,-1,13,Math.floor(d-a)-1,Math.ceil(d+a)+1,{gx:3,gy:1,labelX:true,labelY:true,points:xs.map(function(x,ix){return [x,ys[ix]];})});
  if(feat==="amplitude"){
    var q=mcq("Heights of a tide in Petty Harbour are recorded every 3 hours. "+tbl+" Which value, in metres, is the <b>amplitude</b> of a sinusoidal model of this data?",
      fmt(a),[fmt(d),fmt(d+a),fmt(2*a)],
      "The heights run from a low of "+fmt(d-a)+" m to a high of "+fmt(d+a)+" m around a midline of "+fmt(d)+" m. The amplitude is the distance from the midline to the high: "+fmt(d+a)+" - "+fmt(d)+" = <b>"+fmt(a)+" m</b>.",
      {feat:feat,a:a,d:d}); q.figure=fig; return q;
  }
  var q=mcq("Heights of a tide in Petty Harbour are recorded every 3 hours. "+tbl+" Which value, in hours, is the <b>period</b> of a sinusoidal model of this data?",
    "12",["6","24","3"],
    "The pattern high, mid, low, mid returns to its starting height at 12 h (high at 3 h repeats at 15 h), so one full cycle takes <b>12 h</b>. The 6 h figure is only the high-to-low half cycle.",
    {feat:feat,a:a,d:d}); q.figure=fig; return q;
});
E("u3-data-equation",3,["7.6"],2,"gen",function(){
  var a=pick([2,3,4]),d=pick([3,4,5,6,8,10]),b=pick([15,30]),fam=pick(["sin","cos"]);
  while(d===a)d=pick([3,4,5,6,8,10]);
  var per=360/b,xs=[0,per/4,per/2,3*per/4,per];
  var ys=(fam==="sin")?[d,d+a,d,d-a,d]:[d+a,d,d-a,d,d+a];
  var alt=(fam==="sin")?"cos":"sin";
  var tbl=tblHTML(xs,ys,"Time (h)","Depth (m)");
  var fig=fnPlotSVG(null,-1,per+1,d-a-1,d+a+1,{gx:per/4,gy:1,labelX:true,labelY:true,points:xs.map(function(x,ix){return [x,ys[ix]];})});
  function eqFor(aa,tr,bb,dd){return sinS(aa,tr,bb,0,dd).replace("y =","D(t) =").replace("(x","(t");}
  var q=mcq("The depth of water at a wharf is recorded over one full tidal cycle. "+tbl+" Which equation, with \\(t\\) in hours, models the depth?",
    "\\("+eqFor(a,fam,b,d)+"\\)",
    ["\\("+eqFor(a,alt,b,d)+"\\)",
     "\\("+eqFor(d,fam,b,a)+"\\)",
     "\\("+eqFor(a,fam,2*b,d)+"\\)"],
    (fam==="sin"?"The depth starts at the midline value "+d+" and rises to "+(d+a)+", the sine pattern starting at its midline.":"The depth starts at its maximum "+(d+a)+" and falls, the cosine pattern starting at a peak.")+" The midline is "+d+", the amplitude is "+a+", and the cycle takes "+per+" h, so \\(b = \\frac{360}{"+per+"} = "+b+"\\) with the cycle measured in degrees. The model is \\("+eqFor(a,fam,b,d)+"\\).",
    {a:a,d:d,b:b,fam:fam}); q.figure=fig; return q;
});
E("u3-tide-predict",3,["7.7"],3,"gen",function(){
  var H=pick([3.6,4.2,4.8,5.4]),L=pick([0.4,0.6,0.8,1.2]);
  var h1=pick([1,2,3]),off=pick([0,3,6,9]),cycles=pick([1,2]);
  var t=h1+6+12*cycles+off,ans=(off===0?L:(off===6?H:(H+L)/2));
  return numq("At a harbour, high tide of "+H+" m occurs at "+h1+":00 and the following low tide of "+L+" m occurs 6 hours later. The tides follow a sinusoidal pattern with a period of 12 hours. What is the height of the tide, in metres, at time "+t+":00?",
    Math.round(ans*100)/100,0.01,
    "Work out where "+t+":00 falls in the cycle. Low tide is at "+(h1+6)+":00 and the pattern repeats every 12 hours, so lows also occur at "+(h1+6+12)+":00 and "+(h1+6+24)+":00, and highs 6 hours after each low. "+(off===0?"The time "+t+":00 lands exactly on a low tide.":(off===6?"The time "+t+":00 lands exactly on a high tide.":"The time "+t+":00 lands halfway between a high and a low, on the midline, whose height is the average \\(\\frac{"+H+" + "+L+"}{2}\\)."))+" The height is <b>"+fmt(Math.round(ans*100)/100)+" m</b>.",
    {H:H,L:L,t:t,off:off});
});
E("u3-temp-model",3,["7.7"],3,"var",varset([
  function(){return numq("The temperature in Gander over a day is modelled by \\(T(t) = 6 \\sin 15^\\circ(t - 9) + 14\\), where \\(t\\) is the hour of the day. At what hour does the temperature first reach its daily maximum?",
    15,0.01,
    "The maximum occurs when the sine factor first equals 1, at an angle of 90°: \\(15(t - 9) = 90\\) gives \\(t - 9 = 6\\), so \\(t = 15\\). The temperature first peaks at <b>15:00</b> (3 PM), at 20°C.",{});},
  function(){return numq("A Ferris wheel rider's height is modelled by \\(h(t) = 10 - 9 \\cos 36^\\circ t\\), with \\(h\\) in metres and \\(t\\) in minutes. The wheel starts at the bottom. What is the rider's height after 2.5 minutes?",
    10,0.01,
    "The period is \\(\\frac{360}{36} = 10\\) minutes, so 2.5 minutes is a quarter of a rotation: the rider has climbed to the level of the axle, halfway between the bottom (1 m) and the top (19 m). Checking with the model: \\(\\cos(36 \\times 2.5) = \\cos 90^\\circ = 0\\), so \\(h = 10 - 0 = 10\\) m.",{});},
  function(){return numq("The depth of water at a dock is modelled by \\(H(t) = 1.8 \\sin 30^\\circ(t - 3) + 2.6\\), with \\(H\\) in metres and \\(t\\) in hours. What is the depth at \\(t = 9\\) hours?",
    2.6,0.01,
    "Evaluate the phase first: \\(30(9 - 3) = 180^\\circ\\), and \\(\\sin 180^\\circ = 0\\). So \\(H(9) = 1.8(0) + 2.6 = 2.6\\) m, the midline depth, halfway between high and low water.",{});}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: three Level 2 CR entries (3, 2 and 2 marks). The Level 2 CR pool held only three 2-mark entries, so the remainders behind the Level 3 picks could not form. ---------- */
E("u3-evaluate-equation-cr",3,["7.4"],2,"gen",function(){
  var cb=pick([[15,30],[15,90],[15,150],[15,270],[30,30],[30,90],[30,150],[30,270],[45,90],[45,270],[60,90],[60,270],[90,90],[90,180],[90,270]]);
  var b=cb[0], phase=cb[1];
  var a=pick([2,3,4,5]), c=pick([0,15,30,45]), d=pick([-4,-3,-2,-1,0,1,2,3,4]);
  var sv={30:0.5,90:1,150:0.5,180:0,270:-1}[phase];
  var t=c+phase/b, ans=a*sv+d;
  return numq("Given \\("+sinS(a,"sin",b,c,d)+"\\), determine the value of \\(y\\) when \\(x = "+t+"^\\circ\\).",
    ans,0.01,
    "Substitute \\(x = "+t+"^\\circ\\): the angle inside the sine is \\("+b+"("+t+" - "+c+")^\\circ = "+phase+"^\\circ\\), and \\(\\sin "+phase+"^\\circ = "+sv+"\\). So \\(y = "+a+" \\times "+sv+(d===0?"":" + ("+d+")")+" = <b>"+fmt(ans,2)+"</b>\\).",
    {b:b,phase:phase,c:c,t:t});
});
E("u3-first-max-time-cr",3,["7.3"],2,"gen",function(){
  var b=pick([15,30,45]), a=pick([2,3,4]), h=pick([0,1,2]), k=pick([6,8,10,12]);
  var t=h+90/b;
  var arg=h===0?"t":"(t - "+h+")";
  return numq("The depth of water at a dock, in metres, is modelled by \\(D(t) = "+a+"\\sin "+b+arg+" + "+k+"\\), where \\(t\\) is the time in hours after midnight and the angles are in degrees. Determine the <b>first</b> time, in hours after midnight, at which the depth reaches its maximum.",
    t,0.01,
    "The depth is greatest when the sine factor first equals 1, which happens when its argument first reaches \\(90^\\circ\\). Solve \\("+b+arg+" = 90\\): \\(t = "+h+" + \\frac{90}{"+b+"} = <b>"+fmt(t,2)+"</b>\\) hours after midnight.",
    {b:b,h:h});
});
E("u3-characteristics-combo-cr",3,["7.2"],2,"gen",function(){
  var pr=pick([[11,-3],[9,-3],[9,1],[7,-1],[7,1],[11,1],[13,-1],[10,-2],[12,2]]);
  var M=pr[0], m=pr[1], P=pick([120,180,360,720]);
  var A=(M-m)/2, K=(M+m)/2;
  function opt(x,y,z){ return "Amplitude "+x+", midline "+y+", period "+z+"°"; }
  return mcq("A sinusoidal graph has a maximum value of "+M+" and a minimum value of "+m+", and it completes one full cycle over an interval of "+P+"°. Which set of characteristics is correct?",
    opt(A,K,P),
    [opt(K,A,P), opt(M-m,K,P), opt(A,K,2*P)],
    "Amplitude is half the distance between the extremes: \\(\\frac{"+M+" - ("+m+")}{2} = "+A+"\\). The midline sits halfway between them: \\(\\frac{"+M+" + ("+m+")}{2} = "+K+"\\). The period is the length of one full cycle, "+P+"°.",
    {M:M,m:m,P:P});
});

/* ----- bank-u4.js ----- */
// Math 3201 Unit 4 Exponential Functions question bank
// CRMARKS: u4-compare-models=3
// CRMARKS: u4-compound-model=1
// CRMARKS: u4-data-fit-equation=2
// CRMARKS: u4-data-next-value=1
// CRMARKS: u4-eq-characteristics=1
// CRMARKS: u4-estimate-solution=1
// CRMARKS: u4-express-as-power=1
// CRMARKS: u4-find-base=3
// CRMARKS: u4-graph-characteristics=1
// CRMARKS: u4-growth-model-eval=2
// CRMARKS: u4-half-life=2
// CRMARKS: u4-interpret-graph-model=1
// CRMARKS: u4-match-by-description=2
// CRMARKS: u4-match-graph=2
// CRMARKS: u4-reverse-half-life=3
// CRMARKS: u4-solve-common-base=2
// CRMARKS: u4-solve-isolate=2
// CRMARKS: u4-solve-rewrite-base=2
// CRMARKS: u4-solve-two-sided=2
/* ================= Unit 4: Exponential Functions ================= */
function bStr(bn,bd){return bd===1?(""+bn):"\\left(\\frac{"+bn+"}{"+bd+"}\\right)";}
function expS(a,bn,bd){return (a===1?"":(""+a))+"("+bStr(bn,bd)+")^x";}
function powVal(bn,bd,k){var n=1,d=1,i;if(k>=0){for(i=0;i<k;i++){n*=bn;d*=bd;}}else{for(i=0;i<-k;i++){n*=bd;d*=bn;}}var g=gcd2(n,d);return [n/g,d/g];}
function valStr(n,d){return d===1?(""+n):("\\frac{"+n+"}{"+d+"}");}
E("u4-identify-exponential",4,["4.12"],1,"gen",function(){
  var A=pick([2,3,4,5,6,7,8,9]),bp=pick([[2,1],[3,1],[4,1],[1,2],[1,3],[1,4],[4,5],[5,4],[3,2]]);
  var corr="\\(y = "+expS(A,bp[0],bp[1])+"\\)";
  var pool=["\\(y = x^2 + "+ri(1,9)+"\\)","\\(y = "+ri(2,7)+"x + "+ri(1,9)+"\\)","\\(y = x^"+pick([3,4,5])+"\\)","\\(y = (-"+pick([2,3])+")^x\\)","\\(y = \\frac{"+pick([2,3,6])+"}{x}\\)","\\(y = "+pick([5,7,11])+"\\)","\\(y = \\sqrt{x} + "+ri(1,4)+"\\)"];
  var ds=[];
  if(bp[1]>1){
    var pq=pick([[2,3],[3,4],[2,5],[3,5]]);
    var nd="\\(y = \\left(\\frac{"+pq[0]+"}{"+pq[1]+"}x\\right)^2 + "+ri(1,4)+"\\)";
    var longPool=[pool[0],pool[1],pool[3],pool[6]];
    ds.push(nd);
    while(ds.length<3){var c2=pick(longPool);if(ds.indexOf(c2)<0)ds.push(c2);}
  }else{
    while(ds.length<3){var c=pick(pool);if(ds.indexOf(c)<0)ds.push(c);}
  }
  return mcq("Which of the following is an <b>exponential function</b>?",
    corr,ds,
    "An exponential function has the variable in the exponent with a positive constant base (not 1): \\(y = a(b)^x\\). The correct choice has that form. The others are a polynomial, a linear function, a power of \\(x\\), a negative base (not allowed for exponential functions in this course), a reciprocal, a constant, or a root function.",
    {A:A,bp:bp});
});
E("u4-growth-or-decay",4,["4.13"],1,"gen",function(){
  var A=pick([2,3,4,5,6,8,10,12,15,20]),bp=pick([[2,1],[3,1],[4,1],[5,1],[1,2],[1,3],[1,4],[2,5],[5,2]]);
  var bv=bp[0]/bp[1],growth=bv>1;
  return mcq("The function \\(y = "+expS(A,bp[0],bp[1])+"\\) is:",
    growth?"Increasing, because the base is greater than 1":"Decreasing, because the base is between 0 and 1",
    [growth?"Decreasing, because the base is between 0 and 1":"Increasing, because the base is greater than 1",
     "Constant, because the coefficient "+A+" does not change",
     growth?"Increasing, because the coefficient "+A+" is positive":"Decreasing, because the coefficient "+A+" is positive"],
    "For \\(y = a(b)^x\\) with \\(a > 0\\), the base decides the direction: here \\(b = "+fmt(bv)+"\\), which is "+(growth?"greater than 1, so each step multiplies by more than 1 and the function increases.":"between 0 and 1, so each step multiplies by a fraction and the function decreases.")+" The coefficient \\(a\\) sets the starting value, not the direction.",
    {A:A,bp:bp});
});
E("u4-express-as-power",4,["4.7"],1,"gen",function(){
  var mode=pick(["int","int","frac"]);
  if(mode==="frac"){
    var bp2=pick([2,3,4,5]),k2=pick([2,3,4]),v=powVal(1,bp2,k2);
    var ans="\\(\\left(\\frac{1}{"+bp2+"}\\right)^{"+k2+"}\\)";
    return mcq("Which expression is equivalent to \\("+valStr(v[0],v[1])+"\\)?",
      ans,
      ["\\(\\left(\\frac{1}{"+bp2+"}\\right)^{"+(k2+1)+"}\\)","\\(\\left(\\frac{1}{"+(bp2+1)+"}\\right)^{"+k2+"}\\)","\\("+bp2+"^{"+k2+"}\\)"],
      "\\(\\frac{1}{"+Math.pow(bp2,k2)+"}\\) is \\(\\frac{1}{"+bp2+"}\\) multiplied by itself "+k2+" times: "+ans+". Writing it as a single power of "+bp2+", it is also \\("+bp2+"^{-"+k2+"}\\).",
      {mode:mode});
  }
  var B=pick([2,3,4,5,6,7,8,9,10]),k=(B<=3?pick([2,3,4]):pick([2,3])),N=Math.pow(B,k),tmpl=pick([1,2]);
  if(tmpl===1){
    var candE=["\\("+B+"^"+(k+1)+"\\)","\\("+(B+1)+"^"+k+"\\)","\\("+k+"^"+B+"\\)","\\(("+B+" + "+k+")^"+k+"\\)","\\("+B+"^{"+k+"} + "+B+"\\)"],corrE="\\("+B+"^"+k+"\\)",dsE=[];
    for(var ei=0;ei<candE.length&&dsE.length<3;ei++){if(candE[ei]!==corrE&&dsE.indexOf(candE[ei])<0)dsE.push(candE[ei]);}
    return mcq("Express "+N+" as a power of "+B+".",
      corrE,dsE,
      N+" is "+B+" multiplied by itself "+k+" times (\\("+Array(k).fill(B).join(" \\times ")+"\\)), so "+N+" = \\("+B+"^"+k+"\\) as a single power.",
      {B:B,k:k});
  }
  var candV=[""+Math.pow(B,k+1),""+Math.pow(B+1,k),""+(B*k),""+(N+B),""+(2*N)],dsV=[];
  for(var vi=0;vi<candV.length&&dsV.length<3;vi++){if(candV[vi]!==""+N&&dsV.indexOf(candV[vi])<0)dsV.push(candV[vi]);}
  return mcq("Which expression is equivalent to \\("+B+"^"+k+"\\)?",
    ""+N,dsV,
    "\\("+B+"^"+k+"\\) means "+B+" multiplied by itself "+k+" times: \\("+Array(k).fill(B).join(" \\times ")+" = "+N+"\\). (Multiplying the base by the exponent, "+(B*k)+", is the classic trap.)",
    {B:B,k:k});
});
E("u4-graph-characteristics",4,["4.12"],1,"gen",function(){
  function normOpts(key,ds){
    function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
    function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
    var all=[key].concat(ds),guard=0;
    while(guard++<12){
      var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
      var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
      var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
      if(!sing.length)break;
      var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
      for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
      if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
      if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
      else{all[cand]=pad(all[cand],s);}
    }
    return [all[0],all.slice(1)];
  }
  var feat=pick(["range","yint","direction"]);
  var A=pick([1,2,3,4,5]),bp=pick([[2,1],[3,1],[1,2],[1,3]]),bv=bp[0]/bp[1];
  var fn=function(x){return A*Math.pow(bv,x);};
  var win={x0:-3,x1:3.5,y0:-4,y1:Math.max(20,A*Math.pow(bv,2.5)+6)};
  function yintDistrs(){var cand=["0",""+fmt(A*bv),""+(A+2),""+(2*A),""+(A+1)],out=[];for(var i=0;i<cand.length&&out.length<3;i++){if(cand[i]!==""+A&&out.indexOf(cand[i])<0)out.push(cand[i]);}return out;}
  if(feat==="range"){
    var q=mcq("What is the <b>range</b> of the exponential function shown?",
      "\\(\\{y \\mid y > 0, \\ y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid y > "+A+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y \\ge 0, \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y \\in \\mathbb{R}\\}\\)"],
      "The curve stays above the x-axis and approaches it without ever touching: there are no zero or negative outputs, but every positive value occurs. The range is <b>\\(\\{y \\mid y > 0\\}\\)</b>. Note the curve passes through \\((0, "+A+")\\) but "+A+" is the y-intercept, not a boundary of the range.",
      {feat:feat,A:A,bp:bp});
    q.figure=plotSVG(fn,win.x0,win.x1,win.y0,win.y1,{gx:1,gy:5,labelX:true});return q;
  }
  if(feat==="yint"){
    var ny=normOpts(""+A,yintDistrs());
    var q2=mcq("What is the <b>y-intercept</b> of the exponential function shown?",
      ny[0],ny[1],
      "The y-intercept is where the curve crosses the y-axis, at \\(x = 0\\). Reading the graph there gives <b>"+A+"</b>.",
      {feat:feat,A:A,bp:bp});
    q2.figure=plotSVG(fn,win.x0,win.x1,win.y0,win.y1,{gx:1,gy:5,labelX:true});return q2;
  }
  var growth=bv>1;
  var q3=mcq("Which statement describes the graphed exponential function?",
    growth?"Increasing: the values grow as x increases":"Decreasing: the values shrink as x increases",
    [growth?"Decreasing: the values shrink as x increases":"Increasing: the values grow as x increases",
     "It has an x-intercept where the curve crosses the axis",
     "Its range includes negative values"],
    "Reading left to right, the curve "+(growth?"climbs steadily, so the function is increasing":"falls steadily toward the x-axis, so the function is decreasing")+". An exponential of the form \\(y = a(b)^x\\) with \\(a > 0\\) never crosses the x-axis and never takes negative values, which rules out the other two statements.",
    {feat:feat,A:A,bp:bp});
  q3.figure=plotSVG(fn,win.x0,win.x1,win.y0,win.y1,{gx:1,gy:5,labelX:true});return q3;
});
E("u4-eq-characteristics",4,["4.13"],1,"gen",function(){
  function normOpts(key,ds){
    function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
    function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
    var all=[key].concat(ds),guard=0;
    while(guard++<12){
      var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
      var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
      var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
      if(!sing.length)break;
      var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
      for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
      if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
      if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
      else{all[cand]=pad(all[cand],s);}
    }
    return [all[0],all.slice(1)];
  }
  var feat=pick(["yint","range","factor"]);
  var A=pick([2,3,4,5,6,8]),bp=pick([[2,1],[3,1],[4,1],[1,2],[1,3],[1,4]]),bv=bp[0]/bp[1],tries=0;
  while(new Set([bv,A,A*bv,bv*bv,A+1]).size<5&&tries<60){A=pick([2,3,4,5,6,8]);bp=pick([[2,1],[3,1],[4,1],[1,2],[1,3],[1,4]]);bv=bp[0]/bp[1];tries++;}
  var eq="y = "+expS(A,bp[0],bp[1]);
  if(feat==="yint"){
    var ny=normOpts(""+A,[""+fmt(bv),""+(A+1),"1"]);
    return mcq("What is the <b>y-intercept</b> of \\("+eq+"\\)?",
      ny[0],ny[1],
      "Set \\(x = 0\\): any base to the power 0 is 1, so \\(y = "+A+" \\times 1 = "+A+"\\). The y-intercept of \\(y = a(b)^x\\) is always \\(a\\): <b>"+A+"</b>.",
      {feat:feat,A:A});
  }
  if(feat==="range"){
    return mcq("What is the <b>range</b> of \\("+eq+"\\)?",
      "\\(\\{y \\mid y > 0, \\ y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid y > "+A+", \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y \\ge 0, \\ y \\in \\mathbb{R}\\}\\)","\\(\\{y \\mid y < 0, \\ y \\in \\mathbb{R}\\}\\)"],
      "Powers of a positive base are always positive, and multiplying by \\(a = "+A+" > 0\\) keeps them positive, so every output is greater than 0 and the x-axis is a horizontal asymptote. The range is <b>\\(\\{y \\mid y > 0\\}\\)</b>, whatever the values of \\(a\\) and \\(b\\).",
      {feat:feat,A:A});
  }
  var nf=normOpts(fmt(bv),[""+A,""+fmt(A*bv),""+fmt(bv*bv)]);
  return mcq("For \\("+eq+"\\), by what <b>factor</b> does the value of \\(y\\) change each time \\(x\\) increases by 1?",
    nf[0],nf[1],
    "Each increase of 1 in \\(x\\) adds one more multiplication by the base: \\(y\\) is multiplied by \\(b = "+fmt(bv)+"\\) every step. That constant multiple is the growth (or decay) factor; \\(a = "+A+"\\) is only the starting value at \\(x = 0\\).",
    {feat:feat,A:A,bp:bp});
});
E("u4-match-graph",4,["4.11"],2,"gen",function(){
  var A=pick([1,2,3,4,5,6,7,8]),bp=pick([[2,1],[3,1],[4,1],[5,1],[1,2],[1,3],[1,4],[1,5],[4,5],[3,2]]),bv=bp[0]/bp[1];
  var fn=function(x){return A*Math.pow(bv,x);};
  var A2=(A===1?3:A+1),recip=[bp[1],bp[0]];
  var q=mcq("Which equation matches the graphed exponential function?",
    "\\(y = "+expS(A,bp[0],bp[1])+"\\)",
    ["\\(y = "+expS(A,recip[0],recip[1])+"\\)","\\(y = "+expS(A2,bp[0],bp[1])+"\\)","\\(y = "+expS(A2,recip[0],recip[1])+"\\)"],
    "Read two things off the graph: it crosses the y-axis at "+A+", so \\(a = "+A+"\\); and it is "+(bv>1?"increasing":"decreasing")+", so the base is "+(bv>1?"greater than 1":"between 0 and 1")+". Checking the value at \\(x = 1\\) (\\(y = "+fmt(A*bv)+"\\) on the graph) pins the base at \\("+fmt(bv)+"\\). Only the correct option matches the intercept, the direction, and the steepness.",
    {A:A,bp:bp});
  q.figure=plotSVG(fn,-3,3.5,-4,Math.max(20,A*Math.pow(bv,2.5)+6),{gx:1,gy:5,labelX:true});
  return q;
});
E("u4-match-by-description",4,["4.11"],2,"gen",function(){
  var table=[[[2,1],[3,5,12,20,25]],[[3,1],[3,5,12,20,25]],[[4,1],[2,3,5,10]],[[1,2],[4,6,10,20,30]],[[1,3],[6,12,24,30]],[[1,4],[8,16,20,40]],[[1,5],[10,25,50]]];
  var row=pick(table),bp=row[0],A=pick(row[1]),bv=bp[0]/bp[1],step=pick([1,2]);
  var yv=A*Math.pow(bv,step),recip=[bp[1],bp[0]];
  var A2=Math.round(yv);if(A2===1)A2=A+2;
  return mcq("An exponential function of the form \\(y = a(b)^x\\) has y-intercept "+A+" and passes through the point \\(("+step+", "+fmt(yv)+")\\). Which equation is it?",
    "\\(y = "+expS(A,bp[0],bp[1])+"\\)",
    ["\\(y = "+expS(A,recip[0],recip[1])+"\\)","\\(y = "+expS(A2,bp[0],bp[1])+"\\)","\\(y = "+expS(1,bp[0],bp[1])+"\\)"],
    "The y-intercept gives \\(a = "+A+"\\). Substitute the point and solve for \\(b\\): \\[ \\begin{aligned} "+fmt(yv)+" &= "+A+"(b)^{"+step+"} \\\\ b^{"+step+"} &= "+fmt(yv/A)+" \\\\ b &= "+fmt(bv)+" \\end{aligned} \\] The trap options use the reciprocal base (which flips growth to decay) or mistake the point's y-value for \\(a\\). The function is \\(y = "+expS(A,bp[0],bp[1])+"\\).",
    {A:A,bp:bp,step:step});
});

var EXP_CTX=[
  {n:"A bacteria culture in a lab grows",xu:"Time (h)",yu:"Mass (mg)",thing:"mass"},
  {n:"The population of a pond's trout population changes",xu:"Time (yr)",yu:"Trout",thing:"population"},
  {n:"The value of a snowmobile bought in Corner Brook changes",xu:"Time (yr)",yu:"Value ($)",thing:"value"}
];
function expDataGen(){
  var bp=pick([[2,1],[2,1],[3,1],[4,1],[1,2],[1,2],[1,3]]);
  var bv=bp[0]/bp[1];
  var apool=(bv===2?[3,5,6,10,15]:(bv===3?[2,4,5,10]:(bv===4?[3,5,10]:(bv===0.5?[16,32,48,80,160]:[27,54,81,162]))));
  var A=pick(apool),step=pick([1,1,2]);
  var xs=[0,1,2,3,4].map(function(i){return i*step;});
  var ys=xs.map(function(x,i){return A*Math.pow(bv,i);});
  return {bp:bp,bv:bv,A:A,step:step,xs:xs,ys:ys,ctx:pick(EXP_CTX)};
}
E("u4-data-fit-equation",4,["4.1"],1,"gen",function(){
  var g=expDataGen(),recip=[g.bp[1],g.bp[0]];
  var tbl=tblHTML(g.xs,g.ys.map(function(v){return fmt(v);}),g.ctx.xu,g.ctx.yu);
  var eqv=function(aa,bp){return "P(t) = "+(aa===1?"":aa)+"("+bStr(bp[0],bp[1])+")^{t"+(g.step===1?"":"/"+g.step)+"}" ;};
  return mcq(g.ctx.n+" as shown in the table. "+tbl+" Which function models the data, where \\(t\\) is the time?",
    "\\("+eqv(g.A,g.bp)+"\\)",
    ["\\("+eqv(g.A,recip)+"\\)","\\("+eqv(g.ys[1],g.bp)+"\\)","\\(P(t) = "+g.A+" + "+fmt(g.ys[1]-g.A)+"t\\)"],
    "Check the pattern: each step multiplies the value by "+fmt(g.bv)+" ("+g.ys.slice(0,3).map(function(v){return fmt(v);}).join(" to ")+" ...), a constant ratio, so the model is exponential, not linear. The starting value at \\(t = 0\\) is "+g.A+", giving \\(a = "+g.A+"\\), and the ratio gives \\(b = "+fmt(g.bv)+"\\). The model is \\("+eqv(g.A,g.bp)+"\\).",
    {A:g.A,bp:g.bp,step:g.step});
});
E("u4-data-next-value",4,["4.1"],1,"gen",function(){
  var g=expDataGen(),ask=pick(["next","missing"]);
  if(ask==="next"){
    var ans=g.A*Math.pow(g.bv,5);
    return numq(g.ctx.n+" as shown in the table. "+tblHTML(g.xs,g.ys.map(function(v){return fmt(v);}),g.ctx.xu,g.ctx.yu)+" Following the pattern, what is the "+g.ctx.yu.replace(/\(.*\)/,"").trim().toLowerCase()+" at time "+(5*g.step)+"?",
      ans,0.01,
      "The values multiply by "+fmt(g.bv)+" at each step ("+g.ys.map(function(v){return fmt(v);}).join(", ")+"). One more step: "+fmt(g.ys[4])+" \\(\\times "+fmt(g.bv)+" = "+fmt(ans)+"\\).",
      {ask:ask,A:g.A,bp:g.bp});
  }
  var ys2=g.ys.slice();var missing=ys2[2];ys2[2]=null;
  return numq(g.ctx.n+" as shown in the table, with one value missing. "+tblHTML(g.xs,ys2.map(function(v){return v===null?null:fmt(v);}),g.ctx.xu,g.ctx.yu)+" What is the missing value?",
    missing,0.01,
    "The values change by a constant ratio: "+fmt(g.ys[1])+" / "+fmt(g.ys[0])+" = "+fmt(g.bv)+", confirmed by "+fmt(g.ys[4])+" / "+fmt(g.ys[3])+" = "+fmt(g.bv)+". So the missing value is "+fmt(g.ys[1])+" \\(\\times "+fmt(g.bv)+" = "+fmt(missing)+"\\). (Adding a constant difference instead is the linear trap; the differences here grow.)",
    {ask:ask,A:g.A,bp:g.bp});
});
E("u4-interpret-graph-model",4,["4.3"],2,"var",varset([
  function(){var fn=function(t){return 150*Math.pow(2,t/2);};
    var q=mcq("The graph models the population of bacteria in a sample, over time in hours. What does the value where the graph crosses the vertical axis represent?",
      "The initial population: 150 bacteria at time 0",
      ["The population of the sample after 150 hours","The time the bacteria take to double in size","The maximum population that the sample can hold"],
      "The crossing point is at t = 0, the start of the experiment, and its value is 150. In a model P(t) = a(b)^t, that starting value is a, the initial population.",{});
    q.figure=plotSVG(fn,0,8,0,1300,{gx:1,gy:200,labelX:true});return q;},
  function(){var fn=function(t){return 18000*Math.pow(0.5,t/6);};
    var q=mcq("The graph models the value of a side-by-side ATV bought in Labrador, in dollars, over time in years. Which statement is correct?",
      "The value halves every 6 years, dropping toward $0 without ever reaching it",
      ["The value drops by $3000 every year, falling by the same amount year after year","The value reaches $0 after 36 years, dropping until nothing is left at all","The value halves every year, dropping by half with each year that passes"],
      "The curve falls by a constant ratio, not a constant amount: it passes $9000 at 6 years and $4500 at 12 years, halving every 6 years. Like all decay of the form a(b)^t with 0 < b < 1, it approaches $0 but mathematically never arrives.",{});
    q.figure=plotSVG(fn,0,24,0,19000,{gx:2,gy:3000,labelX:true});return q;},
  function(){var fn=function(t){return 60*Math.pow(3,t/4);};
    var q=mcq("The graph models the number of people who have heard a rumour in a school, over time in days. After how many days have 540 people heard the rumour?",
      "8 days",
      ["4 days","6 days","12 days"],
      "Read across from 540 on the vertical axis to the curve and down: the graph passes through (4, 180) and (8, 540), since the count triples every 4 days (60, 180, 540). It takes 8 days.",{});
    q.figure=plotSVG(fn,0,10,0,2000,{gx:1,gy:250,labelX:true});return q;}
]));
E("u4-solve-common-base",4,["4.7"],1,"gen",function(){
  var bp=pick([[2,1],[3,1],[4,1],[5,1],[9,1],[25,1],[1,2],[1,3]]),k=pick([-3,-2,-1,1,2,3,4]);
  var v=powVal(bp[0],bp[1],k);
  return numq("Solve for \\(x\\): \\("+bStr(bp[0],bp[1])+"^x = "+valStr(v[0],v[1])+"\\)",
    k,0.001,
    "Rewrite the right side as a power of the same base: \\("+valStr(v[0],v[1])+" = "+bStr(bp[0],bp[1])+"^{"+k+"}\\). With equal bases, the exponents are equal, so \\(x = "+k+"\\)"+(k<0?" (a negative exponent, matching the fraction on the right)":"")+".",
    {bp:bp,k:k});
});
E("u4-solve-rewrite-base",4,["4.7"],2,"gen",function(){
  var cdata={2:{ms:[2,3,4,5],nmax:8},3:{ms:[2,3,4],nmax:6},5:{ms:[2,3],nmax:4},7:{ms:[2],nmax:3}};
  var c=pick([2,3,5,7]),m=pick(cdata[c].ms),nmax=cdata[c].nmax,n=ri(1,nmax),tries=0;
  while((n%m===0||n===m)&&tries<60){n=ri(1,nmax);tries++;}
  var B=Math.pow(c,m),N=Math.pow(c,n),x=n/m,flip=Math.random()<0.5;
  var eqStr=flip?("\\("+N+" = "+B+"^x\\)"):("\\("+B+"^x = "+N+"\\)");
  return numq("Solve for \\(x\\): "+eqStr,
    x,0.01,
    "Both numbers are powers of "+c+": \\("+B+" = "+c+"^{"+m+"}\\) and \\("+N+" = "+c+"^{"+n+"}\\). Rewrite with the common base and equate the exponents: \\[ \\begin{aligned} "+c+"^{"+m+"x} &= "+c+"^{"+n+"} \\\\ "+m+"x &= "+n+" \\\\ x &= "+(gcd2(n,m)>1?("\\frac{"+(n/gcd2(n,m))+"}{"+(m/gcd2(n,m))+"}"):("\\frac{"+n+"}{"+m+"}"))+" = "+fmt(x,2)+" \\end{aligned} \\]",
    {c:c,m:m,n:n});
});
E("u4-solve-two-sided",4,["4.7"],2,"gen",function(){
  var fam=pick(["shift","scale","recip"]);
  if(fam==="shift"){
    var B=pick([2,3,5]),s=pick([-2,-1,1,2]),K=pick([-1,1,2,3,4,5]),x=K-s;
    var ex=(s>0?("x + "+s):("x - "+(-s)));
    return numq("Solve for \\(x\\): \\("+B+"^{"+ex+"} = "+Math.pow(B,K)+"\\)",
      x,0.001,
      "The right side is \\("+B+"^{"+K+"}\\). With equal bases, \\("+ex+" = "+K+"\\), so \\(x = "+x+"\\) (undo the "+(s>0?"addition":"subtraction")+" inside the exponent).",
      {fam:fam,B:B});
  }
  if(fam==="scale"){
    var B2=pick([2,3]),m2=pick([2,3]),x0=pick([-2,-1,1,2,3]),K2=m2*x0,v2=powVal(B2,1,K2);
    return numq("Solve for \\(x\\): \\("+B2+"^{"+m2+"x} = "+valStr(v2[0],v2[1])+"\\)",
      x0,0.001,
      "The right side is \\("+B2+"^{"+K2+"}\\). With equal bases, \\("+m2+"x = "+K2+"\\), so \\(x = "+x0+"\\) after dividing by "+m2+".",
      {fam:fam,B:B2});
  }
  var B3=pick([2,3]),K3=pick([1,2,3]),x3=-K3,v3=powVal(B3,1,K3);
  return numq("Solve for \\(x\\): \\(\\left(\\frac{1}{"+B3+"}\\right)^x = "+valStr(v3[0],v3[1])+"\\)",
    x3,0.001,
    "Rewrite the fraction base: \\(\\left(\\frac{1}{"+B3+"}\\right)^x = "+B3+"^{-x}\\), and the right side is \\("+B3+"^{"+K3+"}\\). So \\(-x = "+K3+"\\), giving \\(x = "+x3+"\\). A fraction base with a positive value greater than 1 on the right forces a negative solution.",
    {fam:fam,B:B3});
});
E("u4-estimate-solution",4,["4.8"],1,"gen",function(){
  if(Math.random()<0.35){
    var k2=pick([2,3,4]),lo2=Math.pow(2,k2),hi2=Math.pow(2,k2+1);
    var N2=lo2+ri(1,hi2-lo2-1);
    return mcq("The solution of \\(\\left(\\frac{1}{2}\\right)^x = \\frac{1}{"+N2+"}\\) lies between which two consecutive integers?",
      "Between "+k2+" and "+(k2+1),
      ["Between "+(k2-1)+" and "+k2,"Between "+(k2+1)+" and "+(k2+2),"Exactly "+k2],
      "Rewrite with base 2: the equation is \\(2^{-x} = \\frac{1}{"+N2+"}\\), equivalently \\(2^x = "+N2+"\\). Since \\(2^{"+k2+"} = "+lo2+"\\) and \\(2^{"+(k2+1)+"} = "+hi2+"\\), and "+N2+" sits between them, the solution lies <b>between "+k2+" and "+(k2+1)+"</b>. This bracketing by consecutive powers is the systematic-trial estimate.",
      {decay:true,k:k2});
  }
  var B=pick([2,3,4,5,6,10]),k=pick([1,2,3]),lo=Math.pow(B,k),hi=Math.pow(B,k+1);
  var N=lo+ri(1,hi-lo-1);
  return mcq("The solution of \\("+B+"^x = "+N+"\\) lies between which two consecutive integers?",
    "Between "+k+" and "+(k+1),
    ["Between "+(k-1)+" and "+k,"Between "+(k+1)+" and "+(k+2),"Exactly "+k],
    "Compute the consecutive powers: \\("+B+"^{"+k+"} = "+lo+"\\) and \\("+B+"^{"+(k+1)+"} = "+hi+"\\). Since "+lo+" < "+N+" < "+hi+", and the function is increasing, the solution lies <b>between "+k+" and "+(k+1)+"</b>. No logarithm is needed for the estimate; the powers bracket the answer.",
    {B:B,k:k,N:N});
});
E("u4-solve-isolate",4,["4.8"],2,"gen",function(){
  if(Math.random()<0.3){
    var x0=pick([3,4]),mult=pick([3,5]),A3=Math.pow(2,x0)*mult;
    return numq("Solve for \\(x\\): \\("+A3+"\\left(\\frac{1}{2}\\right)^x = "+mult+"\\)",
      x0,0.001,
      "Isolate the power first: \\[ \\begin{aligned} "+A3+"\\left(\\frac{1}{2}\\right)^x &= "+mult+" \\\\ \\left(\\frac{1}{2}\\right)^x &= \\frac{"+mult+"}{"+A3+"} = \\frac{1}{"+Math.pow(2,x0)+"} \\\\ x &= "+x0+" \\end{aligned} \\] The right side is \\(\\left(\\frac{1}{2}\\right)^{"+x0+"}\\), which is what makes the last step work. The equation as written has no matching bases; isolating the power creates them.",
      {x0:x0});
  }
  var b=pick([2,3,5]),x1=pick([2,3,4,5]),a=pick([2,3,4,6,7,8,9]),C=a*Math.pow(b,x1);
  return numq("Solve for \\(x\\): \\("+a+"("+b+")^x = "+C+"\\)",
    x1,0.001,
    "Isolate the power first: \\[ \\begin{aligned} "+a+"("+b+")^x &= "+C+" \\\\ "+b+"^x &= "+Math.pow(b,x1)+" \\\\ x &= "+x1+" \\end{aligned} \\] The right side in the middle line is \\("+b+"^{"+x1+"}\\), so the bases match. (Dividing "+C+" by "+a+" early is the step that makes the bases match.)",
    {b:b,x1:x1,a:a});
});
E("u4-growth-model-eval",4,["4.9"],2,"gen",function(){
  var fam=pick(["eval","inverse"]);
  var P0=pick([50,120,300,800]),b=pick([2,3]),D=pick([2,3,4]),ctx=pick([
    {w:"A trout population in a stocked pond",u:"years"},
    {w:"A bacteria culture",u:"hours"},
    {w:"The population of a growing town in Labrador",u:"years"}]);
  if(fam==="eval"){
    var kk=pick([2,3]),t=D*kk,ans=P0*Math.pow(b,kk);
    return numq(ctx.w+" is modelled by \\(P(t) = "+P0+"("+b+")^{t/"+D+"}\\), where \\(t\\) is in "+ctx.u+". What is the population after "+t+" "+ctx.u+"?",
      ans,0.01,
      "Substitute \\(t = "+t+"\\): the exponent is \\(\\frac{"+t+"}{"+D+"} = "+kk+"\\), the number of growth periods that have passed. \\[ \\begin{aligned} P("+t+") &= "+P0+" \\times "+b+"^{"+kk+"} \\\\ &= "+P0+" \\times "+Math.pow(b,kk)+" \\\\ &= "+ans+" \\end{aligned} \\]",
      {fam:fam,P0:P0,b:b,D:D});
  }
  var kk2=pick([2,3,4]),target=P0*Math.pow(b,kk2),ans2=D*kk2;
  return numq(ctx.w+" is modelled by \\(P(t) = "+P0+"("+b+")^{t/"+D+"}\\), where \\(t\\) is in "+ctx.u+". After how many "+ctx.u+" does the population reach "+target+"?",
    ans2,0.01,
    "Set the model equal to the target and solve: \\[ \\begin{aligned} "+P0+"("+b+")^{t/"+D+"} &= "+target+" \\\\ ("+b+")^{t/"+D+"} &= "+Math.pow(b,kk2)+" \\\\ \\frac{t}{"+D+"} &= "+kk2+" \\\\ t &= "+ans2+" \\end{aligned} \\] The target is "+kk2+" growth periods of "+D+" "+ctx.u+" each, so \\(t = "+ans2+"\\) "+ctx.u+".",
    {fam:fam,P0:P0,b:b,D:D});
});
E("u4-half-life",4,["4.9"],2,"gen",function(){
  var fam=pick(["amount","time"]);
  var A0=pick([160,240,320,480,640,800]),h=pick([4,5,6,8,10,12]),ctx=pick([
    {w:"A medical isotope",u:"days",amt:"mg"},
    {w:"A pain medication in the bloodstream",u:"hours",amt:"mg"},
    {w:"A radioactive sample in a physics lab",u:"years",amt:"g"}]);
  if(fam==="amount"){
    var kk=pick([2,3,4]),t=h*kk,ans=A0/Math.pow(2,kk);
    return numq(ctx.w+" has a half-life of "+h+" "+ctx.u+" and starts at "+A0+" "+ctx.amt+". The amount remaining is modelled by \\(A(t) = "+A0+"\\left(\\frac{1}{2}\\right)^{t/"+h+"}\\). How many "+ctx.amt+" remain after "+t+" "+ctx.u+"?",
      ans,0.01,
      "The exponent counts half-lives: \\(\\frac{"+t+"}{"+h+"} = "+kk+"\\). So \\(A("+t+") = "+A0+" \\times \\left(\\frac{1}{2}\\right)^{"+kk+"} = \\frac{"+A0+"}{"+Math.pow(2,kk)+"} = "+ans+"\\) "+ctx.amt+".",
      {fam:fam,A0:A0,h:h});
  }
  var kk2=pick([2,3,4]),target=A0/Math.pow(2,kk2),ans2=h*kk2;
  return numq(ctx.w+" has a half-life of "+h+" "+ctx.u+" and starts at "+A0+" "+ctx.amt+". After how many "+ctx.u+" will only "+target+" "+ctx.amt+" remain?",
    ans2,0.01,
    "Count the halvings: "+A0+" halves to "+(A0/2)+", then "+(A0/4)+", reaching "+target+" after "+kk2+" half-lives. Each takes "+h+" "+ctx.u+", so the time is \\("+kk2+" \\times "+h+" = "+ans2+"\\) "+ctx.u+".",
    {fam:fam,A0:A0,h:h});
});
E("u4-compound-model",4,["4.9"],2,"gen",function(){
  var fam=pick(["choose","read"]);
  var pairs=[[4,4],[6,2],[8,4],[6,12],[5,2],[8,2],[4,2],[6,4]];
  var pr=pick(pairs),r=pr[0],n=pr[1],i=r/100/n;
  var nName=(n===2?"semi-annually":(n===4?"quarterly":"monthly"));
  var istr=fmt(i,4);
  if(fam==="choose"){
    var P=pick([1000,2500,4000,5000]);
    var model=function(ii,ee){return "A(t) = "+P+"(1 + "+ii+")^{"+ee+"}";};
    return mcq("An investment of $"+P+" earns "+r+"% per year, compounded "+nName+". Which function models the amount after \\(t\\) years?",
      "\\("+model(istr,n+"t")+"\\)",
      ["\\("+model(fmt(r/100,2),n+"t")+"\\)","\\("+model(istr,"t")+"\\)","\\("+model(fmt(r/100/n/n,4),n+"t")+"\\)"],
      "Compound interest uses \\(A = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\): the rate per period is \\(\\frac{"+r+"\\%}{"+n+"} = "+fmt(r/n,2)+"\\% = "+istr+"\\), and there are \\("+n+"t\\) periods in \\(t\\) years. Forgetting to divide the rate, or forgetting to multiply the exponent by "+n+", gives the traps.",
      {fam:fam,P:P,r:r,n:n});
  }
  var P2=pick([1200,1800,2400,3000,3600]);
  var ask=pick(["rate","freq"]);
  if(ask==="rate"){
    return mcq("An investment is modelled by \\(A(t) = "+P2+"(1 + "+istr+")^{"+n+"t}\\). What is the <b>annual</b> interest rate?",
      r+"%",[fmt(r/n,2)+"%",(r*n)+"%",fmt(i*100,2)+"% compounded "+nName],
      "The amount inside the brackets is the rate per period: "+istr+" = "+fmt(r/n,2)+"% per period, with "+n+" periods per year. The annual (nominal) rate is "+n+" \\(\\times\\) "+fmt(r/n,2)+"% = <b>"+r+"%</b>. Reading "+istr+" itself as the annual rate is the trap.",
      {fam:fam,ask:ask,r:r,n:n});
  }
  return mcq("An investment is modelled by \\(A(t) = "+P2+"(1 + "+istr+")^{"+n+"t}\\). How often is the interest compounded?",
    n===2?"Semi-annually (twice a year)":(n===4?"Quarterly (four times a year)":"Monthly (twelve times a year)"),
    ["Annually (once a year)","Semi-annually (twice a year)","Quarterly (four times a year)","Monthly (twelve times a year)"].filter(function(v){return v.indexOf(n===2?"Semi":(n===4?"Quarterly":"Monthly"))!==0;}),
    "In \\(A = P(1 + i)^{nt}\\), the coefficient of \\(t\\) in the exponent counts the compounding periods per year: here it is "+n+", so interest is compounded "+n+" times a year, "+(n===2?"semi-annually":(n===4?"quarterly":"monthly"))+". (The per-period rate \\(i = "+istr+"\\) agrees: it is the "+r+"% annual rate divided by "+n+".)",
    {fam:fam,ask:ask,r:r,n:n});
});
E("u4-app-decision",4,["4.5"],3,"var",varset([
  function(){return mcq("A town's population is recorded every five years: "+tblHTML([0,5,10],[120,360,1080],"Year","Population")+" Which statement best models the data and predicts the population in year 15?",
    "Exponential model P(t) = 120(3)^(t/5); year 15 population is 3240",
    ["Linear model P(t) = 120 + 96t; year 15 population is 1560","Exponential model P(t) = 120(2)^(t/5); year 15 population is 960","Exponential model P(t) = 360(3)^(t/5); year 15 population is 9720"],
    "The ratios are constant: 360 / 120 = 3 and 1080 / 360 = 3, so the growth is exponential with factor 3 every 5 years, starting from 120. One more period: 1080 x 3 = 3240. The linear option uses the average increase and steadily falls further behind.",{});},
  function(){return mcq("A truck bought for $24,000 loses half its value every 6 years, as shown: "+tblHTML([0,6,12],[24000,12000,6000],"Year","Value ($)")+" At which of these times is the value <b>first</b> below $2500?",
    "24 years",
    ["12 years","18 years","30 years"],
    "Keep halving: year 18 gives $3000, which is still above $2500; year 24 gives $1500, the first value below $2500. Counting halvings beats trying to solve with technology here: 24000, 12000, 6000, 3000, 1500.",{});},
  function(){return mcq("A yeast culture's mass is measured hourly: "+tblHTML([0,1,2],[5,20,80],"Time (h)","Mass (g)")+" Which statement best models the data and gives the mass at 4 hours?",
    "Exponential model M(t) = 5(4)^t; mass at 4 h is 1280 g",
    ["Exponential model M(t) = 5(4)^t; mass at 4 h is 320 g","Exponential model M(t) = 20(4)^t; mass at 4 h is 5120 g","Linear model M(t) = 5 + 37.5t; mass at 4 h is 155 g"],
    "The ratio is constant: 20 / 5 = 4 and 80 / 20 = 4, so M(t) = 5(4)^t with the initial mass 5 g (not 20 g, the value at t = 1). At t = 4: 5 x 256 = 1280 g.",{});}
]));
E("u4-reverse-half-life",4,["4.9"],3,"gen",function(){
  var R=pick([5,10,15,20,25,40]),kk=pick([2,3,4]),h=pick([3,4,5,6,8,10,12]);
  var A0=R*Math.pow(2,kk),t=h*kk;
  var chain=[],cur=A0;for(var ci=0;ci<=kk;ci++){chain.push(cur);cur/=2;}
  var ctx=pick([{w:"A radioactive isotope",u:"days"},{w:"A medication",u:"hours"},{w:"A sample of a decaying element",u:"years"}]);
  return numq(ctx.w+" starts with "+A0+" mg. After "+t+" "+ctx.u+", only "+R+" mg remains. Assuming the decay follows a half-life model, what is the half-life, in "+ctx.u+"?",
    h,0.001,
    "First count the halvings: "+A0+" to "+R+" is a factor of "+Math.pow(2,kk)+", which is "+kk+" halvings ("+chain.join(" \\(\\to\\) ")+"). Those "+kk+" half-lives took "+t+" "+ctx.u+", so one half-life is \\(\\frac{"+t+"}{"+kk+"} = "+h+"\\) "+ctx.u+". The extra step is counting the halvings before dividing.",
    {R:R,kk:kk,h:h});
});
E("u4-find-base",4,["4.13"],3,"gen",function(){
  var useFrac=Math.random()<0.3;
  var kk,a,b,v,bdisp,ratioDisp;
  if(useFrac){var den=pick([2,3]);b=1/den;kk=2;a=(den===2?pick([8,12,18,24,36,40]):pick([18,36,45,63,90]));v=a*Math.pow(b,kk);
    bdisp="\\frac{1}{"+den+"}";ratioDisp="\\frac{1}{"+Math.pow(den,kk)+"}";}
  else{b=pick([2,3,4,5]);kk=pick([2,3]);a=pick([2,3,4,5,6,10,12]);v=a*Math.pow(b,kk);
    bdisp=""+b;ratioDisp=""+Math.pow(b,kk);}
  return numq("An exponential function \\(f(x) = a(b)^x\\) satisfies \\(f(0) = "+a+"\\) and \\(f("+kk+") = "+fmt(v)+"\\). What is the value of \\(b\\)?",
    b,0.01,
    "From \\(f(0)\\), \\(a = "+a+"\\) (the starting value). Then \\(f("+kk+")\\) gives: \\[ \\begin{aligned} b^{"+kk+"} &= \\frac{"+fmt(v)+"}{"+a+"} = "+ratioDisp+" \\\\ b &= "+bdisp+" \\end{aligned} \\] Recognizing the perfect power (\\("+ratioDisp+" = \\left("+bdisp+"\\right)^{"+kk+"}\\)) is the key step; no logarithm is needed.",
    {kk:kk,a:a,b:b});
});
E("u4-compare-models",4,["4.13"],3,"gen",function(){
  var t=pick([3,4]),a1,a2,b1,b2,V1,V2,tries=0;
  do{a1=pick([40,60,100,150,200,300,500,750]);a2=pick([40,60,100,150,200,300,500,750]);b1=pick([2,3]);b2=pick([2,3]);
    V1=a1*Math.pow(b1,t);V2=a2*Math.pow(b2,t);tries++;}
  while((b1===b2||V1===V2||Math.max(V1,V2)/Math.min(V1,V2)>25)&&tries<60);
  var winner=(V1>V2)?"Town A":"Town B";
  return mcq("Two towns model their populations with \\(P(t) = a(b)^t\\), \\(t\\) in years. Town A starts with "+a1+" people and multiplies by "+b1+" each year. Town B starts with "+a2+" people and multiplies by "+b2+" each year. Which town has the larger population after "+t+" years?",
    winner,
    [(V1>V2?"Town B":"Town A"),"They are equal","It cannot be determined from the information given"],
    "Evaluate both at \\(t = "+t+"\\): Town A: \\("+a1+" \\times "+b1+"^{"+t+"} = "+V1+"\\). Town B: \\("+a2+" \\times "+b2+"^{"+t+"} = "+V2+"\\). Town "+winner.slice(-1)+" is larger: the starting value and the growth factor trade off, so the bigger factor does not automatically win after only "+t+" years; both parts of the model must be evaluated.",
    {t:t,a1:a1,a2:a2,b1:b1,b2:b2});
});

/* ----- bank-u5.js ----- */
// Math 3201 Unit 5 Logarithmic Functions question bank
// CRMARKS: u5-catch-up=3
// CRMARKS: u5-condense-log=2
// CRMARKS: u5-context-model=2
// CRMARKS: u5-convert-form=1
// CRMARKS: u5-data-fit-log=2
// CRMARKS: u5-eq-char=1
// CRMARKS: u5-estimate-log=1
// CRMARKS: u5-evaluate-log=1
// CRMARKS: u5-evaluate-mixed=1
// CRMARKS: u5-expand-log=2
// CRMARKS: u5-graph-char=1
// CRMARKS: u5-growth-time=2
// CRMARKS: u5-interpret-graph=1
// CRMARKS: u5-law-numeric=2
// CRMARKS: u5-match-graph=2
// CRMARKS: u5-ph-scale=2
// CRMARKS: u5-richter-decibel=2
// CRMARKS: u5-simplify-eval=2
// CRMARKS: u5-solve-condense=3
// CRMARKS: u5-solve-log-basic=1
// CRMARKS: u5-solve-with-logs=2
// CRMARKS: u5-two-bases=3
// CRMARKS: u5-which-law=1
/* ================= Unit 5: Logarithmic Functions ================= */
/* Bank-local helpers for Units 5 to 9. lgS builds a log string with the
   argument as given; dis3 / dis3s build three distractors guaranteed distinct
   from the correct answer and from each other (numeric and string forms). */
function lgS(b,arg){return "\\log_{"+b+"} "+arg;}
function dis3(correct,cands){
  var out=[],seen={},c=String(correct);seen[c]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var s=String(cands[i]);if(!seen[s]){seen[s]=1;out.push(s);}}
  var offs=[2,-2,3,-3,4,-4,5,-5,6,-6,8,-8,10,-10,15,-15,20,-20],oi=0;
  while(out.length<3&&oi<offs.length){var s2=String(Number(correct)+offs[oi]);oi++;if(!seen[s2]){seen[s2]=1;out.push(s2);}}
  return out;
}
function dis3s(correct,cands,fallbacks){
  var out=[],seen={},c=String(correct);seen[c]=1;
  var all=cands.concat(fallbacks||[]);
  for(var i=0;i<all.length&&out.length<3;i++){var s=String(all[i]);if(!seen[s]){seen[s]=1;out.push(s);}}
  return out;
}

/* --- converting and evaluating (1.1, 1.2) --- */
E("u5-convert-form",5,["1.1"],1,"gen",function(){
  var pairs=[[2,3],[2,5],[3,2],[3,4],[3,5],[4,3],[4,5],[5,2],[5,3],[5,4],[6,2],[6,3],[6,4],[7,2],[7,3],[7,4],[8,2],[8,3],[8,4],[9,2],[9,3],[9,4],[10,2],[10,3],[10,4],[10,5],[12,2],[12,3]];
  var pr=pick(pairs),b=pr[0],e=pr[1],v=Math.pow(b,e),toExp=Math.random()<0.5;
  var lg=lgS(b,""+v)+" = "+e, ex=b+"^{"+e+"} = "+v;
  if(toExp){
    return mcq("Which exponential equation is equivalent to \\("+lg+"\\)?",
      MV(ex),
      [MV(e+"^{"+b+"} = "+v),MV(b+"^{"+v+"} = "+e),MV(v+"^{"+b+"} = "+e)],
      "In \\("+lg+"\\), the base is \\("+b+"\\), the logarithm itself is the exponent, and the argument \\("+v+"\\) is the result of the power: \\("+ex+"\\). The distractors move the exponent onto the wrong base or swap the exponent with the result.",
      {b:b,e:e,toExp:1});
  }
  return mcq("Which logarithmic equation is equivalent to \\("+ex+"\\)?",
    MV(lg),
    [MV(lgS(b,""+e)+" = "+v),MV(lgS(v,""+b)+" = "+e),MV(lgS(e,""+v)+" = "+b)],
    "The base of the power stays the base of the logarithm, the exponent \\("+e+"\\) becomes the value of the logarithm, and the result \\("+v+"\\) becomes the argument: \\("+lg+"\\). The distractors swap the argument with the exponent, or use the wrong base.",
    {b:b,e:e,toExp:0});
});
E("u5-solve-log-basic",5,["1.1"],1,"gen",function(){
  var shape=ri(1,3);
  if(shape===1){
    var b=pick([2,3,4,5,6,7,8,9]),e=pick([-1,2,2,3]),ans=e<0?1/b:Math.pow(b,e);
    return numq("Solve for \\(x\\): \\("+lgS(b,"x")+" = "+e+"\\)",
      ans,0.01,
      "Rewrite in exponential form: \\(x = "+b+"^{"+e+"}\\). "+(e<0?"A negative exponent gives the reciprocal, so \\(x = \\frac{1}{"+b+"}\\).":"So \\(x = "+ans+"\\)."),
      {shape:shape,b:b,e:e});
  }
  if(shape===2){
    var b2=pick([2,3,4,5,6,7,8,9]),e2=pick([2,3]),s=ri(1,9),ans2=Math.pow(b2,e2)+s;
    return numq("Solve for \\(x\\): \\("+lgS(b2,linS(1,-s))+" = "+e2+"\\)",
      ans2,0.01,
      "Rewrite in exponential form, then undo the shift: \\[ \\begin{aligned} "+linS(1,-s)+" &= "+b2+"^{"+e2+"} \\\\ x &= "+Math.pow(b2,e2)+" + "+s+" \\\\ &= "+ans2+" \\end{aligned} \\] The conversion comes first; the shift is undone afterwards.",
      {shape:shape,b:b2,e:e2,s:s});
  }
  var m=pick([2,3,4,5,6,7,8,9]),e3=pick([2,3]),a=Math.pow(m,e3);
  return numq("Solve for \\(x\\): \\("+lgS("x",""+a)+" = "+e3+"\\)",
    m,0.01,
    "Rewrite in exponential form: \\(x^{"+e3+"} = "+a+"\\). Taking the "+(e3===2?"square":"cube")+" root gives \\(x = "+m+"\\) (the base of a logarithm must be positive, so the negative root is not allowed).",
    {shape:shape,m:m,e:e3});
});
E("u5-evaluate-log",5,["1.2"],1,"gen",function(){
  var shape=pick(["int","int","int","neg","half","threehalf","neghalf","zero"]);
  var b,arg,ans;
  if(shape==="int"){b=pick([2,3,4,5,6,7,8,9,10]);var k=pick([2,3]);ans=k;arg=""+Math.pow(b,k);}
  else if(shape==="neg"){b=pick([2,3,4,5,6,7,8,9,10]);var k2=pick([1,2,3]);ans=-k2;arg=FR("1",""+Math.pow(b,k2));}
  else if(shape==="half"){b=pick([4,9,16,25,36]);ans=0.5;arg="\\sqrt{"+b+"}";}
  else if(shape==="threehalf"){b=pick([4,9,16,25]);ans=1.5;arg=""+Math.pow(Math.sqrt(b),3);}
  else if(shape==="neghalf"){b=pick([4,9,16,25,36]);ans=-0.5;arg=FR("1","\\sqrt{"+b+"}");}
  else{b=pick([2,3,4,5,6,7,8,9,10]);ans=0;arg="1";}
  return numq("Without technology, determine the value of \\("+lgS(b,arg)+"\\)",
    ans,0.01,
    "Ask what power of \\("+b+"\\) gives the argument: \\("+b+"^{"+fmt(ans)+"}\\) equals the argument"+(shape==="zero"?", since any base to the power 0 is 1":"")+", so \\("+lgS(b,arg)+" = "+fmt(ans)+"\\) by the definition of a logarithm.",
    {shape:shape,b:b});
});
E("u5-evaluate-mixed",5,["1.2"],1,"gen",function(){
  var shape=pick(["power","logpower","one","recip","root"]);
  var b=pick([2,3,4,5,6,7,8,9]),m=pick([2,3,4,5,6,7,8,9,10,11,12]),t=0;
  while(m===b&&t<40){m=pick([2,3,4,5,6,7,8,9,10,11,12]);t++;}
  if(shape==="power"){
    return mcq("What is the value of \\("+b+"^{"+lgS(b,""+m)+"}\\)?",
      ""+m,dis3(m,[b,m+b,m*b]),
      "A base raised to its own logarithm returns the argument: \\("+b+"^{"+lgS(b,""+m)+"} = "+m+"\\). The power and the logarithm undo each other exactly.",
      {shape:shape,b:b,m:m});
  }
  if(shape==="logpower"){
    return mcq("What is the value of \\("+lgS(b,b+"^{"+m+"}")+"\\)?",
      ""+m,dis3(m,[b,m+b,0]),
      "The logarithm asks for the exponent on \\("+b+"\\), and the exponent is sitting in the argument: \\("+lgS(b,b+"^{"+m+"}")+" = "+m+"\\).",
      {shape:shape,b:b,m:m});
  }
  if(shape==="one"){
    return mcq("What is the value of \\("+lgS(b,"1")+"\\)?",
      "0",dis3(0,[1,b,-1]),
      "Every base to the power 0 equals 1, so the exponent that produces 1 is 0: \\("+lgS(b,"1")+" = 0\\) for any base.",
      {shape:shape,b:b});
  }
  if(shape==="recip"){
    return mcq("What is the value of \\("+lgS(b,FR("1",b+"^{"+m+"}"))+"\\)?",
      ""+(-m),dis3(-m,[m,0,-b]),
      "The argument is \\("+b+"^{-"+m+"}\\), a reciprocal power, so the exponent on \\("+b+"\\) is negative: \\("+lgS(b,FR("1",b+"^{"+m+"}"))+" = -"+m+"\\).",
      {shape:shape,b:b,m:m});
  }
function normOpts(key,ds){
  function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
  function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
  var all=[key].concat(ds),guard=0;
  while(guard++<12){
    var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
    var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
    var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
    if(!sing.length)break;
    var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
    for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
    if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
    if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
    else{all[cand]=pad(all[cand],s);}
  }
  return [all[0],all.slice(1)];
}
  var nopts=normOpts("0.5",dis3(0.5,[2,1,b]));
  return mcq("What is the value of \\("+lgS(b,"\\sqrt{"+b+"}")+"\\)?",
    nopts[0],nopts[1],
    "A square root is the power \\(\\frac{1}{2}\\): \\(\\sqrt{"+b+"} = "+b+"^{1/2}\\), so the exponent, and therefore the logarithm, is \\(\\frac{1}{2}\\).",
    {shape:shape,b:b});
});
E("u5-which-law",5,["1.3"],1,"var",varset([
  function(){return mcq("A student checks a law of logarithms with numbers and writes \\("+lgS(2,"32")+" = "+lgS(2,"8")+" + "+lgS(2,"4")+"\\). Which law does this illustrate?",
    "The product law: \\(\\log_b(mn) = \\log_b m + \\log_b n\\)",
    ["The quotient law: \\(\\log_b\\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n\\)","The power law: \\(\\log_b(m^n) = n \\log_b m\\)","The sum law: \\(\\log_b(m + n) = \\log_b m + \\log_b n\\)"],
    "Check the numbers: \\(8 \\times 4 = 32\\), and \\(5 = 3 + 2\\). A product inside the logarithm became a sum of logarithms, which is the product law, coming from \\(2^3 \\times 2^2 = 2^5\\). There is no sum law: the last option is the classic false version.",{});},
  function(){return mcq("A student checks a law of logarithms with numbers and writes \\("+lgS(3,"27")+" - "+lgS(3,"9")+" = "+lgS(3,"3")+"\\). Which law does this illustrate?",
    "The quotient law: \\(\\log_b\\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n\\)",
    ["The product law: \\(\\log_b(mn) = \\log_b m + \\log_b n\\)","The power law: \\(\\log_b(m^n) = n \\log_b m\\)","The difference law: \\(\\log_b(m - n) = \\log_b m - \\log_b n\\)"],
    "Check the numbers: \\(27 \\div 9 = 3\\), and \\(3 - 2 = 1\\). A quotient inside the logarithm became a difference of logarithms, the quotient law, coming from \\(3^3 \\div 3^2 = 3^1\\). The last option is false: a difference inside a logarithm does not split.",{});},
  function(){return mcq("A student checks a law of logarithms with numbers and writes \\(2"+lgS(10,"5")+" = "+lgS(10,"25")+"\\). Which law does this illustrate?",
    "The power law: \\(\\log_b(m^n) = n \\log_b m\\)",
    ["The product law: \\(\\log_b(mn) = \\log_b m + \\log_b n\\)","The quotient law: \\(\\log_b\\left(\\frac{m}{n}\\right) = \\log_b m - \\log_b n\\)","The coefficient law: \\(\\log_b(m^n) = (\\log_b m)^n\\)"],
    "Check the numbers: \\(5^2 = 25\\), so \\(\\log_{10} 25 = 2 \\times \\log_{10} 5\\). An exponent inside the logarithm moved out front as a multiplier, which is the power law. The last option raises the whole logarithm to a power, which is a different and false statement.",{});}
]));

/* --- laws of logarithms (1.3, 1.4) --- */
E("u5-law-numeric",5,["1.3"],1,"gen",function(){
  var LV={2:0.3010,3:0.4771,5:0.6990,7:0.8451},LVS={2:"0.3010",3:"0.4771",5:"0.6990",7:"0.8451"};
  var pr=pick([[2,3],[2,5],[2,7],[3,5],[3,7],[5,7]]),p=pr[0],q=pr[1],lp=LV[p],lq=LV[q],lps=LVS[p],lqs=LVS[q];
  var forms=[
    {disp:""+(p*q),expr:"\\log_{10} "+p+" + \\log_{10} "+q,nexp:lps+" + "+lqs,val:lp+lq},
    {disp:FR(""+p,""+q),expr:"\\log_{10} "+p+" - \\log_{10} "+q,nexp:lps+" - "+lqs,val:lp-lq},
    {disp:FR(""+q,""+p),expr:"\\log_{10} "+q+" - \\log_{10} "+p,nexp:lqs+" - "+lps,val:lq-lp},
    {disp:""+(p*p),expr:"2\\log_{10} "+p,nexp:"2("+lps+")",val:2*lp},
    {disp:""+(q*q),expr:"2\\log_{10} "+q,nexp:"2("+lqs+")",val:2*lq},
    {disp:""+(p*p*q),expr:"2\\log_{10} "+p+" + \\log_{10} "+q,nexp:"2("+lps+") + "+lqs,val:2*lp+lq},
    {disp:""+(p*q*q),expr:"\\log_{10} "+p+" + 2\\log_{10} "+q,nexp:lps+" + 2("+lqs+")",val:lp+2*lq},
    {disp:FR(""+(p*p),""+q),expr:"2\\log_{10} "+p+" - \\log_{10} "+q,nexp:"2("+lps+") - "+lqs,val:2*lp-lq},
    {disp:FR(""+(q*q),""+p),expr:"2\\log_{10} "+q+" - \\log_{10} "+p,nexp:"2("+lqs+") - "+lps,val:2*lq-lp},
    {disp:""+(p*p*q*q),expr:"2\\log_{10} "+p+" + 2\\log_{10} "+q,nexp:"2("+lps+") + 2("+lqs+")",val:2*lp+2*lq}
  ];
  var f=pick(forms);
  return numq("Given \\(\\log_{10} "+p+" \\approx "+lps+"\\) and \\(\\log_{10} "+q+" \\approx "+lqs+"\\), determine the approximate value of \\(\\log_{10} "+f.disp+"\\)",
    f.val,0.002,
    "Split the argument into the two given values using the laws of logarithms: \\[ \\begin{aligned} \\log_{10} "+f.disp+" &= "+f.expr+" \\\\ &= "+f.nexp+" \\\\ &= "+fmt(f.val,4)+" \\end{aligned} \\] Products become sums, quotients become differences, and powers become multipliers.",
    {p:p,q:q});
});
E("u5-expand-log",5,["1.4"],2,"gen",function(){
  var b=pick([2,3,5,10]),shape=pick(["prod","quot","three","root"]);
  var m=ri(2,5),n=ri(2,5),t=0;while(n===m&&t<40){n=ri(2,5);t++;}
  var p=ri(2,5);
  var T=function(coef,v){return (coef==="1"?"":coef+" ")+"\\log_{"+b+"} "+v;};
  var parts,arg;
  if(shape==="prod"){parts=[{c:""+m,v:"x",s:"+"},{c:""+n,v:"y",s:"+"}];arg="x^{"+m+"} y^{"+n+"}";}
  else if(shape==="quot"){parts=[{c:""+m,v:"x",s:"+"},{c:""+n,v:"y",s:"-"}];arg=FR("x^{"+m+"}","y^{"+n+"}");}
  else if(shape==="three"){parts=[{c:""+m,v:"x",s:"+"},{c:""+n,v:"y",s:"+"},{c:""+p,v:"z",s:"-"}];arg=FR("x^{"+m+"} y^{"+n+"}","z^{"+p+"}");}
  else{parts=[{c:""+n,v:"y",s:"+"},{c:"\\frac{1}{2}",v:"x",s:"+"}];arg="y^{"+n+"} \\sqrt{x}";}
  var join=function(ps,flipLast,dropC,swapC){
    var cs=ps.map(function(o){return o.c;});
    if(swapC&&cs.length>1){var tmp=cs[0];cs[0]=cs[1];cs[1]=tmp;}
    return ps.map(function(o,i){
      var s=o.s;if(flipLast&&i===ps.length-1)s=(s==="-"?"+":"-");
      var sgn=i===0?"":(s==="-"?" - ":" + ");
      return sgn+T(dropC?"1":cs[i],o.v);
    }).join("");
  };
  var corr=join(parts,false,false,false);
  return mcq("Which expression is equivalent to \\("+lgS(b,arg)+"\\)?",
    MV(corr),
    [MV(join(parts,true,false,false)),MV(join(parts,false,true,false)),MV(join(parts,false,false,true))],
    "The product law turns multiplication into addition, the quotient law turns division into subtraction, and the power law brings each exponent out front as a coefficient: the expansion is <b>\\("+corr+"\\)</b>. The distractors flip the sign of the last term, drop the coefficients, or attach the coefficients to the wrong variables.",
    {b:b,shape:shape});
});
E("u5-condense-log",5,["1.4"],2,"gen",function(){
  var b=pick([2,3,5,10]),shape=pick(["prod","quot","three","root"]);
  var m=ri(2,5),n=ri(2,5),t=0;while(n===m&&t<40){n=ri(2,5);t++;}
  var p=ri(2,5);
  var expanded,num,den,argAll,argDrop;
  if(shape==="prod"){
    expanded=m+"\\log_{"+b+"} x + "+n+"\\log_{"+b+"} y";
    num="x^{"+m+"} y^{"+n+"}";den=null;argDrop="x y";
    argAll=null;
  } else if(shape==="quot"){
    expanded=m+"\\log_{"+b+"} x - "+n+"\\log_{"+b+"} y";
    num="x^{"+m+"}";den="y^{"+n+"}";argDrop=FR("x","y");
  } else if(shape==="three"){
    expanded=m+"\\log_{"+b+"} x + "+n+"\\log_{"+b+"} y - "+p+"\\log_{"+b+"} z";
    num="x^{"+m+"} y^{"+n+"}";den="z^{"+p+"}";argDrop=FR("x y","z");
  } else {
    expanded=n+"\\log_{"+b+"} y + \\frac{1}{2}\\log_{"+b+"} x";
    num="y^{"+n+"} \\sqrt{x}";den=null;argDrop="x y";
  }
  var corrArg=den?FR(num,den):num;
  var d1,d2,d3;
  if(shape==="prod"){d1=MV(lgS(b,FR("x^{"+m+"}","y^{"+n+"}")));d2=MV(lgS(b,argDrop));d3=MV(lgS(b,"\\left(x y\\right)^{"+(m+n)+"}"));}
  else if(shape==="root"){d1=MV(lgS(b,FR("y^{"+n+"}","\\sqrt{x}")));d2=MV(lgS(b,argDrop));d3=MV("\\frac{1}{2} "+lgS(b,"x y^{"+n+"}"));}
  else{d1=MV(lgS(b,num+" "+(den||"")));d2=MV(lgS(b,den?FR(den,num):num));d3=MV(lgS(b,argDrop));}
  return mcq("Which single logarithm is equivalent to \\("+expanded+"\\)?",
    MV(lgS(b,corrArg)),
    [d1,d2,d3],
    "Run the laws in reverse: each coefficient becomes an exponent (the power law), addition combines into a product (the product law), and subtraction combines into a quotient (the quotient law): the result is <b>\\("+lgS(b,corrArg)+"\\)</b>. The distractors put a subtracted term in the numerator, turn the quotient upside down, or drop the exponents.",
    {b:b,shape:shape});
});
E("u5-simplify-eval",5,["1.4"],2,"gen",function(){
  var shape=pick(["sum","sum","diff","diff","power"]);
  if(shape==="sum"){
    var b=pick([2,3,5,10]),r=pick([2,3,4]),P=Math.pow(b,r),divs=[];
    for(var d=2;d<P;d++){if(P%d===0)divs.push([d,P/d]);}
    var pr=pick(divs),A=pr[0],B=pr[1];
    return numq("Determine the exact value of \\("+lgS(b,""+A)+" + "+lgS(b,""+B)+"\\)",
      r,0.001,
      "Combine with the product law, then read off the exponent: \\[ \\begin{aligned} "+lgS(b,""+A)+" + "+lgS(b,""+B)+" &= \\log_{"+b+"} "+P+" \\\\ &= "+r+" \\end{aligned} \\] because \\("+b+"^{"+r+"} = "+P+"\\).",
      {shape:shape,b:b,A:A,B:B});
  }
  if(shape==="diff"){
    var b2=pick([2,3,5,10]),sgn=Math.random()<0.5?1:-1,r2=pick([1,2]),base=pick([2,3,4,5,6,8,10,12]);
    var A2,B2;if(sgn>0){B2=base;A2=base*Math.pow(b2,r2);}else{A2=base;B2=base*Math.pow(b2,r2);}
    return numq("Determine the exact value of \\("+lgS(b2,""+A2)+" - "+lgS(b2,""+B2)+"\\)",
      sgn*r2,0.001,
      "Combine with the quotient law, then read off the exponent: \\[ \\begin{aligned} "+lgS(b2,""+A2)+" - "+lgS(b2,""+B2)+" &= \\log_{"+b2+"} "+(sgn>0?(""+Math.pow(b2,r2)):FR("1",""+Math.pow(b2,r2)))+" \\\\ &= "+(sgn*r2)+" \\end{aligned} \\] because the quotient of the arguments is \\("+b2+"^{"+(sgn*r2)+"}\\).",
      {shape:shape,b:b2,A:A2,B:B2});
  }
  var tp=pick([[2,4,3],[2,8,2],[2,4,2],[2,16,2],[3,9,2],[3,27,2],[4,16,2],[5,25,2],[9,27,2],[10,100,2],[2,2,5],[3,3,4]]);
  var bb=tp[0],AA=tp[1],kk=tp[2],rr=Math.round(Math.log(Math.pow(AA,kk))/Math.log(bb));
  return numq("Determine the exact value of \\("+kk+lgS(bb,""+AA)+"\\)",
    rr,0.001,
    "Bring the coefficient inside with the power law, then read off the exponent: \\[ \\begin{aligned} "+kk+lgS(bb,""+AA)+" &= \\log_{"+bb+"} "+Math.pow(AA,kk)+" \\\\ &= "+rr+" \\end{aligned} \\] because \\("+bb+"^{"+rr+"} = "+Math.pow(AA,kk)+"\\).",
    {shape:shape,b:bb,A:AA,k:kk});
});
var U5SC=null;
E("u5-solve-condense",5,["1.4"],3,"gen",function(){
  if(!U5SC){
    U5SC=[];
    [2,3,4,5,6,10].forEach(function(b){
      for(var e=2;Math.pow(b,e)<=10000;e++){
        var P=Math.pow(b,e);
        for(var x0=3;x0<P;x0++){
          if(P%x0===0){var k=P/x0;if(k>=2&&k!==x0)U5SC.push({b:b,e:e,P:P,x0:x0,k:k,s:Math.abs(x0-k),fam:k<x0?"A":"B"});}
        }
      }
    });
  }
  var tr=pick(U5SC),sgn=tr.fam==="A"?-1:1,arg2=linS(1,sgn*tr.s);
  return numq("Solve for \\(x\\): \\("+lgS(tr.b,"x")+" + "+lgS(tr.b,arg2)+" = "+tr.e+"\\)",
    tr.x0,0.001,
    "Condense with the product law, convert to exponential form, and solve the quadratic: \\[ \\begin{aligned} \\log_{"+tr.b+"} \\left[ x\\left("+arg2+"\\right) \\right] &= "+tr.e+" \\\\ x\\left("+arg2+"\\right) &= "+tr.P+" \\\\ \\left(x - "+tr.x0+"\\right)\\left(x + "+tr.k+"\\right) &= 0 \\end{aligned} \\] The roots are \\(x = "+tr.x0+"\\) and \\(x = -"+tr.k+"\\). The negative root is rejected, because "+(tr.fam==="A"?"it would make the argument \\("+arg2+"\\) negative":"it would make the argument \\(x\\) itself negative")+", and a logarithm's argument must be positive. Only \\(x = "+tr.x0+"\\) works.",
    {b:tr.b,e:tr.e,x0:tr.x0});
});

/* --- estimating, data, graphs and models (1.5, 4.2, 4.4, 4.6) --- */
E("u5-estimate-log",5,["1.5"],1,"gen",function(){
  var b=pick([2,2,3,3,10]),n,tv,fl,tries=0;
  do{
    n=b===2?ri(5,150):b===3?ri(4,120):ri(15,90000);
    tv=Math.log(n)/Math.log(b);fl=Math.floor(tv);tries++;
  }while((Math.pow(b,fl)===n||Math.pow(b,fl+1)===n)&&tries<60);
  var corr=fmtF(tv,1);
  var ds=dis3s(corr,[fmtF(tv+0.5,1),fmtF(tv-0.5,1),fmtF(fl,1),fmtF(tv+1,1)],[fmtF(tv-1,1),fmtF(tv+1.5,1)]);
  return mcq("Without technology, which is the <b>best approximation</b> of \\("+lgS(b,""+n)+"\\)?",
    corr,ds,
    "Bracket the argument between consecutive powers of \\("+b+"\\): \\("+b+"^{"+fl+"} = "+Math.pow(b,fl)+"\\) and \\("+b+"^{"+(fl+1)+"} = "+Math.pow(b,fl+1)+"\\), so the logarithm lies between \\("+fl+"\\) and \\("+(fl+1)+"\\) \\((\\log_{"+b+"} "+n+" \\approx "+fmt(tv,2)+")\\). Of the choices, only \\("+corr+"\\) sits in that bracket at the right distance from the ends.",
    {b:b,n:n});
});
E("u5-data-fit-log",5,["4.2"],1,"gen",function(){
  var mode=pick(["ten","two","five"]),base=mode==="ten"?10:mode==="two"?2:5;
  var xs=mode==="ten"?[1,10,100,1000]:mode==="two"?[1,2,4,8,16]:[1,5,25,125];
  var c=ri(1,9),d=mode==="ten"?pick([2,3,4,5]):mode==="two"?pick([2,3]):pick([2,3,4]),t=0;
  while(d===c&&t<40){c=ri(1,9);t++;}
  var ys=xs.map(function(x,i){return c+d*i;});
  var lt="\\log_{"+base+"} x",tbl=tblHTML(xs,ys,"x","y");
  var corr="y = "+c+" + "+d+lt;
  return mcq("Data that follows a logarithmic model is shown in the table: "+tbl+" Which function best models the data?",
    MV(corr),
    [MV("y = "+d+" + "+c+lt),MV("y = "+c+"("+d+")^x"),MV("y = "+c+" + "+lt)],
    "Each time \\(x\\) is multiplied by \\("+base+"\\), \\(y\\) increases by exactly \\("+d+"\\): a constant increase per multiplication is the signature of a logarithmic model (an exponential model would multiply \\(y\\) instead). At \\(x = 1\\) the logarithm is 0, so the constant term is \\("+c+"\\), and the per-step increase is the coefficient of the logarithm: \\("+corr+"\\).",
    {mode:mode,c:c,d:d});
});
E("u5-interpret-graph",5,["4.4"],1,"gen",function(){
  var bg=pick([{b:2,x1:16,gx:2},{b:3,x1:27,gx:3},{b:10,x1:120,gx:10}]),b=bg.b,k=pick([-1,0,1,2]);
  var fn=function(x){return Math.log(x)/Math.log(b)+k;};
  var feats=["valueAt","factor","domain"];if(k>=-1&&k<=1)feats.push("xint");
  var feat=pick(feats),q;
  var fig=function(pts){return plotSVG(fn,0.02,bg.x1,-4,6,{gx:bg.gx,gy:1,labelX:true,labelY:true,points:pts||[]});};
  if(feat==="valueAt"){
    var m=pick(b===10?[1,2]:[1,2,3]),xv=Math.pow(b,m),yv=m+k;
    q=mcq("A quantity \\(y\\) is modelled against an input \\(x\\) by the logarithmic function graphed below, with a point marked on the curve. What is the value of \\(y\\) when \\(x = "+xv+"\\)?",
      ""+yv,dis3(yv,[m,k,yv+1]),
      "The marked point sits over \\(x = "+xv+"\\). Since \\("+xv+" = "+b+"^{"+m+"}\\), the logarithm contributes \\("+m+"\\) and the vertical shift contributes \\("+k+"\\), so \\(y = "+m+" + "+(k<0?"("+k+")":k)+" = "+yv+"\\). Reading the height of the marked point off the grid confirms it.",
      {feat:feat,b:b,k:k,m:m});
    q.figure=fig([[xv,yv]]);
    return q;
  }
  if(feat==="factor"){
    q=mcq("A quantity \\(y\\) is modelled against an input \\(x\\) by the logarithmic function graphed below. When the input \\(x\\) is multiplied by \\("+b+"\\), what happens to \\(y\\)?",
      "It increases by exactly 1",
      ["It increases by "+b+" too","It is multiplied by "+b+" as well","It stays the same throughout"],
      "Multiplying the argument of a logarithm by its base raises the logarithm by exactly 1: \\(\\log_{"+b+"}("+b+"x) = \\log_{"+b+"} x + 1\\). Read it off the graph: equal multiplications of \\(x\\) always produce the same increase of 1 in \\(y\\), which is the defining behaviour of this model.",
      {feat:feat,b:b,k:k});
    q.figure=fig([]);
    return q;
  }
  if(feat==="domain"){
    q=mcq("A quantity \\(y\\) is modelled against an input \\(x\\) by the logarithmic function graphed below. Which statement describes the possible inputs for this model?",
      MV("x > 0"),
      [MV("x \\ge 0"),"All real numbers",MV("x > 1")],
      "The curve has a vertical asymptote at \\(x = 0\\) and exists only to the right of it, because a logarithm is defined only for positive arguments: the inputs satisfy \\(x > 0\\). The outputs, by contrast, run over all real numbers.",
      {feat:feat,b:b,k:k});
    q.figure=fig([]);
    return q;
  }
  var corr=k===0?"1":k===1?FR("1",""+b):""+b;
  var dsx=k===0?["0",""+b,FR("1",""+b)]:k===1?[""+b,"1",FR("1",""+(b*b))]:["1",FR("1",""+b),""+(b*b)];
  q=mcq("A quantity \\(y\\) is modelled against an input \\(x\\) by the logarithmic function graphed below. At what value of \\(x\\) does the graph cross the x-axis?",
    MV(corr),dsx.map(function(s){return MV(s);}),
    "The crossing has \\(y = 0\\), so the logarithm part must equal \\("+(0-k)+"\\): \\(\\log_{"+b+"} x = "+(0-k)+"\\), giving \\(x = "+b+"^{"+(0-k)+"} = "+corr+"\\). The shift moves the crossing away from the unshifted position \\(x = 1\\).",
    {feat:feat,b:b,k:k});
  q.figure=fig([]);
  return q;
});
E("u5-context-model",5,["4.6"],1,"var",varset([
  function(){return mcq("The sound level of a noise, in decibels, is modelled by \\(L = 10\\log_{10}\\left(\\frac{I}{I_0}\\right)\\), where \\(I\\) is the intensity of the sound and \\(I_0\\) is a reference intensity. A factory machine produces a sound with intensity \\(I = 10^{7} I_0\\). What is its sound level?",
    "70 dB",
    ["7 dB","17 dB","700 dB"],
    "Substitute: the ratio \\(\\frac{I}{I_0} = 10^{7}\\), and \\(\\log_{10} 10^{7} = 7\\), so \\(L = 10 \\times 7 = 70\\) dB. The 7 dB option stops after the logarithm and forgets the factor of 10 in the model.",{});},
  function(){return mcq("In a training program, the number of tasks a worker completes per hour after \\(t\\) practice sessions is modelled by \\(N = 25 + 5\\log_{2} t\\). How many tasks per hour does the model give after 32 sessions?",
    "50",
    ["30","185","45"],
    "Substitute \\(t = 32\\): \\(\\log_{2} 32 = 5\\), because \\(2^5 = 32\\). Then \\(N = 25 + 5 \\times 5 = 50\\). The 185 option multiplies 5 by 32 without taking the logarithm; the 45 option uses \\(\\log_{2} 32 = 4\\).",{});},
  function(){return mcq("A memory experiment models the percent of a word list a student recalls \\(t\\) days later as \\(R = 100 - 20\\log_{10} t\\). What percent does the model give after 100 days?",
    "60%",
    ["80%","96%","20%"],
    "Substitute \\(t = 100\\): \\(\\log_{10} 100 = 2\\), so \\(R = 100 - 20 \\times 2 = 60\\)%. The 80% option treats the logarithm as 1; the model subtracts 20 for every factor of 10 in the time, and 100 days is two factors of 10 past day 1.",{});}
]));
/* --- solving with logarithms (4.8) and applications (4.9) --- */
E("u5-solve-with-logs",5,["4.8"],2,"gen",function(){
  var shape=pick(["plain","plain","isolate","double","half"]);
  var b=pick([2,3,5,6,7,10]),c,tries=0;
  do{c=ri(15,400);tries++;}while((Math.pow(b,Math.round(Math.log(c)/Math.log(b)))===c||c===b)&&tries<60);
  if(shape==="plain"){
    return mcq("What is the solution of \\("+b+"^{x} = "+c+"\\)?",
      MV("x = "+FR("\\log "+c,"\\log "+b)),
      [MV("x = "+FR("\\log "+b,"\\log "+c)),MV("x = \\log "+FR(""+c,""+b)),MV("x = "+FR("\\log "+c,""+b))],
      "The bases cannot be matched, so take the logarithm of both sides and bring the exponent down with the power law: \\[ \\begin{aligned} "+b+"^{x} &= "+c+" \\\\ x \\log "+b+" &= \\log "+c+" \\\\ x &= "+FR("\\log "+c,"\\log "+b)+" \\end{aligned} \\] Any logarithm base works here, by the change-of-base formula. Dividing inside the logarithm, or forgetting to log the base, are the planted errors.",
      {shape:shape,b:b,c:c});
  }
  if(shape==="isolate"){
    var a=pick([2,3,4,5,6,7,8,9]),m=ri(12,90);tries=0;
    while(Math.pow(b,Math.round(Math.log(m)/Math.log(b)))===m&&tries<60){m=ri(12,90);tries++;}
    var cc=a*m;
    return mcq("What is the solution of \\("+a+" \\times "+b+"^{x} = "+cc+"\\)?",
      MV("x = "+FR("\\log "+m,"\\log "+b)),
      [MV("x = "+FR("\\log "+cc,"\\log "+b)),MV("x = "+FR("\\log "+b,"\\log "+m)),MV("x = "+FR("\\log "+(cc-a),"\\log "+b))],
      "Isolate the power first, then take logarithms of both sides: \\[ \\begin{aligned} "+a+" \\times "+b+"^{x} &= "+cc+" \\\\ "+b+"^{x} &= "+m+" \\\\ x \\log "+b+" &= \\log "+m+" \\\\ x &= "+FR("\\log "+m,"\\log "+b)+" \\end{aligned} \\] The coefficient is divided away, never subtracted, and skipping the isolation is the first distractor's error.",
      {shape:shape,b:b,a:a,m:m});
  }
  if(shape==="double"){
    return mcq("What is the solution of \\("+b+"^{2x} = "+c+"\\)?",
      MV("x = "+FR("\\log "+c,"2\\log "+b)),
      [MV("x = "+FR("\\log "+c,"\\log "+b)),MV("x = "+FR("2\\log "+c,"\\log "+b)),MV("x = "+FR("\\log "+b,"\\log "+c))],
      "Take logarithms of both sides; the power law brings the whole exponent \\(2x\\) down: \\[ \\begin{aligned} "+b+"^{2x} &= "+c+" \\\\ 2x \\log "+b+" &= \\log "+c+" \\\\ x &= "+FR("\\log "+c,"2\\log "+b)+" \\end{aligned} \\] The factor of 2 stays with the logarithm of the base; dropping it is the first distractor's error.",
      {shape:shape,b:b,c:c});
  }
  return mcq("What is the solution of \\("+b+"^{\\frac{x}{2}} = "+c+"\\)?",
    MV("x = "+FR("2\\log "+c,"\\log "+b)),
    [MV("x = "+FR("\\log "+c,"\\log "+b)),MV("x = "+FR("\\log "+c,"2\\log "+b)),MV("x = "+FR("\\log "+b,"\\log "+c))],
    "Take logarithms of both sides; the exponent here is \\(\\frac{x}{2}\\): \\[ \\begin{aligned} "+b+"^{\\frac{x}{2}} &= "+c+" \\\\ \\frac{x}{2} \\log "+b+" &= \\log "+c+" \\\\ x &= "+FR("2\\log "+c,"\\log "+b)+" \\end{aligned} \\] Solving for \\(x\\) doubles the logarithm ratio; halving it instead is the second distractor's error.",
    {shape:shape,b:b,c:c});
});
E("u5-two-bases",5,["4.8"],3,"gen",function(){
  var shape=Math.random()<0.45?"twoexp":"coeff";
  if(shape==="twoexp"){
    var pr=pick([[3,2],[5,2],[5,3],[4,2],[10,2],[10,3]]),b1=pr[0],b2=pr[1],s=pick([1,2]);
    var num=(s===1?"\\log "+b2:s+"\\log "+b2),den="\\log "+b1+" - \\log "+b2;
    return mcq("What is the solution of \\("+b1+"^{x} = "+b2+"^{x + "+s+"}\\)?",
      MV("x = "+FR(num,den)),
      [MV("x = "+FR(num,"\\log "+b1+" + \\log "+b2)),MV("x = "+FR((s===1?"\\log "+b1:s+"\\log "+b1),den)),MV("x = "+FR(den,num))],
      "Take logarithms of both sides, expand, and collect the terms containing \\(x\\): \\[ \\begin{aligned} x \\log "+b1+" &= x \\log "+b2+" + "+num+" \\\\ x\\left("+den+"\\right) &= "+num+" \\\\ x &= "+FR(num,den)+" \\end{aligned} \\] The unknown sits in both exponents, so no common-base rewrite exists; the collection step is what makes the problem. Adding the logarithms in the denominator, or collecting on the wrong base, are the planted errors.",
      {shape:shape,b1:b1,b2:b2,s:s});
  }
  var pr2=pick([[3,2],[5,2],[5,3],[4,3],[10,5],[10,2]]),bb=pr2[0],dd=pr2[1];
  var a=pick([2,3,4,5,6,7,8,9]),m=pick([3,4,5,6,7,8,9,10,12,14,15]),cc=a*m,den2="\\log "+bb+" - \\log "+dd;
  return mcq("What is the solution of \\("+a+" \\times "+bb+"^{x} = "+cc+" \\times "+dd+"^{x}\\)?",
    MV("x = "+FR("\\log "+m,den2)),
    [MV("x = "+FR("\\log "+m,"\\log "+bb+" + \\log "+dd)),MV("x = "+FR("\\log "+cc,den2)),MV("x = "+FR(den2,"\\log "+m))],
    "Take logarithms of both sides and collect the terms containing \\(x\\); the constants combine into \\(\\log "+m+"\\) because \\(\\frac{"+cc+"}{"+a+"} = "+m+"\\): \\[ \\begin{aligned} x \\log "+bb+" - x \\log "+dd+" &= \\log "+m+" \\\\ x\\left("+den2+"\\right) &= \\log "+m+" \\\\ x &= "+FR("\\log "+m,den2)+" \\end{aligned} \\] Two different bases with the unknown in both exponents is exactly the situation logarithms are needed for.",
    {shape:shape,b:bb,d:dd,a:a,m:m});
});

E("u5-growth-time",5,["4.9"],2,"gen",function(){
  if(Math.random()<0.5){
    var r=pick([2,3,4]),rw={2:"doubles",3:"triples",4:"quadruples"}[r],m=pick([3,4,5,6]);
    var A=pick([120,150,200,240,300,320,400,480,500,600,750,900]),T=A*Math.pow(r,m),k=pick([2,3,4,5,6]);
    var ctx=pick([
      {q:"A bacteria culture starts with "+A+" cells and "+rw+" every "+k+" hours. After how many hours will the culture contain "+T+" cells?",u:"hours"},
      {q:"A pond's trout population starts at "+A+" fish and "+rw+" every "+k+" years. After how many years will the population reach "+T+" fish?",u:"years"},
      {q:"An algae mat covers "+A+" square centimetres, and the covered area "+rw+" every "+k+" days. After how many days will it cover "+T+" square centimetres?",u:"days"}
    ]);
    return numq(ctx.q,
      m*k,0.01,
      "Model the amount as \\(P(t) = "+A+" \\times "+r+"^{t/"+k+"}\\) and set it equal to "+T+": \\[ \\begin{aligned} "+A+" \\times "+r+"^{t/"+k+"} &= "+T+" \\\\ "+r+"^{t/"+k+"} &= "+Math.pow(r,m)+" \\\\ \\frac{t}{"+k+"} &= "+m+" \\\\ t &= "+(m*k)+" \\end{aligned} \\] The third step is the logarithm step: with equal bases, the exponents must be equal.",
      {r:r,m:m,k:k});
  }
  var m2=pick([3,4,5,6]),A2=pick([64,128,192,256,320,384,448,512,640,768,896,960]),T2=A2/Math.pow(2,m2),k2=pick([3,4,5,6,8,10]);
  var ctx2=pick([
    {q:"A sample of a radioactive isotope starts with "+A2+" g and has a half-life of "+k2+" days. After how many days will only "+T2+" g remain?"},
    {q:"A patient is given "+A2+" mg of a medication. The amount in the bloodstream halves every "+k2+" hours. After how many hours will only "+T2+" mg remain?"},
    {q:"A rock sample contains "+A2+" g of a radioactive element with a half-life of "+k2+" years. After how many years will only "+T2+" g remain?"}
  ]);
  return numq(ctx2.q,
    m2*k2,0.01,
    "Model the amount as \\(P(t) = "+A2+" \\times \\left(\\frac{1}{2}\\right)^{t/"+k2+"}\\) and set it equal to "+T2+": \\[ \\begin{aligned} "+A2+" \\times \\left(\\frac{1}{2}\\right)^{t/"+k2+"} &= "+T2+" \\\\ \\left(\\frac{1}{2}\\right)^{t/"+k2+"} &= "+FR("1",""+Math.pow(2,m2))+" \\\\ \\frac{t}{"+k2+"} &= "+m2+" \\\\ t &= "+(m2*k2)+" \\end{aligned} \\] The amount must halve "+m2+" times, and each halving takes one half-life.",
    {m:m2,k:k2});
});
E("u5-catch-up",5,["4.9"],3,"gen",function(){
  var f=pick([2,3]),k=pick([2,3,4]),s=pick([30,40,50,60,100,120,200,250,300,500]),B0=s*Math.pow(f,k);
  var ctx=pick([
    {pre:"Two bacteria colonies grow in identical tanks. Colony A starts with ",o:"Colony B",thing:" cells",us:"hour",up:"hours"},
    {pre:"Two chain messages spread through a school. Message A starts with ",o:"Message B",thing:" students",us:"day",up:"days"},
    {pre:"Two algae mats grow in a pond. Mat A starts with ",o:"Mat B",thing:" square centimetres",us:"day",up:"days"}
  ]);
  var other=ctx.o;
  return numq(ctx.pre+s+ctx.thing+" and multiplies by "+(f*f)+" every "+ctx.us+". "+other+" starts with "+B0+ctx.thing+" and multiplies by "+f+" every "+ctx.us+". After how many "+ctx.up+" are the two amounts equal?",
    k,0.001,
    "Set the two models equal, then rewrite both with the common base \\("+f+"\\) (taking \\(\\log_{"+f+"}\\) of both sides does the same job): \\[ \\begin{aligned} "+s+" \\times "+(f*f)+"^{t} &= "+B0+" \\times "+f+"^{t} \\\\ "+f+"^{2t} &= "+f+"^{"+k+" + t} \\\\ 2t &= "+k+" + t \\\\ t &= "+k+" \\end{aligned} \\] The faster grower starts behind by a factor of \\("+f+"^{"+k+"}\\) and gains one extra factor of \\("+f+"\\) per "+ctx.us+", so it needs exactly "+k+" "+ctx.up+" to draw level. Neither model alone shows this; the catch-up time appears only when the two are set equal.",
    {f:f,k:k,s:s});
});
/* --- logarithmic scales (4.10) --- */
E("u5-ph-scale",5,["4.10"],1,"gen",function(){
  var CTX={2:["lemon juice","vinegar"],3:["orange juice","apple juice"],4:["tomato juice","a carbonated soft drink"],5:["black coffee","rainwater"],6:["milk","human saliva"],7:["pure water","distilled water"],8:["seawater","a baking soda solution"],9:["a soap solution","a laundry detergent solution"]};
  var shape=pick(["findpH","findpH","findConc","compare","vsWater"]);
  if(shape==="findpH"){
    var p=pick([2,3,4,5,6,7,8,9]),ctx=pick(CTX[p]);
    return numq("A sample of "+ctx+" has a hydrogen ion concentration of \\(10^{-"+p+"}\\) mol/L. What is its pH?",
      p,0.001,
      "The pH is defined by \\(\\text{pH} = -\\log_{10}[H^{+}]\\). With \\([H^{+}] = 10^{-"+p+"}\\), the logarithm is \\(-"+p+"\\) and the negative sign in the definition gives \\(\\text{pH} = "+p+"\\). Each unit on the pH scale is a factor of 10 in the concentration.",
      {shape:shape,p:p});
  }
  if(shape==="findConc"){
    var p2=pick([2,3,4,5,6,7,8,9]),ctx2=pick(CTX[p2]);
    return mcq("A sample of "+ctx2+" has a pH of "+p2+". What is its hydrogen ion concentration, in mol/L?",
      MV("10^{-"+p2+"}"),
      [MV("10^{"+p2+"}"),MV("-10^{"+p2+"}"),MV(FR("1",""+p2))],
      "Invert the definition: \\([H^{+}] = 10^{-\\text{pH}} = 10^{-"+p2+"}\\) mol/L. The exponent carries the negative sign from the pH definition; dropping it is the first distractor's error.",
      {shape:shape,p:p2});
  }
  if(shape==="compare"){
    var p1=pick([2,3,4,5,6,7]),d=pick([1,2,3]),pB=p1+d;
    return numq("Solution A has a pH of "+p1+" and solution B has a pH of "+pB+". How many times as acidic is solution A as solution B?",
      Math.pow(10,d),0.001,
      "Acidity is the hydrogen ion concentration, and each pH unit is a factor of 10 in concentration. The pH values differ by \\("+d+"\\), so the concentrations differ by a factor of \\(10^{"+d+"} = "+Math.pow(10,d)+"\\). A lower pH means a higher concentration.",
      {shape:shape,p1:p1,d:d});
  }
  var p3=pick([2,3,4,5,6]),ctx3=pick(CTX[p3]);
  return numq("How many times as acidic is "+ctx3+" (pH "+p3+") as pure water (pH 7)?",
    Math.pow(10,7-p3),0.001,
    "Compare concentrations through the pH gap: \\(7 - "+p3+" = "+(7-p3)+"\\) pH units, and each unit is a factor of 10, so the concentration is \\(10^{"+(7-p3)+"} = "+Math.pow(10,7-p3)+"\\) times as large.",
    {shape:shape,p:p3});
});
E("u5-richter-decibel",5,["4.10"],1,"gen",function(){
  var shape=pick(["db","db","richter","concept"]);
  if(shape==="db"){
    var L=[40,50,60,70,80,90,100,110,120],prs=[];
    L.forEach(function(x){L.forEach(function(y){if(y>x&&y-x<=60)prs.push([x,y]);});});
    var pr=pick(prs),L1=pr[0],L2=pr[1],dd=(L2-L1)/10;
    return numq("One sound measures "+L1+" dB and another measures "+L2+" dB. How many times as intense is the louder sound?",
      Math.pow(10,dd),0.001,
      "On the decibel scale, every increase of 10 dB multiplies the intensity by 10. The sounds differ by \\("+(L2-L1)+"\\) dB, which is \\("+dd+"\\) steps of 10 dB, so the intensity ratio is \\(10^{"+dd+"} = "+Math.pow(10,dd)+"\\).",
      {shape:shape,L1:L1,L2:L2});
  }
  if(shape==="richter"){
    var M1=pick([3.5,4,4.5,5,5.5,6,6.5,7,7.5]),d=pick([1,2,3]),M2=M1+d;
    return numq("An earthquake of magnitude "+fmt(M2,1)+" has how many times the amplitude of an earthquake of magnitude "+fmt(M1,1)+"?",
      Math.pow(10,d),0.001,
      "On the Richter scale, one full magnitude unit multiplies the amplitude by 10. The magnitudes differ by \\("+d+"\\), so the amplitudes differ by a factor of \\(10^{"+d+"} = "+Math.pow(10,d)+"\\). A magnitude "+fmt(M2,1)+" quake is far more than a little stronger than a magnitude "+fmt(M1,1)+" one.",
      {shape:shape,M1:M1,d:d});
  }
  if(Math.random()<0.5){
    var J=pick([10,20,30,40]),fac=Math.pow(10,J/10);
    return mcq("A sound's level increases by "+J+" dB. By what factor does its intensity increase?",
      ""+fac,dis3(fac,[J,J/10,fac*10]),
      "Every 10 dB is one factor of 10 in intensity. An increase of "+J+" dB is "+(J/10)+" such steps, so the intensity is multiplied by \\(10^{"+(J/10)+"} = "+fac+"\\), not by "+J+".",
      {shape:shape,J:J});
  }
  var d2=pick([1,2,3]),fac2=Math.pow(10,d2);
  return mcq("One earthquake has a magnitude "+d2+" units higher than another. By what factor is its amplitude greater?",
    ""+fac2,dis3(fac2,[10*d2,d2,fac2*10]),
    "Each Richter magnitude unit multiplies the amplitude by 10, so "+d2+" units multiply it by \\(10^{"+d2+"} = "+fac2+"\\). The scale is logarithmic: the factor grows by powers of 10, not by "+(10*d2)+".",
    {shape:shape,d:d2});
});
/* --- matching and characteristics (4.11, 4.14, 4.15) --- */
function pvStr(b,e){var v=powVal(b,1,e);return valStr(v[0],v[1]);}
E("u5-match-graph",5,["4.11"],2,"gen",function(){
  var BS=[{b:2,d:"2",rec:"\\frac{1}{2}"},{b:3,d:"3",rec:"\\frac{1}{3}"},{b:4,d:"4",rec:"\\frac{1}{4}"},{b:10,d:"10",rec:"\\frac{1}{10}"},{b:0.5,d:"\\frac{1}{2}",rec:"2"},{b:1/3,d:"\\frac{1}{3}",rec:"3"},{b:0.25,d:"\\frac{1}{4}",rec:"4"}];
  var B=pick(BS),b=B.b,form=Math.random()<0.55?"k":"h";
  var expBase=b<1?"\\left("+B.d+"\\right)":B.d;
  if(form==="k"){
    var k=pick([-2,-1,0,1,2]),sh=function(v){return v>0?" + "+v:v<0?" - "+(-v):"";};
    var fn=function(x){return Math.log(x)/Math.log(b)+k;};
    var corr="y = "+lgS(B.d,"x")+sh(k);
    var q=mcq("Which equation matches the graphed function?",
      MV(corr),
      [MV("y = "+expBase+"^x"+sh(k)),MV("y = "+lgS(B.rec,"x")+sh(k)),MV("y = "+lgS(B.d,"x")+sh(k+1))],
      "The curve is "+(b>1?"increasing":"decreasing")+", has a vertical asymptote at \\(x = 0\\), and passes through \\((1, "+k+")\\): that fixes a logarithm with base \\("+B.d+"\\) and a vertical shift of \\("+k+"\\), namely \\("+corr+"\\). The exponential option has a horizontal asymptote instead, the reciprocal-base option runs the opposite way, and the last option shifts the graph one unit too far.",
      {form:form,b:B.d,k:k});
    q.figure=plotSVG(fn,0.02,b===10?60:12,-5,5,{gx:b===10?10:(b===3||b===1/3?3:2),gy:1,labelX:true,labelY:true});
    return q;
  }
  var h=pick([-2,-1,1,2]),argS=linS(1,-h);
  var fn2=function(x){return Math.log(x-h)/Math.log(b);};
  var corr2="y = "+lgS(B.d,"\\left("+argS+"\\right)");
  var q2=mcq("Which equation matches the graphed function?",
    MV(corr2),
    [MV("y = "+lgS(B.d,"x")),MV("y = "+lgS(B.rec,"\\left("+argS+"\\right)")),MV("y = "+lgS(B.d,"\\left("+linS(1,-(h+1))+"\\right)"))],
    "The curve is "+(b>1?"increasing":"decreasing")+" with its vertical asymptote at \\(x = "+h+"\\), and it passes through \\(("+(h+1)+", 0)\\): the argument must be \\("+argS+"\\) with base \\("+B.d+"\\), namely \\("+corr2+"\\). The unshifted option puts the asymptote at 0, the reciprocal-base option runs the opposite way, and the last option shifts one unit too far.",
    {form:form,b:B.d,h:h});
  q2.figure=plotSVG(fn2,h+0.02,(b===10?60:12)+Math.max(h,0),-5,5,{gx:b===10?10:(b===3||b===1/3?3:2),gy:1,labelX:true,labelY:true});
  return q2;
});
E("u5-graph-char",5,["4.14"],1,"gen",function(){
  var form=Math.random()<0.5?"A":"B",b=pick([2,3]),q;
  if(form==="A"){
    var h=pick([-3,-2,-1,1,2,3]);
    var fn=function(x){return Math.log(x-h)/Math.log(b);};
    var feat=pick(["asymp","domain","xint"]);
    var figA=plotSVG(fn,h+0.02,h+(b===2?10:12),-4,4,{gx:b===2?2:3,gy:1,labelX:true,labelY:true});
    if(feat==="asymp"){
      q=mcq("The graph shows a logarithmic function. What is the equation of its <b>vertical asymptote</b>?",
        MV("x = "+h),[MV("x = "+(-h)),MV("y = "+h),MV("x = "+(h+1))],
        "The curve climbs without bound as \\(x\\) approaches \\("+h+"\\) from the right, and it does not exist to the left: the argument of the logarithm reaches 0 at \\(x = "+h+"\\), so the vertical asymptote is \\(x = "+h+"\\).",
        {form:form,feat:feat,b:b,h:h});
    } else if(feat==="domain"){
      q=mcq("The graph shows a logarithmic function. What is its <b>domain</b>?",
        MV("x > "+h),[MV("x > "+(-h)),MV("x < "+h),"All real numbers"],
        "The graph exists only for \\(x\\) greater than \\("+h+"\\), because the argument of a logarithm must be positive and the asymptote at \\(x = "+h+"\\) bounds the curve. The domain is \\(x > "+h+"\\); the range, not the domain, is all real numbers.",
        {form:form,feat:feat,b:b,h:h});
    } else {
      q=mcq("The graph shows a logarithmic function. What is its <b>x-intercept</b>?",
        ""+(h+1),dis3(h+1,[h-1,1-h,h+3]),
        "The graph crosses the x-axis one unit to the right of its asymptote: a logarithm equals 0 when its argument is 1, and here the argument reaches 1 at \\(x = "+(h+1)+"\\).",
        {form:form,feat:feat,b:b,h:h});
    }
    q.figure=figA;
    return q;
  }
  var k=pick([-2,-1,1,2]);
  var fn2=function(x){return Math.log(x)/Math.log(b)+k;};
  var feat2=pick(["xint","valueAt","range"]);
  var figB=plotSVG(fn2,0.02,b===2?12:15,-4,4,{gx:b===2?2:3,gy:1,labelX:true,labelY:true});
  if(feat2==="xint"){
    var corr=pvStr(b,-k);
    q=mcq("The graph shows a logarithmic function. What is its <b>x-intercept</b>?",
      MV(corr),dis3s(corr,[pvStr(b,k),"1",pvStr(b,-k+(k>0?-1:1))],["0",""+(b+1),"2"]).map(function(s){return MV(s);}),
      "The crossing has \\(y = 0\\), and the graph is a logarithm of base \\("+b+"\\) shifted by \\("+k+"\\), so the logarithm part must equal \\("+(0-k)+"\\): the intercept is \\(x = "+b+"^{"+(0-k)+"} = "+corr+"\\). Reading where the curve crosses the axis confirms it.",
      {form:form,feat:feat2,b:b,k:k});
  } else if(feat2==="valueAt"){
    q=mcq("The graph shows a logarithmic function. What is the value of \\(y\\) when \\(x = "+b+"\\)?",
      ""+(1+k),dis3(1+k,[k,1,1-k]),
      "At \\(x = "+b+"\\) the logarithm of its own base contributes exactly 1, and the vertical shift adds \\("+k+"\\), so \\(y = 1 + "+(k<0?"("+k+")":k)+" = "+(1+k)+"\\), which matches the height of the curve over \\(x = "+b+"\\) on the graph.",
      {form:form,feat:feat2,b:b,k:k});
  } else {
    q=mcq("The graph shows a logarithmic function. What is its <b>range</b>?",
      "All real numbers",
      ["All y-values greater than "+k,"All y-values greater than 0",MV("x > 0")],
      "The curve rises through every height: as \\(x\\) grows the values climb without bound, and near the asymptote at \\(x = 0\\) they fall without bound. So the range is all real numbers; it is the domain that is restricted, to \\(x > 0\\).",
      {form:form,feat:feat2,b:b,k:k});
  }
  q.figure=figB;
  return q;
});
E("u5-eq-char",5,["4.15"],1,"gen",function(){
  var form=pick(["a","k","h"]),b=pick([2,3,5,10]),eq,feat;
  if(form==="a"){
    var av=pick([2,3,-1,-2,-3]);
    eq="y = "+(av===-1?"-":av)+"\\log_{"+b+"} x";
    feat=pick(["xint","domain","valueAt","direction"]);
    if(feat==="xint")return mcq("Consider the function \\("+eq+"\\). What is its <b>x-intercept</b>?",
      "1",dis3s("1",["0",""+b,"-1"],["2"]),
      "The intercept has \\(y = 0\\), and the coefficient \\("+av+"\\) is not zero, so the logarithm itself must be 0: \\(\\log_{"+b+"} x = 0\\) at \\(x = 1\\), whatever the base and coefficient. The intercept is 1.",
      {form:form,feat:feat,b:b,av:av});
    if(feat==="domain")return mcq("Consider the function \\("+eq+"\\). What is its <b>domain</b>?",
      MV("x > 0"),[MV("x \\ge 0"),MV("x < 0"),"All real numbers"],
      "A logarithm is defined only for positive arguments, and multiplying by the coefficient \\("+av+"\\) does not change that: the domain is \\(x > 0\\). It is the range that covers all real numbers.",
      {form:form,feat:feat,b:b,av:av});
    if(feat==="valueAt")return mcq("Consider the function \\("+eq+"\\). What is the value of \\(y\\) when \\(x = "+(b*b)+"\\)?",
      ""+(2*av),dis3(2*av,[av,2,-2*av]),
      "At \\(x = "+(b*b)+" = "+b+"^2\\), the logarithm is 2, and the coefficient multiplies it: \\(y = "+av+" \\times 2 = "+(2*av)+"\\). The distractors forget the coefficient or forget the power in the argument.",
      {form:form,feat:feat,b:b,av:av});
    return mcq("Consider the function \\("+eq+"\\). Which statement describes the function?",
      av>0?"It is increasing":"It is decreasing",
      [av>0?"It is decreasing":"It is increasing","It is constant","It has a maximum value"],
      "The base \\("+b+"\\) is greater than 1, so the logarithm itself increases; the coefficient \\("+av+"\\) is "+(av>0?"positive, which preserves the increase":"negative, which flips the graph and makes it decrease")+". So the function is "+(av>0?"increasing":"decreasing")+", with no maximum.",
      {form:form,feat:feat,b:b,av:av});
  }
  if(form==="k"){
    var k=pick([-2,-1,1,2]);
    eq="y = \\log_{"+b+"} x"+(k>0?" + "+k:" - "+(-k));
    feat=pick(["xint","valueAt1","asymp"]);
    if(feat==="xint"){
      var corr=pvStr(b,-k);
      return mcq("Consider the function \\("+eq+"\\). What is its <b>x-intercept</b>?",
        MV(corr),dis3s(corr,[pvStr(b,k),"1",pvStr(b,-k+(k>0?-1:1))],["0","2"]).map(function(s){return MV(s);}),
        "Set \\(y = 0\\): the logarithm must equal \\("+(0-k)+"\\), so \\(x = "+b+"^{"+(0-k)+"} = "+corr+"\\). The vertical shift moves the intercept away from the unshifted value of 1.",
        {form:form,feat:feat,b:b,k:k});
    }
    if(feat==="valueAt1")return mcq("Consider the function \\("+eq+"\\). What is the value of \\(y\\) when \\(x = 1\\)?",
      ""+k,dis3(k,[0,1,-k]),
      "Every logarithm is 0 at \\(x = 1\\), so only the shift survives: \\(y = 0 + "+(k<0?"("+k+")":k)+" = "+k+"\\).",
      {form:form,feat:feat,b:b,k:k});
    return mcq("Consider the function \\("+eq+"\\). What is the equation of its <b>vertical asymptote</b>?",
      MV("x = 0"),[MV("y = "+k),MV("x = "+k),MV("y = 0")],
      "The shift is vertical, so it moves the graph up or down but not sideways: the argument still reaches 0 at \\(x = 0\\), and the vertical asymptote stays at \\(x = 0\\).",
      {form:form,feat:feat,b:b,k:k});
  }
  var h=pick([-3,-2,-1,1,2,3]);
  eq="y = \\log_{"+b+"} \\left("+linS(1,-h)+"\\right)";
  feat=pick(["asymp","domain","xint"]);
  if(feat==="asymp")return mcq("Consider the function \\("+eq+"\\). What is the equation of its <b>vertical asymptote</b>?",
    MV("x = "+h),[MV("x = "+(-h)),MV("y = "+h),MV("x = "+(h+1))],
    "The asymptote sits where the argument is 0: \\("+linS(1,-h)+" = 0\\) gives \\(x = "+h+"\\). The shift inside the argument moves the asymptote sideways with it.",
    {form:form,feat:feat,b:b,h:h});
  if(feat==="domain")return mcq("Consider the function \\("+eq+"\\). What is its <b>domain</b>?",
    MV("x > "+h),[MV("x > "+(-h)),MV("x < "+h),"All real numbers"],
    "The argument must be positive: \\("+linS(1,-h)+" > 0\\) means \\(x > "+h+"\\). The domain is \\(x > "+h+"\\); the range is all real numbers.",
    {form:form,feat:feat,b:b,h:h});
  return mcq("Consider the function \\("+eq+"\\). What is its <b>x-intercept</b>?",
    ""+(h+1),dis3(h+1,[h-1,1-h,h+3]),
    "A logarithm is 0 when its argument is 1: \\("+linS(1,-h)+" = 1\\) gives \\(x = "+(h+1)+"\\), one unit to the right of the asymptote.",
    {form:form,feat:feat,b:b,h:h});
});

/* ----- bank-u6.js ----- */
// Math 3201 Unit 6 Financial Mathematics question bank
// CRMARKS: u6-amortization-read=1
// CRMARKS: u6-appreciate-depreciate=1
// CRMARKS: u6-compare-costs=3
// CRMARKS: u6-compare-frequency=2
// CRMARKS: u6-compound-amount=2
// CRMARKS: u6-cost-benefit=3
// CRMARKS: u6-credit-fees=2
// CRMARKS: u6-deferred-offer=3
// CRMARKS: u6-depreciation-value=2
// CRMARKS: u6-find-term=2
// CRMARKS: u6-interest-earned=2
// CRMARKS: u6-payments-term=1
// CRMARKS: u6-present-value=2
// CRMARKS: u6-read-formula=1
// CRMARKS: u6-rent-buy-lease=2
// CRMARKS: u6-simple-interest=1
// CRMARKS: u6-total-cost-loan=1
/* ================= Unit 6: Financial Mathematics ================= */
/* All instances are hand-solvable with the formulas: rates, terms and
   compounding frequencies are chosen so every power closes by hand. */
function mon(x){var s=fmtF(x,2),neg=s.charAt(0)==="-";if(neg)s=s.slice(1);var parts=s.split(".");parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return (neg?"-$":"$")+parts.join(".");}
var FINC=[];
[5,10,20,25].forEach(function(r){[2,3].forEach(function(y){FINC.push({r:r,fw:"annually",m:1,n:y,term:y+" years"});});});
FINC.push({r:5,fw:"annually",m:1,n:4,term:"4 years"});
[8,10,12].forEach(function(r){[1,2].forEach(function(y){FINC.push({r:r,fw:"semi-annually",m:2,n:2*y,term:y+(y===1?" year":" years")});});});
[8,12,16,20].forEach(function(r){FINC.push({r:r,fw:"quarterly",m:4,n:4,term:"1 year"});});
[2,3].forEach(function(mo){FINC.push({r:12,fw:"monthly",m:12,n:mo,term:mo+" months"});});
function finPick(){var s=pick(FINC);return {r:s.r,fw:s.fw,m:s.m,n:s.n,term:s.term,i:s.r/100/s.m};}

/* --- interest concepts (1.6, 1.7) --- */
E("u6-identify-compound",6,["1.7"],1,"var",varset([
  function(){return mcq("Which situation involves <b>compound interest</b>?",
    "A savings account where the interest is added to the balance each year, so the next year's interest is calculated on the larger balance",
    ["A loan where the interest each year is calculated only on the original amount borrowed, even as the years of the loan go by one after another","A one-time administration fee charged when a loan is opened, paid once by the borrower at the start and never charged again during the term","Rent that stays the same every month for the length of a lease, with the same payment due on the same date each month of the agreement term"],
    "Compound interest means interest is earned on interest: once the interest is added to the balance, it becomes part of the amount that grows. Interest calculated only on the original principal is simple interest, however long it runs.",{});},
  function(){return mcq("Which formula calculates the amount owing under <b>compound interest</b>?",
    MV("A = P(1 + i)^n"),
    [MV("A = P(1 + rt)"),MV("I = Prt"),MV("A = P(1 + i)")],
    "Compound growth applies the periodic rate repeatedly, which is why the number of periods appears as an exponent: \\(A = P(1 + i)^n\\). The first two distractors are simple interest formulas (no exponent), and the last applies the rate only once.",{});},
  function(){return mcq("A credit card balance grows faster each month even though no new purchases are made. What causes this?",
    "Interest is charged on the unpaid balance, including on interest that was added in earlier months",
    ["The interest rate increases every month, rising a little at a time while the balance stays unpaid","A monthly fee is added to the balance, and the fee grows a little larger with each passing month","The bank rounds every balance up to the nearest dollar, and the roundings build up month by month"],
    "The unpaid interest becomes part of the balance, and the next month's interest is charged on that larger balance: interest on interest, the defining feature of compound interest.",{});}
]));
E("u6-simple-vs-compound",6,["1.6"],1,"var",varset([
  function(){return mcq("At the same stated rate and term, why does an <b>investor</b> usually prefer compound interest over simple interest?",
    "The interest itself earns interest, so the investment grows faster and faster over time",
    ["Compound interest is paid out in cash every month, giving the investor steady income","Simple interest rates are always lower in practice, so compound accounts pay out more in the end","Compound interest is guaranteed never to lose value, so the deposit is always fully protected"],
    "Under compound interest the interest is added to the principal, so each period's interest is calculated on a larger amount. That snowball effect is the investor's advantage, and it grows stronger the longer the money stays invested.",{});},
  function(){return mcq("At the same stated rate and term, what is the <b>borrower's</b> advantage with simple interest?",
    "Interest is charged only on the original principal, so the total cost is lower and easy to predict",
    ["The borrower can skip payments without penalty whenever money is tight during the term of the loan","The interest rate drops every year of the loan, so each yearly payment is smaller than the one before","The loan never has to be repaid in full, because part of the balance is forgiven at the end of the term"],
    "Simple interest never charges interest on interest: the cost is just \\(I = Prt\\), fixed by the amount borrowed, the rate, and the time. A compound loan at the same rate and term costs more, because the interest itself starts accruing interest.",{});},
  function(){return mcq("Two accounts start with the same deposit at the same rate, one paying simple interest and one compound interest. After many years, which statement is true?",
    "The compound account is worth more, and the gap between the two accounts keeps widening",
    ["The two accounts are worth exactly the same, as both pay the same rate on the deposit","The simple account is worth more, because its interest is steady and is paid in full each year","The compound account is worth more at first, but the simple account catches up in later years"],
    "Simple interest adds the same amount every year, while compound interest adds a growing amount. The compound account pulls ahead in the second period and the lead grows every period after that.",{});}
]));
/* --- reading formulas and basic calculations (1.8, 1.10) --- */
/* --- reading formulas and basic calculations (1.8, 1.10) --- */
/* --- reading formulas and basic calculations (1.8, 1.10) --- */
E("u6-read-formula",6,["1.8"],1,"gen",function(){
  var s=finPick(),P=pick([400,500,800,1000,1200,1500,2000,2500,3000,4000,5000]),feat=pick(["principal","perrate","periods","freq"]);
  var formula="A = "+P+"("+fmt(1+s.i,4)+")^{"+s.n+"}";
function normOpts(key,ds){
  function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
  function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
  var all=[key].concat(ds),guard=0;
  while(guard++<12){
    var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
    var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
    var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
    if(!sing.length)break;
    var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
    for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
    if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
    if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
    else{all[cand]=pad(all[cand],s);}
  }
  return [all[0],all.slice(1)];
}
  if(feat==="principal")return mcq("A financial calculation uses the formula \\("+formula+"\\). What is the <b>principal</b>?",
    mon(P),[mon(Math.round(P*(1+s.i))),mon(P*2),mon(Math.round(P/2))],
    "In \\(A = P(1 + i)^n\\) the principal is the starting amount the growth factor is applied to: here \\(P\\) is "+mon(P)+". The first distractor is the amount after one period, not the amount invested.",
    {feat:feat,P:P});
  if(feat==="perrate"){
    var prOpts=normOpts(fmt(s.r/s.m,2)+"%",s.m===1?[fmt(s.r/2,2)+"%",fmt(s.r*2,2)+"%",fmt(s.r+1,2)+"%"]:[s.r+"%",fmt(s.r/s.m/2,2)+"%",fmt(s.r/s.m+1,2)+"%"]);
    return mcq("A financial calculation uses the formula \\("+formula+"\\). What is the <b>interest rate per compounding period</b>?",
    prOpts[0],prOpts[1],
    "The number added to 1 in the growth factor is the periodic rate: \\(i = "+fmt(s.i,4)+"\\), which is \\("+fmt(s.r/s.m,2)+"\\%\\). That is the annual rate of "+s.r+"% divided by the "+s.m+" compounding period(s) per year; using the full annual rate is the first distractor's error.",
    {feat:feat,P:P});}
  if(feat==="periods"){
    var pdOpts=normOpts(""+s.n,dis3(s.n,[s.n/s.m,s.n*s.m,s.m]).map(function(v){var x=parseFloat(v);return isNaN(x)?v:fmt(x,2);}));
    return mcq("A financial calculation uses the formula \\("+formula+"\\). How many <b>compounding periods</b> are there in total?",
    pdOpts[0],pdOpts[1],
    "The exponent in \\(A = P(1 + i)^n\\) counts the periods directly: \\(n = "+s.n+"\\). It already combines the term ("+s.term+") with the "+s.m+" period(s) per year; dividing by the frequency again is the first distractor's error.",
    {feat:feat,P:P});}
  return mcq("A financial calculation uses the formula \\("+formula+"\\) for an annual rate of "+s.r+"%. How often is the interest <b>compounded</b>?",
    s.fw,["annually","semi-annually","quarterly","monthly"].filter(function(w){return w!==s.fw;}),
    "The periodic rate inside the formula is \\("+fmt(s.i,4)+"\\), and \\("+s.r+"\\% \\div "+fmt(s.i*100,2)+"\\% = "+s.m+"\\), so the annual rate is split into "+s.m+" period(s) per year: the interest is compounded "+s.fw+".",
    {feat:feat,P:P});
});
E("u6-simple-interest",6,["1.8"],1,"gen",function(){
  var P=pick([300,400,500,600,800,1000,1200,1500,2000,2500,3000,4000,5000,6000]),r=pick([3,3.5,4,4.5,5,6,7,8]),t=pick([2,3,4,5,6]);
  var I=P*r/100*t,askAmt=Math.random()<0.5;
  return numq((askAmt?"A loan of ":"An investment of ")+mon(P)+" is taken at "+fmt(r,1)+"% simple interest for "+t+" years. What is the "+(askAmt?"total amount to be repaid":"total interest earned")+", in dollars?",
    askAmt?P+I:I,0.01,
    "Simple interest is \\(I = Prt = "+P+" \\times "+fmt(r/100,3)+" \\times "+t+" = "+fmtF(I,2)+"\\), calculated on the original principal only."+(askAmt?" Adding the principal gives a total of "+mon(P+I)+" to repay.":""),
    {P:P,r:r,t:t});
});
E("u6-compound-amount",6,["1.8"],1,"gen",function(){
  var s=finPick(),P=pick([400,500,800,1000,1200,1500,2000,2500,3000,5000]);
  var A=P*Math.pow(1+s.i,s.n),loan=Math.random()<0.4;
  return numq((loan?"A loan of ":"An investment of ")+mon(P)+" is made at "+s.r+"% compounded "+s.fw+". "+(loan?"If no payments are made, how much is owed":"What is the value")+" after "+s.term+", in dollars?",
    Math.round(A*100)/100,0.05,
    "Use \\(A = P(1 + i)^n\\) with the periodic rate \\(i = "+s.r+"\\% \\div "+s.m+" = "+fmt(s.i*100,2)+"\\%\\) and \\(n = "+s.n+"\\) periods: \\[ \\begin{aligned} A &= P(1 + i)^n \\\\ &= "+P+"("+fmt(1+s.i,4)+")^{"+s.n+"} \\\\ &= "+fmtF(A,2)+" \\end{aligned} \\] So the amount is "+mon(A)+". The rate must be divided by the compounding frequency before it goes into the formula.",
    {P:P,r:s.r,fw:s.fw});
});
E("u6-interest-earned",6,["1.10"],1,"gen",function(){
  var s=finPick(),P=pick([400,500,800,1000,1200,1500,2000,2500,3000,5000]);
  var A=P*Math.pow(1+s.i,s.n),I=A-P,loan=Math.random()<0.5;
  return numq("A "+(loan?"loan":"deposit")+" of "+mon(P)+" grows at "+s.r+"% compounded "+s.fw+" and is settled in one payment after "+s.term+". How much <b>interest</b> is "+(loan?"charged":"earned")+", in dollars?",
    Math.round(I*100)/100,0.05,
    "First find the final amount, then subtract the principal: \\[ \\begin{aligned} A &= "+P+"("+fmt(1+s.i,4)+")^{"+s.n+"} \\\\ &= "+fmtF(A,2)+" \\\\ I &= "+fmtF(A,2)+" - "+fmtF(P,2)+" \\\\ &= "+fmtF(I,2)+" \\end{aligned} \\] The interest is "+mon(I)+": only the growth counts, not the original "+mon(P)+".",
    {P:P,r:s.r,fw:s.fw});
});
/* --- solving for an unknown (1.12) --- */
E("u6-present-value",6,["1.12"],2,"gen",function(){
  var s=finPick(),P=pick([400,500,800,1000,1200,1500,2000,2500,3000,5000]);
  var Aex=P*Math.pow(1+s.i,s.n),Ad=Math.round(Aex*100)/100,ans=Ad/Math.pow(1+s.i,s.n);
  return numq("A loan is to be repaid with a single payment of "+mon(Ad)+" after "+s.term+". The interest rate is "+s.r+"% compounded "+s.fw+". How much was borrowed, in dollars?",
    ans,0.05,
    "Work the compound formula backwards, dividing instead of multiplying: \\[ \\begin{aligned} P &= \\frac{A}{(1 + i)^n} \\\\ &= \\frac{"+fmtF(Ad,2)+"}{("+fmt(1+s.i,4)+")^{"+s.n+"}} \\\\ &= "+fmtF(ans,2)+" \\end{aligned} \\] About "+mon(P)+" was borrowed; the rest of the payment is interest.",
    {P:P,r:s.r,fw:s.fw});
});
E("u6-find-term",6,["1.12"],2,"gen",function(){
  var base=pick([[1.05,5],[1.1,10],[1.2,20],[1.25,25]]),fac=base[0],r=base[1],n=pick([2,3,4]);
  var P=pick([400,500,800,1000,1200,1500,2000,2500,3000,5000]),A=P*Math.pow(fac,n);
  return numq("An investment of "+mon(P)+" grows at "+r+"% compounded annually. How many years does it take to reach "+mon(A)+"?",
    n,0.001,
    "Take the ratio of the amounts and recognize it as a power of the growth factor: \\[ \\begin{aligned} ("+fmt(fac,2)+")^{n} &= \\frac{"+fmtF(A,2)+"}{"+fmtF(P,2)+"} \\\\ &= "+fmt(Math.pow(fac,n),4)+" \\end{aligned} \\] Repeated multiplication gives \\("+fmt(fac,2)+"^{"+n+"} = "+fmt(Math.pow(fac,n),4)+"\\), so \\(n = "+n+"\\) years. No solver is needed when the ratio is built to be an exact power.",
    {r:r,n:n,P:P});
});
/* --- comparing compounding and offers (1.9) --- */
E("u6-compare-frequency",6,["1.9"],2,"gen",function(){
  var r=pick([8,10,12]),P=pick([500,750,1000,1250,1500,1750,2000,2500,3000,4000]);
  var Aa=P*(1+r/100),As=P*Math.pow(1+r/200,2),Aq=P*Math.pow(1+r/400,4),askDiff=Math.random()<0.5;
  var block="\\[ \\begin{aligned} A_{\\text{annual}} &= "+P+"("+fmt(1+r/100,2)+") = "+fmtF(Aa,2)+" \\\\ A_{\\text{semi}} &= "+P+"("+fmt(1+r/200,3)+")^2 = "+fmtF(As,2)+" \\\\ A_{\\text{quarterly}} &= "+P+"("+fmt(1+r/400,3)+")^4 = "+fmtF(Aq,2)+" \\end{aligned} \\]";
  if(askDiff)return numq("An investment of "+mon(P)+" is offered at "+r+"% for one year. How much <b>more</b> interest is earned if the interest is compounded quarterly rather than annually, in dollars?",
    Math.round((Aq-Aa)*100)/100,0.05,
    "Cost out both options for the year: "+block+" More frequent compounding earns more because the interest starts earning interest sooner. The extra interest is "+mon(Aq-Aa)+".",
    {r:r,P:P});
  return mcq("An investment of "+mon(P)+" is offered at "+r+"% for one year, with a choice of compounding period. Which choice earns the <b>most</b> interest?",
    "Compounded quarterly",
    ["Compounded annually","Compounded semi-annually","All three earn exactly the same"],
    "Cost out all three for the year: "+block+" With the rate and term fixed, the most frequent compounding wins, because each interest credit starts earning interest of its own sooner.",
    {r:r,P:P});
});
var U6CC=[
  {at:"simple interest at 10% for 3 years",af:1+0.10*3,bt:"compound interest at 9% compounded annually for 3 years",bf:Math.pow(1.09,3)},
  {at:"compound interest at 12% compounded annually for 2 years",af:Math.pow(1.12,2),bt:"compound interest at 11% compounded semi-annually for 2 years",bf:Math.pow(1.055,4)},
  {at:"simple interest at 5% for 4 years",af:1+0.05*4,bt:"compound interest at 4.5% compounded annually for 4 years",bf:Math.pow(1.045,4)},
  {at:"compound interest at 6% compounded annually for 2 years",af:Math.pow(1.06,2),bt:"simple interest at 6% for 2 years",bf:1+0.06*2},
  {at:"compound interest at 8% compounded semi-annually for 1 year",af:Math.pow(1.04,2),bt:"simple interest at 8.25% for 1 year",bf:1+0.0825},
  {at:"simple interest at 7% for 3 years",af:1+0.07*3,bt:"compound interest at 6.5% compounded annually for 3 years",bf:Math.pow(1.065,3)},
  {at:"compound interest at 15% compounded annually for 2 years",af:Math.pow(1.15,2),bt:"simple interest at 16% for 2 years",bf:1+0.16*2},
  {at:"compound interest at 4% compounded semi-annually for 3 years",af:Math.pow(1.02,6),bt:"simple interest at 4.25% for 3 years",bf:1+0.0425*3}
];
E("u6-compare-costs",6,["1.9"],3,"gen",function(){
  var sc=pick(U6CC),P=pick([1000,1500,2000,2500,3000,4000,5000]);
  var IA=P*(sc.af-1),IB=P*(sc.bf-1),winner=IA<IB?"Loan A":"Loan B",save=Math.abs(IA-IB);
  return mcq("A borrower needs "+mon(P)+". Loan A charges "+sc.at+". Loan B charges "+sc.bt+". Which loan costs <b>less</b> in total interest?",
    winner,
    [winner==="Loan A"?"Loan B":"Loan A","The two loans cost exactly the same","It cannot be determined without a financial calculator"],
    "Cost each loan over its full term: \\[ \\begin{aligned} I_{\\text{A}} &= "+fmtF(IA,2)+" \\\\ I_{\\text{B}} &= "+fmtF(IB,2)+" \\end{aligned} \\] "+winner+" charges less interest, saving "+mon(save)+". The two offers differ in rate, in type, or in compounding, so neither can be judged from its headline rate alone: both have to be costed to the end of the term. Justification for Level 3: the comparison is impossible until two different interest calculations are both carried through.",
    {P:P,winner:winner});
});

/* --- loan costs and amortization (1.11) --- */
E("u6-total-cost-loan",6,["1.11"],1,"gen",function(){
  var pay=pick([74.50,86.25,95.75,109.99,124.60,138.45,152.30,175.80,210.25,249.99]),n=pick([12,18,24,36,48,60]);
  var total=Math.round(pay*n*100)/100,P=0,tries=0;
  while(tries++<40){P=pick([500,600,800,1000,1200,1500,2000,2500,3000]);if(P<total*0.95&&P>total*0.4)break;P=0;}
  if(!P)P=Math.round(total*0.7);
  var interest=Math.round((total-P)*100)/100,askInt=Math.random()<0.5;
  return numq("A loan of "+mon(P)+" is repaid with "+n+" monthly payments of "+mon(pay)+". What is the total "+(askInt?"interest paid":"amount repaid")+", in dollars?",
    askInt?interest:total,0.01,
    "Multiply the payment by the number of payments: \\[ \\begin{aligned} \\text{Total repaid} &= "+fmtF(pay,2)+" \\times "+n+" \\\\ &= "+fmtF(total,2)+(askInt?" \\\\ \\text{Interest} &= "+fmtF(total,2)+" - "+fmtF(P,2)+" \\\\ &= "+fmtF(interest,2):"")+" \\end{aligned} \\] "+(askInt?"The borrower pays "+mon(interest)+" for the use of the money; the rest repays the principal.":"The borrower repays "+mon(total)+" altogether, of which "+mon(interest)+" is interest."),
    {pay:pay,n:n,P:P});
});
E("u6-payments-term",6,["1.11"],1,"gen",function(){
  var f=pick([{w:"weekly",per:52},{w:"bi-weekly",per:26},{w:"semi-monthly",per:24},{w:"monthly",per:12},{w:"quarterly",per:4},{w:"semi-annually",per:2}]);
  var y=ri(1,6),count=f.per*y,toYears=Math.random()<0.5;
  if(toYears)return numq("A loan is repaid with "+count+" "+f.w+" payments. How many years does the repayment take?",
    y,0.001,"There are "+f.per+" "+f.w+" payments in one year, and \\("+count+" \\div "+f.per+" = "+y+"\\), so the repayment takes "+y+" year"+(y===1?"":"s")+".",{f:f.w});
  return numq("A loan is repaid with "+f.w+" payments over "+y+" years. How many payments are made in total?",
    count,0.001,"There are "+f.per+" "+f.w+" payments in each year, and \\("+f.per+" \\times "+y+" = "+count+"\\), so "+count+" payments are made in total.",{f:f.w,y:y});
});
E("u6-amortization-read",6,["1.11"],1,"gen",function(){
  var rows=null,P=0,rate=0,tries=0;
  while(tries++<80){
    var Pc=pick([600,800,1000,1200,1500,2000]),ic=pick([0.05,0.10]),payc=pick([200,250,300,400,500]);
    if(payc<=Pc*ic)continue;
    var bal=Pc,rr=[],yr=0;
    while(bal>0&&yr<12){yr++;var it=Math.round(bal*ic*100)/100,paym,pr;
      if(bal+it<=payc){paym=Math.round((bal+it)*100)/100;pr=bal;bal=0;}
      else{paym=payc;pr=Math.round((payc-it)*100)/100;bal=Math.round((bal-pr)*100)/100;}
      rr.push({y:yr,pay:paym,it:it,pr:pr,bal:bal});}
    if(bal===0&&rr.length>=3&&rr.length<=8){rows=rr;P=Pc;rate=ic;break;}
  }
  if(!rows){P=1000;rate=0.10;rows=[{y:1,pay:300,it:100,pr:200,bal:800},{y:2,pay:300,it:80,pr:220,bal:580},{y:3,pay:300,it:58,pr:242,bal:338},{y:4,pay:300,it:33.80,pr:266.20,bal:71.80},{y:5,pay:78.98,it:7.18,pr:71.80,bal:0}];}
  var table=rows.map(function(r){return "Year "+r.y+": payment "+mon(r.pay)+", interest "+mon(r.it)+", balance owing "+mon(r.bal);}).join("<br>");
  var shape=pick(["interest","balance","principal","final","totint"]);
  var head="A loan of "+mon(P)+" at "+fmt(rate*100,0)+"% interest is repaid with annual payments. The repayment schedule is:<br>"+table+"<br>";
  if(shape==="totint"){
    var tot=rows.reduce(function(a,r){return a+r.it;},0);tot=Math.round(tot*100)/100;
    var sumStr=rows.map(function(r){return fmtF(r.it,2);}).join(" + ");
    return numq(head+"What is the <b>total interest</b> paid over the life of the loan, in dollars?",
      tot,0.01,"Add the interest column of the schedule: \\[ \\begin{aligned} \\text{Total interest} &= "+sumStr+" \\\\ &= "+fmtF(tot,2)+" \\end{aligned} \\] The interest portion shrinks each year because it is charged on a smaller and smaller balance.",{shape:shape});
  }
  var k=ri(1,Math.min(3,rows.length)),row=rows[k-1];
  if(shape==="interest")return numq(head+"How much of the <b>year "+k+" payment</b> goes toward interest, in dollars?",
    row.it,0.01,"Read the year "+k+" row of the schedule: of the "+mon(row.pay)+" payment, "+mon(row.it)+" is interest. Interest is charged on the balance owing at the start of the year, which is why the interest portion falls as the balance falls.",{shape:shape});
  if(shape==="balance")return numq(head+"What is the <b>balance owing</b> right after the year "+k+" payment, in dollars?",
    row.bal,0.01,"Read the year "+k+" row of the schedule: after that payment the balance owing is "+mon(row.bal)+". Only the principal portion of each payment ("+mon(row.pr)+" in year "+k+") reduces the balance.",{shape:shape});
  if(shape==="principal")return numq(head+"How much of the <b>year "+k+" payment</b> goes toward the principal, in dollars?",
    row.pr,0.01,"In year "+k+" the payment is "+mon(row.pay)+" and the interest portion is "+mon(row.it)+", so the principal portion is \\("+fmtF(row.pay,2)+" - "+fmtF(row.it,2)+" = "+fmtF(row.pr,2)+"\\). The principal portion grows each year because a shrinking balance is charged less interest.",{shape:shape});
  var last=rows[rows.length-1];
  return numq(head+"What is the amount of the <b>final payment</b>, in dollars?",
    last.pay,0.01,"By the last year only "+mon(rows[rows.length-2].bal)+" is owing, and with one year of interest ("+mon(last.it)+") the final payment is just "+mon(last.pay)+", smaller than the regular payments because the loan is almost gone.",{shape:shape});
});
/* --- credit options (1.13) --- */
E("u6-credit-fees",6,["1.13"],2,"gen",function(){
  var B0=pick([800,1000,1200,1500,2000,2500]),ra=pick([14,16,18,20]),drop=pick([3,4,5]),rb=ra-drop;
  var diff0=B0*drop/100,delta=pick([-20,-12,-6,6,12,20]),fee=Math.max(5,Math.round((diff0+delta)/5)*5);
  var cA=B0*ra/100,cB=B0*rb/100+fee,winner=cA<cB?"Card A":"Card B",nm=pick(["Sam","Priya","Noah","Emma","Liam"]);
  return mcq(nm+" carries a balance of "+mon(B0)+" for a full year without making a payment. Card A charges "+ra+"% compounded annually with no annual fee. Card B charges "+rb+"% compounded annually plus a "+mon(fee)+" annual fee. Which card costs <b>less</b> over the year?",
    winner,
    [winner==="Card A"?"Card B":"Card A","Both cards cost exactly the same","The card with the lower rate always costs less, so no calculation is needed"],
    "A rate is only part of a card's cost. Add each card's charges for the year: \\[ \\begin{aligned} \\text{Card A} &= "+fmtF(cA,2)+" \\\\ \\text{Card B} &= "+fmtF(B0*rb/100,2)+" + "+fmtF(fee,2)+" = "+fmtF(cB,2)+" \\end{aligned} \\] "+winner+" costs less, by "+mon(Math.abs(cA-cB))+". The annual fee can wipe out a lower rate's advantage, which is why the last option is a trap.",
    {B0:B0,ra:ra,rb:rb});
});
E("u6-deferred-offer",6,["1.13"],3,"gen",function(){
  var P=pick([600,750,800,900,1100,1200,1500,1800,2000,2400]),r=pick([15,18,20,21,24,28]);
  var item=pick(["sofa","dining set","television","mattress","appliance package"]),nm=pick(["Taylor","Jordan","Casey","Riley","Alex"]);
  var I=P*r/100,offer="A store sells a "+item+" for "+mon(P)+" with a \"pay nothing for 12 months\" offer. The fine print says that if the full price is not paid by the end of month 12, simple interest at "+r+"% per year is charged on the <b>full original price</b>, back to the purchase date. ";
  if(Math.random()<0.5)return numq(offer+nm+" pays nothing by the deadline. How much is owed in total at that point, in dollars?",
    P+I,0.01,
    "Missing the deadline triggers interest on the whole price for the whole year, even though no payments were due: \\[ \\begin{aligned} I &= Prt \\\\ &= "+P+" \\times "+fmt(r/100,2)+" \\times 1 \\\\ &= "+fmtF(I,2)+" \\\\ \\text{Total owed} &= "+fmtF(P,2)+" + "+fmtF(I,2)+" \\\\ &= "+fmtF(P+I,2)+" \\end{aligned} \\] The deferral is free only if the full price is paid in time. Justification for Level 3: the key condition sits in the fine print and reverses the natural assumption that interest would count only from the deadline.",
    {P:P,r:r});
  var paidOpts=[100,200,250,300,400,500].filter(function(v){return v<P&&2*v!==P;});
  var paid=pick(paidOpts);
  return mcq(offer+nm+" pays "+mon(paid)+" before the deadline but does not pay in full. How much <b>interest</b> is charged?",
    mon(I),
    [mon((P-paid)*r/100),mon(0),mon(paid*r/100)],
    "The condition in the fine print is payment <b>in full</b>. Because "+mon(paid)+" is only part of the price, interest is charged on the full original price for the full year: \\(I = Prt = "+P+" \\times "+fmt(r/100,2)+" \\times 1 = "+fmtF(I,2)+"\\), not on the remaining balance. Justification for Level 3: the partial payment feels like it should help, and spotting that it does not is the whole question.",
    {P:P,r:r,paid:paid});
});
/* --- assets: appreciate and depreciate (1.14) --- */
E("u6-appreciate-depreciate",6,["1.14"],1,"var",varset([
  function(){return mcq("A classic car bought for $18,000 is now worth $24,000. By what percent did the car <b>appreciate</b>?",
    "33.3%",["25%","66.7%","6%"],
    "The value rose by \\(24000 - 18000 = 6000\\) dollars. Percent change is measured against the original value: \\(6000 \\div 18000 = 0.333\\), an appreciation of about 33.3%. Dividing by the new value instead gives the 25% distractor.",{});},
  function(){return mcq("A snowmobile bought for $9,600 is now worth $7,200. By what percent did it <b>depreciate</b>?",
    "25%",["33.3%","75%","2.5%"],
    "The value fell by \\(9600 - 7200 = 2400\\) dollars. Against the original value: \\(2400 \\div 9600 = 0.25\\), a depreciation of 25%. The 75% option is the percent of value remaining, not the percent lost.",{});},
  function(){return mcq("Which asset is <b>most likely to appreciate</b> in value over the next five years?",
    "A house in a growing town",
    ["A new smartphone","A new car that is driven daily","A laptop computer"],
    "Real estate in a growing area commonly gains value as demand rises, so the house is the appreciating asset. Phones, cars and laptops are depreciating assets: they lose value with age, wear and newer models replacing them.",{});}
]));
E("u6-depreciation-value",6,["1.14"],1,"gen",function(){
  var asset=pick([
    {n:"car",mode:"dep",pool:[12000,15000,18000,20000,24000,28000,32000]},
    {n:"ATV",mode:"dep",pool:[7000,8500,9000,11000]},
    {n:"boat",mode:"dep",pool:[15000,22000,26000]},
    {n:"house",mode:"app",pool:[280000,320000,350000,400000,450000]}]);
  var dep=asset.mode==="dep",r=dep?pick([10,15,20,25]):pick([3,4,5,6]),t=pick([2,3]);
  var P=pick(asset.pool),fac=dep?1-r/100:1+r/100,V=P*Math.pow(fac,t);
  return numq("A "+asset.n+" bought for "+mon(P)+" "+(dep?"loses "+r+"% of its value each year (declining balance)":"gains "+r+"% in value each year")+". What is it worth after "+t+" years, in dollars?",
    Math.round(V*100)/100,0.05,
    "Each year the value is multiplied by \\("+fmt(fac,2)+"\\): \\[ \\begin{aligned} V &= P(1 "+(dep?"-":"+")+" r)^t \\\\ &= "+P+"("+fmt(fac,2)+")^{"+t+"} \\\\ &= "+fmtF(V,2)+" \\end{aligned} \\] The value is applied to the shrinking (declining) balance each year, so this is a compound change, not "+t+" separate deductions of "+r+"% of the original price.",
    {asset:asset.n,r:r,t:t});
});
/* --- renting, buying, leasing (1.15, 1.16) --- */
E("u6-rent-buy-lease",6,["1.15"],2,"var",varset([
  function(){return mcq("Renting a home costs $950 per month. Buying a similar home would cost $1,275 per month in mortgage payments, property taxes and upkeep. Ignoring equity, how much <b>more</b> cash goes out over 2 years if the family buys?",
    "$7,800",["$325","$3,900","$15,600"],
    "The monthly difference is \\(1275 - 950 = 325\\) dollars, and 2 years is 24 months: \\(325 \\times 24 = 7800\\) dollars more in cash out. The $325 option forgets the time span; $3,900 is only one year. (Buying also builds equity, which this question sets aside on purpose.)",{});},
  function(){return mcq("A car lease costs $415 per month for 36 months, with $1,500 due at signing. What is the <b>total cost</b> of the lease, excluding fuel and insurance?",
    "$16,440",["$14,940","$17,940","$13,440"],
    "Add the signing payment to all 36 monthly payments: \\(1500 + 415 \\times 36 = 1500 + 14940 = 16440\\) dollars. The $14,940 option forgets the amount due at signing.",{});},
  function(){return mcq("Buying a car costs $26,000, and after 4 years it can be sold for $11,000. Leasing a similar car costs $340 per month for 4 years, with nothing owned at the end. Ignoring interest and running costs, which option costs <b>less</b> over the 4 years, and by how much?",
    "Buying, by $1,320",
    ["Leasing, by $1,320","Buying, by $2,680","They cost exactly the same"],
    "Buying really costs \\(26000 - 11000 = 15000\\) dollars once the resale value is counted. Leasing costs \\(340 \\times 48 = 16320\\) dollars. Buying costs less by \\(16320 - 15000 = 1320\\) dollars, and the buyer owns the car at the end as well.",{});}
]));
E("u6-justify-decision",6,["1.16"],3,"var",varset([
  function(){return mcq("Maya, a nurse, takes a 9-month work contract in a town where she knows no one, and expects to move back home afterwards. She needs a place to live. Which choice is <b>most advantageous</b> for her?",
    "Rent an apartment, because costs of buying and selling a home are hard to recover in a short stay",
    ["Buy a house, because her monthly mortgage payment would be lower than the rent for a similar place","Buy a house, because each payment she makes would build equity instead of going to a landlord","Take a 5-year lease on a house, because a longer lease usually locks in a lower monthly rental rate"],
    "Buying carries large one-time costs (legal fees, inspections, moving, and selling costs later) that are normally recovered through years of living there and building equity. Over just 9 months those costs swamp any equity gained, so renting is the financially sound choice for a short, temporary stay. Justification for Level 3: the answer comes from matching her circumstances to the advantages and disadvantages of each option, not from a calculation.",{});},
  function(){return mcq("A family has stable jobs, a down payment saved, and plans to stay in their town for at least 15 years. Which housing choice is <b>most advantageous</b> for them?",
    "Buy a home, because over a long stay the payments build equity instead of going to a landlord",
    ["Keep renting, because it leaves the down payment they saved free to invest in other things","Lease a home, because a lease gives them a house without the upkeep and repairs of owning","Rent an apartment, because they could move quickly if a better job opportunity came up elsewhere"],
    "Over 15 years the one-time costs of buying are spread thin, and each mortgage payment adds to an asset the family owns. Renting for that long builds no equity at all, and leasing does not either: only owners gain equity. Justification for Level 3: the time horizon in the circumstances is what flips the decision compared with a short stay.",{});},
  function(){return mcq("Devon runs a small business, drives clients in his vehicle, and wants a new, reliable vehicle every three years with no repair bills. Which vehicle option is <b>most advantageous</b> for him?",
    "Lease, because it gives predictable payments, a new vehicle each term and full warranty coverage",
    ["Buy a new vehicle and keep it, because owning usually costs less per year over the long term","Buy a reliable used vehicle, because its purchase price is far lower than the price of a new one","Rent a vehicle month by month, because he can hand it back whenever his business needs change"],
    "Leasing trades ownership for exactly what Devon's circumstances call for: a current-model vehicle for his clients, fixed monthly costs for his business budget, and a vehicle that is always under warranty. Buying and keeping a vehicle long term is cheaper per year but leaves him with an aging vehicle and repair bills. Justification for Level 3: the best option depends on the stated priorities, not on the lowest headline cost.",{});}
]));
/* --- cost and benefits (1.17) --- */
E("u6-cost-benefit",6,["1.17"],3,"gen",function(){
  var ctx=pick([
    {item:"a high-efficiency furnace",saves:"on heating bills"},
    {item:"a heat pump",saves:"on energy bills"},
    {item:"extra attic insulation",saves:"on heating bills"},
    {item:"LED lighting for a community rink",saves:"on electricity bills"},
    {item:"a high-efficiency washing machine",saves:"on water and energy bills"}]);
  var C=pick([400,600,800,1000,1200,1500,2000,2500]),S=pick([60,75,90,120,150,180,200,240,300]),L=pick([5,8,10,12,15]),tries=0;
  while(S*L===C&&tries++<10){S=pick([60,75,90,120,150,180,200,240,300]);}
  var tot=S*L,net=tot-C;
  return numq("Installing "+ctx.item+" costs "+mon(C)+" more than the standard option, but it saves "+mon(S)+" per year "+ctx.saves+". It is expected to last "+L+" years. What is the <b>net benefit</b> over its lifetime, in dollars? (A negative answer means it costs more than it saves.)",
    net,0.01,
    "Build both sides of the ledger: \\[ \\begin{aligned} \\text{Total saved} &= "+fmtF(S,2)+" \\times "+L+" \\\\ &= "+fmtF(tot,2)+" \\\\ \\text{Net benefit} &= "+fmtF(tot,2)+" - "+fmtF(C,2)+" \\\\ &= "+fmtF(net,2)+" \\end{aligned} \\] "+(net>0?"The upgrade pays for itself and comes out "+mon(net)+" ahead over its lifetime.":"The savings never repay the extra cost: over its lifetime the upgrade comes out "+mon(-net)+" behind, so on cost alone the standard option is better.")+" Justification for Level 3: neither the saving nor the verdict is stated in the question; both sides have to be built and compared.",
    {C:C,S:S,L:L});
});

/* ----- bank-u7.js ----- */
// Math 3201 Unit 7 Set Theory question bank
// CRMARKS: u7-complement-elements=1
// CRMARKS: u7-deduction-mc=1
// CRMARKS: u7-error-correct=2
// CRMARKS: u7-error-venn=2
// CRMARKS: u7-exactly-two-cr=3
// CRMARKS: u7-operations=2
// CRMARKS: u7-region-meaning=1
// CRMARKS: u7-relations-count-cr=2
// CRMARKS: u7-search-logic=1
// CRMARKS: u7-subset-difference-cr=2
// CRMARKS: u7-symmetric-difference-cr=3
// CRMARKS: u7-three-set-problem=2
// CRMARKS: u7-two-set-notation=1
// CRMARKS: u7-two-set-problem=1
// CRMARKS: u7-two-set-totals-cr=3
// CRMARKS: u7-venn-fill=1
// CRMARKS: u7-venn-missing=2
// CRMARKS: u7-venn-read=1
// CRMARKS: u7-venn-three-read=2
/* ================= Unit 7: Set Theory ================= */
function roster(arr){return arr.length?"{"+arr.join(", ")+"}":"∅";}
var U7PROPS=[
  {n:"even numbers",f:function(x){return x%2===0;}},
  {n:"odd numbers",f:function(x){return x%2===1;}},
  {n:"multiples of 3",f:function(x){return x%3===0;}},
  {n:"multiples of 4",f:function(x){return x%4===0;}},
  {n:"prime numbers",f:function(x){return [2,3,5,7,11,13,17,19].indexOf(x)>=0;}},
  {n:"factors of 12",f:function(x){return 12%x===0;}},
  {n:"perfect squares",f:function(x){return [1,4,9,16].indexOf(x)>=0;}},
  {n:"numbers greater than 7",f:function(x){return x>7;}},
  {n:"numbers less than 5",f:function(x){return x<5;}},
  {n:"multiples of 5",f:function(x){return x%5===0;}}
];
function u7Universe(){var m=pick([10,12,15,20]),U=[];for(var i=1;i<=m;i++)U.push(i);return U;}
function u7set(p,U){return U.filter(p.f);}
function u7pair(filterFn,U){
  var pairs=[];U7PROPS.forEach(function(a){U7PROPS.forEach(function(b){if(a!==b)pairs.push([a,b]);});});
  pairs=shuffle(pairs);
  for(var i=0;i<pairs.length;i++){var A=u7set(pairs[i][0],U),B=u7set(pairs[i][1],U);if(filterFn(A,B,U))return {pa:pairs[i][0],pb:pairs[i][1],A:A,B:B};}
  return null;
}

/* --- concepts in context (2.1) --- */
E("u7-set-concepts",7,["2.1"],1,"var",varset([
  function(){return mcq("A teacher asks for the set of months of the year that have 32 days. What kind of set is this?",
    "The empty set, because no month has 32 days",
    ["The universal set, because it involves the whole calendar","A subset of the set of months with 31 days","A disjoint set, because the months are all different"],
    "The set contains no elements at all, which makes it the empty set, written ∅. A set with no members is not a universal set or a subset in the sense meant here; those terms describe relationships, and this set simply has nothing in it.",{});},
  function(){return mcq("In a school, let A be the set of students in the chess club and B be the set of students in the band. No student belongs to both. The sets A and B are called",
    "disjoint sets",
    ["equal sets","complementary sets","universal sets"],
    "Disjoint sets have no elements in common, and here the overlap is empty by the given information. The sets are not equal (they hold different students), and neither is the complement of the other unless together they covered every student, which is not stated.",{});},
  function(){return mcq("Let U be the set of all students in a school, and let G be the set of grade 9 students in that school. Which statement is true?",
    "G is a subset of U, because every grade 9 student in the school is a student in the school",
    ["U is a subset of G, because U is the bigger set and the bigger set always contains the smaller one","G is disjoint from U, because grade 9 is only one grade and different grades never overlap","G is the complement of U, because it names only the grade 9 students and leaves out all the rest"],
    "A set is a subset of another when every element of the first is also in the second. Every member of G is by definition a member of U, so G is a subset of U. The larger set is never a subset of the smaller one here.",{});},
  function(){return mcq("A survey asks the 28 students in one class about their weekend jobs. For this survey, the <b>universal set</b> is",
    "the 28 students in the class who were surveyed",
    ["all students in the school, in every grade level","all teenagers in the province, wherever they live","the students who have weekend jobs"],
    "The universal set is the set of everything under consideration for the problem at hand. Here every question is about the 28 surveyed students, so they form the universal set; the students with jobs are just a subset of it.",{});}
]));
E("u7-subset-relation",7,["2.1"],2,"gen",function(){
  var U=u7Universe();
  var got=u7pair(function(A,B){
    var subAB=A.every(function(x){return B.indexOf(x)>=0;}),subBA=B.every(function(x){return A.indexOf(x)>=0;});
    var eq=A.length===B.length&&subAB,disj=A.every(function(x){return B.indexOf(x)<0;});
    return !eq&&(subAB||subBA||disj);
  },U);
  var A=got.A,B=got.B;
  var subAB=A.every(function(x){return B.indexOf(x)>=0;}),subBA=B.every(function(x){return A.indexOf(x)>=0;});
  var correct=subAB?"A is a subset of B":subBA?"B is a subset of A":"A and B are disjoint";
  return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement is true?",
    correct,
    ["A is a subset of B","B is a subset of A","A and B are disjoint","A and B are equal"].filter(function(s){return s!==correct;}),
    "List the sets: A = "+roster(A)+" and B = "+roster(B)+". "+(subAB?"Every element of A appears in B, so A is a subset of B.":subBA?"Every element of B appears in A, so B is a subset of A.":"The two lists share no element at all, so the sets are disjoint.")+" The sets are not equal, since their lists differ.",
    {a:got.pa.n,b:got.pb.n});
});
E("u7-disjoint-check",7,["2.1"],2,"gen",function(){
  var U=u7Universe();
  var got=u7pair(function(A,B){
    var inter=A.filter(function(x){return B.indexOf(x)>=0;});
    if(inter.length>1)return false;
    if(inter.length===1)return A.length>inter.length&&B.length>inter.length;
    return true;
  },U);
  var A=got.A,B=got.B,inter=A.filter(function(x){return B.indexOf(x)>=0;});
  var aOnly=A.filter(function(x){return B.indexOf(x)<0;}),bOnly=B.filter(function(x){return A.indexOf(x)<0;});
  var neither=U.filter(function(x){return A.indexOf(x)<0&&B.indexOf(x)<0;});
  if(inter.length===1)return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement about A and B is true?",
    inter[0]+" is in both A and B, so A and B are not disjoint",
    [aOnly[0]+" is in both A and B, so A and B are not disjoint",bOnly[0]+" is in both A and B, so A and B are not disjoint","A and B are disjoint: they have no elements in common"],
    "A = "+roster(A)+" and B = "+roster(B)+". Comparing the lists, the only element appearing in both is "+inter[0]+", so the sets overlap but are not disjoint. "+aOnly[0]+" is only in A and "+bOnly[0]+" is only in B.",
    {a:got.pa.n,b:got.pb.n});
  return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement about A and B is true?",
    "A and B are disjoint: they have no elements in common",
    [A[0]+" is in both A and B, so A and B are not disjoint",B[0]+" is in both A and B, so A and B are not disjoint",neither[0]+" is in both A and B, so A and B are not disjoint"],
    "A = "+roster(A)+" and B = "+roster(B)+". No element appears in both lists, so the sets are disjoint. Each distractor names an element from only one set (or from neither).",
    {a:got.pa.n,b:got.pb.n});
});
/* --- elements of operations (2.4) --- */
/* --- elements of operations (2.4) --- */
E("u7-complement-elements",7,["2.4"],1,"gen",function(){
  var n=pick([8,9,10,11,12]),U=[];for(var i=1;i<=n;i++)U.push(i);
  var size=pick([3,4,5,6]),A=shuffle(U.slice()).slice(0,size).sort(function(a,b){return a-b;});
  var comp=U.filter(function(x){return A.indexOf(x)<0;});
  var mod=comp.slice();mod.splice(0,1);mod.push(A[0]);mod.sort(function(a,b){return a-b;});
  var plus=comp.concat([A[1]]).sort(function(a,b){return a-b;});
  return mcq("Let U = {1, 2, ..., "+n+"} and A = "+roster(A)+". What is the complement of A, written A'?",
    roster(comp),
    [roster(A),roster(mod),roster(plus)],
    "The complement A' holds every element of the universal set that is not in A. Removing "+roster(A)+" from U leaves "+roster(comp)+". The second distractor swaps one element wrongly, and the third keeps an element of A in the complement.",
    {n:n,size:size});
});
E("u7-operations",7,["2.4"],2,"gen",function(){
  var ops=[
    {key:"union",label:"A \\cup B",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)>=0||B.indexOf(x)>=0;});}},
    {key:"inter",label:"A \\cap B",calc:function(A,B,U){return A.filter(function(x){return B.indexOf(x)>=0;});}},
    {key:"compA",label:"A'",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)<0;});}},
    {key:"compB",label:"B'",calc:function(A,B,U){return U.filter(function(x){return B.indexOf(x)<0;});}},
    {key:"compUnion",label:"(A \\cup B)'",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)<0&&B.indexOf(x)<0;});}},
    {key:"interCompB",label:"A \\cap B'",calc:function(A,B,U){return A.filter(function(x){return B.indexOf(x)<0;});}},
    {key:"compInter",label:"(A \\cap B)'",calc:function(A,B,U){var inter=A.filter(function(x){return B.indexOf(x)>=0;});return U.filter(function(x){return inter.indexOf(x)<0;});}}
  ];
  var U=u7Universe(),got=null,op=null,result=null,tries=0;
  while(tries++<60){
    var g=u7pair(function(){return true;},U);if(!g)break;
    var o=pick(ops),res=o.calc(g.A,g.B,U);
    var others=ops.filter(function(x){return x!==o;}).map(function(x){return x.calc(g.A,g.B,U);});
    var seen={},cands=[];
    others.forEach(function(r){var k=r.join(",");if(k!==res.join(",")&&!seen[k]){seen[k]=1;cands.push(r);}});
    if(cands.length>=2){got=g;op=o;result=res;break;}
  }
  if(!got){got=u7pair(function(){return true;},U);op=ops[0];result=op.calc(got.A,got.B,U);}
  var distract=ops.filter(function(x){return x!==op;}).map(function(x){return x.calc(got.A,got.B,U);})
    .filter(function(r,idx,arr){return r.join(",")!==result.join(",")&&arr.findIndex(function(y){return y.join(",")===r.join(",");})===idx;}).slice(0,3);
  if(distract.length<3){var mod=result.slice();if(mod.length)mod.splice(mod.length-1,1);else mod=[1];distract.push(mod);}
  return mcq("Let U = {1, 2, ..., "+U.length+"}, A = the set of "+got.pa.n+", and B = the set of "+got.pb.n+". What is \\("+op.label+"\\)?",
    roster(result),
    distract.map(roster),
    "First list the sets: A = "+roster(got.A)+" and B = "+roster(got.B)+". Applying the operation gives "+roster(result)+". Each distractor is a different operation on the same two sets, so work out exactly which operation the question names before listing elements.",
    {op:op.key,a:got.pa.n,b:got.pb.n});
});
/* --- what a region represents (2.3) --- */
var U7CTX=[
  {lA:"Soccer",lB:"Hockey",aP:"play soccer",bP:"play hockey"},
  {lA:"Music",lB:"Art",aP:"take music",bP:"take art"},
  {lA:"French",lB:"Spanish",aP:"speak French",bP:"speak Spanish"},
  {lA:"Bicycle",lB:"Skateboard",aP:"own a bicycle",bP:"own a skateboard"},
  {lA:"Chess",lB:"Robotics",aP:"belong to the chess club",bP:"belong to the robotics club"},
  {lA:"Job",lB:"Volunteering",aP:"have a part-time job",bP:"volunteer at the food bank"}
];
var U7REGIONS=[
  {key:"Aonly",phrase:function(c){return "students who "+c.aP+" but do not "+c.bP;},notn:"A \\cap B'",mark:[66,80]},
  {key:"Bonly",phrase:function(c){return "students who "+c.bP+" but do not "+c.aP;},notn:"A' \\cap B",mark:[154,80]},
  {key:"both",phrase:function(c){return "students who "+c.aP+" and "+c.bP;},notn:"A \\cap B",mark:[110,80]},
  {key:"neither",phrase:function(c){return "students who do not "+c.aP+" and do not "+c.bP;},notn:"(A \\cup B)'",mark:[196,132]},
  {key:"either",phrase:function(c){return "students who "+c.aP+" or "+c.bP+" (or both)";},notn:"A \\cup B",mark:null},
  {key:"notA",phrase:function(c){return "students who do not "+c.aP;},notn:"A'",mark:null}
];
E("u7-region-meaning",7,["2.3"],1,"gen",function(){
  var c=pick(U7CTX),reg=pick(U7REGIONS),style=pick(["pos","phrase2not","not2phrase"]);
  if(style==="pos"&&!reg.mark)style="phrase2not";
  var others=shuffle(U7REGIONS.filter(function(r){return r!==reg;}));
  var fig=venn2(null,null,null,null,c.lA,c.lB,style==="pos"?reg.mark:null);
  var head="In a Venn diagram of a student survey, circle A represents students who "+c.aP+" and circle B represents students who "+c.bP+". ";
  if(style==="pos"){var q=mcq(head+"The region marked with a star represents",
    reg.phrase(c),
    [others[0].phrase(c),others[1].phrase(c),others[2].phrase(c)],
    "Read the star's position: it sits "+(reg.key==="Aonly"?"inside A but outside B":reg.key==="Bonly"?"inside B but outside A":reg.key==="both"?"inside both circles":"outside both circles")+", so it represents "+reg.phrase(c)+". In set notation this region is \\("+reg.notn+"\\).",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;}
  if(style==="phrase2not"){var q=mcq(head+"Which set notation represents: "+reg.phrase(c)+"?",
    MV(reg.notn),
    [MV(others[0].notn),MV(others[1].notn),MV(others[2].notn)],
    "\"And\" between conditions means intersection, \"or\" means union, and \"do not\" adds a complement. The description matches \\("+reg.notn+"\\): check each distractor by reading it back into words.",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;}
  var q=mcq(head+"Which description matches the set notation \\("+reg.notn+"\\)?",
    reg.phrase(c),
    [others[0].phrase(c),others[1].phrase(c),others[2].phrase(c)],
    "Read the notation piece by piece: \\(\\cap\\) is \"and\", \\(\\cup\\) is \"or\", and a prime means \"not\". That gives: "+reg.phrase(c)+".",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;
});

/* --- organizing information in Venn diagrams (2.2) --- */
var U7SURVEY=[
  {lA:"Soccer",lB:"Hockey",aP:"play soccer",bP:"play hockey"},
  {lA:"Music",lB:"Art",aP:"take music",bP:"take art"},
  {lA:"French",lB:"Spanish",aP:"study French",bP:"study Spanish"},
  {lA:"Band",lB:"Choir",aP:"are in the band",bP:"are in the choir"},
  {lA:"Basketball",lB:"Volleyball",aP:"play basketball",bP:"play volleyball"}
];
function u7regions(){return {aO:ri(3,16),both:ri(2,11),bO:ri(3,16),none:ri(0,11)};}
E("u7-venn-read",7,["2.2"],1,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),fig=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null);
  var total=r.aO+r.both+r.bO+r.none,union=r.aO+r.both+r.bO;
  var target=pick(["aonly","both","bonly","none","inA","inB","union","total"]);
  var Q={
    aonly:["How many students "+c.aP+" but do not "+c.bP+"?",r.aO,"That is the region inside circle A only, which shows "+r.aO+"."],
    both:["How many students both "+c.aP+" and "+c.bP+"?",r.both,"That is the overlap region, which shows "+r.both+"."],
    bonly:["How many students "+c.bP+" but do not "+c.aP+"?",r.bO,"That is the region inside circle B only, which shows "+r.bO+"."],
    none:["How many students do neither activity?",r.none,"That is the region outside both circles, which shows "+r.none+"."],
    inA:["How many students "+c.aP+" (including those who do both)?",r.aO+r.both,"Everyone in circle A: the A-only region plus the overlap, \\("+r.aO+" + "+r.both+" = "+(r.aO+r.both)+"\\)."],
    inB:["How many students "+c.bP+" (including those who do both)?",r.bO+r.both,"Everyone in circle B: the B-only region plus the overlap, \\("+r.bO+" + "+r.both+" = "+(r.bO+r.both)+"\\)."],
    union:["How many students do at least one of the two activities?",union,"Add the three regions inside the circles: \\("+r.aO+" + "+r.both+" + "+r.bO+" = "+union+"\\). The outside region is excluded."],
    total:["How many students were surveyed in total?",total,"Add all four regions, including the students outside both circles: \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\)."]
  }[target];
  var q=numq("A survey of students produced this Venn diagram (A: "+c.lA+", B: "+c.lB+"). "+Q[0],
    Q[1],0.001,Q[2],{ctx:c.lA,target:target}); q.figure=fig; return q;
});
E("u7-venn-fill",7,["2.2"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var target=pick(["aonly","bonly","none","union"]);
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  if(target==="aonly"){var q=numq(head+"How many students "+c.aP+" only?",
    r.aO,0.001,"Work from the overlap outwards: of the "+nA+" students in A, "+r.both+" are also in B, so \\[ \\begin{aligned} n(A \\cap B') &= n(A) - n(A \\cap B) \\\\ &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  if(target==="bonly"){var q=numq(head+"How many students "+c.bP+" only?",
    r.bO,0.001,"Work from the overlap outwards: of the "+nB+" students in B, "+r.both+" are also in A, so \\[ \\begin{aligned} n(A' \\cap B) &= n(B) - n(A \\cap B) \\\\ &= "+nB+" - "+r.both+" \\\\ &= "+r.bO+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  if(target==="union"){var q=numq(head+"How many students do at least one of the two activities?",
    union,0.001,"Use the union formula so the overlap is not counted twice: \\[ \\begin{aligned} n(A \\cup B) &= n(A) + n(B) - n(A \\cap B) \\\\ &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  var q=numq(head+"How many students do neither activity?",
    r.none,0.001,"First the union, then subtract from the total surveyed: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ n((A \\cup B)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;
});
E("u7-venn-missing",7,["2.2"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
  if(Math.random()<0.5){var q=numq("A Venn diagram for a survey (A: "+c.lA+", B: "+c.lB+") shows "+r.aO+" students in A only, "+r.both+" in both, "+r.bO+" in B only, and "+r.none+" in neither. How many students were surveyed?",
    total,0.001,"Every surveyed student sits in exactly one region, so add all four regions: \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\).",{ctx:c.lA}); q.figure=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null); return q;}
  var q=numq("A survey of "+total+" students (A: "+c.lA+", B: "+c.lB+") has a Venn diagram showing "+r.both+" students in both sets, "+r.bO+" in B only, and "+r.none+" in neither. How many students are in A only?",
    r.aO,0.001,"The four regions must add to the total surveyed, so the missing region is \\("+total+" - "+r.both+" - "+r.bO+" - "+r.none+" = "+r.aO+"\\) students.",{ctx:c.lA}); q.figure=venn2("?",r.both,r.bO,r.none,c.lA,c.lB,null); return q;
});
E("u7-venn-three-read",7,["2.2"],1,"gen",function(){
  var r={a:ri(1,9),b:ri(1,9),c:ri(1,9),ab:ri(0,7),ac:ri(0,7),bc:ri(0,7),abc:ri(1,5),none:ri(0,9)};
  var fig=venn3(r.a,r.b,r.c,r.ab,r.ac,r.bc,r.abc,r.none,"Skiing","Skating","Hockey");
  var target=pick(["bonly","acnotb","allthree","atleasttwo","none"]);
  var Q={
    bonly:["How many students go skating only?",r.b,"The skating-only region of the diagram shows "+r.b+"."],
    acnotb:["How many students ski and play hockey but do not skate?",r.ac,"That region is inside the skiing and hockey circles but outside skating: it shows "+r.ac+"."],
    allthree:["How many students do all three activities?",r.abc,"The centre region, inside all three circles, shows "+r.abc+"."],
    atleasttwo:["How many students do at least two of the three activities?",r.ab+r.ac+r.bc+r.abc,"Add the regions that lie in two or more circles: \\("+r.ab+" + "+r.ac+" + "+r.bc+" + "+r.abc+" = "+(r.ab+r.ac+r.bc+r.abc)+"\\) (the three overlap-only regions plus the centre)."],
    none:["How many students do none of the three activities?",r.none,"That is the region outside all three circles, which shows "+r.none+"."]
  }[target];
  var q=numq("A survey about winter activities produced this three-set Venn diagram. "+Q[0],
    Q[1],0.001,Q[2],{target:target}); q.figure=fig; return q;
});
/* --- contextual problems with set notation (2.5) --- */
E("u7-two-set-problem",7,["2.5"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var target=pick(["none","aonly","bonly"]);
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  var fig=venn2(r.aO,r.both,r.bO,r.none,"A","B");
  var fill="Fill the Venn diagram from the overlap out. The overlap is \\("+r.both+"\\). Taking it out of each set total leaves \\("+nA+" - "+r.both+" = "+r.aO+"\\) in A only and \\("+nB+" - "+r.both+" = "+r.bO+"\\) in B only, with \\("+r.none+"\\) outside both circles:<br><div style='text-align:center'>"+fig+"</div>";
  if(target==="none"){var q=numq(head+"How many students do <b>neither</b> activity?",
    r.none,0.001,fill+"Record the solution in set notation: \\[ \\begin{aligned} n(A \\cup B) &= n(A) + n(B) - n(A \\cap B) \\\\ &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ n((A \\cup B)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\] The overlap is subtracted once in the union formula because those students were counted in both n(A) and n(B).",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;}
  if(target==="aonly"){var q=numq(head+"How many students "+c.aP+" <b>only</b>?",
    r.aO,0.001,fill+"In set notation the question asks for \\(n(A \\cap B')\\): \\[ \\begin{aligned} n(A \\cap B') &= n(A) - n(A \\cap B) \\\\ &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] The students who do both must be removed from the A total.",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;}
  var q=numq(head+"How many students "+c.bP+" <b>only</b>?",
    r.bO,0.001,fill+"In set notation the question asks for \\(n(A' \\cap B)\\): \\[ \\begin{aligned} n(A' \\cap B) &= n(B) - n(A \\cap B) \\\\ &= "+nB+" - "+r.both+" \\\\ &= "+r.bO+" \\end{aligned} \\] The students who do both must be removed from the B total.",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;
});
E("u7-two-set-notation",7,["2.5"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var targets=[
    {label:"n(A \\cap B')",val:r.aO,why:"A but not B: the A total minus the overlap"},
    {label:"n(A' \\cap B)",val:r.bO,why:"B but not A: the B total minus the overlap"},
    {label:"n((A \\cup B)')",val:r.none,why:"outside both sets: the total surveyed minus the union"},
    {label:"n(A \\cup B)",val:union,why:"in at least one set: n(A) + n(B) minus the overlap"},
    {label:"n(A')",val:total-nA,why:"not in A: the total surveyed minus the A total"},
    {label:"n(B')",val:total-nB,why:"not in B: the total surveyed minus the B total"}
  ];
  var t=pick(targets);
  return numq("A survey of "+total+" students has \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\) and \\(n(A \\cap B) = "+r.both+"\\) (A: "+c.lA+", B: "+c.lB+"). Determine \\("+t.label+"\\).",
    t.val,0.001,"Translate the notation first: \\("+t.label+"\\) counts "+t.why+". Here that is \\("+t.val+"\\). Writing out what each symbol means before computing is the reliable route through notation questions.",{ctx:c.lA,target:t.label});
});
E("u7-three-set-problem",7,["2.5"],2,"gen",function(){
  var r={a:ri(2,12),b:ri(2,12),c:ri(2,12),ab:ri(1,8),ac:ri(1,8),bc:ri(1,8),abc:ri(1,5),none:ri(0,10)};
  var nA=r.a+r.ab+r.ac+r.abc,nB=r.b+r.ab+r.bc+r.abc,nC=r.c+r.ac+r.bc+r.abc;
  var pAB=r.ab+r.abc,pAC=r.ac+r.abc,pBC=r.bc+r.abc;
  var union=r.a+r.b+r.c+r.ab+r.ac+r.bc+r.abc,total=union+r.none;
  var head="A school surveyed "+total+" students about three activities: A (skiing), B (skating) and C (hockey). The counts are \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\), \\(n(C) = "+nC+"\\), \\(n(A \\cap B) = "+pAB+"\\), \\(n(A \\cap C) = "+pAC+"\\), \\(n(B \\cap C) = "+pBC+"\\) and \\(n(A \\cap B \\cap C) = "+r.abc+"\\). ";
  var fig=venn3(r.a,r.b,r.c,r.ab,r.ac,r.bc,r.abc,r.none,"A","B","C");
  var fill="Fill the Venn diagram from the centre out. The centre is \\("+r.abc+"\\). Each pair count includes the centre, so the pair-only regions are \\("+pAB+" - "+r.abc+" = "+r.ab+"\\), \\("+pAC+" - "+r.abc+" = "+r.ac+"\\) and \\("+pBC+" - "+r.abc+" = "+r.bc+"\\). Each single-only region is its set total minus the regions overlapping it, for example A only \\(= "+nA+" - "+r.ab+" - "+r.ac+" - "+r.abc+" = "+r.a+"\\). The completed diagram:<br><div style='text-align:center'>"+fig+"</div>";
  var target=pick(["exactlyone","exactlytwo","none","union"]);
  if(target==="exactlytwo"){var v=r.ab+r.ac+r.bc;var q=numq(head+"How many students do <b>exactly two</b> of the activities?",
    v,0.001,fill+"Exactly two of the activities means the three pair-only regions: \\[ \\begin{aligned} \\text{exactly two} &= "+r.ab+" + "+r.ac+" + "+r.bc+" \\\\ &= "+v+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  if(target==="exactlyone"){var v1=r.a+r.b+r.c;var q=numq(head+"How many students do <b>exactly one</b> of the activities?",
    v1,0.001,fill+"Exactly one activity means the three single-only regions: \\[ \\begin{aligned} \\text{exactly one} &= "+r.a+" + "+r.b+" + "+r.c+" \\\\ &= "+v1+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  if(target==="union"){var q=numq(head+"How many students do <b>at least one</b> of the activities?",
    union,0.001,fill+"At least one activity means every region inside the circles: \\[ \\begin{aligned} n(A \\cup B \\cup C) &= "+r.a+" + "+r.b+" + "+r.c+" + "+r.ab+" + "+r.ac+" + "+r.bc+" + "+r.abc+" \\\\ &= "+union+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  var q=numq(head+"How many students do <b>none</b> of the activities?",
    r.none,0.001,fill+"The regions inside the circles add to \\("+union+"\\), so the students outside all three circles are: \\[ \\begin{aligned} n((A \\cup B \\cup C)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;
});
/* --- errors in set solutions (2.6) --- */
E("u7-error-identify",7,["2.6"],2,"var",varset([
  function(){return mcq("In a class, 18 students take music and 14 take art, and 6 students take both. A student writes: <i>n(music ∪ art) = 18 + 14 = 32</i>. What is the error?",
    "The 6 students who take both were counted twice; the overlap must be subtracted once",
    ["The two numbers should have been multiplied instead of added to find the size of the union","There is no error; 32 is correct, since each student is counted only once in the two totals","The overlap should have been added a second time to give 38, since the 6 took both subjects"],
    "The 6 students taking both sit inside both the 18 and the 14, so adding counts them twice. The correct union is \\(18 + 14 - 6 = 26\\). Recognizing double counting is the most common fix needed in set problems.",{});},
  function(){return mcq("A school has 400 students, 130 of whom are in the band. One class in the school has 32 students, 9 of whom are in the band. Asked how many students <b>in the class</b> are not in the band, a student answers 400 − 130 = 270. What is the error?",
    "The student used the whole school as the universal set instead of the class named in the question",
    ["The student should have divided 400 by 32 first to find the size of one class in the whole school","There is no error; 270 is correct, because the complement is always taken from the largest group available","The student should have added 130 and 9, because both numbers count students who are in the band"],
    "A complement is always taken against the universal set of the problem. The question is about the class, so the complement is \\(32 - 9 = 23\\) students. The school-wide numbers are a distraction: they belong to a different universal set.",{});},
  function(){return mcq("Let A = {2, 4, 6, 8} and B = {2, 4, 8}. A student claims B is <b>not</b> a subset of A because B has fewer elements than A. What is the error?",
    "A subset does not need the same number of elements; every element of B is in A, so B is a subset of A",
    ["The student is right; subsets must have the same number of elements, so a smaller set can never be a subset","The error is that A is actually the empty set, because it contains no element that also belongs to B","The error is that 8 is not an element of A, because it appears only at the end of the list for B"],
    "Subset is about membership, not size: B is a subset of A whenever every element of B appears in A. Here 2, 4 and 8 all appear in A, so B is a (proper) subset of A, and its smaller size is exactly what makes it proper.",{});}
]));
E("u7-error-correct",7,["2.6"],3,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),kind=pick(["union","none","aonly"]);
  if(kind==="none")r.none=r.both+ri(0,8);
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  if(kind==="union")return numq(head+"A student writes: \"n(A ∪ B) = "+nA+" + "+nB+" = "+(nA+nB)+", so "+(nA+nB)+" students do at least one activity.\" What is the <b>correct</b> number of students who do at least one activity?",
    union,0.001,"The student's addition counts the "+r.both+" students who do both twice. Correct the error by subtracting the overlap once: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\] Justification for Level 3: the flawed step has to be diagnosed before the correct value can be produced.",{ctx:c.lA,kind:kind});
  if(kind==="none")return numq(head+"A student writes: \"Students doing neither = "+total+" − "+nA+" − "+nB+" = "+(total-nA-nB)+".\" What is the <b>correct</b> number of students who do neither activity?",
    r.none,0.001,"The student subtracted the "+r.both+" overlap students twice (once inside each total). First find the true union, then subtract: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ \\text{neither} &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\] Justification for Level 3: the error is inside the student's method, not just the arithmetic, and it has to be undone before recomputing.",{ctx:c.lA,kind:kind});
  return numq(head+"A student writes: \"The number who "+c.aP+" only is "+nA+".\" What is the <b>correct</b> number who "+c.aP+" only?",
    r.aO,0.001,"The student reported all of A, including the "+r.both+" students who also "+c.bP+". Removing the overlap: \\[ \\begin{aligned} n(A \\cap B') &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] Justification for Level 3: spotting that the given answer answers a different question (all of A, not A only) is the key step.",{ctx:c.lA,kind:kind});
});
E("u7-error-venn",7,["2.6"],1,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
  var kind=pick(["forgotNone","doubleBoth","forgotBoth"]);
  var wrong=kind==="forgotNone"?r.aO+r.both+r.bO:kind==="doubleBoth"?total+r.both:r.aO+r.bO+r.none;
  var why=kind==="forgotNone"?"forgot the "+r.none+" students outside both circles":kind==="doubleBoth"?"counted the "+r.both+" students in the overlap twice":"left out the "+r.both+" students in the overlap";
  var q=numq("A Venn diagram for a survey (A: "+c.lA+", B: "+c.lB+") shows "+r.aO+" students in A only, "+r.both+" in both, "+r.bO+" in B only, and "+r.none+" in neither region. A student reports that "+wrong+" students were surveyed. What is the <b>correct</b> total?",
    total,0.001,"The student "+why+". Every student belongs to exactly one region, so the correct total is \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\) students.",{ctx:c.lA,kind:kind}); q.figure=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null); return q;
});
/* --- applications of set theory (2.7) --- */
E("u7-applications",7,["2.7"],1,"var",varset([
  function(){return mcq("A search engine query uses the terms <b>whales AND kayaking</b>. In set terms, the results page shows pages that are in",
    "the intersection of the two sets of pages, because each result must contain both terms",
    ["the union of the two sets of pages, because either term is enough for a page to appear","the complement of both sets of pages, because AND lists the pages that contain neither term","neither set, because AND removes all pages that contain only one of the two search terms"],
    "AND works like an intersection: a page qualifies only if it belongs to both sets at once. That is why adding an AND term narrows a search instead of widening it, a direct application of set theory in Internet searches.",{});},
  function(){return mcq("An online store filter is set to <b>size = large OR colour = red</b>. The items shown are those that",
    "satisfy at least one of the two conditions, including items that satisfy both",
    ["satisfy both conditions at the same time, just as an AND filter would require","satisfy neither condition, so only items that are not large and not red are shown","satisfy the first condition only, since the colour part of the filter is ignored"],
    "OR works like a union: an item needs to be in at least one of the two sets, and items in the overlap (large and red) are included once. Database and shopping filters are everyday uses of unions and intersections.",{});},
  function(){return mcq("A researcher analyzing survey data wants the respondents who are <b>not</b> in the control group. In set terms she needs",
    "the complement of the control group, taken within the set of all respondents",
    ["the intersection of the control group with the treatment group in the study","the union of all the groups in the study, covering everyone who took part in it","the empty set, because every respondent belongs to some group in the study"],
    "Everyone who is not in the control group, within the universal set of all respondents, is exactly the complement of the control group. Data analysis queries lean on complements in precisely this way.",{});}
]));
E("u7-search-logic",7,["2.7"],2,"gen",function(){
  var r=u7regions(),nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var board=pick(["job board","streaming service","library catalogue","classifieds site"]);
  var tags=pick([["remote","part-time"],["free shipping","on sale"],["fiction","award winner"],["pet friendly","furnished"]]);
  var target=pick(["or","andnot","neither"]);
  var head="On a "+board+", the tag \""+tags[0]+"\" matches "+nA+" listings, the tag \""+tags[1]+"\" matches "+nB+" listings, and "+r.both+" listings carry both tags. The board holds "+total+" listings in total. ";
  if(target==="or")return numq(head+"How many listings match \""+tags[0]+" OR "+tags[1]+"\"?",
    union,0.001,"OR is a union, and listings with both tags must not be counted twice: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\] Search filters run on exactly this calculation.",{board:board,target:target});
  if(target==="andnot")return numq(head+"How many listings match \""+tags[0]+"\" but NOT \""+tags[1]+"\"?",
    r.aO,0.001,"Start with everything matching the first tag and remove the overlap: \\[ \\begin{aligned} n(A \\cap B') &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] Excluding a tag in a search is a complement at work.",{board:board,target:target});
  return numq(head+"How many listings match <b>neither</b> tag?",
    r.none,0.001,"Listings with at least one tag number \\("+nA+" + "+nB+" - "+r.both+" = "+union+"\\), so the listings with neither tag are \\("+total+" - "+union+" = "+r.none+"\\).",{board:board,target:target});
});

/* ---------- Unit-test pool fix, Nov 9, 2026: one Level 3 MC generator (the unit had no Level 3 selected-response entry), two Level 3 CR entries (3 and 2 marks) and three Level 2 CR entries (3, 3 and 2 marks). ---------- */
E("u7-deduction-mc",7,["2.7","2.1"],3,"var",varset([
  function(){
    return mcq("Sets \\(A\\), \\(B\\) and \\(C\\) satisfy \\(A \\subseteq B\\) and \\(B \\cap C = \\varnothing\\). Which statement <b>must</b> be true?",
      "\\(A\\) and \\(C\\) are disjoint",
      ["\\(A\\) is a subset of \\(C\\)",
       "\\(A\\) and \\(C\\) share an element",
       "\\(B\\) is a subset of \\(A \\cup C\\)"],
      "Every element of \\(A\\) is an element of \\(B\\), and no element of \\(B\\) is in \\(C\\). So no element of \\(A\\) can be in \\(C\\): \\(A \\cap C = \\varnothing\\), which means \\(A\\) and \\(C\\) are disjoint.",
      {sc:"subset-chain"});
  },
  function(){
    return mcq("A researcher wants web pages that mention solar panels or wind turbines, but wants to exclude every page that mentions subsidies. Which search string does this?",
      "(solar panels OR wind turbines) NOT subsidies",
      ["solar panels OR (wind turbines NOT subsidies)",
       "solar panels AND wind turbines NOT subsidies",
       "NOT (solar panels OR wind turbines OR subsidies)"],
      "The NOT must apply to the whole OR group: pages about either topic, with subsidy pages removed. In the first distractor the NOT applies only to the wind turbine part, so subsidy pages about solar panels would still appear; the second requires both topics; the third excludes everything.",
      {sc:"search-group"});
  },
  function(){
    return mcq("A report claims that for sets \\(A\\) and \\(B\\), \\(n(A) = 12\\), \\(n(B) = 18\\) and \\(n(A \\cap B) = 15\\). Which statement is correct?",
      "The report is impossible: the intersection cannot have more elements than \\(A\\) itself",
      ["The report is possible if some elements are counted twice",
       "The union of \\(A\\) and \\(B\\) would contain 45 elements",
       "The intersection should be \\(12 + 18 = 30\\) elements"],
      "The intersection \\(A \\cap B\\) is a subset of \\(A\\), so \\(n(A \\cap B) \\leq n(A) = 12\\). A count of 15 is impossible, whatever the report says.",
      {sc:"impossible-data"});
  }
]));
E("u7-exactly-two-cr",7,["2.5"],3,"gen",function(){
  var CTX=[
    {A:"play soccer",B:"play hockey",C:"swim competitively"},
    {A:"take art",B:"take music",C:"study a second language"},
    {A:"play chess",B:"play basketball",C:"run cross country"}
  ];
  var cx=pick(CTX);
  var onlyA=ri(2,12), onlyB=ri(2,12), onlyC=ri(2,12), ab=ri(1,9), ac=ri(1,9), bc=ri(1,9), abc=ri(1,6), none=ri(0,10);
  var nA=onlyA+ab+ac+abc, nB=onlyB+ab+bc+abc, nC=onlyC+ac+bc+abc;
  var pAB=ab+abc, pAC=ac+abc, pBC=bc+abc;
  var total=onlyA+onlyB+onlyC+ab+ac+bc+abc+none;
  var target=pick(["two","one"]);
  var head="In a survey of "+total+" students, let \\(A\\) be the set of students who "+cx.A+", \\(B\\) the set of students who "+cx.B+", and \\(C\\) the set of students who "+cx.C+". The counts are \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\), \\(n(C) = "+nC+"\\), \\(n(A \\cap B) = "+pAB+"\\), \\(n(A \\cap C) = "+pAC+"\\), \\(n(B \\cap C) = "+pBC+"\\), and \\(n(A \\cap B \\cap C) = "+abc+"\\). ";
  if(target==="two"){var q=numq(head+"How many students are in <b>exactly two</b> of the three sets?",
    ab+ac+bc,0.001,
    "Each pairwise count includes the "+abc+" students who are in all three sets. Removing them from each pair gives the exactly-two regions: \\(("+pAB+" - "+abc+") + ("+pAC+" - "+abc+") + ("+pBC+" - "+abc+") = "+ab+" + "+ac+" + "+bc+" = <b>"+(ab+ac+bc)+"</b>\\).",
    {target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  var q=numq(head+"How many students are in <b>exactly one</b> of the three sets?",
    onlyA+onlyB+onlyC,0.001,
    "Work set by set, removing both pairwise overlaps and adding back the all-three group, which was removed twice: only \\(A\\): \\("+nA+" - "+pAB+" - "+pAC+" + "+abc+" = "+onlyA+"\\); only \\(B\\): \\("+nB+" - "+pAB+" - "+pBC+" + "+abc+" = "+onlyB+"\\); only \\(C\\): \\("+nC+" - "+pAC+" - "+pBC+" + "+abc+" = "+onlyC+"\\). The total in exactly one set is \\("+onlyA+" + "+onlyB+" + "+onlyC+" = <b>"+(onlyA+onlyB+onlyC)+"</b>\\).",
    {target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;
});
E("u7-relations-count-cr",7,["2.1","2.4"],3,"gen",function(){
  var nB=ri(12,30), nA=ri(10,30), U=nA+nB, nC=ri(3,nB-4), ans=nB-nC;
  return numq("Sets \\(A\\) and \\(B\\) are disjoint, with \\(n(A \\cup B) = "+U+"\\) and \\(n(A) = "+nA+"\\). Set \\(C\\) is a subset of \\(B\\), and \\(n(C) = "+nC+"\\). How many elements are in \\(B\\) but not in \\(C\\)?",
    ans,0.001,
    "Since \\(A\\) and \\(B\\) are disjoint, \\(n(B) = n(A \\cup B) - n(A) = "+U+" - "+nA+" = "+nB+"\\). Since \\(C \\subseteq B\\), the elements of \\(B\\) outside \\(C\\) number \\("+nB+" - "+nC+" = <b>"+ans+"</b>\\).",
    {nA:nA,nB:nB,nC:nC});
});
E("u7-two-set-totals-cr",7,["2.2","2.4"],2,"gen",function(){
  var c=pick(U7SURVEY), r=u7regions();
  var nA=r.aO+r.both, total=r.aO+r.both+r.bO+r.none, union=r.aO+r.both+r.bO, nB=r.bO+r.both;
  return numq("In a survey of "+total+" students, "+nA+" "+c.aP+", "+r.both+" students do both activities, and "+r.none+" do neither. How many students "+c.bP+" in total?",
    nB,0.001,
    "The number doing at least one activity is \\("+total+" - "+r.none+" = "+union+"\\). Of the "+nA+" students in A, "+r.both+" are also in B, so A only is \\("+nA+" - "+r.both+" = "+r.aO+"\\). Then B only is \\("+union+" - "+r.aO+" - "+r.both+" = "+r.bO+"\\), and the total in B is \\("+r.bO+" + "+r.both+" = <b>"+nB+"</b>\\).",
    {ctx:c.lA});
});
E("u7-symmetric-difference-cr",7,["2.3"],2,"gen",function(){
  var c=pick(U7SURVEY), r=u7regions();
  var nA=r.aO+r.both, nB=r.bO+r.both, ans=r.aO+r.bO;
  return numq("In a survey, "+nA+" students "+c.aP+", "+nB+" students "+c.bP+", and "+r.both+" students do both. How many students are in \\(A\\) or \\(B\\) but <b>not</b> in both (that is, they do exactly one of the two activities)?",
    ans,0.001,
    "Remove the overlap from each total: A only is \\("+nA+" - "+r.both+" = "+r.aO+"\\), and B only is \\("+nB+" - "+r.both+" = "+r.bO+"\\). Together, the students in exactly one set number \\("+r.aO+" + "+r.bO+" = <b>"+ans+"</b>\\).",
    {ctx:c.lA});
});
E("u7-subset-difference-cr",7,["2.1"],2,"gen",function(){
  var nA=ri(25,60), nB=ri(5,nA-8), target=pick(["diff","inter","union"]);
  var head="Set \\(B\\) is a subset of set \\(A\\), with \\(n(A) = "+nA+"\\) and \\(n(B) = "+nB+"\\). ";
  if(target==="diff") return numq(head+"How many elements are in \\(A\\) but not in \\(B\\)?",
    nA-nB,0.001,
    "Every element of \\(B\\) is already in \\(A\\), so the elements of \\(A\\) outside \\(B\\) number \\("+nA+" - "+nB+" = <b>"+(nA-nB)+"</b>\\).",
    {target:target});
  if(target==="inter") return numq(head+"What is \\(n(A \\cap B)\\)?",
    nB,0.001,
    "Since \\(B \\subseteq A\\), every element of \\(B\\) is in both sets, so \\(A \\cap B = B\\) and \\(n(A \\cap B) = <b>"+nB+"</b>\\).",
    {target:target});
  return numq(head+"What is \\(n(A \\cup B)\\)?",
    nA,0.001,
    "Since \\(B \\subseteq A\\), the union adds nothing beyond \\(A\\) itself: \\(A \\cup B = A\\), so \\(n(A \\cup B) = <b>"+nA+"</b>\\).",
    {target:target});
});

/* ----- bank-u8.js ----- */
// Math 3201 Unit 8 Counting Methods question bank
// CRMARKS: u8-arrange-all=1
// CRMARKS: u8-comb-r=1
// CRMARKS: u8-comb-two-group=2
// CRMARKS: u8-committee-atleast=3
// CRMARKS: u8-factorial-equation=2
// CRMARKS: u8-factorial-fraction=2
// CRMARKS: u8-factorial-value=1
// CRMARKS: u8-fcp-cases=3
// CRMARKS: u8-fcp-context=1
// CRMARKS: u8-fcp-pattern=1
// CRMARKS: u8-fcp-restricted=3
// CRMARKS: u8-fixed-position=2
// CRMARKS: u8-identical-perm=2
// CRMARKS: u8-mixed-roles=2
// CRMARKS: u8-pathways=2
// CRMARKS: u8-pathways-context=3
// CRMARKS: u8-perm-or-comb=1
// CRMARKS: u8-perm-r=1
// CRMARKS: u8-prob-comb=2
// CRMARKS: u8-prob-comb-hard=3
// CRMARKS: u8-reverse-count=2
// CRMARKS: u8-together-apart=3
// CRMARKS: u8-tree-diagram=1
// CRMARKS: u8-tree-outcomes=2
/* ================= Unit 8: Counting Methods ================= */
function fact(n){var f=1;for(var i=2;i<=n;i++)f*=i;return f;}
function nPr(n,r){return fact(n)/fact(n-r);}
function nCr(n,r){return fact(n)/(fact(r)*fact(n-r));}

/* --- graphic organizers and the counting principle (9.16, 9.17, 9.18, 9.19) --- */
E("u8-tree-diagram",8,["9.16"],1,"gen",function(){
  var use3=Math.random()<0.6;
  var ctx=pick([
    {parts:use3?[[ri(2,5),"shirts"],[ri(2,5),"pairs of pants"],[ri(2,4),"hats"]]:[[ri(2,5),"shirts"],[ri(2,5),"pairs of pants"]],lead:"An outfit is built from"},
    {parts:use3?[[ri(2,5),"mains"],[ri(2,5),"sides"],[ri(2,4),"drinks"]]:[[ri(2,5),"mains"],[ri(2,5),"sides"]],lead:"A meal is built from"},
    {parts:use3?[[ri(2,4),"bus routes"],[ri(2,4),"ferry crossings"],[ri(2,3),"taxi companies"]]:[[ri(2,4),"bus routes"],[ri(2,4),"ferry crossings"]],lead:"A trip is built from"},
    {parts:use3?[[ri(2,6),"symbols in the first position"],[ri(2,6),"symbols in the second position"],[ri(2,5),"symbols in the third position"]]:[[ri(2,6),"symbols in the first position"],[ri(2,6),"symbols in the second position"]],lead:"A code wheel uses"}
  ]);
  var desc=ctx.parts.map(function(p){return p[0]+" "+p[1];});
  var descText=desc.length===2?desc.join(" and "):desc[0]+", "+desc[1]+" and "+desc[2];
  var counts=ctx.parts.map(function(p){return p[0];});
  var total=counts.reduce(function(x,y){return x*y;},1);
  var titles=ctx.parts.map(function(pp,ix){var t=pp[1];if(t.indexOf("symbols in the ")===0)return "Position "+(ix+1);if(t.indexOf("pairs of ")===0)t=t.slice(9);return t.charAt(0).toUpperCase()+t.slice(1);});
  var q=numq(ctx.lead+" "+descText+". A tree diagram is used to organize the choices. How many different outcomes does the tree have?",
    total,0.001,
    "Each stage of the tree multiplies the number of branches: "+counts.join(" × ")+" = "+total+" outcomes. The tree makes the multiplication visible: every choice at one stage is paired with every choice at the next.",
    {lead:ctx.lead,stages:counts.length});
  var tf=treeSVG(ctx.parts.map(function(pp,ix){var opts=[];for(var jj=1;jj<=pp[0];jj++)opts.push(""+jj);return {title:titles[ix],options:opts};}),{maxLeaves:48});
  if(tf)q.figure=tf;
  return q;
});
E("u8-tree-outcomes",8,["9.16"],1,"gen",function(){
  function coinDie(){
    var conds=[],side,d,v,k;
    ["H","T"].forEach(function(s){var sn=s==="H"?"head":"tail";
      conds.push({d:"a "+sn+" and an even number",f:function(o){return o[0]===s&&+o[1]%2===0;}});
      conds.push({d:"a "+sn+" and an odd number",f:function(o){return o[0]===s&&+o[1]%2===1;}});
      for(v=1;v<=6;v++){(function(vv){conds.push({d:"a "+sn+" and a "+vv,f:function(o){return o[0]===s&&+o[1]===vv;}});})(v);}
    });
    for(k=2;k<=5;k++){(function(kk){conds.push({d:"a head and a number greater than "+kk,f:function(o){return o[0]==="H"&&+o[1]>kk;}});})(k);}
    for(k=3;k<=6;k++){(function(kk){conds.push({d:"a tail and a number less than "+kk,f:function(o){return o[0]==="T"&&+o[1]<kk;}});})(k);}
    conds.push({d:"a prime number on the die (either coin result)",f:function(o){return [2,3,5].indexOf(+o[1])>=0;}});
    return {desc:"A coin is tossed and then a standard die is rolled",stages:[["H","T"],["1","2","3","4","5","6"]],titles:["Coin","Die"],lf:function(pp){return pp[0]+pp[1];},conds:conds};
  }
  function diceDice(){
    var conds=[],s,k;
    for(s=5;s<=9;s++){(function(ss){conds.push({d:"a total of "+ss,f:function(o){return +o[0]+ +o[1]===ss;}});})(s);}
    for(k=8;k<=10;k++){(function(kk){conds.push({d:"a total greater than "+kk,f:function(o){return +o[0]+ +o[1]>kk;}});})(k);}
    conds.push({d:"doubles (the same number on both dice)",f:function(o){return o[0]===o[1];}});
    conds.push({d:"two even numbers",f:function(o){return +o[0]%2===0&&+o[1]%2===0;}});
    conds.push({d:"two odd numbers",f:function(o){return +o[0]%2===1&&+o[1]%2===1;}});
    conds.push({d:"one even and one odd number",f:function(o){return (+o[0]%2)!==(+o[1]%2);}});
    conds.push({d:"a larger number on the first die than on the second",f:function(o){return +o[0]>+o[1];}});
    return {desc:"Two standard dice are rolled",stages:[["1","2","3","4","5","6"],["1","2","3","4","5","6"]],titles:["First die","Second die"],lf:function(pp){return "("+pp[0]+", "+pp[1]+")";},conds:conds};
  }
  function spinnerCoin(){
    var conds=[],v;
    ["H","T"].forEach(function(s){var sn=s==="H"?"head":"tail";
      conds.push({d:"a "+sn+" and an odd number",f:function(o){return o[1]===s&&+o[0]%2===1;}});
      conds.push({d:"a "+sn+" and an even number",f:function(o){return o[1]===s&&+o[0]%2===0;}});
      conds.push({d:"a "+sn+" and a number greater than 2",f:function(o){return o[1]===s&&+o[0]>2;}});
      for(v=1;v<=4;v++){(function(vv){conds.push({d:"a "+sn+" and a "+vv,f:function(o){return o[1]===s&&+o[0]===vv;}});})(v);}
    });
    return {desc:"A spinner numbered 1 to 4 is spun and then a coin is tossed",stages:[["1","2","3","4"],["H","T"]],titles:["Spinner","Coin"],lf:function(pp){return pp[0]+pp[1];},conds:conds};
  }
  var T=pick([coinDie(),diceDice(),spinnerCoin()]);
  var cond=pick(T.conds),count=0,totalOut=0;
  T.stages[0].forEach(function(x){T.stages[1].forEach(function(y){totalOut++;if(cond.f([x,y]))count++;});});
  var q=numq(T.desc+". Using a tree diagram (or an organized list), how many outcomes show "+cond.d+"?",
    count,0.001,
    "The tree has "+T.stages[0].length+" × "+T.stages[1].length+" = "+totalOut+" outcomes in total. Following only the branches that match the condition gives "+count+" of them. An organized count beats guessing: list the matching first-stage results and count the second-stage results that complete each one.",
    {t:T.desc.slice(0,14),cond:cond.d});
  q.figure=treeSVG(T.stages.map(function(st,ix){return {title:T.titles[ix],options:st};}),{leafLabel:T.lf});
  return q;
});
E("u8-fcp-pattern",8,["9.17"],1,"gen",function(){
  if(Math.random()<0.5){
    var k=pick([2,3,4,5,6]),m=pick([5,6,7,8].filter(function(x){return x!==k;}));
    return mcq("A spinner with "+k+" sections is spun repeatedly. Spinning once gives "+k+" outcomes, spinning twice gives "+Math.pow(k,2)+", and spinning three times gives "+Math.pow(k,3)+". Following this pattern, how many outcomes are there for "+m+" spins?",
      MV(Math.pow(k,m)),[MV(k*m),MV(k+m),MV(Math.pow(m,k))],
      "Each extra spin multiplies the count by "+k+" again: the counts are powers of "+k+", so "+m+" spins give \\("+k+"^{"+m+"} = "+Math.pow(k,m)+"\\) outcomes. This repeated multiplication is the Fundamental Counting Principle in action.",{k:k,m:m});
  }
  var a=ri(2,5),b=ri(2,6),s=pick([2,3,4,5]);
  return mcq("A sandwich counter offers "+a+" kinds of bread and "+b+" fillings. A tree diagram shows "+a+" × "+b+" = "+(a*b)+" sandwiches. The counter then adds "+s+" kinds of sauce. What is the correct way to count the new total?",
    "Multiply the previous total by "+s+": "+(a*b)+" × "+s+" = "+(a*b*s),
    ["Add the choices: "+a+" + "+b+" + "+s+" = "+(a+b+s)+", all at once","Multiply only the newest choices: "+s+" × "+s+" = "+(s*s),"Add "+s+" to the previous total: "+(a*b)+" + "+s+" = "+(a*b+s)+" in all"],
    "Adding a stage to a counting problem multiplies the total by the number of choices at that stage; it never adds them. Generalizing this pattern from small cases is exactly how the Fundamental Counting Principle is built.",{a:a,b:b,s:s});
});
E("u8-assumptions",8,["9.18"],1,"var",varset([
  function(){return mcq("A student counts the possible three-letter codes from the alphabet as 26 × 26 × 26. What <b>assumption</b> is built into this count?",
    "Letters are allowed to repeat in the code",
    ["The code cannot contain any vowels","Each position must use a different letter","The order of the letters in the code does not matter"],
    "Using 26 choices at every position, including positions after a letter has already been used, only works if repetition is allowed. If letters could not repeat, the count would be 26 × 25 × 24. Naming the assumption matters because the count collapses if the assumption is false.",{});},
  function(){return mcq("A student counts outfits as 4 shirts × 3 pants × 2 hats = 24 outfits. What <b>assumption</b> does this count make?",
    "Every shirt can be worn with every pair of pants and every hat; there are no clashes or restrictions",
    ["The student already owns exactly 24 outfits, one for every combination the multiplication produces in total","Each item can be worn only once per week, so no shirt, pants or hat is ever repeated in an outfit","A hat must always be worn, so every outfit counted in the total includes one of the two hats"],
    "The multiplication pairs every choice at each stage with every choice at the others. If some shirt could not be worn with some pants, those branches would have to be removed and the product would overcount. The count is only as good as this no-restrictions assumption.",{});},
  function(){return mcq("A student counts the arrangements of 5 people in a line as 5! = 120. One <b>assumption</b> behind this count is that",
    "the 5 people are all different from one another, so swapping any two of them makes a new arrangement",
    ["the line must contain exactly 5 chairs, and each person must have a chair of their own to stand by in the line","no two of the people are friends, because friends standing together would count as one unit","the people are standing in alphabetical order, so only the arrangement in name order is counted"],
    "Factorial counting treats every swap as a new arrangement, which requires the people to be distinguishable. If two of the five were identical (like identical twins in matching outfits being treated as interchangeable), arrangements would have to be divided to correct the overcount.",{});}
]));
E("u8-fcp-context",8,["9.19"],1,"gen",function(){
  var T=pick(["pin","code","outfit","routes","menu","password"]);
  if(T==="pin"){var d=pick([4,5,6]);return numq("A bank PIN is "+d+" digits long, and digits may be repeated. How many different PINs are possible?",
    Math.pow(10,d),0.001,"Each of the "+d+" positions has 10 choices, and digits may repeat, so the Fundamental Counting Principle gives \\(10^{"+d+"} = "+Math.pow(10,d)+"\\) PINs.",{T:T});}
  if(T==="code"){var L=pick([2,3]),D=pick([2,3]);return numq("A product code consists of "+L+" letter(s) followed by "+D+" digit(s). Letters and digits may both be repeated. How many different codes are possible?",
    Math.pow(26,L)*Math.pow(10,D),0.001,"Multiply the choices at each position: 26 choices for each of the "+L+" letter positions and 10 for each of the "+D+" digit positions: \\(26^{"+L+"} \\times 10^{"+D+"} = "+(Math.pow(26,L)*Math.pow(10,D))+"\\) codes.",{T:T});}
  if(T==="outfit"){var a=ri(3,6),b=ri(3,6),c=ri(2,4);return numq("A traveller packs "+a+" shirts, "+b+" pairs of pants and "+c+" jackets. Any shirt can be worn with any pants and any jacket. How many different outfits are possible?",
    a*b*c,0.001,"Multiply the independent choices: \\("+a+" \\times "+b+" \\times "+c+" = "+(a*b*c)+"\\) outfits.",{T:T});}
  if(T==="routes"){var a=ri(2,6),b=ri(2,6);return numq("To travel from town A to town C, a driver must pass through town B. There are "+a+" roads from A to B and "+b+" roads from B to C. How many different routes from A to C are there?",
    a*b,0.001,"Each first-leg road can be paired with each second-leg road: \\("+a+" \\times "+b+" = "+(a*b)+"\\) routes.",{T:T});}
  if(T==="menu"){var a=ri(2,5),b=ri(3,7),c=ri(2,5);return numq("A diner offers "+a+" appetizers, "+b+" main courses and "+c+" desserts. A meal consists of one of each. How many different meals are possible?",
    a*b*c,0.001,"Multiply the choices for the three independent courses: \\("+a+" \\times "+b+" \\times "+c+" = "+(a*b*c)+"\\) meals.",{T:T});}
  var len=pick([3,4]);return numq("A password is "+len+" characters long. Each character can be any digit or any lowercase letter (36 choices), and characters may repeat. How many different passwords are possible?",
    Math.pow(36,len),0.001,"Each of the "+len+" positions has 36 choices with repetition allowed: \\(36^{"+len+"} = "+Math.pow(36,len)+"\\) passwords.",{T:T});
});
function enumNums(D,L,pred,unitFixed){
  var count=0;
  function rec(pos,used,val,units){
    if(pos===L){if(pred(val)&&(unitFixed===null||units===unitFixed))count++;return;}
    for(var i=0;i<D.length;i++){var d=D[i];
      if(used.indexOf(d)>=0)continue;
      if(pos===0&&d===0&&L>1)continue;
      rec(pos+1,used.concat([d]),val*10+d,pos===L-1?d:units);
    }
  }
  rec(0,[],0,null);return count;
}
function rangeDigits(a,b){var D=[];for(var i=a;i<=b;i++)D.push(i);return D;}
E("u8-fcp-restricted",8,["9.19"],3,"gen",function(){
  var T=pick(["digitsNoZero","digitsZero","mult5","plate","pin","code","people"]);
  var J=" Justification for Level 3: the restriction changes the stage counts or forces a case split, so the counting has to be restructured before any multiplication.";
  if(T==="digitsNoZero"){
    var set=pick([[1,9],[1,8],[1,7],[1,6],[2,9]]),D=rangeDigits(set[0],set[1]),m=D.length;
    var L=m>=7?pick([3,4]):3,even=Math.random()<0.5;
    var pc=D.filter(function(d){return even?d%2===0:d%2===1;}).length;
    var factors=[pc];for(var i=1;i<L;i++)factors.push(m-i);
    var ans=factors.reduce(function(x,y){return x*y;},1);
    return numq(L+"-digit numbers are formed from the digits "+set[0]+" to "+set[1]+", with no digit repeated. How many of these numbers are <b>"+(even?"even":"odd")+"</b>?",
      ans,0.001,"Fill the most restricted position first: the units digit must be "+(even?"even":"odd")+", giving "+pc+" choices from this set. Each remaining position then loses one choice as digits are used: "+factors.join(" × ")+" = "+ans+". Filling left to right without planning runs into trouble at the units position."+J,{T:T,set:set.join("-"),L:L,even:even});
  }
  if(T==="digitsZero"){
    var setZ=pick([[0,9],[0,8],[0,7]]),DZ=rangeDigits(setZ[0],setZ[1]),mz=DZ.length,evenZ=Math.random()<0.5;
    var pred=evenZ?function(v){return v%2===0;}:function(v){return v%2===1;};
    var totZ=enumNums(DZ,3,pred,null);
    if(evenZ){
      var case0=enumNums(DZ,3,pred,0),caseR=totZ-case0;
      var ec=DZ.filter(function(d){return d%2===0&&d!==0;}).length;
      return numq("Three-digit numbers are formed from the digits 0 to "+setZ[1]+", with no digit repeated. How many of these numbers are <b>even</b>?",
        totZ,0.001,"Split into cases, because 0 behaves differently in the units and hundreds positions. Ends in 0: the hundreds digit has "+(mz-1)+" choices and the tens digit "+(mz-2)+", giving "+case0+" numbers. Ends in an even digit other than 0 ("+ec+" choices): the hundreds digit cannot be 0 or the units digit ("+(mz-2)+" choices) and the tens digit has "+(mz-2)+", giving "+caseR+" numbers. Total: "+case0+" + "+caseR+" = "+totZ+"."+J,{T:T,set:setZ.join("-")});
    }
    var oc=DZ.filter(function(d){return d%2===1;}).length;
    return numq("Three-digit numbers are formed from the digits 0 to "+setZ[1]+", with no digit repeated. How many of these numbers are <b>odd</b>?",
      totZ,0.001,"Fill the units position first: "+oc+" odd digits are available. The hundreds digit cannot be 0 or the units digit ("+(mz-2)+" choices), and the tens digit has "+(mz-2)+" choices. Total: "+oc+" × "+(mz-2)+" × "+(mz-2)+" = "+totZ+"."+J,{T:T,set:setZ.join("-")});
  }
  if(T==="mult5"){
    var mset=pick([[[1,9],4],[[1,8],3],[[0,9],3]]);
    var DM=rangeDigits(mset[0][0],mset[0][1]),LM=mset[1];
    var predM=function(v){return v%5===0;};
    var u5=enumNums(DM,LM,predM,5),u0=DM.indexOf(0)>=0?enumNums(DM,LM,predM,0):0,totM=u5+u0;
    return numq(LM+"-digit numbers are formed from the digits "+mset[0][0]+" to "+mset[0][1]+", with no digit repeated. How many of these numbers are <b>multiples of 5</b>?",
      totM,0.001,"A multiple of 5 must end in 0 or 5, so split by the units digit. Ending in 5: fixing the units digit leaves the other positions to be filled from the remaining digits (with the leading digit never 0): "+u5+" numbers."+(u0>0?" Ending in 0: "+u0+" numbers.":" The set has no 0, so this is the only case.")+" Total: "+totM+"."+J,{T:T});
  }
  if(T==="plate"){
    var Lp=pick([2,3]),Dp=pick([2,3]),rule=pick(["lettersNR","bothNR","digitsNR"]);
    var lf=rule==="digitsNR"?Math.pow(26,Lp):nPr(26,Lp),df=rule==="lettersNR"?Math.pow(10,Dp):nPr(10,Dp);
    var ruleText=rule==="lettersNR"?"The letters cannot repeat, but the digits may repeat":rule==="bothNR"?"Neither the letters nor the digits can repeat":"The letters may repeat, but the digits cannot repeat";
    return numq("A licence plate has "+Lp+" letters followed by "+Dp+" digits. "+ruleText+". How many different plates are possible?",
      lf*df,0.001,"Count the two halves with their own rules: the letters give "+lf+" possibilities and the digits give "+df+", and the halves are independent, so multiply: "+(lf*df)+". Positions where repetition is banned shrink (26, 25, ...) while positions allowing it stay constant."+J,{T:T,Lp:Lp,Dp:Dp,rule:rule});
  }
  if(T==="pin"){
    var lenp=pick([4,5,6]),valp=nPr(10,lenp),facp=[];for(var i=0;i<lenp;i++)facp.push(10-i);
    return numq("A PIN is "+lenp+" digits long and no digit may be repeated. How many different PINs are possible?",
      valp,0.001,"Each position loses a choice as digits are used up: "+facp.join(" × ")+" = "+valp+". (A PIN may start with 0, so the first position keeps all 10 choices.)"+J,{T:T,len:lenp});
  }
  if(T==="code"){
    var ac=pick([2,3]),bc=pick([1,2]),dNR=Math.random()<0.5;
    var lv=nPr(26,ac),dv=dNR?nPr(10,bc):Math.pow(10,bc);
    return numq("A code consists of "+ac+" letters (no letter repeated) followed by "+bc+" digit(s)"+(dNR?" (no digit repeated)":" (digits may repeat)")+". How many different codes are possible?",
      lv*dv,0.001,"The letters contribute "+lv+" possibilities ("+ac+" shrinking choices from 26) and the digits contribute "+dv+", so the total is "+(lv*dv)+". The two parts follow different repetition rules and must be counted separately."+J,{T:T,ac:ac,bc:bc,dNR:dNR});
  }
  var np=pick([5,6,7]),valpp=(np-2)*fact(np-1);
  return numq(np+" people are arranging themselves in a line. In how many arrangements is one particular person <b>not</b> at either end?",
    valpp,0.001,"Place the restricted person first: they have "+(np-2)+" allowed positions (any except the two ends). The other "+(np-1)+" people then arrange freely in \\("+(np-1)+"! = "+fact(np-1)+"\\) ways. Total: \\("+(np-2)+" \\times "+fact(np-1)+" = "+valpp+"\\)."+J,{T:T,n:np});
});
E("u8-fcp-cases",8,["9.19"],3,"gen",function(){
  var T=pick(["either","startletter","mixed"]);
  var J=" Justification for Level 3: choosing between multiplying (choices in sequence) and adding (either/or cases) at each step is a structural decision, not a formula recall.";
  if(T==="either"){
    var thing=pick(["locker code","bike lock code","gym pass code","storage unit code"]);
    var a=pick([2,3,4]),b=pick([2,3,4,5]),v1=Math.pow(26,a),v2=Math.pow(10,b);
    return numq("A "+thing+" is in one of two formats: either "+a+" letters (repeats allowed) or "+b+" digits (repeats allowed). How many different codes are possible in total?",
      v1+v2,0.001,"The two formats are alternatives, so count each and add: \\(26^{"+a+"} = "+v1+"\\) letter codes and \\(10^{"+b+"} = "+v2+"\\) digit codes, for a total of "+(v1+v2)+"."+J,{T:T,thing:thing});
  }
  if(T==="startletter"){
    var X=pick(["Z","B","M","S"]),d=pick([2,3]);
    return numq("A code consists of one letter followed by "+d+" digits (repeats allowed). How many codes begin with a vowel or with the letter "+X+"?",
      6*Math.pow(10,d),0.001,"The first letter can be any of the 5 vowels or the letter "+X+": 6 choices, and no letter is both, so the cases do not overlap. Each digit position then has 10 choices: \\(6 \\times 10^{"+d+"} = "+(6*Math.pow(10,d))+"\\)."+J,{T:T,X:X});
  }
  var a1=pick([1,2]),b1=pick([2,3]),b2=pick([2,3]),a2=pick([1,2]);
  var w1=Math.pow(26,a1)*Math.pow(10,b1),w2=Math.pow(10,b2)*Math.pow(26,a2);
  return numq("A code is in one of two formats: either "+a1+" letter(s) followed by "+b1+" digits, or "+b2+" digits followed by "+a2+" letter(s). Repeats are allowed throughout. How many different codes are possible in total?",
    w1+w2,0.001,"Count each format with the counting principle and add the alternatives: format one gives \\(26^{"+a1+"} \\times 10^{"+b1+"} = "+w1+"\\) and format two gives \\(10^{"+b2+"} \\times 26^{"+a2+"} = "+w2+"\\), for a total of "+(w1+w2)+"."+J,{T:T});
});
/* --- factorials (9.20, 9.21, 9.22) --- */
E("u8-factorial-value",8,["9.20"],1,"gen",function(){
  var verb=pick(["Determine the value of","Evaluate"]);
  var shape=pick(["plain","times","plusone","minusprev","plusprev"]);
  if(shape==="plain"){
    var n=pick([0,1,2,3,4,5,6,7,8,9]);
    return numq(verb+" \\("+n+"!\\).",
      fact(n),0.001,(n<=1?"By definition, \\("+n+"! = 1\\): the empty product and the single factor both give 1, a convention that keeps the permutation and combination formulas working.":"\\("+n+"! = "+Array.from({length:n},function(_,i){return n-i;}).join(" \\times ")+" = "+fact(n)+"\\). A factorial multiplies the whole numbers from "+n+" down to 1."),{shape:shape,n:n});
  }
  if(shape==="times"){
    var k=pick([2,3,4]),n2=pick([3,4,5,6]);
    return numq(verb+" \\("+k+" \\times "+n2+"!\\).",
      k*fact(n2),0.001,"Work out the factorial first: \\("+n2+"! = "+fact(n2)+"\\), then multiply by "+k+": \\("+k+" \\times "+fact(n2)+" = "+(k*fact(n2))+"\\).",{shape:shape,n:n2,k:k});
  }
  if(shape==="plusone"){
    var n3=pick([1,2,3,4,5,6,7]);
    return numq(verb+" \\(("+n3+" + 1)!\\).",
      fact(n3+1),0.001,"Simplify inside first: \\(("+n3+" + 1)! = "+(n3+1)+"! = "+fact(n3+1)+"\\).",{shape:shape,n:n3});
  }
  if(shape==="minusprev"){
    var n4=pick([3,4,5,6,7]);
    return numq(verb+" \\("+n4+"! - "+(n4-1)+"!\\).",
      fact(n4)-fact(n4-1),0.001,"Evaluate each factorial: \\("+n4+"! = "+fact(n4)+"\\) and \\("+(n4-1)+"! = "+fact(n4-1)+"\\), so the difference is \\("+fact(n4)+" - "+fact(n4-1)+" = "+(fact(n4)-fact(n4-1))+"\\).",{shape:shape,n:n4});
  }
  var n5=pick([3,4,5,6,7]);
  return numq(verb+" \\("+n5+"! + "+(n5-1)+"!\\).",
    fact(n5)+fact(n5-1),0.001,"Evaluate each factorial: \\("+n5+"! = "+fact(n5)+"\\) and \\("+(n5-1)+"! = "+fact(n5-1)+"\\), so the sum is \\("+fact(n5)+" + "+fact(n5-1)+" = "+(fact(n5)+fact(n5-1))+"\\).",{shape:shape,n:n5});
});
E("u8-factorial-fraction",8,["9.21"],2,"gen",function(){
  if(Math.random()<0.5){
    var m=pick([2,3,4,5,6,7]),k=pick([1,2,3]),n=m+k,val=1,i;
    for(i=m+1;i<=n;i++)val*=i;
    var prod=[];for(i=n;i>m;i--)prod.push(i);
    var askV=pick([["Simplify"," and give its value."],["Evaluate","."],["Calculate","."]]);
    return numq(askV[0]+" \\(\\frac{"+n+"!}{"+m+"!}\\)"+askV[1],
      val,0.001,"Expand and cancel the shared factors: \\(\\frac{"+n+"!}{"+m+"!} = "+prod.join(" \\times ")+" = "+val+"\\). Everything from "+m+" down cancels between the numerator and the denominator.",{n:n,m:m});
  }
  var shape=pick(["p1","p2","p3","n1","p2b","n1b","n2","p4","two","pmix","p3b","n2b","three","p5","n3"]);
  if(shape==="p1")return mcq("Simplify \\(\\frac{(n + 1)!}{n!}\\).",
    MV("n + 1"),[MV("n"),MV("1"),MV("(n + 1) \\times n")],
    "Expand the numerator one step: \\((n + 1)! = (n + 1) \\times n!\\), so the \\(n!\\) cancels and only \\(n + 1\\) remains.",{shape:shape});
  if(shape==="p2")return mcq("Simplify \\(\\frac{(n + 2)!}{n!}\\).",
    MV("(n + 2)(n + 1)"),[MV("(n + 1) + 1"),MV("(n + 2)(n + 2)"),MV("2n + 3")],
    "Expand the numerator two steps: \\((n + 2)! = (n + 2)(n + 1) \\times n!\\), so the \\(n!\\) cancels and \\((n + 2)(n + 1)\\) remains.",{shape:shape});
  if(shape==="p3")return mcq("Simplify \\(\\frac{(n + 3)!}{(n + 1)!}\\).",
    MV("(n + 3)(n + 2)"),[MV("n + 3"),MV("(n + 3)(n + 2)(n + 1)"),MV("2n + 5")],
    "Expand the numerator down to the denominator: \\((n + 3)! = (n + 3)(n + 2) \\times (n + 1)!\\), so \\((n + 1)!\\) cancels and \\((n + 3)(n + 2)\\) remains.",{shape:shape});
  if(shape==="p2b")return mcq("Simplify \\(\\frac{(n + 2)!}{(n + 1)!}\\).",
    MV("n + 2"),[MV("n + 1"),MV("1"),MV("(n + 2)(n + 1)")],
    "Expand the numerator one step: \\((n + 2)! = (n + 2) \\times (n + 1)!\\), so the \\((n + 1)!\\) cancels and only \\(n + 2\\) remains.",{shape:shape});
  if(shape==="n1b")return mcq("Simplify \\(\\frac{(n - 1)!}{(n - 2)!}\\).",
    MV("n - 1"),[MV("n - 2"),MV("1"),MV("(n - 1)(n - 2)")],
    "Expand the numerator one step: \\((n - 1)! = (n - 1) \\times (n - 2)!\\), so the \\((n - 2)!\\) cancels and only \\(n - 1\\) remains.",{shape:shape});
  if(shape==="n2")return mcq("Simplify \\(\\frac{n!}{(n - 2)!}\\).",
    MV("n(n - 1)"),[MV("n - 1"),MV("n^2"),MV("n(n - 1)(n - 2)")],
    "Expand the numerator two steps: \\(n! = n(n - 1) \\times (n - 2)!\\), so the \\((n - 2)!\\) cancels and \\(n(n - 1)\\) remains.",{shape:shape});
  if(shape==="p4")return mcq("Simplify \\(\\frac{(n + 4)!}{(n + 2)!}\\).",
    MV("(n + 4)(n + 3)"),[MV("n + 4"),MV("(n + 4)(n + 3)(n + 2)"),MV("2n + 7")],
    "Expand the numerator down to the denominator: \\((n + 4)! = (n + 4)(n + 3) \\times (n + 2)!\\), so \\((n + 2)!\\) cancels and \\((n + 4)(n + 3)\\) remains.",{shape:shape});
  if(shape==="two")return mcq("Simplify \\(\\frac{(2n)!}{(2n - 1)!}\\).",
    MV("2n"),[MV("1"),MV("2n - 1"),MV("(2n)(2n - 1)")],
    "Expand the numerator one step: \\((2n)! = 2n \\times (2n - 1)!\\), so the \\((2n - 1)!\\) cancels and only \\(2n\\) remains.",{shape:shape});
  if(shape==="pmix")return mcq("Simplify \\(\\frac{(n + 1)!}{(n - 1)!}\\).",
    MV("(n + 1)n"),[MV("n + 1"),MV("n^2"),MV("(n + 1)n(n - 1)")],
    "Expand the numerator down to the denominator: \\((n + 1)! = (n + 1)n \\times (n - 1)!\\), so the \\((n - 1)!\\) cancels and \\((n + 1)n\\) remains.",{shape:shape});
  if(shape==="p3b")return mcq("Simplify \\(\\frac{(n + 3)!}{n!}\\).",
    MV("(n + 3)(n + 2)(n + 1)"),[MV("(n + 3)(n + 2)"),MV("(n + 2) + 1"),MV("(n + 3) + (n + 2) + (n + 1)")],
    "Expand the numerator three steps: \\((n + 3)! = (n + 3)(n + 2)(n + 1) \\times n!\\), so the \\(n!\\) cancels and \\((n + 3)(n + 2)(n + 1)\\) remains.",{shape:shape});
  if(shape==="n2b")return mcq("Simplify \\(\\frac{(n - 2)!}{(n - 3)!}\\).",
    MV("n - 2"),[MV("n - 3"),MV("1"),MV("(n - 2)(n - 3)")],
    "Expand the numerator one step: \\((n - 2)! = (n - 2) \\times (n - 3)!\\), so the \\((n - 3)!\\) cancels and only \\(n - 2\\) remains.",{shape:shape});
  if(shape==="three")return mcq("Simplify \\(\\frac{(3n)!}{(3n - 1)!}\\).",
    MV("3n"),[MV("1"),MV("3n - 1"),MV("(3n)(3n - 1)")],
    "Expand the numerator one step: \\((3n)! = 3n \\times (3n - 1)!\\), so the \\((3n - 1)!\\) cancels and only \\(3n\\) remains.",{shape:shape});
  if(shape==="p5")return mcq("Simplify \\(\\frac{(n + 5)!}{(n + 4)!}\\).",
    MV("n + 5"),[MV("n + 4"),MV("1"),MV("(n + 5)(n + 4)")],
    "Expand the numerator one step: \\((n + 5)! = (n + 5) \\times (n + 4)!\\), so the \\((n + 4)!\\) cancels and only \\(n + 5\\) remains.",{shape:shape});
  if(shape==="n3")return mcq("Simplify \\(\\frac{n!}{(n - 3)!}\\).",
    MV("n(n - 1)(n - 2)"),[MV("n(n - 1)"),MV("(n)(n)(n)"),MV("(n - 1) - 1")],
    "Expand the numerator three steps: \\(n! = n(n - 1)(n - 2) \\times (n - 3)!\\), so the \\((n - 3)!\\) cancels and \\(n(n - 1)(n - 2)\\) remains.",{shape:shape});
  return mcq("Simplify \\(\\frac{n!}{(n - 1)!}\\).",
    MV("n"),[MV("n - 1"),MV("1"),MV("n(n - 1)")],
    "Expand the numerator one step: \\(n! = n \\times (n - 1)!\\), so the \\((n - 1)!\\) cancels and only \\(n\\) remains.",{shape:shape});
});
E("u8-factorial-equation",8,["9.22"],2,"gen",function(){
  var shapes=[
    function(){var n=pick([3,4,5,6,7,8,9]);return {eq:"n! = "+fact(n),ans:n,sol:"Read the value against the factorial sequence (3! = 6, 4! = 24, 5! = 120, 6! = 720, and so on): \\("+fact(n)+"\\) is \\("+n+"!\\), so \\(n = "+n+"\\)."};},
    function(){var n=pick([3,4,5,6,7,8,9]);return {eq:"\\frac{(n + 1)!}{n!} = "+(n+1),ans:n,sol:"Simplify first: \\(\\frac{(n + 1)!}{n!} = n + 1\\), so \\(n + 1 = "+(n+1)+"\\) and \\(n = "+n+"\\)."};},
    function(){var n=pick([4,5,6,7,8]);return {eq:"\\frac{n!}{(n - 2)!} = "+(n*(n-1)),ans:n,sol:"Expand: \\(\\frac{n!}{(n - 2)!} = n(n - 1)\\). Solve \\(n(n - 1) = "+(n*(n-1))+"\\): trying whole numbers, \\("+n+" \\times "+(n-1)+" = "+(n*(n-1))+"\\), so \\(n = "+n+"\\)."};},
    function(){var n=pick([3,4,5,6]);return {eq:"\\frac{(n + 2)!}{n!} = "+((n+2)*(n+1)),ans:n,sol:"Expand: \\(\\frac{(n + 2)!}{n!} = (n + 2)(n + 1)\\). Solve \\((n + 2)(n + 1) = "+((n+2)*(n+1))+"\\): \\("+(n+2)+" \\times "+(n+1)+" = "+((n+2)*(n+1))+"\\), so \\(n = "+n+"\\) (the negative root is rejected because factorials need whole numbers)."};},
    function(){var n=pick([3,4,5,6,7]);return {eq:"\\frac{(n + 1)!}{(n - 1)!} = "+((n+1)*n),ans:n,sol:"Expand: \\(\\frac{(n + 1)!}{(n - 1)!} = (n + 1)n\\). Solve \\((n + 1)n = "+((n+1)*n)+"\\): \\("+(n+1)+" \\times "+n+" = "+((n+1)*n)+"\\), so \\(n = "+n+"\\)."};},
    function(){var n=pick([4,5,6,7]);return {eq:"(n - 1)! = "+fact(n-1),ans:n,sol:"Match against the factorial sequence: \\("+fact(n-1)+" = "+(n-1)+"!\\), so \\(n - 1 = "+(n-1)+"\\) and \\(n = "+n+"\\)."};},
    function(){var n=pick([3,4,5,6]);return {eq:"\\frac{(n + 3)!}{(n + 1)!} = "+((n+3)*(n+2)),ans:n,sol:"Expand: \\(\\frac{(n + 3)!}{(n + 1)!} = (n + 3)(n + 2)\\). Solve \\((n + 3)(n + 2) = "+((n+3)*(n+2))+"\\): \\("+(n+3)+" \\times "+(n+2)+" = "+((n+3)*(n+2))+"\\), so \\(n = "+n+"\\)."};},
    function(){var n=pick([4,5,6,7]);return {eq:"\\frac{n!}{(n - 3)!} = "+(n*(n-1)*(n-2)),ans:n,sol:"Expand: \\(\\frac{n!}{(n - 3)!} = n(n - 1)(n - 2)\\). Testing whole numbers gives \\("+n+" \\times "+(n-1)+" \\times "+(n-2)+" = "+(n*(n-1)*(n-2))+"\\), so \\(n = "+n+"\\)."};},
    function(){var n=pick([3,4,5,6,7,8]);return {eq:"\\frac{(2n)!}{(2n - 1)!} = "+(2*n),ans:n,sol:"Simplify: \\(\\frac{(2n)!}{(2n - 1)!} = 2n\\), so \\(2n = "+(2*n)+"\\) and \\(n = "+n+"\\)."};},
    function(){var n=pick([3,4,5,6,7,8,9]);return {eq:"\\frac{(n + 2)!}{(n + 1)!} = "+(n+2),ans:n,sol:"Simplify: \\(\\frac{(n + 2)!}{(n + 1)!} = n + 2\\), so \\(n + 2 = "+(n+2)+"\\) and \\(n = "+n+"\\)." };}
  ];
  var s=pick(shapes)();
  return numq("Solve for the whole number \\(n\\): \\("+s.eq+"\\).",
    s.ans,0.001,s.sol,{eq:s.eq});
});
/* --- permutations (9.23, 9.24, 9.25) --- */
E("u8-arrange-all",8,["9.23"],1,"gen",function(){
  var ctx=pick([
    {n:pick([4,5,6,7,8,9]),what:"books are arranged in a row on a shelf",item:"books"},
    {n:pick([4,5,6,7,8]),what:"people stand in a line for a photo",item:"people"},
    {n:pick([5,6,7,8,9]),what:"different letters are arranged to form a string (all letters are different)",item:"letters"},
    {n:pick([4,5,6,7]),what:"cars are parked in a row of spots",item:"cars"},
    {n:pick([4,5,6,7,8]),what:"DVDs are arranged in a row on a shelf",item:"DVDs"},
    {n:pick([4,5,6,7]),what:"photos are hung in a row on a wall",item:"photos"},
    {n:pick([4,5,6]),what:"bikes are placed in a row in a rack",item:"bikes"},
    {n:pick([4,5,6,7]),what:"flags are raised on a row of poles",item:"flags"}
  ]);
  var ask=pick(["In how many different orders can","How many different arrangements are there of"]);
  return numq(ask+" "+ctx.n+" "+ctx.what+"?",
    fact(ctx.n),0.001,"All "+ctx.n+" "+ctx.item+" are used and every order is different, so the count is \\("+ctx.n+"! = "+fact(ctx.n)+"\\) (factorial notation: "+ctx.n+" choices for the first spot, "+(ctx.n-1)+" for the next, and so on).",{n:ctx.n,item:ctx.item});
});
E("u8-fixed-position",8,["9.23"],2,"gen",function(){
  var n=pick([4,5,6,7,8,9]),pos=pick(["end","first","last","second","centre"]);
  if(pos==="centre"&&n%2===0)pos="end";
  var ctx=pick([
    {w:"books on a shelf",noun:"book"},
    {w:"people in a line for a photo",noun:"person"},
    {w:"runners in the lanes of a final",noun:"runner"},
    {w:"students in a row of chairs",noun:"student"},
    {w:"flags on a row of poles",noun:"flag"}
  ]);
  var mult=pos==="end"?2:1,val=mult*fact(n-1);
  var posText=pos==="end"?"must be at one of the two ends":pos==="first"?"must be placed first (at the left end)":pos==="last"?"must be placed last (at the right end)":pos==="second"?"must be second from the left":"must be in the centre position";
  return numq(n+" "+ctx.w+" are being arranged. One particular "+ctx.noun+" "+posText+". How many arrangements are possible?",
    val,0.001,"Fix the restricted position first: there "+(pos==="end"?"are 2 choices for which end":"is 1 choice for the fixed position")+", and the remaining "+(n-1)+" arrange freely in \\("+(n-1)+"! = "+fact(n-1)+"\\) ways. Total: "+(pos==="end"?"\\(2 \\times "+fact(n-1)+" = "+val+"\\)":"\\("+val+"\\)")+".",{n:n,pos:pos});
});
E("u8-perm-r",8,["9.24"],2,"gen",function(){
  var ctx=pick([
    {n:pick([8,9,10,11,12,13]),r:pick([2,3,4]),what:"runners in a race, how many ways can the first {r} finishing positions be filled"},
    {n:pick([6,7,8,9,10,11]),r:pick([2,3,4]),what:"club members, how many ways can an executive of {r} distinct roles be filled"},
    {n:pick([6,7,8,9,10,11]),r:pick([2,3,4]),what:"students, how many ways can {r} distinct awards be presented"},
    {n:pick([8,9,10,11,12,13]),r:pick([2,3,4,5]),what:"songs on a playlist, how many ways can the first {r} positions be ordered"}
  ]);
  var prod=[];for(var i=0;i<ctx.r;i++)prod.push(ctx.n-i);
  return numq("From "+ctx.n+" "+ctx.what.replace("{r}",ctx.r)+"?",
    nPr(ctx.n,ctx.r),0.001,"Order matters and no one can hold two positions, so this is a permutation: \\[ \\begin{aligned} _{"+ctx.n+"}P_{"+ctx.r+"} &= "+prod.join(" \\times ")+" \\\\ &= "+nPr(ctx.n,ctx.r)+" \\end{aligned} \\] The multiplication stops after "+ctx.r+" factors, one for each position filled.",{n:ctx.n,r:ctx.r});
});

E("u8-together-apart",8,["9.24"],3,"gen",function(){
  var n=pick([5,6,7]),together=Math.random()<0.5;
  var names=shuffle(["Alex","Blair","Casey","Devon","Emery","Finley","Harper"].slice()).slice(0,2);
  var blockVal=fact(n-1)*2,total=fact(n);
  var ctx=pick(["people stand in a line for a photo","students line up for lunch","runners take their places in a row of lanes"]);
  if(together)return numq(n+" "+ctx+". In how many arrangements are "+names[0]+" and "+names[1]+" standing <b>next to each other</b>?",
    blockVal,0.001,"Glue the two people together as one block: the block plus the other "+(n-2)+" people make "+(n-1)+" objects, arranged in \\("+(n-1)+"! = "+fact(n-1)+"\\) ways, and the two people can swap inside the block (×2). Total: \\(2 \\times "+fact(n-1)+" = "+blockVal+"\\). Justification for Level 3: the condition is handled by restructuring the objects being counted, not by a direct formula.",{n:n});
  return numq(n+" "+ctx+". In how many arrangements are "+names[0]+" and "+names[1]+" <b>not</b> next to each other?",
    total-blockVal,0.001,"Count the complement: there are \\("+n+"! = "+total+"\\) arrangements in total, and the arrangements where the two stand together number \\(2 \\times "+(n-1)+"! = "+blockVal+"\\) (treat the pair as one block). Subtracting: \\("+total+" - "+blockVal+" = "+(total-blockVal)+"\\). Justification for Level 3: the direct count is awkward, so the problem is solved by counting the opposite case.",{n:n});
});
E("u8-perm-strategy",8,["9.25"],1,"var",varset([
  function(){return mcq("To count the ways to award 1st, 2nd and 3rd place among 8 runners, the efficient strategy is to multiply 8 × 7 × 6. Why does this work?",
    "Each place filled removes one runner from the choices for the next place: 8 choices, then 7, then 6",
    ["There are 3 places, so 8 is multiplied by itself 3 times, giving 8 × 8 × 8 for the three places","Factorials always begin at 8 in a race, because 8 is the number of runners entered in the event","The places are independent, so the choices should be added: 8 + 7 + 6 gives the total number of ways"],
    "A permutation is built position by position: once a runner takes 1st place they cannot also take 2nd, so the pool shrinks by one each time. Generalizing this shrinking-pool pattern gives the permutation formula.",{});},
  function(){return mcq("Why does the calculation of P(10, 3) stop after three factors (10 × 9 × 8) instead of using all of 10!?",
    "Only three positions are being filled; the remaining factors of 10! would arrange the people who were not chosen",
    ["Because 10! is too large to calculate, so the multiplication is stopped early to keep the numbers manageable","Because the last seven factors are all equal to 1, so including them would not change the value of the product at all","Because permutations never use more than three factors, no matter how many positions are being filled in total"],
    "P(n, r) fills r positions from n candidates. Here r = 3, so exactly three factors appear; in the formula \\(P(10, 3) = \\frac{10!}{7!}\\) the other factors cancel. The strategy generalizes: the number of factors equals the number of positions.",{});},
  function(){return mcq("Six finalists are to be arranged in finishing order, and one particular finalist must finish first. Which strategy counts the arrangements correctly?",
    "Fix that finalist in first place, then arrange the remaining 5 finalists freely: 1 × 5!",
    ["Arrange all 6 finalists (6!), then divide by 2 to account for the finalist who must finish first","Choose any of the 6 finalists for first place, then arrange the other 5 finalists","Arrange all 6 finalists and subtract the arrangements where she finishes last instead of first"],
    "A restriction is handled by dealing with the restricted position first: first place is forced (1 choice), and the other five positions are a free arrangement of 5. Choosing 'any of the 6' for first place ignores the restriction and counts all 6! orders.",{});}
]));
E("u8-identical-perm",8,["9.26"],2,"gen",function(){
  function fromCounts(total,counts){var d=1;counts.forEach(function(c){d*=fact(c);});return fact(total)/d;}
  var word=pick([null,null,"BANANA","BALLOON","OTTAWA"]);
  if(word){
    var countsMap={"BANANA":[[3,"A"],[2,"N"],[1,"B"]],"BALLOON":[[2,"L"],[2,"O"],[1,"B"],[1,"A"],[1,"N"]],"OTTAWA":[[2,"T"],[2,"A"],[1,"O"],[1,"W"]]};
    var cm=countsMap[word],total=cm.reduce(function(s,c){return s+c[0];},0),counts=cm.map(function(c){return c[0];});
    var denom=counts.map(function(c){return c+"!";}).join(" \\times ");
    return numq("How many different arrangements are there of the letters of the word "+word+"?",
      fromCounts(total,counts),0.001,"The word has "+total+" letters, but some repeat ("+cm.map(function(c){return c[0]+" "+c[1]+"'s";}).join(", ")+"). Divide the full factorial by the factorials of the repeats: \\[ \\begin{aligned} \\frac{"+total+"!}{"+denom+"} &= "+fromCounts(total,counts)+" \\end{aligned} \\] Swapping two identical letters does not create a new arrangement, which is why the division is needed.",{word:word});
  }
  var ctx=pick([
    {thing:"tiles in a row",groups:["red","blue","green"]},
    {thing:"beads on a string",groups:["red","white","black"]},
    {thing:"flags on a pole",groups:["blue","white","red"]},
    {thing:"books on a shelf",groups:["identical math texts","identical novels","identical atlases"]}
  ]);
  var g=pick([2,3]),counts=[],total=0,tries=0;
  while(tries++<40){counts=[];total=0;for(var i=0;i<g;i++){var c=ri(1,4);counts.push(c);total+=c;}
    if(total>=5&&total<=9&&counts.some(function(c){return c>=2;}))break;}
  if(total<5||total>9){counts=[2,3];total=5;g=2;}
  var descParts=counts.map(function(c,i){return c+" "+ctx.groups[i];});
  var descText=descParts.length===2?descParts.join(" and "):descParts[0]+", "+descParts[1]+" and "+descParts[2];
  var denom=counts.map(function(c){return c+"!";}).join(" \\times ");
  return numq("How many different arrangements are there of "+total+" "+ctx.thing+", made up of "+descText+"?",
    fromCounts(total,counts),0.001,"Start with \\("+total+"!\\) arrangements of "+total+" distinct items, then divide by the factorials of each identical group, since swapping identical items changes nothing: \\[ \\begin{aligned} \\frac{"+total+"!}{"+denom+"} &= "+fromCounts(total,counts)+" \\end{aligned} \\]",{g:g,total:total});
});
E("u8-identical-effect",8,["9.27"],1,"var",varset([
  function(){return mcq("Four different letters can be arranged in 24 ways. Two of the letters are now replaced by copies of a third letter, so the multiset has a pair of identical letters, and the count drops to 12. Why?",
    "Each arrangement was being counted twice, once for each order of the two identical letters, and those orders are no longer different",
    ["Identical letters cannot be arranged among themselves, so every arrangement that used the swapped pair becomes impossible and is removed","Two letters were removed from the set and replaced by nothing, so the shorter word that remains has far fewer arrangements","The count is halved because the word is shorter than it was, and halving is what always happens when a word loses letters from it"],
    "With distinct letters, swapping the two positions of the pair produced a different arrangement. Once the letters are identical, those swaps produce the same arrangement, so every arrangement has been double-counted and the total is divided by 2! = 2. This is the general effect of identical elements: the count is divided by the factorial of each repeat count.",{});},
  function(){return mcq("Which collection has <b>more</b> arrangements in a row?",
    "5 completely different books (120 arrangements)",
    ["5 books with one identical pair (60 arrangements)","5 books with two identical pairs (30 arrangements)","5 identical books (1 arrangement)"],
    "Distinct items maximize the count at 5! = 120. Every set of identical items divides that total by the factorial of its size: one pair divides by 2, two pairs divide by 2 × 2, and five identical books leave just one arrangement. Identical elements can only shrink the count, never grow it.",{});},
  function(){return mcq("A student claims that making two elements of a set identical could <b>increase</b> the number of permutations. The claim is wrong because",
    "identical elements merge arrangements that were previously different, so the count can only stay the same or decrease",
    ["permutations are only defined for numbers, not objects, so swapping objects was never part of the count at all","factorials always get bigger when elements repeat, because each repeated element adds another factor to the count","arrangements are counted with combinations instead, and combinations always give larger counts than permutations"],
    "When two elements become indistinguishable, every arrangement pairs up with the one that swaps them, and the pair collapses into one. Nothing new is created, so the total falls (here, it is divided by 2!). The student's claim reverses the effect.",{});}
]));
/* --- does order matter? (9.29) --- */
/* --- does order matter? (9.29) --- */
E("u8-order-matters",8,["9.29"],1,"var",varset([
  function(){return mcq("A club with 10 members elects a president and a vice-president. Does <b>order matter</b> in this counting problem?",
    "Yes: the two roles are different, so electing Alex as president and Blair as vice-president is a different outcome from the reverse (a permutation)",
    ["No: the same two people are chosen either way, so it is a combination; the order their names are announced in does not change who holds office at all","No: order never matters when only two people are chosen, because a pair of names is just a set, and a set has no first or second member at all","Yes: order always matters in every counting problem, because items are always selected one at a time and the sequence is part of the result"],
    "Order matters whenever swapping two selected items produces a genuinely different result. Here a swap exchanges the roles, which is a different executive, so the count is a permutation: 10 × 9 = 90, not C(10, 2) = 45.",{});},
  function(){return mcq("A teacher chooses 3 of the 10 students in a class for a cleanup crew. Does <b>order matter</b> in this counting problem?",
    "No: the crew is the same set of 3 students regardless of the order they were picked in (a combination)",
    ["Yes: the first student picked becomes the crew leader, so the picking order decides who leads the crew","Yes: order always matters when people are chosen, because each person picked takes the next place in line","No: order never matters when more than two are chosen, because a group larger than two is always just a set"],
    "All three chosen students do the same job, so picking Alex, then Blair, then Casey gives the same crew as any other order of the same three. That makes it a combination: C(10, 3) = 120, not 10 × 9 × 8 = 720.",{});},
  function(){return mcq("Gold, silver and bronze medals are awarded in a race with 12 runners. Does <b>order matter</b> in this counting problem?",
    "Yes: finishing order decides which medal each runner gets, so different orders are different results (a permutation)",
    ["No: the same three runners stand on the podium either way, so it is a combination, since only the set of medallists matters","No: medals are objects, and order only matters for people, because objects cannot hold different positions in a result","Yes: because 12 is greater than 10, and a field that large always makes the order of finishing matter in the count"],
    "A swap between gold and silver changes who gets what, so order matters and the count is a permutation: 12 × 11 × 10 = 1320. The identity of the medallists alone (a combination) would only be the right model if the medals were identical.",{});},
  function(){return mcq("A camper chooses 4 books from 9 to pack in a bag. Does <b>order matter</b> in this counting problem?",
    "No: the bag holds the same 4 books no matter which order they were picked in (a combination)",
    ["Yes: the book picked first sits at the bottom of the bag, so the packing order is part of the outcome","Yes: choosing is always a permutation, because items are picked one at a time in some order","No: order never matters for objects, only for people, because people can hold ranked roles"],
    "The outcome is just the set of 4 books in the bag; reordering the picks changes nothing about the result. So the count is a combination, C(9, 4) = 126. What the items are (books or people) is irrelevant; what matters is whether a swap changes the outcome.",{});}
]));
E("u8-perm-or-comb",8,["9.29"],1,"gen",function(){
  var T=pick(["perm","comb","fact","power"]);
  var n=pick([6,7,8,9,10,11]),r=pick([2,3,4]);
  var roleSets={2:"a captain and a vice-captain",3:"a chairperson, a secretary and a treasurer",4:"a president, a vice-president, a secretary and a treasurer"};
  var stories={
    perm:"From "+n+" candidates, "+roleSets[r]+" must be chosen (each person takes one role). Which expression counts the possibilities?",
    comb:"From "+n+" candidates, a committee of "+r+" people with equal roles must be chosen. Which expression counts the possibilities?",
    fact:"All "+n+" books in a set are arranged in a row on a shelf. Which expression counts the arrangements?",
    power:"A code has "+r+" positions, and each position can be any of "+n+" symbols, with symbols allowed to repeat. Which expression counts the codes?"
  };
  var exprs={
    perm:MV("_{"+n+"}P_{"+r+"}"),
    comb:MV("\\binom{"+n+"}{"+r+"}"),
    fact:MV(n+"!"),
    power:MV(n+"^{"+r+"}")
  };
  var keys=["perm","comb","fact","power"].filter(function(k){return k!==T;});
  return mcq(stories[T],
    exprs[T],
    [exprs[keys[0]],exprs[keys[1]],exprs[keys[2]]],
    (T==="perm"?"The roles are all different, so order matters and nobody can hold two roles: a permutation, \\(_{"+n+"}P_{"+r+"}\\).":T==="comb"?"The committee members have equal roles, so order is irrelevant: a combination, \\(\\binom{"+n+"}{"+r+"}\\).":T==="fact"?"Every book is used exactly once and order is the whole point: \\("+n+"!\\).":"Repetition is allowed and each position is an independent choice: \\("+n+"^{"+r+"}\\). Each distractor is the right expression for a different kind of counting problem, so decide first whether order matters and whether repetition is allowed."),
    {T:T,n:n,r:r});
});
/* --- combinations (9.30, 9.31) --- */
E("u8-comb-r",8,["9.30"],2,"gen",function(){
  var ctx=pick([
    {n:pick([7,8,9,10,11,12,13]),r:pick([2,3,4]),what:"students, how many different committees of {r} can be formed"},
    {n:pick([8,9,10,11,12,13]),r:pick([3,4,5]),what:"books on a shelf, how many ways can {r} of them be chosen to pack"},
    {n:pick([8,9,10,11,12]),r:pick([2,3,4]),what:"toppings on a menu, how many different sets of {r} toppings can be chosen"},
    {n:pick([9,10,11,12,13,14]),r:pick([3,4,5]),what:"players, how many different starting groups of {r} can be chosen"}
  ]);
  return numq("From "+ctx.n+" "+ctx.what.replace("{r}",ctx.r)+"?",
    nCr(ctx.n,ctx.r),0.001,"The order of the chosen items does not matter, so this is a combination: \\[ \\begin{aligned} \\binom{"+ctx.n+"}{"+ctx.r+"} &= \\frac{"+ctx.n+"!}{"+ctx.r+"! \\times "+(ctx.n-ctx.r)+"!} \\\\ &= "+nCr(ctx.n,ctx.r)+" \\end{aligned} \\] Dividing by \\("+ctx.r+"!\\) removes the orderings of each chosen group.",{n:ctx.n,r:ctx.r});
});
E("u8-comb-two-group",8,["9.30"],2,"gen",function(){
  var g1=pick([5,6,7,8,9]),a=pick([2,3]),g2=pick([5,6,7,8,9]),b=pick([2,3]);
  var ctx=pick([
    {w:"A display team needs "+a+" juniors from a group of "+g1+" and "+b+" seniors from a group of "+g2+". How many different teams are possible?"},
    {w:"A reading list needs "+a+" fiction books from "+g1+" available and "+b+" nonfiction books from "+g2+" available. How many different lists are possible?"},
    {w:"A coach picks "+a+" forwards from "+g1+" available and "+b+" defenders from "+g2+" available. How many different selections are possible?"}
  ]);
  return numq(ctx.w,
    nCr(g1,a)*nCr(g2,b),0.001,"The two choices are independent, so multiply the combinations: \\[ \\begin{aligned} \\binom{"+g1+"}{"+a+"} \\times \\binom{"+g2+"}{"+b+"} &= "+nCr(g1,a)+" \\times "+nCr(g2,b)+" \\\\ &= "+(nCr(g1,a)*nCr(g2,b))+" \\end{aligned} \\] Order within each chosen group does not matter, which is why both factors are combinations.",{g1:g1,a:a,g2:g2,b:b});
});
E("u8-committee-atleast",8,["9.30"],3,"gen",function(){
  var shape=pick(["atleast","include"]);
  var n=pick([8,9,10,11,12,13]),r=pick([3,4,5]),s=pick([2,3,4]);
  while(n-s<r){s--;}
  if(shape==="atleast"){
    var val=nCr(n,r)-nCr(n-s,r);
    return numq("A committee of "+r+" is to be chosen from "+n+" people, of whom "+s+" are seniors. How many committees include <b>at least one</b> senior?",
      val,0.001,"Count all committees and subtract the ones the condition forbids (committees with no seniors, chosen entirely from the "+(n-s)+" non-seniors): \\[ \\begin{aligned} \\binom{"+n+"}{"+r+"} - \\binom{"+(n-s)+"}{"+r+"} &= "+nCr(n,r)+" - "+nCr(n-s,r)+" \\\\ &= "+val+" \\end{aligned} \\] Counting 'at least one' directly would need three separate cases; the complement needs one. Justification for Level 3: the productive move is recognizing the complement structure.",{n:n,r:r,s:s});
  }
  var val2=nCr(n-1,r-1);
  return numq("A committee of "+r+" is to be chosen from "+n+" people, and one particular person, the club president, <b>must</b> be on it. How many different committees are possible?",
    val2,0.001,"Reserve one seat for the president, then choose the remaining "+(r-1)+" members from the other "+(n-1)+" people: \\[ \\begin{aligned} \\binom{"+(n-1)+"}{"+(r-1)+"} &= "+val2+" \\end{aligned} \\] Fixing the required member first turns a conditional problem into a plain combination. Justification for Level 3: the seat-reservation restructure has to be seen before any formula applies.",{n:n,r:r});
});
E("u8-comb-strategy",8,["9.31"],1,"var",varset([
  function(){return mcq("Why is C(8, 3) equal to P(8, 3) divided by 3!?",
    "Every group of 3 people was counted 3! times in the permutation count, once for each order, and combinations ignore order",
    ["Because 3! happens to be the number of people not chosen from the eight, so dividing removes the unchosen people from the count","Because permutations always overcount by exactly 6, no matter how many people are in the group or how many are chosen from it","Because dividing makes the answer a whole number, and a count of people must always come out as a whole number anyway"],
    "P(8, 3) counts ordered triples. Each unordered group of 3 can be ordered in 3! = 6 ways, so each group appears 6 times in the permutation count. Dividing by 3! collapses those 6 copies into 1, which is the general strategy behind the combination formula.",{});},
  function(){return mcq("C(10, 7) and C(10, 3) are equal. Why?",
    "Choosing the 7 people to include is the same action as choosing the 3 people to leave out",
    ["Because 7 and 3 add to 10, and combinations always pair up this way by coincidence","Because 10! is divisible by both, since both counts are built from the same factorial","Because order matters for one and not the other, which makes the two counts balance out exactly"],
    "Every selection of 7 leaves behind a unique selection of 3, and vice versa, so the two counts must match. This symmetry, C(n, r) = C(n, n − r), is a useful check and a shortcut when r is large.",{});},
  function(){return mcq("A student counts committees of 3 from 8 people by first counting ordered triples (336) and then dividing by 6. What is the 6?",
    "3!, the number of different orders in which any one committee of 3 can be arranged",
    ["The number of people not chosen, counted from the full group of eight people in the room","The number of committees that can be formed from the eight people in total","The number of positions on the committee, doubled to allow for the two directions"],
    "The ordered count lists each committee once for every arrangement of its 3 members, and 3 members can be arranged in 3! = 6 ways. Dividing by 6 removes the ordering: 336 ÷ 6 = 56 committees. Recognizing what the divisor means is the strategy, not just the arithmetic.",{});}
]));
/* --- probability with combinations (9.32) --- */
/* --- probability with combinations (9.32) --- */
/* --- probability with combinations (9.32) --- */
E("u8-prob-comb",8,["9.32"],2,"gen",function(){
  var ctx=pick([
    {lead:"A bag contains",tail:"marbles",g1:"red",g2:"blue"},
    {lead:"A drawer contains",tail:"socks",g1:"black",g2:"white"},
    {lead:"A small deck contains",tail:"cards",g1:"hearts",g2:"spades"}
  ]);
  var a=pick([3,4,5,6,7]),b=pick([3,4,5,6,7]);if(a===b)b=b===7?6:b+1;
  var t=a+b;
  return mcq(ctx.lead+" "+a+" "+ctx.g1+" and "+b+" "+ctx.g2+" "+ctx.tail+" ("+t+" in total). Two are drawn at random without replacement. What is the probability that <b>both</b> are "+ctx.g1+"?",
    MV(frN(nCr(a,2),nCr(t,2))),
    [MV(frN(a*(a-1),t*t)),MV(frN(a*a,t*t)),MV(frN(nCr(b,2),nCr(t,2)))],
    "Count combinations: there are \\(\\binom{"+a+"}{2} = "+nCr(a,2)+"\\) ways to draw two "+ctx.g1+" and \\(\\binom{"+t+"}{2} = "+nCr(t,2)+"\\) ways to draw any two, so the probability is \\("+frN(nCr(a,2),nCr(t,2))+"\\). The first two distractors come from mishandling the second draw (keeping the full pool of "+t+" for it, or treating the draws as independent with replacement); the last counts the wrong colour.",
    {a:a,b:b});
});
E("u8-prob-comb-hard",8,["9.32"],3,"gen",function(){
  var n=pick([8,9,10,11,12]),r=pick([3,4]);while(n-2<r)n++;
  var tot=nCr(n,r),favour=nCr(n-2,r);
  var setting=pick([{g:"committee",p:"club members"},{g:"team",p:"players trying out"},{g:"project group",p:"students"}]);
  var names=pick([["Morgan","Riley"],["Sam","Priya"],["Alex","Jordan"],["Emma","Liam"],["Noah","Ava"]]);
  return mcq("A "+setting.g+" of "+r+" is chosen at random from "+n+" "+setting.p+". Two of the "+setting.p+" are "+names[0]+" and "+names[1]+". What is the probability that <b>neither</b> "+names[0]+" nor "+names[1]+" is on the "+setting.g+"?",
    MV(frN(favour,tot)),
    [MV(frN(tot-favour,tot)),MV(frN(nCr(n-1,r),tot)),MV(frN(2,n))],
    "If neither of them is chosen, all "+r+" members come from the other "+(n-2)+" "+setting.p+": \\(\\binom{"+(n-2)+"}{"+r+"} = "+favour+"\\) favourable groups out of \\(\\binom{"+n+"}{"+r+"} = "+tot+"\\) equally likely groups, giving \\("+frN(favour,tot)+"\\). The first distractor is the opposite event (at least one of them is chosen). Justification for Level 3: the favourable set has to be rebuilt around the exclusion before the probability ratio can be formed.",
    {n:n,r:r});
});
E("u8-mixed-roles",8,["9.24"],2,"gen",function(){
  var n=pick([6,7,8,9,10,11,12]),r=pick([2,3,4]);
  var jobList={2:"captain and vice-captain",3:"captain, equipment manager, and treasurer",4:"captain, vice-captain, equipment manager, and treasurer"};
  var shiftList={2:"first and second",3:"first, second, and third",4:"first, second, third, and fourth"};
  var ctx=pick([
    {w:"A sports club with "+n+" members selects "+r+" of them and assigns each a different job ("+jobList[r]+"). How many outcomes are possible?"},
    {w:"A play has "+n+" students auditioning. The director casts "+r+" different named roles. How many outcomes are possible?"},
    {w:"From "+n+" volunteers, "+r+" are chosen and given distinct shifts ("+shiftList[r]+"). How many outcomes are possible?"}
  ]);
  return numq(ctx.w,
    nPr(n,r),0.001,"Work in two steps: choose the group, then assign the roles: \\[ \\begin{aligned} \\binom{"+n+"}{"+r+"} \\times "+r+"! &= "+nCr(n,r)+" \\times "+fact(r)+" \\\\ &= "+nPr(n,r)+" \\end{aligned} \\] The two steps combine into the permutation \\(_{"+n+"}P_{"+r+"}\\), because choosing and then ordering is the same as choosing in order.",{n:n,r:r});
});

/* --- pathways on a grid (9.30): combinations in disguise. Split by ruling 49 (Nov 13, 2026): the diagram arms (plain, straight waypoint) sit at Level 2 here; the blocked grid and the story arms sit at Level 3 in u8-pathways-context below. --- */
function pathGridSVG(m,n,opt){
  opt=opt||{};
  var cell=(m>5||n>5)?31:36;
  var L=30,R=30,T=20,B=20,W=L+m*cell+R,H=T+n*cell+B;
  function X(i){return L+i*cell;}
  function Y(j){return T+(n-j)*cell;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(W,360)+'px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var i,j;
  for(i=0;i<=m;i++)out+='<line x1="'+X(i)+'" y1="'+Y(0)+'" x2="'+X(i)+'" y2="'+Y(n)+'" stroke="#a89f83" stroke-width="1.1"/>';
  for(j=0;j<=n;j++)out+='<line x1="'+X(0)+'" y1="'+Y(j)+'" x2="'+X(m)+'" y2="'+Y(j)+'" stroke="#a89f83" stroke-width="1.1"/>';
  for(i=0;i<=m;i++)for(j=0;j<=n;j++){
    if(opt.blk&&opt.blk[0]===i&&opt.blk[1]===j)continue;
    if(opt.wp&&opt.wp[0]===i&&opt.wp[1]===j)continue;
    out+='<circle cx="'+X(i)+'" cy="'+Y(j)+'" r="2.2" fill="'+FIG_INK+'"/>';
  }
  if(opt.blk){
    var bx=X(opt.blk[0]),by=Y(opt.blk[1]);
    out+='<line x1="'+(bx-6)+'" y1="'+(by-6)+'" x2="'+(bx+6)+'" y2="'+(by+6)+'" stroke="'+FIG_ALT+'" stroke-width="2.4"/>';
    out+='<line x1="'+(bx-6)+'" y1="'+(by+6)+'" x2="'+(bx+6)+'" y2="'+(by-6)+'" stroke="'+FIG_ALT+'" stroke-width="2.4"/>';
  }
  if(opt.wp){
    out+='<circle cx="'+X(opt.wp[0])+'" cy="'+Y(opt.wp[1])+'" r="5.2" fill="'+FIG_ACC+'" stroke="#fff" stroke-width="1.6"/>';
    out+='<text x="'+(X(opt.wp[0])+9)+'" y="'+(Y(opt.wp[1])-8)+'" font-size="12" fill="'+FIG_INK+'">P</text>';
  }
  out+='<circle cx="'+X(0)+'" cy="'+Y(0)+'" r="5" fill="'+FIG_INK+'"/>';
  out+='<text x="'+(X(0)-9)+'" y="'+(Y(0)+4)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">A</text>';
  out+='<circle cx="'+X(m)+'" cy="'+Y(n)+'" r="5" fill="'+FIG_INK+'"/>';
  out+='<text x="'+(X(m)+9)+'" y="'+(Y(n)+4)+'" font-size="12" fill="'+FIG_INK+'">B</text>';
  return out+'</svg>';
}
E("u8-pathways",8,["9.30"],2,"gen",function(){
  var arm=pick(["plain","waypoint"]);
  if(arm==="plain"){
    var m=ri(2,6),n=ri(2,6);if(m+n>11)n=11-m;
    var ans=nCr(m+n,m);
    var qp=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up. Point B is "+m+" moves to the right and "+n+" moves up from point A. How many different paths are there from A to B?",
      ans,0.001,
      "Every path uses "+(m+n)+" moves in total: "+m+" to the right and "+n+" up, in some order. Choosing which "+m+" of the "+(m+n)+" moves are the rightward ones fixes the whole path, so the count is a combination: \\[ \\begin{aligned} \\binom{"+(m+n)+"}{"+m+"} &= "+ans+" \\end{aligned} \\] The tempting wrong counts miss the structure: "+m+" \\times "+n+" = "+(m*n)+" counts the blocks of the grid, and "+(m+n)+" counts only the moves in a single path.",
      {arm:arm,m:m,n:n});
    qp.figure=pathGridSVG(m,n,{});
    return qp;
  }
  if(arm==="waypoint"){
    var m2=ri(3,6),n2=ri(3,6),px=ri(1,m2-1),py=ri(1,n2-1);
    var leg1=nCr(px+py,px),leg2=nCr((m2-px)+(n2-py),m2-px),ans2=leg1*leg2;
    var qw=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up, and the path must pass through point P. How many different paths are there from A to B through P?",
      ans2,0.001,
      "Split the journey at P. From A to P the path makes "+px+" rightward and "+py+" upward moves, in any order: \\(\\binom{"+(px+py)+"}{"+px+"} = "+leg1+"\\) paths. From P to B it makes "+(m2-px)+" rightward and "+(n2-py)+" upward moves: \\(\\binom{"+((m2-px)+(n2-py))+"}{"+(m2-px)+"} = "+leg2+"\\) paths. Every first leg can be followed by every second leg, so multiply: \\("+leg1+" \\times "+leg2+" = "+ans2+"\\).",
      {arm:arm,m:m2,n:n2,px:px,py:py});
    qw.figure=pathGridSVG(m2,n2,{wp:[px,py]});
    return qw;
  }
});

/* --- pathways in context (9.30): the blocked grid, and the grid hidden in a story (L3) --- */
E("u8-pathways-context",8,["9.30"],3,"gen",function(){
  var J=" Justification for Level 3: nothing in the diagram names an operation; a route first has to be recoded as a sequence of moves, and any point the route must use or avoid restructures the count.";
  var arm=pick(["blocked","context","ctxwp"]);
  if(arm==="blocked"){
    var m3=ri(3,6),n3=ri(3,6),bx=ri(1,m3-1),by=ri(1,n3-1);
    var tot=nCr(m3+n3,m3),thru=nCr(bx+by,bx)*nCr((m3-bx)+(n3-by),m3-bx),ans3=tot-thru;
    var qb=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up. The intersection marked with a cross cannot be used. How many different paths from A to B avoid the marked intersection?",
      ans3,0.001,
      "Count all the paths, then remove the ones that use the marked intersection. In total there are \\(\\binom{"+(m3+n3)+"}{"+m3+"} = "+tot+"\\) paths. A path through the marked intersection is two legs: A to the intersection in \\(\\binom{"+(bx+by)+"}{"+bx+"}\\) ways and onward to B in \\(\\binom{"+((m3-bx)+(n3-by))+"}{"+(m3-bx)+"}\\) ways, giving "+thru+" paths to remove. Avoiding it: \\("+tot+" - "+thru+" = "+ans3+"\\)."+J,
      {arm:arm,m:m3,n:n3,bx:bx,by:by});
    qb.figure=pathGridSVG(m3,n3,{blk:[bx,by]});
    return qb;
  }
  if(arm==="ctxwp"){
    var stp=pick([
      {who:"Mina",from:"her home",to:"her school",stop:"the library"},
      {who:"Jonah",from:"the bakery",to:"the market",stop:"the post office"},
      {who:"Priya",from:"the arena",to:"the community centre",stop:"the pharmacy"},
      {who:"Tomas",from:"the harbour",to:"the school",stop:"the bakery"}
    ]);
    var m5=ri(3,5),n5=ri(3,5),sx=ri(1,m5-1),sy=ri(1,n5-1);
    var sleg1=nCr(sx+sy,sx),sleg2=nCr((m5-sx)+(n5-sy),m5-sx),ans5=sleg1*sleg2;
    var qs=numq(stp.who+" walks from "+stp.from+" to "+stp.to+" along the streets shown in the diagram, walking only east or north, and stops at "+stp.stop+" on the way. The stop is marked as point P in the diagram: it is "+sx+" blocks east and "+sy+" blocks north of the start. The destination is "+m5+" blocks east and "+n5+" blocks north of the start (point A marks the start and point B the destination). How many different routes can "+stp.who+" take that pass the stop?",
      ans5,0.001,
      "Pull the grid out of the story first: eastward and northward blocks are the moves, and the stop splits the walk into two legs. From the start to "+stp.stop+" the walk makes "+sx+" eastward and "+sy+" northward blocks, in any order: \\(\\binom{"+(sx+sy)+"}{"+sx+"} = "+sleg1+"\\) routes. From the stop to the destination it makes "+(m5-sx)+" eastward and "+(n5-sy)+" northward blocks: \\(\\binom{"+((m5-sx)+(n5-sy))+"}{"+(m5-sx)+"} = "+sleg2+"\\) routes. Every first leg can be followed by every second leg, so multiply: \\("+sleg1+" \\times "+sleg2+" = "+ans5+"\\). The street grid is a combination in disguise on each leg: the blocks travelled are chosen, not arranged one by one."+J,
      {arm:arm,m:m5,n:n5,px:sx,py:sy});
    qs.figure=pathGridSVG(m5,n5,{wp:[sx,sy]});
    return qs;
  }
  var ctx=pick([
    {who:"Mina",from:"her home",to:"the library"},
    {who:"Jonah",from:"the bakery",to:"the post office"},
    {who:"Priya",from:"the arena",to:"her school"},
    {who:"Tomas",from:"the harbour",to:"the market"}
  ]);
  var m4=ri(2,5),n4=ri(2,5),ans4=nCr(m4+n4,m4);
  var qc=numq(ctx.who+" walks from "+ctx.from+" to "+ctx.to+" along the streets shown in the diagram, walking only east or north. The destination is "+m4+" blocks east and "+n4+" blocks north of the start (point A marks the start and point B the destination). How many different routes can "+ctx.who+" take?",
    ans4,0.001,
    "Lay the walk out as moves: every route makes "+m4+" eastward blocks and "+n4+" northward blocks, "+(m4+n4)+" blocks in total, and the route is fixed once the positions of the "+m4+" eastward blocks among the "+(m4+n4)+" are chosen: \\[ \\begin{aligned} \\binom{"+(m4+n4)+"}{"+m4+"} &= "+ans4+" \\end{aligned} \\] The street grid is a combination in disguise: the blocks travelled are chosen, not arranged one by one."+J,
    {arm:arm,m:m4,n:n4});
  qc.figure=pathGridSVG(m4,n4,{});
  return qc;
});

/* --- reverse counting (9.19): given a target total, find the conditions that produce it.
   The key set of conditions is built first and the target is read off its count, so the
   item is solvable by construction. Each distractor changes exactly one condition of
   the key (one position's restriction, or the repetition rule of one uniform group),
   so its count lands close to the target but never on it. --- */
var RCN_DIG={
  any:{set:[0,1,2,3,4,5,6,7,8,9],pos:"can be any digit",uni:"can be any digit",short:"any"},
  nz:{set:[1,2,3,4,5,6,7,8,9],pos:"cannot be 0",uni:"is never 0",short:"not 0"},
  even:{set:[0,2,4,6,8],pos:"is even",uni:"is even",short:"even"},
  odd:{set:[1,3,5,7,9],pos:"is odd",uni:"is odd",short:"odd"},
  prime:{set:[2,3,5,7],pos:"is prime",uni:"is prime",short:"prime"},
  gt3:{set:[4,5,6,7,8,9],pos:"is greater than 3",uni:"is greater than 3",short:"over 3"},
  gt4:{set:[5,6,7,8,9],pos:"is greater than 4",uni:"is greater than 4",short:"over 4"},
  gt5:{set:[6,7,8,9],pos:"is greater than 5",uni:"is greater than 5",short:"over 5"},
  lt5:{set:[0,1,2,3,4],pos:"is less than 5",uni:"is less than 5",short:"under 5"},
  lt6:{set:[0,1,2,3,4,5],pos:"is less than 6",uni:"is less than 6",short:"under 6"},
  lo16:{set:[1,2,3,4,5,6],pos:"is from 1 to 6",uni:"is from 1 to 6",short:"1 to 6"},
  hi49:{set:[4,5,6,7,8,9],pos:"is from 4 to 9",uni:"is from 4 to 9",short:"4 to 9"}
};
var RCN_LET={
  any:{set:"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),pos:"can be any letter",uni:"can be any letter",short:"any"},
  vowel:{set:["A","E","I","O","U"],pos:"is a vowel",uni:"is a vowel",short:"vowel"},
  cons:{set:"BCDFGHJKLMNPQRSTVWXYZ".split(""),pos:"is a consonant",uni:"is a consonant",short:"consonant"},
  am:{set:"ABCDEFGHIJKLM".split(""),pos:"is from A to M",uni:"is from A to M",short:"A to M"},
  ntoz:{set:"NOPQRSTUVWXYZ".split(""),pos:"is from N to Z",uni:"is from N to Z",short:"N to Z"}
};
var RCN_WORLDS=[
  {id:"digits3",
   leads:["A locker code consists of three digits (each digit from 0 to 9).","A bike-lock code consists of three digits (each digit from 0 to 9).","A gym locker code consists of three digits (each digit from 0 to 9)."],
   groups:[{alpha:"d",pos:[0,1,2],labels:["the first digit","the middle digit","the last digit"],short:["first","middle","last"]}]},
  {id:"digits4",
   leads:["An access code consists of four digits (each digit from 0 to 9).","An alarm code consists of four digits (each digit from 0 to 9).","A door entry code consists of four digits (each digit from 0 to 9)."],
   groups:[{alpha:"d",pos:[0,1,2,3],labels:["the first digit","the second digit","the third digit","the fourth digit"],short:["first","second","third","fourth"]}]},
  {id:"plateLDD",
   leads:["A permit code consists of one letter followed by two digits.","A visitor pass code consists of one letter followed by two digits."],
   groups:[{alpha:"l",pos:[0],labels:["the letter"],short:["letter"]},
           {alpha:"d",pos:[1,2],labels:["the first digit","the second digit"],short:["first digit","second digit"]}]},
  {id:"plateLLD",
   leads:["A plate code consists of two letters followed by one digit.","A trailer tag code consists of two letters followed by one digit."],
   groups:[{alpha:"l",pos:[0,1],labels:["the first letter","the second letter"],short:["first letter","second letter"]},
           {alpha:"d",pos:[2],labels:["the digit"],short:["digit"]}]}
];
function rcnPool(alpha,leadDigit){
  if(alpha==="l")return ["any","vowel","cons","am","ntoz"];
  var p=["any","even","odd","prime","gt3","gt4","gt5","lt5","lt6","lo16","hi49"];
  return leadDigit?["nz"].concat(p):p;
}
function rcnDesc(alpha,code){return (alpha==="d"?RCN_DIG:RCN_LET)[code];}
function rcnCount(world,spec){
  var factors=[],count=1,i,j,g,ixs,code,s0,f;
  for(var gi=0;gi<world.groups.length;gi++){
    g=world.groups[gi];ixs=g.pos;
    if(spec.rep[g.alpha]){
      for(i=0;i<ixs.length;i++){f=rcnDesc(g.alpha,spec.sets[ixs[i]]).set.length;factors.push(f);count*=f;}
    }else{
      code=spec.sets[ixs[0]];
      for(j=1;j<ixs.length;j++)if(spec.sets[ixs[j]]!==code)return null;
      s0=rcnDesc(g.alpha,code).set.length;
      for(j=0;j<ixs.length;j++){f=s0-j;if(f<=0)return null;factors.push(f);count*=f;}
    }
  }
  return {count:count,factors:factors};
}
function rcnUniformIn(world,spec,g){
  var c=spec.sets[g.pos[0]];
  for(var i=1;i<g.pos.length;i++)if(spec.sets[g.pos[i]]!==c)return false;
  return true;
}
function rcnOptionText(world,spec){
  var parts=[];
  world.groups.forEach(function(g){
    var codes=g.pos.map(function(ix){return spec.sets[ix];});
    var clause;
    if(g.pos.length>1&&rcnUniformIn(world,spec,g)){
      clause="each "+(g.alpha==="d"?"digit":"letter")+" "+rcnDesc(g.alpha,codes[0]).uni;
    }else{
      clause=g.pos.map(function(ix,k){return g.labels[k]+" "+rcnDesc(g.alpha,spec.sets[ix]).pos;}).join(", ");
    }
    if(g.pos.length>1){
      clause+=spec.rep[g.alpha]?"; "+(g.alpha==="d"?"digits":"letters")+" may repeat":"; no "+(g.alpha==="d"?"digit":"letter")+" repeats";
    }
    parts.push(clause);
  });
  var t=parts.join("; ");
  return t.charAt(0).toUpperCase()+t.slice(1)+".";
}
function rcnSummary(world,spec){
  var bits=[];
  world.groups.forEach(function(g){
    g.pos.forEach(function(ix,k){bits.push(g.short[k]+" "+rcnDesc(g.alpha,spec.sets[ix]).short);});
    if(g.pos.length>1)bits.push(spec.rep[g.alpha]?(g.alpha==="d"?"digits":"letters")+" may repeat":"no "+(g.alpha==="d"?"digit":"letter")+" repeats");
  });
  return bits.join(", ");
}
function rcnClone(spec){return {sets:spec.sets.slice(),rep:{d:spec.rep.d,l:spec.rep.l}};}
function rcnBuildDraw(world){
  var attempt,spec,cc,tries=0;
  while(tries++<300){
    spec={sets:[],rep:{d:true,l:true}};
    world.groups.forEach(function(g){
      if(g.pos.length>1&&Math.random()<0.5){
        var c=pick(rcnPool(g.alpha,g.pos[0]===0&&g.alpha==="d"));
        g.pos.forEach(function(ix){spec.sets[ix]=c;});
        spec.rep[g.alpha]=Math.random()<0.5;
      }else{
        g.pos.forEach(function(ix){spec.sets[ix]=pick(rcnPool(g.alpha,ix===0&&g.alpha==="d"));});
        spec.rep[g.alpha]=true;
      }
    });
    cc=rcnCount(world,spec);
    if(!cc||cc.count<24||cc.count>9500)continue;
    var target=cc.count;
    var cand=[],seenCount={};
    function offer(s2){
      var c2=rcnCount(world,s2);if(!c2)return;
      var n=c2.count;
      if(n===target||n<10||n>20000||n<target/9||n>target*9||seenCount[n])return;
      seenCount[n]=1;cand.push({spec:s2,count:n,factors:c2.factors});
    }
    world.groups.forEach(function(g){
      g.pos.forEach(function(ix){
        rcnPool(g.alpha,ix===0&&g.alpha==="d").forEach(function(code){
          if(code===spec.sets[ix])return;
          var s2=rcnClone(spec);s2.sets[ix]=code;offer(s2);
        });
      });
      if(g.pos.length>1&&rcnUniformIn(world,spec,g)){
        var s3=rcnClone(spec);s3.rep[g.alpha]=!s3.rep[g.alpha];offer(s3);
      }
    });
    if(cand.length<3)continue;
    cand.sort(function(a,b){return Math.abs(Math.log(a.count/target))-Math.abs(Math.log(b.count/target));});
    var near=shuffle(cand.slice(0,Math.min(8,cand.length))).slice(0,3);
    var specs=[spec].concat(near.map(function(c){return c.spec;}));
    var texts=specs.map(function(s){return rcnOptionText(world,s);});
    var uniq={};var allDiff=true;
    texts.forEach(function(t){if(uniq[t])allDiff=false;uniq[t]=1;});
    if(!allDiff)continue;
    return {world:world,key:spec,target:target,specs:specs,texts:texts};
  }
  return null;
}
E("u8-reverse-count",8,["9.19"],2,"gen",function(){
  var world=pick(RCN_WORLDS);
  var draw=rcnBuildDraw(world);
  if(!draw){
    world=RCN_WORLDS[0];
    var key={sets:["nz","even","any"],rep:{d:true,l:true}};
    var ds=[{sets:["nz","prime","any"],rep:{d:true,l:true}},{sets:["any","even","any"],rep:{d:true,l:true}},{sets:["nz","even","lt6"],rep:{d:true,l:true}}];
    draw={world:world,key:key,target:450,specs:[key].concat(ds),texts:[key].concat(ds).map(function(s){return rcnOptionText(world,s);})};
  }
  var lead=pick(draw.world.leads);
  var lines=draw.specs.map(function(s){
    var c=rcnCount(draw.world,s);
    return "Conditions ("+rcnSummary(draw.world,s)+"): "+c.factors.join(" \\times ")+" = "+c.count+" codes.";
  });
  var sol="Count the codes under each set of conditions with the Fundamental Counting Principle. "+lines.join(" ")+
    " Only the conditions ("+rcnSummary(draw.world,draw.key)+") give exactly "+draw.target+" codes. Every other set differs from that one in exactly one condition, so its count moves off the target instead of landing on it: running the count backwards from a total to the conditions means testing each candidate set, not guessing one.";
  var alphas=[];
  draw.world.groups.forEach(function(g){g.pos.forEach(function(ix){alphas[ix]=g.alpha;});});
  return mcq(lead+" Which set of conditions produces exactly "+draw.target+" codes?",
    draw.texts[0],[draw.texts[1],draw.texts[2],draw.texts[3]],sol,
    {world:draw.world.id,target:draw.target,alphas:alphas,
     options:draw.specs.map(function(s,i){return {sets:s.sets.slice(),repD:s.rep.d,repL:s.rep.l,count:rcnCount(draw.world,s).count,text:draw.texts[i]};})});
});

/* ----- bank-u9.js ----- */
// Math 3201 Unit 9 Probability question bank
// CRMARKS: u9-compare-games=3
// CRMARKS: u9-complementary=1
// CRMARKS: u9-conditional=2
// CRMARKS: u9-context-prob=1
// CRMARKS: u9-convert-odds-prob=1
// CRMARKS: u9-create-problem=2
// CRMARKS: u9-create-solve-game=3
// CRMARKS: u9-independent-pair-cr=2
// CRMARKS: u9-independent-prob=1
// CRMARKS: u9-me-or-not=2
// CRMARKS: u9-me-prob=1
// CRMARKS: u9-nonme-prob=2
// CRMARKS: u9-prob-basics=1
// CRMARKS: u9-prob-comb-context=3
// CRMARKS: u9-prob-odds-determine=1
// CRMARKS: u9-prob-perm-context=3
// CRMARKS: u9-represent-events=2
// CRMARKS: u9-same-colour-cr=3
/* ================= Unit 9: Probability ================= */
function ratioStr(a,b){var g=gcd2(a,b);return (a/g)+" : "+(b/g);}
function pick3Frac(corr,pool){
  var cv=corr[0]/corr[1],seen={},out=[],all=shuffle(pool.slice()),i,p,key;
  function valEq(q){return Math.abs(q[0]/q[1]-cv)<1e-12;}
  for(i=0;i<all.length&&out.length<3;i++){p=all[i];if(valEq(p))continue;key=frN(p[0],p[1]);if(seen[key])continue;seen[key]=1;out.push(MV(key));}
  var pads=[[1,7],[2,9],[3,11],[4,13],[5,16],[1,9]];
  for(i=0;i<pads.length&&out.length<3;i++){p=pads[i];if(valEq(p))continue;key=frN(p[0],p[1]);if(seen[key])continue;seen[key]=1;out.push(MV(key));}
  return out;
}

/* --- probability and odds in the world (9.1, 9.2) --- */
E("u9-media-statements",9,["9.1"],1,"var",varset([
  function(){return mcq("A weather page reports: \"Chance of rain tomorrow: 30%.\" In the language of this unit, that statement is",
    "a probability: in about 30 of 100 similar situations, it rains",
    ["odds of 30 to 1 in favour of rain, as bookmakers quote them","a guarantee that it will rain for 30% of the day and stay dry otherwise","a subjective judgement with no data behind it, a forecaster's guess"],
    "Percent chances in weather, medicine and sports reporting are probabilities: a part-to-whole comparison. A 30% chance means the event is expected in roughly 30 out of 100 similar cases, not that it is guaranteed for part of the day.",{});},
  function(){return mcq("A sports page lists a team at \"5 : 2 odds against\" winning. The correct reading of this is",
    "in 7 similar games, the team would be expected to lose about 5 and win about 2",
    ["the team is expected to win about 5 of every 7 games it plays in the season","the probability that the team wins is 5/7, read straight from the odds as a fraction","the team will definitely lose its next game, because the odds quoted are against it"],
    "Odds against compare losing outcomes to winning outcomes (part to part): 5 losses for every 2 wins, out of 7 similar games. The probability of winning is the part-to-whole version, 2/7. Media odds are easy to misread precisely because the two parts are not a whole.",{});},
  function(){return mcq("A medicine leaflet says a side effect occurs in \"about 1 in 1000\" patients. Expressed as a probability, that is",
    MV(frN(1,1000)),
    [MV(frN(1,100)),MV(frN(1000,1)),MV(frN(999,1000))],
    "\"1 in 1000\" is a part-to-whole statement: 1 patient out of every 1000, a probability of \\("+frN(1,1000)+" = 0.001\\). The last option is the probability of NOT getting the side effect.",{});}
]));
E("u9-odds-vs-prob",9,["9.2"],1,"var",varset([
  function(){return mcq("The odds in favour of an event are 3 : 2. Which statement about the event is true?",
    "Its probability is 3/5, because the 3 favourable outcomes are part of 5 outcomes in total",
    ["Its probability is 3/2, because odds and probability are the same thing in every situation","Its probability is 2/5, because the second number is the favourable one in the odds ratio","Its probability is 3/2, because there are 3 favourable outcomes and 2 unfavourable ones"],
    "Odds are part to part (favourable : unfavourable) while probability is part to whole (favourable : total). With odds 3 : 2 there are 3 + 2 = 5 equally likely outcomes, 3 of them favourable, so the probability is 3/5. A probability can never exceed 1, which rules out 3/2 at a glance.",{});},
  function(){return mcq("An event has probability 1/2. Its odds in favour are",
    "1 : 1, because favourable and unfavourable outcomes are equally numerous",
    ["1 : 2, matching the numerator and denominator of the fraction as written","2 : 1, because the whole is named first and the favourable part is named second","It is impossible to give odds for a probability of 1/2 in a simple ratio"],
    "A probability of 1/2 means half of all outcomes are favourable and half are not, so the part-to-part comparison is 1 : 1 (even odds). Reading the fraction 1/2 directly as odds of 1 : 2 is the classic confusion between part-whole and part-part.",{});},
  function(){return mcq("Why do bookmakers and games usually quote <b>odds</b> while scientists usually quote <b>probabilities</b>?",
    "Odds compare wins directly with losses, which suits payouts; probability compares an event with everything that could happen, which suits analysis",
    ["Odds and probability are different names for exactly the same number, so either word can be used in place of the other without any change in meaning","Probabilities can only be used with dice and cards, because those are the only random experiments whose outcomes can be counted in advance","Odds are always larger than probabilities, because an odds ratio compares two counts directly instead of comparing one count with a total"],
    "Both describe the same uncertainty from different angles: odds (part to part) make payout ratios easy to see, while probability (part to whole) fits into calculations and comparisons. Converting between them needs the total: odds a : b correspond to probability a/(a + b).",{});}
]));
/* --- determining probability and odds (9.3, 9.4) --- */
/* --- determining probability and odds (9.3, 9.4) --- */
E("u9-prob-basics",9,["9.3"],1,"gen",function(){
  var ctx=pick([
    {thing:"sections of a spinner",g1:"red",g2:"blue",g3:"green",lead:"A spinner is divided into equal sections:"},
    {thing:"marbles in a bag",g1:"red",g2:"blue",g3:"green",lead:"A bag contains marbles:"},
    {thing:"counters in a box",g1:"red",g2:"blue",g3:"green",lead:"A box contains counters:"}
  ]);
  var c=pick([2,3,4,5]),b=pick([2,3,4,5]),g=pick([1,2,3,4]),T=c+b+g;
  var target=pick(["g1","g2","g3"]),tc=target==="g1"?c:target==="g2"?b:g,tn=target==="g1"?ctx.g1:target==="g2"?ctx.g2:ctx.g3;
  var pool=[[tc,T-tc],[T-tc,T],[tc===c?b:c,T],[tc,T+tc],[tc+1,T+1]];
  return mcq(ctx.lead+" "+c+" "+ctx.g1+", "+b+" "+ctx.g2+" and "+g+" "+ctx.g3+" ("+T+" in total). One is chosen at random. What is the probability that it is "+tn+"?",
    MV(frN(tc,T)),
    pick3Frac([tc,T],pool),
    "Probability is favourable outcomes over total outcomes: there are "+tc+" "+tn+" out of "+T+" in total, giving \\("+frN(tc,T)+"\\) (part to whole). The distractor \\("+frN(tc,T-tc)+"\\) is the odds form (part to part), which answers a different question.",
    {ctx:ctx.thing,target:target});
});
E("u9-prob-odds-determine",9,["9.3"],1,"gen",function(){
  var a=pick([2,3,4,5,6,8]),b=pick([2,3,4,5,6,8]);if(a===b)b=b===8?6:b+1;
  var ctx=pick([
    {w:"In a class survey, "+a+" students chose the museum trip and "+b+" chose the science centre. A student is picked at random from these "+(a+b)+" students.",fav:"the student having chosen the museum trip"},
    {w:"A raffle sells tickets to "+(a+b)+" people; "+a+" of them are adults and "+b+" are students. One ticket is drawn at random.",fav:"the ticket belonging to an adult"},
    {w:"On a game spinner, "+a+" of the equal sections are gold and "+b+" are silver.",fav:"landing on gold"}
  ]);
  var favour=Math.random()<0.5;
  if(favour)return mcq(ctx.w+" What are the <b>odds in favour</b> of "+ctx.fav+" (in lowest terms)?",
    ratioStr(a,b),
    [ratioStr(b,a),ratioStr(a,a+b),(2*a)+" : "+(2*b)],
    "Odds in favour compare favourable outcomes to unfavourable outcomes: "+a+" to "+b+", which reduces to "+ratioStr(a,b)+". The second option is the probability written as a ratio (part to whole, "+a+" : "+(a+b)+"), a common slip, and the last is the right ratio left unreduced.",{a:a,b:b,f:1});
  return mcq(ctx.w+" What are the <b>odds against</b> "+ctx.fav+" (in lowest terms)?",
    ratioStr(b,a),
    [ratioStr(a,b),ratioStr(b,a+b),(2*b)+" : "+(2*a)],
    "Odds against compare unfavourable outcomes to favourable outcomes: "+b+" to "+a+", which reduces to "+ratioStr(b,a)+". Watch the order: against reverses the pair, and the answer must be in lowest terms.",{a:a,b:b,f:0});
});
E("u9-convert-odds-prob",9,["9.4"],1,"gen",function(){
  if(Math.random()<0.5){
    var a=pick([1,2,3,4,5]),b=pick([1,2,3,4,5,6]);
    return mcq("The odds in favour of an event are "+a+" : "+b+". What is the <b>probability</b> of the event?",
      MV(frN(a,a+b)),
      pick3Frac([a,a+b],[[a,b],[b,a+b],[a,a+b+1],[a+1,a+b]]),
      "Odds a : b mean a favourable outcomes out of a + b total. Here the probability is \\("+frN(a,a+b)+"\\) (part to whole). The distractor \\("+frN(a,b)+"\\) just copies the odds into a fraction, which is the part-to-part mistake.",{a:a,b:b,dir:"o2p"});
  }
  var p=pick([1,2,3,4,5]),q=pick([6,7,8,9,10,12]);while(q<=p)q++;
  var g=gcd2(p,q);p/=g;q/=g;
  var againstStr=(q-p===p)?((p+1)+" : "+p):ratioStr(q-p,p);
  return mcq("The probability of an event is \\("+frN(p,q)+"\\) (in lowest terms). What are the <b>odds in favour</b> of the event?",
    ratioStr(p,q-p),
    [againstStr,ratioStr(p,q),(2*p)+" : "+(2*(q-p))],
    "The probability says p favourable outcomes out of q in total, so the unfavourable count is q − p = "+(q-p)+". Odds in favour compare the parts: "+ratioStr(p,q-p)+". The second option reads the probability itself as odds, the standard confusion.",{p:p,q:q,dir:"p2o"});
});
E("u9-context-prob",9,["9.5"],1,"gen",function(){
  var ctx=pick([
    {x:pick([6,8,9,10,12]),y:pick([4,5,7,8,11]),w:function(x,y){return "In a survey of "+(x+y)+" students, "+x+" said they prefer autumn and "+y+" said they prefer spring. One student is chosen at random.";},tx:"prefer autumn"},
    {x:pick([5,7,9,11]),y:pick([6,8,10,13]),w:function(x,y){return "A raffle has "+(x+y)+" tickets out for one prize draw entry pool: "+x+" held by adults and "+y+" held by students. One ticket is drawn.";},tx:"is held by an adult"},
    {x:pick([8,10,12,14]),y:pick([5,6,9,10]),w:function(x,y){return "A school club has "+(x+y)+" members: "+x+" from grade 10 and "+y+" from grade 11. One member is chosen at random to take minutes.";},tx:"is from grade 10"}
  ]);
  var N=ctx.x+ctx.y;
  return mcq(ctx.w(ctx.x,ctx.y)+" What is the probability that the one chosen "+ctx.tx+"?",
    MV(frN(ctx.x,N)),
    pick3Frac([ctx.x,N],[[N-ctx.x,N],[ctx.x,N-ctx.x],[ctx.y,N],[ctx.x+1,N]]),
    "There are "+ctx.x+" favourable outcomes out of "+N+" equally likely choices, so the probability is \\("+frN(ctx.x,N)+"\\) (part to whole). The odds form \\("+frN(ctx.x,N-ctx.x)+"\\) and the complement \\("+frN(N-ctx.x,N)+"\\) are the standard near misses.",{x:ctx.x,y:ctx.y});
});
/* --- decisions and judgement (9.6) --- */
E("u9-decisions",9,["9.6"],2,"var",varset([
  function(){return mcq("Which of these decisions is based on a <b>subjective judgement</b> rather than on probability?",
    "A goalie decides to dive left because the shooter 'looks nervous'",
    ["An insurer sets a young driver's premium from accident statistics for that age group","A school schedules an outdoor fair on the date with the lowest historical rain probability","A player folds a poker hand after calculating the odds of improving it"],
    "The goalie's call rests on a personal impression, not on numbers: that is a subjective judgement. The other three decisions all rest on data or calculated odds, even though none of them guarantees the outcome.",{});},
  function(){return mcq("A student who holds 1 of 100 raffle tickets says: \"I feel lucky today, so my chance of winning is much better than 1 in 100.\" The flaw in the reasoning is that",
    "feelings do not change the objective probability, which stays 1 in 100",
    ["the probability was actually 1 in 99, because one ticket is the holder's own","raffle tickets are never equally likely to win in a real draw","confidence is one of the factors in the probability formula for raffles"],
    "Probability here is fixed by the setup: 1 favourable ticket out of 100 equally likely ones. A feeling of luck is a subjective judgement layered on top; it may change how the student feels about the decision, but not the 1/100 itself.",{});},
  function(){return mcq("A town must decide whether to hold its festival outdoors. Records show rain on 20 of the last 100 festival days. Which use of this information is sound?",
    "Treat the chance of rain as about 20/100 and weigh the cost of a rain plan against that likelihood",
    ["Conclude it will definitely not rain, because 80 days were dry and dry days outnumber wet days","Conclude it will rain, because rain is possible and any possible outcome should be planned as certain","Ignore the record, since past weather has no connection to probability or to future festival days"],
    "The record gives an experimental probability of about 1/5 for rain. A sound decision uses that estimate together with the stakes (how bad is a washout, how costly is a tent) rather than treating the outcome as certain either way.",{});}
]));
/* --- complementary events (9.8) --- */
/* --- complementary events (9.8) --- */
E("u9-complementary",9,["9.8"],2,"gen",function(){
  var mode=pick(["frac","decimal","comp","menotcomp","notme"]);
  if(mode==="frac"){
    var frac=pick([[1,4],[1,3],[2,5],[3,8],[5,6],[3,10],[7,10],[1,6],[5,12],[2,7],[4,9]]);
    var comp=1-frac[0]/frac[1];
    return numq("The probability of event A is \\("+frN(frac[0],frac[1])+"\\). Event B is \"not A\". What is the probability of B, as a decimal?",
      Math.round(comp*1000)/1000,0.002,
      "\"Not A\" is the complement of A: together they cover every outcome and they cannot both happen, so their probabilities add to 1. \\(P(B) = 1 - "+frN(frac[0],frac[1])+" = "+frN(frac[1]-frac[0],frac[1])+" \\approx "+fmt(comp,3)+"\\) (to three decimal places).",{mode:mode,f:frac.join("/")});
  }
  if(mode==="decimal"){
    var d=pick([0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.05,0.95]);
    return numq("The probability of event A is "+fmt(d,2)+". Event B is \"not A\". What is the probability of B?",
      Math.round((1-d)*1000)/1000,0.002,
      "Complementary probabilities add to 1, so \\(P(B) = 1 - "+fmt(d,2)+" = "+fmt(1-d,2)+"\\). \"Not A\" covers every outcome that A leaves out.",{mode:mode,d:d});
  }
  if(mode==="comp"){
    var T=pick([6,8,10,12]),rc=pick([2,3,4,5]);if(rc>=T-1)rc=T-3;
    return mcq("On a spinner with "+T+" equal sections ("+rc+" red and "+(T-rc)+" blue), event A is \"lands on red\" and event B is \"lands on blue\". Are A and B complementary?",
      "Yes: they cannot both happen, and together they cover every possible outcome",
      ["No: complementary events must each have probability 1/2, which these two events do not","No: they are mutually exclusive, and mutually exclusive events are never complementary","Yes, because any two events on the same spinner are complementary here"],
      "Complementary events are mutually exclusive AND exhaustive: one of them must happen and both cannot. Here every spin is red or blue and never both, so the pair is complementary: their probabilities, \\("+frN(rc,T)+"\\) and \\("+frN(T-rc,T)+"\\), add to 1.",{mode:mode,T:T});
  }
  if(mode==="menotcomp"){
    var T2=pick([8,9,10,12]),r2=pick([2,3,4]),g2=pick([2,3]),b2=T2-r2-g2;
    return mcq("On a spinner with "+T2+" equal sections ("+r2+" red, "+g2+" green and "+b2+" blue), event A is \"lands on red\" and event B is \"lands on green\". Are A and B complementary?",
      "No: they are mutually exclusive, but they are not complementary, because the spinner can also land on blue",
      ["Yes: mutually exclusive events are always complementary, because one of them must happen on every single spin","Yes: their probabilities add to 1, because the red and green sections make up the whole spinner","No: they are not even mutually exclusive, because a single spin can land on red and green at the same time"],
      "The events cannot happen together (mutually exclusive), but complementary also requires that one of them must happen. The "+b2+" blue outcomes make both fail, and their probabilities add to only \\("+frN(r2+g2,T2)+"\\), not 1.",{mode:mode,T:T2});
  }
  var pair=pick([["a heart","red"],["a diamond","red"],["a spade","black"],["a club","black"]]);
  return mcq("A card is drawn from a standard deck. Event A is \"the card is "+pair[0]+"\" and event B is \"the card is "+pair[1]+"\". Are A and B complementary?",
    "No: they are not mutually exclusive (a "+pair[1]+" "+pair[0].slice(2)+" satisfies both), so they cannot be complementary",
    ["Yes: the suit makes up half of the "+pair[1]+" cards, so the two events split the deck evenly between them","Yes: every card is either "+pair[0]+" or "+pair[1]+", and no card in the deck falls outside the two events","No: complementary events must have equal probabilities, which these two events fail to have in any case"],
    "Complementary events must first be mutually exclusive. The "+pair[0].slice(2)+"s that are "+pair[1]+" belong to both events at once, so the pair fails at the first requirement, before any checking of totals.",{mode:mode,pair:pair[0]});
});
/* --- representing events (9.9) and ME probability (9.10) --- */
/* --- representing events (9.9) and ME probability (9.10) --- */
/* --- representing events (9.9) and ME probability (9.10) --- */
E("u9-represent-events",9,["9.9"],2,"gen",function(){
  if(Math.random()<0.5){
    var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
    var fig=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null);
    var target=pick(["aonly","both","neither","either"]);
    var T={aonly:[r.aO,"A only ("+c.lA+" but not "+c.lB+")"],both:[r.both,"both activities"],neither:[r.none,"neither activity"],either:[r.aO+r.both+r.bO,"at least one activity"]}[target];
    var pool=[[r.both,total],[r.none,total],[r.aO+r.both,total],[T[0],total-r.aO]];
    return mcq("Students were surveyed about two activities (A: "+c.lA+", B: "+c.lB+"). One student is chosen at random from the "+total+" surveyed. What is the probability the student does "+T[1]+"?",
      MV(frN(T[0],total)),
      pick3Frac([T[0],total],pool),
      "Read the matching region(s) of the Venn diagram: "+T[0]+" of the "+total+" students fall in the region for "+T[1]+", so the probability is \\("+frN(T[0],total)+"\\). The diagram is a graphic organizer for the events: each region is one combination of A and B.",
      {ctx:c.lA,target:target},fig);
  }
  var nA=pick([12,14,15,18,20]),nB=pick([10,12,14,16]),inter=pick([3,4,5,6]);
  var offs=[0,2,4,6,9].filter(function(o){return o!==inter;});
  var U=nA+nB-inter+pick(offs);
  var sym=nA+nB-2*inter;
  return mcq("For two events in a sample space of "+U+" equally likely outcomes, \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\) and \\(n(A \\cap B) = "+inter+"\\). How many outcomes are in A or B <b>but not both</b>?",
    MV(sym),[MV(nA+nB-inter),MV(inter),MV(U-(nA+nB-inter))],
    "\"A or B but not both\" is the union with the overlap removed twice over: \\(n(A) + n(B) - 2 \\times n(A \\cap B) = "+nA+" + "+nB+" - "+(2*inter)+" = "+sym+"\\). The first distractor is the full union (both included); the last is the complement of the union.",{nA:nA,nB:nB});
});
E("u9-me-prob",9,["9.10"],1,"gen",function(){
  var T=pick(["die2","die3","suits","suits3","ranks","colours"]);
  if(T==="die2"){var vals=shuffle([1,2,3,4,5,6]).slice(0,2).sort();
    return numq("A standard die is rolled. What is the probability of rolling a "+vals[0]+" or a "+vals[1]+"? Give your answer as a decimal (to three decimal places).",
      Math.round((2/6)*1000)/1000,0.002,
      "The two outcomes cannot happen on the same roll, so the events are mutually exclusive and the probabilities add: \\(\\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3} \\approx 0.333\\).",{T:T});}
  if(T==="die3"){var v3=shuffle([1,2,3,4,5,6]).slice(0,3).sort();
    return numq("A standard die is rolled. What is the probability of rolling a "+v3[0]+", a "+v3[1]+" or a "+v3[2]+"? Give your answer as a decimal (to three decimal places).",
      0.5,0.002,
      "The three outcomes cannot happen together on one roll, so the mutually exclusive probabilities add: \\(\\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{3}{6} = 0.5\\).",{T:T});}
  if(T==="suits"){var s=shuffle(["hearts","diamonds","clubs","spades"]).slice(0,2);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s[0]+" card or a "+s[1]+" card? Give your answer as a decimal (to three decimal places).",
      0.5,0.002,
      "A card cannot be in two suits at once, so the events are mutually exclusive: \\(\\frac{13}{52} + \\frac{13}{52} = \\frac{26}{52} = 0.5\\).",{T:T});}
  if(T==="suits3"){var s3=shuffle(["hearts","diamonds","clubs","spades"]).slice(0,3);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s3[0]+", a "+s3[1]+" or a "+s3[2]+" card? Give your answer as a decimal (to three decimal places).",
      0.75,0.002,
      "A card has exactly one suit, so the three events are mutually exclusive: \\(\\frac{13}{52} \\times 3 = \\frac{39}{52} = 0.75\\).",{T:T});}
  if(T==="ranks"){var s2=shuffle(["king","queen","jack","ace"]).slice(0,2);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s2[0]+" or a "+s2[1]+"? Give your answer as a decimal (to three decimal places).",
      Math.round((8/52)*1000)/1000,0.002,
      "A card has only one rank, so the events are mutually exclusive: \\(\\frac{4}{52} + \\frac{4}{52} = \\frac{8}{52} = \\frac{2}{13} \\approx 0.154\\).",{T:T});}
  var TT=pick([8,10,12]),cr=pick([2,3,4,5]),cb=pick([2,3,4]);if(cr+cb>=TT)cb=TT-cr-2;
  var cg=TT-cr-cb;
  return numq("A spinner has "+TT+" equal sections: "+cr+" red, "+cb+" blue and "+cg+" green. What is the probability of landing on red or blue? Give your answer as a decimal (to three decimal places).",
    Math.round(((cr+cb)/TT)*1000)/1000,0.002,
    "One spin lands on a single colour, so the events are mutually exclusive: \\(\\frac{"+cr+"}{"+TT+"} + \\frac{"+cb+"}{"+TT+"} = \\frac{"+(cr+cb)+"}{"+TT+"} \\approx "+fmt((cr+cb)/TT,3)+"\\) (to three decimal places).",{T:T});
});

E("u9-nonme-prob",9,["9.10"],2,"gen",function(){
  var T=pick(["die-even3","die-prime-even","card-king-heart","survey"]);
  if(T==="die-even3")return numq("A standard die is rolled. What is the probability of rolling an <b>even number or a multiple of 3</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((4/6)*1000)/1000,0.002,
    "The events overlap (6 is both even and a multiple of 3), so the shared outcome must not be counted twice: \\[ \\begin{aligned} P(A \\cup B) &= P(A) + P(B) - P(A \\cap B) \\\\ &= \\frac{3}{6} + \\frac{2}{6} - \\frac{1}{6} \\\\ &= \\frac{4}{6} \\approx 0.667 \\end{aligned} \\] The favourable faces are 2, 3, 4 and 6.",{T:T});
  if(T==="die-prime-even")return numq("A standard die is rolled. What is the probability of rolling a <b>prime number or an even number</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((5/6)*1000)/1000,0.002,
    "The events overlap (2 is both prime and even): \\[ \\begin{aligned} P(A \\cup B) &= \\frac{3}{6} + \\frac{3}{6} - \\frac{1}{6} \\\\ &= \\frac{5}{6} \\approx 0.833 \\end{aligned} \\] Only the face 1 is neither prime nor even.",{T:T});
  if(T==="card-king-heart")return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a <b>king or a heart</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((16/52)*1000)/1000,0.002,
    "The king of hearts belongs to both events, so it must be subtracted once: \\[ \\begin{aligned} P(A \\cup B) &= \\frac{4}{52} + \\frac{13}{52} - \\frac{1}{52} \\\\ &= \\frac{16}{52} \\approx 0.308 \\end{aligned} \\]",{T:T});
  var a=pick([10,12,14,15]),b=pick([8,9,11,13]),o=pick([2,3,4,5]),tot=pick([28,30,32,35,40]);
  var union=a+b-o;
  return numq("In a survey of "+tot+" students, "+a+" play a school sport, "+b+" are in a school club, and "+o+" do both. One student is chosen at random. What is the probability the student plays a school sport <b>or</b> is in a school club? Give your answer as a decimal (to three decimal places).",
    Math.round((union/tot)*1000)/1000,0.002,
    "The "+o+" students who do both sit inside both counts, so subtract the overlap once: \\[ \\begin{aligned} P(A \\cup B) &= \\frac{"+a+"}{"+tot+"} + \\frac{"+b+"}{"+tot+"} - \\frac{"+o+"}{"+tot+"} \\\\ &= \\frac{"+union+"}{"+tot+"} \\approx "+fmt(union/tot,3)+" \\end{aligned} \\]",{T:T});
});
E("u9-me-or-not",9,["9.10"],3,"gen",function(){
  var T=pick(["ranksuit","redrank","evenmult4","tworanks","dieodd3","dieprime5","survey"]);
  var J=" Justification for Level 3: the formula cannot be chosen until the overlap between the events has been analyzed; adding blindly is the trap.";
  if(T==="ranksuit"){var rk2=pick(["king","queen","jack","ace"]),su=pick(["heart","diamond","club","spade"]);
    return numq("A card is drawn from a standard deck. What is the probability it is a <b>"+rk2+" or a "+su+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((16/52)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, because the "+rk2+" of "+su+"s is both. So the overlap comes off once: \\(\\frac{4 + 13 - 1}{52} = \\frac{16}{52} \\approx 0.308\\)."+J,{T:T});}
  if(T==="redrank"){var rk=pick(["king","queen","jack","ace"]),col=pick(["red","black"]);
    return numq("A card is drawn from a standard deck. What is the probability it is <b>"+col+" or a "+rk+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((28/52)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, because two "+rk+"s are "+col+". Subtract the overlap: \\(\\frac{26 + 4 - 2}{52} = \\frac{28}{52} \\approx 0.538\\)."+J,{T:T});}
  if(T==="dieodd3")return numq("A standard die is rolled. What is the probability of rolling an <b>odd number or a multiple of 3</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((4/6)*1000)/1000,0.002,
    "First classify: the events overlap, because 3 is both odd and a multiple of 3. Subtract the overlap once: the favourable faces are 1, 3, 5 and 6, giving \\(\\frac{4}{6} \\approx 0.667\\)."+J,{T:T});
  if(T==="dieprime5")return numq("A standard die is rolled. What is the probability of rolling a <b>prime number or a multiple of 5</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((3/6)*1000)/1000,0.002,
    "First classify: the events overlap, because 5 is prime and a multiple of 5 (itself). The favourable faces are 2, 3 and 5, giving \\(\\frac{3}{6} = 0.5\\). Adding 3/6 + 1/6 without removing the double-counted 5 is the trap."+J,{T:T});
  if(T==="survey"){
    var a=pick([10,12,14,15,18]),b=pick([8,9,11,13,16]),contain=Math.random()<0.3;
    var o=contain?b:pick([2,3,4,5,6]);if(o>b)o=b-1;
    var tot=pick([30,32,35,40]),union=a+b-o;
    return numq("In a survey of "+tot+" students, "+a+" are in the band, "+b+" are on a sports team, and "+o+" are in both. One student is chosen at random. What is the probability the student is in the band <b>or</b> on a sports team? Give your answer as a decimal (to three decimal places).",
      Math.round((union/tot)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, since "+o+" students do both."+(contain?" In fact every team member here is also in the band, but the union formula handles it the same way.":"")+" Subtract the overlap once: \\(\\frac{"+a+" + "+b+" - "+o+"}{"+tot+"} = \\frac{"+union+"}{"+tot+"} \\approx "+fmt(union/tot,3)+"\\) (to three decimal places)."+J,{T:T});
  }
  if(T==="tworanks"){var rks=shuffle(["king","queen","jack","ace"]).slice(0,2);
    return numq("A card is drawn from a standard deck. What is the probability it is a <b>"+rks[0]+" or a "+rks[1]+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((8/52)*1000)/1000,0.002,
      "First classify: a card has only one rank, so the events ARE mutually exclusive and the probabilities simply add: \\(\\frac{4 + 4}{52} = \\frac{8}{52} \\approx 0.154\\). Subtracting an overlap here would be the error."+J,{T:T});}
  return numq("A standard die is rolled. What is the probability of rolling an <b>even number or a multiple of 4</b>? Give your answer as a decimal (to three decimal places).",
    0.5,0.002,
    "First classify: every multiple of 4 on a die (just 4) is already even, so the second event sits inside the first and the union is just the even outcomes: \\(\\frac{3}{6} = 0.5\\). Adding the two probabilities and subtracting a generic overlap without noticing the containment overcomplicates it."+J,{T:T});
});
/* --- creating probability problems (9.11) --- */
E("u9-create-problem",9,["9.11"],1,"gen",function(){
  var device=pick([
    {w:"spinner with {T} equal sections, some coloured red",unit:"sections should be red"},
    {w:"bag holding {T} counters, some of them red",unit:"counters should be red"},
    {w:"dartboard with {T} equal regions, one of them the bullseye colour red",unit:"regions should be red"}
  ]);
  var combos=[[6,[1,3]],[6,[1,2]],[6,[2,3]],[8,[1,4]],[8,[3,8]],[8,[1,2]],[8,[5,8]],[8,[3,4]],[10,[1,5]],[10,[3,10]],[10,[2,5]],[10,[1,2]],[10,[3,5]],[10,[7,10]],[12,[1,6]],[12,[1,4]],[12,[1,3]],[12,[5,12]],[12,[1,2]],[12,[7,12]],[12,[2,3]],[12,[3,4]],[20,[1,5]],[20,[3,10]],[20,[2,5]],[20,[1,2]],[20,[3,5]],[20,[4,5]]];
  var c=pick(combos),T=c[0],frac=c[1],need=T*frac[0]/frac[1];
  return numq("Design problem: A game designer is making a "+device.w.replace("{T}",T)+". She wants the probability of red to be exactly \\("+frN(frac[0],frac[1])+"\\). How many "+device.unit+"?",
    need,0.001,
    "The probability is (number of red) ÷ (total). Set the fraction equal to the target: red = "+T+" × \\("+frN(frac[0],frac[1])+"\\) = "+need+". Designing the device to hit a stated probability is the reverse of the usual direction: start from the probability and build the sample space to match.",{T:T,frac:frac.join("/")});
});
/* --- dependent and independent events (9.12, 9.13, 9.14) --- */
E("u9-dep-vs-indep",9,["9.12"],1,"var",varset([
  function(){return mcq("Two cards are drawn from a deck <b>without replacement</b>. The two draws are",
    "dependent events, because the first draw changes the deck, and so changes the probabilities for the second draw",
    ["independent events, because the draws happen at different times and the timing of a draw cannot matter","dependent events, because cards are physical objects and physical objects always affect each other somehow","independent events, because each draw is random, and purely random draws can never influence one another at all"],
    "Dependence is about whether one event changes the probabilities of the other. Removing a card leaves 51 cards with a different mix, so the second draw's probabilities shift: dependent. Timing and randomness are not the test.",{});},
  function(){return mcq("A spinner is spun twice. The two spins are",
    "independent events, because the first spin leaves the spinner unchanged, so the second spin has the same probabilities",
    ["dependent events, because there are two spins, and a second event always depends on the event that came before it","independent events, because the spinner is fair, and fairness of the device is what makes two events independent","dependent events, because the outcomes are recorded in order, and writing them down in order links the two spins together"],
    "Nothing about the spinner changes between spins, so the probability distribution of the second spin is exactly the same whatever the first showed: the definition of independent events. Contrast this with drawing without replacement, where the sample space itself shrinks.",{});},
  function(){return mcq("Which pair of events is <b>dependent</b>?",
    "Drawing a marble from a bag and then drawing a second marble without putting the first back",
    ["Rolling a die and flipping a coin, two separate experiments done at the same time","Spinning a spinner and then spinning it again, with the spinner left exactly as it was","Drawing a card, replacing it, shuffling, and drawing again from the restored full deck of cards"],
    "Only the marble pair has one event change the other's probabilities (the bag's contents change). The replacement draw is the instructive contrast: putting the card back restores the original deck and makes the draws independent.",{});}
]));
E("u9-independent-prob",9,["9.13"],1,"gen",function(){
  var T=pick(["coin-die","two-coins","die-die-six","spinner-coin","two-spinners"]);
  if(T==="coin-die"){var cond=pick([{d:"an even number",p:1/2},{d:"a number greater than 4",p:1/3},{d:"a prime number",p:1/2},{d:"a 6",p:1/6},{d:"an odd number",p:1/2},{d:"a number less than 3",p:1/3},{d:"a multiple of 3",p:1/3}]);
    var ans=0.5*cond.p;
    return numq("A coin is flipped and a standard die is rolled. What is the probability of getting a <b>head and "+cond.d+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round(ans*1000)/1000,0.002,
      "The coin and the die do not affect each other, so the probabilities multiply: \\(\\frac{1}{2} \\times "+frN(Math.round(cond.p*6),6)+" = "+frN(Math.round(ans*12),12)+" \\approx "+fmt(ans,3)+"\\). Multiplying is the rule for independent events happening together.",{T:T,cond:cond.d});}
  if(T==="two-coins"){var want=pick(["two heads","two tails","a head and then a tail (in that order)","a tail and then a head (in that order)"]);
    return numq("A fair coin is flipped twice. What is the probability of getting <b>"+want+"</b>? Give your answer as a decimal (to three decimal places).",
      0.25,0.002,
      "The flips are independent, so multiply: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} = 0.25\\). (The named result is one specific sequence out of four equally likely ones: HH, HT, TH, TT.)",{T:T});}
  if(T==="die-die-six")return numq("Two standard dice are rolled. What is the probability that <b>both</b> show a 6? Give your answer as a decimal (to three decimal places).",
    Math.round((1/36)*1000)/1000,0.002,
    "The dice are independent: \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36} \\approx 0.028\\).",{T:T});
  if(T==="spinner-coin"){var s=pick([4,5,6,8]),kv=ri(1,s);
    return numq("A spinner with "+s+" equal sections (numbered 1 to "+s+") is spun, and a coin is flipped. What is the probability of landing on <b>"+kv+" and getting a head</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((0.5/s)*1000)/1000,0.002,
      "The two devices are independent, so multiply: \\(\\frac{1}{"+s+"} \\times \\frac{1}{2} = "+frN(1,2*s)+" \\approx "+fmt(0.5/s,3)+"\\) (to three decimal places).",{T:T,s:s});}
  var s1=pick([3,4,5]),s2=pick([4,5,6]),tv=pick([1,2]);
  return numq("One spinner has "+s1+" equal sections and another has "+s2+" equal sections (each numbered from 1). What is the probability that <b>both</b> spinners land on "+tv+"? Give your answer as a decimal (to three decimal places).",
    Math.round((1/(s1*s2))*1000)/1000,0.002,
    "Independent devices: multiply the separate probabilities: \\(\\frac{1}{"+s1+"} \\times \\frac{1}{"+s2+"} = "+frN(1,s1*s2)+" \\approx "+fmt(1/(s1*s2),3)+"\\) (to three decimal places).",{T:T});
});
E("u9-conditional",9,["9.14"],2,"gen",function(){
  var a=pick([3,4,5,6,7]),b=pick([3,4,5,6,7]),t=a+b;
  var shape=pick(["given-red","given-then-other","both-red","both-same"]);
  if(shape==="given-red")return numq("A bag holds "+a+" red and "+b+" blue marbles. One marble is drawn at random and it is <b>red</b>; it is not replaced. What is the probability that the next marble drawn is also red? Give your answer as a decimal (to three decimal places).",
    Math.round(((a-1)/(t-1))*1000)/1000,0.002,
    "Given that a red marble is gone, the bag now holds "+(a-1)+" red marbles out of "+(t-1)+" in total: \\("+frN(a-1,t-1)+" \\approx "+fmt((a-1)/(t-1),3)+"\\) (to three decimal places). The given first result rewrites the sample space.",{shape:shape,a:a,b:b});
  if(shape==="given-then-other")return numq("A bag holds "+a+" red and "+b+" blue marbles. One marble is drawn at random and it is <b>red</b>; it is not replaced. What is the probability that the next marble drawn is blue? Give your answer as a decimal (to three decimal places).",
    Math.round((b/(t-1))*1000)/1000,0.002,
    "The blue count is unchanged at "+b+", but the total has dropped to "+(t-1)+": \\("+frN(b,t-1)+" \\approx "+fmt(b/(t-1),3)+"\\) (to three decimal places). Even the probability of a colour that was not drawn changes, because the whole shrank.",{shape:shape,a:a,b:b});
  if(shape==="both-red"){var ans=(a/t)*((a-1)/(t-1));
    return numq("A bag holds "+a+" red and "+b+" blue marbles. Two marbles are drawn at random without replacement. What is the probability that <b>both</b> are red? Give your answer as a decimal (to three decimal places).",
      Math.round(ans*1000)/1000,0.002,
      "Multiply along the path, updating after the first draw: \\[ \\begin{aligned} P(\\text{red, red}) &= \\frac{"+a+"}{"+t+"} \\times \\frac{"+(a-1)+"}{"+(t-1)+"} \\\\ &= "+frN(a*(a-1),t*(t-1))+" \\\\ &\\approx "+fmt(ans,3)+" \\end{aligned} \\] The second factor is the probability of red given that the first draw already took a red marble.",{shape:shape,a:a,b:b});}
  var ans2=(a*(a-1)+b*(b-1))/(t*(t-1));
  return numq("A bag holds "+a+" red and "+b+" blue marbles. Two marbles are drawn at random without replacement. What is the probability that the two marbles are the <b>same colour</b>? Give your answer as a decimal (to three decimal places).",
    Math.round(ans2*1000)/1000,0.002,
    "Two paths lead to a match, and they are mutually exclusive, so add them: \\[ \\begin{aligned} P(\\text{same}) &= \\frac{"+a+" \\times "+(a-1)+" + "+b+" \\times "+(b-1)+"}{"+t+" \\times "+(t-1)+"} \\\\ &= "+frN(a*(a-1)+b*(b-1),t*(t-1))+" \\\\ &\\approx "+fmt(ans2,3)+" \\end{aligned} \\]",{shape:shape,a:a,b:b});
});
/* --- creating and solving with dependent events (9.15) --- */
E("u9-create-solve-game",9,["9.15"],3,"gen",function(){
  var withRep=Math.random()<0.4;
  var ctx=pick(["marbles in a bag","counters in a box","beads in a pouch"]);
  if(!withRep){
    var pairs=[[3,6],[4,6],[3,5],[4,8],[5,8],[2,4],[5,10],[6,9],[4,10],[6,10],[3,4],[7,10]];
    var correct=pick(pairs),tv=correct[0]*(correct[0]-1)/(correct[1]*(correct[1]-1));
    var pool=pairs.filter(function(p){return p!==correct&&Math.abs(p[0]*(p[0]-1)/(p[1]*(p[1]-1))-tv)>1e-9;});
    var ds=shuffle(pool).slice(0,3);
    return mcq("A game draws two "+ctx.split(" in ")[0]+" without replacement from a "+ctx.split(" in ")[1]+" that holds red and blue ones. Design the contents so that the probability of drawing <b>two red</b> ones is exactly \\("+frN(correct[0]*(correct[0]-1),correct[1]*(correct[1]-1))+"\\). Which contents work?",
      correct[0]+" red out of "+correct[1]+" in total",
      ds.map(function(p){return p[0]+" red out of "+p[1]+" in total";}),
      "Without replacement the draws are dependent: the probability is \\(\\frac{r}{t} \\times \\frac{r - 1}{t - 1}\\). For the chosen contents: \\(\\frac{"+correct[0]+"}{"+correct[1]+"} \\times \\frac{"+(correct[0]-1)+"}{"+(correct[1]-1)+"} = "+frN(correct[0]*(correct[0]-1),correct[1]*(correct[1]-1))+"\\), exactly the target. Each other contents choice gives a different value, which checking one by one confirms. Justification for Level 3: the design runs backwards from a target probability through a dependent-events model.",{r:correct[0],t:correct[1]});
  }
  var pairs2=[[1,2],[2,5],[3,5],[1,3],[3,4],[2,3],[1,4],[3,6]];
  var correct2=pick(pairs2),tv2=Math.pow(correct2[0]/correct2[1],2);
  var pool2=pairs2.filter(function(p){return p!==correct2&&Math.abs(Math.pow(p[0]/p[1],2)-tv2)>1e-9;});
  var ds2=shuffle(pool2).slice(0,3);
  return mcq("A game draws one "+ctx.split(" in ")[0].slice(0,-1)+" from a "+ctx.split(" in ")[1]+", replaces it, and draws again. Design the contents so that the probability of drawing <b>red both times</b> is exactly \\("+frN(correct2[0]*correct2[0],correct2[1]*correct2[1])+"\\). Which contents work?",
    correct2[0]+" red out of "+correct2[1]+" in total",
    ds2.map(function(p){return p[0]+" red out of "+p[1]+" in total";}),
    "With replacement the draws are independent, so the probability is the square of the single-draw probability: \\(\\left(\\frac{"+correct2[0]+"}{"+correct2[1]+"}\\right)^2 = "+frN(correct2[0]*correct2[0],correct2[1]*correct2[1])+"\\), exactly the target. Justification for Level 3: the design runs backwards from a target probability, and spotting that the target must be a perfect square of the single-draw probability is the key insight.",{r:correct2[0],t:correct2[1],wr:1});
});
/* --- odds in context (9.5), permutations (9.28), combinations (9.32) --- */
E("u9-odds-context",9,["9.5"],3,"gen",function(){
  var sport=pick(["hockey team","baseball team","curling team","soccer team"]);
  var N=pick([20,25,30,40]),w=pick([6,7,8,9,10,11,12,13,14,15,16,17,18,22,24,26,28]);if(w>=N)w=N-6;
  var l=N-w;if(w===l)w+=2,l-=2;
  var odds=ratioStr(w,l),prob=frN(w,w+l);
  return mcq("A "+sport+" won "+w+" and lost "+l+" of its last "+(w+l)+" games (no ties). Using this record as an estimate, which statement about its next game is correct?",
    "The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(prob),
    ["The odds in favour of a win are "+ratioStr(l,w)+", corresponding to a probability of "+MV(prob),"The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(frN(w,l)),"The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(frN(l,w+l))],
    "From the record: favourable outcomes "+w+", unfavourable "+l+", so the odds in favour are "+odds+" (part to part). The matching probability uses the whole: \\("+prob+"\\) (part to whole). The record is being used as an experimental estimate, which is how odds in sports reporting are usually produced. Justification for Level 3: both representations must be produced from the record and kept consistent with each other.",{w:w,l:l});
});
E("u9-prob-perm-context",9,["9.28"],3,"gen",function(){
  var n=pick([4,5,6]),shape=pick(["first","adjacent","notadjacent","together3","exact"]);
  var people=pick(["friends","students","singers","teammates","dancers","cousins"]);
  var corr,sol,pool;
  if(shape==="first"){corr=[1,n];pool=[[2,n],[1,n-1],[1,fact(n)],[n-1,n]];sol="Exactly one of the "+n+" equally likely first positions belongs to the specified person: the probability is \\("+frN(1,n)+"\\) (equivalently, \\((n - 1)!\\) of the \\("+n+"!\\) orders put them first).";}
  else if(shape==="adjacent"){corr=[2,n];pool=[[1,n],[n-2,n],[2,n-1],[1,n-1]];sol="Treat the pair as one block: 2 × ("+n+" − 1)! favourable orders out of "+n+"! in total, which simplifies to \\("+frN(2,n)+"\\) (the pair can also swap inside the block).";}
  else if(shape==="notadjacent"){corr=[n-2,n];pool=[[2,n],[1,n],[n-3,n-1],[1,n-1]];sol="Use the complement: the pair is adjacent with probability \\("+frN(2,n)+"\\), so not adjacent is \\(1 - "+frN(2,n)+" = "+frN(n-2,n)+"\\) (for n = "+n+").";}
  else if(shape==="together3"){corr=[6,n*(n-1)];pool=[[1,n],[6,fact(n)],[3,n],[1,n-1]];sol="Treat the three as one block: the block and the other "+(n-3)+" people make "+(n-2)+" objects, and the block's members can be arranged 3! ways: 3! × ("+n+" − 2)! favourable orders out of "+n+"!, which simplifies to \\("+frN(6,n*(n-1))+"\\) (for n = "+n+").";}
  else{corr=[1,fact(n)];pool=[[1,n],[1,n*n],[2,fact(n)],[1,Math.pow(n,2)]];sol="Only one of the \\("+n+"! = "+fact(n)+"\\) equally likely orders is the exact target order, so the probability is \\("+frN(1,fact(n))+"\\).";}
  var qText={
    first:""+n+" "+people+" line up at random. What is the probability that a particular one of them is <b>first</b> in line?",
    adjacent:""+n+" "+people+" line up at random. What is the probability that two particular ones of them end up <b>next to each other</b>?",
    notadjacent:""+n+" "+people+" line up at random. What is the probability that two particular ones of them do <b>not</b> end up next to each other?",
    together3:""+n+" "+people+" line up at random. What is the probability that three particular ones of them end up <b>all together</b> in a group?",
    exact:""+n+" "+people+" line up at random. What is the probability that they end up in <b>one particular exact order</b>?"
  }[shape];
  return mcq(qText,
    MV(frN(corr[0],corr[1])),
    pick3Frac(corr,pool),
    sol+" Justification for Level 3: the favourable arrangements have to be built with permutation reasoning before the probability ratio can be formed.",{n:n,shape:shape});
});
E("u9-prob-comb-context",9,["9.32"],3,"gen",function(){
  var shape=pick(["exactly","atleast","all"]);
  var g=pick([4,5,6,7,8]),b=pick([4,5,6,7,8]),t=g+b;
  if(shape==="atleast"&&b<3)b=5;if(shape==="all"&&g<3)g=5;
  var tot=nCr(t,3),corr,sol,pool;
  if(shape==="exactly"){corr=[nCr(g,2)*b,tot];pool=[[nCr(b,2)*g,tot],[tot-nCr(g,2)*b,tot],[nCr(g,2),tot],[nCr(g,3),tot]];
    sol="Count the favourable committees: choose 2 of the "+g+" girls and 1 of the "+b+" boys: \\(\\binom{"+g+"}{2} \\times \\binom{"+b+"}{1} = "+(nCr(g,2)*b)+"\\), out of \\(\\binom{"+t+"}{3} = "+tot+"\\) committees in total.";}
  else if(shape==="atleast"){corr=[tot-nCr(b,3),tot];pool=[[nCr(b,3),tot],[nCr(g,1)*nCr(t-1,2),tot],[nCr(g,3),tot],[tot-nCr(g,3),tot]];
    sol="Count the complement: committees with no girls choose all 3 from the "+b+" boys: \\(\\binom{"+b+"}{3} = "+nCr(b,3)+"\\) out of \\(\\binom{"+t+"}{3} = "+tot+"\\), so at least one girl has probability \\(1 - "+frN(nCr(b,3),tot)+" = "+frN(tot-nCr(b,3),tot)+"\\) (shown reduced).";}
  else{corr=[nCr(g,3),tot];pool=[[nCr(b,3),tot],[tot-nCr(g,3),tot],[nCr(g,2)*b,tot],[g,tot]];
    sol="All three members must come from the "+g+" girls: \\(\\binom{"+g+"}{3} = "+nCr(g,3)+"\\) favourable committees out of \\(\\binom{"+t+"}{3} = "+tot+"\\) in total.";}
  return mcq("A committee of 3 is chosen at random from "+g+" girls and "+b+" boys. What is the probability that the committee has "+(shape==="exactly"?"<b>exactly 2 girls</b>":shape==="atleast"?"<b>at least one girl</b>":"<b>all girls</b>")+"?",
    MV(frN(corr[0],corr[1])),
    pick3Frac(corr,pool),
    sol+" Justification for Level 3: the favourable set must be counted with combinations under a composition condition before the ratio can be formed.",{shape:shape,g:g,b:b});
});
E("u9-compare-games",9,["9.13"],3,"gen",function(){
  var gamesA=[
    {aDesc:"flipping a coin and rolling a die, winning with a head and an even number",pa:0.25},
    {aDesc:"flipping a coin and rolling a die, winning with a head and a number greater than 4",pa:1/6},
    {aDesc:"spinning a 4-section spinner and flipping a coin, winning with a 3 and a head",pa:0.125},
    {aDesc:"rolling a die and flipping a coin, winning with a 6 and a tail",pa:1/12},
    {aDesc:"flipping two coins, winning with two heads",pa:0.25},
    {aDesc:"spinning a 6-section spinner and flipping a coin, winning with a 5 and a head",pa:1/12}
  ];
  var bagsB=[[3,6],[4,6],[3,5],[5,8],[4,7],[2,5],[5,9],[3,7],[4,9],[6,10],[2,4]];
  var ga=pick(gamesA),bb=pick(bagsB),pb=(bb[0]/bb[1])*((bb[0]-1)/(bb[1]-1));
  if(Math.abs(ga.pa-pb)<1e-9){bb=[3,6];pb=0.2;}
  var c={aDesc:ga.aDesc,pa:ga.pa,bA:bb[0],bT:bb[1]};
  var winner=c.pa>pb?"Game A":"Game B";
  return mcq("Game A: a player wins by "+c.aDesc+". Game B: a player draws two marbles without replacement from a bag of "+c.bA+" red and "+(c.bT-c.bA)+" blue marbles, and wins if both are red. Which game gives the <b>higher</b> probability of winning?",
    winner,
    [winner==="Game A"?"Game B":"Game A","The two games are exactly equal","It cannot be determined from the information given"],
    "Compute both. Game A uses independent stages: the win probability is "+fmt(c.pa,3)+". Game B is dependent (no replacement): \\(\\frac{"+c.bA+"}{"+c.bT+"} \\times \\frac{"+(c.bA-1)+"}{"+(c.bT-1)+"} \\approx "+fmt(pb,3)+"\\) (to three decimal places). Comparing the two computed values, "+winner+" is higher. Justification for Level 3: two different probability models (independent product versus dependent path) must both be built before any comparison is possible.",{pa:c.pa,bA:c.bA,bT:c.bT});
});

E("u9-classify-events",9,["9.7"],1,"var",varset([
  function(){return mcq("One card is drawn from a standard deck. Event A is \"the card is a heart\" and event B is \"the card is a spade\". The two events are",
    "mutually exclusive, because a single card cannot be both a heart and a spade",
    ["not mutually exclusive, because both suits are found in the same standard deck","mutually exclusive, because hearts are red and spades are black, so the suits differ","not mutually exclusive, because the deck has 52 cards in four suits"],
    "Mutually exclusive means the events cannot happen together. One card has exactly one suit, so a heart and a spade cannot occur on the same draw. (They are not complementary, though: the card could be a diamond or a club.)",{});},
  function(){return mcq("A standard die is rolled. Event A is \"the roll is even\" and event B is \"the roll is a multiple of 3\". The two events are",
    "not mutually exclusive, because a roll of 6 is both even and a multiple of 3",
    ["mutually exclusive, because even numbers and multiples of 3 are different lists","mutually exclusive, because 6 is only one face and cannot do both","not mutually exclusive, because both events have probability greater than zero"],
    "The test is whether any single outcome can satisfy both events at once. The face 6 is even and a multiple of 3, so the events overlap and are not mutually exclusive. An event pair can overlap on even one outcome and fail the test.",{});},
  function(){return mcq("One student is chosen at random from a class. Event A is \"the student is in the band\" and event B is \"the student is in the choir\". Without more information, the two events should be classified as",
    "not mutually exclusive, because a student can be in both the band and the choir",
    ["mutually exclusive, because band and choir are different activities at school","mutually exclusive, because only one student is chosen and one student has one activity","not mutually exclusive, only if most students do both, rather than just a few of them"],
    "Nothing in the setup prevents one student from belonging to both groups, so the events can happen together for the chosen student: not mutually exclusive. Classification follows what is possible, not what is common.",{});},
  function(){return mcq("A coin is flipped once. Event A is \"the coin lands heads\" and event B is \"the coin lands tails\". The two events are",
    "mutually exclusive (and also complementary), because one flip gives exactly one of the two results",
    ["not mutually exclusive, because the coin could land on its edge and show both faces at once","mutually exclusive but not complementary, because other outcomes exist besides the two faces","not mutually exclusive, because both outcomes are equally likely and equal chances can coincide here"],
    "A single flip produces one face: heads and tails cannot happen together (mutually exclusive), and one of them must happen (complementary as well). Equal likelihood is not part of either definition.",{});}
]));

/* ============ Constructed-response fit (tagging pass, November 2026) ============ */
/* Exam Section B draws only from these entries (marks per question); every other
   entry is selected-response only in exam mode. Worksheet mode uses these plus
   all numeric-answer entries. */
/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 2 CR entries (3 and 2 marks). The Level 2 CR pool held only three 2-mark entries, so the 9-mark remainder behind the 5 Level 3 pick could not form. ---------- */
E("u9-same-colour-cr",9,["9.14","9.15"],2,"gen",function(){
  var CTX=[
    {item:"marbles", place:"bag", c1:"red", c2:"blue"},
    {item:"counters", place:"box", c1:"green", c2:"yellow"},
    {item:"socks", place:"drawer", c1:"black", c2:"white"}
  ];
  var cx=pick(CTX), r=ri(3,8), b=ri(3,8); if(r===b) b=b+1;
  var den=(r+b)*(r+b-1), n1=r*(r-1), n2=b*(b-1), num=n1+n2, p=num/den;
  return numq("A "+cx.place+" contains "+r+" "+cx.c1+" "+cx.item+" and "+b+" "+cx.c2+" "+cx.item+". Two "+cx.item+" are drawn at random without replacement. What is the probability that both are the same colour? Give your answer as a decimal (to three decimal places).",
    Math.round(p*1000)/1000,0.002,
    "Add the two matching cases. Both "+cx.c1+": \\(\\frac{"+r+"}{"+(r+b)+"} \\times \\frac{"+(r-1)+"}{"+(r+b-1)+"} = \\frac{"+n1+"}{"+den+"}\\). Both "+cx.c2+": \\(\\frac{"+b+"}{"+(r+b)+"} \\times \\frac{"+(b-1)+"}{"+(r+b-1)+"} = \\frac{"+n2+"}{"+den+"}\\). Together: \\(\\frac{"+num+"}{"+den+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
    {r:r,b:b});
});
E("u9-independent-pair-cr",9,["9.13"],2,"var",varset([
  function(){
    var S=pick([6,8,10]), R=pick([2,3,4]); if(R>=S) R=2;
    var p=R/S/2;
    return numq("A spinner is divided into "+S+" equal sectors, of which "+R+" are red. The spinner is spun once and a fair coin is tossed once. What is the probability that the spinner lands on red and the coin lands on heads? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two events are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{heads}) = \\frac{"+R+"}{"+S+"} \\times \\frac{1}{2} = \\frac{"+R+"}{"+(2*S)+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"spinner-coin"});
  },
  function(){
    var S=pick([6,8,10]), R=pick([2,3,4]); if(R>=S) R=2;
    var p=(R/S)*(2/6);
    return numq("A spinner is divided into "+S+" equal sectors, of which "+R+" are red. The spinner is spun once and a fair die is rolled once. What is the probability that the spinner lands on red and the die shows a number greater than 4? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two events are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{greater than 4}) = \\frac{"+R+"}{"+S+"} \\times \\frac{2}{6} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"spinner-die"});
  },
  function(){
    var S1=pick([6,8]), R1=pick([2,3]), S2=pick([4,5,6,8]), R2=pick([1,2,3]); if(R2>=S2) R2=1;
    var p=(R1/S1)*(R2/S2);
    return numq("One spinner is divided into "+S1+" equal sectors, of which "+R1+" are red. A second spinner is divided into "+S2+" equal sectors, of which "+R2+" are blue. Both spinners are spun once. What is the probability that the first lands on red and the second lands on blue? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two spins are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{blue}) = \\frac{"+R1+"}{"+S1+"} \\times \\frac{"+R2+"}{"+S2+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"two-spinners"});
  }
]));

/* --- binomial distribution (enrichment, Nov 13, 2026) --- */
/* No Math 3201 indicator names the binomial distribution, so
   the three entries in this section are enrichment, flagged at
   the foot of this file: they stay out of default practice
   pools and composed papers unless a teacher deliberately
   includes them from Advanced tools (Jason's ruling, Nov 13,
   2026; build step 8 of the Pure Math scan's build order, the
   source types mined from the Pure Math 30 statistics material
   and rewritten). The mathematics is the unit's own machinery
   carried one step further: combinations choose which trials
   succeed (9.30 feeding 9.32) and independent-trial
   probabilities multiply along each arrangement (9.13). */
/* Distribution terms are carried as exact integer pairs: with
   p = a/d, P(X = j) = C(n, j) a^j (d - a)^(n - j) / d^n. At the
   sizes used here the numerators and denominators are exact
   integers in floating point, so the fractions shown in the
   solutions and the key always agree. */
function binTermNum(n,j,a,d){return nCr(n,j)*Math.pow(a,j)*Math.pow(d-a,n-j);}
function binTermStr(n,j,a,d){return "\\binom{"+n+"}{"+j+"} \\left("+frN(a,d)+"\\right)^{"+j+"} \\left("+frN(d-a,d)+"\\right)^{"+(n-j)+"}";}
var BIN_CTX=[
  {id:"throws",a:3,d:4,nMin:5,nMax:8,succ:"made free throws",
   setup:function(n){return "A basketball player makes any one free throw with probability \\("+frN(3,4)+"\\), independently of her other attempts. She takes "+n+" free throws.";},
   evE:function(n,k){return "she makes exactly "+k+" of the "+n;},
   evM:function(n,k){return "she makes at most "+k+" of the "+n;},
   ev1:function(n){return "she makes at least one of the "+n;},
   evT:function(n){return "she makes at least "+(n-1)+" of the "+n;}},
  {id:"defects",a:1,d:5,nMin:5,nMax:8,succ:"defective parts",
   setup:function(n){return "A production line produces a defective part with probability \\("+frN(1,5)+"\\), independently from part to part. An inspector samples "+n+" parts.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" parts are defective";},
   evM:function(n,k){return "at most "+k+" of the "+n+" parts are defective";},
   ev1:function(n){return "at least one of the "+n+" parts is defective";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" parts are defective";}},
  {id:"guessing",a:1,d:4,nMin:5,nMax:8,succ:"correct answers",
   setup:function(n){return "A student guesses every answer on a quiz of four-option multiple-choice questions, independently from question to question, so each guess is correct with probability \\("+frN(1,4)+"\\). The quiz has "+n+" questions.";},
   evE:function(n,k){return "the student answers exactly "+k+" of the "+n+" questions correctly";},
   evM:function(n,k){return "the student answers at most "+k+" of the "+n+" questions correctly";},
   ev1:function(n){return "the student answers at least one of the "+n+" questions correctly";},
   evT:function(n){return "the student answers at least "+(n-1)+" of the "+n+" questions correctly";}},
  {id:"coin",a:1,d:2,nMin:5,nMax:8,succ:"heads",
   setup:function(n){return "A fair coin is flipped "+n+" times, so each flip lands heads with probability \\("+frN(1,2)+"\\), independently of the others.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" flips land heads";},
   evM:function(n,k){return "at most "+k+" of the "+n+" flips land heads";},
   ev1:function(n){return "at least one of the "+n+" flips lands heads";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" flips land heads";}},
  {id:"seeds",a:4,d:5,nMin:5,nMax:8,succ:"germinated seeds",
   setup:function(n){return "A gardener plants "+n+" seeds of a variety in which each seed germinates with probability \\("+frN(4,5)+"\\), independently of the others.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" seeds germinate";},
   evM:function(n,k){return "at most "+k+" of the "+n+" seeds germinate";},
   ev1:function(n){return "at least one of the "+n+" seeds germinates";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" seeds germinate";}}
];
var BIN_CANDY={id:"candies",a:1,d:20,nMin:12,nMax:20,succ:"peppermint candies",
  setup:function(n){return "In a very large batch of mixed candies, \\("+frN(1,20)+"\\) of the candies are peppermint. A handful of "+n+" candies is drawn at random, so the draws are effectively independent.";},
  ev1:function(n){return "at least one of the "+n+" candies is peppermint";}};
E("u9-binomial-prob",9,["9.13","9.32"],2,"gen",function(){
  var arm=pick(["exact","atmost","atleast1","top"]);
  function proposal(){
    var cx,n,lo,hi;
    if(arm==="atleast1"&&Math.random()<0.45){cx=BIN_CANDY;n=ri(cx.nMin,cx.nMax);lo=1;hi=n;}
    else{cx=pick(BIN_CTX);n=ri(cx.nMin,cx.nMax);
      if(arm==="exact"){var k=ri(1,n-1);lo=hi=k;}
      else if(arm==="atmost"){lo=0;hi=pick([1,2]);}
      else if(arm==="atleast1"){lo=1;hi=n;}
      else{lo=n-1;hi=n;}}
    var num=0,j;for(j=lo;j<=hi;j++)num+=binTermNum(n,j,cx.a,cx.d);
    return {cx:cx,n:n,lo:lo,hi:hi,num:num,den:Math.pow(cx.d,n)};
  }
  /* A draw is only usable when its probability is worth stating
     to three decimal places: below 0.02 the key rounds away to
     (nearly) nothing, and an at-least-one key above 0.9995
     rounds to 1. Proposals are resampled until the value lands
     in range; each arm's fallback proposal is in range by
     construction, so the loop always ends on a sound draw. */
  var FALLBACK={exact:{cx:"coin",n:6,lo:3,hi:3},atmost:{cx:"coin",n:7,lo:0,hi:2},atleast1:{cx:"defects",n:6,lo:1,hi:6},top:{cx:"coin",n:6,lo:5,hi:6}};
  var draw=null,tries;
  for(tries=0;tries<12&&!draw;tries++){var p=proposal();if(p.num/p.den>=0.02&&p.num/p.den<=0.9995)draw=p;}
  if(!draw){var f=FALLBACK[arm];var fc=BIN_CTX.filter(function(c){return c.id===f.cx;})[0];var numF=0,jF;for(jF=f.lo;jF<=f.hi;jF++)numF+=binTermNum(f.n,jF,fc.a,fc.d);draw={cx:fc,n:f.n,lo:f.lo,hi:f.hi,num:numF,den:Math.pow(fc.d,f.n)};}
  var cx=draw.cx,n=draw.n,lo=draw.lo,hi=draw.hi,num=draw.num,den=draw.den,a=cx.a,d=cx.d,ev,sol;
  var head="Let \\(X\\) be the number of "+cx.succ+". The "+n+" trials are independent, each trial has two outcomes, and the success probability is \\(p = "+frN(a,d)+"\\) on every trial, so \\(X\\) has a binomial distribution with \\(n = "+n+"\\): \\(P(X = j) = \\binom{"+n+"}{j} p^{j} (1-p)^{"+n+"-j}\\). ";
  if(arm==="exact"){
    ev=cx.evE(n,lo);
    sol=head+"For exactly "+lo+": \\[ P(X = "+lo+") = "+binTermStr(n,lo,a,d)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
  }else if(arm==="atmost"){
    ev=cx.evM(n,hi);
    var parts=[],j;for(j=0;j<=hi;j++)parts.push("\\(P(X = "+j+") = "+frN(binTermNum(n,j,a,d),den)+"\\)");
    sol=head+"At most "+hi+" means \\(X\\) is 0, 1, ..., "+hi+", so those terms add: "+parts.join(", ")+". The sum is \\("+frN(num,den)+" \\approx "+fmt(num/den,3)+"\\).";
  }else if(arm==="atleast1"){
    ev=cx.ev1(n);var p0=binTermNum(n,0,a,d);
    if(den<=100000)sol=head+"At least one is everything except none at all, so use the complement: \\[ P(X \\ge 1) = 1 - P(X = 0) = 1 - "+binTermStr(n,0,a,d)+" = 1 - "+frN(p0,den)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
    else sol=head+"At least one is everything except none at all, so use the complement: \\[ P(X \\ge 1) = 1 - P(X = 0) = 1 - "+binTermStr(n,0,a,d)+" \\approx 1 - "+fmt(p0/den,3)+" = "+fmt(num/den,3)+" \\]";
  }else{
    ev=cx.evT(n);var t1=binTermNum(n,n-1,a,d),t2=binTermNum(n,n,a,d);
    sol=head+"At least "+(n-1)+" leaves only two cases: \\[ P(X \\ge "+(n-1)+") = P(X = "+(n-1)+") + P(X = "+n+") = "+frN(t1,den)+" + "+frN(t2,den)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
  }
  return numq(cx.setup(n)+" What is the probability that "+ev+"? Give your answer as a decimal (to three decimal places).",
    Math.round(num/den*1000)/1000,0.002,sol,{arm:arm,cx:cx.id,n:n,lo:lo,hi:hi,a:a,d:d});
});
var BIN_EXP=[
  {id:"bolts",n:40,a:1,d:8,item:"defective bolts",fail:"non-defective bolts",run:"batch of 40 bolts",
   setup:"A machine fills batches of 40 bolts. Each bolt is defective with probability \\(\\frac{1}{8}\\), independently of the others."},
  {id:"throws",n:200,a:3,d:4,item:"made free throws",fail:"missed free throws",run:"block of 200 attempts",
   setup:"A basketball player makes each free throw with probability \\(\\frac{3}{4}\\), independently of the others. Consider her next 200 attempts."},
  {id:"guessing",n:20,a:1,d:4,item:"correct guesses",fail:"incorrect guesses",run:"20-question guessed quiz",
   setup:"A student guesses every answer on a 20-question quiz with four options per question, independently, so each guess is correct with probability \\(\\frac{1}{4}\\)."},
  {id:"seeds",n:60,a:5,d:6,item:"germinated seeds",fail:"seeds that fail to germinate",run:"tray of 60 seeds",
   setup:"A nursery plants trays of 60 seeds. Each seed germinates with probability \\(\\frac{5}{6}\\), independently of the others."},
  {id:"wells",n:24,a:2,d:3,item:"wells that strike water",fail:"dry wells",run:"set of 24 wells",
   setup:"In one region, each drilled well strikes water with probability \\(\\frac{2}{3}\\), independently of the others. A contractor drills 24 wells."}
];
E("u9-binomial-expected",9,["9.5","9.6"],2,"gen",function(){
  var cx=pick(BIN_EXP),n=cx.n,a=cx.a,d=cx.d;
  var ev0=n*a/d,fv0=n*(d-a)/d;
  var lr=function(v){return v+". It is the long-run average: over many runs like this one, the number of "+cx.item+" averages about "+v+" per "+cx.run+", though any single run may give more or fewer.";};
  var d1=ev0+". Every run gives exactly "+ev0+" "+cx.item+"; the count is fixed by the probability and does not vary from run to run.";
  var d3=ev0+". It is the most likely single count, so nearly every run gives exactly "+ev0+" "+cx.item+".";
  var sol="The number of "+cx.item+" is binomial with \\(n = "+n+"\\) and \\(p = "+frN(a,d)+"\\), so its expected value is \\(E(X) = np = "+n+" \\times "+frN(a,d)+" = "+ev0+"\\). An expected value is a long-run average, not a promise about a single run: repeat the run many times and the counts average out to about "+ev0+" per run, while individual runs land above and below it. Two of the other options pair the right value with the wrong meaning (a count that never varies, or one that nearly every run hits exactly). The remaining one uses the failure probability instead: \\("+n+" \\times "+frN(d-a,d)+" = "+fv0+"\\) is the expected number of "+cx.fail+", not of "+cx.item+".";
  return mcq(cx.setup+" What is the expected number of "+cx.item+", and what does that number mean?",
    lr(ev0),[d1,lr(fv0),d3],sol,{cx:cx.id,n:n,a:a,d:d,E:ev0,F:fv0});
});
var BIN_GOOD=[
  {id:"coin-flips",t:"A fair coin is flipped 6 times, and X is the number of heads."},
  {id:"seed-packet",t:"A packet holds 12 seeds, and each seed germinates with probability \\(\\frac{4}{5}\\), independently of the others. X is the number of seeds that germinate."},
  {id:"bottle-check",t:"A machine fills bottles one after another, and each bottle is underfilled with probability \\(\\frac{1}{10}\\), independently of the others. An inspector checks 15 bottles, and X is the number that are underfilled."},
  {id:"quiz-guess",t:"A student guesses on each of 8 multiple-choice questions with four options, independently from question to question. X is the number of questions answered correctly."},
  {id:"free-throws",t:"A player takes 10 free throws, making each one with probability \\(\\frac{3}{4}\\), independently of the others. X is the number of free throws she makes."}
];
var BIN_BAD={
  fixed:[
    {id:"until-defect",t:"An inspector tests light bulbs one at a time until she finds the first defective bulb, and then stops. X is the number of bulbs she tests.",why:"testing stops at the first defective bulb, so how many trials occur is decided by the outcomes, not fixed beforehand"},
    {id:"until-sale",t:"A salesperson phones potential customers until she makes her first sale, and then stops for the day. X is the number of calls she makes.",why:"calling stops at the first sale, so how many trials occur is decided by the outcomes, not fixed beforehand"},
    {id:"until-six",t:"A player rolls a die again and again until a 6 appears. X is the number of rolls made.",why:"rolling stops when a 6 appears, so how many trials occur is decided by the outcomes, not fixed beforehand"}],
  binary:[
    {id:"die-sum",t:"A die is rolled 8 times, and X is the sum of the eight numbers rolled.",why:"each roll has six outcomes, not two, and X adds the results instead of counting successes"},
    {id:"spinner-total",t:"A spinner numbered 1 to 5 is spun 9 times, and X is the total of the nine numbers spun.",why:"each spin has five outcomes, not two, and X adds the results instead of counting successes"},
    {id:"highest-roll",t:"Each of 7 students rolls a die once, and X is the highest number rolled.",why:"each roll has six outcomes, not two, and X takes the largest result instead of counting successes"}],
  indep:[
    {id:"marbles-wor",t:"A bag holds 5 red and 5 blue marbles. Five marbles are drawn without replacement, and X is the number of red marbles drawn.",why:"the draws are made without replacement, so each draw changes the bag and the draws are not independent"},
    {id:"cards-wor",t:"Five cards are drawn from a standard deck without replacement, and X is the number of hearts among them.",why:"the draws are made without replacement, so each draw changes the deck and the draws are not independent"},
    {id:"names-wor",t:"The names of 20 students are in a hat, 8 of them in Grade 12. Four names are drawn without replacement, and X is the number of Grade 12 names drawn.",why:"the draws are made without replacement, so each draw changes the hat and the draws are not independent"}],
  prob:[
    {id:"quiz-harder",t:"A student writes a 10-question quiz in which the questions grow steadily harder, so her probability of answering correctly is different on every question. X is the number of questions she answers correctly.",why:"her probability of success changes from question to question instead of staying the same on every trial"},
    {id:"darts-warm",t:"A dart player throws 20 darts in a session. As she warms up, her probability of hitting the bullseye rises steadily from throw to throw. X is the number of bullseyes.",why:"her probability of success changes from throw to throw instead of staying the same on every trial"},
    {id:"throws-tire",t:"A player takes 20 free throws in a row. As she tires, her probability of making each throw drops steadily. X is the number of free throws she makes.",why:"her probability of success changes from throw to throw instead of staying the same on every trial"}]
};
var BIN_CAT_NAME={fixed:"the fixed number of trials condition",binary:"the two outcomes per trial condition",indep:"the independent trials condition",prob:"the same probability of success on every trial condition"};
E("u9-binomial-identify",9,["9.12","9.13"],2,"gen",function(){
  var good=pick(BIN_GOOD);
  var cats=shuffle(["fixed","binary","indep","prob"]).slice(0,3);
  var bads=cats.map(function(c){return {cat:c,s:pick(BIN_BAD[c])};});
  var sol="X has a binomial distribution only when four conditions all hold: the number of trials is fixed in advance, each trial has exactly two outcomes (success and failure), the trials are independent, and the probability of success is the same on every trial. The keyed setting is the only one meeting all four. Each other setting breaks exactly one condition: "+bads.map(function(b){return "\""+b.s.t+"\" breaks "+BIN_CAT_NAME[b.cat]+", because "+b.s.why;}).join("; ")+".";
  return mcq("In which setting does X have a binomial distribution?",
    good.t,bads.map(function(b){return b.s.t;}),sol,
    {good:good.id,cats:cats.join(","),bads:bads.map(function(b){return b.s.id;}).join(",")});
});
/* Enrichment flags (Nov 13, 2026): no Math 3201 indicator
   names the binomial distribution, so the three entries above
   are enrichment. The flag is a property on the entry, set
   here in the bank module the way the Math 2201 Unit 7 flags
   are set in that course's bank-u7.js; assembly carries it
   into banks/math-3201.js verbatim, and the shell keeps
   flagged entries out of practice draws and composed papers
   unless a teacher deliberately includes them from Advanced
   tools. */
BANK.forEach(function(e){if(e.id==="u9-binomial-prob"||e.id==="u9-binomial-expected"||e.id==="u9-binomial-identify")e.enrich=true;});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-add-diff-den":2,"u1-add-same-den":2,"u1-context-cost":3,"u1-context-wind":3,"u1-context-work":3,"u1-create-equivalent":1,"u1-div":2,"u1-equiv-forms":1,"u1-error-simplify":2,"u1-lcd":1,"u1-mult":2,"u1-npv-equation":1,"u1-npv-linear":1,"u1-npv-operations":1,"u1-npv-quadratic":2,"u1-reverse-restrictions":3,"u1-simplify-gcf":1,"u1-simplify-monomial":1,"u1-simplify-quad":2,"u1-solve-cross":2,"u1-solve-quad-eq":2,"u1-solve-simple":1,"u1-sub-monomial-den":2,"u1-two-step-simplify":3,"u2-correct-the-claim-cr":2,"u2-degree-equation":1,"u2-end-behaviour":1,"u2-fit-value":2,"u2-graph-characteristics":1,"u2-interpret-model":2,"u2-match-equation-graph":2,"u2-model-change-cr":2,"u2-recover-and-predict-cr":3,"u2-reverse-intercepts":3,"u2-turning-points-graph":1,"u2-y-intercept":1,"u2-zeros-and-intercept-cr":3,"u3-build-equation":2,"u3-characteristics-combo-cr":2,"u3-data-equation":2,"u3-data-fit-params":1,"u3-decimal-convert":1,"u3-deg-to-rad":1,"u3-eq-amplitude-period":1,"u3-eq-phase-shift":1,"u3-eq-range-midline":1,"u3-evaluate-equation-cr":3,"u3-ferris-interpret":1,"u3-first-max-time-cr":2,"u3-graph-amplitude":1,"u3-graph-full-equation":4,"u3-graph-period-midline":1,"u3-graph-range":1,"u3-match-eq-graph":2,"u3-rad-to-deg":1,"u3-temp-model":3,"u3-tide-predict":3,"u4-compare-models":3,"u4-compound-model":1,"u4-data-fit-equation":2,"u4-data-next-value":1,"u4-eq-characteristics":1,"u4-estimate-solution":1,"u4-express-as-power":1,"u4-find-base":3,"u4-graph-characteristics":1,"u4-growth-model-eval":2,"u4-half-life":2,"u4-interpret-graph-model":1,"u4-match-by-description":2,"u4-match-graph":2,"u4-reverse-half-life":3,"u4-solve-common-base":2,"u4-solve-isolate":2,"u4-solve-rewrite-base":2,"u4-solve-two-sided":2,"u5-catch-up":3,"u5-condense-log":2,"u5-context-model":2,"u5-convert-form":1,"u5-data-fit-log":2,"u5-eq-char":1,"u5-estimate-log":1,"u5-evaluate-log":1,"u5-evaluate-mixed":1,"u5-expand-log":2,"u5-graph-char":1,"u5-growth-time":2,"u5-interpret-graph":1,"u5-law-numeric":2,"u5-match-graph":2,"u5-ph-scale":2,"u5-richter-decibel":2,"u5-simplify-eval":2,"u5-solve-condense":3,"u5-solve-log-basic":1,"u5-solve-with-logs":2,"u5-two-bases":3,"u5-which-law":1,"u6-amortization-read":1,"u6-appreciate-depreciate":1,"u6-compare-costs":3,"u6-compare-frequency":2,"u6-compound-amount":2,"u6-cost-benefit":3,"u6-credit-fees":2,"u6-deferred-offer":3,"u6-depreciation-value":2,"u6-find-term":2,"u6-interest-earned":2,"u6-payments-term":1,"u6-present-value":2,"u6-read-formula":1,"u6-rent-buy-lease":2,"u6-simple-interest":1,"u6-total-cost-loan":1,"u7-complement-elements":1,"u7-deduction-mc":1,"u7-error-correct":2,"u7-error-venn":2,"u7-exactly-two-cr":3,"u7-operations":2,"u7-region-meaning":1,"u7-relations-count-cr":2,"u7-search-logic":1,"u7-subset-difference-cr":2,"u7-symmetric-difference-cr":3,"u7-three-set-problem":2,"u7-two-set-notation":1,"u7-two-set-problem":1,"u7-two-set-totals-cr":3,"u7-venn-fill":1,"u7-venn-missing":2,"u7-venn-read":1,"u7-venn-three-read":2,"u8-arrange-all":1,"u8-comb-r":1,"u8-comb-two-group":2,"u8-committee-atleast":3,"u8-factorial-equation":2,"u8-factorial-fraction":2,"u8-factorial-value":1,"u8-fcp-cases":3,"u8-fcp-context":1,"u8-fcp-pattern":1,"u8-fcp-restricted":3,"u8-fixed-position":2,"u8-identical-perm":2,"u8-mixed-roles":2,"u8-pathways":2,"u8-pathways-context":3,"u8-perm-or-comb":1,"u8-perm-r":1,"u8-prob-comb":2,"u8-prob-comb-hard":3,"u8-reverse-count":2,"u8-together-apart":3,"u8-tree-diagram":1,"u8-tree-outcomes":2,"u9-compare-games":3,"u9-complementary":1,"u9-conditional":2,"u9-context-prob":1,"u9-convert-odds-prob":1,"u9-create-problem":2,"u9-create-solve-game":3,"u9-independent-pair-cr":2,"u9-independent-prob":1,"u9-me-or-not":2,"u9-me-prob":1,"u9-nonme-prob":2,"u9-prob-basics":1,"u9-prob-comb-context":3,"u9-prob-odds-determine":1,"u9-prob-perm-context":3,"u9-represent-events":2,"u9-same-colour-cr":3};
