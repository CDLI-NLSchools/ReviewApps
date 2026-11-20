// Chemistry 2202 Unit 1 Stoichiometry question bank
// CRMARKS: u1-51-write-formula=2
// CRMARKS: u1-51-write-name=2
// CRMARKS: u1-52-molar-mass=2
// CRMARKS: u1-52-mass-to-moles=2
// CRMARKS: u1-52-moles-to-mass=2
// CRMARKS: u1-52-particles-to-moles=2
// CRMARKS: u1-52-mass-to-particles=3
// CRMARKS: u1-52-mass-to-volume-stp=3
// CRMARKS: u1-53-predict-state=2
// CRMARKS: u1-54-rate-comparison=2
// CRMARKS: u1-55-temperature-prediction=2
// CRMARKS: u1-56-precipitate-formula=3
// CRMARKS: u1-56-precipitate-formula-advanced=3
// CRMARKS: u1-57-moles-direct=2
// CRMARKS: u1-57-moles-reverse=2
// CRMARKS: u1-57-particles-ratio=3
// CRMARKS: u1-58-mass-to-mass=3
// CRMARKS: u1-58-mass-to-gas-volume=3
// CRMARKS: u1-58-concentration=2
// CRMARKS: u1-58-dilution=2
// CRMARKS: u1-58-limiting-theoretical-yield=4
// CRMARKS: u1-58-excess-remaining=4
// CRMARKS: u1-59-percent-yield-direct=2
// CRMARKS: u1-59-percent-yield-from-reaction=3
// CRMARKS: u1-510-antacid-calculation=3
// CRMARKS: u1-510-airbag-and-fertilizer=3
// CRMARKS: u1-51-write-acid-formula=2
// CRMARKS: u1-59-actual-from-percent=2
// CRMARKS: u1-510-limestone-lime=3
// CRMARKS: u1-510-peroxide-oxygen=3

/* ============ Units and significant figures discipline (Nov 2026 pass) ============
   Givens print at 3 significant figures minimum (data sheet constants such
   as molar masses keep their full printed precision). Intermediates print
   at 4 significant figures: one guard digit, following the Chemistry 3202
   clarifications rule to carry at least one extra digit through a
   calculation and round only the final answer. Final answers are stored
   and printed at 3 significant figures, always with their unit in the
   solution. Exact numbers (coefficients, counts, ratios) are exempt. */
function sfR(x,sf){if(!isFinite(x)||x===0)return 0;var d=Math.pow(10,sf-Math.ceil(Math.log10(Math.abs(x))));return Math.round(x*d)/d;}
function sfSup(e){var m={"-":"\u207B","0":"\u2070","1":"\u00B9","2":"\u00B2","3":"\u00B3","4":"\u2074","5":"\u2075","6":"\u2076","7":"\u2077","8":"\u2078","9":"\u2079"};return String(e).split("").map(function(c){return m[c];}).join("");}
function sfF(x,sf){var r=sfR(x,sf);if(r===0)return "0."+"000".slice(0,Math.max(0,sf-1));var exp=Math.floor(Math.log10(Math.abs(r))),dec=sf-1-exp;if(dec<0){return (r/Math.pow(10,exp)).toFixed(sf-1)+" \u00D7 10"+sfSup(exp);}return r.toFixed(dec);}
function F3(x){return sfF(x,3);}
function iF(x){return sfF(x,4);}
function gF(x){for(var sf=3;sf<=5;sf++){if(Math.abs(sfR(x,sf)-x)<=Math.abs(x)*1e-9+1e-12)return sfF(x,sf);}return fmt(x);}

E("u1-51-name-to-formula",1,["5.1"],1,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var mol=pick([{n:"carbon dioxide",f:"CO\u2082",w:["CO","C\u2082O","CO\u2083"]},{n:"carbon monoxide",f:"CO",w:["CO\u2082","C\u2082O\u2082","Co"]},{n:"sulfur dioxide",f:"SO\u2082",w:["SO","SO\u2083","S\u2082O"]},{n:"sulfur trioxide",f:"SO\u2083",w:["SO\u2082","S\u2083O","SO\u2084"]},{n:"dinitrogen tetroxide",f:"N\u2082O\u2084",w:["NO\u2082","N\u2084O\u2082","N\u2082O"]},{n:"phosphorus trichloride",f:"PCl\u2083",w:["PCl","P\u2083Cl","PCl\u2085"]},{n:"phosphorus pentachloride",f:"PCl\u2085",w:["PCl\u2083","P\u2085Cl","Cl\u2085P"]},{n:"carbon tetrachloride",f:"CCl\u2084",w:["CCl","C\u2084Cl","CCl\u2083"]},{n:"nitrogen dioxide",f:"NO\u2082",w:["NO","N\u2082O\u2084","NO\u2083"]},{n:"dinitrogen monoxide",f:"N\u2082O",w:["NO","N\u2082O\u2082","NO\u2082"]},{n:"boron trifluoride",f:"BF\u2083",w:["BF","B\u2083F","BF\u2082"]},{n:"silicon dioxide",f:"SiO\u2082",w:["SiO","Si\u2082O","SiO\u2083"]}]);
  if(pick(["ionic","ionic","ionic","molecular"])==="molecular"){
    return mcq("What is the chemical formula of "+mol.n+"?",mol.f,mol.w,"The name gives the number of each atom directly. Prefixes in the name of a molecular compound become the subscripts in the formula, and a subscript of 1 is not written. The formula is <b>"+mol.f+"</b>.",{name:mol.n});
  }
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"lithium",fd:"Li",q:1,p:0},{n:"silver",fd:"Ag",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"strontium",fd:"Sr",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"iodide",fd:"I",q:1,p:0},{n:"fluoride",fd:"F",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"nitride",fd:"N",q:3,p:0},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,correct=mk(cs,as),name=cat.n+" "+an.n;
  var pairs=[[1,1],[2,1],[1,2],[cs+1,as],[cs,as+1],[as,cs],[2,2],[3,2],[cs+2,as],[1,3]],seen={},ds=[];
  var cand=shuffle(pairs.slice());
  for(var i=0;i<cand.length&&ds.length<3;i++){var f=mk(cand[i][0],cand[i][1]);if(f!==correct&&!seen[f]){seen[f]=1;ds.push(f);}}
  return mcq("What is the chemical formula of "+name+"?",correct,ds,"The "+cat.n+" ion has charge "+cat.q+"+ and the "+an.n+" ion has charge "+an.q+"-. The subscripts are chosen so the total positive charge equals the total negative charge, using "+cs+" cation(s) for every "+as+" anion(s). A polyatomic ion is placed in parentheses when more than one is needed. The formula is <b>"+correct+"</b>.",{name:name});
});

E("u1-51-formula-to-name",1,["5.1"],1,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var mol=pick([{f:"CO\u2082",n:"carbon dioxide",w:["carbon monoxide","carbon oxide","dicarbon dioxide"]},{f:"SO\u2083",n:"sulfur trioxide",w:["sulfur dioxide","sulfur oxide","trisulfur oxide"]},{f:"N\u2082O\u2084",n:"dinitrogen tetroxide",w:["nitrogen dioxide","dinitrogen dioxide","nitrogen tetroxide"]},{f:"PCl\u2085",n:"phosphorus pentachloride",w:["phosphorus trichloride","pentaphosphorus chloride","phosphorus chloride"]},{f:"SF\u2086",n:"sulfur hexafluoride",w:["sulfur fluoride","sulfur pentafluoride","hexasulfur fluoride"]},{f:"Cl\u2082O",n:"dichlorine monoxide",w:["chlorine monoxide","dichlorine oxide","chlorine dioxide"]},{f:"NO",n:"nitrogen monoxide",w:["nitrogen dioxide","nitrogen oxide","mononitrogen monoxide"]},{f:"CCl\u2084",n:"carbon tetrachloride",w:["carbon chloride","carbon trichloride","tetracarbon chloride"]}]);
  if(pick(["ionic","ionic","ionic","molecular"])==="molecular"){
    return mcq("What is the name of "+mol.f+"?",mol.n,mol.w,"Molecular compounds are named with prefixes that state the number of each kind of atom shown by the subscripts. Reading the subscripts in "+mol.f+" gives <b>"+mol.n+"</b>.",{formula:mol.f});
  }
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"lithium",fd:"Li",q:1,p:0},{n:"silver",fd:"Ag",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"copper(I)",fd:"Cu",q:1,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"iodide",fd:"I",q:1,p:0},{n:"fluoride",fd:"F",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"nitride",fd:"N",q:3,p:0},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,formula=mk(cs,as),correct=cat.n+" "+an.n;
  var oc=pick(cats),oa=pick(ans),seen={},ds=[];
  var pool=[oc.n+" "+an.n,cat.n+" "+oa.n,oc.n+" "+oa.n];
  var cand=shuffle(pool.slice());
  for(var i=0;i<cand.length;i++){if(cand[i]!==correct&&!seen[cand[i]]){seen[cand[i]]=1;ds.push(cand[i]);}}
  var extra=["sodium "+an.n,"calcium "+an.n,cat.n+" chloride",cat.n+" sulfate",cat.n+" oxide"];
  var ex=shuffle(extra.slice());
  for(var j=0;j<ex.length&&ds.length<3;j++){if(ex[j]!==correct&&!seen[ex[j]]){seen[ex[j]]=1;ds.push(ex[j]);}}
  ds=ds.slice(0,3);
  return mcq("What is the name of "+formula+"?",correct,ds,"The formula contains the "+cat.n+" cation and the "+an.n+" anion, combined so the charges balance. The cation is named first and the anion second, which gives <b>"+correct+"</b>.",{formula:formula});
});

