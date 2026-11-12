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



