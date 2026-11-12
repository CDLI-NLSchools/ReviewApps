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