E("u1-51-write-formula",1,["5.1"],2,"gen",function(){
  function sb(n,plain){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=plain?s.charAt(i):String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var cats=[{n:"sodium",fd:"Na",fp:"Na",q:1,p:0},{n:"potassium",fd:"K",fp:"K",q:1,p:0},{n:"ammonium",fd:"NH\u2084",fp:"NH4",q:1,p:1},{n:"magnesium",fd:"Mg",fp:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",fp:"Ca",q:2,p:0},{n:"barium",fd:"Ba",fp:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",fp:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",fp:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",fp:"Fe",q:2,p:0},{n:"lead(II)",fd:"Pb",fp:"Pb",q:2,p:0},{n:"aluminum",fd:"Al",fp:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",fp:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",fp:"Cl",q:1,p:0},{n:"bromide",fd:"Br",fp:"Br",q:1,p:0},{n:"nitrate",fd:"NO\u2083",fp:"NO3",q:1,p:1},{n:"hydroxide",fd:"OH",fp:"OH",q:1,p:1},{n:"acetate",fd:"CH\u2083COO",fp:"CH3COO",q:1,p:1},{n:"oxide",fd:"O",fp:"O",q:2,p:0},{n:"sulfide",fd:"S",fp:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",fp:"SO4",q:2,p:1},{n:"carbonate",fd:"CO\u2083",fp:"CO3",q:2,p:1},{n:"phosphate",fd:"PO\u2084",fp:"PO4",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as,plain){
    var cf=plain?cat.fp:cat.fd,af=plain?an.fp:an.fd;
    var left=cat.p?(cs>1?"("+cf+")"+sb(cs,plain):cf):cf+(cs>1?sb(cs,plain):"");
    var right=an.p?(as>1?"("+af+")"+sb(as,plain):af):af+(as>1?sb(as,plain):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),cs=an.q/g,as=cat.q/g,disp=mk(cs,as,false),plain=mk(cs,as,true),name=cat.n+" "+an.n;
  var acc=disp===plain?[disp]:[disp,plain];
  return textq("Write the chemical formula for "+name+".",acc,"Write the cation first and the anion second. The "+cat.n+" ion has charge "+cat.q+"+ and the "+an.n+" ion has charge "+an.q+"-, so "+cs+" cation(s) and "+as+" anion(s) are needed for the total charge to be zero. A polyatomic ion used more than once goes in parentheses. The formula is <b>"+disp+"</b>.",{name:name});
});

E("u1-51-write-name",1,["5.1"],2,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  function gcd(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  var cats=[{n:"sodium",fd:"Na",q:1,p:0},{n:"potassium",fd:"K",q:1,p:0},{n:"ammonium",fd:"NH\u2084",q:1,p:1},{n:"magnesium",fd:"Mg",q:2,p:0},{n:"calcium",fd:"Ca",q:2,p:0},{n:"barium",fd:"Ba",q:2,p:0},{n:"zinc",fd:"Zn",q:2,p:0},{n:"copper(II)",fd:"Cu",q:2,p:0},{n:"iron(II)",fd:"Fe",q:2,p:0},{n:"lead(II)",fd:"Pb",q:2,p:0},{n:"aluminum",fd:"Al",q:3,p:0},{n:"iron(III)",fd:"Fe",q:3,p:0}];
  var ans=[{n:"chloride",fd:"Cl",q:1,p:0},{n:"bromide",fd:"Br",q:1,p:0},{n:"nitrate",fd:"NO\u2083",q:1,p:1},{n:"hydroxide",fd:"OH",q:1,p:1},{n:"oxide",fd:"O",q:2,p:0},{n:"sulfide",fd:"S",q:2,p:0},{n:"sulfate",fd:"SO\u2084",q:2,p:1},{n:"carbonate",fd:"CO\u2083",q:2,p:1},{n:"phosphate",fd:"PO\u2084",q:3,p:1}];
  var cat=pick(cats),an=pick(ans);
  function mk(cs,as){
    var left=cat.p?(cs>1?"("+cat.fd+")"+sb(cs):cat.fd):cat.fd+(cs>1?sb(cs):"");
    var right=an.p?(as>1?"("+an.fd+")"+sb(as):an.fd):an.fd+(as>1?sb(as):"");
    return left+right;
  }
  var g=gcd(cat.q,an.q),formula=mk(an.q/g,cat.q/g),name=cat.n+" "+an.n;
  var acc=[name];
  if(name.indexOf("(II)")>=0){acc.push(name.replace("(II)"," (II)"));}
  if(name.indexOf("(III)")>=0){acc.push(name.replace("(III)"," (III)"));}
  if(name.indexOf("aluminum")>=0){acc.push(name.replace("aluminum","aluminium"));}
  return textq("Write the name of the compound "+formula+".",acc,"Identify the ions in the formula. The cation is "+cat.n+" and the anion is "+an.n+", and their charges balance in the proportions shown. The cation is named first, giving <b>"+name+"</b>.",{formula:formula});
});

E("u1-51-acids-hydrates",1,["5.1"],2,"gen",function(){
  function sb(n){var s=String(n),o="",i;for(i=0;i<s.length;i++){o+=String.fromCharCode(0x2080+parseInt(s.charAt(i),10));}return o;}
  var branch=pick(["acid","acid","hydrate","hydrate","molecular"]);
  if(branch==="acid"){
    var a=pick([{f:"HCl(aq)",n:"hydrochloric acid",w:["chloric acid","chlorous acid","hydrogen chloride acid"]},{f:"HBr(aq)",n:"hydrobromic acid",w:["bromic acid","bromous acid","hydrogen bromide acid"]},{f:"HF(aq)",n:"hydrofluoric acid",w:["fluoric acid","fluorous acid","hydrogen fluoride acid"]},{f:"HNO\u2083(aq)",n:"nitric acid",w:["nitrous acid","hydronitric acid","nitrogen acid"]},{f:"H\u2082SO\u2084(aq)",n:"sulfuric acid",w:["sulfurous acid","hydrosulfuric acid","sulfur acid"]},{f:"H\u2082SO\u2083(aq)",n:"sulfurous acid",w:["sulfuric acid","hydrosulfurous acid","sulfur acid"]},{f:"H\u2083PO\u2084(aq)",n:"phosphoric acid",w:["phosphorous acid","hydrophosphoric acid","phosphorus acid"]},{f:"CH\u2083COOH(aq)",n:"acetic acid",w:["carbonic acid","formic acid","hydroacetic acid"]},{f:"H\u2082CO\u2083(aq)",n:"carbonic acid",w:["carbonous acid","hydrocarbonic acid","acetic acid"]}]);
    return mcq("What is the name of the acid "+a.f+"?",a.n,a.w,"Acids in aqueous solution are named from the anion they contain. An anion ending in ide gives a hydro prefix and an ic ending, an anion ending in ate gives an ic ending, and an anion ending in ite gives an ous ending. Applying the matching pattern gives <b>"+a.n+"</b>.",{formula:a.f});
  }
  if(branch==="hydrate"){
    var salts=[{bf:"CuSO\u2084",bn:"copper(II) sulfate"},{bf:"CaCl\u2082",bn:"calcium chloride"},{bf:"MgSO\u2084",bn:"magnesium sulfate"},{bf:"Na\u2082CO\u2083",bn:"sodium carbonate"},{bf:"BaCl\u2082",bn:"barium chloride"},{bf:"CoCl\u2082",bn:"cobalt(II) chloride"},{bf:"FeSO\u2084",bn:"iron(II) sulfate"},{bf:"ZnSO\u2084",bn:"zinc sulfate"}];
    var pref=["","mono","di","tri","tetra","penta","hexa","hepta","octa","nona","deca","hendeca","dodeca"];
    var s=pick(salts),w=ri(2,10),formula=s.bf+"\u00B7"+w+"H\u2082O",correct=s.bn+" "+pref[w]+"hydrate";
    var ds=[s.bn+" "+pref[w-1]+"hydrate",s.bn+" "+pref[w+1]+"hydrate",s.bn+" "+pref[w+2]+"hydrate"];
    return mcq("What is the name of the hydrate "+formula+"?",correct,ds,"In a hydrate name, the anhydrous compound is named first. The number of water molecules per formula unit is then stated with a prefix, here "+w+" water molecules, giving the prefix "+pref[w]+". The name is <b>"+correct+"</b>.",{formula:formula,w:w});
  }
  var m=pick([{f:"N\u2082O\u2084",n:"dinitrogen tetroxide",w:["nitrogen dioxide","dinitrogen dioxide","nitrogen tetroxide"]},{f:"PCl\u2083",n:"phosphorus trichloride",w:["phosphorus chloride","triphosphorus chloride","phosphorus pentachloride"]},{f:"SF\u2086",n:"sulfur hexafluoride",w:["sulfur fluoride","hexasulfur fluoride","sulfur tetrafluoride"]},{f:"CO",n:"carbon monoxide",w:["carbon oxide","carbon dioxide","monocarbon oxide"]},{f:"SO\u2082",n:"sulfur dioxide",w:["sulfur oxide","sulfur monoxide","disulfur oxide"]}]);
  return mcq("What is the name of the molecular compound "+m.f+"?",m.n,m.w,"The subscripts are read as prefixes in the name, with mono used for a single atom of the second element but omitted for a single atom of the first element. Reading "+m.f+" this way gives <b>"+m.n+"</b>.",{formula:m.f});
});

E("u1-52-molar-mass",1,["5.2"],1,"gen",function(){
  var water=2*CHEM_AM.H+CHEM_AM.O;
  var bases=[{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl,b:"22.99 + 35.45"},{f:"CaCl\u2082",m:CHEM_AM.Ca+2*CHEM_AM.Cl,b:"40.08 + 2(35.45)"},{f:"MgSO\u2084",m:CHEM_AM.Mg+CHEM_AM.S+4*CHEM_AM.O,b:"24.31 + 32.07 + 4(16.00)"},{f:"CuSO\u2084",m:CHEM_AM.Cu+CHEM_AM.S+4*CHEM_AM.O,b:"63.55 + 32.07 + 4(16.00)"},{f:"KNO\u2083",m:CHEM_AM.K+CHEM_AM.N+3*CHEM_AM.O,b:"39.10 + 14.01 + 3(16.00)"},{f:"Na\u2082CO\u2083",m:CHEM_AM.Na*2+CHEM_AM.C+3*CHEM_AM.O,b:"2(22.99) + 12.01 + 3(16.00)"},{f:"BaCl\u2082",m:CHEM_AM.Ba+2*CHEM_AM.Cl,b:"137.33 + 2(35.45)"},{f:"NH\u2084NO\u2083",m:2*CHEM_AM.N+4*CHEM_AM.H+3*CHEM_AM.O,b:"2(14.01) + 4(1.01) + 3(16.00)"},{f:"Ca(OH)\u2082",m:CHEM_AM.Ca+2*(CHEM_AM.O+CHEM_AM.H),b:"40.08 + 2(16.00 + 1.01)"},{f:"Al\u2082(SO\u2084)\u2083",m:2*CHEM_AM.Al+3*(CHEM_AM.S+4*CHEM_AM.O),b:"2(26.98) + 3(32.07 + 4(16.00))"},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O,b:"6(12.01) + 12(1.01) + 6(16.00)"},{f:"Fe\u2082O\u2083",m:2*CHEM_AM.Fe+3*CHEM_AM.O,b:"2(55.85) + 3(16.00)"}];
  var b=pick(bases),w=pick([0,0,0,0,1,2,3,5,6,7,10]);
  var m=b.m+w*water,f=b.f;
  if(w>0){f=b.f+"\u00B7"+w+"H\u2082O";}
  var sol="Molar mass is the mass of one mole of formula units. Add the atomic masses of all the atoms in the formula: "+b.b+" = "+fmtF(b.m,2)+" g/mol for the anhydrous compound.";
  if(w>0){sol+=" The hydrate also contains "+w+" water molecules per formula unit, adding "+w+"(18.02) = "+fmtF(w*water,2)+" g/mol. The total molar mass is <b>"+fmtF(m,2)+" g/mol</b>.";}
  else{sol+=" The molar mass is <b>"+fmtF(m,2)+" g/mol</b>.";}
  return numq("Calculate the molar mass of "+f+". Give your answer in g/mol.",m,Math.max(0.05,m*0.01),sol,{cp:b.f,w:w});
});

E("u1-52-mass-to-moles",1,["5.2"],2,"gen",function(){
  var cps=[{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"O\u2082",m:2*CHEM_AM.O},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O},{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O},{f:"H\u2082SO\u2084",m:2*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O},{f:"KOH",m:CHEM_AM.K+CHEM_AM.O+CHEM_AM.H},{f:"Fe",m:CHEM_AM.Fe},{f:"Cu",m:CHEM_AM.Cu},{f:"N\u2082",m:2*CHEM_AM.N}];
  var cp=pick(cps),n=ri(15,950)/100,mass=Math.round(n*cp.m*100)/100;
  return numq("How many moles are in "+gF(mass)+" g of "+cp.f+"? Give your answer in mol (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",sfR(n,3),Math.max(0.01,n*0.02),"Amount in moles = mass / molar mass = "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = <b>"+F3(n)+" mol</b>.",{cp:cp.f,n:n});
});

E("u1-52-moles-to-mass",1,["5.2"],2,"gen",function(){
  var cps=[{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"O\u2082",m:2*CHEM_AM.O},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O},{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O},{f:"H\u2082SO\u2084",m:2*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O},{f:"KOH",m:CHEM_AM.K+CHEM_AM.O+CHEM_AM.H},{f:"Zn",m:CHEM_AM.Zn},{f:"Ag",m:CHEM_AM.Ag},{f:"SO\u2082",m:CHEM_AM.S+2*CHEM_AM.O}];
  var cp=pick(cps),n=ri(5,800)/100,ans=sfR(n*cp.m,3);
  return numq("What mass, in grams, is "+gF(n)+" mol of "+cp.f+"? Give your answer in g (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",ans,Math.max(0.05,ans*0.02),"Mass = amount in moles \u00D7 molar mass = "+gF(n)+" mol \u00D7 "+fmtF(cp.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{cp:cp.f,n:n});
});

E("u1-52-particles-to-moles",1,["5.2"],2,"gen",function(){
  var cps=[{f:"H\u2082O",p:"molecules"},{f:"CO\u2082",p:"molecules"},{f:"NH\u2083",p:"molecules"},{f:"CH\u2084",p:"molecules"},{f:"O\u2082",p:"molecules"},{f:"NaCl",p:"formula units"},{f:"CaCO\u2083",p:"formula units"},{f:"MgO",p:"formula units"},{f:"Fe",p:"atoms"},{f:"Cu",p:"atoms"},{f:"Zn",p:"atoms"},{f:"He",p:"atoms"}];
  var cp=pick(cps),e=pick([23,23,24]),k=ri(120,950)/100;
  var moles=k*Math.pow(10,e-23)/6.022,ans=sfR(moles,3);
  return numq("A sample contains \\("+fmtF(k,2)+" \\times 10^{"+e+"}\\) "+cp.p+" of "+cp.f+". How many moles is this? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"One mole contains \\(6.022 \\times 10^{23}\\) particles. Amount in moles = number of particles / \\(6.022 \\times 10^{23}\\) = \\("+fmtF(k,2)+" \\times 10^{"+e+"}\\) / \\(6.022 \\times 10^{23}\\) = <b>"+F3(ans)+" mol</b>.",{cp:cp.f,k:k,e:e});
});

E("u1-52-mass-to-particles",1,["5.2"],3,"gen",function(){
  var cps=[{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,p:"molecules"},{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,p:"molecules"},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,p:"molecules"},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,p:"molecules"},{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl,p:"formula units"},{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,p:"formula units"},{f:"Fe",m:CHEM_AM.Fe,p:"atoms"},{f:"Cu",m:CHEM_AM.Cu,p:"atoms"}];
  var cp=pick(cps),nDrawn=ri(20,600)/100,mass=Math.round(nDrawn*cp.m*100)/100,n=mass/cp.m,ans=sfR(sfR(n,4)*CHEM_AV,3);
  return numq("How many "+cp.p+" are in "+gF(mass)+" g of "+cp.f+"? Give your answer as a number in scientific notation, for example 1.20e24 (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",ans,ans*0.02,"First change mass to moles: "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = "+iF(n)+" mol. Then multiply by the Avogadro constant: "+iF(n)+" \u00D7 \\(6.022 \\times 10^{23}\\) = <b>"+ans.toExponential(2)+" "+cp.p+"</b>.",{cp:cp.f,n:nDrawn});
});

E("u1-52-mass-to-volume-stp",1,["5.2"],2,"gen",function(){
  var gases=[{f:"O\u2082",m:2*CHEM_AM.O},{f:"N\u2082",m:2*CHEM_AM.N},{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O},{f:"H\u2082",m:2*CHEM_AM.H},{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H},{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H},{f:"SO\u2082",m:CHEM_AM.S+2*CHEM_AM.O},{f:"CO",m:CHEM_AM.C+CHEM_AM.O}];
  var g=pick(gases),nDrawn=ri(10,500)/100,mass=sfR(nDrawn*g.m,4),n=mass/g.m,vol=sfR(sfR(n,4)*22.4,3);
  return numq("What volume does "+gF(mass)+" g of "+g.f+" gas occupy at STP? Give your answer in L (the molar mass of "+g.f+" is "+fmtF(g.m,2)+" g/mol, and the molar volume at STP is 22.4 L/mol).",vol,Math.max(0.05,vol*0.02),"First change mass to moles: "+gF(mass)+" g / "+fmtF(g.m,2)+" g/mol = "+iF(n)+" mol. Then multiply by the molar volume at STP: "+iF(n)+" \u00D7 22.4 L/mol = <b>"+F3(vol)+" L</b>.",{cp:g.f,n:nDrawn});
});

E("u1-53-dynamic-equilibrium",1,["5.3"],1,"gen",function(){
  var s=pick(["sodium chloride","sucrose","potassium nitrate","copper(II) sulfate","sodium carbonate","ammonium chloride"]);
  var t=ri(15,35);
  return mcq("A saturated solution of "+s+" in water at "+t+" \u00B0C sits in a closed container with some undissolved solid present. Which statement best describes the solution at equilibrium?","Dissolving and crystallizing continue at equal rates",["Dissolving has stopped completely","Crystallizing has stopped completely","Particles no longer move between the solid and the solution"],"At saturation the solution holds the maximum amount of dissolved solute it can hold at that temperature. Particles still leave the solid and still return to it, but the two processes happen at equal rates, so the amount dissolved stays constant. Dissolving and crystallizing continue at equal rates.",{solute:s,t:t});
});

E("u1-53-observations",1,["5.3"],2,"var",varset([
  function(){
    var s=pick(["sodium chloride","copper(II) sulfate","potassium nitrate","sucrose"]),t=ri(18,30);
    return mcq("A single large crystal is placed in a saturated solution of "+s+" at "+t+" \u00B0C and observed over several days in a closed container. What is observed?","The total mass of the crystal stays the same, though its shape may change slightly",["The crystal slowly dissolves completely","The crystal grows steadily larger without limit","The crystal dissolves and then reappears each day"],"The solution is already saturated, so there is no net dissolving. Particles crystallize onto the crystal at the same rate as particles dissolve from it, so its mass stays constant even though surface particles keep exchanging. The total mass of the crystal stays the same.",{solute:s,t:t});
  },
  function(){
    var s=pick(["copper(II) sulfate","potassium dichromate","nickel(II) sulfate","food colouring"]),t=ri(18,30);
    return mcq("A saturated, coloured solution of "+s+" at "+t+" \u00B0C is kept closed and undisturbed at a constant temperature. What happens to the intensity of the colour over time?","It stays the same",["It steadily gets darker","It steadily gets paler","It fades and then returns once a day"],"Colour intensity follows the concentration of dissolved solute. At equilibrium the concentration is constant because dissolving and crystallizing occur at equal rates, so the colour intensity stays the same.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sodium chloride","sucrose","potassium nitrate"]),t=ri(20,32),v=ri(80,200);
    return mcq("A small extra crystal of "+s+" is dropped into "+v+" mL of its saturated solution at "+t+" \u00B0C. There is no temperature change. What happens to the extra crystal?","It remains undissolved, with no net change in its mass",["It dissolves completely within a few minutes","It causes all the dissolved solute to crystallize out","It dissolves and doubles the concentration"],"A saturated solution cannot hold any more dissolved solute at that temperature. The added crystal joins the undissolved solid and there is no net dissolving, so it remains undissolved with no net change in mass.",{solute:s,v:v,t:t});
  },
  function(){
    var s=pick(["potassium nitrate","sodium chloride","ammonium chloride"]),t=ri(15,28);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C contains undissolved solid. A student claims the solid proves dissolving has stopped. Which response is correct?","The claim is wrong: solid particles keep dissolving while dissolved particles keep crystallizing, at equal rates",["The claim is right: nothing happens once a solution is saturated","The claim is wrong: the solid is dissolving, but nothing is crystallizing","The claim is right: the solid and the solution no longer interact"],"Saturation is a dynamic equilibrium, not a stopped process. Both dissolving and crystallizing continue, and because their rates are equal there is no net change in the amount of solid or in the concentration.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sucrose","sodium carbonate","calcium chloride"]),t=ri(19,31),m=ri(5,40);
    return mcq("In a closed flask at "+t+" \u00B0C, a saturated solution of "+s+" is in equilibrium with "+m+" g of undissolved solid. If the flask is left for a week at the same temperature, the mass of undissolved solid will be","Still "+m+" g, because the rates of dissolving and crystallizing are equal",["Less than "+m+" g, because dissolving never stops","More than "+m+" g, because crystallizing never stops","Zero, because all solid eventually dissolves at equilibrium"],"At equilibrium the two opposing processes balance. As much solid dissolves each minute as crystallizes each minute, so the undissolved mass stays at "+m+" g as long as the temperature is unchanged.",{solute:s,t:t,m:m});
  }
]));

E("u1-53-identify-type",1,["5.3"],2,"gen",function(){
  var solutes=[{n:"sodium chloride",max:36},{n:"potassium chloride",max:34},{n:"ammonium chloride",max:37},{n:"sodium nitrate",max:88},{n:"potassium bromide",max:65},{n:"sucrose",max:200}];
  var s=pick(solutes),branch=pick(["unsat","sat","super"]);
  var opts=["Unsaturated solution","Saturated solution","Supersaturated solution","A suspension"];
  if(branch==="unsat"){
    var amt=s.max-ri(3,20);
    return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student dissolves "+amt+" g of "+s.n+" in 100 mL of water at 25 \u00B0C and no solid remains. How is the solution best classified?","Unsaturated solution",["Saturated solution","Supersaturated solution","A suspension"] ,amt+" g is less than the maximum of "+s.max+" g that can dissolve, and no solid is present. The solution could still dissolve more solute, so it is an unsaturated solution.",{solute:s.n,amt:amt});
  }
  if(branch==="sat"){
    var extra=ri(2,15);
    return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student adds "+(s.max+extra)+" g of "+s.n+" to 100 mL of water at 25 \u00B0C, stirs thoroughly, and some solid remains at the bottom. How is the solution best classified?","Saturated solution",["Unsaturated solution","Supersaturated solution","A suspension"],"The solution holds the maximum amount it can dissolve, "+s.max+" g, and the extra "+extra+" g stays undissolved. A solution holding its maximum dissolved amount in contact with undissolved solid is a saturated solution.",{solute:s.n,extra:extra});
  }
  var over=ri(4,25);
  return mcq("At 25 \u00B0C, at most "+s.max+" g of "+s.n+" can dissolve in 100 mL of water. A student dissolves "+(s.max+over)+" g of "+s.n+" in 100 mL of water at 80 \u00B0C, then cools the clear solution very slowly to 25 \u00B0C without disturbing it. No crystals form. How is the solution best classified?","Supersaturated solution",["Unsaturated solution","Saturated solution","A suspension"],"The cooled solution holds "+(s.max+over)+" g dissolved, which is more than the "+s.max+" g maximum at 25 \u00B0C. A solution holding more dissolved solute than its equilibrium maximum is a supersaturated solution.",{solute:s.n,over:over});
});

E("u1-53-predict-state",1,["5.3"],3,"gen",function(){
  var hi=ri(55,95),lo=hi-ri(15,35),t1=ri(60,85),t2=ri(15,25),branch=pick(["undisturbed","seeded","diluted"]);
  if(branch==="undisturbed"){
    return textq("In an experiment, "+hi+" g of a salt was dissolved in 100 mL of water at "+t1+" \u00B0C to make a saturated solution. The clear solution was then cooled slowly to "+t2+" \u00B0C, where a saturated solution holds only "+lo+" g per 100 mL. The cooled solution was left completely undisturbed and no crystals formed. Give the one word term that describes the cooled solution.",["supersaturated","supersaturated solution"],"The cooled solution still holds "+hi+" g dissolved, more than the "+lo+" g that a saturated solution holds at "+t2+" \u00B0C. Because it holds more than the equilibrium maximum without crystallizing, it is <b>supersaturated</b>.",{branch:branch,hi:hi,lo:lo});
  }
  if(branch==="seeded"){
    return textq("In an experiment, "+hi+" g of a salt was dissolved in 100 mL of water at "+t1+" \u00B0C. The solution was cooled to "+t2+" \u00B0C, where a saturated solution holds "+lo+" g per 100 mL, and a seed crystal was added. Crystals formed until no more change occurred. Give the one word term that describes the solution that remains.",["saturated","saturated solution"],"Adding the seed crystal let the excess solute crystallize out until only "+lo+" g remained dissolved, the maximum at "+t2+" \u00B0C. A solution holding its maximum dissolved amount is <b>saturated</b>.",{branch:branch,hi:hi,lo:lo});
  }
  return textq("A saturated solution of a salt at "+t2+" \u00B0C holds "+lo+" g of the salt per 100 mL of water. A student adds another 100 mL of pure water and stirs until all the solid dissolves. Give the one word term that describes the resulting solution.",["unsaturated","unsaturated solution"],"Adding water increased the amount the solution could hold, and all the solid dissolved with room to spare. A solution that could still dissolve more solute is <b>unsaturated</b>.",{branch:branch,lo:lo});
});

E("u1-54-equilibrium-definition",1,["5.4"],1,"gen",function(){
  var s=pick(["sodium chloride","sucrose","potassium nitrate","copper(II) sulfate","ammonium chloride","sodium carbonate"]);
  var t=ri(16,34),v=ri(100,500);
  var wrong=shuffle(["The concentration of dissolved solute keeps increasing slowly","The rate of dissolving drops to zero once saturation is reached","The mass of undissolved solid increases steadily over time","No solid needs to be present for a solution to be saturated"].slice()).slice(0,3);
  return mcq("Which statement correctly defines equilibrium in a saturated solution of "+s+" (a "+v+" mL sample held at "+t+" \u00B0C with solid present)?","The rate of dissolving equals the rate of crystallizing, so the concentration stays constant",wrong,"Equilibrium in a saturated solution is dynamic. Solute dissolves and crystallizes at equal rates, so the dissolved concentration and the amount of solid stay constant even though both processes continue. The rate of dissolving equals the rate of crystallizing, so the concentration stays constant.",{solute:s,t:t,v:v});
});

E("u1-54-what-stays-constant",1,["5.4"],2,"var",varset([
  function(){
    var s=pick(["sodium chloride","potassium nitrate","sucrose"]),t=ri(18,30);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium with excess solid in a closed container. Which quantity stays constant over time?","The concentration of the dissolved solute",["The number of particles leaving the solid each second is zero","The identity of the particles in the solution stops changing","The mass of each individual crystal keeps growing"],"At equilibrium the rates of dissolving and crystallizing are equal, so the amount dissolved does not change. The concentration of the dissolved solute therefore stays constant, even though particles keep exchanging between the phases.",{solute:s,t:t});
  },
  function(){
    var s=pick(["copper(II) sulfate","ammonium chloride","sodium carbonate"]),t=ri(20,33);
    return mcq("Which description of particle movement is correct for a saturated solution of "+s+" at equilibrium at "+t+" \u00B0C?","Particles keep moving both into and out of the solution at equal rates",["Particles move only out of the solid and into the solution","Particles move only out of the solution and onto the solid","Particles stop moving once equilibrium is reached"],"Equilibrium is dynamic. Dissolving and crystallizing both continue, and equilibrium means the two rates are equal, not that movement has stopped.",{solute:s,t:t});
  },
  function(){
    var s=pick(["sucrose","sodium chloride","potassium chloride"]),m=ri(4,30),t=ri(17,29);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium with "+m+" g of solid. What can be said about that "+m+" g of solid over the next hour at the same temperature?","Its total mass stays "+m+" g, although the particles making it up change",["Its total mass slowly increases as more solute crystallizes than dissolves","Its total mass slowly decreases as more solute dissolves than crystallizes","It all dissolves and an equal mass of new solid appears at once"],"Because dissolving and crystallizing balance, there is no net change in the solid. Individual particles exchange, but the total mass of solid stays "+m+" g.",{solute:s,m:m,t:t});
  },
  function(){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride"]),t=ri(21,35),c=pick(["3.00","4.50","5.20","6.10"]);
    return mcq("At "+t+" \u00B0C a saturated solution of "+s+" has a solute concentration of "+c+" mol/L. The closed system sits at equilibrium for two days at the same temperature. The concentration after two days is","Still "+c+" mol/L, because the two rates are equal",["Higher than "+c+" mol/L, because dissolving continues","Lower than "+c+" mol/L, because crystallizing continues","Zero, because equilibrium means the reaction is finished"],"Both processes continue at equilibrium, but at equal rates, so there is no net change. The concentration remains "+c+" mol/L.",{solute:s,t:t});
  },
  function(){
    var s=pick(["calcium chloride","magnesium sulfate","sodium chloride"]),t=ri(16,27);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C is at equilibrium. Which change would disturb the equilibrium?","Heating the solution to a higher temperature",["Watching the solution for a longer time","Moving the closed flask to another bench","Labelling the flask with the date"],"Equilibrium holds only while conditions stay the same. Changing the temperature changes how much solute the solution can hold, so one rate temporarily exceeds the other until a new equilibrium is reached.",{solute:s,t:t});
  }
]));

E("u1-54-add-solvent-or-solute",1,["5.4"],2,"gen",function(){
  var s=pick(["sodium chloride","potassium nitrate","sucrose","copper(II) sulfate"]);
  var t=ri(18,32),branch=pick(["solvent","solute","alldissolves"]);
  if(branch==="solvent"){
    var v=ri(20,80);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C sits over excess solid. A student adds "+v+" mL of pure water and stirs, keeping the temperature the same and leaving some solid still present at the end. What happens?","More solid dissolves until the solution is saturated again, at the same concentration",["The solution stays saturated the whole time and no more solid dissolves","The final concentration is higher than the original saturated concentration","All of the solid dissolves and the solution becomes dilute"],"Adding water makes the solution temporarily unsaturated, so dissolving becomes faster than crystallizing. More solid dissolves until saturation is restored, and at the same temperature the saturated concentration is the same as before.",{solute:s,branch:branch,v:v});
  }
  if(branch==="solute"){
    var m=ri(3,20);
    return mcq("A saturated solution of "+s+" at "+t+" \u00B0C already contains undissolved solid. A student stirs in another "+m+" g of solid "+s+" at the same temperature. What happens?","The added solid stays undissolved and the concentration does not change",["The added solid dissolves and the concentration rises","The added solid dissolves and the concentration stays the same because the volume grows","The added solid causes dissolved solute to crystallize until half is solid"],"The solution already holds its maximum dissolved amount at "+t+" \u00B0C. Extra solid cannot dissolve on balance, so it joins the undissolved solid and the concentration does not change.",{solute:s,branch:branch,m:m});
  }
  var m2=ri(1,4),v2=ri(150,400);
  return mcq("A saturated solution of "+s+" at "+t+" \u00B0C contains only "+m2+" g of undissolved solid. A student adds "+v2+" mL of pure water and stirs at the same temperature, and all of the solid dissolves. The final solution is","Unsaturated, with a lower concentration than the saturated solution",["Saturated, with the same concentration as before","Supersaturated, because extra water was added","Saturated, with a higher concentration than before"],"With a large volume of added water, all the solid dissolves and the solution could still hold more solute. It is therefore unsaturated, and spreading the same amount of solute through more solvent lowers the concentration.",{solute:s,branch:branch});
});

E("u1-54-rate-comparison",1,["5.4"],3,"gen",function(){
  var s=pick(["sodium chloride","potassium nitrate","sucrose","ammonium chloride"]);
  var t=ri(18,30),branch=pick(["water","seed","undisturbed"]);
  if(branch==="water"){
    return textq("A saturated solution of "+s+" at "+t+" \u00B0C is in equilibrium with excess solid. Pure water is added and the mixture is stirred. In the first moments after the water is added, which process is temporarily faster: dissolving or crystallizing? Give one word.",["dissolving"],"Adding water makes the solution unsaturated for the moment, so more solute can dissolve than is crystallizing. The temporarily faster process is <b>dissolving</b>, until saturation is restored.",{branch:branch,solute:s});
  }
  if(branch==="seed"){
    var hi=ri(50,90),lo=hi-ri(15,30);
    return textq("A clear solution holds "+hi+" g of "+s+" dissolved in 100 mL of water at "+t+" \u00B0C, although a saturated solution at this temperature holds only "+lo+" g per 100 mL. A seed crystal of "+s+" is dropped in. In the first moments after the seed is added, which process is temporarily faster: dissolving or crystallizing? Give one word.",["crystallizing","crystallisation","crystallizing out"],"The solution is supersaturated, so it holds more solute than it can keep at equilibrium. The seed crystal triggers the excess solute to come out of solution, so the temporarily faster process is <b>crystallizing</b>.",{branch:branch,solute:s});
  }
  return textq("A saturated solution of "+s+" at "+t+" \u00B0C has sat closed and undisturbed at equilibrium for a full day, with solid present. How do the rates of dissolving and crystallizing compare? Give one word.",["equal","same","balanced"],"Nothing has disturbed the system, so it is still at equilibrium. At equilibrium the two opposing rates are <b>equal</b>.",{branch:branch,solute:s});
});

E("u1-55-like-dissolves-like",1,["5.5"],1,"gen",function(){
  var t=ri(20,30);
  var matched=pick(["ethanol in water","cooking oil in grease solvent","wax in hexane","sugar in water","sodium chloride in water","iodine in hexane"]);
  var mismatched=["cooking oil in water","wax in water","sodium chloride in hexane","sugar in hexane","grease in water","potassium nitrate in oil"];
  var ds=shuffle(mismatched.slice()).slice(0,3);
  return mcq("At "+t+" \u00B0C, which pair is most likely to mix well and form a solution?",matched,ds,"Solutes and solvents with similar polarity mix well, summed up as like dissolves like. Polar or ionic substances dissolve in polar solvents such as water, and nonpolar substances dissolve in nonpolar solvents. The matching pair is <b>"+matched+"</b>.",{pair:matched,t:t});
});

E("u1-55-polarity-prediction",1,["5.5"],2,"gen",function(){
  var t=ri(19,29),branch=pick(["water","hexane"]);
  if(branch==="water"){
    var correct=pick(["ethanol","glucose","ammonia","sodium chloride","potassium nitrate","copper(II) sulfate"]);
    var ds=shuffle(["cooking oil","wax","grease","iodine","sulfur"].slice()).slice(0,3);
    return mcq("Water is a polar solvent. At "+t+" \u00B0C, which substance is most likely to dissolve readily in water?",correct,ds,correct+" is polar or ionic, so it is attracted to polar water molecules and dissolves readily. Oil, wax, grease, iodine and sulfur are nonpolar and do not dissolve appreciably in water. Like dissolves like.",{solvent:"water",correct:correct});
  }
  var c2=pick(["cooking oil","wax","grease","iodine","naphthalene"]);
  var d2=shuffle(["sodium chloride","glucose","potassium nitrate","copper(II) sulfate","ammonia"].slice()).slice(0,3);
  return mcq("Hexane is a nonpolar solvent. At "+t+" \u00B0C, which substance is most likely to dissolve readily in hexane?",c2,d2,c2+" is nonpolar, so it mixes with the nonpolar solvent hexane. Ionic and strongly polar substances are not attracted to hexane and stay undissolved. Like dissolves like.",{solvent:"hexane",correct:c2});
});

E("u1-55-temperature-effects",1,["5.5"],2,"gen",function(){
  var t1=ri(10,25),t2=t1+ri(20,40),branch=pick(["solid","gas"]);
  if(branch==="solid"){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride","potassium chloride"]);
    return mcq("A saturated solution of the solid "+s+" in water is heated from "+t1+" \u00B0C to "+t2+" \u00B0C, with undissolved solid present. What usually happens?","More solid dissolves, because the solubility of most solids in water increases as temperature rises",["All the dissolved solute crystallizes out, because heating always lowers solubility","Nothing changes, because temperature never affects the solubility of a solid","The solution boils away and leaves only dry solid behind"],"For most solid solutes, solubility in water increases as temperature increases. Heating the saturated solution lets more of the undissolved "+s+" dissolve.",{solute:s,t1:t1,t2:t2});
  }
  var g=pick(["carbon dioxide","oxygen","nitrogen"]);
  return mcq("Water holding dissolved "+g+" gas is warmed from "+t1+" \u00B0C to "+t2+" \u00B0C in an open container. What happens to the amount of dissolved gas?","It decreases, because the solubility of gases in water decreases as temperature rises",["It increases, because gases dissolve better in warm water","It stays exactly the same, because temperature does not affect gases","It increases until the water is fully saturated with gas at any pressure"],"Gas solubility in water falls as temperature rises, which is why warm soda goes flat and warm lake water holds less oxygen. Warming the water drives some dissolved "+g+" out, so the amount dissolved decreases.",{gas:g,t1:t1,t2:t2});
});

E("u1-55-temperature-prediction",1,["5.5"],3,"gen",function(){
  var branch=pick(["soda","solidheat","lake","solidcool"]);
  if(branch==="soda"){
    var t1=ri(2,8),t2=ri(22,30);
    return textq("A bottle of carbonated drink is moved from a fridge at "+t1+" \u00B0C to a counter at "+t2+" \u00B0C and opened. As the drink warms, the solubility of the dissolved carbon dioxide in the drink increases or decreases? Give one word.",["decreases","decrease"],"Gases become less soluble in water as temperature rises. As the drink warms, carbon dioxide escapes as bubbles, so its solubility <b>decreases</b>.",{branch:branch});
  }
  if(branch==="solidheat"){
    var s=pick(["potassium nitrate","sodium nitrate","ammonium chloride"]),a=ri(20,35),b=a+ri(25,40);
    return textq("A saturated solution of the solid "+s+" in water, with solid present, is heated from "+a+" \u00B0C to "+b+" \u00B0C. In general, the solubility of a solid such as "+s+" in water increases or decreases as temperature rises? Give one word.",["increases","increase"],"Most solid solutes dissolve better in warm water. Heating lets more of the solid dissolve, so the solubility <b>increases</b>.",{branch:branch,solute:s});
  }
  if(branch==="lake"){
    var a2=ri(24,32);
    return textq("On a hot day the surface water of a lake reaches "+a2+" \u00B0C. Compared with cold water, the amount of dissolved oxygen the warm water can hold is higher or lower? Give one word.",["lower","less"],"Oxygen is a gas, and gases are less soluble in warmer water. Warm lake water holds less dissolved oxygen, so the amount is <b>lower</b>.",{branch:branch});
  }
  var s2=pick(["potassium chloride","sodium chloride","sucrose"]),c=ri(35,50),d=c-ri(15,25);
  return textq("A saturated solution of the solid "+s2+" in water, with solid present, is cooled from "+c+" \u00B0C to "+d+" \u00B0C. In general, the solubility of a solid such as "+s2+" in water increases or decreases as temperature falls? Give one word.",["decreases","decrease"],"Most solids are less soluble in colder water. Cooling a saturated solution makes some solute crystallize out, so the solubility <b>decreases</b> as temperature falls.",{branch:branch,solute:s2});
});

E("u1-56-solubility-rule",1,["5.6"],1,"gen",function(){
  var soluble=[{f:"NaCl",r:"Compounds of alkali metals such as sodium are soluble, and chlorides are soluble with only a few exceptions."},{f:"KNO\u2083",r:"All nitrates are soluble."},{f:"NH\u2084Cl",r:"All ammonium compounds are soluble."},{f:"Na\u2082SO\u2084",r:"Sulfates are soluble except those of barium, lead and calcium, and sodium is an alkali metal."},{f:"Ca(NO\u2083)\u2082",r:"All nitrates are soluble, whatever the cation."},{f:"K\u2082CO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium, and potassium is an alkali metal."},{f:"(NH\u2084)\u2082CO\u2083",r:"All ammonium compounds are soluble, which overrides the usual insolubility of carbonates."},{f:"CH\u2083COONa",r:"All acetates are soluble."},{f:"Mg(NO\u2083)\u2082",r:"All nitrates are soluble."},{f:"LiBr",r:"Compounds of alkali metals such as lithium are soluble."}];
  var insoluble=[{f:"AgCl",r:"Chlorides are soluble except those of silver, lead and mercury(I)."},{f:"PbI\u2082",r:"Iodides are soluble except those of silver, lead and mercury(I)."},{f:"BaSO\u2084",r:"Sulfates are soluble except those of barium, lead and calcium."},{f:"CaCO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."},{f:"Fe(OH)\u2083",r:"Hydroxides are insoluble except those of alkali metals and ammonium."},{f:"Ag\u2082CO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."},{f:"Ca\u2083(PO\u2084)\u2082",r:"Phosphates are insoluble except those of alkali metals and ammonium."},{f:"CuS",r:"Sulfides are insoluble except those of alkali metals and ammonium."},{f:"PbBr\u2082",r:"Bromides are soluble except those of silver, lead and mercury(I)."},{f:"BaCO\u2083",r:"Carbonates are insoluble except those of alkali metals and ammonium."}];
  var slight=[{f:"CaSO\u2084",r:"Sulfates are soluble except those of barium and lead, and calcium sulfate is only slightly soluble."},{f:"Ca(OH)\u2082",r:"Hydroxides are insoluble except those of alkali metals and ammonium, and calcium hydroxide is only slightly soluble."}];
  var kind=pick(["soluble","soluble","insoluble","insoluble","slight"]);
  var item=kind==="soluble"?pick(soluble):(kind==="insoluble"?pick(insoluble):pick(slight));
  var correct=kind==="soluble"?"Soluble in water":(kind==="insoluble"?"Insoluble in water":"Slightly soluble in water");
  var all=["Soluble in water","Slightly soluble in water","Insoluble in water","Reacts violently with water"],ds=[];
  for(var i=0;i<all.length;i++){if(all[i]!==correct){ds.push(all[i]);}}
  var t=ri(15,35),room=pick(["a school lab","a teaching lab","an industrial lab","a water quality lab"]);
  return mcq("In "+room+" at "+t+" \u00B0C, a student checks the general solubility rules before adding a compound to water. According to the rules, how is "+item.f+" classified in water?",correct,ds,item.r+" So "+item.f+" is classified as: <b>"+correct+"</b>.",{cp:item.f,t:t});
});

E("u1-56-which-mixture-precipitates",1,["5.6"],2,"gen",function(){
  var conc=pick(["0.05","0.10","0.20","0.50"]),t=ri(18,28);
  var sets=[
    {c:"barium chloride and sodium sulfate",w:["sodium nitrate and potassium chloride","ammonium chloride and sodium nitrate","potassium sulfate and sodium chloride"],e:"Mixing barium ions with sulfate ions forms barium sulfate, which is insoluble because sulfates of barium are an exception to sulfate solubility. The other pairs give only soluble ions in combination, so no precipitate forms."},
    {c:"silver nitrate and sodium chloride",w:["potassium nitrate and sodium sulfate","ammonium sulfate and lithium chloride","sodium acetate and potassium chloride"],e:"Silver ions and chloride ions form silver chloride, an insoluble chloride exception. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"lead(II) nitrate and potassium iodide",w:["sodium chloride and ammonium nitrate","barium nitrate and potassium chloride","calcium chloride and sodium nitrate"],e:"Lead(II) ions and iodide ions form lead(II) iodide, an insoluble iodide exception. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"calcium chloride and sodium carbonate",w:["potassium carbonate and ammonium chloride","sodium sulfate and potassium nitrate","lithium chloride and sodium acetate"],e:"Calcium ions and carbonate ions form calcium carbonate, and carbonates are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"iron(III) chloride and sodium hydroxide",w:["ammonium hydroxide and sodium chloride","potassium hydroxide and lithium nitrate","sodium hydroxide and ammonium sulfate"],e:"Iron(III) ions and hydroxide ions form iron(III) hydroxide, and hydroxides are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"copper(II) sulfate and sodium sulfide",w:["zinc sulfate and potassium nitrate","sodium sulfide and ammonium chloride","potassium sulfate and lithium chloride"],e:"Copper(II) ions and sulfide ions form copper(II) sulfide, and sulfides are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."},
    {c:"magnesium chloride and sodium hydroxide",w:["sodium chloride and potassium sulfate","ammonium chloride and lithium nitrate","potassium hydroxide and sodium acetate"],e:"Magnesium ions and hydroxide ions form magnesium hydroxide, which is insoluble. The other pairs produce only soluble compounds, so no precipitate forms."},
    {c:"barium nitrate and potassium carbonate",w:["calcium nitrate and sodium chloride","ammonium carbonate and potassium nitrate","lithium sulfate and sodium chloride"],e:"Barium ions and carbonate ions form barium carbonate, and carbonates are insoluble except with alkali metals and ammonium. The other pairs produce only soluble compounds."}
  ];
  var st=pick(sets);
  return mcq("Four pairs of "+conc+" mol/L solutions are mixed in separate test tubes at "+t+" \u00B0C. Which pair forms a precipitate?",st.c,st.w,st.e,{pair:st.c,conc:conc});
});

E("u1-56-precipitate-formula",1,["5.6"],2,"gen",function(){
  var concs=["0.05","0.10","0.20","0.25","0.50","1.0"];
  var pairs=[
    {a:"silver nitrate",b:"sodium chloride",p:"AgCl",pp:"AgCl",e:"Silver ions meet chloride ions. Chlorides are soluble except with silver, lead and mercury(I), so the precipitate is silver chloride, AgCl. The sodium and nitrate ions stay in solution."},
    {a:"lead(II) nitrate",b:"potassium iodide",p:"PbI\u2082",pp:"PbI2",e:"Lead(II) ions meet iodide ions. Iodides are soluble except with silver, lead and mercury(I), so the precipitate is lead(II) iodide, PbI\u2082."},
    {a:"barium chloride",b:"sodium sulfate",p:"BaSO\u2084",pp:"BaSO4",e:"Barium ions meet sulfate ions. Sulfates are soluble except with barium, lead and calcium, so the precipitate is barium sulfate, BaSO\u2084."},
    {a:"calcium chloride",b:"sodium carbonate",p:"CaCO\u2083",pp:"CaCO3",e:"Calcium ions meet carbonate ions. Carbonates are insoluble except with alkali metals and ammonium, so the precipitate is calcium carbonate, CaCO\u2083."},
    {a:"iron(III) chloride",b:"sodium hydroxide",p:"Fe(OH)\u2083",pp:"Fe(OH)3",e:"Iron(III) ions meet hydroxide ions. Hydroxides are insoluble except with alkali metals and ammonium, and three hydroxide ions balance one iron(III) ion, giving Fe(OH)\u2083."},
    {a:"copper(II) sulfate",b:"sodium sulfide",p:"CuS",pp:"CuS",e:"Copper(II) ions meet sulfide ions. Sulfides are insoluble except with alkali metals and ammonium, so the precipitate is copper(II) sulfide, CuS."},
    {a:"magnesium chloride",b:"sodium hydroxide",p:"Mg(OH)\u2082",pp:"Mg(OH)2",e:"Magnesium ions meet hydroxide ions. Hydroxides are insoluble except with alkali metals and ammonium, and two hydroxide ions balance one magnesium ion, giving Mg(OH)\u2082."},
    {a:"lead(II) nitrate",b:"sodium chloride",p:"PbCl\u2082",pp:"PbCl2",e:"Lead(II) ions meet chloride ions. Chlorides are soluble except with silver, lead and mercury(I), and two chloride ions balance one lead(II) ion, giving PbCl\u2082."},
    {a:"silver nitrate",b:"potassium bromide",p:"AgBr",pp:"AgBr",e:"Silver ions meet bromide ions. Bromides are soluble except with silver, lead and mercury(I), so the precipitate is silver bromide, AgBr."},
    {a:"barium nitrate",b:"potassium carbonate",p:"BaCO\u2083",pp:"BaCO3",e:"Barium ions meet carbonate ions. Carbonates are insoluble except with alkali metals and ammonium, so the precipitate is barium carbonate, BaCO\u2083."},
    {a:"calcium nitrate",b:"ammonium phosphate",p:"Ca\u2083(PO\u2084)\u2082",pp:"Ca3(PO4)2",e:"Calcium ions meet phosphate ions. Phosphates are insoluble except with alkali metals and ammonium. Three calcium ions balance two phosphate ions, giving Ca\u2083(PO\u2084)\u2082."},
    {a:"zinc chloride",b:"sodium sulfide",p:"ZnS",pp:"ZnS",e:"Zinc ions meet sulfide ions. Sulfides are insoluble except with alkali metals and ammonium, so the precipitate is zinc sulfide, ZnS."}
  ];
  var nones=[
    {a:"sodium nitrate",b:"potassium chloride",e:"Swapping the ions gives sodium chloride and potassium nitrate. Nitrates are all soluble and sodium and potassium compounds are soluble, so no precipitate forms."},
    {a:"ammonium chloride",b:"sodium nitrate",e:"Swapping the ions gives ammonium nitrate and sodium chloride. Ammonium compounds, nitrates and alkali metal compounds are all soluble, so no precipitate forms."},
    {a:"potassium sulfate",b:"sodium nitrate",e:"Swapping the ions gives potassium nitrate and sodium sulfate, both soluble. No insoluble combination is produced, so no precipitate forms."},
    {a:"lithium bromide",b:"ammonium acetate",e:"Swapping the ions gives lithium acetate and ammonium bromide. Acetates, ammonium compounds and alkali metal compounds are all soluble, so no precipitate forms."}
  ];
  var c1=pick(concs),c2=pick(concs);
  if(pick(["precip","precip","precip","none"])==="none"){
    var nn=pick(nones);
    return textq("A "+c1+" mol/L solution of "+nn.a+" is mixed with a "+c2+" mol/L solution of "+nn.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",["none","no precipitate"],nn.e+" The answer is <b>none</b>.",{a:nn.a,b:nn.b});
  }
  var pr=pick(pairs);
  var acc=pr.p===pr.pp?[pr.p]:[pr.p,pr.pp];
  return textq("A "+c1+" mol/L solution of "+pr.a+" is mixed with a "+c2+" mol/L solution of "+pr.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",acc,pr.e,{a:pr.a,b:pr.b});
});

E("u1-56-precipitate-or-soluble",1,["5.6"],2,"gen",function(){
  var pairs=[
    {a:"silver nitrate",b:"sodium chloride",c:"AgCl",w:["NaNO\u2083","AgNO\u2083","AgCl\u2082"],e:"Silver chloride is insoluble, while the other product, sodium nitrate, stays dissolved. The precipitate is AgCl."},
    {a:"barium chloride",b:"sodium sulfate",c:"BaSO\u2084",w:["NaCl","BaCl\u2082","Ba(SO\u2084)\u2082"],e:"Barium sulfate is insoluble, while sodium chloride stays dissolved. The precipitate is BaSO\u2084."},
    {a:"calcium chloride",b:"sodium carbonate",c:"CaCO\u2083",w:["NaCl","CaCl\u2082","Ca(CO\u2083)\u2082"],e:"Calcium carbonate is insoluble, while sodium chloride stays dissolved. The precipitate is CaCO\u2083."},
    {a:"lead(II) nitrate",b:"potassium iodide",c:"PbI\u2082",w:["KNO\u2083","PbI","Pb(NO\u2083)\u2082"],e:"Lead(II) iodide is insoluble, while potassium nitrate stays dissolved. The precipitate is PbI\u2082."},
    {a:"iron(III) chloride",b:"sodium hydroxide",c:"Fe(OH)\u2083",w:["NaCl","FeOH","Fe(OH)\u2082"],e:"Iron(III) hydroxide is insoluble, while sodium chloride stays dissolved. The precipitate is Fe(OH)\u2083."},
    {a:"sodium nitrate",b:"potassium chloride",c:"No precipitate forms",w:["NaCl","KNO\u2083","NaKClNO\u2083"],e:"Every possible combination of these ions is soluble: all nitrates are soluble and sodium and potassium compounds are soluble. No precipitate forms."},
    {a:"ammonium sulfate",b:"sodium chloride",c:"No precipitate forms",w:["NH\u2084Cl","Na\u2082SO\u2084","(NH\u2084)\u2082Cl"],e:"Ammonium compounds and alkali metal compounds are soluble, and this pairing produces no insoluble combination. No precipitate forms."},
    {a:"copper(II) sulfate",b:"sodium sulfide",c:"CuS",w:["Na\u2082SO\u2084","CuSO\u2084","Cu\u2082S"],e:"Copper(II) sulfide is insoluble, while sodium sulfate stays dissolved. The precipitate is CuS."},
    {a:"magnesium nitrate",b:"potassium hydroxide",c:"Mg(OH)\u2082",w:["KNO\u2083","MgOH","Mg(OH)\u2083"],e:"Magnesium hydroxide is insoluble, while potassium nitrate stays dissolved. The precipitate is Mg(OH)\u2082."},
    {a:"potassium carbonate",b:"ammonium nitrate",c:"No precipitate forms",w:["KNO\u2083","(NH\u2084)\u2082CO\u2083","NH\u2084NO\u2083"],e:"Potassium and ammonium carbonates are the soluble exceptions to carbonate insolubility, and all nitrates are soluble. No precipitate forms."}
  ];
  var pr=pick(pairs),conc=pick(["0.05","0.10","0.20","0.50"]),t=ri(18,30);
  return mcq("Equal volumes of "+conc+" mol/L "+pr.a+" solution and "+conc+" mol/L "+pr.b+" solution are mixed at "+t+" \u00B0C. What is observed?",pr.c,pr.w,pr.e,{a:pr.a,b:pr.b,t:t});
});

E("u1-56-precipitate-formula-advanced",1,["5.6"],3,"gen",function(){
  var concs=["0.02","0.05","0.10","0.15","0.20","0.40"];
  var pairs=[
    {a:"mercury(I) nitrate",b:"sodium chloride",p:"Hg\u2082Cl\u2082",pp:"Hg2Cl2",e:"Mercury(I) exists as the Hg\u2082\u00B2\u207A ion. Chlorides are soluble except with silver, lead and mercury(I), so mercury(I) chloride precipitates. Two chloride ions balance the 2+ charge, giving Hg\u2082Cl\u2082."},
    {a:"lead(II) acetate",b:"potassium sulfate",p:"PbSO\u2084",pp:"PbSO4",e:"All acetates are soluble, so lead(II) acetate dissolves and releases lead(II) ions. Sulfates are soluble except with barium, lead and calcium, so lead(II) sulfate, PbSO\u2084, precipitates."},
    {a:"copper(II) chloride",b:"ammonium sulfide",p:"CuS",pp:"CuS",e:"Ammonium sulfide is soluble because ammonium compounds are soluble, so sulfide ions are free in solution. Sulfides are insoluble except with alkali metals and ammonium, so copper(II) sulfide, CuS, precipitates."},
    {a:"iron(II) sulfate",b:"sodium hydroxide",p:"Fe(OH)\u2082",pp:"Fe(OH)2",e:"Iron(II) sulfate is soluble, so iron(II) ions are free in solution. Hydroxides are insoluble except with alkali metals and ammonium, and two hydroxide ions balance one iron(II) ion, giving Fe(OH)\u2082."},
    {a:"aluminum sulfate",b:"sodium phosphate",p:"AlPO\u2084",pp:"AlPO4",e:"Aluminum sulfate is soluble. Phosphates are insoluble except with alkali metals and ammonium, and the 3+ aluminum ion balances the 3- phosphate ion one to one, giving AlPO\u2084."},
    {a:"chromium(III) chloride",b:"sodium hydroxide",p:"Cr(OH)\u2083",pp:"Cr(OH)3",e:"Chromium(III) chloride is soluble. Hydroxides are insoluble except with alkali metals and ammonium, and three hydroxide ions balance one chromium(III) ion, giving Cr(OH)\u2083."},
    {a:"lead(II) nitrate",b:"sodium sulfate",p:"PbSO\u2084",pp:"PbSO4",e:"All nitrates are soluble, so lead(II) ions are free in solution. Sulfates are soluble except with barium, lead and calcium, so lead(II) sulfate, PbSO\u2084, precipitates."},
    {a:"silver nitrate",b:"sodium phosphate",p:"Ag\u2083PO\u2084",pp:"Ag3PO4",e:"All nitrates are soluble, so silver ions are free in solution. Phosphates are insoluble except with alkali metals and ammonium, and three silver ions balance one phosphate ion, giving Ag\u2083PO\u2084."},
    {a:"manganese(II) chloride",b:"sodium sulfide",p:"MnS",pp:"MnS",e:"Manganese(II) chloride is soluble. Sulfides are insoluble except with alkali metals and ammonium, so manganese(II) sulfide, MnS, precipitates."},
    {a:"calcium chloride",b:"potassium phosphate",p:"Ca\u2083(PO\u2084)\u2082",pp:"Ca3(PO4)2",e:"Both starting salts are soluble. Phosphates are insoluble except with alkali metals and ammonium, and three calcium ions balance two phosphate ions, giving Ca\u2083(PO\u2084)\u2082."}
  ];
  var pr=pick(pairs),c1=pick(concs),c2=pick(concs);
  var acc=pr.p===pr.pp?[pr.p]:[pr.p,pr.pp];
  return textq("A "+c1+" mol/L solution of "+pr.a+" is mixed with a "+c2+" mol/L solution of "+pr.b+". Give the formula of the precipitate that forms, or write none if no precipitate forms.",acc,pr.e,{a:pr.a,b:pr.b});
});

E("u1-57-identify-ratio",1,["5.7"],1,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082",sp:[{n:"H\u2082O\u2082",c:2},{n:"H\u2082O",c:2},{n:"O\u2082",c:1}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Na + 2H\u2082O \u2192 2NaOH + H\u2082",sp:[{n:"Na",c:2},{n:"H\u2082O",c:2},{n:"NaOH",c:2},{n:"H\u2082",c:1}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var A=r.sp[i],B=r.sp[j],correct=A.c+":"+B.c;
  var pool=[B.c+":"+A.c,"1:1",(A.c+1)+":"+B.c,A.c+":"+(B.c+1),"1:"+B.c,A.c+":1",(A.c+B.c)+":"+B.c,(A.c+2)+":"+B.c,A.c+":"+(B.c+2),(A.c+1)+":"+(B.c+1),"3:2","2:3",(B.c+2)+":"+A.c],seen={},ds=[];
  var cand=shuffle(pool.slice());
  for(var k=0;k<cand.length&&ds.length<3;k++){if(cand[k]!==correct&&!seen[cand[k]]){seen[cand[k]]=1;ds.push(cand[k]);}}
  return mcq("For the reaction "+r.eq+", what is the mole ratio of "+A.n+" to "+B.n+"?",correct,ds,"Mole ratios are read directly from the coefficients of the balanced equation. The coefficient of "+A.n+" is "+A.c+" and the coefficient of "+B.n+" is "+B.c+", so the ratio of "+A.n+" to "+B.n+" is <b>"+correct+"</b>.",{eq:r.eq,a:A.n,b:B.n});
});

E("u1-57-moles-direct",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Na + 2H\u2082O \u2192 2NaOH + H\u2082",sp:[{n:"Na",c:2},{n:"H\u2082O",c:2},{n:"NaOH",c:2},{n:"H\u2082",c:1}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var G=r.sp[i],T=r.sp[j],given=ri(10,900)/100,ans=sfR(given*T.c/G.c,3);
  return numq("For the reaction "+r.eq+", how many moles of "+T.n+" are produced or consumed when "+gF(given)+" mol of "+G.n+" reacts? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"Use the mole ratio from the balanced equation: moles of "+T.n+" = "+gF(given)+" mol "+G.n+" \u00D7 ("+T.c+" mol "+T.n+" / "+G.c+" mol "+G.n+") = <b>"+F3(ans)+" mol</b>.",{eq:r.eq,g:G.n,t:T.n,given:given});
});

E("u1-57-moles-reverse",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"2H\u2082O\u2082 \u2192 2H\u2082O + O\u2082",sp:[{n:"H\u2082O\u2082",c:2,role:"r"},{n:"H\u2082O",c:2,role:"p"},{n:"O\u2082",c:1,role:"p"}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2,role:"r"},{n:"KCl",c:2,role:"p"},{n:"O\u2082",c:3,role:"p"}]},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",sp:[{n:"CaCO\u2083",c:1,role:"r"},{n:"CaO",c:1,role:"p"},{n:"CO\u2082",c:1,role:"p"}]},
    {eq:"2HgO \u2192 2Hg + O\u2082",sp:[{n:"HgO",c:2,role:"r"},{n:"Hg",c:2,role:"p"},{n:"O\u2082",c:1,role:"p"}]},
    {eq:"2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082",sp:[{n:"NaHCO\u2083",c:2,role:"r"},{n:"Na\u2082CO\u2083",c:1,role:"p"},{n:"H\u2082O",c:1,role:"p"},{n:"CO\u2082",c:1,role:"p"}]},
    {eq:"4NH\u2083 + 5O\u2082 \u2192 4NO + 6H\u2082O",sp:[{n:"NH\u2083",c:4,role:"r"},{n:"O\u2082",c:5,role:"r"},{n:"NO",c:4,role:"p"},{n:"H\u2082O",c:6,role:"p"}]}
  ];
  var r=pick(rxns),prods=[],reacts=[];
  for(var i=0;i<r.sp.length;i++){if(r.sp[i].role==="p"){prods.push(r.sp[i]);}else{reacts.push(r.sp[i]);}}
  var P=pick(prods),R=pick(reacts),given=ri(20,950)/100,ans=sfR(given*R.c/P.c,3);
  return numq("For the reaction "+r.eq+", a student wants to produce "+gF(given)+" mol of "+P.n+". How many moles of "+R.n+" are needed? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"Work backwards with the mole ratio from the balanced equation: moles of "+R.n+" = "+gF(given)+" mol "+P.n+" \u00D7 ("+R.c+" mol "+R.n+" / "+P.c+" mol "+P.n+") = <b>"+F3(ans)+" mol</b>.",{eq:r.eq,p:P.n,r:R.n,given:given});
});

