/* Math 7 (French) bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-7-fr/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
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

/* ----- bank-u1.js ----- */
// Math 7 (French) Unit 1 Patterns and Relations question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 28 to 601).
// CRMARKS: u1-factors-count-cr=3
// CRMARKS: u1-evaluate-cr=2
// CRMARKS: u1-table-value-cr=3
// CRMARKS: u1-far-term-cr=3
// CRMARKS: u1-solve-812-cr=3
/* ===== Unit 1 ===== */
/* TRANSLATOR NOTES
   Chunk: Math 7, Unit 1 (Les régularités et les relations), 25 entries
   u1-*. Translated per RULES.md and GLOSSARY.md; Grade 7 guide terms win:
   "régularité" (pattern), "table de valeurs", "coefficient numérique" and
   "terme constant" (7RR4.2), "diagramme de Carroll" (7N1.2),
   "chevauchement" for the Venn overlap.

   Judgement calls (glossary silent or wording rebuilt):
   - "divisibility test" rendered "test de divisibilité"; the u1Why
     fragments are rebuilt so they still slot into the feedback and
     solution sentences that embed them (digit sum: "la somme de ses
     chiffres donne ...").
   - Carroll cells: "Not even" rendered "impair" and "Not divisible by 5"
     "Non divisible par 5", so the four cell names match the row and
     column headings used in the question.
   - Money rebuilt as amount + " $" throughout, including the relation
     context fees (fee/rate are variables, so the $ follows the number
     expression) and the u1-table-value-cr solution ("<b>"+val+" $</b>").
   - Axis labels in figure calls translated ("livres", "semaines",
     "coût ($)", "hauteur (cm)", "distance (km)", "économies ($)"); the
     "($)" is a unit label, not an amount, so it stays in parentheses.
   - \text{term} became \text{terme} and \text{count} became
     \text{nombre} in worked solutions.
   - Personal name kept unchanged: Mina.

   FMT-GEOM lines left as fmt( (SVG coordinates / transform values in
   the u1Plot helper and in u1-match-graph-panel):
   - u1Plot gridline y line (fmt(Y,1) twice)
   - u1Plot y tick label line (fmt(Y+3,1))
   - u1Plot gridline x line (fmt(X,1) twice)
   - u1Plot x tick label line (fmt(X,1))
   - u1Plot point circle line (cx/cy)
   - u1Plot x-label line (fmt(ox+xMax*sx/2,1))
   - u1Plot y-label line (fmt(oy-yMax*sy/2,1), incl. rotate transform)
   - u1-match-graph-panel panel circle line (cx/cy)
   The one display fmt( in prose feedback (u1-divisible-by distractor
   feedback, fmt(m)) became fmtD(m). No fmtF( or .toFixed( in this chunk.

   Unsure about: nothing blocking. No percent literals occur in this
   unit; no literal decimals in display strings (no TeX length
   arguments either).
*/
/* Math 7 Unit 1: Patterns and Relations. Helpers prefixed u1. */
function u1Expr(a,b,v){ v=v||"n"; var s=(a===1?v:a+v); if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u1DigitSum(n){ var s=0; n=Math.abs(n); while(n>0){ s+=n%10; n=Math.floor(n/10);} return s; }
function u1Why(n,d,yes){
  var last=n%10, last2=n%100, last3=n%1000, ds=u1DigitSum(n);
  if(d===2) return yes?("son dernier chiffre, "+last+", est pair"):("son dernier chiffre, "+last+", est impair");
  if(d===5) return yes?("il se termine par "+last):("il se termine par "+last+", pas par 0 ou 5");
  if(d===10) return yes?("il se termine par 0"):("il se termine par "+last+", pas par 0");
  if(d===4) return yes?("ses deux derniers chiffres forment "+last2+", qui est divisible par 4"):("ses deux derniers chiffres forment "+last2+", qui n'est pas divisible par 4");
  if(d===8) return yes?("ses trois derniers chiffres forment "+last3+", qui est divisible par 8"):("ses trois derniers chiffres forment "+last3+", qui n'est pas divisible par 8");
  if(d===3) return yes?("la somme de ses chiffres donne "+ds+", qui est divisible par 3"):("la somme de ses chiffres donne "+ds+", qui n'est pas divisible par 3");
  if(d===9) return yes?("la somme de ses chiffres donne "+ds+", qui est divisible par 9"):("la somme de ses chiffres donne "+ds+", qui n'est pas divisible par 9");
  if(d===6){ if(yes) return "il est pair et la somme de ses chiffres donne "+ds+", divisible par 3";
    if(n%2!==0) return "il est impair, donc il échoue au test pour 2"; return "la somme de ses chiffres donne "+ds+", pas divisible par 3, donc il échoue au test pour 3"; }
  return "";
}
function u1Factors(n){ var f=[]; for(var i=1;i<=n;i++){ if(n%i===0)f.push(i);} return f; }
function u1Plot(pts,xMax,yMax,xLab,yLab){
  var W=252,H=214,ox=36,oy=178,sx=(W-ox-14)/xMax,sy=(oy-24)/yMax;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  var yStep=yMax>12?2:1;
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>'; /* FMT-GEOM */
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; } /* FMT-GEOM */
  for(var gx=0;gx<=xMax;gx++){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>'; /* FMT-GEOM */
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; } /* FMT-GEOM */
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  pts.forEach(function(p){ s+='<circle cx="'+fmt(ox+p[0]*sx,1)+'" cy="'+fmt(oy-p[1]*sy,1)+'" r="4" fill="'+FIG_ACC+'"/>'; }); /* FMT-GEOM */
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>'; /* FMT-GEOM */
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>'; /* FMT-GEOM */
  return s+'</svg>';
}

E("u1-divisible-by", 1, ["5.1"], 1, "gen", function(){
  var d=pick([2,3,4,5,6,8,9,10]);
  var n=ri(12,140)*d;
  var ds=[],guard=0;
  while(ds.length<3&&guard++<300){ var m=ri(24,1400); if(m%d!==0&&m!==n&&ds.indexOf(m)<0)ds.push(m); }
  var opts=ds.map(function(m){ return {t:String(m), fb:fmtD(m)+" n'est pas divisible par "+d+" : "+u1Why(m,d,false)+"."}; });
  return mcq("Quel nombre est divisible par \\("+d+"\\) ?",
    {t:String(n), fb:"Oui : "+u1Why(n,d,true)+", donc \\("+n+" \\div "+d+"\\) n'a pas de reste."}, opts,
    "Utilise le test de divisibilité pour \\("+d+"\\) : "+u1Why(n,d,true)+". Donc \\("+n+"\\) est divisible par \\("+d+"\\). La réponse est <b>"+n+"</b>.",
    {d:d,n:n});
}, ["Choisis d'abord le diviseur et rappelle-toi son test de divisibilité.", "Commence par appliquer le test à chaque nombre à tour de rôle jusqu'à ce qu'un nombre réussisse."]);

E("u1-divisibility-why", 1, ["5.1"], 1, "gen", function(){
  var d=pick([3,9]), n=0, guard=0;
  while(guard++<500){ var cand=ri(210,980); if(cand%d===0&&(cand%10)%d!==0&&(cand%100)%d!==0&&(cand%10)!==0&&(cand%10)!==5){ n=cand; break; } }
  if(!n)n=(d===3?417:648);
  var S=u1DigitSum(n), last=n%10, last2=n%100;
  var opts=[
    {t:"Son dernier chiffre, "+last+", est lui-même divisible par "+d+".", fb:"Le dernier chiffre est le test pour 2, 5 et 10, pas pour "+d+"."},
    {t:"Ses deux derniers chiffres forment "+last2+", qui est divisible par "+d+".", fb:"Le test des deux derniers chiffres est pour 4. Pour "+d+", utilise la somme des chiffres."},
    {t:"Il se termine par 0 ou 5, ce qui est le test pour 5.", fb:"Se terminer par 0 ou 5 est le test pour 5 (et en partie pour 10), pas pour "+d+"."}];
  return mcq("Pourquoi \\("+n+"\\) est-il divisible par \\("+d+"\\) ?",
    {t:"La somme de ses chiffres donne "+S+", et "+S+" est divisible par "+d+".", fb:"Exact : le test de la somme des chiffres décide de la divisibilité par "+d+"."}, opts,
    "Additionne les chiffres de \\("+n+"\\) : la somme des chiffres est \\("+S+"\\), et \\("+S+" \\div "+d+" = "+(S/d)+"\\). Une somme des chiffres divisible par \\("+d+"\\) signifie que le nombre est divisible par \\("+d+"\\). La réponse est <b>la somme des chiffres, "+S+", est divisible par "+d+"</b>.",
    {d:d,n:n,S:S});
}, ["Rappelle-toi quel test va avec ce diviseur : 3 et 9 utilisent une somme des chiffres.", "Commence par additionner tous les chiffres du nombre."]);

E("u1-venn-overlap", 1, ["5.2"], 2, "gen", function(){
  var both=0,only2=0,only3=0,neither=0,g=0;
  while(g++<600){ var c1=ri(12,96); if(c1%6===0)both=c1; var c2=ri(11,99); if(c2%2===0&&c2%3!==0)only2=c2;
    var c3=ri(11,99); if(c3%3===0&&c3%2!==0)only3=c3; var c4=ri(11,99); if(c4%2!==0&&c4%3!==0)neither=c4;
    if(both&&only2&&only3&&neither&&new Set([both,only2,only3,neither]).size===4)break; }
  var nums=shuffle([both,only2,only3,neither]);
  var fbMap={}; fbMap[both]="Oui : "+both+" est divisible par 2 et par 3, donc il se trouve dans le chevauchement.";
  fbMap[only2]=only2+" est divisible par 2, mais la somme de ses chiffres donne "+u1DigitSum(only2)+", pas divisible par 3, donc il va dans le cercle du 2 seulement.";
  fbMap[only3]=only3+" est divisible par 3 mais impair, donc il va dans le cercle du 3 seulement.";
  fbMap[neither]=neither+" n'est divisible ni par 2 ni par 3, donc il va à l'extérieur des deux cercles.";
  var opts=nums.filter(function(m){return m!==both;}).map(function(m){return {t:String(m), fb:fbMap[m]};});
  var q=mcq("Les nombres \\("+nums.join(", ")+"\\) sont triés dans un diagramme de Venn dont les cercles sont étiquetés Divisible par 2 et Divisible par 3. Quel nombre va dans le chevauchement des deux cercles ?",
    {t:String(both), fb:fbMap[both]}, opts,
    "Le chevauchement contient les nombres divisibles par 2 et par 3. Seul \\("+both+"\\) réussit les deux tests : "+u1Why(both,2,true)+" et "+u1Why(both,3,true)+". La réponse est <b>"+both+"</b>.",
    {both:both});
  q.figure='<svg width="300" height="170" viewBox="0 0 300 170" xmlns="http://www.w3.org/2000/svg">'
    +'<circle cx="118" cy="88" r="62" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<circle cx="184" cy="88" r="62" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="86" y="34" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">Divisible par 2</text>'
    +'<text x="216" y="34" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">Divisible par 3</text>'
    +'<text x="151" y="92" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">les deux</text></svg>';
  return q;
}, ["Le chevauchement est pour les nombres qui réussissent les deux tests.", "Commence par tester chaque nombre pour la divisibilité par 2, puis par 3."]);

E("u1-carroll-cell", 1, ["5.2","5.1"], 1, "gen", function(){
  var n=ri(11,99), by5=n%5===0, even=n%2===0;
  var cells=["Divisible par 5 et pair","Divisible par 5 et impair","Non divisible par 5 et pair","Non divisible par 5 et impair"];
  var idx=(by5?0:2)+(even?0:1);
  var facts="\\("+n+"\\) se termine par "+(n%10)+", donc "+(by5?"il est divisible par 5":"il n'est pas divisible par 5")+" et il est "+(even?"pair":"impair")+".";
  var opts=cells.filter(function(c,i){return i!==idx;}).map(function(c){ return {t:c, fb:"Cette case demande d'autres résultats de tests. "+facts}; });
  return mcq("Un diagramme de Carroll a les rangées Divisible par 5 et Non divisible par 5, et les colonnes Pair et Impair. Dans quelle case va \\("+n+"\\) ?",
    {t:cells[idx], fb:"Exact : "+facts}, opts,
    "Teste \\("+n+"\\) : "+facts+" Il appartient donc à la rangée et à la colonne qui correspondent à ces résultats. La réponse est <b>"+cells[idx]+"</b>.",
    {n:n});
}, ["Fais les deux tests sur le nombre avant de choisir une case.", "Commence par le test pour 5 (le dernier chiffre), puis vérifie si le nombre est pair."]);

E("u1-divide-by-zero", 1, ["5.3"], 1, "var", varset([
  function(){ return mcq("Pourquoi ne peut-on pas donner une réponse à \\(12 \\div 0\\) ?",
    {t:"Il n'y a aucun nombre qui, multiplié par 0, donne 12.", fb:"Exact : on vérifie une division par une multiplication, et tout nombre fois 0 donne 0."},
    [{t:"La réponse est 0, parce que zéro groupe ne partage rien.", fb:"Si 12 divisé par 0 donnait 0, alors 0 fois 0 devrait égaler 12, et ce n'est pas le cas."},
     {t:"La réponse est 12, le même nombre que celui du départ.", fb:"Si c'était 12, alors 12 fois 0 devrait égaler 12, mais cela donne 0."},
     {t:"N'importe quel nombre peut être la réponse ici.", fb:"Un quotient doit se vérifier par multiplication; aucun nombre fois 0 ne donne 12."}],
    "La division défait la multiplication. Pour que \\(12 \\div 0\\) ait une réponse \\(q\\), il faudrait \\(q \\times 0 = 12\\), mais tout nombre fois 0 donne 0. La réponse est <b>un tel nombre n'existe pas</b>.", {}); },
  function(){ return mcq("Dix biscuits doivent être partagés également en groupes, mais la taille du groupe est 0. Pourquoi \\(10 \\div 0\\) échoue-t-il ?",
    {t:"On ne peut pas partager en 0 groupe, donc la division n'a pas de réponse.", fb:"Exact : un diviseur de 0 demande des groupes de rien, qui ne peuvent rien partager."},
    [{t:"Chaque groupe reçoit 10 biscuits, comme s'il n'y avait qu'un groupe.", fb:"Cela décrirait un seul groupe de 10, un diviseur de 1, pas de 0."},
     {t:"Chaque groupe reçoit 0 biscuit et le partage est terminé.", fb:"Des groupes de 0 n'utilisent jamais les 10 biscuits, donc le partage ne se termine jamais."},
     {t:"La réponse est 10 parce que rien ne change quand la taille du groupe est 0.", fb:"Diviser par 0, ce n'est pas ne rien faire; cela n'a pas de réponse."}],
    "Diviser par 0 signifie faire des groupes de taille 0. Des groupes de 0 n'utilisent jamais les 10 biscuits, donc le processus ne peut pas se terminer. La réponse est <b>la division par 0 n'a pas de réponse</b>.", {}); },
  function(){ return mcq("Quel énoncé explique pourquoi \\(7 \\div 0\\) est impossible ?",
    {t:"Un quotient q devrait vérifier q fois 0 égale 7, et cela n'arrive jamais.", fb:"Exact : cette vérification par multiplication est exactement la définition de la division."},
    [{t:"Sept est un nombre impair, et les nombres impairs ne se divisent pas.", fb:"Les nombres impairs se divisent très bien par beaucoup de diviseurs; l'imparité n'est pas le problème."},
     {t:"Zéro est plus petit que sept, donc il ne peut pas servir à diviser sept.", fb:"Les petits diviseurs fonctionnent : 7 divisé par 1 ou par 7 fonctionne."},
     {t:"La réponse serait un très grand nombre, trop grand pour être écrit ici.", fb:"Aucun nombre, grand ou petit, multiplié par 0 ne donne 7."}],
    "Vérifie par multiplication : \\(7 \\div 0 = q\\) signifierait \\(q \\times 0 = 7\\). Comme \\(q \\times 0 = 0\\) pour tout \\(q\\), c'est impossible. La réponse est <b>la vérification par multiplication ne peut jamais fonctionner</b>.", {}); },
  function(){ return mcq("Un élève écrit \\(9 \\div 0 = 0\\). Pourquoi l'élève a-t-il tort ?",
    {t:"Si le quotient était 0, alors 0 fois 0 devrait égaler 9.", fb:"Exact : la vérification par multiplication échoue, donc 0 ne peut pas être le quotient."},
    [{t:"Le quotient devrait être 9, le nombre qu'on a divisé au départ.", fb:"Alors 9 fois 0 devrait égaler 9, mais cela donne 0."},
     {t:"Neuf ne peut pas être divisé par de petits nombres ici.", fb:"Neuf se divise par 1, 3 et 9 sans problème; 0 est le diviseur spécial."},
     {t:"Zéro ne peut jamais apparaître dans un calcul, d'aucune sorte.", fb:"Zéro fonctionne comme dividende : 0 divisé par 9 donne 0. Il échoue comme diviseur."}],
    "Teste l'affirmation par multiplication : \\(0 \\times 0 = 0\\), pas 9, donc 0 n'est pas le quotient de \\(9 \\div 0\\), et aucun autre nombre ne fonctionne non plus. La réponse est <b>l'affirmation échoue à la vérification par multiplication</b>.", {}); },
  function(){ return mcq("Laquelle de ces divisions peut être effectuée ?",
    {t:"0 divisé par 6", fb:"Exact : 0 partagé en 6 groupes donne 0 dans chaque groupe, et 6 fois 0 redonne 0."},
    [{t:"6 divisé par 0", fb:"Un diviseur de 0 demanderait un nombre fois 0 qui donne 6, ce qui est impossible."},
     {t:"0 divisé par 0", fb:"Avec un diviseur de 0, tout nombre fois 0 donne 0, donc il n'y a pas une seule réponse."},
     {t:"14 divisé par 0", fb:"Un diviseur de 0 ne fonctionne jamais, quel que soit le dividende."}],
    "Seul un diviseur nul cause le problème. \\(0 \\div 6 = 0\\) parce que \\(6 \\times 0 = 0\\). La réponse est <b>0 divisé par 6</b>.", {}); }
]), ["Pense à la façon dont on vérifie une division par une multiplication.", "Commence par te demander quel nombre fois le diviseur donnerait le dividende."]);

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
    {t:missing, fb:"Cette liste oublie "+dv+", et "+dv+" divise "+n+" exactement."},
    {t:withExtra, fb:"Cette liste comprend "+extraVal+", et "+extraVal+" ne divise pas "+n+" exactement."},
    {t:proper, fb:"Cette liste oublie "+n+" lui-même; un nombre est toujours un facteur de lui-même."}];
  return mcq("Quelle liste donne TOUS les facteurs de \\("+n+"\\) ?",
    {t:full, fb:"Exact : chaque nombre de la liste divise "+n+" exactement, et il n'en manque aucun."}, opts,
    "Teste les petits nombres en ordre à l'aide des règles de divisibilité et note chaque paire de facteurs. Les facteurs de \\("+n+"\\) sont "+full+". La réponse est <b>"+full+"</b>.",
    {n:n});
}, ["Parcours les petits nombres en ordre et teste chacun.", "Commence par 1 et le nombre lui-même, puis teste 2, 3, 4 et ainsi de suite, en notant les paires."]);

E("u1-variable-meaning", 1, ["8.4"], 1, "var", varset([
  function(){ return mcq("Les billets coûtent 9 $ chacun. Le coût total s'écrit \\(9t\\), où \\(t\\) est le nombre de billets. Qu'est-ce que \\(t\\) ?",
    {t:"Une variable : une valeur qui peut changer d'un achat à l'autre.", fb:"Exact : la lettre représente une quantité qui n'est pas fixe."},
    [{t:"Le signe de multiplication qui joint le 9 et le t dans l'expression.", fb:"La multiplication est sous-entendue quand on écrit 9 à côté de t; t lui-même représente le nombre de billets."},
     {t:"Une valeur fixe de 9 qui reste la même pour chaque achat de billets.", fb:"Neuf est le prix d'un billet; t est la partie qui change."},
     {t:"Le coût total de tous les billets achetés dans l'achat entier.", fb:"Le coût total est l'expression entière 9t; t est le nombre de billets."}],
    "Dans \\(9t\\), la lettre \\(t\\) représente le nombre de billets, qui change à chaque achat. Une lettre utilisée ainsi est une variable. La réponse est <b>une variable, une valeur qui peut changer</b>.", {}); },
  function(){ return mcq("Dans la formule du périmètre d'un carré, \\(P = 4s\\), que représente la variable \\(s\\) ?",
    {t:"La longueur du côté du carré, qui peut être n'importe quelle valeur.", fb:"Exact : s change selon la taille du carré."},
    [{t:"Le nombre 4, qui compte les côtés du carré dans la formule du périmètre.", fb:"Quatre est le nombre de côtés égaux; s est la longueur du côté."},
     {t:"Le périmètre lui-même, la distance tout autour du carré entier.", fb:"Le périmètre est P; s est la longueur du côté utilisée pour le trouver."},
     {t:"Une unité comme les centimètres pour mesurer une longueur quelconque.", fb:"Les unités s'écrivent après une mesure; s représente la valeur de la longueur."}],
    "\\(P = 4s\\) multiplie la longueur du côté par 4. La lettre \\(s\\) peut être n'importe quelle longueur de côté, donc c'est la variable. La réponse est <b>la longueur du côté, qui peut être n'importe quelle valeur</b>.", {}); },
  function(){ return mcq("Une classe écrit l'expression \\(20 - 2m\\) pour l'argent qui reste après l'achat de \\(m\\) muffins à 2 $ chacun avec 20 $. Que fait \\(m\\) dans cette expression ?",
    {t:"Il tient la place du nombre de muffins, qui n'est pas encore fixé.", fb:"Exact : m peut être 1, 2, 3 et ainsi de suite, et l'argent qui reste change avec lui."},
    [{t:"Il nous dit de soustraire 2 exactement m fois, comme un signe d'opération.", fb:"La partie 2m est une multiplication; m lui-même est le nombre de muffins."},
     {t:"C'est une étiquette pour les muffins, comme une unité de mesure.", fb:"Ici, m est un nombre qui peut varier, pas une étiquette d'unité."},
     {t:"Il doit égaler 20, le montant d'argent avec lequel la classe a commencé.", fb:"Vingt est le montant d'argent de départ; m est le nombre inconnu."}],
    "La valeur de \\(20 - 2m\\) change quand le nombre de muffins change, donc \\(m\\) est une variable qui tient la place de ce nombre. La réponse est <b>il tient la place d'une valeur qui peut changer</b>.", {}); },
  function(){ return mcq("Quel énoncé sur une variable est exact ?",
    {t:"Une variable est une lettre ou un symbole qui représente une valeur qui peut changer ou qui est inconnue.", fb:"Exact : c'est exactement ce que fait une variable dans une expression."},
    [{t:"Une variable représente toujours le nombre 1, quelle que soit l'expression où elle apparaît, sans exception.", fb:"Une variable peut représenter beaucoup de valeurs différentes, pas seulement 1."},
     {t:"Une variable est un autre nom pour un signe égal, le symbole qui joint les deux côtés d'une équation.", fb:"Le signe égal joint les deux côtés d'une équation; une variable est une lettre ou un symbole."},
     {t:"Une variable doit être la lettre x, et aucune autre lettre ne peut jamais en tenir lieu dans une expression.", fb:"N'importe quelle lettre peut être utilisée, comme n, t ou s, selon le contexte."}],
    "Une variable est une lettre ou un symbole qui tient la place d'une valeur qui peut changer ou que l'on ne connaît pas encore. La réponse est <b>une lettre ou un symbole pour une valeur qui peut changer ou qui est inconnue</b>.", {}); },
  function(){ return mcq("Dans \\(7 - 2t\\), le temps passé aux devoirs en heures est \\(t\\). Si \\(t\\) augmente, qu'arrive-t-il à la valeur de l'expression ?",
    {t:"Elle diminue, parce qu'un plus grand t rend la partie soustraite plus grande.", fb:"Exact : 2t augmente avec t, et on le soustrait de 7."},
    [{t:"Elle reste à 7, parce que le nombre de départ de l'expression ne change jamais.", fb:"Sept n'est que la valeur de départ; la partie soustraite change avec t."},
     {t:"Elle augmente, parce que t devient de plus en plus grand avec le temps.", fb:"Un plus grand t rend 2t plus grand, mais cette partie est soustraite, donc la valeur diminue."},
     {t:"Elle ne peut pas changer, parce que t n'est qu'une lettre dans l'expression.", fb:"Une variable change de valeur; c'est son rôle."}],
    "Quand \\(t\\) augmente, \\(2t\\) augmente, et soustraire un plus grand montant de 7 donne un plus petit résultat. La réponse est <b>elle diminue</b>.", {}); }
]), ["Une variable tient la place d'une valeur qui n'est pas fixe.", "Commence par te demander quelle partie de l'expression peut changer d'un cas à l'autre."]);

E("u1-identify-parts", 1, ["8.5"], 1, "gen", function(){
  var a=ri(2,9), b=ri(2,15), v=pick(["n","x","t","m","s"]);
  var form=pick(["expr","eq"]);
  var modes=form==="eq"?["coef","var"]:["coef","const","var"];
  var mode=pick(modes);
  var c=ri(20,60);
  var shown="\\("+u1Expr(a,b,v)+(form==="eq"?" = "+c:"")+"\\)";
  var kind=form==="eq"?"équation":"expression";
  if(mode==="coef"){
    var cand=[b,a+b,a+1,2*a,a-1].filter(function(x){return x!==a;});
    var seen={},ds=[]; cand.forEach(function(x){ if(!seen[x]&&ds.length<3){seen[x]=1;ds.push(x);} });
    var fbFor=function(x){ if(x===b)return "C'est le terme constant, pas le coefficient."; if(x===a+b)return "Cela additionne le coefficient et la constante ensemble."; return "Ce nombre n'apparaît pas comme le multiplicateur de "+v+"."; };
    return mcq("Dans l'"+kind+" "+shown+", quel est le coefficient numérique de \\("+v+"\\) ?",
      {t:String(a), fb:"Exact : "+v+" est multiplié par "+a+"."}, ds.map(function(x){return {t:String(x), fb:fbFor(x)};}),
      "Le coefficient numérique est le nombre qui multiplie la variable. Dans "+shown+", \\("+v+"\\) est multiplié par \\("+a+"\\). La réponse est <b>"+a+"</b>.",
      {mode:mode,a:a,b:b});
  }
  if(mode==="const"){
    var cand2=[a,a+b,b+1,2*b,b-1].filter(function(x){return x!==b&&x>0;});
    var seen2={},ds2=[]; cand2.forEach(function(x){ if(!seen2[x]&&ds2.length<3){seen2[x]=1;ds2.push(x);} });
    var fbFor2=function(x){ if(x===a)return "C'est le coefficient de "+v+", pas le terme constant."; if(x===a+b)return "Cela additionne les deux parties ensemble; le terme constant est seul."; return "Cette valeur n'est pas le nombre seul dans l'expression."; };
    return mcq("Dans l'expression "+shown+", quel est le terme constant ?",
      {t:String(b), fb:"Exact : "+b+" est le terme sans variable attachée."}, ds2.map(function(x){return {t:String(x), fb:fbFor2(x)};}),
      "Le terme constant est le terme qui ne change pas avec la variable. Dans "+shown+", c'est \\("+b+"\\). La réponse est <b>"+b+"</b>.",
      {mode:mode,a:a,b:b});
  }
  var others=["n","x","t","m","s","k"].filter(function(L){return L!==v;});
  var ds3=shuffle(others).slice(0,3);
  return mcq("Dans l'"+kind+" "+shown+", quelle lettre est la variable ?",
    {t:v, fb:"Exact : "+v+" est la lettre dont la valeur peut changer."}, ds3.map(function(L){return {t:L, fb:"La lettre "+L+" n'apparaît pas dans cette "+kind+"."};}),
    "La variable est la lettre dans l'"+kind+", ici \\("+v+"\\). La réponse est <b>"+v+"</b>.",
    {mode:mode,a:a,b:b});
}, ["Nomme les trois parties : coefficient, terme constant et variable.", "Commence par trouver la lettre; le nombre qui lui est attaché et le nombre qui est seul sont les deux autres parties."]);

E("u1-expression-or-equation", 1, ["8.6"], 1, "var", varset([
  function(){ return mcq("Laquelle est une équation ?",
    {t:"5n + 3 = 18", fb:"Exact : elle a un signe égal qui joint deux expressions."},
    [{t:"5n + 3", fb:"C'est une expression : il n'y a pas de signe égal."},
     {t:"5n - 3 + 2n", fb:"C'est encore une seule expression; rien n'est égalé à rien."},
     {t:"18 - 5n", fb:"C'est une expression, même si elle commence par un nombre."}],
    "Une équation affirme que deux expressions sont égales, donc elle doit contenir un signe égal. Seul \\(5n + 3 = 18\\) en a un. La réponse est <b>5n + 3 = 18</b>.", {}); },
  function(){ return mcq("En quoi une expression et une équation se ressemblent-elles et diffèrent-elles ?",
    {t:"Les deux peuvent contenir des nombres, des opérations et des variables, mais seule une équation a un signe égal.", fb:"Exact : le signe égal est la différence clé."},
    [{t:"C'est la même chose avec des noms différents, car les deux sont formés exactement des mêmes sortes d'éléments.", fb:"Une équation affirme que deux côtés sont égaux; une expression ne le fait pas."},
     {t:"Une expression a des variables et une équation n'en a jamais, dans aucun cas.", fb:"Les équations contiennent souvent des variables, comme 2x + 5 = 17."},
     {t:"Une équation peut être évaluée et une expression peut seulement être résolue dans une question comme celle-ci, quand elle est posée.", fb:"C'est le contraire : on évalue les expressions, on résout les équations."}],
    "Les expressions et les équations sont construites avec les mêmes parties. L'équation ajoute un signe égal qui affirme que les deux côtés correspondent. La réponse est <b>les mêmes parties, mais seule l'équation a un signe égal</b>.", {}); },
  function(){ return mcq("Laquelle est une expression ?",
    {t:"9 - 3m", fb:"Exact : c'est une combinaison de nombres et d'une variable sans signe égal."},
    [{t:"9 - 3m = 0", fb:"Le signe égal en fait une équation."},
     {t:"3m = 9", fb:"C'est une équation : deux côtés joints par un signe égal."},
     {t:"9 = 3 + 6", fb:"Même avec des nombres seulement, le signe égal en fait une équation."}],
    "Une expression n'a pas de signe égal. \\(9 - 3m\\) est le seul choix sans signe égal. La réponse est <b>9 - 3m</b>.", {}); }
]), ["Cherche un signe égal : c'est l'élément décisif.", "Commence par vérifier chaque choix pour un signe égal."]);

E("u1-expression-or-equation-judge", 1, ["8.6"], 2, "var", varset([
  function(){ return mcq("Un élève dit que \\(4x + 7 = 19\\) est une expression. Quelle est la meilleure correction ?",
    {t:"C'est une équation, parce qu'un signe égal joint deux expressions.", fb:"Exact : le signe égal en fait une équation."},
    [{t:"L'élève a raison, parce qu'elle contient une variable comme celle-ci.", fb:"Les variables apparaissent dans les expressions et dans les équations."},
     {t:"C'est une équation seulement après qu'on l'a résolue, et pas avant.", fb:"C'est une équation telle qu'elle est écrite; la résoudre est quelque chose qu'on fait avec elle."},
     {t:"Ce n'est ni l'un ni l'autre, parce qu'elle a deux opérations en tout.", fb:"Le nombre d'opérations ne décide pas; le signe égal décide."}],
    "Le signe égal dans \\(4x + 7 = 19\\) joint \\(4x + 7\\) et \\(19\\), donc l'énoncé entier est une équation. La réponse est <b>c'est une équation à cause du signe égal</b>.", {}); },
  function(){ return mcq("Quelle tâche convient à une équation plutôt qu'à une expression ?",
    {t:"Trouve la valeur de x qui rend 2x + 5 = 17 vraie.", fb:"Exact : trouver la valeur qui rend un énoncé vrai, c'est résoudre une équation."},
    [{t:"Calcule la valeur de 2x + 5 quand x vaut 4 pour l'expression.", fb:"C'est évaluer une expression : une valeur pour x est déjà donnée."},
     {t:"Écris 2x + 5 = 17 en mots, sous forme de phrase.", fb:"Cela décrit une expression; il n'y a pas d'égalité à satisfaire."},
     {t:"Ajoute 3 à 2x + 5 pour former une nouvelle expression.", fb:"Cela construit une nouvelle expression, pas une équation."}],
    "Une équation demande la valeur qui rend les deux côtés égaux. Seule la première tâche fait cela. La réponse est <b>trouver la valeur de x qui rend 2x + 5 = 17 vraie</b>.", {}); }
]), ["Cherche un signe égal : c'est l'élément décisif.", "Commence par vérifier chaque choix pour un signe égal."]);
E("u1-parts-in-equation", 1, ["8.5","8.6"], 1, "gen", function(){
  var a=ri(2,9), b=ri(2,12), c=ri(20,60), v=pick(["n","x","t","m"]);
  var mode=pick(["coef","var"]);
  var shown="\\("+u1Expr(a,b,v)+" = "+c+"\\)";
  if(mode==="coef"){
    var cand=[b,c,a+b,2*a,a-1,a+2].filter(function(x){return x!==a&&x>0;});
    var seen={},ds=[]; cand.forEach(function(x){ if(!seen[x]&&ds.length<3){seen[x]=1;ds.push(x);} });
    var fbFor=function(x){ if(x===b)return "C'est le terme constant du côté gauche."; if(x===c)return "C'est la valeur du côté droit de l'équation."; return "Cela mélange les parties de l'équation."; };
    return mcq("Dans l'équation "+shown+", quel est le coefficient numérique de \\("+v+"\\) ?",
      {t:String(a), fb:"Exact : "+v+" est multiplié par "+a+"."}, ds.map(function(x){return {t:String(x), fb:fbFor(x)};}),
      "Le coefficient est le nombre qui multiplie la variable, où que l'équation soit écrite. Dans "+shown+", c'est \\("+a+"\\). La réponse est <b>"+a+"</b>.",
      {mode:mode,a:a});
  }
  var others=["n","x","t","m","k"].filter(function(L){return L!==v;});
  var ds3=shuffle(others).slice(0,3);
  return mcq("Dans l'équation "+shown+", quelle lettre est la variable ?",
    {t:v, fb:"Exact : "+v+" est l'inconnue dans cette équation."}, ds3.map(function(L){return {t:L, fb:"La lettre "+L+" n'apparaît pas dans cette équation."};}),
    "La variable est la lettre qui représente la valeur inconnue, ici \\("+v+"\\). La réponse est <b>"+v+"</b>.",
    {mode:mode,a:a});
}, ["Les parties gardent leurs noms dans une équation aussi.", "Commence par repérer la lettre, puis le nombre multiplié par elle."]);

E("u1-pattern-expression", 1, ["7.1"], 2, "gen", function(){
  var a0=0,d=0,g=0,corr="",cand=[];
  while(g++<400){ a0=ri(2,14); d=ri(2,7); corr=u1Expr(d,a0-d); cand=[u1Expr(d,a0),u1Expr(a0,d),u1Expr(d,-(a0-d))];
    if(a0!==d&&(a0-d)!==0&&new Set([corr].concat(cand)).size===4)break; }
  var terms=[a0,a0+d,a0+2*d,a0+3*d];
  return mcq("Une régularité commence par \\("+terms.join(", ")+", \\ldots\\) Quelle expression donne la valeur du terme à la position \\(n\\) ?",
    {t:corr, fb:"Exact : chaque pas ajoute "+d+", et le premier terme correspond à "+corr+" à n = 1."},
    cand.map(function(s,i){ return {t:s, fb: i===0?("Cela utilise le premier terme, "+a0+", comme constante; vérifie à n = 1, où cela donne "+(d+a0)+" au lieu de "+a0+"."):
      i===1?("Cela échange les rôles : "+a0+" est la valeur de départ, pas la taille du pas."):("Cela a le mauvais signe sur la constante; vérifie à n = 1.")}; }),
    "\\[ \\begin{aligned} \\text{terme} &= "+a0+" + (n-1) \\times "+d+" \\\\ &= "+u1Expr(d,a0-d)+" \\end{aligned} \\] La réponse est <b>"+corr+"</b>.",
    {a0:a0,d:d});
}, ["Trouve d'abord la taille du pas; elle devient le nombre multiplié par n.", "Commence par écrire premier terme plus (n moins 1) fois le pas, puis simplifie."]);

E("u1-evaluate-expression", 1, ["7.8"], 1, "gen", function(){
  var a=ri(2,8), b=ri(2,12), x=ri(2,9), sub=pick([true,false]);
  if(sub&&a*x<=b){ b=a*x-1; if(b<1)b=1; }
  var val=sub?a*x-b:a*x+b, v=pick(["x","n","t"]);
  var shown="\\("+u1Expr(a,sub?-b:b,v)+"\\)";
  var cand=[sub?a*x+b:a*x-b, a*x, a+x+(sub?-b:b), val+ a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g=1; while(ds.length<3){ var z=val+g*2; if(z!==val&&!seen[z]){seen[z]=1;ds.push(z);} g++; }
  var fbFor=function(z){ if(z===a*x)return "Cela multiplie mais oublie le terme constant."; if(z===(sub?a*x+b:a*x-b))return "Cela utilise la mauvaise opération sur le terme constant."; return "Cela ne suit pas la substitution de "+x+" puis la priorité des opérations."; };
  return mcq("Évalue "+shown+" quand \\("+v+" = "+x+"\\).",
    {t:String(val), fb:"Exact : "+a+" fois "+x+" donne "+(a*x)+", puis "+(sub?"soustrais ":"ajoute ")+b+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "\\[ \\begin{aligned} "+u1Expr(a,sub?-b:b,v)+" &= "+a+" \\times "+x+(sub?" - ":" + ")+b+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {a:a,b:b,x:x,sub:sub});
}, ["Substitue d'abord, puis suis la priorité des opérations.", "Commence par remplacer la variable par la valeur donnée partout où elle apparaît."]);

E("u1-relation-context", 1, ["7.7","7.3","7.4"], 2, "gen", function(){
  var T=pick([
    {txt:"Une salle d'école demande des frais de réservation plus un tarif pour chaque invité", tot:"C", v:"g", unit:"invités", per:"invité", sMin:15,sMax:60,rMin:2,rMax:9},
    {txt:"Un trajet en taxi demande des frais de prise en charge plus un tarif pour chaque kilomètre", tot:"C", v:"k", unit:"kilomètres", per:"kilomètre", sMin:3,sMax:12,rMin:2,rMax:5},
    {txt:"Une imprimerie demande des frais de préparation plus un tarif pour chaque affiche", tot:"C", v:"p", unit:"affiches", per:"affiche", sMin:10,sMax:40,rMin:2,rMax:6},
    {txt:"Une location de vélos demande un dépôt plus un tarif pour chaque heure", tot:"C", v:"h", unit:"heures", per:"heure", sMin:10,sMax:30,rMin:3,rMax:9},
    {txt:"Un jardinier demande des frais de déplacement plus un tarif pour chaque jardinière remplie", tot:"C", v:"p", unit:"jardinières", per:"jardinière", sMin:20,sMax:50,rMin:3,rMax:8},
    {txt:"Un club sportif demande des frais d'adhésion plus un tarif pour chaque séance", tot:"C", v:"s", unit:"séances", per:"séance", sMin:15,sMax:45,rMin:4,rMax:10}]);
  var start=ri(T.sMin,T.sMax), rate=ri(T.rMin,T.rMax);
  if(start===rate)start+=3;
  var corr=T.tot+" = "+u1Expr(rate,start,T.v);
  var cand=[T.tot+" = "+u1Expr(start,rate,T.v), T.tot+" = "+u1Expr(rate,-start,T.v), T.tot+" = "+(rate+start)+T.v];
  return mcq(T.txt+" : les frais sont de "+start+" $ et le tarif est de "+rate+" $ par "+T.per+". Quelle relation donne le coût total \\("+T.tot+"\\) pour \\("+T.v+"\\) "+T.unit+" ?",
    {t:corr, fb:"Exact : le tarif par unité multiplie le nombre, et les frais uniques sont ajoutés."},
    [{t:cand[0], fb:"Cela facture les frais par unité et le tarif une seule fois; les deux nombres ont échangé leurs rôles."},
     {t:cand[1], fb:"Cela soustrait les frais; des frais se paient, donc on les ajoute."},
     {t:cand[2], fb:"Cela facture les frais encore pour chaque unité; les frais se paient une seule fois."}],
    "Le total est les frais uniques plus le tarif par unité fois le nombre : \\("+corr+"\\). La réponse est <b>"+corr+"</b>.",
    {start:start,rate:rate});
}, ["Sépare le montant unique du montant par unité.", "Commence par écrire frais plus (tarif fois nombre)."]);

E("u1-table-missing", 1, ["7.9"], 1, "gen", function(){
  var a=ri(2,6), b=ri(1,9), miss=pick([2,3,4]);
  var ys=[1,2,3,4].map(function(x){return a*x+b;});
  var shown=ys.map(function(y,i){return (i+1)===miss?"?":y;}).join(", ");
  var val=a*miss+b;
  var cand=[a*miss, val+a, (a+1)*miss+b, val+2*a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g2=1; while(ds.length<3){ var z2=val+g2*3; if(!seen[z2]){seen[z2]=1;ds.push(z2);} g2++; }
  var fbFor=function(z){ if(z===a*miss)return "Cela oublie le terme constant de la relation."; if(z===a*(miss+1)+b)return "C'est la valeur pour le x suivant, une rangée trop loin."; return "Cela brise la régularité d'ajouter "+a+" à chaque rangée."; };
  return mcq("Pour la relation \\(y = "+u1Expr(a,b,"x")+"\\), une table de valeurs montre \\(x = 1, 2, 3, 4\\) avec \\(y = "+shown+"\\). Quelle est la valeur manquante ?",
    {t:String(val), fb:"Exact : substitue x = "+miss+" dans la relation."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "Substitue \\(x = "+miss+"\\) : \\[ \\begin{aligned} y &= "+a+" \\times "+miss+" + "+b+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {a:a,b:b,miss:miss});
}, ["Utilise la relation, ou suis la régularité des pas le long de la table.", "Commence par substituer la valeur de x de la rangée manquante dans la relation."]);

E("u1-graph-relation", 1, ["7.10","7.5"], 2, "gen", function(){
  var a=0,b=0,g=0; while(g++<200){ a=ri(1,4); b=ri(1,8); if(a!==b)break; }
  var xmax=pick([3,4,5]);
  var pts=[]; for(var gx=0;gx<=xmax;gx++)pts.push([gx,a*gx+b]);
  var yMax=a*xmax+b+1;
  var corr="y = "+u1Expr(a,b,"x");
  var cand=["y = "+u1Expr(b,a,"x"), "y = "+u1Expr(a,b+1,"x"), "y = "+u1Expr(a+1,b,"x")];
  var q=mcq("Le graphique montre des points discrets tracés à partir d'une table de valeurs pour une relation linéaire. Quelle relation correspond aux points ?",
    {t:corr, fb:"Exact : les points commencent à "+b+" quand x vaut 0 et montent de "+a+" à chaque pas."},
    [{t:cand[0], fb:"Cela commence à "+a+" quand x vaut 0; le graphique commence à "+b+"."},
     {t:cand[1], fb:"Cela commence une unité trop haut; le premier point est à la hauteur "+b+"."},
     {t:cand[2], fb:"Cela monte de "+(a+1)+" à chaque pas; le graphique monte de "+a+"."}],
    "Lis deux caractéristiques du graphique : à \\(x = 0\\), la hauteur est \\("+b+"\\), le terme constant, et chaque pas vers la droite fait monter la hauteur de \\("+a+"\\), le coefficient. La relation est \\("+corr+"\\). La réponse est <b>"+corr+"</b>.",
    {a:a,b:b,xmax:xmax});
  q.figure=u1Plot(pts,xmax,yMax,"x","y");
  return q;
}, ["Lis la hauteur de départ et la taille du pas à partir des points.", "Commence par le point à x = 0; sa hauteur est le terme constant."]);

E("u1-graph-conclusion", 1, ["7.11","7.10"], 3, "gen", function(){
  var a=ri(1,5), b=ri(1,8), tx=pick([5,6,7]);
  var pts=[0,1,2,3,4].map(function(x){return [x,a*x+b];});
  var yMax=a*4+b+1, val=a*tx+b;
  var cand=[a*tx, val+a, a*tx-b, (a+b)*tx, val-a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&z>0&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g3=1; while(ds.length<3){ var z3=val+g3*2; if(!seen[z3]){seen[z3]=1;ds.push(z3);} g3++; }
  var fbFor=function(z){ if(z===a*tx)return "Cela oublie la valeur de départ de "+b+"."; if(z===val+a)return "Cela va un pas trop loin, à x = "+(tx+1)+"."; return "Cela ne continue pas la montée régulière de "+a+" par pas."; };
  var q=mcq("Des points d'une table de valeurs sont tracés dans un graphique. La régularité du graphique continue de la même façon. Que vaut \\(y\\) quand \\(x = "+tx+"\\) ?",
    {t:String(val), fb:"Exact : pars de "+b+" et ajoute "+a+" un total de "+tx+" fois."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "Le graphique commence à \\("+b+"\\) et monte de \\("+a+"\\) pour chaque pas de \\(x\\). \\[ \\begin{aligned} y &= "+b+" + "+tx+" \\times "+a+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {a:a,b:b,tx:tx});
  q.figure=u1Plot(pts,4,yMax,"x","y");
  return q;
}, ["Décris d'abord la régularité du graphique : où il commence et à quelle vitesse il monte.", "Pars de la hauteur pour x = 0, puis compte les pas de la montée jusqu'à x = 6."]);

E("u1-describe-graph", 1, ["7.12"], 2, "var", varset([
  function(){ var q=mcq("Le graphique montre le coût d'achat de livres à une foire scolaire, y compris des frais de sac de 2 $. Quelle phrase décrit la relation en langage de tous les jours ?",
    {t:"Le coût commence à 2 $ et augmente de 4 $ pour chaque livre.", fb:"Exact : le premier point est à 2, et chaque pas vers la droite ajoute 4."},
    [{t:"Le coût commence à 4 $ et augmente de 2 $ pour chaque livre.", fb:"Cela échange les deux nombres : le graphique commence à 2, pas à 4."},
     {t:"Le coût augmente de 4 $ au total, peu importe le nombre de livres achetés.", fb:"Le coût continue d'augmenter avec chaque livre; 4 est l'augmentation par livre, pas l'augmentation totale."},
     {t:"Chaque livre coûte 2 $ et le sac est gratuit pour chaque achat.", fb:"À un livre, le coût est déjà 6, donc un livre coûte plus que 2."}],
    "Les points sont (0, 2), (1, 6), (2, 10), (3, 14) : un départ de 2 $ avec une augmentation régulière de 4 $ par livre. La réponse est <b>le coût commence à 2 $ et augmente de 4 $ pour chaque livre</b>.", {});
    q.figure=u1Plot([[0,2],[1,6],[2,10],[3,14]],3,16,"livres","coût ($)"); return q; },
  function(){ var q=mcq("Le graphique montre la hauteur d'un plant de haricot sur plusieurs semaines. Quelle phrase décrit la relation en langage de tous les jours ?",
    {t:"Le plant mesurait 5 cm au départ et pousse de 3 cm chaque semaine.", fb:"Exact : la hauteur à la semaine 0 est 5, et chaque semaine ajoute 3."},
    [{t:"Le plant mesurait 3 cm au départ et pousse de 5 cm chaque semaine.", fb:"Cela échange le départ et la croissance : à la semaine 0, la hauteur est 5."},
     {t:"Le plant pousse de 3 cm au total sur toute la période.", fb:"Trois centimètres est la croissance de chaque semaine, pas la croissance totale."},
     {t:"Le plant rapetisse au fil des semaines au lieu de grandir.", fb:"Les points montent de gauche à droite, donc la hauteur augmente."}],
    "Les points sont (0, 5), (1, 8), (2, 11), (3, 14) : une hauteur de départ de 5 cm avec 3 cm de croissance chaque semaine. La réponse est <b>le plant mesurait 5 cm au départ et pousse de 3 cm chaque semaine</b>.", {});
    q.figure=u1Plot([[0,5],[1,8],[2,11],[3,14]],3,16,"semaines","hauteur (cm)"); return q; },
  function(){ var q=mcq("Le graphique montre les économies de Mina quand elle ajoute le même montant chaque semaine. Quelle phrase décrit la relation en langage de tous les jours ?",
    {t:"Mina commence avec 20 $ et ajoute 7 $ chaque semaine.", fb:"Exact : le premier point est à 20, et l'augmentation hebdomadaire est 7."},
    [{t:"Mina commence avec 7 $ et ajoute 20 $ chaque semaine.", fb:"Cela échange le départ et le montant hebdomadaire; le premier point est à 20."},
     {t:"Mina ajoute 7 $ au total sur toutes les semaines.", fb:"Sept dollars sont ajoutés chaque semaine, pas une seule fois au total."},
     {t:"Mina dépense 7 $ chaque semaine à partir de ses 20 $ de départ.", fb:"Les points montent, donc les économies augmentent au lieu de diminuer."}],
    "Les points sont (0, 20), (1, 27), (2, 34), (3, 41) : un départ de 20 $ et une augmentation de 7 $ par semaine. La réponse est <b>Mina commence avec 20 $ et ajoute 7 $ chaque semaine</b>.", {});
    q.figure=u1Plot([[0,20],[1,27],[2,34],[3,41]],3,44,"semaines","économies ($)"); return q; },
  function(){ var q=mcq("Le graphique montre la distance parcourue lors d'une balade à vélo régulière. Quelle phrase décrit la relation en langage de tous les jours ?",
    {t:"Le cycliste parcourt 12 km à chaque heure de la balade.", fb:"Exact : chaque pas d'une heure ajoute 12 km."},
    [{t:"Le cycliste parcourt 12 km au total, peu importe la durée de la balade.", fb:"Douze est la distance par heure; le total continue d'augmenter."},
     {t:"Le cycliste commence la balade à 12 km de la maison.", fb:"Le graphique commence à 0 km; 12 est le taux horaire."},
     {t:"Le cycliste ralentit peu à peu au fil de la balade.", fb:"Les points montent par pas égaux, donc la vitesse est régulière."}],
    "Les points sont (0, 0), (1, 12), (2, 24), (3, 36) : des augmentations égales de 12 km par heure. La réponse est <b>le cycliste parcourt 12 km à chaque heure</b>.", {});
    q.figure=u1Plot([[0,0],[1,12],[2,24],[3,36]],3,40,"heures","distance (km)"); return q; },
  function(){ var q=mcq("Le graphique montre le coût de billets de cinéma. Un groupe veut 5 billets. Quelle phrase utilise le graphique pour résoudre leur problème ?",
    {t:"Chaque billet coûte 9 $, donc 5 billets coûtent 45 $.", fb:"Exact : l'augmentation par billet est 9, et 5 fois 9 font 45."},
    [{t:"Chaque billet coûte 45 $, donc 5 billets coûtent 225 $.", fb:"Quarante-cinq est le coût de 5 billets ensemble, pas d'un seul billet."},
     {t:"Cinq billets coûtent 36 $, le point le plus haut montré.", fb:"Trente-six est le coût à 4 billets; la régularité continue un pas de plus."},
     {t:"Les billets sont gratuits après le quatrième.", fb:"Les points continuent de monter du même pas, donc un cinquième billet coûte encore 9."}],
    "Les points sont (0, 0), (1, 9), (2, 18), (3, 27), (4, 36) : 9 $ par billet, donc 5 billets coûtent \\(5 \\times 9 = 45\\) dollars. La réponse est <b>chaque billet coûte 9 $, donc 5 billets coûtent 45 $</b>.", {});
    q.figure=u1Plot([[0,0],[1,9],[2,18],[3,27],[4,36]],4,40,"billets","coût ($)"); return q; }
]), ["Lis le point de départ et la taille de chaque pas, puis dis-les en mots simples.", "Commence par le point où x vaut 0 : c'est le montant de départ."]);

E("u1-environment-pattern", 1, ["7.4"], 3, "gen", function(){
  var T=pick([
    {txt:"Des tables carrées sont mises bout à bout en rangée pour une fête de classe. Une table accueille 6 personnes, deux tables accueillent 10 personnes et trois tables accueillent 14 personnes", a:4,b:2,thing:"tables",ask:"places"},
    {txt:"Une rangée de cadres photo est bordée de carreaux. Un cadre utilise 7 carreaux, deux cadres utilisent 10 carreaux et trois cadres utilisent 13 carreaux", a:3,b:4,thing:"cadres",ask:"carreaux"},
    {txt:"Des parcelles de jardin en rangée sont bordées de pierres. Une parcelle utilise 7 pierres, deux parcelles utilisent 12 pierres et trois parcelles utilisent 17 pierres", a:5,b:2,thing:"parcelles",ask:"pierres"},
    {txt:"Des fanions sont suspendus en sections le long d'un mur de gymnase. Une section a 9 fanions, deux sections ont 15 fanions et trois sections ont 21 fanions", a:6,b:3,thing:"sections",ask:"fanions"},
    {txt:"De longues tables sont mises bout à bout en rangée pour une foire de sciences. Une table accueille 6 personnes, deux tables accueillent 8 personnes et trois tables accueillent 10 personnes", a:2,b:4,thing:"tables",ask:"places"},
    {txt:"Une bordure de banderole est construite avec des bandes de carreaux. Une bande utilise 9 carreaux, deux bandes utilisent 12 carreaux et trois bandes utilisent 15 carreaux", a:3,b:6,thing:"bandes",ask:"carreaux"}]);
  if(pick([true,false])){
    var corr=u1Expr(T.a,T.b);
    var cand=[u1Expr(T.a,T.b+T.a), u1Expr(T.b,T.a), u1Expr(T.a,-T.b)];
    return mcq(T.txt+". Quelle expression donne le nombre de "+T.ask+" pour \\(n\\) "+T.thing+" ?",
      {t:corr, fb:"Exact : le nombre augmente de "+T.a+" à chaque fois, et à n = 1, cela donne "+(T.a+T.b)+"."},
      [{t:cand[0], fb:"Cela donne "+(T.a+T.b+T.a)+" à n = 1, mais le premier cas utilise "+(T.a+T.b)+"."},
       {t:cand[1], fb:"Cela échange la croissance et la partie de départ; vérifie à n = 1."},
       {t:cand[2], fb:"Cela soustrait la partie fixe; la partie fixe est ajoutée dans cette régularité."}],
      "Les nombres augmentent de \\("+T.a+"\\) à chaque pas, et le premier nombre est \\("+(T.a+T.b)+" = "+T.a+" + "+T.b+"\\). Donc le nombre pour \\(n\\) "+T.thing+" est \\("+corr+"\\). La réponse est <b>"+corr+"</b>.",
      {mode:"expr",a:T.a,b:T.b});
  }
  var k=ri(6,14), val=T.a*k+T.b;
  var cand2=[T.a*(k-1)+T.b, T.a*k, T.b*k+T.a, val+T.a];
  var seen={},ds=[]; cand2.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  return mcq(T.txt+". Combien y a-t-il de "+T.ask+" pour "+k+" "+T.thing+" ?",
    {t:String(val), fb:"Exact : la régularité est "+u1Expr(T.a,T.b)+", qui à n = "+k+" donne "+val+"."},
    ds.map(function(z){return {t:String(z), fb:"Cela ne correspond pas à la régularité "+u1Expr(T.a,T.b)+" à n = "+k+"."};}),
    "Les nombres suivent \\("+u1Expr(T.a,T.b)+"\\). \\[ \\begin{aligned} \\text{nombre} &= "+T.a+" \\times "+k+" + "+T.b+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {mode:"value",a:T.a,b:T.b,k:k});
}, ["Transforme les trois premiers cas en relation avant de répondre.", "Commence par trouver de combien le nombre augmente d'un cas au suivant."]);

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
    [0,1,2,3].forEach(function(x){ svg+='<circle cx="'+fmt(ox+x*sx,1)+'" cy="'+fmt(oy-(r.a*x+r.b)*sy,1)+'" r="3.4" fill="'+FIG_ACC+'"/>'; }); /* FMT-GEOM */
  });
  svg+='</svg>';
  var corrIdx=order.indexOf(0);
  var opts=order.map(function(ri2,pi){ if(pi===corrIdx)return null; var r=rels[ri2];
    return {t:"Graphique "+labels[pi], fb:"Le graphique "+labels[pi]+" commence à "+r.b+" et monte de "+r.a+"; la relation commence à "+b+" et monte de "+a+"."}; }).filter(Boolean);
  var q=mcq("Quatre graphiques sont montrés. Quel graphique correspond à la relation \\(y = "+u1Expr(a,b,"x")+"\\) ?",
    {t:"Graphique "+labels[corrIdx], fb:"Exact : il commence à "+b+" quand x vaut 0 et monte de "+a+" à chaque pas."}, opts,
    "La relation commence à \\("+b+"\\) quand \\(x = 0\\) et monte de \\("+a+"\\) par pas. Seul le graphique "+labels[corrIdx]+" fait les deux. La réponse est <b>Graphique "+labels[corrIdx]+"</b>.",
    {a:a,b:b});
  q.figure=svg;
  return q;
}, ["Vérifie d'abord la hauteur de départ, puis la pente.", "Commence par trouver quels graphiques commencent à la bonne hauteur quand x vaut 0."]);

E("u1-pattern-equation", 1, ["7.2"], 3, "gen", function(){
  var d=ri(2,6), c=ri(1,9), k=ri(5,10); if(c===d)c+=2; var V=d*k+c;
  var corr=u1Expr(d,c)+" = "+V;
  var cand=[u1Expr(d,c), u1Expr(c,d)+" = "+V, u1Expr(d,-c)+" = "+V];
  return mcq("Une régularité de carreaux utilise \\(T = "+u1Expr(d,c)+"\\) carreaux pour le numéro de figure \\(n\\). Quelle équation peut être résolue pour trouver quelle figure utilise exactement \\("+V+"\\) carreaux ?",
    {t:corr, fb:"Exact : elle égale la relation de la régularité au nombre cible de carreaux."},
    [{t:cand[0], fb:"Ce n'est qu'une expression; une équation a besoin d'un signe égal et de la valeur cible."},
     {t:cand[1], fb:"Cela échange la taille du pas et la constante de la relation de la régularité."},
     {t:cand[2], fb:"Cela change la constante en soustraction; la régularité ajoute "+c+"."}],
    "Une équation égale la relation au total connu : \\("+corr+"\\), qui peut ensuite être résolue pour \\(n\\) (ici \\(n = "+k+"\\). La réponse est <b>"+corr+"</b>.",
    {d:d,c:c,V:V});
}, ["Une équation a besoin d'un signe égal avec le total connu d'un côté.", "Commence par prendre la relation de la régularité et égale-la à la valeur cible."]);

E("u1-factors-count-cr", 1, ["5.4"], 2, "gen", function(){
  var n=ri(18,96);
  var f=u1Factors(n);
  var pairs=[]; for(var i=0;i<f.length;i++){ if(f[i]<=n/f[i])pairs.push(f[i]+" x "+(n/f[i])); }
  return numq("Combien de facteurs différents \\("+n+"\\) a-t-il ? Énumère les facteurs dans ton travail.", f.length, 0,
    "Parcours les paires de facteurs de \\("+n+"\\) : "+pairs.join(", ")+". Les facteurs sont "+f.join(", ")+", ce qui fait "+f.length+" facteurs au total. La réponse est <b>"+f.length+"</b>.",
    {n:n});
}, ["Utilise les règles de divisibilité pour tester les petits nombres en ordre.", "Commence par 1 et monte, en notant chaque facteur comme une paire."]);

E("u1-evaluate-cr", 1, ["7.8"], 1, "gen", function(){
  var v=pick(["x","n","t"]);
  if(pick([true,false])){
    var a=ri(3,9), b=ri(5,20), x=ri(4,12), val=a*x+b;
    return numq("Évalue \\("+u1Expr(a,b,v)+"\\) quand \\("+v+" = "+x+"\\). Montre ta substitution.", val, 0,
      "\\[ \\begin{aligned} "+u1Expr(a,b,v)+" &= "+a+" \\times "+x+" + "+b+" \\\\ &= "+(a*x)+" + "+b+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
      {mode:"lin",a:a,b:b,x:x});
  }
  var s=ri(3,9), c2=ri(2,15), val2=s*s+c2;
  return numq("Évalue \\("+v+"^2 + "+c2+"\\) quand \\("+v+" = "+s+"\\). Montre ta substitution.", val2, 0,
    "\\[ \\begin{aligned} "+v+"^2 + "+c2+" &= "+s+"^2 + "+c2+" \\\\ &= "+(s*s)+" + "+c2+" \\\\ &= "+val2+" \\end{aligned} \\] La réponse est <b>"+val2+"</b>.",
    {mode:"sq",s:s,c:c2});
}, ["Substitue la valeur d'abord, puis suis la priorité des opérations.", "Commence par réécrire l'expression avec le nombre à la place de la variable."]);

E("u1-table-value-cr", 1, ["7.9","7.7"], 1, "gen", function(){
  var T=pick([
    {txt:"Un centre communautaire loue un gymnase pour des frais fixes plus un tarif horaire. Le coût total est donné par la relation C = ", v:"h", unit:"heures"},
    {txt:"Une école commande des cahiers d'exercices à un prix fixe chacun, plus des frais de livraison. Le coût total est donné par la relation C = ", v:"w", unit:"cahiers d'exercices"},
    {txt:"Une excursion en traversier demande des frais de port plus un tarif par passager. Le coût total est donné par la relation C = ", v:"p", unit:"passagers"}]);
  var rate=ri(3,9), start=ri(8,30), k=ri(8,20), val=rate*k+start;
  return numq(T.txt+"\\("+u1Expr(rate,start,T.v)+"\\) dollars. Construis la valeur de la table : quel est le coût total pour "+k+" "+T.unit+" ? Montre ton travail.", val, 0,
    "\\[ \\begin{aligned} C &= "+rate+" \\times "+k+" + "+start+" \\\\ &= "+(rate*k)+" + "+start+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+" $</b>.",
    {rate:rate,start:start,k:k});
}, ["Substitue le nombre donné dans la relation.", "Commence par remplacer la variable par le nombre d'unités."]);

E("u1-far-term-cr", 1, ["7.1","7.7"], 3, "gen", function(){
  var a0=ri(3,12), d=ri(3,8), pos=ri(15,30), val=a0+(pos-1)*d;
  var terms=[a0,a0+d,a0+2*d];
  return numq("Une régularité de nombres commence par \\("+terms.join(", ")+", \\ldots\\) Quelle est la valeur du terme à la position "+pos+" ? Montre comment tu l'obtiens à partir d'une relation pour la régularité.", val, 0,
    "Le pas est \\("+d+"\\), donc le terme à la position \\(n\\) est \\("+u1Expr(d,a0-d)+"\\) . \\[ \\begin{aligned} \\text{terme}_{"+pos+"} &= "+a0+" + ("+pos+" - 1) \\times "+d+" \\\\ &= "+a0+" + "+((pos-1)*d)+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {a0:a0,d:d,pos:pos});
}, ["Construis une relation pour le terme à la position n au lieu d'énumérer chaque terme.", "Commence par trouver la taille du pas à partir des trois premiers termes."]);

E("u1-solve-812-cr", 1, ["8.12","7.2"], 3, "gen", function(){
  var T=pick([
    {txt:"Une figure de carreaux dans une régularité croissante", thing:"numéro de figure", v:"n", unit:"carreaux"},
    {txt:"Un laissez-passer de manèges de foire scolaire avec un coût d'inscription plus un coût par manège", thing:"nombre de manèges", v:"r", unit:"dollars"},
    {txt:"Un plan d'épargne qui commence par un montant cadeau et ajoute le même montant chaque semaine vers un objectif", thing:"nombre de semaines", v:"w", unit:"dollars"}]);
  var a=ri(2,9), b=ri(2,15), k=ri(4,15), Tot=a*k+b;
  return numq(T.txt+" : le total est modélisé par \\(T = "+u1Expr(a,b,T.v)+"\\) "+T.unit+". Le total est exactement "+Tot+". Modélise cela par une équation et résous-la : quel est le "+T.thing+" ? Montre tes étapes de résolution.", k, 0,
    "Égale la relation au total et résous : \\[ \\begin{aligned} "+u1Expr(a,b,T.v)+" &= "+Tot+" \\\\ "+a+T.v+" &= "+Tot+" - "+b+" \\\\ "+a+T.v+" &= "+(Tot-b)+" \\\\ "+T.v+" &= "+k+" \\end{aligned} \\] La réponse est <b>"+k+"</b>.",
    {a:a,b:b,k:k});
}, ["Égale la relation au total donné pour former l'équation.", "Commence par soustraire la constante des deux côtés, puis divise par le coefficient."]);

/* ----- bank-u2.js ----- */
// Math 7 (French) Unit 2 Integers question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 602 to 907).
// CRMARKS: u2-add-cr=3
// CRMARKS: u2-sub-cr=2
// CRMARKS: u2-numberline-cr=3
// CRMARKS: u2-problem-cr=3
// CRMARKS: u2-missing-addend-cr=3
/* TRANSLATOR NOTES
 * Terms (Grade 7 guide): nombres entiers, droite numérique, carreaux
 * (guide 7N6.1: carreaux algébriques; here the integer tiles of
 * u2-opposites-zero are "carreaux positifs / négatifs").
 * Judgement calls (glossary silent): "sizes" (of integers) = "grandeurs";
 * "zero pair" = "paire nulle"; number-line "jump" = "saut", "ticks" =
 * "graduations"; "landing value" rendered with "arrive à".
 * \text{new balance} became \text{nouveau solde}; \text{final} kept as
 * \text{final} (identical in French).
 * Logic-string matches: the generator checks T.pre.indexOf("diver") and
 * T.pre.indexOf("submarine") test words inside the template strings
 * themselves, so the test words were translated with their templates:
 * indexOf("plongeur") and indexOf("sous-marin"). No other logic changed
 * (Math 9 FR chunkF precedent).
 * Money: literal "$40" etc. became "40 $"; in u2-add-context the account
 * template was rebuilt so each amount precedes its "$" (the "$" moved
 * from pre/mid into mid/post); the payment solution's "$" + ans2 became
 * ans2 + " $".
 * FMT-GEOM lines left (all in helper u2Line, fmt( feeding SVG coordinate
 * or attribute strings; 7 lines): the tick-mark line line, the tick-label
 * text line, the path line, the arrowhead polygon line, the jump-label
 * text line, the start circle line and the end circle line. No other
 * fmt(, fmtF( or .toFixed( occurs in the source, and there are no
 * percent literals or literal decimals in display strings.
 */
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
  for(var v=lo;v<=hi;v++){ s+='<line x1="'+fmt(X(v),1)+'" y1="50" x2="'+fmt(X(v),1)+'" y2="58" stroke="'+FIG_INK+'" stroke-width="1.4"/>'; /* FMT-GEOM */
    s+='<text x="'+fmt(X(v),1)+'" y="70" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+v+'</text>'; } /* FMT-GEOM */
  s+='<path d="M '+fmt(X(a),1)+' 30 L '+fmt(X(end),1)+' 30" stroke="'+FIG_ALT+'" stroke-width="2.2" fill="none"/>'; /* FMT-GEOM */
  var dir=end>=a?1:-1;
  s+='<polygon points="'+fmt(X(end),1)+',30 '+fmt(X(end)-dir*8,1)+',25 '+fmt(X(end)-dir*8,1)+',35" fill="'+FIG_ALT+'"/>'; /* FMT-GEOM */
  s+='<text x="'+fmt((X(a)+X(end))/2,1)+'" y="18" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>'; /* FMT-GEOM */
  s+='<circle cx="'+fmt(X(a),1)+'" cy="54" r="4.5" fill="'+FIG_ACC+'"/>'; /* FMT-GEOM */
  if(showEnd)s+='<circle cx="'+fmt(X(end),1)+'" cy="54" r="4.5" fill="none" stroke="'+FIG_ALT+'" stroke-width="2.2"/>'; /* FMT-GEOM */
  return s+'</svg>';
}
function u2SignRuleSol(a,b,op){
  if(op==="+"){
    if(a===0||b===0) return "Ajouter zéro laisse l'autre nombre entier inchangé.";
    if((a>0)===(b>0)) return "Les signes sont les mêmes, alors additionne les grandeurs et garde le signe : \\(|"+a+"| + |"+b+"| = "+(Math.abs(a)+Math.abs(b))+"\\).";
    return "Les signes diffèrent, alors soustrais la plus petite grandeur de la plus grande et garde le signe de la plus grande : \\(|"+a+"| - |"+b+"| = "+Math.abs(Math.abs(a)-Math.abs(b))+"\\).";
  }
  return "Réécris la soustraction comme l'addition de l'opposé : \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(-b)+"\\).";
}

E("u2-add-basic", 2, ["6.25"], 1, "gen", function(){
  var a=0,b=0,g=0;
  while(g++<200){ a=ri(-9,9); b=ri(-9,9); if(a!==0&&b!==0)break; }
  var ans=a+b;
  var ds=u2Distr(ans,[a-b, -(a+b), Math.abs(a)+Math.abs(b), -Math.abs(a)-Math.abs(b), Math.abs(Math.abs(a)-Math.abs(b))]);
  var fbFor=function(z){ if(z===a-b)return "Cela soustrait le deuxième nombre entier au lieu de l'additionner."; if(z===-(a+b))return "La grandeur est bonne, mais le signe est faux."; if(z===Math.abs(a)+Math.abs(b))return "Cela additionne les grandeurs et laisse tomber les signes, mais ce sont les signes qui décident du signe du résultat."; return "Cela ne suit pas les règles de signes pour l'addition."; };
  return mcq("Que vaut \\("+a+" + "+u2Sg(b)+"\\) ?",
    {t:String(ans), fb:"Exact : "+((a>0)===(b>0)?"signes identiques, additionne les grandeurs et garde le signe.":"signes différents, soustrais les grandeurs et garde le signe de la plus grande.")},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"+")+" Donc \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Regarde d'abord les signes : les signes identiques et les signes différents suivent des règles différentes.", "Commence par comparer les grandeurs des deux nombres entiers."]);

E("u2-add-numberline", 2, ["6.26"], 1, "gen", function(){
  var a=ri(-5,5), b=0,g=0;
  while(g++<100){ b=ri(-5,5); if(b!==0)break; }
  var end=a+b;
  var ds=u2Distr(end,[a-b, end+1, end-1, -end]);
  var q=mcq("La droite numérique montre un saut qui commence à \\("+a+"\\) et qui se déplace de "+Math.abs(b)+" unités vers la "+(b>0?"droite":"gauche")+". À quelle valeur le saut arrive-t-il ?",
    {t:String(end), fb:"Exact : en commençant à "+a+" et en se déplaçant de "+Math.abs(b)+" unités vers la "+(b>0?"droite (ajouter "+b+")":"gauche (ajouter "+b+")")+", on arrive à "+end+"."},
    ds.map(function(z){return {t:String(z), fb:"Compte encore la graduation d'arrivée : le saut commence à "+a+" et couvre "+Math.abs(b)+" unités."};}),
    "Commence à \\("+a+"\\) et compte "+Math.abs(b)+" unités vers la "+(b>0?"droite":"gauche")+" : le saut arrive à \\("+end+"\\), soit \\("+a+" + "+u2Sg(b)+" = "+end+"\\). La réponse est <b>"+end+"</b>.",
    {a:a,b:b});
  q.figure=u2Line(a,end,(b>0?"+":"")+b,true);
  return q;
}, ["La direction du saut te dit le signe de ce qui est ajouté.", "Commence au point marqué et compte les graduations que la flèche couvre."]);

E("u2-sub-basic", 2, ["6.27"], 1, "gen", function(){
  var a=ri(-9,9), b=0,g=0;
  while(g++<100){ b=ri(-9,9); if(b!==0)break; }
  var ans=a-b;
  var ds=u2Distr(ans,[a+b, -(a-b), b-a, ans+2*b]);
  var fbFor=function(z){ if(z===a+b&&b<0)return "Cela laisse tomber le signe moins supplémentaire; soustraire un nombre négatif revient à additionner."; if(z===a+b)return "Cela additionne le deuxième nombre entier au lieu de le soustraire."; if(z===b-a)return "Cela soustrait dans le mauvais ordre."; return "Cela ne correspond pas à réécrire la soustraction comme l'addition de l'opposé."; };
  return mcq("Que vaut \\("+a+" - "+u2Sg(b)+"\\) ?",
    {t:String(ans), fb:"Exact : soustraire revient à additionner l'opposé, donc cela donne "+a+" + "+u2Sg(-b)+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"-")+" Alors \\("+a+" + "+u2Sg(-b)+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Transforme d'abord la soustraction en addition de l'opposé.", "Commence par changer le signe du nombre soustrait."]);

E("u2-opposites-zero", 2, ["6.24"], 1, "var", varset([
  function(){ return mcq("Quelle paire de nombres entiers a une somme de 0 ?",
    {t:"7 et -7", fb:"Exact : les opposés sont à la même distance de 0 dans des directions opposées, donc ils s'annulent."},
    [{t:"7 et 7", fb:"Cette paire donne 14; les deux nombres entiers ont le même signe."},
     {t:"-7 et -7", fb:"Cette paire donne -14; les deux nombres entiers ont le même signe."},
     {t:"7 et -6", fb:"Cette paire donne 1; les grandeurs diffèrent, donc ils ne s'annulent pas complètement."}],
    "Les nombres entiers opposés ont la même grandeur et des signes opposés, donc leur somme est 0 : \\(7 + (-7) = 0\\). La réponse est <b>7 et -7</b>.", {}); },
  function(){ return mcq("Un modèle avec des carreaux montre 5 carreaux positifs et 5 carreaux négatifs. Quelle est la valeur totale du modèle ?",
    {t:"0", fb:"Exact : chaque carreau positif s'associe à un carreau négatif pour former une paire nulle."},
    [{t:"10", fb:"Cela compte les carreaux mais ignore leurs signes; les paires s'annulent."},
     {t:"-10", fb:"Cela traite chaque carreau comme négatif; la moitié d'entre eux sont positifs."},
     {t:"5", fb:"Cela compte un seul ensemble; l'autre ensemble l'annule."}],
    "Associe chaque carreau positif à un carreau négatif : chaque paire vaut \\(1 + (-1) = 0\\), donc cinq paires donnent 0 au total. La réponse est <b>0</b>.", {}); },
  function(){ return mcq("Pourquoi \\((+6)\\) et \\((-6)\\) donnent-ils une somme de zéro ?",
    {t:"Ils sont à la même distance de 0 dans des directions opposées, donc ils s'annulent l'un l'autre.", fb:"Exact : des grandeurs égales avec des signes opposés donnent une somme de zéro."},
    [{t:"Parce qu'ils sont tous les deux près de 0, et que des nombres près de 0 s'annulent par paires comme celle-ci.", fb:"Six n'est pas particulièrement près de 0; ce qui compte, ce sont les grandeurs égales et les signes opposés."},
     {t:"Parce que l'addition de deux nombres entiers donne toujours 0, quels que soient ces nombres.", fb:"La plupart des paires ne donnent pas 0; seuls les opposés le font."},
     {t:"Parce que le nombre négatif est ignoré dans l'addition et ne compte pas dans le total.", fb:"Le nombre négatif compte entièrement; il annule le nombre positif."}],
    "Sur une droite numérique, \\(+6\\) et \\(-6\\) sont à la même distance de 0, de côtés opposés, donc leur somme est 0. La réponse est <b>ils sont opposés et s'annulent</b>.", {}); },
  function(){ return mcq("Que faut-il ajouter à \\(-8\\) pour obtenir 0 ?",
    {t:"8", fb:"Exact : l'opposé de -8 est 8, et les opposés donnent une somme de zéro."},
    [{t:"-8", fb:"Cela donne -16; cela double le négatif au lieu de l'annuler."},
     {t:"0", fb:"Ajouter 0 laisse la valeur à -8."},
     {t:"16", fb:"Cela va trop loin : -8 plus 16 donne 8, et non 0."}],
    "Le nombre qui annule \\(-8\\) est son opposé, \\(8\\) : \\(-8 + 8 = 0\\). La réponse est <b>8</b>.", {}); },
  function(){ return mcq("Un solde de compte est de -40 $. Un dépôt amène le solde exactement à 0 $. Quel est le montant du dépôt ?",
    {t:"40 $", fb:"Exact : un dépôt de 40 annule le solde de -40."},
    [{t:"0 $", fb:"Un dépôt de 0 laisserait le solde à -40 $."},
     {t:"80 $", fb:"Cela amènerait le solde à +40 $, au-delà de zéro."},
     {t:"-40 $", fb:"Un dépôt négatif rendrait le solde encore plus négatif."}],
    "Le dépôt doit être l'opposé du solde : \\(-40 + 40 = 0\\). La réponse est <b>40 $</b>.", {}); }
]), ["Les opposés ont la même grandeur et des signes opposés.", "Commence par associer chaque valeur positive à une valeur négative correspondante."]);

E("u2-add-context", 2, ["6.25","6.29"], 1, "gen", function(){
  var T=pick([
    {pre:"À l'aube, la température est de ", mid:" degrés. À midi, elle ", ch:["augmente de ","baisse de "], post:" degrés. Quelle est la température à midi ?", unit:" degrés"},
    {pre:"Un plongeur est à ", mid:" m par rapport à la surface (sous la surface est négatif). Le plongeur ", ch:["remonte de ","s'enfonce de "], post:" m. Quelle est la nouvelle position du plongeur, en mètres ?", unit:" m"},
    {pre:"Le pointage d'une équipe est de ", mid:" points. Au jeu suivant, l'équipe ", ch:["gagne ","perd "], post:" points. Quel est le pointage de l'équipe maintenant ?", unit:" points"},
    {pre:"Un solde de compte est de ", mid:" $. Un paiement de ", ch:null, post:" $ est effectué (un paiement diminue le solde). Quel est le nouveau solde, en dollars ?", unit:""}]);
  var a=ri(-18,18), mag=ri(3,16);
  if(T.pre.indexOf("plongeur")>=0&&a>0)a=-a;
  if(T.ch){
    var up=pick([true,false]); var b=up?mag:-mag;
    var ans=a+b;
    var ds=u2Distr(ans,[a-b, -ans, a+ (up?-mag:mag)]);
    return mcq(T.pre+"\\("+a+"\\)"+T.mid+(up?T.ch[0]:T.ch[1])+"\\("+mag+"\\)"+T.post,
      {t:String(ans), fb:"Exact : "+(up?"une augmentation ajoute "+mag:"une baisse ajoute -"+mag)+", ce qui donne "+a+" + "+u2Sg(b)+" = "+ans+"."},
      ds.map(function(z){return {t:String(z), fb:"Cela donne le mauvais signe au changement. Une "+(up?"augmentation est positive":"baisse est négative")+"."};}),
      "Écris le changement comme un nombre entier signé : \\("+a+" + "+u2Sg(b)+" = "+ans+"\\). La réponse est <b>"+ans+T.unit+"</b>.",
      {a:a,b:b});
  }
  var ans2=a-mag;
  var ds2=u2Distr(ans2,[a+mag, -ans2, a]);
  return mcq(T.pre+"\\("+a+"\\)"+T.mid+"\\("+mag+"\\)"+T.post,
    {t:String(ans2), fb:"Exact : un paiement soustrait "+mag+" du solde."},
    ds2.map(function(z){return {t:String(z), fb:"Un paiement diminue le solde, donc le "+mag+" est soustrait, et non additionné."};}),
    "\\[ \\begin{aligned} \\text{nouveau solde} &= "+a+" - "+mag+" \\\\ &= "+ans2+" \\end{aligned} \\] La réponse est <b>"+ans2+" $</b>.",
    {a:a,b:-mag});
}, ["Transforme d'abord des mots comme augmente, baisse, gagne et perd en nombres signés.", "Commence par écrire la valeur de départ et le changement signé comme une addition."]);

E("u2-sub-numberline", 2, ["6.28"], 1, "gen", function(){
  var a=ri(-5,6), b=0,g=0;
  while(g++<100){ b=ri(-5,5); if(b!==0)break; }
  var end=a-b, move=-b;
  var ds=u2Distr(end,[a+b, -end, end+ (move>0?1:-1)]);
  var q=mcq("La droite numérique modélise la soustraction \\("+a+" - "+u2Sg(b)+"\\) comme un saut à partir de \\("+a+"\\). Quel est le résultat de la soustraction ?",
    {t:String(end), fb:"Exact : soustraire "+b+" déplace de "+Math.abs(move)+" unités vers la "+(move>0?"droite":"gauche")+", et on arrive à "+end+"."},
    ds.map(function(z){return {t:String(z), fb:"Fais attention à la direction : soustraire "+b+" revient à additionner "+u2Sg(move)+"."};}),
    "Soustraire revient à additionner l'opposé : \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(move)+" = "+end+"\\). Le saut arrive à \\("+end+"\\). La réponse est <b>"+end+"</b>.",
    {a:a,b:b});
  q.figure=u2Line(a,end,(move>0?"+":"")+move,true);
  return q;
}, ["Un saut de soustraction se déplace de l'opposé du nombre soustrait.", "Commence par réécrire la soustraction comme une addition."]);

E("u2-subtract-negative", 2, ["6.27"], 1, "gen", function(){
  var mode=pick(["subneg","subneg","subpos"]);
  var a=ri(-8,8), b, ans;
  if(mode==="subneg"){ b=-ri(2,9); } else { b=ri(2,9); }
  ans=a-b;
  var ds=u2Distr(ans,[a+b, -(ans), b-a, a-Math.abs(b)]);
  var fbFor=function(z){ if(z===a+b&&mode==="subneg")return "Cela traite le deuxième nombre négatif comme une soustraction ordinaire; soustraire un nombre négatif revient à additionner."; if(z===a+b)return "Cela additionne le nombre au lieu de le soustraire."; if(z===b-a)return "Cela soustrait dans le mauvais ordre."; return "Cela garde la soustraction comme une simple descente; réécris-la comme l'addition de l'opposé."; };
  return mcq("Que vaut \\("+a+" - "+u2Sg(b)+"\\) ?",
    {t:String(ans), fb:"Exact : "+(mode==="subneg"?"les deux signes négatifs se combinent et donnent une addition de "+Math.abs(b)+".":"soustraire "+b+" fait descendre de "+b+".")},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    u2SignRuleSol(a,b,"-")+" Alors \\("+a+" + "+u2Sg(-b)+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {a:a,b:b,mode:mode});
}, ["Deux signes négatifs à la suite changent l'opération : soustraire un nombre négatif revient à additionner.", "Commence par réécrire la soustraction comme l'addition de l'opposé."]);

E("u2-mixed-chain", 2, ["6.29","6.25","6.27"], 1, "gen", function(){
  var a=ri(-9,9), b=ri(-9,9), c=ri(-9,9), g=0;
  while(g++<100&&(b===0||c===0)){ b=ri(-9,9); c=ri(-9,9); }
  var subFirst=pick([true,false]);
  var ans=subFirst?(a-b)+c:(a+b)-c;
  var expr=subFirst?(a+" - "+u2Sg(b)+" + "+u2Sg(c)):(a+" + "+u2Sg(b)+" - "+u2Sg(c));
  var wrong1=subFirst?(a+b)+c:(a-b)-c, wrong2=subFirst?(a-b)-c:(a+b)+c;
  var ds=u2Distr(ans,[wrong1,wrong2,-ans]);
  var stepTxt=subFirst?("D'abord \\("+a+" - "+u2Sg(b)+" = "+(a-b)+"\\), puis additionne \\("+u2Sg(c)+"\\)"):("D'abord \\("+a+" + "+u2Sg(b)+" = "+(a+b)+"\\), puis soustrais \\("+u2Sg(c)+"\\)");
  return mcq("Que vaut \\("+expr+"\\) ?",
    {t:String(ans), fb:"Exact : travaille de gauche à droite et le total est "+ans+"."},
    ds.map(function(z){return {t:String(z), fb:"Cela change un des signes en cours de route. Travaille de gauche à droite, une étape à la fois."};}),
    stepTxt+": le résultat est \\("+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {a:a,b:b,c:c});
}, ["Travaille de gauche à droite, une opération à la fois.", "Commence par faire la première opération et note le total courant."]);

E("u2-error-spot", 2, ["6.25","6.27"], 3, "var", varset([
  function(){ return mcq("Un élève calcule \\((-4) + (-5)\\) et écrit 9, en disant que les grandeurs s'additionnent pour donner 9. Quelle est la bonne réponse ?",
    {t:"-9", fb:"Exact : des signes identiques additionnent les grandeurs et gardent le signe négatif."},
    [{t:"9", fb:"C'est la réponse de l'élève : les grandeurs s'additionnent pour donner 9, mais deux nombres négatifs donnent un total négatif."},
     {t:"-1", fb:"Cela soustrait les grandeurs; avec des signes identiques, les grandeurs s'additionnent."},
     {t:"1", fb:"Cela soustrait les grandeurs et laisse aussi tomber le signe."}],
    "Les deux nombres entiers sont négatifs, alors additionne les grandeurs, \\(4 + 5 = 9\\), et garde le signe négatif : \\(-9\\). La réponse est <b>-9</b>.", {}); },
  function(){ return mcq("Un élève calcule \\(3 - (-6)\\) et écrit -3, en disant que 3 moins 6 donne -3. Quelle est la bonne réponse ?",
    {t:"9", fb:"Exact : soustraire -6 revient à additionner 6."},
    [{t:"-3", fb:"C'est la réponse de l'élève : elle traite le problème comme 3 - 6 et oublie le deuxième signe négatif."},
     {t:"-9", fb:"Cela additionne les grandeurs mais garde un signe négatif; la valeur monte au-dessus de 3."},
     {t:"3", fb:"Cela ignore complètement le -6; il change quand même la valeur."}],
    "Réécris comme l'addition de l'opposé : \\(3 - (-6) = 3 + 6 = 9\\). La réponse est <b>9</b>.", {}); },
  function(){ return mcq("Un élève calcule \\((-7) + 4\\) et écrit -11, en disant que les grandeurs s'additionnent toujours. Quelle est la bonne réponse ?",
    {t:"-3", fb:"Exact : avec des signes différents, on soustrait les grandeurs, 7 - 4 = 3, et on garde le signe du plus grand, qui est négatif."},
    [{t:"-11", fb:"C'est la réponse de l'élève : les grandeurs ne s'additionnent que lorsque les signes sont les mêmes."},
     {t:"3", fb:"La grandeur est bonne, mais le signe est faux; le plus grand nombre entier est -7."},
     {t:"11", fb:"Cela additionne les grandeurs et laisse tomber les deux signes."}],
    "Les signes diffèrent, alors soustrais les grandeurs : \\(7 - 4 = 3\\), et le plus grand nombre entier est négatif, ce qui donne \\(-3\\). La réponse est <b>-3</b>.", {}); },
  function(){ return mcq("Un élève calcule \\((-2) - (-8)\\) et écrit -10, en disant que les grandeurs s'additionnent et restent négatives. Quelle est la bonne réponse ?",
    {t:"6", fb:"Exact : soustraire -8 additionne 8, et -2 + 8 = 6."},
    [{t:"-10", fb:"C'est la réponse de l'élève : elle additionne les grandeurs comme si les deux étapes descendaient."},
     {t:"-6", fb:"Cela garde un signe négatif; après avoir ajouté 8, la valeur passe 0."},
     {t:"10", fb:"Cela additionne les deux grandeurs comme des positifs et ignore le -2 de départ."}],
    "Réécris : \\((-2) - (-8) = -2 + 8 = 6\\). La réponse est <b>6</b>.", {}); },
  function(){ return mcq("Un élève calcule \\(5 + (-9)\\) et écrit 4, en disant que la réponse prend le signe du premier nombre. Quelle est la bonne réponse ?",
    {t:"-4", fb:"Exact : les grandeurs se soustraient pour donner 4, et le signe vient du plus grand nombre entier, -9."},
    [{t:"4", fb:"C'est la réponse de l'élève : le signe suit le nombre entier qui a la plus grande grandeur, soit -9."},
     {t:"-14", fb:"Cela additionne les grandeurs; avec des signes différents, les grandeurs se soustraient."},
     {t:"14", fb:"Cela additionne les grandeurs et laisse tomber les signes."}],
    "Signes différents : soustrais les grandeurs, \\(9 - 5 = 4\\), et garde le signe de la plus grande grandeur, négatif : \\(-4\\). La réponse est <b>-4</b>.", {}); }
]), ["Nomme d'abord l'erreur de l'élève, puis refais le calcul avec les règles de signes.", "Commence par décider si les signes sont identiques ou différents."]);

E("u2-problem-two-step", 2, ["6.29"], 1, "gen", function(){
  var T=pick([
    {pre:"Un sous-marin est à ", unit:" m par rapport à la surface (sous la surface est négatif). Il ", v:["monte de ","plonge de "], mid:" m, puis il ", post:" m. Quelle est sa position finale, en mètres ?"},
    {pre:"La température à l'heure du souper est de ", unit:" degrés. Pendant la nuit, elle ", v:["augmente de ","baisse de "], mid:" degrés, puis le matin elle ", post:" degrés. Quelle est la température le matin, en degrés ?"},
    {pre:"La position d'un randonneur est de ", unit:" m par rapport au point de départ du sentier (sous ce point est négatif). Elle ", v:["monte de ","descend de "], mid:" m, puis elle ", post:" m. Quelle est la position finale, en mètres ?"}]);
  var s=ri(-20,20), up1=pick([true,false]), up2=pick([true,false]);
  if(T.pre.indexOf("sous-marin")>=0&&s>0)s=-s;
  var m1=ri(3,14), m2=ri(3,14);
  var ch1=up1?m1:-m1, ch2=up2?m2:-m2;
  var ans=s+ch1+ch2;
  var ds=u2Distr(ans,[s+ch1, s-ch1+ch2, s+ch1-ch2, -ans]);
  var verb=function(up,arr){ return up?arr[0]:arr[1]; };
  return mcq(T.pre+"\\("+s+"\\)"+T.unit+verb(up1,T.v)+"\\("+m1+"\\)"+T.mid+verb(up2,T.v)+"\\("+m2+"\\)"+T.post,
    {t:String(ans), fb:"Exact : les deux changements signés sont "+u2Sg(ch1)+" et "+u2Sg(ch2)+"."},
    ds.map(function(z){return {t:String(z), fb:"Cela traite mal un des deux changements. Donne un signe à chaque changement et additionne les deux au départ."};}),
    "\\[ \\begin{aligned} \\text{final} &= "+s+" + "+u2Sg(ch1)+" + "+u2Sg(ch2)+" \\\\ &= "+(s+ch1)+" + "+u2Sg(ch2)+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {s:s,ch1:ch1,ch2:ch2});
}, ["Donne un signe à chaque changement, puis additionne-les à la valeur de départ, dans l'ordre.", "Commence par écrire le premier changement comme un nombre signé."]);

E("u2-add-cr", 2, ["6.25"], 1, "gen", function(){
  var a=0,b=0,g=0;
  while(g++<200){ a=ri(-28,28); b=ri(-28,28); if(a!==0&&b!==0&&(a>0)!==(b>0))break; }
  var ans=a+b;
  return numq("Calcule \\("+a+" + "+u2Sg(b)+"\\) et montre la règle de signe que tu as utilisée.", ans, 0,
    "Les signes diffèrent, alors soustrais la plus petite grandeur de la plus grande et garde le signe de la plus grande : \\(|"+a+"| - |"+b+"| = "+Math.abs(Math.abs(a)-Math.abs(b))+"\\), avec le signe de \\("+(Math.abs(a)>Math.abs(b)?a:b)+"\\). \\[ \\begin{aligned} "+a+" + "+u2Sg(b)+" &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Décide du signe de la réponse avant d'en calculer la grandeur.", "Commence par comparer les grandeurs des deux nombres entiers."]);

E("u2-sub-cr", 2, ["6.27"], 1, "gen", function(){
  var a=ri(-24,24), b=0,g=0;
  while(g++<100){ b=ri(-24,24); if(b!==0)break; }
  var ans=a-b;
  return numq("Calcule \\("+a+" - "+u2Sg(b)+"\\) et montre l'étape de réécriture que tu as utilisée.", ans, 0,
    "\\[ \\begin{aligned} "+a+" - "+u2Sg(b)+" &= "+a+" + "+u2Sg(-b)+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Réécris la soustraction comme l'addition de l'opposé, puis utilise les règles de l'addition.", "Commence par changer le signe du nombre soustrait."]);

E("u2-numberline-cr", 2, ["6.26","6.28"], 1, "gen", function(){
  var a=ri(-6,6), isSub=pick([true,false]), b=0,g=0;
  while(g++<100){ b=ri(-6,6); if(b!==0)break; }
  var end=isSub?a-b:a+b, move=isSub?-b:b;
  var q=numq("La droite numérique montre un saut qui commence à \\("+a+"\\). Le saut modélise "+(isSub?("la soustraction \\("+a+" - "+u2Sg(b)+"\\)"):("l'addition \\("+a+" + "+u2Sg(b)+"\\)"))+". À quelle valeur le saut arrive-t-il ? Compte les graduations dans ton travail.", end, 0,
    (isSub?("Soustraire revient à additionner l'opposé : \\("+a+" - "+u2Sg(b)+" = "+a+" + "+u2Sg(move)+"\\). "):"")+"En commençant à \\("+a+"\\) et en se déplaçant de "+Math.abs(move)+" unités vers la "+(move>0?"droite":"gauche")+", on arrive à \\("+end+"\\). La réponse est <b>"+end+"</b>.",
    {a:a,b:b,isSub:isSub});
  q.figure=u2Line(a,end,(move>0?"+":"")+move,false);
  return q;
}, ["La direction et la longueur de la flèche donnent le déplacement signé.", "Commence au point marqué et compte les graduations dans la direction de la flèche."]);

E("u2-problem-cr", 2, ["6.29"], 3, "gen", function(){
  var T=pick([
    {pre:"Une station météo enregistre une température de ", u:" degrés à 18 h. Pendant la nuit, la température baisse de ", mid:" degrés, puis elle augmente de ", post:" degrés avant le matin, puis elle baisse de ", post2:" degrés de plus avant midi. Quelle est la température à midi, en degrés ?"},
    {pre:"Un submersible est à ", u:" m par rapport à la surface (sous la surface est négatif). Il plonge de ", mid:" m, puis monte de ", post:" m, puis plonge de ", post2:" m de plus. Quelle est sa position finale, en mètres ?"},
    {pre:"Un personnage de jeu a un pointage de ", u:" points. Le personnage perd ", mid:" points, puis gagne ", post:" points, puis perd ", post2:" points. Quel est le pointage final ?"}]);
  var s=ri(-15,25), f1=ri(3,12), r=ri(3,12), f2=ri(2,10);
  var ans=s-f1+r-f2;
  return numq(T.pre+"\\("+s+"\\)"+T.u+"\\("+f1+"\\)"+T.mid+"\\("+r+"\\)"+T.post+"\\("+f2+"\\)"+T.post2, ans, 0,
    "\\[ \\begin{aligned} \\text{final} &= "+s+" - "+f1+" + "+r+" - "+f2+" \\\\ &= "+(s-f1)+" + "+r+" - "+f2+" \\\\ &= "+(s-f1+r)+" - "+f2+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {s:s,f1:f1,r:r,f2:f2});
}, ["Donne un signe à chaque changement et garde un total courant.", "Commence par écrire le premier changement comme un nombre signé ajouté au départ."]);

E("u2-missing-addend-cr", 2, ["6.25","6.24"], 3, "gen", function(){
  var a=0,b=ri(-15,15),g=0;
  while(g++<100){ a=ri(-15,15); if(a!==0)break; }
  var ans=b-a;
  return numq("Trouve le nombre entier manquant : \\(\\square + "+u2Sg(a)+" = "+b+"\\). Montre comment l'opposé de "+u2Sg(a)+" t'aide.", ans, 0,
    "Additionne l'opposé de \\("+a+"\\) des deux côtés, pour que la case reste seule : \\[ \\begin{aligned} \\square &= "+b+" - "+u2Sg(a)+" \\\\ &= "+b+" + "+u2Sg(-a)+" \\\\ &= "+ans+" \\end{aligned} \\] Vérification : \\("+ans+" + "+u2Sg(a)+" = "+b+"\\). La réponse est <b>"+ans+"</b>.",
    {a:a,b:b});
}, ["Annule l'addition en ajoutant l'opposé des deux côtés.", "Commence par te demander ce qui annule le terme connu."]);

/* ----- bank-u3.js ----- */
// Math 7 (French) Unit 3 Fractions, Decimals and Percents question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 908 to 1728).
// CRMARKS: u3-cr-add-sub=3
// CRMARKS: u3-cr-mult=3
// CRMARKS: u3-cr-div=2
// CRMARKS: u3-cr-repeating-frac=2
// CRMARKS: u3-cr-percent=3
// CRMARKS: u3-cr-order-ops=3
/* TRANSLATOR NOTES
   Chunk: Math 7, Unit 3 (Les fractions, les nombres décimaux et les
   pourcentages), entries u3-* (29 entries). Translated per RULES.md
   and GLOSSARY.md; Grade 7 guide terms win.

   Judgement calls:
   - Guide terms used as given: nombres décimaux finis et périodiques
     (terminating / repeating decimals), valeur de position, points de
     repère, priorité des opérations, stratégie des premiers chiffres
     (front-end estimation). "Decimal point" is "virgule décimale".
   - "In lowest terms" rendered "sous forme de fraction irréductible"
     (fraction irréductible), as in the Math 8 FR pipeline.
   - HST rendered "TVH" (taxe de vente harmonisée), as in Math 8 FR.
   - Repeating-decimal builders (u3decStr, u3repStr, the place()
     helpers in the two front-end entries, and the built "0." strings
     in u3-repeating-predict and u3-cr-repeating-frac) now build comma
     decimals ("0,..."), because their output is display text.
   - Money: "$" + amount rewritten as amount + " $" throughout. Where
     the English built money options with fmt( (u3-mult-decimals,
     u3-div-decimals), the money options now use fmtDF(...,2) + " $"
     per RULES.md; the non-money options in the same entries keep
     fmtD(...,3). In u3-add-sub-decimals the context strings carry
     "%A $" so the existing indexOf("$") money test still works, and
     the option builder appends " $" instead of prepending "$".
   - Internal dedup keys built with fmt( / fmtF( were converted to
     fmtD( / fmtDF( consistently on both sides of each comparison;
     they are never displayed.
   - The SVG aria-labels are translated as student-facing text. The
     visible fraction label "1/2" on the number lines is unchanged.
   - "Change" (money returned) in u3-cr-add-sub rendered "monnaie";
     its solution label \text{change} became \text{monnaie}, and
     \text{tax} in u3-tax-total became \text{taxe}, \text{sale price}
     became \text{prix de solde}, \text{final cost} became
     \text{coût final}. \text{total} is the same word in French.
   - Personal names kept unchanged (Maya, Jonah, Kofi, Aisha, Ravi,
     Sam).

   FMT-GEOM lines left as fmt( (3 lines, each marked on its line):
   - u3-numberline-place: the <circle cx="..."> line (fmt(cx,1)).
   - u3-numberline-mixed: the tick-lines line (fmt(25+93.3*k,1) twice)
     and the <circle cx="..."> line (fmt(cx,1)).
   Every other display fmt( became fmtD( and fmtF( became fmtDF(.

   Unsure about: nothing blocking. The plain-text multiplication sign
   " x " and division sign " / " in prompts were kept as in the
   English, as symbols rather than language.
*/
/* ===== Unit 3 ===== */
/* Math 7 Unit 3: Fractions, Decimals and Percents. Helpers prefixed u3. */
function u3gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u3simp(n,d){var g=u3gcd(n,d);return [n/g,d/g];}
function u3fr(n,d){var s=u3simp(n,d);return "\\("+FR(s[0],s[1])+"\\)";}
function u3isRep(n,d){var s=u3simp(n,d),x=s[1];while(x%2===0)x/=2;while(x%5===0)x/=5;return x>1;}
function u3decStr(v){return "0,"+v+"...";}
function u3repStr(n,d){
  if(d===9)return "0,"+n+""+n+""+n+"...";
  if(d===3){var g=n*3;return "0,"+g+""+g+""+g+"...";}
  if(d===6)return n===1?"0,1666...":"0,8333...";
  var p=9*n;var ps=(p<10?"0":"")+p;return "0,"+ps+ps+"...";
}

E("u3-order-mixed", 3, ["3.3","3.2","3.4"], 2, "gen", function(){
  var vals=[],guard=0;
  while(vals.length<4&&guard++<200){var v=ri(12,96);if(vals.indexOf(v)<0)vals.push(v);}
  if(vals.length<4)vals=[24,45,63,88];
  var forms=["dec","fra","pct","raw"];
  var rend=function(v,f){
    if(f==="dec")return fmtD(v/100);
    if(f==="fra")return u3simp(v,100)[0]+"/"+u3simp(v,100)[1];
    if(f==="pct")return v+" %";
    return v+"/100";
  };
  var items=vals.map(function(v,i){return {v:v,s:rend(v,forms[i])};});
  var asc=items.slice().sort(function(a,b){return a.v-b.v;});
  var join=function(arr){return arr.map(function(x){return x.s;}).join(", ");};
  var correct=join(asc);
  var desc=asc.slice().reverse();
  var sw1=[asc[1],asc[0],asc[2],asc[3]];
  var sw2=[asc[0],asc[1],asc[3],asc[2]];
  var sol="Écris chaque nombre sous forme décimale : "+asc.map(function(x){return x.s+" = "+fmtD(x.v/100);}).join(", ")+". En ordre croissant : <b>"+correct+"</b>.";
  return mcq("Écris les nombres en ordre croissant (du plus petit au plus grand) : "+join(items)+".",
    {t:correct, fb:"Exact : en convertissant chacun en nombre décimal, on obtient l'ordre indiqué."},
    [{t:join(desc), fb:"C'est l'ordre décroissant (du plus grand au plus petit); la question demande l'ordre croissant."},
     {t:join(sw1), fb:"Les deux premiers nombres sont inversés : compare leurs valeurs décimales."},
     {t:join(sw2), fb:"Les deux derniers nombres sont inversés : compare leurs valeurs décimales."}],
    sol, {vals:vals});
}, ["Convertis chaque nombre sous la même forme, par exemple en nombres décimaux, avant de comparer.", "Commence par écrire chaque fraction et chaque pourcentage sous forme décimale."]);

E("u3-numberline-place", 3, ["3.1","3.4"], 1, "gen", function(){
  var dens=[3,4,5,6,7,8,9,10,11,12];
  var d=pick(dens), n=ri(1,d-1), p=n/d;
  var cx=30+270*p;
  var fig='<svg viewBox="0 0 330 78" width="330" height="78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Droite numérique de 0 à 1 avec un point marqué">'
    +'<line x1="30" y1="42" x2="300" y2="42" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="30" y1="36" x2="30" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="165" y1="36" x2="165" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="300" y1="36" x2="300" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<circle cx="'+fmt(cx,1)+'" cy="42" r="5" fill="'+FIG_ACC+'"/>' /* FMT-GEOM */
    +_txt(30,64,"0",12,false)+_txt(165,64,"1/2",12,false)+_txt(300,64,"1",12,false)
    +_txt(cx,18,"?",13,true)+'</svg>';
  var cand=[[n+1,d],[n-1,d],[d-n,d],[n,d+1],[n+1,d+2],[1,d],[n+2,d]];
  var seenV={}; seenV[fmtD(p,6)]=1; var ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){
    var cn=cand[i][0],cd=cand[i][1];
    if(cn<=0||cd<=0)continue;
    var cv=cn/cd, key=fmtD(cv,6);
    if(seenV[key])continue; seenV[key]=1;
    ds.push({t:"\\("+FR(cn,cd)+"\\)", fb:"Cette fraction marque un autre point : compare sa taille avec les points de repère 0, 1/2 et 1."});
  }
  var q=mcq("Le point sur la droite numérique marque un nombre. Quelle fraction se trouve au point ?",
    {t:"\\("+FR(n,d)+"\\)", fb:"Oui : en comptant "+n+" parties égales sur "+d+" à partir de 0, on arrive au point."},
    ds,
    "La droite de 0 à 1 est divisée en "+d+" parties égales. En comptant "+n+" parties à partir de 0, on arrive au point, donc le point marque "+u3fr(n,d)+". La réponse est <b>"+u3fr(n,d)+"</b>.",
    {n:n,d:d});
  q.figure=fig;
  return q;
}, ["Utilise les points de repère 0, 1/2 et 1 pour préciser où se trouve le point.", "Commence par décider dans quelle moitié de la droite le point se trouve, puis compte les parties égales."]);

E("u3-numberline-mixed", 3, ["3.2","3.1"], 2, "gen", function(){
  var dens=[2,3,4,5,6,8,10,12];
  var d=pick(dens), w=ri(1,2), n=ri(1,d-1), val=w+n/d;
  var cx=25+93.3*val;
  var fig='<svg viewBox="0 0 330 78" width="330" height="78" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Droite numérique de 0 à 3 avec un point marqué">'
    +'<line x1="25" y1="42" x2="305" y2="42" stroke="'+FIG_INK+'" stroke-width="2"/>';
  [0,1,2,3].forEach(function(k){fig+='<line x1="'+fmt(25+93.3*k,1)+'" y1="36" x2="'+fmt(25+93.3*k,1)+'" y2="48" stroke="'+FIG_INK+'" stroke-width="2"/>'+_txt(25+93.3*k,64,String(k),12,false);}); /* FMT-GEOM */
  fig+='<circle cx="'+fmt(cx,1)+'" cy="42" r="5" fill="'+FIG_ACC+'"/>'+_txt(cx,18,"?",13,true)+'</svg>'; /* FMT-GEOM */
  function mt(ww,nn,dd){return "\\("+ww+FR(nn,dd)+"\\)";}
  var cand=[{t:mt(w,n+1,d),v:w+(n+1)/d},{t:mt(w+1,n,d),v:w+1+n/d},{t:mt(w,d-n,d),v:w+(d-n)/d},{t:"\\("+(w+1)+"\\)",v:w+1},{t:mt(w,n,d+2),v:w+n/(d+2)}];
  var seenV={}; seenV[fmtD(val,6)]=1; var ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){
    var key=fmtD(cand[i].v,6);
    if(seenV[key])continue; seenV[key]=1;
    ds.push({t:cand[i].t, fb:"Ce nombre marque un autre point : vérifie d'abord la partie entière, puis la partie fractionnaire."});
  }
  var q=mcq("Le point sur la droite numérique marque un nombre. Quel nombre se trouve au point ?",
    {t:mt(w,n,d), fb:"Oui : le point est situé après "+w+", en comptant "+n+" parties égales sur les "+d+" d'une unité."},
    ds,
    "Le point se trouve entre "+w+" et "+(w+1)+". En comptant "+n+" parties égales sur les "+d+" de cette unité à partir de "+w+", on arrive au point, donc il marque \\("+w+FR(n,d)+"\\). La réponse est <b>\\("+w+FR(n,d)+"\\)</b>.",
    {w:w,n:n,d:d});
  q.figure=fig;
  return q;
}, ["Trouve d'abord entre quels deux nombres entiers le point se trouve.", "Commence par la partie entière, puis compte les parties égales dans cette unité."]);

E("u3-between", 3, ["3.5","3.3"], 1, "gen", function(){
  if(ri(0,1)===0){
    var t=ri(1,8), a=t/10+ri(0,3)/100, step=ri(3,6)/100, b=a+step;
    var c=a+ri(1,Math.round(step*100)-1)/100;
    var sol="Tout nombre plus grand que "+fmtDF(a,2)+" et plus petit que "+fmtDF(b,2)+" convient. "+fmtDF(c,2)+" se trouve entre les deux. La réponse est <b>"+fmtDF(c,2)+"</b>.";
    return mcq("Quel nombre se trouve entre "+fmtDF(a,2)+" et "+fmtDF(b,2)+" ?",
      {t:fmtDF(c,2), fb:"Oui : "+fmtDF(c,2)+" est plus grand que "+fmtDF(a,2)+" et plus petit que "+fmtDF(b,2)+"."},
      [{t:fmtDF(a-0.02,2), fb:"Ce nombre est plus petit que "+fmtDF(a,2)+", donc il est à l'extérieur de la paire."},
       {t:fmtDF(b+0.02,2), fb:"Ce nombre est plus grand que "+fmtDF(b,2)+", donc il est à l'extérieur de la paire."},
       {t:fmtDF(b+0.07,2), fb:"Ce nombre est plus grand que "+fmtDF(b,2)+", donc il est à l'extérieur de la paire."}],
      sol, {mode:"dec", a:a, b:b});
  }
  var dens=[4,5,6,8,10], d=pick(dens), n=ri(1,d-2);
  var lo=[n,d], hi=[n+1,d], mid=u3simp(2*n+1,2*d);
  var below=u3simp(2*n-1,2*d), above=u3simp(2*n+3,2*d);
  var sol2="Utilise un dénominateur commun de "+(2*d)+" : les nombres sont "+u3fr(2*n,2*d)+" et "+u3fr(2*n+2,2*d)+", donc "+u3fr(mid[0],mid[1])+" se trouve entre les deux. La réponse est <b>"+u3fr(mid[0],mid[1])+"</b>.";
  return mcq("Quelle fraction se trouve entre \\("+FR(lo[0],lo[1])+"\\) et \\("+FR(hi[0],hi[1])+"\\) ?",
    {t:u3fr(mid[0],mid[1]), fb:"Oui : avec le dénominateur "+(2*d)+", elle se trouve entre les deux fractions données."},
    [{t:u3fr(below[0],below[1]), fb:"Cette fraction est plus petite que la première fraction donnée."},
     {t:u3fr(above[0],above[1]), fb:"Cette fraction est plus grande que la deuxième fraction donnée."},
     {t:u3fr(lo[0],lo[1]), fb:"C'est l'extrémité elle-même, pas un nombre entre les deux."}],
    sol2, {mode:"frac", n:n, d:d});
}, ["Un nombre entre deux nombres est plus grand que le plus petit et plus petit que le plus grand.", "Commence par comparer chaque choix avec les deux nombres donnés."]);

E("u3-misplaced", 3, ["3.6","3.3"], 2, "var", varset([
  function(){ return mcq("Les nombres 0,3, \\("+FR(2,5)+"\\), 0,35, \\("+FR(3,4)+"\\) devaient être en ordre croissant. Quel nombre est mal placé ?",
    {t:"0,35", fb:"Oui : 0,35 est plus petit que 2/5 = 0,4, donc il devrait venir avant 2/5."},
    [{t:"0,30", fb:"0,3 est la plus petite valeur, donc il vient en premier."},
     {t:"\\("+FR(2,5)+"\\)", fb:"2/5 = 0,4 vient après 0,35 et avant 0,75; ce n'est pas le nombre mal placé."},
     {t:"\\("+FR(3,4)+"\\)", fb:"3/4 = 0,75 est la plus grande valeur, donc il vient en dernier."}],
    "Sous forme décimale, les valeurs sont 0,3, 0,4, 0,35, 0,75. La valeur 0,35 descend sous celle qui la précède, donc <b>0,35</b> est le nombre mal placé.", {s:1}); },
  function(){ return mcq("Les nombres \\("+FR(1,4)+"\\), 0,3, \\("+FR(3,5)+"\\), 0,55 devaient être en ordre croissant. Quel nombre est mal placé ?",
    {t:"0,55", fb:"Oui : 0,55 est plus petit que 3/5 = 0,6, donc il devrait venir avant 3/5."},
    [{t:"\\("+FR(1,4)+"\\)", fb:"1/4 = 0,25 est la plus petite valeur, donc il vient en premier."},
     {t:"0,30", fb:"0,3 se trouve entre 0,25 et 0,6, donc sa place est bonne."},
     {t:"\\("+FR(3,5)+"\\)", fb:"3/5 = 0,6 vient avant 0,55 dans une liste correcte; l'erreur est 0,55 placé après."}],
    "Sous forme décimale, les valeurs sont 0,25, 0,3, 0,6, 0,55. La valeur 0,55 descend sous celle qui la précède, donc <b>0,55</b> est le nombre mal placé.", {s:2}); },
  function(){ return mcq("Les nombres 0,15, \\("+FR(1,5)+"\\), 0,28, \\("+FR(1,4)+"\\) devaient être en ordre croissant. Quel nombre est mal placé ?",
    {t:"\\("+FR(1,4)+"\\)", fb:"Oui : 1/4 = 0,25 est plus petit que 0,28, donc il devrait venir avant 0,28."},
    [{t:"0,15", fb:"0,15 est la plus petite valeur, donc il vient en premier."},
     {t:"\\("+FR(1,5)+"\\)", fb:"1/5 = 0,2 se trouve entre 0,15 et 0,28, donc sa place est bonne."},
     {t:"0,28", fb:"0,28 vient avant 1/4 dans une liste correcte; l'erreur est 1/4 placé après."}],
    "Sous forme décimale, les valeurs sont 0,15, 0,2, 0,28, 0,25. La valeur 0,25 descend sous celle qui la précède, donc <b>1/4</b> est le nombre mal placé.", {s:3}); },
  function(){ return mcq("Les nombres \\("+FR(3,8)+"\\), 0,42, \\("+FR(1,2)+"\\), 0,48 devaient être en ordre croissant. Quel nombre est mal placé ?",
    {t:"0,48", fb:"Oui : 0,48 est plus petit que 1/2 = 0,5, donc il devrait venir avant 1/2."},
    [{t:"\\("+FR(3,8)+"\\)", fb:"3/8 = 0,375 est la plus petite valeur, donc il vient en premier."},
     {t:"0,42", fb:"0,42 se trouve entre 0,375 et 0,5, donc sa place est bonne."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0,5 vient avant 0,48 dans une liste correcte; l'erreur est 0,48 placé après."}],
    "Sous forme décimale, les valeurs sont 0,375, 0,42, 0,5, 0,48. La valeur 0,48 descend sous celle qui la précède, donc <b>0,48</b> est le nombre mal placé.", {s:4}); },
  function(){ return mcq("Les nombres 0,62, \\("+FR(7,10)+"\\), 0,68, \\("+FR(4,5)+"\\) devaient être en ordre croissant. Quel nombre est mal placé ?",
    {t:"0,68", fb:"Oui : 0,68 est plus petit que 7/10 = 0,7, donc il devrait venir avant 7/10."},
    [{t:"0,62", fb:"0,62 est la plus petite valeur, donc il vient en premier."},
     {t:"\\("+FR(7,10)+"\\)", fb:"7/10 = 0,7 vient avant 0,68 dans une liste correcte; l'erreur est 0,68 placé après."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0,8 est la plus grande valeur, donc il vient en dernier."}],
    "Sous forme décimale, les valeurs sont 0,62, 0,7, 0,68, 0,8. La valeur 0,68 descend sous celle qui la précède, donc <b>0,68</b> est le nombre mal placé.", {s:5}); },
  function(){ return mcq("Les nombres 0,9, \\("+FR(4,5)+"\\), 0,85, \\("+FR(1,2)+"\\) devaient être en ordre décroissant. Quel nombre est mal placé ?",
    {t:"0,85", fb:"Oui : en ordre décroissant, 0,85 devrait venir avant 4/5 = 0,8, pas après."},
    [{t:"0,90", fb:"0,9 est la plus grande valeur, donc il vient en premier en ordre décroissant."},
     {t:"\\("+FR(4,5)+"\\)", fb:"4/5 = 0,8 vient après 0,85 dans une liste correcte; l'erreur est 0,85 placé après."},
     {t:"\\("+FR(1,2)+"\\)", fb:"1/2 = 0,5 est la plus petite valeur, donc il vient en dernier."}],
    "Sous forme décimale, les valeurs sont 0,9, 0,8, 0,85, 0,5. En ordre décroissant, chaque valeur devrait descendre, mais 0,85 remonte au-dessus de 0,8, donc <b>0,85</b> est le nombre mal placé.", {s:6}); }
]), ["Convertis chaque nombre en nombre décimal et cherche l'endroit où l'ordre se brise.", "Commence par écrire la valeur décimale de chaque fraction de la liste."]);

E("u3-percent-convert", 3, ["3.7"], 1, "gen", function(){
  var p=ri(2,98);
  if(ri(0,1)===0){
    var s=u3simp(p,100);
    var pool=[[p,100],[100-p,100],[p,10],[p+100,100],[100,p]];
    var seen={}; seen[fmtD(p/100,6)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var cv=pool[i][0]/pool[i][1], key=fmtD(cv,6);
      if(seen[key])continue; seen[key]=1;
      var ss=u3simp(pool[i][0],pool[i][1]);
      ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"Cette fraction a une autre valeur : un pourcentage est une partie sur 100, puis réduis."});
    }
    return mcq("Écris "+p+" % sous forme de fraction irréductible.",
      {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Oui : "+p+" % = "+p+"/100, ce qui se réduit à la fraction indiquée."},
      ds,
      "\\[ \\begin{aligned} "+p+" \\% &= "+FR(p,100)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] La réponse est <b>\\("+FR(s[0],s[1])+"\\)</b>.",
      {mode:"frac", p:p});
  }
  var cor=p/100;
  var pool2=[p/10,p/1000,(100+p)/100,p,cor+0.1];
  var seen2={}; seen2[fmtD(cor,6)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var key2=fmtD(pool2[j],6);
    if(seen2[key2])continue; seen2[key2]=1;
    ds2.push({t:fmtD(pool2[j],3), fb:"Ce nombre décimal déplace le pourcentage du mauvais nombre de positions : divise par 100."});
  }
  ds2=precPair(fmtD(cor),ds2);
  return mcq("Écris "+p+" % sous forme décimale.",
    {t:fmtD(cor), fb:"Oui : diviser "+p+" par 100 déplace la virgule décimale de deux positions vers la gauche."},
    ds2,
    "Un pourcentage est sur 100, donc \\("+p+" \\% = "+p+" \\div 100 = "+fmtD(cor)+"\\). La réponse est <b>"+fmtD(cor)+"</b>.",
    {mode:"dec", p:p});
}, ["Un pourcentage veut dire sur 100.", "Commence par écrire le pourcentage sur 100, puis réduis ou divise."]);

E("u3-frac-to-decimal", 3, ["3.11"], 1, "gen", function(){
  var dens=[2,4,5,8,10,20,25,40,50];
  var d=pick(dens), w=ri(0,2), n=ri(1,d-1);
  var v=(w*d+n)/d;
  var pool=[v+0.1,v-0.1,v+0.02,v-0.02,v+1,v+0.5];
  var seen={}; seen[fmtD(v,4)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var key=fmtD(pool[i],4);
    if(seen[key])continue; seen[key]=1;
    ds.push({t:fmtD(pool[i],3), fb:"Ce nombre décimal a une autre valeur : divise le numérateur par le dénominateur pour vérifier."});
  }
  ds=precPair(fmtD(v,3),ds);
  var num=w*d+n;
  return mcq("Écris \\("+FR(num,d)+"\\) sous forme décimale.",
    {t:fmtD(v,3), fb:"Oui : "+num+" divisé par "+d+" donne ce nombre décimal."},
    ds,
    "\\[ \\begin{aligned} "+FR(num,d)+" &= "+num+" \\div "+d+" \\\\ &= "+fmtD(v,3)+" \\end{aligned} \\] La réponse est <b>"+fmtD(v,3)+"</b>.",
    {num:num, d:d});
}, ["Une fraction est une division : le numérateur divisé par le dénominateur.", "Commence par diviser le nombre du haut par le nombre du bas."]);

E("u3-repeating-predict", 3, ["3.8","3.11"], 1, "gen", function(){
  var mode=ri(0,2);
  if(mode===0){
    var k=ri(3,10), dig=9*k, ds=(dig<10?"0":"")+dig;
    var d1=9*(k+1), d2=9*(k-1);
    return mcq("Régularités : \\("+FR(1,11)+"\\) = 0,0909..., \\("+FR(2,11)+"\\) = 0,1818.... Selon la régularité, écris \\("+FR(k,11)+"\\) sous forme décimale.",
      {t:"0,"+ds+ds+"...", fb:"Oui : le bloc périodique est 9 fois "+k+", écrit avec deux chiffres."},
      [{t:"0,"+((d1<10?"0":"")+d1)+((d1<10?"0":"")+d1)+"...", fb:"Ce bloc est 9 fois "+(k+1)+" : un pas trop loin dans la régularité."},
       {t:"0,"+((d2<10?"0":"")+d2)+((d2<10?"0":"")+d2)+"...", fb:"Ce bloc est 9 fois "+(k-1)+" : un pas trop court dans la régularité."},
       {t:"0,"+k+""+k+"...", fb:"Cela répète le numérateur lui-même; le bloc des onzièmes est 9 fois le numérateur."}],
      "Chaque numérateur ajoute un autre 0,0909..., donc le bloc périodique de \\("+FR(k,11)+"\\) est \\(9 \\times "+k+" = "+dig+"\\), écrit avec deux chiffres. La réponse est <b>0,"+ds+ds+"...</b>.",
      {mode:"p11", k:k});
  }
  if(mode===1){
    var m=ri(12,96);
    return mcq("Régularités : \\("+FR(1,99)+"\\) = 0,0101..., \\("+FR(2,99)+"\\) = 0,0202.... Selon la régularité, écris \\("+FR(m,99)+"\\) sous forme décimale.",
      {t:"0,"+m+""+m+"...", fb:"Oui : pour un dénominateur de 99, le numérateur lui-même se répète comme un bloc de deux chiffres."},
      [{t:"0,"+(m+1)+""+(m+1)+"...", fb:"Ce bloc vaut un de plus que le numérateur : recopie le numérateur exactement."},
       {t:"0,"+(m-1)+""+(m-1)+"...", fb:"Ce bloc vaut un de moins que le numérateur : recopie le numérateur exactement."},
       {t:"0,"+m+"...", fb:"Cela montre le bloc une seule fois, sans répétition; un nombre décimal périodique continue sans fin."}],
      "Pour un dénominateur de 99, le numérateur à deux chiffres se répète : \\("+FR(m,99)+"\\) = 0,"+m+""+m+".... La réponse est <b>0,"+m+""+m+"...</b>.",
      {mode:"p99", m:m});
  }
  var pairs=[[1,9],[2,9],[4,9],[5,9],[7,9],[8,9],[1,3],[2,3],[1,6],[5,6],[3,11],[4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11]];
  var pr=pick(pairs), n=pr[0], d=pr[1], cor=u3repStr(n,d);
  var alt1=cor.replace(/3/g,"4").replace(/6/g,"7");
  var ds3=[alt1, "0,"+n+"...", "0,"+n+""+d+"..."].filter(function(x){return x!==cor;});
  var seen3={}; var out=[];
  ds3.forEach(function(x){if(!seen3[x]){seen3[x]=1;out.push(x);}});
  while(out.length<3)out.push("0,"+(n+1)+""+(n+1)+"...");
  return mcq("Écris \\("+FR(n,d)+"\\) sous forme décimale.",
    {t:cor, fb:"Oui : diviser "+n+" par "+d+" donne ce nombre décimal périodique."},
    out.slice(0,3).map(function(x){return {t:x, fb:"Ce nombre décimal a d'autres chiffres périodiques : divise le numérateur par le dénominateur pour vérifier."};}),
    "\\("+FR(n,d)+" = "+n+" \\div "+d+" = "+cor+"\\), et les chiffres continuent de se répéter. La réponse est <b>"+cor+"</b>.",
    {mode:"direct", n:n, d:d});
}, ["Regarde comment le bloc périodique change quand le numérateur augmente.", "Commence par vérifier la régularité pour les plus petits numérateurs, puis prolonge-la."]);

E("u3-match-decimals", 3, ["3.9","3.11"], 2, "var", varset([
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(3,8)+"\\) = 0,375", fb:"Oui : 3 divisé par 8 donne 0,375."},
    [{t:"\\("+FR(1,4)+"\\) = 0,14", fb:"1/4 = 0,25 : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(2,5)+"\\) = 0,25", fb:"2/5 = 0,4 : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(5,8)+"\\) = 0,58", fb:"5/8 = 0,625 : les chiffres de la fraction ne sont pas son nombre décimal."}],
    "Divise chaque numérateur par son dénominateur : 1/4 = 0,25, 3/8 = 0,375, 2/5 = 0,4, 5/8 = 0,625. Seul <b>3/8 = 0,375</b> correspond.", {s:1}); },
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(1,3)+"\\) = 0,333...", fb:"Oui : 1 divisé par 3 donne 0,333..., qui se répète."},
    [{t:"\\("+FR(1,6)+"\\) = 0,6", fb:"1/6 = 0,1666... : le dénominateur n'est pas le nombre décimal."},
     {t:"\\("+FR(2,3)+"\\) = 0,23", fb:"2/3 = 0,666... : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(5,6)+"\\) = 0,56", fb:"5/6 = 0,8333... : les chiffres de la fraction ne sont pas son nombre décimal."}],
    "Divise chaque numérateur par son dénominateur : 1/6 = 0,1666..., 1/3 = 0,333..., 2/3 = 0,666..., 5/6 = 0,8333.... Seul <b>1/3 = 0,333...</b> correspond.", {s:2}); },
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(7,10)+"\\) = 0,7", fb:"Oui : 7 divisé par 10 donne 0,7."},
    [{t:"\\("+FR(3,4)+"\\) = 0,34", fb:"3/4 = 0,75 : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(9,20)+"\\) = 0,92", fb:"9/20 = 0,45 : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(1,8)+"\\) = 0,18", fb:"1/8 = 0,125 : les chiffres de la fraction ne sont pas son nombre décimal."}],
    "Divise chaque numérateur par son dénominateur : 7/10 = 0,7, 3/4 = 0,75, 9/20 = 0,45, 1/8 = 0,125. Seul <b>7/10 = 0,7</b> correspond.", {s:3}); },
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(4,11)+"\\) = 0,3636...", fb:"Oui : 4 divisé par 11 donne 0,3636..., avec 36 qui se répète."},
    [{t:"\\("+FR(2,11)+"\\) = 0,211", fb:"2/11 = 0,1818... : vérifie en divisant."},
     {t:"\\("+FR(5,9)+"\\) = 0,59", fb:"5/9 = 0,555... : vérifie en divisant."},
     {t:"\\("+FR(3,7)+"\\) = 0,37", fb:"3/7 = 0,428571... : vérifie en divisant."}],
    "Divise chaque numérateur par son dénominateur : 2/11 = 0,1818..., 4/11 = 0,3636..., 5/9 = 0,555..., 3/7 = 0,428571.... Seul <b>4/11 = 0,3636...</b> correspond.", {s:4}); },
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(5,6)+"\\) = 0,8333...", fb:"Oui : 5 divisé par 6 donne 0,8333..., avec 3 qui se répète."},
    [{t:"\\("+FR(4,9)+"\\) = 0,49", fb:"4/9 = 0,444... : les chiffres de la fraction ne sont pas son nombre décimal."},
     {t:"\\("+FR(7,12)+"\\) = 0,712", fb:"7/12 = 0,58333... : vérifie en divisant."},
     {t:"\\("+FR(2,7)+"\\) = 0,27", fb:"2/7 = 0,285714... : vérifie en divisant."}],
    "Divise chaque numérateur par son dénominateur : 5/6 = 0,8333..., 4/9 = 0,444..., 7/12 = 0,58333..., 2/7 = 0,285714.... Seul <b>5/6 = 0,8333...</b> correspond.", {s:5}); },
  function(){ return mcq("Quel appariement d'une fraction à son nombre décimal est correct ?",
    {t:"\\("+FR(1,9)+"\\) = 0,111...", fb:"Oui : 1 divisé par 9 donne 0,111..., qui se répète."},
    [{t:"\\("+FR(3,10)+"\\) = 0,31", fb:"3/10 = 0,3 exactement : vérifie les valeurs de position."},
     {t:"\\("+FR(5,12)+"\\) = 0,512", fb:"5/12 = 0,41666... : vérifie en divisant."},
     {t:"\\("+FR(7,8)+"\\) = 0,78", fb:"7/8 = 0,875 : les chiffres de la fraction ne sont pas son nombre décimal."}],
    "Divise chaque numérateur par son dénominateur : 1/9 = 0,111..., 3/10 = 0,3, 5/12 = 0,41666..., 7/8 = 0,875. Seul <b>1/9 = 0,111...</b> correspond.", {s:6}); }
]), ["Divise le numérateur par le dénominateur pour chaque appariement.", "Commence par tester l'appariement dont tu peux vérifier le nombre décimal le plus vite, comme les dixièmes."]);

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
    return {t:"\\("+FR(f[0],f[1])+"\\)", fb:ok?("Oui : sous forme irréductible, le dénominateur est "+u3simp(f[0],f[1])[1]+", qui a un facteur premier autre que 2 ou 5 (périodique) ou seulement des 2 et des 5 (fini)."):("Cette fraction est de l'autre type : réduis-la, puis vérifie les facteurs premiers de son dénominateur.")};
  };
  var cor=mk(target,true);
  var ds=opts.slice(1).map(function(f){return mk(f,false);});
  var sol="Réduis chaque fraction et décompose son dénominateur en facteurs. Un nombre décimal est fini quand le dénominateur n'a que des 2 et des 5 comme facteurs premiers; tout autre facteur premier veut dire qu'il est périodique. Seule la fraction "+u3fr(target[0],target[1])+" donne un nombre décimal "+(wantRep?"périodique":"fini")+". La réponse est <b>"+u3fr(target[0],target[1])+"</b>.";
  return mcq(wantRep?"Quelle fraction a un nombre décimal périodique ?":"Quelle fraction a un nombre décimal fini ?",
    cor, ds, sol, {wantRep:wantRep});
}, ["Réduis d'abord la fraction, puis regarde les facteurs premiers du dénominateur.", "Commence par réduire une fraction et vérifier si son dénominateur se décompose seulement en 2 et en 5."]);

E("u3-decimal-to-fraction", 3, ["3.12"], 1, "gen", function(){
  var pl=pick([1,2,3]), max=Math.pow(10,pl)-1, lo=(pl===1?1:11);
  var m=ri(lo,max); while(m%10===0)m=ri(lo,max);
  var den=Math.pow(10,pl), s=u3simp(m,den), corV=m/den;
  var pool=[[m,den],[den,m],[m,10],[m,1000],[m+den,den],[m,den*10]];
  var seen={}; seen[fmtD(corV,6)]=1; var seenT={}; seenT[s[0]+"/"+s[1]]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var cv=pool[i][0]/pool[i][1], ss=u3simp(pool[i][0],pool[i][1]), tk=ss[0]+"/"+ss[1];
    if(seen[fmtD(cv,6)]||seenT[tk])continue;
    seen[fmtD(cv,6)]=1; seenT[tk]=1;
    ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"Cette fraction a une autre valeur : compte les chiffres après la virgule pour choisir le dénominateur."});
  }
  return mcq("Écris "+fmtD(corV,3)+" sous forme de fraction irréductible.",
    {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Oui : le nombre décimal a "+pl+" chiffre(s) après la virgule, donc écris-le sur "+den+" puis réduis."},
    ds,
    "\\[ \\begin{aligned} "+fmtD(corV,3)+" &= "+FR(m,den)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] La réponse est <b>\\("+FR(s[0],s[1])+"\\)</b>.",
    {m:m, pl:pl});
}, ["Le nombre de chiffres après la virgule te donne le dénominateur : dixièmes, centièmes ou millièmes.", "Commence par écrire le nombre décimal comme une fraction sur 10, 100 ou 1000."]);

E("u3-repeating-to-fraction", 3, ["3.13"], 3, "gen", function(){
  var pool, corS, disp;
  if(ri(0,1)===0){
    var a=ri(2,8); corS=u3simp(a,9); disp="0,"+a+""+a+""+a+"...";
    pool=[[a,10],[a,99],[a+1,9],[a,90]];
  } else {
    var m=ri(12,97); while(m%10===0||m%11===0)m=ri(12,97);
    corS=u3simp(m,99); disp="0,"+m+""+m+"...";
    pool=[[m,100],[m,90],[m,9],[m+9,99]];
  }
  var corV=corS[0]/corS[1];
  var seen={}; seen[fmtD(corV,6)]=1; var seenT={}; seenT[corS[0]+"/"+corS[1]]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var ss=u3simp(pool[i][0],pool[i][1]), tk=ss[0]+"/"+ss[1], cv=pool[i][0]/pool[i][1];
    if(seen[fmtD(cv,6)]||seenT[tk])continue;
    seen[fmtD(cv,6)]=1; seenT[tk]=1;
    ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"Cette fraction a une autre valeur : le dénominateur d'un bloc périodique est 9 ou 99, pas une puissance de 10."});
  }
  return mcq("Écris "+disp+" sous forme de fraction irréductible.",
    {t:"\\("+FR(corS[0],corS[1])+"\\)", fb:"Oui : place le bloc périodique sur 9 (un chiffre) ou sur 99 (deux chiffres), puis réduis."},
    ds,
    "Le bloc périodique va sur 9 pour un chiffre périodique ou sur 99 pour deux, ce qui donne \\("+FR(corS[0],corS[1])+"\\) après réduction. La réponse est <b>\\("+FR(corS[0],corS[1])+"\\)</b>.",
    {disp:disp});
}, ["Un bloc périodique d'un chiffre va sur 9; un bloc de deux chiffres va sur 99.", "Commence par écrire les chiffres périodiques comme numérateur sur 9 ou sur 99."]);

E("u3-approx-example", 3, ["3.14","3.11"], 1, "var", varset([
  function(){ return mcq("Quel énoncé donne un exemple où un nombre décimal sert d'approximation de la valeur exacte d'une fraction ?",
    {t:"Une recette utilise 0,33 tasse pour \\("+FR(1,3)+"\\) de tasse, puisque 0,33 est proche de \\("+FR(1,3)+"\\) sans être exactement égal", fb:"Oui : 1/3 = 0,333..., donc 0,33 est une approximation arrondie."},
    [{t:"Une recette utilise 0,25 tasse pour \\("+FR(1,4)+"\\) de tasse de farine quand le cuisinier mesure les ingrédients pour un gâteau", fb:"0,25 vaut exactement 1/4, donc rien n'est approximé."},
     {t:"Un ruban est coupé à 0,5 m pour \\("+FR(1,2)+"\\) de mètre de ruban pour le bord d'une courtepointe cousue à la main", fb:"0,5 vaut exactement 1/2, donc rien n'est approximé."},
     {t:"Un réservoir contient 0,4 L pour \\("+FR(2,5)+"\\) de litre d'eau quand le réservoir est rempli jusqu'à ce repère sur le côté du réservoir", fb:"0,4 vaut exactement 2/5, donc rien n'est approximé."}],
    "Seule \\("+FR(1,3)+"\\) a un nombre décimal qui ne se termine jamais (0,333...), donc écrire 0,33 l'arrondit. Les autres sont exacts. La réponse est <b>l'énoncé de la recette utilisant 0,33</b>.", {s:1}); },
  function(){ return mcq("Quel énoncé donne un exemple où un nombre décimal sert d'approximation de la valeur exacte d'une fraction ?",
    {t:"Un rapport indique environ 0,67 de la classe pour \\("+FR(2,3)+"\\) de la classe, puisque 0,67 est proche de \\("+FR(2,3)+"\\) sans être exactement égal", fb:"Oui : 2/3 = 0,666..., donc 0,67 est une approximation arrondie."},
    [{t:"Un rapport indique 0,75 de la classe pour \\("+FR(3,4)+"\\) de la classe, dans un sondage sur les activités de l'heure du dîner mené en juin", fb:"0,75 vaut exactement 3/4, donc rien n'est approximé."},
     {t:"Un rapport indique 0,2 de la classe pour \\("+FR(1,5)+"\\) de la classe, dans le sondage de toute l'année d'école sur les choix des élèves", fb:"0,2 vaut exactement 1/5, donc rien n'est approximé."},
     {t:"Un rapport indique 0,6 de la classe pour \\("+FR(3,5)+"\\) de la classe, quand la classe a été sondée au mois de juin sur cette question-là", fb:"0,6 vaut exactement 3/5, donc rien n'est approximé."}],
    "Seule \\("+FR(2,3)+"\\) a un nombre décimal qui ne se termine jamais (0,666...), donc écrire 0,67 l'arrondit. Les autres sont exacts. La réponse est <b>l'énoncé du rapport utilisant 0,67</b>.", {s:2}); },
  function(){ return mcq("Quel énoncé donne un exemple où un nombre décimal sert d'approximation de la valeur exacte d'une fraction ?",
    {t:"Un panneau de sentier arrondit \\("+FR(1,6)+"\\) du parcours à 0,17, puisque le nombre décimal exact continue sans fin", fb:"Oui : 1/6 = 0,1666..., donc 0,17 est une approximation arrondie."},
    [{t:"Un panneau de sentier indique \\("+FR(3,10)+"\\) du parcours comme 0,3 du chemin entre le début du sentier et le lac", fb:"0,3 vaut exactement 3/10, donc rien n'est approximé."},
     {t:"Un panneau de sentier indique \\("+FR(5,8)+"\\) du parcours comme 0,625 du parcours jusqu'au belvédère au bord du lac en montagne", fb:"0,625 vaut exactement 5/8, donc rien n'est approximé."},
     {t:"Un panneau de sentier indique \\("+FR(7,20)+"\\) du parcours comme 0,35 du chemin à partir du début du sentier boisé", fb:"0,35 vaut exactement 7/20, donc rien n'est approximé."}],
    "Seule \\("+FR(1,6)+"\\) a un nombre décimal qui ne se termine jamais (0,1666...), donc écrire 0,17 l'arrondit. Les autres sont exacts. La réponse est <b>l'énoncé du panneau utilisant 0,17</b>.", {s:3}); },
  function(){ return mcq("Quel énoncé donne un exemple où un nombre décimal sert d'approximation de la valeur exacte d'une fraction ?",
    {t:"Un bulletin météo donne \\("+FR(5,6)+"\\) de la journée comme environ 0,83, puisque le nombre décimal exact continue sans fin", fb:"Oui : 5/6 = 0,8333..., donc 0,83 est une approximation arrondie."},
    [{t:"Un bulletin météo donne \\("+FR(1,8)+"\\) de la journée comme 0,125, pour le temps passé dehors au soleil et à l'air frais", fb:"0,125 vaut exactement 1/8, donc rien n'est approximé."},
     {t:"Un bulletin météo donne \\("+FR(9,10)+"\\) de la journée comme 0,9, pour le temps passé dehors au soleil et sous la pluie", fb:"0,9 vaut exactement 9/10, donc rien n'est approximé."},
     {t:"Un bulletin météo donne \\("+FR(3,20)+"\\) de la journée comme 0,15, pour le temps passé dehors pendant la journée entière", fb:"0,15 vaut exactement 3/20, donc rien n'est approximé."}],
    "Seule \\("+FR(5,6)+"\\) a un nombre décimal qui ne se termine jamais (0,8333...), donc écrire 0,83 l'arrondit. Les autres sont exacts. La réponse est <b>l'énoncé météo utilisant 0,83</b>.", {s:4}); },
  function(){ return mcq("Quel énoncé donne un exemple où un nombre décimal sert d'approximation de la valeur exacte d'une fraction ?",
    {t:"Un jardinier arrose \\("+FR(1,7)+"\\) d'un parterre et le note comme environ 0,14, puisque le nombre décimal exact continue sans fin", fb:"Oui : 1/7 = 0,142857..., donc 0,14 est une approximation arrondie."},
    [{t:"Un jardinier arrose \\("+FR(2,8)+"\\) d'un parterre et le note comme 0,25, avec l'arrosoir, un matin sec de juillet au jardin communautaire", fb:"0,25 vaut exactement 2/8 = 1/4, donc rien n'est approximé."},
     {t:"Un jardinier arrose \\("+FR(4,10)+"\\) d'un parterre et le note comme 0,4, avec l'arrosoir, un matin sec de printemps au jardin", fb:"0,4 vaut exactement 4/10, donc rien n'est approximé."},
     {t:"Un jardinier arrose \\("+FR(6,20)+"\\) d'un parterre et le note comme 0,3, avec l'arrosoir, tôt le matin avant la chaleur du jour", fb:"0,3 vaut exactement 6/20, donc rien n'est approximé."}],
    "Seule \\("+FR(1,7)+"\\) a un nombre décimal qui ne se termine jamais (0,142857...), donc écrire 0,14 l'arrondit. Les autres sont exacts. La réponse est <b>l'énoncé du jardinier utilisant 0,14</b>.", {s:5}); }
]), ["Il y a approximation quand le nombre décimal exact ne se termine jamais, donc on utilise un nombre décimal arrondi.", "Commence par vérifier quelle fraction a un nombre décimal périodique."]);

E("u3-add-sub-decimals", 3, ["6.5","6.6"], 1, "gen", function(){
  var ctxs=[
    {add:true, s:"Maya achète un cahier pour %A $ et un stylo pour %B $. Combien dépense-t-elle au total ?"},
    {add:true, s:"Un sentier a deux parties : %A km et %B km. Quelle est la longueur totale du sentier ?"},
    {add:true, s:"Trois rubans mesurent %A m, %B m et %C m. Quelle est leur longueur totale ?"},
    {add:false, s:"Jonah a %A $ et dépense %B $ pour son dîner. Combien d'argent lui reste-t-il ?"},
    {add:false, s:"Un réservoir contient %A L d'eau. Une famille utilise %B L. Combien d'eau reste-t-il ?"},
    {add:false, s:"Une planche mesure %A m de long. On coupe un morceau de %B m. Quelle est la longueur du morceau qui reste ?"}
  ];
  var c=pick(ctxs);
  var A=ri(120,4800)/100, B=ri(110,2900)/100;
  if(!c.add&&B>A){var tmp=A;A=B;B=tmp;}
  var parts=[A,B], ans=A+B;
  if(c.add&&c.s.indexOf("%C")>=0){var C=ri(105,1500)/100; parts.push(C); ans+=C;}
  if(!c.add)ans=A-B;
  var prompt=c.s.replace("%A",fmtDF(A,2)).replace("%B",fmtDF(B,2));
  if(parts.length===3)prompt=prompt.replace("%C",fmtDF(parts[2],2));
  var pool=[ans+0.1,ans-0.1,ans+1,ans-1,ans+0.01,ans+10];
  var seen={}; seen[fmtDF(ans,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=fmtDF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:"Vérifie les valeurs de position : aligne les virgules décimales et additionne ou soustrais colonne par colonne."});
  }
  var moneyCtx=c.s.indexOf("$")>=0;
  var corT=fmtDF(ans,2)+(moneyCtx?" $":"");
  ds=ds.map(function(o){return {t:o.t+(moneyCtx?" $":""), fb:o.fb};});
  var steps=parts.map(function(x){return fmtDF(x,2);}).join(c.add?" + ":"");
  var sol=c.add
    ? "\\[ \\begin{aligned} &"+parts.map(function(x){return fmtDF(x,2);}).join(" + ")+" \\\\ &= "+fmtDF(ans,2)+" \\end{aligned} \\] La réponse est <b>"+corT+"</b>."
    : "\\[ \\begin{aligned} "+fmtDF(A,2)+" - "+fmtDF(B,2)+" &= "+fmtDF(ans,2)+" \\end{aligned} \\] La réponse est <b>"+corT+"</b>.";
  return mcq(prompt,
    {t:corT, fb:"Oui : en alignant les virgules décimales et en travaillant colonne par colonne, on obtient cette valeur."},
    ds, sol, {mode:c.add?"add":"sub", A:A, B:B});
}, ["Aligne les virgules décimales avant d'additionner ou de soustraire.", "Commence par réécrire les nombres avec les virgules décimales dans une même colonne."]);

E("u3-frontend-sum", 3, ["6.1","6.4"], 2, "gen", function(){
  var A=ri(2,9)+ri(1,9)/10;
  var B=ri(1,9)/10+ri(1,99)/100;
  var C=ri(120,480)+ri(1,999)/1000;
  var isSum=ri(0,1)===0;
  var val=isSum?A+B+C:C-A;
  var milli=Math.round(val*1000), digits=String(milli);
  var decPos=digits.length-3;
  function place(pos){
    if(pos<=0)return "0,"+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+","+digits.slice(pos);
  }
  var posns=[decPos,decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; var ds=[];
  var corStr=place(decPos); seen[corStr]=1;
  for(var i=1;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"La stratégie des premiers chiffres place la valeur près de "+fmtD(Math.round(val))+", donc cette place de la virgule donne la mauvaise taille."});
  }
  ds=precPair(corStr,ds);
  var expr=isSum?(fmtD(A,1)+" + "+fmtD(B,2)+" + "+fmtD(C,3)):(fmtD(C,3)+" - "+fmtD(A,1));
  var fe=isSum?("les premiers chiffres donnent environ "+Math.floor(A)+" + 0 + "+Math.floor(C)):("les premiers chiffres donnent environ "+Math.floor(C)+" - "+Math.floor(A));
  return mcq("Les chiffres de la réponse à "+expr+" sont "+digits+". À l'aide de la stratégie des premiers chiffres, où la virgule décimale doit-elle aller ?",
    {t:corStr, fb:"Oui : "+fe+", ce qui correspond à cette place."},
    ds,
    "Stratégie des premiers chiffres : "+fe+", donc la réponse est de l'ordre des "+(val>=100?"centaines":val>=10?"dizaines":"unités")+". Placer la virgule décimale pour donner "+corStr+" correspond. La réponse est <b>"+corStr+"</b>.",
    {mode:isSum?"sum":"diff"});
}, ["La stratégie des premiers chiffres utilise les premiers chiffres pour juger de la taille de la réponse.", "Commence par additionner ou soustraire seulement les nombres entiers du début."]);

E("u3-mult-decimals", 3, ["6.7"], 1, "gen", function(){
  var mode=ri(0,1), ans, prompt, work;
  if(mode===0){
    var p=ri(125,1999)/100, q=ri(12,48);
    ans=p*q;
    prompt="Le tissu coûte "+fmtDF(p,2)+" $ le mètre. Combien coûtent "+q+" mètres, en dollars ?";
    work="\\[ \\begin{aligned} "+fmtDF(p,2)+" \\times "+q+" &= "+fmtD(ans,2)+" \\end{aligned} \\]";
  } else {
    var a=ri(115,999)/100, b=ri(12,35)/10;
    ans=a*b;
    prompt="Un parterre mesure "+fmtD(a,2)+" m de long et "+fmtD(b,1)+" m de large. Quelle est son aire, en mètres carrés ?";
    work="\\[ \\begin{aligned} "+fmtD(a,2)+" \\times "+fmtD(b,1)+" &= "+fmtD(ans,3)+" \\end{aligned} \\]";
  }
  var pool=[ans*10,ans/10,ans+a||ans+1,ans+(mode===0?p:a),ans- (mode===0?p:a)];
  var seen={}; seen[fmtD(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmtD(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(mode===0?fmtDF(pool[i],2):k), fb:"Vérifie la place de la virgule décimale : compte le nombre total de chiffres après la virgule dans les facteurs, ou estime d'abord la taille."});
  }
  var corT=(mode===0?fmtDF(ans,2):fmtD(ans,3));
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Oui : la multiplication et la place de la virgule décimale sont toutes les deux correctes."},
    ds,
    work+" Multiplie comme avec des nombres entiers, puis place la virgule décimale selon le nombre total de chiffres après la virgule dans les facteurs. La réponse est <b>"+corT+"</b>.",
    {mode:mode});
}, ["Multiplie comme si les nombres étaient entiers, puis place la virgule décimale.", "Commence par estimer la taille du produit pour qu'une virgule mal placée se remarque."]);

E("u3-frontend-prod-quot", 3, ["6.2","6.3"], 2, "gen", function(){
  var isProd=ri(0,1)===0;
  var digits, decPos, prompt, feText, val;
  if(isProd){
    var P=ri(205,1999)/100, M=ri(21,49)/10;
    val=P*M;
    var milli=Math.round(val*1000); digits=String(milli); decPos=digits.length-3;
    prompt="Les chiffres du produit "+fmtDF(P,2)+" $ x "+fmtD(M,1)+" sont "+digits+". À l'aide de la stratégie des premiers chiffres, où la virgule décimale doit-elle aller dans le produit ?";
    feText="les premiers chiffres donnent environ "+Math.floor(P)+" $ x "+Math.floor(M)+" = "+(Math.floor(P)*Math.floor(M))+" $";
  } else {
    var q=ri(15,35)+ri(1,9)/10, dv=ri(21,49)/10, dvd=q*dv;
    val=q;
    digits=String(Math.round(q*10)); decPos=digits.length-1;
    prompt="Les chiffres du quotient "+fmtD(dvd,2)+" / "+fmtD(dv,1)+" sont "+digits+". À l'aide de la stratégie des premiers chiffres, où la virgule décimale doit-elle aller dans le quotient ?";
    feText="les premiers chiffres donnent environ "+fmtD(Math.round(dvd))+" / "+Math.floor(dv)+", soit environ "+fmtD(Math.round(dvd)/Math.floor(dv),0);
  }
  function place(pos){
    if(pos<=0)return "0,"+("000".slice(0,-pos))+digits;
    if(pos>=digits.length)return digits+("000".slice(0,pos-digits.length));
    return digits.slice(0,pos)+","+digits.slice(pos);
  }
  var corStr=place(decPos);
  var posns=[decPos-1,decPos+1,decPos-2,decPos+2];
  var seen={}; seen[corStr]=1; var ds=[];
  for(var i=0;i<posns.length&&ds.length<3;i++){
    var s2=place(posns[i]);
    if(seen[s2])continue; seen[s2]=1;
    ds.push({t:s2, fb:"La stratégie des premiers chiffres donne une autre taille : "+feText+"."});
  }
  ds=precPair(corStr,ds);
  return mcq(prompt,
    {t:corStr, fb:"Oui : "+feText+", ce qui correspond à cette place."},
    ds,
    "Stratégie des premiers chiffres : "+feText+", donc la réponse doit avoir cette taille. Seul "+corStr+" convient. La réponse est <b>"+corStr+"</b>.",
    {mode:isProd?"prod":"quot"});
}, ["La stratégie des premiers chiffres utilise les premiers chiffres pour juger de la taille de la réponse.", "Commence par multiplier ou diviser seulement les nombres entiers du début."]);

E("u3-div-decimals", 3, ["6.8"], 1, "gen", function(){
  var ctxs=[
    {s:"Une corde de %D m de long est coupée en %V morceaux égaux. Quelle est la longueur de chaque morceau, en mètres ?"},
    {s:"Un groupe paie %D $ pour la location d'une fourgonnette, partagée également entre %V amis. Combien chaque ami paie-t-il ?"},
    {s:"Une cruche contient %D L de jus, versés également dans %V bouteilles. Combien de litres y a-t-il dans chaque bouteille ?"}
  ];
  var useDecDiv=ri(0,1)===0;
  var dv=useDecDiv?ri(3,9)/10:ri(3,9);
  var q=ri(125,2400)/100;
  var dvd=q*dv;
  var c=pick(ctxs);
  var prompt=c.s.replace("%D",fmtD(dvd,3)).replace("%V",fmtD(dv,1));
  var money=c.s.indexOf("$")>=0;
  var pool=[q*10,q/10,q+dv,q- dv];
  var seen={}; seen[fmtD(q,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(!(pool[i]>0))continue;
    var k=fmtD(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:(money?fmtDF(pool[i],2)+" $":k), fb:"Vérifie en multipliant ta réponse par le diviseur : tu dois retrouver la quantité de départ."});
  }
  var corT=(money?fmtDF(q,2)+" $":fmtD(q,3));
  ds=precPair(corT,ds);
  return mcq(prompt,
    {t:corT, fb:"Oui : "+fmtD(q,3)+" fois "+fmtD(dv,1)+" redonne "+fmtD(dvd,3)+"."},
    ds,
    "\\[ \\begin{aligned} "+fmtD(dvd,3)+" \\div "+fmtD(dv,1)+" &= "+fmtD(q,3)+" \\end{aligned} \\] Vérification : \\("+fmtD(q,3)+" \\times "+fmtD(dv,1)+" = "+fmtD(dvd,3)+"\\). La réponse est <b>"+corT+"</b>.",
    {dv:dv, q:q});
}, ["La division défait la multiplication : la réponse fois le diviseur doit redonner la quantité de départ.", "Commence par estimer : combien de groupes de la taille du diviseur entrent dans la quantité de départ ?"]);

E("u3-tech-multdiv", 3, ["6.9"], 3, "gen", function(){
  if(ri(0,1)===0){
    var n=ri(105,390), p=ri(125,975)/100, total=n*p;
    var pool=[total-p,total+10,total/10,total+p*2];
    var seen={}; seen[fmtDF(total,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtDF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:"Multiplie le prix par le nombre complet d'articles : vérifie que chaque chiffre du multiplicateur à trois chiffres a été utilisé."});
    }
    return mcq("Une école commande "+n+" cahiers d'exercices à "+fmtDF(p,2)+" $ chacun. En utilisant la technologie pour la multiplication à trois chiffres, quel est le coût total, en dollars ?",
      {t:fmtDF(total,2), fb:"Oui : "+n+" x "+fmtDF(p,2)+" $ = "+fmtDF(total,2)+" $."},
      ds,
      "\\[ \\begin{aligned} "+n+" \\times "+fmtDF(p,2)+" &= "+fmtDF(total,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(total,2)+" $</b>.",
      {mode:"mult", n:n, p:p});
  }
  var T=ri(40000,90000)/100, nv=ri(3,9);
  var each=Math.round(T/nv*100)/100;
  var pool2=[each+0.37,each-0.37,each+1.5,each*2];
  var seen2={}; seen2[fmtDF(each,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    if(!(pool2[j]>0))continue;
    var k2=fmtDF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:"Divise le total par "+nv+" et arrondis au cent le plus près : vérifie que les "+nv+" parts redonnent le total."});
  }
  return mcq("Un prix de "+fmtDF(T,2)+" $ est partagé également entre "+nv+" élèves. En utilisant la technologie, combien chaque élève reçoit-il, en dollars, au cent le plus près ?",
    {t:fmtDF(each,2), fb:"Oui : "+fmtDF(T,2)+" $ divisé par "+nv+" s'arrondit à "+fmtDF(each,2)+" $."},
    ds2,
    "\\[ \\begin{aligned} "+fmtDF(T,2)+" \\div "+nv+" &= "+fmtD(T/nv,4)+" \\approx "+fmtDF(each,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(each,2)+" $</b>.",
    {mode:"div", T:T, n:nv});
}, ["Décompose le calcul en une mise en place (quelle opération, quels nombres) avant d'utiliser la technologie pour le calcul.", "Commence par écrire la multiplication ou la division que le problème décrit."]);

E("u3-order-ops-dec", 3, ["6.10"], 3, "gen", function(){
  var tpl=ri(0,2), ans, wrong, prompt, work;
  if(tpl===0){
    var a=ri(12,89)/10, b=ri(11,49)/10, c=ri(2,9);
    ans=a+b*c; wrong=(a+b)*c;
    prompt="Calcule : "+fmtD(a,1)+" + "+fmtD(b,1)+" x "+c;
    work="\\[ \\begin{aligned} "+fmtD(a,1)+" + "+fmtD(b,1)+" \\times "+c+" &= "+fmtD(a,1)+" + "+fmtD(b*c,1)+" \\\\ &= "+fmtD(ans,2)+" \\end{aligned} \\]";
  } else if(tpl===1){
    var a2=ri(12,59)/10, b2=ri(11,39)/10, c2=ri(2,9);
    ans=(a2+b2)*c2; wrong=a2+b2*c2;
    prompt="Calcule : ("+fmtD(a2,1)+" + "+fmtD(b2,1)+") x "+c2;
    work="\\[ \\begin{aligned} ("+fmtD(a2,1)+" + "+fmtD(b2,1)+") \\times "+c2+" &= "+fmtD(a2+b2,1)+" \\times "+c2+" \\\\ &= "+fmtD(ans,2)+" \\end{aligned} \\]";
  } else {
    var d=pick([2,4,5,8]), cq=ri(12,96)/10, c3=cq*d, a3=ri(21,59)/10, b3=ri(2,9);
    ans=a3*b3-cq; wrong=(a3*b3-c3)/d;
    prompt="Calcule : "+fmtD(a3,1)+" x "+b3+" - "+fmtD(c3,1)+" / "+d;
    work="\\[ \\begin{aligned} "+fmtD(a3,1)+" \\times "+b3+" - "+fmtD(c3,1)+" \\div "+d+" &= "+fmtD(a3*b3,1)+" - "+fmtD(cq,1)+" \\\\ &= "+fmtD(ans,2)+" \\end{aligned} \\]";
  }
  var pool=[wrong,ans+1,ans-1,ans+0.5];
  var seen={}; seen[fmtD(ans,3)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtD(pool[i],3);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"Cela calcule strictement de gauche à droite : les parenthèses d'abord, puis les multiplications et les divisions, puis les additions et les soustractions.":"Cette valeur vient d'une erreur de calcul : refais chaque opération dans l'ordre."});
  }
  ds=precPair(fmtD(ans,3),ds);
  return mcq(prompt,
    {t:fmtD(ans,3), fb:"Oui : les parenthèses d'abord, puis la multiplication et la division, puis l'addition et la soustraction."},
    ds,
    work+" La réponse est <b>"+fmtD(ans,3)+"</b>.",
    {tpl:tpl});
}, ["Suis la priorité des opérations : parenthèses, puis multiplications et divisions, puis additions et soustractions.", "Commence par trouver les parenthèses et faire cette partie en premier."]);

E("u3-percent-of", 3, ["6.11","3.7"], 1, "gen", function(){
  if(ri(0,1)===0){
    var Ns=[40,50,60,80,90,120,150,200,240,250,300,400];
    var N=pick(Ns), p=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
    var ans=N*p/100;
    var ctxs=["Quel est "+p+" % de "+N+" ?","Une école compte "+N+" élèves et "+p+" % d'entre eux prennent l'autobus. Combien d'élèves prennent l'autobus ?","Un test vaut "+N+" points. Un élève obtient un résultat de "+p+" %. À combien de points cela correspond-il ?","Sur "+N+" billes, "+p+" % sont rouges. Combien de billes sont rouges ?"];
    var pool=[p,ans+N*0.05,ans-N*0.05,ans*2,100-p,ans+N*0.1,ans*3,ans/2,p+10];
    var seen={}; seen[fmtD(ans,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      if(!(pool[i]>0))continue;
      var k=fmtD(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:"Convertis d'abord le pourcentage en nombre décimal ("+p+" % = "+fmtD(p/100)+"), puis multiplie par "+N+"."});
    }
    ds=precPair(fmtD(ans,2),ds);
    return mcq(pick(ctxs),
      {t:fmtD(ans,2), fb:"Oui : "+p+" % = "+fmtD(p/100)+", et "+fmtD(p/100)+" de "+N+" donne "+fmtD(ans,2)+"."},
      ds,
      "\\[ \\begin{aligned} "+p+" \\% \\text{ de } "+N+" &= "+fmtD(p/100)+" \\times "+N+" \\\\ &= "+fmtD(ans,2)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans,2)+"</b>.",
      {mode:"of", N:N, p:p});
  }
  var Ns2=[40,50,60,80,100,120,150,200,240,300];
  var N2=pick(Ns2), k2=pick([5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95]);
  var part=N2*k2/100;
  var pool3=[k2+10,k2-10,100-k2,k2+25,k2+5,k2-5,k2+15,k2-15];
  var seen3={}; seen3[k2+" %"]=1; var ds3=[];
  for(var j=0;j<pool3.length&&ds3.length<3;j++){
    if(pool3[j]<=0||pool3[j]>100)continue;
    var kk=pool3[j]+" %";
    if(seen3[kk])continue; seen3[kk]=1;
    ds3.push({t:kk, fb:"Écris la partie sur le tout comme une fraction, puis convertis en pourcentage."});
  }
  return mcq(fmtD(part,1)+" élèves sur "+N2+" ont réussi un quiz. Quel pourcentage a réussi ?",
    {t:k2+" %", fb:"Oui : "+fmtD(part,1)+"/"+N2+" = "+fmtD(k2/100)+", ce qui donne "+k2+" %."},
    ds3,
    "\\[ \\begin{aligned} "+FR(Math.round(part*10),N2*10)+" &= "+fmtD(k2/100)+" \\\\ &= "+k2+" \\% \\end{aligned} \\] La réponse est <b>"+k2+" %</b>.",
    {mode:"find", N:N2, k:k2});
}, ["Pourcentage d'un nombre : convertis le pourcentage en nombre décimal et multiplie.", "Commence par écrire le pourcentage sous forme décimale (divise par 100)."]);

E("u3-tax-total", 3, ["6.12"], 3, "gen", function(){
  var price=ri(450,9999)/100;
  var tax=Math.round(price*0.15*100)/100;
  var total=Math.round((price+tax)*100)/100;
  var alt1=Math.round(price*1.05*100)/100, alt2=tax, alt3=Math.round((price+tax+1)*100)/100;
  var pool=[alt1,alt2,alt3];
  var seen={}; seen[fmtDF(total,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtDF(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===1?"C'est la taxe seule : le total est le prix plus la taxe.":"Cela utilise le mauvais taux ou un montant de plus : la TVH à Terre-Neuve-et-Labrador est de 15 %."});
  }
  return mcq("Une veste coûte "+fmtDF(price,2)+" $ avant taxe. Avec la TVH de 15 % ajoutée, quel est le coût total, en dollars, au cent le plus près ?",
    {t:fmtDF(total,2), fb:"Oui : la taxe est de "+fmtDF(tax,2)+" $, et le prix plus la taxe donne ce total."},
    ds,
    "\\[ \\begin{aligned} \\text{taxe} &= 0,15 \\times "+fmtDF(price,2)+" = "+fmtDF(tax,2)+" \\\\ \\text{total} &= "+fmtDF(price,2)+" + "+fmtDF(tax,2)+" = "+fmtDF(total,2)+" \\end{aligned} \\] L'argent est arrondi au cent le plus près parce que les cents sont la plus petite unité payée. La réponse est <b>"+fmtDF(total,2)+" $</b>.",
    {price:price});
}, ["Trouve d'abord la taxe (15 % du prix), puis ajoute-la au prix.", "Commence par multiplier le prix par 0,15 pour obtenir la taxe."]);

E("u3-reasonableness", 3, ["6.4"], 1, "gen", function(){
  var mode=ri(0,2);
  if(mode===0){
    var a=ri(32,68), b=ri(3,9), cor=a*b, given=cor/10, est=Math.round(a/10)*10*b;
    return mcq("Kofi calcule "+a+" x "+b+" = "+fmtD(given,1)+". Quel contrôle montre si sa réponse est raisonnable ?",
      {t:"Estime "+Math.round(a/10)*10+" x "+b+" = "+est+"; la réponse devrait être près de "+est+", donc "+fmtD(given,1)+" est trop petit", fb:"Oui : l'estimation révèle une virgule décimale mal placée."},
      [{t:"La réponse est raisonnable parce que "+a+" x "+b+" ne contient aucune virgule décimale", fb:"Des facteurs entiers peuvent quand même donner une réponse de la mauvaise taille : estime pour vérifier."},
       {t:"Estime "+Math.round(a/10)*10+" x "+b+" = "+est+"; puisque "+fmtD(given,1)+" est un nombre entier, il doit être correct", fb:"L'estimation dit que le produit devrait être près de "+est+", loin de la valeur donnée."},
       {t:"Additionne "+a+" + "+b+" = "+(a+b)+" pour vérifier la multiplication, avec les deux mêmes nombres", fb:"Additionner ne vérifie pas un produit : utilise une estimation par multiplication arrondie."}],
      "Estime avec des nombres arrondis : "+Math.round(a/10)*10+" x "+b+" = "+est+". Le vrai produit est "+cor+", donc "+fmtD(given,1)+" est beaucoup trop petit. La réponse est <b>le contrôle par estimation</b>.",
      {mode:"mult"});
  }
  if(mode===1){
    var x=ri(210,480)+ri(1,99)/100, y=ri(110,290)+ri(1,99)/100, s=x+y, giv=Math.round(s)+100;
    var est2=Math.round(x)+Math.round(y);
    return mcq("Aisha calcule "+fmtD(x,2)+" + "+fmtD(y,2)+" = "+fmtD(giv,2)+". Quel contrôle montre si sa réponse est raisonnable ?",
      {t:"Estime "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; la réponse devrait être près de "+est2+", donc "+fmtD(giv,2)+" est trop grand", fb:"Oui : arrondir chaque terme révèle l'erreur."},
      [{t:"La réponse est raisonnable parce que les chiffres des cents s'additionnent correctement", fb:"Des cents corrects ne garantissent pas la partie entière : estime la taille complète."},
       {t:"Estime "+Math.round(x)+" + "+Math.round(y)+" = "+est2+"; puisque la réponse donnée se termine par ,00, elle doit être correcte", fb:"L'estimation dit que la somme devrait être près de "+est2+", loin de la valeur donnée."},
       {t:"Multiplie les deux nombres pour vérifier l'addition, avec les deux mêmes nombres", fb:"La multiplication ne vérifie pas une addition : utilise une estimation par addition arrondie."}],
      "Estime avec des nombres arrondis : "+Math.round(x)+" + "+Math.round(y)+" = "+est2+". La somme réelle est "+fmtD(s,2)+", donc "+fmtD(giv,2)+" est trop grand. La réponse est <b>le contrôle par estimation</b>.",
      {mode:"add"});
  }
  var T=ri(120,360), n=ri(4,8), per=T/n, giv2=per*10, est3=Math.round(T/10)*10/n;
  return mcq("Ravi calcule "+T+" / "+n+" = "+fmtD(giv2,1)+". Quel contrôle montre si sa réponse est raisonnable ?",
    {t:"Estime "+Math.round(T/10)*10+" / "+n+" = "+fmtD(est3,1)+"; la réponse devrait être près de "+fmtD(est3,1)+", donc "+fmtD(giv2,1)+" est trop grand", fb:"Oui : l'estimation révèle une virgule décimale mal placée."},
    [{t:"La réponse est raisonnable parce que "+n+" est un petit diviseur dans une question de division", fb:"Un petit diviseur ne garantit pas la taille : estime pour vérifier."},
     {t:"Estime "+Math.round(T/10)*10+" / "+n+" = "+fmtD(est3,1)+"; puisque "+fmtD(giv2,1)+" est plus grand que "+T+" divisé par 10, il doit être correct", fb:"L'estimation dit que le quotient devrait être près de "+fmtD(est3,1)+", loin de la valeur donnée."},
     {t:"Soustrais "+n+" de "+T+" pour vérifier la division, au lieu d'estimer le quotient", fb:"La soustraction ne vérifie pas un quotient : utilise une estimation par division arrondie."}],
    "Estime avec des nombres arrondis : "+Math.round(T/10)*10+" / "+n+" = "+fmtD(est3,1)+". Le quotient réel est "+fmtD(per,2)+", donc "+fmtD(giv2,1)+" est trop grand. La réponse est <b>le contrôle par estimation</b>.",
    {mode:"div"});
}, ["Une estimation rapide avec des nombres arrondis te dit la taille que la réponse devrait avoir.", "Commence par arrondir chaque nombre à une valeur facile, puis refais l'opération."]);

E("u3-cr-add-sub", 3, ["6.5","6.6"], 2, "gen", function(){
  var i1=ri(250,1899)/100, i2=ri(150,1299)/100, i3=ri(110,899)/100;
  var bills=[20,50], bill=pick(bills);
  var total=i1+i2+i3; if(total>=bill){bill=50;}
  if(total>=bill){i1=ri(250,999)/100; i2=ri(150,899)/100; i3=ri(110,699)/100; total=i1+i2+i3;}
  var change=Math.round((bill-total)*100)/100;
  return numq("Sam achète un jeu pour "+fmtDF(i1,2)+" $, une collation pour "+fmtDF(i2,2)+" $ et une boisson pour "+fmtDF(i3,2)+" $. Il paie avec un billet de "+bill+" $. Combien de monnaie reçoit-il ? Donne ta réponse en dollars.",
    change, 0.01,
    "\\[ \\begin{aligned} \\text{total} &= "+fmtDF(i1,2)+" + "+fmtDF(i2,2)+" + "+fmtDF(i3,2)+" = "+fmtDF(total,2)+" \\\\ \\text{monnaie} &= "+bill+",00 - "+fmtDF(total,2)+" = "+fmtDF(change,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(change,2)+" $</b>.",
    {i1:i1, i2:i2, i3:i3, bill:bill});
}, ["Additionne d'abord les trois coûts, puis soustrais du montant payé.", "Commence par trouver le coût total des trois articles."]);

E("u3-cr-mult", 3, ["6.7"], 1, "gen", function(){
  var p=ri(275,1575)/100, L=ri(24,96)/10;
  var total=Math.round(p*L*100)/100;
  return numq("Le ruban coûte "+fmtDF(p,2)+" $ le mètre. Combien coûtent "+fmtD(L,1)+" mètres ? Donne ta réponse en dollars.",
    total, 0.01,
    "\\[ \\begin{aligned} "+fmtDF(p,2)+" \\times "+fmtD(L,1)+" &= "+fmtD(p*L,3)+" \\\\ &\\approx "+fmtDF(total,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(total,2)+" $</b>.",
    {p:p, L:L});
}, ["Multiplie le prix au mètre par le nombre de mètres.", "Commence par multiplier comme avec des nombres entiers, puis place la virgule décimale."]);

E("u3-cr-div", 3, ["6.8"], 1, "gen", function(){
  var n=pick([3,4,5,6,8]), q=ri(225,1875)/100, total=q*n;
  return numq("Une course de taxi coûte "+fmtDF(total,2)+" $ au total, partagée également entre "+n+" amis. Combien chaque ami paie-t-il ? Donne ta réponse en dollars.",
    q, 0.01,
    "\\[ \\begin{aligned} "+fmtDF(total,2)+" \\div "+n+" &= "+fmtDF(q,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(q,2)+" $</b>.",
    {n:n, q:q});
}, ["Divise le coût total par le nombre d'amis.", "Commence par partager le total en groupes égaux."]);

E("u3-cr-repeating-frac", 3, ["3.13"], 2, "gen", function(){
  var m=ri(11,98); while(m%10===0)m=ri(11,98);
  var s=u3simp(m,99);
  var simpStr=s[0]+"/"+s[1];
  return textq("Écris 0,"+m+""+m+"... sous forme de fraction irréductible. Tape ta réponse comme 4/11.",
    [simpStr, m+"/99"],
    "Un bloc périodique de deux chiffres va sur 99 : \\("+FR(m,99)+"\\) = \\("+FR(s[0],s[1])+"\\) sous forme irréductible. La réponse est <b>"+simpStr+"</b>.",
    {m:m});
}, ["Un bloc périodique de deux chiffres va sur 99.", "Commence par écrire les chiffres périodiques sur 99, puis réduis."]);

E("u3-cr-percent", 3, ["6.11","6.12"], 3, "gen", function(){
  var price=pick([60,80,100,120,140,160,180,200,240,280,320]);
  var off=pick([10,20,25,30,40,50]);
  var sale=price*(100-off)/100;
  var total=Math.round(sale*1.15*100)/100;
  return numq("Un vélo coûte "+price+" $. Il est en solde avec "+off+" % de rabais, et la TVH de 15 % est ajoutée au prix de solde. Quel est le coût final ? Donne ta réponse en dollars.",
    total, 0.01,
    "\\[ \\begin{aligned} \\text{prix de solde} &= "+price+" \\times "+fmtD((100-off)/100)+" = "+fmtDF(sale,2)+" \\\\ \\text{coût final} &= "+fmtDF(sale,2)+" \\times 1,15 = "+fmtDF(total,2)+" \\end{aligned} \\] La taxe est arrondie au cent le plus près parce que l'argent se paie en cents. La réponse est <b>"+fmtDF(total,2)+" $</b>.",
    {price:price, off:off});
}, ["Retire d'abord le rabais, puis ajoute la taxe au prix de solde.", "Commence par trouver le prix de solde après le pourcentage de rabais."]);

E("u3-cr-order-ops", 3, ["6.10"], 3, "gen", function(){
  var a=ri(15,45)/10, b=ri(12,38)/10, c=ri(2,6), e=ri(11,29)/10;
  var ans=Math.round((a*(b+c)-e)*100)/100;
  return numq("Calcule : "+fmtD(a,1)+" x ("+fmtD(b,1)+" + "+c+") - "+fmtD(e,1)+".",
    ans, 0.01,
    "\\[ \\begin{aligned} "+fmtD(a,1)+" \\times ("+fmtD(b,1)+" + "+c+") - "+fmtD(e,1)+" &= "+fmtD(a,1)+" \\times "+fmtD(b+c,1)+" - "+fmtD(e,1)+" \\\\ &= "+fmtD(a*(b+c),2)+" - "+fmtD(e,1)+" \\\\ &= "+fmtD(ans,2)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans,2)+"</b>.",
    {a:a, b:b, c:c, e:e});
}, ["Les parenthèses d'abord, puis la multiplication, puis la soustraction.", "Commence par additionner à l'intérieur des parenthèses."]);

/* ----- bank-u4.js ----- */
// Ajouts de figures : les entrées de géométrie assignent q.figure à partir de leurs propres valeurs
// (cercle, parallélogramme, triangle, figures composées et grille). Les entrées de données et de graphiques restent sans figure.
// Math 7 (French) Unit 4 Circles and Area question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 1729 to 2385).
// CRMARKS: u4-cr-area-mix=3
// CRMARKS: u4-cr-circumference=3
// CRMARKS: u4-cr-graph-quantity=2
// CRMARKS: u4-cr-area-circle=3
// CRMARKS: u4-cr-composite=3
/* TRANSLATOR NOTES
   Chunk: Math 7, Unit 4 (Le cercle et l'aire), entries u4-* (23 entries).
   Translated per RULES.md, GLOSSARY.md and the Grade 7 guide section
   (guide terms win).

   Judgement calls:
   - Guide terms used throughout: cercle, rayon, diamètre,
     circonférence, angles au centre, diagramme circulaire, aire
     (triangle, parallélogramme, cercle), compas (7FE1.2).
   - "Sector" is "secteur"; "semicircle" is "demi-cercle"; "slanted
     side" is "côté oblique"; "legend" is "légende".
   - Circle-graph category names translated (p. ex. Salad = Salade,
     Swimming = Natation, Bike = Vélo). Pizza, Soccer and Hockey are
     kept, as in Canadian French use. No personal names in this chunk.
   - "Splash pad" rendered "aire de jeux d'eau"; "mug" rendered
     "tasse"; "edging rope" rendered "corde de bordure".
   - Pi in display text is 3,14; the JS numeric literal 3.14 in code
     is unchanged. Measured lengths held in code variables (p. ex.
     wrapped in u4-pi-ratio) come from numeric literals in code and
     are left unchanged, per RULES.md.

   FMT-GEOM lines left as fmt(:
   - u4pieFig: the fmt(p1[0],1), fmt(p1[1],1), fmt(p2[0],1) and
     fmt(p2[1],1) calls inside the SVG path data (one line, marked
     with the FMT-GEOM comment at the end of that line).
   Every other display fmt( became fmtD( and every fmtF( became
   fmtDF(. Visible SVG legend text now uses " %".

   Unsure about: nothing blocking.
*/
/* ===== Unit 4 ===== */
/* Math 7 Unit 4: Circles and Area. Helpers prefixed u4. PI is 3.14 throughout. */
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}
function u4circleFig(label, mode){
  var out='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme de cercle">';
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
  var out='<svg viewBox="0 0 330 190" width="330" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme circulaire">';
  var start=0, letters=["A","B","C","D"];
  cats.forEach(function(c,i){
    var sweep=c.pct*3.6, end=start+sweep;
    var p1=u4pt(cx,cy,R,start), p2=u4pt(cx,cy,R,end);
    var large=sweep>180?1:0;
    out+='<path d="M '+cx+' '+cy+' L '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+' Z" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>'; /* FMT-GEOM */
    var mid=u4pt(cx,cy,42,(start+end)/2);
    out+=_txt(mid[0],mid[1],angleLabels?String(c.ang)+"°":letters[i],13,true);
    start=end;
  });
  if(!angleLabels){
    cats.forEach(function(c,i){
      var y=42+i*34;
      out+='<rect x="196" y="'+(y-9)+'" width="12" height="12" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<text x="214" y="'+(y+1)+'" font-size="12.5" fill="'+FIG_INK+'">'+letters[i]+" = "+c.name+" "+c.pct+" %</text>";
    });
  }
  return out+'</svg>';
}
function u4graphData(){
  var topics=[
    {t:"repas du midi préféré", cats:["Pizza","Salade","Soupe","Sandwich"]},
    {t:"sport préféré", cats:["Soccer","Hockey","Danse","Natation"]},
    {t:"moyen de transport pour aller à l'école", cats:["Autobus","Marche","Voiture","Vélo"]},
    {t:"activité de fin de semaine", cats:["Jeux vidéo","Lecture","Sports","Musique"]}
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
      dsR.push({t:String(candR[i]), fb:"Le diamètre est exactement le double du rayon : multiplie "+r+" par 2."});
    }
    var q=mcq("Le cercle du diagramme a un rayon de "+r+" cm. Quel est son diamètre, en centimètres ?",
      {t:String(d), fb:"Oui : le diamètre est le double du rayon."},
      dsR,
      "Le diamètre passe par le centre et il est formé de deux rayons : \\(d = 2 \\times "+r+" = "+d+"\\) cm. La réponse est <b>"+d+" cm</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d2=2*ri(3,40), r2=d2/2;
  var candD=[d2,d2-2,2*d2,r2+3,d2+4,r2-1], seenD={}; seenD[r2]=1; var dsD=[];
  for(var j=0;j<candD.length&&dsD.length<3;j++){
    if(candD[j]<=0||seenD[candD[j]])continue; seenD[candD[j]]=1;
    dsD.push({t:String(candD[j]), fb:"Le rayon est exactement la moitié du diamètre : divise "+d2+" par 2."});
  }
  var q2=mcq("Le cercle du diagramme a un diamètre de "+d2+" cm. Quel est son rayon, en centimètres ?",
    {t:String(r2), fb:"Oui : le rayon est la moitié du diamètre."},
    dsD,
    "Le rayon est la moitié du diamètre : \\(r = "+d2+" \\div 2 = "+r2+"\\) cm. La réponse est <b>"+r2+" cm</b>.",
    {mode:"d", d:d2});
  q2.figure=u4circleFig("d = "+d2+" cm","d");
  return q2;
}, ["Le diamètre est formé de deux rayons placés bout à bout.", "Commence par imaginer le rayon, du centre jusqu'au bord, puis double-le ou divise-le par deux."]);

E("u4-draw-circle", 4, ["9.12"], 1, "var", varset([
  function(){ var q=mcq("Pour tracer un cercle de rayon 6 cm avec un compas, à quelle distance, en centimètres, la pointe et le crayon doivent-ils être quand le compas est ouvert ?",
    {t:"6", fb:"Oui : l'ouverture du compas est le rayon."},
    [{t:"12", fb:"12 cm est le diamètre : l'ouverture du compas correspond au rayon, pas au diamètre."},
     {t:"3", fb:"C'est la moitié du rayon : règle l'ouverture égale au rayon."},
     {t:"36", fb:"Cela multiplie 6 par 6 : l'ouverture est simplement la longueur du rayon."}],
    "Un compas trace un cercle dont le rayon est égal à l'ouverture entre la pointe et le crayon. Pour un rayon de 6 cm, ouvre-le à <b>6 cm</b>.", {s:1}); q.figure=u4circleFig("r = 6 cm","r"); return q; },
  function(){ var q=mcq("Pour tracer un cercle de diamètre 10 cm avec un compas, à quelle distance, en centimètres, la pointe et le crayon doivent-ils être quand le compas est ouvert ?",
    {t:"5", fb:"Oui : l'ouverture est le rayon, qui est la moitié de 10 cm."},
    [{t:"10", fb:"C'est le diamètre : l'ouverture doit être le rayon, la moitié de cela."},
     {t:"20", fb:"Cela double le diamètre : divise-le par deux pour obtenir le rayon."},
     {t:"2", fb:"Cela divise par 5 : le rayon est la moitié du diamètre, 5 cm."}],
    "L'ouverture du compas est le rayon. Rayon = 10 / 2 = 5 cm, donc ouvre-le à <b>5 cm</b>.", {s:2}); q.figure=u4circleFig("d = 10 cm","d"); return q; },
  function(){ return mcq("Quelle méthode peut tracer un cercle quand aucun compas n'est disponible ?",
    {t:"Tracer le contour d'une tasse ronde et marquer son centre", fb:"Oui : un objet rond donne une vraie forme de cercle à tracer."},
    [{t:"Tracer la courbe à main levée et la mesurer ensuite", fb:"Une courbe à main levée n'est pas un cercle fiable et le rayon n'est pas contrôlé."},
     {t:"Utiliser une règle pour tracer quatre côtés droits", fb:"Des côtés droits forment un quadrilatère, pas un cercle."},
     {t:"Rouler une pièce de monnaie une fois le long d'une règle", fb:"Rouler trace un trajet droit, pas un cercle."}],
    "Tracer le contour d'un objet rond donne une courbe fermée à une distance fixe de son centre, ce qui est un cercle. La réponse est <b>tracer le contour d'une tasse ronde</b>.", {s:3}); },
  function(){ var q=mcq("Un élève trace un cercle avec un compas ouvert à 4 cm. Quel est le diamètre du cercle tracé, en centimètres ?",
    {t:"8", fb:"Oui : l'ouverture est le rayon, 4 cm, donc le diamètre est le double."},
    [{t:"4", fb:"C'est le rayon (l'ouverture du compas) : double-le pour le diamètre."},
     {t:"2", fb:"Cela divise le rayon par deux : le diamètre est le double du rayon."},
     {t:"16", fb:"Cela met le rayon au carré : le diamètre est deux rayons, 8 cm."}],
    "L'ouverture du compas est le rayon, 4 cm. Diamètre = 2 × 4 = <b>8 cm</b>.", {s:4}); q.figure=u4circleFig("r = 4 cm","r"); return q; },
  function(){ var q=mcq("Pour tracer un cercle de diamètre 14 cm avec un compas, à quelle distance, en centimètres, la pointe et le crayon doivent-ils être quand le compas est ouvert ?",
    {t:"7", fb:"Oui : l'ouverture est le rayon, la moitié de 14 cm."},
    [{t:"14,0", fb:"C'est le diamètre : l'ouverture doit être le rayon, la moitié de cela."},
     {t:"28", fb:"Cela double le diamètre : divise-le par deux pour obtenir le rayon."},
     {t:"3,5", fb:"C'est le quart du diamètre : le rayon est la moitié, 7 cm."}],
    "L'ouverture du compas est le rayon. Rayon = 14 / 2 = 7 cm, donc ouvre-le à <b>7 cm</b>.", {s:5}); q.figure=u4circleFig("d = 14 cm","d"); return q; }
]), ["L'ouverture du compas est toujours le rayon du cercle qu'il trace.", "Commence par trouver le rayon du cercle que tu veux tracer."]);

E("u4-circ-approx", 4, ["9.7"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,45), c=3*d;
    var candA=[2*d,6*d,4*d,d+3], seenA={}; seenA[c]=1; var dsA=[];
    for(var i=0;i<candA.length&&dsA.length<3;i++){
      if(seenA[candA[i]])continue; seenA[candA[i]]=1;
      dsA.push({t:"environ "+candA[i]+" cm", fb:"La circonférence est environ trois fois le diamètre : multiplie "+d+" par 3."});
    }
    var q=mcq("Un cercle a un diamètre de "+d+" cm. La circonférence est environ trois fois le diamètre. Quelle est la longueur approximative de la circonférence ?",
      {t:"environ "+c+" cm", fb:"Oui : 3 × "+d+" = "+c+"."},
      dsA,
      "La circonférence est approximativement \\(3 \\times d = 3 \\times "+d+" = "+c+"\\) cm. La réponse est <b>environ "+c+" cm</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=ri(2,30), c2=6*r;
  var q=mcq("Un cercle a un rayon de "+r+" cm, donc son diamètre est de "+(2*r)+" cm. La circonférence est environ trois fois le diamètre. Quelle est la longueur approximative de la circonférence ?",
    {t:"environ "+c2+" cm", fb:"Oui : 3 × "+(2*r)+" = "+c2+"."},
    [{t:"environ "+(3*r)+" cm", fb:"C'est trois fois le rayon : la règle utilise le diamètre, qui est de "+(2*r)+" cm."},
     {t:"environ "+(2*r)+" cm", fb:"C'est le diamètre lui-même : multiplie-le par environ 3."},
     {t:"environ "+(12*r)+" cm", fb:"C'est douze fois le rayon : trois fois le diamètre est six fois le rayon."}],
    "Diamètre = \\(2 \\times "+r+" = "+(2*r)+"\\) cm, et la circonférence est approximativement \\(3 \\times "+(2*r)+" = "+c2+"\\) cm. La réponse est <b>environ "+c2+" cm</b>.",
    {mode:"r", r:r}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["La circonférence correspond à environ trois fois le diamètre.", "Commence par trouver le diamètre, puis multiplie par environ 3."]);

E("u4-pi-ratio", 4, ["9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,60), C=3.14*d;
    var q=mcq("Un cercle a une circonférence de "+fmtD(C,2)+" cm et un diamètre de "+d+" cm. Quelle est la valeur de la circonférence divisée par le diamètre pour ce cercle ?",
      {t:"3,14", fb:"Oui : pour chaque cercle, C/d est la constante pi, environ 3,14."},
      [{t:"0,32", fb:"C'est environ d/C, la division dans l'autre sens."},
       {t:"31,40", fb:"C'est dix fois trop grand : pi est un peu plus que 3."},
       {t:fmtDF(C-d,2), fb:"Cela soustrait au lieu de diviser : pi est un rapport, C divisé par d."}],
      "\\[ \\begin{aligned} \\pi &= "+FR("C","d")+" = "+fmtD(C,2)+" \\div "+d+" \\\\ &= 3,14 \\end{aligned} \\] La réponse est <b>3,14</b>.",
      {mode:"ratio", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var pair=pick([[5,15.6],[5,15.8],[10,31.2],[10,31.6],[20,62.5],[20,63.1],[25,78.2],[25,78.8],[40,125.2],[40,125.9],[50,156.6],[50,157.4]]);
  var dd=pair[0], wrapped=pair[1];
  var wrappedD=fmtD(wrapped,1); /* coordinator fix: display form of the measured length, French decimal comma; the numeric literals above stay untouched */
  var est=Math.round(wrapped/dd*100)/100;
  var pool=[est+0.5,est-0.14,est+1,3.9];
  var seen={}; seen[fmtD(est,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtD(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:"Divise la longueur enroulée (la circonférence) par le diamètre et compare avec 3,14."});
  }
  var q=mcq("De la ficelle enroulée autour d'une boîte de conserve ronde mesure "+wrappedD+" cm. Le diamètre de la boîte est de "+dd+" cm. Quelle valeur estime le mieux pi à partir de cette mesure ?",
    {t:fmtD(est,2), fb:"Oui : "+wrappedD+" / "+dd+" est environ "+fmtD(est,2)+", près de 3,14."},
    ds,
    "\\[ \\begin{aligned} \\pi &\\approx "+wrappedD+" \\div "+dd+" \\\\ &\\approx "+fmtD(est,2)+" \\end{aligned} \\] L'erreur de mesure explique le petit écart par rapport à 3,14. La réponse est <b>"+fmtD(est,2)+"</b>.",
    {mode:"measure", dd:dd}); q.figure=u4circleFig("d = "+dd+" cm","d"); return q;
}, ["Pi est le rapport de la circonférence au diamètre, le même pour chaque cercle.", "Commence par diviser la circonférence par le diamètre."]);

E("u4-circumference", 4, ["9.10","9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,40), C=3.14*d;
    var pool=[3.14*(d/2),3*d,3.14*(d/2)*(d/2),C+3.14];
    var seen={}; seen[fmtDF(C,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtDF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===2?"Cela utilise la formule de l'aire avec le rayon : la circonférence est pi fois le diamètre.":"Vérifie la formule : C = pi × d avec pi = 3,14."});
    }
    var q=mcq("Quelle est la circonférence du cercle dans le diagramme, en centimètres ? Utilise 3,14 pour pi.",
      {t:fmtDF(C,2), fb:"Oui : C = 3,14 × "+d+" = "+fmtDF(C,2)+" cm."},
      ds,
      "\\[ \\begin{aligned} C &= \\pi d \\\\ &= 3,14 \\times "+d+" \\\\ &= "+fmtDF(C,2)+" \\text{ cm} \\end{aligned} \\] La réponse est <b>"+fmtDF(C,2)+" cm</b>.",
      {mode:"d", d:d});
    q.figure=u4circleFig("d = "+d+" cm","d");
    return q;
  }
  var r=ri(2,25), C2=2*3.14*r;
  var pool2=[3.14*r,3.14*r*r,3*r*2,2*3.14*(r+1)];
  var seen2={}; seen2[fmtDF(C2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtDF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"Cela utilise la formule de l'aire : la circonférence est 2 × pi × r.":"Vérifie la formule : C = 2 × pi × r avec pi = 3,14."});
  }
  var q2=mcq("Quelle est la circonférence du cercle dans le diagramme, en centimètres ? Utilise 3,14 pour pi.",
    {t:fmtDF(C2,2), fb:"Oui : C = 2 × 3,14 × "+r+" = "+fmtDF(C2,2)+" cm."},
    ds2,
    "\\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2 \\times 3,14 \\times "+r+" \\\\ &= "+fmtDF(C2,2)+" \\text{ cm} \\end{aligned} \\] La réponse est <b>"+fmtDF(C2,2)+" cm</b>.",
    {mode:"r", r:r});
  q2.figure=u4circleFig("r = "+r+" cm","r");
  return q2;
}, ["La circonférence est pi fois le diamètre, ou deux fois pi fois le rayon.", "Commence par décider si le diagramme te donne le rayon ou le diamètre."]);

E("u4-para-from-rect", 4, ["9.1"], 1, "var", varset([
  function(){ var q=mcq("On coupe un parallélogramme le long d'une ligne de hauteur pointillée et on déplace le morceau triangulaire à l'autre bout, ce qui forme un rectangle de même base et de même hauteur. L'aire du parallélogramme est égale à l'aire de ce rectangle, que l'on trouve par :",
    {t:"base × hauteur", fb:"Oui : le rectangle réorganisé a pour aire base × hauteur, et déplacer un morceau ne change pas l'aire."},
    [{t:"base × côté oblique", fb:"Le côté oblique n'est pas un côté du rectangle réorganisé : ses côtés sont la base et la hauteur."},
     {t:"(base × hauteur) / 2", fb:"Diviser par deux est pour un triangle : le parallélogramme entier devient le rectangle entier."},
     {t:"base + hauteur", fb:"Additionner donne une longueur, pas une aire : l'aire d'un rectangle multiplie la longueur par la largeur."}],
    "Couper et déplacer un morceau garde la même aire totale, et la nouvelle forme est un rectangle dont les côtés sont égaux à la base et à la hauteur. Son aire est <b>base × hauteur</b>.", {s:1}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("Un parallélogramme de base 8 cm et de hauteur 5 cm est réorganisé en rectangle. Quelle est l'aire du parallélogramme ?",
    {t:"40 cm²", fb:"Oui : le rectangle mesure 8 cm sur 5 cm, donc l'aire est 40 cm²."},
    [{t:"26 cm²", fb:"C'est le périmètre du rectangle : l'aire multiplie la longueur par la largeur."},
     {t:"20 cm²", fb:"Cela divise le produit par deux : le parallélogramme entier garde l'aire entière du rectangle."},
     {t:"13 cm²", fb:"Cela additionne la base et la hauteur : l'aire les multiplie."}],
    "Le rectangle réorganisé mesure 8 cm sur 5 cm : \\(A = 8 \\times 5 = 40\\) cm². La réponse est <b>40 cm²</b>.", {s:2}); q.figure=figParaRect("base = 8 cm","h = 5 cm"); return q; },
  function(){ var q=mcq("Pourquoi couper un parallélogramme et réorganiser les morceaux en rectangle ne change-t-il pas l'aire ?",
    {t:"Aucune aire n'est ajoutée ni enlevée ; les mêmes morceaux forment la nouvelle forme", fb:"Oui : réorganiser les morceaux garde la même aire totale."},
    [{t:"Un rectangle a toujours la même aire que n'importe quel parallélogramme", fb:"Seul le rectangle construit avec les mêmes morceaux, avec la même base et la même hauteur, correspond."},
     {t:"La coupe rend la forme plus petite, mais le déplacement la rend plus grande", fb:"Rien n'est gagné ni perdu : les morceaux sont identiques au total."},
     {t:"Le périmètre reste le même quand les morceaux bougent, donc l'aire aussi reste la même", fb:"Le périmètre peut changer quand les morceaux bougent : ce sont les morceaux eux-mêmes qui conservent l'aire."}],
    "La nouvelle forme est construite avec exactement les mêmes morceaux, donc son aire est égale à l'aire du parallélogramme. La réponse est <b>aucune aire n'est ajoutée ni enlevée</b>.", {s:3}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("Un parallélogramme de base 11 cm et de hauteur 6 cm est réorganisé en rectangle. Quelles sont les longueurs des côtés de ce rectangle ?",
    {t:"11 cm et 6 cm", fb:"Oui : le rectangle prend la base et la hauteur du parallélogramme comme côtés."},
    [{t:"11 cm et 11 cm", fb:"Ce serait un carré : le deuxième côté est la hauteur, 6 cm."},
     {t:"6 cm et 6 cm", fb:"Les deux côtés ne sont pas la hauteur : un côté est la base, 11 cm."},
     {t:"17 cm et 6 cm", fb:"17 cm additionne la base et la hauteur : les côtés du rectangle sont la base et la hauteur elles-mêmes."}],
    "Le rectangle réorganisé a la base du parallélogramme comme un côté et sa hauteur comme l'autre : <b>11 cm et 6 cm</b>.", {s:4}); q.figure=figParaRect("base = 11 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("Un parallélogramme de base 9 cm et de hauteur 4 cm est coupé et réorganisé en rectangle. Quelle est l'aire du parallélogramme ?",
    {t:"36 cm²", fb:"Oui : le rectangle mesure 9 cm sur 4 cm, donc l'aire est 36 cm²."},
    [{t:"26 cm²", fb:"C'est le périmètre du rectangle : l'aire multiplie la longueur par la largeur."},
     {t:"18 cm²", fb:"Cela divise le produit par deux : le parallélogramme entier garde l'aire entière du rectangle."},
     {t:"13 cm²", fb:"Cela additionne la base et la hauteur : l'aire les multiplie."}],
    "Le rectangle réorganisé mesure 9 cm sur 4 cm : \\(A = 9 \\times 4 = 36\\) cm². La réponse est <b>36 cm²</b>.", {s:5}); q.figure=figParaRect("base = 9 cm","h = 4 cm"); return q; }
]), ["Imagine le parallélogramme coupé et glissé pour former un rectangle.", "Commence par te demander quels sont les côtés du rectangle réorganisé."]);

E("u4-area-parallelogram", 4, ["9.2","9.3"], 2, "gen", function(){
  var b=ri(6,15), h=ri(4,10), s=h+ri(1,4);
  var A=b*h;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallélogramme avec la base, la hauteur et le côté oblique étiquetés">'
    +'<polygon points="55,140 215,140 245,60 85,60" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="110" y1="60" x2="110" y2="140" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(135,158,"base = "+b+" cm",12.5,false)
    +_txt(96,102,"h = "+h+" cm",12,false)
    +_txt(238,88,""+s+" cm",12,false)
    +'</svg>';
  var pool=[b*s,A/2,b+h,b*s/2];
  var seen={}; seen[fmtD(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtD(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"Cela multiplie par le côté oblique : l'aire utilise la hauteur perpendiculaire.":"Vérifie la formule : l'aire d'un parallélogramme est la base fois la hauteur."});
  }
  var q=mcq("Quelle est l'aire du parallélogramme dans le diagramme ?",
    {t:fmtD(A)+" cm²", fb:"Oui : A = base × hauteur = "+b+" × "+h+" = "+A+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= b \\times h \\\\ &= "+b+" \\times "+h+" \\\\ &= "+A+" \\text{ cm}^2 \\end{aligned} \\] La longueur du côté oblique n'est pas utilisée. La réponse est <b>"+A+" cm²</b>.",
    {b:b, h:h, s:s});
  q.figure=fig;
  return q;
}, ["L'aire d'un parallélogramme est la base fois la hauteur perpendiculaire.", "Commence par trouver la hauteur : la ligne pointillée à angle droit avec la base."]);

E("u4-triangle-from", 4, ["9.4"], 1, "var", varset([
  function(){ var q=mcq("On assemble deux triangles identiques pour former un parallélogramme de base 10 cm et de hauteur 6 cm. Le parallélogramme a une aire de 60 cm². Quelle est l'aire d'un triangle ?",
    {t:"30 cm²", fb:"Oui : chaque triangle est la moitié du parallélogramme."},
    [{t:"60 cm²", fb:"C'est le parallélogramme entier : un triangle en est la moitié."},
     {t:"120 cm²", fb:"Cela double le parallélogramme : le triangle est plus petit que le tout."},
     {t:"16 cm²", fb:"Cela additionne la base et la hauteur : utilise la moitié de l'aire du parallélogramme."}],
    "Les deux triangles identiques forment le parallélogramme entier, donc un triangle a une aire de 60 / 2 = <b>30 cm²</b>.", {s:1}); q.figure=figTriHalf("para","base = 10 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("On coupe un rectangle le long d'une diagonale en deux triangles identiques. Le rectangle mesure 12 cm de long et 7 cm de large. Quelle est l'aire d'un triangle ?",
    {t:"42 cm²", fb:"Oui : l'aire du rectangle est 84 cm², et chaque triangle en est la moitié."},
    [{t:"84 cm²", fb:"C'est le rectangle entier : un triangle en est la moitié."},
     {t:"38 cm²", fb:"C'est le périmètre du rectangle : trouve d'abord son aire, puis divise-la par deux."},
     {t:"19 cm²", fb:"Cela additionne la longueur et la largeur : l'aire les multiplie, puis on divise par deux."}],
    "\\[ \\begin{aligned} \\text{aire du rectangle} &= 12 \\times 7 = 84 \\text{ cm}^2 \\\\ \\text{aire du triangle} &= 84 \\div 2 = 42 \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>42 cm²</b>.", {s:2}); q.figure=figTriHalf("rect","12 cm","7 cm"); return q; },
  function(){ var q=mcq("Un triangle et un parallélogramme ont la même base et la même hauteur. Le parallélogramme a une aire de 48 cm². Quelle est l'aire du triangle ?",
    {t:"24 cm²", fb:"Oui : avec la même base et la même hauteur, le triangle est la moitié du parallélogramme."},
    [{t:"48 cm²", fb:"Cela correspond au parallélogramme : le triangle n'en prend que la moitié."},
     {t:"96 cm²", fb:"Cela double le parallélogramme : le triangle est plus petit."},
     {t:"12 cm²", fb:"C'est le quart : deux triangles identiques remplissent le parallélogramme, donc c'est la moitié."}],
    "Deux copies du triangle remplissent exactement le parallélogramme, donc l'aire du triangle est 48 / 2 = <b>24 cm²</b>.", {s:3}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("Pourquoi l'aire d'un triangle est-elle la moitié de l'aire d'un parallélogramme de même base et de même hauteur ?",
    {t:"Deux copies identiques du triangle s'assemblent pour former ce parallélogramme", fb:"Oui : le triangle est exactement l'un des deux morceaux égaux."},
    [{t:"Les triangles ont toujours la moitié de l'aire de chaque parallélogramme", fb:"La correspondance demande la même base et la même hauteur, pas n'importe quel parallélogramme."},
     {t:"Le triangle a trois côtés et le parallélogramme en a quatre", fb:"Le nombre de côtés n'est pas la raison : ce sont les deux copies qui remplissent le parallélogramme."},
     {t:"La hauteur d'un triangle est la moitié de la hauteur d'un parallélogramme construit sur la même base", fb:"Ils ont ici la même hauteur : c'est l'aire qui est divisée par deux."}],
    "En assemblant deux triangles identiques, on construit le parallélogramme, donc un triangle est la moitié de son aire. La réponse est <b>deux copies du triangle forment le parallélogramme</b>.", {s:4}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("Un parallélogramme de base 14 cm et de hauteur 5 cm est divisé en deux triangles identiques par une diagonale. Quelle est l'aire d'un triangle ?",
    {t:"35 cm²", fb:"Oui : l'aire du parallélogramme est 70 cm², et chaque triangle en est la moitié."},
    [{t:"70 cm²", fb:"C'est le parallélogramme entier : un triangle en est la moitié."},
     {t:"38 cm²", fb:"C'est le périmètre du parallélogramme : trouve d'abord son aire, puis divise-la par deux."},
     {t:"19 cm²", fb:"Cela additionne la base et la hauteur : l'aire les multiplie, puis on divise par deux."}],
    "\\[ \\begin{aligned} \\text{aire du parallélogramme} &= 14 \\times 5 = 70 \\text{ cm}^2 \\\\ \\text{aire du triangle} &= 70 \\div 2 = 35 \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>35 cm²</b>.", {s:5}); q.figure=figTriHalf("para","base = 14 cm","h = 5 cm"); return q; }
]), ["Pense au triangle comme l'un des deux morceaux identiques d'un parallélogramme ou d'un rectangle.", "Commence par trouver l'aire du parallélogramme ou du rectangle entier, puis divise-la par deux."]);

E("u4-area-triangle", 4, ["9.5","9.3"], 1, "gen", function(){
  var b=ri(6,16), h=ri(4,12), A=b*h/2;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle avec la base et la hauteur étiquetées">'
    +'<polygon points="55,145 245,145 120,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="120" y1="50" x2="120" y2="145" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(150,163,"base = "+b+" cm",12.5,false)
    +_txt(104,100,"h = "+h+" cm",12,false)
    +'</svg>';
  var pool=[b*h,b+h,A+b,A*3];
  var seen={}; seen[fmtD(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtD(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"C'est l'aire du parallélogramme entier : un triangle en est la moitié.":"Vérifie la formule : l'aire d'un triangle est la base fois la hauteur, divisée par 2."});
  }
  var q=mcq("Quelle est l'aire du triangle dans le diagramme ?",
    {t:fmtD(A)+" cm²", fb:"Oui : A = (base × hauteur) / 2 = ("+b+" × "+h+") / 2 = "+fmtD(A)+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= "+FR("b \\times h","2")+" \\\\ &= "+FR(b+" \\times "+h,"2")+" \\\\ &= "+fmtD(A)+" \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>"+fmtD(A)+" cm²</b>.",
    {b:b, h:h});
  q.figure=fig;
  return q;
}, ["L'aire d'un triangle est la base fois la hauteur, divisée par 2.", "Commence par multiplier la base par la hauteur, puis divise le résultat par deux."]);

E("u4-estimate-circle-area", 4, ["9.6"], 1, "gen", function(){
  var F=ri(28,58), P=2*ri(4,13), est=F+P/2;
  var pool=[F+P,F,F-P/2,est+10];
  var seen={}; seen[String(est)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=String(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"environ "+k+" cm²", fb:i===0?"Cela compte chaque carré partiellement couvert comme un carré entier : compte chaque carré partiellement couvert comme environ une moitié.":"Utilise la règle de comptage : les carrés entiers plus la moitié des carrés partiellement couverts."});
  }
  return mcq("Un cercle est tracé sur du papier quadrillé en centimètres. Pour estimer son aire en comptant les carrés : "+F+" carrés sont entièrement à l'intérieur du cercle et "+P+" carrés sont partiellement couverts. En comptant chaque carré partiellement couvert comme environ un demi-carré, quelle est l'aire estimée ?",
    {t:"environ "+est+" cm²", fb:"Oui : "+F+" + "+P+"/2 = "+est+"."},
    ds,
    "\\[ \\begin{aligned} \\text{estimation} &= "+F+" + "+FR(P,"2")+" \\\\ &= "+F+" + "+(P/2)+" \\\\ &= "+est+" \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>environ "+est+" cm²</b>.",
    {F:F, P:P});
}, ["Compte les carrés entiers, puis ajoute environ la moitié pour chaque carré partiellement couvert.", "Commence par ajouter la moitié du nombre de carrés partiellement couverts au nombre de carrés entiers."]);

E("u4-area-circle", 4, ["9.9","9.3"], 2, "gen", function(){
  var modeA=ri(0,2);
  if(modeA===2){
    var rs=ri(2,20), As=3.14*rs*rs/2;
    var poolS=[3.14*rs*rs,2*3.14*rs,3.14*rs,As*4,As/2,As*3];
    var seenS={}; seenS[fmtDF(As,2)]=1; var dsS=[];
    for(var s2=0;s2<poolS.length&&dsS.length<3;s2++){
      var kk=fmtDF(poolS[s2],2);
      if(seenS[kk])continue; seenS[kk]=1;
      dsS.push({t:kk+" cm²", fb:s2===0?"C'est l'aire du cercle entier : un demi-cercle en est la moitié.":"Vérifie les étapes : trouve l'aire du cercle entier avec pi × r², puis divise-la par deux."});
    }
    var qS=mcq("Le diagramme montre un demi-cercle (la moitié d'un cercle) de rayon "+rs+" cm. Quelle est son aire ? Utilise 3,14 pour pi.",
      {t:fmtDF(As,2)+" cm²", fb:"Oui : la moitié de 3,14 × "+rs+"² est "+fmtDF(As,2)+" cm²."},
      dsS,
      "\\[ \\begin{aligned} A &= "+FR("3,14 \\times "+rs+"^2","2")+" \\\\ &= "+fmtDF(As,2)+" \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(As,2)+" cm²</b>.",
      {mode:"semi", r:rs});
    qS.figure=u4circleFig("r = "+rs+" cm","r");
    return qS;
  }
  if(modeA===0){
    var r=ri(3,20), A=3.14*r*r;
    var pool=[2*3.14*r,3.14*r,3.14*2*r*r,A+3.14*r];
    var seen={}; seen[fmtDF(A,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtDF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k+" cm²", fb:i===0?"C'est la circonférence : l'aire utilise pi fois le rayon au carré.":"Vérifie la formule : A = pi × r² avec pi = 3,14."});
    }
    var q=mcq("Quelle est l'aire du cercle dans le diagramme ? Utilise 3,14 pour pi.",
      {t:fmtDF(A,2)+" cm²", fb:"Oui : A = 3,14 × "+r+"² = "+fmtDF(A,2)+" cm²."},
      ds,
      "\\[ \\begin{aligned} A &= \\pi r^2 \\\\ &= 3,14 \\times "+r+"^2 \\\\ &= "+fmtDF(A,2)+" \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(A,2)+" cm²</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d=2*ri(3,20), r2=d/2, A2=3.14*r2*r2;
  var pool2=[2*3.14*r2,3.14*d*d,A2*2,3.14*r2];
  var seen2={}; seen2[fmtDF(A2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtDF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2+" cm²", fb:j===1?"Cela met le diamètre au carré : divise d'abord le diamètre par deux pour obtenir le rayon.":"Vérifie les étapes : divise le diamètre par deux pour le rayon, puis A = pi × r²."});
  }
  var q2=mcq("Quelle est l'aire du cercle dans le diagramme ? Utilise 3,14 pour pi.",
    {t:fmtDF(A2,2)+" cm²", fb:"Oui : le rayon est "+r2+" cm, et A = 3,14 × "+r2+"² = "+fmtDF(A2,2)+" cm²."},
    ds2,
    "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r2+" \\\\ A &= \\pi r^2 = 3,14 \\times "+r2+"^2 \\\\ &= "+fmtDF(A2,2)+" \\text{ cm}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(A2,2)+" cm²</b>.",
    {mode:"d", d:d});
  q2.figure=u4circleFig("d = "+d+" cm","d");
  return q2;
}, ["L'aire d'un cercle est pi fois le rayon au carré.", "Commence par t'assurer que tu as le rayon ; divise le diamètre par deux si c'est lui qui est donné."]);

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
    ds.push({t:k, fb:i===0?"C'est la somme des trois angles marqués : l'angle manquant est ce qui reste de 360°.":"Les quatre angles au centre d'un cercle s'additionnent pour donner 360° : soustrais les trois angles marqués de 360°."});
  }
  var q=mcq("Le cercle du diagramme est divisé en quatre secteurs. Trois angles au centre sont marqués, et un secteur est marqué d'un ?. Quel est l'angle au centre manquant ?",
    {t:m+"°", fb:"Oui : 360° moins les trois angles marqués laisse "+m+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{manquant} &= 360° - ("+a+"° + "+b+"° + "+c+"°) \\\\ &= 360° - "+(a+b+c)+"° \\\\ &= "+m+"° \\end{aligned} \\] Les angles au centre d'un cercle s'additionnent toujours pour donner 360°. La réponse est <b>"+m+"°</b>.",
    {a:a, b:b, c:c});
  q.figure=u4pieFig(figCats,true);
  return q;
}, ["Les angles au centre autour du centre d'un cercle s'additionnent pour donner 360 degrés.", "Commence par additionner les trois angles marqués, puis soustrais le total de 360."]);

E("u4-circle-context", 4, ["9.10"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(40,80), n=ri(8,25), dist=3.14*d*n/100;
    var pool=[dist/10,dist/2,dist+n,dist*2];
    var seen={}; seen[fmtDF(dist,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtDF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===1?"Cela utilise le rayon dans la circonférence : C = pi × d, puis multiplie par le nombre de tours et convertis en mètres.":"Trouve d'abord une circonférence (pi × d), multiplie par les tours, et change les centimètres en mètres."});
    }
    var q=mcq("Une roue de vélo a un diamètre de "+d+" cm. La roue tourne "+n+" fois pendant une sortie. En utilisant 3,14 pour pi, quelle distance le vélo parcourt-il, en mètres ?",
      {t:fmtDF(dist,2), fb:"Oui : un tour couvre une circonférence, et le total se convertit en "+fmtDF(dist,2)+" m."},
      ds,
      "\\[ \\begin{aligned} C &= 3,14 \\times "+d+" = "+fmtDF(3.14*d,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmtDF(3.14*d,2)+" \\times "+n+" = "+fmtDF(3.14*d*n,2)+" \\text{ cm} \\\\ &= "+fmtDF(dist,2)+" \\text{ m} \\end{aligned} \\] La réponse est <b>"+fmtDF(dist,2)+" m</b>.",
      {mode:"wheel", d:d, n:n}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=pick([3,5,6,7,8,9]), rope=2*2*3.14*r;
  var pool2=[2*3.14*r,3.14*r*r,rope+6.28,rope*1.5];
  var seen2={}; seen2[fmtDF(rope,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtDF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"C'est l'aire du jardin : la bordure suit la circonférence, et elle fait le tour deux fois.":"La bordure suit la circonférence : trouve C = 2 × pi × r, puis double-la pour deux tours."});
  }
  var q=mcq("Un jardin circulaire a un rayon de "+r+" m. Une corde de bordure fait deux fois le tour du jardin. En utilisant 3,14 pour pi, quelle longueur de corde faut-il, en mètres ?",
    {t:fmtDF(rope,2), fb:"Oui : un tour mesure "+fmtDF(2*3.14*r,2)+" m, et deux tours doublent cette longueur."},
    ds2,
    "\\[ \\begin{aligned} C &= 2 \\times 3,14 \\times "+r+" = "+fmtDF(2*3.14*r,2)+" \\text{ m} \\\\ \\text{corde} &= 2 \\times "+fmtDF(2*3.14*r,2)+" = "+fmtDF(rope,2)+" \\text{ m} \\end{aligned} \\] La réponse est <b>"+fmtDF(rope,2)+" m</b>.",
    {mode:"rope", r:r}); q.figure=u4circleFig("r = "+r+" m","r"); return q;
}, ["Chaque tour complet d'un cercle couvre une circonférence.", "Commence par trouver la circonférence du cercle dans le problème."]);

E("u4-graph-attributes", 4, ["11.2"], 1, "gen", function(){
  if(ri(0,1)===0){
    var a=ri(25,50), b=ri(15,35), c=100-a-b-ri(8,20), miss=100-a-b-c;
    if(c<5){c=10; miss=100-a-b-c;}
    var candP=[miss+10,100-a,Math.round((a+b+c)/3),miss-10,100-b], seenP={}; seenP[miss]=1; var dsP=[];
    for(var i=0;i<candP.length&&dsP.length<3;i++){
      if(candP[i]<=0||seenP[candP[i]])continue; seenP[candP[i]]=1;
      dsP.push({t:candP[i]+" %", fb:"Additionne les trois pourcentages étiquetés et soustrais le total de 100 : le pourcentage manquant est ce qui reste."});
    }
    return mcq("Un diagramme circulaire montre trois secteurs étiquetés "+a+" %, "+b+" % et "+c+" %, et un quatrième secteur sans étiquette. Quel pourcentage appartient au quatrième secteur ?",
      {t:miss+" %", fb:"Oui : les pourcentages d'un diagramme circulaire s'additionnent pour donner 100 %."},
      dsP,
      "\\[ \\begin{aligned} \\text{manquant} &= 100 - ("+a+" + "+b+" + "+c+") \\\\ &= "+miss+" \\end{aligned} \\] Les pourcentages d'un diagramme circulaire s'additionnent toujours pour donner 100 %. La réponse est <b>"+miss+" %</b>.",
      {mode:"pct"});
  }
  var x=ri(9,16)*10, y=ri(7,12)*10, miss2=360-x-y-ri(6,10)*10;
  if(miss2<30){miss2=60;}
  var z=360-x-y-miss2;
  var candG=[x+y+z,miss2+20,100,miss2-20,90], seenG={}; seenG[miss2]=1; var dsG=[];
  for(var j=0;j<candG.length&&dsG.length<3;j++){
    if(candG[j]<=0||seenG[candG[j]])continue; seenG[candG[j]]=1;
    dsG.push({t:candG[j]+"°", fb:"Additionne les trois angles donnés et soustrais le total de 360 : l'angle manquant est ce qui reste."});
  }
  return mcq("Un diagramme circulaire a des secteurs dont les angles au centre sont "+x+"°, "+y+"° et "+z+"°, et un secteur de plus. Quel est l'angle au centre du dernier secteur ?",
    {t:miss2+"°", fb:"Oui : les angles au centre d'un diagramme circulaire s'additionnent pour donner 360°."},
    dsG,
    "\\[ \\begin{aligned} \\text{manquant} &= 360 - ("+x+" + "+y+" + "+z+") \\\\ &= "+miss2+" \\end{aligned} \\] Les angles au centre d'un diagramme circulaire s'additionnent toujours pour donner 360°. La réponse est <b>"+miss2+"°</b>.",
    {mode:"ang"});
}, ["Deux totaux gouvernent chaque diagramme circulaire : les pourcentages s'additionnent pour donner 100 et les angles au centre pour donner 360.", "Commence par additionner les parties que l'on te donne, puis soustrais le total du tout."]);

E("u4-graph-media", 4, ["11.1"], 2, "var", varset([
  function(){ return mcq("Un diagramme circulaire d'un journal et un diagramme circulaire d'un magazine montrent les sports préférés. Pour comparer la popularité du soccer dans chaque enquête, que dois-tu comparer ?",
    {t:"Le pourcentage (ou la taille du secteur) pour le soccer dans chaque diagramme", fb:"Oui : les pourcentages se comparent équitablement même quand les enquêtes ont des tailles différentes."},
    [{t:"Les couleurs utilisées pour le soccer dans chaque diagramme et dans la légende", fb:"Les couleurs sont seulement des étiquettes : elles ne portent aucune information sur la taille."},
     {t:"Le rayon de chaque cercle tel qu'il est imprimé sur la page du journal", fb:"Un cercle imprimé plus grand ne veut pas dire plus de gens : compare les pourcentages."},
     {t:"Les titres des deux diagrammes en haut de chaque page du journal et du magazine", fb:"Les titres disent le sujet, pas les tailles : compare les pourcentages du soccer."}],
    "Les diagrammes circulaires présentent les parties d'un tout en pourcentages, donc la part du soccer se compare par <b>le pourcentage pour le soccer dans chaque diagramme</b>.", {s:1}); },
  function(){ return mcq("Le diagramme A a interrogé 200 élèves et le diagramme B a interrogé 50 élèves. Dans les deux diagrammes, 40 % ont choisi le hockey. Quelle affirmation est vraie ?",
    {t:"Plus d'élèves ont choisi le hockey dans le diagramme A (80) que dans le diagramme B (20)", fb:"Oui : 40 % de 200 est 80, et 40 % de 50 est 20."},
    [{t:"Le même nombre d'élèves a choisi le hockey dans les deux diagrammes", fb:"Les pourcentages correspondent, mais les totaux diffèrent : 40 % de 200 n'est pas 40 % de 50."},
     {t:"Plus d'élèves ont choisi le hockey dans le diagramme B parce que ses secteurs semblent plus grands", fb:"La taille imprimée ne change pas les nombres : calcule 40 % de chaque total."},
     {t:"Le diagramme B doit être faux parce qu'il a interrogé moins d'élèves", fb:"Une enquête plus petite est quand même valide : ses pourcentages décrivent son propre groupe."}],
    "40 % de 200 = 80 élèves et 40 % de 50 = 20 élèves, donc <b>plus d'élèves ont choisi le hockey dans le diagramme A</b>.", {s:2}); },
  function(){ return mcq("Pourquoi les articles de nouvelles utilisent-ils souvent des diagrammes circulaires pour les résultats d'enquête ?",
    {t:"Ils montrent chaque réponse comme une partie de l'enquête entière d'un seul coup d'œil", fb:"Oui : la taille des secteurs montre clairement les parts du total."},
    [{t:"Ils montrent comment les valeurs changent d'heure en heure au fil de la journée entière", fb:"Les changements dans le temps sont le travail d'un diagramme à lignes : les diagrammes circulaires montrent les parties d'un seul tout."},
     {t:"Ils énumèrent chaque réponse individuelle en ordre, l'une après l'autre dans une longue liste", fb:"Les diagrammes circulaires regroupent les réponses en secteurs : ils n'énumèrent pas les individus."},
     {t:"Ils font paraître les petits pourcentages plus grands qu'ils ne sont dans les données", fb:"Un diagramme circulaire honnête garde la taille des secteurs proportionnelle aux pourcentages."}],
    "Un diagramme circulaire transforme chaque réponse en un secteur dont la taille suit sa part du total, donc il <b>montre les parties d'un tout d'un seul coup d'œil</b>.", {s:3}); },
  function(){ return mcq("Un billet de blogue montre un diagramme circulaire sans titre, sans étiquettes et sans pourcentages. Quelle est la meilleure conclusion ?",
    {t:"On ne peut pas interpréter le diagramme de façon fiable ; les étiquettes et les valeurs manquantes sont nécessaires", fb:"Oui : un diagramme circulaire a besoin d'un titre, d'étiquettes ou d'une légende, et de valeurs pour le lire."},
    [{t:"Le plus grand secteur doit être la réponse la plus populaire, donc le diagramme est correct et peut être utilisé tel quel", fb:"Sans étiquettes, tu ne peux pas dire ce qu'un secteur signifie, même le plus grand."},
     {t:"Le diagramme porte sur les sports parce que la plupart des diagrammes circulaires en parlent dans les journaux", fb:"Deviner le sujet n'est pas interpréter : le titre manque."},
     {t:"Chaque secteur doit valoir 25 % parce qu'il y a quatre secteurs dans tout le diagramme tel qu'il est imprimé", fb:"La taille des secteurs suit les données, elle n'est pas divisée également par défaut."}],
    "On lit les diagrammes circulaires grâce à leur titre, leurs étiquettes et leurs pourcentages ; quand tout cela manque, <b>on ne peut pas interpréter le diagramme de façon fiable</b>.", {s:4}); },
  function(){ return mcq("Deux sites Web montrent des diagrammes circulaires de la même enquête de classe. Le site 1 indique les pourcentages sur chaque secteur ; le site 2 indique seulement des couleurs avec une légende. Quel diagramme est plus facile à comparer avec une troisième enquête, et pourquoi ?",
    {t:"Le site 1, parce que ses pourcentages peuvent se comparer directement avec les pourcentages de n'importe quelle autre enquête", fb:"Oui : les pourcentages sont le langage commun des diagrammes circulaires."},
    [{t:"Le site 2, parce que les couleurs sont plus faciles à retenir que les nombres quand on compare des enquêtes entre elles", fb:"Les couleurs nomment seulement les catégories : comparer des enquêtes demande les pourcentages."},
     {t:"Ils sont aussi faciles l'un que l'autre, parce qu'ils montrent les mêmes secteurs et les mêmes données pour chaque catégorie du diagramme", fb:"Lire les quantités du site 2 demande de mesurer les angles : le site 1 les indique."},
     {t:"Aucun des deux, parce que des diagrammes circulaires de sites différents ne peuvent jamais se comparer", fb:"Ils peuvent se comparer : les pourcentages mettent différentes enquêtes à la même échelle."}],
    "Les pourcentages permettent de comparer directement les parts entre enquêtes, donc <b>le site 1 est plus facile à comparer</b>.", {s:5}); }
]), ["On lit les diagrammes circulaires dans les médias grâce à leurs titres, leurs étiquettes et leurs pourcentages.", "Commence par te demander quelles informations chaque diagramme te donne vraiment."]);

E("u4-graph-read", 4, ["11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:c.pct+" %", fb:"C'est le pourcentage pour "+c.name+" : trouve "+cat.name+" dans la légende."};
  });
  var q=mcq("Le diagramme circulaire montre les résultats pour « "+g.topic+" ». Quel pourcentage des élèves ont choisi "+cat.name+" ?",
    {t:cat.pct+" %", fb:"Oui : la légende donne "+cat.name+" à "+cat.pct+" %."},
    ds,
    "Fais correspondre "+cat.name+" dans la légende à son secteur : il est étiqueté "+cat.pct+" %. La réponse est <b>"+cat.pct+" %</b>.",
    {topic:g.topic, idx:idx});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Utilise la légende pour faire correspondre chaque lettre de secteur à sa catégorie et à son pourcentage.", "Commence par trouver la catégorie dans la légende à côté du diagramme."]);

E("u4-graph-quantities", 4, ["11.5","11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var T=pick([100,200,300,400]), qty=cat.pct*T/100;
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:String(c.pct*T/100), fb:"C'est le nombre pour "+c.name+" : utilise le pourcentage pour "+cat.name+"."};
  });
  var q=mcq("Le diagramme circulaire montre les résultats pour « "+g.topic+" », auprès de "+T+" élèves. Combien d'élèves ont choisi "+cat.name+" ?",
    {t:String(qty), fb:"Oui : "+cat.pct+" % de "+T+" est "+qty+"."},
    ds,
    "\\[ \\begin{aligned} \\text{élèves} &= "+FR(cat.pct,"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] La réponse est <b>"+qty+"</b>.",
    {topic:g.topic, idx:idx, T:T});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Transforme le pourcentage du secteur en nombre en le multipliant par le total interrogé.", "Commence par lire le pourcentage de la catégorie dans la légende."]);

E("u4-graph-create", 4, ["11.3","9.13"], 3, "gen", function(){
  var topics=[
    {t:"la saison préférée", cats:["Printemps","Été","Automne","Hiver"]},
    {t:"l'animal de compagnie préféré", cats:["Chien","Chat","Poisson","Oiseau"]},
    {t:"le choix de repas du midi", cats:["Pizza","Pâtes","Salade","Soupe"]}
  ];
  var tp=pick(topics);
  var ps=pick([[40,25,20,15],[50,20,20,10],[30,30,25,15],[45,25,20,10],[35,30,20,15],[60,20,10,10]]);
  var T=pick([20,40,50,60,100]);
  var counts=ps.map(function(p){return p*T/100;});
  if(counts.some(function(x){return x!==Math.round(x);})){T=100; counts=ps.slice();}
  var idx=ri(0,3), ang=ps[idx]*3.6;
  var dataStr=tp.cats.map(function(name,i){return name+": "+counts[i];}).join(", ");
  var pool=[ps[idx],360-ang,ang/2,ang+36];
  var seen={}; seen[fmtD(ang)+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmtD(pool[i])+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"C'est le pourcentage lui-même : un angle est le pourcentage d'un tour complet de 360°.":"L'angle au centre est la part de la catégorie dans 360°."});
  }
  return mcq("On a interrogé une classe de "+T+" élèves au sujet de "+tp.t+" : "+dataStr+". Pour créer un diagramme circulaire, quel angle au centre le secteur pour "+tp.cats[idx]+" doit-il avoir ?",
    {t:fmtD(ang)+"°", fb:"Oui : "+tp.cats[idx]+" représente "+ps[idx]+" % de la classe, et "+ps[idx]+" % de 360° est "+fmtD(ang)+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{part} &= "+FR(counts[idx],T)+" = "+ps[idx]+" \\% \\\\ \\text{angle} &= "+FR(ps[idx],"100")+" \\times 360° \\\\ &= "+fmtD(ang)+"° \\end{aligned} \\] La réponse est <b>"+fmtD(ang)+"°</b>.",
    {topic:tp.t, idx:idx});
}, ["L'angle au centre d'un secteur est sa part du tour complet de 360 degrés.", "Commence par trouver la part de la catégorie dans le total, en pourcentage."]);

E("u4-cr-area-mix", 4, ["9.3"], 2, "gen", function(){
  var b1=ri(6,14), h1=ri(3,9), b2=ri(6,14), h2=pick([4,6,8,10,12]);
  var A1=b1*h1, A2=b2*h2/2, tot=A1+A2;
  var q=numq("Un jardin est formé d'une parcelle en parallélogramme de base "+b1+" m et de hauteur "+h1+" m, jointe à une parcelle triangulaire de base "+b2+" m et de hauteur "+h2+" m. Quelle est l'aire totale du jardin ? Donne ta réponse en mètres carrés.",
    tot, 0.01,
    "\\[ \\begin{aligned} A_{\\text{parallélogramme}} &= "+b1+" \\times "+h1+" = "+A1+" \\\\ A_{\\text{triangle}} &= "+FR(b2+" \\times "+h2,"2")+" = "+A2+" \\\\ \\text{total} &= "+A1+" + "+A2+" = "+tot+" \\text{ m}^2 \\end{aligned} \\] La réponse est <b>"+tot+" m²</b>.",
    {b1:b1, h1:h1, b2:b2, h2:h2}); q.figure=figMix(b1,h1,b2,h2,"m"); return q;
}, ["Trouve l'aire de chaque parcelle avec sa propre formule, puis additionne.", "Commence par le parallélogramme : base fois hauteur."]);

E("u4-cr-circumference", 4, ["9.10"], 2, "gen", function(){
  var d=pick([8,10,12,15,20,25,30,40]), laps=ri(3,12);
  var tot=3.14*d*laps;
  var q=numq("Une piste de course est un cercle de diamètre "+d+" m. Un coureur fait "+laps+" tours de la piste. En utilisant 3,14 pour pi, quelle distance le coureur parcourt-il ? Donne ta réponse en mètres.",
    tot, 0.01,
    "\\[ \\begin{aligned} C &= 3,14 \\times "+d+" = "+fmtDF(3.14*d,2)+" \\text{ m} \\\\ \\text{distance} &= "+fmtDF(3.14*d,2)+" \\times "+laps+" = "+fmtDF(tot,2)+" \\text{ m} \\end{aligned} \\] La réponse est <b>"+fmtDF(tot,2)+" m</b>.",
    {d:d, laps:laps}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
}, ["Un tour est une circonférence ; multiplie par le nombre de tours.", "Commence par C = pi × d en utilisant 3,14 pour pi."]);

E("u4-cr-graph-quantity", 4, ["11.5"], 1, "gen", function(){
  var topics=[["l'activité préférée à la récréation",["Kickball","Lecture","Dessin","Corde à sauter"]],["le fruit préféré",["Pomme","Banane","Raisins","Orange"]],["la façon de passer une journée de pluie",["Films","Jeux","Livres","Pâtisserie"]]];
  var tp=pick(topics);
  var ps=pick([[45,25,20,10],[35,30,25,10],[50,20,15,15],[40,30,20,10],[30,25,25,20]]);
  var T=pick([60,80,100,120,200,240]);
  var idx=ri(0,3), qty=ps[idx]*T/100;
  if(qty!==Math.round(qty)){T=200; qty=ps[idx]*2;}
  var dataStr=tp[1].map(function(name,i){return name+" "+ps[i]+" %";}).join(", ");
  return numq("Un diagramme circulaire sur "+tp[0]+" pour "+T+" élèves montre : "+dataStr+". Combien d'élèves ont choisi "+tp[1][idx]+" ?",
    qty, 0.01,
    "\\[ \\begin{aligned} \\text{élèves} &= "+FR(ps[idx],"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] La réponse est <b>"+qty+"</b>.",
    {idx:idx, T:T});
}, ["Multiplie le pourcentage de la catégorie par le nombre total d'élèves.", "Commence par écrire le pourcentage comme une fraction sur 100."]);

E("u4-cr-area-circle", 4, ["9.9","9.3"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=2*ri(3,30), r=d/2, A=3.14*r*r;
    var q=numq("Une aire de jeux d'eau circulaire a un diamètre de "+d+" m. En utilisant 3,14 pour pi, quelle est l'aire de cette surface ? Donne ta réponse en mètres carrés.",
      A, 0.01,
      "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\text{ m} \\\\ A &= 3,14 \\times "+r+"^2 \\\\ &= "+fmtDF(A,2)+" \\text{ m}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(A,2)+" m²</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
  }
  var rr=ri(3,30), AA=3.14*rr*rr;
  var q=numq("Un tapis circulaire a un rayon de "+rr+" m. En utilisant 3,14 pour pi, quelle est l'aire du tapis ? Donne ta réponse en mètres carrés.",
    AA, 0.01,
    "\\[ \\begin{aligned} A &= 3,14 \\times "+rr+"^2 \\\\ &= "+fmtDF(AA,2)+" \\text{ m}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(AA,2)+" m²</b>.",
    {mode:"r", r:rr}); q.figure=u4circleFig("r = "+rr+" m","r"); return q;
}, ["Assure-toi d'avoir le rayon, puis utilise A = pi × r².", "Commence par trouver le rayon : divise le diamètre par deux si c'est lui qui est donné."]);

E("u4-cr-composite", 4, ["9.3","9.10"], 3, "gen", function(){
  var w=pick([5,6,7,8,9,10,11,12,14,16]), L=ri(4,14), r=w/2, semi=3.14*r*r/2, tot=w*L+semi;
  var q=numq("Un panneau est un rectangle de "+w+" m de large et de "+L+" m de haut, avec un demi-cercle (la moitié d'un cercle) de diamètre "+w+" m fixé sur le dessus. En utilisant 3,14 pour pi, quelle est l'aire totale du panneau ? Donne ta réponse en mètres carrés.",
    tot, 0.05,
    "\\[ \\begin{aligned} A_{\\text{rectangle}} &= "+w+" \\times "+L+" = "+(w*L)+" \\\\ A_{\\text{demi-cercle}} &= "+FR("3,14 \\times "+fmtD(r)+"^2","2")+" = "+fmtDF(semi,2)+" \\\\ \\text{total} &= "+(w*L)+" + "+fmtDF(semi,2)+" = "+fmtDF(tot,2)+" \\text{ m}^2 \\end{aligned} \\] La réponse est <b>"+fmtDF(tot,2)+" m²</b>.",
    {w:w, L:L}); q.figure=figSign(w+" m",L+" m"); return q;
}, ["Divise le panneau en un rectangle et un demi-cercle, trouve chaque aire, puis additionne.", "Commence par le rectangle, puis trouve le demi-cercle : son rayon est la moitié de la largeur du panneau."]);

/* ----- bank-u5.js ----- */
// Math 7 (French) Unit 5 Operations with Fractions question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 2386 to 2828).
// CRMARKS: u5-simplify-solution=3
// CRMARKS: u5-problem-add=3
// CRMARKS: u5-problem-sub-mixed=2
// CRMARKS: u5-three-fractions=3
// CRMARKS: u5-mixed-multistep=3
/* TRANSLATOR NOTES
   Chunk: Math 7, Unit 5 (Les opérations sur les fractions), 18 entries u5-*.
   Translated per RULES.md and GLOSSARY.md; Grade 7 guide terms win (7N5:
   fractions positives, nombres fractionnaires, dénominateur commun,
   simplifier, facteur commun, numérateur, dénominateur).

   Judgement calls:
   - "Lowest terms" rendered "sous sa forme la plus simple", matching the
     Math 8 FR pipeline wording and the guides' "plus simple expression".
   - In the mixed-number entries, "whole numbers / fraction parts" are
     rendered "parties entières / parties fractionnaires"; "mixed number"
     in answer instructions is "nombre fractionnaire".
   - "Benchmark" rendered "repère". "Least common denominator" rendered
     "plus petit dénominateur commun"; hints keep "plus petit commun
     multiple" where the English says least common multiple.
   - The u5barsSVG figure label in u5-model-sub-figure uses "ombré, retrait
     de N" for the crossed-out count, so the wording stays correct for any
     generated count (1 or more). The fixed-count labels in
     u5-model-sub-equation use "N parties barrées" (singular "1 partie
     barrée" where the count is 1).
   - The item list in u5-mixed-multistep (ribbon, wire, string) is student
     facing, so it is translated: ruban, fil, ficelle, each fitting
     "Un rouleau de ... mesure ...". Personal names kept unchanged
     (Sam, Alex, Priya, Ben, Mia, Noah).
   - "Lunch" rendered "dîner" (the midday meal) in the walk and juice
     contexts.
   - Fraction literals in typed-answer instructions and feedback
     (par exemple, 3/4; 3/6 + 2/6 = 5/6) stay in slash form: they show the
     typed answer format, they are not decimal numbers.

   FMT-GEOM lines left as fmt(: 3 lines, all in u5barsSVG (the rect line,
   the tick line line, and the cross lines line). Every fmt( there feeds
   SVG attributes or coordinates. The helper's only visible text is
   r.label, a string built at the call sites, and those labels were
   translated at the call sites. There is no other fmt( in this chunk.

   The .toFixed(6) in u5accept is left unchanged: it builds accepted
   typed answers in code, not display text, and the app accepts both the
   comma and the point. No money, no percents and no literal display
   decimals occur in this chunk.

   Unsure about: nothing blocking.
*/
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
  [[cr[0]+1,cr[1]],[cr[0],cr[1]+1],[cr[0]+1,cr[1]+1],[cr[0]+2,cr[1]],[cr[0],cr[1]+2],[cr[0]+3,cr[1]+1]].forEach(function(p){tryAdd(p,"Cette valeur ne correspond pas au résultat que donnent les étapes d'une solution correcte.");});
  return out;
}
function u5iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr+10,corr-2,corr+5].forEach(function(v){tryAdd(v,"Cette valeur ne correspond pas au résultat que donnent les étapes d'une solution correcte.");});
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
    for(i=0;i<r.d;i++){x=x0+i*seg;if(i<r.n)out+='<rect x="'+fmt(x,1)+'" y="'+y+'" width="'+fmt(seg,1)+'" height="30" fill="'+FIG_SHADE+'"/>';} /* FMT-GEOM */
    out+='<rect x="'+x0+'" y="'+y+'" width="'+w+'" height="30" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    for(i=0;i<=r.d;i++){x=x0+i*seg;out+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+30)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';} /* FMT-GEOM */
    if(r.cross){for(i=r.n-r.cross;i<r.n;i++){x=x0+i*seg;out+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x+seg,1)+'" y2="'+(y+30)+'" stroke="'+FIG_ALT+'" stroke-width="1.8"/><line x1="'+fmt(x+seg,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+30)+'" stroke="'+FIG_ALT+'" stroke-width="1.8"/>';}} /* FMT-GEOM */
    out+='<text x="170" y="'+(y+50)+'" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">'+r.label+'</text>';
  });
  return out+'</svg>';
}

E("u5-add-like", 5, ["6.14","6.13"], 1, "gen", function(){
  var d=pick([4,5,6,7,8,9,10,11,12]);var a=ri(1,d-2);var b=ri(1,d-1-a);var s=a+b;
  var ctx=pick(["pure","trail","recipe"]);
  var prompt;
  if(ctx==="trail")prompt="Un randonneur parcourt "+u5M(a,d)+" d'un sentier le matin et "+u5M(b,d)+" du sentier l'après-midi. Quelle fraction du sentier le randonneur a-t-il parcourue en tout ?";
  else if(ctx==="recipe")prompt="Une recette utilise "+u5M(a,d)+" d'une tasse d'avoine, puis encore "+u5M(b,d)+" d'une tasse d'avoine. Cela fait combien de tasses d'avoine en tout ?";
  else prompt="Que vaut "+u5M(a,d)+" + "+u5M(b,d)+" ?";
  var sol="Imagine un tout divisé en "+d+" parties égales. Les deux fractions comptent des parties de cette même taille, donc additionne les numérateurs et garde le dénominateur.\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d);
  var rr=u5red(s,d);if(rr[0]!==s||rr[1]!==d)sol+=" \\\\ &= "+u5disp(s,d);
  sol+=" \\end{aligned} \\] La réponse est <b>"+u5M(s,d)+"</b>.";
  return mcq(prompt,{t:u5M(s,d),fb:"Oui : les parties sont de la même taille, donc "+a+" parties + "+b+" parties = "+s+" parties de taille "+d+"." },
    u5fopts([s,d],[{p:[s,2*d],fb:"Cela additionne aussi les dénominateurs. La taille des parties ne change pas quand on additionne des parties ensemble."},{p:[Math.abs(a-b),d],fb:"Cela soustrait les numérateurs. La question demande le total, donc on additionne les numérateurs."},{p:[s+1,d],fb:"Cela compte une partie de trop : "+a+" + "+b+" = "+s+", et non "+(s+1)+"."}]),
    sol,{mode:"add-like",a:a,b:b,d:d});
}, ["Les dénominateurs sont les mêmes, donc les parties sont de la même taille.", "Commence par additionner les numérateurs en gardant le même dénominateur."]);

E("u5-simplify-fraction", 5, ["6.15"], 1, "gen", function(){
  var q=pick([3,4,5,6,7,8,9,10,11,12]);var p=ri(1,q-1);var cnt=0;
  while(u5gcd(p,q)!==1&&cnt<40){p=ri(1,q-1);cnt++;}
  if(u5gcd(p,q)!==1){p=1;}
  var k=ri(2,6);var N=p*k,D=q*k;
  var ctx=pick(["pure","length","mass","time"]);
  var prompt;
  if(ctx==="length")prompt="Une bande mesure "+u5M(N,D)+" d'un mètre de long. Écris cette longueur comme une fraction sous sa forme la plus simple.";
  else if(ctx==="mass")prompt="Un sac a une masse de "+u5M(N,D)+" d'un kilogramme. Écris cette masse comme une fraction sous sa forme la plus simple.";
  else if(ctx==="time")prompt="Une tâche prend "+u5M(N,D)+" d'une heure. Écris cette durée comme une fraction sous sa forme la plus simple.";
  else prompt="Écris "+u5M(N,D)+" sous sa forme la plus simple.";
  var sol="Le plus grand facteur commun de "+N+" et de "+D+" est "+k+". Divise le numérateur et le dénominateur par "+k+".\\[ \\begin{aligned} "+FR(N,D)+" &= "+FR(N/k,D/k)+" \\end{aligned} \\] La réponse est <b>"+u5M(p,q)+"</b>.";
  return mcq(prompt,{t:u5M(p,q),fb:"Oui : diviser "+N+" et "+D+" chacun par leur facteur commun "+k+" donne la forme la plus simple."},
    u5fopts([p,q],[{p:[p,D],fb:"Cela divise seulement le numérateur par "+k+". Le dénominateur doit être divisé par le même facteur."},{p:[N,q],fb:"Cela divise seulement le dénominateur par "+k+". Le numérateur doit être divisé par le même facteur."},{p:[N-k,D-k],fb:"Cela soustrait "+k+" en haut et en bas. Simplifier veut dire diviser par un facteur commun, et non soustraire."}]),
    sol,{mode:"simplify",p:p,q:q,k:k});
}, ["Cherche le plus grand nombre qui divise à la fois le numérateur et le dénominateur.", "Commence par lister les facteurs du numérateur et du dénominateur et par trouver celui qu'ils ont en commun."]);

E("u5-common-denominator", 5, ["6.16"], 1, "gen", function(){
  var pairs=[[2,4],[2,6],[3,6],[4,6],[3,4],[4,8],[5,10],[6,8],[3,8],[4,10],[5,6],[6,10],[8,12],[9,12],[4,12],[3,9],[5,15],[6,9],[8,10],[10,15]];
  var pr=pick(pairs);var d1=pr[0],d2=pr[1];var L=u5lcm(d1,d2);
  var na=ri(1,d1-1),nb=ri(1,d2-1);
  var prompt="Quel est le plus petit dénominateur commun de "+u5M(na,d1)+" et de "+u5M(nb,d2)+" ?";
  var sol="Liste les multiples de "+d1+" : "+d1+", "+(2*d1)+", "+(3*d1)+", "+(4*d1)+". Liste les multiples de "+d2+" : "+d2+", "+(2*d2)+", "+(3*d2)+", "+(4*d2)+". Le premier multiple qu'ils ont en commun est "+L+", donc le plus petit dénominateur commun est <b>"+L+"</b>.";
  return mcq(prompt,{t:String(L),fb:"Oui : "+L+" est le plus petit nombre qui est un multiple à la fois de "+d1+" et de "+d2+"."},
    u5iopts(L,[{v:d1*d2,fb:"C'est le produit des dénominateurs. C'est un dénominateur commun, mais ce n'est pas le plus petit ici."},{v:d1+d2,fb:"Cela additionne les dénominateurs. Un dénominateur commun doit être un multiple de chaque dénominateur."},{v:Math.max(d1,d2),fb:"C'est seulement le plus grand dénominateur, et "+Math.min(d1,d2)+" ne le divise pas exactement ici."}]),
    sol,{mode:"lcd",d1:d1,d2:d2});
}, ["Un dénominateur commun est un multiple des deux dénominateurs.", "Commence par lister les multiples du plus grand dénominateur jusqu'à en trouver un que l'autre dénominateur divise."]);

E("u5-sub-like", 5, ["6.19"], 1, "gen", function(){
  var d=pick([4,5,6,7,8,9,10,12]);var a=ri(3,d-1);var b=ri(1,a-1);var s=a-b;
  var ctx=pick(["pure","ribbon","tank"]);
  var prompt;
  if(ctx==="ribbon")prompt="Un ruban mesure "+u5M(a,d)+" d'un mètre de long. On coupe un morceau de "+u5M(b,d)+" d'un mètre. Combien de ruban reste-t-il ?";
  else if(ctx==="tank")prompt="Un réservoir est rempli à "+u5M(a,d)+". Ensuite, on utilise "+u5M(b,d)+" du réservoir. Quelle fraction du réservoir reste-t-il ?";
  else prompt="Que vaut "+u5M(a,d)+" - "+u5M(b,d)+" ?";
  var sol="Les parties sont de la même taille, donc soustrais les numérateurs et garde le dénominateur.\\[ \\begin{aligned} "+FR(a,d)+" - "+FR(b,d)+" &= "+FR(s,d);
  var rr=u5red(s,d);if(rr[0]!==s||rr[1]!==d)sol+=" \\\\ &= "+u5disp(s,d);
  sol+=" \\end{aligned} \\] La réponse est <b>"+u5M(s,d)+"</b>.";
  return mcq(prompt,{t:u5M(s,d),fb:"Oui : "+a+" parties moins "+b+" parties, il reste "+s+" parties de taille "+d+"."},
    u5fopts([s,d],[{p:[a+b,d],fb:"Cela additionne les numérateurs. La question demande ce qui reste, donc soustrais."},{p:[s,2*d],fb:"Cela change le dénominateur. Soustraire des parties ne change pas la taille de chaque partie."},{p:[s+1,d],fb:"Cela compte une partie de trop : "+a+" - "+b+" = "+s+", et non "+(s+1)+"."}]),
    sol,{mode:"sub-like",a:a,b:b,d:d});
}, ["Les dénominateurs sont les mêmes, donc les parties sont de la même taille.", "Commence par soustraire les numérateurs en gardant le même dénominateur."]);

E("u5-add-unlike", 5, ["6.17","6.16"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([2,3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,9,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["pure","punch","walk"]);
  var prompt;
  if(ctx==="punch")prompt="Une cruche contient "+u5M(a,d1)+" d'un litre de jus. On verse encore "+u5M(c,d2)+" d'un litre. Combien de jus y a-t-il dans la cruche maintenant, en litres ?";
  else if(ctx==="walk")prompt="Sam parcourt "+u5M(a,d1)+" d'un kilomètre avant le dîner et "+u5M(c,d2)+" d'un kilomètre après le dîner. Quelle distance Sam parcourt-il en tout, en kilomètres ?";
  else prompt="Que vaut "+u5M(a,d1)+" + "+u5M(c,d2)+" ?";
  var sol="Utilise le dénominateur commun "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] La réponse est <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Oui : avec le dénominateur commun "+L+", la somme des numérateurs est "+N+"."},
    u5fopts([N,L],[{p:[a+c,d1+d2],fb:"Cela additionne les numérateurs et les dénominateurs. On ne peut additionner des fractions que si elles ont le même dénominateur."},{p:[a*m1+c,L],fb:"Cela réécrit seulement la première fraction avec "+L+". La deuxième fraction doit aussi être réécrite."},{p:[a+c*m2,L],fb:"Cela réécrit seulement la deuxième fraction avec "+L+". La première fraction doit aussi être réécrite."}]),
    sol,{mode:"add-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["Les parties n'ont pas la même taille, donc il faut d'abord un dénominateur commun.", "Commence par trouver le plus petit commun multiple des deux dénominateurs."]);

E("u5-sub-unlike", 5, ["6.19","6.16"], 2, "gen", function(){
  var d1=2,d2=3,a=1,c=1,cnt=0,L=6;
  while(cnt<60){d1=pick([3,4,5,6,8,9,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>36){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);if(a*L/d1<=c*L/d2){cnt++;continue;}break;}
  if(cnt>=60){d1=3;d2=4;a=2;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1-c*m2;
  var ctx=pick(["pure","flour","paint"]);
  var prompt;
  if(ctx==="flour")prompt="Un bac contient "+u5M(a,d1)+" d'un kilogramme de farine. Un boulanger en retire "+u5M(c,d2)+" d'un kilogramme. Combien de farine reste-t-il, en kilogrammes ?";
  else if(ctx==="paint")prompt="Un pot est rempli de peinture à "+u5M(a,d1)+". Ensuite, on utilise "+u5M(c,d2)+" du pot sur une clôture. Quelle fraction du pot reste-t-il ?";
  else prompt="Que vaut "+u5M(a,d1)+" - "+u5M(c,d2)+" ?";
  var sol="Utilise le dénominateur commun "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" - "+FR(c,d2)+" &= "+FR(a*m1,L)+" - "+FR(c*m2,L)+" \\\\ &= "+FR(N,L);
  var rr=u5red(N,L);if(rr[0]!==N||rr[1]!==L)sol+=" \\\\ &= "+u5disp(N,L);
  sol+=" \\end{aligned} \\] La réponse est <b>"+u5M(N,L)+"</b>.";
  return mcq(prompt,{t:u5M(N,L),fb:"Oui : avec le dénominateur commun "+L+", la différence des numérateurs est "+N+"."},
    u5fopts([N,L],[{p:[Math.abs(a-c),Math.abs(d1-d2)|| (d1+d2)],fb:"Cela soustrait les numérateurs et les dénominateurs. On ne peut soustraire des fractions que si elles ont le même dénominateur."},{p:[a*m1-c,L],fb:"Cela réécrit seulement la première fraction avec "+L+". La deuxième fraction doit aussi être réécrite."},{p:[a*m1+c*m2,L],fb:"Cela additionne les numérateurs réécrits. La question demande une différence, donc soustrais."}]),
    sol,{mode:"sub-unlike",a:a,d1:d1,c:c,d2:d2});
}, ["Les parties n'ont pas la même taille, donc il faut d'abord un dénominateur commun.", "Commence par réécrire les deux fractions avec le plus petit commun multiple des dénominateurs."]);

E("u5-add-mixed", 5, ["6.21","6.20"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w1=ri(1,5),w2=ri(1,4);var n1=ri(1,d-1),n2=ri(1,d-1);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n1=ri(1,d-1);n2=ri(1,d-1);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=5;n1=ri(1,4);n2=ri(1,4);}
  var W=w1+w2,S=n1+n2;var N=W*d+S;
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","bags","laps"]);
  var prompt;
  if(ctx==="bags")prompt="Un sac contient "+"\\("+A+"\\)"+" kilogrammes de terre et un autre en contient "+"\\("+B+"\\)"+" kilogrammes. Quelle est la masse totale, en kilogrammes ?";
  else if(ctx==="laps")prompt="Un coureur fait "+"\\("+A+"\\)"+" tours le matin et "+"\\("+B+"\\)"+" tours le soir. Cela fait combien de tours en tout ?";
  else prompt="Que vaut "+"\\("+A+"\\)"+" + "+"\\("+B+"\\)"+" ?";
  var sol="Additionne les parties entières, puis additionne les parties fractionnaires."+(S>=d?" Les parties fractionnaires donnent plus d'un tout, donc regroupe.":"")+"\\[ \\begin{aligned} "+A+" + "+B+" &= "+W+" + "+FR(S,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Oui : les parties entières s'additionnent pour donner "+W+" et les parties fractionnaires s'additionnent pour donner "+S+"/"+d+", ce qui donne ce total."},
    u5fopts([N,d],[{p:[W*d+(S%d),d],fb:"Cela garde la partie fractionnaire sous un tout, mais oublie de regrouper le tout supplémentaire quand les parties fractionnaires dépassent "+d+"/"+d+"."},{p:[W*2*d+S,2*d],fb:"Cela additionne les dénominateurs des parties fractionnaires. Les parties sont de la même taille, donc le dénominateur reste "+d+"."},{p:[W*d+Math.abs(n1-n2),d],fb:"Cela soustrait les parties fractionnaires. La question demande un total, donc additionne-les."}]),
    sol,{mode:"add-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Traite les parties entières et les parties fractionnaires séparément.", "Commence par additionner les parties entières, puis additionne les numérateurs des parties fractionnaires."]);

E("u5-sub-mixed", 5, ["6.21","6.20"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n2=ri(1,d-2);var n1=n2+ri(1,d-1-n2);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n2=ri(1,d-2);n1=n2+ri(1,d-1-n2);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n2=ri(1,5);n1=n2+ri(1,6-n2);}
  var N=(w1-w2)*d+(n1-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","board","water"]);
  var prompt;
  if(ctx==="board")prompt="Une planche mesure "+"\\("+A+"\\)"+" mètres de long. On coupe un morceau de "+"\\("+B+"\\)"+" mètres de long. Combien de planche reste-t-il, en mètres ?";
  else if(ctx==="water")prompt="Une glacière contient "+"\\("+A+"\\)"+" litres d'eau. Une équipe boit "+"\\("+B+"\\)"+" litres. Combien d'eau reste-t-il, en litres ?";
  else prompt="Que vaut "+"\\("+A+"\\)"+" - "+"\\("+B+"\\)"+" ?";
  var sol="Soustrais les parties entières, puis soustrais les parties fractionnaires.\\[ \\begin{aligned} "+A+" - "+B+" &= "+(w1-w2)+" + "+FR(n1-n2,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Oui : la différence des parties entières est "+(w1-w2)+" et la différence des parties fractionnaires est "+(n1-n2)+"/"+d+"."},
    u5fopts([N,d],[{p:[(w1-w2)*d+(n1+n2),d],fb:"Cela additionne les parties fractionnaires. La question demande ce qui reste, donc soustrais aussi les parties fractionnaires."},{p:[(w1+w2)*d+(n1-n2),d],fb:"Cela additionne les parties entières. Ici, les parties entières et les parties fractionnaires sont toutes soustraites."},{p:[(w1-w2)*2*d+(n1-n2),2*d],fb:"Cela change le dénominateur. Les parties sont de la même taille, donc le dénominateur reste "+d+"." }]),
    sol,{mode:"sub-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Traite les parties entières et les parties fractionnaires séparément.", "Commence par soustraire les parties entières, puis soustrais les numérateurs des parties fractionnaires."]);

E("u5-model-add-figure", 5, ["6.13","6.14"], 1, "gen", function(){
  var d=pick([4,5,6,8,10,12]);var a=ri(1,d-2);var b=ri(1,d-1-a);var s=a+b;
  var q=mcq("Les deux bandes ombrées modélisent une somme. Chaque bande est un tout divisé en parties égales. Quelle est la somme modélisée par les bandes ?",
    {t:u5M(s,d),fb:"Oui : la première bande ombre "+a+" parties sur "+d+" et la deuxième ombre "+b+" parties sur "+d+", ce qui donne "+s+" parties de taille "+d+" en tout."},
    u5fopts([s,d],[{p:[s,2*d],fb:"Cela additionne les dénominateurs. Chaque bande est un tout divisé en "+d+" parties, donc la taille des parties reste la même."},{p:[Math.abs(a-b),d],fb:"C'est la différence des parties ombrées. Les bandes modélisent une somme, donc additionne-les."},{p:[s+1,d],fb:"Recompte les parties ombrées : "+a+" + "+b+" = "+s+", et non "+(s+1)+"."}]),
    "Compte les parties ombrées de chaque bande. La première bande montre "+u5M(a,d)+" et la deuxième montre "+u5M(b,d)+".\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d)+" \\end{aligned} \\] La somme modélisée est <b>"+u5M(s,d)+"</b>.",
    {mode:"model-add",a:a,b:b,d:d});
  q.figure=u5barsSVG([{n:a,d:d,label:a+"/"+d},{n:b,d:d,label:b+"/"+d}]);
  return q;
}, ["Chaque bande est un tout, et l'ombrage montre les parties fractionnaires.", "Commence par lire la fraction montrée par chaque bande, puis additionne-les."]);

E("u5-model-sub-figure", 5, ["6.18","6.19"], 1, "gen", function(){
  var d=pick([5,6,7,8,9,10,12]);var n=ri(3,d-1);var c=ri(1,n-1);var s=n-c;
  var q=mcq("La bande ombrée modélise une soustraction. Les parties barrées sont retirées. Quelle fraction de la bande reste ombrée et non barrée ?",
    {t:u5M(s,d),fb:"Oui : "+n+" parties étaient ombrées et "+c+" d'entre elles sont barrées, ce qui laisse "+s+" parties sur "+d+"."},
    u5fopts([s,d],[{p:[c,d],fb:"C'est la partie retirée, et non la partie qui reste."},{p:[n,d],fb:"C'est la quantité ombrée au départ, avant que des parties soient barrées."},{p:[s+1,d],fb:"Recompte : "+n+" parties ombrées moins "+c+" parties barrées, il reste "+s+" parties."}]),
    "La bande commence avec "+u5M(n,d)+" ombré, et "+u5M(c,d)+" est barré.\\[ \\begin{aligned} "+FR(n,d)+" - "+FR(c,d)+" &= "+FR(s,d)+" \\end{aligned} \\] La fraction qui reste est <b>"+u5M(s,d)+"</b>.",
    {mode:"model-sub",n:n,c:c,d:d});
  q.figure=u5barsSVG([{n:n,d:d,label:n+"/"+d+" ombré, retrait de "+c,cross:c}]);
  return q;
}, ["La bande entière est divisée en parties égales, et les parties barrées sont retirées.", "Commence par compter les parties ombrées, puis soustrais les parties barrées."]);

E("u5-simplify-solution", 5, ["6.22","6.15"], 1, "gen", function(){
  var d=12,a=2,b=4,cnt=0,s=6;
  while(cnt<80){d=pick([6,8,9,10,12,14,15,16,18,20,21,22,24]);a=ri(1,d-2);b=ri(1,d-1-a);s=a+b;if(u5gcd(s,d)>=2)break;cnt++;}
  if(cnt>=80){d=12;a=2;b=4;s=6;}
  var rr=u5red(s,d);var g=u5gcd(s,d);
  var ctx=pick(["pure","gym","garden"]);
  var prompt;
  if(ctx==="gym")prompt="Un élève s'entraîne pendant "+u5M(a,d)+" d'une heure le lundi et "+u5M(b,d)+" d'une heure le mardi. Cela fait combien d'heures en tout ? Donne ta réponse comme une fraction sous sa forme la plus simple (par exemple, 3/4).";
  else if(ctx==="garden")prompt="Un jardinier arrose "+u5M(a,d)+" d'un parterre le matin et "+u5M(b,d)+" du parterre l'après-midi. Quelle fraction du parterre est arrosée en tout ? Donne ta réponse comme une fraction sous sa forme la plus simple (par exemple, 3/4).";
  else prompt="Calcule "+u5M(a,d)+" + "+u5M(b,d)+". Donne ta réponse comme une fraction sous sa forme la plus simple (par exemple, 3/4).";
  var sol="Additionne les numérateurs, puis simplifie en divisant le numérateur et le dénominateur par leur facteur commun "+g+".\\[ \\begin{aligned} "+FR(a,d)+" + "+FR(b,d)+" &= "+FR(s,d)+" \\\\ &= "+u5disp(s,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(s,d)+"</b>.";
  return textq(prompt,u5accept(s,d),sol,{mode:"simplify-solution",a:a,b:b,d:d});
}, ["Additionne d'abord les fractions, puis vérifie si le résultat peut être simplifié.", "Commence par additionner les numérateurs, car les dénominateurs sont déjà les mêmes."]);

E("u5-problem-add", 5, ["6.23","6.17"], 2, "gen", function(){
  var d1=4,d2=3,a=1,c=1,cnt=0,L=12;
  while(cnt<60){d1=pick([2,3,4,5,6,8,10,12]);d2=pick([2,3,4,5,6,8,10,12]);if(d1===d2){cnt++;continue;}L=u5lcm(d1,d2);if(L>24){cnt++;continue;}a=ri(1,d1-1);c=ri(1,d2-1);break;}
  if(cnt>=60){d1=4;d2=3;a=1;c=1;L=12;}
  var m1=L/d1,m2=L/d2;var N=a*m1+c*m2;
  var ctx=pick(["flour","trail","paint"]);
  var prompt;
  if(ctx==="flour")prompt="Un boulanger utilise "+u5M(a,d1)+" d'une tasse de farine pour une pâte et "+u5M(c,d2)+" d'une tasse de farine pour une garniture. Combien de tasses de farine le boulanger utilise-t-il en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  else if(ctx==="trail")prompt="Une équipe dégage "+u5M(a,d1)+" d'un kilomètre de sentier le samedi et "+u5M(c,d2)+" d'un kilomètre le dimanche. Combien de kilomètres dégage-t-elle en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  else prompt="Un peintre utilise "+u5M(a,d1)+" d'un pot de peinture sur une porte et "+u5M(c,d2)+" d'un pot sur un cadre de fenêtre. Cela fait combien de pots de peinture en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  var sol="On additionne les quantités. Utilise le dénominateur commun "+L+".\\[ \\begin{aligned} "+FR(a,d1)+" + "+FR(c,d2)+" &= "+FR(a*m1,L)+" + "+FR(c*m2,L)+" \\\\ &= "+FR(N,L)+" \\\\ &= "+u5disp(N,L)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,L)+"</b>.";
  return textq(prompt,u5accept(N,L),sol,{mode:"problem-add",a:a,d1:d1,c:c,d2:d2});
}, ["La question demande un total, donc on additionne les deux quantités.", "Commence par trouver un dénominateur commun pour les deux fractions."]);

E("u5-problem-sub-mixed", 5, ["6.23","6.21"], 1, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n2=ri(1,d-2);var n1=n2+ri(1,d-1-n2);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n2=ri(1,d-2);n1=n2+ri(1,d-1-n2);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n2=ri(1,5);n1=n2+ri(1,6-n2);}
  var N=(w1-w2)*d+(n1-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["rope","juice","ribbon"]);
  var prompt;
  if(ctx==="rope")prompt="Une corde mesure "+"\\("+A+"\\)"+" mètres de long. On coupe un morceau de "+"\\("+B+"\\)"+" mètres de long pour une tente. Combien de mètres de corde reste-t-il ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  else if(ctx==="juice")prompt="Une cruche contient "+"\\("+A+"\\)"+" litres de jus. Au dîner, on en verse "+"\\("+B+"\\)"+" litres. Combien de litres reste-t-il ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  else prompt="Un ruban mesure "+"\\("+A+"\\)"+" mètres de long. Un cadeau utilise "+"\\("+B+"\\)"+" mètres de ce ruban. Combien de mètres de ruban reste-t-il ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
  var sol="La quantité qui reste est une différence. Soustrais les parties entières, puis les parties fractionnaires.\\[ \\begin{aligned} "+A+" - "+B+" &= "+(w1-w2)+" + "+FR(n1-n2,d)+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  return textq(prompt,u5accept(N,d),sol,{mode:"problem-sub-mixed",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["La question demande ce qui reste, donc on soustrait les quantités.", "Commence par soustraire les parties entières, puis soustrais les parties fractionnaires."]);

E("u5-model-sub-equation", 5, ["6.18","6.19"], 1, "var", varset([
  function(){
    var q=mcq("Une bande est divisée en 8 parties égales. Au départ, 5 parties sont ombrées. Ensuite, 2 des parties ombrées sont barrées. Quelle équation représente ce modèle ?",
      {t:"\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,8)+"\\)",fb:"Oui : le modèle commence à 5/8, retire 2/8 et laisse 3/8."},
      [{t:"\\("+FR(5,8)+" + "+FR(2,8)+" = "+FR(7,8)+"\\)",fb:"Cela additionne les parties barrées. Les parties barrées sont retirées, donc le modèle est une soustraction."},
       {t:"\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,16)+"\\)",fb:"Les numérateurs sont bons, mais le dénominateur reste 8 : la taille des parties ne change pas."},
       {t:"\\("+FR(8,8)+" - "+FR(2,8)+" = "+FR(6,8)+"\\)",fb:"Cela part de la bande entière. Le modèle part des 5 parties ombrées, c'est-à-dire 5/8."}],
      "Les parties ombrées donnent la quantité de départ, "+u5M(5,8)+". Le fait de barrer 2 parties représente le retrait de "+u5M(2,8)+", et il reste 3 parties. L'équation est <b>\\("+FR(5,8)+" - "+FR(2,8)+" = "+FR(3,8)+"\\)</b>.",
      {mode:"model-eq-1"});
    q.figure=u5barsSVG([{n:5,d:8,label:"5/8 ombré, 2 parties barrées",cross:2}]);
    return q;
  },
  function(){
    return mcq("Un cercle de fractions est divisé en 6 parties égales. Au départ, 5 parties sont ombrées. Ensuite, 4 des parties ombrées sont barrées. Quelle équation représente ce modèle ?",
      {t:"\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,6)+"\\)",fb:"Oui : le modèle commence à 5/6, retire 4/6 et laisse 1/6."},
      [{t:"\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,12)+"\\)",fb:"Les numérateurs sont bons, mais le dénominateur reste 6 : la taille des parties ne change pas."},
       {t:"\\("+FR(6,6)+" - "+FR(4,6)+" = "+FR(2,6)+"\\)",fb:"Cela part du cercle entier. Le modèle part des 5 parties ombrées, c'est-à-dire 5/6."},
       {t:"\\("+FR(4,6)+" - "+FR(1,6)+" = "+FR(3,6)+"\\)",fb:"Cela part de la partie barrée. Le modèle part de la quantité ombrée, 5/6."}],
      "Les parties ombrées donnent la quantité de départ, "+u5M(5,6)+". Le fait de barrer 4 parties représente le retrait de "+u5M(4,6)+", et il reste 1 partie. L'équation est <b>\\("+FR(5,6)+" - "+FR(4,6)+" = "+FR(1,6)+"\\)</b>.",
      {mode:"model-eq-2"});
  },
  function(){
    var q=mcq("Une bande est divisée en 10 parties égales. Au départ, 7 parties sont ombrées. Ensuite, 3 des parties ombrées sont barrées. Quelle équation représente ce modèle ?",
      {t:"\\("+FR(7,10)+" - "+FR(3,10)+" = "+FR(2,5)+"\\)",fb:"Oui : le modèle commence à 7/10, retire 3/10 et laisse 4/10, ce qui se simplifie en 2/5."},
      [{t:"\\("+FR(7,10)+" - "+FR(3,10)+" = "+FR(4,20)+"\\)",fb:"Cela soustrait correctement le numérateur, mais double le dénominateur. Les parties restent des dixièmes."},
       {t:"\\("+FR(7,10)+" + "+FR(3,10)+" = "+FR(1,1)+"\\)",fb:"Cela additionne les parties barrées. Les parties barrées sont retirées, donc le modèle est une soustraction."},
       {t:"\\("+FR(10,10)+" - "+FR(3,10)+" = "+FR(7,10)+"\\)",fb:"Cela part de la bande entière. Le modèle part des 7 parties ombrées, c'est-à-dire 7/10."}],
      "Les parties ombrées donnent la quantité de départ, "+u5M(7,10)+". Le fait de barrer 3 parties représente le retrait de "+u5M(3,10)+", et il reste 4 parties, et "+u5M(4,10)+" se simplifie.\\[ \\begin{aligned} "+FR(7,10)+" - "+FR(3,10)+" &= "+FR(4,10)+" \\\\ &= "+u5disp(4,10)+" \\end{aligned} \\] L'équation se termine par <b>"+u5M(4,10)+"</b>.",
      {mode:"model-eq-3"});
    q.figure=u5barsSVG([{n:7,d:10,label:"7/10 ombré, 3 parties barrées",cross:3}]);
    return q;
  },
  function(){
    return mcq("Un modèle de tasse à mesurer est divisé en 4 parties égales. Au départ, 3 parties sont ombrées. Ensuite, 1 des parties ombrées est barrée. Quelle équation représente ce modèle ?",
      {t:"\\("+FR(3,4)+" - "+FR(1,4)+" = "+FR(1,2)+"\\)",fb:"Oui : le modèle commence à 3/4, retire 1/4 et laisse 2/4, ce qui se simplifie en 1/2."},
      [{t:"\\("+FR(3,4)+" - "+FR(1,4)+" = "+FR(2,8)+"\\)",fb:"Cela compte le bon nombre de parties restantes, mais change la taille des parties en huitièmes. Les parties sont des quarts."},
       {t:"\\("+FR(4,4)+" - "+FR(1,4)+" = "+FR(3,4)+"\\)",fb:"Cela part de la tasse entière. Le modèle part des 3 parties ombrées, c'est-à-dire 3/4."},
       {t:"\\("+FR(3,4)+" + "+FR(1,4)+" = "+FR(1,1)+"\\)",fb:"Cela additionne la partie barrée. Les parties barrées sont retirées, donc le modèle est une soustraction."}],
      "Les parties ombrées donnent la quantité de départ, "+u5M(3,4)+". Le fait de barrer 1 partie représente le retrait de "+u5M(1,4)+", et il reste 2 parties, et "+u5M(2,4)+" se simplifie.\\[ \\begin{aligned} "+FR(3,4)+" - "+FR(1,4)+" &= "+FR(2,4)+" \\\\ &= "+u5disp(2,4)+" \\end{aligned} \\] L'équation se termine par <b>"+u5M(2,4)+"</b>.",
      {mode:"model-eq-4"});
  },
  function(){
    return mcq("Une bande est divisée en 12 parties égales. Au départ, 9 parties sont ombrées. Ensuite, 5 des parties ombrées sont barrées. Quelle équation représente ce modèle ?",
      {t:"\\("+FR(9,12)+" - "+FR(5,12)+" = "+FR(1,3)+"\\)",fb:"Oui : le modèle commence à 9/12, retire 5/12 et laisse 4/12, ce qui se simplifie en 1/3."},
      [{t:"\\("+FR(9,12)+" - "+FR(5,12)+" = "+FR(4,24)+"\\)",fb:"Cela compte le bon nombre de parties restantes, mais double le dénominateur. Les parties sont des douzièmes."},
       {t:"\\("+FR(12,12)+" - "+FR(5,12)+" = "+FR(7,12)+"\\)",fb:"Cela part de la bande entière. Le modèle part des 9 parties ombrées, c'est-à-dire 9/12."},
       {t:"\\("+FR(5,12)+" - "+FR(4,12)+" = "+FR(1,12)+"\\)",fb:"Cela part de la partie barrée. Le modèle part de la quantité ombrée, 9/12."}],
      "Les parties ombrées donnent la quantité de départ, "+u5M(9,12)+". Le fait de barrer 5 parties représente le retrait de "+u5M(5,12)+", et il reste 4 parties, et "+u5M(4,12)+" se simplifie.\\[ \\begin{aligned} "+FR(9,12)+" - "+FR(5,12)+" &= "+FR(4,12)+" \\\\ &= "+u5disp(4,12)+" \\end{aligned} \\] L'équation se termine par <b>"+u5M(4,12)+"</b>.",
      {mode:"model-eq-5"});
  }
]), ["Dans un modèle, les parties barrées sont retirées, donc le modèle représente une soustraction.", "Commence par écrire la quantité ombrée, puis soustrais la quantité barrée."]);

E("u5-sub-mixed-borrow", 5, ["6.21","6.20"], 3, "gen", function(){
  var d=pick([3,4,5,6,8,10,12]);var w2=ri(1,3);var w1=w2+ri(1,3);var n1=ri(1,d-2);var n2=n1+ri(1,d-1-n1);var cc=0;
  while((u5gcd(n1,d)!==1||u5gcd(n2,d)!==1)&&cc<40){n1=ri(1,d-2);n2=n1+ri(1,d-1-n1);cc++;}
  if(u5gcd(n1,d)!==1||u5gcd(n2,d)!==1){d=7;n1=ri(1,5);n2=n1+ri(1,6-n1);}
  var N=(w1-w2-1)*d+(n1+d-n2);
  var A=u5disp(w1*d+n1,d),B=u5disp(w2*d+n2,d);
  var ctx=pick(["pure","trail","tank"]);
  var prompt;
  if(ctx==="trail")prompt="Un sentier mesure "+"\\("+A+"\\)"+" kilomètres de long. Une équipe a terminé "+"\\("+B+"\\)"+" kilomètres. Combien de kilomètres reste-t-il à terminer ?";
  else if(ctx==="tank")prompt="Un réservoir contient "+"\\("+A+"\\)"+" litres. Ensuite, "+"\\("+B+"\\)"+" litres sont retirés. Combien de litres reste-t-il ?";
  else prompt="Que vaut "+"\\("+A+"\\)"+" - "+"\\("+B+"\\)"+" ?";
  var sol="La partie fractionnaire \\(" +FR(n1,d)+ "\\) est plus petite que \\(" +FR(n2,d)+ "\\), donc regroupe un tout pris de "+w1+" sous la forme \\(" +FR(d,d)+ "\\).\\[ \\begin{aligned} "+A+" - "+B+" &= "+u5disp((w1-1)*d+(n1+d),d)+" - "+B+" \\\\ &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  return mcq(prompt,{t:u5M(N,d),fb:"Oui : après avoir regroupé un tout, les parties fractionnaires se soustraient facilement et les parties entières diminuent d'un de plus."},
    u5fopts([N,d],[{p:[(w1-w2)*d+(n2-n1),d],fb:"Cela échange les parties fractionnaires pour éviter le regroupement. Regroupe plutôt un tout en "+d+" parties supplémentaires."},{p:[(w1-w2)*d+(n1+d-n2),d],fb:"Cela regroupe la partie fractionnaire, mais oublie que la partie entière diminue de un quand on regroupe."},{p:[(w1-w2)*d+(n1+n2),d],fb:"Cela additionne les parties fractionnaires. La question demande une différence, donc soustrais-les après le regroupement."}]),
    sol,{mode:"sub-mixed-borrow",w1:w1,n1:n1,w2:w2,n2:n2,d:d});
}, ["Compare d'abord les parties fractionnaires : la première est peut-être trop petite pour soustraire directement.", "Commence par regrouper un tout en parties fractionnaires avec le même dénominateur."]);

E("u5-three-fractions", 5, ["6.23","6.17","6.22"], 3, "gen", function(){
  var mode=pick(["total","left"]);
  var denoms=[[2,4,8],[3,6,12],[2,3,6],[4,8,12],[2,6,12],[3,4,12],[2,4,12],[6,3,12]];
  var ds=pick(denoms);var L=12;
  var ns=ds.map(function(d){return ri(1,d-1);});
  var i;var prompt,sol,ansN;
  if(mode==="total"){
    ansN=0;for(i=0;i<3;i++)ansN+=ns[i]*(L/ds[i]);
    var ctx=pick(["smoothie","hike","craft"]);
    if(ctx==="smoothie")prompt="Un smoothie utilise "+u5M(ns[0],ds[0])+" d'un litre de lait, "+u5M(ns[1],ds[1])+" d'un litre de jus et "+u5M(ns[2],ds[2])+" d'un litre de yogourt. Cela fait combien de litres en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    else if(ctx==="hike")prompt="Une classe parcourt "+u5M(ns[0],ds[0])+" d'un kilomètre, se repose, parcourt "+u5M(ns[1],ds[1])+" d'un kilomètre, se repose, puis parcourt "+u5M(ns[2],ds[2])+" d'un kilomètre. Combien de kilomètres la classe parcourt-elle en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    else prompt="Un projet d'artisanat utilise "+u5M(ns[0],ds[0])+" d'un mètre de ruban rouge, "+u5M(ns[1],ds[1])+" d'un mètre de ruban bleu et "+u5M(ns[2],ds[2])+" d'un mètre de ruban vert. Cela fait combien de mètres de ruban en tout ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    sol="Réécris les trois fractions avec le dénominateur commun "+L+" et additionne.\\[ \\begin{aligned} "+FR(ns[0],ds[0])+" + "+FR(ns[1],ds[1])+" + "+FR(ns[2],ds[2])+" &= "+FR(fmtD(ns[0]*(L/ds[0])),L)+" + "+FR(fmtD(ns[1]*(L/ds[1])),L)+" + "+FR(fmtD(ns[2]*(L/ds[2])),L)+" \\\\ &= "+FR(fmtD(ansN),L)+" \\\\ &= "+u5disp(ansN,L)+" \\end{aligned} \\] La réponse est <b>"+u5M(ansN,L)+"</b>.";
  }else{
    var used=ns[0]*(L/ds[0])+ns[1]*(L/ds[1]);var cnt=0;
    while(used>=L&&cnt<30){ns[0]=ri(1,ds[0]-1);ns[1]=ri(1,ds[1]-1);used=ns[0]*(L/ds[0])+ns[1]*(L/ds[1]);cnt++;}
    if(used>=L){ns[0]=1;ns[1]=1;used=(L/ds[0])+(L/ds[1]);}
    ansN=L-used;
    prompt="Une cruche pleine contient 1 litre d'eau. Une classe verse "+u5M(ns[0],ds[0])+" d'un litre pour une expérience et "+u5M(ns[1],ds[1])+" d'un litre pour nettoyer des pinceaux. Combien de litres reste-t-il dans la cruche ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    sol="La cruche commence à 1 tout, c'est-à-dire \\(" +FR(L,L)+ "\\). Réécris les quantités versées avec le dénominateur commun "+L+" et soustrais.\\[ \\begin{aligned} 1 - "+FR(ns[0],ds[0])+" - "+FR(ns[1],ds[1])+" &= "+FR(L,L)+" - "+FR(fmtD(ns[0]*(L/ds[0])),L)+" - "+FR(fmtD(ns[1]*(L/ds[1])),L)+" \\\\ &= "+FR(fmtD(ansN),L)+" \\\\ &= "+u5disp(ansN,L)+" \\end{aligned} \\] La réponse est <b>"+u5M(ansN,L)+"</b>.";
  }
  return textq(prompt,u5accept(ansN,L),sol,{mode:"three-"+mode,ns:ns,ds:ds});
}, ["Utilise un seul dénominateur commun pour chaque fraction du problème.", "Commence par réécrire chaque fraction avec le plus petit commun multiple de tous les dénominateurs."]);

E("u5-reasonable", 5, ["6.23","6.22"], 3, "var", varset([
  function(){
    return mcq("Alex additionne "+u5M(1,2)+" et "+u5M(1,3)+" et obtient "+u5M(2,5)+", en disant qu'il a additionné les numérateurs et les dénominateurs. Quelle est la somme correcte ?",
      {t:u5M(5,6),fb:"Oui : avec le dénominateur commun 6, la somme est 3/6 + 2/6 = 5/6."},
      [{t:u5M(2,5),fb:"C'est la réponse d'Alex. Additionner les numérateurs et les dénominateurs n'est pas la façon d'additionner des fractions."},
       {t:u5M(2,6),fb:"Cela garde le dénominateur commun, mais oublie de réécrire les numérateurs quand les fractions deviennent des sixièmes."},
       {t:u5M(1,6),fb:"C'est la différence des fractions réécrites. La question demande une somme."}],
      "Réécris les deux fractions avec le dénominateur commun 6.\\[ \\begin{aligned} "+FR(1,2)+" + "+FR(1,3)+" &= "+FR(3,6)+" + "+FR(2,6)+" \\\\ &= "+FR(5,6)+" \\end{aligned} \\] La somme correcte est <b>"+u5M(5,6)+"</b>. Remarque que 2/5 est plus petit que 1/2, donc ce ne peut pas être la somme de 1/2 et d'une quantité positive.",
      {mode:"reasonable-1"});
  },
  function(){
    return mcq("Priya dit que la réponse à "+u5M(7,8)+" - "+u5M(1,4)+" est "+u5M(6,4)+", en disant qu'elle a soustrait les numérateurs et les dénominateurs. Quelle est la différence correcte ?",
      {t:u5M(5,8),fb:"Oui : réécrire 1/4 sous la forme 2/8 donne 7/8 - 2/8 = 5/8."},
      [{t:u5M(6,4),fb:"C'est la réponse de Priya, et elle est aussi plus grande que la quantité de départ, donc ce ne peut pas être une différence ici."},
       {t:u5M(6,8),fb:"Cela soustrait les numérateurs, mais oublie de réécrire d'abord 1/4 en huitièmes."},
       {t:u5M(3,8),fb:"Cela réécrit 1/4 sous la forme 2/8, mais soustrait ensuite 4 au lieu de 2 au numérateur."}],
      "Réécris "+u5M(1,4)+" avec le dénominateur 8.\\[ \\begin{aligned} "+FR(7,8)+" - "+FR(1,4)+" &= "+FR(7,8)+" - "+FR(2,8)+" \\\\ &= "+FR(5,8)+" \\end{aligned} \\] La différence correcte est <b>"+u5M(5,8)+"</b>.",
      {mode:"reasonable-2"});
  },
  function(){
    return mcq("Une recette demande "+u5M(3,4)+" d'une tasse de sucre. Ben mesure "+u5M(5,4)+" d'une tasse et dit que c'est exactement la bonne quantité. Quel énoncé explique le mieux la vérification ?",
      {t:"Ben en a mesuré trop : 5/4 est plus qu'une tasse entière, et 3/4 est moins qu'une tasse entière.",fb:"Oui : comparer chaque quantité au repère d'une tasse entière montre que 5/4, c'est trop."},
      [{t:"Ben a raison : 5/4 et 3/4 ont le même dénominateur, donc ils sont égaux, quels que soient les numérateurs.", fb:"Avoir le même dénominateur ne rend pas des fractions égales. Les numérateurs 5 et 3 sont différents."},
       {t:"Ben en a mesuré trop peu : 5/4 est plus petit que 3/4 parce que 5 est plus grand que 3, selon ce raisonnement.", fb:"Avec le même dénominateur, un numérateur plus grand donne une fraction plus grande, et non plus petite."},
       {t:"Il n'y a aucun moyen de comparer les quantités sans dénominateur commun dans cette question.", fb:"Les dénominateurs sont déjà les mêmes ici, et la comparaison avec une tasse entière règle la question."}],
      "Compare les deux quantités avec une tasse entière. "+u5M(3,4)+" est moins qu'une tasse entière, tandis que "+u5M(5,4)+" est une tasse entière plus "+u5M(1,4)+". Donc <b>Ben en a mesuré trop</b>.",
      {mode:"reasonable-3"});
  },
  function(){
    return mcq("Mia calcule "+"\\("+u5disp(9,4)+"\\)"+" - "+"\\("+u5disp(5,4)+"\\)"+" et écrit la réponse "+u5M(4,8)+". Quelle est la réponse correcte sous sa forme la plus simple ?",
      {t:u5M(1,1),fb:"Oui : la différence est 4/4, ce qui est exactement un tout."},
      [{t:"\\(\\frac{4}{8}\\)",fb:"C'est la réponse de Mia. Elle a changé le dénominateur pour 8, mais les parties sont des quarts et restent des quarts."},
       {t:"\\(\\frac{2}{4}\\)",fb:"Cela utilise le numérateur 2, mais 9 - 5 = 4, et non 2."},
       {t:u5M(14,4),fb:"Cela additionne les numérateurs, ce qui donne 14/4. La question demande une différence, donc on soustrait les numérateurs."}],
      "Soustrais les parties entières et les parties fractionnaires, ou travaille en quarts du début à la fin.\\[ \\begin{aligned} "+u5disp(9,4)+" - "+u5disp(5,4)+" &= "+FR(4,4)+" \\\\ &= 1 \\end{aligned} \\] La réponse correcte est <b>1</b>.",
      {mode:"reasonable-4"});
  },
  function(){
    return mcq("Un réservoir est rempli à "+u5M(5,6)+". Noah dit qu'après avoir utilisé "+u5M(1,3)+" du réservoir, la quantité restante doit être plus grande que "+u5M(5,6)+", parce que la soustraction rend les fractions plus grandes. Quelle est la quantité correcte qui reste ?",
      {t:u5M(1,2),fb:"Oui : réécrire 1/3 sous la forme 2/6 donne 5/6 - 2/6 = 3/6 = 1/2, ce qui est plus petit que 5/6, comme il se doit."},
      [{t:u5M(7,6),fb:"Cela additionne les quantités réécrites. Utiliser une partie du réservoir rend la quantité plus petite, et non plus grande."},
       {t:u5M(4,6),fb:"Cela soustrait les numérateurs sans d'abord réécrire 1/3 en sixièmes."},
       {t:u5M(5,6),fb:"C'est la quantité de départ. Une partie du réservoir a été utilisée, donc la quantité restante doit être plus petite."}],
      "Réécris "+u5M(1,3)+" avec le dénominateur 6.\\[ \\begin{aligned} "+FR(5,6)+" - "+FR(1,3)+" &= "+FR(5,6)+" - "+FR(2,6)+" \\\\ &= "+FR(3,6)+" \\\\ &= "+u5disp(3,6)+" \\end{aligned} \\] La quantité restante est <b>"+u5M(3,6)+"</b>.",
      {mode:"reasonable-5"});
  }
]), ["Vérifie l'affirmation avec un repère ou en refaisant le calcul avec un dénominateur commun.", "Commence par te demander si la réponse annoncée a même la bonne taille pour la question."]);

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
    var item=pick(["ruban","fil","ficelle"]);
    prompt="Un rouleau de "+item+" mesure "+"\\("+A+"\\)"+" mètres de long. Une classe utilise "+"\\("+B+"\\)"+" mètres le lundi et "+"\\("+C+"\\)"+" mètres le mercredi. Combien de mètres reste-t-il ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    sol="Additionne les deux quantités utilisées, puis soustrais le total de la longueur de départ.\\[ \\begin{aligned} "+B+" + "+C+" &= "+u5disp(used,d)+" \\\\ "+A+" - "+u5disp(used,d)+" &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  }else{
    var wA2=ri(2,4),nA2=ri(1,d-1),wB2=ri(1,3),nB2=ri(1,d-1),wC2=ri(1,2),nC2=ri(1,d-1);
    var tot=(wA2+wB2)*d+nA2+nB2;var cut=wC2*d+nC2;var cnt2=0;
    while(cut>=tot&&cnt2<30){nC2=ri(1,d-1);cut=wC2*d+nC2;cnt2++;}
    if(cut>=tot){nC2=1;cut=wC2*d+1;}
    N=tot-cut;A=u5disp(wA2*d+nA2,d);B=u5disp(wB2*d+nB2,d);C=u5disp(wC2*d+nC2,d);
    prompt="Deux planches mesurant "+"\\("+A+"\\)"+" mètres et "+"\\("+B+"\\)"+" mètres sont jointes bout à bout. Ensuite, un morceau de "+"\\("+C+"\\)"+" mètres de long est coupé de la planche jointe. Combien de mètres reste-t-il ? Donne ta réponse comme une fraction ou un nombre fractionnaire sous sa forme la plus simple.";
    sol="Joindre les planches est une addition, et couper un morceau est une soustraction.\\[ \\begin{aligned} "+A+" + "+B+" &= "+u5disp(tot,d)+" \\\\ "+u5disp(tot,d)+" - "+C+" &= "+u5disp(N,d)+" \\end{aligned} \\] La réponse est <b>"+u5M(N,d)+"</b>.";
  }
  return textq(prompt,u5accept(N,d),sol,{mode:"mixed-multistep-"+mode,d:d});
}, ["Ce problème a deux étapes : combine d'abord les quantités, ou additionne les quantités utilisées avant de soustraire.", "Commence par décider quelle opération la première étape de l'histoire demande."]);

/* ----- bank-u6.js ----- */
// Math 7 (French) Unit 6 Equations question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 2829 to 3399).
// CRMARKS: u6-problem-two-step-cr=3
// CRMARKS: u6-one-step-problem-cr=3
// CRMARKS: u6-preservation-problem-cr=2
// CRMARKS: u6-model-solve-cr=3
// CRMARKS: u6-solve-challenge-cr=3
/* TRANSLATOR NOTES
   - Termes du guide 7e appliqués: préservation de l'égalité, équation
     linéaire, inspection et essai systématique, carreaux algébriques,
     jetons, terme constant, coefficient numérique.
   - Choix quand le glossaire est silencieux: balance (instrument) =
     balance, pan = plateau, loose units = unités libres, left side =
     côté gauche, right side = côté droit (précédent Math 8/9 FR);
     call-out fee = frais de déplacement, booking fee = frais de
     réservation, sitting fee = frais de séance, pickup fee = frais de
     prise en charge, joining fee = frais d'adhésion.
   - Lignes FMT-GEOM laissées en fmt( (5), chacune marquée sur sa ligne:
     toutes les lignes fmt( de u6numLineSVG (lignes des graduations, des
     marques, du chemin du saut, du polygone et de l'étiquette du saut),
     où fmt( alimente des attributs et coordonnées SVG (x1, cx, x, d,
     points). Aucun fmt( d'affichage, aucun fmtF( et aucun .toFixed(
     dans ce morceau.
   - Argent: les montants générés déplacent le $ après le montant
     (p. ex. "+b+" $); aucun montant littéral en dollars dans la prose.
     Aucun pourcentage dans ce morceau.
   - Décimale littérale: la réponse d'Ana, 6.5, devient 6,5 (dans
     l'énoncé et dans l'option). Les décimales des attributs SVG
     (stroke-width, viewBox) restent avec un point: ce ne sont pas des
     nombres affichés.
   - L'étiquette visible "start" de la droite numérique devient
     "départ". Les valeurs u des modèles sont traduites car elles
     entrent dans le texte affiché: kilometres = kilomètres, planters
     = jardinières, rentals = locations, programs = programmes,
     hours = heures, parts = pièces, students = élèves, prints =
     tirages, guests = invités, boxes = boîtes, lift days = jours de
     ski, trays = plateaux. Les noms propres (Sam, Rae, Tom, Ana, Leo,
     Kim) restent inchangés.
*/
/* ===== Unit 6 ===== */
/* Unit 6: Equations (codes 8.1-8.17 as placed in the Unit 6 slice) */
function u6iopts(corr,errs){
  var seen={};seen[corr]=1;var out=[];
  function tryAdd(v,fb){if(out.length>=3)return;if(v===undefined||v===null||isNaN(v))return;v=Math.round(v);if(seen[v])return;seen[v]=1;out.push({t:String(v),fb:fb});}
  errs.forEach(function(e){tryAdd(e.v,e.fb);});
  [corr+1,corr-1,corr+2,corr-2,corr+10,corr-10,corr+3].forEach(function(v){tryAdd(v,"Cette valeur ne satisfait pas l'équation. Essaie les opérations inverses de la solution.");});
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
  out+='<text x="170" y="140" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+(note||"Le fléau est horizontal : les deux plateaux sont en équilibre.")+'</text>';
  return out+'</svg>';
}
function u6numLineSVG(min,max,marks,jumpFrom,jumpTo,jumpLabel){
  var W=340,x0=25,x1=315;function X(v){return x0+(v-min)*(x1-x0)/(max-min);}
  var out='<svg viewBox="0 0 340 120" xmlns="http://www.w3.org/2000/svg" role="img">';
  out+='<line x1="'+x0+'" y1="78" x2="'+x1+'" y2="78" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<polygon points="'+x1+',78 '+(x1-8)+',73 '+(x1-8)+',83" fill="'+FIG_INK+'"/>';
  for(var v=min;v<=max;v++){out+='<line x1="'+fmt(X(v),1)+'" y1="73" x2="'+fmt(X(v),1)+'" y2="83" stroke="'+FIG_INK+'" stroke-width="1.4"/><text x="'+fmt(X(v),1)+'" y="100" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+v+'</text>';} /* FMT-GEOM */
  marks.forEach(function(m){out+='<circle cx="'+fmt(X(m.v),1)+'" cy="78" r="4.5" fill="'+FIG_ALT+'"/><text x="'+fmt(X(m.v),1)+'" y="58" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+m.label+'</text>';}); /* FMT-GEOM */
  if(jumpFrom!==null&&jumpFrom!==undefined){
    out+='<path d="M '+fmt(X(jumpFrom),1)+' 62 Q '+fmt((X(jumpFrom)+X(jumpTo))/2,1)+' 26 '+fmt(X(jumpTo),1)+' 62" fill="none" stroke="'+FIG_ACC+'" stroke-width="2"/>'; /* FMT-GEOM */
    out+='<polygon points="'+fmt(X(jumpTo),1)+',62 '+fmt(X(jumpTo)-5,1)+',52 '+fmt(X(jumpTo)+5,1)+',52" fill="'+FIG_ACC+'"/>'; /* FMT-GEOM */
    out+='<text x="'+fmt((X(jumpFrom)+X(jumpTo))/2,1)+'" y="20" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+jumpLabel+'</text>'; /* FMT-GEOM */
  }
  return out+'</svg>';
}

E("u6-inspection-trial", 6, ["8.14"], 1, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["times","plus","trial"]);
  var a,x,b,sol,prompt,errs;
  if(mode==="times"){
    a=ri(2,9);x=ri(2,12);b=a*x;
    prompt="Résous \\("+a+v+" = "+b+"\\) par inspection.";
    sol="L'inspection, c'est trouver la valeur qui rend l'équation vraie : "+a+" fois quoi donne "+b+" ?\\[ \\begin{aligned} "+a+v+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b-a,fb:"Cela soustrait "+a+" de "+b+". Dans "+a+v+", la variable est multipliée par "+a+", alors divise plutôt."},{v:x+1,fb:"Vérifie : "+a+" fois "+(x+1)+" donne "+(a*(x+1))+", et non "+b+"."},{v:b+a,fb:"Cela additionne "+a+" et "+b+", ce qui donne une valeur beaucoup trop grande."}];
    return mcq(prompt,{t:String(x),fb:"Oui : "+a+" fois "+x+" donne "+b+", alors l'équation est vraie."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }else if(mode==="plus"){
    a=ri(2,15);x=ri(2,15);b=x+a;
    prompt="Résous \\("+v+" + "+a+" = "+b+"\\) par inspection.";
    sol="Trouve la valeur qui rend l'équation vraie : quoi plus "+a+" donne "+b+" ?\\[ \\begin{aligned} "+v+" + "+a+" &= "+b+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>.";
    errs=[{v:b+a,fb:"Cela additionne "+a+" et "+b+". La valeur ajoutée à "+a+" doit être plus petite que "+b+" ici."},{v:x+1,fb:"Vérifie : "+(x+1)+" + "+a+" donne "+(x+1+a)+", et non "+b+"."},{v:a,fb:"C'est le nombre ajouté à la variable, et non la valeur de la variable."}];
    return mcq(prompt,{t:String(x),fb:"Oui : "+x+" + "+a+" donne "+b+", alors l'équation est vraie."},u6iopts(x,errs),sol,{mode:mode,a:a});
  }
  a=ri(2,6);x=ri(3,9);b=ri(1,10);var c=a*x+b;
  var t1=x-1,t2=x+1;
  prompt="Un élève résout \\("+a+v+" + "+b+" = "+c+"\\) par essai systématique. L'essai \\("+v+" = "+t1+"\\) donne un côté gauche de "+(a*t1+b)+". L'essai \\("+v+" = "+t2+"\\) donne un côté gauche de "+(a*t2+b)+". Quelle est la solution ?";
  sol="Le côté gauche doit donner "+c+". L'essai "+t1+" donne "+(a*t1+b)+", ce qui est trop petit, et l'essai "+t2+" donne "+(a*t2+b)+", ce qui est trop grand, alors la solution se trouve entre les deux.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+"("+x+") + "+b+" &= "+(a*x+b)+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>.";
  errs=[{v:t1,fb:"Cet essai donne un côté gauche de "+(a*t1+b)+", et non "+c+", alors il est trop petit."},{v:t2,fb:"Cet essai donne un côté gauche de "+(a*t2+b)+", et non "+c+", alors il est trop grand."},{v:x+2,fb:"Les essais encadrent la réponse entre "+t1+" et "+t2+", alors elle ne peut pas être aussi grande que "+(x+2)+"."}];
  return mcq(prompt,{t:String(x),fb:"Oui : en substituant "+x+", le côté gauche donne "+c+"."},u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
}, ["L'inspection, c'est trouver la valeur qui rend l'équation vraie, et l'essai, c'est tester des valeurs en ordre.", "Commence par te demander quelle valeur, placée dans l'équation, rend les deux côtés égaux."]);

E("u6-preservation-next", 6, ["8.1","8.2"], 1, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["plus","minus","times"]);
  var prompt,corr,distr,sol;
  if(mode==="plus"){
    var a=ri(2,12),b=ri(a+2,a+16);
    prompt="Pour résoudre \\("+v+" + "+a+" = "+b+"\\), quelle étape isole \\("+v+"\\) et garde l'équation en équilibre ?";
    corr={t:"Soustraire "+a+" des deux côtés.",fb:"Oui : soustraire la même quantité des deux côtés garde l'équilibre et laisse "+v+" seul de son côté."};
    distr=[{t:"Soustraire "+a+" à gauche seulement.",fb:"Cela change un seul côté, alors les deux côtés ne seraient plus égaux."},
           {t:"Additionner "+a+" aux deux côtés.",fb:"Cela garde l'équilibre, mais on s'éloigne d'isoler "+v+" : le côté gauche deviendrait "+v+" + "+(2*a)+"."},
           {t:"Soustraire "+b+" des deux côtés.",fb:"Cela garde l'équilibre, mais cela n'enlève pas le "+a+" ajouté à "+v+"."}];
    sol="Préservation de l'égalité : ce qu'on fait à un côté doit être fait à l'autre. Le "+a+" ajouté à "+v+" se défait en soustrayant "+a+", et il faut le faire des deux côtés.\\[ \\begin{aligned} "+v+" + "+a+" - "+a+" &= "+b+" - "+a+" \\\\ "+v+" &= "+(b-a)+" \\end{aligned} \\] L'étape est <b>soustraire "+a+" des deux côtés</b>.";
  }else if(mode==="minus"){
    var a2=ri(2,12),b2=ri(2,16);if(b2===a2)b2=a2+3;
    prompt="Pour résoudre \\("+v+" - "+a2+" = "+b2+"\\), quelle étape isole \\("+v+"\\) et garde l'équation en équilibre ?";
    corr={t:"Additionner "+a2+" aux deux côtés.",fb:"Oui : additionner la même quantité aux deux côtés garde l'équilibre et laisse "+v+" seul de son côté."};
    distr=[{t:"Additionner "+a2+" à droite seulement.",fb:"Cela change un seul côté, alors les deux côtés ne seraient plus égaux."},
           {t:"Soustraire "+a2+" des deux côtés.",fb:"Cela garde l'équilibre, mais on s'éloigne d'isoler "+v+" : le côté gauche deviendrait "+v+" - "+(2*a2)+"."},
           {t:"Additionner "+b2+" aux deux côtés.",fb:"Cela garde l'équilibre, mais cela n'enlève pas le "+a2+" soustrait de "+v+"."}];
    sol="Préservation de l'égalité : ce qu'on fait à un côté doit être fait à l'autre. Le "+a2+" soustrait de "+v+" se défait en additionnant "+a2+", et il faut le faire des deux côtés.\\[ \\begin{aligned} "+v+" - "+a2+" + "+a2+" &= "+b2+" + "+a2+" \\\\ "+v+" &= "+(b2+a2)+" \\end{aligned} \\] L'étape est <b>additionner "+a2+" aux deux côtés</b>.";
  }else{
    var a3=ri(2,9),x3=ri(2,12),b3=a3*x3;
    prompt="Pour résoudre \\("+a3+v+" = "+b3+"\\), quelle étape isole \\("+v+"\\) et garde l'équation en équilibre ?";
    corr={t:"Diviser les deux côtés par "+a3+".",fb:"Oui : diviser les deux côtés par le même nombre garde l'équilibre et laisse "+v+" seul de son côté."};
    distr=[{t:"Diviser à gauche par "+a3+" seulement.",fb:"Cela change un seul côté, alors les deux côtés ne seraient plus égaux."},
           {t:"Multiplier les deux côtés par "+a3+".",fb:"Cela garde l'équilibre, mais on s'éloigne d'isoler "+v+" : le côté gauche deviendrait "+(a3*a3)+v+"."},
           {t:"Soustraire "+a3+" des deux côtés.",fb:"Dans "+a3+v+", la variable est multipliée par "+a3+", et la soustraction ne défait pas la multiplication."}];
    sol="Préservation de l'égalité : ce qu'on fait à un côté doit être fait à l'autre. La multiplication par "+a3+" se défait en divisant par "+a3+", et il faut le faire des deux côtés.\\[ \\begin{aligned} "+a3+v+" \\div "+a3+" &= "+b3+" \\div "+a3+" \\\\ "+v+" &= "+x3+" \\end{aligned} \\] L'étape est <b>diviser les deux côtés par "+a3+"</b>.";
  }
  return mcq(prompt,corr,distr,sol,{mode:mode});
}, ["Une équation reste en équilibre seulement quand la même opération est appliquée aux deux côtés.", "Commence par repérer l'opération liée à la variable, puis choisis son inverse des deux côtés."]);

E("u6-one-step-balance", 6, ["8.9","8.8"], 1, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,9),x=ri(2,12),b=x+a;
  var q=mcq("La balance du diagramme modélise l'équation \\("+v+" + "+a+" = "+b+"\\). Quelle est la valeur de \\("+v+"\\) ?",
    {t:String(x),fb:"Oui : en enlevant "+a+" des deux plateaux, il reste "+v+" seul face à "+b+" - "+a+" = "+x+"."},
    u6iopts(x,[{v:b+a,fb:"Cela additionne les deux nombres sur les plateaux. Le "+a+" à côté de "+v+" doit être enlevé, et non ajouté."},{v:x+1,fb:"Vérifie les plateaux : "+b+" - "+a+" = "+x+", et non "+(x+1)+"."},{v:a,fb:"C'est la quantité sur le plateau à côté de "+v+", et non la valeur de "+v+" lui-même."}]),
    "Le diagramme montre "+v+" avec "+a+" sur un plateau, en équilibre avec "+b+" sur l'autre. Enlève "+a+" des deux plateaux pour garder l'équilibre.\\[ \\begin{aligned} "+v+" + "+a+" &= "+b+" \\\\ "+v+" &= "+b+" - "+a+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>.",
    {mode:"one-step-balance",a:a,b:b});
  q.figure=u6balanceSVG(v+" + "+a,String(b));
  return q;
}, ["Les plateaux sont en équilibre, alors en enlevant la même quantité des deux plateaux, ils restent en équilibre.", "Commence par enlever des deux plateaux le nombre libre à côté de la variable."]);

E("u6-substitute-check", 6, ["8.17","8.11"], 1, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["plus","twostep"]);
  var prompt,sol,corr,errs,lhs;
  if(mode==="plus"){
    var a=ri(2,14),b=ri(6,24),x=b-a;var cand=(pick([true,false])?x:x+pick([1,2,-1]));
    if(cand<0)cand=x+1;
    lhs=cand+a;
    prompt="Substitue \\("+v+" = "+cand+"\\) dans l'équation \\("+v+" + "+a+" = "+b+"\\). Quelle est la valeur du côté gauche ?";
    corr={t:String(lhs),fb:"Oui : en remplaçant "+v+" par "+cand+", on obtient "+cand+" + "+a+" = "+lhs+"." };
    errs=[{v:cand-a,fb:"Cela soustrait "+a+". L'équation additionne "+a+" à la variable, alors additionne."},{v:b,fb:"C'est le côté droit de l'équation. La question demande la valeur du côté gauche après la substitution."},{v:cand*a,fb:"Cela multiplie par "+a+". L'équation additionne "+a+" à la variable, alors additionne."}];
    sol="La substitution, c'est remplacer la variable par la valeur donnée partout où elle apparaît.\\[ \\begin{aligned} "+v+" + "+a+" &= "+cand+" + "+a+" \\\\ &= "+lhs+" \\end{aligned} \\] Le côté gauche vaut <b>"+lhs+"</b>, alors "+cand+" "+(lhs===b?"est une solution":"n'est pas une solution")+" de l'équation.";
    return mcq(prompt,corr,u6iopts(lhs,errs),sol,{mode:mode,cand:cand});
  }
  var a2=ri(2,6),b2=ri(1,10),x2=ri(2,10),c2=a2*x2+b2;var cand2=(pick([true,false])?x2:x2+pick([1,2]));
  lhs=a2*cand2+b2;
  prompt="Substitue \\("+v+" = "+cand2+"\\) dans l'équation \\("+a2+v+" + "+b2+" = "+c2+"\\). Quelle est la valeur du côté gauche ?";
  corr={t:String(lhs),fb:"Oui : en remplaçant "+v+" par "+cand2+", on obtient "+a2+"("+cand2+") + "+b2+" = "+lhs+"." };
  errs=[{v:a2*cand2-b2,fb:"Cela soustrait "+b2+" à la fin. L'équation additionne "+b2+", alors additionne-le."},{v:(a2+b2)*cand2,fb:"Cela additionne d'abord le coefficient numérique et le terme constant. Multiplie "+a2+" par "+cand2+" d'abord, puis additionne "+b2+"."},{v:c2,fb:"C'est le côté droit de l'équation. La question demande la valeur du côté gauche après la substitution."}];
  sol="La substitution, c'est remplacer la variable par la valeur donnée partout où elle apparaît, puis suivre la priorité des opérations.\\[ \\begin{aligned} "+a2+v+" + "+b2+" &= "+a2+"("+cand2+") + "+b2+" \\\\ &= "+(a2*cand2)+" + "+b2+" \\\\ &= "+lhs+" \\end{aligned} \\] Le côté gauche vaut <b>"+lhs+"</b>, alors "+cand2+" "+(lhs===c2?"est une solution":"n'est pas une solution")+" de l'équation.";
  return mcq(prompt,corr,u6iopts(lhs,errs),sol,{mode:mode,cand:cand2});
}, ["La substitution, c'est remplacer la variable par la valeur donnée partout où elle apparaît.", "Commence par réécrire le côté gauche avec la valeur donnée à la place de la variable."]);

E("u6-solve-two-step-plus", 6, ["8.14"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);var a=ri(2,9),x=ri(2,12),b=ri(2,15),c=a*x+b;
  var ctx=pick(["pure","gym","books"]);
  var prompt;
  if(ctx==="gym")prompt="Un centre de conditionnement physique demande des frais d'adhésion de "+b+" $ plus "+a+" $ par cours. Un membre paie "+c+" $ en tout. Le nombre de cours, \\("+v+"\\), satisfait \\("+a+v+" + "+b+" = "+c+"\\). Combien de cours le membre a-t-il suivis ?";
  else if(ctx==="books")prompt="Un club de lecture demande "+b+" $ pour la livraison plus "+a+" $ par livre. Un membre paie "+c+" $ en tout. Le nombre de livres, \\("+v+"\\), satisfait \\("+a+v+" + "+b+" = "+c+"\\). Combien de livres le membre a-t-il commandés ?";
  else prompt="Résous \\("+a+v+" + "+b+" = "+c+"\\).";
  var sol="Défais l'addition d'abord, puis la multiplication, en faisant la même chose aux deux côtés chaque fois.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c-b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>. Vérification : "+a+"("+x+") + "+b+" = "+c+".";
  return mcq(prompt,{t:String(x),fb:"Oui : en soustrayant "+b+", il reste "+a+v+" = "+(c-b)+", et en divisant par "+a+", on obtient "+x+"."},
    u6iopts(x,[{v:c-b,fb:"Cela soustrait "+b+", mais arrête avant de diviser par "+a+". Il reste une étape."},{v:x+a,fb:"Vérifie dans l'équation : "+a+"("+ (x+a) +") + "+b+" donne plus que "+c+"."},{v:Math.floor((c+b)/a),fb:"Cela additionne "+b+" au lieu de le soustraire avant de diviser."}]),
    sol,{mode:"ax-plus-b",a:a,b:b});
}, ["Défais les opérations dans l'ordre inverse : le nombre ajouté d'abord, puis le multiplicateur.", "Commence par soustraire le nombre ajouté des deux côtés."]);

E("u6-solve-other-forms", 6, ["8.14","8.2"], 2, "gen", function(){
  var v=pick(["x","n","m","y","t"]);
  var mode=pick(["minus","divide"]);
  var prompt,sol,corr,errs;
  if(mode==="minus"){
    var a=ri(2,9),x=ri(3,12),b=ri(2,a*x-2),c=a*x-b;
    prompt="Résous \\("+a+v+" - "+b+" = "+c+"\\).";
    sol="Défais la soustraction d'abord, puis la multiplication, en faisant la même chose aux deux côtés chaque fois.\\[ \\begin{aligned} "+a+v+" - "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c+b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>. Vérification : "+a+"("+x+") - "+b+" = "+c+".";
    corr={t:String(x),fb:"Oui : en additionnant "+b+", il reste "+a+v+" = "+(c+b)+", et en divisant par "+a+", on obtient "+x+"." };
    errs=[{v:c+b,fb:"Cela additionne "+b+", mais arrête avant de diviser par "+a+". Il reste une étape."},{v:Math.max(1,Math.floor((c-b)/a)),fb:"Cela soustrait "+b+" au lieu de le rajouter avant de diviser."},{v:x+2,fb:"Vérifie dans l'équation : "+a+"("+(x+2)+") - "+b+" donne plus que "+c+"." }];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode,a:a,b:b});
  }
  var a2=ri(2,9),x2=ri(2,12),b2=x2;
  prompt="Résous \\(\\frac{"+v+"}{"+a2+"} = "+b2+"\\).";
  sol="La variable est divisée par "+a2+", alors défais la division en multipliant les deux côtés par "+a2+".\\[ \\begin{aligned} \\frac{"+v+"}{"+a2+"} &= "+b2+" \\\\ "+v+" &= "+b2+" \\times "+a2+" \\\\ "+v+" &= "+(a2*b2)+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+(a2*b2)+"\\)</b>. Vérification : "+(a2*b2)+" divisé par "+a2+" donne "+b2+".";
  corr={t:String(a2*b2),fb:"Oui : en multipliant les deux côtés par "+a2+", on obtient "+v+" = "+b2+" fois "+a2+" = "+(a2*b2)+"." };
  errs=[{v:b2+a2,fb:"Cela additionne le diviseur. La variable est divisée par "+a2+", alors multiplie pour défaire la division."},{v:b2,fb:"C'est le résultat après la division, et non la valeur de la variable elle-même."},{v:Math.max(1,b2-a2),fb:"Cela soustrait le diviseur. La variable est divisée par "+a2+", alors multiplie pour défaire la division."}];
  return mcq(prompt,corr,u6iopts(a2*b2,errs),sol,{mode:mode,a:a2});
}, ["Regarde la forme de l'équation et défais chaque opération avec son inverse, des deux côtés.", "Commence par défaire l'addition ou la soustraction, ou par défaire la division si la variable est divisée."]);

E("u6-equivalent-form", 6, ["8.3"], 1, "gen", function(){
  var v=pick(["x","n","m","y","b","r"]);
  var mode=pick(["add","subtract","multiply"]);
  var a=ri(2,8),x=ri(2,10),rhs=a*x;
  var base="\\("+a+v+" = "+rhs+"\\)";
  var prompt,corr,distr,sol;
  if(mode==="add"){
    var k=ri(2,12);
    prompt="Quelle équation est équivalente à "+base+" après l'application de la préservation de l'égalité ?";
    corr={t:"\\("+a+v+" + "+k+" = "+(rhs+k)+"\\)",fb:"Oui : "+k+" est additionné aux deux côtés, alors l'équation reste en équilibre avec la même solution."};
    distr=[{t:"\\("+a+v+" + "+k+" = "+rhs+"\\)",fb:"Cela additionne "+k+" au côté gauche seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+a+v+" = "+(rhs+k)+"\\)",fb:"Cela additionne "+k+" au côté droit seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+a+v+" - "+k+" = "+(rhs+k)+"\\)",fb:"Cela soustrait d'un côté et additionne de l'autre, alors les côtés ne sont plus égaux."}];
    sol="Une équation équivalente vient de faire exactement la même chose aux deux côtés. Additionner "+k+" aux deux côtés de "+base+" donne \\("+a+v+" + "+k+" = "+(rhs+k)+"\\) , et les deux formes ont la même solution, \\("+v+" = "+x+"\\). La réponse est <b>\\("+a+v+" + "+k+" = "+(rhs+k)+"\\)</b>.";
  }else if(mode==="subtract"){
    var k2=ri(2,Math.min(12,rhs-2));
    prompt="Quelle équation est équivalente à "+base+" après l'application de la préservation de l'égalité ?";
    corr={t:"\\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\)",fb:"Oui : "+k2+" est soustrait des deux côtés, alors l'équation reste en équilibre avec la même solution."};
    distr=[{t:"\\("+a+v+" - "+k2+" = "+rhs+"\\)",fb:"Cela soustrait "+k2+" du côté gauche seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+a+v+" = "+(rhs-k2)+"\\)",fb:"Cela soustrait "+k2+" du côté droit seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+a+v+" + "+k2+" = "+(rhs-k2)+"\\)",fb:"Cela additionne d'un côté et soustrait de l'autre, alors les côtés ne sont plus égaux."}];
    sol="Une équation équivalente vient de faire exactement la même chose aux deux côtés. Soustraire "+k2+" des deux côtés de "+base+" donne \\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\) , et les deux formes ont la même solution, \\("+v+" = "+x+"\\). La réponse est <b>\\("+a+v+" - "+k2+" = "+(rhs-k2)+"\\)</b>.";
  }else{
    var k3=ri(2,5);
    prompt="Quelle équation est équivalente à "+base+" après l'application de la préservation de l'égalité ?";
    corr={t:"\\("+(a*k3)+v+" = "+(rhs*k3)+"\\)",fb:"Oui : les deux côtés sont multipliés par "+k3+", alors l'équation reste en équilibre avec la même solution."};
    distr=[{t:"\\("+(a*k3)+v+" = "+rhs+"\\)",fb:"Cela multiplie le côté gauche seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+a+v+" = "+(rhs*k3)+"\\)",fb:"Cela multiplie le côté droit seulement. Les deux côtés doivent changer de la même façon."},
           {t:"\\("+(a+k3)+v+" = "+(rhs+k3)+"\\)",fb:"Cela additionne "+k3+" à chaque côté au lieu de multiplier. L'addition donne une forme équivalente différente du multiplicateur montré à gauche."}];
    sol="Une équation équivalente vient de faire exactement la même chose aux deux côtés. Multiplier les deux côtés de "+base+" par "+k3+" donne \\("+(a*k3)+v+" = "+(rhs*k3)+"\\) , et les deux formes ont la même solution, \\("+v+" = "+x+"\\). La réponse est <b>\\("+(a*k3)+v+" = "+(rhs*k3)+"\\)</b>.";
  }
  return mcq(prompt,corr,distr,sol,{mode:mode,a:a});
}, ["Les équations équivalentes viennent de faire exactement la même opération aux deux côtés.", "Commence par vérifier, pour chaque choix, si les deux côtés ont été changés de la même façon."]);

E("u6-balance-figure", 6, ["8.1","8.13","8.3"], 1, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,6),x=ri(2,10),b=ri(2,9),c=a*x+b;
  var q=mcq("La balance du diagramme modélise \\("+a+v+" + "+b+" = "+c+"\\). Les "+b+" unités libres sont enlevées des deux plateaux. Quelle équation montre le résultat ?",
    {t:"\\("+a+v+" = "+(c-b)+"\\)",fb:"Oui : en enlevant "+b+" des deux plateaux, il reste "+a+v+" sur un plateau, en équilibre avec "+(c-b)+" sur l'autre."},
    [{t:"\\("+a+v+" + "+b+" = "+(c-b)+"\\)",fb:"Cela enlève les unités du plateau droit seulement. Les deux plateaux doivent perdre la même quantité."},
     {t:"\\("+a+v+" = "+c+"\\)",fb:"Cela enlève les unités du plateau gauche seulement. Les deux plateaux doivent perdre la même quantité."},
     {t:"\\("+a+v+" + "+(2*b)+" = "+(c+b)+"\\)",fb:"Cela ajoute des unités aux plateaux. L'étape du diagramme enlève des unités des deux plateaux."}],
    "Enlever la même quantité des deux plateaux garde l'équilibre et donne une équation équivalente.\\[ \\begin{aligned} "+a+v+" + "+b+" - "+b+" &= "+c+" - "+b+" \\\\ "+a+v+" &= "+(c-b)+" \\end{aligned} \\] L'équation obtenue est <b>\\("+a+v+" = "+(c-b)+"\\)</b>.",
    {mode:"balance-figure",a:a,b:b});
  q.figure=u6balanceSVG(a+v+" + "+b,String(c));
  return q;
}, ["Une balance reste horizontale quand la même quantité est enlevée des deux plateaux.", "Commence par soustraire les unités libres de la quantité montrée sur chaque plateau."]);

E("u6-model-problem", 6, ["8.12"], 2, "gen", function(){
  var a=ri(2,9),b=ri(2,15);var cnt=0;while(a===b&&cnt<20){b=ri(2,15);cnt++;}
  if(a===b)b=a+3;
  var x=ri(3,12),c=a*x+b;
  var tpl=pick([
    {p:"Un trajet en taxi coûte des frais de prise en charge de "+b+" $ plus "+a+" $ par kilomètre. Un trajet coûte "+c+" $ en tout. Soit \\(x\\) le nombre de kilomètres.",u:"kilomètres"},
    {p:"Un jardinier demande des frais de déplacement de "+b+" $ plus "+a+" $ par jardinière. Un travail coûte "+c+" $ en tout. Soit \\(x\\) le nombre de jardinières.",u:"jardinières"},
    {p:"Un forfait de diffusion coûte "+b+" $ pour s'abonner plus "+a+" $ par location de film. Un membre paie "+c+" $ en tout. Soit \\(x\\) le nombre de locations.",u:"locations"},
    {p:"Une école imprime des programmes pour "+b+" $ de frais d'installation plus "+a+" $ par programme. Le coût total est de "+c+" $. Soit \\(x\\) le nombre de programmes.",u:"programmes"}
  ]);
  var prompt=tpl.p+" Quelle équation modélise ce problème ?";
  var sol="Le total, c'est les frais fixes plus le coût par unité fois le nombre d'unités.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\end{aligned} \\] L'équation de modélisation est <b>\\("+a+"x + "+b+" = "+c+"\\)</b>.";
  return mcq(prompt,
    {t:"\\("+a+"x + "+b+" = "+c+"\\)",fb:"Oui : le coût par unité, "+a+", est multiplié par x, les frais fixes, "+b+", sont additionnés, et le total est "+c+"."},
    [{t:"\\("+a+"x - "+b+" = "+c+"\\)",fb:"Cela soustrait les frais fixes. Les frais font partie du coût total, alors ils sont additionnés."},
     {t:"\\("+b+"x + "+a+" = "+c+"\\)",fb:"Cela échange les deux nombres : les frais fixes, "+b+", seraient facturés par unité, ce qui ne correspond pas au problème."},
     {t:"\\(\\frac{x}{"+a+"} + "+b+" = "+c+"\\)",fb:"Cela divise x par le coût par unité. Le coût augmente de "+a+" pour chaque unité, alors x est multiplié par "+a+"."}],
    sol,{mode:"model-problem",a:a,b:b});
}, ["Divise le total en une partie fixe et une partie qui grandit avec l'inconnue.", "Commence par te demander quelle quantité est facturée une fois et quelle quantité est facturée par unité."]);

E("u6-problem-two-step-cr", 6, ["8.12","8.15"], 2, "gen", function(){
  var a=ri(2,9),b=ri(3,18),x=ri(3,14),c=a*x+b;
  var tpl=pick([
    {p:"Un plombier demande des frais de déplacement de "+b+" $ plus "+a+" $ par heure de travail. Une réparation coûte "+c+" $ en tout. Combien d'heures la réparation a-t-elle duré ?",u:"heures"},
    {p:"Un atelier de vélos demande "+b+" $ pour une inspection de mise au point plus "+a+" $ par pièce remplacée. Une facture s'élève à "+c+" $. Combien de pièces ont été remplacées ?",u:"pièces"},
    {p:"Un entraîneur loue un autobus pour "+b+" $ plus "+a+" $ par élève pour les billets. Le coût total est de "+c+" $. Combien d'élèves sont allés en excursion ?",u:"élèves"},
    {p:"Un studio photo demande des frais de séance de "+b+" $ plus "+a+" $ par tirage. Un client paie "+c+" $ en tout. Combien de tirages le client a-t-il commandés ?",u:"tirages"}
  ]);
  var sol="Soit \\(x\\) le nombre de "+tpl.u+". Le total, c'est les frais fixes plus le coût par unité, ce qui donne l'équation, et la résoudre note le processus.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] La réponse est <b>"+x+" "+tpl.u+"</b>. Vérification : "+a+"("+x+") + "+b+" = "+c+".";
  return numq(tpl.p+" Donne ta réponse comme un nombre de "+tpl.u+".",x,0,sol,{mode:"problem-two-step",a:a,b:b});
}, ["Modélise le problème avec une équation : une quantité fixe plus une quantité par unité égale le total.", "Commence par écrire l'équation, puis défais les frais ajoutés des deux côtés."]);

E("u6-one-step-problem", 6, ["8.7","8.9"], 1, "gen", function(){
  var mode=pick(["rise","fall","deposit","score"]);
  var prompt,sol,corr,errs,x;
  if(mode==="rise"){
    var a=ri(2,12);x=ri(-4,14);var b=x+a;
    prompt="La température à l'aube était un nombre de degrés inconnu. À midi, elle avait monté de "+a+" degrés pour atteindre "+b+" degrés. Quelle était la température à l'aube, en degrés ?";
    sol="Soit \\(t\\) la température à l'aube. Le problème est représenté par une équation à une étape, avec des jetons ou une droite numérique en tête : monter, c'est additionner.\\[ \\begin{aligned} t + "+a+" &= "+b+" \\\\ t &= "+x+" \\end{aligned} \\] La température à l'aube était de <b>"+x+" degrés</b>.";
    corr={t:String(x),fb:"Oui : "+x+" + "+a+" = "+b+", alors l'équation est satisfaite."};
    errs=[{v:b+a,fb:"Cela additionne la hausse à la température de midi. La température à l'aube doit être plus petite que celle de midi ici."},{v:a,fb:"C'est la taille de la hausse, et non la température de départ."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }else if(mode==="fall"){
    var a2=ri(2,12);x=ri(2,16);var b2=x-a2;
    prompt="Un randonneur part d'une altitude inconnue, en mètres. Après une descente de "+a2+" mètres, le randonneur est à "+b2+" mètres. Quelle était l'altitude de départ, en mètres ?";
    sol="Soit \\(e\\) l'altitude de départ. Descendre, c'est soustraire, ce qui donne une équation à une étape.\\[ \\begin{aligned} e - "+a2+" &= "+b2+" \\\\ e &= "+x+" \\end{aligned} \\] L'altitude de départ était de <b>"+x+" mètres</b>.";
    corr={t:String(x),fb:"Oui : "+x+" - "+a2+" = "+b2+", alors l'équation est satisfaite."};
    errs=[{v:b2-a2,fb:"Cela descend une deuxième fois. Pour défaire une descente de "+a2+", additionne "+a2+" à l'altitude finale."},{v:a2,fb:"C'est la taille de la descente, et non l'altitude de départ."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }else if(mode==="deposit"){
    var a3=ri(5,40);x=ri(10,80);var b3=x+a3;
    prompt="Après un dépôt de "+a3+" $, un compte d'épargne contient "+b3+" $. Combien y avait-il dans le compte avant le dépôt, en dollars ?";
    sol="Soit \\(s\\) le montant de départ. Un dépôt s'ajoute au compte, ce qui donne une équation à une étape.\\[ \\begin{aligned} s + "+a3+" &= "+b3+" \\\\ s &= "+x+" \\end{aligned} \\] Le compte contenait <b>"+x+" $</b> avant le dépôt.";
    corr={t:String(x),fb:"Oui : "+x+" + "+a3+" = "+b3+", alors l'équation est satisfaite."};
    errs=[{v:b3+a3,fb:"Cela additionne le dépôt au solde final. Le montant de départ doit être plus petit que le solde final ici."},{v:a3,fb:"C'est la taille du dépôt, et non le montant de départ."}];
    return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
  }
  var a4=ri(3,15);x=ri(5,30);var b4=x-a4;
  prompt="Une équipe perd "+a4+" points à cause d'une pénalité et termine avec "+b4+" points. Combien de points l'équipe avait-elle avant la pénalité ?";
  sol="Soit \\(p\\) les points avant la pénalité. Perdre des points, c'est soustraire, ce qui donne une équation à une étape.\\[ \\begin{aligned} p - "+a4+" &= "+b4+" \\\\ p &= "+x+" \\end{aligned} \\] L'équipe avait <b>"+x+" points</b> avant la pénalité.";
  corr={t:String(x),fb:"Oui : "+x+" - "+a4+" = "+b4+", alors l'équation est satisfaite."};
  errs=[{v:b4-a4,fb:"Cela soustrait la pénalité une deuxième fois. Pour défaire une perte de "+a4+" points, additionne "+a4+" au score final."},{v:a4,fb:"C'est la taille de la pénalité, et non le score de départ."}];
  return mcq(prompt,corr,u6iopts(x,errs),sol,{mode:mode});
}, ["Représente d'abord l'histoire avec une équation à une étape : une valeur de départ plus ou moins un changement égale le résultat.", "Commence par décider si l'histoire additionne à la valeur de départ inconnue ou soustrait d'elle."]);

E("u6-verify-two-step", 6, ["8.16","8.17"], 2, "gen", function(){
  var v=pick(["x","n","m"]);var a=ri(2,6),b=ri(1,10),x=ri(2,10),c=a*x+b;
  var isSol=pick([true,false]);var cand=isSol?x:x+pick([1,2]);
  var lhs=a*cand+b;
  var corrStmt=cand+" substitué : "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", et "+lhs+" = "+c+", alors "+cand+" est une solution." : ", et "+lhs+" n'est pas "+c+", alors "+cand+" n'est pas une solution.");
  var wrongArith=(a*cand-b);
  var distr=[
    {t:cand+" substitué : "+a+"("+cand+") + "+b+" = "+wrongArith+(isSol?", et cela donne "+c+", alors "+cand+" est une solution." : ", et cela donne aussi "+c+", alors "+cand+" est une solution."),fb:"Ce calcul soustrait "+b+" au lieu de l'additionner. Refais la substitution avec soin."},
    {t:cand+" substitué : "+a+"("+cand+") + "+b+" = "+lhs+(isSol?", alors "+cand+" n'est pas une solution." : ", et "+lhs+" = "+c+" exactement, alors "+cand+" est une solution."),fb:"La valeur de substitution, "+lhs+", est bonne, mais la conclusion est à l'envers : compare "+lhs+" avec le côté droit, "+c+"."},
    {t:cand+" substitué : ("+a+" + "+b+")("+cand+") = "+((a+b)*cand)+(isSol?", alors "+cand+" est une solution." : ", alors "+cand+" n'est pas une solution, selon cette vérification."),fb:"Cela additionne le coefficient numérique et le terme constant avant de multiplier. Multiplie "+a+" par "+cand+" d'abord, puis additionne "+b+"."}
  ];
  var prompt="Quel énoncé vérifie correctement si \\("+v+" = "+cand+"\\) est une solution de \\("+a+v+" + "+b+" = "+c+"\\) ?";
  var sol="Substitue "+cand+" à "+v+" et compare les deux côtés.\\[ \\begin{aligned} "+a+v+" + "+b+" &= "+a+"("+cand+") + "+b+" \\\\ &= "+lhs+" \\end{aligned} \\] Le côté droit vaut "+c+", alors <b>"+cand+" "+(isSol?"est une solution":"n'est pas une solution")+"</b>.";
  return mcq(prompt,{t:corrStmt,fb:"Oui : la substitution est calculée correctement et la conclusion correspond à la comparaison avec "+c+"."},distr,sol,{mode:"verify-two-step",cand:cand});
}, ["Vérifier, c'est substituer la valeur et comparer les deux côtés de l'équation.", "Commence par remplacer la variable par la valeur donnée et par calculer le côté gauche."]);

E("u6-visual-steps", 6, ["8.13","8.8"], 1, "var", varset([
  function(){
    var q=mcq("La balance modélise \\(x + 3 = 10\\). Quelle action est la prochaine étape pour la résoudre, selon la méthode de la balance ?",
      {t:"Enlever 3 unités des deux plateaux, ce qui laisse x en équilibre avec 7.",fb:"Oui : la même quantité quitte les deux plateaux, alors la balance tient et x est isolé."},
      [{t:"Enlever 3 unités du plateau gauche, ce qui laisse x en équilibre avec 10.",fb:"Enlever d'un seul plateau brise l'équilibre : les deux plateaux doivent changer de la même façon."},
       {t:"Ajouter 3 unités aux deux plateaux, ce qui laisse x + 6 en équilibre avec 13.",fb:"Cela garde l'équilibre, mais on s'éloigne d'isoler x."},
       {t:"Enlever 10 unités des deux plateaux, ce qui laisse x en équilibre avec 3.",fb:"Le plateau droit contient 10 unités en tout, avec x inconnu à gauche; l'étape enlève les 3 unités libres à côté de x."}],
      "Les 3 unités libres à côté de x sont enlevées des deux plateaux.\\[ \\begin{aligned} x + 3 - 3 &= 10 - 3 \\\\ x &= 7 \\end{aligned} \\] La prochaine étape est <b>enlever 3 unités des deux plateaux</b>.",
      {mode:"visual-1"});
    q.figure=u6balanceSVG("x + 3","10");
    return q;
  },
  function(){
    var q=mcq("La balance modélise \\(2x = 8\\) : deux groupes égaux de x sont en équilibre avec 8 unités. Les plateaux sont divisés en 2 groupes égaux. Quelle équation montre le résultat ?",
      {t:"\\(x = 4\\)",fb:"Oui : chaque groupe contient un x à gauche et la moitié de 8, c'est-à-dire 4, à droite."},
      [{t:"\\(x = 8\\)",fb:"Cela garde le 8 complet avec un x. Diviser en 2 groupes réduit aussi le côté droit de moitié."},
       {t:"\\(2x = 4\\)",fb:"Cela réduit le côté droit de moitié seulement. Les deux côtés sont divisés en 2 groupes égaux."},
       {t:"\\(x = 6\\)",fb:"Cela soustrait 2 du côté droit. Diviser en groupes, c'est une division, et non une soustraction."}],
      "Diviser les deux plateaux en 2 groupes égaux, c'est diviser par 2 des deux côtés.\\[ \\begin{aligned} 2x \\div 2 &= 8 \\div 2 \\\\ x &= 4 \\end{aligned} \\] L'équation obtenue est <b>\\(x = 4\\)</b>.",
      {mode:"visual-2"});
    q.figure=u6balanceSVG("2x","8");
    return q;
  },
  function(){
    var q=mcq("La droite numérique montre l'étape utilisée pour résoudre \\(x - 4 = 6\\). Quelle est la valeur de \\(x\\) ?",
      {t:"10",fb:"Oui : la flèche saute de 4 unités vers le haut à partir de 6 et arrive à 10, et 10 - 4 = 6."},
      [{t:"6",fb:"C'est le point de départ du saut, le résultat après la soustraction de 4."},
       {t:"2",fb:"Cela saute de 4 unités vers le bas à partir de 6. Défaire une soustraction de 4, c'est additionner 4."},
       {t:"4",fb:"C'est la taille du saut, et non le point d'arrivée."}],
      "La droite numérique défait la soustraction en additionnant 4.\\[ \\begin{aligned} x - 4 &= 6 \\\\ x &= 6 + 4 \\\\ x &= 10 \\end{aligned} \\] La réponse est <b>10</b>.",
      {mode:"visual-3"});
    q.figure=u6numLineSVG(0,12,[{v:6,label:"départ"}],6,10,"+4");
    return q;
  },
  function(){
    var q=mcq("La balance modélise \\(3x + 1 = 13\\). Quelle équation montre le résultat après la première étape de la balance, qui enlève l'unité libre des deux plateaux ?",
      {t:"\\(3x = 12\\)",fb:"Oui : en enlevant 1 unité des deux plateaux, il reste 3x en équilibre avec 12."},
      [{t:"\\(3x + 1 = 12\\)",fb:"Cela enlève l'unité du plateau droit seulement. Les deux plateaux doivent perdre la même quantité."},
       {t:"\\(3x = 13\\)",fb:"Cela enlève l'unité du plateau gauche seulement. Les deux plateaux doivent perdre la même quantité."},
       {t:"\\(x = 12\\)",fb:"Cela divise aussi par 3 dans la même étape. La première étape de la balance enlève seulement l'unité libre."}],
      "La première étape enlève l'unité libre, 1, des deux plateaux.\\[ \\begin{aligned} 3x + 1 - 1 &= 13 - 1 \\\\ 3x &= 12 \\end{aligned} \\] L'équation obtenue est <b>\\(3x = 12\\)</b>.",
      {mode:"visual-4"});
    q.figure=u6balanceSVG("3x + 1","13");
    return q;
  },
  function(){
    var q=mcq("La droite numérique montre l'étape utilisée pour résoudre \\(x + 5 = 9\\). Quelle est la valeur de \\(x\\) ?",
      {t:"4",fb:"Oui : la flèche saute de 5 unités vers le bas à partir de 9 et arrive à 4, et 4 + 5 = 9."},
      [{t:"9",fb:"C'est le point de départ du saut, le total du côté droit."},
       {t:"14",fb:"Cela saute de 5 unités vers le haut à partir de 9. Défaire une addition de 5, c'est soustraire 5."},
       {t:"5",fb:"C'est la taille du saut, et non le point d'arrivée."}],
      "La droite numérique défait l'addition en soustrayant 5.\\[ \\begin{aligned} x + 5 &= 9 \\\\ x &= 9 - 5 \\\\ x &= 4 \\end{aligned} \\] La réponse est <b>4</b>.",
      {mode:"visual-5"});
    q.figure=u6numLineSVG(0,16,[{v:9,label:"départ"}],9,4,"-5");
    return q;
  }
]), ["Une étape de diagramme doit changer les deux côtés de l'équation de la même façon.", "Commence par lire ce que la balance ou la droite numérique fait au côté avec la variable."]);

E("u6-verify-one-step", 6, ["8.10","8.11"], 2, "var", varset([
  function(){
    return mcq("Quel énoncé vérifie correctement si \\(x = 7\\) est une solution de \\(x + 4 = 11\\) ?",
      {t:"7 substitué : 7 + 4 = 11, et 11 = 11, alors 7 est une solution.",fb:"Oui : la substitution donne exactement le côté droit, alors la valeur est une solution."},
      [{t:"7 substitué : 7 + 4 = 10, et 10 n'est pas 11, alors 7 n'est pas une solution.",fb:"Le calcul est faux : 7 + 4 = 11, et non 10."},
       {t:"7 substitué : 7 - 4 = 3, et 3 n'est pas 11, alors 7 n'est pas une solution.",fb:"Cela soustrait 4. L'équation additionne 4 à la variable, alors la vérification additionne aussi."},
       {t:"7 substitué : 7 + 4 = 11, alors 7 n'est pas une solution.",fb:"La substitution est bonne, mais la conclusion est à l'envers : les côtés correspondent, alors 7 est une solution."}],
      "Substitue 7 à x et compare les côtés.\\[ \\begin{aligned} x + 4 &= 7 + 4 \\\\ &= 11 \\end{aligned} \\] Les côtés correspondent, alors <b>7 est une solution</b>.",
      {mode:"verify-one-1"});
  },
  function(){
    return mcq("Quel énoncé vérifie correctement si \\(x = 10\\) est une solution de \\(x - 3 = 8\\) ?",
      {t:"10 substitué : 10 - 3 = 7, et 7 n'est pas 8, alors 10 n'est pas une solution.",fb:"Oui : la substitution donne 7, ce qui ne correspond pas au côté droit, 8."},
      [{t:"10 substitué : 10 - 3 = 8, et 8 = 8 comme requis, alors 10 est une solution.",fb:"Le calcul est faux : 10 - 3 = 7, et non 8."},
       {t:"10 substitué : 10 + 3 = 13, et 13 n'est pas 8, alors 10 n'est pas une solution.",fb:"Cela additionne 3. L'équation soustrait 3 de la variable, alors la vérification soustrait aussi."},
       {t:"10 substitué : 10 - 3 = 7, et 7 n'est pas 8, alors 10 est une solution.",fb:"La substitution est bonne, mais la conclusion est à l'envers : 7 n'est pas égal à 8."}],
      "Substitue 10 à x et compare les côtés.\\[ \\begin{aligned} x - 3 &= 10 - 3 \\\\ &= 7 \\end{aligned} \\] Le côté droit vaut 8, alors <b>10 n'est pas une solution</b>.",
      {mode:"verify-one-2"});
  },
  function(){
    return mcq("Quel énoncé vérifie correctement si \\(x = 8\\) est une solution de \\(x + 6 = 15\\) ?",
      {t:"8 substitué : 8 + 6 = 14, et 14 n'est pas 15, alors 8 n'est pas une solution.",fb:"Oui : la substitution donne 14, ce qui ne correspond pas au côté droit, 15."},
      [{t:"8 substitué : 8 + 6 = 15, et 15 = 15 comme requis, alors 8 est une solution.",fb:"Le calcul est faux : 8 + 6 = 14, et non 15."},
       {t:"8 substitué : 8 - 6 = 2, et 2 n'est pas 15, alors 8 n'est pas une solution.",fb:"Cela soustrait 6. L'équation additionne 6 à la variable, alors la vérification additionne aussi."},
       {t:"8 substitué : 8 + 6 = 14, et 14 n'est pas 15, alors 8 est une solution.",fb:"La substitution est bonne, mais la conclusion est à l'envers : 14 n'est pas égal à 15."}],
      "Substitue 8 à x et compare les côtés.\\[ \\begin{aligned} x + 6 &= 8 + 6 \\\\ &= 14 \\end{aligned} \\] Le côté droit vaut 15, alors <b>8 n'est pas une solution</b>.",
      {mode:"verify-one-3"});
  },
  function(){
    return mcq("Quel énoncé vérifie correctement si \\(x = 7\\) est une solution de \\(x - 5 = 2\\) ?",
      {t:"7 substitué : 7 - 5 = 2, et 2 = 2, alors 7 est une solution.",fb:"Oui : la substitution donne exactement le côté droit, alors la valeur est une solution."},
      [{t:"7 substitué : 7 - 5 = 3, et 3 n'est pas 2, alors 7 n'est pas une solution.",fb:"Le calcul est faux : 7 - 5 = 2, et non 3."},
       {t:"7 substitué : 7 + 5 = 12, et 12 n'est pas 2, alors 7 n'est pas une solution.",fb:"Cela additionne 5. L'équation soustrait 5 de la variable, alors la vérification soustrait aussi."},
       {t:"7 substitué : 7 - 5 = 2, alors 7 n'est pas une solution.",fb:"La substitution est bonne, mais la conclusion est à l'envers : les côtés correspondent, alors 7 est une solution."}],
      "Substitue 7 à x et compare les côtés.\\[ \\begin{aligned} x - 5 &= 7 - 5 \\\\ &= 2 \\end{aligned} \\] Les côtés correspondent, alors <b>7 est une solution</b>.",
      {mode:"verify-one-4"});
  },
  function(){
    return mcq("Quel énoncé vérifie correctement si \\(x = 12\\) est une solution de \\(x + 9 = 20\\) ?",
      {t:"12 substitué : 12 + 9 = 21, et 21 n'est pas 20, alors 12 n'est pas une solution.",fb:"Oui : la substitution donne 21, ce qui ne correspond pas au côté droit, 20."},
      [{t:"12 substitué : 12 + 9 = 20, et 20 = 20 comme requis, alors 12 est une solution.",fb:"Le calcul est faux : 12 + 9 = 21, et non 20."},
       {t:"12 substitué : 12 - 9 = 3, et 3 n'est pas 20, alors 12 n'est pas une solution.",fb:"Cela soustrait 9. L'équation additionne 9 à la variable, alors la vérification additionne aussi."},
       {t:"12 substitué : 12 + 9 = 21, et 21 n'est pas 20, alors 12 est une solution.",fb:"La substitution est bonne, mais la conclusion est à l'envers : 21 n'est pas égal à 20."}],
      "Substitue 12 à x et compare les côtés.\\[ \\begin{aligned} x + 9 &= 12 + 9 \\\\ &= 21 \\end{aligned} \\] Le côté droit vaut 20, alors <b>12 n'est pas une solution</b>.",
      {mode:"verify-one-5"});
  }
]), ["Vérifier, c'est substituer la valeur dans l'équation originale et comparer les côtés.", "Commence par remplacer la variable par la valeur donnée, puis calcule ce côté."]);

E("u6-one-step-problem-cr", 6, ["8.9","8.7"], 1, "gen", function(){
  var mode=pick(["temp","tank","owing","altitude"]);
  var prompt,sol,x;
  if(mode==="temp"){
    var a=ri(3,14);x=ri(-6,12);var b=x-a;
    prompt="Pendant la nuit, la température a baissé de "+a+" degrés et a atteint "+b+" degrés le matin. Quelle était la température le soir, en degrés ?";
    sol="Soit \\(t\\) la température du soir. Une baisse, c'est une soustraction, ce qui donne une équation à une étape.\\[ \\begin{aligned} t - "+a+" &= "+b+" \\\\ t &= "+x+" \\end{aligned} \\] La température du soir était de <b>"+x+" degrés</b>. Vérification : "+x+" - "+a+" = "+b+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="tank"){
    var a2=ri(4,20);x=ri(15,60);var b2=x+a2;
    prompt="Un réservoir d'eau gagne "+a2+" litres lors d'une livraison et contient ensuite "+b2+" litres. Combien de litres y avait-il dans le réservoir avant la livraison ?";
    sol="Soit \\(w\\) la quantité avant la livraison. Un gain, c'est une addition, ce qui donne une équation à une étape.\\[ \\begin{aligned} w + "+a2+" &= "+b2+" \\\\ w &= "+x+" \\end{aligned} \\] Le réservoir contenait <b>"+x+" litres</b> avant la livraison. Vérification : "+x+" + "+a2+" = "+b2+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="owing"){
    var a3=ri(3,25);x=ri(5,50);var b3=x-a3;
    prompt="Sam paie "+a3+" $ pour un prêt et doit encore "+b3+" $. Combien Sam devait-il au départ, en dollars ?";
    sol="Soit \\(d\\) le montant dû au départ. Un paiement soustrait du montant dû, ce qui donne une équation à une étape.\\[ \\begin{aligned} d - "+a3+" &= "+b3+" \\\\ d &= "+x+" \\end{aligned} \\] Sam devait <b>"+x+" $</b> au départ. Vérification : "+x+" - "+a3+" = "+b3+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }
  var a4=ri(10,60);x=ri(20,120);var b4=x+a4;
  prompt="Un drone monte de "+a4+" mètres depuis son point de lancement et atteint une altitude de "+b4+" mètres au-dessus du fond de la vallée. À quelle hauteur au-dessus du fond de la vallée se trouvait le point de lancement, en mètres ?";
  sol="Soit \\(h\\) la hauteur du point de lancement. Monter ajoute de la hauteur, ce qui donne une équation à une étape.\\[ \\begin{aligned} h + "+a4+" &= "+b4+" \\\\ h &= "+x+" \\end{aligned} \\] Le point de lancement était à <b>"+x+" mètres</b> au-dessus du fond de la vallée. Vérification : "+x+" + "+a4+" = "+b4+".";
  return numq(prompt,x,0,sol,{mode:mode});
}, ["Représente l'histoire avec une équation à une étape : une valeur de départ plus ou moins un changement égale le résultat.", "Commence par décider si le changement s'ajoute à la valeur de départ inconnue ou s'en soustrait."]);

E("u6-preservation-problem-cr", 6, ["8.2","8.15"], 1, "gen", function(){
  var mode=pick(["groups","packs","sharing"]);
  var prompt,sol,x;
  if(mode==="groups"){
    var a=ri(2,9);x=ri(3,15);var b=a*x;
    prompt=a+" groupes égaux d'élèves contiennent "+b+" élèves en tout, sans élève en reste. Combien d'élèves y a-t-il dans chaque groupe ?";
    sol="Soit \\(g\\) le nombre d'élèves dans chaque groupe. Applique la préservation de l'égalité : divise les deux côtés par le même nombre, "+a+".\\[ \\begin{aligned} "+a+"g &= "+b+" \\\\ g &= "+x+" \\end{aligned} \\] Chaque groupe compte <b>"+x+" élèves</b>. Vérification : "+a+" fois "+x+" donne "+b+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }else if(mode==="packs"){
    var a2=ri(3,10);x=ri(4,12);var b2=a2*x;
    prompt="Les marqueurs viennent en paquets de "+a2+". Un enseignant achète assez de paquets pour avoir "+b2+" marqueurs, sans reste. Combien de paquets l'enseignant a-t-il achetés ?";
    sol="Soit \\(p\\) le nombre de paquets. Applique la préservation de l'égalité : divise les deux côtés par le même nombre, "+a2+".\\[ \\begin{aligned} "+a2+"p &= "+b2+" \\\\ p &= "+x+" \\end{aligned} \\] L'enseignant a acheté <b>"+x+" paquets</b>. Vérification : "+a2+" fois "+x+" donne "+b2+".";
    return numq(prompt,x,0,sol,{mode:mode});
  }
  var a3=ri(2,8);x=ri(3,14);var total=a3*x;
  prompt="Une corde de "+total+" mètres est coupée en "+a3+" morceaux égaux. Quelle est la longueur de chaque morceau, en mètres ?";
  sol="Soit \\(L\\) la longueur de chaque morceau, alors \\("+a3+"L = "+total+"\\). Applique la préservation de l'égalité : divise les deux côtés par le même nombre, "+a3+".\\[ \\begin{aligned} "+a3+"L &= "+total+" \\\\ L &= "+x+" \\end{aligned} \\] Chaque morceau mesure <b>"+x+" mètres</b>. Vérification : "+a3+" fois "+x+" donne "+total+".";
  return numq(prompt,x,0,sol,{mode:mode});
}, ["Transforme le problème en équation, puis garde-la en équilibre en faisant la même opération aux deux côtés.", "Commence par nommer l'inconnue et par écrire ce que les groupes ou les paquets multiplient pour donner."]);

E("u6-model-solve-cr", 6, ["8.12","8.15"], 3, "gen", function(){
  var a=ri(3,12),b=ri(10,45),x=ri(6,20),c=a*x+b;
  var tpl=pick([
    {p:"La location d'une salle coûte des frais de réservation de "+b+" $ plus "+a+" $ par invité pour la restauration. Un groupe paie "+c+" $ en tout. Pour combien d'invités la restauration a-t-elle été fournie ?",u:"invités"},
    {p:"Une entreprise de déménagement demande "+b+" $ pour le camion plus "+a+" $ par boîte chargée. Un client paie "+c+" $ en tout. Combien de boîtes ont été chargées ?",u:"boîtes"},
    {p:"Un magasin de ski demande "+b+" $ de frais de base pour un laissez-passer de saison plus "+a+" $ par jour de ski noté. Un skieur paie "+c+" $ en tout. Combien de jours de ski ont été notés ?",u:"jours de ski"},
    {p:"Un traiteur demande "+b+" $ pour l'installation plus "+a+" $ par plateau de nourriture. Une facture d'événement s'élève à "+c+" $ en tout. Combien de plateaux ont été commandés ?",u:"plateaux"}
  ]);
  var sol="Modélise d'abord le problème : soit \\(x\\) le nombre de "+tpl.u+". Les frais fixes plus le coût par unité donnent le total. Résous ensuite, en notant chaque étape en équilibre.\\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] La réponse est <b>"+x+" "+tpl.u+"</b>. Vérifie par substitution : "+a+"("+x+") + "+b+" = "+c+".";
  return numq(tpl.p+" Modélise le problème avec une équation linéaire et résous-la. Donne ta réponse comme un nombre de "+tpl.u+".",x,0,sol,{mode:"model-solve",a:a,b:b});
}, ["Modélise d'abord : une quantité fixe plus une quantité par unité fois l'inconnue égale le total.", "Commence par nommer l'inconnue et par écrire l'équation que l'histoire décrit."]);

E("u6-two-step-context", 6, ["8.15","8.12"], 3, "gen", function(){
  var mode=pick(["left","per"]);
  var prompt,sol,corr,errs,x;
  if(mode==="left"){
    var a=ri(3,9),n=ri(4,12),b=ri(5,30),total=a*n+b;
    prompt="Un boulanger prépare "+total+" petits pains en tout. De ceux-ci, "+b+" petits pains vont dans un panier d'étalage, et le reste est divisé également sur "+a+" plateaux. Combien de petits pains y a-t-il sur chaque plateau ?";
    x=n;
    sol="Soit \\(r\\) le nombre de petits pains sur chaque plateau. Les plateaux contiennent le total moins les petits pains du panier.\\[ \\begin{aligned} "+a+"r + "+b+" &= "+total+" \\\\ "+a+"r &= "+(total-b)+" \\\\ r &= "+n+" \\end{aligned} \\] Chaque plateau contient <b>"+n+" petits pains</b>.";
    corr={t:String(n),fb:"Oui : en enlevant les "+b+" petits pains du panier, il reste "+(total-b)+" petits pains sur "+a+" plateaux, c'est-à-dire "+n+" par plateau."};
    errs=[{v:total-b,fb:"C'est le nombre de petits pains sur tous les plateaux ensemble. Divise par "+a+" pour obtenir les petits pains par plateau."},{v:Math.floor(total/a),fb:"Cela divise le total complet par "+a+", y compris les petits pains du panier. Enlève d'abord les petits pains du panier."},{v:n+a,fb:"Vérifie : "+a+" plateaux de "+(n+a)+" plus "+b+" petits pains du panier donneraient plus que "+total+"." }];
    return mcq(prompt,corr,u6iopts(n,errs),sol,{mode:mode});
  }
  var a2=ri(3,11),x2=ri(6,18),b2=ri(4,25),c2=a2*x2-b2;
  prompt="Un traversier vend des billets à "+a2+" $ chacun. Après un rabais de groupe de "+b2+" $, une école paie "+c2+" $ pour ses billets. Combien de billets l'école a-t-elle achetés ?";
  x=x2;
  sol="Soit \\(t\\) le nombre de billets. Le rabais est soustrait du coût des billets.\\[ \\begin{aligned} "+a2+"t - "+b2+" &= "+c2+" \\\\ "+a2+"t &= "+(c2+b2)+" \\\\ t &= "+x2+" \\end{aligned} \\] L'école a acheté <b>"+x2+" billets</b>. Vérification : "+a2+"("+x2+") - "+b2+" = "+c2+".";
  corr={t:String(x2),fb:"Oui : en rajoutant le rabais, on obtient "+a2+"t = "+(c2+b2)+", et en divisant par "+a2+", on obtient "+x2+"." };
  errs=[{v:c2+b2,fb:"Cela défait le rabais, mais arrête avant de diviser par le prix du billet."},{v:Math.max(1,Math.floor((c2-b2)/a2)),fb:"Cela enlève le rabais une deuxième fois. Le rabais se défait en le rajoutant."},{v:x2+3,fb:"Vérifie : "+a2+"("+ (x2+3) +") - "+b2+" donne plus que "+c2+"." }];
  return mcq(prompt,corr,u6iopts(x2,errs),sol,{mode:mode});
}, ["Écris l'équation que l'histoire décrit, en surveillant les quantités ajoutées au total ou enlevées du total.", "Commence par séparer la partie par unité de la quantité fixe qui est ajoutée ou soustraite."]);

E("u6-verify-error", 6, ["8.16","8.10"], 3, "var", varset([
  function(){
    return mcq("Rae résout \\(2x + 4 = 18\\) en écrivant \\(2x = 22\\), puis \\(x = 11\\). Quelle est la bonne solution ?",
      {t:"7",fb:"Oui : en soustrayant 4 des deux côtés, on obtient 2x = 14, et en divisant par 2, on obtient 7."},
      [{t:"11",fb:"C'est la réponse de Rae. Elle a additionné 4 au côté droit au lieu de le soustraire."},
       {t:"14",fb:"C'est la valeur de 2x après la bonne première étape, et non la valeur de x."},
       {t:"9",fb:"Vérifie : 2(9) + 4 = 22, et non 18."}],
      "L'erreur de Rae est à la première étape : le 4 doit être soustrait des deux côtés, et non additionné.\\[ \\begin{aligned} 2x + 4 &= 18 \\\\ 2x &= 14 \\\\ x &= 7 \\end{aligned} \\] La bonne solution est <b>7</b>. Vérification : 2(7) + 4 = 18.",
      {mode:"verify-error-1"});
  },
  function(){
    return mcq("Tom résout \\(x - 6 = 9\\) en écrivant \\(x = 3\\), en disant qu'il a déplacé le 6 de l'autre côté et soustrait. Quelle est la bonne solution ?",
      {t:"15",fb:"Oui : en additionnant 6 aux deux côtés, on obtient 15, et 15 - 6 = 9."},
      [{t:"3",fb:"C'est la réponse de Tom. Soustraire 6 encore s'éloigne de la solution."},
       {t:"9",fb:"C'est le côté droit de l'équation, et non la valeur de x."},
       {t:"13",fb:"Vérifie : 13 - 6 = 7, et non 9."}],
      "L'erreur de Tom est le sens de l'opération inverse : soustraire 6 se défait en additionnant 6 aux deux côtés.\\[ \\begin{aligned} x - 6 &= 9 \\\\ x &= 15 \\end{aligned} \\] La bonne solution est <b>15</b>. Vérification : 15 - 6 = 9.",
      {mode:"verify-error-2"});
  },
  function(){
    return mcq("Ana résout \\(4x - 3 = 29\\) en écrivant \\(4x = 26\\), puis \\(x = 6,5\\). Quelle est la bonne solution ?",
      {t:"8",fb:"Oui : en additionnant 3 aux deux côtés, on obtient 4x = 32, et en divisant par 4, on obtient 8."},
      [{t:"6,5",fb:"C'est la réponse d'Ana. Elle a soustrait 3 du côté droit au lieu de le rajouter."},
       {t:"32,0",fb:"C'est la valeur de 4x après la bonne première étape, et non la valeur de x."},
       {t:"7",fb:"Vérifie : 4(7) - 3 = 25, et non 29."}],
      "L'erreur d'Ana est à la première étape : le 3 soustrait doit être rajouté des deux côtés.\\[ \\begin{aligned} 4x - 3 &= 29 \\\\ 4x &= 32 \\\\ x &= 8 \\end{aligned} \\] La bonne solution est <b>8</b>. Vérification : 4(8) - 3 = 29.",
      {mode:"verify-error-3"});
  },
  function(){
    return mcq("Leo résout \\(\\frac{x}{3} = 7\\) en écrivant \\(x = 7 - 3 = 4\\). Quelle est la bonne solution ?",
      {t:"21",fb:"Oui : en multipliant les deux côtés par 3, on obtient 21, et 21 divisé par 3 donne 7."},
      [{t:"4",fb:"C'est la réponse de Leo. Il a soustrait le diviseur au lieu de multiplier par lui."},
       {t:"7",fb:"C'est le résultat après la division, et non la valeur de x lui-même."},
       {t:"10",fb:"Vérifie : 10 divisé par 3 ne donne pas 7."}],
      "L'erreur de Leo est l'opération inverse : la division par 3 se défait en multipliant les deux côtés par 3.\\[ \\begin{aligned} \\frac{x}{3} &= 7 \\\\ x &= 21 \\end{aligned} \\] La bonne solution est <b>21</b>. Vérification : 21 divisé par 3 donne 7.",
      {mode:"verify-error-4"});
  },
  function(){
    return mcq("Kim affirme que \\(x = 13\\) résous \\(x + 8 = 19\\), et vérifie en écrivant \\(13 + 8 = 19\\). Quelle est la bonne solution ?",
      {t:"11",fb:"Oui : 11 + 8 = 19. La vérification de Kim elle-même est fausse, car 13 + 8 = 21."},
      [{t:"13",fb:"C'est l'affirmation de Kim. Sa vérification écrit 13 + 8 = 19, mais 13 + 8 donne en fait 21."},
       {t:"19",fb:"C'est le côté droit de l'équation, et non la valeur de x."},
       {t:"8",fb:"C'est le nombre ajouté à x, et non la valeur de x."}],
      "La vérification de Kim contient une erreur de calcul : substituer 13 donne 21, et non 19, alors 13 n'est pas une solution. En résolvant directement :\\[ \\begin{aligned} x + 8 &= 19 \\\\ x &= 11 \\end{aligned} \\] La bonne solution est <b>11</b>. Vérification : 11 + 8 = 19.",
      {mode:"verify-error-5"});
  }
]), ["Lis le travail montré ligne par ligne et trouve la première ligne qui brise l'équilibre ou le calcul.", "Commence par vérifier la première étape du travail montré contre l'opération inverse qu'elle demande."]);

E("u6-solve-challenge-cr", 6, ["8.2","8.14"], 3, "gen", function(){
  var v=pick(["x","n","m","y"]);
  var mode=pick(["minus","swapped"]);
  var prompt,sol,x;
  if(mode==="minus"){
    var a=ri(4,12);x=ri(8,25);var b=ri(5,a*x-10),c=a*x-b;
    prompt="Résous \\("+a+v+" - "+b+" = "+c+"\\) pour \\("+v+"\\). Montre chaque étape en équilibre dans ton travail.";
    sol="Applique la préservation de l'égalité deux fois : additionne "+b+" aux deux côtés, puis divise les deux côtés par "+a+".\\[ \\begin{aligned} "+a+v+" - "+b+" &= "+c+" \\\\ "+a+v+" &= "+(c+b)+" \\\\ "+v+" &= "+x+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>. Vérifie par substitution : "+a+"("+x+") - "+b+" = "+c+".";
    return numq(prompt,x,0,sol,{mode:mode,a:a,b:b});
  }
  var a2=ri(3,11);x=ri(6,20);var b2=ri(4,30),c2=a2*x+b2;
  prompt="Résous \\("+c2+" = "+a2+v+" + "+b2+"\\) pour \\("+v+"\\). Montre chaque étape en équilibre dans ton travail.";
  sol="La variable est du côté droit, mais les mêmes étapes en équilibre s'appliquent : soustrais "+b2+" des deux côtés, puis divise les deux côtés par "+a2+".\\[ \\begin{aligned} "+c2+" &= "+a2+v+" + "+b2+" \\\\ "+(c2-b2)+" &= "+a2+v+" \\\\ "+x+" &= "+v+" \\end{aligned} \\] La réponse est <b>\\("+v+" = "+x+"\\)</b>. Vérifie par substitution : "+a2+"("+x+") + "+b2+" = "+c2+".";
  return numq(prompt,x,0,sol,{mode:mode,a:a2,b:b2});
}, ["Défais les opérations dans l'ordre inverse, en gardant les deux côtés en équilibre à chaque étape.", "Commence par l'opération qui a été appliquée en dernier à la variable."]);

/* ----- bank-u7.js ----- */
// Math 7 (French) Unit 7 Data Analysis question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 3400 to 3915).
// CRMARKS: u7-missing-value-cr=3
// CRMARKS: u7-median-range-cr=3
// CRMARKS: u7-two-event-pct-cr=2
// CRMARKS: u7-central-problem-cr=3
// CRMARKS: u7-expected-count-cr=3
/* TRANSLATOR NOTES
 * Terms (Grade 7 guide, Chapitre 7 - L'analyse des données): tendance
 * centrale, moyenne, médiane, mode, étendue, valeur aberrante,
 * probabilité théorique et expérimentale, espace échantillonnal,
 * évènements indépendants, diagramme en arbre (not used in this chunk),
 * roulette (spinner, guide 7SP5.1). "Diagramme à barres", "diagramme
 * linéaire" and "diagramme circulaire" follow guide usage (7SP3,
 * 8SP1 wording for graph types).
 * Judgement calls (glossary silent): heads = "face", tails = "pile"
 * (Math 8 FR precedent); marble = "bille", to draw a marble = "piger"
 * (guide: piger); fair die = "dé équitable"; "laps swum" = "longueurs
 * nagées"; day labels in the line graph are full French day names
 * (Lundi to Vendredi) so they read naturally in prose; bar, line and
 * circle graph category labels are translated because they are
 * student-facing figure text; aria-labels translated (Diagramme à
 * barres, Diagramme linéaire, Diagramme circulaire, Tableau des
 * résultats); table coin codes H/T become F/P (face/pile) in the
 * outcome table, its cells and its prompts, matching the prose;
 * device names in u7-sample-space carry their French articles
 * (une pièce, un dé, une roulette) plus a third array element with
 * the definite form (la pièce, le dé, la roulette) used in feedback;
 * indices 0 and 1 are unchanged. In u7-exp-vs-theor the internal
 * check larger.indexOf("Experimental") becomes indexOf("expérimentale")
 * so the comparison logic still selects the opposite statement.
 * Money: the salary entry writes amounts through fmtD(base2*1000)
 * and fmtD((base2+120)*1000) so they render grouped with the amount
 * before " $" (25 000 $ style); literal amounts in u7-outlier-judge
 * become "10 $ à 25 $", "500 $" and "63 $". Percent: pie labels use
 * pct + " %"; the TeX "\%" in u7-two-event-pct-cr stays "\%" inside
 * the math delimiters while its closing display string uses " %".
 * Literal decimal in prose: "45.0 seconds" becomes "45,0 secondes"
 * in u7-outlier-judge.
 * FMT-GEOM lines left as fmt( (4, each marked on its line): the
 * u7barSVG rect line, the u7lineSVG circle line, the u7lineSVG
 * segment line and the u7pieSVG path line. All other fmt(
 * in the helpers are absent: _txt calls take coordinates already
 * computed, and their visible text (values, labels, percents) is
 * passed raw or with " %" appended, as in the source. Every display
 * fmt( in the entries became fmtD(. No fmtF(, fmtDF( or .toFixed(
 * occurs in the source, so none appears here.
 * Unsure: "seedlings sprouting each day" rendered "semis germés
 * chaque jour"; "Swim" as a bar category rendered "Natation".
 */
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
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme à barres">';
  out+='<line x1="45" y1="'+base+'" x2="'+(W-10)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="45" y1="'+top+'" x2="45" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(var i=0;i<labels.length;i++){var x=45+gap+(gap+bw)*i;var h=(base-top)*vals[i]/maxV;var y=base-h;
    out+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+bw+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>'; /* FMT-GEOM */
    out+=_txt(x+bw/2,y-10,String(vals[i]),12,true);
    out+=_txt(x+bw/2,base+16,labels[i],11,false);
  }
  out+=_txt(22,(top+base)/2,unit,11,false);
  return out+'</svg>';
}
function u7lineSVG(labels,vals,unit){
  var W=330,H=215,base=175,top=30,maxV=Math.max.apply(null,vals)+2,minV=0;
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme linéaire">';
  out+='<line x1="45" y1="'+base+'" x2="'+(W-15)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+='<line x1="45" y1="'+top+'" x2="45" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  var pts=[];
  for(var i=0;i<labels.length;i++){var x=65+i*(W-95)/(labels.length-1);var y=base-(base-top)*(vals[i]-minV)/(maxV-minV);pts.push([x,y]);
    out+='<circle cx="'+fmt(x,1)+'" cy="'+fmt(y,1)+'" r="3.2" fill="'+FIG_INK+'"/>'; /* FMT-GEOM */
    out+=_txt(x,y-13,String(vals[i]),12,true);
    out+=_txt(x,base+16,labels[i],11,false);
  }
  for(var j=0;j<pts.length-1;j++){out+='<line x1="'+fmt(pts[j][0],1)+'" y1="'+fmt(pts[j][1],1)+'" x2="'+fmt(pts[j+1][0],1)+'" y2="'+fmt(pts[j+1][1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';} /* FMT-GEOM */
  out+=_txt(20,(top+base)/2,unit,11,false);
  return out+'</svg>';
}
function u7pieSVG(parts){
  var cx=110,cy=100,R=78,out='<svg viewBox="0 0 330 210" width="330" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme circulaire">';
  var ang=-90;
  for(var i=0;i<parts.length;i++){var sweep=parts[i].pct*3.6;var a1=ang*Math.PI/180,a2=(ang+sweep)*Math.PI/180;
    var x1=cx+R*Math.cos(a1),y1=cy+R*Math.sin(a1),x2=cx+R*Math.cos(a2),y2=cy+R*Math.sin(a2);
    var large=sweep>180?1:0;
    var fill=i%2?FIG_SHADE:"#ffffff";
    out+='<path d="M '+cx+' '+cy+' L '+fmt(x1,1)+' '+fmt(y1,1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(x2,1)+' '+fmt(y2,1)+' Z" fill="'+fill+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>'; /* FMT-GEOM */
    var mid=(ang+sweep/2)*Math.PI/180;
    out+=_txt(cx+(R-24)*Math.cos(mid),cy+(R-24)*Math.sin(mid),parts[i].pct+" %",12,true);
    out+=_txt(215,52+i*30,parts[i].label+" "+parts[i].pct+" %",12,false,"start");
    ang+=sweep;
  }
  return out+'</svg>';
}
function u7tableSVG(rowHead,colHead,rows){
  var W=330,rowH=26,colW=(W-70)/colHead.length,H=30+rowH*(rows.length+1);
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tableau des résultats">';
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
  var ctx=pick(["résultats de quiz","longueurs nagées chaque jour","pages lues chaque jour","points marqués à chaque partie","semis germés chaque jour"]);
  var n=pick([5,5,6]);var vals=[];for(var i=0;i<n;i++)vals.push(ri(2,14));
  var m=u7mean(vals);var ms=fmtD(m);
  var cand=u7numOpts(m,[fmtD(m+1),fmtD(m-1),fmtD(u7median(vals)),fmtD(m+2),fmtD(Math.max.apply(null,vals))]).map(function(v){return String(v);});
  var seen={};var ds=[];cand.forEach(function(v){if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Cette valeur n'est pas égale au total divisé par "+n+". Additionne d'abord toutes les valeurs, puis divise par le nombre de valeurs."});}});
  while(ds.length<3){var v=fmtD(m+ds.length+2);if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Additionne d'abord toutes les valeurs, puis divise par "+n+"."});}}
  ds=precPair(ms,ds);
  var q=mcq("Un élève a ces "+ctx+" : "+vals.join(", ")+". Quelle est la moyenne ?",
    {t:ms,fb:"Oui : le total est "+fmtD(u7mean(vals)*n)+", et "+fmtD(u7mean(vals)*n)+" divisé par "+n+" donne "+ms+"."},ds.slice(0,3),
    "Additionne les valeurs, puis divise par le nombre de valeurs. \\[ \\begin{aligned} \\text{total} &= "+vals.join(" + ")+" = "+fmtD(m*n)+" \\\\ \\text{moyenne} &= "+fmtD(m*n)+" \\div "+n+" = "+ms+" \\end{aligned} \\] La moyenne est <b>"+ms+"</b>.",
    {mode:"mean",n:n});
  return q;
},["La moyenne est le total de toutes les valeurs divisé par le nombre de valeurs.","Commence par additionner toutes les valeurs."]);

E("u7-median-mode",7,["11.6"],1,"gen",function(){
  var askMode=Math.random()<0.5;
  var base=ri(3,9);var vals;
  if(askMode){var modeV=ri(2,12);var others=[];while(others.length<4){var v=ri(1,15);if(v!==modeV&&others.indexOf(v)<0)others.push(v);}vals=shuffle([modeV,modeV,modeV].concat(others.slice(0,3)));
    var correct=String(modeV);
    var cand=u7numOpts(modeV,[others[0],others[1],Math.round(u7mean(vals))]).map(String);
    var ds=cand.filter(function(v){return v!==correct;}).slice(0,3).map(function(v){return {t:v,fb:"Compte le nombre de fois où chaque valeur apparaît. Le mode est la valeur qui apparaît le plus souvent."};});
    while(ds.length<3){var v=String(modeV+ds.length+3);ds.push({t:v,fb:"Compte le nombre de fois où chaque valeur apparaît."});}
    return mcq("Ensemble de données : "+vals.join(", ")+". Quel est le mode ?",{t:correct,fb:"Oui : "+modeV+" apparaît trois fois, plus souvent que toute autre valeur."},ds,
      "Compte la fréquence de chaque valeur. La valeur "+modeV+" apparaît 3 fois, plus que toute autre valeur. Le mode est <b>"+modeV+"</b>.",{mode:"mode"});
  }
  var n=pick([5,7]);vals=[];for(var i=0;i<n;i++)vals.push(ri(1,16));
  var med=u7median(vals);var srt=vals.slice().sort(function(a,b){return a-b;});
  var cand2=u7numOpts(med,[fmtD(u7mean(vals)),srt[0],srt[srt.length-1],med+1]).map(function(v){return String(v);});
  var ds2=cand2.filter(function(v){return v!==fmtD(med);}).slice(0,3).map(function(v){return {t:v,fb:"Mets d'abord les valeurs en ordre. La médiane est la valeur du milieu de la liste ordonnée."};});
  while(ds2.length<3){var w=fmtD(med+ds2.length+2);ds2.push({t:w,fb:"Mets d'abord les valeurs en ordre, puis prends celle du milieu."});}
  ds2=precPair(fmtD(med),ds2);
  return mcq("Ensemble de données : "+vals.join(", ")+". Quelle est la médiane ?",{t:fmtD(med),fb:"Oui : en ordre, la liste est "+srt.join(", ")+", et la valeur du milieu est "+fmtD(med)+"."},ds2,
    "Mets les valeurs en ordre : "+srt.join(", ")+". Avec "+n+" valeurs, la position du milieu contient <b>"+fmtD(med)+"</b>.",{mode:"median"});
},["Mets d'abord les valeurs en ordre pour la médiane; compte les fréquences pour le mode.","Commence par réécrire l'ensemble de données en ordre croissant."]);

E("u7-range-basic",7,["11.7"],1,"gen",function(){
  var ctx=pick(["températures maximales quotidiennes en degrés","hauteurs de plantes en centimètres","temps de course en secondes","nombres d'animaux de compagnie par ménage","buts marqués chaque semaine"]);
  var lo=ri(2,10),hi=lo+ri(4,14);var vals=[lo,hi];var n=ri(4,6);for(var i=0;i<n;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
  var r=hi-lo;
  var cand=u7numOpts(r,[hi,lo,r+2,Math.max(r-2,0),hi+lo]);
  var ds=cand.map(function(v){return {t:String(v),fb:v===hi?"C'est la plus grande valeur seule. L'étendue soustrait la plus petite valeur de la plus grande.":"L'étendue est la plus grande moins la plus petite : "+hi+" moins "+lo+"."};});
  return mcq("Un ensemble de "+ctx+" est : "+vals.join(", ")+". Quelle est l'étendue ?",{t:String(r),fb:"Oui : "+hi+" moins "+lo+" donne "+r+"."},ds,
    "La plus grande valeur est "+hi+" et la plus petite est "+lo+". \\[ \\begin{aligned} \\text{étendue} &= "+hi+" - "+lo+" \\\\ &= "+r+" \\end{aligned} \\] L'étendue est <b>"+r+"</b>.",{mode:"range"});
},["L'étendue mesure la dispersion : la plus grande valeur moins la plus petite valeur.","Commence par trouver la plus grande et la plus petite valeur de l'ensemble."]);

E("u7-prob-basic",7,["12.1","12.2"],1,"gen",function(){
  var mode=pick(["bag","bag","die","spinner","zero"]);
  if(mode==="zero"){
    var cols=["red","blue","green"];var counts=[ri(2,5),ri(2,5),ri(2,5)];var total=counts[0]+counts[1]+counts[2];
    var absent=pick(["violette","orange","jaune"]);
    var ds=[{t:"1/"+total,fb:"Il n'y a aucune bille "+absent+" dans le sac, donc cet évènement ne peut pas se produire."},{t:"0/"+counts[0],fb:"Une probabilité de 0 s'écrit 0. Aucune bille "+absent+" signifie que l'évènement est impossible."},{t:"1",fb:"Une probabilité de 1 signifie que l'évènement est certain. Piger une bille "+absent+" est impossible ici, pas certain."}];
    return mcq("Un sac contient "+counts[0]+" billes rouges, "+counts[1]+" billes bleues et "+counts[2]+" billes vertes. On pige une bille au hasard. Quelle est la probabilité de piger une bille "+absent+" ?",
      {t:"0",fb:"Oui : il n'y a aucune bille "+absent+", donc la probabilité est 0."},ds,
      "Il y a 0 bille "+absent+" sur "+total+" au total. \\(P = "+FR(0,total)+" = 0\\). La probabilité est <b>0</b>.",{mode:"zero"});
  }
  if(mode==="die"){
    var target=pick(["un nombre pair","un nombre impair","un nombre supérieur à 4","un nombre inférieur à 3","un 6","un nombre supérieur à 2"]);
    var fav={"un nombre pair":3,"un nombre impair":3,"un nombre supérieur à 4":2,"un nombre inférieur à 3":2,"un 6":1,"un nombre supérieur à 2":4}[target];
    var cs=u7fracStr(fav,6);
    var alts=[u7fracStr(6-fav,6),fav+"/6",u7fracStr(fav+1,6),u7fracStr(fav,6-fav+6)];
    var seen={};seen[cs]=1;var ds=[];
    alts.forEach(function(a){if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Compte d'abord les faces favorables, puis écris les favorables sur 6 et simplifie."});}});
    var extra=2;while(ds.length<3){var a=u7fracStr(extra,6);if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Compte d'abord les faces favorables, puis écris les favorables sur 6 et simplifie."});}extra++;}
    return mcq("On lance une fois un dé équitable à six faces. Quelle est la probabilité d'obtenir "+target+" ?",
      {t:"\\("+cs+"\\)",fb:"Oui : "+fav+" des 6 faces correspondent, et "+fav+"/6 se simplifie en "+cs+"."},ds.slice(0,3),
      "Il y a "+fav+" faces favorables sur 6. \\(P = "+FR(fav,6)+" = "+cs+"\\). La probabilité est <b>\\("+cs+"\\)</b>.",{mode:"die"});
  }
  if(mode==="spinner"){
    var secs=pick([4,6,8]);var favSecs=ri(1,secs-1);var cs2=u7fracStr(favSecs,secs);
    var seen2={};seen2[cs2]=1;var ds2=[];
    [u7fracStr(secs-favSecs,secs),favSecs+"/"+secs,u7fracStr(favSecs+1,secs),u7fracStr(1,secs)].forEach(function(a){if(!seen2[a]&&ds2.length<3){seen2[a]=1;ds2.push({t:"\\("+a+"\\)",fb:"Utilise le nombre de sections correspondantes sur le nombre total de sections égales, puis simplifie."});}});
    var e2=2;while(ds2.length<3){var a2=u7fracStr(e2,secs);if(!seen2[a2]){seen2[a2]=1;ds2.push({t:"\\("+a2+"\\)",fb:"Utilise les sections correspondantes sur le total des sections, puis simplifie."});}e2++;}
    return mcq("Une roulette compte "+secs+" sections égales. Exactement "+favSecs+" des sections sont ombrées. Quelle est la probabilité de tomber sur une section ombrée ?",
      {t:"\\("+cs2+"\\)",fb:"Oui : "+favSecs+" des "+secs+" sections sont ombrées, ce qui se simplifie en "+cs2+"."},ds2.slice(0,3),
      "Sections favorables : "+favSecs+". Nombre total de sections : "+secs+". \\(P = "+FR(favSecs,secs)+" = "+cs2+"\\). La probabilité est <b>\\("+cs2+"\\)</b>.",{mode:"spinner"});
  }
  var r=ri(1,6),b=ri(1,6),g=ri(0,5);var total2=r+b+g;var colPick=pick(["rouge","bleue"]);var colPl=colPick==="rouge"?"rouges":"bleues";var fav2=colPick==="rouge"?r:b;
  var cs3=u7fracStr(fav2,total2);var seen3={};seen3[cs3]=1;var ds3=[];
  [u7fracStr(total2-fav2,total2),fav2+"/"+total2,u7fracStr(fav2,total2-fav2),u7fracStr(fav2+1,total2)].forEach(function(a){if(!seen3[a]&&ds3.length<3){seen3[a]=1;ds3.push({t:"\\("+a+"\\)",fb:"Le numérateur compte seulement les billes "+colPl+", et le dénominateur est le nombre total de billes. Simplifie à la fin."});}});
  var e3=1;while(ds3.length<3){var a3=u7fracStr(e3,total2+3);if(!seen3[a3]){seen3[a3]=1;ds3.push({t:"\\("+a3+"\\)",fb:"Compte les billes "+colPl+" sur le total, puis simplifie."});}e3++;}
  return mcq("Un sac contient "+r+" billes rouges, "+b+" billes bleues"+(g?" et "+g+" billes vertes":"")+". On pige une bille au hasard. Quelle est la probabilité de piger une bille "+colPick+" ?",
    {t:"\\("+cs3+"\\)",fb:"Oui : "+fav2+" des "+total2+" billes sont "+colPl+", ce qui se simplifie en "+cs3+"."},ds3.slice(0,3),
    "Résultats favorables : "+fav2+". Nombre total de résultats : "+total2+". \\(P = "+FR(fav2,total2)+" = "+cs3+"\\). La probabilité est <b>\\("+cs3+"\\)</b>.",{mode:"bag"});
},["La probabilité est le nombre de résultats favorables divisé par le nombre total de résultats possibles.","Commence par compter les résultats favorables et le nombre total de résultats, puis simplifie la fraction."]);

E("u7-bar-graph",7,["11.6","11.9"],1,"gen",function(){
  var sets=[["Marche","Autobus","Vélo","Voiture"],["Hockey","Soccer","Natation","Danse"],["Chats","Chiens","Poissons","Oiseaux"],["Pizza","Pâtes","Salade","Soupe"]];
  var labels=pick(sets);var vals=labels.map(function(){return ri(2,14);});
  var mode=pick(["max","total","diff","read"]);
  var prompt,correct,ds,sol;
  if(mode==="max"){var mi=vals.indexOf(Math.max.apply(null,vals));correct=labels[mi];
    ds=labels.filter(function(l,i){return i!==mi;}).map(function(l){return {t:l,fb:"Compare la hauteur des barres. La barre la plus haute montre la plus grande valeur."};});
    prompt="Le diagramme à barres montre les résultats d'un sondage. Quelle catégorie a le plus grand nombre ?";sol="La barre la plus haute est "+labels[mi]+" avec "+vals[mi]+". La réponse est <b>"+labels[mi]+"</b>.";
  } else if(mode==="total"){var tot=vals.reduce(function(a,b){return a+b;},0);correct=String(tot);
    ds=u7numOpts(tot,[tot+3,tot-2,Math.max.apply(null,vals)]).map(function(v){return {t:String(v),fb:"Additionne la hauteur des quatre barres pour obtenir le total."};});
    prompt="Le diagramme à barres montre les résultats d'un sondage. Combien y a-t-il eu de réponses au total ?";sol="Additionne les valeurs des barres : "+vals.join(" + ")+" = "+tot+". Le total est <b>"+tot+"</b>.";
  } else if(mode==="diff"){var i1=ri(0,3),i2=ri(0,3);if(i2===i1)i2=(i1+1)%4;var d=Math.abs(vals[i1]-vals[i2]);correct=String(d);
    ds=u7numOpts(d,[d+2,Math.max(d-1,0),vals[i1]+vals[i2]]).map(function(v){return {t:String(v),fb:"Lis la hauteur des deux barres, puis soustrais la plus petite de la plus grande."};});
    prompt="Le diagramme à barres montre les résultats d'un sondage. Combien de réponses de plus y a-t-il pour "+labels[i1]+" que pour "+labels[i2]+" ?";sol=labels[i1]+" compte "+vals[i1]+" réponses et "+labels[i2]+" en compte "+vals[i2]+". La différence est \\(|"+vals[i1]+" - "+vals[i2]+"| = "+d+"\\). La réponse est <b>"+d+"</b>.";
  } else {var i3=ri(0,3);correct=String(vals[i3]);
    ds=u7numOpts(vals[i3],[vals[i3]+1,Math.max(vals[i3]-1,0),vals[(i3+1)%4]]).map(function(v){return {t:String(v),fb:"Trouve la barre pour "+labels[i3]+" et lis la valeur à son sommet."};});
    prompt="Le diagramme à barres montre les résultats d'un sondage. Combien de réponses y a-t-il pour "+labels[i3]+" ?";sol="Le haut de la barre pour "+labels[i3]+" est à "+vals[i3]+". La réponse est <b>"+vals[i3]+"</b>.";
  }
  var q=mcq(prompt,{t:correct,fb:"Oui, cette lecture correspond au diagramme à barres."},ds,sol,{mode:mode});
  q.figure=u7barSVG(labels,vals,"Réponses");
  return q;
},["Lis la hauteur de chaque barre à partir du haut de la barre avant de calculer.","Commence par noter la valeur de chaque barre montrée."]);

E("u7-line-graph",7,["11.9"],1,"gen",function(){
  var days=["Lundi","Mardi","Mercredi","Jeudi","Vendredi"];var vals=days.map(function(){return ri(6,24);});
  var mode=pick(["warmest","change","read"]);
  var prompt,correct,ds,sol;
  if(mode==="warmest"){var mi=vals.indexOf(Math.max.apply(null,vals));correct=days[mi];
    ds=days.filter(function(d,i){return i!==mi;}).slice(0,3).map(function(d){return {t:d,fb:"Le point le plus haut du diagramme linéaire marque la plus grande température."};});
    prompt="Le diagramme linéaire montre la température maximale quotidienne pendant cinq jours. Quel jour a-t-il fait le plus chaud ?";sol="Le point le plus haut correspond à "+days[mi]+" avec "+vals[mi]+" degrés. La réponse est <b>"+days[mi]+"</b>.";
  } else if(mode==="change"){var i1=ri(0,2),i2=ri(3,4);var d=vals[i2]-vals[i1];correct=String(d);
    ds=u7numOpts(d,[d+2,d-2,-d===d?d+3:-d]).map(function(v){return {t:String(v),fb:"Soustrais la température de départ de la température d'arrivée, en gardant le signe."};});
    if(ds.length<3)ds.push({t:String(d+5),fb:"Soustrais la température de départ de la température d'arrivée, en gardant le signe."});
    prompt="Le diagramme linéaire montre la température maximale quotidienne pendant cinq jours. De combien de degrés la température a-t-elle changé entre "+days[i1]+" et "+days[i2]+" ?";sol="\\[ \\begin{aligned} \\text{changement} &= "+vals[i2]+" - "+vals[i1]+" \\\\ &= "+d+" \\end{aligned} \\] Le changement est <b>"+d+" degrés</b>.";
  } else {var i3=ri(0,4);correct=String(vals[i3]);
    ds=u7numOpts(vals[i3],[vals[i3]+2,Math.max(vals[i3]-2,0),vals[(i3+2)%5]]).map(function(v){return {t:String(v),fb:"Trouve "+days[i3]+" sur l'axe horizontal et lis la valeur du point au-dessus."};});
    prompt="Le diagramme linéaire montre la température maximale quotidienne pendant cinq jours. Quelle était la température "+days[i3]+" ?";sol="Le point au-dessus de "+days[i3]+" est à "+vals[i3]+" degrés. La réponse est <b>"+vals[i3]+" degrés</b>.";
  }
  var q=mcq(prompt,{t:correct,fb:"Oui, cette lecture correspond au diagramme linéaire."},ds,sol,{mode:mode});
  q.figure=u7lineSVG(days,vals,"Degrés");
  return q;
},["Chaque point d'un diagramme linéaire donne la valeur pour ce jour.","Commence par lire les deux valeurs dont tu as besoin directement sur le diagramme."]);

E("u7-circle-graph",7,["11.9"],1,"gen",function(){
  var labelSets=[["Autobus","Marche","Vélo"],["Lecture","Jeux","Sport","Musique"],["Pommes","Bananes","Oranges"],["Rouge","Bleu","Vert","Jaune"],["Soccer","Hockey","Danse"],["Thé","Jus","Eau","Lait"]];
  var pctSets=[[50,30,20],[40,30,20,10],[25,50,25],[30,30,25,15],[60,25,15],[45,35,20],[20,20,30,30],[35,45,20]];
  var labels=pick(labelSets);var pcts=pick(pctSets);var guard=0;while(pcts.length!==labels.length&&guard<20){pcts=pick(pctSets);guard++;}
  if(pcts.length!==labels.length){labels=["Autobus","Marche","Vélo","Voiture"];pcts=[40,30,20,10];}
  var total=pick([40,60,80,100,120,160,200]);var idx=ri(0,labels.length-1);var qty=pcts[idx]*total/100;
  var ctx=pick(["se rendent à l'école","choisissent une activité de temps libre","choisissent un fruit préféré","choisissent une couleur préférée","s'inscrivent à un club de sport","choisissent une boisson"]);
  var prompt="Un diagramme circulaire montre comment "+total+" élèves "+ctx+". Combien d'élèves la section "+labels[idx]+" représente-t-elle ?";
  var ds=u7numOpts(qty,[qty+5,Math.max(qty-5,1),pcts[idx]]).map(function(v){return {t:String(v),fb:"Multiplie le pourcentage de cette section par le nombre total d'élèves."};});
  var q=mcq(prompt,{t:String(qty),fb:"Oui : "+pcts[idx]+" % de "+total+" donne "+qty+"."},ds,
    "La section "+labels[idx]+" vaut "+pcts[idx]+" % du total. \\[ \\begin{aligned} \\text{quantité} &= "+fmtD(pcts[idx]/100,2)+" \\times "+total+" \\\\ &= "+qty+" \\end{aligned} \\] La réponse est <b>"+qty+" élèves</b>.",{mode:"circle"});
  q.figure=u7pieSVG(labels.map(function(l,i){return {label:l,pct:pcts[i]};}));
  return q;
},["Une section d'un diagramme circulaire montre un pourcentage du total complet.","Commence par multiplier le pourcentage de la section, écrit sous forme décimale, par le total."]);

E("u7-choose-measure",7,["11.8"],2,"var",varset([
  function(){return mcq("Un magasin de chaussures note les pointures vendues en une journée. Le propriétaire veut savoir quelle pointure stocker le plus. Quelle mesure est la plus appropriée ?",
    {t:"Mode",fb:"Oui : le mode nomme la pointure vendue le plus souvent, exactement ce qu'il faut pour stocker."},
    [{t:"Moyenne",fb:"La pointure moyenne peut tomber entre deux pointures et ne nomme pas la pointure la plus courante."},{t:"Médiane",fb:"La médiane donne la pointure du milieu, pas la pointure vendue le plus souvent."},{t:"Étendue",fb:"L'étendue mesure la dispersion, pas la pointure qui se vend le plus."}],
    "Les décisions de stock dépendent de la pointure la plus fréquente, c'est-à-dire le mode. La réponse est <b>Mode</b>.",{mode:"shoe"});},
  function(){return mcq("Dix employés gagnent des salaires typiques, et le propriétaire gagne beaucoup plus que tous les autres. Quelle mesure rapporte le mieux un salaire typique ?",
    {t:"Médiane",fb:"Oui : la médiane est le salaire du milieu et bouge à peine à cause du seul très gros salaire."},
    [{t:"Moyenne",fb:"La moyenne est tirée vers le haut par le salaire du propriétaire, donc elle surestime un salaire typique."},{t:"Mode",fb:"Les salaires peuvent tous être différents, donc il peut ne pas y avoir de mode à rapporter."},{t:"Étendue",fb:"L'étendue mesure la dispersion, pas une valeur typique."}],
    "Un seul salaire extrême tire la moyenne vers le haut. La valeur du milieu, la médiane, représente mieux un salaire typique. La réponse est <b>Médiane</b>.",{mode:"wage"});},
  function(){return mcq("Un enseignant veut un seul nombre pour le rendement global de la classe à un quiz, afin de comparer le total des points obtenus entre deux classes de même taille. Quelle mesure convient le mieux ?",
    {t:"Moyenne",fb:"Oui : la moyenne utilise chaque résultat et reflète le total des points obtenus."},
    [{t:"Mode",fb:"Le mode nomme seulement le résultat le plus courant et ignore le reste."},{t:"Médiane",fb:"La médiane utilise seulement le résultat du milieu et ignore la hauteur des autres."},{t:"Étendue",fb:"L'étendue mesure la dispersion, pas le rendement global."}],
    "Comparer des totaux entre des groupes de même taille demande la moyenne, qui utilise chaque valeur. La réponse est <b>Moyenne</b>.",{mode:"quiz"});},
  function(){return mcq("Un sondage demande aux élèves leur mets préféré au dîner. Quelle mesure peut décrire le choix le plus populaire ?",
    {t:"Mode",fb:"Oui : les mets préférés sont des catégories, et le mode nomme la catégorie la plus choisie."},
    [{t:"Moyenne",fb:"Les catégories n'ont pas de moyenne numérique, donc on ne peut pas calculer de moyenne."},{t:"Médiane",fb:"Les catégories ne peuvent pas être mises en ordre pour donner une valeur du milieu utile ici."},{t:"Étendue",fb:"L'étendue demande des valeurs numériques et mesure la dispersion."}],
    "Les données sont des catégories, donc seul le mode s'applique : il nomme le choix le plus populaire. La réponse est <b>Mode</b>.",{mode:"lunch"});},
  function(){return mcq("Les prix des maisons d'une rue sont pour la plupart semblables, sauf une grande maison qui vaut beaucoup plus. Un rapport veut le prix typique d'une maison. Quelle mesure est la plus appropriée ?",
    {t:"Médiane",fb:"Oui : la médiane se situe parmi les prix typiques et résiste à l'attraction de la grande maison."},
    [{t:"Moyenne",fb:"La grande maison tire la moyenne bien au-dessus du prix typique de la rue."},{t:"Mode",fb:"Les prix se répètent rarement exactement, donc un mode peut ne pas exister."},{t:"Étendue",fb:"L'étendue mesure la dispersion, pas un prix typique."}],
    "La grande maison unique est une valeur aberrante qui fausse la moyenne. La médiane donne le prix typique. La réponse est <b>Médiane</b>.",{mode:"house"});}
]),["Apparie la mesure à la question : la plus fréquente, celle du milieu ou la moyenne globale.","Commence par te demander ce que le rapport doit décrire, et si une valeur est extrême."]);

E("u7-outlier-find",7,["11.10"],1,"gen",function(){
  var base=ri(10,30);var cluster=[];for(var i=0;i<5;i++)cluster.push(base+ri(-3,4));
  var high=Math.random()<0.5;var out=high?base+ri(25,45):Math.max(base-ri(18,26),1);
  var vals=shuffle(cluster.concat([out]));
  var others=cluster.slice().sort(function(a,b){return a-b;});
  var cand=[others[4],others[0],Math.round(u7median(vals))];
  var seen={};seen[String(out)]=1;var ds=[];
  cand.forEach(function(v){if(!seen[String(v)]){seen[String(v)]=1;ds.push({t:String(v),fb:"Cette valeur se trouve dans le groupe principal. Une valeur aberrante est loin du reste des données."});}});
  var k=1;while(ds.length<3){var v=out+k*7;k++;if(seen[String(v)])continue;seen[String(v)]=1;ds.push({t:String(v),fb:"Cette valeur n'est même pas dans l'ensemble de données. Vérifie chaque valeur de la liste par rapport au groupe."});}
  return mcq("Ensemble de données : "+vals.join(", ")+". Quelle valeur est une valeur aberrante ?",
    {t:String(out),fb:"Oui : "+out+" est loin du groupe de valeurs près de "+base+"."},ds,
    "La plupart des valeurs se regroupent près de "+base+", entre "+Math.min.apply(null,cluster)+" et "+Math.max.apply(null,cluster)+". La valeur "+out+" se trouve loin en dehors de ce groupe. La valeur aberrante est <b>"+out+"</b>.",{mode:"find"});
},["Une valeur aberrante est une valeur très éloignée du groupe principal de données.","Commence par imaginer les valeurs sur une droite numérique et cherche un écart."]);

E("u7-missing-value-cr",7,["11.9"],2,"gen",function(){
  var meanT=ri(6,12);var known=[];var s=0;for(var i=0;i<4;i++){var v=ri(3,15);known.push(v);s+=v;}
  var missing=5*meanT-s;var guard=0;
  while((missing<1||missing>20)&&guard<40){known=[];s=0;for(var j=0;j<4;j++){var w=ri(3,15);known.push(w);s+=w;}missing=5*meanT-s;guard++;}
  if(missing<1||missing>20){known=[meanT-2,meanT,meanT+1,meanT+1];s=4*meanT;missing=meanT;}
  return numq("Quatre résultats de quiz sont "+known.join(", ")+". Quel cinquième résultat donne une moyenne d'exactement "+meanT+" ?",
    missing,0,
    "Les cinq résultats doivent totaliser \\(5 \\times "+meanT+" = "+(5*meanT)+"\\). \\[ \\begin{aligned} \\text{total connu} &= "+known.join(" + ")+" = "+s+" \\\\ \\text{cinquième résultat} &= "+(5*meanT)+" - "+s+" = "+missing+" \\end{aligned} \\] Le cinquième résultat est <b>"+missing+"</b>.",
    {mode:"missing",mean:meanT});
},["Travaille à rebours à partir de la moyenne : le total est la moyenne fois le nombre de valeurs.","Commence par multiplier la moyenne visée par 5 pour trouver le total requis."]);

E("u7-median-range-cr",7,["11.6","11.7"],1,"gen",function(){
  var mode=pick(["median6","median5","range"]);
  if(mode==="range"){var lo=ri(3,12),hi=lo+ri(5,16);var vals=[lo,hi];for(var i=0;i<4;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
    return numq("Ensemble de données : "+vals.join(", ")+". Quelle est l'étendue ?",hi-lo,0,
      "La plus grande valeur est "+hi+" et la plus petite est "+lo+". \\[ \\begin{aligned} \\text{étendue} &= "+hi+" - "+lo+" \\\\ &= "+(hi-lo)+" \\end{aligned} \\] L'étendue est <b>"+(hi-lo)+"</b>.",{mode:"range"});
  }
  if(mode==="median5"){var v5=[];for(var a=0;a<5;a++)v5.push(ri(2,18));var s5=v5.slice().sort(function(x,y){return x-y;});var med5=s5[2];
    return numq("Ensemble de données : "+v5.join(", ")+". Quelle est la médiane ?",med5,0,
      "Mets les valeurs en ordre : "+s5.join(", ")+". La valeur du milieu est <b>"+med5+"</b>.",{mode:"median5"});
  }
  var v6=[];for(var b=0;b<6;b++)v6.push(ri(2,20));var s6=v6.slice().sort(function(x,y){return x-y;});var med6=(s6[2]+s6[3])/2;
  return numq("Ensemble de données : "+v6.join(", ")+". Quelle est la médiane ?",med6,0.01,
    "Mets les valeurs en ordre : "+s6.join(", ")+". Avec six valeurs, fais la moyenne des deux valeurs du milieu. \\[ \\begin{aligned} \\text{médiane} &= \\frac{"+s6[2]+" + "+s6[3]+"}{2} \\\\ &= "+fmtD(med6)+" \\end{aligned} \\] La médiane est <b>"+fmtD(med6)+"</b>.",{mode:"median6"});
},["Mets les valeurs en ordre avant de trouver une médiane; l'étendue ne demande que les deux extrêmes.","Commence par réécrire l'ensemble de données en ordre croissant."]);

E("u7-two-event-pct-cr",7,["12.4","12.5","12.7"],1,"gen",function(){
  var fam=pick(["coinspin","coinspin","coindie","twocoin","spindie","twospin","dicesum"]);
  var fav,total,desc;
  var opener=pick(["À une table de jeux","Dans une activité en classe","Pendant un jeu de société","À la foire de l'école","Dans une leçon de probabilité"]);
  if(fam==="coinspin"){var s1=pick([3,4,5,6,8]);var k=ri(1,s1);var face=pick(["face","pile"]);fav=1;total=2*s1;desc="on lance une pièce et on fait tourner une roulette à "+s1+" sections, et le résultat est "+face+" et la section "+k;}
  else if(fam==="coindie"){var tg=pick([["face et un nombre pair",3],["pile et un nombre impair",3],["face et un nombre supérieur à 4",2],["pile et un nombre inférieur à 3",2],["face et un 5",1],["pile et un 2",1]]);fav=tg[1];total=12;desc="on lance une pièce et on lance un dé, et le résultat est "+tg[0];}
  else if(fam==="twocoin"){var tg2=pick([["deux faces",1],["deux piles",1],["exactement une face",2],["au moins une face",3]]);fav=tg2[1];total=4;desc="on lance deux pièces, et le résultat est "+tg2[0];}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="on fait tourner une roulette à "+s2+" sections et on lance un dé, et le résultat est la section "+k2+" et un "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5]);var k3=ri(1,s3);fav=1;total=s3*s3;desc="on fait tourner une roulette à "+s3+" sections deux fois, et le résultat est la section "+k3+" les deux fois";}
  else {var t=ri(2,8);fav=t<=7?t-1:13-t;total=36;desc="on lance deux dés, et le résultat est un total de "+t;}
  var pct=fav/total*100;
  return numq(opener+", "+desc+". Quelle est la probabilité théorique de ce résultat, en pourcentage ?",
    Math.round(pct*100)/100,0.02,
    "L'espace échantillonnal combiné compte "+total+" résultats également probables, et "+fav+" d'entre eux correspondent. \\[ \\begin{aligned} P &= "+FR(fav,total)+" \\\\ &= "+fmtD(pct)+"\\% \\end{aligned} \\] La probabilité est <b>"+fmtD(pct)+" %</b>.",
    {mode:"pct",total:total,fav:fav});
},["Note d'abord la taille de l'espace échantillonnal combiné : multiplie les résultats de chaque évènement.","Commence par compter tous les résultats combinés, puis ceux qui correspondent."]);
E("u7-sample-space",7,["12.3","12.4"],1,"gen",function(){
  var mode=pick(["table","table","count","favcount"]);
  if(mode==="table"){
    var d=pick([3,4,5,6]);var useSpin=Math.random()<0.4;
    var colHead=useSpin?["A","B","C"]:["F","P"];var ncols=colHead.length;
    var rows=[];for(var r=1;r<=d;r++){var row=[String(r)];for(var c=0;c<ncols;c++)row.push(colHead[c]+r);rows.push(row);}
    var total=d*ncols;var ask=pick(["total","dienum","single"]);
    if(ask==="total"){
      var dsT=u7numOpts(total,[total+ncols,total-d,d+ncols]).map(function(v){return {t:String(v),fb:"Multiplie les résultats d'un évènement par les résultats de l'autre, ou compte chaque cellule du tableau."};});
      var qT=mcq("Le tableau montre tous les résultats quand "+(useSpin?"on fait tourner une roulette à trois sections":"on lance une pièce")+" et on lance un dé à "+d+" faces. Combien y a-t-il de résultats dans l'espace échantillonnal ?",
        {t:String(total),fb:"Oui : "+d+" résultats du dé fois "+ncols+" résultats de l'autre évènement donnent "+total+"."},dsT,
        "Multiplie les résultats de chaque évènement : \\("+d+" \\times "+ncols+" = "+total+"\\). L'espace échantillonnal compte <b>"+total+"</b> résultats.",{mode:"table"});
      qT.figure=u7tableSVG("Dé",colHead,rows);return qT;
    }
    if(ask==="dienum"){var target=ri(1,d);
      var dsD=u7numOpts(ncols,[ncols+1,total,d]).map(function(v){return {t:String(v),fb:"Trouve la rangée de ce numéro de dé et compte ses cellules, une pour chaque résultat de l'autre évènement."};});
      var qD=mcq("Le tableau montre tous les résultats quand on lance une pièce et un dé à "+d+" faces. Combien de résultats ont le numéro de dé "+target+" ?",
        {t:String(ncols),fb:"Oui : le numéro de dé "+target+" apparaît une fois avec face et une fois avec pile."},dsD,
        "La rangée du numéro de dé "+target+" contient une cellule pour face et une pour pile. La réponse est <b>"+ncols+"</b> résultats.",{mode:"table"});
      qD.figure=u7tableSVG("Dé",["F","P"],rows);return qD;
    }
    var k=ri(1,d);var face=pick(["F","P"]);
    var dsS=u7numOpts(1,[2,d,total]).map(function(v){return {t:String(v),fb:"Une seule combinaison exacte apparaît exactement une fois dans un tableau complet des résultats."};});
    var qS=mcq("Le tableau montre tous les résultats quand on lance une pièce et un dé à "+d+" faces. Combien de résultats sont exactement "+face+k+" (résultat de la pièce "+face+", numéro du dé "+k+") ?",
      {t:"1",fb:"Oui : cette combinaison exacte remplit exactement une cellule du tableau."},dsS,
      "Chaque cellule du tableau est une combinaison exacte, et "+face+k+" remplit une cellule. La réponse est <b>1</b>.",{mode:"table"});
    qS.figure=u7tableSVG("Dé",["F","P"],rows);return qS;
  }
  var devA=[["une pièce",2,"la pièce"],["une roulette à trois sections",3,"la roulette"],["une roulette à quatre sections",4,"la roulette"],["une roulette à cinq sections",5,"la roulette"],["un dé à six faces",6,"le dé"],["un dé à huit faces",8,"le dé"]];
  var devB=[["une pièce",2,"la pièce"],["un dé à quatre faces",4,"le dé"],["une roulette à six sections",6,"la roulette"],["un dé à huit faces",8,"le dé"],["une roulette à trois sections",3,"la roulette"],["un dé à quatre faces",4,"le dé"]];
  var A=pick(devA),B=pick(devB);var guard=0;while(A[1]*B[1]>36&&guard<20){B=pick(devB);guard++;}
  if(A[1]*B[1]>36){B=["un dé à quatre faces",4,"le dé"];}
  var tot=A[1]*B[1];
  if(mode==="favcount"){
    var dsF=u7numOpts(A[1],[B[1],tot,A[1]+B[1]]).map(function(v){return {t:String(v),fb:"Fixe le résultat nommé pour le deuxième évènement; le premier évènement peut encore montrer n'importe lequel de ses résultats."};});
    return mcq("On utilise "+A[0]+" avec "+B[0]+". Dans l'espace échantillonnal combiné, combien de résultats montrent un résultat précisé sur "+B[2]+" (avec n'importe quel résultat sur "+A[2]+") ?",
      {t:String(A[1]),fb:"Oui : le deuxième évènement est fixé, et "+A[2]+" peut montrer n'importe lequel de ses "+A[1]+" résultats."},dsF,
      "Avec le deuxième évènement fixé à un résultat, le premier évènement a encore "+A[1]+" résultats possibles. La réponse est <b>"+A[1]+"</b> résultats.",{mode:"favcount"});
  }
  var ds3=u7numOpts(tot,[A[1]+B[1],tot+4,Math.max(tot-2,2),tot*2]).map(function(v){return {t:String(v),fb:"Pour des évènements indépendants, multiplie le nombre de résultats de chaque évènement."};});
  return mcq("On utilise "+A[0]+" avec "+B[0]+". Combien y a-t-il de résultats dans l'espace échantillonnal combiné ?",
    {t:String(tot),fb:"Oui : "+A[1]+" résultats fois "+B[1]+" résultats donnent "+tot+"."},ds3,
    "Les évènements sont indépendants, donc multiplie : \\("+A[1]+" \\times "+B[1]+" = "+tot+"\\). L'espace échantillonnal compte <b>"+tot+"</b> résultats.",{mode:"count"});
},["Pour deux évènements indépendants, multiplie les nombres de résultats pour obtenir la taille de l'espace échantillonnal.","Commence par compter les résultats de chaque évènement séparément."]);

E("u7-exp-vs-theor",7,["12.6"],1,"gen",function(){
  var trials=pick([20,40,50,100]);var theo=pick([["lancer un dé et obtenir un 6",1,6],["lancer une pièce et obtenir face",1,2],["faire tourner une roulette à quatre sections et tomber sur une section donnée",1,4],["piger une bille rouge dans un sac de 3 billes rouges et 2 billes bleues",3,5]]);
  var expected=theo[1]/theo[2]*trials;var obs=Math.max(1,Math.round(expected+ri(-4,4)));var guard=0;while(obs===expected&&guard<10){obs=Math.max(1,Math.round(expected+ri(-4,4)));guard++;}
  var expP=obs/trials;var mode=pick(["expfrac","compare"]);
  if(mode==="compare"){
    var larger=expP>theo[1]/theo[2]?"La probabilité expérimentale est plus grande":"La probabilité théorique est plus grande";
    var other=larger.indexOf("expérimentale")>=0?"La probabilité théorique est plus grande":"La probabilité expérimentale est plus grande";
    return mcq("En "+trials+" essais consistant à "+theo[0]+", le résultat s'est produit "+obs+" fois. Quel énoncé compare correctement les probabilités ?",
      {t:larger,fb:"Oui : la valeur expérimentale est "+u7fracStr(obs,trials)+" et la valeur théorique est "+u7fracStr(theo[1],theo[2])+", et leur comparaison donne ce résultat."},
      [{t:other,fb:"Compare directement les deux valeurs : l'expérimentale est "+obs+"/"+trials+", la théorique est "+theo[1]+"/"+theo[2]+"."},{t:"Les deux probabilités sont exactement égales",fb:"Les comptes ne correspondent pas exactement à la part théorique, donc les probabilités diffèrent."},{t:"Les deux ne peuvent pas se comparer directement",fb:"Les deux sont des fractions entre 0 et 1, donc on peut les comparer directement."}],
      "Probabilité expérimentale : \\("+FR(obs,trials)+"\\). Probabilité théorique : \\("+FR(theo[1],theo[2])+"\\). En comparant les deux, <b>"+larger.toLowerCase()+"</b>.",{mode:"compare"});
  }
  var cs=u7fracStr(obs,trials);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(theo[1],theo[2]),obs+"/"+trials,u7fracStr(trials-obs,trials)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"La probabilité expérimentale utilise le nombre observé sur le nombre d'essais, puis se simplifie."});}});
  var e=2;while(ds.length<3){var a2=u7fracStr(e,trials);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"La probabilité expérimentale utilise le nombre observé sur le nombre d'essais, puis se simplifie."});}e++;}
  return mcq("En "+trials+" essais consistant à "+theo[0]+", le résultat s'est produit "+obs+" fois. Quelle est la probabilité expérimentale du résultat ?",
    {t:"\\("+cs+"\\)",fb:"Oui : "+obs+" réussites sur "+trials+" essais se simplifient en "+cs+"."},ds,
    "La probabilité expérimentale est les réussites sur les essais. \\(P = "+FR(obs,trials)+" = "+cs+"\\). La probabilité expérimentale est <b>\\("+cs+"\\)</b>.",{mode:"expfrac"});
},["La probabilité expérimentale vient des résultats : les réussites divisées par les essais.","Commence par écrire le nombre observé sur le nombre total d'essais."]);

E("u7-two-events-prob",7,["12.1","12.5"],2,"gen",function(){
  var fam=pick(["twocoin","coindie","coindie","spincoin","spindie","twospin","dicesum"]);
  var fav,total,desc,target;
  if(fam==="twocoin"){var tg=pick([["deux faces",1],["deux piles",1],["exactement une face",2],["au moins une face",3],["exactement une pile",2]]);fav=tg[1];total=4;desc="on lance deux pièces";target=tg[0];}
  else if(fam==="coindie"){var tg2=pick([["face et un nombre pair",3],["pile et un nombre impair",3],["face et un nombre supérieur à 4",2],["face et un nombre inférieur à 3",2],["pile et un 6",1],["face et un 1",1],["face et un nombre premier",3]]);fav=tg2[1];total=12;desc="on lance une pièce et on lance un dé";target=tg2[0];}
  else if(fam==="spincoin"){var s1=pick([3,4,6,8]);var k=ri(1,s1);var face=pick(["face","pile"]);fav=1;total=2*s1;desc="on fait tourner une roulette à "+s1+" sections et on lance une pièce";target="la section "+k+" et "+face;}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="on fait tourner une roulette à "+s2+" sections et on lance un dé";target="la section "+k2+" et un "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5,6]);var k3=ri(1,s3);var k4=ri(1,s3);fav=1;total=s3*s3;desc="on fait tourner une roulette à "+s3+" sections deux fois";target="la section "+k3+" puis la section "+k4;}
  else {var t=ri(2,9);fav=t<=7?t-1:13-t;total=36;desc="on lance deux dés";target="un total de "+t;}
  var opener=pick(["Quand ","À une table de jeux, quand ","Dans un jeu en classe, quand ","Pendant un jeu de société, quand "]);
  var cs=u7fracStr(fav,total);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(total-fav,total),fav+"/"+total,u7fracStr(fav+1,total),u7fracStr(fav,total+6)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Compte les résultats combinés correspondants sur l'espace échantillonnal complet, puis simplifie."});}});
  var e=3;while(ds.length<3){var a2=u7fracStr(e,total);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Compte les résultats combinés correspondants sur l'espace échantillonnal complet, puis simplifie."});}e++;}
  return mcq(opener+desc+", quelle est la probabilité théorique d'obtenir "+target+" ?",
    {t:"\\("+cs+"\\)",fb:"Oui : "+fav+" des "+total+" résultats combinés correspondent, ce qui se simplifie en "+cs+"."},ds,
    "L'espace échantillonnal compte "+total+" résultats également probables et "+fav+" correspondent à la cible. \\(P = "+FR(fav,total)+" = "+cs+"\\). La probabilité est <b>\\("+cs+"\\)</b>.",{mode:"two",fam:fam});
},["Construis d'abord l'espace échantillonnal combiné, puis compte les résultats correspondants.","Commence par multiplier les nombres de résultats des deux évènements pour obtenir la taille de l'espace échantillonnal."]);
E("u7-outlier-effect",7,["11.11","11.8"],1,"gen",function(){
    var base=ri(8,15);var vals=[];for(var i=0;i<5;i++)vals.push(base+ri(-2,3));var out=base+ri(30,50);var all=vals.concat([out]);
    return mcq("Ensemble de données : "+shuffle(all).join(", ")+". La valeur "+out+" est une valeur aberrante. Quel énoncé décrit correctement son effet ?",
      {t:"Elle fait beaucoup monter la moyenne, mais change à peine la médiane",fb:"Oui : la moyenne utilise la taille complète de la valeur aberrante, tandis que la médiane ne bouge que légèrement de position."},
      [{t:"Elle fait beaucoup monter la médiane, mais change à peine la moyenne",fb:"La médiane dépend de la position, pas de la taille, donc une seule grande valeur la bouge à peine. La moyenne absorbe la valeur complète."},{t:"Elle change la moyenne et la médiane du même montant",fb:"La moyenne est tirée vers la valeur aberrante; la médiane ne l'est pas, donc les effets diffèrent."},{t:"Elle n'a aucun effet sur l'une ou l'autre mesure",fb:"La moyenne doit monter parce que le total augmente alors que le nombre de valeurs n'augmente que de un."}],
      "La valeur aberrante ajoute un gros montant au total, ce qui tire fortement la moyenne vers le haut. La médiane, basée sur la position, bouge très peu. La réponse est <b>Elle fait beaucoup monter la moyenne, mais change à peine la médiane</b>.",{mode:"effect"});
},["Demande-toi quelle mesure la valeur aberrante peut tirer : la moyenne utilise la taille de chaque valeur.","Commence par vérifier si une valeur est loin du reste des données."]);


E("u7-outlier-measure-choice",7,["11.11","11.8"],2,"gen",function(){
  var base2=ri(20,40);
  return mcq("Les salaires dans un petit commerce sont pour la plupart près de "+fmtD(base2*1000)+" $, mais le propriétaire gagne "+fmtD((base2+120)*1000)+" $. Quelle mesure un rapport devrait-il utiliser pour un salaire typique, et pourquoi ?",
    {t:"La médiane, parce que le salaire du propriétaire tire la moyenne vers le haut",fb:"Oui : la médiane résiste au seul salaire extrême et reste typique."},
    [{t:"La moyenne, parce qu'elle utilise chaque salaire, y compris celui du propriétaire",fb:"Utiliser chaque salaire est justement le problème ici : le salaire extrême éloigne la moyenne du typique."},{t:"Le mode, parce que la plupart des salaires se répètent exactement",fb:"Les salaires se répètent rarement exactement, donc un mode peut ne pas exister."},{t:"L'étendue, parce qu'elle montre le salaire typique",fb:"L'étendue montre la dispersion entre les extrêmes, pas une valeur typique."}],
    "Un seul salaire extrême fausse la moyenne. La médiane reste parmi les salaires typiques. La réponse est <b>La médiane, parce que le salaire du propriétaire tire la moyenne vers le haut</b>.",{mode:"choose"});
},["Demande-toi quelle mesure la valeur aberrante peut tirer : la moyenne utilise la taille de chaque valeur.","Commence par vérifier si une valeur est loin du reste des données."]);

E("u7-outlier-judge",7,["11.10","11.12","11.13"],3,"var",varset([
  function(){return mcq("Les temps de course d'un coureur, en secondes, sont pour la plupart près de 62, mais un temps est 95 parce que le coureur s'est arrêté pour rattacher son soulier. Un rapport sur le temps typique du coureur devrait :",
    {t:"Laisser de côté le 95, parce qu'il reflète l'arrêt, pas la vitesse du coureur",fb:"Oui : la valeur aberrante vient d'une interruption, donc elle représente mal le rendement typique."},
    [{t:"Garder le 95, parce que chaque valeur enregistrée doit toujours être utilisée",fb:"Les valeurs causées par un problème d'enregistrement ou une interruption peuvent être exclues à juste titre, avec une raison énoncée."},{t:"Garder le 95 et rapporter seulement la moyenne de ses temps de course", fb:"La moyenne avec le 95 inclus surestimerait le plus le temps typique."},{t:"Remplacer le 95 par le temps le plus rapide jamais enregistré par le coureur", fb:"Changer une valeur enregistrée pour un autre nombre invente des données."}],
    "Le temps de 95 secondes a été causé par un arrêt, pas par la vitesse de course, donc il devrait être exclu quand on rapporte le rendement typique. La réponse est <b>Laisser de côté le 95</b>.",{mode:"race"});},
  function(){return mcq("Une classe recueille la taille des 20 élèves. Un élève est beaucoup plus grand que les autres, mais la mesure est exacte. Pour un rapport sur les tailles de la classe, la grande valeur devrait :",
    {t:"Être gardée, parce qu'elle est un membre véritable de la classe",fb:"Oui : une mesure exacte qui appartient au groupe reste dans le rapport, et la médiane peut limiter son attraction."},
    [{t:"Être laissée de côté, parce qu'elle est beaucoup plus grande que les autres",fb:"La taille seule n'est pas une raison de rejeter une valeur exacte qui appartient au groupe."},{t:"Être changée pour correspondre au deuxième élève le plus grand",fb:"Ajuster une mesure exacte invente des données."},{t:"Forcer le rapport à utiliser seulement l'étendue des tailles", fb:"L'étendue met en évidence les extrêmes au lieu de décrire la classe."}],
    "La valeur est exacte et appartient au groupe, donc elle reste. On peut rapporter une médiane pour limiter son effet. La réponse est <b>Être gardée</b>.",{mode:"height"});},
  function(){return mcq("Une station météo enregistre les précipitations quotidiennes. Un jour montre 480 mm à cause d'une erreur de capteur; chaque autre jour montre moins de 30 mm. Pour le rapport mensuel des précipitations, la valeur de 480 mm devrait :",
    {t:"Être laissée de côté, parce que c'est une erreur de mesure",fb:"Oui : une valeur d'erreur ne décrit pas les vraies précipitations et fausserait gravement les totaux."},
    [{t:"Être gardée, parce que les instruments ont toujours raison",fb:"Une valeur très éloignée de ce qui est physiquement cohérent avec le reste signale une erreur à vérifier."},{t:"Être incluse dans la moyenne, puisqu'une valeur seule change peu", fb:"Une seule énorme valeur peut déplacer beaucoup une moyenne, surtout dans un petit ensemble."},{t:"Être remplacée par 30 mm, la deuxième plus grande valeur",fb:"La remplacer par une valeur devinée invente des données; exclure une erreur est la démarche honnête."}],
    "La lecture de 480 mm est une erreur de capteur, donc elle est exclue du rapport. La réponse est <b>Être laissée de côté, parce que c'est une erreur de mesure</b>.",{mode:"rain"});},
  function(){return mcq("Une collecte de fonds totalise les dons de 12 personnes. Onze ont donné de 10 $ à 25 $, et une a donné 500 $. L'organisateur rapporte le don typique. La meilleure approche est :",
    {t:"Rapporter la médiane, et mentionner le don de 500 $ séparément",fb:"Oui : la médiane reflète le don typique, tandis que le gros don est quand même souligné."},
    [{t:"Rapporter la moyenne, puisqu'elle donne le don typique",fb:"La moyenne ici est près de 63 $, un montant qu'aucun donateur typique n'a donné; le 500 $ la tire vers le haut."},{t:"Laisser le don de 500 $ hors de tous les dossiers de l'organisateur", fb:"Le don est de l'argent réel et appartient aux totaux, même si la médiane montre mieux le don typique."},{t:"Rapporter le mode des dons donnés par les douze personnes", fb:"Les dons diffèrent, donc il n'y a probablement pas de mode à rapporter."}],
    "Le don de 500 $ est véritable, donc il reste dans les dossiers, mais la médiane représente mieux un don typique. La réponse est <b>Rapporter la médiane, et mentionner le don de 500 $ séparément</b>.",{mode:"donation"});},
  function(){return mcq("Dans quelle situation une valeur aberrante devrait-elle être gardée dans les données quand on rapporte des résultats ?",
    {t:"Un joueur de basketball marque 41 points dans un match alors qu'il marque habituellement près de 15 points",fb:"Oui : le gros match a vraiment eu lieu et fait partie du dossier du joueur."},
    [{t:"Une balance lit mal une masse et donne 900 kg pour un objet de 9 kg dans toute l'expérience du laboratoire", fb:"Cette valeur est une erreur d'instrument, pas un vrai résultat."},{t:"Un temps est tapé 450 secondes au lieu de 45,0 secondes dans le tableau des résultats de l'équipe", fb:"Cette valeur est une erreur de frappe et devrait être corrigée ou exclue."},{t:"Un capteur de température laissé en plein soleil lit bien au-dessus de la température de l'air",fb:"Cette lecture ne mesure pas ce que l'étude veut mesurer, donc elle devrait être exclue."}],
    "Un rendement remarquable et véritable appartient aux données. Les erreurs d'instruments ou de frappe n'y appartiennent pas. La réponse est <b>Un joueur de basketball marque 41 points dans un match</b>.",{mode:"keep"});}
]),["Décide d'abord si la valeur aberrante est une donnée véritable ou une erreur, puis choisis le traitement.","Commence par te demander ce qui a causé la valeur inhabituelle."]);

E("u7-central-problem-cr",7,["11.9","11.11"],3,"gen",function(){
  var mode=pick(["remove","combine","target"]);
  if(mode==="remove"){
    var base=ri(6,12);var vals=[];for(var i=0;i<5;i++)vals.push(base+ri(-2,2));var out=base+ri(28,44);var all=shuffle(vals.concat([out]));
    var m5=u7mean(vals);
    return numq("Ensemble de données : "+all.join(", ")+". La plus grande valeur est une valeur aberrante. Quelle est la moyenne des cinq valeurs restantes ?",
      m5,0.01,
      "Retire la valeur aberrante "+out+". Les valeurs restantes totalisent "+fmtD(m5*5)+". \\[ \\begin{aligned} \\text{moyenne} &= "+fmtD(m5*5)+" \\div 5 \\\\ &= "+fmtD(m5)+" \\end{aligned} \\] La moyenne est <b>"+fmtD(m5)+"</b>.",{mode:"remove"});
  }
  if(mode==="combine"){
    var n1=pick([4,5]),n2=pick([4,5]);var m1=ri(6,11),m2=ri(7,13);var ans=(n1*m1+n2*m2)/(n1+n2);
    return numq("Le groupe A compte "+n1+" élèves avec un résultat moyen de "+m1+". Le groupe B compte "+n2+" élèves avec un résultat moyen de "+m2+". Quel est le résultat moyen de tous les élèves combinés ?",
      ans,0.01,
      "Transforme chaque moyenne en total. \\[ \\begin{aligned} \\text{total} &= "+n1+" \\times "+m1+" + "+n2+" \\times "+m2+" = "+(n1*m1+n2*m2)+" \\\\ \\text{moyenne} &= "+(n1*m1+n2*m2)+" \\div "+(n1+n2)+" = "+fmtD(ans)+" \\end{aligned} \\] La moyenne combinée est <b>"+fmtD(ans)+"</b>.",{mode:"combine"});
  }
  var cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];var s=cur.reduce(function(a,b){return a+b;},0);var target=ri(72,88);var need=target/10*5-s;var guard=0;
  while((need<1||need>10)&&guard<30){cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];s=cur.reduce(function(a,b){return a+b;},0);need=target/10*5-s;guard++;}
  if(need<1||need>10){cur=[7,7,7,7];s=28;target=76;need=10;}
  return numq("Après quatre tests, les résultats d'un élève sont "+cur.join(", ")+" sur 10. Quel résultat au cinquième test donne une moyenne globale de "+fmtD(target/10,1)+" sur 10 ?",
    need,0.01,
    "Cinq tests avec une moyenne de "+fmtD(target/10,1)+" doivent totaliser \\(5 \\times "+fmtD(target/10,1)+" = "+fmtD(target/2,1)+"\\). \\[ \\begin{aligned} \\text{cinquième résultat} &= "+fmtD(target/2,1)+" - "+s+" \\\\ &= "+fmtD(need,1)+" \\end{aligned} \\] Le cinquième résultat est <b>"+fmtD(need,1)+"</b>.",{mode:"target"});
},["Transforme d'abord les moyennes en totaux; ce sont les totaux qui se combinent et se comparent.","Commence par multiplier chaque moyenne par son nombre de valeurs."]);

E("u7-expected-count-cr",7,["12.6","12.7"],3,"gen",function(){
  var fam=pick(["die","die","coin","bag","spinner","twocoin"]);
  var fav,total,trials,desc;
  if(fam==="die"){var tg=pick([["obtenir un 6",1],["obtenir un 1",1],["obtenir un nombre pair",3],["obtenir un nombre impair",3],["obtenir un nombre supérieur à 4",2],["obtenir un nombre inférieur à 3",2],["obtenir un nombre premier",3]]);fav=tg[1];total=6;trials=6*ri(5,30);desc=tg[0]+" avec un dé équitable";}
  else if(fam==="coin"){fav=1;total=2;trials=2*ri(10,90);desc="obtenir face avec une pièce équitable";}
  else if(fam==="bag"){var r=ri(1,5),o=ri(1,5);fav=r;total=r+o;trials=total*ri(4,25);desc="piger une bille rouge dans un sac contenant "+r+" billes rouges et "+o+" billes bleues, en remettant la bille chaque fois";}
  else if(fam==="spinner"){var s1=pick([4,5,6,8]);var rr=ri(1,s1-1);fav=rr;total=s1;trials=s1*ri(4,25);desc="tomber sur le rouge sur une roulette comptant "+rr+" sections rouges sur "+s1+" sections égales";}
  else {fav=1;total=4;trials=4*ri(5,40);desc="obtenir deux faces quand on lance deux pièces équitables";}
  var expected=fav*trials/total;
  var who=pick(["Un élève","Une classe","Un enseignant","Un club de jeux"]);
  return numq(who+" répète une expérience "+trials+" fois. L'expérience consiste à "+desc+". Environ combien de fois le résultat devrait-il se produire ?",
    expected,0.01,
    "La probabilité théorique est \\("+FR(fav,total)+"\\). Multiplie par le nombre d'essais. \\[ \\begin{aligned} \\text{nombre prévu} &= "+FR(fav,total)+" \\times "+trials+" \\\\ &= "+fmtD(expected)+" \\end{aligned} \\] Le nombre prévu est <b>"+fmtD(expected)+"</b>.",{mode:"expected",fam:fam});
},["Le nombre prévu est la probabilité théorique fois le nombre d'essais.","Commence par écrire la probabilité théorique sous forme de fraction."]);
E("u7-zero-one",7,["12.2","12.3"],3,"var",varset([
  function(){return mcq("Un sac contient seulement des billes rouges et bleues. Quel évènement a une probabilité de 0 ?",
    {t:"Piger une bille verte",fb:"Oui : il n'y a aucune bille verte, donc l'évènement est impossible."},
    [{t:"Piger une bille rouge",fb:"Des billes rouges sont dans le sac, donc cette probabilité est supérieure à 0."},{t:"Piger une bille bleue",fb:"Des billes bleues sont dans le sac, donc cette probabilité est supérieure à 0."},{t:"Piger une bille",fb:"Chaque pige donne une bille, donc cette probabilité est 1, pas 0."}],
    "Aucune bille verte n'est dans le sac, donc en piger une est impossible. La réponse est <b>Piger une bille verte</b>.",{mode:"zero"});},
  function(){return mcq("Quel évènement a une probabilité de 1 ?",
    {t:"Obtenir un nombre inférieur à 7 avec un dé à six faces",fb:"Oui : chaque face du dé est inférieure à 7, donc c'est certain."},
    [{t:"Obtenir un 6 avec un dé à six faces en un seul lancer de dé",fb:"Une seule des six faces est un 6, donc la probabilité est inférieure à 1."},{t:"Obtenir face avec une pièce au premier lancer",fb:"Pile est aussi possible, donc la probabilité est inférieure à 1."},{t:"Piger une carte rouge dans un jeu complet de cartes",fb:"Des cartes noires sont aussi dans le jeu, donc ce n'est pas certain."}],
    "Les six faces sont inférieures à 7, donc l'évènement se produit toujours. La réponse est <b>Obtenir un nombre inférieur à 7</b>.",{mode:"one"});},
  function(){return mcq("Quelle paire d'évènements est indépendante ?",
    {t:"Lancer une pièce et lancer un dé",fb:"Oui : le résultat de la pièce ne peut pas changer le résultat du dé, et le dé ne peut pas changer la pièce."},
    [{t:"Piger deux cartes sans les remettre",fb:"La première pige change ce qui reste, donc la deuxième pige en dépend."},{t:"Choisir un élève et son partenaire",fb:"Le premier choix restreint qui peut être choisi ensuite, donc les évènements sont liés."},{t:"Piger deux billes sans les remettre",fb:"Laisser la première bille dehors change le sac pour la deuxième pige."}],
    "Une pièce et un dé ne s'influencent pas, donc les évènements sont indépendants. La réponse est <b>Lancer une pièce et lancer un dé</b>.",{mode:"indep"});},
  function(){return mcq("Une roulette compte 4 sections égales, toutes de couleur jaune. Quelle est la probabilité de tomber sur le jaune, et de quel type d'évènement s'agit-il ?",
    {t:"Probabilité 1, un évènement certain",fb:"Oui : chaque section est jaune, donc la roulette tombe toujours sur le jaune."},
    [{t:"Probabilité 0, un évènement impossible",fb:"Tomber sur le jaune se produit toujours ici, le contraire d'impossible."},{t:"Probabilité 1/4, pour les 4 sections",fb:"Les 4 sections sont jaunes, donc 4 sections sur 4 correspondent, ce qui donne une probabilité de 1."},{t:"Probabilité 4, pour les 4 sections jaunes",fb:"Les probabilités ne dépassent jamais 1."}],
    "Les 4 sections sur 4 sont jaunes : \\(P = "+FR(4,4)+" = 1\\). La réponse est <b>Probabilité 1, un évènement certain</b>.",{mode:"certain"});},
  function(){return mcq("Quelle paire d'évènements est indépendante ?",
    {t:"Faire tourner une roulette et lancer une pièce",fb:"Oui : aucun des deux résultats ne peut influencer l'autre."},
    [{t:"Piger deux noms d'un chapeau sans remise",fb:"Le premier nom est parti, ce qui change la deuxième pige."},{t:"Lancer un dé, puis doubler les points sur un 6",fb:"Le pointage dépend directement du résultat du dé."},{t:"Choisir un capitaine, puis un cocapitaine",fb:"Le premier choix retire un joueur, ce qui change le deuxième choix."}],
    "La roulette et la pièce ne s'influencent pas, donc les évènements sont indépendants. La réponse est <b>Faire tourner une roulette et lancer une pièce</b>.",{mode:"indep2"});}
]),["Une probabilité de 0 signifie impossible et une probabilité de 1 signifie certain; des évènements indépendants ne peuvent pas s'influencer.","Commence par te demander si l'évènement peut se produire, se produit toujours, ou dépend de l'autre évènement."]);

/* ----- bank-u8.js ----- */
// Ajouts de figures : les entrées de géométrie assignent q.figure à partir de leurs propres valeurs
// (diagrammes de bissectrices, grilles cartésiennes et figures d'angles de triangles).
// Math 7 (French) Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 3916 to 4454).
// CRMARKS: u8-distance-cr=3
// CRMARKS: u8-translate-cr=3
// CRMARKS: u8-successive-cr=2
// CRMARKS: u8-bisector-cr=3
// CRMARKS: u8-transform-cr=3
/*
 * TRANSLATOR NOTES
 * Chunk: Unit 8 (La géométrie), Math 7 FR. Entries translated: 23 (all
 * stems, options, per-answer feedback, worked solutions, hint1 and
 * hint2). The trailing CR_MARKS block is byte-identical to the source.
 * Guide terms (Grade 7 guide wins): segments de droite parallèles et
 * perpendiculaires, médiatrice (for perpendicular bisector), bissectrice,
 * plan cartésien, paires ordonnées, quadrants, origine, sommets,
 * translation, réflexion, rotation, constructions géométriques, équerre
 * (set square). Axes: axe des x and axe des y, the Grade 7 guide's own
 * forms (5 and 2 occurrences in the guide body). The quads array values
 * stay "Quadrant I" to "Quadrant IV" as labels, mirroring the source
 * capitalization; prose around them uses "le quadrant I" etc.
 * Perpendicular bisector is rendered médiatrice throughout, following
 * the guide (7FE3 lists médiatrices for this construction family); the
 * defining properties (midpoint, 90 degrees, equidistant endpoints) are
 * kept in the text so the meaning stays explicit for L2 readers.
 * Move text: u8moveText now builds "3 unités vers la droite et 2 unités
 * vers le haut", matching the guide's translation phrasing (p. ex. "une
 * translation de 2 unités vers la droite"). In u8-bisector-reason the
 * object names carry their articles (Un ruban, Une planche, Un tuyau
 * d'arrosage, Une planche d'étagère, Une corde) and the prompt's "A "
 * prefix became an empty string, so gender agreement holds; the
 * mathematics is unchanged.
 * FMT-GEOM lines left as fmt( (each carries the marker): the polygon
 * points line in u8gridSVG and the line-coordinates line in
 * u8segFigure. Those are the only fmt( calls in this chunk; there are
 * no other display fmt(, no fmtF( and no .toFixed, so no fmtD( or
 * fmtDF( conversions were needed. Visible text labels in the figures
 * (x, y, P, vertex letters) are language-neutral and unchanged.
 * Number forms: no literal decimals, percents or money occur in display
 * strings; degree values follow the source form in prose (90 degrés).
 * TeX fragments inside solutions (\text{...}) were translated
 * (distance, périmètre, sentier, chaque angle, départ, image finale).
 * Unsure: "patron de signes" for sign pattern and "pas de grille" for
 * gridline step are working choices with no direct guide evidence;
 * flagged for the reconciliation pass.
 */
/* ===== Unit 8 ===== */
/* Math 7 Unit 8: Geometry (target 10: constructions and Cartesian plane) */
function u8gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u8numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u8pair(x,y){return "("+x+", "+y+")";}
function u8gridSVG(points,polys,segs){
  var W=280,H=280,c=140,st=20;
  function X(x){return c+x*st;}function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plan cartésien quadrillé">';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="8" x2="'+X(g)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+Y(g)+'" x2="272" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="272,140 264,135 264,145" fill="'+FIG_INK+'"/><polygon points="140,8 135,16 145,16" fill="'+FIG_INK+'"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+X(s[0])+'" y1="'+Y(s[1])+'" x2="'+X(s[2])+'" y2="'+Y(s[3])+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';}); /* FMT-GEOM */
  if(points)points.forEach(function(p){out+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u8segFigure(segs,jx,jy){
  var W=300,H=230;
  function X(x){return 150+(x+jx)*26;}function Y(y){return 115-(y+jy)*26;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme de segments de droite">';
  segs.forEach(function(s){out+='<line x1="'+fmt(X(s.x1),1)+'" y1="'+fmt(Y(s.y1),1)+'" x2="'+fmt(X(s.x2),1)+'" y2="'+fmt(Y(s.y2),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
    out+=_txt(X(s.x1)-10,Y(s.y1)-8,s.l1,14,true);out+=_txt(X(s.x2)+10,Y(s.y2)-8,s.l2,14,true);}); /* FMT-GEOM */
  return out+'</svg>';
}
function u8moveText(dx,dy){var parts=[];if(dx!==0)parts.push(Math.abs(dx)+(Math.abs(dx)===1?" unité ":" unités ")+(dx>0?"vers la droite":"vers la gauche"));if(dy!==0)parts.push(Math.abs(dy)+(Math.abs(dy)===1?" unité ":" unités ")+(dy>0?"vers le haut":"vers le bas"));return parts.join(" et ");}

E("u8-parallel-perp-id",8,["10.1"],1,"gen",function(){
  var jx=pick([-1,0,0,1]),jy=pick([-1,0,1]);var askPara=Math.random()<0.5;var tmpl=ri(0,2);
  var segs,prompt,correct,ds,sol;
  var opener=pick(["Le diagramme montre ","Un diagramme montre "]);
  if(tmpl===0){
    segs=[{x1:-4,y1:2,x2:3,y2:2,l1:"A",l2:"B"},{x1:3,y1:2,x2:3,y2:-2,l1:"",l2:"C"},{x1:3,y1:-2,x2:-4,y2:-2,l1:"",l2:"D"},{x1:-4,y1:-2,x2:-4,y2:2,l1:"",l2:""}];
    prompt=opener+"un rectangle de sommets A, B, C et D, et de côtés AB, BC, CD et DA. ";
    if(askPara){correct="AB et CD";ds=[{t:"AB et BC",fb:"AB rencontre BC à un coin, donc ils sont perpendiculaires, pas parallèles."},{t:"AB et DA",fb:"AB rencontre DA à un coin, donc ils sont perpendiculaires, pas parallèles."},{t:"BC et CD",fb:"BC rencontre CD à un coin, donc ils sont perpendiculaires, pas parallèles."}];sol="Les côtés opposés d'un rectangle ne se rencontrent jamais et restent à la même distance. AB et CD sont des côtés opposés. La paire parallèle est <b>AB et CD</b>.";}
    else {correct="AB et BC";ds=[{t:"BC et DA",fb:"BC et DA sont des côtés opposés, donc ils sont parallèles, pas perpendiculaires."},{t:"AB et CD",fb:"AB et CD sont des côtés opposés, donc ils sont parallèles, pas perpendiculaires."},{t:"AD et BC",fb:"AD et BC sont des côtés opposés (AD est le même segment que DA), donc ils sont parallèles, pas perpendiculaires."}];sol="Les côtés adjacents d'un rectangle se rencontrent à 90 degrés. AB et BC se rencontrent au coin B. La paire perpendiculaire est <b>AB et BC</b>.";}
  } else if(tmpl===1){
    segs=[{x1:-5,y1:3,x2:2,y2:3,l1:"E",l2:"F"},{x1:-5,y1:-1,x2:2,y2:-1,l1:"G",l2:"H"},{x1:0,y1:4,x2:0,y2:-3,l1:"I",l2:"J"},{x1:-4,y1:-3,x2:3,y2:2,l1:"K",l2:"L"}];
    prompt=opener+"les segments EF, GH, IJ et KL. ";
    if(askPara){correct="EF et GH";ds=[{t:"EF et IJ",fb:"IJ croise EF à angle droit, donc ils sont perpendiculaires."},{t:"GH et KL",fb:"KL est incliné et rencontrerait GH si on le prolongeait, donc ils ne sont pas parallèles."},{t:"IJ et KL",fb:"KL est incliné et croise IJ, donc ils ne sont pas parallèles."}];sol="EF et GH sont tous les deux horizontaux, restent à la même distance et ne se rencontrent jamais. La paire parallèle est <b>EF et GH</b>.";}
    else {correct="EF et IJ";ds=[{t:"EF et GH",fb:"EF et GH sont parallèles, pas perpendiculaires."},{t:"IJ et KL",fb:"KL croise IJ à un angle incliné, pas à 90 degrés."},{t:"GH et KL",fb:"KL croise GH à un angle incliné, pas à 90 degrés."}];sol="IJ est vertical et EF est horizontal, donc ils se rencontrent à 90 degrés. La paire perpendiculaire est <b>EF et IJ</b>.";}
  } else {
    segs=[{x1:-4,y1:3,x2:2,y2:3,l1:"P",l2:"Q"},{x1:-4,y1:-2,x2:2,y2:-2,l1:"R",l2:"S"},{x1:0,y1:4,x2:0,y2:-3,l1:"T",l2:"U"},{x1:-4,y1:-3,x2:3,y2:1,l1:"V",l2:"W"}];
    prompt=opener+"les segments PQ, RS, TU et VW. ";
    if(askPara){correct="PQ et RS";ds=[{t:"PQ et TU",fb:"TU croise PQ à angle droit, donc ils sont perpendiculaires."},{t:"RS et VW",fb:"VW est incliné et rencontrerait RS si on le prolongeait, donc ils ne sont pas parallèles."},{t:"TU et VW",fb:"VW est incliné et croise TU, donc ils ne sont pas parallèles."}];sol="PQ et RS sont tous les deux horizontaux et restent à la même distance. La paire parallèle est <b>PQ et RS</b>.";}
    else {correct="PQ et TU";ds=[{t:"PQ et RS",fb:"PQ et RS sont parallèles, pas perpendiculaires."},{t:"TU et VW",fb:"VW croise TU à un angle incliné, pas à 90 degrés."},{t:"RS et VW",fb:"VW croise RS à un angle incliné, pas à 90 degrés."}];sol="TU est vertical et PQ est horizontal, donc ils se rencontrent à 90 degrés. La paire perpendiculaire est <b>PQ et TU</b>.";}
  }
  var q=mcq(prompt+(askPara?"Quelle paire de segments est parallèle ?":"Quelle paire de segments est perpendiculaire ?"),
    {t:correct,fb:"Oui, cette paire correspond au diagramme."},ds,sol,{mode:askPara?"para":"perp",tmpl:tmpl});
  q.figure=u8segFigure(segs,jx,jy);
  return q;
},["Les segments parallèles ne se rencontrent jamais et restent à la même distance; les segments perpendiculaires se rencontrent à 90 degrés.","Commence par vérifier chaque paire : se rencontrent-ils, et si oui, à quel angle ?"]);
E("u8-axes-origin",8,["10.6"],1,"var",varset([
  function(){var q=mcq("Dans un plan cartésien, comment appelle-t-on l'axe horizontal ?",
    {t:"axe des x",fb:"Oui : l'axe des x est horizontal et donne le premier nombre d'une paire ordonnée."},
    [{t:"axe des y",fb:"L'axe des y est vertical, pas horizontal."},{t:"origine",fb:"L'origine est un point, le point (0, 0), pas un axe."},{t:"quadrant",fb:"Un quadrant est une des quatre régions du plan, pas un axe."}],
    "L'axe horizontal est l'axe des x. La réponse est <b>axe des x</b>.",{mode:"xaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("Dans un plan cartésien, comment appelle-t-on l'axe vertical ?",
    {t:"axe des y",fb:"Oui : l'axe des y est vertical et donne le deuxième nombre d'une paire ordonnée."},
    [{t:"axe des x",fb:"L'axe des x est horizontal, pas vertical."},{t:"origine",fb:"L'origine est le point (0, 0), pas un axe."},{t:"quadrant",fb:"Un quadrant est une région du plan, pas un axe."}],
    "L'axe vertical est l'axe des y. La réponse est <b>axe des y</b>.",{mode:"yaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("Quelles sont les coordonnées de l'origine dans un plan cartésien ?",
    {t:"(0, 0)",fb:"Oui : l'origine est l'endroit où les deux axes se croisent, à zéro sur les deux."},
    [{t:"(1, 0)",fb:"Ce point se trouve à une unité à droite de l'origine, sur l'axe des x."},{t:"(0, 1)",fb:"Ce point se trouve à une unité au-dessus de l'origine, sur l'axe des y."},{t:"(1, 1)",fb:"Ce point se trouve à une unité à droite et à une unité au-dessus de l'origine."}],
    "Les axes se croisent à zéro sur les deux axes. L'origine est <b>(0, 0)</b>.",{mode:"origine"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("Le point (0, 4) se trouve :",
    {t:"Sur l'axe des y",fb:"Oui : une coordonnée x de 0 place le point sur l'axe des y, à quatre unités vers le haut."},
    [{t:"Sur l'axe des x",fb:"Les points sur l'axe des x ont une coordonnée y de 0; ce point a y égal à 4."},{t:"À l'origine",fb:"L'origine est (0, 0); ce point est à quatre unités au-dessus d'elle."},{t:"Dans le quadrant I",fb:"Les points sur un axe n'appartiennent à aucun quadrant."}],
    "Une coordonnée x de 0 veut dire que le point se trouve sur l'axe des y. La réponse est <b>Sur l'axe des y</b>.",{mode:"onaxis"}); q.figure=figAxes("onaxis"); return q;},
  function(){var q=mcq("Dans le quadrant II d'un plan cartésien, les coordonnées de chaque point ont :",
    {t:"x négatif et y positif",fb:"Oui : le quadrant II est à gauche de l'axe des y et au-dessus de l'axe des x."},
    [{t:"x positif et y positif",fb:"Ce patron de signes décrit le quadrant I, à droite et au-dessus."},{t:"x négatif et y négatif",fb:"Ce patron de signes décrit le quadrant III, à gauche et au-dessous."},{t:"x positif et y négatif",fb:"Ce patron de signes décrit le quadrant IV, à droite et au-dessous."}],
    "Le quadrant II est à gauche de l'axe des y (x négatif) et au-dessus de l'axe des x (y positif). La réponse est <b>x négatif et y positif</b>.",{mode:"quad2"}); q.figure=figAxes("quad2"); return q;}
]),["L'axe des x est horizontal, l'axe des y est vertical, et ils se croisent à l'origine.","Commence par imaginer les deux axes qui se croisent en (0, 0)."]);

E("u8-read-point",8,["10.7"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var guard=0;
  while(Math.abs(x)===Math.abs(y)&&guard<20){y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);guard++;}
  if(Math.abs(x)===Math.abs(y))y=x>0?x-1:x+1;
  var correct=u8pair(x,y);
  var cands=[u8pair(y,x),u8pair(-x,y),u8pair(x,-y)];
  var ds=cands.map(function(t,i){return {t:t,fb:i===0?"Le premier nombre est la coordonnée x (horizontale), le deuxième est la coordonnée y (verticale). Cette paire les échange.":(i===1?"Vérifie le signe de la coordonnée x : le point est de l'autre côté de l'axe des y.":"Vérifie le signe de la coordonnée y : le point est de l'autre côté de l'axe des x.")};});
  var q=mcq("Le point P est placé dans le plan cartésien. Quelles sont les coordonnées du point P ?",
    {t:correct,fb:"Oui : à partir de l'origine, déplace-toi de "+x+" à l'horizontale et de "+y+" à la verticale pour atteindre P."},ds,
    "À partir de l'origine, le point P se trouve à "+Math.abs(x)+" unités "+(x>0?"vers la droite":"vers la gauche")+" et "+Math.abs(y)+" unités "+(y>0?"vers le haut":"vers le bas")+". Les coordonnées sont <b>"+correct+"</b>.",{mode:"read"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Les coordonnées s'écrivent (x, y) : le déplacement horizontal d'abord, puis le vertical.","Pars de l'origine et compte à l'horizontale, puis vers le haut ou vers le bas."]);

E("u8-env-examples",8,["10.2","10.3"],1,"var",varset([
  function(){return mcq("Lequel de ces exemples montre une paire de segments de droite parallèles ?",
    {t:"Les deux rails d'une voie ferrée",fb:"Oui : les rails sont côte à côte, toujours à la même distance."},
    [{t:"Les deux bords au coin d'un livre",fb:"Les bords qui se rencontrent à un coin forment un angle; à un coin droit, ils sont perpendiculaires."},{t:"Les aiguilles d'une horloge à 3 h 00",fb:"À 3 h 00, les aiguilles forment un angle droit, donc elles sont perpendiculaires, pas parallèles."},{t:"Les deux traits de la lettre T",fb:"Les traits d'un T se rencontrent à angle droit, donc ils sont perpendiculaires."}],
    "Les rails d'une voie ferrée restent à la même distance et ne se rencontrent jamais : ils sont parallèles. La réponse est <b>Les deux rails d'une voie ferrée</b>.",{mode:"rail"});},
  function(){return mcq("Lequel de ces exemples montre une paire de segments de droite perpendiculaires ?",
    {t:"Les bords du coin d'un cadre de fenêtre",fb:"Oui : les bords d'un coin de fenêtre droit se rencontrent à 90 degrés."},
    [{t:"Les deux rails d'une voie ferrée",fb:"Les rails restent à la même distance : ils sont parallèles."},{t:"Les bords opposés d'une règle",fb:"Les bords opposés d'une règle ne se rencontrent jamais : ils sont parallèles."},{t:"Les lignes tracées sur une feuille de cahier",fb:"Les lignes tracées sont côte à côte sans se rencontrer : elles sont parallèles."}],
    "Le coin d'un cadre de fenêtre se rencontre à 90 degrés, ce qui est perpendiculaire. La réponse est <b>Les bords du coin d'un cadre de fenêtre</b>.",{mode:"window"});},
  function(){return mcq("Un élève cherche des segments parallèles dans la classe. Quelle trouvaille est correcte ?",
    {t:"Les bords du haut et du bas du tableau blanc",fb:"Oui : les bords opposés du tableau vont dans la même direction et ne se rencontrent jamais."},
    [{t:"Le bord d'un pupitre et la ligne du plancher",fb:"Ils se rencontrent près du pied du pupitre, à un angle, au lieu d'être côte à côte."},{t:"Les deux côtés du coin d'un écran portable ouvert",fb:"Les côtés qui se rencontrent au coin de l'écran forment un angle, pas une paire parallèle."},{t:"Les bandes au coin d'un motif de drapeau",fb:"Les bandes qui se rencontrent à un coin se croisent ou se touchent, donc ce ne sont pas des segments parallèles."}],
    "Les bords opposés du tableau blanc sont parallèles. La réponse est <b>Les bords du haut et du bas du tableau blanc</b>.",{mode:"board"});},
  function(){return mcq("Lequel de ces exemples montre des segments perpendiculaires dans l'environnement ?",
    {t:"Un mât de drapeau et la ligne du sol à sa base",fb:"Oui : un mât vertical rencontre le sol horizontal à angle droit."},
    [{t:"Les barreaux d'une échelle, espacés l'un au-dessus de l'autre",fb:"Les barreaux d'une échelle sont côte à côte : ils sont parallèles entre eux."},{t:"Les côtés opposés d'une patinoire de hockey",fb:"Les côtés opposés de la patinoire vont dans la même direction : parallèles."},{t:"Les deux longs bords d'une planche d'étagère",fb:"Les longs bords d'une même planche sont côte à côte : parallèles."}],
    "Le mât est vertical et le sol est horizontal, et ils se rencontrent à 90 degrés. La réponse est <b>Un mât de drapeau et la ligne du sol à sa base</b>.",{mode:"pole"});},
  function(){return mcq("Quelle paire de segments est parallèle ?",
    {t:"Le bord du haut et le bord du bas d'une porte",fb:"Oui : les bords du haut et du bas d'une porte vont dans la même direction et ne se rencontrent jamais."},
    [{t:"Les bords qui se rencontrent au coin d'une page",fb:"Les bords qui se rencontrent à un coin forment un angle (90 degrés sur une page), pas une paire parallèle."},{t:"Les traits vertical et horizontal de la lettre L",fb:"Ces traits se rencontrent à angle droit : perpendiculaires."},{t:"Le bord d'une tablette et le mur au coin de la pièce",fb:"Ces bords se rencontrent au coin, donc ils ne peuvent pas être parallèles."}],
    "Les bords du haut et du bas d'une porte sont parallèles. La réponse est <b>Le bord du haut et le bord du bas d'une porte</b>.",{mode:"door"});}
]),["Les segments parallèles restent à la même distance; les segments perpendiculaires se rencontrent à 90 degrés.","Commence par te demander si les deux segments se rencontrent, et à quel angle."]);

E("u8-plot-point",8,["10.7","10.9"],1,"gen",function(){
  var pts=[];var guard=0;
  while(pts.length<4&&guard<200){var x=ri(-5,5),y=ri(-5,5);var ok=true;for(var i=0;i<pts.length;i++){if(pts[i].x===x&&pts[i].y===y)ok=false;}if(ok)pts.push({x:x,y:y});guard++;}
  var labels=["A","B","C","D"];var ti=ri(0,3);var target=pts[ti];
  var ds=labels.filter(function(l,i){return i!==ti;}).map(function(l,i){var p=pts[labels.indexOf(l)];return {t:"Point "+l,fb:"Point "+l+" se trouve en "+u8pair(p.x,p.y)+", pas aux coordonnées demandées."};});
  var q=mcq("Quatre points sont placés dans le plan cartésien. Quel point se trouve en "+u8pair(target.x,target.y)+"?",
    {t:"Point "+labels[ti],fb:"Oui : le point "+labels[ti]+" se trouve à "+target.x+" à l'horizontale et "+target.y+" vers le haut à partir de l'origine."},ds,
    "En comptant à partir de l'origine, "+u8pair(target.x,target.y)+" est la position du point "+labels[ti]+". La réponse est <b>Point "+labels[ti]+"</b>.",{mode:"plot"});
  q.figure=u8gridSVG(pts.map(function(p,i){return {x:p.x,y:p.y,label:labels[i]};}),null,null);
  return q;
},["Pour placer (x, y), déplace-toi de x unités à l'horizontale à partir de l'origine, puis de y unités vers le haut ou vers le bas.","Pars de l'origine et compte d'abord le déplacement en x."]);

E("u8-bisector-env",8,["10.4","10.5"],1,"var",varset([
  function(){var q=mcq("Qu'est-ce que la médiatrice d'un segment de droite ?",
    {t:"Une droite qui coupe le segment en deux parties égales à 90 degrés",fb:"Oui : elle passe par le milieu et rencontre le segment à angle droit."},
    [{t:"Une droite qui coupe le segment en deux parties égales à n'importe quel angle",fb:"Des parties égales donnent seulement un passage au milieu; une médiatrice doit aussi rencontrer le segment à 90 degrés."},{t:"Une droite qui rencontre le segment à 90 degrés à une de ses extrémités",fb:"Une rencontre à une extrémité ne peut pas couper le segment en deux parties égales."},{t:"Une droite qui passe à côté du segment et ne le touche jamais",fb:"Une médiatrice doit croiser le segment qu'elle coupe en deux."}],
    "Une médiatrice croise le segment au milieu et à 90 degrés. La réponse est <b>Une droite qui coupe le segment en deux parties égales à 90 degrés</b>.",{mode:"defpb"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Un jardinier veut un sentier qui est la médiatrice du bord avant d'un terrain de jardin. Quel sentier convient ?",
    {t:"Un sentier qui croise le bord exactement en son milieu, en formant un angle droit avec lui",fb:"Oui : croiser au milieu à 90 degrés, c'est exactement une médiatrice."},
    [{t:"Un sentier qui croise le bord du terrain de jardin près d'un bout, à angle droit avec ce bord",fb:"Un angle droit seul ne suffit pas; le croisement doit être au milieu."},{t:"Un sentier qui croise le bord en son milieu, à un angle incliné au point de croisement",fb:"Le milieu seul ne suffit pas; le croisement doit aussi être à 90 degrés."},{t:"Un sentier qui suit le bord lui-même, d'un bout du terrain à l'autre",fb:"Un sentier sur le bord ne le croise pas et ne le coupe pas en deux."}],
    "Le sentier doit croiser au milieu et à 90 degrés. La réponse est <b>Un sentier qui croise le bord exactement en son milieu, en formant un angle droit avec lui</b>.",{mode:"garden"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Qu'est-ce que la bissectrice d'un angle ?",
    {t:"Une demi-droite qui partage un angle en deux angles égaux",fb:"Oui : les deux angles obtenus ont la même mesure."},
    [{t:"Une demi-droite qui partage un angle en deux angles quelconques",fb:"Une bissectrice doit créer deux angles égaux, pas n'importe quels deux angles."},{t:"Une droite qui coupe les côtés de l'angle en longueurs égales",fb:"Cela décrit le partage d'un segment, pas le partage de la mesure d'un angle."},{t:"Une demi-droite tracée de l'extérieur de l'angle vers son sommet",fb:"Une bissectrice part du sommet et va à l'intérieur de l'angle."}],
    "La bissectrice d'un angle partage l'angle en deux angles égaux. La réponse est <b>Une demi-droite qui partage un angle en deux angles égaux</b>.",{mode:"defab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Quelle action crée la bissectrice d'un angle dans une tâche de tous les jours ?",
    {t:"Plier un coin de papier pour que les deux bords du coin s'alignent exactement",fb:"Oui : le pli partage l'angle du coin en deux angles égaux."},
    [{t:"Couper un coin de papier d'un seul coup droit à travers le coin",fb:"Couper le coin enlève une partie de l'angle au lieu de le partager en deux moitiés égales."},{t:"Tracer n'importe quelle droite du coin jusqu'à l'autre côté de la feuille",fb:"Une droite quelconque ne partage pas nécessairement l'angle en deux parties égales."},{t:"Mesurer l'angle du coin avec un rapporteur d'angle placé sur le coin de la feuille",fb:"Mesurer donne la mesure de l'angle; cela ne le partage pas."}],
    "Plier pour que les bords correspondent fait que le pli partage l'angle en deux parties égales. La réponse est <b>Plier un coin de papier pour que les deux bords du coin s'alignent exactement</b>.",{mode:"foldab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Deux lampadaires se trouvent aux extrémités d'un sentier droit. Un banc se trouve sur la médiatrice du segment du sentier. Qu'est-ce qui est vrai pour le banc ?",
    {t:"Il est à la même distance de chaque lampadaire",fb:"Oui : chaque point d'une médiatrice est à égale distance des extrémités du segment."},
    [{t:"Il est plus proche d'un lampadaire, de la moitié du sentier",fb:"Les points de la médiatrice ne sont plus proches d'aucun des deux bouts; les distances sont égales."},{t:"Il se trouve exactement au milieu du sentier",fb:"Un seul point de la médiatrice, le point de croisement, est le milieu; le banc peut être n'importe où sur la droite."},{t:"Il est deux fois plus loin d'un lampadaire que de l'autre",fb:"La propriété qui la définit est l'égalité des distances, pas une distance double."}],
    "Chaque point d'une médiatrice est à la même distance des deux extrémités. La réponse est <b>Il est à la même distance de chaque lampadaire</b>.",{mode:"bench"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Plier une bande de papier pour qu'un bout arrive exactement sur l'autre bout crée un pli. Le pli est :",
    {t:"La médiatrice de la longueur de la bande",fb:"Oui : aligner les bouts fait que le pli croise au milieu, et un pli rencontre la longueur à 90 degrés."},
    [{t:"La bissectrice de l'angle du coin de la bande",fb:"Le pli aligne les deux bouts de la longueur, donc il coupe la longueur en deux, pas un angle de coin."},{t:"Une droite parallèle à la longueur de la bande",fb:"Le pli croise la longueur au lieu de passer à côté d'elle."},{t:"Le milieu lui-même, à mi-longueur de la bande",fb:"Le pli est une droite qui passe par le milieu, pas seulement le point."}],
    "Aligner les bouts place le pli au milieu, à angle droit. La réponse est <b>La médiatrice de la longueur de la bande</b>.",{mode:"foldpb"}); q.figure=figBisect("perp"); return q;}
]),["Une bissectrice ou une médiatrice partage quelque chose en deux parties égales; perpendiculaire ajoute un croisement à 90 degrés.","Commence par vérifier les deux conditions : des parties égales, et l'angle droit pour une médiatrice."]);

E("u8-bisector-reason",8,["10.15","10.16"],1,"gen",function(){
  var mode=pick(["midpoint","anglehalf","equidist","midpoint2"]);
  if(mode==="anglehalf"){var A=ri(10,80)*2;var half=A/2;
    var ds=u8numOpts(half,[A,half+4,Math.max(half-4,2)]).map(function(v){return {t:String(v),fb:"Une bissectrice partage l'angle en deux parties égales, donc divise l'angle par 2."};});
    var q=mcq("Un angle de "+A+" degrés est partagé par sa bissectrice. Quelle est la mesure de chaque angle obtenu ?",
      {t:String(half),fb:"Oui : "+A+" divisé par 2 donne "+half+"."},ds,
      "La bissectrice donne deux angles égaux. \\[ \\begin{aligned} \\text{chaque angle} &= "+A+" \\div 2 \\\\ &= "+half+"^\\circ \\end{aligned} \\] Chaque angle mesure <b>"+half+" degrés</b>.",{mode:mode}); q.figure=figAngleBisectTotal(A+"°"); return q;
  }
  if(mode==="equidist"){var d=ri(3,15);
    var cand=u8numOpts(d,[d+2,2*d,Math.max(d-1,1)]);
    var ds2=cand.map(function(v){return {t:String(v),fb:"Les points d'une médiatrice sont à la même distance des deux extrémités du segment."};});
    var q=mcq("Le point P se trouve sur la médiatrice du segment AB. La distance de P à A est de "+d+" cm. Quelle est la distance de P à B ?",
      {t:String(d),fb:"Oui : chaque point de la médiatrice est à égale distance de A et de B."},ds2,
      "Un point de la médiatrice est à la même distance des deux extrémités, donc la distance de P à B égale la distance de P à A. La distance est <b>"+d+" cm</b>.",{mode:mode}); q.figure=figEqui(null,d+" cm"); return q;
  }
  var L=ri(4,15)*2;var halfL=L/2;var obj=mode==="midpoint"?pick(["Un ruban","Une planche","Un tuyau d'arrosage","Une planche d'étagère"]):pick(["Une corde","Un ruban","Un bord de rampe de planche à roulettes"]);
  var ds3=u8numOpts(halfL,[L,halfL+2,Math.max(halfL-2,1)]).map(function(v){return {t:String(v),fb:"La médiatrice croise au milieu, à mi-chemin le long du segment."};});
  var q=mcq(""+obj+" mesure "+L+" cm de long. Sa médiatrice passe par le point M, au milieu. À quelle distance M se trouve-t-il de chaque extrémité ?",
    {t:String(halfL),fb:"Oui : le milieu est à mi-chemin, "+L+" divisé par 2."},ds3,
    "La médiatrice croise au milieu. \\[ \\begin{aligned} \\text{distance} &= "+L+" \\div 2 \\\\ &= "+halfL+" \\text{ cm} \\end{aligned} \\] M se trouve à <b>"+halfL+" cm</b> de chaque extrémité.",{mode:mode}); q.figure=figSegMid(L+" cm"); return q;
},["Une bissectrice ou une médiatrice coupe en deux parties égales : un segment en son milieu, un angle en deux angles égaux.","Commence par diviser la longueur ou l'angle donné par 2."]);

E("u8-draw-reason",8,["10.13","10.14"],1,"var",varset([
  function(){return mcq("Un élève fait glisser une équerre le long d'une règle pour tracer une deuxième droite qui passe par un point. Pourquoi la nouvelle droite est-elle parallèle à la première ?",
    {t:"L'équerre garde le même angle avec la règle, donc la nouvelle droite a la même direction que la première",fb:"Oui : les deux droites forment des angles correspondants égaux avec la règle, ce qui les rend parallèles."},
    [{t:"La nouvelle droite a la même longueur que la première droite, et des longueurs égales rendent deux droites parallèles",fb:"Des longueurs égales ne rendent pas des droites parallèles; c'est la direction qui compte."},{t:"La règle est plus longue que les deux droites, donc une droite tracée le long d'elle suit la première",fb:"La longueur de la règle ne joue aucun rôle dans la direction des droites."},{t:"Le point se trouve sur la première droite, donc la deuxième droite qui y passe doit suivre exactement la première",fb:"Dans cette construction, le point est en dehors de la première droite; ce sont les angles égaux qui rendent les droites parallèles."}],
    "Faire glisser l'équerre conserve l'angle, donc les deux droites ont la même direction. La réponse est <b>L'équerre garde le même angle avec la règle</b>.",{mode:"slide"});},
  function(){return mcq("Pour tracer une droite perpendiculaire à une droite donnée, qui passe par un point de cette droite, un élève utilise une équerre. Pourquoi cela fonctionne-t-il ?",
    {t:"Le coin d'une équerre mesure exactement 90 degrés, donc le bord tracé rencontre la droite à 90 degrés",fb:"Oui : l'angle droit de l'équerre est transféré au dessin."},
    [{t:"L'équerre est un triangle, et les triangles contiennent des droites perpendiculaires dans un dessin comme celui-ci",fb:"Seul le coin à angle droit compte ici, pas la forme triangulaire en général."},{t:"Le point est sur la droite, ce qui force un angle droit partout où une droite passe par ce point",fb:"Un point sur une droite ne crée pas un angle droit à lui seul; c'est l'équerre qui le fait."},{t:"La règle en dessous rend chaque droite tracée perpendiculaire à la droite du dessin",fb:"Une règle guide la rectitude, pas l'angle."}],
    "Le coin de l'équerre est un vrai angle droit, donc la droite tracée est perpendiculaire. La réponse est <b>Le coin d'une équerre mesure exactement 90 degrés</b>.",{mode:"setsq"});},
  function(){return mcq("Un élève trace une droite et affirme qu'elle est parallèle à une droite donnée. Quelle vérification confirme cette affirmation ?",
    {t:"Mesure la distance entre les droites à deux endroits différents; les distances sont égales",fb:"Oui : les droites parallèles restent à la même distance partout."},
    [{t:"Vérifie que les deux droites ont la même longueur, d'un bout de chaque droite à l'autre bout",fb:"Des segments peuvent avoir la même longueur sans être parallèles."},{t:"Prolonge une droite et regarde si elle semble droite sur toute sa longueur sur la feuille",fb:"La rectitude d'une droite ne dit rien sur sa direction par rapport à l'autre."},{t:"Mesure un angle à l'endroit où une règle croise une droite, sans comparer les distances entre elles",fb:"Un seul angle ne compare pas les directions des deux droites."}],
    "Des distances égales à deux endroits confirment que les droites restent à la même distance : elles sont parallèles. La réponse est <b>Mesure la distance entre les droites à deux endroits différents; les distances sont égales</b>.",{mode:"checkpar"});},
  function(){return mcq("Quelle suite d'étapes permet de tracer une droite parallèle à une droite donnée, qui passe par un point en dehors de la droite ?",
    {t:"Place un bord de l'équerre sur la droite, appuie une règle contre l'équerre, fais glisser l'équerre le long de la règle jusqu'au point, puis trace",fb:"Oui : la règle fixe la direction pendant que l'équerre glisse jusqu'au point."},
    [{t:"Trace n'importe quelle droite par le point et mesure sa longueur pour qu'elle égale celle de la droite donnée, en vérifiant aux deux bouts",fb:"Égaler une longueur ne contrôle pas la direction, donc les droites ne sont pas nécessairement parallèles."},{t:"Plie la feuille pour que le point arrive n'importe où sur la droite, puis trace le pli le long du pli, d'un bord de la feuille jusqu'à l'autre bord",fb:"Ce pli dépend de l'endroit où le point arrive et c'est une construction perpendiculaire, pas parallèle."},{t:"Trace un cercle autour du point et relie deux points du cercle, puis prolonge la droite des deux côtés, au-delà du cercle",fb:"Une construction au cercle comme celle-là ne fixe pas la direction pour qu'elle corresponde à la droite donnée."}],
    "La méthode de l'équerre qui glisse conserve la direction. La réponse est <b>Place un bord de l'équerre sur la droite, appuie une règle contre l'équerre, fais glisser l'équerre le long de la règle jusqu'au point, puis trace</b>.",{mode:"seqpar"});},
  function(){return mcq("Un élève trace une droite par un point et affirme qu'elle est perpendiculaire à une droite donnée. Quelle vérification confirme cette affirmation ?",
    {t:"Mesure l'angle à l'endroit où les droites se rencontrent; il mesure 90 degrés",fb:"Oui : les droites perpendiculaires sont définies par une rencontre à 90 degrés."},
    [{t:"Vérifie que la nouvelle droite est plus longue que la droite donnée",fb:"La longueur n'a rien à voir avec l'angle entre les droites."},{t:"Vérifie que la nouvelle droite ne touche pas la droite donnée une deuxième fois",fb:"Deux droites dans un plan se rencontrent au plus une fois de toute façon; l'angle est le critère."},{t:"Mesure la distance du point aux deux extrémités de la droite donnée",fb:"Des distances égales concernent une médiatrice, pas la perpendicularité en général."}],
    "Perpendiculaire veut dire se rencontrer à 90 degrés, et mesurer l'angle le confirme. La réponse est <b>Mesure l'angle à l'endroit où les droites se rencontrent; il mesure 90 degrés</b>.",{mode:"checkperp"});}
]),["Une construction fonctionne grâce à la propriété qu'elle conserve : la direction pour le parallèle, 90 degrés pour le perpendiculaire.","Commence par nommer la propriété que les droites finies doivent avoir, puis associe la méthode à cette propriété."]);

E("u8-shape-vertices",8,["10.8"],1,"gen",function(){
  var tmpl=ri(0,1);var verts,labels=["A","B","C","D"],askIdx;
  if(tmpl===0){var x1=ri(-5,-2),x2=ri(1,4),y1=ri(-4,-1),y2=ri(1,4);verts=[[x1,y2],[x2,y2],[x2,y1],[x1,y1]];askIdx=ri(0,3);}
  else {var bx=ri(-4,-2),by=ri(-3,-1);verts=[[bx,by],[bx+ri(4,6),by],[bx+ri(1,3),by+ri(3,5)]];labels=["A","B","C"];askIdx=2;}
  var target=verts[askIdx];var guard=0;
  while((target[0]===0||target[1]===0||Math.abs(target[0])===Math.abs(target[1]))&&guard<10){askIdx=(askIdx+1)%verts.length;target=verts[askIdx];guard++;}
  var correct=u8pair(target[0],target[1]);
  var raw=[u8pair(target[1],target[0]),u8pair(-target[0],target[1]),u8pair(target[0],-target[1]),u8pair(target[0]+1,target[1]),u8pair(target[0],target[1]+1)];
  var seen={};seen[correct]=1;var ds=[];
  raw.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Relis la position du sommet : à l'horizontale à partir de l'origine d'abord (x), puis vers le haut ou vers le bas (y)."});}});
  var off=2;while(ds.length<3){var t=u8pair(target[0]+off,target[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Relis la position du sommet : à l'horizontale d'abord, puis vers le haut ou vers le bas."});}off++;}
  var q=mcq("Une figure est tracée dans le plan cartésien. Quelles sont les coordonnées du sommet "+labels[askIdx]+"?",
    {t:correct,fb:"Oui : le sommet "+labels[askIdx]+" se trouve en "+correct+"."},ds,
    "Le sommet "+labels[askIdx]+" est à "+Math.abs(target[0])+" unités "+(target[0]>0?"vers la droite":"vers la gauche")+" et "+Math.abs(target[1])+" unités "+(target[1]>0?"vers le haut":"vers le bas")+" de l'origine. Ses coordonnées sont <b>"+correct+"</b>.",{mode:"verts",tmpl:tmpl});
  q.figure=u8gridSVG(verts.map(function(v,i){return {x:v[0],y:v[1],label:labels[i]};}),[verts],null);
  return q;
},["Lis chaque sommet sous la forme (x, y) : la position horizontale d'abord, puis la verticale.","Pars de l'origine et compte à l'horizontale pour t'aligner avec le sommet, puis vers le haut ou vers le bas."]);

E("u8-move-describe",8,["10.10","10.19"],1,"gen",function(){
  var mode=pick(["describe","hdist","vdist"]);
  if(mode==="hdist"){var y0=ri(-5,5);var x1=ri(-5,2);var d=ri(2,7);var x2=x1+d;if(x2>5){x2=x1-d;}
    var dist=Math.abs(x2-x1);
    var ds=u8numOpts(dist,[dist+1,Math.max(dist-1,1),Math.abs(x1)+Math.abs(x2)===dist?dist+2:Math.abs(x1)+Math.abs(x2)]).map(function(v){return {t:String(v),fb:"Les points ont la même coordonnée y, donc soustrais les coordonnées x pour obtenir la distance."};});
    var q=mcq("Les points A "+u8pair(x1,y0)+" et B "+u8pair(x2,y0)+" se trouvent sur la même droite horizontale. Quelle est la distance entre eux ?",
      {t:String(dist),fb:"Oui : les coordonnées x diffèrent de "+dist+", et les coordonnées y sont égales."},ds,
      "Même coordonnée y, donc la distance est la différence en x. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] La distance est <b>"+dist+" unités</b>.",{mode:mode}); q.figure=figWideGrid([{x:x1,y:y0,label:"A"},{x:x2,y:y0,label:"B"}],null,null); return q;
  }
  if(mode==="vdist"){var x0=ri(-5,5);var y1=ri(-5,2);var d2=ri(2,7);var y2=y1+d2;if(y2>5){y2=y1-d2;}
    var dist2=Math.abs(y2-y1);
    var ds2=u8numOpts(dist2,[dist2+1,Math.max(dist2-1,1),dist2+3]).map(function(v){return {t:String(v),fb:"Les points ont la même coordonnée x, donc soustrais les coordonnées y pour obtenir la distance."};});
    var q=mcq("Les points A "+u8pair(x0,y1)+" et B "+u8pair(x0,y2)+" se trouvent sur la même droite verticale. Quelle est la distance entre eux ?",
      {t:String(dist2),fb:"Oui : les coordonnées y diffèrent de "+dist2+", et les coordonnées x sont égales."},ds2,
      "Même coordonnée x, donc la distance est la différence en y. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] La distance est <b>"+dist2+" unités</b>.",{mode:mode}); q.figure=figWideGrid([{x:x0,y:y1,label:"A"},{x:x0,y:y2,label:"B"}],null,null); return q;
  }
  var ax=ri(-4,2),ay=ri(-4,2);var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);
  var bx=ax+dx,by=ay+dy;if(bx>5||bx<-5){dx=-dx;bx=ax+dx;}if(by>5||by<-5){dy=-dy;by=ay+dy;}
  var correct=u8moveText(dx,dy);
  var opts=[u8moveText(dy,dx),u8moveText(-dx,dy),u8moveText(dx,-dy)];
  var seen={};seen[correct]=1;var ds3=[];
  opts.forEach(function(t){if(!seen[t]){seen[t]=1;ds3.push({t:t,fb:"Compare les coordonnées : le changement en x donne le déplacement horizontal, le changement en y donne le déplacement vertical, et les signes donnent les directions."});}});
  var extra=[u8moveText(-dx,-dy),u8moveText(dx+1,dy),u8moveText(dx,dy+1)];var ei=0;
  while(ds3.length<3&&ei<extra.length){if(!seen[extra[ei]]){seen[extra[ei]]=1;ds3.push({t:extra[ei],fb:"Compare les coordonnées : le changement en x est horizontal, le changement en y est vertical, et les signes donnent les directions."});}ei++;}
  var q=mcq("Comment te déplaces-tu du point A "+u8pair(ax,ay)+" au point B "+u8pair(bx,by)+" dans un plan cartésien ?",
    {t:correct,fb:"Oui : x change de "+dx+" et y change de "+dy+"."},ds3,
    "Changement en x : \\("+bx+" - ("+ax+") = "+dx+"\\), donc déplace-toi de "+Math.abs(dx)+" "+(dx>0?"vers la droite":"vers la gauche")+". Changement en y : \\("+by+" - ("+ay+") = "+dy+"\\), donc déplace-toi de "+Math.abs(dy)+" "+(dy>0?"vers le haut":"vers le bas")+". Le déplacement est <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"}],null,null); return q;
},["Compare les coordonnées : le changement en x est le déplacement horizontal, le changement en y est le déplacement vertical.","Commence par soustraire les coordonnées x, puis les coordonnées y."]);

E("u8-distance-cr",8,["10.19"],1,"gen",function(){
  var horiz=Math.random()<0.5;
  if(horiz){var y0=ri(-6,6);var x1=ri(-6,3);var x2=x1+ri(2,8);if(x2>6)x2=x1-ri(2,6);var dist=Math.abs(x2-x1);
    var q=numq("Trouve la distance entre les points "+u8pair(x1,y0)+" et "+u8pair(x2,y0)+".",
      dist,0,
      "Les coordonnées y sont égales, donc les points se trouvent sur une droite horizontale. Soustrais les coordonnées x. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] La distance est <b>"+dist+" unités</b>.",{mode:"h"}); q.figure=figWideGrid([{x:x1,y:y0},{x:x2,y:y0}],null,null); return q;
  }
  var x0=ri(-6,6);var y1=ri(-6,3);var y2=y1+ri(2,8);if(y2>6)y2=y1-ri(2,6);var dist2=Math.abs(y2-y1);
  var q=numq("Trouve la distance entre les points "+u8pair(x0,y1)+" et "+u8pair(x0,y2)+".",
    dist2,0,
    "Les coordonnées x sont égales, donc les points se trouvent sur une droite verticale. Soustrais les coordonnées y. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] La distance est <b>"+dist2+" unités</b>.",{mode:"v"}); q.figure=figWideGrid([{x:x0,y:y1},{x:x0,y:y2}],null,null); return q;
},["Les points qui ont la même coordonnée y se trouvent sur une droite horizontale; les points qui ont la même coordonnée x se trouvent sur une droite verticale.","Commence par vérifier quelle coordonnée reste la même."]);

E("u8-translate-cr",8,["10.20"],1,"gen",function(){
  var x=ri(-6,4),y=ri(-6,4);var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var nx=x+dx,ny=y+dy;var askX=Math.random()<0.5;
  var ans=askX?nx:ny;
  var q=numq("Le point P "+u8pair(x,y)+" subit une translation de "+u8moveText(dx,dy)+". Quelle est la coordonnée "+(askX?"x":"y")+" du point image ?",
    ans,0,
    "Applique la translation à chaque coordonnée. \\[ \\begin{aligned} \\text{image} &= ("+x+" + ("+dx+"), "+y+" + ("+dy+")) \\\\ &= "+u8pair(nx,ny)+" \\end{aligned} \\] La coordonnée "+(askX?"x":"y")+" du point image est <b>"+ans+"</b>.",{mode:askX?"tx":"ty"}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["Une translation s'ajoute à la coordonnée x pour les déplacements vers la gauche ou vers la droite et à la coordonnée y pour les déplacements vers le haut ou vers le bas.","Commence par déterminer comment la coordonnée demandée change."]);

E("u8-reflect-point",8,["10.20","10.12"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var overX=Math.random()<0.5;var axis=overX?"axe des x":"axe des y";
  var img=overX?[x,-y]:[-x,y];var other=overX?[-x,y]:[x,-y];
  var correct=u8pair(img[0],img[1]);
  var raw=[u8pair(x,y),u8pair(other[0],other[1]),u8pair(-x,-y)];
  var ds=raw.map(function(t,i){return {t:t,fb:i===0?"C'est le point de départ; une réflexion le déplace de l'autre côté de l'axe.":(i===1?"C'est une réflexion par rapport à l'autre axe; vérifie quel axe la question nomme.":"Cela inverse les deux coordonnées, ce qui est un demi-tour, pas une réflexion par rapport à un seul axe.")};});
  var q=mcq("Le point P "+u8pair(x,y)+" est réfléchi par rapport à l'"+axis+". Quelles sont les coordonnées de l'image ?",
    {t:correct,fb:"Oui : la réflexion par rapport à l'"+axis+" inverse le signe de la coordonnée "+(overX?"y":"x")+" seulement."},ds,
    "La réflexion par rapport à l'"+axis+" change le signe de la coordonnée "+(overX?"y":"x")+" et laisse l'autre inchangée : "+u8pair(x,y)+" devient <b>"+correct+"</b>.",{mode:overX?"rx":"ry"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["La réflexion par rapport à l'axe des x inverse le signe de y; celle par rapport à l'axe des y inverse le signe de x.","Commence par décider quelle coordonnée change de signe pour l'axe nommé."]);

E("u8-complete-shape",8,["10.8","10.17","10.18"],2,"gen",function(){
  var ax=ri(-5,-2),ay=ri(-4,0);var bx=ax+ri(3,5),by=ay;var sx=pick([-2,-1,1,2]);var sy=ri(2,4);
  var cx=bx+sx,cy=by+sy;var dx2=ax+sx,dy2=ay+sy;
  if(cx>6||cx<-6||dx2>6){sx=-sx;cx=bx+sx;dx2=ax+sx;}
  var correct=u8pair(dx2,dy2);
  var taken={};taken[u8pair(ax,ay)]=1;taken[u8pair(bx,by)]=1;taken[u8pair(cx,cy)]=1;taken[correct]=1;
  var offs=[[1,0],[0,1],[-1,0],[0,-1],[2,1],[-2,-1],[1,-1]];
  var ds=[];
  for(var i=0;i<offs.length&&ds.length<3;i++){var t=u8pair(dx2+offs[i][0],dy2+offs[i][1]);if(!taken[t]){taken[t]=1;ds.push({t:t,fb:"Dans un parallélogramme, le quatrième sommet se déplace à partir de A selon le même changement qui mène B à C."});}}
  var q=mcq("Les points A "+u8pair(ax,ay)+", B "+u8pair(bx,by)+" et C "+u8pair(cx,cy)+" sont trois sommets d'un parallélogramme ABCD, dans l'ordre. Quelles sont les coordonnées du sommet D ?",
    {t:correct,fb:"Oui : D se déplace à partir de A selon le même changement qui mène B à C."},ds,
    "De B à C, le changement est ("+(cx-bx)+", "+(cy-by)+"). Applique le même changement à A. \\[ \\begin{aligned} D &= ("+ax+" + ("+(cx-bx)+"), "+ay+" + ("+(cy-by)+")) \\\\ &= "+correct+" \\end{aligned} \\] Le sommet D est <b>"+correct+"</b>.",{mode:"para"});
  q.figure=u8gridSVG([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"},{x:cx,y:cy,label:"C"}],null,[[ax,ay,bx,by],[bx,by,cx,cy]]);
  return q;
},["Les côtés opposés d'un parallélogramme se déplacent selon le même changement en x et en y.","Commence par trouver le changement de B à C, puis applique-le à A."]);

E("u8-transform-describe",8,["10.11"],1,"gen",function(){
  var type=pick(["translate","reflectX","reflectY"]);
  var px=pick([-4,-3,-2,-1,1,2,3,4]);var py=pick([-4,-3,-2,-1,1,2,3,4]);
  var qx=px+pick([-3,-2,2,3]);var qy=py+pick([-3,-2,2,3]);if(qx>5||qx<-5)qx=px-2;if(qy>5||qy<-5)qy=py-2;
  var P=[px,py],Q=[qx,qy],P2,Q2,correct;
  function transText(dx,dy){return "Translation : "+u8moveText(dx,dy);}
  var opts=[];
  if(type==="translate"){var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);if(Math.abs(dx)===Math.abs(dy))dy=dy>0?dy+1:dy-1;
    P2=[px+dx,py+dy];Q2=[qx+dx,qy+dy];correct=transText(dx,dy);
    opts=[{t:transText(dy,dx),fb:"Cela échange les changements horizontal et vertical; vérifie d'abord le changement en x."},{t:"Réflexion par rapport à l'axe des x dans le plan cartésien",fb:"Une réflexion inverserait le signe des coordonnées y; ici, les deux points se déplacent plutôt des mêmes quantités."},{t:"Réflexion par rapport à l'axe des y dans le plan cartésien",fb:"Une réflexion inverserait le signe des coordonnées x; ici, les deux points se déplacent plutôt des mêmes quantités."}];
  } else if(type==="reflectX"){P2=[px,-py];Q2=[qx,-qy];correct="Réflexion par rapport à l'axe des x";
    opts=[{t:"Réflexion par rapport à l'axe des y",fb:"Cela inverserait les signes de x; ici, les signes de y se sont inversés et les valeurs de x sont restées."},{t:transText(P2[0]-px,P2[1]-py),fb:"Cette translation convient au point P seul, mais elle ne mène pas Q à son image; vérifie les deux sommets."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"Cette translation convient au point Q seul, mais elle ne mène pas P à son image; vérifie les deux sommets."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(1,P2[1]-py),fb:"Vérifie les deux sommets : une seule translation doit déplacer chaque sommet selon le même changement."};
  } else {P2=[-px,py];Q2=[-qx,qy];correct="Réflexion par rapport à l'axe des y";
    opts=[{t:"Réflexion par rapport à l'axe des x",fb:"Cela inverserait les signes de y; ici, les signes de x se sont inversés et les valeurs de y sont restées."},{t:transText(P2[0]-px,P2[1]-py),fb:"Cette translation convient au point P seul, mais elle ne mène pas Q à son image; vérifie les deux sommets."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"Cette translation convient au point Q seul, mais elle ne mène pas P à son image; vérifie les deux sommets."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(P2[0]-px,1),fb:"Vérifie les deux sommets : une seule translation doit déplacer chaque sommet selon le même changement."};
  }
  var seen={};seen[correct]=1;var ds=[];
  opts.forEach(function(o){if(!seen[o.t]){seen[o.t]=1;ds.push(o);}});
  var filler=type==="translate"?"Réflexion par rapport à l'origine":"Translation : "+u8moveText(1,1);
  while(ds.length<3){if(!seen[filler]){seen[filler]=1;ds.push({t:filler,fb:"Teste la description sur les deux sommets; elle doit mener chacun à son image."});}else filler="Translation : "+u8moveText(2,1);}
  var q=mcq("Un motif à deux sommets a pour sommets P "+u8pair(P[0],P[1])+" et Q "+u8pair(Q[0],Q[1])+". Après une transformation, les images sont P' "+u8pair(P2[0],P2[1])+" et Q' "+u8pair(Q2[0],Q2[1])+". Quelle transformation décrit le changement ?",
    {t:correct,fb:"Oui : l'appliquer à P et à Q donne exactement les sommets images."},ds,
    "Teste chaque sommet. P "+u8pair(P[0],P[1])+" va à "+u8pair(P2[0],P2[1])+" et Q "+u8pair(Q[0],Q[1])+" va à "+u8pair(Q2[0],Q2[1])+", ce qui correspond : <b>"+correct+"</b>.",{mode:type}); q.figure=figWideGrid([{x:P[0],y:P[1],label:"P"},{x:Q[0],y:Q[1],label:"Q"},{x:P2[0],y:P2[1],label:"P'"},{x:Q2[0],y:Q2[1],label:"Q'"}],[[P,Q],[P2,Q2]],null); return q;
},["Teste une description sur chaque sommet, pas seulement un : une transformation doit convenir à tous.","Commence par comparer le premier sommet à son image, puis confirme avec le deuxième."]);

E("u8-successive-cr",8,["10.10","10.20","10.11"],1,"gen",function(){
  var x=ri(-4,3),y=ri(-4,3);
  var dx1=pick([-3,-2,-1,1,2,3]);var dy1=pick([-3,-2,-1,1,2,3]);
  var dx2=pick([-2,-1,1,2]);var dy2=pick([-2,-1,1,2]);
  var fx=x+dx1+dx2,fy=y+dy1+dy2;var askX=Math.random()<0.5;var ans=askX?fx:fy;
  var q=numq("Un point commence en "+u8pair(x,y)+". Il se déplace de "+u8moveText(dx1,dy1)+", puis il se déplace de "+u8moveText(dx2,dy2)+". Quelle est la coordonnée "+(askX?"x":"y")+" de la position finale ?",
    ans,0,
    "Suis les coordonnées étape par étape. \\[ \\begin{aligned} \\text{départ} &= "+u8pair(x,y)+" \\\\ \\text{après le déplacement 1} &= "+u8pair(x+dx1,y+dy1)+" \\\\ \\text{après le déplacement 2} &= "+u8pair(fx,fy)+" \\end{aligned} \\] La coordonnée "+(askX?"x":"y")+" de la position finale est <b>"+ans+"</b>.",{mode:askX?"sx":"sy"}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
},["Applique les déplacements un à la fois, en mettant à jour les deux coordonnées après chaque déplacement.","Commence par écrire le nouveau point après le premier déplacement."]);

function u8scaleSVG(s,a,b){
  var W=300,H=300,c=150,st=36;
  function X(k){return c+k*st;}function Y(k){return c-k*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Plan cartésien avec axes gradués">';
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
    var ds=quads.filter(function(q){return q!==correct;}).map(function(q){return {t:q,fb:"Vérifie les signes : x est "+(sx>0?"positif":"négatif")+" et y est "+(sy>0?"positif":"négatif")+" pour ce point."};});
    var q=mcq("Dans quel quadrant le point "+u8pair(x,y)+" se trouve-t-il ?",
      {t:correct,fb:"Oui : "+(sx>0?"positif":"négatif")+" pour x et "+(sy>0?"positif":"négatif")+" pour y placent le point dans le "+correct+"."},ds,
      "x est "+(sx>0?"positif":"négatif")+" et y est "+(sy>0?"positif":"négatif")+". Ce patron de signes appartient au <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
  }
  var targetQuad=ri(0,3);var signs=[[1,1],[-1,1],[-1,-1],[1,-1]];
  var pts=[];for(var i=0;i<4;i++){pts.push([signs[i][0]*ri(1,6),signs[i][1]*ri(1,6)]);}
  var correctP=u8pair(pts[targetQuad][0],pts[targetQuad][1]);
  var ds2=pts.filter(function(p,i){return i!==targetQuad;}).map(function(p){return {t:u8pair(p[0],p[1]),fb:"Ce point a le patron de signes d'un autre quadrant. Le "+quads[targetQuad]+" demande x "+(signs[targetQuad][0]>0?"positif":"négatif")+" et y "+(signs[targetQuad][1]>0?"positif":"négatif")+"."};});
  if(mode==="design"){
    var q=mcq("Un point du motif doit se trouver dans le "+quads[targetQuad]+". Quel point convient au motif ?",
      {t:correctP,fb:"Oui : ses signes correspondent au "+quads[targetQuad]+"."},ds2,
      quads[targetQuad]+" contient des points avec x "+(signs[targetQuad][0]>0?"positif":"négatif")+" et y "+(signs[targetQuad][1]>0?"positif":"négatif")+". Seul "+correctP+" convient. La réponse est <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
  }
  var q=mcq("Quel point se trouve dans le "+quads[targetQuad]+"?",
    {t:correctP,fb:"Oui : ses signes correspondent au "+quads[targetQuad]+"."},ds2,
    quads[targetQuad]+" contient des points avec x "+(signs[targetQuad][0]>0?"positif":"négatif")+" et y "+(signs[targetQuad][1]>0?"positif":"négatif")+". Le point est <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
},["Les quadrants sont déterminés par les signes : I (+, +), II (-, +), III (-, -), IV (+, -).","Commence par vérifier le signe de chaque coordonnée."]);

E("u8-grid-scale",8,["10.6","10.9"],1,"gen",function(){
  var s=pick([2,5,10]);var a=pick([-3,-2,-1,1,2,3]);var b=pick([-3,-2,-1,1,2,3]);var guard=0;
  while(Math.abs(a)===Math.abs(b)&&guard<15){b=pick([-3,-2,-1,1,2,3]);guard++;}
  var X=a*s,Y=b*s;var ask=pick(["pair","pair","xonly","yonly"]);
  if(ask==="xonly"||ask==="yonly"){
    var val=ask==="xonly"?X:Y;
    var ds=u8numOpts(val,[ask==="xonly"?a:b,val+s,Math.max(val-s,-900),-val]).map(function(v){return {t:String(v),fb:"Chaque pas de grille dans ce plan compte pour "+s+" unités, donc multiplie le nombre de pas par "+s+"."};});
    var qq=mcq("Dans ce plan cartésien, chaque pas de grille compte pour "+s+" unités. Quelle est la coordonnée "+(ask==="xonly"?"x":"y")+" du point P ?",
      {t:String(val),fb:"Oui : P est à "+(ask==="xonly"?a:b)+" pas de l'axe, et chaque pas vaut "+s+" unités."},ds,
      "Le point P est à "+Math.abs(ask==="xonly"?a:b)+" pas de grille dans le sens "+(ask==="xonly"?(a>0?"positif":"négatif"):(b>0?"positif":"négatif"))+", à "+s+" unités par pas : \\("+(ask==="xonly"?a:b)+" \\times "+s+" = "+val+"\\). La coordonnée est <b>"+val+"</b>.",{mode:ask});
    qq.figure=u8scaleSVG(s,a,b);return qq;
  }
  var correct=u8pair(X,Y);
  var raw=[u8pair(a,b),u8pair(Y,X),u8pair(-X,Y),u8pair(X,-Y)];
  var seen={};seen[correct]=1;var ds2=[];
  raw.forEach(function(t){if(!seen[t]&&ds2.length<3){seen[t]=1;ds2.push({t:t,fb:"Compte les pas de grille à partir de l'origine, puis multiplie par "+s+", la valeur de chaque pas."});}});
  var off=1;while(ds2.length<3){var t=u8pair(X+off*s,Y);if(!seen[t]){seen[t]=1;ds2.push({t:t,fb:"Compte les pas de grille à partir de l'origine, puis multiplie par "+s+"."});}off++;}
  var q=mcq("Dans ce plan cartésien, chaque pas de grille compte pour "+s+" unités. Quelles sont les coordonnées du point P ?",
    {t:correct,fb:"Oui : P est à "+a+" pas à l'horizontale et "+b+" pas vers le haut, à "+s+" unités par pas."},ds2,
    "À l'horizontale : \\("+a+" \\times "+s+" = "+X+"\\). Vers le haut : \\("+b+" \\times "+s+" = "+Y+"\\). Les coordonnées sont <b>"+correct+"</b>.",{mode:"pair"});
  q.figure=u8scaleSVG(s,a,b);
  return q;
},["Quand les axes utilisent une échelle, multiplie les pas de grille par la valeur de chaque pas.","Commence par compter les pas à partir de l'origine, puis applique l'échelle."]);

E("u8-bisector-cr",8,["10.15","10.16"],3,"gen",function(){
  var mode=pick(["perimeter","supp","path"]);
  if(mode==="supp"){var T=ri(15,80)*2;var half=T/2;var ans=180-half;
    var q=numq("Un angle de "+T+" degrés est partagé par sa bissectrice. Un des deux angles égaux se trouve sur une droite avec un angle marqué x. Trouve x, en degrés.",
      ans,0,
      "La bissectrice coupe l'angle en deux : \\("+T+" \\div 2 = "+half+"^\\circ\\). Les angles sur une droite totalisent 180 degrés. \\[ \\begin{aligned} x &= 180 - "+half+" \\\\ &= "+ans+" \\end{aligned} \\] L'angle x est <b>"+ans+" degrés</b>.",{mode:mode}); q.figure=figBisectSupp(half+"°"); return q;
  }
  var L=ri(4,12)*2;var d=ri(3,14);
  if(mode==="perimeter"){
    var q=numq("Le segment AB mesure "+L+" cm de long. Le point P se trouve sur la médiatrice de AB, et la distance de P à A est de "+d+" cm. Quel est le périmètre du triangle PAB, en centimètres ?",
      2*d+L,0,
      "Chaque point de la médiatrice est à la même distance de A et de B, donc PB vaut aussi "+d+" cm. \\[ \\begin{aligned} \\text{périmètre} &= "+d+" + "+d+" + "+L+" \\\\ &= "+(2*d+L)+" \\end{aligned} \\] Le périmètre est <b>"+(2*d+L)+" cm</b>.",{mode:mode}); q.figure=figEqui(L+" cm",d+" cm"); return q;
  }
  var q=numq("Un sentier de jardin va de A à un point P sur la médiatrice du bord avant AB, puis à B. La distance de P à A est de "+d+" m. Quelle est la longueur du sentier complet de A à P à B, en mètres ?",
    2*d,0,
    "P se trouve sur la médiatrice, donc P est à la même distance de B que de A : PB vaut "+d+" m. \\[ \\begin{aligned} \\text{sentier} &= "+d+" + "+d+" \\\\ &= "+(2*d)+" \\end{aligned} \\] Le sentier est <b>"+(2*d)+" m</b>.",{mode:mode}); q.figure=figEqui(null,d+" m"); return q;
},["Les points d'une médiatrice sont à égale distance des extrémités du segment; une bissectrice coupe un angle en deux.","Commence par écrire ce que la bissectrice ou la médiatrice garantit avant de calculer."]);

E("u8-transform-cr",8,["10.20","10.12"],3,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var order=pick(["reflectFirst","translateFirst"]);var overX=Math.random()<0.5;var axis=overX?"axe des x":"axe des y";
  var step1,step2;
  if(order==="reflectFirst"){step1=overX?[x,-y]:[-x,y];step2=[step1[0]+dx,step1[1]+dy];}
  else {step1=[x+dx,y+dy];step2=overX?[step1[0],-step1[1]]:[-step1[0],step1[1]];}
  var askX=Math.random()<0.5;var ans=askX?step2[0]:step2[1];
  var promptText=order==="reflectFirst"?
    "Le point P "+u8pair(x,y)+" est réfléchi par rapport à l'"+axis+", puis l'image subit une translation de "+u8moveText(dx,dy)+".":
    "Le point P "+u8pair(x,y)+" subit une translation de "+u8moveText(dx,dy)+", puis l'image est réfléchie par rapport à l'"+axis+".";
  var q=numq(promptText+" Quelle est la coordonnée "+(askX?"x":"y")+" de l'image finale ?",
    ans,0,
    "Applique les transformations dans l'ordre. \\[ \\begin{aligned} \\text{départ} &= "+u8pair(x,y)+" \\\\ \\text{après l'étape 1} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{image finale} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] La coordonnée "+(askX?"x":"y")+" du point image est <b>"+ans+"</b>.",{mode:order}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["Fais les transformations une à la fois, dans l'ordre donné, en mettant à jour le point après chaque étape.","Commence par appliquer la première transformation au point de départ."]);

E("u8-transform-image",8,["10.11","10.12"],3,"gen",function(){
  var base=[[ri(-5,-3),ri(-3,0)],[ri(0,2),ri(-3,0)],[ri(-2,0),ri(2,4)]];
  var labels=["A","B","C"];var type=pick(["translate","reflectX","reflectY"]);
  var dx=pick([-3,-2,2,3]);var dy=pick([-3,-2,2,3]);
  function img(p){if(type==="translate")return [p[0]+dx,p[1]+dy];if(type==="reflectX")return [p[0],-p[1]];return [-p[0],p[1]];}
  var askIdx=ri(0,2);var target=base[askIdx];var im=img(target);
  var transDesc=type==="translate"?("subit une translation de "+u8moveText(dx,dy)):("est réfléchi par rapport à l'"+(type==="reflectX"?"axe des x":"axe des y"));
  var correct=u8pair(im[0],im[1]);
  var candSet=[u8pair(target[0],target[1])];
  if(type==="translate"){candSet.push(u8pair(target[0]+dy,target[1]+dx));candSet.push(u8pair(target[0]-dx,target[1]-dy));}
  else if(type==="reflectX"){candSet.push(u8pair(-target[0],target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  else {candSet.push(u8pair(target[0],-target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  candSet.push(u8pair(im[0]+1,im[1]));candSet.push(u8pair(im[0],im[1]+1));
  var seen={};seen[correct]=1;var ds=[];
  candSet.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Applique la transformation donnée au sommet "+labels[askIdx]+" lui-même : les translations s'ajoutent aux deux coordonnées, les réflexions inversent un signe."});}});
  var off=2;while(ds.length<3){var t=u8pair(im[0]+off,im[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Applique la transformation donnée au sommet "+labels[askIdx]+" lui-même."});}off++;}
  var q=mcq("Le triangle ABC "+transDesc+". Quelles sont les coordonnées de l'image du sommet "+labels[askIdx]+"?",
    {t:correct,fb:"Oui : appliquer la transformation à "+labels[askIdx]+" "+u8pair(target[0],target[1])+" donne "+correct+"."},ds,
    "Le sommet "+labels[askIdx]+" est "+u8pair(target[0],target[1])+". Appliquer la transformation donne <b>"+correct+"</b>.",{mode:type});
  q.figure=u8gridSVG(base.map(function(p,i){return {x:p[0],y:p[1],label:labels[i]};}),[base],null);
  return q;
},["Applique la transformation au sommet nommé exactement comme elle est donnée.","Commence par écrire les coordonnées du sommet nommé à partir du diagramme."]);

E("u8-design-shape",8,["10.17","10.18"],3,"var",varset([
  function(){var q=mcq("Un motif utilise les points (1, 1), (5, 1) et (5, 4) comme trois coins d'un rectangle, dans l'ordre. Quel point complète le rectangle ?",
    {t:"(1, 4)",fb:"Oui : il a le même x que le premier point et le même y que le troisième, ce qui ferme le rectangle."},
    [{t:"(5, 5)",fb:"Ce point prolonge le côté droit au-delà du haut; le quatrième coin doit s'aligner verticalement avec (1, 1)."},{t:"(1, 0)",fb:"Ce point se trouve sous le premier coin; le quatrième coin doit correspondre à la hauteur du haut, 4."},{t:"(4, 4)",fb:"Le quatrième coin doit avoir la même coordonnée x que le premier point, 1, pour fermer le côté gauche."}],
    "Le quatrième coin associe le x du premier point au y du troisième point : (1, 4). La réponse est <b>(1, 4)</b>.",{mode:"rect"}); q.figure=figWideGrid([{x:1,y:1},{x:5,y:1},{x:5,y:4}],null,[[1,1,5,1],[5,1,5,4]]); return q;},
  function(){var q=mcq("Un motif symétrique a un point en (3, 2). Le motif est symétrique par rapport à l'axe des y. Quel point doit aussi faire partie du motif ?",
    {t:"(-3, 2)",fb:"Oui : la symétrie par rapport à l'axe des y inverse le signe de x et garde la valeur de y."},
    [{t:"(3, -2)",fb:"Cela inverse le signe de y, ce qui est plutôt une symétrie par rapport à l'axe des x."},{t:"(-3, -2)",fb:"Cela inverse les deux signes, ce qui est un demi-tour autour de l'origine."},{t:"(2, 3)",fb:"Cela échange les coordonnées, ce qui est une symétrie par rapport à une diagonale, pas à l'axe des y."}],
    "Les points miroirs par rapport à l'axe des y ont des coordonnées x opposées et des coordonnées y égales. La réponse est <b>(-3, 2)</b>.",{mode:"mirror"}); q.figure=figWideGrid([{x:3,y:2}],null,null); return q;},
  function(){var q=mcq("Placer les points (0, 0), (4, 0), (4, 3) et (0, 3) dans l'ordre et les relier donne quelle figure ?",
    {t:"Rectangle",fb:"Oui : les côtés sont horizontaux et verticaux, de longueurs 4 et 3, et se rencontrent à angle droit."},
    [{t:"Triangle",fb:"Quatre points reliés dans l'ordre donnent une figure à quatre côtés, pas un triangle."},{t:"Pentagone",fb:"Quatre points donnent quatre côtés, pas cinq."},{t:"Carré",fb:"Les côtés mesurent 4 et 3 unités, ce qui est inégal, donc la figure est un rectangle plutôt qu'un carré."}],
    "Quatre sommets avec des côtés horizontaux et verticaux de 4 et de 3 forment un rectangle. La réponse est <b>Rectangle</b>.",{mode:"shape"}); q.figure=figWideGrid([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}],[[[0,0],[4,0],[4,3],[0,3]]],null); return q;},
  function(){return mcq("Un motif triangulaire se trouve entièrement dans le quadrant II. Quelle liste de sommets pourrait le former ?",
    {t:"(-1, 2), (-4, 1), (-2, 5)",fb:"Oui : chaque point a x négatif et y positif, ce qui est le quadrant II."},
    [{t:"(1, 2), (4, 1), (2, 5)",fb:"Ces points ont x positif et y positif : quadrant I."},{t:"(-1, -2), (-4, -1), (-2, -5)",fb:"Ces points ont x négatif et y négatif : quadrant III."},{t:"(-1, 2), (3, 4), (-2, 5)",fb:"Un point a x positif, donc le triangle entrerait dans le quadrant I."}],
    "Le quadrant II demande x négatif et y positif pour chaque sommet. La réponse est <b>(-1, 2), (-4, 1), (-2, 5)</b>.",{mode:"quad2design"});},
  function(){var q=mcq("Trois coins d'un motif carré sont (2, 1), (5, 1) et (5, 4). Quel point est le quatrième coin ?",
    {t:"(2, 4)",fb:"Oui : les côtés mesurent 3 unités, et (2, 4) ferme le carré au-dessus de (2, 1)."},
    [{t:"(2, 5)",fb:"Cela donnerait un côté gauche de 4 unités alors que le côté du bas en mesure 3, ce qui briserait le carré."},{t:"(4, 4)",fb:"Le quatrième coin doit s'aligner verticalement avec (2, 1), donc sa coordonnée x est 2."},{t:"(5, 3)",fb:"Ce point se trouve dans la zone du côté droit plutôt que de fermer le coin en haut à gauche."}],
    "Le côté du bas mesure 3 unités de (2, 1) à (5, 1), donc le quatrième coin se trouve à 3 unités au-dessus de (2, 1). La réponse est <b>(2, 4)</b>.",{mode:"square"}); q.figure=figWideGrid([{x:2,y:1},{x:5,y:1},{x:5,y:4}],null,[[2,1,5,1],[5,1,5,4]]); return q;}
]),["Utilise les patrons de coordonnées de la figure : des valeurs de x ou de y partagées pour les rectangles, des pas de côté égaux pour les carrés.","Commence par esquisser les points donnés et par chercher le patron du coin manquant."]);

E("u8-construct-verify",8,["10.13","10.14","10.15"],3,"var",varset([
  function(){var q=mcq("Un élève construit la médiatrice d'un segment avec des arcs de compas. Quelle vérification confirme la construction ?",
    {t:"Mesure du point de croisement à chaque extrémité; les distances sont égales, et l'angle de croisement est de 90 degrés",fb:"Oui : des moitiés égales plus un angle droit sont les deux propriétés qui la définissent."},
    [{t:"Mesure tout le segment; il correspond à l'ouverture du compas utilisée pour les deux arcs tracés à partir des extrémités",fb:"L'ouverture du compas est un outil de construction, pas une propriété de la médiatrice."},{t:"Vérifie que la médiatrice est plus longue que le segment, des deux côtés du segment qu'elle croise dans le diagramme",fb:"La longueur de la droite médiatrice ne fait pas partie de sa définition."},{t:"Vérifie que la médiatrice passe par une extrémité du segment qu'elle partage en deux parties égales",fb:"Une médiatrice passe par le milieu, pas par une extrémité."}],
    "Une médiatrice doit couper le segment en deux et le croiser à 90 degrés, et mesurer confirme les deux. La réponse est <b>Mesure du point de croisement à chaque extrémité; les distances sont égales, et l'angle de croisement est de 90 degrés</b>.",{mode:"verifybis"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("Dans la méthode au compas pour une médiatrice, les arcs sont tracés à partir des deux extrémités avec la même ouverture de compas. Pourquoi l'ouverture doit-elle rester la même ?",
    {t:"Des rayons égaux placent les croisements des arcs à la même distance des deux extrémités, ce qui les place sur la médiatrice",fb:"Oui : les points à égale distance des deux extrémités se trouvent sur la médiatrice."},
    [{t:"Une ouverture plus grande effacerait le segment si la pointe du compas était placée au milieu du segment que l'on partage en deux parties",fb:"L'ouverture affecte la taille des arcs, pas le segment lui-même; c'est l'égalité des rayons qui compte."},{t:"Le compas ne peut pas être ajusté une fois ouvert, donc l'ouverture choisie au départ doit servir pour chaque arc",fb:"Un compas peut être ajusté; la méthode demande de le garder fixe pour les deux extrémités."},{t:"Des rayons égaux donnent aux arcs la même couleur et la même forme quand ils se croisent sur le dessin de la construction",fb:"La couleur ne joue aucun rôle dans la géométrie de la construction."}],
    "Des rayons égaux garantissent que les croisements sont à égale distance des extrémités, ce qui définit la médiatrice. La réponse est <b>Des rayons égaux placent les croisements des arcs à la même distance des deux extrémités</b>.",{mode:"arcs"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("Une deuxième méthode pour la médiatrice consiste à plier une feuille pour que les deux extrémités d'un segment se rencontrent. Pourquoi le pli fonctionne-t-il comme médiatrice ?",
    {t:"Le pli envoie le segment sur lui-même avec les extrémités échangées, donc le pli croise au milieu à 90 degrés",fb:"Oui : aligner les extrémités force le pli à passer par le milieu, et un pli est perpendiculaire au segment."},
    [{t:"Le pli est toujours la droite la plus longue sur la feuille, d'un coin de la feuille au coin opposé",fb:"La longueur du pli n'a pas d'importance; c'est l'alignement des extrémités qui crée la médiatrice."},{t:"Plier double la longueur du segment, parce que les deux moitiés de la feuille se superposent le long de la ligne du pli",fb:"Plier ne change pas le segment; cela l'envoie sur lui-même."},{t:"Le pli passe par les deux extrémités du segment quand la feuille est pliée en deux pour aligner les extrémités",fb:"Le pli croise le segment en son milieu; il ne passe pas par les extrémités."}],
    "Aligner les extrémités fait du pli la médiatrice. La réponse est <b>Le pli envoie le segment sur lui-même avec les extrémités échangées</b>.",{mode:"fold"}); q.figure=figBisect("construct"); return q;},
  function(){return mcq("Un élève trace une droite parallèle à une droite de base en copiant un angle avec un compas. Pourquoi copier l'angle fonctionne-t-il ?",
    {t:"Des angles correspondants égaux, formés avec une transversale, garantissent que les droites sont parallèles",fb:"Oui : quand une transversale forme des angles correspondants égaux, les droites sont parallèles."},
    [{t:"L'angle copié donne à la nouvelle droite la même longueur que la droite de base tracée sur la feuille",fb:"Copier un angle contrôle la direction, pas la longueur."},{t:"Le compas trace les deux droites en même temps, en une seule étape de la construction",fb:"Les droites sont tracées séparément; les angles égaux relient leurs directions."},{t:"N'importe quel angle copié produit une droite perpendiculaire qui passe par le point situé sur la droite de base",fb:"Copier un angle reproduit la direction pour des droites parallèles; perpendiculaire demande précisément un angle de 90 degrés."}],
    "Des angles correspondants égaux sont le critère pour des droites parallèles, donc copier l'angle fonctionne. La réponse est <b>Des angles correspondants égaux, formés avec une transversale, garantissent que les droites sont parallèles</b>.",{mode:"copyangle"});},
  function(){return mcq("Après avoir tracé une droite qu'il dit perpendiculaire à une droite donnée, un élève la vérifie avec une équerre et trouve un petit écart au coin. Que doit conclure l'élève ?",
    {t:"La droite n'est pas exactement perpendiculaire, parce qu'un vrai angle droit s'ajuste au coin de l'équerre sans aucun écart",fb:"Oui : le coin de l'équerre est un vrai 90 degrés, donc un écart veut dire que l'angle tracé diffère de 90."},
    [{t:"La droite est perpendiculaire, parce que les petits écarts ne comptent pas dans les constructions faites à la main avec une règle",fb:"La vérification existe pour repérer exactement ce genre d'erreur; l'affirmation échoue à la vérification."},{t:"L'équerre est en faute, parce que les droites tracées sont toujours exactes pour ce genre de vérification",fb:"Le coin de l'équerre est fabriqué comme un angle droit; la droite tracée est la partie testée."},{t:"La droite est plutôt parallèle à la droite donnée qu'elle devait croiser à angle droit, selon l'affirmation de l'élève",fb:"Un angle presque droit n'est ni perpendiculaire ni une preuve de parallèle."}],
    "L'écart montre que l'angle n'est pas exactement 90 degrés, donc la droite échoue à la vérification comme perpendiculaire. La réponse est <b>La droite n'est pas exactement perpendiculaire</b>.",{mode:"gap"});}
]),["La vérification mesure la propriété qui définit : des moitiés égales et 90 degrés, des angles égaux, ou des distances égales.","Commence par énoncer la propriété que la construction doit satisfaire, puis choisis la vérification qui la mesure."]);

/* ----- bank-fix.js ----- */
// Ajouts de figures : les entrées de complément des unités 4 et 8 assignent q.figure à partir de leurs propres valeurs.
// Math 7 (French) pool-gap fill additions question bank
// Cut verbatim from the standalone bank source
// (math-7-review-fr/bank-src.js, lines 4455 to 4758).
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
    {txt:"Une imprimerie demande des frais de préparation plus un tarif par mètre de bannière. Le coût total est donné par la relation ", v:"m", thing:"nombre de mètres", unit:"dollars"},
    {txt:"Une boutique de trophées demande des frais de gravure plus un tarif par trophée. Le coût total est donné par la relation ", v:"t", thing:"nombre de trophées", unit:"dollars"}]);
  var a=ri(3,9), b=ri(4,24), k=ri(6,18), Tot=a*k+b;
  return numq(C.txt+"\\(C = "+u1Expr(a,b,C.v)+"\\) "+C.unit+". Un client paie exactement "+Tot+" $. Quel est le "+C.thing+" ? Montre tes étapes de résolution.", k, 0,
    "Égale la relation au total et résous. \\[ \\begin{aligned} "+u1Expr(a,b,C.v)+" &= "+Tot+" \\\\ "+a+C.v+" &= "+Tot+" - "+b+" \\\\ "+a+C.v+" &= "+(Tot-b)+" \\\\ "+C.v+" &= "+k+" \\end{aligned} \\] La réponse est <b>"+k+"</b>.",
    {a:a,b:b,k:k});
}, ["Égale la relation au total donné pour former une équation, puis défais les opérations dans l'ordre inverse.", "Commence par soustraire le terme constant des deux côtés."]);

E("u1-gap-divisible-count-cr", 1, ["5.4"], 2, "gen", function(){
  var d=pick([3,4,6,8,9]); var L=ri(15,70); var R=L+ri(50,110);
  var upToR=Math.floor(R/d), belowL=Math.floor((L-1)/d), ans=upToR-belowL;
  return numq("Combien d'entiers de "+L+" à "+R+", inclusivement, sont divisibles par "+d+" ? Montre ta méthode de comptage.", ans, 0,
    "Compte les multiples de "+d+" jusqu'à "+R+", puis soustrais les multiples en dessous de "+L+". \\[ \\begin{aligned} \\text{multiples jusqu'à "+R+"} &= "+upToR+" \\\\ \\text{multiples sous "+L+"} &= "+belowL+" \\\\ \\text{nombre} &= "+upToR+" - "+belowL+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {d:d,L:L,R:R});
}, ["Compte les multiples sur tout l'intervalle à partir de 1, puis enlève la partie de l'intervalle que tu ne veux pas.", "Commence par trouver combien de multiples du diviseur il y a jusqu'à la plus grande borne de l'intervalle."]);

E("u1-gap-two-terms-cr", 1, ["7.11","7.7"], 2, "gen", function(){
  var a0=ri(2,10), d=ri(2,9), p=ri(8,14), q=p+ri(6,12);
  var tp=a0+(p-1)*d, tq=a0+(q-1)*d, ans=tp+tq;
  var terms=[a0,a0+d,a0+2*d];
  return numq("Une régularité de nombres commence par \\("+terms.join(", ")+", \\ldots\\) Trouve le terme à la position "+p+" et le terme à la position "+q+", puis donne la somme de ces deux termes. Montre ton travail.", ans, 0,
    "Le pas est \\("+d+"\\), donc le terme à la position \\(n\\) est \\("+u1Expr(d,a0-d)+"\\) . \\[ \\begin{aligned} \\text{terme}_{"+p+"} &= "+a0+" + ("+p+" - 1) \\times "+d+" = "+tp+" \\\\ \\text{terme}_{"+q+"} &= "+a0+" + ("+q+" - 1) \\times "+d+" = "+tq+" \\\\ \\text{somme} &= "+tp+" + "+tq+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a0:a0,d:d,p:p,q:q});
}, ["Construis une relation pour le terme à la position n, utilise-la deux fois, puis combine les deux résultats.", "Commence par trouver le pas à partir des trois premiers termes."]);

E("u1-gap-budget-compare-cr", 1, ["7.3","7.5"], 2, "gen", function(){
  var fee=ri(10,40), rate=ri(4,12), n=ri(3,10), cost=fee+rate*n, under=ri(3,18), budget=cost+under;
  return numq("La location d'un vélo coûte des frais fixes de "+fee+" $ plus "+rate+" $ par jour. Le coût total est donné par la relation \\(C = "+u1Expr(rate,fee,"d")+"\\) dollars, où \\(d\\) est le nombre de jours. Une personne loue un vélo pour "+n+" jours et dispose d'un budget de "+budget+" $. De combien de dollars la location est-elle sous le budget ? Montre ton travail.", under, 0,
    "Évalue d'abord la relation, puis compare avec le budget. \\[ \\begin{aligned} C &= "+rate+" \\times "+n+" + "+fee+" = "+cost+" \\\\ \\text{montant sous le budget} &= "+budget+" - "+cost+" = "+under+" \\end{aligned} \\] La réponse est <b>"+under+" $</b>.",
    {fee:fee,rate:rate,n:n});
}, ["Évalue d'abord la relation pour le nombre de jours donné; la comparaison avec le budget est la deuxième étape.", "Commence par remplacer le nombre de jours dans la relation."]);

/* --- Unit 2 pool-gap fill --- */
E("u2-gap-chain-target-cr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(-6,10), b=ri(3,12), c=ri(2,10), e=ri(2,9);
  var fin=a-b+c-e; var T=pick([-5,0,5]); var g=0;
  while(fin===T&&g++<20){ e+=2; fin=a-b+c-e; }
  var ans=Math.abs(fin-T);
  return numq("La température commence à "+a+" degrés. Elle baisse de "+b+" degrés, puis augmente de "+c+" degrés, puis baisse de "+e+" degrés. À combien de degrés la température finale se trouve-t-elle de "+T+" degrés ? Montre ton travail.", ans, 0,
    "Applique les changements dans l'ordre, puis trouve la distance par rapport à la cible. \\[ \\begin{aligned} \\text{finale} &= "+a+" - "+b+" + "+c+" - "+e+" = "+fin+" \\\\ \\text{distance de "+T+"} &= |"+fin+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a:a,b:b,c:c,e:e});
}, ["Trouve d'abord la valeur finale; la distance par rapport à la cible est une deuxième étape distincte.", "Commence par appliquer le premier changement à la température de départ."]);

E("u2-gap-missing-start-cr", 2, ["6.29","6.25"], 2, "gen", function(){
  var a=ri(3,14), b=ri(3,14), e=ri(-8,12), start=e-a+b;
  return numq("Le pointage d'une partie change deux fois : d'abord il augmente de "+a+" points, puis il diminue de "+b+" points. Le pointage final est de "+e+" points. Quel était le pointage de départ ? Montre ton travail.", start, 0,
    "Défais les deux changements dans l'ordre inverse, à partir du pointage final. \\[ \\begin{aligned} \\text{départ} &= "+e+" + "+b+" - "+a+" \\\\ &= "+start+" \\end{aligned} \\] Vérification : \\("+start+" + "+a+" - "+b+" = "+e+"\\). La réponse est <b>"+start+"</b>.",
    {a:a,b:b,e:e});
}, ["Pars du pointage final et défais chaque changement avec l'opération inverse.", "Commence par défaire le dernier changement : rajoute les points qui ont été enlevés."]);

E("u2-gap-mean-target-cr", 2, ["6.29"], 2, "gen", function(){
  var v1=0,v2=0,v3=0,v4=0,m=0,g=0;
  while(g++<200){ v1=ri(-12,12); v2=ri(-12,12); v3=ri(-12,12); m=ri(-4,6); v4=4*m-(v1+v2+v3); if(v4>=-15&&v4<=15) break; }
  var dist=ri(2,7), T=m+pick([-1,1])*dist, ans=dist;
  var vals=[v1,v2,v3,v4];
  return numq("Quatre températures minimales quotidiennes sont "+vals.join(", ")+" degrés. Trouve la moyenne des quatre températures, puis donne à combien de degrés cette moyenne se trouve de "+T+" degrés. Montre ton travail.", ans, 0,
    "Additionne les quatre valeurs et divise par 4, puis compare la moyenne à la cible. \\[ \\begin{aligned} \\text{moyenne} &= \\frac{"+v1+" + "+u2Sg(v2)+" + "+u2Sg(v3)+" + "+u2Sg(v4)+"}{4} = \\frac{"+(4*m)+"}{4} = "+m+" \\\\ \\text{distance} &= |"+m+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {vals:vals,m:m});
}, ["La moyenne n'est que la première étape; la question demande aussi la distance par rapport à une valeur cible.", "Commence par additionner les quatre températures, en surveillant les signes."]);

E("u2-gap-order-ops-cr", 2, ["6.29"], 2, "gen", function(){
  var r=pick([2,3,4,5]), q0=ri(2,9), diff=r*q0, p=ri(5,20), qq=p-diff, s=ri(2,12);
  var ans=-q0+s;
  return numq("Évalue \\(("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+"\\). Montre la priorité des opérations que tu suis.", ans, 0,
    "Fais d'abord les parenthèses, puis la division, puis l'addition. \\[ \\begin{aligned} ("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+" &= "+diff+" \\div ("+(-r)+") + "+s+" \\\\ &= "+(-q0)+" + "+s+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {p:p,qq:qq,r:r,s:s});
}, ["Suis la priorité des opérations : parenthèses, puis division, puis addition, et surveille le signe quand tu divises par un nombre négatif.", "Commence par évaluer les parenthèses."]);

E("u2-gap-round-trip-cr", 2, ["6.26","6.28"], 2, "gen", function(){
  var p1=-ri(2,15), p2=ri(2,18), dist=p2-p1, ans=2*dist;
  return numq("Un ascenseur part de l'étage "+p1+", monte jusqu'à l'étage "+p2+", puis revient à l'étage "+p1+". Combien d'étages l'ascenseur parcourt-il en tout ? Montre ton travail.", ans, 0,
    "La distance aller est la différence des deux positions, et le retour couvre la même distance. \\[ \\begin{aligned} \\text{aller} &= "+p2+" - "+u2Sg(p1)+" = "+dist+" \\\\ \\text{total} &= 2 \\times "+dist+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {p1:p1,p2:p2});
}, ["Trouve d'abord la distance aller entre les deux positions signées; l'aller-retour vaut deux fois cette distance.", "Commence par soustraire le numéro d'étage le plus bas du numéro le plus haut."]);

E("u2-gap-order-ops-sr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(8,17), b=ri(2,a-3), c=ri(2,5), d=ri(2,10);
  var base=a-b, ans=base*(-c)+d;
  var signErr=base*c+d, orderErr=a+b*c+d, arithErr=ans+pick([2,-2,c+1]);
  var cands=[signErr,orderErr,arithErr]; var seen={}; seen[String(ans)]=1; var ds=[];
  var fbs={}; fbs[String(signErr)]="Cela garde la grandeur mais laisse tomber le signe négatif du multiplicateur."; fbs[String(orderErr)]="Cela multiplie avant de faire les parenthèses; les parenthèses viennent en premier."; fbs[String(arithErr)]="La méthode est bonne, mais il y a une erreur de calcul dans les dernières étapes.";
  cands.forEach(function(z){ if(!seen[String(z)]&&ds.length<3){ seen[String(z)]=1; ds.push({t:String(z), fb:fbs[String(z)]||"Vérifie les parenthèses et le signe du produit."}); } });
  var g=2; while(ds.length<3){ var z=ans+g; if(!seen[String(z)]){ seen[String(z)]=1; ds.push({t:String(z), fb:"Vérifie d'abord les parenthèses, puis le signe du produit."}); } g++; }
  return mcq("Que vaut \\(("+a+" - "+b+") \\times ("+(-c)+") + "+d+"\\) ?",
    {t:String(ans), fb:"Exact : les parenthèses donnent "+base+", le produit est "+(base*(-c))+", et ajouter "+d+" donne "+ans+"."},
    ds,
    "Fais d'abord les parenthèses, puis la multiplication, puis l'addition. \\[ \\begin{aligned} ("+a+" - "+b+") \\times ("+(-c)+") + "+d+" &= "+base+" \\times ("+(-c)+") + "+d+" \\\\ &= "+(base*(-c))+" + "+d+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a:a,b:b,c:c,d:d});
}, ["Fais d'abord les parenthèses, puis la multiplication, puis l'addition.", "Commence par évaluer les parenthèses."]);

/* --- Unit 3 pool-gap fill --- */
E("u3-gap-discount-total-cr", 3, ["6.12","6.11"], 2, "gen", function(){
  var P=20*ri(3,12), p=pick([10,15,20,25,30,35,40,45]);
  var disc=P*p/100, ans=P-disc;
  var item=pick(["veste","casque de vélo","sac à dos"]);
  return numq("Une "+item+" coûte "+P+" $. Le magasin offre un rabais de "+p+" %. Combien de dollars un client paie-t-il pour cette "+item+" ? Montre ton travail.", ans, 0,
    "Trouve d'abord le montant du rabais, puis soustrais-le du prix. \\[ \\begin{aligned} \\text{rabais} &= "+p+"\\,\\% \\text{ de } "+P+" = "+disc+" \\\\ \\text{montant payé} &= "+P+" - "+disc+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+" $</b>.",
    {P:P,p:p});
}, ["Trouve d'abord le montant du pourcentage; le montant payé est ce qui reste après l'avoir enlevé.", "Commence par calculer le rabais en dollars."]);

E("u3-gap-tickets-left-cr", 3, ["6.9"], 2, "gen", function(){
  var pr=pick([[1,3],[2,3],[1,4],[3,4],[1,6],[5,6],[1,8],[3,8],[5,8],[7,8],[2,5],[3,5]]);
  var n=pr[0], d=pr[1], T=d*ri(6,14), part=T*n/d, ans=T-part;
  return numq("Une école imprime "+T+" billets de tirage. Le matin, \\("+FR(n,d)+"\\) des billets sont vendus. Combien de billets reste-t-il à vendre ? Montre ton travail.", ans, 0,
    "Trouve d'abord combien de billets ont été vendus, puis enlève ce nombre du total. \\[ \\begin{aligned} \\text{vendus} &= "+FR(n,d)+" \\text{ de } "+T+" = "+part+" \\\\ \\text{restants} &= "+T+" - "+part+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {n:n,d:d,T:T});
}, ["Trouve d'abord la partie qui a été vendue; ce qui reste est le complément de cette partie.", "Commence par trouver la fraction du total de billets."]);

E("u3-gap-decimal-fraction-cr", 3, ["3.12"], 2, "gen", function(){
  var pr=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8]]);
  var n=pr[0], d=pr[1], dec=n/d, Q=d*ri(6,14), ans=Q*n/d;
  return numq("Écris "+fmtD(dec,3)+" sous forme de fraction irréductible, puis trouve cette fraction de "+Q+" kilogrammes. Donne le montant final, en kilogrammes. Montre ton travail.", ans, 0,
    "Sous forme de fraction, \\("+fmtD(dec,3)+" = "+FR(n,d)+"\\) sous forme irréductible. Applique cette fraction à la quantité. \\[ \\begin{aligned} "+FR(n,d)+" \\text{ de } "+Q+" &= "+Q+" \\div "+d+" \\times "+n+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {n:n,d:d,Q:Q});
}, ["Convertis d'abord le nombre décimal en fraction; ensuite seulement tu peux l'appliquer à la quantité.", "Commence par écrire le nombre décimal sous forme de fraction sur 10, 100 ou 1000, puis réduis-la."]);

E("u3-gap-compare-difference-cr", 3, ["3.5","3.3"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[7,8],[2,5],[4,5],[9,10],[3,5],[1,4],[7,10],[3,8]]);
  var n=pr[0], d=pr[1], dec1=n/d;
  var off=pick([-0.15,-0.08,-0.06,0.07,0.09,0.12]); var dec2=Math.round((dec1+off)*1000)/1000;
  var ans=Math.round(Math.abs(dec1-dec2)*1000)/1000;
  var larger=off<0?("la fraction"):("le nombre décimal");
  return numq("Compare \\("+FR(n,d)+"\\) et "+fmtD(dec2,3)+". De combien la plus grande valeur dépasse-t-elle la plus petite ? Montre ton travail.", ans, 0.001,
    "Convertis d'abord la fraction en nombre décimal : \\("+FR(n,d)+" = "+fmtD(dec1,3)+"\\). La plus grande valeur est "+larger+", et la différence est \\(|"+fmtD(dec1,3)+" - "+fmtD(dec2,3)+"| = "+fmtD(ans,3)+"\\). La réponse est <b>"+fmtD(ans,3)+"</b>.",
    {n:n,d:d});
}, ["Convertis les deux valeurs sous la même forme avant de les comparer, puis soustrais pour trouver l'écart.", "Commence par diviser le numérateur par le dénominateur pour obtenir la fraction sous forme décimale."]);

/* --- Unit 4 pool-gap fill --- */
E("u4-gap-area-diameter-cr", 4, ["9.11","9.9"], 2, "gen", function(){
  var r=ri(3,14), d=2*r, area=Math.round(3.14*r*r*100)/100; var item=pick(["Un tapis circulaire","Une horloge ronde","Un moule à pizza rond","Une plate-bande circulaire","Une table ronde"]);
  var q=numq(item+" a un diamètre de "+d+" cm. Trouve son aire, en centimètres carrés. Utilise 3,14 pour pi. Montre ton travail.", area, 0.1,
    "Le rayon est la moitié du diamètre, et l'aire utilise le rayon. \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ A &= 3,14 \\times "+r+"^2 = "+fmtD(area,2)+" \\end{aligned} \\] La réponse est <b>"+fmtD(area,2)+"</b>.",
    {r:r,d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
}, ["Divise le diamètre en deux pour obtenir le rayon avant d'utiliser la formule de l'aire.", "Commence par diviser le diamètre par 2."]);

E("u4-gap-rect-minus-circle-cr", 4, ["9.1","9.3"], 2, "gen", function(){
  var L=ri(12,20), W=ri(9,15), r=pick([2,3,4]);
  var rect=L*W, circ=Math.round(3.14*r*r*100)/100, ans=Math.round((rect-circ)*100)/100;
  var q=numq("Un jardin rectangulaire mesure "+L+" m de long et "+W+" m de large. Un bassin circulaire de rayon "+r+" m se trouve dans le jardin. Trouve l'aire du jardin qui n'est pas couverte par le bassin, en mètres carrés. Utilise 3,14 pour pi. Montre ton travail.", ans, 0.1,
    "Trouve l'aire du rectangle et l'aire du cercle, puis soustrais. \\[ \\begin{aligned} A_{\\text{rectangle}} &= "+L+" \\times "+W+" = "+rect+" \\\\ A_{\\text{cercle}} &= 3,14 \\times "+r+"^2 = "+fmtD(circ,2)+" \\\\ \\text{reste} &= "+rect+" - "+fmtD(circ,2)+" = "+fmtD(ans,2)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans,2)+"</b>.",
    {L:L,W:W,r:r}); q.figure=figRectCircle(L,W,r,"m"); return q;
}, ["C'est l'aire d'un rectangle moins l'aire d'un cercle, donc calcule chaque aire séparément d'abord.", "Commence par l'aire du rectangle entier."]);

E("u4-gap-revolutions-cr", 4, ["9.7","9.10"], 2, "gen", function(){
  var r=pick([20,25,30,35,40,50]), C=Math.round(2*3.14*r*100)/100, k=ri(8,25);
  var ans=Math.round(C*k/100*100)/100;
  var q=numq("Une roue de vélo a un rayon de "+r+" cm. La roue fait "+k+" tours complets. Combien de mètres le vélo parcourt-il ? Utilise 3,14 pour pi. Montre ton travail.", ans, 0.1,
    "Un tour couvre une circonférence, donc trouve d'abord la circonférence, puis multiplie et convertis. \\[ \\begin{aligned} C &= 2 \\times 3,14 \\times "+r+" = "+fmtD(C,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmtD(C,2)+" \\times "+k+" = "+fmtD(C*k,2)+" \\text{ cm} = "+fmtD(ans,2)+" \\text{ m} \\end{aligned} \\] La réponse est <b>"+fmtD(ans,2)+"</b>.",
    {r:r,k:k}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["Un tour de roue couvre une circonférence; trouve d'abord cette distance, puis multiplie-la et convertis les unités.", "Commence par utiliser le rayon pour trouver la circonférence."]);

/* --- Unit 5 pool-gap fill --- */
E("u5-gap-recipe-total-cr", 5, ["6.23","6.17"], 2, "gen", function(){
  var N=ri(5,15), f=pick([2,3]), ing=pick(["farine","sucre","flocons d'avoine"]);
  var ans=(1+f)*N/4;
  return numq("Une recette utilise "+u5M(N,4)+" tasses de "+ing+" pour un lot. Une cuisinière prépare un lot, puis un deuxième lot "+f+" fois plus grand. Combien de tasses de "+ing+" sont utilisées en tout ? Donne ta réponse sous forme de nombre décimal de tasses. Montre ton travail.", ans, 0.01,
    "Trouve d'abord la quantité pour le grand lot, puis additionne les deux lots. \\[ \\begin{aligned} \\text{deuxième lot} &= "+f+" \\times "+u5disp(N,4)+" = "+u5disp(f*N,4)+" \\\\ \\text{total} &= "+u5disp(N,4)+" + "+u5disp(f*N,4)+" = "+u5disp((1+f)*N,4)+" = "+fmtD(ans,2)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans,2)+"</b>.",
    {N:N,f:f});
}, ["Multiplie d'abord la quantité de la recette pour le deuxième lot; le total combine les deux lots.", "Commence par multiplier la quantité d'un lot par le facteur d'échelle."]);

E("u5-gap-sub-mixed-dec-cr", 5, ["6.21","6.19"], 2, "gen", function(){
  var mode=pick(["q","e"]); var d, w1, n1, w2, n2;
  if(mode==="q"){ d=4; w1=ri(4,7); n1=pick([1,2]); w2=ri(1,3); n2=3; }
  else { d=8; w1=ri(4,7); n1=pick([1,2,3,4]); w2=ri(1,3); n2=pick([5,6,7]); }
  var startN=w1*d+n1, subN=w2*d+n2, ans=(startN-subN)/d;
  return numq("Un réservoir contient "+u5M(startN,d)+" litres d'eau. Une classe en utilise "+u5M(subN,d)+" litres. Combien de litres reste-t-il dans le réservoir ? Donne ta réponse sous forme de nombre décimal. Montre ton travail.", ans, 0.001,
    "La partie fractionnaire à soustraire est plus grande, donc emprunte d'abord 1 entier à la partie entière. \\[ \\begin{aligned} "+u5disp(startN,d)+" - "+u5disp(subN,d)+" &= "+u5disp(startN-subN,d)+" \\\\ &= "+fmtD(ans,3)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans,3)+"</b>.",
    {mode:mode,startN:startN,subN:subN,d:d});
}, ["Compare d'abord les parties fractionnaires; ici la soustraction demande un emprunt à la partie entière.", "Commence par réécrire le premier nombre mixte avec un entier emprunté dans sa partie fractionnaire."]);

E("u5-gap-grams-cr", 5, ["6.23"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[3,8],[7,8],[2,5],[4,5],[3,5],[1,2]]);
  var n=pr[0], d=pr[1], M=ri(2,6), grams=M*1000, ans=grams*n/d; var item=pick(["farine","sucre","farine de riz","cacao en poudre"]);
  return numq("Un sac de "+item+" a une masse de "+M+" kilogrammes. Un boulanger utilise \\("+FR(n,d)+"\\) du sac. Combien de grammes de "+item+" le boulanger utilise-t-il ? Montre ton travail.", ans, 0,
    "Convertis d'abord la masse en grammes, puis prends la fraction de cette quantité. \\[ \\begin{aligned} "+M+" \\text{ kg} &= "+grams+" \\text{ g} \\\\ "+FR(n,d)+" \\text{ de } "+grams+" &= "+grams+" \\div "+d+" \\times "+n+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {n:n,d:d,M:M});
}, ["Change d'abord l'unité pour que la réponse finale soit en grammes, puis trouve la fraction de la quantité convertie.", "Commence par multiplier les kilogrammes par 1000."]);

E("u5-gap-frac-of-frac-cr", 5, ["6.23","6.22"], 2, "gen", function(){
  var p1=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]), p2=pick([[1,2],[1,4],[2,3],[3,4],[1,5],[2,5]]);
  var base=p1[1]*p2[1], Q=base*ri(4,9), step1=Q*p1[0]/p1[1], ans=step1*p2[0]/p2[1];
  return numq("Une école imprime "+Q+" pages pour un projet de livrets. De ces pages, \\("+FR(p1[0],p1[1])+"\\) sont mises de côté pour les livrets. Des pages mises de côté, \\("+FR(p2[0],p2[1])+"\\) sont imprimées en couleur. Combien de pages sont imprimées en couleur ? Montre ton travail.", ans, 0,
    "Prends la première fraction du total, puis prends la deuxième fraction de ce résultat. \\[ \\begin{aligned} \\text{mises de côté} &= "+FR(p1[0],p1[1])+" \\text{ de } "+Q+" = "+step1+" \\\\ \\text{couleur} &= "+FR(p2[0],p2[1])+" \\text{ de } "+step1+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {Q:Q,step1:step1});
}, ["Travaille par étapes : la deuxième fraction agit sur le résultat de la première fraction, pas sur le total de départ.", "Commence par trouver la première fraction du total de pages."]);

/* --- Unit 6 pool-gap fill --- */
E("u6-gap-two-step-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,9), x=ri(4,15), b=ri(3,20), c=a*x+b;
  return numq("Un élève achète des cahiers à "+a+" $ chacun et paie des frais de livraison de "+b+" $. Le coût total est de "+c+" $. Le coût est modélisé par \\("+a+"x + "+b+" = "+c+"\\), où \\(x\\) est le nombre de cahiers. Résous l'équation pour trouver \\(x\\). Montre tes étapes de résolution.", x, 0,
    "Défais d'abord l'addition, puis la multiplication. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] La réponse est <b>"+x+"</b>.",
    {a:a,b:b,x:x});
}, ["Défais les opérations dans l'ordre inverse : défais l'addition avant la multiplication.", "Commence par soustraire la constante des deux côtés."]);

E("u6-gap-both-sides-cr", 6, ["8.14","8.3"], 2, "gen", function(){
  var a=ri(5,9), c2=ri(2,a-2), x=ri(3,12), b=ri(2,15), d2=b+(a-c2)*x;
  return numq("Résous \\("+a+"x + "+b+" = "+c2+"x + "+d2+"\\). Montre tes étapes de résolution.", x, 0,
    "Regroupe d'abord les termes en variable d'un côté, puis les constantes, puis divise. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c2+"x + "+d2+" \\\\ "+(a-c2)+"x &= "+(d2-b)+" \\\\ x &= "+x+" \\end{aligned} \\] La réponse est <b>"+x+"</b>.",
    {a:a,c2:c2,x:x});
}, ["Mets tous les termes en variable d'un côté et toutes les constantes de l'autre avant de diviser.", "Commence par soustraire le plus petit terme en variable des deux côtés."]);

E("u6-gap-divide-form-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,8), k=ri(6,15), b=ri(2,Math.min(10,k-2)), c=k-b, x=a*k;
  return numq("Résous \\(\\frac{x}{"+a+"} - "+b+" = "+c+"\\). Montre tes étapes de résolution.", x, 0,
    "Défais d'abord la soustraction, puis défais la division en multipliant. \\[ \\begin{aligned} \\frac{x}{"+a+"} - "+b+" &= "+c+" \\\\ \\frac{x}{"+a+"} &= "+k+" \\\\ x &= "+a+" \\times "+k+" = "+x+" \\end{aligned} \\] La réponse est <b>"+x+"</b>.",
    {a:a,k:k,b:b});
}, ["Défais les opérations dans l'ordre inverse : défais la soustraction avant de défaire la division.", "Commence par ajouter la constante des deux côtés."]);

E("u6-gap-check-diff-cr", 6, ["8.17","8.11"], 2, "gen", function(){
  var a=ri(3,8), b=ri(2,15), xt=ri(4,12), c=a*xt+b;
  var delta=pick([2,3,-2,-3]); if(xt+delta<1) delta=-delta;
  var x0=xt+delta, lhs=a*x0+b, ans=lhs-c;
  return numq("Un élève affirme que \\(x = "+x0+"\\) est la solution de \\("+a+"x + "+b+" = "+c+"\\). Évalue le membre de gauche pour \\(x = "+x0+"\\), puis donne la valeur de membre de gauche moins membre de droite. Montre ton travail.", ans, 0,
    "Remplace la valeur affirmée dans le membre de gauche, puis compare-le au membre de droite. \\[ \\begin{aligned} \\text{membre de gauche} &= "+a+" \\times "+x0+" + "+b+" = "+lhs+" \\\\ \\text{gauche} - \\text{droite} &= "+lhs+" - "+c+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {a:a,b:b,x0:x0});
}, ["Vérifier veut dire remplacer la valeur affirmée et évaluer, puis comparer les deux membres.", "Commence par remplacer x par la valeur affirmée dans le membre de gauche."]);

/* --- Unit 7 pool-gap fill --- */
E("u7-gap-missing-mean-cr", 7, ["11.9"], 2, "gen", function(){
  var M=ri(8,16), known=[], missing=0, g=0;
  while(g++<300){ known=[]; var s=0; for(var i=0;i<5;i++){ var v=ri(4,20); known.push(v); s+=v; } missing=6*M-s; if(missing>=2&&missing<=24) break; }
  return numq("La moyenne de six résultats de quiz est de "+M+". Cinq des résultats sont "+known.join(", ")+". Quel est le sixième résultat ? Montre ton travail.", missing, 0,
    "La moyenne fixe le total des six résultats, donc trouve ce total et soustrais les résultats connus. \\[ \\begin{aligned} \\text{total} &= 6 \\times "+M+" = "+(6*M)+" \\\\ \\text{sixième résultat} &= "+(6*M)+" - "+(6*M-missing)+" = "+missing+" \\end{aligned} \\] La réponse est <b>"+missing+"</b>.",
    {M:M,known:known});
}, ["Une moyenne donnée te donne le total; pars du total pour retrouver la valeur manquante.", "Commence par multiplier la moyenne par le nombre de résultats."]);

E("u7-gap-median-range-cr2", 7, ["11.6","11.7"], 2, "gen", function(){
  var m=ri(8,20);
  var low=[m-ri(4,7), m-ri(2,3), m-ri(1,2)], high=[m+ri(1,2), m+ri(3,4), m+ri(5,8)];
  var sorted=low.concat([m],high), range=sorted[6]-sorted[0], ans=m+range;
  var shown=shuffle(sorted);
  return numq("Un ensemble de données est "+shown.join(", ")+". Trouve la médiane de l'ensemble et l'étendue de l'ensemble, puis donne la somme de la médiane et de l'étendue. Montre ton travail.", ans, 0,
    "Place d'abord les valeurs en ordre; la médiane est la valeur du milieu et l'étendue est l'écart total. \\[ \\begin{aligned} \\text{en ordre} &= "+sorted.join(", ")+" \\\\ \\text{médiane} &= "+m+" \\\\ \\text{étendue} &= "+sorted[6]+" - "+sorted[0]+" = "+range+" \\\\ \\text{somme} &= "+m+" + "+range+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {m:m,range:range});
}, ["Place d'abord les données en ordre; la médiane et l'étendue viennent toutes deux de l'ensemble ordonné, puis combine-les.", "Commence par écrire les valeurs en ordre, de la plus petite à la plus grande."]);

E("u7-gap-joint-pct-cr", 7, ["12.5","12.7"], 2, "gen", function(){
  var N=pick([40,50,80,100]);
  var J=ri(6,16), swimOnly=ri(5,20), S=J+swimOnly, pct=Math.round(100*J/N*100)/100;
  return numq("Un sondage interroge "+N+" élèves sur la natation et le hockey. En tout, "+S+" élèves font de la natation. Parmi les élèves qui font de la natation, "+swimOnly+" ne jouent pas au hockey. Quel pourcentage de tous les "+N+" élèves font à la fois de la natation et du hockey ? Montre ton travail.", pct, 0.1,
    "Trouve d'abord le nombre d'élèves qui font les deux, puis écris ce nombre en pourcentage de tous les élèves. \\[ \\begin{aligned} \\text{les deux} &= "+S+" - "+swimOnly+" = "+J+" \\\\ \\text{pourcentage} &= \\frac{"+J+"}{"+N+"} \\times 100 = "+fmtD(pct,2)+"\\,\\% \\end{aligned} \\] La réponse est <b>"+fmtD(pct,2)+"</b>.",
    {N:N,J:J,S:S});
}, ["Le nombre d'élèves qui font les deux n'est pas donné directement; trouve-le d'abord, puis convertis la fraction de tous les élèves en pourcentage.", "Commence par soustraire pour trouver combien d'élèves font à la fois de la natation et du hockey."]);

E("u7-gap-expected-pct-cr", 7, ["12.6","12.7"], 2, "gen", function(){
  var p=pick([10,15,20,25,30,40,50,60,75,80]), N=pick([120,160,200,240,300,400]);
  var ans=N*p/100;
  return numq("Une roulette tombe sur le rouge "+p+" % du temps à long terme. On fait tourner la roulette "+N+" fois. Combien de résultats rouges devrait-on attendre ? Montre ton travail.", ans, 0,
    "Transforme le pourcentage en fraction des essais, puis applique-le au nombre de tours. \\[ \\begin{aligned} \\text{rouges attendus} &= "+p+"\\,\\% \\text{ de } "+N+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {p:p,N:N});
}, ["Un nombre attendu applique le pourcentage à long terme au nombre réel d'essais.", "Commence par trouver ce que vaut un pour cent des essais, ou par écrire le pourcentage sous forme décimale."]);

/* --- Unit 8 pool-gap fill --- */
E("u8-gap-angle-chain-cr", 8, ["10.1"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("L'angle P se trouve sur une droite avec un angle de "+B+" degrés, donc l'angle P et l'angle de "+B+" degrés sont supplémentaires. L'angle P est un angle d'un triangle dont le deuxième angle mesure "+D+" degrés. Trouve le troisième angle du triangle, en degrés. Montre ton travail.", third, 0,
    "Trouve d'abord l'angle P à l'aide de la droite, puis utilise la somme des angles d'un triangle. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{troisième angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] La réponse est <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Deux faits sur les angles sont enchaînés ici : utilise d'abord le fait de la droite, puis mets son résultat dans le triangle.", "Commence par trouver l'angle supplémentaire sur la droite."]);

E("u8-gap-pythagoras-cr", 8, ["10.19"], 2, "gen", function(){
  var s=ri(1,3), ox=ri(-4,2), oy=ri(-3,3);
  var A=[ox,oy], B=[ox+3*s,oy], Cc=[ox+3*s,oy+4*s], hyp=5*s;
  var q=numq("Les points A "+u8pair(A[0],A[1])+", B "+u8pair(B[0],B[1])+" et C "+u8pair(Cc[0],Cc[1])+" forment un triangle rectangle dont l'angle droit est en B. Trouve la longueur de l'hypoténuse AC. Montre ton travail.", hyp, 0,
    "Compte d'abord les cathètes à partir des différences de coordonnées, puis utilise la relation de Pythagore. \\[ \\begin{aligned} AB &= "+(3*s)+", \\quad BC = "+(4*s)+" \\\\ AC^2 &= "+(3*s)+"^2 + "+(4*s)+"^2 = "+(25*s*s)+" \\\\ AC &= "+hyp+" \\end{aligned} \\] La réponse est <b>"+hyp+"</b>.",
    {s:s}); q.figure=figWideGrid([{x:A[0],y:A[1],label:"A"},{x:B[0],y:B[1],label:"B"},{x:Cc[0],y:Cc[1],label:"C"}],[[A,B,Cc]],null); return q;
}, ["Obtiens d'abord les deux cathètes à partir des coordonnées; l'hypoténuse vient en les combinant.", "Commence par trouver l'écart horizontal et l'écart vertical entre les points."]);

E("u8-gap-rotate-cr", 8, ["10.20","10.12"], 2, "gen", function(){
  var x=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), y=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var cw=Math.random()<0.5;
  var step1=cw?[y,-x]:[-y,x], step2=[-x,-y];
  var askX=Math.random()<0.5, ans=askX?step2[0]:step2[1];
  var dirTxt=cw?"dans le sens horaire":"dans le sens antihoraire";
  var q=numq("Le point P "+u8pair(x,y)+" subit une rotation de 90 degrés "+dirTxt+" autour de l'origine, puis l'image subit une autre rotation de 90 degrés "+dirTxt+" autour de l'origine. Quelle est la coordonnée "+(askX?"en x":"en y")+" de l'image finale ? Montre ton travail.", ans, 0,
    "Applique la règle du quart de tour deux fois, en mettant le point à jour après chaque tour. \\[ \\begin{aligned} \\text{départ} &= "+u8pair(x,y)+" \\\\ \\text{après un tour} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{après deux tours} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] La coordonnée "+(askX?"en x":"en y")+" est <b>"+ans+"</b>.",
    {x:x,y:y}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
}, ["Applique la rotation un quart de tour à la fois, en mettant les coordonnées à jour après chaque tour.", "Commence par appliquer le premier tour de 90 degrés au point de départ."]);

E("u8-gap-grid-area-cr", 8, ["10.9"], 2, "gen", function(){
  var F=ri(9,20), H=pick([2,4,6,8,10]), s=pick([2,3,4]);
  var units=F+H/2, ans=units*s*s;
  var q=numq("Une forme tracée sur du papier quadrillé couvre "+F+" carrés entiers de la grille et "+H+" demi-carrés. Chaque carré de la grille mesure "+s+" cm sur "+s+" cm. Trouve l'aire de la forme, en centimètres carrés. Montre ton travail.", ans, 0,
    "Combine d'abord les demi-carrés en carrés entiers, puis multiplie par l'aire d'un carré. \\[ \\begin{aligned} \\text{carrés} &= "+F+" + "+H+" \\div 2 = "+units+" \\\\ \\text{aire d'un carré} &= "+s+" \\times "+s+" = "+(s*s)+" \\\\ \\text{aire} &= "+units+" \\times "+(s*s)+" = "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {F:F,H:H,s:s}); q.figure=figGridArea(F,H); return q;
}, ["Transforme d'abord les demi-carrés en équivalents de carrés entiers, puis applique l'échelle d'un carré.", "Commence par regrouper les demi-carrés en carrés entiers."]);

E("u8-gap-parallel-angle-cr", 8, ["10.1"], 2, "gen", function(){
  var A=0,B=0,third=0,g=0;
  while(g++<200){ A=ri(40,110); B=ri(20,60); third=180-A-B; if(third>=10) break; }
  var q=numq("Deux droites parallèles sont coupées par une transversale. Un des angles formés mesure "+A+" degrés, et un angle intérieur alterné qui lui est égal forme un angle d'un triangle. Un deuxième angle du triangle mesure "+B+" degrés. Trouve le troisième angle du triangle, en degrés. Montre ton travail.", third, 0,
    "Les angles intérieurs alternés formés par des droites parallèles sont égaux, donc l'angle du triangle mesure "+A+" degrés; utilise ensuite la somme des angles d'un triangle. \\[ \\begin{aligned} \\text{troisième angle} &= 180 - "+A+" - "+B+" = "+third+" \\end{aligned} \\] La réponse est <b>"+third+"</b>.",
    {A:A,B:B}); q.figure=triAngSVG(A,B,third,{L:["","",""],ang:[A+"°",B+"°","?"]}); return q;
}, ["Utilise d'abord la relation d'angles avec les droites parallèles pour obtenir l'angle du triangle, puis la somme des angles d'un triangle.", "Commence par énoncer la mesure de l'angle intérieur alterné."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-evaluate-cr":2,"u1-factors-count-cr":3,"u1-far-term-cr":3,"u1-gap-budget-compare-cr":3,"u1-gap-divisible-count-cr":2,"u1-gap-solve-count-cr":2,"u1-gap-two-terms-cr":3,"u1-solve-812-cr":3,"u1-table-value-cr":3,"u2-add-cr":3,"u2-gap-chain-target-cr":2,"u2-gap-mean-target-cr":3,"u2-gap-missing-start-cr":2,"u2-gap-order-ops-cr":3,"u2-gap-round-trip-cr":3,"u2-missing-addend-cr":3,"u2-numberline-cr":3,"u2-problem-cr":3,"u2-sub-cr":2,"u3-cr-add-sub":3,"u3-cr-div":2,"u3-cr-mult":3,"u3-cr-order-ops":3,"u3-cr-percent":3,"u3-cr-repeating-frac":2,"u3-gap-compare-difference-cr":3,"u3-gap-decimal-fraction-cr":3,"u3-gap-discount-total-cr":2,"u3-gap-tickets-left-cr":2,"u4-cr-area-circle":3,"u4-cr-area-mix":3,"u4-cr-circumference":3,"u4-cr-composite":3,"u4-cr-graph-quantity":2,"u4-gap-area-diameter-cr":2,"u4-gap-rect-minus-circle-cr":2,"u4-gap-revolutions-cr":3,"u5-gap-frac-of-frac-cr":3,"u5-gap-grams-cr":3,"u5-gap-recipe-total-cr":2,"u5-gap-sub-mixed-dec-cr":2,"u5-mixed-multistep":3,"u5-problem-add":3,"u5-problem-sub-mixed":2,"u5-simplify-solution":3,"u5-three-fractions":3,"u6-gap-both-sides-cr":2,"u6-gap-check-diff-cr":3,"u6-gap-divide-form-cr":3,"u6-gap-two-step-cr":2,"u6-model-solve-cr":3,"u6-one-step-problem-cr":3,"u6-preservation-problem-cr":2,"u6-problem-two-step-cr":3,"u6-solve-challenge-cr":3,"u7-central-problem-cr":3,"u7-expected-count-cr":3,"u7-gap-expected-pct-cr":3,"u7-gap-joint-pct-cr":3,"u7-gap-median-range-cr2":2,"u7-gap-missing-mean-cr":2,"u7-median-range-cr":3,"u7-missing-value-cr":3,"u7-two-event-pct-cr":2,"u8-bisector-cr":3,"u8-distance-cr":3,"u8-gap-angle-chain-cr":2,"u8-gap-grid-area-cr":3,"u8-gap-parallel-angle-cr":3,"u8-gap-pythagoras-cr":2,"u8-gap-rotate-cr":3,"u8-successive-cr":2,"u8-transform-cr":3,"u8-translate-cr":3};
