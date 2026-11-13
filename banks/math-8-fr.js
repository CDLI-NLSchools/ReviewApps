/* Math 8 (French) bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-8-fr/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 8 (French) bank helpers: the French number-format helpers
   (frNum, fmtD, fmtDF) the bank calls, cut verbatim from the
   standalone app's chassis (math-8-review-fr/index.html), followed
   by the head of the standalone bank source (math-8-review-fr/
   bank-src.js, lines 1 to 48: the FR fraction helper), where it precedes the Unit 1 banner. In the
   standalone the chassis helpers live in the page and the bank
   reads them as globals, so the unified bank module carries them
   here, first in the build order. */
function frNum(s){s=String(s);var neg=false;if(s.charAt(0)==="-"){neg=true;s=s.slice(1);}var p=s.split("."),ip=p[0],dp=(p.length>1?p[1]:null);if(ip.length>3){var out="";while(ip.length>3){out="\u00A0"+ip.slice(ip.length-3)+out;ip=ip.slice(0,ip.length-3);}ip=ip+out;}return (neg?"-":"")+ip+(dp===null?"":","+dp);}
function fmtD(n,d){return frNum(fmt(n,d));}
function fmtDF(n,d){return frNum(fmtF(n,d));}
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 1 (Square Roots and the Pythagorean Theorem),
   entries u1-*. Translated per RULES.md and GLOSSARY.md (grade 8:
   "cathètes" for legs, "carré parfait", "racine carrée").

   Judgement calls (glossary silent or wording rebuilt):
   - "legs" of a right triangle rendered "cathètes" throughout,
     including hints and the missing-leg entry.
   - In u1-square-plot-perimeter, \text{side} became \text{côté} and
     \text{fencing} became \text{périmètre}; the closing sentence uses
     the generic "La longueur nécessaire est" so the same solution
     fits all four edge contexts (clôture, bordure cousue, bordure,
     cadre), where the English solution says "fencing" for all four.
   - In u1-ladder-context (foot mode), the garbled English clause
     about the cable touching the ground at the top of the pole was
     rendered by its plain meaning: the cable runs from the top of
     the pole to a point on level ground. No numbers or givens change.
   - Place names kept unchanged (St. John's, Gander, Corner Brook,
     Clarenville, Bay Roberts, Mount Pearl); the ladder place list
     carries the French preposition "à".
   - \text{total} in u1-perfect-square-region kept as \text{total}
     (same word in French).

   FMT-GEOM lines left as fmt(: none. The figure helpers in this chunk
   build SVG coordinates by plain concatenation, not fmt(, so every
   display fmt( became fmtD(. There are no fmtF( or .toFixed( calls
   in this chunk.

   Literal formatted numbers written into static prose:
   - Decimal commas in u1-why-approx: 2,2360679 (sqrt 5 screen value,
     in the prompt, the correct option and its feedback chain);
     3,31662479 and 3,3 (sqrt 11 variant); 4,47 and 19,9809
     (sqrt 20 variant, prompt, options, feedback and solution).
   - Percent literals: none in this chunk.
   - Dollar literals: none in this chunk.
   - Thousands literals: none. No static four-plus-digit integers
     occur; generated values go through fmtD where the English used
     fmt, and plain concatenation elsewhere, as in the source.

   Unsure about: nothing blocking.
*/
/* Math 8 Review bank source. Full-course build, November 7, 2026, assembled
   from units/unit1.js to unit8.js. FR returns the raw \frac fragment for use
   INSIDE math delimiters, defined here for the entries that use it. CR_MARKS
   stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* Fonctions d'aide aux figures ajoutées le 12 novembre 2026 pour les
   diagrammes de géométrie de Mathématiques 8 (unités 1, 4 et 8, plus
   les entrées de comblement dans bank-fix.js). Chaque fonction reçoit
   ses étiquettes de l'appelant, construites à partir des mêmes valeurs
   tirées que le texte de la question, donc une étiquette ne peut jamais
   contredire l'énoncé. Une étiquette « ? » marque l'inconnue. */
function m8RectDiagSVG(w,h,labW,labH,labD){
  var sc=Math.min(225/Math.max(w,1),140/Math.max(h,1));
  var Wd=w*sc,Hd=h*sc,x0=(330-Wd)/2,y0=(215-Hd)/2;
  var mx=x0+Wd/2,my=y0+Hd/2,pl=Math.sqrt(Hd*Hd+Wd*Wd)||1;
  var ox=Hd/pl*17,oy=Wd/pl*17;
  var s='<svg viewBox="0 0 330 215" width="330" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : rectangle avec sa diagonale">';
  s+='<rect x="'+fmt(x0,1)+'" y="'+fmt(y0,1)+'" width="'+fmt(Wd,1)+'" height="'+fmt(Hd,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+fmt(x0,1)+'" y1="'+fmt(y0+Hd,1)+'" x2="'+fmt(x0+Wd,1)+'" y2="'+fmt(y0,1)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+=_txt(mx,y0+Hd+18,labW,13,false);
  s+=_txt(x0-18,my,labH,13,false);
  s+=_txt(mx-ox,my-oy,labD,14,true);
  return s+'</svg>';
}
function m8SquareAreaSVG(labArea){
  var s='<svg viewBox="0 0 330 195" width="330" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : carré avec son aire indiquée">';
  s+='<rect x="100" y="25" width="130" height="130" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(165,90,labArea,15,true);
  s+=_txt(165,173,"?",14,true);
  return s+'</svg>';
}
function m8GridDistSVG(x1,y1,x2,y2){
  var xm=x2+1,ym=y2+1,cell=Math.min(230/Math.max(xm,1),165/Math.max(ym,1));
  var ox=45,oy=195;
  function X(v){return ox+v*cell;} function Y(v){return oy-v*cell;}
  var s='<svg viewBox="0 0 320 225" width="320" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : deux points sur un quadrillage joints par une ligne droite">';
  for(var i=0;i<=xm;i++){s+='<line x1="'+fmt(X(i),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(i),1)+'" y2="'+fmt(Y(ym),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1.2"/>';}
  for(var j=0;j<=ym;j++){s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(j),1)+'" x2="'+fmt(X(xm),1)+'" y2="'+fmt(Y(j),1)+'" stroke="'+FIG_SHADE+'" stroke-width="1.2"/>';}
  s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(xm),1)+'" y2="'+fmt(Y(0),1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+fmt(X(0),1)+'" y1="'+fmt(Y(0),1)+'" x2="'+fmt(X(0),1)+'" y2="'+fmt(Y(ym),1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+fmt(X(x1),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y1),1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="'+fmt(X(x2),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y2),1)+'" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="'+fmt(X(x1),1)+'" y1="'+fmt(Y(y1),1)+'" x2="'+fmt(X(x2),1)+'" y2="'+fmt(Y(y2),1)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+='<circle cx="'+fmt(X(x1),1)+'" cy="'+fmt(Y(y1),1)+'" r="3.6" fill="'+FIG_INK+'"/>';
  s+='<circle cx="'+fmt(X(x2),1)+'" cy="'+fmt(Y(y2),1)+'" r="3.6" fill="'+FIG_INK+'"/>';
  s+=_txt(X(x1)-4,Y(y1)+18,"("+x1+", "+y1+")",11.5,true);
  s+=_txt(X(x2)+6,Y(y2)-14,"("+x2+", "+y2+")",11.5,true);
  s+=_txt((X(x1)+X(x2))/2-13,(Y(y1)+Y(y2))/2-10,"?",14,true);
  return s+'</svg>';
}
function m8TwoLaddersSVG(foot,h1,h2,lab1,lab2,labFoot){
  var sc=Math.min(118/Math.max(h2,1),185/Math.max(foot,1));
  var ox=92,oy=172,fx=ox+foot*sc,t1=oy-h1*sc,t2=oy-h2*sc;
  var s='<svg viewBox="0 0 330 200" width="330" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : deux échelles appuyées contre un mur à partir de la même distance">';
  s+='<line x1="'+ox+'" y1="'+fmt(t2-16,1)+'" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="3"/>';
  s+='<line x1="66" y1="'+oy+'" x2="'+fmt(fx+22,1)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polyline points="'+(ox+11)+','+oy+' '+(ox+11)+','+(oy-11)+' '+ox+','+(oy-11)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<line x1="'+ox+'" y1="'+fmt(t1,1)+'" x2="'+fmt(fx,1)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
  s+='<line x1="'+ox+'" y1="'+fmt(t2,1)+'" x2="'+fmt(fx,1)+'" y2="'+oy+'" stroke="'+FIG_ALT+'" stroke-width="2.2"/>';
  s+=_txt((ox+fx)/2+16,(t1+oy)/2+7,lab1,12.5,false);
  s+=_txt((ox+fx)/2+16,(t2+oy)/2-9,lab2,12.5,false);
  s+=_txt((ox+fx)/2,oy+17,labFoot,12.5,false);
  return s+'</svg>';
}
function m8BoxLabSVG(labL,labW,labH,open){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme droit à base rectangulaire">';
  s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+(open?"none":FIG_SHADE)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(!open){s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';}
  if(labL){s+=_txt(125,172,labL,13,false);}
  if(labH){s+=_txt(56,115,labH,13,false);}
  if(labW){s+=_txt(212,26,labW,13,false);}
  return s+'</svg>';
}
function m8CylLabSVG(labTop,labH,useD,open){
  var s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : cylindre droit">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+(open?"none":FIG_SHADE)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(labTop){
    if(useD){s+='<line x1="94" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';s+=_txt(150,30,labTop,13,false);}
    else{s+='<line x1="150" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';s+=_txt(178,40,labTop,13,false);}
  }
  if(labH){s+=_txt(224,104,labH,13,false);}
  return s+'</svg>';
}
function m8CylBaseSVG(labBase,labH){
  var s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : cylindre droit avec l’aire de sa base indiquée">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(labBase){s+=_txt(150,52,labBase,11,true);}
  if(labH){s+=_txt(224,104,labH,13,false);}
  return s+'</svg>';
}
function m8TriPrismLabSVG(labA,labB,labL){
  var s='<svg viewBox="0 0 310 190" width="310" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme droit à base triangulaire">';
  s+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  if(labB){s+=_txt(105,166,labB,13,false);}
  if(labA){s+=_txt(44,110,labA,13,false);}
  if(labL){s+=_txt(198,32,labL,13,false);}
  return s+'</svg>';
}
function m8PrismBaseSVG(kind,labBase,labH){
  if(kind==="cyl"){return m8CylBaseSVG(labBase,labH);}
  if(kind==="rect"){
    var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme droit avec l’aire de sa base indiquée">';
    s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){s+=_txt(150,56,labBase,11,true);}
    if(labH){s+=_txt(56,115,labH,13,false);}
    return s+'</svg>';
  }
  if(kind==="tri"){
    var t='<svg viewBox="0 0 310 190" width="310" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme droit à base triangulaire avec l’aire de sa base indiquée">';
    t+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    t+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){t+=_txt(182,94,labBase,11,true);}
    if(labH){t+=_txt(198,32,labH,13,false);}
    return t+'</svg>';
  }
  var g='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme droit avec l’aire de sa base indiquée">';
  g+='<polygon points="115,72 195,57 210,137 130,157" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<polygon points="70,44 150,29 165,109 85,129" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="115" y1="72" x2="70" y2="44" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="195" y1="57" x2="150" y2="29" stroke="'+FIG_INK+'" stroke-width="2"/>';
  g+='<line x1="210" y1="137" x2="165" y2="109" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(labBase){g+=_txt(163,108,labBase,11,true);}
  if(labH){g+=_txt(84,44,labH,13,false);}
  return g+'</svg>';
}
function m8NetAreaSVG(top,front,side){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : développement d’un prisme droit à base rectangulaire avec l’aire de chaque face indiquée">';
  s+='<rect x="110" y="60" width="70" height="46" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="40" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="180" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="110" y="14" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="110" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="180" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(145,83,top+" cm²",11,true);
  s+=_txt(145,37,front+" cm²",11,false);
  s+=_txt(145,129,front+" cm²",11,false);
  s+=_txt(75,83,side+" cm²",11,false);
  s+=_txt(215,83,side+" cm²",11,false);
  s+=_txt(215,129,top+" cm²",11,false);
  return s+'</svg>';
}
function m8NetPlainSVG(kind,labR){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : développement à plat">';
  if(kind==="rect"){
    s+='<rect x="110" y="60" width="70" height="46" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="40" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="14" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  } else if(kind==="tri"){
    s+='<rect x="30" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="96" y="70" width="66" height="44" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="162" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,70 162,70 129,30" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,114 162,114 129,154" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  } else if(kind==="cyl"){
    s+='<rect x="80" y="62" width="140" height="56" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="34" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="146" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  } else if(kind==="inctri"){
    s+='<rect x="30" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="96" y="70" width="66" height="44" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="162" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  } else {
    s+='<rect x="80" y="62" width="140" height="56" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="34" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    if(labR){s+='<line x1="150" y1="34" x2="176" y2="34" stroke="'+FIG_INK+'" stroke-width="1.4"/>';s+=_txt(198,30,labR,12,false);}
  }
  return s+'</svg>';
}
function m8LayersSVG(labBase,labH,n){
  var s='<svg viewBox="0 0 320 195" width="320" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : prisme formé de couches empilées">';
  s+='<polygon points="105,66 121,49 231,49 215,66" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=0;i<n;i++){var y=66+i*17;s+='<rect x="105" y="'+y+'" width="110" height="17" fill="'+(i%2?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';}
  if(labBase){s+=_txt(160,66+n*17+18,labBase,12,true);}
  if(labH){s+=_txt(252,66+n*17/2,labH,12.5,false);}
  return s+'</svg>';
}
function m8TwoBaseSVG(labP,labQ){
  var s='<svg viewBox="0 0 330 195" width="330" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : deux prismes de même hauteur et de bases différentes">';
  s+='<polygon points="34,78 48,61 102,61 88,78" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="34" y="78" width="54" height="72" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="88,78 102,61 102,133 88,150" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="168,78 182,61 290,61 276,78" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="168" y="78" width="108" height="72" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="276,78 290,61 290,133 276,150" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(68,40,"P",14,true);
  s+=_txt(229,40,"Q",14,true);
  if(labP){s+=_txt(68,168,labP,11.5,true);}
  if(labQ){s+=_txt(229,168,labQ,11.5,true);}
  return s+'</svg>';
}
function m8TanksSVG(sets,names){
  var s='<svg viewBox="0 0 330 180" width="330" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : quatre réservoirs avec leurs dimensions">';
  for(var i=0;i<4;i++){
    var ox=i*82+6;
    s+='<polygon points="'+(ox+8)+',70 '+(ox+20)+',54 '+(ox+72)+',54 '+(ox+60)+',70" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+='<rect x="'+(ox+8)+'" y="70" width="52" height="54" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+='<polygon points="'+(ox+60)+',70 '+(ox+72)+',54 '+(ox+72)+',108 '+(ox+60)+',124" fill="none" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+=_txt(ox+40,36,names[i],10.5,true);
    s+=_txt(ox+40,142,sets[i][0]+" × "+sets[i][1]+" × "+sets[i][2],9,false);
    s+=_txt(ox+40,158,"cm",9,false);
  }
  return s+'</svg>';
}
function m8PolyRowSVG(items){
  var cw=320/items.length;
  var s='<svg viewBox="0 0 320 125" width="320" height="125" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : polygones réguliers">';
  for(var i=0;i<items.length;i++){
    var n=items[i][0],cx=cw*i+cw/2,cy=55,R=Math.min(30,cw/2-9),pts=[];
    for(var k=0;k<n;k++){var t=-Math.PI/2+k*2*Math.PI/n;pts.push(fmt(cx+R*Math.cos(t),1)+","+fmt(cy+R*Math.sin(t),1));}
    s+='<polygon points="'+pts.join(" ")+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    if(items[i][1]){s+=_txt(cx,106,items[i][1],12,false);}
  }
  return s+'</svg>';
}
function m8NotchSquareSVG(){
  var s='<svg viewBox="0 0 280 170" width="280" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme : tuile carrée avec une encoche triangulaire coupée d’un côté et le même triangle ajouté au côté opposé">';
  s+='<polygon points="75,25 195,25 195,65 222,85 195,105 195,145 75,145 75,105 102,85 75,65" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  return s+'</svg>';
}

/* ----- bank-u1.js ----- */
// Math 8 (French) Unit 1 Square Roots and the Pythagorean Theorem question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 49 to 417).
// CRMARKS: u1-calc-approx=3
// CRMARKS: u1-diagonal-square=3
// CRMARKS: u1-hypotenuse=3
// CRMARKS: u1-ladder-context=2
// CRMARKS: u1-missing-leg=3
// CRMARKS: u1-square-plot-perimeter=2
// CRMARKS: u1-triple-find=2
/* Unit 1: Square Roots and the Pythagorean Theorem */
function u1d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u1nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<80){n=ri(lo,hi);t++;}if(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n=lo+1;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n){n++;}}return n;}
function u1r1(x){return Math.round(x*10)/10;}
function u1gridSVG(s){
  var cell=(s>10)?14:22,pad=26,W=s*cell+2*pad,H=s*cell+2*pad+8,out="";
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Région carrée de '+s+' unités sur '+s+' unités">';
  out+='<rect x="'+pad+'" y="'+pad+'" width="'+(s*cell)+'" height="'+(s*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<s;i++){out+='<line x1="'+(pad+i*cell)+'" y1="'+pad+'" x2="'+(pad+i*cell)+'" y2="'+(pad+s*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';out+='<line x1="'+pad+'" y1="'+(pad+i*cell)+'" x2="'+(pad+s*cell)+'" y2="'+(pad+i*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';}
  out+=_txt(pad+s*cell/2,pad-12,s+" unités",12,true);
  out+=_txt(10,pad+s*cell/2,s+"",12,true);
  return out+'</svg>';
}
function u1numLineSVG(lo,hi){
  var W=320,H=70,x0=35,x1=285,out="";
  function X(v){return x0+(v-lo)/(hi-lo)*(x1-x0);}
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Droite numérique de '+lo+' à '+hi+'">';
  out+='<line x1="'+x0+'" y1="38" x2="'+x1+'" y2="38" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var v=lo;v<=hi;v++){out+='<line x1="'+X(v)+'" y1="32" x2="'+X(v)+'" y2="44" stroke="'+FIG_INK+'" stroke-width="1.6"/>';out+=_txt(X(v),58,String(v),12,false);}
  return out+'</svg>';
}
function u1triFig(hyp,legV,base,labHyp,labV,labB){
  return triSVG(hyp,legV,base,{L:["A","B","C"],side:[labHyp,labV,labB]});
}

E("u1-square-of-number", 1, ["5.3"], 1, "gen", function(){
  var n=ri(3,25); var sq=n*n;
  var ds=u1d3(sq,[2*n,sq+n,sq-n,(n+1)*(n+1),(n-1)*(n-1),sq+10]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Ce n'est pas "+n+" fois "+n+" : multiplie le nombre par lui-même."};});
  var mode=pick(["plain","tile","product"]);
  var prompt=(mode==="plain")?("Que vaut \\("+n+"^{2}\\) ?"):((mode==="tile")?("Un carreau carré a des côtés de "+n+" cm. Quelle est l'aire du carreau, en centimètres carrés ?"):("Que vaut \\("+n+" \\times "+n+"\\) ?"));
  return mcq(prompt, {t:String(sq), fb:"Oui : "+n+" fois "+n+" égale "+sq+"."}, opts,
    "Mettre au carré veut dire multiplier le nombre par lui-même : \\[ \\begin{aligned} "+n+"^{2} &= "+n+" \\times "+n+" \\\\ &= "+sq+" \\end{aligned} \\] Le carré est <b>"+sq+"</b>.",
    {n:n, mode:mode});
}, ["Mettre un nombre au carré veut dire le multiplier par lui-même.", "Écris le nombre fois lui-même et multiplie."]);

E("u1-sqrt-perfect", 1, ["5.2"], 1, "gen", function(){
  var r=ri(2,20); var n=r*r;
  var ds=u1d3(r,[r+1,r-1,r+2,Math.max(r-2,1),r+3]);
  var opts=ds.map(function(d){return {t:String(d), fb:fmtD(d)+" au carré donne "+(d*d)+", pas "+n+" : essaie une autre valeur."};});
  var mode=pick(["plain","area","pairs"]);
  var prompt=(mode==="plain")?("Que vaut \\(\\sqrt{"+n+"}\\) ?"):((mode==="area")?("Un carré a une aire de "+n+" centimètres carrés. Quelle est la longueur de son côté, en centimètres ?"):("Un nombre multiplié par lui-même donne "+n+". Quel est ce nombre ?"));
  var q=mcq(prompt, {t:String(r), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
    "Trouve le nombre qui, multiplié par lui-même, donne "+n+" : \\[ \\begin{aligned} "+r+" \\times "+r+" &= "+n+" \\\\ \\sqrt{"+n+"} &= "+r+" \\end{aligned} \\] La racine carrée est <b>"+r+"</b>.",
    {r:r, n:n, mode:mode});
  q.figure=u1gridSVG(r);
  return q;
}, ["Pense au nombre qui, multiplié par lui-même, donne la valeur sous le signe de racine.", "Essaie les petits carrés dans l'ordre jusqu'à ce qu'un d'eux égale le nombre montré."]);

E("u1-perfect-square-region", 1, ["3.19"], 1, "gen", function(){
  var s=ri(2,14); var area=s*s;
  var ds=u1d3(area,[2*s,area+s,area-s,(s+1)*(s+1)]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Compte les rangées et les colonnes : la région a "+s+" rangées de "+s+" carrés."};});
  var ctx=pick(["une région carrée formée de petits carrés","un patio carré formé de pavés dans une grille","un bloc de courtepointe carré cousu à partir de petits carrés","un parterre de jardin carré marqué dans une grille"]);
  var q=mcq("Le diagramme montre "+ctx+". Combien de petits carrés y a-t-il dans la région ?", {t:String(area), fb:"Oui : "+s+" rangées avec "+s+" carrés dans chaque rangée donnent "+area+"."}, opts,
    "La région a "+s+" carrés de chaque côté, donc c'est un tableau carré : \\[ \\begin{aligned} \\text{total} &= "+s+" \\times "+s+" \\\\ &= "+area+" \\end{aligned} \\] La région contient <b>"+area+" petits carrés</b>, donc "+area+" est le carré parfait \\("+s+"^{2}\\).",
    {s:s});
  q.figure=u1gridSVG(s);
  return q;
}, ["Une région carrée a le même nombre de carrés de chaque côté.", "Compte les carrés le long d'un côté, puis multiplie ce nombre par lui-même."]);

E("u1-is-perfect-square", 1, ["3.20"], 1, "gen", function(){
  if(pick(["yes","no"])==="yes"){
    var r=ri(4,16); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" est entre deux carrés voisins, donc aucun nombre entier mis au carré ne le donne."};});
    return mcq("Quel nombre est un carré parfait ?", {t:String(n), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
      "Une seule valeur est un nombre entier fois lui-même : \\("+r+" \\times "+r+" = "+n+"\\). Le carré parfait est <b>"+n+"</b>.",
      {mode:"yes", n:n});
  }
  var k=ri(4,15); var n=k*k+ri(1,2*k-1);
  return mcq("Quelle affirmation sur le nombre "+n+" est correcte ?",
    {t:n+" se trouve entre les carrés "+(k*k)+" et "+((k+1)*(k+1))+", donc ce n'est pas un carré parfait", fb:"Oui : "+n+" est entre deux carrés voisins, donc aucun nombre entier ne le donne au carré."},
    [{t:n+" est un carré parfait, car il est proche du carré "+(k*k)+", qui est juste en dessous", fb:"Proche n'est pas égal : un carré parfait doit être un nombre entier multiplié par lui-même, exactement."},
     {t:n+" est un carré parfait, car il se termine par un chiffre que les carrés peuvent avoir", fb:"Le dernier chiffre seul ne peut pas le prouver : compare avec les carrés voisins."},
     {t:n+" se trouve entre les carrés "+((k+1)*(k+1))+" et "+((k+2)*(k+2))+", ce n'est pas un carré parfait", fb:"Vérifie l'encadrement : "+n+" est plus petit que "+((k+1)*(k+1))+", donc cette paire est trop haute."}],
    "Les carrés près de "+n+" sont \\("+k+"^{2} = "+(k*k)+"\\) et \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). Comme "+n+" se trouve entre eux, aucun nombre entier ne le donne au carré. L'affirmation correcte est <b>"+n+" n'est pas un carré parfait</b>.",
    {mode:"no", n:n});
}, ["Un carré parfait est un nombre entier multiplié par lui-même.", "Écris les carrés près de chaque valeur et vérifie quelles valeurs sont dans la liste."]);

E("u1-factors-root", 1, ["5.1"], 1, "gen", function(){
  var r=ri(4,16); var n=r*r;
  var facs=[]; for(var d=1;d<=n;d++){ if(n%d===0){facs.push(d);} }
  var others=facs.filter(function(d){return d!==r;});
  var wrong=pick(others);
  var opts=[
    {t:String(wrong), fb:wrong+" est un facteur, mais "+wrong+" fois "+wrong+" n'est pas "+n+", donc ce n'est pas la racine carrée."},
    {t:String(n), fb:n+" est un facteur, mais une racine carrée doit se multiplier par elle-même pour donner "+n+"."},
    {t:String(2*r===n?n+1:2*r), fb:"Vérifie les paires de facteurs : une racine carrée forme une paire avec elle-même."}
  ];
  var seenOpts={}; var clean=[]; opts.forEach(function(o){if(o.t!==String(r)&&!seenOpts[o.t]){seenOpts[o.t]=1;clean.push(o);}});
  while(clean.length<3){var cand=String(ri(2,20)); if(cand!==String(r)&&!seenOpts[cand]){seenOpts[cand]=1;clean.push({t:cand, fb:"Cette valeur ne forme pas une paire avec elle-même pour donner "+n+"."});}}
  var fmode=pick(["pairs","which","area","def"]);
  var fprompt=(fmode==="pairs")?(n+" a des paires de facteurs qui se multiplient pour donner "+n+". Quel facteur est la racine carrée de "+n+" ?"):((fmode==="which")?("Quel facteur de "+n+" est sa racine carrée ?"):((fmode==="area")?("Un carré d'aire "+n+" a des longueurs de côté entières parmi les facteurs de "+n+". Quel facteur donne la longueur du côté ?"):("Les facteurs de "+n+" peuvent être écrits en paires. Quel facteur est la racine carrée de "+n+" ?")));
  return mcq(fprompt, {t:String(r), fb:"Oui : "+r+" forme une paire avec lui-même, car "+r+" fois "+r+" égale "+n+"."}, clean.slice(0,3),
    "Écris les paires de facteurs de "+n+". Chaque paire a deux facteurs différents, sauf une : \\("+r+" \\times "+r+" = "+n+"\\). Une racine carrée est le facteur qui forme une paire avec lui-même. La racine carrée est <b>"+r+"</b>.",
    {r:r, n:n});
}, ["Une racine carrée est le facteur qui se multiplie par lui-même pour donner le nombre.", "Écris les paires de facteurs et trouve la paire où les deux facteurs sont les mêmes."]);

E("u1-estimate-between", 1, ["6.30"], 1, "gen", function(){
  var n=u1nonSquare(10,200); var k=Math.floor(Math.sqrt(n));
  var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
  var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" et "+pr[1], fb:"Mets les deux nombres au carré : "+n+" ne se trouve pas entre leurs carrés."};});
  var q=mcq("Entre quels deux nombres entiers se trouve la racine carrée de "+n+" ?", {t:k+" et "+(k+1), fb:"Oui : "+n+" se trouve entre "+(k*k)+" et "+((k+1)*(k+1))+"."}, opts,
    "Utilise les carrés parfaits de chaque côté comme points de repère : \\[ \\begin{aligned} "+k+"^{2} &= "+(k*k)+" \\\\ "+(k+1)+"^{2} &= "+((k+1)*(k+1))+" \\end{aligned} \\] Comme "+(k*k)+" est plus petit que "+n+", qui est plus petit que "+((k+1)*(k+1))+", la racine se trouve entre <b>"+k+" et "+(k+1)+"</b>.",
    {n:n, k:k});
  q.figure=u1numLineSVG(Math.max(k-1,0),k+2);
  return q;
}, ["Trouve les carrés parfaits juste en dessous et juste au-dessus du nombre.", "Mets les nombres entiers au carré dans l'ordre jusqu'à ce que leurs carrés encadrent le nombre."]);

E("u1-root-between-numbers", 1, ["6.31"], 1, "gen", function(){
  var a=ri(2,14); var b=a+ri(1,2);
  var m=a*a+ri(1,(b*b-a*a)-1);
  var opts=[{t:String(a*a), fb:"Sa racine carrée est exactement "+a+", une borne, pas une valeur entre les deux."},
            {t:String(b*b), fb:"Sa racine carrée est exactement "+b+", une borne, pas une valeur entre les deux."},
            {t:String(b*b+ri(2,15)), fb:"Sa racine carrée est plus grande que "+b+" : mets les bornes au carré pour vérifier."}];
  return mcq("Quel nombre a une racine carrée entre "+a+" et "+b+" ?", {t:String(m), fb:"Oui : "+m+" se trouve entre "+(a*a)+" et "+(b*b)+"."}, opts,
    "Mets les bornes au carré pour changer la question en intervalle : \\[ \\begin{aligned} "+a+"^{2} &= "+(a*a)+" \\\\ "+b+"^{2} &= "+(b*b)+" \\end{aligned} \\] Seul "+m+" se trouve entre ces carrés. Le nombre est <b>"+m+"</b>.",
    {a:a, b:b, m:m});
}, ["Mets les deux nombres donnés au carré pour obtenir un intervalle pour le nombre lui-même.", "Vérifie quel candidat se trouve entre les deux carrés."]);

E("u1-calc-approx", 1, ["6.32"], 1, "gen", function(){
  var n=u1nonSquare(11,300);
  var ans=u1r1(Math.sqrt(n));
  return numq("Utilise une calculatrice pour trouver \\(\\sqrt{"+n+"}\\), avec une décimale.", ans, 0.05,
    "Une calculatrice donne un long nombre décimal : \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmtD(Math.sqrt(n))+" \\\\ &\\approx "+fmtD(ans)+" \\end{aligned} \\] Avec une décimale, la racine carrée est <b>"+fmtD(ans)+"</b>.",
    {n:n});
}, ["Entre le nombre et utilise la touche racine carrée d'une calculatrice.", "Lis l'écran, puis arrondis à une décimale."]);

E("u1-why-approx", 1, ["6.33"], 1, "var", varset([
  function(){
    return mcq("Une calculatrice montre \\(\\sqrt{5} \\approx 2,2360679\\). Pourquoi la valeur à l'écran est-elle une approximation ?",
      {t:"Mettre 2,2360679 au carré ne donne pas exactement 5, seulement très proche de 5", fb:"Exact : l'affichage est arrondi, donc son carré n'atteint pas tout à fait 5."},
      [{t:"La calculatrice a fait une erreur d'arithmétique en trouvant la racine", fb:"La calculatrice fonctionne bien : la limite est la taille de l'écran."},
       {t:"La valeur est exacte parce qu'elle montre sept décimales à l'écran", fb:"Beaucoup de décimales veut encore dire arrondi : les chiffres continuent après."},
       {t:"Le nombre 5 n'a pas de racine carrée, donc l'écran montre une estimation approximative", fb:"5 a bien une racine carrée : son nombre décimal ne se termine simplement jamais."}],
      "Mettre la valeur de l'écran au carré donne un résultat proche de 5, mais pas égal à 5, parce que la vraie valeur continue après l'écran. La valeur à l'écran est <b>une approximation parce qu'elle est arrondie</b>.",
      {mode:"sqrt5"});
  },
  function(){
    return mcq("Un élève dit que la valeur exacte de \\(\\sqrt{11}\\) est 3,31662479, la valeur à l'écran de la calculatrice. Pourquoi l'élève a-t-il tort ?",
      {t:"La vraie valeur a des chiffres décimaux qui continuent après les chiffres montrés", fb:"Exact : l'écran montre seulement les premiers chiffres, arrondis."},
      [{t:"La calculatrice a arrondi le dernier chiffre dans le mauvais sens à l'écran de la calculatrice", fb:"Les deux sens d'arrondi coupent quand même la valeur : c'est le point."},
       {t:"La valeur exacte de la racine est 3,3, avec une seule décimale", fb:"Les racines ne s'arrêtent pas à une décimale : celle-ci continue."},
       {t:"L'élève a copié les chiffres de l'écran dans le mauvais ordre sur sa feuille", fb:"Les chiffres ont été bien copiés : la valeur elle-même est incomplète."}],
      "Le nombre décimal de \\(\\sqrt{11}\\) ne se termine jamais, donc un écran peut montrer seulement ses premiers chiffres, arrondis. L'élève a tort parce que <b>la vraie valeur continue après l'écran</b>.",
      {mode:"sqrt11"});
  },
  function(){
    return mcq("Pour un projet, un élève utilise 4,47 comme valeur de \\(\\sqrt{20}\\). Pourquoi 4,47 est-il appelé une approximation ?",
      {t:"C'est la vraie valeur arrondie à deux décimales, pas la valeur complète", fb:"Exact : 4,47 au carré donne 19,9809, proche de 20 mais pas égal."},
      [{t:"C'est une approximation parce qu'elle a été trouvée avec une calculatrice en classe", fb:"L'outil ne le décide pas : c'est l'arrondi qui compte."},
       {t:"Elle est exacte, car deux décimales suffisent pour le projet", fb:"Suffisant pour un projet peut quand même être arrondi plutôt qu'exact."},
       {t:"C'est une approximation parce que 20 n'a pas de racine carrée du tout", fb:"20 a bien une racine : elle ne se termine simplement jamais et ne se répète pas."}],
      "\\(4,47 \\times 4,47 = 19,9809\\), ce qui est proche de 20 mais pas égal à 20. La valeur 4,47 est <b>une approximation parce que c'est la vraie racine arrondie à deux décimales</b>.",
      {mode:"sqrt20"});
  }
]), ["Demande-toi si mettre la valeur montrée au carré redonne exactement le nombre de départ.", "Mets la valeur montrée au carré et compare-la au nombre sous le signe de racine."]);

E("u1-pythag-model", 1, ["9.1"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  if(pick(["ab","ba"])==="ba"){ var tmp=tr[0]; tr[0]=tr[1]; tr[1]=tmp; }
  var a=tr[0], b=tr[1], c=tr[2];
  var punit=pick(["cm","m"]);
  var correct="\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)";
  var opts=[
    {t:"\\("+a+" + "+b+" = "+c+"\\)", fb:"Le théorème utilise les carrés des côtés, pas les côtés eux-mêmes."},
    {t:"\\("+a+"^{2} + "+c+"^{2} = "+b+"^{2}\\)", fb:"Le carré de l'hypoténuse est seul : ici "+c+" est l'hypoténuse."},
    {t:"\\("+c+"^{2} - "+a+"^{2} = "+a+"^{2}\\)", fb:"Les deux cathètes sont mises au carré et additionnées : vérifie quels côtés sont les cathètes."}
  ];
  var q=mcq("Un triangle rectangle a des cathètes de "+a+" "+punit+" et "+b+" "+punit+" et une hypoténuse de "+c+" "+punit+", comme montré. Quelle équation modélise le théorème de Pythagore pour ce triangle ?", {t:correct, fb:"Oui : les carrés des deux cathètes s'additionnent pour donner le carré de l'hypoténuse."}, opts,
    "Le théorème dit que les carrés des cathètes s'additionnent pour donner le carré de l'hypoténuse : \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ &= "+c+"^{2} \\end{aligned} \\] L'équation qui modélise est <b>\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,c+" "+punit,b+" "+punit,a+" "+punit);
  return q;
}, ["L'hypoténuse est le côté le plus long, en face de l'angle droit.", "Mets chaque cathète au carré, additionne-les, et mets la somme égale au carré de l'hypoténuse."]);

E("u1-hypotenuse", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var unit=pick(["cm","m"]);
  var q=numq("Un triangle rectangle a des cathètes de "+a+" "+unit+" et "+b+" "+unit+", comme montré dans le diagramme. Trouve la longueur de l'hypoténuse, en "+unit+".", c, 0.01,
    "Utilise le théorème de Pythagore, avec l'hypoténuse comme inconnue : \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] L'hypoténuse est <b>"+c+" "+unit+"</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,"?",b+" "+unit,a+" "+unit);
  return q;
}, ["L'hypoténuse est en face de l'angle droit et se trouve à partir des deux cathètes.", "Mets les deux cathètes au carré et additionne, puis prends la racine carrée de la somme."]);

E("u1-missing-leg", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var known=pick(["a","b"]); var knownLeg=(known==="a")?a:b; var unknown=(known==="a")?b:a;
  var unit=pick(["cm","m"]);
  var q=numq("Un triangle rectangle a une hypoténuse de "+c+" "+unit+" et une cathète de "+knownLeg+" "+unit+", comme montré dans le diagramme. Trouve la longueur de l'autre cathète, en "+unit+".", unknown, 0.01,
    "Réarrange le théorème pour trouver la cathète manquante : \\[ \\begin{aligned} b^{2} &= "+c+"^{2} - "+knownLeg+"^{2} \\\\ &= "+(c*c)+" - "+(knownLeg*knownLeg)+" \\\\ &= "+(unknown*unknown)+" \\\\ b &= "+unknown+" \\end{aligned} \\] L'autre cathète est <b>"+unknown+" "+unit+"</b>.",
    {a:a, b:b, c:c, known:known});
  if(known==="a"){ q.figure=u1triFig(c,b,a,c+" "+unit,"?",a+" "+unit); }
  else { q.figure=u1triFig(c,b,a,c+" "+unit,b+" "+unit,"?"); }
  return q;
}, ["Une cathète manquante se trouve en soustrayant les carrés, pas en les additionnant.", "Mets l'hypoténuse au carré, soustrais le carré de la cathète connue, puis prends la racine carrée."]);

E("u1-is-right", 1, ["9.13"], 1, "gen", function(){
  var isRight=pick([true,false]);
  var a,b,c;
  if(isRight){ var tr=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]]); a=tr[0]; b=tr[1]; c=tr[2]; }
  else { a=ri(3,9); b=ri(4,12); c=ri(b+1,17); var t=0; while(a*a+b*b===c*c&&t<40){c++;t++;} }
  var sum=a*a+b*b, csq=c*c;
  var ansTxt=isRight?"Oui, c'est un triangle rectangle":"Non, ce n'est pas un triangle rectangle";
  var opts=isRight?[
    {t:"Non, ce n'est pas un triangle rectangle", fb:"Vérifie les sommes : les carrés des deux côtés les plus courts s'additionnent pour donner le carré du côté le plus long."},
    {t:"On ne peut pas le décider", fb:"Les longueurs des côtés suffisent : le théorème donne un test oui ou non."},
    {t:"Oui, si le long côté est en bas", fb:"La position ne compte pas : seules les longueurs des côtés décident."}
  ]:[
    {t:"Oui, c'est un triangle rectangle", fb:"Vérifie les sommes : "+(a*a)+" + "+(b*b)+" donne "+sum+", ce qui n'égale pas "+csq+"."},
    {t:"On ne peut pas le décider", fb:"Les longueurs des côtés suffisent : le théorème donne un test oui ou non."},
    {t:"Oui, car les côtés approchent un triplet", fb:"Proche ne suffit pas : les carrés doivent correspondre exactement."}
  ];
  var q=mcq("Un triangle a des côtés de "+a+" cm, "+b+" cm et "+c+" cm, comme montré. Est-ce un triangle rectangle ?", {t:ansTxt, fb:isRight?"Oui : "+(a*a)+" + "+(b*b)+" égale "+csq+".":"Exact : "+(a*a)+" + "+(b*b)+" donne "+sum+", pas "+csq+"."}, opts,
    "Teste le côté le plus long contre les deux autres : \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+sum+" \\\\ "+c+"^{2} &= "+csq+" \\end{aligned} \\] "+(isRight?"Les deux valeurs sont égales, donc le triangle <b>est un triangle rectangle</b>.":"Les deux valeurs sont différentes, donc le triangle <b>n'est pas un triangle rectangle</b>."),
    {a:a, b:b, c:c, isRight:isRight});
  q.figure=u1triFig(c,b,a,c+" cm",b+" cm",a+" cm");
  return q;
}, ["Mets les deux côtés les plus courts au carré et compare leur somme avec le carré du côté le plus long.", "Additionne d'abord les carrés des deux côtés les plus courts."]);

E("u1-only-right", 1, ["9.2"], 1, "var", varset([
  function(){
    var q=mcq("Un triangle a des côtés de 4 cm, 6 cm et 8 cm. Un élève utilise \\(4^{2} + 6^{2} = 8^{2}\\) pour trouver un côté et obtient une mauvaise réponse. Pourquoi la méthode a-t-elle échoué ?",
      {t:"Le théorème fonctionne seulement pour les triangles rectangles, et ce triangle n'est pas rectangle", fb:"Exact : 16 + 36 donne 52, pas 64, donc le triangle n'a pas d'angle droit."},
      [{t:"L'élève a additionné les côtés dans le mauvais ordre pour appliquer le théorème de Pythagore à ce triangle", fb:"L'ordre de l'addition ne compte pas ici : le triangle lui-même est le problème."},
       {t:"Le théorème exige des côtés mesurés en mètres, pas en centimètres, pour fonctionner dans ce cas", fb:"Les unités ne limitent pas le théorème : la forme du triangle le fait."},
       {t:"L'élève aurait dû utiliser les deux côtés les plus longs comme cathètes", fb:"Échanger les côtés ne peut pas le corriger : le triangle n'est pas rectangle."}],
      "\\(4^{2} + 6^{2} = 52\\), alors que \\(8^{2} = 64\\). Les valeurs sont différentes, donc le triangle n'a pas d'angle droit, et le théorème ne s'applique pas. La méthode a échoué parce que <b>le théorème fonctionne seulement pour les triangles rectangles</b>.",
      {mode:"not-right"}); q.figure=triSVG(8,6,4,{L:["A","B","C"],side:["8 cm","6 cm","4 cm"]}); return q;
  },
  function(){
    return mcq("Quelle affirmation sur le théorème de Pythagore est correcte ?",
      {t:"Il relie les côtés des triangles rectangles seulement", fb:"Exact : la relation est vraie exactement quand le triangle a un angle droit."},
      [{t:"Il relie les côtés de chaque triangle, rectangle ou non", fb:"Teste un triangle 2, 3, 4 : 4 + 9 n'est pas 16, donc il échoue là."},
       {t:"Il relie les côtés des triangles équilatéraux seulement", fb:"Un triangle équilatéral n'a pas d'angle droit, donc le théorème ne peut pas s'appliquer."},
       {t:"Il relie les côtés des triangles avec l'angle droit en haut", fb:"La position ne compte pas : avoir un angle droit est ce qui compte."}],
      "Pour tout triangle sans angle droit, les carrés ne correspondent pas, comme \\(2^{2} + 3^{2} = 13 \\ne 16 = 4^{2}\\) le montre. L'affirmation correcte est <b>il relie les côtés des triangles rectangles seulement</b>.",
      {mode:"statement"});
  },
  function(){
    var q=mcq("Un triangle a des côtés de 5 cm, 5 cm et 9 cm. Un élève lui applique le test des carrés. Que montre le test ?",
      {t:"Le test montre qu'il n'est pas rectangle, car 25 + 25 n'égale pas 81", fb:"Exact : le test lui-même montre que le triangle n'a pas d'angle droit."},
      [{t:"Le théorème ne peut pas servir, car deux côtés ont la même longueur", fb:"Des cathètes égales sont possibles dans un triangle rectangle : les carrés sont le test."},
       {t:"Le théorème ne peut pas servir, car les côtés sont des nombres impairs", fb:"Les côtés impairs sont possibles : 9, 12, 15 utilise des côtés impairs et est rectangle."},
       {t:"Le théorème ne peut pas servir, car le triangle est trop grand", fb:"La taille ne compte pas : seule la relation des carrés compte."}],
      "\\(5^{2} + 5^{2} = 50\\), alors que \\(9^{2} = 81\\). Comme les valeurs sont différentes, le triangle n'est pas rectangle, donc <b>le théorème ne s'applique pas à lui comme triangle rectangle</b>.",
      {mode:"isosceles"}); q.figure=triSVG(9,5,5,{L:["A","B","C"],side:["9 cm","5 cm","5 cm"]}); return q;
  }
]), ["Teste d'abord la relation des carrés avant de faire confiance au théorème.", "Mets les deux côtés les plus courts au carré et compare avec le carré du côté le plus long."]);

E("u1-triple-find", 1, ["9.14"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var k=ri(2,5); var a=base[0]*k, b=base[1]*k, c=base[2]*k;
  var miss=pick(["a","b","c"]); var ans=(miss==="a")?a:(miss==="b")?b:c;
  var givenTxt=(miss==="a")?("une cathète de "+b+" cm et une hypoténuse de "+c+" cm"):((miss==="b")?("une cathète de "+a+" cm et une hypoténuse de "+c+" cm"):("des cathètes de "+a+" cm et "+b+" cm"));
  var q=numq("Un triangle rectangle est une copie à l'échelle du triplet "+base[0]+", "+base[1]+", "+base[2]+", avec un facteur d'échelle de "+k+". Il a "+givenTxt+". Trouve la longueur du côté manquant, en centimètres.", ans, 0.01,
    "Mets chaque côté du triplet à l'échelle par "+k+" : \\[ \\begin{aligned} "+base[0]+" \\times "+k+" &= "+a+" \\\\ "+base[1]+" \\times "+k+" &= "+b+" \\\\ "+base[2]+" \\times "+k+" &= "+c+" \\end{aligned} \\] Le côté manquant est <b>"+ans+" cm</b>.",
    {base:base, k:k, miss:miss}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[(miss==="c"?"?":c+" cm"),(miss==="b"?"?":b+" cm"),(miss==="a"?"?":a+" cm")]}); return q;
}, ["Mettre un triplet à l'échelle par le même facteur garde un triplet.", "Multiplie chaque côté du triplet de base par le facteur d'échelle."]);

E("u1-ladder-context", 1, ["9.12"], 1, "gen", function(){
  var mode=pick(["reach","distance","foot"]);
  if(mode==="reach"){
    var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
    var foot=tr[0], height=tr[1], lad=tr[2];
    var place=pick(["à St. John's","à Gander","à Corner Brook","à Clarenville"]);
    var q=numq("Une échelle de "+lad+" m de long est appuyée contre un mur "+place+". Son pied est à "+foot+" m du mur, et le mur rencontre le sol à angle droit. À quelle hauteur sur le mur l'échelle arrive-t-elle, en mètres ?", height, 0.01,
      "L'échelle est l'hypoténuse : \\[ \\begin{aligned} h^{2} &= "+lad+"^{2} - "+foot+"^{2} \\\\ &= "+(lad*lad)+" - "+(foot*foot)+" \\\\ &= "+(height*height)+" \\\\ h &= "+height+" \\end{aligned} \\] L'échelle arrive à <b>"+height+" m</b> sur le mur.",
      {mode:"reach", foot:foot, height:height, lad:lad});
    q.figure=u1triFig(lad,height,foot,lad+" m",height+" m",foot+" m");
    return q;
  }
  if(mode==="foot"){
    var base3=pick([[3,4,5],[5,12,13],[8,15,17]]);
    var k3=ri(1,4); var ft=base3[0]*k3, ht=base3[1]*k3, ld=base3[2]*k3;
    var q3=numq("Un câble de soutien de "+ld+" m de long va du haut d'un poteau à un point sur le sol plat. Le poteau mesure "+ht+" m de haut, et le poteau rencontre le sol à angle droit. À quelle distance de la base du poteau le câble est-il ancré, en mètres ?", ft, 0.01,
      "Le câble est l'hypoténuse : \\[ \\begin{aligned} f^{2} &= "+ld+"^{2} - "+ht+"^{2} \\\\ &= "+(ld*ld)+" - "+(ht*ht)+" \\\\ &= "+(ft*ft)+" \\\\ f &= "+ft+" \\end{aligned} \\] L'ancrage est à <b>"+ft+" m</b> de la base.",
      {mode:"foot", ft:ft, ht:ht, ld:ld});
    q3.figure=u1triFig(ld,ht,ft,ld+" m",ht+" m","?");
    return q3;
  }
  var tr2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var sc=ri(1,4); var east=tr2[0]*sc, north=tr2[1]*sc, hyp=tr2[2]*sc;
  var q2=numq("Un quai de traversier se trouve à "+east+" km à l'est et "+north+" km au nord d'un port, en ligne droite sur l'eau libre, à angle droit avec les deux parties du trajet. Quelle est la distance en ligne droite du port au quai, en kilomètres ?", hyp, 0.01,
    "La ligne droite est l'hypoténuse : \\[ \\begin{aligned} d^{2} &= "+east+"^{2} + "+north+"^{2} \\\\ &= "+(east*east)+" + "+(north*north)+" \\\\ &= "+(hyp*hyp)+" \\\\ d &= "+hyp+" \\end{aligned} \\] La distance en ligne droite est <b>"+hyp+" km</b>.",
    {mode:"distance", east:east, north:north, hyp:hyp});
  q2.figure=u1triFig(hyp,north,east,"?",north+" km",east+" km");
  return q2;
}, ["Dessine la situation comme un triangle rectangle et marque l'hypoténuse.", "Décide si l'inconnue est une cathète (soustrais les carrés) ou l'hypoténuse (additionne les carrés)."]);

E("u1-right-test-decide", 1, ["9.13"], 3, "gen", function(){
  var mode=pick(["close-call","claim","swap"]);
  if(mode==="swap"){
    var tb=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var ks=ri(1,4); var sa=tb[0]*ks, sb=tb[1]*ks, sc2=tb[2]*ks;
    var optsS=[{t:"Oui, car le long côté a été mis au carré en premier", fb:"L'ordre d'écriture ne compte pas : ce qui compte est que la somme correspond."},
               {t:"Non, les côtés doivent différer", fb:"Les cathètes peuvent être égales dans certains triangles rectangles, et ici le test des carrés réussit."},
               {t:"Non, car un triplet mis à l'échelle ne compte pas", fb:"Mettre un triplet à l'échelle par "+ks+" garde la relation des carrés vraie."}];
    var sunit=pick(["cm","m"]);
    var q=mcq("Un triangle a des côtés de "+sa+" "+sunit+", "+sb+" "+sunit+" et "+sc2+" "+sunit+". Un élève le teste en calculant \\("+sb+"^{2} + "+sa+"^{2}\\) et en le comparant avec \\("+sc2+"^{2}\\). Le triangle est-il rectangle ?", {t:"Oui, c'est un triangle rectangle", fb:"Exact : "+(sa*sa)+" + "+(sb*sb)+" égale "+(sc2*sc2)+"."}, optsS,
      "Additionne les carrés des deux côtés les plus courts : \\[ \\begin{aligned} "+sa+"^{2} + "+sb+"^{2} &= "+(sa*sa+sb*sb)+" \\\\ "+sc2+"^{2} &= "+(sc2*sc2)+" \\end{aligned} \\] Les valeurs correspondent, donc le triangle <b>est un triangle rectangle</b>.",
      {mode:"swap", a:sa, b:sb, c:sc2}); q.figure=triSVG(sc2,sb,sa,{L:["A","B","C"],side:[sc2+" "+sunit,sb+" "+sunit,sa+" "+sunit]}); return q;
  }
  if(mode==="close-call"){
    var tr=pick([[6,8,10],[9,12,15],[12,16,20],[5,12,13],[8,15,17],[20,21,29]]);
    var a=tr[0], b=tr[1], c=tr[2]+pick([-1,1]);
    if(c<=b){c=tr[2]+1;}
    var isR=(a*a+b*b===c*c);
    var ansTxt=isR?"Oui, il est rectangle":"Non, il n'est pas rectangle";
    var other=isR?"Non, il n'est pas rectangle":"Oui, il est rectangle";
    var opts=[{t:other, fb:"Calcule les deux côtés : "+(a*a)+" + "+(b*b)+" donne "+(a*a+b*b)+" et "+c+" au carré donne "+(c*c)+"."},
              {t:"Seulement avec une marque d'angle droit", fb:"Les longueurs seules décident : le test des carrés n'a pas besoin d'une marque de dessin."},
              {t:"On ne peut pas décider, presque un triplet", fb:"Presque peut se décider : les carrés correspondent exactement ou non."}];
    var cunit=pick(["m","cm"]);
    var q=mcq("Un triangle a des côtés de "+a+" "+cunit+", "+b+" "+cunit+" et "+c+" "+cunit+". Un camarade dit qu'il doit être rectangle parce que ses côtés sont proches d'un triplet connu. Décide si c'est un triangle rectangle.", {t:ansTxt, fb:"Exact : "+(a*a)+" + "+(b*b)+" donne "+(a*a+b*b)+", et "+c+" au carré donne "+(c*c)+"."}, opts,
      "Applique le test exactement : \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a+b*b)+" \\\\ "+c+"^{2} &= "+(c*c)+" \\end{aligned} \\] "+(isR?"Les valeurs correspondent, donc c'est <b>un triangle rectangle</b>.":"Les valeurs ne correspondent pas, donc ce n'est <b>pas un triangle rectangle</b>, même s'il est proche d'un triplet."),
      {mode:"close-call", a:a, b:b, c:c}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[c+" "+cunit,b+" "+cunit,a+" "+cunit]}); return q;
  }
  var t2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var kk2=ri(1,4); var a2=t2[0]*kk2, b2=t2[1]*kk2, c2=t2[2]*kk2;
  var opts2=[{t:"L'affirmation est fausse : le côté le plus long doit être mis au carré tout seul dans le test complet du théorème", fb:"Mettre un côté plus court au carré seul ne prouve rien sur le triangle."},
             {t:"L'affirmation est fausse : les côtés doivent être additionnés avant d'être mis au carré dans le test du théorème", fb:"Additionner d'abord donne une valeur différente, pas le test du théorème."},
             {t:"L'affirmation est juste : tout carré qui correspond prouve que le triangle a un angle droit dans ce test du théorème", fb:"Un seul carré qui correspond n'est pas le test : la somme doit correspondre."}];
  var q=mcq("Pour tester si un triangle de côtés "+a2+", "+b2+" et "+c2+" est rectangle, un élève vérifie seulement que \\("+b2+"^{2} = "+(b2*b2)+"\\) et affirme que cela prouve un angle droit. Juge l'affirmation.",
    {t:"L'affirmation est fausse : les deux carrés les plus courts doivent s'additionner pour donner le carré le plus long", fb:"Exact : "+(a2*a2)+" + "+(b2*b2)+" égale "+(c2*c2)+", et c'est ce test complet qui le prouve."}, opts2,
    "Le test complet compare une somme avec le carré le plus long : \\[ \\begin{aligned} "+a2+"^{2} + "+b2+"^{2} &= "+(a2*a2)+" + "+(b2*b2)+" \\\\ &= "+(c2*c2)+" = "+c2+"^{2} \\end{aligned} \\] Un seul carré ne prouve rien. L'affirmation est <b>fausse : les deux carrés les plus courts doivent s'additionner pour donner le carré le plus long</b>.",
    {mode:"claim", a:a2, b:b2, c:c2}); q.figure=triSVG(c2,b2,a2,{L:["A","B","C"],side:[c2+"",b2+"",a2+""]}); return q;
}, ["Être proche d'un triplet n'est pas une preuve : les carrés doivent correspondre exactement.", "Calcule la somme des deux carrés les plus courts et le carré le plus long, puis compare."]);

E("u1-best-estimate", 1, ["6.30"], 3, "gen", function(){
  var n=u1nonSquare(20,150); var root=Math.sqrt(n);
  var best=u1r1(root);
  var vals=[u1r1(best-0.4), best, u1r1(best+0.4), u1r1(best+0.8)];
  var uniq=[]; vals.forEach(function(v){if(v>0&&uniq.indexOf(v)<0){uniq.push(v);}});
  while(uniq.length<4){uniq.push(u1r1(best+uniq.length));}
  var opts=uniq.filter(function(v){return v!==best;}).slice(0,3).map(function(v){return {t:fmtDF(v,1), fb:"Mets-le au carré : "+fmtD(v)+" au carré donne "+fmtD(Math.round(v*v*100)/100)+", plus loin de "+n+" que le meilleur choix."};});
  var q=mcq("Quelle valeur est la meilleure estimation de \\(\\sqrt{"+n+"}\\), avec une décimale ?", {t:fmtD(best), fb:"Oui : "+fmtD(best)+" au carré donne "+fmtD(Math.round(best*best*100)/100)+", le plus proche de "+n+"."}, opts,
    "Encadre d'abord la racine, puis essaie les dixièmes proches : \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmtD(root)+" \\\\ &\\approx "+fmtD(best)+" \\end{aligned} \\] La meilleure estimation est <b>"+fmtD(best)+"</b>.",
    {n:n, best:best});
  var k=Math.floor(root);
  q.figure=u1numLineSVG(k,k+1);
  return q;
}, ["Encadre d'abord la racine entre deux nombres entiers.", "Mets les valeurs à une décimale proches au carré et choisis le carré le plus proche du nombre."]);

E("u1-diagonal-square", 1, ["9.12"], 3, "gen", function(){
  var s=ri(4,20);
  var diag=u1r1(s*Math.sqrt(2));
  var ctx=pick(["Un terrain de jardin carré à Corner Brook","Un champ carré près de Bay Roberts","Une patinoire carrée à Mount Pearl","Un tapis de classe carré dans une école de St. John's"]);
  var q=numq(ctx+" a des côtés de "+s+" m. Une ligne va tout droit d'un coin au coin opposé. Trouve la longueur de cette ligne, avec une décimale, en mètres.", diag, 0.06,
    "Le trajet est l'hypoténuse d'un triangle rectangle dont les deux cathètes égalent "+s+" : \\[ \\begin{aligned} d^{2} &= "+s+"^{2} + "+s+"^{2} \\\\ &= "+(s*s)+" + "+(s*s)+" \\\\ &= "+(2*s*s)+" \\\\ d &= \\sqrt{"+(2*s*s)+"} \\approx "+fmtD(diag)+" \\end{aligned} \\] Le trajet mesure <b>"+fmtD(diag)+" m</b>.",
    {s:s}); q.figure=m8RectDiagSVG(s,s,s+" m",s+" m","?"); return q;
}, ["Divise le carré le long du trajet : il devient un triangle rectangle avec deux cathètes égales.", "Mets le côté au carré, double-le, puis prends la racine carrée et arrondis."]);

E("u1-square-plot-perimeter", 1, ["5.2"], 3, "gen", function(){
  var r=ri(5,20); var area=r*r; var per=4*r;
  var ctx=pick(["Un potager carré","Un dessus de courtepointe carré","Un bac à sable carré","Une photo imprimée carrée"]);
  var edge=pick(["Une clôture est placée autour de ses quatre côtés. Combien de mètres de clôture faut-il ?","Une bordure est cousue autour de ses quatre côtés. Combien de mètres de bordure faut-il ?","Une bordure est placée autour de ses quatre côtés. Combien de mètres de bordure faut-il ?","Un cadre fait le tour de ses quatre côtés. Combien de mètres de cadre faut-il ?"]);
  var q=numq(ctx+" a une aire de "+area+" mètres carrés. "+edge, per, 0.01,
    "Trouve d'abord la longueur du côté à partir de l'aire, puis le périmètre : \\[ \\begin{aligned} \\text{côté} &= \\sqrt{"+area+"} = "+r+" \\\\ \\text{périmètre} &= 4 \\times "+r+" \\\\ &= "+per+" \\end{aligned} \\] La longueur nécessaire est <b>"+per+" m</b>.",
    {r:r, area:area}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["Le côté d'un carré est la racine carrée de son aire.", "Trouve d'abord la longueur du côté, puis multiplie par 4 pour les quatre côtés."]);

/* ----- bank-u2.js ----- */
// Math 8 (French) Unit 2 Integers question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 418 to 882).
// CRMARKS: u2-div-2by1=3
// CRMARKS: u2-div-2by2=3
// CRMARKS: u2-mixed-problem=2
// CRMARKS: u2-mult-problem=3
// CRMARKS: u2-ooo-brackets-num=3
// CRMARKS: u2-ooo-num=2
// CRMARKS: u2-sign-product-problem=2
/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): integer chips = "jetons" (red chips =
 * "jetons rouges", per the guide's matériel de manipulation and the Math 9
 * FR use of "jetons" for counters); "zero pairs" = "paires nulles";
 * "sizes" (absolute values in the sign-rule solutions) rendered as
 * "les nombres sans leurs signes"; order of operations = "priorité des
 * opérations" (guide 8N7.11, glossary); "signed change" in
 * u2-sign-product-problem = "changement signé"; tide gauge = "jauge de
 * marée"; ferry = "traversier" (NL usage); goal difference = "différence
 * de buts". The unused helper u2word is translated ("negative" =
 * "négatif") so its output matches the rest of the bank if it is ever
 * called; it has no call sites in this chunk, as in the source.
 * FMT-GEOM lines left: none. This chunk has no SVG or figure helpers, so
 * every display fmt( became fmtD(, including the .map(fmt) callback in
 * u2-ooo-evaluate-mc, which became .map(fmtD) (same pattern as the
 * Math 9 FR chunkE precedent noted in its translator notes).
 * Money: every "$" + amount became amount + " $", including the
 * "-$" + r balance in u2-mult-context-match, which became "-" + r + " $".
 * Percent literals: none occur in this chunk. No fmtF(, fmtDF( or
 * .toFixed( occurs in the source, so none appears here.
 * Literal formatted numbers written into static prose: NONE. All
 * generated values are integers routed through fmtD( or concatenated
 * raw, as in the source; the only literal numerals in static text are
 * the mathematics values in u2-context-reasoning-var (-5, 4, -20, -36,
 * 6, -6, 3, -1, -3, -4, 12), reproduced unchanged.
 */
/* Unit 2: Integers */
// Unit 2: Integers (Math 8, NL). Entries only; helpers prefixed u2.
function u2sg(n) { return n < 0 ? "(" + n + ")" : "" + n; }
function u2word(n) { return n < 0 ? "négatif " + Math.abs(n) : "" + n; }
// Build 3 distinct numeric distractors from candidate {v, fb} pairs, with offset fallbacks.
function u2dist(ans, cands) {
  var out = [], used = {};
  used[fmtD(ans)] = 1;
  cands.forEach(function (c) {
    if (out.length >= 3) return;
    var k = fmtD(c.v);
    if (!used[k]) { used[k] = 1; out.push({ t: k, fb: c.fb }); }
  });
  var offs = [1, -1, 2, -2, 10, -10, 5, -5];
  var i = 0;
  while (out.length < 3 && i < offs.length) {
    var v = ans + offs[i]; i++;
    var k2 = fmtD(v);
    if (!used[k2]) { used[k2] = 1; out.push({ t: k2, fb: "Cela vient d'une erreur de calcul." }); }
  }
  return out;
}

// 1. L1, 6.17: model multiplication with integer chips, described in words.
E("u2-mult-model-chips", 2, ["6.17"], 1, "gen", function () {
  var g = ri(2, 6), m = ri(2, 7);
  if (Math.random() < 0.5) {
    var val = g * (-m);
    var prompt = "Un modèle avec des jetons montre " + g + " groupes égaux. Chaque groupe contient " + m + " jetons rouges, et chaque jeton rouge représente \\(-1\\). Quel produit et quelle valeur le modèle montre-t-il ?";
    var solution = "Il y a " + g + " groupes de \\(-" + m + "\\) : \\[ \\begin{aligned} " + g + " \\times (-" + m + ") &= " + val + " \\end{aligned} \\] Donc le modèle montre le produit <b>\\(" + g + " \\times (-" + m + ") = " + val + "\\)</b>.";
    return mcq(prompt,
      { t: fmtD(val), fb: "Exact. Le modèle montre " + g + " groupes de -" + m + "." },
      u2dist(val, [
        { v: -val, fb: "Le signe est faux. Des groupes de jetons rouges (négatifs) donnent un total négatif." },
        { v: g - m, fb: "Cela soustrait la taille du groupe du nombre de groupes au lieu de multiplier." },
        { v: -(g + m), fb: "Cela additionne les deux nombres au lieu de les multiplier." }
      ]),
      solution, { mode: "chips-groups", g: g, m: m });
  }
  var val2 = g * m;
  var prompt2 = "À partir de paires nulles, un élève retire " + g + " groupes de " + m + " jetons rouges, où chaque jeton rouge représente \\(-1\\). Retirer des jetons rouges est noté comme une multiplication par \\(-" + g + "\\). Quelle est la valeur du modèle ?";
  var solution2 = "Retirer " + g + " groupes de \\(-" + m + "\\) est le produit \\((-" + g + ") \\times (-" + m + ")\\). Deux signes négatifs donnent un positif : \\[ \\begin{aligned} (-" + g + ") \\times (-" + m + ") &= " + val2 + " \\end{aligned} \\] Donc la valeur du modèle est <b>" + val2 + "</b>.";
  return mcq(prompt2,
    { t: fmtD(val2), fb: "Exact. Retirer des groupes de jetons négatifs augmente la valeur." },
    u2dist(val2, [
      { v: -val2, fb: "Le signe est faux. Un négatif fois un négatif donne un positif." },
      { v: m - g, fb: "Cela soustrait le nombre de groupes au lieu de multiplier." },
      { v: g + m, fb: "Cela additionne les deux nombres au lieu de les multiplier." }
    ]),
    solution2, { mode: "chips-removal", g: g, m: m });
}, ["Compte d'abord les groupes, puis la valeur dans chaque groupe.", "Les jetons rouges représentent des négatifs, et retirer des groupes est aussi une action négative."]);

// 2. L1, 6.18: apply the sign rule through a direct product.
E("u2-product-sign-apply", 2, ["6.18"], 1, "gen", function () {
  var a = 0, b = 0;
  while (a === 0) a = ri(-9, 9);
  while (b === 0) b = ri(-9, 9);
  var val = a * b;
  var prompt = "Calcule : \\(" + u2sg(a) + " \\times " + u2sg(b) + "\\)";
  var signNote = (a < 0 && b < 0) ? "Les signes sont les mêmes, donc le produit est positif."
    : (a < 0 || b < 0) ? "Les signes sont différents, donc le produit est négatif."
    : "Les deux facteurs sont positifs, donc le produit est positif.";
  var solution = signNote + " Multiplie les nombres sans leurs signes : \\[ \\begin{aligned} " + u2sg(a) + " \\times " + u2sg(b) + " &= " + val + " \\end{aligned} \\] Donc le produit est <b>" + val + "</b>.";
  return mcq(prompt,
    { t: fmtD(val), fb: "Exact. " + signNote },
    u2dist(val, [
      { v: -val, fb: "La valeur est bonne, mais le signe est faux. Vérifie si les signes sont les mêmes ou différents." },
      { v: a + b, fb: "Cela additionne les deux nombres au lieu de les multiplier." },
      { v: a - b, fb: "Cela soustrait les deux nombres au lieu de les multiplier." }
    ]),
    solution, { mode: "product-sign", a: a, b: b });
}, ["Décide d'abord du signe : les mêmes signes donnent un positif, les signes différents donnent un négatif.", "Multiplie les nombres sans leurs signes, puis ajoute le signe."]);

// 3. L1, 6.22: apply the sign rule through a direct quotient.
E("u2-quotient-sign-apply", 2, ["6.22"], 1, "gen", function () {
  var d = 0;
  while (d === 0 || Math.abs(d) < 2) d = ri(-9, 9);
  var q = 0;
  while (q === 0 || Math.abs(q) < 2) q = ri(-9, 9);
  var dvd = d * q;
  var prompt = "Calcule : \\(" + dvd + " \\div " + u2sg(d) + "\\)";
  var signNote = (dvd < 0 && d < 0) || (dvd > 0 && d > 0) ? "Les signes sont les mêmes, donc le quotient est positif." : "Les signes sont différents, donc le quotient est négatif.";
  var solution = signNote + " Divise les nombres sans leurs signes : \\[ \\begin{aligned} " + dvd + " \\div " + u2sg(d) + " &= " + q + " \\end{aligned} \\] Donc le quotient est <b>" + q + "</b>.";
  return mcq(prompt,
    { t: fmtD(q), fb: "Exact. " + signNote },
    u2dist(q, [
      { v: -q, fb: "La valeur est bonne, mais le signe est faux. Vérifie si les signes sont les mêmes ou différents." },
      { v: dvd - d, fb: "Cela soustrait le diviseur au lieu de diviser." },
      { v: d, fb: "Cela répète seulement le diviseur. Le quotient indique combien de fois le diviseur entre dans le nombre." }
    ]),
    solution, { mode: "quotient-sign", d: d, q: q });
}, ["Décide d'abord du signe : les mêmes signes donnent un positif, les signes différents donnent un négatif.", "Divise le premier nombre, sans son signe, par le deuxième, sans son signe, puis ajoute le signe."]);

// 4. L2, 6.21: model division with chips or sharing, described in words.
E("u2-div-model-groups", 2, ["6.21"], 1, "gen", function () {
  var g = ri(2, 8), per = ri(2, 9);
  var total = -g * per;
  if (Math.random() < 0.5) {
    var prompt = "Un modèle avec des jetons montre " + Math.abs(total) + " jetons rouges (valeur totale \\(" + total + "\\)) partagés également en " + g + " groupes. Quelle est la valeur de chaque groupe ?";
    var solution = "Partager \\(" + total + "\\) également en " + g + " groupes est une division : \\[ \\begin{aligned} " + total + " \\div " + g + " &= " + (-per) + " \\end{aligned} \\] Donc chaque groupe a la valeur <b>" + (-per) + "</b>.";
    return mcq(prompt,
      { t: fmtD(-per), fb: "Exact. Chaque groupe contient " + per + " jetons rouges." },
      u2dist(-per, [
        { v: per, fb: "Le signe est faux. Les jetons sont rouges, donc chaque groupe est négatif." },
        { v: total + g, fb: "Cela additionne au lieu de diviser le total en groupes égaux." },
        { v: -g, fb: "Cela donne le nombre de groupes, pas la valeur dans chaque groupe." }
      ]),
      solution, { mode: "div-sharing", g: g, per: per });
  }
  var prompt2 = "Sur une droite numérique, un élève fait des sauts égaux de \\(-" + per + "\\) à partir de 0 et arrive exactement sur \\(" + total + "\\). Combien de sauts a-t-il faits ?";
  var solution2 = "Compter les sauts de \\(-" + per + "\\) qui arrivent à \\(" + total + "\\) est une division : \\[ \\begin{aligned} " + total + " \\div (-" + per + ") &= " + g + " \\end{aligned} \\] Donc l'élève a fait <b>" + g + "</b> sauts.";
  return mcq(prompt2,
    { t: fmtD(g), fb: "Exact. Le total divisé par la taille du saut donne le nombre de sauts." },
    u2dist(g, [
      { v: -g, fb: "Le nombre de sauts est positif. Un négatif divisé par un négatif donne un positif." },
      { v: per, fb: "C'est la taille de chaque saut, pas le nombre de sauts faits." },
      { v: Math.abs(total), fb: "C'est la taille du point d'arrivée, pas le nombre de sauts." }
    ]),
    solution2, { mode: "div-grouping", g: g, per: per });
}, ["Partager également et compter des groupes égaux sont deux formes de division.", "Écris la division que le modèle montre, puis utilise la règle des signes."]);

// 5. L2, 6.19: which context matches a given product.
E("u2-mult-context-match", 2, ["6.19"], 1, "gen", function () {
  var r = ri(2, 9), n = ri(3, 8);
  var scens = [
    {
      ok: "La température baisse de " + r + " degrés chaque heure pendant " + n + " heures. Le changement total de température.",
      opp: "La température monte de " + r + " degrés chaque heure pendant " + n + " heures. Le changement total de température.",
      add: "La température commence à " + (-r) + " degrés, puis elle monte de " + n + " degrés. La température finale.",
      div: "Une baisse totale de température de " + (r * n) + " degrés est répartie également sur " + n + " heures. La baisse à chaque heure."
    },
    {
      ok: "Un plongeur descend de " + r + " mètres de plus chaque minute pendant " + n + " minutes. Le changement total de profondeur du plongeur.",
      opp: "Un plongeur monte de " + r + " mètres de plus chaque minute pendant " + n + " minutes. Le changement total de profondeur du plongeur.",
      add: "Un plongeur est à " + r + " mètres sous la surface, puis il descend de " + n + " mètres de plus. La profondeur finale du plongeur sous l'eau.",
      div: "Un plongeur descend de " + (r * n) + " mètres par étapes égales sur " + n + " minutes. La descente du plongeur à chaque minute, en mètres."
    },
    {
      ok: "Maya retire " + r + " $ de son compte chaque semaine pendant " + n + " semaines. Le changement total de son solde.",
      opp: "Maya dépose " + r + " $ dans son compte chaque semaine pendant " + n + " semaines. Le changement total de son solde.",
      add: "Le solde de Maya est de -" + r + " $, puis elle dépose " + n + " $. Son nouveau solde.",
      div: "Maya rembourse une dette de " + (r * n) + " $ en " + n + " paiements égaux. Le montant de chaque paiement."
    },
    {
      ok: "Un joueur perd " + r + " points à chacune des " + n + " rondes d'un jeu. Le changement total du pointage du joueur.",
      opp: "Un joueur gagne " + r + " points à chacune des " + n + " rondes d'un jeu. Le changement total du pointage du joueur.",
      add: "Le pointage d'un joueur est de " + (-r) + " points, puis le joueur gagne " + n + " points. Le pointage final.",
      div: "Un joueur perd " + (r * n) + " points en tout sur " + n + " rondes égales. Les points perdus à chaque ronde."
    }
  ];
  var s = pick(scens);
  var prompt = "Quelle situation peut être représentée par le produit \\((-" + r + ") \\times " + n + "\\) ?";
  var solution = "Le produit multiplie un changement négatif répété de \\(-" + r + "\\) par " + n + " répétitions : \\[ \\begin{aligned} (-" + r + ") \\times " + n + " &= " + (-r * n) + " \\end{aligned} \\] Donc il correspond à la situation où le même changement négatif se répète <b>" + n + " fois</b>.";
  return mcq(prompt,
    { t: s.ok, fb: "Exact. Un changement négatif répété " + n + " fois est une multiplication." },
    [
      { t: s.opp, fb: "Ce changement est positif, donc il serait représenté par un premier facteur positif." },
      { t: s.add, fb: "Cette situation combine deux montants séparés, ce qui est une addition, pas un changement répété." },
      { t: s.div, fb: "Cette situation partage un total en parts égales, ce qui est une division, pas une multiplication." }
    ],
    solution, { mode: "mult-context", r: r, n: n });
}, ["Un produit avec un facteur négatif veut dire un changement négatif répété plusieurs fois.", "Vérifie chaque situation : le changement est-il négatif, et est-il répété ou partagé ?"]);

// 6. L2, 6.20, CR 3: solve a multiplication problem in context (start plus repeated change).
E("u2-mult-problem", 2, ["6.20"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-6, 8), r = ri(2, 6), h = ri(3, 7);
    var ans = start - r * h;
    var prompt = "À l'heure du souper, la température à Corner Brook est de " + start + " degrés. Elle baisse ensuite de " + r + " degrés chaque heure pendant " + h + " heures. Quelle est la température après " + h + " heures, en degrés ?";
    var solution = "La baisse totale est un produit, puis on la soustrait du départ : \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " &= " + start + " - " + (r * h) + " \\\\ &= " + ans + " \\end{aligned} \\] Donc la température est de <b>" + ans + " degrés</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "temp-fall", start: start, r: r, h: h });
  }
  if (mode === 1) {
    var bal = ri(60, 240), w = ri(6, 20), k = ri(3, 8);
    var ansB = bal - w * k;
    var promptB = "Un compte bancaire contient " + bal + " $. Le propriétaire retire " + w + " $ chaque semaine pendant " + k + " semaines, sans autre activité. Quel est le solde après " + k + " semaines, en dollars ?";
    var solutionB = "Le total retiré est un produit, puis on le soustrait du solde de départ : \\[ \\begin{aligned} " + bal + " + (-" + w + ") \\times " + k + " &= " + bal + " - " + (w * k) + " \\\\ &= " + ansB + " \\end{aligned} \\] Donc le solde est de <b>" + ansB + " $</b>.";
    return numq(promptB, ansB, 0.01, solutionB, { mode: "bank-withdraw", bal: bal, w: w, k: k });
  }
  var depth = ri(10, 60), rate = ri(3, 9), mins = ri(3, 8);
  var ansD = -(depth + rate * mins);
  var promptD = "Un petit sous-marin est à " + depth + " m sous la surface. Il descend encore de " + rate + " m chaque minute pendant " + mins + " minutes. En utilisant des nombres négatifs pour les positions sous la surface, quelle est sa position après " + mins + " minutes, en mètres ?";
  var solutionD = "La descente de plus est un produit, ajouté à la profondeur de départ : \\[ \\begin{aligned} -" + depth + " + (-" + rate + ") \\times " + mins + " &= -" + depth + " - " + (rate * mins) + " \\\\ &= " + ansD + " \\end{aligned} \\] Donc sa position est de <b>" + ansD + " m</b>.";
  return numq(promptD, ansD, 0.01, solutionD, { mode: "sub-descend", depth: depth, rate: rate, mins: mins });
}, ["Trouve d'abord le changement total répété : cette partie est une multiplication.", "Multiplie le changement à chaque étape par le nombre d'étapes, puis combine-le avec la valeur de départ."]);

// 7. L2, 6.23: which context matches a given quotient.
E("u2-div-context-match", 2, ["6.23"], 1, "gen", function () {
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var scens = [
    {
      ok: "Une baisse de température de " + total + " degrés se fait également sur " + n + " heures. La baisse à chaque heure.",
      mult: "La température baisse de " + per + " degrés chaque heure pendant " + n + " heures. La baisse totale de température.",
      add: "La température est de " + (-total) + " degrés et elle monte de " + n + " degrés. La nouvelle température finale.",
      opp: "Une hausse de température de " + total + " degrés se fait également sur " + n + " heures. La hausse à chaque heure."
    },
    {
      ok: "Une dette de " + total + " $ est remboursée en " + n + " paiements hebdomadaires égaux. Le changement de la dette à chaque paiement.",
      mult: "Un paiement de " + per + " $ est fait chaque semaine pendant " + n + " semaines pour rembourser la dette. Le total payé.",
      add: "Une dette de " + total + " $ augmente de " + n + " $ en frais supplémentaires. La nouvelle dette totale.",
      opp: "Un compte d'épargne augmente de " + total + " $ répartis également sur " + n + " semaines complètes. L'augmentation du compte à chaque semaine."
    },
    {
      ok: "L'altitude d'un randonneur baisse de " + total + " m par montants égaux sur " + n + " sections du sentier. Le changement d'altitude sur chaque section.",
      mult: "Un randonneur baisse de " + per + " m d'altitude sur chacune des " + n + " sections du sentier. La baisse totale d'altitude sur tout le sentier.",
      add: "Un randonneur à " + (-total) + " m par rapport au début du sentier monte de " + n + " m. La nouvelle position du randonneur sur le sentier, à la fin.",
      opp: "L'altitude d'un randonneur monte de " + total + " m par montants égaux sur " + n + " sections du sentier. Le changement d'altitude sur chaque section du sentier."
    }
  ];
  var s = pick(scens);
  var prompt = "Quelle situation peut être représentée par le quotient \\((-" + total + ") \\div " + n + "\\) ?";
  var solution = "Le quotient partage un changement négatif total de \\(-" + total + "\\) en " + n + " parts égales : \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] Donc il correspond à la situation où un total est <b>partagé également</b> en " + n + " parts.";
  return mcq(prompt,
    { t: s.ok, fb: "Exact. Un total partagé en parts égales est une division." },
    [
      { t: s.mult, fb: "Cette situation répète un changement, ce qui est une multiplication, pas un partage d'un total." },
      { t: s.add, fb: "Cette situation combine deux montants séparés, ce qui est une addition." },
      { t: s.opp, fb: "Ce changement total est positif, donc son quotient serait positif, pas négatif." }
    ],
    solution, { mode: "div-context", per: per, n: n });
}, ["Un quotient partage un total en parts égales.", "Vérifie chaque situation : un total est-il partagé également, et le changement est-il négatif ?"]);

// 8. L2, 6.24, CR 3: division of a 2-digit integer by a 1-digit integer in a problem.
E("u2-div-2by1", 2, ["6.24"], 1, "gen", function () {
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var d = ri(2, 9);
    var q = ri(3, 12) * (Math.random() < 0.5 ? -1 : 1);
    var dvd = d * q;
    if (Math.abs(dvd) < 10 || Math.abs(dvd) > 99) continue;
    P = { d: d, q: q, dvd: dvd };
  }
  if (!P) P = { d: 6, q: -7, dvd: -42 };
  var prompt = "Une jauge de marée montre que le niveau de l'eau a changé en tout de " + P.dvd + " cm, en " + P.d + " changements horaires égaux. Quel a été le changement à chaque heure, en centimètres ?";
  var solution = "Partage le changement total en " + P.d + " parts égales, puis utilise la règle des signes : \\[ \\begin{aligned} " + P.dvd + " \\div " + P.d + " &= " + P.q + " \\end{aligned} \\] Donc le changement à chaque heure a été de <b>" + P.q + " cm</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by1", d: P.d, q: P.q });
}, ["Le dividende a deux chiffres et le diviseur a un chiffre.", "Divise d'abord les nombres sans leurs signes, puis utilise la règle des signes pour le quotient."]);

// 9. L2, 6.25, CR 3: division of a 2-digit integer by a 2-digit integer.
E("u2-div-2by2", 2, ["6.25"], 1, "gen", function () {
  var P = null;
  for (var tries = 0; tries < 300 && !P; tries++) {
    var d = ri(11, 25) * (Math.random() < 0.5 ? -1 : 1);
    var q = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
    var dvd = d * q;
    if (Math.abs(dvd) < 10 || Math.abs(dvd) > 99) continue;
    P = { d: d, q: q, dvd: dvd };
  }
  if (!P) P = { d: 12, q: -7, dvd: -84 };
  var prompt = "Calcule : \\(" + P.dvd + " \\div " + u2sg(P.d) + "\\)";
  var solution = "Divise les nombres sans leurs signes, puis décide du signe à partir des deux signes : \\[ \\begin{aligned} " + P.dvd + " \\div " + u2sg(P.d) + " &= " + P.q + " \\end{aligned} \\] Donc le quotient est <b>" + P.q + "</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by2", d: P.d, q: P.q });
}, ["Les deux nombres ont deux chiffres ici ; le quotient a un seul chiffre.", "Divise d'abord les nombres sans leurs signes, puis utilise la règle des signes pour le quotient."]);

// 10. L2, 6.26: identify the operation (expression) that solves a problem.
E("u2-identify-operation", 2, ["6.26"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = ri(2, 8), h = ri(3, 9);
    var prompt = "Chaque heure, le niveau de l'eau dans un réservoir du port baisse de " + r + " cm. Quelle expression donne le changement total du niveau de l'eau après " + h + " heures ?";
    var solution = "Le même changement se répète " + h + " fois, donc l'opération est une multiplication par un changement négatif : \\[ \\begin{aligned} (-" + r + ") \\times " + h + " &= " + (-r * h) + " \\end{aligned} \\] Donc l'expression est <b>\\((-" + r + ") \\times " + h + "\\)</b>.";
    return mcq(prompt,
      { t: "\\((-" + r + ") \\times " + h + "\\)", fb: "Exact. Un changement négatif répété est une multiplication." },
      [
        { t: "\\((-" + r + ") + " + h + "\\)", fb: "Cela additionne les deux nombres une fois au lieu de répéter le changement." },
        { t: "\\((-" + r + ") \\div " + h + "\\)", fb: "La division partage un total en parts ; ici, un changement se répète." },
        { t: "\\(" + h + " - " + r + "\\)", fb: "Cela soustrait un montant de l'autre au lieu de répéter le changement." }
      ],
      solution, { mode: "identify-mult", r: r, h: h });
  }
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var prompt2 = "Un groupe d'amis partage également une dette de frais de traversier de " + total + " $, notée comme \\(-" + total + "\\) dollars répartis entre " + n + " amis. Quelle expression donne le montant que chaque ami doit ?";
  var solution2 = "Un total partagé également entre " + n + " amis est une division : \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] Donc l'expression est <b>\\((-" + total + ") \\div " + n + "\\)</b>.";
  return mcq(prompt2,
    { t: "\\((-" + total + ") \\div " + n + "\\)", fb: "Exact. Partager un total également est une division." },
    [
      { t: "\\((-" + total + ") \\times " + n + "\\)", fb: "Cela répète la dette entière " + n + " fois au lieu de la partager." },
      { t: "\\((-" + total + ") + " + n + "\\)", fb: "Cela ajoute à la dette au lieu de la partager en parts égales." },
      { t: "\\(" + n + " - " + total + "\\)", fb: "Cela soustrait la dette du nombre d'amis, ce qui mélange des quantités différentes." }
    ],
    solution2, { mode: "identify-div", per: per, n: n });
}, ["Demande-toi si le changement se répète, ou si un total est partagé en parts égales.", "Un changement répété veut dire multiplier ; un partage égal veut dire diviser."]);

// 11. L2, 6.27: order of operations with integers, MC.
E("u2-ooo-evaluate-mc", 2, ["6.27"], 2, "gen", function () {
  var R = null;
  for (var tries = 0; tries < 300 && !R; tries++) {
    var tmpl = ri(0, 2), expr, val, steps, errs;
    if (tmpl === 0) {
      var a = ri(-9, 9), b = 0, c = 0;
      while (b === 0) b = ri(-8, 8);
      while (c === 0) c = ri(-6, 6);
      if (a === 0) continue;
      val = a + b * c;
      expr = "\\(" + a + " + " + u2sg(b) + " \\times " + u2sg(c) + "\\)";
      steps = "\\[ \\begin{aligned} " + a + " + " + u2sg(b) + " \\times " + u2sg(c) + " &= " + a + " + " + (b * c) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: (a + b) * c, fb: "Cela additionne d'abord, mais la multiplication se fait avant l'addition." },
        { v: a - b * c, fb: "Cela change l'addition en soustraction." },
        { v: a + b + c, fb: "Cela change la multiplication en addition." }
      ];
    } else if (tmpl === 1) {
      var a1 = ri(-9, 12), b1 = ri(-9, 9), c1 = 0;
      while (c1 === 0 || Math.abs(c1) < 2) c1 = ri(-6, 6);
      val = (a1 - b1) * c1;
      expr = "\\((" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + "\\)";
      steps = "\\[ \\begin{aligned} (" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + " &= " + (a1 - b1) + " \\times " + u2sg(c1) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a1 - b1 * c1, fb: "Cela multiplie avant de faire les parenthèses, mais les parenthèses passent d'abord." },
        { v: (a1 + b1) * c1, fb: "Cela additionne dans les parenthèses alors que l'expression demande de soustraire." },
        { v: a1 - b1 - c1, fb: "Cela change la multiplication en soustraction." }
      ];
    } else {
      var d2 = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
      var q2 = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
      var c2 = d2 * q2;
      var a2 = 0, b2 = 0;
      while (a2 === 0) a2 = ri(-8, 8);
      while (b2 === 0) b2 = ri(-8, 8);
      val = a2 * b2 - q2;
      expr = "\\(" + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + "\\)";
      steps = "\\[ \\begin{aligned} " + u2sg(a2) + " \\times " + u2sg(b2) + " - " + c2 + " \\div " + u2sg(d2) + " &= " + (a2 * b2) + " - " + q2 + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a2 * (b2 - q2), fb: "Cela regroupe la soustraction avec le produit, ce qui change l'ordre." },
        { v: a2 * b2 + q2, fb: "Cela additionne le quotient au lieu de le soustraire." },
        { v: (a2 * b2 - c2) * d2, fb: "Cela multiplie par le diviseur à la fin au lieu de diviser plus tôt." }
      ];
    }
    var keys = [val].concat(errs.map(function (e) { return e.v; })).map(fmtD);
    if (new Set(keys).size < 4) continue;
    R = { expr: expr, val: val, steps: steps, errs: errs, tmpl: tmpl };
  }
  if (!R) {
    R = { expr: "\\(3 + (-4) \\times 5\\)", val: -17, steps: "\\[ \\begin{aligned} 3 + (-4) \\times 5 &= 3 - 20 \\\\ &= -17 \\end{aligned} \\]", errs: [{ v: -5, fb: "Cela additionne d'abord, mais la multiplication se fait avant l'addition." }, { v: 23, fb: "Cela change l'addition en soustraction." }, { v: 4, fb: "Cela change la multiplication en addition." }], tmpl: 0 };
  }
  var prompt = "Calcule : " + R.expr;
  var solution = "Suis la priorité des opérations, les parenthèses d'abord, puis la multiplication et la division, puis l'addition et la soustraction : " + R.steps + " Donc la valeur est <b>" + R.val + "</b>.";
  return mcq(prompt,
    { t: fmtD(R.val), fb: "Exact. Les opérations ont été faites dans le bon ordre." },
    R.errs.map(function (e) { return { t: fmtD(e.v), fb: e.fb }; }),
    solution, { mode: "ooo-mc-" + R.tmpl, val: R.val });
}, ["Fais d'abord les parenthèses, puis la multiplication et la division, puis l'addition et la soustraction.", "Réécris l'expression après chaque étape pour garder l'ordre clair."]);

// 12. L2, 6.27, CR 2: order of operations, typed answer.
E("u2-ooo-num", 2, ["6.27"], 2, "gen", function () {
  var s = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var qq = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
  var r = s * qq;
  var p = 0, q = 0;
  while (p === 0) p = ri(-8, 8);
  while (q === 0) q = ri(-8, 8);
  var val = p * q - qq;
  var prompt = "Calcule : \\(" + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + "\\)";
  var solution = "Fais la multiplication et la division avant la soustraction : \\[ \\begin{aligned} " + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + " &= " + (p * q) + " - " + qq + " \\\\ &= " + val + " \\end{aligned} \\] Donc la valeur est <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-num", p: p, q: q, s: s });
}, ["La multiplication et la division se font avant l'addition et la soustraction.", "Calcule le produit et le quotient séparément, puis combine-les."]);

// 13. L2, 6.18 and 6.20, CR 2: signed per-round change applied in a game problem.
E("u2-sign-product-problem", 2, ["6.18", "6.20"], 1, "gen", function () {
  var start = ri(20, 90);
  var per = 0;
  while (per === 0 || Math.abs(per) < 2) per = ri(-9, 9);
  var rounds = ri(3, 8);
  var ans = start + per * rounds;
  var dirWord = per < 0 ? "perd " + Math.abs(per) : "gagne " + per;
  var prompt = "Dans un tournoi de jeu de société, Liam commence une partie avec " + start + " points. À chacune des " + rounds + " rondes, il " + dirWord + " points. Quel est son pointage après " + rounds + " rondes ?";
  var solution = "Les rondes donnent un seul produit, et son signe suit la règle des signes : \\[ \\begin{aligned} " + start + " + " + u2sg(per) + " \\times " + rounds + " &= " + start + " + " + (per * rounds) + " \\\\ &= " + ans + " \\end{aligned} \\] Donc son pointage est de <b>" + ans + " points</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "game-score", start: start, per: per, rounds: rounds });
}, ["Les rondes changent toutes le pointage de la même valeur signée, donc cette partie est un produit.", "Multiplie le changement signé par le nombre de rondes, puis ajoute-le au pointage de départ."]);

// 14. L3, 6.27, CR 3: order of operations with brackets and three operations.
E("u2-ooo-brackets-num", 2, ["6.27"], 3, "gen", function () {
  var e = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var dq = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
  var d = e * dq;
  var a = ri(-10, 14), b = ri(-10, 10), c = 0;
  while (c === 0 || Math.abs(c) < 2) c = ri(-6, 6);
  var inner = a - b;
  var val = inner * c - dq;
  var prompt = "Calcule : \\((" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + "\\)";
  var solution = "Fais d'abord les parenthèses, puis la multiplication et la division, puis la soustraction : \\[ \\begin{aligned} (" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + " &= " + inner + " \\times " + u2sg(c) + " - " + dq + " \\\\ &= " + (inner * c) + " - " + dq + " \\\\ &= " + val + " \\end{aligned} \\] Donc la valeur est <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-brackets", a: a, b: b, c: c, e: e });
}, ["Commence par les parenthèses, même quand d'autres opérations semblent tentantes d'abord.", "Termine les parenthèses, puis fais la multiplication et la division avant la soustraction finale."]);

// 15. L3, 6.26 and 6.27, CR 2: multi-step mixed problem, choose and order the operations.
E("u2-mixed-problem", 2, ["6.26", "6.27"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var start = ri(-4, 10), r = ri(2, 5), h = ri(3, 6), rise = ri(2, 9);
    var ans = start - r * h + rise;
    var prompt = "Pendant la nuit à Gander, la température commence à " + start + " degrés. Elle baisse de " + r + " degrés chaque heure pendant " + h + " heures, puis elle monte de " + rise + " degrés le lendemain matin. Quelle est la température finale, en degrés ?";
    var solution = "La baisse répétée est une multiplication, faite avant d'ajouter la hausse du matin : \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " + " + rise + " &= " + start + " - " + (r * h) + " + " + rise + " \\\\ &= " + ans + " \\end{aligned} \\] Donc la température finale est de <b>" + ans + " degrés</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "mixed-temp", start: start, r: r, h: h });
  }
  var bal = ri(80, 200), w = ri(5, 15), k = ri(3, 6), dep = ri(20, 90);
  var ansB = bal - w * k + dep;
  var promptB = "Un compte pour un voyage scolaire contient " + bal + " $. Le groupe paie " + w + " $ en frais de traversier pour chacun des " + k + " élèves, puis reçoit un don de " + dep + " $. Quel est le solde du compte, en dollars ?";
  var solutionB = "Les frais de traversier forment un seul produit, fait avant d'ajouter le don : \\[ \\begin{aligned} " + bal + " - " + w + " \\times " + k + " + " + dep + " &= " + bal + " - " + (w * k) + " + " + dep + " \\\\ &= " + ansB + " \\end{aligned} \\] Donc le solde est de <b>" + ansB + " $</b>.";
  return numq(promptB, ansB, 0.01, solutionB, { mode: "mixed-bank", bal: bal, w: w, k: k });
}, ["Une partie du problème se répète, donc c'est une multiplication ; le changement seul est ajouté ou soustrait après.", "Calcule d'abord la partie répétée, puis combine-la avec la valeur de départ et le changement seul."]);

// 16. L3, 6.19 and 6.23: variant set of context and model reasoning statics.
E("u2-context-reasoning-var", 2, ["6.19", "6.23"], 3, "var", varset([
  function () {
    var prompt = "Quelle situation peut être représentée par le produit \\((-5) \\times 4\\) ?";
    var solution = "Le produit répète un changement négatif de \\(-5\\) quatre fois : \\[ \\begin{aligned} (-5) \\times 4 &= -20 \\end{aligned} \\] Donc il correspond à la situation où la même perte se répète <b>4 fois</b>.";
    return mcq(prompt,
      { t: "Un gardien laisse entrer 5 buts à chacun de 4 matchs. Le changement total de la différence de buts de l'équipe.", fb: "Exact. Un changement négatif de 5 se répète 4 fois." },
      [
        { t: "Un gardien laisse entrer 5 buts dans un match et 4 buts dans le suivant. Le total des buts laissés entrer dans les deux matchs.", fb: "Cela combine deux montants différents et séparés, ce qui est une addition." },
        { t: "Une équipe perd 20 points en tout, partagés également sur 4 matchs. Les points perdus par l'équipe à chaque match.", fb: "Cela partage un total en parts égales, ce qui est une division." },
        { t: "Un joueur marque 5 buts à chacun de 4 matchs. Le total des buts marqués par le joueur.", fb: "Ce changement est positif, donc il utiliserait un premier facteur positif." }
      ],
      solution, { mode: "var-mult-context" });
  },
  function () {
    var prompt = "Quelle situation peut être représentée par le quotient \\((-36) \\div 6\\) ?";
    var solution = "Le quotient partage un changement négatif total de \\(-36\\) en 6 parts égales : \\[ \\begin{aligned} (-36) \\div 6 &= -6 \\end{aligned} \\] Donc il correspond à la situation où un total est <b>partagé également</b> en 6 parts.";
    return mcq(prompt,
      { t: "Un randonneur baisse de 36 m d'altitude par montants égaux sur 6 sections du sentier. Le changement sur chaque section.", fb: "Exact. Un total est partagé en 6 parts égales." },
      [
        { t: "Un randonneur baisse de 6 m d'altitude sur chacune de 36 sections du sentier. La baisse totale d'altitude.", fb: "Cela répète un changement plusieurs fois, ce qui est une multiplication." },
        { t: "Un randonneur à -36 m par rapport au début monte de 6 m sur le sentier. La nouvelle position du randonneur sur le sentier.", fb: "Cela combine deux montants séparés, ce qui est une addition." },
        { t: "Un randonneur monte de 36 m d'altitude par montants égaux sur 6 sections du sentier. Le changement d'altitude sur chaque section.", fb: "Ce changement total est positif, donc son quotient serait positif." }
      ],
      solution, { mode: "var-div-context" });
  },
  function () {
    var prompt = "Un modèle avec des jetons commence à partir de paires nulles. Un élève retire 3 groupes de 4 jetons rouges, où chaque jeton rouge représente \\(-1\\). Quel produit le modèle note-t-il ?";
    var solution = "Retirer des groupes est une action négative sur des jetons négatifs : \\[ \\begin{aligned} (-3) \\times (-4) &= 12 \\end{aligned} \\] Donc le modèle note le produit <b>\\((-3) \\times (-4)\\)</b>.";
    return mcq(prompt,
      { t: "\\((-3) \\times (-4)\\)", fb: "Exact. Retirer (action négative) des groupes de jetons rouges (négatifs) donne deux facteurs négatifs." },
      [
        { t: "\\(3 \\times (-4)\\)", fb: "Cela voudrait dire ajouter 3 groupes de jetons rouges, pas les retirer." },
        { t: "\\((-3) \\times 4\\)", fb: "Cela traite les jetons comme des jetons jaunes positifs au lieu de jetons rouges." },
        { t: "\\(3 \\times 4\\)", fb: "Cela ignore le retrait et les jetons rouges, donc rien n'est négatif." }
      ],
      solution, { mode: "var-model-product" });
  }
]), ["Pour chaque situation, décide si un changement se répète, si un total est partagé, ou si des montants séparés sont combinés.", "Associe aussi les signes à l'opération : le retrait et les jetons rouges sont tous deux négatifs."]);

/* ----- bank-u3.js ----- */
// Math 8 (French) Unit 3 Operations with Fractions question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 883 to 1391).
// CRMARKS: u3-divide-mixed-cr=3
// CRMARKS: u3-divide-word-cr=2
// CRMARKS: u3-mixed-multistep-cr=3
// CRMARKS: u3-model-division-bar=3
// CRMARKS: u3-mult-div-chain-cr=2
// CRMARKS: u3-multiply-mixed-cr=3
// CRMARKS: u3-order-of-ops-fractions=2
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 3 (Les opérations sur les fractions), entries u3-*.
   Translated per RULES.md and GLOSSARY.md; guide terminology wins.

   Judgement calls (glossary silent or wording rebuilt):
   - Mixed number rendered "nombre fractionnaire" throughout, per the
     8e guide ("réécrire chaque nombre fractionnaire en fraction
     impropre"); improper fraction is "fraction impropre", proper
     fraction is "fraction propre", reciprocal is "réciproque" (the
     guide's "réciproque du diviseur").
   - "Lowest terms" rendered "sous sa forme la plus simple", after the
     guides' "plus simple expression".
   - Benchmark rendered "repère". Overlap rendered "chevauchement"
     per the glossary. Unit fraction rendered "fraction unitaire".
   - Entry u3-model-whole-div-frac: the thing list is rebuilt as full
     French noun phrases (entiers, pizzas entières, rubans entiers,
     litres de jus entiers) so agreement holds without the English
     "whole X" branch; the prompt then uses "chaque entier".
   - Entry u3-model-division-bar: the item list uses only feminine
     nouns (bande, corde, planche, ficelle) so "d'une X" and "la X est
     divisée" agree for every draw; servings rendered "portions".
   - Entry u3-identify-operation: operation names translated in the
     scenario table, the options array and the why map together
     (Addition, Soustraction, Multiplication, Division), so the
     displayed options and the lowercased solution text stay French.
   - Entry u3-estimate-quotient-benchmark: category labels translated
     (Moins de 1, Environ 1, Environ 2, Plus de 2); the solution
     lowercases the chosen label, which works the same in French.
   - Money in u3-successive-fractions: "$" + amount rewritten as
     amount + " $" in the prompt, the options, the feedback and the
     solution, per RULES.md.
   - Names kept unchanged (Maya). Context nouns rebuilt with neutral
     "on" where English used a gendered worker (baker, climber).

   FMT-GEOM lines left as fmt(: none. The two SVG helpers build only
   coordinates and carry no text labels and no fmt( calls. Every
   display fmt( became fmtD( (estimate-product solution, estimate-
   quotient solution, order-of-operations solutions, chain solution).

   Literal formatted numbers in static prose: none. No percent, no
   dollar literals, no thousands literals in static text; generated
   decimals go through fmtD. The decimal string built inside
   u3accepted is an accepted-answer form in code, not display text,
   and is left unchanged (the app accepts comma and point).

   Unsure about: nothing blocking.
*/
/* Unit 3: Operations with Fractions */
// Unit 3: Operations with Fractions (Math 8, NL). Entries only; helpers prefixed u3.
function u3gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u3red(n, d) { var g = u3gcd(n, d); return [n / g, d / g]; }
function u3disp(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "\\(" + n + "\\)"; if (n < d) return "\\(" + FR(n, d) + "\\)"; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "\\(" + w + "\\)"; return "\\(" + w + FR(rem, d) + "\\)"; }
function u3plain(n, d) { var r = u3red(n, d); n = r[0]; d = r[1]; if (d === 1) return "" + n; if (n < d) return n + "/" + d; var w = Math.floor(n / d), rem = n % d; if (rem === 0) return "" + w; return w + " " + rem + "/" + d; }
function u3accepted(n, d) { var r = u3red(n, d); var rn = r[0], rd = r[1]; var out = []; if (rd === 1) { out.push("" + rn); return out; } out.push(rn + "/" + rd); out.push(rn + " / " + rd); var mix = u3plain(n, d); if (mix.indexOf(" ") >= 0) out.push(mix); var dd = rd; while (dd % 2 === 0) dd /= 2; while (dd % 5 === 0) dd /= 5; if (dd === 1) { var v = rn / rd; out.push(("" + v).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "")); } return out; }
function u3areaSVG(n1, d1, n2, d2) {
  var W = 252, H = 144, cw = W / d2, ch = H / d1, cells = "";
  for (var r = 0; r < d1; r++) for (var c = 0; c < d2; c++) {
    var fill = "none";
    if (c < n2 && r < n1) fill = FIG_ACC; else if (c < n2) fill = FIG_SHADE;
    cells += "<rect x='" + (c * cw) + "' y='" + (r * ch) + "' width='" + cw + "' height='" + ch + "' fill='" + fill + "' fill-opacity='" + (fill === FIG_ACC ? "0.55" : "1") + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
  }
  return "<svg viewBox='0 0 252 144' width='252' height='144' xmlns='http://www.w3.org/2000/svg'>" + cells + "<rect x='0' y='0' width='252' height='144' fill='none' stroke='" + FIG_INK + "' stroke-width='2.5'/></svg>";
}
function u3barSVG(total, shaded, group) {
  var W = 280, H = 46, cw = W / total, cells = "";
  for (var i = 0; i < total; i++) {
    var fill = i < shaded ? FIG_SHADE : "none";
    var sw = (i % group === 0 || i === total - 1) ? 2.5 : 1;
    cells += "<rect x='" + (i * cw) + "' y='4' width='" + cw + "' height='38' fill='" + fill + "' stroke='" + FIG_INK + "' stroke-width='1'/>";
    if (i % group === 0) cells += "<line x1='" + (i * cw) + "' y1='2' x2='" + (i * cw) + "' y2='44' stroke='" + FIG_INK + "' stroke-width='" + sw + "'/>";
  }
  cells += "<line x1='280' y1='2' x2='280' y2='44' stroke='" + FIG_INK + "' stroke-width='2.5'/>";
  return "<svg viewBox='0 0 280 50' width='280' height='50' xmlns='http://www.w3.org/2000/svg'>" + cells + "</svg>";
}

// 1. L1, 6.4: model fraction times whole (equal groups).
E("u3-model-frac-times-whole", 3, ["6.4"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d = ri(3, 8), n = ri(1, d - 1), w = ri(2, 6);
    var vals = [u3disp(w * n, d), u3disp(n + w, d), u3disp(n, d), u3disp(w, d)];
    if (new Set(vals).size < 4) continue;
    P = { d: d, n: n, w: w, vals: vals };
  }
  if (!P) P = { d: 4, n: 3, w: 3, vals: [u3disp(9, 4), u3disp(6, 4), u3disp(3, 4), u3disp(3, 4)] };
  var prompt = "Un modèle montre \\(" + P.w + "\\) groupes égaux. Dans chaque groupe, " + u3disp(P.n, P.d) + " est ombré. Quelle est la quantité totale ombrée ?";
  var adds = []; for (var i = 0; i < P.w; i++) adds.push(FR(P.n, P.d));
  var solution = "Additionne la même fraction une fois pour chaque groupe, ce qui est une multiplication : \\[ \\begin{aligned} " + adds.join(" + ") + " &= " + P.w + " \\times " + FR(P.n, P.d) + " \\\\ &= " + FR(P.w * P.n, P.d) + " \\\\ &= " + u3plain(P.w * P.n, P.d) + " \\end{aligned} \\] Donc la quantité totale ombrée est <b>" + u3disp(P.w * P.n, P.d) + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Exact. Chacun des " + P.w + " groupes donne la même fraction." },
    [
      { t: P.vals[1], fb: "Cela additionne le nombre entier au numérateur, mais le modèle répète la fraction." },
      { t: P.vals[2], fb: "C'est la quantité ombrée dans un seul groupe." },
      { t: P.vals[3], fb: "Cela utilise le nombre entier comme numérateur sur le même dénominateur, ce qui n'est pas une addition répétée." }
    ],
    solution, { mode: "model-times-whole", n: P.n, d: P.d, w: P.w });
}, ["Multiplier par un nombre entier veut dire additionner la fraction le même nombre de fois.", "Écris d'abord le total comme une addition répétée de la fraction."]);

// 2. L1, 6.7: estimate a product against benchmarks 0, 1/2, 1.
E("u3-estimate-product-benchmark", 3, ["6.7"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(3, 10), n1 = ri(1, d1 - 1), d2 = ri(3, 10), n2 = ri(1, d2 - 1);
    var p = (n1 / d1) * (n2 / d2);
    var bench = [0, 0.5, 1], bi = 0, best = 9;
    bench.forEach(function (b, i) { var dd = Math.abs(p - b); if (dd < best) { best = dd; bi = i; } });
    if (best > 0.18) continue;
    var second = 9; bench.forEach(function (b, i) { if (i !== bi) second = Math.min(second, Math.abs(p - b)); });
    if (second - best < 0.12) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, p: p, bi: bi };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 3, p: 0.5, bi: 1 };
  var labels = ["0", "\\(" + FR(1, 2) + "\\)", "\\(" + FR(2, 2) + "\\)", "2"];
  var correct = labels[P.bi];
  var distractors = labels.filter(function (l, i) { return i !== P.bi; }).map(function (l) {
    var fb = l === "2" ? "Un produit de deux fractions plus petites que 1 est plus petit que 1, donc il ne peut pas être près de 2." : "Compare d'abord chaque facteur avec \\(" + FR(1, 2) + "\\) : le produit est plus près d'un autre repère.";
    return { t: l, fb: fb };
  });
  var prompt = "Le produit " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + " est le plus proche de quel repère ?";
  var solution = "Estime chaque facteur : \\(" + FR(P.n1, P.d1) + "\\) vaut environ \\(" + fmtD(Math.round(P.n1 / P.d1 * 2) / 2) + "\\) et \\(" + FR(P.n2, P.d2) + "\\) vaut environ \\(" + fmtD(Math.round(P.n2 / P.d2 * 2) / 2) + "\\), et le produit exact est \\(" + fmtD(Math.round(P.p * 1000) / 1000) + "\\). Donc le produit est le plus proche de <b>" + correct + "</b>.";
  return mcq(prompt, { t: correct, fb: "Exact. En estimant d'abord chaque facteur, on place le produit près de ce repère." }, distractors, solution, { mode: "est-product", bi: P.bi });
}, ["Compare chaque fraction avec la moitié avant de multiplier.", "Demande-toi si chaque facteur est petit, près de la moitié ou près de 1."]);

// 3. L1, 6.9: model whole divided by a unit fraction.
E("u3-model-whole-div-frac", 3, ["6.9"], 1, "gen", function () {
  var w = ri(2, 6), d = ri(3, 10);
  var ans = w * d;
  var thing = pick(["entiers", "pizzas entières", "rubans entiers", "litres de jus entiers"]);
  var prompt = "Un diagramme montre \\(" + w + "\\) " + thing + ". Chaque entier est divisé en \\(" + d + "\\) parties égales, ce qui modélise \\(" + w + " \\div " + FR(1, d) + "\\). Combien y a-t-il de parties en tout ?";
  var solution = "Chaque entier donne \\(" + d + "\\) parties : \\[ \\begin{aligned} " + w + " \\div " + FR(1, d) + " &= " + w + " \\times " + d + " \\\\ &= " + ans + " \\end{aligned} \\] Donc il y a <b>" + ans + " parties</b> en tout.";
  return mcq(prompt,
    { t: "" + ans, fb: "Exact. Multiplie le nombre d'entiers par le nombre de parties dans chaque entier." },
    [
      { t: "" + (w + d), fb: "Cela additionne les deux nombres, mais chaque entier contient plusieurs parties." },
      { t: "" + d, fb: "Cela compte les parties d'un seul entier." },
      { t: "" + (w * (d + 1)), fb: "Cela compte une partie de plus dans chaque entier." }
    ],
    solution, { mode: "model-whole-div", w: w, d: d });
}, ["Compte d'abord les parties dans un entier, puis passe à tous les entiers.", "Diviser par une fraction unitaire, c'est demander combien de ces parties entrent."]);

// 4. L1, 6.8: multiply two proper fractions, small denominators.
E("u3-multiply-two-fractions", 3, ["6.8"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(2, 6), n1 = ri(1, d1 - 1), d2 = ri(2, 6), n2 = ri(1, d2 - 1);
    if (d1 === d2 && n1 === n2) continue;
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1 + n2, d1 + d2), u3disp(n1 * n2, d1 + d2), u3disp(n1 + n2, d1 * d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 5, vals: [u3disp(6, 15), u3disp(5, 8), u3disp(6, 8), u3disp(5, 15)] };
  var g1 = u3gcd(P.n1, P.d2), g2 = u3gcd(P.n2, P.d1);
  var prompt = "Multiplie : " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". Donne ta réponse sous sa forme la plus simple.";
  var solution = "Multiplie les numérateurs et multiplie les dénominateurs, en simplifiant d'abord quand c'est possible : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] Donc le produit est <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Exact. Les numérateurs se multiplient, les dénominateurs se multiplient, puis on simplifie." },
    [
      { t: P.vals[1], fb: "Cela additionne les numérateurs et les dénominateurs, ce qui n'est pas la façon de multiplier des fractions." },
      { t: P.vals[2], fb: "Les numérateurs sont multipliés, mais les dénominateurs sont additionnés au lieu d'être multipliés." },
      { t: P.vals[3], fb: "Les dénominateurs sont multipliés, mais les numérateurs sont additionnés au lieu d'être multipliés." }
    ],
    solution, { mode: "mult-basic", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Pour multiplier, aucun dénominateur commun n'est nécessaire.", "Simplifie un numérateur avec un dénominateur avant de multiplier."]);

// 5. L2, 6.5: area model product with a partitioned rectangle figure.
E("u3-area-model-product", 3, ["6.5"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 200 && !P; t++) {
    var d1 = ri(3, 5), n1 = ri(1, d1 - 1), d2 = ri(3, 6), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * n2, d1 * d2), u3disp(n1, d1), u3disp(n2, d2), u3disp(n1 + n2, d1 + d2)];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 2, d1: 3, n2: 3, d2: 4, vals: [u3disp(6, 12), u3disp(2, 3), u3disp(3, 4), u3disp(5, 7)] };
  var prompt = "Un rectangle est divisé en \\(" + P.d1 + "\\) rangées égales et \\(" + P.d2 + "\\) colonnes égales. " + P.n1 + " des rangées et " + P.n2 + " des colonnes sont ombrées, ce qui modélise " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". Quelle fraction du rectangle entier est ombrée dans les deux sens, dans le chevauchement ?";
  var solution = "Le chevauchement couvre \\(" + (P.n1 * P.n2) + "\\) des \\(" + (P.d1 * P.d2) + "\\) petites cellules : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] Donc le chevauchement est <b>" + P.vals[0] + "</b> du rectangle.";
  var q = mcq(prompt,
    { t: P.vals[0], fb: "Exact. Le chevauchement est le produit des deux fractions ombrées." },
    [
      { t: P.vals[1], fb: "C'est seulement la fraction des rangées ombrées, sans les colonnes." },
      { t: P.vals[2], fb: "C'est seulement la fraction des colonnes ombrées, sans les rangées." },
      { t: P.vals[3], fb: "Cela additionne les parties ombrées au lieu de trouver leur chevauchement." }
    ],
    solution, { mode: "area-model", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
  q.figure = u3areaSVG(P.n1, P.d1, P.n2, P.d2);
  return q;
}, ["Le chevauchement est là où l'ombrage des rangées et celui des colonnes se croisent.", "Compte les cellules du chevauchement, puis compte toutes les cellules du rectangle."]);

// 6. L2, 6.6: provide a context, choose the multiplication expression.
E("u3-context-multiply-expression", 3, ["6.6"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "Une recette utilise " + a + " d'un sac de farine, et on prépare " + b + " de la recette. Quelle expression donne la fraction du sac entier utilisée ?"; },
    function (a, b) { return "Dans un jardin, " + a + " du terrain est planté. Dans la partie plantée, " + b + " est en tomates. Quelle expression donne la fraction du terrain entier en tomates ?"; },
    function (a, b) { return "Le réservoir d'un traversier est plein à " + a + ". Pendant une traversée, " + b + " du carburant dans le réservoir est utilisé. Quelle expression donne la fraction d'un réservoir plein utilisée ?"; },
    function (a, b) { return "Une classe passe " + a + " d'une journée d'école en excursion. De ce temps, " + b + " est passé dans l'autobus. Quelle expression donne la fraction de la journée entière passée dans l'autobus ?"; }
  ];
  var d1 = ri(3, 8), n1 = ri(1, d1 - 1), d2 = ri(3, 8), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var mult = "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)";
  var solution = "Prendre une fraction d'une fraction, c'est multiplier : \\[ \\begin{aligned} " + FR(n1, d1) + " \\times " + FR(n2, d2) + " \\end{aligned} \\] Donc l'expression est <b>" + mult + "</b>.";
  return mcq(prompt,
    { t: mult, fb: "Exact. Une fraction d'une fraction se trouve en multipliant." },
    [
      { t: "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)", fb: "La division répond à combien entrent, mais ce contexte prend une partie d'une partie." },
      { t: "\\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\)", fb: "L'addition joint deux quantités séparées, mais la deuxième fraction agit sur la première quantité." },
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "Cela inverse les deux quantités et divise, ce qui ne correspond pas à une partie d'une partie." }
    ],
    solution, { mode: "ctx-mult-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Cherche les mots de ou partie d'une partie dans le contexte.", "Une fraction d'une autre fraction est une multiplication."]);

// 7. L2, 6.8, CR 3: multiply a mixed number by a fraction in context (typed answer).
E("u3-multiply-mixed-cr", 3, ["6.8"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var w = ri(1, 3), d1 = pick([2, 3, 4, 5, 6]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 3, 4, 5, 6, 8]), n2 = ri(1, d2 - 1);
    var imp = w * d1 + n1;
    var rn = imp * n2, rd = d1 * d2;
    if (u3red(rn, rd)[1] > 8) continue;
    P = { w: w, n1: n1, d1: d1, n2: n2, d2: d2, imp: imp, rn: rn, rd: rd };
  }
  if (!P) P = { w: 2, n1: 1, d1: 2, n2: 3, d2: 4, imp: 5, rn: 15, rd: 8 };
  var prompt = "Un sentier de randonnée mesure " + u3disp(P.imp, P.d1) + " km. Un groupe parcourt " + u3disp(P.n2, P.d2) + " du sentier. Combien de kilomètres parcourt-il ? Donne ta réponse comme fraction ou nombre fractionnaire, sous sa forme la plus simple.";
  var rr = u3red(P.rn, P.rd);
  var solution = "Transforme le nombre fractionnaire en fraction impropre, puis multiplie : \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] Donc le groupe parcourt <b>" + u3disp(P.rn, P.rd) + " km</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "mult-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Transforme le nombre fractionnaire en fraction impropre avant de multiplier.", "Commence par réécrire la longueur du sentier comme une seule fraction."]);

// 8. L2, 6.11: estimate a quotient against whole number benchmarks.
E("u3-estimate-quotient-benchmark", 3, ["6.11"], 2, "gen", function () {
  var cats = ["Moins de 1", "Environ 1", "Environ 2", "Plus de 2"];
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
    var q = (n1 / d1) / (n2 / d2);
    var ci = -1;
    if (q < 0.8) ci = 0; else if (q <= 1.3) ci = 1; else if (q >= 1.6 && q <= 2.4) ci = 2; else if (q > 2.6) ci = 3;
    if (ci < 0) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, q: q, ci: ci };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 1, d2: 4, q: 3, ci: 3 };
  var prompt = "Estime le quotient " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Quelle description lui convient le mieux ?";
  var solution = "Diviser par une fraction, c'est demander combien de fois le diviseur entre dans le dividende. Ici, le quotient exact est \\(" + fmtD(Math.round(P.q * 100) / 100) + "\\) : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " = " + fmtD(Math.round(P.q * 100) / 100) + " \\end{aligned} \\] Donc le quotient est <b>" + cats[P.ci].toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: cats[P.ci], fb: "Exact. Le diviseur entre dans le dividende environ ce nombre de fois." },
    cats.filter(function (c, i) { return i !== P.ci; }).map(function (c) { return { t: c, fb: "Compare les tailles : un diviseur plus petit entre plus de fois, donc vérifie combien de diviseurs entrent avant de choisir." }; }),
    solution, { mode: "est-quotient", ci: P.ci });
}, ["Demande-toi combien de fois le diviseur entre dans le dividende.", "Si le diviseur est plus petit que le dividende, le quotient est plus grand que 1."]);

// 9. L2, 6.12: divide a proper fraction by a proper fraction.
E("u3-divide-frac-by-frac", 3, ["6.12"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = ri(2, 9), n1 = ri(1, d1 - 1), d2 = ri(2, 9), n2 = ri(1, d2 - 1);
    var vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * n2, n1 * d2), u3disp(n1 * n2, d1 * d2), u3disp(d1 * n2, n1 * d2) === u3disp(n1 * d2, d1 * n2) ? "x" : u3disp(d1 * d2, n1 * n2)];
    var inv = u3disp(d1 * n2, n1 * d2);
    vals = [u3disp(n1 * d2, d1 * n2), u3disp(d1 * d2, n1 * n2), u3disp(n1 * n2, d1 * d2), inv];
    if (new Set(vals).size < 4) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, vals: vals };
  }
  if (!P) P = { n1: 3, d1: 4, n2: 2, d2: 5, vals: [u3disp(15, 8), u3disp(20, 6), u3disp(6, 20), u3disp(8, 15)] };
  var prompt = "Divise : " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Donne ta réponse sous sa forme la plus simple.";
  var rr = u3red(P.n1 * P.d2, P.d1 * P.n2);
  var solution = "Multiplie par la réciproque du diviseur : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.n1 * P.d2, P.d1 * P.n2) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] Donc le quotient est <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Exact. Seul le diviseur est inversé, puis on multiplie." },
    [
      { t: P.vals[1], fb: "Cela inverse les deux fractions, mais seul le diviseur est inversé." },
      { t: P.vals[2], fb: "Cela multiplie directement sans inverser le diviseur." },
      { t: P.vals[3], fb: "Cela inverse la première fraction au lieu du diviseur." }
    ],
    solution, { mode: "div-frac-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Diviser par une fraction veut dire multiplier par sa réciproque.", "Inverse seulement la deuxième fraction, le diviseur."]);

// 10. L2, 6.10, CR 3: model fraction divided by fraction with a bar figure (typed answer).
E("u3-model-division-bar", 3, ["6.10"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = pick([2, 3, 4, 5, 6, 8]), n1 = ri(1, d1 - 1), d2 = pick([2, 3, 4, 5, 6, 8]);
    var L = (d1 * d2) / u3gcd(d1, d2);
    if (L > 20) continue;
    var shaded = n1 * (L / d1), grp = L / d2;
    if (shaded % grp !== 0) continue;
    var cnt = shaded / grp;
    if (cnt < 2) continue;
    P = { n1: n1, d1: d1, d2: d2, L: L, shaded: shaded, grp: grp, cnt: cnt };
  }
  if (!P) P = { n1: 2, d1: 3, d2: 6, L: 6, shaded: 4, grp: 1, cnt: 4 };
  var item = pick(["bande", "corde", "planche", "ficelle"]);
  var prompt = "Un modèle en bande montre " + u3disp(P.n1, P.d1) + " d'une " + item + " ombrée. La " + item + " est divisée en \\(" + P.L + "\\) petites parties égales, et les marques en gras regroupent les parties en portions de " + u3disp(1, P.d2) + " d'une " + item + " chacune. Combien de portions y a-t-il dans la partie ombrée ?";
  var solution = "Utilise la division commune en \\(" + P.L + "\\) parties : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " &= " + FR(P.shaded, P.L) + " \\\\ " + FR(1, P.d2) + " &= " + FR(P.grp, P.L) + " \\\\ " + P.shaded + " \\div " + P.grp + " &= " + P.cnt + " \\end{aligned} \\] Donc il y a <b>" + P.cnt + " portions</b> dans la partie ombrée.";
  var q = numq(prompt, P.cnt, 0, solution, { mode: "model-div-bar", n1: P.n1, d1: P.d1, d2: P.d2 });
  q.figure = u3barSVG(P.L, P.shaded, P.grp);
  return q;
}, ["Réécris les deux fractions avec les petites parties montrées sur la bande.", "Compte les petites parties ombrées, puis divise par les parties dans une portion."]);

// 11. L2, 6.13, CR 3: divide with a mixed number in context (typed answer).
E("u3-divide-mixed-cr", 3, ["6.13"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var w = ri(2, 5), d1 = pick([2, 3, 4]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 3, 4, 6]), n2 = ri(1, d2 - 1);
    var imp = w * d1 + n1;
    var rn = imp * d2, rd = d1 * n2;
    var rr = u3red(rn, rd);
    if (rr[1] > 4 || rr[0] / rr[1] < 2) continue;
    P = { w: w, n1: n1, d1: d1, n2: n2, d2: d2, imp: imp, rn: rn, rd: rd };
  }
  if (!P) P = { w: 3, n1: 1, d1: 2, n2: 1, d2: 2, imp: 7, rn: 14, rd: 2 };
  var prompt = "Une corde mesure " + u3disp(P.imp, P.d1) + " m. On la coupe en morceaux qui mesurent chacun " + u3disp(P.n2, P.d2) + " m. Combien de morceaux obtient-on ? Donne ta réponse comme nombre, fraction ou nombre fractionnaire, sous sa forme la plus simple.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Transforme le nombre fractionnaire, puis multiplie par la réciproque de la longueur d'un morceau : \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] Donc le nombre de morceaux est <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Transforme d'abord le nombre fractionnaire en fraction impropre.", "Diviser par la longueur d'un morceau, c'est demander combien de morceaux entrent, donc inverse le diviseur et multiplie."]);

// 12. L2, 6.14: provide a context, choose the division expression.
E("u3-context-divide-expression", 3, ["6.14"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "Un ruban de " + a + " m est coupé en morceaux de " + b + " m chacun. Quelle expression donne le nombre de morceaux ?"; },
    function (a, b) { return "Une cruche contient " + a + " L de jus. On le verse également dans des bouteilles qui contiennent chacune " + b + " L. Quelle expression donne le nombre de bouteilles remplies ?"; },
    function (a, b) { return "Une équipe de sentier a " + a + " kg de gravier à étendre en charges de " + b + " kg chacune. Quelle expression donne le nombre de charges ?"; },
    function (a, b) { return "Un réservoir contient " + a + " L d'eau. Chaque arrosoir prend " + b + " L. Quelle expression donne le nombre d'arrosoirs qu'on peut remplir ?"; }
  ];
  var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var div = "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)";
  var solution = "Le contexte demande combien de groupes d'une taille entrent dans un total, ce qui est une division avec le total en premier : \\[ \\begin{aligned} " + FR(n1, d1) + " \\div " + FR(n2, d2) + " \\end{aligned} \\] Donc l'expression est <b>" + div + "</b>.";
  return mcq(prompt,
    { t: div, fb: "Exact. Le total est divisé par la taille de chaque groupe." },
    [
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "Cela met la taille du groupe en premier, mais la division part du total." },
      { t: "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)", fb: "La multiplication prend une partie d'une partie, mais ce contexte compte combien de groupes entrent." },
      { t: "\\(" + FR(n1, d1) + " - " + FR(n2, d2) + "\\)", fb: "La soustraction trouve ce qui reste après un retrait, pas le nombre de groupes." }
    ],
    solution, { mode: "ctx-div-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Demande-toi si le contexte compte des groupes qui entrent dans un total.", "Dans une expression de division, le total vient en premier."]);

// 13. L2, 6.16, CR 2: order of operations with fractions (numeric answer as a decimal).
E("u3-order-of-ops-fractions", 3, ["6.16"], 2, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var d1 = pick([2, 4, 5, 8, 10]), n1 = ri(1, d1 - 1);
    var d2 = pick([2, 4, 5, 8, 10]), n2 = ri(1, d2 - 1);
    var w = ri(2, 6);
    var val = n1 / d1 + (n2 / d2) * w;
    if (Math.abs(val * 1000 - Math.round(val * 1000)) > 1e-9) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, w: w, val: Math.round(val * 1000) / 1000 };
  }
  if (!P) P = { n1: 1, d1: 2, n2: 3, d2: 4, w: 2, val: 2 };
  var prompt = "Calcule : \\(" + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + "\\). Donne ta réponse sous forme décimale.";
  var prod = u3red(P.n2 * P.w, P.d2);
  var solution = "La multiplication se fait avant l'addition : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + " &= " + FR(P.n1, P.d1) + " + " + FR(prod[0], prod[1]) + " \\\\ &= " + fmtD(P.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "ooo-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, w: P.w });
}, ["La multiplication vient avant l'addition dans la priorité des opérations.", "Calcule d'abord la fraction fois le nombre entier."]);

// 14. L2, 6.15: identify the operation a context requires.
E("u3-identify-operation", 3, ["6.15"], 1, "gen", function () {
  var dens = [3, 4, 5, 6, 8];
  function F() { var d = pick(dens); return u3disp(ri(1, d - 1), d); }
  function G() { var d = pick(dens); var n = ri(1, d - 1); return u3disp(d + n, d); }
  var scens = [
    { op: "Multiplication", txt: function () { return "Une recette de muffins demande " + F() + " tasse de baies. On fait " + F() + " de la recette. Quelle opération trouve le nombre de tasses de baies utilisées ?"; } },
    { op: "Multiplication", txt: function () { return "Une corde mesure " + G() + " m. On en utilise " + F() + ". Quelle opération trouve la longueur utilisée ?"; } },
    { op: "Division", txt: function () { return "On coupe une planche de " + G() + " m en étagères de " + F() + " m chacune. Quelle opération trouve le nombre d'étagères ?"; } },
    { op: "Division", txt: function () { return F() + " L de soupe est partagée également en portions de " + F() + " L chacune. Quelle opération trouve le nombre de portions ?"; } },
    { op: "Addition", txt: function () { return "Une personne marche " + F() + " km le matin et " + F() + " km l'après-midi. Quelle opération trouve la distance totale ?"; } },
    { op: "Addition", txt: function () { return "Une cruche contient " + F() + " L d'eau et on y verse " + F() + " L de plus. Quelle opération trouve la quantité d'eau dans la cruche maintenant ?"; } },
    { op: "Soustraction", txt: function () { return "Un réservoir contient " + G() + " L de carburant et " + F() + " L est utilisé pendant un trajet. Quelle opération trouve le carburant qui reste ?"; } },
    { op: "Soustraction", txt: function () { return "Un ruban mesure " + G() + " m et on en coupe un morceau de " + F() + " m. Quelle opération trouve la longueur qui reste ?"; } }
  ];
  var s = pick(scens);
  var ops = ["Addition", "Soustraction", "Multiplication", "Division"];
  var why = { "Multiplication": "Elle prend une fraction d'une quantité.", "Division": "Elle compte combien de groupes d'une taille entrent dans un total.", "Addition": "Elle joint deux quantités en un total.", "Soustraction": "Elle trouve ce qui reste après qu'une partie est enlevée." };
  var prompt = s.txt();
  var solution = "Lis le contexte pour savoir ce qu'on cherche. " + why[s.op] + " Donc l'opération est <b>" + s.op.toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: s.op, fb: "Exact. " + why[s.op] },
    ops.filter(function (o) { return o !== s.op; }).map(function (o) { return { t: o, fb: "Cette opération ne correspond pas à ce que le contexte demande. " + why[o] }; }),
    solution, { mode: "identify-op", op: s.op });
}, ["Décide ce que la réponse mesure : un total, un reste, une partie d'une partie ou un nombre de groupes.", "Associe l'histoire à l'opération avant de regarder les nombres."]);

// 15. L2, 6.12, CR 2: solve a division problem in context (typed answer).
E("u3-divide-word-cr", 3, ["6.12"], 1, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
    var rn = n1 * d2, rd = d1 * n2, rr = u3red(rn, rd);
    if (rr[1] > 6) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, rn: rn, rd: rd };
  }
  if (!P) P = { n1: 5, d1: 6, n2: 1, d2: 3, rn: 15, rd: 6 };
  var prompt = "Un réservoir d'eau contient " + u3disp(P.n1, P.d1) + " L. Chaque bouteille est remplie avec " + u3disp(P.n2, P.d2) + " L. Combien de bouteilles peut-on remplir ? Donne ta réponse comme nombre, fraction ou nombre fractionnaire, sous sa forme la plus simple.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Divise le total par la quantité par bouteille : \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] Donc le nombre de bouteilles est <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-word-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Le total est divisé par la taille d'une bouteille.", "Inverse le diviseur et multiplie."]);

// 16. L3, 6.15 and 6.16: successive fractions of an amount.
E("u3-successive-fractions", 3, ["6.15", "6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 300 && !P; t++) {
    var a = pick([2, 3, 4, 5]), b = pick([2, 3, 4, 5]);
    var M = a * b * ri(2, 6);
    var spent1 = M / a, left1 = M - spent1, spent2 = left1 / b, left2 = left1 - spent2;
    var wrong1 = M - M / a - M / b;
    var wrong2 = left1;
    var wrong3 = M - spent2;
    var vals = [left2, wrong1, wrong2, wrong3];
    if (new Set(vals).size < 4 || wrong1 <= 0) continue;
    P = { a: a, b: b, M: M, spent1: spent1, left1: left1, spent2: spent2, left2: left2, wrong1: wrong1, wrong3: wrong3 };
  }
  if (!P) P = { a: 2, b: 3, M: 36, spent1: 18, left1: 18, spent2: 6, left2: 12, wrong1: 6, wrong3: 30 };
  var prompt = "Maya a " + P.M + " $. Elle dépense " + u3disp(1, P.a) + " de son argent pour un livre. Ensuite, elle dépense " + u3disp(1, P.b) + " de ce qui reste pour un jeu. Combien d'argent, en dollars, lui reste-t-il ?";
  var solution = "Fais une étape à la fois, car la deuxième fraction agit sur ce qui reste : \\[ \\begin{aligned} " + P.M + " \\times " + FR(1, P.a) + " &= " + P.spent1 + " \\\\ " + P.M + " - " + P.spent1 + " &= " + P.left1 + " \\\\ " + P.left1 + " \\times " + FR(1, P.b) + " &= " + P.spent2 + " \\\\ " + P.left1 + " - " + P.spent2 + " &= " + P.left2 + " \\end{aligned} \\] Donc il lui reste <b>" + P.left2 + " $</b>.";
  return mcq(prompt,
    { t: "" + P.left2, fb: "Exact. La deuxième fraction est prise sur le montant qui reste après le premier achat." },
    [
      { t: "" + P.wrong1, fb: "Cela prend les deux fractions sur le total de " + P.M + " $, mais la deuxième fraction agit sur ce qui reste." },
      { t: "" + P.left1, fb: "C'est le montant qui reste après le livre seulement; l'achat du jeu doit encore être enlevé." },
      { t: "" + P.wrong3, fb: "Cela soustrait seulement la deuxième dépense du montant total et oublie le livre." }
    ],
    solution, { mode: "successive-frac", a: P.a, b: P.b, M: P.M });
}, ["La deuxième fraction porte sur le montant qui reste, pas sur le montant de départ.", "Trouve ce qui reste après la première dépense avant d'appliquer la deuxième fraction."]);

// 17. L3, 6.15 and 6.16, CR 3: two step problem, use part then add more (typed answer).
E("u3-mixed-multistep-cr", 3, ["6.15", "6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var d1 = pick([2, 3, 4]), w = ri(2, 5), n1 = ri(1, d1 - 1);
    var imp = w * d1 + n1;
    var d2 = pick([2, 3, 4, 5, 6]), n2 = ri(1, d2 - 1);
    if ((imp * n2) % (d1 * d2) !== 0) continue;
    var used = (imp * n2) / (d1 * d2);
    var d3 = pick([2, 3, 4, 5, 6, 8]), n3 = ri(1, d3 - 1);
    var rn = (imp - used * d1) * d3 + n3 * d1, rd = d1 * d3;
    var rr = u3red(rn, rd);
    if (rr[1] > 8) continue;
    P = { w: w, n1: n1, d1: d1, imp: imp, n2: n2, d2: d2, used: used, n3: n3, d3: d3, rn: rn, rd: rd };
  }
  if (!P) P = { w: 3, n1: 1, d1: 2, imp: 7, n2: 1, d2: 2, used: 3, n3: 1, d3: 4, rn: 9, rd: 4 };
  var leftN = P.imp - P.used * P.d1;
  var prompt = "On a " + u3disp(P.imp, P.d1) + " kg de farine. On en utilise " + u3disp(P.n2, P.d2) + " le matin. Ensuite, on achète " + u3disp(P.n3, P.d3) + " kg de plus. Combien de kilogrammes de farine a-t-on maintenant ? Donne ta réponse comme fraction ou nombre fractionnaire, sous sa forme la plus simple.";
  var solution = "Trouve d'abord la partie utilisée, puis soustrais-la et ajoute la nouvelle farine : \\[ \\begin{aligned} " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + P.used + " \\\\ " + FR(P.imp, P.d1) + " - " + P.used + " &= " + FR(leftN, P.d1) + " \\\\ " + FR(leftN, P.d1) + " + " + FR(P.n3, P.d3) + " &= " + u3plain(P.rn, P.rd) + " \\end{aligned} \\] Donc on a <b>" + u3disp(P.rn, P.rd) + " kg</b> de farine maintenant.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "multistep-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Divise le problème en étapes : trouve la partie utilisée, soustrais, puis ajoute.", "Multiplie d'abord pour trouver la farine utilisée le matin."]);

// 18. L3, 6.16, CR 2: bracketed multiply then divide chain (numeric answer as a decimal).
E("u3-mult-div-chain-cr", 3, ["6.16"], 3, "gen", function () {
  var P = null;
  for (var t = 0; t < 400 && !P; t++) {
    var pool = [2, 4, 5, 8, 10];
    var d1 = pick(pool), n1 = ri(1, d1 - 1), d2 = pick(pool), n2 = ri(1, d2 - 1), d3 = pick(pool), n3 = ri(1, d3 - 1);
    var d4 = pick(pool), n4 = ri(1, d4 - 1);
    var val = (n1 / d1) * (n2 / d2) / (n3 / d3) + n4 / d4;
    if (Math.abs(val * 1000 - Math.round(val * 1000)) > 1e-9) continue;
    if (val <= 0) continue;
    P = { n1: n1, d1: d1, n2: n2, d2: d2, n3: n3, d3: d3, n4: n4, d4: d4, val: Math.round(val * 1000) / 1000 };
  }
  if (!P) P = { n1: 1, d1: 2, n2: 3, d2: 4, n3: 1, d3: 2, n4: 1, d4: 4, val: 1 };
  var prompt = "Calcule : \\(\\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + "\\). Donne ta réponse sous forme décimale.";
  var step1 = fmtD(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) * 1000) / 1000);
  var step2 = fmtD(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) / (P.n3 / P.d3) * 1000) / 1000);
  var solution = "Fais d'abord les parenthèses, puis la division, puis l'addition : \\[ \\begin{aligned} \\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " &= " + step1 + " \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " \\\\ &= " + step2 + " + " + FR(P.n4, P.d4) + " \\\\ &= " + fmtD(P.val) + " \\end{aligned} \\] Donc la valeur est <b>" + fmtD(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "chain-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Les parenthèses d'abord, puis la division, puis l'addition.", "Commence par le produit entre parenthèses."]);

// 19. L3, 6.7 and 6.11: reasoning about products and quotients (variant set).
E("u3-estimate-reasoning-var", 3, ["6.7", "6.11"], 3, "var", varset([
  function () {
    var prompt = "Quel énoncé au sujet du produit \\(" + FR(7, 8) + " \\times " + FR(8, 9) + "\\) est vrai ?";
    var solution = "Les deux facteurs sont plus petits que 1, donc le produit est plus petit que chaque facteur : \\[ \\begin{aligned} " + FR(7, 8) + " \\times " + FR(8, 9) + " &= " + FR(56, 72) + " = " + FR(7, 9) + " \\end{aligned} \\] Comme \\(" + FR(7, 9) + "\\) est plus petit que \\(" + FR(7, 8) + "\\), le produit est <b>plus petit que \\(" + FR(7, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "Le produit est plus petit que \\(" + FR(7, 8) + "\\)", fb: "Exact. Multiplier par une fraction plus petite que 1 réduit la quantité." },
      [
        { t: "Le produit est plus grand que 1", fb: "Un produit de deux nombres plus petits que 1 reste plus petit que 1." },
        { t: "Le produit est plus grand que \\(" + FR(8, 9) + "\\)", fb: "Le produit est plus petit que les deux facteurs, pas plus grand." },
        { t: "Le produit est égal à \\(" + FR(7, 8) + "\\)", fb: "Cela arriverait seulement si l'autre facteur était exactement 1." }
      ],
      solution, { mode: "reason-product-shrink" });
  },
  function () {
    var prompt = "Quel énoncé au sujet du quotient \\(" + FR(3, 4) + " \\div " + FR(1, 8) + "\\) est vrai ?";
    var solution = "Le diviseur est petit, donc il entre plusieurs fois : \\[ \\begin{aligned} " + FR(3, 4) + " \\div " + FR(1, 8) + " &= " + FR(3, 4) + " \\times 8 \\\\ &= 6 \\end{aligned} \\] Donc le quotient est <b>plus grand que \\(" + FR(3, 4) + "\\)</b>.";
    return mcq(prompt,
      { t: "Le quotient est plus grand que \\(" + FR(3, 4) + "\\)", fb: "Exact. Diviser par une fraction plus petite que 1 donne un résultat plus grand." },
      [
        { t: "Le quotient est plus petit que \\(" + FR(1, 8) + "\\)", fb: "Le quotient compte combien de huitièmes entrent, et plusieurs entrent." },
        { t: "Le quotient est égal à \\(" + FR(3, 4) + "\\)", fb: "Cela arriverait seulement si le diviseur était exactement 1." },
        { t: "Le quotient est entre 0 et 1", fb: "Un diviseur plus petit que le dividende donne un quotient plus grand que 1." }
      ],
      solution, { mode: "reason-quotient-grow" });
  },
  function () {
    var prompt = "Quel énoncé au sujet du produit \\(" + FR(5, 6) + " \\times " + FR(2, 3) + "\\) est vrai ?";
    var solution = "Les deux facteurs sont plus petits que 1, et le produit est sous le plus petit facteur : \\[ \\begin{aligned} " + FR(5, 6) + " \\times " + FR(2, 3) + " &= " + FR(10, 18) + " = " + FR(5, 9) + " \\end{aligned} \\] Comme \\(" + FR(5, 9) + "\\) est plus petit que \\(" + FR(2, 3) + "\\), le produit est <b>plus petit que \\(" + FR(2, 3) + "\\)</b>.";
    return mcq(prompt,
      { t: "Le produit est plus petit que \\(" + FR(2, 3) + "\\)", fb: "Exact. Le produit de deux fractions plus petites que 1 est plus petit que chacune d'elles." },
      [
        { t: "Le produit est entre \\(" + FR(2, 3) + "\\) et \\(" + FR(5, 6) + "\\)", fb: "Multiplier par une fraction plus petite que 1 fait passer sous le plus petit facteur, pas entre les deux." },
        { t: "Le produit est plus grand que \\(" + FR(5, 6) + "\\)", fb: "Le produit ne peut pas dépasser le plus grand facteur quand l'autre facteur est plus petit que 1." },
        { t: "Le produit est égal à 1", fb: "Seuls des facteurs réciproques l'un de l'autre se multiplient pour donner 1." }
      ],
      solution, { mode: "reason-product-below-both" });
  }
]), ["Multiplier par une fraction plus petite que 1 rend une quantité plus petite; diviser par une telle fraction la rend plus grande.", "Compare chaque facteur ou diviseur avec 1 avant de décider."]);

/* ----- bank-u4.js ----- */
// Math 8 (French) Unit 4 Measuring Prisms and Cylinders question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 1392 to 1886).
// CRMARKS: u4-sa-cylinder=3
// CRMARKS: u4-sa-open-tank=3
// CRMARKS: u4-sa-problem-wrap=2
// CRMARKS: u4-sa-rect-prism=3
// CRMARKS: u4-sa-tri-prism=3
// CRMARKS: u4-vol-cylinder-diam=2
// CRMARKS: u4-vol-tri-prism=2
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 4 (Measuring Prisms and Cylinders), entries u4-*.
   Translated per RULES.md and GLOSSARY.md (grade 8 specifics).

   Judgement calls:
   - Surface area is "aire totale" in grade 8 (not grade 9 "aire de la
     surface"), and the worked-solution abbreviation SA becomes AT.
   - Net is "développement". Right rectangular prism is "prisme droit à
     base rectangulaire", right triangular prism is "prisme droit à base
     triangulaire", right cylinder is "cylindre droit", square-based
     pyramid is "pyramide à base carrée".
   - "Legs" of the triangular ends rendered "cathètes".
   - Tank names rendered "Réservoir A" to "Réservoir D"; personal names
     kept unchanged (Ren, Sofia, Marcus).
   - "Can of paint" rendered "pot de peinture".
   - Formula symbols V, B, h, l, w, r kept unchanged; only SA changed
     to AT, per the grade 8 abbreviation rule.

   FMT-GEOM lines left as fmt(: none. The figure helpers in this chunk
   contain no fmt( calls; every display fmt( in prompts, options and
   worked solutions became fmtD(. There are no fmtF( calls.

   Literal formatted numbers written into static prose:
   - Decimal commas: pi = 3,14 in prompts and worked solutions (the JS
     numeric literal 3.14 in code outside strings is unchanged);
     50,24 ; 301,44 ; 100,48 ; 56,24 in u4-base-volume-link.
   - Thousands: 1 808,64 (no-break space) in u4-base-volume-link.
   - Percent literals: none in this chunk.
   - Dollar literals: none in this chunk.

   Unsure about: nothing blocking.
*/
/* Unit 4: Measuring Prisms and Cylinders */
function u4r1(x){return Math.round(x*10)/10;}
function u4r2(x){return Math.round(x*100)/100;}
function u4d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u4boxSVG(l,w,h){
  var s='<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(125,172,l+" cm",13,false);
  s+=_txt(56,115,h+" cm",13,false);
  s+=_txt(212,26,w+" cm",13,false);
  return s+"</svg>";
}
function u4triSVG(a,b,c,L){
  var s='<svg viewBox="0 0 310 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(105,166,b+" cm",13,false);
  s+=_txt(44,110,a+" cm",13,false);
  s+=_txt(96,84,c+" cm",13,false);
  s+=_txt(198,32,L+" cm",13,false);
  return s+"</svg>";
}
function u4cylSVG(r,h,useD){
  var s='<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(useD){
    s+='<line x1="94" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(150,30,(2*r)+" cm",13,false);
  } else {
    s+='<line x1="150" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(178,40,r+" cm",13,false);
  }
  s+=_txt(224,104,h+" cm",13,false);
  return s+"</svg>";
}
function u4netSVG(kind,v1,v2,v3){
  var s='<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">';
  if(kind==="rect"){
    s+='<rect x="110" y="60" width="70" height="46" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="40" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="14" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+=_txt(145,50,v1+" cm",12,false);
    s+=_txt(145,170,v2+" cm",12,false);
    s+=_txt(268,86,v3+" cm",12,false);
  } else if(kind==="tri"){
    s+='<rect x="30" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="96" y="70" width="66" height="44" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="162" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,70 162,70 129,30" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,114 162,114 129,154" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+=_txt(129,168,v1+" cm",12,false);
    s+=_txt(246,96,v2+" cm",12,false);
    s+=_txt(178,44,v3+" cm",12,false);
  } else {
    s+='<rect x="80" y="62" width="140" height="56" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="34" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="146" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<line x1="150" y1="34" x2="176" y2="34" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    s+=_txt(150,140,"",12,false);
    s+=_txt(238,94,v1+" cm",12,false);
    s+=_txt(196,26,v2+" cm",12,false);
    s+=_txt(150,182,v3+" cm",12,false);
  }
  return s+"</svg>";
}
function u4mini(kind,ox){
  var s="";
  if(kind==="rect"){
    s+='<rect x="'+(ox+28)+'" y="55" width="22" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+6)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+50)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="37" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="73" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="91" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(kind==="tri"){
    s+='<rect x="'+(ox+4)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+26)+'" y="55" width="22" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+48)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+26)+',55 '+(ox+48)+',55 '+(ox+37)+',38" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+26)+',73 '+(ox+48)+',73 '+(ox+37)+',90" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(kind==="cyl"){
    s+='<rect x="'+(ox+16)+'" y="50" width="44" height="28" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<circle cx="'+(ox+38)+'" cy="37" r="11" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<circle cx="'+(ox+38)+'" cy="91" r="11" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else {
    s+='<rect x="'+(ox+27)+'" y="52" width="24" height="24" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',52 '+(ox+51)+',52 '+(ox+39)+',34" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',76 '+(ox+51)+',76 '+(ox+39)+',94" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',52 '+(ox+27)+',76 '+(ox+10)+',64" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+51)+',52 '+(ox+51)+',76 '+(ox+68)+',64" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  }
  return s;
}

E("u4-net-match", 4, ["10.1"], 1, "gen", function(){
  var kind=pick(["rect","tri","cyl"]);
  var v1=ri(3,14), v2=ri(3,14), v3=ri(3,14);
  var names={rect:"Prisme droit à base rectangulaire", tri:"Prisme droit à base triangulaire", cyl:"Cylindre droit"};
  var others=["Prisme droit à base rectangulaire","Prisme droit à base triangulaire","Cylindre droit","Pyramide à base carrée"].filter(function(n){return n!==names[kind];});
  var opts=others.map(function(n){return {t:n, fb:"Compte les formes dans le développement et imagine le pliage : cet objet a un ensemble de faces différent."};});
  var q=mcq("Le schéma montre un développement à plat. Quel objet à trois dimensions ce développement forme-t-il une fois plié ?",
    {t:names[kind], fb:"Oui : les formes du développement sont exactement les faces de cet objet."}, opts,
    "Imagine chaque rabat qui se plie autour de la pièce centrale ombrée. Les formes plates deviennent les faces du solide, et ce développement forme un <b>"+names[kind].toLowerCase()+"</b>.",
    {mode:kind, v1:v1, v2:v2, v3:v3});
  q.figure=u4netSVG(kind,v1,v2,v3);
  return q;
}, ["Compte chaque forme dans le développement et pense aux faces dont l'objet fini a besoin.", "Commence par la pièce centrale ombrée et imagine chaque rabat qui se plie autour d'elle."]);

E("u4-faces-identify", 4, ["10.3"], 1, "gen", function(){
  var kind=pick(["rect","tri","cyl"]);
  var a=ri(3,12), b=ri(3,12), c=ri(4,15), L=ri(5,16);
  var prompt, correct, cands, sol, fig;
  if(kind==="rect"){
    prompt="Un prisme droit à base rectangulaire a une longueur de "+a+" cm, une largeur de "+b+" cm et une hauteur de "+c+" cm. Combien de faces a-t-il en tout ?";
    correct=6; cands=[5,4,8,12,3];
    sol="Un prisme rectangulaire a un devant et un dos, un côté gauche et un côté droit, et un dessus et un dessous : \\[ 2+2+2 = 6 \\] Il a <b>6 faces</b>.";
    fig=u4boxSVG(a,b,c);
  } else if(kind==="tri"){
    prompt="Un prisme droit à base triangulaire mesure "+L+" cm de long, et chaque extrémité triangulaire a des côtés de "+a+" cm, "+b+" cm et "+c+" cm. Combien de faces a-t-il en tout ?";
    correct=5; cands=[6,4,7,9,3];
    sol="Un prisme triangulaire a 2 extrémités triangulaires et 3 côtés rectangulaires : \\[ 2+3 = 5 \\] Il a <b>5 faces</b>.";
    fig=u4triSVG(a,b,c,L);
  } else {
    prompt="Un cylindre droit a un rayon de "+a+" cm et une hauteur de "+L+" cm. Combien de faces planes a-t-il ?";
    correct=2; cands=[1,3,0,4,5];
    sol="Un cylindre a un cercle plat en haut et un cercle plat en bas. Le côté est courbé, donc ce n'est pas une face plane. Il a <b>2 faces planes</b>.";
    fig=u4cylSVG(a,L,false);
  }
  var ds=u4d3(correct,cands);
  var opts=ds.map(function(d){return {t:String(d), fb:"Recompte, une sorte de face à la fois : les extrémités, puis les côtés, puis le dessus et le dessous."};});
  var q=mcq(prompt, {t:String(correct), fb:"Oui : ce compte couvre chaque face du solide exactement une fois."}, opts, sol, {mode:kind, a:a, b:b, L:L});
  q.figure=fig;
  return q;
}, ["Dresse d'abord la liste des faces par sorte : extrémités, côtés, dessus et dessous.", "Compte les faces d'une sorte, puis additionne les comptes des autres sortes."]);

E("u4-vol-base-times-height", 4, ["9.7"], 1, "gen", function(){
  var B=ri(8,60), h=ri(3,15);
  var obj=pick(["prisme droit","prisme droit à base triangulaire","prisme droit à base rectangulaire"]);
  var q=numq("Un "+obj+" a une base d'aire "+B+" cm\\(^{2}\\) et une hauteur de "+h+" cm. Trouve son volume, en centimètres cubes.", B*h, 0.01,
    "Le volume d'un prisme droit est l'aire de la base multipliée par la hauteur : \\[ \\begin{aligned} V &= B \\times h \\\\ &= "+B+" \\times "+h+" \\\\ &= "+(B*h)+" \\end{aligned} \\] Le volume est <b>"+(B*h)+" cm\\(^{3}\\)</b>.",
    {mode:"base-height", B:B, h:h}); q.figure=m8PrismBaseSVG(obj==="prisme droit \u00E0 base triangulaire"?"tri":(obj==="prisme droit \u00E0 base rectangulaire"?"rect":"generic"), B+" cm\u00B2", h+" cm"); return q;
}, ["Pour tout prisme droit, le volume est l'aire de la base multipliée par la hauteur.", "Multiplie l'aire de la base donnée par la hauteur donnée."]);

E("u4-sa-from-net", 4, ["9.3"], 1, "gen", function(){
  var l=ri(3,11), w=ri(3,11), h=ri(2,9);
  var top=l*w, front=l*h, side=w*h;
  var sa=2*(top+front+side);
  var once=top+front+side;
  var ds=u4d3(sa,[once,2*top+front+side,top+2*front+2*side,sa+top,4*(top+front+side)]);
  var opts=ds.map(function(d){
    var fb=(d===once)?"Cela additionne chaque face différente une seule fois : chaque face d'un prisme a une face correspondante en face d'elle.":"Ce total compte une face deux fois de trop ou en oublie une : chacune des trois aires de faces doit apparaître exactement deux fois.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("Un développement d'un prisme droit à base rectangulaire a trois aires de faces différentes : "+top+" cm\\(^{2}\\) pour le dessus, "+front+" cm\\(^{2}\\) pour le devant et "+side+" cm\\(^{2}\\) pour le côté. Quelle est l'aire totale du prisme, en centimètres carrés ?",
    {t:String(sa), fb:"Oui : chaque aire de face apparaît deux fois, une fois pour chaque côté du prisme."}, opts,
    "L'aire totale est l'aire totale des faces à deux dimensions du développement. Chaque face différente a une face identique en face d'elle : \\[ \\begin{aligned} AT &= 2("+top+"+"+front+"+"+side+") \\\\ &= 2("+once+") \\\\ &= "+sa+" \\end{aligned} \\] L'aire totale est <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"net-areas", l:l, w:w, h:h}); q.figure=m8NetAreaSVG(top,front,side); return q;
}, ["L'aire totale est la somme des aires de toutes les faces planes du développement.", "Additionne les trois aires de faces différentes, puis double le total parce que chaque face a une face correspondante."]);

E("u4-net-choose", 4, ["10.11"], 2, "gen", function(){
  var target=pick(["rect","tri","cyl"]);
  var names={rect:"prisme droit à base rectangulaire", tri:"prisme droit à base triangulaire", cyl:"cylindre droit"};
  var kinds=[target].concat(["rect","tri","cyl","pyr"].filter(function(k){return k!==target;})).slice(0,4);
  kinds=shuffle(kinds);
  var letter="ABCD"[kinds.indexOf(target)];
  var svg='<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">';
  for(var i=0;i<4;i++){ svg+=u4mini(kinds[i],i*80); svg+=_txt(i*80+39,132,"ABCD"[i],14,true); }
  svg+="</svg>";
  var opts=["A","B","C","D"].filter(function(x){return x!==letter;}).map(function(x){
    return {t:"Développement "+x, fb:"Imagine ce développement qui se plie : ses formes forment un objet différent de celui qui est nommé."};
  });
  var q=mcq("Quatre développements sont montrés, étiquetés A, B, C et D. Quel développement forme un "+names[target]+" une fois plié ?",
    {t:"Développement "+letter, fb:"Oui : ses formes plates sont exactement les faces d'un "+names[target]+"."}, opts,
    "Fais correspondre les formes plates aux faces d'un "+names[target]+". Un seul développement a les bonnes formes dans un arrangement qui se plie ensemble, et c'est le <b>développement "+letter+"</b>.",
    {mode:target, letter:letter});
  q.figure=svg;
  return q;
}, ["Dresse la liste des faces dont l'objet nommé a besoin, puis vérifie chaque développement pour ces formes.", "Un cylindre a besoin de cercles, un prisme triangulaire a besoin de triangles, et un prisme rectangulaire a besoin seulement de rectangles."]);

E("u4-net-predict", 4, ["10.2","10.1"], 1, "var", varset([
  function(){
    var q=mcq("Un développement plat est formé de 2 triangles et de 3 rectangles joints bord à bord. Quel objet peut-on former en pliant ce développement ?",
      {t:"Prisme droit à base triangulaire", fb:"Oui : les triangles deviennent les extrémités et les rectangles s'enroulent autour pour former les côtés."},
      [{t:"Cylindre droit", fb:"Un développement de cylindre a besoin de cercles pour ses extrémités : ce développement n'en a aucun."},
       {t:"Prisme droit à base rectangulaire", fb:"Un prisme rectangulaire a seulement des faces rectangulaires : les 2 triangles l'excluent."},
       {t:"Pyramide à base carrée", fb:"Une pyramide a une base et des côtés triangulaires qui se rejoignent en un point : ces rectangles forment des côtés à la place."}],
      "Les 2 triangles deviennent les deux extrémités, et les 3 rectangles se plient autour pour les joindre. L'objet est un <b>prisme droit à base triangulaire</b>.",
      {mode:"static-tri-net"}); q.figure=m8NetPlainSVG("tri",null); return q;
  },
  function(){
    var q=mcq("Un développement plat est formé d'un long rectangle avec un cercle joint à un long bord et un cercle correspondant joint à l'autre long bord. Quel objet peut-on former en pliant et en roulant ce développement ?",
      {t:"Cylindre droit", fb:"Oui : le rectangle s'enroule pour former le côté courbé et les cercles ferment les extrémités."},
      [{t:"Prisme droit à base triangulaire", fb:"Un prisme triangulaire a besoin d'extrémités triangulaires : ce développement a des cercles à la place."},
       {t:"Prisme droit à base rectangulaire", fb:"Un prisme rectangulaire est formé seulement de rectangles : les cercles l'excluent."},
       {t:"Pyramide à base carrée", fb:"Une pyramide a des côtés triangulaires qui se rejoignent en un point : rien ici ne se plie en un point."}],
      "Le long rectangle s'enroule pour former un côté courbé, et les deux cercles deviennent le dessus et le dessous. L'objet est un <b>cylindre droit</b>.",
      {mode:"static-cyl-net"}); q.figure=m8NetPlainSVG("cyl",null); return q;
  },
  function(){
    var q=mcq("Un développement plat est formé de 6 rectangles disposés en forme de croix, qui forment 3 paires correspondantes. Quel objet peut-on former en pliant ce développement ?",
      {t:"Prisme droit à base rectangulaire", fb:"Oui : les 3 paires deviennent le devant et le dos, les côtés, et le dessus et le dessous."},
      [{t:"Cylindre droit", fb:"Un développement de cylindre a besoin de cercles pour ses extrémités : ce développement n'en a aucun."},
       {t:"Prisme droit à base triangulaire", fb:"Un prisme triangulaire a besoin de 2 faces triangulaires : chaque pièce ici est un rectangle."},
       {t:"Pyramide à base carrée", fb:"Une pyramide a besoin de faces triangulaires qui se rejoignent en un point : ces rectangles se plient en forme de boîte."}],
      "Six rectangles en 3 paires correspondantes se plient pour former les faces opposées d'une forme de boîte. L'objet est un <b>prisme droit à base rectangulaire</b>.",
      {mode:"static-rect-net"}); q.figure=m8NetPlainSVG("rect",null); return q;
  }
]), ["Trie d'abord les formes plates : les triangles, les rectangles et les cercles pointent chacun vers un solide différent.", "Fais correspondre les formes des extrémités du développement aux extrémités de l'objet qu'il formera."]);

E("u4-net-build-parts", 4, ["10.12"], 1, "gen", function(){
  var mode=pick(["tri","cyl","rect","incomplete-tri","incomplete-cyl"]);
  if(mode==="tri"){
    var Lt=ri(5,18), at=ri(3,12), bt=ri(3,12);
    var q=mcq("Ren découpe des pièces plates pour construire un prisme droit à base triangulaire à partir d'un développement. Le prisme mesure "+Lt+" cm de long et ses extrémités triangulaires ont des cathètes de "+at+" cm et de "+bt+" cm. De quel ensemble de pièces le développement a-t-il besoin ?",
      {t:"2 triangles et 3 rectangles", fb:"Oui : des triangles pour les deux extrémités et des rectangles pour les trois côtés."},
      [{t:"2 triangles et 4 rectangles", fb:"C'est un rectangle de trop : un prisme triangulaire a seulement 3 côtés rectangulaires."},
       {t:"3 triangles et 2 rectangles", fb:"Les comptes sont inversés : ce prisme a 2 extrémités et 3 côtés."},
       {t:"2 cercles et 3 rectangles", fb:"Les cercles appartiennent au développement d'un cylindre : ce prisme a des extrémités triangulaires."}],
      "Un prisme droit à base triangulaire a 2 extrémités triangulaires et 3 côtés rectangulaires, donc son développement a besoin de <b>2 triangles et 3 rectangles</b>.",
      {mode:"tri-parts"}); q.figure=m8TriPrismLabSVG(at+" cm",bt+" cm",Lt+" cm"); return q;
  }
  if(mode==="cyl"){
    var rc=ri(2,10), hc=ri(4,16);
    var q=mcq("Sofia découpe des pièces plates pour construire un cylindre droit à partir d'un développement. Le cylindre a un rayon de "+rc+" cm et une hauteur de "+hc+" cm. De quel ensemble de pièces le développement a-t-il besoin ?",
      {t:"2 cercles et 1 rectangle", fb:"Oui : le rectangle s'enroule pour former le côté courbé et les cercles ferment les extrémités."},
      [{t:"2 cercles et 2 rectangles", fb:"Un seul rectangle suffit pour le côté courbé : un deuxième n'a nulle part où se plier."},
       {t:"1 cercle et 1 rectangle", fb:"Un cylindre a deux extrémités rondes, le dessus et le dessous : un seul cercle laisse une extrémité ouverte."},
       {t:"2 triangles et 1 rectangle", fb:"Les triangles appartiennent au développement d'un prisme : un cylindre a des extrémités rondes à la place."}],
      "Un cylindre droit a 2 extrémités circulaires et 1 côté courbé qui se déroule en un rectangle, donc son développement a besoin de <b>2 cercles et 1 rectangle</b>.",
      {mode:"cyl-parts"}); q.figure=u4cylSVG(rc,hc,false); return q;
  }
  if(mode==="rect"){
    var lr=ri(4,15), wr=ri(3,12), hr=ri(2,10);
    var q=mcq("Marcus découpe des pièces plates pour construire un prisme droit à base rectangulaire à partir d'un développement. Le prisme mesure "+lr+" cm de long, "+wr+" cm de large et "+hr+" cm de haut. De quel ensemble de pièces le développement a-t-il besoin ?",
      {t:"6 rectangles en 3 paires correspondantes", fb:"Oui : chaque paire forme deux faces opposées du prisme."},
      [{t:"6 rectangles tous de la même taille", fb:"Six rectangles égaux formeraient un cube : un prisme rectangulaire général a 3 paires différentes."},
       {t:"4 rectangles et 2 carrés de la même taille", fb:"Cet ensemble fonctionne seulement pour un prisme spécial : le développement complet est 6 rectangles en paires."},
       {t:"5 rectangles et 1 triangle", fb:"Un prisme rectangulaire n'a aucune face triangulaire."}],
      "Un prisme droit à base rectangulaire a 6 faces, et les faces opposées correspondent, donc son développement a besoin de <b>6 rectangles en 3 paires correspondantes</b>.",
      {mode:"rect-parts"}); q.figure=u4boxSVG(lr,wr,hr); return q;
  }
  if(mode==="incomplete-tri"){
    var L=ri(5,14);
    var q=mcq("Un développement inachevé pour un prisme droit à base triangulaire, de "+L+" cm de long, montre les 3 rectangles en rangée mais rien d'autre. Quelles pièces doit-on ajouter pour compléter le développement ?",
      {t:"2 triangles correspondants, un de chaque côté de la rangée", fb:"Oui : les deux extrémités triangulaires sont les seules faces qui manquent encore."},
      [{t:"2 rectangles correspondants, un de chaque côté de la rangée", fb:"Des rectangles ajouteraient des côtés supplémentaires : les faces manquantes sont les deux extrémités."},
       {t:"1 triangle au milieu de la rangée", fb:"Un seul triangle forme une seule extrémité : le prisme a besoin d'une extrémité de chaque côté."},
       {t:"2 cercles correspondants, un de chaque côté de la rangée", fb:"Les cercles sont les extrémités d'un cylindre : ce prisme a des extrémités triangulaires."}],
      "Les 3 rectangles forment les côtés, donc il manque seulement les 2 extrémités. Les pièces à ajouter sont <b>2 triangles correspondants, un de chaque côté de la rangée</b>.",
      {mode:"incomplete-tri", L:L}); q.figure=m8NetPlainSVG("inctri",null); return q;
  }
  var r=ri(3,9);
  var q=mcq("Un développement inachevé pour un cylindre droit montre le long rectangle et un cercle de rayon "+r+" cm. Quelle pièce doit-on ajouter pour compléter le développement ?",
    {t:"Un deuxième cercle de rayon "+r+" cm", fb:"Oui : la deuxième extrémité doit correspondre exactement au premier cercle."},
    [{t:"Un deuxième cercle de rayon "+(2*r)+" cm", fb:"Ce cercle est trop grand : les deux extrémités d'un cylindre ont la même taille."},
     {t:"Un carré de côté "+r+" cm", fb:"Un carré ne peut pas fermer une extrémité ronde : la face manquante est un cercle."},
     {t:"Un deuxième rectangle de la même taille que le premier", fb:"Le côté courbé est déjà complet : la pièce manquante est l'autre extrémité."}],
    "Un cylindre a deux extrémités circulaires correspondantes, et il en manque encore une. La pièce à ajouter est <b>un deuxième cercle de rayon "+r+" cm</b>.",
    {mode:"incomplete-cyl", r:r}); q.figure=m8NetPlainSVG("inccyl",r+" cm"); return q;
}, ["Compte les faces de l'objet fini, puis fais correspondre les pièces plates à ces faces.", "Nomme d'abord les extrémités de l'objet, puis compte les côtés qui les joignent."]);

E("u4-sa-rect-prism", 4, ["9.4"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Trouve l'aire totale du prisme droit à base rectangulaire montré, en centimètres carrés.", sa, 0.01,
    "Travaille face par face. Le devant et le dos mesurent "+l+" sur "+h+", les côtés mesurent "+w+" sur "+h+", et le dessus et le dessous mesurent "+l+" sur "+w+" : \\[ \\begin{aligned} AT &= 2(lw+lh+wh) \\\\ &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= 2("+fmtD(l*w+l*h+w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] L'aire totale est <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Imagine le développement : trois faces différentes, chacune avec une face correspondante.", "Trouve l'aire du dessus, du devant et d'un côté, additionne-les, puis double."]);

E("u4-sa-tri-prism", 4, ["9.4"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var sa=a*b+(a+b+c)*L;
  var q=numq("Trouve l'aire totale du prisme droit à base triangulaire montré, en centimètres carrés.", sa, 0.01,
    "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} AT &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+sa+" \\end{aligned} \\] L'aire totale est <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"tri-sa", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Divise la surface en deux extrémités triangulaires et trois rectangles.", "Trouve d'abord les extrémités, puis multiplie le périmètre d'une extrémité par la longueur pour les rectangles."]);

E("u4-sa-cylinder", 4, ["9.6"], 2, "gen", function(){
  var r=ri(2,9), h=ri(3,14);
  var sa=u4r1(2*3.14*r*(r+h));
  var q=numq("Trouve l'aire totale du cylindre droit montré. Utilise \\(\\pi = 3,14\\) et donne ta réponse en centimètres carrés, avec une décimale.", sa, 0.6,
    "Deux cercles plus le côté courbé, qui se déroule en un rectangle : \\[ \\begin{aligned} AT &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3,14)("+r+")("+r+"+"+h+") \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire totale est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-sa", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Déroule le cylindre dans ta tête : deux cercles et un rectangle.", "Utilise le rayon pour les aires des deux cercles et pour la largeur autour du côté courbé."]);

E("u4-sa-problem-wrap", 4, ["9.5"], 2, "gen", function(){
  if(pick(["cans","paper"])==="cans"){
    var l=ri(4,10), w=ri(3,9), h=ri(3,8);
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([20,25,30,40,50]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q=numq("Une boîte de rangement en forme de prisme droit à base rectangulaire mesure "+l+" m de long, "+w+" m de large et "+h+" m de haut. Elle est peinte sur toutes ses faces extérieures. Un pot de peinture couvre "+cover+" mètres carrés. Combien de pots de peinture sont nécessaires ?", cans, 0.01,
      "Trouve d'abord l'aire totale, puis divise par la surface couverte et arrondis vers le haut : \\[ \\begin{aligned} AT &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] Puis \\("+sa+" \\div "+cover+" \\approx "+fmtD(u4r2(sa/cover))+"\\), et on ne peut pas acheter un pot partiel. Le nombre de pots nécessaires est <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover}); q.figure=m8BoxLabSVG(l+" m",w+" m",h+" m",false); return q;
  }
  var l2=ri(20,60)/2, w2=ri(16,44)/2, h2=ri(12,36)/2;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var q=numq("Une boîte-cadeau en forme de prisme droit à base rectangulaire mesure "+fmtD(l2)+" cm de long, "+fmtD(w2)+" cm de large et "+fmtD(h2)+" cm de haut. Le papier d'emballage couvre toutes les faces sans chevauchement. Combien de centimètres carrés de papier sont nécessaires ?", sa2, 0.01,
    "Le papier doit couvrir toute la surface de la boîte : \\[ \\begin{aligned} AT &= 2("+fmtD(l2*w2)+"+"+fmtD(l2*h2)+"+"+fmtD(w2*h2)+") \\\\ &= "+fmtD(sa2)+" \\end{aligned} \\] Le papier nécessaire est <b>"+fmtD(sa2)+" cm\\(^{2}\\)</b>.",
    {mode:"wrap-paper", l:l2, w:w2, h:h2}); q.figure=m8BoxLabSVG(fmtD(l2)+" cm",fmtD(w2)+" cm",fmtD(h2)+" cm",false); return q;
}, ["Calcule l'aire totale avant d'utiliser la surface couverte ou de finir le problème.", "Divise l'aire totale par la surface couverte par pot et arrondis vers le haut, car on ne peut pas acheter un pot partiel."]);

E("u4-vol-rect-prism", 4, ["9.11"], 1, "gen", function(){
  var l=ri(3,13), w=ri(2,11), h=ri(2,10);
  var V=l*w*h;
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(V,[sa,l+w+h,l*w,l*w*h+l,l*w*(h+1),l*(w+1)*h]);
  var opts=ds.map(function(d){
    var fb=(d===sa)?"C'est l'aire totale en unités carrées : le volume compte l'espace à l'intérieur, en unités cubiques.":"Cette valeur vient d'une mauvaise combinaison des dimensions : le volume les multiplie toutes les trois ensemble.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("Quel est le volume du prisme droit à base rectangulaire montré, en centimètres cubes ?",
    {t:String(V), fb:"Oui : longueur fois largeur fois hauteur donne l'espace à l'intérieur."}, opts,
    "Multiplie les trois dimensions : \\[ \\begin{aligned} V &= l \\times w \\times h \\\\ &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] Le volume est <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"rect-vol", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Le volume compte l'espace à l'intérieur du prisme, donc on utilise les trois dimensions.", "Multiplie la longueur par la largeur par la hauteur."]);

E("u4-vol-tri-prism", 4, ["9.7","9.11"], 1, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var B=a*b/2; var V=B*L;
  var q=numq("Trouve le volume du prisme droit à base triangulaire montré, en centimètres cubes.", V, 0.01,
    "Trouve d'abord l'aire de la base triangulaire, puis multiplie par la longueur du prisme : \\[ \\begin{aligned} B &= "+FR(1,2)+"\\times "+a+"\\times "+b+" = "+fmtD(B)+" \\\\ V &= B \\times L \\\\ &= "+fmtD(B)+" \\times "+L+" \\\\ &= "+fmtD(V)+" \\end{aligned} \\] Le volume est <b>"+fmtD(V)+" cm\\(^{3}\\)</b>.",
    {mode:"tri-vol", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Le volume d'un prisme est l'aire de la base multipliée par la longueur sur laquelle elle se prolonge.", "Calcule l'aire du triangle : la moitié du produit des cathètes, puis multiplie par la longueur du prisme."]);

E("u4-vol-cylinder", 4, ["9.9"], 1, "gen", function(){
  var r=ri(2,10), h=ri(3,15);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Trouve le volume du cylindre droit montré. Utilise \\(\\pi = 3,14\\) et donne ta réponse en centimètres cubes, avec une décimale.", V, 0.6,
    "Un cylindre est un prisme avec une base circulaire, donc son volume est l'aire de la base multipliée par la hauteur : \\[ \\begin{aligned} V &= \\pi r^{2} h \\\\ &= 3,14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmtD(V)+" \\end{aligned} \\] Le volume est <b>"+fmtD(V)+" cm\\(^{3}\\)</b>.",
    {mode:"cyl-vol", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Traite le cylindre comme un prisme dont la base est un cercle.", "Trouve l'aire du cercle avec pi fois le rayon au carré, puis multiplie par la hauteur."]);

E("u4-vol-missing-height", 4, ["9.7"], 1, "gen", function(){
  var h=ri(2,15), B=pick([6,8,10,12,14,15,16,18,20,24,25,28,30,35,40,50]);
  var V=B*h;
  var kind=pick(["prism","tri","cylinder"]);
  var label={prism:"prisme droit", tri:"prisme droit à base triangulaire", cylinder:"cylindre droit"}[kind];
  var ds=u4d3(h,[h+1,h-1,h+2,2*h,V-B]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Réessaie : la hauteur est le volume divisé par l'aire de la base, et "+B+" fois "+d+" ne donne pas "+V+"."};});
  var q=mcq("Le volume d'un "+label+" est "+V+" cm\\(^{3}\\), et l'aire de sa base est "+B+" cm\\(^{2}\\). Quelle est sa hauteur, en centimètres ?",
    {t:String(h), fb:"Oui : "+B+" fois "+h+" donne le volume "+V+"."}, opts,
    "Le volume est l'aire de la base multipliée par la hauteur, donc divise le volume par l'aire de la base : \\[ \\begin{aligned} h &= V \\div B \\\\ &= "+V+" \\div "+B+" \\\\ &= "+h+" \\end{aligned} \\] La hauteur est <b>"+h+" cm</b>.",
    {mode:kind, B:B, h:h}); q.figure=m8PrismBaseSVG(kind==="tri"?"tri":(kind==="cylinder"?"cyl":"generic"), B+" cm\u00B2", "?"); return q;
}, ["Le volume égale l'aire de la base multipliée par la hauteur, donc une de ces valeurs manque ici.", "Divise le volume par l'aire de la base pour défaire la multiplication."]);

E("u4-base-volume-link", 4, ["9.8"], 1, "var", varset([
  function(){
    var q=mcq("Un prisme droit a une aire de base de 24 cm\\(^{2}\\). Des couches de la forme de la base, chacune de 1 cm d'épaisseur, sont empilées jusqu'à une hauteur de 5 cm. Quelle phrase explique le volume ?",
      {t:"Chaque couche contient 24 cm\\(^{3}\\), donc 5 couches contiennent 120 cm\\(^{3}\\) en tout", fb:"Exact : l'aire de la base donne le volume d'une couche, et la hauteur compte les couches."},
      [{t:"Chaque couche contient 5 cm\\(^{3}\\), donc 5 couches contiennent 25 cm\\(^{3}\\) en tout", fb:"Le volume d'une couche vient de l'aire de la base, pas de la hauteur : inverse les deux nombres."},
       {t:"Le volume est 24 plus 5, ce qui donne 29 cm\\(^{3}\\), trouvé en additionnant la base et la hauteur", fb:"Empiler des couches multiplie plutôt qu'additionner : pense à des couches répétées, pas à une somme."},
       {t:"Le volume dépend seulement de la forme de la base, donc il reste 24 cm\\(^{3}\\)", fb:"Une pile plus haute contient plus : la hauteur doit entrer dans le calcul."}],
      "Une couche, de 1 cm d'épaisseur, a un volume égal à l'aire de la base : 24 cm\\(^{3}\\). Empiler 5 couches donne \\(24 \\times 5 = 120\\) cm\\(^{3}\\). Le volume est <b>120 cm\\(^{3}\\), trouvé comme l'aire de la base multipliée par la hauteur</b>.",
      {mode:"static-layers"}); q.figure=m8LayersSVG("24 cm\u00B2","5 cm",5); return q;
  },
  function(){
    var q=mcq("Deux prismes droits ont la même hauteur. Le prisme P a une aire de base de 18 cm\\(^{2}\\) et le prisme Q a une aire de base de 36 cm\\(^{2}\\). Comment leurs volumes se comparent-ils ?",
      {t:"Le prisme Q a deux fois le volume du prisme P", fb:"Exact : avec des hauteurs égales, doubler l'aire de la base double le volume."},
      [{t:"Les deux prismes ont des volumes égaux parce que leurs hauteurs correspondent", fb:"Des hauteurs égales seules n'égalisent pas le volume : les aires de base diffèrent."},
       {t:"Le prisme Q a quatre fois le volume du prisme P", fb:"L'aire de la base a doublé, elle n'a pas été multipliée par quatre."},
       {t:"Le prisme P a deux fois le volume du prisme Q", fb:"Le prisme avec la plus grande aire de base contient plus, pas moins."}],
      "Le volume est l'aire de la base multipliée par la hauteur. Les hauteurs sont égales, et \\(36 = 2 \\times 18\\), donc <b>le prisme Q a deux fois le volume du prisme P</b>.",
      {mode:"static-double-base"}); q.figure=m8TwoBaseSVG("18 cm\u00B2","36 cm\u00B2"); return q;
  },
  function(){
    var q=mcq("La base d'un cylindre droit est un cercle d'aire 50,24 cm\\(^{2}\\). Le cylindre mesure 6 cm de haut. Quel calcul donne son volume ?",
      {t:"50,24 fois 6, ce qui donne 301,44 cm\\(^{3}\\)", fb:"Exact : un cylindre suit la même règle, aire de la base fois hauteur, qu'un prisme."},
      [{t:"50,24 fois 2, ce qui donne 100,48 cm\\(^{3}\\)", fb:"Le multiplicateur est la hauteur du cylindre, qui est 6, pas 2."},
       {t:"50,24 plus 6, ce qui donne 56,24 cm\\(^{3}\\)", fb:"Le volume empile la base sur la hauteur : multiplie plutôt qu'additionner."},
       {t:"50,24 fois 6 fois 6, ce qui donne 1 808,64 cm\\(^{3}\\)", fb:"La hauteur est utilisée une fois : l'aire de la base tient déjà compte de la forme ronde."}],
      "Un cylindre est un prisme avec une base circulaire, donc la règle du prisme s'applique : \\[ \\begin{aligned} V &= B \\times h \\\\ &= 50,24 \\times 6 \\\\ &= 301,44 \\end{aligned} \\] Le volume est <b>301,44 cm\\(^{3}\\)</b>.",
      {mode:"static-cyl-base"}); q.figure=m8CylBaseSVG("50,24 cm\u00B2","6 cm"); return q;
  }
]), ["Pense au solide comme une pile de couches identiques, chacune en forme de base.", "Une couche a un volume égal à l'aire de la base, donc multiplie par le nombre de couches (la hauteur)."]);

E("u4-holds-most", 4, ["9.11"], 2, "gen", function(){
  var sets=null, vols=null, t=0;
  while(t<200){
    var cand=[]; for(var i=0;i<4;i++){ cand.push([ri(2,12),ri(2,12),ri(2,12)]); }
    var vs=cand.map(function(s){return s[0]*s[1]*s[2];});
    var mx=Math.max.apply(null,vs);
    if(vs.filter(function(v){return v===mx;}).length===1 && new Set(vs).size>=3){ sets=cand; vols=vs; break; }
    t++;
  }
  if(!sets){ sets=[[4,5,6],[3,5,9],[6,6,5],[2,8,7]]; vols=sets.map(function(s){return s[0]*s[1]*s[2];}); }
  var best=vols.indexOf(Math.max.apply(null,vols));
  var names=["Réservoir A","Réservoir B","Réservoir C","Réservoir D"];
  var opts=names.filter(function(n,i){return i!==best;}).map(function(n){
    var i=names.indexOf(n);
    return {t:n, fb:n+" contient "+vols[i]+" cm\\(^{3}\\), ce qui est moins que le plus grand volume."};
  });
  var desc=sets.map(function(s,i){return names[i]+": "+s[0]+" cm sur "+s[1]+" cm sur "+s[2]+" cm";}).join("; ");
  var q=mcq("Quatre réservoirs de rangement ont la forme de prismes droits à base rectangulaire. "+desc+". Quel réservoir contient le plus d'eau ?",
    {t:names[best], fb:"Oui : son volume, "+vols[best]+" cm\\(^{3}\\), est le plus grand des quatre."}, opts,
    "Trouve chaque volume en multipliant les trois dimensions : "+vols.map(function(v,i){return names[i]+" contient "+v+" cm\\(^{3}\\)";}).join(", ")+". Le plus grand volume appartient au <b>"+names[best]+"</b>.",
    {mode:"holds-most", best:best}); q.figure=m8TanksSVG(sets,names); return q;
}, ["Contenir le plus d'eau signifie avoir le plus grand volume.", "Multiplie les trois dimensions de chaque réservoir, puis compare les quatre volumes."]);

E("u4-position-volume", 4, ["9.10"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var V=l*w*h;
  var ds=u4d3(V,[l*w*(h+1),l*(w+1)*h,(l+1)*w*h,2*V,l*w+w*h]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Basculer change la face qui est en bas, pas les dimensions elles-mêmes : multiplie les mêmes trois nombres."};});
  var q=mcq("Un aquarium en forme de prisme droit à base rectangulaire mesure "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut, et il est plein d'eau. On bascule l'aquarium avec soin sur une autre face sans renverser d'eau. Quel est le volume d'eau, en centimètres cubes ?",
    {t:String(V), fb:"Oui : retourner l'aquarium ne change pas la quantité d'eau à l'intérieur."}, opts,
    "La position n'affecte pas le volume. Les mêmes trois dimensions se multiplient dans toute position : \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] Le volume d'eau est <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"tipped", l:l, w:w, h:h}); q.figure=u4boxSVG(l,w,h); return q;
}, ["Demande-toi si retourner l'aquarium change une de ses trois dimensions.", "Multiplie la même longueur, largeur et hauteur : basculer change seulement la face qui est en bas."]);

E("u4-sa-open-tank", 4, ["9.5","9.6"], 3, "gen", function(){
  var r=ri(2,8), h=ri(4,14);
  var sa=u4r1(3.14*r*r+2*3.14*r*h);
  var q=numq("Un baril d'eau de jardin a la forme d'un cylindre droit de rayon "+r+" m et de hauteur "+h+" m. Il est ouvert en haut. Une feuille de métal est utilisée pour le fond et le côté courbé seulement. Combien de mètres carrés de métal sont nécessaires ? Utilise \\(\\pi = 3,14\\) et donne ta réponse avec une décimale.", sa, 0.6,
    "Un dessus ouvert signifie qu'un seul cercle est nécessaire, pour le fond, plus le côté courbé : \\[ \\begin{aligned} AT &= \\pi r^{2}+2\\pi r h \\\\ &= 3,14("+r+")^{2}+2(3,14)("+r+")("+h+") \\\\ &= "+fmtD(u4r2(3.14*r*r))+"+"+fmtD(u4r1(2*3.14*r*h))+" \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] Le métal nécessaire est <b>"+fmtD(sa)+" m\\(^{2}\\)</b>.",
    {mode:"open-barrel", r:r, h:h}); q.figure=m8CylLabSVG(r+" m",h+" m",false,true); return q;
}, ["Un dessus ouvert change le nombre de cercles : lis le problème pour voir quelles parties sont couvertes.", "Additionne un cercle pour le fond à l'aire du côté courbé."]);

E("u4-vol-cylinder-diam", 4, ["9.9","9.11"], 3, "gen", function(){
  var r=ri(2,9); var d=2*r; var h=ri(4,16);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Un réservoir d'eau a la forme d'un cylindre droit de diamètre "+d+" cm et de hauteur "+h+" cm. Combien de centimètres cubes d'eau contient-il quand il est plein ? Utilise \\(\\pi = 3,14\\) et donne ta réponse avec une décimale.", V, 0.6,
    "Divise le diamètre par deux pour obtenir le rayon, puis utilise l'aire de la base fois la hauteur : \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3,14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmtD(V)+" \\end{aligned} \\] Le réservoir contient <b>"+fmtD(V)+" cm\\(^{3}\\)</b>.",
    {mode:"diam-vol", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["La formule a besoin du rayon, mais le problème donne le diamètre.", "Divise d'abord le diamètre par deux, puis mets le rayon au carré et multiplie par pi et par la hauteur."]);

E("u4-sa-missing-edge", 4, ["9.5"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(h,[h+1,h+2,h-1,2*h,h+3]);
  var opts=ds.map(function(d){
    var test=2*(l*w+l*d+w*d);
    return {t:String(d), fb:"Avec une hauteur de "+d+" l'aire totale serait "+test+" cm\\(^{2}\\), pas "+sa+"."};
  });
  var q=mcq("Un prisme droit à base rectangulaire mesure "+l+" cm de long et "+w+" cm de large, et son aire totale est "+sa+" cm\\(^{2}\\). Quelle est sa hauteur, en centimètres ?",
    {t:String(h), fb:"Oui : une hauteur de "+h+" donne exactement l'aire totale donnée."}, opts,
    "Essaie la hauteur dans la formule de l'aire totale et résous. Avec une hauteur \\(h\\) : \\[ \\begin{aligned} 2("+fmtD(l*w)+") + 2("+l+"+"+w+")h &= "+sa+" \\\\ "+(2*l*w)+" + "+(2*(l+w))+"h &= "+sa+" \\\\ h &= "+h+" \\end{aligned} \\] La hauteur est <b>"+h+" cm</b>.",
    {mode:"missing-edge", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm","?",false); return q;
}, ["Mets la hauteur inconnue dans la formule de l'aire totale sous forme de lettre.", "Calcule d'abord les aires des faces connues, puis vois ce qui reste pour les faces qui utilisent la hauteur."]);

/* ----- bank-u5.js ----- */
// Math 8 (French) Unit 5 Percent, Ratio and Rate question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 1887 to 2782).
// CRMARKS: u5-discount-then-tax=3
// CRMARKS: u5-find-the-whole=3
// CRMARKS: u5-percent-change=3
// CRMARKS: u5-percent-of-number=3
// CRMARKS: u5-percent-of-percent-quantity=2
// CRMARKS: u5-rate-problem-solve=2
// CRMARKS: u5-ratio-problem-solve=2
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 5 first half (Percent, Ratio and Rate), entries
   u5-context-extreme-percent to u5-three-term-ratio (14 entries).
   Translated per RULES.md and GLOSSARY.md. Unit title in French:
   "Les pourcentages, les rapports et les taux".

   Judgement calls:
   - ratio = "rapport", rate = "taux", unit rate = "taux unitaire"
     (not needed in this chunk). Rate phrasing: "X unités par Y",
     symbols kept as "A u1/B u2" (20 L/100 km style unchanged).
   - Percent always spaced, including inside KaTeX: "145 \%",
     fmtD(...) + " %".
   - HST rendered "TVH" (taxe de vente harmonisée).
   - "in lowest terms" rendered "fraction irréductible" throughout.
   - "Shade" in grid options rendered with the infinitive "Ombrer"
     so the options read as representation labels.
   - Entry u5-fraction-convert: the distractor that writes the
     numerator after the decimal separator now uses a comma
     (fmtD(...) + "," + fmtD(n, 0)) so the modelled error matches
     French decimal notation.
   - Entry u5-percent-of-number, small-percent mode: the generated
     resident counts (2 000 to 30 000) are routed through fmtD(...)
     in prompt and solution so thousands take a no-break space.
   - Context nouns rebuilt for agreement and countability:
     two-term and three-term ratio contexts carry plural noun
     phrases (jetons rouges, pièces de 5 cents, pots de peinture
     rouge, sacs de sable, etc.); discount items stay bare nouns
     after "l'article suivant :".
   - The SVG aria-label in u5gridSVG is translated as student-facing
     text. \text{} labels translated: taux, pourcentage, décimal,
     total, prix de solde, prix final, de (for "of").
   - Decimal literals in the percent pool are comma decimals in the
     display string s only ("12,5", "37,5", "62,5", "87,5", "2,5",
     "0,5"); the numeric pn/pd values are unchanged.

   FMT-GEOM lines left as fmt(: none. The grid SVG builds coordinates
   by raw concatenation and has no fmt( calls; every display fmt(
   became fmtD( and every fmtF( became fmtDF(.

   Unsure about: nothing blocking. The source file ends with the
   comment for entry 15 (3.10) and no body; that entry starts chunk
   E2, so the comment is carried over unchanged at the end.
*/
/* Unit 5: Percent, Ratio and Rate */
// Unit 5: Percent, Ratio and Rate (Math 8, NL). Entries only; helpers prefixed u5.
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5r2(x) { return Math.round(x * 100) / 100; }
function u5gridSVG(shaded) {
  var cell = 17, W = cell * 10 + 2, s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + W + '" viewBox="0 0 ' + W + ' ' + W + '" role="img" aria-label="Grille de 100 avec ' + shaded + ' carrés ombragés">';
  for (var r = 0; r < 10; r++) { for (var c = 0; c < 10; c++) { var idx = r * 10 + c; s += '<rect x="' + (1 + c * cell) + '" y="' + (1 + r * cell) + '" width="' + cell + '" height="' + cell + '" fill="' + (idx < shaded ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1"/>'; } }
  return s + '</svg>';
}

// 1. L1, 3.1, var: contexts where a percent is over 100% or between 0% and 1%.
E("u5-context-extreme-percent", 5, ["3.1"], 1, "var", varset([
  function () {
    var sol = "Un pourcentage de plus de 100 % compare un nouveau montant à un total antérieur, et le nouveau montant est plus grand : \\[ \\begin{aligned} 145 \\% &> 100 \\% \\end{aligned} \\] Un contexte qui convient est donc : <b>le traversier a transporté, en juillet cette année, 145 % du nombre de passagers transportés en juillet l'an passé</b>.";
    return mcq("Quelle situation peut être décrite par un pourcentage de 145 % ?", { t: "Le traversier a transporté, en juillet cette année, 145 % du nombre de passagers transportés en juillet l'an passé.", fb: "Exact : le nouveau total est comparé à celui de juillet l'an passé et il est plus grand que ce total." }, [
      { t: "Un élève a mangé 145 % d'un sandwich entier qu'il avait apporté pour son repas à l'heure du midi à l'école de son quartier.", fb: "Un sandwich est le tout qui peut être mangé, donc la part mangée ne peut pas dépasser 100 % de ce tout." },
      { t: "Une classe a 145 % de ses élèves inscrits de la classe sur la liste qui sont absents de l'école aujourd'hui.", fb: "Les élèves absents font partie de la classe, donc cette part ne peut pas dépasser 100 %." },
      { t: "Un réservoir d'eau de la ville est rempli d'eau fraîche à 145 % de sa capacité maximale aujourd'hui même.", fb: "La capacité est le réservoir entier, donc l'eau dedans ne peut pas dépasser 100 % de la capacité." }
    ], sol, { mode: "ctx-145" });
  },
  function () {
    var sol = "Un pourcentage entre 0 % et 1 % décrit une très petite part d'un grand tout : \\[ \\begin{aligned} 0 \\% < 0,4 \\% &< 1 \\% \\end{aligned} \\] Un contexte qui convient est donc : <b>environ 0,4 % des gens d'une ville sont nés un 29 février</b>.";
    return mcq("Quelle situation peut être décrite par un pourcentage de 0,4 % ?", { t: "Environ 0,4 % des gens d'une ville sont nés un 29 février.", fb: "Exact : c'est une très petite part d'un grand groupe, bien en dessous de 1 %." }, [
      { t: "Un joueur a marqué sur 0,4 % de 200 tirs cette saison.", fb: "Cela donnerait moins d'un but sur 200 tirs, et ici les buts sont des nombres entiers." },
      { t: "Un sondage de 10 élèves a trouvé que 0,4 % préfèrent l'hiver.", fb: "Avec seulement 10 élèves, la plus petite part pour un élève est 10 %, pas 0,4 %." },
      { t: "Une recette donne 0,4 % de farine dans une pincée de 10 g d'épices.", fb: "Cette part est bien trop petite pour un ingrédient principal mesuré dans une pincée de 10 g dans ce contexte." }
    ], sol, { mode: "ctx-04" });
  },
  function () {
    var sol = "Une croissance comparée à une valeur antérieure peut dépasser le tout antérieur : \\[ \\begin{aligned} 212 \\% &> 100 \\% \\end{aligned} \\] Un contexte qui convient est donc : <b>le nombre de membres du club de jardinage cette année égale 212 % du nombre d'il y a trois ans</b>.";
    return mcq("Quelle situation peut être décrite par un pourcentage de 212 % ?", { t: "Le nombre de membres du club de jardinage cette année égale 212 % du nombre d'il y a trois ans.", fb: "Exact : le nombre de membres est comparé à un total antérieur et il a plus que doublé." }, [
      { t: "Un gardien de but a arrêté 212 % des tirs dirigés vers son but dans un match de hockey.", fb: "Les arrêts font partie des tirs reçus, donc cette part ne peut pas dépasser 100 %." },
      { t: "Une tarte a 212 % de ses pointes qui ont été servies aux invités pendant le souper.", fb: "Les pointes servies font partie d'une seule tarte, donc la part ne peut pas dépasser 100 %." },
      { t: "La batterie d'un téléphone cellulaire est chargée à 212 % selon ce qui est montré sur son écran.", fb: "Une charge complète est 100 % sur l'écran, donc la charge montrée ne peut pas la dépasser." }
    ], sol, { mode: "ctx-212" });
  },
  function () {
    var sol = "Un pourcentage sous 1 % convient à un événement rare dans un très grand groupe : \\[ \\begin{aligned} 0 \\% < 0,75 \\% &< 1 \\% \\end{aligned} \\] Un contexte qui convient est donc : <b>environ 0,75 % des billets d'un grand tirage provincial ont été vendus dans une petite communauté</b>.";
    return mcq("Quelle situation peut être décrite par un pourcentage de 0,75 % ?", { t: "Environ 0,75 % des billets d'un grand tirage provincial ont été vendus dans une petite communauté.", fb: "Exact : une petite communauté compte pour une très petite part d'un très grand total." }, [
      { t: "Une classe de 8 élèves a 0,75 % de ses élèves inscrits qui sont absents de l'école aujourd'hui ce matin.", fb: "Avec 8 élèves, un élève absent donne déjà 12,5 %, bien au-dessus de 0,75 %." },
      { t: "Une pizza de 4 pointes a 0,75 % de ses pointes entières qui restent après le repas du midi.", fb: "Ici les pointes sont entières, et une pointe sur quatre donne 25 %, pas une part sous 1 %." },
      { t: "Une équipe a gagné 0,75 % des 12 matchs de hockey joués par l'équipe pendant ce mois-ci.", fb: "Les victoires sont des matchs entiers, et une victoire sur 12 matchs donne déjà plus de 8 %." }
    ], sol, { mode: "ctx-075" });
  },
  function () {
    var sol = "Un prix comparé à son prix antérieur peut dépasser le tout d'origine : \\[ \\begin{aligned} 108 \\% &> 100 \\% \\end{aligned} \\] Un contexte qui convient est donc : <b>ce mois-ci, le prix d'un laissez-passer de sentier égale 108 % de son prix du mois passé</b>.";
    return mcq("Quelle situation peut être décrite par un pourcentage de 108 % ?", { t: "Ce mois-ci, le prix d'un laissez-passer de sentier égale 108 % de son prix du mois passé.", fb: "Exact : le nouveau prix est comparé à l'ancien prix et il est un peu plus grand." }, [
      { t: "Un coureur a terminé 108 % d'un parcours de course de 10 km chronométré.", fb: "Le parcours est le trajet entier, donc la part terminée dans la course ne peut pas dépasser 100 % de ce trajet." },
      { t: "Un sondage dit que 108 % d'une classe entière a choisi l'art comme matière préférée à l'école.", fb: "Les élèves qui choisissent l'art font partie de la classe, donc la part ne peut pas dépasser 100 %." },
      { t: "Une cruche contient en ce moment 108 % de son volume entier en jus de fruits frais.", fb: "Le volume de la cruche est l'espace entier, donc le jus dedans ne peut pas dépasser 100 %." }
    ], sol, { mode: "ctx-108" });
  }
]), ["Demande-toi si le pourcentage compare avec un montant antérieur, qui peut être dépassé, ou prend une part d'un seul tout, qui ne peut pas l'être.", "Décide d'abord si le pourcentage est au-dessus de 100 % ou sous 1 %, puis associe-le à une comparaison ou à une très petite part."]);

// 2. L1, 3.5: express a percent in decimal or fractional form.
E("u5-percent-convert", 5, ["3.5"], 1, "gen", function () {
  var pool = [
    { s: "5", pn: 5, pd: 1 }, { s: "10", pn: 10, pd: 1 }, { s: "15", pn: 15, pd: 1 }, { s: "20", pn: 20, pd: 1 },
    { s: "25", pn: 25, pd: 1 }, { s: "30", pn: 30, pd: 1 }, { s: "35", pn: 35, pd: 1 }, { s: "40", pn: 40, pd: 1 },
    { s: "45", pn: 45, pd: 1 }, { s: "55", pn: 55, pd: 1 }, { s: "60", pn: 60, pd: 1 }, { s: "65", pn: 65, pd: 1 },
    { s: "70", pn: 70, pd: 1 }, { s: "75", pn: 75, pd: 1 }, { s: "80", pn: 80, pd: 1 }, { s: "85", pn: 85, pd: 1 },
    { s: "90", pn: 90, pd: 1 }, { s: "95", pn: 95, pd: 1 }, { s: "7", pn: 7, pd: 1 }, { s: "3", pn: 3, pd: 1 },
    { s: "12,5", pn: 25, pd: 2 }, { s: "37,5", pn: 75, pd: 2 }, { s: "62,5", pn: 125, pd: 2 }, { s: "87,5", pn: 175, pd: 2 },
    { s: "2,5", pn: 5, pd: 2 }, { s: "0,5", pn: 1, pd: 2 }, { s: "125", pn: 125, pd: 1 }, { s: "150", pn: 150, pd: 1 },
    { s: "175", pn: 175, pd: 1 }, { s: "200", pn: 200, pd: 1 }, { s: "250", pn: 250, pd: 1 }, { s: "110", pn: 110, pd: 1 },
    { s: "240", pn: 240, pd: 1 }, { s: "1", pn: 1, pd: 1 }, { s: "99", pn: 99, pd: 1 }, { s: "33", pn: 33, pd: 1 }
  ];
  var it = pick(pool), pval = it.pn / it.pd;
  if (Math.random() < 0.5) {
    var dec = pval / 100;
    var dpK = (fmtD(dec, 4).split(",")[1] || "").length;
    var cands = [
      { t: fmtDF(pval / 10, dpK), fb: "Cela divise par 10 seulement ; un pourcentage est sur 100, donc divise par 100." },
      { t: fmtDF(pval / 1000, dpK + 1), fb: "Cela divise par 1000, une position trop loin ; un pourcentage est sur 100." },
      { t: fmtDF(pval, dpK + 1), fb: "C'est le nombre du pourcentage lui-même ; il faut encore le diviser par 100." },
      { t: fmtD(pval * 100, 2), fb: "Cela multiplie par 100, ce qui sert à changer un nombre décimal en pourcentage." }
    ];
    var ds = u5pick3(fmtD(dec, 4), cands);
    var sol = "Un pourcentage veut dire sur 100, donc divise par 100 : \\[ \\begin{aligned} " + it.s + " \\% &= " + it.s + " \\div 100 \\\\ &= " + fmtD(dec, 4) + " \\end{aligned} \\] Donc \\(" + it.s + " \\%\\) sous forme décimale est <b>" + fmtD(dec, 4) + "</b>.";
    return mcq("Exprime \\(" + it.s + " \\%\\) sous forme décimale.", { t: fmtD(dec, 4), fb: "Exact : diviser le pourcentage par 100 donne le nombre décimal." }, ds, sol, { mode: "pct-dec", p: it.s });
  }
  var fn = it.pn, fd = it.pd * 100, g = u5gcd(fn, fd); fn /= g; fd /= g;
  var fracTex = fd === 1 ? fmtD(fn, 0) : FR(fn, fd);
  var corr = "\\(" + fracTex + "\\)";
  var cands2 = [
    { t: "\\(" + FR(it.pn, it.pd * 10) + "\\)", fb: "Cela utilise des dixièmes ; un pourcentage est sur 100, pas sur 10." },
    { t: "\\(" + FR(fd, fn) + "\\)", fb: "Cela renverse la fraction ; le montant du pourcentage va au numérateur." },
    { t: "\\(" + FR(it.pn * 2, it.pd * 100) + "\\)", fb: "Cela double le numérateur, ce qui change la valeur de la fraction." },
    { t: "\\(" + FR(it.pn, it.pd) + "\\)", fb: "Cela enlève la division par 100 que le signe de pourcentage représente." }
  ];
  // reduce candidate fractions for display where they are unreduced by design; keep as written except flip candidate
  var ds2 = u5pick3(corr, cands2);
  var sol2 = "Écris le pourcentage comme une fraction sur 100, puis réduis : \\[ \\begin{aligned} " + it.s + " \\% &= " + FR(it.pn, it.pd * 100) + " \\\\ &= " + fracTex + " \\end{aligned} \\] Donc \\(" + it.s + " \\%\\) sous forme de fraction irréductible est <b>" + corr + "</b>.";
  return mcq("Exprime \\(" + it.s + " \\%\\) sous forme de fraction irréductible.", { t: corr, fb: "Exact : le pourcentage devient une fraction sur 100, réduite à sa forme irréductible." }, ds2, sol2, { mode: "pct-frac", p: it.s });
}, ["Un pourcentage veut dire sur 100, donc chaque conversion part des centièmes.", "Écris d'abord le pourcentage sur 100, puis change-le en nombre décimal ou réduis la fraction."]);

// 3. L1, 3.6: express a decimal in percent or fractional form.
E("u5-decimal-convert", 5, ["3.6"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var k = ri(1, 2500), v = k / 1000, pct = v * 100;
    var dpP = (fmtD(pct, 2).split(",")[1] || "").length;
    var cands = [
      { t: fmtDF(pct / 10, 3) + " %", fb: "Cela déplace la virgule d'une position seulement ; un pourcentage demande deux positions." },
      { t: fmtDF(pct * 10, dpP) + " %", fb: "Cela déplace la virgule de trois positions, une de trop." },
      { t: fmtDF(v, 3) + " %", fb: "Cela garde la valeur décimale et ajoute seulement un signe de pourcentage ; la valeur doit être multipliée par 100." },
      { t: fmtD(pct / 100, 3) + " %", fb: "Cela divise par 100, ce qui sert à changer un pourcentage en nombre décimal." }
    ];
    var ds = u5pick3(fmtD(pct, 2) + " %", cands);
    var sol = "Multiplie par 100 pour changer un nombre décimal en pourcentage : \\[ \\begin{aligned} " + fmtD(v, 3) + " \\times 100 &= " + fmtD(pct, 2) + " \\end{aligned} \\] Donc \\(" + fmtD(v, 3) + "\\) en pourcentage est <b>" + fmtD(pct, 2) + " %</b>.";
    return mcq("Exprime \\(" + fmtD(v, 3) + "\\) en pourcentage.", { t: fmtD(pct, 2) + " %", fb: "Exact : multiplier le nombre décimal par 100 donne le pourcentage." }, ds, sol, { mode: "dec-pct", v: v });
  }
  var den0 = pick([10, 100, 1000]), num0 = ri(1, den0 * 2), attD = 0;
  while (num0 === den0 && attD < 60) { num0 = ri(1, den0 * 2); attD++; }
  if (num0 === den0) num0 = den0 + 1;
  var vv = num0 / den0, decPlaces = den0 === 10 ? 1 : den0 === 100 ? 2 : 3;
  var g2 = u5gcd(num0, den0), fn2 = num0 / g2, fd2 = den0 / g2;
  var fracTex2 = fd2 === 1 ? fmtD(fn2, 0) : FR(fn2, fd2);
  var corr2 = "\\(" + fracTex2 + "\\)";
  var cands2 = [
    { t: "\\(" + FR(fd2, fn2) + "\\)", fb: "Cela renverse la fraction ; la valeur décimale va au numérateur, sur sa valeur de position." },
    { t: "\\(" + FR(num0, den0 * 10) + "\\)", fb: "Cela utilise la valeur de position suivante, ce qui rend la fraction dix fois trop petite." },
    { t: "\\(" + FR(num0 * 10, den0) + "\\)", fb: "Cela rend le numérateur dix fois trop grand pour la valeur de position montrée." }
  ];
  var ds2b = u5pick3(corr2, cands2);
  var sol2 = "Écris le nombre décimal sur sa valeur de position, puis réduis : \\[ \\begin{aligned} " + fmtD(vv, decPlaces) + " &= " + FR(num0, den0) + " \\\\ &= " + fracTex2 + " \\end{aligned} \\] Donc \\(" + fmtD(vv, decPlaces) + "\\) sous forme de fraction irréductible est <b>" + corr2 + "</b>.";
  return mcq("Exprime \\(" + fmtD(vv, decPlaces) + "\\) sous forme de fraction irréductible.", { t: corr2, fb: "Exact : le nombre décimal est écrit sur sa valeur de position, puis réduit." }, ds2b, sol2, { mode: "dec-frac", v: vv });
}, ["Un nombre décimal et un pourcentage diffèrent par un facteur de 100, et une fraction décimale utilise sa valeur de position comme dénominateur.", "Nomme d'abord la valeur de position du dernier chiffre décimal ; elle donne le dénominateur."]);

// 4. L1, 3.7: express a fraction in decimal or percent form.
E("u5-fraction-convert", 5, ["3.7"], 1, "gen", function () {
  var n = 3, d = 8;
  for (var att = 0; att < 200; att++) {
    d = pick([2, 4, 5, 8, 10, 20, 25, 40, 50]); n = ri(1, d * 3);
    if (n % d === 0) continue;
    if ((n * 1000) % d !== 0) continue;
    break;
  }
  if ((n * 1000) % d !== 0 || n % d === 0) { n = 3; d = 8; }
  var val = n / d, pct = val * 100;
  if (Math.random() < 0.5) {
    var dpV = (fmtD(val, 3).split(",")[1] || "").length;
    var dpM = Math.max(3, dpV + 1);
    var cands = [
      { t: fmtDF(val * 10, dpV), fb: "C'est dix fois trop grand ; divise le numérateur par le dénominateur, comme ils sont écrits." },
      { t: fmtDF(val / 10, dpM), fb: "C'est dix fois trop petit ; divise le numérateur par le dénominateur, comme ils sont écrits." },
      { t: fmtDF(d / n, dpM), fb: "Cela divise le dénominateur par le numérateur, ce qui renverse la fraction." },
      { t: fmtD(Math.floor(val), 0) + "," + fmtD(n, 0), fb: "Cela écrit le numérateur après la virgule au lieu de diviser." }
    ];
    var ds = u5pick3(fmtD(val, 3), cands);
    var sol = "Une fraction veut dire le numérateur divisé par le dénominateur : \\[ \\begin{aligned} " + FR(n, d) + " &= " + n + " \\div " + d + " \\\\ &= " + fmtD(val, 3) + " \\end{aligned} \\] Donc la forme décimale est <b>" + fmtD(val, 3) + "</b>.";
    return mcq("Exprime \\(" + FR(n, d) + "\\) sous forme décimale.", { t: fmtD(val, 3), fb: "Exact : diviser le numérateur par le dénominateur donne le nombre décimal." }, ds, sol, { mode: "frac-dec", n: n, d: d });
  }
  var dpV2 = (fmtD(val, 3).split(",")[1] || "").length;
  var dpP2 = (fmtD(pct, 2).split(",")[1] || "").length;
  var dpM2 = Math.max(dpP2 + 1, dpV2);
  var cands2 = [
    { t: fmtDF(pct / 10, dpM2) + " %", fb: "Cela déplace la virgule d'une position seulement après la division ; un pourcentage demande deux positions." },
    { t: fmtDF(pct * 10, dpP2) + " %", fb: "Cela déplace la virgule d'une position de trop après la division." },
    { t: fmtDF(val, dpM2) + " %", fb: "C'est la forme décimale avec un signe de pourcentage ajouté ; la valeur doit encore être multipliée par 100." },
    { t: fmtD(d / n * 100, 1) + " %", fb: "Cela renverse la fraction avant la conversion, donc le pourcentage est beaucoup trop grand." }
  ];
  var ds2 = u5pick3(fmtD(pct, 2) + " %", cands2);
  var sol2 = "Divise d'abord, puis multiplie par 100 pour un pourcentage : \\[ \\begin{aligned} " + FR(n, d) + " &= " + fmtD(val, 3) + " \\\\ " + fmtD(val, 3) + " \\times 100 &= " + fmtD(pct, 2) + " \\end{aligned} \\] Donc la forme en pourcentage est <b>" + fmtD(pct, 2) + " %</b>.";
  return mcq("Exprime \\(" + FR(n, d) + "\\) en pourcentage.", { t: fmtD(pct, 2) + " %", fb: "Exact : la fraction est divisée, puis multipliée par 100." }, ds2, sol2, { mode: "frac-pct", n: n, d: d });
}, ["Une barre de fraction veut dire une division : numérateur divisé par dénominateur.", "Divise d'abord le numérateur par le dénominateur, puis décide si un pourcentage est aussi demandé."]);

// 5. L1, 3.8: express a two-term ratio from a context.
E("u5-two-term-ratio", 5, ["3.8"], 1, "gen", function () {
  var ctxs = [
    { a: "jetons rouges", b: "jetons bleus" }, { a: "filles", b: "garçons" }, { a: "victoires", b: "défaites" },
    { a: "pommes", b: "oranges" }, { a: "chiens", b: "chats" }, { a: "voitures", b: "camions" },
    { a: "attaquants", b: "défenseurs" }, { a: "romans", b: "magazines" }
  ];
  var cx = pick(ctxs), a = ri(2, 15), b = ri(2, 15), att = 0;
  while (u5gcd(a, b) !== 1 && att < 60) { a = ri(2, 15); b = ri(2, 15); att++; }
  if (u5gcd(a, b) !== 1) { a = 3; b = 5; }
  var corr = a + ":" + b;
  var cands = [
    { t: b + ":" + a, fb: "Cela renverse l'ordre ; le rapport est demandé comme " + cx.a + " à " + cx.b + "." },
    { t: a + ":" + (a + b), fb: "Cela compare le premier groupe avec le total ; la question demande le rapport du premier groupe au deuxième groupe." },
    { t: b + ":" + (a + b), fb: "Cela compare le deuxième groupe avec le total, pas les deux groupes l'un avec l'autre." },
    { t: (a + b) + ":" + b, fb: "Cela met le total en premier ; un rapport à deux termes ici compare seulement les deux groupes nommés." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Place les nombres dans l'ordre nommé : \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + a + " : " + b + " \\end{aligned} \\] Donc le rapport de " + cx.a + " à " + cx.b + " est <b>" + corr + "</b>.";
  return mcq("Un groupe a " + a + " " + cx.a + " et " + b + " " + cx.b + ". Quel est le rapport de " + cx.a + " à " + cx.b + " ?", { t: corr, fb: "Exact : les nombres sont écrits dans l'ordre où les groupes sont nommés." }, ds, sol, { mode: "two-term", a: a, b: b });
}, ["Un rapport garde l'ordre des groupes exactement comme ils sont nommés dans la question.", "Écris d'abord le nombre du groupe nommé en premier, puis le nombre du groupe nommé en deuxième."]);

// 6. L1, 3.16: express a rate using words or symbols.
E("u5-express-rate", 5, ["3.16"], 1, "gen", function () {
  var tmpls = [
    { desc: "Un autobus parcourt {A} km en {B} h", u1: "km", u2: "h", w1: "kilomètres", w2: "heure" },
    { desc: "Un robinet remplit {A} L en {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "Un travailleur gagne {A} $ en {B} h", u1: "$", u2: "h", w1: "dollars", w2: "heure" },
    { desc: "Une imprimante imprime {A} pages en {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "Une voiture utilise {A} L d'essence pour {B} km parcourus", u1: "L", u2: "km", w1: "litres", w2: "kilomètre" },
    { desc: "Un traversier transporte {A} passagers en {B} voyages", u1: "passagers", u2: "voyages", w1: "passagers", w2: "voyage" },
    { desc: "Un cœur bat {A} fois en {B} min", u1: "battements", u2: "min", w1: "battements", w2: "minute" },
    { desc: "Il tombe {A} cm de neige en {B} h", u1: "cm", u2: "h", w1: "centimètres", w2: "heure" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "Cela renverse le taux ; le montant mesuré va en premier et l'unité à laquelle il est comparé va en deuxième." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "Cela échange les deux unités ; chaque nombre doit garder l'unité dans laquelle il a été mesuré." },
    { t: A + " " + t.u1 + " au total", fb: "Cela donne seulement le montant ; un taux doit aussi dire à quoi le montant est comparé." },
    { t: A + ":" + B, fb: "C'est la notation de rapport pour deux montants de même sorte ; un taux garde ses deux unités écrites." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Un taux relie un montant à l'unité à laquelle il est comparé : \\[ \\begin{aligned} \\text{taux} &= " + A + " \\text{ " + t.w1 + " par } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Écrit avec des symboles, le taux est <b>" + corr + "</b>.";
  return mcq(desc + ". Quelle expression note ce taux avec des symboles ?", { t: corr, fb: "Exact : le montant mesuré et son unité viennent en premier, puis l'unité à laquelle il est comparé." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["Un taux compare deux unités différentes, et les deux unités restent dans le taux écrit.", "Écris d'abord le montant mesuré avec son unité, puis une barre oblique, puis le deuxième montant avec son unité."]);

// 7. L2, 3.2: represent a fractional percent on a grid.
E("u5-grid-fractional-percent", 5, ["3.2"], 1, "gen", function () {
  var fracs = [{ v: 0.25, w: "un quart" }, { v: 0.5, w: "une moitié" }, { v: 0.75, w: "trois quarts" }];
  var f = pick(fracs), base = pick([0, 1, 2, 3, 5, 6, 8, 9, 12, 15, 17, 21, 24, 28, 31, 35, 38, 42, 45, 52, 57, 63, 68, 74, 81, 90]);
  var p = base + f.v, pStr = fmtD(p, 2);
  var comp = 1 - f.v, compW = comp === 0.25 ? "un quart" : comp === 0.5 ? "une moitié" : "trois quarts";
  var corr = base === 0 ? "Ombrer " + f.w + " d'un carré" : "Ombrer " + base + " carrés entiers et " + f.w + " d'un autre carré";
  var third = f.v === 0.5
    ? (base === 0 ? "Ombrer une moitié de chacun de deux carrés" : "Ombrer " + base + " carrés entiers et une moitié de chacun de deux autres carrés")
    : (base === 0 ? "Ombrer " + compW + " d'un carré" : "Ombrer " + base + " carrés entiers et " + compW + " d'un autre carré");
  var thirdFb = f.v === 0.5 ? "Cela partage la moitié entre deux carrés, ce qui ombre un carré entier au total au lieu de la moitié d'un carré." : "Cela ombre le reste du dernier carré au lieu de la partie fractionnaire nommée par le pourcentage.";
  var cands = [
    { t: base === 0 ? "Ombrer un carré entier, et aucun autre carré" : "Ombrer " + (base + 1) + " carrés entiers, sans partie d'un autre carré", fb: "Cela arrondit le pourcentage au prochain carré entier et perd la partie fractionnaire." },
    { t: base === 0 ? "Ombrer aucun carré de la grille" : "Ombrer " + base + " carrés entiers seulement, et aucun autre carré", fb: "Cela enlève la partie fractionnaire du pourcentage ; une partie d'un autre carré est encore nécessaire." },
    { t: third, fb: thirdFb }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Chaque carré entier sur une grille de 100 vaut 1 %, et la partie qui reste ombre une partie d'un carré : \\[ \\begin{aligned} " + pStr + " \\% &= " + base + " \\% + " + fmtD(f.v, 2) + " \\% \\end{aligned} \\] Donc la représentation est : <b>" + corr + "</b>.";
  return mcq("On utilise une grille de 100 carrés pour modéliser un pourcentage. Chaque carré entier vaut 1 %. Comment \\(" + pStr + " \\%\\) est-il représenté sur la grille ?", { t: corr, fb: "Exact : la partie entière donne des carrés entiers et la partie fractionnaire donne une partie d'un autre carré." }, ds, sol, { mode: "grid-frac-pct", p: pStr });
}, ["Partage le pourcentage en sa partie entière et sa partie fractionnaire avant de penser aux carrés.", "Compte d'abord les carrés entiers à partir de la partie entière du pourcentage."]);

// 8. L2, 3.3: represent a percent over 100 using grids.
E("u5-grid-over-100", 5, ["3.3"], 1, "gen", function () {
  var grids = ri(1, 2), extra = ri(3, 95), p = grids * 100 + extra;
  var gw = grids === 1 ? "une grille entière" : "deux grilles entières";
  var corr = "Ombrer " + gw + " et " + extra + " carrés d'une autre grille";
  var cands = [
    { t: "Ombrer " + extra + " carrés d'une grille, sans ombrer de grille entière", fb: "Cela montre seulement la partie après les grilles entières ; les grilles entières elles-mêmes doivent aussi être ombrées." },
    { t: grids === 1 ? "Ombrer deux grilles entières, sans partie d'une autre grille" : "Ombrer trois grilles entières, sans partie d'une autre grille", fb: "Cela arrondit aux grilles entières seulement et ajoute des carrés que le pourcentage ne demande pas." },
    { t: "Ombrer " + gw + " et " + (100 - extra) + " carrés d'une autre grille", fb: "Cela ombre le complément sur la dernière grille au lieu des carrés de plus nommés par le pourcentage." },
    { t: "Ombrer " + p + " carrés sur une seule et même grille", fb: "Une grille contient seulement 100 carrés, donc un pourcentage aussi grand demande plus d'une grille." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Chaque grille contient 100 carrés, donc compte d'abord les centaines entières : \\[ \\begin{aligned} " + p + " \\% &= " + (grids * 100) + " \\% + " + extra + " \\% \\end{aligned} \\] Donc la représentation est : <b>" + corr + "</b>.";
  return mcq("On utilise des grilles de 100 pour modéliser un pourcentage. Chaque grille a 100 carrés et chaque carré vaut 1 %. Comment \\(" + p + " \\%\\) est-il représenté ?", { t: corr, fb: "Exact : les centaines entières remplissent des grilles entières et le reste remplit une partie d'une autre grille." }, ds, sol, { mode: "grid-over-100", p: p });
}, ["Compte d'abord les centaines entières, car chaque grille contient exactement 100 carrés.", "Trouve d'abord combien de grilles entières les centaines du pourcentage remplissent."]);

// 9. L2, 3.4: read a shaded grid in percent, decimal and fraction form.
E("u5-shaded-grid-read", 5, ["3.4"], 1, "gen", function () {
  var k = ri(4, 96); if (k === 50) k = 54;
  var g = u5gcd(k, 100), fn = k / g, fd = 100 / g;
  var u = 100 - k, gu = u5gcd(u, 100);
  function forms(p, frn, frd) { return fmtD(p, 0) + " %, " + fmtDF(p / 100, 2) + ", \\(" + FR(frn, frd) + "\\)"; }
  var corr = forms(k, fn, fd);
  var cands = [
    { t: forms(u, u / gu, 100 / gu), fb: "Cela décrit les carrés non ombrés ; la question porte sur la partie ombrée." },
    { t: fmtD(k, 0) + " %, " + fmtD(k / 10, 2) + ", \\(" + FR(fn, fd) + "\\)", fb: "Le nombre décimal là est dix fois trop grand ; un pourcentage est divisé par 100 pour donner son nombre décimal." },
    { t: fmtD(k, 0) + " %, " + fmtDF(k / 100, 2) + ", \\(" + FR(k, u) + "\\)", fb: "Cette fraction compare les carrés ombrés avec les carrés non ombrés ; une fraction partie-tout utilise la grille entière comme dénominateur." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compte les carrés ombrés sur les 100 de la grille, puis convertis : \\[ \\begin{aligned} \\text{pourcentage} &= " + k + " \\% \\\\ \\text{décimal} &= " + k + " \\div 100 = " + fmtDF(k / 100, 2) + " \\\\ \\text{fraction} &= " + FR(k, 100) + " = " + FR(fn, fd) + " \\end{aligned} \\] Donc la partie ombrée, en pourcentage, en nombre décimal et en fraction, est <b>" + corr + "</b>.";
  var q = mcq("Le diagramme montre une grille de 100 carrés avec des carrés ombrés. Quelle rangée donne la partie ombrée en pourcentage, en nombre décimal et en fraction irréductible, dans cet ordre ?", { t: corr, fb: "Exact : le nombre sur 100 donne le pourcentage, et les autres formes suivent." }, ds, sol, { mode: "grid-read", k: k });
  q.figure = u5gridSVG(k);
  return q;
}, ["Compte d'abord les carrés ombrés ; sur 100, ce nombre est le pourcentage lui-même.", "Compte d'abord les carrés ombrés, puis divise par 100 pour le nombre décimal et réduis pour la fraction."]);

// 10. L2, 6.1, CR 3: percent of a number in context.
E("u5-percent-of-number", 5, ["6.1"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var pairs = [[20, 150], [25, 240], [30, 120], [40, 250], [50, 180], [60, 350], [75, 160], [80, 450], [15, 200], [35, 300], [90, 600], [10, 480], [45, 220], [55, 400], [65, 500], [70, 320], [85, 700], [95, 900], [5, 640], [12, 350], [18, 450], [22, 550]];
    var pr = pick(pairs), p = pr[0], W = pr[1], ans = W * p / 100;
    var ctxs = [
      "Dans un sondage, " + p + " % de " + W + " élèves ont dit qu'ils marchent pour aller à l'école. Combien d'élèves ont dit qu'ils marchent pour aller à l'école ?",
      "Une équipe de hockey a marqué des buts sur " + p + " % de ses " + W + " tirs au but cette saison. Combien de buts l'équipe a-t-elle marqués ?",
      "Un magasin a vendu " + p + " % de " + W + " billets de concert dans la première heure. Combien de billets ont été vendus dans la première heure ?"
    ];
    var prompt = pick(ctxs);
    var sol = "Trouve le pourcentage du montant total : \\[ \\begin{aligned} " + p + " \\% \\text{ de } " + W + " &= " + fmtD(p / 100, 2) + " \\times " + W + " \\\\ &= " + fmtD(ans, 0) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(ans, 0) + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "pct-of-std", p: p, w: W });
  }
  if (mode === 1) {
    var pairs2 = [[110, 200], [120, 250], [125, 160], [130, 300], [150, 240], [175, 120], [200, 90], [140, 350], [115, 400], [135, 500], [160, 450], [180, 600], [225, 320], [250, 280]];
    var pr2 = pick(pairs2), p2 = pr2[0], W2 = pr2[1], ans2 = W2 * p2 / 100;
    var prompt2 = "L'an passé, une équipe de sentier a débroussaillé " + W2 + " m de sentier. Cette année, l'équipe a débroussaillé " + p2 + " % autant de sentier que l'an passé. Combien de mètres de sentier l'équipe a-t-elle débroussaillés cette année ?";
    var sol2 = "Un pourcentage de plus de 100 % donne un montant plus grand que le tout auquel il est comparé : \\[ \\begin{aligned} " + p2 + " \\% \\text{ de } " + W2 + " &= " + fmtD(p2 / 100, 2) + " \\times " + W2 + " \\\\ &= " + fmtD(ans2, 0) + " \\end{aligned} \\] Donc l'équipe a débroussaillé <b>" + fmtD(ans2, 0) + " m</b>.";
    return numq(prompt2, ans2, 0.01, sol2, { mode: "pct-of-over", p: p2, w: W2 });
  }
  var pairs3 = [[5, 4000], [4, 5000], [8, 2000], [5, 8000], [2, 10000], [8, 6000], [4, 12000], [2, 15000], [5, 20000], [8, 9000], [4, 25000], [2, 30000]];
  var pr3 = pick(pairs3), p10 = pr3[0], W3 = pr3[1], ans3 = W3 * p10 / 1000;
  var pStr3 = fmtD(p10 / 10, 1);
  var prompt3 = "Une ville a " + fmtD(W3) + " habitants. Environ " + pStr3 + " % des habitants sont nés un jour férié. Environ combien d'habitants sont nés un jour férié ?";
  var sol3 = "Un pourcentage sous 1 % est une petite fraction du tout : \\[ \\begin{aligned} " + pStr3 + " \\% \\text{ de } " + fmtD(W3) + " &= " + fmtD(p10 / 1000, 4) + " \\times " + fmtD(W3) + " \\\\ &= " + fmtD(ans3, 0) + " \\end{aligned} \\] Donc environ <b>" + fmtD(ans3, 0) + " habitants</b> sont nés un jour férié.";
  return numq(prompt3, ans3, 0.01, sol3, { mode: "pct-of-small", p: pStr3, w: W3 });
}, ["Change d'abord le pourcentage en nombre décimal, puis multiplie par le montant total.", "Écris d'abord le pourcentage en nombre décimal en le divisant par 100."]);

// 11. L2, 6.1, CR 3: find the whole given a part and a percent.
E("u5-find-the-whole", 5, ["6.1"], 2, "gen", function () {
  var pool = [[25, 60], [20, 80], [30, 90], [40, 150], [50, 70], [75, 120], [80, 200], [10, 240], [60, 300], [90, 400], [15, 200], [35, 260], [12, 250], [16, 150], [18, 200], [22, 150], [28, 250], [32, 200], [38, 150], [42, 200], [48, 250], [52, 200], [56, 150], [64, 200], [72, 250], [84, 150], [88, 200], [45, 180], [65, 140], [85, 220], [55, 160], [95, 300]];
  var pr = pick(pool), p = pr[0], W = pr[1], part = W * p / 100;
  var ctxs = [
    { q: part + " élèves représentent " + p + " % des élèves d'une école. Combien d'élèves y a-t-il dans l'école ?", unit: "élèves" },
    { q: "Une équipe a marqué " + part + " points, ce qui est " + p + " % des points qu'il lui faut pour une bannière. Combien de points l'équipe doit-elle marquer en tout ?", unit: "points" },
    { q: "Après une vente du matin, il restait " + part + " billets non vendus, et c'est " + p + " % des billets imprimés. Combien de billets ont été imprimés ?", unit: "billets" }
  ];
  var cx = pick(ctxs);
  var sol = "La partie et son pourcentage donnent le tout quand la partie est divisée par le pourcentage en nombre décimal : \\[ \\begin{aligned} \\text{total} &= " + part + " \\div " + fmtD(p / 100, 2) + " \\\\ &= " + W + " \\end{aligned} \\] Donc le tout est <b>" + W + " " + cx.unit + "</b>.";
  return numq(cx.q, W, 0.01, sol, { mode: "find-whole", p: p, part: part });
}, ["Le montant donné est seulement le pourcentage nommé du tout, donc le tout est plus grand.", "Écris d'abord le pourcentage en nombre décimal, puis divise la partie par ce nombre décimal."]);

// 12. L2, 6.2, CR 3: combined percents, discount then HST.
E("u5-discount-then-tax", 5, ["6.2"], 2, "gen", function () {
  var items = ["veste d'hiver", "casque de vélo", "paire de raquettes", "sac à dos d'école", "paire de gants de curling", "manteau de pluie"];
  var item = pick(items), P = pick([60, 80, 100, 120, 160, 200, 240, 300, 400]), d = pick([10, 20, 25, 30, 40, 50]);
  var sale = P * (1 - d / 100), fin = u5r2(sale * 1.15), tax = u5r2(fin - sale);
  var sol = "Applique d'abord le rabais, puis ajoute la TVH de 15 % au prix de solde : \\[ \\begin{aligned} \\text{prix de solde} &= " + fmtDF(P, 2) + " \\times " + fmtD(1 - d / 100, 2) + " = " + fmtDF(sale, 2) + " \\\\ \\text{prix final} &= " + fmtDF(sale, 2) + " \\times 1,15 = " + fmtDF(fin, 2) + " \\end{aligned} \\] Donc le prix final est <b>" + fmtDF(fin, 2) + " $</b>.";
  return numq("Un magasin vend l'article suivant : " + item + ", au prix de " + fmtDF(P, 2) + " $. L'article est en solde avec " + d + " % de rabais. La TVH de 15 % est ensuite ajoutée au prix de solde. Quel est le prix final, en dollars ?", fin, 0.01, sol, { mode: "disc-tax", p: P, d: d });
}, ["Les pourcentages combinés agissent l'un après l'autre, et le deuxième pourcentage agit sur le nouveau montant.", "Enlève d'abord le rabais du plein prix pour obtenir le prix de solde."]);

// 13. L2, 6.3: percent of a percent.
E("u5-percent-of-percent", 5, ["6.3"], 1, "gen", function () {
  var A = pick([20, 30, 40, 50, 60, 70, 80, 90]), B = pick([20, 30, 40, 50, 60, 70, 80, 90]);
  var ans = A * B / 100;
  var ctxs = [
    { q: "Dans une école, " + A + " % des élèves prennent l'autobus. Parmi les élèves qui prennent l'autobus, " + B + " % prennent l'autobus 4. Quel pourcentage de tous les élèves prend l'autobus 4 ?", thing: "prennent l'autobus 4" },
    { q: "Dans une équipe, " + A + " % des joueurs sont en 8e année. Parmi ces joueurs de 8e année, " + B + " % jouent en défense. Quel pourcentage de toute l'équipe sont des joueurs de 8e année qui jouent en défense ?", thing: "sont des joueurs de 8e année qui jouent en défense" },
    { q: "Dans une bibliothèque, " + A + " % des livres sont des documentaires. Parmi les documentaires, " + B + " % sont sur les animaux. Quel pourcentage de tous les livres sont des documentaires sur les animaux ?", thing: "sont des documentaires sur les animaux" }
  ];
  var cx = pick(ctxs);
  var cands = [
    { t: fmtD(A + B, 0) + " %", fb: "Cela additionne les deux pourcentages ; le deuxième pourcentage agit seulement sur le premier groupe, donc les pourcentages sont multipliés, pas additionnés." },
    { t: fmtD(B, 0) + " %", fb: "C'est le deuxième pourcentage seul ; il décrit seulement le plus petit groupe, pas le groupe entier." },
    { t: fmtD(A, 0) + " %", fb: "C'est le premier pourcentage seul ; il ne réduit pas le groupe une deuxième fois." },
    { t: fmtD(Math.abs(A - B), 0) + " %", fb: "Cela soustrait les deux pourcentages ; trouver un pourcentage d'un pourcentage demande une multiplication." }
  ];
  var ds = u5pick3(fmtD(ans, 0) + " %", cands);
  var sol = "Un pourcentage d'un pourcentage multiplie les deux nombres décimaux : \\[ \\begin{aligned} " + fmtD(A / 100, 2) + " \\times " + fmtD(B / 100, 2) + " &= " + fmtD(ans / 100, 4) + " \\\\ &= " + fmtD(ans, 0) + " \\% \\end{aligned} \\] Donc <b>" + fmtD(ans, 0) + " %</b> du groupe entier " + cx.thing + ".";
  return mcq(cx.q, { t: fmtD(ans, 0) + " %", fb: "Exact : le deuxième pourcentage est pris du premier groupe, donc les nombres décimaux se multiplient." }, ds, sol, { mode: "pct-of-pct", a: A, b: B });
}, ["Le deuxième pourcentage agit seulement sur le groupe que le premier pourcentage a choisi.", "Change d'abord les deux pourcentages en nombres décimaux, puis multiplie-les."]);

// 14. L2, 3.9: express a three-term ratio from a context.
E("u5-three-term-ratio", 5, ["3.9"], 1, "gen", function () {
  var ctxs = [
    { n: ["pots de peinture rouge", "pots de peinture jaune", "pots de peinture blanche"] }, { n: ["pièces de 5 cents", "pièces de 10 cents", "pièces de 25 cents"] },
    { n: ["pommes", "poires", "prunes"] }, { n: ["tambours", "guitares", "violons"] },
    { n: ["élèves débutants", "élèves intermédiaires", "élèves avancés"] }, { n: ["sacs de sable", "sacs de gravier", "sacs de ciment"] }
  ];
  var cx = pick(ctxs), vals = [3, 4, 5], att = 0;
  do { vals = [ri(2, 11), ri(2, 11), ri(2, 11)]; att++; } while (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1 && att < 80);
  if (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1) vals = [2, 3, 5];
  var a = vals[0], b = vals[1], c = vals[2], tot = a + b + c;
  var corr = a + ":" + b + ":" + c;
  var cands = [
    { t: c + ":" + b + ":" + a, fb: "Cela renverse l'ordre ; les termes doivent suivre l'ordre où les groupes sont nommés." },
    { t: a + ":" + b + ":" + tot, fb: "Cela met le total à la place du troisième groupe ; le troisième terme est le nombre du troisième groupe." },
    { t: a + ":" + c + ":" + b, fb: "Cela échange le deuxième et le troisième groupe ; vérifie l'ordre où les groupes sont nommés." },
    { t: b + ":" + a + ":" + c, fb: "Cela échange le premier et le deuxième groupe ; vérifie l'ordre où les groupes sont nommés." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Écris les trois nombres dans l'ordre où les groupes sont nommés : \\[ \\begin{aligned} " + cx.n[0] + " : " + cx.n[1] + " : " + cx.n[2] + " &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] Donc le rapport à trois termes est <b>" + corr + "</b>.";
  return mcq("Une collection contient " + a + " " + cx.n[0] + ", " + b + " " + cx.n[1] + " et " + c + " " + cx.n[2] + ". Quel est le rapport de " + cx.n[0] + " à " + cx.n[1] + " à " + cx.n[2] + " ?", { t: corr, fb: "Exact : les trois nombres apparaissent une fois chacun, dans l'ordre nommé." }, ds, sol, { mode: "three-term", a: a, b: b, c: c });
}, ["Un rapport à trois termes contient les trois nombres, dans l'ordre exact où les groupes sont nommés.", "Écris d'abord les trois nombres en ordre, puis joins-les avec des deux-points."]);

// 15. L2, 3.10: part-to-part ratio as a part-to-whole fraction.
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 5 second half (Percent, Ratio and Rate), entries
   u5-part-to-whole-fraction to u5-mixed-forms-order (16 entries).
   Translated per RULES.md and GLOSSARY.md. Unit title in glossary:
   Les pourcentages, les rapports et les taux. Terms used: rapport,
   taux, taux unitaire, pourcentage.

   Judgement calls (glossary silent or wording rebuilt):
   - "whole" in part-to-whole rendered "entier" (partie a entier),
     including the TeX label \text{entier}.
   - "scale" (ratio scale factor) rendered "facteur", TeX label
     \text{facteur}; "one part" rendered "une partie".
   - Context nouns rebuilt with articles in the solution sentences
     (les jetons rouges, les garçons, les victoires, etc.) so agreement
     survives the random context sets; prompts use "des ... aux ...".
   - "hose" rendered "tuyau", "scoops" rendered "pelletées".
   - "Pack" rendered "paquet"; better-buy items carry French thing
     and unit names (barres granola/barre, boîtes de jus/boîte, etc.).

   FMT-GEOM lines left as fmt(: none. This chunk has no SVG or figure
   helpers, so every display fmt( became fmtD( and every fmtF( became
   fmtDF(. Money is amount then " $", percent is always spaced " %",
   including "\\ %" inside math delimiters.

   Literal formatted numbers in static prose: percent literals are
   all spaced (p. ex. 100 % in feedback is generated, not literal);
   dollar literals in static prose: 12 $ and 9 $ in
   u5-identify-rate-example, 36 $ in u5-context-for-rate-ab.
   No thousands literals in static prose; generated values go
   through fmtD/fmtDF.

   Unsure about: nothing blocking. "Entier" for whole and "facteur"
   for scale are working choices where the glossary is silent.
*/
E("u5-part-to-whole-fraction", 5, ["3.10"], 1, "gen", function () {
  var ctxs = [
    { a: "jetons rouges", b: "jetons bleus", first: "les jetons rouges" }, { a: "garçons", b: "filles", first: "les garçons" },
    { a: "victoires", b: "défaites", first: "les victoires" }, { a: "livres de fiction", b: "livres documentaires", first: "les livres de fiction" }
  ];
  var cx = pick(ctxs), a = ri(2, 14), b = ri(2, 14), att2 = 0;
  while (a === b && att2 < 60) { b = ri(2, 14); att2++; }
  if (a === b) b = a + 1;
  var tot = a + b;
  var g = u5gcd(a, tot), corr = "\\(" + FR(a / g, tot / g) + "\\)";
  var gb = u5gcd(b, tot);
  var cands = [
    { t: "\\(" + FR(a, b) + "\\)", fb: "C'est le rapport partie à partie écrit comme une fraction. Une fraction partie à entier demande le total au dénominateur." },
    { t: "\\(" + FR(b / gb, tot / gb) + "\\)", fb: "C'est la part du deuxième groupe. La question demande le premier groupe." },
    { t: "\\(" + FR(tot, a) + "\\)", fb: "Cela inverse la fraction. La partie va au numérateur et l'entier au dénominateur." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "L'entier est la somme des deux parties, et la fraction met la partie sur l'entier : \\[ \\begin{aligned} \\text{entier} &= " + a + " + " + b + " = " + tot + " \\\\ \\text{fraction} &= " + FR(a, tot) + " = " + FR(a / g, tot / g) + " \\end{aligned} \\] Donc la fraction que forment " + cx.first + " est <b>" + corr + "</b>.";
  return mcq("Le rapport des " + cx.a + " aux " + cx.b + " dans un ensemble est de " + a + ":" + b + ". Quelle fraction de l'ensemble entier forment les " + cx.a + " ? Donne la fraction sous sa forme la plus simple.", { t: corr, fb: "Exact : la première partie est sur le total des deux parties, puis on réduit." }, ds, sol, { mode: "part-whole", a: a, b: b });
}, ["Partie à entier veut dire que le dénominateur est la somme des deux parties, pas l'autre partie.", "Additionne d'abord les deux termes du rapport pour obtenir l'entier."]);

// 16. L2, 3.11: express a ratio as a percent.
E("u5-ratio-as-percent", 5, ["3.11"], 1, "gen", function () {
  var ctxs = [
    { a: "victoires", b: "défaites", first: "les victoires" }, { a: "billes rouges", b: "billes vertes", first: "les billes rouges" },
    { a: "jours ensoleillés", b: "jours nuageux", first: "les jours ensoleillés" }, { a: "choix de fiction", b: "choix documentaires", first: "les choix de fiction" }
  ];
  var cx = pick(ctxs), T = pick([5, 10, 20, 25, 50]), a = ri(1, T - 1);
  if (a * 2 === T) a += 1;
  var b = T - a;
  var pct = a * 100 / T, comp = 100 - pct;
  var c1t = fmtD(u5r2(a / b * 100), 1) + " %";
  var c2t = (c1t.indexOf(",") >= 0) ? fmtDF(comp, 1) + " %" : fmtD(comp, 1) + " %";
  var cands = [
    { t: c1t, fb: "Cela divise la première partie par la deuxième partie. Un pourcentage de l'entier divise la première partie par le total." },
    { t: c2t, fb: "C'est le pourcentage du deuxième groupe. La question demande le premier groupe." },
    { t: fmtD(a, 0) + " %", fb: "Cela utilise le nombre lui-même comme pourcentage. Il faut d'abord comparer le nombre au total." },
    { t: fmtD(pct / 10, 2) + " %", fb: "C'est dix fois trop petit. On multiplie la fraction de l'entier par 100 pour obtenir un pourcentage." }
  ];
  var ds = u5pick3(fmtD(pct, 1) + " %", cands);
  var sol = "Le pourcentage est la première partie sur l'entier, fois 100 : \\[ \\begin{aligned} \\text{entier} &= " + a + " + " + b + " = " + T + " \\\\ \\text{pourcentage} &= " + FR(a, T) + " \\times 100 = " + fmtD(pct, 1) + " \\% \\end{aligned} \\] Donc " + cx.first.trim() + " forment <b>" + fmtD(pct, 1) + " %</b> de l'entier.";
  return mcq("Le rapport des " + cx.a + " aux " + cx.b + " est de " + a + ":" + b + ". Quel pourcentage de l'entier forment les " + cx.a + " ?", { t: fmtD(pct, 1) + " %", fb: "Exact : on divise la première partie par le total, puis on multiplie par 100." }, ds, sol, { mode: "ratio-pct", a: a, b: b });
}, ["Un terme du rapport devient un pourcentage seulement après comparaison avec l'entier, pas avec l'autre terme.", "Additionne d'abord les termes pour obtenir l'entier, puis divise le premier terme par l'entier."]);

// 17. L2, 3.13, var: explain the meaning of a/b in a ratio context.
E("u5-meaning-of-ratio-ab", 5, ["3.13"], 1, "var", varset([
  function () {
    var sol = "Sous forme de rapport, les deux nombres comparent deux quantités distinctes : \\[ \\begin{aligned} " + FR(2, 3) + " &\\text{ veut dire } 2 \\text{ pour } 3 \\end{aligned} \\] Donc cela veut dire <b>pour chaque 2 tasses de sirop, il y a 3 tasses d'eau</b>.";
    return mcq("Dans un mélange de jus, le rapport du sirop à l'eau est écrit \\(" + FR(2, 3) + "\\). Que veut dire ce rapport ?", { t: "Pour chaque 2 tasses de sirop, il y a 3 tasses d'eau.", fb: "Exact : le numérateur et le dénominateur sont les deux quantités comparées, dans l'ordre." }, [
      { t: "Le sirop forme 2 des 3 tasses du mélange entier.", fb: "Cela lit la fraction comme partie à entier. Ici, les deux nombres comparent le sirop et l'eau directement." },
      { t: "Pour chaque 3 tasses de sirop, il y a 2 tasses d'eau.", fb: "Cela inverse les deux quantités. Le sirop est nommé en premier, donc sa quantité vient en premier." },
      { t: "Le mélange entier contient 3 tasses en tout.", fb: "Le 3 est la quantité d'eau dans la comparaison, pas la taille du mélange entier." }
    ], sol, { mode: "meaning-23" });
  },
  function () {
    var sol = "La fraction compare le premier groupe avec le deuxième groupe : \\[ \\begin{aligned} " + FR(4, 5) + " &\\text{ veut dire } 4 \\text{ pour } 5 \\end{aligned} \\] Donc cela veut dire <b>pour chaque 4 garçons à l'entraînement, il y a 5 filles à l'entraînement</b>.";
    return mcq("À un entraînement, le rapport des garçons aux filles est écrit \\(" + FR(4, 5) + "\\). Que veut dire ce rapport ?", { t: "Pour chaque 4 garçons à l'entraînement, il y a 5 filles à l'entraînement.", fb: "Exact : les deux nombres sont les tailles des deux groupes, dans l'ordre nommé." }, [
      { t: "Les garçons forment 4 des 5 élèves à l'entraînement.", fb: "Cela lit la fraction comme partie à entier. Ici, les nombres comparent les deux groupes entre eux." },
      { t: "Pour chaque 5 garçons à l'entraînement, il y a 4 filles à l'entraînement.", fb: "Cela inverse les groupes. Les garçons sont nommés en premier, donc leur nombre vient en premier." },
      { t: "Il y a 5 élèves en tout à l'entraînement.", fb: "Le 5 est le nombre de filles dans le groupe de comparaison, pas le total à l'entraînement." }
    ], sol, { mode: "meaning-45" });
  },
  function () {
    var sol = "Une fraction de rapport garde les deux quantités et l'ordre où elles sont nommées : \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ veut dire } 5 \\text{ pour } 2 \\end{aligned} \\] Donc cela veut dire <b>pour chaque 5 tasses de farine, il y a 2 tasses de sucre</b>.";
    return mcq("Dans une recette, le rapport de la farine au sucre est écrit \\(" + FR(5, 2) + "\\). Que veut dire ce rapport ?", { t: "Pour chaque 5 tasses de farine, il y a 2 tasses de sucre.", fb: "Exact : la farine est comparée au sucre, avec les deux quantités dans l'ordre." }, [
      { t: "La farine forme 5 des 2 tasses de la recette.", fb: "Une partie ne peut pas être plus grande que son entier de cette façon. Ici, les nombres comparent deux ingrédients entre eux." },
      { t: "Pour chaque 2 tasses de farine, il y a 5 tasses de sucre.", fb: "Cela inverse les ingrédients. La farine est nommée en premier dans le rapport." },
      { t: "La recette utilise 2 tasses en tout.", fb: "Le 2 est la quantité de sucre dans la comparaison, pas la quantité totale de la recette." }
    ], sol, { mode: "meaning-52" });
  },
  function () {
    var sol = "Chaque nombre du rapport appartient à une des deux couleurs comparées : \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ veut dire } 3 \\text{ pour } 4 \\end{aligned} \\] Donc cela veut dire <b>pour chaque 3 jetons rouges, il y a 4 jetons bleus</b>.";
    return mcq("Dans un bac, le rapport des jetons rouges aux jetons bleus est écrit \\(" + FR(3, 4) + "\\). Que veut dire ce rapport ?", { t: "Pour chaque 3 jetons rouges, il y a 4 jetons bleus.", fb: "Exact : le rapport compare le nombre rouge avec le nombre bleu, dans cet ordre." }, [
      { t: "Les jetons rouges forment 3 des 4 jetons du bac.", fb: "Cela lit la fraction comme partie à entier. Ici, le 4 est le nombre bleu, pas le total." },
      { t: "Pour chaque 4 jetons rouges, il y a 3 jetons bleus.", fb: "Cela inverse les couleurs. Le rouge est nommé en premier, donc son nombre vient en premier." },
      { t: "Il y a 4 jetons en tout dans le bac.", fb: "Le 4 est le nombre bleu dans la comparaison, pas le nombre total de jetons." }
    ], sol, { mode: "meaning-34" });
  },
  function () {
    var sol = "Le rapport relie les deux distances qui vont avec un tour complet : \\[ \\begin{aligned} " + FR(7, 5) + " &\\text{ veut dire } 7 \\text{ pour } 5 \\end{aligned} \\] Donc cela veut dire <b>pour chaque 7 m que la roue avant parcourt, la roue arrière parcourt 5 m dans la même comparaison</b>.";
    return mcq("Un tableau d'engrenages écrit le rapport de la distance de la roue avant à la distance de la roue arrière sous la forme \\(" + FR(7, 5) + "\\). Que veut dire ce rapport ?", { t: "Pour chaque 7 m de distance de la roue avant, il y a 5 m de distance de la roue arrière.", fb: "Exact : les deux nombres comparent les deux distances directement, dans l'ordre nommé." }, [
      { t: "La distance de la roue avant est 7 des 5 m parcourus en tout.", fb: "Cela lit la fraction comme partie à entier. Le 5 est la deuxième distance, pas un total." },
      { t: "Pour chaque 5 m de distance de la roue avant, il y a 7 m de distance de la roue arrière.", fb: "Cela inverse les deux roues. La roue avant est nommée en premier." },
      { t: "Les deux roues parcourent 5 m en tout.", fb: "Le 5 appartient à la distance de la roue arrière dans la comparaison, pas à un total." }
    ], sol, { mode: "meaning-75" });
  }
]), ["Dans un rapport, une fraction compare deux quantités entre elles, pas une partie avec un entier.", "Nomme d'abord à quelle quantité appartient le nombre du haut et à quelle quantité appartient le nombre du bas."]);

// 18. L2, 3.15, var: provide a context where a/b represents a ratio.
E("u5-context-for-ratio-ab", 5, ["3.15"], 1, "var", varset([
  function () {
    var sol = "Un rapport compare deux quantités distinctes de même nature : \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ comme rapport veut dire } 3 \\text{ pour } 4 \\end{aligned} \\] Donc le contexte de rapport est <b>un bac avec 3 stylos rouges pour chaque 4 stylos bleus</b>.";
    return mcq("Dans quel contexte \\(" + FR(3, 4) + "\\) représente-t-il un rapport ?", { t: "Un bac contient 3 stylos rouges pour chaque 4 stylos bleus.", fb: "Exact : deux groupes distincts, les stylos rouges et les stylos bleus, sont comparés entre eux." }, [
      { t: "Trois des 4 tranches d'une pizza ont du fromage.", fb: "C'est une partie d'une pizza entière, une fraction partie à entier, pas une comparaison de deux groupes." },
      { t: "Une classe partage 3 pizzas également entre 4 élèves de la classe.", fb: "C'est une situation de partage par division, pas une comparaison de deux groupes." },
      { t: "Une voiture parcourt 3 km en 4 minutes sur une route.", fb: "Cela compare deux unités différentes, la distance et le temps, donc c'est une situation de taux." }
    ], sol, { mode: "ctx-ratio-34" });
  },
  function () {
    var sol = "Les deux nombres doivent nommer deux groupes comparés : \\[ \\begin{aligned} " + FR(5, 3) + " &\\text{ comme rapport veut dire } 5 \\text{ pour } 3 \\end{aligned} \\] Donc le contexte de rapport est <b>une étagère avec 5 romans pour chaque 3 bandes dessinées</b>.";
    return mcq("Dans quel contexte \\(" + FR(5, 3) + "\\) représente-t-il un rapport ?", { t: "Une étagère contient 5 romans pour chaque 3 bandes dessinées.", fb: "Exact : les romans et les bandes dessinées sont deux groupes distincts comparés." }, [
      { t: "Cinq des 3 pages assignées pour les devoirs ont été lues hier soir.", fb: "Une partie ne peut pas être 5 de 3 pages de cette façon. Ici, les nombres ne comparent pas deux groupes." },
      { t: "Un groupe partage 5 barres granola entre 3 amis du groupe.", fb: "C'est une division de partage, pas une comparaison de deux groupes." },
      { t: "Un tuyau remplit 5 L en 3 minutes à la piscine.", fb: "Cela compare les litres et les minutes, deux unités différentes, donc c'est une situation de taux." }
    ], sol, { mode: "ctx-ratio-53" });
  },
  function () {
    var sol = "Les victoires et les défaites sont deux résultats distincts comparés : \\[ \\begin{aligned} " + FR(7, 2) + " &\\text{ comme rapport veut dire } 7 \\text{ pour } 2 \\end{aligned} \\] Donc le contexte de rapport est <b>une équipe avec 7 victoires pour chaque 2 défaites</b>.";
    return mcq("Dans quel contexte \\(" + FR(7, 2) + "\\) représente-t-il un rapport ?", { t: "Une équipe a 7 victoires pour chaque 2 défaites cette saison.", fb: "Exact : les victoires et les défaites sont deux nombres distincts comparés entre eux." }, [
      { t: "Sept des 2 périodes d'un match de hockey ont été sans point du tout.", fb: "Une partie ne peut pas être 7 de 2 périodes de cette façon. Ici, les nombres ne comparent pas deux groupes." },
      { t: "Sept joueurs partagent 2 bouteilles d'eau à l'entraînement.", fb: "C'est une situation de partage, pas une comparaison de deux groupes." },
      { t: "Une surfaceuse couvre 7 m en 2 secondes sur la glace.", fb: "Cela compare les mètres et les secondes, deux unités différentes, donc c'est une situation de taux." }
    ], sol, { mode: "ctx-ratio-72" });
  },
  function () {
    var sol = "Deux types de plantes dans le même jardin sont comparés directement : \\[ \\begin{aligned} " + FR(2, 5) + " &\\text{ comme rapport veut dire } 2 \\text{ pour } 5 \\end{aligned} \\] Donc le contexte de rapport est <b>un jardin avec 2 rosiers pour chaque 5 parcelles de tulipes</b>.";
    return mcq("Dans quel contexte \\(" + FR(2, 5) + "\\) représente-t-il un rapport ?", { t: "Un jardin a 2 rosiers pour chaque 5 parcelles de tulipes.", fb: "Exact : deux groupes distincts de plantes sont comparés entre eux." }, [
      { t: "Deux des 5 rangées du jardin sont plantées de roses.", fb: "C'est une partie d'un jardin entier, une fraction partie à entier." },
      { t: "Deux jardiniers partagent 5 arrosoirs.", fb: "C'est une situation de partage, pas une comparaison de deux groupes." },
      { t: "La pluie tombe de 2 cm en 5 heures pendant une tempête d'automne.", fb: "Cela compare les centimètres et les heures, deux unités différentes, donc c'est une situation de taux." }
    ], sol, { mode: "ctx-ratio-25" });
  },
  function () {
    var sol = "Deux types de chansons dans la même liste sont comparés entre eux : \\[ \\begin{aligned} " + FR(4, 9) + " &\\text{ comme rapport veut dire } 4 \\text{ pour } 9 \\end{aligned} \\] Donc le contexte de rapport est <b>une liste avec 4 chansons rock pour chaque 9 chansons pop</b>.";
    return mcq("Dans quel contexte \\(" + FR(4, 9) + "\\) représente-t-il un rapport ?", { t: "Une liste contient 4 chansons rock pour chaque 9 chansons pop.", fb: "Exact : les chansons rock et les chansons pop sont deux groupes distincts comparés." }, [
      { t: "Quatre des 9 chansons d'un album de musique sont des chansons rock.", fb: "C'est une partie d'un album entier, une fraction partie à entier." },
      { t: "Quatre chanteurs partagent 9 microphones sur scène.", fb: "C'est une situation de partage, pas une comparaison de deux groupes." },
      { t: "Un haut-parleur joue 4 chansons en 9 minutes.", fb: "Cela compare les chansons et les minutes, deux unités différentes, donc c'est une situation de taux." }
    ], sol, { mode: "ctx-ratio-49" });
  }
]), ["Un contexte de rapport compare deux quantités distinctes. Une partie d'un entier et une comparaison d'unités différentes sont des idées différentes.", "Vérifie d'abord ce que les deux nombres décrivent : deux groupes, un entier, ou deux unités différentes."]);

// 19. L2, 3.12: identify a ratio from a real-life example and record it in simplest form.
E("u5-identify-ratio-simplest", 5, ["3.12"], 1, "gen", function () {
  var ctxs = [
    { s: "Un comptage de plateaux de cafétéria trouve {A} boîtes de jus et {B} cartons de lait sur la ligne du dîner.", a: "boîtes de jus", b: "cartons de lait" },
    { s: "Un sondage sur les animaux compte {A} chiens et {B} chats dans un quartier.", a: "chiens", b: "chats" },
    { s: "Un comptage de stationnement trouve {A} voitures et {B} camionnettes avant un match.", a: "voitures", b: "camionnettes" },
    { s: "Un inventaire de bibliothèque de classe compte {A} albums et {B} livres à chapitres sur une étagère.", a: "albums", b: "livres à chapitres" },
    { s: "Une cantine d'aréna vend {A} chocolats chauds et {B} thés pendant l'entracte.", a: "chocolats chauds", b: "thés" },
    { s: "Un groupe de randonnée compte {A} adultes et {B} jeunes lors d'une randonnée du samedi.", a: "adultes", b: "jeunes" }
  ];
  var cx = pick(ctxs);
  var basePairs = [[2, 3], [3, 4], [4, 5], [5, 6], [3, 5], [5, 7], [2, 5], [4, 7], [5, 3], [7, 4], [3, 2], [5, 4]];
  var bp = pick(basePairs), m = ri(2, 6), A = bp[0] * m, B = bp[1] * m;
  var corr = bp[0] + ":" + bp[1];
  var cands = [
    { t: A + ":" + B, fb: "C'est le rapport avec les nombres bruts. La question demande la forme la plus simple, donc divise les deux termes par " + m + "." },
    { t: bp[1] + ":" + bp[0], fb: "Cela inverse les deux groupes. L'ordre doit rester comme dans l'exemple." },
    { t: bp[0] + ":" + (bp[0] + bp[1]), fb: "Cela compare le premier groupe au total. Ici, un rapport compare les deux groupes entre eux." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Écris les nombres comme un rapport, puis divise les deux termes par leur facteur commun : \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + A + " : " + B + " \\\\ &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] Donc le rapport sous sa forme la plus simple est <b>" + corr + "</b>.";
  return mcq(cx.s.replace("{A}", A).replace("{B}", B) + " Quel est le rapport des " + cx.a + " aux " + cx.b + ", sous sa forme la plus simple ?", { t: corr, fb: "Exact : les nombres gardent leur ordre et on divise les deux termes par le même facteur commun." }, ds, sol, { mode: "identify-ratio", a: A, b: B });
}, ["Les nombres réels deviennent d'abord un rapport, et la forme la plus simple divise les deux termes par le même nombre.", "Écris d'abord le rapport avec les quantités comptées, dans l'ordre nommé."]);

// 20. L2, 6.28, CR 2: solve a ratio problem.
E("u5-ratio-problem-solve", 5, ["6.28"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var pairs = [[2, 3], [3, 5], [2, 5], [3, 4], [4, 7], [5, 3]];
    var pr = pick(pairs), a = pr[0], b = pr[1], s = ri(2, 9), given = a * s, ans = b * s;
    var ctxs = [
      "La peinture est mélangée selon le rapport " + a + ":" + b + " de peinture bleue à peinture blanche. Un lot utilise " + given + " L de peinture bleue. Combien de litres de peinture blanche le lot utilise-t-il ?",
      "Une recette de smoothie utilise des petits fruits et du yogourt selon le rapport " + a + ":" + b + ". Un grand lot utilise " + given + " tasses de petits fruits. Combien de tasses de yogourt le grand lot utilise-t-il ?",
      "Un mélange montagnard contient des arachides et des raisins secs selon le rapport " + a + ":" + b + ". Un sac est fait avec " + given + " g d'arachides. Combien de grammes de raisins secs y a-t-il dans le sac ?"
    ];
    var prompt = pick(ctxs);
    var sol = "Chaque partie du rapport représente la même quantité d'échelle : \\[ \\begin{aligned} \\text{facteur} &= " + given + " \\div " + a + " = " + s + " \\\\ \\text{deuxième quantité} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] Donc la deuxième quantité est <b>" + ans + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "ratio-scale", a: a, b: b });
  }
  var pairs2 = [[3, 2], [5, 3], [4, 3], [7, 5], [3, 5], [5, 2]];
  var pr2 = pick(pairs2), a2 = pr2[0], b2 = pr2[1], s2 = ri(2, 8), tot = (a2 + b2) * s2, ans2 = a2 * s2;
  var ctxs2 = [
    "Deux cousins se partagent " + tot + " autocollants selon le rapport " + a2 + ":" + b2 + ", le cousin le plus âgé recevant la première part. Combien d'autocollants le cousin le plus âgé reçoit-il ?",
    "Un ruban de " + tot + " cm est coupé en deux morceaux selon le rapport " + a2 + ":" + b2 + ". Quelle est la longueur du premier morceau, en centimètres ?",
    "Un fonds de classe de " + tot + " $ est partagé entre une sortie scolaire et des fournitures selon le rapport " + a2 + ":" + b2 + ", la sortie scolaire recevant la première part. Combien de dollars vont à la sortie scolaire ?"
  ];
  var prompt2 = pick(ctxs2);
  var sol2 = "Additionne les parties du rapport pour trouver la valeur d'une partie, puis prends la première part : \\[ \\begin{aligned} \\text{une partie} &= " + tot + " \\div " + (a2 + b2) + " = " + s2 + " \\\\ \\text{première part} &= " + a2 + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] Donc la première part est <b>" + ans2 + "</b>.";
  return numq(prompt2, ans2, 0.01, sol2, { mode: "ratio-share", a: a2, b: b2 });
}, ["Trouve d'abord la valeur d'une partie du rapport. Chaque partie du rapport a cette même valeur.", "Trouve d'abord le facteur ou la valeur d'une partie à partir de la quantité donnée."]);

// 21. L2, 3.17: identify and describe a rate from a real-life example.
E("u5-identify-rate-example", 5, ["3.17"], 1, "gen", function () {
  var tmpls = [
    { s: "Maya a parcouru {A} km en {B} h sur un sentier côtier et a payé des frais de sentier de 12 $.", A: [12, 60], B: [2, 6], corr: function (A, B) { return A + " km en " + B + " h"; }, rev: function (A, B) { return B + " h en " + A + " km"; }, wrong: "12 dollars pour les frais de sentier", wfb: "Les frais sont un seul montant, sans deuxième montant à comparer, donc ce n'est pas le taux dans cet exemple." },
    { s: "Une pompe a déplacé {A} L d'eau en {B} min pendant qu'une équipe de 6 travailleurs regardait.", A: [20, 90], B: [2, 9], corr: function (A, B) { return A + " L en " + B + " min"; }, rev: function (A, B) { return B + " min en " + A + " L"; }, wrong: "6 travailleurs dans l'équipe", wfb: "La taille de l'équipe est un seul nombre, sans comparaison, donc ce n'est pas le taux dans cet exemple." },
    { s: "Jonah a gagné {A} $ pour {B} h de travail dans la cour et a acheté ensuite une collation de 9 $.", A: [30, 120], B: [2, 8], corr: function (A, B) { return A + " $ en " + B + " h"; }, rev: function (A, B) { return B + " h pour " + A + " $"; }, wrong: "9 $ pour la collation", wfb: "Le prix de la collation est un seul montant, pas une comparaison de deux montants, donc ce n'est pas le taux ici." },
    { s: "Une imprimante a produit {A} pages en {B} min en utilisant 2 cartouches d'encre.", A: [30, 150], B: [2, 10], corr: function (A, B) { return A + " pages en " + B + " min"; }, rev: function (A, B) { return B + " min en " + A + " pages"; }, wrong: "2 cartouches d'encre", wfb: "Le nombre de cartouches est un seul nombre, pas une comparaison de deux montants, donc ce n'est pas le taux ici." }
  ];
  var t = pick(tmpls), A = ri(t.A[0], t.A[1]), B = ri(t.B[0], t.B[1]);
  var corr = t.corr(A, B);
  var cands = [
    { t: t.rev(A, B), fb: "Cela inverse la comparaison. La quantité gagnée, déplacée ou produite est décrite selon le temps pris." },
    { t: t.wrong, fb: t.wfb },
    { t: A + " pour " + B + " comme rapport de même nature", fb: "Les deux quantités ici ont des unités différentes, donc ensemble elles forment un taux, pas un rapport de même nature." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Un taux est la paire de quantités avec des unités différentes qui vont ensemble dans l'exemple : \\[ \\begin{aligned} \\text{taux} &= \\text{deux quantités mesurées en unités différentes} \\end{aligned} \\] Donc le taux décrit est <b>" + corr + "</b>.";
  return mcq(t.s.replace("{A}", A).replace("{B}", B) + " Quelle paire de quantités donne le taux dans cet exemple ?", { t: corr, fb: "Exact : ces deux quantités, avec des unités différentes, sont celles comparées dans l'exemple." }, ds, sol, { mode: "identify-rate", a: A, b: B });
}, ["Un taux dans un exemple est une paire de quantités avec des unités différentes qui vont ensemble.", "Cherche d'abord deux quantités mesurées en unités différentes qui décrivent la même activité."]);

// 22. L2, 3.14, var: provide a context where a/b represents a rate.
E("u5-context-for-rate-ab", 5, ["3.14"], 1, "var", varset([
  function () {
    var sol = "Un taux compare des quantités en deux unités différentes : \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ comme taux relie } 5 \\text{ cm à } 2 \\text{ semaines} \\end{aligned} \\] Donc le contexte de taux est <b>une plante qui pousse de 5 cm en 2 semaines</b>.";
    return mcq("Dans quel contexte \\(" + FR(5, 2) + "\\) représente-t-il un taux ?", { t: "Une plante pousse de 5 cm en 2 semaines.", fb: "Exact : les centimètres et les semaines sont des unités différentes, donc la comparaison est un taux." }, [
      { t: "Une étagère contient 5 jeux de société pour chaque 2 jeux de cartes.", fb: "Les deux quantités comptent des jeux, de même nature, donc cette comparaison est un rapport." },
      { t: "Cinq des 2 pains cuits ont été vendus à midi.", fb: "Une partie ne peut pas être 5 de 2 pains de cette façon. Ici, les nombres ne forment pas un taux." },
      { t: "Cinq amis partagent 2 pizzas à une fête.", fb: "C'est une situation de partage entre des personnes et des pizzas à un moment, pas un taux mesuré sur un intervalle." }
    ], sol, { mode: "ctx-rate-52" });
  },
  function () {
    var sol = "La distance comparée au temps est l'association de taux classique : \\[ \\begin{aligned} " + FR(90, 2) + " &\\text{ comme taux relie } 90 \\text{ km à } 2 \\text{ h} \\end{aligned} \\] Donc le contexte de taux est <b>un autobus qui parcourt 90 km en 2 h</b>.";
    return mcq("Dans quel contexte \\(" + FR(90, 2) + "\\) représente-t-il un taux ?", { t: "Un autobus parcourt 90 km en 2 h.", fb: "Exact : les kilomètres et les heures sont des unités différentes, donc la comparaison est un taux." }, [
      { t: "Un stationnement contient 90 voitures pour chaque 2 camions.", fb: "Les deux quantités comptent des véhicules, de même nature, donc cette comparaison est un rapport." },
      { t: "Quatre-vingt-dix des 2 traversiers étaient à l'heure aujourd'hui.", fb: "Une partie ne peut pas être 90 de 2 traversiers de cette façon. Ici, les nombres ne forment pas un taux." },
      { t: "Quatre-vingt-dix élèves partagent 2 gymnases pour une assemblée.", fb: "C'est une situation de partage à un moment, pas un taux mesuré sur un intervalle." }
    ], sol, { mode: "ctx-rate-902" });
  },
  function () {
    var sol = "L'argent gagné comparé au temps travaillé forme un taux : \\[ \\begin{aligned} " + FR(36, 3) + " &\\text{ comme taux relie } 36 \\text{ dollars à } 3 \\text{ h} \\end{aligned} \\] Donc le contexte de taux est <b>un travailleur qui gagne 36 $ en 3 h</b>.";
    return mcq("Dans quel contexte \\(" + FR(36, 3) + "\\) représente-t-il un taux ?", { t: "Un travailleur gagne 36 $ en 3 h de travail.", fb: "Exact : les dollars et les heures sont des unités différentes, donc la comparaison est un taux." }, [
      { t: "Une étagère contient 36 romans pour chaque 3 biographies.", fb: "Les deux quantités comptent des livres, de même nature, donc cette comparaison est un rapport." },
      { t: "Trente-six des 3 quarts de travail d'un magasin sont des quarts de jour.", fb: "Une partie ne peut pas être 36 de 3 quarts de cette façon. Ici, les nombres ne forment pas un taux." },
      { t: "Trente-six campeurs partagent 3 tentes lors d'un voyage.", fb: "C'est une situation de partage à un moment, pas un taux mesuré sur un intervalle." }
    ], sol, { mode: "ctx-rate-363" });
  },
  function () {
    var sol = "Le volume comparé au temps forme un taux pour l'eau qui coule : \\[ \\begin{aligned} " + FR(48, 4) + " &\\text{ comme taux relie } 48 \\text{ L à } 4 \\text{ min} \\end{aligned} \\] Donc le contexte de taux est <b>un tuyau qui fournit 48 L en 4 min</b>.";
    return mcq("Dans quel contexte \\(" + FR(48, 4) + "\\) représente-t-il un taux ?", { t: "Un tuyau fournit 48 L d'eau en 4 min.", fb: "Exact : les litres et les minutes sont des unités différentes, donc la comparaison est un taux." }, [
      { t: "Un parc de réservoirs contient 48 grands réservoirs pour chaque 4 petits réservoirs.", fb: "Les deux quantités comptent des réservoirs, de même nature, donc cette comparaison est un rapport." },
      { t: "Quarante-huit des 4 valves d'un tuyau sont ouvertes.", fb: "Une partie ne peut pas être 48 de 4 valves de cette façon. Ici, les nombres ne forment pas un taux." },
      { t: "Quarante-huit nageurs partagent 4 couloirs dans une piscine.", fb: "C'est une situation de partage à un moment, pas un taux mesuré sur un intervalle." }
    ], sol, { mode: "ctx-rate-484" });
  },
  function () {
    var sol = "Les pages comparées au temps forment un taux pour la vitesse de lecture : \\[ \\begin{aligned} " + FR(15, 5) + " &\\text{ comme taux relie } 15 \\text{ pages à } 5 \\text{ min} \\end{aligned} \\] Donc le contexte de taux est <b>un élève qui lit 15 pages en 5 min</b>.";
    return mcq("Dans quel contexte \\(" + FR(15, 5) + "\\) représente-t-il un taux ?", { t: "Un élève lit 15 pages en 5 min.", fb: "Exact : les pages et les minutes sont des unités différentes, donc la comparaison est un taux." }, [
      { t: "Un présentoir contient 15 livres reliés pour chaque 5 livres brochés.", fb: "Les deux quantités comptent des livres, de même nature, donc cette comparaison est un rapport." },
      { t: "Quinze des 5 chapitres assignés ont été terminés.", fb: "Une partie ne peut pas être 15 de 5 chapitres de cette façon. Ici, les nombres ne forment pas un taux." },
      { t: "Quinze lecteurs partagent 5 exemplaires d'un roman.", fb: "C'est une situation de partage à un moment, pas un taux mesuré sur un intervalle." }
    ], sol, { mode: "ctx-rate-155" });
  }
]), ["Un contexte de taux associe deux unités différentes. Un contexte de rapport associe des quantités de même nature.", "Vérifie d'abord les unités des deux nombres : des unités différentes indiquent un taux."]);

// 23. L2, 3.18, var: explain why a rate cannot be represented as a percent.
E("u5-why-rate-not-percent", 5, ["3.18"], 1, "var", varset([
  function () {
    var sol = "Un pourcentage compare une partie avec un entier mesuré de la même façon, alors qu'un taux garde deux unités différentes : \\[ \\begin{aligned} 60 \\text{ km/h} &\\text{ compare km et h} \\end{aligned} \\] Donc la raison est que <b>un taux compare deux unités différentes, et un pourcentage compare une partie avec un entier de même nature</b>.";
    return mcq("Une vitesse est notée 60 km/h. Pourquoi ce taux ne peut-il pas s'écrire comme un pourcentage ?", { t: "Il compare deux unités différentes, les kilomètres et les heures, alors qu'un pourcentage compare une partie avec un entier de même nature.", fb: "Exact : les deux quantités ont des unités différentes, donc il n'y a pas un seul entier dont on peut prendre un pourcentage." }, [
      { t: "Le nombre 60 est trop grand pour être un pourcentage, parce qu'un pourcentage ne peut jamais dépasser le nombre 100 dans une situation.", fb: "Les pourcentages peuvent avoir n'importe quelle taille, même plus de 100 %. La taille du nombre n'est pas le problème." },
      { t: "Un pourcentage doit toujours s'écrire d'abord comme une fraction avant de pouvoir être utilisé, et un taux ne s'écrit jamais de cette façon.", fb: "La forme d'écriture n'est pas le problème. Les pourcentages et les taux comparent des types de quantités différents." },
      { t: "Les vitesses sont mesurées avec des instruments comme des compteurs de vitesse, et les pourcentages ne sont mesurés avec aucun instrument.", fb: "La façon de mesurer une valeur ne décide pas de son type. Ce sont les unités comparées qui le décident." }
    ], sol, { mode: "why-speed" });
  },
  function () {
    var sol = "Les litres et les kilomètres sont des mesures différentes, même si 100 apparaît dans le taux : \\[ \\begin{aligned} 8 \\text{ L}/100 \\text{ km} &\\text{ compare L et km} \\end{aligned} \\] Donc ce n'est pas 8 %, parce que <b>le 100 du taux compte des kilomètres, pas un entier mesuré en litres</b>.";
    return mcq("Une voiture consomme du carburant à 8 L/100 km. Pourquoi ce taux n'est-il pas la même chose que 8 % ?", { t: "Le taux compare les litres avec les kilomètres, deux unités différentes, alors qu'un pourcentage compare une partie avec un entier de même nature.", fb: "Exact : le 100 appartient aux kilomètres, donc le taux n'est pas une partie sur 100 d'un seul entier." }, [
      { t: "La consommation de carburant est toujours plus grande que 8 % dans les vraies voitures qui roulent chaque jour sur les routes de la province.", fb: "La taille des vraies valeurs de consommation n'est pas le point. Ce sont les unités comparées qui décident du type." },
      { t: "Un pourcentage ne peut jamais contenir le nombre 100, et ce taux a le nombre 100 en plein milieu, donc il ne peut pas en être un dans ce cas.", fb: "Les pourcentages sont basés sur 100. Le problème est ce que le 100 mesure dans ce taux." },
      { t: "Les taux écrits avec une barre oblique peuvent toujours être renommés comme pourcentages, peu importe les deux quantités que le taux compare entre elles ici.", fb: "Une barre oblique seule ne fait pas un pourcentage. Les deux côtés doivent mesurer le même type d'entier." }
    ], sol, { mode: "why-fuel" });
  },
  function () {
    var sol = "Les dollars et les heures mesurent des choses différentes, donc aucun entier unique n'existe pour un pourcentage : \\[ \\begin{aligned} 15 \\text{ dollars/h} &\\text{ compare dollars et heures} \\end{aligned} \\] Donc la raison est que <b>un pourcentage demande une partie et un entier dans la même unité, et ce taux a deux unités différentes</b>.";
    return mcq("Un salaire est noté 15 $/h. Pourquoi ce taux ne peut-il pas s'écrire comme un pourcentage ?", { t: "Il compare les dollars avec les heures, deux unités différentes, alors qu'un pourcentage compare une partie avec un entier mesuré de la même façon.", fb: "Exact : le salaire et le temps sont des mesures différentes, donc le salaire est un taux, pas une part d'un seul entier." }, [
      { t: "Les salaires sont payés en argent, et les pourcentages ne peuvent jamais toucher à l'argent, donc un salaire ne peut jamais être un pourcentage du tout.", fb: "Les pourcentages touchent souvent à l'argent, comme une taxe sur un prix. Ici, le problème est l'association des unités." },
      { t: "La valeur 15 est un nombre entier, et les pourcentages doivent toujours être des nombres décimaux avec une virgule pour être des pourcentages.", fb: "Les pourcentages peuvent être des nombres entiers. La forme du nombre n'est pas le problème." },
      { t: "Un salaire horaire reste le même chaque semaine, et les pourcentages doivent changer chaque semaine pour rester des pourcentages dans ce cas.", fb: "Le fait qu'une valeur change n'a rien à voir avec le fait qu'elle soit un pourcentage." }
    ], sol, { mode: "why-wage" });
  },
  function () {
    var sol = "Les battements et les minutes sont des unités différentes, donc le nombre par minute est un taux : \\[ \\begin{aligned} 72 \\text{ battements/min} &\\text{ compare battements et minutes} \\end{aligned} \\] Donc la raison est que <b>un taux relie deux unités différentes, et un pourcentage est une part d'un entier en une seule unité</b>.";
    return mcq("Un rythme cardiaque au repos est de 72 battements/min. Pourquoi ce taux ne peut-il pas s'écrire comme un pourcentage ?", { t: "Il compare les battements avec les minutes, deux unités différentes, alors qu'un pourcentage est une partie sur 100 d'un seul entier.", fb: "Exact : il n'y a pas un seul entier mesuré en battements dont le taux serait une part." }, [
      { t: "Les rythmes cardiaques touchent à la santé, et les pourcentages sont seulement pour les matières scolaires de tous les jours à l'école.", fb: "Les pourcentages sont aussi utilisés en santé. Ce sont les unités comparées qui décident du type." },
      { t: "Le nombre 72 n'a pas de partie décimale, et les pourcentages demandent toujours une partie décimale après la virgule dans le nombre.", fb: "Les pourcentages peuvent être des nombres entiers. La forme du nombre n'est pas le problème." },
      { t: "Un pourcentage doit décrire quelque chose qui dure exactement une minute, parce que le taux est compté par minute dans le taux.", fb: "Les pourcentages n'ont pas d'exigence de temps. Le problème est les deux unités différentes du taux." }
    ], sol, { mode: "why-heart" });
  },
  function () {
    var sol = "Un prix par kilogramme relie l'argent à la masse, deux mesures différentes : \\[ \\begin{aligned} 4 \\text{ dollars/kg} &\\text{ compare dollars et kilogrammes} \\end{aligned} \\] Donc la raison est que <b>le taux compare deux unités différentes, et un pourcentage compare une partie avec un entier de même nature</b>.";
    return mcq("Le fromage coûte 4 $/kg. Pourquoi ce taux ne peut-il pas s'écrire comme un pourcentage ?", { t: "Il compare les dollars avec les kilogrammes, deux unités différentes, alors qu'un pourcentage compare une partie avec un entier de même nature.", fb: "Exact : l'argent et la masse sont des mesures différentes, donc le prix est un taux, pas une part d'un entier." }, [
      { t: "Les prix par kilogramme sont toujours moins que 100, et les pourcentages ne sont pas moins que 100, donc un prix ne peut pas être un pourcentage.", fb: "Les pourcentages peuvent être sous 100, égaux à 100, ou plus que 100. La taille n'est pas le problème." },
      { t: "Un pourcentage ne peut pas être utilisé dans une épicerie pour acheter des aliments comme du fromage au comptoir de l'épicerie du quartier.", fb: "Les pourcentages sont utilisés dans les magasins pour les réductions et la taxe. Ici, le problème est l'association des unités." },
      { t: "Le taux utilise une barre oblique, et les pourcentages n'utilisent jamais de symboles dans leur écriture habituelle des nombres.", fb: "Les pourcentages utilisent le symbole %. Le symbole utilisé ne décide pas du type." }
    ], sol, { mode: "why-cheese" });
  }
]), ["Compare ce que chaque idée relie : un pourcentage relie une partie à un entier de même nature, un taux relie deux unités différentes.", "Nomme d'abord les deux unités du taux, puis demande si un pourcentage pourrait comparer ces deux mêmes choses."]);

// 24. L2, 6.29, CR 2: solve a rate problem.
E("u5-rate-problem-solve", 5, ["6.29"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Trouve d'abord le taux unitaire, puis utilise-le pour le nouveau temps : \\[ \\begin{aligned} \\text{taux unitaire} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars par heure} \\\\ \\text{nouveau gain} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] Donc le gain est <b>" + ans + " $</b>.";
    return numq("Sam a gagné " + earned + " $ pour " + h1 + " h de travail à un taux constant. Au même taux, combien Sam gagnera-t-il pour " + h2 + " h de travail, en dollars ?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "La vitesse est le taux unitaire, et le temps est la distance divisée par ce taux : \\[ \\begin{aligned} \\text{temps} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] Donc le trajet prend <b>" + ansT + " h</b>.";
    return numq("Un autobus roule à une vitesse constante. Il parcourt " + dist1 + " km en " + t1 + " h. À la même vitesse, combien d'heures faudra-t-il pour parcourir " + D + " km ?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Trouve d'abord le débit par minute, puis multiplie par le nouveau temps : \\[ \\begin{aligned} \\text{taux unitaire} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L par min} \\\\ \\text{nouveau volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] Donc le volume est <b>" + ans3 + " L</b>.";
  return numq("Un tuyau fournit " + vol + " L d'eau en " + m1 + " min à un taux constant. Au même taux, combien de litres fournira-t-il en " + m2 + " min ?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Chaque problème de taux commence par le taux unitaire : la quantité pour une unité de la deuxième quantité.", "Divise d'abord pour obtenir la quantité par heure, par kilomètre ou par minute dans le problème."]);

// 25. L3, 6.1, CR 3: percent increase or decrease.
E("u5-percent-change", 5, ["6.1"], 3, "gen", function () {
  var inc = Math.random() < 0.5;
  var c = inc ? pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100]) : pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
  var O = pick([40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 500]);
  var N = O * (inc ? 1 + c / 100 : 1 - c / 100);
  var ctxs = inc ? [
    "Les inscriptions à l'école sont passées de " + O + " élèves une année à " + fmtD(N, 0) + " élèves l'année suivante. Quel est le pourcentage d'augmentation des inscriptions ?",
    "Le total de points d'un joueur est passé de " + O + " points la saison passée à " + fmtD(N, 0) + " points cette saison. Quel est le pourcentage d'augmentation du total de points ?",
    "Un réseau de sentiers d'une ville est passé de " + O + " km de sentiers à " + fmtD(N, 0) + " km de sentiers. Quel est le pourcentage d'augmentation de la longueur des sentiers ?"
  ] : [
    "Le prix d'un manteau est passé de " + O + " $ à " + fmtD(N, 0) + " $. Quel est le pourcentage de diminution du prix ?",
    "Le niveau d'eau d'un étang est passé de " + O + " cm de profondeur au printemps à " + fmtD(N, 0) + " cm à la fin de l'été. Quel est le pourcentage de diminution de la profondeur ?",
    "La consommation de carburant d'un autobus d'équipe est passée de " + O + " L lors d'un trajet à " + fmtD(N, 0) + " L lors du même trajet un an plus tard. Quel est le pourcentage de diminution de la consommation ?"
  ];
  var prompt = pick(ctxs), diff = Math.abs(N - O);
  var sol = "Le pourcentage de variation compare la variation au montant de départ : \\[ \\begin{aligned} \\text{variation} &= " + fmtD(diff, 0) + " \\\\ \\text{pourcentage de variation} &= " + FR(fmtD(diff, 0), O) + " \\times 100 = " + c + " \\% \\end{aligned} \\] Donc le pourcentage " + (inc ? "d'augmentation" : "de diminution") + " est <b>" + c + " %</b>.";
  return numq(prompt + " Donne le pourcentage sous forme de nombre.", c, 0.01, sol, { mode: inc ? "pct-inc" : "pct-dec", c: c, o: O });
}, ["Le pourcentage de variation utilise toujours le montant de départ comme entier, pas le montant final.", "Trouve d'abord la taille de la variation, puis divise-la par le montant de départ."]);

// 26. L3, 6.2: successive percents, choose the final price.
E("u5-successive-percents", 5, ["6.2"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var P = pick([100, 150, 200, 300, 350, 400]), d1 = pick([10, 20, 25, 30]), d2 = pick([10, 20, 25].filter(function (x) { return x !== d1; }));
    var fin = u5r2(P * (1 - d1 / 100) * (1 - d2 / 100));
    var cands = [
      { t: fmtDF(u5r2(P * (1 - (d1 + d2) / 100)), 2), fb: "Cela additionne les deux réductions en une seule. La deuxième réduction agit sur le prix déjà réduit, pas sur le prix complet." },
      { t: fmtDF(u5r2(P * (1 - d1 / 100)), 2), fb: "Cela applique seulement la première réduction. La deuxième réduction doit encore être retirée de ce prix." },
      { t: fmtDF(u5r2(P * (1 - d2 / 100)), 2), fb: "Cela applique seulement la deuxième réduction. La première réduction vient avant elle." }
    ];
    var ds = u5pick3(fmtDF(fin, 2), cands);
    var mid = u5r2(P * (1 - d1 / 100));
    var sol = "Chaque réduction agit sur le prix laissé par l'étape précédente : \\[ \\begin{aligned} \\text{après la première réduction} &= " + fmtDF(P, 2) + " \\times " + fmtD(1 - d1 / 100, 2) + " = " + fmtDF(mid, 2) + " \\\\ \\text{prix final} &= " + fmtDF(mid, 2) + " \\times " + fmtD(1 - d2 / 100, 2) + " = " + fmtDF(fin, 2) + " \\end{aligned} \\] Donc le prix final est <b>" + fmtDF(fin, 2) + " $</b>.";
    return mcq("Un vélo coûte " + fmtDF(P, 2) + " $. Il est d'abord réduit de " + d1 + " %, puis le prix de solde est réduit d'un autre " + d2 + " % à la caisse. Quel est le prix final, en dollars ?", { t: fmtDF(fin, 2), fb: "Exact : la deuxième réduction est retirée du prix réduit, étape par étape." }, ds, sol, { mode: "two-discounts", p: P, d1: d1, d2: d2 });
  }
  var P2 = pick([100, 150, 200, 250, 300, 400]), r = pick([10, 15, 20, 25, 30]);
  var fin2 = u5r2(P2 * (1 - r / 100) * (1 + r / 100));
  var cands2 = [
    { t: fmtDF(P2, 2), fb: "Des pourcentages égaux ne s'annulent pas ici. La taxe est calculée sur le prix de solde plus petit, donc le résultat est sous le prix complet." },
    { t: fmtDF(u5r2(P2 * (1 - r / 100)), 2), fb: "C'est le prix de solde seulement. La taxe doit encore être ajoutée." },
    { t: fmtDF(u5r2(P2 * (1 + r / 100)), 2), fb: "Cela taxe le prix complet et saute la réduction. La réduction vient d'abord." }
  ];
  var ds2 = u5pick3(fmtDF(fin2, 2), cands2);
  var mid2 = u5r2(P2 * (1 - r / 100));
  var sol2 = "Le pourcentage de taxe agit sur le prix de solde, qui est plus petit que le prix complet : \\[ \\begin{aligned} \\text{prix de solde} &= " + fmtDF(P2, 2) + " \\times " + fmtD(1 - r / 100, 2) + " = " + fmtDF(mid2, 2) + " \\\\ \\text{prix final} &= " + fmtDF(mid2, 2) + " \\times " + fmtD(1 + r / 100, 2) + " = " + fmtDF(fin2, 2) + " \\end{aligned} \\] Donc le prix final est <b>" + fmtDF(fin2, 2) + " $</b>, pas le prix complet.";
  return mcq("Un manteau coûte " + fmtDF(P2, 2) + " $. Il est réduit de " + r + " %, puis une taxe de " + r + " % est ajoutée au prix de solde. Quel est le prix final, en dollars ?", { t: fmtDF(fin2, 2), fb: "Exact : la taxe est ajoutée au prix réduit, donc elle ajoute moins que ce que la réduction a retiré." }, ds2, sol2, { mode: "discount-tax-equal", p: P2, r: r });
}, ["Les pourcentages successifs n'agissent jamais sur le même montant de départ. Chacun agit sur le montant laissé par l'étape précédente.", "Calcule d'abord le montant après le premier changement de pourcentage, et utilise-le comme nouveau montant de départ."]);

// 27. L3, 6.3, CR 2: percent of a percent applied to a quantity.
E("u5-percent-of-percent-quantity", 5, ["6.3"], 3, "gen", function () {
  var T = 800, A = 50, B = 40, att = 0;
  do {
    T = pick([200, 400, 500, 600, 800, 1000, 1200, 2000]); A = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); B = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); att++;
  } while ((T * A) % 100 !== 0 || ((T * A / 100) * B) % 100 !== 0);
  var mid = T * A / 100, ans = mid * B / 100;
  var ctxs = [
    { q: "Une école compte " + T + " élèves. " + A + " % des élèves se sont inscrits à un club du dîner. Parmi ces membres du club, " + B + " % se sont inscrits à la séance de cuisine. Combien d'élèves se sont inscrits à la séance de cuisine ?", unit: "élèves" },
    { q: "Une bibliothèque communautaire contient " + T + " livres. " + A + " % des livres sont dans la section jeunesse. Parmi ces livres jeunesse, " + B + " % sont des romans graphiques. Combien de romans graphiques la bibliothèque contient-elle ?", unit: "romans graphiques" },
    { q: "Un tournoi a attiré " + T + " spectateurs. " + A + " % des spectateurs ont acheté un programme. Parmi ces acheteurs, " + B + " % ont aussi acheté un billet de tirage. Combien de spectateurs ont acheté un programme et un billet de tirage ?", unit: "spectateurs" }
  ];
  var cx = pick(ctxs);
  var sol = "Réduis le groupe deux fois, un pourcentage à la fois : \\[ \\begin{aligned} \\text{après le premier pourcentage} &= " + fmtD(A / 100, 2) + " \\times " + T + " = " + mid + " \\\\ \\text{nombre final} &= " + fmtD(B / 100, 2) + " \\times " + mid + " = " + ans + " \\end{aligned} \\] Donc la réponse est <b>" + ans + " " + cx.unit + "</b>.";
  return numq(cx.q, ans, 0.01, sol, { mode: "pct-pct-quantity", t: T, a: A, b: B });
}, ["Prends les pourcentages une étape à la fois. Le deuxième pourcentage agit seulement sur le groupe laissé par le premier.", "Trouve d'abord combien il y a dans le groupe après le premier pourcentage."]);

// 28. L3, 6.28: advanced ratio problem.
E("u5-ratio-problem-advanced", 5, ["6.28"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var trip = pick([[2, 3, 4], [3, 2, 5], [4, 3, 2], [5, 3, 2], [2, 5, 3], [3, 4, 5]]);
    var a = trip[0], b = trip[1], c = trip[2], s = ri(3, 12), tot = (a + b + c) * s, ans = b * s;
    var sol = "Additionne les trois parties pour obtenir la valeur d'une partie, puis prends la part du milieu : \\[ \\begin{aligned} \\text{une partie} &= " + tot + " \\div " + (a + b + c) + " = " + s + " \\\\ \\text{part du milieu} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] Donc la part du milieu est <b>" + ans + "</b>.";
    return numq("Des jetons de prix sont partagés entre trois joueurs selon le rapport " + a + ":" + b + ":" + c + ". Il y a " + tot + " jetons en tout. Combien de jetons le deuxième joueur reçoit-il ?", ans, 0.01, sol, { mode: "ratio-three-total", a: a, b: b, c: c });
  }
  if (mode === 1) {
    var pr = pick([[5, 3], [7, 4], [9, 5], [8, 3], [7, 2], [5, 2]]);
    var a2 = pr[0], b2 = pr[1], s2 = ri(2, 9), diff = (a2 - b2) * s2, ans2 = (a2 + b2) * s2;
    var sol2 = "La différence des parties donne la valeur d'une partie : \\[ \\begin{aligned} \\text{une partie} &= " + diff + " \\div " + (a2 - b2) + " = " + s2 + " \\\\ \\text{total} &= " + (a2 + b2) + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] Donc la longueur totale est <b>" + ans2 + " cm</b>.";
    return numq("Une planche est coupée en deux morceaux selon le rapport " + a2 + ":" + b2 + ". Le morceau le plus long mesure " + diff + " cm de plus que le morceau le plus court. Quelle est la longueur totale de la planche, en centimètres ?", ans2, 0.01, sol2, { mode: "ratio-difference", a: a2, b: b2 });
  }
  var pr3 = pick([[2, 3], [3, 5], [4, 7], [5, 4], [3, 7], [2, 5]]);
  var a3 = pr3[0], b3 = pr3[1], s3 = ri(3, 11), given = a3 * s3, ans3 = b3 * s3;
  var sol3 = "Les rapports équivalents gardent le même facteur sur les deux termes : \\[ \\begin{aligned} \\text{facteur} &= " + given + " \\div " + a3 + " = " + s3 + " \\\\ \\text{terme manquant} &= " + b3 + " \\times " + s3 + " = " + ans3 + " \\end{aligned} \\] Donc le terme manquant est <b>" + ans3 + "</b>.";
  return numq("Deux mélanges suivent le même rapport " + a3 + ":" + b3 + " de sable à ciment. Le deuxième mélange utilise " + given + " pelletées de sable. Combien de pelletées de ciment le deuxième mélange utilise-t-il ?", ans3, 0.01, sol3, { mode: "ratio-equivalent", a: a3, b: b3 });
}, ["Transforme l'information supplémentaire, un total, une différence ou un terme connu, en valeur d'une partie du rapport.", "Décide d'abord quelle combinaison des parties du rapport correspond à la quantité donnée dans le problème."]);

// 29. L3, 6.29: compare unit rates, better buy.
E("u5-better-buy", 5, ["6.29"], 3, "gen", function () {
  var items = [
    { thing: "barres granola", unit: "barre" }, { thing: "boîtes de jus", unit: "boîte" }, { thing: "crayons", unit: "crayon" },
    { thing: "muffins", unit: "muffin" }, { thing: "autocollants", unit: "autocollant" }, { thing: "balles de tennis", unit: "balle" }
  ];
  var it = pick(items);
  var c1 = ri(4, 12), c2 = ri(4, 16); if (c2 === c1) c2 += 4;
  var u1 = ri(40, 120), u2 = u1 + pick([-25, -20, -15, -10, 10, 15, 20, 25]); if (u2 < 25) u2 = u1 + 20;
  var p1 = c1 * u1 / 100, p2 = c2 * u2 / 100;
  var aBetter = u1 < u2;
  var corr = aBetter ? "Paquet A, à " + fmtDF(u1 / 100, 2) + " $ pour chaque " + it.unit : "Paquet B, à " + fmtDF(u2 / 100, 2) + " $ pour chaque " + it.unit;
  var other = aBetter ? "Paquet B, à " + fmtDF(u2 / 100, 2) + " $ pour chaque " + it.unit : "Paquet A, à " + fmtDF(u1 / 100, 2) + " $ pour chaque " + it.unit;
  var cands = [
    { t: other, fb: "Ce paquet coûte plus pour chaque " + it.unit + ". Compare le prix d'un seul article, pas seulement le prix du paquet." },
    { t: "Les deux coûtent le même prix pour chaque " + it.unit + ".", fb: "Les prix unitaires sont différents. Divise chaque prix de paquet par son nombre pour voir l'écart." },
    { t: "Les paquets ne peuvent pas être comparés.", fb: "Les nombres différents sont justement la raison d'utiliser les taux unitaires. Le prix d'un seul article peut toujours être comparé." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compare le prix d'un seul article dans chaque paquet : \\[ \\begin{aligned} \\text{Paquet A} &= " + fmtDF(p1, 2) + " \\div " + c1 + " = " + fmtDF(u1 / 100, 2) + " \\text{ par " + it.unit + "} \\\\ \\text{Paquet B} &= " + fmtDF(p2, 2) + " \\div " + c2 + " = " + fmtDF(u2 / 100, 2) + " \\text{ par " + it.unit + "} \\end{aligned} \\] Le prix unitaire le plus bas gagne, donc le meilleur achat est <b>" + corr + "</b>.";
  return mcq("Le paquet A contient " + c1 + " " + it.thing + " et coûte " + fmtDF(p1, 2) + " $. Le paquet B contient " + c2 + " " + it.thing + " et coûte " + fmtDF(p2, 2) + " $. Quel paquet est le meilleur achat ?", { t: corr, fb: "Exact : ce paquet a le prix le plus bas pour chaque article seul." }, ds, sol, { mode: "better-buy", c1: c1, c2: c2 });
}, ["Les prix des paquets ne peuvent pas être comparés directement quand les paquets contiennent des nombres différents. Compare un article à la fois.", "Divise d'abord chaque prix de paquet par le nombre d'articles dans ce paquet."]);

// 30. L3, 3.5 and 3.7: order values given in percent, fraction and decimal form.
E("u5-mixed-forms-order", 5, ["3.5", "3.7"], 3, "gen", function () {
  var vals = [
    { v: 0.1, fr: [1, 10] }, { v: 0.2, fr: [1, 5] }, { v: 0.25, fr: [1, 4] }, { v: 0.4, fr: [2, 5] },
    { v: 0.5, fr: [1, 2] }, { v: 0.6, fr: [3, 5] }, { v: 0.75, fr: [3, 4] }, { v: 0.8, fr: [4, 5] },
    { v: 0.9, fr: [9, 10] }, { v: 1.2, fr: [6, 5] }, { v: 1.25, fr: [5, 4] }, { v: 1.5, fr: [3, 2] },
    { v: 1.75, fr: [7, 4] }, { v: 2.5, fr: [5, 2] }, { v: 0.35, fr: [7, 20] }, { v: 0.65, fr: [13, 20] }
  ];
  var trio = shuffle(vals).slice(0, 3);
  var forms = shuffle(["pct", "frac", "dec"]);
  function disp(item, form) {
    if (form === "pct") return fmtD(item.v * 100, 0) + " %";
    if (form === "frac") return "\\(" + FR(item.fr[0], item.fr[1]) + "\\)";
    return fmtD(item.v, 2);
  }
  var labelled = trio.map(function (item, i) { return { v: item.v, s: disp(item, forms[i]) }; });
  var sorted = labelled.slice().sort(function (x, y) { return x.v - y.v; });
  function listOf(arr) { return arr.map(function (x) { return x.s; }).join(", "); }
  var corr = listOf(sorted);
  var rev = sorted.slice().reverse();
  var swapA = sorted.slice(); var tmp = swapA[0]; swapA[0] = swapA[1]; swapA[1] = tmp;
  var swapB = sorted.slice(); var tmp2 = swapB[1]; swapB[1] = swapB[2]; swapB[2] = tmp2;
  var cands = [
    { t: listOf(rev), fb: "Cela liste les valeurs de la plus grande à la plus petite, au lieu de la plus petite à la plus grande." },
    { t: listOf(swapA), fb: "Les deux premières valeurs sont inversées. Convertis les trois valeurs en décimales et compare encore." },
    { t: listOf(swapB), fb: "Les deux dernières valeurs sont inversées. Convertis les trois valeurs en décimales et compare encore." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Convertis chaque valeur en décimale avant de classer : \\[ \\begin{aligned} " + sorted.map(function (x) { return fmtD(x.v, 2); }).join(" &< ") + " \\end{aligned} \\] Donc l'ordre de la plus petite à la plus grande est <b>" + corr + "</b>.";
  return mcq("Quelle liste classe les valeurs de la plus petite à la plus grande ? Les valeurs sont " + listOf(labelled) + ".", { t: corr, fb: "Exact : après conversion en décimales, les valeurs augmentent régulièrement dans cet ordre." }, ds, sol, { mode: "mixed-order", vals: sorted.map(function (x) { return x.v; }).join(",") });
}, ["Des valeurs sous des formes différentes ne peuvent pas être comparées avant d'avoir une même forme.", "Convertis d'abord le pourcentage et la fraction en décimales, puis classe les trois décimales."]);

/* ----- bank-u6.js ----- */
// Math 8 (French) Unit 6 Linear Equations and Graphing question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 2783 to 3198).
// CRMARKS: u6-graph-extend-pair=2
// CRMARKS: u6-missing-ordered-pair=2
// CRMARKS: u6-missing-ordered-pair-backward=2
// CRMARKS: u6-solve-context-problem=3
// CRMARKS: u6-solve-distributive=3
// CRMARKS: u6-solve-div-plus=2
// CRMARKS: u6-solve-group-problem=3
// CRMARKS: u6-solve-two-step=3
/* TRANSLATOR NOTES
   - Termes du glossaire appliqués: pente (non requis dans le texte de ce
     morceau), ordonnée à l'origine et abscisse à l'origine (aucun des deux
     n'apparaît dans le morceau source; la valeur de départ suit le précédent
     de Math 9 FR), table de valeurs, couple ordonné, relation linéaire.
     L'abscisse à l'origine reste signalée: aucune preuve dans les guides.
   - Choix quand le glossaire est silencieux: step (augmentation constante)
     = pas, start value = valeur de départ (précédent Math 9 FR); inverse
     operation = opération inverse; distributive property = distributivité;
     balance pan = plateau, bag = sac, counter = jeton, loose counter =
     jeton libre; booking fee = frais de réservation; call-out fee = frais
     de déplacement; driveway = entrée; gear (bicycle) = vitesse; puck =
     rondelle; kit = trousse.
   - Étiquettes \text{} traduites selon la consigne: \text{start} devient
     \text{départ} et \text{step} devient \text{pas} (entrée 12).
   - Lignes FMT-GEOM laissées en fmt( (3), chacune marquée sur sa ligne:
     les aides X et Y de u6graphPts et la ligne de l'étiquette de l'axe des
     ordonnées dans u6graphPts, où fmt( alimente l'attribut x du texte SVG.
     Tous les autres fmt( d'affichage sont devenus fmtD(. Aucun fmtF( et
     aucun .toFixed( dans ce morceau.
   - Argent: les montants générés à partir de variables entières brutes
     gardent la variable et déplacent seulement le $ après le montant
     (précédent Math 9 FR, entrées 2 et 3 du morceau F de 9e); les montants
     littéraux du texte de repli deviennent 10 $, 4 $ et 34 $. Aucun
     pourcentage dans ce morceau. La solution décimale de l'entrée 4
     (x = ...,5) passe par fmtD et prend la virgule.
   - Les valeurs ctx.unit des entrées 6 et 14 sont traduites (kilomètres,
     tables, vitesses; élèves, rondelles, muffins) car elles entrent dans le
     texte de la solution; les chaînes mode restent inchangées.
*/
/* Unit 6: Linear Equations and Graphing */
// Unit 6: Linear Equations and Graphing (Math 8, NL). Entries only; helpers prefixed u6.
function u6pick3(corr, cands) {
  var out = [], seen = {}; seen[corr] = 1;
  var sh = shuffle(cands);
  for (var i = 0; i < sh.length && out.length < 3; i++) {
    if (!seen[sh[i].t]) { seen[sh[i].t] = 1; out.push(sh[i]); }
  }
  return out.length === 3 ? out : null;
}
function u6sgn(v) { return v >= 0 ? " + " + fmtD(v) : " - " + fmtD(-v); }
function u6graphPts(o) {
  var W = 330, H = 290, x0 = 52, y0 = 238, x1 = 312, y1 = 26;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); } /* FMT-GEOM */
  function Y(v) { return fmt(y0 - v * sy, 1); } /* FMT-GEOM */
  var xs = o.xstep || 1, ys = o.ystep || (o.ymax <= 12 ? 1 : 2);
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graphique d\'une relation linéaire montrée en points séparés">';
  var g;
  for (g = xs; g < o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y1 + '" x2="' + X(g) + '" y2="' + y0 + '" stroke="#dce8df" stroke-width="1"/>';
  for (g = ys; g < o.ymax; g += ys) s += '<line x1="' + x0 + '" y1="' + Y(g) + '" x2="' + x1 + '" y2="' + Y(g) + '" stroke="#dce8df" stroke-width="1"/>';
  (o.points || []).forEach(function (P) {
    s += '<circle cx="' + X(P[0]) + '" cy="' + Y(P[1]) + '" r="4" fill="' + FIG_ACC + '" stroke="' + FIG_INK + '" stroke-width="1"/>';
  });
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x1 + ',' + y0 + ' ' + (x1 - 9) + ',' + (y0 - 4) + ' ' + (x1 - 9) + ',' + (y0 + 4) + '" fill="' + FIG_INK + '"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="' + x0 + ',' + y1 + ' ' + (x0 - 4) + ',' + (y1 + 9) + ' ' + (x0 + 4) + ',' + (y1 + 9) + '" fill="' + FIG_INK + '"/>';
  for (g = 0; g <= o.xmax; g += xs) s += '<line x1="' + X(g) + '" y1="' + y0 + '" x2="' + X(g) + '" y2="' + (y0 + 5) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + X(g) + '" y="' + (y0 + 20) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + g + '</text>';
  for (g = ys; g <= o.ymax; g += ys) s += '<line x1="' + (x0 - 5) + '" y1="' + Y(g) + '" x2="' + x0 + '" y2="' + Y(g) + '" stroke="' + FIG_INK + '" stroke-width="1.5"/><text x="' + (x0 - 10) + '" y="' + Y(g) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + g + '</text>';
  s += '<text x="' + x1 + '" y="' + (y0 + 38) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="end">' + (o.xlab || "x") + '</text>';
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>'; /* FMT-GEOM */
  return s + '</svg>';
}

// 1. L1, 8.4: solve a one-step equation, ax = b or x/a = b.
E("u6-solve-one-step", 6, ["8.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = pick(["ax", "xa"]);
    var a = ri(2, 9), x = ri(2, 12), b = form === "ax" ? a * x : x;
    if (form === "xa") { b = x; x = a * b; } // equation x/a = b, solution x = a*b
    var solX = form === "ax" ? b / a : a * b;
    var eq = form === "ax" ? fmtD(a) + "x = " + fmtD(b) : "\\frac{x}{" + a + "} = " + fmtD(b);
    var wrong = form === "ax" ? [b * a, b - a, b + a] : [b / a, b - a, b + a];
    var corr = fmtD(solX);
    var dpA = (fmtD(wrong[0]).split(",")[1] || "").length;
    var cands = wrong.map(function (w, wi) {
      return { t: (form === "xa" && wi === 1 && dpA > 0) ? fmtDF(w, dpA) : fmtD(w), fb: form === "ax" ? "Cela utilise la mauvaise opération. Pour défaire la multiplication par " + a + ", divise les deux côtés par " + a + "." : "Cela utilise la mauvaise opération. Pour défaire la division par " + a + ", multiplie les deux côtés par " + a + "." };
    });
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var steps = form === "ax"
      ? "\\begin{aligned} " + fmtD(a) + "x &= " + fmtD(b) + " \\\\ x &= " + fmtD(b) + " \\div " + fmtD(a) + " \\\\ x &= " + fmtD(solX) + " \\end{aligned}"
      : "\\begin{aligned} \\frac{x}{" + a + "} &= " + fmtD(b) + " \\\\ x &= " + fmtD(b) + " \\times " + fmtD(a) + " \\\\ x &= " + fmtD(solX) + " \\end{aligned}";
    var sol = "Utilise l'opération inverse des deux côtés : \\[ " + steps + " \\] Donc la solution est <b>\\(x = " + fmtD(solX) + "\\)</b>.";
    return mcq("Résous l'équation \\(" + eq + "\\). Quelle est la valeur de \\(x\\) ?",
      { t: corr, fb: "Exact. L'opération inverse isole x." }, ds, sol,
      { mode: "solve-one-step", form: form, a: a, b: b });
  }
  return mcq("Résous l'équation \\(3x = 12\\). Quelle est la valeur de \\(x\\) ?",
    { t: "4", fb: "Exact. Divise les deux côtés par 3." },
    [{ t: "36", fb: "Cela multiplie au lieu de diviser." }, { t: "9", fb: "Cela soustrait 3 au lieu de diviser par 3." }, { t: "15", fb: "Cela additionne 3 au lieu de diviser par 3." }],
    "Divise les deux côtés par 3 : \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] Donc la solution est <b>\\(x = 4\\)</b>.", { mode: "solve-one-step-fallback" });
}, ["Pense à ce qui est fait à x, puis utilise l'opération contraire.", "Pour ax = b, divise les deux côtés par a ; pour x/a = b, multiplie les deux côtés par a."]);

// 2. L1, 8.3: verify by substitution, find the value of the left side.
E("u6-verify-left-side", 6, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 7), b = ri(1, 9), xt = ri(2, 9);
    var c = a * xt + b;
    var claim = Math.random() < 0.5 ? xt : xt + pick([-2, -1, 1, 2]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = fmtD(lhs);
    var cands = [
      { t: fmtD(c), fb: "C'est le côté droit de l'équation. La question demande le côté gauche après avoir remplacé x par " + claim + "." },
      { t: fmtD(a + claim + b), fb: "Cela additionne les nombres. Le terme " + fmtD(a) + "x veut dire " + a + " fois x, et non " + a + " plus x." },
      { t: fmtD(a * claim), fb: "Cela calcule " + fmtD(a) + "x, mais oublie d'ajouter le " + fmtD(b) + " qui suit." },
      { t: fmtD(lhs + a), fb: "Vérifie la multiplication : " + a + " fois " + claim + " donne " + fmtD(a * claim) + ", puis ajoute " + fmtD(b) + "." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var verdict = claim === xt ? " et il est égal au côté droit, " + fmtD(c) + ", donc x = " + claim + " est bien la solution" : " et il n'est pas égal au côté droit, " + fmtD(c) + ", donc x = " + claim + " n'est pas la solution";
    var sol = "Remplace \\(x = " + claim + "\\) dans le côté gauche : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(a) + "(" + claim + ") + " + fmtD(b) + " \\\\ &= " + fmtD(a * claim) + " + " + fmtD(b) + " \\\\ &= " + fmtD(lhs) + " \\end{aligned} \\] Le côté gauche vaut <b>" + fmtD(lhs) + "</b>" + verdict + ".";
    return mcq("Pour vérifier une solution, remplace \\(x = " + claim + "\\) dans l'équation \\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c) + "\\). Quelle est la valeur du côté gauche ?",
      { t: corr, fb: "Exact. Le remplacement met le nombre à la place de x, puis le calcul donne le côté gauche." }, ds, sol,
      { mode: "verify-left-side", a: a, b: b, claim: claim });
  }
  return mcq("Pour vérifier une solution, remplace \\(x = 3\\) dans l'équation \\(2x + 4 = 10\\). Quelle est la valeur du côté gauche ?",
    { t: "10", fb: "Exact. 2(3) + 4 = 10." },
    [{ t: "6", fb: "Cela oublie d'ajouter le 4." }, { t: "9", fb: "Cela additionne 2 + 3 + 4 au lieu de multiplier 2 par 3 d'abord." }, { t: "12", fb: "Vérifie la multiplication : 2 fois 3 donne 6, puis ajoute 4." }],
    "Remplace : \\[ \\begin{aligned} 2x + 4 &= 2(3) + 4 \\\\ &= 10 \\end{aligned} \\] Le côté gauche vaut <b>10</b>.", { mode: "verify-left-side-fallback" });
}, ["Remplacer veut dire mettre le nombre donné à la place de x partout où x apparaît.", "Fais d'abord la multiplication, puis l'addition."]);

// 3. L1, 7.2: build a table value from an equation.
E("u6-table-missing-value", 6, ["7.2"], 1, "gen", function () {
  var m = ri(2, 6), b = ri(1, 9), qx = ri(0, 4);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (x) { return m * x + b; });
  var shown = ys.map(function (y, i) { return i === qx ? "?" : fmtD(y); });
  var ans = ys[qx];
  var sol = "Remplace chaque valeur de \\(x\\) dans \\(y = " + fmtD(m) + "x + " + fmtD(b) + "\\). Pour la valeur manquante, \\(x = " + qx + "\\) : \\[ \\begin{aligned} y &= " + fmtD(m) + "(" + qx + ") + " + fmtD(b) + " \\\\ &= " + fmtD(m * qx) + " + " + fmtD(b) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur manquante dans la table est <b>" + fmtD(ans) + "</b>.";
  var prompt = "Une table de valeurs est faite à partir de l'équation \\(y = " + fmtD(m) + "x + " + fmtD(b) + "\\).<br>x: " + xs.join(", ") + "<br>y: " + shown.join(", ") + "<br>Quelle est la valeur manquante de y ?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-missing-value", m: m, b: b, qx: qx });
}, ["Chaque valeur de y vient du remplacement de sa valeur de x dans l'équation.", "Multiplie la valeur de x de la ligne manquante par le coefficient, puis ajoute la constante."]);

// 4. L2, 8.4, CR 3: solve ax + b = c symbolically (some fractional solutions).
E("u6-solve-two-step", 6, ["8.4"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Défais les étapes dans l'ordre inverse : soustrais d'abord, puis divise : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c) + " - " + fmtD(b) + " \\\\ " + fmtD(a) + "x &= " + fmtD(a * x) + " \\\\ x &= " + fmtD(a * x) + " \\div " + fmtD(a) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Vérification : \\(" + fmtD(a) + "(" + fmtD(x) + ") + " + fmtD(b) + " = " + fmtD(a * x) + " + " + fmtD(b) + " = " + fmtD(c) + "\\). Donc la solution est <b>\\(x = " + fmtD(x) + "\\)</b>.";
  return numq("Résous l'équation \\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c) + "\\). Quelle est la valeur de x ?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Défais ce qui a été fait à x dans l'ordre inverse : le nombre ajouté part en premier.", "Soustrais la constante des deux côtés, puis divise les deux côtés par le coefficient de x."]);

// 5. L2, 8.1: model a context with an equation of the form ax + b = c.
E("u6-model-equation", 6, ["8.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 9), b = ri(3, 20), x = ri(3, 12), c = a * x + b;
    if (a === b) continue;
    var ctx = pick([
      "La location d'une patinoire coûte des frais de réservation de " + b + " $, plus " + a + " $ pour chaque heure. Le coût total a été de " + c + " $. Soit x le nombre d'heures de location.",
      "Une excursion en traversier coûte des frais de port de " + b + " $, plus " + a + " $ pour chaque passager. Le coût total a été de " + c + " $. Soit x le nombre de passagers.",
      "Un service de déneigement demande des frais de déplacement de " + b + " $, plus " + a + " $ pour chaque entrée déneigée. Le total facturé a été de " + c + " $. Soit x le nombre d'entrées déneigées."
    ]);
    var corr = "\\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c) + "\\)";
    var ds = u6pick3(corr, [
      { t: "\\(" + fmtD(b) + "x + " + fmtD(a) + " = " + fmtD(c) + "\\)", fb: "Cela échange les frais et le montant par unité. Les frais sont payés une fois, donc ils ne sont pas multipliés par x." },
      { t: "\\(" + fmtD(a) + "(x + " + fmtD(b) + ") = " + fmtD(c) + "\\)", fb: "Cela multiplie aussi les frais par " + a + ". Les frais sont payés une fois, et non une fois par unité." },
      { t: "\\(\\frac{x}{" + a + "} + " + fmtD(b) + " = " + fmtD(c) + "\\)", fb: "Cela divise x par le montant par unité. Chaque unité ajoute " + a + " $, donc x est multiplié par " + a + "." },
      { t: "\\(" + fmtD(a) + "x = " + fmtD(c) + " + " + fmtD(b) + "\\)", fb: "Cela met les frais du mauvais côté. Dans le modèle, les frais et les montants par unité font ensemble le total." }
    ]);
    if (!ds) continue;
    var sol = "Les frais de " + b + " $ sont payés une fois, et le montant de " + a + " $ est payé x fois, pour un total de " + c + " $ : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(c) + " \\end{aligned} \\] Donc l'équation qui modélise le problème est <b>" + corr + "</b>.";
    return mcq(ctx + " Quelle équation modélise ce problème ?",
      { t: corr, fb: "Exact. Le montant par unité multiplie x, les frais uniques restent seuls, et ensemble ils égalent le total." }, ds, sol,
      { mode: "model-equation", a: a, b: b, c: c });
  }
  return mcq("La location d'une patinoire coûte des frais de réservation de 10 $, plus 4 $ pour chaque heure. Le coût total a été de 34 $. Soit x le nombre d'heures de location. Quelle équation modélise ce problème ?",
    { t: "\\(4x + 10 = 34\\)", fb: "Exact. Le montant par heure multiplie x et les frais restent seuls." },
    [{ t: "\\(10x + 4 = 34\\)", fb: "Cela échange les frais et le montant par heure." }, { t: "\\(4(x + 10) = 34\\)", fb: "Cela multiplie aussi les frais par 4." }, { t: "\\(4x = 34 + 10\\)", fb: "Cela met les frais du mauvais côté." }],
    "Le montant de 4 $ est payé x fois et les frais de 10 $ une fois : \\[ \\begin{aligned} 4x + 10 &= 34 \\end{aligned} \\] Donc le modèle est <b>\\(4x + 10 = 34\\)</b>.", { mode: "model-equation-fallback" });
}, ["Décide quel montant est payé une fois et lequel est payé pour chaque unité.", "Le montant payé pour chaque unité multiplie x ; le montant unique est ajouté une fois."]);

// 6. L2, 8.7, CR 3: solve a problem using a linear equation.
E("u6-solve-context-problem", 6, ["8.7"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(4, 25), x = ri(3, 14), c = a * x + b;
  var ctx = pick([
    { q: "Une école loue un autobus pour une sortie scolaire. La location coûte des frais de réservation de " + b + " $, plus " + a + " $ pour chaque kilomètre parcouru. La facture totale a été de " + c + " $. Combien de kilomètres l'autobus a-t-il parcourus ?", unit: "kilomètres" },
    { q: "Une salle communautaire demande des frais d'installation de " + b + " $, plus " + a + " $ pour chaque table louée. Un groupe a payé " + c + " $ en tout. Combien de tables le groupe a-t-il louées ?", unit: "tables" },
    { q: "Un atelier de vélos demande des frais de service de " + b + " $, plus " + a + " $ pour chaque vitesse réglée. Un client a payé " + c + " $ en tout. Combien de vitesses ont été réglées ?", unit: "vitesses" }
  ]);
  var sol = "Soit \\(x\\) le nombre de " + ctx.unit + ". Les frais sont payés une fois et le montant de " + a + " $ est payé \\(x\\) fois : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c - b) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Donc la réponse est <b>" + fmtD(x) + " " + ctx.unit + "</b>.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-context-problem", a: a, b: b, c: c, unit: ctx.unit });
}, ["Écris d'abord une équation : les frais uniques plus le montant par unité fois l'inconnue, égal au total.", "Soustrais les frais du total, puis divise ce qui reste par le montant par unité."]);

// 7. L2, 8.6: identify an error in a worked solution.
E("u6-identify-error", 6, ["8.6"], 2, "gen", function () {
  var type = pick(["add-instead", "divide-one-term", "distribute-part"]);
  if (type === "add-instead") {
    var a = ri(2, 8), b = a * ri(1, 2), x = ri(2, 11), c = a * x + b;
    var wrong = (c + b) / a;
    var prompt = "Un élève résout \\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c) + "\\) et écrit : \"" + fmtD(a) + "x = " + fmtD(c) + " + " + fmtD(b) + ", donc x = " + fmtD(wrong) + ".\" Quelle erreur l'élève a-t-il faite ?";
    var corr = "L'élève a ajouté " + fmtD(b) + " aux deux côtés au lieu de le soustraire.";
    var sol = "Pour défaire l'addition de " + fmtD(b) + ", soustrais " + fmtD(b) + " des deux côtés : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c) + " - " + fmtD(b) + " = " + fmtD(c - b) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Donc l'erreur est <b>" + corr + "</b>";
    return mcq(prompt, { t: corr, fb: "Exact. L'inverse d'ajouter " + fmtD(b) + " est de soustraire " + fmtD(b) + "." },
      [
        { t: "L'élève a divisé par " + fmtD(a) + " trop tôt, avant de s'occuper du " + fmtD(b) + ".", fb: "Regarde la première ligne de l'élève : l'étape de division n'a jamais eu lieu. Le changement fait au " + fmtD(b) + " est là où le travail dérape." },
        { t: "L'élève a multiplié les deux côtés par " + fmtD(a) + " au lieu de diviser.", fb: "Aucune multiplication par " + fmtD(a) + " n'apparaît dans le travail. Compare la première ligne avec l'équation de départ." },
        { t: "Il n'y a pas d'erreur ; la réponse de l'élève est correcte.", fb: "Vérifie la réponse par remplacement : " + fmtD(a) + "(" + fmtD(wrong) + ") + " + fmtD(b) + " n'égale pas " + fmtD(c) + "." }
      ], sol, { mode: "identify-error-add", a: a, b: b });
  }
  if (type === "divide-one-term") {
    var a2 = ri(2, 8), b2 = a2 * ri(1, 2), x2 = ri(3, 11), c2 = a2 * x2 + b2;
    var prompt2 = "Un élève résout \\(" + fmtD(a2) + "x + " + fmtD(b2) + " = " + fmtD(c2) + "\\) et écrit : \"x + " + fmtD(b2) + " = " + fmtD(c2 / a2) + ", donc x = " + fmtD(c2 / a2 - b2) + ".\" Quelle erreur l'élève a-t-il faite ?";
    var corr2 = "L'élève a divisé le terme " + fmtD(a2) + "x et le total par " + fmtD(a2) + ", mais il n'a pas divisé le terme " + fmtD(b2) + ".";
    var sol2 = "Chaque terme doit être traité de la même façon. Il est plus simple de soustraire d'abord : \\[ \\begin{aligned} " + fmtD(a2) + "x + " + fmtD(b2) + " &= " + fmtD(c2) + " \\\\ " + fmtD(a2) + "x &= " + fmtD(c2 - b2) + " \\\\ x &= " + fmtD(x2) + " \\end{aligned} \\] Donc l'erreur est <b>" + corr2 + "</b>";
    return mcq(prompt2, { t: corr2, fb: "Exact. Diviser seulement certains termes par " + fmtD(a2) + " change l'équation." },
      [
        { t: "L'élève a soustrait " + fmtD(b2) + " d'un seul côté de l'équation au lieu de le soustraire des deux côtés.", fb: "L'élève n'a jamais soustrait " + fmtD(b2) + ". Regarde quels termes ont été divisés dans la première ligne." },
        { t: "L'élève a utilisé la mauvaise variable dans la réponse finale de son travail.", fb: "La variable est x partout. Le problème est dans la façon dont les termes ont été divisés." },
        { t: "Il n'y a pas d'erreur ; la réponse de l'élève est correcte et son travail est bien fait.", fb: "Vérifie par remplacement : " + fmtD(a2) + "(" + fmtD(c2 / a2 - b2) + ") + " + fmtD(b2) + " n'égale pas " + fmtD(c2) + "." }
      ], sol2, { mode: "identify-error-divide", a: a2, b: b2 });
  }
  var a3 = ri(2, 6), b3 = ri(2, 9), x3 = ri(2, 10), c3 = a3 * (x3 + b3);
  var prompt3 = "Un élève résout \\(" + fmtD(a3) + "(x + " + fmtD(b3) + ") = " + fmtD(c3) + "\\) et écrit : \"" + fmtD(a3) + "x + " + fmtD(b3) + " = " + fmtD(c3) + ".\" Quelle erreur l'élève a-t-il faite ?";
  var corr3 = "L'élève a multiplié seulement le terme x par " + fmtD(a3) + " et a laissé le terme " + fmtD(b3) + " inchangé.";
  var sol3 = "La distributivité multiplie chaque terme dans les parenthèses : \\[ \\begin{aligned} " + fmtD(a3) + "(x + " + fmtD(b3) + ") &= " + fmtD(c3) + " \\\\ " + fmtD(a3) + "x + " + fmtD(a3 * b3) + " &= " + fmtD(c3) + " \\end{aligned} \\] Donc l'erreur est <b>" + corr3 + "</b>";
  return mcq(prompt3, { t: corr3, fb: "Exact. Le nombre devant les parenthèses multiplie les deux termes à l'intérieur." },
    [
      { t: "L'élève a additionné " + fmtD(a3) + " et " + fmtD(b3) + " au lieu de multiplier les termes des parenthèses.", fb: "Aucune addition de " + fmtD(a3) + " et " + fmtD(b3) + " n'apparaît. Un terme des parenthèses a été multiplié et l'autre non." },
      { t: "L'élève aurait dû diviser les deux côtés par " + fmtD(b3) + " d'abord, avant de développer les parenthèses.", fb: "Diviser par " + fmtD(a3) + " d'abord serait un bon début ; diviser par " + fmtD(b3) + " n'est pas le problème dans ce travail." },
      { t: "Il n'y a pas d'erreur ; développer les parenthèses donne cette ligne dans ce travail.", fb: "Développer donne " + fmtD(a3) + "x + " + fmtD(a3 * b3) + ", et non " + fmtD(a3) + "x + " + fmtD(b3) + "." }
    ], sol3, { mode: "identify-error-distribute", a: a3, b: b3 });
}, ["Compare la première ligne de l'élève avec l'équation de départ, terme par terme.", "Demande-toi ce que l'élève a fait à chaque terme, et si la même chose a été faite à chaque terme."]);

// 8. L2, 8.2: visual (tile/balance) representation of a solving step.
E("u6-visual-step", 6, ["8.2"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 6), b = ri(2, 12), x = ri(2, 11), c = a * x + b;
    var step = pick(["remove", "split"]);
    if (step === "remove") {
      var corr = "\\(" + fmtD(a) + "x = " + fmtD(c - b) + "\\)";
      var ds = u6pick3(corr, [
        { t: "\\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c - b) + "\\)", fb: "Cela enlève les jetons libres d'un seul côté. Une balance reste en équilibre seulement quand les mêmes jetons sont enlevés des deux côtés." },
        { t: "\\(" + fmtD(a) + "x = " + fmtD(c + b) + "\\)", fb: "Cela ajoute des jetons au côté droit. L'image enlève " + fmtD(b) + " jetons libres de chaque côté." },
        { t: "\\(x = " + fmtD(c - b) + "\\)", fb: "Cela saute une étape. Les sacs sont encore fermés à ce stade, donc le côté gauche est encore " + fmtD(a) + "x." }
      ]);
      if (!ds) continue;
      var sol = "Enlever " + fmtD(b) + " jetons libres des deux côtés garde la balance en équilibre : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c) + " - " + fmtD(b) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c - b) + " \\end{aligned} \\] Donc l'image après cette étape montre <b>" + corr + "</b>.";
      return mcq("Un modèle de balance montre " + fmtD(a) + " sacs fermés (chacun contient x jetons) et " + fmtD(b) + " jetons libres sur le plateau de gauche, en équilibre avec " + fmtD(c) + " jetons sur le plateau de droite. L'image suivante enlève " + fmtD(b) + " jetons libres de chaque plateau. Quelle équation l'image suivante montre-t-elle ?",
        { t: corr, fb: "Exact. Le même enlèvement des deux côtés donne " + fmtD(a) + "x = " + fmtD(c - b) + "." }, ds, sol,
        { mode: "visual-remove", a: a, b: b });
    }
    var tot = a * x, per = x;
    var corrS = "\\(x = " + fmtD(x) + "\\)";
    var dsS = u6pick3(corrS, [
      { t: "\\(x = " + fmtD(per + 1) + "\\)", fb: "Compte encore : " + fmtD(tot) + " jetons partagés en " + fmtD(a) + " groupes égaux donnent " + fmtD(per) + " jetons dans chaque groupe." },
      { t: "\\(" + fmtD(a) + "x = " + fmtD(tot) + "\\)", fb: "C'est l'image avant le partage. Après le partage, chaque sac seul correspond à un groupe." },
      { t: "\\(x = " + fmtD(tot) + "\\)", fb: "Cela donne tous les " + fmtD(tot) + " jetons à un seul sac. Les jetons sont partagés également entre " + fmtD(a) + " sacs." }
    ]);
    if (!dsS) continue;
    var solS = "Le modèle partage " + fmtD(tot) + " jetons en " + fmtD(a) + " groupes égaux, un groupe pour chaque sac : \\[ \\begin{aligned} x &= " + fmtD(tot) + " \\div " + fmtD(a) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Donc l'image finale montre <b>" + corrS + "</b>.";
    return mcq("Un modèle de balance montre " + fmtD(a) + " sacs fermés (chacun contient x jetons) en équilibre avec " + fmtD(tot) + " jetons. L'image finale partage les jetons en " + fmtD(a) + " groupes égaux et associe un groupe à un sac. Quelle équation l'image finale montre-t-elle ?",
      { t: corrS, fb: "Exact. Chaque sac correspond à un groupe égal de " + fmtD(per) + " jetons." }, dsS, solS,
      { mode: "visual-split", a: a, c: tot });
  }
  return mcq("Un modèle de balance montre 3 sacs fermés (chacun contient x jetons) et 4 jetons libres sur le plateau de gauche, en équilibre avec 19 jetons sur le plateau de droite. L'image suivante enlève 4 jetons libres de chaque plateau. Quelle équation l'image suivante montre-t-elle ?",
    { t: "\\(3x = 15\\)", fb: "Exact. Le même enlèvement des deux côtés donne 3x = 15." },
    [{ t: "\\(3x + 4 = 15\\)", fb: "Cela enlève des jetons d'un seul côté." }, { t: "\\(3x = 23\\)", fb: "Cela ajoute des jetons au lieu de les enlever." }, { t: "\\(x = 15\\)", fb: "Les sacs sont encore fermés, donc le côté gauche est encore 3x." }],
    "On enlève 4 des deux côtés : \\[ \\begin{aligned} 3x + 4 &= 19 \\\\ 3x &= 15 \\end{aligned} \\] Donc l'image montre <b>\\(3x = 15\\)</b>.", { mode: "visual-remove-fallback" });
}, ["Une image de balance change l'équation seulement quand le même changement est fait des deux côtés.", "Associe chaque partie de l'image à un terme : les sacs sont les termes en x, les jetons libres sont les nombres."]);

// 9. L2, 8.5, CR 3: solve a(x + b) = c using the distributive property.
E("u6-solve-distributive", 6, ["8.5"], 2, "gen", function () {
  var a = ri(2, 7), b = ri(1, 10), x = ri(2, 13), c = a * (x + b);
  var sol = "Applique d'abord la distributivité, puis résous : \\[ \\begin{aligned} " + fmtD(a) + "(x + " + fmtD(b) + ") &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x + " + fmtD(a * b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(c) + " - " + fmtD(a * b) + " \\\\ " + fmtD(a) + "x &= " + fmtD(a * x) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Vérification : \\(" + fmtD(a) + "(" + fmtD(x) + " + " + fmtD(b) + ") = " + fmtD(a) + "(" + fmtD(x + b) + ") = " + fmtD(c) + "\\). Donc la solution est <b>\\(x = " + fmtD(x) + "\\)</b>.";
  return numq("Résous l'équation \\(" + fmtD(a) + "(x + " + fmtD(b) + ") = " + fmtD(c) + "\\). Quelle est la valeur de x ?", x, 0.01, sol,
    { mode: "solve-distributive", a: a, b: b });
}, ["Le nombre devant les parenthèses multiplie chaque terme à l'intérieur des parenthèses.", "Développe d'abord les parenthèses, puis soustrais et divise comme d'habitude."]);

// 10. L2, 8.4, CR 2: solve x/a + b = c.
E("u6-solve-div-plus", 6, ["8.4"], 2, "gen", function () {
  var a = ri(2, 8), b = ri(1, 12), d = ri(2, 11), x = a * d, c = d + b;
  var sol = "Soustrais d'abord, puis défais la division en multipliant : \\[ \\begin{aligned} \\frac{x}{" + a + "} + " + fmtD(b) + " &= " + fmtD(c) + " \\\\ \\frac{x}{" + a + "} &= " + fmtD(c) + " - " + fmtD(b) + " \\\\ \\frac{x}{" + a + "} &= " + fmtD(d) + " \\\\ x &= " + fmtD(d) + " \\times " + fmtD(a) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Vérification : \\(\\frac{" + fmtD(x) + "}{" + a + "} + " + fmtD(b) + " = " + fmtD(d) + " + " + fmtD(b) + " = " + fmtD(c) + "\\). Donc la solution est <b>\\(x = " + fmtD(x) + "\\)</b>.";
  return numq("Résous l'équation \\(\\frac{x}{" + a + "} + " + fmtD(b) + " = " + fmtD(c) + "\\). Quelle est la valeur de x ?", x, 0.01, sol,
    { mode: "solve-div-plus", a: a, b: b, d: d });
}, ["Travaille dans l'ordre inverse : occupe-toi du nombre ajouté avant la division.", "Soustrais la constante des deux côtés, puis multiplie les deux côtés par le diviseur."]);

// 11. L1, 7.3: missing y value in an ordered pair (forward mode; split under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair", 6, ["7.3"], 1, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var x = ri(1, 9), y = m * x + b;
  var sol = "Remplace \\(x = " + x + "\\) dans l'équation : \\[ \\begin{aligned} y &= " + fmtD(m) + "(" + x + ")" + u6sgn(b) + " \\\\ &= " + fmtD(m * x) + u6sgn(b) + " \\\\ &= " + fmtD(y) + " \\end{aligned} \\] Donc la valeur manquante dans le couple \\((" + x + ", \\ ?)\\) est <b>" + fmtD(y) + "</b>.";
  return numq("Le couple ordonné \\((" + x + ", \\ ?)\\) se trouve sur la relation \\(y = " + fmtD(m) + "x" + u6sgn(b) + "\\). Quelle est la valeur manquante de y ?", y, 0.01, sol,
    { mode: "missing-pair-y", m: m, b: b, x: x });
}, ["Un couple ordonné sur une relation doit satisfaire son équation quand la valeur connue est remplacée.", "Remplace la coordonnée connue, puis résous la petite équation qui reste."]);

// 11b. L2, 7.3, CR 2: missing x value in an ordered pair (backward mode; split from u6-missing-ordered-pair under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair-backward", 6, ["7.3"], 2, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var xt = ri(2, 10), yt = m * xt + b;
  var sol2 = "Remplace \\(y = " + yt + "\\) et résous pour \\(x\\) : \\[ \\begin{aligned} " + fmtD(yt) + " &= " + fmtD(m) + "x" + u6sgn(b) + " \\\\ " + fmtD(yt) + (b >= 0 ? " - " + fmtD(b) : " + " + fmtD(-b)) + " &= " + fmtD(m) + "x \\\\ " + fmtD(yt - b) + " &= " + fmtD(m) + "x \\\\ x &= " + fmtD(xt) + " \\end{aligned} \\] Donc la valeur manquante dans le couple \\((?, " + fmtD(yt) + ")\\) est <b>" + fmtD(xt) + "</b>.";
  return numq("Le couple ordonné \\((?, " + fmtD(yt) + ")\\) se trouve sur la relation \\(y = " + fmtD(m) + "x" + u6sgn(b) + "\\). Quelle est la valeur manquante de x ?", xt, 0.01, sol2,
    { mode: "missing-pair-x", m: m, b: b, yt: yt });
}, ["Un couple ordonné sur une relation doit satisfaire son équation quand la valeur connue est remplacée.", "Remplace la coordonnée connue, puis résous la petite équation qui reste."]);

// 12. L2, 7.1: describe the relationship shown in a graph of discrete points.
E("u6-describe-graph", 6, ["7.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var ctx = pick([
      { xl: "invités", yl: "coût ($)", thing: "le coût total en dollars", per: "invité" },
      { xl: "heures", yl: "distance (km)", thing: "la distance en kilomètres", per: "heure" },
      { xl: "semaines", yl: "économies ($)", thing: "l'épargne en dollars", per: "semaine" }
    ]);
    var b = ri(0, 8), m = ri(2, 6);
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
    var corr = "Quand la valeur de x augmente de 1, " + ctx.thing + " augmente de " + fmtD(m) + ", à partir de " + fmtD(b) + ".";
    var ds = u6pick3(corr, [
      { t: "Quand la valeur de x augmente de 1, " + ctx.thing + " augmente de " + fmtD(b) + ", à partir de " + fmtD(m) + ".", fb: "Cela échange le départ et le pas. Le premier point est à " + fmtD(b) + ", et les points voisins montent de " + fmtD(m) + "." },
      { t: "Quand la valeur de x augmente de 1, " + ctx.thing + " augmente de " + fmtD(m + 1) + ", à partir de " + fmtD(b) + ".", fb: "Le départ est correct, mais compare deux points voisins : la montée est de " + fmtD(m) + ", et non de " + fmtD(m + 1) + "." },
      { t: "Quand la valeur de x augmente de 1, " + ctx.thing + " diminue de " + fmtD(m) + ", à partir de " + fmtD(b) + ".", fb: "Les points montent quand x augmente, donc les valeurs augmentent ; elles ne diminuent pas." },
      { t: "Quand la valeur de x augmente de " + fmtD(m) + ", " + ctx.thing + " augmente de 1, à partir de " + fmtD(b) + ".", fb: "Cela inverse les rôles du pas et du changement de x. Lis un pas de x et vérifie la montée de y." }
    ]);
    if (!ds) continue;
    var sol = "Lis le premier point et la montée entre les points voisins : \\[ \\begin{aligned} \\text{départ} &= " + fmtD(b) + " \\\\ \\text{pas} &= " + fmtD(b + m) + " - " + fmtD(b) + " = " + fmtD(m) + " \\end{aligned} \\] Donc la relation est <b>" + corr + "</b>";
    var q = mcq("Le graphique montre une relation linéaire en points séparés. L'axe des abscisses est mesuré en " + ctx.xl + " et l'axe des ordonnées en " + ctx.yl + ". Quelle phrase décrit la relation entre les variables ?",
      { t: corr, fb: "Exact. Le premier point donne le départ et la montée régulière donne le pas." }, ds, sol,
      { mode: "describe-graph", b: b, m: m, ctx: ctx.xl });
    q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
    return q;
  }
  var qf = mcq("Le graphique montre une relation linéaire en points séparés. L'axe des abscisses est mesuré en heures et l'axe des ordonnées en distance (km). Quelle phrase décrit la relation entre les variables ?",
    { t: "Quand la valeur de x augmente de 1, la distance en kilomètres augmente de 3, à partir de 2.", fb: "Exact. Le premier point donne le départ et la montée régulière donne le pas." },
    [{ t: "Quand la valeur de x augmente de 1, la distance en kilomètres augmente de 2, à partir de 3.", fb: "Cela échange le départ et le pas." }, { t: "Quand la valeur de x augmente de 1, la distance en kilomètres augmente de 4, à partir de 2.", fb: "La montée entre les points voisins est de 3, et non de 4." }, { t: "Quand la valeur de x augmente de 1, la distance en kilomètres diminue de 3, à partir de 2.", fb: "Les points montent, donc les valeurs augmentent." }],
    "Le premier point est 2 et les points voisins montent de 3, donc la relation est <b>quand x augmente de 1, la distance augmente de 3, à partir de 2</b>.", { mode: "describe-graph-fallback" });
  var pf = []; for (var k2 = 0; k2 <= 5; k2++) pf.push([k2, 2 + 3 * k2]);
  qf.figure = u6graphPts({ xmax: 5, ymax: 17, xlab: "heures", ylab: "distance (km)", points: pf });
  return qf;
}, ["Commence par le point où x vaut 0 : c'est la valeur de départ de la relation.", "Compare deux points voisins pour trouver de combien y change pour chaque pas de 1 de x."]);

// 13. L2, 7.4: construct the graph (choose the correct set of plotted points) for an equation.
E("u6-construct-graph-points", 6, ["7.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var m = ri(2, 6), b = ri(1, 8);
    if (m === b) continue;
    var win = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4], [2, 3, 4, 5]]);
    function setStr(mm, bb) { var p = []; for (var k = 0; k < win.length; k++) p.push("(" + win[k] + ", " + fmtD(mm * win[k] + bb) + ")"); return p.join(", "); }
    var corr = setStr(m, b);
    var ds = u6pick3(corr, [
      { t: setStr(b, m), fb: "Cet ensemble vient de l'échange du pas et du départ. Vérifie le point où x = 0 : sa valeur de y devrait être " + fmtD(b) + "." },
      { t: setStr(m, -b), fb: "Cet ensemble soustrait la valeur de départ. À x = 0, l'équation donne y = " + fmtD(b) + ", une valeur positive." },
      { t: setStr(m + 1, b), fb: "Cet ensemble utilise un pas de " + fmtD(m + 1) + ". Le pas de l'équation est le nombre qui multiplie x, c'est-à-dire " + fmtD(m) + "." },
      { t: setStr(m, b + m), fb: "Cet ensemble commence un pas trop haut. À x = 0, la valeur de y est le départ, " + fmtD(b) + ", et non " + fmtD(b + m) + "." }
    ]);
    if (!ds) continue;
    var lines = win.map(function (xv) { return "x=" + xv + "&:\\ y = " + fmtD(m * xv + b); }).join(" \\\\ ");
    var sol = "Remplace chaque valeur de \\(x\\) dans \\(y = " + fmtD(m) + "x + " + fmtD(b) + "\\) : \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Tracer ces valeurs donne l'ensemble de points <b>" + corr + "</b>.";
    return mcq("Un graphique de la relation \\(y = " + fmtD(m) + "x + " + fmtD(b) + "\\) est construit en traçant des points pour \\(x = " + win.join(", ") + "\\). Quel ensemble de points est tracé ?",
      { t: corr, fb: "Exact. Chaque point vient du remplacement de sa valeur de x dans l'équation." }, ds, sol,
      { mode: "construct-graph-points", m: m, b: b });
  }
  return mcq("Un graphique de la relation \\(y = 2x + 3\\) est construit en traçant des points pour \\(x = 0, 1, 2, 3\\). Quel ensemble de points est tracé ?",
    { t: "(0, 3), (1, 5), (2, 7), (3, 9)", fb: "Exact. Chaque point vient du remplacement de sa valeur de x dans l'équation." },
    [{ t: "(0, 2), (1, 5), (2, 8), (3, 11)", fb: "Cet ensemble échange le pas et le départ." }, { t: "(0, -3), (1, -1), (2, 1), (3, 3)", fb: "Cet ensemble soustrait la valeur de départ." }, { t: "(0, 3), (1, 6), (2, 9), (3, 12)", fb: "Cet ensemble utilise un pas de 3 au lieu de 2." }],
    "Remplace chaque valeur de x : \\[ \\begin{aligned} x=0&:\\ y = 3 \\\\ x=1&:\\ y = 5 \\\\ x=2&:\\ y = 7 \\\\ x=3&:\\ y = 9 \\end{aligned} \\] L'ensemble tracé est <b>(0, 3), (1, 5), (2, 7), (3, 9)</b>.", { mode: "construct-graph-points-fallback" });
}, ["Construis les points un à la fois en remplaçant x = 0, 1, 2, 3 dans l'équation.", "Le point à x = 0 a toujours y égal à la valeur de départ dans l'équation."]);

// 14. L3, 8.7, CR 3: a problem in the a(x + b) = c form.
E("u6-solve-group-problem", 6, ["8.7"], 3, "gen", function () {
  var a = ri(3, 6), b = ri(1, 4), x = ri(4, 15), c = a * (x + b);
  var ctx = pick([
    { q: "Une école réserve " + a + " fourgonnettes pour une sortie. Chaque fourgonnette transporte x élèves et " + b + " enseignants. En tout, " + c + " personnes voyagent. Combien d'élèves y a-t-il dans chaque fourgonnette ?", unit: "élèves" },
    { q: "Un entraîneur prépare " + a + " trousses identiques. Chaque trousse contient x rondelles et " + b + " rouleaux de ruban. En tout, les trousses contiennent " + c + " articles. Combien de rondelles y a-t-il dans chaque trousse ?", unit: "rondelles" },
    { q: "Un boulanger remplit " + a + " boîtes. Chaque boîte contient x muffins et " + b + " biscuits. En tout, les boîtes contiennent " + c + " pâtisseries. Combien de muffins y a-t-il dans chaque boîte ?", unit: "muffins" }
  ]);
  var sol = "Soit \\(x\\) le nombre par groupe (" + ctx.unit + "). Chacun des " + a + " groupes contient \\(x + " + b + "\\) articles : \\[ \\begin{aligned} " + fmtD(a) + "(x + " + fmtD(b) + ") &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x + " + fmtD(a * b) + " &= " + fmtD(c) + " \\\\ " + fmtD(a) + "x &= " + fmtD(a * x) + " \\\\ x &= " + fmtD(x) + " \\end{aligned} \\] Donc il y a <b>" + fmtD(x) + " " + ctx.unit + "</b> dans chaque groupe.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-group-problem", a: a, b: b, unit: ctx.unit });
}, ["Chaque groupe contient la quantité inconnue plus le supplément fixe, et il y a plusieurs groupes identiques.", "Écris l'équation avec des parenthèses, développe, puis soustrais et divise."]);

// 15. L3, 7.3, CR 2: extend a graphed discrete relation to a missing ordered pair.
E("u6-graph-extend-pair", 6, ["7.3"], 3, "gen", function () {
  var ctx = pick([
    { xl: "caisses", yl: "bouteilles", thing: "bouteilles" },
    { xl: "jours", yl: "tours", thing: "tours" },
    { xl: "sacs", yl: "billes", thing: "billes" }
  ]);
  var b = ri(1, 9), m = ri(2, 5), xmax = 4, xq = ri(6, 9);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
  var sol = "Les points suivent une régularité constante avec un départ de " + fmtD(b) + " et un pas de " + fmtD(m) + ", donc la relation est \\(y = " + fmtD(m) + "x + " + fmtD(b) + "\\). Prolonge-la jusqu'à \\(x = " + xq + "\\) : \\[ \\begin{aligned} y &= " + fmtD(m) + "(" + xq + ") + " + fmtD(b) + " \\\\ &= " + fmtD(m * xq) + " + " + fmtD(b) + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la valeur manquante dans le couple \\((" + xq + ", \\ ?)\\) est <b>" + fmtD(ans) + "</b>.";
  var q = numq("Le graphique montre une relation linéaire en points séparés. L'axe des abscisses est mesuré en " + ctx.xl + " et l'axe des ordonnées en " + ctx.yl + ". La régularité se poursuit de la même façon. Quelle est la valeur manquante de y dans le couple ordonné (" + xq + ", ?) ?", ans, 0.01, sol,
    { mode: "graph-extend-pair", b: b, m: m, xq: xq, ctx: ctx.xl });
  q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
  return q;
}, ["Trouve d'abord la régularité à partir des points tracés : une valeur de départ et un pas constant.", "Construis l'équation à partir du départ et du pas, puis remplace la valeur de x donnée."]);

// 16. L3, 8.3: verify a claimed solution by substitution and judge the conclusion.
E("u6-verify-conclusion", 6, ["8.3"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 8), b = ri(1, 12), xt = ri(2, 12), c = a * xt + b;
    var claim = xt + pick([-3, -2, -1, 1, 2, 3]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = "La vérification donne un côté gauche de " + fmtD(lhs) + ", et non " + fmtD(c) + ", donc x = " + claim + " n'est pas la solution ; la solution est x = " + fmtD(xt) + ".";
    var ds = u6pick3(corr, [
      { t: "La vérification donne un côté gauche de " + fmtD(lhs) + ", qui correspond à " + fmtD(c) + ", donc x = " + claim + " est la solution dans ce travail.", fb: "Compare les deux côtés : le côté gauche donne " + fmtD(lhs) + " et le côté droit est " + fmtD(c) + ". Ils ne sont pas égaux." },
      { t: "La vérification donne un côté gauche de " + fmtD(c) + ", donc x = " + claim + " est la solution ; aucun autre travail n'est nécessaire.", fb: "Cela donne le côté droit comme résultat de la vérification sans faire le remplacement. Calcule d'abord " + fmtD(a) + "(" + claim + ") + " + fmtD(b) + "." },
      { t: "Le remplacement ne peut pas vérifier cette équation, donc l'affirmation doit être acceptée telle quelle, sans vérification.", fb: "Le remplacement vérifie n'importe quelle équation : mets la valeur affirmée à la place de x et compare les deux côtés." },
      { t: "La vérification donne un côté gauche de " + fmtD(lhs + a) + ", donc la solution est x = " + fmtD(claim) + " après tout dans ce calcul de vérification.", fb: "Revérifie la multiplication : " + fmtD(a) + " fois " + claim + " donne " + fmtD(a * claim) + ", et ajouter " + fmtD(b) + " donne " + fmtD(lhs) + "." }
    ]);
    if (!ds) continue;
    var sol = "Remplace la valeur affirmée et compare les côtés : \\[ \\begin{aligned} " + fmtD(a) + "x + " + fmtD(b) + " &= " + fmtD(a) + "(" + claim + ") + " + fmtD(b) + " \\\\ &= " + fmtD(lhs) + " \\\\ " + fmtD(lhs) + " &\\ne " + fmtD(c) + " \\end{aligned} \\] Résoudre l'équation donne \\(x = " + fmtD(xt) + "\\), car \\(" + fmtD(a) + "(" + fmtD(xt) + ") + " + fmtD(b) + " = " + fmtD(c) + "\\). Donc la conclusion correcte est <b>" + corr + "</b>";
    return mcq("Un élève affirme que \\(x = " + claim + "\\) est la solution de \\(" + fmtD(a) + "x + " + fmtD(b) + " = " + fmtD(c) + "\\) et la vérifie par remplacement. Quelle conclusion est correcte ?",
      { t: corr, fb: "Exact. Le côté gauche obtenu ne correspond pas au côté droit, donc l'affirmation échoue à la vérification." }, ds, sol,
      { mode: "verify-conclusion", a: a, b: b, claim: claim });
  }
  return mcq("Un élève affirme que \\(x = 5\\) est la solution de \\(3x + 2 = 14\\) et la vérifie par remplacement. Quelle conclusion est correcte ?",
    { t: "La vérification donne un côté gauche de 17, et non 14, donc x = 5 n'est pas la solution ; la solution est x = 4.", fb: "Exact. 3(5) + 2 = 17, ce qui n'égale pas 14." },
    [{ t: "La vérification donne un côté gauche de 17, qui correspond à 14, donc x = 5 est la solution dans ce travail.", fb: "17 et 14 ne sont pas égaux, donc l'affirmation échoue." }, { t: "La vérification donne un côté gauche de 14, donc x = 5 est la solution ; aucun autre travail n'est nécessaire dans ce travail.", fb: "Calcule 3(5) + 2 : cela donne 17, et non 14." }, { t: "Le remplacement ne peut pas vérifier cette équation, donc l'affirmation doit être acceptée telle quelle.", fb: "Le remplacement vérifie n'importe quelle équation." }],
    "Remplace : \\[ \\begin{aligned} 3x + 2 &= 3(5) + 2 \\\\ &= 17 \\\\ 17 &\\ne 14 \\end{aligned} \\] Donc la conclusion correcte est <b>x = 5 n'est pas la solution ; la solution est x = 4</b>.", { mode: "verify-conclusion-fallback" });
}, ["Une vérification par remplacement compare le côté gauche calculé avec le côté droit.", "Fais le remplacement toi-même d'abord, puis juge chaque conclusion avec tes nombres."]);

/* ----- bank-u7.js ----- */
// Math 8 (French) Unit 7 Data Analysis and Probability question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 3199 to 3774).
// CRMARKS: u7-apparent-height-ratio=2
// CRMARKS: u7-apply-rule-percent=2
// CRMARKS: u7-fix-the-graph=2
// CRMARKS: u7-name-the-trick=3
// CRMARKS: u7-same-colour-twice=3
// CRMARKS: u7-two-draws-percent=3
// CRMARKS: u7-two-spinners-decimal=3
/* TRANSLATOR NOTES
   Chunk: Math 8, Unit 7 (Data Analysis and Probability), chunk G.
   Translated per RULES.md and GLOSSARY.md.

   Judgement calls and term decisions:
   - Graph names (per assignment): circle graph = diagramme circulaire,
     bar graph = diagramme à bandes, double bar graph = diagramme à
     bandes doubles, line graph = diagramme à lignes brisées,
     pictograph = pictogramme. Note: the 8e guide outcome text also
     uses "graphiques à barres"; the assignment wording (à bandes)
     was followed.
   - spinner = roulette, with "sections égales" for its equal sections,
     following the Math 9 FR Unit 9 usage. fair die = dé équitable.
   - to draw = piger. heads = face, tails = pile (the pick arrays for
     coin sides feed display text only, so they carry the French
     words). odds (cote) and theoretical / experimental probability do
     not occur in this chunk.
   - Colours in the generators are stored as feminine singular forms
     (rouge, bleue, verte, dorée, violette, orange, jaune, blanche,
     noire, rose) and are only ever used after "la couleur" ("portent
     la couleur bleue", "tomber sur la couleur rouge", "piger la
     couleur verte"), so agreement holds for every random pick. Bag
     items (billes, jetons, perles, tuiles) are used in the pattern
     "N <objet> de couleur X" for the same reason, and the
     same-colour prompt is rephrased as "les deux tirages donnent la
     même couleur".
   - \text{} labels in u7-apparent-height-ratio: petite hauteur,
     grande hauteur, rapport apparent.
   - Percent: prose percents are spaced ("40 %"); inside math
     displays the percent is written " \%" so it renders spaced.
     Money: "20 $" in u7-choose-graph-basic.
   - textq answer lists are translated, with accented and unaccented
     variants where a typed answer could drop accents.
   - aria-label "Bar graph" in u7bars becomes "Diagramme à bandes".

   FMT-GEOM lines left as fmt( (each carries the marker on its line):
   all in u7bars: the gridline line, the bar rect line, the bar value
   text line and the category text line (coordinates only), and the
   tick text line, where the coordinate fmt( calls stay but the
   visible tick label itself was converted to fmtD. Display fmt(
   elsewhere (u7-two-spinners-decimal, u7-apply-rule-percent,
   u7-apparent-height-ratio) became fmtD.

   Unsure about: nothing blocking. "Diagramme à bandes doubles" for
   double bar graph follows the à bandes choice above.
*/
/* Unit 7: Data Analysis and Probability */
// Unit 7: Data Analysis and Probability (Math 8, NL). Entries only; helpers prefixed u7.

function u7gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u7red(n, d) { var g = u7gcd(n, d); return [n / g, d / g]; }
function u7frac(n, d) { var r = u7red(n, d); return "\\(" + FR(r[0], r[1]) + "\\)"; }

// Simple bar chart. If base > 0 the vertical axis is truncated, which is the
// deliberate flaw several critique entries ask about.
function u7bars(labels, vals, base, top) {
  var W = 320, H = 214, x0 = 48, yb = 176, yt = 30, ph = yb - yt;
  var n = vals.length, slot = (W - x0 - 10) / n, bw = Math.min(56, slot * 0.58);
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagramme à bandes">';
  var ticks = [base, (base + top) / 2, top];
  for (var i = 0; i < ticks.length; i++) {
    var ty = yb - (ticks[i] - base) / (top - base) * ph;
    out += '<line x1="' + x0 + '" y1="' + fmt(ty, 1) + '" x2="' + (W - 6) + '" y2="' + fmt(ty, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.7"/>'; /* FMT-GEOM */
    out += '<text x="' + (x0 - 5) + '" y="' + fmt(ty, 1) + '" font-size="11" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + fmtD(ticks[i]) + '</text>'; /* FMT-GEOM */
  }
  out += '<line x1="' + x0 + '" y1="' + yt + '" x2="' + x0 + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<line x1="' + x0 + '" y1="' + yb + '" x2="' + (W - 6) + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var j = 0; j < n; j++) {
    var bh = (vals[j] - base) / (top - base) * ph;
    var bx = x0 + slot * j + (slot - bw) / 2;
    out += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(yb - bh, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(bh, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; /* FMT-GEOM */
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + fmt(yb - bh - 10, 1) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + vals[j] + '</text>'; /* FMT-GEOM */
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + (yb + 15) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + labels[j] + '</text>'; /* FMT-GEOM */
  }
  return out + '</svg>';
}

E("u7-same-data-two-graphs", 7, ["11.1"], 1, "var", varset([
  function(){
    return mcq("Soixante élèves ont choisi un repas chaud. Les mêmes résultats sont montrés dans un diagramme circulaire et dans un diagramme à bandes. Quel énoncé compare bien les deux diagrammes ?",
      {t:"Le diagramme circulaire montre chaque choix comme une part des 60 repas, tandis que le diagramme à bandes rend le nombre exact de chaque choix plus facile à comparer", fb:"Exact : un diagramme circulaire met l'accent sur les parts d'un tout, et un diagramme à bandes met l'accent sur les valeurs exactes, catégorie par catégorie."},
      [{t:"Le diagramme circulaire montre le nombre exact de chaque choix, tandis que le diagramme à bandes montre chaque choix comme une part du tout entier", fb:"C'est l'inverse : les parts d'un tout appartiennent au diagramme circulaire, et les nombres exacts appartiennent au diagramme à bandes."},
       {t:"Le diagramme à bandes montre comment les choix ont changé pendant l'année scolaire, tandis que le diagramme circulaire montre le nombre exact pour chaque choix de repas", fb:"Aucun des deux diagrammes ne montre un changement dans le temps ici ; les données sont un seul ensemble de choix de repas, pas une série dans le temps."},
       {t:"Le diagramme circulaire compare les choix de deux classes différentes, tandis que le diagramme à bandes montre seulement le total des choix d'une seule classe", fb:"Les deux diagrammes montrent les mêmes 60 élèves ; comparer deux groupes demanderait un diagramme à bandes doubles."}],
      "Pour les mêmes données, chaque diagramme met en valeur une information différente : le diagramme circulaire montre les <b>parts du tout</b>, tandis que le diagramme à bandes montre les <b>nombres exacts, faciles à comparer</b>.",
      {mode:"compare-lunch"});
  },
  function(){
    return mcq("Le nombre de traversées de traversier chaque mois pendant un an est montré dans un diagramme à lignes brisées et dans un diagramme à bandes. Quel énoncé compare bien les deux diagrammes ?",
      {t:"Le diagramme à lignes brisées montre bien la tendance à la hausse et à la baisse pendant l'année, tandis que le diagramme à bandes rend la lecture du nombre pour un seul mois plus facile", fb:"Exact : un diagramme à lignes brisées met l'accent sur la tendance dans le temps, et des bandes séparées mettent l'accent sur les valeurs de chaque mois."},
      [{t:"Le diagramme à lignes brisées montre chaque mois comme une part de l'année entière, tandis que le diagramme à bandes montre la tendance à la hausse et à la baisse", fb:"Les parts d'un tout appartiennent au diagramme circulaire, et la tendance dans le temps appartient au diagramme à lignes brisées."},
       {t:"Le diagramme à bandes relie les mois pour prouver que les traversées ont causé la tendance, tandis que le diagramme à lignes brisées cache le nombre exact de chaque mois de l'année", fb:"Un diagramme à lignes brisées ne prouve pas une cause, et ses points se trouvent quand même aux nombres de chaque mois."},
       {t:"Le diagramme à lignes brisées compare deux trajets de traversier côte à côte, tandis que le diagramme à bandes montre seulement le trajet le plus occupé parmi tous les trajets de l'année", fb:"Les deux diagrammes montrent le même trajet ; une comparaison côte à côte de deux trajets demanderait un diagramme à bandes doubles."}],
      "Pour les mêmes données, le diagramme à lignes brisées met en valeur <b>la tendance du changement pendant l'année</b>, tandis que le diagramme à bandes met en valeur <b>la valeur de chaque mois</b>.",
      {mode:"compare-ferry"});
  },
  function(){
    return mcq("Les membres des clubs sont montrés dans un diagramme à bandes doubles, avec une bande pour la 7e année et une pour la 8e année dans chaque club, et dans un diagramme à bandes simple des totaux des clubs. Quel énoncé compare bien les deux diagrammes ?",
      {t:"Le diagramme à bandes doubles compare les deux années dans chaque club, tandis que le diagramme à bandes simple montre les totaux des clubs mais cache la répartition de chaque total par année", fb:"Exact : les bandes jumelées gardent la répartition par année visible, et une seule bande de total perd cette répartition."},
      [{t:"Le diagramme à bandes simple compare les deux années dans chaque club de l'école, tandis que le diagramme à bandes doubles montre seulement les totaux des clubs dans le diagramme des totaux", fb:"C'est l'inverse : les bandes jumelées portent la comparaison des années, et les bandes simples portent seulement les totaux."},
       {t:"Le diagramme à bandes doubles montre chaque club comme une part de tous les membres, tandis que le diagramme à bandes simple montre un changement dans le temps au fil des mois de l'année", fb:"Les parts d'un tout appartiennent au diagramme circulaire, et aucun de ces diagrammes ne montre un changement dans le temps."},
       {t:"Le diagramme à bandes simple est trompeur parce que ses totaux sont inventés, tandis que le diagramme à bandes doubles utilise les vrais nombres de membres pour chaque club et chaque année", fb:"Les deux diagrammes utilisent les mêmes vrais nombres ; ils mettent simplement en valeur des comparaisons différentes."}],
      "Pour les mêmes données, le diagramme à bandes doubles met en valeur <b>la comparaison entre la 7e année et la 8e année dans chaque club</b>, tandis que le diagramme à bandes simple met en valeur <b>les totaux des clubs seulement</b>.",
      {mode:"compare-clubs"});
  },
  function(){
    return mcq("Les livres empruntés en une semaine sont montrés dans un pictogramme, où un symbole de livre vaut 10 livres, et dans un diagramme à bandes. Quel énoncé compare bien les deux diagrammes ?",
      {t:"Le pictogramme attire l'oeil et donne une idée rapide de la grandeur, tandis que le diagramme à bandes donne les valeurs exactes plus facilement quand les nombres ne sont pas des multiples de 10", fb:"Exact : les images sont attrayantes mais obligent à utiliser des parties de symboles, tandis qu'un axe gradué de diagramme à bandes lit les valeurs exactes clairement."},
      [{t:"Le pictogramme donne les valeurs exactes plus facilement pour chaque classe de la bibliothèque, tandis que le diagramme à bandes ne peut montrer que des grandeurs approximatives seulement", fb:"C'est l'inverse : les parties de symboles rendent les valeurs du pictogramme approximatives, et l'axe du diagramme à bandes donne les valeurs exactes."},
       {t:"Le diagramme à bandes montre chaque classe de l'école comme une part de tous les livres empruntés, tandis que le pictogramme montre le changement pendant la semaine d'école de la bibliothèque municipale", fb:"Les parts d'un tout appartiennent au diagramme circulaire, et aucun diagramme ici n'est fait pour montrer un changement dans le temps."},
       {t:"Le pictogramme compare deux semaines différentes côte à côte, tandis que le diagramme à bandes montre seulement la semaine la plus lente de la bibliothèque cette année-là au complet", fb:"Les deux diagrammes montrent la même semaine ; une comparaison côte à côte demanderait un diagramme à bandes doubles."}],
      "Pour les mêmes données, le pictogramme met en valeur <b>une idée rapide et accrocheuse de la grandeur</b>, tandis que le diagramme à bandes met en valeur <b>les valeurs exactes</b>.",
      {mode:"compare-books"});
  }
]), ["Demande-toi ce que chaque diagramme est fait pour mettre en valeur : les parts d'un tout, les valeurs exactes, le changement dans le temps ou une comparaison entre groupes.", "Associe d'abord chaque type de diagramme à sa force, puis vérifie l'énoncé contre les deux moitiés."]);

E("u7-choose-graph-basic", 7, ["11.3"], 1, "var", varset([
  function(){
    return mcq("Une classe note la température extérieure chaque heure pendant une journée d'école et veut montrer comment elle a changé. Quel diagramme est le meilleur choix ?",
      {t:"Diagramme à lignes brisées, parce que les données montrent un changement dans le temps", fb:"Exact : des points reliés dans l'ordre du temps rendent les hausses et les baisses faciles à suivre."},
      [{t:"Diagramme circulaire, parce que les données montrent un changement dans le temps", fb:"Un diagramme circulaire montre les parts d'un tout, pas comment une valeur bouge d'heure en heure."},
       {t:"Pictogramme, parce que les données montrent un changement dans le temps pendant toute la journée d'école", fb:"Un pictogramme compare des quantités avec des images ; il ne suit pas bien un changement dans le temps."},
       {t:"Diagramme à bandes doubles, parce que les données montrent un changement dans le temps", fb:"Un diagramme à bandes doubles compare deux groupes ; il n'y a qu'un seul relevé de température ici."}],
      "Les données recueillies dans le temps sont mieux montrées avec un <b>diagramme à lignes brisées</b>, parce que les points reliés montrent le changement directement.",
      {mode:"choose-temperature"});
  },
  function(){
    return mcq("Une élève veut montrer comment son argent de poche de 20 $ est réparti entre les collations, les économies et les jeux. Quel diagramme est le meilleur choix ?",
      {t:"Diagramme circulaire, parce que les parties forment un seul montant total", fb:"Exact : chaque tranche est une part des mêmes 20 $, ce que montre un diagramme circulaire."},
      [{t:"Diagramme à lignes brisées, parce que les parties forment un seul montant total", fb:"Un diagramme à lignes brisées montre un changement dans le temps ; rien ici ne change dans le temps."},
       {t:"Diagramme à bandes, parce que les parties forment un seul montant total", fb:"Un diagramme à bandes compare bien des montants séparés, mais les parts d'un seul tout sont la force du diagramme circulaire."},
       {t:"Pictogramme, parce que les parties forment un seul montant total", fb:"Un pictogramme compare des nombres avec des images ; il ne montre pas clairement les parts d'un tout."}],
      "Quand les parties forment un seul tout, un <b>diagramme circulaire</b> est le meilleur choix, parce que chaque tranche montre une part des 20 $.",
      {mode:"choose-allowance"});
  },
  function(){
    return mcq("Un enseignant veut comparer combien d'élèves se sont inscrits à chacun de cinq clubs du midi différents. Quel diagramme est le meilleur choix ?",
      {t:"Diagramme à bandes, parce que des catégories séparées sont comparées par leur nombre", fb:"Exact : une bande par club rend les nombres faciles à comparer d'un coup d'oeil."},
      [{t:"Diagramme circulaire, parce que des catégories sont comparées par leur nombre", fb:"Un diagramme circulaire met l'accent sur les parts d'un tout ; l'enseignant demandait une comparaison de nombres."},
       {t:"Diagramme à lignes brisées, parce que des catégories séparées sont comparées par leur nombre", fb:"Un diagramme à lignes brisées montre un changement dans le temps ; les catégories de clubs n'ont pas d'ordre dans le temps."},
       {t:"Diagramme à bandes doubles, parce que des catégories séparées sont comparées par leur nombre", fb:"Un diagramme à bandes doubles demande deux groupes à comparer ; on donne un seul nombre par club."}],
      "Comparer des nombres entre des catégories séparées est le travail d'un <b>diagramme à bandes</b>, avec une bande par club.",
      {mode:"choose-clubs"});
  },
  function(){
    return mcq("Un entraîneur veut comparer combien d'élèves de 7e année et de 8e année jouent à chacun de quatre sports. Quel diagramme est le meilleur choix ?",
      {t:"Diagramme à bandes doubles, parce que deux groupes sont comparés dans chaque catégorie", fb:"Exact : les bandes jumelées permettent de comparer les années, sport par sport."},
      [{t:"Diagramme circulaire, parce que deux groupes sont comparés dans chaque catégorie", fb:"Un diagramme circulaire montre les parts d'un seul tout ; il ne peut pas contenir deux groupes pour chaque sport."},
       {t:"Diagramme à lignes brisées, parce que deux groupes sont comparés dans chaque catégorie", fb:"Un diagramme à lignes brisées montre un changement dans le temps ; les catégories de sports n'ont pas d'ordre dans le temps."},
       {t:"Pictogramme, parce que deux groupes sont comparés dans chaque catégorie", fb:"Un pictogramme avec deux ensembles de symboles devient confus ; les bandes jumelées gardent la comparaison claire."}],
      "Comparer deux groupes dans chaque catégorie est le travail d'un <b>diagramme à bandes doubles</b>.",
      {mode:"choose-sports"});
  },
  function(){
    return mcq("Une bibliothécaire fait une affiche pour de jeunes enfants qui montre combien d'albums, de bandes dessinées et de romans ont été empruntés, et elle veut montrer les quantités avec des images. Quel diagramme est le meilleur choix ?",
      {t:"Pictogramme, parce que les symboles imagés rendent les quantités faciles et rapides à saisir", fb:"Exact : les symboles conviennent à un jeune public et donnent une idée immédiate de la plus grande quantité."},
      [{t:"Diagramme à lignes brisées, parce que les symboles imagés rendent les quantités faciles et rapides à saisir", fb:"Un diagramme à lignes brisées montre un changement dans le temps ; ce sont trois catégories séparées."},
       {t:"Diagramme circulaire, parce que les symboles rendent les quantités faciles à saisir", fb:"Un diagramme circulaire montre les parts d'un tout avec des tranches, pas avec des symboles imagés."},
       {t:"Diagramme à bandes doubles, parce que les symboles rendent les quantités faciles à saisir", fb:"Un diagramme à bandes doubles compare deux groupes ; un seul ensemble de quantités est montré."}],
      "Des quantités montrées avec des symboles imagés pour un jeune public demandent un <b>pictogramme</b>.",
      {mode:"choose-poster"});
  }
]), ["Décide d'abord ce que font les données : changer dans le temps, partager un tout, comparer des catégories ou comparer deux groupes.", "Associe ce travail au diagramme fait pour lui : lignes brisées, circulaire, à bandes, à bandes doubles ou pictogramme."]);

E("u7-product-rule-intro", 7, ["12.3"], 1, "gen", function () {
  var attempt = 0, cfg = null;
  while (attempt < 60 && !cfg) {
    attempt++;
    var useSpinner = ri(0, 1) === 1;
    var S = useSpinner ? pick([4, 6, 8, 10, 12]) : 2;
    var F = useSpinner ? ri(1, S - 1) : 1;
    var G = ri(1, 5);
    var nums = shuffle([1, 2, 3, 4, 5, 6]).slice(0, G).sort(function (a, b) { return a - b; });
    var p = u7red(F * G, S * 6), s1 = u7red(F, S), s2 = u7red(G, 6), ad = u7red(F * 6 + G * S, S * 6);
    var texts = [p.join("/"), s1.join("/"), s2.join("/"), ad.join("/")];
    if (new Set(texts).size === 4) cfg = { S: S, F: F, G: G, nums: nums, useSpinner: useSpinner, p: p };
  }
  if (!cfg) cfg = { S: 8, F: 3, G: 2, nums: [2, 4], useSpinner: true, p: u7red(6, 48) };
  var colour = pick(["rouge", "bleue", "verte", "dorée", "violette", "orange"]);
  var side = pick(["face", "pile"]);
  var ev1 = cfg.useSpinner
    ? "Une roulette compte " + cfg.S + " sections égales et " + cfg.F + " d'entre elles portent la couleur " + colour + ". On fait tourner la roulette et on lance un dé équitable."
    : "On lance une pièce et on lance un dé équitable.";
  var ev1name = cfg.useSpinner ? ("tomber sur la couleur " + colour) : ("obtenir " + side);
  var prompt = ev1 + " Quelle est la probabilité de " + ev1name + " et d'obtenir l'un des numéros " + cfg.nums.join(", ") + " au dé ?";
  var f1 = cfg.useSpinner ? u7frac(cfg.F, cfg.S) : "\\(\\frac{1}{2}\\)";
  var sol = "Pour des événements indépendants, multiplie les deux probabilités : \\[ \\begin{aligned} P &= " + (cfg.useSpinner ? FR(cfg.F, cfg.S) : FR(1, 2)) + " \\times " + FR(cfg.G, 6) + " \\\\ &= " + FR(cfg.F * cfg.G, cfg.S * 6) + " \\\\ &= " + FR(cfg.p[0], cfg.p[1]) + " \\end{aligned} \\] Donc la probabilité est <b>\\(" + FR(cfg.p[0], cfg.p[1]) + "\\)</b>.";
  return mcq(prompt,
    { t: u7frac(cfg.p[0], cfg.p[1]), fb: "Exact : les deux événements sont indépendants, donc leurs probabilités se multiplient et le résultat est réduit." },
    [{ t: u7frac(F2A(cfg), F2B(cfg)), fb: "Cela additionne les deux probabilités ; des événements indépendants qui doivent arriver tous les deux utilisent la multiplication, pas l'addition." },
     { t: f1, fb: "C'est la probabilité du premier événement seulement ; le lancer du dé doit aussi être inclus." },
     { t: u7frac(cfg.G, 6), fb: "C'est la probabilité de l'événement du dé seulement ; le premier événement doit aussi être inclus." }],
    sol, { mode: "product-intro", S: cfg.S, F: cfg.F, G: cfg.G });
  function F2A(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[0]; }
  function F2B(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[1]; }
}, ["Des événements indépendants ne s'influencent pas, donc la probabilité que les deux arrivent est un produit.", "Trouve d'abord la probabilité de chaque événement seul, puis multiplie les deux fractions."]);

E("u7-advantages-disadvantages", 7, ["11.2"], 1, "var", varset([
  function(){
    return mcq("Une gérante a besoin du nombre exact de billets vendus dans chacune de six sections de places, pour comparer les sections avec précision. Quel énoncé donne un avantage et un désavantage d'utiliser un diagramme circulaire pour ces données ?",
      {t:"Avantage : il montre d'un coup d'oeil la part de chaque section dans les ventes totales. Désavantage : les nombres exacts sont difficiles à lire à partir de la taille des tranches", fb:"Exact : les tranches mettent l'accent sur les parts, mais les nombres précis sont justement ce que les tranches montrent mal."},
      [{t:"Avantage : il montre clairement le nombre exact dans chaque section. Désavantage : il ne peut pas montrer les parts des ventes totales du tout, même approximativement", fb:"Les deux moitiés sont inversées : les tranches sont faibles pour les nombres exacts et fortes pour les parts."},
       {t:"Avantage : il montre comment les ventes de billets ont changé pendant toute la saison de spectacles. Désavantage : il utilise trop de couleurs différentes pour six sections de places assises", fb:"Un diagramme circulaire ne montre pas du tout un changement dans le temps, donc l'avantage énoncé est faux."},
       {t:"Avantage : il compare deux saisons différentes de ventes côte à côte. Désavantage : les nombres exacts de billets sont difficiles à lire à partir de la taille des tranches du diagramme", fb:"Un seul diagramme circulaire contient un seul ensemble de parts ; comparer deux saisons demanderait deux diagrammes ou des bandes jumelées."}],
      "Un diagramme circulaire est fort pour les <b>parts d'un tout</b> et faible pour les <b>valeurs exactes</b>, donc il convient mal à ces données de billets quand les nombres précis comptent.",
      {mode:"adv-circle"});
  },
  function(){
    return mcq("Des classes notent des nombres de recyclage de 37, 52 et 48 objets pour un pictogramme où un symbole vaut 10 objets. Quel énoncé donne un avantage et un désavantage du pictogramme ici ?",
      {t:"Avantage : les symboles attirent l'oeil et sont faciles à saisir pour de jeunes élèves. Désavantage : des nombres comme 37 demandent des parties de symboles, donc les valeurs exactes sont difficiles à montrer", fb:"Exact : les images attirent les lecteurs, mais les valeurs entre les multiples de 10 obligent à utiliser des parties de symboles maladroites."},
      [{t:"Avantage : il donne des valeurs exactes pour chaque nombre affiché. Désavantage : les symboles sont ennuyeux et difficiles à saisir pour de jeunes élèves de l'école élémentaire du quartier", fb:"Les deux moitiés sont inversées : les parties de symboles rendent les valeurs inexactes, et les symboles sont la partie attrayante."},
       {t:"Avantage : il montre la part de chaque classe de l'école dans tout le recyclage. Désavantage : des parties de symboles sont nécessaires pour des nombres comme 37 dans les données de recyclage", fb:"Un pictogramme compare des quantités avec des symboles ; les parts d'un tout sont le travail du diagramme circulaire."},
       {t:"Avantage : les symboles attirent l'oeil des jeunes élèves. Désavantage : il ne peut pas être utilisé quand il y a trois catégories bien différentes dans les données du recyclage des classes de l'école élémentaire", fb:"Trois catégories vont très bien dans un pictogramme ; la vraie faiblesse est les parties de symboles pour les nombres entre deux multiples."}],
      "Un pictogramme est fort pour <b>l'attrait visuel</b> et faible pour <b>les valeurs exactes qui tombent entre les pas des symboles</b>.",
      {mode:"adv-pictograph"});
  },
  function(){
    return mcq("Un élève utilise un diagramme à lignes brisées pour montrer les parfums de crème glacée préférés d'une classe : chocolat, vanille, fraise et menthe. Quel énoncé donne un avantage et un désavantage de ce choix ?",
      {t:"Avantage : les points sont rapides à placer dans l'ordre. Désavantage : relier les points suggère un changement d'un parfum à l'autre qui n'existe pas", fb:"Exact : les parfums n'ont pas d'ordre dans le temps, donc la ligne reliée invente une tendance entre des catégories sans lien."},
      [{t:"Avantage : il montre clairement la part de chaque parfum dans la classe. Désavantage : relier les points suggère un changement qui n'existe pas", fb:"Les parts d'un tout sont montrées par un diagramme circulaire, pas par des points sur un diagramme à lignes brisées."},
       {t:"Avantage : les points sont rapides à placer dans l'ordre. Désavantage : un diagramme à lignes brisées ne peut jamais être tracé pour des données de catégories", fb:"Un diagramme à lignes brisées peut être tracé, mais c'est un mauvais choix ici parce que la ligne suggère une fausse tendance."},
       {t:"Avantage : il compare deux classes différentes parfum par parfum. Désavantage : l'axe a besoin d'une échelle pour les nombres des élèves", fb:"Une seule classe est montrée, donc il n'y a pas de comparaison de deux groupes dans ce diagramme."}],
      "Un diagramme à lignes brisées est fait pour le <b>changement dans le temps</b> ; l'utiliser sur des catégories sans lien crée une <b>fausse suggestion de tendance</b>.",
      {mode:"adv-line"});
  },
  function(){
    return mcq("Une bibliothécaire utilise un diagramme à bandes doubles pour comparer les emprunts de livres cette année et l'an passé dans huit genres. Quel énoncé donne un avantage et un désavantage de ce choix ?",
      {t:"Avantage : les deux années sont côte à côte dans chaque genre, donc les changements sont faciles à repérer. Désavantage : avec huit genres, le diagramme devient chargé et plus difficile à lire", fb:"Exact : les bandes jumelées excellent pour comparer deux groupes, et beaucoup de catégories rendent les paires encombrées."},
      [{t:"Avantage : il montre la part de chaque genre de livre dans tous les emprunts de la bibliothèque. Désavantage : avec huit genres, le diagramme devient chargé et plus difficile à lire pour les lecteurs", fb:"Les bandes jumelées comparent des nombres ; les parts d'un tout sont le travail du diagramme circulaire."},
       {t:"Avantage : les deux années sont côte à côte dans chaque genre. Désavantage : un diagramme à bandes doubles ne peut pas montrer des nombres, seulement des parts des emprunts de la bibliothèque", fb:"Les bandes jumelées montrent des nombres sur une échelle comme tout diagramme à bandes ; le désavantage donné ici est faux."},
       {t:"Avantage : il suit les emprunts de livres de façon continue entre les deux années. Désavantage : les genres de livres n'ont pas d'ordre dans le temps dans ce diagramme de la bibliothèque", fb:"Les bandes ne suivent rien de façon continue ; la comparaison côte à côte est l'avantage."}],
      "Un diagramme à bandes doubles est fort pour <b>comparer deux groupes dans chaque catégorie</b> et faible quand <b>beaucoup de catégories le rendent chargé</b>.",
      {mode:"adv-doublebar"});
  },
  function(){
    return mcq("Un club météo utilise un diagramme à bandes pour montrer la pluie mensuelle sur trois années complètes, en espérant que les lecteurs verront la tendance à long terme. Quel énoncé donne un avantage et un désavantage de ce choix ?",
      {t:"Avantage : le total de chaque mois peut être lu exactement sur l'échelle. Désavantage : 36 bandes séparées rendent la tendance générale plus difficile à suivre qu'avec une ligne", fb:"Exact : les bandes donnent des valeurs mensuelles exactes, mais une longue suite de bandes cache le fil de la tendance."},
      [{t:"Avantage : les bandes séparées se relient en une tendance lisse et continue. Désavantage : les totaux mensuels de pluie ne peuvent pas être lus sur l'échelle du diagramme", fb:"Les deux moitiés sont fausses : les bandes restent séparées, et leurs totaux se lisent directement sur l'échelle."},
       {t:"Avantage : la part de chaque mois dans la pluie totale de l'année est claire pour les lecteurs. Désavantage : 36 bandes séparées rendent la tendance générale difficile à suivre", fb:"Les parts d'un tout appartiennent au diagramme circulaire ; ces bandes montrent des quantités mensuelles."},
       {t:"Avantage : le total de chaque mois se lit exactement sur l'échelle. Désavantage : les diagrammes à bandes n'ont pas le droit de montrer plus d'une année complète de données mensuelles de pluie", fb:"Les diagrammes à bandes peuvent montrer n'importe quel nombre de mois ; la vraie faiblesse est la lecture d'une tendance sur une longue suite."}],
      "Un diagramme à bandes est fort pour les <b>valeurs exactes</b> et faible pour <b>montrer une tendance sur une longue période</b>, où un diagramme à lignes brisées fonctionne mieux.",
      {mode:"adv-bar-rain"});
  }
]), ["Juge le diagramme selon le travail : que doit faire le lecteur avec ces données, comparer exactement, voir des parts ou suivre une tendance ?", "Vérifie les deux moitiés de chaque énoncé ; une bonne réponse demande un avantage vrai et un désavantage vrai."]);

E("u7-misleading-format", 7, ["11.4"], 1, "var", varset([
  function(){
    var q = mcq("Une affiche d'aréna utilise ce diagramme à bandes pour affirmer que la patinoire Sud est beaucoup plus occupée que la patinoire Nord. Quel élément du format du diagramme peut mener les lecteurs à mal interpréter les données ?",
      {t:"L'axe vertical commence à 80 au lieu de 0, donc une petite différence de fréquentation semble grande", fb:"Exact : les deux bandes sont mesurées à partir de 80, donc les hauteurs visibles exagèrent l'écart entre 92 et 96."},
      [{t:"Les deux bandes ont des largeurs différentes, donc la bande plus large semble plus importante du diagramme", fb:"Les bandes ont la même largeur ; la distorsion vient de l'endroit où l'axe commence."},
       {t:"Les catégories sont listées dans le mauvais ordre, donc la plus petite valeur vient en premier dans la liste", fb:"L'ordre des catégories ne déforme pas la taille ici ; c'est l'axe qui commence à 80 qui le fait."},
       {t:"Le diagramme n'a pas de titre, donc les lecteurs ne peuvent pas dire ce qui est mesuré ici", fb:"Un titre aiderait, mais les valeurs se lisent quand même clairement ; l'élément trompeur est l'axe qui commence à 80."}],
      "Quand un axe vertical commence au-dessus de zéro, les hauteurs des bandes ne correspondent plus aux valeurs. Commencer à <b>80</b> fait paraître 96 beaucoup plus grand que 92, ce qui est l'élément trompeur.",
      {mode:"mislead-truncated"});
    q.figure = u7bars(["Nord", "Sud"], [92, 96], 80, 100);
    return q;
  },
  function(){
    return mcq("Un diagramme à lignes brisées des usagers quotidiens d'autobus marque son axe vertical 0, 10, 15, puis 40 usagers. Quel élément du format du diagramme peut mener les lecteurs à mal interpréter les données ?",
      {t:"Les intervalles de l'axe vertical sont inégaux, donc des pas égaux sur la page représentent des quantités différentes", fb:"Exact : des sauts de 10, 5 et 25 sur un même axe étirent certains changements et en écrasent d'autres."},
      [{t:"La ligne est tracée dans une couleur foncée, donc les lecteurs remarquent le point le plus haut en premier lieu", fb:"La couleur de la ligne ne change pas les valeurs ; c'est l'espacement inégal de l'échelle qui le fait."},
       {t:"Le diagramme place les jours le long du bas du diagramme, donc les fins de semaine semblent moins importantes dans le diagramme", fb:"Placer les jours dans l'ordre est normal pour un changement dans le temps ; l'espacement de l'échelle est le problème."},
       {t:"Le point le plus haut est étiqueté, donc les lecteurs peuvent penser que c'est la moyenne des données du diagramme", fb:"Étiqueter un point ne déforme pas l'échelle ; les intervalles inégaux, oui."}],
      "Une échelle doit utiliser des pas égaux. Des <b>intervalles inégaux</b> sur l'axe étirent et écrasent les changements, donc l'image représente mal les données.",
      {mode:"mislead-intervals"});
  },
  function(){
    return mcq("Un organisme de bienfaisance dessine ses parts de dépenses dans un diagramme circulaire 3D, avec les tranches de devant penchées vers le lecteur. Quel élément du format du diagramme peut mener les lecteurs à mal interpréter les données ?",
      {t:"L'effet 3D fait paraître les tranches de devant plus grandes que des tranches de même part à l'arrière", fb:"Exact : la pente et la profondeur ajoutent de l'aire qui n'a rien à voir avec la part que chaque tranche représente."},
      [{t:"Les tranches sont rangées de la plus grande à la plus petite, donc la première tranche reçoit le plus d'attention", fb:"Ranger les tranches est un choix normal et ne change pas leurs tailles relatives."},
       {t:"Le diagramme utilise des pourcentages au lieu de montants, donc les dépenses totales sont cachées", fb:"Les pourcentages sont une façon juste de montrer des parts ; la distorsion visuelle vient de la pente 3D."},
       {t:"Le nom de l'organisme est imprimé au-dessus, donc les lecteurs font confiance aux tranches trop vite", fb:"La confiance dans la source n'est pas une distorsion de format ; l'effet 3D change la grandeur apparente des tranches."}],
      "Dans un diagramme circulaire, l'aire d'une tranche doit correspondre à sa part. Un <b>effet 3D</b> ajoute une fausse aire aux tranches de devant, donc les lecteurs jugent mal les parts.",
      {mode:"mislead-3d"});
  },
  function(){
    return mcq("Dans un pictogramme des animaux de compagnie possédés, le symbole pour les chiens est dessiné deux fois plus haut et deux fois plus large que le symbole pour les chats, et un symbole vaut 10 animaux dans les deux rangées. Quel élément peut mener les lecteurs à mal interpréter les données ?",
      {t:"Les symboles de chiens couvrent environ quatre fois l'aire, donc les chiens semblent beaucoup plus nombreux que les nombres le disent", fb:"Exact : doubler la hauteur et la largeur multiplie l'aire par quatre, même si un symbole veut toujours dire 10 animaux."},
      [{t:"Les rangées sont empilées verticalement dans le diagramme, donc la rangée du haut est lue en premier par les lecteurs du pictogramme", fb:"L'ordre de lecture ne change pas les quantités ; l'aire des symboles fait la distorsion ici."},
       {t:"Un symbole vaut 10 animaux, donc les petits nombres demandent des parties de symboles pour être montrés dans le diagramme des animaux", fb:"Les parties de symboles sont une vraie faiblesse des pictogrammes, mais la distorsion ici est la taille inégale des symboles."},
       {t:"Le diagramme liste les chiens avant les chats, donc les lecteurs favorisent la première catégorie listée dans le diagramme des animaux de compagnie", fb:"L'ordre des catégories ne gonfle pas un nombre ; les symboles surdimensionnés, oui."}],
      "Les symboles d'un pictogramme doivent tous avoir la même taille. Rendre un symbole <b>plus grand dans les deux sens</b> multiplie son aire et représente mal le nombre.",
      {mode:"mislead-symbols"});
  },
  function(){
    var q = mcq("Une affiche d'école utilise ce diagramme à bandes pour suggérer que la vente de pâtisseries a grandi beaucoup plus vite que la foire du livre. Quel élément du format du diagramme peut mener les lecteurs à mal interpréter les données ?",
      {t:"L'axe vertical commence à 40 au lieu de 0, donc l'écart entre les deux totaux semble beaucoup plus grand qu'il l'est", fb:"Exact : mesurées à partir de 40, les hauteurs visibles des bandes sont 14 et 22, un rapport beaucoup plus grand que 54 contre 62."},
      [{t:"La bande de la foire du livre est ombrée, donc les lecteurs pensent qu'elle a rapporté plus d'argent dans l'affiche", fb:"Les deux bandes utilisent le même ombrage ; la distorsion vient de l'axe qui commence à 40."},
       {t:"Les totaux sont écrits au-dessus des bandes, donc les lecteurs sautent l'axe complètement pour la lecture des données", fb:"Les étiquettes de valeurs aident en fait la précision ; l'élément trompeur est l'axe tronqué."},
       {t:"Seulement deux événements sont montrés, donc les lecteurs ne peuvent pas les comparer équitablement sur un même axe", fb:"Deux catégories se comparent équitablement sur un axe correct ; commencer l'axe à 40 est la distorsion."}],
      "Les hauteurs des bandes doivent être mesurées à partir de zéro pour correspondre aux valeurs. Un axe qui commence à <b>40</b> exagère la différence entre 54 et 62.",
      {mode:"mislead-truncated2"});
    q.figure = u7bars(["Vente de pâtisseries", "Foire du livre"], [54, 62], 40, 70);
    return q;
  }
]), ["Regarde comment l'image est construite : où l'axe commence, comment ses pas sont espacés, et si des effets de taille ajoutent de l'aire.", "Compare la taille visuelle des bandes ou des tranches avec les nombres qu'elles représentent ; un écart nomme le défaut."]);

E("u7-name-the-trick", 7, ["11.5"], 1, "var", varset([
  function(){
    return textq("Un diagramme à bandes montre des moyennes de quiz de 48, 52 et 55 pour trois classes. Son axe vertical commence à 40, donc la bande pour 55 domine celle pour 48. Nomme le choix de format qui représente mal les données.",
      ["axe tronqué", "axe vertical tronqué", "l'axe est tronqué", "l'axe ne commence pas à zéro", "axe qui ne commence pas à zéro", "l'axe commence à 40", "axe qui commence à 40", "l'axe commence au-dessus de zéro", "axe brisé", "ne commence pas à zéro", "commencer l'axe à 40", "l'axe ne commence pas à 0", "axe qui commence à une valeur non nulle", "axe tronque", "l'axe ne commence pas a zero"],
      "Les bandes sont mesurées à partir de 40 au lieu de zéro, donc leurs hauteurs ne correspondent plus aux moyennes. Le choix de format est un <b>axe tronqué (un axe qui ne commence pas à zéro)</b>.",
      {mode:"trick-axis"});
  },
  function(){
    return textq("Un diagramme à lignes brisées des températures du soir marque son axe vertical 0, 5, 20 et 45 degrés, donc une petite hausse semble raide. Nomme le choix de format qui représente mal les données.",
      ["intervalles inégaux", "intervalles inégals", "échelle inégale", "intervalles irréguliers", "les intervalles sont inégaux", "échelle non uniforme", "intervalles d'axe inégaux", "intervalles inconsistants", "echelle inegale", "intervalles inegaux"],
      "Des pas égaux sur la page représentent des sauts de 5, 15 et 25 degrés, donc les changements sont étirés de façon inégale. Le choix de format est des <b>intervalles inégaux</b> sur l'axe.",
      {mode:"trick-intervals"});
  },
  function(){
    return textq("Une ville dessine ses parts de budget dans un diagramme circulaire 3D. La tranche de devant, pour les parcs, semble beaucoup plus grande qu'une tranche à l'arrière avec la même part. Nomme le choix de format qui représente mal les données.",
      ["effet 3d", "effet 3-d", "effet tridimensionnel", "diagramme circulaire 3d", "utiliser la 3d", "utiliser le 3d", "diagramme 3d", "effet en trois dimensions", "3d"],
      "Pencher le diagramme ajoute de la profondeur et de l'aire aux tranches de devant qui n'ont rien à voir avec leurs parts. Le choix de format est l'<b>effet 3D</b>.",
      {mode:"trick-3d"});
  },
  function(){
    return textq("Un pictogramme montre les repas vendus, avec un symbole qui vaut 10 repas dans chaque rangée. Les symboles de la rangée pizza sont dessinés deux fois plus hauts et deux fois plus larges que les symboles de la rangée soupe. Nomme le choix de format qui représente mal les données.",
      ["symboles de tailles différentes", "tailles de symboles différentes", "symboles de différentes tailles", "symboles inégaux", "icônes de tailles différentes", "images de tailles différentes", "les symboles sont de tailles différentes", "symboles plus grands", "symboles de taille différente", "taille des symboles"],
      "Chaque symbole veut toujours dire 10 repas, mais les symboles de pizza couvrent environ quatre fois l'aire. Le choix de format est <b>d'utiliser des symboles de tailles différentes</b>.",
      {mode:"trick-symbols"});
  },
  function(){
    return textq("Un gym annonce avec un diagramme à lignes brisées des nouveaux membres qui montre seulement les trois mois les plus occupés de l'année, quand les inscriptions ont bondi, et laisse de côté les neuf autres mois. Nomme le choix de format qui représente mal les données.",
      ["données choisies", "données sélectionnées", "choix sélectif des données", "sélection des données", "montrer seulement une partie des données", "ne montrer qu'une partie des données", "données partielles", "omettre des données", "laisser de côté des données", "montrer seulement les meilleurs mois", "ne montrer que les meilleurs mois", "données triées sur le volet"],
      "Le diagramme cache les neuf mois plus calmes, donc le bond semble être toute l'histoire. Le choix de format est des <b>données choisies (montrer seulement une partie choisie des données)</b>.",
      {mode:"trick-cherry"});
  }
]), ["Nomme l'élément intégré qui fait le dommage : le départ de l'axe, l'espacement de l'axe, les effets de profondeur, la taille des symboles ou les données manquantes.", "Décris l'élément en mots simples ; un court nom pour l'élément suffit."]);

E("u7-false-conclusion", 7, ["11.6"], 2, "var", varset([
  function(){
    return mcq("Les emprunts à la bibliothèque étaient : lundi 120, mardi 135, mercredi 128, jeudi 150, vendredi 142. Quelle conclusion va contre ces données ?",
      {t:"Les emprunts ont augmenté chaque jour de la semaine", fb:"Exact : les emprunts ont baissé de 135 le mardi à 128 le mercredi, donc ils n'ont pas augmenté chaque jour."},
      [{t:"Le jeudi a eu le plus d'emprunts de la semaine", fb:"Cela correspond aux données : 150 le jeudi est la plus grande valeur listée."},
       {t:"Les emprunts du vendredi étaient plus élevés que ceux du lundi", fb:"Cela correspond aux données : 142 le vendredi est plus grand que 120 le lundi."},
       {t:"Les emprunts du mercredi étaient plus bas que ceux du mardi", fb:"Cela correspond aux données : 128 est plus petit que 135, donc cette conclusion est cohérente."}],
      "Vérifie chaque affirmation contre chaque valeur. Les emprunts ont chuté le mercredi, donc la conclusion qui va contre les données est que <b>les emprunts ont augmenté chaque jour</b>.",
      {mode:"false-loans"});
  },
  function(){
    return mcq("Un diagramme circulaire montre comment les élèves se rendent à l'école : autobus 40 %, marche 35 %, voiture 25 %. Quelle conclusion va contre ces données ?",
      {t:"La plupart des élèves se rendent à l'école en autobus", fb:"Exact : 40 % est la plus grande part, mais la plupart veut dire plus de la moitié, et 40 % est sous la moitié."},
      [{t:"Plus d'élèves prennent l'autobus que la marche", fb:"Cela correspond aux données : 40 % est plus grand que 35 %."},
       {t:"La marche et la voiture ensemble comptent pour 60 % des élèves", fb:"Cela correspond aux données : 35 % plus 25 % font 60 %."},
       {t:"La voiture est le moyen listé le moins courant pour se rendre à l'école", fb:"Cela correspond aux données : 25 % est la plus petite part listée."}],
      "La part de l'autobus est la plus grande, mais ce n'est pas une majorité. La conclusion qui va contre les données est que <b>la plupart des élèves voyagent en autobus</b>, parce que 40 % est moins que la moitié.",
      {mode:"false-bus"});
  },
  function(){
    return mcq("La pluie à une station météo était de 30 mm en avril, 22 mm en mai et 18 mm en juin. Quelle conclusion va contre ces données ?",
      {t:"La pluie a augmenté régulièrement pendant le printemps", fb:"Exact : les valeurs baissent de 30 à 22 à 18, donc la pluie a diminué, pas augmenté."},
      [{t:"Avril a été le plus humide des trois mois du printemps", fb:"Cela correspond aux données : 30 mm en avril est la plus grande valeur."},
       {t:"La pluie de juin était de 12 mm de moins que celle d'avril au printemps", fb:"Cela correspond aux données : 30 moins 18 font 12."},
       {t:"La pluie totale sur les trois mois était de 70 mm", fb:"Cela correspond aux données : 30 plus 22 plus 18 font 70."}],
      "Les quantités baissent mois après mois. La conclusion qui va contre les données est que <b>la pluie a augmenté régulièrement</b>.",
      {mode:"false-rain"});
  },
  function(){
    return mcq("Un diagramme à bandes doubles montre les membres des clubs : les échecs comptent 18 élèves de 7e année et 12 de 8e année ; la robotique compte 10 élèves de 7e année et 16 de 8e année. Quelle conclusion va contre ces données ?",
      {t:"La 8e année compte plus de membres que la 7e année dans les deux clubs", fb:"Exact : aux échecs, la 8e année compte 12 élèves, ce qui est moins que la 7e année avec 18, donc l'affirmation échoue pour les échecs."},
      [{t:"Les échecs comptent plus de membres de 7e année que la robotique cette année", fb:"Cela correspond aux données : 18 est plus grand que 10."},
       {t:"La robotique compte plus de membres de 8e année que les échecs cette année", fb:"Cela correspond aux données : 16 est plus grand que 12."},
       {t:"Les deux clubs comptent 56 membres en tout à l'école cette année", fb:"Cela correspond aux données : 18 plus 12 plus 10 plus 16 font 56."}],
      "Une affirmation sur les deux clubs doit tenir dans chaque club. Les échecs la brisent, donc la conclusion qui va contre les données est que <b>la 8e année compte plus de membres dans les deux clubs</b>.",
      {mode:"false-clubs"});
  },
  function(){
    return mcq("Quatre élèves rapportent leur temps de pratique et leur résultat de quiz : Ana a pratiqué 3 heures et obtenu 70, Ben a pratiqué 1 heure et obtenu 78, Cora a pratiqué 2 heures et obtenu 74, Dan a pratiqué 4 heures et obtenu 82. Quelle conclusion va contre ces données ?",
      {t:"Plus de pratique donne toujours un résultat plus élevé", fb:"Exact : Ben a pratiqué le moins et a quand même dépassé Ana et Cora, donc plus de pratique ne voulait pas toujours dire un résultat plus élevé ici."},
      [{t:"Dan a pratiqué le plus et a obtenu le résultat le plus élevé", fb:"Cela correspond aux données : 4 heures et 82 sont les deux plus grandes valeurs."},
       {t:"Ben a battu Ana même s'il a pratiqué moins", fb:"Cela correspond directement aux données : 78 bat 70 avec 1 heure contre 3 heures."},
       {t:"Les quatre résultats de quiz des élèves vont de 70 à 82 points", fb:"Cela correspond aux données : le résultat le plus bas est 70 et le plus élevé est 82."}],
      "Un seul contre-exemple brise une affirmation avec « toujours ». Ben a pratiqué le moins et a quand même battu deux camarades, donc la conclusion qui va contre les données est que <b>plus de pratique donne toujours un résultat plus élevé</b>.",
      {mode:"false-practice"});
  }
]), ["Teste chaque conclusion contre chaque nombre donné, pas seulement les premiers que tu remarques.", "Surveille les mots forts comme la plupart, toujours et chaque ; ils demandent plus de la moitié, ou chaque cas, pour tenir."]);

E("u7-fix-the-graph", 7, ["11.4"], 1, "var", varset([
  function(){
    return textq("Un diagramme à bandes des points d'équipes commence son axe vertical à 60, ce qui fait paraître une équipe loin devant les autres. Quel seul changement rendrait le diagramme fidèle aux données ? Réponds par une courte phrase.",
      ["commencer l'axe à zéro", "commencer l'axe vertical à zéro", "commencer l'axe à 0", "débuter l'axe à zéro", "commencer à zéro", "faire commencer l'axe à zéro", "partir de zéro", "commencer l'échelle à zéro", "commencer l'axe a zero", "commencer l'axe à zero"],
      "Les hauteurs des bandes ne correspondent aux valeurs que si elles sont mesurées à partir de zéro. La correction est de <b>commencer l'axe à zéro</b>.",
      {mode:"fix-axis"});
  },
  function(){
    return textq("Un diagramme à lignes brisées des ventes de billets utilise des pas d'axe de 0, 10, 15 et 40, donc un petit saut semble énorme. Quel seul changement rendrait le diagramme fidèle aux données ? Réponds par une courte phrase.",
      ["utiliser des intervalles égaux", "utiliser des intervalles réguliers", "utiliser des intervalles constants", "rendre les intervalles égaux", "utiliser la même taille d'intervalle", "intervalles égaux", "utiliser des pas égaux", "rendre l'échelle régulière", "utiliser une échelle constante", "espacer les intervalles également"],
      "Chaque pas sur un axe doit représenter la même quantité. La correction est d'<b>utiliser des intervalles égaux</b>.",
      {mode:"fix-intervals"});
  },
  function(){
    return textq("Un diagramme circulaire 3D fait paraître la tranche de devant d'un budget plus grande qu'une tranche égale à l'arrière. Quel seul changement rendrait le diagramme fidèle aux données ? Réponds par une courte phrase.",
      ["utiliser un diagramme plat", "utiliser un diagramme circulaire plat", "utiliser un diagramme 2d", "utiliser un diagramme en deux dimensions", "enlever l'effet 3d", "retirer l'effet 3d", "le dessiner à plat", "utiliser la 2d", "le rendre plat", "utiliser un diagramme plat (2d)"],
      "La profondeur ajoute de l'aire qui n'appartient à aucune part. La correction est d'<b>utiliser un diagramme circulaire plat (2D)</b>.",
      {mode:"fix-3d"});
  },
  function(){
    return textq("Un diagramme de ventes montre seulement les trois mois de fêtes, quand les ventes ont bondi, et cache le reste de l'année. Quel seul changement rendrait le diagramme fidèle aux données ? Réponds par une courte phrase.",
      ["montrer toutes les données", "montrer tous les mois", "inclure tous les mois", "montrer l'année entière", "montrer l'année complète", "utiliser l'ensemble complet des données", "montrer l'ensemble des données", "inclure toutes les données", "montrer les données complètes", "montrer chaque mois"],
      "Une tranche choisie de l'année ne raconte que la partie qui bondit de l'histoire. La correction est de <b>montrer toutes les données (l'année entière)</b>.",
      {mode:"fix-range"});
  }
]), ["Pense à la seule réparation qui enlève la distorsion que tu vois dans la description.", "Énonce la réparation comme une courte phrase d'action, par exemple ce que l'axe ou l'étendue des données devrait devenir."]);

E("u7-context-for-probability", 7, ["12.2"], 2, "var", varset([
  function(){
    return mcq("Quel contexte donne une probabilité de \\(\\frac{1}{12}\\) ?",
      {t:"Lancer une pièce et lancer un dé ; obtenir face et un 6", fb:"Exact : \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), donc ce contexte correspond à la valeur."},
      [{t:"Lancer deux dés ; obtenir un 6 aux deux dés", fb:"Cela donne \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), pas la valeur énoncée."},
       {t:"Lancer deux pièces ; obtenir face aux deux pièces", fb:"Cela donne \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), pas la valeur énoncée."},
       {t:"Faire tourner une roulette à 4 sections et lancer une pièce ; tomber sur le rouge, 1 des 4 sections, et face", fb:"Cela donne \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), pas la valeur énoncée."}],
      "Multiplie dans chaque contexte et compare. Seuls face et un 6 donnent \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), donc le contexte qui correspond est <b>lancer une pièce et lancer un dé, obtenir face et un 6</b>.",
      {mode:"context-12th"});
  },
  function(){
    return mcq("Quel contexte donne une probabilité de \\(\\frac{1}{4}\\) ?",
      {t:"Lancer deux pièces ; obtenir pile aux deux pièces", fb:"Exact : \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), donc ce contexte correspond à la valeur."},
      [{t:"Faire tourner une roulette à 8 sections et lancer une pièce ; tomber sur le bleu, 2 des 8 sections, et face", fb:"Cela donne \\(\\frac{2}{8} \\times \\frac{1}{2} = \\frac{1}{8}\\), pas la valeur énoncée."},
       {t:"Lancer un dé et lancer une pièce ; obtenir un nombre plus petit que 5 et face", fb:"Cela donne \\(\\frac{4}{6} \\times \\frac{1}{2} = \\frac{1}{3}\\), pas la valeur énoncée."},
       {t:"Piger une carte parmi 4 cartes de lettres égales deux fois avec remise ; obtenir la lettre A les deux fois", fb:"Cela donne \\(\\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}\\), pas la valeur énoncée."}],
      "Multiplie dans chaque contexte et compare. Seul pile aux deux pièces donne \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), donc le contexte qui correspond est <b>lancer deux pièces et obtenir pile aux deux pièces</b>.",
      {mode:"context-quarter"});
  },
  function(){
    return mcq("Quel contexte donne une probabilité de \\(\\frac{3}{20}\\) ?",
      {t:"Faire tourner une roulette à 10 sections et lancer une pièce ; tomber sur le rouge, 3 des 10 sections, et face", fb:"Exact : \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), donc ce contexte correspond à la valeur."},
      [{t:"Faire tourner une roulette à 5 sections et lancer une pièce ; tomber sur le rouge, 3 des 5 sections, et face", fb:"Cela donne \\(\\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}\\), pas la valeur énoncée."},
       {t:"Faire tourner une roulette à 10 sections et lancer un dé ; tomber sur le rouge, 3 des 10 sections, et obtenir un 6", fb:"Cela donne \\(\\frac{3}{10} \\times \\frac{1}{6} = \\frac{1}{20}\\), pas la valeur énoncée."},
       {t:"Lancer deux pièces ; obtenir face aux deux pièces", fb:"Cela donne \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), pas la valeur énoncée."}],
      "Multiplie dans chaque contexte et compare. Seuls le rouge sur la roulette à 10 sections avec face donnent \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), donc c'est le contexte qui correspond.",
      {mode:"context-320"});
  },
  function(){
    return mcq("Quel contexte donne une probabilité de \\(\\frac{1}{9}\\) ?",
      {t:"Faire tourner une roulette à 3 sections deux fois ; tomber sur la section étoile les deux fois", fb:"Exact : \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), donc ce contexte correspond à la valeur."},
      [{t:"Faire tourner une roulette à 3 sections et lancer une pièce ; tomber sur la section étoile et face", fb:"Cela donne \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), pas la valeur énoncée."},
       {t:"Faire tourner une roulette à 6 sections deux fois ; tomber sur le rouge, 1 des 6 sections, les deux fois", fb:"Cela donne \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), pas la valeur énoncée."},
       {t:"Lancer deux pièces ; obtenir face aux deux pièces", fb:"Cela donne \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), pas la valeur énoncée."}],
      "Multiplie dans chaque contexte et compare. Seule la section étoile deux fois donne \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), donc c'est le contexte qui correspond.",
      {mode:"context-ninth"});
  },
  function(){
    return mcq("Quel contexte donne une probabilité de \\(\\frac{1}{6}\\) ?",
      {t:"Faire tourner une roulette à 3 sections et lancer une pièce ; tomber sur le bleu, 1 des 3 sections, et pile", fb:"Exact : \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), donc ce contexte correspond à la valeur."},
      [{t:"Lancer deux pièces ; obtenir face aux deux pièces", fb:"Cela donne \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), pas la valeur énoncée."},
       {t:"Faire tourner une roulette à 4 sections et lancer une pièce ; tomber sur le bleu, 1 des 4 sections, et pile", fb:"Cela donne \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), pas la valeur énoncée."},
       {t:"Lancer un dé et faire tourner une roulette à 4 sections ; obtenir un 6 et tomber sur le bleu, 1 des 4 sections", fb:"Cela donne \\(\\frac{1}{6} \\times \\frac{1}{4} = \\frac{1}{24}\\), pas la valeur énoncée."}],
      "Multiplie dans chaque contexte et compare. Seuls le bleu sur la roulette à 3 sections avec pile donnent \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), donc c'est le contexte qui correspond.",
      {mode:"context-sixth"});
  }
]), ["Calcule la probabilité dans chaque contexte ; un seul contexte correspondra à la valeur énoncée.", "Pour deux événements indépendants, multiplie les deux probabilités simples avant de comparer."]);

E("u7-two-draws-percent", 7, ["12.1"], 1, "gen", function () {
  var triples = [["rouge", "bleue", "verte"], ["rouge", "jaune", "bleue"], ["blanche", "noire", "orange"], ["violette", "verte", "jaune"], ["bleue", "orange", "rose"]];
  var pair = null;
  for (var t = 0; t < 60 && !pair; t++) {
    var ca = ri(2, 5), cb = ri(2, 5);
    if (ca + cb <= 9) pair = [ca, cb];
  }
  if (!pair) pair = [3, 3];
  var cols = pick(triples).slice();
  var item = pick(["billes", "jetons", "perles", "tuiles"]);
  var ans = pair[0] * pair[1];
  var third = 10 - pair[0] - pair[1];
  var prompt = "Un sac contient " + pair[0] + " " + item + " de couleur " + cols[0] + ", " + pair[1] + " de couleur " + cols[1] + " et " + third + " de couleur " + cols[2] + ". On en pige un, on le remet, puis on en pige un autre. Quelle est la probabilité de piger la couleur " + cols[0] + " d'abord, puis la couleur " + cols[1] + " ? Donne ta réponse en pourcentage.";
  var sol = "Multiplie pour des événements indépendants, puis vérifie en comptant les résultats : \\[ \\begin{aligned} P &= " + FR(pair[0], 10) + " \\times " + FR(pair[1], 10) + " \\\\ &= " + FR(ans, 100) + " \\\\ &= " + ans + " \\% \\end{aligned} \\] Vérification par comptage : il y a \\(10 \\times 10 = 100\\) paires ordonnées également probables, et \\(" + pair[0] + " \\times " + pair[1] + " = " + ans + "\\) d'entre elles correspondent, ce qui concorde. Donc la probabilité est <b>" + ans + " %</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "two-draws", a: pair[0], b: pair[1] });
}, ["La remise garde le sac pareil pour le deuxième tirage, donc les deux tirages sont indépendants.", "Écris chaque tirage comme une fraction sur 10, multiplie, puis convertis en pourcentage."]);

E("u7-two-spinners-decimal", 7, ["12.4"], 1, "gen", function () {
  var S1 = pick([4, 5, 10, 20]), S2 = pick([4, 5, 10, 20]);
  var F1 = ri(1, S1 - 1), F2 = ri(1, S2 - 1);
  var c1 = pick(["rouge", "bleue", "verte", "dorée"]), c2 = pick(["violette", "orange", "blanche", "noire"]);
  if (c2 === c1) c2 = "violette";
  var num = F1 * F2, den = S1 * S2, ans = num / den;
  var prompt = "À un jeu de foire scolaire, une roulette compte " + S1 + " sections égales dont " + F1 + " portent la couleur " + c1 + ", et une deuxième roulette compte " + S2 + " sections égales dont " + F2 + " portent la couleur " + c2 + ". On fait tourner les deux roulettes. Quelle est la probabilité de tomber sur la couleur " + c1 + " à la première roulette et sur la couleur " + c2 + " à la deuxième ? Donne ta réponse sous forme décimale.";
  var sol = "Les tours sont indépendants, donc multiplie : \\[ \\begin{aligned} P &= " + FR(F1, S1) + " \\times " + FR(F2, S2) + " \\\\ &= " + FR(num, den) + " \\\\ &= " + fmtD(ans, 4) + " \\end{aligned} \\] Donc la probabilité est <b>" + fmtD(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.0001, sol, { mode: "two-spinners", S1: S1, F1: F1, S2: S2, F2: F2 });
}, ["Deux tours ne s'influencent pas, donc c'est un produit de deux probabilités simples.", "Écris d'abord la probabilité pour chaque roulette, puis multiplie et convertis en nombre décimal."]);

E("u7-apply-rule-percent", 7, ["12.3"], 1, "gen", function () {
  var S = pick([4, 5, 8, 10]);
  var F = ri(1, S - 1);
  var colour = pick(["rouge", "bleue", "verte", "dorée", "violette", "orange"]);
  var side = pick(["face", "pile"]);
  var ans = F / S * 50;
  var prompt = "On lance une pièce et on fait tourner une roulette de " + S + " sections égales, dont " + F + " portent la couleur " + colour + ". En utilisant la règle pour les événements indépendants, quelle est la probabilité d'obtenir " + side + " et de tomber sur la couleur " + colour + " ? Donne ta réponse en pourcentage.";
  var r = u7red(F, S * 2);
  var sol = "Applique la règle de multiplication pour les événements indépendants : \\[ \\begin{aligned} P &= " + FR(1, 2) + " \\times " + FR(F, S) + " \\\\ &= " + FR(r[0], r[1]) + " \\\\ &= " + fmtD(ans) + " \\% \\end{aligned} \\] Donc la probabilité est <b>" + fmtD(ans) + " %</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "apply-rule", S: S, F: F });
}, ["La règle pour les événements indépendants dit de multiplier les probabilités séparées.", "La pièce donne une probabilité de un demi ; multiplie-la par la fraction de la roulette et convertis en pourcentage."]);

E("u7-same-colour-twice", 7, ["12.4", "12.1"], 3, "gen", function () {
  var triples = [["rouge", "bleue", "verte"], ["rouge", "jaune", "bleue"], ["blanche", "noire", "orange"], ["violette", "verte", "jaune"], ["bleue", "orange", "rose"]];
  var counts = null;
  for (var t = 0; t < 80 && !counts; t++) {
    var a = ri(1, 8), b = ri(1, 9 - a);
    var c = 10 - a - b;
    if (c >= 1) counts = [a, b, c];
  }
  if (!counts) counts = [4, 3, 3];
  var cols = pick(triples).slice();
  var item = pick(["billes", "jetons", "perles"]);
  var ans = counts[0] * counts[0] + counts[1] * counts[1] + counts[2] * counts[2];
  var prompt = "Un sac contient " + counts[0] + " " + item + " de couleur " + cols[0] + ", " + counts[1] + " de couleur " + cols[1] + " et " + counts[2] + " de couleur " + cols[2] + ". On en pige un, on le remet, puis on en pige un autre. Quelle est la probabilité que les deux tirages donnent la même couleur ? Donne ta réponse en pourcentage.";
  var sol = "La même couleur peut arriver de trois façons, et les tirages sont indépendants : \\[ \\begin{aligned} P &= " + FR(counts[0], 10) + " \\times " + FR(counts[0], 10) + " + " + FR(counts[1], 10) + " \\times " + FR(counts[1], 10) + " + " + FR(counts[2], 10) + " \\times " + FR(counts[2], 10) + " \\\\ &= " + FR(counts[0] * counts[0], 100) + " + " + FR(counts[1] * counts[1], 100) + " + " + FR(counts[2] * counts[2], 100) + " \\\\ &= " + FR(ans, 100) + " = " + ans + " \\% \\end{aligned} \\] Vérification par comptage : sur les 100 paires ordonnées, \\(" + counts[0] * counts[0] + " + " + counts[1] * counts[1] + " + " + counts[2] * counts[2] + " = " + ans + "\\) correspondent en couleur. Donc la probabilité est <b>" + ans + " %</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "same-colour", counts: counts.join("-") });
}, ["La même couleur n'est pas un seul événement ; liste chaque couleur qui peut correspondre aux deux tirages.", "Pour chaque couleur, multiplie sa fraction par elle-même, puis additionne les trois résultats."]);

E("u7-apparent-height-ratio", 7, ["11.4"], 3, "gen", function () {
  var contexts = [
    { name: "les moyennes de quiz", labels: ["Classe A", "Classe B"], bases: [70, 80], scale: 1, cap: 100, unit: "points" },
    { name: "les passagers de traversier lors de deux samedis (en centaines)", labels: ["Samedi 1", "Samedi 2"], bases: [300, 400], scale: 20, cap: 700, unit: "passagers" },
    { name: "les paires de chaussures vendues lors de deux semaines", labels: ["Semaine 1", "Semaine 2"], bases: [40, 50], scale: 2, cap: 120, unit: "paires" },
    { name: "les longueurs nagées par deux équipes", labels: ["Équipe rouge", "Équipe bleue"], bases: [60, 80], scale: 2, cap: 160, unit: "longueurs" }
  ];
  var cfg = null;
  for (var t = 0; t < 80 && !cfg; t++) {
    var ctx = pick(contexts);
    var B = pick(ctx.bases);
    var a0 = pick([2, 4, 5, 10]);
    var r = pick([1.5, 2, 2.5, 3, 4]);
    var b0 = a0 * r;
    if (b0 !== Math.round(b0)) continue;
    var v1 = B + a0 * ctx.scale, v2 = B + b0 * ctx.scale;
    if (v2 > ctx.cap) continue;
    cfg = { ctx: ctx, B: B, a0: a0, r: r, v1: v1, v2: v2 };
  }
  if (!cfg) { var c0 = contexts[0]; cfg = { ctx: c0, B: 80, a0: 5, r: 3, v1: 85, v2: 95 }; }
  var top = cfg.v2 + 2 * cfg.ctx.scale;
  var prompt = "Une affiche montre dans un diagramme " + cfg.ctx.name + ". L'axe vertical commence à " + cfg.B + " au lieu de 0. Les valeurs sont " + cfg.v1 + " et " + cfg.v2 + " " + cfg.ctx.unit + ". En jugeant seulement par les hauteurs des bandes dans le diagramme, combien de fois la bande la plus haute semble-t-elle plus haute que la bande la plus courte ? Donne ta réponse sous forme décimale.";
  var sol = "Les hauteurs des bandes sont mesurées à partir du début de l'axe, pas à partir des valeurs elles-mêmes : \\[ \\begin{aligned} \\text{petite hauteur} &= " + cfg.v1 + " - " + cfg.B + " = " + (cfg.v1 - cfg.B) + " \\\\ \\text{grande hauteur} &= " + cfg.v2 + " - " + cfg.B + " = " + (cfg.v2 - cfg.B) + " \\\\ \\text{rapport apparent} &= " + FR(cfg.v2 - cfg.B, cfg.v1 - cfg.B) + " = " + fmtD(cfg.r) + " \\end{aligned} \\] Les valeurs réelles sont presque égales, mais la bande la plus haute semble <b>" + fmtD(cfg.r) + " fois</b> plus haute.";
  var q = numq(prompt, cfg.r, 0.01, sol, { mode: "apparent-ratio", B: cfg.B, v1: cfg.v1, v2: cfg.v2 });
  q.figure = u7bars(cfg.ctx.labels, [cfg.v1, cfg.v2], cfg.B, top);
  return q;
}, ["Ne compare pas les valeurs imprimées ; compare les hauteurs des bandes, qui commencent à la valeur de l'axe.", "Soustrais d'abord le début de l'axe de chaque valeur, puis divise la grande hauteur par la petite hauteur."]);

E("u7-deep-critique", 7, ["11.6", "11.5"], 3, "var", varset([
  function(){
    return mcq("Une publicité de kiosque de jus utilise un diagramme à bandes dont l'axe commence à 90. Les ventes étaient de 94 verres en janvier et 98 verres en février, et la publicité affirme que les ventes ont doublé en février. Quelle critique est entièrement exacte ?",
      {t:"L'axe qui commence à 90 exagère l'écart, et 98 est seulement un peu plus que 94, donc l'affirmation de doublement représente mal les données", fb:"Exact : le défaut de format et la fausse affirmation sont nommés, et chacun est vérifié contre les valeurs."},
      [{t:"L'axe qui commence à 90 est correct, et l'affirmation de doublement est juste parce que la bande de février semble deux fois plus haute dans le diagramme", fb:"L'apparence des bandes est justement le piège : des hauteurs mesurées à partir de 90 ne correspondent pas aux valeurs 94 et 98."},
       {t:"L'affirmation de doublement est fausse parce que les ventes ont baissé en février, et l'axe devrait commencer à 100 plutôt qu'à 0", fb:"Les ventes ont légèrement augmenté de 94 à 98, et un axe devrait commencer à 0, pas à 100."},
       {t:"Le seul problème est que les bandes ont des largeurs différentes, donc l'affirmation ne peut pas être jugée du tout avec ces valeurs", fb:"Aucun problème de largeur n'est décrit ; le début de l'axe et l'affirmation peuvent tous deux être jugés à partir des valeurs."}],
      "Une critique complète vérifie l'image et les mots : l'<b>axe tronqué</b> exagère, et <b>98 contre 94 est une petite hausse, pas un doublement</b>.",
      {mode:"deep-juice"});
  },
  function(){
    return mcq("Un titre dit que la plupart des élèves veulent un début d'école plus tôt. Son diagramme circulaire 3D montre 45 % pour plus tôt, 35 % pour la même heure et 20 % pour plus tard. Quelle critique est entièrement exacte ?",
      {t:"45 % est la plus grande part mais pas une majorité, et l'effet 3D peut faire paraître la tranche de devant plus grande que sa part", fb:"Exact : la plupart demande plus de 50 %, et la pente ajoute une deuxième distorsion par-dessus l'erreur du titre."},
      [{t:"Le titre est exact parce que 45 % est la plus grande part, et l'effet 3D ne change aucune taille dans le diagramme du sondage", fb:"Le plus grand n'est pas la même chose que la plupart, et une pente 3D change la grandeur apparente des tranches."},
       {t:"Le titre est faux parce que plus tard a l'appui le plus fort, et les diagrammes circulaires ne peuvent pas montrer de pourcentages dans un titre", fb:"Plus tôt a la plus grande part à 45 %, et les diagrammes circulaires montrent bien les pourcentages quand ils sont tracés à plat."},
       {t:"Le seul problème est l'ordre des tranches, puisque les pourcentages font 100 comme ils le doivent dans ce sondage des élèves", fb:"Les pourcentages font bien 100, mais l'affirmation du titre et la distorsion 3D sont les vrais problèmes."}],
      "Une critique complète vérifie l'affirmation et le format : <b>45 % n'est pas la plupart</b>, et l'<b>effet 3D</b> représente mal la taille des tranches.",
      {mode:"deep-headline"});
  },
  function(){
    return mcq("Une affiche affirme que le recyclage a augmenté pendant tout le trimestre. Son diagramme à lignes brisées montre seulement les semaines 5 à 8, quand les quantités ont augmenté. Le registre de la classe montre que les quantités ont baissé pendant les semaines 1 à 4. Quelle critique est entièrement exacte ?",
      {t:"Le diagramme choisit les semaines qui montent et cache les semaines qui baissent, donc l'affirmation pour tout le trimestre va contre les données complètes", fb:"Exact : l'étendue choisie appuie l'affirmation seulement en laissant de côté les semaines qui la contredisent."},
      [{t:"L'affirmation est exacte parce que le diagramme à lignes brisées monte, et les semaines 1 à 4 sont trop tôt pour compter dans le trimestre", fb:"Les semaines 1 à 4 font partie du trimestre, et leur baisse contredit l'affirmation pour tout le trimestre."},
       {t:"Le seul problème est la couleur de la ligne, puisque les semaines choisies sont tracées avec précision dans le diagramme des semaines choisies", fb:"Les semaines choisies peuvent être précises, mais omettre les semaines qui baissent est la mauvaise représentation."},
       {t:"L'affirmation échoue parce que les quantités des semaines 5 à 8 ont en fait baissé, et un diagramme à bandes était exigé pour ce travail de critique des données", fb:"Les quantités ont augmenté aux semaines 5 à 8 comme énoncé ; aucun type de diagramme n'est exigé, les semaines manquantes sont le problème."}],
      "Une critique complète vérifie l'affirmation contre toutes les données : <b>montrer seulement les semaines 5 à 8</b> cache la baisse des semaines 1 à 4, donc l'<b>affirmation pour tout le trimestre est incohérente</b> avec le registre.",
      {mode:"deep-recycling"});
  },
  function(){
    return mcq("Une affiche sur les animaux utilise un pictogramme où les symboles de chats sont dessinés beaucoup plus grands que les symboles d'oiseaux, un symbole valant 10 animaux dans chaque rangée. Les nombres sont 40 chats et 30 oiseaux, et l'affiche affirme que les chats sont deux fois plus populaires que les oiseaux. Quelle critique est entièrement exacte ?",
      {t:"Les symboles de chats plus grands exagèrent la différence, et 40 contre 30 n'est pas le double, donc l'affirmation représente mal les données", fb:"Exact : la taille des symboles déforme l'image, et les nombres eux-mêmes réfutent l'affirmation de doublement."},
      [{t:"L'affirmation est juste parce que les symboles de chats semblent environ deux fois la taille des symboles d'oiseaux dans l'affiche", fb:"La taille des symboles est la distorsion, pas une preuve ; la popularité doit être jugée à partir des nombres 40 et 30."},
       {t:"L'affirmation est fausse parce que les oiseaux sont en fait plus populaires, et tous les pictogrammes sont trompeurs dans tous les cas montrés", fb:"Les chats mènent 40 contre 30, donc les oiseaux ne sont pas devant, et un pictogramme avec des symboles égaux est juste."},
       {t:"Le seul problème est qu'un symbole vaut 10 animaux, ce qui rend les petits nombres difficiles à montrer dans ce pictogramme", fb:"Les parties de symboles sont une faiblesse mineure ici ; les tailles inégales des symboles et la fausse affirmation sont les vrais problèmes."}],
      "Une critique complète vérifie l'image et les mots : les <b>tailles inégales des symboles</b> exagèrent, et <b>40 n'est pas le double de 30</b>.",
      {mode:"deep-pets"});
  }
]), ["Une critique complète vérifie deux choses : comment le diagramme est construit, et si les mots correspondent aux nombres.", "Teste d'abord l'affirmation avec les valeurs réelles, puis nomme l'élément de format qui pousse les lecteurs dans la même mauvaise direction."]);

/* ----- bank-u8.js ----- */
// Math 8 (French) Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 3775 to 4488).
// CRMARKS: u8-around-point-num=3
// CRMARKS: u8-build-max-num=3
// CRMARKS: u8-cubes-total-num=3
// CRMARKS: u8-front-squares-num=3
// CRMARKS: u8-irregular-angle-num=2
// CRMARKS: u8-mixed-point-num=2
// CRMARKS: u8-rotate-front-num=2
/*
 * TRANSLATOR NOTES
 * Chunk: Unit 8 (Geometry), Math 8 FR. Entries translated: 19 (all stems,
 * options, per-answer feedback, worked solutions, hint1 and hint2).
 * Term choices: tessellation = dallage; views = vue de dessus, vue de
 * face, vue de côté (figure labels DESSUS, FACE, CÔTÉ DROIT); height map
 * = carte des hauteurs (glossary silent, working choice); grid cell =
 * case, to keep it distinct from carré (the shape); stack = pile; glide
 * reflection = réflexion glissée. "symétrie axiale" is the grade 8
 * working choice per the glossary (no symmetry entries occur here).
 * Height-map side labels: BACK = ARRIÈRE, FRONT = AVANT, L = G (gauche),
 * R = D (droite); display labels only, no logic uses them. Row names in
 * u8HMStr: rangée arrière, rangée du milieu, rangée avant. In
 * u8-around-point-num the pair names became French (hexagone, carré) and
 * the check pair[0] === "hexagone" was updated to match; the mathematics
 * is unchanged. One plural-agreement ternary was added in mode 2 of the
 * same entry, where the English simply appended "s".
 * FMT-GEOM lines left as fmt( (each carries the marker): u8T x/y
 * attributes; u8Rect x/y/width/height; u8Sil baseline line; u8RegPoly
 * polygon points; the tile polygon/circle return lines in
 * u8-tess-transform and u8-combo-transform. Every other fmt( became
 * fmtD(, including u8ProfStr and the height numbers drawn by u8HM
 * (visible labels). No fmtF( and no .toFixed in this chunk, so no
 * fmtDF( conversions.
 * Literal numbers in static prose: degree values keep the source form
 * (120° in labels, degrés in prose, following the Math 9 FR pattern);
 * no decimal commas, thousands groupings, percents or dollars occur in
 * static prose. All generated numbers route through fmtD(.
 * Unsure: carte des hauteurs for height map has no guide evidence yet;
 * flagged for the reconciliation pass.
 */
/* Unit 8: Geometry */
// Unit 8: Geometry (Math 8, NL). Entries only; helpers prefixed u8.
// Block objects are shown as height maps: a labelled grid where each number
// tells how many cubes are stacked on that square. Back row is at the top of
// the grid, front row at the bottom, matching looking down at the object.
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>'; /* FMT-GEOM */
}
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u8Rect(x, y, w, h, fill) {
  return '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + fmt(w, 1) + '" height="' + fmt(h, 1) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>'; /* FMT-GEOM */
}
// Height-map grid drawn with its top-left corner at (x0, y0). hm rows run back to front.
function u8HM(hm, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < hm.length; r++) for (c = 0; c < hm[r].length; c++) {
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, hm[r][c] > 0 ? FIG_SHADE : "#ffffff");
    s += u8T(x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 1, fmtD(hm[r][c]), 13, true);
  }
  var w = hm[0].length * cell, h = hm.length * cell;
  s += u8T(x0 + w / 2, y0 - 11, "ARRIÈRE", 10, true);
  s += u8T(x0 + w / 2, y0 + h + 12, "AVANT", 10, true);
  s += u8T(x0 - 13, y0 + h / 2, "G", 10, true);
  s += u8T(x0 + w + 13, y0 + h / 2, "D", 10, true);
  return s;
}
function u8HMSize(hm, cell) { return [hm[0].length * cell + 30, hm.length * cell + 28]; }
// Occupancy grid (for top views): occ rows back to front, 1 = a stack is there.
function u8Occ(occ, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < occ.length; r++) for (c = 0; c < occ[r].length; c++)
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, occ[r][c] ? FIG_INK : "#ffffff");
  return s;
}
// Silhouette of a view: prof[c] = stack height in column c, drawn from a baseline.
function u8Sil(prof, x0, yBase, cell) {
  var s = "", c, k;
  for (c = 0; c < prof.length; c++) for (k = 0; k < prof[c]; k++)
    s += u8Rect(x0 + c * cell, yBase - (k + 1) * cell, cell, cell, FIG_SHADE);
  s += '<line x1="' + fmt(x0 - 3, 1) + '" y1="' + fmt(yBase, 1) + '" x2="' + fmt(x0 + prof.length * cell + 3, 1) + '" y2="' + fmt(yBase, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>'; /* FMT-GEOM */
  return s;
}
function u8FrontProf(hm) {
  var out = [], c, r;
  for (c = 0; c < hm[0].length; c++) { var m = 0; for (r = 0; r < hm.length; r++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}
function u8SideProf(hm) { // right side view, left to right in the drawing = front row to back row
  var out = [], r, c;
  for (r = hm.length - 1; r >= 0; r--) { var m = 0; for (c = 0; c < hm[r].length; c++) m = Math.max(m, hm[r][c]); out.push(m); }
  return out;
}
function u8OccOf(hm) { return hm.map(function (row) { return row.map(function (v) { return v > 0 ? 1 : 0; }); }); }
function u8Sum(hm) { var s = 0; hm.forEach(function (row) { row.forEach(function (v) { s += v; }); }); return s; }
function u8SumArr(a) { var s = 0; a.forEach(function (v) { s += v; }); return s; }
function u8Key(a) { return JSON.stringify(a); }
function u8RandHM(rows, cols, maxH, minTot, maxTot) {
  for (var att = 0; att < 300; att++) {
    var hm = [], r, c, tot = 0, nz = 0;
    for (r = 0; r < rows; r++) { var row = []; for (c = 0; c < cols; c++) { var v = ri(0, maxH); row.push(v); tot += v; if (v > 0) nz++; } hm.push(row); }
    if (tot < minTot || tot > maxTot || nz < 3) continue;
    var heights = {}; hm.forEach(function (rw) { rw.forEach(function (v) { heights[v] = 1; }); });
    if (Object.keys(heights).length < 3) continue;
    return hm;
  }
  return [[2, 0, 1], [1, 3, 1]];
}
function u8RotHM(hm, turns) { // turns of 90 degrees clockwise, seen from above (back stays at top)
  var cur = hm, t, r, c;
  for (t = 0; t < turns; t++) {
    var nr = cur[0].length, nc = cur.length, nxt = [];
    for (r = 0; r < nr; r++) { var row = []; for (c = 0; c < nc; c++) row.push(cur[nc - 1 - c][r]); nxt.push(row); }
    cur = nxt;
  }
  return cur;
}
function u8ProfStr(p) { return p.map(function (v) { return fmtD(v); }).join(", "); }
function u8HMStr(hm) {
  var names = hm.length === 2 ? ["Rangée arrière", "Rangée avant"] : ["Rangée arrière", "Rangée du milieu", "Rangée avant"];
  return hm.map(function (row, i) { return names[i] + " (de gauche à droite) : " + u8ProfStr(row); }).join(". ") + ".";
}
function u8RegPoly(cx, cy, R, n, rotDeg) {
  var pts = [], i, a;
  for (i = 0; i < n; i++) { a = (rotDeg + i * 360 / n - 90) * Math.PI / 180; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>'; /* FMT-GEOM */
}
function u8Interior(n) { return (n - 2) * 180 / n; }
var U8_POLY_NAMES = { 3: "triangle équilatéral", 4: "carré", 5: "pentagone régulier", 6: "hexagone régulier", 8: "octogone régulier", 10: "décagone régulier", 12: "dodécagone régulier" };

// 1. 10.15 L1 gen MC with figure: pick the top view from four drawn candidates.
E("u8-top-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var occ = u8OccOf(hm);
    var trans = [[occ[0][0], occ[1][0]], [occ[0][1], occ[1][1]], [occ[0][2], occ[1][2]]];
    var mirror = occ.map(function (row) { return row.slice().reverse(); });
    var full = occ.map(function (row) { return row.map(function () { return 1; }); });
    var cands = [
      { g: occ, lab: "la vue de dessus", good: true },
      { g: trans, lab: "la vue de dessus tournée de côté", good: false, why: "Ce candidat tourne le plan de côté; il échange les sens arrière-avant et gauche-droite." },
      { g: mirror, lab: "la vue de dessus en miroir", good: false, why: "Ce candidat est l'image miroir; les côtés gauche et droit sont échangés." },
      { g: full, lab: "la vue de dessus entièrement remplie", good: false, why: "Ce candidat remplit chaque case, mais certaines cases de l'objet ne contiennent aucun cube." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.g); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 26, hmW = 3 * cell, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
    body += u8HM(hm, 160 - hmW / 2, 30, cell);
    var cc = 13, pos = [[52, 128], [196, 128], [52, 196], [196, 196]];
    cands.forEach(function (cd, i) {
      var w = cd.g[0].length * cc, h = cd.g.length * cc;
      body += u8Occ(cd.g, pos[i][0], pos[i][1], cc);
      body += u8T(pos[i][0] + w / 2, pos[i][1] + h + 12, "Vue " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 252, body, "Carte des hauteurs d'un objet en cubes et quatre vues de dessus candidates étiquetées A à D");
    var opts = cands.map(function (cd, i) {
      return { t: "Vue " + "ABCD"[i], fb: cd.good ? "Exact. Chaque case remplie correspond à une case qui contient au moins un cube, et la rangée arrière reste à l'arrière." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("Le haut du diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Lequel des candidats ci-dessous est la vue de dessus de l'objet ? La vue de dessus montre une case remplie pour chaque pile.",
      corr, rest,
      "En regardant directement vers le bas, la hauteur ne compte pas : une case est remplie exactement quand sa pile contient au moins un cube. En comparant les cases remplies, rangée arrière contre rangée arrière et de gauche à droite, on obtient <b>Vue " + "ABCD"[gi] + "</b>.",
      { mode: "top-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Quel candidat est la vue de dessus de l'objet ?",
    { t: "Vue A", fb: "Exact." },
    [{ t: "Vue B", fb: "Cela échange la gauche et la droite." }, { t: "Vue C", fb: "Cela remplit des cases qui ne contiennent aucun cube." }, { t: "Vue D", fb: "Cela tourne le plan de côté." }],
    "Une case est remplie exactement quand sa pile contient au moins un cube, donc la vue de dessus est <b>Vue A</b>.", { mode: "top-choice", hm: "fb", good: 0 });
}, ["La vue de dessus tient compte seulement des cases qui contiennent des cubes, pas de la hauteur de chaque pile.", "Commence par la rangée arrière et marque chaque case comme remplie ou vide."]);

// 2. 10.18 L1 var: views of objects in the environment.
E("u8-env-views-var", 8, ["10.18"], 1, "var", varset([
  function () {
    var q=mcq("Sofia dessine une boîte de céréales posée sur une table de cuisine. Directement du dessus, quelle forme dessine-t-elle pour la vue de dessus ?",
      { t: "Un rectangle, de la taille de la face supérieure de la boîte.", fb: "Exact. En regardant directement vers le bas, on voit la face supérieure dans sa vraie forme." },
      [{ t: "Un grand rectangle qui montre le devant de la boîte au complet.", fb: "C'est la vue de face; la vue de dessus montre seulement la face supérieure." }, { t: "Un carré de la taille du bout étroit de la boîte de céréales.", fb: "Cela ressemble à une vue de côté; la face supérieure est le long rectangle du dessus." }, { t: "Un cercle qui montre toute la boîte à la fois sur la table.", fb: "Une vue montre une seule direction; du dessus, on voit la face supérieure." }],
      "Une vue montre la face que tu regardes directement. Du dessus, c'est la face supérieure, donc la vue de dessus est <b>un rectangle, de la taille de la face supérieure de la boîte</b>.",
      { mode: "env-cereal" }); q.figure=m8BoxLabSVG("","","",false); return q;
  },
  function () {
    var q=mcq("Un phare est à peu près un grand cylindre qui devient un peu plus étroit vers le haut. Quelle description convient à sa vue de dessus ?",
      { t: "Un cercle.", fb: "Exact. En regardant directement vers le bas d'un cylindre, on voit un cercle." },
      [{ t: "Un rectangle.", fb: "Cela convient à la vue de face ou de côté de la tour, pas à la vue du dessus." }, { t: "Un triangle.", fb: "Un triangle conviendrait à un cône ou à une pyramide vu de côté, pas à cette tour vue du dessus." }, { t: "Un long ovale.", fb: "Une vue de l'objet montre l'objet seulement; du dessus, la tour est un cercle." }],
      "Directement du dessus, un cylindre montre sa face supérieure ronde. Donc la vue de dessus est <b>un cercle</b>.",
      { mode: "env-lighthouse" }); q.figure=m8CylLabSVG("","",false,false); return q;
  },
  function () {
    return mcq("Marcus dessine la vue de face d'un autobus scolaire stationné face à lui. Que doit montrer sa vue de face ?",
      { t: "Un large rectangle avec le pare-brise, les phares et les roues avant.", fb: "Exact. La vue de face montre la face de l'autobus qui pointe vers lui." },
      [{ t: "Un long rectangle avec une rangée de fenêtres latérales et deux roues.", fb: "C'est la vue de côté; la vue de face est le bout court de l'autobus." }, { t: "Un rectangle plat de la taille du toit de l'autobus au complet.", fb: "C'est la vue de dessus; la vue de face est debout." }, { t: "L'autobus coupé en deux pour montrer les sièges à l'intérieur.", fb: "Un dessin de vue montre la face extérieure, pas une coupe de l'objet." }],
      "La vue de face montre la face qui pointe vers l'observateur, donc elle montre <b>un large rectangle avec le pare-brise, les phares et les roues avant</b>.",
      { mode: "env-bus" });
  },
  function () {
    return mcq("Une tasse est sur une table, son anse pointant vers la droite. Quelle description convient à la vue du côté droit de la tasse ?",
      { t: "Le corps de la tasse avec l'anse qui dépasse de l'autre côté du dessin.", fb: "Exact. De la droite, tu regardes dans le sens de l'anse et tu vois le profil de l'anse." },
      [{ t: "Un cercle pour le dessus de la tasse, vu directement du haut de la table.", fb: "C'est la vue de dessus; une vue de côté est debout." }, { t: "Le corps de la tasse sans aucune anse visible d'aucun côté du dessin.", fb: "Cela convient à la vue du côté gauche; de la droite, l'anse est alignée avec ton regard et elle paraît." }, { t: "Une ligne plate de la largeur de la tasse, sans aucune hauteur visible.", fb: "Ce serait un bord seulement; la vue de côté montre toute la hauteur de la tasse." }],
      "Chaque vue montre l'objet d'une seule direction. Du côté droit, l'anse pointe vers toi, donc la vue est <b>le corps de la tasse avec l'anse qui dépasse de l'autre côté du dessin</b>.",
      { mode: "env-mug" });
  },
  function () {
    return mcq("Priya photographie un traversier directement de face, pendant qu'il arrive au quai. Dans sa photo, qu'arrive-t-il au long côté du traversier ?",
      { t: "Il pointe loin d'elle, donc la photo montre surtout le bout étroit de la proue.", fb: "Exact. Dans une vue de face, la longueur s'éloigne de l'observateur et ne s'étale pas dans l'image." },
      [{ t: "Il s'étale sur toute la photo et montre chaque fenêtre le long du côté.", fb: "Cela décrit une vue de côté du traversier, pas la vue de face." }, { t: "Il paraît comme un rectangle plat sur le dessus du traversier, d'un bout à l'autre du pont.", fb: "Cela décrit la vue de dessus; la photo est prise de face." }, { t: "Il double de longueur parce que le traversier bouge sur l'eau en arrivant au quai.", fb: "Une vue dépend de la direction, pas de la vitesse du traversier." }],
      "Dans une vue de face, le sens long de l'objet pointe loin de l'observateur. Donc la photo montre <b>surtout le bout étroit de la proue</b>.",
      { mode: "env-ferry" });
  }
]), ["Demande-toi quelle face de l'objet pointe directement vers l'observateur.", "Les vues de dessus sont à plat, les vues de face et de côté sont debout, et chaque vue montre une seule direction."]);

// 3. 10.4 L1 var: which regular polygon tessellates on its own.
E("u8-regular-tessellates-var", 8, ["10.4"], 1, "var", varset([
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Hexagone régulier, angle intérieur 120°.", fb: "Exact. 360 divisé par 120 donne 3, donc trois hexagones se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Octogone régulier, angle intérieur 135°.", fb: "360 divisé par 135 ne donne pas un nombre entier, donc les octogones seuls laissent des espaces." }, { t: "Dodécagone régulier, angle intérieur 150°.", fb: "360 divisé par 150 ne donne pas un nombre entier, donc les dodécagones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 120° &= 3 \\end{aligned} \\] Donc <b>l'hexagone régulier, angle intérieur 120°</b>, forme un dallage à lui seul.",
      { mode: "reg-hex" }); q.figure=m8PolyRowSVG([[6,"120\u00B0"],[5,"108\u00B0"],[8,"135\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Carré, angle intérieur 90°.", fb: "Exact. 360 divisé par 90 donne 4, donc quatre carrés se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Heptagone régulier, angle intérieur d'environ 129°.", fb: "360 divisé par environ 129 ne donne pas un nombre entier, donc les heptagones laissent des espaces." }, { t: "Octogone régulier, angle intérieur 135°.", fb: "360 divisé par 135 ne donne pas un nombre entier, donc les octogones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 90° &= 4 \\end{aligned} \\] Donc le <b>carré, angle intérieur 90°</b>, forme un dallage à lui seul.",
      { mode: "reg-square" }); q.figure=m8PolyRowSVG([[4,"90\u00B0"],[5,"108\u00B0"],[7,"\u2248129\u00B0"],[8,"135\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Quel polygone régulier forme un dallage à lui seul, en couvrant un plancher sans espaces et sans chevauchements ?",
      { t: "Triangle équilatéral, angle intérieur 60°.", fb: "Exact. 360 divisé par 60 donne 6, donc six triangles se rencontrent exactement à chaque point." },
      [{ t: "Pentagone régulier, angle intérieur 108°.", fb: "360 divisé par 108 ne donne pas un nombre entier, donc les pentagones laissent des espaces à chaque point." }, { t: "Décagone régulier, angle intérieur 144°.", fb: "360 divisé par 144 ne donne pas un nombre entier, donc les décagones laissent des espaces." }, { t: "Dodécagone régulier, angle intérieur 150°.", fb: "360 divisé par 150 ne donne pas un nombre entier, donc les dodécagones seuls laissent des espaces." }],
      "Les copies se rencontrent en un point, donc l'angle intérieur doit diviser 360 exactement : \\[ \\begin{aligned} 360° \\div 60° &= 6 \\end{aligned} \\] Donc le <b>triangle équilatéral, angle intérieur 60°</b>, forme un dallage à lui seul.",
      { mode: "reg-tri" }); q.figure=m8PolyRowSVG([[3,"60\u00B0"],[5,"108\u00B0"],[10,"144\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("On essaie trois polygones réguliers comme tuiles de patio : un pentagone régulier (108°), un hexagone régulier (120°) et un octogone régulier (135°). Lequel couvre le patio sans espaces ?",
      { t: "L'hexagone régulier seulement.", fb: "Exact. Seul 120 divise 360 exactement, ce qui donne 3 tuiles à chaque point." },
      [{ t: "Le pentagone régulier seulement.", fb: "108 ne divise pas 360, donc les pentagones ne peuvent pas se rencontrer exactement autour d'un point." }, { t: "L'octogone régulier seulement.", fb: "135 ne divise pas 360, donc les octogones seuls laissent des espaces en forme de carrés." }, { t: "Les trois couvrent le patio à eux seuls.", fb: "Un seul angle intérieur ici divise 360 exactement; vérifie chacun." }],
      "Teste chaque angle contre 360 : \\[ \\begin{aligned} 360° \\div 120° &= 3 \\\\ 360° \\div 108° &\\text{ n'est pas entier} \\\\ 360° \\div 135° &\\text{ n'est pas entier} \\end{aligned} \\] Donc <b>l'hexagone régulier seulement</b> couvre le patio.",
      { mode: "reg-patio" }); q.figure=m8PolyRowSVG([[5,"108\u00B0"],[6,"120\u00B0"],[8,"135\u00B0"]]); return q;
  }
]), ["À chaque point de rencontre, les angles doivent totaliser exactement 360 degrés.", "Divise 360 par l'angle intérieur; la forme forme un dallage à elle seule seulement quand la réponse est un nombre entier."]);

// 4. 10.6 L1 var: tessellations in the environment.
E("u8-env-tess-var", 8, ["10.6"], 1, "var", varset([
  function () {
    return mcq("Quelle description est un dallage que tu peux voir dans l'environnement ? Un dallage couvre une surface sans espaces et sans chevauchements.",
      { t: "Des cellules hexagonales dans un nid d'abeilles, ajustées bord à bord.", fb: "Exact. Les hexagones couvrent la surface complètement, sans espaces." },
      [{ t: "Des pierres rondes dispersées sur une plage, avec du sable visible entre elles.", fb: "Des espaces de sable paraissent entre les pierres, donc la surface n'est pas couverte complètement." }, { t: "Des bardeaux qui se chevauchent, cloués en rangées sur un toit.", fb: "Les bardeaux se chevauchent, et un dallage n'a aucun chevauchement." }, { t: "Un seul grand tableau accroché au mur d'une salle de classe de l'école.", fb: "Une seule image ne se répète pas pour couvrir une surface avec un motif de formes." }],
      "Un dallage répète des formes pour couvrir une surface complètement, sans espaces et sans chevauchements. Cela correspond à <b>des cellules hexagonales dans un nid d'abeilles, ajustées bord à bord</b>.",
      { mode: "env-honeycomb" });
  },
  function () {
    return mcq("Un plancher de corridor est couvert de tuiles carrées posées en rangées et en colonnes droites, et les lignes de coulis forment une grille. Comment décrirais-tu ce plancher ?",
      { t: "Un dallage de carrés fait en glissant la tuile de côté et vers le bas.", fb: "Exact. Les carrés couvrent le plancher complètement et se répètent par translation." },
      [{ t: "Un dallage de cercles fait en tournant une tuile ronde.", fb: "Les tuiles sont des carrés, et des cercles laisseraient des espaces entre eux." }, { t: "Pas un dallage, parce que les lignes de coulis du plancher brisent le motif.", fb: "Les lignes de coulis sont simplement les bords des tuiles; les carrés couvrent quand même le plancher sans espaces." }, { t: "Pas un dallage, parce que toutes les tuiles du plancher ont la même forme.", fb: "Un dallage peut utiliser une seule forme; utiliser une seule forme est le genre le plus simple." }],
      "Les carrés couvrent le plancher sans espaces ni chevauchements et se répètent par glissement, donc le plancher est <b>un dallage de carrés fait en glissant la tuile de côté et vers le bas</b>.",
      { mode: "env-floor" });
  },
  function () {
    return mcq("Les briques d'un mur sont posées en rangées, et chaque rangée est décalée d'une demi-brique. Pourquoi le motif de briques compte-t-il comme un dallage ?",
      { t: "Les rectangles couvrent le mur sans espaces et sans chevauchements, et le motif se répète.", fb: "Exact. Décaler une rangée donne quand même un recouvrement qui se répète, sans espaces." },
      [{ t: "Parce que les briques sont des matériaux de construction lourds et solides utilisés pour le mur.", fb: "Le poids des pièces n'a rien à voir avec le fait qu'un motif forme un dallage." }, { t: "Parce que chaque brique a une taille différente de ses voisines dans le mur de l'école.", fb: "Les briques ont la même taille; le motif fonctionne parce qu'elles s'ajustent sans espaces." }, { t: "Parce que le mur est à l'extérieur, du côté de la cour de l'école élémentaire.", fb: "Être à l'extérieur ne décide rien; c'est le recouvrement sans espaces ni chevauchements qui décide." }],
      "Un dallage exige un recouvrement qui se répète, sans espaces ni chevauchements. C'est pourquoi <b>les rectangles qui couvrent le mur sans espaces et sans chevauchements, dans un motif qui se répète</b>, comptent.",
      { mode: "env-brick" });
  },
  function () {
    return mcq("Quel motif trouvé autour d'une école est un dallage ?",
      { t: "Une mosaïque de petites tuiles carrées et triangulaires qui couvre complètement le dessus d'un banc.", fb: "Exact. Les tuiles s'ajustent bord à bord et couvrent tout le dessus du banc." },
      [{ t: "Des cailloux collés au hasard sur une planche de bois, avec la planche visible entre eux.", fb: "La planche visible entre les cailloux signifie des espaces, donc ce n'est pas un recouvrement complet." }, { t: "Des autocollants placés sur un casier de façon que certains couvrent des parties d'autres autocollants.", fb: "Des autocollants qui se couvrent sont des chevauchements, ce qu'un dallage n'a pas." }, { t: "Un tapis en damier dont plusieurs carrés ont été découpés un peu partout dans le motif du tapis.", fb: "Les carrés découpés sont des espaces dans le recouvrement, donc le tapis ne forme plus un dallage à cet endroit." }],
      "Cherche un recouvrement complet, sans espaces ni chevauchements : <b>une mosaïque de petites tuiles carrées et triangulaires qui couvre complètement le dessus d'un banc</b>.",
      { mode: "env-mosaic" });
  }
]), ["Vérifie les deux conditions : aucun espace, et aucun chevauchement.", "Nomme la forme qui fait le recouvrement et la façon dont elle se répète."]);

// 5. 10.15 L2 gen MC with figure: pick the front view from four drawn silhouettes.
E("u8-front-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var front = u8FrontProf(hm), side = u8SideProf(hm);
    var backV = front.slice().reverse();
    var tall = front.map(function (v) { return Math.min(3, v + 1); });
    if (u8Key(tall) === u8Key(front)) tall = front.map(function (v) { return Math.max(0, v - 1); });
    var cands = [
      { p: front, good: true },
      { p: side, good: false, why: "Ce candidat est la vue du côté droit; ses colonnes vont de l'avant à l'arrière, pas de gauche à droite." },
      { p: backV, good: false, why: "Ce candidat inverse la gauche et la droite; c'est ce que tu verrais de l'arrière." },
      { p: tall, good: false, why: "Ce candidat change la hauteur d'une colonne; chaque colonne de la vue de face doit correspondre à la pile la plus haute de cette colonne." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.p); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 24, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
    body += u8HM(hm, 160 - 36, 30, cell);
    var cc = 11, pos = [[40, 148], [185, 148], [40, 218], [185, 218]];
    cands.forEach(function (cd, i) {
      body += u8Sil(cd.p, pos[i][0], pos[i][1] + 30, cc);
      body += u8T(pos[i][0] + 16, pos[i][1] + 44, "Vue " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 268, body, "Carte des hauteurs d'un objet en cubes et quatre vues de face candidates étiquetées A à D");
    var opts = cands.map(function (cd, i) {
      return { t: "Vue " + "ABCD"[i], fb: cd.good ? "Exact. Chaque colonne correspond à la pile la plus haute de cette colonne de l'objet, lue de gauche à droite." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("Le haut du diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Lequel des candidats ci-dessous est la vue de face de l'objet ? Dans une vue de face, chaque colonne est aussi haute que la pile la plus haute de cette colonne.",
      corr, rest,
      "Lis l'objet colonne par colonne et prends le plus grand des nombres arrière et avant : les hauteurs des colonnes de face sont \\( " + u8ProfStr(front) + " \\). La silhouette correspondante est <b>Vue " + "ABCD"[gi] + "</b>.",
      { mode: "front-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Quel candidat est la vue de face de l'objet ?",
    { t: "Vue A", fb: "Exact." },
    [{ t: "Vue B", fb: "C'est une vue de côté." }, { t: "Vue C", fb: "Cela inverse la gauche et la droite." }, { t: "Vue D", fb: "Cela change la hauteur d'une colonne." }],
    "Chaque colonne de face correspond à la pile la plus haute de cette colonne, donc la vue de face est <b>Vue A</b>.", { mode: "front-choice", hm: "fb", good: 0 });
}, ["Pour chaque colonne, de gauche à droite, la hauteur dans la vue de face est la pile la plus haute de cette colonne.", "Écris d'abord les hauteurs des colonnes à partir de la carte des hauteurs, puis compare les silhouettes."]);

// 6. 10.9 L2 gen MC with figure: three views shown, pick the matching object description.
E("u8-match-object", 8, ["10.9"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm), tot = u8Sum(hm);
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    var spots = (hm[0].concat(hm[1]).filter(function (v) { return v === tv; }).length);
    if (spots !== 1) continue;
    var rowName = ti === 0 ? "rangée arrière" : "rangée avant";
    var colName = tj === 0 ? "à l'extrémité gauche" : (tj === 1 ? "au milieu" : "à l'extrémité droite");
    var altRow = ti === 0 ? "rangée avant" : "rangée arrière";
    var altCol = tj === 0 ? "à droite" : "à gauche";
    var cell = 15;
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ DROIT", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Vues d'un objet en cubes", 11, true);
    var fig = u8Svg(320, 112, body, "Vues de dessus, de face et du côté droit d'un objet en cubes");
    var corrT = "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout.";
    var q = mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle description correspond à l'objet d'où viennent les vues ?",
      { t: corrT, fb: "Exact. La colonne la plus haute des vues de face et de côté situe la pile la plus haute, et les vues ensemble fixent le total." },
      [
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + altRow + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout.", fb: "Cela place la pile la plus haute dans la mauvaise rangée; compare sa position dans la vue de côté, où les colonnes vont de l'avant à l'arrière." },
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + altCol + ", et l'objet compte " + fmtD(tot) + " cubes en tout.", fb: "Cela reflète l'objet de gauche à droite; compare sa position dans la vue de face." },
        { t: "La pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot + tv) + " cubes en tout.", fb: "La position est bonne, mais le total compte la pile la plus haute deux fois; additionne chaque pile une seule fois." }
      ],
      "La vue de face place la pile la plus haute " + colName + ", la vue de côté la place dans la " + rowName + ", et en combinant les vues on obtient " + fmtD(tot) + " cubes en tout. Donc la description correspondante est : <b>la pile la plus haute compte " + fmtD(tv) + " cubes, dans la " + rowName + " " + colName + ", et l'objet compte " + fmtD(tot) + " cubes en tout</b>.",
      { mode: "match-object", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle description correspond à l'objet d'où viennent les vues ?",
    { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité gauche, et l'objet compte 8 cubes en tout.", fb: "Exact." },
    [{ t: "La pile la plus haute compte 3 cubes, dans la rangée avant à l'extrémité gauche, et l'objet compte 8 cubes en tout.", fb: "Cela place la pile la plus haute dans la mauvaise rangée." }, { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité droite, et l'objet compte 8 cubes en tout.", fb: "Cela reflète l'objet." }, { t: "La pile la plus haute compte 3 cubes, dans la rangée arrière à l'extrémité gauche, et l'objet compte 11 cubes en tout.", fb: "Cela compte la pile la plus haute deux fois." }],
    "En combinant les vues, on obtient <b>la pile la plus haute de 3 cubes dans la rangée arrière à l'extrémité gauche, avec 8 cubes en tout</b>.", { mode: "match-object", hm: "fb" });
}, ["Utilise la vue de face pour placer les éléments de gauche à droite, et la vue de côté pour les placer de l'avant à l'arrière.", "Trouve d'abord la pile la plus haute : c'est la colonne la plus haute dans la vue de face et dans la vue de côté."]);

// 7. 10.10 L2 gen MC: predict the front view after a rotation on the plan.
E("u8-rotate-predict", 8, ["10.10"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var turns = pick([1, 2, 3]);
    var rot = u8RotHM(hm, turns);
    var newFront = u8FrontProf(rot), oldFront = u8FrontProf(hm), newSide = u8SideProf(rot);
    var mirrorFront = newFront.slice().reverse();
    var optsT = [u8ProfStr(newFront), u8ProfStr(oldFront), u8ProfStr(newSide), u8ProfStr(mirrorFront)];
    if (new Set(optsT).size < 4) continue;
    // where does the tallest stack go?
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < hm.length; r++) for (c = 0; c < hm[0].length; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    if (hm.flat().filter(function (v) { return v === tv; }).length !== 1) continue;
    var dirWord = turns === 1 ? "90° dans le sens horaire" : (turns === 2 ? "180°" : "90° dans le sens antihoraire");
    var cell = 24, body = u8T(160, 14, "Objet avant le tour (nombres = cubes)", 11, true);
    body += u8HM(hm, 124, 30, cell);
    var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes avant une rotation");
    var q = mcq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs. L'objet entier est tourné de " + dirWord + " sur la table, vu de dessus. Après le tour, quelles sont les hauteurs des colonnes de la vue de face, lues de gauche à droite ? Chaque hauteur est la pile la plus haute de cette colonne.",
      { t: u8ProfStr(newFront), fb: "Exact. En tournant le plan puis en prenant la pile la plus haute de chaque nouvelle colonne, on obtient ces hauteurs." },
      [
        { t: u8ProfStr(oldFront), fb: "Ce sont les hauteurs de face avant le tour; le tour déplace les piles vers de nouvelles colonnes." },
        { t: u8ProfStr(newSide), fb: "Cela lit un sens de côté de l'objet tourné plutôt que sa face." },
        { t: u8ProfStr(mirrorFront), fb: "Cela inverse la vue de face tournée de gauche à droite; vérifie vers quel bout les grandes piles se déplacent." }
      ],
      "Tourne d'abord la carte des hauteurs de " + dirWord + ", puis prends la pile la plus haute de chaque colonne de la carte tournée. Les hauteurs des colonnes de face tournées sont <b>" + u8ProfStr(newFront) + "</b>.",
      { mode: "rotate-predict", hm: u8Key(hm), turns: turns });
    q.figure = fig;
    return q;
  }
  return mcq("Un objet en cubes est tourné de 180° sur la table. Quelles sont les hauteurs des colonnes de la vue de face après le tour ?",
    { t: "1, 2, 3", fb: "Exact." },
    [{ t: "3, 2, 1", fb: "C'est la vue avant le tour." }, { t: "2, 2, 2", fb: "Cela aplatit les piles." }, { t: "3, 1, 2", fb: "Cela mélange les colonnes." }],
    "Tourner la carte de 180 degrés inverse les colonnes, ce qui donne <b>1, 2, 3</b>.", { mode: "rotate-predict", hm: "fb", turns: 2 });
}, ["Tourne d'abord toute la carte des hauteurs, dans le sens nommé, en gardant l'arrière de la carte en haut.", "Après le tour, prends la pile la plus haute de chaque colonne, de gauche à droite."]);

// 8. 10.16 L2 gen num, CR 2: front view squares after a described rotation.
E("u8-rotate-front-num", 8, ["10.16"], 2, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 6, 10);
  var turns = pick([1, 2, 3]);
  var rot = u8RotHM(hm, turns);
  var prof = u8FrontProf(rot), ans = u8SumArr(prof);
  var dirWord = turns === 1 ? "90° dans le sens horaire" : (turns === 2 ? "180°" : "90° dans le sens antihoraire");
  var cell = 24, body = u8T(160, 14, "Objet avant le tour (nombres = cubes)", 11, true);
  body += u8HM(hm, 124, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes avant une rotation");
  var chain = prof.map(function (v, i) { return (i === 0 ? "" : " &+ ") + fmtD(v); }).join("");
  var q = numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. L'objet est tourné de " + dirWord + " sur la table, vu de dessus, puis on dessine la vue de face. Combien de cases paraissent dans cette vue de face ? Compte chaque case visible dans chaque colonne.",
    ans, 0,
    "Tourne la carte de " + dirWord + ", puis prends la pile la plus haute de chaque colonne de la carte tournée : \\[ \\begin{aligned} \\text{hauteurs de face} &= " + u8ProfStr(prof) + " \\\\ \\text{cases} &= " + prof.join(" + ") + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc la vue de face après le tour montre <b>" + fmtD(ans) + "</b> cases.",
    { mode: "rotate-front-num", hm: u8Key(hm), turns: turns });
  q.figure = fig;
  return q;
}, ["La rotation change quelles piles s'alignent dans chaque colonne de face.", "Tourne d'abord la carte, écris les nouvelles hauteurs des colonnes, puis additionne-les."]);

// 9. 10.17 L2 gen MC with figure: given the three views, pick the object (height map in words).
E("u8-build-from-views", 8, ["10.17"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 2, 5, 8);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm);
    var swapped = [hm[1], hm[0]];
    var mirrored = hm.map(function (row) { return row.slice().reverse(); });
    var lowered = hm.map(function (row) { return row.slice(); });
    var mi = 0, mj = 0, mv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > mv) { mv = hm[r][c]; mi = r; mj = c; }
    lowered[mi][mj] = mv - 1;
    var optsT = [u8HMStr(hm), u8HMStr(swapped), u8HMStr(mirrored), u8HMStr(lowered)];
    if (new Set(optsT).size < 4) continue;
    var cell = 15;
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ DROIT", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Construis l'objet qui a ces vues", 11, true);
    var fig = u8Svg(320, 112, body, "Vues de dessus, de face et du côté droit d'un objet en cubes");
    var q = mcq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Quelle carte des hauteurs construit un objet qui a exactement ces vues ? Dans une carte des hauteurs, chaque nombre indique combien de cubes sont empilés sur cette case.",
      { t: optsT[0], fb: "Exact. Sa vue de dessus, ses hauteurs de colonnes de face et ses hauteurs de colonnes de côté correspondent toutes au diagramme." },
      [
        { t: optsT[1], fb: "Cela échange les rangées arrière et avant; la vue de côté se lirait alors dans le mauvais sens." },
        { t: optsT[2], fb: "Cela reflète l'objet de gauche à droite; la vue de face serait inversée." },
        { t: optsT[3], fb: "Cela abaisse la pile la plus haute d'un cube, donc les vues de face et de côté seraient plus courtes." }
      ],
      "La vue de dessus fixe quelles cases sont utilisées, la vue de face fixe la pile la plus haute de chaque colonne, et la vue de côté fixe la pile la plus haute de chaque rangée. La carte qui satisfait les trois est : <b>" + optsT[0] + "</b>",
      { mode: "build-from-views", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Quelle carte des hauteurs construit un objet avec les vues montrées ?",
    { t: "Rangée arrière (de gauche à droite) : 2, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Exact." },
    [{ t: "Rangée arrière (de gauche à droite) : 1, 1, 1. Rangée avant (de gauche à droite) : 2, 0, 1.", fb: "Cela échange les rangées." }, { t: "Rangée arrière (de gauche à droite) : 1, 0, 2. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Cela reflète l'objet." }, { t: "Rangée arrière (de gauche à droite) : 1, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.", fb: "Cela abaisse la pile la plus haute." }],
    "La carte qui correspond aux trois vues est <b>Rangée arrière (de gauche à droite) : 2, 0, 1. Rangée avant (de gauche à droite) : 1, 1, 1.</b>", { mode: "build-from-views", hm: "fb" });
}, ["Utilise les trois vues ensemble : le dessus pour l'empreinte, la face pour les hauteurs des colonnes, le côté pour les hauteurs des rangées.", "Teste d'abord chaque carte candidate contre la vue de face; la plupart des mauvaises cartes échouent là."]);

// 10. 10.17 L2 gen num, CR 3: total cubes in the object shown as a height map.
E("u8-cubes-total-num", 8, ["10.17"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Construis cet objet (nombres = cubes sur chaque case)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes à construire");
  var flat = hm[0].concat(hm[1]);
  var q = numq("Le diagramme est le plan d'un objet en cubes : chaque nombre indique combien de cubes sont empilés sur cette case. Combien de cubes faut-il en tout pour construire l'objet ?",
    tot, 0,
    "Additionne la pile sur chaque case, rangée arrière puis rangée avant : \\[ \\begin{aligned} \\text{total} &= " + flat.join(" + ") + " \\\\ &= " + fmtD(tot) + " \\end{aligned} \\] Donc l'objet demande <b>" + fmtD(tot) + "</b> cubes.",
    { mode: "cubes-total", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Chaque nombre du plan est une pile de cubes dans l'objet fini.", "Additionne d'abord les nombres de la rangée arrière, puis ceux de la rangée avant."]);

// 11. 10.9 L2 gen num, CR 3: squares showing in the front view.
E("u8-front-squares-num", 8, ["10.9"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var prof = u8FrontProf(hm), ans = u8SumArr(prof), tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes");
  var q = numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Combien de cases paraissent dans la vue de face de l'objet ? Dans la vue de face, une pile plus haute cache toute pile plus courte directement derrière elle.",
    ans, 0,
    "Dans chaque colonne, seule la pile la plus haute paraît, donc les hauteurs des colonnes sont le plus grand nombre de chaque colonne : \\[ \\begin{aligned} \\text{hauteurs de face} &= " + u8ProfStr(prof) + " \\\\ \\text{cases} &= " + prof.join(" + ") + " \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] L'objet a " + fmtD(tot) + " cubes, mais la vue de face montre seulement <b>" + fmtD(ans) + "</b> cases.",
    { mode: "front-squares", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Une vue montre des silhouettes, pas chaque cube; les cubes cachés n'ajoutent pas de cases.", "Pour chaque colonne, compare les nombres arrière et avant et garde le plus grand, puis additionne les trois résultats."]);

// 12. 10.4 L2 gen num, CR 3: angles around a point with regular tiles.
E("u8-around-point-num", 8, ["10.4"], 1, "gen", function () {
  var mode = ri(0, 2), n, ang, k, ans, prompt, sol;
  var R = ri(24, 34), rot = ri(0, 50);
  if (mode === 0) {
    n = pick([3, 4, 6]); ang = u8Interior(n); ans = 360 / ang;
    prompt = "Des copies d'un " + U8_POLY_NAMES[n] + " sont placées autour d'un seul point, coin contre coin, sans espaces. L'angle intérieur de la tuile est de " + fmtD(ang) + " degrés. Combien de tuiles se rencontrent au point ?";
    sol = "Les angles autour d'un point totalisent 360 degrés, et chaque tuile ajoute un angle intérieur : \\[ \\begin{aligned} \\text{tuiles} &= 360° \\div " + fmtD(ang) + "° \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc <b>" + fmtD(ans) + "</b> tuiles se rencontrent au point.";
  } else if (mode === 1) {
    n = pick([3, 4, 6, 8, 12]); ang = u8Interior(n); k = ri(1, Math.floor(359 / ang) - 0);
    if (k * ang >= 360) k = 1;
    ans = 360 - k * ang;
    prompt = "Un " + U8_POLY_NAMES[n] + " a un angle intérieur de " + fmtD(ang) + " degrés. " + fmtD(k) + (k === 1 ? " copie est placée" : " copies sont placées") + " autour d'un point, coin contre coin. Combien de degrés des 360 degrés complets autour du point restent encore non couverts ?";
    sol = "Trouve l'angle que les tuiles placées couvrent, puis soustrais-le d'un tour complet : \\[ \\begin{aligned} \\text{couvert} &= " + fmtD(k) + " \\times " + fmtD(ang) + "° = " + fmtD(k * ang) + "° \\\\ \\text{non couvert} &= 360° - " + fmtD(k * ang) + "° \\\\ &= " + fmtD(ans) + "° \\end{aligned} \\] Donc <b>" + fmtD(ans) + " degrés</b> restent non couverts.";
  } else {
    var pair = pick([["hexagone", 120, "triangle", 60, 1], ["hexagone", 120, "triangle", 60, 2], ["carré", 90, "triangle", 60, 2]]);
    var covered = pair[4] * pair[1];
    ans = (360 - covered) / pair[3];
    prompt = "Des tuiles se rencontrent en un point sans espaces. Au point, il y a " + fmtD(pair[4]) + " " + pair[0] + (pair[4] > 1 ? "s réguliers" : " régulier") + " (angle intérieur " + fmtD(pair[1]) + " degrés) et des triangles équilatéraux (angle intérieur 60 degrés). Combien de triangles se rencontrent au point ?";
    sol = "Les angles autour du point doivent totaliser 360 degrés : \\[ \\begin{aligned} \\text{reste pour les triangles} &= 360° - " + fmtD(pair[4]) + " \\times " + fmtD(pair[1]) + "° = " + fmtD(360 - covered) + "° \\\\ \\text{triangles} &= " + fmtD(360 - covered) + "° \\div 60° \\\\ &= " + fmtD(ans) + " \\end{aligned} \\] Donc <b>" + fmtD(ans) + "</b> triangles se rencontrent au point.";
    n = pair[0] === "hexagone" ? 6 : 4;
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n || 6, rot), "Une tuile en polygone régulier");
  var q = numq(prompt, ans, 0, sol, { mode: "around-point-" + mode, n: n, k: k || 0 });
  q.figure = fig;
  return q;
}, ["Les angles autour d'un point totalisent exactement 360 degrés.", "Multiplie l'angle intérieur par le nombre de tuiles placées, puis compare avec 360."]);

// 13. 10.5 L2 gen num, CR 2: the missing angle of an irregular quadrilateral, and tessellating.
E("u8-irregular-angle-num", 8, ["10.5"], 1, "gen", function () {
  for (var att = 0; att < 100; att++) {
    var a = ri(55, 130), b = ri(55, 130), c = ri(55, 130);
    var d = 360 - a - b - c;
    if (d < 40 || d > 160) continue;
    var R = ri(26, 34), rot = ri(0, 40);
    var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, 4, rot), "Une tuile en quadrilatère irrégulier");
    var q = numq("Une tuile en quadrilatère irrégulier a trois angles intérieurs de " + fmtD(a) + " degrés, " + fmtD(b) + " degrés et " + fmtD(c) + " degrés. Les angles intérieurs de tout quadrilatère totalisent 360 degrés. Quel est le quatrième angle intérieur, en degrés ?",
      d, 0,
      "Additionne les trois angles connus et soustrais de 360 : \\[ \\begin{aligned} \\text{connus} &= " + fmtD(a) + "° + " + fmtD(b) + "° + " + fmtD(c) + "° = " + fmtD(a + b + c) + "° \\\\ \\text{quatrième angle} &= 360° - " + fmtD(a + b + c) + "° \\\\ &= " + fmtD(d) + "° \\end{aligned} \\] Donc le quatrième angle est <b>" + fmtD(d) + " degrés</b>. Des copies de tout quadrilatère forment un dallage, parce que ses quatre angles peuvent se rencontrer en un point et totaliser exactement 360 degrés.",
      { mode: "irregular-quad", a: a, b: b, c: c });
    q.figure = fig;
    return q;
  }
  var qf = numq("Une tuile en quadrilatère irrégulier a trois angles intérieurs de 80 degrés, 100 degrés et 90 degrés. Quel est le quatrième angle intérieur, en degrés ?",
    90, 0, "Les angles totalisent 360 degrés : \\[ \\begin{aligned} 360° - (80° + 100° + 90°) &= 90° \\end{aligned} \\] Donc le quatrième angle est <b>90 degrés</b>.", { mode: "irregular-quad", a: 80, b: 100, c: 90 });
  qf.figure = u8Svg(120, 120, u8RegPoly(60, 60, 30, 4, 10), "Une tuile en quadrilatère irrégulier");
  return qf;
}, ["Les angles intérieurs d'un quadrilatère totalisent toujours 360 degrés.", "Additionne d'abord les trois angles donnés, puis soustrais de 360."]);

// 14. 10.7 L2 gen MC with figure: which single transformation maps tile 1 to tile 2.
E("u8-tess-transform", 8, ["10.7"], 1, "gen", function () {
  var mode = pick(["translation", "reflection", "rotation"]);
  var s = ri(26, 34), gap = ri(14, 22);
  // Asymmetric tile: a right triangle with a dot near its right-angle corner.
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    if (kind === "mirror") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx + s / 2, cy - s / 2]];
    if (kind === "rot") pts = [[cx + s / 2, cy - s / 2], [cx - s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : (kind === "mirror" ? [cx + s / 2 - 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7]);
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>'; /* FMT-GEOM */
  }
  var kind2 = mode === "translation" ? "base" : (mode === "reflection" ? "mirror" : "rot");
  var body = tile(70, 60, "base") + tile(70 + s + gap + 40, 60, kind2);
  body += u8T(70, 60 - s / 2 - 16, "Tuile 1", 12, true) + u8T(70 + s + gap + 40, 60 - s / 2 - 16, "Tuile 2", 12, true);
  var W = 70 + s + gap + 40 + 60;
  var fig = u8Svg(W, 120, body, "Deux tuiles dans un motif de dallage, la deuxième une image de la première");
  var desc = {
    translation: "La tuile 2 est la tuile 1 glissée de côté : même taille, même sens, et le point reste près du même coin.",
    reflection: "La tuile 2 est la tuile 1 retournée : le point passe au coin correspondant de l'autre côté, comme une image miroir.",
    rotation: "La tuile 2 est la tuile 1 tournée autour d'un point : le point suit son coin pendant que la tuile tourne."
  };
  var names = { translation: "Une translation (un glissement)", reflection: "Une réflexion (un retournement)", rotation: "Une rotation (un tour)" };
  var others = ["translation", "reflection", "rotation"].filter(function (m) { return m !== mode; });
  var q = mcq("Le diagramme montre deux tuiles voisines dans un dallage. Chaque tuile est un triangle rectangle avec un point près d'un coin. Quelle transformation envoie la tuile 1 sur la tuile 2 ?",
    { t: names[mode], fb: "Exact. " + desc[mode] },
    [
      { t: names[others[0]], fb: "Regarde le point : sa position élimine ce choix. " + desc[mode] },
      { t: names[others[1]], fb: "Regarde le point : sa position élimine ce choix. " + desc[mode] },
      { t: "Un agrandissement (taille changée)", fb: "Les deux tuiles ont exactement la même taille, donc aucun changement de taille n'est en jeu." }
    ],
    "Compare le point et les coins des deux tuiles. " + desc[mode] + " Donc la transformation est <b>" + names[mode].toLowerCase() + "</b>.",
    { mode: "tess-transform-" + mode, s: s, gap: gap });
  q.figure = fig;
  return q;
}, ["Suis un élément marqué, comme le point, de la première tuile à la deuxième.", "Un glissement garde la tuile dans le même sens, un retournement la reflète, et un tour la fait tourner."]);

// 15. 10.13 L2 var: which plan creates a tessellation.
E("u8-create-tess-var", 8, ["10.13"], 1, "var", varset([
  function () {
    return mcq("Un élève crée un dallage à partir de copies d'une tuile carrée. Quel plan fonctionne, et pourquoi ?",
      { t: "Glisser les copies de côté et vers le bas dans une grille; l'aire couverte est le nombre de tuiles fois l'aire d'une tuile.", fb: "Exact. Glisser (translater) des carrés remplit le plan, et le glissement garde l'aire de chaque tuile inchangée." },
      [{ t: "Tourner chaque copie un peu pour que le motif s'ouvre en éventail; l'aire grandit quand l'éventail s'étend.", fb: "Ouvrir les tuiles en éventail crée des espaces en coin entre elles, donc le plan n'est pas couvert." }, { t: "Réduire chaque copie légèrement pour qu'elles s'ajustent plus facilement; l'aire totale reste la même qu'au départ.", fb: "Réduire laisse des espaces, et changer la taille des tuiles change l'aire totale couverte." }, { t: "Faire chevaucher chaque copie un peu sur la précédente dans le motif; les chevauchements gardent l'aire totale la même qu'au départ.", fb: "Les chevauchements couvrent une partie du sol deux fois et ne sont pas permis dans un dallage." }],
      "Les carrés forment un dallage par translation sur une grille, et les transformations ne changent pas l'aire d'une tuile. Donc le plan qui fonctionne est de <b>glisser les copies de côté et vers le bas dans une grille; l'aire couverte est le nombre de tuiles fois l'aire d'une tuile</b>.",
      { mode: "create-square" });
  },
  function () {
    return mcq("Une classe fait un motif de plancher avec des triangles équilatéraux et des carrés ensemble. Quel énoncé au sujet du dallage fini est vrai ?",
      { t: "À chaque point, les angles totalisent 360 degrés, et l'aire totale est la somme des aires de toutes les tuiles.", fb: "Exact. Des sommes d'angles de 360 gardent le recouvrement sans espaces, et combiner des tuiles additionne leurs aires." },
      [{ t: "À chaque point, les angles totalisent 180 degrés, parce que les tuiles sont posées sur un plancher plat de la classe.", fb: "Autour d'un point sur un plancher plat, les angles totalisent 360 degrés, pas 180." }, { t: "L'aire totale est l'aire d'un triangle fois l'aire d'un carré, pour tout le plancher couvert par le dallage.", fb: "Les aires des tuiles combinées s'additionnent; elles ne se multiplient pas." }, { t: "Le motif fonctionne seulement si chaque tuile est tournée du même angle à chaque fois dans le motif.", fb: "Les tuiles d'un dallage mixte peuvent être tournées de quantités différentes; c'est la somme des angles à chaque point qui compte." }],
      "Un dallage exige des sommes d'angles de 360 degrés à chaque point, et les aires s'additionnent quand on combine des formes. Donc <b>à chaque point, les angles totalisent 360 degrés, et l'aire totale est la somme des aires de toutes les tuiles</b>.",
      { mode: "create-mixed" });
  },
  function () {
    return mcq("Quel plan crée un dallage avec des hexagones réguliers et des triangles équilatéraux ?",
      { t: "Entourer chaque hexagone de triangles dans ses espaces, en répétant le groupe par glissement sur le plancher.", fb: "Exact. Les angles d'hexagone de 120 degrés et les angles de triangle de 60 degrés se combinent pour donner 360 à chaque point, et le groupe se répète par translation." },
      [{ t: "Placer les hexagones en rangée et laisser les espaces vides pour ajouter les triangles plus tard sur le plancher.", fb: "Des espaces vides signifient que la surface n'est pas couverte, donc ce n'est pas encore un dallage." }, { t: "Utiliser seulement des hexagones, mais pousser chaque rangée à moitié dans la rangée au-dessus du motif.", fb: "Pousser les rangées les unes dans les autres crée des chevauchements, ce qu'un dallage ne permet pas." }, { t: "Couper chaque triangle en deux et jeter les moitiés pour que les morceaux s'ajustent aux espaces des hexagones.", fb: "Jeter des morceaux change les formes et leurs aires; un dallage utilise des tuiles entières qui s'ajustent telles quelles." }],
      "Les angles de l'hexagone (120 degrés) et du triangle (60 degrés) se combinent pour donner 360 degrés en un point, et le groupe fini se répète par glissement. Donc le plan est d'<b>entourer chaque hexagone de triangles dans ses espaces, en répétant le groupe par glissement sur le plancher</b>.",
      { mode: "create-hex-tri" });
  },
  function () {
    return mcq("Un élève couvre une page d'un dallage de copies d'une forme de poisson faite plus tôt. Chaque copie a la même taille, et les poissons voisins sont retournés pour que la tête rencontre la queue. Quelle description du dallage est exacte ?",
      { t: "Il est construit avec des réflexions, et son aire totale est le nombre de poissons fois l'aire d'un poisson.", fb: "Exact. Retourner est une réflexion, et les réflexions conservent l'aire." },
      [{ t: "Il est construit avec des agrandissements, et son aire totale du dallage est le double de l'aire d'un poisson.", fb: "Toutes les copies ont la même taille, donc aucun agrandissement n'est utilisé, et le total est le nombre fois une aire." }, { t: "Il est construit avec des rotations seulement, et les réflexions changeraient l'aire de chaque poisson.", fb: "Les poissons sont retournés, ce qui est une réflexion, et une réflexion garde l'aire la même." }, { t: "Ce n'est pas un dallage, à moins que les poissons se chevauchent aussi légèrement les uns sur les autres.", fb: "Un dallage ne doit avoir aucun chevauchement; des copies retournées qui se rencontrent bord à bord suffisent." }],
      "Retourner une copie est une réflexion, et les réflexions, comme toutes les transformations rigides, conservent l'aire. Donc le dallage est <b>construit avec des réflexions, et son aire totale est le nombre de poissons fois l'aire d'un poisson</b>.",
      { mode: "create-fish" });
  }
]), ["Un plan qui fonctionne doit couvrir sans espaces et sans chevauchements, et les aires s'additionnent d'une tuile à l'autre.", "Nomme la transformation qui fait la répétition, puis vérifie ce qui arrive à l'aire."]);

// 16. 10.8 L3 gen MC with figure: a combination of transformations in a tessellation.
E("u8-combo-transform", 8, ["10.8"], 3, "gen", function () {
  var s = ri(26, 34), gap = ri(16, 24), lift = ri(6, 12);
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    else pts = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7];
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>'; /* FMT-GEOM */
  }
  var cx2 = 70 + s + gap + 40;
  var body = tile(70, 66, "base") + tile(cx2, 66 - lift, "flip");
  body += u8T(70, 66 - s / 2 - 16, "Tuile 1", 12, true) + u8T(cx2, 66 - lift - s / 2 - 16, "Tuile 2", 12, true);
  var fig = u8Svg(cx2 + 60, 132, body, "Deux tuiles dans un motif où la deuxième est retournée et décalée par rapport à la première");
  var q = mcq("Le diagramme montre deux tuiles voisines dans un dallage. Chaque tuile est un triangle rectangle avec un point près d'un coin. La tuile 2 est retournée par rapport à la tuile 1, et elle est aussi plus haut et plus à droite. Quelle description convient le mieux à la transformation de la tuile 1 à la tuile 2 ?",
    { t: "Une réflexion combinée à une translation (une réflexion glissée).", fb: "Exact. La tuile est reflétée et aussi décalée, donc deux transformations agissent ensemble." },
    [
      { t: "Une réflexion seule, sans aucun déplacement le long du motif.", fb: "Une réflexion seule placerait la tuile directement de l'autre côté d'un axe miroir, sans décalage supplémentaire le long du motif." },
      { t: "Une translation seule, sans aucun retournement de la tuile.", fb: "Une translation garde la tuile dans le même sens; cette tuile est retournée, donc un glissement seul ne peut pas le faire." },
      { t: "Une rotation seule, sans aucun retournement de la tuile ici.", fb: "Un seul tour garderait le sens de la tuile; le point montre que la tuile a été reflétée et aussi déplacée." }
    ],
    "Le point montre que la tuile a été reflétée, et sa position montre qu'elle a aussi été décalée de côté et vers le haut. Deux transformations agissent ensemble : <b>une réflexion combinée à une translation (une réflexion glissée)</b>.",
    { mode: "combo-glide", s: s, gap: gap, lift: lift });
  q.figure = fig;
  return q;
}, ["Vérifie deux choses séparément : la tuile a-t-elle été retournée, et a-t-elle été décalée ?", "Quand une tuile est à la fois reflétée et déplacée, la transformation est une combinaison."]);

// 17. 10.14 L3 var: creating a new tessellating shape from a tessellating polygon.
E("u8-new-shape-var", 8, ["10.14"], 3, "var", varset([
  function () {
    var q=mcq("Un carré forme un dallage. Un élève coupe un petit triangle au milieu du côté gauche du carré et colle le même triangle au milieu du côté droit. Qu'est-ce qui est vrai de la nouvelle forme ?",
      { t: "Elle forme encore un dallage par glissement, et son aire est la même que celle du carré.", fb: "Exact. La bosse d'un côté s'ajuste à l'entaille du côté opposé, et déplacer un morceau garde l'aire totale inchangée." },
      [{ t: "Elle forme encore un dallage, mais son aire est plus grande que celle du carré d'origine.", fb: "Le triangle a été déplacé, pas ajouté; aucun nouveau matériau n'a été créé, donc l'aire est inchangée." }, { t: "Elle ne forme plus un dallage, parce que seul le carré d'origine peut couvrir le plan.", fb: "Les formes faites ainsi forment un dallage; la bosse et l'entaille correspondantes sont exactement ce qui fait que les copies s'ajustent." }, { t: "Elle forme un dallage seulement si le triangle coupé est jeté du carré d'origine.", fb: "Jeter le morceau laisse une entaille sans rien pour la remplir et réduit l'aire." }],
      "Le morceau coupé d'un côté est ajouté au côté opposé, donc les copies s'ajustent, bosse dans entaille, par un glissement, et l'aire est conservée. Donc <b>elle forme encore un dallage par glissement, et son aire est la même que celle du carré</b>.",
      { mode: "new-square-slide" }); q.figure=m8NotchSquareSVG(); return q;
  },
  function () {
    return mcq("Un triangle équilatéral forme un dallage. Une élève coupe un petit morceau d'un côté et le colle sur le côté suivant du même triangle, en tournant le morceau pendant qu'elle le déplace. Les copies de la nouvelle forme sont ajustées ensemble en tournant chaque copie d'un tiers de tour complet autour d'un coin. Quel énoncé décrit le résultat ?",
      { t: "La nouvelle forme forme un dallage avec des rotations, et son aire égale l'aire du triangle.", fb: "Exact. Le morceau déplacé correspond à la coupe de la copie voisine sous un tour de 120 degrés, et l'aire est conservée." },
      [{ t: "La nouvelle forme forme un dallage avec des translations seulement, et son aire est plus petite.", fb: "Déplacer un morceau vers un côté adjacent apparie les copies par rotation, pas par un simple glissement, et aucune aire n'est perdue." }, { t: "La nouvelle forme ne peut pas former un dallage, car ce n'est plus un polygone.", fb: "Les formes qui ne sont pas des polygones peuvent former un dallage; la coupe et le morceau ajouté correspondent entre les copies voisines." }, { t: "La nouvelle forme forme un dallage seulement après que chaque copie est agrandie.", fb: "Toutes les copies gardent la même taille; agrandir ne fait pas partie de la méthode." }],
      "Couper un morceau d'un côté et l'ajouter au côté adjacent apparie les copies sous un tour de 120 degrés, et déplacer un morceau conserve l'aire. Donc <b>la nouvelle forme forme un dallage avec des rotations, et son aire égale l'aire du triangle</b>.",
      { mode: "new-triangle-rotate" });
  },
  function () {
    return mcq("Un élève veut transformer un parallélogramme qui forme un dallage en une nouvelle forme qui forme un dallage. Quelle méthode fonctionne ?",
      { t: "Couper une courbe du côté du haut et coller la même courbe sur le côté du bas, puis répéter les copies par glissement.", fb: "Exact. Les côtés opposés d'un parallélogramme s'apparient par un glissement, donc la courbe et sa copie s'ajustent ensemble et l'aire est conservée." },
      [{ t: "Couper une courbe du côté du haut et la jeter, puis répéter les copies par glissement sur tout le plancher de la pièce.", fb: "Jeter le morceau laisse un espace qu'aucune copie ne peut remplir, et l'aire change." }, { t: "Couper une courbe du côté du haut et la coller aussi sur le côté du haut du même parallélogramme d'origine.", fb: "Ajouter au même côté laisse le côté du bas droit, donc les bosses rencontrent les bosses et les copies ne peuvent pas s'ajuster." }, { t: "Étirer le parallélogramme au double de sa largeur et couper un morceau d'un coin du parallélogramme d'origine.", fb: "Étirer change les angles de la forme, donc les copies ne se rencontrent plus nettement autour de chaque point." }],
      "Les morceaux déplacés entre les côtés opposés d'une forme qui forme un dallage gardent l'ajustement par un glissement et conservent l'aire. Donc la méthode qui fonctionne est de <b>couper une courbe du côté du haut et coller la même courbe sur le côté du bas, puis répéter les copies par glissement</b>.",
      { mode: "new-parallelogram" });
  },
  function () {
    return mcq("Après avoir modifié un hexagone qui forme un dallage, une élève vérifie sa nouvelle forme et trouve que son aire est plus grande que l'aire de l'hexagone. Qu'est-ce qui a dû arriver dans sa modification ?",
      { t: "Elle a ajouté un morceau sans couper le même morceau ailleurs.", fb: "Exact. L'aire grandit seulement quand du matériau est ajouté sans qu'un morceau égal soit enlevé." },
      [{ t: "Elle a déplacé un morceau d'un côté au côté opposé de la forme.", fb: "Déplacer un morceau garde la quantité totale de matériau, et donc l'aire, la même." }, { t: "Elle a retourné la forme entière avant de la copier dans le motif.", fb: "Retourner est une réflexion; cela ne change pas l'aire." }, { t: "Elle a tourné chaque copie de 60 degrés dans le motif du dallage.", fb: "Tourner les copies ne change pas l'aire de la forme elle-même." }],
      "Les transformations et les déplacements de morceaux conservent l'aire; l'aire peut grandir seulement quand du matériau supplémentaire est ajouté. Donc <b>elle a ajouté un morceau sans couper le même morceau ailleurs</b>.",
      { mode: "new-area-check" });
  }
]), ["La méthode fiable déplace un morceau d'un côté au côté avec lequel il s'apparie, pour que les copies s'ajustent encore.", "Déplacer un morceau ne change jamais l'aire totale; ajouter ou jeter un morceau la change."]);

// 18. 10.17 L3 gen num, CR 3: greatest number of cubes that could match given views.
E("u8-build-max-num", 8, ["10.17"], 3, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var front = u8FrontProf(hm), side = u8SideProf(hm); // side listed front row to back row
    var occ = u8OccOf(hm);
    var used = occ[0].concat(occ[1]).filter(function (v) { return v; }).length;
    if (used < 5) continue;
    // tallest possible stack on a used square: limited by both its column and row maxima.
    var rowsFB = [hm[1], hm[0]]; // front row first, matching side order
    var tot = 0, rF, c;
    for (rF = 0; rF < 2; rF++) for (c = 0; c < 3; c++) {
      if (rowsFB[rF][c] > 0 || occ[rF === 0 ? 1 : 0][c]) { /* occupancy check below */ }
    }
    tot = 0;
    var occFB = [occ[1], occ[0]];
    for (rF = 0; rF < 2; rF++) for (c = 0; c < 3; c++) if (occFB[rF][c]) tot += Math.min(front[c], side[rF]);
    if (tot <= u8Sum(hm)) continue;
    var cell = 15;
    var body = u8T(52, 14, "DESSUS", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FACE : " + u8ProfStr(front), 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "CÔTÉ : " + u8ProfStr(side), 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 104, "Les colonnes de la vue de côté vont de l'avant à l'arrière", 10, false);
    var fig = u8Svg(320, 114, body, "Vues de dessus, de face et de côté d'un objet en cubes");
    var q = numq("Le diagramme montre les vues de dessus, de face et du côté droit d'un objet en cubes. Les hauteurs des colonnes de la vue de face sont " + u8ProfStr(front) + ", et les hauteurs des colonnes de la vue de côté, lues de l'avant de l'objet vers l'arrière, sont " + u8ProfStr(side) + ". Quel est le plus grand nombre possible de cubes dans un objet qui a exactement ces vues ?",
      tot, 0,
      "Une pile sur une case donnée ne peut pas dépasser la hauteur de sa colonne de face ni la hauteur de sa colonne de côté, donc sa plus grande hauteur est la plus petite des deux. En additionnant ces plus grandes hauteurs sur chaque case remplie de la vue de dessus, on obtient \\[ \\begin{aligned} \\text{plus grand total} &= " + fmtD(tot) + " \\end{aligned} \\] Donc le plus grand nombre possible de cubes est <b>" + fmtD(tot) + "</b>.",
      { mode: "build-max", hm: u8Key(hm), tot: tot });
    q.figure = fig;
    return q;
  }
  return numq("Quel est le plus grand nombre possible de cubes dans un objet dont les hauteurs de la vue de face sont 2, 2, dont la vue de dessus est une seule rangée de 2 cases, et dont la hauteur de la vue de côté est 2 ?",
    4, 0, "Chaque pile peut être aussi haute que la plus petite de ses limites de colonne et de rangée, 2, et il y a 2 cases : \\[ \\begin{aligned} 2 \\times 2 &= 4 \\end{aligned} \\] Donc le plus grand total est <b>4</b>.", { mode: "build-max", hm: "fb", tot: 4 });
}, ["Chaque pile est limitée par deux vues à la fois : sa colonne de face et sa colonne de côté.", "Pour chaque case remplie de la vue de dessus, prends la plus petite des deux hauteurs limites, puis additionne."]);

// 19. 10.13 L3 gen num, CR 2: mixed regular shapes around a point in a created tessellation.
E("u8-mixed-point-num", 8, ["10.13"], 3, "gen", function () {
  var mode = ri(0, 2), ans, prompt, sol, n;
  var R = ri(24, 33), rot = ri(0, 50);
  if (mode === 0) {
    ans = 360 - 135 - 90;
    n = 8;
    prompt = "Un élève crée un dallage avec des octogones réguliers (angle intérieur 135 degrés) et des carrés (angle intérieur 90 degrés). À un point du motif, un octogone et un carré se rencontrent déjà. Un deuxième octogone est placé dans l'espace restant. Quel est l'angle intérieur, en degrés, de cet espace restant avant que le deuxième octogone soit placé ? Autrement dit, combien de degrés autour du point restent après le premier octogone et le carré ?";
    sol = "Les angles autour d'un point totalisent 360 degrés : \\[ \\begin{aligned} \\text{restant} &= 360° - 135° - 90° \\\\ &= " + fmtD(ans) + "° \\end{aligned} \\] Les <b>" + fmtD(ans) + " degrés</b> restants correspondent exactement à l'angle intérieur de 135 degrés du deuxième octogone, et c'est pourquoi les octogones et les carrés forment un dallage ensemble.";
  } else if (mode === 1) {
    ans = 4;
    n = 6;
    prompt = "Un élève crée un dallage avec des hexagones réguliers (angle intérieur 120 degrés) et des triangles équilatéraux (angle intérieur 60 degrés). À chaque point, un hexagone rencontre le point, et le reste du point est rempli par des triangles. Combien de triangles se rencontrent à chaque point ?";
    sol = "Soustrais l'angle de l'hexagone d'un tour complet, puis partage le reste entre des angles de triangle de 60 degrés : \\[ \\begin{aligned} \\text{restant} &= 360° - 120° = 240° \\\\ \\text{triangles} &= 240° \\div 60° \\\\ &= 4 \\end{aligned} \\] Donc <b>4</b> triangles se rencontrent à chaque point.";
  } else {
    ans = 120;
    n = 12;
    prompt = "Un élève crée un dallage avec trois formes à chaque point : un dodécagone régulier (angle intérieur 150 degrés), un carré (angle intérieur 90 degrés) et un hexagone régulier. Quel est l'angle intérieur, en degrés, que l'hexagone doit contribuer au point pour que les trois formes le remplissent exactement ?";
    sol = "Les trois angles doivent totaliser un tour complet : \\[ \\begin{aligned} \\text{angle de l'hexagone} &= 360° - 150° - 90° \\\\ &= 120° \\end{aligned} \\] Donc la troisième forme doit contribuer <b>120 degrés</b>, ce qui est exactement l'angle intérieur d'un hexagone régulier, donc la combinaison remplit le point sans espace.";
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n, rot), "Une tuile en polygone régulier utilisée dans le motif");
  var q = numq(prompt, ans, 0, sol, { mode: "mixed-point-" + mode, n: n });
  q.figure = fig;
  return q;
}, ["Les angles autour d'un point dans un dallage totalisent exactement 360 degrés.", "Additionne les angles déjà au point et soustrais de 360."]);

/* ----- bank-fix.js ----- */
// Math 8 (French) pool-gap fill additions question bank
// Cut verbatim from the standalone bank source
// (math-8-review-fr/bank-src.js, lines 4489 to 4991).
// CRMARKS: u1-garden-diagonal-gap=2
// CRMARKS: u1-grid-distance-gap=2
// CRMARKS: u1-fence-perimeter-gap=3
// CRMARKS: u1-square-side-perimeter-gap=3
// CRMARKS: u1-two-ladders-gap=3
// CRMARKS: u1-shortcut-saving-gap=3
// CRMARKS: u2-square-minus-product-gap=2
// CRMARKS: u2-missing-factor-follow-gap=3
// CRMARKS: u2-fifth-day-temp-gap=3
// CRMARKS: u2-chain-negative-divisor-gap=3
// CRMARKS: u2-two-divers-gap=3
// CRMARKS: u3-area-decimal-gap=2
// CRMARKS: u3-bottles-roundup-gap=3
// CRMARKS: u3-chain-subtract-product-gap=3
// CRMARKS: u4-tank-litres-gap=2
// CRMARKS: u4-open-box-sa-gap=3
// CRMARKS: u5-down-then-up-gap=3
// CRMARKS: u5-unit-rate-cost-gap=3
// CRMARKS: u5-ratio-part-percent-gap=3
// CRMARKS: u6-decimal-coefficient-gap=2
// CRMARKS: u6-two-points-evaluate-gap=3
// CRMARKS: u7-expected-count-gap=2
// CRMARKS: u7-missing-mean-value-gap=2
// CRMARKS: u7-mean-difference-gap=3
// CRMARKS: u7-two-colours-twice-gap=3
// CRMARKS: u7-survey-scale-gap=3
// CRMARKS: u7-combined-mean-gap=3
// CRMARKS: u8-hidden-cubes-gap=2
// CRMARKS: u8-rotated-side-view-gap=3
// CRMARKS: u8-tiles-at-point-gap=3
// CRMARKS: u8-cube-volume-gap=3
// CRMARKS: u8-changed-side-view-gap=3
/* Pool-gap fill, November 9, 2026 */
/* Level 2 entries added to close the unit-test and exam composition gaps
   found by the November 9, 2026 level calibration diagnostic. New entries
   only; no existing entry was changed. CR entries always return numq and
   are tagged in CR_MARKS; the four SR entries always return mcq. */

/* Unit 1: Square Roots and the Pythagorean Theorem */
E("u1-garden-diagonal-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41],[12,35,37],[20,21,29]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var place=pick(["potager","jardin d'école","jardin communautaire","pelouse rectangulaire"]);
  var q=numq("Un "+place+" mesure "+a+" m de long et "+b+" m de large. Un sentier droit va d'un coin du rectangle au coin opposé. Quelle est la longueur du sentier, en mètres ?", c, 0.01,
    "Le sentier est l'hypoténuse d'un triangle rectangle dont les cathètes sont la longueur et la largeur : \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] La réponse est <b>"+c+" m</b>.",
    {mode:"garden-diagonal", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["Le sentier droit est le côté incliné d'un triangle rectangle caché dans le rectangle.", "Mets la longueur et la largeur au carré, additionne les carrés, puis prends la racine carrée de la somme."]);

E("u1-grid-distance-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]);
  var kk=ri(1,2); var dx=base[0]*kk, dy=base[1]*kk, c=base[2]*kk;
  var x1=ri(0,4), y1=ri(0,4), x2=x1+dx, y2=y1+dy;
  var q=numq("Sur une carte quadrillée, une bibliothèque se trouve à ("+x1+", "+y1+") et une patinoire se trouve à ("+x2+", "+y2+"). Chaque case du quadrillage représente 1 km. Quelle est la distance en ligne droite entre la bibliothèque et la patinoire, en kilomètres ?", c, 0.01,
    "Les deux points donnent les cathètes d'un triangle rectangle : le changement horizontal est "+x2+" - "+x1+" = "+dx+" et le changement vertical est "+y2+" - "+y1+" = "+dy+". Ensuite : \\[ \\begin{aligned} d^{2} &= "+dx+"^{2} + "+dy+"^{2} \\\\ &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] La réponse est <b>"+c+" km</b>.",
    {mode:"grid-distance", x1:x1, y1:y1, x2:x2, y2:y2}); q.figure=m8GridDistSVG(x1,y1,x2,y2); return q;
}, ["Soustrais les coordonnées pour trouver les deux cathètes avant d'utiliser le théorème.", "Trouve d'abord le changement horizontal et le changement vertical, puis mets-les au carré et additionne-les."]);

E("u1-fence-perimeter-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var bed=pick(["parterre de fleurs triangulaire","jardin d'herbes triangulaire","potager triangulaire","parterre de roses triangulaire","massif d'arbustes triangulaire"]);
  var q=numq("Un "+bed+" a deux côtés de "+a+" m et "+b+" m qui se rencontrent à angle droit. Le troisième côté joint les extrémités de ces deux côtés. Une clôture est placée le long des trois côtés du parterre. Combien de mètres de clôture faut-il ?", a+b+c, 0.01,
    "Trouve d'abord le troisième côté avec le théorème de Pythagore : \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] Additionne ensuite les trois côtés pour le périmètre : \\("+a+" + "+b+" + "+c+" = "+(a+b+c)+"\\). La réponse est <b>"+(a+b+c)+" m</b>.",
    {mode:"fence-perimeter", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["La clôture suit les trois côtés, et la longueur d'un côté n'est pas donnée directement.", "Trouve d'abord le troisième côté avec le théorème de Pythagore, puis additionne les trois côtés."]);

E("u1-square-side-perimeter-gap", 1, ["3.19", "5.2"], 2, "gen", function(){
  var s=ri(5,30); var area=s*s;
  var place2=pick(["patio","jardin","plancher de mosaïque","bac à sable","plancher de danse"]);
  var q=numq("Un "+place2+" carré a une aire de "+area+" mètres carrés. Une bordure est placée le long des quatre côtés du patio. Combien de mètres de bordure faut-il ?", 4*s, 0.01,
    "La longueur d'un côté est la racine carrée de l'aire : \\[ \\begin{aligned} \\text{côté} &= \\sqrt{"+area+"} \\\\ &= "+s+" \\end{aligned} \\] La bordure fait le tour de quatre côtés égaux : \\(4 \\times "+s+" = "+(4*s)+"\\). La réponse est <b>"+(4*s)+" m</b>.",
    {mode:"square-side-perimeter", s:s}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["L'aire d'un carré est sa longueur de côté multipliée par elle-même.", "Prends la racine carrée de l'aire pour obtenir un côté, puis multiplie par quatre."]);

E("u1-two-ladders-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var bases=[[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]];
  var TR=[]; bases.forEach(function(bs){ for(var k=1;k<=3;k++){ TR.push([bs[0]*k, bs[1]*k, bs[2]*k]); TR.push([bs[1]*k, bs[0]*k, bs[2]*k]); } });
  var t1=null, t2=null;
  for(var att=0; att<400 && !t1; att++){
    var p=pick(TR), q=pick(TR);
    if(p[0]===q[0] && p[1]!==q[1] && p[2]!==q[2]){ if(p[1]<q[1]){ t1=p; t2=q; } else { t1=q; t2=p; } }
  }
  if(!t1){ t1=[12,5,13]; t2=[12,9,15]; }
  var foot=t1[0], h1=t1[1], lad1=t1[2], h2=t2[1], lad2=t2[2];
  var mur=pick(["le mur d'une maison","le mur d'une grange","le mur d'un phare","le mur d'une école","le mur d'un silo"]);
  var q=numq("Deux échelles sont appuyées contre "+mur+", et le pied de chaque échelle se trouve à "+foot+" m du mur. La première échelle mesure "+lad1+" m de long et la deuxième échelle mesure "+lad2+" m de long. À quelle hauteur de plus la deuxième échelle atteint-elle le mur, comparée à la première, en mètres ?", h2-h1, 0.01,
    "Applique le théorème de Pythagore à chaque échelle. Pour la première échelle : \\[ \\begin{aligned} h^{2} &= "+lad1+"^{2} - "+foot+"^{2} \\\\ &= "+(h1*h1)+" \\\\ h &= "+h1+" \\end{aligned} \\] Pour la deuxième échelle : \\[ \\begin{aligned} h^{2} &= "+lad2+"^{2} - "+foot+"^{2} \\\\ &= "+(h2*h2)+" \\\\ h &= "+h2+" \\end{aligned} \\] La différence est \\("+h2+" - "+h1+" = "+(h2-h1)+"\\). La réponse est <b>"+(h2-h1)+" m</b>.",
    {mode:"two-ladders", foot:foot, lad1:lad1, lad2:lad2}); q.figure=m8TwoLaddersSVG(foot,h1,h2,lad1+" m",lad2+" m",foot+" m"); return q;
}, ["Chaque échelle forme son propre triangle rectangle avec le même mur et le même sol.", "Trouve la hauteur atteinte par la première échelle, puis la hauteur atteinte par la deuxième échelle."]);

E("u1-shortcut-saving-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var trav=pick(["élève","randonneur","cycliste","joggeur","campeur"]);
  var q=numq("Un "+trav+" parcourt "+a+" m vers l'est le long d'un sentier, puis "+b+" m vers le nord le long d'un deuxième sentier. Un sentier droit mène directement de la fin du trajet au point de départ. De combien de mètres le sentier droit du retour est-il plus court que le trajet parcouru, en mètres ?", (a+b)-c, 0.01,
    "Le sentier droit est l'hypoténuse d'un triangle rectangle de cathètes "+a+" et "+b+" : \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] Le trajet parcouru mesure \\("+a+" + "+b+" = "+(a+b)+" \\) m, donc l'économie est \\("+(a+b)+" - "+c+" = "+((a+b)-c)+" \\) m. La réponse est <b>"+((a+b)-c)+" m</b>.",
    {mode:"shortcut-saving", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["Compare la distance en ligne droite avec le total des deux segments marchées.", "Trouve d'abord la distance en ligne droite avec le théorème de Pythagore, puis soustrais-la du total marché."]);

E("u1-diagonal-mc-gap", 1, ["9.12", "6.32"], 2, "gen", function(){
  var a=0, b=0, correct=0, dWrong=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    a=ri(4,15); b=ri(4,15); if(a===b) continue;
    var sq=Math.sqrt(a*a+b*b); if(Math.abs(sq-Math.round(sq))<1e-9) continue;
    correct=sq; dWrong=Math.sqrt(Math.abs(a*a-b*b));
    var strs=[fmtDF(correct,1), fmtDF(a*a+b*b,1), fmtDF(a+b,1), fmtDF(dWrong,1)];
    if(new Set(strs).size===4) ok=true;
  }
  if(!ok){ a=7; b=9; correct=Math.sqrt(130); dWrong=Math.sqrt(32); }
  var q=mcq("Une salle rectangulaire mesure "+a+" m de long et "+b+" m de large. Quelle est la distance d'un coin de la salle au coin opposé, en mètres ? Donne ta réponse avec une décimale.",
    {t:fmtDF(correct,1), fb:"Oui : la distance de coin à coin est l'hypoténuse d'un triangle rectangle de cathètes "+a+" et "+b+"."},
    [{t:fmtDF(a*a+b*b,1), fb:"Cela additionne les carrés des côtés mais arrête avant de prendre la racine carrée."},
     {t:fmtDF(a+b,1), fb:"Cela additionne la longueur et la largeur, ce qui est le trajet le long de deux murs, pas la distance droite."},
     {t:fmtDF(dWrong,1), fb:"Cela soustrait les carrés des côtés, ce qui traite un côté comme l'hypoténuse; la diagonale est plus longue que chaque côté."}],
    "La diagonale est l'hypoténuse d'un triangle rectangle de cathètes "+a+" et "+b+" : \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a+b*b)+" \\\\ d &= \\sqrt{"+(a*a+b*b)+"} \\\\ &\\approx "+fmtDF(correct,1)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(correct,1)+" m</b>.",
    {mode:"diagonal-mc", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["La distance de coin à coin est le côté incliné d'un triangle rectangle caché dans le rectangle.", "Mets la longueur et la largeur au carré, additionne, puis prends la racine carrée et arrondis à une décimale."]);

/* Unit 2: Integers */
E("u2-square-minus-product-gap", 2, ["6.18", "6.27"], 2, "gen", function(){
  var a=ri(3,9);
  var b=0, c=0; while(b===0) b=ri(-9,9); while(c===0) c=ri(-8,8);
  var prod=b*c, val=a*a-prod;
  return numq("Calcule : \\( (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Calcule d'abord le carré et le produit : \\[ \\begin{aligned} (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+(a*a)+" - "+u2sg(prod)+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {mode:"square-minus-product", a:a, b:b, c:c});
}, ["Le carré d'un nombre négatif est positif, et le produit suit les règles des signes.", "Calcule le terme au carré et le produit séparément, puis soustrais."]);

E("u2-missing-factor-follow-gap", 2, ["6.22", "6.24"], 2, "gen", function(){
  var s=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var x=0; while(x===0) x=ri(-12,12);
  var P=s*x;
  var t=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var ans=x*t;
  return numq("Un nombre multiplié par \\("+s+"\\) donne \\("+P+"\\). Quel est le résultat quand ce même nombre est multiplié par \\("+t+"\\) ?", ans, 0.01,
    "Trouve d'abord le nombre en divisant, avec la règle des signes pour les quotients : \\[ \\begin{aligned} \\text{nombre} &= "+P+" \\div "+u2sg(s)+" \\\\ &= "+x+" \\end{aligned} \\] Multiplie ensuite ce nombre par "+t+" : \\("+x+" \\times "+u2sg(t)+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {mode:"missing-factor-follow", s:s, x:x, t:t});
}, ["La première phrase cache le nombre, alors retrouve-le avant de faire la deuxième multiplication.", "Divise le produit par le facteur connu pour trouver le nombre, puis multiplie par le nouveau facteur."]);

E("u2-fifth-day-temp-gap", 2, ["6.27", "6.26"], 2, "gen", function(){
  var temps=null, fifth=0, mean=0;
  for(var att=0; att<400 && !temps; att++){
    var ts=[ri(-11,4), ri(-11,4), ri(-11,4), ri(-11,4)], f=ri(-11,4);
    var tot=ts[0]+ts[1]+ts[2]+ts[3]+f;
    if(tot%5===0){ temps=ts; fifth=f; mean=tot/5; }
  }
  if(!temps){ temps=[-6,-2,0,3]; fifth=0; mean=-1; }
  var sum4=temps[0]+temps[1]+temps[2]+temps[3];
  return numq("Les températures de midi des quatre premiers jours d'une semaine étaient "+temps[0]+", "+temps[1]+", "+temps[2]+" et "+temps[3]+" degrés Celsius. La température moyenne de midi pour les cinq jours était "+mean+" degrés Celsius. Quelle était la température de midi le cinquième jour, en degrés Celsius ?", fifth, 0.01,
    "La moyenne donne d'abord le total des cinq jours : \\[ \\begin{aligned} \\text{total} &= 5 \\times "+u2sg(mean)+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] Les quatre premiers jours totalisent \\("+temps[0]+" + "+u2sg(temps[1])+" + "+u2sg(temps[2])+" + "+u2sg(temps[3])+" = "+sum4+"\\), donc le cinquième jour est \\("+(5*mean)+" - "+u2sg(sum4)+" = "+fifth+"\\). La réponse est <b>"+fifth+"</b>.",
    {mode:"fifth-day-temp", temps:temps.join(","), mean:mean});
}, ["Une moyenne sur cinq jours fixe le total des cinq valeurs, pas seulement la cinquième.", "Multiplie la moyenne par cinq pour obtenir le total, puis soustrais les quatre températures connues."]);

E("u2-chain-negative-divisor-gap", 2, ["6.27"], 2, "gen", function(){
  var s=pick([-6,-5,-4,-3,-2,2,3,4,5,6]);
  var q=0; while(q===0) q=ri(-9,9);
  var R=s*q;
  var a=ri(-10,14);
  var b=0, c=0; while(b===0) b=ri(-8,8); while(c===0) c=ri(-8,8);
  var val=a+q-b*c;
  return numq("Calcule : \\( "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Fais la division et la multiplication avant l'addition et la soustraction : \\[ \\begin{aligned} "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+a+" + "+u2sg(q)+" - "+u2sg(b*c)+" \\\\ &= "+val+" \\end{aligned} \\] La réponse est <b>"+val+"</b>.",
    {mode:"chain-negative-divisor", a:a, s:s, b:b, c:c});
}, ["La division et la multiplication passent avant l'addition et la soustraction, et chacune suit les règles des signes.", "Calcule le quotient et le produit séparément, puis combine les trois valeurs."]);

E("u2-two-divers-gap", 2, ["6.26"], 2, "gen", function(){
  var posA=0, posB0=0, rise=0, posB=0, ans=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    posA=-ri(10,32); posB0=-ri(8,30); rise=ri(3,12); posB=posB0+rise;
    ans=Math.abs(posA-posB);
    if(posB<0 && ans>=2) ok=true;
  }
  if(!ok){ posA=-24; posB0=-14; rise=4; posB=-10; ans=14; }
  return numq("Les positions sous la surface de l'eau sont écrites en nombres négatifs. Un plongeur est à \\("+posA+"\\) m. Un deuxième plongeur commence à \\("+posB0+"\\) m et remonte de "+rise+" m. À quelle distance verticale les deux plongeurs se trouvent-ils l'un de l'autre après la remontée, en mètres ?", ans, 0.01,
    "Mets d'abord à jour la position du deuxième plongeur : \\("+posB0+" + "+rise+" = "+posB+"\\). Trouve ensuite la distance entre les deux positions : \\[ \\begin{aligned} \\text{distance} &= "+u2sg(posA)+" - "+u2sg(posB)+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+" m</b>.",
    {mode:"two-divers", posA:posA, posB0:posB0, rise:rise});
}, ["Le deuxième plongeur bouge avant qu'on puisse trouver la distance, alors mets d'abord sa position à jour.", "Additionne la remontée à la position de départ du deuxième plongeur, puis soustrais les deux positions."]);

/* Unit 3: Operations with Fractions */
E("u3-area-decimal-gap", 3, ["6.8", "6.6"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<400 && !P; att++){
    var w1=ri(1,3), d1=pick([2,4,5]), n1=ri(1,d1-1);
    var w2=ri(1,2), d2=pick([2,4,5]), n2=ri(1,d2-1);
    var imp1=w1*d1+n1, imp2=w2*d2+n2;
    var val=(imp1/d1)*(imp2/d2);
    if(Math.abs(val*100-Math.round(val*100))>1e-9) continue;
    if(Math.abs(val-Math.round(val))<1e-9) continue;
    P={w1:w1, n1:n1, d1:d1, imp1:imp1, w2:w2, n2:n2, d2:d2, imp2:imp2, val:Math.round(val*100)/100};
  }
  if(!P) P={w1:2, n1:3, d1:4, imp1:11, w2:1, n2:2, d2:5, imp2:7, val:3.85};
  var rr=u3red(P.imp1*P.imp2, P.d1*P.d2);
  return numq("Un parterre de jardin mesure "+u3disp(P.imp1, P.d1)+" m de long et "+u3disp(P.imp2, P.d2)+" m de large. Quelle est l'aire du parterre, en mètres carrés ? Donne ta réponse sous forme décimale.", P.val, 0.01,
    "Écris les deux nombres fractionnaires en fractions impropres et multiplie : \\[ \\begin{aligned} "+P.w1+FR(P.n1, P.d1)+" \\times "+P.w2+FR(P.n2, P.d2)+" &= "+FR(P.imp1, P.d1)+" \\times "+FR(P.imp2, P.d2)+" \\\\ &= "+FR(rr[0], rr[1])+" \\\\ &= "+fmtD(P.val)+" \\end{aligned} \\] La réponse est <b>"+fmtD(P.val)+"</b>.",
    {mode:"area-decimal", imp1:P.imp1, d1:P.d1, imp2:P.imp2, d2:P.d2});
}, ["L'aire est la longueur fois la largeur, et les nombres fractionnaires se multiplient plus facilement en fractions impropres.", "Transforme les deux mesures en fractions impropres, multiplie, puis écris le produit sous forme décimale."]);

E("u3-bottles-roundup-gap", 3, ["6.12", "6.14"], 2, "gen", function(){
  var T=0, n=0, d=0, ans=0, q=0, ok=false;
  var sizes=[[3,4],[2,3],[3,5],[5,6],[4,5],[5,8]];
  for(var att=0; att<300 && !ok; att++){
    T=ri(9,28); var sz=pick(sizes); n=sz[0]; d=sz[1];
    q=T*d/n;
    if(Math.abs(q-Math.round(q))<1e-9) continue;
    ans=Math.ceil(q); ok=true;
  }
  if(!ok){ T=17; n=3; d=4; q=17*4/3; ans=23; }
  return numq("Un réservoir contient "+T+" L de jus. Le jus est versé dans des bouteilles qui contiennent chacune "+u3disp(n, d)+" L. Combien de bouteilles faut-il pour contenir tout le jus ?", ans, 0.01,
    "Divise le total par la contenance d'une bouteille : \\[ \\begin{aligned} "+T+" \\div "+FR(n, d)+" &= "+T+" \\times "+FR(d, n)+" \\\\ &= "+fmtD(Math.round(q*100)/100)+" \\end{aligned} \\] Une bouteille partiellement remplie compte quand même comme une bouteille, donc le nombre s'arrondit au nombre entier supérieur. La réponse est <b>"+ans+"</b>.",
    {mode:"bottles-roundup", T:T, n:n, d:d});
}, ["Diviser par la contenance de la bouteille donne le nombre, mais une bouteille partielle demande quand même une bouteille.", "Divise le total par la fraction, puis arrondis le résultat au nombre entier supérieur de bouteilles."]);

E("u3-chain-subtract-product-gap", 3, ["6.16"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<500 && !P; att++){
    var d1=pick([2,4,5,8,10]), n1=ri(1,d1-1);
    var d2=pick([2,4,5,8,10]), n2=ri(1,d2-1);
    var d3=pick([2,4,5,8,10]), n3=ri(1,d3-1);
    var val=n1/d1-(n2/d2)*(n3/d3);
    if(val<=0.2) continue;
    if(Math.abs(val*1000-Math.round(val*1000))>1e-9) continue;
    P={n1:n1, d1:d1, n2:n2, d2:d2, n3:n3, d3:d3, val:Math.round(val*1000)/1000};
  }
  if(!P) P={n1:7, d1:8, n2:1, d2:2, n3:3, d3:4, val:0.5};
  var prod=u3red(P.n2*P.n3, P.d2*P.d3);
  return numq("Calcule : \\("+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\). Donne ta réponse sous forme décimale.", P.val, 0.01,
    "La multiplication se fait avant la soustraction : \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" - "+FR(prod[0], prod[1])+" \\\\ &= "+fmtD(P.val)+" \\end{aligned} \\] La réponse est <b>"+fmtD(P.val)+"</b>.",
    {mode:"chain-subtract-product", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["Une opération de la chaîne passe avant l'autre, alors l'ordre change le résultat.", "Calcule d'abord le produit des deux fractions, puis soustrais-le de la première fraction."]);

E("u3-chain-mc-gap", 3, ["6.16", "6.15"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<600 && !P; att++){
    var d1=pick([2,4,5,8,10]), n1=ri(1,d1-1);
    var d2=pick([2,4,5,8,10]), n2=ri(1,d2-1);
    var d3=pick([2,4,5,8,10]), n3=ri(1,d3-1);
    var a=n1/d1, b=n2/d2, c=n3/d3;
    var correct=a+b*c, l2r=(a+b)*c, sumAll=a+b+c, wrongProd=a+(n2*n3)/(d2+d3);
    var vals=[correct, l2r, sumAll, wrongProd];
    var strs=vals.map(function(v){ return fmtDF(v,3); });
    if(new Set(strs).size<4) continue;
    if(vals.some(function(v){ return v<=0; })) continue;
    if(Math.abs(correct*1000-Math.round(correct*1000))>1e-9) continue;
    P={n1:n1, d1:d1, n2:n2, d2:d2, n3:n3, d3:d3, correct:Math.round(correct*1000)/1000, l2r:l2r, sumAll:sumAll, wrongProd:wrongProd};
  }
  if(!P) P={n1:1, d1:2, n2:3, d2:4, n3:2, d3:5, correct:0.8, l2r:0.5, sumAll:1.65, wrongProd:0.5+6/9};
  var prod=u3red(P.n2*P.n3, P.d2*P.d3);
  return mcq("Quelle est la valeur de \\("+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\) ?",
    {t:fmtDF(P.correct,3), fb:"Oui : la multiplication se fait d'abord, puis la somme est terminée."},
    [{t:fmtDF(P.l2r,3), fb:"Cela travaille de gauche à droite, en additionnant avant de multiplier, ce qui brise la priorité des opérations."},
     {t:fmtDF(P.sumAll,3), fb:"Cela additionne les trois fractions et ne multiplie jamais."},
     {t:fmtDF(P.wrongProd,3), fb:"Cela multiplie en additionnant les dénominateurs; la multiplication de fractions multiplie plutôt les dénominateurs."}],
    "La multiplication se fait avant l'addition : \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" + "+FR(prod[0], prod[1])+" \\\\ &= "+fmtD(P.correct)+" \\end{aligned} \\] La réponse est <b>"+fmtD(P.correct)+"</b>.",
    {mode:"chain-mc", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["Une opération de la chaîne passe avant l'autre, alors l'ordre change le résultat.", "Calcule d'abord le produit des deux fractions, puis additionne la première fraction."]);


/* Unit 4: Measuring Prisms and Cylinders */
E("u4-tank-litres-gap", 4, ["9.9", "9.11"], 2, "gen", function(){
  var r=pick([4,5,6,8,10,12,15,20]); var d=2*r; var h=ri(6,40);
  var vol=3.14*r*r*h;
  var litres=Math.round(vol/10)/100;
  var ctx=pick(["réservoir de rangement","baril d'eau","silo à grains","baril de pluie"]);
  var q=numq("Un "+ctx+" cylindrique a un diamètre de "+d+" cm et une hauteur de "+h+" cm. Combien de litres d'eau contient-il quand il est plein ? Utilise \\(\\pi = 3,14\\), et utilise 1000 cm\\(^{3}\\) = 1 L. Donne ta réponse avec deux décimales.", litres, 0.02,
    "Divise le diamètre par deux pour obtenir le rayon, puis trouve le volume : \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3,14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmtD(vol)+" \\text{ cm}^{3} \\end{aligned} \\] Transforme en litres : \\("+fmtD(vol)+" \\div 1000 = "+fmtD(litres)+"\\). La réponse est <b>"+fmtD(litres)+" L</b>.",
    {mode:"tank-litres", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["La formule a besoin du rayon, et la question demande des litres plutôt que des centimètres cubes.", "Divise d'abord le diamètre par deux, trouve le volume, puis divise par 1000 pour changer d'unité."]);

E("u4-open-box-sa-gap", 4, ["9.3", "10.3"], 2, "gen", function(){
  var l=ri(4,14), w=ri(3,11), h=ri(2,9);
  var sa=l*w+2*l*h+2*w*h;
  var q=numq("Une boîte de rangement ouverte sur le dessus a la forme d'un prisme droit à base rectangulaire. Elle mesure "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut, et elle n'a pas de couvercle. Le carton est utilisé pour le fond et les quatre côtés seulement. Combien de centimètres carrés de carton faut-il ?", sa, 0.01,
    "Un dessus ouvert signifie que la face du dessus est absente, alors compte le fond et les quatre faces de côté : \\[ \\begin{aligned} AT &= lw + 2lh + 2wh \\\\ &= "+(l*w)+" + "+(2*l*h)+" + "+(2*w*h)+" \\\\ &= "+sa+" \\end{aligned} \\] La réponse est <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"open-box-sa", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm",h+" cm",true); return q;
}, ["Un dessus ouvert change quelles faces existent, alors liste les faces avant de calculer.", "Trouve d'abord l'aire du fond, puis additionne les deux paires de faces de côté."]);

/* Unit 5: Percent, Ratio and Rate */
E("u5-down-then-up-gap", 5, ["6.2", "6.1"], 2, "gen", function(){
  var item=pick(["kayak","planche à pagaie","ensemble de serre","planche à neige","ensemble de cannes à pêche","ensemble d'abri de jardin"]);
  var P=pick([80,120,150,200,240,300,360,400]);
  var d1=pick([10,20,25,30,40,50]), d2=pick([5,10,15,20,25,30]);
  var afterDown=u5r2(P*(1-d1/100));
  var fin=u5r2(afterDown*(1+d2/100));
  return numq("Un article, "+item+", est au prix de "+fmtDF(P,2)+" $. Son prix est d'abord réduit de "+d1+" %. Le prix réduit est ensuite augmenté de "+d2+" %. Quel est le prix final, en dollars ?", fin, 0.01,
    "Chaque pourcentage agit sur le prix de son étape. Après la réduction : \\[ \\begin{aligned} \\text{prix réduit} &= "+fmtDF(P,2)+" \\times "+fmtD(1-d1/100,2)+" \\\\ &= "+fmtDF(afterDown,2)+" \\end{aligned} \\] Après l'augmentation sur le nouveau prix : \\[ \\begin{aligned} \\text{prix final} &= "+fmtDF(afterDown,2)+" \\times "+fmtD(1+d2/100,2)+" \\\\ &= "+fmtDF(fin,2)+" \\end{aligned} \\] La réponse est <b>"+fmtDF(fin,2)+" $</b>.",
    {mode:"down-then-up", P:P, d1:d1, d2:d2});
}, ["Le deuxième pourcentage agit sur le prix réduit, pas sur le prix de départ.", "Trouve d'abord le prix réduit, puis applique l'augmentation à ce montant."]);

E("u5-unit-rate-cost-gap", 5, ["6.29"], 2, "gen", function(){
  var goods=[["muffins","muffin"],["boîtes de jus","boîte de jus"],["barres tendres","barre tendre"],["coupes de yogourt","coupe de yogourt"],["bagels","bagel"]];
  var g=pick(goods);
  var q1=pick([4,5,8,10,20,25]);
  var unit=pick([0.75,1.25,1.5,1.75,2.25,2.5,3.25,3.5,4.75]);
  var C=u5r2(q1*unit);
  var q2=ri(3,30); if(q2===q1) q2=q1+3;
  var ans=u5r2(unit*q2);
  return numq("Un paquet de "+q1+" "+g[0]+" coûte "+fmtDF(C,2)+" $. À ce taux, quel est le coût de "+q2+" "+g[0]+", en dollars ?", ans, 0.01,
    "Trouve d'abord le coût d'une seule unité, "+g[1]+" : \\[ \\begin{aligned} \\text{taux unitaire} &= "+fmtDF(C,2)+" \\div "+q1+" \\\\ &= "+fmtDF(unit,2)+" \\text{ dollars par "+g[1]+"} \\end{aligned} \\] Multiplie ensuite par la nouvelle quantité : \\("+fmtDF(unit,2)+" \\times "+q2+" = "+fmtDF(ans,2)+"\\). La réponse est <b>"+fmtDF(ans,2)+" $</b>.",
    {mode:"unit-rate-cost", q1:q1, q2:q2});
}, ["Le coût d'une seule unité est le pont entre les deux quantités.", "Divise le coût du paquet par la taille du paquet pour obtenir le taux unitaire, puis multiplie par la nouvelle quantité."]);

E("u5-ratio-part-percent-gap", 5, ["6.28", "3.11"], 2, "gen", function(){
  var pair=pick([[1,3],[3,1],[1,4],[4,1],[2,3],[3,2],[3,7],[7,3],[1,9],[9,1],[4,6],[6,4],[2,8],[8,2]]);
  var sum=pair[0]+pair[1], big=Math.max(pair[0], pair[1]);
  var A=sum*ri(20,120);
  var bigPart=A*big/sum;
  var pct=big*100/sum;
  var ctx=pick([["Un club scolaire partage"," entre son équipe d'art et son équipe de musique"],["Une équipe de sentier partage"," entre deux équipes de travail"],["Une boulangerie partage"," entre ses deux fours"]]);
  return numq(ctx[0]+" "+fmtD(A)+" $ dans le rapport "+pair[0]+" : "+pair[1]+ctx[1]+". La plus grande part représente quel pourcentage du montant total ?", pct, 0.01,
    "Trouve d'abord la plus grande part. Le rapport a "+sum+" parties en tout, donc chaque partie vaut \\("+fmtD(A)+" \\div "+sum+" = "+fmtD(A/sum)+"\\), et la plus grande part vaut \\("+big+" \\times "+fmtD(A/sum)+" = "+fmtD(bigPart)+"\\). Exprime-la ensuite en pourcentage du tout : \\[ \\begin{aligned} \\text{pourcentage} &= "+fmtD(bigPart)+" \\div "+fmtD(A)+" \\times 100 \\\\ &= "+fmtD(pct)+"\\% \\end{aligned} \\] La réponse est <b>"+fmtD(pct)+" %</b>.",
    {mode:"ratio-part-percent", pair:pair.join(":"), A:A});
}, ["Travaille avec les parts elles-mêmes avant de transformer une part en pourcentage.", "Additionne les parties du rapport, trouve la valeur de la plus grande part, puis divise-la par le montant total."]);

E("u5-find-whole-mc-gap", 5, ["6.1"], 2, "gen", function(){
  var W=0, p=0, part=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    W=pick([200,300,400,500,600]);
    p=pick([12,15,16,20,24,25,30,32,40,48,50,60,64,75,80]);
    part=W*p/100;
    if(part!==Math.round(part) || part<10) continue;
    if((part*p)%100!==0) continue;
    var vals=[W, part*p, part*p/100, W/100];
    if(new Set(vals.map(function(v){ return fmtD(v); })).size<4) continue;
    ok=true;
  }
  if(!ok){ W=400; p=20; part=80; }
  var ctxs=[
    {q:part+" élèves représentent "+p+" % des élèves d'une école. Combien d'élèves y a-t-il dans l'école ?", unit:"élèves"},
    {q:"Une équipe a marqué "+part+" points, ce qui est "+p+" % des points qu'il lui faut pour une bannière. Combien de points l'équipe doit-elle marquer en tout ?", unit:"points"},
    {q:"Après une vente du matin, il restait "+part+" billets non vendus, et c'est "+p+" % des billets imprimés. Combien de billets ont été imprimés ?", unit:"billets"}
  ];
  var cx=pick(ctxs);
  return mcq(cx.q,
    {t:fmtD(W), fb:"Oui : la partie est divisée par le pourcentage écrit en nombre décimal pour retrouver le tout."},
    [{t:fmtD(part*p), fb:"Cela multiplie la partie par le nombre entier du pourcentage, ce qui agrandit la partie au lieu de retrouver le tout."},
     {t:fmtD(part*p/100), fb:"Cela trouve le pourcentage de la partie elle-même, ce qui est plus petit que la partie."},
     {t:fmtD(W/100), fb:"Cela divise la partie par le nombre du pourcentage sans d'abord écrire le pourcentage en nombre décimal."}],
    "La partie et son pourcentage donnent le tout quand la partie est divisée par le pourcentage en nombre décimal : \\[ \\begin{aligned} \\text{total} &= "+part+" \\div "+fmtD(p/100,2)+" \\\\ &= "+W+" \\end{aligned} \\] La réponse est <b>"+W+" "+cx.unit+"</b>.",
    {mode:"find-whole-mc", p:p, part:part});
}, ["Le montant donné est seulement le pourcentage nommé du tout, donc le tout est plus grand que la partie.", "Écris d'abord le pourcentage en nombre décimal, puis divise la partie par ce nombre décimal."]);

/* Unit 6: Linear Equations and Graphing */
E("u6-decimal-coefficient-gap", 6, ["8.1", "8.4"], 2, "gen", function(){
  var a=pick([0.2,0.25,0.4,0.5,0.75,1.25,1.5,2.5]);
  var x=ri(3,16);
  var b=pick([0.5,1,1.5,2,2.5,3,4,5,6,7,8]);
  var ax=a*x, c=ax+b;
  return numq("Résous l'équation \\("+fmtD(a)+"x + "+fmtD(b)+" = "+fmtD(c)+"\\). Quelle est la valeur de x ?", x, 0.01,
    "Défais les étapes dans l'ordre inverse : soustrais d'abord, puis divise : \\[ \\begin{aligned} "+fmtD(a)+"x + "+fmtD(b)+" &= "+fmtD(c)+" \\\\ "+fmtD(a)+"x &= "+fmtD(c)+" - "+fmtD(b)+" \\\\ "+fmtD(a)+"x &= "+fmtD(ax)+" \\\\ x &= "+fmtD(ax)+" \\div "+fmtD(a)+" \\\\ x &= "+fmtD(x)+" \\end{aligned} \\] La réponse est <b>\\(x = "+fmtD(x)+"\\)</b>.",
    {mode:"decimal-coefficient", a:a, b:b});
}, ["Défais ce qui a été fait à x dans l'ordre inverse : le nombre ajouté part en premier.", "Soustrais la constante des deux côtés, puis divise les deux côtés par le coefficient décimal de x."]);

E("u6-two-points-evaluate-gap", 6, ["7.2", "7.3"], 2, "gen", function(){
  var m=pick([-4,-3,-2,-1,1,2,3,4]);
  var b=ri(-8,10);
  var x1=ri(-2,3), dx=ri(2,4), x2=x1+dx;
  var y1=m*x1+b, y2=m*x2+b;
  var x3=(Math.random()<0.5)?(x2+ri(1,4)):(x1-ri(1,3));
  var ans=m*x3+b;
  return numq("Une relation linéaire passe par les points ("+x1+", "+y1+") et ("+x2+", "+y2+"). Quelle est la valeur de y de cette relation quand x = "+x3+" ?", ans, 0.01,
    "Extrais d'abord le taux de variation des deux points : \\[ \\begin{aligned} \\text{taux} &= \\frac{"+y2+" - "+u2sg(y1)+"}{"+x2+" - "+u2sg(x1)+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+m+" \\end{aligned} \\] La relation est \\(y = "+fmtD(m)+"x + "+u2sg(b)+"\\), donc à \\(x = "+x3+"\\) : \\(y = "+fmtD(m)+" \\times "+u2sg(x3)+" + "+u2sg(b)+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {mode:"two-points-evaluate", x1:x1, y1:y1, x2:x2, y2:y2, x3:x3});
}, ["Les deux points cachent le taux de variation, qui doit être retrouvé avant de pouvoir utiliser la relation.", "Trouve d'abord le taux de variation à partir des deux points, puis construis la relation et remplace le nouveau x."]);

/* Unit 7: Data Analysis and Probability */
E("u7-expected-count-gap", 7, ["12.4", "12.2"], 2, "gen", function(){
  var S=pick([4,5,8,10,20]), F=ri(1,S-1);
  var colour=pick(["rouge","bleue","verte","dorée","violette","orange"]);
  var k=ri(3,12), N=2*S*k, ans=F*k;
  return numq("Une pièce de monnaie est lancée et une roulette à "+S+" sections égales, dont "+F+" de couleur "+colour+", est tournée en même temps. Cette paire d'actions est répétée "+N+" fois. Combien de fois t'attendrais-tu à obtenir face et la couleur "+colour+" ensemble ?", ans, 0.01,
    "Le lancer et la roulette sont indépendants, alors multiplie leurs probabilités, puis mets le résultat à l'échelle du nombre de répétitions : \\[ \\begin{aligned} P &= "+FR(1,2)+" \\times "+FR(F,S)+" \\\\ &= "+FR(F,2*S)+" \\\\ \\text{attendu} &= "+FR(F,2*S)+" \\times "+N+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {mode:"expected-count", S:S, F:F, N:N});
}, ["Un nombre attendu commence par la probabilité de l'événement combiné.", "Multiplie d'abord les deux probabilités séparées, puis multiplie par le nombre de répétitions."]);

E("u7-missing-mean-value-gap", 7, ["11.1"], 2, "gen", function(){
  var vals=null, fifth=0, mean=0;
  for(var att=0; att<400 && !vals; att++){
    var vs=[ri(4,30), ri(4,30), ri(4,30), ri(4,30)], f=ri(4,30);
    var tot=vs[0]+vs[1]+vs[2]+vs[3]+f;
    if(tot%5===0){ vals=vs; fifth=f; mean=tot/5; }
  }
  if(!vals){ vals=[12,18,10,20]; fifth=15; mean=15; }
  var sum4=vals[0]+vals[1]+vals[2]+vals[3];
  return numq("Un joueur a marqué "+vals[0]+", "+vals[1]+", "+vals[2]+" et "+vals[3]+" points dans les quatre premiers matchs d'un tournoi. La moyenne sur cinq matchs était de "+mean+" points. Combien de points le joueur a-t-il marqués dans le cinquième match ?", fifth, 0.01,
    "La moyenne fixe d'abord le total des cinq matchs : \\[ \\begin{aligned} \\text{total} &= 5 \\times "+mean+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] Les quatre premiers matchs totalisent "+sum4+" points, donc le cinquième match est \\("+(5*mean)+" - "+sum4+" = "+fifth+"\\). La réponse est <b>"+fifth+"</b>.",
    {mode:"missing-mean-value", vals:vals.join(","), mean:mean});
}, ["Une moyenne sur cinq matchs fixe le total des cinq pointages, pas seulement le manquant.", "Multiplie la moyenne par cinq pour obtenir le total, puis soustrais les quatre pointages connus."]);

E("u7-mean-difference-gap", 7, ["11.1"], 2, "gen", function(){
  var A=null, B=null, meanA=0, meanB=0, ans=0;
  for(var att=0; att<400 && !A; att++){
    var as=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var bs=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var sa=as.reduce(function(x,y){return x+y;},0), sb=bs.reduce(function(x,y){return x+y;},0);
    if(Math.abs(sa-sb)>=5){ A=as; B=bs; meanA=sa/5; meanB=sb/5; ans=Math.round(Math.abs(meanA-meanB)*10)/10; }
  }
  if(!A){ A=[10,12,14,16,18]; B=[6,8,10,12,14]; meanA=14; meanB=10; ans=4; }
  return numq("Deux joueurs notent leurs points dans cinq matchs. Le premier joueur a marqué "+A.join(", ")+". Le deuxième joueur a marqué "+B.join(", ")+". De combien de points les deux moyennes diffèrent-elles ?", ans, 0.01,
    "Trouve chaque moyenne séparément : \\[ \\begin{aligned} \\text{moyenne du premier} &= "+fmtD(meanA,1)+" \\\\ \\text{moyenne du deuxième} &= "+fmtD(meanB,1)+" \\end{aligned} \\] La différence est \\("+fmtD(Math.max(meanA,meanB),1)+" - "+fmtD(Math.min(meanA,meanB),1)+" = "+fmtD(ans,1)+"\\). La réponse est <b>"+fmtD(ans,1)+"</b>.",
    {mode:"mean-difference", A:A.join(","), B:B.join(",")});
}, ["Chaque ensemble de données a sa propre moyenne, et la question compare les deux moyennes.", "Totalise chaque ensemble de cinq pointages et divise par cinq, puis soustrais la plus petite moyenne de la plus grande."]);

E("u7-two-colours-twice-gap", 7, ["12.4", "12.1"], 2, "gen", function(){
  var a=ri(6,14); if(a===10) a=11;
  var b=20-a;
  var pair=pick([["rouges","bleues"],["vertes","dorées"],["blanches","noires"],["violettes","orange"]]);
  var item=pick(["billes","jetons","perles"]);
  var ans=(a*a+b*b)/4;
  return numq("Un sac contient "+a+" "+item+" de couleur "+pair[0]+" et "+b+" de couleur "+pair[1]+", pour un total de 20 "+item+". On en pige un, on le remet, puis on en pige un autre. Quelle est la probabilité que les deux tirages donnent la même couleur ? Donne ta réponse en pourcentage.", ans, 0.01,
    "La même couleur peut arriver de deux façons, et les tirages sont indépendants : \\[ \\begin{aligned} P &= "+FR(a,20)+" \\times "+FR(a,20)+" + "+FR(b,20)+" \\times "+FR(b,20)+" \\\\ &= "+FR(a*a,400)+" + "+FR(b*b,400)+" \\\\ &= "+fmtD(ans)+"\\% \\end{aligned} \\] La réponse est <b>"+fmtD(ans)+" %</b>.",
    {mode:"two-colours-twice", a:a, b:b});
}, ["La même couleur peut arriver de plus d'une façon, et chaque façon est un produit de deux tirages.", "Trouve la probabilité de la première couleur deux fois et de la deuxième couleur deux fois, puis additionne-les."]);

E("u7-survey-scale-gap", 7, ["12.2"], 2, "gen", function(){
  var n=pick([20,25,40,50]), s=ri(2,n-2);
  var mult=ri(6,18), N=n*mult, ans=s*mult;
  var mode=pick(["viennent à l'école à pied","prennent l'autobus pour l'école","apportent un dîner de la maison"]);
  var modeVerb=pick(["viennent à l'école à pied","prennent l'autobus pour l'école","apportent un dîner de la maison"]);
  return numq("Dans un sondage, "+s+" des "+n+" élèves interrogés ont dit qu'ils "+mode+". L'école entière compte "+fmtD(N)+" élèves. D'après le sondage, combien d'élèves de l'école t'attendrais-tu à ce qu'ils "+modeVerb+" ?", ans, 0.01,
    "Le sondage donne d'abord une proportion : \\("+FR(s,n)+"\\) des élèves. Mets cette proportion à l'échelle de l'école entière : \\[ \\begin{aligned} \\text{attendu} &= "+FR(s,n)+" \\times "+fmtD(N)+" \\\\ &= "+ans+" \\end{aligned} \\] La réponse est <b>"+ans+"</b>.",
    {mode:"survey-scale", n:n, s:s, N:N});
}, ["La fraction du sondage décrit l'échantillon, et la question porte sur l'école entière.", "Écris d'abord le résultat du sondage en fraction, puis multiplie-la par la population de l'école."]);

E("u7-combined-mean-gap", 7, ["11.1"], 2, "gen", function(){
  var n1=0, m1=0, n2=0, m2=0, ans=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    n1=pick([4,5,6]); m1=ri(8,20); n2=pick([4,5,6]); m2=ri(8,20);
    if(m1===m2) continue;
    var tot=n1*m1+n2*m2, cnt=n1+n2;
    if((2*tot)%cnt!==0) continue;
    ans=tot/cnt; ok=true;
  }
  if(!ok){ n1=5; m1=14; n2=5; m2=18; ans=16; }
  return numq("Le groupe un a "+n1+" élèves avec une note moyenne de "+m1+" à un test. Le groupe deux a "+n2+" élèves avec une note moyenne de "+m2+" au même test. Quelle est la note moyenne des deux groupes combinés ?", ans, 0.01,
    "Retrouve le total de chaque groupe à partir de sa moyenne avant de combiner : \\[ \\begin{aligned} \\text{total du groupe un} &= "+n1+" \\times "+m1+" = "+(n1*m1)+" \\\\ \\text{total du groupe deux} &= "+n2+" \\times "+m2+" = "+(n2*m2)+" \\\\ \\text{moyenne combinée} &= \\frac{"+(n1*m1+n2*m2)+"}{"+(n1+n2)+"} \\\\ &= "+fmtD(ans)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans)+"</b>.",
    {mode:"combined-mean", n1:n1, m1:m1, n2:n2, m2:m2});
}, ["Une moyenne combinée est un total divisé par un total, pas la moyenne des deux moyennes.", "Multiplie chaque moyenne par la taille de son groupe pour obtenir les totaux, puis additionne les totaux et les tailles."]);

E("u7-two-events-mc-gap", 7, ["12.3", "12.4"], 2, "gen", function(){
  var S1=0, F1=0, S2=0, F2=0, ok=false;
  var correct=0, add=0, first=0, second=0;
  for(var att=0; att<400 && !ok; att++){
    S1=pick([4,5,8,10]); F1=ri(1,S1-1); S2=pick([4,5,8,10,20]); F2=ri(1,S2-1);
    correct=F1*F2*100/(S1*S2); add=(F1/S1+F2/S2)*100; first=F1/S1*100; second=F2/S2*100;
    if(add>100) continue;
    var strs=[correct, add, first, second].map(function(v){ return fmtDF(v,2); });
    if(new Set(strs).size<4) continue;
    ok=true;
  }
  if(!ok){ S1=8; F1=3; S2=10; F2=4; correct=15; add=77.5; first=37.5; second=40; }
  var c1=pick(["rouge","bleue","verte","dorée"]), c2=pick(["violette","orange","blanche","noire"]);
  return mcq("Une roulette a "+S1+" sections égales dont "+F1+" de couleur "+c1+", et une deuxième roulette a "+S2+" sections égales dont "+F2+" de couleur "+c2+". Les deux roulettes sont tournées. Quelle est la probabilité d'obtenir la couleur "+c1+" sur la première roulette et la couleur "+c2+" sur la deuxième roulette ?",
    {t:fmtDF(correct,2)+" %", fb:"Oui : les tours sont indépendants, alors les deux probabilités sont multipliées."},
    [{t:fmtDF(add,2)+" %", fb:"Cela additionne les deux probabilités; les probabilités d'événements indépendants combinés sont multipliées, pas additionnées."},
     {t:fmtDF(first,2)+" %", fb:"C'est la probabilité de la première roulette seulement; la deuxième roulette doit aussi tomber sur sa couleur."},
     {t:fmtDF(second,2)+" %", fb:"C'est la probabilité de la deuxième roulette seulement; la première roulette doit aussi tomber sur sa couleur."}],
    "Les tours sont indépendants, alors multiplie : \\[ \\begin{aligned} P &= "+FR(F1,S1)+" \\times "+FR(F2,S2)+" \\\\ &= "+fmtD(correct,2)+"\\% \\end{aligned} \\] La réponse est <b>"+fmtDF(correct,2)+" %</b>.",
    {mode:"two-events-mc", S1:S1, F1:F1, S2:S2, F2:F2});
}, ["Deux tours ne s'influencent pas, alors c'est un produit de deux probabilités simples.", "Écris d'abord la probabilité de chaque roulette, puis multiplie-les et écris le résultat en pourcentage."]);

/* Unit 8: Geometry */
E("u8-hidden-cubes-gap", 8, ["10.9", "10.17"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 10, 20);
  var tot=u8Sum(hm);
  var stacks=0; hm.forEach(function(row){ row.forEach(function(v){ if(v>0) stacks++; }); });
  var ans=tot-stacks;
  var cell=26, body=u8T(160, 14, "Objet (nombres = cubes sur chaque case)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Carte des hauteurs d'un objet en cubes");
  var q=numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Dans la vue de dessus de l'objet, seul le cube du haut de chaque pile paraît. Combien de cubes ne sont PAS visibles dans la vue de dessus ?", ans, 0,
    "Compte d'abord tous les cubes : les piles totalisent "+fmtD(tot)+" cubes. La vue de dessus montre un cube pour chaque pile qui a au moins un cube, et il y a "+stacks+" telles piles. Donc les cubes cachés sont \\("+fmtD(tot)+" - "+stacks+" = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {mode:"hidden-cubes", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["La vue de dessus cache chaque cube sauf celui du haut de chaque pile.", "Additionne tous les nombres pour le total, puis soustrais le nombre de piles qui contiennent au moins un cube."]);

E("u8-rotated-side-view-gap", 8, ["10.10", "10.16"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 6, 12);
  var turns=pick([1,2,3]);
  var rot=u8RotHM(hm, turns);
  var prof=u8SideProf(rot), ans=u8SumArr(prof);
  var dirWord=turns===1 ? "90° dans le sens horaire" : (turns===2 ? "180°" : "90° dans le sens antihoraire");
  var cell=24, body=u8T(160, 14, "Objet avant le tour (nombres = cubes)", 11, true);
  body+=u8HM(hm, 124, 30, cell);
  var fig=u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes avant une rotation");
  var q=numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. L'objet est tourné de "+dirWord+" sur la table, vu de dessus, puis on dessine la vue de côté droit. Combien de cases paraissent dans cette vue de côté ?", ans, 0,
    "Tourne d'abord la carte de "+dirWord+". Dans la vue de côté, chaque rangée de la carte tournée contribue sa pile la plus haute, ce qui donne les hauteurs "+u8ProfStr(prof)+" : \\[ \\begin{aligned} \\text{cases} &= "+prof.join(" + ")+" \\\\ &= "+fmtD(ans)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans)+"</b>.",
    {mode:"rotated-side-view", hm:u8Key(hm), turns:turns});
  q.figure=fig;
  return q;
}, ["La rotation change quelles piles s'alignent dans la vue de côté, alors tourne la carte avant de la lire.", "Tourne d'abord la carte des hauteurs, puis prends la pile la plus haute de chaque rangée de la carte tournée et additionne-les."]);

E("u8-tiles-at-point-gap", 8, ["10.4"], 2, "gen", function(){
  var scenarios=[[3,6,1,4],[3,6,2,2],[3,4,2,3],[8,4,1,2],[4,3,3,2],[4,8,2,1],[12,3,1,2],[6,3,2,2]];
  var sc=pick(scenarios);
  var nA=sc[0], nB=sc[1], kB=sc[2], ans=sc[3];
  var angA=u8Interior(nA), angB=u8Interior(nB);
  var ctx=pick(["tuiles de plancher","pierres de patio","blocs de courtepointe","tuiles de mosaïque","tuiles de salle de bain","pavés de jardin","tuiles d'art de classe","tuiles de terrasse de piscine"]);
  var q=numq("Un motif fait de "+ctx+" utilise des tuiles en polygones réguliers autour d'un seul point, sans espaces ni chevauchements. "+kB+" tuile"+(kB===1?"":"s")+" en forme de "+U8_POLY_NAMES[nB]+" "+(kB===1?"est placée":"sont placées")+" au point, et chaque tuile en forme de "+U8_POLY_NAMES[nB]+" a un angle intérieur de "+fmtD(angB)+" degrés. Le reste du point est rempli de tuiles en forme de "+U8_POLY_NAMES[nA]+". Combien de tuiles en forme de "+U8_POLY_NAMES[nA]+" se rencontrent au point ?", ans, 0,
    "Trouve d'abord l'angle intérieur d'un "+U8_POLY_NAMES[nA]+" : \\[ \\begin{aligned} \\text{angle intérieur} &= \\frac{("+nA+" - 2) \\times 180°}{"+nA+"} \\\\ &= "+fmtD(angA)+"° \\end{aligned} \\] Les tuiles placées couvrent \\("+kB+" \\times "+fmtD(angB)+"° = "+fmtD(kB*angB)+"°\\), ce qui laisse \\(360° - "+fmtD(kB*angB)+"° = "+fmtD(360-kB*angB)+"°\\). Ensuite \\("+fmtD(360-kB*angB)+"° \\div "+fmtD(angA)+"° = "+ans+"\\). La réponse est <b>"+ans+"</b>.",
    {mode:"tiles-at-point", nA:nA, nB:nB, kB:kB}); q.figure=m8PolyRowSVG([[nB,null],[nA,null]]); return q;
}, ["Les angles autour d'un point totalisent 360 degrés, et l'angle de la deuxième forme est donné tandis que celui de la première ne l'est pas.", "Trouve l'angle intérieur de la première forme à partir de son nombre de côtés, puis soustrais les angles des tuiles placées de 360 et divise."]);

E("u8-cube-volume-gap", 8, ["10.17"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 7, 14);
  var tot=u8Sum(hm), ans=tot*8;
  var cell=26, body=u8T(160, 14, "Construis cet objet (nombres = cubes sur chaque case)", 11, true);
  body+=u8HM(hm, 121, 30, cell);
  var fig=u8Svg(320, 112, body, "Carte des hauteurs d'un objet en cubes à construire");
  var flat=hm[0].concat(hm[1]);
  var q=numq("Le diagramme est le plan d'un objet en cubes : chaque nombre indique combien de cubes sont empilés sur cette case. L'objet est construit avec des cubes de 2 cm de côté. Quel est le volume total de l'objet, en centimètres cubes ?", ans, 0,
    "Additionne la pile sur chaque case pour compter les cubes : \\("+flat.join(" + ")+" = "+tot+" \\) cubes. Chaque cube a un volume de \\(2 \\times 2 \\times 2 = 8\\) cm\\(^{3}\\), donc le volume total est \\("+tot+" \\times 8 = "+ans+"\\). La réponse est <b>"+ans+" cm\\(^{3}\\)</b>.",
    {mode:"cube-volume", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["Le plan donne un nombre de cubes, et la question demande un volume.", "Additionne les nombres pour compter les cubes, puis multiplie par le volume d'un cube de 2 cm."]);

E("u8-changed-side-view-gap", 8, ["10.15", "10.9"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 9, 18);
  var r=ri(0,2), c=ri(0,2), delta=ri(1,2);
  var mod=hm.map(function(row){ return row.slice(); });
  mod[r][c]+=delta;
  var prof=u8SideProf(mod), ans=u8SumArr(prof);
  var rowName=["arrière","du milieu","avant"][r], colName=["de gauche","du milieu","de droite"][c];
  var cell=26, body=u8T(160, 14, "Objet avant le changement (nombres = cubes)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Carte des hauteurs d'un objet en cubes avant un changement");
  var q=numq("Le diagramme montre un objet en cubes sous forme de carte des hauteurs : chaque nombre indique combien de cubes sont empilés sur cette case. Ensuite, "+delta+" cube"+(delta===1?" est ajouté":"s sont ajoutés")+" à la pile dans la rangée "+rowName+", colonne "+colName+". Combien de cases paraissent dans la vue de côté droit après l'ajout des cubes ?", ans, 0,
    "Mets d'abord la carte des hauteurs à jour : la pile dans la rangée "+rowName+", colonne "+colName+" passe de "+hm[r][c]+" à "+mod[r][c]+". Dans la vue de côté droit, chaque rangée contribue sa pile la plus haute, ce qui donne les hauteurs "+u8ProfStr(prof)+" : \\[ \\begin{aligned} \\text{cases} &= "+prof.join(" + ")+" \\\\ &= "+fmtD(ans)+" \\end{aligned} \\] La réponse est <b>"+fmtD(ans)+"</b>.",
    {mode:"changed-side-view", hm:u8Key(hm), r:r, c:c, delta:delta});
  q.figure=fig;
  return q;
}, ["Les cubes ajoutés changent une pile avant que la vue de côté soit lue, alors mets d'abord la carte à jour.", "Additionne les nouveaux cubes à la pile nommée, puis prends la pile la plus haute de chaque rangée et additionne-les."]);



/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess Math 7 outcomes (working with the mean of a data set, Math 7 indicators 11.6 and 11.9); this bank mirrors Math 8, and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-8-fr.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u7-missing-mean-value-gap","u7-mean-difference-gap","u7-combined-mean-gap"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-calc-approx":3,"u1-diagonal-square":3,"u1-fence-perimeter-gap":3,"u1-garden-diagonal-gap":2,"u1-grid-distance-gap":2,"u1-hypotenuse":3,"u1-ladder-context":2,"u1-missing-leg":3,"u1-shortcut-saving-gap":3,"u1-square-plot-perimeter":2,"u1-square-side-perimeter-gap":3,"u1-triple-find":2,"u1-two-ladders-gap":3,"u2-chain-negative-divisor-gap":3,"u2-div-2by1":3,"u2-div-2by2":3,"u2-fifth-day-temp-gap":3,"u2-missing-factor-follow-gap":3,"u2-mixed-problem":2,"u2-mult-problem":3,"u2-ooo-brackets-num":3,"u2-ooo-num":2,"u2-sign-product-problem":2,"u2-square-minus-product-gap":2,"u2-two-divers-gap":3,"u3-area-decimal-gap":2,"u3-bottles-roundup-gap":3,"u3-chain-subtract-product-gap":3,"u3-divide-mixed-cr":3,"u3-divide-word-cr":2,"u3-mixed-multistep-cr":3,"u3-model-division-bar":3,"u3-mult-div-chain-cr":2,"u3-multiply-mixed-cr":3,"u3-order-of-ops-fractions":2,"u4-open-box-sa-gap":3,"u4-sa-cylinder":3,"u4-sa-open-tank":3,"u4-sa-problem-wrap":2,"u4-sa-rect-prism":3,"u4-sa-tri-prism":3,"u4-tank-litres-gap":2,"u4-vol-cylinder-diam":2,"u4-vol-tri-prism":2,"u5-discount-then-tax":3,"u5-down-then-up-gap":3,"u5-find-the-whole":3,"u5-percent-change":3,"u5-percent-of-number":3,"u5-percent-of-percent-quantity":2,"u5-rate-problem-solve":2,"u5-ratio-part-percent-gap":3,"u5-ratio-problem-solve":2,"u5-unit-rate-cost-gap":3,"u6-decimal-coefficient-gap":2,"u6-graph-extend-pair":2,"u6-missing-ordered-pair":2,"u6-missing-ordered-pair-backward":2,"u6-solve-context-problem":3,"u6-solve-distributive":3,"u6-solve-div-plus":2,"u6-solve-group-problem":3,"u6-solve-two-step":3,"u6-two-points-evaluate-gap":3,"u7-apparent-height-ratio":2,"u7-apply-rule-percent":2,"u7-combined-mean-gap":3,"u7-expected-count-gap":2,"u7-fix-the-graph":2,"u7-mean-difference-gap":3,"u7-missing-mean-value-gap":2,"u7-name-the-trick":3,"u7-same-colour-twice":3,"u7-survey-scale-gap":3,"u7-two-colours-twice-gap":3,"u7-two-draws-percent":3,"u7-two-spinners-decimal":3,"u8-around-point-num":3,"u8-build-max-num":3,"u8-changed-side-view-gap":3,"u8-cube-volume-gap":3,"u8-cubes-total-num":3,"u8-front-squares-num":3,"u8-hidden-cubes-gap":2,"u8-irregular-angle-num":2,"u8-mixed-point-num":2,"u8-rotate-front-num":2,"u8-rotated-side-view-gap":3,"u8-tiles-at-point-gap":3};