E("u1-57-moles-mcq",1,["5.7"],2,"gen",function(){
  var rxns=[
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",sp:[{n:"Al",c:4},{n:"O\u2082",c:3},{n:"Al\u2082O\u2083",c:2}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]},
    {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[{n:"Mg",c:2},{n:"O\u2082",c:1},{n:"MgO",c:2}]}
  ];
  var r=pick(rxns),pairs=[];
  for(var i=0;i<r.sp.length;i++){for(var j=0;j<r.sp.length;j++){if(i!==j&&r.sp[i].c!==r.sp[j].c){pairs.push([r.sp[i],r.sp[j]]);}}}
  var pr=pick(pairs),G=pr[0],T=pr[1],given=ri(20,800)/100,ans=given*T.c/G.c;
  var d1=given,d2=given*G.c/T.c,d3=given*(T.c+1)/G.c;
  var vals=[ans,d1,d2,d3],tries=0;
  function clash(a,b){return Math.abs(a-b)<0.02;}
  while(tries<20&&(clash(d1,ans)||clash(d2,ans)||clash(d3,ans)||clash(d1,d2)||clash(d1,d3)||clash(d2,d3))){d3=d3+0.53;d1=clash(d1,ans)||clash(d1,d2)?d1+1.37:d1;d2=clash(d2,ans)?d2+2.11:d2;tries++;}
  return mcq("For the reaction "+r.eq+", how many moles of "+T.n+" are involved when "+gF(given)+" mol of "+G.n+" reacts? Give your answer in mol.",F3(ans),[F3(d1),F3(d2),F3(d3)],"Apply the mole ratio from the coefficients: "+gF(given)+" mol "+G.n+" \u00D7 ("+T.c+" / "+G.c+") = <b>"+F3(ans)+" mol</b> of "+T.n+". Using the ratio upside down, or skipping the ratio entirely, gives the other values.",{eq:r.eq,g:G.n,t:T.n,given:given});
});

