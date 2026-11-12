// Math 9 (French) Unit 2 top-up question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 1809 to 1990).
/* Top-up tranche (November 7, 2026): Unit 2 additions from tranche1/unit2-topup.js */
/* Unit 2 top-up tranche: five companion entries. Helpers u2gcd, u2r1, u2r2,
   u2d3 and u2nonSquare are defined in unit2.js and the assembled bank. */

E("u2-sqrt-fraction", 2, ["6.9"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var a=ri(2,15), b=ri(2,15), g=0;
    while(u2gcd(a,b)!==1&&g<60){a=ri(2,15);b=ri(2,15);g++;}
    var correct="\\("+FR(a,b)+"\\)";
    var cands=[
      {t:"\\("+FR(a,b*b)+"\\)", fb:"Cela prend la racine du haut seulement : il faut aussi prendre la racine du bas."},
      {t:"\\("+FR(a*a,b)+"\\)", fb:"Cela prend la racine du bas seulement : il faut aussi prendre la racine du haut."},
      {t:"\\("+FR(a+1,b)+"\\)", fb:"En le mettant au carré, on obtient un haut de "+((a+1)*(a+1))+", et non "+(a*a)+" : vérifie les deux parties."},
      {t:"\\("+FR(a,b+1)+"\\)", fb:"En le mettant au carré, on obtient un bas de "+((b+1)*(b+1))+", et non "+(b*b)+" : vérifie les deux parties."},
      {t:"\\("+FR(a+1,b+1)+"\\)", fb:"En le mettant au carré, on change les deux parties : compare chaque partie avec celle montrée."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    return mcq("Que vaut \\(\\sqrt{"+FR(a*a,b*b)+"}\\) ? Donne la valeur exacte.", {t:correct, fb:"Oui : "+a+" au carré donne "+(a*a)+" et "+b+" au carré donne "+(b*b)+"."}, opts,
      "Prends la racine du haut et du bas séparément : \\[ \\begin{aligned} \\sqrt{"+FR(a*a,b*b)+"} &= "+FR(a,b)+" \\end{aligned} \\] La racine carrée est <b>\\("+FR(a,b)+"\\)</b>.",
      {mode:"fraction", a:a, b:b});
  }
  var k=ri(3,39); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd*2),u2r1(rd+0.2),u2r1(rd/2),u2r1(rd+1)]);
  var dopts=fmtPairDsD(fmtD(rd), dc.map(function(d){return {v:d, fb:fmtD(d)+" au carré donne "+fmtD(u2r2(d*d))+", et non "+fmtD(nd)+" : essaie un autre dixième."};}));
  return mcq("Que vaut \\(\\sqrt{"+fmtD(nd)+"}\\) ? Donne la valeur exacte.", {t:fmtD(rd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" donne "+fmtD(nd)+"."}, dopts,
    "Trouve le nombre décimal qui, multiplié par lui-même, donne "+fmtD(nd)+": \\[ \\begin{aligned} "+fmtD(rd)+" \\times "+fmtD(rd)+" &= "+fmtD(nd)+" \\\\ \\sqrt{"+fmtD(nd)+"} &= "+fmtD(rd)+" \\end{aligned} \\] La racine carrée est <b>"+fmtD(rd)+"</b>.",
    {mode:"decimal", n:nd});
}, ["Pour une fraction, prends la racine du haut et du bas séparément ; pour un nombre décimal, cherche parmi les dixièmes.", "Demande-toi quel nombre, multiplié par lui-même, donne exactement la valeur sous le signe de racine."]);

