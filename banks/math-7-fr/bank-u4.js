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