E("u1-57-particles-ratio",1,["5.7"],3,"gen",function(){
  var rxns=[
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[{n:"H\u2082",c:2},{n:"O\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[{n:"N\u2082",c:1},{n:"H\u2082",c:3},{n:"NH\u2083",c:2}]},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[{n:"CH\u2084",c:1},{n:"O\u2082",c:2},{n:"CO\u2082",c:1},{n:"H\u2082O",c:2}]},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[{n:"KClO\u2083",c:2},{n:"KCl",c:2},{n:"O\u2082",c:3}]},
    {eq:"C\u2083H\u2088 + 5O\u2082 \u2192 3CO\u2082 + 4H\u2082O",sp:[{n:"C\u2083H\u2088",c:1},{n:"O\u2082",c:5},{n:"CO\u2082",c:3},{n:"H\u2082O",c:4}]}
  ];
  var r=pick(rxns),i=ri(0,r.sp.length-1),j=ri(0,r.sp.length-1);
  while(j===i){j=ri(0,r.sp.length-1);}
  var G=r.sp[i],T=r.sp[j],k=ri(150,900)/100,molesGiven=sfR(k/6.022,4),ans=sfR(molesGiven*T.c/G.c,3);
  return numq("For the reaction "+r.eq+", a sample contains \\("+fmtF(k,2)+" \\times 10^{23}\\) particles of "+G.n+". How many moles of "+T.n+" will react with or form from this sample? Give your answer in mol.",ans,Math.max(0.01,ans*0.02),"First change particles to moles: \\("+fmtF(k,2)+" \\times 10^{23}\\) / \\(6.022 \\times 10^{23}\\) = "+iF(molesGiven)+" mol of "+G.n+". Then apply the mole ratio from the equation: "+iF(molesGiven)+" \u00D7 ("+T.c+" / "+G.c+") = <b>"+F3(ans)+" mol</b> of "+T.n+".",{eq:r.eq,g:G.n,t:T.n,k:k});
});

E("u1-58-mass-to-mass",1,["5.8"],2,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},B:{f:"CaO",m:CHEM_AM.Ca+CHEM_AM.O,c:1}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",A:{f:"KClO\u2083",m:CHEM_AM.K+CHEM_AM.Cl+3*CHEM_AM.O,c:2},B:{f:"KCl",m:CHEM_AM.K+CHEM_AM.Cl,c:2}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},B:{f:"ZnCl\u2082",m:CHEM_AM.Zn+2*CHEM_AM.Cl,c:1}},
    {eq:"Fe\u2082O\u2083 + 3CO \u2192 2Fe + 3CO\u2082",A:{f:"Fe\u2082O\u2083",m:2*CHEM_AM.Fe+3*CHEM_AM.O,c:1},B:{f:"Fe",m:CHEM_AM.Fe,c:2}}
  ];
  var r=pick(rxns),massA=ri(20,2000)/10,nA=sfR(massA/r.A.m,4),nB=sfR(nA*r.B.c/r.A.c,4),ans=sfR(nB*r.B.m,3);
  return numq("For the reaction "+r.eq+", what mass of "+r.B.f+" is produced from "+gF(massA)+" g of "+r.A.f+"? Give your answer in g.",ans,Math.max(0.05,ans*0.02),"Change the given mass to moles: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+". Apply the mole ratio: "+iF(nA)+" \u00D7 ("+r.B.c+" / "+r.A.c+") = "+iF(nB)+" mol of "+r.B.f+". Change back to mass: "+iF(nB)+" \u00D7 "+fmtF(r.B.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{eq:r.eq,massA:massA});
});

E("u1-58-mass-to-gas-volume",1,["5.8"],2,"gen",function(){
  var rxns=[
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},G:{f:"CO\u2082",c:1}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},G:{f:"H\u2082",c:1}},
    {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",A:{f:"KClO\u2083",m:CHEM_AM.K+CHEM_AM.Cl+3*CHEM_AM.O,c:2},G:{f:"O\u2082",c:3}},
    {eq:"Mg + 2HCl \u2192 MgCl\u2082 + H\u2082",A:{f:"Mg",m:CHEM_AM.Mg,c:1},G:{f:"H\u2082",c:1}},
    {eq:"Na\u2082CO\u2083 + 2HCl \u2192 2NaCl + H\u2082O + CO\u2082",A:{f:"Na\u2082CO\u2083",m:2*CHEM_AM.Na+CHEM_AM.C+3*CHEM_AM.O,c:1},G:{f:"CO\u2082",c:1}},
    {eq:"2NaHCO\u2083 \u2192 Na\u2082CO\u2083 + H\u2082O + CO\u2082",A:{f:"NaHCO\u2083",m:CHEM_AM.Na+CHEM_AM.H+CHEM_AM.C+3*CHEM_AM.O,c:2},G:{f:"CO\u2082",c:1}}
  ];
  var r=pick(rxns),massA=ri(10,1500)/10,nA=sfR(massA/r.A.m,4),nG=sfR(nA*r.G.c/r.A.c,4),ans=sfR(nG*22.4,3);
  return numq("For the reaction "+r.eq+", what volume of "+r.G.f+" gas at STP is produced from "+gF(massA)+" g of "+r.A.f+"? Give your answer in L.",ans,Math.max(0.05,ans*0.02),"Change the given mass to moles: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+". Apply the mole ratio: "+iF(nA)+" \u00D7 ("+r.G.c+" / "+r.A.c+") = "+iF(nG)+" mol of "+r.G.f+". Change moles of gas to volume at STP: "+iF(nG)+" \u00D7 22.4 L/mol = <b>"+F3(ans)+" L</b>.",{eq:r.eq,massA:massA});
});

E("u1-58-concentration",1,["5.8"],2,"gen",function(){
  if(pick(["moles","mass"])==="moles"){
    var n=ri(5,400)/100,v=ri(100,1000),c=sfR(n/(v/1000),3);
    return numq("A solution is made by dissolving "+gF(n)+" mol of solute and making the volume up to "+v+" mL. Calculate the amount concentration of the solution. Give your answer in mol/L.",c,Math.max(0.01,c*0.02),"Amount concentration c = n / V. Convert the volume to litres: "+v+" mL = "+F3(v/1000)+" L. Then c = "+gF(n)+" mol / "+F3(v/1000)+" L = <b>"+F3(c)+" mol/L</b>.",{n:n,v:v});
  }
  var cps=[{f:"NaCl",m:CHEM_AM.Na+CHEM_AM.Cl},{f:"KNO\u2083",m:CHEM_AM.K+CHEM_AM.N+3*CHEM_AM.O},{f:"C\u2086H\u2081\u2082O\u2086",m:6*CHEM_AM.C+12*CHEM_AM.H+6*CHEM_AM.O},{f:"CuSO\u2084",m:CHEM_AM.Cu+CHEM_AM.S+4*CHEM_AM.O},{f:"NaOH",m:CHEM_AM.Na+CHEM_AM.O+CHEM_AM.H},{f:"CaCl\u2082",m:CHEM_AM.Ca+2*CHEM_AM.Cl}];
  var cp=pick(cps),mass=ri(10,600)/10,v2=pick([250,500,750,1000]),n2=sfR(mass/cp.m,4),c2=sfR(n2/(v2/1000),3);
  return numq("A solution is made by dissolving "+gF(mass)+" g of "+cp.f+" and making the volume up to "+v2+" mL. Calculate the amount concentration of the solution. Give your answer in mol/L (the molar mass of "+cp.f+" is "+fmtF(cp.m,2)+" g/mol).",c2,Math.max(0.01,c2*0.02),"First change mass to moles: "+gF(mass)+" g / "+fmtF(cp.m,2)+" g/mol = "+iF(n2)+" mol. Convert the volume: "+v2+" mL = "+F3(v2/1000)+" L. Then c = n / V = "+iF(n2)+" mol / "+F3(v2/1000)+" L = <b>"+F3(c2)+" mol/L</b>.",{cp:cp.f,mass:mass,v:v2});
});

