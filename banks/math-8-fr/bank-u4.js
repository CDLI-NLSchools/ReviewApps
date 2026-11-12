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