E("u2-number-from-root", 2, ["6.11"], 1, "gen", function(){
  if(pick(["fraction","decimal"])==="fraction"){
    var p=ri(2,12), q=ri(2,12), g=0;
    while(u2gcd(p,q)!==1&&g<60){p=ri(2,12);q=ri(2,12);g++;}
    var correct="\\("+FR(p*p,q*q)+"\\)";
    var cands=[
      {t:"\\("+FR(2*p,q)+"\\)", fb:"C'est le double de la racine : mettre au carré veut dire multiplier la racine par elle-même, et non par 2."},
      {t:"\\("+FR(p,2*q)+"\\)", fb:"C'est la moitié de la racine : le nombre vient de la racine mise au carré, et non de la racine divisée par 2."},
      {t:"\\("+FR((p+1)*(p+1),q*q)+"\\)", fb:"Cela met au carré une fraction voisine : utilise la racine montrée, avec le haut "+p+" et le bas "+q+"."},
      {t:"\\("+FR(p*p,(q+1)*(q+1))+"\\)", fb:"Cela met au carré une fraction voisine : utilise la racine montrée, avec le haut "+p+" et le bas "+q+"."},
      {t:"\\("+FR(p*p,q)+"\\)", fb:"Seul le haut a été mis au carré : le bas doit aussi être mis au carré."}
    ];
    var opts=[], seen={};
    for(var i=0;i<cands.length&&opts.length<3;i++){if(cands[i].t!==correct&&!seen[cands[i].t]){seen[cands[i].t]=1;opts.push(cands[i]);}}
    return mcq("Un nombre positif a pour racine carrée \\("+FR(p,q)+"\\) . Quel est ce nombre ?", {t:correct, fb:"Oui : mets le haut et le bas au carré séparément."}, opts,
      "Mettre au carré annule une racine carrée, et les deux parties sont mises au carré : \\[ \\begin{aligned} \\left("+FR(p,q)+"\\right)^{2} &= "+FR(p,q)+" \\times "+FR(p,q)+" \\\\ &= "+FR(p*p,q*q)+" \\end{aligned} \\] Le nombre est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
      {mode:"fraction", p:p, q:q});
  }
  var k=ri(4,29); var g2=0;
  while(k%10===0&&g2<40){k=ri(4,29);g2++;}
  var rd=u2r1(k/10); var nd=u2r2(rd*rd);
  var cands2=[
    {v:u2r2(2*rd), fb:"C'est le double de la racine : mettre au carré veut dire multiplier la racine par elle-même, et non par 2."},
    {v:u2r2((rd+0.1)*(rd+0.1)), fb:"Cela met au carré le dixième suivant vers le haut : utilise la racine montrée, "+fmtD(rd)+"."},
    {v:u2r2((rd-0.1)*(rd-0.1)), fb:"Cela met au carré le dixième suivant vers le bas : utilise la racine montrée, "+fmtD(rd)+"."},
    {v:u2r2(nd+1), fb:"Cela additionne 1 à la valeur au carré : multiplie simplement la racine par elle-même."},
    {v:u2r2(nd+0.1), fb:"C'est un peu plus que la racine mise au carré : multiplie la racine par elle-même exactement."}
  ];
  var dopts=[], seen2={};
  for(var j=0;j<cands2.length&&dopts.length<3;j++){var v=cands2[j].v; if(v!==nd&&v>0&&!seen2[v]){seen2[v]=1;dopts.push({v:v, fb:cands2[j].fb});}}
  dopts=fmtPairDsD(fmtD(nd), dopts);
  return mcq("Un nombre positif a pour racine carrée "+fmtD(rd)+". Quel est ce nombre ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" donne "+fmtD(nd)+"."}, dopts,
    "Mettre au carré annule une racine carrée : \\[ \\begin{aligned} "+fmtD(rd)+"^{2} &= "+fmtD(rd)+" \\times "+fmtD(rd)+" \\\\ &= "+fmtD(nd)+" \\end{aligned} \\] Le nombre est <b>"+fmtD(nd)+"</b>.",
    {mode:"decimal", r:rd});
}, ["Mettre au carré et prendre la racine carrée s'annulent, donc mets la racine donnée au carré.", "Multiplie la racine par elle-même ; pour une fraction, mets le haut et le bas au carré séparément."]);

