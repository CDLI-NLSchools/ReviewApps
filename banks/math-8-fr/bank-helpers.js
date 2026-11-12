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