E("u1-58-dilution",1,["5.8"],2,"gen",function(){
  var stock=pick(["hydrochloric acid","sodium hydroxide solution","copper(II) sulfate solution","potassium nitrate solution","ammonia solution"]);
  if(pick(["volume","conc"])==="volume"){
    var c1=pick([0.50,1.00,2.00,3.00,4.00,6.00]),v1=ri(10,250),factor=pick([2,4,5,10]),c2=c1/factor,ans=sfR(c1*v1/c2,3);
    return numq("A student dilutes "+v1+" mL of "+F3(c1)+" mol/L "+stock+" to prepare a "+F3(c2)+" mol/L solution, using c\u2081V\u2081 = c\u2082V\u2082. What final volume is needed? Give your answer in mL.",ans,Math.max(0.5,ans*0.02),"The amount of solute does not change during dilution, so c\u2081V\u2081 = c\u2082V\u2082. Substitute: "+F3(c1)+" mol/L \u00D7 "+v1+" mL = "+F3(c2)+" mol/L \u00D7 V\u2082. Solving gives V\u2082 = "+iF(c1*v1)+" / "+F3(c2)+" = <b>"+F3(ans)+" mL</b>.",{c1:c1,v1:v1,c2:c2});
  }
  var cc1=pick([0.50,1.00,2.00,3.00,4.00,6.00]),vv1=ri(10,200),fac=pick([2,3,4,5]),vv2=vv1*fac,ans2=sfR(cc1*vv1/vv2,3);
  return numq("A student takes "+vv1+" mL of "+F3(cc1)+" mol/L "+stock+" and dilutes it to a final volume of "+vv2+" mL, using c\u2081V\u2081 = c\u2082V\u2082. What is the concentration of the diluted solution? Give your answer in mol/L.",ans2,Math.max(0.005,ans2*0.02),"The amount of solute does not change during dilution, so c\u2081V\u2081 = c\u2082V\u2082. Substitute: "+F3(cc1)+" mol/L \u00D7 "+vv1+" mL = c\u2082 \u00D7 "+vv2+" mL. Solving gives c\u2082 = "+iF(cc1*vv1)+" / "+vv2+" = <b>"+F3(ans2)+" mol/L</b>.",{c1:cc1,v1:vv1,v2:vv2});
});

E("u1-58-limiting-theoretical-yield",1,["5.8"],3,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"H\u2082",m:2*CHEM_AM.H,c:3},P:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",A:{f:"Al",m:CHEM_AM.Al,c:4},B:{f:"O\u2082",m:2*CHEM_AM.O,c:3},P:{f:"Al\u2082O\u2083",m:2*CHEM_AM.Al+3*CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"O\u2082",m:2*CHEM_AM.O,c:2},P:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}}
  ];
  var r=pick(rxns),pA=ri(20,300)/100,pB=Math.round(pA*pick([0.5,0.7,1.4,1.8])*100)/100;
  var massA=Math.round((pA*r.A.c/r.P.c)*r.A.m*10)/10,massB=Math.round((pB*r.B.c/r.P.c)*r.B.m*10)/10;
  var nA=sfR(massA/r.A.m,4),nB=sfR(massB/r.B.m,4);
  var fromA=sfR(nA*r.P.c/r.A.c,4),fromB=sfR(nB*r.P.c/r.B.c,4);
  var lim=fromA<fromB?r.A.f:r.B.f,nP=Math.min(fromA,fromB),ans=sfR(nP*r.P.m,3);
  return numq("For the reaction "+r.eq+", a mixture of "+gF(massA)+" g of "+r.A.f+" and "+gF(massB)+" g of "+r.B.f+" reacts. Calculate the theoretical yield of "+r.P.f+". Give your answer in g.",ans,Math.max(0.05,ans*0.02),"Test each reactant. From "+r.A.f+": "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol, which can make "+iF(nA)+" \u00D7 ("+r.P.c+" / "+r.A.c+") = "+iF(fromA)+" mol of "+r.P.f+". From "+r.B.f+": "+gF(massB)+" g / "+fmtF(r.B.m,2)+" g/mol = "+iF(nB)+" mol, which can make "+iF(nB)+" \u00D7 ("+r.P.c+" / "+r.B.c+") = "+iF(fromB)+" mol of "+r.P.f+". The smaller amount wins, so "+lim+" is the limiting reactant. Theoretical yield = "+iF(nP)+" mol \u00D7 "+fmtF(r.P.m,2)+" g/mol = <b>"+F3(ans)+" g</b>.",{eq:r.eq,massA:massA,massB:massB,lim:lim});
});

E("u1-58-excess-remaining",1,["5.8"],3,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",A:{f:"H\u2082",m:2*CHEM_AM.H,c:2},B:{f:"O\u2082",m:2*CHEM_AM.O,c:1},P:{f:"H\u2082O",m:2*CHEM_AM.H+CHEM_AM.O,c:2}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"H\u2082",m:2*CHEM_AM.H,c:3},P:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"4Al + 3O\u2082 \u2192 2Al\u2082O\u2083",A:{f:"Al",m:CHEM_AM.Al,c:4},B:{f:"O\u2082",m:2*CHEM_AM.O,c:3},P:{f:"Al\u2082O\u2083",m:2*CHEM_AM.Al+3*CHEM_AM.O,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"O\u2082",m:2*CHEM_AM.O,c:2},P:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}}
  ];
  var r=pick(rxns),pA=ri(20,300)/100,pB=Math.round(pA*pick([0.5,0.7,1.4,1.8])*100)/100;
  var massA=Math.round((pA*r.A.c/r.P.c)*r.A.m*10)/10,massB=Math.round((pB*r.B.c/r.P.c)*r.B.m*10)/10;
  var nA=sfR(massA/r.A.m,4),nB=sfR(massB/r.B.m,4),fromA=sfR(nA*r.P.c/r.A.c,4),fromB=sfR(nB*r.P.c/r.B.c,4);
  var aLimits=fromA<fromB,L=aLimits?r.A:r.B,X=aLimits?r.B:r.A,nL=aLimits?nA:nB,nX=aLimits?nB:nA,massX=aLimits?massB:massA;
  var used=sfR(nL*X.c/L.c,4),left=sfR(nX-used,4),ans=sfR(left*X.m,3);
  return numq("For the reaction "+r.eq+", a mixture of "+gF(massA)+" g of "+r.A.f+" and "+gF(massB)+" g of "+r.B.f+" reacts completely. What mass of the excess reactant remains unreacted? Give your answer in g.",ans,Math.max(0.05,ans*0.02),"First find the limiting reactant. "+r.A.f+" can make "+iF(fromA)+" mol of "+r.P.f+" and "+r.B.f+" can make "+iF(fromB)+" mol, so "+L.f+" is limiting and "+X.f+" is in excess. The limiting reactant uses "+iF(nL)+" mol \u00D7 ("+X.c+" / "+L.c+") = "+iF(used)+" mol of "+X.f+". Excess remaining = "+iF(nX)+" - "+iF(used)+" = "+iF(left)+" mol, which is "+iF(left)+" \u00D7 "+fmtF(X.m,2)+" g/mol = <b>"+F3(ans)+" g</b> of "+X.f+".",{eq:r.eq,massA:massA,massB:massB,excess:X.f});
});

E("u1-59-percent-yield-direct",1,["5.9"],2,"gen",function(){
  var prods=pick(["aspirin","ammonia","methanol","ethanol","calcium oxide","sodium hydroxide","ibuprofen","copper metal"]);
  var theo=ri(50,900)/10,pct=ri(55,98),act=Math.round(theo*pct/100*10)/10,ans=sfR(act/theo*100,3);
  return numq("In a preparation of "+prods+", the theoretical yield is "+gF(theo)+" g and the actual yield obtained is "+gF(act)+" g. Calculate the percent yield. Give your answer in percent.",ans,Math.max(0.5,ans*0.02),"Percent yield = (actual yield / theoretical yield) \u00D7 100. Substitute: ("+gF(act)+" g / "+gF(theo)+" g) \u00D7 100 = <b>"+F3(ans)+" %</b>.",{prod:prods,theo:theo,act:act});
});