E("u2-calc-root-round", 2, ["6.6"], 1, "gen", function(){
  var isFrac=pick(["whole","fraction"])==="fraction";
  var val, label, rn, rd2;
  if(isFrac){
    var g=0;
    while(true){
      var n0=ri(2,40), d0=ri(2,12), gg=u2gcd(n0,d0);
      rn=n0/gg; rd2=d0/gg;
      if(rd2>1){var s1=Math.sqrt(rn), s2=Math.sqrt(rd2); if(!(s1===Math.floor(s1)&&s2===Math.floor(s2))){break;}}
      if(++g>200){break;}
    }
    val=rn/rd2; label=FR(rn,rd2);
  } else {
    var nw=u2nonSquare(11,399); val=nw; label=String(nw);
  }
  var root=Math.sqrt(val);
  var ans=u2r2(root);
  var trunc=Math.floor(root*100)/100;
  var onedp=u2r1(root);
  var delta=isFrac?((rn>1)?pick([-1,1]):1):pick([-1,1]);
  var neigh=isFrac?u2r2(Math.sqrt((rn+delta)/rd2)):u2r2(Math.sqrt(val+delta));
  var cands=[
    {v:trunc, fb:"Cette valeur est coupée après deux décimales : regarde la troisième décimale et arrondis vers le haut quand elle vaut 5 ou plus."},
    {v:onedp, fb:"Cette valeur est arrondie à une décimale : la question demande deux décimales."},
    {v:neigh, fb:"C'est la racine d'un nombre voisin : vérifie la valeur sous le signe de racine."},
    {v:u2r2(ans+0.01), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans-0.01), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans+0.02), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."},
    {v:u2r2(ans-0.02), fb:"C'est une petite erreur d'arrondi au dernier chiffre : vérifie la troisième décimale sur l'écran."}
  ];
  var opts=[], seen={};
  for(var i=0;i<cands.length&&opts.length<3;i++){var v=cands[i].v; if(v!==ans&&v>0&&!seen[v]){seen[v]=1;opts.push({t:fmtDF(v,2), fb:cands[i].fb});}}
  return mcq("Utilise une calculatrice. Que vaut \\(\\sqrt{"+label+"}\\), à deux décimales ?", {t:fmtDF(ans,2), fb:"Oui : la troisième décimale décide de l'arrondi, et elle arrondit à "+fmtDF(ans,2)+"."}, opts,
    "Une calculatrice donne la racine, et la troisième décimale décide de l'arrondi : \\[ \\begin{aligned} \\sqrt{"+label+"} &\\approx "+fmtD(root)+" \\\\ &\\approx "+fmtDF(ans,2)+" \\end{aligned} \\] À deux décimales, la racine carrée est <b>"+fmtDF(ans,2)+"</b>.",
    {mode:isFrac?"fraction":"whole", val:val});
}, ["Utilise une calculatrice pour la racine, puis arrondis l'affichage à deux décimales.", "Lis le troisième chiffre décimal : il te dit si la deuxième décimale reste ou augmente."]);

E("u2-approx-explain-gen", 2, ["6.7"], 1, "gen", function(){
  var N=u2nonSquare(2,99);
  var places=pick([2,3,4]);
  var shown=Math.round(Math.sqrt(N)*Math.pow(10,places))/Math.pow(10,places);
  var shS=fmtDF(shown,places);
  var sq=shown*shown;
  var frame=pick(["screen","student","project"]);
  var prompt;
  if(frame==="screen"){prompt="Une calculatrice montre \\(\\sqrt{"+N+"} \\approx "+shS+"\\). Pourquoi la valeur sur l'écran est-elle une approximation ?";}
  else if(frame==="student"){prompt="Un élève dit que la valeur exacte de \\(\\sqrt{"+N+"}\\) est "+shS+", la valeur sur l'écran de la calculatrice. Pourquoi l'élève a-t-il tort ?";}
  else {prompt="Pour un projet, un élève utilise "+shS+" comme valeur de \\(\\sqrt{"+N+"}\\). Pourquoi "+shS+" est-elle appelée une approximation ?";}
  return mcq(prompt,
    {t:"Mettre "+shS+" au carré ne donne pas exactement "+N+", parce que la vraie racine continue après les chiffres montrés", fb:"C'est juste : "+shS+" au carré donne "+fmtD(sq)+", près de "+N+" mais pas égal à lui."},
    [{t:"La calculatrice a fait une erreur de calcul en trouvant la racine de "+N+", donc on ne peut pas se fier à ses chiffres", fb:"La calculatrice fonctionne bien : la limite est le nombre de chiffres qu'elle peut montrer."},
     {t:"La valeur est exacte, parce qu'une racine montrée à "+places+" décimales donne tous ses chiffres au complet", fb:"Plus de décimales veut quand même dire arrondi : les chiffres de cette racine continuent après elles."},
     {t:"Le nombre "+N+" n'a pas de racine carrée du tout, donc l'écran ne peut montrer qu'une estimation à sa place", fb:N+" a bien une racine carrée : elle ne se termine jamais et ne se répète jamais comme nombre décimal."}],
    "La valeur montrée est arrondie, et la mettre au carré montre l'écart : \\[ \\begin{aligned} ("+shS+")^{2} &= "+fmtD(sq)+" \\\\ &\\ne "+N+" \\end{aligned} \\] Parce que son carré n'est pas exactement "+N+", la valeur montrée est <b>une approximation, et non la racine exacte</b>.",
    {mode:frame, N:N, places:places});
}, ["Demande-toi si mettre la valeur montrée au carré redonne exactement le nombre de départ.", "Mets la valeur montrée au carré et compare-la avec le nombre sous le signe de racine."]);

