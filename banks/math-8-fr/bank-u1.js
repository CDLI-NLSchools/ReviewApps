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
