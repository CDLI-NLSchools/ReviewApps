/* Math 8 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-8/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 8 bank helpers: FR, cut verbatim from the
   head of the standalone bank source (math-8-review/bank-src.js,
   lines 1 to 7), where it precedes the Unit 1 banner. */
/* Math 8 Review bank source. Full-course build, November 7, 2026, assembled
   from units/unit1.js to unit8.js. FR returns the raw \frac fragment for use
   INSIDE math delimiters, defined here for the entries that use it. CR_MARKS
   stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* Figure helpers added November 12, 2026 for the Math 8 geometry
   diagram pass (Units 1, 4 and 8, plus the pool-gap entries in
   bank-fix.js). Every helper takes its labels from the caller, built
   from the same drawn values as the question text, so a label can
   never disagree with the stem. A "?" label marks the unknown. */
function m8RectDiagSVG(w,h,labW,labH,labD){
  var sc=Math.min(225/Math.max(w,1),140/Math.max(h,1));
  var Wd=w*sc,Hd=h*sc,x0=(330-Wd)/2,y0=(215-Hd)/2;
  var mx=x0+Wd/2,my=y0+Hd/2,pl=Math.sqrt(Hd*Hd+Wd*Wd)||1;
  var ox=Hd/pl*17,oy=Wd/pl*17;
  var s='<svg viewBox="0 0 330 215" width="330" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: rectangle with its diagonal">';
  s+='<rect x="'+fmt(x0,1)+'" y="'+fmt(y0,1)+'" width="'+fmt(Wd,1)+'" height="'+fmt(Hd,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+fmt(x0,1)+'" y1="'+fmt(y0+Hd,1)+'" x2="'+fmt(x0+Wd,1)+'" y2="'+fmt(y0,1)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+=_txt(mx,y0+Hd+18,labW,13,false);
  s+=_txt(x0-18,my,labH,13,false);
  s+=_txt(mx-ox,my-oy,labD,14,true);
  return s+'</svg>';
}
function m8SquareAreaSVG(labArea){
  var s='<svg viewBox="0 0 330 195" width="330" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: square with its area marked">';
  s+='<rect x="100" y="25" width="130" height="130" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=_txt(165,90,labArea,15,true);
  s+=_txt(165,173,"?",14,true);
  return s+'</svg>';
}
function m8GridDistSVG(x1,y1,x2,y2){
  var xm=x2+1,ym=y2+1,cell=Math.min(230/Math.max(xm,1),165/Math.max(ym,1));
  var ox=45,oy=195;
  function X(v){return ox+v*cell;} function Y(v){return oy-v*cell;}
  var s='<svg viewBox="0 0 320 225" width="320" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: two points on a grid joined by a straight line">';
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
  var s='<svg viewBox="0 0 330 200" width="330" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: two ladders leaning against a wall from the same distance">';
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
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right rectangular prism">';
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
  var s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right cylinder">';
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
  var s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right cylinder with the area of its base marked">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(labBase){s+=_txt(150,52,labBase,11,true);}
  if(labH){s+=_txt(224,104,labH,13,false);}
  return s+'</svg>';
}
function m8TriPrismLabSVG(labA,labB,labL){
  var s='<svg viewBox="0 0 310 190" width="310" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right triangular prism">';
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
    var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right prism with the area of its base marked">';
    s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){s+=_txt(150,56,labBase,11,true);}
    if(labH){s+=_txt(56,115,labH,13,false);}
    return s+'</svg>';
  }
  if(kind==="tri"){
    var t='<svg viewBox="0 0 310 190" width="310" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right triangular prism with the area of its base marked">';
    t+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    t+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
    if(labBase){t+=_txt(182,94,labBase,11,true);}
    if(labH){t+=_txt(198,32,labH,13,false);}
    return t+'</svg>';
  }
  var g='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a right prism with the area of its base marked">';
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
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: the net of a right rectangular prism with the area of each face marked">';
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
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a net laid flat">';
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
  var s='<svg viewBox="0 0 320 195" width="320" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a prism built from stacked layers">';
  s+='<polygon points="105,66 121,49 231,49 215,66" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=0;i<n;i++){var y=66+i*17;s+='<rect x="105" y="'+y+'" width="110" height="17" fill="'+(i%2?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';}
  if(labBase){s+=_txt(160,66+n*17+18,labBase,12,true);}
  if(labH){s+=_txt(252,66+n*17/2,labH,12.5,false);}
  return s+'</svg>';
}
function m8TwoBaseSVG(labP,labQ){
  var s='<svg viewBox="0 0 330 195" width="330" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: two prisms with the same height and different bases">';
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
  var s='<svg viewBox="0 0 330 180" width="330" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: four storage tanks with their dimensions">';
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
  var s='<svg viewBox="0 0 320 125" width="320" height="125" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: regular polygons">';
  for(var i=0;i<items.length;i++){
    var n=items[i][0],cx=cw*i+cw/2,cy=55,R=Math.min(30,cw/2-9),pts=[];
    for(var k=0;k<n;k++){var t=-Math.PI/2+k*2*Math.PI/n;pts.push(fmt(cx+R*Math.cos(t),1)+","+fmt(cy+R*Math.sin(t),1));}
    s+='<polygon points="'+pts.join(" ")+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    if(items[i][1]){s+=_txt(cx,106,items[i][1],12,false);}
  }
  return s+'</svg>';
}
function m8NotchSquareSVG(){
  var s='<svg viewBox="0 0 280 170" width="280" height="170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagram: a square tile with a triangular notch cut from one side and the same triangle added to the opposite side">';
  s+='<polygon points="75,25 195,25 195,65 222,85 195,105 195,145 75,145 75,105 102,85 75,65" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  return s+'</svg>';
}

/* ----- bank-u1.js ----- */
// Math 8 Unit 1 Square Roots and the Pythagorean Theorem question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 8 to 377).
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
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square region '+s+' units by '+s+' units">';
  out+='<rect x="'+pad+'" y="'+pad+'" width="'+(s*cell)+'" height="'+(s*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<s;i++){out+='<line x1="'+(pad+i*cell)+'" y1="'+pad+'" x2="'+(pad+i*cell)+'" y2="'+(pad+s*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';out+='<line x1="'+pad+'" y1="'+(pad+i*cell)+'" x2="'+(pad+s*cell)+'" y2="'+(pad+i*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>';}
  out+=_txt(pad+s*cell/2,pad-12,s+" units",12,true);
  out+=_txt(10,pad+s*cell/2,s+"",12,true);
  return out+'</svg>';
}
function u1numLineSVG(lo,hi){
  var W=320,H=70,x0=35,x1=285,out="";
  function X(v){return x0+(v-lo)/(hi-lo)*(x1-x0);}
  out+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from '+lo+' to '+hi+'">';
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
  var opts=ds.map(function(d){return {t:String(d), fb:"That is not "+n+" times "+n+": multiply the number by itself."};});
  var mode=pick(["plain","tile","product"]);
  var prompt=(mode==="plain")?("What is \\("+n+"^{2}\\)?"):((mode==="tile")?("A square tile has sides of "+n+" cm. What is the area of the tile, in square centimetres?"):("What is the value of \\("+n+" \\times "+n+"\\)?"));
  return mcq(prompt, {t:String(sq), fb:"Yes: "+n+" times "+n+" equals "+sq+"."}, opts,
    "Squaring means multiplying the number by itself: \\[ \\begin{aligned} "+n+"^{2} &= "+n+" \\times "+n+" \\\\ &= "+sq+" \\end{aligned} \\] The square is <b>"+sq+"</b>.",
    {n:n, mode:mode});
}, ["Squaring a number means multiplying it by itself.", "Write the number times itself and multiply."]);

E("u1-sqrt-perfect", 1, ["5.2"], 1, "gen", function(){
  var r=ri(2,20); var n=r*r;
  var ds=u1d3(r,[r+1,r-1,r+2,Math.max(r-2,1),r+3]);
  var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+(d*d)+", not "+n+": try another value."};});
  var mode=pick(["plain","area","pairs"]);
  var prompt=(mode==="plain")?("What is \\(\\sqrt{"+n+"}\\)?"):((mode==="area")?("A square has an area of "+n+" square centimetres. What is its side length, in centimetres?"):("A number multiplied by itself gives "+n+". What is the number?"));
  var q=mcq(prompt, {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
    "Find the number that multiplies by itself to give "+n+": \\[ \\begin{aligned} "+r+" \\times "+r+" &= "+n+" \\\\ \\sqrt{"+n+"} &= "+r+" \\end{aligned} \\] The square root is <b>"+r+"</b>.",
    {r:r, n:n, mode:mode});
  q.figure=u1gridSVG(r);
  return q;
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Test small squares in order until one equals the number shown."]);

E("u1-perfect-square-region", 1, ["3.19"], 1, "gen", function(){
  var s=ri(2,14); var area=s*s;
  var ds=u1d3(area,[2*s,area+s,area-s,(s+1)*(s+1)]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Count the rows and columns: the region has "+s+" rows of "+s+" squares."};});
  var ctx=pick(["a square region built from small squares","a square patio built from paving stones in a grid","a square quilt block sewn from small squares","a square garden bed marked out in a grid"]);
  var q=mcq("The diagram shows "+ctx+". How many small squares are in the region?", {t:String(area), fb:"Yes: "+s+" rows with "+s+" squares in each row gives "+area+"."}, opts,
    "The region is "+s+" squares along each side, so it is a square array: \\[ \\begin{aligned} \\text{total} &= "+s+" \\times "+s+" \\\\ &= "+area+" \\end{aligned} \\] The region holds <b>"+area+" small squares</b>, so "+area+" is shown as the perfect square \\("+s+"^{2}\\).",
    {s:s});
  q.figure=u1gridSVG(s);
  return q;
}, ["A square region has the same number of squares along each side.", "Count the squares along one side, then multiply that count by itself."]);

E("u1-is-perfect-square", 1, ["3.20"], 1, "gen", function(){
  if(pick(["yes","no"])==="yes"){
    var r=ri(4,16); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" lies between neighbouring squares, so no whole number squares to it."};});
    return mcq("Which number is a perfect square?", {t:String(n), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
      "Only one value is a whole number times itself: \\("+r+" \\times "+r+" = "+n+"\\). The perfect square is <b>"+n+"</b>.",
      {mode:"yes", n:n});
  }
  var k=ri(4,15); var n=k*k+ri(1,2*k-1);
  return mcq("Which statement about the number "+n+" is correct?",
    {t:n+" lies between the squares "+(k*k)+" and "+((k+1)*(k+1))+", so it is not a perfect square", fb:"Yes: "+n+" sits between two neighbouring squares, so no whole number squares to it."},
    [{t:n+" is a perfect square, since it is close to the square "+(k*k), fb:"Close is not equal: a perfect square must be a whole number times itself exactly."},
     {t:n+" is a perfect square, since it ends in a digit that squares can end in", fb:"The last digit alone cannot prove it: compare with the neighbouring squares."},
     {t:n+" lies between the squares "+((k+1)*(k+1))+" and "+((k+2)*(k+2))+", so it is not a perfect square", fb:"Check the bracket: "+n+" is below "+((k+1)*(k+1))+", so that pair is too high."}],
    "The squares near "+n+" are \\("+k+"^{2} = "+(k*k)+"\\) and \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). Since "+n+" lies between them, no whole number squares to it. The correct statement is <b>"+n+" is not a perfect square</b>.",
    {mode:"no", n:n});
}, ["A perfect square is a whole number multiplied by itself.", "List the squares near each value and check which values appear in the list."]);

E("u1-factors-root", 1, ["5.1"], 1, "gen", function(){
  var r=ri(4,16); var n=r*r;
  var facs=[]; for(var d=1;d<=n;d++){ if(n%d===0){facs.push(d);} }
  var others=facs.filter(function(d){return d!==r;});
  var wrong=pick(others);
  var opts=[
    {t:String(wrong), fb:wrong+" is a factor, but "+wrong+" times "+wrong+" is not "+n+", so it is not the square root."},
    {t:String(n), fb:n+" is a factor, but a square root must multiply by itself to give "+n+"."},
    {t:String(2*r===n?n+1:2*r), fb:"Check the factor pairs: a square root pairs with itself."}
  ];
  var seenOpts={}; var clean=[]; opts.forEach(function(o){if(o.t!==String(r)&&!seenOpts[o.t]){seenOpts[o.t]=1;clean.push(o);}});
  while(clean.length<3){var cand=String(ri(2,20)); if(cand!==String(r)&&!seenOpts[cand]){seenOpts[cand]=1;clean.push({t:cand, fb:"That value does not pair with itself to give "+n+"."});}}
  var fmode=pick(["pairs","which","area","def"]);
  var fprompt=(fmode==="pairs")?(n+" has factor pairs that multiply to "+n+". Which factor is the square root of "+n+"?"):((fmode==="which")?("Which factor of "+n+" is its square root?"):((fmode==="area")?("A square with area "+n+" has whole-number side lengths among the factors of "+n+". Which factor gives the side length?"):("The factors of "+n+" can be listed in pairs. Which factor is the square root of "+n+"?")));
  return mcq(fprompt, {t:String(r), fb:"Yes: "+r+" pairs with itself, since "+r+" times "+r+" equals "+n+"."}, clean.slice(0,3),
    "List the factor pairs of "+n+". Every pair has two different factors except one: \\("+r+" \\times "+r+" = "+n+"\\). A square root is the factor that pairs with itself. The square root is <b>"+r+"</b>.",
    {r:r, n:n});
}, ["A square root is the factor that multiplies by itself to give the number.", "Write out the factor pairs and find the pair where both factors are the same."]);

E("u1-estimate-between", 1, ["6.30"], 1, "gen", function(){
  var n=u1nonSquare(10,200); var k=Math.floor(Math.sqrt(n));
  var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
  var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
  var q=mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
    "Use the perfect squares on each side as benchmarks: \\[ \\begin{aligned} "+k+"^{2} &= "+(k*k)+" \\\\ "+(k+1)+"^{2} &= "+((k+1)*(k+1))+" \\end{aligned} \\] Since "+(k*k)+" is less than "+n+", which is less than "+((k+1)*(k+1))+", the root lies between <b>"+k+" and "+(k+1)+"</b>.",
    {n:n, k:k});
  q.figure=u1numLineSVG(Math.max(k-1,0),k+2);
  return q;
}, ["Find the perfect squares just below and just above the number.", "Square whole numbers in order until their squares bracket the number."]);

E("u1-root-between-numbers", 1, ["6.31"], 1, "gen", function(){
  var a=ri(2,14); var b=a+ri(1,2);
  var m=a*a+ri(1,(b*b-a*a)-1);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", an endpoint rather than a value between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", an endpoint rather than a value between."},
            {t:String(b*b+ri(2,15)), fb:"Its square root is greater than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints to turn the question into a range: \\[ \\begin{aligned} "+a+"^{2} &= "+(a*a)+" \\\\ "+b+"^{2} &= "+(b*b)+" \\end{aligned} \\] Only "+m+" lies between those squares. The number is <b>"+m+"</b>.",
    {a:a, b:b, m:m});
}, ["Square the two given numbers to get a range for the number itself.", "Check which candidate falls between the two squares."]);

E("u1-calc-approx", 1, ["6.32"], 1, "gen", function(){
  var n=u1nonSquare(11,300);
  var ans=u1r1(Math.sqrt(n));
  return numq("Use a calculator to find \\(\\sqrt{"+n+"}\\), to one decimal place.", ans, 0.05,
    "A calculator gives a long decimal: \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmt(Math.sqrt(n))+" \\\\ &\\approx "+fmt(ans)+" \\end{aligned} \\] To one decimal place, the square root is <b>"+fmt(ans)+"</b>.",
    {n:n});
}, ["Enter the number and use the square root key on a calculator.", "Read the display, then round to one decimal place."]);

E("u1-why-approx", 1, ["6.33"], 1, "var", varset([
  function(){
    return mcq("A calculator shows \\(\\sqrt{5} \\approx 2.2360679\\). Why is the value on the screen an approximation?",
      {t:"Squaring 2.2360679 does not give exactly 5, only very close to 5", fb:"Right: the display is rounded, so its square misses 5 slightly."},
      [{t:"The calculator made an arithmetic mistake while finding the root", fb:"The calculator works properly: the limit is the size of the display."},
       {t:"The value is exact because it shows seven decimal places on screen", fb:"Many places still means rounded: the digits continue beyond them."},
       {t:"The number 5 has no square root, so the screen shows a rough guess", fb:"5 does have a square root: its decimal just never ends."}],
      "Squaring the screen value gives a result close to 5 but not equal to 5, because the true value continues past the display. The screen value is <b>an approximation because it is rounded</b>.",
      {mode:"sqrt5"});
  },
  function(){
    return mcq("A student says the exact value of \\(\\sqrt{11}\\) is 3.31662479, the value on the calculator screen. Why is the student wrong?",
      {t:"The true value has decimal digits that continue past the digits shown", fb:"Right: the screen shows only the first digits, rounded."},
      [{t:"The calculator rounded the last digit the wrong way on the screen", fb:"Either rounding direction still cuts the value off: that is the point."},
       {t:"The exact value of the root is 3.3, with only one decimal place", fb:"Roots do not stop at one place: this one keeps going."},
       {t:"The student copied the digits from the screen in the wrong order", fb:"The digits were copied fine: the value itself is incomplete."}],
      "The decimal for \\(\\sqrt{11}\\) never ends, so a screen can show only its first digits, rounded. The student is wrong because <b>the true value continues past the display</b>.",
      {mode:"sqrt11"});
  },
  function(){
    return mcq("For a project, a student uses 4.47 as the value of \\(\\sqrt{20}\\). Why is 4.47 called an approximation?",
      {t:"It is the true value rounded to two decimal places, not the full value", fb:"Right: 4.47 squared is 19.9809, close to 20 but not equal."},
      [{t:"It is an approximation because it was found with a calculator in class", fb:"The tool does not decide it: the rounding is what matters."},
       {t:"It is exact, since two decimal places are enough for the project work", fb:"Enough for a project can still be rounded rather than exact."},
       {t:"It is an approximation because the number 20 has no square root at all", fb:"20 does have a root: it just never terminates or repeats."}],
      "\\(4.47 \\times 4.47 = 19.9809\\), which is close to 20 but not equal to it. The value 4.47 is <b>an approximation because it is the true root rounded to two decimal places</b>.",
      {mode:"sqrt20"});
  }
]), ["Ask whether squaring the shown value gives back the starting number exactly.", "Square the shown value and compare it with the number under the root sign."]);

E("u1-pythag-model", 1, ["9.1"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  if(pick(["ab","ba"])==="ba"){ var tmp=tr[0]; tr[0]=tr[1]; tr[1]=tmp; }
  var a=tr[0], b=tr[1], c=tr[2];
  var punit=pick(["cm","m"]);
  var correct="\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)";
  var opts=[
    {t:"\\("+a+" + "+b+" = "+c+"\\)", fb:"The theorem uses squares of the sides, not the sides themselves."},
    {t:"\\("+a+"^{2} + "+c+"^{2} = "+b+"^{2}\\)", fb:"The hypotenuse squared stands alone: here "+c+" is the hypotenuse."},
    {t:"\\("+c+"^{2} - "+a+"^{2} = "+a+"^{2}\\)", fb:"Both legs are squared and added: check which sides are the legs."}
  ];
  var q=mcq("A right triangle has legs of "+a+" "+punit+" and "+b+" "+punit+" and a hypotenuse of "+c+" "+punit+", as shown. Which equation models the Pythagorean theorem for this triangle?", {t:correct, fb:"Yes: the squares of the two legs add to the square of the hypotenuse."}, opts,
    "The theorem says the squares of the legs add to the square of the hypotenuse: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ &= "+c+"^{2} \\end{aligned} \\] The modelling equation is <b>\\("+a+"^{2} + "+b+"^{2} = "+c+"^{2}\\)</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,c+" "+punit,b+" "+punit,a+" "+punit);
  return q;
}, ["The hypotenuse is the longest side, opposite the right angle.", "Square each leg, add them, and set the sum equal to the hypotenuse squared."]);

E("u1-hypotenuse", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41],[12,35,37]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has legs of "+a+" "+unit+" and "+b+" "+unit+", as shown in the diagram. Find the length of the hypotenuse, in "+unit+".", c, 0.01,
    "Use the Pythagorean theorem, with the hypotenuse as the unknown: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] The hypotenuse is <b>"+c+" "+unit+"</b>.",
    {a:a, b:b, c:c});
  q.figure=u1triFig(c,b,a,"?",b+" "+unit,a+" "+unit);
  return q;
}, ["The hypotenuse is opposite the right angle and is found from the two legs.", "Square both legs and add, then take the square root of the sum."]);

E("u1-missing-leg", 1, ["9.12"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
  var a=tr[0], b=tr[1], c=tr[2];
  var known=pick(["a","b"]); var knownLeg=(known==="a")?a:b; var unknown=(known==="a")?b:a;
  var unit=pick(["cm","m"]);
  var q=numq("A right triangle has a hypotenuse of "+c+" "+unit+" and one leg of "+knownLeg+" "+unit+", as shown in the diagram. Find the length of the other leg, in "+unit+".", unknown, 0.01,
    "Rearrange the theorem to solve for the missing leg: \\[ \\begin{aligned} b^{2} &= "+c+"^{2} - "+knownLeg+"^{2} \\\\ &= "+(c*c)+" - "+(knownLeg*knownLeg)+" \\\\ &= "+(unknown*unknown)+" \\\\ b &= "+unknown+" \\end{aligned} \\] The other leg is <b>"+unknown+" "+unit+"</b>.",
    {a:a, b:b, c:c, known:known});
  if(known==="a"){ q.figure=u1triFig(c,b,a,c+" "+unit,"?",a+" "+unit); }
  else { q.figure=u1triFig(c,b,a,c+" "+unit,b+" "+unit,"?"); }
  return q;
}, ["A missing leg is found by subtracting, not adding, the squares.", "Square the hypotenuse, subtract the square of the known leg, then take the square root."]);

E("u1-is-right", 1, ["9.13"], 1, "gen", function(){
  var isRight=pick([true,false]);
  var a,b,c;
  if(isRight){ var tr=pick([[3,4,5],[6,8,10],[5,12,13],[9,12,15],[8,15,17]]); a=tr[0]; b=tr[1]; c=tr[2]; }
  else { a=ri(3,9); b=ri(4,12); c=ri(b+1,17); var t=0; while(a*a+b*b===c*c&&t<40){c++;t++;} }
  var sum=a*a+b*b, csq=c*c;
  var ansTxt=isRight?"Yes, it is a right triangle":"No, it is not a right triangle";
  var opts=isRight?[
    {t:"No, it is not a right triangle", fb:"Check the sums: the squares of the two shorter sides add to the square of the longest side."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, if the longest side is at the bottom", fb:"Position does not matter: only the side lengths decide."}
  ]:[
    {t:"Yes, it is a right triangle", fb:"Check the sums: "+(a*a)+" + "+(b*b)+" is "+sum+", which does not equal "+csq+"."},
    {t:"It cannot be decided", fb:"Side lengths are enough: the theorem gives a yes or no test."},
    {t:"Yes, since the sides are close to a triple", fb:"Close is not enough: the squares must match exactly."}
  ];
  var q=mcq("A triangle has sides of "+a+" cm, "+b+" cm and "+c+" cm, as shown. Is it a right triangle?", {t:ansTxt, fb:isRight?"Yes: "+(a*a)+" + "+(b*b)+" equals "+csq+".":"Right: "+(a*a)+" + "+(b*b)+" is "+sum+", not "+csq+"."}, opts,
    "Test the longest side against the other two: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+sum+" \\\\ "+c+"^{2} &= "+csq+" \\end{aligned} \\] "+(isRight?"The two values are equal, so the triangle <b>is a right triangle</b>.":"The two values differ, so the triangle <b>is not a right triangle</b>."),
    {a:a, b:b, c:c, isRight:isRight});
  q.figure=u1triFig(c,b,a,c+" cm",b+" cm",a+" cm");
  return q;
}, ["Square the two shorter sides and compare their sum with the square of the longest side.", "Add the squares of the two shorter sides first."]);

E("u1-only-right", 1, ["9.2"], 1, "var", varset([
  function(){
    var q=mcq("A triangle has sides of 4 cm, 6 cm and 8 cm. A student uses \\(4^{2} + 6^{2} = 8^{2}\\) to find a side and gets a wrong answer. Why did the method fail?",
      {t:"The theorem only works for right triangles, and this triangle is not right", fb:"Right: 16 + 36 is 52, not 64, so the triangle has no right angle."},
      [{t:"The student added the sides in the wrong order when using the theorem", fb:"Order of adding does not matter here: the triangle itself is the problem."},
       {t:"The theorem needs the sides to be measured in metres, not centimetres", fb:"Units do not limit the theorem: the shape of the triangle does."},
       {t:"The student should have used the two longest sides as the legs of the triangle", fb:"Swapping sides still cannot fix it: the triangle is not right."}],
      "\\(4^{2} + 6^{2} = 52\\), while \\(8^{2} = 64\\). The values differ, so the triangle has no right angle, and the theorem does not apply. The method failed because <b>the theorem only works for right triangles</b>.",
      {mode:"not-right"}); q.figure=triSVG(8,6,4,{L:["A","B","C"],side:["8 cm","6 cm","4 cm"]}); return q;
  },
  function(){
    return mcq("Which statement about the Pythagorean theorem is correct?",
      {t:"It connects the sides of right triangles only", fb:"Right: the relationship holds exactly when the triangle has a right angle."},
      [{t:"It connects the sides of every triangle, right or not", fb:"Test a 2, 3, 4 triangle: 4 + 9 is not 16, so it fails there."},
       {t:"It connects equilateral triangles only", fb:"An equilateral triangle has no right angle, so the theorem cannot apply."},
       {t:"It connects the sides of triangles drawn with the right angle at the top", fb:"Position does not matter: having a right angle is what matters."}],
      "For any triangle with no right angle, the squares fail to match, as \\(2^{2} + 3^{2} = 13 \\ne 16 = 4^{2}\\) shows. The correct statement is <b>it connects the sides of right triangles only</b>.",
      {mode:"statement"});
  },
  function(){
    var q=mcq("A triangle has sides of 5 cm, 5 cm and 9 cm. A student applies the square test to it. What does the test show?",
      {t:"The test shows it is not right, since 25 + 25 does not equal 81", fb:"Right: the test itself shows the triangle has no right angle."},
      [{t:"The theorem cannot be used because two sides are equal in length", fb:"Equal legs are fine in a right triangle: the squares are the test."},
       {t:"The theorem cannot be used because the sides are odd numbers", fb:"Odd sides are fine: 9, 12, 15 uses odd sides and is right."},
       {t:"The theorem cannot be used because the triangle is too large", fb:"Size does not matter: only the square relationship matters."}],
      "\\(5^{2} + 5^{2} = 50\\), while \\(9^{2} = 81\\). Since the values differ, the triangle is not right, so <b>the theorem does not apply to it as a right triangle</b>.",
      {mode:"isosceles"}); q.figure=triSVG(9,5,5,{L:["A","B","C"],side:["9 cm","5 cm","5 cm"]}); return q;
  }
]), ["Test the square relationship first before trusting the theorem.", "Square the two shorter sides and compare with the square of the longest side."]);

E("u1-triple-find", 1, ["9.14"], 1, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29],[9,40,41]]);
  var k=ri(2,5); var a=base[0]*k, b=base[1]*k, c=base[2]*k;
  var miss=pick(["a","b","c"]); var ans=(miss==="a")?a:(miss==="b")?b:c;
  var givenTxt=(miss==="a")?("one leg of "+b+" cm and a hypotenuse of "+c+" cm"):((miss==="b")?("one leg of "+a+" cm and a hypotenuse of "+c+" cm"):("legs of "+a+" cm and "+b+" cm"));
  var q=numq("A right triangle is a scaled copy of the "+base[0]+", "+base[1]+", "+base[2]+" triple, scaled by a factor of "+k+". It has "+givenTxt+". Find the missing side length, in centimetres.", ans, 0.01,
    "Scale every side of the triple by "+k+": \\[ \\begin{aligned} "+base[0]+" \\times "+k+" &= "+a+" \\\\ "+base[1]+" \\times "+k+" &= "+b+" \\\\ "+base[2]+" \\times "+k+" &= "+c+" \\end{aligned} \\] The missing side is <b>"+ans+" cm</b>.",
    {base:base, k:k, miss:miss}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[(miss==="c"?"?":c+" cm"),(miss==="b"?"?":b+" cm"),(miss==="a"?"?":a+" cm")]}); return q;
}, ["Scaling a triple by the same factor keeps it a triple.", "Multiply each side of the base triple by the scale factor."]);

E("u1-ladder-context", 1, ["9.12"], 1, "gen", function(){
  var mode=pick(["reach","distance","foot"]);
  if(mode==="reach"){
    var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var kk=ri(1,4); var tr=[base[0]*kk,base[1]*kk,base[2]*kk];
    var foot=tr[0], height=tr[1], lad=tr[2];
    var place=pick(["in St. John's","in Gander","in Corner Brook","in Clarenville"]);
    var q=numq("A ladder "+lad+" m long leans against a wall "+place+". Its foot stands "+foot+" m from the wall, and the wall meets the ground at a right angle. How high up the wall does the ladder reach, in metres?", height, 0.01,
      "The ladder is the hypotenuse: \\[ \\begin{aligned} h^{2} &= "+lad+"^{2} - "+foot+"^{2} \\\\ &= "+(lad*lad)+" - "+(foot*foot)+" \\\\ &= "+(height*height)+" \\\\ h &= "+height+" \\end{aligned} \\] The ladder reaches <b>"+height+" m</b> up the wall.",
      {mode:"reach", foot:foot, height:height, lad:lad});
    q.figure=u1triFig(lad,height,foot,lad+" m",height+" m",foot+" m");
    return q;
  }
  if(mode==="foot"){
    var base3=pick([[3,4,5],[5,12,13],[8,15,17]]);
    var k3=ri(1,4); var ft=base3[0]*k3, ht=base3[1]*k3, ld=base3[2]*k3;
    var q3=numq("A support cable "+ld+" m long runs from the top of a pole to a point on level ground. The cable touches the ground level at the top of the pole, which is "+ht+" m tall, and the pole meets the ground at a right angle. How far from the base of the pole is the cable anchored, in metres?", ft, 0.01,
      "The cable is the hypotenuse: \\[ \\begin{aligned} f^{2} &= "+ld+"^{2} - "+ht+"^{2} \\\\ &= "+(ld*ld)+" - "+(ht*ht)+" \\\\ &= "+(ft*ft)+" \\\\ f &= "+ft+" \\end{aligned} \\] The anchor is <b>"+ft+" m</b> from the base.",
      {mode:"foot", ft:ft, ht:ht, ld:ld});
    q3.figure=u1triFig(ld,ht,ft,ld+" m",ht+" m","?");
    return q3;
  }
  var tr2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var sc=ri(1,4); var east=tr2[0]*sc, north=tr2[1]*sc, hyp=tr2[2]*sc;
  var q2=numq("A ferry dock lies "+east+" km east and "+north+" km north of a harbour, in a straight line across open water at a right angle to both legs of the trip. What is the straight-line distance from the harbour to the dock, in kilometres?", hyp, 0.01,
    "The straight line is the hypotenuse: \\[ \\begin{aligned} d^{2} &= "+east+"^{2} + "+north+"^{2} \\\\ &= "+(east*east)+" + "+(north*north)+" \\\\ &= "+(hyp*hyp)+" \\\\ d &= "+hyp+" \\end{aligned} \\] The straight-line distance is <b>"+hyp+" km</b>.",
    {mode:"distance", east:east, north:north, hyp:hyp});
  q2.figure=u1triFig(hyp,north,east,"?",north+" km",east+" km");
  return q2;
}, ["Draw the situation as a right triangle and mark the hypotenuse.", "Decide whether the unknown is a leg (subtract the squares) or the hypotenuse (add the squares)."]);

E("u1-right-test-decide", 1, ["9.13"], 3, "gen", function(){
  var mode=pick(["close-call","claim","swap"]);
  if(mode==="swap"){
    var tb=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
    var ks=ri(1,4); var sa=tb[0]*ks, sb=tb[1]*ks, sc2=tb[2]*ks;
    var optsS=[{t:"Yes, since the longest was squared first", fb:"Order of writing does not matter: what matters is that the sum matches."},
               {t:"No, all sides must differ", fb:"Legs may be equal in some right triangles, and here the square test passes."},
               {t:"No, since a triple must be unscaled", fb:"Scaling a triple by "+ks+" keeps the square relationship true."}];
    var sunit=pick(["cm","m"]);
    var q=mcq("A triangle has sides of "+sa+" "+sunit+", "+sb+" "+sunit+" and "+sc2+" "+sunit+". A student tests it by computing \\("+sb+"^{2} + "+sa+"^{2}\\) and comparing with \\("+sc2+"^{2}\\). Is the triangle a right triangle?", {t:"Yes, it is a right triangle", fb:"Right: "+(sa*sa)+" + "+(sb*sb)+" equals "+(sc2*sc2)+"."}, optsS,
      "Add the squares of the two shorter sides: \\[ \\begin{aligned} "+sa+"^{2} + "+sb+"^{2} &= "+(sa*sa+sb*sb)+" \\\\ "+sc2+"^{2} &= "+(sc2*sc2)+" \\end{aligned} \\] The values match, so the triangle <b>is a right triangle</b>.",
      {mode:"swap", a:sa, b:sb, c:sc2}); q.figure=triSVG(sc2,sb,sa,{L:["A","B","C"],side:[sc2+" "+sunit,sb+" "+sunit,sa+" "+sunit]}); return q;
  }
  if(mode==="close-call"){
    var tr=pick([[6,8,10],[9,12,15],[12,16,20],[5,12,13],[8,15,17],[20,21,29]]);
    var a=tr[0], b=tr[1], c=tr[2]+pick([-1,1]);
    if(c<=b){c=tr[2]+1;}
    var isR=(a*a+b*b===c*c);
    var ansTxt=isR?"Yes, it is right":"No, it is not right";
    var other=isR?"No, it is not right":"Yes, it is right";
    var opts=[{t:other, fb:"Compute both sides: "+(a*a)+" + "+(b*b)+" is "+(a*a+b*b)+" and "+c+" squared is "+(c*c)+"."},
              {t:"Right only if it is marked", fb:"The lengths alone decide: the square test needs no drawing mark."},
              {t:"Not decidable", fb:"Nearly is decidable: the squares either match exactly or they do not."}];
    var cunit=pick(["m","cm"]);
    var q=mcq("A triangle has sides of "+a+" "+cunit+", "+b+" "+cunit+" and "+c+" "+cunit+". A classmate says it must be a right triangle because its sides are close to a familiar triple. Decide whether it is a right triangle.", {t:ansTxt, fb:"Right: "+(a*a)+" + "+(b*b)+" is "+(a*a+b*b)+", and "+c+" squared is "+(c*c)+"."}, opts,
      "Apply the test exactly: \\[ \\begin{aligned} "+a+"^{2} + "+b+"^{2} &= "+(a*a+b*b)+" \\\\ "+c+"^{2} &= "+(c*c)+" \\end{aligned} \\] "+(isR?"The values match, so it <b>is a right triangle</b>.":"The values do not match, so it is <b>not a right triangle</b>, even though it is close to a triple."),
      {mode:"close-call", a:a, b:b, c:c}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:[c+" "+cunit,b+" "+cunit,a+" "+cunit]}); return q;
  }
  var t2=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25]]);
  var kk2=ri(1,4); var a2=t2[0]*kk2, b2=t2[1]*kk2, c2=t2[2]*kk2;
  var opts2=[{t:"The claim is wrong: the longest side must be squared on its own first", fb:"Squaring a shorter side alone proves nothing about the triangle."},
             {t:"The claim is wrong: the sides must be added together before squaring", fb:"Adding first gives a different value, not the theorem test."},
             {t:"The claim is right: any matching square by itself proves a right angle", fb:"One square matching by itself is not the test: the sum must match."}];
  var q=mcq("To test whether a triangle with sides "+a2+", "+b2+" and "+c2+" is right, a student checks only that \\("+b2+"^{2} = "+(b2*b2)+"\\) and claims this proves a right angle. Judge the claim.",
    {t:"The claim is wrong: the two shorter squares must add to the longest square", fb:"Right: "+(a2*a2)+" + "+(b2*b2)+" equals "+(c2*c2)+", and that full test is what proves it."}, opts2,
    "The full test compares a sum with the longest square: \\[ \\begin{aligned} "+a2+"^{2} + "+b2+"^{2} &= "+(a2*a2)+" + "+(b2*b2)+" \\\\ &= "+(c2*c2)+" = "+c2+"^{2} \\end{aligned} \\] One square on its own proves nothing. The claim is <b>wrong: the two shorter squares must add to the longest square</b>.",
    {mode:"claim", a:a2, b:b2, c:c2}); q.figure=triSVG(c2,b2,a2,{L:["A","B","C"],side:[c2+"",b2+"",a2+""]}); return q;
}, ["Closeness to a triple is not proof: the squares must match exactly.", "Compute the sum of the two shorter squares and the longest square, then compare."]);

E("u1-best-estimate", 1, ["6.30"], 3, "gen", function(){
  var n=u1nonSquare(20,150); var root=Math.sqrt(n);
  var best=u1r1(root);
  var vals=[u1r1(best-0.4), best, u1r1(best+0.4), u1r1(best+0.8)];
  var uniq=[]; vals.forEach(function(v){if(v>0&&uniq.indexOf(v)<0){uniq.push(v);}});
  while(uniq.length<4){uniq.push(u1r1(best+uniq.length));}
  var opts=uniq.filter(function(v){return v!==best;}).slice(0,3).map(function(v){return {t:fmtF(v,1), fb:"Square it: "+fmt(v)+" squared is "+fmt(Math.round(v*v*100)/100)+", farther from "+n+" than the best choice."};});
  var q=mcq("Which value is the best estimate of \\(\\sqrt{"+n+"}\\), to one decimal place?", {t:fmt(best), fb:"Yes: "+fmt(best)+" squared is "+fmt(Math.round(best*best*100)/100)+", closest to "+n+"."}, opts,
    "Bracket the root first, then test nearby tenths: \\[ \\begin{aligned} \\sqrt{"+n+"} &\\approx "+fmt(root)+" \\\\ &\\approx "+fmt(best)+" \\end{aligned} \\] The best estimate is <b>"+fmt(best)+"</b>.",
    {n:n, best:best});
  var k=Math.floor(root);
  q.figure=u1numLineSVG(k,k+1);
  return q;
}, ["Bracket the root between two whole numbers first.", "Square the nearby one-decimal values and pick the square closest to the number."]);

E("u1-diagonal-square", 1, ["9.12"], 3, "gen", function(){
  var s=ri(4,20);
  var diag=u1r1(s*Math.sqrt(2));
  var ctx=pick(["A square garden plot in Corner Brook","A square field near Bay Roberts","A square skating rink in Mount Pearl","A square classroom rug in a St. John's school"]);
  var q=numq(ctx+" has sides of "+s+" m. A line runs straight across it from one corner to the opposite corner. Find the length of that line, to one decimal place, in metres.", diag, 0.06,
    "The path is the hypotenuse of a right triangle with both legs equal to "+s+": \\[ \\begin{aligned} d^{2} &= "+s+"^{2} + "+s+"^{2} \\\\ &= "+(s*s)+" + "+(s*s)+" \\\\ &= "+(2*s*s)+" \\\\ d &= \\sqrt{"+(2*s*s)+"} \\approx "+fmt(diag)+" \\end{aligned} \\] The path is <b>"+fmt(diag)+" m</b> long.",
    {s:s}); q.figure=m8RectDiagSVG(s,s,s+" m",s+" m","?"); return q;
}, ["Split the square along the path: it becomes a right triangle with two equal legs.", "Square the side, double it, then take the square root and round."]);

E("u1-square-plot-perimeter", 1, ["5.2"], 3, "gen", function(){
  var r=ri(5,20); var area=r*r; var per=4*r;
  var ctx=pick(["A square vegetable plot","A square quilt top","A square sandbox","A square photo print"]);
  var edge=pick(["Fencing is placed around all four sides of it. How many metres of fencing are needed?","A border is sewn around all four sides of it. How many metres of border are needed?","Edging is placed around all four sides of it. How many metres of edging are needed?","A frame runs around all four sides of it. How many metres of framing are needed?"]);
  var q=numq(ctx+" has an area of "+area+" square metres. "+edge, per, 0.01,
    "Find the side length from the area first, then the perimeter: \\[ \\begin{aligned} \\text{side} &= \\sqrt{"+area+"} = "+r+" \\\\ \\text{fencing} &= 4 \\times "+r+" \\\\ &= "+per+" \\end{aligned} \\] The fencing needed is <b>"+per+" m</b>.",
    {r:r, area:area}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["The side of a square is the square root of its area.", "Find the side length first, then multiply by 4 for the four sides."]);

/* ----- bank-u2.js ----- */
// Math 8 Unit 2 Integers question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 378 to 817).
// CRMARKS: u2-div-2by1=3
// CRMARKS: u2-div-2by2=3
// CRMARKS: u2-mixed-problem=2
// CRMARKS: u2-mult-problem=3
// CRMARKS: u2-ooo-brackets-num=3
// CRMARKS: u2-ooo-num=2
// CRMARKS: u2-sign-product-problem=2
/* Unit 2: Integers */
// Unit 2: Integers (Math 8, NL). Entries only; helpers prefixed u2.
function u2sg(n) { return n < 0 ? "(" + n + ")" : "" + n; }
function u2word(n) { return n < 0 ? "negative " + Math.abs(n) : "" + n; }
// Build 3 distinct numeric distractors from candidate {v, fb} pairs, with offset fallbacks.
function u2dist(ans, cands) {
  var out = [], used = {};
  used[fmt(ans)] = 1;
  cands.forEach(function (c) {
    if (out.length >= 3) return;
    var k = fmt(c.v);
    if (!used[k]) { used[k] = 1; out.push({ t: k, fb: c.fb }); }
  });
  var offs = [1, -1, 2, -2, 10, -10, 5, -5];
  var i = 0;
  while (out.length < 3 && i < offs.length) {
    var v = ans + offs[i]; i++;
    var k2 = fmt(v);
    if (!used[k2]) { used[k2] = 1; out.push({ t: k2, fb: "This comes from an arithmetic slip in the calculation." }); }
  }
  return out;
}

// 1. L1, 6.17: model multiplication with integer chips, described in words.
E("u2-mult-model-chips", 2, ["6.17"], 1, "gen", function () {
  var g = ri(2, 6), m = ri(2, 7);
  if (Math.random() < 0.5) {
    var val = g * (-m);
    var prompt = "A chip model shows " + g + " equal groups. Each group holds " + m + " red chips, and each red chip stands for \\(-1\\). What product and value does the model show?";
    var solution = "There are " + g + " groups of \\(-" + m + "\\): \\[ \\begin{aligned} " + g + " \\times (-" + m + ") &= " + val + " \\end{aligned} \\] So the model shows the product <b>\\(" + g + " \\times (-" + m + ") = " + val + "\\)</b>.";
    return mcq(prompt,
      { t: fmt(val), fb: "Correct. The model shows " + g + " groups of negative " + m + "." },
      u2dist(val, [
        { v: -val, fb: "The sign is wrong. Groups of red (negative) chips give a negative total." },
        { v: g - m, fb: "That subtracts the group size from the number of groups instead of multiplying." },
        { v: -(g + m), fb: "That adds the two numbers instead of multiplying them." }
      ]),
      solution, { mode: "chips-groups", g: g, m: m });
  }
  var val2 = g * m;
  var prompt2 = "Starting from zero pairs, a student takes away " + g + " groups of " + m + " red chips, where each red chip stands for \\(-1\\). Taking away red chips is recorded as multiplying by \\(-" + g + "\\). What is the value of the model?";
  var solution2 = "Taking away " + g + " groups of \\(-" + m + "\\) is the product \\((-" + g + ") \\times (-" + m + ")\\). Two negatives give a positive: \\[ \\begin{aligned} (-" + g + ") \\times (-" + m + ") &= " + val2 + " \\end{aligned} \\] So the value of the model is <b>" + val2 + "</b>.";
  return mcq(prompt2,
    { t: fmt(val2), fb: "Correct. Removing groups of negative chips raises the value." },
    u2dist(val2, [
      { v: -val2, fb: "The sign is wrong. A negative times a negative gives a positive." },
      { v: m - g, fb: "That subtracts the numbers of groups instead of multiplying." },
      { v: g + m, fb: "That adds the two numbers instead of multiplying them." }
    ]),
    solution2, { mode: "chips-removal", g: g, m: m });
}, ["Count the groups first, then the value in each group.", "Red chips stand for negatives, and taking groups away is also a negative action."]);

// 2. L1, 6.18: apply the sign rule through a direct product.
E("u2-product-sign-apply", 2, ["6.18"], 1, "gen", function () {
  var a = 0, b = 0;
  while (a === 0) a = ri(-9, 9);
  while (b === 0) b = ri(-9, 9);
  var val = a * b;
  var prompt = "Evaluate: \\(" + u2sg(a) + " \\times " + u2sg(b) + "\\)";
  var signNote = (a < 0 && b < 0) ? "The signs are the same, so the product is positive."
    : (a < 0 || b < 0) ? "The signs are different, so the product is negative."
    : "Both factors are positive, so the product is positive.";
  var solution = signNote + " Multiply the sizes: \\[ \\begin{aligned} " + u2sg(a) + " \\times " + u2sg(b) + " &= " + val + " \\end{aligned} \\] So the product is <b>" + val + "</b>.";
  return mcq(prompt,
    { t: fmt(val), fb: "Correct. " + signNote },
    u2dist(val, [
      { v: -val, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: a + b, fb: "That adds the two numbers instead of multiplying them." },
      { v: a - b, fb: "That subtracts the two numbers instead of multiplying them." }
    ]),
    solution, { mode: "product-sign", a: a, b: b });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Multiply the sizes of the two numbers, then attach the sign."]);

// 3. L1, 6.22: apply the sign rule through a direct quotient.
E("u2-quotient-sign-apply", 2, ["6.22"], 1, "gen", function () {
  var d = 0;
  while (d === 0 || Math.abs(d) < 2) d = ri(-9, 9);
  var q = 0;
  while (q === 0 || Math.abs(q) < 2) q = ri(-9, 9);
  var dvd = d * q;
  var prompt = "Evaluate: \\(" + dvd + " \\div " + u2sg(d) + "\\)";
  var signNote = (dvd < 0 && d < 0) || (dvd > 0 && d > 0) ? "The signs are the same, so the quotient is positive." : "The signs are different, so the quotient is negative.";
  var solution = signNote + " Divide the sizes: \\[ \\begin{aligned} " + dvd + " \\div " + u2sg(d) + " &= " + q + " \\end{aligned} \\] So the quotient is <b>" + q + "</b>.";
  return mcq(prompt,
    { t: fmt(q), fb: "Correct. " + signNote },
    u2dist(q, [
      { v: -q, fb: "The size is right but the sign is wrong. Check whether the signs are the same or different." },
      { v: dvd - d, fb: "That subtracts the divisor instead of dividing." },
      { v: d, fb: "That just repeats the divisor. The quotient tells how many groups of the divisor fit." }
    ]),
    solution, { mode: "quotient-sign", d: d, q: q });
}, ["Decide the sign first: same signs give a positive, different signs give a negative.", "Divide the size of the first number by the size of the second, then attach the sign."]);

// 4. L2, 6.21: model division with chips or sharing, described in words.
E("u2-div-model-groups", 2, ["6.21"], 1, "gen", function () {
  var g = ri(2, 8), per = ri(2, 9);
  var total = -g * per;
  if (Math.random() < 0.5) {
    var prompt = "A chip model shows " + Math.abs(total) + " red chips (total value \\(" + total + "\\)) shared equally into " + g + " groups. What is the value of each group?";
    var solution = "Sharing \\(" + total + "\\) equally into " + g + " groups is division: \\[ \\begin{aligned} " + total + " \\div " + g + " &= " + (-per) + " \\end{aligned} \\] So each group has value <b>" + (-per) + "</b>.";
    return mcq(prompt,
      { t: fmt(-per), fb: "Correct. Each group holds " + per + " red chips." },
      u2dist(-per, [
        { v: per, fb: "The sign is wrong. The chips are red, so each group is negative." },
        { v: total + g, fb: "That adds instead of dividing the total into equal groups." },
        { v: -g, fb: "That gives the number of groups, not the value inside each group." }
      ]),
      solution, { mode: "div-sharing", g: g, per: per });
  }
  var prompt2 = "On a number line, a student makes equal jumps of \\(-" + per + "\\) starting at 0 and lands exactly on \\(" + total + "\\). How many jumps were made?";
  var solution2 = "Counting jumps of \\(-" + per + "\\) that reach \\(" + total + "\\) is division: \\[ \\begin{aligned} " + total + " \\div (-" + per + ") &= " + g + " \\end{aligned} \\] So the student made <b>" + g + "</b> jumps.";
  return mcq(prompt2,
    { t: fmt(g), fb: "Correct. The total divided by the jump size gives the number of jumps." },
    u2dist(g, [
      { v: -g, fb: "The count of jumps is positive. A negative divided by a negative gives a positive." },
      { v: per, fb: "That is the size of each jump, not how many jumps were made." },
      { v: Math.abs(total), fb: "That is the landing point's size, not the number of jumps." }
    ]),
    solution2, { mode: "div-grouping", g: g, per: per });
}, ["Sharing equally and counting equal groups are both division.", "Write the division the model shows, then use the sign rule."]);

// 5. L2, 6.19: which context matches a given product.
E("u2-mult-context-match", 2, ["6.19"], 1, "gen", function () {
  var r = ri(2, 9), n = ri(3, 8);
  var scens = [
    {
      ok: "The temperature falls " + r + " degrees each hour for " + n + " hours. The total change in temperature.",
      opp: "The temperature rises " + r + " degrees each hour for " + n + " hours. The total change in temperature.",
      add: "The temperature starts at " + (-r) + " degrees and then rises " + n + " degrees. The final temperature.",
      div: "A total temperature drop of " + (r * n) + " degrees is spread evenly over " + n + " hours. The drop each hour."
    },
    {
      ok: "A diver goes " + r + " metres deeper each minute for " + n + " minutes. The total change in the diver's depth.",
      opp: "A diver rises " + r + " metres each minute for " + n + " minutes. The total change in the diver's depth.",
      add: "A diver is " + r + " metres below the surface and then dives " + n + " metres deeper. The diver's final depth.",
      div: "A diver descends " + (r * n) + " metres in equal steps over " + n + " minutes. The descent in each minute."
    },
    {
      ok: "Maya withdraws $" + r + " from her account each week for " + n + " weeks. The total change in her balance.",
      opp: "Maya deposits $" + r + " into her account each week for " + n + " weeks. The total change in her balance.",
      add: "Maya's balance is -$" + r + " and she then deposits $" + n + " into the account. Her new balance after the deposit.",
      div: "Maya pays off a $" + (r * n) + " debt in " + n + " equal payments. The size of each payment."
    },
    {
      ok: "A player loses " + r + " points in each of " + n + " rounds of a game. The player's total change in score.",
      opp: "A player gains " + r + " points in each of " + n + " rounds of a game. The player's total change in score.",
      add: "A player's score is " + (-r) + " points and then the player gains " + n + " more points in the last round. The final score.",
      div: "A player loses " + (r * n) + " points in total over " + n + " equal rounds. The points lost in each round."
    }
  ];
  var s = pick(scens);
  var prompt = "Which situation can be represented by the product \\((-" + r + ") \\times " + n + "\\)?";
  var solution = "The product multiplies a repeating negative change of \\(-" + r + "\\) by " + n + " repeats: \\[ \\begin{aligned} (-" + r + ") \\times " + n + " &= " + (-r * n) + " \\end{aligned} \\] So it matches the situation with the same negative change repeated <b>" + n + " times</b>.";
  return mcq(prompt,
    { t: s.ok, fb: "Correct. A negative change repeated " + n + " times is a multiplication." },
    [
      { t: s.opp, fb: "That change is positive, so it would be represented by a positive first factor." },
      { t: s.add, fb: "That situation combines two single amounts, which is addition, not a repeated change." },
      { t: s.div, fb: "That situation splits a total into equal parts, which is division, not multiplication." }
    ],
    solution, { mode: "mult-context", r: r, n: n });
}, ["A product with a negative factor means a negative change repeated several times.", "Check each situation: is the change negative, and is it repeated or split up?"]);

// 6. L2, 6.20, CR 3: solve a multiplication problem in context (start plus repeated change).
E("u2-mult-problem", 2, ["6.20"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var start = ri(-6, 8), r = ri(2, 6), h = ri(3, 7);
    var ans = start - r * h;
    var prompt = "At supper time the temperature in Corner Brook is " + start + " degrees. It then falls " + r + " degrees each hour for " + h + " hours. What is the temperature after " + h + " hours, in degrees?";
    var solution = "The total fall is a product, then subtract it from the start: \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " &= " + start + " - " + (r * h) + " \\\\ &= " + ans + " \\end{aligned} \\] So the temperature is <b>" + ans + " degrees</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "temp-fall", start: start, r: r, h: h });
  }
  if (mode === 1) {
    var bal = ri(60, 240), w = ri(6, 20), k = ri(3, 8);
    var ansB = bal - w * k;
    var promptB = "A bank account holds $" + bal + ". The owner withdraws $" + w + " each week for " + k + " weeks, with no other activity. What is the balance after " + k + " weeks, in dollars?";
    var solutionB = "The total withdrawn is a product, then subtract it from the opening balance: \\[ \\begin{aligned} " + bal + " + (-" + w + ") \\times " + k + " &= " + bal + " - " + (w * k) + " \\\\ &= " + ansB + " \\end{aligned} \\] So the balance is <b>$" + ansB + "</b>.";
    return numq(promptB, ansB, 0.01, solutionB, { mode: "bank-withdraw", bal: bal, w: w, k: k });
  }
  var depth = ri(10, 60), rate = ri(3, 9), mins = ri(3, 8);
  var ansD = -(depth + rate * mins);
  var promptD = "A small submersible is " + depth + " m below the surface. It descends a further " + rate + " m each minute for " + mins + " minutes. Using negative numbers for positions below the surface, what is its position after " + mins + " minutes, in metres?";
  var solutionD = "The extra descent is a product, added to the starting depth: \\[ \\begin{aligned} -" + depth + " + (-" + rate + ") \\times " + mins + " &= -" + depth + " - " + (rate * mins) + " \\\\ &= " + ansD + " \\end{aligned} \\] So its position is <b>" + ansD + " m</b>.";
  return numq(promptD, ansD, 0.01, solutionD, { mode: "sub-descend", depth: depth, rate: rate, mins: mins });
}, ["Find the total repeated change first: that part is a multiplication.", "Multiply the change per step by the number of steps, then combine it with the starting value."]);

// 7. L2, 6.23: which context matches a given quotient.
E("u2-div-context-match", 2, ["6.23"], 1, "gen", function () {
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var scens = [
    {
      ok: "A temperature drop of " + total + " degrees happens evenly over " + n + " hours. The drop in each hour.",
      mult: "The temperature falls " + per + " degrees each hour for " + n + " hours overnight. The total drop by morning.",
      add: "The temperature is " + (-total) + " degrees and then rises " + n + " degrees in the sun. The final temperature.",
      opp: "A temperature rise of " + total + " degrees happens evenly over " + n + " hours. The rise in each hour."
    },
    {
      ok: "A debt of $" + total + " is paid off in " + n + " equal weekly payments. The change in the debt from each payment.",
      mult: "A payment of $" + per + " is made each week for " + n + " weeks to pay off the whole debt. The total amount paid off in all.",
      add: "A debt of $" + total + " grows by $" + n + " in fees charged by the bank this month. The new debt after the fees.",
      opp: "A savings account grows by $" + total + " spread evenly over " + n + " weeks. The growth each week."
    },
    {
      ok: "A hiker's elevation drops " + total + " m in equal amounts over " + n + " trail sections. The change in elevation on each section.",
      mult: "A hiker drops " + per + " m in elevation on each of " + n + " trail sections along the route. The total drop in elevation.",
      add: "A hiker at " + (-total) + " m relative to the trailhead climbs " + n + " m up the steep slope. The hiker's new position on the trail above.",
      opp: "A hiker's elevation rises " + total + " m in equal amounts over " + n + " trail sections. The change on each section."
    }
  ];
  var s = pick(scens);
  var prompt = "Which situation can be represented by the quotient \\((-" + total + ") \\div " + n + "\\)?";
  var solution = "The quotient splits a total negative change of \\(-" + total + "\\) into " + n + " equal parts: \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] So it matches the situation where a total is <b>shared equally</b> into " + n + " parts.";
  return mcq(prompt,
    { t: s.ok, fb: "Correct. A total split into equal parts is a division." },
    [
      { t: s.mult, fb: "That situation repeats a change, which is multiplication, not splitting a total." },
      { t: s.add, fb: "That situation combines two single amounts, which is addition." },
      { t: s.opp, fb: "That total change is positive, so its quotient would be positive, not negative." }
    ],
    solution, { mode: "div-context", per: per, n: n });
}, ["A quotient splits a total into equal parts.", "Check each situation: is a total being shared equally, and is the change negative?"]);

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
  var prompt = "A tide gauge shows the water level changed by a total of " + P.dvd + " cm, made up of " + P.d + " equal hourly changes. What was the change in each hour, in centimetres?";
  var solution = "Split the total change into " + P.d + " equal parts, then use the sign rule: \\[ \\begin{aligned} " + P.dvd + " \\div " + P.d + " &= " + P.q + " \\end{aligned} \\] So the change in each hour was <b>" + P.q + " cm</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by1", d: P.d, q: P.q });
}, ["The dividend has two digits and the divisor has one digit.", "Divide the sizes first, then use the sign rule for the quotient."]);

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
  var prompt = "Evaluate: \\(" + P.dvd + " \\div " + u2sg(P.d) + "\\)";
  var solution = "Divide the sizes, then decide the sign from the two signs: \\[ \\begin{aligned} " + P.dvd + " \\div " + u2sg(P.d) + " &= " + P.q + " \\end{aligned} \\] So the quotient is <b>" + P.q + "</b>.";
  return numq(prompt, P.q, 0.01, solution, { mode: "div-2by2", d: P.d, q: P.q });
}, ["Both numbers have two digits here; the quotient is a single digit.", "Divide the sizes first, then use the sign rule for the quotient."]);

// 10. L2, 6.26: identify the operation (expression) that solves a problem.
E("u2-identify-operation", 2, ["6.26"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var r = ri(2, 8), h = ri(3, 9);
    var prompt = "Each hour, the water level in a harbour tank falls " + r + " cm. Which expression gives the total change in the water level after " + h + " hours?";
    var solution = "The same change repeats " + h + " times, so the operation is multiplication by a negative change: \\[ \\begin{aligned} (-" + r + ") \\times " + h + " &= " + (-r * h) + " \\end{aligned} \\] So the expression is <b>\\((-" + r + ") \\times " + h + "\\)</b>.";
    return mcq(prompt,
      { t: "\\((-" + r + ") \\times " + h + "\\)", fb: "Correct. A repeated negative change is a multiplication." },
      [
        { t: "\\((-" + r + ") + " + h + "\\)", fb: "That adds the two numbers once instead of repeating the change." },
        { t: "\\((-" + r + ") \\div " + h + "\\)", fb: "Division splits a total into parts; here a change is being repeated." },
        { t: "\\(" + h + " - " + r + "\\)", fb: "That subtracts one amount from the other instead of repeating the change." }
      ],
      solution, { mode: "identify-mult", r: r, h: h });
  }
  var per = ri(2, 9), n = ri(3, 8), total = per * n;
  var prompt2 = "A group of friends shares a ferry fare debt of $" + total + " equally, recorded as \\(-" + total + "\\) dollars split among " + n + " friends. Which expression gives the amount each friend owes?";
  var solution2 = "A total split equally among " + n + " friends is division: \\[ \\begin{aligned} (-" + total + ") \\div " + n + " &= " + (-per) + " \\end{aligned} \\] So the expression is <b>\\((-" + total + ") \\div " + n + "\\)</b>.";
  return mcq(prompt2,
    { t: "\\((-" + total + ") \\div " + n + "\\)", fb: "Correct. Sharing a total equally is division." },
    [
      { t: "\\((-" + total + ") \\times " + n + "\\)", fb: "That repeats the whole debt " + n + " times instead of splitting it." },
      { t: "\\((-" + total + ") + " + n + "\\)", fb: "That adds to the debt instead of splitting it into equal shares." },
      { t: "\\(" + n + " - " + total + "\\)", fb: "That subtracts the debt from the count of friends, which mixes unlike quantities." }
    ],
    solution2, { mode: "identify-div", per: per, n: n });
}, ["Ask whether the change repeats, or a total is split into equal parts.", "Repeated change means multiply; equal sharing means divide."]);

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
        { v: (a + b) * c, fb: "This adds first, but multiplication is done before addition." },
        { v: a - b * c, fb: "This changes the addition into a subtraction." },
        { v: a + b + c, fb: "This changes the multiplication into an addition." }
      ];
    } else if (tmpl === 1) {
      var a1 = ri(-9, 12), b1 = ri(-9, 9), c1 = 0;
      while (c1 === 0 || Math.abs(c1) < 2) c1 = ri(-6, 6);
      val = (a1 - b1) * c1;
      expr = "\\((" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + "\\)";
      steps = "\\[ \\begin{aligned} (" + a1 + " - " + u2sg(b1) + ") \\times " + u2sg(c1) + " &= " + (a1 - b1) + " \\times " + u2sg(c1) + " \\\\ &= " + val + " \\end{aligned} \\]";
      errs = [
        { v: a1 - b1 * c1, fb: "This multiplies before doing the brackets, but brackets come first." },
        { v: (a1 + b1) * c1, fb: "This adds inside the brackets where the expression says to subtract." },
        { v: a1 - b1 - c1, fb: "This changes the multiplication into a subtraction." }
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
        { v: a2 * (b2 - q2), fb: "This groups the subtraction with the product, which changes the order." },
        { v: a2 * b2 + q2, fb: "This adds the quotient instead of subtracting it." },
        { v: (a2 * b2 - c2) * d2, fb: "This multiplies by the divisor at the end instead of dividing earlier." }
      ];
    }
    var keys = [val].concat(errs.map(function (e) { return e.v; })).map(fmt);
    if (new Set(keys).size < 4) continue;
    R = { expr: expr, val: val, steps: steps, errs: errs, tmpl: tmpl };
  }
  if (!R) {
    R = { expr: "\\(3 + (-4) \\times 5\\)", val: -17, steps: "\\[ \\begin{aligned} 3 + (-4) \\times 5 &= 3 - 20 \\\\ &= -17 \\end{aligned} \\]", errs: [{ v: -5, fb: "This adds first, but multiplication is done before addition." }, { v: 23, fb: "This changes the addition into a subtraction." }, { v: 4, fb: "This changes the multiplication into an addition." }], tmpl: 0 };
  }
  var prompt = "Evaluate: " + R.expr;
  var solution = "Follow the order of operations, brackets first, then multiplication and division, then addition and subtraction: " + R.steps + " So the value is <b>" + R.val + "</b>.";
  return mcq(prompt,
    { t: fmt(R.val), fb: "Correct. The operations were done in the proper order." },
    R.errs.map(function (e) { return { t: fmt(e.v), fb: e.fb }; }),
    solution, { mode: "ooo-mc-" + R.tmpl, val: R.val });
}, ["Do brackets first, then multiplication and division, then addition and subtraction.", "Rewrite the expression after each single step so the order stays clear."]);

// 12. L2, 6.27, CR 2: order of operations, typed answer.
E("u2-ooo-num", 2, ["6.27"], 2, "gen", function () {
  var s = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var qq = ri(2, 9) * (Math.random() < 0.5 ? -1 : 1);
  var r = s * qq;
  var p = 0, q = 0;
  while (p === 0) p = ri(-8, 8);
  while (q === 0) q = ri(-8, 8);
  var val = p * q - qq;
  var prompt = "Evaluate: \\(" + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + "\\)";
  var solution = "Do the multiplication and the division before the subtraction: \\[ \\begin{aligned} " + u2sg(p) + " \\times " + u2sg(q) + " - " + r + " \\div " + u2sg(s) + " &= " + (p * q) + " - " + qq + " \\\\ &= " + val + " \\end{aligned} \\] So the value is <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-num", p: p, q: q, s: s });
}, ["Multiplication and division are done before addition and subtraction.", "Work out the product and the quotient separately, then combine them."]);

// 13. L2, 6.18 and 6.20, CR 2: signed per-round change applied in a game problem.
E("u2-sign-product-problem", 2, ["6.18", "6.20"], 1, "gen", function () {
  var start = ri(20, 90);
  var per = 0;
  while (per === 0 || Math.abs(per) < 2) per = ri(-9, 9);
  var rounds = ri(3, 8);
  var ans = start + per * rounds;
  var dirWord = per < 0 ? "loses " + Math.abs(per) : "gains " + per;
  var prompt = "In a board game tournament, Liam starts a match with " + start + " points. In each of the " + rounds + " rounds he " + dirWord + " points. What is his score after " + rounds + " rounds?";
  var solution = "The rounds give one product, and its sign follows the sign rule: \\[ \\begin{aligned} " + start + " + " + u2sg(per) + " \\times " + rounds + " &= " + start + " + " + (per * rounds) + " \\\\ &= " + ans + " \\end{aligned} \\] So his score is <b>" + ans + " points</b>.";
  return numq(prompt, ans, 0.01, solution, { mode: "game-score", start: start, per: per, rounds: rounds });
}, ["The rounds all change the score by the same signed amount, so that part is a product.", "Multiply the signed change by the number of rounds, then add it to the starting score."]);

// 14. L3, 6.27, CR 3: order of operations with brackets and three operations.
E("u2-ooo-brackets-num", 2, ["6.27"], 3, "gen", function () {
  var e = pick([2, 3, 4, 5, 6]) * (Math.random() < 0.5 ? -1 : 1);
  var dq = ri(2, 8) * (Math.random() < 0.5 ? -1 : 1);
  var d = e * dq;
  var a = ri(-10, 14), b = ri(-10, 10), c = 0;
  while (c === 0 || Math.abs(c) < 2) c = ri(-6, 6);
  var inner = a - b;
  var val = inner * c - dq;
  var prompt = "Evaluate: \\((" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + "\\)";
  var solution = "Do the brackets first, then the multiplication and division, then the subtraction: \\[ \\begin{aligned} (" + a + " - " + u2sg(b) + ") \\times " + u2sg(c) + " - " + d + " \\div " + u2sg(e) + " &= " + inner + " \\times " + u2sg(c) + " - " + dq + " \\\\ &= " + (inner * c) + " - " + dq + " \\\\ &= " + val + " \\end{aligned} \\] So the value is <b>" + val + "</b>.";
  return numq(prompt, val, 0.01, solution, { mode: "ooo-brackets", a: a, b: b, c: c, e: e });
}, ["Start with the brackets, even when other operations look tempting first.", "Finish the bracket, then do the multiplication and division before the final subtraction."]);

// 15. L3, 6.26 and 6.27, CR 2: multi-step mixed problem, choose and order the operations.
E("u2-mixed-problem", 2, ["6.26", "6.27"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var start = ri(-4, 10), r = ri(2, 5), h = ri(3, 6), rise = ri(2, 9);
    var ans = start - r * h + rise;
    var prompt = "Overnight in Gander, the temperature starts at " + start + " degrees. It falls " + r + " degrees each hour for " + h + " hours, and then rises " + rise + " degrees the next morning. What is the final temperature, in degrees?";
    var solution = "The repeated fall is a multiplication, done before adding the morning rise: \\[ \\begin{aligned} " + start + " + (-" + r + ") \\times " + h + " + " + rise + " &= " + start + " - " + (r * h) + " + " + rise + " \\\\ &= " + ans + " \\end{aligned} \\] So the final temperature is <b>" + ans + " degrees</b>.";
    return numq(prompt, ans, 0.01, solution, { mode: "mixed-temp", start: start, r: r, h: h });
  }
  var bal = ri(80, 200), w = ri(5, 15), k = ri(3, 6), dep = ri(20, 90);
  var ansB = bal - w * k + dep;
  var promptB = "A school trip account holds $" + bal + ". The group pays $" + w + " in ferry fees for each of " + k + " students, then receives a $" + dep + " donation. What is the balance in the account, in dollars?";
  var solutionB = "The ferry fees are one product, done before the donation is added: \\[ \\begin{aligned} " + bal + " - " + w + " \\times " + k + " + " + dep + " &= " + bal + " - " + (w * k) + " + " + dep + " \\\\ &= " + ansB + " \\end{aligned} \\] So the balance is <b>$" + ansB + "</b>.";
  return numq(promptB, ansB, 0.01, solutionB, { mode: "mixed-bank", bal: bal, w: w, k: k });
}, ["One part of the problem repeats, so it is a multiplication; the single extra change is added or subtracted after.", "Work out the repeated part first, then combine it with the starting value and the single change."]);

// 16. L3, 6.19 and 6.23: variant set of context and model reasoning statics.
E("u2-context-reasoning-var", 2, ["6.19", "6.23"], 3, "var", varset([
  function () {
    var prompt = "Which situation can be represented by the product \\((-5) \\times 4\\)?";
    var solution = "The product repeats a negative change of \\(-5\\) four times: \\[ \\begin{aligned} (-5) \\times 4 &= -20 \\end{aligned} \\] So it matches the situation with the same loss repeated <b>4 times</b>.";
    return mcq(prompt,
      { t: "A goalie lets in 5 goals in each of 4 games. The total change in the team's goal difference.", fb: "Correct. A negative change of 5 is repeated 4 times." },
      [
        { t: "A goalie lets in 5 goals in one game and 4 goals in the next. The total goals let in.", fb: "That combines two different single amounts, which is addition." },
        { t: "A team is docked 20 points in total, split equally over 4 games. The points docked in each game.", fb: "That splits a total into equal parts, which is division." },
        { t: "A player scores 5 goals in each of 4 games. The total goals scored.", fb: "That change is positive, so it would use a positive first factor." }
      ],
      solution, { mode: "var-mult-context" });
  },
  function () {
    var prompt = "Which situation can be represented by the quotient \\((-36) \\div 6\\)?";
    var solution = "The quotient splits a total negative change of \\(-36\\) into 6 equal parts: \\[ \\begin{aligned} (-36) \\div 6 &= -6 \\end{aligned} \\] So it matches the situation where a total is <b>shared equally</b> into 6 parts.";
    return mcq(prompt,
      { t: "A hiker drops 36 m in elevation in equal amounts over 6 trail sections. The change on each section.", fb: "Correct. A total is split into 6 equal parts." },
      [
        { t: "A hiker drops 6 m in elevation on each of the 36 trail sections along the route. The total drop.", fb: "That repeats a change many times, which is multiplication." },
        { t: "A hiker at -36 m relative to the trailhead climbs 6 m up the bank. The hiker's new position.", fb: "That combines two single amounts, which is addition." },
        { t: "A hiker rises 36 m in elevation in equal amounts over 6 trail sections. The change on each section.", fb: "That total change is positive, so its quotient would be positive." }
      ],
      solution, { mode: "var-div-context" });
  },
  function () {
    var prompt = "A chip model starts from zero pairs. A student removes 3 groups of 4 red chips, where each red chip stands for \\(-1\\). Which product does the model record?";
    var solution = "Removing groups is a negative action on negative chips: \\[ \\begin{aligned} (-3) \\times (-4) &= 12 \\end{aligned} \\] So the model records the product <b>\\((-3) \\times (-4)\\)</b>.";
    return mcq(prompt,
      { t: "\\((-3) \\times (-4)\\)", fb: "Correct. Removing (negative action) groups of red (negative) chips gives two negative factors." },
      [
        { t: "\\(3 \\times (-4)\\)", fb: "That would mean adding 3 groups of red chips, not removing them." },
        { t: "\\((-3) \\times 4\\)", fb: "That treats the chips as positive yellow chips instead of red ones." },
        { t: "\\(3 \\times 4\\)", fb: "That ignores both the removal and the red chips, so nothing in it is negative." }
      ],
      solution, { mode: "var-model-product" });
  }
]), ["For each situation, decide whether a change repeats, a total is split, or single amounts are combined.", "Match the signs as well as the operation: removal and red chips are both negative."]);

/* ----- bank-u3.js ----- */
// Math 8 Unit 3 Operations with Fractions question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 818 to 1280).
// CRMARKS: u3-divide-mixed-cr=3
// CRMARKS: u3-divide-word-cr=2
// CRMARKS: u3-mixed-multistep-cr=3
// CRMARKS: u3-model-division-bar=3
// CRMARKS: u3-mult-div-chain-cr=2
// CRMARKS: u3-multiply-mixed-cr=3
// CRMARKS: u3-order-of-ops-fractions=2
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
  var prompt = "A model shows \\(" + P.w + "\\) equal groups. In each group, " + u3disp(P.n, P.d) + " is shaded. What is the total amount shaded?";
  var adds = []; for (var i = 0; i < P.w; i++) adds.push(FR(P.n, P.d));
  var solution = "Add the same fraction once for each group, which is multiplication: \\[ \\begin{aligned} " + adds.join(" + ") + " &= " + P.w + " \\times " + FR(P.n, P.d) + " \\\\ &= " + FR(P.w * P.n, P.d) + " \\\\ &= " + u3plain(P.w * P.n, P.d) + " \\end{aligned} \\] So the total shaded is <b>" + u3disp(P.w * P.n, P.d) + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Each of the " + P.w + " groups contributes the same fraction." },
    [
      { t: P.vals[1], fb: "This adds the whole number to the numerator, but the model repeats the fraction instead." },
      { t: P.vals[2], fb: "That is the amount shaded in just one group." },
      { t: P.vals[3], fb: "This uses the whole number as a numerator over the same denominator, which is not repeated addition." }
    ],
    solution, { mode: "model-times-whole", n: P.n, d: P.d, w: P.w });
}, ["Multiplication by a whole number means adding the fraction the same number of times.", "First write the total as a repeated addition of the fraction."]);

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
    var fb = l === "2" ? "A product of two fractions less than 1 is less than 1, so it cannot be near 2." : "Compare each factor with \\(" + FR(1, 2) + "\\) first: the product lands nearer a different benchmark.";
    return { t: l, fb: fb };
  });
  var prompt = "The product " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + " is closest to which benchmark?";
  var solution = "Estimate each factor: \\(" + FR(P.n1, P.d1) + "\\) is about \\(" + fmt(Math.round(P.n1 / P.d1 * 2) / 2) + "\\) and \\(" + FR(P.n2, P.d2) + "\\) is about \\(" + fmt(Math.round(P.n2 / P.d2 * 2) / 2) + "\\), and the exact product is \\(" + fmt(Math.round(P.p * 1000) / 1000) + "\\). So the product is closest to <b>" + correct + "</b>.";
  return mcq(prompt, { t: correct, fb: "Correct. Estimating each factor first puts the product nearest this benchmark." }, distractors, solution, { mode: "est-product", bi: P.bi });
}, ["Compare each fraction with one half before you multiply.", "Ask whether each factor is small, near one half, or near one."]);

// 3. L1, 6.9: model whole divided by a unit fraction.
E("u3-model-whole-div-frac", 3, ["6.9"], 1, "gen", function () {
  var w = ri(2, 6), d = ri(3, 10);
  var ans = w * d;
  var thing = pick(["wholes", "pizzas", "ribbons", "litres of juice"]);
  var prompt = "A diagram shows \\(" + w + "\\) " + (thing === "wholes" ? "wholes" : "whole " + thing) + ". Each whole is split into \\(" + d + "\\) equal parts, modelling \\(" + w + " \\div " + FR(1, d) + "\\). How many parts are there in all?";
  var solution = "Each whole contributes \\(" + d + "\\) parts: \\[ \\begin{aligned} " + w + " \\div " + FR(1, d) + " &= " + w + " \\times " + d + " \\\\ &= " + ans + " \\end{aligned} \\] So there are <b>" + ans + " parts</b> in all.";
  return mcq(prompt,
    { t: "" + ans, fb: "Correct. Multiply the number of wholes by the parts in each whole." },
    [
      { t: "" + (w + d), fb: "This adds the two numbers, but each whole holds several parts." },
      { t: "" + d, fb: "That counts the parts in only one whole." },
      { t: "" + (w * (d + 1)), fb: "This counts one extra part in every whole." }
    ],
    solution, { mode: "model-whole-div", w: w, d: d });
}, ["Count the parts inside one whole first, then scale up to all the wholes.", "Division by a unit fraction asks how many of those parts fit."]);

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
  var prompt = "Multiply: " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var solution = "Multiply the numerators and multiply the denominators, cancelling first where possible: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the product is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Numerators multiply, denominators multiply, then reduce." },
    [
      { t: P.vals[1], fb: "This adds across the tops and bottoms, which is not how fractions multiply." },
      { t: P.vals[2], fb: "The numerators are multiplied but the denominators are added instead of multiplied." },
      { t: P.vals[3], fb: "The denominators are multiplied but the numerators are added instead of multiplied." }
    ],
    solution, { mode: "mult-basic", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["For multiplication, no common denominator is needed.", "Cancel any numerator with any denominator before you multiply."]);

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
  var prompt = "A rectangle is split into \\(" + P.d1 + "\\) equal rows and \\(" + P.d2 + "\\) equal columns. " + P.n1 + " of the rows and " + P.n2 + " of the columns are shaded, modelling " + u3disp(P.n1, P.d1) + " \\(\\times\\) " + u3disp(P.n2, P.d2) + ". What fraction of the whole rectangle is shaded both ways, in the overlap?";
  var solution = "The overlap covers \\(" + (P.n1 * P.n2) + "\\) of the \\(" + (P.d1 * P.d2) + "\\) small cells: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.n1 * P.n2, P.d1 * P.d2) + " \\\\ &= " + FR(u3red(P.n1 * P.n2, P.d1 * P.d2)[0], u3red(P.n1 * P.n2, P.d1 * P.d2)[1]) + " \\end{aligned} \\] So the overlap is <b>" + P.vals[0] + "</b> of the rectangle.";
  var q = mcq(prompt,
    { t: P.vals[0], fb: "Correct. The overlap is the product of the two shaded fractions." },
    [
      { t: P.vals[1], fb: "That is only the fraction of rows shaded, ignoring the columns." },
      { t: P.vals[2], fb: "That is only the fraction of columns shaded, ignoring the rows." },
      { t: P.vals[3], fb: "This adds the shaded parts instead of finding their overlap." }
    ],
    solution, { mode: "area-model", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
  q.figure = u3areaSVG(P.n1, P.d1, P.n2, P.d2);
  return q;
}, ["The overlap is where the row shading and the column shading cross.", "Count the overlap cells, then count all the cells in the rectangle."]);

// 6. L2, 6.6: provide a context, choose the multiplication expression.
E("u3-context-multiply-expression", 3, ["6.6"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "A recipe uses " + a + " of a bag of flour, and a baker makes " + b + " of the recipe. Which expression gives the fraction of the whole bag used?"; },
    function (a, b) { return "A garden plot is " + a + " planted. Of the planted part, " + b + " grows tomatoes. Which expression gives the fraction of the whole plot growing tomatoes?"; },
    function (a, b) { return "A ferry tank is " + a + " full. On one crossing, " + b + " of the fuel in the tank is used. Which expression gives the fraction of a full tank used?"; },
    function (a, b) { return "A class spends " + a + " of a school day on a field trip. Of that time, " + b + " is spent on the bus. Which expression gives the fraction of the whole day spent on the bus?"; }
  ];
  var d1 = ri(3, 8), n1 = ri(1, d1 - 1), d2 = ri(3, 8), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var mult = "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)";
  var solution = "Taking a fraction of a fraction is multiplication: \\[ \\begin{aligned} " + FR(n1, d1) + " \\times " + FR(n2, d2) + " \\end{aligned} \\] So the expression is <b>" + mult + "</b>.";
  return mcq(prompt,
    { t: mult, fb: "Correct. A fraction of a fraction is found by multiplying." },
    [
      { t: "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)", fb: "Division answers how many fit, but this context takes a part of a part." },
      { t: "\\(" + FR(n1, d1) + " + " + FR(n2, d2) + "\\)", fb: "Addition joins two separate amounts, but the second fraction acts on the first amount." },
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "This reverses the two amounts and divides, which does not match a part of a part." }
    ],
    solution, { mode: "ctx-mult-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Look for the words of or part of a part in the context.", "A fraction of another fraction is a multiplication."]);

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
  var prompt = "A hiking trail is " + u3disp(P.imp, P.d1) + " km long. A group hikes " + u3disp(P.n2, P.d2) + " of the trail. How many kilometres do they hike? Give your answer as a fraction or mixed number in lowest terms.";
  var rr = u3red(P.rn, P.rd);
  var solution = "Convert the mixed number to an improper fraction, then multiply: \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] So they hike <b>" + u3disp(P.rn, P.rd) + " km</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "mult-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Change the mixed number to an improper fraction before multiplying.", "First rewrite the trail length as a single fraction."]);

// 8. L2, 6.11: estimate a quotient against whole number benchmarks.
E("u3-estimate-quotient-benchmark", 3, ["6.11"], 2, "gen", function () {
  var cats = ["Less than 1", "About 1", "About 2", "More than 2"];
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
  var prompt = "Estimate the quotient " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Which description fits it best?";
  var solution = "Dividing by a fraction asks how many of the divisor fit into the dividend. Here the exact quotient is \\(" + fmt(Math.round(P.q * 100) / 100) + "\\): \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " = " + fmt(Math.round(P.q * 100) / 100) + " \\end{aligned} \\] So the quotient is <b>" + cats[P.ci].toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: cats[P.ci], fb: "Correct. The divisor fits into the dividend about that many times." },
    cats.filter(function (c, i) { return i !== P.ci; }).map(function (c) { return { t: c, fb: "Compare the sizes: a smaller divisor fits more times, so check how many divisors fit before choosing." }; }),
    solution, { mode: "est-quotient", ci: P.ci });
}, ["Ask how many times the divisor fits into the dividend.", "If the divisor is smaller than the dividend, the quotient is greater than 1."]);

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
  var prompt = "Divide: " + u3disp(P.n1, P.d1) + " \\(\\div\\) " + u3disp(P.n2, P.d2) + ". Give the answer in lowest terms.";
  var rr = u3red(P.n1 * P.d2, P.d1 * P.n2);
  var solution = "Multiply by the reciprocal of the divisor: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.n1 * P.d2, P.d1 * P.n2) + " \\\\ &= " + FR(rr[0], rr[1]) + " \\end{aligned} \\] So the quotient is <b>" + P.vals[0] + "</b>.";
  return mcq(prompt,
    { t: P.vals[0], fb: "Correct. Only the divisor is flipped, then multiply." },
    [
      { t: P.vals[1], fb: "This flips both fractions, but only the divisor is flipped." },
      { t: P.vals[2], fb: "This multiplies straight across without flipping the divisor." },
      { t: P.vals[3], fb: "This flips the first fraction instead of the divisor." }
    ],
    solution, { mode: "div-frac-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Division by a fraction means multiply by its reciprocal.", "Flip only the second fraction, the divisor."]);

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
  var item = pick(["strip", "ribbon", "rope", "board"]);
  var prompt = "A bar model shows " + u3disp(P.n1, P.d1) + " of a " + item + " shaded. The " + item + " is split into \\(" + P.L + "\\) equal small parts, and the bold marks group the parts into servings of " + u3disp(1, P.d2) + " of a " + item + " each. How many servings are in the shaded part?";
  var solution = "Use the common split of \\(" + P.L + "\\) parts: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " &= " + FR(P.shaded, P.L) + " \\\\ " + FR(1, P.d2) + " &= " + FR(P.grp, P.L) + " \\\\ " + P.shaded + " \\div " + P.grp + " &= " + P.cnt + " \\end{aligned} \\] So there are <b>" + P.cnt + " servings</b> in the shaded part.";
  var q = numq(prompt, P.cnt, 0, solution, { mode: "model-div-bar", n1: P.n1, d1: P.d1, d2: P.d2 });
  q.figure = u3barSVG(P.L, P.shaded, P.grp);
  return q;
}, ["Rewrite both fractions using the small parts shown on the bar.", "Count the shaded small parts, then divide by the parts in one serving."]);

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
  var prompt = "A rope is " + u3disp(P.imp, P.d1) + " m long. It is cut into pieces that are each " + u3disp(P.n2, P.d2) + " m long. How many pieces are cut? Give your answer as a number, fraction or mixed number in lowest terms.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Convert the mixed number, then multiply by the reciprocal of the piece length: \\[ \\begin{aligned} " + P.w + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.imp, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] So the number of pieces is <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-mixed-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["Change the mixed number to an improper fraction first.", "Dividing by a piece length asks how many pieces fit, so flip the divisor and multiply."]);

// 12. L2, 6.14: provide a context, choose the division expression.
E("u3-context-divide-expression", 3, ["6.14"], 1, "gen", function () {
  var tmpls = [
    function (a, b) { return "A ribbon " + a + " m long is cut into pieces that are each " + b + " m long. Which expression gives the number of pieces?"; },
    function (a, b) { return "A jug holds " + a + " L of juice. It is poured equally into bottles that each hold " + b + " L. Which expression gives the number of bottles filled?"; },
    function (a, b) { return "A trail crew has " + a + " kg of gravel to spread in loads of " + b + " kg each. Which expression gives the number of loads?"; },
    function (a, b) { return "A tank holds " + a + " L of water. Each watering can takes " + b + " L. Which expression gives the number of cans that can be filled?"; }
  ];
  var d1 = ri(3, 9), n1 = ri(1, d1 - 1), d2 = ri(3, 9), n2 = ri(1, d2 - 1);
  if (u3plain(n1, d1) === u3plain(n2, d2)) { n2 = n2 % (d2 - 1) + 1; if (u3plain(n1, d1) === u3plain(n2, d2)) n1 = n1 % (d1 - 1) + 1; }
  var A = u3disp(n1, d1), B = u3disp(n2, d2);
  var prompt = pick(tmpls)(A, B);
  var div = "\\(" + FR(n1, d1) + " \\div " + FR(n2, d2) + "\\)";
  var solution = "The context asks how many groups of one size fit into a total, which is division with the total first: \\[ \\begin{aligned} " + FR(n1, d1) + " \\div " + FR(n2, d2) + " \\end{aligned} \\] So the expression is <b>" + div + "</b>.";
  return mcq(prompt,
    { t: div, fb: "Correct. The total is divided by the size of each group." },
    [
      { t: "\\(" + FR(n2, d2) + " \\div " + FR(n1, d1) + "\\)", fb: "This puts the group size first, but division starts from the total amount." },
      { t: "\\(" + FR(n1, d1) + " \\times " + FR(n2, d2) + "\\)", fb: "Multiplication takes a part of a part, but this context counts how many groups fit." },
      { t: "\\(" + FR(n1, d1) + " - " + FR(n2, d2) + "\\)", fb: "Subtraction finds what is left after one removal, not the number of groups." }
    ],
    solution, { mode: "ctx-div-expr", n1: n1, d1: d1, n2: n2, d2: d2 });
}, ["Ask whether the context counts groups that fit into a total.", "In a division expression, the total amount comes first."]);

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
  var prompt = "Evaluate: \\(" + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + "\\). Give your answer as a decimal.";
  var prod = u3red(P.n2 * P.w, P.d2);
  var solution = "Multiplication is done before addition: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " + " + FR(P.n2, P.d2) + " \\times " + P.w + " &= " + FR(P.n1, P.d1) + " + " + FR(prod[0], prod[1]) + " \\\\ &= " + fmt(P.val) + " \\end{aligned} \\] So the value is <b>" + fmt(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "ooo-frac", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, w: P.w });
}, ["Multiplication comes before addition in the order of operations.", "First work out the fraction times the whole number."]);

// 14. L2, 6.15: identify the operation a context requires.
E("u3-identify-operation", 3, ["6.15"], 1, "gen", function () {
  var dens = [3, 4, 5, 6, 8];
  function F() { var d = pick(dens); return u3disp(ri(1, d - 1), d); }
  function G() { var d = pick(dens); var n = ri(1, d - 1); return u3disp(d + n, d); }
  var scens = [
    { op: "Multiplication", txt: function () { return "A muffin recipe calls for " + F() + " cup of berries. A cook makes " + F() + " of the recipe. Which operation finds the cups of berries used?"; } },
    { op: "Multiplication", txt: function () { return "A rope is " + G() + " m long. A climber uses " + F() + " of the rope. Which operation finds the length used?"; } },
    { op: "Division", txt: function () { return "A board " + G() + " m long is cut into shelves that are each " + F() + " m long. Which operation finds the number of shelves?"; } },
    { op: "Division", txt: function () { return F() + " L of soup is shared equally into servings of " + F() + " L each. Which operation finds the number of servings?"; } },
    { op: "Addition", txt: function () { return "A hiker walks " + F() + " km before lunch and " + F() + " km after lunch. Which operation finds the total distance?"; } },
    { op: "Addition", txt: function () { return "A jug holds " + F() + " L of water and " + F() + " L more is poured in. Which operation finds how much water is in the jug now?"; } },
    { op: "Subtraction", txt: function () { return "A tank holds " + G() + " L of fuel and " + F() + " L is used on a trip. Which operation finds the fuel left?"; } },
    { op: "Subtraction", txt: function () { return "A ribbon is " + G() + " m long and a piece " + F() + " m long is cut off. Which operation finds the length remaining?"; } }
  ];
  var s = pick(scens);
  var ops = ["Addition", "Subtraction", "Multiplication", "Division"];
  var why = { "Multiplication": "It takes a fraction of an amount.", "Division": "It counts how many groups of a size fit into a total.", "Addition": "It joins two amounts into a total.", "Subtraction": "It finds what remains after part is taken away." };
  var prompt = s.txt();
  var solution = "Read the context for what is being found. " + why[s.op] + " So the operation is <b>" + s.op.toLowerCase() + "</b>.";
  return mcq(prompt,
    { t: s.op, fb: "Correct. " + why[s.op] },
    ops.filter(function (o) { return o !== s.op; }).map(function (o) { return { t: o, fb: "That operation does not match what the context asks for. " + why[o] }; }),
    solution, { mode: "identify-op", op: s.op });
}, ["Decide what the answer measures: a total, a remainder, a part of a part, or a count of groups.", "Match the story to the operation before looking at the numbers."]);

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
  var prompt = "A water tank holds " + u3disp(P.n1, P.d1) + " L. Each bottle is filled with " + u3disp(P.n2, P.d2) + " L. How many bottles can be filled? Give your answer as a number, fraction or mixed number in lowest terms.";
  var rr2 = u3red(P.rn, P.rd);
  var solution = "Divide the total by the amount per bottle: \\[ \\begin{aligned} " + FR(P.n1, P.d1) + " \\div " + FR(P.n2, P.d2) + " &= " + FR(P.n1, P.d1) + " \\times " + FR(P.d2, P.n2) + " \\\\ &= " + FR(P.rn, P.rd) + " \\\\ &= " + FR(rr2[0], rr2[1]) + " \\end{aligned} \\] So the number of bottles is <b>" + u3disp(P.rn, P.rd) + "</b>.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "div-word-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2 });
}, ["The total is divided by the size of one bottle.", "Flip the divisor and multiply."]);

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
  var prompt = "Maya has $" + P.M + ". She spends " + u3disp(1, P.a) + " of her money on a book. Then she spends " + u3disp(1, P.b) + " of what is left on a game. How much money does she have left?";
  var solution = "Work one step at a time, because the second fraction acts on what remains: \\[ \\begin{aligned} " + P.M + " \\times " + FR(1, P.a) + " &= " + P.spent1 + " \\\\ " + P.M + " - " + P.spent1 + " &= " + P.left1 + " \\\\ " + P.left1 + " \\times " + FR(1, P.b) + " &= " + P.spent2 + " \\\\ " + P.left1 + " - " + P.spent2 + " &= " + P.left2 + " \\end{aligned} \\] So she has <b>$" + P.left2 + "</b> left.";
  return mcq(prompt,
    { t: "$" + P.left2, fb: "Correct. The second fraction is taken from the amount left after the first purchase." },
    [
      { t: "$" + P.wrong1, fb: "This takes both fractions from the full $" + P.M + ", but the second fraction acts on what is left." },
      { t: "$" + P.left1, fb: "That is the amount left after the book only; the game purchase still has to come off." },
      { t: "$" + P.wrong3, fb: "This subtracts only the second spending from the full amount and skips the book." }
    ],
    solution, { mode: "successive-frac", a: P.a, b: P.b, M: P.M });
}, ["The second fraction is of the amount left, not of the starting amount.", "Find what remains after the first spending before applying the second fraction."]);

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
  var prompt = "A baker has " + u3disp(P.imp, P.d1) + " kg of flour. She uses " + u3disp(P.n2, P.d2) + " of the flour in the morning. Then she buys " + u3disp(P.n3, P.d3) + " kg more. How many kilograms of flour does she have now? Give your answer as a fraction or mixed number in lowest terms.";
  var solution = "First find the part used, then subtract it and add the new flour: \\[ \\begin{aligned} " + FR(P.imp, P.d1) + " \\times " + FR(P.n2, P.d2) + " &= " + P.used + " \\\\ " + FR(P.imp, P.d1) + " - " + P.used + " &= " + FR(leftN, P.d1) + " \\\\ " + FR(leftN, P.d1) + " + " + FR(P.n3, P.d3) + " &= " + u3plain(P.rn, P.rd) + " \\end{aligned} \\] So she has <b>" + u3disp(P.rn, P.rd) + " kg</b> of flour now.";
  return textq(prompt, u3accepted(P.rn, P.rd), solution, { mode: "multistep-cr", imp: P.imp, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Split the problem into steps: find the part used, subtract, then add.", "First multiply to find how much flour the morning baking used."]);

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
  var prompt = "Evaluate: \\(\\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + "\\). Give your answer as a decimal.";
  var step1 = fmt(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) * 1000) / 1000);
  var step2 = fmt(Math.round((P.n1 / P.d1) * (P.n2 / P.d2) / (P.n3 / P.d3) * 1000) / 1000);
  var solution = "Do the brackets first, then the division, then the addition: \\[ \\begin{aligned} \\left(" + FR(P.n1, P.d1) + " \\times " + FR(P.n2, P.d2) + "\\right) \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " &= " + step1 + " \\div " + FR(P.n3, P.d3) + " + " + FR(P.n4, P.d4) + " \\\\ &= " + step2 + " + " + FR(P.n4, P.d4) + " \\\\ &= " + fmt(P.val) + " \\end{aligned} \\] So the value is <b>" + fmt(P.val) + "</b>.";
  return numq(prompt, P.val, 0.01, solution, { mode: "chain-cr", n1: P.n1, d1: P.d1, n2: P.n2, d2: P.d2, n3: P.n3, d3: P.d3 });
}, ["Brackets first, then division, then addition.", "Start with the product inside the brackets."]);

// 19. L3, 6.7 and 6.11: reasoning about products and quotients (variant set).
E("u3-estimate-reasoning-var", 3, ["6.7", "6.11"], 3, "var", varset([
  function () {
    var prompt = "Which statement about the product \\(" + FR(7, 8) + " \\times " + FR(8, 9) + "\\) is true?";
    var solution = "Both factors are less than 1, so the product is smaller than each factor: \\[ \\begin{aligned} " + FR(7, 8) + " \\times " + FR(8, 9) + " &= " + FR(56, 72) + " = " + FR(7, 9) + " \\end{aligned} \\] Since \\(" + FR(7, 9) + "\\) is less than \\(" + FR(7, 8) + "\\), the product is <b>less than \\(" + FR(7, 8) + "\\)</b>.";
    return mcq(prompt,
      { t: "The product is less than \\(" + FR(7, 8) + "\\)", fb: "Correct. Multiplying by a fraction less than 1 shrinks the amount." },
      [
        { t: "The product is greater than 1", fb: "A product of two numbers each less than 1 stays less than 1." },
        { t: "The product is greater than \\(" + FR(8, 9) + "\\)", fb: "The product is smaller than both factors, not greater." },
        { t: "The product equals \\(" + FR(7, 8) + "\\)", fb: "That would only happen if the other factor were exactly 1." }
      ],
      solution, { mode: "reason-product-shrink" });
  },
  function () {
    var prompt = "Which statement about the quotient \\(" + FR(3, 4) + " \\div " + FR(1, 8) + "\\) is true?";
    var solution = "The divisor is small, so it fits many times: \\[ \\begin{aligned} " + FR(3, 4) + " \\div " + FR(1, 8) + " &= " + FR(3, 4) + " \\times 8 \\\\ &= 6 \\end{aligned} \\] So the quotient is <b>greater than \\(" + FR(3, 4) + "\\)</b>.";
    return mcq(prompt,
      { t: "The quotient is greater than \\(" + FR(3, 4) + "\\)", fb: "Correct. Dividing by a fraction less than 1 gives a larger result." },
      [
        { t: "The quotient is less than \\(" + FR(1, 8) + "\\) in size", fb: "The quotient counts how many eighths fit, and several fit." },
        { t: "The quotient equals exactly \\(" + FR(3, 4) + "\\)", fb: "That would only happen if the divisor were exactly 1." },
        { t: "The quotient is between 0 and 1 in value", fb: "A divisor smaller than the dividend gives a quotient greater than 1." }
      ],
      solution, { mode: "reason-quotient-grow" });
  },
  function () {
    var prompt = "Which statement about the product \\(" + FR(5, 6) + " \\times " + FR(2, 3) + "\\) is true?";
    var solution = "Both factors are less than 1, and the product sits below the smaller factor: \\[ \\begin{aligned} " + FR(5, 6) + " \\times " + FR(2, 3) + " &= " + FR(10, 18) + " = " + FR(5, 9) + " \\end{aligned} \\] Since \\(" + FR(5, 9) + "\\) is less than \\(" + FR(2, 3) + "\\), the product is <b>less than \\(" + FR(2, 3) + "\\)</b>.";
    return mcq(prompt,
      { t: "The product is less than \\(" + FR(2, 3) + "\\)", fb: "Correct. The product of two fractions less than 1 is less than each of them." },
      [
        { t: "The product is between \\(" + FR(2, 3) + "\\) and \\(" + FR(5, 6) + "\\)", fb: "Multiplying by a fraction less than 1 moves below the smaller factor, not between them." },
        { t: "The product is greater than \\(" + FR(5, 6) + "\\)", fb: "The product cannot grow past the larger factor when the other factor is less than 1." },
        { t: "The product equals 1", fb: "Only factors that are reciprocals of each other multiply to 1." }
      ],
      solution, { mode: "reason-product-below-both" });
  }
]), ["Multiplying by a fraction less than 1 makes an amount smaller; dividing by one makes it larger.", "Compare each factor or divisor with 1 before deciding."]);

/* ----- bank-u4.js ----- */
// Math 8 Unit 4 Measuring Prisms and Cylinders question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 1281 to 1744).
// CRMARKS: u4-sa-cylinder=3
// CRMARKS: u4-sa-open-tank=3
// CRMARKS: u4-sa-problem-wrap=2
// CRMARKS: u4-sa-rect-prism=3
// CRMARKS: u4-sa-tri-prism=3
// CRMARKS: u4-vol-cylinder-diam=2
// CRMARKS: u4-vol-tri-prism=2
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
  var names={rect:"Right rectangular prism", tri:"Right triangular prism", cyl:"Right cylinder"};
  var others=["Right rectangular prism","Right triangular prism","Right cylinder","Square-based pyramid"].filter(function(n){return n!==names[kind];});
  var opts=others.map(function(n){return {t:n, fb:"Count the shapes in the net and picture the fold: that object has a different set of faces."};});
  var q=mcq("The diagram shows a net laid flat. Which 3-D object does this net fold to make?",
    {t:names[kind], fb:"Yes: the shapes in the net are exactly the faces of that object."}, opts,
    "Picture each flap folding up around the shaded middle piece. The flat shapes become the faces of the solid, and this net folds to make <b>"+names[kind].toLowerCase()+"</b>.",
    {mode:kind, v1:v1, v2:v2, v3:v3});
  q.figure=u4netSVG(kind,v1,v2,v3);
  return q;
}, ["Count each shape in the net and think about which faces the finished object needs.", "Start with the shaded middle piece and fold each flap up around it in your mind."]);

E("u4-faces-identify", 4, ["10.3"], 1, "gen", function(){
  var kind=pick(["rect","tri","cyl"]);
  var a=ri(3,12), b=ri(3,12), c=ri(4,15), L=ri(5,16);
  var prompt, correct, cands, sol, fig;
  if(kind==="rect"){
    prompt="A right rectangular prism has length "+a+" cm, width "+b+" cm and height "+c+" cm. How many faces does it have in total?";
    correct=6; cands=[5,4,8,12,3];
    sol="A rectangular prism has a front and back, a left and right side, and a top and bottom: \\[ 2+2+2 = 6 \\] It has <b>6 faces</b>.";
    fig=u4boxSVG(a,b,c);
  } else if(kind==="tri"){
    prompt="A right triangular prism is "+L+" cm long, and each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm. How many faces does it have in total?";
    correct=5; cands=[6,4,7,9,3];
    sol="A triangular prism has 2 triangular ends and 3 rectangular sides: \\[ 2+3 = 5 \\] It has <b>5 faces</b>.";
    fig=u4triSVG(a,b,c,L);
  } else {
    prompt="A right cylinder has radius "+a+" cm and height "+L+" cm. How many flat faces does it have?";
    correct=2; cands=[1,3,0,4,5];
    sol="A cylinder has a flat circle at the top and a flat circle at the bottom. The side is curved, so it is not a flat face. It has <b>2 flat faces</b>.";
    fig=u4cylSVG(a,L,false);
  }
  var ds=u4d3(correct,cands);
  var opts=ds.map(function(d){return {t:String(d), fb:"Count again, one kind of face at a time: ends, then sides, then top and bottom."};});
  var q=mcq(prompt, {t:String(correct), fb:"Yes: that count covers every face of the solid exactly once."}, opts, sol, {mode:kind, a:a, b:b, L:L});
  q.figure=fig;
  return q;
}, ["List the faces by kind first: ends, sides, top and bottom.", "Count the faces of one kind, then add the counts for the other kinds."]);

E("u4-vol-base-times-height", 4, ["9.7"], 1, "gen", function(){
  var B=ri(8,60), h=ri(3,15);
  var obj=pick(["right prism","right triangular prism","right rectangular prism"]);
  var q=numq("A "+obj+" has a base with area "+B+" cm\\(^{2}\\) and a height of "+h+" cm. Find its volume, in cubic centimetres.", B*h, 0.01,
    "The volume of a right prism is the base area multiplied by the height: \\[ \\begin{aligned} V &= B \\times h \\\\ &= "+B+" \\times "+h+" \\\\ &= "+(B*h)+" \\end{aligned} \\] The volume is <b>"+(B*h)+" cm\\(^{3}\\)</b>.",
    {mode:"base-height", B:B, h:h}); q.figure=m8PrismBaseSVG(obj==="right triangular prism"?"tri":(obj==="right rectangular prism"?"rect":"generic"), B+" cm\u00B2", h+" cm"); return q;
}, ["For any right prism, volume is base area multiplied by height.", "Multiply the given base area by the given height."]);

E("u4-sa-from-net", 4, ["9.3"], 1, "gen", function(){
  var l=ri(3,11), w=ri(3,11), h=ri(2,9);
  var top=l*w, front=l*h, side=w*h;
  var sa=2*(top+front+side);
  var once=top+front+side;
  var ds=u4d3(sa,[once,2*top+front+side,top+2*front+2*side,sa+top,4*(top+front+side)]);
  var opts=ds.map(function(d){
    var fb=(d===once)?"That adds each different face only once: every face on a prism has a matching partner opposite it.":"That total double-counts or misses a face: each of the three face areas must appear exactly twice.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("A net of a right rectangular prism has three different face areas: "+top+" cm\\(^{2}\\) for the top, "+front+" cm\\(^{2}\\) for the front and "+side+" cm\\(^{2}\\) for the side. What is the surface area of the prism, in square centimetres?",
    {t:String(sa), fb:"Yes: each face area appears twice, once for each side of the prism."}, opts,
    "Surface area is the total area of the 2-D faces in the net. Each different face has an identical partner opposite it: \\[ \\begin{aligned} SA &= 2("+top+"+"+front+"+"+side+") \\\\ &= 2("+once+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"net-areas", l:l, w:w, h:h}); q.figure=m8NetAreaSVG(top,front,side); return q;
}, ["Surface area is the sum of the areas of all the flat faces in the net.", "Add the three different face areas, then double the total because each face has a partner."]);

E("u4-net-choose", 4, ["10.11"], 2, "gen", function(){
  var target=pick(["rect","tri","cyl"]);
  var names={rect:"right rectangular prism", tri:"right triangular prism", cyl:"right cylinder"};
  var kinds=[target].concat(["rect","tri","cyl","pyr"].filter(function(k){return k!==target;})).slice(0,4);
  kinds=shuffle(kinds);
  var letter="ABCD"[kinds.indexOf(target)];
  var svg='<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">';
  for(var i=0;i<4;i++){ svg+=u4mini(kinds[i],i*80); svg+=_txt(i*80+39,132,"ABCD"[i],14,true); }
  svg+="</svg>";
  var opts=["A","B","C","D"].filter(function(x){return x!==letter;}).map(function(x){
    return {t:"Net "+x, fb:"Picture that net folding up: its shapes make a different object than the one named."};
  });
  var q=mcq("Four nets are shown, labelled A, B, C and D. Which net folds to make a "+names[target]+"?",
    {t:"Net "+letter, fb:"Yes: its flat shapes are exactly the faces of a "+names[target]+"."}, opts,
    "Match the flat shapes to the faces of a "+names[target]+". Only one net has the right shapes in an arrangement that folds together, and it is <b>Net "+letter+"</b>.",
    {mode:target, letter:letter});
  q.figure=svg;
  return q;
}, ["List the faces the named object needs, then check each net for those shapes.", "A cylinder needs circles, a triangular prism needs triangles, and a rectangular prism needs only rectangles."]);

E("u4-net-predict", 4, ["10.2","10.1"], 1, "var", varset([
  function(){
    var q=mcq("A flat net is made of 2 triangles and 3 rectangles joined edge to edge. Which object can be made by folding this net?",
      {t:"Right triangular prism", fb:"Yes: the triangles become the ends and the rectangles wrap around as the sides."},
      [{t:"Right cylinder", fb:"A cylinder net needs circles for its ends: this net has none."},
       {t:"Right rectangular prism", fb:"A rectangular prism has only rectangular faces: the 2 triangles rule it out."},
       {t:"Square-based pyramid", fb:"A pyramid has one base and triangular sides meeting at a point: these rectangles form sides instead."}],
      "The 2 triangles become the two ends, and the 3 rectangles fold around to join them. The object is a <b>right triangular prism</b>.",
      {mode:"static-tri-net"}); q.figure=m8NetPlainSVG("tri",null); return q;
  },
  function(){
    var q=mcq("A flat net is made of 1 long rectangle with a circle joined to one long edge and a matching circle joined to the other long edge. Which object can be made by folding and rolling this net?",
      {t:"Right cylinder", fb:"Yes: the rectangle rolls into the curved side and the circles close the ends."},
      [{t:"Right triangular prism", fb:"A triangular prism needs triangular ends: this net has circles instead."},
       {t:"Right rectangular prism", fb:"A rectangular prism is built only from rectangles: the circles rule it out."},
       {t:"Square-based pyramid", fb:"A pyramid has triangular sides meeting at a point: nothing here folds to a point."}],
      "The long rectangle rolls into a curved side, and the two circles become the top and bottom. The object is a <b>right cylinder</b>.",
      {mode:"static-cyl-net"}); q.figure=m8NetPlainSVG("cyl",null); return q;
  },
  function(){
    var q=mcq("A flat net is made of 6 rectangles arranged in a cross shape, forming 3 matching pairs. Which object can be made by folding this net?",
      {t:"Right rectangular prism", fb:"Yes: the 3 pairs become the front and back, the sides, and the top and bottom."},
      [{t:"Right cylinder", fb:"A cylinder net needs circles for its ends: this net has none."},
       {t:"Right triangular prism", fb:"A triangular prism needs 2 triangular faces: every piece here is a rectangle."},
       {t:"Square-based pyramid", fb:"A pyramid needs triangular faces meeting at a point: these rectangles fold into a box shape."}],
      "Six rectangles in 3 matching pairs fold into opposite faces of a box shape. The object is a <b>right rectangular prism</b>.",
      {mode:"static-rect-net"}); q.figure=m8NetPlainSVG("rect",null); return q;
  }
]), ["Sort the flat shapes first: triangles, rectangles and circles each point to a different solid.", "Match the end shapes in the net to the ends of the object it will make."]);

E("u4-net-build-parts", 4, ["10.12"], 1, "gen", function(){
  var mode=pick(["tri","cyl","rect","incomplete-tri","incomplete-cyl"]);
  if(mode==="tri"){
    var Lt=ri(5,18), at=ri(3,12), bt=ri(3,12);
    var q=mcq("Ren cuts out flat pieces to build a right triangular prism from a net. The prism is "+Lt+" cm long and its triangular ends have legs of "+at+" cm and "+bt+" cm. Which set of pieces does the net need?",
      {t:"2 triangles and 3 rectangles", fb:"Yes: triangles for the two ends and rectangles for the three sides."},
      [{t:"2 triangles and 4 rectangles", fb:"That is one rectangle too many: a triangular prism has only 3 rectangular sides."},
       {t:"3 triangles and 2 rectangles", fb:"The counts are swapped: there are 2 ends and 3 sides on this prism."},
       {t:"2 circles and 3 rectangles", fb:"Circles belong to a cylinder net: this prism has triangular ends."}],
      "A right triangular prism has 2 triangular ends and 3 rectangular sides, so its net needs <b>2 triangles and 3 rectangles</b>.",
      {mode:"tri-parts"}); q.figure=m8TriPrismLabSVG(at+" cm",bt+" cm",Lt+" cm"); return q;
  }
  if(mode==="cyl"){
    var rc=ri(2,10), hc=ri(4,16);
    var q=mcq("Sofia cuts out flat pieces to build a right cylinder from a net. The cylinder has radius "+rc+" cm and height "+hc+" cm. Which set of pieces does the net need?",
      {t:"2 circles and 1 rectangle", fb:"Yes: the rectangle rolls into the curved side and the circles close the ends."},
      [{t:"2 circles and 2 rectangles", fb:"One rectangle is enough for the curved side: a second one has nowhere to fold."},
       {t:"1 circle and 1 rectangle", fb:"A cylinder has two round ends, top and bottom: one circle leaves an end open."},
       {t:"2 triangles and 1 rectangle", fb:"Triangles belong to a prism net: a cylinder has round ends instead."}],
      "A right cylinder has 2 circular ends and 1 curved side that unrolls into a rectangle, so its net needs <b>2 circles and 1 rectangle</b>.",
      {mode:"cyl-parts"}); q.figure=u4cylSVG(rc,hc,false); return q;
  }
  if(mode==="rect"){
    var lr=ri(4,15), wr=ri(3,12), hr=ri(2,10);
    var q=mcq("Marcus cuts out flat pieces to build a right rectangular prism from a net. The prism is "+lr+" cm long, "+wr+" cm wide and "+hr+" cm high. Which set of pieces does the net need?",
      {t:"6 rectangles in 3 matching pairs", fb:"Yes: each pair forms two opposite faces of the prism."},
      [{t:"6 rectangles all the same size", fb:"Six equal rectangles would make a cube: a general rectangular prism has 3 different pairs."},
       {t:"4 rectangles and 2 squares", fb:"That set only works for one special prism: the full net is 6 rectangles in pairs."},
       {t:"5 rectangles and 1 triangle", fb:"A rectangular prism has no triangular faces at all."}],
      "A right rectangular prism has 6 faces, and opposite faces match, so its net needs <b>6 rectangles in 3 matching pairs</b>.",
      {mode:"rect-parts"}); q.figure=u4boxSVG(lr,wr,hr); return q;
  }
  if(mode==="incomplete-tri"){
    var L=ri(5,14);
    var q=mcq("An unfinished net for a right triangular prism, "+L+" cm long, shows the 3 rectangles in a row but nothing else. Which pieces must be added to complete the net?",
      {t:"2 matching triangles, one on each side of the row", fb:"Yes: the two triangular ends are the only faces still missing."},
      [{t:"2 matching rectangles, one on each side of the row", fb:"Rectangles would add extra sides: the missing faces are the two ends."},
       {t:"1 triangle in the middle of the row", fb:"One triangle makes only one end: the prism needs an end at each side."},
       {t:"2 matching circles, one on each side of the row", fb:"Circles are the ends of a cylinder: this prism has triangular ends."}],
      "The 3 rectangles form the sides, so only the 2 ends are missing. The pieces to add are <b>2 matching triangles, one on each side of the row</b>.",
      {mode:"incomplete-tri", L:L}); q.figure=m8NetPlainSVG("inctri",null); return q;
  }
  var r=ri(3,9);
  var q=mcq("An unfinished net for a right cylinder shows the long rectangle and one circle of radius "+r+" cm. Which piece must be added to complete the net?",
    {t:"A second circle with radius "+r+" cm", fb:"Yes: the second end must match the first circle exactly."},
    [{t:"A second circle with radius "+(2*r)+" cm", fb:"That circle is too big: both ends of a cylinder are the same size."},
     {t:"A square with side "+r+" cm", fb:"A square cannot close a round end: the missing face is a circle."},
     {t:"A second rectangle the same size as the first", fb:"The curved side is already complete: the missing piece is the other end."}],
    "A cylinder has two matching circular ends, and one is still missing. The piece to add is <b>a second circle with radius "+r+" cm</b>.",
    {mode:"incomplete-cyl", r:r}); q.figure=m8NetPlainSVG("inccyl",r+" cm"); return q;
}, ["Count the faces of the finished object, then match the flat pieces to those faces.", "Name the ends of the object first, then count the sides that join them."]);

E("u4-sa-rect-prism", 4, ["9.4"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", the sides are "+w+" by "+h+", and the top and bottom are "+l+" by "+w+": \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= 2("+fmt(l*w+l*h+w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);

E("u4-sa-tri-prism", 4, ["9.4"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var sa=a*b+(a+b+c)*L;
  var q=numq("Find the surface area of the right triangular prism shown, in square centimetres.", sa, 0.01,
    "Two triangular ends plus three rectangles along the length: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+b+c)*L)+" \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"tri-sa", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Split the surface into the two triangular ends and the three rectangles.", "Find the ends first, then multiply the perimeter of one end by the length for the rectangles."]);

E("u4-sa-cylinder", 4, ["9.6"], 2, "gen", function(){
  var r=ri(2,9), h=ri(3,14);
  var sa=u4r1(2*3.14*r*(r+h));
  var q=numq("Find the surface area of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sa, 0.6,
    "Two circles plus the curved side, which unrolls into a rectangle: \\[ \\begin{aligned} SA &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3.14)("+r+")("+r+"+"+h+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-sa", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Unroll the cylinder in your mind: two circles and one rectangle.", "Use the radius for both circle areas and for the width around the curved side."]);

E("u4-sa-problem-wrap", 4, ["9.5"], 2, "gen", function(){
  if(pick(["cans","paper"])==="cans"){
    var l=ri(4,10), w=ri(3,9), h=ri(3,8);
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([20,25,30,40,50]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q=numq("A storage box shaped like a right rectangular prism measures "+l+" m long, "+w+" m wide and "+h+" m high. It is painted on all outside faces. One can of paint covers "+cover+" square metres. How many cans of paint are needed?", cans, 0.01,
      "Find the surface area first, then divide by the coverage and round up: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] Then \\("+sa+" \\div "+cover+" \\approx "+fmt(u4r2(sa/cover))+"\\), and a part can cannot be bought. The number of cans needed is <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover}); q.figure=m8BoxLabSVG(l+" m",w+" m",h+" m",false); return q;
  }
  var l2=ri(20,60)/2, w2=ri(16,44)/2, h2=ri(12,36)/2;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var q=numq("A gift box shaped like a right rectangular prism measures "+fmt(l2)+" cm long, "+fmt(w2)+" cm wide and "+fmt(h2)+" cm high. Wrapping paper covers all faces with no overlap. How many square centimetres of paper are needed?", sa2, 0.01,
    "The paper must cover the whole surface of the box: \\[ \\begin{aligned} SA &= 2("+fmt(l2*w2)+"+"+fmt(l2*h2)+"+"+fmt(w2*h2)+") \\\\ &= "+fmt(sa2)+" \\end{aligned} \\] The paper needed is <b>"+fmt(sa2)+" cm\\(^{2}\\)</b>.",
    {mode:"wrap-paper", l:l2, w:w2, h:h2}); q.figure=m8BoxLabSVG(fmt(l2)+" cm",fmt(w2)+" cm",fmt(h2)+" cm",false); return q;
}, ["Work out the total surface area before using the coverage or finishing the problem.", "Divide the surface area by the coverage per can and round up, since part cans cannot be bought."]);

E("u4-vol-rect-prism", 4, ["9.11"], 1, "gen", function(){
  var l=ri(3,13), w=ri(2,11), h=ri(2,10);
  var V=l*w*h;
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(V,[sa,l+w+h,l*w,l*w*h+l,l*w*(h+1),l*(w+1)*h]);
  var opts=ds.map(function(d){
    var fb=(d===sa)?"That is the surface area in square units: volume counts the space inside, in cubic units.":"That value comes from the wrong combination of dimensions: volume multiplies all three together.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("What is the volume of the right rectangular prism shown, in cubic centimetres?",
    {t:String(V), fb:"Yes: length times width times height gives the space inside."}, opts,
    "Multiply the three dimensions: \\[ \\begin{aligned} V &= l \\times w \\times h \\\\ &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] The volume is <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"rect-vol", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Volume counts the space inside the prism, so all three dimensions are used.", "Multiply length by width by height."]);

E("u4-vol-tri-prism", 4, ["9.7","9.11"], 1, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var B=a*b/2; var V=B*L;
  var q=numq("Find the volume of the right triangular prism shown, in cubic centimetres.", V, 0.01,
    "Find the area of the triangular base first, then multiply by the length of the prism: \\[ \\begin{aligned} B &= "+FR(1,2)+"\\times "+a+"\\times "+b+" = "+fmt(B)+" \\\\ V &= B \\times L \\\\ &= "+fmt(B)+" \\times "+L+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"tri-vol", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Volume of a prism is base area multiplied by the length it runs for.", "Find the triangle area with one half times leg times leg, then multiply by the prism length."]);

E("u4-vol-cylinder", 4, ["9.9"], 1, "gen", function(){
  var r=ri(2,10), h=ri(3,15);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Find the volume of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in cubic centimetres, to one decimal place.", V, 0.6,
    "A cylinder is a prism with a circular base, so its volume is base area times height: \\[ \\begin{aligned} V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"cyl-vol", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Treat the cylinder like a prism whose base is a circle.", "Find the circle area with pi times radius squared, then multiply by the height."]);

E("u4-vol-missing-height", 4, ["9.7"], 1, "gen", function(){
  var h=ri(2,15), B=pick([6,8,10,12,14,15,16,18,20,24,25,28,30,35,40,50]);
  var V=B*h;
  var kind=pick(["prism","tri","cylinder"]);
  var label={prism:"right prism", tri:"right triangular prism", cylinder:"right cylinder"}[kind];
  var ds=u4d3(h,[h+1,h-1,h+2,2*h,V-B]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Try again: the height is the volume divided by the base area, and "+B+" times "+d+" is not "+V+"."};});
  var q=mcq("The volume of a "+label+" is "+V+" cm\\(^{3}\\), and the area of its base is "+B+" cm\\(^{2}\\). What is its height, in centimetres?",
    {t:String(h), fb:"Yes: "+B+" times "+h+" gives the volume "+V+"."}, opts,
    "Volume is base area times height, so divide the volume by the base area: \\[ \\begin{aligned} h &= V \\div B \\\\ &= "+V+" \\div "+B+" \\\\ &= "+h+" \\end{aligned} \\] The height is <b>"+h+" cm</b>.",
    {mode:kind, B:B, h:h}); q.figure=m8PrismBaseSVG(kind==="tri"?"tri":(kind==="cylinder"?"cyl":"generic"), B+" cm\u00B2", "?"); return q;
}, ["Volume equals base area times height, so one of those values is missing here.", "Divide the volume by the base area to undo the multiplication."]);

E("u4-base-volume-link", 4, ["9.8"], 1, "var", varset([
  function(){
    var q=mcq("A right prism has a base area of 24 cm\\(^{2}\\). Layers of the base shape, each 1 cm thick, are stacked to a height of 5 cm. Which statement explains the volume?",
      {t:"Each layer holds 24 cm\\(^{3}\\), so 5 layers hold 120 cm\\(^{3}\\) in total", fb:"Right: the base area gives the volume of one layer, and the height counts the layers."},
      [{t:"Each layer holds 5 cm\\(^{3}\\), so 5 layers hold 25 cm\\(^{3}\\) in total", fb:"The layer volume comes from the base area, not the height: swap the two numbers."},
       {t:"The volume is 24 plus 5, which is 29 cm\\(^{3}\\), found by adding base and height", fb:"Stacking layers multiplies rather than adds: think of repeated layers, not a sum."},
       {t:"The volume depends only on the shape of the base, so it stays 24 cm\\(^{3}\\)", fb:"A taller stack holds more: the height must enter the calculation."}],
      "One layer, 1 cm thick, has volume equal to the base area: 24 cm\\(^{3}\\). Stacking 5 layers gives \\(24 \\times 5 = 120\\) cm\\(^{3}\\). The volume is <b>120 cm\\(^{3}\\), found as base area times height</b>.",
      {mode:"static-layers"}); q.figure=m8LayersSVG("24 cm\u00B2","5 cm",5); return q;
  },
  function(){
    var q=mcq("Two right prisms have the same height. Prism P has a base area of 18 cm\\(^{2}\\) and Prism Q has a base area of 36 cm\\(^{2}\\). How do their volumes compare?",
      {t:"Prism Q has twice the volume of Prism P", fb:"Right: with equal heights, doubling the base area doubles the volume."},
      [{t:"The two prisms have equal volumes because their heights match", fb:"Equal heights alone do not equalize volume: the base areas differ."},
       {t:"Prism Q has four times the volume of Prism P", fb:"The base area doubled, it did not grow by a factor of four."},
       {t:"Prism P has twice the volume of Prism Q", fb:"The prism with the larger base area holds more, not less."}],
      "Volume is base area times height. The heights are equal, and \\(36 = 2 \\times 18\\), so <b>Prism Q has twice the volume of Prism P</b>.",
      {mode:"static-double-base"}); q.figure=m8TwoBaseSVG("18 cm\u00B2","36 cm\u00B2"); return q;
  },
  function(){
    var q=mcq("The base of a right cylinder is a circle with area 50.24 cm\\(^{2}\\). The cylinder is 6 cm high. Which calculation gives its volume?",
      {t:"50.24 times 6, which is 301.44 cm\\(^{3}\\)", fb:"Right: a cylinder follows the same base area times height rule as a prism."},
      [{t:"50.24 times 2, which is 100.48 cm\\(^{3}\\)", fb:"The multiplier is the height of the cylinder, which is 6, not 2."},
       {t:"50.24 plus 6, which is 56.24 cm\\(^{3}\\)", fb:"Volume stacks the base through the height: multiply rather than add."},
       {t:"50.24 times 6 times 6, which is 1808.64 cm\\(^{3}\\)", fb:"The height is used once: the base area already accounts for the round shape."}],
      "A cylinder is a prism with a circular base, so the prism rule applies: \\[ \\begin{aligned} V &= B \\times h \\\\ &= 50.24 \\times 6 \\\\ &= 301.44 \\end{aligned} \\] The volume is <b>301.44 cm\\(^{3}\\)</b>.",
      {mode:"static-cyl-base"}); q.figure=m8CylBaseSVG("50.24 cm\u00B2","6 cm"); return q;
  }
]), ["Think of the solid as a stack of identical layers, each shaped like the base.", "One layer has volume equal to the base area, so multiply by the number of layers (the height)."]);

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
  var names=["Tank A","Tank B","Tank C","Tank D"];
  var opts=names.filter(function(n,i){return i!==best;}).map(function(n){
    var i=names.indexOf(n);
    return {t:n, fb:n+" holds "+vols[i]+" cm\\(^{3}\\), which is less than the largest volume."};
  });
  var desc=sets.map(function(s,i){return names[i]+": "+s[0]+" cm by "+s[1]+" cm by "+s[2]+" cm";}).join("; ");
  var q=mcq("Four storage tanks are shaped like right rectangular prisms. "+desc+". Which tank holds the most water?",
    {t:names[best], fb:"Yes: its volume, "+vols[best]+" cm\\(^{3}\\), is the largest of the four."}, opts,
    "Find each volume by multiplying the three dimensions: "+vols.map(function(v,i){return names[i]+" holds "+v+" cm\\(^{3}\\)";}).join(", ")+". The largest volume belongs to <b>"+names[best]+"</b>.",
    {mode:"holds-most", best:best}); q.figure=m8TanksSVG(sets,names); return q;
}, ["Holding the most water means having the greatest volume.", "Multiply the three dimensions of each tank, then compare the four volumes."]);

E("u4-position-volume", 4, ["9.10"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var V=l*w*h;
  var ds=u4d3(V,[l*w*(h+1),l*(w+1)*h,(l+1)*w*h,2*V,l*w+w*h]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Tipping changes which face is down, not the dimensions themselves: multiply the same three numbers."};});
  var q=mcq("A fish tank shaped like a right rectangular prism is "+l+" cm long, "+w+" cm wide and "+h+" cm high, and it is full of water. The tank is tipped carefully onto a different face without spilling. What is the volume of water, in cubic centimetres?",
    {t:String(V), fb:"Yes: turning the tank over does not change the amount of water inside."}, opts,
    "Position does not affect volume. The same three dimensions multiply in any position: \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] The volume of water is <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"tipped", l:l, w:w, h:h}); q.figure=u4boxSVG(l,w,h); return q;
}, ["Ask whether turning the tank changes any of its three dimensions.", "Multiply the same length, width and height: tipping only changes which face is on the bottom."]);

E("u4-sa-open-tank", 4, ["9.5","9.6"], 3, "gen", function(){
  var r=ri(2,8), h=ri(4,14);
  var sa=u4r1(3.14*r*r+2*3.14*r*h);
  var q=numq("A garden water barrel is shaped like a right cylinder with radius "+r+" m and height "+h+" m. It is open at the top. Metal sheet is used for the bottom and the curved side only. How many square metres of metal are needed? Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", sa, 0.6,
    "An open top means only one circle is needed, for the bottom, plus the curved side: \\[ \\begin{aligned} SA &= \\pi r^{2}+2\\pi r h \\\\ &= 3.14("+r+")^{2}+2(3.14)("+r+")("+h+") \\\\ &= "+fmt(u4r2(3.14*r*r))+"+"+fmt(u4r1(2*3.14*r*h))+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The metal needed is <b>"+fmt(sa)+" m\\(^{2}\\)</b>.",
    {mode:"open-barrel", r:r, h:h}); q.figure=m8CylLabSVG(r+" m",h+" m",false,true); return q;
}, ["An open top changes the count of circles: read the problem for which parts are covered.", "Add one circle for the bottom to the curved side area."]);

E("u4-vol-cylinder-diam", 4, ["9.9","9.11"], 3, "gen", function(){
  var r=ri(2,9); var d=2*r; var h=ri(4,16);
  var V=u4r1(3.14*r*r*h);
  var q=numq("A water tank is shaped like a right cylinder with diameter "+d+" cm and height "+h+" cm. How many cubic centimetres of water does it hold when full? Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", V, 0.6,
    "Halve the diameter to get the radius, then use base area times height: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The tank holds <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"diam-vol", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["The formula needs the radius, but the problem gives the diameter.", "Halve the diameter first, then square the radius and multiply by pi and the height."]);

E("u4-sa-missing-edge", 4, ["9.5"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(h,[h+1,h+2,h-1,2*h,h+3]);
  var opts=ds.map(function(d){
    var test=2*(l*w+l*d+w*d);
    return {t:String(d), fb:"With height "+d+" the surface area would be "+test+" cm\\(^{2}\\), not "+sa+"."};
  });
  var q=mcq("A right rectangular prism is "+l+" cm long and "+w+" cm wide, and its total surface area is "+sa+" cm\\(^{2}\\). What is its height, in centimetres?",
    {t:String(h), fb:"Yes: height "+h+" gives exactly the stated surface area."}, opts,
    "Try the height in the surface area formula and solve. With height \\(h\\): \\[ \\begin{aligned} 2("+fmt(l*w)+") + 2("+l+"+"+w+")h &= "+sa+" \\\\ "+(2*l*w)+" + "+(2*(l+w))+"h &= "+sa+" \\\\ h &= "+h+" \\end{aligned} \\] The height is <b>"+h+" cm</b>.",
    {mode:"missing-edge", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm","?",false); return q;
}, ["Put the unknown height into the surface area formula as a letter.", "Work out the known face areas first, then see what is left for the faces that use the height."]);

/* ----- bank-u5.js ----- */
// Math 8 Unit 5 Percent, Ratio and Rate question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 1745 to 2564).
// CRMARKS: u5-discount-then-tax=3
// CRMARKS: u5-find-the-whole=3
// CRMARKS: u5-percent-change=3
// CRMARKS: u5-percent-of-number=3
// CRMARKS: u5-percent-of-percent-quantity=2
// CRMARKS: u5-rate-problem-solve=2
// CRMARKS: u5-ratio-problem-solve=2
/* Unit 5: Percent, Ratio and Rate */
// Unit 5: Percent, Ratio and Rate (Math 8, NL). Entries only; helpers prefixed u5.
function u5gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u5pick3(c, cands) { var out = [], seen = [c]; for (var i = 0; i < cands.length && out.length < 3; i++) { if (seen.indexOf(cands[i].t) < 0) { seen.push(cands[i].t); out.push(cands[i]); } } return out; }
function u5r2(x) { return Math.round(x * 100) / 100; }
function u5gridSVG(shaded) {
  var cell = 17, W = cell * 10 + 2, s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + W + '" viewBox="0 0 ' + W + ' ' + W + '" role="img" aria-label="Hundred grid with ' + shaded + ' squares shaded">';
  for (var r = 0; r < 10; r++) { for (var c = 0; c < 10; c++) { var idx = r * 10 + c; s += '<rect x="' + (1 + c * cell) + '" y="' + (1 + r * cell) + '" width="' + cell + '" height="' + cell + '" fill="' + (idx < shaded ? FIG_SHADE : "#ffffff") + '" stroke="' + FIG_INK + '" stroke-width="1"/>'; } }
  return s + '</svg>';
}

// 1. L1, 3.1, var: contexts where a percent is over 100% or between 0% and 1%.
E("u5-context-extreme-percent", 5, ["3.1"], 1, "var", varset([
  function () {
    var sol = "A percent over 100% compares a new amount with an earlier whole amount, and the new amount is larger: \\[ \\begin{aligned} 145\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>the ferry carried 145% as many passengers this July as it carried last July</b>.";
    return mcq("Which situation can be described by a percent of 145%?", { t: "The ferry carried 145% as many passengers this July as it carried last July.", fb: "Correct: the new total is compared with last July and is larger than that whole." }, [
      { t: "A student ate 145% of one whole sandwich at lunch in the cafeteria.", fb: "One sandwich is the whole that can be eaten, so the part eaten cannot pass 100% of it." },
      { t: "A class has 145% of its students absent today out of the whole class.", fb: "The absent students are part of the class, so that share cannot pass 100%." },
      { t: "A tank is filled to 145% of its full capacity with water pumped in from a hose.", fb: "Capacity is the whole tank, so the water in it cannot pass 100% of capacity." }
    ], sol, { mode: "ctx-145" });
  },
  function () {
    var sol = "A percent between 0% and 1% describes a very small part of a large whole: \\[ \\begin{aligned} 0\\% < 0.4\\% &< 1\\% \\end{aligned} \\] So a fitting context is <b>about 0.4% of the people in a town have a February 29 birthday</b>.";
    return mcq("Which situation can be described by a percent of 0.4%?", { t: "About 0.4% of the people in a town have a February 29 birthday.", fb: "Correct: it is a tiny share of a large group, well under 1%." }, [
      { t: "A player scored on 0.4% of 200 shots on goal this season.", fb: "That would be less than one goal out of 200 shots, and goals come in whole numbers here." },
      { t: "A survey of 10 students found 0.4% prefer winter.", fb: "With only 10 students, the smallest share for one student is 10%, not 0.4%." },
      { t: "A recipe uses 0.4% as the share of flour in a 10 g pinch of spice mix.", fb: "That share is far too small for a main ingredient measured in a 10 g pinch in this context." }
    ], sol, { mode: "ctx-04" });
  },
  function () {
    var sol = "Growth compared with an earlier value can pass the earlier whole: \\[ \\begin{aligned} 212\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>the garden club has 212% as many members this year as it had three years ago</b>.";
    return mcq("Which situation can be described by a percent of 212%?", { t: "The garden club has 212% as many members this year as it had three years ago.", fb: "Correct: membership is compared with an earlier total and has more than doubled." }, [
      { t: "A goalie stopped 212% of all the shots he faced in one hockey game this season.", fb: "Saves are part of the shots faced, so that share cannot pass 100%." },
      { t: "A pie has 212% of its slices served at supper to the family.", fb: "The slices served are part of the one pie, so the share cannot pass 100%." },
      { t: "A phone battery is charged to 212% on its display screen at noon.", fb: "A full charge is 100% on the display, so the charge shown cannot pass it." }
    ], sol, { mode: "ctx-212" });
  },
  function () {
    var sol = "A percent under 1% fits a rare event in a very large group: \\[ \\begin{aligned} 0\\% < 0.75\\% &< 1\\% \\end{aligned} \\] So a fitting context is <b>about 0.75% of the tickets in a large provincial draw were sold in one small community</b>.";
    return mcq("Which situation can be described by a percent of 0.75%?", { t: "About 0.75% of the tickets in a large provincial draw were sold in one small community.", fb: "Correct: one small community accounts for a tiny share of a very large total." }, [
      { t: "A class of only 8 students has 0.75% of its students away today, out of the whole class.", fb: "With 8 students, one student away is already 12.5%, far above 0.75%." },
      { t: "A 4-slice pizza has 0.75% of its slices left over after the meal is done.", fb: "Slices are whole here, and one slice of four is 25%, not a share under 1%." },
      { t: "A team won 0.75% of the 12 games it played this month in its league.", fb: "Wins come in whole games, and one win in 12 games is already over 8%." }
    ], sol, { mode: "ctx-075" });
  },
  function () {
    var sol = "A price compared with its earlier price can rise past the original whole: \\[ \\begin{aligned} 108\\% &> 100\\% \\end{aligned} \\] So a fitting context is <b>this month the price of a trail pass is 108% of its price last month</b>.";
    return mcq("Which situation can be described by a percent of 108%?", { t: "This month the price of a trail pass is 108% of its price last month.", fb: "Correct: the new price is compared with the old price and is a little larger." }, [
      { t: "A runner completed 108% of the whole 10 km race course during the race.", fb: "The course is the whole route, so the part completed in the race cannot pass 100% of it." },
      { t: "A survey says 108% of one whole class picked art as a favourite subject.", fb: "The students picking art are part of the class, so the share cannot pass 100%." },
      { t: "A jug holds 108% of its full volume in juice right now on the counter.", fb: "The volume of the jug is the whole space, so the juice in it cannot pass 100%." }
    ], sol, { mode: "ctx-108" });
  }
]), ["Ask whether the percent compares with an earlier amount, which can be passed, or takes part of one whole, which cannot.", "First decide if the percent is over 100% or under 1%, then match it to a comparison or a tiny share."]);

// 2. L1, 3.5: express a percent in decimal or fractional form.
E("u5-percent-convert", 5, ["3.5"], 1, "gen", function () {
  var pool = [
    { s: "5", pn: 5, pd: 1 }, { s: "10", pn: 10, pd: 1 }, { s: "15", pn: 15, pd: 1 }, { s: "20", pn: 20, pd: 1 },
    { s: "25", pn: 25, pd: 1 }, { s: "30", pn: 30, pd: 1 }, { s: "35", pn: 35, pd: 1 }, { s: "40", pn: 40, pd: 1 },
    { s: "45", pn: 45, pd: 1 }, { s: "55", pn: 55, pd: 1 }, { s: "60", pn: 60, pd: 1 }, { s: "65", pn: 65, pd: 1 },
    { s: "70", pn: 70, pd: 1 }, { s: "75", pn: 75, pd: 1 }, { s: "80", pn: 80, pd: 1 }, { s: "85", pn: 85, pd: 1 },
    { s: "90", pn: 90, pd: 1 }, { s: "95", pn: 95, pd: 1 }, { s: "7", pn: 7, pd: 1 }, { s: "3", pn: 3, pd: 1 },
    { s: "12.5", pn: 25, pd: 2 }, { s: "37.5", pn: 75, pd: 2 }, { s: "62.5", pn: 125, pd: 2 }, { s: "87.5", pn: 175, pd: 2 },
    { s: "2.5", pn: 5, pd: 2 }, { s: "0.5", pn: 1, pd: 2 }, { s: "125", pn: 125, pd: 1 }, { s: "150", pn: 150, pd: 1 },
    { s: "175", pn: 175, pd: 1 }, { s: "200", pn: 200, pd: 1 }, { s: "250", pn: 250, pd: 1 }, { s: "110", pn: 110, pd: 1 },
    { s: "240", pn: 240, pd: 1 }, { s: "1", pn: 1, pd: 1 }, { s: "99", pn: 99, pd: 1 }, { s: "33", pn: 33, pd: 1 }
  ];
  var it = pick(pool), pval = it.pn / it.pd;
  if (Math.random() < 0.5) {
    var dec = pval / 100;
    var dpK = (fmt(dec, 4).split(".")[1] || "").length;
    var cands = [
      { t: fmtF(pval / 10, dpK), fb: "That divides by 10 only; a percent is out of 100, so divide by 100." },
      { t: fmtF(pval / 1000, dpK + 1), fb: "That divides by 1000, one place too far; a percent is out of 100." },
      { t: fmtF(pval, dpK + 1), fb: "That is the percent number itself; it still needs to be divided by 100." },
      { t: fmt(pval * 100, 2), fb: "That multiplies by 100, which is the move for turning a decimal into a percent." }
    ];
    var ds = u5pick3(fmt(dec, 4), cands);
    var sol = "Percent means out of 100, so divide by 100: \\[ \\begin{aligned} " + it.s + "\\% &= " + it.s + " \\div 100 \\\\ &= " + fmt(dec, 4) + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a decimal is <b>" + fmt(dec, 4) + "</b>.";
    return mcq("Express \\(" + it.s + "\\%\\) as a decimal.", { t: fmt(dec, 4), fb: "Correct: dividing the percent by 100 gives the decimal." }, ds, sol, { mode: "pct-dec", p: it.s });
  }
  var fn = it.pn, fd = it.pd * 100, g = u5gcd(fn, fd); fn /= g; fd /= g;
  var fracTex = fd === 1 ? fmt(fn, 0) : FR(fn, fd);
  var corr = "\\(" + fracTex + "\\)";
  var cands2 = [
    { t: "\\(" + FR(it.pn, it.pd * 10) + "\\)", fb: "That uses tenths; a percent is out of 100, not out of 10." },
    { t: "\\(" + FR(fd, fn) + "\\)", fb: "That flips the fraction over; the percent amount belongs in the numerator." },
    { t: "\\(" + FR(it.pn * 2, it.pd * 100) + "\\)", fb: "That doubles the numerator, which changes the value of the fraction." },
    { t: "\\(" + FR(it.pn, it.pd) + "\\)", fb: "That drops the division by 100 that the percent sign stands for." }
  ];
  // reduce candidate fractions for display where they are unreduced by design; keep as written except flip candidate
  var ds2 = u5pick3(corr, cands2);
  var sol2 = "Write the percent as a fraction out of 100, then reduce: \\[ \\begin{aligned} " + it.s + "\\% &= " + FR(it.pn, it.pd * 100) + " \\\\ &= " + fracTex + " \\end{aligned} \\] So \\(" + it.s + "\\%\\) as a fraction in lowest terms is <b>" + corr + "</b>.";
  return mcq("Express \\(" + it.s + "\\%\\) as a fraction in lowest terms.", { t: corr, fb: "Correct: the percent becomes a fraction out of 100, reduced to lowest terms." }, ds2, sol2, { mode: "pct-frac", p: it.s });
}, ["Percent means out of 100, so every conversion starts from hundredths.", "First write the percent over 100, then turn it into a decimal or reduce the fraction."]);

// 3. L1, 3.6: express a decimal in percent or fractional form.
E("u5-decimal-convert", 5, ["3.6"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var k = ri(1, 2500), v = k / 1000, pct = v * 100;
    var dpP = (fmt(pct, 2).split(".")[1] || "").length;
    var cands = [
      { t: fmtF(pct / 10, 3) + "%", fb: "That moves the decimal point one place only; a percent needs two places." },
      { t: fmtF(pct * 10, dpP) + "%", fb: "That moves the decimal point three places, one too many." },
      { t: fmtF(v, 3) + "%", fb: "That keeps the decimal value and just adds a percent sign; the value must be multiplied by 100." },
      { t: fmt(pct / 100, 3) + "%", fb: "That divides by 100, which is the move for turning a percent into a decimal." }
    ];
    var ds = u5pick3(fmt(pct, 2) + "%", cands);
    var sol = "Multiply by 100 to turn a decimal into a percent: \\[ \\begin{aligned} " + fmt(v, 3) + " \\times 100 &= " + fmt(pct, 2) + " \\end{aligned} \\] So \\(" + fmt(v, 3) + "\\) as a percent is <b>" + fmt(pct, 2) + "%</b>.";
    return mcq("Express \\(" + fmt(v, 3) + "\\) as a percent.", { t: fmt(pct, 2) + "%", fb: "Correct: multiplying the decimal by 100 gives the percent." }, ds, sol, { mode: "dec-pct", v: v });
  }
  var den0 = pick([10, 100, 1000]), num0 = ri(1, den0 * 2), attD = 0;
  while (num0 === den0 && attD < 60) { num0 = ri(1, den0 * 2); attD++; }
  if (num0 === den0) num0 = den0 + 1;
  var vv = num0 / den0, decPlaces = den0 === 10 ? 1 : den0 === 100 ? 2 : 3;
  var g2 = u5gcd(num0, den0), fn2 = num0 / g2, fd2 = den0 / g2;
  var fracTex2 = fd2 === 1 ? fmt(fn2, 0) : FR(fn2, fd2);
  var corr2 = "\\(" + fracTex2 + "\\)";
  var cands2 = [
    { t: "\\(" + FR(fd2, fn2) + "\\)", fb: "That flips the fraction over; the decimal value belongs in the numerator over its place value." },
    { t: "\\(" + FR(num0, den0 * 10) + "\\)", fb: "That uses the next place value down, which makes the fraction ten times too small." },
    { t: "\\(" + FR(num0 * 10, den0) + "\\)", fb: "That makes the numerator ten times too big for the place value shown." }
  ];
  var ds2b = u5pick3(corr2, cands2);
  var sol2 = "Write the decimal over its place value, then reduce: \\[ \\begin{aligned} " + fmt(vv, decPlaces) + " &= " + FR(num0, den0) + " \\\\ &= " + fracTex2 + " \\end{aligned} \\] So \\(" + fmt(vv, decPlaces) + "\\) as a fraction in lowest terms is <b>" + corr2 + "</b>.";
  return mcq("Express \\(" + fmt(vv, decPlaces) + "\\) as a fraction in lowest terms.", { t: corr2, fb: "Correct: the decimal is written over its place value and reduced." }, ds2b, sol2, { mode: "dec-frac", v: vv });
}, ["A decimal and a percent differ by a factor of 100, and a decimal fraction uses its place value as the denominator.", "First name the place value of the last decimal digit; that sets the denominator."]);

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
    var dpV = (fmt(val, 3).split(".")[1] || "").length;
    var dpM = Math.max(3, dpV + 1);
    var cands = [
      { t: fmtF(val * 10, dpV), fb: "That is ten times too large; divide the numerator by the denominator as written." },
      { t: fmtF(val / 10, dpM), fb: "That is ten times too small; divide the numerator by the denominator as written." },
      { t: fmtF(d / n, dpM), fb: "That divides the denominator by the numerator, flipping the fraction over." },
      { t: fmt(Math.floor(val), 0) + "." + fmt(n, 0), fb: "That writes the numerator after the decimal point instead of dividing." }
    ];
    var ds = u5pick3(fmt(val, 3), cands);
    var sol = "A fraction means the numerator divided by the denominator: \\[ \\begin{aligned} " + FR(n, d) + " &= " + n + " \\div " + d + " \\\\ &= " + fmt(val, 3) + " \\end{aligned} \\] So the decimal form is <b>" + fmt(val, 3) + "</b>.";
    return mcq("Express \\(" + FR(n, d) + "\\) as a decimal.", { t: fmt(val, 3), fb: "Correct: dividing the numerator by the denominator gives the decimal." }, ds, sol, { mode: "frac-dec", n: n, d: d });
  }
  var dpV2 = (fmt(val, 3).split(".")[1] || "").length;
  var dpP2 = (fmt(pct, 2).split(".")[1] || "").length;
  var dpM2 = Math.max(dpP2 + 1, dpV2);
  var cands2 = [
    { t: fmtF(pct / 10, dpM2) + "%", fb: "That moves the decimal point one place only after dividing; a percent needs two places." },
    { t: fmtF(pct * 10, dpP2) + "%", fb: "That moves the decimal point one place too many after dividing." },
    { t: fmtF(val, dpM2) + "%", fb: "That is the decimal form with a percent sign added; the value still needs to be multiplied by 100." },
    { t: fmt(d / n * 100, 1) + "%", fb: "That flips the fraction before converting, so the percent is far too large." }
  ];
  var ds2 = u5pick3(fmt(pct, 2) + "%", cands2);
  var sol2 = "Divide first, then multiply by 100 for a percent: \\[ \\begin{aligned} " + FR(n, d) + " &= " + fmt(val, 3) + " \\\\ " + fmt(val, 3) + " \\times 100 &= " + fmt(pct, 2) + " \\end{aligned} \\] So the percent form is <b>" + fmt(pct, 2) + "%</b>.";
  return mcq("Express \\(" + FR(n, d) + "\\) as a percent.", { t: fmt(pct, 2) + "%", fb: "Correct: the fraction is divided out, then multiplied by 100." }, ds2, sol2, { mode: "frac-pct", n: n, d: d });
}, ["A fraction bar means division: numerator divided by denominator.", "First divide the numerator by the denominator, then decide if a percent is also needed."]);

// 5. L1, 3.8: express a two-term ratio from a context.
E("u5-two-term-ratio", 5, ["3.8"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters" }, { a: "girls", b: "boys" }, { a: "wins", b: "losses" },
    { a: "apples", b: "oranges" }, { a: "dogs", b: "cats" }, { a: "cars", b: "trucks" },
    { a: "forwards", b: "defenders" }, { a: "novels", b: "magazines" }
  ];
  var cx = pick(ctxs), a = ri(2, 15), b = ri(2, 15), att = 0;
  while (u5gcd(a, b) !== 1 && att < 60) { a = ri(2, 15); b = ri(2, 15); att++; }
  if (u5gcd(a, b) !== 1) { a = 3; b = 5; }
  var corr = a + ":" + b;
  var cands = [
    { t: b + ":" + a, fb: "That reverses the order; the ratio is asked as " + cx.a + " to " + cx.b + "." },
    { t: a + ":" + (a + b), fb: "That compares the first group with the total; the question asks for the first group to the second group." },
    { t: b + ":" + (a + b), fb: "That compares the second group with the total, not the two groups with each other." },
    { t: (a + b) + ":" + b, fb: "That puts the total first; a two-term ratio here compares the two named groups only." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Match the counts in the order named: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + a + " : " + b + " \\end{aligned} \\] So the ratio of " + cx.a + " to " + cx.b + " is <b>" + corr + "</b>.";
  return mcq("A group has " + a + " " + cx.a + " and " + b + " " + cx.b + ". What is the ratio of " + cx.a + " to " + cx.b + "?", { t: corr, fb: "Correct: the counts are written in the order the groups are named." }, ds, sol, { mode: "two-term", a: a, b: b });
}, ["A ratio keeps the order of the groups exactly as they are named in the question.", "First write the count for the group named first, then the count for the group named second."]);

// 6. L1, 3.16: express a rate using words or symbols.
E("u5-express-rate", 5, ["3.16"], 1, "gen", function () {
  var tmpls = [
    { desc: "A bus travels {A} km in {B} h", u1: "km", u2: "h", w1: "kilometres", w2: "hour" },
    { desc: "A tap fills {A} L in {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "A worker earns ${A} in {B} h", u1: "$", u2: "h", w1: "dollars", w2: "hour" },
    { desc: "A printer prints {A} pages in {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "A car uses {A} L of fuel for {B} km driven", u1: "L", u2: "km", w1: "litres", w2: "kilometre" },
    { desc: "A ferry carries {A} passengers in {B} trips", u1: "passengers", u2: "trips", w1: "passengers", w2: "trip" },
    { desc: "A heart beats {A} times in {B} min", u1: "beats", u2: "min", w1: "beats", w2: "minute" },
    { desc: "Snow falls {A} cm in {B} h", u1: "cm", u2: "h", w1: "centimetres", w2: "hour" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "That reverses the rate; the amount measured goes first and the unit it is measured against goes second." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "That swaps the two units; each number must keep the unit it was measured in." },
    { t: A + " " + t.u1 + " in total", fb: "That gives only the amount; a rate must also say what the amount is measured against." },
    { t: A + ":" + B, fb: "That is ratio notation for two amounts of the same kind; a rate keeps both units written in." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate joins an amount to the unit it is measured against: \\[ \\begin{aligned} \\text{rate} &= " + A + " \\text{ " + t.w1 + " per } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Written with symbols, the rate is <b>" + corr + "</b>.";
  return mcq(desc + ". Which expression records this rate with symbols?", { t: corr, fb: "Correct: the measured amount and its unit come first, then the unit it is measured against." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["A rate compares two different units, and both units stay in the written rate.", "First write the measured amount with its unit, then a slash, then the second amount with its unit."]);

// 7. L2, 3.2: represent a fractional percent on a grid.
E("u5-grid-fractional-percent", 5, ["3.2"], 1, "gen", function () {
  var fracs = [{ v: 0.25, w: "one quarter" }, { v: 0.5, w: "one half" }, { v: 0.75, w: "three quarters" }];
  var f = pick(fracs), base = pick([0, 1, 2, 3, 5, 6, 8, 9, 12, 15, 17, 21, 24, 28, 31, 35, 38, 42, 45, 52, 57, 63, 68, 74, 81, 90]);
  var p = base + f.v, pStr = fmt(p, 2);
  var comp = 1 - f.v, compW = comp === 0.25 ? "one quarter" : comp === 0.5 ? "one half" : "three quarters";
  var corr = base === 0 ? "Shade " + f.w + " of one square" : "Shade " + base + " full squares and " + f.w + " of one more square";
  var third = f.v === 0.5
    ? (base === 0 ? "Shade half of each of two squares" : "Shade " + base + " full squares and half of each of two more squares")
    : (base === 0 ? "Shade " + compW + " of one square" : "Shade " + base + " full squares and " + compW + " of one more square");
  var thirdFb = f.v === 0.5 ? "That splits the half across two squares, shading a full square in total instead of half of one square." : "That shades the rest of the last square instead of the fractional part named by the percent.";
  var cands = [
    { t: base === 0 ? "Shade one full square only" : "Shade " + (base + 1) + " full squares, with no part of another square", fb: "That rounds the percent up to the next whole square and loses the fractional part." },
    { t: base === 0 ? "Shade no squares at all on the grid" : "Shade " + base + " full squares only, with no part of another square", fb: "That drops the fractional part of the percent; part of one more square is still needed." },
    { t: third, fb: thirdFb }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Each full square on a 100 grid is 1%, and the leftover part shades part of one square: \\[ \\begin{aligned} " + pStr + "\\% &= " + base + "\\% + " + fmt(f.v, 2) + "\\% \\end{aligned} \\] So the representation is: <b>" + corr + "</b>.";
  return mcq("A 100-square grid is used to model a percent. Each full square stands for 1%. How is \\(" + pStr + "\\%\\) represented on the grid?", { t: corr, fb: "Correct: the whole part gives full squares and the fractional part gives part of one more square." }, ds, sol, { mode: "grid-frac-pct", p: pStr });
}, ["Split the percent into its whole part and its fractional part before thinking about squares.", "First count the full squares from the whole number part of the percent."]);

// 8. L2, 3.3: represent a percent over 100 using grids.
E("u5-grid-over-100", 5, ["3.3"], 1, "gen", function () {
  var grids = ri(1, 2), extra = ri(3, 95), p = grids * 100 + extra;
  var gw = grids === 1 ? "one full grid" : "two full grids";
  var corr = "Shade " + gw + " and " + extra + " squares of another grid";
  var cands = [
    { t: "Shade " + extra + " squares of one grid, and none of another", fb: "That shows only the part past the full grids; the full grids themselves must be shaded too." },
    { t: grids === 1 ? "Shade two full grids, and no squares of another grid" : "Shade three full grids, and no squares of another grid", fb: "That rounds up to whole grids only and adds squares the percent does not call for." },
    { t: "Shade " + gw + " and " + (100 - extra) + " squares of another grid", fb: "That shades the complement on the last grid instead of the extra squares named by the percent." },
    { t: "Shade " + p + " squares of one grid, and no squares of another", fb: "One grid holds only 100 squares, so a percent this large needs more than one grid." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Each grid holds 100 squares, so count off full hundreds first: \\[ \\begin{aligned} " + p + "\\% &= " + (grids * 100) + "\\% + " + extra + "\\% \\end{aligned} \\] So the representation is: <b>" + corr + "</b>.";
  return mcq("Hundred grids are used to model a percent. Each grid has 100 squares and each square stands for 1%. How is \\(" + p + "\\%\\) represented?", { t: corr, fb: "Correct: full hundreds fill whole grids and the remainder fills part of one more grid." }, ds, sol, { mode: "grid-over-100", p: p });
}, ["Count off full hundreds first, because each grid holds exactly 100 squares.", "First work out how many whole grids the hundreds in the percent fill."]);

// 9. L2, 3.4: read a shaded grid in percent, decimal and fraction form.
E("u5-shaded-grid-read", 5, ["3.4"], 1, "gen", function () {
  var k = ri(4, 96); if (k === 50) k = 54;
  var g = u5gcd(k, 100), fn = k / g, fd = 100 / g;
  var u = 100 - k, gu = u5gcd(u, 100);
  function forms(p, frn, frd) { return fmt(p, 0) + "%, " + fmtF(p / 100, 2) + ", \\(" + FR(frn, frd) + "\\)"; }
  var corr = forms(k, fn, fd);
  var cands = [
    { t: forms(u, u / gu, 100 / gu), fb: "That describes the unshaded squares; the question asks about the shaded part." },
    { t: fmt(k, 0) + "%, " + fmt(k / 10, 2) + ", \\(" + FR(fn, fd) + "\\)", fb: "The decimal there is ten times too large; a percent is divided by 100 to get its decimal." },
    { t: fmt(k, 0) + "%, " + fmtF(k / 100, 2) + ", \\(" + FR(k, u) + "\\)", fb: "That fraction compares shaded squares with unshaded squares; a part-to-whole fraction uses the whole grid as the denominator." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the shaded squares out of the 100 on the grid, then convert: \\[ \\begin{aligned} \\text{percent} &= " + k + "\\% \\\\ \\text{decimal} &= " + k + " \\div 100 = " + fmtF(k / 100, 2) + " \\\\ \\text{fraction} &= " + FR(k, 100) + " = " + FR(fn, fd) + " \\end{aligned} \\] So the shaded part, in percent, decimal and fraction form, is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a 100-square grid with some squares shaded. Which row gives the shaded part in percent form, decimal form and fraction form in lowest terms, in that order?", { t: corr, fb: "Correct: the count out of 100 gives the percent, and the other forms follow from it." }, ds, sol, { mode: "grid-read", k: k });
  q.figure = u5gridSVG(k);
  return q;
}, ["Count the shaded squares first; out of 100, that count is the percent itself.", "First count the shaded squares, then divide by 100 for the decimal and reduce for the fraction."]);

// 10. L2, 6.1, CR 3: percent of a number in context.
E("u5-percent-of-number", 5, ["6.1"], 1, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var pairs = [[20, 150], [25, 240], [30, 120], [40, 250], [50, 180], [60, 350], [75, 160], [80, 450], [15, 200], [35, 300], [90, 600], [10, 480], [45, 220], [55, 400], [65, 500], [70, 320], [85, 700], [95, 900], [5, 640], [12, 350], [18, 450], [22, 550]];
    var pr = pick(pairs), p = pr[0], W = pr[1], ans = W * p / 100;
    var ctxs = [
      "In a survey, " + p + "% of " + W + " students said they walk to school. How many students said they walk to school?",
      "A hockey team won " + p + "% of its " + W + " shots on goal as goals this season. How many goals did the team score?",
      "A store sold " + p + "% of " + W + " concert tickets in the first hour. How many tickets were sold in the first hour?"
    ];
    var prompt = pick(ctxs);
    var sol = "Find the percent of the whole amount: \\[ \\begin{aligned} " + p + "\\% \\text{ of } " + W + " &= " + fmt(p / 100, 2) + " \\times " + W + " \\\\ &= " + fmt(ans, 0) + " \\end{aligned} \\] So the answer is <b>" + fmt(ans, 0) + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "pct-of-std", p: p, w: W });
  }
  if (mode === 1) {
    var pairs2 = [[110, 200], [120, 250], [125, 160], [130, 300], [150, 240], [175, 120], [200, 90], [140, 350], [115, 400], [135, 500], [160, 450], [180, 600], [225, 320], [250, 280]];
    var pr2 = pick(pairs2), p2 = pr2[0], W2 = pr2[1], ans2 = W2 * p2 / 100;
    var prompt2 = "Last year a trail crew cleared " + W2 + " m of trail. This year the crew cleared " + p2 + "% as much trail as last year. How many metres of trail did the crew clear this year?";
    var sol2 = "A percent over 100% gives an amount larger than the whole it is compared with: \\[ \\begin{aligned} " + p2 + "\\% \\text{ of } " + W2 + " &= " + fmt(p2 / 100, 2) + " \\times " + W2 + " \\\\ &= " + fmt(ans2, 0) + " \\end{aligned} \\] So the crew cleared <b>" + fmt(ans2, 0) + " m</b>.";
    return numq(prompt2, ans2, 0.01, sol2, { mode: "pct-of-over", p: p2, w: W2 });
  }
  var pairs3 = [[5, 4000], [4, 5000], [8, 2000], [5, 8000], [2, 10000], [8, 6000], [4, 12000], [2, 15000], [5, 20000], [8, 9000], [4, 25000], [2, 30000]];
  var pr3 = pick(pairs3), p10 = pr3[0], W3 = pr3[1], ans3 = W3 * p10 / 1000;
  var pStr3 = fmt(p10 / 10, 1);
  var prompt3 = "A town has " + W3 + " residents. About " + pStr3 + "% of the residents were born on a holiday. About how many residents were born on a holiday?";
  var sol3 = "A percent under 1% is a small fraction of the whole: \\[ \\begin{aligned} " + pStr3 + "\\% \\text{ of } " + W3 + " &= " + fmt(p10 / 1000, 4) + " \\times " + W3 + " \\\\ &= " + fmt(ans3, 0) + " \\end{aligned} \\] So about <b>" + fmt(ans3, 0) + " residents</b> were born on a holiday.";
  return numq(prompt3, ans3, 0.01, sol3, { mode: "pct-of-small", p: pStr3, w: W3 });
}, ["Turn the percent into a decimal first, then multiply by the whole amount.", "First write the percent as a decimal by dividing it by 100."]);

// 11. L2, 6.1, CR 3: find the whole given a part and a percent.
E("u5-find-the-whole", 5, ["6.1"], 2, "gen", function () {
  var pool = [[25, 60], [20, 80], [30, 90], [40, 150], [50, 70], [75, 120], [80, 200], [10, 240], [60, 300], [90, 400], [15, 200], [35, 260], [12, 250], [16, 150], [18, 200], [22, 150], [28, 250], [32, 200], [38, 150], [42, 200], [48, 250], [52, 200], [56, 150], [64, 200], [72, 250], [84, 150], [88, 200], [45, 180], [65, 140], [85, 220], [55, 160], [95, 300]];
  var pr = pick(pool), p = pr[0], W = pr[1], part = W * p / 100;
  var ctxs = [
    { q: part + " students is " + p + "% of the students in a school. How many students are in the school?", unit: "students" },
    { q: "A team scored " + part + " points, which is " + p + "% of the points it needs for a banner. How many points does the team need in total?", unit: "points" },
    { q: "After a morning sale, " + part + " tickets remained unsold, and that is " + p + "% of the tickets printed. How many tickets were printed?", unit: "tickets" }
  ];
  var cx = pick(ctxs);
  var sol = "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= " + part + " \\div " + fmt(p / 100, 2) + " \\\\ &= " + W + " \\end{aligned} \\] So the whole is <b>" + W + " " + cx.unit + "</b>.";
  return numq(cx.q, W, 0.01, sol, { mode: "find-whole", p: p, part: part });
}, ["The given amount is only the named percent of the whole, so the whole is larger.", "First write the percent as a decimal, then divide the part by that decimal."]);

// 12. L2, 6.2, CR 3: combined percents, discount then HST.
E("u5-discount-then-tax", 5, ["6.2"], 2, "gen", function () {
  var items = ["winter jacket", "bicycle helmet", "pair of snowshoes", "school backpack", "set of curling gloves", "rain coat"];
  var item = pick(items), P = pick([60, 80, 100, 120, 160, 200, 240, 300, 400]), d = pick([10, 20, 25, 30, 40, 50]);
  var sale = P * (1 - d / 100), fin = u5r2(sale * 1.15), tax = u5r2(fin - sale);
  var sol = "Apply the discount first, then add HST of 15% to the sale price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d / 100, 2) + " = " + fmtF(sale, 2) + " \\\\ \\text{final price} &= " + fmtF(sale, 2) + " \\times 1.15 = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
  return numq("A " + item + " is priced at $" + fmtF(P, 2) + ". It is on sale for " + d + "% off. HST of 15% is then added to the sale price. What is the final price, in dollars?", fin, 0.01, sol, { mode: "disc-tax", p: P, d: d });
}, ["Combined percents act one after the other, and the second percent acts on the new amount.", "First take the discount off the full price to get the sale price."]);

// 13. L2, 6.3: percent of a percent.
E("u5-percent-of-percent", 5, ["6.3"], 1, "gen", function () {
  var A = pick([20, 30, 40, 50, 60, 70, 80, 90]), B = pick([20, 30, 40, 50, 60, 70, 80, 90]);
  var ans = A * B / 100;
  var ctxs = [
    { q: "At a school, " + A + "% of students take the bus. Of the students who take the bus, " + B + "% ride Bus 4. What percent of all students ride Bus 4?", thing: "ride Bus 4" },
    { q: "On a team, " + A + "% of players are in Grade 8. Of those Grade 8 players, " + B + "% play defence. What percent of the whole team are Grade 8 players who play defence?", thing: "are Grade 8 defenders" },
    { q: "In a library, " + A + "% of the books are nonfiction. Of the nonfiction books, " + B + "% are about animals. What percent of all the books are nonfiction books about animals?", thing: "are animal nonfiction" }
  ];
  var cx = pick(ctxs);
  var cands = [
    { t: fmt(A + B, 0) + "%", fb: "That adds the two percents; the second percent acts only on the first group, so the percents are multiplied, not added." },
    { t: fmt(B, 0) + "%", fb: "That is the second percent alone; it describes only the smaller group, not the whole group." },
    { t: fmt(A, 0) + "%", fb: "That is the first percent alone; it does not narrow the group down the second time." },
    { t: fmt(Math.abs(A - B), 0) + "%", fb: "That subtracts the two percents; finding a percent of a percent uses multiplication." }
  ];
  var ds = u5pick3(fmt(ans, 0) + "%", cands);
  var sol = "A percent of a percent multiplies the two decimals: \\[ \\begin{aligned} " + fmt(A / 100, 2) + " \\times " + fmt(B / 100, 2) + " &= " + fmt(ans / 100, 4) + " \\\\ &= " + fmt(ans, 0) + "\\% \\end{aligned} \\] So <b>" + fmt(ans, 0) + "%</b> of the whole group " + cx.thing + ".";
  return mcq(cx.q, { t: fmt(ans, 0) + "%", fb: "Correct: the second percent is taken of the first group, so the decimals multiply." }, ds, sol, { mode: "pct-of-pct", a: A, b: B });
}, ["The second percent acts only on the group the first percent picked out.", "First change both percents to decimals, then multiply them."]);

// 14. L2, 3.9: express a three-term ratio from a context.
E("u5-three-term-ratio", 5, ["3.9"], 1, "gen", function () {
  var ctxs = [
    { n: ["red paint", "yellow paint", "white paint"] }, { n: ["nickels", "dimes", "quarters"] },
    { n: ["apples", "pears", "plums"] }, { n: ["drums", "guitars", "fiddles"] },
    { n: ["junior", "intermediate", "senior"] }, { n: ["sand", "gravel", "cement"] }
  ];
  var cx = pick(ctxs), vals = [3, 4, 5], att = 0;
  do { vals = [ri(2, 11), ri(2, 11), ri(2, 11)]; att++; } while (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1 && att < 80);
  if (u5gcd(u5gcd(vals[0], vals[1]), vals[2]) !== 1) vals = [2, 3, 5];
  var a = vals[0], b = vals[1], c = vals[2], tot = a + b + c;
  var corr = a + ":" + b + ":" + c;
  var cands = [
    { t: c + ":" + b + ":" + a, fb: "That reverses the order; the terms must follow the order the groups are named." },
    { t: a + ":" + b + ":" + tot, fb: "That puts the total in place of the third group; the third term is the third group count." },
    { t: a + ":" + c + ":" + b, fb: "That swaps the second and third groups; check the order the groups are named." },
    { t: b + ":" + a + ":" + c, fb: "That swaps the first and second groups; check the order the groups are named." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Write the three counts in the order the groups are named: \\[ \\begin{aligned} " + cx.n[0] + " : " + cx.n[1] + " : " + cx.n[2] + " &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] So the three-term ratio is <b>" + corr + "</b>.";
  return mcq("A collection has " + a + " " + cx.n[0] + ", " + b + " " + cx.n[1] + " and " + c + " " + cx.n[2] + ". What is the ratio of " + cx.n[0] + " to " + cx.n[1] + " to " + cx.n[2] + "?", { t: corr, fb: "Correct: all three counts appear once, in the order named." }, ds, sol, { mode: "three-term", a: a, b: b, c: c });
}, ["A three-term ratio carries all three counts, in the exact order the groups are named.", "First list the three counts in order, then join them with colons."]);

// 15. L2, 3.10: part-to-part ratio as a part-to-whole fraction.
E("u5-part-to-whole-fraction", 5, ["3.10"], 1, "gen", function () {
  var ctxs = [
    { a: "red counters", b: "blue counters", first: "red" }, { a: "boys", b: "girls", first: "boys" },
    { a: "wins", b: "losses", first: "wins" }, { a: "fiction books", b: "nonfiction books", first: "fiction" }
  ];
  var cx = pick(ctxs), a = ri(2, 14), b = ri(2, 14), att2 = 0;
  while (a === b && att2 < 60) { b = ri(2, 14); att2++; }
  if (a === b) b = a + 1;
  var tot = a + b;
  var g = u5gcd(a, tot), corr = "\\(" + FR(a / g, tot / g) + "\\)";
  var gb = u5gcd(b, tot);
  var cands = [
    { t: "\\(" + FR(a, b) + "\\)", fb: "That is the part-to-part ratio written as a fraction; a part-to-whole fraction needs the total in the denominator." },
    { t: "\\(" + FR(b / gb, tot / gb) + "\\)", fb: "That is the share of the second group; the question asks for the first group." },
    { t: "\\(" + FR(tot, a) + "\\)", fb: "That flips the fraction; the part belongs in the numerator and the whole in the denominator." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "The whole is the two parts added together, and the fraction uses part over whole: \\[ \\begin{aligned} \\text{whole} &= " + a + " + " + b + " = " + tot + " \\\\ \\text{fraction} &= " + FR(a, tot) + " = " + FR(a / g, tot / g) + " \\end{aligned} \\] So the fraction that are " + cx.first + " is <b>" + corr + "</b>.";
  return mcq("The ratio of " + cx.a + " to " + cx.b + " in a set is " + a + ":" + b + ". What fraction of the whole set is made up of " + cx.a + "? Give the fraction in lowest terms.", { t: corr, fb: "Correct: the first part is over the total of both parts, reduced." }, ds, sol, { mode: "part-whole", a: a, b: b });
}, ["Part-to-whole means the denominator is both parts added together, not the other part.", "First add the two ratio terms to get the whole."]);

// 16. L2, 3.11: express a ratio as a percent.
E("u5-ratio-as-percent", 5, ["3.11"], 1, "gen", function () {
  var ctxs = [
    { a: "wins", b: "losses", first: "wins" }, { a: "red marbles", b: "green marbles", first: "red marbles" },
    { a: "sunny days", b: "cloudy days", first: "sunny days" }, { a: "fiction picks", b: "nonfiction picks", first: "fiction picks" }
  ];
  var cx = pick(ctxs), T = pick([5, 10, 20, 25, 50]), a = ri(1, T - 1);
  if (a * 2 === T) a += 1;
  var b = T - a;
  var pct = a * 100 / T, comp = 100 - pct;
  var c1t = fmt(u5r2(a / b * 100), 1) + "%";
  var c2t = (c1t.indexOf(".") >= 0) ? fmtF(comp, 1) + "%" : fmt(comp, 1) + "%";
  var cands = [
    { t: c1t, fb: "That divides the first part by the second part; a percent of the whole divides the first part by the total." },
    { t: c2t, fb: "That is the percent for the second group; the question asks for the first group." },
    { t: fmt(a, 0) + "%", fb: "That uses the count itself as a percent; the count must be compared with the total first." },
    { t: fmt(pct / 10, 2) + "%", fb: "That is ten times too small; the fraction of the whole is multiplied by 100 to get a percent." }
  ];
  var ds = u5pick3(fmt(pct, 1) + "%", cands);
  var sol = "The percent is the first part over the whole, times 100: \\[ \\begin{aligned} \\text{whole} &= " + a + " + " + b + " = " + T + " \\\\ \\text{percent} &= " + FR(a, T) + " \\times 100 = " + fmt(pct, 1) + "\\% \\end{aligned} \\] So " + cx.first.trim() + " make up <b>" + fmt(pct, 1) + "%</b> of the whole.";
  return mcq("The ratio of " + cx.a + " to " + cx.b + " is " + a + ":" + b + ". What percent of the whole is made up of " + cx.a + "?", { t: fmt(pct, 1) + "%", fb: "Correct: the first part is divided by the total and multiplied by 100." }, ds, sol, { mode: "ratio-pct", a: a, b: b });
}, ["A ratio term becomes a percent only after it is compared with the whole, not with the other term.", "First add the terms to get the whole, then divide the first term by the whole."]);

// 17. L2, 3.13, var: explain the meaning of a/b in a ratio context.
E("u5-meaning-of-ratio-ab", 5, ["3.13"], 1, "var", varset([
  function () {
    var sol = "In ratio form, the two numbers compare two separate amounts: \\[ \\begin{aligned} " + FR(2, 3) + " &\\text{ means } 2 \\text{ to } 3 \\end{aligned} \\] So it means <b>for every 2 cups of syrup, there are 3 cups of water</b>.";
    return mcq("In a juice mix, the ratio of syrup to water is written as \\(" + FR(2, 3) + "\\). What does this ratio mean?", { t: "For every 2 cups of syrup, there are 3 cups of water.", fb: "Correct: the numerator and denominator are the two amounts being compared, in order." }, [
      { t: "Syrup makes up 2 of the 3 cups in the whole mix.", fb: "That reads the fraction as part to whole; here the two numbers compare syrup with water directly." },
      { t: "For every 3 cups of syrup, there are 2 cups of water.", fb: "That reverses the two amounts; syrup is named first, so its amount comes first." },
      { t: "The whole mix has 3 cups in total.", fb: "The 3 is the amount of water in the comparison, not the size of the whole mix." }
    ], sol, { mode: "meaning-23" });
  },
  function () {
    var sol = "The fraction compares the first group with the second group: \\[ \\begin{aligned} " + FR(4, 5) + " &\\text{ means } 4 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 4 boys at practice, there are 5 girls at practice</b>.";
    return mcq("At a practice, the ratio of boys to girls is written as \\(" + FR(4, 5) + "\\). What does this ratio mean?", { t: "For every 4 boys at practice, there are 5 girls at practice.", fb: "Correct: the two numbers are the sizes of the two groups, in the order named." }, [
      { t: "Boys make up 4 of the 5 students at practice.", fb: "That reads the fraction as part to whole; here the numbers compare the two groups with each other." },
      { t: "For every 5 boys at practice, there are 4 girls at practice.", fb: "That reverses the groups; boys are named first, so their number comes first." },
      { t: "There are 5 students at practice in total.", fb: "The 5 is the number of girls in the comparison group, not the total at practice." }
    ], sol, { mode: "meaning-45" });
  },
  function () {
    var sol = "A ratio fraction keeps both amounts and the order they are named in: \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ means } 5 \\text{ to } 2 \\end{aligned} \\] So it means <b>for every 5 cups of flour, there are 2 cups of sugar</b>.";
    return mcq("In a recipe, the ratio of flour to sugar is written as \\(" + FR(5, 2) + "\\). What does this ratio mean?", { t: "For every 5 cups of flour, there are 2 cups of sugar.", fb: "Correct: flour is compared with sugar, using the two amounts in order." }, [
      { t: "Flour makes up 5 of the 2 cups in the recipe.", fb: "A part cannot be larger than its whole that way; the numbers here compare two ingredients with each other." },
      { t: "For every 2 cups of flour, there are 5 cups of sugar.", fb: "That reverses the ingredients; flour is named first in the ratio." },
      { t: "The recipe uses 2 cups in total.", fb: "The 2 is the amount of sugar in the comparison, not the total amount in the recipe." }
    ], sol, { mode: "meaning-52" });
  },
  function () {
    var sol = "Each number in the ratio belongs to one of the two colours being compared: \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ means } 3 \\text{ to } 4 \\end{aligned} \\] So it means <b>for every 3 red counters, there are 4 blue counters</b>.";
    return mcq("In a bin, the ratio of red counters to blue counters is written as \\(" + FR(3, 4) + "\\). What does this ratio mean?", { t: "For every 3 red counters, there are 4 blue counters.", fb: "Correct: the ratio compares the red count with the blue count, in that order." }, [
      { t: "Red counters make up 3 of the 4 counters in the bin.", fb: "That reads the fraction as part to whole; the 4 here is the blue count, not the total." },
      { t: "For every 4 red counters, there are 3 blue counters.", fb: "That reverses the colours; red is named first, so its count comes first." },
      { t: "There are 4 counters in the bin in total.", fb: "The 4 is the blue count in the comparison, not the total number of counters." }
    ], sol, { mode: "meaning-34" });
  },
  function () {
    var sol = "The ratio links the two distances that go with one full turn: \\[ \\begin{aligned} " + FR(7, 5) + " &\\text{ means } 7 \\text{ to } 5 \\end{aligned} \\] So it means <b>for every 7 m the front gear wheel turns in distance, the rear wheel turns 5 m in the same comparison</b>.";
    return mcq("A gear chart writes the ratio of front wheel distance to rear wheel distance as \\(" + FR(7, 5) + "\\). What does this ratio mean?", { t: "For every 7 m of front wheel distance, there are 5 m of rear wheel distance.", fb: "Correct: the two numbers compare the two distances directly, in the order named." }, [
      { t: "The front wheel distance is 7 of the 5 m travelled in total.", fb: "That reads the fraction as part to whole; the 5 is the second distance, not a total." },
      { t: "For every 5 m of front wheel distance, there are 7 m of rear wheel distance.", fb: "That reverses the two wheels; the front wheel is named first." },
      { t: "The two wheels travel 5 m in total.", fb: "The 5 belongs to the rear wheel distance in the comparison, not to a total." }
    ], sol, { mode: "meaning-75" });
  }
]), ["In a ratio, a fraction compares two amounts with each other, not a part with a whole.", "First name which amount the top number belongs to and which amount the bottom number belongs to."]);

// 18. L2, 3.15, var: provide a context where a/b represents a ratio.
E("u5-context-for-ratio-ab", 5, ["3.15"], 1, "var", varset([
  function () {
    var sol = "A ratio compares two separate amounts of the same kind: \\[ \\begin{aligned} " + FR(3, 4) + " &\\text{ as a ratio means } 3 \\text{ to } 4 \\end{aligned} \\] So the ratio context is <b>a bin with 3 red pens for every 4 blue pens</b>.";
    return mcq("In which context does \\(" + FR(3, 4) + "\\) represent a ratio?", { t: "A bin holds 3 red pens for every 4 blue pens.", fb: "Correct: two separate groups, red pens and blue pens, are compared with each other." }, [
      { t: "Three of the 4 slices of one pizza have cheese.", fb: "That is a part of one whole pizza, a part-to-whole fraction, not a comparison of two groups." },
      { t: "A class shares 3 pizzas equally among 4 students.", fb: "That is a division sharing situation, not a comparison of two groups." },
      { t: "A car travels 3 km in 4 minutes on a road into town.", fb: "That compares two different units, distance and time, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-34" });
  },
  function () {
    var sol = "The two numbers must name two groups being compared: \\[ \\begin{aligned} " + FR(5, 3) + " &\\text{ as a ratio means } 5 \\text{ to } 3 \\end{aligned} \\] So the ratio context is <b>a shelf with 5 novels for every 3 comic books</b>.";
    return mcq("In which context does \\(" + FR(5, 3) + "\\) represent a ratio?", { t: "A shelf holds 5 novels for every 3 comic books.", fb: "Correct: novels and comic books are two separate groups being compared." }, [
      { t: "Five of the 3 pages assigned were read last night.", fb: "A part cannot be 5 of 3 pages this way; the numbers do not compare two groups here." },
      { t: "A group splits 5 granola bars among 3 friends.", fb: "That is a sharing division, not a comparison of two groups." },
      { t: "A hose fills 5 L in 3 minutes in the garden.", fb: "That compares litres with minutes, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-53" });
  },
  function () {
    var sol = "Wins and losses are two separate results being compared: \\[ \\begin{aligned} " + FR(7, 2) + " &\\text{ as a ratio means } 7 \\text{ to } 2 \\end{aligned} \\] So the ratio context is <b>a team with 7 wins for every 2 losses</b>.";
    return mcq("In which context does \\(" + FR(7, 2) + "\\) represent a ratio?", { t: "A team has 7 wins for every 2 losses this season.", fb: "Correct: wins and losses are two separate counts compared with each other." }, [
      { t: "Seven of the 2 periods in a game were scoreless.", fb: "A part cannot be 7 of 2 periods this way; the numbers do not compare two groups here." },
      { t: "Seven players share 2 water bottles at practice.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "A Zamboni covers 7 m in 2 seconds on the ice.", fb: "That compares metres with seconds, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-72" });
  },
  function () {
    var sol = "Two plant types in the same garden are compared directly: \\[ \\begin{aligned} " + FR(2, 5) + " &\\text{ as a ratio means } 2 \\text{ to } 5 \\end{aligned} \\] So the ratio context is <b>a garden with 2 rose bushes for every 5 tulip patches</b>.";
    return mcq("In which context does \\(" + FR(2, 5) + "\\) represent a ratio?", { t: "A garden has 2 rose bushes for every 5 tulip patches.", fb: "Correct: two separate groups of plants are compared with each other." }, [
      { t: "Two of the 5 rows in the garden are planted with roses.", fb: "That is a part of one whole garden, a part-to-whole fraction." },
      { t: "Two gardeners share 5 watering cans between them.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "Rain falls 2 cm in 5 hours during a storm overnight.", fb: "That compares centimetres with hours, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-25" });
  },
  function () {
    var sol = "Two song types in the same playlist are compared with each other: \\[ \\begin{aligned} " + FR(4, 9) + " &\\text{ as a ratio means } 4 \\text{ to } 9 \\end{aligned} \\] So the ratio context is <b>a playlist with 4 rock songs for every 9 pop songs</b>.";
    return mcq("In which context does \\(" + FR(4, 9) + "\\) represent a ratio?", { t: "A playlist has 4 rock songs for every 9 pop songs.", fb: "Correct: rock songs and pop songs are two separate groups being compared." }, [
      { t: "Four of the 9 songs on an album are rock songs.", fb: "That is a part of one whole album, a part-to-whole fraction." },
      { t: "Four singers share 9 microphones on the stage.", fb: "That is a sharing situation, not a comparison of two groups." },
      { t: "A speaker plays 4 songs in 9 minutes at the school dance.", fb: "That compares songs with minutes, two different units, so it is a rate situation." }
    ], sol, { mode: "ctx-ratio-49" });
  }
]), ["A ratio context compares two separate amounts; a part of one whole and a comparison of different units are different ideas.", "First check what the two numbers describe: two groups, one whole, or two different units."]);

// 19. L2, 3.12: identify a ratio from a real-life example and record it in simplest form.
E("u5-identify-ratio-simplest", 5, ["3.12"], 1, "gen", function () {
  var ctxs = [
    { s: "A cafeteria tray count finds {A} juice boxes and {B} milk cartons on the lunch line.", a: "juice boxes", b: "milk cartons" },
    { s: "A pet survey counts {A} dogs and {B} cats in one neighbourhood.", a: "dogs", b: "cats" },
    { s: "A parking lot count finds {A} cars and {B} pickup trucks before a game.", a: "cars", b: "pickup trucks" },
    { s: "A class library audit counts {A} picture books and {B} chapter books on one shelf.", a: "picture books", b: "chapter books" },
    { s: "A rink canteen sells {A} hot chocolates and {B} teas during intermission.", a: "hot chocolates", b: "teas" },
    { s: "A trail group counts {A} adults and {B} youth on a Saturday hike.", a: "adults", b: "youth" }
  ];
  var cx = pick(ctxs);
  var basePairs = [[2, 3], [3, 4], [4, 5], [5, 6], [3, 5], [5, 7], [2, 5], [4, 7], [5, 3], [7, 4], [3, 2], [5, 4]];
  var bp = pick(basePairs), m = ri(2, 6), A = bp[0] * m, B = bp[1] * m;
  var corr = bp[0] + ":" + bp[1];
  var cands = [
    { t: A + ":" + B, fb: "That is the ratio with the raw counts; the question asks for simplest form, so divide both terms by " + m + "." },
    { t: bp[1] + ":" + bp[0], fb: "That reverses the two groups; the order must stay as named in the example." },
    { t: bp[0] + ":" + (bp[0] + bp[1]), fb: "That compares the first group with the total; a ratio here compares the two groups with each other." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Record the counts as a ratio, then divide both terms by their common factor: \\[ \\begin{aligned} " + cx.a + " : " + cx.b + " &= " + A + " : " + B + " \\\\ &= " + corr.replace(/:/g, " : ") + " \\end{aligned} \\] So the ratio in simplest form is <b>" + corr + "</b>.";
  return mcq(cx.s.replace("{A}", A).replace("{B}", B) + " What is the ratio of " + cx.a + " to " + cx.b + ", in simplest form?", { t: corr, fb: "Correct: the counts keep their order and both terms are divided by the same common factor." }, ds, sol, { mode: "identify-ratio", a: A, b: B });
}, ["Real-life counts become a ratio first, and simplest form divides both terms by the same number.", "First write the ratio with the counted amounts, in the order named."]);

// 20. L2, 6.28, CR 2: solve a ratio problem.
E("u5-ratio-problem-solve", 5, ["6.28"], 2, "gen", function () {
  if (Math.random() < 0.5) {
    var pairs = [[2, 3], [3, 5], [2, 5], [3, 4], [4, 7], [5, 3]];
    var pr = pick(pairs), a = pr[0], b = pr[1], s = ri(2, 9), given = a * s, ans = b * s;
    var ctxs = [
      "Paint is mixed in the ratio " + a + ":" + b + " of blue paint to white paint. A batch uses " + given + " L of blue paint. How many litres of white paint does the batch use?",
      "A smoothie recipe uses berries and yogurt in the ratio " + a + ":" + b + ". A large batch uses " + given + " cups of berries. How many cups of yogurt does the large batch use?",
      "Trail mix has peanuts and raisins in the ratio " + a + ":" + b + ". A bag is made with " + given + " g of peanuts. How many grams of raisins are in the bag?"
    ];
    var prompt = pick(ctxs);
    var sol = "Each ratio part stands for the same scale amount: \\[ \\begin{aligned} \\text{scale} &= " + given + " \\div " + a + " = " + s + " \\\\ \\text{second amount} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] So the second amount is <b>" + ans + "</b>.";
    return numq(prompt, ans, 0.01, sol, { mode: "ratio-scale", a: a, b: b });
  }
  var pairs2 = [[3, 2], [5, 3], [4, 3], [7, 5], [3, 5], [5, 2]];
  var pr2 = pick(pairs2), a2 = pr2[0], b2 = pr2[1], s2 = ri(2, 8), tot = (a2 + b2) * s2, ans2 = a2 * s2;
  var ctxs2 = [
    "Two cousins share " + tot + " stickers in the ratio " + a2 + ":" + b2 + ", with the older cousin getting the first share. How many stickers does the older cousin get?",
    "A " + tot + " cm ribbon is cut into two pieces in the ratio " + a2 + ":" + b2 + ". How long is the first piece, in centimetres?",
    "A class fund of $" + tot + " is split between a field trip and supplies in the ratio " + a2 + ":" + b2 + ", with the field trip getting the first share. How many dollars go to the field trip?"
  ];
  var prompt2 = pick(ctxs2);
  var sol2 = "Add the ratio parts to find the value of one part, then take the first share: \\[ \\begin{aligned} \\text{one part} &= " + tot + " \\div " + (a2 + b2) + " = " + s2 + " \\\\ \\text{first share} &= " + a2 + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] So the first share is <b>" + ans2 + "</b>.";
  return numq(prompt2, ans2, 0.01, sol2, { mode: "ratio-share", a: a2, b: b2 });
}, ["Work out the value of one ratio part first; every part in the ratio has that same value.", "First find the scale or the value of one part from the amount you are given."]);

// 21. L2, 3.17: identify and describe a rate from a real-life example.
E("u5-identify-rate-example", 5, ["3.17"], 1, "gen", function () {
  var tmpls = [
    { s: "Maya rode {A} km in {B} h on a coastal trail and paid a $12 trail fee.", A: [12, 60], B: [2, 6], corr: function (A, B) { return A + " km in " + B + " h"; }, rev: function (A, B) { return B + " h in " + A + " km"; }, wrong: "12 dollars for the trail fee", wfb: "The fee is a single amount with no second amount to compare it with, so it is not the rate in this example." },
    { s: "A pump moved {A} L of water in {B} min while a crew of 6 workers watched.", A: [20, 90], B: [2, 9], corr: function (A, B) { return A + " L in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " L"; }, wrong: "6 workers on the crew", wfb: "The crew size is a single count with no comparison built in, so it is not the rate in this example." },
    { s: "Jonah earned ${A} for {B} h of yard work and bought a $9 snack afterward.", A: [30, 120], B: [2, 8], corr: function (A, B) { return "$" + A + " in " + B + " h"; }, rev: function (A, B) { return B + " h for $" + A; }, wrong: "$9 for the snack", wfb: "The snack price is a single amount, not a comparison of two amounts, so it is not the rate here." },
    { s: "A printer produced {A} pages in {B} min using 2 ink cartridges.", A: [30, 150], B: [2, 10], corr: function (A, B) { return A + " pages in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " pages"; }, wrong: "2 ink cartridges", wfb: "The cartridge count is a single count, not a comparison of two amounts, so it is not the rate here." }
  ];
  var t = pick(tmpls), A = ri(t.A[0], t.A[1]), B = ri(t.B[0], t.B[1]);
  var corr = t.corr(A, B);
  var cands = [
    { t: t.rev(A, B), fb: "That reverses the comparison; the amount earned, moved or produced is described over the time it took." },
    { t: t.wrong, fb: t.wfb },
    { t: A + " to " + B + " as a ratio of the same kind", fb: "The two amounts here have different units, so together they form a rate, not a same-kind ratio." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate is the pair of amounts with different units that go together in the example: \\[ \\begin{aligned} \\text{rate} &= \\text{two amounts measured in different units} \\end{aligned} \\] So the rate described is <b>" + corr + "</b>.";
  return mcq(t.s.replace("{A}", A).replace("{B}", B) + " Which pair of amounts gives the rate in this example?", { t: corr, fb: "Correct: those two amounts, with different units, are the ones compared in the example." }, ds, sol, { mode: "identify-rate", a: A, b: B });
}, ["A rate in an example is a pair of amounts with different units that belong together.", "First look for two amounts measured in different units that describe the same activity."]);

// 22. L2, 3.14, var: provide a context where a/b represents a rate.
E("u5-context-for-rate-ab", 5, ["3.14"], 1, "var", varset([
  function () {
    var sol = "A rate compares amounts in two different units: \\[ \\begin{aligned} " + FR(5, 2) + " &\\text{ as a rate links } 5 \\text{ cm with } 2 \\text{ weeks} \\end{aligned} \\] So the rate context is <b>a plant that grows 5 cm in 2 weeks</b>.";
    return mcq("In which context does \\(" + FR(5, 2) + "\\) represent a rate?", { t: "A plant grows 5 cm in 2 weeks.", fb: "Correct: centimetres and weeks are different units, so the comparison is a rate." }, [
      { t: "A shelf holds 5 board games for every 2 card games.", fb: "Both amounts count games, the same kind, so that comparison is a ratio." },
      { t: "Five of the 2 loaves baked were sold at noon.", fb: "A part cannot be 5 of 2 loaves this way; the numbers do not form a rate here." },
      { t: "Five friends share 2 pizzas at a party.", fb: "That is a sharing situation between people and pizzas at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-52" });
  },
  function () {
    var sol = "Distance compared with time is the classic rate pairing: \\[ \\begin{aligned} " + FR(90, 2) + " &\\text{ as a rate links } 90 \\text{ km with } 2 \\text{ h} \\end{aligned} \\] So the rate context is <b>a bus that travels 90 km in 2 h</b>.";
    return mcq("In which context does \\(" + FR(90, 2) + "\\) represent a rate?", { t: "A bus travels 90 km in 2 h.", fb: "Correct: kilometres and hours are different units, so the comparison is a rate." }, [
      { t: "A lot holds 90 cars for every 2 trucks.", fb: "Both amounts count vehicles, the same kind, so that comparison is a ratio." },
      { t: "Ninety of the 2 ferries were on time today.", fb: "A part cannot be 90 of 2 ferries this way; the numbers do not form a rate here." },
      { t: "Ninety students share 2 gyms for an assembly.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-902" });
  },
  function () {
    var sol = "Money earned compared with time worked forms a rate: \\[ \\begin{aligned} " + FR(36, 3) + " &\\text{ as a rate links } 36 \\text{ dollars with } 3 \\text{ h} \\end{aligned} \\] So the rate context is <b>a worker who earns $36 in 3 h</b>.";
    return mcq("In which context does \\(" + FR(36, 3) + "\\) represent a rate?", { t: "A worker earns $36 in 3 h of work.", fb: "Correct: dollars and hours are different units, so the comparison is a rate." }, [
      { t: "A shelf holds 36 novels for every 3 biographies.", fb: "Both amounts count books, the same kind, so that comparison is a ratio." },
      { t: "Thirty-six of the 3 shifts at a shop are day shifts.", fb: "A part cannot be 36 of 3 shifts this way; the numbers do not form a rate here." },
      { t: "Thirty-six campers share 3 tents on a trip.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-363" });
  },
  function () {
    var sol = "Volume compared with time forms a rate for flowing water: \\[ \\begin{aligned} " + FR(48, 4) + " &\\text{ as a rate links } 48 \\text{ L with } 4 \\text{ min} \\end{aligned} \\] So the rate context is <b>a hose that delivers 48 L in 4 min</b>.";
    return mcq("In which context does \\(" + FR(48, 4) + "\\) represent a rate?", { t: "A hose delivers 48 L of water in 4 min.", fb: "Correct: litres and minutes are different units, so the comparison is a rate." }, [
      { t: "A tank farm holds 48 large tanks for every 4 small tanks.", fb: "Both amounts count tanks, the same kind, so that comparison is a ratio." },
      { t: "Forty-eight of the 4 valves on a pipe are open.", fb: "A part cannot be 48 of 4 valves this way; the numbers do not form a rate here." },
      { t: "Forty-eight swimmers share 4 lanes at a pool.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-484" });
  },
  function () {
    var sol = "Pages compared with time forms a rate for reading speed: \\[ \\begin{aligned} " + FR(15, 5) + " &\\text{ as a rate links } 15 \\text{ pages with } 5 \\text{ min} \\end{aligned} \\] So the rate context is <b>a student who reads 15 pages in 5 min</b>.";
    return mcq("In which context does \\(" + FR(15, 5) + "\\) represent a rate?", { t: "A student reads 15 pages in 5 min.", fb: "Correct: pages and minutes are different units, so the comparison is a rate." }, [
      { t: "A display holds 15 hardcover books for every 5 paperback books.", fb: "Both amounts count books, the same kind, so that comparison is a ratio." },
      { t: "Fifteen of the 5 chapters assigned were finished.", fb: "A part cannot be 15 of 5 chapters this way; the numbers do not form a rate here." },
      { t: "Fifteen readers share 5 copies of a novel.", fb: "That is a sharing situation at one moment, not a measured rate over an interval." }
    ], sol, { mode: "ctx-rate-155" });
  }
]), ["A rate context pairs two different units; a ratio context pairs amounts of the same kind.", "First check the units on the two numbers: different units points to a rate."]);

// 23. L2, 3.18, var: explain why a rate cannot be represented as a percent.
E("u5-why-rate-not-percent", 5, ["3.18"], 1, "var", varset([
  function () {
    var sol = "A percent compares a part with a whole measured the same way, while a rate keeps two different units: \\[ \\begin{aligned} 60 \\text{ km/h} &\\text{ compares km with h} \\end{aligned} \\] So the reason is that <b>a rate compares two different units, and a percent compares a part with a whole of the same kind</b>.";
    return mcq("A speed is recorded as 60 km/h. Why can this rate not be written as a percent?", { t: "It compares two different units, kilometres and hours, while a percent compares a part with a whole of the same kind.", fb: "Correct: the two quantities have different units, so there is no single whole to take a percent of." }, [
      { t: "The number 60 is too large to be a percent, because a percent can never go above the number 100 in any situation.", fb: "Percents can be any size, including over 100%; the size of the number is not the issue." },
      { t: "A percent must always be written as a fraction first, before it can be used, and a rate is never written that way.", fb: "Writing form is not the issue; percents and rates compare different kinds of quantities." },
      { t: "Speeds are measured with instruments such as speedometers, and percents are not measured with any instrument at all.", fb: "How a value is measured does not decide its type; the units being compared decide it." }
    ], sol, { mode: "why-speed" });
  },
  function () {
    var sol = "Litres and kilometres are different measures, even though 100 appears in the rate: \\[ \\begin{aligned} 8 \\text{ L}/100 \\text{ km} &\\text{ compares L with km} \\end{aligned} \\] So it is not 8%, because <b>the 100 in the rate counts kilometres, not a whole measured in litres</b>.";
    return mcq("A car uses fuel at 8 L/100 km. Why is this rate not the same as 8%?", { t: "The rate compares litres with kilometres, two different units, while a percent compares a part with a whole of the same kind.", fb: "Correct: the 100 belongs to the kilometres, so the rate is not a part out of 100 of one whole." }, [
      { t: "Fuel use is always larger than 8% in real cars that drive on highways, so a small rate like this cannot be read as a percent.", fb: "The size of real fuel use values is not the point; the units being compared decide the type." },
      { t: "A percent can never contain the number 100 in it, and this rate has 100 right in the middle of it, so it cannot be one.", fb: "Percents are built on 100; the issue is what the 100 measures in this rate." },
      { t: "Rates written with a slash can always be renamed as percents, whatever the two quantities in the rate happen to be.", fb: "A slash alone does not make a percent; the two sides must measure the same kind of whole." }
    ], sol, { mode: "why-fuel" });
  },
  function () {
    var sol = "Dollars and hours measure different things, so no single whole exists for a percent: \\[ \\begin{aligned} 15 \\text{ dollars/h} &\\text{ compares dollars with hours} \\end{aligned} \\] So the reason is that <b>a percent needs a part and a whole in the same unit, and this rate has two different units</b>.";
    return mcq("A wage is recorded as $15/h. Why can this rate not be written as a percent?", { t: "It compares dollars with hours, two different units, while a percent compares a part with a whole measured the same way.", fb: "Correct: pay and time are different measures, so the wage is a rate, not a share of one whole." }, [
      { t: "Wages are paid in money, and percents cannot involve money at all, so an amount paid for work can never be a percent.", fb: "Percents often involve money, such as tax on a price; the unit pairing is the issue here." },
      { t: "The value 15 is a whole number, and percents must always be decimals with a decimal point in them to be percents.", fb: "Percents can be whole numbers; the form of the number is not the issue." },
      { t: "An hourly wage stays the same every week, and percents must change from week to week to count as percents at all.", fb: "Whether a value changes has nothing to do with whether it is a percent." }
    ], sol, { mode: "why-wage" });
  },
  function () {
    var sol = "Beats and minutes are different units, so the count per minute is a rate: \\[ \\begin{aligned} 72 \\text{ beats/min} &\\text{ compares beats with minutes} \\end{aligned} \\] So the reason is that <b>a rate links two different units, and a percent is a share of one whole in a single unit</b>.";
    return mcq("A resting heart rate is 72 beats/min. Why can this rate not be written as a percent?", { t: "It compares beats with minutes, two different units, while a percent is a part out of 100 of one whole.", fb: "Correct: there is no single whole measured in beats that the rate is a share of." }, [
      { t: "Heart rates are about health, and percents are only for school subjects like mathematics.", fb: "Percents are used in health contexts too; the units being compared decide the type." },
      { t: "The number 72 has no decimal part, and percents always need a decimal part after the whole number to be percents.", fb: "Percents can be whole numbers; the form of the number is not the issue." },
      { t: "A percent must describe something that lasts exactly one minute at a time, never anything that is counted per minute.", fb: "Percents have no time requirement; the issue is the two different units in the rate." }
    ], sol, { mode: "why-heart" });
  },
  function () {
    var sol = "A price per kilogram links money with mass, two different measures: \\[ \\begin{aligned} 4 \\text{ dollars/kg} &\\text{ compares dollars with kilograms} \\end{aligned} \\] So the reason is that <b>the rate compares two different units, and a percent compares a part with a whole of the same kind</b>.";
    return mcq("Cheese is priced at $4/kg. Why can this rate not be written as a percent?", { t: "It compares dollars with kilograms, two different units, while a percent compares a part with a whole of the same kind.", fb: "Correct: money and mass are different measures, so the price is a rate, not a share of a whole." }, [
      { t: "Prices per kilogram are always less than 100, and percents are always numbers that are bigger than that in shops.", fb: "Percents can be under 100, equal to 100, or over 100; size is not the issue." },
      { t: "A percent cannot be used in a grocery store for any price, because percents belong only in mathematics classrooms.", fb: "Percents are used in stores for discounts and tax; the unit pairing is the issue here." },
      { t: "The rate uses a slash symbol between its two numbers, and percents never use any symbols in the way they are written.", fb: "Percents use the % symbol; the symbol used is not what decides the type." }
    ], sol, { mode: "why-cheese" });
  }
]), ["Compare what each idea links: a percent links a part to a whole of the same kind, a rate links two different units.", "First list the two units in the rate, then ask whether a percent could compare those same two things."]);

// 24. L2, 6.29, CR 2: solve a rate problem.
E("u5-rate-problem-solve", 5, ["6.29"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Find the unit rate first, then use it for the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars per hour} \\\\ \\text{new earnings} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] So the earnings are <b>$" + ans + "</b>.";
    return numq("Sam earned $" + earned + " for " + h1 + " h of work at a steady rate. At the same rate, how much will Sam earn for " + h2 + " h of work, in dollars?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "The speed is the unit rate, and time is distance divided by that rate: \\[ \\begin{aligned} \\text{time} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] So the trip takes <b>" + ansT + " h</b>.";
    return numq("A bus travels at a steady speed. It covers " + dist1 + " km in " + t1 + " h. At the same speed, how many hours will it take to travel " + D + " km?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Find the flow per minute first, then multiply by the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L per min} \\\\ \\text{new volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] So the volume is <b>" + ans3 + " L</b>.";
  return numq("A hose delivers " + vol + " L of water in " + m1 + " min at a steady rate. At the same rate, how many litres will it deliver in " + m2 + " min?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Every rate problem starts from the unit rate: the amount for one unit of the second quantity.", "First divide to get the amount per single hour, kilometre or minute in the problem."]);

// 25. L3, 6.1, CR 3: percent increase or decrease.
E("u5-percent-change", 5, ["6.1"], 3, "gen", function () {
  var inc = Math.random() < 0.5;
  var c = inc ? pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 80, 100]) : pick([5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]);
  var O = pick([40, 60, 80, 100, 120, 160, 200, 240, 300, 400, 500]);
  var N = O * (inc ? 1 + c / 100 : 1 - c / 100);
  var ctxs = inc ? [
    "School enrolment rose from " + O + " students one year to " + fmt(N, 0) + " students the next year. What is the percent increase in enrolment?",
    "A player's scoring total rose from " + O + " points last season to " + fmt(N, 0) + " points this season. What is the percent increase in the scoring total?",
    "A town trail network grew from " + O + " km of trails to " + fmt(N, 0) + " km of trails. What is the percent increase in trail length?"
  ] : [
    "A jacket price dropped from $" + O + " to $" + fmt(N, 0) + ". What is the percent decrease in the price?",
    "A pond water level count fell from " + O + " cm of depth in spring to " + fmt(N, 0) + " cm in late summer. What is the percent decrease in depth?",
    "A team bus fuel use fell from " + O + " L on one trip to " + fmt(N, 0) + " L on the same trip a year later. What is the percent decrease in fuel use?"
  ];
  var prompt = pick(ctxs), diff = Math.abs(N - O);
  var sol = "Percent change compares the change with the starting amount: \\[ \\begin{aligned} \\text{change} &= " + fmt(diff, 0) + " \\\\ \\text{percent change} &= " + FR(fmt(diff, 0), O) + " \\times 100 = " + c + "\\% \\end{aligned} \\] So the percent " + (inc ? "increase" : "decrease") + " is <b>" + c + "%</b>.";
  return numq(prompt + " Give the percent as a number.", c, 0.01, sol, { mode: inc ? "pct-inc" : "pct-dec", c: c, o: O });
}, ["Percent change always uses the starting amount as the whole, not the ending amount.", "First find the size of the change, then divide it by the starting amount."]);

// 26. L3, 6.2: successive percents, choose the final price.
E("u5-successive-percents", 5, ["6.2"], 3, "gen", function () {
  if (Math.random() < 0.5) {
    var P = pick([100, 150, 200, 300, 350, 400]), d1 = pick([10, 20, 25, 30]), d2 = pick([10, 20, 25].filter(function (x) { return x !== d1; }));
    var fin = u5r2(P * (1 - d1 / 100) * (1 - d2 / 100));
    var cands = [
      { t: "$" + fmtF(u5r2(P * (1 - (d1 + d2) / 100)), 2), fb: "That adds the two discounts into one; the second discount acts on the already reduced price, not the full price." },
      { t: "$" + fmtF(u5r2(P * (1 - d1 / 100)), 2), fb: "That applies only the first discount; the second discount still has to come off that price." },
      { t: "$" + fmtF(u5r2(P * (1 - d2 / 100)), 2), fb: "That applies only the second discount; the first discount comes off before it." }
    ];
    var ds = u5pick3("$" + fmtF(fin, 2), cands);
    var mid = u5r2(P * (1 - d1 / 100));
    var sol = "Each discount acts on the price left by the step before it: \\[ \\begin{aligned} \\text{after first discount} &= " + fmtF(P, 2) + " \\times " + fmt(1 - d1 / 100, 2) + " = " + fmtF(mid, 2) + " \\\\ \\text{final price} &= " + fmtF(mid, 2) + " \\times " + fmt(1 - d2 / 100, 2) + " = " + fmtF(fin, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin, 2) + "</b>.";
    return mcq("A bike is priced at $" + fmtF(P, 2) + ". It is first discounted by " + d1 + "%, and then the sale price is discounted by another " + d2 + "% at checkout. What is the final price?", { t: "$" + fmtF(fin, 2), fb: "Correct: the second discount is taken off the reduced price, step by step." }, ds, sol, { mode: "two-discounts", p: P, d1: d1, d2: d2 });
  }
  var P2 = pick([100, 150, 200, 250, 300, 400]), r = pick([10, 15, 20, 25, 30]);
  var fin2 = u5r2(P2 * (1 - r / 100) * (1 + r / 100));
  var cands2 = [
    { t: "$" + fmtF(P2, 2), fb: "Equal percents do not cancel here; the tax is charged on the smaller sale price, so the result is under the full price." },
    { t: "$" + fmtF(u5r2(P2 * (1 - r / 100)), 2), fb: "That is the sale price only; the tax still has to be added to it." },
    { t: "$" + fmtF(u5r2(P2 * (1 + r / 100)), 2), fb: "That taxes the full price and skips the discount; the discount comes first." }
  ];
  var ds2 = u5pick3("$" + fmtF(fin2, 2), cands2);
  var mid2 = u5r2(P2 * (1 - r / 100));
  var sol2 = "The tax percent acts on the sale price, which is smaller than the full price: \\[ \\begin{aligned} \\text{sale price} &= " + fmtF(P2, 2) + " \\times " + fmt(1 - r / 100, 2) + " = " + fmtF(mid2, 2) + " \\\\ \\text{final price} &= " + fmtF(mid2, 2) + " \\times " + fmt(1 + r / 100, 2) + " = " + fmtF(fin2, 2) + " \\end{aligned} \\] So the final price is <b>$" + fmtF(fin2, 2) + "</b>, not the full price.";
  return mcq("A coat is priced at $" + fmtF(P2, 2) + ". It is discounted by " + r + "%, and then tax of " + r + "% is added to the sale price. What is the final price?", { t: "$" + fmtF(fin2, 2), fb: "Correct: the tax is added to the reduced price, so it adds less than the discount took off." }, ds2, sol2, { mode: "discount-tax-equal", p: P2, r: r });
}, ["Successive percents never act on the same starting amount; each one acts on the amount left by the step before.", "First work out the amount after the first percent change, and use that as the new starting amount."]);

// 27. L3, 6.3, CR 2: percent of a percent applied to a quantity.
E("u5-percent-of-percent-quantity", 5, ["6.3"], 3, "gen", function () {
  var T = 800, A = 50, B = 40, att = 0;
  do {
    T = pick([200, 400, 500, 600, 800, 1000, 1200, 2000]); A = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); B = pick([20, 25, 30, 40, 50, 60, 75, 80, 90]); att++;
  } while ((T * A) % 100 !== 0 || ((T * A / 100) * B) % 100 !== 0);
  var mid = T * A / 100, ans = mid * B / 100;
  var ctxs = [
    { q: "A school has " + T + " students. " + A + "% of the students joined a lunch club. Of those club members, " + B + "% signed up for the cooking session. How many students signed up for the cooking session?", unit: "students" },
    { q: "A community library holds " + T + " books. " + A + "% of the books are in the youth section. Of those youth books, " + B + "% are graphic novels. How many graphic novels does the library hold?", unit: "graphic novels" },
    { q: "A tournament drew " + T + " spectators. " + A + "% of the spectators bought a program. Of those buyers, " + B + "% also bought a raffle ticket. How many spectators bought both a program and a raffle ticket?", unit: "spectators" }
  ];
  var cx = pick(ctxs);
  var sol = "Narrow the group down twice, one percent at a time: \\[ \\begin{aligned} \\text{after first percent} &= " + fmt(A / 100, 2) + " \\times " + T + " = " + mid + " \\\\ \\text{final count} &= " + fmt(B / 100, 2) + " \\times " + mid + " = " + ans + " \\end{aligned} \\] So the answer is <b>" + ans + " " + cx.unit + "</b>.";
  return numq(cx.q, ans, 0.01, sol, { mode: "pct-pct-quantity", t: T, a: A, b: B });
}, ["Take the percents one stage at a time; the second percent acts only on the group left by the first.", "First find how many are in the group after the first percent is applied."]);

// 28. L3, 6.28: advanced ratio problem.
E("u5-ratio-problem-advanced", 5, ["6.28"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var trip = pick([[2, 3, 4], [3, 2, 5], [4, 3, 2], [5, 3, 2], [2, 5, 3], [3, 4, 5]]);
    var a = trip[0], b = trip[1], c = trip[2], s = ri(3, 12), tot = (a + b + c) * s, ans = b * s;
    var sol = "Add all three parts to get the value of one part, then take the middle share: \\[ \\begin{aligned} \\text{one part} &= " + tot + " \\div " + (a + b + c) + " = " + s + " \\\\ \\text{middle share} &= " + b + " \\times " + s + " = " + ans + " \\end{aligned} \\] So the middle share is <b>" + ans + "</b>.";
    return numq("Prize tokens are shared among three players in the ratio " + a + ":" + b + ":" + c + ". There are " + tot + " tokens in total. How many tokens does the second player get?", ans, 0.01, sol, { mode: "ratio-three-total", a: a, b: b, c: c });
  }
  if (mode === 1) {
    var pr = pick([[5, 3], [7, 4], [9, 5], [8, 3], [7, 2], [5, 2]]);
    var a2 = pr[0], b2 = pr[1], s2 = ri(2, 9), diff = (a2 - b2) * s2, ans2 = (a2 + b2) * s2;
    var sol2 = "The difference in parts gives the value of one part: \\[ \\begin{aligned} \\text{one part} &= " + diff + " \\div " + (a2 - b2) + " = " + s2 + " \\\\ \\text{total} &= " + (a2 + b2) + " \\times " + s2 + " = " + ans2 + " \\end{aligned} \\] So the total length is <b>" + ans2 + " cm</b>.";
    return numq("A board is cut into two pieces in the ratio " + a2 + ":" + b2 + ". The longer piece is " + diff + " cm longer than the shorter piece. What is the total length of the board, in centimetres?", ans2, 0.01, sol2, { mode: "ratio-difference", a: a2, b: b2 });
  }
  var pr3 = pick([[2, 3], [3, 5], [4, 7], [5, 4], [3, 7], [2, 5]]);
  var a3 = pr3[0], b3 = pr3[1], s3 = ri(3, 11), given = a3 * s3, ans3 = b3 * s3;
  var sol3 = "Equivalent ratios keep the same scale on both terms: \\[ \\begin{aligned} \\text{scale} &= " + given + " \\div " + a3 + " = " + s3 + " \\\\ \\text{missing term} &= " + b3 + " \\times " + s3 + " = " + ans3 + " \\end{aligned} \\] So the missing term is <b>" + ans3 + "</b>.";
  return numq("Two mixes follow the same ratio " + a3 + ":" + b3 + " of sand to cement. The second mix uses " + given + " scoops of sand. How many scoops of cement does the second mix use?", ans3, 0.01, sol3, { mode: "ratio-equivalent", a: a3, b: b3 });
}, ["Translate the extra information, a total, a difference or a known term, into the value of one ratio part.", "First decide which combination of the ratio parts matches the amount given in the problem."]);

// 29. L3, 6.29: compare unit rates, better buy.
E("u5-better-buy", 5, ["6.29"], 3, "gen", function () {
  var items = [
    { thing: "granola bars", unit: "bar" }, { thing: "juice boxes", unit: "box" }, { thing: "pencils", unit: "pencil" },
    { thing: "muffins", unit: "muffin" }, { thing: "stickers", unit: "sticker" }, { thing: "tennis balls", unit: "ball" }
  ];
  var it = pick(items);
  var c1 = ri(4, 12), c2 = ri(4, 16); if (c2 === c1) c2 += 4;
  var u1 = ri(40, 120), u2 = u1 + pick([-25, -20, -15, -10, 10, 15, 20, 25]); if (u2 < 25) u2 = u1 + 20;
  var p1 = c1 * u1 / 100, p2 = c2 * u2 / 100;
  var aBetter = u1 < u2;
  var corr = aBetter ? "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit : "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit;
  var other = aBetter ? "Pack B, at $" + fmtF(u2 / 100, 2) + " for each " + it.unit : "Pack A, at $" + fmtF(u1 / 100, 2) + " for each " + it.unit;
  var cands = [
    { t: other, fb: "That pack costs more for each " + it.unit + "; compare the price for one item, not the pack price alone." },
    { t: "Both packs cost the same for each " + it.unit + ".", fb: "The unit prices are different; divide each pack price by its count to see the gap." },
    { t: "The packs cannot be compared, since counts differ.", fb: "Different counts are exactly why unit rates are used; the price for one item can always be compared." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Compare the price for a single item in each pack: \\[ \\begin{aligned} \\text{Pack A} &= " + fmtF(p1, 2) + " \\div " + c1 + " = " + fmtF(u1 / 100, 2) + " \\text{ per " + it.unit + "} \\\\ \\text{Pack B} &= " + fmtF(p2, 2) + " \\div " + c2 + " = " + fmtF(u2 / 100, 2) + " \\text{ per " + it.unit + "} \\end{aligned} \\] The lower unit price wins, so the better buy is <b>" + corr + "</b>.";
  return mcq("Pack A holds " + c1 + " " + it.thing + " and costs $" + fmtF(p1, 2) + ". Pack B holds " + c2 + " " + it.thing + " and costs $" + fmtF(p2, 2) + ". Which pack is the better buy?", { t: corr, fb: "Correct: that pack has the lower price for each single item." }, ds, sol, { mode: "better-buy", c1: c1, c2: c2 });
}, ["Pack prices cannot be compared directly when the packs hold different counts; compare one item at a time.", "First divide each pack price by the number of items in that pack."]);

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
    if (form === "pct") return fmt(item.v * 100, 0) + "%";
    if (form === "frac") return "\\(" + FR(item.fr[0], item.fr[1]) + "\\)";
    return fmt(item.v, 2);
  }
  var labelled = trio.map(function (item, i) { return { v: item.v, s: disp(item, forms[i]) }; });
  var sorted = labelled.slice().sort(function (x, y) { return x.v - y.v; });
  function listOf(arr) { return arr.map(function (x) { return x.s; }).join(", "); }
  var corr = listOf(sorted);
  var rev = sorted.slice().reverse();
  var swapA = sorted.slice(); var tmp = swapA[0]; swapA[0] = swapA[1]; swapA[1] = tmp;
  var swapB = sorted.slice(); var tmp2 = swapB[1]; swapB[1] = swapB[2]; swapB[2] = tmp2;
  var cands = [
    { t: listOf(rev), fb: "That lists the values from greatest to least instead of least to greatest." },
    { t: listOf(swapA), fb: "The first two values are swapped; convert all three to decimals and compare again." },
    { t: listOf(swapB), fb: "The last two values are swapped; convert all three to decimals and compare again." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Convert every value to a decimal before ordering: \\[ \\begin{aligned} " + sorted.map(function (x) { return fmt(x.v, 2); }).join(" &< ") + " \\end{aligned} \\] So the order from least to greatest is <b>" + corr + "</b>.";
  return mcq("Which list orders the values from least to greatest? The values are " + listOf(labelled) + ".", { t: corr, fb: "Correct: after conversion to decimals, the values rise steadily in that order." }, ds, sol, { mode: "mixed-order", vals: sorted.map(function (x) { return x.v; }).join(",") });
}, ["Values in different forms cannot be compared until they share one form.", "First convert the percent and the fraction into decimals, then sort all three decimals."]);

/* ----- bank-u6.js ----- */
// Math 8 Unit 6 Linear Equations and Graphing question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 2565 to 2951).
// CRMARKS: u6-graph-extend-pair=2
// CRMARKS: u6-missing-ordered-pair=2
// CRMARKS: u6-missing-ordered-pair-backward=2
// CRMARKS: u6-solve-context-problem=3
// CRMARKS: u6-solve-distributive=3
// CRMARKS: u6-solve-div-plus=2
// CRMARKS: u6-solve-group-problem=3
// CRMARKS: u6-solve-two-step=3
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
function u6sgn(v) { return v >= 0 ? " + " + fmt(v) : " - " + fmt(-v); }
function u6graphPts(o) {
  var W = 330, H = 290, x0 = 52, y0 = 238, x1 = 312, y1 = 26;
  var sx = (x1 - x0) / o.xmax, sy = (y0 - y1) / o.ymax;
  function X(v) { return fmt(x0 + v * sx, 1); }
  function Y(v) { return fmt(y0 - v * sy, 1); }
  var xs = o.xstep || 1, ys = o.ystep || (o.ymax <= 12 ? 1 : 2);
  var s = '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Graph of a linear relation shown as separate points">';
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
  s += '<text x="' + fmt(x0 - 4, 1) + '" y="' + (y1 - 10) + '" font-size="13" font-style="italic" fill="' + FIG_INK + '" text-anchor="middle">' + (o.ylab || "y") + '</text>';
  return s + '</svg>';
}

// 1. L1, 8.4: solve a one-step equation, ax = b or x/a = b.
E("u6-solve-one-step", 6, ["8.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var form = pick(["ax", "xa"]);
    var a = ri(2, 9), x = ri(2, 12), b = form === "ax" ? a * x : x;
    if (form === "xa") { b = x; x = a * b; } // equation x/a = b, solution x = a*b
    var solX = form === "ax" ? b / a : a * b;
    var eq = form === "ax" ? fmt(a) + "x = " + fmt(b) : "\\frac{x}{" + a + "} = " + fmt(b);
    var wrong = form === "ax" ? [b * a, b - a, b + a] : [b / a, b - a, b + a];
    var corr = fmt(solX);
    var dpA = (fmt(wrong[0]).split(".")[1] || "").length;
    var cands = wrong.map(function (w, wi) {
      return { t: (form === "xa" && wi === 1 && dpA > 0) ? fmtF(w, dpA) : fmt(w), fb: form === "ax" ? "That uses the wrong operation. To undo multiplying by " + a + ", divide both sides by " + a + "." : "That uses the wrong operation. To undo dividing by " + a + ", multiply both sides by " + a + "." };
    });
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var steps = form === "ax"
      ? "\\begin{aligned} " + fmt(a) + "x &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}"
      : "\\begin{aligned} \\frac{x}{" + a + "} &= " + fmt(b) + " \\\\ x &= " + fmt(b) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(solX) + " \\end{aligned}";
    var sol = "Use the inverse operation on both sides: \\[ " + steps + " \\] So the solution is <b>\\(x = " + fmt(solX) + "\\)</b>.";
    return mcq("Solve the equation \\(" + eq + "\\). What is the value of \\(x\\)?",
      { t: corr, fb: "Correct. The inverse operation isolates x." }, ds, sol,
      { mode: "solve-one-step", form: form, a: a, b: b });
  }
  return mcq("Solve the equation \\(3x = 12\\). What is the value of \\(x\\)?",
    { t: "4", fb: "Correct. Divide both sides by 3." },
    [{ t: "36", fb: "That multiplies instead of dividing." }, { t: "9", fb: "That subtracts 3 instead of dividing by 3." }, { t: "15", fb: "That adds 3 instead of dividing by 3." }],
    "Divide both sides by 3: \\[ \\begin{aligned} 3x &= 12 \\\\ x &= 4 \\end{aligned} \\] So the solution is <b>\\(x = 4\\)</b>.", { mode: "solve-one-step-fallback" });
}, ["Think about what is being done to x, then use the opposite operation.", "For ax = b divide both sides by a; for x/a = b multiply both sides by a."]);

// 2. L1, 8.3: verify by substitution, find the value of the left side.
E("u6-verify-left-side", 6, ["8.3"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 7), b = ri(1, 9), xt = ri(2, 9);
    var c = a * xt + b;
    var claim = Math.random() < 0.5 ? xt : xt + pick([-2, -1, 1, 2]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = fmt(lhs);
    var cands = [
      { t: fmt(c), fb: "That is the right side of the equation. The question asks for the left side after substituting x = " + claim + "." },
      { t: fmt(a + claim + b), fb: "That adds the numbers. The term " + fmt(a) + "x means " + a + " times x, not " + a + " plus x." },
      { t: fmt(a * claim), fb: "That works out " + fmt(a) + "x but forgets to add the " + fmt(b) + " that follows it." },
      { t: fmt(lhs + a), fb: "Check the multiplication: " + a + " times " + claim + " is " + fmt(a * claim) + ", then add " + fmt(b) + "." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var verdict = claim === xt ? " and it equals the right side, " + fmt(c) + ", so x = " + claim + " checks out" : " and it does not equal the right side, " + fmt(c) + ", so x = " + claim + " is not the solution";
    var sol = "Substitute \\(x = " + claim + "\\) into the left side: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(a) + "(" + claim + ") + " + fmt(b) + " \\\\ &= " + fmt(a * claim) + " + " + fmt(b) + " \\\\ &= " + fmt(lhs) + " \\end{aligned} \\] The left side is <b>" + fmt(lhs) + "</b>" + verdict + ".";
    return mcq("To check a solution, substitute \\(x = " + claim + "\\) into the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of the left side?",
      { t: corr, fb: "Correct. Substitution replaces x, then the arithmetic gives the left side." }, ds, sol,
      { mode: "verify-left-side", a: a, b: b, claim: claim });
  }
  return mcq("To check a solution, substitute \\(x = 3\\) into the equation \\(2x + 4 = 10\\). What is the value of the left side?",
    { t: "10", fb: "Correct. 2(3) + 4 = 10." },
    [{ t: "6", fb: "That forgets to add the 4." }, { t: "9", fb: "That adds 2 + 3 + 4 instead of multiplying 2 by 3 first." }, { t: "12", fb: "Check the multiplication: 2 times 3 is 6, then add 4." }],
    "Substitute: \\[ \\begin{aligned} 2x + 4 &= 2(3) + 4 \\\\ &= 10 \\end{aligned} \\] The left side is <b>10</b>.", { mode: "verify-left-side-fallback" });
}, ["Substitution means replacing x with the given number everywhere x appears.", "Work out the multiplication first, then add."]);

// 3. L1, 7.2: build a table value from an equation.
E("u6-table-missing-value", 6, ["7.2"], 1, "gen", function () {
  var m = ri(2, 6), b = ri(1, 9), qx = ri(0, 4);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (x) { return m * x + b; });
  var shown = ys.map(function (y, i) { return i === qx ? "?" : fmt(y); });
  var ans = ys[qx];
  var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\). For the missing entry, \\(x = " + qx + "\\): \\[ \\begin{aligned} y &= " + fmt(m) + "(" + qx + ") + " + fmt(b) + " \\\\ &= " + fmt(m * qx) + " + " + fmt(b) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the missing table value is <b>" + fmt(ans) + "</b>.";
  var prompt = "A table of values is made from the equation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\).<br>x: " + xs.join(", ") + "<br>y: " + shown.join(", ") + "<br>What is the missing y value?";
  return numq(prompt, ans, 0.01, sol, { mode: "table-missing-value", m: m, b: b, qx: qx });
}, ["Each y value comes from substituting its x value into the equation.", "Multiply the missing row's x value by the coefficient, then add the constant."]);

// 4. L2, 8.4, CR 3: solve ax + b = c symbolically (some fractional solutions).
E("u6-solve-two-step", 6, ["8.4"], 2, "gen", function () {
  var frac = Math.random() < 0.35;
  var a, b, x;
  if (frac) { a = pick([2, 4, 6, 8]); x = ri(1, 6) + 0.5; b = ri(1, 12); }
  else { a = ri(2, 9); x = ri(2, 13); b = ri(1, 14); }
  var c = a * x + b;
  var sol = "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(a * x) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + ") + " + fmt(b) + " = " + fmt(a * x) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-two-step", a: a, b: b, frac: frac });
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the coefficient of x."]);

// 5. L2, 8.1: model a context with an equation of the form ax + b = c.
E("u6-model-equation", 6, ["8.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 9), b = ri(3, 20), x = ri(3, 12), c = a * x + b;
    if (a === b) continue;
    var ctx = pick([
      "A rink rental costs a $" + b + " booking fee plus $" + a + " for each hour. The total cost was $" + c + ". Let x be the number of hours rented.",
      "A ferry tour costs a $" + b + " harbour fee plus $" + a + " for each passenger. The total cost was $" + c + ". Let x be the number of passengers.",
      "A snow-clearing service charges a $" + b + " call-out fee plus $" + a + " for each driveway cleared. The total charge was $" + c + ". Let x be the number of driveways cleared."
    ]);
    var corr = "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\)";
    var ds = u6pick3(corr, [
      { t: "\\(" + fmt(b) + "x + " + fmt(a) + " = " + fmt(c) + "\\)", fb: "That swaps the fee and the per-unit charge. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\)", fb: "That multiplies the fee by " + a + " as well. The fee is paid once, not once per unit." },
      { t: "\\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\)", fb: "That divides x by the per-unit charge. Each unit adds $" + a + ", so x is multiplied by " + a + "." },
      { t: "\\(" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + "\\)", fb: "That moves the fee to the wrong side. In the model, the fee and the unit charges together make the total." }
    ]);
    if (!ds) continue;
    var sol = "The $" + b + " fee is paid once, and the $" + a + " charge is paid x times, for a total of $" + c + ": \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\end{aligned} \\] So the equation that models the problem is <b>" + corr + "</b>.";
    return mcq(ctx + " Which equation models this problem?",
      { t: corr, fb: "Correct. The per-unit charge multiplies x, the one-time fee stands alone, and together they equal the total." }, ds, sol,
      { mode: "model-equation", a: a, b: b, c: c });
  }
  return mcq("A rink rental costs a $10 booking fee plus $4 for each hour. The total cost was $34. Let x be the number of hours rented. Which equation models this problem?",
    { t: "\\(4x + 10 = 34\\)", fb: "Correct. The per-hour charge multiplies x and the fee stands alone." },
    [{ t: "\\(10x + 4 = 34\\)", fb: "That swaps the fee and the per-hour charge." }, { t: "\\(4(x + 10) = 34\\)", fb: "That multiplies the fee by 4 as well." }, { t: "\\(4x = 34 + 10\\)", fb: "That moves the fee to the wrong side." }],
    "The $4 charge is paid x times and the $10 fee once: \\[ \\begin{aligned} 4x + 10 &= 34 \\end{aligned} \\] So the model is <b>\\(4x + 10 = 34\\)</b>.", { mode: "model-equation-fallback" });
}, ["Decide which amount is paid once and which is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount is added once."]);

// 6. L2, 8.7, CR 3: solve a problem using a linear equation.
E("u6-solve-context-problem", 6, ["8.7"], 2, "gen", function () {
  var a = ri(2, 9), b = ri(4, 25), x = ri(3, 14), c = a * x + b;
  var ctx = pick([
    { q: "A school rents a bus for a field trip. The rental costs a $" + b + " booking fee plus $" + a + " for each kilometre driven. The total bill was $" + c + ". How many kilometres did the bus drive?", unit: "kilometres" },
    { q: "A community hall charges a $" + b + " setup fee plus $" + a + " for each table rented. A group paid $" + c + " in total. How many tables did the group rent?", unit: "tables" },
    { q: "A bike shop charges a $" + b + " service fee plus $" + a + " for each gear adjusted. A customer paid $" + c + " in total. How many gears were adjusted?", unit: "gears" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + ". The fee is paid once and the $" + a + " charge is paid \\(x\\) times: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the answer is <b>" + fmt(x) + " " + ctx.unit + "</b>.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-context-problem", a: a, b: b, c: c, unit: ctx.unit });
}, ["Write an equation first: one-time fee plus per-unit charge times the unknown, equal to the total.", "Subtract the fee from the total, then divide what is left by the per-unit charge."]);

// 7. L2, 8.6: identify an error in a worked solution.
E("u6-identify-error", 6, ["8.6"], 2, "gen", function () {
  var type = pick(["add-instead", "divide-one-term", "distribute-part"]);
  if (type === "add-instead") {
    var a = ri(2, 8), b = a * ri(1, 2), x = ri(2, 11), c = a * x + b;
    var wrong = (c + b) / a;
    var prompt = "A student solves \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\) and writes: \"" + fmt(a) + "x = " + fmt(c) + " + " + fmt(b) + ", so x = " + fmt(wrong) + ".\" What error did the student make?";
    var corr = "The student added " + fmt(b) + " to both sides instead of subtracting it.";
    var sol = "To undo adding " + fmt(b) + ", subtract " + fmt(b) + " from both sides: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " = " + fmt(c - b) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the error is <b>" + corr + "</b>";
    return mcq(prompt, { t: corr, fb: "Correct. The inverse of adding " + fmt(b) + " is subtracting " + fmt(b) + "." },
      [
        { t: "The student divided by " + fmt(a) + " too early, before dealing with the " + fmt(b) + ".", fb: "Look at the student's first line: the division step never happened. The change made to the " + fmt(b) + " is where the work goes wrong." },
        { t: "The student multiplied both sides by " + fmt(a) + " instead of dividing.", fb: "No multiplication by " + fmt(a) + " appears in the work. Compare the first line with the original equation." },
        { t: "There is no error; the student's answer is correct after all.", fb: "Check the answer by substitution: " + fmt(a) + "(" + fmt(wrong) + ") + " + fmt(b) + " does not equal " + fmt(c) + "." }
      ], sol, { mode: "identify-error-add", a: a, b: b });
  }
  if (type === "divide-one-term") {
    var a2 = ri(2, 8), b2 = a2 * ri(1, 2), x2 = ri(3, 11), c2 = a2 * x2 + b2;
    var prompt2 = "A student solves \\(" + fmt(a2) + "x + " + fmt(b2) + " = " + fmt(c2) + "\\) and writes: \"x + " + fmt(b2) + " = " + fmt(c2 / a2) + ", so x = " + fmt(c2 / a2 - b2) + ".\" What error did the student make?";
    var corr2 = "The student divided the " + fmt(a2) + "x term and the total by " + fmt(a2) + ", but did not divide the " + fmt(b2) + " term.";
    var sol2 = "Every term must be treated the same way. It is simpler to subtract first: \\[ \\begin{aligned} " + fmt(a2) + "x + " + fmt(b2) + " &= " + fmt(c2) + " \\\\ " + fmt(a2) + "x &= " + fmt(c2 - b2) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the error is <b>" + corr2 + "</b>";
    return mcq(prompt2, { t: corr2, fb: "Correct. Dividing only some terms by " + fmt(a2) + " changes the equation." },
      [
        { t: "The student subtracted " + fmt(b2) + " from one side only, not from both sides of the equation.", fb: "The student never subtracted " + fmt(b2) + " at all. Look at which terms were divided in the first line." },
        { t: "The student used the wrong variable in the final answer and in the working.", fb: "The variable is x throughout. The problem is in how the terms were divided." },
        { t: "There is no error in the student's work; dividing the terms in that way is valid and the answer is correct.", fb: "Check by substitution: " + fmt(a2) + "(" + fmt(c2 / a2 - b2) + ") + " + fmt(b2) + " does not equal " + fmt(c2) + "." }
      ], sol2, { mode: "identify-error-divide", a: a2, b: b2 });
  }
  var a3 = ri(2, 6), b3 = ri(2, 9), x3 = ri(2, 10), c3 = a3 * (x3 + b3);
  var prompt3 = "A student solves \\(" + fmt(a3) + "(x + " + fmt(b3) + ") = " + fmt(c3) + "\\) and writes: \"" + fmt(a3) + "x + " + fmt(b3) + " = " + fmt(c3) + ".\" What error did the student make?";
  var corr3 = "The student multiplied only the x term by " + fmt(a3) + " and left the " + fmt(b3) + " term unchanged.";
  var sol3 = "The distributive property multiplies every term inside the brackets: \\[ \\begin{aligned} " + fmt(a3) + "(x + " + fmt(b3) + ") &= " + fmt(c3) + " \\\\ " + fmt(a3) + "x + " + fmt(a3 * b3) + " &= " + fmt(c3) + " \\end{aligned} \\] So the error is <b>" + corr3 + "</b>";
  return mcq(prompt3, { t: corr3, fb: "Correct. The number outside the brackets multiplies both terms inside." },
    [
      { t: "The student added " + fmt(a3) + " and " + fmt(b3) + " instead of multiplying the terms inside the brackets.", fb: "No addition of " + fmt(a3) + " and " + fmt(b3) + " appears. One bracket term was multiplied and the other was not." },
      { t: "The student should have divided both sides by " + fmt(b3) + " first, before expanding the brackets.", fb: "Dividing by " + fmt(a3) + " first would be a valid start; dividing by " + fmt(b3) + " is not the issue in this work." },
      { t: "There is no error; expanding the brackets gives exactly that line.", fb: "Expanding gives " + fmt(a3) + "x + " + fmt(a3 * b3) + ", not " + fmt(a3) + "x + " + fmt(b3) + "." }
    ], sol3, { mode: "identify-error-distribute", a: a3, b: b3 });
}, ["Compare the student's first line with the original equation, term by term.", "Ask what the student did to each term, and whether the same was done to every term."]);

// 8. L2, 8.2: visual (tile/balance) representation of a solving step.
E("u6-visual-step", 6, ["8.2"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 6), b = ri(2, 12), x = ri(2, 11), c = a * x + b;
    var step = pick(["remove", "split"]);
    if (step === "remove") {
      var corr = "\\(" + fmt(a) + "x = " + fmt(c - b) + "\\)";
      var ds = u6pick3(corr, [
        { t: "\\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c - b) + "\\)", fb: "That removes the unit tiles from one side only. A balance stays level only when the same tiles leave both sides." },
        { t: "\\(" + fmt(a) + "x = " + fmt(c + b) + "\\)", fb: "That adds tiles to the right side. The picture removes " + fmt(b) + " unit tiles from each side." },
        { t: "\\(x = " + fmt(c - b) + "\\)", fb: "That skips a step. The bags are still closed at this stage, so the left side is still " + fmt(a) + "x." }
      ]);
      if (!ds) continue;
      var sol = "Removing " + fmt(b) + " unit tiles from both sides keeps the balance level: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(b) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\end{aligned} \\] So the picture after this step shows <b>" + corr + "</b>.";
      return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) and " + fmt(b) + " loose counters on the left pan, balanced by " + fmt(c) + " counters on the right pan. The next picture removes " + fmt(b) + " loose counters from each pan. Which equation does the next picture show?",
        { t: corr, fb: "Correct. The same removal on both sides gives " + fmt(a) + "x = " + fmt(c - b) + "." }, ds, sol,
        { mode: "visual-remove", a: a, b: b });
    }
    var tot = a * x, per = x;
    var corrS = "\\(x = " + fmt(x) + "\\)";
    var dsS = u6pick3(corrS, [
      { t: "\\(x = " + fmt(per + 1) + "\\)", fb: "Count again: " + fmt(tot) + " counters split into " + fmt(a) + " equal groups gives " + fmt(per) + " in each group." },
      { t: "\\(" + fmt(a) + "x = " + fmt(tot) + "\\)", fb: "That is the picture before splitting. After the split, each single bag stands alone." },
      { t: "\\(x = " + fmt(tot) + "\\)", fb: "That gives one bag all " + fmt(tot) + " counters. The counters are shared equally among " + fmt(a) + " bags." }
    ]);
    if (!dsS) continue;
    var solS = "The model splits " + fmt(tot) + " counters into " + fmt(a) + " equal groups, one group for each bag: \\[ \\begin{aligned} x &= " + fmt(tot) + " \\div " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So the final picture shows <b>" + corrS + "</b>.";
    return mcq("A balance model shows " + fmt(a) + " closed bags (each holding x counters) balanced by " + fmt(tot) + " counters. The final picture splits the counters into " + fmt(a) + " equal groups and matches one group with one bag. Which equation does the final picture show?",
      { t: corrS, fb: "Correct. Each bag matches one equal group of " + fmt(per) + " counters." }, dsS, solS,
      { mode: "visual-split", a: a, c: tot });
  }
  return mcq("A balance model shows 3 closed bags (each holding x counters) and 4 loose counters on the left pan, balanced by 19 counters on the right pan. The next picture removes 4 loose counters from each pan. Which equation does the next picture show?",
    { t: "\\(3x = 15\\)", fb: "Correct. The same removal on both sides gives 3x = 15." },
    [{ t: "\\(3x + 4 = 15\\)", fb: "That removes counters from one side only." }, { t: "\\(3x = 23\\)", fb: "That adds counters instead of removing them." }, { t: "\\(x = 15\\)", fb: "The bags are still closed, so the left side is still 3x." }],
    "Removing 4 from both sides: \\[ \\begin{aligned} 3x + 4 &= 19 \\\\ 3x &= 15 \\end{aligned} \\] So the picture shows <b>\\(3x = 15\\)</b>.", { mode: "visual-remove-fallback" });
}, ["A balance picture changes the equation only when the same change is made on both sides.", "Match each part of the picture to a term: bags are x terms, loose counters are numbers."]);

// 9. L2, 8.5, CR 3: solve a(x + b) = c using the distributive property.
E("u6-solve-distributive", 6, ["8.5"], 2, "gen", function () {
  var a = ri(2, 7), b = ri(1, 10), x = ri(2, 13), c = a * (x + b);
  var sol = "Apply the distributive property first, then solve: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c) + " - " + fmt(a * b) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(" + fmt(a) + "(" + fmt(x) + " + " + fmt(b) + ") = " + fmt(a) + "(" + fmt(x + b) + ") = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a) + "(x + " + fmt(b) + ") = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-distributive", a: a, b: b });
}, ["The number outside the brackets multiplies every term inside the brackets.", "Expand the brackets first, then subtract and divide as usual."]);

// 10. L2, 8.4, CR 2: solve x/a + b = c.
E("u6-solve-div-plus", 6, ["8.4"], 2, "gen", function () {
  var a = ri(2, 8), b = ri(1, 12), d = ri(2, 11), x = a * d, c = d + b;
  var sol = "Subtract first, then undo the division by multiplying: \\[ \\begin{aligned} \\frac{x}{" + a + "} + " + fmt(b) + " &= " + fmt(c) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(c) + " - " + fmt(b) + " \\\\ \\frac{x}{" + a + "} &= " + fmt(d) + " \\\\ x &= " + fmt(d) + " \\times " + fmt(a) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] Check: \\(\\frac{" + fmt(x) + "}{" + a + "} + " + fmt(b) + " = " + fmt(d) + " + " + fmt(b) + " = " + fmt(c) + "\\). So the solution is <b>\\(x = " + fmt(x) + "\\)</b>.";
  return numq("Solve the equation \\(\\frac{x}{" + a + "} + " + fmt(b) + " = " + fmt(c) + "\\). What is the value of x?", x, 0.01, sol,
    { mode: "solve-div-plus", a: a, b: b, d: d });
}, ["Work in reverse order: deal with the added number before the division.", "Subtract the constant from both sides, then multiply both sides by the divisor."]);

// 11. L1, 7.3: missing y value in an ordered pair (forward mode; split under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair", 6, ["7.3"], 1, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var x = ri(1, 9), y = m * x + b;
  var sol = "Substitute \\(x = " + x + "\\) into the equation: \\[ \\begin{aligned} y &= " + fmt(m) + "(" + x + ")" + u6sgn(b) + " \\\\ &= " + fmt(m * x) + u6sgn(b) + " \\\\ &= " + fmt(y) + " \\end{aligned} \\] So the missing value in the pair \\((" + x + ", \\ ?)\\) is <b>" + fmt(y) + "</b>.";
  return numq("The ordered pair \\((" + x + ", \\ ?)\\) lies on the relation \\(y = " + fmt(m) + "x" + u6sgn(b) + "\\). What is the missing y value?", y, 0.01, sol,
    { mode: "missing-pair-y", m: m, b: b, x: x });
}, ["An ordered pair on a relation must satisfy its equation when the known value is substituted.", "Substitute the known coordinate, then solve the small equation that remains."]);

// 11b. L2, 7.3, CR 2: missing x value in an ordered pair (backward mode; split from u6-missing-ordered-pair under ruling 18, Nov 9, 2026).
E("u6-missing-ordered-pair-backward", 6, ["7.3"], 2, "gen", function () {
  var m = ri(2, 7), b = ri(-4, 9);
  var xt = ri(2, 10), yt = m * xt + b;
  var sol2 = "Substitute \\(y = " + yt + "\\) and solve for \\(x\\): \\[ \\begin{aligned} " + fmt(yt) + " &= " + fmt(m) + "x" + u6sgn(b) + " \\\\ " + fmt(yt) + (b >= 0 ? " - " + fmt(b) : " + " + fmt(-b)) + " &= " + fmt(m) + "x \\\\ " + fmt(yt - b) + " &= " + fmt(m) + "x \\\\ x &= " + fmt(xt) + " \\end{aligned} \\] So the missing value in the pair \\((?, " + fmt(yt) + ")\\) is <b>" + fmt(xt) + "</b>.";
  return numq("The ordered pair \\((?, " + fmt(yt) + ")\\) lies on the relation \\(y = " + fmt(m) + "x" + u6sgn(b) + "\\). What is the missing x value?", xt, 0.01, sol2,
    { mode: "missing-pair-x", m: m, b: b, yt: yt });
}, ["An ordered pair on a relation must satisfy its equation when the known value is substituted.", "Substitute the known coordinate, then solve the small equation that remains."]);

// 12. L2, 7.1: describe the relationship shown in a graph of discrete points.
E("u6-describe-graph", 6, ["7.1"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var ctx = pick([
      { xl: "guests", yl: "cost ($)", thing: "total cost in dollars", per: "guest" },
      { xl: "hours", yl: "distance (km)", thing: "distance in kilometres", per: "hour" },
      { xl: "weeks", yl: "savings ($)", thing: "savings in dollars", per: "week" }
    ]);
    var b = ri(0, 8), m = ri(2, 6);
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
    var corr = "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m) + ", starting from " + fmt(b) + ".";
    var ds = u6pick3(corr, [
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(b) + ", starting from " + fmt(m) + ".", fb: "That swaps the start and the step. The first point sits at " + fmt(b) + ", and neighbouring points rise by " + fmt(m) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " grows by " + fmt(m + 1) + ", starting from " + fmt(b) + ".", fb: "The start is right, but compare two neighbouring points: the rise is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "As the x value grows by 1, the " + ctx.thing + " shrinks by " + fmt(m) + ", starting from " + fmt(b) + ".", fb: "The points rise as x grows, so the values grow; they do not shrink." },
      { t: "As the x value grows by " + fmt(m) + ", the " + ctx.thing + " grows by 1, starting from " + fmt(b) + ".", fb: "That reverses the roles of the step and the x change. Read across one step in x and check the rise in y." }
    ]);
    if (!ds) continue;
    var sol = "Read the first point and the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the relationship is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation as separate points. The x-axis is measured in " + ctx.xl + " and the y-axis in " + ctx.yl + ". Which sentence describes the relationship between the variables?",
      { t: corr, fb: "Correct. The first point gives the start and the steady rise gives the step." }, ds, sol,
      { mode: "describe-graph", b: b, m: m, ctx: ctx.xl });
    q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation as separate points. The x-axis is measured in hours and the y-axis in distance (km). Which sentence describes the relationship between the variables?",
    { t: "As the x value grows by 1, the distance in kilometres grows by 3, starting from 2.", fb: "Correct. The first point gives the start and the steady rise gives the step." },
    [{ t: "As the x value grows by 1, the distance in kilometres grows by 2, starting from 3.", fb: "That swaps the start and the step." }, { t: "As the x value grows by 1, the distance in kilometres grows by 4, starting from 2.", fb: "The rise between neighbouring points is 3, not 4." }, { t: "As the x value grows by 1, the distance in kilometres shrinks by 3, starting from 2.", fb: "The points rise, so the values grow." }],
    "The first point is 2 and neighbouring points rise by 3, so the relationship is <b>as x grows by 1, the distance grows by 3, starting from 2</b>.", { mode: "describe-graph-fallback" });
  var pf = []; for (var k2 = 0; k2 <= 5; k2++) pf.push([k2, 2 + 3 * k2]);
  qf.figure = u6graphPts({ xmax: 5, ymax: 17, xlab: "hours", ylab: "distance (km)", points: pf });
  return qf;
}, ["Start with the point where x is 0: that is the starting value of the relation.", "Compare two neighbouring points to find how much y changes for each step of 1 in x."]);

// 13. L2, 7.4: construct the graph (choose the correct set of plotted points) for an equation.
E("u6-construct-graph-points", 6, ["7.4"], 1, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var m = ri(2, 6), b = ri(1, 8);
    if (m === b) continue;
    var win = pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4], [2, 3, 4, 5]]);
    function setStr(mm, bb) { var p = []; for (var k = 0; k < win.length; k++) p.push("(" + win[k] + ", " + fmt(mm * win[k] + bb) + ")"); return p.join(", "); }
    var corr = setStr(m, b);
    var ds = u6pick3(corr, [
      { t: setStr(b, m), fb: "That set comes from swapping the step and the start. Check the point where x = 0: its y value should be " + fmt(b) + "." },
      { t: setStr(m, -b), fb: "That set subtracts the start value. At x = 0 the equation gives y = " + fmt(b) + ", a positive value." },
      { t: setStr(m + 1, b), fb: "That set uses a step of " + fmt(m + 1) + ". The equation's step is the number multiplying x, which is " + fmt(m) + "." },
      { t: setStr(m, b + m), fb: "That set starts one step too high. At x = 0 the y value is the start, " + fmt(b) + ", not " + fmt(b + m) + "." }
    ]);
    if (!ds) continue;
    var lines = win.map(function (xv) { return "x=" + xv + "&:\\ y = " + fmt(m * xv + b); }).join(" \\\\ ");
    var sol = "Substitute each \\(x\\) value into \\(y = " + fmt(m) + "x + " + fmt(b) + "\\): \\[ \\begin{aligned} " + lines + " \\end{aligned} \\] Plotting those values gives the point set <b>" + corr + "</b>.";
    return mcq("A graph of the relation \\(y = " + fmt(m) + "x + " + fmt(b) + "\\) is constructed by plotting points for \\(x = " + win.join(", ") + "\\). Which set of points is plotted?",
      { t: corr, fb: "Correct. Each point comes from substituting its x value into the equation." }, ds, sol,
      { mode: "construct-graph-points", m: m, b: b });
  }
  return mcq("A graph of the relation \\(y = 2x + 3\\) is constructed by plotting points for \\(x = 0, 1, 2, 3\\). Which set of points is plotted?",
    { t: "(0, 3), (1, 5), (2, 7), (3, 9)", fb: "Correct. Each point comes from substituting its x value into the equation." },
    [{ t: "(0, 2), (1, 5), (2, 8), (3, 11)", fb: "That set swaps the step and the start." }, { t: "(0, -3), (1, -1), (2, 1), (3, 3)", fb: "That set subtracts the start value." }, { t: "(0, 3), (1, 6), (2, 9), (3, 12)", fb: "That set uses a step of 3 instead of 2." }],
    "Substitute each x value: \\[ \\begin{aligned} x=0&:\\ y = 3 \\\\ x=1&:\\ y = 5 \\\\ x=2&:\\ y = 7 \\\\ x=3&:\\ y = 9 \\end{aligned} \\] The plotted set is <b>(0, 3), (1, 5), (2, 7), (3, 9)</b>.", { mode: "construct-graph-points-fallback" });
}, ["Build the points one at a time by substituting x = 0, 1, 2, 3 into the equation.", "The point at x = 0 always has y equal to the start value in the equation."]);

// 14. L3, 8.7, CR 3: a problem in the a(x + b) = c form.
E("u6-solve-group-problem", 6, ["8.7"], 3, "gen", function () {
  var a = ri(3, 6), b = ri(1, 4), x = ri(4, 15), c = a * (x + b);
  var ctx = pick([
    { q: "A school books " + a + " vans for a trip. Each van carries x students and " + b + " teachers. In total, " + c + " people are travelling. How many students are in each van?", unit: "students" },
    { q: "A coach packs " + a + " identical kits. Each kit holds x pucks and " + b + " rolls of tape. In total, the kits hold " + c + " items. How many pucks are in each kit?", unit: "pucks" },
    { q: "A baker fills " + a + " boxes. Each box holds x muffins and " + b + " cookies. In total, the boxes hold " + c + " baked items. How many muffins are in each box?", unit: "muffins" }
  ]);
  var sol = "Let \\(x\\) be the number of " + ctx.unit + " in each group. Each of the " + a + " groups holds \\(x + " + b + "\\) items: \\[ \\begin{aligned} " + fmt(a) + "(x + " + fmt(b) + ") &= " + fmt(c) + " \\\\ " + fmt(a) + "x + " + fmt(a * b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(a * x) + " \\\\ x &= " + fmt(x) + " \\end{aligned} \\] So there are <b>" + fmt(x) + " " + ctx.unit + "</b> in each group.";
  return numq(ctx.q, x, 0.01, sol, { mode: "solve-group-problem", a: a, b: b, unit: ctx.unit });
}, ["Each group holds the unknown amount plus the fixed extra, and there are several identical groups.", "Write the equation with brackets, expand, then subtract and divide."]);

// 15. L3, 7.3, CR 2: extend a graphed discrete relation to a missing ordered pair.
E("u6-graph-extend-pair", 6, ["7.3"], 3, "gen", function () {
  var ctx = pick([
    { xl: "crates", yl: "bottles", thing: "bottles" },
    { xl: "days", yl: "laps", thing: "laps" },
    { xl: "bags", yl: "marbles", thing: "marbles" }
  ]);
  var b = ri(1, 9), m = ri(2, 5), xmax = 4, xq = ri(6, 9);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push([k, b + m * k]);
  var sol = "The points follow a steady pattern with start " + fmt(b) + " and step " + fmt(m) + ", so the relation is \\(y = " + fmt(m) + "x + " + fmt(b) + "\\). Extend it to \\(x = " + xq + "\\): \\[ \\begin{aligned} y &= " + fmt(m) + "(" + xq + ") + " + fmt(b) + " \\\\ &= " + fmt(m * xq) + " + " + fmt(b) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the missing value in the pair \\((" + xq + ", \\ ?)\\) is <b>" + fmt(ans) + "</b>.";
  var q = numq("The graph shows a linear relation as separate points. The x-axis is measured in " + ctx.xl + " and the y-axis in " + ctx.yl + ". The pattern continues in the same way. What is the missing y value in the ordered pair (" + xq + ", ?)?", ans, 0.01, sol,
    { mode: "graph-extend-pair", b: b, m: m, xq: xq, ctx: ctx.xl });
  q.figure = u6graphPts({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, points: pts });
  return q;
}, ["Work out the pattern from the plotted points first: a start value and a steady step.", "Build the equation from the start and step, then substitute the given x value."]);

// 16. L3, 8.3: verify a claimed solution by substitution and judge the conclusion.
E("u6-verify-conclusion", 6, ["8.3"], 3, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var a = ri(2, 8), b = ri(1, 12), xt = ri(2, 12), c = a * xt + b;
    var claim = xt + pick([-3, -2, -1, 1, 2, 3]);
    if (claim <= 0) continue;
    var lhs = a * claim + b;
    var corr = "The check gives a left side of " + fmt(lhs) + ", not " + fmt(c) + ", so x = " + claim + " is not the solution; the solution is x = " + fmt(xt) + ".";
    var ds = u6pick3(corr, [
      { t: "The check gives a left side of " + fmt(lhs) + ", which matches " + fmt(c) + ", so x = " + claim + " is the solution and the claim is correct.", fb: "Compare the two sides: the left side works out to " + fmt(lhs) + " and the right side is " + fmt(c) + ". They are not equal." },
      { t: "The check gives a left side of " + fmt(c) + ", so x = " + claim + " is the solution; no further work is needed.", fb: "That states the right side as the result of the check without doing the substitution. Work out " + fmt(a) + "(" + claim + ") + " + fmt(b) + " first." },
      { t: "Substitution cannot check this equation, so the claim must be accepted as it stands.", fb: "Substitution checks any equation: replace x with the claimed value and compare the two sides." },
      { t: "The check gives a left side of " + fmt(lhs + a) + ", so the solution is x = " + fmt(claim) + " after all, and the claim was right all along.", fb: "Recheck the multiplication: " + fmt(a) + " times " + claim + " is " + fmt(a * claim) + ", and adding " + fmt(b) + " gives " + fmt(lhs) + "." }
    ]);
    if (!ds) continue;
    var sol = "Substitute the claimed value and compare the sides: \\[ \\begin{aligned} " + fmt(a) + "x + " + fmt(b) + " &= " + fmt(a) + "(" + claim + ") + " + fmt(b) + " \\\\ &= " + fmt(lhs) + " \\\\ " + fmt(lhs) + " &\\ne " + fmt(c) + " \\end{aligned} \\] Solving the equation gives \\(x = " + fmt(xt) + "\\), since \\(" + fmt(a) + "(" + fmt(xt) + ") + " + fmt(b) + " = " + fmt(c) + "\\). So the correct conclusion is <b>" + corr + "</b>";
    return mcq("A student claims that \\(x = " + claim + "\\) is the solution of \\(" + fmt(a) + "x + " + fmt(b) + " = " + fmt(c) + "\\) and checks it by substitution. Which conclusion is correct?",
      { t: corr, fb: "Correct. The substituted left side does not match the right side, so the claim fails the check." }, ds, sol,
      { mode: "verify-conclusion", a: a, b: b, claim: claim });
  }
  return mcq("A student claims that \\(x = 5\\) is the solution of \\(3x + 2 = 14\\) and checks it by substitution. Which conclusion is correct?",
    { t: "The check gives a left side of 17, not 14, so x = 5 is not the solution; the solution is x = 4.", fb: "Correct. 3(5) + 2 = 17, which does not equal 14." },
    [{ t: "The check gives a left side of 17, which matches 14, so x = 5 is the solution and the claim is correct.", fb: "17 and 14 are not equal, so the claim fails." }, { t: "The check gives a left side of 14, so x = 5 is the solution; no further work is needed.", fb: "Work out 3(5) + 2: it is 17, not 14." }, { t: "Substitution cannot check this equation, so the claim must be accepted as it stands.", fb: "Substitution checks any equation." }],
    "Substitute: \\[ \\begin{aligned} 3x + 2 &= 3(5) + 2 \\\\ &= 17 \\\\ 17 &\\ne 14 \\end{aligned} \\] So the correct conclusion is <b>x = 5 is not the solution; the solution is x = 4</b>.", { mode: "verify-conclusion-fallback" });
}, ["A check by substitution compares the worked-out left side with the right side.", "Do the substitution yourself first, then judge each conclusion against your numbers."]);

/* ----- bank-u7.js ----- */
// Math 8 Unit 7 Data Analysis and Probability question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 2952 to 3482).
// CRMARKS: u7-apparent-height-ratio=2
// CRMARKS: u7-apply-rule-percent=2
// CRMARKS: u7-fix-the-graph=2
// CRMARKS: u7-name-the-trick=3
// CRMARKS: u7-same-colour-twice=3
// CRMARKS: u7-two-draws-percent=3
// CRMARKS: u7-two-spinners-decimal=3
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
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar graph">';
  var ticks = [base, (base + top) / 2, top];
  for (var i = 0; i < ticks.length; i++) {
    var ty = yb - (ticks[i] - base) / (top - base) * ph;
    out += '<line x1="' + x0 + '" y1="' + fmt(ty, 1) + '" x2="' + (W - 6) + '" y2="' + fmt(ty, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.7"/>';
    out += '<text x="' + (x0 - 5) + '" y="' + fmt(ty, 1) + '" font-size="11" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + fmt(ticks[i]) + '</text>';
  }
  out += '<line x1="' + x0 + '" y1="' + yt + '" x2="' + x0 + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<line x1="' + x0 + '" y1="' + yb + '" x2="' + (W - 6) + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var j = 0; j < n; j++) {
    var bh = (vals[j] - base) / (top - base) * ph;
    var bx = x0 + slot * j + (slot - bw) / 2;
    out += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(yb - bh, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(bh, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + fmt(yb - bh - 10, 1) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + vals[j] + '</text>';
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + (yb + 15) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + labels[j] + '</text>';
  }
  return out + '</svg>';
}

E("u7-same-data-two-graphs", 7, ["11.1"], 1, "var", varset([
  function(){
    return mcq("Sixty students chose a hot lunch. The same results are shown in a circle graph and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The circle graph shows each choice as a share of all 60 lunches, while the bar graph makes the exact count for each choice easier to compare", fb:"Right: a circle graph stresses shares of a whole, and a bar graph stresses exact values category by category."},
      [{t:"The circle graph shows the exact count for each choice, while the bar graph shows each choice as a share of the whole group of students", fb:"That is backwards: shares of a whole belong to the circle graph, and exact counts belong to the bar graph."},
       {t:"The bar graph shows how the choices changed over the whole school year, while the circle graph shows the count for each choice the students made", fb:"Neither graph shows change over time here; the data are one set of lunch choices, not a time series."},
       {t:"The circle graph compares the choices of two different classes in the school, while the bar graph shows only the total for one class on its own", fb:"Both graphs show the same 60 students; comparing two groups would need a double bar graph."}],
      "For the same data, each graph highlights different information: the circle graph shows <b>shares of the whole</b>, while the bar graph shows <b>exact counts that are easy to compare</b>.",
      {mode:"compare-lunch"});
  },
  function(){
    return mcq("The number of ferry crossings each month for a year is shown in a line graph and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The line graph shows the rise and fall pattern across the year clearly, while the bar graph makes it easier to read the count for one single month", fb:"Right: a line graph stresses the pattern over time, and separated bars stress individual monthly values."},
      [{t:"The line graph shows each month as a share of the whole year's crossings, while the bar graph shows the rise and fall pattern across the months of the year", fb:"Shares of a whole belong to a circle graph, and the pattern over time belongs to the line graph."},
       {t:"The bar graph connects the months to prove crossings caused the pattern, while the line graph hides every monthly count of crossings for the whole year", fb:"A line graph does not prove a cause, and its points still sit at the monthly counts."},
       {t:"The line graph compares two ferry routes side by side on the same map, while the bar graph shows only the busier of the two routes", fb:"Both graphs show the same single route; side by side comparison of two routes would need a double bar graph."}],
      "For the same data, the line graph highlights <b>the pattern of change over the year</b>, while the bar graph highlights <b>the value for each individual month</b>.",
      {mode:"compare-ferry"});
  },
  function(){
    return mcq("Club membership is shown in a double bar graph, with one bar for Grade 7 and one for Grade 8 in each club, and in a single bar graph of club totals. Which statement compares the two graphs correctly?",
      {t:"The double bar graph compares the two grades inside each club, while the single bar graph shows club totals but hides how each total splits by grade", fb:"Right: paired bars keep the grade split visible, and a single total bar loses that split."},
      [{t:"The single bar graph compares the two grades inside each club, while the double bar graph shows only club totals and hides how the grades split", fb:"That is backwards: the paired bars carry the grade comparison, and the single bars carry only totals."},
       {t:"The double bar graph shows each club as a share of all the members in both grades, while the single bar graph shows change over time in the clubs", fb:"Shares of a whole belong to a circle graph, and neither of these graphs shows change over time."},
       {t:"The single bar graph is misleading because its totals are invented numbers, while the double bar graph uses the real counts for both grades in the school", fb:"Both graphs use the same real counts; they simply highlight different comparisons."}],
      "For the same data, the double bar graph highlights <b>the Grade 7 and Grade 8 comparison inside each club</b>, while the single bar graph highlights <b>club totals only</b>.",
      {mode:"compare-clubs"});
  },
  function(){
    return mcq("Books borrowed in a week are shown in a pictograph, where one book symbol stands for 10 books, and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The pictograph catches the eye and gives a quick sense of size, while the bar graph gives exact values more easily when counts are not multiples of 10", fb:"Right: pictures are inviting but force part symbols, while a scaled bar axis reads exact values cleanly."},
      [{t:"The pictograph gives exact values more easily for every class in the school, while the bar graph can only show rough sizes for each of the classes", fb:"That is backwards: part symbols make pictograph values rough, and the bar axis gives the exact values."},
       {t:"The bar graph shows each class as a share of all the books borrowed in the week, while the pictograph shows how borrowing changed over the days of the week", fb:"Shares of a whole belong to a circle graph, and neither graph here is built to show change over time."},
       {t:"The pictograph compares two different weeks side by side in the library, while the bar graph shows only the slower of the two weeks", fb:"Both graphs show the same week; side by side comparison would need a double bar graph."}],
      "For the same data, the pictograph highlights <b>a quick, eye catching sense of size</b>, while the bar graph highlights <b>exact values</b>.",
      {mode:"compare-books"});
  }
]), ["Ask what each graph is built to stress: shares of a whole, exact values, change over time, or a comparison between groups.", "Match each graph type to its strength first, then check the statement against both halves."]);

E("u7-choose-graph-basic", 7, ["11.3"], 1, "var", varset([
  function(){
    return mcq("A class records the outdoor temperature every hour during one school day and wants to show how it changed. Which graph is the best choice?",
      {t:"Line graph, because the data show change over time", fb:"Right: points joined in time order make rises and falls easy to follow."},
      [{t:"Circle graph, because the data show change over time", fb:"A circle graph shows shares of a whole, not how a value moves from hour to hour."},
       {t:"Pictograph, because the data show change over time", fb:"A pictograph compares amounts with pictures; it does not trace change over time well."},
       {t:"Double bar graph, because the data show change over time", fb:"A double bar graph compares two groups; there is only one temperature record here."}],
      "Data collected over time are shown best with a <b>line graph</b>, because the joined points display the change directly.",
      {mode:"choose-temperature"});
  },
  function(){
    return mcq("A student wants to show how her 20 dollars of allowance is split among snacks, savings and games. Which graph is the best choice?",
      {t:"Circle graph, because the parts add up to one whole amount of money", fb:"Right: each slice is a share of the same 20 dollars, which is what a circle graph shows."},
      [{t:"Line graph, because the parts add up to one whole amount of money", fb:"A line graph shows change over time; nothing here changes over time."},
       {t:"Bar graph, because the parts add up to one whole amount of money", fb:"A bar graph compares separate amounts well, but shares of one whole are the circle graph strength."},
       {t:"Pictograph, because the parts add up to one whole amount of money", fb:"A pictograph compares counts with pictures; it does not show shares of a whole clearly."}],
      "When the parts make up one whole, a <b>circle graph</b> is the best choice, because each slice shows a share of the 20 dollars.",
      {mode:"choose-allowance"});
  },
  function(){
    return mcq("A teacher wants to compare how many students joined each of five different lunch clubs. Which graph is the best choice?",
      {t:"Bar graph, because separate categories are being compared by count", fb:"Right: one bar per club makes the counts easy to compare at a glance."},
      [{t:"Circle graph, because separate categories are being compared by count", fb:"A circle graph stresses shares of a whole; the teacher asked for a comparison of counts."},
       {t:"Line graph, because separate categories are being compared by count", fb:"A line graph shows change over time; club categories have no time order."},
       {t:"Double bar graph, because separate categories are being compared by count", fb:"A double bar graph needs two groups to compare; only one count per club is given."}],
      "Comparing counts across separate categories is the job of a <b>bar graph</b>, with one bar per club.",
      {mode:"choose-clubs"});
  },
  function(){
    return mcq("A coach wants to compare how many Grade 7 and Grade 8 students play each of four sports. Which graph is the best choice?",
      {t:"Double bar graph, because two groups are compared inside every category", fb:"Right: paired bars let the reader compare the grades sport by sport."},
      [{t:"Circle graph, because two groups are compared inside every category", fb:"A circle graph shows shares of one whole; it cannot hold two groups for each sport."},
       {t:"Line graph, because two groups are compared inside every category", fb:"A line graph shows change over time; sports categories have no time order."},
       {t:"Pictograph, because two groups are compared inside every category", fb:"A pictograph with two symbol sets gets confusing; paired bars keep the comparison clean."}],
      "Comparing two groups inside each category is the job of a <b>double bar graph</b>.",
      {mode:"choose-sports"});
  },
  function(){
    return mcq("A librarian makes a poster for young children showing how many picture books, comics and novels were borrowed, and wants the amounts shown with pictures. Which graph is the best choice?",
      {t:"Pictograph, because picture symbols make amounts friendly and quick to grasp", fb:"Right: symbols suit a young audience and give an instant sense of which amount is biggest."},
      [{t:"Line graph, because picture symbols make amounts friendly and quick to grasp", fb:"A line graph shows change over time; these are three separate categories."},
       {t:"Circle graph, because picture symbols make amounts friendly and quick to grasp", fb:"A circle graph shows shares of a whole with slices, not with picture symbols."},
       {t:"Double bar graph, because picture symbols make amounts friendly and quick to grasp", fb:"A double bar graph compares two groups; only one set of amounts is shown."}],
      "Amounts shown with picture symbols for a young audience call for a <b>pictograph</b>.",
      {mode:"choose-poster"});
  }
]), ["Decide what the data are doing first: changing over time, splitting a whole, comparing categories, or comparing two groups.", "Match that job to the graph built for it: line, circle, bar, double bar, or pictograph."]);

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
  var colour = pick(["red", "blue", "green", "gold", "purple", "orange"]);
  var side = pick(["heads", "tails"]);
  var ev1 = cfg.useSpinner
    ? "A spinner has " + cfg.S + " equal sections and " + cfg.F + " of them are " + colour + ". The spinner is spun and a fair die is rolled."
    : "A coin is tossed and a fair die is rolled.";
  var ev1name = cfg.useSpinner ? ("landing on " + colour) : side;
  var prompt = ev1 + " What is the probability of " + ev1name + " and rolling one of the numbers " + cfg.nums.join(", ") + "?";
  var f1 = cfg.useSpinner ? u7frac(cfg.F, cfg.S) : "\\(\\frac{1}{2}\\)";
  var sol = "For independent events, multiply the two probabilities: \\[ \\begin{aligned} P &= " + (cfg.useSpinner ? FR(cfg.F, cfg.S) : FR(1, 2)) + " \\times " + FR(cfg.G, 6) + " \\\\ &= " + FR(cfg.F * cfg.G, cfg.S * 6) + " \\\\ &= " + FR(cfg.p[0], cfg.p[1]) + " \\end{aligned} \\] So the probability is <b>\\(" + FR(cfg.p[0], cfg.p[1]) + "\\)</b>.";
  return mcq(prompt,
    { t: u7frac(cfg.p[0], cfg.p[1]), fb: "Right: the two events are independent, so their probabilities multiply and the result is reduced." },
    [{ t: u7frac(F2A(cfg), F2B(cfg)), fb: "That adds the two probabilities; independent events that must both happen use multiplication, not addition." },
     { t: f1, fb: "That is the probability of the first event only; the die roll must be included as well." },
     { t: u7frac(cfg.G, 6), fb: "That is the probability of the die event only; the first event must be included as well." }],
    sol, { mode: "product-intro", S: cfg.S, F: cfg.F, G: cfg.G });
  function F2A(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[0]; }
  function F2B(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[1]; }
}, ["Independent events do not affect each other, so the probability that both happen is a product.", "Find the probability of each event on its own first, then multiply the two fractions."]);

E("u7-advantages-disadvantages", 7, ["11.2"], 1, "var", varset([
  function(){
    return mcq("A manager needs the exact number of tickets sold in each of six seat sections, so she can compare sections precisely. Which statement gives an advantage and a disadvantage of using a circle graph for this data?",
      {t:"Advantage: it shows each section share of total sales at a glance. Disadvantage: exact counts are hard to read from slice sizes", fb:"Right: slices stress shares, but precise counts are exactly what slices show poorly."},
      [{t:"Advantage: it shows the exact count in each section clearly on the graph. Disadvantage: it cannot show shares of total sales at all", fb:"Both halves are reversed: slices are weak on exact counts and strong on shares."},
       {t:"Advantage: it shows how sales changed over the whole season of selling. Disadvantage: it uses too many colours for the six sections", fb:"A circle graph does not show change over time at all, so the stated advantage is false."},
       {t:"Advantage: it compares two different seasons side by side in one graph. Disadvantage: exact counts are hard to read from slice sizes", fb:"One circle graph holds one set of shares; comparing two seasons would need two graphs or paired bars."}],
      "A circle graph is strong on <b>shares of a whole</b> and weak on <b>exact values</b>, so it suits this ticket data poorly when precise counts matter.",
      {mode:"adv-circle"});
  },
  function(){
    return mcq("Classes record recycling counts of 37, 52 and 48 items for a pictograph where one symbol stands for 10 items. Which statement gives an advantage and a disadvantage of the pictograph here?",
      {t:"Advantage: the symbols are eye catching and easy for young students to grasp. Disadvantage: counts like 37 need part symbols, so exact values are hard to show", fb:"Right: pictures invite readers in, but values between multiples of 10 force awkward part symbols."},
      [{t:"Advantage: it gives exact values for every count in each of the classes. Disadvantage: the symbols are dull and hard for young students to grasp at first glance", fb:"Both halves are reversed: part symbols make values inexact, and symbols are the inviting part."},
       {t:"Advantage: it shows each class share of all the recycling in the school. Disadvantage: part symbols are needed whenever a count like 37 has to be shown", fb:"A pictograph compares amounts with symbols; shares of a whole are the circle graph job."},
       {t:"Advantage: the symbols are eye catching for every reader of the school poster. Disadvantage: it cannot be used at all when there are only three categories to show", fb:"Three categories are fine in a pictograph; the real weakness is part symbols for in-between counts."}],
      "A pictograph is strong on <b>visual appeal</b> and weak on <b>exact values that fall between symbol steps</b>.",
      {mode:"adv-pictograph"});
  },
  function(){
    return mcq("A student uses a line graph to display favourite ice cream flavours in a class: chocolate, vanilla, strawberry and mint. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: the points are quick to plot in order. Disadvantage: joining the points suggests a change from flavour to flavour that does not exist", fb:"Right: flavours have no time order, so the joined line invents a trend between unrelated categories."},
      [{t:"Advantage: it shows each flavour share of the whole class clearly. Disadvantage: joining the points suggests a change that does not really exist", fb:"Shares of a whole are shown by a circle graph, not by points on a line graph."},
       {t:"Advantage: the points are quick to plot in order along the axis. Disadvantage: a line graph can never be drawn for category data of any kind at all", fb:"A line graph can be drawn, but it is a poor choice here because the line suggests a false trend."},
       {t:"Advantage: it compares two classes flavour by flavour in the survey. Disadvantage: the axis needs a scale for the counts in each class as well", fb:"Only one class is shown, so there is no two-group comparison in this graph."}],
      "A line graph is built for <b>change over time</b>; using it on unrelated categories creates a <b>false suggestion of a trend</b>.",
      {mode:"adv-line"});
  },
  function(){
    return mcq("A librarian uses a double bar graph to compare book loans this year and last year across eight genres. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: the two years sit side by side inside each genre, so changes are easy to spot. Disadvantage: with eight genres the graph gets crowded and harder to read", fb:"Right: paired bars excel at two-group comparisons, and many categories make the pairs cluttered."},
      [{t:"Advantage: it shows each genre share of all the loans in the library. Disadvantage: with eight genres the graph gets crowded and much harder to read", fb:"Paired bars compare counts; shares of a whole are the circle graph job."},
       {t:"Advantage: the two years sit side by side in each genre on the graph. Disadvantage: a double bar graph cannot show counts, only shares of the whole, never the actual counts", fb:"Paired bars show counts on a scale like any bar graph; the disadvantage given here is false."},
       {t:"Advantage: it traces loans continuously across the two years of records. Disadvantage: genres have no time order, so nothing can be traced across the years", fb:"Bars do not trace anything continuously; the side by side comparison is the advantage."}],
      "A double bar graph is strong on <b>comparing two groups inside each category</b> and weak when <b>many categories make it crowded</b>.",
      {mode:"adv-doublebar"});
  },
  function(){
    return mcq("A weather club uses a bar graph to display monthly rainfall over three full years, hoping readers will see the long term pattern. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: each month total can be read exactly from the scale. Disadvantage: 36 separate bars make the overall pattern harder to follow than a line would", fb:"Right: bars give exact monthly values, but a long run of bars hides the flow of the pattern."},
      [{t:"Advantage: the bars connect into a smooth trend across the three years. Disadvantage: monthly totals cannot be read from the scale of the graph at all", fb:"Both halves are wrong: bars stay separate, and their totals read off the scale directly."},
       {t:"Advantage: each month share of the yearly rain is clear on the graph. Disadvantage: 36 separate bars make the overall pattern hard to follow at a glance", fb:"Shares of a whole belong to a circle graph; these bars show monthly amounts."},
       {t:"Advantage: each month total reads exactly from the scale on the axis. Disadvantage: bar graphs are not allowed to show more than one year of data on one graph", fb:"Bar graphs may show any number of months; the real weakness is pattern reading over a long run."}],
      "A bar graph is strong on <b>exact values</b> and weak on <b>showing a pattern across a long time run</b>, where a line graph works better.",
      {mode:"adv-bar-rain"});
  }
]), ["Judge the graph against the job: what must the reader do with this data, exactly compare, see shares, or follow a pattern?", "Check both halves of each statement; a correct answer needs a true advantage and a true disadvantage."]);

E("u7-misleading-format", 7, ["11.4"], 1, "var", varset([
  function(){
    var q = mcq("An arena poster uses this bar graph to claim the South rink is far busier than the North rink. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The vertical axis starts at 80 instead of 0, so a small difference in attendance looks large", fb:"Right: both bars are measured from 80, so the visible heights exaggerate the gap between 92 and 96."},
      [{t:"The two bars have different widths, so the wider bar looks more important than the other bar", fb:"The bars have the same width; the distortion comes from where the axis starts."},
       {t:"The categories are listed in the wrong order on the axis, so the smaller value comes first in the graph", fb:"Category order does not distort size here; the axis starting at 80 does."},
       {t:"The graph has no title at the top, so readers cannot tell what is being measured in the graph", fb:"A title would help, but the values still read clearly; the misleading feature is the axis starting at 80."}],
      "When a vertical axis starts above zero, bar heights no longer match the values. Starting at <b>80</b> makes 96 look far bigger than 92, which is the misleading feature.",
      {mode:"mislead-truncated"});
    q.figure = u7bars(["North", "South"], [92, 96], 80, 100);
    return q;
  },
  function(){
    return mcq("A line graph of daily bus riders marks its vertical axis 0, 10, 15, then 40 riders. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The intervals on the vertical axis are uneven, so equal steps on the page stand for different amounts", fb:"Right: jumps of 10, 5 and 25 in one axis stretch some changes and squeeze others."},
      [{t:"The line is drawn in a very dark colour, so readers notice the highest point on the line first", fb:"Line colour does not change the values; the uneven spacing of the scale does."},
       {t:"The graph plots days along the bottom axis, so the weekends look less important than the weekdays", fb:"Plotting days in order is normal for change over time; the scale spacing is the problem."},
       {t:"The highest point is labelled with its value, so readers may think it is the average for the week", fb:"Labelling a point does not distort the scale; uneven intervals do."}],
      "A scale must use equal steps. <b>Uneven intervals</b> on the axis stretch and squeeze changes, so the picture misrepresents the data.",
      {mode:"mislead-intervals"});
  },
  function(){
    return mcq("A charity draws its spending shares as a 3-D circle graph, with the front slices tilted toward the reader. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The 3-D effect makes the front slices look bigger than slices of the same share at the back", fb:"Right: tilting and depth add area that has nothing to do with the share each slice represents."},
      [{t:"The slices are arranged from largest to smallest, so the first slice gets the most attention", fb:"Ordering slices is a normal choice and does not change their relative sizes."},
       {t:"The graph uses percents instead of dollar amounts, so the total amount of spending is hidden", fb:"Percents are a fair way to show shares; the visual distortion comes from the 3-D tilt."},
       {t:"The charity name is printed above the graph, so readers trust the slices too quickly at first", fb:"Trust in the source is not a format distortion; the 3-D effect changes how big slices look."}],
      "In a circle graph, slice area must match share. A <b>3-D effect</b> adds fake area to the front slices, so readers misjudge the shares.",
      {mode:"mislead-3d"});
  },
  function(){
    return mcq("In a pictograph of pets owned, the symbol for dogs is drawn twice as tall and twice as wide as the symbol for cats, and one symbol stands for 10 pets in both rows. Which feature may lead readers to misinterpret the data?",
      {t:"The dog symbols cover about four times the area, so dogs look far more numerous than the counts say", fb:"Right: doubling height and width multiplies area by four, even though one symbol still means 10 pets."},
      [{t:"The rows are stacked vertically on the page, so the top row of symbols is read first by everyone", fb:"Reading order does not change the amounts; symbol area does the distorting here."},
       {t:"One symbol stands for 10 pets in each row, so small counts of pets need part symbols to be shown", fb:"Part symbols are a real pictograph weakness, but the distortion here is the unequal symbol size."},
       {t:"The graph lists dogs before cats in its rows, so readers favour the first category they come to", fb:"Category order does not inflate a count; the oversized symbols do."}],
      "Pictograph symbols must all be the same size. Making one symbol <b>larger in both directions</b> multiplies its area and misrepresents the count.",
      {mode:"mislead-symbols"});
  },
  function(){
    var q = mcq("A school poster uses this bar graph to suggest the bake sale grew much faster than the book fair. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The vertical axis starts at 40 instead of 0, so the gap between the two totals looks much bigger than it is", fb:"Right: measured from 40, the visible bar heights are 14 and 22, a much bigger ratio than 54 to 62."},
      [{t:"The book fair bar is shaded in a darker colour, so readers think it earned more money than the other events shown", fb:"Both bars use the same shading; the distortion comes from the axis starting at 40."},
       {t:"The totals are written above each of the bars, so readers skip the axis entirely when they read it", fb:"Value labels actually help accuracy; the misleading feature is the truncated axis."},
       {t:"Only two events are shown on the whole poster, so readers cannot compare them fairly with each other", fb:"Two categories compare fairly on a proper axis; starting the axis at 40 is the distortion."}],
      "Bar heights must be measured from zero to match values. An axis starting at <b>40</b> exaggerates the difference between 54 and 62.",
      {mode:"mislead-truncated2"});
    q.figure = u7bars(["Bake sale", "Book fair"], [54, 62], 40, 70);
    return q;
  }
]), ["Look at how the picture is built: where the axis starts, how its steps are spaced, and whether size effects add area.", "Compare the visual size of the bars or slices with the numbers they stand for; a mismatch names the flaw."]);

E("u7-name-the-trick", 7, ["11.5"], 1, "var", varset([
  function(){
    return textq("A bar graph shows quiz averages of 48, 52 and 55 for three classes. Its vertical axis starts at 40, so the bar for 55 towers over the bar for 48. Name the formatting choice that misrepresents the data.",
      ["truncated axis", "truncated vertical axis", "axis truncated", "vertical axis does not start at zero", "axis does not start at zero", "axis starts at 40", "axis starts above zero", "broken axis", "not starting at zero", "starting the axis at 40", "axis does not start at 0", "axis starts at a nonzero value"],
      "The bars are measured from 40 instead of from zero, so their heights no longer match the averages. The formatting choice is a <b>truncated axis (an axis that does not start at zero)</b>.",
      {mode:"trick-axis"});
  },
  function(){
    return textq("A line graph of evening temperatures marks its vertical axis 0, 5, 20 and 45 degrees, so a small rise looks steep. Name the formatting choice that misrepresents the data.",
      ["uneven intervals", "unequal intervals", "inconsistent intervals", "uneven scale", "unequal scale", "inconsistent scale", "intervals are uneven", "the scale is uneven", "uneven axis intervals", "non-uniform scale", "nonuniform scale"],
      "Equal steps on the page stand for jumps of 5, 15 and 25 degrees, so changes are stretched unevenly. The formatting choice is <b>uneven intervals</b> on the axis.",
      {mode:"trick-intervals"});
  },
  function(){
    return textq("A town draws its budget shares as a 3-D circle graph. The front slice, for parks, looks much larger than a back slice with the same share. Name the formatting choice that misrepresents the data.",
      ["3-d effect", "3d effect", "three-dimensional effect", "three dimensional effect", "3-d pie chart", "3d pie chart", "using 3-d", "using 3d", "3-d graph", "3d graph"],
      "Tilting the graph adds depth and area to the front slices that has nothing to do with their shares. The formatting choice is the <b>3-D effect</b>.",
      {mode:"trick-3d"});
  },
  function(){
    return textq("A pictograph shows lunches sold, with one symbol standing for 10 lunches in every row. The symbols in the pizza row are drawn twice as tall and twice as wide as the symbols in the soup row. Name the formatting choice that misrepresents the data.",
      ["different sized symbols", "different symbol sizes", "symbols different sizes", "unequal symbol sizes", "icons different sizes", "different sized icons", "picture sizes", "unequal picture sizes", "different sized pictures", "symbols are different sizes", "visual representation", "larger symbols"],
      "Each symbol still means 10 lunches, but the pizza symbols cover about four times the area. The formatting choice is <b>using symbols of different sizes</b>.",
      {mode:"trick-symbols"});
  },
  function(){
    return textq("A gym advertises with a line graph of new members that shows only the three busiest months of the year, when membership spiked, and leaves out the other nine months. Name the formatting choice that misrepresents the data.",
      ["cherry-picked data", "cherry picked data", "cherry-picking", "cherry picking", "only showing part of the data", "showing only part of the data", "selective data", "selecting only the best months", "omitting data", "leaving out data", "only showing the best months", "partial data", "showing a selected range"],
      "The graph hides the nine quieter months, so the spike looks like the whole story. The formatting choice is <b>cherry-picked data (showing only a selected part of the data)</b>.",
      {mode:"trick-cherry"});
  }
]), ["Name the built-in feature doing the damage: axis start, axis spacing, depth effects, symbol size, or missing data.", "Describe the feature in plain words; a short name for the feature is enough."]);

E("u7-false-conclusion", 7, ["11.6"], 2, "var", varset([
  function(){
    return mcq("Library loans were: Monday 120, Tuesday 135, Wednesday 128, Thursday 150, Friday 142. Which conclusion goes against this data?",
      {t:"Loans rose every single day of the week", fb:"Right: loans fell from Tuesday 135 to Wednesday 128, so they did not rise every day."},
      [{t:"Thursday had the most loans of the week", fb:"That matches the data: 150 on Thursday is the largest value listed."},
       {t:"Friday loans were higher than Monday loans", fb:"That matches the data: 142 on Friday is greater than 120 on Monday."},
       {t:"Wednesday loans were lower than Tuesday loans", fb:"That matches the data: 128 is less than 135, so this conclusion is consistent."}],
      "Check each claim against every value. Loans dipped on Wednesday, so the conclusion that goes against the data is <b>loans rose every single day</b>.",
      {mode:"false-loans"});
  },
  function(){
    return mcq("A circle graph shows how students get to school: bus 40%, walk 35%, car 25%. Which conclusion goes against this data?",
      {t:"Most students travel to school by bus", fb:"Right: 40% is the largest share, but most means more than half, and 40% is under half."},
      [{t:"More students ride the bus than walk", fb:"That matches the data: 40% is greater than 35%."},
       {t:"Walking and car rides together account for 60% of students", fb:"That matches the data: 35% plus 25% equals 60%."},
       {t:"The car is the least common way listed to get to school", fb:"That matches the data: 25% is the smallest share listed."}],
      "The bus share is the largest but it is not a majority. The conclusion that goes against the data is <b>most students travel by bus</b>, because 40% is less than half.",
      {mode:"false-bus"});
  },
  function(){
    return mcq("Rainfall at a weather station was 30 mm in April, 22 mm in May and 18 mm in June. Which conclusion goes against this data?",
      {t:"Rainfall increased steadily through the spring", fb:"Right: the values fall from 30 to 22 to 18, so rainfall decreased, not increased."},
      [{t:"April was the wettest of the three months", fb:"That matches the data: 30 mm in April is the largest value."},
       {t:"June rainfall was 12 mm less than April rainfall", fb:"That matches the data: 30 minus 18 equals 12."},
       {t:"Total rainfall over the three months was 70 mm", fb:"That matches the data: 30 plus 22 plus 18 equals 70."}],
      "The amounts drop month by month. The conclusion that goes against the data is <b>rainfall increased steadily</b>.",
      {mode:"false-rain"});
  },
  function(){
    return mcq("A double bar graph shows club members: chess has 18 Grade 7 and 12 Grade 8 students; robotics has 10 Grade 7 and 16 Grade 8 students. Which conclusion goes against this data?",
      {t:"Grade 8 has more members than Grade 7 in both clubs", fb:"Right: in chess, Grade 8 has 12, which is fewer than Grade 7 with 18, so the claim fails for chess."},
      [{t:"Chess has more Grade 7 members than robotics has Grade 7 members", fb:"That matches the data: 18 is greater than 10."},
       {t:"Robotics has more Grade 8 members than chess has Grade 8 members", fb:"That matches the data: 16 is greater than 12."},
       {t:"The two clubs have 56 members in total between them", fb:"That matches the data: 18 plus 12 plus 10 plus 16 equals 56."}],
      "A claim about both clubs must hold in each club. Chess breaks it, so the conclusion that goes against the data is <b>Grade 8 has more members in both clubs</b>.",
      {mode:"false-clubs"});
  },
  function(){
    return mcq("Four students report practice time and quiz score: Ana practised 3 hours and scored 70, Ben practised 1 hour and scored 78, Cora practised 2 hours and scored 74, Dan practised 4 hours and scored 82. Which conclusion goes against this data?",
      {t:"More practice always gives a higher score", fb:"Right: Ben practised the least yet outscored Ana and Cora, so more practice did not always mean a higher score here."},
      [{t:"Dan practised the most and earned the highest score", fb:"That matches the data: 4 hours and 82 are both the largest values."},
       {t:"Ben scored higher than Ana even though he practised less", fb:"That matches the data directly: 78 beats 70 with 1 hour against 3 hours."},
       {t:"The four scores range from 70 to 82", fb:"That matches the data: the lowest score is 70 and the highest is 82."}],
      "One counterexample breaks an always claim. Ben practised least and still beat two classmates, so the conclusion that goes against the data is <b>more practice always gives a higher score</b>.",
      {mode:"false-practice"});
  }
]), ["Test each conclusion against every number given, not just the first ones you notice.", "Watch for strong words like most, always and every; they need more than half, or every case, to hold."]);

E("u7-fix-the-graph", 7, ["11.4"], 1, "var", varset([
  function(){
    return textq("A bar graph of team points starts its vertical axis at 60, making one team look far ahead of the others. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["start the axis at zero", "start the vertical axis at zero", "start the axis at 0", "begin the axis at zero", "start at zero", "start the axis from zero", "use an axis starting at zero", "start axis at zero", "make the axis start at zero", "start the scale at zero"],
      "Bar heights only match values when measured from zero. The fix is to <b>start the axis at zero</b>.",
      {mode:"fix-axis"});
  },
  function(){
    return textq("A line graph of ticket sales uses axis steps of 0, 10, 15 and 40, so one small jump looks huge. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["use equal intervals", "use even intervals", "use consistent intervals", "make the intervals equal", "use the same interval size", "equal intervals", "use equal steps", "make the scale even", "use a consistent scale", "space the intervals evenly"],
      "Every step on an axis must stand for the same amount. The fix is to <b>use equal intervals</b>.",
      {mode:"fix-intervals"});
  },
  function(){
    return textq("A 3-D circle graph makes the front slice of a budget look larger than an equal slice at the back. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["use a flat graph", "use a flat circle graph", "use a flat pie chart", "use a 2-d graph", "use a 2d graph", "use a two-dimensional graph", "remove the 3-d effect", "remove the 3d effect", "draw it flat", "use 2-d", "use 2d", "make it flat", "use a flat chart"],
      "Depth adds area that does not belong to any share. The fix is to <b>use a flat (2-D) circle graph</b>.",
      {mode:"fix-3d"});
  },
  function(){
    return textq("A sales graph shows only the three holiday months, when sales spiked, and hides the rest of the year. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["show all the data", "show all months", "include all months", "show the whole year", "show the full year", "use the full data set", "show all of the data", "include all the data", "show the complete data", "show every month"],
      "A selected slice of the year tells only the spiking part of the story. The fix is to <b>show all the data (the whole year)</b>.",
      {mode:"fix-range"});
  }
]), ["Think of the one repair that removes the distortion you can see in the description.", "State the repair as a short action phrase, such as what the axis or the data range should become."]);

E("u7-context-for-probability", 7, ["12.2"], 2, "var", varset([
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{12}\\)?",
      {t:"Toss a coin and roll a die; getting heads and a 6", fb:"Right: \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), so this context matches the value."},
      [{t:"Roll two dice; getting a 6 on both dice", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."},
       {t:"Spin a 4-section spinner and toss a coin; landing on red, 1 of the 4 sections, and heads", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."}],
      "Multiply in each context and compare. Only heads and a 6 gives \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), so the matching context is <b>tossing a coin and rolling a die, getting heads and a 6</b>.",
      {mode:"context-12th"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{4}\\)?",
      {t:"Toss two coins; getting tails on both coins", fb:"Right: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), so this context matches the value."},
      [{t:"Spin an 8-section spinner and toss a coin; landing on blue, 2 of the 8 sections, and heads", fb:"That gives \\(\\frac{2}{8} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."},
       {t:"Roll a die and toss a coin; rolling a number less than 5 and getting heads", fb:"That gives \\(\\frac{4}{6} \\times \\frac{1}{2} = \\frac{1}{3}\\), not the stated value."},
       {t:"Draw a card from 4 equal letter cards twice with replacement; getting the letter A both times", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}\\), not the stated value."}],
      "Multiply in each context and compare. Only two tails gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), so the matching context is <b>tossing two coins and getting tails on both</b>.",
      {mode:"context-quarter"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{3}{20}\\)?",
      {t:"Spin a 10-section spinner and toss a coin; landing on red, 3 of the 10 sections, and heads", fb:"Right: \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), so this context matches the value."},
      [{t:"Spin a 5-section spinner and toss a coin; landing on red, 3 of the 5 sections, and heads", fb:"That gives \\(\\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}\\), not the stated value."},
       {t:"Spin a 10-section spinner and roll a die; landing on red, 3 of the 10 sections, and rolling a 6", fb:"That gives \\(\\frac{3}{10} \\times \\frac{1}{6} = \\frac{1}{20}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."}],
      "Multiply in each context and compare. Only red on the 10-section spinner with heads gives \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), so that is the matching context.",
      {mode:"context-320"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{9}\\)?",
      {t:"Spin a 3-section spinner twice; landing on the star section both times", fb:"Right: \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), so this context matches the value."},
      [{t:"Spin a 3-section spinner and toss a coin; landing on the star section and heads", fb:"That gives \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), not the stated value."},
       {t:"Spin a 6-section spinner twice; landing on red, 1 of the 6 sections, both times", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."}],
      "Multiply in each context and compare. Only the star section twice gives \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), so that is the matching context.",
      {mode:"context-ninth"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{6}\\)?",
      {t:"Spin a 3-section spinner and toss a coin; landing on blue, 1 of the 3 sections, and tails", fb:"Right: \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), so this context matches the value."},
      [{t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."},
       {t:"Spin a 4-section spinner and toss a coin; landing on blue, 1 of the 4 sections, and tails", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."},
       {t:"Roll a die and spin a 4-section spinner; rolling a 6 and landing on blue, 1 of the 4 sections", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{4} = \\frac{1}{24}\\), not the stated value."}],
      "Multiply in each context and compare. Only blue on the 3-section spinner with tails gives \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), so that is the matching context.",
      {mode:"context-sixth"});
  }
]), ["Work out the probability inside each context; exactly one context will match the stated value.", "For two independent events, multiply the two single probabilities before comparing."]);

E("u7-two-draws-percent", 7, ["12.1"], 1, "gen", function () {
  var triples = [["red", "blue", "green"], ["red", "yellow", "blue"], ["white", "black", "orange"], ["purple", "green", "yellow"], ["blue", "orange", "pink"]];
  var pair = null;
  for (var t = 0; t < 60 && !pair; t++) {
    var ca = ri(2, 5), cb = ri(2, 5);
    if (ca + cb <= 9) pair = [ca, cb];
  }
  if (!pair) pair = [3, 3];
  var cols = pick(triples).slice();
  var item = pick(["marbles", "counters", "beads", "tiles"]);
  var ans = pair[0] * pair[1];
  var third = 10 - pair[0] - pair[1];
  var prompt = "A bag holds " + pair[0] + " " + cols[0] + ", " + pair[1] + " " + cols[1] + " and " + third + " " + cols[2] + " " + item + ". One is drawn, replaced, and another is drawn. What is the probability of drawing " + cols[0] + " first and then " + cols[1] + "? Give your answer as a percent.";
  var sol = "Multiply for independent events, then check by counting outcomes: \\[ \\begin{aligned} P &= " + FR(pair[0], 10) + " \\times " + FR(pair[1], 10) + " \\\\ &= " + FR(ans, 100) + " \\\\ &= " + ans + "\\% \\end{aligned} \\] Counting check: there are \\(10 \\times 10 = 100\\) equally likely ordered pairs, and \\(" + pair[0] + " \\times " + pair[1] + " = " + ans + "\\) of them match, which agrees. So the probability is <b>" + ans + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "two-draws", a: pair[0], b: pair[1] });
}, ["Replacement keeps the bag the same for the second draw, so the two draws are independent.", "Write each draw as a fraction out of 10, multiply, then convert to a percent."]);

E("u7-two-spinners-decimal", 7, ["12.4"], 1, "gen", function () {
  var S1 = pick([4, 5, 10, 20]), S2 = pick([4, 5, 10, 20]);
  var F1 = ri(1, S1 - 1), F2 = ri(1, S2 - 1);
  var c1 = pick(["red", "blue", "green", "gold"]), c2 = pick(["purple", "orange", "white", "black"]);
  if (c2 === c1) c2 = "purple";
  var num = F1 * F2, den = S1 * S2, ans = num / den;
  var prompt = "At a school fair game, one spinner has " + S1 + " equal sections with " + F1 + " coloured " + c1 + ", and a second spinner has " + S2 + " equal sections with " + F2 + " coloured " + c2 + ". Both spinners are spun. What is the probability of landing on " + c1 + " on the first spinner and " + c2 + " on the second? Give your answer as a decimal.";
  var sol = "The spins are independent, so multiply: \\[ \\begin{aligned} P &= " + FR(F1, S1) + " \\times " + FR(F2, S2) + " \\\\ &= " + FR(num, den) + " \\\\ &= " + fmt(ans, 4) + " \\end{aligned} \\] So the probability is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.0001, sol, { mode: "two-spinners", S1: S1, F1: F1, S2: S2, F2: F2 });
}, ["Two spins do not affect each other, so this is a product of two single probabilities.", "Write the probability for each spinner first, then multiply and convert to a decimal."]);

E("u7-apply-rule-percent", 7, ["12.3"], 1, "gen", function () {
  var S = pick([4, 5, 8, 10]);
  var F = ri(1, S - 1);
  var colour = pick(["red", "blue", "green", "gold", "purple", "orange"]);
  var side = pick(["heads", "tails"]);
  var ans = F / S * 50;
  var prompt = "A coin is tossed and a spinner with " + S + " equal sections, " + F + " of them " + colour + ", is spun. Using the rule for independent events, what is the probability of getting " + side + " and landing on " + colour + "? Give your answer as a percent.";
  var r = u7red(F, S * 2);
  var sol = "Apply the multiplication rule for independent events: \\[ \\begin{aligned} P &= " + FR(1, 2) + " \\times " + FR(F, S) + " \\\\ &= " + FR(r[0], r[1]) + " \\\\ &= " + fmt(ans) + "\\% \\end{aligned} \\] So the probability is <b>" + fmt(ans) + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "apply-rule", S: S, F: F });
}, ["The rule for independent events says multiply the separate probabilities.", "The coin contributes one half; multiply it by the spinner fraction and convert to a percent."]);

E("u7-same-colour-twice", 7, ["12.4", "12.1"], 3, "gen", function () {
  var triples = [["red", "blue", "green"], ["red", "yellow", "blue"], ["white", "black", "orange"], ["purple", "green", "yellow"], ["blue", "orange", "pink"]];
  var counts = null;
  for (var t = 0; t < 80 && !counts; t++) {
    var a = ri(1, 8), b = ri(1, 9 - a);
    var c = 10 - a - b;
    if (c >= 1) counts = [a, b, c];
  }
  if (!counts) counts = [4, 3, 3];
  var cols = pick(triples).slice();
  var item = pick(["marbles", "counters", "beads"]);
  var ans = counts[0] * counts[0] + counts[1] * counts[1] + counts[2] * counts[2];
  var prompt = "A bag holds " + counts[0] + " " + cols[0] + ", " + counts[1] + " " + cols[1] + " and " + counts[2] + " " + cols[2] + " " + item + ". One is drawn, replaced, and another is drawn. What is the probability that the two drawn " + item + " are the same colour as each other? Give your answer as a percent.";
  var sol = "Same colour can happen three ways, and the draws are independent: \\[ \\begin{aligned} P &= " + FR(counts[0], 10) + " \\times " + FR(counts[0], 10) + " + " + FR(counts[1], 10) + " \\times " + FR(counts[1], 10) + " + " + FR(counts[2], 10) + " \\times " + FR(counts[2], 10) + " \\\\ &= " + FR(counts[0] * counts[0], 100) + " + " + FR(counts[1] * counts[1], 100) + " + " + FR(counts[2] * counts[2], 100) + " \\\\ &= " + FR(ans, 100) + " = " + ans + "\\% \\end{aligned} \\] Counting check: of the 100 ordered pairs, \\(" + counts[0] * counts[0] + " + " + counts[1] * counts[1] + " + " + counts[2] * counts[2] + " = " + ans + "\\) match in colour. So the probability is <b>" + ans + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "same-colour", counts: counts.join("-") });
}, ["Same colour is not one event; list every colour that could match on both draws.", "For each colour, multiply its fraction by itself, then add the three results."]);

E("u7-apparent-height-ratio", 7, ["11.4"], 3, "gen", function () {
  var contexts = [
    { name: "quiz averages", labels: ["Class A", "Class B"], bases: [70, 80], scale: 1, cap: 100, unit: "points" },
    { name: "ferry passengers on two Saturdays (in hundreds)", labels: ["First Sat", "Second Sat"], bases: [300, 400], scale: 20, cap: 700, unit: "passengers" },
    { name: "pairs of shoes sold in two weeks", labels: ["Week 1", "Week 2"], bases: [40, 50], scale: 2, cap: 120, unit: "pairs" },
    { name: "laps swum by two teams", labels: ["Team Red", "Team Blue"], bases: [60, 80], scale: 2, cap: 160, unit: "laps" }
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
  var prompt = "A poster graphs " + cfg.ctx.name + ". The vertical axis starts at " + cfg.B + " instead of 0. The values are " + cfg.v1 + " and " + cfg.v2 + " " + cfg.ctx.unit + ". Judging only by the heights of the bars in the graph, how many times as tall does the taller bar look compared with the shorter bar? Give your answer as a decimal.";
  var sol = "Bar heights are measured from the axis start, not from the values themselves: \\[ \\begin{aligned} \\text{shorter height} &= " + cfg.v1 + " - " + cfg.B + " = " + (cfg.v1 - cfg.B) + " \\\\ \\text{taller height} &= " + cfg.v2 + " - " + cfg.B + " = " + (cfg.v2 - cfg.B) + " \\\\ \\text{apparent ratio} &= " + FR(cfg.v2 - cfg.B, cfg.v1 - cfg.B) + " = " + fmt(cfg.r) + " \\end{aligned} \\] The actual values are nearly equal, but the taller bar looks <b>" + fmt(cfg.r) + " times</b> as tall.";
  var q = numq(prompt, cfg.r, 0.01, sol, { mode: "apparent-ratio", B: cfg.B, v1: cfg.v1, v2: cfg.v2 });
  q.figure = u7bars(cfg.ctx.labels, [cfg.v1, cfg.v2], cfg.B, top);
  return q;
}, ["Do not compare the printed values; compare the bar heights, which start at the axis value.", "Subtract the axis start from each value first, then divide the taller height by the shorter height."]);

E("u7-deep-critique", 7, ["11.6", "11.5"], 3, "var", varset([
  function(){
    return mcq("A juice stand advert uses a bar graph with its axis starting at 90. Sales were 94 glasses in January and 98 glasses in February, and the advert claims sales doubled in February. Which critique is fully correct?",
      {t:"The axis starting at 90 exaggerates the gap, and 98 is only slightly more than 94, so the doubled claim misrepresents the data", fb:"Right: both the format flaw and the false claim are named, and each is checked against the values."},
      [{t:"The axis starting at 90 is fine for this data, and the doubled claim is fair because the February bar looks twice as tall as the other", fb:"Bar looks are exactly the trap: heights measured from 90 do not match the values 94 and 98."},
       {t:"The doubled claim is wrong because sales fell in February from January, and the axis should start at 100 instead of at zero", fb:"Sales rose slightly from 94 to 98, and an axis should start at 0, not at 100."},
       {t:"The only problem is that the bars are different widths on the page, so the claim cannot be judged at all from the graph", fb:"No width problem is described; the axis start and the claim can both be judged from the values."}],
      "A full critique checks both the picture and the words: the <b>truncated axis</b> exaggerates, and <b>98 against 94 is a small rise, not a doubling</b>.",
      {mode:"deep-juice"});
  },
  function(){
    return mcq("A headline says most students want an earlier school start. Its 3-D circle graph shows 45% for earlier, 35% for the same time and 20% for later. Which critique is fully correct?",
      {t:"45% is the largest share but not a majority, and the 3-D effect can make the front slice look bigger than its share", fb:"Right: most needs over 50%, and the tilt adds a second distortion on top of the headline error."},
      [{t:"The headline is correct because 45% is the largest share, and the 3-D effect does not change any of the slice sizes", fb:"Largest is not the same as most, and a 3-D tilt does change how large slices appear."},
       {t:"The headline is wrong because later has the strongest support, and circle graphs cannot show percents in their slices", fb:"Earlier has the largest share at 45%, and circle graphs show percents properly when drawn flat."},
       {t:"The only problem is the order of the slices around the circle, since the percents add to 100 as they should", fb:"The percents do add to 100, but the headline claim and the 3-D distortion are the real problems."}],
      "A full critique checks both the claim and the format: <b>45% is not most</b>, and the <b>3-D effect</b> misrepresents the slice sizes.",
      {mode:"deep-headline"});
  },
  function(){
    return mcq("A poster claims recycling rose all term. Its line graph shows only weeks 5 to 8, when amounts rose. The class log shows amounts fell during weeks 1 to 4. Which critique is fully correct?",
      {t:"The graph cherry-picks the rising weeks and hides the falling weeks, so the all term claim goes against the full data", fb:"Right: the selected range supports the claim only by leaving out the weeks that contradict it."},
      [{t:"The claim is correct because the graph rises, and weeks 1 to 4 are too early to count at all", fb:"Weeks 1 to 4 are part of the term, and their fall contradicts the all term claim."},
       {t:"The only problem is the colour of the line on the graph, since the chosen weeks are all drawn accurately", fb:"The chosen weeks may be accurate, but omitting the falling weeks is the misrepresentation."},
       {t:"The claim fails because amounts in weeks 5 to 8 actually fell over the term, and a bar graph was required instead of a line graph", fb:"Amounts rose in weeks 5 to 8 as stated; no graph type is required, the missing weeks are the issue."}],
      "A full critique checks the claim against all the data: <b>showing only weeks 5 to 8</b> hides the fall in weeks 1 to 4, so the <b>all term claim is inconsistent</b> with the record.",
      {mode:"deep-recycling"});
  },
  function(){
    return mcq("A pet poster uses a pictograph where cat symbols are drawn much larger than bird symbols, one symbol standing for 10 pets in each row. Counts are 40 cats and 30 birds, and the poster claims cats are twice as popular as birds. Which critique is fully correct?",
      {t:"The larger cat symbols exaggerate the difference, and 40 against 30 is not twice as many, so the claim misrepresents the data", fb:"Right: the symbol sizes distort the picture, and the counts themselves refute the doubled claim."},
      [{t:"The claim is fair because the cat symbols on the poster look about twice the size of the bird symbols beside them in the rows", fb:"Symbol size is the distortion, not evidence; popularity must be judged from the counts 40 and 30."},
       {t:"The claim is wrong because birds are actually more popular than cats, and all pictographs are misleading in exactly this same way", fb:"Cats lead 40 to 30, so birds are not ahead, and a pictograph with equal symbols is fair."},
       {t:"The only problem is that one symbol stands for 10 pets in each row, which makes small counts of pets hard to show exactly in a row", fb:"Part symbols are a minor weakness here; unequal symbol sizes and the false claim are the real problems."}],
      "A full critique checks both the picture and the words: <b>unequal symbol sizes</b> exaggerate, and <b>40 is not twice 30</b>.",
      {mode:"deep-pets"});
  }
]), ["A complete critique checks two things: how the graph is built, and whether the words match the numbers.", "Test the claim with the actual values first, then name the format feature that pushes readers the same wrong way."]);

/* ----- bank-u8.js ----- */
// Math 8 Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 3483 to 4165).
// CRMARKS: u8-around-point-num=3
// CRMARKS: u8-build-max-num=3
// CRMARKS: u8-cubes-total-num=3
// CRMARKS: u8-front-squares-num=3
// CRMARKS: u8-irregular-angle-num=2
// CRMARKS: u8-mixed-point-num=2
// CRMARKS: u8-rotate-front-num=2
/* Unit 8: Geometry */
// Unit 8: Geometry (Math 8, NL). Entries only; helpers prefixed u8.
// Block objects are shown as height maps: a labelled grid where each number
// tells how many cubes are stacked on that square. Back row is at the top of
// the grid, front row at the bottom, matching looking down at the object.
function u8T(x, y, str, size, bold, anchor) {
  return '<text x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" font-size="' + (size || 12) + '" fill="' + FIG_INK + '" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="' + (anchor || "middle") + '" dominant-baseline="central"' + (bold ? ' font-weight="bold"' : "") + '>' + str + '</text>';
}
function u8Svg(W, H, body, aria) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + aria + '">' + body + '</svg>';
}
function u8Rect(x, y, w, h, fill) {
  return '<rect x="' + fmt(x, 1) + '" y="' + fmt(y, 1) + '" width="' + fmt(w, 1) + '" height="' + fmt(h, 1) + '" fill="' + (fill || "none") + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
}
// Height-map grid drawn with its top-left corner at (x0, y0). hm rows run back to front.
function u8HM(hm, x0, y0, cell) {
  var s = "", r, c;
  for (r = 0; r < hm.length; r++) for (c = 0; c < hm[r].length; c++) {
    s += u8Rect(x0 + c * cell, y0 + r * cell, cell, cell, hm[r][c] > 0 ? FIG_SHADE : "#ffffff");
    s += u8T(x0 + c * cell + cell / 2, y0 + r * cell + cell / 2 + 1, fmt(hm[r][c]), 13, true);
  }
  var w = hm[0].length * cell, h = hm.length * cell;
  s += u8T(x0 + w / 2, y0 - 11, "BACK", 10, true);
  s += u8T(x0 + w / 2, y0 + h + 12, "FRONT", 10, true);
  s += u8T(x0 - 13, y0 + h / 2, "L", 10, true);
  s += u8T(x0 + w + 13, y0 + h / 2, "R", 10, true);
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
  s += '<line x1="' + fmt(x0 - 3, 1) + '" y1="' + fmt(yBase, 1) + '" x2="' + fmt(x0 + prof.length * cell + 3, 1) + '" y2="' + fmt(yBase, 1) + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
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
function u8ProfStr(p) { return p.map(function (v) { return fmt(v); }).join(", "); }
function u8HMStr(hm) {
  var names = hm.length === 2 ? ["Back row", "Front row"] : ["Back row", "Middle row", "Front row"];
  return hm.map(function (row, i) { return names[i] + " (left to right): " + u8ProfStr(row); }).join(". ") + ".";
}
function u8RegPoly(cx, cy, R, n, rotDeg) {
  var pts = [], i, a;
  for (i = 0; i < n; i++) { a = (rotDeg + i * 360 / n - 90) * Math.PI / 180; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
  return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
}
function u8Interior(n) { return (n - 2) * 180 / n; }
var U8_POLY_NAMES = { 3: "equilateral triangle", 4: "square", 5: "regular pentagon", 6: "regular hexagon", 8: "regular octagon", 10: "regular decagon", 12: "regular dodecagon" };

// 1. 10.15 L1 gen MC with figure: pick the top view from four drawn candidates.
E("u8-top-view-choice", 8, ["10.15"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var occ = u8OccOf(hm);
    var trans = [[occ[0][0], occ[1][0]], [occ[0][1], occ[1][1]], [occ[0][2], occ[1][2]]];
    var mirror = occ.map(function (row) { return row.slice().reverse(); });
    var full = occ.map(function (row) { return row.map(function () { return 1; }); });
    var cands = [
      { g: occ, lab: "the top view", good: true },
      { g: trans, lab: "the top view turned sideways", good: false, why: "That candidate turns the plan sideways, swapping the back-to-front and left-to-right directions." },
      { g: mirror, lab: "the mirrored top view", good: false, why: "That candidate is the mirror image; the left and right sides are swapped." },
      { g: full, lab: "the fully filled top view", good: false, why: "That candidate fills every square, but some squares of the object hold no cubes." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.g); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 26, hmW = 3 * cell, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
    body += u8HM(hm, 160 - hmW / 2, 30, cell);
    var cc = 13, pos = [[52, 128], [196, 128], [52, 196], [196, 196]];
    cands.forEach(function (cd, i) {
      var w = cd.g[0].length * cc, h = cd.g.length * cc;
      body += u8Occ(cd.g, pos[i][0], pos[i][1], cc);
      body += u8T(pos[i][0] + w / 2, pos[i][1] + h + 12, "View " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 252, body, "Height map of a block object and four candidate top views labelled A to D");
    var opts = cands.map(function (cd, i) {
      return { t: "View " + "ABCD"[i], fb: cd.good ? "Correct. Every filled square matches a square that holds at least one cube, and the back row stays at the back." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("The top part of the diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Which candidate below is the top view of the object? The top view shows one square for each stack, filled in.",
      corr, rest,
      "Looking straight down, height does not matter: a square is filled exactly when its stack has at least one cube. Matching the filled squares, back row to back row and left to right, gives <b>View " + "ABCD"[gi] + "</b>.",
      { mode: "top-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Which candidate is the top view of the object?",
    { t: "View A", fb: "Correct." },
    [{ t: "View B", fb: "That swaps left and right." }, { t: "View C", fb: "That fills squares that hold no cubes." }, { t: "View D", fb: "That turns the plan sideways." }],
    "A square is filled exactly when its stack has at least one cube, so the top view is <b>View A</b>.", { mode: "top-choice", hm: "fb", good: 0 });
}, ["The top view cares only about which squares hold cubes, not how tall each stack is.", "Work through the back row first, marking each square filled or empty."]);

// 2. 10.18 L1 var: views of objects in the environment.
E("u8-env-views-var", 8, ["10.18"], 1, "var", varset([
  function () {
    var q=mcq("Sofia sketches a cereal box standing on a kitchen table. From directly above, what shape does she draw for the top view?",
      { t: "A rectangle, the size of the top face of the box.", fb: "Correct. Looking straight down shows the top face in its true shape." },
      [{ t: "A tall rectangle showing the front face of the cereal box.", fb: "That is the front view; the top view shows only the top face." }, { t: "A square the size of the end panel of the box.", fb: "That is close to a side view; the top face is the long rectangle on top." }, { t: "A circle showing the whole box at once from above.", fb: "One view shows one direction only; from above you see the top face." }],
      "A view shows the face you are looking straight at. From above, that is the top face, so the top view is <b>a rectangle, the size of the top face of the box</b>.",
      { mode: "env-cereal" }); q.figure=m8BoxLabSVG("","","",false); return q;
  },
  function () {
    var q=mcq("A lighthouse is roughly a tall cylinder that gets a little narrower toward the top. Which description fits its top view?",
      { t: "A circle.", fb: "Correct. Looking straight down a cylinder shows a circle." },
      [{ t: "A rectangle.", fb: "That fits the front or side view of the tower, not the view from above." }, { t: "A triangle.", fb: "A triangle would fit a cone or pyramid shape seen from the side, not this tower from above." }, { t: "A long oval.", fb: "A view of the object shows the object only; from above the tower is a circle." }],
      "From directly above, a cylinder shows its round top face. So the top view is <b>a circle</b>.",
      { mode: "env-lighthouse" }); q.figure=m8CylLabSVG("","",false,false); return q;
  },
  function () {
    return mcq("Marcus draws the front view of a school bus parked facing him. What should his front view show?",
      { t: "A wide rectangle with the windshield, headlights and front wheels.", fb: "Correct. The front view shows the face of the bus that points at him." },
      [{ t: "A long rectangle with a row of side windows and two wheels.", fb: "That is the side view; the front view is the short end of the bus." }, { t: "A flat rectangle the size of the whole roof of the bus.", fb: "That is the top view; the front view stands upright." }, { t: "The bus cut in half lengthways so all the seats inside it show clearly.", fb: "A view drawing shows the outside face, not a cut through the object." }],
      "The front view shows the face pointing toward the viewer, so it shows <b>a wide rectangle with the windshield, headlights and front wheels</b>.",
      { mode: "env-bus" });
  },
  function () {
    return mcq("A mug sits on a table with its handle pointing to the right. Which description fits the right side view of the mug?",
      { t: "The body of the mug with the handle sticking out on the far side of the drawing.", fb: "Correct. From the right, you look along the handle direction and see the handle profile." },
      [{ t: "A circle for the top of the mug, seen from directly above the table.", fb: "That is the top view; a side view stands upright." }, { t: "The body of the mug with no handle showing at all on either side of the drawing of it.", fb: "That fits the left side view; from the right, the handle is in line with your view and shows." }, { t: "A flat line the full width of the mug, with nothing above or below it.", fb: "That would be an edge only; the side view shows the full height of the mug." }],
      "Each view shows the object from one direction. From the right side, the handle points toward you, so the view is <b>the body of the mug with the handle sticking out on the far side of the drawing</b>.",
      { mode: "env-mug" });
  },
  function () {
    return mcq("Priya photographs a ferry directly from the front as it comes into the wharf. In her photo, what happens to the long side of the ferry?",
      { t: "It points away from her, so the photo shows mainly the narrow bow end.", fb: "Correct. In a front view, the length runs away from the viewer and does not spread across the picture." },
      [{ t: "It spreads across the whole photo, showing every window along the side.", fb: "That describes a side view of the ferry, not the front view." }, { t: "It appears as a flat rectangle on top of the ferry.", fb: "That describes the top view; the photo is taken from the front." }, { t: "It doubles in length because the ferry is moving.", fb: "A view depends on direction, not on the ferry's speed." }],
      "In a front view, the long direction of the object points away from the viewer. So the photo shows <b>mainly the narrow bow end</b>.",
      { mode: "env-ferry" });
  }
]), ["Ask yourself which face of the object points straight at the viewer.", "Top views lie flat, front and side views stand upright, and each view shows one direction only."]);

// 3. 10.4 L1 var: which regular polygon tessellates on its own.
E("u8-regular-tessellates-var", 8, ["10.4"], 1, "var", varset([
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Regular hexagon, interior angle 120°.", fb: "Correct. 360 divided by 120 is 3, so three hexagons meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular octagon, interior angle 135°.", fb: "360 divided by 135 is not a whole number, so octagons alone leave gaps." }, { t: "Regular dodecagon, interior angle 150°.", fb: "360 divided by 150 is not a whole number, so dodecagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 120° &= 3 \\end{aligned} \\] So the <b>regular hexagon, interior angle 120°</b>, tessellates on its own.",
      { mode: "reg-hex" }); q.figure=m8PolyRowSVG([[6,"120\u00B0"],[5,"108\u00B0"],[8,"135\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Square, interior angle 90°.", fb: "Correct. 360 divided by 90 is 4, so four squares meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular heptagon, interior angle about 129°.", fb: "360 divided by about 129 is not a whole number, so heptagons leave gaps." }, { t: "Regular octagon, interior angle 135°.", fb: "360 divided by 135 is not a whole number, so octagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 90° &= 4 \\end{aligned} \\] So the <b>square, interior angle 90°</b>, tessellates on its own.",
      { mode: "reg-square" }); q.figure=m8PolyRowSVG([[4,"90\u00B0"],[5,"108\u00B0"],[7,"\u2248129\u00B0"],[8,"135\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Which regular polygon tessellates on its own, covering a floor with no gaps and no overlaps?",
      { t: "Equilateral triangle, interior angle 60°.", fb: "Correct. 360 divided by 60 is 6, so six triangles meet exactly at each point." },
      [{ t: "Regular pentagon, interior angle 108°.", fb: "360 divided by 108 is not a whole number, so pentagons leave gaps at each point." }, { t: "Regular decagon, interior angle 144°.", fb: "360 divided by 144 is not a whole number, so decagons leave gaps." }, { t: "Regular dodecagon, interior angle 150°.", fb: "360 divided by 150 is not a whole number, so dodecagons alone leave gaps." }],
      "Copies meet at a point, so the interior angle must divide 360 exactly: \\[ \\begin{aligned} 360° \\div 60° &= 6 \\end{aligned} \\] So the <b>equilateral triangle, interior angle 60°</b>, tessellates on its own.",
      { mode: "reg-tri" }); q.figure=m8PolyRowSVG([[3,"60\u00B0"],[5,"108\u00B0"],[10,"144\u00B0"],[12,"150\u00B0"]]); return q;
  },
  function () {
    var q=mcq("Three regular polygons are tried as patio tiles: a regular pentagon (108°), a regular hexagon (120°) and a regular octagon (135°). Which one covers the patio with no gaps?",
      { t: "The regular hexagon only.", fb: "Correct. Only 120 divides 360 exactly, giving 3 tiles at each point." },
      [{ t: "The regular pentagon only.", fb: "108 does not divide 360, so pentagons cannot meet exactly around a point." }, { t: "The regular octagon only.", fb: "135 does not divide 360, so octagons alone leave square-shaped gaps." }, { t: "All three cover the patio on their own.", fb: "Only one interior angle here divides 360 exactly; check each one." }],
      "Test each angle against 360: \\[ \\begin{aligned} 360° \\div 120° &= 3 \\\\ 360° \\div 108° &\\text{ is not whole} \\\\ 360° \\div 135° &\\text{ is not whole} \\end{aligned} \\] So <b>the regular hexagon only</b> covers the patio.",
      { mode: "reg-patio" }); q.figure=m8PolyRowSVG([[5,"108\u00B0"],[6,"120\u00B0"],[8,"135\u00B0"]]); return q;
  }
]), ["At each meeting point the angles must add to exactly 360 degrees.", "Divide 360 by the interior angle; the shape tessellates alone only when the answer is a whole number."]);

// 4. 10.6 L1 var: tessellations in the environment.
E("u8-env-tess-var", 8, ["10.6"], 1, "var", varset([
  function () {
    return mcq("Which description is a tessellation you can see in the environment? A tessellation covers a surface with no gaps and no overlaps.",
      { t: "Hexagonal cells in a honeycomb, fitted together edge to edge.", fb: "Correct. The hexagons cover the surface completely with no gaps." },
      [{ t: "Round stones scattered on a beach with sand showing between them.", fb: "Gaps of sand show between the stones, so the surface is not fully covered." }, { t: "Overlapping shingles nailed in rows on a roof.", fb: "Shingles overlap each other, and a tessellation has no overlaps." }, { t: "A single large painting hanging on a wall.", fb: "One picture does not repeat to cover a surface in a pattern of shapes." }],
      "A tessellation repeats shapes to cover a surface fully, with no gaps and no overlaps. That matches <b>hexagonal cells in a honeycomb, fitted together edge to edge</b>.",
      { mode: "env-honeycomb" });
  },
  function () {
    return mcq("A hallway floor is covered in square tiles laid in straight rows and columns, grout lines forming a grid. How would you describe this floor?",
      { t: "A tessellation of squares made by sliding the tile across and down.", fb: "Correct. The squares cover the floor fully and repeat by translation." },
      [{ t: "A tessellation of circles made by rotating one tile.", fb: "The tiles are squares, and circles would leave gaps between them." }, { t: "Not a tessellation, because the grout lines break the pattern.", fb: "Grout lines are just the edges of the tiles; the squares still cover the floor with no gaps." }, { t: "Not a tessellation, because all the tiles are the same shape and size.", fb: "A tessellation can use a single shape; using one shape is the simplest kind." }],
      "The squares cover the floor with no gaps or overlaps and repeat by sliding, so the floor is <b>a tessellation of squares made by sliding the tile across and down</b>.",
      { mode: "env-floor" });
  },
  function () {
    return mcq("Bricks in a wall are laid in rows, with each row shifted by half a brick. Why does the brick pattern count as a tessellation?",
      { t: "The rectangles cover the wall with no gaps and no overlaps, and the pattern repeats.", fb: "Correct. Shifting a row is still a repeating covering with no gaps." },
      [{ t: "Because bricks are heavy, strong building materials used for building walls outside.", fb: "The weight of the pieces has nothing to do with whether a pattern tessellates." }, { t: "Because each brick in the wall is a different size from all of its neighbours.", fb: "The bricks are the same size; the pattern works because they fit with no gaps." }, { t: "Because the wall is outdoors, where everyone walking past can see it.", fb: "Being outdoors does not decide it; the covering with no gaps or overlaps does." }],
      "A tessellation needs a repeating covering with no gaps and no overlaps, which is why <b>the rectangles covering the wall with no gaps and no overlaps, in a repeating pattern</b>, counts.",
      { mode: "env-brick" });
  },
  function () {
    return mcq("Which pattern found around a school is a tessellation?",
      { t: "A mosaic of small square and triangle tiles covering a bench top completely.", fb: "Correct. The tiles fit edge to edge and cover the whole bench top." },
      [{ t: "Pebbles glued randomly onto a board in no pattern, with board showing between them.", fb: "Board showing between the pebbles means gaps, so it is not a full covering." }, { t: "Stickers placed on a locker so that some cover parts of others.", fb: "Stickers covering each other are overlaps, which a tessellation does not have." }, { t: "A checkerboard rug with several squares cut out of it.", fb: "The cut-out squares are gaps in the covering, so the rug no longer tessellates there." }],
      "Look for a full covering with no gaps and no overlaps: <b>a mosaic of small square and triangle tiles covering a bench top completely</b>.",
      { mode: "env-mosaic" });
  }
]), ["Check the two tests: no gaps, and no overlaps.", "Name the shape doing the covering and how it repeats."]);

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
      { p: side, good: false, why: "That candidate is the right side view; its columns run front to back, not left to right." },
      { p: backV, good: false, why: "That candidate reverses left and right, which is what you would see from the back." },
      { p: tall, good: false, why: "That candidate changes a column height; each front column must match the tallest stack in that column." }
    ];
    var keys = cands.map(function (cd) { return u8Key(cd.p); });
    if (new Set(keys).size < 4) continue;
    cands = shuffle(cands);
    var gi = cands.findIndex(function (cd) { return cd.good; });
    var cell = 24, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
    body += u8HM(hm, 160 - 36, 30, cell);
    var cc = 11, pos = [[40, 148], [185, 148], [40, 218], [185, 218]];
    cands.forEach(function (cd, i) {
      body += u8Sil(cd.p, pos[i][0], pos[i][1] + 30, cc);
      body += u8T(pos[i][0] + 16, pos[i][1] + 44, "View " + "ABCD"[i], 11, true);
    });
    var fig = u8Svg(320, 268, body, "Height map of a block object and four candidate front views labelled A to D");
    var opts = cands.map(function (cd, i) {
      return { t: "View " + "ABCD"[i], fb: cd.good ? "Correct. Each column matches the tallest stack in that column of the object, read left to right." : cd.why };
    });
    var corr = opts[gi], rest = opts.filter(function (o, i) { return i !== gi; });
    var q = mcq("The top part of the diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Which candidate below is the front view of the object? In a front view, each column is as tall as the tallest stack in that column.",
      corr, rest,
      "Read the object column by column and take the larger of the back and front numbers: the front column heights are \\( " + u8ProfStr(front) + " \\). Matching silhouette is <b>View " + "ABCD"[gi] + "</b>.",
      { mode: "front-choice", hm: u8Key(hm), good: gi });
    q.figure = fig;
    return q;
  }
  return mcq("Which candidate is the front view of the object?",
    { t: "View A", fb: "Correct." },
    [{ t: "View B", fb: "That is a side view." }, { t: "View C", fb: "That reverses left and right." }, { t: "View D", fb: "That changes a column height." }],
    "Each front column matches the tallest stack in that column, so the front view is <b>View A</b>.", { mode: "front-choice", hm: "fb", good: 0 });
}, ["For each left-to-right column, the front view height is the tallest stack in that column.", "Write the column heights from the height map first, then match the silhouette."]);

// 6. 10.9 L2 gen MC with figure: three views shown, pick the matching object description.
E("u8-match-object", 8, ["10.9"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 6, 10);
    var occ = u8OccOf(hm), front = u8FrontProf(hm), side = u8SideProf(hm), tot = u8Sum(hm);
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < 2; r++) for (c = 0; c < 3; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    var spots = (hm[0].concat(hm[1]).filter(function (v) { return v === tv; }).length);
    if (spots !== 1) continue;
    var rowName = ti === 0 ? "back row" : "front row";
    var colName = tj === 0 ? "left end" : (tj === 1 ? "middle" : "right end");
    var altRow = ti === 0 ? "front row" : "back row";
    var altCol = tj === 0 ? "right end" : "left end";
    var cell = 15;
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "RIGHT SIDE", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Views of one block object", 11, true);
    var fig = u8Svg(320, 112, body, "Top, front and right side views of a block object");
    var corrT = "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total.";
    var q = mcq("The diagram shows the top, front and right side views of a block object. Which description matches the object the views came from?",
      { t: corrT, fb: "Correct. The tallest column of the front and side views locates the tallest stack, and the views together fix the total." },
      [
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + altRow + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total.", fb: "That puts the tallest stack in the wrong row; match its position in the side view, where columns run front to back." },
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + altCol + ", and the object uses " + fmt(tot) + " cubes in total.", fb: "That mirrors the object left to right; match its position in the front view." },
        { t: "The tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot + tv) + " cubes in total.", fb: "The position is right, but the total double-counts the tallest stack; add each stack once." }
      ],
      "The front view puts the tallest stack at the " + colName + ", the side view puts it in the " + rowName + ", and combining the views gives " + fmt(tot) + " cubes in total. So the matching description is: <b>the tallest stack is " + fmt(tv) + " cubes, in the " + rowName + " at the " + colName + ", and the object uses " + fmt(tot) + " cubes in total</b>.",
      { mode: "match-object", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("The diagram shows the top, front and right side views of a block object. Which description matches the object the views came from?",
    { t: "The tallest stack is 3 cubes, in the back row at the left end, and the object uses 8 cubes in total.", fb: "Correct." },
    [{ t: "The tallest stack is 3 cubes, in the front row at the left end, and the object uses 8 cubes in total.", fb: "That puts the tallest stack in the wrong row." }, { t: "The tallest stack is 3 cubes, in the back row at the right end, and the object uses 8 cubes in total.", fb: "That mirrors the object." }, { t: "The tallest stack is 3 cubes, in the back row at the left end, and the object uses 11 cubes in total.", fb: "That double-counts the tallest stack." }],
    "Combining the views gives <b>the tallest stack of 3 cubes in the back row at the left end, with 8 cubes in total</b>.", { mode: "match-object", hm: "fb" });
}, ["Use the front view to place features left to right, and the side view to place them front to back.", "Find the tallest stack first: it is the tallest column in both the front and side views."]);

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
    var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
    var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
    body += u8HM(hm, 124, 30, cell);
    var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
    var q = mcq("The diagram shows a block object as a height map. The whole object is turned " + dirWord + " on the table, seen from above. After the turn, what are the column heights of the front view, read left to right? Each height is the tallest stack in that column.",
      { t: u8ProfStr(newFront), fb: "Correct. Turning the plan and then taking the tallest stack in each new column gives these heights." },
      [
        { t: u8ProfStr(oldFront), fb: "Those are the front heights before the turn; the turn moves the stacks to new columns." },
        { t: u8ProfStr(newSide), fb: "That reads a side direction of the turned object rather than its front." },
        { t: u8ProfStr(mirrorFront), fb: "That reverses the turned front view left to right; check which end the tall stacks move to." }
      ],
      "Turn the height map " + dirWord + " first, then take the tallest stack in each column of the turned map. The turned front column heights are <b>" + u8ProfStr(newFront) + "</b>.",
      { mode: "rotate-predict", hm: u8Key(hm), turns: turns });
    q.figure = fig;
    return q;
  }
  return mcq("A block object is turned 180° on the table. What are the front view column heights after the turn?",
    { t: "1, 2, 3", fb: "Correct." },
    [{ t: "3, 2, 1", fb: "That is the view before the turn." }, { t: "2, 2, 2", fb: "That flattens the stacks." }, { t: "3, 1, 2", fb: "That scrambles the columns." }],
    "Turning the map 180 degrees reverses the columns, giving <b>1, 2, 3</b>.", { mode: "rotate-predict", hm: "fb", turns: 2 });
}, ["Turn the whole height map first, in the direction named, keeping the back of the map at the top.", "After turning, take the tallest stack in each column, left to right."]);

// 8. 10.16 L2 gen num, CR 2: front view squares after a described rotation.
E("u8-rotate-front-num", 8, ["10.16"], 2, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 6, 10);
  var turns = pick([1, 2, 3]);
  var rot = u8RotHM(hm, turns);
  var prof = u8FrontProf(rot), ans = u8SumArr(prof);
  var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
  var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body += u8HM(hm, 124, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var chain = prof.map(function (v, i) { return (i === 0 ? "" : " &+ ") + fmt(v); }).join("");
  var q = numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned " + dirWord + " on the table, seen from above, and then the front view is drawn. How many squares show in that front view? Count each visible square in every column.",
    ans, 0,
    "Turn the map " + dirWord + ", then take the tallest stack in each column of the turned map: \\[ \\begin{aligned} \\text{front heights} &= " + u8ProfStr(prof) + " \\\\ \\text{squares} &= " + prof.join(" + ") + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the front view after the turn shows <b>" + fmt(ans) + "</b> squares.",
    { mode: "rotate-front-num", hm: u8Key(hm), turns: turns });
  q.figure = fig;
  return q;
}, ["The rotation changes which stacks line up in each front column.", "Turn the map first, write the new column heights, then add them."]);

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
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT", 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "RIGHT SIDE", 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 102, "Build the object that has these views", 11, true);
    var fig = u8Svg(320, 112, body, "Top, front and right side views of a block object");
    var q = mcq("The diagram shows the top, front and right side views of a block object built from cubes. Which height map builds an object with exactly these views? In a height map, each number tells how many cubes are stacked on that square.",
      { t: optsT[0], fb: "Correct. Its top view, front column heights and side column heights all match the diagram." },
      [
        { t: optsT[1], fb: "That swaps the back and front rows; the side view would then read the wrong way." },
        { t: optsT[2], fb: "That mirrors the object left to right; the front view would be reversed." },
        { t: optsT[3], fb: "That lowers the tallest stack by one cube, so the front and side views would be shorter." }
      ],
      "The top view fixes which squares are used, the front view fixes the tallest stack in each column, and the side view fixes the tallest stack in each row. The map that satisfies all three is: <b>" + optsT[0] + "</b>",
      { mode: "build-from-views", hm: u8Key(hm) });
    q.figure = fig;
    return q;
  }
  return mcq("Which height map builds an object with the views shown?",
    { t: "Back row (left to right): 2, 0, 1. Front row (left to right): 1, 1, 1.", fb: "Correct." },
    [{ t: "Back row (left to right): 1, 1, 1. Front row (left to right): 2, 0, 1.", fb: "That swaps the rows." }, { t: "Back row (left to right): 1, 0, 2. Front row (left to right): 1, 1, 1.", fb: "That mirrors the object." }, { t: "Back row (left to right): 1, 0, 1. Front row (left to right): 1, 1, 1.", fb: "That lowers the tallest stack." }],
    "The map matching all three views is <b>Back row (left to right): 2, 0, 1. Front row (left to right): 1, 1, 1.</b>", { mode: "build-from-views", hm: "fb" });
}, ["Use all three views together: top for the footprint, front for column heights, side for row heights.", "Test each candidate map against the front view first; most wrong maps fail there."]);

// 10. 10.17 L2 gen num, CR 3: total cubes in the object shown as a height map.
E("u8-cubes-total-num", 8, ["10.17"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Build this object (numbers = cubes on each square)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object to build");
  var flat = hm[0].concat(hm[1]);
  var q = numq("The diagram is the plan for a block object: each number tells how many cubes are stacked on that square. How many cubes are needed to build the object in total?",
    tot, 0,
    "Add the stack on every square, back row then front row: \\[ \\begin{aligned} \\text{total} &= " + flat.join(" + ") + " \\\\ &= " + fmt(tot) + " \\end{aligned} \\] So the object needs <b>" + fmt(tot) + "</b> cubes.",
    { mode: "cubes-total", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["Every number on the plan is one stack of cubes in the finished object.", "Add the back row numbers first, then the front row numbers."]);

// 11. 10.9 L2 gen num, CR 3: squares showing in the front view.
E("u8-front-squares-num", 8, ["10.9"], 1, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 7, 12);
  var prof = u8FrontProf(hm), ans = u8SumArr(prof), tot = u8Sum(hm);
  var cell = 26, body = u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
  body += u8HM(hm, 121, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object");
  var q = numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. How many squares show in the front view of the object? In the front view, a taller stack hides any shorter stack directly behind it.",
    ans, 0,
    "In each column only the taller stack shows, so the column heights are the larger number in each column: \\[ \\begin{aligned} \\text{front heights} &= " + u8ProfStr(prof) + " \\\\ \\text{squares} &= " + prof.join(" + ") + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] The object has " + fmt(tot) + " cubes, but the front view shows only <b>" + fmt(ans) + "</b> squares.",
    { mode: "front-squares", hm: u8Key(hm) });
  q.figure = fig;
  return q;
}, ["A view shows silhouettes, not every cube; hidden cubes do not add squares.", "For each column, compare the back and front numbers and keep the larger one, then add the three results."]);

// 12. 10.4 L2 gen num, CR 3: angles around a point with regular tiles.
E("u8-around-point-num", 8, ["10.4"], 1, "gen", function () {
  var mode = ri(0, 2), n, ang, k, ans, prompt, sol;
  var R = ri(24, 34), rot = ri(0, 50);
  if (mode === 0) {
    n = pick([3, 4, 6]); ang = u8Interior(n); ans = 360 / ang;
    prompt = "Copies of a " + U8_POLY_NAMES[n] + " are placed around a single point, corner to corner, with no gaps. The interior angle of the tile is " + fmt(ang) + " degrees. How many tiles meet at the point?";
    sol = "The angles around a point add to 360 degrees, and each tile adds one interior angle: \\[ \\begin{aligned} \\text{tiles} &= 360° \\div " + fmt(ang) + "° \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So <b>" + fmt(ans) + "</b> tiles meet at the point.";
  } else if (mode === 1) {
    n = pick([3, 4, 6, 8, 12]); ang = u8Interior(n); k = ri(1, Math.floor(359 / ang) - 0);
    if (k * ang >= 360) k = 1;
    ans = 360 - k * ang;
    prompt = "A " + U8_POLY_NAMES[n] + " has interior angle " + fmt(ang) + " degrees. " + fmt(k) + (k === 1 ? " copy is" : " copies are") + " placed around a point, corner to corner. How many degrees of the full 360 degrees around the point are still uncovered?";
    sol = "Find the angle the placed tiles cover, then subtract from a full turn: \\[ \\begin{aligned} \\text{covered} &= " + fmt(k) + " \\times " + fmt(ang) + "° = " + fmt(k * ang) + "° \\\\ \\text{uncovered} &= 360° - " + fmt(k * ang) + "° \\\\ &= " + fmt(ans) + "° \\end{aligned} \\] So <b>" + fmt(ans) + " degrees</b> are still uncovered.";
  } else {
    var pair = pick([["hexagon", 120, "triangle", 60, 1], ["hexagon", 120, "triangle", 60, 2], ["square", 90, "triangle", 60, 2]]);
    var covered = pair[4] * pair[1];
    ans = (360 - covered) / pair[3];
    prompt = "Tiles meet at a point with no gaps. At the point there are " + fmt(pair[4]) + " regular " + pair[0] + "s (interior angle " + fmt(pair[1]) + " degrees) and some equilateral triangles (interior angle 60 degrees). How many triangles meet at the point?";
    sol = "The angles around the point must add to 360 degrees: \\[ \\begin{aligned} \\text{left for triangles} &= 360° - " + fmt(pair[4]) + " \\times " + fmt(pair[1]) + "° = " + fmt(360 - covered) + "° \\\\ \\text{triangles} &= " + fmt(360 - covered) + "° \\div 60° \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So <b>" + fmt(ans) + "</b> triangles meet at the point.";
    n = pair[0] === "hexagon" ? 6 : 4;
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n || 6, rot), "A regular polygon tile");
  var q = numq(prompt, ans, 0, sol, { mode: "around-point-" + mode, n: n, k: k || 0 });
  q.figure = fig;
  return q;
}, ["Angles around a point add to exactly 360 degrees.", "Multiply the interior angle by the number of tiles placed, then compare with 360."]);

// 13. 10.5 L2 gen num, CR 2: the missing angle of an irregular quadrilateral, and tessellating.
E("u8-irregular-angle-num", 8, ["10.5"], 1, "gen", function () {
  for (var att = 0; att < 100; att++) {
    var a = ri(55, 130), b = ri(55, 130), c = ri(55, 130);
    var d = 360 - a - b - c;
    if (d < 40 || d > 160) continue;
    var R = ri(26, 34), rot = ri(0, 40);
    var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, 4, rot), "An irregular quadrilateral tile");
    var q = numq("An irregular quadrilateral tile has three interior angles of " + fmt(a) + " degrees, " + fmt(b) + " degrees and " + fmt(c) + " degrees. The interior angles of any quadrilateral add to 360 degrees. What is the fourth interior angle, in degrees?",
      d, 0,
      "Add the three known angles and subtract from 360: \\[ \\begin{aligned} \\text{known} &= " + fmt(a) + "° + " + fmt(b) + "° + " + fmt(c) + "° = " + fmt(a + b + c) + "° \\\\ \\text{fourth angle} &= 360° - " + fmt(a + b + c) + "° \\\\ &= " + fmt(d) + "° \\end{aligned} \\] So the fourth angle is <b>" + fmt(d) + " degrees</b>. Copies of any quadrilateral tessellate, because all four of its angles can meet at a point and add to exactly 360 degrees.",
      { mode: "irregular-quad", a: a, b: b, c: c });
    q.figure = fig;
    return q;
  }
  var qf = numq("An irregular quadrilateral tile has three interior angles of 80 degrees, 100 degrees and 90 degrees. What is the fourth interior angle, in degrees?",
    90, 0, "The angles add to 360 degrees: \\[ \\begin{aligned} 360° - (80° + 100° + 90°) &= 90° \\end{aligned} \\] So the fourth angle is <b>90 degrees</b>.", { mode: "irregular-quad", a: 80, b: 100, c: 90 });
  qf.figure = u8Svg(120, 120, u8RegPoly(60, 60, 30, 4, 10), "An irregular quadrilateral tile");
  return qf;
}, ["The interior angles of a quadrilateral always add to 360 degrees.", "Add the three given angles first, then subtract from 360."]);

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
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>';
  }
  var kind2 = mode === "translation" ? "base" : (mode === "reflection" ? "mirror" : "rot");
  var body = tile(70, 60, "base") + tile(70 + s + gap + 40, 60, kind2);
  body += u8T(70, 60 - s / 2 - 16, "Tile 1", 12, true) + u8T(70 + s + gap + 40, 60 - s / 2 - 16, "Tile 2", 12, true);
  var W = 70 + s + gap + 40 + 60;
  var fig = u8Svg(W, 120, body, "Two tiles in a tessellation pattern, the second an image of the first");
  var desc = {
    translation: "Tile 2 is tile 1 slid sideways: same size, same way up, and the dot stays by the same corner.",
    reflection: "Tile 2 is tile 1 flipped over: the dot moves to the matching corner on the other side, like a mirror image.",
    rotation: "Tile 2 is tile 1 turned around a point: the dot travels with its corner as the tile spins."
  };
  var names = { translation: "A translation (a slide)", reflection: "A reflection (a flip)", rotation: "A rotation (a turn)" };
  var others = ["translation", "reflection", "rotation"].filter(function (m) { return m !== mode; });
  var q = mcq("The diagram shows two neighbouring tiles in a tessellation. Each tile is a right triangle with a dot near one corner. Which transformation maps Tile 1 onto Tile 2?",
    { t: names[mode], fb: "Correct. " + desc[mode] },
    [
      { t: names[others[0]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: names[others[1]], fb: "Look at the dot: its position rules this out. " + desc[mode] },
      { t: "An enlargement (a resize)", fb: "The two tiles are exactly the same size, so no resize is involved." }
    ],
    "Compare the dot and the corners of the two tiles. " + desc[mode] + " So the transformation is <b>" + names[mode].toLowerCase() + "</b>.",
    { mode: "tess-transform-" + mode, s: s, gap: gap });
  q.figure = fig;
  return q;
}, ["Track one marked feature, like the dot, from the first tile to the second.", "A slide keeps the tile the same way up, a flip mirrors it, and a turn spins it."]);

// 15. 10.13 L2 var: which plan creates a tessellation.
E("u8-create-tess-var", 8, ["10.13"], 1, "var", varset([
  function () {
    return mcq("A student creates a tessellation from copies of one square tile. Which plan works, and why?",
      { t: "Slide copies across and down in a grid; the area covered is the number of tiles times the area of one tile.", fb: "Correct. Sliding (translating) squares fills the plane, and sliding keeps each tile's area unchanged." },
      [{ t: "Rotate each copy a little more than the last so the pattern fans out; the area grows larger and larger as the fan spreads wider.", fb: "Fanning the tiles opens wedge gaps between them, so the plane is not covered." }, { t: "Shrink each copy slightly so they fit more easily; the total area covered stays exactly the same as before.", fb: "Shrinking leaves gaps, and changing tile size changes the total area covered." }, { t: "Overlap each copy a little over the last; the overlaps keep the total area the same.", fb: "Overlaps cover some ground twice and are not allowed in a tessellation." }],
      "Squares tessellate by translation on a grid, and transformations do not change a tile's area. So the working plan is to <b>slide copies across and down in a grid; the area covered is the number of tiles times the area of one tile</b>.",
      { mode: "create-square" });
  },
  function () {
    return mcq("A class makes a floor pattern from equilateral triangles and squares together. Which statement about the finished tessellation is true?",
      { t: "At each point the angles add to 360 degrees, and the total area is the sum of the areas of all the tiles.", fb: "Correct. Angle sums of 360 keep the covering gap-free, and combining tiles adds their areas." },
      [{ t: "At each point the angles add to 180 degrees, because the tiles lie flat on the floor of the classroom.", fb: "Around a point on a flat floor the angles add to 360 degrees, not 180." }, { t: "The total area of the whole finished pattern is the area of one triangle times the area of one square.", fb: "Areas of combined tiles add; they are not multiplied together." }, { t: "The pattern works only if every tile in it is rotated by exactly the same angle as all the others.", fb: "Tiles in a mixed tessellation can be turned by different amounts; the angle sum at each point is what matters." }],
      "A tessellation needs angle sums of 360 degrees at every point, and areas add when shapes are combined. So <b>at each point the angles add to 360 degrees, and the total area is the sum of the areas of all the tiles</b>.",
      { mode: "create-mixed" });
  },
  function () {
    return mcq("Which plan creates a tessellation using regular hexagons and equilateral triangles?",
      { t: "Surround each hexagon with triangles in its gaps, repeating the group by sliding it across the floor.", fb: "Correct. Hexagon angles of 120 degrees and triangle angles of 60 degrees combine to 360 at each point, and the group repeats by translation." },
      [{ t: "Place the hexagons in a row and leave the gaps empty so the triangles can be added later into the empty spaces.", fb: "Empty gaps mean the surface is not covered, so it is not yet a tessellation." }, { t: "Use only hexagons, but push each row halfway into the row above so the rows lock together.", fb: "Pushing rows into each other creates overlaps, which a tessellation does not allow." }, { t: "Cut each triangle in half and discard the halves so the pieces left over fit into the gaps.", fb: "Discarding pieces changes the shapes and their areas; a tessellation uses whole tiles that fit as they are." }],
      "The hexagon (120 degrees) and triangle (60 degrees) angles combine to 360 degrees at a point, and the finished group repeats by sliding. So the plan is to <b>surround each hexagon with triangles in its gaps, repeating the group by sliding it across the floor</b>.",
      { mode: "create-hex-tri" });
  },
  function () {
    return mcq("A student tessellates a page with copies of a fish shape made earlier. Every copy is the same size, and neighbouring fish are flipped over so head meets tail. Which description of the tessellation is correct?",
      { t: "It is built with reflections, and its total area is the number of fish times the area of one fish.", fb: "Correct. Flipping is reflection, and reflections preserve area." },
      [{ t: "It is built with enlargements, and its total area is twice the area of one single fish.", fb: "All the copies are the same size, so no enlargement is used, and the total is the count times one area." }, { t: "It is built with rotations only, and reflections would change the area of each fish in the pattern.", fb: "The fish are flipped, which is reflection, and a reflection keeps area the same." }, { t: "It is not a tessellation unless the fish also overlap slightly along their edges.", fb: "A tessellation must have no overlaps; flipped copies that meet edge to edge are enough." }],
      "Flipping a copy over is a reflection, and reflections, like all rigid transformations, preserve area. So the tessellation is <b>built with reflections, and its total area is the number of fish times the area of one fish</b>.",
      { mode: "create-fish" });
  }
]), ["A working plan must cover with no gaps and no overlaps, and areas add across tiles.", "Name the transformation doing the repeating, then check what happens to area."]);

// 16. 10.8 L3 gen MC with figure: a combination of transformations in a tessellation.
E("u8-combo-transform", 8, ["10.8"], 3, "gen", function () {
  var s = ri(26, 34), gap = ri(16, 24), lift = ri(6, 12);
  function tile(cx, cy, kind) {
    var pts;
    if (kind === "base") pts = [[cx - s / 2, cy + s / 2], [cx + s / 2, cy + s / 2], [cx - s / 2, cy - s / 2]];
    else pts = [[cx - s / 2, cy - s / 2], [cx + s / 2, cy - s / 2], [cx + s / 2, cy + s / 2]];
    var dot = kind === "base" ? [cx - s / 2 + 7, cy + s / 2 - 7] : [cx + s / 2 - 7, cy - s / 2 + 7];
    return '<polygon points="' + pts.map(function (p) { return fmt(p[0], 1) + "," + fmt(p[1], 1); }).join(" ") + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/><circle cx="' + fmt(dot[0], 1) + '" cy="' + fmt(dot[1], 1) + '" r="3.2" fill="' + FIG_INK + '"/>';
  }
  var cx2 = 70 + s + gap + 40;
  var body = tile(70, 66, "base") + tile(cx2, 66 - lift, "flip");
  body += u8T(70, 66 - s / 2 - 16, "Tile 1", 12, true) + u8T(cx2, 66 - lift - s / 2 - 16, "Tile 2", 12, true);
  var fig = u8Svg(cx2 + 60, 132, body, "Two tiles in a pattern where the second is flipped and shifted from the first");
  var q = mcq("The diagram shows two neighbouring tiles in a tessellation. Each tile is a right triangle with a dot near one corner. Tile 2 is flipped over compared with Tile 1, and it also sits higher and further right. Which description best fits the transformation from Tile 1 to Tile 2?",
    { t: "A reflection combined with a translation (a glide reflection).", fb: "Correct. The tile is mirrored and also shifted, so two transformations act together." },
    [
      { t: "A reflection on its own, with no shift along the pattern.", fb: "A reflection alone would put the tile directly across a mirror line, with no extra shift along the pattern." },
      { t: "A translation on its own, sliding the tile without flipping it over.", fb: "A translation keeps the tile the same way up; this tile is flipped, so a slide alone cannot do it." },
      { t: "A rotation on its own, turning the tile about a point.", fb: "A single turn would keep the tile's handedness; the dot shows the tile has been mirrored as well as moved." }
    ],
    "The dot shows the tile has been mirrored, and its position shows it has also been shifted sideways and up. Two transformations act together: <b>a reflection combined with a translation (a glide reflection)</b>.",
    { mode: "combo-glide", s: s, gap: gap, lift: lift });
  q.figure = fig;
  return q;
}, ["Check two things separately: has the tile been flipped, and has it been shifted?", "When a tile is both mirrored and moved along, the transformation is a combination."]);

// 17. 10.14 L3 var: creating a new tessellating shape from a tessellating polygon.
E("u8-new-shape-var", 8, ["10.14"], 3, "var", varset([
  function () {
    var q=mcq("A square tessellates. A student cuts a small triangle from the middle of the square's left side and tapes the same triangle onto the middle of the right side. What is true of the new shape?",
      { t: "It still tessellates by sliding, and its area is the same as the square's.", fb: "Correct. The bump on one side fits the notch on the opposite side, and moving a piece keeps the total area unchanged." },
      [{ t: "It still tessellates, but its area is larger than the square's.", fb: "The triangle was moved, not added; no new material was created, so the area is unchanged." }, { t: "It no longer tessellates, because only the original square can tile the plane.", fb: "Shapes made this way do tessellate; the matching bump and notch are exactly what makes copies fit." }, { t: "It tessellates only if the cut triangle is thrown away.", fb: "Throwing the piece away leaves a notch with nothing to fill it and reduces the area." }],
      "The piece cut from one side is added to the opposite side, so copies fit bump into notch under a slide, and the area is conserved. So <b>it still tessellates by sliding, and its area is the same as the square's</b>.",
      { mode: "new-square-slide" }); q.figure=m8NotchSquareSVG(); return q;
  },
  function () {
    return mcq("An equilateral triangle tessellates. A student cuts a small piece from one side and tapes it onto the next side of the same triangle, turning the piece as she moves it. Copies of the new shape are fitted together by turning each copy one third of a full turn about a corner. Which statement describes the result?",
      { t: "The new shape tessellates using rotations, and its area equals the triangle's area.", fb: "Correct. The moved piece matches the cut on the neighbouring copy under a 120 degree turn, and the area is conserved." },
      [{ t: "The new shape tessellates using translations only, and its area is smaller.", fb: "Moving a piece to an adjacent side pairs copies under rotation, not a plain slide, and no area is lost." }, { t: "The new shape cannot tessellate, because it is no longer a polygon with straight sides only left.", fb: "Non-polygon shapes can tessellate; the cut and added piece match between neighbouring copies." }, { t: "The new shape tessellates, but only after each copy is enlarged to twice its size.", fb: "All copies stay the same size; enlarging is not part of the method." }],
      "Cutting a piece from one side and adding it to the adjacent side pairs copies under a turn of 120 degrees, and moving a piece conserves area. So <b>the new shape tessellates using rotations, and its area equals the triangle's area</b>.",
      { mode: "new-triangle-rotate" });
  },
  function () {
    return mcq("A student wants to turn a tessellating parallelogram into a new tessellating shape. Which method works?",
      { t: "Cut a curve from the top side and tape the same curve onto the bottom side, then repeat copies by sliding.", fb: "Correct. Opposite sides of a parallelogram pair up under a slide, so the curve and its copy fit together and area is conserved." },
      [{ t: "Cut a curve from the top side and discard it, then repeat copies by sliding them across the whole page in rows.", fb: "Discarding the piece leaves a gap no copy can fill, and the area changes." }, { t: "Cut a curve from the top side and tape it onto the top side as well, right above where it was cut from.", fb: "Adding to the same side leaves the bottom side straight, so bumps meet bumps and the copies cannot fit." }, { t: "Stretch the parallelogram out to twice its width and cut a small piece from one of its corners.", fb: "Stretching changes the shape's angles, so the copies no longer meet cleanly around each point." }],
      "Pieces moved between opposite sides of a tessellating shape keep the fit under a slide and conserve area. So the working method is to <b>cut a curve from the top side and tape the same curve onto the bottom side, then repeat copies by sliding</b>.",
      { mode: "new-parallelogram" });
  },
  function () {
    return mcq("After modifying a hexagon that tessellates, a student checks her new shape and finds its area is greater than the hexagon's area. What must have happened in her modification?",
      { t: "She added a piece without cutting the same piece away somewhere else.", fb: "Correct. Area grows only when material is added without an equal piece being removed." },
      [{ t: "She moved a piece from one side of the shape to the opposite side.", fb: "Moving a piece keeps the total amount of material, and so the area, the same." }, { t: "She flipped the shape over before copying it for the pattern she made.", fb: "Flipping is a reflection; it does not change area." }, { t: "She rotated each copy by 60 degrees as she placed it in the pattern.", fb: "Rotating copies does not change the area of the shape itself." }],
      "Transformations and moving pieces conserve area; area can grow only when extra material is added. So <b>she added a piece without cutting the same piece away somewhere else</b>.",
      { mode: "new-area-check" });
  }
]), ["The reliable method moves a piece from one side to the side it pairs with, so copies still fit.", "Moving a piece never changes total area; adding or discarding a piece does."]);

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
    var body = u8T(52, 14, "TOP", 11, true) + u8Occ(occ, 25, 24, cell);
    body += u8T(160, 14, "FRONT: " + u8ProfStr(front), 11, true) + u8Sil(front, 130, 78, cell);
    body += u8T(268, 14, "SIDE: " + u8ProfStr(side), 11, true) + u8Sil(side, 245, 78, cell);
    body += u8T(160, 104, "Side view columns run front to back", 10, false);
    var fig = u8Svg(320, 114, body, "Top, front and side views of a block object");
    var q = numq("The diagram shows the top, front and right side views of a block object. The front view column heights are " + u8ProfStr(front) + ", and the side view column heights, read from the front of the object to the back, are " + u8ProfStr(side) + ". What is the greatest possible number of cubes in an object with exactly these views?",
      tot, 0,
      "A stack on a given square can be no taller than its front column height and no taller than its side column height, so its greatest height is the smaller of the two. Adding those greatest heights over every filled square of the top view gives \\[ \\begin{aligned} \\text{greatest total} &= " + fmt(tot) + " \\end{aligned} \\] So the greatest possible number of cubes is <b>" + fmt(tot) + "</b>.",
      { mode: "build-max", hm: u8Key(hm), tot: tot });
    q.figure = fig;
    return q;
  }
  return numq("What is the greatest possible number of cubes in an object whose front view heights are 2, 2 and whose top view is a single row of 2 squares, with side view height 2?",
    4, 0, "Each stack can be as tall as the smaller of its column and row limits, 2, and there are 2 squares: \\[ \\begin{aligned} 2 \\times 2 &= 4 \\end{aligned} \\] So the greatest total is <b>4</b>.", { mode: "build-max", hm: "fb", tot: 4 });
}, ["Each stack is limited by two views at once: its front column and its side column.", "For every filled square in the top view, take the smaller of the two limiting heights, then add."]);

// 19. 10.13 L3 gen num, CR 2: mixed regular shapes around a point in a created tessellation.
E("u8-mixed-point-num", 8, ["10.13"], 3, "gen", function () {
  var mode = ri(0, 2), ans, prompt, sol, n;
  var R = ri(24, 33), rot = ri(0, 50);
  if (mode === 0) {
    ans = 360 - 135 - 90;
    n = 8;
    prompt = "A student creates a tessellation with regular octagons (interior angle 135 degrees) and squares (interior angle 90 degrees). At one point in the pattern, an octagon and a square already meet. A second octagon is placed in the remaining space. What is the interior angle, in degrees, of that remaining space before the second octagon is placed? In other words, how many degrees around the point are left after the first octagon and the square?";
    sol = "Angles around a point add to 360 degrees: \\[ \\begin{aligned} \\text{remaining} &= 360° - 135° - 90° \\\\ &= " + fmt(ans) + "° \\end{aligned} \\] The remaining <b>" + fmt(ans) + " degrees</b> exactly match the 135 degree interior angle of the second octagon, which is why octagons and squares tessellate together.";
  } else if (mode === 1) {
    ans = 4;
    n = 6;
    prompt = "A student creates a tessellation using regular hexagons (interior angle 120 degrees) and equilateral triangles (interior angle 60 degrees). At each point, one hexagon meets the point, and the rest of the point is filled by triangles. How many triangles meet at each point?";
    sol = "Subtract the hexagon angle from a full turn, then share the rest among 60 degree triangle angles: \\[ \\begin{aligned} \\text{remaining} &= 360° - 120° = 240° \\\\ \\text{triangles} &= 240° \\div 60° \\\\ &= 4 \\end{aligned} \\] So <b>4</b> triangles meet at each point.";
  } else {
    ans = 120;
    n = 12;
    prompt = "A student creates a tessellation using three shapes at each point: a regular dodecagon (interior angle 150 degrees), a square (interior angle 90 degrees) and one regular hexagon. What is the interior angle, in degrees, that the hexagon must contribute at the point for the three shapes to fill it exactly?";
    sol = "The three angles must add to a full turn: \\[ \\begin{aligned} \\text{hexagon angle} &= 360° - 150° - 90° \\\\ &= 120° \\end{aligned} \\] So the third shape must contribute <b>120 degrees</b>, which is exactly the interior angle of a regular hexagon, so the combination fills the point with no gap.";
  }
  var fig = u8Svg(120, 120, u8RegPoly(60, 60, R, n, rot), "A regular polygon tile used in the pattern");
  var q = numq(prompt, ans, 0, sol, { mode: "mixed-point-" + mode, n: n });
  q.figure = fig;
  return q;
}, ["Angles around a point in a tessellation add to exactly 360 degrees.", "Add the angles already at the point and subtract from 360."]);

/* ----- bank-fix.js ----- */
// Math 8 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 4166 to 4667).
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
  var place=pick(["vegetable garden","school garden","community garden plot","rectangular lawn"]);
  var q=numq("A "+place+" is "+a+" m long and "+b+" m wide. A straight path runs from one corner of the rectangle to the opposite corner. How long is the path, in metres?", c, 0.01,
    "The path is the hypotenuse of a right triangle whose legs are the length and the width: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" m</b>.",
    {mode:"garden-diagonal", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["The straight path is the slanted side of a right triangle hidden in the rectangle.", "Square the length and the width, add the squares, then take the square root of the sum."]);

E("u1-grid-distance-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15]]);
  var kk=ri(1,2); var dx=base[0]*kk, dy=base[1]*kk, c=base[2]*kk;
  var x1=ri(0,4), y1=ri(0,4), x2=x1+dx, y2=y1+dy;
  var q=numq("On a grid map, a library stands at ("+x1+", "+y1+") and a skating rink stands at ("+x2+", "+y2+"). Each grid square represents 1 km. What is the straight-line distance between the library and the rink, in kilometres?", c, 0.01,
    "The two points give the legs of a right triangle: the horizontal change is "+x2+" - "+x1+" = "+dx+" and the vertical change is "+y2+" - "+y1+" = "+dy+". Then: \\[ \\begin{aligned} d^{2} &= "+dx+"^{2} + "+dy+"^{2} \\\\ &= "+(dx*dx)+" + "+(dy*dy)+" \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The answer is <b>"+c+" km</b>.",
    {mode:"grid-distance", x1:x1, y1:y1, x2:x2, y2:y2}); q.figure=m8GridDistSVG(x1,y1,x2,y2); return q;
}, ["Subtract the coordinates to find the two legs before using the theorem.", "Find the horizontal change and the vertical change first, then square and add them."]);

E("u1-fence-perimeter-gap", 1, ["9.12", "9.14"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[20,21,29]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var bed=pick(["flower bed","herb plot","vegetable patch","rose garden","shrub bed"]);
  var q=numq("A triangular "+bed+" has two sides of "+a+" m and "+b+" m that meet at a right angle. The third side joins the ends of these two sides. Fencing is placed along all three sides of the bed. How many metres of fencing are needed?", a+b+c, 0.01,
    "First find the third side with the Pythagorean theorem: \\[ \\begin{aligned} c^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] Then add all three sides for the perimeter: \\("+a+" + "+b+" + "+c+" = "+(a+b+c)+"\\). The answer is <b>"+(a+b+c)+" m</b>.",
    {mode:"fence-perimeter", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["The fencing follows all three sides, and one side length is not given directly.", "Find the third side with the Pythagorean theorem first, then add the three sides."]);

E("u1-square-side-perimeter-gap", 1, ["3.19", "5.2"], 2, "gen", function(){
  var s=ri(5,30); var area=s*s;
  var place2=pick(["patio","garden","mosaic floor","sandbox","dance floor"]);
  var q=numq("A square "+place2+" has an area of "+area+" square metres. A border is placed around all four sides of the patio. How many metres of border are needed?", 4*s, 0.01,
    "The side length is the square root of the area: \\[ \\begin{aligned} \\text{side} &= \\sqrt{"+area+"} \\\\ &= "+s+" \\end{aligned} \\] The border goes around four equal sides: \\(4 \\times "+s+" = "+(4*s)+"\\). The answer is <b>"+(4*s)+" m</b>.",
    {mode:"square-side-perimeter", s:s}); q.figure=m8SquareAreaSVG(area+" m\u00B2"); return q;
}, ["The area of a square is its side length multiplied by itself.", "Take the square root of the area to get one side, then multiply by four."]);

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
  var wall=pick(["house","barn","lighthouse","school","silo"]);
  var q=numq("Two ladders lean against the wall of a "+wall+", and the foot of each ladder stands "+foot+" m from the wall. The first ladder is "+lad1+" m long and the second ladder is "+lad2+" m long. How much higher up the wall does the second ladder reach than the first ladder, in metres?", h2-h1, 0.01,
    "Apply the Pythagorean theorem to each ladder. For the first ladder: \\[ \\begin{aligned} h^{2} &= "+lad1+"^{2} - "+foot+"^{2} \\\\ &= "+(h1*h1)+" \\\\ h &= "+h1+" \\end{aligned} \\] For the second ladder: \\[ \\begin{aligned} h^{2} &= "+lad2+"^{2} - "+foot+"^{2} \\\\ &= "+(h2*h2)+" \\\\ h &= "+h2+" \\end{aligned} \\] The difference is \\("+h2+" - "+h1+" = "+(h2-h1)+"\\). The answer is <b>"+(h2-h1)+" m</b>.",
    {mode:"two-ladders", foot:foot, lad1:lad1, lad2:lad2}); q.figure=m8TwoLaddersSVG(foot,h1,h2,lad1+" m",lad2+" m",foot+" m"); return q;
}, ["Each ladder forms its own right triangle with the same wall and ground.", "Find the height reached by the first ladder, then the height reached by the second ladder."]);

E("u1-shortcut-saving-gap", 1, ["9.12"], 2, "gen", function(){
  var base=pick([[3,4,5],[5,12,13],[8,15,17],[7,24,25],[9,40,41]]);
  var kk=ri(1,3); var a=base[0]*kk, b=base[1]*kk, c=base[2]*kk;
  var trav=pick(["student","hiker","cyclist","jogger","camper"]);
  var q=numq("A "+trav+" travels "+a+" m east along one trail and then "+b+" m north along a second trail. A straight trail leads directly from the end of the trip back to the start. How many metres shorter is the straight trail back than the route travelled, in metres?", (a+b)-c, 0.01,
    "The straight trail is the hypotenuse of a right triangle with legs "+a+" and "+b+": \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(c*c)+" \\\\ d &= "+c+" \\end{aligned} \\] The walked route is \\("+a+" + "+b+" = "+(a+b)+" \\) m, so the saving is \\("+(a+b)+" - "+c+" = "+((a+b)-c)+" \\) m. The answer is <b>"+((a+b)-c)+" m</b>.",
    {mode:"shortcut-saving", a:a, b:b}); q.figure=triSVG(c,b,a,{L:["A","B","C"],side:["?",b+" m",a+" m"]}); return q;
}, ["Compare the straight-line distance with the total of the two walked legs.", "Find the straight-line distance with the Pythagorean theorem first, then subtract it from the walked total."]);

E("u1-diagonal-mc-gap", 1, ["9.12", "6.32"], 2, "gen", function(){
  var a=0, b=0, correct=0, dWrong=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    a=ri(4,15); b=ri(4,15); if(a===b) continue;
    var sq=Math.sqrt(a*a+b*b); if(Math.abs(sq-Math.round(sq))<1e-9) continue;
    correct=sq; dWrong=Math.sqrt(Math.abs(a*a-b*b));
    var strs=[fmtF(correct,1), fmtF(a*a+b*b,1), fmtF(a+b,1), fmtF(dWrong,1)];
    if(new Set(strs).size===4) ok=true;
  }
  if(!ok){ a=7; b=9; correct=Math.sqrt(130); dWrong=Math.sqrt(32); }
  var q=mcq("A rectangular hall is "+a+" m long and "+b+" m wide. What is the distance from one corner of the hall to the opposite corner, in metres? Give your answer to one decimal place.",
    {t:fmtF(correct,1), fb:"Yes: the corner-to-corner distance is the hypotenuse of a right triangle with legs "+a+" and "+b+"."},
    [{t:fmtF(a*a+b*b,1), fb:"That adds the squares of the sides but stops before taking the square root."},
     {t:fmtF(a+b,1), fb:"That adds the length and the width, which is the path along two walls, not the straight distance."},
     {t:fmtF(dWrong,1), fb:"That subtracts the squares of the sides, which treats one side as the hypotenuse; the diagonal is longer than either side."}],
    "The diagonal is the hypotenuse of a right triangle with legs "+a+" and "+b+": \\[ \\begin{aligned} d^{2} &= "+a+"^{2} + "+b+"^{2} \\\\ &= "+(a*a+b*b)+" \\\\ d &= \\sqrt{"+(a*a+b*b)+"} \\\\ &\\approx "+fmtF(correct,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(correct,1)+" m</b>.",
    {mode:"diagonal-mc", a:a, b:b}); q.figure=m8RectDiagSVG(a,b,a+" m",b+" m","?"); return q;
}, ["The corner-to-corner distance is the slanted side of a right triangle hidden in the rectangle.", "Square the length and the width, add, then take the square root and round to one decimal place."]);

/* Unit 2: Integers */
E("u2-square-minus-product-gap", 2, ["6.18", "6.27"], 2, "gen", function(){
  var a=ri(3,9);
  var b=0, c=0; while(b===0) b=ri(-9,9); while(c===0) c=ri(-8,8);
  var prod=b*c, val=a*a-prod;
  return numq("Evaluate: \\( (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Work out the square and the product first: \\[ \\begin{aligned} (-"+a+")^{2} - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+(a*a)+" - "+u2sg(prod)+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {mode:"square-minus-product", a:a, b:b, c:c});
}, ["The square of a negative number is positive, and the product follows the sign rules.", "Evaluate the squared term and the product separately, then subtract."]);

E("u2-missing-factor-follow-gap", 2, ["6.22", "6.24"], 2, "gen", function(){
  var s=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var x=0; while(x===0) x=ri(-12,12);
  var P=s*x;
  var t=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]);
  var ans=x*t;
  return numq("A number multiplied by \\("+s+"\\) gives \\("+P+"\\). What is the result when that same number is multiplied by \\("+t+"\\)?", ans, 0.01,
    "First find the number by dividing, using the sign rule for quotients: \\[ \\begin{aligned} \\text{number} &= "+P+" \\div "+u2sg(s)+" \\\\ &= "+x+" \\end{aligned} \\] Then multiply that number by "+t+": \\("+x+" \\times "+u2sg(t)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"missing-factor-follow", s:s, x:x, t:t});
}, ["The first sentence hides the number, so recover it before doing the second multiplication.", "Divide the product by the known factor to find the number, then multiply by the new factor."]);

E("u2-fifth-day-temp-gap", 2, ["6.27", "6.26"], 2, "gen", function(){
  var temps=null, fifth=0, mean=0;
  for(var att=0; att<400 && !temps; att++){
    var ts=[ri(-11,4), ri(-11,4), ri(-11,4), ri(-11,4)], f=ri(-11,4);
    var tot=ts[0]+ts[1]+ts[2]+ts[3]+f;
    if(tot%5===0){ temps=ts; fifth=f; mean=tot/5; }
  }
  if(!temps){ temps=[-6,-2,0,3]; fifth=0; mean=-1; }
  var sum4=temps[0]+temps[1]+temps[2]+temps[3];
  return numq("The noon temperatures on the first four days of a week were "+temps[0]+", "+temps[1]+", "+temps[2]+" and "+temps[3]+" degrees Celsius. The mean noon temperature for the five days was "+mean+" degrees Celsius. What was the noon temperature on the fifth day, in degrees Celsius?", fifth, 0.01,
    "The mean gives the five-day total first: \\[ \\begin{aligned} \\text{total} &= 5 \\times "+u2sg(mean)+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] The first four days total \\("+temps[0]+" + "+u2sg(temps[1])+" + "+u2sg(temps[2])+" + "+u2sg(temps[3])+" = "+sum4+"\\), so the fifth day is \\("+(5*mean)+" - "+u2sg(sum4)+" = "+fifth+"\\). The answer is <b>"+fifth+"</b>.",
    {mode:"fifth-day-temp", temps:temps.join(","), mean:mean});
}, ["A mean over five days fixes the total of all five values, not just the fifth one.", "Multiply the mean by five to get the total, then subtract the four known temperatures."]);

E("u2-chain-negative-divisor-gap", 2, ["6.27"], 2, "gen", function(){
  var s=pick([-6,-5,-4,-3,-2,2,3,4,5,6]);
  var q=0; while(q===0) q=ri(-9,9);
  var R=s*q;
  var a=ri(-10,14);
  var b=0, c=0; while(b===0) b=ri(-8,8); while(c===0) c=ri(-8,8);
  var val=a+q-b*c;
  return numq("Evaluate: \\( "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" \\)", val, 0.01,
    "Do the division and the multiplication before the addition and subtraction: \\[ \\begin{aligned} "+a+" + "+u2sg(R)+" \\div "+u2sg(s)+" - "+u2sg(b)+" \\times "+u2sg(c)+" &= "+a+" + "+u2sg(q)+" - "+u2sg(b*c)+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {mode:"chain-negative-divisor", a:a, s:s, b:b, c:c});
}, ["Division and multiplication rank ahead of addition and subtraction, and each follows the sign rules.", "Work out the quotient and the product separately, then combine the three values."]);

E("u2-two-divers-gap", 2, ["6.26"], 2, "gen", function(){
  var posA=0, posB0=0, rise=0, posB=0, ans=0, ok=false;
  for(var att=0; att<300 && !ok; att++){
    posA=-ri(10,32); posB0=-ri(8,30); rise=ri(3,12); posB=posB0+rise;
    ans=Math.abs(posA-posB);
    if(posB<0 && ans>=2) ok=true;
  }
  if(!ok){ posA=-24; posB0=-14; rise=4; posB=-10; ans=14; }
  return numq("Positions below the surface of the water are written as negative numbers. One diver is at \\("+posA+"\\) m. A second diver starts at \\("+posB0+"\\) m and rises "+rise+" m. How many metres apart are the two divers vertically after the rise?", ans, 0.01,
    "First update the second diver's position: \\("+posB0+" + "+rise+" = "+posB+"\\). Then find the distance between the two positions: \\[ \\begin{aligned} \\text{distance} &= "+u2sg(posA)+" - "+u2sg(posB)+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" m</b>.",
    {mode:"two-divers", posA:posA, posB0:posB0, rise:rise});
}, ["The second diver moves before the distance can be found, so update that position first.", "Add the rise to the second diver's starting position, then subtract the two positions."]);

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
  return numq("A garden bed is "+u3disp(P.imp1, P.d1)+" m long and "+u3disp(P.imp2, P.d2)+" m wide. What is the area of the bed, in square metres? Give your answer as a decimal.", P.val, 0.01,
    "Write both mixed numbers as improper fractions and multiply: \\[ \\begin{aligned} "+P.w1+FR(P.n1, P.d1)+" \\times "+P.w2+FR(P.n2, P.d2)+" &= "+FR(P.imp1, P.d1)+" \\times "+FR(P.imp2, P.d2)+" \\\\ &= "+FR(rr[0], rr[1])+" \\\\ &= "+fmt(P.val)+" \\end{aligned} \\] The answer is <b>"+fmt(P.val)+"</b>.",
    {mode:"area-decimal", imp1:P.imp1, d1:P.d1, imp2:P.imp2, d2:P.d2});
}, ["Area is length times width, and mixed numbers multiply most easily as improper fractions.", "Convert both measurements to improper fractions, multiply, then write the product as a decimal."]);

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
  return numq("A tank holds "+T+" L of juice. The juice is poured into bottles that each hold "+u3disp(n, d)+" L. How many bottles are needed to hold all of the juice?", ans, 0.01,
    "Divide the total by the size of one bottle: \\[ \\begin{aligned} "+T+" \\div "+FR(n, d)+" &= "+T+" \\times "+FR(d, n)+" \\\\ &= "+fmt(Math.round(q*100)/100)+" \\end{aligned} \\] A part-filled bottle still counts as a bottle, so the count rounds up to the next whole number. The answer is <b>"+ans+"</b>.",
    {mode:"bottles-roundup", T:T, n:n, d:d});
}, ["Dividing by the bottle size gives the count, but a part-filled bottle still needs a bottle.", "Divide the total by the fraction, then round the result up to a whole number of bottles."]);

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
  return numq("Evaluate: \\("+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\). Give your answer as a decimal.", P.val, 0.01,
    "The multiplication is done before the subtraction: \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" - "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" - "+FR(prod[0], prod[1])+" \\\\ &= "+fmt(P.val)+" \\end{aligned} \\] The answer is <b>"+fmt(P.val)+"</b>.",
    {mode:"chain-subtract-product", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["One operation in the chain outranks the other, so the order changes the result.", "Work out the product of the two fractions first, then subtract it from the first fraction."]);

E("u3-chain-mc-gap", 3, ["6.16", "6.15"], 2, "gen", function(){
  var P=null;
  for(var att=0; att<600 && !P; att++){
    var d1=pick([2,4,5,8,10]), n1=ri(1,d1-1);
    var d2=pick([2,4,5,8,10]), n2=ri(1,d2-1);
    var d3=pick([2,4,5,8,10]), n3=ri(1,d3-1);
    var a=n1/d1, b=n2/d2, c=n3/d3;
    var correct=a+b*c, l2r=(a+b)*c, sumAll=a+b+c, wrongProd=a+(n2*n3)/(d2+d3);
    var vals=[correct, l2r, sumAll, wrongProd];
    var strs=vals.map(function(v){ return fmtF(v,3); });
    if(new Set(strs).size<4) continue;
    if(vals.some(function(v){ return v<=0; })) continue;
    if(Math.abs(correct*1000-Math.round(correct*1000))>1e-9) continue;
    P={n1:n1, d1:d1, n2:n2, d2:d2, n3:n3, d3:d3, correct:Math.round(correct*1000)/1000, l2r:l2r, sumAll:sumAll, wrongProd:wrongProd};
  }
  if(!P) P={n1:1, d1:2, n2:3, d2:4, n3:2, d3:5, correct:0.8, l2r:0.5, sumAll:1.65, wrongProd:0.5+6/9};
  var prod=u3red(P.n2*P.n3, P.d2*P.d3);
  return mcq("What is the value of \\("+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+"\\)?",
    {t:fmtF(P.correct,3), fb:"Yes: the multiplication is done first, then the sum is completed."},
    [{t:fmtF(P.l2r,3), fb:"That works from left to right, adding before multiplying, which breaks the order of operations."},
     {t:fmtF(P.sumAll,3), fb:"That adds all three fractions and never multiplies."},
     {t:fmtF(P.wrongProd,3), fb:"That multiplies by adding the denominators; fraction multiplication multiplies the denominators instead."}],
    "Multiplication is done before addition: \\[ \\begin{aligned} "+FR(P.n1, P.d1)+" + "+FR(P.n2, P.d2)+" \\times "+FR(P.n3, P.d3)+" &= "+FR(P.n1, P.d1)+" + "+FR(prod[0], prod[1])+" \\\\ &= "+fmt(P.correct)+" \\end{aligned} \\] The answer is <b>"+fmt(P.correct)+"</b>.",
    {mode:"chain-mc", n1:P.n1, d1:P.d1, n2:P.n2, d2:P.d2, n3:P.n3, d3:P.d3});
}, ["One operation in the chain outranks the other, so the order changes the result.", "Work out the product of the two fractions first, then add the first fraction."]);


/* Unit 4: Measuring Prisms and Cylinders */
E("u4-tank-litres-gap", 4, ["9.9", "9.11"], 2, "gen", function(){
  var r=pick([4,5,6,8,10,12,15,20]); var d=2*r; var h=ri(6,40);
  var vol=3.14*r*r*h;
  var litres=Math.round(vol/10)/100;
  var ctx=pick(["storage tank","water barrel","feed silo","rain barrel"]);
  var q=numq("A cylindrical "+ctx+" has a diameter of "+d+" cm and a height of "+h+" cm. How many litres of water does it hold when full? Use \\(\\pi = 3.14\\), and use 1000 cm\\(^{3}\\) = 1 L. Give your answer to two decimal places.", litres, 0.02,
    "Halve the diameter to get the radius, then find the volume: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(vol)+" \\text{ cm}^{3} \\end{aligned} \\] Convert to litres: \\("+fmt(vol)+" \\div 1000 = "+fmt(litres)+"\\). The answer is <b>"+fmt(litres)+" L</b>.",
    {mode:"tank-litres", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["The formula needs the radius, and the question asks for litres rather than cubic centimetres.", "Halve the diameter first, find the volume, then divide by 1000 to change the unit."]);

E("u4-open-box-sa-gap", 4, ["9.3", "10.3"], 2, "gen", function(){
  var l=ri(4,14), w=ri(3,11), h=ri(2,9);
  var sa=l*w+2*l*h+2*w*h;
  var q=numq("An open-top storage box is shaped like a right rectangular prism. It is "+l+" cm long, "+w+" cm wide and "+h+" cm high, and it has no lid. Cardboard is used for the bottom and the four sides only. How many square centimetres of cardboard are needed?", sa, 0.01,
    "An open top means the top face is missing, so count the bottom and the four side faces: \\[ \\begin{aligned} SA &= lw + 2lh + 2wh \\\\ &= "+(l*w)+" + "+(2*l*h)+" + "+(2*w*h)+" \\\\ &= "+sa+" \\end{aligned} \\] The answer is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"open-box-sa", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm",h+" cm",true); return q;
}, ["An open top changes which faces exist, so list the faces before calculating.", "Find the area of the bottom first, then add the two pairs of side faces."]);

/* Unit 5: Percent, Ratio and Rate */
E("u5-down-then-up-gap", 5, ["6.2", "6.1"], 2, "gen", function(){
  var item=pick(["kayak","stand-up paddleboard","greenhouse kit","snowboard","fishing rod set","garden shed kit"]);
  var P=pick([80,120,150,200,240,300,360,400]);
  var d1=pick([10,20,25,30,40,50]), d2=pick([5,10,15,20,25,30]);
  var afterDown=u5r2(P*(1-d1/100));
  var fin=u5r2(afterDown*(1+d2/100));
  return numq("A "+item+" is priced at $"+fmtF(P,2)+". Its price is first reduced by "+d1+"%. The reduced price is then increased by "+d2+"%. What is the final price, in dollars?", fin, 0.01,
    "Each percent acts on the price at that stage. After the reduction: \\[ \\begin{aligned} \\text{reduced price} &= "+fmtF(P,2)+" \\times "+fmt(1-d1/100,2)+" \\\\ &= "+fmtF(afterDown,2)+" \\end{aligned} \\] After the increase on the new price: \\[ \\begin{aligned} \\text{final price} &= "+fmtF(afterDown,2)+" \\times "+fmt(1+d2/100,2)+" \\\\ &= "+fmtF(fin,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(fin,2)+"</b>.",
    {mode:"down-then-up", P:P, d1:d1, d2:d2});
}, ["The second percent acts on the reduced price, not on the starting price.", "Find the reduced price first, then apply the increase to that amount."]);

E("u5-unit-rate-cost-gap", 5, ["6.29"], 2, "gen", function(){
  var goods=[["muffins","muffin"],["juice boxes","juice box"],["granola bars","granola bar"],["yogurt cups","yogurt cup"],["bagels","bagel"]];
  var g=pick(goods);
  var q1=pick([4,5,8,10,20,25]);
  var unit=pick([0.75,1.25,1.5,1.75,2.25,2.5,3.25,3.5,4.75]);
  var C=u5r2(q1*unit);
  var q2=ri(3,30); if(q2===q1) q2=q1+3;
  var ans=u5r2(unit*q2);
  return numq("A pack of "+q1+" "+g[0]+" costs $"+fmtF(C,2)+". At this rate, what is the cost of "+q2+" "+g[0]+", in dollars?", ans, 0.01,
    "Find the cost of one "+g[1]+" first: \\[ \\begin{aligned} \\text{unit rate} &= "+fmtF(C,2)+" \\div "+q1+" \\\\ &= "+fmtF(unit,2)+" \\text{ dollars per "+g[1]+"} \\end{aligned} \\] Then multiply by the new quantity: \\("+fmtF(unit,2)+" \\times "+q2+" = "+fmtF(ans,2)+"\\). The answer is <b>$"+fmtF(ans,2)+"</b>.",
    {mode:"unit-rate-cost", q1:q1, q2:q2});
}, ["The cost per single item is the bridge between the two quantities.", "Divide the pack cost by the pack size to get the unit rate, then multiply by the new quantity."]);

E("u5-ratio-part-percent-gap", 5, ["6.28", "3.11"], 2, "gen", function(){
  var pair=pick([[1,3],[3,1],[1,4],[4,1],[2,3],[3,2],[3,7],[7,3],[1,9],[9,1],[4,6],[6,4],[2,8],[8,2]]);
  var sum=pair[0]+pair[1], big=Math.max(pair[0], pair[1]);
  var A=sum*ri(20,120);
  var bigPart=A*big/sum;
  var pct=big*100/sum;
  var ctx=pick([["A school club divides"," between its art team and its music team"],["A trail crew divides"," between two work crews"],["A bakery divides"," between its two ovens"]]);
  return numq(ctx[0]+" $"+A+" in the ratio "+pair[0]+" : "+pair[1]+ctx[1]+". The larger share is what percent of the whole amount?", pct, 0.01,
    "First find the larger share. The ratio has "+sum+" parts in total, so each part is \\("+A+" \\div "+sum+" = "+(A/sum)+"\\), and the larger share is \\("+big+" \\times "+(A/sum)+" = "+bigPart+"\\). Then express it as a percent of the whole: \\[ \\begin{aligned} \\text{percent} &= "+bigPart+" \\div "+A+" \\times 100 \\\\ &= "+pct+"\\% \\end{aligned} \\] The answer is <b>"+pct+"%</b>.",
    {mode:"ratio-part-percent", pair:pair.join(":"), A:A});
}, ["Work with the shares themselves before turning one share into a percent.", "Add the ratio parts, find the value of the larger share, then divide it by the whole amount."]);

E("u5-find-whole-mc-gap", 5, ["6.1"], 2, "gen", function(){
  var W=0, p=0, part=0, ok=false;
  for(var att=0; att<400 && !ok; att++){
    W=pick([200,300,400,500,600]);
    p=pick([12,15,16,20,24,25,30,32,40,48,50,60,64,75,80]);
    part=W*p/100;
    if(part!==Math.round(part) || part<10) continue;
    if((part*p)%100!==0) continue;
    var vals=[W, part*p, part*p/100, W/100];
    if(new Set(vals.map(function(v){ return fmt(v); })).size<4) continue;
    ok=true;
  }
  if(!ok){ W=400; p=20; part=80; }
  var ctxs=[
    {q:part+" students is "+p+"% of the students in a school. How many students are in the school?", unit:"students"},
    {q:"A team scored "+part+" points, which is "+p+"% of the points it needs for a banner. How many points does the team need in total?", unit:"points"},
    {q:"After a morning sale, "+part+" tickets remained unsold, and that is "+p+"% of the tickets printed. How many tickets were printed?", unit:"tickets"}
  ];
  var cx=pick(ctxs);
  return mcq(cx.q,
    {t:fmt(W), fb:"Yes: the part is divided by the percent written as a decimal to recover the whole."},
    [{t:fmt(part*p), fb:"That multiplies the part by the whole percent number, which grows the part instead of recovering the whole."},
     {t:fmt(part*p/100), fb:"That finds the percent of the part itself, which is smaller than the part."},
     {t:fmt(W/100), fb:"That divides the part by the percent number without writing the percent as a decimal first."}],
    "The part and its percent give the whole when the part is divided by the percent as a decimal: \\[ \\begin{aligned} \\text{whole} &= "+part+" \\div "+fmt(p/100,2)+" \\\\ &= "+W+" \\end{aligned} \\] The answer is <b>"+W+" "+cx.unit+"</b>.",
    {mode:"find-whole-mc", p:p, part:part});
}, ["The given amount is only the named percent of the whole, so the whole is larger than the part.", "Write the percent as a decimal first, then divide the part by that decimal."]);

/* Unit 6: Linear Equations and Graphing */
E("u6-decimal-coefficient-gap", 6, ["8.1", "8.4"], 2, "gen", function(){
  var a=pick([0.2,0.25,0.4,0.5,0.75,1.25,1.5,2.5]);
  var x=ri(3,16);
  var b=pick([0.5,1,1.5,2,2.5,3,4,5,6,7,8]);
  var ax=a*x, c=ax+b;
  return numq("Solve the equation \\("+fmt(a)+"x + "+fmt(b)+" = "+fmt(c)+"\\). What is the value of x?", x, 0.01,
    "Undo the steps in reverse order: subtract first, then divide: \\[ \\begin{aligned} "+fmt(a)+"x + "+fmt(b)+" &= "+fmt(c)+" \\\\ "+fmt(a)+"x &= "+fmt(c)+" - "+fmt(b)+" \\\\ "+fmt(a)+"x &= "+fmt(ax)+" \\\\ x &= "+fmt(ax)+" \\div "+fmt(a)+" \\\\ x &= "+fmt(x)+" \\end{aligned} \\] The answer is <b>\\(x = "+fmt(x)+"\\)</b>.",
    {mode:"decimal-coefficient", a:a, b:b});
}, ["Undo what was done to x in reverse order: the added number comes off first.", "Subtract the constant from both sides, then divide both sides by the decimal coefficient of x."]);

E("u6-two-points-evaluate-gap", 6, ["7.2", "7.3"], 2, "gen", function(){
  var m=pick([-4,-3,-2,-1,1,2,3,4]);
  var b=ri(-8,10);
  var x1=ri(-2,3), dx=ri(2,4), x2=x1+dx;
  var y1=m*x1+b, y2=m*x2+b;
  var x3=(Math.random()<0.5)?(x2+ri(1,4)):(x1-ri(1,3));
  var ans=m*x3+b;
  return numq("A linear relation passes through the points ("+x1+", "+y1+") and ("+x2+", "+y2+"). What is the y-value of this relation when x = "+x3+"?", ans, 0.01,
    "First extract the rate of change from the two points: \\[ \\begin{aligned} \\text{rate} &= \\frac{"+y2+" - "+u2sg(y1)+"}{"+x2+" - "+u2sg(x1)+"} \\\\ &= \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} \\\\ &= "+m+" \\end{aligned} \\] The relation is \\(y = "+fmt(m)+"x + "+u2sg(b)+"\\), so at \\(x = "+x3+"\\): \\(y = "+fmt(m)+" \\times "+u2sg(x3)+" + "+u2sg(b)+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"two-points-evaluate", x1:x1, y1:y1, x2:x2, y2:y2, x3:x3});
}, ["The two points hide the rate of change, which must be recovered before the relation can be used.", "Find the rate of change from the two points first, then build the relation and substitute the new x."]);

/* Unit 7: Data Analysis and Probability */
E("u7-expected-count-gap", 7, ["12.4", "12.2"], 2, "gen", function(){
  var S=pick([4,5,8,10,20]), F=ri(1,S-1);
  var colour=pick(["red","blue","green","gold","purple","orange"]);
  var k=ri(3,12), N=2*S*k, ans=F*k;
  return numq("A coin is tossed and a spinner with "+S+" equal sections, "+F+" of them "+colour+", is spun at the same time. This pair of actions is repeated "+N+" times. How many times would you expect heads and "+colour+" to occur together?", ans, 0.01,
    "The toss and the spin are independent, so multiply their probabilities, then scale by the number of repeats: \\[ \\begin{aligned} P &= "+FR(1,2)+" \\times "+FR(F,S)+" \\\\ &= "+FR(F,2*S)+" \\\\ \\text{expected} &= "+FR(F,2*S)+" \\times "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {mode:"expected-count", S:S, F:F, N:N});
}, ["An expected count starts from the probability of the combined event.", "Multiply the two separate probabilities first, then multiply by the number of repeats."]);

E("u7-missing-mean-value-gap", 7, ["11.1"], 2, "gen", function(){
  var vals=null, fifth=0, mean=0;
  for(var att=0; att<400 && !vals; att++){
    var vs=[ri(4,30), ri(4,30), ri(4,30), ri(4,30)], f=ri(4,30);
    var tot=vs[0]+vs[1]+vs[2]+vs[3]+f;
    if(tot%5===0){ vals=vs; fifth=f; mean=tot/5; }
  }
  if(!vals){ vals=[12,18,10,20]; fifth=15; mean=15; }
  var sum4=vals[0]+vals[1]+vals[2]+vals[3];
  return numq("A player scored "+vals[0]+", "+vals[1]+", "+vals[2]+" and "+vals[3]+" points in the first four games of a tournament. The mean score over five games was "+mean+" points. How many points did the player score in the fifth game?", fifth, 0.01,
    "The mean fixes the five-game total first: \\[ \\begin{aligned} \\text{total} &= 5 \\times "+mean+" \\\\ &= "+(5*mean)+" \\end{aligned} \\] The first four games total "+sum4+" points, so the fifth game is \\("+(5*mean)+" - "+sum4+" = "+fifth+"\\). The answer is <b>"+fifth+"</b>.",
    {mode:"missing-mean-value", vals:vals.join(","), mean:mean});
}, ["A mean over five games fixes the total of all five scores, not just the missing one.", "Multiply the mean by five to get the total, then subtract the four known scores."]);

E("u7-mean-difference-gap", 7, ["11.1"], 2, "gen", function(){
  var A=null, B=null, meanA=0, meanB=0, ans=0;
  for(var att=0; att<400 && !A; att++){
    var as=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var bs=[ri(5,25), ri(5,25), ri(5,25), ri(5,25), ri(5,25)];
    var sa=as.reduce(function(x,y){return x+y;},0), sb=bs.reduce(function(x,y){return x+y;},0);
    if(Math.abs(sa-sb)>=5){ A=as; B=bs; meanA=sa/5; meanB=sb/5; ans=Math.round(Math.abs(meanA-meanB)*10)/10; }
  }
  if(!A){ A=[10,12,14,16,18]; B=[6,8,10,12,14]; meanA=14; meanB=10; ans=4; }
  return numq("Two players record their points in five games. Player One scored "+A.join(", ")+". Player Two scored "+B.join(", ")+". By how many points do the two mean scores differ?", ans, 0.01,
    "Find each mean separately: \\[ \\begin{aligned} \\text{mean One} &= "+fmt(meanA,1)+" \\\\ \\text{mean Two} &= "+fmt(meanB,1)+" \\end{aligned} \\] The difference is \\("+fmt(Math.max(meanA,meanB),1)+" - "+fmt(Math.min(meanA,meanB),1)+" = "+fmt(ans,1)+"\\). The answer is <b>"+fmt(ans,1)+"</b>.",
    {mode:"mean-difference", A:A.join(","), B:B.join(",")});
}, ["Each data set has its own mean, and the question compares the two means.", "Total each set of five scores and divide by five, then subtract the smaller mean from the larger."]);

E("u7-two-colours-twice-gap", 7, ["12.4", "12.1"], 2, "gen", function(){
  var a=ri(6,14); if(a===10) a=11;
  var b=20-a;
  var pair=pick([["red","blue"],["green","gold"],["white","black"],["purple","orange"]]);
  var item=pick(["marbles","counters","beads"]);
  var ans=(a*a+b*b)/4;
  return numq("A bag holds "+a+" "+pair[0]+" and "+b+" "+pair[1]+" "+item+", for a total of 20 "+item+". One is drawn, replaced, and another is drawn. What is the probability that the two drawn "+item+" are the same colour as each other? Give your answer as a percent.", ans, 0.01,
    "Same colour can happen two ways, and the draws are independent: \\[ \\begin{aligned} P &= "+FR(a,20)+" \\times "+FR(a,20)+" + "+FR(b,20)+" \\times "+FR(b,20)+" \\\\ &= "+FR(a*a,400)+" + "+FR(b*b,400)+" \\\\ &= "+fmt(ans)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(ans)+"%</b>.",
    {mode:"two-colours-twice", a:a, b:b});
}, ["Same colour has more than one way to happen, and each way is a product of two draws.", "Find the probability of the first colour twice and of the second colour twice, then add them."]);

E("u7-survey-scale-gap", 7, ["12.2"], 2, "gen", function(){
  var n=pick([20,25,40,50]), s=ri(2,n-2);
  var mult=ri(6,18), N=n*mult, ans=s*mult;
  var mode=pick(["walk to school","take the bus to school","bring a lunch from home"]);
  return numq("In a survey, "+s+" of the "+n+" students asked said they "+mode+". The whole school has "+N+" students. Based on the survey, how many students in the school would you expect to "+mode+"?", ans, 0.01,
    "The survey gives a proportion first: \\("+FR(s,n)+"\\) of students. Scale that proportion to the whole school: \\[ \\begin{aligned} \\text{expected} &= "+FR(s,n)+" \\times "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {mode:"survey-scale", n:n, s:s, N:N});
}, ["The survey fraction describes the sample, and the question asks about the whole school.", "Write the survey result as a fraction first, then multiply it by the school population."]);

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
  return numq("Group One has "+n1+" students with a mean quiz score of "+m1+". Group Two has "+n2+" students with a mean quiz score of "+m2+". What is the mean quiz score of the two groups combined?", ans, 0.01,
    "Recover each group total from its mean before combining: \\[ \\begin{aligned} \\text{total One} &= "+n1+" \\times "+m1+" = "+(n1*m1)+" \\\\ \\text{total Two} &= "+n2+" \\times "+m2+" = "+(n2*m2)+" \\\\ \\text{combined mean} &= \\frac{"+(n1*m1+n2*m2)+"}{"+(n1+n2)+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"combined-mean", n1:n1, m1:m1, n2:n2, m2:m2});
}, ["A combined mean is a total divided by a total, not the average of the two means.", "Multiply each mean by its group size to get the group totals, then add the totals and the group sizes."]);

E("u7-two-events-mc-gap", 7, ["12.3", "12.4"], 2, "gen", function(){
  var S1=0, F1=0, S2=0, F2=0, ok=false;
  var correct=0, add=0, first=0, second=0;
  for(var att=0; att<400 && !ok; att++){
    S1=pick([4,5,8,10]); F1=ri(1,S1-1); S2=pick([4,5,8,10,20]); F2=ri(1,S2-1);
    correct=F1*F2*100/(S1*S2); add=(F1/S1+F2/S2)*100; first=F1/S1*100; second=F2/S2*100;
    if(add>100) continue;
    var strs=[correct, add, first, second].map(function(v){ return fmtF(v,2); });
    if(new Set(strs).size<4) continue;
    ok=true;
  }
  if(!ok){ S1=8; F1=3; S2=10; F2=4; correct=15; add=77.5; first=37.5; second=40; }
  var c1=pick(["red","blue","green","gold"]), c2=pick(["purple","orange","white","black"]);
  return mcq("One spinner has "+S1+" equal sections with "+F1+" coloured "+c1+", and a second spinner has "+S2+" equal sections with "+F2+" coloured "+c2+". Both spinners are spun. What is the probability of landing on "+c1+" on the first spinner and "+c2+" on the second spinner?",
    {t:fmtF(correct,2)+"%", fb:"Yes: the spins are independent, so the two probabilities are multiplied."},
    [{t:fmtF(add,2)+"%", fb:"That adds the two probabilities; probabilities of combined independent events are multiplied, not added."},
     {t:fmtF(first,2)+"%", fb:"That is the probability for the first spinner only; the second spin also has to land on its colour."},
     {t:fmtF(second,2)+"%", fb:"That is the probability for the second spinner only; the first spin also has to land on its colour."}],
    "The spins are independent, so multiply: \\[ \\begin{aligned} P &= "+FR(F1,S1)+" \\times "+FR(F2,S2)+" \\\\ &= "+fmt(correct,2)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(correct,2)+"%</b>.",
    {mode:"two-events-mc", S1:S1, F1:F1, S2:S2, F2:F2});
}, ["Two spins do not affect each other, so this is a product of two single probabilities.", "Write the probability for each spinner first, then multiply them and write the result as a percent."]);

/* Unit 8: Geometry */
E("u8-hidden-cubes-gap", 8, ["10.9", "10.17"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 10, 20);
  var tot=u8Sum(hm);
  var stacks=0; hm.forEach(function(row){ row.forEach(function(v){ if(v>0) stacks++; }); });
  var ans=tot-stacks;
  var cell=26, body=u8T(160, 14, "Object (numbers = cubes on each square)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Height map of a block object");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. In the top view of the object, only the top cube of each stack shows. How many cubes are NOT visible in the top view?", ans, 0,
    "Count all the cubes first: the stacks total "+tot+" cubes. The top view shows one cube for each stack that has at least one cube, and there are "+stacks+" such stacks. So the hidden cubes are \\("+tot+" - "+stacks+" = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"hidden-cubes", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["The top view hides every cube except the top one of each stack.", "Add all the numbers for the total, then subtract the number of stacks that hold at least one cube."]);

E("u8-rotated-side-view-gap", 8, ["10.10", "10.16"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 6, 12);
  var turns=pick([1,2,3]);
  var rot=u8RotHM(hm, turns);
  var prof=u8SideProf(rot), ans=u8SumArr(prof);
  var dirWord=turns===1 ? "90° clockwise" : (turns===2 ? "180°" : "90° counterclockwise");
  var cell=24, body=u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body+=u8HM(hm, 124, 30, cell);
  var fig=u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned "+dirWord+" on the table, seen from above, and then the right side view is drawn. How many squares show in that side view?", ans, 0,
    "Turn the map "+dirWord+" first. In the side view, each row of the turned map contributes its tallest stack, giving heights "+u8ProfStr(prof)+": \\[ \\begin{aligned} \\text{squares} &= "+prof.join(" + ")+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"rotated-side-view", hm:u8Key(hm), turns:turns});
  q.figure=fig;
  return q;
}, ["The rotation changes which stacks line up in the side view, so turn the map before reading it.", "Turn the height map first, then take the tallest stack in each row of the turned map and add them."]);

E("u8-tiles-at-point-gap", 8, ["10.4"], 2, "gen", function(){
  var scenarios=[[3,6,1,4],[3,6,2,2],[3,4,2,3],[8,4,1,2],[4,3,3,2],[4,8,2,1],[12,3,1,2],[6,3,2,2]];
  var sc=pick(scenarios);
  var nA=sc[0], nB=sc[1], kB=sc[2], ans=sc[3];
  var angA=u8Interior(nA), angB=u8Interior(nB);
  var ctx=pick(["floor tiles","patio stones","quilt blocks","mosaic tiles","bathroom tiles","garden pavers","classroom art tiles","pool deck tiles"]);
  var q=numq("A design made of "+ctx+" uses regular polygon tiles around one point, with no gaps or overlaps. "+kB+" tile"+(kB===1?"":"s")+" shaped as a "+U8_POLY_NAMES[nB]+" "+(kB===1?"is":"are")+" placed at the point, and each "+U8_POLY_NAMES[nB]+" tile has an interior angle of "+fmt(angB)+" degrees. The rest of the point is filled with tiles shaped as a "+U8_POLY_NAMES[nA]+". How many "+U8_POLY_NAMES[nA]+" tiles meet at the point?", ans, 0,
    "First find the interior angle of a "+U8_POLY_NAMES[nA]+": \\[ \\begin{aligned} \\text{interior angle} &= \\frac{("+nA+" - 2) \\times 180°}{"+nA+"} \\\\ &= "+fmt(angA)+"° \\end{aligned} \\] The placed tiles cover \\("+kB+" \\times "+fmt(angB)+"° = "+fmt(kB*angB)+"°\\), leaving \\(360° - "+fmt(kB*angB)+"° = "+fmt(360-kB*angB)+"°\\). Then \\("+fmt(360-kB*angB)+"° \\div "+fmt(angA)+"° = "+ans+"\\). The answer is <b>"+ans+"</b>.",
    {mode:"tiles-at-point", nA:nA, nB:nB, kB:kB}); q.figure=m8PolyRowSVG([[nB,null],[nA,null]]); return q;
}, ["The angles around a point add to 360 degrees, and the second shape's angle is given while the first shape's angle is not.", "Find the interior angle of the first shape from its number of sides, then subtract the placed tiles' angles from 360 and divide."]);

E("u8-cube-volume-gap", 8, ["10.17"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 7, 14);
  var tot=u8Sum(hm), ans=tot*8;
  var cell=26, body=u8T(160, 14, "Build this object (numbers = cubes on each square)", 11, true);
  body+=u8HM(hm, 121, 30, cell);
  var fig=u8Svg(320, 112, body, "Height map of a block object to build");
  var flat=hm[0].concat(hm[1]);
  var q=numq("The diagram is the plan for a block object: each number tells how many cubes are stacked on that square. The object is built from cubes with side length 2 cm. What is the total volume of the object, in cubic centimetres?", ans, 0,
    "Add the stack on every square to count the cubes: \\("+flat.join(" + ")+" = "+tot+" \\) cubes. Each cube has volume \\(2 \\times 2 \\times 2 = 8\\) cm\\(^{3}\\), so the total volume is \\("+tot+" \\times 8 = "+ans+"\\). The answer is <b>"+ans+" cm\\(^{3}\\)</b>.",
    {mode:"cube-volume", hm:u8Key(hm)});
  q.figure=fig;
  return q;
}, ["The plan gives a count of cubes, and the question asks for a volume.", "Add the numbers to count the cubes, then multiply by the volume of one 2 cm cube."]);

E("u8-changed-side-view-gap", 8, ["10.15", "10.9"], 2, "gen", function(){
  var hm=u8RandHM(3, 3, 3, 9, 18);
  var r=ri(0,2), c=ri(0,2), delta=ri(1,2);
  var mod=hm.map(function(row){ return row.slice(); });
  mod[r][c]+=delta;
  var prof=u8SideProf(mod), ans=u8SumArr(prof);
  var rowName=["back","middle","front"][r], colName=["left","middle","right"][c];
  var cell=26, body=u8T(160, 14, "Object before the change (numbers = cubes)", 11, true);
  body+=u8HM(hm, 121, 34, cell);
  var fig=u8Svg(320, 140, body, "Height map of a block object before a change");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. Then "+delta+" cube"+(delta===1?" is":"s are")+" added to the stack in the "+rowName+" row, "+colName+" column. How many squares show in the right side view after the cubes are added?", ans, 0,
    "Update the height map first: the stack in the "+rowName+" row, "+colName+" column grows from "+hm[r][c]+" to "+mod[r][c]+". In the right side view, each row contributes its tallest stack, giving heights "+u8ProfStr(prof)+": \\[ \\begin{aligned} \\text{squares} &= "+prof.join(" + ")+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"changed-side-view", hm:u8Key(hm), r:r, c:c, delta:delta});
  q.figure=fig;
  return q;
}, ["The added cubes change one stack before the side view is read, so update the map first.", "Add the new cubes to the named stack, then take the tallest stack in each row and add them."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-calc-approx":3,"u1-diagonal-square":3,"u1-fence-perimeter-gap":3,"u1-garden-diagonal-gap":2,"u1-grid-distance-gap":2,"u1-hypotenuse":3,"u1-ladder-context":2,"u1-missing-leg":3,"u1-shortcut-saving-gap":3,"u1-square-plot-perimeter":2,"u1-square-side-perimeter-gap":3,"u1-triple-find":2,"u1-two-ladders-gap":3,"u2-chain-negative-divisor-gap":3,"u2-div-2by1":3,"u2-div-2by2":3,"u2-fifth-day-temp-gap":3,"u2-missing-factor-follow-gap":3,"u2-mixed-problem":2,"u2-mult-problem":3,"u2-ooo-brackets-num":3,"u2-ooo-num":2,"u2-sign-product-problem":2,"u2-square-minus-product-gap":2,"u2-two-divers-gap":3,"u3-area-decimal-gap":2,"u3-bottles-roundup-gap":3,"u3-chain-subtract-product-gap":3,"u3-divide-mixed-cr":3,"u3-divide-word-cr":2,"u3-mixed-multistep-cr":3,"u3-model-division-bar":3,"u3-mult-div-chain-cr":2,"u3-multiply-mixed-cr":3,"u3-order-of-ops-fractions":2,"u4-open-box-sa-gap":3,"u4-sa-cylinder":3,"u4-sa-open-tank":3,"u4-sa-problem-wrap":2,"u4-sa-rect-prism":3,"u4-sa-tri-prism":3,"u4-tank-litres-gap":2,"u4-vol-cylinder-diam":2,"u4-vol-tri-prism":2,"u5-discount-then-tax":3,"u5-down-then-up-gap":3,"u5-find-the-whole":3,"u5-percent-change":3,"u5-percent-of-number":3,"u5-percent-of-percent-quantity":2,"u5-rate-problem-solve":2,"u5-ratio-part-percent-gap":3,"u5-ratio-problem-solve":2,"u5-unit-rate-cost-gap":3,"u6-decimal-coefficient-gap":2,"u6-graph-extend-pair":2,"u6-missing-ordered-pair":2,"u6-missing-ordered-pair-backward":2,"u6-solve-context-problem":3,"u6-solve-distributive":3,"u6-solve-div-plus":2,"u6-solve-group-problem":3,"u6-solve-two-step":3,"u6-two-points-evaluate-gap":3,"u7-apparent-height-ratio":2,"u7-apply-rule-percent":2,"u7-combined-mean-gap":3,"u7-expected-count-gap":2,"u7-fix-the-graph":2,"u7-mean-difference-gap":3,"u7-missing-mean-value-gap":2,"u7-name-the-trick":3,"u7-same-colour-twice":3,"u7-survey-scale-gap":3,"u7-two-colours-twice-gap":3,"u7-two-draws-percent":3,"u7-two-spinners-decimal":3,"u8-around-point-num":3,"u8-build-max-num":3,"u8-changed-side-view-gap":3,"u8-cube-volume-gap":3,"u8-cubes-total-num":3,"u8-front-squares-num":3,"u8-hidden-cubes-gap":2,"u8-irregular-angle-num":2,"u8-mixed-point-num":2,"u8-rotate-front-num":2,"u8-rotated-side-view-gap":3,"u8-tiles-at-point-gap":3};
