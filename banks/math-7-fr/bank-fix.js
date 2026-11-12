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


