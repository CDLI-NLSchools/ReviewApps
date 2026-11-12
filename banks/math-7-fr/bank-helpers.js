/* Math 7 (French) bank helpers: the French number-format helpers
   (frNum, fmtD, fmtDF) the bank calls, cut verbatim from the
   standalone app's chassis (math-7-review-fr/index.html), followed
   by the head of the standalone bank source (math-7-review-fr/
   bank-src.js, lines 1 to 27: the FR fraction helper and precPair), where it precedes the Unit 1 banner. In the
   standalone the chassis helpers live in the page and the bank
   reads them as globals, so the unified bank module carries them
   here, first in the build order. */
function frNum(s){s=String(s);var neg=false;if(s.charAt(0)==="-"){neg=true;s=s.slice(1);}var p=s.split("."),ip=p[0],dp=(p.length>1?p[1]:null);if(ip.length>3){var out="";while(ip.length>3){out="\u00A0"+ip.slice(ip.length-3)+out;ip=ip.slice(0,ip.length-3);}ip=ip+out;}return (neg?"-":"")+ip+(dp===null?"":","+dp);}
function fmtD(n,d){return frNum(fmt(n,d));}
function fmtDF(n,d){return frNum(fmtF(n,d));}
/* Math 7 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit8.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

function precPair(keyT, ds){
  function parse(s){ var t=String(s); var suf=""; if(t.slice(-2)===" $"){suf=" $";t=t.slice(0,-2);} else if(t.slice(-2)===" %"){suf=" %";t=t.slice(0,-2);} else if(t.slice(-1)==="%"){suf="%";t=t.slice(0,-1);} var m=t.match(/^(-?[\d\u00A0\u202F ]+?)(?:,(\d+))?$/); if(!m) return null; return {intp:m[1], frac:m[2]||"", suf:suf, dp:(m[2]||"").length}; }
  var k=parse(keyT); if(!k) return ds;
  var ps=ds.map(function(o){ return parse(o.t); });
  if(ps.some(function(p){ return !p; })) return ds;
  var M=k.dp; ps.forEach(function(p){ if(p.dp>M) M=p.dp; });
  function render(p,target){
    var core;
    if(target===0) core=p.intp;
    else if(p.dp>=target) core=p.intp+","+(p.frac||"");
    else if(p.dp===0) core=p.intp+","+("000000".slice(0,target));
    else core=p.intp+","+p.frac+("000000".slice(0,target-p.dp));
    return core+p.suf;
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
  var out='<svg viewBox="0 0 350 180" width="350" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallélogramme coupé et réorganisé en rectangle">';
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
  var out='<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forme divisée en deux triangles identiques">';
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
  var out='<svg viewBox="0 0 260 215" width="260" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle avec un demi-cercle sur le dessus">';
  out+='<path d="M 55 85 A 75 75 0 0 1 205 85" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="55,85 205,85 205,185 55,185" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt(130,202,wLabel,12.5,false);
  out+=_txt(32,135,lLabel,12.5,false);
  return out+'</svg>';
}
function figRectCircle(L,W,r,unit){
  var sc=Math.min(230/L,120/W), rw=L*sc, rh=W*sc, x0=(300-rw)/2, y0=(190-rh)/2, cx=150, cy=95, rp=r*sc;
  var out='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle avec un cercle dedans">';
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
  var out='<svg viewBox="0 0 300 175" width="300" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parcelle en parallélogramme jointe à une parcelle triangulaire">';
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
  var out='<svg viewBox="0 0 '+W+' '+Hh+'" width="'+W+'" height="'+Hh+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Forme sur papier quadrillé faite de carrés entiers et de demi-carrés">';
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
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plan cartésien quadrillé">';
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
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Axes du plan cartésien">';
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
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme de bissectrice">';
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
  var out='<svg viewBox="0 0 260 175" width="260" height="175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segment traversé en son milieu par sa médiatrice">';
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
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Point sur la médiatrice">';
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
  var out='<svg viewBox="0 0 260 180" width="260" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle divisé par sa bissectrice">';
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
  var out='<svg viewBox="0 0 330 180" width="330" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angles sur une ligne droite">';
  out+='<line x1="25" y1="125" x2="305" y2="125" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  out+='<line x1="165" y1="125" x2="211" y2="60" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M 199 125 A 34 34 0 0 0 184.5 97.1" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<path d="M 193.7 84 A 50 50 0 0 0 115 125" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  out+='<circle cx="165" cy="125" r="3.2" fill="'+FIG_INK+'"/>';
  out+=_txt(222,104,halfLabel,12.5,false);
  out+=_txt(100,98,"x",14,true);
  return out+'</svg>';
}