E("u1-59-percent-yield-from-reaction",1,["5.9"],2,"gen",function(){
  var rxns=[
    {eq:"2Mg + O\u2082 \u2192 2MgO",A:{f:"Mg",m:CHEM_AM.Mg,c:2},B:{f:"MgO",m:CHEM_AM.Mg+CHEM_AM.O,c:2}},
    {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",A:{f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,c:1},B:{f:"CaO",m:CHEM_AM.Ca+CHEM_AM.O,c:1}},
    {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",A:{f:"N\u2082",m:2*CHEM_AM.N,c:1},B:{f:"NH\u2083",m:CHEM_AM.N+3*CHEM_AM.H,c:2}},
    {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",A:{f:"CH\u2084",m:CHEM_AM.C+4*CHEM_AM.H,c:1},B:{f:"CO\u2082",m:CHEM_AM.C+2*CHEM_AM.O,c:1}},
    {eq:"Zn + 2HCl \u2192 ZnCl\u2082 + H\u2082",A:{f:"Zn",m:CHEM_AM.Zn,c:1},B:{f:"ZnCl\u2082",m:CHEM_AM.Zn+2*CHEM_AM.Cl,c:1}}
  ];
  var r=pick(rxns),massA=ri(20,1200)/10,nA=sfR(massA/r.A.m,4),theoFull=(massA/r.A.m)*(r.B.c/r.A.c)*r.B.m,theo=sfR(nA*(r.B.c/r.A.c)*r.B.m,4);
  var pct=ri(58,97),act=Math.round(theoFull*pct/100*10)/10,ans=sfR(act/theo*100,3);
  return numq("For the reaction "+r.eq+", "+gF(massA)+" g of "+r.A.f+" reacts and "+gF(act)+" g of "+r.B.f+" is actually collected. Calculate the percent yield of "+r.B.f+". Give your answer in percent.",ans,Math.max(0.5,ans*0.02),"First calculate the theoretical yield: "+gF(massA)+" g / "+fmtF(r.A.m,2)+" g/mol = "+iF(nA)+" mol of "+r.A.f+", then \u00D7 ("+r.B.c+" / "+r.A.c+") \u00D7 "+fmtF(r.B.m,2)+" g/mol = "+iF(theo)+" g of "+r.B.f+". Then percent yield = (actual / theoretical) \u00D7 100 = ("+gF(act)+" g / "+iF(theo)+" g) \u00D7 100 = <b>"+F3(ans)+" %</b>.",{eq:r.eq,massA:massA,act:act});
});

E("u1-59-maximize-yield",1,["5.9"],3,"var",varset([
  function(){
    var ctx=pick(["an industrial ammonia plant","a school preparation of magnesium oxide","a fertilizer production line"]),scale=ri(10,90);
    return mcq("In "+ctx+" running "+scale+" kg batches, one reactant is inexpensive and the other is costly. Which strategy most directly raises the amount of product formed from the costly reactant?","Use the inexpensive reactant in excess so more of the costly reactant can react",["Use equal masses of both reactants regardless of the mole ratio","Stop the reaction early so less reactant is wasted","Throw away the first batch of product and repeat the run"],"A limiting reactant caps the amount of product. Supplying the cheap reactant in excess makes the costly reactant the one that is used up as fully as possible, so more product forms from it.",{scale:scale});
  },
  function(){
    var m=ri(2,9);
    return mcq("A student collects a precipitate as the product and notices solid residue coating the beaker and stirring rod, with "+m+" small patches of product left behind. Which practice protects the actual yield?","Transfer the product quantitatively, rinsing any residue from the glassware into the collection vessel",["Leave residue in the beaker to keep the product pure","Discard the first portion of product collected","Weigh the product while it is still soaking wet"],"Product left behind on glassware or filter paper is product lost, which lowers the actual yield. Quantitative transfer, including rinsing residue into the collection vessel, recovers as much product as possible.",{});
  },
  function(){
    var t=ri(10,40);
    return mcq("A reaction mixture is usually heated for "+t+" minutes, but a test shows unreacted starting material remains at that point. Which change most directly improves the yield?","Allow the reaction more time to reach completion",["Cool the mixture so the reaction slows down","Remove half the reactants and continue with less","Stop measuring and report the theoretical yield as the result"],"If the reaction is incomplete, some reactant has not yet become product. Giving the reaction more time lets more of it react, raising the actual yield toward the theoretical yield.",{t:t});
  },
  function(){
    var prod=pick(["a gas product","a volatile liquid product"]),vol=ri(50,400);
    return mcq("In a synthesis expected to make about "+vol+" mL of "+prod+", the product can escape from an open beaker as it forms. Which change most directly improves the actual yield?","Collect the product in a closed system so none of it escapes",["Leave the beaker open longer so the product can leave","Vent the product to the room to keep the beaker clean","Add extra solvent so the escaping product is diluted"],"Product that escapes cannot be collected or weighed, so the actual yield falls. A closed collection system keeps the product in the apparatus so it can be recovered.",{vol:vol});
  },
  function(){
    var rxn=pick(["a neutralization","a precipitation reaction","a combustion synthesis"]),tmp=ri(20,80);
    return mcq("During "+rxn+" carried out at "+tmp+" \u00B0C, a second unwanted reaction uses up some of the same reactant. Which change most directly protects the yield of the wanted product?","Choose conditions that favour the wanted reaction over the side reaction",["Add more of every substance so both reactions speed up equally","Ignore the side reaction because it does not affect the yield","Report the yield including the unwanted product mass"],"A side reaction diverts reactant away from the wanted product, lowering its yield. Conditions that favour the wanted pathway leave more reactant available to form the wanted product.",{tmp:tmp});
  }
]));

E("u1-59-why-yield-is-low",1,["5.9"],3,"var",varset([
  function(){
    var prod=pick(["aspirin","copper(II) sulfate crystals","calcium oxide"]),exp=ri(5,60);
    return mcq("A class prepares "+prod+", expecting about "+exp+" g per group, and every group gets a percent yield well below 100 percent. Which is a chemically valid reason for the shortfall?","Some reactant was consumed by a side reaction that made a different product",["The theoretical yield was calculated with a balanced equation","The products were weighed on a balance","The reaction was written with state symbols"],"A side reaction uses up reactant without making the wanted product, so less product forms than the theoretical maximum. Careful calculation and weighing do not destroy product.",{exp:exp});
  },
  function(){
    var step=pick(["filtration","recrystallization","distillation"]),mins=ri(5,30);
    return mcq("After a "+step+" step that took "+mins+" minutes, a student notices a film of product left coating the glassware. How does this affect the percent yield?","It lowers the actual yield, because that product is not collected",["It raises the actual yield above 100 percent","It has no effect, because yield only depends on the equation","It changes the theoretical yield of the reaction"],"Yield compares the product actually collected with the theoretical maximum. Product left on glassware is lost during transfer, so the collected mass, and therefore the actual yield, is lower.",{mins:mins});
  },
  function(){
    var t=ri(3,12);
    return mcq("A reaction is stopped after "+t+" minutes, and a test shows starting material still present in the mixture. Why is the percent yield low?","The reaction was incomplete, so some reactant never became product",["The theoretical yield must have been too small","Unreacted starting material counts as extra product","Percent yield is always low when a timer is used"],"The theoretical yield assumes complete conversion of the limiting reactant. Stopping early leaves reactant unconverted, so less product forms and the percent yield drops.",{t:t});
  },
  function(){
    var step2=pick(["recrystallization","washing the crystals","a second filtration"]),crude=ri(8,80);
    return mcq("A crude solid product with a mass of "+crude+" g is purified by "+step2+" before it is weighed, and the percent yield drops compared with the crude mass. Why does purification lower the yield?","Purification steps remove product along with the impurities, lowering the actual yield",["Purification creates extra product from the impurities","Purification changes the mole ratio in the equation","Purification raises the theoretical yield"],"Every purification step, such as recrystallization or washing, sacrifices some product together with the impurities. That loss lowers the actual yield even though the product obtained is cleaner.",{crude:crude});
  },
  function(){
    var gas=pick(["carbon dioxide","hydrogen","oxygen"]),gv=ri(100,900);
    return mcq("A reaction should produce about "+gv+" mL of "+gas+" gas, which is collected over water in an open apparatus, and some bubbles escape around a loose fitting. Why is the measured yield low?","Some product escaped and was never collected or measured",["The escaped gas increases the mass of product","Gas products always give a 100 percent yield","The theoretical yield counts only the escaped gas"],"Yield is based on product actually recovered. Gas that leaks away is product lost, so the measured amount falls short of the theoretical yield.",{gas:gas,gv:gv});
  }
]));

E("u1-510-application-idea",1,["5.10"],1,"var",varset([
  function(){
    var n=ri(40,80);
    return mcq("A vehicle airbag inflates when about "+n+" g of sodium azide, NaN\u2083, decomposes rapidly to form nitrogen gas, N\u2082. Which stoichiometric idea makes this design possible?","A known amount of reactant produces a predictable amount of gas, so the bag can be sized for the gas volume needed",["Any solid produces the same volume of gas when heated","The gas volume depends only on the size of the car","Decomposition reactions always produce exactly one litre of gas"],"The balanced equation fixes the mole ratio between sodium azide and nitrogen. Engineers use that ratio to choose the amount of sodium azide that will produce the volume of nitrogen needed to fill the bag.",{n:n});
  },
  function(){
    var d=pick(["300","500","1000"]);
    return mcq("An antacid tablet containing "+d+" mg of a base is dosed to neutralize excess stomach acid, HCl. Which stoichiometric idea sets the dose?","The base neutralizes acid in a fixed mole ratio, so the dose is matched to the amount of acid",["A larger tablet always neutralizes acid faster regardless of amount","The dose depends only on the colour of the tablet","Acid disappears on its own once any solid is swallowed"],"Neutralization follows the mole ratio in the balanced equation. The amount of base in the tablet is chosen so its moles match the moles of acid it is meant to neutralize.",{dose:d});
  },
  function(){
    var v=ri(10,90);
    return mcq("A baker finds that "+v+" g of baking soda in a recipe produces just the right rise. Baking soda releases carbon dioxide gas when heated and when it meets acid in the batter. Which stoichiometric idea is at work?","The amount of gas produced is proportional to the amount of baking soda used, through the mole ratio",["Baking soda produces gas in random amounts each time","The rise depends only on the oven temperature","More baking soda always gives a better loaf with no limit"],"The equation links moles of baking soda to moles of carbon dioxide. Doubling the baking soda doubles the gas available, so the recipe amount is set by that proportional relationship.",{v:v});
  },
  function(){
    var pct=pick(["21","34","46"]);
    return mcq("A fertilizer bag is labelled "+pct+" percent nitrogen by mass. Which stoichiometric idea connects the label to the fertilizer formula?","The mass fraction of nitrogen is found from the molar mass of the compound and the mass of nitrogen in one formula unit",["Every fertilizer contains the same percent nitrogen","The percent depends only on the mass of the bag","Nitrogen content cannot be calculated from a formula"],"The molar mass of the fertilizer compound sets the whole, and the nitrogen atoms in the formula set the part. Their ratio gives the percent nitrogen printed on the label.",{pct:pct});
  },
  function(){
    var v=ri(100,900);
    return mcq("A water treatment plant adds a measured dose of lime to "+v+" L batches of water to precipitate dissolved calcium ions as calcium carbonate. Which stoichiometric idea sets the dose?","The precipitating agent is dosed in proportion to the amount of calcium present, using the mole ratio",["Lime removes calcium no matter how little is added","The dose depends only on the colour of the water","Precipitation removes all ions in equal masses"],"Precipitation follows the mole ratio between lime and calcium ions. The dose is calculated from the amount of calcium to be removed, not guessed.",{v:v});
  }
]));

E("u1-510-antacid-calculation",1,["5.10"],2,"gen",function(){
  var branches=[
    {eq:"CaCO\u2083 + 2HCl \u2192 CaCl\u2082 + H\u2082O + CO\u2082",f:"CaCO\u2083",m:CHEM_AM.Ca+CHEM_AM.C+3*CHEM_AM.O,ratio:2},
    {eq:"Mg(OH)\u2082 + 2HCl \u2192 MgCl\u2082 + 2H\u2082O",f:"Mg(OH)\u2082",m:CHEM_AM.Mg+2*(CHEM_AM.O+CHEM_AM.H),ratio:2},
    {eq:"Al(OH)\u2083 + 3HCl \u2192 AlCl\u2083 + 3H\u2082O",f:"Al(OH)\u2083",m:CHEM_AM.Al+3*(CHEM_AM.O+CHEM_AM.H),ratio:3}
  ];
  var b=pick(branches),mass=ri(20,300)/100,conc=pick([0.05,0.10,0.16]);
  var nAnt=sfR(mass/b.m,4),nHCl=sfR(nAnt*b.ratio,4),vL=sfR(nHCl/conc,4),ans=sfR(vL*1000,3);
  return numq("An antacid tablet contains "+gF(mass)+" g of "+b.f+", which neutralizes stomach acid (HCl) by the reaction "+b.eq+". What volume of "+F3(conc)+" mol/L HCl can the tablet neutralize? Give your answer in mL.",ans,Math.max(1,ans*0.02),"Change the mass of antacid to moles: "+gF(mass)+" g / "+fmtF(b.m,2)+" g/mol = "+iF(nAnt)+" mol. Apply the mole ratio: "+iF(nAnt)+" \u00D7 "+b.ratio+" = "+iF(nHCl)+" mol of HCl. Change moles to volume with V = n / c: "+iF(nHCl)+" mol / "+F3(conc)+" mol/L = "+iF(vL)+" L = <b>"+F3(ans)+" mL</b>.",{cp:b.f,mass:mass,conc:conc});
});

E("u1-510-airbag-and-fertilizer",1,["5.10"],2,"gen",function(){
  if(pick(["airbag","fertilizer"])==="airbag"){
    var mNaN3=CHEM_AM.Na+3*CHEM_AM.N,mass=ri(20,120),n=sfR(mass/mNaN3,4),nN2=sfR(n*3/2,4),ans=sfR(nN2*22.4,3);
    return numq("A vehicle airbag contains "+mass+" g of sodium azide, NaN\u2083, which decomposes by the reaction 2NaN\u2083 \u2192 2Na + 3N\u2082. What volume of nitrogen gas at STP does the airbag produce? Give your answer in L (the molar mass of NaN\u2083 is "+fmtF(mNaN3,2)+" g/mol).",ans,Math.max(0.05,ans*0.02),"Change the mass to moles: "+mass+" g / "+fmtF(mNaN3,2)+" g/mol = "+iF(n)+" mol of NaN\u2083. Apply the mole ratio: "+iF(n)+" \u00D7 (3 / 2) = "+iF(nN2)+" mol of N\u2082. Change to volume at STP: "+iF(nN2)+" \u00D7 22.4 L/mol = <b>"+F3(ans)+" L</b>.",{mass:mass});
  }
  var ferts=[{f:"urea, CO(NH\u2082)\u2082",m:CHEM_AM.C+CHEM_AM.O+2*(CHEM_AM.N+2*CHEM_AM.H),nMass:2*CHEM_AM.N},{f:"ammonium nitrate, NH\u2084NO\u2083",m:2*CHEM_AM.N+4*CHEM_AM.H+3*CHEM_AM.O,nMass:2*CHEM_AM.N},{f:"ammonium sulfate, (NH\u2084)\u2082SO\u2084",m:2*CHEM_AM.N+8*CHEM_AM.H+CHEM_AM.S+4*CHEM_AM.O,nMass:2*CHEM_AM.N}];
  var f=pick(ferts),bag=pick([10,20,25,40]),frac=sfR(f.nMass/f.m,4),ans=sfR(bag*frac,3);
  return numq("A "+bag+" kg bag of fertilizer is pure "+f.f+". What mass of nitrogen does the bag contain? Give your answer in kg (the molar mass of the fertilizer is "+fmtF(f.m,2)+" g/mol, and each formula unit contains "+fmtF(f.nMass,2)+" g of nitrogen per mole).",ans,Math.max(0.02,ans*0.02),"The fraction of nitrogen by mass is "+fmtF(f.nMass,2)+" / "+fmtF(f.m,2)+" = "+iF(frac)+". Multiply by the mass of the bag: "+bag+" kg \u00D7 "+iF(frac)+" = <b>"+F3(ans)+" kg</b> of nitrogen.",{fert:f.f,bag:bag});
});

E("u1-510-application-reasoning",1,["5.10"],2,"var",varset([
  function(){
    var v=ri(200,800);
    return mcq("A treatment plant must remove dissolved calcium ions from "+v+" L of water by precipitation. What should the operator calculate first to set the lime dose?","The moles of calcium present, so the lime can be matched to it by the mole ratio",["The colour change expected when lime is added","The mass of the empty dosing tank","The time of day the dose will be added"],"Dosing is a stoichiometric calculation. The amount of calcium, in moles, comes first, and the mole ratio from the precipitation equation then gives the amount of lime required.",{v:v});
  },
  function(){
    var target=pick(["40","60","80"]);
    return mcq("An airbag designer needs the bag to fill with "+target+" L of nitrogen gas at STP. Which calculation gives the mass of sodium azide to load?","Convert the target gas volume to moles, use the mole ratio to get moles of sodium azide, then convert to mass",["Multiply the gas volume by the density of the fabric","Use the same mass as the volume number, in grams","Double the mass used in the smallest airbag tested"],"The design runs the stoichiometric chain in reverse: volume of gas to moles of gas, mole ratio to moles of reactant, and molar mass to the mass that must be loaded.",{target:target});
  },
  function(){
    var tabs=ri(2,6);
    return mcq("A patient is told to take "+tabs+" antacid tablets, each with the same mass of active base, instead of one. In stoichiometric terms, what does taking "+tabs+" tablets change?","It multiplies the moles of base available to neutralize acid by "+tabs,["It changes the mole ratio of the neutralization reaction","It makes each mole of base neutralize more acid","It removes the need for a balanced equation"],"The equation and its mole ratio do not change. More tablets simply supply proportionally more moles of base, so proportionally more moles of acid can be neutralized.",{tabs:tabs});
  },
  function(){
    var field=ri(2,20);
    return mcq("A farmer spreads fertilizer over a "+field+" hectare field and wants each hectare to receive the same mass of nitrogen. Two fertilizers have different percent nitrogen values. What must the farmer do?","Apply a larger mass of the fertilizer with the lower percent nitrogen",["Apply equal masses of both fertilizers","Apply a larger mass of the fertilizer with the higher percent nitrogen","Ignore the percent values and judge by bag size"],"The target is a fixed mass of nitrogen per hectare. A fertilizer with a lower nitrogen fraction must be applied in greater mass to deliver the same amount of nitrogen.",{field:field});
  },
  function(){
    var batch=ri(50,300);
    return mcq("A bakery scales a muffin recipe from a small test batch to a "+batch+" muffin production run. The baking soda amount is scaled in direct proportion to the other ingredients. Why does this work?","The gas produced scales with the amount of baking soda, keeping the gas per muffin the same",["Proportional scaling changes the mole ratio of the reaction","Large batches need no gas to rise","The oven produces the gas, not the baking soda"],"Each muffin needs the same amount of carbon dioxide. Because gas produced is proportional to baking soda used, scaling all ingredients by the same factor keeps the gas per muffin constant.",{batch:batch});
  }
]));

/* ============ Bank Strengthening Programme pass 1 (November 19, 2026) ============
   Entries u1-51-write-acid-formula to u1-510-peroxide-oxygen: 13 entries
   bringing every Unit 1 indicator pool to depth 6 (5.1 +1, 5.3 +2, 5.4 +2,
   5.5 +2, 5.6 +1, 5.7 +1, 5.9 +2, 5.10 +2). Drafted by Gemini against
   Assignment-Chemistry-2202-Unit-1.md under External Authoring Pack v2 and
   intake-gated (39,000 draws, zero wrong keys). Four entries first rejected
   on the absolute key-length rule were accepted as written under Jason's
   November 19, 2026 ruling that pack rule C1 carries a 15 percent
   materiality threshold (their worst measured gap is 7.5 percent), and the
   one-character length flag on u1-56-precipitate-ions dissolved under the
   same ruling. Every entry remains SME-flagged for the specialist pass
   (the judgement list is in the pass report). */

// LEVEL: 2 - Reverses the acid naming rules to write the chemical formula with aqueous state symbol from the acid name.
// LENGTHS: key=9
// SME fix, November 20, 2026: acetic acid removed from the acid list on the specialist's ruling; the ten remaining acids keep every naming pattern the entry teaches.
E("u1-51-write-acid-formula", 1, ["5.1"], 2, "gen", function() {
  var acids = [
    { name: "hydrochloric acid", sub: "HCl(aq)", plain: "HCl(aq)", anion: "chloride", rule: "the hydro-...-ic prefix and ending indicate a binary acid from the chloride ion (Cl⁻), balanced by one H⁺ ion" },
    { name: "hydrobromic acid", sub: "HBr(aq)", plain: "HBr(aq)", anion: "bromide", rule: "the hydro-...-ic prefix and ending indicate a binary acid from the bromide ion (Br⁻), balanced by one H⁺ ion" },
    { name: "hydrofluoric acid", sub: "HF(aq)", plain: "HF(aq)", anion: "fluoride", rule: "the hydro-...-ic prefix and ending indicate a binary acid from the fluoride ion (F⁻), balanced by one H⁺ ion" },
    { name: "nitric acid", sub: "HNO₃(aq)", plain: "HNO3(aq)", anion: "nitrate", rule: "the -ic ending with no hydro- prefix indicates an oxyacid from the nitrate ion (NO₃⁻), balanced by one H⁺ ion" },
    { name: "nitrous acid", sub: "HNO₂(aq)", plain: "HNO2(aq)", anion: "nitrite", rule: "the -ous ending indicates an oxyacid from the nitrite ion (NO₂⁻), balanced by one H⁺ ion" },
    { name: "sulfuric acid", sub: "H₂SO₄(aq)", plain: "H2SO4(aq)", anion: "sulfate", rule: "the -ic ending with no hydro- prefix indicates an oxyacid from the sulfate ion (SO₄²⁻), balanced by two H⁺ ions" },
    { name: "sulfurous acid", sub: "H₂SO₃(aq)", plain: "H2SO3(aq)", anion: "sulfite", rule: "the -ous ending indicates an oxyacid from the sulfite ion (SO₃²⁻), balanced by two H⁺ ions" },
    { name: "phosphoric acid", sub: "H₃PO₄(aq)", plain: "H3PO4(aq)", anion: "phosphate", rule: "the -ic ending with no hydro- prefix indicates an oxyacid from the phosphate ion (PO₄³⁻), balanced by three H⁺ ions" },
    { name: "phosphorous acid", sub: "H₃PO₃(aq)", plain: "H3PO3(aq)", anion: "phosphite", rule: "the -ous ending indicates an oxyacid from the phosphite ion (PO₃³⁻), balanced by three H⁺ ions" },
    { name: "carbonic acid", sub: "H₂CO₃(aq)", plain: "H2CO3(aq)", anion: "carbonate", rule: "the -ic ending with no hydro- prefix indicates an oxyacid from the carbonate ion (CO₃²⁻), balanced by two H⁺ ions" }
  ];
  var item = pick(acids);
  var accepted = item.sub === item.plain ? [item.sub] : [item.sub, item.plain];
  return textq(
    "Write the chemical formula, including the state symbol (aq), for " + item.name + ".",
    accepted,
    "For " + item.name + ", " + item.rule + ", giving the aqueous formula <b>" + item.sub + "</b>.",
    { acidName: item.name, anion: item.anion, formula: item.sub }
  );
});

// LEVEL: 2 - Applies dynamic solubility equilibrium to solvent evaporation at constant temperature.
// LENGTHS: key=104, distractors=109,106,102
E("u1-53-evaporation", 1, ["5.3"], 2, "gen", function() {
  var solutes = ["potassium nitrate", "sodium chloride", "copper(II) sulfate", "potassium chloride", "sodium nitrate"];
  var solute = pick(solutes);
  var temp = pick([20, 22, 25, 30]);
  var key = "The mass of undissolved solid increases as solute crystallizes, and the solution concentration stays constant.";
  var distractors = [
    "The mass of undissolved solid stays unchanged as water leaves, and the solution concentration increases steadily.",
    "The mass of undissolved solid decreases as more solute dissolves, and the solution concentration stays constant.",
    "The mass of undissolved solid increases as solute crystallizes, and the solution concentration increases steadily."
  ];
  return mcq(
    "A saturated aqueous solution of " + solute + " sits over excess undissolved solid in an open beaker at a constant temperature of " + gF(temp) + " °C. Over several days, some of the water evaporates while the temperature remains at " + gF(temp) + " °C. What happens to the mass of undissolved solid and the concentration of the solution?",
    key,
    distractors,
    "At a constant temperature of " + gF(temp) + " °C, the solubility of " + solute + " does not change, so the saturated solution keeps the same concentration; as water evaporates, dissolved ions crystallize out onto the excess solid until equilibrium is restored. <b>" + key + "</b>",
    { solute: solute, temp: temp }
  );
});

// LEVEL: 2 - Distinguishes saturated, unsaturated, supersaturated, and insoluble mixtures from dealt solubility data.
// VARIANTS: four beaker states compared in one draw (saturated with excess solid, unsaturated, supersaturated, insoluble mixture)
// LENGTHS: key=113, distractors=115,113,108
E("u1-53-choose-saturated", 1, ["5.3"], 2, "gen", function() {
  var solutes = [
    { name: "potassium nitrate", sol: 38.0, temp: 25 },
    { name: "sodium nitrate", sol: 88.0, temp: 20 },
    { name: "potassium chloride", sol: 34.0, temp: 20 },
    { name: "ammonium chloride", sol: 37.0, temp: 20 },
    { name: "copper(II) sulfate", sol: 32.0, temp: 20 }
  ];
  var insolubles = ["calcium carbonate", "barium sulfate", "silver chloride", "silicon dioxide"];
  var s = pick(solutes);
  var insol = pick(insolubles);
  var maxG = s.sol;
  var unsatG = sfR(maxG * pick([0.45, 0.55, 0.65]), 3);
  var satAddedG = sfR(maxG + pick([6.0, 8.0, 10.0]), 3);
  var superG = sfR(maxG * pick([1.25, 1.35, 1.45]), 3);
  var insolG = sfR(maxG * 0.5, 3);
  var key = "The beaker with " + gF(satAddedG) + " g of " + s.name + " stirred at " + gF(s.temp) + " °C until undissolved solid remains at the bottom.";
  var distractors = [
    "The beaker with " + gF(unsatG) + " g of " + s.name + " stirred at " + gF(s.temp) + " °C until all of the crystals dissolve completely.",
    "The beaker with " + gF(superG) + " g of " + s.name + " dissolved hot and cooled carefully to " + gF(s.temp) + " °C with no crystals.",
    "The beaker with " + gF(insolG) + " g of " + insol + " stirred in water at " + gF(s.temp) + " °C with all solid sitting unchanged."
  ];
  return mcq(
    "At " + gF(s.temp) + " °C, the solubility of " + s.name + " in water is " + gF(maxG) + " g per 100 mL of water, whereas " + insol + " is insoluble in water. Four beakers each contain 100 mL of water at " + gF(s.temp) + " °C. Which beaker contains a saturated solution?",
    key,
    distractors,
    "Because the solubility limit at " + gF(s.temp) + " °C is " + gF(maxG) + " g per 100 mL, adding " + gF(satAddedG) + " g dissolves " + gF(maxG) + " g and leaves excess solid in equilibrium with the solution; " + gF(unsatG) + " g forms an unsaturated solution, " + gF(superG) + " g dissolved without crystals is supersaturated, and " + insol + " does not dissolve. <b>" + key + "</b>",
    { solute: s.name, insoluble: insol, temp: s.temp, maxG: maxG, unsatG: unsatG, satAddedG: satAddedG, superG: superG, insolG: insolG }
  );
});

// LEVEL: 2 - Assembles the macroscopic conditions required for dynamic solubility equilibrium.
// LENGTHS: key=108, distractors=106,113,104
E("u1-54-equilibrium-conditions", 1, ["5.4"], 2, "gen", function() {
  var solutes = ["sodium chloride", "potassium bromide", "copper(II) sulfate", "ammonium nitrate", "calcium hydroxide"];
  var solute = pick(solutes);
  var key = "A closed container held at constant temperature, containing a saturated solution with some undissolved solid present.";
  var distractors = [
    "An open container held at constant temperature, containing a saturated solution with some undissolved solid present.",
    "A closed container held at constant temperature, containing an unsaturated solution with no undissolved solid present.",
    "A closed container heated at a steady rate, containing a saturated solution with some undissolved solid present."
  ];
  return mcq(
    "An aqueous solution of " + solute + " is at dynamic solubility equilibrium. Which set of conditions must hold for this system?",
    key,
    distractors,
    "Dynamic solubility equilibrium requires a closed system so solvent cannot escape, a constant temperature so solubility stays fixed, and both dissolved solute at saturation and undissolved solid present so dissolving and crystallization occur at equal rates. <b>" + key + "</b>",
    { solute: solute }
  );
});

// LEVEL: 3 - Tracks sequential disturbances (reversible vs sustained) on a saturated solution at equilibrium.
// VARIANTS: four two-step sequences: (a) add water then evaporate same water (25%), (b) heat then cool back (25%), (c) heat and keep hot (25%), (d) cool and keep cold (25%)
// LENGTHS: key=102, distractors=103,102,104
E("u1-54-two-changes", 1, ["5.4"], 3, "gen", function() {
  var frame = ri(0, 3);
  var solutes = ["potassium nitrate", "sodium nitrate", "ammonium chloride"];
  var solute = pick(solutes);
  var changeDesc, key, explanation;
  var optSame = "The mass of undissolved solid is equal to the starting mass, and the solution concentration is equal to the start.";
  var optLessMore = "The mass of undissolved solid is smaller than the starting mass, and the solution concentration is higher.";
  var optMoreLess = "The mass of undissolved solid is larger than the starting mass, and the solution concentration is lower.";
  var optMoreMore = "The mass of undissolved solid is larger than the starting mass, and the solution concentration is higher.";
  if (frame === 0) {
    changeDesc = "First, pure water is added and stirred until some excess solid dissolves; second, that exact same volume of water is evaporated off at the starting temperature.";
    key = optSame;
    explanation = "Adding water dissolves more solid to keep the solution saturated, and evaporating the exact same volume of water at the original temperature forces that same mass of solute to recrystallize, returning both the solid mass and the saturated concentration to their starting values.";
  } else if (frame === 1) {
    changeDesc = "First, the mixture is warmed until more solid dissolves; second, the closed container is cooled back to the exact starting temperature and allowed to settle.";
    key = optSame;
    explanation = "Because solubility depends only on temperature in a closed system, cooling back to the exact starting temperature restores the original solubility, recrystallizing the extra dissolved solute so both solid mass and concentration match the start.";
  } else if (frame === 2) {
    changeDesc = "First, the closed container is warmed to a higher temperature; second, it is held at that higher temperature until equilibrium is re-established.";
    key = optLessMore;
    explanation = "Because the solubility of " + solute + " increases with temperature, warming dissolves more of the excess solid (leaving a smaller mass of undissolved solid) and produces a saturated solution with a higher concentration.";
  } else {
    changeDesc = "First, the closed container is cooled to a lower temperature; second, it is held at that lower temperature until equilibrium is re-established.";
    key = optMoreLess;
    explanation = "Because the solubility of " + solute + " decreases as temperature drops, solute crystallizes out of solution (leaving a larger mass of undissolved solid) and produces a saturated solution with a lower concentration.";
  }
  var allOpts = [optSame, optLessMore, optMoreLess, optMoreMore];
  var distractors = [];
  for (var i = 0; i < allOpts.length; i++) {
    if (allOpts[i] !== key) distractors.push(allOpts[i]);
  }
  return mcq(
    "A closed beaker holds a saturated aqueous solution of " + solute + " over excess undissolved solid at equilibrium. The solubility of " + solute + " in water increases as temperature rises. Two changes are applied in sequence: " + changeDesc + " How do the final mass of undissolved solid and the final solution concentration compare with the start?",
    key,
    distractors,
    explanation + " <b>" + key + "</b>",
    { solute: solute, frame: frame }
  );
});

// LEVEL: 2 - Reads comparative solubility values and identifies either the extreme solubility or the solute that fails to dissolve completely.
// VARIANTS: ask 0 = most/least soluble (50%), ask 1 = which fails to dissolve completely for a dealt added mass (50%)
// LENGTHS: key=18, distractors=18,18,18
E("u1-55-compare-solubility-data", 1, ["5.5"], 2, "gen", function() {
  var askType = ri(0, 1);
  var temp = pick([20, 25, 30]);
  var pool = [
    "potassium chlorate",
    "copper(II) sulfate",
    "potassium chromate",
    "magnesium chloride",
    "strontium chloride",
    "potassium fluoride"
  ];
  var chosen = shuffle(pool).slice(0, 4);
  var bands = [
    ri(80, 130) / 10,
    ri(220, 310) / 10,
    ri(380, 520) / 10,
    ri(650, 880) / 10
  ];
  var perm = shuffle([0, 1, 2, 3]);
  var rows = [];
  var items = [];
  for (var i = 0; i < 4; i++) {
    var val = bands[perm[i]];
    items.push({ name: chosen[i], sol: val });
    rows.push(chosen[i] + ": " + fmtF(val, 1) + " g / 100 mL water");
  }
  var tableText = rows.join("<br>");
  var sorted = items.slice().sort(function(a, b) { return a.sol - b.sol; });
  var lowest = sorted[0];
  var secondLowest = sorted[1];
  var highest = sorted[3];
  if (askType === 0) {
    var askMost = Math.random() < 0.5;
    var key = askMost ? highest.name : lowest.name;
    var distractors = [];
    for (var j = 0; j < chosen.length; j++) {
      if (chosen[j] !== key) distractors.push(chosen[j]);
    }
    var reason = askMost
      ? highest.name + " dissolves the largest mass per 100 mL of water (" + fmtF(highest.sol, 1) + " g), making it the most soluble"
      : lowest.name + " dissolves the smallest mass per 100 mL of water (" + fmtF(lowest.sol, 1) + " g), making it the least soluble";
    return mcq(
      "The table below gives the solubility of four substances in water at " + gF(temp) + " °C:<br>" + tableText + "<br>Which substance is the " + (askMost ? "most" : "least") + " soluble in water at " + gF(temp) + " °C?",
      key,
      distractors,
      "Comparing the maximum mass that dissolves in 100 mL of water at " + gF(temp) + " °C shows that " + reason + ". <b>" + key + "</b>",
      { askType: 0, askMost: askMost, temp: temp, items: items }
    );
  } else {
    var loInt = Math.ceil(lowest.sol + 1.0);
    var hiInt = Math.floor(secondLowest.sol - 1.0);
    var addedMass = hiInt >= loInt ? ri(loInt, hiInt) : Math.round((lowest.sol + secondLowest.sol) * 5) / 10;
    var key = lowest.name;
    var distractors = [];
    for (var k = 0; k < chosen.length; k++) {
      if (chosen[k] !== key) distractors.push(chosen[k]);
    }
    return mcq(
      "The table below gives the solubility of four substances in water at " + gF(temp) + " °C:<br>" + tableText + "<br>Suppose " + gF(addedMass) + " g of each substance is added to a separate 100 mL sample of water at " + gF(temp) + " °C and stirred thoroughly. Which substance will NOT dissolve completely?",
      key,
      distractors,
      "For a substance to dissolve completely in 100 mL of water, its solubility must be at least " + gF(addedMass) + " g; only " + lowest.name + " has a solubility below " + gF(addedMass) + " g (" + fmtF(lowest.sol, 1) + " g per 100 mL), so excess solid remains. <b>" + key + "</b>",
      { askType: 1, temp: temp, items: items, addedMass: addedMass }
    );
  }
});

// LEVEL: 2 - Explains solubility differences between solute-solvent pairs using intermolecular forces and polarity.
// VARIANTS: four solute-solvent contrast pairs: (a) iodine in hexane vs water, (b) NaCl in water vs hexane, (c) sugar vs wax in water, (d) ethanol vs cooking oil in water
// LENGTHS: key=130, distractors=131,126,133
// LENGTHS: key=125, distractors=127,128,121
// LENGTHS: key=126, distractors=122,129,124
// LENGTHS: key=128, distractors=131,121,129
E("u1-55-explain-variation", 1, ["5.5"], 2, "var", varset([
  function() {
    var key = "Iodine is nonpolar and attracts nonpolar hexane, whereas polar water molecules attract one another much more strongly than iodine.";
    var distractors = [
      "Iodine molecules are much larger than water molecules, so they cannot fit into the small spaces between liquid water molecules.",
      "Iodine reacts chemically with liquid hexane to form a new soluble compound, whereas iodine cannot react with liquid water.",
      "Iodine has a much higher density than liquid water, so gravity pulls solid iodine crystals to the bottom before they dissolve."
    ];
    return mcq(
      "Solid iodine (I₂) dissolves readily in liquid hexane (C₆H₁₄) to form a purple solution, but dissolves only slightly in water. Why does iodine dissolve much better in hexane than in water?",
      key,
      distractors,
      "Both I₂ and C₆H₁₄ are nonpolar molecules that experience similar dispersion forces, whereas polar H₂O molecules form strong hydrogen bonds with each other that nonpolar I₂ cannot disrupt. <b>" + key + "</b>",
      { variant: 1, solute: "I₂", solventA: "hexane", solventB: "water" }
    );
  },
  function() {
    var key = "Polar water molecules attract and pull apart the charged ions, whereas nonpolar hexane molecules cannot attract ions strongly.";
    var distractors = [
      "Sodium chloride has a very low melting point in water, whereas sodium chloride stays too rigid to melt inside liquid hexane.",
      "Sodium chloride molecules are small enough to slip between water molecules, whereas hexane molecules are packed too tightly.",
      "Sodium chloride reacts with water to produce dissolved gases, whereas sodium chloride is completely unreactive in hexane."
    ];
    return mcq(
      "Table salt (sodium chloride, NaCl) dissolves readily in water, but does not dissolve in nonpolar hexane (C₆H₁₄). Why does NaCl dissolve in water but not in hexane?",
      key,
      distractors,
      "Water is strongly polar, so the partial negative oxygen ends attract Na⁺ and the partial positive hydrogen ends attract Cl⁻ to overcome the ionic lattice, while nonpolar hexane lacks charge separation to stabilize free ions. <b>" + key + "</b>",
      { variant: 2, solute: "NaCl", solventA: "water", solventB: "hexane" }
    );
  },
  function() {
    var key = "Sugar molecules have many polar -OH groups that hydrogen-bond with water, whereas wax consists of nonpolar hydrocarbon chains.";
    var distractors = [
      "Sugar has a lower density than water and floats while dissolving, whereas wax is too heavy for water molecules to support.",
      "Sugar crystals break apart because sugar melts at room temperature in water, whereas wax remains a solid below its boiling point.",
      "Sugar molecules are smaller than single water molecules, whereas wax molecules are too massive to enter any liquid solvent."
    ];
    return mcq(
      "Table sugar (sucrose) dissolves readily in water, whereas paraffin candle wax does not dissolve in water at all. Why do these two molecular solids behave so differently in water?",
      key,
      distractors,
      "Sucrose carries multiple polar hydroxyl (-OH) groups that form strong hydrogen bonds with water molecules, whereas paraffin wax is made of nonpolar carbon-hydrogen chains that cannot form favorable attractions with water. <b>" + key + "</b>",
      { variant: 3, soluteA: "sugar", soluteB: "wax", solvent: "water" }
    );
  },
  function() {
    var key = "Ethanol is polar and forms hydrogen bonds with water, whereas cooking oil is nonpolar and cannot mix with polar water molecules.";
    var distractors = [
      "Ethanol has a lower density than water so it blends evenly, whereas cooking oil is much denser than water and sinks below it.",
      "Ethanol reacts chemically with water to form a single new liquid, whereas cooking oil cannot undergo a reaction with water.",
      "Ethanol molecules are tiny enough to fit between water molecules, whereas cooking oil molecules are too wide to pass between them."
    ];
    return mcq(
      "Liquid ethanol mixes with water in all proportions, whereas liquid cooking oil separates into a distinct layer when mixed with water. Why does ethanol mix with water while cooking oil does not?",
      key,
      distractors,
      "Ethanol has a polar -OH group capable of hydrogen-bonding with water, whereas cooking oil consists of nonpolar triglyceride molecules that are excluded as water molecules hydrogen-bond with one another. <b>" + key + "</b>",
      { variant: 4, soluteA: "ethanol", soluteB: "cooking oil", solvent: "water" }
    );
  }
]));

// LEVEL: 2 - Identifies the specific cation-anion pair that combines to form an insoluble precipitate upon mixing two aqueous solutions.
// LENGTHS: key=29, distractors=28,28,29
E("u1-56-precipitate-ions", 1, ["5.6"], 2, "gen", function() {
  var reactions = [
    { solA: "silver nitrate", solB: "sodium chloride", pptCat: "silver ions", pptAn: "chloride ions", solCat: "sodium ions", solAn: "nitrate ions", pptFormula: "AgCl(s)" },
    { solA: "barium chloride", solB: "sodium sulfate", pptCat: "barium ions", pptAn: "sulfate ions", solCat: "sodium ions", solAn: "chloride ions", pptFormula: "BaSO₄(s)" },
    { solA: "lead(II) nitrate", solB: "potassium iodide", pptCat: "lead(II) ions", pptAn: "iodide ions", solCat: "potassium ions", solAn: "nitrate ions", pptFormula: "PbI₂(s)" },
    { solA: "calcium chloride", solB: "sodium carbonate", pptCat: "calcium ions", pptAn: "carbonate ions", solCat: "sodium ions", solAn: "chloride ions", pptFormula: "CaCO₃(s)" },
    { solA: "iron(III) chloride", solB: "sodium hydroxide", pptCat: "iron(III) ions", pptAn: "hydroxide ions", solCat: "sodium ions", solAn: "chloride ions", pptFormula: "Fe(OH)₃(s)" },
    { solA: "copper(II) sulfate", solB: "sodium sulfide", pptCat: "copper(II) ions", pptAn: "sulfide ions", solCat: "sodium ions", solAn: "sulfate ions", pptFormula: "CuS(s)" }
  ];
  var rxn = pick(reactions);
  var key = rxn.pptCat + " and " + rxn.pptAn;
  var distractors = [
    rxn.solCat + " and " + rxn.solAn,
    rxn.pptCat + " and " + rxn.solAn,
    rxn.solCat + " and " + rxn.pptAn
  ];
  return mcq(
    "When aqueous solutions of " + rxn.solA + " and " + rxn.solB + " are mixed together, an insoluble precipitate forms. Which pair of ions combined to form this precipitate?",
    key,
    distractors,
    "Mixing aqueous " + rxn.solA + " and " + rxn.solB + " brings four ions into contact; by the solubility generalizations, " + rxn.pptCat + " and " + rxn.pptAn + " form the insoluble solid " + rxn.pptFormula + ", while " + rxn.solCat + " and " + rxn.solAn + " remain dissolved as spectator ions. <b>" + key + "</b>",
    { solA: rxn.solA, solB: rxn.solB, pptFormula: rxn.pptFormula }
  );
});

// LEVEL: 3 - Balances an unbalanced chemical equation before extracting the required mole ratio between two named species.
// LENGTHS: key=5, distractors=5,5,5
E("u1-57-balance-then-ratio", 1, ["5.7"], 3, "gen", function() {
  var rxns = [
    {
      unbal: "Mg + O₂ → MgO",
      bal: "2Mg + O₂ → 2MgO",
      pairs: [
        { spA: "Mg", spB: "O₂", cA: 2, cB: 1 },
        { spA: "O₂", spB: "MgO", cA: 1, cB: 2 }
      ]
    },
    {
      unbal: "H₂ + O₂ → H₂O",
      bal: "2H₂ + O₂ → 2H₂O",
      pairs: [
        { spA: "H₂", spB: "O₂", cA: 2, cB: 1 },
        { spA: "O₂", spB: "H₂O", cA: 1, cB: 2 }
      ]
    },
    {
      unbal: "Al + O₂ → Al₂O₃",
      bal: "4Al + 3O₂ → 2Al₂O₃",
      pairs: [
        { spA: "Al", spB: "O₂", cA: 4, cB: 3 },
        { spA: "Al", spB: "Al₂O₃", cA: 4, cB: 2 },
        { spA: "O₂", spB: "Al₂O₃", cA: 3, cB: 2 }
      ]
    },
    {
      unbal: "KClO₃ → KCl + O₂",
      bal: "2KClO₃ → 2KCl + 3O₂",
      pairs: [
        { spA: "KClO₃", spB: "O₂", cA: 2, cB: 3 },
        { spA: "KCl", spB: "O₂", cA: 2, cB: 3 }
      ]
    },
    {
      unbal: "Na + H₂O → NaOH + H₂",
      bal: "2Na + 2H₂O → 2NaOH + H₂",
      pairs: [
        { spA: "Na", spB: "H₂", cA: 2, cB: 1 },
        { spA: "H₂O", spB: "H₂", cA: 2, cB: 1 }
      ]
    },
    {
      unbal: "CH₄ + O₂ → CO₂ + H₂O",
      bal: "CH₄ + 2O₂ → CO₂ + 2H₂O",
      pairs: [
        { spA: "CH₄", spB: "O₂", cA: 1, cB: 2 },
        { spA: "O₂", spB: "CO₂", cA: 2, cB: 1 }
      ]
    },
    {
      unbal: "H₂O₂ → H₂O + O₂",
      bal: "2H₂O₂ → 2H₂O + O₂",
      pairs: [
        { spA: "H₂O₂", spB: "O₂", cA: 2, cB: 1 },
        { spA: "H₂O", spB: "O₂", cA: 2, cB: 1 }
      ]
    }
  ];
  var rxn = pick(rxns);
  var pr = pick(rxn.pairs);
  var key = pr.cA + " : " + pr.cB;
  var cands = [
    "1 : 1",
    pr.cB + " : " + pr.cA,
    (pr.cA + 1) + " : " + pr.cB,
    pr.cA + " : " + (pr.cB + 1)
  ];
  var distractors = [];
  for (var i = 0; i < cands.length && distractors.length < 3; i++) {
    if (cands[i] !== key && distractors.indexOf(cands[i]) < 0) {
      distractors.push(cands[i]);
    }
  }
  return mcq(
    "Consider the unbalanced chemical equation: " + rxn.unbal + ". After balancing the equation with the smallest whole-number coefficients, what is the mole ratio of " + pr.spA + " to " + pr.spB + "?",
    key,
    distractors,
    "Balancing atoms on both sides gives " + rxn.bal + ". Reading the coefficients of " + pr.spA + " and " + pr.spB + " from the balanced equation gives the mole ratio <b>" + key + "</b>.",
    { unbal: rxn.unbal, bal: rxn.bal, spA: pr.spA, spB: pr.spB, cA: pr.cA, cB: pr.cB }
  );
});

// LEVEL: 2 - Rearranges the percent yield relation to compute actual yield from theoretical yield and percent yield.
// LENGTHS: key=4
E("u1-59-actual-from-percent", 1, ["5.9"], 2, "gen", function() {
  var products = ["aspirin", "ammonia", "methanol", "ethanol", "calcium oxide", "sodium hydroxide", "ibuprofen", "copper metal"];
  var product = pick(products);
  var theo = ri(120, 650) / 10;
  var pct = ri(550, 980) / 10;
  var rawActual = theo * (pct / 100);
  var ans = sfR(rawActual, 3);
  var tol = Math.max(0.05, ans * 0.02);
  return numq(
    "In a laboratory synthesis of " + product + ", the theoretical yield is " + F3(theo) + " g and the percent yield is " + F3(pct) + "%. What is the actual yield of " + product + ", in grams?",
    ans,
    tol,
    "Rearranging Percent Yield = (Actual Yield / Theoretical Yield) × 100% gives Actual Yield = (" + F3(pct) + "% / 100%) × " + F3(theo) + " g = " + iF(rawActual) + " g, which rounds to <b>" + F3(ans) + " g</b>.",
    { product: product, theo: theo, pct: pct, ans: ans }
  );
});

// LEVEL: 3 - Diagnoses experimental errors that produce an apparent percent yield greater than 100%.
// VARIANTS: four contamination/mass-inflation causes: (a) wet crystals, (b) unreacted starting material, (c) unevaporated liquid solvent, (d) side-reaction precipitate
// LENGTHS: key=124, distractors=127,125,119
// LENGTHS: key=121, distractors=120,122,115
// LENGTHS: key=109, distractors=113,108,112
// LENGTHS: key=121, distractors=115,123,115
E("u1-59-over-100-diagnosis", 1, ["5.9"], 3, "var", varset([
  function() {
    var key = "The weighed solid still contains trapped liquid solvent, so the recorded mass includes solvent in addition to the product.";
    var distractors = [
      "The reaction created extra product beyond the limiting reactant limit because the mixture was stirred for a longer time.",
      "Percent yields between 105% and 130% are normal whenever a solid product is isolated by gravity filtration from solution.",
      "Small amounts of solid product left behind on the filter paper increased the calculated percentage yield above 100%."
    ];
    return mcq(
      "A student isolates crystals by filtration, weighs them immediately while they are still damp with solvent, and calculates a percent yield of 114%. Which explanation best accounts for this result?",
      key,
      distractors,
      "By conservation of mass, actual yield cannot exceed theoretical yield; weighing damp crystals adds the mass of unevaporated solvent to the product mass. <b>" + key + "</b>",
      { variant: 1, pctYield: 114 }
    );
  },
  function() {
    var key = "Unreacted starting material remained mixed with the crude solid, inflating the weighed mass above the true product mass.";
    var distractors = [
      "Excess reactant converted completely into extra product once the limiting reactant had been used up in the flask.",
      "Percent yields above 100% are expected whenever a synthesis uses a large excess of one of the starting reactants.",
      "Spilling a small fraction of the crude solid during transfer to the balance raised the calculated percent yield."
    ];
    return mcq(
      "After running a synthesis, a student weighs an unpurified crude solid that is still contaminated with unreacted starting material and obtains a percent yield of 121%. Which explanation best accounts for this result?",
      key,
      distractors,
      "The theoretical yield counts only pure product; leftover starting material mixed into the weighed sample artificially increases the apparent actual yield. <b>" + key + "</b>",
      { variant: 2, pctYield: 121 }
    );
  },
  function() {
    var key = "Residual volatile solvent remained dissolved in the liquid product, adding extra mass to the weighed sample.";
    var distractors = [
      "Warming the liquid product caused its mass to expand above the theoretical limit set by the limiting reactant.",
      "Percent yields slightly above 100% occur normally whenever a liquid product is collected by simple distillation.",
      "Evaporating part of the liquid product before weighing concentrated the sample and raised the percent yield."
    ];
    return mcq(
      "A student collects a liquid product from a reaction mixture and weighs it before all of the extraction solvent has evaporated, reporting a percent yield of 108%. Which explanation best accounts for this result?",
      key,
      distractors,
      "Any extraction solvent still mixed with the liquid product is weighed on the balance as if it were product, inflating the actual yield above 100%. <b>" + key + "</b>",
      { variant: 3, pctYield: 108 }
    );
  },
  function() {
    var key = "A competing side reaction formed a second insoluble solid that co-precipitated and added mass to the collected sample.";
    var distractors = [
      "The main precipitation reaction produced more moles of solid than the limiting reactant stoichiometrically allowed.",
      "Percent yields above 100% are standard whenever two aqueous ionic solutions are mixed rapidly at room temperature.",
      "Washing the collected precipitate with distilled water dissolved part of the solid and raised the percent yield."
    ];
    return mcq(
      "During a precipitation experiment, a student filters and dries the solid completely but calculates a percent yield of 126%. Which explanation best accounts for this result?",
      key,
      distractors,
      "Even when completely dry, a precipitate contaminated by a second insoluble byproduct has a total mass greater than the pure target compound alone. <b>" + key + "</b>",
      { variant: 4, pctYield: 126 }
    );
  }
]));

// LEVEL: 2 - Discounts an impure limestone sample by its mass percent purity before running a mass-to-mass stoichiometric conversion.
// LENGTHS: key=4
// SME fix, November 20, 2026: the worked solution now shows the kilogram to gram conversion before the molar mass step, and the gram to kilogram conversion at the end, as explicit steps.
E("u1-510-limestone-lime", 1, ["5.10"], 2, "gen", function() {
  var sampleKg = ri(50, 500);
  var purityPct = ri(820, 980) / 10;
  var mCaCO3 = sampleKg * (purityPct / 100);
  var M_CaCO3 = CHEM_AM.Ca + CHEM_AM.C + 3 * CHEM_AM.O;
  var M_CaO = CHEM_AM.Ca + CHEM_AM.O;
  var molCaCO3 = (mCaCO3 * 1000) / M_CaCO3;
  var molCaO = molCaCO3;
  var rawKgCaO = (molCaO * M_CaO) / 1000;
  var ans = sfR(rawKgCaO, 3);
  var tol = Math.max(0.05, ans * 0.02);
  return numq(
    "In quicklime production for steelmaking and construction, calcium carbonate decomposes when heated: CaCO₃ → CaO + CO₂. A " + gF(sampleKg) + " kg sample of crushed limestone contains " + F3(purityPct) + "% CaCO₃ by mass, with inert impurities. What mass of quicklime (CaO), in kilograms, can be produced from this sample?",
    ans,
    tol,
    "First find the mass of pure CaCO₃: " + gF(sampleKg) + " kg × " + F3(purityPct) + "% = " + iF(mCaCO3) + " kg. The molar masses are M(CaCO₃) = " + iF(M_CaCO3) + " g/mol and M(CaO) = " + iF(M_CaO) + " g/mol, and the equation ratio is 1 : 1, so the moles of CaO formed equal the moles of CaCO₃ decomposed. Convert the mass of CaCO₃ from kilograms to grams before dividing by the molar mass, and convert the mass of CaO back to kilograms at the end: \\[ \\begin{aligned} m(\\mathrm{CaCO_3}) &= " + iF(mCaCO3) + " \\text{ kg} \\times \\frac{1000 \\text{ g}}{1 \\text{ kg}} = " + fmt(mCaCO3 * 1000, 0) + " \\text{ g} \\\\ n(\\mathrm{CaCO_3}) &= \\frac{" + fmt(mCaCO3 * 1000, 0) + " \\text{ g}}{" + iF(M_CaCO3) + " \\text{ g/mol}} = " + iF(molCaCO3) + " \\text{ mol} \\\\ n(\\mathrm{CaO}) &= " + iF(molCaO) + " \\text{ mol} \\\\ m(\\mathrm{CaO}) &= " + iF(molCaO) + " \\text{ mol} \\times " + iF(M_CaO) + " \\text{ g/mol} = " + fmt(molCaO * M_CaO, 0) + " \\text{ g} \\\\ &= \\frac{" + fmt(molCaO * M_CaO, 0) + " \\text{ g}}{1000 \\text{ g/kg}} = " + iF(rawKgCaO) + " \\text{ kg} \\end{aligned} \\] The mass of quicklime produced is <b>" + F3(ans) + " kg</b>.",
    { sampleKg: sampleKg, purityPct: purityPct, ans: ans }
  );
});

// LEVEL: 2 - Enters the stoichiometric chain from solution concentration and volume to calculate oxygen gas volume at STP.
// LENGTHS: key=4
E("u1-510-peroxide-oxygen", 1, ["5.10"], 2, "gen", function() {
  var contexts = [
    "A clinic disinfectant bottle contains",
    "In a laboratory oxygen preparation, a student decomposes",
    "A water-treatment test uses"
  ];
  var intro = pick(contexts);
  var volMl = ri(10, 100) * 10;
  var conc = ri(30, 300) / 100;
  var volL = volMl / 1000;
  var molH2O2 = conc * volL;
  var molO2 = molH2O2 / 2;
  var rawVolO2 = molO2 * 22.4;
  var ans = sfR(rawVolO2, 3);
  var tol = Math.max(0.05, ans * 0.02);
  return numq(
    intro + " " + gF(volMl) + " mL of a " + F3(conc) + " mol/L aqueous hydrogen peroxide solution, which decomposes completely according to: 2H₂O₂ → 2H₂O + O₂. What volume of oxygen gas (O₂), in litres, is produced at STP?",
    ans,
    tol,
    "Converting " + gF(volMl) + " mL to " + iF(volL) + " L gives n(H₂O₂) = " + F3(conc) + " mol/L × " + iF(volL) + " L = " + iF(molH2O2) + " mol. By the 2 : 1 mole ratio, n(O₂) = " + iF(molH2O2) + " mol / 2 = " + iF(molO2) + " mol, and multiplying by 22.4 L/mol at STP gives " + iF(rawVolO2) + " L, which rounds to <b>" + F3(ans) + " L</b>.",
    { volMl: volMl, conc: conc, ans: ans }
  );
});

/* Lengthening tranche additions (Nov 20, 2026): multiple-choice depth
   for the indicators the feasibility priced as selected-response short
   (Science-Test-Lengthening-Feasibility-2026-11-20.md, Section 6):
   5.2 x4, 5.8 x3, 5.1 x1, 5.10 x1. The existing 5.2 and 5.8 entries
   are numeric-form and are never drawn into Section A; these are the
   first multiple-choice entries on those indicators. SME-flagged for
   the specialist pass. */
function t2sf(x){return sfF(x,3);}
var T2_CPDS=[
 ["water","H\u2082O",[["H",2],["O",1]]],
 ["carbon dioxide","CO\u2082",[["C",1],["O",2]]],
 ["ammonia","NH\u2083",[["N",1],["H",3]]],
 ["methane","CH\u2084",[["C",1],["H",4]]],
 ["sodium chloride","NaCl",[["Na",1],["Cl",1]]],
 ["calcium carbonate","CaCO\u2083",[["Ca",1],["C",1],["O",3]]],
 ["glucose","C\u2086H\u2081\u2082O\u2086",[["C",6],["H",12],["O",6]]],
 ["sodium hydroxide","NaOH",[["Na",1],["O",1],["H",1]]],
 ["hydrochloric acid","HCl",[["H",1],["Cl",1]]],
 ["sulfuric acid","H\u2082SO\u2084",[["H",2],["S",1],["O",4]]],
 ["magnesium hydroxide","Mg(OH)\u2082",[["Mg",1],["O",2],["H",2]]],
 ["calcium chloride","CaCl\u2082",[["Ca",1],["Cl",2]]],
 ["potassium nitrate","KNO\u2083",[["K",1],["N",1],["O",3]]],
 ["iron(III) oxide","Fe\u2082O\u2083",[["Fe",2],["O",3]]],
 ["propane","C\u2083H\u2088",[["C",3],["H",8]]],
 ["ammonium nitrate","NH\u2084NO\u2083",[["N",2],["H",4],["O",3]]]
];
function t2mm(parts){var s=0;parts.forEach(function(p){s+=CHEM_AM[p[0]]*p[1];});return s;}
function t2opts(correct,wrongs,unit){
  var cStr=t2sf(correct)+(unit?" "+unit:""),seen={},out=[];
  function push(v){var s=t2sf(v)+(unit?" "+unit:"");if(s!==cStr&&!seen[s]){seen[s]=1;out.push(s);}}
  wrongs.forEach(push);
  [correct*1.5,correct*0.6,correct*4,correct*0.25,correct*12,correct+1].forEach(function(v){if(out.length<3)push(v);});
  return {c:cStr,w:out.slice(0,3)};
}

E("u1-52-mc-molar-mass",1,["5.2"],1,"gen",function(){
  var c=pick(T2_CPDS),mm=t2mm(c[2]);
  var drop=c[2].map(function(p){return [p[0],p[1]>1?p[1]-1:1];});
  var mmDrop=t2mm(drop);
  var o=t2opts(mm,[mmDrop,mm+CHEM_AM[c[2][0][0]],mm*2],"g/mol");
  var ctx=pick([""," A student needs the value to convert a measured mass into moles."," The value is needed before a solution can be prepared."," A lab partner asks for it while setting up a calculation."]);
  return mcq("What is the molar mass of "+c[0]+", "+c[1]+"?"+ctx,
    o.c,o.w,
    "Add the atomic masses of every atom in the formula, counting each atom as many times as its subscript shows. For "+c[1]+" the total is <b>"+o.c+"</b>.",{cpd:c[0]});
});

E("u1-52-mc-mass-moles",1,["5.2"],2,"gen",function(){
  var c=pick(T2_CPDS),mm=t2mm(c[2]);
  var mass=pick([5.00,10.0,12.5,20.0,25.0,36.0,40.0,50.0,80.0,100.0]);
  var n=mass/mm;
  var o=t2opts(n,[n*10,n/2,n*2],"mol");
  return mcq("How many moles are in "+t2sf(mass)+" g of "+c[0]+", "+c[1]+"? The molar mass of "+c[1]+" is "+mm.toFixed(2)+" g/mol.",
    o.c,o.w,
    "Amount in moles is mass divided by molar mass: n = m / M = "+t2sf(mass)+" g / "+mm.toFixed(2)+" g/mol = <b>"+o.c+"</b>. Multiplying the mass by 10, or halving or doubling the mole value, does not perform that division.",{cpd:c[0],mass:mass});
});

E("u1-52-mc-moles-particles",1,["5.2"],2,"gen",function(){
  var kinds=[["water","molecules"],["carbon dioxide","molecules"],["methane","molecules"],["ammonia","molecules"],["glucose","molecules"],["sodium chloride","formula units"],["calcium chloride","formula units"],["helium","atoms"],["iron","atoms"],["aluminum","atoms"]];
  var k=pick(kinds),n=pick([0.250,0.500,1.50,2.00,2.50,3.00,4.00,5.00]);
  var ans=n*CHEM_AV;
  var o=t2opts(ans,[ans/10,ans*10,n/CHEM_AV*1e46],"");
  o.c=t2sf(ans);o.w=o.w.map(function(s){return s.trim();});
  return mcq("How many "+k[1]+" are in "+t2sf(n)+" mol of "+k[0]+"?",
    o.c,o.w,
    "Multiply the amount in moles by the Avogadro constant, 6.022 \u00D7 10\u00B2\u00B3 particles per mole: "+t2sf(n)+" mol \u00D7 6.022 \u00D7 10\u00B2\u00B3 = <b>"+o.c+"</b> "+k[1]+".",{kind:k[0],n:n});
});

E("u1-52-mc-mass-volume-stp",1,["5.2"],3,"gen",function(){
  var gases=[["hydrogen","H\u2082",2.02],["oxygen","O\u2082",32.00],["nitrogen","N\u2082",28.02],["carbon dioxide","CO\u2082",44.01],["methane","CH\u2084",16.05],["ammonia","NH\u2083",17.04]];
  var g=pick(gases),mass=pick([1.00,2.00,4.00,5.00,8.00,10.0,16.0,20.0,32.0,44.0]);
  var vol=mass/g[2]*22.4;
  var o=t2opts(vol,[mass*22.4,g[2]/mass*22.4,vol/10],"L");
  return mcq("What volume does "+t2sf(mass)+" g of "+g[0]+" gas, "+g[1]+", occupy at STP? The molar mass of "+g[1]+" is "+g[2].toFixed(2)+" g/mol, and one mole of any gas occupies 22.4 L at STP.",
    o.c,o.w,
    "First convert mass to moles: n = "+t2sf(mass)+" g / "+g[2].toFixed(2)+" g/mol = "+t2sf(mass/g[2])+" mol. Then multiply by the molar volume at STP: "+t2sf(mass/g[2])+" mol \u00D7 22.4 L/mol = <b>"+o.c+"</b>.",{gas:g[0],mass:mass});
});

var T2_RXN=[
 {eq:"2H\u2082 + O\u2082 \u2192 2H\u2082O",sp:[["hydrogen",2,2.02],["oxygen",1,32.00],["water",2,18.02]]},
 {eq:"N\u2082 + 3H\u2082 \u2192 2NH\u2083",sp:[["nitrogen",1,28.02],["hydrogen",3,2.02],["ammonia",2,17.04]]},
 {eq:"CH\u2084 + 2O\u2082 \u2192 CO\u2082 + 2H\u2082O",sp:[["methane",1,16.05],["oxygen",2,32.00],["carbon dioxide",1,44.01],["water",2,18.02]]},
 {eq:"2Mg + O\u2082 \u2192 2MgO",sp:[["magnesium",2,24.31],["oxygen",1,32.00],["magnesium oxide",2,40.31]]},
 {eq:"CaCO\u2083 \u2192 CaO + CO\u2082",sp:[["calcium carbonate",1,100.09],["calcium oxide",1,56.08],["carbon dioxide",1,44.01]]},
 {eq:"2KClO\u2083 \u2192 2KCl + 3O\u2082",sp:[["potassium chlorate",2,122.55],["potassium chloride",2,74.55],["oxygen",3,32.00]]}
];

E("u1-58-mc-mole-ratio",1,["5.8"],2,"gen",function(){
  var r=pick(T2_RXN);
  var ai=ri(0,r.sp.length-1),bi=(ai+ri(1,r.sp.length-1))%r.sp.length;
  var A=r.sp[ai],B=r.sp[bi];
  var given=pick([1.00,1.50,2.00,2.50,3.00,4.00,5.00,6.00]);
  var ans=given*B[1]/A[1];
  var o=t2opts(ans,[given*A[1]/B[1],given*B[1],given+A[1]],"mol");
  return mcq("According to the equation "+r.eq+", how many moles of "+B[0]+" are involved when "+t2sf(given)+" mol of "+A[0]+" react completely?",
    o.c,o.w,
    "The equation gives the mole ratio "+A[0]+" : "+B[0]+" = "+A[1]+" : "+B[1]+". Scale the given amount by that ratio: "+t2sf(given)+" mol \u00D7 "+B[1]+"/"+A[1]+" = <b>"+o.c+"</b>.",{eq:r.eq,given:given});
});

E("u1-58-mc-mass-mass",1,["5.8"],2,"gen",function(){
  var r=pick(T2_RXN.slice(2));
  var A=r.sp[0],B=pick(r.sp.slice(1));
  var mass=pick([4.00,6.00,8.00,10.0,12.0,16.0,20.0,25.0,30.0,40.0,50.0,60.0]);
  var ans=mass/A[2]*B[1]/A[1]*B[2];
  var o=t2opts(ans,[mass/A[2]*B[2],mass/A[2]*A[1]/B[1]*B[2],ans*2],"g");
  return mcq("According to the equation "+r.eq+", what mass of "+B[0]+" is produced from "+t2sf(mass)+" g of "+A[0]+"?",
    o.c,o.w,
    "Convert the given mass to moles: "+t2sf(mass)+" g / "+A[2].toFixed(2)+" g/mol = "+t2sf(mass/A[2])+" mol of "+A[0]+". Use the mole ratio "+A[1]+" : "+B[1]+" to get "+t2sf(mass/A[2]*B[1]/A[1])+" mol of "+B[0]+", then convert back to mass: \u00D7 "+B[2].toFixed(2)+" g/mol = <b>"+o.c+"</b>.",{eq:r.eq,mass:mass});
});

E("u1-58-mc-limiting",1,["5.8"],3,"gen",function(){
  var r=pick(T2_RXN.slice(0,4));
  var A=r.sp[0],B=r.sp[1];
  var exact=ri(0,9)===0;
  var a,b;
  if(exact){var k=ri(1,3);a=A[1]*k;b=B[1]*k;}
  else{a=ri(1,6);b=ri(1,6);if(a*B[1]===b*A[1]){b=b+1;}}
  var need=a/A[1],have=b/B[1];
  var correct=exact?"Both are completely used up":(need>have?B[0]:A[0]);
  var wrongs=[A[0],B[0],"Both are completely used up",r.sp[r.sp.length-1][0]].filter(function(x){return x!==correct;});
  var expl=exact?
    "The amounts are in exactly the ratio of the equation, "+A[1]+" : "+B[1]+", so neither reactant is left over. <b>Both are completely used up</b>.":
    "Compare the amounts in ratio units: "+t2sf(a)+" mol of "+A[0]+" is "+t2sf(need)+" ratio units ("+A[1]+" mol each), and "+t2sf(b)+" mol of "+B[0]+" is "+t2sf(have)+" ratio units ("+B[1]+" mol each). The reactant with fewer ratio units runs out first, so the limiting reactant is <b>"+correct+"</b>.";
  return mcq("A mixture contains "+t2sf(a)+" mol of "+A[0]+" and "+t2sf(b)+" mol of "+B[0]+", which react according to the equation "+r.eq+". Which reactant is the limiting reactant?",
    correct,wrongs.slice(0,3),expl,{eq:r.eq,a:a,b:b});
});

E("u1-51-mc-correct-formula",1,["5.1"],2,"gen",function(){
  var subs={"0":"\u2080","1":"\u2081","2":"\u2082","3":"\u2083","4":"\u2084"};
  function sub(n){return n===1?"":String(n).split("").map(function(d){return subs[d];}).join("");}
  var cats=[["sodium","Na",1,false],["potassium","K",1,false],["calcium","Ca",2,false],["magnesium","Mg",2,false],["aluminum","Al",3,false],["ammonium","NH\u2084",1,true],["iron(III)","Fe",3,false],["zinc","Zn",2,false],["copper(II)","Cu",2,false],["barium","Ba",2,false]];
  var ans_=[["chloride","Cl",1,false],["oxide","O",2,false],["sulfide","S",2,false],["nitrate","NO\u2083",1,true],["carbonate","CO\u2083",2,true],["sulfate","SO\u2084",2,true],["hydroxide","OH",1,true],["phosphate","PO\u2084",3,true]];
  var c=pick(cats),a=pick(ans_);
  function gcd(x,y){return y?gcd(y,x%y):x;}
  var g=gcd(c[2],a[2]),nc=a[2]/g,na=c[2]/g;
  function build(n1,n2,paren){
    var f=(c[3]&&paren&&n1>1)?"("+c[1]+")"+sub(n1):c[1]+sub(n1);
    f+=(a[3]&&paren&&n2>1)?"("+a[1]+")"+sub(n2):a[1]+sub(n2);
    return f;
  }
  var correct=build(nc,na,true);
  function buildForced(n1,n2){
    var f="("+c[1]+")"+sub(n1)+"("+a[1]+")"+sub(n2);
    return f;
  }
  var pool=[build(na,nc,true),build(1,1,true),build(nc,na,false),build(nc+1,na+1,true),buildForced(nc,na),build(nc+2,na,true),build(nc,na+2,true)];
  var wrongs=pool.filter(function(w,i){return w!==correct&&pool.indexOf(w)===i;});
  wrongs.sort(function(x,y){return y.length-x.length;});
  wrongs=wrongs.slice(0,3);
  var name=c[0]+" "+a[0];
  return mcq("What is the correct chemical formula for "+name+"?",
    correct,wrongs.slice(0,3),
    "The "+c[0]+" ion has charge "+c[2]+"+ and the "+a[0]+" ion has charge "+a[2]+"\u2212. The subscripts are chosen so the charges balance, using "+nc+" cation(s) for every "+na+" anion(s), with parentheses around a polyatomic ion when more than one is needed. The formula is <b>"+correct+"</b>.",{name:name});
});

E("u1-510-mc-stoich-use",1,["5.10"],1,"var",varset([
  function(){
    return mcq("A car airbag inflates when sodium azide decomposes to produce nitrogen gas. The airbag designer uses stoichiometry to answer which question?",
      "How much sodium azide is needed to produce the amount of nitrogen gas that fills the bag",
      ["How quickly the nitrogen gas inflates the bag in the first moments of a serious crash","What colour the nitrogen gas inside the bag will be once it has fully inflated","How hot the nitrogen gas becomes as the bag inflates during the collision"],
      "Stoichiometry works with amounts: the balanced equation links the amount of sodium azide to the amount of nitrogen produced, so it answers how much reactant is needed for a required amount of product. Speed, colour and temperature are not amount questions. The question stoichiometry answers is <b>how much sodium azide is needed to produce the amount of nitrogen gas that fills the bag</b>.",{});
  },
  function(){
    return mcq("An antacid tablet neutralizes excess stomach acid. The manufacturer uses stoichiometry to answer which question?",
      "How many tablets are needed to neutralize a given amount of stomach acid",
      ["How quickly a tablet dissolves and begins to act once it reaches the stomach","Why the tablet tastes chalky","How the tablet changes the colour of the stomach contents"],
      "Stoichiometry works with amounts: the balanced neutralization equation links the amount of base in a tablet to the amount of acid it neutralizes, so it answers how many tablets a given amount of acid requires. Dissolving speed, taste and colour are not amount questions. The question stoichiometry answers is <b>how many tablets are needed to neutralize a given amount of stomach acid</b>.",{});
  },
  function(){
    return mcq("A fertilizer plant makes ammonia from nitrogen and hydrogen. The plant engineer uses stoichiometry to answer which question?",
      "How much hydrogen gas is needed to produce one tonne of ammonia",
      ["How long the ammonia takes to form and collect inside the plant's reactor vessel","What the ammonia smells like at the plant gate","How the reactor's temperature changes during the shift"],
      "Stoichiometry works with amounts: the balanced equation links the amount of hydrogen to the amount of ammonia produced, so it answers how much reactant a target amount of product requires. Reaction time, smell and temperature change are not amount questions. The question stoichiometry answers is <b>how much hydrogen is needed to produce one tonne of ammonia</b>.",{});
  },
  function(){
    return mcq("Crushed limestone is spread on an acidic lake to neutralize the acid. The conservation officer uses stoichiometry to answer which question?",
      "How much limestone is needed to neutralize the acid in the lake",
      ["How quickly the limestone settles through the water to reach the lake bottom","Why the lake turned acidic in the first place","What colour the lake water becomes after treatment"],
      "Stoichiometry works with amounts: the balanced neutralization equation links the amount of limestone to the amount of acid it neutralizes, so it answers how much limestone a given amount of acid requires. Sinking speed, the cause of the acidity and colour are not amount questions. The question stoichiometry answers is <b>how much limestone is needed to neutralize the acid in the lake</b>.",{});
  },
  function(){
    return mcq("A bakery uses baking soda, which releases carbon dioxide gas when heated, to raise its loaves. The baker uses stoichiometry to answer which question?",
      "How much baking soda is needed to produce the carbon dioxide that raises a loaf",
      ["How quickly the loaf browns and forms a firm crust across its top in a hot oven","Why the carbon dioxide has no taste","How the oven temperature rises while the loaf bakes"],
      "Stoichiometry works with amounts: the balanced decomposition equation links the amount of baking soda to the amount of carbon dioxide released, so it answers how much baking soda a required amount of gas takes. Browning speed, taste and temperature rise are not amount questions. The question stoichiometry answers is <b>how much baking soda is needed to produce enough carbon dioxide to raise a loaf</b>.",{});
  }
]));