E("u2-overlap-pair", 2, ["9.1"], 3, "gen", function(){
  if(pick(["tri-on-rect","cyl-on-tri"])==="tri-on-rect"){
    var tr=pick([[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15]]);
    var a=tr[0], b=tr[1], c=tr[2];
    var l=ri(6,14), h=ri(3,9), w=a;
    var boxSA=2*(l*w+l*h+w*h);
    var triSA=a*b+(a+b+c)*l;
    var contact=a*l;
    var tot=boxSA+triSA-2*contact;
    var q = numq("Un modèle est bâti en joignant deux solides face à face. Le solide du bas est un prisme rectangulaire droit de "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut. Au-dessus se trouve un prisme triangulaire droit, un prisme avec des bouts en triangle rectangle et des côtés rectangulaires. Ses bouts triangulaires ont des cathètes de "+a+" cm et "+b+" cm et une hypoténuse de "+c+" cm ; le prisme mesure "+l+" cm de long, et sa face du bas, "+a+" cm sur "+l+" cm, couvre exactement la face du haut du prisme du bas. La face où les deux solides se joignent est cachée dans le modèle. Trouve l'aire de la surface du modèle, en centimètres carrés.", tot, 0.01,
      "Le chevauchement est le rectangle de "+a+" cm sur "+l+" cm où les deux prismes se joignent. C'est une face de chaque solide, donc elle est cachée deux fois et elle s'enlève des deux aires totales : \\[ \\begin{aligned} \\text{chevauchement} &= "+a+" \\times "+l+" = "+contact+" \\\\ AS &= "+boxSA+" + "+triSA+" - 2("+contact+") \\\\ &= "+tot+" \\end{aligned} \\] L'aire de la surface est <b>"+tot+" cm\\(^{2}\\)</b>.",
      {mode:"tri-on-rect", a:a, b:b, c:c, l:l, h:h});
    q.figure = solBoxTri(a, b, c, l, a, h, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(l) + " cm", "", fmtD(h) + " cm", "Prisme triangulaire sur une boîte avec des dimensions étiquetées");
    return q;
  }
  var tr2=pick([[6,8,10],[9,12,15],[12,16,20],[8,15,17]]);
  var a2=tr2[0], b2=tr2[1], c2=tr2[2];
  var L=ri(10,16);
  var r=(a2>=9)?ri(2,4):ri(2,3);
  var hc=ri(4,10);
  var triSA2=a2*b2+(a2+b2+c2)*L;
  var cylSA=u2r2(2*3.14*r*r+2*3.14*r*hc);
  var circ=u2r2(3.14*r*r);
  var tot2=u2r1(triSA2+cylSA-2*circ);
  var q = numq("Un cylindre droit se trouve sur un prisme triangulaire droit, un prisme avec des bouts en triangle rectangle et des côtés rectangulaires. Les bouts triangulaires ont des cathètes de "+a2+" cm et "+b2+" cm et une hypoténuse de "+c2+" cm, et le prisme mesure "+L+" cm de long. Le cylindre a un rayon de "+r+" cm et une hauteur de "+hc+" cm, et il se trouve sur la face rectangulaire du prisme qui mesure "+a2+" cm sur "+L+" cm, avec toute sa base sur cette face. La partie où les deux solides se touchent est cachée dans l'objet fini. Trouve l'aire de la surface, en centimètres carrés. Utilise \\(\\pi = 3,14\\) et donne ta réponse à une décimale.", tot2, 0.6,
    "Le chevauchement est le cercle où le cylindre rencontre le prisme. Il est caché sur la face du prisme et c'est la base du cylindre, donc son aire s'enlève deux fois : \\[ \\begin{aligned} \\text{chevauchement} &= 3,14 \\times "+r+"^{2} = "+fmtD(circ)+" \\\\ AS &= "+triSA2+" + "+fmtD(cylSA)+" - 2("+fmtD(circ)+") \\\\ &= "+fmtD(tot2)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(tot2)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-tri", a:a2, b:b2, c:c2, L:L, r:r, hc:hc});
    q.figure = solCylOnTri(a2, b2, c2, L, r, hc, fmtD(a2) + " cm", fmtD(b2) + " cm", fmtD(c2) + " cm", fmtD(L) + " cm", fmtD(r) + " cm", fmtD(hc) + " cm", "Cylindre sur un prisme triangulaire avec des dimensions étiquetées");
    return q;
}, ["Additionne d'abord les aires totales des deux solides séparés, puis occupe-toi du joint.", "Trouve l'aire de la face où les solides se touchent, et soustrais-la deux fois parce qu'elle est cachée sur les deux solides."]);

/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): "product law" = "loi du produit",
 * "quotient law" = "loi du quotient", "power of a power law" = "loi de
 * la puissance d'une puissance" (same choices as chunkB-fr); "pattern"
 * (exponent pattern) = "régularité"; "brackets" = "parenthèses"; "first
 * power" rendered "puissance d'exposant 1"; "dot model" = "modèle de
 * points"; "layer" = "couche"; "algebra tile" = "tuile algébrique",
 * unit tile = "tuile unité", x squared tile = "tuile x au carré";
 * "dividend / divisor / quotient" = "dividende / diviseur / quotient";
 * "blank" (missing term) = "espace vide".
 * In u4-tiles-figure-build, makeAction keeps the internal verb and sign
 * tokens ("Add"/"Remove", "positive"/"negative") unchanged because other
 * code compares them; makeAction alone maps them to French display text
 * ("Ajoute"/"Retire", "positive(s)"/"négative(s)") and puts the tile
 * noun before the kind and sign words, as French word order requires.
 * No other logic, comparisons or mode strings were changed.
 * FMT-GEOM lines left (fmt( kept, each marked with an FMT-GEOM comment
 * on its line): the <text> x/y coordinate calls in u4tTiles (1 line) and
 * u4tArea (4 lines). The visible text labels built in u4tArea (monoLab,
 * part1, part2, totalLab) DO use fmtD, per the rule for visible labels.
 * Literal formatted numbers written into static prose (for later guide
 * reconciliation): no decimal, thousands, percent or dollar literals
 * occur in this chunk. The TeX spacing \hspace{1.2cm} in
 * u4-divide-missing-term is a length, not a displayed number, and was
 * left byte-identical. Plain integer literals in option text and worked
 * solutions (p. ex. 16, 8, "3 par 3") are unchanged digits; generated
 * numbers are routed through fmtD wherever they are generated.
 * Unsure: "tuile unité" for unit tile and the "compte des tuiles"
 * phrasing in u4-tiles-figure-build feedback follow classroom usage;
 * guides to confirm. The SVG aria-label in u4tArea uses a typographic
 * apostrophe in "d’aire" because that JS string is single-quoted.
 */
