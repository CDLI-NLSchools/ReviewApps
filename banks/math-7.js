/* Math 7 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-7/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 7 bank helpers: FR and precPair, cut verbatim from the
   head of the standalone bank source (math-7-review/bank-src.js,
   lines 1 to 31), where they precede the Unit 1 banner. */
/* Math 7 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit8.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}
/* Precision pairing (Nov 8 programme): pad DISTRACTOR numeric strings with
   trailing zeros so no printed decimal-place count stands alone among the
   four options. Values are never changed and the key string is never
   altered; only distractor texts passed in are reformatted. */
function precPair(keyT, ds){
  function parse(s){ var m=String(s).match(/^(\$?)(-?\d+)(?:\.(\d+))?(%?)$/); if(!m) return null; return {pre:m[1], intp:m[2], frac:m[3]||"", suf:m[4], dp:(m[3]||"").length}; }
  var k=parse(keyT); if(!k) return ds;
  var ps=ds.map(function(o){ return parse(o.t); });
  if(ps.some(function(p){ return !p; })) return ds;
  var M=k.dp; ps.forEach(function(p){ if(p.dp>M) M=p.dp; });
  function render(p,target){
    var core;
    if(target===0) core=p.intp;
    else if(p.dp>=target) core=p.intp+"."+p.frac;
    else if(p.dp===0) core=p.intp+"."+("000000".slice(0,target));
    else core=p.intp+"."+p.frac+("000000".slice(0,target-p.dp));
    return p.pre+core+p.suf;
  }
  var targets=new Array(ps.length), found=null;
  function countsOk(arr){ var c={}, i; c[k.dp]=1; for(i=0;i<arr.length;i++) c[arr[i]]=(c[arr[i]]||0)+1; for(var v in c){ if(c[v]===1) return false; } return true; }
  function search(i){ if(found) return; if(i===ps.length){ if(countsOk(targets)) found=targets.slice(); return; } for(var t=ps[i].dp;t<=M;t++){ targets[i]=t; search(i+1); if(found) return; } }
  search(0);
  if(!found) return ds;
  return ds.map(function(o,i){ var nt=render(ps[i],found[i]); if(nt===o.t) return o; var n2={}; for(var kk in o) n2[kk]=o[kk]; n2.t=nt; return n2; });
}

/* Geometry figure helpers added for the Math 7 geometry units.
   Each helper draws only values passed in from the question's own
   drawn parameters, so the figure always matches the stem. Labels
   use numbers, units and the symbols base and h, matching the
   figures already in this bank. */
function figParaRect(bLabel,hLabel){
  var out='<svg viewBox="0 0 350 180" width="350" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram cut and rearranged into a rectangle">';
  out+='<polygon points="30,125 130,125 155,50 55,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="55" y1="50" x2="55" y2="125" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+='<path d="M 100 32 Q 175 6 232 30" fill="none" stroke="'+FIG_ACC+'" stroke-width="2"/>';
  out+='<polygon points="240,31 225,24 227,39" fill="'+FIG_ACC+'"/>';
  out+='<rect x="195" y="50" width="100" height="75" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="270,125 295,125 295,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(80,145,bLabel,12.5,false);
  out+=_txt(245,145,bLabel,12.5,false);
  out+=_txt(74,88,hLabel,12,false);
  return out+'</svg>';
}
function figTriHalf(mode,bLabel,hLabel){
  var out='<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shape split into two identical triangles">';
  if(mode==="rect"){
    out+='<rect x="40" y="50" width="190" height="75" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<polygon points="40,125 230,125 230,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    out+=_txt(135,145,bLabel,12.5,false);
    out+=_txt(250,88,hLabel,12,false);
  } else {
    out+='<polygon points="35,125 155,125 180,50 60,50" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<polygon points="35,125 155,125 60,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    out+='<line x1="60" y1="50" x2="60" y2="125" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
    out+=_txt(95,145,bLabel,12.5,false);
    out+=_txt(76,88,hLabel,12,false);
  }
  return out+'</svg>';
}
function figSign(wLabel,lLabel){
  var out='<svg viewBox="0 0 260 215" width="260" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with a semicircle on top">';
  out+='<path d="M 55 85 A 75 75 0 0 1 205 85" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="55,85 205,85 205,185 55,185" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt(130,202,wLabel,12.5,false);
  out+=_txt(32,135,lLabel,12.5,false);
  return out+'</svg>';
}
function figRectCircle(L,W,r,unit){
  var sc=Math.min(230/L,120/W), rw=L*sc, rh=W*sc, x0=(300-rw)/2, y0=(190-rh)/2, cx=150, cy=95, rp=r*sc;
  var out='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle with a circle inside">';
  out+='<rect x="'+fmt(x0,1)+'" y="'+fmt(y0,1)+'" width="'+fmt(rw,1)+'" height="'+fmt(rh,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="'+cx+'" cy="'+cy+'" r="'+fmt(rp,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="'+cx+'" cy="'+cy+'" r="2.4" fill="'+FIG_INK+'"/>';
  out+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(cx+rp,1)+'" y2="'+cy+'" stroke="'+FIG_ACC+'" stroke-width="2"/>';
  out+=_txt(cx+rp/2,cy-11,"r = "+r+" "+unit,12,false);
  out+=_txt(150,y0+rh+17,L+" "+unit,12.5,false);
  out+=_txt(x0-10,cy,W+" "+unit,12,false,"end");
  return out+'</svg>';
}
function figMix(b1,h1,b2,h2,unit){
  var out='<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram plot joined to a triangular plot">';
  out+='<polygon points="15,130 105,130 125,55 35,55" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="35" y1="55" x2="35" y2="130" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+='<polygon points="165,130 275,130 205,55" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="205" y1="55" x2="205" y2="130" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>';
  out+=_txt(60,150,"base = "+b1+" "+unit,12,false);
  out+=_txt(220,150,"base = "+b2+" "+unit,12,false);
  out+=_txt(51,92,"h = "+h1+" "+unit,11.5,false);
  out+=_txt(221,92,"h = "+h2+" "+unit,11.5,false);
  return out+'</svg>';
}
function figGridArea(F,H){
  var cols=6, cell=24, rows=Math.ceil((F+H)/cols), W=cols*cell+36, Hh=rows*cell+30;
  var out='<svg viewBox="0 0 '+W+' '+Hh+'" width="'+W+'" height="'+Hh+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shape on grid paper made of whole and half squares">';
  for(var i=0;i<F+H;i++){
    var x=18+(i%cols)*cell, y=14+Math.floor(i/cols)*cell;
    if(i<F){
      out+='<rect x="'+x+'" y="'+y+'" width="'+cell+'" height="'+cell+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    } else {
      out+='<rect x="'+x+'" y="'+y+'" width="'+cell+'" height="'+cell+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<polygon points="'+x+','+(y+cell)+' '+(x+cell)+','+(y+cell)+' '+x+','+y+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    }
  }
  return out+'</svg>';
}
function figWideGrid(points,polys,segs){
  var m=6;
  function scan(x,y){var a=Math.max(Math.abs(x),Math.abs(y));if(a>m)m=a;}
  if(points)points.forEach(function(p){scan(p.x,p.y);});
  if(polys)polys.forEach(function(pl){pl.forEach(function(q){scan(q[0],q[1]);});});
  if(segs)segs.forEach(function(s){scan(s[0],s[1]);scan(s[2],s[3]);});
  var E=Math.ceil(m), W=280, c=140, st=126/E;
  function X(x){return c+x*st;} function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-E;g<=E;g++){if(g===0)continue;out+='<line x1="'+fmt(X(g),1)+'" y1="8" x2="'+fmt(X(g),1)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+fmt(Y(g),1)+'" x2="272" y2="'+fmt(Y(g),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+fmt(X(s[0]),1)+'" y1="'+fmt(Y(s[1]),1)+'" x2="'+fmt(X(s[2]),1)+'" y2="'+fmt(Y(s[3]),1)+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+fmt(X(p.x),1)+'" cy="'+fmt(Y(p.y),1)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function figAxes(mode){
  var W=240, c=120, st=17;
  function X(x){return c+x*st;} function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane axes">';
  if(mode==="quad2")out+='<rect x="'+fmt(X(-6),1)+'" y="'+fmt(Y(6),1)+'" width="102" height="102" fill="'+FIG_SHADE+'"/>';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+fmt(X(g),1)+'" y1="10" x2="'+fmt(X(g),1)+'" y2="230" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="10" y1="'+fmt(Y(g),1)+'" x2="230" y2="'+fmt(Y(g),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="10" y1="120" x2="230" y2="120" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="120" y1="10" x2="120" y2="230" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="230,120 222,115 222,125" fill="'+FIG_INK+'"/><polygon points="120,10 115,18 125,18" fill="'+FIG_INK+'"/>';
  out+=_txt(224,106,"x",13,true)+_txt(134,22,"y",13,true);
  out+='<circle cx="120" cy="120" r="2.8" fill="'+FIG_INK+'"/>';
  if(mode==="quad2")out+=_txt(69,69,"II",14,true);
  if(mode==="onaxis")out+='<circle cx="120" cy="'+fmt(Y(4),1)+'" r="3.6" fill="'+FIG_ALT+'"/>';
  return out+'</svg>';
}
function figBisect(kind){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bisector diagram">';
  if(kind==="angle"){
    out+='<line x1="50" y1="95" x2="215" y2="30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<line x1="50" y1="95" x2="215" y2="160" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<line x1="50" y1="95" x2="220" y2="95" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
    out+='<path d="M 94.7 77.4 A 48 48 0 0 1 94.7 112.6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    out+='<path d="M 81.7 82.5 A 34 34 0 0 1 81.7 107.5" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    out+='<circle cx="50" cy="95" r="3" fill="'+FIG_INK+'"/>';
    return out+'</svg>';
  }
  if(kind==="construct"){
    out+='<circle cx="55" cy="115" r="78" fill="none" stroke="'+FIG_ACC+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    out+='<circle cx="205" cy="115" r="78" fill="none" stroke="'+FIG_ACC+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  }
  out+='<line x1="35" y1="115" x2="225" y2="115" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<circle cx="35" cy="115" r="3" fill="'+FIG_INK+'"/><circle cx="225" cy="115" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="115" r="3" fill="'+FIG_INK+'"/>';
  out+='<line x1="130" y1="22" x2="130" y2="162" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 130 103 h 12 v 12" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  return out+'</svg>';
}
function figSegMid(totalLabel){
  var out='<svg viewBox="0 0 260 175" width="260" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segment crossed at its midpoint by its perpendicular bisector">';
  out+='<line x1="35" y1="100" x2="225" y2="100" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<circle cx="35" cy="100" r="3" fill="'+FIG_INK+'"/><circle cx="225" cy="100" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="100" r="3.2" fill="'+FIG_ALT+'"/>';
  out+='<line x1="130" y1="28" x2="130" y2="140" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 130 88 h 12 v 12" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
  out+=_txt(82,124,"?",13,true)+_txt(178,124,"?",13,true);
  out+=_txt(130,160,totalLabel,12.5,false);
  return out+'</svg>';
}
function figEqui(abLabel,paLabel){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point on the perpendicular bisector of a segment">';
  out+='<line x1="130" y1="18" x2="130" y2="162" stroke="'+FIG_ACC+'" stroke-width="1.8" stroke-dasharray="6 4"/>';
  out+='<line x1="40" y1="145" x2="220" y2="145" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<line x1="130" y1="35" x2="40" y2="145" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="130" y1="35" x2="220" y2="145" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="40" cy="145" r="3" fill="'+FIG_INK+'"/><circle cx="220" cy="145" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="145" r="3" fill="'+FIG_INK+'"/>';
  out+='<circle cx="130" cy="35" r="3.6" fill="'+FIG_ALT+'"/>';
  out+=_txt(122,22,"P",13,true)+_txt(32,160,"A",13,true)+_txt(228,160,"B",13,true);
  out+=_txt(72,84,paLabel,12,false);
  if(abLabel)out+=_txt(130,168,abLabel,12,false);
  return out+'</svg>';
}
function figAngleBisectTotal(totalLabel){
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle split by its bisector">';
  out+='<line x1="50" y1="95" x2="215" y2="30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="50" y1="95" x2="215" y2="160" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="50" y1="95" x2="220" y2="95" stroke="'+FIG_ACC+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<path d="M 94.7 77.4 A 48 48 0 0 1 94.7 112.6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<circle cx="50" cy="95" r="3" fill="'+FIG_INK+'"/>';
  out+=_txt(126,95,totalLabel,12.5,false);
  out+=_txt(160,72,"?",12,true)+_txt(160,120,"?",12,true);
  return out+'</svg>';
}
function figBisectSupp(halfLabel){
  var out='<svg viewBox="0 0 330 180" width="330" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angles on a straight line">';
  out+='<line x1="25" y1="125" x2="305" y2="125" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<line x1="165" y1="125" x2="211" y2="60" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M 199 125 A 34 34 0 0 0 184.5 97.1" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<path d="M 193.7 84 A 50 50 0 0 0 115 125" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<circle cx="165" cy="125" r="3.2" fill="'+FIG_INK+'"/>';
  out+=_txt(222,104,halfLabel,12.5,false);
  out+=_txt(100,98,"x",14,true);
  return out+'</svg>';
}

/* ----- bank-u1.js ----- */
// Math 7 Unit 1 Patterns and Relations question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 32 to 564).
// CRMARKS: u1-factors-count-cr=3
// CRMARKS: u1-evaluate-cr=2
// CRMARKS: u1-table-value-cr=3
// CRMARKS: u1-far-term-cr=3
// CRMARKS: u1-solve-812-cr=3
/* ===== Unit 1 ===== */
/* Math 7 Unit 1: Patterns and Relations. Helpers prefixed u1. */
function u1Expr(a,b,v){ v=v||"n"; var s=(a===1?v:a+v); if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u1DigitSum(n){ var s=0; n=Math.abs(n); while(n>0){ s+=n%10; n=Math.floor(n/10);} return s; }
function u1Why(n,d,yes){
  var last=n%10, last2=n%100, last3=n%1000, ds=u1DigitSum(n);
  if(d===2) return yes?("its last digit, "+last+", is even"):("its last digit, "+last+", is odd");
  if(d===5) return yes?("it ends in "+last):("it ends in "+last+", not 0 or 5");
  if(d===10) return yes?("it ends in 0"):("it ends in "+last+", not 0");
  if(d===4) return yes?("its last two digits form "+last2+", which is divisible by 4"):("its last two digits form "+last2+", which is not divisible by 4");
  if(d===8) return yes?("its last three digits form "+last3+", which is divisible by 8"):("its last three digits form "+last3+", which is not divisible by 8");
  if(d===3) return yes?("its digits add to "+ds+", which is divisible by 3"):("its digits add to "+ds+", which is not divisible by 3");
  if(d===9) return yes?("its digits add to "+ds+", which is divisible by 9"):("its digits add to "+ds+", which is not divisible by 9");
  if(d===6){ if(yes) return "it is even and its digits add to "+ds+", divisible by 3";
    if(n%2!==0) return "it is odd, so it fails the test for 2"; return "its digits add to "+ds+", not divisible by 3, so it fails the test for 3"; }
  return "";
}
function u1Factors(n){ var f=[]; for(var i=1;i<=n;i++){ if(n%i===0)f.push(i);} return f; }
function u1Plot(pts,xMax,yMax,xLab,yLab){
  var W=252,H=214,ox=36,oy=178,sx=(W-ox-14)/xMax,sy=(oy-24)/yMax;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  var yStep=yMax>12?2:1;
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx++){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  pts.forEach(function(p){ s+='<circle cx="'+fmt(ox+p[0]*sx,1)+'" cy="'+fmt(oy-p[1]*sy,1)+'" r="4" fill="'+FIG_ACC+'"/>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}

E("u1-divisible-by", 1, ["5.1"], 1, "gen", function(){
  var d=pick([2,3,4,5,6,8,9,10]);
  var n=ri(12,140)*d;
  var ds=[],guard=0;
  while(ds.length<3&&guard++<300){ var m=ri(24,1400); if(m%d!==0&&m!==n&&ds.indexOf(m)<0)ds.push(m); }
  var opts=ds.map(function(m){ return {t:String(m), fb:fmt(m)+" is not divisible by "+d+": "+u1Why(m,d,false)+"."}; });
  return mcq("Which number is divisible by \\("+d+"\\)?",
    {t:String(n), fb:"Yes: "+u1Why(n,d,true)+", so \\("+n+" \\div "+d+"\\) has no remainder."}, opts,
    "Use the divisibility test for \\("+d+"\\): "+u1Why(n,d,true)+". So \\("+n+"\\) is divisible by \\("+d+"\\). The answer is <b>"+n+"</b>.",
    {d:d,n:n});
}, ["Pick the divisor first and recall its divisibility test.", "Start by applying the test to each number in turn until one passes."]);

E("u1-divisibility-why", 1, ["5.1"], 1, "gen", function(){
  var d=pick([3,9]), n=0, guard=0;
  while(guard++<500){ var cand=ri(210,980); if(cand%d===0&&(cand%10)%d!==0&&(cand%100)%d!==0&&(cand%10)!==0&&(cand%10)!==5){ n=cand; break; } }
  if(!n)n=(d===3?417:648);
  var S=u1DigitSum(n), last=n%10, last2=n%100;
  var opts=[
    {t:"Its last digit, "+last+", is itself divisible by "+d+".", fb:"The last digit is the test for 2, 5 and 10, not for "+d+"."},
    {t:"Its last two digits form "+last2+", which is divisible by "+d+".", fb:"The last-two-digits test belongs to 4. For "+d+", use the digit sum."},
    {t:"It ends in 0 or 5, which is the test for 5.", fb:"Ending in 0 or 5 is the test for 5 (and partly for 10), not for "+d+"."}];
  return mcq("Why is \\("+n+"\\) divisible by \\("+d+"\\)?",
    {t:"Its digits add to "+S+", and "+S+" is divisible by "+d+".", fb:"Correct: the digit-sum test decides divisibility by "+d+"."}, opts,
    "Add the digits of \\("+n+"\\): the digit sum is \\("+S+"\\), and \\("+S+" \\div "+d+" = "+(S/d)+"\\). A digit sum divisible by \\("+d+"\\) means the number is divisible by \\("+d+"\\). The answer is <b>the digit sum, "+S+", is divisible by "+d+"</b>.",
    {d:d,n:n,S:S});
}, ["Recall which test goes with this divisor: 3 and 9 use a digit sum.", "Start by adding all the digits of the number."]);

E("u1-venn-overlap", 1, ["5.2"], 2, "gen", function(){
  var both=0,only2=0,only3=0,neither=0,g=0;
  while(g++<600){ var c1=ri(12,96); if(c1%6===0)both=c1; var c2=ri(11,99); if(c2%2===0&&c2%3!==0)only2=c2;
    var c3=ri(11,99); if(c3%3===0&&c3%2!==0)only3=c3; var c4=ri(11,99); if(c4%2!==0&&c4%3!==0)neither=c4;
    if(both&&only2&&only3&&neither&&new Set([both,only2,only3,neither]).size===4)break; }
  var nums=shuffle([both,only2,only3,neither]);
  var fbMap={}; fbMap[both]="Yes: "+both+" is divisible by both 2 and 3, so it sits in the overlap.";
  fbMap[only2]=only2+" is divisible by 2 but its digits add to "+u1DigitSum(only2)+", not divisible by 3, so it goes in the 2 circle only.";
  fbMap[only3]=only3+" is divisible by 3 but odd, so it goes in the 3 circle only.";
  fbMap[neither]=neither+" is divisible by neither 2 nor 3, so it goes outside both circles.";
  var opts=nums.filter(function(m){return m!==both;}).map(function(m){return {t:String(m), fb:fbMap[m]};});
  var q=mcq("The numbers \\("+nums.join(", ")+"\\) are sorted into a Venn diagram with circles labelled Divisible by 2 and Divisible by 3. Which number goes in the overlap of the two circles?",
    {t:String(both), fb:fbMap[both]}, opts,
    "The overlap holds numbers divisible by both 2 and 3. Only \\("+both+"\\) passes both tests: "+u1Why(both,2,true)+" and "+u1Why(both,3,true)+". The answer is <b>"+both+"</b>.",
    {both:both});
  q.figure='<svg width="300" height="170" viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="118" cy="88" r="62" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<circle cx="184" cy="88" r="62" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="86" y="34" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">Divisible by 2</text>'
    +'<text x="216" y="34" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">Divisible by 3</text>'
    +'<text x="151" y="92" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">both</text></svg>';
  return q;
}, ["The overlap is for numbers that pass both tests.", "Start by testing each number for divisibility by 2, then by 3."]);

E("u1-carroll-cell", 1, ["5.2","5.1"], 1, "gen", function(){
  var n=ri(11,99), by5=n%5===0, even=n%2===0;
  var cells=["Divisible by 5 and even","Divisible by 5 and not even","Not divisible by 5 and even","Not divisible by 5 and not even"];
  var idx=(by5?0:2)+(even?0:1);
  var facts="\\("+n+"\\) "+(by5?"ends in "+(n%10)+", so it is divisible by 5":"ends in "+(n%10)+", so it is not divisible by 5")+" and it is "+(even?"even":"not even")+".";
  var opts=cells.filter(function(c,i){return i!==idx;}).map(function(c){ return {t:c, fb:"That cell needs different test results. "+facts}; });
  return mcq("A Carroll diagram has rows Divisible by 5 and Not divisible by 5, and columns Even and Not even. Which cell holds \\("+n+"\\)?",
    {t:cells[idx], fb:"Correct: "+facts}, opts,
    "Test \\("+n+"\\): "+facts+" So it belongs in the row and column matching those results. The answer is <b>"+cells[idx]+"</b>.",
    {n:n});
}, ["Run both tests on the number before choosing a cell.", "Start with the test for 5 (the ending digit), then check whether the number is even."]);

E("u1-divide-by-zero", 1, ["5.3"], 1, "var", varset([
  function(){ return mcq("Why can \\(12 \\div 0\\) not be given an answer?",
    {t:"There is no number that multiplied by 0 gives 12.", fb:"Correct: division is checked by multiplication, and every number times 0 is 0."},
    [{t:"The answer is 0, because zero groups share it.", fb:"If 12 divided by 0 were 0, then 0 times 0 would have to equal 12, and it does not."},
     {t:"The answer is 12, the same number that was divided at the start.", fb:"If it were 12, then 12 times 0 would have to equal 12, but it equals 0."},
     {t:"Any number works as the answer to the division in the question.", fb:"A quotient must check out by multiplication; no number times 0 gives 12."}],
    "Division undoes multiplication. For \\(12 \\div 0\\) to have an answer \\(q\\), we would need \\(q \\times 0 = 12\\), but every number times 0 is 0. The answer is <b>no such number exists</b>.", {}); },
  function(){ return mcq("Ten cookies are to be shared equally into groups, but the group size is 0. Why does \\(10 \\div 0\\) fail?",
    {t:"Splitting into 0 groups cannot be done, so the division has no answer.", fb:"Correct: a divisor of 0 asks for groups of nothing, which cannot share anything out."},
    [{t:"Each group gets 10 cookies, so all the cookies go to one group.", fb:"That would describe one group of 10, a divisor of 1, not 0."},
     {t:"Each group gets 0 cookies and that finishes the sharing.", fb:"Groups of 0 never use up the 10 cookies, so the sharing never ends."},
     {t:"The answer is 10 because nothing changes when the group size is 0 at the start.", fb:"Division by 0 is not the same as doing nothing; it has no answer."}],
    "Dividing by 0 means making groups of size 0. Groups of 0 never use up the 10 cookies, so the process cannot finish. The answer is <b>division by 0 has no answer</b>.", {}); },
  function(){ return mcq("Which statement explains why \\(7 \\div 0\\) is impossible?",
    {t:"A quotient q would need q times 0 to equal 7, and that never happens.", fb:"Correct: that multiplication check is exactly how division is defined."},
    [{t:"Seven is an odd number, and odd numbers cannot be divided at all.", fb:"Odd numbers divide fine by many divisors; oddness is not the problem."},
     {t:"Zero is smaller than seven, so it cannot be used to divide seven.", fb:"Small divisors are fine: 7 divided by 1 or by 7 both work."},
     {t:"The answer would be a very large number that is too big to write down here.", fb:"No number, large or small, multiplied by 0 gives 7."}],
    "Check by multiplication: \\(7 \\div 0 = q\\) would mean \\(q \\times 0 = 7\\). Since \\(q \\times 0 = 0\\) for every \\(q\\), this cannot happen. The answer is <b>the multiplication check can never work</b>.", {}); },
  function(){ return mcq("A student writes \\(9 \\div 0 = 0\\). Why is the student wrong?",
    {t:"If the quotient were 0, then 0 times 0 would have to equal 9.", fb:"Correct: the multiplication check fails, so 0 cannot be the quotient."},
    [{t:"The quotient should be 9, the number that was divided to begin with.", fb:"Then 9 times 0 would have to equal 9, but it equals 0."},
     {t:"Nine cannot be divided by small numbers in this question.", fb:"Nine divides by 1, 3 and 9 with no trouble; 0 is the special divisor."},
     {t:"Zero can never appear in a calculation of any kind at all.", fb:"Zero works as a dividend: 0 divided by 9 is 0. It fails as a divisor."}],
    "Test the claim with multiplication: \\(0 \\times 0 = 0\\), not 9, so 0 is not the quotient of \\(9 \\div 0\\), and no other number checks out either. The answer is <b>the claim fails the multiplication check</b>.", {}); },
  function(){ return mcq("Which of these divisions can be carried out?",
    {t:"0 divided by 6", fb:"Correct: 0 shared into 6 groups gives 0 in each group, and 6 times 0 checks back to 0."},
    [{t:"6 divided by 0", fb:"A divisor of 0 would need a number times 0 to give 6, which is impossible."},
     {t:"0 divided by 0", fb:"With divisor 0, every number times 0 gives 0, so there is no single answer."},
     {t:"14 divided by 0", fb:"A divisor of 0 never works, whatever the dividend is."}],
    "Only a zero divisor causes the problem. \\(0 \\div 6 = 0\\) because \\(6 \\times 0 = 0\\). The answer is <b>0 divided by 6</b>.", {}); }
]), ["Think about how division is checked with multiplication.", "Start by asking what number times the divisor would give the dividend."]);

E("u1-factor-list", 1, ["5.4"], 1, "gen", function(){
  var n=0,f=[],g0=0;
  while(g0++<300){ n=ri(12,120); f=u1Factors(n); if(f.length>=4)break; }
  var full=f.join(", ");
  var drop=f.filter(function(x){return x!==1&&x!==n;}); var dv=pick(drop);
  var missing=f.filter(function(x){return x!==dv;}).join(", ");
  var extraVal=0,g=0; while(g++<100){ var c=ri(2,n-1); if(n%c!==0){ extraVal=c; break; } }
  var withExtra=f.concat([extraVal]).sort(function(a,b){return a-b;}).join(", ");
  var proper=f.filter(function(x){return x!==n;}).join(", ");
  var opts=[
    {t:missing, fb:"That list leaves out "+dv+", and "+dv+" divides "+n+" exactly."},
    {t:withExtra, fb:"That list includes "+extraVal+", and "+extraVal+" does not divide "+n+" exactly."},
    {t:proper, fb:"That list leaves out "+n+" itself; a number is always a factor of itself."}];
  return mcq("Which list gives ALL the factors of \\("+n+"\\)?",
    {t:full, fb:"Correct: every number in the list divides "+n+" exactly, and none are missing."}, opts,
    "Test the small numbers in order using the divisibility rules and record each factor pair. The factors of \\("+n+"\\) are "+full+". The answer is <b>"+full+"</b>.",
    {n:n});
}, ["Work through the small numbers in order and test each one.", "Start with 1 and the number itself, then test 2, 3, 4 and so on, recording pairs."]);

E("u1-variable-meaning", 1, ["8.4"], 1, "var", varset([
  function(){ return mcq("Tickets cost $9 each. The total cost is written as \\(9t\\), where \\(t\\) is the number of tickets. What is \\(t\\)?",
    {t:"A variable: a value that can change from one purchase to another.", fb:"Correct: the letter stands for a quantity that is not fixed."},
    [{t:"The multiplication sign that joins the 9 and the t in the expression.", fb:"The multiplication is implied by writing 9 next to t; t itself stands for the ticket count."},
     {t:"A fixed value of 9 that stays the same for every purchase of tickets.", fb:"Nine is the price of one ticket; t is the part that changes."},
     {t:"The total cost of all the tickets bought in the whole purchase.", fb:"The total cost is the whole expression 9t; t is the number of tickets."}],
    "In \\(9t\\), the letter \\(t\\) stands for the number of tickets, which changes with each purchase. A letter used this way is a variable. The answer is <b>a variable, a value that can change</b>.", {}); },
  function(){ return mcq("In the formula for the perimeter of a square, \\(P = 4s\\), what does the variable \\(s\\) represent?",
    {t:"The side length of the square, which can be any value.", fb:"Correct: s changes with the size of the square."},
    [{t:"The number 4, which counts the sides of the square in the formula.", fb:"Four is the number of equal sides; s is the side length."},
     {t:"The perimeter itself, the distance all the way around the square.", fb:"The perimeter is P; s is the side length used to find it."},
     {t:"A unit such as centimetres for measuring length.", fb:"Units are written after a measurement; s stands for the length value."}],
    "\\(P = 4s\\) multiplies the side length by 4. The letter \\(s\\) can be any side length, so it is the variable. The answer is <b>the side length, which can be any value</b>.", {}); },
  function(){ return mcq("A class writes the expression \\(20 - 2m\\) for the money left after buying \\(m\\) muffins at $2 each from $20. What does \\(m\\) do in this expression?",
    {t:"It holds the place of the number of muffins, which is not fixed yet.", fb:"Correct: m can be 1, 2, 3 and so on, and the money left changes with it."},
    [{t:"It tells us to subtract 2 exactly m times as an operation sign.", fb:"The 2m part is a multiplication; m itself is the count of muffins."},
     {t:"It is a label for muffins, like a unit written after a measurement.", fb:"Here m is a number that can vary, not a unit label."},
     {t:"It must equal 20, the amount of money the class started with for buying muffins.", fb:"Twenty is the starting amount of money; m is the unknown count."}],
    "The value of \\(20 - 2m\\) changes as the number of muffins changes, so \\(m\\) is a variable holding the place of that count. The answer is <b>it holds the place of a value that can change</b>.", {}); },
  function(){ return mcq("Which statement about a variable is correct?",
    {t:"A variable is a letter or symbol that represents a value that can change or is unknown.", fb:"Correct: that is exactly what a variable does in an expression."},
    [{t:"A variable always stands for the number 1, whatever expression the variable appears in at all.", fb:"A variable can stand for many different values, not just 1."},
     {t:"A variable is another name for an equals sign, the symbol that joins two sides.", fb:"The equals sign joins two sides of an equation; a variable is a letter or symbol."},
     {t:"A variable must be the letter x, and no other letter can ever be used for one.", fb:"Any letter can be used, such as n, t or s, depending on the context."}],
    "A variable is a letter or symbol standing in for a value that can change or that we do not know yet. The answer is <b>a letter or symbol for a value that can change or is unknown</b>.", {}); },
  function(){ return mcq("In \\(7 - 2t\\), the time spent on homework in hours is \\(t\\). If \\(t\\) grows, what happens to the value of the expression?",
    {t:"It goes down, because a larger t makes the subtracted part larger.", fb:"Correct: 2t grows with t, and it is being subtracted from 7."},
    [{t:"It stays at 7, because the starting number in the expression never changes.", fb:"Seven is only the starting value; the subtracted part changes with t."},
     {t:"It goes up, because t is getting bigger and bigger as time passes.", fb:"A bigger t makes 2t bigger, but that part is subtracted, so the value falls."},
     {t:"It cannot change, because t is just a letter in the expression.", fb:"A variable does change value; that is its purpose."}],
    "As \\(t\\) increases, \\(2t\\) increases, and subtracting a larger amount from 7 gives a smaller result. The answer is <b>it goes down</b>.", {}); }
]), ["A variable stands in for a value that is not fixed.", "Start by asking which part of the expression can change from case to case."]);

E("u1-identify-parts", 1, ["8.5"], 1, "gen", function(){
  var a=ri(2,9), b=ri(2,15), v=pick(["n","x","t","m","s"]);
  var form=pick(["expr","eq"]);
  var modes=form==="eq"?["coef","var"]:["coef","const","var"];
  var mode=pick(modes);
  var c=ri(20,60);
  var shown="\\("+u1Expr(a,b,v)+(form==="eq"?" = "+c:"")+"\\)";
  var kind=form==="eq"?"equation":"expression";
  if(mode==="coef"){
    var cand=[b,a+b,a+1,2*a,a-1].filter(function(x){return x!==a;});
    var seen={},ds=[]; cand.forEach(function(x){ if(!seen[x]&&ds.length<3){seen[x]=1;ds.push(x);} });
    var fbFor=function(x){ if(x===b)return "That is the constant term, not the coefficient."; if(x===a+b)return "That adds the coefficient and the constant together."; return "That number does not appear as the multiplier of "+v+"."; };
    return mcq("In the "+kind+" "+shown+", what is the numerical coefficient of \\("+v+"\\)?",
      {t:String(a), fb:"Correct: "+v+" is multiplied by "+a+"."}, ds.map(function(x){return {t:String(x), fb:fbFor(x)};}),
      "The numerical coefficient is the number multiplying the variable. In "+shown+", \\("+v+"\\) is multiplied by \\("+a+"\\). The answer is <b>"+a+"</b>.",
      {mode:mode,a:a,b:b});
  }
  if(mode==="const"){
    var cand2=[a,a+b,b+1,2*b,b-1].filter(function(x){return x!==b&&x>0;});
    var seen2={},ds2=[]; cand2.forEach(function(x){ if(!seen2[x]&&ds2.length<3){seen2[x]=1;ds2.push(x);} });
    var fbFor2=function(x){ if(x===a)return "That is the coefficient of "+v+", not the constant term."; if(x===a+b)return "That adds the two parts together; the constant term stands alone."; return "That value is not the standalone number in the expression."; };
    return mcq("In the expression "+shown+", what is the constant term?",
      {t:String(b), fb:"Correct: "+b+" is the term with no variable attached."}, ds2.map(function(x){return {t:String(x), fb:fbFor2(x)};}),
      "The constant term is the term that does not change with the variable. In "+shown+" it is \\("+b+"\\). The answer is <b>"+b+"</b>.",
      {mode:mode,a:a,b:b});
  }
  var others=["n","x","t","m","s","k"].filter(function(L){return L!==v;});
  var ds3=shuffle(others).slice(0,3);
  return mcq("In the "+kind+" "+shown+", which letter is the variable?",
    {t:v, fb:"Correct: "+v+" is the letter whose value can change."}, ds3.map(function(L){return {t:L, fb:"The letter "+L+" does not appear in this "+kind+"."};}),
    "The variable is the letter in the "+kind+", here \\("+v+"\\). The answer is <b>"+v+"</b>.",
    {mode:mode,a:a,b:b});
}, ["Name the three parts: coefficient, constant term and variable.", "Start by finding the letter; the number attached to it and the number standing alone are the other two parts."]);

E("u1-expression-or-equation", 1, ["8.6"], 1, "var", varset([
  function(){ return mcq("Which one is an equation?",
    {t:"5n + 3 = 18", fb:"Correct: it has an equals sign joining two expressions."},
    [{t:"5n + 3", fb:"That is an expression: there is no equals sign."},
     {t:"5n - 3 + 2n", fb:"That is still one expression; nothing is set equal to anything."},
     {t:"18 - 5n", fb:"That is an expression, even though it starts with a number."}],
    "An equation states that two expressions are equal, so it must contain an equals sign. Only \\(5n + 3 = 18\\) has one. The answer is <b>5n + 3 = 18</b>.", {}); },
  function(){ return mcq("How are an expression and an equation similar and different?",
    {t:"Both can contain numbers, operations and variables, but only an equation has an equals sign.", fb:"Correct: the equals sign is the key difference."},
    [{t:"They are the same thing with different names, because both are made from the same kinds of parts.", fb:"An equation makes a claim that two sides are equal; an expression does not."},
     {t:"An expression has variables and an equation never does in any question.", fb:"Equations often contain variables, such as 2x + 5 = 17."},
     {t:"An equation can be evaluated and an expression can only be solved in a question like this.", fb:"It is the other way around: expressions are evaluated, equations are solved."}],
    "Expressions and equations are built from the same parts. The equation adds an equals sign claiming the two sides match. The answer is <b>same parts, but only the equation has an equals sign</b>.", {}); },
  function(){ return mcq("Which one is an expression?",
    {t:"9 - 3m", fb:"Correct: it is a combination of numbers and a variable with no equals sign."},
    [{t:"9 - 3m = 0", fb:"The equals sign makes that an equation."},
     {t:"3m = 9", fb:"That is an equation: two sides joined by an equals sign."},
     {t:"9 = 3 + 6", fb:"Even with numbers only, the equals sign makes it an equation."}],
    "An expression has no equals sign. \\(9 - 3m\\) is the only choice without one. The answer is <b>9 - 3m</b>.", {}); }
]), ["Look for an equals sign: it is the deciding feature.", "Start by checking each choice for an equals sign."]);

E("u1-expression-or-equation-judge", 1, ["8.6"], 2, "var", varset([
  function(){ return mcq("A student says \\(4x + 7 = 19\\) is an expression. What is the best correction?",
    {t:"It is an equation, because an equals sign joins two expressions.", fb:"Correct: the equals sign makes it an equation."},
    [{t:"The student is right, because it contains a variable like this one does.", fb:"Variables appear in both expressions and equations."},
     {t:"It is an equation only after it is solved, and not a moment before that.", fb:"It is an equation as written; solving is something we do with it."},
     {t:"It is neither, because it has two operations at all.", fb:"The number of operations does not decide; the equals sign does."}],
    "The equals sign in \\(4x + 7 = 19\\) joins \\(4x + 7\\) and \\(19\\), so the whole statement is an equation. The answer is <b>it is an equation because of the equals sign</b>.", {}); },
  function(){ return mcq("Which task fits an equation rather than an expression?",
    {t:"Find the value of x that makes 2x + 5 = 17 true.", fb:"Correct: finding the value that makes a statement true is solving an equation."},
    [{t:"Work out the value of 2x + 5 when x is 4 for the expression.", fb:"That is evaluating an expression: a value for x is already given."},
     {t:"Write 2x + 5 = 17 in words, as a sentence.", fb:"That describes the statement in words; there is no value to find that makes it true."},
     {t:"Add 3 to 2x + 5 to make a new expression.", fb:"That builds a new expression, not an equation."}],
    "An equation asks for the value that makes both sides equal. Only the first task does that. The answer is <b>find the value of x that makes 2x + 5 = 17 true</b>.", {}); }
]), ["Look for an equals sign: it is the deciding feature.", "Start by checking each choice for an equals sign."]);
E("u1-parts-in-equation", 1, ["8.5","8.6"], 1, "gen", function(){
  var a=ri(2,9), b=ri(2,12), c=ri(20,60), v=pick(["n","x","t","m"]);
  var mode=pick(["coef","var"]);
  var shown="\\("+u1Expr(a,b,v)+" = "+c+"\\)";
  if(mode==="coef"){
    var cand=[b,c,a+b,2*a,a-1,a+2].filter(function(x){return x!==a&&x>0;});
    var seen={},ds=[]; cand.forEach(function(x){ if(!seen[x]&&ds.length<3){seen[x]=1;ds.push(x);} });
    var fbFor=function(x){ if(x===b)return "That is the constant term on the left side."; if(x===c)return "That is the value on the right side of the equation."; return "That mixes up the parts of the equation."; };
    return mcq("In the equation "+shown+", what is the numerical coefficient of \\("+v+"\\)?",
      {t:String(a), fb:"Correct: "+v+" is multiplied by "+a+"."}, ds.map(function(x){return {t:String(x), fb:fbFor(x)};}),
      "The coefficient is the number multiplying the variable, wherever the equation is written. In "+shown+" it is \\("+a+"\\). The answer is <b>"+a+"</b>.",
      {mode:mode,a:a});
  }
  var others=["n","x","t","m","k"].filter(function(L){return L!==v;});
  var ds3=shuffle(others).slice(0,3);
  return mcq("In the equation "+shown+", which letter is the variable?",
    {t:v, fb:"Correct: "+v+" is the unknown in this equation."}, ds3.map(function(L){return {t:L, fb:"The letter "+L+" does not appear in this equation."};}),
    "The variable is the letter standing for the unknown value, here \\("+v+"\\). The answer is <b>"+v+"</b>.",
    {mode:mode,a:a});
}, ["The parts keep their names inside an equation too.", "Start by locating the letter, then the number multiplied by it."]);

E("u1-pattern-expression", 1, ["7.1"], 2, "gen", function(){
  var a0=0,d=0,g=0,corr="",cand=[];
  while(g++<400){ a0=ri(2,14); d=ri(2,7); corr=u1Expr(d,a0-d); cand=[u1Expr(d,a0),u1Expr(a0,d),u1Expr(d,-(a0-d))];
    if(a0!==d&&(a0-d)!==0&&new Set([corr].concat(cand)).size===4)break; }
  var terms=[a0,a0+d,a0+2*d,a0+3*d];
  return mcq("A pattern starts \\("+terms.join(", ")+", \\ldots\\) Which expression gives the value of the term in position \\(n\\)?",
    {t:corr, fb:"Correct: each step adds "+d+", and the first term fits "+corr+" at n = 1."},
    cand.map(function(s,i){ return {t:s, fb: i===0?("That uses the first term, "+a0+", as the constant; check it at n = 1, where it gives "+(d+a0)+" instead of "+a0+"."):
      i===1?("That swaps the roles: "+a0+" is the starting value, not the step size."):("That has the wrong sign on the constant; check it at n = 1.")}; }),
    "\\[ \\begin{aligned} \\text{term} &= "+a0+" + (n-1) \\times "+d+" \\\\ &= "+u1Expr(d,a0-d)+" \\end{aligned} \\] The answer is <b>"+corr+"</b>.",
    {a0:a0,d:d});
}, ["Find the step size first; it becomes the number multiplied by n.", "Start by writing first term plus (n minus 1) lots of the step, then simplify."]);

E("u1-evaluate-expression", 1, ["7.8"], 1, "gen", function(){
  var a=ri(2,8), b=ri(2,12), x=ri(2,9), sub=pick([true,false]);
  if(sub&&a*x<=b){ b=a*x-1; if(b<1)b=1; }
  var val=sub?a*x-b:a*x+b, v=pick(["x","n","t"]);
  var shown="\\("+u1Expr(a,sub?-b:b,v)+"\\)";
  var cand=[sub?a*x+b:a*x-b, a*x, a+x+(sub?-b:b), val+ a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g=1; while(ds.length<3){ var z=val+g*2; if(z!==val&&!seen[z]){seen[z]=1;ds.push(z);} g++; }
  var fbFor=function(z){ if(z===a*x)return "That multiplies but forgets the constant term."; if(z===(sub?a*x+b:a*x-b))return "That uses the wrong operation on the constant term."; return "That does not follow substituting "+x+" and then following the order of operations."; };
  return mcq("Evaluate "+shown+" when \\("+v+" = "+x+"\\).",
    {t:String(val), fb:"Correct: "+a+" times "+x+" is "+(a*x)+", then "+(sub?"subtract ":"add ")+b+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "\\[ \\begin{aligned} "+u1Expr(a,sub?-b:b,v)+" &= "+a+" \\times "+x+(sub?" - ":" + ")+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,x:x,sub:sub});
}, ["Substitute first, then follow the order of operations.", "Start by replacing the variable with the given value everywhere it appears."]);

E("u1-relation-context", 1, ["7.7","7.3","7.4"], 2, "gen", function(){
  var T=pick([
    {txt:"A school hall charges a booking fee plus a charge for each guest", tot:"C", v:"g", unit:"guests", per:"guest", sMin:15,sMax:60,rMin:2,rMax:9},
    {txt:"A taxi ride charges a pickup fee plus a charge for each kilometre", tot:"C", v:"k", unit:"kilometres", per:"kilometre", sMin:3,sMax:12,rMin:2,rMax:5},
    {txt:"A print shop charges a setup fee plus a charge for each poster", tot:"C", v:"p", unit:"posters", per:"poster", sMin:10,sMax:40,rMin:2,rMax:6},
    {txt:"A bike rental charges a deposit plus a charge for each hour", tot:"C", v:"h", unit:"hours", per:"hour", sMin:10,sMax:30,rMin:3,rMax:9},
    {txt:"A gardener charges a call-out fee plus a charge for each planter filled", tot:"C", v:"p", unit:"planters", per:"planter", sMin:20,sMax:50,rMin:3,rMax:8},
    {txt:"A sports club charges a joining fee plus a charge for each session", tot:"C", v:"s", unit:"sessions", per:"session", sMin:15,sMax:45,rMin:4,rMax:10}]);
  var start=ri(T.sMin,T.sMax), rate=ri(T.rMin,T.rMax);
  if(start===rate)start+=3;
  var corr=T.tot+" = "+u1Expr(rate,start,T.v);
  var cand=[T.tot+" = "+u1Expr(start,rate,T.v), T.tot+" = "+u1Expr(rate,-start,T.v), T.tot+" = "+(rate+start)+T.v];
  return mcq(T.txt+": the fee is $"+start+" and the charge is $"+rate+" per "+T.per+". Which relation gives the total cost \\("+T.tot+"\\) for \\("+T.v+"\\) "+T.unit+"?",
    {t:corr, fb:"Correct: the per-unit charge multiplies the count, and the one-time fee is added."},
    [{t:cand[0], fb:"That charges the fee per unit and the rate once; the two numbers have swapped jobs."},
     {t:cand[1], fb:"That subtracts the fee; a fee is paid, so it is added."},
     {t:cand[2], fb:"That charges the fee again for every unit; the fee is paid only once."}],
    "The total is the one-time fee plus the per-unit charge times the count: \\("+corr+"\\). The answer is <b>"+corr+"</b>.",
    {start:start,rate:rate});
}, ["Separate the one-time amount from the per-unit amount.", "Start by writing fee plus (rate times count)."]);

E("u1-table-missing", 1, ["7.9"], 1, "gen", function(){
  var a=ri(2,6), b=ri(1,9), miss=pick([2,3,4]);
  var ys=[1,2,3,4].map(function(x){return a*x+b;});
  var shown=ys.map(function(y,i){return (i+1)===miss?"?":y;}).join(", ");
  var val=a*miss+b;
  var cand=[a*miss, val+a, (a+1)*miss+b, val+2*a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g2=1; while(ds.length<3){ var z2=val+g2*3; if(!seen[z2]){seen[z2]=1;ds.push(z2);} g2++; }
  var fbFor=function(z){ if(z===a*miss)return "That forgets the constant term of the relation."; if(z===a*(miss+1)+b)return "That is the value for the next x, one row too far."; return "That breaks the pattern of adding "+a+" each row."; };
  return mcq("For the relation \\(y = "+u1Expr(a,b,"x")+"\\), a table of values shows \\(x = 1, 2, 3, 4\\) with \\(y = "+shown+"\\). What is the missing value?",
    {t:String(val), fb:"Correct: substitute x = "+miss+" into the relation."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "Substitute \\(x = "+miss+"\\): \\[ \\begin{aligned} y &= "+a+" \\times "+miss+" + "+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,miss:miss});
}, ["Use the relation, or follow the step pattern down the table.", "Start by substituting the missing row's x value into the relation."]);

E("u1-graph-relation", 1, ["7.10","7.5"], 2, "gen", function(){
  var a=0,b=0,g=0; while(g++<200){ a=ri(1,4); b=ri(1,8); if(a!==b)break; }
  var xmax=pick([3,4,5]);
  var pts=[]; for(var gx=0;gx<=xmax;gx++)pts.push([gx,a*gx+b]);
  var yMax=a*xmax+b+1;
  var corr="y = "+u1Expr(a,b,"x");
  var cand=["y = "+u1Expr(b,a,"x"), "y = "+u1Expr(a,b+1,"x"), "y = "+u1Expr(a+1,b,"x")];
  var q=mcq("The graph shows discrete points plotted from a table of values for a linear relation. Which relation matches the points?",
    {t:corr, fb:"Correct: the points start at "+b+" when x is 0 and rise by "+a+" each step."},
    [{t:cand[0], fb:"That starts at "+a+" when x is 0; the graph starts at "+b+"."},
     {t:cand[1], fb:"That starts one unit too high; the first point is at height "+b+"."},
     {t:cand[2], fb:"That rises by "+(a+1)+" each step; the graph rises by "+a+"."}],
    "Read two features from the graph: at \\(x = 0\\) the height is \\("+b+"\\), the constant term, and each step right raises the height by \\("+a+"\\), the coefficient. The relation is \\("+corr+"\\). The answer is <b>"+corr+"</b>.",
    {a:a,b:b,xmax:xmax});
  q.figure=u1Plot(pts,xmax,yMax,"x","y");
  return q;
}, ["Read the starting height and the step size from the points.", "Start with the point at x = 0; its height is the constant term."]);

E("u1-graph-conclusion", 1, ["7.11","7.10"], 3, "gen", function(){
  var a=ri(1,5), b=ri(1,8), tx=pick([5,6,7]);
  var pts=[0,1,2,3,4].map(function(x){return [x,a*x+b];});
  var yMax=a*4+b+1, val=a*tx+b;
  var cand=[a*tx, val+a, a*tx-b, (a+b)*tx, val-a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&z>0&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g3=1; while(ds.length<3){ var z3=val+g3*2; if(!seen[z3]){seen[z3]=1;ds.push(z3);} g3++; }
  var fbFor=function(z){ if(z===a*tx)return "That forgets the starting value of "+b+"."; if(z===val+a)return "That goes one step too far, to x = "+(tx+1)+"."; return "That does not continue the steady rise of "+a+" per step."; };
  var q=mcq("Points from a table of values are graphed. The pattern in the graph continues in the same way. What is \\(y\\) when \\(x = "+tx+"\\)?",
    {t:String(val), fb:"Correct: start at "+b+" and add "+a+" a total of "+tx+" times."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "The graph starts at \\("+b+"\\) and rises by \\("+a+"\\) for each step in \\(x\\). \\[ \\begin{aligned} y &= "+b+" + "+tx+" \\times "+a+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,tx:tx});
  q.figure=u1Plot(pts,4,yMax,"x","y");
  return q;
}, ["Describe the pattern in the graph first: where it starts and how fast it rises.", "Start at the height for x = 0, then count the steps of the rise up to x = 6."]);

E("u1-describe-graph", 1, ["7.12"], 2, "var", varset([
  function(){ var q=mcq("The graph shows the cost of buying books at a school fair, including a $2 bag charge. Which sentence describes the relationship in everyday language?",
    {t:"The cost starts at $2 and goes up by $4 for each book.", fb:"Correct: the first point sits at 2, and each step right adds 4."},
    [{t:"The cost starts at $4 and goes up by $2 for each book.", fb:"That swaps the two numbers: the graph starts at 2, not 4."},
     {t:"The cost goes up by $4 in total, however many books are bought.", fb:"The cost keeps rising with each book; 4 is the rise per book, not the total rise."},
     {t:"Each book costs $2 and the bag is free.", fb:"At one book the cost is already 6, so a book costs more than 2."}],
    "The points are (0, 2), (1, 6), (2, 10), (3, 14): a start of $2 with a steady rise of $4 per book. The answer is <b>the cost starts at $2 and goes up by $4 for each book</b>.", {});
    q.figure=u1Plot([[0,2],[1,6],[2,10],[3,14]],3,16,"books","cost ($)"); return q; },
  function(){ var q=mcq("The graph shows the height of a bean plant over several weeks. Which sentence describes the relationship in everyday language?",
    {t:"The plant started 5 cm tall and grows 3 cm each week.", fb:"Correct: the height at week 0 is 5, and each week adds 3."},
    [{t:"The plant started 3 cm tall and grows 5 cm each week.", fb:"That swaps the start and the growth: at week 0 the height is 5."},
     {t:"The plant grows 3 cm in total over the whole time.", fb:"Three centimetres is the growth each week, not the total growth."},
     {t:"The plant shrinks as the weeks pass.", fb:"The points rise from left to right, so the height increases."}],
    "The points are (0, 5), (1, 8), (2, 11), (3, 14): a starting height of 5 cm with 3 cm of growth each week. The answer is <b>the plant started 5 cm tall and grows 3 cm each week</b>.", {});
    q.figure=u1Plot([[0,5],[1,8],[2,11],[3,14]],3,16,"weeks","height (cm)"); return q; },
  function(){ var q=mcq("The graph shows Mina's savings when she adds the same amount each week. Which sentence describes the relationship in everyday language?",
    {t:"Mina starts with $20 and adds $7 each week.", fb:"Correct: the first point is at 20, and the weekly rise is 7."},
    [{t:"Mina starts with $7 and adds $20 each week.", fb:"That swaps the start and the weekly amount; the first point is at 20."},
     {t:"Mina adds $7 in total over all the weeks.", fb:"Seven dollars is added each week, not once overall."},
     {t:"Mina spends $7 each week from $20.", fb:"The points rise, so the savings grow rather than shrink."}],
    "The points are (0, 20), (1, 27), (2, 34), (3, 41): a start of $20 and a rise of $7 per week. The answer is <b>Mina starts with $20 and adds $7 each week</b>.", {});
    q.figure=u1Plot([[0,20],[1,27],[2,34],[3,41]],3,44,"weeks","savings ($)"); return q; },
  function(){ var q=mcq("The graph shows the distance covered on a steady bike ride. Which sentence describes the relationship in everyday language?",
    {t:"The rider covers 12 km in each hour of the ride.", fb:"Correct: each step of one hour adds 12 km."},
    [{t:"The rider covers 12 km in total, however long the ride lasts.", fb:"Twelve is the distance per hour; the total keeps growing."},
     {t:"The rider starts 12 km from home.", fb:"The graph starts at 0 km; 12 is the hourly rate."},
     {t:"The rider slows down as the ride goes on.", fb:"The points rise by equal steps, so the speed is steady."}],
    "The points are (0, 0), (1, 12), (2, 24), (3, 36): equal rises of 12 km per hour. The answer is <b>the rider covers 12 km in each hour</b>.", {});
    q.figure=u1Plot([[0,0],[1,12],[2,24],[3,36]],3,40,"hours","distance (km)"); return q; },
  function(){ var q=mcq("The graph shows the cost of movie tickets. A group wants 5 tickets. Which sentence uses the graph to solve their problem?",
    {t:"Each ticket costs $9, so 5 tickets cost $45.", fb:"Correct: the rise per ticket is 9, and 5 lots of 9 make 45."},
    [{t:"Each ticket costs $45, so 5 tickets cost $225.", fb:"Forty-five is the cost of 5 tickets together, not of one ticket."},
     {t:"Five tickets cost $36, the highest point shown.", fb:"Thirty-six is the cost at 4 tickets; the pattern continues one more step."},
     {t:"Tickets are free after the fourth one.", fb:"The points keep rising by the same step, so a fifth ticket still costs 9."}],
    "The points are (0, 0), (1, 9), (2, 18), (3, 27), (4, 36): $9 per ticket, so 5 tickets cost \\(5 \\times 9 = 45\\) dollars. The answer is <b>each ticket costs $9, so 5 tickets cost $45</b>.", {});
    q.figure=u1Plot([[0,0],[1,9],[2,18],[3,27],[4,36]],4,40,"tickets","cost ($)"); return q; }
]), ["Read the starting point and the size of each step, then say them in plain words.", "Start with the point where x is 0: that is the starting amount."]);

E("u1-environment-pattern", 1, ["7.4"], 3, "gen", function(){
  var T=pick([
    {txt:"Square tables are pushed together in a row for a class party. One table seats 6 people, two tables seat 10 people, and three tables seat 14 people", a:4,b:2,thing:"tables",ask:"seats"},
    {txt:"A row of photo frames is edged with tiles. One frame uses 7 tiles, two frames use 10 tiles, and three frames use 13 tiles", a:3,b:4,thing:"frames",ask:"tiles"},
    {txt:"Garden plots in a row are edged with stones. One plot uses 7 stones, two plots use 12 stones, and three plots use 17 stones", a:5,b:2,thing:"plots",ask:"stones"},
    {txt:"Bunting is strung in sections along a gym wall. One section has 9 flags, two sections have 15 flags, and three sections have 21 flags", a:6,b:3,thing:"sections",ask:"flags"},
    {txt:"Long tables are joined in a row for a science fair. One table seats 6 people, two tables seat 8 people, and three tables seat 10 people", a:2,b:4,thing:"tables",ask:"seats"},
    {txt:"A banner border is built from tile strips. One strip uses 9 tiles, two strips use 12 tiles, and three strips use 15 tiles", a:3,b:6,thing:"strips",ask:"tiles"}]);
  if(pick([true,false])){
    var corr=u1Expr(T.a,T.b);
    var cand=[u1Expr(T.a,T.b+T.a), u1Expr(T.b,T.a), u1Expr(T.a,-T.b)];
    return mcq(T.txt+". Which expression gives the number of "+T.ask+" for \\(n\\) "+T.thing+"?",
      {t:corr, fb:"Correct: the count grows by "+T.a+" each time, and at n = 1 it gives "+(T.a+T.b)+"."},
      [{t:cand[0], fb:"That gives "+(T.a+T.b+T.a)+" at n = 1, but the first case uses "+(T.a+T.b)+"."},
       {t:cand[1], fb:"That swaps the growth and the starting part; check it at n = 1."},
       {t:cand[2], fb:"That subtracts the fixed part; the fixed part is added in this pattern."}],
      "The counts rise by \\("+T.a+"\\) each step, and the first count is \\("+(T.a+T.b)+" = "+T.a+" + "+T.b+"\\). So the count for \\(n\\) "+T.thing+" is \\("+corr+"\\). The answer is <b>"+corr+"</b>.",
      {mode:"expr",a:T.a,b:T.b});
  }
  var k=ri(6,14), val=T.a*k+T.b;
  var cand2=[T.a*(k-1)+T.b, T.a*k, T.b*k+T.a, val+T.a];
  var seen={},ds=[]; cand2.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  return mcq(T.txt+". How many "+T.ask+" are there for "+k+" "+T.thing+"?",
    {t:String(val), fb:"Correct: the pattern is "+u1Expr(T.a,T.b)+", which at n = "+k+" gives "+val+"."},
    ds.map(function(z){return {t:String(z), fb:"That does not match the pattern "+u1Expr(T.a,T.b)+" at n = "+k+"."};}),
    "The counts follow \\("+u1Expr(T.a,T.b)+"\\). \\[ \\begin{aligned} \\text{count} &= "+T.a+" \\times "+k+" + "+T.b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {mode:"value",a:T.a,b:T.b,k:k});
}, ["Turn the first three cases into a relation before answering.", "Start by finding how much the count grows from one case to the next."]);

E("u1-match-graph-panel", 1, ["7.6"], 1, "gen", function(){
  var a=ri(1,3), b=ri(1,4);
  var rels=[{a:a,b:b},{a:a+1,b:b},{a:a,b:b+2},{a:a+1,b:b+2}];
  var order=shuffle([0,1,2,3]);
  var labels=["A","B","C","D"];
  var yMax=(a+1)*3+(b+2)+1;
  var svg='<svg width="330" height="272" viewBox="0 0 330 272" xmlns="http://www.w3.org/2000/svg">';
  order.forEach(function(ri2,pi){
    var r=rels[ri2], px=(pi%2)*164+6, py=Math.floor(pi/2)*134+6, ox=px+22, oy=py+104, sx=38, sy=96/yMax;
    svg+='<text x="'+(px+8)+'" y="'+(py+13)+'" font-size="13" font-weight="bold" fill="'+FIG_INK+'">'+labels[pi]+'</text>';
    svg+='<line x1="'+ox+'" y1="'+(py+8)+'" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    svg+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(px+152)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    [0,1,2,3].forEach(function(x){ svg+='<circle cx="'+fmt(ox+x*sx,1)+'" cy="'+fmt(oy-(r.a*x+r.b)*sy,1)+'" r="3.4" fill="'+FIG_ACC+'"/>'; });
  });
  svg+='</svg>';
  var corrIdx=order.indexOf(0);
  var opts=order.map(function(ri2,pi){ if(pi===corrIdx)return null; var r=rels[ri2];
    return {t:"Graph "+labels[pi], fb:"Graph "+labels[pi]+" starts at "+r.b+" and rises by "+r.a+"; the relation starts at "+b+" and rises by "+a+"."}; }).filter(Boolean);
  var q=mcq("Four graphs are shown. Which graph matches the relation \\(y = "+u1Expr(a,b,"x")+"\\)?",
    {t:"Graph "+labels[corrIdx], fb:"Correct: it starts at "+b+" when x is 0 and rises by "+a+" each step."}, opts,
    "The relation starts at \\("+b+"\\) when \\(x = 0\\) and rises by \\("+a+"\\) per step. Only Graph "+labels[corrIdx]+" does both. The answer is <b>Graph "+labels[corrIdx]+"</b>.",
    {a:a,b:b});
  q.figure=svg;
  return q;
}, ["Check the starting height first, then the steepness.", "Start by finding which graphs begin at the right height when x is 0."]);

E("u1-pattern-equation", 1, ["7.2"], 3, "gen", function(){
  var d=ri(2,6), c=ri(1,9), k=ri(5,10); if(c===d)c+=2; var V=d*k+c;
  var corr=u1Expr(d,c)+" = "+V;
  var cand=[u1Expr(d,c), u1Expr(c,d)+" = "+V, u1Expr(d,-c)+" = "+V];
  return mcq("A tile pattern uses \\(T = "+u1Expr(d,c)+"\\) tiles for figure number \\(n\\). Which equation can be solved to find which figure uses exactly \\("+V+"\\) tiles?",
    {t:corr, fb:"Correct: it sets the pattern relation equal to the target number of tiles."},
    [{t:cand[0], fb:"That is only an expression; an equation needs an equals sign and the target value."},
     {t:cand[1], fb:"That swaps the step size and the constant from the pattern relation."},
     {t:cand[2], fb:"That changes the constant to a subtraction; the pattern adds "+c+"."}],
    "An equation sets the relation equal to the known total: \\("+corr+"\\), which can then be solved for \\(n\\) (here \\(n = "+k+"\\). The answer is <b>"+corr+"</b>.",
    {d:d,c:c,V:V});
}, ["An equation needs an equals sign with the known total on one side.", "Start by taking the pattern relation and setting it equal to the target value."]);

E("u1-factors-count-cr", 1, ["5.4"], 2, "gen", function(){
  var n=ri(18,96);
  var f=u1Factors(n);
  var pairs=[]; for(var i=0;i<f.length;i++){ if(f[i]<=n/f[i])pairs.push(f[i]+" x "+(n/f[i])); }
  return numq("How many different factors does \\("+n+"\\) have? List the factors as part of your work.", f.length, 0,
    "Work through the factor pairs of \\("+n+"\\): "+pairs.join(", ")+". The factors are "+f.join(", ")+", which is "+f.length+" factors in total. The answer is <b>"+f.length+"</b>.",
    {n:n});
}, ["Use the divisibility rules to test small numbers in order.", "Start with 1 and work upward, recording each factor as a pair."]);

E("u1-evaluate-cr", 1, ["7.8"], 1, "gen", function(){
  var v=pick(["x","n","t"]);
  if(pick([true,false])){
    var a=ri(3,9), b=ri(5,20), x=ri(4,12), val=a*x+b;
    return numq("Evaluate \\("+u1Expr(a,b,v)+"\\) when \\("+v+" = "+x+"\\). Show your substitution.", val, 0,
      "\\[ \\begin{aligned} "+u1Expr(a,b,v)+" &= "+a+" \\times "+x+" + "+b+" \\\\ &= "+(a*x)+" + "+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
      {mode:"lin",a:a,b:b,x:x});
  }
  var s=ri(3,9), c2=ri(2,15), val2=s*s+c2;
  return numq("Evaluate \\("+v+"^2 + "+c2+"\\) when \\("+v+" = "+s+"\\). Show your substitution.", val2, 0,
    "\\[ \\begin{aligned} "+v+"^2 + "+c2+" &= "+s+"^2 + "+c2+" \\\\ &= "+(s*s)+" + "+c2+" \\\\ &= "+val2+" \\end{aligned} \\] The answer is <b>"+val2+"</b>.",
    {mode:"sq",s:s,c:c2});
}, ["Substitute the value first, then follow the order of operations.", "Start by rewriting the expression with the number in place of the variable."]);

E("u1-table-value-cr", 1, ["7.9","7.7"], 1, "gen", function(){
  var T=pick([
    {txt:"A community centre rents a gym for a flat fee plus an hourly charge. The total cost is given by the relation C = ", v:"h", unit:"hours"},
    {txt:"A school orders workbooks at a set price each, plus a delivery charge. The total cost is given by the relation C = ", v:"w", unit:"workbooks"},
    {txt:"A ferry tour charges a harbour fee plus a charge per passenger. The total cost is given by the relation C = ", v:"p", unit:"passengers"}]);
  var rate=ri(3,9), start=ri(8,30), k=ri(8,20), val=rate*k+start;
  return numq(T.txt+"\\("+u1Expr(rate,start,T.v)+"\\) dollars. Build the table value: what is the total cost for "+k+" "+T.unit+"? Show your work.", val, 0,
    "\\[ \\begin{aligned} C &= "+rate+" \\times "+k+" + "+start+" \\\\ &= "+(rate*k)+" + "+start+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>$"+val+"</b>.",
    {rate:rate,start:start,k:k});
}, ["Substitute the given count into the relation.", "Start by replacing the variable with the number of units."]);

E("u1-far-term-cr", 1, ["7.1","7.7"], 3, "gen", function(){
  var a0=ri(3,12), d=ri(3,8), pos=ri(15,30), val=a0+(pos-1)*d;
  var terms=[a0,a0+d,a0+2*d];
  return numq("A number pattern begins \\("+terms.join(", ")+", \\ldots\\) What is the value of the term in position "+pos+"? Show how you get it from a relation for the pattern.", val, 0,
    "The step is \\("+d+"\\), so the term in position \\(n\\) is \\("+u1Expr(d,a0-d)+"\\) . \\[ \\begin{aligned} \\text{term}_{"+pos+"} &= "+a0+" + ("+pos+" - 1) \\times "+d+" \\\\ &= "+a0+" + "+((pos-1)*d)+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a0:a0,d:d,pos:pos});
}, ["Build a relation for the term in position n instead of listing every term.", "Start by finding the step size from the first three terms."]);

E("u1-solve-812-cr", 1, ["8.12","7.2"], 3, "gen", function(){
  var T=pick([
    {txt:"A tile figure in a growing pattern", thing:"figure number", v:"n", unit:"tiles"},
    {txt:"A school fair ride pass with a sign-up cost plus a cost per ride", thing:"number of rides", v:"r", unit:"dollars"},
    {txt:"A savings plan that starts with a gift amount and adds the same amount each week toward a goal", thing:"number of weeks", v:"w", unit:"dollars"}]);
  var a=ri(2,9), b=ri(2,15), k=ri(4,15), Tot=a*k+b;
  return numq(T.txt+": the total is modelled by \\(T = "+u1Expr(a,b,T.v)+"\\) "+T.unit+". The total is exactly "+Tot+". Model this with an equation and solve it: what is the "+T.thing+"? Show your solving steps.", k, 0,
    "Set the relation equal to the total and solve: \\[ \\begin{aligned} "+u1Expr(a,b,T.v)+" &= "+Tot+" \\\\ "+a+T.v+" &= "+Tot+" - "+b+" \\\\ "+a+T.v+" &= "+(Tot-b)+" \\\\ "+T.v+" &= "+k+" \\end{aligned} \\] The answer is <b>"+k+"</b>.",
    {a:a,b:b,k:k});
}, ["Set the relation equal to the given total to form the equation.", "Start by subtracting the constant from both sides, then divide by the coefficient."]);

/* ----- bank-u2.js ----- */
// Math 7 Unit 2 Integers question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 565 to 846).
// CRMARKS: u2-add-cr=3
// CRMARKS: u2-sub-cr=2
// CRMARKS: u2-numberline-cr=3
// CRMARKS: u2-problem-cr=3
// CRMARKS: u2-missing-addend-cr=3
/* ===== Unit 2 ===== */
/* Math 7 Unit 2: Integers (addition and subtraction cluster, codes 6.24 to 6.29). Helpers prefixed u2. */
function u2Sg(n){ return n<0?"("+n+")":""+n; }
function u2Distr(ans,cands){
  var seen={},ds=[];
  cands.forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } });
  var g=1; while(ds.length<3){ [ans+g,ans-g].forEach(function(z){ if(z!==ans&&!seen[z]&&ds.length<3){ seen[z]=1; ds.push(z); } }); g++; }
  return ds;
}
function u2Line(a,end,label,showEnd){
  var lo=Math.min(a,end,0)-2, hi=Math.max(a,end,0)+2;
  var W=344,H=78,x0=16,x1=328;
  function X(v){ return x0+(v-lo)*(x1-x0)/(hi-lo); }
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  s+='<line x1="'+x0+'" y1="54" x2="'+x1+'" y2="54" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="'+x1+',54 '+(x1-7)+',50 '+(x1-7)+',58" fill="'+FIG_INK+'"/>';
  for(var v=lo;v<=hi;v++){ s+='<line x1="'+fmt(X(v),1)+'" y1="50" x2="'+fmt(X(v),1)+'" y2="58" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    s+='<text x="'+fmt(X(v),1)+'" y="70" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+v+'</text>'; }
  s+='<path d="M '+fmt(X(a),1)+' 30 L '+fmt(X(end),1)+' 30" stroke="'+FIG_ALT+'" stroke-width="2.2" fill="none"/>';
  var dir=end>=a?1:-1;
  s+='<polygon points="'+fmt(X(end),1)+',30 '+fmt(X(end)-dir*8,1)+',25 '+fmt(X(end)-dir*8,1)+',35" fill="'+FIG_ALT+'"/>';
  s+='<text x="'+fmt((X(a)+X(end))/2,1)+'" y="18" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>';
  s+='<circle cx="'+fmt(X(a),1)+'" cy="54" r="4.5" fill="'+FIG_ACC+'"/>';
  if(showEnd)s+='<circle cx="'+fmt(X(end),1)+'" cy="54" r="4.5" fill="none" stroke="'+FIG_ALT+'" stroke-width="2.2"/>';
  return s+'</svg>';
}
function u2SignRuleSol(a,b,op){
  if(op==="+"){
    if(a===0||b===0) return "Adding zero leaves the other integer unchanged.";
    if((a>0)===(b>0)) return "The signs are the same, so add the sizes and keep the sign: \\(|"+a+"| + |"+b+"| = "+(Math.abs(a)+Math.abs(b))+"\\).";
    return "The signs differ, so subtract the smaller size from the larger and keep the sign of the larger: \\(|"+a+"| - |"+b+"| = "+Math.abs(Math.abs(a)-Math.abs(b))+"\\).";
  }
  return "Rewrite the subtraction as adding the opposite: \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(-b)+"\\).";
}

E("u2-add-basic", 2, ["6.25"], 1, "gen", function(){
  var a=0,b=0,g=0;
  while(g++<200){ a=ri(-9,9); b=ri(-9,9); if(a!==0&&b!==0)break; }
  var ans=a+b;
  var ds=u2Distr(ans,[a-b, -(a+b), Math.abs(a)+Math.abs(b), -Math.abs(a)-Math.abs(b), Math.abs(Math.abs(a)-Math.abs(b))]);
  var fbFor=function(z){ if(z===a-b)return "That subtracts the second integer instead of adding it."; if(z===-(a+b))return "That has the right size but the wrong sign."; if(z===Math.abs(a)+Math.abs(b))return "That adds the sizes and drops the signs; the signs decide the result's sign."; return "That does not follow the sign rules for addition."; };
  return mcq("What is \\("+a+" + "+u2Sg(b)+"\\)?",
    {t:String(ans), fb:"Correct: "+((a>0)===(b>0)?"same signs, add the sizes and keep the sign.":"different signs, subtract the sizes and keep the sign of the larger.")},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"+")+" So \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Look at the signs first: same signs and different signs follow different rules.", "Start by comparing the sizes of the two integers."]);

E("u2-add-numberline", 2, ["6.26"], 1, "gen", function(){
  var a=ri(-5,5), b=0,g=0;
  while(g++<100){ b=ri(-5,5); if(b!==0)break; }
  var end=a+b;
  var ds=u2Distr(end,[a-b, end+1, end-1, -end]);
  var q=mcq("The number line shows a jump that starts at \\("+a+"\\) and moves "+Math.abs(b)+" units to the "+(b>0?"right":"left")+". What value does the jump land on?",
    {t:String(end), fb:"Correct: starting at "+a+" and moving "+Math.abs(b)+" units "+(b>0?"right (adding "+b+")":"left (adding "+b+")")+" lands on "+end+"."},
    ds.map(function(z){return {t:String(z), fb:"Count the landing tick again: the jump starts at "+a+" and covers "+Math.abs(b)+" units."};}),
    "Start at \\("+a+"\\) and count "+Math.abs(b)+" units to the "+(b>0?"right":"left")+": the jump lands on \\("+end+"\\), which is \\("+a+" + "+u2Sg(b)+" = "+end+"\\). The answer is <b>"+end+"</b>.",
    {a:a,b:b});
  q.figure=u2Line(a,end,(b>0?"+":"")+b,true);
  return q;
}, ["The direction of the jump tells you the sign of what is added.", "Start at the marked point and count the ticks the arrow covers."]);

E("u2-sub-basic", 2, ["6.27"], 1, "gen", function(){
  var a=ri(-9,9), b=0,g=0;
  while(g++<100){ b=ri(-9,9); if(b!==0)break; }
  var ans=a-b;
  var ds=u2Distr(ans,[a+b, -(a-b), b-a, ans+2*b]);
  var fbFor=function(z){ if(z===a+b&&b<0)return "That drops the extra minus sign; subtracting a negative adds."; if(z===a+b)return "That adds the second integer instead of subtracting it."; if(z===b-a)return "That subtracts in the wrong order."; return "That does not match rewriting the subtraction as adding the opposite."; };
  return mcq("What is \\("+a+" - "+u2Sg(b)+"\\)?",
    {t:String(ans), fb:"Correct: subtracting is adding the opposite, so this is "+a+" + "+u2Sg(-b)+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"-")+" Then \\("+a+" + "+u2Sg(-b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Change the subtraction into adding the opposite first.", "Start by flipping the sign of the number being subtracted."]);

E("u2-opposites-zero", 2, ["6.24"], 1, "var", varset([
  function(){ return mcq("Which pair of integers has a sum of 0?",
    {t:"7 and -7", fb:"Correct: opposites are the same distance from 0 in opposite directions, so they cancel."},
    [{t:"7 and 7", fb:"That pair adds to 14; both integers have the same sign."},
     {t:"-7 and -7", fb:"That pair adds to -14; both integers have the same sign."},
     {t:"7 and -6", fb:"That pair adds to 1; the sizes differ, so they do not cancel completely."}],
    "Opposite integers have the same size and opposite signs, so their sum is 0: \\(7 + (-7) = 0\\). The answer is <b>7 and -7</b>.", {}); },
  function(){ return mcq("A tile model shows 5 positive tiles and 5 negative tiles. What is the total value of the model?",
    {t:"0", fb:"Correct: each positive tile pairs with a negative tile to make a zero pair."},
    [{t:"10", fb:"That counts the tiles but ignores their signs; the pairs cancel."},
     {t:"-10", fb:"That treats every tile as negative; half of them are positive."},
     {t:"5", fb:"That counts only one set; the other set cancels it."}],
    "Pair each positive tile with a negative tile: each pair is worth \\(1 + (-1) = 0\\), so five pairs total 0. The answer is <b>0</b>.", {}); },
  function(){ return mcq("Why do \\((+6)\\) and \\((-6)\\) add to zero?",
    {t:"They are the same distance from 0 in opposite directions, so they cancel each other out.", fb:"Correct: equal sizes with opposite signs sum to zero."},
    [{t:"Because both of them are close to 0, and numbers close to 0 add to 0 in pairs like this.", fb:"Six is not especially close to 0; it is the matching sizes and opposite signs that matter."},
     {t:"Because adding any two integers gives 0, whatever the two integers happen to be in the question.", fb:"Most pairs do not give 0; only opposites do."},
     {t:"Because the negative number is ignored in addition and does not count toward the total.", fb:"The negative number counts fully; it cancels the positive one."}],
    "On a number line, \\(+6\\) and \\(-6\\) sit the same distance from 0 on opposite sides, so their sum is 0. The answer is <b>they are opposites and cancel</b>.", {}); },
  function(){ return mcq("What must be added to \\(-8\\) to give 0?",
    {t:"8", fb:"Correct: the opposite of -8 is 8, and opposites sum to zero."},
    [{t:"-8", fb:"That gives -16; it doubles the negative instead of cancelling it."},
     {t:"0", fb:"Adding 0 leaves the value at -8."},
     {t:"16", fb:"That overshoots: -8 plus 16 is 8, not 0."}],
    "The number that cancels \\(-8\\) is its opposite, \\(8\\): \\(-8 + 8 = 0\\). The answer is <b>8</b>.", {}); },
  function(){ return mcq("An account balance is -$40. A deposit brings the balance exactly to $0. How large was the deposit?",
    {t:"$40", fb:"Correct: a deposit of 40 cancels the -40 balance."},
    [{t:"$0", fb:"A deposit of 0 would leave the balance at -$40."},
     {t:"$80", fb:"That would take the balance to +$40, past zero."},
     {t:"-$40", fb:"A negative deposit would make the balance more negative."}],
    "The deposit must be the opposite of the balance: \\(-40 + 40 = 0\\). The answer is <b>$40</b>.", {}); }
]), ["Opposites have the same size and opposite signs.", "Start by pairing each positive value with a matching negative value."]);

E("u2-add-context", 2, ["6.25","6.29"], 1, "gen", function(){
  var T=pick([
    {pre:"At dawn the temperature is ", mid:" degrees. By noon it ", ch:["rises by ","drops by "], post:" degrees. What is the temperature at noon?", unit:" degrees"},
    {pre:"A diver is ", mid:" m relative to the surface (below is negative). The diver then ", ch:["swims up ","sinks "], post:" m. What is the diver's new position, in metres?", unit:" m"},
    {pre:"A team's score is ", mid:" points. On the next play the team ", ch:["gains ","loses "], post:" points. What is the team's score now?", unit:" points"},
    {pre:"An account balance is $", mid:". A payment of $", ch:null, post:" is made (a payment lowers the balance). What is the new balance, in dollars?", unit:""}]);
  var a=ri(-18,18), mag=ri(3,16);
  if(T.pre.indexOf("diver")>=0&&a>0)a=-a;
  if(T.ch){
    var up=pick([true,false]); var b=up?mag:-mag;
    var ans=a+b;
    var ds=u2Distr(ans,[a-b, -ans, a+ (up?-mag:mag)]);
    return mcq(T.pre+"\\("+a+"\\)"+T.mid+(up?T.ch[0]:T.ch[1])+"\\("+mag+"\\)"+T.post,
      {t:String(ans), fb:"Correct: "+(up?"a rise adds "+mag:"a drop adds -"+mag)+", giving "+a+" + "+u2Sg(b)+" = "+ans+"."},
      ds.map(function(z){return {t:String(z), fb:"That treats the change with the wrong sign. A "+(up?"rise is positive":"drop is negative")+"."};}),
      "Write the change as a signed integer: \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). The answer is <b>"+ans+T.unit+"</b>.",
      {a:a,b:b});
  }
  var ans2=a-mag;
  var ds2=u2Distr(ans2,[a+mag, -ans2, a]);
  return mcq(T.pre+"\\("+a+"\\)"+T.mid+"\\("+mag+"\\)"+T.post,
    {t:String(ans2), fb:"Correct: a payment subtracts "+mag+" from the balance."},
    ds2.map(function(z){return {t:String(z), fb:"A payment lowers the balance, so the "+mag+" is subtracted, not added."};}),
    "\\[ \\begin{aligned} \\text{new balance} &= "+a+" - "+mag+" \\\\ &= "+ans2+" \\end{aligned} \\] The answer is <b>$"+ans2+"</b>.",
    {a:a,b:-mag});
}, ["Turn words like rises, drops, gains and loses into signed numbers first.", "Start by writing the starting value and the signed change as an addition."]);

E("u2-sub-numberline", 2, ["6.28"], 1, "gen", function(){
  var a=ri(-5,6), b=0,g=0;
  while(g++<100){ b=ri(-5,5); if(b!==0)break; }
  var end=a-b, move=-b;
  var ds=u2Distr(end,[a+b, -end, end+ (move>0?1:-1)]);
  var q=mcq("The number line models the subtraction \\("+a+" - "+u2Sg(b)+"\\) as a jump from \\("+a+"\\). What is the result of the subtraction?",
    {t:String(end), fb:"Correct: subtracting "+b+" moves "+Math.abs(move)+" units to the "+(move>0?"right":"left")+", landing on "+end+"."},
    ds.map(function(z){return {t:String(z), fb:"Watch the direction: subtracting "+b+" is the same as adding "+u2Sg(move)+"."};}),
    "Subtracting is adding the opposite: \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(move)+" = "+end+"\\). The jump lands on \\("+end+"\\). The answer is <b>"+end+"</b>.",
    {a:a,b:b});
  q.figure=u2Line(a,end,(move>0?"+":"")+move,true);
  return q;
}, ["A subtraction jump moves by the opposite of the number being subtracted.", "Start by rewriting the subtraction as an addition."]);

E("u2-subtract-negative", 2, ["6.27"], 1, "gen", function(){
  var mode=pick(["subneg","subneg","subpos"]);
  var a=ri(-8,8), b, ans;
  if(mode==="subneg"){ b=-ri(2,9); } else { b=ri(2,9); }
  ans=a-b;
  var ds=u2Distr(ans,[a+b, -(ans), b-a, a-Math.abs(b)]);
  var fbFor=function(z){ if(z===a+b&&mode==="subneg")return "That treats the second negative as an ordinary subtraction; subtracting a negative adds instead."; if(z===a+b)return "That adds the number instead of subtracting it."; if(z===b-a)return "That subtracts in the wrong order."; return "That keeps the subtraction as a plain move down; rewrite it as adding the opposite."; };
  return mcq("What is \\("+a+" - "+u2Sg(b)+"\\)?",
    {t:String(ans), fb:"Correct: "+(mode==="subneg"?"the two negatives combine into adding "+Math.abs(b)+".":"subtracting "+b+" moves down by "+b+".")},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"-")+" Then \\("+a+" + "+u2Sg(-b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b,mode:mode});
}, ["Two negatives in a row change the operation: subtracting a negative adds.", "Start by rewriting the subtraction as adding the opposite."]);

E("u2-mixed-chain", 2, ["6.29","6.25","6.27"], 1, "gen", function(){
  var a=ri(-9,9), b=ri(-9,9), c=ri(-9,9), g=0;
  while(g++<100&&(b===0||c===0)){ b=ri(-9,9); c=ri(-9,9); }
  var subFirst=pick([true,false]);
  var ans=subFirst?(a-b)+c:(a+b)-c;
  var expr=subFirst?(a+" - "+u2Sg(b)+" + "+u2Sg(c)):(a+" + "+u2Sg(b)+" - "+u2Sg(c));
  var wrong1=subFirst?(a+b)+c:(a-b)-c, wrong2=subFirst?(a-b)-c:(a+b)+c;
  var ds=u2Distr(ans,[wrong1,wrong2,-ans]);
  var stepTxt=subFirst?("First \\("+a+" - "+u2Sg(b)+" = "+(a-b)+"\\), then add \\("+u2Sg(c)+"\\)"):("First \\("+a+" + "+u2Sg(b)+" = "+(a+b)+"\\), then subtract \\("+u2Sg(c)+"\\)");
  return mcq("What is \\("+expr+"\\)?",
    {t:String(ans), fb:"Correct: work left to right and the total is "+ans+"."},
    ds.map(function(z){return {t:String(z), fb:"That changes one of the signs along the way. Work left to right, one step at a time."};}),
    stepTxt+": the result is \\("+ans+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c});
}, ["Work left to right, one operation at a time.", "Start by doing the first operation and writing down the running total."]);

E("u2-error-spot", 2, ["6.25","6.27"], 3, "var", varset([
  function(){ return mcq("A student works out \\((-4) + (-5)\\) and writes 9, saying the sizes add to 9. What is the correct answer?",
    {t:"-9", fb:"Correct: same signs add the sizes and keep the negative sign."},
    [{t:"9", fb:"That is the student's answer: the sizes add to 9, but two negatives give a negative total."},
     {t:"-1", fb:"That subtracts the sizes; with the same signs, the sizes are added."},
     {t:"1", fb:"That subtracts the sizes and drops the sign as well."}],
    "Both integers are negative, so add the sizes, \\(4 + 5 = 9\\), and keep the negative sign: \\(-9\\). The answer is <b>-9</b>.", {}); },
  function(){ return mcq("A student works out \\(3 - (-6)\\) and writes -3, saying 3 take away 6 is -3. What is the correct answer?",
    {t:"9", fb:"Correct: subtracting -6 is the same as adding 6."},
    [{t:"-3", fb:"That is the student's answer: it treats the problem as 3 - 6 and misses the second negative."},
     {t:"-9", fb:"That adds the sizes but keeps a negative sign; the value rises above 3."},
     {t:"3", fb:"That ignores the -6 completely; it still changes the value."}],
    "Rewrite as addition of the opposite: \\(3 - (-6) = 3 + 6 = 9\\). The answer is <b>9</b>.", {}); },
  function(){ return mcq("A student works out \\((-7) + 4\\) and writes -11, saying the sizes always add. What is the correct answer?",
    {t:"-3", fb:"Correct: different signs subtract the sizes, 7 - 4 = 3, and keep the sign of the larger, negative."},
    [{t:"-11", fb:"That is the student's answer: sizes are only added when the signs match."},
     {t:"3", fb:"That has the right size but the wrong sign; the larger integer is -7."},
     {t:"11", fb:"That adds the sizes and drops both signs."}],
    "The signs differ, so subtract the sizes: \\(7 - 4 = 3\\), and the larger integer is negative, giving \\(-3\\). The answer is <b>-3</b>.", {}); },
  function(){ return mcq("A student works out \\((-2) - (-8)\\) and writes -10, saying the sizes add and stay negative. What is the correct answer?",
    {t:"6", fb:"Correct: subtracting -8 adds 8, and -2 + 8 = 6."},
    [{t:"-10", fb:"That is the student's answer: it adds the sizes as if both steps went downward."},
     {t:"-6", fb:"That keeps a negative sign; after adding 8 the value passes 0."},
     {t:"10", fb:"That adds both sizes as positives and ignores the starting -2."}],
    "Rewrite: \\((-2) - (-8) = -2 + 8 = 6\\). The answer is <b>6</b>.", {}); },
  function(){ return mcq("A student works out \\(5 + (-9)\\) and writes 4, saying the answer takes the sign of the first number. What is the correct answer?",
    {t:"-4", fb:"Correct: the sizes subtract to 4, and the sign comes from the larger integer, -9."},
    [{t:"4", fb:"That is the student's answer: the sign follows the integer with the larger size, which is -9."},
     {t:"-14", fb:"That adds the sizes; with different signs, the sizes are subtracted."},
     {t:"14", fb:"That adds the sizes and drops the signs."}],
    "Different signs: subtract the sizes, \\(9 - 5 = 4\\), and keep the sign of the larger size, negative: \\(-4\\). The answer is <b>-4</b>.", {}); }
]), ["Name the student's error first, then redo the calculation with the sign rules.", "Start by deciding whether the signs are the same or different."]);

E("u2-problem-two-step", 2, ["6.29"], 1, "gen", function(){
  var T=pick([
    {pre:"A submarine is at ", unit:" m relative to the surface (below the surface is negative). It ", v:["rises ","dives "], mid:" m, then it ", post:" m. What is its final position, in metres?"},
    {pre:"The temperature at supper time is ", unit:" degrees. Overnight it ", v:["rises ","falls "], mid:" degrees, then in the morning it ", post:" degrees. What is the morning temperature, in degrees?"},
    {pre:"A hiker's position is ", unit:" m relative to the trailhead (below the trailhead is negative). It ", v:["rises ","drops "], mid:" m, then it ", post:" m. What is the final position, in metres?"}]);
  var s=ri(-20,20), up1=pick([true,false]), up2=pick([true,false]);
  if(T.pre.indexOf("submarine")>=0&&s>0)s=-s;
  var m1=ri(3,14), m2=ri(3,14);
  var ch1=up1?m1:-m1, ch2=up2?m2:-m2;
  var ans=s+ch1+ch2;
  var ds=u2Distr(ans,[s+ch1, s-ch1+ch2, s+ch1-ch2, -ans]);
  var verb=function(up,arr){ return up?arr[0]:arr[1]; };
  return mcq(T.pre+"\\("+s+"\\)"+T.unit+verb(up1,T.v)+"\\("+m1+"\\)"+T.mid+verb(up2,T.v)+"\\("+m2+"\\)"+T.post,
    {t:String(ans), fb:"Correct: the two signed changes are "+u2Sg(ch1)+" and "+u2Sg(ch2)+"."},
    ds.map(function(z){return {t:String(z), fb:"That mishandles one of the two changes. Give each change its sign and add both to the start."};}),
    "\\[ \\begin{aligned} \\text{final} &= "+s+" + "+u2Sg(ch1)+" + "+u2Sg(ch2)+" \\\\ &= "+(s+ch1)+" + "+u2Sg(ch2)+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {s:s,ch1:ch1,ch2:ch2});
}, ["Give every change a sign, then add them to the starting value in order.", "Start by writing the first change as a signed number."]);

E("u2-add-cr", 2, ["6.25"], 1, "gen", function(){
  var a=0,b=0,g=0;
  while(g++<200){ a=ri(-28,28); b=ri(-28,28); if(a!==0&&b!==0&&(a>0)!==(b>0))break; }
  var ans=a+b;
  return numq("Calculate \\("+a+" + "+u2Sg(b)+"\\) and show the sign rule you used.", ans, 0,
    "The signs differ, so subtract the smaller size from the larger and keep the sign of the larger: \\(|"+a+"| - |"+b+"| = "+Math.abs(Math.abs(a)-Math.abs(b))+"\\), with the sign of \\("+(Math.abs(a)>Math.abs(b)?a:b)+"\\). \\[ \\begin{aligned} "+a+" + "+u2Sg(b)+" &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Decide the sign of the answer before working out its size.", "Start by comparing the sizes of the two integers."]);

E("u2-sub-cr", 2, ["6.27"], 1, "gen", function(){
  var a=ri(-24,24), b=0,g=0;
  while(g++<100){ b=ri(-24,24); if(b!==0)break; }
  var ans=a-b;
  return numq("Calculate \\("+a+" - "+u2Sg(b)+"\\) and show the rewriting step you used.", ans, 0,
    "\\[ \\begin{aligned} "+a+" - "+u2Sg(b)+" &= "+a+" + "+u2Sg(-b)+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Rewrite the subtraction as adding the opposite, then use the addition rules.", "Start by flipping the sign of the number being subtracted."]);

E("u2-numberline-cr", 2, ["6.26","6.28"], 1, "gen", function(){
  var a=ri(-6,6), isSub=pick([true,false]), b=0,g=0;
  while(g++<100){ b=ri(-6,6); if(b!==0)break; }
  var end=isSub?a-b:a+b, move=isSub?-b:b;
  var q=numq("The number line shows a jump starting at \\("+a+"\\). The jump models "+(isSub?("the subtraction \\("+a+" - "+u2Sg(b)+"\\)"):("the addition \\("+a+" + "+u2Sg(b)+"\\)"))+". What value does the jump land on? Count the ticks as part of your work.", end, 0,
    (isSub?("Subtracting is adding the opposite: \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(move)+"\\). "):"")+"Starting at \\("+a+"\\) and moving "+Math.abs(move)+" units to the "+(move>0?"right":"left")+" lands on \\("+end+"\\). The answer is <b>"+end+"</b>.",
    {a:a,b:b,isSub:isSub});
  q.figure=u2Line(a,end,(move>0?"+":"")+move,false);
  return q;
}, ["The arrow's direction and length give the signed move.", "Start at the marked point and count ticks in the direction of the arrow."]);

E("u2-problem-cr", 2, ["6.29"], 3, "gen", function(){
  var T=pick([
    {pre:"A weather station records a temperature of ", u:" degrees at 6 p.m. During the night the temperature falls ", mid:" degrees, then it rises ", post:" degrees by morning, then falls ", post2:" degrees more by noon. What is the temperature at noon, in degrees?"},
    {pre:"A submersible is at ", u:" m relative to the surface (below is negative). It dives ", mid:" m, then rises ", post:" m, then dives ", post2:" m more. What is its final position, in metres?"},
    {pre:"A game character has a score of ", u:" points. The character loses ", mid:" points, then gains ", post:" points, then loses ", post2:" points. What is the final score?"}]);
  var s=ri(-15,25), f1=ri(3,12), r=ri(3,12), f2=ri(2,10);
  var ans=s-f1+r-f2;
  return numq(T.pre+"\\("+s+"\\)"+T.u+"\\("+f1+"\\)"+T.mid+"\\("+r+"\\)"+T.post+"\\("+f2+"\\)"+T.post2, ans, 0,
    "\\[ \\begin{aligned} \\text{final} &= "+s+" - "+f1+" + "+r+" - "+f2+" \\\\ &= "+(s-f1)+" + "+r+" - "+f2+" \\\\ &= "+(s-f1+r)+" - "+f2+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {s:s,f1:f1,r:r,f2:f2});
}, ["Give each change its sign and keep a running total.", "Start by writing the first change as a signed number added to the start."]);

E("u2-missing-addend-cr", 2, ["6.25","6.24"], 3, "gen", function(){
  var a=0,b=ri(-15,15),g=0;
  while(g++<100){ a=ri(-15,15); if(a!==0)break; }
  var ans=b-a;
  return numq("Find the missing integer: \\(\\square + "+u2Sg(a)+" = "+b+"\\). Show how the opposite of "+u2Sg(a)+" helps you.", ans, 0,
    "Add the opposite of \\("+a+"\\) to both sides, so the box is left on its own: \\[ \\begin{aligned} \\square &= "+b+" - "+u2Sg(a)+" \\\\ &= "+b+" + "+u2Sg(-a)+" \\\\ &= "+ans+" \\end{aligned} \\] Check: \\("+ans+" + "+u2Sg(a)+" = "+b+"\\). The answer is <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Undo the addition by adding the opposite to both sides.", "Start by asking what cancels the known addend."]);

/* ----- bank-u3.js ----- */
// Math 7 Unit 3 Fractions, Decimals and Percents question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 847 to 1623).
// CRMARKS: u3-cr-add-sub=3
// CRMARKS: u3-cr-mult=3
// CRMARKS: u3-cr-div=2
// CRMARKS: u3-cr-repeating-frac=2
// CRMARKS: u3-cr-percent=3
// CRMARKS: u3-cr-order-ops=3
/* ===== Unit 3 ===== */
/* Math 7 Unit 3: Fractions, Decimals and Percents. Helpers prefixed u3. */
function u3gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u3simp(n,d){var g=u3gcd(n,d);return [n/g,d/g];}
function u3fr(n,d){var s=u3simp(n,d);return "\\("+FR(s[0],s[1])+"\\)";}
function u3isRep(n,d){var s=u3simp(n,d),x=s[1];while(x%2===0)x/=2;while(x%5===0)x/=5;return x>1;}
function u3decStr(v){return "0."+v+"...";}
function u3repStr(n,d){
  if(d===9)return "0."+n+""+n+""+n+"...";
  if(d===3){var g=n*3;return "0."+g+""+g+""+g+"...";}
  if(d===6)return n===1?"0.1666...":"0.8333...";
  var p=9*n;var ps=(p<10?"0":"")+p;return "0."+ps+ps+"...";
}

E("u3-order-mixed", 3, ["3.3","3.2","3.4"], 2, "gen", function(){
  var vals=[],guard=0;
  while(vals.length<4&&guard++<200){var v=ri(12,96);if(vals.indexOf(v)<0)vals.push(v);}
  if(vals.length<4)vals=[24,45,63,88];
  var forms=["dec","fra","pct","raw"];
  var rend=function(v,f){
    if(f==="dec")return fmt(v/100);
    if(f==="fra")return u3simp(v,100)[0]+"/"+u3simp(v,100)[1];
    if(f==="pct")return v+"%";
    return v+"/100";
  };
  var items=vals.map(function(v,i){return {v:v,s:rend(v,forms[i])};});
  var asc=items.slice().sort(function(a,b){return a.v-b.v;});
  var join=function(arr){return arr.map(function(x){return x.s;}).join(", ");};
  var correct=join(asc);
  var desc=asc.slice().reverse();
  var sw1=[asc[1],asc[0],asc[2],asc[3]];
  var sw2=[asc[0],asc[1],asc[3],asc[2]];
  var sol="Write each number as a decimal: "+asc.map(function(x){return x.s+" = "+fmt(x.v/100);}).join(", ")+". In ascending order: <b>"+correct+"</b>.";
  return mcq("Write the numbers in ascending order (smallest to largest): "+join(items)+".",
    {t:correct, fb:"Correct: converting each to a decimal gives the order shown."},
    [{t:join(desc), fb:"That is descending order (largest first); the question asks for ascending."},
     {t:join(sw1), fb:"The first two numbers are swapped: compare their decimal values."},
     {t:join(sw2), fb:"The last two numbers are swapped: compare their decimal values."}],
    sol, {vals:vals});
}, ["Convert every number to the same form, such as decimals, before comparing.", "Start by writing each fraction and percent as a decimal."]);

E("u3-numberline-place", 3, ["3.1","3.4"], 1, "gen", function(){
  var dens=[3,4,5,6,7,8,9,10,11,12];
  var d=pick(dens), n=ri(1,d-1), p=n/d;
  var cx=30+270*p;
  var fig='<svg viewBox="0 0 330 78" width="330" height="78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1 with a dot marked">'
    +'<line x1="30" y1="42" x2="300" y2="42" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="30" y1="36" x2="30" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="165" y1="36" x2="165" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="300" y1="36" x2="300" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<circle cx="'+fmt(cx,1)+'" cy="42" r="5" fill="'+FIG_ACC+'"/>'
    +_txt(30,64,"0",12,false)+_txt(165,64,"1/2",12,false)+_txt(300,64,"1",12,false)
    +_txt(cx,18,"?",13,true)+'</svg>';
  var cand=[[n+1,d],[n-1,d],[d-n,d],[n,d+1],[n+1,d+2],[1,d],[n+2,d]];
  var seenV={}; seenV[fmt(p,6)]=1; var ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){
    var cn=cand[i][0],cd=cand[i][1];
    if(cn<=0||cd<=0)continue;
    var cv=cn/cd, key=fmt(cv,6);
    if(seenV[key])continue; seenV[key]=1;
    ds.push({t:"\\("+FR(cn,cd)+"\\)", fb:"That fraction marks a different point: compare its size with the benchmarks 0, 1/2 and 1."});
  }
  var q=mcq("The dot on the number line marks a number. Which fraction is at the dot?",
    {t:"\\("+FR(n,d)+"\\)", fb:"Yes: the dot sits at "+n+" of the "+d+" equal parts between 0 and 1."},
    ds,
    "The line from 0 to 1 is split into "+d+" equal parts and the dot is on part "+n+", so the dot marks "+u3fr(n,d)+". The answer is <b>"+u3fr(n,d)+"</b>.",
    {n:n,d:d});
  q.figure=fig;
  return q;
}, ["Use the benchmarks 0, 1/2 and 1 to narrow down where the dot sits.", "Start by deciding which half of the line the dot is in, then count equal parts."]);

E("u3-numberline-mixed", 3, ["3.2","3.1"], 2, "gen", function(){
  var dens=[2,3,4,5,6,8,10,12];
  var d=pick(dens), w=ri(1,2), n=ri(1,d-1), val=w+n/d;
  var cx=25+93.3*val;
  var fig='<svg viewBox="0 0 330 78" width="330" height="78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 3 with a dot marked">'
    +'<line x1="25" y1="42" x2="305" y2="42" stroke="'+FIG_INK+'" stroke-width="2"/>';
  [0,1,2,3].forEach(function(k){fig+='<line x1="'+fmt(25+93.3*k,1)+'" y1="36" x2="'+fmt(25+93.3*k,1)+'" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'+_txt(25+93.3*k,64,String(k),12,false);});
  fig+='<circle cx="'+fmt(cx,1)+'" cy="42" r="5" fill="'+FIG_ACC+'"/>'+_txt(cx,18,"?",13,true)+'</svg>';
  function mt(ww,nn,dd){return "\\("+ww+FR(nn,dd)+"\\)";}
  var cand=[{t:mt(w,n+1,d),v:w+(n+1)/d},{t:mt(w+1,n,d),v:w+1+n/d},{t:mt(w,d-n,d),v:w+(d-n)/d},{t:"\\("+(w+1)+"\\)",v:w+1},{t:mt(w,n,d+2),v:w+n/(d+2)}];
  var seenV={}; seenV[fmt(val,6)]=1; var ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){
    var key=fmt(cand[i].v,6);
    if(seenV[key])continue; seenV[key]=1;
    ds.push({t:cand[i].t, fb:"That number marks a different point: check the whole-number part first, then the fraction part."});
  }
  var q=mcq("The dot on the number line marks a number. Which number is at the dot?",
    {t:mt(w,n,d), fb:"Yes: the dot is past "+w+" by "+n+" of the "+d+" equal parts in one unit."},
    ds,
    "The dot lies between "+w+" and "+(w+1)+", at "+n+" of the "+d+" equal parts of that unit, so it marks \\("+w+FR(n,d)+"\\). The answer is <b>\\("+w+FR(n,d)+"\\)</b>.",
    {w:w,n:n,d:d});
  q.figure=fig;
  return q;
}, ["First find which two whole numbers the dot sits between.", "Start with the whole-number part, then count the equal parts inside that unit."]);

E("u3-between", 3, ["3.5","3.3"], 1, "gen", function(){
  if(ri(0,1)===0){
    var t=ri(1,8), a=t/10+ri(0,3)/100, step=ri(3,6)/100, b=a+step;
    var c=a+ri(1,Math.round(step*100)-1)/100;
    var sol="Any number greater than "+fmtF(a,2)+" and less than "+fmtF(b,2)+" works. "+fmtF(c,2)+" sits between them. The answer is <b>"+fmtF(c,2)+"</b>.";
    return mcq("Which number lies between "+fmtF(a,2)+" and "+fmtF(b,2)+"?",
      {t:fmtF(c,2), fb:"Yes: "+fmtF(c,2)+" is greater than "+fmtF(a,2)+" and less than "+fmtF(b,2)+"."},
      [{t:fmtF(a-0.02,2), fb:"That number is smaller than "+fmtF(a,2)+", so it is outside the pair."},
       {t:fmtF(b+0.02,2), fb:"That number is larger than "+fmtF(b,2)+", so it is outside the pair."},
       {t:fmtF(b+0.07,2), fb:"That number is larger than "+fmtF(b,2)+", so it is outside the pair."}],
      sol, {mode:"dec", a:a, b:b});
  }
  var dens=[4,5,6,8,10], d=pick(dens), n=ri(1,d-2);
  var lo=[n,d], hi=[n+1,d], mid=u3simp(2*n+1,2*d);
  var below=u3simp(2*n-1,2*d), above=u3simp(2*n+3,2*d);
  var sol2="Use a common denominator of "+(2*d)+": the numbers are "+u3fr(2*n,2*d)+" and "+u3fr(2*n+2,2*d)+", so "+u3fr(mid[0],mid[1])+" lies between them. The answer is <b>"+u3fr(mid[0],mid[1])+"</b>.";
  return mcq("Which fraction lies between \\("+FR(lo[0],lo[1])+"\\) and \\("+FR(hi[0],hi[1])+"\\)?",
    {t:u3fr(mid[0],mid[1]), fb:"Yes: with denominator "+(2*d)+" it falls between the two given fractions."},
    [{t:u3fr(below[0],below[1]), fb:"That fraction is smaller than the first given fraction."},
     {t:u3fr(above[0],above[1]), fb:"That fraction is larger than the second given fraction."},
     {t:u3fr(lo[0],lo[1]), fb:"That is the endpoint itself, not a number between the pair."}],
    sol2, {mode:"frac", n:n, d:d});
}, ["A number between two numbers is larger than the smaller one and smaller than the larger one.", "Start by comparing each choice with both given numbers."]);

E("u3-misplaced", 3, ["3.6","3.3"], 2, "var", varset([
  function(){ return mcq("The numbers 0.3, \\("+FR(2,5)+"\\), 0.35, \\("+FR(3,4)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.35", fb:"Yes: 0.35 is less than 2/5 = 0.4, so it should come before 2/5."},
    [{t:"0.30", fb:"0.3 is the smallest value, so it belongs first."},
     {t:"\\("+FR(2,5)+"\\)", fb:"2/5 = 0.4 belongs after 0.35 and before 0.75; it is not the misplaced one."},
     {t:"\\("+FR(3,4)+"\\)", fb:"3/4 = 0.75 is the largest value, so it belongs last."}],
    "As decimals the values are 0.3, 0.4, 0.35, 0.75. The value 0.35 drops below the one before it, so <b>0.35</b> is incorrectly placed.", {s:1}); },
  function(){ return mcq("The numbers \\("+FR(1,4)+"\\), 0.3, \\("+FR(3,5)+"\\), 0.55 were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.55", fb:"Yes: 0.55 is less than 3/5 = 0.6, so it should come before 3/5."},
    [{t:"\\("+FR(1,4)+"\\)", fb:"1/4 = 0.25 is the smallest value, so it belongs first."},
     {t:"0.30", fb:"0.3 sits between 0.25 and 0.6, so its place is fine."},
     {t:"\\("+FR(3,5)+"\\)", fb:"3/5 = 0.6 belongs before 0.55 in a correct list; the error is 0.55 after it."}],
    "As decimals the values are 0.25, 0.3, 0.6, 0.55. The value 0.55 drops below the one before it, so <b>0.55</b> is incorrectly placed.", {s:2}); },
  function(){ return mcq("The numbers 0.15, \\("+FR(1,5)+"\\), 0.28, \\("+FR(1,4)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"\\("+FR(1,4)+"\\)", fb:"Yes: 1/4 = 0.25 is less than 0.28, so it should come before 0.28."},
    [{t:"0.15", fb:"0.15 is the smallest value, so it belongs first."},
     {t:"\\("+FR(1,5)+"\\)", fb:"1/5 = 0.2 sits between 0.15 and 0.28, so its place is fine."},
     {t:"0.28", fb:"0.28 belongs before 1/4 in a correct list; the error is 1/4 after it."}],
    "As decimals the values are 0.15, 0.2, 0.28, 0.25. The value 0.25 drops below the one before it, so <b>1/4</b> is incorrectly placed.", {s:3}); },
  function(){ return mcq("The numbers \\("+FR(3,8)+"\\), 0.42, \\("+FR(1,2)+"\\), 0.48 were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.48", fb:"Yes: 0.48 is less than 1/2 = 0.5, so it should come before 1/2."},
    [{t:"\\("+FR(3,8)+"\\)", fb:"3/8 = 0.375 is the smallest value, so it belongs first."},
     {t:"0.42", fb:"0.42 sits between 0.375 and 0.5, so its place is fine."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0.5 belongs before 0.48 in a correct list; the error is 0.48 after it."}],
    "As decimals the values are 0.375, 0.42, 0.5, 0.48. The value 0.48 drops below the one before it, so <b>0.48</b> is incorrectly placed.", {s:4}); },
  function(){ return mcq("The numbers 0.62, \\("+FR(7,10)+"\\), 0.68, \\("+FR(4,5)+"\\) were meant to be in ascending order. Which number is incorrectly placed?",
    {t:"0.68", fb:"Yes: 0.68 is less than 7/10 = 0.7, so it should come before 7/10."},
    [{t:"0.62", fb:"0.62 is the smallest value, so it belongs first."},
     {t:"\\("+FR(7,10)+"\\)", fb:"7/10 = 0.7 belongs before 0.68 in a correct list; the error is 0.68 after it."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0.8 is the largest value, so it belongs last."}],
    "As decimals the values are 0.62, 0.7, 0.68, 0.8. The value 0.68 drops below the one before it, so <b>0.68</b> is incorrectly placed.", {s:5}); },
  function(){ return mcq("The numbers 0.9, \\("+FR(4,5)+"\\), 0.85, \\("+FR(1,2)+"\\) were meant to be in descending order. Which number is incorrectly placed?",
    {t:"0.85", fb:"Yes: in descending order 0.85 should come before 4/5 = 0.8, not after it."},
    [{t:"0.90", fb:"0.9 is the largest value, so it belongs first in descending order."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0.8 belongs after 0.85 in a correct list; the error is 0.85 after it."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0.5 is the smallest value, so it belongs last."}],
    "As decimals the values are 0.9, 0.8, 0.85, 0.5. In descending order each value should drop, but 0.85 rises above 0.8, so <b>0.85</b> is incorrectly placed.", {s:6}); }
]), ["Convert each number to a decimal and watch for the place where the order breaks.", "Start by writing the decimal value of each fraction in the list."]);

E("u3-percent-convert", 3, ["3.7"], 1, "gen", function(){
  var p=ri(2,98);
  if(ri(0,1)===0){
    var s=u3simp(p,100);
    var pool=[[p,100],[100-p,100],[p,10],[p+100,100],[100,p]];
    var seen={}; seen[fmt(p/100,6)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var cv=pool[i][0]/pool[i][1], key=fmt(cv,6);
      if(seen[key])continue; seen[key]=1;
      var ss=u3simp(pool[i][0],pool[i][1]);
      ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"That fraction has a different value: a percent is a part out of 100, then simplify."});
    }
    return mcq("Write "+p+"% as a fraction in lowest terms.",
      {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Yes: "+p+"% = "+p+"/100, which simplifies to the fraction shown."},
      ds,
      "\\[ \\begin{aligned} "+p+"\\% &= "+FR(p,100)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] The answer is <b>\\("+FR(s[0],s[1])+"\\)</b>.",
      {mode:"frac", p:p});
  }
  var cor=p/100;
  var pool2=[p/10,p/1000,(100+p)/100,p,cor+0.1];
  var seen2={}; seen2[fmt(cor,6)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var key2=fmt(pool2[j],6);
    if(seen2[key2])continue; seen2[key2]=1;
    ds2.push({t:fmt(pool2[j],3), fb:"That decimal shifts the percent by the wrong number of places: divide by 100."});
  }
  ds2=precPair(fmt(cor),ds2);
  return mcq("Write "+p+"% as a decimal.",
    {t:fmt(cor), fb:"Yes: dividing "+p+" by 100 moves the decimal point two places left."},
    ds2,
    "A percent is out of 100, so \\("+p+"\\% = "+p+" \\div 100 = "+fmt(cor)+"\\). The answer is <b>"+fmt(cor)+"</b>.",
    {mode:"dec", p:p});
}, ["Percent means out of 100.", "Start by writing the percent over 100, then simplify or divide."]);

E("u3-frac-to-decimal", 3, ["3.11"], 1, "gen", function(){
  var dens=[2,4,5,8,10,20,25,40,50];
  var d=pick(dens), w=ri(0,2), n=ri(1,d-1);
  var v=(w*d+n)/d;
  var pool=[v+0.1,v-0.1,v+0.02,v-0.02,v+1,v+0.5];
  var seen={}; seen[fmt(v,4)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var key=fmt(pool[i],4);
    if(seen[key])continue; seen[key]=1;
    ds.push({t:fmt(pool[i],3), fb:"That decimal has a different value: divide the numerator by the denominator to check."});
  }
  ds=precPair(fmt(v,3),ds);
  var num=w*d+n;
  return mcq("Write \\("+FR(num,d)+"\\) as a decimal.",
    {t:fmt(v,3), fb:"Yes: "+num+" divided by "+d+" gives this decimal."},
    ds,
    "\\[ \\begin{aligned} "+FR(num,d)+" &= "+num+" \\div "+d+" \\\\ &= "+fmt(v,3)+" \\end{aligned} \\] The answer is <b>"+fmt(v,3)+"</b>.",
    {num:num, d:d});
}, ["A fraction is a division: numerator divided by denominator.", "Start by dividing the top number by the bottom number."]);

E("u3-repeating-predict", 3, ["3.8","3.11"], 1, "gen", function(){
  var mode=ri(0,2);
  if(mode===0){
    var k=ri(3,10), dig=9*k, ds=(dig<10?"0":"")+dig;
    var d1=9*(k+1), d2=9*(k-1);
    return mcq("Patterns: \\("+FR(1,11)+"\\) = 0.0909..., \\("+FR(2,11)+"\\) = 0.1818.... Using the pattern, what is \\("+FR(k,11)+"\\) as a decimal?",
      {t:"0."+ds+ds+"...", fb:"Yes: the repeating block is 9 times "+k+", written as two digits."},
      [{t:"0."+((d1<10?"0":"")+d1)+((d1<10?"0":"")+d1)+"...", fb:"That block is 9 times "+(k+1)+": one step too far in the pattern."},
       {t:"0."+((d2<10?"0":"")+d2)+((d2<10?"0":"")+d2)+"...", fb:"That block is 9 times "+(k-1)+": one step short in the pattern."},
       {t:"0."+k+""+k+"...", fb:"That repeats the numerator itself; the block for elevenths is 9 times the numerator."}],
      "Each numerator adds another 0.0909..., so the repeating block for \\("+FR(k,11)+"\\) is \\(9 \\times "+k+" = "+dig+"\\), written with two digits. The answer is <b>0."+ds+ds+"...</b>.",
      {mode:"p11", k:k});
  }
  if(mode===1){
    var m=ri(12,96);
    return mcq("Patterns: \\("+FR(1,99)+"\\) = 0.0101..., \\("+FR(2,99)+"\\) = 0.0202.... Using the pattern, what is \\("+FR(m,99)+"\\) as a decimal?",
      {t:"0."+m+""+m+"...", fb:"Yes: for ninety-ninths the numerator itself repeats as a two-digit block."},
      [{t:"0."+(m+1)+""+(m+1)+"...", fb:"That block is one more than the numerator: copy the numerator exactly."},
       {t:"0."+(m-1)+""+(m-1)+"...", fb:"That block is one less than the numerator: copy the numerator exactly."},
       {t:"0."+m+"...", fb:"That shows the block only once with no repeat shown; a repeating decimal keeps going."}],
      "For ninety-ninths, the two-digit numerator repeats: \\("+FR(m,99)+"\\) = 0."+m+""+m+".... The answer is <b>0."+m+""+m+"...</b>.",
      {mode:"p99", m:m});
  }
  var pairs=[[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,3],[2,3],[1,6],[5,6],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]];
  var pr=pick(pairs), n=pr[0], d=pr[1], cor=u3repStr(n,d);
  var alt1=cor.replace(/3/g,"4").replace(/6/g,"7");
  var ds3=[alt1, "0."+n+"...", "0."+n+""+d+"..."].filter(function(x){return x!==cor;});
  var seen3={}; var out=[];
  ds3.forEach(function(x){if(!seen3[x]){seen3[x]=1;out.push(x);}});
  while(out.length<3)out.push("0."+(n+1)+""+(n+1)+"...");
  return mcq("Write \\("+FR(n,d)+"\\) as a decimal.",
    {t:cor, fb:"Yes: dividing "+n+" by "+d+" gives this repeating decimal."},
    out.slice(0,3).map(function(x){return {t:x, fb:"That decimal has different repeating digits: divide the numerator by the denominator to check."};}),
    "\\("+FR(n,d)+" = "+n+" \\div "+d+" = "+cor+"\\), and the digits keep repeating. The answer is <b>"+cor+"</b>.",
    {mode:"direct", n:n, d:d});
}, ["Look at how the repeating block changes as the numerator grows.", "Start by checking the pattern for the smallest numerators, then extend it."]);

E("u3-match-decimals", 3, ["3.9","3.11"], 2, "var", varset([
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(3,8)+"\\) = 0.375", fb:"Yes: 3 divided by 8 is 0.375."},
    [{t:"\\("+FR(1,4)+"\\) = 0.14", fb:"1/4 = 0.25: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(2,5)+"\\) = 0.25", fb:"2/5 = 0.4: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(5,8)+"\\) = 0.58", fb:"5/8 = 0.625: the digits of the fraction are not its decimal."}],
    "Divide each numerator by its denominator: 1/4 = 0.25, 3/8 = 0.375, 2/5 = 0.4, 5/8 = 0.625. Only <b>3/8 = 0.375</b> matches.", {s:1}); },
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(1,3)+"\\) = 0.333...", fb:"Yes: 1 divided by 3 gives 0.333..., repeating."},
    [{t:"\\("+FR(1,6)+"\\) = 0.6", fb:"1/6 = 0.1666...: the denominator is not the decimal."},
     {t:"\\("+FR(2,3)+"\\) = 0.23", fb:"2/3 = 0.666...: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(5,6)+"\\) = 0.56", fb:"5/6 = 0.8333...: the digits of the fraction are not its decimal."}],
    "Divide each numerator by its denominator: 1/6 = 0.1666..., 1/3 = 0.333..., 2/3 = 0.666..., 5/6 = 0.8333.... Only <b>1/3 = 0.333...</b> matches.", {s:2}); },
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(7,10)+"\\) = 0.7", fb:"Yes: 7 divided by 10 is 0.7."},
    [{t:"\\("+FR(3,4)+"\\) = 0.34", fb:"3/4 = 0.75: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(9,20)+"\\) = 0.92", fb:"9/20 = 0.45: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(1,8)+"\\) = 0.18", fb:"1/8 = 0.125: the digits of the fraction are not its decimal."}],
    "Divide each numerator by its denominator: 7/10 = 0.7, 3/4 = 0.75, 9/20 = 0.45, 1/8 = 0.125. Only <b>7/10 = 0.7</b> matches.", {s:3}); },
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(4,11)+"\\) = 0.3636...", fb:"Yes: 4 divided by 11 gives 0.3636..., with 36 repeating."},
    [{t:"\\("+FR(2,11)+"\\) = 0.211", fb:"2/11 = 0.1818...: check by dividing."},
     {t:"\\("+FR(5,9)+"\\) = 0.59", fb:"5/9 = 0.555...: check by dividing."},
     {t:"\\("+FR(3,7)+"\\) = 0.37", fb:"3/7 = 0.428571...: check by dividing."}],
    "Divide each numerator by its denominator: 2/11 = 0.1818..., 4/11 = 0.3636..., 5/9 = 0.555..., 3/7 = 0.428571.... Only <b>4/11 = 0.3636...</b> matches.", {s:4}); },
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(5,6)+"\\) = 0.8333...", fb:"Yes: 5 divided by 6 gives 0.8333..., with 3 repeating."},
    [{t:"\\("+FR(4,9)+"\\) = 0.49", fb:"4/9 = 0.444...: the digits of the fraction are not its decimal."},
     {t:"\\("+FR(7,12)+"\\) = 0.712", fb:"7/12 = 0.58333...: check by dividing."},
     {t:"\\("+FR(2,7)+"\\) = 0.27", fb:"2/7 = 0.285714...: check by dividing."}],
    "Divide each numerator by its denominator: 5/6 = 0.8333..., 4/9 = 0.444..., 7/12 = 0.58333..., 2/7 = 0.285714.... Only <b>5/6 = 0.8333...</b> matches.", {s:5}); },
  function(){ return mcq("Which matching of a fraction to its decimal is correct?",
    {t:"\\("+FR(1,9)+"\\) = 0.111...", fb:"Yes: 1 divided by 9 gives 0.111..., repeating."},
    [{t:"\\("+FR(3,10)+"\\) = 0.31", fb:"3/10 = 0.3 exactly: check the place values."},
     {t:"\\("+FR(5,12)+"\\) = 0.512", fb:"5/12 = 0.41666...: check by dividing."},
     {t:"\\("+FR(7,8)+"\\) = 0.78", fb:"7/8 = 0.875: the digits of the fraction are not its decimal."}],
    "Divide each numerator by its denominator: 1/9 = 0.111..., 3/10 = 0.3, 5/12 = 0.41666..., 7/8 = 0.875. Only <b>1/9 = 0.111...</b> matches.", {s:6}); }
]), ["Divide the numerator by the denominator for each pairing.", "Start by testing the pairing whose decimal you can check fastest, such as tenths."]);

E("u3-sort-repeat-term", 3, ["3.10","3.11"], 2, "gen", function(){
  var wantRep=ri(0,1)===0, guard=0;
  function drawFrac(rep){
    for(var t=0;t<300;t++){
      var d=ri(3,40), n=ri(1,d-1);
      if(u3isRep(n,d)===rep)return [n,d];
    }
    return rep?[1,3]:[1,4];
  }
  var opts=[], seenT={};
  var target=drawFrac(wantRep); opts.push(target); seenT[target[0]+"/"+target[1]]=1;
  while(opts.length<4&&guard++<50){
    var f=drawFrac(!wantRep), key=f[0]+"/"+f[1];
    if(seenT[key])continue; seenT[key]=1; opts.push(f);
  }
  while(opts.length<4){var fb2=wantRep?[1,4]:[1,3]; if(!seenT[fb2[0]+"/"+fb2[1]]){opts.push(fb2); seenT["1/"+fb2[1]]=1;} else break;}
  var mk=function(f,ok){
    return {t:"\\("+FR(f[0],f[1])+"\\)", fb:ok?("Yes: in lowest terms the denominator is "+u3simp(f[0],f[1])[1]+", which has a prime factor other than 2 or 5 (repeating) or only 2s and 5s (terminating)."):("That fraction is the other type: simplify it, then check the prime factors of its denominator.")};
  };
  var cor=mk(target,true);
  var ds=opts.slice(1).map(function(f){return mk(f,false);});
  var sol="Simplify each fraction and factor its denominator. A decimal terminates when the denominator has only 2s and 5s as prime factors; any other prime factor means it repeats. Only "+u3fr(target[0],target[1])+" is the "+(wantRep?"repeating":"terminating")+" one. The answer is <b>"+u3fr(target[0],target[1])+"</b>.";
  return mcq(wantRep?"Which fraction has a repeating decimal?":"Which fraction has a terminating decimal?",
    cor, ds, sol, {wantRep:wantRep});
}, ["Simplify the fraction first, then look at the prime factors of the denominator.", "Start by reducing one fraction and checking whether its denominator factors into only 2s and 5s."]);

E("u3-decimal-to-fraction", 3, ["3.12"], 1, "gen", function(){
  var pl=pick([1,2,3]), max=Math.pow(10,pl)-1, lo=(pl===1?1:11);
  var m=ri(lo,max); while(m%10===0)m=ri(lo,max);
  var den=Math.pow(10,pl), s=u3simp(m,den), corV=m/den;
  var pool=[[m,den],[den,m],[m,10],[m,1000],[m+den,den],[m,den*10]];
  var seen={}; seen[fmt(corV,6)]=1; var seenT={}; seenT[s[0]+"/"+s[1]]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var cv=pool[i][0]/pool[i][1], ss=u3simp(pool[i][0],pool[i][1]), tk=ss[0]+"/"+ss[1];
    if(seen[fmt(cv,6)]||seenT[tk])continue;
    seen[fmt(cv,6)]=1; seenT[tk]=1;
    ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"That fraction has a different value: count the decimal places to choose the denominator."});
  }
  return mcq("Write "+fmt(corV,3)+" as a fraction in lowest terms.",
    {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Yes: the decimal has "+pl+" decimal place(s), so write it over "+den+" and simplify."},
    ds,
    "\\[ \\begin{aligned} "+fmt(corV,3)+" &= "+FR(m,den)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] The answer is <b>\\("+FR(s[0],s[1])+"\\)</b>.",
    {m:m, pl:pl});
}, ["The number of decimal places tells you the denominator: tenths, hundredths or thousandths.", "Start by writing the decimal as a fraction over 10, 100 or 1000."]);

E("u3-repeating-to-fraction", 3, ["3.13"], 3, "gen", function(){
  var pool, corS, disp;
  if(ri(0,1)===0){
    var a=ri(2,8); corS=u3simp(a,9); disp="0."+a+""+a+""+a+"...";
    pool=[[a,10],[a,99],[a+1,9],[a,90]];
  } else {
    var m=ri(12,97); while(m%10===0||m%11===0)m=ri(12,97);
    corS=u3simp(m,99); disp="0."+m+""+m+"...";
    pool=[[m,100],[m,90],[m,9],[m+9,99]];
  }
  var corV=corS[0]/corS[1];
  var seen={}; seen[fmt(corV,6)]=1; var seenT={}; seenT[corS[0]+"/"+corS[1]]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var ss=u3simp(pool[i][0],pool[i][1]), tk=ss[0]+"/"+ss[1], cv=pool[i][0]/pool[i][1];
    if(seen[fmt(cv,6)]||seenT[tk])continue;
    seen[fmt(cv,6)]=1; seenT[tk]=1;
    ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"That fraction has a different value: the denominator for a repeating block is 9 or 99, not a power of 10."});
  }
  return mcq("Write "+disp+" as a fraction in lowest terms.",
    {t:"\\("+FR(corS[0],corS[1])+"\\)", fb:"Yes: put the repeating block over 9 (one digit) or 99 (two digits), then simplify."},
    ds,
    "The repeating block goes over 9 for one repeating digit or 99 for two, giving \\("+FR(corS[0],corS[1])+"\\) after simplifying. The answer is <b>\\("+FR(corS[0],corS[1])+"\\)</b>.",
    {disp:disp});
}, ["A repeating block of one digit sits over 9; a block of two digits sits over 99.", "Start by writing the repeating digits as the numerator over 9 or 99."]);

E("u3-approx-example", 3, ["3.14","3.11"], 1, "var", varset([
  function(){ return mcq("Which statement gives an example where a decimal is used as an approximation of the exact value of a fraction?",
    {t:"A recipe uses 0.33 of a cup for \\("+FR(1,3)+"\\) of a cup, since 0.33 is close to but not exactly \\("+FR(1,3)+"\\)", fb:"Yes: 1/3 = 0.333..., so 0.33 is a rounded approximation."},
    [{t:"A recipe uses 0.25 of a cup for \\("+FR(1,4)+"\\) of a cup of flour when the cook measures the ingredients for a cake", fb:"0.25 is exactly 1/4, so nothing is approximated."},
     {t:"A ribbon is cut at 0.5 m for \\("+FR(1,2)+"\\) of a metre of ribbon for the border of a quilt", fb:"0.5 is exactly 1/2, so nothing is approximated."},
     {t:"A tank holds 0.4 L for \\("+FR(2,5)+"\\) of a litre of water when the tank is filled to that mark on the side", fb:"0.4 is exactly 2/5, so nothing is approximated."}],
    "Only \\("+FR(1,3)+"\\) has a decimal that never ends (0.333...), so writing 0.33 rounds it. The others are exact. The answer is <b>the recipe statement using 0.33</b>.", {s:1}); },
  function(){ return mcq("Which statement gives an example where a decimal is used as an approximation of the exact value of a fraction?",
    {t:"A report says about 0.67 of the class for \\("+FR(2,3)+"\\) of the class, since 0.67 is close to but not exactly \\("+FR(2,3)+"\\)", fb:"Yes: 2/3 = 0.666..., so 0.67 is a rounded approximation."},
    [{t:"A report says 0.75 of the class for \\("+FR(3,4)+"\\) of the class took part in the survey about lunchtime activities", fb:"0.75 is exactly 3/4, so nothing is approximated."},
     {t:"A report says 0.2 of the class for \\("+FR(1,5)+"\\) of the class chose the same answer in the survey of the whole grade", fb:"0.2 is exactly 1/5, so nothing is approximated."},
     {t:"A report says 0.6 of the class for \\("+FR(3,5)+"\\) of the class picked that option when the class was surveyed in June", fb:"0.6 is exactly 3/5, so nothing is approximated."}],
    "Only \\("+FR(2,3)+"\\) has a decimal that never ends (0.666...), so writing 0.67 rounds it. The others are exact. The answer is <b>the report statement using 0.67</b>.", {s:2}); },
  function(){ return mcq("Which statement gives an example where a decimal is used as an approximation of the exact value of a fraction?",
    {t:"A trail sign rounds \\("+FR(1,6)+"\\) of the route to 0.17, since the exact decimal keeps going", fb:"Yes: 1/6 = 0.1666..., so 0.17 is a rounded approximation."},
    [{t:"A trail sign marks \\("+FR(3,10)+"\\) of the route as 0.3 of the way from the trailhead to the lake", fb:"0.3 is exactly 3/10, so nothing is approximated."},
     {t:"A trail sign marks \\("+FR(5,8)+"\\) of the route as 0.625 to the lake lookout", fb:"0.625 is exactly 5/8, so nothing is approximated."},
     {t:"A trail sign marks \\("+FR(7,20)+"\\) of the route as 0.35 of the way from the trailhead", fb:"0.35 is exactly 7/20, so nothing is approximated."}],
    "Only \\("+FR(1,6)+"\\) has a decimal that never ends (0.1666...), so writing 0.17 rounds it. The others are exact. The answer is <b>the trail sign statement using 0.17</b>.", {s:3}); },
  function(){ return mcq("Which statement gives an example where a decimal is used as an approximation of the exact value of a fraction?",
    {t:"A weather report gives \\("+FR(5,6)+"\\) of the day as about 0.83, since the exact decimal keeps going", fb:"Yes: 5/6 = 0.8333..., so 0.83 is a rounded approximation."},
    [{t:"A weather report gives \\("+FR(1,8)+"\\) of the day as 0.125 spent outdoors in the sunshine", fb:"0.125 is exactly 1/8, so nothing is approximated."},
     {t:"A weather report gives \\("+FR(9,10)+"\\) of the day as 0.9 spent outdoors in the sunshine and the rain", fb:"0.9 is exactly 9/10, so nothing is approximated."},
     {t:"A weather report gives \\("+FR(3,20)+"\\) of the day as 0.15 spent outdoors during the day", fb:"0.15 is exactly 3/20, so nothing is approximated."}],
    "Only \\("+FR(5,6)+"\\) has a decimal that never ends (0.8333...), so writing 0.83 rounds it. The others are exact. The answer is <b>the weather statement using 0.83</b>.", {s:4}); },
  function(){ return mcq("Which statement gives an example where a decimal is used as an approximation of the exact value of a fraction?",
    {t:"A gardener waters \\("+FR(1,7)+"\\) of a bed and records it as about 0.14, since the exact decimal keeps going", fb:"Yes: 1/7 = 0.142857..., so 0.14 is a rounded approximation."},
    [{t:"A gardener waters \\("+FR(2,8)+"\\) of a bed and records it as 0.25 with the watering can on a dry morning in July", fb:"0.25 is exactly 2/8 = 1/4, so nothing is approximated."},
     {t:"A gardener waters \\("+FR(4,10)+"\\) of a bed and records it as 0.4 with the watering can on a dry morning", fb:"0.4 is exactly 4/10, so nothing is approximated."},
     {t:"A gardener waters \\("+FR(6,20)+"\\) of a bed and records it as 0.3 with the watering can early in the morning", fb:"0.3 is exactly 6/20, so nothing is approximated."}],
    "Only \\("+FR(1,7)+"\\) has a decimal that never ends (0.142857...), so writing 0.14 rounds it. The others are exact. The answer is <b>the gardener statement using 0.14</b>.", {s:5}); }
]), ["An approximation happens when the exact decimal never ends, so a rounded decimal is used.", "Start by checking which fraction has a repeating decimal."]);

E("u3-add-sub-decimals", 3, ["6.5","6.6"], 1, "gen", function(){
  var ctxs=[
    {add:true, s:"Maya buys a notebook for $%A and a pen for $%B. How much does she spend in total?"},
    {add:true, s:"A trail has two parts: %A km and %B km. What is the total length of the trail?"},
    {add:true, s:"Three ribbons measure %A m, %B m and %C m. What is their total length?"},
    {add:false, s:"Jonah has $%A and spends $%B on lunch. How much money does he have left?"},
    {add:false, s:"A tank holds %A L of water. A family uses %B L. How much water is left?"},
    {add:false, s:"A board is %A m long. A piece %B m long is cut off. How long is the piece that remains?"}
  ];
  var c=pick(ctxs);
  var A=ri(120,4800)/100, B=ri(110,2900)/100;
  if(!c.add&&B>A){var tmp=A;A=B;B=tmp;}
  var parts=[A,B], ans=A+B;
  if(c.add&&c.s.indexOf("%C")>=0){var C=ri(105,1500)/100; parts.push(C); ans+=C;}
  if(!c.add)ans=A-B;
  var prompt=c.s.replace("%A",fmtF(A,2)).replace("%B",fmtF(B,2));
  if(parts.length===3)prompt=prompt.replace("%C",fmtF(parts[2],2));
  var pool=[ans+0.1,ans-0.1,ans+1,ans-1,ans+0.01,ans+10];
  var seen={}; seen[fmtF(ans,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=fmtF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"$"+k.replace(/^\$/,""), fb:"Check the place values: line up the decimal points and add or subtract column by column."});
  }
  ds=ds.map(function(o){return {t:(c.s.indexOf("$")>=0?"$":"")+o.t.replace(/^\$/,""), fb:o.fb};});
  var corT=(c.s.indexOf("$")>=0?"$":"")+fmtF(ans,2);
  ds.forEach(function(o){if(o.t.indexOf("$")!==0&&corT.indexOf("$")===0)o.t="$"+o.t;});
  var steps=parts.map(function(x){return fmtF(x,2);}).join(c.add?" + ":"");
  var sol=c.add
    ? "\\[ \\begin{aligned} &"+parts.map(function(x){return fmtF(x,2);}).join(" + ")+" \\\\ &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>."
    : "\\[ \\begin{aligned} "+fmtF(A,2)+" - "+fmtF(B,2)+" &= "+fmtF(ans,2)+" \\end{aligned} \\] The answer is <b>"+corT+"</b>.";
  return mcq(prompt,
    {t:corT, fb:"Yes: lining up the decimal points and working column by column gives this value."},
    ds, sol, {mode:c.add?"add":"sub", A:A, B:B});
}, ["Line up the decimal points before adding or subtracting.", "Start by rewriting the numbers with the decimal points in one column."]);

E("u3-frontend-sum", 3, ["6.1","6.4"], 2, "gen", function(){
  var A=ri(2,9)+ri(1,9)/10;
  var B=ri(1,9)/10+ri(1,99)/100;
  var C=ri(120,480)+ri(1,999)/1000;
  var isSum=ri(0,1)===0;
  var val=isSum?A+B+C:C-A;
  var milli=Math.round(val*1000), digits=String(milli);
  var decPos=digits.length-3;
  function place(pos){
    if(pos<=0)return "0."+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+"."+digits.slice(pos);
  }
  var posns=[decPos,decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; var ds=[];
  var corStr=place(decPos); seen[corStr]=1;
  for(var i=1;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"Front-end estimation puts the value near "+fmt(Math.round(val))+", so that decimal placement is the wrong size."});
  }
  ds=precPair(corStr,ds);
  var expr=isSum?(fmt(A,1)+" + "+fmt(B,2)+" + "+fmt(C,3)):(fmt(C,3)+" - "+fmt(A,1));
  var fe=isSum?("the front ends are about "+Math.floor(A)+" + 0 + "+Math.floor(C)):("the front ends are about "+Math.floor(C)+" - "+Math.floor(A));
  return mcq("The digits of the answer to "+expr+" are "+digits+". Using front-end estimation, where does the decimal point belong?",
    {t:corStr, fb:"Yes: "+fe+", which matches this placement."},
    ds,
    "Front-end estimation: "+fe+", so the answer is in the "+(val>=100?"hundreds":val>=10?"tens":"ones")+" range. Placing the decimal point to give "+corStr+" matches. The answer is <b>"+corStr+"</b>.",
    {mode:isSum?"sum":"diff"});
}, ["Front-end estimation uses the leading digits to judge the size of the answer.", "Start by adding or subtracting just the whole-number front ends."]);

E("u3-mult-decimals", 3, ["6.7"], 1, "gen", function(){
  var mode=ri(0,1), ans, prompt, work;
  if(mode===0){
    var p=ri(125,1999)/100, q=ri(12,48);
    ans=p*q;
    prompt="Fabric costs $"+fmtF(p,2)+" per metre. How much do "+q+" metres cost?";
    work="\\[ \\begin{aligned} "+fmtF(p,2)+" \\times "+q+" &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else {
    var a=ri(115,999)/100, b=ri(12,35)/10;
    ans=a*b;
    prompt="A garden bed is "+fmt(a,2)+" m long and "+fmt(b,1)+" m wide. What is its area, in square metres?";
    work="\\[ \\begin{aligned} "+fmt(a,2)+" \\times "+fmt(b,1)+" &= "+fmt(ans,3)+" \\end{aligned} \\]";
  }
  var pool=[ans*10,ans/10,ans+a||ans+1,ans+(mode===0?p:a),ans- (mode===0?p:a)];
  var seen={}; seen[fmt(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(mode===0?"$":"")+k, fb:"Check the decimal placement: count the total decimal places in the factors, or estimate the size first."});
  }
  var corT=(mode===0?"$":"")+fmt(ans,3);
  ds.forEach(function(o){if(mode===0&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: the multiplication and decimal placement are both right."},
    ds,
    work+" Multiply as with whole numbers, then place the decimal point using the total number of decimal places in the factors. The answer is <b>"+corT+"</b>.",
    {mode:mode});
}, ["Multiply as if the numbers were whole, then place the decimal point.", "Start by estimating the size of the product so a misplaced decimal stands out."]);

E("u3-frontend-prod-quot", 3, ["6.2","6.3"], 2, "gen", function(){
  var isProd=ri(0,1)===0;
  var digits, decPos, prompt, feText, val;
  if(isProd){
    var P=ri(205,1999)/100, M=ri(21,49)/10;
    val=P*M;
    var milli=Math.round(val*1000); digits=String(milli); decPos=digits.length-3;
    prompt="The digits of the product $"+fmtF(P,2)+" x "+fmt(M,1)+" are "+digits+". Using front-end estimation, where does the decimal point belong in the product?";
    feText="the front ends give about $"+Math.floor(P)+" x "+Math.floor(M)+" = $"+(Math.floor(P)*Math.floor(M));
  } else {
    var q=ri(15,35)+ri(1,9)/10, dv=ri(21,49)/10, dvd=q*dv;
    val=q;
    digits=String(Math.round(q*10)); decPos=digits.length-1;
    prompt="The digits of the quotient "+fmt(dvd,2)+" / "+fmt(dv,1)+" are "+digits+". Using front-end estimation, where does the decimal point belong in the quotient?";
    feText="the front ends give about "+fmt(Math.round(dvd))+" / "+Math.floor(dv)+", roughly "+fmt(Math.round(dvd)/Math.floor(dv),0);
  }
  function place(pos){
    if(pos<=0)return "0."+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+"."+digits.slice(pos);
  }
  var corStr=place(decPos);
  var posns=[decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; seen[corStr]=1; var ds=[];
  for(var i=0;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"Front-end estimation gives a different size: "+feText+"."});
  }
  ds=precPair(corStr,ds);
  return mcq(prompt,
    {t:corStr, fb:"Yes: "+feText+", which matches this placement."},
    ds,
    "Front-end estimation: "+feText+", so the answer must be that size. Only "+corStr+" fits. The answer is <b>"+corStr+"</b>.",
    {mode:isProd?"prod":"quot"});
}, ["Front-end estimation uses the leading digits to judge the size of the answer.", "Start by multiplying or dividing just the front-end whole numbers."]);

E("u3-div-decimals", 3, ["6.8"], 1, "gen", function(){
  var ctxs=[
    {s:"A rope %D m long is cut into %V equal pieces. How long is each piece, in metres?"},
    {s:"A group pays $%D for a van rental, split equally among %V friends. How much does each friend pay?"},
    {s:"A jug holds %D L of juice, poured equally into %V bottles. How many litres are in each bottle?"}
  ];
  var useDecDiv=ri(0,1)===0;
  var dv=useDecDiv?ri(3,9)/10:ri(3,9);
  var q=ri(125,2400)/100;
  var dvd=q*dv;
  var c=pick(ctxs);
  var prompt=c.s.replace("%D",fmt(dvd,3)).replace("%V",fmt(dv,1));
  var money=c.s.indexOf("$")>=0;
  var pool=[q*10,q/10,q+dv,q- dv];
  var seen={}; seen[fmt(q,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(money?"$":"")+k, fb:"Check by multiplying your answer by the divisor: it should return the starting amount."});
  }
  var corT=(money?"$":"")+fmt(q,3);
  ds.forEach(function(o){if(money&&o.t.indexOf("$")!==0)o.t="$"+o.t;});
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Yes: "+fmt(q,3)+" times "+fmt(dv,1)+" gives back "+fmt(dvd,3)+"."},
    ds,
    "\\[ \\begin{aligned} "+fmt(dvd,3)+" \\div "+fmt(dv,1)+" &= "+fmt(q,3)+" \\end{aligned} \\] Check: \\("+fmt(q,3)+" \\times "+fmt(dv,1)+" = "+fmt(dvd,3)+"\\). The answer is <b>"+corT+"</b>.",
    {dv:dv, q:q});
}, ["Division undoes multiplication: answer times divisor should give the starting amount.", "Start by estimating: how many groups of the divisor fit into the starting amount?"]);

E("u3-tech-multdiv", 3, ["6.9"], 3, "gen", function(){
  if(ri(0,1)===0){
    var n=ri(105,390), p=ri(125,975)/100, total=n*p;
    var pool=[total-p,total+10,total/10,total+p*2];
    var seen={}; seen[fmtF(total,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:"$"+k, fb:"Multiply the price by the full count of items: check each digit of the three-digit multiplier was used."});
    }
    return mcq("A school orders "+n+" workbooks at $"+fmtF(p,2)+" each. Using technology for the three-digit multiplication, what is the total cost?",
      {t:"$"+fmtF(total,2), fb:"Yes: "+n+" x $"+fmtF(p,2)+" = $"+fmtF(total,2)+"."},
      ds,
      "\\[ \\begin{aligned} "+n+" \\times "+fmtF(p,2)+" &= "+fmtF(total,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(total,2)+"</b>.",
      {mode:"mult", n:n, p:p});
  }
  var T=ri(40000,90000)/100, nv=ri(3,9);
  var each=Math.round(T/nv*100)/100;
  var pool2=[each+0.37,each-0.37,each+1.5,each*2];
  var seen2={}; seen2[fmtF(each,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    if(!(pool2[j]>0))continue;
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:"$"+k2, fb:"Divide the total by "+nv+" and round to the nearest cent: check that "+nv+" shares rebuild the total."});
  }
  return mcq("A prize of $"+fmtF(T,2)+" is shared equally among "+nv+" students. Using technology, how much does each student get, to the nearest cent?",
    {t:"$"+fmtF(each,2), fb:"Yes: $"+fmtF(T,2)+" divided by "+nv+" rounds to $"+fmtF(each,2)+"."},
    ds2,
    "\\[ \\begin{aligned} "+fmtF(T,2)+" \\div "+nv+" &= "+fmt(T/nv,4)+" \\approx "+fmtF(each,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(each,2)+"</b>.",
    {mode:"div", T:T, n:nv});
}, ["Break the calculation into a setup (what operation, which numbers) before using technology for the arithmetic.", "Start by writing the multiplication or division the problem describes."]);

E("u3-order-ops-dec", 3, ["6.10"], 3, "gen", function(){
  var tpl=ri(0,2), ans, wrong, prompt, work;
  if(tpl===0){
    var a=ri(12,89)/10, b=ri(11,49)/10, c=ri(2,9);
    ans=a+b*c; wrong=(a+b)*c;
    prompt="Evaluate: "+fmt(a,1)+" + "+fmt(b,1)+" x "+c;
    work="\\[ \\begin{aligned} "+fmt(a,1)+" + "+fmt(b,1)+" \\times "+c+" &= "+fmt(a,1)+" + "+fmt(b*c,1)+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else if(tpl===1){
    var a2=ri(12,59)/10, b2=ri(11,39)/10, c2=ri(2,9);
    ans=(a2+b2)*c2; wrong=a2+b2*c2;
    prompt="Evaluate: ("+fmt(a2,1)+" + "+fmt(b2,1)+") x "+c2;
    work="\\[ \\begin{aligned} ("+fmt(a2,1)+" + "+fmt(b2,1)+") \\times "+c2+" &= "+fmt(a2+b2,1)+" \\times "+c2+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  } else {
    var d=pick([2,4,5,8]), cq=ri(12,96)/10, c3=cq*d, a3=ri(21,59)/10, b3=ri(2,9);
    ans=a3*b3-cq; wrong=(a3*b3-c3)/d;
    prompt="Evaluate: "+fmt(a3,1)+" x "+b3+" - "+fmt(c3,1)+" / "+d;
    work="\\[ \\begin{aligned} "+fmt(a3,1)+" \\times "+b3+" - "+fmt(c3,1)+" \\div "+d+" &= "+fmt(a3*b3,1)+" - "+fmt(cq,1)+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\]";
  }
  var pool=[wrong,ans+1,ans-1,ans+0.5];
  var seen={}; seen[fmt(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That works strictly left to right: brackets first, then multiply and divide, then add and subtract.":"That value comes from an arithmetic slip: redo each operation in order."});
  }
  ds=precPair(fmt(ans,3),ds);
  return mcq(prompt,
    {t:fmt(ans,3), fb:"Yes: brackets first, then multiplication and division, then addition and subtraction."},
    ds,
    work+" The answer is <b>"+fmt(ans,3)+"</b>.",
    {tpl:tpl});
}, ["Follow the order of operations: brackets, then multiply and divide, then add and subtract.", "Start by finding any brackets and doing that part first."]);

E("u3-percent-of", 3, ["6.11","3.7"], 1, "gen", function(){
  if(ri(0,1)===0){
    var Ns=[40,50,60,80,90,120,150,200,240,250,300,400];
    var N=pick(Ns), p=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
    var ans=N*p/100;
    var ctxs=["What is "+p+"% of "+N+"?","A school has "+N+" students and "+p+"% of them take the bus. How many students take the bus?","A test is out of "+N+" marks. A student scores "+p+"%. How many marks is that?","Of "+N+" beads, "+p+"% are red. How many beads are red?"];
    var pool=[p,ans+N*0.05,ans-N*0.05,ans*2,100-p,ans+N*0.1,ans*3,ans/2,p+10];
    var seen={}; seen[fmt(ans,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      if(!(pool[i]>0))continue;
      var k=fmt(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:"Convert the percent to a decimal first ("+p+"% = "+fmt(p/100)+"), then multiply by "+N+"."});
    }
    ds=precPair(fmt(ans,2),ds);
    return mcq(pick(ctxs),
      {t:fmt(ans,2), fb:"Yes: "+p+"% = "+fmt(p/100)+", and "+fmt(p/100)+" of "+N+" is "+fmt(ans,2)+"."},
      ds,
      "\\[ \\begin{aligned} "+p+"\\% \\text{ of } "+N+" &= "+fmt(p/100)+" \\times "+N+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
      {mode:"of", N:N, p:p});
  }
  var Ns2=[40,50,60,80,100,120,150,200,240,300];
  var N2=pick(Ns2), k2=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
  var part=N2*k2/100;
  var pool3=[k2+10,k2-10,100-k2,k2+25,k2+5,k2-5,k2+15,k2-15];
  var seen3={}; seen3[k2+"%"]=1; var ds3=[];
  for(var j=0;j<pool3.length&&ds3.length<3;j++){
    if(pool3[j]<=0||pool3[j]>100)continue;
    var kk=pool3[j]+"%";
    if(seen3[kk])continue; seen3[kk]=1;
    ds3.push({t:kk, fb:"Write the part over the whole as a fraction, then convert to a percent."});
  }
  return mcq(fmt(part,1)+" out of "+N2+" students passed a quiz. What percent passed?",
    {t:k2+"%", fb:"Yes: "+fmt(part,1)+"/"+N2+" = "+fmt(k2/100)+", which is "+k2+"%."},
    ds3,
    "\\[ \\begin{aligned} "+FR(Math.round(part*10),N2*10)+" &= "+fmt(k2/100)+" \\\\ &= "+k2+"\\% \\end{aligned} \\] The answer is <b>"+k2+"%</b>.",
    {mode:"find", N:N2, k:k2});
}, ["Percent of a number: convert the percent to a decimal and multiply.", "Start by writing the percent as a decimal (divide by 100)."]);

E("u3-tax-total", 3, ["6.12"], 3, "gen", function(){
  var price=ri(450,9999)/100;
  var tax=Math.round(price*0.15*100)/100;
  var total=Math.round((price+tax)*100)/100;
  var alt1=Math.round(price*1.05*100)/100, alt2=tax, alt3=Math.round((price+tax+1)*100)/100;
  var pool=[alt1,alt2,alt3];
  var seen={}; seen[fmtF(total,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"$"+k, fb:i===1?"That is the tax alone: the total is price plus tax.":"That uses the wrong rate or an extra amount: HST in Newfoundland and Labrador is 15%."});
  }
  return mcq("A jacket costs $"+fmtF(price,2)+" before tax. With 15% HST added, what is the total cost, to the nearest cent?",
    {t:"$"+fmtF(total,2), fb:"Yes: tax is $"+fmtF(tax,2)+", and price plus tax gives this total."},
    ds,
    "\\[ \\begin{aligned} \\text{tax} &= 0.15 \\times "+fmtF(price,2)+" = "+fmtF(tax,2)+" \\\\ \\text{total} &= "+fmtF(price,2)+" + "+fmtF(tax,2)+" = "+fmtF(total,2)+" \\end{aligned} \\] Money is rounded to the nearest cent because cents are the smallest unit paid. The answer is <b>$"+fmtF(total,2)+"</b>.",
    {price:price});
}, ["Find the tax first (15% of the price), then add it to the price.", "Start by multiplying the price by 0.15 to get the tax."]);

E("u3-reasonableness", 3, ["6.4"], 1, "gen", function(){
  var mode=ri(0,2);
  if(mode===0){
    var a=ri(32,68), b=ri(3,9), cor=a*b, given=cor/10, est=Math.round(a/10)*10*b;
    return mcq("Kofi calculates "+a+" x "+b+" = "+fmt(given,1)+". Which check shows whether his answer is reasonable?",
      {t:"Estimate "+Math.round(a/10)*10+" x "+b+" = "+est+"; the answer should be near "+est+", so "+fmt(given,1)+" is too small", fb:"Yes: the estimate exposes a misplaced decimal point."},
      [{t:"The answer is reasonable because "+a+" x "+b+" has no decimal points in it", fb:"Whole-number factors can still give an answer of the wrong size: estimate to check."},
       {t:"Estimate "+Math.round(a/10)*10+" x "+b+" = "+est+"; since "+fmt(given,1)+" is a whole number it must be right", fb:"The estimate says the product should be near "+est+", far from the given value."},
       {t:"Add "+a+" + "+b+" = "+(a+b)+" to check the multiplication, using the same two numbers", fb:"Adding does not check a product: use a rounded multiplication estimate."}],
      "Estimate with rounded numbers: "+Math.round(a/10)*10+" x "+b+" = "+est+". The true product is "+cor+", so "+fmt(given,1)+" is far too small. The answer is <b>the estimate check</b>.",
      {mode:"mult"});
  }
  if(mode===1){
    var x=ri(210,480)+ri(1,99)/100, y=ri(110,290)+ri(1,99)/100, s=x+y, giv=Math.round(s)+100;
    var est2=Math.round(x)+Math.round(y);
    return mcq("Aisha calculates "+fmt(x,2)+" + "+fmt(y,2)+" = "+fmt(giv,2)+". Which check shows whether her answer is reasonable?",
      {t:"Estimate "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; the answer should be near "+est2+", so "+fmt(giv,2)+" is too large", fb:"Yes: rounding each addend exposes the error."},
      [{t:"The answer is reasonable because the cents digits add up correctly", fb:"Correct cents do not guarantee the whole-number part: estimate the full size."},
       {t:"Estimate "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; since the given answer ends in .00 it must be right", fb:"The estimate says the sum should be near "+est2+", far from the given value."},
       {t:"Multiply the two numbers to check the addition, with the same two numbers", fb:"Multiplication does not check an addition: use a rounded addition estimate."}],
      "Estimate with rounded numbers: "+Math.round(x)+" + "+Math.round(y)+" = "+est2+". The true sum is "+fmt(s,2)+", so "+fmt(giv,2)+" is too large. The answer is <b>the estimate check</b>.",
      {mode:"add"});
  }
  var T=ri(120,360), n=ri(4,8), per=T/n, giv2=per*10, est3=Math.round(T/10)*10/n;
  return mcq("Ravi calculates "+T+" / "+n+" = "+fmt(giv2,1)+". Which check shows whether his answer is reasonable?",
    {t:"Estimate "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+"; the answer should be near "+fmt(est3,1)+", so "+fmt(giv2,1)+" is too large", fb:"Yes: the estimate exposes a misplaced decimal point."},
    [{t:"The answer is reasonable because "+n+" is a small divisor for a division question", fb:"A small divisor does not guarantee the size: estimate to check."},
     {t:"Estimate "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+"; since "+fmt(giv2,1)+" beats a tenth of "+T+" it must be right", fb:"The estimate says the quotient should be near "+fmt(est3,1)+", far from the given value."},
     {t:"Subtract "+n+" from "+T+" to check the division, rather than estimating the quotient", fb:"Subtraction does not check a quotient: use a rounded division estimate."}],
    "Estimate with rounded numbers: "+Math.round(T/10)*10+" / "+n+" = "+fmt(est3,1)+". The true quotient is "+fmt(per,2)+", so "+fmt(giv2,1)+" is too large. The answer is <b>the estimate check</b>.",
    {mode:"div"});
}, ["A quick estimate with rounded numbers tells you the size the answer should be.", "Start by rounding each number to a friendly value and redoing the operation."]);

E("u3-cr-add-sub", 3, ["6.5","6.6"], 2, "gen", function(){
  var i1=ri(250,1899)/100, i2=ri(150,1299)/100, i3=ri(110,899)/100;
  var bills=[20,50], bill=pick(bills);
  var total=i1+i2+i3; if(total>=bill){bill=50;}
  if(total>=bill){i1=ri(250,999)/100; i2=ri(150,899)/100; i3=ri(110,699)/100; total=i1+i2+i3;}
  var change=Math.round((bill-total)*100)/100;
  return numq("Sam buys a game for $"+fmtF(i1,2)+", a snack for $"+fmtF(i2,2)+" and a drink for $"+fmtF(i3,2)+". He pays with a $"+bill+" bill. How much change does he get? Give your answer in dollars.",
    change, 0.01,
    "\\[ \\begin{aligned} \\text{total} &= "+fmtF(i1,2)+" + "+fmtF(i2,2)+" + "+fmtF(i3,2)+" = "+fmtF(total,2)+" \\\\ \\text{change} &= "+bill+".00 - "+fmtF(total,2)+" = "+fmtF(change,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(change,2)+"</b>.",
    {i1:i1, i2:i2, i3:i3, bill:bill});
}, ["Add the three costs first, then subtract from the amount paid.", "Start by finding the total cost of the three items."]);

E("u3-cr-mult", 3, ["6.7"], 1, "gen", function(){
  var p=ri(275,1575)/100, L=ri(24,96)/10;
  var total=Math.round(p*L*100)/100;
  return numq("Ribbon costs $"+fmtF(p,2)+" per metre. How much do "+fmt(L,1)+" metres cost? Give your answer in dollars.",
    total, 0.01,
    "\\[ \\begin{aligned} "+fmtF(p,2)+" \\times "+fmt(L,1)+" &= "+fmt(p*L,3)+" \\\\ &\\approx "+fmtF(total,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(total,2)+"</b>.",
    {p:p, L:L});
}, ["Multiply the price per metre by the number of metres.", "Start by multiplying as with whole numbers, then place the decimal point."]);

E("u3-cr-div", 3, ["6.8"], 1, "gen", function(){
  var n=pick([3,4,5,6,8]), q=ri(225,1875)/100, total=q*n;
  return numq("A taxi ride costs $"+fmtF(total,2)+" in total, split equally among "+n+" friends. How much does each friend pay? Give your answer in dollars.",
    q, 0.01,
    "\\[ \\begin{aligned} "+fmtF(total,2)+" \\div "+n+" &= "+fmtF(q,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(q,2)+"</b>.",
    {n:n, q:q});
}, ["Divide the total cost by the number of friends.", "Start by sharing the total into equal groups."]);

E("u3-cr-repeating-frac", 3, ["3.13"], 2, "gen", function(){
  var m=ri(11,98); while(m%10===0)m=ri(11,98);
  var s=u3simp(m,99);
  var simpStr=s[0]+"/"+s[1];
  return textq("Write 0."+m+""+m+"... as a fraction in lowest terms. Type your answer like 4/11.",
    [simpStr, m+"/99"],
    "A two-digit repeating block goes over 99: \\("+FR(m,99)+"\\) = \\("+FR(s[0],s[1])+"\\) in lowest terms. The answer is <b>"+simpStr+"</b>.",
    {m:m});
}, ["A two-digit repeating block sits over 99.", "Start by writing the repeating digits over 99, then simplify."]);

E("u3-cr-percent", 3, ["6.11","6.12"], 3, "gen", function(){
  var price=pick([60,80,100,120,140,160,180,200,240,280,320]);
  var off=pick([10,20,25,30,40,50]);
  var sale=price*(100-off)/100;
  var total=Math.round(sale*1.15*100)/100;
  return numq("A bike is priced at $"+price+". It is on sale for "+off+"% off, and 15% HST is added to the sale price. What is the final cost? Give your answer in dollars.",
    total, 0.01,
    "\\[ \\begin{aligned} \\text{sale price} &= "+price+" \\times "+fmt((100-off)/100)+" = "+fmtF(sale,2)+" \\\\ \\text{final cost} &= "+fmtF(sale,2)+" \\times 1.15 = "+fmtF(total,2)+" \\end{aligned} \\] The tax is rounded to the nearest cent because money is paid in cents. The answer is <b>$"+fmtF(total,2)+"</b>.",
    {price:price, off:off});
}, ["Take the discount off first, then add tax to the sale price.", "Start by finding the sale price after the percent off."]);

E("u3-cr-order-ops", 3, ["6.10"], 3, "gen", function(){
  var a=ri(15,45)/10, b=ri(12,38)/10, c=ri(2,6), e=ri(11,29)/10;
  var ans=Math.round((a*(b+c)-e)*100)/100;
  return numq("Evaluate: "+fmt(a,1)+" x ("+fmt(b,1)+" + "+c+") - "+fmt(e,1)+".",
    ans, 0.01,
    "\\[ \\begin{aligned} "+fmt(a,1)+" \\times ("+fmt(b,1)+" + "+c+") - "+fmt(e,1)+" &= "+fmt(a,1)+" \\times "+fmt(b+c,1)+" - "+fmt(e,1)+" \\\\ &= "+fmt(a*(b+c),2)+" - "+fmt(e,1)+" \\\\ &= "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {a:a, b:b, c:c, e:e});
}, ["Brackets first, then multiply, then subtract.", "Start by adding inside the brackets."]);

/* ----- bank-u4.js ----- */
// Figure additions: geometry entries assign q.figure from their own drawn values
// (circle, parallelogram, triangle, composite and grid figures). Data and graphing items stay figureless.
// Math 7 Unit 4 Circles and Area question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 1624 to 2250).
// CRMARKS: u4-cr-area-mix=3
// CRMARKS: u4-cr-circumference=3
// CRMARKS: u4-cr-graph-quantity=2
// CRMARKS: u4-cr-area-circle=3
// CRMARKS: u4-cr-composite=3
/* ===== Unit 4 ===== */
/* Math 7 Unit 4: Circles and Area. Helpers prefixed u4. PI is 3.14 throughout. */
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}
function u4circleFig(label, mode){
  var out='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle diagram">';
  out+='<circle cx="120" cy="88" r="66" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="120" cy="88" r="2.6" fill="'+FIG_INK+'"/>';
  if(mode==="r"){
    out+='<line x1="120" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(153,74,label,12.5,false);
  } else {
    out+='<line x1="54" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(120,74,label,12.5,false);
  }
  return out+'</svg>';
}
function u4pieFig(cats, angleLabels){
  var cx=92, cy=92, R=68;
  var fills=[FIG_SHADE,"#ffffff","#8fb8a0","#e6ddcb"];
  var out='<svg viewBox="0 0 330 190" width="330" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var start=0, letters=["A","B","C","D"];
  cats.forEach(function(c,i){
    var sweep=c.pct*3.6, end=start+sweep;
    var p1=u4pt(cx,cy,R,start), p2=u4pt(cx,cy,R,end);
    var large=sweep>180?1:0;
    out+='<path d="M '+cx+' '+cy+' L '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+' Z" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    var mid=u4pt(cx,cy,42,(start+end)/2);
    out+=_txt(mid[0],mid[1],angleLabels?String(c.ang)+"°":letters[i],13,true);
    start=end;
  });
  if(!angleLabels){
    cats.forEach(function(c,i){
      var y=42+i*34;
      out+='<rect x="196" y="'+(y-9)+'" width="12" height="12" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<text x="214" y="'+(y+1)+'" font-size="12.5" fill="'+FIG_INK+'">'+letters[i]+" = "+c.name+" "+c.pct+"%</text>";
    });
  }
  return out+'</svg>';
}
function u4graphData(){
  var topics=[
    {t:"favourite lunch", cats:["Pizza","Salad","Soup","Sandwich"]},
    {t:"favourite sport", cats:["Soccer","Hockey","Dance","Swimming"]},
    {t:"way of getting to school", cats:["Bus","Walk","Car","Bike"]},
    {t:"weekend activity", cats:["Gaming","Reading","Sports","Music"]}
  ];
  var tp=pick(topics), guard=0, ps=null;
  while(guard++<300){
    var a=ri(30,45), b=ri(20,32), c=ri(12,22), d=100-a-b-c;
    if(d<6||d>25)continue;
    var arr=[a,b,c,d], ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++)if(arr[i]===arr[j])ok=false;
    if(ok){ps=arr;break;}
  }
  if(!ps)ps=[40,28,20,12];
  var cats=tp.cats.map(function(name,i){return {name:name, pct:ps[i]};});
  return {topic:tp.t, cats:cats};
}

E("u4-radius-diameter", 4, ["9.11"], 1, "gen", function(){
  if(ri(0,1)===0){
    var r=ri(2,30), d=2*r;
    var candR=[r,3*r,d+2,4*r,r+1,d+10], seenR={}; seenR[d]=1; var dsR=[];
    for(var i=0;i<candR.length&&dsR.length<3;i++){
      if(seenR[candR[i]])continue; seenR[candR[i]]=1;
      dsR.push({t:String(candR[i]), fb:"The diameter is exactly twice the radius: multiply "+r+" by 2."});
    }
    var q=mcq("The circle in the diagram has radius "+r+" cm. What is its diameter, in centimetres?",
      {t:String(d), fb:"Yes: the diameter is twice the radius."},
      dsR,
      "The diameter passes through the centre and is made of two radii: \\(d = 2 \\times "+r+" = "+d+"\\) cm. The answer is <b>"+d+" cm</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d2=2*ri(3,40), r2=d2/2;
  var candD=[d2,d2-2,2*d2,r2+3,d2+4,r2-1], seenD={}; seenD[r2]=1; var dsD=[];
  for(var j=0;j<candD.length&&dsD.length<3;j++){
    if(candD[j]<=0||seenD[candD[j]])continue; seenD[candD[j]]=1;
    dsD.push({t:String(candD[j]), fb:"The radius is exactly half the diameter: divide "+d2+" by 2."});
  }
  var q2=mcq("The circle in the diagram has diameter "+d2+" cm. What is its radius, in centimetres?",
    {t:String(r2), fb:"Yes: the radius is half the diameter."},
    dsD,
    "The radius is half the diameter: \\(r = "+d2+" \\div 2 = "+r2+"\\) cm. The answer is <b>"+r2+" cm</b>.",
    {mode:"d", d:d2});
  q2.figure=u4circleFig("d = "+d2+" cm","d");
  return q2;
}, ["The diameter is two radii end to end.", "Start by picturing the radius from the centre to the edge, then double or halve."]);

E("u4-draw-circle", 4, ["9.12"], 1, "var", varset([
  function(){ var q=mcq("To draw a circle with radius 6 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"6", fb:"Yes: the compass opening is the radius."},
    [{t:"12", fb:"12 cm is the diameter: the compass opening matches the radius, not the diameter."},
     {t:"3", fb:"That is half the radius: set the opening equal to the radius."},
     {t:"36", fb:"That multiplies 6 by 6: the opening is just the radius length."}],
    "A compass draws a circle whose radius equals the opening between point and pencil. For radius 6 cm, open it <b>6 cm</b>.", {s:1}); q.figure=u4circleFig("r = 6 cm","r"); return q; },
  function(){ var q=mcq("To draw a circle with diameter 10 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"5", fb:"Yes: the opening is the radius, which is half of 10 cm."},
    [{t:"10", fb:"That is the diameter: the opening must be the radius, half of that."},
     {t:"20", fb:"That doubles the diameter: halve it to get the radius."},
     {t:"2", fb:"That divides by 5: the radius is half the diameter, 5 cm."}],
    "The compass opening is the radius. Radius = 10 / 2 = 5 cm, so open it <b>5 cm</b>.", {s:2}); q.figure=u4circleFig("d = 10 cm","d"); return q; },
  function(){ return mcq("Which method can draw a circle when no compass is available?",
    {t:"Trace around a round mug and mark its centre", fb:"Yes: a round object gives a true circle shape to trace."},
    [{t:"Draw the curve freehand and measure it afterwards", fb:"A freehand curve is not a reliable circle and the radius is uncontrolled."},
     {t:"Use a ruler to draw four straight sides", fb:"Straight sides make a quadrilateral, not a circle."},
     {t:"Roll a coin once along a ruler", fb:"Rolling draws a straight path, not a circle."}],
    "Tracing a round object gives a closed curve at a fixed distance from its centre, which is a circle. The answer is <b>trace around a round mug</b>.", {s:3}); },
  function(){ var q=mcq("A student draws a circle with a compass opened to 4 cm. What is the diameter of the circle drawn, in centimetres?",
    {t:"8", fb:"Yes: the opening is the radius 4 cm, so the diameter is double."},
    [{t:"4", fb:"That is the radius (the compass opening): double it for the diameter."},
     {t:"2", fb:"That halves the radius: the diameter is twice the radius."},
     {t:"16", fb:"That squares the radius: the diameter is two radii, 8 cm."}],
    "The compass opening is the radius, 4 cm. Diameter = 2 x 4 = <b>8 cm</b>.", {s:4}); q.figure=u4circleFig("r = 4 cm","r"); return q; },
  function(){ var q=mcq("To draw a circle with diameter 14 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"7", fb:"Yes: the opening is the radius, half of 14 cm."},
    [{t:"14.0", fb:"That is the diameter: the opening must be the radius, half of that."},
     {t:"28", fb:"That doubles the diameter: halve it to get the radius."},
     {t:"3.5", fb:"That is a quarter of the diameter: the radius is half, 7 cm."}],
    "The compass opening is the radius. Radius = 14 / 2 = 7 cm, so open it <b>7 cm</b>.", {s:5}); q.figure=u4circleFig("d = 14 cm","d"); return q; }
]), ["The compass opening is always the radius of the circle it draws.", "Start by finding the radius of the circle you want."]);

E("u4-circ-approx", 4, ["9.7"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,45), c=3*d;
    var candA=[2*d,6*d,4*d,d+3], seenA={}; seenA[c]=1; var dsA=[];
    for(var i=0;i<candA.length&&dsA.length<3;i++){
      if(seenA[candA[i]])continue; seenA[candA[i]]=1;
      dsA.push({t:"about "+candA[i]+" cm", fb:"The circumference is about three times the diameter: multiply "+d+" by 3."});
    }
    var q=mcq("A circle has diameter "+d+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
      {t:"about "+c+" cm", fb:"Yes: 3 x "+d+" = "+c+"."},
      dsA,
      "Circumference is approximately \\(3 \\times d = 3 \\times "+d+" = "+c+"\\) cm. The answer is <b>about "+c+" cm</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=ri(2,30), c2=6*r;
  var q=mcq("A circle has radius "+r+" cm, so its diameter is "+(2*r)+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
    {t:"about "+c2+" cm", fb:"Yes: 3 x "+(2*r)+" = "+c2+"."},
    [{t:"about "+(3*r)+" cm", fb:"That is three times the radius: the rule uses the diameter, which is "+(2*r)+" cm."},
     {t:"about "+(2*r)+" cm", fb:"That is the diameter itself: multiply it by about 3."},
     {t:"about "+(12*r)+" cm", fb:"That is twelve times the radius: three times the diameter is six times the radius."}],
    "Diameter = \\(2 \\times "+r+" = "+(2*r)+"\\) cm, and circumference is approximately \\(3 \\times "+(2*r)+" = "+c2+"\\) cm. The answer is <b>about "+c2+" cm</b>.",
    {mode:"r", r:r}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["The circumference wraps around the diameter about three times.", "Start by finding the diameter, then multiply by about 3."]);

E("u4-pi-ratio", 4, ["9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,60), C=3.14*d;
    var q=mcq("A circle has circumference "+fmt(C,2)+" cm and diameter "+d+" cm. What is the value of circumference divided by diameter for this circle?",
      {t:"3.14", fb:"Yes: for every circle, C/d is the constant pi, about 3.14."},
      [{t:"0.32", fb:"That is roughly d/C, the division the other way around."},
       {t:"31.40", fb:"That is ten times too large: pi is a little more than 3."},
       {t:fmtF(C-d,2), fb:"That subtracts instead of dividing: pi is a ratio, C divided by d."}],
      "\\[ \\begin{aligned} \\pi &= "+FR("C","d")+" = "+fmt(C,2)+" \\div "+d+" \\\\ &= 3.14 \\end{aligned} \\] The answer is <b>3.14</b>.",
      {mode:"ratio", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var pair=pick([[5,15.6],[5,15.8],[10,31.2],[10,31.6],[20,62.5],[20,63.1],[25,78.2],[25,78.8],[40,125.2],[40,125.9],[50,156.6],[50,157.4]]);
  var dd=pair[0], wrapped=pair[1];
  var est=Math.round(wrapped/dd*100)/100;
  var pool=[est+0.5,est-0.14,est+1,3.9];
  var seen={}; seen[fmt(est,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:"Divide the wrapped length (the circumference) by the diameter and compare with 3.14."});
  }
  var q=mcq("String wrapped around a round can measures "+wrapped+" cm. The can's diameter is "+dd+" cm. Which value best estimates pi from this measurement?",
    {t:fmt(est,2), fb:"Yes: "+wrapped+" / "+dd+" is about "+fmt(est,2)+", close to 3.14."},
    ds,
    "\\[ \\begin{aligned} \\pi &\\approx "+wrapped+" \\div "+dd+" \\\\ &\\approx "+fmt(est,2)+" \\end{aligned} \\] Measurement error explains the small gap from 3.14. The answer is <b>"+fmt(est,2)+"</b>.",
    {mode:"measure", dd:dd}); q.figure=u4circleFig("d = "+dd+" cm","d"); return q;
}, ["Pi is the ratio of circumference to diameter, the same for every circle.", "Start by dividing the circumference by the diameter."]);

E("u4-circumference", 4, ["9.10","9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,40), C=3.14*d;
    var pool=[3.14*(d/2),3*d,3.14*(d/2)*(d/2),C+3.14];
    var seen={}; seen[fmtF(C,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===2?"That uses the area formula with the radius: circumference is pi times diameter.":"Check the formula: C = pi x d with pi = 3.14."});
    }
    var q=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
      {t:fmtF(C,2), fb:"Yes: C = 3.14 x "+d+" = "+fmtF(C,2)+" cm."},
      ds,
      "\\[ \\begin{aligned} C &= \\pi d \\\\ &= 3.14 \\times "+d+" \\\\ &= "+fmtF(C,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C,2)+" cm</b>.",
      {mode:"d", d:d});
    q.figure=u4circleFig("d = "+d+" cm","d");
    return q;
  }
  var r=ri(2,25), C2=2*3.14*r;
  var pool2=[3.14*r,3.14*r*r,3*r*2,2*3.14*(r+1)];
  var seen2={}; seen2[fmtF(C2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"That uses the area formula: circumference is 2 x pi x r.":"Check the formula: C = 2 x pi x r with pi = 3.14."});
  }
  var q2=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
    {t:fmtF(C2,2), fb:"Yes: C = 2 x 3.14 x "+r+" = "+fmtF(C2,2)+" cm."},
    ds2,
    "\\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2 \\times 3.14 \\times "+r+" \\\\ &= "+fmtF(C2,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C2,2)+" cm</b>.",
    {mode:"r", r:r});
  q2.figure=u4circleFig("r = "+r+" cm","r");
  return q2;
}, ["Circumference is pi times the diameter, or two times pi times the radius.", "Start by deciding whether the diagram gives you the radius or the diameter."]);

E("u4-para-from-rect", 4, ["9.1"], 1, "var", varset([
  function(){ var q=mcq("A parallelogram is cut along a dashed height line and the triangle piece is moved to the other end, forming a rectangle with the same base and height. The area of the parallelogram equals the area of that rectangle, which is found by:",
    {t:"base x height", fb:"Yes: the rearranged rectangle has area base x height, and moving a piece does not change area."},
    [{t:"base x slanted side", fb:"The slanted side is not a side of the rearranged rectangle: its sides are the base and the height."},
     {t:"(base x height) / 2", fb:"Halving is for a triangle: the whole parallelogram becomes the whole rectangle."},
     {t:"base + height", fb:"Adding gives a length, not an area: areas of rectangles multiply length by width."}],
    "Cutting and moving a piece keeps the same total area, and the new shape is a rectangle with sides equal to the base and height. Its area is <b>base x height</b>.", {s:1}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 8 cm and height 5 cm is rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"40 cm²", fb:"Yes: the rectangle is 8 cm by 5 cm, so the area is 40 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"20 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 8 cm by 5 cm: \\(A = 8 \\times 5 = 40\\) cm². The answer is <b>40 cm²</b>.", {s:2}); q.figure=figParaRect("base = 8 cm","h = 5 cm"); return q; },
  function(){ var q=mcq("Why does cutting a parallelogram and rearranging the pieces into a rectangle not change the area?",
    {t:"No area is added or removed; the same pieces make the new shape", fb:"Yes: rearranging pieces keeps the total area the same."},
    [{t:"A rectangle always has the same area as any parallelogram with any base", fb:"Only the rectangle built from the same pieces, with the same base and height, matches."},
     {t:"The cut makes the shape smaller but the move makes it bigger in the end", fb:"Nothing is gained or lost: the pieces are identical in total."},
     {t:"The perimeter stays the same, so the area does too, every time", fb:"The perimeter can change when pieces move: it is the pieces themselves that preserve area."}],
    "The new shape is built from exactly the same pieces, so its area equals the parallelogram's area. The answer is <b>no area is added or removed</b>.", {s:3}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 11 cm and height 6 cm is rearranged into a rectangle. What are the side lengths of that rectangle?",
    {t:"11 cm and 6 cm", fb:"Yes: the rectangle takes the parallelogram's base and height as its sides."},
    [{t:"11 cm and 11 cm", fb:"That would be a square: the second side is the height, 6 cm."},
     {t:"6 cm and 6 cm", fb:"Both sides are not the height: one side is the base, 11 cm."},
     {t:"17 cm and 6 cm", fb:"17 cm adds base and height: the rectangle's sides are the base and height themselves."}],
    "The rearranged rectangle has the parallelogram's base as one side and its height as the other: <b>11 cm and 6 cm</b>.", {s:4}); q.figure=figParaRect("base = 11 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("A parallelogram with base 9 cm and height 4 cm is cut and rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"36 cm²", fb:"Yes: the rectangle is 9 cm by 4 cm, so the area is 36 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"18 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 9 cm by 4 cm: \\(A = 9 \\times 4 = 36\\) cm². The answer is <b>36 cm²</b>.", {s:5}); q.figure=figParaRect("base = 9 cm","h = 4 cm"); return q; }
]), ["Picture the parallelogram cut and slid into a rectangle shape.", "Start by asking what the sides of the rearranged rectangle are."]);

E("u4-area-parallelogram", 4, ["9.2","9.3"], 2, "gen", function(){
  var b=ri(6,15), h=ri(4,10), s=h+ri(1,4);
  var A=b*h;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with base, height and slanted side labelled">'
    +'<polygon points="55,140 215,140 245,60 85,60" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="110" y1="60" x2="110" y2="140" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(135,158,"base = "+b+" cm",12.5,false)
    +_txt(96,102,"h = "+h+" cm",12,false)
    +_txt(238,88,""+s+" cm",12,false)
    +'</svg>';
  var pool=[b*s,A/2,b+h,b*s/2];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That multiplies by the slanted side: area uses the perpendicular height.":"Check the formula: area of a parallelogram is base times height."});
  }
  var q=mcq("What is the area of the parallelogram in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = base x height = "+b+" x "+h+" = "+A+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= b \\times h \\\\ &= "+b+" \\times "+h+" \\\\ &= "+A+" \\text{ cm}^2 \\end{aligned} \\] The slanted side length is not used. The answer is <b>"+A+" cm²</b>.",
    {b:b, h:h, s:s});
  q.figure=fig;
  return q;
}, ["Area of a parallelogram is base times the perpendicular height.", "Start by finding the height: the dashed line at right angles to the base."]);

E("u4-triangle-from", 4, ["9.4"], 1, "var", varset([
  function(){ var q=mcq("Two identical triangles are put together to form a parallelogram with base 10 cm and height 6 cm. The parallelogram has area 60 cm². What is the area of one triangle?",
    {t:"30 cm²", fb:"Yes: each triangle is half of the parallelogram."},
    [{t:"60 cm²", fb:"That is the whole parallelogram: one triangle is half of it."},
     {t:"120 cm²", fb:"That doubles the parallelogram: the triangle is smaller than the whole."},
     {t:"16 cm²", fb:"That adds base and height: use half of the parallelogram's area."}],
    "The two identical triangles make the whole parallelogram, so one triangle has area 60 / 2 = <b>30 cm²</b>.", {s:1}); q.figure=figTriHalf("para","base = 10 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("A rectangle is cut along a diagonal into two identical triangles. The rectangle is 12 cm long and 7 cm wide. What is the area of one triangle?",
    {t:"42 cm²", fb:"Yes: the rectangle's area is 84 cm², and each triangle is half."},
    [{t:"84 cm²", fb:"That is the whole rectangle: one triangle is half of it."},
     {t:"38 cm²", fb:"That is the perimeter of the rectangle: find its area first, then halve."},
     {t:"19 cm²", fb:"That adds length and width: area multiplies them, then halve."}],
    "\\[ \\begin{aligned} \\text{rectangle area} &= 12 \\times 7 = 84 \\text{ cm}^2 \\\\ \\text{triangle area} &= 84 \\div 2 = 42 \\text{ cm}^2 \\end{aligned} \\] The answer is <b>42 cm²</b>.", {s:2}); q.figure=figTriHalf("rect","12 cm","7 cm"); return q; },
  function(){ var q=mcq("A triangle and a parallelogram have the same base and the same height. The parallelogram has area 48 cm². What is the area of the triangle?",
    {t:"24 cm²", fb:"Yes: with the same base and height, the triangle is half the parallelogram."},
    [{t:"48 cm²", fb:"That matches the parallelogram: the triangle takes only half of it."},
     {t:"96 cm²", fb:"That doubles the parallelogram: the triangle is smaller."},
     {t:"12 cm²", fb:"That is a quarter: two identical triangles fill the parallelogram, so it is a half."}],
    "Two copies of the triangle fill the parallelogram exactly, so the triangle's area is 48 / 2 = <b>24 cm²</b>.", {s:3}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("Why is the area of a triangle half the area of a parallelogram with the same base and height?",
    {t:"Two identical copies of the triangle fit together to make that parallelogram", fb:"Yes: the triangle is exactly one of the two equal pieces."},
    [{t:"Triangles always have half the area of every parallelogram", fb:"The match needs the same base and height, not just any parallelogram."},
     {t:"The triangle has three sides and the parallelogram has four", fb:"Side count is not the reason: it is the two copies filling the parallelogram."},
     {t:"The height of a triangle is half the height of a parallelogram built on the same base", fb:"They share the same height here: it is the area that halves."}],
    "Putting two identical triangles together builds the parallelogram, so one triangle is half its area. The answer is <b>two copies of the triangle make the parallelogram</b>.", {s:4}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 14 cm and height 5 cm is split into two identical triangles by a diagonal. What is the area of one triangle?",
    {t:"35 cm²", fb:"Yes: the parallelogram's area is 70 cm², and each triangle is half."},
    [{t:"70 cm²", fb:"That is the whole parallelogram: one triangle is half of it."},
     {t:"38 cm²", fb:"That is the perimeter of the parallelogram: find its area first, then halve."},
     {t:"19 cm²", fb:"That adds base and height: area multiplies them, then halve."}],
    "\\[ \\begin{aligned} \\text{parallelogram area} &= 14 \\times 5 = 70 \\text{ cm}^2 \\\\ \\text{triangle area} &= 70 \\div 2 = 35 \\text{ cm}^2 \\end{aligned} \\] The answer is <b>35 cm²</b>.", {s:5}); q.figure=figTriHalf("para","base = 14 cm","h = 5 cm"); return q; }
]), ["Think of the triangle as one of two identical pieces of a parallelogram or rectangle.", "Start by finding the area of the whole parallelogram or rectangle, then halve it."]);

E("u4-area-triangle", 4, ["9.5","9.3"], 1, "gen", function(){
  var b=ri(6,16), h=ri(4,12), A=b*h/2;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with base and height labelled">'
    +'<polygon points="55,145 245,145 120,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="120" y1="50" x2="120" y2="145" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(150,163,"base = "+b+" cm",12.5,false)
    +_txt(104,100,"h = "+h+" cm",12,false)
    +'</svg>';
  var pool=[b*h,b+h,A+b,A*3];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That is the area of the full parallelogram: a triangle is half of it.":"Check the formula: area of a triangle is base times height divided by 2."});
  }
  var q=mcq("What is the area of the triangle in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = (base x height) / 2 = ("+b+" x "+h+") / 2 = "+fmt(A)+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= "+FR("b \\times h","2")+" \\\\ &= "+FR(b+" \\times "+h,"2")+" \\\\ &= "+fmt(A)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(A)+" cm²</b>.",
    {b:b, h:h});
  q.figure=fig;
  return q;
}, ["Area of a triangle is base times height, divided by 2.", "Start by multiplying base by height, then halve the result."]);

E("u4-estimate-circle-area", 4, ["9.6"], 1, "gen", function(){
  var F=ri(28,58), P=2*ri(4,13), est=F+P/2;
  var pool=[F+P,F,F-P/2,est+10];
  var seen={}; seen[String(est)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=String(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"about "+k+" cm²", fb:i===0?"That counts every partly covered square as full: count each partly covered square as about a half.":"Use the counting rule: full squares plus half of the partly covered squares."});
  }
  return mcq("A circle is drawn on centimetre grid paper. Counting squares to estimate its area: "+F+" squares are fully inside the circle and "+P+" squares are partly covered. Counting each partly covered square as about half a square, what is the estimated area?",
    {t:"about "+est+" cm²", fb:"Yes: "+F+" + "+P+"/2 = "+est+"."},
    ds,
    "\\[ \\begin{aligned} \\text{estimate} &= "+F+" + "+FR(P,"2")+" \\\\ &= "+F+" + "+(P/2)+" \\\\ &= "+est+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>about "+est+" cm²</b>.",
    {F:F, P:P});
}, ["Count full squares, then add about half for each partly covered square.", "Start by adding half of the partly covered count to the full count."]);

E("u4-area-circle", 4, ["9.9","9.3"], 2, "gen", function(){
  var modeA=ri(0,2);
  if(modeA===2){
    var rs=ri(2,20), As=3.14*rs*rs/2;
    var poolS=[3.14*rs*rs,2*3.14*rs,3.14*rs,As*4,As/2,As*3];
    var seenS={}; seenS[fmtF(As,2)]=1; var dsS=[];
    for(var s2=0;s2<poolS.length&&dsS.length<3;s2++){
      var kk=fmtF(poolS[s2],2);
      if(seenS[kk])continue; seenS[kk]=1;
      dsS.push({t:kk+" cm²", fb:s2===0?"That is the area of the full circle: a semicircle is half of it.":"Check the steps: find the full circle area with pi x r², then halve it."});
    }
    var qS=mcq("The diagram shows a semicircle (half of a circle) with radius "+rs+" cm. What is its area? Use 3.14 for pi.",
      {t:fmtF(As,2)+" cm²", fb:"Yes: half of 3.14 x "+rs+"² is "+fmtF(As,2)+" cm²."},
      dsS,
      "\\[ \\begin{aligned} A &= "+FR("3.14 \\times "+rs+"^2","2")+" \\\\ &= "+fmtF(As,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(As,2)+" cm²</b>.",
      {mode:"semi", r:rs});
    qS.figure=u4circleFig("r = "+rs+" cm","r");
    return qS;
  }
  if(modeA===0){
    var r=ri(3,20), A=3.14*r*r;
    var pool=[2*3.14*r,3.14*r,3.14*2*r*r,A+3.14*r];
    var seen={}; seen[fmtF(A,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k+" cm²", fb:i===0?"That is the circumference: area uses pi times the radius squared.":"Check the formula: A = pi x r² with pi = 3.14."});
    }
    var q=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
      {t:fmtF(A,2)+" cm²", fb:"Yes: A = 3.14 x "+r+"² = "+fmtF(A,2)+" cm²."},
      ds,
      "\\[ \\begin{aligned} A &= \\pi r^2 \\\\ &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" cm²</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d=2*ri(3,20), r2=d/2, A2=3.14*r2*r2;
  var pool2=[2*3.14*r2,3.14*d*d,A2*2,3.14*r2];
  var seen2={}; seen2[fmtF(A2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2+" cm²", fb:j===1?"That squares the diameter: halve the diameter to get the radius first.":"Check the steps: halve the diameter for the radius, then A = pi x r²."});
  }
  var q2=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
    {t:fmtF(A2,2)+" cm²", fb:"Yes: radius is "+r2+" cm, and A = 3.14 x "+r2+"² = "+fmtF(A2,2)+" cm²."},
    ds2,
    "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r2+" \\\\ A &= \\pi r^2 = 3.14 \\times "+r2+"^2 \\\\ &= "+fmtF(A2,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A2,2)+" cm²</b>.",
    {mode:"d", d:d});
  q2.figure=u4circleFig("d = "+d+" cm","d");
  return q2;
}, ["Area of a circle is pi times the radius squared.", "Start by making sure you have the radius; halve the diameter if that is what is given."]);

E("u4-central-angles", 4, ["9.13","11.2"], 1, "gen", function(){
  var guard=0, a=0,b=0,c=0,m=0;
  while(guard++<300){
    a=ri(6,14)*10; b=ri(4,10)*10; c=ri(3,8)*10; m=360-a-b-c;
    if(m>=30&&m%10===0)break;
  }
  if(m<30){a=120;b=90;c=60;m=90;}
  var cats=[{pct:a/3.6,ang:a},{pct:b/3.6,ang:b},{pct:c/3.6,ang:c},{pct:m/3.6,ang:m}];
  var figCats=cats.map(function(x,i){return {pct:x.pct, ang:i===3?"?":x.ang};});
  var pool=[a+b+c,m+20,m-20,m+30,m-30,90,180];
  var seen={}; seen[m+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=pool[i]+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That is the sum of the three marked angles: the missing one is what is left of 360°.":"The four central angles of a circle add to 360°: subtract the three marked angles from 360°."});
  }
  var q=mcq("The circle in the diagram is divided into four sectors. Three central angles are marked, and one sector is marked with ?. What is the missing central angle?",
    {t:m+"°", fb:"Yes: 360° minus the three marked angles leaves "+m+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{missing} &= 360° - ("+a+"° + "+b+"° + "+c+"°) \\\\ &= 360° - "+(a+b+c)+"° \\\\ &= "+m+"° \\end{aligned} \\] The central angles of a circle always add to 360°. The answer is <b>"+m+"°</b>.",
    {a:a, b:b, c:c});
  q.figure=u4pieFig(figCats,true);
  return q;
}, ["The central angles around the centre of a circle add to 360 degrees.", "Start by adding the three marked angles, then subtract from 360."]);

E("u4-circle-context", 4, ["9.10"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(40,80), n=ri(8,25), dist=3.14*d*n/100;
    var pool=[dist/10,dist/2,dist+n,dist*2];
    var seen={}; seen[fmtF(dist,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===1?"That uses the radius in the circumference: C = pi x d, then multiply by the number of turns and convert to metres.":"Find one circumference first (pi x d), multiply by the turns, and change centimetres to metres."});
    }
    var q=mcq("A bicycle wheel has diameter "+d+" cm. The wheel turns "+n+" times on a ride. Using 3.14 for pi, how far does the bicycle travel, in metres?",
      {t:fmtF(dist,2), fb:"Yes: one turn covers one circumference, and the total converts to "+fmtF(dist,2)+" m."},
      ds,
      "\\[ \\begin{aligned} C &= 3.14 \\times "+d+" = "+fmtF(3.14*d,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmtF(3.14*d,2)+" \\times "+n+" = "+fmtF(3.14*d*n,2)+" \\text{ cm} \\\\ &= "+fmtF(dist,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(dist,2)+" m</b>.",
      {mode:"wheel", d:d, n:n}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=pick([3,5,6,7,8,9]), rope=2*2*3.14*r;
  var pool2=[2*3.14*r,3.14*r*r,rope+6.28,rope*1.5];
  var seen2={}; seen2[fmtF(rope,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"That is the area of the garden: edging follows the circumference, and it goes around twice.":"Edging follows the circumference: find C = 2 x pi x r, then double it for two loops."});
  }
  var q=mcq("A circular garden has radius "+r+" m. Edging rope goes around the garden twice. Using 3.14 for pi, how much rope is needed, in metres?",
    {t:fmtF(rope,2), fb:"Yes: one loop is "+fmtF(2*3.14*r,2)+" m, and two loops double it."},
    ds2,
    "\\[ \\begin{aligned} C &= 2 \\times 3.14 \\times "+r+" = "+fmtF(2*3.14*r,2)+" \\text{ m} \\\\ \\text{rope} &= 2 \\times "+fmtF(2*3.14*r,2)+" = "+fmtF(rope,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(rope,2)+" m</b>.",
    {mode:"rope", r:r}); q.figure=u4circleFig("r = "+r+" m","r"); return q;
}, ["Each full turn or loop of a circle covers one circumference.", "Start by finding the circumference of the circle in the problem."]);

E("u4-graph-attributes", 4, ["11.2"], 1, "gen", function(){
  if(ri(0,1)===0){
    var a=ri(25,50), b=ri(15,35), c=100-a-b-ri(8,20), miss=100-a-b-c;
    if(c<5){c=10; miss=100-a-b-c;}
    var candP=[miss+10,100-a,Math.round((a+b+c)/3),miss-10,100-b], seenP={}; seenP[miss]=1; var dsP=[];
    for(var i=0;i<candP.length&&dsP.length<3;i++){
      if(candP[i]<=0||seenP[candP[i]])continue; seenP[candP[i]]=1;
      dsP.push({t:candP[i]+"%", fb:"Add the three labelled percents and subtract the total from 100: the missing percent is what is left."});
    }
    return mcq("A circle graph shows three sectors labelled "+a+"%, "+b+"% and "+c+"%, and a fourth sector with no label. What percent belongs on the fourth sector?",
      {t:miss+"%", fb:"Yes: the percents in a circle graph add to 100%."},
      dsP,
      "\\[ \\begin{aligned} \\text{missing} &= 100 - ("+a+" + "+b+" + "+c+") \\\\ &= "+miss+" \\end{aligned} \\] The percents in a circle graph always add to 100%. The answer is <b>"+miss+"%</b>.",
      {mode:"pct"});
  }
  var x=ri(9,16)*10, y=ri(7,12)*10, miss2=360-x-y-ri(6,10)*10;
  if(miss2<30){miss2=60;}
  var z=360-x-y-miss2;
  var candG=[x+y+z,miss2+20,100,miss2-20,90], seenG={}; seenG[miss2]=1; var dsG=[];
  for(var j=0;j<candG.length&&dsG.length<3;j++){
    if(candG[j]<=0||seenG[candG[j]])continue; seenG[candG[j]]=1;
    dsG.push({t:candG[j]+"°", fb:"Add the three given angles and subtract the total from 360: the missing angle is what is left."});
  }
  return mcq("A circle graph has sectors with central angles "+x+"°, "+y+"° and "+z+"°, and one more sector. What is the central angle of the last sector?",
    {t:miss2+"°", fb:"Yes: the central angles in a circle graph add to 360°."},
    dsG,
    "\\[ \\begin{aligned} \\text{missing} &= 360 - ("+x+" + "+y+" + "+z+") \\\\ &= "+miss2+" \\end{aligned} \\] The central angles in a circle graph always add to 360°. The answer is <b>"+miss2+"°</b>.",
    {mode:"ang"});
}, ["Two totals rule every circle graph: percents add to 100 and central angles add to 360.", "Start by adding the parts you are given, then subtract from the full total."]);

E("u4-graph-media", 4, ["11.1"], 2, "var", varset([
  function(){ return mcq("A newspaper circle graph and a magazine circle graph both show favourite sports. To compare how popular soccer is in each survey, what should you compare?",
    {t:"The percent (or sector size) for soccer in each graph", fb:"Yes: percents compare fairly even when the surveys have different sizes."},
    [{t:"The colours used for soccer in each graph and in the legend", fb:"Colours are just labels: they carry no size information."},
     {t:"The radius of each circle as it is printed on the page", fb:"A bigger printed circle does not mean more people: compare the percents."},
     {t:"The titles of the two graphs at the top of each page", fb:"Titles say the topic, not the sizes: compare the soccer percents."}],
    "Circle graphs report parts of a whole as percents, so soccer's share is compared through <b>the percent for soccer in each graph</b>.", {s:1}); },
  function(){ return mcq("Graph A surveyed 200 students and Graph B surveyed 50 students. In both graphs, 40% chose hockey. Which statement is true?",
    {t:"More students chose hockey in Graph A (80) than in Graph B (20)", fb:"Yes: 40% of 200 is 80, and 40% of 50 is 20."},
    [{t:"The same number of students chose hockey in both graphs", fb:"The percents match but the totals differ: 40% of 200 is not 40% of 50."},
     {t:"More students chose hockey in Graph B because its sectors look bigger", fb:"Printed size does not change the counts: compute 40% of each total."},
     {t:"Graph B must be wrong because it surveyed fewer students", fb:"A smaller survey is still a valid survey: its percents describe its own group."}],
    "40% of 200 = 80 students and 40% of 50 = 20 students, so <b>more students chose hockey in Graph A</b>.", {s:2}); },
  function(){ return mcq("Why do news stories often use circle graphs for survey results?",
    {t:"They show each answer as a part of the whole survey at a glance", fb:"Yes: sector sizes show shares of the total clearly."},
    [{t:"They show how values change hour by hour through the day as news breaks", fb:"Change over time is a line graph's job: circle graphs show parts of one whole."},
     {t:"They list every single response in order, one after another", fb:"Circle graphs group responses into sectors: they do not list individuals."},
     {t:"They make small percents look larger than they are in the data", fb:"An honest circle graph keeps sector sizes proportional to the percents."}],
    "A circle graph turns each answer into a sector sized by its share of the total, so it <b>shows parts of a whole at a glance</b>.", {s:3}); },
  function(){ return mcq("A blog post shows a circle graph with no title, no labels and no percents. What is the best conclusion?",
    {t:"The graph cannot be interpreted reliably; the missing labels and values are needed", fb:"Yes: a circle graph needs a title, labels or a legend, and values to read it."},
    [{t:"The largest sector must be the most popular answer, so the graph is fine to use", fb:"Without labels you cannot say what any sector means, even the largest."},
     {t:"The graph is about sports because most circle graphs are about sports", fb:"Guessing the topic is not interpreting: the title is missing."},
     {t:"Each sector must be 25% because there are four sectors in the whole graph as printed", fb:"Sectors are sized by data, not split evenly by default."}],
    "Circle graphs are read through their title, labels and percents; with all of them missing, <b>the graph cannot be interpreted reliably</b>.", {s:4}); },
  function(){ return mcq("Two websites show circle graphs of the same class survey. Website 1 lists percents on every sector; Website 2 lists only colours with a legend. Which graph is easier to compare with a third survey, and why?",
    {t:"Website 1, because its percents can be compared directly with any other survey's percents", fb:"Yes: percents are the common language of circle graphs."},
    [{t:"Website 2, because colours are easier to remember than numbers when comparing surveys", fb:"Colours only name categories: comparing surveys needs the percents."},
     {t:"They are equally easy, because both show the same sectors and the same data", fb:"Reading amounts from Website 2 needs measuring angles: Website 1 states them."},
     {t:"Neither, because circle graphs from different websites can never be compared with each other", fb:"They can be compared: percents put different surveys on the same scale."}],
    "Percents let you compare shares across surveys directly, so <b>Website 1 is easier to compare</b>.", {s:5}); }
]), ["Circle graphs in media are read through their titles, labels and percents.", "Start by asking what information each graph actually gives you."]);

E("u4-graph-read", 4, ["11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:c.pct+"%", fb:"That is the percent for "+c.name+": find "+cat.name+" in the legend."};
  });
  var q=mcq("The circle graph shows students' "+g.topic+". What percent of students chose "+cat.name+"?",
    {t:cat.pct+"%", fb:"Yes: the legend gives "+cat.name+" as "+cat.pct+"%."},
    ds,
    "Match "+cat.name+" in the legend to its sector: it is labelled "+cat.pct+"%. The answer is <b>"+cat.pct+"%</b>.",
    {topic:g.topic, idx:idx});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Use the legend to match each sector letter to its category and percent.", "Start by finding the category in the legend beside the graph."]);

E("u4-graph-quantities", 4, ["11.5","11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var T=pick([100,200,300,400]), qty=cat.pct*T/100;
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:String(c.pct*T/100), fb:"That is the count for "+c.name+": use the percent for "+cat.name+"."};
  });
  var q=mcq("The circle graph shows the "+g.topic+" of "+T+" students. How many students chose "+cat.name+"?",
    {t:String(qty), fb:"Yes: "+cat.pct+"% of "+T+" is "+qty+"."},
    ds,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(cat.pct,"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {topic:g.topic, idx:idx, T:T});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Turn the sector's percent into a count by multiplying it by the total surveyed.", "Start by reading the percent for the category from the legend."]);

E("u4-graph-create", 4, ["11.3","9.13"], 3, "gen", function(){
  var topics=[
    {t:"favourite season", cats:["Spring","Summer","Fall","Winter"]},
    {t:"favourite pet", cats:["Dog","Cat","Fish","Bird"]},
    {t:"lunch choice", cats:["Pizza","Pasta","Salad","Soup"]}
  ];
  var tp=pick(topics);
  var ps=pick([[40,25,20,15],[50,20,20,10],[30,30,25,15],[45,25,20,10],[35,30,20,15],[60,20,10,10]]);
  var T=pick([20,40,50,60,100]);
  var counts=ps.map(function(p){return p*T/100;});
  if(counts.some(function(x){return x!==Math.round(x);})){T=100; counts=ps.slice();}
  var idx=ri(0,3), ang=ps[idx]*3.6;
  var dataStr=tp.cats.map(function(name,i){return name+": "+counts[i];}).join(", ");
  var pool=[ps[idx],360-ang,ang/2,ang+36];
  var seen={}; seen[fmt(ang)+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i])+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That is the percent itself: an angle is the percent of a full 360° turn.":"The central angle is the category's share of 360°."});
  }
  return mcq("A class of "+T+" students was surveyed about "+tp.t+": "+dataStr+". To create a circle graph, what central angle should the sector for "+tp.cats[idx]+" have?",
    {t:fmt(ang)+"°", fb:"Yes: "+tp.cats[idx]+" is "+ps[idx]+"% of the class, and "+ps[idx]+"% of 360° is "+fmt(ang)+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{share} &= "+FR(counts[idx],T)+" = "+ps[idx]+"\\% \\\\ \\text{angle} &= "+FR(ps[idx],"100")+" \\times 360° \\\\ &= "+fmt(ang)+"° \\end{aligned} \\] The answer is <b>"+fmt(ang)+"°</b>.",
    {topic:tp.t, idx:idx});
}, ["A sector's central angle is its share of the full 360 degrees.", "Start by finding the category's share of the total as a percent."]);

E("u4-cr-area-mix", 4, ["9.3"], 2, "gen", function(){
  var b1=ri(6,14), h1=ri(3,9), b2=ri(6,14), h2=pick([4,6,8,10,12]);
  var A1=b1*h1, A2=b2*h2/2, tot=A1+A2;
  var q=numq("A garden is made of a parallelogram plot with base "+b1+" m and height "+h1+" m, joined to a triangular plot with base "+b2+" m and height "+h2+" m. What is the total area of the garden? Give your answer in square metres.",
    tot, 0.01,
    "\\[ \\begin{aligned} A_{\\text{parallelogram}} &= "+b1+" \\times "+h1+" = "+A1+" \\\\ A_{\\text{triangle}} &= "+FR(b2+" \\times "+h2,"2")+" = "+A2+" \\\\ \\text{total} &= "+A1+" + "+A2+" = "+tot+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+tot+" m²</b>.",
    {b1:b1, h1:h1, b2:b2, h2:h2}); q.figure=figMix(b1,h1,b2,h2,"m"); return q;
}, ["Find each plot's area with its own formula, then add.", "Start with the parallelogram: base times height."]);

E("u4-cr-circumference", 4, ["9.10"], 2, "gen", function(){
  var d=pick([8,10,12,15,20,25,30,40]), laps=ri(3,12);
  var tot=3.14*d*laps;
  var q=numq("A running track is a circle with diameter "+d+" m. A runner completes "+laps+" laps of the track. Using 3.14 for pi, how far does the runner run? Give your answer in metres.",
    tot, 0.01,
    "\\[ \\begin{aligned} C &= 3.14 \\times "+d+" = "+fmtF(3.14*d,2)+" \\text{ m} \\\\ \\text{distance} &= "+fmtF(3.14*d,2)+" \\times "+laps+" = "+fmtF(tot,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(tot,2)+" m</b>.",
    {d:d, laps:laps}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
}, ["One lap is one circumference; multiply by the number of laps.", "Start with C = pi x d using 3.14 for pi."]);

E("u4-cr-graph-quantity", 4, ["11.5"], 1, "gen", function(){
  var topics=[["favourite recess activity",["Kickball","Reading","Drawing","Skipping"]],["favourite fruit",["Apple","Banana","Grapes","Orange"]],["way to spend a rainy day",["Movies","Games","Books","Baking"]]];
  var tp=pick(topics);
  var ps=pick([[45,25,20,10],[35,30,25,10],[50,20,15,15],[40,30,20,10],[30,25,25,20]]);
  var T=pick([60,80,100,120,200,240]);
  var idx=ri(0,3), qty=ps[idx]*T/100;
  if(qty!==Math.round(qty)){T=200; qty=ps[idx]*2;}
  var dataStr=tp[1].map(function(name,i){return name+" "+ps[i]+"%";}).join(", ");
  return numq("A circle graph of "+tp[0]+" for "+T+" students shows: "+dataStr+". How many students chose "+tp[1][idx]+"?",
    qty, 0.01,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(ps[idx],"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {idx:idx, T:T});
}, ["Multiply the category's percent by the total number of students.", "Start by writing the percent as a fraction out of 100."]);

E("u4-cr-area-circle", 4, ["9.9","9.3"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=2*ri(3,30), r=d/2, A=3.14*r*r;
    var q=numq("A circular splash pad has diameter "+d+" m. Using 3.14 for pi, what is the area of the splash pad? Give your answer in square metres.",
      A, 0.01,
      "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\text{ m} \\\\ A &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" m²</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
  }
  var rr=ri(3,30), AA=3.14*rr*rr;
  var q=numq("A circular rug has radius "+rr+" m. Using 3.14 for pi, what is the area of the rug? Give your answer in square metres.",
    AA, 0.01,
    "\\[ \\begin{aligned} A &= 3.14 \\times "+rr+"^2 \\\\ &= "+fmtF(AA,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(AA,2)+" m²</b>.",
    {mode:"r", r:rr}); q.figure=u4circleFig("r = "+rr+" m","r"); return q;
}, ["Make sure you have the radius, then use A = pi x r².", "Start by finding the radius: halve the diameter if that is what is given."]);

E("u4-cr-composite", 4, ["9.3","9.10"], 3, "gen", function(){
  var w=pick([5,6,7,8,9,10,11,12,14,16]), L=ri(4,14), r=w/2, semi=3.14*r*r/2, tot=w*L+semi;
  var q=numq("A sign is a rectangle "+w+" m wide and "+L+" m tall, with a semicircle (half of a circle) of diameter "+w+" m attached across the top. Using 3.14 for pi, what is the total area of the sign? Give your answer in square metres.",
    tot, 0.05,
    "\\[ \\begin{aligned} A_{\\text{rectangle}} &= "+w+" \\times "+L+" = "+(w*L)+" \\\\ A_{\\text{semicircle}} &= "+FR("3.14 \\times "+r+"^2","2")+" = "+fmtF(semi,2)+" \\\\ \\text{total} &= "+(w*L)+" + "+fmtF(semi,2)+" = "+fmtF(tot,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(tot,2)+" m²</b>.",
    {w:w, L:L}); q.figure=figSign(w+" m",L+" m"); return q;
}, ["Split the sign into a rectangle and a semicircle, find each area, then add.", "Start with the rectangle, then find the semicircle: its radius is half of the sign's width."]);

/* ----- bank-u5.js ----- */
// Math 7 Unit 5 Operations with Fractions question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 2251 to 2651).
// CRMARKS: u5-simplify-solution=3
// CRMARKS: u5-problem-add=3
// CRMARKS: u5-problem-sub-mixed=2
// CRMARKS: u5-three-fractions=3
// CRMARKS: u5-mixed-multistep=3
/* ===== Unit 5 ===== */
/* Unit 5: Operations with Fractions (addition and subtraction, codes 6.13-6.23) */
function u5gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u5lcm(a,b){return a*b/u5gcd(a,b);}
function u5red(n,d){var g=u5gcd(n,d);return [n/g,d/g];}
function u5disp(n,d){var r=u5red(n,d);n=r[0];d=r[1];if(d===1)return String(n);if(n>d){var w=Math.floor(n/d),rem=n%d;if(rem===0)return String(w);return w+"\\frac{"+rem+"}{"+d+"}";}return "\\frac{"+n+"}{"+d+"}";}
function u5M(n,d){return "\\("+u5disp(n,d)+"\\)";}
function u5fopts(corr,errs){
  var cr=u5red(corr[0],corr[1]);var seen={};seen[cr[0]+"/"+cr[1]]=1;var out=[];
  function tryAdd(p,fb){if(out.length>=3)return;if(!p||p[0]<=0||p[1]<=0)return;var r=u5red(p[0],p[1]);var k=r[0]+"/"+r[1];if(seen[k])return;seen[k]=1;out.push({t:u5M(r[0],r[1]),fb:fb});}
  errs.forEach(function(e){tryAdd(e.p,e.fb);});
  [[cr[0]+1,cr[1]],[cr[0],cr[1]+1],[cr[0]+1,cr[1]+1],[cr[0]+2,cr[1]],[cr[0],cr[1]+2],[cr[0]+3,cr[1]+1]].forEach(function(p){tryAdd(p,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u5iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr+10,corr-2,corr+5].forEach(function(v){tryAdd(v,"That value does not match the result you get from the steps in a correct solution.");});
  return out;
}
function u5accept(N,D){
  var r=u5red(N,D);var out=[r[0]+"/"+r[1]];
  if(r[0]>r[1]){var w=Math.floor(r[0]/r[1]),rem=r[0]%r[1];if(rem>0)out.push(w+" "+rem+"/"+r[1]);}
  var dd=r[1],ok=true;while(dd%2===0)dd/=2;while(dd%5===0)dd/=5;if(dd===1){
    var val=r[0]/r[1];var s=val.toFixed(6).replace(/0+$/,"").replace(/\.$/,"");if(out.indexOf(s)<0)out.push(s);
  }
  return out;
}
function u5barsSVG(rows){
  var h=rows.length*58+12;var out='<svg viewBox="0 0 340 '+h+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  rows.forEach(function(r,idx){var y=8+idx*58;var x0=20,w=300,seg=w/r.d,i,x;
    for(i=0;i<r.d;i++){x=x0+i*seg;if(i<r.n)out+='<rect x="'+fmt(x,1)+'" y="'+y+'" width="'+fmt(seg,1)+'" height="30" fill="'+FIG_SHADE+'"/>';}
    out+='<rect x="'+x0+'" y="'+y+'" width="'+w+'" height="30" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    for(i=0;i<=r.d;i++){x=x0+i*seg;out+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+30)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';}
    if(r.cross){for(i=r.n-r.cross;i<r.n;i++){x=x0+i*seg;out+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x+seg,1)+'" y2="'+(y+30)+'" stroke="'+FIG_ALT+'" stroke-width="1.8"/><line x1="'+fmt(x+seg,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+30)+'" stroke="'+FIG_ALT+'" stroke-width="1.8"/>';}}
    out+='<text x="170" y="'+(y+50)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">'+r.label+'</text>';
  });
  return out+'</svg>';
}

E("u5-add-like", 5, ["6.14","6.13"], 1, "gen", function(){
  var d=pick([4,5,6,7,8,9,10,11,12]);var a=ri(1,d-2);var b=ri(1,d-1-a);var s=a+b;
  var ctx=pick(["pure","trail","recipe"]);
  var prompt;
  if(ctx==="trail")prompt="A hiker walks "+u5M(a,d)+" of a trail in the morning and "+u5M(b,d)+" of the trail in the afternoon. What fraction of the trail did the hiker walk in all?";
  else if(ctx==="recipe")prompt="A recipe uses "+u5M(a,d)+" of a cup of oats and then another "+u5M(b,d)+" of a cup of oats. How many cups of oats is that in all?";
  else prompt="What is "+u5M(a,d)+" + "+u5M(b,d)+"?";
  var sol="Think of one whole split into "+d+" equal parts. Both fractions count parts of that same size, so add the numerators and keep the denominator.\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d);
  var rr=u5red(s,d);if(rr[0]!==s||rr[1]!==d)sol+=" \\\\ &= "+u5disp(s,d);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(s,d)+"</b>.";
  return mcq(prompt,{t:u5M(s,d),fb:"Yes: the parts are the same size, so "+a+" parts + "+b+" parts = "+s+" parts of size "+d+"." },
    u5fopts([s,d],[{p:[s,2*d],fb:"That adds the denominators as well. The size of the parts does not change when you add parts together."},{p:[Math.abs(a-b),d],fb:"That subtracts the numerators. The question asks for the total, so the numerators are added."},{p:[s+1,d],fb:"That counts one part too many: "+a+" + "+b+" = "+s+", not "+(s+1)+"."}]),
    sol,{mode:"add-like",a:a,b:b,d:d});
}, ["The denominators match, so the parts are the same size.", "Start by adding the numerators and keeping the denominator the same."]);

E("u5-simplify-fraction", 5, ["6.15"], 1, "gen", function(){
  var q=pick([3,4,5,6,7,8,9,10,11,12]);var p=ri(1,q-1);var cnt=0;
  while(u5gcd(p,q)!==1&&cnt<40){p=ri(1,q-1);cnt++;}
  if(u5gcd(p,q)!==1){p=1;}
  var k=ri(2,6);var N=p*k,D=q*k;
  var ctx=pick(["pure","length","mass","time"]);
  var prompt;
  if(ctx==="length")prompt="A strip is "+u5M(N,D)+" of a metre long. Write this length as a fraction in lowest terms.";
  else if(ctx==="mass")prompt="A bag has a mass of "+u5M(N,D)+" of a kilogram. Write this mass as a fraction in lowest terms.";
  else if(ctx==="time")prompt="A task takes "+u5M(N,D)+" of an hour. Write this time as a fraction in lowest terms.";
  else prompt="Write "+u5M(N,D)+" in lowest terms.";
  var sol="The greatest common factor of "+N+" and "+D+" is "+k+". Divide the numerator and the denominator by "+k+".\\[ \\begin{aligned} "+FR(N,D)+" &= "+FR(N/k,D/k)+" \\end{aligned} \\] The answer is <b>"+u5M(p,q)+"</b>.";
  return mcq(prompt,{t:u5M(p,q),fb:"Yes: dividing "+N+" and "+D+" each by their common factor "+k+" gives lowest terms."},
    u5fopts([p,q],[{p:[p,D],fb:"That divides only the numerator by "+k+". The denominator must be divided by the same factor."},{p:[N,q],fb:"That divides only the denominator by "+k+". The numerator must be divided by the same factor."},{p:[N-k,D-k],fb:"That subtracts "+k+" from the top and bottom. Simplifying means dividing by a common factor, not subtracting."}]),
    sol,{mode:"simplify",p:p,q:q,k:k});
}, ["Look for the largest number that divides both the numerator and the denominator.", "Start by listing factors of the numerator and the denominator and finding the one they share."]);

E("u5-common-denominator", 5, ["6.16"], 1, "gen", function(){
  var pairs=[[2,4],[2,6],[3,6],[4,6],[3,4],[4,8],[5,10],[6,8],[3,8],[4,10],[5,6],[6,10],[8,12],[9,12],[4,12],[3,9],[5,15],[6,9],[8,10],[10,15]];
  var pr=pick(pairs);var d1=pr[0],d2=pr[1];var L=u5lcm(d1,d2);
  var na=ri(1,d1-1),nb=ri(1,d2-1);
  var prompt="What is the least common denominator of "+u5M(na,d1)+" and "+u5M(nb,d2)+"?";
  var sol="List multiples of "+d1+": "+d1+", "+(2*d1)+", "+(3*d1)+", "+(4*d1)+". List multiples of "+d2+": "+d2+", "+(2*d2)+", "+(3*d2)+", "+(4*d2)+". The first multiple they share is "+L+", so the least common denominator is <b>"+L+"</b>.";
  return mcq(prompt,{t:String(L),fb:"Yes: "+L+" is the smallest number that is a multiple of both "+d1+" and "+d2+"."},
    u5iopts(L,[{v:d1*d2,fb:"That is the product of the denominators. It is a common denominator, but not the least one here."},{v:d1+d2,fb:"That adds the denominators. A common denominator must be a multiple of each denominator."},{v:Math.max(d1,d2),fb:"That is just the larger denominator, and "+Math.min(d1,d2)+" does not divide it evenly here."}]),
    sol,{mode:"lcd",d1:d1,d2:d2});
}, ["A common denominator is a multiple of both denominators.", "Start by listing the multiples of the larger denominator until you find one the other denominator divides."]);

E("u5-sub-like", 5, ["6.19"], 1, "gen", function(){
  var d=pick([4,5,6,7,8,9,10,12]);var a=ri(3,d-1);var b=ri(1,a-1);var s=a-b;
  var ctx=pick(["pure","ribbon","tank"]);
  var prompt;
  if(ctx==="ribbon")prompt="A ribbon is "+u5M(a,d)+" of a metre long. A piece "+u5M(b,d)+" of a metre is cut off. How much ribbon is left?";
  else if(ctx==="tank")prompt="A tank is "+u5M(a,d)+" full. Then "+u5M(b,d)+" of the tank is used. What fraction of the tank is left?";
  else prompt="What is "+u5M(a,d)+" - "+u5M(b,d)+"?";
  var sol="The parts are the same size, so subtract the numerators and keep the denominator.\\[ \\begin{aligned} "+FR(a,d)+" - "+FR(b,d)+" &= "+FR(s,d);
  var rr=u5red(s,d);if(rr[0]!==s||rr[1]!==d)sol+=" \\\\ &= "+u5disp(s,d);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(s,d)+"</b>.";
  return mcq(prompt,{t:u5M(s,d),fb:"Yes: "+a+" parts take away "+b+" parts leaves "+s+" parts of size "+d+"."},
    u5fopts([s,d],[{p:[a+b,d],fb:"That adds the numerators. The question asks how much is left, so subtract."},{p:[s,2*d],fb:"That changes the denominator. Subtracting parts does not change the size of each part."},{p:[s+1,d],fb:"That counts one part too many: "+a+" - "+b+" = "+s+", not "+(s+1)+"."}]),
    sol,{mode:"sub-like",a:a,b:b,d:d});
}, ["The denominators match, so the parts are the same size.", "Start by subtracting the numerators and keeping the denominator the same."]);

E("u5-add-unlike", 5, ["6.17","6.16"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([2,3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,9,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["pure","punch","walk"]);
  var prompt;
  if(ctx==="punch")prompt="A jug holds "+u5M(a,d1)+" of a litre of juice. Another "+u5M(c,d2)+" of a litre is poured in. How much juice is in the jug now, in litres?";
  else if(ctx==="walk")prompt="Sam walks "+u5M(a,d1)+" of a kilometre before lunch and "+u5M(c,d2)+" of a kilometre after lunch. How far does Sam walk in all, in kilometres?";
  else prompt="What is "+u5M(a,d1)+" + "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the numerators add to "+N+"."},
    u5fopts([N,L],[{p:[a+c,d1+d2],fb:"That adds the tops and the bottoms. Fractions can only be added once they share a denominator."},{p:[a*m1+c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a+c*m2,L],fb:"That rewrites only the second fraction over "+L+". The first fraction must be rewritten too."}]),
    sol,{mode:"add-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by finding the least common multiple of the two denominators."]);

E("u5-sub-unlike", 5, ["6.19","6.16"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);if(a*L/d1<=c*L/d2){cnt++;continue;}break;}
  if(cnt>=60){d1=3;d2=4;a=2;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1-c*m2;
  var ctx=pick(["pure","flour","paint"]);
  var prompt;
  if(ctx==="flour")prompt="A bin holds "+u5M(a,d1)+" of a kilogram of flour. A baker takes out "+u5M(c,d2)+" of a kilogram. How much flour is left, in kilograms?";
  else if(ctx==="paint")prompt="A can is "+u5M(a,d1)+" full of paint. Then "+u5M(c,d2)+" of the can is used on a fence. What fraction of the can is left?";
  else prompt="What is "+u5M(a,d1)+" - "+u5M(c,d2)+"?";
  var sol="Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" - "+FR(c,d2)+" &= "+FR(a*m1,L)+" - "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Yes: rewritten over the common denominator "+L+", the difference of the numerators is "+N+"."},
    u5fopts([N,L],[{p:[Math.abs(a-c),Math.abs(d1-d2)|| (d1+d2)],fb:"That subtracts the tops and the bottoms. Fractions can only be subtracted once they share a denominator."},{p:[a*m1-c,L],fb:"That rewrites only the first fraction over "+L+". The second fraction must be rewritten too."},{p:[a*m1+c*m2,L],fb:"That adds the rewritten numerators. The question asks for a difference, so subtract."}]),
    sol,{mode:"sub-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["The parts are different sizes, so the fractions need a common denominator first.", "Start by rewriting both fractions over the least common multiple of the denominators."]);

E("u5-add-mixed", 5, ["6.21","6.20"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w1=ri(1,5),w2=ri(1,4);var n1=ri(1,d-1),n2=ri(1,d-1);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n1=ri(1,d-1);n2=ri(1,d-1);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=5;n1=ri(1,4);n2=ri(1,4);}
  var W=w1+w2,S=n1+n2;var N=W*d+S;
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","bags","laps"]);
  var prompt;
  if(ctx==="bags")prompt="One bag holds "+ "\\("+A+"\\)"+" kilograms of soil and another holds "+"\\("+B+"\\)"+" kilograms. What is the total mass, in kilograms?";
  else if(ctx==="laps")prompt="A runner completes "+"\\("+A+"\\)"+" laps in the morning and "+"\\("+B+"\\)"+" laps in the evening. How many laps is that in all?";
  else prompt="What is "+"\\("+A+"\\)"+" + "+"\\("+B+"\\)"+"?";
  var sol="Add the whole numbers, then add the fraction parts."+(S>=d?" The fraction parts add to more than one whole, so regroup.":"")+"\\[ \\begin{aligned} "+A+" + "+B+" &= "+W+" + "+FR(S,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Yes: the wholes add to "+W+" and the fraction parts add to "+S+"/"+d+", which combines to this total."},
    u5fopts([N,d],[{p:[W*d+(S%d),d],fb:"That keeps the fraction part below one whole but forgets to regroup the extra whole when the fraction parts add past "+d+"/"+d+"."},{p:[W*2*d+S,2*d],fb:"That adds the denominators of the fraction parts. The parts are the same size, so the denominator stays "+d+"."},{p:[W*d+Math.abs(n1-n2),d],fb:"That subtracts the fraction parts. The question asks for a total, so add them."}]),
    sol,{mode:"add-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Work with the whole numbers and the fraction parts separately.", "Start by adding the whole numbers, then add the numerators of the fraction parts."]);

E("u5-sub-mixed", 5, ["6.21","6.20"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n2=ri(1,d-2);var n1=n2+ri(1,d-1-n2);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n2=ri(1,d-2);n1=n2+ri(1,d-1-n2);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n2=ri(1,5);n1=n2+ri(1,6-n2);}
  var N=(w1-w2)*d+(n1-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","board","water"]);
  var prompt;
  if(ctx==="board")prompt="A board is "+"\\("+A+"\\)"+" metres long. A piece "+"\\("+B+"\\)"+" metres long is cut off. How much board is left, in metres?";
  else if(ctx==="water")prompt="A cooler holds "+"\\("+A+"\\)"+" litres of water. A team drinks "+"\\("+B+"\\)"+" litres. How much water is left, in litres?";
  else prompt="What is "+"\\("+A+"\\)"+" - "+"\\("+B+"\\)"+"?";
  var sol="Subtract the whole numbers, then subtract the fraction parts.\\[ \\begin{aligned} "+A+" - "+B+" &= "+(w1-w2)+" + "+FR(n1-n2,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Yes: the wholes differ by "+(w1-w2)+" and the fraction parts differ by "+(n1-n2)+"/"+d+"."},
    u5fopts([N,d],[{p:[(w1-w2)*d+(n1+n2),d],fb:"That adds the fraction parts. The question asks how much is left, so subtract the fraction parts too."},{p:[(w1+w2)*d+(n1-n2),d],fb:"That adds the whole numbers. Both the wholes and the fraction parts are subtracted here."},{p:[(w1-w2)*2*d+(n1-n2),2*d],fb:"That changes the denominator. The parts are the same size, so the denominator stays "+d+"." }]),
    sol,{mode:"sub-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Work with the whole numbers and the fraction parts separately.", "Start by subtracting the whole numbers, then subtract the numerators of the fraction parts."]);

E("u5-model-add-figure", 5, ["6.13","6.14"], 1, "gen", function(){
  var d=pick([4,5,6,8,10,12]);var a=ri(1,d-2);var b=ri(1,d-1-a);var s=a+b;
  var q=mcq("The two shaded strips model a sum. Each strip is one whole split into equal parts. What is the sum modelled by the strips?",
    {t:u5M(s,d),fb:"Yes: the first strip shades "+a+" of "+d+" parts and the second shades "+b+" of "+d+" parts, giving "+s+" parts of size "+d+" in all."},
    u5fopts([s,d],[{p:[s,2*d],fb:"That adds the denominators. Each strip is a whole split into "+d+" parts, so the part size stays the same."},{p:[Math.abs(a-b),d],fb:"That is the difference of the shaded parts. The strips model a sum, so add them."},{p:[s+1,d],fb:"Count the shaded parts again: "+a+" + "+b+" = "+s+", not "+(s+1)+"."}]),
    "Count the shaded parts on each strip. The first strip shows "+u5M(a,d)+" and the second shows "+u5M(b,d)+".\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d)+" \\end{aligned} \\] The sum modelled is <b>"+u5M(s,d)+"</b>.",
    {mode:"model-add",a:a,b:b,d:d});
  q.figure=u5barsSVG([{n:a,d:d,label:a+"/"+d},{n:b,d:d,label:b+"/"+d}]);
  return q;
}, ["Each strip is one whole, and the shading shows the fraction parts.", "Start by reading the fraction shown by each strip, then add them."]);

E("u5-model-sub-figure", 5, ["6.18","6.19"], 1, "gen", function(){
  var d=pick([5,6,7,8,9,10,12]);var n=ri(3,d-1);var c=ri(1,n-1);var s=n-c;
  var q=mcq("The shaded strip models a subtraction. The crossed-out parts are taken away. What fraction of the strip is left shaded and not crossed out?",
    {t:u5M(s,d),fb:"Yes: "+n+" parts were shaded and "+c+" of them are crossed out, leaving "+s+" of the "+d+" parts."},
    u5fopts([s,d],[{p:[c,d],fb:"That is the part taken away, not the part left."},{p:[n,d],fb:"That is the amount shaded at the start, before any parts are crossed out."},{p:[s+1,d],fb:"Count again: "+n+" shaded parts take away "+c+" crossed parts leaves "+s+" parts."}]),
    "The strip starts with "+u5M(n,d)+" shaded, and "+u5M(c,d)+" is crossed out.\\[ \\begin{aligned} "+FR(n,d)+" - "+FR(c,d)+" &= "+FR(s,d)+" \\end{aligned} \\] The fraction left is <b>"+u5M(s,d)+"</b>.",
    {mode:"model-sub",n:n,c:c,d:d});
  q.figure=u5barsSVG([{n:n,d:d,label:n+"/"+d+" shaded, "+c+" crossed out",cross:c}]);
  return q;
}, ["The whole strip is split into equal parts, and the crossed parts are removed.", "Start by counting the shaded parts, then subtract the crossed-out parts."]);

E("u5-simplify-solution", 5, ["6.22","6.15"], 1, "gen", function(){
  var d=12,a=2,b=4,cnt=0,s=6;
  while(cnt<80){d=pick([6,8,9,10,12,14,15,16,18,20,21,22,24]);a=ri(1,d-2);b=ri(1,d-1-a);s=a+b;if(u5gcd(s,d)>=2)break;cnt++;}
  if(cnt>=80){d=12;a=2;b=4;s=6;}
  var rr=u5red(s,d);var g=u5gcd(s,d);
  var ctx=pick(["pure","gym","garden"]);
  var prompt;
  if(ctx==="gym")prompt="A student trains for "+u5M(a,d)+" of an hour on Monday and "+u5M(b,d)+" of an hour on Tuesday. How many hours is that in all? Give your answer as a fraction in lowest terms (for example, 3/4).";
  else if(ctx==="garden")prompt="A gardener waters "+u5M(a,d)+" of a bed in the morning and "+u5M(b,d)+" of the bed in the afternoon. What fraction of the bed is watered in all? Give your answer as a fraction in lowest terms (for example, 3/4).";
  else prompt="Calculate "+u5M(a,d)+" + "+u5M(b,d)+". Give your answer as a fraction in lowest terms (for example, 3/4).";
  var sol="Add the numerators, then simplify by dividing the numerator and the denominator by their common factor "+g+".\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d)+" \\\\ &= "+u5disp(s,d)+" \\end{aligned} \\] The answer is <b>"+u5M(s,d)+"</b>.";
  return textq(prompt,u5accept(s,d),sol,{mode:"simplify-solution",a:a,b:b,d:d});
}, ["First add the fractions, then check whether the result can be simplified.", "Start by adding the numerators, since the denominators already match."]);

E("u5-problem-add", 5, ["6.23","6.17"], 2, "gen", function(){
  var d1=4,d2=3,a=1,c=1,cnt=0,L=12;
  while(cnt<60){d1=pick([2,3,4,5,6,8,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>24){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["flour","trail","paint"]);
  var prompt;
  if(ctx==="flour")prompt="A baker uses "+u5M(a,d1)+" of a cup of flour for a dough and "+u5M(c,d2)+" of a cup of flour for a topping. How many cups of flour does the baker use in all? Give your answer as a fraction or mixed number in lowest terms.";
  else if(ctx==="trail")prompt="A trail crew clears "+u5M(a,d1)+" of a kilometre of path on Saturday and "+u5M(c,d2)+" of a kilometre on Sunday. How many kilometres do they clear in all? Give your answer as a fraction or mixed number in lowest terms.";
  else prompt="A painter uses "+u5M(a,d1)+" of a can of paint on a door and "+u5M(c,d2)+" of a can on a window frame. How many cans of paint is that in all? Give your answer as a fraction or mixed number in lowest terms.";
  var sol="The amounts are added. Use the common denominator "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L)+" \\\\ &= "+u5disp(N,L)+" \\end{aligned} \\] The answer is <b>"+u5M(N,L)+"</b>.";
  return textq(prompt,u5accept(N,L),sol,{mode:"problem-add",a:a,d1:d1,c:c,d2:d2});
}, ["The question asks for a total, so the two amounts are added.", "Start by finding a common denominator for the two fractions."]);

E("u5-problem-sub-mixed", 5, ["6.23","6.21"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n2=ri(1,d-2);var n1=n2+ri(1,d-1-n2);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n2=ri(1,d-2);n1=n2+ri(1,d-1-n2);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n2=ri(1,5);n1=n2+ri(1,6-n2);}
  var N=(w1-w2)*d+(n1-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["rope","juice","ribbon"]);
  var prompt;
  if(ctx==="rope")prompt="A rope is "+"\\("+A+"\\)"+" metres long. A piece "+"\\("+B+"\\)"+" metres long is cut off for a tent. How many metres of rope are left? Give your answer as a fraction or mixed number in lowest terms.";
  else if(ctx==="juice")prompt="A jug holds "+"\\("+A+"\\)"+" litres of juice. At lunch, "+"\\("+B+"\\)"+" litres are poured out. How many litres are left? Give your answer as a fraction or mixed number in lowest terms.";
  else prompt="A ribbon is "+"\\("+A+"\\)"+" metres long. A gift uses "+"\\("+B+"\\)"+" metres of it. How many metres of ribbon are left? Give your answer as a fraction or mixed number in lowest terms.";
  var sol="The amount left is a difference. Subtract the whole numbers and then the fraction parts.\\[ \\begin{aligned} "+A+" - "+B+" &= "+(w1-w2)+" + "+FR(n1-n2,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return textq(prompt,u5accept(N,d),sol,{mode:"problem-sub-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["The question asks how much is left, so the amounts are subtracted.", "Start by subtracting the whole numbers, then subtract the fraction parts."]);

E("u5-model-sub-equation", 5, ["6.18","6.19"], 1, "var", varset([
  function(){
    var q=mcq("A strip is split into 8 equal parts. At first 5 parts are shaded. Then 2 of the shaded parts are crossed out. Which equation records this model?",
      {t:"\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,8)+"\\)",fb:"Yes: the model starts at 5/8, removes 2/8, and leaves 3/8."},
      [{t:"\\("+FR(5,8)+" + "+FR(2,8)+" = "+FR(7,8)+"\\)",fb:"That adds the crossed-out parts. Crossed-out parts are taken away, so the model is a subtraction."},
       {t:"\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,16)+"\\)",fb:"The numerators are right, but the denominator stays 8: the size of the parts does not change."},
       {t:"\\("+FR(8,8)+" - "+FR(2,8)+" = "+FR(6,8)+"\\)",fb:"That starts from the whole strip. The model starts from the 5 shaded parts, which is 5/8."}],
      "The shaded parts give the starting amount, "+u5M(5,8)+". Crossing out 2 parts records taking away "+u5M(2,8)+", leaving 3 parts. The equation is <b>\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,8)+"\\)</b>.",
      {mode:"model-eq-1"});
    q.figure=u5barsSVG([{n:5,d:8,label:"5/8 shaded, 2 crossed out",cross:2}]);
    return q;
  },
  function(){
    return mcq("A fraction circle is split into 6 equal parts. At first 5 parts are shaded. Then 4 of the shaded parts are crossed out. Which equation records this model?",
      {t:"\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,6)+"\\)",fb:"Yes: the model starts at 5/6, removes 4/6, and leaves 1/6."},
      [{t:"\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,12)+"\\)",fb:"The numerators are right, but the denominator stays 6: the size of the parts does not change."},
       {t:"\\("+FR(6,6)+" - "+FR(4,6)+" = "+FR(2,6)+"\\)",fb:"That starts from the whole circle. The model starts from the 5 shaded parts, which is 5/6."},
       {t:"\\("+FR(4,6)+" - "+FR(1,6)+" = "+FR(3,6)+"\\)",fb:"That starts from the crossed-out part. The model starts from the shaded amount, 5/6."}],
      "The shaded parts give the starting amount, "+u5M(5,6)+". Crossing out 4 parts records taking away "+u5M(4,6)+", leaving 1 part. The equation is <b>\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,6)+"\\)</b>.",
      {mode:"model-eq-2"});
  },
  function(){
    var q=mcq("A strip is split into 10 equal parts. At first 7 parts are shaded. Then 3 of the shaded parts are crossed out. Which equation records this model?",
      {t:"\\("+FR(7,10)+" - "+FR(3,10)+" = "+FR(2,5)+"\\)",fb:"Yes: the model starts at 7/10, removes 3/10, and leaves 4/10, which simplifies to 2/5."},
      [{t:"\\("+FR(7,10)+" - "+FR(3,10)+" = "+FR(4,20)+"\\)",fb:"That subtracts correctly in the numerator but doubles the denominator. The part size stays tenths."},
       {t:"\\("+FR(7,10)+" + "+FR(3,10)+" = "+FR(1,1)+"\\)",fb:"That adds the crossed-out parts. Crossed-out parts are taken away, so the model is a subtraction."},
       {t:"\\("+FR(10,10)+" - "+FR(3,10)+" = "+FR(7,10)+"\\)",fb:"That starts from the whole strip. The model starts from the 7 shaded parts, which is 7/10."}],
      "The shaded parts give the starting amount, "+u5M(7,10)+". Crossing out 3 parts records taking away "+u5M(3,10)+", leaving 4 parts, and "+u5M(4,10)+" simplifies.\\[ \\begin{aligned} "+FR(7,10)+" - "+FR(3,10)+" &= "+FR(4,10)+" \\\\ &= "+u5disp(4,10)+" \\end{aligned} \\] The equation ends at <b>"+u5M(4,10)+"</b>.",
      {mode:"model-eq-3"});
    q.figure=u5barsSVG([{n:7,d:10,label:"7/10 shaded, 3 crossed out",cross:3}]);
    return q;
  },
  function(){
    return mcq("A measuring cup model is split into 4 equal parts. At first 3 parts are shaded. Then 1 of the shaded parts is crossed out. Which equation records this model?",
      {t:"\\("+FR(3,4)+" - "+FR(1,4)+" = "+FR(1,2)+"\\)",fb:"Yes: the model starts at 3/4, removes 1/4, and leaves 2/4, which simplifies to 1/2."},
      [{t:"\\("+FR(3,4)+" - "+FR(1,4)+" = "+FR(2,8)+"\\)",fb:"That counts the right number of parts left but changes the part size to eighths. The parts are quarters."},
       {t:"\\("+FR(4,4)+" - "+FR(1,4)+" = "+FR(3,4)+"\\)",fb:"That starts from the whole cup. The model starts from the 3 shaded parts, which is 3/4."},
       {t:"\\("+FR(3,4)+" + "+FR(1,4)+" = "+FR(1,1)+"\\)",fb:"That adds the crossed-out part. Crossed-out parts are taken away, so the model is a subtraction."}],
      "The shaded parts give the starting amount, "+u5M(3,4)+". Crossing out 1 part records taking away "+u5M(1,4)+", leaving 2 parts, and "+u5M(2,4)+" simplifies.\\[ \\begin{aligned} "+FR(3,4)+" - "+FR(1,4)+" &= "+FR(2,4)+" \\\\ &= "+u5disp(2,4)+" \\end{aligned} \\] The equation ends at <b>"+u5M(2,4)+"</b>.",
      {mode:"model-eq-4"});
  },
  function(){
    return mcq("A strip is split into 12 equal parts. At first 9 parts are shaded. Then 5 of the shaded parts are crossed out. Which equation records this model?",
      {t:"\\("+FR(9,12)+" - "+FR(5,12)+" = "+FR(1,3)+"\\)",fb:"Yes: the model starts at 9/12, removes 5/12, and leaves 4/12, which simplifies to 1/3."},
      [{t:"\\("+FR(9,12)+" - "+FR(5,12)+" = "+FR(4,24)+"\\)",fb:"That counts the right number of parts left but doubles the denominator. The parts are twelfths."},
       {t:"\\("+FR(12,12)+" - "+FR(5,12)+" = "+FR(7,12)+"\\)",fb:"That starts from the whole strip. The model starts from the 9 shaded parts, which is 9/12."},
       {t:"\\("+FR(5,12)+" - "+FR(4,12)+" = "+FR(1,12)+"\\)",fb:"That starts from the crossed-out part. The model starts from the shaded amount, 9/12."}],
      "The shaded parts give the starting amount, "+u5M(9,12)+". Crossing out 5 parts records taking away "+u5M(5,12)+", leaving 4 parts, and "+u5M(4,12)+" simplifies.\\[ \\begin{aligned} "+FR(9,12)+" - "+FR(5,12)+" &= "+FR(4,12)+" \\\\ &= "+u5disp(4,12)+" \\end{aligned} \\] The equation ends at <b>"+u5M(4,12)+"</b>.",
      {mode:"model-eq-5"});
  }
]), ["Crossed-out parts in a model are taken away, so the model records a subtraction.", "Start by writing the shaded amount, then subtract the crossed-out amount."]);

E("u5-sub-mixed-borrow", 5, ["6.21","6.20"], 3, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n1=ri(1,d-2);var n2=n1+ri(1,d-1-n1);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n1=ri(1,d-2);n2=n1+ri(1,d-1-n1);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n1=ri(1,5);n2=n1+ri(1,6-n1);}
  var N=(w1-w2-1)*d+(n1+d-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","trail","tank"]);
  var prompt;
  if(ctx==="trail")prompt="A trail is "+"\\("+A+"\\)"+" kilometres long. A crew has finished "+"\\("+B+"\\)"+" kilometres. How many kilometres are left to finish?";
  else if(ctx==="tank")prompt="A tank holds "+"\\("+A+"\\)"+" litres. Then "+"\\("+B+"\\)"+" litres are drained out. How many litres are left?";
  else prompt="What is "+"\\("+A+"\\)"+" - "+"\\("+B+"\\)"+"?";
  var sol="The fraction part \\(" +FR(n1,d)+ "\\) is smaller than \\(" +FR(n2,d)+ "\\), so regroup one whole from "+w1+" as \\(" +FR(d,d)+ "\\).\\[ \\begin{aligned} "+A+" - "+B+" &= "+u5disp((w1-1)*d+(n1+d),d)+" - "+B+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Yes: after regrouping one whole, the fraction parts subtract cleanly and the wholes drop by one extra."},
    u5fopts([N,d],[{p:[(w1-w2)*d+(n2-n1),d],fb:"That swaps the fraction parts to avoid regrouping. Instead, regroup one whole into "+d+" extra parts."},{p:[(w1-w2)*d+(n1+d-n2),d],fb:"That regroups the fraction part but forgets that the whole number drops by one when you regroup."},{p:[(w1-w2)*d+(n1+n2),d],fb:"That adds the fraction parts. The question asks for a difference, so subtract them after regrouping."}]),
    sol,{mode:"sub-mixed-borrow",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Compare the fraction parts first: the first one may be too small to subtract from directly.", "Start by regrouping one whole into fraction parts with the same denominator."]);

E("u5-three-fractions", 5, ["6.23","6.17","6.22"], 3, "gen", function(){
  var mode=pick(["total","left"]);
  var denoms=[[2,4,8],[3,6,12],[2,3,6],[4,8,12],[2,6,12],[3,4,12],[2,4,12],[6,3,12]];
  var ds=pick(denoms);var L=12;
  var ns=ds.map(function(d){return ri(1,d-1);});
  var i;var prompt,sol,ansN;
  if(mode==="total"){
    ansN=0;for(i=0;i<3;i++)ansN+=ns[i]*(L/ds[i]);
    var ctx=pick(["smoothie","hike","craft"]);
    if(ctx==="smoothie")prompt="A smoothie uses "+u5M(ns[0],ds[0])+" of a litre of milk, "+u5M(ns[1],ds[1])+" of a litre of juice and "+u5M(ns[2],ds[2])+" of a litre of yogurt. How many litres is that in all? Give your answer as a fraction or mixed number in lowest terms.";
    else if(ctx==="hike")prompt="A class hikes "+u5M(ns[0],ds[0])+" of a kilometre, rests, hikes "+u5M(ns[1],ds[1])+" of a kilometre, rests, then hikes "+u5M(ns[2],ds[2])+" of a kilometre. How many kilometres do they hike in all? Give your answer as a fraction or mixed number in lowest terms.";
    else prompt="A craft project uses "+u5M(ns[0],ds[0])+" of a metre of red ribbon, "+u5M(ns[1],ds[1])+" of a metre of blue ribbon and "+u5M(ns[2],ds[2])+" of a metre of green ribbon. How many metres of ribbon is that in all? Give your answer as a fraction or mixed number in lowest terms.";
    sol="Rewrite all three fractions over the common denominator "+L+" and add.\\[ \\begin{aligned} "+FR(ns[0],ds[0])+" + "+FR(ns[1],ds[1])+" + "+FR(ns[2],ds[2])+" &= "+FR(ns[0]*(L/ds[0]),L)+" + "+FR(ns[1]*(L/ds[1]),L)+" + "+FR(ns[2]*(L/ds[2]),L)+" \\\\ &= "+FR(ansN,L)+" \\\\ &= "+u5disp(ansN,L)+" \\end{aligned} \\] The answer is <b>"+u5M(ansN,L)+"</b>.";
  }else{
    var used=ns[0]*(L/ds[0])+ns[1]*(L/ds[1]);var cnt=0;
    while(used>=L&&cnt<30){ns[0]=ri(1,ds[0]-1);ns[1]=ri(1,ds[1]-1);used=ns[0]*(L/ds[0])+ns[1]*(L/ds[1]);cnt++;}
    if(used>=L){ns[0]=1;ns[1]=1;used=(L/ds[0])+(L/ds[1]);}
    ansN=L-used;
    prompt="A full jug holds 1 litre of water. A class pours out "+u5M(ns[0],ds[0])+" of a litre for an experiment and "+u5M(ns[1],ds[1])+" of a litre for cleaning brushes. How many litres are left in the jug? Give your answer as a fraction or mixed number in lowest terms.";
    sol="The jug starts at 1 whole, which is \\(" +FR(L,L)+ "\\). Rewrite the amounts poured out over the common denominator "+L+" and subtract.\\[ \\begin{aligned} 1 - "+FR(ns[0],ds[0])+" - "+FR(ns[1],ds[1])+" &= "+FR(L,L)+" - "+FR(ns[0]*(L/ds[0]),L)+" - "+FR(ns[1]*(L/ds[1]),L)+" \\\\ &= "+FR(ansN,L)+" \\\\ &= "+u5disp(ansN,L)+" \\end{aligned} \\] The answer is <b>"+u5M(ansN,L)+"</b>.";
  }
  return textq(prompt,u5accept(ansN,L),sol,{mode:"three-"+mode,ns:ns,ds:ds});
}, ["Work with one common denominator for every fraction in the problem.", "Start by rewriting each fraction over the least common multiple of all the denominators."]);

E("u5-reasonable", 5, ["6.23","6.22"], 3, "var", varset([
  function(){
    return mcq("Alex adds "+u5M(1,2)+" and "+u5M(1,3)+" and gets "+u5M(2,5)+", saying he added the tops and the bottoms. What is the correct sum?",
      {t:u5M(5,6),fb:"Yes: over the common denominator 6, the sum is 3/6 + 2/6 = 5/6."},
      [{t:u5M(2,5),fb:"That is Alex's answer. Adding the tops and the bottoms is not how fractions are added."},
       {t:u5M(2,6),fb:"That keeps the common denominator but forgets to rewrite the numerators when the fractions change to sixths."},
       {t:u5M(1,6),fb:"That is the difference of the rewritten fractions. The question asks for a sum."}],
      "Rewrite both fractions over the common denominator 6.\\[ \\begin{aligned} "+FR(1,2)+" + "+FR(1,3)+" &= "+FR(3,6)+" + "+FR(2,6)+" \\\\ &= "+FR(5,6)+" \\end{aligned} \\] The correct sum is <b>"+u5M(5,6)+"</b>. Note that 2/5 is less than 1/2, so it cannot be the sum of 1/2 and a positive amount.",
      {mode:"reasonable-1"});
  },
  function(){
    return mcq("Priya says the answer to "+u5M(7,8)+" - "+u5M(1,4)+" is "+u5M(6,4)+", saying she subtracted the tops and the bottoms. What is the correct difference?",
      {t:u5M(5,8),fb:"Yes: rewriting 1/4 as 2/8 gives 7/8 - 2/8 = 5/8."},
      [{t:u5M(6,4),fb:"That is Priya's answer, and it is also bigger than the amount she started with, so it cannot be a difference here."},
       {t:u5M(6,8),fb:"That subtracts the numerators but forgets to rewrite 1/4 as eighths first."},
       {t:u5M(3,8),fb:"That rewrites 1/4 as 2/8 but then subtracts 4 instead of 2 in the numerator."}],
      "Rewrite "+u5M(1,4)+" over the denominator 8.\\[ \\begin{aligned} "+FR(7,8)+" - "+FR(1,4)+" &= "+FR(7,8)+" - "+FR(2,8)+" \\\\ &= "+FR(5,8)+" \\end{aligned} \\] The correct difference is <b>"+u5M(5,8)+"</b>.",
      {mode:"reasonable-2"});
  },
  function(){
    return mcq("A recipe needs "+u5M(3,4)+" of a cup of sugar. Ben measures "+u5M(5,4)+" of a cup and says that is exactly right. Which statement best explains the check?",
      {t:"Ben measured too much: 5/4 is more than one whole cup, and 3/4 is less than one whole cup.",fb:"Yes: comparing each amount with the benchmark of one whole cup shows 5/4 is too much."},
      [{t:"Ben is right: 5/4 and 3/4 have the same denominator, so they are equal, whatever the numerators.",fb:"Sharing a denominator does not make fractions equal. The numerators 5 and 3 are different."},
       {t:"Ben measured too little: 5/4 is smaller than 3/4 because 5 is more than 3, by that reasoning.",fb:"With the same denominator, a larger numerator means a larger fraction, not a smaller one."},
       {t:"There is no way to compare the amounts without a common denominator in this question.",fb:"The denominators already match here, and comparing with one whole cup settles it."}],
      "Compare both amounts with one whole cup. "+u5M(3,4)+" is less than one whole cup, while "+u5M(5,4)+" is one whole cup plus "+u5M(1,4)+". So <b>Ben measured too much</b>.",
      {mode:"reasonable-3"});
  },
  function(){
    return mcq("Mia calculates "+"\\("+u5disp(9,4)+"\\)"+" - "+"\\("+u5disp(5,4)+"\\)"+" and writes the answer as "+u5M(4,8)+". What is the correct answer in lowest terms?",
      {t:u5M(1,1),fb:"Yes: the difference is 4/4, which is exactly one whole."},
      [{t:"\\(\\frac{4}{8}\\)",fb:"That is Mia's answer. She changed the denominator to 8, but the parts are quarters and stay quarters."},
       {t:"\\(\\frac{2}{4}\\)",fb:"That uses the numerator 2, but 9 - 5 = 4, not 2."},
       {t:u5M(14,4),fb:"That adds the numerators, giving 14/4. The question asks for a difference, so the numerators are subtracted."}],
      "Subtract the whole numbers and the fraction parts, or work in quarters throughout.\\[ \\begin{aligned} "+u5disp(9,4)+" - "+u5disp(5,4)+" &= "+FR(4,4)+" \\\\ &= 1 \\end{aligned} \\] The correct answer is <b>1</b>.",
      {mode:"reasonable-4"});
  },
  function(){
    return mcq("A tank is "+u5M(5,6)+" full. Noah says that after using "+u5M(1,3)+" of the tank, the amount left must be more than "+u5M(5,6)+", because subtraction makes fractions bigger. What is the correct amount left?",
      {t:u5M(1,2),fb:"Yes: rewriting 1/3 as 2/6 gives 5/6 - 2/6 = 3/6 = 1/2, which is less than 5/6 as it should be."},
      [{t:u5M(7,6),fb:"That adds the rewritten amounts. Using part of the tank makes the amount smaller, not larger."},
       {t:u5M(4,6),fb:"That subtracts the numerators without rewriting 1/3 as sixths first."},
       {t:u5M(5,6),fb:"That is the starting amount. Some of the tank was used, so the amount left must be smaller."}],
      "Rewrite "+u5M(1,3)+" over the denominator 6.\\[ \\begin{aligned} "+FR(5,6)+" - "+FR(1,3)+" &= "+FR(5,6)+" - "+FR(2,6)+" \\\\ &= "+FR(3,6)+" \\\\ &= "+u5disp(3,6)+" \\end{aligned} \\] The amount left is <b>"+u5M(3,6)+"</b>.",
      {mode:"reasonable-5"});
  }
]), ["Check the claim against a benchmark or by redoing the calculation with a common denominator.", "Start by asking whether the claimed answer is even the right size for the question."]);

E("u5-mixed-multistep", 5, ["6.23","6.21"], 3, "gen", function(){
  var d=pick([4,5,6,8,10,12]);
  var mode=pick(["used-two","add-then-cut"]);
  var N,prompt,sol,A,B,C;
  if(mode==="used-two"){
    var w0=ri(5,8);var n0=ri(0,d-1);var wA=ri(1,2),nA=ri(1,d-1),wB=ri(0,2),nB=ri(1,d-1);
    var start=w0*d+n0,used=wA*d+nA+wB*d+nB;var cnt=0;
    while(used>=start&&cnt<30){nA=ri(1,d-1);nB=ri(1,d-1);used=wA*d+nA+wB*d+nB;cnt++;}
    if(used>=start){nA=1;nB=1;used=wA*d+1+wB*d+1;}
    N=start-used;A=u5disp(start,d);B=u5disp(wA*d+nA,d);C=u5disp(wB*d+nB,d);
    var item=pick(["ribbon","wire","string"]);
    prompt="A roll of "+item+" is "+"\\("+A+"\\)"+" metres long. A class uses "+"\\("+B+"\\)"+" metres on Monday and "+"\\("+C+"\\)"+" metres on Wednesday. How many metres are left? Give your answer as a fraction or mixed number in lowest terms.";
    sol="Add the two amounts used, then subtract the total from the starting length.\\[ \\begin{aligned} "+B+" + "+C+" &= "+u5disp(used,d)+" \\\\ "+A+" - "+u5disp(used,d)+" &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  }else{
    var wA2=ri(2,4),nA2=ri(1,d-1),wB2=ri(1,3),nB2=ri(1,d-1),wC2=ri(1,2),nC2=ri(1,d-1);
    var tot=(wA2+wB2)*d+nA2+nB2;var cut=wC2*d+nC2;var cnt2=0;
    while(cut>=tot&&cnt2<30){nC2=ri(1,d-1);cut=wC2*d+nC2;cnt2++;}
    if(cut>=tot){nC2=1;cut=wC2*d+1;}
    N=tot-cut;A=u5disp(wA2*d+nA2,d);B=u5disp(wB2*d+nB2,d);C=u5disp(wC2*d+nC2,d);
    prompt="Two boards measuring "+"\\("+A+"\\)"+" metres and "+"\\("+B+"\\)"+" metres are joined end to end. Then a piece "+"\\("+C+"\\)"+" metres long is cut off the joined board. How many metres are left? Give your answer as a fraction or mixed number in lowest terms.";
    sol="Joining the boards is an addition, and cutting a piece off is a subtraction.\\[ \\begin{aligned} "+A+" + "+B+" &= "+u5disp(tot,d)+" \\\\ "+u5disp(tot,d)+" - "+C+" &= "+u5disp(N,d)+" \\end{aligned} \\] The answer is <b>"+u5M(N,d)+"</b>.";
  }
  return textq(prompt,u5accept(N,d),sol,{mode:"mixed-multistep-"+mode,d:d});
}, ["This problem has two steps: combine amounts first, or add the amounts used before subtracting.", "Start by deciding which operation the first step of the story calls for."]);

/* Bimodal build additions (Nov 19, 2026): two selected-response generators for Unit 5, on the thinnest indicators 6.13, 6.14, 6.18 and 6.19. SME-flagged for the specialist pass. */
E("u5-add-model-total", 5, ["6.13","6.14"], 2, "gen", function(){
  for(var att=0; att<200; att++){
    var d=pick([6,7,8,9]); var a=ri(2,d-2); var b=ri(1,d-1-a); var s=a+b; var diff=Math.abs(a-b);
    if(s<3||s+1>=d) continue;
    if(u5gcd(a,d)!==1||u5gcd(b,d)!==1) continue;
    if(diff<1||diff===s||diff===s-1||diff===s+1) continue;
    var ctx=pick(["trail","recipe","jug","garden"]);
    var prompt;
    if(ctx==="trail") prompt="A hiker walks "+u5M(a,d)+" of a trail in the morning and "+u5M(b,d)+" of the trail in the afternoon. What fraction of the trail did the hiker walk in all?";
    else if(ctx==="recipe") prompt="A recipe uses "+u5M(a,d)+" of a cup of oats and then another "+u5M(b,d)+" of a cup of oats. How many cups of oats is that in all?";
    else if(ctx==="jug") prompt="A jug holds "+u5M(a,d)+" of a litre of juice. Another "+u5M(b,d)+" of a litre is poured in. How much juice is in the jug now?";
    else prompt="A gardener waters "+u5M(a,d)+" of a garden bed in the morning and "+u5M(b,d)+" of the bed in the afternoon. What fraction of the bed is watered in all?";
    var sol="Both fractions count parts of the same size, since each whole is split into "+d+" equal parts. Add the numerators and keep the denominator.\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d);
    var rr=u5red(s,d); if(rr[0]!==s||rr[1]!==d) sol+=" \\\\ &= "+u5disp(s,d);
    sol+=" \\end{aligned} \\] The answer is <b>"+u5M(s,d)+"</b>.";
    return mcq(prompt,
      {t:u5M(s,d), fb:"Yes: "+a+" parts plus "+b+" parts gives "+s+" parts, and the part size does not change."},
      [{t:u5M(diff,d), fb:"That subtracts the numerators. The question asks for the total, so the numerators are added."},
       {t:u5M(s-1,d), fb:"That counts one part too few: "+a+" + "+b+" = "+s+", not "+(s-1)+"."},
       {t:u5M(s+1,d), fb:"That counts one part too many: "+a+" + "+b+" = "+s+", not "+(s+1)+"."}],
      sol, {mode:"add-model-total", a:a, b:b, d:d});
  }
  return mcq("A hiker walks "+u5M(3,8)+" of a trail in the morning and "+u5M(2,8)+" of the trail in the afternoon. What fraction of the trail did the hiker walk in all?",
    {t:u5M(5,8), fb:"Yes: 3 parts plus 2 parts gives 5 parts of size 8."},
    [{t:u5M(1,8), fb:"That subtracts the numerators."}, {t:u5M(4,8), fb:"That counts one part too few."}, {t:u5M(6,8), fb:"That counts one part too many."}],
    "Add the numerators and keep the denominator.\\[ \\begin{aligned} "+FR(3,8)+" + "+FR(2,8)+" &= "+FR(5,8)+" \\end{aligned} \\] The answer is <b>"+u5M(5,8)+"</b>.",
    {mode:"add-model-total-fallback"});
}, ["The denominators match, so the parts are the same size.", "Start by adding the numerators and keeping the denominator the same."]);

E("u5-sub-write-equation", 5, ["6.18","6.19"], 2, "gen", function(){
  for(var att=0; att<200; att++){
    var d=pick([6,7,8,9]); var n=ri(4,d-1); var c=ri(1,n-2); var s=n-c;
    if(n+c>9) continue;
    if(c===s) continue;
    var shape=pick(["strip","fraction circle","bar"]);
    var keyEq="\\("+FR(n,d)+" - "+FR(c,d)+" = "+FR(s,d)+"\\)";
    var prompt="A "+shape+" is split into "+d+" equal parts. At first "+n+" parts are shaded. Then "+c+" of the shaded parts "+(c===1?"is":"are")+" crossed out. Which equation records this model?";
    var sol="The shaded parts give the starting amount, \\("+FR(n,d)+"\\). Crossing out "+c+" part"+(c===1?"":"s")+" records taking away \\("+FR(c,d)+"\\), which leaves "+s+" parts. The equation is <b>"+keyEq+"</b>.";
    var q=mcq(prompt,
      {t:keyEq, fb:"Yes: the model starts at "+n+"/"+d+", removes "+c+"/"+d+", and leaves "+s+"/"+d+"."},
      [{t:"\\("+FR(n,d)+" + "+FR(c,d)+" = "+FR(n+c,d)+"\\)", fb:"That adds the crossed out parts. Crossed out parts are taken away, so the model is a subtraction."},
       {t:"\\("+FR(d,d)+" - "+FR(c,d)+" = "+FR(d-c,d)+"\\)", fb:"That starts from the whole "+shape+". The model starts from the "+n+" shaded parts."},
       {t:"\\("+FR(n,d)+" - "+FR(s,d)+" = "+FR(c,d)+"\\)", fb:"That subtracts the amount left instead of the amount crossed out."}],
      sol, {mode:"sub-write-equation", n:n, c:c, d:d});
    q.figure=u5barsSVG([{n:n, d:d, label:n+"/"+d+" shaded, "+c+" crossed out", cross:c}]);
    return q;
  }
  var keyF="\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,8)+"\\)";
  var qf=mcq("A strip is split into 8 equal parts. At first 5 parts are shaded. Then 2 of the shaded parts are crossed out. Which equation records this model?",
    {t:keyF, fb:"Yes: the model starts at 5/8, removes 2/8, and leaves 3/8."},
    [{t:"\\("+FR(5,8)+" + "+FR(2,8)+" = "+FR(7,8)+"\\)", fb:"That adds the crossed out parts."},
     {t:"\\("+FR(8,8)+" - "+FR(2,8)+" = "+FR(6,8)+"\\)", fb:"That starts from the whole strip."},
     {t:"\\("+FR(5,8)+" - "+FR(3,8)+" = "+FR(2,8)+"\\)", fb:"That subtracts the amount left instead of the amount crossed out."}],
    "The shaded parts give the starting amount, "+u5M(5,8)+". Crossing out 2 parts records taking away "+u5M(2,8)+", which leaves 3 parts. The equation is <b>"+keyF+"</b>.",
    {mode:"sub-write-equation-fallback"});
  qf.figure=u5barsSVG([{n:5, d:8, label:"5/8 shaded, 2 crossed out", cross:2}]);
  return qf;
}, ["The shaded parts are the starting amount, and the crossed out parts are taken away.", "Start by writing the starting fraction, then subtract the crossed out fraction."]);

/* ----- bank-u6.js ----- */
// Math 7 Unit 6 Equations question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 2652 to 3191).
// CRMARKS: u6-problem-two-step-cr=3
// CRMARKS: u6-one-step-problem-cr=3
// CRMARKS: u6-preservation-problem-cr=2
// CRMARKS: u6-model-solve-cr=3
// CRMARKS: u6-solve-challenge-cr=3
/* ===== Unit 6 ===== */
/* Unit 6: Equations (codes 8.1-8.17 as placed in the Unit 6 slice) */
function u6iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;v=Math.round(v);if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr-2,corr+10,corr-10,corr+3].forEach(function(v){tryAdd(v,"That value does not satisfy the equation. Try the inverse operations in the solution.");});
  return out;
}
function u6balanceSVG(leftLabel,rightLabel,note){
  var out='<svg viewBox="0 0 340 170" xmlns="http://www.w3.org/2000/svg" role="img">';
  out+='<line x1="40" y1="52" x2="300" y2="52" stroke="'+FIG_INK+'" stroke-width="3"/>';
  out+='<circle cx="170" cy="52" r="5" fill="'+FIG_INK+'"/>';
  out+='<polygon points="170,60 146,108 194,108" fill="none" stroke="'+FIG_INK+'" stroke-width="2.5"/>';
  out+='<line x1="110" y1="108" x2="230" y2="108" stroke="'+FIG_INK+'" stroke-width="2.5"/>';
  out+='<line x1="70" y1="52" x2="58" y2="82" stroke="'+FIG_INK+'" stroke-width="1.8"/><line x1="70" y1="52" x2="82" y2="82" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<path d="M 44 82 A 26 10 0 0 0 96 82" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<line x1="270" y1="52" x2="258" y2="82" stroke="'+FIG_INK+'" stroke-width="1.8"/><line x1="270" y1="52" x2="282" y2="82" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<path d="M 244 82 A 26 10 0 0 0 296 82" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<text x="70" y="34" font-size="15" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+leftLabel+'</text>';
  out+='<text x="270" y="34" font-size="15" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+rightLabel+'</text>';
  out+='<text x="170" y="140" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+(note||"The beam is level: the two pans balance.")+'</text>';
  return out+'</svg>';
}
function u6numLineSVG(min,max,marks,jumpFrom,jumpTo,jumpLabel){
  var W=340,x0=25,x1=315;function X(v){return x0+(v-min)*(x1-x0)/(max-min);}
  var out='<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" role="img">';
  out+='<line x1="'+x0+'" y1="78" x2="'+x1+'" y2="78" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="'+x1+',78 '+(x1-8)+',73 '+(x1-8)+',83" fill="'+FIG_INK+'"/>';
  for(var v=min;v<=max;v++){out+='<line x1="'+fmt(X(v),1)+'" y1="73" x2="'+fmt(X(v),1)+'" y2="83" stroke="'+FIG_INK+'" stroke-width="1.4"/><text x="'+fmt(X(v),1)+'" y="100" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+v+'</text>';}
  marks.forEach(function(m){out+='<circle cx="'+fmt(X(m.v),1)+'" cy="78" r="4.5" fill="'+FIG_ALT+'"/><text x="'+fmt(X(m.v),1)+'" y="58" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+m.label+'</text>';});
  if(jumpFrom!==null&&jumpFrom!==undefined){
    out+='<path d="M '+fmt(X(jumpFrom),1)+' 62 Q '+fmt((X(jumpFrom)+X(jumpTo))/2,1)+' 26 '+fmt(X(jumpTo),1)+' 62" fill="none" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+='<polygon points="'+fmt(X(jumpTo),1)+',62 '+fmt(X(jumpTo)-5,1)+',52 '+fmt(X(jumpTo)+5,1)+',52" fill="'+FIG_ACC+'"/>';
    out+='<text x="'+fmt((X(jumpFrom)+X(jumpTo))/2,1)+'" y="20" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+jumpLabel+'</text>';
  }
  return out+'</svg>';
}

E("u6-inspection-trial", 6, ["8.14"], 1, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["times","plus","trial"]);
  var a,x,b,sol,prompt,errs;
  if(mode==="times"){
    a=ri(2,9);x=ri(2,12);b=a*x;
    prompt="Solve \\("+a+v+" = "+b+"\\) by inspection.";
    sol="Inspection means finding the value that makes the equation true: "+a+" times what equals "+b+"?\\[ \\begin{aligned} "+a+v+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b-a,fb:"That subtracts "+a+" from "+b+". In "+a+v+", the variable is multiplied by "+a+", so divide instead."},{v:x+1,fb:"Check it: "+a+" times "+(x+1)+" is "+(a*(x+1))+", not "+b+"."},{v:b+a,fb:"That adds "+a+" to "+b+", which makes the value far too large."}];
    return mcq(prompt,{t:String(x),fb:"Yes: "+a+" times "+x+" equals "+b+", so the equation is true."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }else if(mode==="plus"){
    a=ri(2,15);x=ri(2,15);b=x+a;
    prompt="Solve \\("+v+" + "+a+" = "+b+"\\) by inspection.";
    sol="Find the value that makes the equation true: what plus "+a+" equals "+b+"?\\[ \\begin{aligned} "+v+" + "+a+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b+a,fb:"That adds "+a+" to "+b+". The value added to "+a+" must be smaller than "+b+" here."},{v:x+1,fb:"Check it: "+(x+1)+" + "+a+" is "+(x+1+a)+", not "+b+"."},{v:a,fb:"That is the number added to the variable, not the value of the variable."}];
    return mcq(prompt,{t:String(x),fb:"Yes: "+x+" + "+a+" equals "+b+", so the equation is true."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }
  a=ri(2,6);x=ri(3,9);b=ri(1,10);var c=a*x+b;
  var t1=x-1,t2=x+1;
  prompt="A student solves \\("+a+v+" + "+b+" = "+c+"\\) by systematic trial. Trial \\("+v+" = "+t1+"\\) gives a left side of "+(a*t1+b)+". Trial \\("+v+" = "+t2+"\\) gives a left side of "+(a*t2+b)+". What is the solution?";
  sol="The left side must equal "+c+". The trial "+t1+" gives "+(a*t1+b)+", which is too small, and the trial "+t2+" gives "+(a*t2+b)+", which is too large, so the solution lies between them.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+"("+x+") + "+b+" &= "+(a*x+b)+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.";
  errs=[{v:t1,fb:"That trial gives a left side of "+(a*t1+b)+", not "+c+", so it is too small."},{v:t2,fb:"That trial gives a left side of "+(a*t2+b)+", not "+c+", so it is too large."},{v:x+2,fb:"The trials bracket the answer between "+t1+" and "+t2+", so it cannot be as large as "+(x+2)+"."}];
  return mcq(prompt,{t:String(x),fb:"Yes: substituting "+x+" makes the left side equal "+c+"."},u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
}, ["Inspection means finding the value that makes the equation true, and trial means testing values in order.", "Start by asking what value, placed in the equation, makes the two sides equal."]);

E("u6-preservation-next", 6, ["8.1","8.2"], 1, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["plus","minus","times"]);
  var prompt,corr,distr,sol;
  if(mode==="plus"){
    var a=ri(2,12),b=ri(a+2,a+16);
    prompt="To solve \\("+v+" + "+a+" = "+b+"\\), which step isolates \\("+v+"\\) and keeps the equation balanced?";
    corr={t:"Subtract "+a+" from both sides.",fb:"Yes: subtracting the same amount from both sides keeps the balance and leaves "+v+" alone on its side."};
    distr=[{t:"Subtract "+a+" from the left only.",fb:"That changes only one side, so the two sides would no longer be equal."},
           {t:"Add "+a+" to both sides.",fb:"That keeps the balance, but it moves away from isolating "+v+": the left side would become "+v+" + "+(2*a)+"."},
           {t:"Subtract "+b+" from both sides.",fb:"That keeps the balance, but it does not remove the "+a+" that is added to "+v+"."}];
    sol="Preservation of equality: whatever is done to one side must be done to the other. The "+a+" added to "+v+" is undone by subtracting "+a+", and it must happen on both sides.\\[ \\begin{aligned} "+v+" + "+a+" - "+a+" &= "+b+" - "+a+" \\\\ "+v+" &= "+(b-a)+" \\end{aligned} \\] The step is <b>subtract "+a+" from both sides</b>.";
  }else if(mode==="minus"){
    var a2=ri(2,12),b2=ri(2,16);if(b2===a2)b2=a2+3;
    prompt="To solve \\("+v+" - "+a2+" = "+b2+"\\), which step isolates \\("+v+"\\) and keeps the equation balanced?";
    corr={t:"Add "+a2+" to both sides.",fb:"Yes: adding the same amount to both sides keeps the balance and leaves "+v+" alone on its side."};
    distr=[{t:"Add "+a2+" to the right only.",fb:"That changes only one side, so the two sides would no longer be equal."},
           {t:"Subtract "+a2+" from both sides.",fb:"That keeps the balance, but it moves away from isolating "+v+": the left side would become "+v+" - "+(2*a2)+"."},
           {t:"Add "+b2+" to both sides.",fb:"That keeps the balance, but it does not remove the "+a2+" that is subtracted from "+v+"."}];
    sol="Preservation of equality: whatever is done to one side must be done to the other. The "+a2+" subtracted from "+v+" is undone by adding "+a2+", and it must happen on both sides.\\[ \\begin{aligned} "+v+" - "+a2+" + "+a2+" &= "+b2+" + "+a2+" \\\\ "+v+" &= "+(b2+a2)+" \\end{aligned} \\] The step is <b>add "+a2+" to both sides</b>.";
  }else{
    var a3=ri(2,9),x3=ri(2,12),b3=a3*x3;
    prompt="To solve \\("+a3+v+" = "+b3+"\\), which step isolates \\("+v+"\\) and keeps the equation balanced?";
    corr={t:"Divide both sides by "+a3+".",fb:"Yes: dividing both sides by the same number keeps the balance and leaves "+v+" alone on its side."};
    distr=[{t:"Divide the left by "+a3+" only.",fb:"That changes only one side, so the two sides would no longer be equal."},
           {t:"Multiply both sides by "+a3+".",fb:"That keeps the balance, but it moves away from isolating "+v+": the left side would become "+(a3*a3)+v+"."},
           {t:"Subtract "+a3+" from both sides.",fb:"In "+a3+v+" the variable is multiplied by "+a3+", and subtraction does not undo multiplication."}];
    sol="Preservation of equality: whatever is done to one side must be done to the other. The multiplication by "+a3+" is undone by dividing by "+a3+", and it must happen on both sides.\\[ \\begin{aligned} "+a3+v+" \\div "+a3+" &= "+b3+" \\div "+a3+" \\\\ "+v+" &= "+x3+" \\end{aligned} \\] The step is <b>divide both sides by "+a3+"</b>.";
  }
  return mcq(prompt,corr,distr,sol,{mode:mode});
}, ["An equation stays balanced only when the same operation is applied to both sides.", "Start by spotting the operation attached to the variable, then choose its inverse on both sides."]);

E("u6-one-step-balance", 6, ["8.9","8.8"], 1, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,9),x=ri(2,12),b=x+a;
  var q=mcq("The balance in the diagram models the equation \\("+v+" + "+a+" = "+b+"\\). What is the value of \\("+v+"\\)?",
    {t:String(x),fb:"Yes: removing "+a+" from both pans leaves "+v+" alone against "+b+" - "+a+" = "+x+"."},
    u6iopts(x,[{v:b+a,fb:"That adds the two numbers on the pans. The "+a+" beside "+v+" must be removed, not added."},{v:x+1,fb:"Check the pans: "+b+" - "+a+" = "+x+", not "+(x+1)+"."},{v:a,fb:"That is the amount on the pan beside "+v+", not the value of "+v+" itself."}]),
    "The diagram shows "+v+" with "+a+" on one pan balancing "+b+" on the other. Remove "+a+" from both pans to keep the balance.\\[ \\begin{aligned} "+v+" + "+a+" &= "+b+" \\\\ "+v+" &= "+b+" - "+a+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>.",
    {mode:"one-step-balance",a:a,b:b});
  q.figure=u6balanceSVG(v+" + "+a,String(b));
  return q;
}, ["The pans balance, so removing the same amount from both pans keeps them balanced.", "Start by removing the loose number beside the variable from both pans."]);

E("u6-substitute-check", 6, ["8.17","8.11"], 1, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["plus","twostep"]);
  var prompt,sol,corr,errs,lhs;
  if(mode==="plus"){
    var a=ri(2,14),b=ri(6,24),x=b-a;var cand=(pick([true,false])?x:x+pick([1,2,-1]));
    if(cand<0)cand=x+1;
    lhs=cand+a;
    prompt="Substitute \\("+v+" = "+cand+"\\) into the equation \\("+v+" + "+a+" = "+b+"\\). What is the value of the left side?";
    corr={t:String(lhs),fb:"Yes: replacing "+v+" with "+cand+" gives "+cand+" + "+a+" = "+lhs+"." };
    errs=[{v:cand-a,fb:"That subtracts "+a+". The equation adds "+a+" to the variable, so add."},{v:b,fb:"That is the right side of the equation. The question asks for the value of the left side after substituting."},{v:cand*a,fb:"That multiplies by "+a+". The equation adds "+a+" to the variable, so add."}];
    sol="Substitution means replacing the variable with the given value wherever it appears.\\[ \\begin{aligned} "+v+" + "+a+" &= "+cand+" + "+a+" \\\\ &= "+lhs+" \\end{aligned} \\] The left side is <b>"+lhs+"</b>, so "+cand+" is "+(lhs===b?"":"not ")+"a solution of the equation.";
    return mcq(prompt,corr,u6iopts(lhs,errs),sol,{mode:mode,cand:cand});
  }
  var a2=ri(2,6),b2=ri(1,10),x2=ri(2,10),c2=a2*x2+b2;var cand2=(pick([true,false])?x2:x2+pick([1,2]));
  lhs=a2*cand2+b2;
  prompt="Substitute \\("+v+" = "+cand2+"\\) into the equation \\("+a2+v+" + "+b2+" = "+c2+"\\). What is the value of the left side?";
  corr={t:String(lhs),fb:"Yes: replacing "+v+" with "+cand2+" gives "+a2+"("+cand2+") + "+b2+" = "+lhs+"." };
  errs=[{v:a2*cand2-b2,fb:"That subtracts "+b2+" at the end. The equation adds "+b2+", so add it."},{v:(a2+b2)*cand2,fb:"That adds the coefficient and the constant first. Multiply "+a2+" by "+cand2+" first, then add "+b2+"."},{v:c2,fb:"That is the right side of the equation. The question asks for the value of the left side after substituting."}];
  sol="Substitution means replacing the variable with the given value wherever it appears, then following the order of operations.\\[ \\begin{aligned} "+a2+v+" + "+b2+" &= "+a2+"("+cand2+") + "+b2+" \\\\ &= "+(a2*cand2)+" + "+b2+" \\\\ &= "+lhs+" \\end{aligned} \\] The left side is <b>"+lhs+"</b>, so "+cand2+" is "+(lhs===c2?"":"not ")+"a solution of the equation.";
  return mcq(prompt,corr,u6iopts(lhs,errs),sol,{mode:mode,cand:cand2});
}, ["Substitution means replacing the variable with the given value everywhere it appears.", "Start by rewriting the left side with the given value in place of the variable."]);

E("u6-solve-two-step-plus", 6, ["8.14"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);var a=ri(2,9),x=ri(2,12),b=ri(2,15),c=a*x+b;
  var ctx=pick(["pure","gym","books"]);
  var prompt;
  if(ctx==="gym")prompt="A gym charges a joining fee of $"+b+" plus $"+a+" per class. A member pays $"+c+" in total. The number of classes, \\("+v+"\\), satisfies \\("+a+v+" + "+b+" = "+c+"\\). How many classes did the member take?";
  else if(ctx==="books")prompt="A book club charges $"+b+" for shipping plus $"+a+" per book. A member pays $"+c+" in total. The number of books, \\("+v+"\\), satisfies \\("+a+v+" + "+b+" = "+c+"\\). How many books did the member order?";
  else prompt="Solve \\("+a+v+" + "+b+" = "+c+"\\).";
  var sol="Undo the addition first, then undo the multiplication, doing the same to both sides each time.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c-b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Check: "+a+"("+x+") + "+b+" = "+c+".";
  return mcq(prompt,{t:String(x),fb:"Yes: subtracting "+b+" leaves "+a+v+" = "+(c-b)+", and dividing by "+a+" gives "+x+"."},
    u6iopts(x,[{v:c-b,fb:"That subtracts "+b+" but stops before dividing by "+a+". One more step is needed."},{v:x+a,fb:"Check it in the equation: "+a+"("+ (x+a) +") + "+b+" is more than "+c+"."},{v:Math.floor((c+b)/a),fb:"That adds "+b+" instead of subtracting it before dividing."}]),
    sol,{mode:"ax-plus-b",a:a,b:b});
}, ["Undo the operations in reverse order: the added number first, then the multiplier.", "Start by subtracting the added number from both sides."]);

E("u6-solve-other-forms", 6, ["8.14","8.2"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["minus","divide"]);
  var prompt,sol,corr,errs;
  if(mode==="minus"){
    var a=ri(2,9),x=ri(3,12),b=ri(2,a*x-2),c=a*x-b;
    prompt="Solve \\("+a+v+" - "+b+" = "+c+"\\).";
    sol="Undo the subtraction first, then undo the multiplication, doing the same to both sides each time.\\[ \\begin{aligned} "+a+v+" - "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c+b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Check: "+a+"("+x+") - "+b+" = "+c+".";
    corr={t:String(x),fb:"Yes: adding "+b+" leaves "+a+v+" = "+(c+b)+", and dividing by "+a+" gives "+x+"." };
    errs=[{v:c+b,fb:"That adds "+b+" but stops before dividing by "+a+". One more step is needed."},{v:Math.max(1,Math.floor((c-b)/a)),fb:"That subtracts "+b+" instead of adding it back before dividing."},{v:x+2,fb:"Check it in the equation: "+a+"("+(x+2)+") - "+b+" is more than "+c+"." }];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
  }
  var a2=ri(2,9),x2=ri(2,12),b2=x2;
  prompt="Solve \\(\\frac{"+v+"}{"+a2+"} = "+b2+"\\).";
  sol="The variable is divided by "+a2+", so undo the division by multiplying both sides by "+a2+".\\[ \\begin{aligned} \\frac{"+v+"}{"+a2+"} &= "+b2+" \\\\ "+v+" &= "+b2+" \\times "+a2+" \\\\ "+v+" &= "+(a2*b2)+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+(a2*b2)+"\\)</b>. Check: "+(a2*b2)+" divided by "+a2+" is "+b2+".";
  corr={t:String(a2*b2),fb:"Yes: multiplying both sides by "+a2+" gives "+v+" = "+b2+" times "+a2+" = "+(a2*b2)+"." };
  errs=[{v:b2+a2,fb:"That adds the divisor. The variable is divided by "+a2+", so multiply to undo it."},{v:b2,fb:"That is the result after division, not the value of the variable itself."},{v:Math.max(1,b2-a2),fb:"That subtracts the divisor. The variable is divided by "+a2+", so multiply to undo it."}];
  return mcq(prompt,corr,u6iopts(a2*b2,errs),sol,{mode:mode,a:a2});
}, ["Look at the form of the equation and undo each operation with its inverse, on both sides.", "Start by undoing the addition or subtraction, or by undoing the division if the variable is divided."]);

E("u6-equivalent-form", 6, ["8.3"], 1, "gen", function(){
  var v=pick(["x","n","m","y","b","r"]);
  var mode=pick(["add","subtract","multiply"]);
  var a=ri(2,8),x=ri(2,10),rhs=a*x;
  var base="\\("+a+v+" = "+rhs+"\\)";
  var prompt,corr,distr,sol;
  if(mode==="add"){
    var k=ri(2,12);
    prompt="Which equation is equivalent to "+base+" after applying the preservation of equality?";
    corr={t:"\\("+a+v+" + "+k+" = "+(rhs+k)+"\\)",fb:"Yes: "+k+" is added to both sides, so the equation stays balanced with the same solution."};
    distr=[{t:"\\("+a+v+" + "+k+" = "+rhs+"\\)",fb:"That adds "+k+" to the left side only. Both sides must change in the same way."},
           {t:"\\("+a+v+" = "+(rhs+k)+"\\)",fb:"That adds "+k+" to the right side only. Both sides must change in the same way."},
           {t:"\\("+a+v+" - "+k+" = "+(rhs+k)+"\\)",fb:"That subtracts on one side and adds on the other, so the sides are no longer equal."}];
    sol="An equivalent equation comes from doing exactly the same thing to both sides. Adding "+k+" to both sides of "+base+" gives \\("+a+v+" + "+k+" = "+(rhs+k)+"\\) , and both forms have the same solution, \\("+v+" = "+x+"\\). The answer is <b>\\("+a+v+" + "+k+" = "+(rhs+k)+"\\)</b>.";
  }else if(mode==="subtract"){
    var k2=ri(2,Math.min(12,rhs-2));
    prompt="Which equation is equivalent to "+base+" after applying the preservation of equality?";
    corr={t:"\\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\)",fb:"Yes: "+k2+" is subtracted from both sides, so the equation stays balanced with the same solution."};
    distr=[{t:"\\("+a+v+" - "+k2+" = "+rhs+"\\)",fb:"That subtracts "+k2+" from the left side only. Both sides must change in the same way."},
           {t:"\\("+a+v+" = "+(rhs-k2)+"\\)",fb:"That subtracts "+k2+" from the right side only. Both sides must change in the same way."},
           {t:"\\("+a+v+" + "+k2+" = "+(rhs-k2)+"\\)",fb:"That adds on one side and subtracts on the other, so the sides are no longer equal."}];
    sol="An equivalent equation comes from doing exactly the same thing to both sides. Subtracting "+k2+" from both sides of "+base+" gives \\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\) , and both forms have the same solution, \\("+v+" = "+x+"\\). The answer is <b>\\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\)</b>.";
  }else{
    var k3=ri(2,5);
    prompt="Which equation is equivalent to "+base+" after applying the preservation of equality?";
    corr={t:"\\("+(a*k3)+v+" = "+(rhs*k3)+"\\)",fb:"Yes: both sides are multiplied by "+k3+", so the equation stays balanced with the same solution."};
    distr=[{t:"\\("+(a*k3)+v+" = "+rhs+"\\)",fb:"That multiplies the left side only. Both sides must change in the same way."},
           {t:"\\("+a+v+" = "+(rhs*k3)+"\\)",fb:"That multiplies the right side only. Both sides must change in the same way."},
           {t:"\\("+(a+k3)+v+" = "+(rhs+k3)+"\\)",fb:"That adds "+k3+" to each side instead of multiplying. Adding gives a different equivalent form than the multiplier shown on the left."}];
    sol="An equivalent equation comes from doing exactly the same thing to both sides. Multiplying both sides of "+base+" by "+k3+" gives \\("+(a*k3)+v+" = "+(rhs*k3)+"\\) , and both forms have the same solution, \\("+v+" = "+x+"\\). The answer is <b>\\("+(a*k3)+v+" = "+(rhs*k3)+"\\)</b>.";
  }
  return mcq(prompt,corr,distr,sol,{mode:mode,a:a});
}, ["Equivalent equations come from doing exactly the same operation to both sides.", "Start by checking each choice for whether both sides were changed in the same way."]);

E("u6-balance-figure", 6, ["8.1","8.13","8.3"], 1, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,6),x=ri(2,10),b=ri(2,9),c=a*x+b;
  var q=mcq("The balance in the diagram models \\("+a+v+" + "+b+" = "+c+"\\). The "+b+" loose units are removed from both pans. Which equation shows the result?",
    {t:"\\("+a+v+" = "+(c-b)+"\\)",fb:"Yes: removing "+b+" from both pans leaves "+a+v+" on one pan balancing "+(c-b)+" on the other."},
    [{t:"\\("+a+v+" + "+b+" = "+(c-b)+"\\)",fb:"That removes the units from the right pan only. Both pans must lose the same amount."},
     {t:"\\("+a+v+" = "+c+"\\)",fb:"That removes the units from the left pan only. Both pans must lose the same amount."},
     {t:"\\("+a+v+" + "+(2*b)+" = "+(c+b)+"\\)",fb:"That adds units to the pans. The diagram step removes units from both pans."}],
    "Removing the same amount from both pans keeps the balance and gives an equivalent equation.\\[ \\begin{aligned} "+a+v+" + "+b+" - "+b+" &= "+c+" - "+b+" \\\\ "+a+v+" &= "+(c-b)+" \\end{aligned} \\] The resulting equation is <b>\\("+a+v+" = "+(c-b)+"\\)</b>.",
    {mode:"balance-figure",a:a,b:b});
  q.figure=u6balanceSVG(a+v+" + "+b,String(c));
  return q;
}, ["A balance stays level when the same amount is removed from both pans.", "Start by subtracting the loose units from the amount shown on each pan."]);

E("u6-model-problem", 6, ["8.12"], 2, "gen", function(){
  var a=ri(2,9),b=ri(2,15);var cnt=0;while(a===b&&cnt<20){b=ri(2,15);cnt++;}
  if(a===b)b=a+3;
  var x=ri(3,12),c=a*x+b;
  var tpl=pick([
    {p:"A taxi ride costs a pickup fee of $"+b+" plus $"+a+" per kilometre. A ride costs $"+c+" in total. Let \\(x\\) be the number of kilometres.",u:"kilometres"},
    {p:"A gardener charges a call-out fee of $"+b+" plus $"+a+" per planter. A job costs $"+c+" in total. Let \\(x\\) be the number of planters.",u:"planters"},
    {p:"A streaming plan costs $"+b+" to join plus $"+a+" per movie rental. A member pays $"+c+" in total. Let \\(x\\) be the number of rentals.",u:"rentals"},
    {p:"A school prints programs for $"+b+" in setup costs plus $"+a+" per program. The total cost is $"+c+". Let \\(x\\) be the number of programs.",u:"programs"}
  ]);
  var prompt=tpl.p+" Which equation models this problem?";
  var sol="The total is the fixed fee plus the per-unit cost times the number of units.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\end{aligned} \\] The modelling equation is <b>\\("+a+"x + "+b+" = "+c+"\\)</b>.";
  return mcq(prompt,
    {t:"\\("+a+"x + "+b+" = "+c+"\\)",fb:"Yes: the per-unit cost "+a+" is multiplied by x, the fixed fee "+b+" is added, and the total is "+c+"."},
    [{t:"\\("+a+"x - "+b+" = "+c+"\\)",fb:"That subtracts the fixed fee. The fee is part of the total cost, so it is added."},
     {t:"\\("+b+"x + "+a+" = "+c+"\\)",fb:"That swaps the two numbers: the fixed fee "+b+" would be charged per unit, which does not match the problem."},
     {t:"\\(\\frac{x}{"+a+"} + "+b+" = "+c+"\\)",fb:"That divides x by the per-unit cost. The cost grows by "+a+" for each unit, so x is multiplied by "+a+"."}],
    sol,{mode:"model-problem",a:a,b:b});
}, ["Split the total into a fixed part and a part that grows with the unknown.", "Start by asking which amount is charged once and which amount is charged per unit."]);

E("u6-problem-two-step-cr", 6, ["8.12","8.15"], 2, "gen", function(){
  var a=ri(2,9),b=ri(3,18),x=ri(3,14),c=a*x+b;
  var tpl=pick([
    {p:"A plumber charges a call-out fee of $"+b+" plus $"+a+" per hour of work. A repair costs $"+c+" in total. How many hours did the repair take?",u:"hours"},
    {p:"A bike shop charges $"+b+" for a tune-up inspection plus $"+a+" per part replaced. A bill comes to $"+c+". How many parts were replaced?",u:"parts"},
    {p:"A coach rents a bus for $"+b+" plus $"+a+" per student for tickets. The total cost is $"+c+". How many students went on the trip?",u:"students"},
    {p:"A photo studio charges a sitting fee of $"+b+" plus $"+a+" per print. A customer pays $"+c+" in total. How many prints did the customer order?",u:"prints"}
  ]);
  var sol="Let \\(x\\) be the number of "+tpl.u+". The total is the fixed fee plus the per-unit cost, which gives the equation, and solving it records the process.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+" "+tpl.u+"</b>. Check: "+a+"("+x+") + "+b+" = "+c+".";
  return numq(tpl.p+" Give your answer as a number of "+tpl.u+".",x,0,sol,{mode:"problem-two-step",a:a,b:b});
}, ["Model the problem with an equation: a fixed amount plus a per-unit amount equals the total.", "Start by writing the equation, then undo the added fee on both sides."]);

E("u6-one-step-problem", 6, ["8.7","8.9"], 1, "gen", function(){
  var mode=pick(["rise","fall","deposit","score"]);
  var prompt,sol,corr,errs,x;
  if(mode==="rise"){
    var a=ri(2,12);x=ri(-4,14);var b=x+a;
    prompt="The temperature at dawn was an unknown number of degrees. By noon it had risen "+a+" degrees to "+b+" degrees. What was the temperature at dawn, in degrees?";
    sol="Let \\(t\\) be the dawn temperature. The problem is represented by a one-step equation with counters or a number line in mind: rising means adding.\\[ \\begin{aligned} t + "+a+" &= "+b+" \\\\ t &= "+x+" \\end{aligned} \\] The dawn temperature was <b>"+x+" degrees</b>.";
    corr={t:String(x),fb:"Yes: "+x+" + "+a+" = "+b+", so the equation is satisfied."};
    errs=[{v:b+a,fb:"That adds the rise to the noon temperature. The dawn temperature must be smaller than the noon temperature here."},{v:a,fb:"That is the size of the rise, not the starting temperature."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }else if(mode==="fall"){
    var a2=ri(2,12);x=ri(2,16);var b2=x-a2;
    prompt="A hiker starts at an unknown elevation, in metres. After descending "+a2+" metres, the hiker is at "+b2+" metres. What was the starting elevation, in metres?";
    sol="Let \\(e\\) be the starting elevation. Descending means subtracting, giving a one-step equation.\\[ \\begin{aligned} e - "+a2+" &= "+b2+" \\\\ e &= "+x+" \\end{aligned} \\] The starting elevation was <b>"+x+" metres</b>.";
    corr={t:String(x),fb:"Yes: "+x+" - "+a2+" = "+b2+", so the equation is satisfied."};
    errs=[{v:b2-a2,fb:"That descends a second time. To undo a descent of "+a2+", add "+a2+" to the final elevation."},{v:a2,fb:"That is the size of the descent, not the starting elevation."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }else if(mode==="deposit"){
    var a3=ri(5,40);x=ri(10,80);var b3=x+a3;
    prompt="After depositing $"+a3+", a savings account holds $"+b3+". How much was in the account before the deposit, in dollars?";
    sol="Let \\(s\\) be the starting amount. A deposit adds to the account, giving a one-step equation.\\[ \\begin{aligned} s + "+a3+" &= "+b3+" \\\\ s &= "+x+" \\end{aligned} \\] The account held <b>$"+x+"</b> before the deposit.";
    corr={t:String(x),fb:"Yes: "+x+" + "+a3+" = "+b3+", so the equation is satisfied."};
    errs=[{v:b3+a3,fb:"That adds the deposit to the final balance. The starting amount must be smaller than the final balance here."},{v:a3,fb:"That is the size of the deposit, not the starting amount."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }
  var a4=ri(3,15);x=ri(5,30);var b4=x-a4;
  prompt="A team loses "+a4+" points to a penalty and ends with "+b4+" points. How many points did the team have before the penalty?";
  sol="Let \\(p\\) be the points before the penalty. Losing points means subtracting, giving a one-step equation.\\[ \\begin{aligned} p - "+a4+" &= "+b4+" \\\\ p &= "+x+" \\end{aligned} \\] The team had <b>"+x+" points</b> before the penalty.";
  corr={t:String(x),fb:"Yes: "+x+" - "+a4+" = "+b4+", so the equation is satisfied."};
  errs=[{v:b4-a4,fb:"That subtracts the penalty a second time. To undo losing "+a4+" points, add "+a4+" to the final score."},{v:a4,fb:"That is the size of the penalty, not the starting score."}];
  return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
}, ["Represent the story with a one-step equation first: a starting value plus or minus a change equals the result.", "Start by deciding whether the story adds to or subtracts from the unknown starting value."]);

E("u6-verify-two-step", 6, ["8.16","8.17"], 2, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,6),b=ri(1,10),x=ri(2,10),c=a*x+b;
  var isSol=pick([true,false]);var cand=isSol?x:x+pick([1,2]);
  var lhs=a*cand+b;
  var corrStmt=cand+" substituted: "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", and "+lhs+" = "+c+", so "+cand+" is a solution." : ", and "+lhs+" is not "+c+", so "+cand+" is not a solution.");
  var wrongArith=(a*cand-b);
  var distr=[
    {t:cand+" substituted: "+a+"("+cand+") + "+b+" = "+wrongArith+(isSol?", and that equals "+c+", so "+cand+" is a solution." : ", and that equals "+c+" as well, so "+cand+" is a solution."),fb:"That arithmetic subtracts "+b+" instead of adding it. Redo the substitution carefully."},
    {t:cand+" substituted: "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", so "+cand+" is not a solution." : ", and "+lhs+" = "+c+" exactly, so "+cand+" is a solution."),fb:"The substitution value "+lhs+" is right, but the conclusion is backwards: compare "+lhs+" with the right side "+c+"."},
    {t:cand+" substituted: ("+a+" + "+b+")("+cand+") = "+((a+b)*cand)+(isSol?", so "+cand+" is a solution." : ", so "+cand+" is not a solution, by that check."),fb:"That adds the coefficient and the constant before multiplying. Multiply "+a+" by "+cand+" first, then add "+b+"."}
  ];
  var prompt="Which statement correctly verifies whether \\("+v+" = "+cand+"\\) is a solution of \\("+a+v+" + "+b+" = "+c+"\\)?";
  var sol="Substitute "+cand+" for "+v+" and compare the two sides.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+a+"("+cand+") + "+b+" \\\\ &= "+lhs+" \\end{aligned} \\] The right side is "+c+", so <b>"+cand+" is "+(isSol?"":"not ")+"a solution</b>.";
  return mcq(prompt,{t:corrStmt,fb:"Yes: the substitution is computed correctly and the conclusion matches the comparison with "+c+"."},distr,sol,{mode:"verify-two-step",cand:cand});
}, ["Verification means substituting the value and comparing the two sides of the equation.", "Start by replacing the variable with the given value and working out the left side."]);

E("u6-visual-steps", 6, ["8.13","8.8"], 1, "var", varset([
  function(){
    var q=mcq("The balance models \\(x + 3 = 10\\). Which action is the next step in solving it, as shown by the balance method?",
      {t:"Remove 3 units from both pans, leaving x balancing 7.",fb:"Yes: the same amount leaves both pans, so the balance holds and x is isolated."},
      [{t:"Remove 3 units from the left pan only, leaving x balancing 10.",fb:"Removing from one pan only breaks the balance: both pans must change in the same way."},
       {t:"Add 3 units to both pans, leaving x + 6 balancing 13.",fb:"That keeps the balance but moves away from isolating x."},
       {t:"Remove 10 units from both pans, leaving x balancing 3.",fb:"The right pan holds only 10 units in total with x unknown on the left; the step removes the 3 loose units beside x."}],
      "The loose 3 units beside x are removed from both pans.\\[ \\begin{aligned} x + 3 - 3 &= 10 - 3 \\\\ x &= 7 \\end{aligned} \\] The next step is <b>remove 3 units from both pans</b>.",
      {mode:"visual-1"});
    q.figure=u6balanceSVG("x + 3","10");
    return q;
  },
  function(){
    var q=mcq("The balance models \\(2x = 8\\): two equal groups of x balance 8 units. The pans are split into 2 equal groups. Which equation shows the result?",
      {t:"\\(x = 4\\)",fb:"Yes: each group holds one x on the left and half of 8, which is 4, on the right."},
      [{t:"\\(x = 8\\)",fb:"That keeps the full 8 with one x. Splitting into 2 groups halves the right side as well."},
       {t:"\\(2x = 4\\)",fb:"That halves the right side only. Both sides are split into 2 equal groups."},
       {t:"\\(x = 6\\)",fb:"That subtracts 2 from the right side. Splitting into groups is division, not subtraction."}],
      "Splitting both pans into 2 equal groups is division by 2 on both sides.\\[ \\begin{aligned} 2x \\div 2 &= 8 \\div 2 \\\\ x &= 4 \\end{aligned} \\] The resulting equation is <b>\\(x = 4\\)</b>.",
      {mode:"visual-2"});
    q.figure=u6balanceSVG("2x","8");
    return q;
  },
  function(){
    var q=mcq("The number line shows the step used to solve \\(x - 4 = 6\\). What is the value of \\(x\\)?",
      {t:"10",fb:"Yes: the arrow jumps 4 units up from 6, landing on 10, and 10 - 4 = 6."},
      [{t:"6",fb:"That is the starting point of the jump, the result after subtracting 4."},
       {t:"2",fb:"That jumps 4 units down from 6. Undoing a subtraction of 4 means adding 4."},
       {t:"4",fb:"That is the size of the jump, not the landing point."}],
      "The number line undoes the subtraction by adding 4.\\[ \\begin{aligned} x - 4 &= 6 \\\\ x &= 6 + 4 \\\\ x &= 10 \\end{aligned} \\] The answer is <b>10</b>.",
      {mode:"visual-3"});
    q.figure=u6numLineSVG(0,12,[{v:6,label:"start"}],6,10,"+4");
    return q;
  },
  function(){
    var q=mcq("The balance models \\(3x + 1 = 13\\). Which equation shows the result after the first balance step, removing the loose unit from both pans?",
      {t:"\\(3x = 12\\)",fb:"Yes: removing 1 unit from both pans leaves 3x balancing 12."},
      [{t:"\\(3x + 1 = 12\\)",fb:"That removes the unit from the right pan only. Both pans must lose the same amount."},
       {t:"\\(3x = 13\\)",fb:"That removes the unit from the left pan only. Both pans must lose the same amount."},
       {t:"\\(x = 12\\)",fb:"That also divides by 3 in the same step. The first balance step only removes the loose unit."}],
      "The first step removes the loose 1 unit from both pans.\\[ \\begin{aligned} 3x + 1 - 1 &= 13 - 1 \\\\ 3x &= 12 \\end{aligned} \\] The resulting equation is <b>\\(3x = 12\\)</b>.",
      {mode:"visual-4"});
    q.figure=u6balanceSVG("3x + 1","13");
    return q;
  },
  function(){
    var q=mcq("The number line shows the step used to solve \\(x + 5 = 9\\). What is the value of \\(x\\)?",
      {t:"4",fb:"Yes: the arrow jumps 5 units down from 9, landing on 4, and 4 + 5 = 9."},
      [{t:"9",fb:"That is the starting point of the jump, the total on the right side."},
       {t:"14",fb:"That jumps 5 units up from 9. Undoing an addition of 5 means subtracting 5."},
       {t:"5",fb:"That is the size of the jump, not the landing point."}],
      "The number line undoes the addition by subtracting 5.\\[ \\begin{aligned} x + 5 &= 9 \\\\ x &= 9 - 5 \\\\ x &= 4 \\end{aligned} \\] The answer is <b>4</b>.",
      {mode:"visual-5"});
    q.figure=u6numLineSVG(0,16,[{v:9,label:"start"}],9,4,"-5");
    return q;
  }
]), ["A diagram step must change both sides of the equation in the same way.", "Start by reading what the balance or number line does to the side with the variable."]);

E("u6-verify-one-step", 6, ["8.10","8.11"], 2, "var", varset([
  function(){
    return mcq("Which statement correctly verifies whether \\(x = 7\\) is a solution of \\(x + 4 = 11\\)?",
      {t:"7 substituted: 7 + 4 = 11, and 11 = 11, so 7 is a solution.",fb:"Yes: the substitution gives the right side exactly, so the value is a solution."},
      [{t:"7 substituted: 7 + 4 = 10, and 10 is not 11, so 7 is not a solution.",fb:"The arithmetic is off: 7 + 4 = 11, not 10."},
       {t:"7 substituted: 7 - 4 = 3, and 3 is not 11, so 7 is not a solution.",fb:"That subtracts 4. The equation adds 4 to the variable, so the check adds too."},
       {t:"7 substituted: 7 + 4 = 11, so 7 is not a solution.",fb:"The substitution is right but the conclusion is backwards: the sides match, so 7 is a solution."}],
      "Substitute 7 for x and compare the sides.\\[ \\begin{aligned} x + 4 &= 7 + 4 \\\\ &= 11 \\end{aligned} \\] The sides match, so <b>7 is a solution</b>.",
      {mode:"verify-one-1"});
  },
  function(){
    return mcq("Which statement correctly verifies whether \\(x = 10\\) is a solution of \\(x - 3 = 8\\)?",
      {t:"10 substituted: 10 - 3 = 7, and 7 is not 8, so 10 is not a solution.",fb:"Yes: the substitution gives 7, which does not match the right side 8."},
      [{t:"10 substituted: 10 - 3 = 8, and 8 = 8 as required, so 10 is a solution.",fb:"The arithmetic is off: 10 - 3 = 7, not 8."},
       {t:"10 substituted: 10 + 3 = 13, and 13 is not 8, so 10 is not a solution.",fb:"That adds 3. The equation subtracts 3 from the variable, so the check subtracts too."},
       {t:"10 substituted: 10 - 3 = 7, and 7 is not 8, so 10 is a solution.",fb:"The substitution is right but the conclusion is backwards: 7 does not equal 8."}],
      "Substitute 10 for x and compare the sides.\\[ \\begin{aligned} x - 3 &= 10 - 3 \\\\ &= 7 \\end{aligned} \\] The right side is 8, so <b>10 is not a solution</b>.",
      {mode:"verify-one-2"});
  },
  function(){
    return mcq("Which statement correctly verifies whether \\(x = 8\\) is a solution of \\(x + 6 = 15\\)?",
      {t:"8 substituted: 8 + 6 = 14, and 14 is not 15, so 8 is not a solution.",fb:"Yes: the substitution gives 14, which does not match the right side 15."},
      [{t:"8 substituted: 8 + 6 = 15, and 15 = 15 as required, so 8 is a solution.",fb:"The arithmetic is off: 8 + 6 = 14, not 15."},
       {t:"8 substituted: 8 - 6 = 2, and 2 is not 15, so 8 is not a solution.",fb:"That subtracts 6. The equation adds 6 to the variable, so the check adds too."},
       {t:"8 substituted: 8 + 6 = 14, and 14 is not 15, so 8 is a solution.",fb:"The substitution is right but the conclusion is backwards: 14 does not equal 15."}],
      "Substitute 8 for x and compare the sides.\\[ \\begin{aligned} x + 6 &= 8 + 6 \\\\ &= 14 \\end{aligned} \\] The right side is 15, so <b>8 is not a solution</b>.",
      {mode:"verify-one-3"});
  },
  function(){
    return mcq("Which statement correctly verifies whether \\(x = 7\\) is a solution of \\(x - 5 = 2\\)?",
      {t:"7 substituted: 7 - 5 = 2, and 2 = 2, so 7 is a solution.",fb:"Yes: the substitution gives the right side exactly, so the value is a solution."},
      [{t:"7 substituted: 7 - 5 = 3, and 3 is not 2, so 7 is not a solution.",fb:"The arithmetic is off: 7 - 5 = 2, not 3."},
       {t:"7 substituted: 7 + 5 = 12, and 12 is not 2, so 7 is not a solution.",fb:"That adds 5. The equation subtracts 5 from the variable, so the check subtracts too."},
       {t:"7 substituted: 7 - 5 = 2, so 7 is not a solution.",fb:"The substitution is right but the conclusion is backwards: the sides match, so 7 is a solution."}],
      "Substitute 7 for x and compare the sides.\\[ \\begin{aligned} x - 5 &= 7 - 5 \\\\ &= 2 \\end{aligned} \\] The sides match, so <b>7 is a solution</b>.",
      {mode:"verify-one-4"});
  },
  function(){
    return mcq("Which statement correctly verifies whether \\(x = 12\\) is a solution of \\(x + 9 = 20\\)?",
      {t:"12 substituted: 12 + 9 = 21, and 21 is not 20, so 12 is not a solution.",fb:"Yes: the substitution gives 21, which does not match the right side 20."},
      [{t:"12 substituted: 12 + 9 = 20, and 20 = 20 as required, so 12 is a solution.",fb:"The arithmetic is off: 12 + 9 = 21, not 20."},
       {t:"12 substituted: 12 - 9 = 3, and 3 is not 20, so 12 is not a solution.",fb:"That subtracts 9. The equation adds 9 to the variable, so the check adds too."},
       {t:"12 substituted: 12 + 9 = 21, and 21 is not 20, so 12 is a solution.",fb:"The substitution is right but the conclusion is backwards: 21 does not equal 20."}],
      "Substitute 12 for x and compare the sides.\\[ \\begin{aligned} x + 9 &= 12 + 9 \\\\ &= 21 \\end{aligned} \\] The right side is 20, so <b>12 is not a solution</b>.",
      {mode:"verify-one-5"});
  }
]), ["Verification means substituting the value into the original equation and comparing the sides.", "Start by replacing the variable with the given value, then work out that side."]);

E("u6-one-step-problem-cr", 6, ["8.9","8.7"], 1, "gen", function(){
  var mode=pick(["temp","tank","owing","altitude"]);
  var prompt,sol,x;
  if(mode==="temp"){
    var a=ri(3,14);x=ri(-6,12);var b=x-a;
    prompt="Overnight, the temperature fell "+a+" degrees and reached "+b+" degrees by morning. What was the temperature in the evening, in degrees?";
    sol="Let \\(t\\) be the evening temperature. A fall is a subtraction, giving a one-step equation.\\[ \\begin{aligned} t - "+a+" &= "+b+" \\\\ t &= "+x+" \\end{aligned} \\] The evening temperature was <b>"+x+" degrees</b>. Check: "+x+" - "+a+" = "+b+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="tank"){
    var a2=ri(4,20);x=ri(15,60);var b2=x+a2;
    prompt="A water tank gains "+a2+" litres from a delivery and then holds "+b2+" litres. How many litres were in the tank before the delivery?";
    sol="Let \\(w\\) be the amount before the delivery. A gain is an addition, giving a one-step equation.\\[ \\begin{aligned} w + "+a2+" &= "+b2+" \\\\ w &= "+x+" \\end{aligned} \\] The tank held <b>"+x+" litres</b> before the delivery. Check: "+x+" + "+a2+" = "+b2+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="owing"){
    var a3=ri(3,25);x=ri(5,50);var b3=x-a3;
    prompt="Sam pays $"+a3+" toward a loan and still owes $"+b3+". How much did Sam owe at the start, in dollars?";
    sol="Let \\(d\\) be the starting amount owed. A payment subtracts from the amount owed, giving a one-step equation.\\[ \\begin{aligned} d - "+a3+" &= "+b3+" \\\\ d &= "+x+" \\end{aligned} \\] Sam owed <b>$"+x+"</b> at the start. Check: "+x+" - "+a3+" = "+b3+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }
  var a4=ri(10,60);x=ri(20,120);var b4=x+a4;
  prompt="A drone climbs "+a4+" metres from its launch point and reaches an altitude of "+b4+" metres above the valley floor. How high above the valley floor was the launch point, in metres?";
  sol="Let \\(h\\) be the height of the launch point. Climbing adds height, giving a one-step equation.\\[ \\begin{aligned} h + "+a4+" &= "+b4+" \\\\ h &= "+x+" \\end{aligned} \\] The launch point was <b>"+x+" metres</b> above the valley floor. Check: "+x+" + "+a4+" = "+b4+".";
  return numq(prompt,x,0,sol,{mode:mode});
}, ["Represent the story with a one-step equation: a starting value plus or minus a change equals the result.", "Start by deciding whether the change adds to or subtracts from the unknown starting value."]);

E("u6-preservation-problem-cr", 6, ["8.2","8.15"], 1, "gen", function(){
  var mode=pick(["groups","packs","sharing"]);
  var prompt,sol,x;
  if(mode==="groups"){
    var a=ri(2,9);x=ri(3,15);var b=a*x;
    prompt=a+" equal groups of students hold "+b+" students in total, with no students left over. How many students are in each group?";
    sol="Let \\(g\\) be the number of students in each group. Apply the preservation of equality: divide both sides by the same number, "+a+".\\[ \\begin{aligned} "+a+"g &= "+b+" \\\\ g &= "+x+" \\end{aligned} \\] Each group has <b>"+x+" students</b>. Check: "+a+" times "+x+" is "+b+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="packs"){
    var a2=ri(3,10);x=ri(4,12);var b2=a2*x;
    prompt="Markers come in packs of "+a2+". A teacher buys enough packs to have "+b2+" markers, with none left over. How many packs did the teacher buy?";
    sol="Let \\(p\\) be the number of packs. Apply the preservation of equality: divide both sides by the same number, "+a2+".\\[ \\begin{aligned} "+a2+"p &= "+b2+" \\\\ p &= "+x+" \\end{aligned} \\] The teacher bought <b>"+x+" packs</b>. Check: "+a2+" times "+x+" is "+b2+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }
  var a3=ri(2,8);x=ri(3,14);var total=a3*x;
  prompt="A rope "+total+" metres long is cut into "+a3+" equal pieces. How long is each piece, in metres?";
  sol="Let \\(L\\) be the length of each piece, so \\("+a3+"L = "+total+"\\). Apply the preservation of equality: divide both sides by the same number, "+a3+".\\[ \\begin{aligned} "+a3+"L &= "+total+" \\\\ L &= "+x+" \\end{aligned} \\] Each piece is <b>"+x+" metres</b> long. Check: "+a3+" times "+x+" is "+total+".";
  return numq(prompt,x,0,sol,{mode:mode});
}, ["Turn the problem into an equation, then keep it balanced by doing the same operation to both sides.", "Start by naming the unknown and writing what the groups or packs multiply to."]);

E("u6-model-solve-cr", 6, ["8.12","8.15"], 3, "gen", function(){
  var a=ri(3,12),b=ri(10,45),x=ri(6,20),c=a*x+b;
  var tpl=pick([
    {p:"A hall rental costs a booking fee of $"+b+" plus $"+a+" per guest for catering. A group pays $"+c+" in total. How many guests were catered for?",u:"guests"},
    {p:"A moving company charges $"+b+" for the truck plus $"+a+" per box loaded. A customer pays $"+c+" in total. How many boxes were loaded?",u:"boxes"},
    {p:"A ski shop charges $"+b+" for a season pass base fee plus $"+a+" per lift day recorded. A skier pays $"+c+" in total. How many lift days were recorded?",u:"lift days"},
    {p:"A caterer charges $"+b+" for setup plus $"+a+" per tray of food. An event bill is $"+c+" in total. How many trays were ordered?",u:"trays"}
  ]);
  var sol="Model the problem first: let \\(x\\) be the number of "+tpl.u+". The fixed fee plus the per-unit charge gives the total. Then solve, recording each balanced step.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+" "+tpl.u+"</b>. Verify by substitution: "+a+"("+x+") + "+b+" = "+c+".";
  return numq(tpl.p+" Model the problem with a linear equation and solve it. Give your answer as a number of "+tpl.u+".",x,0,sol,{mode:"model-solve",a:a,b:b});
}, ["Model first: a fixed amount plus a per-unit amount times the unknown equals the total.", "Start by naming the unknown and writing the equation the story describes."]);

E("u6-two-step-context", 6, ["8.15","8.12"], 3, "gen", function(){
  var mode=pick(["left","per"]);
  var prompt,sol,corr,errs,x;
  if(mode==="left"){
    var a=ri(3,9),n=ri(4,12),b=ri(5,30),total=a*n+b;
    prompt="A baker prepares "+total+" rolls in total. Of these, "+b+" rolls go into a display basket, and the rest are split equally onto "+a+" trays. How many rolls are on each tray?";
    x=n;
    sol="Let \\(r\\) be the number of rolls on each tray. The trays hold the total minus the basket rolls.\\[ \\begin{aligned} "+a+"r + "+b+" &= "+total+" \\\\ "+a+"r &= "+(total-b)+" \\\\ r &= "+n+" \\end{aligned} \\] Each tray holds <b>"+n+" rolls</b>.";
    corr={t:String(n),fb:"Yes: removing the "+b+" basket rolls leaves "+(total-b)+" rolls on "+a+" trays, which is "+n+" per tray."};
    errs=[{v:total-b,fb:"That is the number of rolls on all the trays together. Divide by "+a+" to get the rolls per tray."},{v:Math.floor(total/a),fb:"That divides the whole total by "+a+", including the basket rolls. Remove the basket rolls first."},{v:n+a,fb:"Check it: "+a+" trays of "+(n+a)+" plus "+b+" basket rolls would be more than "+total+"." }];
    return mcq(prompt,corr,u6iopts(n,errs),sol,{mode:mode});
  }
  var a2=ri(3,11),x2=ri(6,18),b2=ri(4,25),c2=a2*x2-b2;
  prompt="A ferry sells tickets at $"+a2+" each. After a group discount of $"+b2+" is taken off, a school pays $"+c2+" for its tickets. How many tickets did the school buy?";
  x=x2;
  sol="Let \\(t\\) be the number of tickets. The discount is subtracted from the ticket cost.\\[ \\begin{aligned} "+a2+"t - "+b2+" &= "+c2+" \\\\ "+a2+"t &= "+(c2+b2)+" \\\\ t &= "+x2+" \\end{aligned} \\] The school bought <b>"+x2+" tickets</b>. Verify: "+a2+"("+x2+") - "+b2+" = "+c2+".";
  corr={t:String(x2),fb:"Yes: adding the discount back gives "+a2+"t = "+(c2+b2)+", and dividing by "+a2+" gives "+x2+"." };
  errs=[{v:c2+b2,fb:"That undoes the discount but stops before dividing by the ticket price."},{v:Math.max(1,Math.floor((c2-b2)/a2)),fb:"That takes the discount off a second time. The discount is undone by adding it back."},{v:x2+3,fb:"Check it: "+a2+"("+ (x2+3) +") - "+b2+" is more than "+c2+"." }];
  return mcq(prompt,corr,u6iopts(x2,errs),sol,{mode:mode});
}, ["Write the equation the story describes, watching for amounts added or taken off the total.", "Start by separating the per-unit part from the fixed amount that is added or subtracted."]);

E("u6-verify-error", 6, ["8.16","8.10"], 3, "var", varset([
  function(){
    return mcq("Rae solves \\(2x + 4 = 18\\) by writing \\(2x = 22\\), then \\(x = 11\\). What is the correct solution?",
      {t:"7",fb:"Yes: subtracting 4 from both sides gives 2x = 14, and dividing by 2 gives 7."},
      [{t:"11",fb:"That is Rae's answer. She added 4 to the right side instead of subtracting it."},
       {t:"14",fb:"That is the value of 2x after the correct first step, not the value of x."},
       {t:"9",fb:"Check it: 2(9) + 4 = 22, not 18."}],
      "Rae's error is in the first step: the 4 must be subtracted from both sides, not added.\\[ \\begin{aligned} 2x + 4 &= 18 \\\\ 2x &= 14 \\\\ x &= 7 \\end{aligned} \\] The correct solution is <b>7</b>. Verify: 2(7) + 4 = 18.",
      {mode:"verify-error-1"});
  },
  function(){
    return mcq("Tom solves \\(x - 6 = 9\\) by writing \\(x = 3\\), saying he moved the 6 across and subtracted. What is the correct solution?",
      {t:"15",fb:"Yes: adding 6 to both sides gives 15, and 15 - 6 = 9."},
      [{t:"3",fb:"That is Tom's answer. Subtracting 6 again moves away from the solution."},
       {t:"9",fb:"That is the right side of the equation, not the value of x."},
       {t:"13",fb:"Check it: 13 - 6 = 7, not 9."}],
      "Tom's error is the direction of the inverse operation: subtracting 6 is undone by adding 6 to both sides.\\[ \\begin{aligned} x - 6 &= 9 \\\\ x &= 15 \\end{aligned} \\] The correct solution is <b>15</b>. Verify: 15 - 6 = 9.",
      {mode:"verify-error-2"});
  },
  function(){
    return mcq("Ana solves \\(4x - 3 = 29\\) by writing \\(4x = 26\\), then \\(x = 6.5\\). What is the correct solution?",
      {t:"8",fb:"Yes: adding 3 to both sides gives 4x = 32, and dividing by 4 gives 8."},
      [{t:"6.5",fb:"That is Ana's answer. She subtracted 3 from the right side instead of adding it back."},
       {t:"32.0",fb:"That is the value of 4x after the correct first step, not the value of x."},
       {t:"7",fb:"Check it: 4(7) - 3 = 25, not 29."}],
      "Ana's error is in the first step: the subtracted 3 must be added back on both sides.\\[ \\begin{aligned} 4x - 3 &= 29 \\\\ 4x &= 32 \\\\ x &= 8 \\end{aligned} \\] The correct solution is <b>8</b>. Verify: 4(8) - 3 = 29.",
      {mode:"verify-error-3"});
  },
  function(){
    return mcq("Leo solves \\(\\frac{x}{3} = 7\\) by writing \\(x = 7 - 3 = 4\\). What is the correct solution?",
      {t:"21",fb:"Yes: multiplying both sides by 3 gives 21, and 21 divided by 3 is 7."},
      [{t:"4",fb:"That is Leo's answer. He subtracted the divisor instead of multiplying by it."},
       {t:"7",fb:"That is the result after the division, not the value of x itself."},
       {t:"10",fb:"Check it: 10 divided by 3 is not 7."}],
      "Leo's error is the inverse operation: division by 3 is undone by multiplying both sides by 3.\\[ \\begin{aligned} \\frac{x}{3} &= 7 \\\\ x &= 21 \\end{aligned} \\] The correct solution is <b>21</b>. Verify: 21 divided by 3 is 7.",
      {mode:"verify-error-4"});
  },
  function(){
    return mcq("Kim claims \\(x = 13\\) solves \\(x + 8 = 19\\), and checks by writing \\(13 + 8 = 19\\). What is the correct solution?",
      {t:"11",fb:"Yes: 11 + 8 = 19. Kim's check itself is wrong, since 13 + 8 = 21."},
      [{t:"13",fb:"That is Kim's claim. Her check writes 13 + 8 = 19, but 13 + 8 is actually 21."},
       {t:"19",fb:"That is the right side of the equation, not the value of x."},
       {t:"8",fb:"That is the number added to x, not the value of x."}],
      "Kim's verification contains an arithmetic error: substituting 13 gives 21, not 19, so 13 is not a solution. Solving directly:\\[ \\begin{aligned} x + 8 &= 19 \\\\ x &= 11 \\end{aligned} \\] The correct solution is <b>11</b>. Verify: 11 + 8 = 19.",
      {mode:"verify-error-5"});
  }
]), ["Read the shown work line by line and find the first line that breaks the balance or the arithmetic.", "Start by checking the first step of the shown work against the inverse operation it needs."]);

E("u6-solve-challenge-cr", 6, ["8.2","8.14"], 3, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["minus","swapped"]);
  var prompt,sol,x;
  if(mode==="minus"){
    var a=ri(4,12);x=ri(8,25);var b=ri(5,a*x-10),c=a*x-b;
    prompt="Solve \\("+a+v+" - "+b+" = "+c+"\\) for \\("+v+"\\). Show each balanced step in your work.";
    sol="Apply the preservation of equality twice: add "+b+" to both sides, then divide both sides by "+a+".\\[ \\begin{aligned} "+a+v+" - "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c+b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Verify by substitution: "+a+"("+x+") - "+b+" = "+c+".";
    return numq(prompt,x,0,sol,{mode:mode,a:a,b:b});
  }
  var a2=ri(3,11);x=ri(6,20);var b2=ri(4,30),c2=a2*x+b2;
  prompt="Solve \\("+c2+" = "+a2+v+" + "+b2+"\\) for \\("+v+"\\). Show each balanced step in your work.";
  sol="The variable is on the right side, but the same balanced steps apply: subtract "+b2+" from both sides, then divide both sides by "+a2+".\\[ \\begin{aligned} "+c2+" &= "+a2+v+" + "+b2+" \\\\ "+(c2-b2)+" &= "+a2+v+" \\\\ "+x+" &= "+v+" \\end{aligned} \\] The answer is <b>\\("+v+" = "+x+"\\)</b>. Verify by substitution: "+a2+"("+x+") + "+b2+" = "+c2+".";
  return numq(prompt,x,0,sol,{mode:mode,a:a2,b:b2});
}, ["Undo the operations in reverse order, keeping both sides balanced at every step.", "Start with the operation that was applied last to the variable."]);

/* ----- bank-u7.js ----- */
// Math 7 Unit 7 Data Analysis question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 3192 to 3664).
// CRMARKS: u7-missing-value-cr=3
// CRMARKS: u7-median-range-cr=3
// CRMARKS: u7-two-event-pct-cr=2
// CRMARKS: u7-central-problem-cr=3
// CRMARKS: u7-expected-count-cr=3
/* ===== Unit 7 ===== */
/* Math 7 Unit 7: Data Analysis (targets 11 and 12) */
function u7gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u7fracStr(n,d){if(d<0){n=-n;d=-d;}var g=u7gcd(n,d);n/=g;d/=g;if(d===1)return String(n);return n+"/"+d;}
function u7numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u7mean(a){var s=0;for(var i=0;i<a.length;i++)s+=a[i];return s/a.length;}
function u7median(a){var s=a.slice().sort(function(x,y){return x-y;});var m=Math.floor(s.length/2);return s.length%2?s[m]:(s[m-1]+s[m])/2;}
function u7mode(a){var f={},best=null,bf=0;for(var i=0;i<a.length;i++){f[a[i]]=(f[a[i]]||0)+1;if(f[a[i]]>bf){bf=f[a[i]];best=a[i];}}return best;}
function u7barSVG(labels,vals,unit){
  var W=330,H=215,base=175,top=25,maxV=Math.max.apply(null,vals),bw=34,gap=(W-60-labels.length*bw)/(labels.length+1);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar graph">';
  out+='<line x1="45" y1="'+base+'" x2="'+(W-10)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="45" y1="'+top+'" x2="45" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(var i=0;i<labels.length;i++){var x=45+gap+(gap+bw)*i;var h=(base-top)*vals[i]/maxV;var y=base-h;
    out+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+bw+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    out+=_txt(x+bw/2,y-10,String(vals[i]),12,true);
    out+=_txt(x+bw/2,base+16,labels[i],11,false);
  }
  out+=_txt(22,(top+base)/2,unit,11,false);
  return out+'</svg>';
}
function u7lineSVG(labels,vals,unit){
  var W=330,H=215,base=175,top=30,maxV=Math.max.apply(null,vals)+2,minV=0;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph">';
  out+='<line x1="45" y1="'+base+'" x2="'+(W-15)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="45" y1="'+top+'" x2="45" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var pts=[];
  for(var i=0;i<labels.length;i++){var x=65+i*(W-95)/(labels.length-1);var y=base-(base-top)*(vals[i]-minV)/(maxV-minV);pts.push([x,y]);
    out+='<circle cx="'+fmt(x,1)+'" cy="'+fmt(y,1)+'" r="3.2" fill="'+FIG_INK+'"/>';
    out+=_txt(x,y-13,String(vals[i]),12,true);
    out+=_txt(x,base+16,labels[i],11,false);
  }
  for(var j=0;j<pts.length-1;j++){out+='<line x1="'+fmt(pts[j][0],1)+'" y1="'+fmt(pts[j][1],1)+'" x2="'+fmt(pts[j+1][0],1)+'" y2="'+fmt(pts[j+1][1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';}
  out+=_txt(20,(top+base)/2,unit,11,false);
  return out+'</svg>';
}
function u7pieSVG(parts){
  var cx=110,cy=100,R=78,out='<svg viewBox="0 0 330 210" width="330" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var ang=-90;
  for(var i=0;i<parts.length;i++){var sweep=parts[i].pct*3.6;var a1=ang*Math.PI/180,a2=(ang+sweep)*Math.PI/180;
    var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
    var large=sweep>180?1:0;
    var fill=i%2?FIG_SHADE:"#ffffff";
    out+='<path d="M '+cx+' '+cy+' L '+fmt(x1,1)+' '+fmt(y1,1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(x2,1)+' '+fmt(y2,1)+' Z" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    var mid=(ang+sweep/2)*Math.PI/180;
    out+=_txt(cx+(R-24)*Math.cos(mid),cy+(R-24)*Math.sin(mid),parts[i].pct+"%",12,true);
    out+=_txt(215,52+i*30,parts[i].label+" "+parts[i].pct+"%",12,false,"start");
    ang+=sweep;
  }
  return out+'</svg>';
}
function u7tableSVG(rowHead,colHead,rows){
  var W=330,rowH=26,colW=(W-70)/colHead.length,H=30+rowH*(rows.length+1);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Outcome table">';
  out+='<rect x="10" y="10" width="'+(W-20)+'" height="'+(H-20)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(40,23,rowHead,11,true);
  for(var c=0;c<colHead.length;c++){out+=_txt(70+colW*c+colW/2,23,colHead[c],12,true);}
  for(var r=0;r<rows.length;r++){var y=10+rowH*(r+1);
    out+='<line x1="10" y1="'+y+'" x2="'+(W-10)+'" y2="'+y+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
    out+=_txt(40,y+13,rows[r][0],12,true);
    for(var k=1;k<rows[r].length;k++){out+=_txt(70+colW*(k-1)+colW/2,y+13,rows[r][k],11,false);}
  }
  for(var v=0;v<=colHead.length;v++){var x=v===0?70:70+colW*v;out+='<line x1="'+x+'" y1="10" x2="'+x+'" y2="'+(H-10)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';}
  return out+'</svg>';
}

E("u7-mean-basic",7,["11.6"],1,"gen",function(){
  var ctx=pick(["quiz scores","laps swum each day","pages read each day","points scored each game","seedlings sprouting each day"]);
  var n=pick([5,5,6]);var vals=[];for(var i=0;i<n;i++)vals.push(ri(2,14));
  var m=u7mean(vals);var ms=fmt(m);
  var cand=u7numOpts(m,[fmt(m+1),fmt(m-1),fmt(u7median(vals)),fmt(m+2),fmt(Math.max.apply(null,vals))]).map(function(v){return String(v);});
  var seen={};var ds=[];cand.forEach(function(v){if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"That value does not equal the total divided by "+n+". Add all the values first, then divide by how many there are."});}});
  while(ds.length<3){var v=fmt(m+ds.length+2);if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Add all the values first, then divide by "+n+"."});}}
  ds=precPair(ms,ds);
  var q=mcq("A student's "+ctx+" are: "+vals.join(", ")+". What is the mean?",
    {t:ms,fb:"Yes: the total is "+fmt(u7mean(vals)*n)+" and "+fmt(u7mean(vals)*n)+" divided by "+n+" is "+ms+"."},ds.slice(0,3),
    "Add the values, then divide by how many there are. \\[ \\begin{aligned} \\text{total} &= "+vals.join(" + ")+" = "+fmt(m*n)+" \\\\ \\text{mean} &= "+fmt(m*n)+" \\div "+n+" = "+ms+" \\end{aligned} \\] The mean is <b>"+ms+"</b>.",
    {mode:"mean",n:n});
  return q;
},["The mean is the total of all the values divided by how many values there are.","Start by adding all the values together."]);

E("u7-median-mode",7,["11.6"],1,"gen",function(){
  var askMode=Math.random()<0.5;
  var base=ri(3,9);var vals;
  if(askMode){var modeV=ri(2,12);var others=[];while(others.length<4){var v=ri(1,15);if(v!==modeV&&others.indexOf(v)<0)others.push(v);}vals=shuffle([modeV,modeV,modeV].concat(others.slice(0,3)));
    var correct=String(modeV);
    var cand=u7numOpts(modeV,[others[0],others[1],Math.round(u7mean(vals))]).map(String);
    var ds=cand.filter(function(v){return v!==correct;}).slice(0,3).map(function(v){return {t:v,fb:"Count how often each value appears. The mode is the value that appears most often."};});
    while(ds.length<3){var v=String(modeV+ds.length+3);ds.push({t:v,fb:"Count how often each value appears."});}
    return mcq("Data set: "+vals.join(", ")+". What is the mode?",{t:correct,fb:"Yes: "+modeV+" appears three times, more often than any other value."},ds,
      "Count the frequency of each value. The value "+modeV+" appears 3 times, more than any other value. The mode is <b>"+modeV+"</b>.",{mode:"mode"});
  }
  var n=pick([5,7]);vals=[];for(var i=0;i<n;i++)vals.push(ri(1,16));
  var med=u7median(vals);var srt=vals.slice().sort(function(a,b){return a-b;});
  var cand2=u7numOpts(med,[fmt(u7mean(vals)),srt[0],srt[srt.length-1],med+1]).map(function(v){return String(v);});
  var ds2=cand2.filter(function(v){return v!==fmt(med);}).slice(0,3).map(function(v){return {t:v,fb:"Order the values first. The median is the middle value of the ordered list."};});
  while(ds2.length<3){var w=fmt(med+ds2.length+2);ds2.push({t:w,fb:"Order the values first, then take the middle one."});}
  ds2=precPair(fmt(med),ds2);
  return mcq("Data set: "+vals.join(", ")+". What is the median?",{t:fmt(med),fb:"Yes: ordered, the list is "+srt.join(", ")+", and the middle value is "+fmt(med)+"."},ds2,
    "Order the values: "+srt.join(", ")+". With "+n+" values, the middle position holds <b>"+fmt(med)+"</b>.",{mode:"median"});
},["Order the values first for the median; count frequencies for the mode.","Start by rewriting the data set in increasing order."]);

E("u7-range-basic",7,["11.7"],1,"gen",function(){
  var ctx=pick(["daily high temperatures in degrees","heights of plants in centimetres","race times in seconds","numbers of pets per household","goals scored each week"]);
  var lo=ri(2,10),hi=lo+ri(4,14);var vals=[lo,hi];var n=ri(4,6);for(var i=0;i<n;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
  var r=hi-lo;
  var cand=u7numOpts(r,[hi,lo,r+2,Math.max(r-2,0),hi+lo]);
  var ds=cand.map(function(v){return {t:String(v),fb:v===hi?"That is the largest value alone. The range subtracts the smallest value from the largest.":"The range is largest minus smallest: "+hi+" minus "+lo+"."};});
  return mcq("A set of "+ctx+" is: "+vals.join(", ")+". What is the range?",{t:String(r),fb:"Yes: "+hi+" minus "+lo+" equals "+r+"."},ds,
    "The largest value is "+hi+" and the smallest is "+lo+". \\[ \\begin{aligned} \\text{range} &= "+hi+" - "+lo+" \\\\ &= "+r+" \\end{aligned} \\] The range is <b>"+r+"</b>.",{mode:"range"});
},["The range measures spread: largest value minus smallest value.","Start by finding the largest and smallest values in the set."]);

E("u7-prob-basic",7,["12.1","12.2"],1,"gen",function(){
  var mode=pick(["bag","bag","die","spinner","zero"]);
  if(mode==="zero"){
    var cols=["red","blue","green"];var counts=[ri(2,5),ri(2,5),ri(2,5)];var total=counts[0]+counts[1]+counts[2];
    var absent=pick(["purple","orange","yellow"]);
    var ds=[{t:"1/"+total,fb:"There are no "+absent+" marbles in the bag, so this event cannot happen."},{t:"0/"+counts[0],fb:"A probability of 0 is written as 0. No "+absent+" marbles means the event is impossible."},{t:"1",fb:"A probability of 1 means the event is certain. Drawing "+absent+" is impossible here, not certain."}];
    return mcq("A bag holds "+counts[0]+" red, "+counts[1]+" blue and "+counts[2]+" green marbles. One marble is drawn at random. What is the probability of drawing a "+absent+" marble?",
      {t:"0",fb:"Yes: there are no "+absent+" marbles, so the probability is 0."},ds,
      "There are 0 "+absent+" marbles out of "+total+" in total. \\(P = "+FR(0,total)+" = 0\\). The probability is <b>0</b>.",{mode:"zero"});
  }
  if(mode==="die"){
    var target=pick(["an even number","an odd number","a number greater than 4","a number less than 3","a 6","a number greater than 2"]);
    var fav={"an even number":3,"an odd number":3,"a number greater than 4":2,"a number less than 3":2,"a 6":1,"a number greater than 2":4}[target];
    var cs=u7fracStr(fav,6);
    var alts=[u7fracStr(6-fav,6),fav+"/6",u7fracStr(fav+1,6),u7fracStr(fav,6-fav+6)];
    var seen={};seen[cs]=1;var ds=[];
    alts.forEach(function(a){if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}});
    var extra=2;while(ds.length<3){var a=u7fracStr(extra,6);if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}extra++;}
    return mcq("A fair six-sided die is rolled once. What is the probability of rolling "+target+"?",
      {t:"\\("+cs+"\\)",fb:"Yes: "+fav+" of the 6 faces match, and "+fav+"/6 simplifies to "+cs+"."},ds.slice(0,3),
      "There are "+fav+" favourable faces out of 6. \\(P = "+FR(fav,6)+" = "+cs+"\\). The probability is <b>\\("+cs+"\\)</b>.",{mode:"die"});
  }
  if(mode==="spinner"){
    var secs=pick([4,6,8]);var favSecs=ri(1,secs-1);var cs2=u7fracStr(favSecs,secs);
    var seen2={};seen2[cs2]=1;var ds2=[];
    [u7fracStr(secs-favSecs,secs),favSecs+"/"+secs,u7fracStr(favSecs+1,secs),u7fracStr(1,secs)].forEach(function(a){if(!seen2[a]&&ds2.length<3){seen2[a]=1;ds2.push({t:"\\("+a+"\\)",fb:"Use the number of matching sections over the total number of equal sections, then simplify."});}});
    var e2=2;while(ds2.length<3){var a2=u7fracStr(e2,secs);if(!seen2[a2]){seen2[a2]=1;ds2.push({t:"\\("+a2+"\\)",fb:"Use matching sections over total sections, then simplify."});}e2++;}
    return mcq("A spinner has "+secs+" equal sections. Exactly "+favSecs+" of the sections are shaded. What is the probability of landing on a shaded section?",
      {t:"\\("+cs2+"\\)",fb:"Yes: "+favSecs+" of "+secs+" sections are shaded, which simplifies to "+cs2+"."},ds2.slice(0,3),
      "Favourable sections: "+favSecs+". Total sections: "+secs+". \\(P = "+FR(favSecs,secs)+" = "+cs2+"\\). The probability is <b>\\("+cs2+"\\)</b>.",{mode:"spinner"});
  }
  var r=ri(1,6),b=ri(1,6),g=ri(0,5);var total2=r+b+g;var colPick=pick(["red","blue"]);var fav2=colPick==="red"?r:b;
  var cs3=u7fracStr(fav2,total2);var seen3={};seen3[cs3]=1;var ds3=[];
  [u7fracStr(total2-fav2,total2),fav2+"/"+total2,u7fracStr(fav2,total2-fav2),u7fracStr(fav2+1,total2)].forEach(function(a){if(!seen3[a]&&ds3.length<3){seen3[a]=1;ds3.push({t:"\\("+a+"\\)",fb:"The numerator counts only the "+colPick+" marbles, and the denominator is the total number of marbles. Simplify at the end."});}});
  var e3=1;while(ds3.length<3){var a3=u7fracStr(e3,total2+3);if(!seen3[a3]){seen3[a3]=1;ds3.push({t:"\\("+a3+"\\)",fb:"Count the "+colPick+" marbles over the total, then simplify."});}e3++;}
  return mcq("A bag holds "+r+" red, "+b+" blue"+(g?" and "+g+" green":"")+" marbles. One marble is drawn at random. What is the probability of drawing a "+colPick+" marble?",
    {t:"\\("+cs3+"\\)",fb:"Yes: "+fav2+" of the "+total2+" marbles are "+colPick+", which simplifies to "+cs3+"."},ds3.slice(0,3),
    "Favourable outcomes: "+fav2+". Total outcomes: "+total2+". \\(P = "+FR(fav2,total2)+" = "+cs3+"\\). The probability is <b>\\("+cs3+"\\)</b>.",{mode:"bag"});
},["Probability is favourable outcomes divided by total possible outcomes.","Start by counting the favourable outcomes and the total number of outcomes, then simplify the fraction."]);

E("u7-bar-graph",7,["11.6","11.9"],1,"gen",function(){
  var sets=[["Walk","Bus","Bike","Car"],["Hockey","Soccer","Swim","Dance"],["Cats","Dogs","Fish","Birds"],["Pizza","Pasta","Salad","Soup"]];
  var labels=pick(sets);var vals=labels.map(function(){return ri(2,14);});
  var mode=pick(["max","total","diff","read"]);
  var prompt,correct,ds,sol;
  if(mode==="max"){var mi=vals.indexOf(Math.max.apply(null,vals));correct=labels[mi];
    ds=labels.filter(function(l,i){return i!==mi;}).map(function(l){return {t:l,fb:"Compare the bar heights. The tallest bar shows the largest value."};});
    prompt="The bar graph shows survey results. Which category has the greatest number?";sol="The tallest bar is "+labels[mi]+" with "+vals[mi]+". The answer is <b>"+labels[mi]+"</b>.";
  } else if(mode==="total"){var tot=vals.reduce(function(a,b){return a+b;},0);correct=String(tot);
    ds=u7numOpts(tot,[tot+3,tot-2,Math.max.apply(null,vals)]).map(function(v){return {t:String(v),fb:"Add the heights of all four bars to get the total."};});
    prompt="The bar graph shows survey results. How many responses were there in total?";sol="Add the bar values: "+vals.join(" + ")+" = "+tot+". The total is <b>"+tot+"</b>.";
  } else if(mode==="diff"){var i1=ri(0,3),i2=ri(0,3);if(i2===i1)i2=(i1+1)%4;var d=Math.abs(vals[i1]-vals[i2]);correct=String(d);
    ds=u7numOpts(d,[d+2,Math.max(d-1,0),vals[i1]+vals[i2]]).map(function(v){return {t:String(v),fb:"Read both bar heights, then subtract the smaller from the larger."};});
    prompt="The bar graph shows survey results. How many more responses did "+labels[i1]+" get than "+labels[i2]+"?";sol=labels[i1]+" has "+vals[i1]+" and "+labels[i2]+" has "+vals[i2]+". The difference is \\(|"+vals[i1]+" - "+vals[i2]+"| = "+d+"\\). The answer is <b>"+d+"</b>.";
  } else {var i3=ri(0,3);correct=String(vals[i3]);
    ds=u7numOpts(vals[i3],[vals[i3]+1,Math.max(vals[i3]-1,0),vals[(i3+1)%4]]).map(function(v){return {t:String(v),fb:"Find the "+labels[i3]+" bar and read the value at its top."};});
    prompt="The bar graph shows survey results. How many responses did "+labels[i3]+" get?";sol="The top of the "+labels[i3]+" bar sits at "+vals[i3]+". The answer is <b>"+vals[i3]+"</b>.";
  }
  var q=mcq(prompt,{t:correct,fb:"Yes, that reading matches the bar graph."},ds,sol,{mode:mode});
  q.figure=u7barSVG(labels,vals,"Responses");
  return q;
},["Read each bar height from the top of the bar before you calculate.","Start by listing the value of every bar shown."]);

E("u7-line-graph",7,["11.9"],1,"gen",function(){
  var days=["Mon","Tue","Wed","Thu","Fri"];var vals=days.map(function(){return ri(6,24);});
  var mode=pick(["warmest","change","read"]);
  var prompt,correct,ds,sol;
  if(mode==="warmest"){var mi=vals.indexOf(Math.max.apply(null,vals));correct=days[mi];
    ds=days.filter(function(d,i){return i!==mi;}).slice(0,3).map(function(d){return {t:d,fb:"The highest point on the line graph marks the greatest temperature."};});
    prompt="The line graph shows the daily high temperature for five days. On which day was it warmest?";sol="The highest point is on "+days[mi]+" at "+vals[mi]+" degrees. The answer is <b>"+days[mi]+"</b>.";
  } else if(mode==="change"){var i1=ri(0,2),i2=ri(3,4);var d=vals[i2]-vals[i1];correct=String(d);
    ds=u7numOpts(d,[d+2,d-2,-d===d?d+3:-d]).map(function(v){return {t:String(v),fb:"Subtract the earlier temperature from the later temperature, keeping the sign."};});
    if(ds.length<3)ds.push({t:String(d+5),fb:"Subtract the earlier temperature from the later temperature, keeping the sign."});
    prompt="The line graph shows the daily high temperature for five days. By how many degrees did the temperature change from "+days[i1]+" to "+days[i2]+"?";sol="\\[ \\begin{aligned} \\text{change} &= "+vals[i2]+" - "+vals[i1]+" \\\\ &= "+d+" \\end{aligned} \\] The change is <b>"+d+" degrees</b>.";
  } else {var i3=ri(0,4);correct=String(vals[i3]);
    ds=u7numOpts(vals[i3],[vals[i3]+2,Math.max(vals[i3]-2,0),vals[(i3+2)%5]]).map(function(v){return {t:String(v),fb:"Find "+days[i3]+" on the horizontal axis and read the point value above it."};});
    prompt="The line graph shows the daily high temperature for five days. What was the temperature on "+days[i3]+"?";sol="The point above "+days[i3]+" sits at "+vals[i3]+" degrees. The answer is <b>"+vals[i3]+" degrees</b>.";
  }
  var q=mcq(prompt,{t:correct,fb:"Yes, that reading matches the line graph."},ds,sol,{mode:mode});
  q.figure=u7lineSVG(days,vals,"Degrees");
  return q;
},["Each point on a line graph gives the value for that day.","Start by reading the two values you need straight off the graph."]);

E("u7-circle-graph",7,["11.9"],1,"gen",function(){
  var labelSets=[["Bus","Walk","Bike"],["Reading","Games","Sport","Music"],["Apples","Bananas","Oranges"],["Red","Blue","Green","Yellow"],["Soccer","Hockey","Dance"],["Tea","Juice","Water","Milk"]];
  var pctSets=[[50,30,20],[40,30,20,10],[25,50,25],[30,30,25,15],[60,25,15],[45,35,20],[20,20,30,30],[35,45,20]];
  var labels=pick(labelSets);var pcts=pick(pctSets);var guard=0;while(pcts.length!==labels.length&&guard<20){pcts=pick(pctSets);guard++;}
  if(pcts.length!==labels.length){labels=["Bus","Walk","Bike","Car"];pcts=[40,30,20,10];}
  var total=pick([40,60,80,100,120,160,200]);var idx=ri(0,labels.length-1);var qty=pcts[idx]*total/100;
  var ctx=pick(["travel to school","choose a free-time activity","pick a favourite fruit","pick a favourite colour","join a sports club","choose a drink"]);
  var prompt="A circle graph shows how "+total+" students "+ctx+". What number of students does the "+labels[idx]+" section represent?";
  var ds=u7numOpts(qty,[qty+5,Math.max(qty-5,1),pcts[idx]]).map(function(v){return {t:String(v),fb:"Multiply the percent for that section by the total number of students."};});
  var q=mcq(prompt,{t:String(qty),fb:"Yes: "+pcts[idx]+" percent of "+total+" is "+qty+"."},ds,
    "The "+labels[idx]+" section is "+pcts[idx]+" percent of the total. \\[ \\begin{aligned} \\text{quantity} &= "+fmt(pcts[idx]/100,2)+" \\times "+total+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+" students</b>.",{mode:"circle"});
  q.figure=u7pieSVG(labels.map(function(l,i){return {label:l,pct:pcts[i]};}));
  return q;
},["A circle graph section shows a percent of the whole total.","Start by multiplying the section percent, written as a decimal, by the total."]);

E("u7-choose-measure",7,["11.8"],2,"var",varset([
  function(){return mcq("A shoe store records the sizes sold in one day. The owner wants to know which size to stock most. Which measure is most appropriate?",
    {t:"Mode",fb:"Yes: the mode names the size sold most often, which is exactly what stocking needs."},
    [{t:"Mean",fb:"The mean size may fall between sizes and does not name the most common size."},{t:"Median",fb:"The median gives the middle size, not the size sold most often."},{t:"Range",fb:"The range measures spread, not which size sells most."}],
    "Stocking decisions depend on the most frequent size, which is the mode. The answer is <b>Mode</b>.",{mode:"shoe"});},
  function(){return mcq("Ten workers earn typical wages, and the owner earns far more than everyone else. Which measure best reports a typical wage?",
    {t:"Median",fb:"Yes: the median is the middle wage and is barely moved by the one very large wage."},
    [{t:"Mean",fb:"The mean is pulled upward by the owner's wage, so it overstates a typical wage."},{t:"Mode",fb:"Wages may all be different, so there may be no mode to report."},{t:"Range",fb:"The range measures spread, not a typical value."}],
    "One extreme wage pulls the mean up. The middle value, the median, better represents a typical wage. The answer is <b>Median</b>.",{mode:"wage"});},
  function(){return mcq("A teacher wants one number for the class's overall quiz performance to compare total points earned across two classes of the same size. Which measure fits best?",
    {t:"Mean",fb:"Yes: the mean uses every score and reflects the total points earned."},
    [{t:"Mode",fb:"The mode only names the most common score and ignores the rest."},{t:"Median",fb:"The median uses only the middle score and ignores how high or low the others are."},{t:"Range",fb:"The range measures spread, not overall performance."}],
    "Comparing totals across equal-size groups calls for the mean, which uses every value. The answer is <b>Mean</b>.",{mode:"quiz"});},
  function(){return mcq("A survey asks students for their favourite lunch item. Which measure can describe the most popular choice?",
    {t:"Mode",fb:"Yes: favourite items are categories, and the mode names the most chosen category."},
    [{t:"Mean",fb:"Categories have no numerical average, so a mean cannot be computed."},{t:"Median",fb:"Categories cannot be ordered into a meaningful middle value here."},{t:"Range",fb:"The range needs numerical values and measures spread."}],
    "The data are categories, so only the mode applies: it names the most popular choice. The answer is <b>Mode</b>.",{mode:"lunch"});},
  function(){return mcq("House prices on a street are mostly similar, except one mansion worth far more. A report wants the typical house price. Which measure is most appropriate?",
    {t:"Median",fb:"Yes: the median sits among the typical prices and resists the mansion's pull."},
    [{t:"Mean",fb:"The mansion pulls the mean well above the typical price on the street."},{t:"Mode",fb:"Prices are unlikely to repeat exactly, so a mode may not exist."},{t:"Range",fb:"The range measures spread, not a typical price."}],
    "The single mansion is an outlier that distorts the mean. The median gives the typical price. The answer is <b>Median</b>.",{mode:"house"});}
]),["Match the measure to the question: most frequent, middle, or overall average.","Start by asking what the report needs to describe, and whether any value is extreme."]);

E("u7-outlier-find",7,["11.10"],1,"gen",function(){
  var base=ri(10,30);var cluster=[];for(var i=0;i<5;i++)cluster.push(base+ri(-3,4));
  var high=Math.random()<0.5;var out=high?base+ri(25,45):Math.max(base-ri(18,26),1);
  var vals=shuffle(cluster.concat([out]));
  var others=cluster.slice().sort(function(a,b){return a-b;});
  var cand=[others[4],others[0],Math.round(u7median(vals))];
  var seen={};seen[String(out)]=1;var ds=[];
  cand.forEach(function(v){if(!seen[String(v)]){seen[String(v)]=1;ds.push({t:String(v),fb:"That value sits inside the main cluster. An outlier lies far away from the rest of the data."});}});
  var k=1;while(ds.length<3){var v=out+k*7;k++;if(seen[String(v)])continue;seen[String(v)]=1;ds.push({t:String(v),fb:"That value is not even in the data set. Check each listed value against the cluster."});}
  return mcq("Data set: "+vals.join(", ")+". Which value is an outlier?",
    {t:String(out),fb:"Yes: "+out+" lies far from the cluster of values near "+base+"."},ds,
    "Most values cluster near "+base+", between "+Math.min.apply(null,cluster)+" and "+Math.max.apply(null,cluster)+". The value "+out+" lies far outside that cluster. The outlier is <b>"+out+"</b>.",{mode:"find"});
},["An outlier is a value far removed from the main cluster of data.","Start by picturing the values on a number line and looking for a gap."]);

E("u7-missing-value-cr",7,["11.9"],2,"gen",function(){
  var meanT=ri(6,12);var known=[];var s=0;for(var i=0;i<4;i++){var v=ri(3,15);known.push(v);s+=v;}
  var missing=5*meanT-s;var guard=0;
  while((missing<1||missing>20)&&guard<40){known=[];s=0;for(var j=0;j<4;j++){var w=ri(3,15);known.push(w);s+=w;}missing=5*meanT-s;guard++;}
  if(missing<1||missing>20){known=[meanT-2,meanT,meanT+1,meanT+1];s=4*meanT;missing=meanT;}
  return numq("Four quiz scores are "+known.join(", ")+". What fifth score gives a mean of exactly "+meanT+"?",
    missing,0,
    "The five scores must total \\(5 \\times "+meanT+" = "+(5*meanT)+"\\). \\[ \\begin{aligned} \\text{known total} &= "+known.join(" + ")+" = "+s+" \\\\ \\text{fifth score} &= "+(5*meanT)+" - "+s+" = "+missing+" \\end{aligned} \\] The fifth score is <b>"+missing+"</b>.",
    {mode:"missing",mean:meanT});
},["Work backwards from the mean: the total is the mean times the number of values.","Start by multiplying the target mean by 5 to find the required total."]);

E("u7-median-range-cr",7,["11.6","11.7"],1,"gen",function(){
  var mode=pick(["median6","median5","range"]);
  if(mode==="range"){var lo=ri(3,12),hi=lo+ri(5,16);var vals=[lo,hi];for(var i=0;i<4;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
    return numq("Data set: "+vals.join(", ")+". What is the range?",hi-lo,0,
      "The largest value is "+hi+" and the smallest is "+lo+". \\[ \\begin{aligned} \\text{range} &= "+hi+" - "+lo+" \\\\ &= "+(hi-lo)+" \\end{aligned} \\] The range is <b>"+(hi-lo)+"</b>.",{mode:"range"});
  }
  if(mode==="median5"){var v5=[];for(var a=0;a<5;a++)v5.push(ri(2,18));var s5=v5.slice().sort(function(x,y){return x-y;});var med5=s5[2];
    return numq("Data set: "+v5.join(", ")+". What is the median?",med5,0,
      "Order the values: "+s5.join(", ")+". The middle value is <b>"+med5+"</b>.",{mode:"median5"});
  }
  var v6=[];for(var b=0;b<6;b++)v6.push(ri(2,20));var s6=v6.slice().sort(function(x,y){return x-y;});var med6=(s6[2]+s6[3])/2;
  return numq("Data set: "+v6.join(", ")+". What is the median?",med6,0.01,
    "Order the values: "+s6.join(", ")+". With six values, average the two middle values. \\[ \\begin{aligned} \\text{median} &= \\frac{"+s6[2]+" + "+s6[3]+"}{2} \\\\ &= "+fmt(med6)+" \\end{aligned} \\] The median is <b>"+fmt(med6)+"</b>.",{mode:"median6"});
},["Order the values before finding a median; the range needs only the two extremes.","Start by rewriting the data set in increasing order."]);

E("u7-two-event-pct-cr",7,["12.4","12.5","12.7"],1,"gen",function(){
  var fam=pick(["coinspin","coinspin","coindie","twocoin","spindie","twospin","dicesum"]);
  var fav,total,desc;
  var opener=pick(["At a games table","In a class activity","During a board game","At the school fair","In a probability lesson"]);
  if(fam==="coinspin"){var s1=pick([3,4,5,6,8]);var k=ri(1,s1);var face=pick(["heads","tails"]);fav=1;total=2*s1;desc="a coin is tossed and a "+s1+"-section spinner is spun, and the outcome is "+face+" and section "+k;}
  else if(fam==="coindie"){var tg=pick([["heads and an even number",3],["tails and an odd number",3],["heads and a number greater than 4",2],["tails and a number less than 3",2],["heads and a 5",1],["tails and a 2",1]]);fav=tg[1];total=12;desc="a coin is tossed and a die is rolled, and the outcome is "+tg[0];}
  else if(fam==="twocoin"){var tg2=pick([["two heads",1],["two tails",1],["exactly one head",2],["at least one head",3]]);fav=tg2[1];total=4;desc="two coins are tossed, and the outcome is "+tg2[0];}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="a "+s2+"-section spinner is spun and a die is rolled, and the outcome is section "+k2+" and a "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5]);var k3=ri(1,s3);fav=1;total=s3*s3;desc="a "+s3+"-section spinner is spun twice, and the outcome is section "+k3+" both times";}
  else {var t=ri(2,8);fav=t<=7?t-1:13-t;total=36;desc="two dice are rolled, and the outcome is a total of "+t;}
  var pct=fav/total*100;
  return numq(opener+", "+desc+". What is the theoretical probability of this outcome, as a percent?",
    Math.round(pct*100)/100,0.02,
    "The combined sample space has "+total+" equally likely outcomes, and "+fav+" of them match. \\[ \\begin{aligned} P &= "+FR(fav,total)+" \\\\ &= "+fmt(pct)+"\\% \\end{aligned} \\] The probability is <b>"+fmt(pct)+"%</b>.",
    {mode:"pct",total:total,fav:fav});
},["List the combined sample space size first: multiply the outcomes of each event.","Start by counting all combined outcomes, then the matching ones."]);
E("u7-sample-space",7,["12.3","12.4"],1,"gen",function(){
  var mode=pick(["table","table","count","favcount"]);
  if(mode==="table"){
    var d=pick([3,4,5,6]);var useSpin=Math.random()<0.4;
    var colHead=useSpin?["A","B","C"]:["H","T"];var ncols=colHead.length;
    var rows=[];for(var r=1;r<=d;r++){var row=[String(r)];for(var c=0;c<ncols;c++)row.push(colHead[c]+r);rows.push(row);}
    var total=d*ncols;var ask=pick(["total","dienum","single"]);
    if(ask==="total"){
      var dsT=u7numOpts(total,[total+ncols,total-d,d+ncols]).map(function(v){return {t:String(v),fb:"Multiply the outcomes of one event by the outcomes of the other, or count every cell in the table."};});
      var qT=mcq("The table shows all outcomes when a "+(useSpin?"three-section spinner is spun":"coin is tossed")+" and a "+d+"-sided die is rolled. How many outcomes are in the sample space?",
        {t:String(total),fb:"Yes: "+d+" die results times "+ncols+" results from the other event gives "+total+"."},dsT,
        "Multiply the outcomes of each event: \\("+d+" \\times "+ncols+" = "+total+"\\). The sample space has <b>"+total+"</b> outcomes.",{mode:"table"});
      qT.figure=u7tableSVG("Die",colHead,rows);return qT;
    }
    if(ask==="dienum"){var target=ri(1,d);
      /* Option A fix (Nov 2026): this ask is worded for the coin, so force the coin table here regardless of the spinner draw; the spinner table stays in play for the total ask only. */
      var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
      var dsD=u7numOpts(cnc,[cnc+1,ctot,d]).map(function(v){return {t:String(v),fb:"Find the row for that die number and count its cells, one for each result of the other event."};});
      var qD=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes have die number "+target+"?",
        {t:String(cnc),fb:"Yes: die number "+target+" appears once with heads and once with tails."},dsD,
        "The row for die number "+target+" holds one cell for heads and one for tails. The answer is <b>"+cnc+"</b> outcomes.",{mode:"table"});
      qD.figure=u7tableSVG("Die",chead,crows);return qD;
    }
    var k=ri(1,d);var face=pick(["H","T"]);
    /* Option A fix (Nov 2026): as in the dienum branch above, force the coin table for this coin-worded ask. */
    var chead=["H","T"],cnc=2,ctot=d*2,crows=[];for(var cr=1;cr<=d;cr++){var crow=[String(cr)];for(var cc=0;cc<cnc;cc++)crow.push(chead[cc]+cr);crows.push(crow);}
    var dsS=u7numOpts(1,[2,d,ctot]).map(function(v){return {t:String(v),fb:"A single exact combination appears exactly once in a complete outcome table."};});
    var qS=mcq("The table shows all outcomes when a coin is tossed and a "+d+"-sided die is rolled. How many outcomes are exactly "+face+k+" (coin result "+face+", die number "+k+")?",
      {t:"1",fb:"Yes: that exact combination fills exactly one cell of the table."},dsS,
      "Each cell of the table is one exact combination, and "+face+k+" fills one cell. The answer is <b>1</b>.",{mode:"table"});
    qS.figure=u7tableSVG("Die",chead,crows);return qS;
  }
  var devA=[["coin",2],["three-section spinner",3],["four-section spinner",4],["five-section spinner",5],["six-sided die",6],["eight-sided die",8]];
  var devB=[["coin",2],["four-sided die",4],["six-section spinner",6],["eight-sided die",8],["three-section spinner",3],["four-sided die",4]];
  var A=pick(devA),B=pick(devB);var guard=0;while(A[1]*B[1]>36&&guard<20){B=pick(devB);guard++;}
  if(A[1]*B[1]>36){B=["four-sided die",4];}
  var tot=A[1]*B[1];
  if(mode==="favcount"){
    var dsF=u7numOpts(A[1],[B[1],tot,A[1]+B[1]]).map(function(v){return {t:String(v),fb:"Fix the named result for the second event; the first event can still show any of its outcomes."};});
    return mcq("A "+A[0]+" is used together with a "+B[0]+". In the combined sample space, how many outcomes show one specified result on the "+B[0]+" (with any result on the "+A[0]+")?",
      {t:String(A[1]),fb:"Yes: the second event is fixed, and the "+A[0]+" can show any of its "+A[1]+" outcomes."},dsF,
      "With the second event fixed at one result, the first event still has "+A[1]+" possible results. The answer is <b>"+A[1]+"</b> outcomes.",{mode:"favcount"});
  }
  var ds3=u7numOpts(tot,[A[1]+B[1],tot+4,Math.max(tot-2,2),tot*2]).map(function(v){return {t:String(v),fb:"For independent events, multiply the number of outcomes of each event."};});
  return mcq("A "+A[0]+" is used together with a "+B[0]+". How many outcomes are in the combined sample space?",
    {t:String(tot),fb:"Yes: "+A[1]+" outcomes times "+B[1]+" outcomes gives "+tot+"."},ds3,
    "The events are independent, so multiply: \\("+A[1]+" \\times "+B[1]+" = "+tot+"\\). The sample space has <b>"+tot+"</b> outcomes.",{mode:"count"});
},["For two independent events, multiply the outcome counts to size the sample space.","Start by counting the outcomes of each event on its own."]);
E("u7-exp-vs-theor",7,["12.6"],1,"gen",function(){
  var trials=pick([20,40,50,100]);var theo=pick([["rolling a 6 on a die",1,6],["flipping heads",1,2],["landing on one section of a four-section spinner",1,4],["drawing a red marble from 3 red and 2 blue",3,5]]);
  var expected=theo[1]/theo[2]*trials;var obs=Math.max(1,Math.round(expected+ri(-4,4)));var guard=0;while(obs===expected&&guard<10){obs=Math.max(1,Math.round(expected+ri(-4,4)));guard++;}
  var expP=obs/trials;var mode=pick(["expfrac","compare"]);
  if(mode==="compare"){
    var larger=expP>theo[1]/theo[2]?"Experimental probability is larger":"Theoretical probability is larger";
    var other=larger.indexOf("Experimental")===0?"Theoretical probability is larger":"Experimental probability is larger";
    return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. Which statement compares the probabilities correctly?",
      {t:larger,fb:"Yes: the experimental value is "+u7fracStr(obs,trials)+" and the theoretical value is "+u7fracStr(theo[1],theo[2])+", and comparing them gives this result."},
      [{t:other,fb:"Compare the two values directly: experimental is "+obs+"/"+trials+", theoretical is "+theo[1]+"/"+theo[2]+"."},{t:"The two probabilities are exactly equal",fb:"The counts do not match the theoretical share exactly, so the probabilities differ."},{t:"The two cannot be compared directly",fb:"Both are fractions between 0 and 1, so they can be compared directly."}],
      "Experimental probability: \\("+FR(obs,trials)+"\\). Theoretical probability: \\("+FR(theo[1],theo[2])+"\\). Comparing the two, <b>"+larger.toLowerCase()+"</b>.",{mode:"compare"});
  }
  var cs=u7fracStr(obs,trials);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(theo[1],theo[2]),obs+"/"+trials,u7fracStr(trials-obs,trials)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}});
  var e=2;while(ds.length<3){var a2=u7fracStr(e,trials);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Experimental probability uses the observed count over the number of trials, then simplifies."});}e++;}
  return mcq("In "+trials+" trials of "+theo[0]+", the outcome occurred "+obs+" times. What is the experimental probability of the outcome?",
    {t:"\\("+cs+"\\)",fb:"Yes: "+obs+" successes out of "+trials+" trials simplifies to "+cs+"."},ds,
    "Experimental probability is successes over trials. \\(P = "+FR(obs,trials)+" = "+cs+"\\). The experimental probability is <b>\\("+cs+"\\)</b>.",{mode:"expfrac"});
},["Experimental probability comes from results: successes divided by trials.","Start by writing the observed count over the total number of trials."]);

E("u7-two-events-prob",7,["12.1","12.5"],2,"gen",function(){
  var fam=pick(["twocoin","coindie","coindie","spincoin","spindie","twospin","dicesum"]);
  var fav,total,desc,target;
  if(fam==="twocoin"){var tg=pick([["two heads",1],["two tails",1],["exactly one head",2],["at least one head",3],["exactly one tail",2]]);fav=tg[1];total=4;desc="two coins are tossed";target=tg[0];}
  else if(fam==="coindie"){var tg2=pick([["heads and an even number",3],["tails and an odd number",3],["heads and a number greater than 4",2],["heads and a number less than 3",2],["tails and a 6",1],["heads and a 1",1],["heads and a prime number",3]]);fav=tg2[1];total=12;desc="a coin is tossed and a die is rolled";target=tg2[0];}
  else if(fam==="spincoin"){var s1=pick([3,4,6,8]);var k=ri(1,s1);var face=pick(["heads","tails"]);fav=1;total=2*s1;desc="a "+s1+"-section spinner is spun and a coin is tossed";target="section "+k+" and "+face;}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="a "+s2+"-section spinner is spun and a die is rolled";target="section "+k2+" and a "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5,6]);var k3=ri(1,s3);var k4=ri(1,s3);fav=1;total=s3*s3;desc="a "+s3+"-section spinner is spun twice";target="section "+k3+" then section "+k4;}
  else {var t=ri(2,9);fav=t<=7?t-1:13-t;total=36;desc="two dice are rolled";target="a total of "+t;}
  var opener=pick(["When ","At a games table, when ","In a class game, when ","During a board game, when "]);
  var cs=u7fracStr(fav,total);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(total-fav,total),fav+"/"+total,u7fracStr(fav+1,total),u7fracStr(fav,total+6)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the matching combined outcomes over the full sample space, then simplify."});}});
  var e=3;while(ds.length<3){var a2=u7fracStr(e,total);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Count the matching combined outcomes over the full sample space, then simplify."});}e++;}
  return mcq(opener+desc+", what is the theoretical probability of getting "+target+"?",
    {t:"\\("+cs+"\\)",fb:"Yes: "+fav+" of the "+total+" combined outcomes match, which simplifies to "+cs+"."},ds,
    "The sample space has "+total+" equally likely outcomes and "+fav+" match the target. \\(P = "+FR(fav,total)+" = "+cs+"\\). The probability is <b>\\("+cs+"\\)</b>.",{mode:"two",fam:fam});
},["Build the combined sample space first, then count the matching outcomes.","Start by multiplying the outcome counts of the two events to get the sample space size."]);
E("u7-outlier-effect",7,["11.11","11.8"],1,"gen",function(){
    var base=ri(8,15);var vals=[];for(var i=0;i<5;i++)vals.push(base+ri(-2,3));var out=base+ri(30,50);var all=vals.concat([out]);
    return mcq("Data set: "+shuffle(all).join(", ")+". The value "+out+" is an outlier. Which statement describes its effect correctly?",
      {t:"It raises the mean a lot but barely changes the median",fb:"Yes: the mean uses the outlier's full size, while the median only shifts position slightly."},
      [{t:"It raises the median a lot but barely changes the mean",fb:"The median depends on position, not size, so one large value barely moves it. The mean absorbs the full value."},{t:"It changes the mean and median by the same amount",fb:"The mean is pulled toward the outlier; the median is not, so the effects differ."},{t:"It has no effect on either measure",fb:"The mean must rise because the total grows while the count grows by only one."}],
      "The outlier adds a large amount to the total, pulling the mean up strongly. The median, based on position, moves very little. The answer is <b>It raises the mean a lot but barely changes the median</b>.",{mode:"effect"});
},["Ask which measure the outlier can pull: the mean uses every value's size.","Start by checking whether one value is far from the rest of the data."]);


E("u7-outlier-measure-choice",7,["11.11","11.8"],2,"gen",function(){
  var base2=ri(20,40);
  return mcq("Salaries at a small shop are mostly near $"+base2+",000, but the owner earns $"+(base2+120)+",000. Which measure should a report use for a typical salary, and why?",
    {t:"Median, because the owner's salary pulls the mean upward",fb:"Yes: the median resists the single extreme salary and stays typical."},
    [{t:"Mean, because it uses every salary including the owner's",fb:"Using every salary is exactly the problem here: the extreme salary drags the mean away from typical."},{t:"Mode, because most salaries repeat exactly",fb:"Salaries rarely repeat exactly, so a mode may not exist."},{t:"Range, because it shows the typical salary",fb:"The range shows spread between extremes, not a typical value."}],
    "One extreme salary distorts the mean. The median stays among the typical salaries. The answer is <b>Median, because the owner's salary pulls the mean upward</b>.",{mode:"choose"});
},["Ask which measure the outlier can pull: the mean uses every value's size.","Start by checking whether one value is far from the rest of the data."]);

E("u7-outlier-judge",7,["11.10","11.12","11.13"],3,"var",varset([
  function(){return mcq("A runner's race times in seconds are mostly near 62, but one time is 95 because the runner stopped to retie a shoe. A report of the runner's typical time should:",
    {t:"Leave out the 95, because it reflects the stop, not the runner's speed",fb:"Yes: the outlier came from an interruption, so it misrepresents typical performance."},
    [{t:"Keep the 95, because every recorded value must always be used",fb:"Values caused by a recording problem or interruption may fairly be excluded with a stated reason."},{t:"Keep the 95 and report only the mean of all the runner's recorded race times",fb:"The mean with the 95 included would overstate the typical time the most."},{t:"Replace the 95 with the fastest time the runner has ever recorded",fb:"Changing a recorded value to a different number invents data."}],
    "The 95 second time was caused by a stop, not by running speed, so it should be excluded when reporting typical performance. The answer is <b>Leave out the 95</b>.",{mode:"race"});},
  function(){return mcq("A class collects the heights of all 20 students. One student is much taller than the rest, but the measurement is correct. For a report on the class's heights, the tall value should:",
    {t:"Be kept, because it is a genuine member of the class",fb:"Yes: a correct measurement belonging to the group stays in the report, and the median can limit its pull."},
    [{t:"Be left out, because it is much larger than the others",fb:"Size alone is not a reason to drop a correct value that belongs to the group."},{t:"Be changed to match the second tallest student",fb:"Adjusting a correct measurement invents data."},{t:"Force the report to use only the range",fb:"The range highlights the extremes instead of describing the class."}],
    "The value is correct and belongs to the group, so it stays. A median can be reported to limit its effect. The answer is <b>Be kept</b>.",{mode:"height"});},
  function(){return mcq("A weather station records daily rainfall. One day shows 480 mm because of a sensor error; every other day shows under 30 mm. For the monthly rainfall report, the 480 mm value should:",
    {t:"Be left out, because it is a measurement error",fb:"Yes: an error value does not describe real rainfall and would badly distort the totals."},
    [{t:"Be kept, because instruments are always right",fb:"A value far outside what is physically consistent with the rest signals an error to check."},{t:"Be averaged in, since one value cannot matter much",fb:"A single huge value can shift a mean a great deal, especially in a small set."},{t:"Be replaced with 30 mm, the next largest value",fb:"Replacing it with a guessed value invents data; excluding an error is the honest step."}],
    "The 480 mm reading is a sensor error, so it is excluded from the report. The answer is <b>Be left out, because it is a measurement error</b>.",{mode:"rain"});},
  function(){return mcq("A fundraiser totals donations from 12 people. Eleven gave $10 to $25, and one gave $500. The organizer reports the typical donation. The best approach is:",
    {t:"Report the median, and mention the $500 gift separately",fb:"Yes: the median reflects the typical gift while the large gift is still acknowledged."},
    [{t:"Report the mean, since it gives the typical donation",fb:"The mean here is near $63, which no typical donor gave; the $500 pulls it up."},{t:"Leave the $500 out of all records kept by the organizer",fb:"The gift is real money and belongs in totals, even if the median better shows the typical gift."},{t:"Report the mode of the donations given by the twelve people",fb:"The donations differ, so there is likely no mode to report."}],
    "The $500 gift is genuine, so it stays in the records, but the median better represents a typical donation. The answer is <b>Report the median, and mention the $500 gift separately</b>.",{mode:"donation"});},
  function(){return mcq("Which situation is one where an outlier should be kept in the data when reporting results?",
    {t:"A basketball player scores 41 points in one game while usually scoring near 15",fb:"Yes: the big game really happened and is part of the player's record."},
    [{t:"A scale misreads a mass as 900 kg for a 9 kg object in the whole experiment",fb:"That value is an instrument error, not a real result."},{t:"A time is typed as 450 seconds instead of 45.0 seconds in the results table",fb:"That value is a typing error and should be corrected or excluded."},{t:"A temperature sensor left in direct sun reads far above the air temperature",fb:"That reading does not measure what the study intends, so it should be excluded."}],
    "A genuine standout performance belongs in the data. Errors from instruments or typing do not. The answer is <b>A basketball player scores 41 points in one game</b>.",{mode:"keep"});}
]),["Decide first whether the outlier is genuine data or an error, then choose the handling.","Start by asking what caused the unusual value."]);

E("u7-central-problem-cr",7,["11.9","11.11"],3,"gen",function(){
  var mode=pick(["remove","combine","target"]);
  if(mode==="remove"){
    var base=ri(6,12);var vals=[];for(var i=0;i<5;i++)vals.push(base+ri(-2,2));var out=base+ri(28,44);var all=shuffle(vals.concat([out]));
    var m5=u7mean(vals);
    return numq("Data set: "+all.join(", ")+". The largest value is an outlier. What is the mean of the remaining five values?",
      m5,0.01,
      "Remove the outlier "+out+". The remaining values total "+fmt(m5*5)+". \\[ \\begin{aligned} \\text{mean} &= "+fmt(m5*5)+" \\div 5 \\\\ &= "+fmt(m5)+" \\end{aligned} \\] The mean is <b>"+fmt(m5)+"</b>.",{mode:"remove"});
  }
  if(mode==="combine"){
    var n1=pick([4,5]),n2=pick([4,5]);var m1=ri(6,11),m2=ri(7,13);var ans=(n1*m1+n2*m2)/(n1+n2);
    return numq("Group A has "+n1+" students with a mean score of "+m1+". Group B has "+n2+" students with a mean score of "+m2+". What is the mean score of all the students combined?",
      ans,0.01,
      "Turn each mean back into a total. \\[ \\begin{aligned} \\text{total} &= "+n1+" \\times "+m1+" + "+n2+" \\times "+m2+" = "+(n1*m1+n2*m2)+" \\\\ \\text{mean} &= "+(n1*m1+n2*m2)+" \\div "+(n1+n2)+" = "+fmt(ans)+" \\end{aligned} \\] The combined mean is <b>"+fmt(ans)+"</b>.",{mode:"combine"});
  }
  var cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];var s=cur.reduce(function(a,b){return a+b;},0);var target=ri(72,88);var need=target/10*5-s;var guard=0;
  while((need<1||need>10)&&guard<30){cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];s=cur.reduce(function(a,b){return a+b;},0);need=target/10*5-s;guard++;}
  if(need<1||need>10){cur=[7,7,7,7];s=28;target=76;need=10;}
  return numq("After four tests, a student's scores are "+cur.join(", ")+" out of 10. What score on the fifth test gives an overall mean of "+fmt(target/10,1)+" out of 10?",
    need,0.01,
    "Five tests with mean "+fmt(target/10,1)+" must total \\(5 \\times "+fmt(target/10,1)+" = "+fmt(target/2,1)+"\\). \\[ \\begin{aligned} \\text{fifth score} &= "+fmt(target/2,1)+" - "+s+" \\\\ &= "+fmt(need,1)+" \\end{aligned} \\] The fifth score is <b>"+fmt(need,1)+"</b>.",{mode:"target"});
},["Turn means into totals first; totals are what combine and compare.","Start by multiplying each mean by its number of values."]);

E("u7-expected-count-cr",7,["12.6","12.7"],3,"gen",function(){
  var fam=pick(["die","die","coin","bag","spinner","twocoin"]);
  var fav,total,trials,desc;
  if(fam==="die"){var tg=pick([["rolling a 6",1],["rolling a 1",1],["rolling an even number",3],["rolling an odd number",3],["rolling a number greater than 4",2],["rolling a number less than 3",2],["rolling a prime number",3]]);fav=tg[1];total=6;trials=6*ri(5,30);desc=tg[0]+" on a fair die";}
  else if(fam==="coin"){fav=1;total=2;trials=2*ri(10,90);desc="flipping heads on a fair coin";}
  else if(fam==="bag"){var r=ri(1,5),o=ri(1,5);fav=r;total=r+o;trials=total*ri(4,25);desc="drawing a red marble from a bag with "+r+" red and "+o+" blue marbles, replacing the marble each time";}
  else if(fam==="spinner"){var s1=pick([4,5,6,8]);var rr=ri(1,s1-1);fav=rr;total=s1;trials=s1*ri(4,25);desc="landing on red on a spinner with "+rr+" red sections out of "+s1+" equal sections";}
  else {fav=1;total=4;trials=4*ri(5,40);desc="getting two heads when two fair coins are tossed";}
  var expected=fav*trials/total;
  var who=pick(["A student","A class","A teacher","A games club"]);
  return numq(who+" repeats an experiment "+trials+" times. The experiment is "+desc+". About how many times should the outcome be expected to occur?",
    expected,0.01,
    "The theoretical probability is \\("+FR(fav,total)+"\\). Multiply by the number of trials. \\[ \\begin{aligned} \\text{expected} &= "+FR(fav,total)+" \\times "+trials+" \\\\ &= "+fmt(expected)+" \\end{aligned} \\] The expected count is <b>"+fmt(expected)+"</b>.",{mode:"expected",fam:fam});
},["Expected count is the theoretical probability times the number of trials.","Start by writing the theoretical probability as a fraction."]);
E("u7-zero-one",7,["12.2","12.3"],3,"var",varset([
  function(){return mcq("A bag holds only red and blue marbles. Which event has probability 0?",
    {t:"Drawing a green marble",fb:"Yes: there are no green marbles, so the event is impossible."},
    [{t:"Drawing a red marble",fb:"Red marbles are in the bag, so this probability is greater than 0."},{t:"Drawing a blue marble",fb:"Blue marbles are in the bag, so this probability is greater than 0."},{t:"Drawing a marble",fb:"Every draw gives a marble, so this probability is 1, not 0."}],
    "No green marbles are in the bag, so drawing one is impossible. The answer is <b>Drawing a green marble</b>.",{mode:"zero"});},
  function(){return mcq("Which event has probability 1?",
    {t:"Rolling a number less than 7 on a six-sided die",fb:"Yes: every face of the die is less than 7, so this is certain."},
    [{t:"Rolling a 6 on a six-sided die in one roll",fb:"Only one of six faces is a 6, so the probability is less than 1."},{t:"Flipping heads on a coin on the first flip",fb:"Tails is also possible, so the probability is less than 1."},{t:"Drawing a red card from a full deck of cards",fb:"Black cards are also in the deck, so this is not certain."}],
    "All six faces are less than 7, so the event always happens. The answer is <b>Rolling a number less than 7</b>.",{mode:"one"});},
  function(){return mcq("Which pair of events is independent?",
    {t:"Tossing a coin and rolling a die",fb:"Yes: the coin result cannot change the die result, and the die cannot change the coin."},
    [{t:"Drawing two cards without replacement",fb:"The first draw changes what remains, so the second draw depends on it."},{t:"Choosing a student and their partner",fb:"The first choice restricts who can be picked second, so the events are linked."},{t:"Picking two marbles without replacement",fb:"Leaving the first marble out changes the bag for the second pick."}],
    "A coin and a die do not affect each other, so the events are independent. The answer is <b>Tossing a coin and rolling a die</b>.",{mode:"indep"});},
  function(){return mcq("A spinner has 4 equal sections, all coloured yellow. What is the probability of landing on yellow, and what kind of event is it?",
    {t:"Probability 1, a certain event",fb:"Yes: every section is yellow, so the spinner always lands on yellow."},
    [{t:"Probability 0, an impossible event",fb:"Landing on yellow always happens here, the opposite of impossible."},{t:"Probability 1/4, from the 4 sections",fb:"All 4 sections are yellow, so 4 of 4 sections match, giving probability 1."},{t:"Probability 4, because 4 are yellow",fb:"Probabilities never exceed 1."}],
    "All 4 of the 4 sections are yellow: \\(P = "+FR(4,4)+" = 1\\). The answer is <b>Probability 1, a certain event</b>.",{mode:"certain"});},
  function(){return mcq("Which pair of events is independent?",
    {t:"Spinning a spinner and tossing a coin",fb:"Yes: neither result can influence the other."},
    [{t:"Drawing two names without replacement",fb:"The first name is gone, which changes the second draw."},{t:"Rolling a die, then scoring double on a 6",fb:"The scoring depends directly on the die result."},{t:"Choosing a captain, then a co-captain",fb:"The first choice removes a player, changing the second choice."}],
    "The spinner and the coin do not affect each other, so the events are independent. The answer is <b>Spinning a spinner and tossing a coin</b>.",{mode:"indep2"});}
]),["Probability 0 means impossible and probability 1 means certain; independent events cannot affect each other.","Start by asking whether the event can happen at all, always happens, or depends on the other event."]);

/* ----- bank-u8.js ----- */
// Figure additions: geometry entries assign q.figure from their own drawn values
// (bisector diagrams, Cartesian grids and triangle angle figures).
// Math 7 Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 3665 to 4165).
// CRMARKS: u8-distance-cr=3
// CRMARKS: u8-translate-cr=3
// CRMARKS: u8-successive-cr=2
// CRMARKS: u8-bisector-cr=3
// CRMARKS: u8-transform-cr=3
/* ===== Unit 8 ===== */
/* Math 7 Unit 8: Geometry (target 10: constructions and Cartesian plane) */
function u8gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u8numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u8pair(x,y){return "("+x+", "+y+")";}
function u8gridSVG(points,polys,segs){
  var W=280,H=280,c=140,st=20;
  function X(x){return c+x*st;}function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="8" x2="'+X(g)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+Y(g)+'" x2="272" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="272,140 264,135 264,145" fill="'+FIG_INK+'"/><polygon points="140,8 135,16 145,16" fill="'+FIG_INK+'"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+X(s[0])+'" y1="'+Y(s[1])+'" x2="'+X(s[2])+'" y2="'+Y(s[3])+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u8segFigure(segs,jx,jy){
  var W=300,H=230;
  function X(x){return 150+(x+jx)*26;}function Y(y){return 115-(y+jy)*26;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line segments diagram">';
  segs.forEach(function(s){out+='<line x1="'+fmt(X(s.x1),1)+'" y1="'+fmt(Y(s.y1),1)+'" x2="'+fmt(X(s.x2),1)+'" y2="'+fmt(Y(s.y2),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
    out+=_txt(X(s.x1)-10,Y(s.y1)-8,s.l1,14,true);out+=_txt(X(s.x2)+10,Y(s.y2)-8,s.l2,14,true);});
  return out+'</svg>';
}
function u8moveText(dx,dy){var parts=[];if(dx!==0)parts.push(Math.abs(dx)+(Math.abs(dx)===1?" unit ":" units ")+(dx>0?"right":"left"));if(dy!==0)parts.push(Math.abs(dy)+(Math.abs(dy)===1?" unit ":" units ")+(dy>0?"up":"down"));return parts.join(" and ");}

E("u8-parallel-perp-id",8,["10.1"],1,"gen",function(){
  var jx=pick([-1,0,0,1]),jy=pick([-1,0,1]);var askPara=Math.random()<0.5;var tmpl=ri(0,2);
  var segs,prompt,correct,ds,sol;
  var opener=pick(["The diagram shows ","A diagram shows "]);
  if(tmpl===0){
    segs=[{x1:-4,y1:2,x2:3,y2:2,l1:"A",l2:"B"},{x1:3,y1:2,x2:3,y2:-2,l1:"",l2:"C"},{x1:3,y1:-2,x2:-4,y2:-2,l1:"",l2:"D"},{x1:-4,y1:-2,x2:-4,y2:2,l1:"",l2:""}];
    prompt=opener+"a rectangle with vertices A, B, C and D, and sides AB, BC, CD and DA. ";
    if(askPara){correct="AB and CD";ds=[{t:"AB and BC",fb:"AB meets BC at a corner, so they are perpendicular, not parallel."},{t:"AB and DA",fb:"AB meets DA at a corner, so they are perpendicular, not parallel."},{t:"BC and CD",fb:"BC meets CD at a corner, so they are perpendicular, not parallel."}];sol="Opposite sides of a rectangle never meet and stay the same distance apart. AB and CD are opposite sides. The parallel pair is <b>AB and CD</b>.";}
    else {correct="AB and BC";ds=[{t:"BC and DA",fb:"BC and DA are opposite sides, so they are parallel, not perpendicular."},{t:"AB and CD",fb:"AB and CD are opposite sides, so they are parallel, not perpendicular."},{t:"AD and BC",fb:"AD and BC are opposite sides (AD is the same segment as DA), so they are parallel, not perpendicular."}];sol="Adjacent sides of a rectangle meet at 90 degrees. AB and BC meet at corner B. The perpendicular pair is <b>AB and BC</b>.";}
  } else if(tmpl===1){
    segs=[{x1:-5,y1:3,x2:2,y2:3,l1:"E",l2:"F"},{x1:-5,y1:-1,x2:2,y2:-1,l1:"G",l2:"H"},{x1:0,y1:4,x2:0,y2:-3,l1:"I",l2:"J"},{x1:-4,y1:-3,x2:3,y2:2,l1:"K",l2:"L"}];
    prompt=opener+"segments EF, GH, IJ and KL. ";
    if(askPara){correct="EF and GH";ds=[{t:"EF and IJ",fb:"IJ crosses EF at a right angle, so they are perpendicular."},{t:"GH and KL",fb:"KL is slanted and would meet GH if extended, so they are not parallel."},{t:"IJ and KL",fb:"KL is slanted and crosses IJ, so they are not parallel."}];sol="EF and GH are both horizontal, stay the same distance apart, and never meet. The parallel pair is <b>EF and GH</b>.";}
    else {correct="EF and IJ";ds=[{t:"EF and GH",fb:"EF and GH are parallel, not perpendicular."},{t:"IJ and KL",fb:"KL crosses IJ at a slanted angle, not 90 degrees."},{t:"GH and KL",fb:"KL crosses GH at a slanted angle, not 90 degrees."}];sol="IJ is vertical and EF is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>EF and IJ</b>.";}
  } else {
    segs=[{x1:-4,y1:3,x2:2,y2:3,l1:"P",l2:"Q"},{x1:-4,y1:-2,x2:2,y2:-2,l1:"R",l2:"S"},{x1:0,y1:4,x2:0,y2:-3,l1:"T",l2:"U"},{x1:-4,y1:-3,x2:3,y2:1,l1:"V",l2:"W"}];
    prompt=opener+"segments PQ, RS, TU and VW. ";
    if(askPara){correct="PQ and RS";ds=[{t:"PQ and TU",fb:"TU crosses PQ at a right angle, so they are perpendicular."},{t:"RS and VW",fb:"VW is slanted and would meet RS if extended, so they are not parallel."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, so they are not parallel."}];sol="PQ and RS are both horizontal and stay the same distance apart. The parallel pair is <b>PQ and RS</b>.";}
    else {correct="PQ and TU";ds=[{t:"PQ and RS",fb:"PQ and RS are parallel, not perpendicular."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, not 90 degrees."},{t:"RS and VW",fb:"VW crosses RS at a slanted angle, not 90 degrees."}];sol="TU is vertical and PQ is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>PQ and TU</b>.";}
  }
  var q=mcq(prompt+(askPara?"Which pair of segments is parallel?":"Which pair of segments is perpendicular?"),
    {t:correct,fb:"Yes, that pair matches the diagram."},ds,sol,{mode:askPara?"para":"perp",tmpl:tmpl});
  q.figure=u8segFigure(segs,jx,jy);
  return q;
},["Parallel segments never meet and stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by checking each pair: do they meet, and if so, at what angle?"]);
E("u8-axes-origin",8,["10.6"],1,"var",varset([
  function(){var q=mcq("On a Cartesian plane, the horizontal axis is called the:",
    {t:"x-axis",fb:"Yes: the x-axis runs horizontally and gives the first number in an ordered pair."},
    [{t:"y-axis",fb:"The y-axis runs vertically, not horizontally."},{t:"origin",fb:"The origin is a point, the point (0, 0), not an axis."},{t:"quadrant",fb:"A quadrant is one of the four regions of the plane, not an axis."}],
    "The horizontal axis is the x-axis. The answer is <b>x-axis</b>.",{mode:"xaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("On a Cartesian plane, the vertical axis is called the:",
    {t:"y-axis",fb:"Yes: the y-axis runs vertically and gives the second number in an ordered pair."},
    [{t:"x-axis",fb:"The x-axis runs horizontally, not vertically."},{t:"origin",fb:"The origin is the point (0, 0), not an axis."},{t:"quadrant",fb:"A quadrant is a region of the plane, not an axis."}],
    "The vertical axis is the y-axis. The answer is <b>y-axis</b>.",{mode:"yaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("What are the coordinates of the origin on a Cartesian plane?",
    {t:"(0, 0)",fb:"Yes: the origin is where the two axes cross, at zero on both."},
    [{t:"(1, 0)",fb:"That point sits one unit right of the origin on the x-axis."},{t:"(0, 1)",fb:"That point sits one unit above the origin on the y-axis."},{t:"(1, 1)",fb:"That point is one unit right and one unit up from the origin."}],
    "The axes cross at zero on both axes. The origin is <b>(0, 0)</b>.",{mode:"origin"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("The point (0, 4) lies:",
    {t:"On the y-axis",fb:"Yes: an x-coordinate of 0 places the point on the y-axis, four units up."},
    [{t:"On the x-axis",fb:"Points on the x-axis have a y-coordinate of 0; this point has y equal to 4."},{t:"At the origin",fb:"The origin is (0, 0); this point is four units above it."},{t:"In Quadrant I",fb:"Points on an axis do not belong to any quadrant."}],
    "An x-coordinate of 0 means the point sits on the y-axis. The answer is <b>On the y-axis</b>.",{mode:"onaxis"}); q.figure=figAxes("onaxis"); return q;},
  function(){var q=mcq("In Quadrant II of a Cartesian plane, the coordinates of every point have:",
    {t:"Negative x and positive y",fb:"Yes: Quadrant II is to the left of the y-axis and above the x-axis."},
    [{t:"Positive x and positive y",fb:"That sign pattern describes Quadrant I, on the right and above."},{t:"Negative x and negative y",fb:"That sign pattern describes Quadrant III, on the left and below."},{t:"Positive x and negative y",fb:"That sign pattern describes Quadrant IV, on the right and below."}],
    "Quadrant II is left of the y-axis (negative x) and above the x-axis (positive y). The answer is <b>Negative x and positive y</b>.",{mode:"quad2"}); q.figure=figAxes("quad2"); return q;}
]),["The x-axis is horizontal, the y-axis is vertical, and they cross at the origin.","Start by picturing the two axes crossing at (0, 0)."]);

E("u8-read-point",8,["10.7"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var guard=0;
  while(Math.abs(x)===Math.abs(y)&&guard<20){y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);guard++;}
  if(Math.abs(x)===Math.abs(y))y=x>0?x-1:x+1;
  var correct=u8pair(x,y);
  var cands=[u8pair(y,x),u8pair(-x,y),u8pair(x,-y)];
  var ds=cands.map(function(t,i){return {t:t,fb:i===0?"The first number is the x-coordinate (horizontal), the second is the y-coordinate (vertical). That pair swaps them.":(i===1?"Check the sign of the x-coordinate: the point is on the other side of the y-axis.":"Check the sign of the y-coordinate: the point is on the other side of the x-axis.")};});
  var q=mcq("Point P is plotted on the Cartesian plane. What are the coordinates of point P?",
    {t:correct,fb:"Yes: from the origin, move "+x+" horizontally and "+y+" vertically to reach P."},ds,
    "From the origin, point P sits "+Math.abs(x)+" units "+(x>0?"right":"left")+" and "+Math.abs(y)+" units "+(y>0?"up":"down")+". The coordinates are <b>"+correct+"</b>.",{mode:"read"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Coordinates are written (x, y): horizontal movement first, then vertical.","Start at the origin and count across, then up or down."]);

E("u8-env-examples",8,["10.2","10.3"],1,"var",varset([
  function(){return mcq("Which of these shows a pair of parallel line segments?",
    {t:"The two rails of a railway track",fb:"Yes: the rails run side by side, always the same distance apart."},
    [{t:"The two edges meeting at the corner of a book",fb:"Edges meeting at a corner form an angle; at a square corner they are perpendicular."},{t:"The hands of a clock at 3:00",fb:"At 3:00 the hands form a right angle, so they are perpendicular, not parallel."},{t:"The two strokes of the letter T",fb:"The strokes of a T meet at a right angle, so they are perpendicular."}],
    "Railway rails stay the same distance apart and never meet: they are parallel. The answer is <b>The two rails of a railway track</b>.",{mode:"rail"});},
  function(){return mcq("Which of these shows a pair of perpendicular line segments?",
    {t:"The corner edges of a window frame",fb:"Yes: the edges of a square window corner meet at 90 degrees."},
    [{t:"The two rails of a railway track",fb:"Rails stay the same distance apart: they are parallel."},{t:"The opposite edges of a ruler",fb:"Opposite edges of a ruler never meet: they are parallel."},{t:"The lines ruled across notebook paper",fb:"Ruled lines run side by side without meeting: they are parallel."}],
    "A window frame corner meets at 90 degrees, which is perpendicular. The answer is <b>The corner edges of a window frame</b>.",{mode:"window"});},
  function(){return mcq("A student looks around a classroom for parallel segments. Which find is correct?",
    {t:"The top and bottom edges of the whiteboard",fb:"Yes: opposite edges of the board run in the same direction and never meet."},
    [{t:"The edge of a desk and the floor line it touches",fb:"Those meet at the desk leg area at an angle rather than running side by side."},{t:"The two sides of an open laptop screen corner",fb:"Sides meeting at a corner of the screen form an angle, not a parallel pair."},{t:"The stripes at the corner of a flag",fb:"Stripes that meet at a corner cross or touch, so they are not parallel segments."}],
    "Opposite edges of the whiteboard are parallel. The answer is <b>The top and bottom edges of the whiteboard</b>.",{mode:"board"});},
  function(){return mcq("Which of these is an example of perpendicular segments in the environment?",
    {t:"A flagpole and the ground line at its base",fb:"Yes: a vertical pole meets level ground at a right angle."},
    [{t:"The rungs of a ladder, spaced one above the other",fb:"Ladder rungs run side by side: they are parallel to each other."},{t:"The opposite sides of a hockey rink",fb:"Opposite sides of the rink run in the same direction: parallel."},{t:"The two long edges of a bookshelf board",fb:"Long edges of one board run side by side: parallel."}],
    "The pole is vertical and the ground is level, meeting at 90 degrees. The answer is <b>A flagpole and the ground line at its base</b>.",{mode:"pole"});},
  function(){return mcq("Which pair of segments is parallel?",
    {t:"The top edge and the bottom edge of a door",fb:"Yes: the top and bottom edges of a door run in the same direction and never meet."},
    [{t:"The two edges that meet at the corner of a page",fb:"Edges meeting at a corner form an angle (90 degrees on a page), not a parallel pair."},{t:"The vertical and horizontal strokes of the letter L",fb:"Those strokes meet at a right angle: perpendicular."},{t:"A shelf edge and the wall edge it meets",fb:"Those edges meet at the corner, so they cannot be parallel."}],
    "The top and bottom edges of a door are parallel. The answer is <b>The top edge and the bottom edge of a door</b>.",{mode:"door"});}
]),["Parallel segments stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by asking whether the two segments meet, and at what angle."]);

E("u8-plot-point",8,["10.7","10.9"],1,"gen",function(){
  var pts=[];var guard=0;
  while(pts.length<4&&guard<200){var x=ri(-5,5),y=ri(-5,5);var ok=true;for(var i=0;i<pts.length;i++){if(pts[i].x===x&&pts[i].y===y)ok=false;}if(ok)pts.push({x:x,y:y});guard++;}
  var labels=["A","B","C","D"];var ti=ri(0,3);var target=pts[ti];
  var ds=labels.filter(function(l,i){return i!==ti;}).map(function(l,i){var p=pts[labels.indexOf(l)];return {t:"Point "+l,fb:"Point "+l+" sits at "+u8pair(p.x,p.y)+", not at the target coordinates."};});
  var q=mcq("Four points are plotted on the Cartesian plane. Which point is at "+u8pair(target.x,target.y)+"?",
    {t:"Point "+labels[ti],fb:"Yes: point "+labels[ti]+" sits "+target.x+" across and "+target.y+" up from the origin."},ds,
    "Counting from the origin, "+u8pair(target.x,target.y)+" is the position of point "+labels[ti]+". The answer is <b>Point "+labels[ti]+"</b>.",{mode:"plot"});
  q.figure=u8gridSVG(pts.map(function(p,i){return {x:p.x,y:p.y,label:labels[i]};}),null,null);
  return q;
},["To plot (x, y), move x units across from the origin, then y units up or down.","Start at the origin and count the x movement first."]);

E("u8-bisector-env",8,["10.4","10.5"],1,"var",varset([
  function(){var q=mcq("What is a perpendicular bisector of a line segment?",
    {t:"A line that cuts the segment into two equal parts at 90 degrees",fb:"Yes: it passes through the midpoint and meets the segment at a right angle."},
    [{t:"A line that cuts the segment into two equal parts at any angle",fb:"Equal parts alone give a midpoint crossing; a perpendicular bisector must also meet at 90 degrees."},{t:"A line that meets the segment at 90 degrees at one of its endpoints",fb:"Meeting at an endpoint cannot split the segment into two equal parts."},{t:"A line that runs alongside the segment and never touches it",fb:"A bisector must cross the segment it bisects."}],
    "A perpendicular bisector crosses at the midpoint and at 90 degrees. The answer is <b>A line that cuts the segment into two equal parts at 90 degrees</b>.",{mode:"defpb"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("A gardener wants a path that is the perpendicular bisector of the front edge of a garden plot. Which path fits?",
    {t:"A path crossing the edge at its exact middle, forming a right angle with it",fb:"Yes: crossing at the midpoint at 90 degrees is exactly a perpendicular bisector."},
    [{t:"A path crossing the edge near one end at a right angle with the edge of the garden plot",fb:"A right angle alone is not enough; the crossing must be at the midpoint."},{t:"A path crossing the edge at its middle at a slanted angle at the crossing point",fb:"The middle alone is not enough; the crossing must also be at 90 degrees."},{t:"A path running along the edge itself from one end of the plot to the other",fb:"A path on the edge does not cross or bisect it."}],
    "The path must cross at the midpoint and at 90 degrees. The answer is <b>A path crossing the edge at its exact middle, forming a right angle with it</b>.",{mode:"garden"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("What is an angle bisector?",
    {t:"A ray that splits an angle into two equal angles",fb:"Yes: the two resulting angles have the same measure."},
    [{t:"A ray that splits an angle into two angles with any measures",fb:"A bisector must create two equal angles, not just any two angles."},{t:"A line that cuts the angle's sides into equal lengths",fb:"That describes cutting a segment, not splitting an angle's measure."},{t:"A ray drawn from outside the angle to its vertex",fb:"A bisector starts at the vertex and goes inside the angle."}],
    "An angle bisector splits the angle into two equal angles. The answer is <b>A ray that splits an angle into two equal angles</b>.",{mode:"defab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Which action creates an angle bisector in an everyday task?",
    {t:"Folding a paper corner so the two edges of the corner line up exactly",fb:"Yes: the fold crease splits the corner angle into two equal angles."},
    [{t:"Cutting a paper corner off with one straight cut across the corner",fb:"Cutting off the corner removes part of the angle instead of splitting it into equal halves."},{t:"Drawing any line from the corner across the paper to the far side",fb:"An arbitrary line need not split the angle equally."},{t:"Measuring the corner angle with a protractor placed on the corner of the paper",fb:"Measuring reads the angle; it does not split it."}],
    "Folding so the edges match makes the crease split the angle equally. The answer is <b>Folding a paper corner so the two edges of the corner line up exactly</b>.",{mode:"foldab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Two lamp posts stand at the ends of a straight path. A bench sits on the perpendicular bisector of the path segment. What is true about the bench?",
    {t:"It is the same distance from each lamp post",fb:"Yes: every point on a perpendicular bisector is equidistant from the segment's endpoints."},
    [{t:"It is closer to the nearer lamp post by half the path length",fb:"Points on the perpendicular bisector are not closer to either end; the distances match."},{t:"It sits at the midpoint of the path",fb:"Only one point of the bisector, the crossing point, is the midpoint; the bench can be anywhere on the line."},{t:"It is twice as far from one post as from the other",fb:"The defining property is equal distances, not a double distance."}],
    "Every point on a perpendicular bisector is the same distance from both endpoints. The answer is <b>It is the same distance from each lamp post</b>.",{mode:"bench"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Folding a paper strip so one end lands exactly on the other end creates a crease. The crease is:",
    {t:"The perpendicular bisector of the strip's length",fb:"Yes: matching the ends makes the crease cross at the midpoint, and a fold crease meets the length at 90 degrees."},
    [{t:"An angle bisector of the strip's corner where the fold starts",fb:"The fold matches the two ends of the length, so it bisects the length, not a corner angle."},{t:"A line parallel to the strip's length along the whole strip",fb:"The crease crosses the length rather than running alongside it."},{t:"The midpoint itself, halfway along the strip",fb:"The crease is a line through the midpoint, not just the point."}],
    "Matching the ends puts the crease through the midpoint at a right angle. The answer is <b>The perpendicular bisector of the strip's length</b>.",{mode:"foldpb"}); q.figure=figBisect("perp"); return q;}
]),["A bisector splits something into two equal parts; perpendicular adds a 90 degree crossing.","Start by checking both conditions: equal parts, and the right angle for a perpendicular bisector."]);

E("u8-bisector-reason",8,["10.15","10.16"],1,"gen",function(){
  var mode=pick(["midpoint","anglehalf","equidist","midpoint2"]);
  if(mode==="anglehalf"){var A=ri(10,80)*2;var half=A/2;
    var ds=u8numOpts(half,[A,half+4,Math.max(half-4,2)]).map(function(v){return {t:String(v),fb:"A bisector splits the angle into two equal parts, so divide the angle by 2."};});
    var q=mcq("An angle of "+A+" degrees is bisected. What is the measure of each resulting angle?",
      {t:String(half),fb:"Yes: "+A+" divided by 2 is "+half+"."},ds,
      "The bisector makes two equal angles. \\[ \\begin{aligned} \\text{each angle} &= "+A+" \\div 2 \\\\ &= "+half+"^\\circ \\end{aligned} \\] Each angle is <b>"+half+" degrees</b>.",{mode:mode}); q.figure=figAngleBisectTotal(A+"°"); return q;
  }
  if(mode==="equidist"){var d=ri(3,15);
    var cand=u8numOpts(d,[d+2,2*d,Math.max(d-1,1)]);
    var ds2=cand.map(function(v){return {t:String(v),fb:"Points on a perpendicular bisector are the same distance from both endpoints of the segment."};});
    var q=mcq("Point P lies on the perpendicular bisector of segment AB. The distance from P to A is "+d+" cm. What is the distance from P to B?",
      {t:String(d),fb:"Yes: every point on the perpendicular bisector is equidistant from A and B."},ds2,
      "A point on the perpendicular bisector is the same distance from both endpoints, so the distance from P to B equals the distance from P to A. The distance is <b>"+d+" cm</b>.",{mode:mode}); q.figure=figEqui(null,d+" cm"); return q;
  }
  var L=ri(4,15)*2;var halfL=L/2;var obj=mode==="midpoint"?pick(["ribbon","board","garden hose","shelf board"]):pick(["rope","ribbon","skateboard ramp edge"]);
  var ds3=u8numOpts(halfL,[L,halfL+2,Math.max(halfL-2,1)]).map(function(v){return {t:String(v),fb:"The perpendicular bisector crosses at the midpoint, halfway along the segment."};});
  var q=mcq("A "+obj+" is "+L+" cm long. Its perpendicular bisector crosses it at M. How far is M from each end?",
    {t:String(halfL),fb:"Yes: the midpoint is halfway along, "+L+" divided by 2."},ds3,
    "The bisector crosses at the midpoint. \\[ \\begin{aligned} \\text{distance} &= "+L+" \\div 2 \\\\ &= "+halfL+" \\text{ cm} \\end{aligned} \\] M is <b>"+halfL+" cm</b> from each end.",{mode:mode}); q.figure=figSegMid(L+" cm"); return q;
},["A bisector cuts into two equal parts: a segment at its midpoint, an angle into two equal angles.","Start by dividing the given length or angle by 2."]);

E("u8-draw-reason",8,["10.13","10.14"],1,"var",varset([
  function(){return mcq("A student slides a set square along a ruler to draw a second line through a point. Why is the new line parallel to the first line?",
    {t:"The set square keeps the same angle with the ruler, so the new line has the same direction as the first",fb:"Yes: both lines make equal corresponding angles with the ruler, which makes them parallel."},
    [{t:"The new line is the same length as the first line, and equal lengths are what make two lines parallel in a drawing",fb:"Equal lengths do not make lines parallel; direction does."},{t:"The ruler is longer than both lines, so any line drawn along it points in the same direction as the first",fb:"The ruler's length plays no role in the direction of the lines."},{t:"The point lies on the first line, so the second line through it has to follow the first line exactly",fb:"In this construction the point is off the first line; the equal angles are what make the lines parallel."}],
    "Sliding the set square preserves the angle, so both lines share the same direction. The answer is <b>The set square keeps the same angle with the ruler</b>.",{mode:"slide"});},
  function(){return mcq("To draw a line perpendicular to a given line through a point on it, a student uses a set square. Why does this work?",
    {t:"The corner of a set square is exactly 90 degrees, so the drawn edge meets the line at 90 degrees",fb:"Yes: the set square's right angle is transferred to the drawing."},
    [{t:"The set square is a triangle, and triangles contain perpendicular lines in this drawing",fb:"Only the right angle corner matters here, not the triangular shape in general."},{t:"The point is on the line, which forces a right angle wherever a new line is drawn through that point",fb:"A point on a line does not by itself create a right angle; the set square does."},{t:"The ruler underneath makes every drawn line perpendicular to the line being drawn on the page",fb:"A ruler guides straightness, not the angle."}],
    "The set square's corner is a true right angle, so the drawn line is perpendicular. The answer is <b>The corner of a set square is exactly 90 degrees</b>.",{mode:"setsq"});},
  function(){return mcq("A student draws a line and claims it is parallel to a given line. Which check confirms the claim?",
    {t:"Measure the distance between the lines at two different places; the distances are equal",fb:"Yes: parallel lines stay the same distance apart everywhere."},
    [{t:"Check that the two lines have the same length from one end of each line to the other end",fb:"Segments can share a length without being parallel."},{t:"Extend one line and see whether it looks straight along its whole length on the page",fb:"Straightness of one line says nothing about its direction relative to the other."},{t:"Measure one angle where a ruler crosses a line, and check that the angle looks right",fb:"One angle alone does not compare the two lines' directions."}],
    "Equal distances at two places confirm the lines stay the same distance apart: they are parallel. The answer is <b>Measure the distance between the lines at two different places; the distances are equal</b>.",{mode:"checkpar"});},
  function(){return mcq("Which sequence draws a line parallel to a given line through a point off the line?",
    {t:"Place a set square edge on the line, rest a ruler against the set square, slide the set square along the ruler to the point, and draw",fb:"Yes: the ruler fixes the direction while the set square slides to the point."},
    [{t:"Draw any line through the point and measure its length to match the given line, checking the length at both ends of the line drawn",fb:"Matching a length does not control direction, so the lines need not be parallel."},{t:"Fold the paper so the point lands anywhere on the line, then draw the crease along the fold from one side of the paper to the other",fb:"That crease depends on where the point lands and is a perpendicular construction, not a parallel one."},{t:"Draw a circle around the point and join two points on the circle, then extend the joining line in both directions past the circle",fb:"A circle construction like that does not fix the direction to match the given line."}],
    "The sliding set square method preserves direction. The answer is <b>Place a set square edge on the line, rest a ruler against the set square, slide the set square along the ruler to the point, and draw</b>.",{mode:"seqpar"});},
  function(){return mcq("A student draws a line through a point and claims it is perpendicular to a given line. Which check confirms the claim?",
    {t:"Measure the angle where the lines meet; it is 90 degrees",fb:"Yes: perpendicular lines are defined by meeting at 90 degrees."},
    [{t:"Check that the new line is longer than the given line",fb:"Length has nothing to do with the angle between the lines."},{t:"Check that the new line does not touch the given line again",fb:"Two straight lines in a plane meet at most once anyway; the angle is the test."},{t:"Measure the distance from the point to both ends of the given line",fb:"Equal distances relate to a perpendicular bisector, not to perpendicularity in general."}],
    "Perpendicular means meeting at 90 degrees, and measuring the angle confirms it. The answer is <b>Measure the angle where the lines meet; it is 90 degrees</b>.",{mode:"checkperp"});}
]),["A construction works because of the property it preserves: direction for parallel, 90 degrees for perpendicular.","Start by naming the property the finished lines must have, then match the method to it."]);

E("u8-shape-vertices",8,["10.8"],1,"gen",function(){
  var tmpl=ri(0,1);var verts,labels=["A","B","C","D"],askIdx;
  if(tmpl===0){var x1=ri(-5,-2),x2=ri(1,4),y1=ri(-4,-1),y2=ri(1,4);verts=[[x1,y2],[x2,y2],[x2,y1],[x1,y1]];askIdx=ri(0,3);}
  else {var bx=ri(-4,-2),by=ri(-3,-1);verts=[[bx,by],[bx+ri(4,6),by],[bx+ri(1,3),by+ri(3,5)]];labels=["A","B","C"];askIdx=2;}
  var target=verts[askIdx];var guard=0;
  while((target[0]===0||target[1]===0||Math.abs(target[0])===Math.abs(target[1]))&&guard<10){askIdx=(askIdx+1)%verts.length;target=verts[askIdx];guard++;}
  var correct=u8pair(target[0],target[1]);
  var raw=[u8pair(target[1],target[0]),u8pair(-target[0],target[1]),u8pair(target[0],-target[1]),u8pair(target[0]+1,target[1]),u8pair(target[0],target[1]+1)];
  var seen={};seen[correct]=1;var ds=[];
  raw.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Read the vertex position again: across from the origin first (x), then up or down (y)."});}});
  var off=2;while(ds.length<3){var t=u8pair(target[0]+off,target[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Read the vertex position again: across first, then up or down."});}off++;}
  var q=mcq("A shape is drawn on the Cartesian plane. What are the coordinates of vertex "+labels[askIdx]+"?",
    {t:correct,fb:"Yes: vertex "+labels[askIdx]+" sits at "+correct+"."},ds,
    "Vertex "+labels[askIdx]+" is "+Math.abs(target[0])+" units "+(target[0]>0?"right":"left")+" and "+Math.abs(target[1])+" units "+(target[1]>0?"up":"down")+" from the origin. Its coordinates are <b>"+correct+"</b>.",{mode:"verts",tmpl:tmpl});
  q.figure=u8gridSVG(verts.map(function(v,i){return {x:v[0],y:v[1],label:labels[i]};}),[verts],null);
  return q;
},["Read each vertex as (x, y): horizontal position first, then vertical.","Start at the origin and count across to line up with the vertex, then up or down."]);

E("u8-move-describe",8,["10.10","10.19"],1,"gen",function(){
  var mode=pick(["describe","hdist","vdist"]);
  if(mode==="hdist"){var y0=ri(-5,5);var x1=ri(-5,2);var d=ri(2,7);var x2=x1+d;if(x2>5){x2=x1-d;}
    var dist=Math.abs(x2-x1);
    var ds=u8numOpts(dist,[dist+1,Math.max(dist-1,1),Math.abs(x1)+Math.abs(x2)===dist?dist+2:Math.abs(x1)+Math.abs(x2)]).map(function(v){return {t:String(v),fb:"The points share the same y-coordinate, so subtract the x-coordinates to get the distance."};});
    var q=mcq("Points A "+u8pair(x1,y0)+" and B "+u8pair(x2,y0)+" lie on the same horizontal line. What is the distance between them?",
      {t:String(dist),fb:"Yes: the x-coordinates differ by "+dist+", and the y-coordinates match."},ds,
      "Same y-coordinate, so the distance is the difference in x. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] The distance is <b>"+dist+" units</b>.",{mode:mode}); q.figure=figWideGrid([{x:x1,y:y0,label:"A"},{x:x2,y:y0,label:"B"}],null,null); return q;
  }
  if(mode==="vdist"){var x0=ri(-5,5);var y1=ri(-5,2);var d2=ri(2,7);var y2=y1+d2;if(y2>5){y2=y1-d2;}
    var dist2=Math.abs(y2-y1);
    var ds2=u8numOpts(dist2,[dist2+1,Math.max(dist2-1,1),dist2+3]).map(function(v){return {t:String(v),fb:"The points share the same x-coordinate, so subtract the y-coordinates to get the distance."};});
    var q=mcq("Points A "+u8pair(x0,y1)+" and B "+u8pair(x0,y2)+" lie on the same vertical line. What is the distance between them?",
      {t:String(dist2),fb:"Yes: the y-coordinates differ by "+dist2+", and the x-coordinates match."},ds2,
      "Same x-coordinate, so the distance is the difference in y. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] The distance is <b>"+dist2+" units</b>.",{mode:mode}); q.figure=figWideGrid([{x:x0,y:y1,label:"A"},{x:x0,y:y2,label:"B"}],null,null); return q;
  }
  var ax=ri(-4,2),ay=ri(-4,2);var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);
  var bx=ax+dx,by=ay+dy;if(bx>5||bx<-5){dx=-dx;bx=ax+dx;}if(by>5||by<-5){dy=-dy;by=ay+dy;}
  var correct=u8moveText(dx,dy);
  var opts=[u8moveText(dy,dx),u8moveText(-dx,dy),u8moveText(dx,-dy)];
  var seen={};seen[correct]=1;var ds3=[];
  opts.forEach(function(t){if(!seen[t]){seen[t]=1;ds3.push({t:t,fb:"Compare coordinates: the change in x gives the horizontal move, the change in y gives the vertical move, and signs give directions."});}});
  var extra=[u8moveText(-dx,-dy),u8moveText(dx+1,dy),u8moveText(dx,dy+1)];var ei=0;
  while(ds3.length<3&&ei<extra.length){if(!seen[extra[ei]]){seen[extra[ei]]=1;ds3.push({t:extra[ei],fb:"Compare coordinates: change in x is horizontal, change in y is vertical, signs give directions."});}ei++;}
  var q=mcq("How do you move from point A "+u8pair(ax,ay)+" to point B "+u8pair(bx,by)+" on a Cartesian plane?",
    {t:correct,fb:"Yes: x changes by "+dx+" and y changes by "+dy+"."},ds3,
    "Change in x: \\("+bx+" - ("+ax+") = "+dx+"\\), so move "+Math.abs(dx)+" "+(dx>0?"right":"left")+". Change in y: \\("+by+" - ("+ay+") = "+dy+"\\), so move "+Math.abs(dy)+" "+(dy>0?"up":"down")+". The move is <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"}],null,null); return q;
},["Compare the coordinates: change in x is the horizontal move, change in y is the vertical move.","Start by subtracting the x-coordinates, then the y-coordinates."]);

E("u8-distance-cr",8,["10.19"],1,"gen",function(){
  var horiz=Math.random()<0.5;
  if(horiz){var y0=ri(-6,6);var x1=ri(-6,3);var x2=x1+ri(2,8);if(x2>6)x2=x1-ri(2,6);var dist=Math.abs(x2-x1);
    var q=numq("Find the distance between the points "+u8pair(x1,y0)+" and "+u8pair(x2,y0)+".",
      dist,0,
      "The y-coordinates are equal, so the points lie on a horizontal line. Subtract the x-coordinates. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] The distance is <b>"+dist+" units</b>.",{mode:"h"}); q.figure=figWideGrid([{x:x1,y:y0},{x:x2,y:y0}],null,null); return q;
  }
  var x0=ri(-6,6);var y1=ri(-6,3);var y2=y1+ri(2,8);if(y2>6)y2=y1-ri(2,6);var dist2=Math.abs(y2-y1);
  var q=numq("Find the distance between the points "+u8pair(x0,y1)+" and "+u8pair(x0,y2)+".",
    dist2,0,
    "The x-coordinates are equal, so the points lie on a vertical line. Subtract the y-coordinates. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] The distance is <b>"+dist2+" units</b>.",{mode:"v"}); q.figure=figWideGrid([{x:x0,y:y1},{x:x0,y:y2}],null,null); return q;
},["Points sharing a y-coordinate sit on a horizontal line; points sharing an x-coordinate sit on a vertical line.","Start by checking which coordinate stays the same."]);

E("u8-translate-cr",8,["10.20"],1,"gen",function(){
  var x=ri(-6,4),y=ri(-6,4);var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var nx=x+dx,ny=y+dy;var askX=Math.random()<0.5;
  var ans=askX?nx:ny;
  var q=numq("Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+". What is the "+(askX?"x":"y")+"-coordinate of the image point?",
    ans,0,
    "Apply the translation to each coordinate. \\[ \\begin{aligned} \\text{image} &= ("+x+" + ("+dx+"), "+y+" + ("+dy+")) \\\\ &= "+u8pair(nx,ny)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"tx":"ty"}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["A translation adds to the x-coordinate for left or right moves and to the y-coordinate for up or down moves.","Start by working out how the asked coordinate changes."]);

E("u8-reflect-point",8,["10.20","10.12"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var img=overX?[x,-y]:[-x,y];var other=overX?[-x,y]:[x,-y];
  var correct=u8pair(img[0],img[1]);
  var raw=[u8pair(x,y),u8pair(other[0],other[1]),u8pair(-x,-y)];
  var ds=raw.map(function(t,i){return {t:t,fb:i===0?"That is the original point; a reflection moves it across the axis.":(i===1?"That is a reflection across the other axis; check which axis the question names.":"That flips both coordinates, which is a half-turn, not a single-axis reflection.")};});
  var q=mcq("Point P "+u8pair(x,y)+" is reflected across the "+axis+". What are the coordinates of the image?",
    {t:correct,fb:"Yes: reflection across the "+axis+" flips the sign of the "+(overX?"y":"x")+"-coordinate only."},ds,
    "Reflecting across the "+axis+" changes the sign of the "+(overX?"y":"x")+"-coordinate and leaves the other alone: "+u8pair(x,y)+" becomes <b>"+correct+"</b>.",{mode:overX?"rx":"ry"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Reflection across the x-axis flips the y sign; across the y-axis flips the x sign.","Start by deciding which coordinate changes sign for the named axis."]);

E("u8-complete-shape",8,["10.8","10.17","10.18"],2,"gen",function(){
  var ax=ri(-5,-2),ay=ri(-4,0);var bx=ax+ri(3,5),by=ay;var sx=pick([-2,-1,1,2]);var sy=ri(2,4);
  var cx=bx+sx,cy=by+sy;var dx2=ax+sx,dy2=ay+sy;
  if(cx>6||cx<-6||dx2>6){sx=-sx;cx=bx+sx;dx2=ax+sx;}
  var correct=u8pair(dx2,dy2);
  var taken={};taken[u8pair(ax,ay)]=1;taken[u8pair(bx,by)]=1;taken[u8pair(cx,cy)]=1;taken[correct]=1;
  var offs=[[1,0],[0,1],[-1,0],[0,-1],[2,1],[-2,-1],[1,-1]];
  var ds=[];
  for(var i=0;i<offs.length&&ds.length<3;i++){var t=u8pair(dx2+offs[i][0],dy2+offs[i][1]);if(!taken[t]){taken[t]=1;ds.push({t:t,fb:"In a parallelogram, the fourth vertex shifts from A by the same change that takes B to C."});}}
  var q=mcq("Points A "+u8pair(ax,ay)+", B "+u8pair(bx,by)+" and C "+u8pair(cx,cy)+" are three vertices of a parallelogram ABCD, in order. What are the coordinates of vertex D?",
    {t:correct,fb:"Yes: D shifts from A by the same change that takes B to C."},ds,
    "From B to C the change is ("+(cx-bx)+", "+(cy-by)+"). Apply the same change to A. \\[ \\begin{aligned} D &= ("+ax+" + ("+(cx-bx)+"), "+ay+" + ("+(cy-by)+")) \\\\ &= "+correct+" \\end{aligned} \\] Vertex D is <b>"+correct+"</b>.",{mode:"para"});
  q.figure=u8gridSVG([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"},{x:cx,y:cy,label:"C"}],null,[[ax,ay,bx,by],[bx,by,cx,cy]]);
  return q;
},["Opposite sides of a parallelogram shift by the same change in x and y.","Start by finding the change from B to C, then apply it to A."]);

E("u8-transform-describe",8,["10.11"],1,"gen",function(){
  var type=pick(["translate","reflectX","reflectY"]);
  var px=pick([-4,-3,-2,-1,1,2,3,4]);var py=pick([-4,-3,-2,-1,1,2,3,4]);
  var qx=px+pick([-3,-2,2,3]);var qy=py+pick([-3,-2,2,3]);if(qx>5||qx<-5)qx=px-2;if(qy>5||qy<-5)qy=py-2;
  var P=[px,py],Q=[qx,qy],P2,Q2,correct;
  function transText(dx,dy){return "Translation: "+u8moveText(dx,dy);}
  var opts=[];
  if(type==="translate"){var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);if(Math.abs(dx)===Math.abs(dy))dy=dy>0?dy+1:dy-1;
    P2=[px+dx,py+dy];Q2=[qx+dx,qy+dy];correct=transText(dx,dy);
    opts=[{t:transText(dy,dx),fb:"That swaps the horizontal and vertical changes; check the change in x first."},{t:"Reflection across the x-axis",fb:"A reflection would flip the sign of the y-coordinates; here both points shift by the same amounts instead."},{t:"Reflection across the y-axis",fb:"A reflection would flip the sign of the x-coordinates; here both points shift by the same amounts instead."}];
  } else if(type==="reflectX"){P2=[px,-py];Q2=[qx,-qy];correct="Reflection across the x-axis";
    opts=[{t:"Reflection across the y-axis",fb:"That would flip the x signs; here the y signs flipped and the x values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(1,P2[1]-py),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  } else {P2=[-px,py];Q2=[-qx,qy];correct="Reflection across the y-axis";
    opts=[{t:"Reflection across the x-axis",fb:"That would flip the y signs; here the x signs flipped and the y values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(P2[0]-px,1),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  }
  var seen={};seen[correct]=1;var ds=[];
  opts.forEach(function(o){if(!seen[o.t]){seen[o.t]=1;ds.push(o);}});
  var filler=type==="translate"?"Reflection across the origin":"Translation: "+u8moveText(1,1);
  while(ds.length<3){if(!seen[filler]){seen[filler]=1;ds.push({t:filler,fb:"Test the description on both vertices; it must carry each one to its image."});}else filler="Translation: "+u8moveText(2,1);}
  var q=mcq("A two-vertex design has vertices P "+u8pair(P[0],P[1])+" and Q "+u8pair(Q[0],Q[1])+". After a transformation, the images are P' "+u8pair(P2[0],P2[1])+" and Q' "+u8pair(Q2[0],Q2[1])+". Which transformation describes the change?",
    {t:correct,fb:"Yes: applying it to both P and Q gives exactly the image vertices."},ds,
    "Test each vertex. P "+u8pair(P[0],P[1])+" goes to "+u8pair(P2[0],P2[1])+" and Q "+u8pair(Q[0],Q[1])+" goes to "+u8pair(Q2[0],Q2[1])+", which matches: <b>"+correct+"</b>.",{mode:type}); q.figure=figWideGrid([{x:P[0],y:P[1],label:"P"},{x:Q[0],y:Q[1],label:"Q"},{x:P2[0],y:P2[1],label:"P'"},{x:Q2[0],y:Q2[1],label:"Q'"}],[[P,Q],[P2,Q2]],null); return q;
},["Test a description on every vertex, not just one: a transformation must fit them all.","Start by comparing the first vertex with its image, then confirm with the second."]);

E("u8-successive-cr",8,["10.10","10.20","10.11"],1,"gen",function(){
  var x=ri(-4,3),y=ri(-4,3);
  var dx1=pick([-3,-2,-1,1,2,3]);var dy1=pick([-3,-2,-1,1,2,3]);
  var dx2=pick([-2,-1,1,2]);var dy2=pick([-2,-1,1,2]);
  var fx=x+dx1+dx2,fy=y+dy1+dy2;var askX=Math.random()<0.5;var ans=askX?fx:fy;
  var q=numq("A point starts at "+u8pair(x,y)+". It moves "+u8moveText(dx1,dy1)+", and then it moves "+u8moveText(dx2,dy2)+". What is the "+(askX?"x":"y")+"-coordinate of the final position?",
    ans,0,
    "Track the coordinates step by step. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after move 1} &= "+u8pair(x+dx1,y+dy1)+" \\\\ \\text{after move 2} &= "+u8pair(fx,fy)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"sx":"sy"}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
},["Apply the moves one at a time, updating both coordinates after each move.","Start by writing the new point after the first move."]);

function u8scaleSVG(s,a,b){
  var W=300,H=300,c=150,st=36;
  function X(k){return c+k*st;}function Y(k){return c-k*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane with scaled axes">';
  for(var g=-3;g<=3;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="24" x2="'+X(g)+'" y2="276" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="24" y1="'+Y(g)+'" x2="276" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="24" y1="150" x2="276" y2="150" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="150" y1="24" x2="150" y2="276" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  for(var t=-3;t<=3;t++){if(t===0)continue;out+=_txt(X(t),166,String(t*s),11,false);out+=_txt(134,Y(t),String(t*s),11,false);}
  out+=_txt(268,134,"x",13,true)+_txt(164,36,"y",13,true);
  out+='<circle cx="'+X(a)+'" cy="'+Y(b)+'" r="3.6" fill="'+FIG_INK+'"/>';
  out+=_txt(X(a)+12,Y(b)-11,"P",13,true);
  return out+'</svg>';
}

E("u8-quadrant-locate",8,["10.7","10.18"],1,"gen",function(){
  var mode=pick(["which-quad","which-point","design"]);
  var quads=["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"];
  if(mode==="which-quad"){
    var sx=pick([-1,1]),sy=pick([-1,1]);var x=sx*ri(1,6),y=sy*ri(1,6);
    var correct=sx>0?(sy>0?quads[0]:quads[3]):(sy>0?quads[1]:quads[2]);
    var ds=quads.filter(function(q){return q!==correct;}).map(function(q){return {t:q,fb:"Check the signs: x is "+(sx>0?"positive":"negative")+" and y is "+(sy>0?"positive":"negative")+" for this point."};});
    var q=mcq("In which quadrant does the point "+u8pair(x,y)+" lie?",
      {t:correct,fb:"Yes: "+(sx>0?"positive":"negative")+" x and "+(sy>0?"positive":"negative")+" y place the point in "+correct+"."},ds,
      "The x-coordinate is "+(sx>0?"positive":"negative")+" and the y-coordinate is "+(sy>0?"positive":"negative")+". That sign pattern belongs to <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
  }
  var targetQuad=ri(0,3);var signs=[[1,1],[-1,1],[-1,-1],[1,-1]];
  var pts=[];for(var i=0;i<4;i++){pts.push([signs[i][0]*ri(1,6),signs[i][1]*ri(1,6)]);}
  var correctP=u8pair(pts[targetQuad][0],pts[targetQuad][1]);
  var ds2=pts.filter(function(p,i){return i!==targetQuad;}).map(function(p){return {t:u8pair(p[0],p[1]),fb:"That point has the sign pattern of a different quadrant. "+quads[targetQuad]+" needs x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+"."};});
  if(mode==="design"){
    var q=mcq("A design point must lie in "+quads[targetQuad]+". Which point fits the design?",
      {t:correctP,fb:"Yes: its signs match "+quads[targetQuad]+"."},ds2,
      quads[targetQuad]+" holds points with x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+". Only "+correctP+" fits. The answer is <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
  }
  var q=mcq("Which point lies in "+quads[targetQuad]+"?",
    {t:correctP,fb:"Yes: its signs match "+quads[targetQuad]+"."},ds2,
    quads[targetQuad]+" holds points with x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+". The point is <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
},["Quadrants are set by signs: I (+, +), II (-, +), III (-, -), IV (+, -).","Start by checking the sign of each coordinate."]);

E("u8-grid-scale",8,["10.6","10.9"],1,"gen",function(){
  var s=pick([2,5,10]);var a=pick([-3,-2,-1,1,2,3]);var b=pick([-3,-2,-1,1,2,3]);var guard=0;
  while(Math.abs(a)===Math.abs(b)&&guard<15){b=pick([-3,-2,-1,1,2,3]);guard++;}
  var X=a*s,Y=b*s;var ask=pick(["pair","pair","xonly","yonly"]);
  if(ask==="xonly"||ask==="yonly"){
    var val=ask==="xonly"?X:Y;
    var ds=u8numOpts(val,[ask==="xonly"?a:b,val+s,Math.max(val-s,-900),-val]).map(function(v){return {t:String(v),fb:"Each gridline step on this plane counts as "+s+" units, so multiply the step count by "+s+"."};});
    var qq=mcq("On this Cartesian plane, each gridline step counts as "+s+" units. What is the "+(ask==="xonly"?"x":"y")+"-coordinate of point P?",
      {t:String(val),fb:"Yes: P is "+(ask==="xonly"?a:b)+" steps from the axis, and each step is "+s+" units."},ds,
      "Point P is "+Math.abs(ask==="xonly"?a:b)+" gridline steps in the "+(ask==="xonly"?(a>0?"positive":"negative"):(b>0?"positive":"negative"))+" direction, at "+s+" units per step: \\("+(ask==="xonly"?a:b)+" \\times "+s+" = "+val+"\\). The coordinate is <b>"+val+"</b>.",{mode:ask});
    qq.figure=u8scaleSVG(s,a,b);return qq;
  }
  var correct=u8pair(X,Y);
  var raw=[u8pair(a,b),u8pair(Y,X),u8pair(-X,Y),u8pair(X,-Y)];
  var seen={};seen[correct]=1;var ds2=[];
  raw.forEach(function(t){if(!seen[t]&&ds2.length<3){seen[t]=1;ds2.push({t:t,fb:"Count gridline steps from the origin, then multiply by "+s+", the value of each step."});}});
  var off=1;while(ds2.length<3){var t=u8pair(X+off*s,Y);if(!seen[t]){seen[t]=1;ds2.push({t:t,fb:"Count gridline steps from the origin, then multiply by "+s+"."});}off++;}
  var q=mcq("On this Cartesian plane, each gridline step counts as "+s+" units. What are the coordinates of point P?",
    {t:correct,fb:"Yes: P is "+a+" steps across and "+b+" steps up, at "+s+" units per step."},ds2,
    "Across: \\("+a+" \\times "+s+" = "+X+"\\). Up: \\("+b+" \\times "+s+" = "+Y+"\\). The coordinates are <b>"+correct+"</b>.",{mode:"pair"});
  q.figure=u8scaleSVG(s,a,b);
  return q;
},["When axes use a scale, multiply the gridline steps by the value of each step.","Start by counting steps from the origin, then apply the scale."]);

E("u8-bisector-cr",8,["10.15","10.16"],3,"gen",function(){
  var mode=pick(["perimeter","supp","path"]);
  if(mode==="supp"){var T=ri(15,80)*2;var half=T/2;var ans=180-half;
    var q=numq("An angle of "+T+" degrees is bisected. One of the two equal angles sits on a straight line with an angle marked x. Find x, in degrees.",
      ans,0,
      "The bisector halves the angle: \\("+T+" \\div 2 = "+half+"^\\circ\\). Angles on a straight line total 180 degrees. \\[ \\begin{aligned} x &= 180 - "+half+" \\\\ &= "+ans+" \\end{aligned} \\] The angle x is <b>"+ans+" degrees</b>.",{mode:mode}); q.figure=figBisectSupp(half+"°"); return q;
  }
  var L=ri(4,12)*2;var d=ri(3,14);
  if(mode==="perimeter"){
    var q=numq("Segment AB is "+L+" cm long. Point P lies on the perpendicular bisector of AB, and the distance from P to A is "+d+" cm. What is the perimeter of triangle PAB, in centimetres?",
      2*d+L,0,
      "Every point on the perpendicular bisector is the same distance from A and B, so PB is also "+d+" cm. \\[ \\begin{aligned} \\text{perimeter} &= "+d+" + "+d+" + "+L+" \\\\ &= "+(2*d+L)+" \\end{aligned} \\] The perimeter is <b>"+(2*d+L)+" cm</b>.",{mode:mode}); q.figure=figEqui(L+" cm",d+" cm"); return q;
  }
  var q=numq("A garden path goes from A to a point P on the perpendicular bisector of the front edge AB, and then to B. The distance from P to A is "+d+" m. How long is the full path from A to P to B, in metres?",
    2*d,0,
    "P lies on the perpendicular bisector, so P is the same distance from B as from A: PB is "+d+" m. \\[ \\begin{aligned} \\text{path} &= "+d+" + "+d+" \\\\ &= "+(2*d)+" \\end{aligned} \\] The path is <b>"+(2*d)+" m</b>.",{mode:mode}); q.figure=figEqui(null,d+" m"); return q;
},["Points on a perpendicular bisector are equidistant from the segment endpoints; a bisector halves an angle.","Start by writing down what the bisector guarantees before you calculate."]);

E("u8-transform-cr",8,["10.20","10.12"],3,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var order=pick(["reflectFirst","translateFirst"]);var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var step1,step2;
  if(order==="reflectFirst"){step1=overX?[x,-y]:[-x,y];step2=[step1[0]+dx,step1[1]+dy];}
  else {step1=[x+dx,y+dy];step2=overX?[step1[0],-step1[1]]:[-step1[0],step1[1]];}
  var askX=Math.random()<0.5;var ans=askX?step2[0]:step2[1];
  var promptText=order==="reflectFirst"?
    "Point P "+u8pair(x,y)+" is reflected across the "+axis+", and the image is then translated "+u8moveText(dx,dy)+".":
    "Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+", and the image is then reflected across the "+axis+".";
  var q=numq(promptText+" What is the "+(askX?"x":"y")+"-coordinate of the final image?",
    ans,0,
    "Apply the transformations in order. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after step 1} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{final image} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:order}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["Do the transformations one at a time, in the order given, updating the point after each step.","Start by applying the first transformation to the original point."]);

E("u8-transform-image",8,["10.11","10.12"],3,"gen",function(){
  var base=[[ri(-5,-3),ri(-3,0)],[ri(0,2),ri(-3,0)],[ri(-2,0),ri(2,4)]];
  var labels=["A","B","C"];var type=pick(["translate","reflectX","reflectY"]);
  var dx=pick([-3,-2,2,3]);var dy=pick([-3,-2,2,3]);
  function img(p){if(type==="translate")return [p[0]+dx,p[1]+dy];if(type==="reflectX")return [p[0],-p[1]];return [-p[0],p[1]];}
  var askIdx=ri(0,2);var target=base[askIdx];var im=img(target);
  var transDesc=type==="translate"?("translated "+u8moveText(dx,dy)):("reflected across the "+(type==="reflectX"?"x-axis":"y-axis"));
  var correct=u8pair(im[0],im[1]);
  var candSet=[u8pair(target[0],target[1])];
  if(type==="translate"){candSet.push(u8pair(target[0]+dy,target[1]+dx));candSet.push(u8pair(target[0]-dx,target[1]-dy));}
  else if(type==="reflectX"){candSet.push(u8pair(-target[0],target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  else {candSet.push(u8pair(target[0],-target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  candSet.push(u8pair(im[0]+1,im[1]));candSet.push(u8pair(im[0],im[1]+1));
  var seen={};seen[correct]=1;var ds=[];
  candSet.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Apply the stated transformation to vertex "+labels[askIdx]+" itself: translations add to both coordinates, reflections flip one sign."});}});
  var off=2;while(ds.length<3){var t=u8pair(im[0]+off,im[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Apply the stated transformation to vertex "+labels[askIdx]+" itself."});}off++;}
  var q=mcq("Triangle ABC is "+transDesc+". What are the coordinates of the image of vertex "+labels[askIdx]+"?",
    {t:correct,fb:"Yes: applying the transformation to "+labels[askIdx]+" "+u8pair(target[0],target[1])+" gives "+correct+"."},ds,
    "Vertex "+labels[askIdx]+" is "+u8pair(target[0],target[1])+". Applying the transformation gives <b>"+correct+"</b>.",{mode:type});
  q.figure=u8gridSVG(base.map(function(p,i){return {x:p[0],y:p[1],label:labels[i]};}),[base],null);
  return q;
},["Apply the transformation to the named vertex exactly as stated.","Start by writing the coordinates of the named vertex from the diagram."]);

E("u8-design-shape",8,["10.17","10.18"],3,"var",varset([
  function(){var q=mcq("A design uses the points (1, 1), (5, 1) and (5, 4) as three corners of a rectangle, in order. Which point completes the rectangle?",
    {t:"(1, 4)",fb:"Yes: it shares its x with the first point and its y with the third, closing the rectangle."},
    [{t:"(5, 5)",fb:"That point extends the right side past the top; the fourth corner must align with (1, 1) vertically."},{t:"(1, 0)",fb:"That point sits below the first corner; the fourth corner must match the top height of 4."},{t:"(4, 4)",fb:"The fourth corner must share the first point's x-coordinate of 1 to close the left side."}],
    "The fourth corner pairs the first point's x with the third point's y: (1, 4). The answer is <b>(1, 4)</b>.",{mode:"rect"}); q.figure=figWideGrid([{x:1,y:1},{x:5,y:1},{x:5,y:4}],null,[[1,1,5,1],[5,1,5,4]]); return q;},
  function(){var q=mcq("A symmetric design has a point at (3, 2). The design is symmetric about the y-axis. Which point must also be in the design?",
    {t:"(-3, 2)",fb:"Yes: symmetry about the y-axis flips the x sign and keeps the y value."},
    [{t:"(3, -2)",fb:"That flips the y sign, which is symmetry about the x-axis instead."},{t:"(-3, -2)",fb:"That flips both signs, which is a half-turn about the origin."},{t:"(2, 3)",fb:"That swaps the coordinates, which is symmetry about a diagonal line, not the y-axis."}],
    "Mirror points across the y-axis have opposite x-coordinates and equal y-coordinates. The answer is <b>(-3, 2)</b>.",{mode:"mirror"}); q.figure=figWideGrid([{x:3,y:2}],null,null); return q;},
  function(){var q=mcq("Plotting the points (0, 0), (4, 0), (4, 3) and (0, 3) in order and joining them makes which shape?",
    {t:"Rectangle",fb:"Yes: the sides run horizontally and vertically with lengths 4 and 3, meeting at right angles."},
    [{t:"Triangle",fb:"Four points joined in order make a four-sided shape, not a triangle."},{t:"Pentagon",fb:"Four points make four sides, not five."},{t:"Square",fb:"The sides are 4 and 3 units, which are unequal, so the shape is a rectangle rather than a square."}],
    "Four vertices with horizontal and vertical sides of 4 and 3 form a rectangle. The answer is <b>Rectangle</b>.",{mode:"shape"}); q.figure=figWideGrid([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}],[[[0,0],[4,0],[4,3],[0,3]]],null); return q;},
  function(){return mcq("A triangular design sits entirely in Quadrant II. Which list of vertices could make it?",
    {t:"(-1, 2), (-4, 1), (-2, 5)",fb:"Yes: every point has negative x and positive y, which is Quadrant II."},
    [{t:"(1, 2), (4, 1), (2, 5)",fb:"Those points have positive x and positive y: Quadrant I."},{t:"(-1, -2), (-4, -1), (-2, -5)",fb:"Those points have negative x and negative y: Quadrant III."},{t:"(-1, 2), (3, 4), (-2, 5)",fb:"One point has positive x, so the triangle would cross into Quadrant I."}],
    "Quadrant II needs negative x and positive y for every vertex. The answer is <b>(-1, 2), (-4, 1), (-2, 5)</b>.",{mode:"quad2design"});},
  function(){var q=mcq("Three corners of a square design are (2, 1), (5, 1) and (5, 4). Which point is the fourth corner?",
    {t:"(2, 4)",fb:"Yes: the sides are 3 units, and (2, 4) closes the square above (2, 1)."},
    [{t:"(2, 5)",fb:"That would make the left side 4 units while the bottom side is 3, breaking the square."},{t:"(4, 4)",fb:"The fourth corner must align vertically with (2, 1), so its x-coordinate is 2."},{t:"(5, 3)",fb:"That point lies on the right side area rather than closing the top-left corner."}],
    "The bottom side runs 3 units from (2, 1) to (5, 1), so the fourth corner sits 3 units above (2, 1). The answer is <b>(2, 4)</b>.",{mode:"square"}); q.figure=figWideGrid([{x:2,y:1},{x:5,y:1},{x:5,y:4}],null,[[2,1,5,1],[5,1,5,4]]); return q;}
]),["Use the coordinate patterns of the shape: shared x or y values for rectangles, equal side steps for squares.","Start by sketching the given points and looking for the missing corner pattern."]);

E("u8-construct-verify",8,["10.13","10.14","10.15"],3,"var",varset([
  function(){var q=mcq("A student constructs the perpendicular bisector of a segment with compass arcs. Which check verifies the construction?",
    {t:"Measure from the crossing point to each endpoint; the distances are equal, and the crossing angle is 90 degrees",fb:"Yes: equal halves plus a right angle are the two defining properties."},
    [{t:"Measure the whole segment; it matches the compass setting used for the two arcs when the bisector was constructed",fb:"The compass setting is a construction tool, not a property of the bisector."},{t:"Check that the bisector is longer than the segment on both sides of the segment it crosses in the diagram",fb:"Length of the bisector line is not part of its definition."},{t:"Check that the bisector passes through one endpoint and then through the midpoint of the segment as well",fb:"A bisector passes through the midpoint, not through an endpoint."}],
    "A perpendicular bisector must halve the segment and cross at 90 degrees, and measuring confirms both. The answer is <b>Measure from the crossing point to each endpoint; the distances are equal, and the crossing angle is 90 degrees</b>.",{mode:"verifybis"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("In the compass method for a perpendicular bisector, arcs are drawn from both endpoints using the same compass setting. Why must the setting stay the same?",
    {t:"Equal radii make the arc crossings sit the same distance from both endpoints, which places them on the perpendicular bisector",fb:"Yes: points equidistant from both endpoints lie on the perpendicular bisector."},
    [{t:"A wider setting would erase the segment if the arcs were drawn with the compass point placed at the midpoint of the segment being bisected",fb:"The setting affects the arcs' size, not the segment itself; equality of radii is the point."},{t:"The compass cannot be adjusted once opened, so the setting chosen at the start must be used for every arc in the construction",fb:"A compass can be adjusted; the method requires keeping it fixed for both endpoints."},{t:"Equal radii make the arcs the same colour, so the crossings can be told apart from the segment in the finished drawing",fb:"Colour plays no role in the geometry of the construction."}],
    "Equal radii guarantee the crossings are equidistant from the endpoints, which defines the bisector. The answer is <b>Equal radii make the arc crossings sit the same distance from both endpoints</b>.",{mode:"arcs"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("A second method for the perpendicular bisector is folding paper so the two endpoints of a segment meet. Why does the crease work as the bisector?",
    {t:"The fold maps the segment onto itself with endpoints swapped, so the crease crosses at the midpoint at 90 degrees",fb:"Yes: matching endpoints forces the crease through the midpoint, and a fold crease is perpendicular to the segment."},
    [{t:"The crease is always the longest line on the paper, running from one corner of the sheet to the opposite corner of the sheet",fb:"Crease length is irrelevant; the endpoint matching is what creates the bisector."},{t:"Folding doubles the segment length, because the two halves of the paper lie on top of each other along the crease line",fb:"Folding does not change the segment; it maps it onto itself."},{t:"The crease passes through both endpoints of the segment and joins them where the paper is folded over",fb:"The crease crosses the segment at its midpoint; it does not pass through the endpoints."}],
    "Matching the endpoints makes the crease the perpendicular bisector. The answer is <b>The fold maps the segment onto itself with endpoints swapped</b>.",{mode:"fold"}); q.figure=figBisect("construct"); return q;},
  function(){return mcq("A student draws a line parallel to a base line by copying an angle with a compass. Why does copying the angle work?",
    {t:"Equal corresponding angles formed with a transversal guarantee the lines are parallel",fb:"Yes: when a transversal makes equal corresponding angles, the lines are parallel."},
    [{t:"The copied angle makes the new line the same length as the base line drawn on the page",fb:"Angle copying controls direction, not length."},{t:"The compass draws both lines at the same time, in a single step of the construction",fb:"The lines are drawn separately; the equal angles link their directions."},{t:"Any copied angle produces a perpendicular line through the point on the base line",fb:"Copying an angle reproduces direction for parallel lines; perpendicular needs a 90 degree angle specifically."}],
    "Equal corresponding angles are the test for parallel lines, so copying the angle works. The answer is <b>Equal corresponding angles formed with a transversal guarantee the lines are parallel</b>.",{mode:"copyangle"});},
  function(){return mcq("After drawing a line claimed to be perpendicular to a given line, a student checks it with a set square and finds a small gap at the corner. What should the student conclude?",
    {t:"The line is not exactly perpendicular, because a true right angle fits the set square corner with no gap",fb:"Yes: the set square's corner is a true 90 degrees, so a gap means the drawn angle differs from 90."},
    [{t:"The line is perpendicular, because small gaps do not matter in constructions when the line is drawn by hand with a ruler",fb:"Verification exists to catch exactly this kind of error; the claim fails the check."},{t:"The set square is at fault, because drawn lines are always exact for this kind of check",fb:"The set square corner is manufactured as a right angle; the drawn line is the part under test."},{t:"The line is parallel instead of perpendicular, because it runs in the same direction",fb:"A near-right angle is neither perpendicular nor evidence of parallel."}],
    "The gap shows the angle is not exactly 90 degrees, so the line fails verification as perpendicular. The answer is <b>The line is not exactly perpendicular</b>.",{mode:"gap"});}
]),["Verification measures the defining property: equal halves and 90 degrees, equal angles, or equal distances.","Start by stating the property the construction must satisfy, then choose the check that measures it."]);

/* ----- bank-fix.js ----- */
// Figure additions: the Unit 4 and Unit 8 gap entries assign q.figure from their own drawn values.
// Math 7 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 4166 to 4469).
// CRMARKS: u1-gap-solve-count-cr=2
// CRMARKS: u1-gap-divisible-count-cr=2
// CRMARKS: u1-gap-two-terms-cr=3
// CRMARKS: u1-gap-budget-compare-cr=3
// CRMARKS: u2-gap-chain-target-cr=2
// CRMARKS: u2-gap-missing-start-cr=2
// CRMARKS: u2-gap-mean-target-cr=3
// CRMARKS: u2-gap-order-ops-cr=3
// CRMARKS: u2-gap-round-trip-cr=3
// CRMARKS: u3-gap-discount-total-cr=2
// CRMARKS: u3-gap-tickets-left-cr=2
// CRMARKS: u3-gap-decimal-fraction-cr=3
// CRMARKS: u3-gap-compare-difference-cr=3
// CRMARKS: u4-gap-area-diameter-cr=2
// CRMARKS: u4-gap-rect-minus-circle-cr=2
// CRMARKS: u4-gap-revolutions-cr=3
// CRMARKS: u5-gap-recipe-total-cr=2
// CRMARKS: u5-gap-sub-mixed-dec-cr=2
// CRMARKS: u5-gap-grams-cr=3
// CRMARKS: u5-gap-frac-of-frac-cr=3
// CRMARKS: u6-gap-two-step-cr=2
// CRMARKS: u6-gap-both-sides-cr=2
// CRMARKS: u6-gap-divide-form-cr=3
// CRMARKS: u6-gap-check-diff-cr=3
// CRMARKS: u7-gap-missing-mean-cr=2
// CRMARKS: u7-gap-median-range-cr2=2
// CRMARKS: u7-gap-joint-pct-cr=3
// CRMARKS: u7-gap-expected-pct-cr=3
// CRMARKS: u8-gap-angle-chain-cr=2
// CRMARKS: u8-gap-pythagoras-cr=2
// CRMARKS: u8-gap-rotate-cr=3
// CRMARKS: u8-gap-grid-area-cr=3
// CRMARKS: u8-gap-parallel-angle-cr=3
/* ===== Pool-gap fill, November 9, 2026 ===== */
/* New Level 2 entries added to close the unit-test CR remainder gaps.
   Every CR entry below always returns numq(...). */

/* --- Unit 1 pool-gap fill --- */
E("u1-gap-solve-count-cr", 1, ["8.12","7.2"], 2, "gen", function(){
  var C=pick([
    {txt:"A print shop charges a setup fee plus a charge per metre of banner. The total cost is given by the relation ", v:"m", thing:"number of metres", unit:"dollars"},
    {txt:"A trophy shop charges an engraving setup fee plus a charge per trophy. The total cost is given by the relation ", v:"t", thing:"number of trophies", unit:"dollars"}]);
  var a=ri(3,9), b=ri(4,24), k=ri(6,18), Tot=a*k+b;
  return numq(C.txt+"\\(C = "+u1Expr(a,b,C.v)+"\\) "+C.unit+". A customer pays exactly $"+Tot+". What is the "+C.thing+"? Show your solving steps.", k, 0,
    "Set the relation equal to the total and solve. \\[ \\begin{aligned} "+u1Expr(a,b,C.v)+" &= "+Tot+" \\\\ "+a+C.v+" &= "+Tot+" - "+b+" \\\\ "+a+C.v+" &= "+(Tot-b)+" \\\\ "+C.v+" &= "+k+" \\end{aligned} \\] The answer is <b>"+k+"</b>.",
    {a:a,b:b,k:k});
}, ["Set the relation equal to the given total to form an equation, then undo the operations in reverse order.", "Start by subtracting the constant term from both sides."]);

E("u1-gap-divisible-count-cr", 1, ["5.4"], 2, "gen", function(){
  var d=pick([3,4,6,8,9]); var L=ri(15,70); var R=L+ri(50,110);
  var upToR=Math.floor(R/d), belowL=Math.floor((L-1)/d), ans=upToR-belowL;
  return numq("How many integers from "+L+" to "+R+", inclusive, are divisible by "+d+"? Show your counting method.", ans, 0,
    "Count the multiples of "+d+" up to "+R+", then subtract the multiples below "+L+". \\[ \\begin{aligned} \\text{multiples up to "+R+"} &= "+upToR+" \\\\ \\text{multiples below "+L+"} &= "+belowL+" \\\\ \\text{count} &= "+upToR+" - "+belowL+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {d:d,L:L,R:R});
}, ["Count multiples over the whole range from 1, then remove the part of the range you do not want.", "Start by finding how many multiples of the divisor there are up to the larger end of the interval."]);

E("u1-gap-two-terms-cr", 1, ["7.11","7.7"], 2, "gen", function(){
  var a0=ri(2,10), d=ri(2,9), p=ri(8,14), q=p+ri(6,12);
  var tp=a0+(p-1)*d, tq=a0+(q-1)*d, ans=tp+tq;
  var terms=[a0,a0+d,a0+2*d];
  return numq("A number pattern begins \\("+terms.join(", ")+", \\ldots\\) Find the term in position "+p+" and the term in position "+q+", and give the sum of those two terms. Show your work.", ans, 0,
    "The step is \\("+d+"\\), so the term in position \\(n\\) is \\("+u1Expr(d,a0-d)+"\\) . \\[ \\begin{aligned} \\text{term}_{"+p+"} &= "+a0+" + ("+p+" - 1) \\times "+d+" = "+tp+" \\\\ \\text{term}_{"+q+"} &= "+a0+" + ("+q+" - 1) \\times "+d+" = "+tq+" \\\\ \\text{sum} &= "+tp+" + "+tq+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a0:a0,d:d,p:p,q:q});
}, ["Build a relation for the term in position n, use it twice, then combine the two results.", "Start by finding the step size from the first three terms."]);

E("u1-gap-budget-compare-cr", 1, ["7.3","7.5"], 2, "gen", function(){
  var fee=ri(10,40), rate=ri(4,12), n=ri(3,10), cost=fee+rate*n, under=ri(3,18), budget=cost+under;
  return numq("A bike rental costs a flat fee of $"+fee+" plus $"+rate+" per day. The total cost is given by the relation \\(C = "+u1Expr(rate,fee,"d")+"\\) dollars, where \\(d\\) is the number of days. A rider rents a bike for "+n+" days and has a budget of $"+budget+". How many dollars under budget is the rental? Show your work.", under, 0,
    "Evaluate the relation first, then compare with the budget. \\[ \\begin{aligned} C &= "+rate+" \\times "+n+" + "+fee+" = "+cost+" \\\\ \\text{amount under budget} &= "+budget+" - "+cost+" = "+under+" \\end{aligned} \\] The answer is <b>$"+under+"</b>.",
    {fee:fee,rate:rate,n:n});
}, ["Evaluate the relation for the given number of days first; the comparison with the budget is the second step.", "Start by substituting the number of days into the relation."]);

/* --- Unit 2 pool-gap fill --- */
E("u2-gap-chain-target-cr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(-6,10), b=ri(3,12), c=ri(2,10), e=ri(2,9);
  var fin=a-b+c-e; var T=pick([-5,0,5]); var g=0;
  while(fin===T&&g++<20){ e+=2; fin=a-b+c-e; }
  var ans=Math.abs(fin-T);
  return numq("The temperature starts at "+a+" degrees. It drops "+b+" degrees, then rises "+c+" degrees, then drops "+e+" degrees. How many degrees is the final temperature from "+T+" degrees? Show your work.", ans, 0,
    "Work through the changes in order, then find the distance from the target. \\[ \\begin{aligned} \\text{final} &= "+a+" - "+b+" + "+c+" - "+e+" = "+fin+" \\\\ \\text{distance from "+T+"} &= |"+fin+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c,e:e});
}, ["Find the final value first; the distance from the target is a second, separate step.", "Start by applying the first change to the starting temperature."]);

E("u2-gap-missing-start-cr", 2, ["6.29","6.25"], 2, "gen", function(){
  var a=ri(3,14), b=ri(3,14), e=ri(-8,12), start=e-a+b;
  return numq("A game score changes twice: first it increases by "+a+" points, then it decreases by "+b+" points. The final score is "+e+" points. What was the starting score? Show your work.", start, 0,
    "Undo the two changes in reverse order, starting from the final score. \\[ \\begin{aligned} \\text{start} &= "+e+" + "+b+" - "+a+" \\\\ &= "+start+" \\end{aligned} \\] Check: \\("+start+" + "+a+" - "+b+" = "+e+"\\). The answer is <b>"+start+"</b>.",
    {a:a,b:b,e:e});
}, ["Work backwards from the final score, undoing each change with its opposite operation.", "Start by undoing the last change: add back the points that were taken away."]);

E("u2-gap-mean-target-cr", 2, ["6.29"], 2, "gen", function(){
  var v1=0,v2=0,v3=0,v4=0,m=0,g=0;
  while(g++<200){ v1=ri(-12,12); v2=ri(-12,12); v3=ri(-12,12); m=ri(-4,6); v4=4*m-(v1+v2+v3); if(v4>=-15&&v4<=15) break; }
  var dist=ri(2,7), T=m+pick([-1,1])*dist, ans=dist;
  var vals=[v1,v2,v3,v4];
  return numq("Four daily low temperatures are "+vals.join(", ")+" degrees. Find the mean of the four temperatures, then give how many degrees that mean is from "+T+" degrees. Show your work.", ans, 0,
    "Add the four values and divide by 4, then compare the mean with the target. \\[ \\begin{aligned} \\text{mean} &= \\frac{"+v1+" + "+u2Sg(v2)+" + "+u2Sg(v3)+" + "+u2Sg(v4)+"}{4} = \\frac{"+(4*m)+"}{4} = "+m+" \\\\ \\text{distance} &= |"+m+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {vals:vals,m:m});
}, ["The mean is only the first step; the question also asks for the distance from a target value.", "Start by adding the four temperatures, watching the signs."]);

E("u2-gap-order-ops-cr", 2, ["6.29"], 2, "gen", function(){
  var r=pick([2,3,4,5]), q0=ri(2,9), diff=r*q0, p=ri(5,20), qq=p-diff, s=ri(2,12);
  var ans=-q0+s;
  return numq("Evaluate \\(("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+"\\). Show the order of operations you follow.", ans, 0,
    "Do the brackets first, then the division, then the addition. \\[ \\begin{aligned} ("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+" &= "+diff+" \\div ("+(-r)+") + "+s+" \\\\ &= "+(-q0)+" + "+s+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p:p,qq:qq,r:r,s:s});
}, ["Follow the order of operations: brackets, then division, then addition, and watch the sign when dividing by a negative.", "Start by evaluating the brackets."]);

E("u2-gap-round-trip-cr", 2, ["6.26","6.28"], 2, "gen", function(){
  var p1=-ri(2,15), p2=ri(2,18), dist=p2-p1, ans=2*dist;
  return numq("An elevator starts on floor "+p1+" and travels up to floor "+p2+", then returns to floor "+p1+". How many floors does the elevator travel in total? Show your work.", ans, 0,
    "The one-way distance is the difference of the two positions, and the return trip covers the same distance again. \\[ \\begin{aligned} \\text{one way} &= "+p2+" - "+u2Sg(p1)+" = "+dist+" \\\\ \\text{total} &= 2 \\times "+dist+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p1:p1,p2:p2});
}, ["Find the one-way distance between the two signed positions first; the round trip is that distance twice.", "Start by subtracting the lower floor number from the higher one."]);

E("u2-gap-order-ops-sr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(8,17), b=ri(2,a-3), c=ri(2,5), d=ri(2,10);
  var base=a-b, ans=base*(-c)+d;
  var signErr=base*c+d, orderErr=a+b*c+d, arithErr=ans+pick([2,-2,c+1]);
  var cands=[signErr,orderErr,arithErr]; var seen={}; seen[String(ans)]=1; var ds=[];
  var fbs={}; fbs[String(signErr)]="That keeps the size but drops the negative sign on the multiplier."; fbs[String(orderErr)]="That multiplies before doing the brackets; the brackets come first."; fbs[String(arithErr)]="That has the right method but an arithmetic slip in the final steps.";
  cands.forEach(function(z){ if(!seen[String(z)]&&ds.length<3){ seen[String(z)]=1; ds.push({t:String(z), fb:fbs[String(z)]||"Check the brackets and the sign of the product."}); } });
  var g=2; while(ds.length<3){ var z=ans+g; if(!seen[String(z)]){ seen[String(z)]=1; ds.push({t:String(z), fb:"Check the brackets first, then the sign of the product."}); } g++; }
  return mcq("What is \\(("+a+" - "+b+") \\times ("+(-c)+") + "+d+"\\)?",
    {t:String(ans), fb:"Correct: the brackets give "+base+", the product is "+(base*(-c))+", and adding "+d+" gives "+ans+"."},
    ds,
    "Do the brackets first, then multiply, then add. \\[ \\begin{aligned} ("+a+" - "+b+") \\times ("+(-c)+") + "+d+" &= "+base+" \\times ("+(-c)+") + "+d+" \\\\ &= "+(base*(-c))+" + "+d+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c,d:d});
}, ["Do the brackets first, then the multiplication, then the addition.", "Start by evaluating the brackets."]);

/* --- Unit 3 pool-gap fill --- */
E("u3-gap-discount-total-cr", 3, ["6.12","6.11"], 2, "gen", function(){
  var P=20*ri(3,12), p=pick([10,15,20,25,30,35,40,45]);
  var disc=P*p/100, ans=P-disc;
  var item=pick(["jacket","bicycle helmet","backpack"]);
  return numq("A "+item+" is priced at $"+P+". The store offers a discount of "+p+"%. How many dollars does a customer pay for the "+item+"? Show your work.", ans, 0,
    "Find the discount amount first, then subtract it from the price. \\[ \\begin{aligned} \\text{discount} &= "+p+"\\% \\text{ of } "+P+" = "+disc+" \\\\ \\text{amount paid} &= "+P+" - "+disc+" = "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>.",
    {P:P,p:p});
}, ["Find the percent amount first; the amount paid is what remains after it is taken off.", "Start by calculating the discount in dollars."]);

E("u3-gap-tickets-left-cr", 3, ["6.9"], 2, "gen", function(){
  var pr=pick([[1,3],[2,3],[1,4],[3,4],[1,6],[5,6],[1,8],[3,8],[5,8],[7,8],[2,5],[3,5]]);
  var n=pr[0], d=pr[1], T=d*ri(6,14), part=T*n/d, ans=T-part;
  return numq("A school prints "+T+" raffle tickets. In the morning, \\("+FR(n,d)+"\\) of the tickets are sold. How many tickets are left to sell? Show your work.", ans, 0,
    "Find how many tickets were sold first, then take that away from the total. \\[ \\begin{aligned} \\text{sold} &= "+FR(n,d)+" \\text{ of } "+T+" = "+part+" \\\\ \\text{left} &= "+T+" - "+part+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,T:T});
}, ["Find the part that was sold first; what is left is the complement of that part.", "Start by finding the fraction of the total tickets."]);

E("u3-gap-decimal-fraction-cr", 3, ["3.12"], 2, "gen", function(){
  var pr=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8]]);
  var n=pr[0], d=pr[1], dec=n/d, Q=d*ri(6,14), ans=Q*n/d;
  return numq("Write "+fmt(dec,3)+" as a fraction in lowest terms, then find that fraction of "+Q+" kilograms. Give the final amount, in kilograms. Show your work.", ans, 0,
    "As a fraction, \\("+fmt(dec,3)+" = "+FR(n,d)+"\\) in lowest terms. Apply that fraction to the quantity. \\[ \\begin{aligned} "+FR(n,d)+" \\text{ of } "+Q+" &= "+Q+" \\div "+d+" \\times "+n+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,Q:Q});
}, ["Convert the decimal to a fraction first; only then can you apply it to the quantity.", "Start by writing the decimal as a fraction over 10, 100 or 1000 and reducing it."]);

E("u3-gap-compare-difference-cr", 3, ["3.5","3.3"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[7,8],[2,5],[4,5],[9,10],[3,5],[1,4],[7,10],[3,8]]);
  var n=pr[0], d=pr[1], dec1=n/d;
  var off=pick([-0.15,-0.08,-0.06,0.07,0.09,0.12]); var dec2=Math.round((dec1+off)*1000)/1000;
  var ans=Math.round(Math.abs(dec1-dec2)*1000)/1000;
  var larger=off<0?("the fraction"):("the decimal");
  return numq("Compare \\("+FR(n,d)+"\\) and "+fmt(dec2,3)+". How much larger is the larger value than the smaller value? Show your work.", ans, 0.001,
    "Convert the fraction to a decimal first: \\("+FR(n,d)+" = "+fmt(dec1,3)+"\\). The larger value is "+larger+", and the difference is \\(|"+fmt(dec1,3)+" - "+fmt(dec2,3)+"| = "+fmt(ans,3)+"\\). The answer is <b>"+fmt(ans,3)+"</b>.",
    {n:n,d:d});
}, ["Convert both values to the same form before comparing them, then subtract to find the gap.", "Start by dividing the numerator by the denominator to get the fraction as a decimal."]);

/* --- Unit 4 pool-gap fill --- */
E("u4-gap-area-diameter-cr", 4, ["9.11","9.9"], 2, "gen", function(){
  var r=ri(3,14), d=2*r, area=Math.round(3.14*r*r*100)/100; var item=pick(["A circular rug","A round clock","A circular pizza pan","A round garden bed","A circular table"]);
  var q=numq(item+" has a diameter of "+d+" cm. Find its area, in square centimetres. Use 3.14 for pi. Show your work.", area, 0.1,
    "The radius is half the diameter, and the area uses the radius. \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ A &= 3.14 \\times "+r+"^2 = "+fmt(area,2)+" \\end{aligned} \\] The answer is <b>"+fmt(area,2)+"</b>.",
    {r:r,d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
}, ["Halve the diameter to get the radius before using the area formula.", "Start by dividing the diameter by 2."]);

E("u4-gap-rect-minus-circle-cr", 4, ["9.1","9.3"], 2, "gen", function(){
  var L=ri(12,20), W=ri(9,15), r=pick([2,3,4]);
  var rect=L*W, circ=Math.round(3.14*r*r*100)/100, ans=Math.round((rect-circ)*100)/100;
  var q=numq("A rectangular garden is "+L+" m long and "+W+" m wide. A circular pond with radius "+r+" m sits inside the garden. Find the area of the garden that is not covered by the pond, in square metres. Use 3.14 for pi. Show your work.", ans, 0.1,
    "Find the area of the rectangle and the area of the circle, then subtract. \\[ \\begin{aligned} A_{\\text{rectangle}} &= "+L+" \\times "+W+" = "+rect+" \\\\ A_{\\text{circle}} &= 3.14 \\times "+r+"^2 = "+fmt(circ,2)+" \\\\ \\text{remaining} &= "+rect+" - "+fmt(circ,2)+" = "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {L:L,W:W,r:r}); q.figure=figRectCircle(L,W,r,"m"); return q;
}, ["This is a rectangle area minus a circle area, so calculate each area separately first.", "Start with the area of the whole rectangle."]);

E("u4-gap-revolutions-cr", 4, ["9.7","9.10"], 2, "gen", function(){
  var r=pick([20,25,30,35,40,50]), C=Math.round(2*3.14*r*100)/100, k=ri(8,25);
  var ans=Math.round(C*k/100*100)/100;
  var q=numq("A bicycle wheel has a radius of "+r+" cm. The wheel turns "+k+" full revolutions. How many metres does the bicycle travel? Use 3.14 for pi. Show your work.", ans, 0.1,
    "One revolution covers one circumference, so find the circumference first, then multiply and convert. \\[ \\begin{aligned} C &= 2 \\times 3.14 \\times "+r+" = "+fmt(C,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmt(C,2)+" \\times "+k+" = "+fmt(C*k,2)+" \\text{ cm} = "+fmt(ans,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {r:r,k:k}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["One turn of the wheel covers one circumference; find that distance first, then scale it up and convert units.", "Start by using the radius to find the circumference."]);

/* --- Unit 5 pool-gap fill --- */
E("u5-gap-recipe-total-cr", 5, ["6.23","6.17"], 2, "gen", function(){
  var N=ri(5,15), f=pick([2,3]), ing=pick(["flour","sugar","rolled oats"]);
  var ans=(1+f)*N/4;
  return numq("A recipe uses "+u5M(N,4)+" cups of "+ing+" for one batch. A cook makes one batch, and then a second batch that is "+f+" times as large. How many cups of "+ing+" are used in all? Give your answer as a decimal number of cups. Show your work.", ans, 0.01,
    "Find the amount for the large batch first, then add the two batches. \\[ \\begin{aligned} \\text{second batch} &= "+f+" \\times "+u5disp(N,4)+" = "+u5disp(f*N,4)+" \\\\ \\text{total} &= "+u5disp(N,4)+" + "+u5disp(f*N,4)+" = "+u5disp((1+f)*N,4)+" = "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {N:N,f:f});
}, ["Scale the recipe amount for the second batch first; the total combines both batches.", "Start by multiplying the one-batch amount by the scale factor."]);

E("u5-gap-sub-mixed-dec-cr", 5, ["6.21","6.19"], 2, "gen", function(){
  var mode=pick(["q","e"]); var d, w1, n1, w2, n2;
  if(mode==="q"){ d=4; w1=ri(4,7); n1=pick([1,2]); w2=ri(1,3); n2=3; }
  else { d=8; w1=ri(4,7); n1=pick([1,2,3,4]); w2=ri(1,3); n2=pick([5,6,7]); }
  var startN=w1*d+n1, subN=w2*d+n2, ans=(startN-subN)/d;
  return numq("A tank holds "+u5M(startN,d)+" litres of water. A class uses "+u5M(subN,d)+" litres. How many litres are left in the tank? Give your answer as a decimal. Show your work.", ans, 0.001,
    "The fraction part being subtracted is larger, so borrow 1 whole from the whole-number part first. \\[ \\begin{aligned} "+u5disp(startN,d)+" - "+u5disp(subN,d)+" &= "+u5disp(startN-subN,d)+" \\\\ &= "+fmt(ans,3)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,3)+"</b>.",
    {mode:mode,startN:startN,subN:subN,d:d});
}, ["Compare the fraction parts first; here the subtraction needs borrowing from the whole-number part.", "Start by rewriting the first mixed number with one whole borrowed into its fraction part."]);

E("u5-gap-grams-cr", 5, ["6.23"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[3,8],[7,8],[2,5],[4,5],[3,5],[1,2]]);
  var n=pr[0], d=pr[1], M=ri(2,6), grams=M*1000, ans=grams*n/d; var item=pick(["flour","sugar","rice flour","cocoa powder"]);
  return numq("A bag of "+item+" has a mass of "+M+" kilograms. A baker uses \\("+FR(n,d)+"\\) of the bag. How many grams of "+item+" does the baker use? Show your work.", ans, 0,
    "Convert the mass to grams first, then take the fraction of that amount. \\[ \\begin{aligned} "+M+" \\text{ kg} &= "+grams+" \\text{ g} \\\\ "+FR(n,d)+" \\text{ of } "+grams+" &= "+grams+" \\div "+d+" \\times "+n+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,M:M});
}, ["Change the unit first so the final answer comes out in grams, then find the fraction of the converted amount.", "Start by multiplying the kilograms by 1000."]);

E("u5-gap-frac-of-frac-cr", 5, ["6.23","6.22"], 2, "gen", function(){
  var p1=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]), p2=pick([[1,2],[1,4],[2,3],[3,4],[1,5],[2,5]]);
  var base=p1[1]*p2[1], Q=base*ri(4,9), step1=Q*p1[0]/p1[1], ans=step1*p2[0]/p2[1];
  return numq("A school prints "+Q+" pages for a booklet project. Of those pages, \\("+FR(p1[0],p1[1])+"\\) are set aside for booklets. Of the pages set aside, \\("+FR(p2[0],p2[1])+"\\) are printed in colour. How many pages are printed in colour? Show your work.", ans, 0,
    "Take the first fraction of the total, then take the second fraction of that result. \\[ \\begin{aligned} \\text{set aside} &= "+FR(p1[0],p1[1])+" \\text{ of } "+Q+" = "+step1+" \\\\ \\text{colour} &= "+FR(p2[0],p2[1])+" \\text{ of } "+step1+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {Q:Q,step1:step1});
}, ["Work in stages: the second fraction acts on the result of the first fraction, not on the original total.", "Start by finding the first fraction of the total pages."]);

/* --- Unit 6 pool-gap fill --- */
E("u6-gap-two-step-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,9), x=ri(4,15), b=ri(3,20), c=a*x+b;
  return numq("A student buys notebooks at $"+a+" each and pays a delivery fee of $"+b+". The total cost is $"+c+". The cost is modelled by \\("+a+"x + "+b+" = "+c+"\\), where \\(x\\) is the number of notebooks. Solve the equation to find \\(x\\). Show your solving steps.", x, 0,
    "Undo the addition first, then undo the multiplication. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,b:b,x:x});
}, ["Undo the operations in reverse order: undo the addition before the multiplication.", "Start by subtracting the constant from both sides."]);

E("u6-gap-both-sides-cr", 6, ["8.14","8.3"], 2, "gen", function(){
  var a=ri(5,9), c2=ri(2,a-2), x=ri(3,12), b=ri(2,15), d2=b+(a-c2)*x;
  return numq("Solve \\("+a+"x + "+b+" = "+c2+"x + "+d2+"\\). Show your solving steps.", x, 0,
    "Collect the variable terms on one side first, then collect the constants, then divide. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c2+"x + "+d2+" \\\\ "+(a-c2)+"x &= "+(d2-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,c2:c2,x:x});
}, ["Get all the variable terms on one side and all the constants on the other before dividing.", "Start by subtracting the smaller variable term from both sides."]);

E("u6-gap-divide-form-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,8), k=ri(6,15), b=ri(2,Math.min(10,k-2)), c=k-b, x=a*k;
  return numq("Solve \\(\\frac{x}{"+a+"} - "+b+" = "+c+"\\). Show your solving steps.", x, 0,
    "Undo the subtraction first, then undo the division by multiplying. \\[ \\begin{aligned} \\frac{x}{"+a+"} - "+b+" &= "+c+" \\\\ \\frac{x}{"+a+"} &= "+k+" \\\\ x &= "+a+" \\times "+k+" = "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,k:k,b:b});
}, ["Undo the operations in reverse order: undo the subtraction before undoing the division.", "Start by adding the constant to both sides."]);

E("u6-gap-check-diff-cr", 6, ["8.17","8.11"], 2, "gen", function(){
  var a=ri(3,8), b=ri(2,15), xt=ri(4,12), c=a*xt+b;
  var delta=pick([2,3,-2,-3]); if(xt+delta<1) delta=-delta;
  var x0=xt+delta, lhs=a*x0+b, ans=lhs-c;
  return numq("A student claims that \\(x = "+x0+"\\) solves \\("+a+"x + "+b+" = "+c+"\\). Evaluate the left side at \\(x = "+x0+"\\), then give the value of left side minus right side. Show your work.", ans, 0,
    "Substitute the claimed value into the left side, then compare it with the right side. \\[ \\begin{aligned} \\text{left side} &= "+a+" \\times "+x0+" + "+b+" = "+lhs+" \\\\ \\text{left} - \\text{right} &= "+lhs+" - "+c+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,x0:x0});
}, ["Verification means substituting the claimed value and evaluating, then comparing the two sides.", "Start by replacing x with the claimed value in the left side."]);

/* --- Unit 7 pool-gap fill --- */
E("u7-gap-missing-mean-cr", 7, ["11.9"], 2, "gen", function(){
  var M=ri(8,16), known=[], missing=0, g=0;
  while(g++<300){ known=[]; var s=0; for(var i=0;i<5;i++){ var v=ri(4,20); known.push(v); s+=v; } missing=6*M-s; if(missing>=2&&missing<=24) break; }
  return numq("The mean of six quiz scores is "+M+". Five of the scores are "+known.join(", ")+". What is the sixth score? Show your work.", missing, 0,
    "The mean fixes the total of all six scores, so find that total and subtract the known scores. \\[ \\begin{aligned} \\text{total} &= 6 \\times "+M+" = "+(6*M)+" \\\\ \\text{sixth score} &= "+(6*M)+" - "+(6*M-missing)+" = "+missing+" \\end{aligned} \\] The answer is <b>"+missing+"</b>.",
    {M:M,known:known});
}, ["A stated mean tells you the total; work from the total back to the missing value.", "Start by multiplying the mean by the number of scores."]);

E("u7-gap-median-range-cr2", 7, ["11.6","11.7"], 2, "gen", function(){
  var m=ri(8,20);
  var low=[m-ri(4,7), m-ri(2,3), m-ri(1,2)], high=[m+ri(1,2), m+ri(3,4), m+ri(5,8)];
  var sorted=low.concat([m],high), range=sorted[6]-sorted[0], ans=m+range;
  var shown=shuffle(sorted);
  return numq("A data set is "+shown.join(", ")+". Find the median of the set and the range of the set, and give the sum of the median and the range. Show your work.", ans, 0,
    "Order the values first; the median is the middle value and the range is the spread. \\[ \\begin{aligned} \\text{ordered} &= "+sorted.join(", ")+" \\\\ \\text{median} &= "+m+" \\\\ \\text{range} &= "+sorted[6]+" - "+sorted[0]+" = "+range+" \\\\ \\text{sum} &= "+m+" + "+range+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,range:range});
}, ["Order the data first; both the median and the range come from the ordered set, then combine them.", "Start by writing the values in order from smallest to largest."]);

E("u7-gap-joint-pct-cr", 7, ["12.5","12.7"], 2, "gen", function(){
  var N=pick([40,50,80,100]);
  var J=ri(6,16), swimOnly=ri(5,20), S=J+swimOnly, pct=Math.round(100*J/N*100)/100;
  return numq("A survey asks "+N+" students about swimming and hockey. In total, "+S+" students swim. Of the students who swim, "+swimOnly+" do not play hockey. What percent of all "+N+" students both swim and play hockey? Show your work.", pct, 0.1,
    "Find the number who do both first, then write that count as a percent of all students. \\[ \\begin{aligned} \\text{both} &= "+S+" - "+swimOnly+" = "+J+" \\\\ \\text{percent} &= \\frac{"+J+"}{"+N+"} \\times 100 = "+fmt(pct,2)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(pct,2)+"</b>.",
    {N:N,J:J,S:S});
}, ["The count who do both is not stated directly; extract it first, then convert the fraction of all students to a percent.", "Start by subtracting to find how many students both swim and play hockey."]);

E("u7-gap-expected-pct-cr", 7, ["12.6","12.7"], 2, "gen", function(){
  var p=pick([10,15,20,25,30,40,50,60,75,80]), N=pick([120,160,200,240,300,400]);
  var ans=N*p/100;
  return numq("A spinner lands on red "+p+"% of the time in the long run. The spinner is spun "+N+" times. How many red results should be expected? Show your work.", ans, 0,
    "Change the percent to a fraction of the trials, then apply it to the number of spins. \\[ \\begin{aligned} \\text{expected reds} &= "+p+"\\% \\text{ of } "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p:p,N:N});
}, ["An expected count applies the long-run percent to the actual number of trials.", "Start by finding what one percent of the trials is, or by writing the percent as a decimal."]);

/* --- Unit 8 pool-gap fill --- */
E("u8-gap-angle-chain-cr", 8, ["10.1"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("Angle P sits on a straight line with an angle of "+B+" degrees, so angle P and the "+B+" degree angle are supplementary. Angle P is one angle of a triangle whose second angle is "+D+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Find angle P from the straight line first, then use the triangle angle sum. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{third angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Two angle facts are chained here: use the straight-line fact first, then feed its result into the triangle.", "Start by finding the supplementary angle on the straight line."]);

E("u8-gap-pythagoras-cr", 8, ["10.19"], 2, "gen", function(){
  var s=ri(1,3), ox=ri(-4,2), oy=ri(-3,3);
  var A=[ox,oy], B=[ox+3*s,oy], Cc=[ox+3*s,oy+4*s], hyp=5*s;
  var q=numq("Points A "+u8pair(A[0],A[1])+", B "+u8pair(B[0],B[1])+" and C "+u8pair(Cc[0],Cc[1])+" form a right triangle with the right angle at B. Find the length of the hypotenuse AC. Show your work.", hyp, 0,
    "Count the legs from the coordinate differences first, then use the Pythagorean relationship. \\[ \\begin{aligned} AB &= "+(3*s)+", \\quad BC = "+(4*s)+" \\\\ AC^2 &= "+(3*s)+"^2 + "+(4*s)+"^2 = "+(25*s*s)+" \\\\ AC &= "+hyp+" \\end{aligned} \\] The answer is <b>"+hyp+"</b>.",
    {s:s}); q.figure=figWideGrid([{x:A[0],y:A[1],label:"A"},{x:B[0],y:B[1],label:"B"},{x:Cc[0],y:Cc[1],label:"C"}],[[A,B,Cc]],null); return q;
}, ["Get the two leg lengths from the coordinates first; the hypotenuse comes from combining them.", "Start by finding how far apart the points are horizontally and vertically."]);

E("u8-gap-rotate-cr", 8, ["10.20","10.12"], 2, "gen", function(){
  var x=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), y=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var cw=Math.random()<0.5;
  var step1=cw?[y,-x]:[-y,x], step2=[-x,-y];
  var askX=Math.random()<0.5, ans=askX?step2[0]:step2[1];
  var dirTxt=cw?"clockwise":"counterclockwise";
  var q=numq("Point P "+u8pair(x,y)+" is rotated 90 degrees "+dirTxt+" about the origin, and the image is then rotated another 90 degrees "+dirTxt+" about the origin. What is the "+(askX?"x":"y")+"-coordinate of the final image? Show your work.", ans, 0,
    "Apply the quarter-turn rule twice, updating the point after each turn. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after one turn} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{after two turns} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",
    {x:x,y:y}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
}, ["Apply the rotation one quarter turn at a time, updating the coordinates after each turn.", "Start by applying the first 90 degree turn to the original point."]);

E("u8-gap-grid-area-cr", 8, ["10.9"], 2, "gen", function(){
  var F=ri(9,20), H=pick([2,4,6,8,10]), s=pick([2,3,4]);
  var units=F+H/2, ans=units*s*s;
  var q=numq("A shape drawn on grid paper covers "+F+" whole grid squares and "+H+" half grid squares. Each grid square is "+s+" cm by "+s+" cm. Find the area of the shape, in square centimetres. Show your work.", ans, 0,
    "Combine the half squares into whole squares first, then multiply by the area of one square. \\[ \\begin{aligned} \\text{squares} &= "+F+" + "+H+" \\div 2 = "+units+" \\\\ \\text{area of one square} &= "+s+" \\times "+s+" = "+(s*s)+" \\\\ \\text{area} &= "+units+" \\times "+(s*s)+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {F:F,H:H,s:s}); q.figure=figGridArea(F,H); return q;
}, ["Turn the half squares into whole-square equivalents first, then apply the scale of one square.", "Start by pairing the half squares into whole squares."]);

E("u8-gap-parallel-angle-cr", 8, ["10.1"], 2, "gen", function(){
  var A=0,B=0,third=0,g=0;
  while(g++<200){ A=ri(40,110); B=ri(20,60); third=180-A-B; if(third>=10) break; }
  var q=numq("Two parallel lines are cut by a transversal. One angle formed is "+A+" degrees, and an alternate interior angle equal to it forms one angle of a triangle. A second angle of the triangle is "+B+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Alternate interior angles formed by parallel lines are equal, so the triangle angle is "+A+" degrees; then use the triangle angle sum. \\[ \\begin{aligned} \\text{third angle} &= 180 - "+A+" - "+B+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {A:A,B:B}); q.figure=triAngSVG(A,B,third,{L:["","",""],ang:[A+"°",B+"°","?"]}); return q;
}, ["Use the parallel-line angle relationship first to get the triangle angle, then the triangle angle sum.", "Start by stating the size of the alternate interior angle."]);

/* ----- bank-pk.js ----- */
/* Mathematics 7 prior knowledge, Band 3 Piece 1: the fluency strand
   core (November 16, 2026), per Math-7-PK-Band-3-Specification-2026-11-16.md
   Sections 3 and 10. All 43 entries in this file are authored new;
   the 2 further flagged entries are shared copies of strand
   generators housed in Unit 7 (ordering-numbers), each a separate
   entry with its own host ID, unit and pkSrc line, on the
   shared-source pattern. Provenance is recorded three ways, in
   agreement: the comment block at the head of each group section
   below, the pkSrc property each entry gains from the PKT7 table
   at the end of this file, and the build report's source-to-host
   table. pkSrc names what an item assesses, in the specification's
   form: "math-5:MA5.5.19" for an evidenced elementary placement,
   "authored:{construct}, placement unevidenced" where no elementary
   outcome on file names the skill. Each entry's indicators array
   carries its primary supported host indicator (the first code in
   its group's Supports column); pkFor carries the full list. No
   strand entry is Level 3: fluency is recall and routine procedure.
   Ranges stop at the elementary ceiling: no integer operations, no
   fraction operations, nothing Mathematics 7 itself assesses.
   Piece 2 (the Unit 4 area and measurement piece, Section 7 of the
   specification) follows the strand in this file. Piece 3 (Section
   8) closes the file and Band 3: 95 entries added (82 authored and
   13 shared copies) across the remaining clusters, and 18 entries
   already in the bank flagged as the state A support sets, for a
   bank of 374 with 183 flagged. */

/* Distinct distractor values: drops the key itself and repeats,
   keeping the order given. */
function pk7uniq(ans, list) {
  var out = [], seen = {};
  seen[String(ans)] = 1;
  list.forEach(function (v) { var k = String(v); if (!seen[k]) { seen[k] = 1; out.push(v); } });
  return out;
}

/* Pad a numeric distractor list to at least three distinct values
   with plain offsets, for the draws where an entry's error-based
   candidates collapse onto each other (small facts especially). */
function pk7fill(ans, ds) {
  var out = ds.slice(), offs = [7, -7, 13, -13, 3, -3, 21, -21];
  for (var i = 0; i < offs.length && out.length < 3; i++) {
    var v = ans + offs[i];
    if (v !== ans && out.indexOf(v) < 0) out.push(v);
  }
  return out;
}

/* Number line figure drawn from the item's own values: integer
   ticks from lo to hi, a marker at each value in marks, and the
   tick at missing labelled "?" instead of its value (missing null
   for none). */
function pk7line(lo, hi, marks, missing) {
  var W = 340, H = 76, x0 = 28, x1 = 312, y = 34;
  function X(v) { return x0 + (v - lo) / (hi - lo) * (x1 - x0); }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from ' + lo + ' to ' + hi + '">';
  out += '<line x1="' + (x0 - 8) + '" y1="' + y + '" x2="' + (x1 + 8) + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var v = lo; v <= hi; v++) {
    out += '<line x1="' + X(v) + '" y1="' + (y - 6) + '" x2="' + X(v) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(X(v), y + 24, (v === missing ? "?" : String(v)), 12, false);
  }
  (marks || []).forEach(function (m) {
    out += '<circle cx="' + X(m) + '" cy="' + y + '" r="5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
    out += '<polygon points="' + (X(m) - 4.5) + ',' + (y - 16) + ' ' + (X(m) + 4.5) + ',' + (y - 16) + ' ' + X(m) + ',' + (y - 8) + '" fill="' + FIG_ACC + '"/>';
  });
  return out + '</svg>';
}

/* Stepped number line: ticks at the given values, equally spaced;
   the tick at index missingIdx is labelled "?" (or -1 for none);
   a marker sits over the tick at index markIdx (or -1 for none). */
function pk7lineSteps(values, markIdx, missingIdx) {
  var W = 340, H = 76, x0 = 34, x1 = 306, y = 34, n = values.length;
  function X(i) { return x0 + i / (n - 1) * (x1 - x0); }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line">';
  out += '<line x1="' + (x0 - 8) + '" y1="' + y + '" x2="' + (x1 + 8) + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i < n; i++) {
    out += '<line x1="' + X(i) + '" y1="' + (y - 6) + '" x2="' + X(i) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(X(i), y + 24, (i === missingIdx ? "?" : String(values[i])), 12, false);
    if (i === markIdx) {
      out += '<circle cx="' + X(i) + '" cy="' + y + '" r="5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
      out += '<polygon points="' + (X(i) - 4.5) + ',' + (y - 16) + ' ' + (X(i) + 4.5) + ',' + (y - 16) + ' ' + X(i) + ',' + (y - 8) + '" fill="' + FIG_ACC + '"/>';
    }
  }
  return out + '</svg>';
}

/* ================= Multiplication facts (multiplication-facts) =================
   Grounding: MA5.5.19 (recall of multiplication facts to 9 x 9 and
   related division facts), MA5.5.16 (mental strategies for the same
   facts), MA5.5.17 (the doubling and halving strategy), MA4.5.19
   beneath (recall to 7 x 7). Supports host indicators 5.1 to 5.4. */

E("u1-pk-fact-recall", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [(a - 1) * b, (a + 1) * b, a * (b - 1), a * (b + 1), ans - a, ans + b])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + b + " = " + ans + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "That is the product of a nearby fact. Say the fact for \\(" + a + " \\times " + b + "\\) itself." }; }),
    "The multiplication facts to \\(9 \\times 9\\) are recalled directly: \\(" + a + " \\times " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Say the fact out loud before you look at the choices.", "If the fact will not come, count up by one factor: groups of the other."]);

E("u1-pk-fact-division", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 9), b = ri(4, 9), p = a * b;
  var ds = pk7uniq(b, [b - 1, b + 1, b + 2, b - 2]).slice(0, 3);
  return mcq("What is \\(" + p + " \\div " + a + "\\)?",
    { t: String(b), fb: "Correct: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Check with multiplication: \\(" + a + " \\times " + d + "\\) is not " + p + "." }; }),
    "Division facts come from the matching multiplication fact: \\(" + a + " \\times " + b + " = " + p + "\\), so \\(" + p + " \\div " + a + " = " + b + "\\). The answer is <b>" + b + "</b>.",
    { a: a, b: b });
}, ["Think of the multiplication fact with the same numbers.", "Ask: the divisor times what gives the number being divided?"]);

E("u1-pk-fact-onemore", 1, ["5.1"], 1, "gen", function () {
  var a = ri(3, 8), b = ri(4, 9), known = a * b, ans = (a + 1) * b;
  var ds = pk7fill(ans, pk7uniq(ans, [known + a, known + 1, (a + 2) * b, known - b])).slice(0, 3);
  return mcq("You know that \\(" + a + " \\times " + b + " = " + known + "\\). What is \\(" + (a + 1) + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: one more group of " + b + " than " + known + " gives " + known + " + " + b + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === known + a ? "That adds one group of " + a + "; the extra group is a group of " + b + "." : "Start from " + known + " and add one more group of " + b + "." }; }),
    "\\(" + (a + 1) + " \\times " + b + "\\) is one more group of " + b + " than \\(" + a + " \\times " + b + "\\): \\(" + known + " + " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Compare the two facts: what changes from the known one?", "One more group means adding the group size once more."]);

E("u1-pk-fact-skip", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 9), ans = 5 * n;
  var ds = pk7uniq(ans, [4 * n + (n - 1), 4 * n + (n + 1), 6 * n, 4 * n + 1]).slice(0, 3);
  return mcq("Counting by " + n + "s: \\(" + n + ", " + (2 * n) + ", " + (3 * n) + ", " + (4 * n) + ", \\ldots\\) What number comes next?",
    { t: String(ans), fb: "Correct: add one more " + n + " to " + (4 * n) + "." },
    ds.map(function (d) { return { t: String(d), fb: "Each step adds exactly " + n + "." }; }),
    "Skip counting by " + n + "s adds " + n + " each time: \\(" + (4 * n) + " + " + n + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { n: n });
}, ["What is added at each step of the count?", "Say the count out loud and keep going one more step."]);

E("u1-pk-fact-halving", 1, ["5.1"], 1, "gen", function () {
  var a = ri(2, 4), b = ri(3, 9), known = 2 * a * b, ans = a * b;
  var ds = pk7fill(ans, pk7uniq(ans, [known - b, ans + b, known - 2 * b, ans - b])).slice(0, 3);
  return mcq("You know that \\(" + (2 * a) + " \\times " + b + " = " + known + "\\). What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: " + a + " is half of " + (2 * a) + ", so the product halves too: " + known + " halved is " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: "Halving one factor halves the product; subtracting a group does something else." }; }),
    "\\(" + a + "\\) is half of \\(" + (2 * a) + "\\), so \\(" + a + " \\times " + b + "\\) is half of \\(" + known + "\\): \\(" + known + " \\div 2 = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Compare the first factors of the two facts.", "When one factor is halved, what happens to the product?"]);

/* ================= Multiplying multi-digit numbers (multiplication-fluency) =================
   Grounding: MA4.5.12 (2- and 3-digit by 1-digit), MA5.5.4 and
   MA5.5.5 (2-digit by 2-digit), MA5.5.18 (products with multiples
   of 10, 100 and 1 000). Supports host indicators 5.1 to 5.4 and
   7.5, 7.6, 7.9 to 7.12. */

E("u1-pk-mult-2by1", 1, ["5.1"], 1, "gen", function () {
  var a = ri(23, 98), b = ri(3, 9), ans = a * b;
  var tens = Math.floor(a / 10) * 10, ones = a % 10;
  var ds = pk7uniq(ans, [tens * b + ones, ones * b + tens, ans + b, ans - b]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + tens + " \\times " + b + " = " + (tens * b) + "\\) and \\(" + ones + " \\times " + b + " = " + (ones * b) + "\\), and " + (tens * b) + " + " + (ones * b) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === tens * b + ones ? "That multiplies the tens by " + b + " but leaves the ones unmultiplied." : (d === ones * b + tens ? "That multiplies the ones by " + b + " but leaves the tens unmultiplied." : "Multiply both parts of " + a + " by " + b + " and add the parts.") }; }),
    "Split \\(" + a + "\\) into \\(" + tens + " + " + ones + "\\): \\(" + tens + " \\times " + b + " = " + (tens * b) + "\\) and \\(" + ones + " \\times " + b + " = " + (ones * b) + "\\). Adding, \\(" + (tens * b) + " + " + (ones * b) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the bigger number into tens and ones.", "Multiply each part by the single digit, then add."]);

E("u1-pk-mult-3by1", 1, ["5.1"], 1, "gen", function () {
  var a = ri(123, 989), b = ri(3, 9), ans = a * b;
  var hund = Math.floor(a / 100) * 100, rest = a % 100;
  var ds = pk7uniq(ans, [rest * b + Math.floor(a / 100), ans + b, ans - b, rest * b + hund]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + hund + " \\times " + b + " = " + (hund * b) + "\\) and \\(" + rest + " \\times " + b + " = " + (rest * b) + "\\), and " + (hund * b) + " + " + (rest * b) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === rest * b + Math.floor(a / 100) ? "That keeps the hundreds digit at its face value instead of multiplying " + hund + " by " + b + "." : "Multiply every part of " + a + " by " + b + ", keeping each part's place value." }; }),
    "Split \\(" + a + "\\) into \\(" + hund + " + " + rest + "\\): \\(" + hund + " \\times " + b + " = " + (hund * b) + "\\) and \\(" + rest + " \\times " + b + " = " + (rest * b) + "\\). Adding, \\(" + (hund * b) + " + " + (rest * b) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the bigger number by place value.", "The hundreds part keeps its full value when it is multiplied."]);

E("u1-pk-mult-2by2", 1, ["5.1"], 2, "gen", function () {
  var a = ri(13, 49), b = ri(12, 39); if (b % 10 === 0) b += 1; if (a % 10 === 0) a += 1;
  var ans = a * b;
  var at = Math.floor(a / 10) * 10, ao = a % 10, bt = Math.floor(b / 10) * 10, bo = b % 10;
  var ds = pk7fill(ans, pk7uniq(ans, [a * bt + ao * bo, at * bt + ao * bo, ans + a, a * bt])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\), and " + (a * bt) + " + " + (a * bo) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * bt ? "That is only the first part, \\(" + a + " \\times " + bt + "\\); the \\(" + a + " \\times " + bo + "\\) part is still missing." : "Both parts of " + b + " must multiply all of " + a + "." }; }),
    "Split \\(" + b + "\\) into \\(" + bt + " + " + bo + "\\): \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\). Adding, \\(" + (a * bt) + " + " + (a * bo) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split one of the numbers into tens and ones.", "There are two partial products to add."]);

E("u1-pk-mult-zeros", 1, ["5.1"], 1, "gen", function () {
  var form = ri(0, 1), a = ri(2, 9), b = ri(2, 9), x, y, ans, base;
  if (form === 0) { x = a * 100; y = b; base = a * b; }
  else { x = a * 10; y = b * 10; base = a * b; }
  ans = x * y;
  var ds = pk7uniq(ans, [ans / 10, ans * 10, (a + 1) * b * (ans / base), (a - 1) * b * (ans / base)]).slice(0, 3);
  return mcq("What is \\(" + x + " \\times " + y + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + b + " = " + base + "\\), and the zeros in the factors give " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === (a + 1) * b * (ans / base) || d === (a - 1) * b * (ans / base) ? "The fact \\(" + a + " \\times " + b + " = " + base + "\\) comes first; then count the zeros." : "Count the zeros: the factors together carry " + (String(x).match(/0*$/) [0].length + String(y).match(/0*$/)[0].length) + " trailing zero(s) onto the fact \\(" + a + " \\times " + b + "\\)." }; }),
    "Start with the fact \\(" + a + " \\times " + b + " = " + base + "\\), then apply the zeros from both factors: \\(" + x + " \\times " + y + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, form: form });
}, ["Do the basic fact first, ignoring the zeros.", "Then put back one zero for each zero in the factors."]);

E("u1-pk-mult-3by2", 1, ["5.1"], 2, "gen", function () {
  var a = ri(112, 499), b = ri(13, 39); if (b % 10 === 0) b += 1;
  var ans = a * b;
  var bt = Math.floor(b / 10) * 10, bo = b % 10;
  var ds = pk7uniq(ans, [a * bt, a * bt + (a % 10) * bo, ans + a, ans - b]).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\), and " + (a * bt) + " + " + (a * bo) + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * bt ? "That is only the \\(" + a + " \\times " + bt + "\\) part; the \\(" + a + " \\times " + bo + "\\) part is still missing." : "Split " + b + " into " + bt + " + " + bo + " and multiply all of " + a + " by each part." }; }),
    "Split \\(" + b + "\\) into \\(" + bt + " + " + bo + "\\): \\(" + a + " \\times " + bt + " = " + (a * bt) + "\\) and \\(" + a + " \\times " + bo + " = " + (a * bo) + "\\). Adding, \\(" + (a * bt) + " + " + (a * bo) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Split the two-digit number into tens and ones.", "Multiply the whole three-digit number by each part."]);

/* ================= Dividing multi-digit numbers (division-fluency) =================
   Grounding: MA5.5.8 and MA5.5.9 (division with a 1-digit divisor
   and a 3-digit dividend, with and without remainders), MA5.5.19
   (related division facts), and the Mathematics 5 division unit
   (MA5.5.x) for division by 2-digit divisors and by multiples of
   10 at the Grade 5 to 6 pitch; MA4.5.8, MA4.5.9, MA4.5.16 and
   MA4.5.17 beneath. Supports host indicators 5.1 to 5.4 and 7.5,
   7.6, 7.9 to 7.12. */

E("u1-pk-div-exact", 1, ["5.1"], 1, "gen", function () {
  var d = ri(3, 9), q = ri(31, 99), n = d * q;
  var ds = pk7uniq(q, [q - 1, q + 1, q + 10, q - 10]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: String(q), fb: "Correct: \\(" + d + " \\times " + q + " = " + n + "\\)." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying: \\(" + d + " \\times " + x + "\\) is not " + n + "." }; }),
    "Use the matching multiplication: \\(" + d + " \\times " + q + " = " + n + "\\), so \\(" + n + " \\div " + d + " = " + q + "\\). The answer is <b>" + q + "</b>.",
    { d: d, q: q });
}, ["Check a possible answer by multiplying it by the divisor.", "The multiplication fact with the same numbers settles it."]);

E("u1-pk-div-remainder", 1, ["5.1"], 1, "gen", function () {
  var d = ri(4, 9), q = ri(21, 89), r = ri(1, d - 2), n = d * q + r;
  function lab(qq, rr) { return qq + " remainder " + rr; }
  var ds = pk7uniq(lab(q, r), [lab(q + 1, r), lab(q, r + 1), lab(q - 1, r)]);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: lab(q, r), fb: "Correct: \\(" + d + " \\times " + q + " = " + (d * q) + "\\), which leaves " + r + " over." },
    ds.map(function (x) { return { t: x, fb: "Multiply the quotient by " + d + " and add the remainder: it must give back " + n + ", and a remainder must be smaller than " + d + "." }; }),
    "\\(" + d + " \\times " + q + " = " + (d * q) + "\\), and \\(" + n + " - " + (d * q) + " = " + r + "\\), so \\(" + n + " \\div " + d + " = " + q + "\\) remainder \\(" + r + "\\). The answer is <b>" + lab(q, r) + "</b>.",
    { d: d, q: q, r: r });
}, ["Find the largest multiple of the divisor that fits.", "What is left over must be smaller than the divisor."]);

E("u1-pk-div-2digit", 1, ["5.1"], 2, "gen", function () {
  var d = ri(12, 29); if (d % 10 === 0) d += 1;
  var qmax = Math.floor(999 / d), q = ri(11, qmax), n = d * q;
  var ds = pk7uniq(q, [q - 1, q + 1, q + 2, q - 2]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + d + "\\)?",
    { t: String(q), fb: "Correct: \\(" + d + " \\times " + q + " = " + n + "\\)." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying: \\(" + d + " \\times " + x + "\\) is not " + n + "." }; }),
    "Estimate first: \\(" + d + " \\times " + q + " = " + n + "\\) exactly, so \\(" + n + " \\div " + d + " = " + q + "\\). The answer is <b>" + q + "</b>.",
    { d: d, q: q });
}, ["Estimate with a round multiple of the divisor first.", "Check the answer by multiplying it by the divisor."]);

E("u1-pk-div-related", 1, ["5.1"], 1, "gen", function () {
  var a = ri(12, 19), b = ri(3, 9), p = a * b;
  var ds = pk7uniq(a, [a - 1, a + 1, a + 2]).slice(0, 3);
  return mcq("You know that \\(" + a + " \\times " + b + " = " + p + "\\). What is \\(" + p + " \\div " + b + "\\)?",
    { t: String(a), fb: "Correct: the division undoes the multiplication fact." },
    ds.map(function (x) { return { t: String(x), fb: "The answer is one of the numbers in the known fact." }; }),
    "The three numbers in \\(" + a + " \\times " + b + " = " + p + "\\) form a fact family, so \\(" + p + " \\div " + b + " = " + a + "\\). The answer is <b>" + a + "</b>.",
    { a: a, b: b });
}, ["The known fact already contains the answer.", "Division undoes multiplication with the same three numbers."]);

E("u1-pk-div-zeros", 1, ["5.1"], 2, "gen", function () {
  var form = ri(0, 1), a = ri(3, 9), d = ri(3, 9), n, dv, ans;
  if (form === 0) { ans = a * 100; dv = d; n = a * d * 100; }
  else { ans = a * 10; dv = d * 10; n = a * d * 100; }
  var ds = pk7uniq(ans, [ans / 10, ans * 10, (a + 1) * (ans / a), (a - 1) * (ans / a)]).slice(0, 3);
  return mcq("What is \\(" + n + " \\div " + dv + "\\)?",
    { t: String(ans), fb: "Correct: the matching fact is \\(" + a + " \\times " + d + " = " + (a * d) + "\\), and the zeros give " + ans + "." },
    ds.map(function (x) { return { t: String(x), fb: "Check by multiplying the answer by " + dv + ": it must give back " + n + "." }; }),
    "Work from the fact \\(" + a + " \\times " + d + " = " + (a * d) + "\\) and track the zeros: \\(" + dv + " \\times " + ans + " = " + n + "\\), so \\(" + n + " \\div " + dv + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, d: d, form: form });
}, ["Start from the basic fact with the same digits.", "Check by multiplying your answer by the divisor."]);

/* ================= Addition and subtraction fluency (addition-subtraction) =================
   Grounding: MA4.4.4, MA4.4.5 and MA4.4.6 (addition and
   subtraction with answers to 10 000, including regrouping and
   problems with more than two numbers). Supports host indicators
   6.24 to 6.29. */

E("u2-pk-add-regroup", 2, ["6.24"], 1, "gen", function () {
  var a = 0, b = 0, g = 0;
  while (g++ < 300) {
    a = ri(1250, 9899); b = ri(1250, 9899);
    if ((a % 10) + (b % 10) >= 10 || (Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) >= 10) break;
  }
  var ans = a + b;
  function noCarry(x, y) { var s = "", p = 1; for (var i = 0; i < 4; i++) { var dx = Math.floor(x / p) % 10, dy = Math.floor(y / p) % 10; s = String((dx + dy) % 10) + s; p *= 10; } return parseInt(s, 10); }
  var ds = pk7fill(ans, pk7uniq(ans, [noCarry(a, b), ans - 100, ans + 10, ans - 10])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + "\\)?",
    { t: String(ans), fb: "Correct: add place by place, regrouping whenever a place reaches 10." },
    ds.map(function (d) { return { t: String(d), fb: d === noCarry(a, b) ? "That adds each place but never regroups: when a place reaches 10, carry into the next place." : "Work place by place from the right, regrouping as you go." }; }),
    "Adding place by place with regrouping, \\(" + a + " + " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Start from the ones place and work left.", "Whenever a place totals 10 or more, regroup into the next place."]);

E("u2-pk-sub-regroup", 2, ["6.24"], 1, "gen", function () {
  var a = ri(3, 9) * 1000 + ri(0, 9), b = ri(1123, a - 1000), ans = a - b;
  function smallFromLarge(x, y) { var s = "", p = 1; for (var i = 0; i < 4; i++) { var dx = Math.floor(x / p) % 10, dy = Math.floor(y / p) % 10; s = String(Math.abs(dx - dy)) + s; p *= 10; } return parseInt(s, 10); }
  var ds = pk7fill(ans, pk7uniq(ans, [smallFromLarge(a, b), ans - 10, ans + 10, ans + 100])).slice(0, 3);
  return mcq("What is \\(" + a + " - " + b + "\\)?",
    { t: String(ans), fb: "Correct: regroup across the zeros before subtracting each place." },
    ds.map(function (d) { return { t: String(d), fb: d === smallFromLarge(a, b) ? "That subtracts the smaller digit from the larger in each place; instead, regroup so each top digit is big enough." : "Regroup from the thousands through the hundreds and tens so the zeros do not block you." }; }),
    "The zeros in \\(" + a + "\\) mean regrouping more than once: borrow from the thousands, then the hundreds, then the tens, and subtract place by place: \\(" + a + " - " + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b });
}, ["Look at the zeros: they mean regrouping more than once.", "Regroup step by step from the left until each place can be subtracted."]);

E("u2-pk-add-three", 2, ["6.24"], 2, "gen", function () {
  var a = ri(148, 989), b = ri(148, 989), c = ri(148, 989), ans = a + b + c;
  var ds = pk7fill(ans, pk7uniq(ans, [a + b, ans - 10, ans + 100, a + c])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + " + " + c + "\\)?",
    { t: String(ans), fb: "Correct: all three numbers are added." },
    ds.map(function (d) { return { t: String(d), fb: (d === a + b || d === a + c) ? "That adds only two of the three numbers." : "Add the first two, then add the third to that total." }; }),
    "Add in stages: \\(" + a + " + " + b + " = " + (a + b) + "\\), then \\(" + (a + b) + " + " + c + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Add two of the numbers first.", "Then add the third number to that total."]);

E("u2-pk-sub-line", 2, ["6.24"], 2, "gen", function () {
  var p = ri(4, 7), m = ri(1, 3), neg = -m, ans = p - neg;
  var ds = pk7uniq(ans, [p - m, ans + 1, ans - 1, p + m + 2]).slice(0, 3);
  var q = mcq("Two points are marked on the number line. How far apart are the two marked points?",
    { t: String(ans), fb: "Correct: from " + neg + " up to 0 is " + m + ", and from 0 up to " + p + " is " + p + ", so the distance is " + m + " + " + p + " = " + ans + "." },
    ds.map(function (d) { return { t: String(d), fb: d === p - m ? "That subtracts the distances from zero; the points are on opposite sides of zero, so their distances add." : "Count the distance in two parts: from the left point up to 0, then from 0 to the right point." }; }),
    "The marked points are " + neg + " and " + p + ". From " + neg + " to 0 is " + m + " units, and from 0 to " + p + " is " + p + " units, so the points are \\(" + m + " + " + p + " = " + ans + "\\) units apart. The answer is <b>" + ans + "</b>.",
    { p: p, m: m });
  q.figure = pk7line(-6, 8, [neg, p], null);
  return q;
}, ["Find the two marked values on the line first.", "Split the distance at zero and add the two parts."]);

E("u2-pk-addsub-large", 2, ["6.24"], 2, "gen", function () {
  var sub = ri(0, 1) === 1, a = ri(12345, 98999), b = ri(12345, 98999);
  if (sub && b > a) { var t = a; a = b; b = t; }
  var ans = sub ? a - b : a + b;
  var ds = pk7uniq(ans, [ans - 100, ans + 10, ans + 1000, ans - 10]).slice(0, 3);
  return mcq("What is \\(" + a + (sub ? " - " : " + ") + b + "\\)?",
    { t: String(ans), fb: "Correct: work place by place across all five places, regrouping as needed." },
    ds.map(function (d) { return { t: String(d), fb: "Line the numbers up by place value and work from the ones place, regrouping whenever a place needs it." }; }),
    "Working place by place from the ones, \\(" + a + (sub ? " - " : " + ") + b + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, sub: sub });
}, ["Line the numbers up by place value.", "Work from the ones place to the ten thousands place."]);

/* ================= Number line ordering (ordering-numbers) =================
   Grounding: MA4.1.1 and MA4.1.2 (placing and ordering whole
   numbers, number lines), MA5.3.18 and MA5.3.19 (comparing
   decimals), MA6.1.2 (extending the line below zero). Supports
   host indicators 6.24 to 6.29 in Unit 2; the two shared copies
   housed in Unit 7 support 11.6 to 11.13. */

E("u2-pk-order-place", 2, ["6.24"], 1, "gen", function () {
  var base = ri(200000, 900000);
  var vals = pk7uniq(-1, [base, base + ri(100, 900), base - ri(100, 900), base + ri(1000, 9000)]).slice(0, 4);
  while (vals.length < 4) { var v = base + ri(10000, 90000); if (vals.indexOf(v) < 0) vals.push(v); }
  var greatest = ri(0, 1) === 1, key = greatest ? Math.max.apply(null, vals) : Math.min.apply(null, vals);
  var ds = vals.filter(function (v) { return v !== key; });
  return mcq("Which of these numbers is the " + (greatest ? "greatest" : "smallest") + "?",
    { t: String(key), fb: "Correct: compare the digits place by place from the left." },
    ds.map(function (d) { return { t: String(d), fb: "Compare from the leftmost digit: the first place where two numbers differ decides which is bigger." }; }),
    "All four numbers have six digits, so compare place by place from the left. The " + (greatest ? "greatest" : "smallest") + " is <b>" + key + "</b>.",
    { vals: vals });
}, ["Compare the numbers from the leftmost digit.", "The first place where the digits differ settles it."]);

E("u2-pk-order-line", 2, ["6.24"], 1, "gen", function () {
  var lo = ri(0, 40), mark = lo + ri(2, 8);
  var ds = pk7uniq(mark, [mark - 1, mark + 1, mark + 2]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: count along the ticks from " + lo + "." },
    ds.map(function (d) { return { t: String(d), fb: "Count the ticks one at a time from the labelled start." }; }),
    "Each tick is one more than the tick before it. Counting from " + lo + ", the marker sits at <b>" + mark + "</b>.",
    { lo: lo, mark: mark });
  q.figure = pk7line(lo, lo + 10, [mark], null);
  return q;
}, ["Start at the labelled number on the left.", "Count one tick at a time up to the marker."]);

E("u2-pk-order-missing", 2, ["6.24"], 2, "gen", function () {
  var step = pick([25, 50, 100, 250]), start = ri(100, 900), mi = ri(1, 4);
  var vals = []; for (var i = 0; i < 6; i++) vals.push(start + i * step);
  var key = vals[mi];
  var ds = pk7uniq(key, [key - step, key + step, key + 2 * step]).slice(0, 3);
  var q = mcq("What number belongs at the ? on this number line?",
    { t: String(key), fb: "Correct: the ticks go up by " + step + " each time." },
    ds.map(function (d) { return { t: String(d), fb: "Work out the step between neighbouring ticks first, then count on." }; }),
    "Neighbouring ticks differ by " + step + ", so counting on from " + vals[mi - 1] + " gives \\(" + vals[mi - 1] + " + " + step + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { step: step, start: start, mi: mi });
  q.figure = pk7lineSteps(vals, -1, mi);
  return q;
}, ["Find the gap between two neighbouring labelled ticks.", "Count on by that gap to the question mark."]);

E("u2-pk-order-decimals", 2, ["6.24"], 2, "gen", function () {
  var t = ri(2, 8);
  var vals = [(10 * t - 5) / 100, t / 10, (10 * t + 3) / 100, (10 * t + 8) / 100];
  var key = Math.max.apply(null, vals);
  var ds = vals.filter(function (v) { return v !== key; });
  function s(v) { return fmtF(v, 2); }
  return mcq("Which of these decimals is the greatest?",
    { t: s(key), fb: "Correct: written in hundredths, the four are " + vals.map(s).join(", ") + ", and " + s(key) + " is the largest." },
    ds.map(function (d) { return { t: s(d), fb: "Write every decimal in hundredths before comparing: a tenths digit is worth ten hundredths." }; }),
    "In hundredths the numbers are " + vals.map(s).join(", ") + ". The greatest is <b>" + s(key) + "</b>.",
    { t: t });
}, ["Write each decimal with the same number of decimal places.", "Then compare the hundredths values."]);

E("u2-pk-order-below", 2, ["6.24"], 2, "gen", function () {
  var mark = ri(-5, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side; the marker is on the negative side." : "Count the ticks from 0, and note which side of 0 the marker is on." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-6, 6, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

/* Shared copies of strand generators, housed in Unit 7 for cluster
   7-C12 (the computation base beneath the data work). Each copy is
   a separate entry with its own host ID, unit and pkSrc line, on
   the shared-source pattern; the generator code is identical to
   its Unit 2 original. Supports host indicators 11.6 to 11.13. */

E("u7-pk-order-line", 7, ["11.6"], 1, "gen", function () {
  var lo = ri(0, 40), mark = lo + ri(2, 8);
  var ds = pk7uniq(mark, [mark - 1, mark + 1, mark + 2]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: count along the ticks from " + lo + "." },
    ds.map(function (d) { return { t: String(d), fb: "Count the ticks one at a time from the labelled start." }; }),
    "Each tick is one more than the tick before it. Counting from " + lo + ", the marker sits at <b>" + mark + "</b>.",
    { lo: lo, mark: mark });
  q.figure = pk7line(lo, lo + 10, [mark], null);
  return q;
}, ["Start at the labelled number on the left.", "Count one tick at a time up to the marker."]);

E("u7-pk-order-below", 7, ["11.6"], 2, "gen", function () {
  var mark = ri(-5, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which number does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side; the marker is on the negative side." : "Count the ticks from 0, and note which side of 0 the marker is on." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-6, 6, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

/* ================= Multiples (multiples) =================
   Grounding: MA6.5.7 (a multiple is the product of two whole
   number factors; identify and produce multiples) and MA6.5.8
   (problem solving with multiples). Supports host indicators
   5.1 to 5.4. */

E("u1-pk-multiples-identify", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 12), key = n * ri(3, 9);
  var ds = pk7uniq(key, [key - 1, key + 1, key + 2, key - 2]).slice(0, 3);
  return mcq("Which of these numbers is a multiple of " + n + "?",
    { t: String(key), fb: "Correct: \\(" + key + " = " + n + " \\times " + (key / n) + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Divide by " + n + ": a multiple of " + n + " divides exactly, with nothing left over." }; }),
    "A multiple of " + n + " is " + n + " times a whole number: \\(" + key + " = " + n + " \\times " + (key / n) + "\\). The answer is <b>" + key + "</b>.",
    { n: n });
}, ["Run through the " + "times table for the number given.", "A multiple divides exactly by the number, with no remainder."]);

E("u1-pk-multiples-first", 1, ["5.1"], 1, "gen", function () {
  var n = ri(3, 9);
  function list(arr) { return arr.join(", "); }
  var key = list([n, 2 * n, 3 * n, 4 * n]);
  var ds = pk7uniq(key, [list([n, 2 * n, 3 * n, 5 * n]), list([1, n, 2 * n, 3 * n]), list([n, 2 * n + 1, 3 * n + 2, 4 * n + 3])]);
  return mcq("What are the first four multiples of " + n + "?",
    { t: key, fb: "Correct: multiply " + n + " by 1, 2, 3 and 4." },
    ds.map(function (d) { return { t: d, fb: "The first four multiples come from multiplying by 1, 2, 3 and 4, in order, with none skipped." }; }),
    "The first four multiples of " + n + " are \\(" + n + " \\times 1\\), \\(" + n + " \\times 2\\), \\(" + n + " \\times 3\\) and \\(" + n + " \\times 4\\): <b>" + key + "</b>.",
    { n: n });
}, ["Multiply the number by 1, then 2, then 3, then 4.", "The multiples themselves are the answers to those multiplications."]);

E("u1-pk-multiples-common", 1, ["5.1"], 2, "gen", function () {
  var pair = pick([[4, 6], [6, 8], [4, 10], [6, 9], [8, 12], [6, 10]]);
  var a = pair[0], b = pair[1], g = 0, lcm = a * b;
  while (lcm % a !== 0 || lcm % b !== 0 || g++ > 60) { lcm--; }
  var key = lcm * ri(1, 2);
  var m1 = 0, m2 = 0; g = 0;
  while (g++ < 200) { var c1 = a * ri(2, 9); if (c1 % b !== 0 && c1 !== key && c1 !== key + a) { m1 = c1; break; } }
  g = 0;
  while (g++ < 200) { var c2 = b * ri(2, 9); if (c2 % a !== 0 && c2 !== key && c2 !== m1) { m2 = c2; break; } }
  if (!m1) m1 = key + a;
  if (!m2) m2 = key + b;
  var ds = pk7uniq(key, [m1, m2, key + a]).slice(0, 3);
  return mcq("Which of these numbers is a multiple of both " + a + " and " + b + "?",
    { t: String(key), fb: "Correct: \\(" + key + " = " + a + " \\times " + (key / a) + " = " + b + " \\times " + (key / b) + "\\)." },
    ds.map(function (d) { return { t: String(d), fb: "Test the number against both: it must divide exactly by " + a + " and by " + b + "." }; }),
    "A common multiple divides exactly by both numbers: \\(" + key + " \\div " + a + " = " + (key / a) + "\\) and \\(" + key + " \\div " + b + " = " + (key / b) + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b });
}, ["List a few multiples of each number.", "Look for a number that appears in both lists."]);

E("u1-pk-multiples-problem", 1, ["5.1"], 2, "gen", function () {
  var n = ri(6, 12), T = ri(40, 90), key = (Math.floor(T / n) + 1) * n;
  var ds = pk7uniq(key, [key - n, key + n, key + 1]).slice(0, 3);
  return mcq("What is the first multiple of " + n + " that is greater than " + T + "?",
    { t: String(key), fb: "Correct: \\(" + (key - n) + "\\) is the multiple just below " + T + ", so the next one is " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === key - n ? "That multiple is not greater than " + T + "." : "Count by " + n + "s past " + T + " and take the first one you reach." }; }),
    "Counting by " + n + "s, the multiples near " + T + " are " + (key - n) + " and " + key + ". The first one greater than " + T + " is <b>" + key + "</b>.",
    { n: n, T: T });
}, ["Count by the given number, past the target.", "Take the first multiple that passes the target."]);

/* ================= Order of operations (order-of-operations) =================
   Grounding: MA6.5.9 (apply the order of operations) and MA6.5.10
   (evaluate expressions and say why a standard order is needed,
   in computation form). Supports host indicators 8.4, 8.5, 8.6,
   7.1 to 7.4, 7.7, 7.8. */

E("u1-pk-ooo-basic", 1, ["8.4"], 1, "gen", function () {
  var a = ri(2, 20), b = ri(2, 9), c = ri(2, 9), ans = a + b * c;
  var ds = pk7fill(ans, pk7uniq(ans, [(a + b) * c, a * b + c, ans + b])).slice(0, 3);
  return mcq("What is \\(" + a + " + " + b + " \\times " + c + "\\)?",
    { t: String(ans), fb: "Correct: multiply first, \\(" + b + " \\times " + c + " = " + (b * c) + "\\), then add." },
    ds.map(function (d) { return { t: String(d), fb: d === (a + b) * c ? "That works left to right; multiplication is done before addition." : "Multiplication comes before addition in the standard order." }; }),
    "Multiplication first: \\(" + b + " \\times " + c + " = " + (b * c) + "\\). Then \\(" + a + " + " + (b * c) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Look for multiplication or division first.", "Addition is done after the multiplication here."]);

E("u1-pk-ooo-brackets", 1, ["8.4"], 1, "gen", function () {
  var a = ri(2, 15), b = ri(2, 15), c = ri(2, 9), ans = (a + b) * c;
  var cand = pk7uniq(ans, [a + b * c, (a + b) + c, a * b + c, (a + b) * (c + 1)]);
  if (ans >= 100) cand = cand.filter(function (v) { return v !== a * b + c; });
  var ds = pk7fill(ans, cand).slice(0, 3);
  return mcq("What is \\((" + a + " + " + b + ") \\times " + c + "\\)?",
    { t: String(ans), fb: "Correct: the brackets are done first, \\(" + a + " + " + b + " = " + (a + b) + "\\), then multiply by " + c + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a + b * c ? "That ignores the brackets; brackets are always done first." : "Brackets come before everything else in the standard order." }; }),
    "Brackets first: \\(" + a + " + " + b + " = " + (a + b) + "\\). Then \\(" + (a + b) + " \\times " + c + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Look for brackets: they are done first.", "Then finish the operations outside the brackets."]);

E("u1-pk-ooo-chain", 1, ["8.4"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(2, 9), c = ri(2, 6), d = ri(2, 6), g = 0;
  while (g++ < 200 && a * b - c * d < 10) { a = ri(3, 9); b = ri(3, 9); c = ri(2, 6); d = ri(2, 6); }
  var ans = a * b - c * d;
  var ds = pk7fill(ans, pk7uniq(ans, [(a * b - c) * d, a * (b - c) * d, a * b - c + d])).slice(0, 3);
  return mcq("What is \\(" + a + " \\times " + b + " - " + c + " \\times " + d + "\\)?",
    { t: String(ans), fb: "Correct: both multiplications first, \\(" + (a * b) + " - " + (c * d) + "\\), then subtract." },
    ds.map(function (x) { return { t: String(x), fb: "Do both multiplications before any subtraction." }; }),
    "Multiplications first: \\(" + a + " \\times " + b + " = " + (a * b) + "\\) and \\(" + c + " \\times " + d + " = " + (c * d) + "\\). Then \\(" + (a * b) + " - " + (c * d) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c, d: d });
}, ["There are two multiplications; do both of them first.", "Only then subtract."]);

E("u1-pk-ooo-division", 1, ["8.4"], 2, "gen", function () {
  var qc = ri(2, 9), c = ri(2, 9), p = qc * c, r = ri(2, 12), s = ri(2, 9), ans = qc + r * s;
  var ds = pk7fill(ans, pk7uniq(ans, [(qc + r) * s, qc + r + s, p + r * s])).slice(0, 3);
  return mcq("What is \\(" + p + " \\div " + c + " + " + r + " \\times " + s + "\\)?",
    { t: String(ans), fb: "Correct: \\(" + p + " \\div " + c + " = " + qc + "\\) and \\(" + r + " \\times " + s + " = " + (r * s) + "\\) first, then add." },
    ds.map(function (x) { return { t: String(x), fb: x === p + r * s ? "That keeps " + p + " undivided; the division is done before the addition." : "Division and multiplication are both done before addition." }; }),
    "Division and multiplication first: \\(" + p + " \\div " + c + " = " + qc + "\\) and \\(" + r + " \\times " + s + " = " + (r * s) + "\\). Then \\(" + qc + " + " + (r * s) + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { p: p, c: c, r: r, s: s });
}, ["Do the division and the multiplication before the addition.", "There are two operations to finish before the final add."]);

E("u1-pk-ooo-why", 1, ["8.4"], 2, "gen", function () {
  var a = ri(2, 12), b = ri(2, 9), c = ri(2, 9), ans = a + b * c;
  var ds = pk7fill(ans, pk7uniq(ans, [(a + b) * c, a * b + c, a + b + c])).slice(0, 3);
  return mcq("Two students evaluate \\(" + a + " + " + b + " \\times " + c + "\\). One works left to right and gets " + ((a + b) * c) + ". The other uses the standard order of operations. What does the second student get?",
    { t: String(ans), fb: "Correct: the standard order does the multiplication first, so everyone who follows it gets " + ans + "." },
    ds.map(function (x) { return { t: String(x), fb: x === (a + b) * c ? "That is the left-to-right value; the standard order exists so an expression has just one value." : "With the standard order, multiplication is done before addition." }; }),
    "The standard order does multiplication before addition: \\(" + b + " \\times " + c + " = " + (b * c) + "\\), then \\(" + a + " + " + (b * c) + " = " + ans + "\\). Agreeing on one order means the expression has one value. The answer is <b>" + ans + "</b>.",
    { a: a, b: b, c: c });
}, ["Which operation does the standard order do first here?", "The standard order is what gives the expression a single value."]);

/* ================= Integers in context (below-zero) =================
   Grounding: MA6.1.2 (integers on the number line), MA6.1.4
   (representing and comparing quantities less than zero) and
   MA6.3.20 (placing integers on a number line), at the Grade 6
   introductory pitch: representation and comparison only, no
   integer operations. Supports host indicators 6.24 to 6.29. */

E("u2-pk-below-temp", 2, ["6.24"], 1, "gen", function () {
  var T = ri(2, 15);
  var ds = pk7uniq("-" + T + " °C", [T + " °C", "0 °C", "-" + (T + 1) + " °C"]);
  return mcq("The temperature is " + T + " degrees below zero. Which temperature is this?",
    { t: "-" + T + " °C", fb: "Correct: below zero is written with a negative sign." },
    ds.map(function (d) { return { t: d, fb: d === T + " °C" ? "That is " + T + " degrees above zero; below zero takes a negative sign." : "Below zero means a negative number of degrees." }; }),
    "Temperatures below zero are negative: " + T + " degrees below zero is <b>-" + T + " °C</b>.",
    { T: T });
}, ["Below zero is the negative side of the scale.", "The number of degrees stays the same; the sign changes."]);

E("u2-pk-below-debt", 2, ["6.24"], 1, "gen", function () {
  var D = ri(5, 40);
  var ds = pk7uniq("-" + D, [String(D), "0", "-" + (D + 5)]);
  return mcq("Sam owes his sister $" + D + ". Which integer represents the amount of money Sam has, compared with having nothing?",
    { t: "-" + D, fb: "Correct: owing money is a quantity less than zero." },
    ds.map(function (d) { return { t: d, fb: d === String(D) ? "That is having $" + D + "; owing is the opposite direction, below zero." : "Owing is less than zero, so the integer is negative." }; }),
    "Having nothing is 0, and owing $" + D + " is $" + D + " less than that, so the integer is <b>-" + D + "</b>.",
    { D: D });
}, ["Having nothing is zero on this scale.", "Owing is below zero, so it is negative."]);

E("u2-pk-below-line", 2, ["6.24"], 1, "gen", function () {
  var mark = ri(-4, -1);
  var ds = pk7uniq(mark, [-mark, mark - 1, mark + 1]).slice(0, 3);
  var q = mcq("Which integer does the marker show on this number line?",
    { t: String(mark), fb: "Correct: the marker is " + Math.abs(mark) + " tick(s) to the left of 0." },
    ds.map(function (d) { return { t: String(d), fb: d === -mark ? "That is the same distance from zero but on the positive side." : "Count the ticks from 0 and note the side." }; }),
    "The marker is " + Math.abs(mark) + " tick(s) to the left of 0, so it shows <b>" + mark + "</b>.",
    { mark: mark });
  q.figure = pk7line(-5, 5, [mark], null);
  return q;
}, ["Find 0 first, then count the ticks to the marker.", "Numbers to the left of 0 are negative."]);

E("u2-pk-below-compare", 2, ["6.24"], 1, "gen", function () {
  var cold = ri(11, 15), mild = ri(10, cold - 1), warm = ri(1, 5);
  var key = "-" + cold + " °C";
  var ds = pk7uniq(key, ["-" + mild + " °C", warm + " °C", "0 °C"]);
  return mcq("Which of these temperatures is the coldest?",
    { t: key, fb: "Correct: -" + cold + " °C is furthest below zero." },
    ds.map(function (d) { return { t: d, fb: "The further a temperature is below zero, the colder it is; a bigger number after the negative sign means colder, not warmer." }; }),
    "Below zero, the larger the number after the negative sign, the colder the temperature. The coldest is <b>-" + cold + " °C</b>.",
    { cold: cold, mild: mild, warm: warm });
}, ["Picture the temperatures on a number line.", "The coldest temperature is the furthest to the left."]);

/* ================= Averaging a set of numbers (averaging) =================
   Grounding: no elementary outcome on file names the mean or the
   average (verified against the Mathematics 4 to 6 lists), so
   this group is authored with the provenance "placement
   unevidenced" under the specification's ruling 3: the items
   assess the computation only (add the set, divide by the count),
   never the measures Mathematics 7 names in 11.6 and 11.9. The
   arithmetic rests on the addition and division outcomes above.
   Supports host indicators 11.6 to 11.13. */

/* A set of n values with exact mean m: offsets in pairs (+d, -d),
   plus a 0 offset when n is odd, so the values always average
   exactly m and stay inside [m - spread, m + spread]. */
function pk7avgValues(n, m, spread) {
  var offs = [];
  while (offs.length + 2 <= n) { var d = ri(1, spread); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  return offs.map(function (o) { return m + o; });
}

E("u7-pk-average-whole", 7, ["11.6"], 1, "gen", function () {
  var n = ri(3, 5), m = ri(8, 30), vals = pk7avgValues(n, m, 6);
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  var ds = pk7uniq(m, [sum, m + 1, m - 1]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by " + n + " values is " + m + "." },
    ds.map(function (d) { return { t: String(d), fb: d === sum ? "That is the total of the values; an average also divides by how many values there are." : "Add all the values, then divide by how many there are." }; }),
    "Add the values: the total is " + sum + ". Divide by the number of values: \\(" + sum + " \\div " + n + " = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-set", 7, ["11.6"], 2, "gen", function () {
  var n = ri(6, 8), m = ri(15, 60), vals = pk7avgValues(n, m, 9);
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  var ds = pk7uniq(m, [sum, m + 2, m - 2]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by " + n + " values is " + m + "." },
    ds.map(function (d) { return { t: String(d), fb: d === sum ? "That is the total of the values; an average also divides by how many values there are." : "Add all " + n + " values, then divide by " + n + "." }; }),
    "Add the values: the total is " + sum + ". Divide by the number of values: \\(" + sum + " \\div " + n + " = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-money", 7, ["11.6"], 2, "gen", function () {
  var n = ri(3, 5), M = ri(4, 20), offs = [];
  while (offs.length + 2 <= n) { var d = pick([0.5, 1, 1.5, 2]); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  var vals = offs.map(function (o) { return M + o; });
  var sum = vals.reduce(function (s, v) { return s + v; }, 0);
  function s(v) { return "$" + fmtF(v, 2); }
  var ds = pk7uniq(s(M), [s(sum), s(M + 0.5), s(M - 0.5)]);
  return mcq("A book costs " + vals.map(s).join(", ") + " at " + n + " different shops. What is the average price?",
    { t: s(M), fb: "Correct: the total is " + s(sum) + ", and " + s(sum) + " divided by " + n + " shops is " + s(M) + "." },
    ds.map(function (d) { return { t: d, fb: d === s(sum) ? "That is the total of the prices; an average also divides by how many prices there are." : "Add all the prices, then divide by how many there are." }; }),
    "Add the prices: the total is " + s(sum) + ". Divide by the number of shops: \\(" + fmtF(sum, 2) + " \\div " + n + " = " + fmtF(M, 2) + "\\). The answer is <b>" + s(M) + "</b>.",
    { vals: vals });
}, ["First find the total of all the prices.", "Then divide the total by how many prices there are."]);

E("u7-pk-average-decimals", 7, ["11.6"], 2, "gen", function () {
  var n = ri(4, 6), M10 = ri(25, 95), offs = [];
  while (offs.length + 2 <= n) { var d = ri(1, 9); offs.push(d); offs.push(-d); }
  if (offs.length < n) offs.push(0);
  var vals = offs.map(function (o) { return (M10 + o) / 10; });
  var sum10 = vals.reduce(function (s, v) { return s + Math.round(v * 10); }, 0);
  function s(v) { return fmtF(v, 1); }
  var ds = pk7uniq(s(M10 / 10), [s(sum10 / 10), s((M10 + 2) / 10), s((M10 - 2) / 10)]);
  return mcq("What is the average of " + vals.map(s).join(", ") + "?",
    { t: s(M10 / 10), fb: "Correct: the total is " + s(sum10 / 10) + ", and dividing by " + n + " values gives " + s(M10 / 10) + "." },
    ds.map(function (d) { return { t: d, fb: d === s(sum10 / 10) ? "That is the total of the values; an average also divides by how many values there are." : "Add all the values, then divide by how many there are." }; }),
    "Add the values: the total is " + s(sum10 / 10) + ". Divide by the number of values: \\(" + s(sum10 / 10) + " \\div " + n + " = " + s(M10 / 10) + "\\). The answer is <b>" + s(M10 / 10) + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

E("u7-pk-average-small", 7, ["11.6"], 1, "gen", function () {
  var m = ri(5, 20), d = ri(1, 4), vals = [m - d, m, m + d], sum = 3 * m;
  var ds = pk7uniq(m, [sum, m + d, m - d]).slice(0, 3);
  return mcq("What is the average of " + vals.join(", ") + "?",
    { t: String(m), fb: "Correct: the total is " + sum + ", and " + sum + " divided by 3 values is " + m + "." },
    ds.map(function (x) { return { t: String(x), fb: x === sum ? "That is the total of the values; an average also divides by how many values there are." : "That is one of the values itself; an average comes from the total, divided by the count." }; }),
    "Add the values: \\(" + vals.join(" + ") + " = " + sum + "\\). Divide by the number of values: \\(" + sum + " \\div 3 = " + m + "\\). The answer is <b>" + m + "</b>.",
    { vals: vals });
}, ["First find the total of all the values.", "Then divide the total by how many values there are."]);

/* ================= Tranche metadata =================
   pkSrc names what the item assesses; pkFor lists the host
   indicators the entry supports; pkGroup is the strand group.
   The indicators array on each entry above carries the first
   code of its pkFor list, per the specification's Section 10. */
var PK7_FOR_FACTS = ["5.1", "5.2", "5.3", "5.4"];
var PK7_FOR_MULT = ["5.1", "5.2", "5.3", "5.4", "7.5", "7.6", "7.9", "7.10", "7.11", "7.12"];
var PK7_FOR_ADDSUB = ["6.24", "6.25", "6.26", "6.27", "6.28", "6.29"];
var PK7_FOR_OOO = ["8.4", "8.5", "8.6", "7.1", "7.2", "7.3", "7.4", "7.7", "7.8"];
var PK7_FOR_AVG = ["11.6", "11.7", "11.8", "11.9", "11.10", "11.11", "11.12", "11.13"];
var PKT7 = {
  "u1-pk-fact-recall": { src: "math-5:MA5.5.19", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-division": { src: "math-5:MA5.5.19", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-onemore": { src: "math-5:MA5.5.16", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-skip": { src: "math-5:MA5.5.16", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-fact-halving": { src: "math-5:MA5.5.17", group: "multiplication-facts", for: PK7_FOR_FACTS },
  "u1-pk-mult-2by1": { src: "math-4:MA4.5.12", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-3by1": { src: "math-4:MA4.5.12", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-2by2": { src: "math-5:MA5.5.4", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-zeros": { src: "math-5:MA5.5.18", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-mult-3by2": { src: "math-5:MA5.5.5", group: "multiplication-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-exact": { src: "math-5:MA5.5.8", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-remainder": { src: "math-5:MA5.5.9", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-2digit": { src: "math-5:MA5.5.x", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-related": { src: "math-5:MA5.5.19", group: "division-fluency", for: PK7_FOR_MULT },
  "u1-pk-div-zeros": { src: "math-5:MA5.5.x", group: "division-fluency", for: PK7_FOR_MULT },
  "u2-pk-add-regroup": { src: "math-4:MA4.4.4", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-sub-regroup": { src: "math-4:MA4.4.5", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-add-three": { src: "math-4:MA4.4.6", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-sub-line": { src: "math-4:MA4.4.6", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-addsub-large": { src: "math-4:MA4.4.4", group: "addition-subtraction", for: PK7_FOR_ADDSUB },
  "u2-pk-order-place": { src: "math-4:MA4.1.1", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-line": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-missing": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-decimals": { src: "math-5:MA5.3.18", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u2-pk-order-below": { src: "math-6:MA6.1.2", group: "ordering-numbers", for: PK7_FOR_ADDSUB },
  "u7-pk-order-line": { src: "math-4:MA4.1.2", group: "ordering-numbers", for: PK7_FOR_AVG },
  "u7-pk-order-below": { src: "math-6:MA6.1.2", group: "ordering-numbers", for: PK7_FOR_AVG },
  "u1-pk-multiples-identify": { src: "math-6:MA6.5.7", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-first": { src: "math-6:MA6.5.7", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-common": { src: "math-6:MA6.5.8", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-multiples-problem": { src: "math-6:MA6.5.8", group: "multiples", for: PK7_FOR_FACTS },
  "u1-pk-ooo-basic": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-brackets": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-chain": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-division": { src: "math-6:MA6.5.9", group: "order-of-operations", for: PK7_FOR_OOO },
  "u1-pk-ooo-why": { src: "math-6:MA6.5.10", group: "order-of-operations", for: PK7_FOR_OOO },
  "u2-pk-below-temp": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-debt": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-line": { src: "math-6:MA6.1.2", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u2-pk-below-compare": { src: "math-6:MA6.1.4", group: "below-zero", for: PK7_FOR_ADDSUB },
  "u7-pk-average-whole": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-set": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-money": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-decimals": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG },
  "u7-pk-average-small": { src: "authored:averaging a set of numbers, placement unevidenced", group: "averaging", for: PK7_FOR_AVG }
};
BANK.forEach(function (e) { var t = PKT7[e.id]; if (t) { e.pkFlag = true; e.pkSrc = t.src; e.pkFor = t.for.slice(); e.pkGroup = t.group; } });

/* ================================================================
   Band 3 Piece 2 (November 16, 2026): area of a rectangle and the
   measurement base, all housed in Unit 4, per
   Math-7-PK-Band-3-Specification-2026-11-16.md Section 7. 25
   entries, all authored new, in five groups: rectangle-area and
   perimeter (cluster 7-C9), ruler-measurement, circle-measure and
   decimal-multiplication (cluster 7-C8). Percent of a quantity is
   excluded from this unit's check (specification Section 13,
   Decision 1): no percent group is built here. Provenance is
   recorded three ways, in agreement: the comment block at the head
   of each group section below, the pkSrc property each entry gains
   from the PKT7_P2 table at the end of this file, and the build
   report's source-to-host table. Each entry's indicators array
   carries the first code of its group's Supports column; pkFor
   carries the full list. Figure-bearing items draw the figure from
   the item's own values on every draw (a rectangle scaled to its
   labelled sides, a ruler whose object ends exactly on the tick
   for its stated length, a circle part drawn to the part named),
   and no figure hands over the key: side labels state lengths,
   never the area or perimeter asked for. */

/* Rectangle drawn to scale from its own side lengths, labelled
   underneath (length) and at the left (width). shade is true for
   the area group (the surface is the quantity) and false for the
   perimeter group (the boundary is the quantity). */
function pk7rect(l, w, lText, wText, shade) {
  var sc = Math.min(225 / l, 115 / w), rw = l * sc, rh = w * sc;
  var x0 = (320 - rw) / 2, y0 = (185 - rh) / 2 - 8;
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle">';
  out += '<rect x="' + fmt(x0, 1) + '" y="' + fmt(y0, 1) + '" width="' + fmt(rw, 1) + '" height="' + fmt(rh, 1) + '" fill="' + (shade ? FIG_SHADE : "none") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(x0 + rw / 2, y0 + rh + 18, lText, 12.5, false);
  out += _txt(x0 - 8, y0 + rh / 2 + 4, wText, 12, false, "end");
  return out + '</svg>';
}

/* House-shaped pentagon drawn to scale: base 2a, walls h, roof
   slopes s with the rise r = sqrt(s^2 - a^2) an integer for every
   (a, s) pair the entry draws, so the drawn slope length is the
   labelled s exactly. Labels: base underneath, walls at the right,
   slopes outside the roof lines. */
function pk7house(a, h, s) {
  var r = Math.round(Math.sqrt(s * s - a * a)), W = 2 * a, H = h + r;
  var sc = Math.min(230 / W, 118 / H), x0 = (320 - W * sc) / 2, yB = (185 + H * sc) / 2 - 8;
  function X(x) { return x0 + x * sc; }
  function Y(y) { return yB - y * sc; }
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pentagon shaped like a house">';
  out += '<polygon points="' + fmt(X(0), 1) + ',' + fmt(Y(0), 1) + ' ' + fmt(X(W), 1) + ',' + fmt(Y(0), 1) + ' ' + fmt(X(W), 1) + ',' + fmt(Y(h), 1) + ' ' + fmt(X(a), 1) + ',' + fmt(Y(H), 1) + ' ' + fmt(X(0), 1) + ',' + fmt(Y(h), 1) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(X(a), Y(0) + 18, W + " cm", 12.5, false);
  out += _txt(X(W) + 8, Y(h / 2) + 4, h + " cm", 12, false, "start");
  out += _txt(X(a) - a * sc / 2 - 5, Y(h + r / 2) - 2, s + " cm", 12, false, "end");
  out += _txt(X(a) + a * sc / 2 + 5, Y(h + r / 2) - 2, s + " cm", 12, false, "start");
  return out + '</svg>';
}

/* L-shaped rectilinear hexagon drawn to scale: outer W by H with
   the top-right notch cut to (w2, h1). Side labels sit outside the
   boundary, or inside the notch void for the two inner sides.
   labels is [bottom, right, notch, inner, top, left]. */
function pk7Lshape(W, H, w2, h1, labels) {
  var sc = Math.min(230 / W, 118 / H), x0 = (320 - W * sc) / 2, yB = (185 + H * sc) / 2 - 8;
  function X(x) { return x0 + x * sc; }
  function Y(y) { return yB - y * sc; }
  var pts = [[0, 0], [W, 0], [W, h1], [w2, h1], [w2, H], [0, H]];
  var out = '<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shaped polygon">';
  out += '<polygon points="' + pts.map(function (p) { return fmt(X(p[0]), 1) + ',' + fmt(Y(p[1]), 1); }).join(" ") + '" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += _txt(X(W / 2), Y(0) + 18, labels[0], 12, false);
  out += _txt(X(W) + 7, Y(h1 / 2) + 4, labels[1], 12, false, "start");
  out += _txt(X((w2 + W) / 2), Y(h1) - 7, labels[2], 12.5, labels[2] === "?");
  out += _txt(X(w2) + 7, Y((h1 + H) / 2) + 4, labels[3], 12, false, "start");
  out += _txt(X(w2 / 2), Y(H) - 7, labels[4], 12, false);
  out += _txt(X(0) - 7, Y(H / 2) + 4, labels[5], 12, false, "end");
  return out + '</svg>';
}

/* Ruler drawn to the measurement itself: 2 px per millimetre,
   ticks at every millimetre (longer at 5 mm and at each
   centimetre, centimetres numbered below), and the measured
   object as a bar starting at the 0 mark and ending exactly on
   the tick for lenMM. maxCm is the last numbered centimetre. */
function pk7ruler(lenMM, maxCm) {
  var pxmm = 2, x0 = 24, W = x0 + maxCm * 10 * pxmm + 16, H = 104;
  function X(mm) { return x0 + mm * pxmm; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with an object measured from the zero mark">';
  out += '<rect x="' + fmt(X(0), 1) + '" y="14" width="' + fmt(lenMM * pxmm, 1) + '" height="17" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<rect x="' + x0 + '" y="42" width="' + (maxCm * 10 * pxmm) + '" height="34" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var mm = 0; mm <= maxCm * 10; mm++) {
    var tl = mm % 10 === 0 ? 13 : (mm % 5 === 0 ? 9 : 5.5);
    out += '<line x1="' + fmt(X(mm), 1) + '" y1="42" x2="' + fmt(X(mm), 1) + '" y2="' + (42 + tl) + '" stroke="' + FIG_INK + '" stroke-width="' + (mm % 10 === 0 ? 1.5 : 1) + '"/>';
    if (mm % 10 === 0) out += _txt(X(mm), 93, String(mm / 10), 11.5, false);
  }
  return out + '</svg>';
}

/* Two objects on one ruler, for the difference entry: both bars
   start at the 0 mark, names sit in the left margin. */
function pk7ruler2(aMM, bMM, maxCm, nameA, nameB) {
  var pxmm = 2, x0 = 74, W = x0 + maxCm * 10 * pxmm + 16, H = 118;
  function X(mm) { return x0 + mm * pxmm; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ruler with two objects measured from the zero mark">';
  out += _txt(x0 - 6, 24, nameA, 11, false, "end");
  out += '<rect x="' + x0 + '" y="14" width="' + fmt(aMM * pxmm, 1) + '" height="15" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += _txt(x0 - 6, 47, nameB, 11, false, "end");
  out += '<rect x="' + x0 + '" y="37" width="' + fmt(bMM * pxmm, 1) + '" height="15" fill="' + FIG_ALT + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<rect x="' + x0 + '" y="60" width="' + (maxCm * 10 * pxmm) + '" height="32" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var mm = 0; mm <= maxCm * 10; mm++) {
    var tl = mm % 10 === 0 ? 12 : (mm % 5 === 0 ? 8.5 : 5);
    out += '<line x1="' + fmt(X(mm), 1) + '" y1="60" x2="' + fmt(X(mm), 1) + '" y2="' + (60 + tl) + '" stroke="' + FIG_INK + '" stroke-width="' + (mm % 10 === 0 ? 1.5 : 1) + '"/>';
    if (mm % 10 === 0) out += _txt(X(mm), 107, String(mm / 10), 11.5, false);
  }
  return out + '</svg>';
}

/* One circle with a single part shown in green: the radius (a
   segment from the centre to the circle), the diameter (a segment
   through the centre touching the circle at both ends), the
   centre (the point in the middle) or the circumference (the
   circle itself, drawn heavier). Vocabulary only: no lengths are
   labelled and no relationship is asked about. */
function pk7circlePart(cx, cy, r, mode) {
  var out = '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="' + (mode === "circumference" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "circumference" ? 4 : 2) + '"/>';
  if (mode === "radius") out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
  if (mode === "diameter") {
    out += '<line x1="' + (cx - r) + '" y1="' + cy + '" x2="' + (cx + r) + '" y2="' + cy + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
    out += '<circle cx="' + (cx - r) + '" cy="' + cy + '" r="2.6" fill="' + FIG_INK + '"/><circle cx="' + (cx + r) + '" cy="' + cy + '" r="2.6" fill="' + FIG_INK + '"/>';
  }
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="' + (mode === "centre" ? 5.5 : 3) + '" fill="' + (mode === "centre" ? FIG_ACC : FIG_INK) + '"/>';
  return out;
}
function pk7circleFig(mode) {
  return '<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle with one part shown in green">'
    + pk7circlePart(110, 95, 72, mode) + '</svg>';
}
function pk7circlePickFig(modes) {
  var out = '<svg viewBox="0 0 250 240" width="250" height="240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four circles, each with a different part shown in green">';
  var letters = ["A", "B", "C", "D"];
  for (var i = 0; i < 4; i++) {
    var cx = 62 + (i % 2) * 126, cy = 56 + Math.floor(i / 2) * 118;
    out += pk7circlePart(cx, cy, 36, modes[i]);
    out += _txt(cx, cy + 56, letters[i], 13, true);
  }
  return out + '</svg>';
}

/* ================= Area of a rectangle (rectangle-area) =================
   Grounding: MA6.9.6 (generalize a rule for the area of
   rectangles), MA6.9.7 (solve a problem involving the area of
   rectangles), MA6.9.5 beneath (how the area of a rectangle is
   determined); MA4.9.9, MA4.9.10 beneath those. Squaring appears
   inside the square entries as a product of two equal factors
   (placement table row 25). Supports host indicators 9.1 to 9.6
   and 9.9. */

E("u4-pk-rect-area", 4, ["9.1"], 1, "gen", function () {
  var l = ri(4, 12), w = ri(3, 9);
  if (l === w) w = w + 1;
  var ans = l * w, per = 2 * (l + w);
  var ds = pk7fill(ans, pk7uniq(ans, [per, l + w, l * (w + 1)])).slice(0, 3);
  var q = mcq("What is the area of the rectangle?",
    { t: ans + " cm²", fb: "Yes: area is length times width, \\(" + l + " \\times " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm²", fb: d === per ? "That is the perimeter: the distance around the rectangle. Area counts the square units inside it." : (d === l + w ? "That adds the length and the width. Area multiplies them." : "Multiply the length by the width: \\(" + l + " \\times " + w + "\\).") };
    }),
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + l + " \\times " + w + " \\\\ &= " + ans + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + ans + " cm²</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " cm", w + " cm", true);
  return q;
}, ["Area is the number of square units that cover the rectangle.", "Multiply the length by the width."]);

E("u4-pk-rect-area-context", 4, ["9.1"], 1, "gen", function () {
  var ctxs = [
    { thing: "rectangular garden bed", unit: "m", prep: "is" },
    { thing: "rectangular rug", unit: "m", prep: "is" },
    { thing: "rectangular poster", unit: "cm", prep: "is" },
    { thing: "rectangular page of a book", unit: "cm", prep: "is" }
  ];
  var c = pick(ctxs), l = ri(5, 15), w = ri(2, 9);
  if (l === w) l = l + 2;
  var ans = l * w, per = 2 * (l + w), u2 = c.unit + "²";
  var ds = pk7fill(ans, pk7uniq(ans, [per, l + w, ans + w])).slice(0, 3);
  var q = mcq("A " + c.thing + " " + c.prep + " " + l + " " + c.unit + " long and " + w + " " + c.unit + " wide. What is its area?",
    { t: ans + " " + u2, fb: "Yes: area is length times width, \\(" + l + " \\times " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " " + u2, fb: d === per ? "That is the perimeter: the distance around the shape. Area counts the square units inside it." : (d === l + w ? "That adds the length and the width. Area multiplies them." : "Multiply the length by the width: \\(" + l + " \\times " + w + "\\).") };
    }),
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + l + " \\times " + w + " \\\\ &= " + ans + " \\text{ " + c.unit + "}^2 \\end{aligned} \\] The answer is <b>" + ans + " " + u2 + "</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " " + c.unit, w + " " + c.unit, true);
  return q;
}, ["The area of a rectangle comes from its length and width.", "Multiply the length by the width."]);

E("u4-pk-rect-square", 4, ["9.1"], 1, "gen", function () {
  var s = pick([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  var ans = s * s;
  var ds = pk7fill(ans, pk7uniq(ans, [s * (s + 1), 4 * s, 2 * s, s * (s - 1)])).slice(0, 3);
  var q = mcq("A square has sides of " + s + " cm. What is its area?",
    { t: ans + " cm²", fb: "Yes: a square is a rectangle with equal sides, so its area is \\(" + s + " \\times " + s + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm²", fb: d === 4 * s ? "That is the perimeter of the square: the distance around it. Area multiplies the side by itself." : "Area is side times side: \\(" + s + " \\times " + s + "\\). A square is a rectangle whose length and width are equal." };
    }),
    "\\[ \\begin{aligned} A &= s \\times s \\\\ &= " + s + " \\times " + s + " \\\\ &= " + ans + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + ans + " cm²</b>.",
    { s: s });
  q.figure = pk7rect(s, s, s + " cm", s + " cm", true);
  return q;
}, ["A square is a rectangle with all sides equal.", "Multiply the side length by itself."]);

E("u4-pk-rect-missing-side", 4, ["9.1"], 2, "gen", function () {
  var w = ri(3, 9), l = ri(4, 12), area = l * w;
  var ds = pk7fill(l, pk7uniq(l, [area - w, l - 1, l + 2])).slice(0, 3);
  var q = mcq("A rectangle has an area of " + area + " cm². One side is " + w + " cm long. What is the length of the other side?",
    { t: l + " cm", fb: "Yes: the other side is the area divided by the known side, \\(" + area + " \\div " + w + " = " + l + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === area - w ? "That subtracts the side from the area. Area is a product, so undo it with division." : "The area is the known side times the missing side, so divide the area by the known side." };
    }),
    "\\[ \\begin{aligned} \\text{other side} &= A \\div w \\\\ &= " + area + " \\div " + w + " \\\\ &= " + l + " \\text{ cm} \\end{aligned} \\] Check: \\(" + l + " \\times " + w + " = " + area + "\\). The answer is <b>" + l + " cm</b>.",
    { l: l, w: w, area: area });
  q.figure = pk7rect(l, w, "?", w + " cm", true);
  return q;
}, ["Area is length times width, so one side comes from the area and the other side.", "Divide the area by the side you know."]);

E("u4-pk-rect-decimals", 4, ["9.1"], 2, "gen", function () {
  var l10 = pick([25, 35, 45, 55, 65, 75, 85, 95, 28, 48, 68, 88]), w = ri(2, 6);
  var l = l10 / 10, ans = l * w;
  var cand = [(l10 - 5) * w / 10, (l10 + 5) * w / 10, l + w];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === l + w ? "That adds the length and the width. Area multiplies them." : "Keep the length as drawn: area is \\(" + fmt(l) + " \\times " + w + "\\)." };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("What is the area, in square centimetres, of the rectangle?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(l) + " \\times " + w + " = " + fmt(ans) + "\\)." },
    ds,
    "\\[ \\begin{aligned} A &= l \\times w \\\\ &= " + fmt(l) + " \\times " + w + " \\\\ &= " + fmt(ans) + " \\text{ cm}^2 \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm²</b>.",
    { l10: l10, w: w });
  q.figure = pk7rect(l, w, fmt(l) + " cm", w + " cm", true);
  return q;
}, ["Area is length times width, with decimals just as with whole numbers.", "Multiply the two side lengths."]);

E("u4-pk-rect-square-decimal", 4, ["9.1"], 2, "gen", function () {
  var s10 = pick([5, 12, 15, 24, 25, 35, 45, 55]), s = s10 / 10, ans = s * s;
  var cand = [4 * s, 2 * s, ans * 10];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === 4 * s ? "That is the perimeter of the square. Area multiplies the side by itself." : (v === 2 * s ? "That doubles the side. Area is side times side." : "That answer is ten times too large: check the decimal point when you multiply.") };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("A square tile has sides of " + fmt(s) + " m. What is the area of the tile, in square metres?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + "\\)." },
    ds,
    "\\[ \\begin{aligned} A &= s \\times s \\\\ &= " + fmt(s) + " \\times " + fmt(s) + " \\\\ &= " + fmt(ans) + " \\text{ m}^2 \\end{aligned} \\] The answer is <b>" + fmt(ans) + " m²</b>.",
    { s10: s10 });
  q.figure = pk7rect(s, s, fmt(s) + " m", fmt(s) + " m", true);
  return q;
}, ["A square is a rectangle with all sides equal.", "Multiply the side length by itself, and place the decimal point by estimating."]);

/* ================= Perimeter (perimeter) =================
   Grounding: MA6.9.3 (how the perimeter of any polygon can be
   determined: add the side lengths), MA6.9.4 (generalize a rule
   for the perimeter of polygons, including rectangles and
   squares), MA6.9.7 (solve a problem involving the perimeter of
   polygons). Supports host indicators 9.1 to 9.6 and 9.9. */

E("u4-pk-perim-rect", 4, ["9.1"], 1, "gen", function () {
  var l = ri(5, 14), w = ri(3, 9);
  if (l === w) l = l + 1;
  var ans = 2 * (l + w);
  var ds = pk7fill(ans, pk7uniq(ans, [l * w, l + w, 2 * l + w])).slice(0, 3);
  var q = mcq("What is the perimeter of the rectangle?",
    { t: ans + " cm", fb: "Yes: add the sides all the way around: \\(" + l + " + " + w + " + " + l + " + " + w + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === l * w ? "That multiplies the sides, which gives the area. Perimeter adds the sides." : (d === l + w ? "That adds one length and one width, which is only halfway around." : "Go all the way around: two lengths and two widths.") };
    }),
    "\\[ \\begin{aligned} P &= l + w + l + w \\\\ &= " + l + " + " + w + " + " + l + " + " + w + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { l: l, w: w });
  q.figure = pk7rect(l, w, l + " cm", w + " cm", false);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add every side length, counting each side once."]);

E("u4-pk-perim-square", 4, ["9.1"], 1, "gen", function () {
  var s = pick([3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  var ans = 4 * s;
  var ds = pk7uniq(ans, [s * s, 2 * s, 4 * (s + 1)]).slice(0, 3);
  var q = mcq("What is the perimeter of the square?",
    { t: ans + " cm", fb: "Yes: a square has four equal sides, so the perimeter is \\(4 \\times " + s + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === s * s ? "That multiplies the side by itself, which gives the area. Perimeter adds the four sides." : "Add the side length four times, once for each side of the square." };
    }),
    "\\[ \\begin{aligned} P &= 4 \\times s \\\\ &= 4 \\times " + s + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { s: s });
  q.figure = pk7rect(s, s, s + " cm", s + " cm", false);
  return q;
}, ["All four sides of a square are the same length.", "Add the side length four times."]);

E("u4-pk-perim-pentagon", 4, ["9.1"], 2, "gen", function () {
  var pair = pick([[3, 5], [4, 5], [5, 13], [6, 10], [8, 10], [12, 13]]);
  var a = pair[0], s = pair[1], h = ri(3, 8), W = 2 * a;
  var ans = W + 2 * h + 2 * s;
  var ds = pk7fill(ans, pk7uniq(ans, [ans - s, ans - 2 * h, W * h])).slice(0, 3);
  var q = mcq("What is the perimeter of the shape?",
    { t: ans + " cm", fb: "Yes: add all five sides: \\(" + W + " + " + h + " + " + s + " + " + s + " + " + h + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === W * h ? "That multiplies the base by the wall height. Perimeter adds the side lengths." : "Count every side once: the base, the two walls and the two roof sides." };
    }),
    "\\[ \\begin{aligned} P &= " + W + " + " + h + " + " + s + " + " + s + " + " + h + " \\\\ &= " + ans + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + ans + " cm</b>.",
    { a: a, s: s, h: h });
  q.figure = pk7house(a, h, s);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add every side length, counting each side once."]);

E("u4-pk-perim-missing-side", 4, ["9.1"], 2, "gen", function () {
  var l = ri(5, 12), w = ri(3, 9);
  if (l === w) l = l + 1;
  var per = 2 * (l + w);
  var ds = pk7uniq(l, [per / 2, 2 * l, l + 2]).slice(0, 3);
  var q = mcq("A rectangle has a perimeter of " + per + " cm. One side is " + w + " cm long. What is the length of the side next to it?",
    { t: l + " cm", fb: "Yes: half the perimeter is \\(" + per + " \\div 2 = " + (per / 2) + "\\), and \\(" + (per / 2) + " - " + w + " = " + l + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === per / 2 ? "That is half the perimeter, which is one length plus one width together. Subtract the known side as well." : (d === 2 * l ? "That takes the two known sides off the perimeter but does not split what is left between the two equal sides." : "Work backwards: halve the perimeter, then subtract the known side.") };
    }),
    "\\[ \\begin{aligned} \\text{side} &= P \\div 2 - w \\\\ &= " + per + " \\div 2 - " + w + " \\\\ &= " + l + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + l + " cm</b>.",
    { l: l, w: w, per: per });
  q.figure = pk7rect(l, w, "?", w + " cm", false);
  return q;
}, ["A rectangle's perimeter is two lengths and two widths.", "Halve the perimeter to get one length plus one width, then subtract."]);

E("u4-pk-perim-missing-polygon", 4, ["9.1"], 2, "gen", function () {
  var W = ri(9, 14), H = ri(6, 9), w2 = ri(3, W - 5), h1 = ri(2, H - 3);
  var notch = W - w2, inner = H - h1, per = 2 * (W + H);
  var known = W + h1 + inner + w2 + H;
  var ds = pk7fill(notch, pk7uniq(notch, [w2, inner, notch + 2])).slice(0, 3);
  var q = mcq("The perimeter of the shape is " + per + " cm. What is the length of the side marked ?",
    { t: notch + " cm", fb: "Yes: the labelled sides add to " + known + ", and \\(" + per + " - " + known + " = " + notch + "\\)." },
    ds.map(function (d) {
      return { t: d + " cm", fb: d === w2 ? "That is the length of the top side. The missing side is what the perimeter leaves after the labelled sides are added." : "Add the labelled sides, then subtract their total from the perimeter." };
    }),
    "\\[ \\begin{aligned} \\text{labelled sides} &= " + W + " + " + h1 + " + " + inner + " + " + w2 + " + " + H + " = " + known + " \\\\ \\text{missing side} &= " + per + " - " + known + " \\\\ &= " + notch + " \\text{ cm} \\end{aligned} \\] The answer is <b>" + notch + " cm</b>.",
    { W: W, H: H, w2: w2, h1: h1 });
  q.figure = pk7Lshape(W, H, w2, h1, [W + " cm", h1 + " cm", "?", inner + " cm", w2 + " cm", H + " cm"]);
  return q;
}, ["The perimeter is the total of all the side lengths.", "Add the sides you know, then subtract from the perimeter."]);

/* ================= Reading a ruler (ruler-measurement) =================
   Grounding: MA5.9.1 (how an object is measured using a ruler: it
   is placed at the 0 mark, and a centimetre is 10 millimetres),
   MA5.9.3 (real-world uses of millimetre and centimetre measures),
   with MA5.9.7 to MA5.9.9 beneath (measuring attributes with
   appropriate tools and units). Every figure is drawn from the
   drawn length itself: the object starts at the 0 mark and ends
   exactly on the tick for its stated length. Supports host
   indicators 9.7, 9.8, 9.10, 9.11, 9.12. */

E("u4-pk-ruler-cm", 4, ["9.7"], 1, "gen", function () {
  var cm = ri(3, 12), maxCm = cm + ri(1, 2);
  var ds = pk7uniq(cm, [cm - 1, cm + 1, cm + 2]).slice(0, 3);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar?",
    { t: cm + " cm", fb: "Yes: the bar ends at the " + cm + " mark, so it is " + cm + " cm long." },
    ds.map(function (d) {
      return { t: d + " cm", fb: "Follow the bar to the mark where it ends, then read that number." };
    }),
    "The bar starts at the 0 mark and ends at the " + cm + " mark on the ruler. The answer is <b>" + cm + " cm</b>.",
    { cm: cm });
  q.figure = pk7ruler(cm * 10, maxCm);
  return q;
}, ["Line the object up with the 0 mark before you read anything.", "Read the number where the object ends."]);

E("u4-pk-ruler-mm", 4, ["9.7"], 1, "gen", function () {
  var lo = ri(2, 9), extra = pick([3, 4, 6, 7, 8]);
  var mm = lo * 10 + extra, maxCm = lo + 2;
  var ds = pk7uniq(mm, [lo * 10, (lo + 1) * 10, mm + 10]).slice(0, 3);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar, in millimetres?",
    { t: mm + " mm", fb: "Yes: the bar ends " + extra + " small ticks past the " + lo + " mark, and each small tick is 1 mm, so the length is " + mm + " mm." },
    ds.map(function (d) {
      return { t: d + " mm", fb: d === lo * 10 ? "That stops at the " + lo + " mark, but the bar runs past it. Count the small ticks beyond the mark as well." : "Count every small tick from 0: each one is 1 millimetre." };
    }),
    "The bar ends " + extra + " small ticks past the " + lo + " mark. Each centimetre is 10 millimetres, so the length is \\(" + lo + " \\times 10 + " + extra + " = " + mm + "\\) mm. The answer is <b>" + mm + " mm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["Each small tick on the ruler is 1 millimetre.", "10 millimetres make 1 centimetre."]);

E("u4-pk-ruler-cm-decimal", 4, ["9.7"], 2, "gen", function () {
  var lo = ri(2, 9), extra = pick([2, 3, 4, 6, 7, 8, 9]);
  var mm = lo * 10 + extra, maxCm = lo + 2, ans = mm / 10;
  var cand = [lo, lo + 1, ans + 1];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === lo ? "That stops at the " + lo + " mark, but the bar runs past it. The small ticks past the mark are tenths of a centimetre." : "Read the centimetre mark first, then count the small ticks as tenths." };
  });
  ds = precPair(fmt(ans), ds);
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar, in centimetres?",
    { t: fmt(ans), fb: "Yes: the bar ends at " + mm + " mm, and " + mm + " mm is " + fmt(ans) + " cm." },
    ds,
    "The bar ends " + extra + " small ticks past the " + lo + " mark, at " + mm + " mm. Since 10 mm = 1 cm, the length is \\(" + mm + " \\div 10 = " + fmt(ans) + "\\) cm. The answer is <b>" + fmt(ans) + " cm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["10 millimetres make 1 centimetre.", "Each small tick past a centimetre mark is one tenth of a centimetre."]);

E("u4-pk-ruler-half", 4, ["9.7"], 1, "gen", function () {
  var lo = ri(3, 10), mm = lo * 10 + 5, maxCm = lo + 2, ans = lo + 0.5;
  var cand = [lo, lo + 1, lo + 1.5];
  var ds = cand.map(function (v) {
    return { t: fmt(v) + " cm", fb: v === lo + 1.5 ? "That reads past the end of the bar. The bar stops halfway between two centimetre marks." : "The bar ends halfway between the " + lo + " mark and the " + (lo + 1) + " mark." };
  });
  var q = mcq("The green bar starts at the 0 mark of the ruler. How long is the bar?",
    { t: fmt(ans) + " cm", fb: "Yes: the bar ends at the long middle tick between " + lo + " and " + (lo + 1) + ", which is " + fmt(ans) + " cm." },
    ds,
    "The bar ends at the long tick halfway between the " + lo + " mark and the " + (lo + 1) + " mark. Halfway between " + lo + " cm and " + (lo + 1) + " cm is " + fmt(ans) + " cm. The answer is <b>" + fmt(ans) + " cm</b>.",
    { mm: mm });
  q.figure = pk7ruler(mm, maxCm);
  return q;
}, ["The longer tick between two centimetre marks is the halfway mark.", "Halfway between two whole numbers is a half."]);

E("u4-pk-ruler-unit-choice", 4, ["9.7"], 1, "gen", function () {
  var objs = [
    { thing: "the thickness of a credit card", len: "about 1 mm", wrong: ["about 1 cm", "about 10 cm", "about 1 m"] },
    { thing: "the width of a fingernail", len: "about 1 cm", wrong: ["about 1 mm", "about 10 mm", "about 1 m"] },
    { thing: "the length of a paper clip", len: "about 3 cm", wrong: ["about 3 mm", "about 30 cm", "about 3 m"] },
    { thing: "the length of an ant", len: "about 5 mm", wrong: ["about 5 cm", "about 50 cm", "about 5 m"] },
    { thing: "the thickness of a coin", len: "about 2 mm", wrong: ["about 2 cm", "about 20 cm", "about 2 m"] }
  ];
  var o = pick(objs);
  return mcq("Which measure best fits " + o.thing + "?",
    { t: o.len, fb: "Yes: " + o.thing + " is best measured in " + (o.len.indexOf("mm") >= 0 ? "millimetres" : "centimetres") + ", and " + o.len + " is the right size." },
    o.wrong.map(function (t) {
      return { t: t, fb: "Picture the object: " + o.thing + " is far smaller than that, or far larger. Millimetres suit very small lengths, centimetres suit small ones." };
    }),
    "The thickness of a credit card and the width of a fingernail are the classic small measures: a credit card is about 1 mm thick and a fingernail about 1 cm wide. For this object, the best fit is <b>" + o.len + "</b>.",
    { thing: o.thing });
}, ["Millimetres are for very small lengths, like the thickness of a card.", "Centimetres are for small lengths, like the width of a fingernail."]);

E("u4-pk-ruler-difference", 4, ["9.7"], 2, "gen", function () {
  var a = ri(6, 11), b = ri(2, a - 2), maxCm = a + 2;
  var diff = a - b;
  var cand = [diff + 1, diff - 1, a];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === a ? "That is the length of the longer object by itself. The question asks how much longer it is than the shorter one." : "Read both lengths from the ruler, then subtract the shorter from the longer." };
  });
  ds = precPair(fmt(diff), ds);
  var q = mcq("Two objects are measured on the ruler. How many centimetres longer is the green object than the orange object?",
    { t: fmt(diff), fb: "Yes: the green object is " + a + " cm and the orange object is " + b + " cm, and \\(" + a + " - " + b + " = " + diff + "\\)." },
    ds,
    "The green object ends at the " + a + " mark, so it is " + a + " cm long. The orange object ends at the " + b + " mark, so it is " + b + " cm long. \\(" + a + " - " + b + " = " + diff + "\\), so the green object is <b>" + fmt(diff) + " cm</b> longer.",
    { a: a, b: b });
  q.figure = pk7ruler2(a * 10, b * 10, maxCm, "Green", "Orange");
  return q;
}, ["Read each object's length from the ruler first.", "How much longer means subtract the shorter length from the longer one."]);

/* ================= Circle parts and measures (circle-measure) =================
   Placement table row 22: vocabulary only. The parts are named
   and recognized; the relationships among them (radius and
   diameter) are new content taught inside Mathematics 7 itself,
   so no relationship is assessed here. Placement unevidenced: no
   elementary guide outcome names the parts of a circle, so these
   four are authored to the naming itself. Supports host
   indicators 9.7, 9.8, 9.11, 9.12. Note for the build report:
   "circumference" is inherently the longest of the four option
   words; that is a property of the vocabulary construct itself,
   not option padding, and the key rotates across all four words
   so no single word is favoured. */

E("u4-pk-circle-radius", 4, ["9.7"], 1, "gen", function () {
  var q = mcq("What is the name of the part of the circle shown in green?",
    { t: "radius", fb: "Yes: the segment runs from the centre to the circle itself, which is a radius." },
    [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part is a segment, not a point." },
     { t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a straight segment." },
     { t: "diameter", fb: "A diameter runs all the way across the circle through the centre. The green segment stops at the centre." }],
    "The green segment starts at the centre and ends on the circle. A segment from the centre to the circle is a <b>radius</b>.",
    { mode: "radius" });
  q.figure = pk7circleFig("radius");
  return q;
}, ["Look at where the green part starts and ends.", "A radius joins the centre to the circle."]);

E("u4-pk-circle-diameter", 4, ["9.7"], 1, "gen", function () {
  var q = mcq("What is the name of the part of the circle shown in green?",
    { t: "diameter", fb: "Yes: the segment runs straight across the circle through the centre, which is a diameter." },
    [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part is a segment, not a point." },
     { t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a straight segment." },
     { t: "radius", fb: "A radius runs from the centre to the circle and stops there. The green segment keeps going across the whole circle." }],
    "The green segment touches the circle at both ends and passes through the centre. A segment across the whole circle through the centre is a <b>diameter</b>.",
    { mode: "diameter" });
  q.figure = pk7circleFig("diameter");
  return q;
}, ["Look at where the green part starts and ends.", "A diameter crosses the whole circle through the centre."]);

E("u4-pk-circle-centre", 4, ["9.7"], 1, "gen", function () {
  var mode = pick(["centre", "circumference"]);
  var key, sol;
  var ds;
  if (mode === "centre") {
    key = { t: "centre", fb: "Yes: the green part is the point in the middle of the circle, which is its centre." };
    ds = [{ t: "circumference", fb: "The circumference is the distance around the outside of the circle. The green part is a point in the middle." },
          { t: "diameter", fb: "A diameter is a segment across the whole circle. The green part is a point, not a segment." },
          { t: "radius", fb: "A radius is a segment from the centre to the circle. The green part is the point itself." }];
    sol = "The green part is the point in the very middle of the circle. That point is the <b>centre</b>.";
  } else {
    key = { t: "circumference", fb: "Yes: the green part is the circle itself, the distance all the way around it, which is its circumference." };
    ds = [{ t: "centre", fb: "The centre is the point in the middle of the circle. The green part goes around the outside." },
          { t: "diameter", fb: "A diameter is a straight segment across the circle. The green part follows the circle itself." },
          { t: "radius", fb: "A radius is a straight segment from the centre to the circle. The green part follows the circle itself." }];
    sol = "The green part is the circle itself: the distance all the way around the outside. That distance is the <b>circumference</b>.";
  }
  var q = mcq("What is the name of the part of the circle shown in green?", key, ds, sol, { mode: mode });
  q.figure = pk7circleFig(mode);
  return q;
}, ["Look at what the green part is: a point, a segment, or the circle itself.", "The centre is the point in the middle; the circumference is the distance around the outside."]);

E("u4-pk-circle-pick", 4, ["9.7"], 1, "gen", function () {
  var parts = ["radius", "diameter", "circumference"];
  var target = pick(parts);
  var others = parts.filter(function (p) { return p !== target; });
  var modes = [target, others[0], others[1], pick(others)];
  for (var i = modes.length - 1; i > 0; i--) { var j = ri(0, i), tmp = modes[i]; modes[i] = modes[j]; modes[j] = tmp; }
  var idx = modes.indexOf(target), letter = "ABCD"[idx];
  var desc = target === "radius" ? "a segment from the centre to the circle" : (target === "diameter" ? "a segment across the whole circle through the centre" : "the circle itself, the distance around the outside");
  var q = mcq("Which diagram shows the " + target + " of a circle in green?",
    { t: "Diagram " + letter, fb: "Yes: diagram " + letter + " shows " + desc + "." },
    ["A", "B", "C", "D"].filter(function (L) { return L !== letter; }).map(function (L) {
      var m = modes["ABCD".indexOf(L)];
      return { t: "Diagram " + L, fb: "Diagram " + L + " shows " + (m === "radius" ? "a radius: a segment from the centre to the circle" : (m === "diameter" ? "a diameter: a segment across the whole circle" : "the circumference: the circle itself")) + ". The question asks for the " + target + "." };
    }),
    "A " + target + " is " + desc + ". Only diagram " + letter + " shows that part in green. The answer is <b>Diagram " + letter + "</b>.",
    { target: target, idx: idx });
  q.figure = pk7circlePickFig(modes);
  return q;
}, ["Name the green part in each diagram before you choose.", "A radius stops at the centre; a diameter crosses the whole circle."]);

/* ================= Multiplying decimals (decimal-multiplication) =================
   Grounding: MA6.6.2 (place the decimal point in a product by
   using estimation), MA6.6.5 (solve a problem involving the
   multiplication of decimals). Squaring is authored inside this
   group as a product of two equal factors (placement table row
   25): whole-number squares grounded in MA5.5.4 (products and
   facts), decimal squares in MA6.6.2. Options are bare numbers
   with the unit named in the stem, and precPair keeps no option
   alone at a decimal precision. Supports host indicators 9.10,
   9.6, 9.9. */

E("u4-pk-dec-mult-whole", 4, ["9.10"], 1, "gen", function () {
  var ctxs = [
    { thing: "bottle of water", holds: "holds", unit: "litres", of: "of water" },
    { thing: "piece of ribbon", holds: "is", unit: "metres", of: "long" }
  ];
  var c = pick(ctxs), d10 = pick([12, 15, 18, 25, 35, 45, 75]), n = ri(3, 6);
  var d = d10 / 10, ans = d * n;
  var cand = [ans / 10, d * (n + 1), Math.floor(d) * n];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === Math.floor(d) * n ? "That multiplies only the whole-number part of " + fmt(d) + " and drops the decimal part. The question asks for " + n + " lots of the full " + fmt(d) + "." : (v === d * (n + 1) ? "That counts one group too many: there are " + n + " of them, not " + (n + 1) + "." : "Estimate first: " + fmt(d) + " is between whole numbers, so " + n + " lots of it lands near " + fmt(Math.round(d) * n) + ", not at " + fmt(v) + ".") };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("One " + c.thing + " " + c.holds + " " + fmt(d) + " " + c.unit + " " + c.of + ". How many " + c.unit + " is that in " + n + " of them, in total?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(d) + " \\times " + n + " = " + fmt(ans) + "\\), and the estimate agrees." },
    ds,
    "Estimate first: " + fmt(d) + " is close to " + Math.round(d) + ", and \\(" + Math.round(d) + " \\times " + n + " = " + (Math.round(d) * n) + "\\), so the answer is near " + (Math.round(d) * n) + ". \\[ " + fmt(d) + " \\times " + n + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + " " + c.unit + "</b>.",
    { d10: d10, n: n });
}, ["Multiplying by a whole number means equal groups of the decimal.", "Estimate with the nearest whole number to place the decimal point."]);

E("u4-pk-dec-mult-near3", 4, ["9.10"], 2, "gen", function () {
  var d10 = pick([24, 35, 42, 55, 65]), m10 = pick([28, 29, 31, 32]);
  var d = d10 / 10, m = m10 / 10, ans = d * m;
  var cand = [ans / 10, ans * 10, d + m];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === d + m ? "That adds the two numbers. One length is " + fmt(m) + " times the other, which is a multiplication." : "Estimate first: " + fmt(d) + " times about 3 is about " + fmt(3 * d) + ", which places the decimal point." };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("A rope is " + fmt(d) + " m long. A second rope is " + fmt(m) + " times as long. How long is the second rope, in metres?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(d) + " \\times " + fmt(m) + " = " + fmt(ans) + "\\), matching the estimate of about " + fmt(3 * d) + "." },
    ds,
    "Estimate first: " + fmt(m) + " is close to 3, and \\(" + fmt(d) + " \\times 3 = " + fmt(3 * d) + "\\), so the answer is near " + fmt(3 * d) + ". \\[ " + fmt(d) + " \\times " + fmt(m) + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + " m</b>.",
    { d10: d10, m10: m10 });
}, ["Times as long means multiply.", "Estimate with a whole number first to place the decimal point."]);

E("u4-pk-dec-square-whole", 4, ["9.10"], 1, "gen", function () {
  var n = pick([6, 7, 8, 9, 11, 12, 13, 14, 15, 20]);
  var ans = n * n;
  var ds = pk7uniq(ans, [2 * n, n * (n + 1), ans + 10]).slice(0, 3);
  return mcq("What is " + n + " × " + n + "?",
    { t: String(ans), fb: "Yes: \\(" + n + " \\times " + n + " = " + ans + "\\)." },
    ds.map(function (d) {
      return { t: String(d), fb: d === 2 * n ? "That doubles " + n + ". Here " + n + " is multiplied by itself, not by 2." : "Multiply " + n + " by itself: \\(" + n + " \\times " + n + "\\)." };
    }),
    "\\[ " + n + " \\times " + n + " = " + ans + " \\] The answer is <b>" + ans + "</b>.",
    { n: n });
}, ["The two factors are the same number.", "Multiply the number by itself."]);

E("u4-pk-dec-square-decimal", 4, ["9.10"], 2, "gen", function () {
  var s10 = pick([5, 6, 12, 15, 24, 25, 35, 45, 55]), s = s10 / 10, ans = s * s;
  var cand = [2 * s, ans * 10, ans / 10];
  var ds = cand.map(function (v) {
    return { t: fmt(v), fb: v === 2 * s ? "That doubles " + fmt(s) + ". Here " + fmt(s) + " is multiplied by itself." : "Estimate first: " + fmt(s) + " is near " + Math.round(s) + ", so the product is near " + (Math.round(s) * Math.round(s)) + ", which places the decimal point." };
  });
  ds = precPair(fmt(ans), ds);
  return mcq("What is " + fmt(s) + " × " + fmt(s) + "?",
    { t: fmt(ans), fb: "Yes: \\(" + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + "\\)." },
    ds,
    "Estimate first: " + fmt(s) + " is close to " + Math.round(s) + ", and \\(" + Math.round(s) + " \\times " + Math.round(s) + " = " + (Math.round(s) * Math.round(s)) + "\\), so the answer is near " + (Math.round(s) * Math.round(s)) + ". \\[ " + fmt(s) + " \\times " + fmt(s) + " = " + fmt(ans) + " \\] The answer is <b>" + fmt(ans) + "</b>.",
    { s10: s10 });
}, ["The two factors are the same number.", "Estimate with the nearest whole number to place the decimal point."]);

/* Piece 2 metadata: grounding source, full Supports list and
   group for each of the 25 entries above. Applied separately from
   the Piece 1 table so the two pieces stay independently
   auditable. */
var PK7_FOR_AREA = ["9.1", "9.2", "9.3", "9.4", "9.5", "9.6", "9.9"];
var PK7_FOR_MEASURE = ["9.7", "9.8", "9.10", "9.11", "9.12"];
var PK7_FOR_DECMULT = ["9.10", "9.6", "9.9"];
var PKT7_P2 = {
  "u4-pk-rect-area": { src: "math-6:MA6.9.6", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-area-context": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-square": { src: "math-6:MA6.9.6", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-missing-side": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-decimals": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-rect-square-decimal": { src: "math-6:MA6.9.7", group: "rectangle-area", for: PK7_FOR_AREA },
  "u4-pk-perim-rect": { src: "math-6:MA6.9.4", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-square": { src: "math-6:MA6.9.4", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-pentagon": { src: "math-6:MA6.9.3", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-missing-side": { src: "math-6:MA6.9.7", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-perim-missing-polygon": { src: "math-6:MA6.9.7", group: "perimeter", for: PK7_FOR_AREA },
  "u4-pk-ruler-cm": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-mm": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-cm-decimal": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-half": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-unit-choice": { src: "math-5:MA5.9.3", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-ruler-difference": { src: "math-5:MA5.9.1", group: "ruler-measurement", for: PK7_FOR_MEASURE },
  "u4-pk-circle-radius": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-diameter": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-centre": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-circle-pick": { src: "authored:naming the parts of a circle, placement unevidenced", group: "circle-measure", for: PK7_FOR_MEASURE },
  "u4-pk-dec-mult-whole": { src: "math-6:MA6.6.5", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-mult-near3": { src: "math-6:MA6.6.2", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-square-whole": { src: "math-5:MA5.5.4", group: "decimal-multiplication", for: PK7_FOR_DECMULT },
  "u4-pk-dec-square-decimal": { src: "math-6:MA6.6.2", group: "decimal-multiplication", for: PK7_FOR_DECMULT }
};
BANK.forEach(function (e) { var t = PKT7_P2[e.id]; if (t) { e.pkFlag = true; e.pkSrc = t.src; e.pkFor = t.for.slice(); e.pkGroup = t.group; } });

/* ============================================================
   Band 3 Piece 3 (November 16, 2026): the remaining Mathematics 7
   clusters, per Math-7-PK-Band-3-Specification-2026-11-16.md
   Section 8. 95 entries are added to this file: 82 authored and
   13 shared copies, and 18 entries already in the bank are flagged
   as state A support sets (metadata only, from the PKT7_P3 table
   at the end of this section; their generators, tags and levels
   are untouched). Final position on completion: bank 374, flagged
   183, per-unit flagged pools U1 43, U2 14, U3 33, U4 32, U5 13,
   U6 10, U7 19, U8 19. Cluster by cluster in map order below,
   after the support-set record. Provenance is recorded three
   ways, in agreement: the comment block at the head of each group,
   the pkSrc property each entry gains from PKT7_P3, and the build
   report's source-to-host table. Each new entry's indicators
   array carries the first code of its group's Supports column;
   pkFor carries the full list. Shared copies are separate entries
   whose generator IS the source generator (the same named
   function), with their own host ID, unit and pkFor. Figure-
   bearing items draw the figure from the item's own values on
   every draw, and no figure hands over the key.
   ============================================================ */

/* Unreduced fraction display (the equivalent-fractions items show
   the scaled form, not the reduced one). */
function pk7eqf(n, d) { return "\\(\\frac{" + n + "}{" + d + "}\\)"; }

/* Venn diagram: two labelled overlapping circles inside a
   rectangle, with a count in each region. counts is
   [aOnly, both, bOnly, neither]; pass null counts for an empty
   diagram (the placement items). */
function pk7venn(labA, labB, counts) {
  var out = '<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram">';
  out += '<rect x="6" y="6" width="288" height="178" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<circle cx="118" cy="92" r="57" fill="' + FIG_SHADE + '" fill-opacity="0.45" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  out += '<circle cx="182" cy="92" r="57" fill="' + FIG_SHADE + '" fill-opacity="0.45" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  out += _txt(84, 24, labA, 12, true);
  out += _txt(216, 24, labB, 12, true);
  if (counts) {
    out += _txt(93, 92, String(counts[0]), 15, true);
    out += _txt(150, 92, String(counts[1]), 15, true);
    out += _txt(207, 92, String(counts[2]), 15, true);
    out += _txt(276, 168, String(counts[3]), 13, true);
  }
  return out + '</svg>';
}

/* Carroll diagram: a 2 by 2 cross-classification table with row
   and column headers and a count in each cell. cells is
   [[tl, tr], [bl, br]] matching [rows][cols]. */
function pk7carroll(colA, colB, rowA, rowB, cells) {
  var x0 = 86, y0 = 40, cw = 100, ch = 52, W = 300, H = 168;
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Carroll diagram">';
  out += _txt(x0 + cw / 2, 22, colA, 11.5, true);
  out += _txt(x0 + 3 * cw / 2, 22, colB, 11.5, true);
  out += _txt(x0 - 6, y0 + ch / 2, rowA, 11.5, true, "end");
  out += _txt(x0 - 6, y0 + 3 * ch / 2, rowB, 11.5, true, "end");
  for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
    out += '<rect x="' + (x0 + c * cw) + '" y="' + (y0 + r * ch) + '" width="' + cw + '" height="' + ch + '" fill="' + (r + c === 1 ? FIG_SHADE : "#ffffff") + '" fill-opacity="' + (r + c === 1 ? "0.5" : "1") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += _txt(x0 + c * cw + cw / 2, y0 + r * ch + ch / 2, String(cells[r][c]), 15, true);
  }
  return out + '</svg>';
}

/* First-quadrant grid: numbered axes from the origin, lettered
   points drawn at their own coordinates. pts is a list of
   {x, y, label}. */
function pk7quad(pts, xMax, yMax) {
  var W = 252, H = 214, ox = 36, oy = 178, sx = (W - ox - 14) / xMax, sy = (oy - 24) / yMax;
  var s = '<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="First quadrant grid">';
  for (var gy = 0; gy <= yMax; gy++) { var Y = oy - gy * sy; s += '<line x1="' + ox + '" y1="' + fmt(Y, 1) + '" x2="' + (W - 10) + '" y2="' + fmt(Y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; s += '<text x="' + (ox - 5) + '" y="' + fmt(Y + 3, 1) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="end">' + gy + '</text>'; }
  for (var gx = 0; gx <= xMax; gx++) { var X = ox + gx * sx; s += '<line x1="' + fmt(X, 1) + '" y1="18" x2="' + fmt(X, 1) + '" y2="' + oy + '" stroke="#cfe4d6" stroke-width="1"/>'; s += '<text x="' + fmt(X, 1) + '" y="' + (oy + 13) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="middle">' + gx + '</text>'; }
  s += '<line x1="' + ox + '" y1="18" x2="' + ox + '" y2="' + oy + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  s += '<line x1="' + ox + '" y1="' + oy + '" x2="' + (W - 10) + '" y2="' + oy + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  pts.forEach(function (p) { s += '<circle cx="' + fmt(ox + p.x * sx, 1) + '" cy="' + fmt(oy - p.y * sy, 1) + '" r="4" fill="' + FIG_ACC + '"/>'; s += _txt(ox + p.x * sx + 11, oy - p.y * sy - 9, p.label, 13, true); });
  return s + '</svg>';
}

/* Bar graph for reading: the axis carries the scale (ticks every
   step, labelled); the bars carry NO value labels, so the value
   is read from the height against the scale. */
/* Vertical axis title, rotated so a long title ("Height (cm)")
   stays inside the viewBox and clear of the scale numbers; the
   shell's _txt places it horizontally, which clips at the edge. */
function pk7axisTitle(unit, cy) {
  return '<text x="13" y="' + fmt(cy, 1) + '" font-size="11" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="middle" dominant-baseline="central" transform="rotate(-90 13 ' + fmt(cy, 1) + ')">' + unit + '</text>';
}

function pk7barRead(labels, vals, step, unit) {
  var maxV = Math.max.apply(null, vals), topTick = Math.ceil(maxV / step) * step;
  var W = 330, H = 215, base = 175, top = 25, bw = 36, gap = (W - 60 - labels.length * bw) / (labels.length + 1);
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar graph">';
  for (var v = 0; v <= topTick; v += step) { var y = base - (base - top) * v / topTick; out += '<line x1="45" y1="' + fmt(y, 1) + '" x2="' + (W - 10) + '" y2="' + fmt(y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; out += '<text x="40" y="' + fmt(y + 3, 1) + '" font-size="10" fill="' + FIG_INK + '" text-anchor="end">' + v + '</text>'; }
  out += '<line x1="45" y1="' + base + '" x2="' + (W - 10) + '" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<line x1="45" y1="' + top + '" x2="45" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  for (var i = 0; i < labels.length; i++) { var x = 45 + gap + (gap + bw) * i, h = (base - top) * vals[i] / topTick; out += '<rect x="' + fmt(x, 1) + '" y="' + fmt(base - h, 1) + '" width="' + bw + '" height="' + fmt(h, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; out += _txt(x + bw / 2, base + 16, labels[i], 11, false); }
  out += pk7axisTitle(unit, (top + base) / 2);
  return out + '</svg>';
}

/* Line graph for reading: points joined in order, the axis
   carries the scale; points carry NO value labels. */
function pk7lineRead(labels, vals, step, unit) {
  var maxV = Math.max.apply(null, vals), topTick = Math.ceil(maxV / step) * step;
  var W = 330, H = 215, base = 175, top = 25;
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph">';
  for (var v = 0; v <= topTick; v += step) { var y = base - (base - top) * v / topTick; out += '<line x1="45" y1="' + fmt(y, 1) + '" x2="' + (W - 15) + '" y2="' + fmt(y, 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; out += '<text x="40" y="' + fmt(y + 3, 1) + '" font-size="10" fill="' + FIG_INK + '" text-anchor="end">' + v + '</text>'; }
  out += '<line x1="45" y1="' + base + '" x2="' + (W - 15) + '" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  out += '<line x1="45" y1="' + top + '" x2="45" y2="' + base + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  var pts = [];
  for (var i = 0; i < labels.length; i++) { var x = 65 + i * (W - 95) / (labels.length - 1), yy = base - (base - top) * vals[i] / topTick; pts.push([x, yy]); out += '<circle cx="' + fmt(x, 1) + '" cy="' + fmt(yy, 1) + '" r="3.4" fill="' + FIG_INK + '"/>'; out += _txt(x, base + 16, labels[i], 11, false); }
  for (var j = 0; j < pts.length - 1; j++) out += '<line x1="' + fmt(pts[j][0], 1) + '" y1="' + fmt(pts[j][1], 1) + '" x2="' + fmt(pts[j + 1][0], 1) + '" y2="' + fmt(pts[j + 1][1], 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += pk7axisTitle(unit, (top + base) / 2);
  return out + '</svg>';
}

/* Pictograph: one row per category, the label at the left and
   count symbols in a row. The key (what one symbol stands for)
   is stated in the question text. */
function pk7picto(rows) {
  var H = rows.length * 30 + 14;
  var out = '<svg viewBox="0 0 330 ' + H + '" width="330" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pictograph">';
  rows.forEach(function (r, i) {
    var y = 22 + i * 30;
    out += _txt(78, y, r.label, 12, false, "end");
    for (var k = 0; k < r.count; k++) out += '<circle cx="' + (96 + k * 17) + '" cy="' + (y - 4) + '" r="6.5" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1.2"/>';
  });
  return out + '</svg>';
}

/* Protractor with the angle drawn to its own measure: vertex at
   (160, 178), the base ray along the diameter to the right (or
   to the left when mirror is true), a semicircular scale with
   ticks every 5 degrees and labels every 10 degrees, and the
   second ray drawn in the accent colour at exactly deg from the
   base ray. The labels increase from the base ray's zero. */
function pk7protractor(deg, mirror) {
  var cx = 160, cy = 178, R = 128;
  function P(r, aDeg) { var a = aDeg * Math.PI / 180, dx = Math.cos(a) * (mirror ? -1 : 1); return [cx + dx * r, cy - Math.sin(a) * r]; }
  var out = '<svg viewBox="0 0 320 196" width="320" height="196" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Protractor measuring an angle">';
  var p0 = P(R, 0), p180 = P(R, 180);
  out += '<path d="M ' + fmt(p0[0], 1) + ' ' + fmt(p0[1], 1) + ' A ' + R + ' ' + R + ' 0 0 ' + (mirror ? 1 : 0) + ' ' + fmt(p180[0], 1) + ' ' + fmt(p180[1], 1) + ' Z" fill="' + FIG_SHADE + '" fill-opacity="0.35" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  for (var t = 0; t <= 180; t += 5) { var len = t % 10 === 0 ? 13 : 8, pa = P(R, t), pb = P(R - len, t); out += '<line x1="' + fmt(pa[0], 1) + '" y1="' + fmt(pa[1], 1) + '" x2="' + fmt(pb[0], 1) + '" y2="' + fmt(pb[1], 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (t % 10 === 0 ? 1.3 : 0.8) + '"/>'; if (t % 10 === 0) { var pl = P(R - 24, t); out += '<text x="' + fmt(pl[0], 1) + '" y="' + fmt(pl[1] + 3, 1) + '" font-size="9" fill="' + FIG_INK + '" text-anchor="middle">' + t + '</text>'; } }
  var pe = P(R, deg);
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(P(R + 14, 0)[0], 1) + '" y2="' + cy + '" stroke="' + FIG_INK + '" stroke-width="2.4"/>';
  out += '<line x1="' + cx + '" y1="' + cy + '" x2="' + fmt(pe[0], 1) + '" y2="' + fmt(pe[1], 1) + '" stroke="' + FIG_ACC + '" stroke-width="2.6"/>';
  out += '<circle cx="' + cx + '" cy="' + cy + '" r="3.4" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* A single angle drawn to its measure, with no numbers on the
   figure (the classification items). Vertex at (70, 150), base
   ray to the right, second ray at deg, and a small arc between
   the rays. deg 180 draws the straight angle. */
function pk7angleFig(deg) {
  /* Right and obtuse angles sit further right with a shorter
     second ray, so the ray stays inside the frame at 180 degrees. */
  var vx = deg >= 90 ? 105 : 70, vy = 150, L = 150, L2 = deg >= 90 ? 100 : 150;
  var a = deg * Math.PI / 180, ex = vx + L2 * Math.cos(a), ey = vy - L2 * Math.sin(a);
  var out = '<svg viewBox="0 0 300 185" width="300" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle">';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 30) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  var r = 34, ax = vx + r * Math.cos(a), ay = vy - r * Math.sin(a);
  out += '<path d="M ' + (vx + r) + ' ' + vy + ' A ' + r + ' ' + r + ' 0 ' + (deg > 180 ? 1 : 0) + ' 0 ' + fmt(ax, 1) + ' ' + fmt(ay, 1) + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* Two adjacent angles on a straight line: the left angle is
   labelled deg; the right angle is the unknown. */
function pk7anglePair(deg) {
  var vx = 150, vy = 140, L = 120;
  var a = deg * Math.PI / 180, ex = vx + L * Math.cos(a), ey = vy - L * Math.sin(a);
  var out = '<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles on a straight line">';
  out += '<line x1="20" y1="' + vy + '" x2="280" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  var midA = (deg / 2) * Math.PI / 180, midB = ((deg + 180) / 2) * Math.PI / 180;
  out += _txt(vx + 54 * Math.cos(midA), vy - 54 * Math.sin(midA), deg + "°", 13, true);
  out += _txt(vx + 50 * Math.cos(midB), vy - 50 * Math.sin(midB), "?", 15, true);
  return out + '</svg>';
}

/* Two adjacent angles forming a right angle: the lower-left
   angle is labelled deg; the other is the unknown. A small
   square marks the right angle. */
function pk7anglePairR(deg) {
  var vx = 90, vy = 150, L = 110;
  var a = deg * Math.PI / 180, ex = vx + L * Math.cos(a), ey = vy - L * Math.sin(a);
  var out = '<svg viewBox="0 0 260 185" width="260" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles forming a right angle">';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 30) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + vx + '" y2="' + (vy - L - 10) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2.2"/>';
  out += '<path d="M ' + (vx + 16) + ' ' + vy + ' L ' + (vx + 16) + ' ' + (vy - 16) + ' L ' + vx + ' ' + (vy - 16) + '" fill="none" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
  out += '<circle cx="' + vx + '" cy="' + vy + '" r="3.2" fill="' + FIG_INK + '"/>';
  out += _txt(vx + 58, vy - 14, deg + "°", 13, true);
  out += _txt(vx + 16, vy - 62, "?", 15, true);
  return out + '</svg>';
}

/* Four mini angle figures in a 2 by 2 grid, labelled A to D, for
   the which-angle items. degs is the four measures in reading
   order. */
function pk7anglePickFig(degs) {
  var out = '<svg viewBox="0 0 320 238" width="320" height="238" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four angles">';
  var org = [[36, 92], [186, 92], [36, 202], [186, 202]];
  var labs = ["A", "B", "C", "D"];
  degs.forEach(function (deg, i) {
    var vx = org[i][0], vy = org[i][1], L = 62, L2 = deg > 90 ? 34 : 62;
    var a = deg * Math.PI / 180, ex = vx + L2 * Math.cos(a), ey = vy - L2 * Math.sin(a);
    out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + (vx + L + 14) + '" y2="' + vy + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    out += '<line x1="' + vx + '" y1="' + vy + '" x2="' + fmt(ex, 1) + '" y2="' + fmt(ey, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    out += '<circle cx="' + vx + '" cy="' + vy + '" r="2.8" fill="' + FIG_INK + '"/>';
    out += _txt(vx + 8, vy + 20, labs[i], 13, true);
  });
  return out + '</svg>';
}

/* Hundred grid with the first n of its 100 cells shaded, in
   reading order. */
function pk7hundred(n) {
  var x0 = 95, y0 = 12, cs = 13;
  var out = '<svg viewBox="0 0 320 156" width="320" height="156" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Hundred grid">';
  for (var i = 0; i < 100; i++) { var x = x0 + (i % 10) * cs, y = y0 + Math.floor(i / 10) * cs; out += '<rect x="' + x + '" y="' + y + '" width="' + cs + '" height="' + cs + '" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="0.7"/>'; }
  return out + '</svg>';
}

/* Four mini hundred grids labelled A to D, each with its own
   shaded count, for the which-grid items. counts is the four
   counts in reading order. */
function pk7hundredPick(counts) {
  var out = '<svg viewBox="0 0 320 300" width="320" height="300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four hundred grids">';
  var org = [[28, 14], [176, 14], [28, 158], [176, 158]], labs = ["A", "B", "C", "D"], cs = 11.6;
  counts.forEach(function (n, g) {
    var x0 = org[g][0], y0 = org[g][1];
    for (var i = 0; i < 100; i++) { var x = x0 + (i % 10) * cs, y = y0 + Math.floor(i / 10) * cs; out += '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + cs + '" height="' + cs + '" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="0.6"/>'; }
    out += _txt(x0 + 58, y0 + 128, labs[g], 13, true);
  });
  return out + '</svg>';
}

/* Circle split into d equal sectors with the first n shaded
   (the fraction area model). */
function pk7fracCirc(n, d) {
  var cx = 110, cy = 96, R = 74;
  var out = '<svg viewBox="0 0 220 192" width="220" height="192" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle fraction model">';
  for (var i = 0; i < d; i++) {
    var a1 = (-90 + i * 360 / d) * Math.PI / 180, a2 = (-90 + (i + 1) * 360 / d) * Math.PI / 180;
    var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    out += '<path d="M ' + cx + ' ' + cy + ' L ' + fmt(x1, 1) + ' ' + fmt(y1, 1) + ' A ' + R + ' ' + R + ' 0 0 1 ' + fmt(x2, 1) + ' ' + fmt(y2, 1) + ' Z" fill="' + (i < n ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  }
  return out + '</svg>';
}

/* A set of counters: total circles in rows of six, the first
   shaded of them filled. */
function pk7setFig(total, shaded) {
  var rows = Math.ceil(total / 6), H = rows * 30 + 16;
  var out = '<svg viewBox="0 0 240 ' + H + '" width="240" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Set of counters">';
  for (var i = 0; i < total; i++) { var x = 30 + (i % 6) * 32, y = 24 + Math.floor(i / 6) * 30; out += '<circle cx="' + x + '" cy="' + y + '" r="11" fill="' + (i < shaded ? FIG_ACC : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; }
  return out + '</svg>';
}

/* Four mini fraction bars labelled A to D for the which-diagram
   items. pairs is the four [n, d] in reading order; each bar is
   split into d equal parts with n shaded. */
function pk7fracPickFig(pairs) {
  var out = '<svg viewBox="0 0 320 168" width="320" height="168" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four fraction bars">';
  var org = [[16, 18], [168, 18], [16, 94], [168, 94]], labs = ["A", "B", "C", "D"], bw = 128, bh = 26;
  pairs.forEach(function (pr, g) {
    var x0 = org[g][0], y0 = org[g][1], seg = bw / pr[1];
    for (var i = 0; i < pr[1]; i++) out += '<rect x="' + fmt(x0 + i * seg, 1) + '" y="' + y0 + '" width="' + fmt(seg, 1) + '" height="' + bh + '" fill="' + (i < pr[0] ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.3"/>';
    out += _txt(x0 + bw / 2, y0 + bh + 16, labs[g], 13, true);
  });
  return out + '</svg>';
}

/* A fraction on a number line from 0 to 1: d equal intervals,
   only the endpoints labelled, a marker at n/d. */
function pk7fracLine(d, n) {
  var x0 = 30, x1 = 290, y = 62;
  var out = '<svg viewBox="0 0 320 96" width="320" height="96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1">';
  out += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i <= d; i++) { var x = x0 + (x1 - x0) * i / d; out += '<line x1="' + fmt(x, 1) + '" y1="' + (y - 6) + '" x2="' + fmt(x, 1) + '" y2="' + (y + 6) + '" stroke="' + FIG_INK + '" stroke-width="1.4"/>'; }
  out += _txt(x0, y + 22, "0", 12, true);
  out += _txt(x1, y + 22, "1", 12, true);
  var mx = x0 + (x1 - x0) * n / d;
  out += '<polygon points="' + fmt(mx, 1) + ',' + (y - 12) + ' ' + fmt(mx - 6, 1) + ',' + (y - 24) + ' ' + fmt(mx + 6, 1) + ',' + (y - 24) + '" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

/* A decimal on a number line from 0 to 1: minor ticks every
   0.05, labelled ticks every 0.1 at the ends and the middle, a
   marker at v (a multiple of 0.05). */
function pk7decLine(v) {
  var x0 = 30, x1 = 290, y = 62;
  function X(t) { return x0 + (x1 - x0) * t; }
  var out = '<svg viewBox="0 0 320 96" width="320" height="96" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from 0 to 1">';
  out += '<line x1="' + x0 + '" y1="' + y + '" x2="' + x1 + '" y2="' + y + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var i = 0; i <= 20; i++) { var x = X(i / 20), major = i % 2 === 0; out += '<line x1="' + fmt(x, 1) + '" y1="' + (y - (major ? 7 : 4)) + '" x2="' + fmt(x, 1) + '" y2="' + (y + (major ? 7 : 4)) + '" stroke="' + FIG_INK + '" stroke-width="1.3"/>'; }
  out += _txt(X(0), y + 22, "0", 12, true);
  out += _txt(X(0.5), y + 22, "0.5", 12, true);
  out += _txt(X(1), y + 22, "1", 12, true);
  var mx = X(v);
  out += '<polygon points="' + fmt(mx, 1) + ',' + (y - 12) + ' ' + fmt(mx - 6, 1) + ',' + (y - 24) + ' ' + fmt(mx + 6, 1) + ',' + (y - 24) + '" fill="' + FIG_ALT + '"/>';
  return out + '</svg>';
}

/* A plain square grid with NO axes and NO numbers (the
   transformations items stay off the coordinate plane, per the
   specification). polys are cell-corner polygons in grid units,
   drawn from the top-left origin; the first is the original
   (outline), the second its image (shaded). mirrorCol, when not
   null, draws a dashed vertical mirror line at that grid x. */
function pk7plainGrid(polys, mirrorCol) {
  var cols = 11, rows = 9, cs = 24, x0 = 28, y0 = 10, W = x0 * 2 + cols * cs, H = y0 * 2 + rows * cs;
  function X(gx) { return x0 + gx * cs; }
  function Y(gy) { return y0 + gy * cs; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shape on a plain grid">';
  for (var i = 0; i <= cols; i++) out += '<line x1="' + X(i) + '" y1="' + y0 + '" x2="' + X(i) + '" y2="' + Y(rows) + '" stroke="#cfe4d6" stroke-width="1"/>';
  for (var j = 0; j <= rows; j++) out += '<line x1="' + x0 + '" y1="' + Y(j) + '" x2="' + X(cols) + '" y2="' + Y(j) + '" stroke="#cfe4d6" stroke-width="1"/>';
  if (mirrorCol !== null && mirrorCol !== undefined) out += '<line x1="' + X(mirrorCol) + '" y1="' + (y0 - 4) + '" x2="' + X(mirrorCol) + '" y2="' + (Y(rows) + 4) + '" stroke="' + FIG_ALT + '" stroke-width="2" stroke-dasharray="6 4"/>';
  polys.forEach(function (p, idx) {
    out += '<polygon points="' + p.map(function (q) { return fmt(X(q[0]), 1) + "," + fmt(Y(q[1]), 1); }).join(" ") + '" fill="' + (idx === 0 ? "#ffffff" : FIG_SHADE) + '" fill-opacity="' + (idx === 0 ? "1" : "0.65") + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  });
  return out + '</svg>';
}

/* A Cartesian plane with one feature highlighted for the
   axes-origin items: mode "x" thickens the x-axis, mode "y"
   thickens the y-axis. Axis names are NOT printed: naming them
   is the question. */
function pk7axesHL(mode) {
  var W = 240, c = 120, st = 17;
  function X(x) { return c + x * st; }
  function Y(y) { return c - y * st; }
  var out = '<svg viewBox="0 0 ' + W + ' ' + W + '" width="' + W + '" height="' + W + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane with one axis highlighted">';
  for (var g = -6; g <= 6; g++) { if (g === 0) continue; out += '<line x1="' + fmt(X(g), 1) + '" y1="10" x2="' + fmt(X(g), 1) + '" y2="230" stroke="#cfe4d6" stroke-width="1"/>'; out += '<line x1="10" y1="' + fmt(Y(g), 1) + '" x2="230" y2="' + fmt(Y(g), 1) + '" stroke="#cfe4d6" stroke-width="1"/>'; }
  out += '<line x1="10" y1="120" x2="230" y2="120" stroke="' + (mode === "x" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "x" ? 4 : 1.8) + '"/>';
  out += '<line x1="120" y1="10" x2="120" y2="230" stroke="' + (mode === "y" ? FIG_ACC : FIG_INK) + '" stroke-width="' + (mode === "y" ? 4 : 1.8) + '"/>';
  out += '<polygon points="230,120 222,115 222,125" fill="' + FIG_INK + '"/><polygon points="120,10 115,18 125,18" fill="' + FIG_INK + '"/>';
  out += '<circle cx="120" cy="120" r="2.8" fill="' + FIG_INK + '"/>';
  return out + '</svg>';
}

/* Spinner with equal sectors: labels alternate between the win
   label (winCount sectors) and the lose label, spread evenly. */
function pk7spinner(winCount, total, winLabel, loseLabel) {
  var cx = 110, cy = 96, R = 76;
  var out = '<svg viewBox="0 0 220 192" width="220" height="192" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Spinner">';
  var wins = {};
  for (var w = 0; w < winCount; w++) wins[Math.round(w * total / winCount) % total] = 1;
  for (var i = 0; i < total; i++) {
    var a1 = (-90 + i * 360 / total) * Math.PI / 180, a2 = (-90 + (i + 1) * 360 / total) * Math.PI / 180;
    var x1 = cx + R * Math.cos(a1), y1 = cy + R * Math.sin(a1), x2 = cx + R * Math.cos(a2), y2 = cy + R * Math.sin(a2);
    var isWin = !!wins[i];
    out += '<path d="M ' + cx + ' ' + cy + ' L ' + fmt(x1, 1) + ' ' + fmt(y1, 1) + ' A ' + R + ' ' + R + ' 0 0 1 ' + fmt(x2, 1) + ' ' + fmt(y2, 1) + ' Z" fill="' + (isWin ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    var mid = (-90 + (i + 0.5) * 360 / total) * Math.PI / 180;
    out += _txt(cx + (R - 26) * Math.cos(mid), cy + (R - 26) * Math.sin(mid), isWin ? winLabel : loseLabel, 10.5, isWin);
  }
  return out + '</svg>';
}

/* ================= Support sets (state A) =================
   The five state A clusters of this piece (7-C4, 7-C7, 7-C11,
   7-C13, 7-C15) are served first, on the established lowest-
   risk-first pattern. Their entries already stand in the bank in
   their unit files; nothing about them changes except that the
   PKT7_P3 table at the end of this section flags them and adds
   pkSrc, pkGroup and pkFor. The support sets are:
   - 7-C4 (Unit 6, equation-solving): u6-one-step-balance,
     u6-one-step-problem, u6-one-step-problem-cr and
     u6-inspection-trial. Grounding: MA4.8.7 (solving one-step
     equations), MA4.8.8 (guess and check, the inspection entry).
     pkFor: the cluster's fourteen indicators.
   - 7-C7 (Unit 3, decimal-operations): u3-add-sub-decimals,
     u3-mult-decimals, u3-div-decimals, u3-cr-add-sub, u3-cr-mult
     and u3-cr-div. Grounding: MA5.6.11 (add and subtract decimals
     to thousandths), MA6.6.5 (decimal multiplication and division
     problems). pkFor: the cluster's thirteen indicators.
   - 7-C11 (Unit 5, fraction-operations): u5-add-like, u5-sub-like
     and u5-model-add-figure; (equivalent-fractions):
     u5-simplify-fraction, u5-simplify-solution and
     u5-common-denominator. Provenance, recorded honestly: the
     elementary outcome lists and guides on file do not name
     like-denominator fraction addition or lowest terms; these two
     sets rest on the November 13, 2026 cluster audit's coverage
     rating, and their pkSrc says so. pkFor: the cluster's eleven
     indicators.
   - 7-C13 (Unit 7, single-event-probability): u7-prob-basic.
     Grounding: MA6.12.2. pkFor: 12.1 to 12.7.
   - 7-C15 (Unit 8, axes-origin): u8-axes-origin.
     Grounding: MA6.10.9. pkFor: 10.6. */

/* ================= Cluster 7-C1 remainder =================
   SORTING DIAGRAMS (sorting-diagrams, Unit 1, 4 entries, all
   authored, all figure-bearing): read counts from a Venn diagram
   and a Carroll diagram, and place a number into a Venn diagram.
   Grounding: MA4.11.7 to MA4.11.12 (grouping and cross-
   classification; Carroll diagrams at MA4.11.10). Supports
   (pkFor): 5.1 to 5.4. Cluster 7-C1's other groups (factors and
   multiples, divisibility) shipped in Piece 1. */

E("u1-pk-sort-venn-read", 1, ["5.1"], 1, "gen", function () {
  var aO, both, bO, nei, guard = 0;
  do {
    aO = ri(3, 9); both = ri(2, 6); bO = ri(3, 9); nei = ri(1, 5);
    var vals = [aO, both, bO, nei, aO + both + bO, aO + both, bO + both];
    var distinct = vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) { aO = 5; both = 3; bO = 7; nei = 2; }
  var tot = aO + both + bO, dogT = aO + both, catT = bO + both;
  var modes = [
    { q: "How many students have a dog but do not have a cat?", key: aO, ds: [[both, "both a dog and a cat"], [bO, "a cat but not a dog"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have both a dog and a cat?", key: both, ds: [[aO, "a dog but not a cat"], [bO, "a cat but not a dog"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have a dog or a cat (or both)?", key: tot, ds: [[dogT, "a dog (counting those with both)"], [catT, "a cat (counting those with both)"], [nei, "neither a dog nor a cat"]] },
    { q: "How many students have a dog (including those who also have a cat)?", key: dogT, ds: [[aO, "a dog but not a cat"], [tot, "a dog or a cat (or both)"], [catT, "a cat (counting those with both)"]] }
  ];
  var m = pick(modes);
  var q = mcq(m.q,
    { t: String(m.key), fb: "Correct: read the region (or regions) the question names in the diagram." },
    m.ds.map(function (d) { return { t: String(d[0]), fb: "That is the count for students with " + d[1] + ". The question asks for a different group." }; }),
    "Read the region (or regions) the question names in the Venn diagram: the count there is <b>" + m.key + "</b>.",
    { aO: aO, both: both, bO: bO, nei: nei, key: m.key });
  q.figure = pk7venn("Dog", "Cat", [aO, both, bO, nei]);
  return q;
}, ["Look at the regions of the Venn diagram, not just the circle totals.", "Decide which region (or regions) the question is asking about, then read its count."]);

E("u1-pk-sort-venn-place", 1, ["5.1"], 2, "gen", function () {
  var fams = [
    { nums: [12, 18, 24, 30, 36, 42], region: "both", why: "it is a multiple of 3 and it is even" },
    { nums: [3, 9, 15, 21, 27, 33, 39], region: "aOnly", why: "it is a multiple of 3, but it is not even" },
    { nums: [4, 8, 10, 14, 16, 20, 22, 26, 28], region: "bOnly", why: "it is even, but it is not a multiple of 3" },
    { nums: [5, 7, 11, 13, 17, 19, 23, 25, 29], region: "neither", why: "it is not a multiple of 3 and it is not even" }
  ];
  var f = pick(fams), n = pick(f.nums);
  var opts = {
    both: "In both circles together",
    aOnly: "Only in the Multiple of 3 circle",
    bOnly: "Only in the Even circle",
    neither: "Outside both of the circles"
  };
  var ds = Object.keys(opts).filter(function (k) { return k !== f.region; }).map(function (k) {
    return { t: opts[k], fb: "Check the number against both tests: " + n + " is " + (n % 3 === 0 ? "a multiple of 3" : "not a multiple of 3") + " and " + (n % 2 === 0 ? "even" : "odd") + "." };
  });
  var q = mcq("The Venn diagram sorts numbers into Multiple of 3 and Even. Where does " + n + " belong?",
    { t: opts[f.region], fb: "Correct: " + f.why + "." }, ds,
    "Test " + n + " against both circles: " + f.why + ", so it goes <b>" + opts[f.region].toLowerCase() + "</b>.",
    { n: n, region: f.region });
  q.figure = pk7venn("Multiple of 3", "Even", null);
  return q;
}, ["Test the number against each circle's rule separately.", "A number in the overlap must pass both tests."]);

E("u1-pk-sort-carroll-read", 1, ["5.1"], 1, "gen", function () {
  var cells, guard = 0, distinct = false;
  do {
    cells = [[ri(2, 9), ri(2, 9)], [ri(2, 9), ri(2, 9)]];
    var flat = [cells[0][0], cells[0][1], cells[1][0], cells[1][1]];
    distinct = flat.every(function (v, i) { return flat.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) cells = [[3, 5], [7, 4]];
  var names = [["wear glasses and have a pet", 0, 0], ["wear glasses and have no pet", 0, 1], ["do not wear glasses and have a pet", 1, 0], ["do not wear glasses and have no pet", 1, 1]];
  var t = pick(names), key = cells[t[1]][t[2]];
  var ds = names.filter(function (x) { return x !== t; }).map(function (x) { return { t: String(cells[x[1]][x[2]]), fb: "That is the count for students who " + x[0] + ". Find the row and column the question names." }; });
  var q = mcq("The Carroll diagram sorts students by glasses and pets. How many students " + t[0] + "?",
    { t: String(key), fb: "Correct: that is the cell where the row and the column meet." }, ds,
    "Find the row for the glasses condition and the column for the pet condition; their cell holds <b>" + key + "</b>.",
    { cells: cells, key: key });
  q.figure = pk7carroll("Pet", "No pet", "Glasses", "No glasses", cells);
  return q;
}, ["A Carroll diagram cell sits where its row and its column cross.", "Read the row label and the column label before reading the number."]);

E("u1-pk-sort-carroll-total", 1, ["5.1"], 2, "gen", function () {
  var cells, guard = 0, okSet = false;
  do {
    cells = [[ri(2, 9), ri(2, 9)], [ri(2, 9), ri(2, 9)]];
    var rowA = cells[0][0] + cells[0][1], rowB = cells[1][0] + cells[1][1], colA = cells[0][0] + cells[1][0], colB = cells[0][1] + cells[1][1], grand = rowA + rowB;
    var flat = [cells[0][0], cells[0][1], cells[1][0], cells[1][1]];
    var flatDistinct = flat.every(function (v, i) { return flat.indexOf(v) === i; });
    var optsSet = [rowA, rowB, colA, colB];
    okSet = flatDistinct && optsSet.every(function (v, i) { return optsSet.indexOf(v) === i; });
  } while (!okSet && guard++ < 400);
  if (!okSet) { cells = [[3, 5], [7, 4]]; rowA = 8; rowB = 11; colA = 10; colB = 9; grand = 19; }
  var modes = [
    { q: "How many students wear glasses in total?", key: rowA, parts: cells[0], ds: [[rowB, "do not wear glasses"], [colA, "have a pet"], [grand, "there are in the whole diagram"]] },
    { q: "How many students have a pet in total?", key: colA, parts: [cells[0][0], cells[1][0]], ds: [[colB, "have no pet"], [rowA, "wear glasses"], [grand, "there are in the whole diagram"]] },
    { q: "How many students do not wear glasses in total?", key: rowB, parts: cells[1], ds: [[rowA, "wear glasses"], [colB, "have no pet"], [grand, "there are in the whole diagram"]] },
    { q: "How many students have no pet in total?", key: colB, parts: [cells[0][1], cells[1][1]], ds: [[colA, "have a pet"], [rowB, "do not wear glasses"], [grand, "there are in the whole diagram"]] }
  ];
  var m = pick(modes);
  var q = mcq(m.q,
    { t: String(m.key), fb: "Correct: add the two cells in that row (or column): " + m.parts[0] + " + " + m.parts[1] + " = " + m.key + "." },
    m.ds.map(function (d) { return { t: String(d[0]), fb: "That is the total for students who " + d[1] + ". The question asks for a different row or column." }; }),
    "A row (or column) total adds its two cells: \\(" + m.parts[0] + " + " + m.parts[1] + " = " + m.key + "\\). The answer is <b>" + m.key + "</b>.",
    { cells: cells, key: m.key });
  q.figure = pk7carroll("Pet", "No pet", "Glasses", "No glasses", cells);
  return q;
}, ["A total for a row adds the two cells across that row.", "Check whether the question names a row (glasses) or a column (pets)."]);

/* ================= Cluster 7-C2 =================
   PATTERNS (patterns, Unit 1, 5 entries, all authored): extend a
   pattern, state its rule, work an input-output machine, fill a
   missing middle term, and extend a pattern whose rule is more
   than adding a constant. Grounding: MA4.8.1 to MA4.8.3;
   MA5.8.1 to MA5.8.4. Supports (pkFor): the cluster's nine
   indicators (8.4 to 8.6, 7.1 to 7.4, 7.7, 7.8). */

E("u1-pk-pattern-next", 1, ["8.4"], 1, "gen", function () {
  var dec = Math.random() < 0.4;
  var diff = pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]);
  var start = dec ? ri(40, 90) : ri(3, 30);
  var terms = [0, 1, 2, 3].map(function (i) { return dec ? start - i * diff : start + i * diff; });
  var ans = dec ? start - 4 * diff : start + 4 * diff;
  return numq("What is the next term in the pattern " + terms.join(", ") + ", ...? Give the number.",
    ans, 0,
    "Each term " + (dec ? "decreases" : "increases") + " by " + diff + ": \\(" + terms[3] + " " + (dec ? "-" : "+") + " " + diff + " = " + ans + "\\). The answer is <b>" + ans + "</b>.",
    { start: start, diff: diff, dec: dec });
}, ["Find how much the pattern changes by from one term to the next.", "Apply that same change to the last term shown."]);

E("u1-pk-pattern-rule", 1, ["8.4"], 1, "gen", function () {
  var dec = Math.random() < 0.5;
  var diff = pick([3, 4, 5, 6, 7, 8, 9]);
  var start = dec ? ri(50, 95) : ri(3, 25);
  var terms = [0, 1, 2, 3, 4].map(function (i) { return dec ? start - i * diff : start + i * diff; });
  var verb = dec ? "Subtract " : "Add ";
  return mcq("What is the rule for the pattern " + terms.join(", ") + ", ...?",
    { t: verb + diff + " each time", fb: "Correct: each term is " + diff + " " + (dec ? "less" : "more") + " than the one before." },
    [{ t: verb + (diff + 1) + " each time", fb: "Check the jump between the first two terms: it is " + diff + ", not " + (diff + 1) + "." },
     { t: verb + (diff - 1) + " each time", fb: "Check the jump between the first two terms: it is " + diff + ", not " + (diff - 1) + "." },
     { t: "Multiply by " + diff + " each time", fb: "Multiplying would make the terms grow much faster; here the change is the same amount each time." }],
    "Compare neighbouring terms: the change from " + terms[0] + " to " + terms[1] + " is " + (dec ? "down " : "up ") + diff + ", and the same change repeats at every step. The rule is <b>" + (verb + diff + " each time").toLowerCase() + "</b>.",
    { start: start, diff: diff, dec: dec });
}, ["Look at the change from the first term to the second.", "Check that the same change holds for every step."]);

E("u1-pk-pattern-machine", 1, ["8.4"], 2, "gen", function () {
  var k = pick([2, 3, 4]), c = ri(1, 9), minus = Math.random() < 0.35;
  function out(x) { return minus ? k * x - c : k * x + c; }
  var ask = pick([8, 9, 10, 11, 12]);
  var shown = [2, 5, 7].map(function (x) { return "turns " + x + " into " + out(x); });
  return numq("A number machine " + shown[0] + ", " + shown[1] + " and " + shown[2] + ". What does it turn " + ask + " into? Give the number.",
    out(ask), 0,
    "Each output is " + k + " times the input " + (minus ? "minus " : "plus ") + c + ": \\(" + k + " \\times " + ask + " " + (minus ? "-" : "+") + " " + c + " = " + out(ask) + "\\). The answer is <b>" + out(ask) + "</b>.",
    { k: k, c: c, minus: minus, ask: ask });
}, ["Find what the machine does to each input: compare an input with its output.", "The machine multiplies first, then adds or subtracts."]);

E("u1-pk-pattern-missing", 1, ["8.4"], 2, "gen", function () {
  var diff = pick([3, 4, 5, 6, 7, 8, 9, 12]);
  var start = ri(2, 30);
  var t = [0, 1, 2, 3, 4].map(function (i) { return start + i * diff; });
  var pos = pick([1, 2, 3]), key = t[pos];
  var shown = t.map(function (v, i) { return i === pos ? "__" : String(v); });
  var ds = pk7uniq(key, [key + diff, key - diff, key + 1]).slice(0, 3);
  return mcq("What number is missing from the pattern " + shown.join(", ") + "?",
    { t: String(key), fb: "Correct: the pattern adds " + diff + " each time, and " + t[pos - 1] + " + " + diff + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: "The pattern adds the same amount, " + diff + ", at every step. Check the step before and after the blank." }; }),
    "The pattern adds " + diff + " each time: \\(" + t[pos - 1] + " + " + diff + " = " + key + "\\), and \\(" + key + " + " + diff + " = " + t[pos + 1] + "\\) checks. The answer is <b>" + key + "</b>.",
    { start: start, diff: diff, pos: pos });
}, ["Find the pattern's step from the terms you can see.", "The missing term must fit the step on both sides."]);

E("u1-pk-pattern-grow", 1, ["8.4"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var s = ri(2, 6), terms = [s], i;
    for (i = 0; i < 3; i++) terms.push(terms[terms.length - 1] * 2 + 1);
    var ans = terms[3] * 2 + 1;
    return numq("What is the next term in the pattern " + terms.join(", ") + ", ...? Give the number.",
      ans, 0,
      "Each term is double the term before, plus 1: \\(2 \\times " + terms[3] + " + 1 = " + ans + "\\). The answer is <b>" + ans + "</b>.",
      { terms: terms });
  }
  var start = ri(3, 12), d0 = ri(2, 4), terms2 = [start], j;
  for (j = 0; j < 3; j++) terms2.push(terms2[terms2.length - 1] + d0 + j);
  var ans2 = terms2[3] + d0 + 3;
  return numq("What is the next term in the pattern " + terms2.join(", ") + ", ...? Give the number.",
    ans2, 0,
    "The jumps grow by 1 each time: +" + d0 + ", +" + (d0 + 1) + ", +" + (d0 + 2) + ", so the next jump is +" + (d0 + 3) + ": \\(" + terms2[3] + " + " + (d0 + 3) + " = " + ans2 + "\\). The answer is <b>" + ans2 + "</b>.",
    { terms: terms2 });
}, ["If the jumps are not all equal, look at how the jumps themselves change.", "Work out the next jump before adding it on."]);

/* ================= Cluster 7-C3 =================
   FIRST QUADRANT (first-quadrant, Unit 1, 5 entries, all
   authored, all figure-bearing): read and use points in the
   first quadrant. Grounding: MA6.10.9 (first exposure to the
   Cartesian plane, plotting ordered pairs), with MA5.10.10 and
   MA5.10.11 behind it. Supports (pkFor): 7.5, 7.6, 7.9 to 7.12.
   Four of the five generators are shared with Unit 8 for cluster
   7-C15 (see the copies there); the generator functions are named
   so the copies call the same function. */

function pk7fqReadGen() {
  var x = ri(1, 8), y = ri(1, 8), guard = 0;
  while (x === y && guard++ < 60) { y = ri(1, 8); }
  if (x === y) y = y === 8 ? 7 : y + 1;
  var dy = y < 8 ? y + 1 : y - 1, dx = x < 8 ? x + 1 : x - 1;
  var q = mcq("What are the coordinates of point P?",
    { t: "(" + x + ", " + y + ")", fb: "Correct: go across " + x + " first, then up " + y + "." },
    [{ t: "(" + y + ", " + x + ")", fb: "That reads the coordinates in the wrong order: the first number is the distance across, the second is the distance up." },
     { t: "(" + x + ", " + dy + ")", fb: "The across distance, " + x + ", is right, but the point is " + y + " units up, not " + dy + "." },
     { t: "(" + dx + ", " + y + ")", fb: "The up distance, " + y + ", is right, but the point is " + x + " units across, not " + dx + "." }],
    "Coordinates are written (across, up). Point P is " + x + " units across and " + y + " units up, so its coordinates are <b>(" + x + ", " + y + ")</b>.",
    { x: x, y: y });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

function pk7fqWhichGen() {
  var pts = [], guard = 0;
  while (pts.length < 4 && guard++ < 400) {
    var p = { x: ri(1, 7), y: ri(1, 7) };
    if (!pts.some(function (q) { return q.x === p.x && q.y === p.y; })) pts.push(p);
  }
  while (pts.length < 4) pts.push({ x: pts.length + 1, y: 8 });
  var labs = ["A", "B", "C", "D"];
  pts.forEach(function (p, i) { p.label = labs[i]; });
  var t = pick(pts);
  var q = mcq("Which point is at (" + t.x + ", " + t.y + ")?",
    { t: "Point " + t.label, fb: "Correct: point " + t.label + " is " + t.x + " across and " + t.y + " up." },
    pts.filter(function (p) { return p !== t; }).map(function (p) { return { t: "Point " + p.label, fb: "Point " + p.label + " is at (" + p.x + ", " + p.y + "). Count across first, then up." }; }),
    "Count " + t.x + " units across and " + t.y + " units up from the origin: that is <b>point " + t.label + "</b>.",
    { pts: pts.map(function (p) { return [p.x, p.y]; }), tx: t.x, ty: t.y });
  q.figure = pk7quad(pts, 8, 8);
  return q;
}

function pk7fqCoordGen() {
  var x = ri(2, 8), y = ri(2, 8), guard = 0;
  while (x === y && guard++ < 60) { y = ri(2, 8); }
  if (x === y) y = y === 8 ? 7 : y + 1;
  var askX = Math.random() < 0.5, coord = askX ? x : y, other = askX ? y : x;
  var cand = [
    { t: String(other), fb: "That is the " + (askX ? "y" : "x") + "-coordinate. The " + (askX ? "x" : "y") + "-coordinate comes " + (askX ? "first" : "second") + " in the pair." },
    { t: String(coord + 1), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." },
    { t: String(coord - 1), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." },
    { t: String(coord + 2), fb: "Count again from the origin: point P is " + coord + " units " + (askX ? "across" : "up") + "." }
  ];
  var seenC = {}; seenC[String(coord)] = 1;
  var dsC = [];
  cand.forEach(function (cd) { if (!seenC[cd.t] && dsC.length < 3) { seenC[cd.t] = 1; dsC.push(cd); } });
  var q = mcq("What is the " + (askX ? "x" : "y") + "-coordinate of point P?",
    { t: String(coord), fb: "Correct: the " + (askX ? "x" : "y") + "-coordinate is the " + (askX ? "first" : "second") + " number in (" + x + ", " + y + ")." },
    dsC,
    "Point P is at (" + x + ", " + y + "). The " + (askX ? "x" : "y") + "-coordinate is the " + (askX ? "first" : "second") + " number: <b>" + coord + "</b>.",
    { x: x, y: y, askX: askX });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

function pk7fqMoveGen() {
  var x = ri(1, 5), y = ri(1, 5), dx = pick([2, 3, 4]), dy = pick([2, 3]), guard = 0;
  while (dx === dy && guard++ < 60) { dy = pick([2, 3, 4]); }
  if (dx === dy) dy = dx === 2 ? 3 : 2;
  var nx = x + dx, ny = y + dy;
  var q = mcq("Point P is at (" + x + ", " + y + "). It is moved " + dx + " units right and " + dy + " units up. What are its new coordinates?",
    { t: "(" + nx + ", " + ny + ")", fb: "Correct: add " + dx + " to the x-coordinate and " + dy + " to the y-coordinate." },
    [{ t: "(" + nx + ", " + y + ")", fb: "That moves the point right but forgets the move up: the y-coordinate must grow by " + dy + " as well." },
     { t: "(" + x + ", " + ny + ")", fb: "That moves the point up but forgets the move right: the x-coordinate must grow by " + dx + " as well." },
     { t: "(" + (x + dy) + ", " + (y + dx) + ")", fb: "That swaps the two moves: right adds to the x-coordinate, up adds to the y-coordinate." }],
    "Moving right adds to the first coordinate and moving up adds to the second: \\((" + x + " + " + dx + ", " + y + " + " + dy + ") = (" + nx + ", " + ny + ")\\). The answer is <b>(" + nx + ", " + ny + ")</b>.",
    { x: x, y: y, dx: dx, dy: dy });
  q.figure = pk7quad([{ x: x, y: y, label: "P" }], 9, 9);
  return q;
}

E("u1-pk-fq-read", 1, ["7.5"], 1, "gen", pk7fqReadGen,
  ["Coordinates are read across first, then up.", "Start at the origin: count across to below the point, then count up to it."]);

E("u1-pk-fq-which", 1, ["7.5"], 1, "gen", pk7fqWhichGen,
  ["Use the first number to move across and the second to move up.", "Find where the across count and the up count meet."]);

E("u1-pk-fq-coord", 1, ["7.5"], 1, "gen", pk7fqCoordGen,
  ["The x-coordinate is the first number in the pair; the y-coordinate is the second.", "Read the point's pair off the grid, then pick the number asked for."]);

E("u1-pk-fq-move", 1, ["7.5"], 2, "gen", pk7fqMoveGen,
  ["Moving right changes the first coordinate; moving up changes the second.", "Add each move to its own coordinate."]);

E("u1-pk-fq-between", 1, ["7.5"], 2, "gen", function () {
  var x1 = ri(1, 3), y1 = ri(1, 3), dx = pick([3, 4, 5]), dy = pick([2, 3, 4]), guard = 0;
  while (dx === dy && guard++ < 60) { dy = pick([2, 3, 4, 5]); }
  if (dx === dy) dy = dx === 3 ? 4 : 3;
  var x2 = x1 + dx, y2 = y1 + dy;
  var q = mcq("To get from point A to point B on the grid, you move...",
    { t: dx + " units right and " + dy + " units up", fb: "Correct: B is " + dx + " further across and " + dy + " further up than A." },
    [{ t: dy + " units right and " + dx + " units up", fb: "That swaps the two counts: compare the x-coordinates for the move right and the y-coordinates for the move up." },
     { t: dx + " units right and " + dy + " units down", fb: "B is higher than A, so the second move is up, not down." },
     { t: dx + " units left and " + dy + " units up", fb: "B is to the right of A, so the first move is right, not left." }],
    "Compare the coordinates: A is (" + x1 + ", " + y1 + ") and B is (" + x2 + ", " + y2 + "). The x-coordinate grows by " + dx + " (right) and the y-coordinate grows by " + dy + " (up). The answer is <b>" + dx + " units right and " + dy + " units up</b>.",
    { x1: x1, y1: y1, dx: dx, dy: dy });
  q.figure = pk7quad([{ x: x1, y: y1, label: "A" }, { x: x2, y: y2, label: "B" }], 9, 9);
  return q;
}, ["Compare the two points' x-coordinates, then their y-coordinates.", "The change in x tells the sideways move; the change in y tells the up-down move."]);

/* TABLES AND GRAPHS (tables-and-graphs, Unit 1, 5 entries, all
   authored, all figure-bearing): read values from a table, a
   pictograph, a bar graph and a line graph. Grounding: MA4.7.1
   to MA4.7.4 (tables and charts); MA4.11.6 (pictographs, many-to-
   one); MA5.11.4 and MA5.11.5 (bar graphs); MA6.11.7 (line
   graphs). Supports (pkFor): the cluster's six indicators. Three
   of the five generators (table, bar, line) are shared with Unit
   7 for cluster 7-C12, whose reading runs to bar graphs, line
   graphs and tables; the named functions below are the shared
   generators. */

function pk7tgTableGen() {
  var names = ["Ana", "Ben", "Cleo", "Dev", "Ella", "Finn", "Gia", "Hugo"];
  var pool = names.slice(), students = [], vals = [], guard = 0;
  while (students.length < 4 && guard++ < 400) {
    var v = ri(2, 12);
    if (vals.indexOf(v) < 0) { students.push(pool.splice(ri(0, pool.length - 1), 1)[0]); vals.push(v); }
  }
  while (students.length < 4) { students.push(pool.length ? pool.splice(0, 1)[0] : "Sam"); vals.push(13 + students.length); }
  var rows = students.map(function (s, i) { return [s, String(vals[i])]; });
  var pairMode = Math.random() < 0.45;
  var q;
  if (!pairMode) {
    var t = ri(0, 3);
    q = mcq("The table shows how many books each student read in October. How many books did " + students[t] + " read?",
      { t: String(vals[t]), fb: "Correct: find " + students[t] + "'s row and read its number." },
      vals.map(function (v, i) { return i; }).filter(function (i) { return i !== t; }).map(function (i) { return { t: String(vals[i]), fb: "That is " + students[i] + "'s number. Read the row for " + students[t] + "." }; }),
      "In the table, the row for " + students[t] + " gives <b>" + vals[t] + "</b> books.",
      { students: students, vals: vals, key: vals[t] });
  } else {
    var a = 0, b = 1, c = 2, d = 3, key = vals[a] + vals[b], guard2 = 0;
    while ((key === vals[c] + vals[d] || key === vals[a] + vals[c] || key === vals[b] + vals[d] || vals[a] + vals[c] === vals[b] + vals[d]) && guard2++ < 200) {
      var nv = ri(2, 12);
      if (vals.indexOf(nv) < 0) vals[guard2 % 4] = nv;
      key = vals[a] + vals[b];
      rows = students.map(function (s, i) { return [s, String(vals[i])]; });
    }
    if (key === vals[c] + vals[d] || key === vals[a] + vals[c] || key === vals[b] + vals[d] || vals[a] + vals[c] === vals[b] + vals[d]) { vals = [3, 5, 8, 11]; key = vals[a] + vals[b]; rows = students.map(function (s, i) { return [s, String(vals[i])]; }); }
    q = mcq("The table shows how many books each student read in October. How many books did " + students[a] + " and " + students[b] + " read in total?",
      { t: String(key), fb: "Correct: " + vals[a] + " + " + vals[b] + " = " + key + "." },
      [{ t: String(vals[c] + vals[d]), fb: "That adds " + students[c] + " and " + students[d] + ". The question names " + students[a] + " and " + students[b] + "." },
       { t: String(vals[a] + vals[c]), fb: "That adds " + students[a] + " and " + students[c] + ". The second student named is " + students[b] + "." },
       { t: String(vals[b] + vals[d]), fb: "That adds " + students[b] + " and " + students[d] + ". The first student named is " + students[a] + "." }],
      "Read the two rows and add: \\(" + vals[a] + " + " + vals[b] + " = " + key + "\\). The answer is <b>" + key + "</b>.",
      { students: students, vals: vals, key: key });
  }
  q.figure = u7tableSVG("Student", ["Books"], rows);
  return q;
}

function pk7tgBarGen() {
  var cats = ["Soccer", "Hockey", "Dance", "Swimming"];
  var vals = [], guard = 0;
  while (vals.length < 4 && guard++ < 400) { var v = ri(2, 8) * 5; if (vals.indexOf(v) < 0) vals.push(v); }
  while (vals.length < 4) vals.push(45 + vals.length * 5);
  var t = ri(0, 3), key = vals[t];
  var candB = [
    { t: String(key + 5), fb: "That is one scale step too high: the bar's top lines up with the mark below that." },
    { t: String(key - 5), fb: "That is one scale step too low: the bar's top lines up with the mark above that." }
  ];
  vals.forEach(function (v, i) { if (i !== t) candB.push({ t: String(v), fb: "That is the value of the " + cats[i] + " bar. Read the " + cats[t] + " bar against the scale." }); });
  candB.push({ t: String(key + 10), fb: "That is two scale steps too high: the bar's top lines up with " + key + "." });
  var seenB = {}; seenB[String(key)] = 1;
  var dsB = [];
  candB.forEach(function (cd) { if (!seenB[cd.t] && dsB.length < 3) { seenB[cd.t] = 1; dsB.push(cd); } });
  var q = mcq("The bar graph shows how many students chose each activity. How many students chose " + cats[t] + "?",
    { t: String(key), fb: "Correct: the top of the " + cats[t] + " bar lines up with " + key + " on the scale." },
    dsB,
    "Read the height of the " + cats[t] + " bar against the scale on the left: it reaches <b>" + key + "</b>.",
    { cats: cats, vals: vals, key: key });
  q.figure = pk7barRead(cats, vals, 5, "Students");
  return q;
}

function pk7tgLineGen() {
  var weeks = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
  var vals = [], i;
  for (i = 0; i < 5; i++) vals.push(ri(2, 9) * 2);
  var incMode = Math.random() < 0.45, q;
  if (!incMode) {
    var t = ri(0, 4), key = vals[t], guard = 0;
    var other = vals[(t + 2) % 5];
    while (other === key && guard++ < 60) { vals[(t + 2) % 5] = key + 2; other = vals[(t + 2) % 5]; }
    var candL = [
      { t: (key + 2) + " cm", fb: "That is one scale step too high: follow the point across to the scale." },
      { t: (key - 2) + " cm", fb: "That is one scale step too low: follow the point across to the scale." },
      { t: other + " cm", fb: "That is the height at " + weeks[(t + 2) % 5] + ". Read the point above " + weeks[t] + "." },
      { t: vals[(t + 1) % 5] + " cm", fb: "That is the height at " + weeks[(t + 1) % 5] + ". Read the point above " + weeks[t] + "." },
      { t: (key + 4) + " cm", fb: "That is two scale steps too high: follow the point across to the scale." }
    ];
    var seenL = {}; seenL[key + " cm"] = 1;
    var dsL = [];
    candL.forEach(function (cd) { if (!seenL[cd.t] && dsL.length < 3) { seenL[cd.t] = 1; dsL.push(cd); } });
    q = mcq("The line graph shows the height of a bean plant at the end of each week. How tall was the plant at the end of " + weeks[t] + "?",
      { t: key + " cm", fb: "Correct: the point above " + weeks[t] + " sits at " + key + " on the height scale." },
      dsL,
      "Find the point above " + weeks[t] + " and read across to the scale: <b>" + key + " cm</b>.",
      { weeks: weeks, vals: vals, key: key });
  } else {
    var a = ri(0, 2), b = a + ri(1, 2), guard2 = 0;
    while (vals[b] <= vals[a] && guard2++ < 60) { vals[b] = vals[a] + ri(1, 3) * 2; }
    var key2 = vals[b] - vals[a];
    var candG = [
      { t: vals[b] + " cm", fb: "That is the height at " + weeks[b] + ", not the growth. Subtract the starting height." },
      { t: vals[a] + " cm", fb: "That is the height at " + weeks[a] + ", not the growth. Subtract it from the later height." },
      { t: (key2 + 2) + " cm", fb: "Check the two heights on the scale: " + vals[a] + " cm and " + vals[b] + " cm; their difference is " + key2 + " cm." },
      { t: (vals[a] + vals[b]) + " cm", fb: "That adds the two heights. Growth is a difference: subtract the starting height." }
    ];
    if (key2 - 2 > 0) candG.push({ t: (key2 - 2) + " cm", fb: "Check the two heights on the scale: " + vals[a] + " cm and " + vals[b] + " cm; their difference is " + key2 + " cm." });
    var seenG = {}; seenG[key2 + " cm"] = 1;
    var dsG = [];
    candG.forEach(function (cd) { if (!seenG[cd.t] && dsG.length < 3) { seenG[cd.t] = 1; dsG.push(cd); } });
    q = mcq("The line graph shows the height of a bean plant at the end of each week. By how much did the plant grow from " + weeks[a] + " to " + weeks[b] + "?",
      { t: key2 + " cm", fb: "Correct: " + vals[b] + " - " + vals[a] + " = " + key2 + "." },
      dsG,
      "Read both heights and subtract: \\(" + vals[b] + " - " + vals[a] + " = " + key2 + "\\). The plant grew <b>" + key2 + " cm</b>.",
      { weeks: weeks, vals: vals, key: key2 });
  }
  q.figure = pk7lineRead(weeks, vals, 2, "Height (cm)");
  return q;
}

E("u1-pk-tg-table", 1, ["7.5"], 2, "gen", pk7tgTableGen,
  ["Find the row (or rows) the question names before reading any numbers.", "A total question needs two rows added."]);

E("u1-pk-tg-picto", 1, ["7.5"], 1, "gen", function () {
  var cats = ["Apples", "Bananas", "Oranges", "Pears"];
  var counts = [], guard = 0;
  while (counts.length < 4 && guard++ < 400) { var c = ri(3, 7); if (counts.indexOf(c) < 0) counts.push(c); }
  while (counts.length < 4) counts.push(8 + counts.length);
  var t = ri(0, 3), key = counts[t] * 2;
  var candP = [
    { t: String(counts[t]), fb: "That counts the symbols but forgets the key: each symbol stands for 2 votes, not 1." },
    { t: String(key + 2), fb: "Count the symbols again: there are " + counts[t] + ", and " + counts[t] + " x 2 = " + key + "." },
    { t: String(counts[(t + 1) % 4] * 2), fb: "That is the total for " + cats[(t + 1) % 4] + ". Count the symbols in the " + cats[t] + " row." },
    { t: String(counts[(t + 2) % 4] * 2), fb: "That is the total for " + cats[(t + 2) % 4] + ". Count the symbols in the " + cats[t] + " row." },
    { t: String(key - 2), fb: "Count the symbols again: there are " + counts[t] + ", and " + counts[t] + " x 2 = " + key + "." }
  ];
  var seenP = {}; seenP[String(key)] = 1;
  var dsP = [];
  candP.forEach(function (cd) { if (!seenP[cd.t] && dsP.length < 3) { seenP[cd.t] = 1; dsP.push(cd); } });
  var q = mcq("In the pictograph, each symbol stands for 2 votes. How many votes did " + cats[t] + " get?",
    { t: String(key), fb: "Correct: " + counts[t] + " symbols at 2 votes each is " + counts[t] + " x 2 = " + key + " votes." },
    dsP,
    "Count the symbols for " + cats[t] + ": " + counts[t] + ". Each stands for 2 votes: \\(" + counts[t] + " \\times 2 = " + key + "\\). The answer is <b>" + key + "</b>.",
    { cats: cats, counts: counts, key: key });
  q.figure = pk7picto(cats.map(function (c, i) { return { label: c, count: counts[i] }; }));
  return q;
}, ["Read the key first: it tells what one symbol stands for.", "Count the symbols, then multiply by the key's value."]);

E("u1-pk-tg-bar", 1, ["7.5"], 1, "gen", pk7tgBarGen,
  ["Run your eye from the top of the bar across to the scale.", "The scale counts in steps: check the step size first."]);

E("u1-pk-tg-line", 1, ["7.5"], 2, "gen", pk7tgLineGen,
  ["Find the point above the label named, then read across to the scale.", "Growth is a difference: read both heights and subtract."]);

E("u1-pk-tg-compare", 1, ["7.5"], 2, "gen", function () {
  var cats = ["Grade 5", "Grade 6", "Grade 7", "Grade 8"];
  var vals = [], guard = 0;
  while (vals.length < 4 && guard++ < 400) { var v = ri(3, 9) * 5; if (vals.indexOf(v) < 0) vals.push(v); }
  while (vals.length < 4) vals.push(50 + vals.length * 5);
  var a = ri(0, 3), b = ri(0, 3);
  while (b === a) b = ri(0, 3);
  var hi = Math.max(vals[a], vals[b]), lo = Math.min(vals[a], vals[b]), key = hi - lo;
  var hiCat = vals[a] > vals[b] ? cats[a] : cats[b], loCat = vals[a] > vals[b] ? cats[b] : cats[a];
  var candC = [
    { t: String(hi + lo), fb: "That adds the two bars. 'How many more' asks for the difference." },
    { t: String(hi), fb: "That is the " + hiCat + " bar alone. Subtract the " + loCat + " bar as well." },
    { t: String(lo), fb: "That is the " + loCat + " bar alone. Subtract it from the " + hiCat + " bar." },
    { t: String(key + 5), fb: "That is one scale step more than the difference. Subtract again: " + hi + " - " + lo + "." }
  ];
  var seenC = {}; seenC[String(key)] = 1;
  var dsC = [];
  candC.forEach(function (cd) { if (!seenC[cd.t] && dsC.length < 3) { seenC[cd.t] = 1; dsC.push(cd); } });
  var q = mcq("The bar graph shows how many books each grade borrowed from the library. How many more books did " + hiCat + " borrow than " + loCat + "?",
    { t: String(key), fb: "Correct: " + hi + " - " + lo + " = " + key + "." },
    dsC,
    "Read both bars and subtract: \\(" + hi + " - " + lo + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { cats: cats, vals: vals, key: key });
  q.figure = pk7barRead(cats, vals, 5, "Books");
  return q;
}, ["Read both bars against the scale first.", "'How many more' means subtract the smaller from the larger."]);

/* ================= Cluster 7-C4 top-ups =================
   Cluster 7-C4's support set (the four Unit 6 one-step entries)
   is flagged in PKT7_P3. The two authored top-ups below complete
   the cluster, housed in Unit 6's pool only (specification
   Section 13, Decision 5).

   EQUALITY AS BALANCE (equality-balance, Unit 6, 3 entries, all
   authored): what keeps both sides of an equation equal.
   Grounding: MA6.8.2 to MA6.8.5 (preservation of equality).
   Supports (pkFor): 8.1, 8.2, 8.3. */

E("u6-pk-balance-value", 6, ["8.1"], 1, "gen", function () {
  var mode = pick(["xa", "ax", "xminus"]);
  var a, x;
  if (mode === "xminus") { a = ri(3, 9); x = ri(a + 2, 15); }
  else { a = ri(3, 12); x = ri(4, 15); var guard = 0; while (a === x && guard++ < 60) { x = ri(4, 15); } }
  var expr, val;
  if (mode === "xa") { expr = "n + " + a; val = x + a; }
  else if (mode === "ax") { expr = a + " + n"; val = x + a; }
  else { expr = "n - " + a; val = x - a; }
  var ds = pk7uniq(x, [val, x + 1, x - 1]).slice(0, 3);
  return mcq("What is the value of \\(n\\) in the equation \\(" + expr + " = " + val + "\\)?",
    { t: String(x), fb: "Correct: substituting " + x + " makes both sides equal to " + val + "." },
    ds.map(function (d) { return { t: String(d), fb: d === val ? "That is the value of the whole side, not of n. Work backwards from " + val + "." : "Substitute it and check: the two sides do not balance. Work backwards from " + val + "." }; }),
    "Work backwards: " + (mode === "xminus" ? "n is " + a + " more than " + val + ", so n = " + val + " + " + a + " = " + x : "n is " + a + " less than " + val + ", so n = " + val + " - " + a + " = " + x) + ". The answer is <b>" + x + "</b>.",
    { a: a, x: x, mode: mode });
}, ["Think of the equation as a balance: the two sides must stay equal.", "Work backwards from the side you know completely."]);

E("u6-pk-balance-change", 6, ["8.1"], 2, "gen", function () {
  var a = ri(3, 9), b = ri(3, 9), c = pick([3, 4, 6, 10]);
  var sum = a + b;
  return mcq("A student adds " + c + " to the left side of the equation \\(" + a + " + " + b + " = " + sum + "\\). To keep the equation balanced, what must be done to the right side?",
    { t: "Add " + c + " to the right side too", fb: "Correct: whatever is done to one side of an equation must be done to the other, or the sides stop balancing." },
    [{ t: "Take " + c + " from the right side", fb: "That changes the right side the opposite way; the sides would differ by twice as much." },
     { t: "Add " + c + " to the left side again", fb: "That changes the left side twice and the right side not at all; the balance is lost." },
     { t: "Leave the right side as it is", fb: "Then the left side is " + c + " more than the right, and the equation no longer balances." }],
    "An equation balances only when both sides stay equal. Adding " + c + " to one side means <b>adding " + c + " to the right side too</b>.",
    { a: a, b: b, c: c });
}, ["Picture a balance scale: change one pan and the other must match.", "Equal changes to both sides keep an equation true."]);

E("u6-pk-balance-equivalent", 6, ["8.1"], 2, "gen", function () {
  var a = ri(3, 9), sol = ri(4, 12), b = a + sol, c = ri(2, 6);
  return mcq("Which equation has the same solution as \\(n + " + a + " = " + b + "\\)?",
    { t: "\\(n + " + (a + c) + " = " + (b + c) + "\\)", fb: "Correct: " + c + " is added to both sides, so the equation still balances with the same solution." },
    [{ t: "\\(n + " + (a + c) + " = " + b + "\\)", fb: "That adds " + c + " to the left side only; the sides no longer balance for the same n." },
     { t: "\\(n + " + a + " = " + (b + c) + "\\)", fb: "That adds " + c + " to the right side only; the sides no longer balance for the same n." },
     { t: "\\(n + " + (a + c) + " = " + (b - c) + "\\)", fb: "That adds " + c + " to one side and subtracts it from the other; the changes must match." }],
    "Adding the same number to both sides keeps an equation's solution: \\(n + " + a + " = " + b + "\\) becomes <b>\\(n + " + (a + c) + " = " + (b + c) + "\\)</b>.",
    { a: a, b: b, c: c });
}, ["The same change must happen to both sides.", "Check each choice: was exactly the same thing done on the left and on the right?"]);

/* SUBSTITUTION (substitution, Unit 6, 3 entries, all authored):
   evaluate an expression or complete a table for a given value.
   Grounding: MA6.8.6 (substitution into expressions), with the
   table item on MA4.8.10 (connecting representations). Supports
   (pkFor): 8.1, 8.14, 8.17. The strand's substitution group from
   Piece 1 is housed in Unit 2; this top-up is the cluster 7-C4
   set, housed in Unit 6. */

E("u6-pk-subst-simple", 6, ["8.1"], 1, "gen", function () {
  var minus = Math.random() < 0.45;
  var a = minus ? ri(3, 9) : ri(2, 9), n = ri(3, 9), b = ri(2, 12);
  var key = minus ? a * n - b : a * n + b;
  var ds = minus
    ? [a * n, a * n + b, (a - 1) * n - b]
    : [a * n, a + n + b, (a + 1) * n + b];
  ds = pk7fill(key, pk7uniq(key, ds)).slice(0, 3);
  return mcq("If \\(n = " + n + "\\), what is the value of \\(" + a + "n " + (minus ? "-" : "+") + " " + b + "\\)?",
    { t: String(key), fb: "Correct: " + a + "n means " + a + " x " + n + " = " + (a * n) + ", then " + (minus ? "subtract" : "add") + " " + b + "." },
    ds.map(function (d) { return { t: String(d), fb: "Substitute first: " + a + "n is " + a + " x " + n + " = " + (a * n) + ". Then " + (minus ? "subtract" : "add") + " " + b + "." }; }),
    "Substitute \\(n = " + n + "\\): \\(" + a + " \\times " + n + " " + (minus ? "-" : "+") + " " + b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, n: n, b: b, minus: minus });
}, ["Replace the letter with its value everywhere it appears.", "Remember that 3n means 3 times n, not 3 plus n."]);

E("u6-pk-subst-brackets", 6, ["8.1"], 2, "gen", function () {
  var a = pick([2, 3, 4]), n = ri(3, 8), b = ri(2, 6);
  var key = a * (n + b);
  var ds = pk7uniq(key, [a * n + b, n + b, a + n + b]).slice(0, 3);
  return mcq("If \\(x = " + n + "\\), what is the value of \\(" + a + "(x + " + b + ")\\)?",
    { t: String(key), fb: "Correct: brackets first: " + n + " + " + b + " = " + (n + b) + ", then " + a + " x " + (n + b) + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === a * n + b ? "That multiplies before doing the brackets. Brackets come first: " + n + " + " + b + " = " + (n + b) + "." : "Work the brackets first: substitute " + n + " for x, add " + b + ", then multiply by " + a + "." }; }),
    "Substitute and do the brackets first: \\(" + a + "(" + n + " + " + b + ") = " + a + " \\times " + (n + b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, n: n, b: b });
}, ["Substitute the value, then follow the order of operations.", "Brackets are worked before multiplication."]);

E("u6-pk-subst-table", 6, ["8.1"], 2, "gen", function () {
  var k = pick([2, 3]), c = ri(1, 5), guard = 0;
  while (k === c && guard++ < 60) { c = ri(1, 5); }
  if (k === c) c = k === 2 ? 3 : 2;
  var ys = [1, 2, 3, 4].map(function (x) { return k * x + c; });
  var key = ys[2];
  var ds = pk7uniq(key, [ys[3], ys[1], key - c]).slice(0, 3);
  var q = mcq("The table follows the rule \\(y = " + k + "x + " + c + "\\). What is the missing value?",
    { t: String(key), fb: "Correct: for x = 3, y = " + k + " x 3 + " + c + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === key - c ? "That multiplies only, and forgets the + " + c + " in the rule." : "That is another row's value. Substitute x = 3 into the rule." }; }),
    "Substitute \\(x = 3\\) into the rule: \\(y = " + k + " \\times 3 + " + c + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { k: k, c: c, key: key });
  q.figure = u7tableSVG("x", ["1", "2", "3", "4"], [["y", String(ys[0]), String(ys[1]), "?", String(ys[3])]]);
  return q;
}, ["Use the x value above the question mark.", "Substitute that x into the rule, multiplying first, then adding."]);

/* ================= Cluster 7-C6 =================
   FRACTION REPRESENTATION (fraction-representation, Unit 3, 5
   entries, all authored, all figure-bearing): name the fraction
   a bar, a circle, a set or a number line shows, and pick the
   diagram that shows a given fraction. Grounding: MA6.3.2 to
   MA6.3.4 (representing fractions and mixed numbers); MA4.3.13
   and MA4.3.14 (fractions on a number line, fraction strips).
   Supports (pkFor): the cluster's thirteen indicators (3.1 to
   3.6, 3.8 to 3.14). */

function pk7fracNameOpts(n, d) {
  /* Option set for "what fraction is shown" items: the key n/d,
     the unshaded part (d-n)/d, the swapped fraction d/n, and the
     part-to-part error n/(n+d). All four values are distinct
     whenever 0 < n < d and n != d - n. */
  return {
    key: u5M(n, d),
    ds: [
      { t: u5M(d - n, d), fb: "That is the fraction that is NOT shaded. Count the shaded parts over the total parts." },
      { t: u5M(d, n), fb: "That swaps the parts: the denominator (bottom) is the total number of equal parts, " + d + "." },
      { t: u5M(n, n + d), fb: "That compares the shaded parts to the unshaded parts. A fraction compares the shaded parts to ALL the parts, " + d + "." }
    ]
  };
}

E("u3-pk-fracrep-bar", 3, ["3.1"], 1, "gen", function () {
  var d = pick([4, 5, 6, 7, 8, 9]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction of the bar is shaded?",
    { t: o.key, fb: "Correct: " + n + " of the " + d + " equal parts are shaded." },
    o.ds,
    "The bar is split into " + d + " equal parts and " + n + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = u5barsSVG([{ n: n, d: d, label: "" }]);
  return q;
}, ["Count all the equal parts first: that is the denominator.", "Then count only the shaded parts: that is the numerator."]);

E("u3-pk-fracrep-circle", 3, ["3.1"], 1, "gen", function () {
  var d = pick([3, 4, 5, 6, 8]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction of the circle is shaded?",
    { t: o.key, fb: "Correct: " + n + " of the " + d + " equal sectors are shaded." },
    o.ds,
    "The circle is split into " + d + " equal sectors and " + n + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = pk7fracCirc(n, d);
  return q;
}, ["Count all the equal sectors first: that is the denominator.", "Then count only the shaded sectors: that is the numerator."]);

E("u3-pk-fracrep-set", 3, ["3.1"], 2, "gen", function () {
  var total = pick([10, 12]), shaded = ri(3, total - 3), guard = 0;
  while (shaded === total - shaded && guard++ < 60) { shaded = ri(3, total - 3); }
  if (shaded === total - shaded) shaded = 3;
  var o = pk7fracNameOpts(shaded, total);
  var q = mcq("What fraction of the counters is shaded?",
    { t: o.key, fb: "Correct: " + shaded + " of the " + total + " counters are shaded." },
    o.ds,
    "There are " + total + " counters in all and " + shaded + " are shaded, so the shaded fraction is <b>" + o.key + "</b>.",
    { n: shaded, d: total });
  q.figure = pk7setFig(total, shaded);
  return q;
}, ["The denominator is the whole set: count every counter.", "The numerator counts only the shaded counters."]);

E("u3-pk-fracrep-pick", 3, ["3.1"], 2, "gen", function () {
  var d = pick([4, 5, 6]), n = ri(1, d - 1), guard = 0;
  while (u5gcd(n, d) !== 1 && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1) n = 1;
  var alts = [[n + 1 <= d - 1 ? n + 1 : n - 1, d], [n, d + 1], [d - n, d]];
  var pairs = [[n, d]].concat(alts), seen = {}, okPairs = pairs.every(function (p) { var k = p[0] + "/" + p[1]; if (seen[k]) return false; seen[k] = 1; return p[0] >= 1 && p[0] < p[1]; });
  if (!okPairs) { pairs = [[2, 5], [3, 5], [2, 6], [3, 6]]; n = 2; d = 5; }
  var order = [0, 1, 2, 3], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  var shuffled = order.map(function (k) { return pairs[k]; });
  var idx = shuffled.findIndex(function (p) { return p[0] === pairs[0][0] && p[1] === pairs[0][1]; });
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which diagram shows " + u5M(n, d) + " shaded?",
    { t: "Diagram " + labs[idx], fb: "Correct: that bar has " + pairs[0][0] + " of its " + pairs[0][1] + " equal parts shaded." },
    shuffled.map(function (p, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Diagram " + labs[k], fb: "That bar shows " + u5M(shuffled[k][0], shuffled[k][1]) + " shaded (" + shuffled[k][0] + " of " + shuffled[k][1] + " parts)." }; }),
    "The fraction " + u5M(n, d) + " needs a bar split into " + d + " equal parts with " + n + " shaded: that is <b>diagram " + labs[idx] + "</b>.",
    { pairs: shuffled, idx: idx, n: n, d: d });
  q.figure = pk7fracPickFig(shuffled);
  return q;
}, ["The denominator tells how many equal parts each bar must have.", "Then count the shaded parts in each bar with that many parts."]);

E("u3-pk-fracrep-line", 3, ["3.1"], 2, "gen", function () {
  var d = pick([4, 5, 6, 8]), n = ri(1, d - 1), guard = 0;
  while ((u5gcd(n, d) !== 1 || n === d - n) && guard++ < 120) { n = ri(1, d - 1); }
  if (u5gcd(n, d) !== 1 || n === d - n) { n = 1; }
  var o = pk7fracNameOpts(n, d);
  var q = mcq("What fraction does the marker show on the number line?",
    { t: o.key, fb: "Correct: the line is split into " + d + " equal intervals, and the marker is at the " + n + (n === 1 ? "st" : n === 2 ? "nd" : n === 3 ? "rd" : "th") + " tick." },
    o.ds,
    "From 0 to 1 there are " + d + " equal intervals, so each interval is " + u5M(1, d) + ". The marker is " + n + " intervals along: <b>" + o.key + "</b>.",
    { n: n, d: d });
  q.figure = pk7fracLine(d, n);
  return q;
}, ["Count the equal intervals between 0 and 1: that is the denominator.", "Count the intervals from 0 to the marker: that is the numerator."]);

/* EQUIVALENT FRACTIONS (equivalent-fractions, Unit 3, 5 entries,
   all authored): recognize, produce and reduce equivalent
   fractions by multiplying or dividing both parts by the same
   whole number. Grounding: MA5.3.1, MA5.3.2, MA5.3.9, MA5.3.10.
   Supports (pkFor): the cluster's thirteen indicators.
   Three of the five generators (recognize, target, divide) are
   the design first authored inside the Mathematics 8 bank under
   Decision 6 of the specification, where they stand as the
   authored source of record for this group; the Mathematics 7
   entries below reproduce those generators verbatim (only the
   unreduced-fraction helper's name differs, pk7eqf for pk8eqf),
   and the remaining two are authored new to the same design. The
   three are shared onward into Unit 5 (pkFor 6.16) for cluster
   7-C11. */

function pk7eqRecognizeGen() {
  var q = ri(4, 9), p = ri(1, q - 1), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) { p = 1; }
  var k = ri(2, 4), N = p * k, D = q * k;
  return mcq("Which fraction is equivalent to " + u5M(p, q) + "?",
    { t: pk7eqf(N, D), fb: "Correct: multiplying the numerator and the denominator of " + u5M(p, q) + " by " + k + " gives " + pk7eqf(N, D) + "." },
    [{ t: pk7eqf(N, q), fb: "That multiplies only the numerator by " + k + ". The denominator must be multiplied by " + k + " as well." },
     { t: pk7eqf(p, D), fb: "That multiplies only the denominator by " + k + ". The numerator must be multiplied by " + k + " as well." },
     { t: pk7eqf(p + 1, q + 1), fb: "That adds 1 to the numerator and the denominator. Adding the same number to both parts changes the value; multiply both by the same number instead." }],
    "Equivalent fractions come from multiplying the numerator and the denominator by the same whole number: \\[ " + FR(p, q) + " = " + FR(N, D) + " \\] The answer is <b>" + pk7eqf(N, D) + "</b>.",
    { p: p, q: q, k: k });
}

function pk7eqTargetGen() {
  var q = ri(5, 9), p = ri(2, q - 2), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(2, q - 2); }
  if (u5gcd(p, q) !== 1) { p = 2; }
  var k = ri(2, 4), D = q * k, N = p * k;
  var dB = (k > 2) ? p * (k - 1) : N + 1;
  return mcq(u5M(p, q) + " is equivalent to a fraction with denominator \\(" + D + "\\). What is that fraction?",
    { t: pk7eqf(N, D), fb: "Correct: the denominator is multiplied by " + k + ", so the numerator is multiplied by " + k + " too: " + p + " becomes " + N + "." },
    [{ t: pk7eqf(p, D), fb: "That keeps the numerator at " + p + ". When the denominator is multiplied by " + k + ", the numerator must be multiplied by " + k + " as well." },
     { t: pk7eqf(dB, D), fb: (k > 2) ? "That multiplies the numerator by " + (k - 1) + " while the denominator is multiplied by " + k + ". Both parts must be multiplied by the same number." : "That is one more than the numerator you get by scaling. Multiply " + p + " by " + k + " exactly." },
     { t: pk7eqf((p + 1) * k, D), fb: "That scales " + (p + 1) + " instead of " + p + ". Work from the given fraction: multiply its numerator by " + k + "." }],
    "The denominator " + q + " is multiplied by " + k + " to give " + D + ", so the numerator is multiplied by " + k + " as well: \\[ " + FR(p, q) + " = " + FR(N, D) + " \\] The answer is <b>" + pk7eqf(N, D) + "</b>.",
    { p: p, q: q, k: k });
}

function pk7eqDivideGen() {
  var q = ri(4, 9), p = ri(2, q - 1), g0 = 0;
  while (u5gcd(p, q) !== 1 && g0++ < 60) { p = ri(2, q - 1); }
  if (u5gcd(p, q) !== 1) { p = 2; }
  var k = ri(2, 4), N = p * k, D = q * k;
  return mcq("Divide the numerator and the denominator of " + pk7eqf(N, D) + " by \\(" + k + "\\). What fraction do you get?",
    { t: pk7eqf(p, q), fb: "Correct: " + N + " divided by " + k + " is " + p + ", and " + D + " divided by " + k + " is " + q + "." },
    [{ t: pk7eqf(p, D), fb: "That divides only the numerator by " + k + ". The denominator must be divided by " + k + " as well." },
     { t: pk7eqf(N, q), fb: "That divides only the denominator by " + k + ". The numerator must be divided by " + k + " as well." },
     { t: pk7eqf(N - k, D - k), fb: "That subtracts " + k + " from the numerator and the denominator. Subtracting changes the value; dividing both by " + k + " keeps it." }],
    "Dividing the numerator and the denominator by the same whole number keeps the value of the fraction: \\[ " + FR(N, D) + " = " + FR(p, q) + " \\] The answer is <b>" + pk7eqf(p, q) + "</b>.",
    { p: p, q: q, k: k });
}

E("u3-pk-equiv-recognize", 3, ["3.1"], 1, "gen", pk7eqRecognizeGen,
  ["Look for the choice made by multiplying the top and the bottom by the same number.", "Adding the same number to the top and the bottom does not make an equivalent fraction."]);

E("u3-pk-equiv-target", 3, ["3.1"], 2, "gen", pk7eqTargetGen,
  ["Find what the denominator was multiplied by to reach the target denominator.", "Multiply the numerator by that same number."]);

E("u3-pk-equiv-divide", 3, ["3.1"], 2, "gen", pk7eqDivideGen,
  ["Do the same division to the top and the bottom.", "Dividing both parts by the same number keeps the fraction's value."]);

E("u3-pk-equiv-not", 3, ["3.1"], 2, "gen", function () {
  var q = pick([3, 4, 5, 6]), p = ri(1, q - 1), guard = 0;
  while (u5gcd(p, q) !== 1 && guard++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) p = 1;
  var eqs = [2, 3, 4].map(function (k) { return { t: pk7eqf(p * k, q * k), fb: "That one IS equivalent: both parts of " + u5M(p, q) + " were multiplied by " + k + "." }; });
  var notEq = { t: pk7eqf(2 * p, 2 * q + 1), fb: "Correct: this fraction's value is different. No whole number multiplies both parts of " + u5M(p, q) + " to give it." };
  var opts = eqs.concat([notEq]);
  return mcq("Which fraction is NOT equivalent to " + u5M(p, q) + "?",
    notEq, eqs,
    "Three of the choices come from multiplying both parts of " + u5M(p, q) + " by the same whole number. The remaining one, <b>" + notEq.t + "</b>, has a different value.",
    { p: p, q: q });
}, ["Check each choice: can it be made by multiplying both parts by the same whole number?", "Reduce each choice: the one that does not reduce to the given fraction is the answer."]);

E("u3-pk-equiv-missing", 3, ["3.1"], 1, "gen", function () {
  var q = pick([4, 5, 6, 8]), p = ri(1, q - 1), guard = 0;
  while (u5gcd(p, q) !== 1 && guard++ < 60) { p = ri(1, q - 1); }
  if (u5gcd(p, q) !== 1) p = 1;
  var k = ri(2, 4), D = q * k, N = p * k;
  var ds = pk7fill(N, pk7uniq(N, [p + k, N + p, N - p])).slice(0, 3);
  return mcq(u5M(p, q) + " = " + pk7eqf("?", D) + ". What is the missing numerator?",
    { t: String(N), fb: "Correct: the denominator is multiplied by " + k + ", so the numerator is too: " + p + " x " + k + " = " + N + "." },
    ds.map(function (d) { return { t: String(d), fb: "The denominator " + q + " is multiplied by " + k + " to give " + D + ". Do the same to the numerator." }; }),
    "The denominator is multiplied by " + k + ", so multiply the numerator by " + k + " as well: \\(" + p + " \\times " + k + " = " + N + "\\). The answer is <b>" + N + "</b>.",
    { p: p, q: q, k: k });
}, ["Find the multiplier from the denominators first.", "Apply the same multiplier to the numerator."]);

/* DECIMAL PLACE VALUE (decimal-place-value, Unit 3, 5 entries,
   all authored): the value of a digit, expanded form, rounding
   to tenths and hundredths, and naming the digit in a place.
   Grounding: MA5.3.15 to MA5.3.19 (decimal place value and
   comparing decimals). Supports (pkFor): the cluster's thirteen
   indicators. */

E("u3-pk-dpv-digit-value", 3, ["3.1"], 1, "gen", function () {
  var places = [
    { name: "tenths", fmtv: function (dg) { return "0." + dg; } },
    { name: "hundredths", fmtv: function (dg) { return "0.0" + dg; } },
    { name: "thousandths", fmtv: function (dg) { return "0.00" + dg; } }
  ];
  var digs, whole, guard = 0;
  do {
    whole = ri(12, 68);
    digs = [ri(1, 9), ri(1, 9), ri(1, 9)];
    var wdigs = String(whole).split("").map(Number);
    var all = digs.concat(wdigs);
    var distinct = all.every(function (v, i) { return all.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) { whole = 26; digs = [4, 7, 3]; }
  var numStr = whole + "." + digs.join("");
  var t = ri(0, 2), digit = digs[t];
  var key = places[t].fmtv(digit);
  var ds = places.map(function (pl, i) { return i; }).filter(function (i) { return i !== t; }).map(function (i) { return { t: places[i].fmtv(digit), fb: "That is the value of the digit in the " + places[i].name + " place. Find the " + digit + " in " + numStr + " and name its place." }; });
  ds.push({ t: String(digit), fb: "That is the digit's face value. Its place makes it worth much less than " + digit + "." });
  return mcq("In the number " + numStr + ", what is the value of the digit " + digit + "?",
    { t: key, fb: "Correct: the " + digit + " sits in the " + places[t].name + " place, so its value is " + key + "." },
    ds,
    "The digit " + digit + " is in the " + places[t].name + " place of " + numStr + ", so its value is <b>" + key + "</b>.",
    { numStr: numStr, digit: digit, place: places[t].name });
}, ["Find the digit in the number and name its place.", "A digit's value is the digit times the value of its place."]);

E("u3-pk-dpv-expanded", 3, ["3.1"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(1, 9), c = ri(1, 9);
  var numStr = a + "." + b + c;
  return mcq("Which is the expanded form of " + numStr + "?",
    { t: a + " + 0." + b + " + 0.0" + c, fb: "Correct: " + a + " ones, " + b + " tenths and " + c + " hundredths." },
    [{ t: a + " + 0." + b + " + 0." + c, fb: "The last digit, " + c + ", is in the hundredths place, so it is worth 0.0" + c + ", not 0." + c + "." },
     { t: a + " + 0.0" + b + " + 0.0" + c, fb: "The digit " + b + " is in the tenths place, so it is worth 0." + b + ", not 0.0" + b + "." },
     { t: (a * 10) + " + 0." + b + " + 0.0" + c, fb: "The whole-number part is " + a + ", not " + (a * 10) + ": read the number as written." }],
    "Break the number into its places: " + a + " + " + b + " tenths + " + c + " hundredths is <b>" + a + " + 0." + b + " + 0.0" + c + "</b>.",
    { a: a, b: b, c: c });
}, ["Write the value of each digit, place by place.", "Tenths are written 0.d and hundredths 0.0d."]);

E("u3-pk-dpv-round-tenth", 3, ["3.1"], 1, "gen", function () {
  var w = ri(2, 9), t = ri(1, 9), h = ri(1, 9);
  var V = w * 100 + t * 10 + h; /* the value in integer hundredths: rounding is decided on the displayed digits, never on float arithmetic */
  var keyT = Math.floor((V + 5) / 10), floorT = Math.floor(V / 10), ceilT = floorT + 1;
  var cand = [
    { val: ceilT, fb: "That rounds up, but the hundredths digit is " + h + ", which is less than 5, so the tenths digit stays." },
    { val: floorT, fb: "That keeps the tenths digit, but the hundredths digit is " + h + ", which is 5 or more, so the tenths digit goes up." },
    { val: keyT + 1, fb: "That is one tenth too far. Look at the hundredths digit only to decide." },
    { val: keyT - 1, fb: "That is one tenth too low. Look at the hundredths digit only to decide." }
  ];
  var seen = {}; seen[keyT] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.val] && ds.length < 3) { seen[cd.val] = 1; ds.push({ t: fmt(cd.val / 10, 1), fb: cd.fb }); } });
  /* The unrounded value itself is the fourth classic error. */
  if (ds.length < 3) ds.push({ t: fmt(V / 100, 2), fb: "That is the number itself, not rounded to the nearest tenth." });
  return mcq("Round " + fmt(V / 100, 2) + " to the nearest tenth.",
    { t: fmt(keyT / 10, 1), fb: "Correct: the hundredths digit is " + h + ", so " + fmt(V / 100, 2) + " rounds to " + fmt(keyT / 10, 1) + "." },
    ds,
    "Look at the hundredths digit, " + h + ": " + (h >= 5 ? "it is 5 or more, so the tenths digit rounds up" : "it is less than 5, so the tenths digit stays") + ". " + fmt(V / 100, 2) + " rounds to <b>" + fmt(keyT / 10, 1) + "</b>.",
    { v: fmt(V / 100, 2), key: fmt(keyT / 10, 1) });
}, ["Rounding to the nearest tenth is decided by the hundredths digit.", "5 or more rounds up; less than 5 stays."]);

E("u3-pk-dpv-round-hundredth", 3, ["3.1"], 2, "gen", function () {
  var w = ri(2, 9), t = ri(0, 9), h = ri(1, 9), th = ri(1, 9);
  var V = w * 1000 + t * 100 + h * 10 + th; /* the value in integer thousandths: rounding is decided on the displayed digits, never on float arithmetic */
  var keyH = Math.floor((V + 5) / 10), floorH = Math.floor(V / 10), ceilH = floorH + 1;
  var round10H = Math.floor((V + 50) / 100) * 10;
  var cand = [
    { val: floorH, dec: 2, fb: "That keeps the hundredths digit, but the thousandths digit is " + th + ", which is 5 or more, so it rounds up." },
    { val: ceilH, dec: 2, fb: "That rounds up, but the thousandths digit is " + th + ", which is less than 5, so the hundredths digit stays." },
    { val: round10H, dec: 1, fb: "That rounds to the nearest tenth. The question asks for the nearest hundredth." },
    { val: keyH + 1, dec: 2, fb: "That is one hundredth too far. Only the thousandths digit decides." },
    { val: keyH - 1, dec: 2, fb: "That is one hundredth too low. Only the thousandths digit decides." },
    { val: keyH + 2, dec: 2, fb: "That is two hundredths too far. Only the thousandths digit decides." },
    { val: keyH - 2, dec: 2, fb: "That is two hundredths too low. Only the thousandths digit decides." }
  ];
  var seen = {}; seen[keyH] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.val] && ds.length < 3) { seen[cd.val] = 1; ds.push({ t: fmt(cd.val / 100, cd.dec), fb: cd.fb }); } });
  return mcq("Round " + fmt(V / 1000, 3) + " to the nearest hundredth.",
    { t: fmt(keyH / 100, 2), fb: "Correct: the thousandths digit is " + th + ", so " + fmt(V / 1000, 3) + " rounds to " + fmt(keyH / 100, 2) + "." },
    ds,
    "Look at the thousandths digit, " + th + ": " + (th >= 5 ? "it is 5 or more, so the hundredths digit rounds up" : "it is less than 5, so the hundredths digit stays") + ". " + fmt(V / 1000, 3) + " rounds to <b>" + fmt(keyH / 100, 2) + "</b>.",
    { v: fmt(V / 1000, 3), key: fmt(keyH / 100, 2) });
}, ["Rounding to the nearest hundredth is decided by the thousandths digit.", "Keep two decimal places in the answer."]);

E("u3-pk-dpv-place-name", 3, ["3.1"], 1, "gen", function () {
  var digs, guard = 0, distinct = false;
  do {
    digs = [ri(1, 9), ri(1, 9), ri(1, 9), ri(1, 9)];
    distinct = digs.every(function (v, i) { return digs.indexOf(v) === i; });
  } while (!distinct && guard++ < 300);
  if (!distinct) digs = [5, 2, 8, 6];
  var numStr = digs[0] + "" + digs[1] + "." + digs[2] + "" + digs[3];
  var key = String(digs[3]);
  var names = ["tens", "ones", "tenths", "hundredths"];
  var ds = [0, 1, 2].map(function (i) { return { t: String(digs[i]), fb: "That digit is in the " + names[i] + " place. The hundredths place is the second digit after the decimal point." }; });
  return mcq("In the number " + numStr + ", which digit is in the hundredths place?",
    { t: key, fb: "Correct: the hundredths place is the second digit after the decimal point." },
    ds,
    "Count the places after the decimal point: " + digs[2] + " is tenths and " + digs[3] + " is hundredths. The answer is <b>" + key + "</b>.",
    { numStr: numStr, key: key });
}, ["The places after the decimal point are tenths, then hundredths.", "Count two places past the decimal point."]);

/* FRACTION AS DECIMAL (fraction-as-decimal, Unit 3, 4 entries,
   all authored): convert between fractions and decimals in the
   tenths, hundredths and simple-denominator cases. Grounding:
   MA5.5.10 and MA6.6.3 (dividing to convert); MA4.3.22, MA5.3.20
   and MA5.3.21 (relating fractions and decimals). Supports
   (pkFor): 3.8 to 3.14. */

E("u3-pk-fad-to-decimal", 3, ["3.8"], 1, "gen", function () {
  var pairs = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10]];
  var pr = pick(pairs), n = pr[0], d = pr[1], v = n / d;
  var key = fmt(v, 3);
  /* The third distractor is the next fraction up; when that is 1,
     a tenth-step value at the key's own precision takes its place,
     so the key is never the only option at its decimal precision. */
  var third = (n + 1) / d < 1
    ? { t: fmt((n + 1) / d, 3), fb: "That is the next fraction up. Divide " + n + " by " + d + " exactly." }
    : { t: fmt(v + 0.1 < 1 ? v + 0.1 : v - 0.1, 3), fb: "That is a tenth away from the fraction's value. Divide " + n + " by " + d + " exactly." };
  var ds = [
    { t: fmt(v / 10, 3), fb: "That is ten times too small: the decimal point has moved one place too far." },
    { t: "0." + n + d, fb: "That just writes the numerator and the denominator after the point. Divide the numerator by the denominator instead." },
    third
  ];
  return mcq("Write " + u5M(n, d) + " as a decimal.",
    { t: key, fb: "Correct: " + n + " divided by " + d + " is " + key + "." },
    ds,
    "A fraction is a division: \\(" + n + " \\div " + d + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { n: n, d: d, key: key });
}, ["A fraction bar means divide: numerator divided by denominator.", "Think of the denominator as splitting 1 into equal parts."]);

E("u3-pk-fad-to-fraction", 3, ["3.8"], 1, "gen", function () {
  var ab = pick([15, 25, 35, 45, 55, 65, 75, 85, 95, 20, 40, 60, 80, 30, 70, 90, 12, 18, 24, 36, 48]);
  var key = u5M(ab, 100);
  return mcq("Write 0." + ab + " as a fraction in lowest terms.",
    { t: key, fb: "Correct: 0." + ab + " is " + ab + " hundredths, and " + pk7eqf(ab, 100) + " reduces to " + key + "." },
    [{ t: pk7eqf(ab, 10), fb: "That reads the decimal as tenths. Two decimal places means hundredths: write it over 100." },
     { t: pk7eqf(ab, 1000), fb: "That reads the decimal as thousandths. Two decimal places means hundredths: write it over 100." },
     { t: pk7eqf(u5red(ab, 100)[1], u5red(ab, 100)[0]), fb: "That turns the fraction upside down. The decimal is less than 1, so the fraction must be less than 1 too." }],
    "Two decimal places are hundredths: \\(0." + ab + " = " + FR(ab, 100) + "\\), which reduces to <b>" + key + "</b>.",
    { ab: ab, key: key });
}, ["Count the decimal places: two places means hundredths.", "Write the digits over 100, then reduce."]);

E("u3-pk-fad-match", 3, ["3.8"], 2, "gen", function () {
  /* Each triple carries a wrong decimal at one decimal place and
     one at two, and distractors are shown at the KEY's precision,
     so the key is never the only option at its decimal precision. */
  var triples = [
    { n: 3, d: 4, dec: "0.75", wrong1: "0.7", wf1: "7/10", wrong2: "0.34", wf2: "17/50" },
    { n: 1, d: 2, dec: "0.5", wrong1: "0.2", wf1: "1/5", wrong2: "0.25", wf2: "1/4" },
    { n: 2, d: 5, dec: "0.4", wrong1: "0.2", wf1: "1/5", wrong2: "0.25", wf2: "1/4" },
    { n: 3, d: 10, dec: "0.3", wrong1: "0.7", wf1: "7/10", wrong2: "0.03", wf2: "3/100" },
    { n: 4, d: 5, dec: "0.8", wrong1: "0.4", wf1: "2/5", wrong2: "0.45", wf2: "9/20" },
    { n: 1, d: 4, dec: "0.25", wrong1: "0.2", wf1: "1/5", wrong2: "0.14", wf2: "7/50" },
    { n: 7, d: 10, dec: "0.7", wrong1: "0.3", wf1: "3/10", wrong2: "0.17", wf2: "17/100" }
  ];
  var pool = triples.slice(), chosen = [], guard = 0;
  while (chosen.length < 4 && guard++ < 200) { var t = pool.splice(ri(0, pool.length - 1), 1)[0]; chosen.push(t); }
  var keyT = chosen[0];
  var keyDp = keyT.dec.split(".")[1].length;
  var opts = chosen.map(function (t, i) {
    if (i === 0) return { t: pk7eqf(t.n, t.d) + " and " + t.dec, fb: "Correct: " + t.n + " divided by " + t.d + " is " + t.dec + "." };
    var w = keyDp === 1 ? t.wrong1 : t.wrong2, wf = keyDp === 1 ? t.wf1 : t.wf2;
    return { t: pk7eqf(t.n, t.d) + " and " + w, fb: w + " is " + wf + ", not " + u5M(t.n, t.d) + ". Divide the numerator by the denominator to check." };
  });
  return mcq("Which pair is equal?",
    opts[0], opts.slice(1),
    "Divide each numerator by its denominator: only " + pk7eqf(keyT.n, keyT.d) + " = " + keyT.dec + ". The answer is <b>" + pk7eqf(keyT.n, keyT.d) + " and " + keyT.dec + "</b>.",
    { key: keyT.n + "/" + keyT.d });
}, ["Check each pair by dividing the numerator by the denominator.", "Three of the pairs mix a fraction with the wrong decimal."]);

E("u3-pk-fad-line", 3, ["3.8"], 2, "gen", function () {
  function s2(x) { return x.toFixed(2); }
  var v = pick([0.15, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 0.85]);
  var q = mcq("What decimal does the marker show on the number line?",
    { t: s2(v), fb: "Correct: each small tick is 0.05, and the marker sits at " + s2(v) + "." },
    [{ t: s2(v - 0.1), fb: "That is one big tick (0.1) too low. Count the small ticks from 0: each is worth 0.05." },
     { t: s2(v + 0.1), fb: "That is one big tick (0.1) too high. Count the small ticks from 0: each is worth 0.05." },
     { t: s2(v + 0.05), fb: "That is one small tick too far. The marker is on the tick just before that." }],
    "The line runs from 0 to 1 with small ticks every 0.05. Counting ticks to the marker gives <b>" + s2(v) + "</b>.",
    { v: s2(v) });
  q.figure = pk7decLine(v);
  return q;
}, ["Work out what one small tick is worth first.", "Count ticks from 0 to the marker and multiply."]);

/* ================= Cluster 7-C7 top-ups =================
   Cluster 7-C7's support set (the six Unit 3 decimal entries)
   is flagged in PKT7_P3. The authored top-ups below complete
   the cluster.

   ESTIMATION (estimation, Unit 3, 4 entries, all authored):
   round first, then compute, for sums, differences, products
   and money. Grounding: MA5.5.26 (front-end and rounding
   strategies); MA4.4.2. Supports (pkFor): 6.1, 6.2, 6.3. */

E("u3-pk-est-add", 3, ["6.1"], 1, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var a, b, key, exact, fl, guard = 0, okSet = false;
  do {
    a = ri(35, 88); b = ri(24, 76);
    key = r10(a) + r10(b); exact = a + b; fl = f10(a) + f10(b);
    var vals = [key, exact, fl, key + 10];
    okSet = (a % 10 !== 0 && b % 10 !== 0) && vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { a = 47; b = 38; key = 90; exact = 85; fl = 80; }
  return mcq("Estimate " + a + " + " + b + " by rounding each number to the nearest ten.",
    { t: String(key), fb: "Correct: " + a + " rounds to " + r10(a) + " and " + b + " rounds to " + r10(b) + ", and " + r10(a) + " + " + r10(b) + " = " + key + "." },
    [{ t: String(exact), fb: "That is the exact answer. An estimate rounds first, then adds." },
     { t: String(fl), fb: "That rounds both numbers down. Round each to the NEAREST ten instead." },
     { t: String(key + 10), fb: "That is 10 too high. Check the two rounded numbers before adding." }],
    "Round first: \\(" + a + " \\approx " + r10(a) + "\\) and \\(" + b + " \\approx " + r10(b) + "\\). Then \\(" + r10(a) + " + " + r10(b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b, key: key });
}, ["Round each number before you add.", "Nearest ten: ones digit 5 or more rounds up."]);

E("u3-pk-est-product", 3, ["6.1"], 2, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var n = ri(12, 29), m = ri(3, 9), guard = 0;
  while ((n % 10 === 0 || n % 10 === 5) && guard++ < 60) { n = ri(12, 29); }
  var key = r10(n) * m;
  var cand = [
    { val: n * m, fb: "That is the exact product. An estimate rounds " + n + " first, then multiplies." },
    { val: f10(n) * m, fb: "That rounds " + n + " down to " + f10(n) + ". Round to the NEAREST ten, which is " + r10(n) + "." },
    { val: (f10(n) + 10) * m, fb: "That rounds " + n + " up to " + (f10(n) + 10) + ". Its nearest ten is " + r10(n) + "." },
    { val: key + r10(n), fb: "That multiplies correctly and then adds an extra group of " + r10(n) + "." },
    { val: key - r10(n), fb: "That multiplies correctly and then leaves out a group of " + r10(n) + "." }
  ];
  var seen = {}; seen[String(key)] = 1;
  var ds = [];
  cand.forEach(function (cd) { var s = String(cd.val); if (!seen[s] && ds.length < 3) { seen[s] = 1; ds.push({ t: s, fb: cd.fb }); } });
  return mcq("Estimate " + n + " x " + m + " by rounding " + n + " to the nearest ten.",
    { t: String(key), fb: "Correct: " + n + " rounds to " + r10(n) + ", and " + r10(n) + " x " + m + " = " + key + "." },
    ds,
    "Round first: \\(" + n + " \\approx " + r10(n) + "\\). Then \\(" + r10(n) + " \\times " + m + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { n: n, m: m, key: key });
}, ["Round the two-digit number to the nearest ten first.", "Then multiply the rounded number."]);

E("u3-pk-est-difference", 3, ["6.1"], 1, "gen", function () {
  function r10(x) { return Math.round(x / 10) * 10; }
  function f10(x) { return Math.floor(x / 10) * 10; }
  var a, b, key, exact, fl, guard = 0, okSet = false;
  do {
    a = ri(52, 98); b = ri(23, 67);
    key = r10(a) - r10(b); exact = a - b; fl = f10(a) - f10(b);
    var vals = [key, exact, fl, key + 10];
    okSet = a - b > 20 && vals.every(function (v, i) { return vals.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { a = 87; b = 34; key = 60; exact = 53; fl = 50; }
  return mcq("Estimate " + a + " - " + b + " by rounding each number to the nearest ten.",
    { t: String(key), fb: "Correct: " + a + " rounds to " + r10(a) + " and " + b + " rounds to " + r10(b) + ", and " + r10(a) + " - " + r10(b) + " = " + key + "." },
    [{ t: String(exact), fb: "That is the exact answer. An estimate rounds first, then subtracts." },
     { t: String(fl), fb: "That rounds both numbers down. Round each to the NEAREST ten instead." },
     { t: String(key + 10), fb: "That is 10 too high. Check the two rounded numbers before subtracting." }],
    "Round first: \\(" + a + " \\approx " + r10(a) + "\\) and \\(" + b + " \\approx " + r10(b) + "\\). Then \\(" + r10(a) + " - " + r10(b) + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: a, b: b, key: key });
}, ["Round each number before you subtract.", "Nearest ten: ones digit 5 or more rounds up."]);

E("u3-pk-est-money", 3, ["6.1"], 2, "gen", function () {
  var cents = [0.15, 0.35, 0.49, 0.55, 0.75, 0.90, 0.95];
  function money(x) { return "$" + x.toFixed(2).replace(/\.00$/, ""); }
  var prices, key, fl, exact, guard = 0, okSet = false;
  do {
    prices = [0, 1, 2].map(function () { return ri(2, 8) + pick(cents); });
    if (!prices.some(function (p) { return p % 1 >= 0.5; })) prices[0] = Math.floor(prices[0]) + 0.75;
    key = prices.reduce(function (s, p) { return s + Math.round(p); }, 0);
    fl = prices.reduce(function (s, p) { return s + Math.floor(p); }, 0);
    exact = prices.reduce(function (s, p) { return s + p; }, 0);
    var disp = ["$" + key, "$" + fl, money(exact), "$" + (key + 1)];
    okSet = disp.every(function (v, i) { return disp.indexOf(v) === i; });
  } while (!okSet && guard++ < 300);
  if (!okSet) { prices = [2.75, 3.49, 4.90]; key = 11; fl = 9; exact = 11.14; }
  var ds = [
    { t: money(exact), fb: "That is the exact total. An estimate rounds each price to the nearest dollar first." },
    { t: "$" + fl, fb: "That rounds every price down. Round each to the NEAREST dollar instead." },
    { t: "$" + (key + 1), fb: "That is a dollar too high. Check each price's nearest dollar before adding." }
  ];
  return mcq("Three items cost " + prices.map(money).join(", ") + ". About how much do they cost in total?",
    { t: "$" + key, fb: "Correct: the prices round to " + prices.map(function (p) { return "$" + Math.round(p); }).join(", ") + ", which add to $" + key + "." },
    ds,
    "Round each price to the nearest dollar: " + prices.map(function (p) { return money(p) + " is about $" + Math.round(p); }).join(", ") + ". The total is about <b>$" + key + "</b>.",
    { prices: prices.map(money), key: key });
}, ["Round each price to the nearest dollar first.", "Then add the rounded prices."]);

/* PERCENT AS PART OF 100 (percent-base, Unit 3, 4 entries, all
   authored, two of them figure-bearing on hundred grids):
   percent means out of 100, read from a hundredths grid and
   converted from simple fractions and decimals. Grounding:
   MA6.3.8 to MA6.3.13 (first exposure to percent; the hundredths
   grid at MA6.3.11 and MA6.3.12). Supports (pkFor): 3.7, 6.11,
   6.12. Percent of a quantity is not built anywhere in this
   piece (specification Section 13, Decision 1). */

E("u3-pk-pct-grid", 3, ["3.7"], 1, "gen", function () {
  var n = pick([15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85]);
  var cand = [n - 10, n + 10, 100 - n, n - 20, n + 20];
  var seen = {}; seen[n] = 1;
  var ds = [];
  cand.forEach(function (v) { if (v > 0 && v < 100 && !seen[v] && ds.length < 3) { seen[v] = 1; ds.push({ t: v + "%", fb: "Count the shaded squares again: the grid has 100 squares in all." }); } });
  var q = mcq("The hundred grid has some squares shaded. What percent of the grid is shaded?",
    { t: n + "%", fb: "Correct: " + n + " of the 100 squares are shaded, and percent means out of 100." },
    ds,
    "The grid holds 100 squares and " + n + " are shaded. Percent means out of 100, so the shaded part is <b>" + n + "%</b>.",
    { n: n });
  q.figure = pk7hundred(n);
  return q;
}, ["The whole grid is 100 squares: that is the whole.", "Count the shaded squares; that count is the percent."]);

E("u3-pk-pct-pick", 3, ["3.7"], 2, "gen", function () {
  var P = pick([25, 35, 45, 60, 70, 80]);
  var counts = [P, P - 10, P + 10, 100 - P], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = counts[i]; counts[i] = counts[j]; counts[j] = tmp; }
  var idx = counts.indexOf(P);
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which grid shows " + P + "% shaded?",
    { t: "Grid " + labs[idx], fb: "Correct: that grid has " + P + " of its 100 squares shaded." },
    counts.map(function (c, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Grid " + labs[k], fb: "That grid has " + counts[k] + " squares shaded, which is " + counts[k] + "%." }; }),
    "Percent means out of 100, so " + P + "% needs " + P + " of the 100 squares shaded: that is <b>grid " + labs[idx] + "</b>.",
    { counts: counts, idx: idx, P: P });
  q.figure = pk7hundredPick(counts);
  return q;
}, ["The percent is the count of shaded squares out of 100.", "Count the shaded squares in each grid."]);

E("u3-pk-pct-fraction", 3, ["3.7"], 1, "gen", function () {
  var pairs = [[1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [3, 10], [7, 10], [9, 10], [7, 20], [9, 20], [3, 20]];
  var pr = pick(pairs), n = pr[0], d = pr[1], pct = n * 100 / d;
  var cand = [
    { t: n + "%", fb: "That is just the numerator. Percent compares the part to 100, not to " + d + "." },
    { t: d + "%", fb: "That is just the denominator. Work out how many hundredths the fraction is worth." },
    { t: (100 - pct) + "%", fb: "That is the percent NOT shaded by the fraction: it is the complement of the answer." },
    { t: (pct + 10) + "%", fb: "That is 10 too high. Scale the fraction up to a denominator of 100." }
  ];
  var seen = {}; seen[pct + "%"] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.t] && ds.length < 3) { seen[cd.t] = 1; ds.push(cd); } });
  return mcq("Write " + u5M(n, d) + " as a percent.",
    { t: pct + "%", fb: "Correct: " + u5M(n, d) + " is " + pct + " out of 100." },
    ds,
    "Scale the fraction to a denominator of 100: \\(" + FR(n, d) + " = " + FR(pct, 100) + "\\), and " + pct + " out of 100 is <b>" + pct + "%</b>.",
    { n: n, d: d, pct: pct });
}, ["Percent means out of 100: give the fraction a denominator of 100.", "Multiply the top and the bottom by the same number to reach 100."]);

E("u3-pk-pct-decimal", 3, ["3.7"], 2, "gen", function () {
  var v = pick([0.07, 0.15, 0.3, 0.45, 0.62, 0.8, 0.95, 0.04, 0.55, 0.71]);
  var pct = Math.round(v * 100);
  return mcq("Write " + fmt(v, 2) + " as a percent.",
    { t: pct + "%", fb: "Correct: multiply by 100 (move the decimal point two places right): " + fmt(v, 2) + " is " + pct + "%." },
    [{ t: fmt(v * 10, 1) + "%", fb: "That moves the point only one place. Percent needs two places: multiply by 100." },
     { t: fmt(v, 2) + "%", fb: "That just adds the % sign. The number itself must be multiplied by 100." },
     { t: (pct * 10) + "%", fb: "That moves the point three places. Percent needs exactly two: multiply by 100." }],
    "To change a decimal to a percent, multiply by 100: \\(" + fmt(v, 2) + " \\times 100 = " + pct + "\\). The answer is <b>" + pct + "%</b>.",
    { v: fmt(v, 2), pct: pct });
}, ["Percent means out of 100, so multiply the decimal by 100.", "Multiplying by 100 moves the decimal point two places right."]);

/* ================= Cluster 7-C10 =================
   PROTRACTOR (protractor, Unit 4, 5 entries, all authored, all
   figure-bearing): read an angle's measure from a drawn
   protractor, on either scale. Grounding: MA6.9.13 and MA6.9.14
   (protractor use). Supports (pkFor): 11.1 to 11.5, 9.13. Three
   of the five generators are shared with Unit 8 for cluster
   7-C14. The figures use a semicircular protractor scale; the
   Grade 6 guide's recommendation of a circular protractor for
   first teaching is a teaching-sequence note, and the reading
   skill is the same on the semicircular tool students meet from
   Grade 7 on. */

function pk7ptOpts(deg, step) {
  return [
    { t: (deg - step) + "°", fb: "That is one scale step too low. Read where the slanted ray crosses the scale." },
    { t: (deg + step) + "°", fb: "That is one scale step too high. Read where the slanted ray crosses the scale." },
    { t: (180 - deg) + "°", fb: "That is the reading from the wrong zero: it is the supplement of the angle. Start from the zero on the side of the flat ray." }
  ];
}

function pk7ptAcuteGen() {
  var deg = pick([20, 30, 40, 50, 60, 70, 80]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: starting from the zero on the right, the slanted ray crosses the scale at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "Place the zero of the scale on the flat ray and read where the slanted ray crosses: <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

function pk7ptObtuseGen() {
  var deg = pick([100, 110, 120, 130, 140, 150, 160]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: starting from the zero on the right, the slanted ray crosses the scale at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "Place the zero of the scale on the flat ray and read where the slanted ray crosses: <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

function pk7ptFiveGen() {
  var deg = pick([25, 35, 45, 55, 65, 75, 85, 95, 105, 115, 125, 135, 145, 155]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: the slanted ray crosses the scale at " + deg + "°, halfway between two numbered marks." },
    pk7ptOpts(deg, 5),
    "The numbered marks are 10° apart and the small marks are 5°. The slanted ray crosses at <b>" + deg + "°</b>.",
    { deg: deg });
  q.figure = pk7protractor(deg, false);
  return q;
}

E("u4-pk-protractor-acute", 4, ["11.1"], 1, "gen", pk7ptAcuteGen,
  ["Start from the zero on the same side as the flat ray.", "Follow the slanted ray out to the scale and read the number there."]);

E("u4-pk-protractor-obtuse", 4, ["11.1"], 1, "gen", pk7ptObtuseGen,
  ["An obtuse angle measures more than 90°: use the scale that starts at the flat ray's zero.", "Follow the slanted ray out to the scale and read the number there."]);

E("u4-pk-protractor-five", 4, ["11.1"], 2, "gen", pk7ptFiveGen,
  ["The small marks between the numbers are worth 5° each.", "Read the numbered mark before the ray, then add the small steps."]);

E("u4-pk-protractor-left", 4, ["11.1"], 2, "gen", function () {
  var deg = pick([30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150]);
  var q = mcq("What is the measure of the angle shown?",
    { t: deg + "°", fb: "Correct: this protractor's zero is on the left, where the flat ray points, and the slanted ray crosses at " + deg + "°." },
    pk7ptOpts(deg, 10),
    "The flat ray points left, so read the scale that starts at the left zero: the slanted ray crosses at <b>" + deg + "°</b>.",
    { deg: deg, mirror: true });
  q.figure = pk7protractor(deg, true);
  return q;
}, ["Find the zero on the side the flat ray points to.", "A protractor carries two scales: use the one starting at that zero."]);

E("u4-pk-protractor-supplement", 4, ["11.1"], 2, "gen", function () {
  var deg = pick([110, 120, 130, 140, 150, 160]);
  var key = 180 - deg;
  var q = mcq("The angle shown is on a straight line with its supplement. What is the measure of the supplement?",
    { t: key + "°", fb: "Correct: the angle shown measures " + deg + "°, and angles on a straight line add to 180°: 180 - " + deg + " = " + key + "." },
    [{ t: deg + "°", fb: "That is the measure of the angle shown itself. The supplement is what must be added to reach 180°." },
     { t: (key + 10) + "°", fb: "That is 10 too high. Read the shown angle again, then subtract it from 180." },
     { t: (key - 10) + "°", fb: "That is 10 too low. Read the shown angle again, then subtract it from 180." }],
    "Read the shown angle from the protractor: " + deg + "°. Angles on a straight line add to 180°, so the supplement is \\(180 - " + deg + " = " + key + "\\)°. The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7protractor(deg, false);
  return q;
}, ["First read the angle that is shown.", "Supplementary angles add to 180°: subtract."]);

/* ANGLE FACTS, Unit 4 part (angle-facts, Unit 4, 2 entries, both
   authored, Level 1 only, per the specification): the full turn
   is 360 degrees. Grounding: MA6.9.1, MA6.9.2, MA6.9.11,
   MA6.9.12. Supports (pkFor): 9.13, 11.2. */

E("u4-pk-angle-full-turn", 4, ["9.13"], 1, "gen", function () {
  var ctx = pick([
    "A clock's minute hand makes one full turn in an hour.",
    "A figure skater spins through one full turn.",
    "A windmill blade turns through one full turn."
  ]);
  return mcq(ctx + " How many degrees are in one full turn?",
    { t: "360°", fb: "Correct: a full turn brings a ray back to its start, and a full turn measures 360°." },
    [{ t: "180°", fb: "That is a half turn: a straight angle. A full turn is twice that." },
     { t: "90°", fb: "That is a quarter turn: a right angle. A full turn is four of those." },
     { t: "270°", fb: "That is a three-quarter turn. One more quarter turn completes the full turn." }],
    "A full turn is made of 4 right angles: \\(4 \\times 90° = 360°\\). The answer is <b>360°</b>.",
    { ctx: ctx });
}, ["Build the full turn from right angles.", "A right angle is a quarter of a full turn."]);

E("u4-pk-angle-right-count", 4, ["9.13"], 1, "gen", function () {
  var full = Math.random() < 0.5;
  var key = full ? 4 : 2;
  var ds = pk7uniq(key, [1, 2, 3, 4]).slice(0, 3);
  return mcq("How many right angles make " + (full ? "one full turn" : "one straight angle") + "?",
    { t: String(key), fb: "Correct: " + (full ? "a full turn is 360°, and 360 divided by 90 is 4." : "a straight angle is 180°, and 180 divided by 90 is 2.") },
    ds.map(function (d) { return { t: String(d), fb: "A right angle is 90°. Divide the " + (full ? "full turn's 360°" : "straight angle's 180°") + " by 90°." }; }),
    (full ? "A full turn is 360° and each right angle is 90°: \\(360 \\div 90 = 4\\)." : "A straight angle is 180° and each right angle is 90°: \\(180 \\div 90 = 2\\).") + " The answer is <b>" + key + "</b>.",
    { full: full, key: key });
}, ["Turn the question into a division: the big angle divided by 90°.", "A straight angle is 180°; a full turn is 360°."]);

/* ================= Cluster 7-C11 top-up and copies =========
   MIXED NUMBERS AND IMPROPER FRACTIONS (mixed-improper, Unit 5,
   4 entries, all authored): convert between the two forms.
   Grounding: MA6.3.6 and MA6.3.7 (mixed numbers introduced from
   improper fractions, and the conversion between them). Supports
   (pkFor): 6.20, 6.21, 6.13 to 6.23. The cluster's two support
   sets are flagged in PKT7_P3, and the three equivalent-fraction
   copies below are shared from the 7-C6 group in Unit 3 (pkFor
   6.16). */

E("u5-pk-mixed-from-improper", 5, ["6.20"], 1, "gen", function () {
  var d, w, r, guard = 0;
  do {
    d = ri(3, 9); w = ri(1, 4); r = ri(1, d - 1);
  } while ((2 * r === d || 2 * r + 1 === d) && guard++ < 120);
  if (2 * r === d || 2 * r + 1 === d) { d = 5; w = 2; r = 1; }
  var N = w * d + r;
  return mcq("Write " + pk7eqf(N, d) + " as a mixed number.",
    { t: u5M(N, d), fb: "Correct: " + N + " divided by " + d + " is " + w + " with remainder " + r + ", giving " + w + " wholes and " + u5M(r, d) + " left over." },
    [{ t: u5M(N + 1, d), fb: "That counts one part too many: the remainder of " + N + " divided by " + d + " is " + r + ", not " + (r + 1) + "." },
     { t: u5M(w * d + (d - r), d), fb: "That uses the parts NOT taken as the remainder. The remainder of " + N + " divided by " + d + " is " + r + "." },
     { t: u5M(r, d), fb: "That drops the whole-number part. " + N + " parts of size " + d + " make " + w + " full wholes as well." }],
    "Divide: \\(" + N + " \\div " + d + " = " + w + "\\) remainder " + r + ". So " + pk7eqf(N, d) + " is <b>" + u5M(N, d) + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Divide the numerator by the denominator: the quotient is the whole-number part.", "The remainder goes over the same denominator."]);

E("u5-pk-mixed-to-improper", 5, ["6.20"], 1, "gen", function () {
  var d = ri(3, 9), w = ri(2, 4), r = ri(1, d - 1);
  var N = w * d + r;
  var ds = pk7uniq(N, [w + r, w * d, Number(String(w) + String(r))]).slice(0, 3);
  return mcq("Write " + u5M(N, d) + " as an improper fraction. What is its numerator?",
    { t: String(N), fb: "Correct: " + w + " wholes are " + (w * d) + " parts of size " + d + ", plus " + r + " more makes " + N + "." },
    ds.map(function (x) { return { t: String(x), fb: x === w * d ? "That counts only the whole-number part. Add the " + r + " extra parts as well." : "Multiply the whole number by the denominator, then add the numerator: " + w + " x " + d + " + " + r + "." }; }),
    "Multiply and add: \\(" + w + " \\times " + d + " + " + r + " = " + N + "\\), over the same denominator " + d + ". The numerator is <b>" + N + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Each whole is worth a full denominator of parts.", "Multiply the whole by the denominator, then add the leftover parts."]);

E("u5-pk-mixed-slices", 5, ["6.20"], 2, "gen", function () {
  var d = pick([4, 6, 8]), w = ri(2, 3), r = ri(1, d - 1), guard = 0;
  while ((2 * r === d || 2 * r + 1 === d) && guard++ < 120) { r = ri(1, d - 1); }
  if (2 * r === d || 2 * r + 1 === d) r = 1;
  var N = w * d + r;
  return mcq("Pizzas are cut into " + d + " equal slices. A class eats " + N + " slices. How many pizzas did the class eat, as a mixed number?",
    { t: u5M(N, d), fb: "Correct: " + N + " slices make " + w + " whole pizzas (" + (w * d) + " slices) with " + r + " slices left over." },
    [{ t: u5M(N + 1, d), fb: "That counts one slice too many: " + N + " slices group into " + w + " full pizzas with " + r + " slices left." },
     { t: u5M(w * d + (d - r), d), fb: "That uses the slices NOT eaten from the last pizza as the leftover. The leftover is the " + r + " slices past " + (w * d) + "." },
     { t: u5M(r, d), fb: "That drops the whole pizzas. " + N + " slices include " + w + " whole pizzas as well." }],
    "Group the slices: \\(" + N + " \\div " + d + " = " + w + "\\) remainder " + r + ", so the class ate <b>" + u5M(N, d) + "</b> pizzas.",
    { N: N, d: d, w: w, r: r });
}, ["Group the slices into whole pizzas first.", "The slices left over form the fraction part."]);

E("u5-pk-mixed-which", 5, ["6.20"], 2, "gen", function () {
  var d = ri(3, 9), w = ri(2, 4), r = ri(1, d - 1);
  var N = w * d + r;
  return mcq("Which improper fraction equals " + u5M(N, d) + "?",
    { t: pk7eqf(N, d), fb: "Correct: " + w + " x " + d + " + " + r + " = " + N + " parts of size " + d + "." },
    [{ t: pk7eqf(w * d, d), fb: "That counts only the " + w + " wholes. The extra " + r + " parts must be added too." },
     { t: pk7eqf(w + r, d), fb: "That adds the whole number and the numerator. Multiply the whole number by " + d + " first." },
     { t: pk7eqf(Number(String(w) + String(r)), d), fb: "That writes the whole number and the numerator side by side. Multiply " + w + " by " + d + ", then add " + r + "." }],
    "Multiply and add: \\(" + w + " \\times " + d + " + " + r + " = " + N + "\\), so the equal fraction is <b>" + pk7eqf(N, d) + "</b>.",
    { N: N, d: d, w: w, r: r });
}, ["Convert the whole-number part into parts of the same size.", "Then add the fraction part's parts."]);

/* Shared copies for cluster 7-C11: the three equivalent-fraction
   generators of cluster 7-C6, housed in Unit 5 with pkFor 6.16
   (common denominators run on equivalent fractions). The copies
   call the same generator functions as the Unit 3 originals. */

E("u5-pk-equiv-recognize", 5, ["6.16"], 1, "gen", pk7eqRecognizeGen,
  ["Look for the choice made by multiplying the top and the bottom by the same number.", "Adding the same number to the top and the bottom does not make an equivalent fraction."]);

E("u5-pk-equiv-target", 5, ["6.16"], 2, "gen", pk7eqTargetGen,
  ["Find what the denominator was multiplied by to reach the target denominator.", "Multiply the numerator by that same number."]);

E("u5-pk-equiv-divide", 5, ["6.16"], 2, "gen", pk7eqDivideGen,
  ["Do the same division to the top and the bottom.", "Dividing both parts by the same number keeps the fraction's value."]);

/* ================= Cluster 7-C13 top-ups =================
   Cluster 7-C13's support entry (u7-prob-basic) is flagged in
   PKT7_P3. The authored entries below complete the cluster.

   PROBABILITY OF A SINGLE EVENT (single-event-probability,
   Unit 7, 5 entries, all authored): favourable outcomes over
   possible outcomes, as a fraction and as a percent, on bags,
   spinners and a die. Grounding: MA6.12.2 and MA6.12.3, with the
   percent forms on MA6.3.8. Supports (pkFor): 12.1 to 12.7. */

E("u7-pk-prob-bag", 7, ["12.1"], 1, "gen", function () {
  var counts = { red: ri(2, 6), blue: ri(2, 6), green: ri(1, 5) };
  var total = counts.red + counts.blue + counts.green;
  var colour = pick(["red", "blue", "green"]), f = counts[colour], guard = 0;
  while (f === total - f && guard++ < 60) { counts.green++; total++; f = counts[colour]; }
  var key = u7fracStr(f, total);
  var ds = [
    { t: u7fracStr(f, total - f), fb: "That compares " + colour + " counters to the counters that are NOT " + colour + ". Probability compares to ALL the counters." },
    { t: u7fracStr(total - f, total), fb: "That is the probability of NOT drawing a " + colour + " counter. Count the " + colour + " ones for the top." },
    { t: u7fracStr(total, f), fb: "That is upside down: the favourable count goes on top, the total count on the bottom." }
  ];
  return mcq("A bag holds " + counts.red + " red, " + counts.blue + " blue and " + counts.green + " green counters. One counter is drawn without looking. What is the probability that it is " + colour + "?",
    { t: key, fb: "Correct: " + f + " of the " + total + " counters are " + colour + "." },
    ds,
    "Probability is favourable outcomes over possible outcomes: \\(" + f + "\\) " + colour + " counters out of " + total + " in all gives <b>" + key + "</b>.",
    { counts: counts, colour: colour, key: key });
}, ["The bottom of the fraction is the total number of counters.", "The top is the number of counters of the colour named."]);

E("u7-pk-prob-percent-bag", 7, ["12.1"], 2, "gen", function () {
  var r = pick([3, 5, 7, 9, 11, 13]);
  var rest = 20 - r, b = ri(2, rest - 2), g = rest - b;
  var key = r * 5;
  return mcq("A bag holds 20 counters: " + r + " are red, " + b + " are blue and " + g + " are green. One counter is drawn without looking. What is the probability that it is red, as a percent?",
    { t: key + "%", fb: "Correct: " + r + " out of 20 is " + r + "/20, which scales to " + key + " out of 100." },
    [{ t: r + "%", fb: "That is just the count of red counters. Out of 20, scale up to out of 100: multiply by 5." },
     { t: (100 - key) + "%", fb: "That is the probability of NOT drawing red. The question asks for red." },
     { t: (key + 10 === 100 - key ? key - 10 : key + 10) + "%", fb: "That does not match the count: there are " + r + " red counters out of 20, and " + r + "/20 scales to " + key + " out of 100." }],
    "As a fraction the probability is \\(" + FR(r, 20) + "\\). Scaling to a denominator of 100 gives " + key + " out of 100, which is <b>" + key + "%</b>.",
    { r: r, key: key });
}, ["First write the probability as a fraction out of 20.", "Then scale the fraction to out of 100."]);

E("u7-pk-prob-words", 7, ["12.1"], 1, "gen", function () {
  var certain = Math.random() < 0.5;
  var words = ["certain", "impossible", "likely", "unlikely"];
  var key = certain ? "certain" : "impossible";
  return mcq("An event has a probability of " + (certain ? "1" : "0") + ". Which word describes the event?",
    { t: key, fb: certain ? "Correct: a probability of 1 means the event is sure to happen." : "Correct: a probability of 0 means the event cannot happen." },
    words.filter(function (w) { return w !== key; }).map(function (w) { return { t: w, fb: certain ? "A probability of 1 is the top of the scale: the event is sure to happen, not just " + w + "." : "A probability of 0 is the bottom of the scale: the event cannot happen at all." }; }),
    "Probability runs from 0 (impossible) to 1 (certain). A probability of " + (certain ? "1" : "0") + " makes the event <b>" + key + "</b>.",
    { certain: certain });
}, ["The probability scale runs from 0 to 1.", "The ends of the scale have their own words: 0 is impossible, 1 is certain."]);

E("u7-pk-prob-spinner", 7, ["12.1"], 2, "gen", function () {
  var w = pick([2, 3, 4, 6, 7, 8]);
  var key = w * 10;
  var q = mcq("The spinner is spun once. What is the probability that it lands on Win, as a percent?",
    { t: key + "%", fb: "Correct: " + w + " of the 10 equal sections say Win, and " + w + "/10 is " + key + "%." },
    [{ t: w + "%", fb: "That is just the count of Win sections. Out of 10 sections, scale to out of 100." },
     { t: (100 - key) + "%", fb: "That is the probability of landing on Lose. The question asks for Win." },
     { t: (key + 10) + "%", fb: "That counts one Win section too many. Count the Win sections on the spinner." }],
    "Count the Win sections: " + w + " of 10 equal sections, so the probability is \\(" + FR(w, 10) + " = " + FR(key, 100) + "\\), which is <b>" + key + "%</b>.",
    { w: w, key: key });
  q.figure = pk7spinner(w, 10, "Win", "Lose");
  return q;
}, ["Count the sections that say Win, out of all the sections.", "A fraction out of 10 scales to a percent by multiplying by 10."]);

E("u7-pk-prob-die", 7, ["12.1"], 2, "gen", function () {
  var events = [
    { name: "an even number", fav: 3 },
    { name: "an odd number", fav: 3 },
    { name: "a number greater than 4", fav: 2 },
    { name: "a number less than 5", fav: 4 },
    { name: "a prime number", fav: 3 },
    { name: "a number greater than 2", fav: 4 },
    { name: "a multiple of 3", fav: 2 }
  ];
  var ev = pick(events), f = ev.fav;
  var key = u7fracStr(f, 6);
  var cand = [
    { t: u7fracStr(6 - f, 6), fb: "That counts the outcomes that do NOT fit the event. Count the ones that do." },
    { t: u7fracStr(1, 6), fb: "That is the probability of one single face. The event fits " + f + " faces." },
    { t: u7fracStr(f + 1, 6), fb: "That counts one face too many. List the faces that fit the event: there are " + f + "." },
    { t: u7fracStr(5, 6), fb: "That counts five faces. List the faces that fit the event: there are " + f + "." }
  ];
  var seen = {}; seen[key] = 1;
  var ds = [];
  cand.forEach(function (cd) { if (!seen[cd.t] && ds.length < 3) { seen[cd.t] = 1; ds.push(cd); } });
  return mcq("A fair six-sided die is rolled once. What is the probability of rolling " + ev.name + "?",
    { t: key, fb: "Correct: " + f + " of the 6 faces fit the event." },
    ds,
    "List the faces 1 to 6 and mark the ones that fit: " + f + " faces fit, out of 6 possible. The probability is <b>" + key + "</b>.",
    { event: ev.name, fav: f, key: key });
}, ["List all six faces and mark which ones fit the event.", "The probability is the fitting faces over 6."]);

/* LISTING OUTCOMES (listing-outcomes, Unit 7, 3 entries, all
   authored): count and complete the outcome lists for two-stage
   experiments. Grounding: MA6.12.1 (listing outcomes for simple
   experiments). Supports (pkFor): 12.4 to 12.7. This is not the
   fundamental counting principle and no host-course machinery is
   named: outcomes are listed and counted directly. */

E("u7-pk-list-count", 7, ["12.4"], 1, "gen", function () {
  var setups = [
    { text: "A coin is flipped and a six-sided die is rolled.", a: 2, b: 6, an: "2 coin sides", bn: "6 die faces" },
    { text: "A spinner with 4 equal sections is spun and a six-sided die is rolled.", a: 4, b: 6, an: "4 spinner sections", bn: "6 die faces" },
    { text: "A coin is flipped and a spinner with 4 equal sections is spun.", a: 2, b: 4, an: "2 coin sides", bn: "4 spinner sections" },
    { text: "A spinner with 3 equal sections is spun and a six-sided die is rolled.", a: 3, b: 6, an: "3 spinner sections", bn: "6 die faces" }
  ];
  var s = pick(setups), key = s.a * s.b;
  var ds = pk7uniq(key, [s.a + s.b, key + s.b, Math.max(s.a, s.b)]).slice(0, 3);
  return mcq(s.text + " How many possible outcomes are there in all?",
    { t: String(key), fb: "Correct: each of the " + s.an + " can pair with each of the " + s.bn + ": " + s.a + " x " + s.b + " = " + key + "." },
    ds.map(function (d) { return { t: String(d), fb: d === s.a + s.b ? "That adds the two counts. Every first result can pair with every second result, so multiply instead." : "List the pairs systematically: each first result pairs with all " + s.b + " second results." }; }),
    "Pair every first result with every second result: \\(" + s.a + " \\times " + s.b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: s.a, b: s.b, key: key });
}, ["Fix one first result and list all its partners.", "Then multiply: first results times second results."]);

E("u7-pk-list-missing", 7, ["12.4"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var all = ["HH", "HT", "TH", "TT"], mi = pick([0, 3]);
    var missing = all[mi], listed = all.filter(function (x) { return x !== missing; });
    return mcq("Flipping a coin twice can give " + listed.join(", ") + " and one more outcome. What is the missing outcome?",
      { t: missing, fb: "Correct: the four outcomes are HH, HT, TH and TT, one for each pair of sides." },
      [{ t: listed[0], fb: "That outcome is already in the list. The missing one is a different pair." },
       { t: "H", fb: "That is only one flip. Each outcome of two flips has two letters." },
       { t: "TTT", fb: "That is three flips. Each outcome here has exactly two letters." }],
      "Two flips give the pairs HH, HT, TH, TT. The one not listed is <b>" + missing + "</b>.",
      { missing: missing });
  }
  var all2 = ["1H", "1T", "2H", "2T", "3H", "3T"], mi2 = ri(0, 5);
  var missing2 = all2[mi2], listed2 = all2.filter(function (x) { return x !== missing2; });
  return mcq("Spinning a 3-section spinner (1, 2, 3) and flipping a coin can give " + listed2.join(", ") + " and one more outcome. What is the missing outcome?",
    { t: missing2, fb: "Correct: every spinner number pairs with H and with T; " + missing2 + " is the pair not listed." },
    [{ t: listed2[0], fb: "That outcome is already in the list. Check each spinner number against both coin sides." },
     { t: "4H", fb: "The spinner has only 3 sections, so 4 cannot appear." },
     { t: "H" + missing2[0], fb: "That writes the pair backwards. In this list the spinner number comes first." }],
    "Pair each spinner number with H and with T: 1H, 1T, 2H, 2T, 3H, 3T. The one not listed is <b>" + missing2 + "</b>.",
    { missing: missing2 });
}, ["List the outcomes in a system: fix the first result and run through the second.", "Compare your list with the given list to spot the gap."]);

E("u7-pk-list-outfits", 7, ["12.4"], 2, "gen", function () {
  var setups = [
    { a: 3, b: 4, text: "Sam has 3 shirts and 4 pairs of pants. An outfit is one shirt and one pair of pants." },
    { a: 4, b: 5, text: "A cafe offers 4 soups and 5 sandwiches. A lunch is one soup and one sandwich." },
    { a: 5, b: 6, text: "A bakery sells 5 kinds of muffin and 6 kinds of cookie. A snack is one muffin and one cookie." },
    { a: 3, b: 5, text: "Mia has 3 scarves and 5 hats. An outfit is one scarf and one hat." },
    { a: 2, b: 6, text: "A game has 2 characters and 6 boards. A play is one character on one board." }
  ];
  var s = pick(setups), key = s.a * s.b;
  var ds = [s.a + s.b, Number(String(s.a) + String(s.b)), key + s.a + s.b];
  return mcq(s.text + " How many different combinations are there?",
    { t: String(key), fb: "Correct: each of the " + s.a + " first choices pairs with each of the " + s.b + " second choices: " + s.a + " x " + s.b + " = " + key + "." },
    [{ t: String(ds[0]), fb: "That adds the two counts. Every first choice can pair with every second choice, so multiply instead." },
     { t: String(ds[1]), fb: "That writes the two counts side by side. Count the pairs by multiplying." },
     { t: String(ds[2]), fb: "That adds after multiplying. The pairs alone number " + s.a + " x " + s.b + " = " + key + "." }],
    "Pair every first choice with every second choice: \\(" + s.a + " \\times " + s.b + " = " + key + "\\). The answer is <b>" + key + "</b>.",
    { a: s.a, b: s.b, key: key });
}, ["Fix one first choice and count its partners.", "Multiply the two counts: every pairing is a different combination."]);

/* Shared copies for cluster 7-C12: the table, bar graph and line
   graph generators of cluster 7-C3, housed in Unit 7. Cluster
   7-C12's reading runs to bar graphs, line graphs and tables
   (its centre-measures content shipped in Piece 1). The copies
   call the same generator functions as the Unit 1 originals. */

E("u7-pk-tg-table", 7, ["11.6"], 2, "gen", pk7tgTableGen,
  ["Find the row (or rows) the question names before reading any numbers.", "A total question needs two rows added."]);

E("u7-pk-tg-bar", 7, ["11.6"], 1, "gen", pk7tgBarGen,
  ["Run your eye from the top of the bar across to the scale.", "The scale counts in steps: check the step size first."]);

E("u7-pk-tg-line", 7, ["11.6"], 2, "gen", pk7tgLineGen,
  ["Find the point above the label named, then read across to the scale.", "Growth is a difference: read both heights and subtract."]);

/* ================= Cluster 7-C14 =================
   ANGLE FACTS, Unit 8 part (angle-facts, Unit 8, 4 entries, all
   authored, all figure-bearing): classify angles, judge them
   against benchmarks, and find the second angle of a
   supplementary or complementary pair. Grounding: MA6.9.11 and
   MA6.9.12 (the degree as the standard unit), with MA6.9.1 and
   MA6.9.2 behind them. Supports (pkFor): the cluster's nine
   indicators (10.1 to 10.5, 10.13 to 10.16). The protractor
   copies below are shared from cluster 7-C10. */

E("u8-pk-angle-classify", 8, ["10.1"], 1, "gen", function () {
  var modes = [
    { degs: [30, 40, 55, 65, 80], name: "an acute angle", why: "less than 90°" },
    { degs: [90], name: "a right angle", why: "exactly 90°" },
    { degs: [100, 120, 140, 160], name: "an obtuse angle", why: "more than 90° but less than 180°" },
    { degs: [180], name: "a straight angle", why: "exactly 180°, a straight line" }
  ];
  var m = pick(modes), deg = pick(m.degs);
  var names = ["an acute angle", "a right angle", "an obtuse angle", "a straight angle"];
  var q = mcq("What type of angle is shown?",
    { t: m.name, fb: "Correct: the angle is " + m.why + "." },
    names.filter(function (x) { return x !== m.name; }).map(function (x) { return { t: x, fb: "Compare the angle with a right angle (90°): this one is " + m.why + "." }; }),
    "Compare the angle with a right angle: it is " + m.why + ", so it is <b>" + m.name + "</b>.",
    { deg: deg, type: m.name });
  q.figure = pk7angleFig(deg);
  return q;
}, ["Compare the angle with a right angle first.", "Less than 90° is acute; more than 90° (but under 180°) is obtuse."]);

E("u8-pk-angle-benchmark", 8, ["10.1"], 1, "gen", function () {
  var target = pick([45, 90]);
  var near = target === 45 ? pick([40, 50]) : pick([85, 95]);
  var rest = target === 45 ? [100, 160, 15] : [30, 150, 170];
  var degs = [near].concat(rest), i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = degs[i]; degs[i] = degs[j]; degs[j] = tmp; }
  var idx = degs.indexOf(near);
  var labs = ["A", "B", "C", "D"];
  var q = mcq("Which angle is closest to " + target + "°?",
    { t: "Angle " + labs[idx], fb: "Correct: that angle is " + near + "°, only " + Math.abs(near - target) + "° from " + target + "°." },
    degs.map(function (dg, k) { return k; }).filter(function (k) { return k !== idx; }).map(function (k) { return { t: "Angle " + labs[k], fb: "That angle is about " + degs[k] + "°, much further from " + target + "°." }; }),
    "Judge each angle against the " + target + "° benchmark" + (target === 45 ? " (half of a right angle)" : " (a right angle)") + ": the closest is <b>angle " + labs[idx] + "</b> at about " + near + "°.",
    { degs: degs, idx: idx, target: target });
  q.figure = pk7anglePickFig(degs);
  return q;
}, ["Use the benchmark: 45° is half a right angle, 90° is a right angle.", "Rule out the angles that are clearly much bigger or smaller first."]);

E("u8-pk-angle-supplementary", 8, ["10.1"], 2, "gen", function () {
  var deg = pick([110, 120, 130, 140, 150, 160]);
  var key = 180 - deg;
  var ds = pk7uniq(key, [deg, key + 10, key - 10]).slice(0, 3);
  var q = mcq("Two angles form a straight line. One angle is " + deg + "°. What is the measure of the other angle?",
    { t: key + "°", fb: "Correct: angles on a straight line add to 180°, and 180 - " + deg + " = " + key + "." },
    ds.map(function (d) { return { t: d + "°", fb: d === deg ? "That is the given angle itself. The two angles must add to 180°." : "Angles on a straight line add to 180°. Subtract " + deg + " from 180." }; }),
    "Angles on a straight line are supplementary and add to 180°: \\(180 - " + deg + " = " + key + "\\). The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7anglePair(deg);
  return q;
}, ["Angles on a straight line add to 180°.", "Subtract the known angle from 180."]);

E("u8-pk-angle-complementary", 8, ["10.1"], 2, "gen", function () {
  var deg = pick([25, 35, 40, 55, 60, 65]);
  var key = 90 - deg;
  var ds = pk7uniq(key, [deg, key + 10, 180 - deg]).slice(0, 3);
  var q = mcq("Two angles form a right angle. One angle is " + deg + "°. What is the measure of the other angle?",
    { t: key + "°", fb: "Correct: angles forming a right angle add to 90°, and 90 - " + deg + " = " + key + "." },
    ds.map(function (d) { return { t: d + "°", fb: d === 180 - deg ? "That subtracts from 180, but these angles form a right angle (90°), not a straight line." : "Angles forming a right angle add to 90°. Subtract " + deg + " from 90." }; }),
    "Angles forming a right angle are complementary and add to 90°: \\(90 - " + deg + " = " + key + "\\). The answer is <b>" + key + "°</b>.",
    { deg: deg, key: key });
  q.figure = pk7anglePairR(deg);
  return q;
}, ["Angles forming a right angle add to 90°.", "Subtract the known angle from 90."]);

/* Shared copies for cluster 7-C14: the three protractor reading
   generators of cluster 7-C10, housed in Unit 8. The copies call
   the same generator functions as the Unit 4 originals. */

E("u8-pk-protractor-acute", 8, ["10.1"], 1, "gen", pk7ptAcuteGen,
  ["Start from the zero on the same side as the flat ray.", "Follow the slanted ray out to the scale and read the number there."]);

E("u8-pk-protractor-obtuse", 8, ["10.1"], 1, "gen", pk7ptObtuseGen,
  ["An obtuse angle measures more than 90°: use the scale that starts at the flat ray's zero.", "Follow the slanted ray out to the scale and read the number there."]);

E("u8-pk-protractor-five", 8, ["10.1"], 2, "gen", pk7ptFiveGen,
  ["The small marks between the numbers are worth 5° each.", "Read the numbered mark before the ray, then add the small steps."]);

/* ================= Cluster 7-C15 top-ups and copies =========
   AXES AND THE ORIGIN (axes-origin, Unit 8, 3 entries, all
   authored, all figure-bearing): the support entry
   u8-axes-origin is flagged in PKT7_P3; these labelling items
   complete the group. Grounding: MA6.10.9. Supports (pkFor):
   10.6. */

E("u8-pk-axes-origin-point", 8, ["10.6"], 1, "gen", function () {
  var others = [{ x: 2, y: 3 }, { x: 4, y: 1 }, { x: 1, y: 4 }, { x: 3, y: 5 }, { x: 5, y: 2 }];
  var pool = others.slice(), chosen = [], guard = 0;
  while (chosen.length < 3 && guard++ < 200) { chosen.push(pool.splice(ri(0, pool.length - 1), 1)[0]); }
  var pts = [{ x: 0, y: 0 }].concat(chosen), labs = ["A", "B", "C", "D"], order = [0, 1, 2, 3], i;
  for (i = 3; i > 0; i--) { var j = ri(0, i), tmp = order[i]; order[i] = order[j]; order[j] = tmp; }
  var placed = order.map(function (k) { return pts[k]; });
  placed.forEach(function (p, k) { p.label = labs[k]; });
  var originPt = placed[0] && placed.find(function (p) { return p.x === 0 && p.y === 0; });
  var q = mcq("Which point is at the origin?",
    { t: "Point " + originPt.label, fb: "Correct: the origin is where the two axes cross, at (0, 0)." },
    placed.filter(function (p) { return p !== originPt; }).map(function (p) { return { t: "Point " + p.label, fb: "Point " + p.label + " is at (" + p.x + ", " + p.y + "), not at the crossing of the axes." }; }),
    "The origin is the point where the axes cross, (0, 0): that is <b>point " + originPt.label + "</b>.",
    { pts: placed.map(function (p) { return [p.x, p.y]; }), origin: originPt.label });
  q.figure = pk7quad(placed, 6, 6);
  return q;
}, ["The origin is where the axes cross.", "Its coordinates are (0, 0): no move across and no move up."]);

E("u8-pk-axes-name", 8, ["10.6"], 1, "gen", function () {
  var mode = pick(["x", "y"]);
  var key = mode + "-axis";
  var q = mcq("The highlighted line on the coordinate grid is called the...",
    { t: key, fb: "Correct: the " + (mode === "x" ? "horizontal" : "vertical") + " axis is the " + key + "." },
    [{ t: (mode === "x" ? "y" : "x") + "-axis", fb: "That is the " + (mode === "x" ? "vertical" : "horizontal") + " line. The highlighted line runs " + (mode === "x" ? "horizontally" : "vertically") + "." },
     { t: "origin", fb: "The origin is a point, the crossing of the axes at (0, 0), not a line." },
     { t: "coordinate grid", fb: "That names the whole grid. The highlighted line itself is one of the axes." }],
    "The " + (mode === "x" ? "horizontal" : "vertical") + " axis through the origin is the <b>" + key + "</b>.",
    { mode: mode });
  q.figure = pk7axesHL(mode);
  return q;
}, ["The x-axis runs horizontally and the y-axis runs vertically.", "The origin is the point where they cross, not a line."]);

E("u8-pk-axes-on-axis", 8, ["10.6"], 2, "gen", function () {
  var k = ri(2, 6);
  var q = mcq("Point P is on the y-axis. What are its coordinates?",
    { t: "(0, " + k + ")", fb: "Correct: a point on the y-axis has not moved across at all, so its x-coordinate is 0." },
    [{ t: "(" + k + ", 0)", fb: "That point is on the x-axis: its y-coordinate is 0. Point P is on the y-axis." },
     { t: "(0, " + (k + 1) + ")", fb: "The across value, 0, is right, but P is " + k + " units up, not " + (k + 1) + "." },
     { t: "(" + k + ", " + k + ")", fb: "That point is out in the grid, not on an axis: a point on the y-axis has x-coordinate 0." }],
    "Points on the y-axis have x-coordinate 0. Point P is " + k + " units up the y-axis, so its coordinates are <b>(0, " + k + ")</b>.",
    { k: k });
  q.figure = pk7quad([{ x: 0, y: k, label: "P" }], 7, 7);
  return q;
}, ["On the y-axis, the across distance is 0.", "The first coordinate of an on-axis point tells which axis: 0 across means the y-axis."]);

/* TRANSFORMATIONS IN WORDS (transformations, Unit 8, 4 entries,
   all authored, all figure-bearing): identify and describe
   translations, reflections and rotations on a plain grid with
   NO coordinates, in plain words, per the placement. Grounding:
   MA5.10.12 to MA5.10.24 (translations, reflections and rotations
   introduced in Grade 5; identifying the transformation at
   MA5.10.16). Supports (pkFor): 10.11, 10.12, 10.20. */

function pk7shift(poly, dx, dy) { return poly.map(function (p) { return [p[0] + dx, p[1] + dy]; }); }
var PK7_SHAPE_L = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 3], [0, 3]];
var PK7_SHAPE_STEP = [[0, 0], [3, 0], [3, 1], [2, 1], [2, 2], [1, 2], [1, 3], [0, 3]];

E("u8-pk-trans-identify-slide", 8, ["10.11"], 1, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 1, 2), img = pk7shift(orig, 4, 1);
  var q = mcq("The white shape is moved to the shaded position. What is this transformation called?",
    { t: "a translation", fb: "Correct: the shape slides without turning or flipping; every point moves the same way." },
    [{ t: "a reflection", fb: "A reflection flips the shape over a line, like a mirror image. This shape keeps its orientation." },
     { t: "a rotation", fb: "A rotation turns the shape around a point. This shape has not turned at all." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only moved." }],
    "The shape slides to a new position with no turn and no flip: that is <b>a translation</b> (a slide).",
    { move: [4, 1] });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "A slide keeps the shape pointing the same way."]);

E("u8-pk-trans-identify-flip", 8, ["10.11"], 1, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 1, 2);
  var img = orig.map(function (p) { return [10 - p[0], p[1]]; }).reverse();
  var q = mcq("The white shape is changed into the shaded shape across the dashed line. What is this transformation called?",
    { t: "a reflection", fb: "Correct: the dashed line is a mirror line, and the shaded shape is the mirror image of the white one." },
    [{ t: "a translation", fb: "A translation slides a shape without flipping it. This shape has been flipped: it faces the other way." },
     { t: "a rotation", fb: "A rotation turns the shape around a point. Here every point has crossed the dashed line to its mirror position." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only flipped." }],
    "The shaded shape is the mirror image of the white shape in the dashed line: that is <b>a reflection</b> (a flip).",
    { mirror: 5 });
  q.figure = pk7plainGrid([orig, img], 5);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "A dashed line between a shape and its mirror image signals a reflection."]);

E("u8-pk-trans-describe", 8, ["10.11"], 2, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_STEP, 1, 4), img = pk7shift(orig, 3, -2);
  var q = mcq("Describe the translation that moves the white shape to the shaded position.",
    { t: "3 units right and 2 units up", fb: "Correct: pick any corner and count: it moves 3 squares right and 2 squares up." },
    [{ t: "3 units right and 2 units down", fb: "The shaded shape is higher on the grid, so the move is up, not down." },
     { t: "2 units right and 3 units up", fb: "That swaps the two counts. Count the sideways move first: it is 3 squares." },
     { t: "3 units left and 2 units up", fb: "The shaded shape is to the right of the white one, so the sideways move is right, not left." }],
    "Track one corner: it moves 3 squares right and 2 squares up. The translation is <b>3 units right and 2 units up</b>.",
    { move: [3, -2] });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Pick one corner of the shape and follow it to the matching corner of the image.", "Count sideways first, then up or down."]);

E("u8-pk-trans-identify-turn", 8, ["10.11"], 2, "gen", function () {
  var orig = pk7shift(PK7_SHAPE_L, 5, 2);
  var pivot = [5, 2];
  var img = orig.map(function (p) { var dx = p[0] - pivot[0], dy = p[1] - pivot[1]; return [pivot[0] - dy, pivot[1] + dx]; });
  var q = mcq("The white shape is changed into the shaded shape. What is this transformation called?",
    { t: "a rotation", fb: "Correct: the shape has turned a quarter turn around its top-left corner; it has not flipped or slid." },
    [{ t: "a reflection", fb: "A reflection would flip the shape into its mirror image. This shape has turned instead: its long part now runs a different way." },
     { t: "a translation", fb: "A translation keeps the shape pointing the same way. This shape points a different way after the move." },
     { t: "an enlargement", fb: "An enlargement changes the shape's size. This shape is the same size, only turned." }],
    "The shape has turned around one of its corners without flipping: that is <b>a rotation</b> (a turn).",
    { pivot: pivot });
  q.figure = pk7plainGrid([orig, img], null);
  return q;
}, ["Ask: did the shape flip, turn, grow, or just slide?", "If the shape points a different way but is not flipped, it has turned."]);

/* Shared copies for cluster 7-C15: the four first-quadrant
   generators of cluster 7-C3, housed in Unit 8. The copies call
   the same generator functions as the Unit 1 originals. */

E("u8-pk-fq-read", 8, ["10.6"], 1, "gen", pk7fqReadGen,
  ["Coordinates are read across first, then up.", "Start at the origin: count across to below the point, then count up to it."]);

E("u8-pk-fq-which", 8, ["10.6"], 1, "gen", pk7fqWhichGen,
  ["Use the first number to move across and the second to move up.", "Find where the across count and the up count meet."]);

E("u8-pk-fq-coord", 8, ["10.6"], 1, "gen", pk7fqCoordGen,
  ["The x-coordinate is the first number in the pair; the y-coordinate is the second.", "Read the point's pair off the grid, then pick the number asked for."]);

E("u8-pk-fq-move", 8, ["10.6"], 2, "gen", pk7fqMoveGen,
  ["Moving right changes the first coordinate; moving up changes the second.", "Add each move to its own coordinate."]);

/* ================= Piece 3 tranche metadata =================
   pkSrc names what the item assesses; pkFor lists the host
   indicators the entry supports; pkGroup is the strand group.
   The indicators array on each new entry above carries the first
   code of its pkFor list, per the specification's Section 10.
   The eighteen support-set entries keep their own indicators
   arrays, IDs and generators; this table only flags them. */
var PK7_FOR_SORT = ["5.1", "5.2", "5.3", "5.4"];
var PK7_FOR_PATTERNS = ["8.4", "8.5", "8.6", "7.1", "7.2", "7.3", "7.4", "7.7", "7.8"];
var PK7_FOR_QUAD = ["7.5", "7.6", "7.9", "7.10", "7.11", "7.12"];
var PK7_FOR_C15 = ["10.6", "10.7", "10.8", "10.9", "10.10", "10.11", "10.12", "10.17", "10.18", "10.19", "10.20"];
var PK7_FOR_C4 = ["8.1", "8.2", "8.3", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "8.15", "8.16", "8.17"];
var PK7_FOR_EQBAL = ["8.1", "8.2", "8.3"];
var PK7_FOR_SUBST = ["8.1", "8.14", "8.17"];
var PK7_FOR_C6 = ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"];
var PK7_FOR_FAD = ["3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"];
var PK7_FOR_C7 = ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "3.7"];
var PK7_FOR_EST = ["6.1", "6.2", "6.3"];
var PK7_FOR_PCTBASE = ["3.7", "6.11", "6.12"];
var PK7_FOR_PROT = ["11.1", "11.2", "11.3", "11.4", "11.5", "9.13"];
var PK7_FOR_AF4 = ["9.13", "11.2"];
var PK7_FOR_C14 = ["10.1", "10.2", "10.3", "10.4", "10.5", "10.13", "10.14", "10.15", "10.16"];
var PK7_FOR_C11 = ["6.13", "6.14", "6.15", "6.16", "6.17", "6.18", "6.19", "6.20", "6.21", "6.22", "6.23"];
var PK7_FOR_MIXED = ["6.20", "6.21", "6.13", "6.14", "6.15", "6.16", "6.17", "6.18", "6.19", "6.22", "6.23"];
var PK7_FOR_C13 = ["12.1", "12.2", "12.3", "12.4", "12.5", "12.6", "12.7"];
var PK7_FOR_LIST = ["12.4", "12.5", "12.6", "12.7"];
var PK7_FOR_AXES = ["10.6"];
var PK7_FOR_TRANSF = ["10.11", "10.12", "10.20"];
var PKT7_P3 = {
  /* Support sets (state A): metadata only. */
  "u6-one-step-balance": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-one-step-problem": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-one-step-problem-cr": { src: "math-4:MA4.8.7", group: "equation-solving", for: PK7_FOR_C4 },
  "u6-inspection-trial": { src: "math-4:MA4.8.8", group: "equation-solving", for: PK7_FOR_C4 },
  "u3-add-sub-decimals": { src: "math-5:MA5.6.11", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-add-sub": { src: "math-5:MA5.6.11", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-mult-decimals": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-mult": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-div-decimals": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u3-cr-div": { src: "math-6:MA6.6.5", group: "decimal-operations", for: PK7_FOR_C7 },
  "u5-add-like": { src: "audit:like-denominator fraction addition rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-sub-like": { src: "audit:like-denominator fraction subtraction rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-model-add-figure": { src: "audit:like-denominator fraction addition rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "fraction-operations", for: PK7_FOR_C11 },
  "u5-simplify-fraction": { src: "audit:lowest terms rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u5-simplify-solution": { src: "audit:lowest terms rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u5-common-denominator": { src: "audit:common denominators rated covered in Grades 5/6 (Nov 13, 2026 audit); not named in the elementary outcome lists on file", group: "equivalent-fractions", for: PK7_FOR_C11 },
  "u7-prob-basic": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u8-axes-origin": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  /* Cluster 7-C1 remainder: sorting diagrams. */
  "u1-pk-sort-venn-read": { src: "math-4:MA4.11.7", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-venn-place": { src: "math-4:MA4.11.7", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-carroll-read": { src: "math-4:MA4.11.10", group: "sorting-diagrams", for: PK7_FOR_SORT },
  "u1-pk-sort-carroll-total": { src: "math-4:MA4.11.10", group: "sorting-diagrams", for: PK7_FOR_SORT },
  /* Cluster 7-C2: patterns. */
  "u1-pk-pattern-next": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-rule": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-machine": { src: "math-4:MA4.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-missing": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  "u1-pk-pattern-grow": { src: "math-5:MA5.8.1", group: "patterns", for: PK7_FOR_PATTERNS },
  /* Cluster 7-C3: first quadrant and tables and graphs. */
  "u1-pk-fq-read": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-which": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-coord": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-move": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-fq-between": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_QUAD },
  "u1-pk-tg-table": { src: "math-4:MA4.7.3", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-picto": { src: "math-4:MA4.11.6", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-bar": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-line": { src: "math-6:MA6.11.7", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  "u1-pk-tg-compare": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_QUAD },
  /* Cluster 7-C4 top-ups. */
  "u6-pk-balance-value": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-balance-change": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-balance-equivalent": { src: "math-6:MA6.8.2", group: "equality-balance", for: PK7_FOR_EQBAL },
  "u6-pk-subst-simple": { src: "math-6:MA6.8.6", group: "substitution", for: PK7_FOR_SUBST },
  "u6-pk-subst-brackets": { src: "math-6:MA6.8.6", group: "substitution", for: PK7_FOR_SUBST },
  "u6-pk-subst-table": { src: "math-4:MA4.8.10", group: "substitution", for: PK7_FOR_SUBST },
  /* Cluster 7-C6: fraction representation, equivalent fractions,
     decimal place value, fractions as decimals. */
  "u3-pk-fracrep-bar": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-circle": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-set": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-pick": { src: "math-6:MA6.3.2", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-fracrep-line": { src: "math-4:MA4.3.13", group: "fraction-representation", for: PK7_FOR_C6 },
  "u3-pk-equiv-recognize": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-target": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-divide": { src: "math-5:MA5.3.9", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-not": { src: "math-5:MA5.3.2", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-equiv-missing": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: PK7_FOR_C6 },
  "u3-pk-dpv-digit-value": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-expanded": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-round-tenth": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-round-hundredth": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-dpv-place-name": { src: "math-5:MA5.3.15", group: "decimal-place-value", for: PK7_FOR_C6 },
  "u3-pk-fad-to-decimal": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-to-fraction": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-match": { src: "math-5:MA5.3.21", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  "u3-pk-fad-line": { src: "math-5:MA5.3.20", group: "fraction-as-decimal", for: PK7_FOR_FAD },
  /* Cluster 7-C7 top-ups. */
  "u3-pk-est-add": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-product": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-difference": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-est-money": { src: "math-5:MA5.5.26", group: "estimation", for: PK7_FOR_EST },
  "u3-pk-pct-grid": { src: "math-6:MA6.3.11", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-pick": { src: "math-6:MA6.3.12", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-fraction": { src: "math-6:MA6.3.9", group: "percent-base", for: PK7_FOR_PCTBASE },
  "u3-pk-pct-decimal": { src: "math-6:MA6.3.9", group: "percent-base", for: PK7_FOR_PCTBASE },
  /* Cluster 7-C10: protractor and angle facts. */
  "u4-pk-protractor-acute": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-obtuse": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-five": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-left": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-protractor-supplement": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_PROT },
  "u4-pk-angle-full-turn": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_AF4 },
  "u4-pk-angle-right-count": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_AF4 },
  /* Cluster 7-C11 top-up and shared copies. */
  "u5-pk-mixed-from-improper": { src: "math-6:MA6.3.6", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-to-improper": { src: "math-6:MA6.3.7", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-slices": { src: "math-6:MA6.3.6", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-mixed-which": { src: "math-6:MA6.3.7", group: "mixed-improper", for: PK7_FOR_MIXED },
  "u5-pk-equiv-recognize": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: ["6.16"] },
  "u5-pk-equiv-target": { src: "math-5:MA5.3.1", group: "equivalent-fractions", for: ["6.16"] },
  "u5-pk-equiv-divide": { src: "math-5:MA5.3.9", group: "equivalent-fractions", for: ["6.16"] },
  /* Cluster 7-C13 top-ups and 7-C12 shared copies. */
  "u7-pk-prob-bag": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-percent-bag": { src: "math-6:MA6.12.3", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-words": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-spinner": { src: "math-6:MA6.12.3", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-prob-die": { src: "math-6:MA6.12.2", group: "single-event-probability", for: PK7_FOR_C13 },
  "u7-pk-list-count": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-list-missing": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-list-outfits": { src: "math-6:MA6.12.1", group: "listing-outcomes", for: PK7_FOR_LIST },
  "u7-pk-tg-table": { src: "math-4:MA4.7.3", group: "tables-and-graphs", for: PK7_FOR_AVG },
  "u7-pk-tg-bar": { src: "math-5:MA5.11.4", group: "tables-and-graphs", for: PK7_FOR_AVG },
  "u7-pk-tg-line": { src: "math-6:MA6.11.7", group: "tables-and-graphs", for: PK7_FOR_AVG },
  /* Cluster 7-C14: angle facts and protractor copies. */
  "u8-pk-angle-classify": { src: "math-6:MA6.9.11", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-benchmark": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-supplementary": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-angle-complementary": { src: "math-6:MA6.9.12", group: "angle-facts", for: PK7_FOR_C14 },
  "u8-pk-protractor-acute": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  "u8-pk-protractor-obtuse": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  "u8-pk-protractor-five": { src: "math-6:MA6.9.13", group: "protractor", for: PK7_FOR_C14 },
  /* Cluster 7-C15 top-ups and first-quadrant copies. */
  "u8-pk-axes-origin-point": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-axes-name": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-axes-on-axis": { src: "math-6:MA6.10.9", group: "axes-origin", for: PK7_FOR_AXES },
  "u8-pk-trans-identify-slide": { src: "math-5:MA5.10.12", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-identify-flip": { src: "math-5:MA5.10.13", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-describe": { src: "math-5:MA5.10.16", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-trans-identify-turn": { src: "math-5:MA5.10.14", group: "transformations", for: PK7_FOR_TRANSF },
  "u8-pk-fq-read": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-which": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-coord": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 },
  "u8-pk-fq-move": { src: "math-6:MA6.10.9", group: "first-quadrant", for: PK7_FOR_C15 }
};
BANK.forEach(function (e) {
  var m = PKT7_P3[e.id];
  if (m) { e.pkFlag = true; e.pkSrc = m.src; e.pkGroup = m.group; e.pkFor = m.for; }
});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-evaluate-cr":2,"u1-factors-count-cr":3,"u1-far-term-cr":3,"u1-gap-budget-compare-cr":3,"u1-gap-divisible-count-cr":2,"u1-gap-solve-count-cr":2,"u1-gap-two-terms-cr":3,"u1-solve-812-cr":3,"u1-table-value-cr":3,"u2-add-cr":3,"u2-gap-chain-target-cr":2,"u2-gap-mean-target-cr":3,"u2-gap-missing-start-cr":2,"u2-gap-order-ops-cr":3,"u2-gap-round-trip-cr":3,"u2-missing-addend-cr":3,"u2-numberline-cr":3,"u2-problem-cr":3,"u2-sub-cr":2,"u3-cr-add-sub":3,"u3-cr-div":2,"u3-cr-mult":3,"u3-cr-order-ops":3,"u3-cr-percent":3,"u3-cr-repeating-frac":2,"u3-gap-compare-difference-cr":3,"u3-gap-decimal-fraction-cr":3,"u3-gap-discount-total-cr":2,"u3-gap-tickets-left-cr":2,"u4-cr-area-circle":3,"u4-cr-area-mix":3,"u4-cr-circumference":3,"u4-cr-composite":3,"u4-cr-graph-quantity":2,"u4-gap-area-diameter-cr":2,"u4-gap-rect-minus-circle-cr":2,"u4-gap-revolutions-cr":3,"u5-gap-frac-of-frac-cr":3,"u5-gap-grams-cr":3,"u5-gap-recipe-total-cr":2,"u5-gap-sub-mixed-dec-cr":2,"u5-mixed-multistep":3,"u5-problem-add":3,"u5-problem-sub-mixed":2,"u5-simplify-solution":3,"u5-three-fractions":3,"u6-gap-both-sides-cr":2,"u6-gap-check-diff-cr":3,"u6-gap-divide-form-cr":3,"u6-gap-two-step-cr":2,"u6-model-solve-cr":3,"u6-one-step-problem-cr":3,"u6-preservation-problem-cr":2,"u6-problem-two-step-cr":3,"u6-solve-challenge-cr":3,"u7-central-problem-cr":3,"u7-expected-count-cr":3,"u7-gap-expected-pct-cr":3,"u7-gap-joint-pct-cr":3,"u7-gap-median-range-cr2":2,"u7-gap-missing-mean-cr":2,"u7-median-range-cr":3,"u7-missing-value-cr":3,"u7-two-event-pct-cr":2,"u8-bisector-cr":3,"u8-distance-cr":3,"u8-gap-angle-chain-cr":2,"u8-gap-grid-area-cr":3,"u8-gap-parallel-angle-cr":3,"u8-gap-pythagoras-cr":2,"u8-gap-rotate-cr":3,"u8-successive-cr":2,"u8-transform-cr":3,"u8-translate-cr":3};
/* ============ Bimodal entries (generated) ============ */
/* Built by assemble-bank.py from the BIMODAL manifests in the unit
   files (Spec-Bimodal-Questions-2026-11-19.md): entries whose
   multiple-choice questions may be stripped to constructed
   response, class a (online-checkable) or b (print/self-check). */
window.__BANK_BIMODAL={};
