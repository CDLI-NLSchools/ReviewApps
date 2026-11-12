// Math 9 (French) Unit 2 Square Roots and Surface Area question bank
// Cut verbatim from the standalone bank source
// (math-9-review-fr/bank-src.js, lines 377 to 752).
// CRMARKS: u2-sa-single=3
// CRMARKS: u2-sa-tri-context=3
// CRMARKS: u2-overlap=2
// CRMARKS: u2-overlap-hidden=2
// CRMARKS: u2-sa-composite-rect=3
// CRMARKS: u2-sa-problem=2
// CRMARKS: u2-sa-cyl-on-prism=3
// CRMARKS: u2-best-estimate-side=2
/* Unit 2: Square Roots and Surface Area */
function u2gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
function u2r1(x){return Math.round(x*10)/10;}
function u2r2(x){return Math.round(x*100)/100;}
function u2d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u2nonSquare(lo,hi){var n=ri(lo,hi);var t=0;while(Math.floor(Math.sqrt(n))*Math.floor(Math.sqrt(n))===n&&t<60){n=ri(lo,hi);t++;}return n;}

E("u2-sqrt-perfect", 2, ["6.9"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,20); var n=r*r;
    var ds=u2d3(r,[r+1,r-1,r+2,r*2,r+3]);
    var opts=ds.map(function(d){return {t:String(d), fb:fmtD(d)+" au carré donne "+fmtD(d*d)+", pas "+n+" : essaie une autre valeur."};});
    return mcq("Que vaut \\(\\sqrt{"+n+"}\\) ?", {t:String(r), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
      "\\("+r+" \\times "+r+" = "+n+"\\), donc \\(\\sqrt{"+n+"} = "+r+"\\). La racine carrée est <b>"+r+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(3,25); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(rd,[u2r1(rd+0.1),u2r1(rd-0.1),u2r1(rd+1),u2r1(rd*2),u2r1(rd+0.2)]);
    var dopts=dc.map(function(d){return {t:fmtD(d), fb:fmtD(d)+" au carré donne "+fmtD(u2r2(d*d))+", pas "+fmtD(nd)+"."};});
    return mcq("Que vaut \\(\\sqrt{"+fmtD(nd)+"}\\) ?", {t:fmtD(rd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" égale "+fmtD(nd)+"."}, dopts,
      "\\("+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+"\\), donc \\(\\sqrt{"+fmtD(nd)+"} = "+fmtD(rd)+"\\). La racine carrée est <b>"+fmtD(rd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p+1,q)+"\\)", fb:"En le mettant au carré, on obtient un mauvais numérateur : vérifie les deux parties."},
             {t:"\\("+FR(p,q+1)+"\\)", fb:"En le mettant au carré, on obtient un mauvais dénominateur : vérifie les deux parties."},
             {t:"\\("+FR(p-1,q)+"\\)", fb:"En le mettant au carré, on obtient un numérateur plus petit que celui montré."}];
  return mcq("Que vaut \\(\\sqrt{"+FR(p*p,q*q)+"}\\) ?", {t:"\\("+FR(p,q)+"\\)", fb:"Oui : les deux parties au carré donnent les parties montrées."}, fopts,
    "Le numérateur "+(p*p)+" est "+p+" au carré, et le dénominateur "+(q*q)+" est "+q+" au carré. \\[ \\sqrt{"+FR(p*p,q*q)+"} = "+FR(p,q)+" \\] La racine carrée est <b>\\("+FR(p,q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Pense au nombre qui, multiplié par lui-même, donne la valeur sous le signe de racine.", "Essaie les petits carrés dans l'ordre jusqu'à ce qu'un d'eux donne exactement le nombre montré."]);

E("u2-square-from-root", 2, ["6.11"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(2,30); var n=r*r;
    var ds=u2d3(n,[2*r,n+1,n-1,n+r,n+10,3*r]);
    var opts=ds.map(function(d){return {t:String(d), fb:"Cette valeur ne vient pas de "+r+" au carré : essaie "+r+" fois "+r+"."};});
    return mcq("Un nombre positif a pour racine carrée "+r+". Quel est ce nombre ?", {t:String(n), fb:"Oui : mettre la racine au carré redonne le nombre."}, opts,
      "Mettre au carré défait une racine carrée : \\[ "+r+"^{2} = "+r+" \\times "+r+" = "+n+" \\] Le nombre est <b>"+n+"</b>.",
      {mode:"whole", r:r});
  }
  if(mode==="decimal"){
    var k=ri(2,30); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var dc=u2d3(nd,[u2r2(2*rd),u2r2((rd+1)*(rd+1)),u2r2(nd+1),u2r2(nd+0.1),u2r2(nd+2)]);
    var dopts=fmtPairDsD(fmtD(nd), dc.map(function(d){return {v:d, fb:"Ce n'est pas "+fmtD(rd)+" fois "+fmtD(rd)+" : mets la racine elle-même au carré."};}));
    return mcq("Un nombre positif a pour racine carrée "+fmtD(rd)+". Quel est ce nombre ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" au carré égale "+fmtD(nd)+"."}, dopts,
      "Mettre au carré défait une racine carrée : \\[ "+fmtD(rd)+"^{2} = "+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+" \\] Le nombre est <b>"+fmtD(nd)+"</b>.",
      {mode:"decimal", r:rd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p,q)+"\\)", fb:"Seul le haut a été mis au carré : le bas doit aussi être mis au carré."},
             {t:"\\("+FR(p,q*q)+"\\)", fb:"Seul le bas a été mis au carré : le haut doit aussi être mis au carré."},
             {t:"\\("+FR(p*p,q*q+q)+"\\)", fb:"Mets la partie du bas au carré : ne l'additionne pas à elle-même."}];
  return mcq("Un nombre positif a pour racine carrée \\("+FR(p,q)+"\\) . Quel est ce nombre ?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Oui : mets le haut et le bas au carré séparément."}, fopts,
    "Mets le haut et le bas au carré : \\[ \\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+" \\] Le nombre est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Mettre au carré et prendre la racine carrée se défont l'un l'autre, donc mets la racine donnée au carré.", "Multiplie la racine par elle-même, en mettant le haut et le bas au carré séparément pour une fraction."]);

E("u2-identify-square", 2, ["3.3"], 1, "gen", function(){
  var mode=pick(["whole","decimal","fraction"]);
  if(mode==="whole"){
    var r=ri(4,25); var n=r*r;
    var ds=[n+1,n-1,n+2];
    var opts=ds.map(function(d){return {t:String(d), fb:d+" se trouve entre deux carrés voisins, donc aucun nombre au carré ne le donne."};});
    return mcq("Quel nombre est un carré parfait ?", {t:String(n), fb:"Oui : "+r+" fois "+r+" égale "+n+"."}, opts,
      "Une seule valeur est un nombre fois lui-même : \\("+r+" \\times "+r+" = "+n+"\\). Le carré parfait est <b>"+n+"</b>.",
      {mode:"whole", n:n});
  }
  if(mode==="decimal"){
    var k=ri(4,24); var rd=u2r1(k/10); var nd=u2r2(rd*rd);
    var pool=[0.12,0.15,0.18,0.21,0.27,0.32,0.35,0.45,0.48,0.54,0.6,0.72,0.75,0.8,0.9,1.1,1.2,1.5,1.8,2.2,2.5,2.8,3.5];
    var sh=shuffle(pool); var ds=[]; var i=0;
    while(ds.length<3&&i<sh.length){if(sh[i]!==nd){ds.push(sh[i]);} i++;}
    var opts=fmtPairDsD(fmtD(nd), ds.map(function(d){return {v:d, fb:"Aucun nombre fois lui-même ne donne "+fmtD(d)+" : essaie les dixièmes voisins."};}));
    return mcq("Quel nombre est un carré parfait ?", {t:fmtD(nd), fb:"Oui : "+fmtD(rd)+" fois "+fmtD(rd)+" égale "+fmtD(nd)+"."}, opts,
      "Une seule valeur est un nombre fois lui-même : \\("+fmtD(rd)+" \\times "+fmtD(rd)+" = "+fmtD(nd)+"\\). Le carré parfait est <b>"+fmtD(nd)+"</b>.",
      {mode:"decimal", n:nd});
  }
  var p=ri(2,9); var q=ri(3,11); var g=0;
  while(u2gcd(p,q)!==1&&g<40){p=ri(2,9);q=ri(3,11);g++;}
  var fopts=[{t:"\\("+FR(p*p+1,q*q)+"\\)", fb:"La partie du haut n'est pas un nombre carré, donc la fraction n'en est pas un."},
             {t:"\\("+FR(p*p,q*q+1)+"\\)", fb:"La partie du bas n'est pas un nombre carré, donc la fraction n'en est pas un."},
             {t:"\\("+FR(p*p+2,q*q)+"\\)", fb:"La partie du haut se trouve entre deux carrés, donc ce n'est pas un carré."}];
  return mcq("Quel nombre est un carré parfait ?", {t:"\\("+FR(p*p,q*q)+"\\)", fb:"Oui : le haut et le bas sont tous deux des carrés parfaits."}, fopts,
    "Une fraction est un carré parfait quand son haut et son bas sont tous deux des carrés parfaits : \\(\\left("+FR(p,q)+"\\right)^{2} = "+FR(p*p,q*q)+"\\). Le carré parfait est <b>\\("+FR(p*p,q*q)+"\\)</b>.",
    {mode:"fraction", p:p, q:q});
}, ["Un carré parfait est un nombre multiplié par lui-même, sous forme entière, décimale ou de fraction.", "Pour chaque valeur, demande-toi si un nombre fois lui-même donne exactement cette valeur."]);

E("u2-estimate-between", 2, ["6.5"], 1, "gen", function(){
  var n=u2nonSquare(10,400); var k=Math.floor(Math.sqrt(n));
  if(pick(["between","closest"])==="between"){
    var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
    var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" et "+pr[1], fb:"Mets les deux nombres au carré : "+n+" ne se trouve pas entre leurs carrés."};});
    return mcq("Entre quels deux nombres entiers se trouve la racine carrée de "+n+" ?", {t:k+" et "+(k+1), fb:"Oui : "+n+" se trouve entre "+(k*k)+" et "+((k+1)*(k+1))+"."}, opts,
      "\\("+k+"^{2} = "+(k*k)+"\\) et \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\), et "+n+" se trouve entre eux. Donc \\(\\sqrt{"+n+"}\\) se trouve entre <b>"+k+" et "+(k+1)+"</b>.",
      {mode:"between", n:n});
  }
  var c=((n-k*k)<((k+1)*(k+1)-n))?k:k+1;
  var ds=u2d3(c,[c+1,c-1,c+2,c-2]);
  var opts2=ds.map(function(d){return {t:String(d), fb:"Mets-le au carré : "+(d*d)+" est plus loin de "+n+" que le meilleur choix."};});
  return mcq("Quel nombre entier est le plus proche de \\(\\sqrt{"+n+"}\\) ?", {t:String(c), fb:"Oui : "+(c*c)+" est le carré le plus proche de "+n+"."}, opts2,
    "\\("+k+"^{2} = "+(k*k)+"\\) et \\("+(k+1)+"^{2} = "+((k+1)*(k+1))+"\\). Le nombre "+n+" est plus proche de "+(c*c)+", donc le nombre entier le plus proche est <b>"+c+"</b>.",
    {mode:"closest", n:n});
}, ["Trouve les carrés parfaits juste en dessous et juste au-dessus du nombre.", "Mets au carré les nombres entiers près de la racine et vois quels carrés encadrent le nombre."]);

E("u2-calc-root", 2, ["6.6"], 1, "gen", function(){
  var n=u2nonSquare(11,399);
  var ans=u2r1(Math.sqrt(n));
  return numq("Utilise une calculatrice. Que vaut \\(\\sqrt{"+n+"}\\), avec une décimale ?", ans, 0.05,
    "Une calculatrice donne \\(\\sqrt{"+n+"} \\approx "+fmtD(Math.sqrt(n))+"\\). Arrondie à une décimale, la racine carrée est <b>"+fmtD(ans)+"</b>.",
    {mode:"calc", n:n});
}, ["Entre le nombre et appuie sur la touche racine carrée d'une calculatrice.", "Lis l'écran, puis arrondis la valeur à une décimale."]);

E("u2-root-between", 2, ["6.8"], 1, "gen", function(){
  var a=ri(2,15); var b=a+1;
  var m=a*a+ri(1,2*a-1);
  var above=b*b+ri(1,12);
  var opts=[{t:String(a*a), fb:"Sa racine carrée est exactement "+a+", qui est une borne, pas entre les deux."},
            {t:String(b*b), fb:"Sa racine carrée est exactement "+b+", qui est une borne, pas entre les deux."},
            {t:String(above), fb:"Sa racine carrée est plus grande que "+b+" : mets les bornes au carré pour vérifier."}];
  return mcq("Quel nombre a une racine carrée entre "+a+" et "+b+" ?", {t:String(m), fb:"Oui : "+m+" se trouve entre "+(a*a)+" et "+(b*b)+"."}, opts,
    "Mets les bornes au carré : \\("+a+"^{2} = "+(a*a)+"\\) et \\("+b+"^{2} = "+(b*b)+"\\). Seul "+m+" se trouve entre ces carrés, donc le nombre est <b>"+m+"</b>.",
    {mode:"between", a:a, b:b});
}, ["Mets les deux nombres donnés au carré pour transformer la question en intervalle pour le nombre lui-même.", "Vérifie quel candidat se trouve entre les deux carrés que tu viens de trouver."]);

E("u2-spot-error", 2, ["6.10"], 2, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var c, R;
    if(ri(0,1)===0){ c=ri(3,30); R=2*c; }
    else { var kk=ri(13,39); if(kk===20){kk=21;} c=u2r1(kk/10); R=u2r1(2*c); }
    return mcq("Un élève écrit : \\(\\sqrt{"+fmtD(R)+"} = "+fmtD(c)+"\\) parce que "+fmtD(c)+" est la moitié de "+fmtD(R)+". Quelle erreur a été faite ?",
      {t:"L'élève a divisé le nombre par deux au lieu de trouver une valeur qui, au carré, le donne", fb:"Exact : une racine carrée défait un carré, pas une division par deux."},
      [{t:"L'élève a arrondi la réponse à un nombre entier trop tôt dans le travail, avant la fin", fb:"L'arrondi n'est pas le problème ici : c'est la méthode qui est fausse."},
       {t:"L'élève a mis le nombre de départ au carré au lieu de prendre sa racine carrée exacte", fb:"Regarde encore : l'étape montrée divise le nombre de départ par deux."},
       {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse finale donnée", fb:"Les décimales sont correctes : c'est l'opération choisie qui est fausse."}],
      "Vérifie en mettant au carré : \\("+fmtD(c)+" \\times "+fmtD(c)+" = "+fmtD(u2r2(c*c))+"\\), pas "+fmtD(R)+". Diviser par deux ne défait pas un carré. L'erreur était <b>de diviser le nombre par deux au lieu de trouver une valeur qui, au carré, le donne</b>.",
      {mode:"halving", R:R});
  }
  if(mode===2){
    var k=ri(4,19); if(k===10){k=11;}
    var r=u2r1(k/10); var N=u2r2(r*r); var claim=u2r2(r/10);
    return mcq("Un élève écrit : \\(\\sqrt{"+fmtD(N)+"} = "+fmtD(claim)+"\\). Quelle erreur a été faite ?",
      {t:"La virgule décimale a été placée une position trop à gauche", fb:"Exact : "+fmtD(r)+" au carré donne le nombre, donc la virgule va là."},
      [{t:"L'élève a divisé le nombre par deux au lieu de trouver sa racine carrée", fb:"La division par deux n'est pas l'étape utilisée : compare la taille des chiffres."},
       {t:"L'élève a mis le nombre montré au carré au lieu de prendre sa racine", fb:"Mettre au carré rendrait la valeur plus grande, sans déplacer sa virgule."},
       {t:"L'élève a arrondi une réponse exacte à la mauvaise décimale", fb:"Les chiffres sont bons mais déplacés : c'est une erreur de valeur de position."}],
      "Mettre la valeur affirmée au carré donne \\("+fmtD(claim)+" \\times "+fmtD(claim)+" = "+fmtD(u2r2(claim*claim*100)/100)+"\\), pas "+fmtD(N)+", alors que \\("+fmtD(r)+" \\times "+fmtD(r)+" = "+fmtD(N)+"\\). L'erreur était <b>de placer la virgule décimale une position trop à gauche</b>.",
      {mode:"decimal-point", N:N});
  }
  if(mode===3){
    var n=ri(3,20); var cl=n*n;
    return mcq("Un élève écrit : \\(\\sqrt{"+n+"} = "+cl+"\\) parce que "+n+" fois "+n+" donne "+cl+". Quelle erreur a été faite ?",
      {t:"L'élève a mis le nombre au carré au lieu de prendre sa racine carrée", fb:"Exact : mettre au carré et prendre la racine sont des opérations opposées."},
      [{t:"L'élève a divisé le nombre par deux au lieu de prendre sa racine carrée", fb:"La division par deux n'a pas été utilisée : le travail a multiplié le nombre par lui-même."},
       {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse", fb:"Aucune décimale n'est en jeu : l'opération elle-même a été inversée."},
       {t:"L'élève a arrondi la réponse à un nombre entier trop tôt dans le travail", fb:"L'arrondi n'est pas le problème : la réponse a grandi au lieu de diminuer."}],
      "Vérifie l'affirmation en la mettant au carré : \\("+cl+" \\times "+cl+" = "+(cl*cl)+"\\), pas "+n+". Une racine carrée défait un carré ; elle ne met pas au carré encore. L'erreur était <b>de mettre le nombre au carré au lieu de prendre sa racine carrée</b>.",
      {mode:"squared-instead", n:n});
  }
  var a=ri(3,11); var b=ri(3,11); var R=a*a+b*b; var claim=a+b;
  return mcq("Un élève écrit : \\(\\sqrt{"+(a*a)+"+"+(b*b)+"} = "+a+"+"+b+" = "+claim+"\\). Quelle erreur a été faite ?",
    {t:"L'élève a pris la racine de chaque partie séparément avant d'additionner", fb:"Exact : la racine s'applique à la somme entière, pas à chaque partie."},
    [{t:"L'élève a divisé la somme par deux au lieu de prendre sa racine carrée", fb:"La division par deux n'a pas été utilisée : les racines ont été prises partie par partie."},
     {t:"L'élève a mis la somme au carré au lieu de prendre sa racine", fb:"Le carré n'a pas été utilisé : chaque partie a été traitée par sa racine séparément."},
     {t:"L'élève a placé la virgule décimale à la mauvaise position dans la réponse", fb:"Aucune décimale n'est en jeu : la racine a été séparée sur la somme."}],
    "Additionne d'abord : \\("+(a*a)+"+"+(b*b)+" = "+R+"\\), et \\("+claim+" \\times "+claim+" = "+(claim*claim)+"\\), pas "+R+". L'erreur était <b>de prendre la racine de chaque partie séparément avant d'additionner</b>.",
    {mode:"split-root", a:a, b:b});
}, ["Teste l'affirmation en mettant au carré la réponse donnée par l'élève.", "Mets la racine affirmée au carré : si elle ne donne pas le nombre de départ, nomme l'étape qui a mal tourné."]);

E("u2-sa-single", 2, ["9.2"], 2, "gen", function(){
  var mode=pick(["rect","tri","cyl"]);
  if(mode==="rect"){
    var l=ri(2,12), w=ri(2,12), h=ri(2,12);
    var sa=2*(l*w+l*h+w*h);
    var q = numq("Trouve l'aire de la surface d'un prisme droit à base rectangulaire de longueur "+l+" cm, de largeur "+w+" cm et de hauteur "+h+" cm. Donne ta réponse en centimètres carrés.", sa, 0.01,
      "Additionne les aires des trois faces différentes, puis double : \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= 2("+fmtD(l*w+l*h+w*h)+") \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"rect-prism", l:l, w:w, h:h});
    q.figure = solRectPrism(l, w, h, fmtD(l) + " cm", fmtD(w) + " cm", fmtD(h) + " cm", "Prisme rectangulaire avec des dimensions étiquetées");
    return q;
  }
  if(mode==="tri"){
    var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
    var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,18);
    var sa2=a*b+(a+b+c)*L;
    var q = numq("Trouve l'aire de la surface d'un prisme droit à base triangulaire. L'extrémité triangulaire est un triangle rectangle avec des cathètes de "+a+" cm et "+b+" cm et une hypoténuse de "+c+" cm, et le prisme mesure "+L+" cm de long. Donne ta réponse en centimètres carrés.", sa2, 0.01,
      "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa2)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa2)+" cm\\(^{2}\\)</b>.",
      {mode:"tri-prism", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var r=ri(2,10), hh=ri(3,15);
  var sac=u2r1(2*3.14*r*(r+hh));
  var q = numq("Trouve l'aire de la surface d'un cylindre droit de rayon "+r+" cm et de hauteur "+hh+" cm. Utilise \\(\\pi = 3,14\\) et donne ta réponse en centimètres carrés, avec une décimale.", sac, 0.6,
    "Deux cercles plus la face courbe, avec \\(\\pi = 3,14\\) : \\[ \\begin{aligned} SA &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3,14)("+r+")("+r+"+"+hh+") \\\\ &= "+fmtD(sac)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sac)+" cm\\(^{2}\\)</b>.",
    {mode:"cylinder", r:r, h:hh});
    q.figure = solCylinder(r, hh, fmtD(r) + " cm", fmtD(hh) + " cm", "Cylindre avec des dimensions étiquetées");
    return q;
}, ["Imagine le développement du solide : chaque face extérieure doit être comptée une fois.", "Calcule l'aire d'une face à la fois, puis additionne les faces qui correspondent."]);

E("u2-sa-tri-context", 2, ["9.2"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(5,20);
  var mode=pick(["ramp","tent","bar"]);
  if(mode==="tent"){
    var sat=a*b+(a+c)*L;
    var q = numq("Une tente adossée a la forme d'un prisme droit à base triangulaire. Chaque extrémité triangulaire a un côté vertical de "+a+" cm, une base de "+b+" cm et un côté incliné de "+c+" cm, et la tente mesure "+L+" cm de long. La face rectangulaire au sol, "+b+" cm sur "+L+" cm, n'a pas de matériau. Trouve l'aire de matériau nécessaire, en centimètres carrés.", sat, 0.01,
      "Compte deux extrémités triangulaires et les deux rectangles couverts, sans la face au sol : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+c)*L)+" \\\\ &= "+fmtD(sat)+" \\end{aligned} \\] L'aire de matériau nécessaire est <b>"+fmtD(sat)+" cm\\(^{2}\\)</b>.",
      {mode:"tent-no-floor", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Tente en prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var sa=a*b+(a+b+c)*L;
  if(mode==="ramp"){
    var q = numq("Une rampe d'exposition a la forme d'un prisme droit à base triangulaire et est couverte sur toutes ses faces. Chaque extrémité triangulaire a des côtés de "+a+" cm, "+b+" cm et "+c+" cm, qui forment un triangle rectangle, et la rampe mesure "+L+" cm de long. Trouve l'aire de la surface de la rampe, en centimètres carrés.", sa, 0.01,
      "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
      {mode:"ramp", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Rampe en prisme triangulaire avec des dimensions étiquetées");
    return q;
  }
  var q = numq("Une boîte de barre de chocolat a la forme d'un prisme droit à base triangulaire, fermée sur toutes ses faces. Chaque extrémité triangulaire a des côtés de "+a+" cm, "+b+" cm et "+c+" cm, qui forment un triangle rectangle, et la boîte mesure "+L+" cm de long. Trouve l'aire de la surface de la boîte, en centimètres carrés.", sa, 0.01,
    "Deux extrémités triangulaires plus trois rectangles le long de la longueur : \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmtD(a*b)+"+"+fmtD((a+b+c)*L)+" \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] L'aire de la surface est <b>"+fmtD(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"bar-box", a:a, b:b, c:c, L:L});
    q.figure = solTriPrism(a, b, c, L, fmtD(a) + " cm", fmtD(b) + " cm", fmtD(c) + " cm", fmtD(L) + " cm", "Boîte en prisme triangulaire avec des dimensions étiquetées");
    return q;
}, ["Dessine le prisme et étiquette chaque face avant de calculer.", "Trouve d'abord les deux extrémités triangulaires, puis additionne les rectangles le long de la longueur."]);

E("u2-overlap", 2, ["9.1"], 1, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("Une petite boîte est posée sur une plus grande boîte qui mesure "+bl+" cm de long et "+bw+" cm de large. Les deux boîtes se touchent sur un rectangle de "+p+" cm sur "+q+" cm. Quelle est l'aire du chevauchement, en centimètres carrés ?", p*q, 0.01,
    "Le chevauchement est le rectangle où les boîtes se touchent : \\[ \\begin{aligned} A &= "+p+" \\times "+q+" \\\\ &= "+(p*q)+" \\end{aligned} \\] L'aire du chevauchement est <b>"+(p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"overlap", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmtD(p) + " cm", fmtD(q) + " cm", fmtD(bl) + " cm", fmtD(bw) + " cm", "Vue en plan de deux boîtes avec le recouvrement ombré");
    return qq;
}, ["Le chevauchement est le rectangle où les deux solides se touchent.", "Trouve d'abord l'aire du rectangle de contact, puis pense au nombre de faces qu'il cache."]);

E("u2-overlap-hidden", 2, ["9.1"], 2, "gen", function(){
  var p=ri(2,11), q=ri(2,10);
  var bl=ri(p+2,p+8), bw=ri(q+2,q+8);
  var qq = numq("Une petite boîte est posée sur une plus grande boîte qui mesure "+bl+" cm de long et "+bw+" cm de large. Les deux boîtes se touchent sur un rectangle de "+p+" cm sur "+q+" cm. Quelle aire de la surface est cachée là où les deux boîtes se touchent, en centimètres carrés ?", 2*p*q, 0.01,
    "Le rectangle de contact cache une face sur chaque boîte, donc il est caché deux fois : \\[ \\begin{aligned} \\text{cachée} &= 2\\times("+p+" \\times "+q+") \\\\ &= 2\\times "+(p*q)+" \\\\ &= "+(2*p*q)+" \\end{aligned} \\] L'aire de la surface cachée est <b>"+(2*p*q)+" cm\\(^{2}\\)</b>.",
    {mode:"hidden-total", p:p, q:q});
    qq.figure = solOverlapPlan(bl, bw, p, q, fmtD(p) + " cm", fmtD(q) + " cm", fmtD(bl) + " cm", fmtD(bw) + " cm", "Vue en plan de deux boîtes avec le recouvrement ombré");
    return qq;
}, ["Le chevauchement est le rectangle où les deux solides se touchent.", "Trouve d'abord l'aire du rectangle de contact, puis pense au nombre de faces qu'il cache."]);

E("u2-sa-composite-rect", 2, ["9.2"], 2, "gen", function(){
  var X=ri(8,16), W=ri(4,10), H1=ri(3,7), X2=ri(3,6), H2=ri(2,6);
  if(X2>=X){X2=X-3;}
  var sa1=2*(X*W+X*H1+W*H1), sa2=2*(X2*W+X2*H2+W*H2), contact=X2*W;
  var tot=sa1+sa2-2*contact;
  var q = numq("Une marche est faite de deux boîtes jointes. La boîte du bas mesure "+X+" cm de long, "+W+" cm de large et "+H1+" cm de haut. La boîte du haut mesure "+X2+" cm de long, "+W+" cm de large et "+H2+" cm de haut, et elle est posée sur la boîte du bas, alignée avec le dos et le côté gauche. Trouve l'aire de la surface de la marche, en centimètres carrés.", tot, 0.01,
    "Trouve chaque boîte séparément, puis soustrais la face de contact deux fois car elle est cachée sur les deux boîtes : \\[ \\begin{aligned} SA &= 2("+fmtD(X*W)+"+"+fmtD(X*H1)+"+"+fmtD(W*H1)+") + 2("+fmtD(X2*W)+"+"+fmtD(X2*H2)+"+"+fmtD(W*H2)+") - 2("+contact+") \\\\ &= "+sa1+" + "+sa2+" - "+(2*contact)+" \\\\ &= "+tot+" \\end{aligned} \\] L'aire de la surface est <b>"+tot+" cm\\(^{2}\\)</b>.",
    {mode:"step", X:X, W:W, H1:H1, X2:X2, H2:H2});
    q.figure = solStep(X, W, H1, X2, H2, fmtD(X) + " cm", fmtD(W) + " cm", fmtD(H1) + " cm", fmtD(X2) + " cm", fmtD(H2) + " cm", "Marche formée de deux boîtes avec des dimensions étiquetées");
    return q;
}, ["Traite la marche comme deux boîtes séparées d'abord, puis ajuste pour le joint.", "Additionne les deux aires totales, puis soustrais la face de contact deux fois car elle est cachée sur les deux boîtes."]);

E("u2-sa-problem", 2, ["9.3"], 2, "gen", function(){
  if(pick(["cans","cost"])==="cans"){
    var l=ri(4,11)/2, w=ri(3,9)/2, h=ri(3,8)/2;
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([8,10,12,15,20]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q = numq("Un réservoir en forme de prisme droit à base rectangulaire mesure "+fmtD(l)+" m de long, "+fmtD(w)+" m de large et "+fmtD(h)+" m de haut. On le peint à l'extérieur, sur toutes ses faces. Un pot de peinture couvre "+cover+" mètres carrés. Combien de pots de peinture faut-il ?", cans, 0.01,
      "Trouve d'abord l'aire de la surface, puis divise par la couverture et arrondis vers le haut : \\[ \\begin{aligned} SA &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") \\\\ &= "+fmtD(sa)+" \\end{aligned} \\] Alors \\("+fmtD(sa)+" \\div "+cover+" \\approx "+fmtD(u2r2(sa/cover))+"\\), donc un pot partiel ne suffit pas. Le nombre de pots nécessaire est <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover});
    q.figure = solRectPrism(l, w, h, fmtD(l) + " m", fmtD(w) + " m", fmtD(h) + " m", "Réservoir en prisme rectangulaire avec des dimensions étiquetées");
    return q;
  }
  var l2=ri(8,30)/10, w2=ri(6,24)/10, h2=ri(4,18)/10;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var price=pick([4,5,6,8,9]);
  var cost=u2r2(sa2*price);
  var q = numq("Une boîte-cadeau en forme de prisme droit à base rectangulaire mesure "+fmtD(l2)+" m de long, "+fmtD(w2)+" m de large et "+fmtD(h2)+" m de haut. Elle est couverte sur toutes ses faces d'un tissu qui coûte "+price+" $ par mètre carré. Quel est le coût total du tissu, en dollars, au cent près ?", cost, 0.05,
    "Trouve d'abord l'aire de la surface, puis multiplie par le prix par mètre carré : \\[ \\begin{aligned} SA &= 2("+fmtD(u2r2(l2*w2))+"+"+fmtD(u2r2(l2*h2))+"+"+fmtD(u2r2(w2*h2))+") \\\\ &= "+fmtD(u2r2(sa2))+" \\end{aligned} \\] Alors \\("+fmtD(u2r2(sa2))+" \\times "+price+" = "+fmtDF(cost, 2)+"\\). Le coût total est <b>"+fmtDF(cost, 2)+" $</b>.",
    {mode:"fabric-cost", l:l2, w:w2, h:h2, price:price});
    q.figure = solRectPrism(l2, w2, h2, fmtD(l2) + " m", fmtD(w2) + " m", fmtD(h2) + " m", "Boîte en prisme rectangulaire avec des dimensions étiquetées");
    return q;
}, ["Calcule l'aire de la surface avant d'utiliser la couverture ou le prix.", "Divise l'aire de la surface par la couverture par pot, ou multiplie-la par le prix par mètre carré."]);

E("u2-why-approx", 2, ["6.7"], 1, "var", varset([
  function(){
    return mcq("Une calculatrice montre \\(\\sqrt{2} \\approx 1,414213562\\). Pourquoi la valeur à l'écran est-elle une approximation ?",
      {t:"Mettre 1,414213562 au carré ne donne pas exactement 2, seulement très proche de 2", fb:"Exact : l'écran est arrondi, donc son carré manque 2 de peu."},
      [{t:"La calculatrice a fait une erreur de calcul quand elle a trouvé la racine cherchée", fb:"La calculatrice fonctionne bien : la limite est la taille de l'écran."},
       {t:"La valeur est exacte car elle montre neuf décimales à l'écran", fb:"Beaucoup de décimales veut encore dire arrondi : les chiffres continuent après."},
       {t:"La racine de 2 est une fraction, et l'écran ne peut pas montrer les fractions de la calculatrice", fb:"Le problème est les décimales sans fin, pas les fractions : certaines racines sont des fractions."}],
      "Mettre la valeur de l'écran au carré donne environ \\(1,999999999\\), proche de 2 mais pas égal, car la vraie valeur continue après l'écran. La valeur de l'écran est <b>une approximation car elle est arrondie</b>.",
      {mode:"static-sqrt2"});
  },
  function(){
    return mcq("Un élève dit que la valeur exacte de \\(\\sqrt{7}\\) est 2,64575131, la valeur à l'écran de la calculatrice. Pourquoi l'élève a-t-il tort ?",
      {t:"La vraie valeur a des chiffres décimaux qui continuent sans fin", fb:"Exact : l'écran montre seulement les premiers chiffres, arrondis."},
      [{t:"La calculatrice a arrondi le dernier chiffre dans le mauvais sens à l'écran", fb:"Les deux sens d'arrondi coupent quand même la valeur : c'est le point."},
       {t:"La valeur exacte de la racine est 2,6, avec une seule décimale", fb:"Les racines ne s'arrêtent pas à une décimale : celle-ci continue."},
       {t:"L'élève a copié les chiffres de l'écran dans le mauvais ordre", fb:"Les chiffres ont été bien copiés : c'est la valeur elle-même qui est incomplète."}],
      "La décimale de \\(\\sqrt{7}\\) ne se termine jamais, donc un écran ne peut montrer que ses premiers chiffres, arrondis. L'élève a tort car <b>la vraie valeur continue sans fin après l'écran</b>.",
      {mode:"static-sqrt7"});
  },
  function(){
    return mcq("Pour un projet, Sam utilise 3,16 comme valeur de \\(\\sqrt{10}\\). Pourquoi 3,16 est-il appelé une approximation ?",
      {t:"C'est la vraie valeur arrondie à deux décimales, pas la valeur complète", fb:"Exact : 3,16 au carré donne 9,9856, proche de 10 mais pas égal."},
      [{t:"C'est une approximation car Sam l'a trouvée sans calculatrice", fb:"La méthode ne décide pas : c'est l'arrondi qui compte."},
       {t:"C'est exact, car deux décimales suffisent pour tout projet", fb:"Suffisant pour un projet peut quand même être arrondi plutôt qu'exact."},
       {t:"C'est une approximation car le nombre 10 n'a pas du tout de racine carrée", fb:"10 a bien une racine : elle ne se termine jamais et ne se répète jamais."}],
      "\\(3,16 \\times 3,16 = 9,9856\\), ce qui est proche de 10 mais pas égal. La valeur 3,16 est <b>une approximation car c'est la vraie racine arrondie à deux décimales</b>.",
      {mode:"static-sqrt10"});
  }
]), ["Demande-toi si mettre la valeur montrée au carré redonne exactement le nombre de départ.", "Vérifie la valeur montrée en la mettant au carré, et pense à savoir si d'autres chiffres existent."]);

E("u2-sa-cyl-on-prism", 2, ["9.3"], 3, "gen", function(){
  var r=ri(2,5), hc=ri(4,12), l=ri(10,16), w=ri(10,16), h=ri(3,8);
  var prism=2*(l*w+l*h+w*h);
  var side=u2r1(2*3.14*r*hc), top=u2r2(3.14*r*r);
  var tot=u2r1(prism+side);
  var ctx=pick(["Un réservoir d'eau cylindrique est posé sur une base rectangulaire en béton","Une grosse bougie ronde est posée sur un support rectangulaire en bois"]);
  var q = numq(ctx+". Le cylindre a un rayon de "+r+" cm et une hauteur de "+hc+" cm, et sa base repose entièrement sur la face du haut du prisme. Le prisme mesure "+l+" cm de long, "+w+" cm de large et "+h+" cm de haut. Trouve l'aire de la surface exposée, en centimètres carrés. Utilise \\(\\pi = 3,14\\) et donne ta réponse avec une décimale.", tot, 0.6,
    "Le cercle où le cylindre rencontre le prisme est caché, et le bas du cylindre n'est pas exposé, donc ces deux cercles égaux s'annulent dans le total : \\[ \\begin{aligned} SA &= 2("+fmtD(l*w)+"+"+fmtD(l*h)+"+"+fmtD(w*h)+") + 2(3,14)("+r+")("+hc+") \\\\ &= "+prism+" + "+fmtD(side)+" \\\\ &= "+fmtD(tot)+" \\end{aligned} \\] L'aire de la surface exposée est <b>"+fmtD(tot)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-on-prism", r:r, hc:hc, l:l, w:w, h:h});
    q.figure = solCylOnPrism(r, hc, l, w, h, fmtD(r) + " cm", fmtD(hc) + " cm", fmtD(l) + " cm", fmtD(w) + " cm", fmtD(h) + " cm", "Cylindre sur un prisme rectangulaire avec des dimensions étiquetées");
    return q;
}, ["Divise le solide en prisme et en cylindre, puis pense au joint.", "Trouve l'aire de la surface du prisme, puis additionne seulement les parties exposées du cylindre."]);

E("u2-best-estimate-side", 2, ["6.5","6.8"], 3, "gen", function(){
  var best=u2r1(ri(24,98)/10);
  var A=u2r1(best*best+pick([-0.6,-0.3,0.3,0.6]));
  var ctx=pick(["Un patio carré","Une photo imprimée carrée","Un tapis de sol carré","Un tapis carré"]);
  var vals=[u2r1(best-0.5), best, u2r1(best+0.5), u2r1(best+1)];
  var opts=vals.slice(0,1).concat(vals.slice(2)).map(function(v){
    return {t:fmtD(v), fb:"Mets-le au carré : "+fmtD(v)+" au carré donne "+fmtD(u2r2(v*v))+", pas le carré le plus proche de "+fmtD(A)+"."};
  });
  return mcq(ctx+" a une aire de "+fmtD(A)+" mètres carrés. Quelle est la meilleure estimation de la longueur de son côté, en mètres ?",
    {t:fmtD(best), fb:"Oui : "+fmtD(best)+" au carré donne "+fmtD(u2r2(best*best))+", le plus proche de "+fmtD(A)+"."}, opts,
    "La longueur du côté est \\(\\sqrt{"+fmtD(A)+"}\\). Puisque \\("+fmtD(best)+"^{2} = "+fmtD(u2r2(best*best))+"\\), le carré le plus proche de "+fmtD(A)+", la meilleure estimation est <b>"+fmtD(best)+" m</b>.",
    {mode:"best-estimate", A:A});
}, ["La longueur du côté est la racine carrée de l'aire, donc estime cette racine.", "Mets au carré chaque valeur à une décimale voisine et trouve quel carré tombe le plus proche de l'aire."]);

E("u2-reasoning-var", 2, ["3.3","6.10"], 3, "var", varset([
  function(){
    return mcq("Rina affirme que 0,81 est un carré parfait parce que 81 est un carré parfait et que les chiffres sont les mêmes. Quelle option juge son affirmation correctement ?",
      {t:"L'affirmation est exacte, car 0,9 fois 0,9 égale 0,81", fb:"Exact : un nombre décimal est un carré parfait quand un nombre au carré le donne."},
      [{t:"L'affirmation est fausse, car les décimaux ne sont jamais des carrés", fb:"Les décimaux peuvent être des carrés : vérifie 0,9 fois 0,9 toi-même."},
       {t:"L'affirmation est fausse, car 0,81 sur 2 n'est pas entier", fb:"Diviser par deux n'est pas le test : le test est de multiplier un nombre par lui-même."},
       {t:"L'affirmation est exacte, car 81 sur 100 est entier", fb:"Le résultat est bon mais cette raison échoue : 81 sur 100 n'est pas entier."}],
      "\\(0,9 \\times 0,9 = 0,81\\), donc un nombre fois lui-même donne 0,81. Le jugement correct est <b>l'affirmation est exacte, car 0,9 fois 0,9 égale 0,81</b>.",
      {mode:"static-decimal-claim"});
  },
  function(){
    return mcq("Dev affirme que \\("+FR(18,49)+"\\) est un carré parfait parce que 49 est un carré parfait. Quelle option juge son affirmation correctement ?",
      {t:"L'affirmation est fausse, car 18 n'est pas un carré parfait", fb:"Exact : le haut et le bas doivent tous deux être des carrés parfaits."},
      [{t:"L'affirmation est exacte, car 49 est un carré à lui seul", fb:"Une partie qui est un carré ne suffit pas : vérifie aussi la partie du haut."},
       {t:"L'affirmation est fausse, car les fractions ne sont jamais des carrés", fb:"Les fractions peuvent être des carrés quand les deux parties sont des nombres carrés."},
       {t:"L'affirmation est exacte, car 18 est proche du carré 16", fb:"Proche n'est pas égal : 18 lui-même devrait être un carré."}],
      "Une fraction est un carré parfait seulement quand son haut et son bas sont tous deux des carrés parfaits. Ici, 49 est un carré mais 18 ne l'est pas. Le jugement correct est <b>l'affirmation est fausse, car 18 n'est pas un carré parfait</b>.",
      {mode:"static-fraction-claim"});
  },
  function(){
    return mcq("Tess estime \\(\\sqrt{48}\\) à 24, en disant qu'elle a divisé 48 par deux pour défaire le carré. Quelle option juge sa méthode correctement ?",
      {t:"La méthode est fausse : 48 se trouve entre 36 et 49, donc la racine se trouve entre 6 et 7", fb:"Exact : les carrés repères donnent l'intervalle, et diviser par deux n'est pas prendre la racine."},
      [{t:"La méthode est bonne : diviser un nombre par deux donne toujours sa racine carrée", fb:"Teste-la sur 16 : diviser par deux donne 8, mais la racine carrée est 4."},
       {t:"La méthode est fausse : la racine de 48 est exactement 7 car 48 s'arrondit à 49, le carré parfait voisin", fb:"Arrondir le nombre de départ ne rend pas la racine exacte."},
       {t:"La méthode est bonne : 24 fois 24 est assez proche de 48 pour une estimation qui suffit ici", fb:"24 au carré donne 576, ce qui n'est pas du tout proche de 48."}],
      "Les carrés repères donnent \\(36 < 48 < 49\\), donc \\(6 < \\sqrt{48} < 7\\), et diviser par deux ne défait jamais un carré. Le jugement correct est <b>la méthode est fausse : la racine se trouve entre 6 et 7</b>.",
      {mode:"static-estimate-flaw"});
  }
]), ["Juge une affirmation en la testant avec la définition, pas par son apparence.", "Pour une affirmation sur un carré, multiplie un candidat par lui-même ; pour une estimation, encadre-la entre des carrés parfaits."]);

/* TRANSLATOR NOTES
 * Judgement calls (glossary silent): "product law" = "loi du produit";
 * "quotient law" = "loi du quotient"; "power of a power law" = "loi de la
 * puissance d'une puissance"; "repeated multiplication" = "multiplication
 * répétée"; "pattern" (exponent pattern) = "régularité"; "brackets" =
 * "parenthèses"; "single power" = "une seule puissance" in prompts and
 * "puissance unique" in solutions; "first power" in zero-exponent feedback
 * rendered as "puissance d'exposant 1" to avoid ambiguity.
 * In u3-law-then-sum-difference the source reuses the variable word
 * ("sum"/"difference") for both display text and the internal mode string.
 * Display uses a new variable wordFr ("somme"/"différence") so the mode
 * string stays "law-then-sum"/"law-then-difference", unchanged.
 * FMT-GEOM lines left: none. This chunk has no SVG or geometry fmt uses;
 * every display fmt( was converted to fmtD(.
 * Money and percent: none occur in this chunk. Literal decimals in display
 * strings: none occur; the decimal values in u3-zero-exponent are code
 * numeric literals (the aList array), left unchanged per the invariants.
 * Literal formatted numbers written into static prose (decimals,
 * thousands, %, $): NONE. Every generated number routes through fmtD.
 * For reconciliation: the only literal numerals in static text are small
 * integers that are mathematics or labels, reproduced unchanged from the
 * source: step labels "Étape 1" to "Étape 4" in u3-find-the-error,
 * exponent values 0, 1 and 2 in u3-zero-exponent feedback prose, and the
 * KaTeX example values in u3-explanations-var (8, 9, 6, 4, 125, 25, 5, 1,
 * 0, -9). No thousands grouping, "%" or "$" appears anywhere in the chunk.
 */
